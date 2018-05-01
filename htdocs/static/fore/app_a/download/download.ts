/***
 * 游戏内资源加载
 * 1.资源慢速加载
 * 	慢速队列加载完才会执行下载完成回调
 * 	最好只请求一次，多次请求，如果之前请求未完成，造成任务堆叠，下载完成的回调会被覆盖（以后有需求再添加）
 * 2.立即下载
 * 请求立即下载时，如果慢速加载尚未完成，则合并慢速加载进度到立即下载任务上，这样可以保证请求立即加载之后，下载页面可以马上看到，提升体验
 */
// =================================导入
//pi
import * as util from "pi/widget/util";
import { open, remove, getWidth, getHeight } from "pi/ui/root";
import { loadCssRes } from "pi/widget/util";
import { addSceneRes } from "pi/render3d/load";
import { depend } from "pi/lang/mod";
import { BlobType } from "pi/util/res_mgr";
//mod
import { Common } from "app/mod/common";
import { Pi, findGlobalReceive, markFilesLoad, getSuffix, globalSend } from "app/mod/pi";

// ================================导出

/**
 * @description 慢速下载，请求的下载列表切开，按一个一个文件夹下,不做进度显示
 * 				比如：app_a/下第一层所有目录，不再切分更深目录
 * @param list{Array} 下载路径列表
 * 		callback{Function} 下载完成回调
 */
export const loadSlow = (oldUser,list:Array<String>,callback?:Function) => {
	//console.log("load slow ===========================");
	//TODO..
	//获取慢下载文件目录列表
	let arr = wait.slow.list,
		empty = [];
	for(var i=0,len = list.length;i<len;i++){
		let dst = depend.get(list[i]);
		if(!dst){
			continue;
		}
		arr.push(dst);
	}
	//console.error("空文件：",empty.join(","));
	wait.slow.list = arr;
	if(callback)wait.slow.loadback = callback;
	//如果当前没有加载任务，则开始慢下载
	loadNext();
};

/**
 * @description 立即下载，下载一旦空闲则立即下载，如果在请求之前有其他下载，则直接合并进度
 * @param list{Array} 下载路径列表
 * 		callback{Function} 进度到100%时，执行回调
 */
export const loadNow = (list:Array<String>,callback?:Function,foreback?:Function) => {
	//console.log("load now ===========================");
	//console.log("loadnow start !!!");
	wait.now.list = wait.now.list.concat(list);
	if(callback)wait.now.loadback = callback;
	if(foreback)wait.now.foreback = foreback;
	initShow();
	//初始化显示数据
	nodeCfg.display = "block";
	nodeCfg.pause = false;
	openDownload();
	loadNext();
	render();
	//console.log("loadnow render !!!");
}

/**
 * @description 批分下载文件表,如果用户第一次进入且新角色,才会调用
 * @param 
 */
