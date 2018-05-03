
// ============================== 导入
//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { getGlobal } from "pi/widget/frame_mgr";
import { listenerList, setForbidBack, lastBack, closeBack, getHeight, getWidth, open, forbidEvent } from "pi/ui/root";
import { remove , popNew, linkClose, popLink, show } from "pi/ui/root";
import { listenerList as guideListen, init as initGuide, start as start_force,end, setGuideForceWidgetName,guideFind } from "pi/ui/guide";
import { listenBack } from "app/mod/db_back";
import { Util } from "app/mod/util";

//mod
import { mgr_data } from "app/scene/scene";
import { net_request } from "app_a/connect/main";
import { Pi, globalSend, setLog } from "app/mod/pi";
import { Common } from "app/mod/common";
import { data as localDB, updata, get as getDB, insert, listen,checkTypeof } from "app/mod/db";
import { Music } from "app/mod/music";

//app

import { listenerList as plotListen, initCfg as initPlot, start as start_plot, setPlotWidgetName } from "./plot";
import { force_cfg } from "cfg/b/force_cfg";
import { guide_cfg } from "cfg/b/guide_cfg";
import { function_guid } from "cfg/b/function_guid";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { function_open } from "cfg/b/function_open";


// ============================== 导出

/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet = new Forelet();
let frame_mgr = getGlobal();
// let postTimer = 0;//距离上一步引导完成时间
// let is_frame = 0;//创建全局渲染帧永久调用函数和参数

insert("clientData",{});
/**
 * @description  初始化引导配置
 */
export const init = () => {
	initGuide(force_cfg);
	initCfg();
};


/**
 * @description  设置广播消息接收接口
 */
export const globalReceive :any = {
	/**
	 * @description 进入主城
	 */
	closeFastlogin:()=>{
		//设置前置条件
		start();
	},
	/**
	 * @description 重登录成功
	 */
	relogin_ok : () => {
		//检查是否已经登录游戏、已经过了前置检查
		if(!getDB("user.rid"))return;
		setTimeout(function(){
			if(lastBack())closeBack();
			guideState = 0;
			start();
		},1);
	},
	/**
	 * @description 任意通讯成功都会触发
	 */
	net_ok : (r) => {
		if(netListener.type && netListener.type === r.type && !r.error){
			netListener.func();
			netListener.type = "";
		}
	}
};

/**
 * @description 当前是否在引导中
 */
export const is_guide = () => {
	return guideState;
};

/**
 * @description 获取引导配置
 */
export const getGuideCfg = function (msg,callback) {
	
};

/**
 * @description 领取引导奖励
 */
export const getAward = (index,callback?) => {
	let msg = {"param": {"index":index-0}, "type": "app/guide@award"};
	net_request(msg, function (data) {
		if (data.error) {
			console.log(data.why);
		} else if (data.ok) {
			let _data:any = Common.changeArrToJson(data.ok);
		}
	});
};

/**
 * @description 把引导步骤记录到后台
 * @param param {any} 通讯数据,与后台约定的数据格式
 * 		  condition {boolean} 是否提前执行doback,并返回
 * 		  doback {Function} 可提前执行回调函数
 * 		  callback {Function} 通讯成功执行的回调函数，并将通讯回传数据作为参数
 * 		  donext {boolean} 是否将doback继续往callback里传
 */
export const write = (param:any,condition:boolean,doback:Function,callback:Function,donext?:boolean) => {
	updata("guide",JSON.parse(param.data));
	if(condition){
		return doback && doback();
	}
	let msg = {"param": param, "type": "app/client@write"};
	//connected = true;
	net_request( msg, function (data) {
		if (data.error) {
			console.log(data.why);
		} else if (data.ok) {
			if(donext){
				callback && callback(data.ok,doback);
			}else {
				callback && callback(data.ok);
				doback && doback();
			}
		}
	});
};

insert("guide",{
	"curr":"",
	"list":"",
	"start":0
});

//=========================== 本地

/**
 * @description 后台记录
 */
let record:any = {"list":"","curr":"","start":0,"default":1};
/**
 * @description 临时过渡记录
 */
let tempState;

/**
 * @description 是否在引导中,1为引导中,0为非引导中
 */
let guideState = 0;
let coverWidget;
/**
 * @description 记录引导需要关心的根组件
 */
let widgetsCareMap = {};

/**
 * @description 记录打开的根组件
 */
let widgetsMap = [];

/**
 * @description 通讯监听回调
 */
