/*
 * 用户登陆注册
 */

// ============================== 导入
//pi
import { Forelet } from "pi/widget/forelet";
import { open, destory } from "pi/ui/root";
import * as pi_html from "pi/util/html";
import { login, setReloginCallback, logout } from "pi/ui/con_mgr";
//mod
import { data as locDB, updata, listen, insert } from "app/mod/db";
import { Pi, setLog, globalSend, refresh, InfoToPt } from "app/mod/pi";
import { Common } from "app/mod/common";
//cfg
import { area as areacfg } from "cfg/a/area";
//app
import { sha256 } from "./math/sha256";
import { create } from "./math/bigi";
import * as base58 from "./math/base58";

import { net_request, net_send, net_rightNow, net_choke } from "app_a/connect/main";
import { loadSlow, loadNow, openLoad, splitDir } from "app_a/download/download";

// =============================== 测试代码
//Pi.localStorage.ptFrom = '{"uid":"E1BD2707A3D2F1A0","from":"guopan"}';
// =============================== 导出
/**
 * 导出forelet
 */
export const forelet:any = new Forelet();

/***
 * 初始化
 */
export const initOK = () => {
	//打开用户注册登录
	userWidget = open("app_a-user-main",0);
	globalSend("openNotice");
	//TODO 加载首界面所有资源->下载其他资源
	//TODO 根据本地存放数据信息判断是否需要注册
	//TODO 根据默认角色信息判断是否需要自动创建角色
	(new Image()).src = Pi.server + "log?sid=" + Pi.sid + "&step=4";
	//顺序请求列表，阻塞其他请求
	net_rightNow(["app/user/login","app/user/login@rand","app/role/login@read","app/role/login","app/user/register","app/role/create"]);
	net_choke(["app/role/login"]);
	//初始化登录
	let _user = initLoad();
	//open("app-scene-frame");
	loadSlow(
		_user.name,
		["fight/a/","fight/b/","cfg/b/","cfg/c/","app_b/","app_c/"],
		()=>{}
	);
	splitDir("app_c");
};
//获取本地缓存role id
export const getLocalRole = () => {
	return getLocalUser("rid",locKey.rid);
};
// ================================ 本地
let timer = null;
/**
 * @description 用户主组件
 */
let userWidget;
//刷新用户组件
const paintUser = (props?) => {
	if(!userWidget)return;
	userWidget.setProps(props);
	userWidget.paint();
}

let u_name = "";
/**
 * @description 枚举登录状态
 */
let loginState = {
	"init" : 0,
	"user_logining":1,
	"user_logined":2,
	"role_logining":3,
	"role_logined":4,
};
/**
 * @description 用户名密码长度限制
 */
let nameRang = [6,32],
	pwRang = [6,32];
/**
 * @description 错误类型
 */
let errType = {
	// "1":"name_short",//用户名太短
	// "2":"name_long",//用户名太长
	// "3":"name_illegal",//用户名含非法字符
	// "4":"pw_short",//密码太短
	// "5":"pw_long",//密码太长
	// "6":"twoNot_equal",//两次密码不匹配
	// "7":"",
	// "8":"not_agree"//未同意
	"1":"用户名太短",//用户名太短
	"2":"用户名太长",//用户名太长
	"3":"用户名含非法字符",//用户名含非法字符
	"4":"密码太短",//密码太短
	"5":"密码太长",//密码太长
	"6":"两次密码不匹配",//两次密码不匹配
	"7":"",
	"8":"未同意"//未同意
}
let locKey = {
	"u":["uid","username","password","usertype","pid","sign"],
	"rid":["uid","rid"]
};
/**
 * @description 用户类型,其它平台类型 2+
 */
let usertype = {
	"auto":0, //快速进入
	"hand":1, //手动注册
	"weixin":2, //微信登录
	"pt":3
};

/**
 * @description 微信信息
 */
let wxInfo = Pi.localStorage.WxAuthInfo?JSON.parse(Pi.localStorage.WxAuthInfo):null;
let WXINFO = Pi.localStorage.WXAUTHINFO?JSON.parse(Pi.localStorage.WXAUTHINFO):null;
delete Pi.localStorage.WxAuthInfo;
delete Pi.localStorage.WXAUTHINFO;
/**
 * @description 清理微信信息
 */
