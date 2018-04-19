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
	author : "ganchukeji"
};

/**
 * @description 导出配置 "cfg/"目录下，忽略所有子目录，以文件名为key
 */
export let cfg:any = {};

/**
 * @description 获取文件名后缀
 */
export const getSuffix = (path) =>{
	let r:any = path.match(/\.[\w|\d]+/g);
		r = r?r[r.length-1].substring(1):r;
	return r;
}

/**
 * @description 获取文件路径指定数量的文件夹层级
 */
export const getPerfix = (path,num) => {
	let r;
	switch (num) {
		case 1:
			r = path.match(/([^\.\/]+\/){1}/);
		case 2:
			r = path.match(/([^\.\/]+\/){2}/);
		case 3:
			r = path.match(/([^\.\/]+\/){3}/);
		case 4:
			r = path.match(/([^\.\/]+\/){4}/);
		case 5:
			r = path.match(/([^\.\/]+\/){5}/);
		default:
			let b = `return path.match(/([^\\.\\/]+\\/){${num}}/)`;
			r = (new Function("path",b))(path);
	}
	r = r?r[0]:r;
	return r;
}

/**
 * 找出当前模块绑定的"GlobalReceive"属性，有则存进列表
 */
export const findGlobalReceive = (fileMap) => {
	let mods = (window as any).pi_modules;
	for (let k in fileMap) {
		let _sf = getSuffix(k);
		if(_sf != "js" || k.indexOf("app")!==0)continue;
		let	name = k.replace(`.${_sf}`,"");
		let r = mods[name].exports["globalReceive"];
		if (r) {
			for (let j in r) {
				receiveTable[j] = receiveTable[j] || {};
				if(!receiveTable[j][mods[name].id]){
					receiveTable[j][mods[name].id] = r[j];
				}
			}
		}else{
			//console.error("There is no globalReceive function in '"+mods[k].id+"'");
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
		for (let k in list) {
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

/**
* @description 检查模块是不是没加载
*/
export const checkNoMod = (arr) =>{
    for(let k in arr){
        if(!(window as any).pi_modules[arr[k]])return true;
    }
}

/**
 * @description 绑定下载文件是否成功，成功则标记为1
 * @param fileMap{json} 下载结果集
 * 		 perback{Function} 每个文件回调
 * @return suffix { //文件后缀集
 * 			"js":[],
			"mp3":[],
			"mp4":[],
			"rcss":[]
		} 
		prefix { //文件前缀集
			"app/scene_res/res":[]
		}
 */
export const markFilesLoad = (fileMap:JSON,perback?:Function) => {
	let suffix = {},prefix = {};
	for(let k in fileMap){
		if(!fileMap[k])continue;
		if(Pi.fileMap[k] && (k.indexOf("rcss") > 0 || k.indexOf("css") > 0)){
			delete fileMap[k];
			continue;
		}
		Pi.fileMap[k] = 1;
		//匹配后缀
		let r:any = getSuffix(k);
		if(r && !suffix[r]){
			suffix[r] = 1;
		}
		//处理配置
		if(r==="js" && k.indexOf("cfg/")===0){
			addCfg(k);
		}
		//匹配前缀
		r = getPerfix(k,2);
		if(r && !prefix[r]){
			prefix[r] = prefix[r] || [];
			prefix[r].push(k);
		}
		r = getPerfix(k,1);
		if(r && !prefix[r]){
			prefix[r] = prefix[r] || [];
			prefix[r].push(k);
		}
		
		perback && perback(k,fileMap[k]);
	}
	return {suffix:suffix,prefix:prefix};
}


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
	img.src = url;
};
/**
 * @description 刷新页面
 */
let timer = null;
export const refresh = (url?) => {
	if(timer)return;
	location.href = url || (location.origin+location.pathname)+"?"+Math.random();
	timer = setTimeout(refresh, 50);
}

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
/**
 * @description 缓存配置文件到cfg中
 */
const addCfg = (name) => {
	let n = name.replace(".js", ""),
		m = (window as any).pi_modules[n].exports;
	n = n.replace(/.*(\/|\\)/, "");
	if(cfg[n])
		return console.error(`Has the same cfg ${n}`);
	cfg[n] = m;
};
 