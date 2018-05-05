/**
 * 单连接管理器，提供登录，断点续连，慢请求提示等功能
 */

// ============================== 导入
import { Connect } from "../net/websocket/connect";
import { Forelet } from "../widget/forelet";
import { now } from "../lang/time";
import { commonjs } from '../lang/mod';
import { HandlerResult, Handler, HandlerMap } from "../util/event";
import { callTime } from "../util/task_mgr";

// ============================== 导出
/**
 * @description 枚举连接状态
 */
export enum ConState {
	init = 0,
	opening,
	opened,
	closed
};

/**
 * @description 枚举登录状态
 */
export enum LoginState {
	init = 0,
	logining,
	logined,
	relogining,
	logouting,
	logouted,
	logerror,
}

/**
 * @description 导出的forelet
 */
export const forelet = new Forelet();

/**
 * 获取通讯地址
 */
export const getUrl = () => {
	return conUrl;
};

/**
 * 设置通讯地址
 */
export const setUrl = (url: string) => {
	conUrl = url;
}

/**
 * 打开连接
 */
export const open = (callback: Function, errorCallback: Function, timeout?: number) => {
	timeout = timeout || defaultTimeout;
	if(openTimer){
		clearTimeout(openTimer);
		openTimer = null;
	}
	let lastError;
	// 接收后台推送服务器时间，并设置成服务器时间
	Connect.setNotify((msg) => {
		if (msg.type === "closed") {
			sendPing.alert(`back(${msg.reason.code})`);
			setConState(ConState.closed);
			// if(ConState.opening !== conState && loginState !== LoginState.relogining){
			// 	reopen();
			// }
		} else if (msg.msg) {
			con.activeTime = now();
			if (msg.msg.type === "echo_time") {
				localTime = now();
				serverTime = msg.msg.param.stime;
				pingpong = localTime - msg.msg.param.ctime;
				// alert(`echo_time ${msg.msg.param.ctime}`);
			} else {
				handlerMap.notify(msg.msg.type, [msg.msg.param]);
			}
		}
	});
	ping();
	timeout += now();
	let cfg = { encode: false, isText: (commonjs.flags.os.name === "Android") && (commonjs.flags.os.version < "4.4.0") };
	let func = (result) => {
		if (result.error) {
			if (now() > timeout) {
				setConState(ConState.closed);
				if(errorCallback)
					return callTime(errorCallback, [lastError ? lastError : result], "open");
			}
			lastError = result;
			openTimer = setTimeout(function () {
				Connect.open(conUrl, cfg, func, 10000);
			}, 3000);
			console.log("open err!!")
		} else {
			con = result;
			setConState(ConState.opened);
			sendPing.send();
			callTime(callback, [result], "open");
			console.log("open ok!!")
		}
	};
	Connect.open(conUrl, cfg, func, 10000);
	setConState(ConState.opening);
	console.log("opening!!")
}

/**
 * 通讯请求
 */
export const request = (msg: any, cb: Function, timeout?: number, force?: boolean) => {
	if (!(conState === ConState.opened && (force || loginState === LoginState.logined)))
		return waitArray.push({ msg: msg, cb: cb });
	let ref = setTimeout(function () {
		ref = 0;
		slowReq++;
		show();
	}, waitTimeout);
	// setTimeout(()=>{
	// 	console.log(msg,"request ===== ");
	// 	localStorage.rq += `|${msg.param[""]}${JSON.stringify(msg)}${msg.param[""]}|`;
	// },0);
	// alert(`request ${msg.type}`);
	con.request(msg, (r) => {
		if (r.error) {
			if (conState === ConState.closed) {
				reopen();
			}
		}
		con.activeTime = now();
		if (ref) {
			clearTimeout(ref);
		} else {
			slowReq--;
			show();
		}
		
		// let func = new Function("a",'return a.replace(/\\|'+msg.param[""]+'.+'+msg.param[""]+'\\|/,"");');
		// localStorage.rq = func(localStorage.rq);
		// func = undefined;
		callTime(cb, [r], "request");
	}, timeout || defaultTimeout);
}

/**
 * 发送请求
 */
export const send = (msg: any) => {
	con && con.send(msg);
}

/**
 * 登录
 */
export const login = (uid:string, type:number, password:string, cb:Function, timeout?: number) => {
	if(con === null) {
		if(conState !== ConState.init)
			throw new Error("login, invalid state: "+conState);
		return open(() => {
			login(uid, type, password, cb, timeout);
		}, (result) => {
			callTime(cb, [result], "login");
		}, timeout);
	}
	con.request({ type: "login", param: { "type": type, "password": password, "user": uid } }, (result) => {
		if (result.error) {
			setLoginState(LoginState.logerror);
			result.result = result.error;
			callTime(cb, [result], "logerror");
		} else {
			setLoginState(LoginState.logined);
			requestWaits();
			user = uid;
			userType = type;
			tempPassword = result.password;
			result.result = 1;
			callTime(cb, [result], "login");
		}
	}, timeout || defaultTimeout);
	setLoginState(LoginState.logining);
};