const setUserHead = () => {
	if(!wxInfo)return;
	if(locDB.user.username === wxInfo.unionid){
		updata("user.head",wxInfo.headimgurl);
	}
};

//将密码转成sha256-base58的编码
const sha256Base58Encode = (s) => {
	let haxi = sha256.SHA256(s);
	//alert("哈希加密"+haxi);
	let tostr = haxi.toString();
	//alert("toString"+"---"+tostr);
	let bigiValue = create("0x" + tostr, 16);
	//alert("16进制"+"---"+bigiValue);
	let encodeValue = base58.encode(bigiValue);
	//alert("encode"+"---"+encodeValue);
	return encodeValue;
	//return pi.math.base58.encode(pi.math.bigi.create("0x" + pi.math.sha256.SHA256(s).toString(), 16));
};
//检查用户名密码是否合法
const checkUser = (user) => {
	let nl = Common.character(user.username),
		pl = Common.character(user.password);
	if(nl < nameRang[0]){
		return 1;
	}else if(nl > nameRang[1]){
		return 2;
	}else if(nl != user.username.length){
		return 3;
	}else if(pl < pwRang[0]){
		return 4;
	}else if(pl > pwRang[1]){
		return 5;
	}else if(user.password != user.repassword){
		return 6;
	}else if(!user.isAgree){
		return 8;
	}
	return 0;
};
//获得用户注册的账号和密码（编码）
const getRegisterUser = (name, password) => {
	return { username: name, type: 101, password: sha256Base58Encode(name + ":" + password) };
};
//保留用户的账号、类型和密码（已编码）
/**
 * @description 保留用户的账号和密码（已编码）uid rid信息
 * @param key{string} 存储数据的key,跟{locKey}所定义的key一致
 * 		  cfg{Array} 存储数据（以"-"链接）,顺序跟{locKey}所定义的value一致
 */
const saveUser = (key,arr) => {
	try{
		let str = arr.join("-");
		if(Pi.localStorage[key] != str){//切换账号登陆时清除前一个账号的自动打BOSS设置
			let autoFightBoss = Pi.localStorage["autoFightBoss"];
			if(autoFightBoss){
				Pi.localStorage.removeItem("autoFightBoss");
				// globalSend("setupState",5);
			}
			if(Pi.localStorage["autoRelease"]){
				Pi.localStorage.removeItem("autoRelease");
			}
		}
		Pi.localStorage[key] = str;
		pi_html.setCookie(key, str,null,null,null,null);
	}catch(e){
		console.log("保存用户出错："+e);
	}
	
};
/**
 * @description 获得用户保留的账号和密码（已编码）
 * @param key{string} 存储数据的key,跟{locKey}所定义的key一致
 * 		  cfg{Array} 存储数据（以"-"切开）跟{locKey}对应的key所定义的value一致
 */
const getLocalUser = (key,cfg): any => {
	let s = Pi.localStorage[key] || pi_html.getCookie(key),
		a,
		r = {};
	if(s){
		a = s.split("-");
		if(a.length != cfg.length)return r;
		//如果localStorage没有，则重新存储
		if(!Pi.localStorage[key]){
			saveUser(key,a);
		}
		//遍历存储数据，返回key-value
		for(let k in cfg){
			r[cfg[k]] = a[k];
		}
	}
	return r;
};
//把当前登录状态写入后台日志
let loginlog = function (rid) {
	let nt = pi_html.ConnectionType[pi_html.getConnectionType()];
	let fp = sha256Base58Encode(pi_html.canvasFingerPrint());
	let wx = wxInfo || WXINFO;
	wx = wx?JSON.stringify(wx):"";
	let uinfo = encodeURIComponent(wx);
	setLog("loginlog",{
		sid : Pi.sid,
		role : rid,
		fp : fp,
		nt : nt,
		ui : uinfo
	});
	if(Pi.localStorage.ptFrom) {
		net_send({ "param": { "from": Pi.localStorage.ptFrom }, "type": "app/role/from" });
	}
};
/**
 * 清除登录状态
 */
const clearLoginInfo = () => {
	updata("user.country.area", 0);
	updata("user.country.roles", null);
	updata("user.state", 0);
	//updata("user.username", "");
	updata("user.password", "");
	updata("user.repassword", "");
	updata("user.relogin", "");
	updata("user.uid", 0);
	updata("user.err",{"login":"","regist":"","name":""});
	updata("user.usertype",0);
};
/**
 * 处理登录回调
 */
