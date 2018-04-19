// ============================== 导入
import { Json } from '../../pi/lang/type';
import { toStr } from "../util/restore";
import * as Editer from "../util/editer";
import { Syntax } from "../../pi/compile/parser";
import { userCfg, saveUserCfg } from "../user_cfg";
import { Widget } from '../../pi/widget/widget';
import { TreeOp } from '../util/tree';
import { SyntaxOp } from '../util/syntax_op';
import { Select } from '../util/select';
import { HtmlAttr } from '../util/html_attr';
import { UrDo } from '../util/urdo';
import * as Mgr from "../mgr/widget_mgr"

export class Environment {
	widget: Widget;
	syntaxOp: SyntaxOp;
	treeOp: TreeOp;
	select: Select;
	htmlAttr: HtmlAttr;
	urDo: UrDo;
	openName: string;
	constructor(s: SyntaxOp, t: TreeOp, select: Select, h: HtmlAttr, u: UrDo, n: string) {
		this.syntaxOp = s;
		this.treeOp = t;
		this.select = select;
		this.htmlAttr = h;
		this.urDo = u;
		this.openName = n;
	}

	//设置widget
	setWidget(w: Widget) {
		this.widget = w;
	}
}


/**
 * 保存文件
 * @param content 内容
 * @param type 保存类型
 * @param success 保存成功回调
 * @param fail 失败回调
 */
export const keepFile = (conten: string, type: string, success?: Function, fail?: Function) => {
	let saveName = prompt("请输入保存文件名,不含后缀。\n eg:app_c/tower/demo");
	// `../../../../widgeteditor/src/editer/temp/`
	if (saveName) {
		let savePath = `../../../../${userCfg.rootFore}/src/` + saveName;
		save(savePath + "." + type, conten, success, fail);
	}
}
/**
 * 保存文件
 * @param wName 保存的组件名
 * @param path 路径
 * @param success 保存成功回调
 * @param fail 失败回调
 */
export const keep = (wName, path: string, success?: Function, fail?: Function) => {
	let currEnv = Mgr.getEnvironment(wName),
		tpl,
		wcss,
		cfg,
		data,
		saveName;

	if (currEnv) {
		tpl = toStr(currEnv.syntaxOp.syntax, true).replace("<div", `<div maxId="${currEnv.syntaxOp.maxSid}"`);
		let wcssName = []
		tpl.replace(/(w\-class=")([\d\s]+?)(")/g, (s1, s2, s3) => {
			wcssName = wcssName.concat(s3.split(" "))
		})
		wcss = getWcss(currEnv.widget.sheet, wcssName);
		cfg = getCfg(currEnv.widget.config);
		data = Editer.getTplData(wName);

		// let tpl = toStr(Mgr.environment.syntaxOp.syntax, true).replace("<div", `<div maxId="${Mgr.environment.syntaxOp.maxSid}"`);
		// let wcss = getWcss(Mgr.environment.widget.sheet);
		// let cfg = getCfg(Mgr.environment.widget.config);
		// let data = Editer.getTplData(wName);

		console.log(tpl + "\n", wcss + "\n", cfg + "\n");
		if (!path) {
			saveName = prompt("请输入保存文件名,不含后缀。\n eg:app_c/tower/demo");
			success = function () {
				userCfg.defaultOpen = saveName.replace(/\//g, "-");
			}
		}
		else {
			saveName = path;
		}
		// `../../../../widgeteditor/src/editer/temp/`
		if (saveName) {
			let savePath = `../../../../${userCfg.rootFore}/src/` + saveName;
			tpl && save(savePath + ".tpl", tpl, success, fail);
			wcss && save(savePath + ".wcss", wcss, success, fail);
			cfg && save(savePath + ".cfg", cfg, success, fail);
		}
	}
}
/**
 * 删除临时文件
 * @param name 内容
 * @param success 保存成功回调
 * @param fail 失败回调
 */
export const delTempFile = (name: string, success?: Function, fail?: Function) => {
	let delPath = `../../../../${userCfg.rootFore}/src/editer/temp/${name}`;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `/del?del=${delPath}&suffix=0`);
	xhr.addEventListener('error', r => {
		alert("通讯异常！")
		console.warn(r)
	}, false);
	xhr.addEventListener('readystatechange', r => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.warn(`delete ${name} result :\n` + xhr.response);
			if (xhr.response === "ok") {
				success && success(xhr.response);
			}
			else {
				fail && fail(xhr.response);
			}
		}
	}, false);
	xhr.send();
}