let netListener = {
	type:"",
	/**
	 * @description 通讯监听回调
	 */
	func:(callback?)=>{
		let _a = findIgnore();
		let _curr = guide_cfg[record.curr][record.start];
		let _cb = callback || go_next;
		//设置后台写入数据
		record.start+=_a;
		let str = JSON.stringify(record);
		//设回记录数据
		record.start-=_a;

		if(record.start+1 >= guide_cfg[record.curr].length){
			let has_next = guide_cfg[record.curr].next_guide;
			record.list = record.list+(record.list?"-":"")+record.curr;
			record.curr = "";
			record.start = 0;
			setStep(JSON.stringify(record));
			has_next && (record.curr = has_next);
			guideState = 0;
			updateCover(false);
		}else{
			record.start+=1;
			updata("guide",record);
			let timer = setTimeout(()=>{
				if(_curr.ignore){
					setTimeout(()=>{
						updateCover(false);
						_cb();
					},0);
				}else setStep(str,()=>{
					updateCover(false);
					_cb();
				});
				clearTimeout(timer);
				timer = null;
			},(_curr.timeout || 0)*1000)
		}
	}
};

/**
 * @description 处理下一步引导何时执行
 */
let dealNextDoWhen = (_curr) => {
	if(_curr.net_ok){
		netListener.type = _curr.net_ok;
	}else{
		//检查引导进度
		netListener.func();
	}
};
/**
 * @description 找出接下来所有需要忽略的步骤，在本次关键步骤完成之后，一起记录到后台
 */
const findIgnore = () => {
	let _list = guide_cfg[record.curr],
		_i = record.start+1,
		addition = 1;
	for(_i;_i<_list.length;_i++){
		if(!_list[_i].ignore)break;
		addition += 1;
	}
	return addition;
}

/**
 * @description 引导事件处理表
 */
const guideEv = {
	"guideOver" : (state) => {
		let _curr = guide_cfg[record.curr][record.start];
		updateCover(true);
		//修正路径结束，进入正式引导
		if(state == _curr.fix){
			//放入定时器，等待引导按钮组件清除状态
			setTimeout(()=>{
				updateCover(false);
				go_next(_curr);
			},1);
		}else if(state == _curr.name){
			dealNextDoWhen(_curr);
		}else{
			console.error("Oh no,I don't konw which is the guide belong to!",state,_curr);
		}
	},
	"guideStart" : (state) => {

	}
};
/**
 * @description 剧情事件处理表
 */
const plotEv = {
	"plotEnd" : (state) => {
		let _curr = guide_cfg[record.curr][record.start];
		if(state == _curr.name){
			dealNextDoWhen(_curr);
		}else{
			console.error("Oh no,I can't konw which is the plot belong to!");
		}
	},
	"plotStart" : (state) => {

	}
};
/**
 * @description 计算当前引导完成几次了
 */
const getCount = (str,key) => {
	if(!str){
		return false;
	}
	let arr = str.split("-");
	let num = 0;
	arr.forEach(v => {
		if(v == key) {
			num++;
		}
	});
	return num >= guide_cfg[key].count;	
}
/**
 * @description 获取当前所在功能界面
 */
export const getPage = (arg?) => {
	if(widgetsMap.length == 0){
		return "main";
	}else{
		if(arg){
			return widgetsMap[widgetsMap.length-1];
		}
		addPageListen(widgetsMap[widgetsMap.length-1])
	}
};


/**
 * @description 设置数据库监听
 */
const addDbListen = (trigger,index) => {
	let path = trigger.split(/[><=!]\=/);
	listen(path[0],() => {
		let _cfg = guide_cfg[index];
		//判断该引导是否已经执行过了或者需要打开某个widget
		// if(record.list.split("-").indexOf(index+"") >= 0)
		if(getCount(record.list,index))
			return;
		if(_cfg.checkDB(localDB) && (!_cfg.widget || _cfg.widget &&  getPage() == _cfg.widget)){
			//TODO...
			//开始引导
			listenStart(index);
		}
		// console.log(_cfg.guide_text,_cfg.checkDB(localDB));

	});
};

/**
 * @description 设置页面打开监听
 */
const addPageListen = (widgetName) => {
	let list = widgetsCareMap[widgetName];
	if(list){
		for(var k in list){
			let key = list[k];
			// if(record.list.split("-").indexOf(key+"") == -1 && guide_cfg[key].checkDB(localDB)){
			if(!getCount(record.list,key) && guide_cfg[key].checkDB(localDB)){
				//TODO...
				//开始引导
				listenStart(key);
			}
		}
	}
};

/**
 * @description 监听启动引导
 */
