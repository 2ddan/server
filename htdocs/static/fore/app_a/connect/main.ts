/*global pi,forelet,console */
// ============================== 导入
//pi
import { setUrl , open, setMsgHandler ,request, send, setReloginCallback} from "pi/ui/con_mgr";

//mod
import { Pi, globalSend, refresh } from "app/mod/pi";
import { getAllDB } from "app/mod/db_back";

// ============================= 导出

/**
 * @description 通讯接口
 * @param { Json }msg 通讯参数
 * @param { Function }callback 通讯回调
 * @param { Boolean }norepeat 不重复通讯，默认可以
 */
export const net_request = function (msg, callback, norepeat?) {
	let s = requestStatus[msg.type];
	if(norepeat && s > 0){
		return;
	}
	if(s === undefined){
		requestStatus[msg.type] = 1;
	}else requestStatus[msg.type] += 1;

	//如果该通讯在立即执行列表或者没有设置阻塞列表或者是阻塞列表的第一个
	if(rnTable.indexOf(msg.type) >=0 || chokeTable.length <=0 || (chokeTable.length && chokeTable[chokeTable.length-1] === msg.type)){
		blockFunc(msg, callback);
		return;
	}
	waitTable[msg.type] = [msg,callback];
	//request(msg, callback);
};
//向服务器发送消息
export const net_send = (msg) => {
	send(msg);
};

/**
 * 监听后台推送消息
 * @param {String}type 消息类型
 * @param {Function}func 通讯回调
 */
export const net_message = (type,func) => {
	setMsgHandler(type,func);
};
/***
 * 设置阻塞通讯列表,顺序执行
 * 阻塞列表通讯完成后,才开始执行等待列表通讯
 * 没有阻塞列表或者阻塞列表执行完之后,新的通讯则立即执行
 * @param arr{Array} ["app/role/read",....]
 */
export const net_choke = (arr) => {
	chokeTable = arr.reverse();
};
/**
 * 设置立即执行列表
 */
export const net_rightNow = (arr) =>{
	rnTable = arr;
};


/** 初始化 */
export const initOK = (callback:Function) => {
	let url = "ws://" + Pi.location.remote + Pi.location.main + ":11001";
	setUrl(url);
	open(()=>{
		//connect ok !!
		//TODO..
		callback && callback(true);
	},() => {
		//connect error !!
		//TODO..
		callback && callback(false);
	});
};

// =================================== 本地
/*********************** 连接管理 ***************************/

/**
 * @description 每个通讯的单独状态,满足通讯在没完成情况下不能进行二次通讯
 * @key request请求的param.type
 * @value { number } status>0 正在通讯 否则没有通讯或已完成
 */
const requestStatus : any = {}

/***
 * chokeTable : 阻塞列表，如果存在，则必须先执行该列表的通讯，切按顺序通讯
 * chokeStart : 是否开始阻塞,否则立即执行
 */
let chokeTable = [];
let chokeStart = false;
/**
 * 等待通讯列表,阻塞通讯时才有用
 */
let waitTable = {};
/**
 * 立即执行列表,不受阻塞列表影响
 */
let rnTable = [];

/**
 * 闭包请求
 */
let blockFunc = (msg,callback) => {
	(function(m,b){
		request(m, function(r){
			delete waitTable[m.type];
			b(r);
			requestStatus[m.type] -= 1;
			globalSend("net_ok",{type:m.type,data:r});
			runWait(m.type,r);
		},null,true);
	})(msg,callback);
};
/**
 * @description 封装闭包定时器 
 */
 const blockTimer = (arg,t) => {
	setTimeout(function(){
		blockFunc(arg[0],arg[1]);
	},t);
 };

/**
 * 执行等待列表
 * 阻塞列表执行必须在每次通讯成功之后才进行下一个
 * @param type{String} 通讯路径
 * @param r{Json} 通讯回调
 */
let runWait = (type,r) => {
	if(chokeTable.length >= 0){
		if(type === chokeTable[chokeTable.length-1] && !r.error){
			chokeStart = chokeStart || true;
			chokeTable.pop();
			if(chokeTable.length){
				let _last = waitTable[chokeTable[chokeTable.length-1]];
				if(_last){
					blockFunc(_last[0], _last[1]);
				}
			}else{
				//一般在角色登录之后触发
				getAllDB(()=>{
					chokeStart = false;
					let t = 1;
					for(let k in waitTable){
						//task(blockFunc,waitTable[k],4000,0);
						let a = waitTable[k];
						blockTimer(a,10*t);
						t++;
						//blockFunc(waitTable[k][0],waitTable[k][1]);
					}
				});
			}
		}
	}
};



// ============================== 立即执行
/**
 * @description 设置整点刷新监听，由后台推送
 */
setMsgHandler("new_day",()=>{
	getAllDB();
});