const loginBack = (name,password,type,pid,sign,errCallback? , succCallback?) => {
	return (r)=>{
		if (r.error) {
			console.log(r.why);
			//禁止！ 如果不存在，则注册
			updata("user.err.login",r.why);
			updata("user.state",loginState.init);
			if(errCallback){
				errCallback(r);
			}
		} else if (r.ok) {
			//后台记录进入进度
			setLog("log",{
				sid : Pi.sid,
				step : 13
			});
			let u:any = Common.changeArrToJson(r.ok),da;
			updata("user.uid",u.user_id);
			updata("user.usertype",type);
			updata("user.state",loginState.user_logined);
			saveUser("u",[locDB.user.uid, name, password,type,pid,sign]);
			da = dealServer(u.area_detail,1);
			InfoToPt.upload(1,locDB);
			// if(!da || !da.role){
			// 	InfoToPt.upload(1,locDB);
			// }
			if(succCallback){
				succCallback();
			}
		}
	}
}

/**
 * 注册用户
 */
const regist_user = (name, password,type,callback?) => {
	if(locDB.user.state >= loginState.user_logining){
		return;
	}
	updata("user.state",loginState.user_logining);
	var param = {user:name,password: password,type:type},
		url = {"param": param, "type": "app/user/register"};
	Pi.regist(param,type,(data) => {
		updata("user.state",loginState.init);
		if (data.err) {
			updata("user.err.regist",data.err);
		} else if (data.ok) {
			if (data.ok.result == 'already register') {
				errTip(`账号已注册`);
			}else{
				//regist.err = "";
				//更新login数据
				let u:any = data.ok;
				updata("user.uid",u.user_id);
				saveUser("u",[locDB.user.uid,name, password, type]);
			}
			
		}
		if(callback)callback(data);
	});
}
/**
 * 登录账号
 * @param name
 * @param password
 * @example
 * 通信中还有一个可选字段usertype
 */
const loginUser = (name, password,usertype, succCallback?, errCallback?) => {
	if(locDB.user.state >= loginState.user_logining){
		return;
	}	
	updata("user.state",loginState.user_logining);
	Pi.login({user:name,password: password,type:usertype},(data) => {
		if(data && data.ok.uid){
			Pi.ptId({user_id:data.ok.uid},(d)=>{
				if(!d || !d.ok || !d.ok.ptid || !d.ok.sign){
					return updata("user.state",loginState.init);
				}
				login(d.ok.ptid,usertype,d.ok.sign,loginBack(name,password,usertype,data.ok.uid,d.ok.sign,errCallback,succCallback));
			});
			return;
		}else{
			errTip(`账号或密码错误`);
		}
		updata("user.state",loginState.init);
	})
};
/**
 * 注册角色
 * @example
 */
const createRole = (area_id,name,sex,type,career_id, callback) => {
	if(locDB.user.state >= loginState.role_logining)
		return;
	updata("user.state",loginState.role_logining);
	net_choke(["app/role/create"]);
	var url = {"param": {"area_id":area_id,"name": name, "sex": sex, type: type, "career_id": career_id}, "type": "app/role/create"};
	net_request(url, function (data) {
		console.log("----------createRole, ", data);
		if (data.error) {
			console.log(data.why, url);
			//updata("user.err.name", "含非法词汇");
			errTip(`名字含非法词汇`);
			updata("user.state",loginState.init);
		} else if (data.ok) {
			loginlog(data.ok[0][1]);
			setLog("log",{
				sid : Pi.sid,
				rid : data.ok[0][1],
				step : 14
			});
			updata("user.rid",data.ok[0][1]);
			updata("user.state",loginState.role_logined);
			updata("user.roleType",0);
			saveUser("rid",[locDB.user.uid,data.ok[0][1]]);
			setUserHead();			
			callback();
		}
	});
};
/**
 *  登录角色
 *  @example
 *  必传字段rid
 */
