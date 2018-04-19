/*
 * 组件工具模块
 */

// ============================== 导入
import { Widget, register, factory, getCache, setCache } from "../../pi/widget/widget";
import { paintCmd3 } from "../../pi/widget/painter";
import { Forelet } from "../../pi/widget/forelet";
import { Sheet, parse } from "../../pi/widget/style";
import { toFun, compile,addJson, installText, addText, chFunc } from "../../pi/util/tpl";
import {gen} from "../../pi/compile/genvdom";
import { Json } from '../../pi/lang/type';
import { Mod, butil, depend, load, commonjs } from '../../pi/lang/mod';
import { logLevel, warn } from '../../pi/util/log';
import { Parser } from "../../pi/util/tpl_str";
import { set as task } from '../../pi/util/task_mgr';
import { addCssNode, loadCssNode } from "../../pi/util/html";
import { getValue, mapCopy } from "../../pi/util/util";
import { RES_TYPE_BLOB, ResTab, BlobType } from "../../pi/util/res_mgr";
import { parserTpl } from "../../pi/compile/vdom";

// ============================== 导出
export let level = logLevel;

/**
 * @description 将指定名称的组件，加入到el元素的第一个元素前，会延迟到帧调用时添加
 * @example
 */
export const addWidget = (el: HTMLElement, name: string, props?: Json): Widget => {
	var w = factory(name);
	if (!w)
		return;
	if (props)
		w.setProps(props);
	w.paint();
	paintCmd3(el, "appendChild", [w.tree.link]);
	return w;
}

/**
 * @description 标签匹配， 判断模式字符串，是否和标签匹配，标签可以多级
 * @example
 * not($b1) or($b1,$b2) and(or($b1=c1,$b2!=c2), not($b3)
 * 	$b1、$b2表示flag是否含有此键， $b2!=c2表示flag的b2键的值要不等于c2
 */
export const flagMatch = (pattern: string, flags: Json): boolean => {
	return parseMatch({ str: pattern.trim() }, flags);
}

/**
 * @description 列出目录及子目录下所有的文件，跳过重复文件
 * 如果一个目录中含有.match后缀的文件，则表示该目录需要进行匹配，如果匹配成功，则该目录的文件和子目录可以被列出
 * @example
 */
export const listDir = (info: any, flags: Json, fileList: Array<string>, suffixMap: Json, without: any, suffixCfg:any): void => {
	if(without[info.path])
		return;
	let children = info.children, files = [], dirs = [];
	for (let name in children) {
		if (!children.hasOwnProperty(name))
			continue;
		let info = children[name];
		if (info.children) {
			dirs.push(info);
			continue;
		}
		let suffix = butil.fileSuffix(name);
		if (suffix !== "match") {
			files.push(info);
		} else if (!flagMatch(name.slice(0, name.length - 6), flags))
			return;
	}
	for (let i = files.length - 1; i > -1; i --)
		listFile(files[i], flags, fileList, suffixMap, without, suffixCfg);
	for (let d of dirs)
		listDir(d, flags, fileList, suffixMap, without, suffixCfg);
}

/**
 * @description 加载并注册指定目录及子目录下的所有模块、组件和资源（图片、声音、字体……）
 * 次序是按照目录逐层加载，目录按序深度遍历加载
 * 精确下载，如果目录含匹配定义文件，如果和当前标签不匹配，则该目录及子目录不下载和加载
 * 先加载所有的模块及其依赖模块，然后加载所有的组件，最后执行所有模块内的loadDirCompleted方法
 * 前端的三种兼容（compat）： 1、模块（B模块修饰A模块） 2、组件（B组件修饰A组件） 3、资源（文字-构建系统预处理 css图片及字体-构建系统预处理），统一通过loadDirCompleted方法来处理兼容问题
 * 
 * 组件可以是<组件名>.widget，也可以是<组件名>.wcss, <组件名>.tpl, <组件名>.js，如果有tpl就算一个组件，会默认同名的css和js构成组件，如果js模块内导出了一个forelet，则认为是这个组件的forelet。
 * .widget、*.wcss、*.js可以引用到dirs以外的文件，该文件又可能引用新的文件，会需要多次碎片加载，所以都不支持引用外部目录的文件。
 * @example
 */
