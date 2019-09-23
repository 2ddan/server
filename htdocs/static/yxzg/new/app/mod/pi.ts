/*global pi, window, document */

/**
 * @name app.mod.pi
 * @object
 * @namespace
 * @description 全局变量存放模块
 */

let win: any = window;
export let Pi: any = {
	modules: null,
	domains: null,
	server: null,
	location: null,
	openUrl: null,
	flags: null,
	debug: null,
	sid: null,
	wxLogin: false,
	ctime: null,
	stime: null,
	echoDelay: null,
	echoCount: null,
	base_cfg: null,
	pictures: {},
	wing_star: null,
	world_boss_base: null,
	kill_base: null,
	function_open: null,
	sample: {},
	localStorage: win.gcStorage || win.localStorage,
	receive: {},
	fileMap:{},
	language:"ch", // "ch"中文 ,"ch-t"中文繁体 ,"en"英语 ,...
	fontFamily:"fzzzht",
	author : "ganchukeji"
};

/**
 * @description 导出配置 "cfg/"目录下，忽略所有子目录，以文件名为key
 */
export const cfg:any = {};

/**
 * @description 获取文件名后缀
 */
export const getSuffix = (path) =>{
	let r:any = path.match(/\.[\w|\d]+/g);
		r = r?r[r.length-1].substring(1):r;
	return r;
}


/**
 * @description 注册全局监听函数
 */
export const globalReceive = (param) => {
	for (let j in param) {
		receiveTable[j] = receiveTable[j] || [];
		if(receiveTable[j].indexOf(param[j]) < 0){
			receiveTable[j].push(param[j]);
		}
	}
};
/**
 * 模块全局广播
 * @param name{String} 接收消息的函数名
 * 		  msg{any} 发送的数据
 */
export const globalSend = (name: string, msg?) => {
	let list = receiveTable[name],
		result = false;
	if (list) {
		for (let k=0,len = list.length;k<len;k++) {
			let n = Date.now(),dif = 0;
			try{
				result = list[k](msg) || true;
			}catch(e){
				console && console.error(e);
			}
			dif = Date.now()-n;
			if(dif > 5){
				console && console.warn && console.warn(`${dif}ms slow function : `,name,list[k]);
			}
		}
	}
	//console.warn("Don't have this function : ",name);
	return result;
};

/***
 * @description 把当前进度写入后台日志
 */
//
export const setLog = (type,data) => {
	let img = new Image(),
		url = Pi.server+type+"?",
		arr = [];
	for(let k in data){
		arr.push(k+"="+data[k]); 
	}
	url += arr.join("&");
	// img.src = url;
};
/**
 * @description 刷新页面
 */
export const refresh = (() => {
	let timer,func = (url?) => {
		if(timer)return;
		location.href = url || (location.origin+location.pathname)+"?"+Math.random();
		timer = setTimeout(refresh, 50);
	};
	return func;
})();

/**
 * @description 上传角色信息到对接平台
 */
export class InfoToPt{
	static isCreate = false
	static upload(type,localDB){
		const b = type === 2?true:false;
		if(!Pi.ptUpload || this.isCreate !== b){
			return;
		}
		
		Pi.ptUpload(new Player(type,localDB),(response)=>{
			if(response.status){
				globalSend("screenTipFun", {
					words: "更新平台信息成功！"
				});
			}else{
				globalSend("screenTipFun", {
					words: "更新平台信息失败！"
				});
				if(this.isCreate){
					this.upload(type,localDB);
				}
			}
		})
		if(this.isCreate){
			this.isCreate = false;
		}
	}
}
/**
 * @description 根元素的显示兼容配置, 
 * 9×16(360×640 405×720 450×800 540×960), 3×5(360×600 420×700 480×800 540×900), 5×8(350×560 400×640 500×800)
 * @example
 */
export const rootCfg = {width: 700, height: 420, wscale: 0.5, hscale: 0.5, full: false};
/**
 * @description 获取根样式
 */
