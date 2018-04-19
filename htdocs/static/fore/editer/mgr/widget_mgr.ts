import * as Root from '../../pi/ui/root'
import { setShowWAttr, setCreateHandler, setAttr } from "../../pi/widget/painter";
import { VNode, VirtualWidgetNode, isVirtualWidgetNode } from '../../pi/widget/virtual_node';
import { getSheets } from "../ui_component/css_sheet";
import { muForelet } from "../forelet/mu_forelet";
import * as Editer from "../util/editer";
import { userCfg, saveUserCfg } from "../user_cfg";
import { Environment, keep as keepFile,delTempFile } from "../environment/core";
import { HtmlAttr } from "../util/html_attr";
import { Select } from "../util/select";
import * as Sop from "../util/syntax_op";
import * as Tree from "../util/tree";
import { UrDo } from "../util/urdo";
import { getCache, Widget, setCache, factory, lookup } from "../../pi/widget/widget";
import { arrDelete } from "../../pi/util/util";

export let environment: Environment,
	cfg: any = {
		lines: { arr: [] }
	}
const widgetList = [];

//打开编辑器初始化ui组件
export const init = () => {
	setShowWAttr(true);//设置paint时显示"w-"属性
	setCreateHandler(function (node) {
		if (!isVirtualWidgetNode(node)) {
			node.link.vNode = node;//paint时，如果是不是widget节点，在真是节点上引用vNode
		}
		setAttr(node, "sid", node.sid, true);//paint时，显示sid
	});
	getSheets()//解析style
	Root.open("editer-ui_component-structure", 1);//打开编辑器框架界面
	open(userCfg.defaultOpen || "editer-ui_component-default");//打开默认编辑界面
	userCfg.defaultOpen = "";
}

export const open = (wName) => {
	let tabs = userCfg.tabs;

	//缓存配置
	cfg = getCfg(tabs, wName);
	if (!cfg) {
		cfg = {
			title: wName.match(/[\d\w]+$/g)[0],
			path: wName,
			tempPath: "",
			lines: {
				arr: [],
				show: true
			},
			needSave: true
		}
		tabs.index = tabs.arr.push(cfg) - 1;
	}

	let path = wName.replace(/\-/g, "/")
	//临时保存
	if (cfg.tempPath && !cfg.needFresh) {
		restoreCatch(path, cfg.tempPath);
		cfg.needFresh = true;
	}

	let e = getEnvironment(wName);
	if (e) {
		environment = e;
		environment.select.clearS();
		notify("open", "tabChange");
	} else {
		let tplStr = getCache(path + ".tpl").str;
		let s = new Sop.SyntaxOp(tplStr);
		let t = new Tree.TreeOp(s.syntax);
		let h = new HtmlAttr(s.syntax);
		let select = new Select(s.syntax, null);
		let u = new UrDo();
		environment = new Environment(s, t, select, h, u, wName);
		eArr.push(environment);
		notify("open");
	}

}

export const register = (w: Widget) => {
	widgetList.push(w);
};

export const notify = (name: string, param?: any) => {
	for (let i = 0; i < widgetList.length; i++) {
		if (widgetList[i][name]) {
			widgetList[i][name](param);
		}
	}
};

let eArr: Array<Environment> = []

export const getEnvironment = (name: string) => {
	for (let i = 0; i < eArr.length; i++) {
		if (eArr[i].openName === name) {
			return eArr[i];
		}
	}
};

export const delEnvironment = (name: string) => {
	for (let i = 0; i < eArr.length; i++) {
		if (eArr[i].openName === name) {
			eArr = arrDelete(eArr, i);
			delTempFile(name)
		}
	}
};

const getCfg = (tabs, name: string) => {
	let arr = tabs.arr;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].path === name) {
			tabs.index = i;
			return arr[i]
		}
	}
}

/**
 * 恢复缓存的tpl
 * @param path 目标路径
 * @param tempPath 缓存路径
 */