const loginRole = (rid, type, succCallback?, errCallback?) => {
	net_choke(["app/role/login"]);
	let url = { "param": { rid: rid, type: type }, "type": "app/role/login" };
	if(locDB.user.state >= loginState.role_logining)
		return;
	updata("user.state",loginState.role_logining);
	//alert(rid+"loginUser");
	net_request(url, function (data) {
		console.log("-------------loginRole, ", rid, data);          //{"": 2, result: 1}
		if (data.error) {
			console.log(data.why, url);
			updata("user.err.login",data.why);
			updata("user.state",loginState.init);
			errCallback && errCallback(data);
		} else if (data.ok) {
			//记录登录进度
			loginlog(data.ok[0][1]);  //111
			setLog("log",{
				sid : Pi.sid,
				rid : data.ok[0][1],
				step : 15
			});
			//TODO 登录后的逻辑--进入主页面
			//Pi.localStorage.rid = data.ok[0][1];
			updata("user.rid",data.ok[0][1]);
			updata("user.state",loginState.role_logined);
			updata("user.roleType",1);
			saveUser("rid",[locDB.user.uid,data.ok[0][1]]);
			setUserHead();
			succCallback && succCallback(data);
		}
	});
};
/**
 * @description 登录注册，先登录，如果账号不存在则自动注册
 * @example
 */
const autoRegist = (username,password, usertype,cb) => {
	regist_user(
		username,
		password,
		usertype,
		function(){
			loginUser(
				username,
				password,
				usertype,
				cb
			);
		}
	);
};

//平台登录
const loginPlatUser = (obj) => {
	updata("user.from",obj.from);
	if(!Pi.regist){
		login(obj.uid,usertype.pt,obj.sign,loginBack(obj.uid,obj.sign,usertype.pt,obj.uid,obj.sign));
		return;
	}
	let u = getRegisterUser(obj.from + obj.uid,obj.uid),
		cb = function(){
			//设置重登录账号信息
			//net_relogin(u);
			//Pi.localStorage.ptFrom;
		};
	autoRegist(u.username ,u.password ,obj.type||10000 ,cb);
};