const save = (path: string, content: string, success?: Function, fail?: Function) => {
	let form = new FormData();
	form.append("content", new Blob([content]), path);

	let xhr = new XMLHttpRequest();
	xhr.open('POST', "/upload");
	xhr.addEventListener('error', r => {
		alert("通讯异常！")
		console.warn(r)
	}, false);
	xhr.addEventListener('readystatechange', r => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (JSON.parse(xhr.response).result === "0") {
				success && success(xhr.response);
				console.log(`save ${path} success`);
				console.log(new Date());
			}
			else {
				fail && fail(xhr.response);
				console.warn(`save ${path} result :\n` + xhr.response);
				alert(`怎么搞的😒😒😒,输个路径都输不对🙈\n${path}`);
			}
		}
	}, false);
	xhr.send(form);

	form = undefined;
}

//获取wcss
const getWcss = (sheet, classArr) => {
	if (sheet && sheet.value) {
		let wcssStr = ``;
		for (let v of sheet.value) {
			if (classArr.indexOf(v[0]) === -1 && classArr.indexOf(+v[0]) === -1)
				continue
			wcssStr += `.${v[0]} {\n`;
			if (v[1].map && v[1].map.size) {
				v[1].map.forEach((v, k) => {
					wcssStr += `    ${k.replace(/[A-Z]/g, function (s1) { return "-" + s1.toLowerCase() })}: ${("" + v).replace(/^\s+/g, "")};\n`;
				})
			}
			wcssStr += `}\n`;
		}
		return wcssStr;
	}
}

//获取cfg
const getCfg = (cfg) => {
	let cfgArr: Array<string> = []
	//解析对象
	const stringCfg = (obj, layer) => {
		let type = typeof obj;
		if (type === "number" || type === "boolean") {
			cfgArr.push(obj)
		}
		else if (type === "string") {
			cfgArr.push(`"${obj}"`)
		}
		else if (obj === null) {
			cfgArr.push("null")
		}
		else if (Array.isArray(obj)) {
			cfgArr.push("[");
			for (let i = 0; i < obj.length; i++) {
				stringCfg(obj[i], layer);
				if (i < obj.length - 1) cfgArr.push(",")
			}
			cfgArr.push("]")
		}
		else if (typeof obj === "object" && !Array.isArray(obj)) {
			cfgArr.push("{\n");
			layer++;
			for (let j = 0; j < layer; j++) {
				cfgArr.push("\t");
			}
			let keys = Object.keys(obj);
			for (let i = 0; i < keys.length; i++) {
				cfgArr.push(`"${keys[i]}": `);
				stringCfg(obj[keys[i]], layer);
				if (i === keys.length - 1) {
					cfgArr.push("\n");
					layer--;
				}
				else {
					cfgArr.push(",\n");
				}
				for (let j = 0; j < layer; j++) {
					cfgArr.push("\t");
				}
			}
			layer--;
			cfgArr.push("}")
		}
		else {
			cfgArr.push(JSON.stringify(obj))
		}
	}

	if (cfg && cfg.value) {
		stringCfg(cfg.value, 0);
		return cfgArr.join("");
	}
}



export const addAutoSave = () => {
	//退出的保存提示
	window.onbeforeunload = function () {
		// let d = new Date();
		// let name = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;
		// keep("editer/temp/tempsave", undefined, undefined);
		// userCfg.tempSave = "editer-temp-tempsave";
		// console.log(`%c save usercfg complete!\n%c${localStorage.editer}`, "font-size:20px;margin-left:-14px;", "font-size:12px;color:#00f;");
		let arr = userCfg.tabs.arr;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].needSave) {
				return `alert`;
			}
		}
	}
	autoSave()
}
//30秒自动保存
const autoSave = () => {
	setTimeout(function () {
		let arr = userCfg.tabs.arr;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].needSave) {
				let _path = "editer/temp/" + arr[i].path;
				keep(arr[i].path, _path, () => {
					arr[i].tempPath = _path;
					arr[i].needSave = false;
					arr[i].needFresh = true;
					saveUserCfg();
				})
			}
		}
		autoSave()
	}, 30 * 1000);
}

addAutoSave();