export const rootStyle = (c):string => {
	let rootX, rootY;
	let clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
	let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	if (rootCfg.full) {
		rootWidth = clientWidth;
		rootHeight = clientHeight;
		return "position:absolute;overflow:hidden;width:100%;height:100%;";
	}
	rootWidth = rootCfg.width * c;
	rootHeight = rootCfg.height * c;
	let scaleW = clientWidth / rootWidth;
	let scaleH = clientHeight / rootHeight;
	if (scaleW >= scaleH) {
		let diff = scaleW/scaleH - 1;
		diff = diff>rootCfg.wscale?rootCfg.wscale:diff;
		
		rootWidth *= (1+diff);
		// 宽度比例变动大于高度比例变动
		rootScale = scaleW = scaleH;
	} else {
		let diff = scaleH/scaleW - 1;
		diff = diff>rootCfg.hscale?rootCfg.hscale:diff;
		rootHeight *= (1+ diff);
		rootScale = scaleH = scaleW;
	}
	rootX = (clientWidth - rootWidth) / 2;
	rootY = (clientHeight - rootHeight) / 2;
	return "position: absolute;overflow: hidden;left: " + rootX + "px;top: " + rootY + "px;width:" + rootWidth + "px;height: " + rootHeight + "px;-webkit-transform:scale(" + scaleW + "," + scaleH + ");-moz-transform:scale(" + scaleW + "," + scaleH + ");-ms-transform:scale(" + scaleW + "," + scaleH + ");transform:scale(" + scaleW + "," + scaleH + ");";
}
/**
 * @description 获得根元素的缩放比例
 * @example
 */
export const getScale = () => {
	return rootScale;
}
/**
 * @description 获得根元素的宽度
 * @example
 */
export const getWidth = (): number => {
	return rootWidth;
};
/**
 * @description 获得根元素的高度
 * @example
 */
export const getHeight = (): number => {
	return rootHeight;
};
// ===================================本地
/**
 * 广播模块
 * 在模块上找到所有绑定到"globalReceive"属性下的函数，作为消息接收列表
export const globalReceive :any = {
  	getmsg : (msg) => {
        console.log("send login........",msg);
    },
	getmsg1 : (msg) => {
        console.log("send login........",msg);
    }
  }
 */
//注册接收函数列表
/**
 * @example receiveTable = 
 * 	{
 * 	getmsg : [
 * 			getmsg(msg){console.log("send login........",msg);},
 * 			...
 * 		],
 * 	getmsg1 : [
 * 			getmsg1(msg){
 *				console.log("send login........",msg);
 *			},
 *			...
 * 		]
 * }
 */
let receiveTable: any = {};
let rootScale = 1,rootWidth,rootHeight;

const gangRoleType = {
	"1":"会长",
	"2":"副会长",
	"3":"成员"
}
/**
 * @description 上传玩家信息
 */
class Player{
	constructor(type,localDB){
		this.rolelevelmtime = Date.now();
		this.isCreateRole = type == 2 ? true:false;
		this.datatype = type;
		this.uid = localDB.user.uid;
		
		this.username = localDB.user.username;
		this.serverid = localDB.user.country.defaulteServer;
		this.servername = localDB.user.country.areas[localDB.user.country.defaulteServer].name;

		//角色数据
		if(!localDB.player || !localDB.player.area_time){
			return;
		}
		this.roleid = localDB.player.role_id;
		this.rolename = localDB.player.name;
		this.rolelevel = localDB.player.level;
		this.power = localDB.player.power;
		this.money = localDB.player.money;
		this.diamond = localDB.player.diamond;
		this.rolecreatetime = localDB.player.role_time;
		this.professionid = localDB.player.career_id;
		this.profession = localDB.player.career_name;
		this.gender = localDB.player.sex?"男":"女";

		//工会数据
		if(!localDB.gang || !localDB.gang.data.gang_id){
			return;
		}
		this.partyname = localDB.gang.data.gang_name;
		this.partyid = localDB.gang.data.gang_id;
		this.partyroleid = localDB.gang.data.post;
		this.partyrolename = gangRoleType[localDB.gang.data.gang_id];
	}
	//角色升级时间
	rolelevelmtime = 0
	//是否第一次创建角色
	isCreateRole = true
	//必填 1.选择服务器 2.创建角色 3.进入游戏 4.等级提升 5.退出游戏
	datatype = 1
	//用户id
	uid = 0

	//用户名
	username = ""
	//服务器id
	serverid = 1
	//服务器名称
	servername = ""
	//角色id
	roleid = 0
	//游戏角色昵称
	rolename = ""
	//角色等级
	rolelevel = 0
	//vip等级
	vip = 0
	//战斗力
	power = 0
	//金币
	money = 0
	//钻石
	diamond = 0
	//角色创建时间
	rolecreatetime = 0
	//男 女
	gender = "男"
	//职业id
	professionid = 0
	//职业名称
	profession = ""
	
	//工会名
	partyname = ""
	//工会id
	partyid = 0
	//自己在工会里的称号id
	partyroleid = 0
	//自己在工会里的称号名称
	partyrolename = ""
	//好友列表
	friendlist = []
}
 