//随机字符串
let randomString = function (len: Number) {
	len = len || 32;
	let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	let maxPos = $chars.length;
	let pwd = '';
　　for (let i = 0; i < len; i++) {
	pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

//微信登录
const wxLogin = () => {
	//alert(JSON.parse(Pi.localStorage));
	if (wxInfo && wxInfo.unionid) {
		//缓存中有unionid
		let u = getRegisterUser(wxInfo.unionid, wxInfo.unionid),
			cb = () => {
				//设置重登录账号信息
				//net_relogin(u);
			};
		updata("user.username",u.username);
		autoRegist(u.username,u.password,usertype.weixin,cb);
	}
};

/**
 * @description 初始化登录
 * @example
 */
const initLoad = () => {
	let user = getLocalUser("u",locKey.u);
	let obj = 
		// {"from":"quickgame","ptid":4676,"uid":4676,"sign":"3264d8cd62d9d4d82228cf3431d73856"};
	Pi.localStorage.ptFrom ? JSON.parse(Pi.localStorage.ptFrom) : {from:Pi.author};
	// console.log(Pi.localStorage.ptFrom);
	// if (obj.from != Pi.author) {
	// 	loginPlatUser(obj);
	// }else 
	if (wxInfo) {
		//后台记录进入进度
		setLog("log",{
			sid : Pi.sid,
			step : 9
		});
		wxLogin();
	} else if(obj.uid){
		//后台记录进入进度
		setLog("log",{
			sid : Pi.sid,
			step : 12
		});
		loginPlatUser(obj);
	} else if (user.pid) {
		//后台记录进入进度
		setLog("log",{
			sid : Pi.sid,
			step : 10
		});
		loginUser(
			user.username,
			user.password,
			parseInt(user.usertype)
			
		);
	}else{
		//后台记录进入进度
		setLog("log",{
			sid : Pi.sid,
			step : 11
		});
	}
	
	return user;
};
//检查资源是否下载完成，前台下载
let getForeload = function () {
	let arr = ["fight/a/","cfg/b/","cfg/c/","fight/b/","app_b/"];
	//判断是否新角色
	//否则直接app_b/ && app_c/一起下载
	// if(locDB.user.roleType === 1){
		arr.push("app_c/");
	// }else{
		// splitDir("app_c");
	// }
	if(timer){
		clearTimeout(timer);
		timer = null;
	}
	loadNow(arr,() => {
		if((window as any).pi_modules.store.exports.check())
			Pi.localStorage.loaded = 1;
		//关闭登录界面，进入主界面 
		//open("app_b-guide-force");
		destory(userWidget);
		setLog("log",{
			sid : Pi.sid,
			step : 17
		});
	},() => {
		setTimeout(() => {
			globalSend("closeFastlogin");
			//后台记录进入进度
			setLog("log",{
				sid : Pi.sid,
				step : 20
			});
		},10);
	});
};
/**
 * @description 前台点击事件 进入游戏
 */
const intoMain = () => {
	//后台记录进入进度
	setLog("log",{
		sid : Pi.sid,
		step : 16
	});
	console.log("login loading!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	openLoad();
	getForeload();
};
//进入游戏 arg-"国家Id-角色id"
const goIntoGame = function(){
	let area = locDB.user.country.areas[locDB.user.country.defaulteServer],
		role = area.role?area.role[0]:null;
	//登陆角色
	if (role) {
		loginRole(role.role_id, locDB.user.usertype, intoMain);
	} else {
		//TODO...
		//加载角色登录场景资源
		// loadNow(getRes("player").concat(getRes("login")),() => {
				open("app_a-user-name");
		// });
	}
};

/**
 * @description 检测名字性别是否合法
 */
const nameTest = function () {

	if (!locDB.user.rolename) {
		updata("user.err.name","名字不能为空");
		return false
	} 
	//是否为纯数字
	let regNum = /^[0-9]+$/;
	if (regNum.test(locDB.user.rolename)) {
		updata("user.err.name","名字不能为纯数字");
		return false
	}
	//特殊符号
	let regsp = /[^0-9A-Za-z\u4e00-\u9fa5]/g;
	if (regsp.test(locDB.user.rolename)) {
		updata("user.err.name","名字不能包含特殊符号");
		return false
	}

	// if (locDB.user.sex == -1) {
	// 	updata("user.err.name","未选择角色");
	// 	return false
	// }
	return true
}
/**
 * @description 处理国家列表
 */
const dealServer = (data,type) => {
	let arealist = [],
		roleList = {},
		defaulteServer;
	for(let i=0,leng = data.length;i<leng;i++){
		let r:any = Common.changeArrToJson(data[i]),
			a;
		//处理国家
		a = Common.changeArrToJson(r.area);
		Common.mergeJsonVal(a,areacfg[a.area]);
		//通过type过滤当前玩家显示的列表，存入解析完的数据
		if(a.type === type){
			defaulteServer = a.area;
			arealist[a.area] = a;
		}else continue;

		//判断是否以前登录过
		let serverIndex = Pi.localStorage["serverIndex"];
		if (serverIndex) {
			defaulteServer = serverIndex - 0;
		} else {
			Pi.localStorage.setItem("serverIndex", defaulteServer);
		}

		//处理角色
		if(r.role){
			a.role = [];
			roleList[a.area] = [];
			for(let j=0,len = r.role.length;j<len;j++){
				let rl:any = Common.changeArrToJson(r.role[j]);
				rl.role_name = Common.fromCharCode(rl.role_name);
				a.role.push(rl);
				roleList[a.area].push(rl);
			}
		}
		
	}
	updata("user.country.areas",arealist);
	updata("user.country.defaulteServer",defaulteServer);
	updata("user.country.roles",roleList);
	return arealist[defaulteServer];
};

// ================================== 立即执行
/**
 * @description 初始化用戶數據結構
 */
insert("user",{
	"uid" : 0,
	"rid" : 0,
	"career_id": 700001,
	"index": 1,
	"username":"",
	"password":"",
	"repassword":"",
	"head":"",
	"isAgree" : true,
	"rolename":"",
	"roleType":0,
	"sex":1,
	"state":0,
	"special":"",
	"usertype":0,
	"err":{
		"login":"",
		"regist":"",
		"name":""	
	},
	"country":{
		areas: 0,
		defaulteServer: null,
		index: 1,
		type: "server",
		roles: null
	},
	"select_area": false,  //表示是否选打开选服
})

/**
 * 设置默认用户名
 */
let lu = getLocalUser("u",locKey.u);
if(lu.username){
	updata("user.username",lu.username);
	u_name = lu.username;
}
/**
 * @description 监听登录数据变化，刷新widget
 */
listen("user",()=>{
	forelet.paint(locDB.user);
});
/**
 * @description 接收进入游戏点击事件
 */
forelet.goIntoGame = () => {
	goIntoGame();
};
/**
 * 选服
 */
forelet.openSelectArea = () => {
	updata("user.select_area", true);
	if (Object.keys(locDB.user.country.roles).length > 0) {
		updata("user.country.index", 0);
		searchArea(0);
	} else {
		updata("user.country.index", 1);
		searchArea(1);
	}
	forelet.paint(locDB.user);
}
/**
 * 返回默认状态
 */
forelet.goback = () => {
	updata("user.select_area", false);
	forelet.paint(locDB.user);
}
forelet.select = (index) => {
	updata("user.country.index", index);
	searchArea(index);
	forelet.paint(locDB.user);
}

const searchArea = function (index) {
	let hasRoleServer = [];
	let country = locDB.user.country;
	if (index == 0) {
		Object.keys(country.roles).forEach((v) => {
			hasRoleServer.push(country.areas[v]);
		});
	} else {
		hasRoleServer = country.areas.slice((index - 1) * 10 + 1, index * 10 + 1);
	}
	updata("user.country.hasRoleServer", hasRoleServer);
}
/**
 * 选择服务器
 */
forelet.selectArea = (i) => {
	updata("user.select_area", false);
	updata("user.country.defaulteServer", i);
	Pi.localStorage.setItem("serverIndex", i);
	forelet.paint(locDB.user);
}
/**
 * @description 接收登录点击事件
 */
forelet.login = () => {
	let u = getRegisterUser(locDB.user.username,locDB.user.password);
	loginUser(u.username,u.password,usertype.hand);
}
/**
 * @description 接收注册点击事件
 */
forelet.registuser = () => {
	let r = checkUser(locDB.user);
	if(r){
		errTip(errType[r]);
		//updata("user.err.regist",errType[r]);
		return;
	}
	let u = getRegisterUser(locDB.user.username,locDB.user.password);
	regist_user(u.username,u.password, usertype.hand,()=>{
		loginUser(u.username,u.password,usertype.hand);
	});
}
/**
 * @description 接收微信登录事件
 */
forelet.fastLogin = () => {
	// wxLogin();
	let un = randomString(8),
	ps = randomString(14);
	updata("user.username",un);
	updata("user.password",ps);
	updata("user.repassword",ps);
	forelet.registuser();
}
/**
 * @description 注册角色
 */
forelet.goIntoNameGame = (arg) => {
	let area = locDB.user.country.areas[locDB.user.country.defaulteServer];
	if(nameTest()){
		(function(w){
			createRole(
				area.index,
				locDB.user.rolename,
				locDB.user.sex,
				locDB.user.usertype,
				locDB.user.career_id,
				() => {
					console.log("Create role ===========================================================",w);
					destory(w);
					intoMain();
					InfoToPt.isCreate = true;
				}
			);
		})(arg.widget);
	}
}
//接收input values
forelet.listenInputText = (cmd) => {
	updata("user."+cmd.id,cmd.text);
	updata("user.err.login","");
	console.log("login input value : ", cmd);
}
//退出登录状态
forelet.logOut = () => {
	//清楚本地
	clearLoginInfo();
	//后台通讯登出
	logout();
	forelet.paint(locDB.user);
}

//切换登录注册
forelet.channel = (cmd) => {
	if(cmd === 1) {
		clearLoginInfo();
		updata("user.username", "");
	} else {
		updata("user.username", u_name);
	}
	paintUser(cmd);
	forelet.paint(locDB.user);
}
//打开通知
forelet.openNotice = () => {
	globalSend("openNotice");
}

/**
 * @description paint默认数据
 */
forelet.paint(locDB.user);

// ========================================== 立即执行

//设置重登录回调
setReloginCallback((data)=>{
	if(data.type === "logerror"){
		alert("重新登录失败，请刷新游戏~");
		refresh();
	}else if(data.type === "relogin"){
		//通知需要清除会话状态的功能模块
		if(locDB.user.rid){
			updata("user.state",loginState.init);
			globalSend("relogin_ok");
		}
	}
});

//错误提示
export const errTip = function (words) {
	let divRoot = document.getElementById("err");
	if (!divRoot) return;
	var son = document.createElement("div");
	var t;
	
	t = 1500;
	son.setAttribute("class", "err_tip");
	son.innerHTML = words;
	var divNode = document.createElement("div");
	divNode.appendChild(son);
	divRoot.appendChild(divNode);
	setTimeout(function () {
		divRoot.removeChild(divNode);
	}, t);
};