const listenStart = (key) => {
	if(record.curr &&　!guideState　&& getDB("clientData.hasRead")){
		tempState = record.curr;
		start();
		return;
	}
	tempState = key;
	if(record.curr != key && getDB("clientData.hasRead") && !guideState)
		start();
};

/**
 * @description 关闭组件,存在同时关闭多个组件,延时操作
 */
const delayRemovePage = (() => {
	let timer;
	return (callback) => {
		if(!timer){
			timer = setTimeout(()=>{
				callback();
				timer = null;
			},50);
		}
	}
})();

/**
 * @description 初始化引导配置，设置监听
 */
const initCfg = () => {
	for(var k in guide_cfg){
		//判断该引导是否已经执行过了
		// if(record.list.split("-").indexOf(k+"") >= 0)
		if(getCount(record.list,k))
			continue;
		let _cfg = guide_cfg[k];
		//添加数据监听
		if(_cfg.need_map){
			outer:
			for(let key in wild_mission){
				let arr = wild_mission[key].guide;
				if(!arr){continue;}
				inter:
				for(let j = 0,leng = arr.length;j<leng;j++){
					if(k == arr[j][0]){
						if(_cfg.need){//是否需要强制完成才能刷新下一个任务
							_cfg.trigger += "&&wild.wild_history>="+wild_mission[key].guard;
							_cfg.trigger += "&&wild.wild_task_num>="+arr[j][1];
						}else{
							_cfg.trigger += "&&(db.wild.wild_history>"+wild_mission[key].guard;
							_cfg.trigger += "||(db.wild.wild_task_num>="+arr[j][1] + "&&wild.wild_history=="+wild_mission[key].guard +"))";
						}

						break outer;
					}
				}
			}
		}else if(_cfg.fun_key && function_open[_cfg.fun_key].level_limit){
			_cfg.trigger += "&&player.level>="+function_open[_cfg.fun_key].level_limit;
		}
		let triggers = _cfg.trigger.match(/[^&&]+/g);
		for(let i in triggers){
			addDbListen(triggers[i],k);	
			//添加db父节点，方便后面判断
			if(triggers[i].indexOf("==wild") > -1){
				let arr = triggers[i].split("==");
				triggers[i] = "db."+arr[0]+"=="+"db."+arr[1];
			}else{
				if(triggers[i][0]!=="(")
					triggers[i] = triggers[i].indexOf("!")>-1 ? "!db."+triggers[i].replace("!","") :"db."+triggers[i];				
			}
		}

		//构造条件判断函数,如果没有数据监听判断，直接返回true
		_cfg.checkDB = new Function("db","return "+(triggers?triggers.join("&&"):"true;"));
		// console.log(_cfg.checkDB);
		//建立组件与引导配置索引的映射关系
		if(_cfg.widget){
			widgetsCareMap[_cfg.widget] = widgetsCareMap[_cfg.widget] || [];
			widgetsCareMap[_cfg.widget].push(k);
		}
	}
	updateCover(false);
};
/**
 * @description 更新遮罩层
 */
const updateCover = (forbid) =>{
	// let time = forbid?0:Date.now()+1000000;
	// forbidEvent(time);
	if(coverWidget){
		coverWidget.setProps({"height":getHeight(), "width":getWidth(),"forbid":forbid});
		coverWidget.paint();
	}else
		coverWidget = open("app_a-guide-cover",{"height":getHeight(), "width":getWidth(),"forbid":forbid})
}
/**
 * @description 开始引导
 */
export const start = () => {
	if(guideState)
		return;
	let dg = getDB("clientData");
	if(record.default && dg.hasRead){
		delete record.default;
	}
	if(record.default)return;
	//首次引导，设置默认引导1
	if(!record.list && !record.curr && !record.start){
		// tempState = 1;
	}
	//判断当前记录的引导是否结束
	if(record.curr){
		let _c = guide_cfg[record.curr][record.start],
			_curr:any = {};
		if(!_c){
			netListener.func();
		//有修正路径
		}else if(_c.fix){
			_curr.type = "force";
			_curr.name = _c.fix;
			go_next(_curr);
		//引导目的已经达到，则直接结束此段引导
		}else if(_c.ignore){
			record.start+=1;
			start();
		}else if(_c.purpose && _c.purpose(localDB)){
			//存入后台
			netListener.func(start);
		//否则直接进入下一步
		}else go_next();
	//判断当前监听是否触发了引导
	// }else if(tempState && record.list.split("-").indexOf(tempState+"") == -1){
	}else if(tempState && !getCount(record.list,tempState)){
		//初始化下一步数据
		record.curr = tempState;
		record.start = 0;
		updata("guide",record);
		go_next();
	}
};