/**
 * 登出
 */
export const logout = () => {
	//setLoginState(LoginState.logouting);
	request({ type: "logout",param:{} }, (result) => {
		setLoginState(LoginState.logouted);
	}, defaultTimeout);
}

/**
 * 重登录成功或失败的回调
 * @param cb
 */
export const setReloginCallback = (cb: Function) => {
	reloginCallback = cb;
}

/**
 * 消息处理器
 * @param cb
 */
export const setMsgHandler = (type: string, cb: Function) => {
	handlerMap.add(type, (r) => {
		callTime(cb, [r], "recv");
		return HandlerResult.OK;
	});
}

/**
 * 获取服务器时间
 */
export const getSeverTime = () => {
	return now() - localTime + serverTime;
}
/**
 * 获取ping的来回时间
 */
export const getPingPongTime = () => {
	return pingpong;
}

/**
 * 获取连接状态
 */
export const getConState = () => {
	return conState;
}

/**
 * 获取登录状态
 */
export const getLoginState = () => {
	return loginState;
}

// ============================== 本地
// 默认的超时时间
const defaultTimeout: number = 10000;

/**
 * 重登录回调
 */
let reloginCallback: Function = null;

/**
 * 消息处理列表
 */
let handlerMap: HandlerMap = new HandlerMap;

/**
 * con表示连接
 */
let con: any = null;

/**
 * 连接状态
 */
let conState: ConState = ConState.init;

/**
 * 登录状态
 */
let loginState: LoginState = LoginState.init;

/**
 * 登录用户信息
 */
let user: string = "";

/**
 * 登录用户类型，为多平台相同用户名做准备
 */
let userType: number = 0;

/**
 * 登录成功后，生成临时密码，在重登陆需要配合使用
 */
let tempPassword: string = "";

// 连接中断时，需要等待连接并登录成功后的请求
let waitArray: Array<any> = [];

/**
 * 慢请求总数量
 */
let slowReq: number = 0;

//通讯地址
let conUrl: string = "";

// 通讯等待时间
const waitTimeout = 200;

// 超时关闭链接
const closeTimeout = 30000;

//心跳时间
const pingTime = 10000;

//服务器时间
let serverTime = 0;
//本地时间
let localTime = 0;
//通讯时间，ping的来回时间
let pingpong = 0;

//创建连接定时器
let openTimer = null;

// 设置连接状态
const setConState = (s:number) => {
	if(conState === s)
		return;
	conState = s;
	show();
}
// 设置登录状态
const setLoginState = (s:number) => {
	if(loginState === s)
		return;
	loginState = s;
	show();
}

/**
 * 重新打开连接
 */
const reopen = () => {
	
	open(() => {
		if (loginState === LoginState.logined || loginState === LoginState.relogining)
			relogin();
	}, null);
}
/**
 * 重登录
 */
const relogin = () => {
	console.log("重登录");
	request({ type: "relogin", param: { user: user, userType: userType, password: tempPassword } }, (result) => {
		if (result.error) {
			setLoginState(LoginState.logerror);
			reloginCallback && reloginCallback({ type: "logerror", result:result });
			sendPing.alert(`relogin error ${result}`);
		} else {
			setLoginState(LoginState.logined);
			requestWaits();
			reloginCallback && reloginCallback({ type: "relogin", result:result });
			sendPing.alert("relogin ok");
		}
	}, defaultTimeout);
	setLoginState(LoginState.relogining);
}

/**
 * 将所有等待申请列表全部请求
 */
const requestWaits = () => {
	waitArray.map(elem => { return request(elem.msg, elem.cb, defaultTimeout); });
}

/**
 * 定时器：每隔10s调用一次，发送本地时间
 */
const ping = () => {
	let func = () => {
		if (conState === ConState.closed) {
			reopen();
		} else if (conState === ConState.opened) {
			if (now() > con.getActiveTime() + closeTimeout) {
				sendPing.alert("fore close");
				con.close();
				setConState(ConState.closed);
				reopen();
			} else
				sendPing.send();
		}
		setTimeout(func, pingTime);
	}
	setTimeout(func, pingTime);
}
const sendPing = (() => {
	let m:any = {};
	m.now = [];
	m.send = () => {
		if(m.now.length > 5){
			m.now.length = 5;
		}
		let param = { ctime: now() };
		m.now = [JSON.stringify(param)].concat(m.now);
		con.send({ type: "app@time", param: param});
	};
	m.alert = (msg) => {
		// alert("now :::: "+msg+","+m.now.join(","));
	}
	return m;
})();

/**
 * 绘制
 */
let show = () => {
	forelet.paint({ ping:pingpong, slowReq: slowReq, con: conState, login: loginState });
}