const restoreCatch = (path: string, tempPath: string) => {
	let t = lookup(tempPath.replace(/\//g, "-"));
	let w = lookup(path.replace(/\//g, "-"));
	w.sheet = t.sheet;
	w.config = t.config;
	w.tpl.str = t.tpl.str;
	w.tpl.value = t.tpl.value;

	// 不能直接替换tpl ，因为其他地方有对tpl的引用
	// let tpl = getCache(tempPath + ".tpl");
	// let wcss = getCache(tempPath + ".wcss");
	// setCache(path + ".tpl", { path: path, str: tpl.str, value: tpl.value })
	// if (wcss)
	// 	setCache(path + ".wcss", wcss)
}

const newFile = () => {
	//Editer.newOpen("editer-ui_component-default");
}
const openFile = () => {
	let path = prompt("请输入打开widget路径\n eg:app_c/tower/demo");
	if (path)
		open(path.replace(/\//g, "-"));
}

//创建DIV
let singleTagReg = /(IMG)|(INPUT)|(BR)/
const createDiv = () => {
	let st = environment.select.getSelectEs()[0];
	let sid = environment.select.getSelectSids()[0];
	if (st.getAttribute("w-tag") && sid !== 2) {
		alert("Can not create a div in widget's tag!")
		return
	}
	else if (singleTagReg.test(st.tagName)) {
		alert("Can not create a div in single tag!")
		return
	}
	else if (st.tagName == "SPAN") {
		alert("Can not create a div in text tag!")
		return
	}
	Editer.createElem(sid);
}
//添加文本
const createText = () => {
	let st = environment.select.getSelectEs()[0];
	let sid = environment.select.getSelectSids()[0];
	if (st.getAttribute("w-tag") && sid !== 2) {
		alert("Can not create text in widget's tag!")
		return
	}
	else if (singleTagReg.test(st.tagName)) {
		alert("Can not create text in single tag!")
		return
	}
	else if (st.tagName == "SPAN") {
		alert("Can not create text in text tag!")
		return
	}

	Editer.createElem(sid, new Map([["position", "absolute"], ["color", "#fff"]]), "span");
}
//复制
const copy = () => {
	Editer.copy();
}
//粘贴
const paste = () => {
	Editer.paste();
}
//删除
const deleteE = () => {
	let selectEs = environment.select.getSelectEs();
	if (selectEs.length && selectEs.every(function (a) { return +a.getAttribute("sid") != 2 }))
		Editer.delElems(selectEs);
}
const zoomS = (e) => {
	//+
	if (e.keyCode === 107) {
		if (userCfg.zoom < 7.5)
			userCfg.zoom += 0.5;
	}
	//-
	else if (e.keyCode === 109) {
		if (userCfg.zoom > 0.5)
			userCfg.zoom -= 0.5;
	}
	//0
	else if (e.keyCode === 96) {
		userCfg.zoom = 1;
	}
	saveUserCfg();
	notify("zoomChange")
	e.preventDefault();
}

const undo = () => {
	environment.urDo.undo();
}
const redo = () => {
	environment.urDo.redo();
}
const keep = () => {
	keepFile(environment.openName, null);
}
const hideLines = () => {
	cfg.lines.show = !cfg.lines.show;
	saveUserCfg();
	notify("hideLines", cfg.lines.show)
}
let currTreeWidget = null;
export const setTreeUpdate = (w) => {
	currTreeWidget = w;
}
const reName = () => {
	let n = prompt("请输入标签显示名(可以是任意字符)：");
	if (n) {
		if (currTreeWidget) {
			currTreeWidget.props.show.value = n;
			currTreeWidget.paint()
		}
		let sid = environment.select.getSelectSids()[0];
		let attrs = environment.htmlAttr.clone(sid);
		attrs.base.set("editer_tree_show", JSON.stringify(n));
		Editer.modifyAttrs(sid, attrs);
	}
}

const setDefaultMenu = () => {
	muForelet.register("文件/新建", newFile, "Ctrl+N");
	muForelet.register("文件/打开", openFile, "Ctrl+O");
	muForelet.register("文件/保存", keep, "Ctrl+S");
	muForelet.register("文件/上一步", undo, "Ctrl+Z");
	muForelet.register("文件/下一步", redo, "Ctrl+Y");
	muForelet.register("widget/创建DIV", createDiv, "");
	muForelet.register("widget/添加文本", createText, "");
	muForelet.register("widget/重命名", reName, "");
	muForelet.register("widget/复制", copy, "Ctrl+C");
	muForelet.register("widget/粘贴", paste, "Ctrl+V");
	muForelet.register("widget/删除", deleteE, "Delete");
	muForelet.register("工具/放大", zoomS, "Ctrl+numAdd");
	muForelet.register("工具/缩小", zoomS, "Ctrl+numSub");
	muForelet.register("工具/重置缩放", zoomS, "Ctrl+num0");
	muForelet.register("工具/显示\隐藏参考线", hideLines, "Ctrl+H");

}
setDefaultMenu();


document.body.addEventListener("click", (e) => {
	if (document.activeElement !== e.target) {
		notify("selectOperation")
	}
})