export const loadDir = (dirs: Array<string>, flags: Json, without: any, suffixCfg:any, successCallback: Function, errorCallback: Function, processCallback: Function): Json => {
	let fileList = [], suffixMap = { js: [], tpl: [], widget: [] };
	without = without || {};
	if(suffixCfg) {
		for(let k in suffix_cfg) {
			if(!suffixCfg[k])
				suffixCfg[k] = suffix_cfg[k];
		}
	}else
		suffixCfg = suffix_cfg;
	for (let dir of dirs) {
		let info = depend.get(dir);
		if (!info)
			throw new Error("dir not found, name:" + dir);
		if(info.children)
			listDir(info, flags, fileList, suffixMap, without, suffixCfg);
		else
			listFile(info, flags, fileList, suffixMap, without, suffixCfg);
	}
	// fileList 去除所有的模块文件
	for (let f, i = fileList.length - 1; i >= 0; i--) {
		f = fileList[i].path;
		// 跳过后缀不为".js"的文件
		if ((f.charCodeAt(f.length - 1) !== 115 || f.charCodeAt(f.length - 2) !== 106 || f.charCodeAt(f.length - 3) !== 46))
			continue;
		if (i < fileList.length - 1)
			fileList[i] = fileList[fileList.length - 1];
		fileList.length--;
	}
	// modNames 去除已经加载的模块文件
	let modNames = suffixMap.js;
	for (let f, j, i = modNames.length - 1; i >= 0; i--) {
		f = modNames[i];
		modNames[i] = f.slice(0, f.length - 3);
		if (commonjs.check(modNames[i]) !== true)
			continue;
		if (i < modNames.length - 1)
			modNames[i] = modNames[modNames.length - 1];
		modNames.length--;
	}
	// 获得包括依赖模块在内的等待加载的模块文件
	let set = commonjs.depend(modNames);
	modNames.length = 0;
	// fileList 加上模块依赖的文件，合并下载
	for (let i = set.length - 1; i >= 0; i--) {
		let m = set[i];
		if (m.loaded)
			continue;
		fileList.push(m.info);
		modNames.push(m.id);
	}
	processCallback({type:"requireStart", total: modNames.length, download: modNames.length});
	let down = load.create(fileList, (fileMap) => {
		// 加载所有的模块
		commonjs.require(modNames, fileMap, (mods) => {
			loadNext(suffixMap, fileMap, mods, successCallback, processCallback);
		}, errorCallback, processCallback);
	}, errorCallback, processCallback);
	down.fileTab = without;
	load.start(down);
	return down;
}
/**
 * @description 加载全局css，并自动加载css上的图片和字体，并加载fileMap的BlobURL资源
 * @example
 */
export const loadCssRes = (fileMap): ResTab => {
	// 从fileMap中，提前将全部的BlobURL资源载入资源管理器上
	let tab = new ResTab(), cssArr = [], rcssArr = [];
	for (let k in fileMap) {
		let type = butil.fileSuffix(k);
		if (BlobType[type])
			tab.load(RES_TYPE_BLOB + ":" + k, RES_TYPE_BLOB, k, fileMap);
		else if (type === "css")
			cssArr.push(k);
		else if (type === "rcss")
			rcssArr.push(k);
	}
	// 加载不包含资源的全局样式和应用全局样式，应该是完全的兼容样式
	for (let k of cssArr)
		loadCss(fileMap[k]);
	// 加载包含资源的全局样式和应用全局样式，并自动加载css上的资源，应该是完全的兼容样式
	for (let k of rcssArr)
		addCssNode(replaceURL(butil.utf8Decode(fileMap[k]), k, tab));
	return tab;
}

/**
 * @description 获得指定模块的导出变量上，指定类型（包括父类型）的函数
 * @example
 */
export const getExport = (mod: any, func: Function, funcArgs): Function => {
	let k, v, exports = mod.exports;
	for (k in exports) {
		if (exports.hasOwnProperty(k)) {
			v = exports[k];
			if (func(v, funcArgs))
				return v;
		}
	}
}
/**
 * @description 获得指定模块的导出变量上，指定类型（包括父类型）的函数
 * @example
 */
export const getExportFunc = (mod: any, func: Function, funcArgs): Function => {
	let k, v, exports = mod.exports;
	for (k in exports) {
		if (exports.hasOwnProperty(k)) {
			v = exports[k];
			if (func(v, funcArgs))
				return () => exports[k];
		}
	}
}
/**
 * @description 检查对象是否为指定类型或其子类型
 * @example
 */