export const splitDir = (dir) => {
	let list = wait.slow.list,
		arr = [];
	for(var i=0,len = list.length;i<len;i++){
		let dst = list[i];
		//是app..类第一层目录，则寻找子目录
		if(dir === dst.path && !dst.path.match(/\//g)){
			arr = arr.concat(json_arr(dst.children));
		//否则直接添加到队列
		}else arr.push(dst);
	}
	//从小到大排序
	arr.sort((a,b):number => {
		return a.size - b.size;
	});
	//console.error("空文件：",empty.join(","));
	wait.slow.list = arr;
};

/**
 * @description 打开下载组件，
 * @param 
 */
export const openLoad = () => {
	//初始化进度条显示数据
	initShow();
	nodeCfg.display = "block";
	if(openDownload()){
		//更新页面
		paint();
	}
};

// =============================== 本地
/**
 * @description 下载widget
 */
let downloadWidget;

/**
 * @description 界面显示数据
 */
let	nodeCfg;

/**
 * @description 当前下载进度
 */
let process;

/**
 * @description 等待下载列表,优先下载now,之后则一个一个下载slow
 * 				now队列需要合并不？
 */
let wait = {
	"slow":{
		"list":[],
		"loadback":null//下载完成并且解析完成后调用
	},
	"now":{
		"list":[],
		"loadback":null,//下载完成并且解析完成后调用
		"foreback":null//进度显示关闭后调用
	}
}

/**
 * @description 清除wait列表
 */
const clearWait = (type) => {
	let list = wait[type];
	for(let k in list){
		if(k == "list"){
			list[k] = [];
		}else list[k] = null;
	}
};

/**
 * @description json对象转数组
 */
const json_arr = (_json) => {
	let arr = [];
	for(let k in _json){
		arr.push(_json[k]);
	}
	return arr;
}

/**
 * @description 初始化
 */
const initShow = () => {
	nodeCfg = {
		speed:0.025,
		show:0,
		width:getWidth(),
		height:getHeight(),
		pause :true,
		state:"资源加载..",
		display :"none"
	};
};


/**
 * @description 计算当前进度条显示内，所有需要下载任务的完成进度
 * @return 0~1
 */
const getCurr = ():any => {
	let rate = process.rate,
		slow = process.prev?process.prev.loaded:1,
		now = process.loaded;
	return slow*(1-rate)+now*rate;
};

/**
 * @description 修改进度条样式
 */
const calc = () => {
	//计算当前下载完成进度
	let _curr = getCurr();
	//更新显示进度
	nodeCfg.show += nodeCfg.speed;
	if(nodeCfg.show>_curr)nodeCfg.show = _curr;
	//获取根窗体最新大小
	nodeCfg.width = getWidth();
	nodeCfg.height = getHeight();
	//更新页面
	paint();
	//console.log("loaded "+nodeCfg.show,process.files);
	//进度显示完成
	if(nodeCfg.show == 1){
		//console.log("loaded 1 !!!",process);
		//关闭渲染
		nodeCfg.pause = true;
		//cpu稳定时执行`
		Common.cpuFree(() => {
			//隐藏进度条窗体
			initShow();
			//更新页面
			paint();
			//now任务结束之后再进行slow任务
			nextTimer();
			process = null;
			//console.log("loadnow cpuFree !!!",process);
		});
		//执行前台回调
		process.foreback && process.foreback();
	}
};
/**
 * @description 刷新组件
 */
const paint = () => {
	downloadWidget.setProps(nodeCfg);
	downloadWidget.paint();
}
/**
 * 
 */

/**
 * @description 渲染器
 */
const render = () => {
	if(nodeCfg.pause)return;
	//setTimeout(render,50);
	requestAnimationFrame(render);
	calc();
};

/**
 * @description 打开download组件
 */
const openDownload = () => {
	if(downloadWidget)return true;
	downloadWidget = open("app_a-download-download",nodeCfg);
	return false;
};

/**
 * @description 创建下载进度,正常进度分两节，一是底层文件下载加载进度，二是高层文件处理进度
 * 				如果
 * @param type{String} "slow"||"now"
 * 		  list{Array} 最终交由底层下载的路径列表
 * @return {
 * 	loaded : 0, //下载进度0~1
 * 	rate : 0.5, //0.5~1 正常进度所占比例，同时也作为慢下载和立即下载进度合并的比例
 *  loadBack : Function, //下载完成高层统一处理数据的回调方法
 * 	files : Array<String>, //下载文件列表
 * 	...
 * 	callback : Function, //slow或者now一组列表下完执行的外部回调
 * }
 */
const creatLoad = (type,list) => {
	console.log(type,list);
	let pro = (window as any).pi_modules.commonjs.exports.getProcess();
	pro.type = type;
	pro.loaded = 0;
	//下载进度占比，剩余比例留给下载后解析
	pro.rate = (50+ Math.floor(50*Math.random()))/100;
	//进度回调，进度改变调用，r在0-1之间，1表示loaddir进度完成
	pro.show(function(r){
		pro.loaded = r*pro.rate;
	});
	//下载完之后处理资源
	pro.loadBack = (fileMap?:JSON) => {
		if(fileMap)dealFileMap(fileMap);
		pro.loaded = 1;
		//调用外部回调，循环外执行
		if(pro.callback)((c)=>{
			setTimeout(c,0);
		})(pro.callback);
	};
	pro.files = list;
	return pro;
};

/**
 * @description 获取指定文件夹下未加载的所有文件
 * @param list (文件||文件夹)列表
 */
const findFilesList = (list) => {
	let arr = [],
		func = (f) => {
			if(f.children){
				for(let k in f.children){
					func(f.children[k]);
				}
			}else if(f.path.indexOf(".")>0 && !Pi.fileMap[f.path]){
				arr.push(f.path);
			}
		};
	for(let i =0,leng = list.length;i<leng;i++){
		let f = depend.get(list[i]);
		func(f);
	}
	return arr;
}

/**
 * @description 本次慢任务下载列表
 * @param wait.slow.list 慢任务等待表
 */
const getSlowList = (_list) => {
	//console.log(_list);
	let arr = [],
		add = (dir) => {
			if(dir.loaded && _list.length)
				add(_list.shift());
			else if(!dir.loaded){
				arr.push(dir.path+"/");
				dir.loaded = 1;
			}
		};
	add(_list.shift());
	return arr;
};

/**
 * @description 本次慢任务下载列表
 * @param wait.slow.list 慢任务等待表
 */
const getNowList = (_list) => {
	//console.log(_list);
	let arr = [],
		add = (dir) => {
			let f = depend.get(dir);
			if(!f.loaded){
				arr.push(dir);
				f.loaded = 1;
				//测试代码
				for(let k in wait.slow.list){
					let item = wait.slow.list[k];
					if(item.path+"/" == dir){
						console.log(item);
					}
				}
			}
			if(_list.length)
				add(_list.shift());
		};
	add(_list.shift());
	return arr;
};

/**
 * @description 调用底层下载接口
 * @param list{Array} 最终交由底层下载的路径列表
 */
const loadDir = (__process) => {
	let dontLoad:Array<string> = findFilesList(__process.files);
	let func = (fileMap?) => {
		__process.loadBack(fileMap);
		//循环外执行
		//slow任务结束之后接着后面的加载
		//now任务结束之后，则必须等到进度显示完成后，再进行后面的加载
		//console.log("loadDir callback : "+__process.files.join(","),__process);
		if(__process.type == "slow" || __process.parent){
			nextTimer();
			if(__process === process)process = null;
		}
	};
	//如果没有文件需要下载，则直接执行回调，进入下一步下载
	if(dontLoad.length == 0){
		func();
		return;
	}
	//console.log("loadDir start : "+__process.files.join(","),__process);
	//下载开始
	util.loadDir(__process.files, Pi.flags,{},{png:"download", jpg:"download", jpeg:"download", webp:"download", gif:"download", svg:"download", mp3:"download", ogg:"download", aac:"download"}, function(fileMap,mods) {
		func(fileMap);
		globalSend("loadover");
	}, function(r) {
		if(!Pi.wxLogin)alert("加载目录失败, "+__process.files.join(",") + r.error + ":" + r.reason);
	},__process.handler);
};

/**
 * @description 衔接下载等待列表
 * @param 
 */
const loadNext = () => {
	let _pro = process,
		cango = !_pro || _pro.loaded >= 1;
	//判断slow下载完成、now正在等待，则直接进行now下载
	if(_pro && _pro.type === "now" && _pro.loaded === 0 && _pro.prev && _pro.prev.loaded === 1){
		return loadDir(_pro);
	}
	//创建立即下载任务
	if(wait.now.list.length){
		let _arr = getNowList(wait.now.list);
		process = creatLoad("now",_arr);
		if(!cango){
			_pro.parent = process;
			process.prev = _pro;
		}
		if(wait.now.loadback)process.callback = wait.now.loadback;
		if(wait.now.foreback)process.foreback = wait.now.foreback;
		clearWait("now");
	//创建慢任务
	}else if(cango && wait.slow.list.length){
		let _arr = getSlowList(wait.slow.list);
		process = creatLoad("slow",_arr);
		if(wait.slow.list.length === 0 && wait.slow.loadback){
			process.callback = wait.slow.loadback;
		}
	}	
	//立即进行下载
	//否则等待正在下载的任务完成，自动进行下一步
	if(cango && process){
		loadDir(process);
		//console.log("load dir ===========================");
	}
};
/**
 * @description 后续下载定时器，异步调用，减少阻塞，不允许重复调用loadNext方法
 */
const nextTimer = (() => {
	let timer;
	return () => {
		if(timer)return console.log("Repeat call loadNext function!!");
		timer = setTimeout(()=>{
			timer = null;
			//当前如果是立即下载任务，则必须等待进度回调进入
			if(process && process.type=="now" && process.loaded == 1)return;
			loadNext();
		},0);
	};
})();

const checkCssRes = (r) => {
	for(var k in r.suffix){
		if(r.suffix[k] && BlobType[k])return true;
	}
	return false;
};

/**
 * @description 生成下载处理函数表，比如：场景资源加载，rcss资源加载，js模块全局广播函数绑定...
 * @param fileMap{Json} 最终交由底层下载的路径列表
 */
const dealFileMap = (fileMap) => {
	//TODO...
	//添加下载记录
	let r:any = markFilesLoad(fileMap);
	//addSceneRes
	if(r.prefix["app/scene_res/"]){
		addSceneRes(fileMap, "app/scene_res/");
		for(let k in r.prefix["app/scene_res/"]){
			delete fileMap[r.prefix["app/scene_res/"][k]];
		}
	}
	//绑定全局广播函数
	if(r.suffix.js)findGlobalReceive(fileMap);
	//loadCssRes
	if(checkCssRes(r)){
		// let c = r.prefix["app_c/"];
		// for(let k in c){
		// 	let sf = getSuffix(c[k]);
		// 	if(sf && sf !== "css" && sf !== "rcss"){
		// 		delete fileMap[c[k]];
		// 	}
		// }
		let tab = loadCssRes(fileMap,()=>{});
		tab.timeout = 60000;
		// if(Pi.flags.os.name === "ios")
			// tab.release();
	}
	for(let k in fileMap){
		delete fileMap[k];
	}
	//initMusic
	//初始化音乐资源,播放背景音乐
	// if(r.suffix["mp3"]){
	// 	let Music = (window as any).pi_modules["app/mod/music"].exports.Music;
	// 	Music && Music.initMusic && Music.initMusic(fileMap);
	// }
	//initTipsCfg
};