/**
 * @description 进入下一步引导
 */
const go_next = (_curr?) => {
	// postTimer = Util.serverTime();
	let music = false;
	if(!_curr){
		music = true;
	}
	_curr = _curr || guide_cfg[record.curr][record.start];
	guideState = 1;
	tempState = undefined;
	if(_curr.type == "plot"){
		// let _plot = story_cfg[_curr.name];
		// if(!_plot[0].name)
		// 	setPlotWidgetName("app_a-guide-plot2");
		// else
		// 	setPlotWidgetName("app_a-guide-plot");
		// start_plot(_curr.name);
	}else if(_curr.type == "force"){
		setGuideForceWidgetName("app_a-guide-force");
		start_force(_curr.name);
		// 音乐
		if(record.start>0){
			return;
		}
		let mus = guide_cfg[record.curr].music;
		if(music && (_curr.name == "fun_open" || mus)){
			let id = getDB("open_fun.id")-0+1;
			let curr_music = mus || function_guid[id]["music"];
			if(curr_music && curr_music!="undefined"){
				Music.roleSound(curr_music);		    			
			}
		}
	}
};

/**
 * @description 设置引导步数，写成功后再进行下一步
 */
const setStep = (value:string,callback?) => {
	write({"key":"guide","data":value},false,function(){},callback);
	//后台记录进入进度
	if(record.curr == 1)setLog("log",{
		sid : Pi.sid,
		step : "guide",
		rid:getDB("user.rid")
	});
};


// ============================== 通讯


//===========================立即执行
/**
 * @description 监听db数据变化
 */
listen("clientData.guide",()=>{
	start();
});
// listen("chat.show,playermission.guide",()=>{
// 	let chat = getDB("chat.show");
// 	let curr = guide_cfg[record.curr];
// 	let playermission = getDB("playermission.guide");
// 	if(guideState && !chat && curr && !record.start || (record.curr==1 && !playermission)){
// 		guideState = 0;				
// 		updateCover(false);
// 		end();
// 	}
// })

//读取零散数据
listenBack("app/client@read",(data)=>{
	//把数据放入数据库中
	for(let i in data){
		updata("clientData."+i,data[i]);
	}
	if(data["guide"]){
		record = JSON.parse(data["guide"]);
		updata("guide",record);
	}
	updata("clientData.hasRead",1);
});
/**
 * @description 注册guide监听事件
 */
(<any>guideListen).add((cmd) => {
	guideEv[cmd.type](cmd.state);
});

/**
 * @description 注册plot监听事件
 */
(<any>plotListen).add((cmd) => {
	plotEv[cmd.type](cmd.state);
});

/**
 * @description 注册root监听事件
 */
(<any>listenerList).add((cmd) => {
	if (!cmd || !cmd.group) return;
	if(cmd.group.name === "secondary" || cmd.group.name === "cover" ||  cmd.group.name === "scene"){
		if(cmd.type == "add"){
			widgetsMap.push(cmd.widget.name);
			addPageListen(cmd.widget.name);
			if(record.curr && cmd.widget.name!="app_b-widget-bg-secondary" && cmd.widget.name!="app_b-widget-bg-goback" && cmd.widget.name!="app_b-widget-bg-cover"){
				if(guideState && !record.start && record.curr != 12 && cmd.widget.name!="app_b-wild-wild"){
					guideState = 0;
					updateCover(false);
					end();
					return;
				}
				let btn_name:any = guideFind(true);
				if(!btn_name){return;}
				let w = force_cfg[btn_name.name] && force_cfg[btn_name.name].btn_page;
				if(guideState && w && getPage(true)!== w){
					guideState = 0;
					updateCover(false);
					end();
				}
			}
		}else if(cmd.type == "remove"){
			widgetsMap.pop();
			delayRemovePage(() => {
				addPageListen(widgetsMap[widgetsMap.length-1] || "main");
			});
			if(guideState && record.curr == 12 && cmd.widget.name=="app_b-fight-account" ){
				if(record.start!= 0)return;
				guideState = 0;
				record.curr = "";
				updateCover(false);
				end();
				return;
			}
		}
	}
});

frame_mgr.setPermanent(()=>{
	if(guideState && !record.start && guide_cfg[record.curr].checkDB && !guide_cfg[record.curr].checkDB(localDB)){
		guideState = 0;
		record.curr = "";
		updateCover(false);
		end();
	}
})