export const checkType = (obj: any, typeClass: Function): boolean => {
	return obj.prototype && typeClass.isPrototypeOf(obj);
}
/**
 * @description 检查对象是否为指定类型或其子类型的实例
 * @example
 */
export const checkInstance = (obj: any, typeClass: Function): boolean => {
	return obj instanceof typeClass;
}

// ============================== 本地
// 标签匹配的正则表达式
const var_reg = /^\$([a-zA-Z0-9\.\_]+)\s*/;
const str_reg = /^([a-zA-Z][a-zA-Z0-9\.\_]*)\s*/;
const number_reg = /^([0-9\.]+)\s*/;

// 样式中匹配URL的正则表达式，不匹配含有:的字符串，所以如果是http:或https:，则不替换
const CSS_URL = /url\(([^\)"':]*)\)/g;

// 默认的后缀配置处理, "downonly"表示仅下载，如果本地有则不加载， "none"表示不下载不加载
const suffix_cfg = {png:"downonly", jpg:"downonly", jpeg:"downonly", webp:"downonly", gif:"downonly", svg:"downonly", mp3:"downonly", ogg:"downonly", aac:"downonly"};

/**
 * @description 列出文件
 * @example
 */
const listFile = (info: Json, flags: Json, fileList: Array<string>, suffixMap: Json, without: any, suffixCfg:any): void => {
	let path = info.path;
	if(without[path])
		return;
	let suffix = butil.fileSuffix(path);
	let type = suffixCfg[suffix];
	if(type === "none")
		return;
	if(type === "downonly") {
		if(load.isLocal(path))
			return;
	}
	fileList && fileList.push(info);
	if (!suffixMap)
		return;
	let arr = suffixMap[suffix];
	if (arr)
		arr.push(path);
}

/**
 * @description 用BlobURL方式加载css
 * @example
 */
const loadCss = (data: ArrayBuffer): HTMLStyleElement => {
	let url = URL.createObjectURL(new Blob([data], { type: "text/css" }));
	return loadCssNode(url, () => {
		URL.revokeObjectURL(url);
	});
}

/**
 * @description 替换样式字符串中的url，并增加资源的引用计数
 * @example
 */
const replaceURL = (css: string, path: string, tab: ResTab): string => {
	return css.replace(CSS_URL, (str: string, s: string) => {
		s = butil.relativePath(s, path);
		let res = tab.get(RES_TYPE_BLOB + ":" + s);
		if (!res)
			return "";
		res.use();
		return "url(" + res.link + ")";
	});
}

/**
 * @description 目录加载的下一步，分析和创建*.tpl和*.widget对应的组件，执行脚本
 * @example
 */
const loadNext = (suffixMap: Json, fileMap: Json, mods: Array<Mod>, successCallback: Function, processCallback: Function): void => {
	task(() => {
		processCallback && processCallback({ type: "loadTpl" });
		let arr = suffixMap.tpl;
		for (let f of arr)
			loadTpl(f, fileMap);
	}, undefined, 3000000, 1);
	task(() => {
		processCallback && processCallback({ type: "loadWidget" });
		let arr = suffixMap.widget;
		for (let f of arr)
			loadWidget(f, fileMap);
	}, undefined, 3000000, 1);
	task(() => {
		processCallback && processCallback({ type: "loadDirCompleted" });
		for (let m of mods)
			loadDirCompleted(m, fileMap);
		successCallback && successCallback(fileMap, mods);
	}, undefined, 3000000, 1);
}

/**
 * @description 创建组件
 * @example
 */
const loadTpl = (filename: string, fileMap: Json): void => {
	let widget, config, tpl, css: {value:Sheet}, forelet, name = filename.slice(0, filename.length - 4);
	let s = name + ".widget"; // 忽略有widget配置的组件
	if (fileMap[s])
		return;
	let mod = commonjs.relativeGet(name);

	if (mod) {
		widget = getExportFunc(mod, checkType, Widget);
		forelet = getExportFunc(mod, checkInstance, Forelet);
	}
	s = name + ".cfg";
	config = getCache(s);
	if (!config) {
		let data = fileMap[s];
		if (data) {
			config = JSON.parse(butil.utf8Decode(fileMap[s]));
			setCache(s, config);
		}
	}

	tpl = getCache(filename);
	if(!tpl){
		let tplStr = butil.utf8Decode(fileMap[filename]);
		tpl = { value: toFun(gen(parserTpl(tplStr)), filename), path: filename, wpath: null, str: tplStr};
		setCache(filename, tpl);
	}	

	s = name + ".wcss";
	css = getCache(s);
	if (!css) {
		let data = fileMap[s];
		if (data) {
			css = {value:parse(butil.utf8Decode(data), s)};
		}else{
			css = {value:null};
		}
			setCache(s, css);
	}
	register(name.replace(/\//g, "-"), widget, tpl , css, config, forelet);
}

/**
 * @description 创建组件
 * @example
 */
const loadWidget = (filename: string, fileMap: Json): void => {
	let widget, config, tpl, tplPath,  css: {value:Sheet}, forelet, data;
	let name = filename.slice(0, filename.length - 7);
	let cfg = JSON.parse(butil.utf8Decode(fileMap[filename]));
	if (cfg.js || cfg.widget) {
		let mod = commonjs.relativeGet(commonjs.modName(cfg.js), name);
		if (!mod) {
			warn(level, "widget js not found, name:", name, cfg.js);
			return;
		}
		widget = getExportFunc(mod, checkType, Widget);
	}
	if (cfg.cfg)
		config = loadCfg(cfg.cfg, fileMap, name);
	if (cfg.tpl) {
		tplPath = butil.relativePath(cfg.tpl, name);
		tpl = getCache(tplPath);
		if (!tpl) {
			data = fileMap[tplPath];
			if (!data) {
				warn(level, "widget tpl not found, name:", name, cfg.tpl);
				return;
			}
			let tplStr = butil.utf8Decode(data);
			tpl = { func: toFun(gen(parserTpl(tplStr)), filename), path: filename, wpath: null, str: tplStr};
			setCache(tplPath, tpl);
		}
	}
	if(cfg.css)
		css = {value: loadWcss(cfg.css, fileMap, name)};
	else
		css = {value: null};
	if (cfg.forelet) {
		let mod = commonjs.relativeGet(commonjs.modName(cfg.forelet), name);
		if (!mod) {
			warn(level, "widget forelet not found, name:", name, cfg.forelet);
			return;
		}
		forelet = getExportFunc(mod, checkInstance, Forelet);
	}
	register(name.replace(/\//g, "-"), widget, tpl, css, config, forelet);
}

/**
 * @description 加载配置
 * @example
 */
const loadCfg = (cfg: string | Array<string>, fileMap: Json, widget: string): Json => {
	if (Array.isArray(cfg)) {
		let json = undefined;
		for (let f of cfg) {
			let config = loadCfg1(f, fileMap, widget);
			if (!config)
				continue;
			if (!json)
				json = {};
			for (let k in config)
				json[k] = config[k];
		}
		return json;
	} else
		return loadCfg1(cfg, fileMap, widget);
}
/**
 * @description 加载配置
 * @example
 */
const loadCfg1 = (cfg: string, fileMap: Json, widget: string): Json => {
	let s = butil.relativePath(cfg, widget);
	let config = getCache(s);
	if (!config) {
		let data = fileMap[s];
		if (!data) {
			warn(level, "widget cfg not found, name:", widget, cfg);
			return;
		}
		config = JSON.parse(butil.utf8Decode(data));
		setCache(s, config);
	}
	return config;
}
/**
 * @description 加载配置
 * @example
 */
const loadWcss = (wcss: string | Array<string>, fileMap: Json, widget: string): Json => {
	if (Array.isArray(wcss)) {
		let sheet = undefined;
		for (let f of wcss) {
			let css = loadWcss1(f, fileMap, widget);
			if (!css)
				continue;
			if (!sheet)
				sheet = new Map();
			mapCopy(css, sheet);
		}
		return sheet;
	} else
		return loadWcss1(wcss, fileMap, widget);
}
/**
 * @description 加载样式
 * @example
 */
const loadWcss1 = (wcss: string, fileMap: Json, widget: string): Json => {
	let s = butil.relativePath(wcss, widget);
	let css = getCache(s);
	if (!css) {
		let data = fileMap[s];
		if (!data) {
			warn(level, "widget css not found, name:", widget, wcss);
			return;
		}
		css = parse(butil.utf8Decode(data), s);
		setCache(s, css);
	}
	return css;
}

/**
 * @description 调用模块的loadDirCompleted方法
 * @example
 */
const loadDirCompleted = (mod: Json, fileMap: Json): void => {
	let func = mod['loadDirCompleted'];
	func && func(fileMap);
}

/**
 * @description 标签匹配， 判断模式字符串，是否和标签匹配，标签可以多级
 * @example
 * not($b1) or($b1,$b2) and(or($b1=c1,$b2!=c2), not($b3)
 * 	$b1、$b2表示flag是否含有此键， $b2!=c2表示flag的b2键的值要不等于c2
 */
export const parseMatch = (pattern: any, flags: Json): boolean => {
	let s = pattern.str;
	if (s.startsWith("and(")) {
		pattern.str = s.slice(4).trim();
		return parseAnd(pattern, flags);
	}
	if (s.startsWith("or(")) {
		pattern.str = s.slice(3).trim();
		return parseOr(pattern, flags);
	}
	if (s.startsWith("not(")) {
		pattern.str = s.slice(4).trim();
		return parseNot(pattern, flags);
	}
	return parseEqual(pattern, flags);
}

/**
 * @description 分析not， ")"结束
 * @example
 */
const parseNot = (pattern: any, flags: Json): boolean => {
	let r = parseMatch(pattern, flags);
	let s = pattern.str;
	if (s.charCodeAt(0) !== 41) // ")"
		throw new Error("parse error, invalid pattern:" + pattern.str);
	pattern.str = s.slice(1).trim();
	return !r;
}
/**
 * @description 分析or， ","分隔， ")"结束
 * @example
 */
const parseOr = (pattern: any, flags: Json): boolean => {
	let rr = false;
	while (true) {
		let r = parseMatch(pattern, flags);
		let s = pattern.str;
		if (s.charCodeAt(0) === 44) { // ","
			pattern.str = s.slice(1).trim();
		} else if (s.charCodeAt(0) === 41) { // ")"
			pattern.str = s.slice(1).trim();
			return rr || r;
		} else
			throw new Error("parse error, invalid pattern:" + pattern.str);
		rr = rr || r;
	}
}
/**
 * @description 分析and， ","分隔， ")"结束
 * @example
 */
const parseAnd = (pattern: any, flags: Json): boolean => {
	let rr = true;
	while (true) {
		let r = parseMatch(pattern, flags);
		let s = pattern.str;
		if (s.charCodeAt(0) === 44) { // ","
			pattern.str = s.slice(1).trim();
		} else if (s.charCodeAt(0) === 41) { // ")"
			pattern.str = s.slice(1).trim();
			return rr && r;
		} else
			throw new Error("parse error, invalid pattern:" + pattern.str);
		rr = rr && r;
	}
}
/**
 * @description 分析变量， 判断 = != 3种情况
 * @example
 */
const parseEqual = (pattern: any, flags: Json): boolean => {
	let v1 = parseValue(pattern, flags);
	let s = pattern.str;
	if (s.charCodeAt(0) === 41) { // ")"
		return v1 !== undefined;
	}
	if (s.charCodeAt(0) === 44) { // ","
		return v1 !== undefined;
	}
	if (s.charCodeAt(0) === 61) { // "="
		pattern.str = s.slice(1).trim();
		let v2 = parseValue(pattern, flags);
		return v1 === v2;
	}
	if (s.charCodeAt(0) === 33 && s.charCodeAt(1) === 61) {// "!="
		pattern.str = s.slice(2).trim();
		let v2 = parseValue(pattern, flags);
		return v1 !== v2;
	}
	throw new Error("parse error, invalid pattern:" + pattern.str);
}

/**
 * @description 分析值，要么是变量，要么是字面量
 * @example
 */
const parseValue = (pattern: any, flags: Json): string | number => {
	let s = pattern.str;
	if (s.charCodeAt(0) === 36) { // "$"
		let arr = var_reg.exec(s);
		if (!arr)
			throw new Error("parse error, invalid pattern:" + pattern.str);
		pattern.str = s.slice(arr[0].length);
		return getValue(flags, arr[1]);
	}
	let arr = str_reg.exec(s);
	if (arr) {
		pattern.str = s.slice(arr[0].length);
		return arr[1];
	}
	arr = number_reg.exec(s);
	if (!arr)
		throw new Error("parse error, invalid pattern:" + pattern.str);
	pattern.str = s.slice(arr[0].length);
	return parseFloat(arr[1]);
}

// ============================== 立即执行
