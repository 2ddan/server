
// ============================== 导入
import { Json } from '../../pi/lang/type';
import { mapCopy } from "../../pi/util/util";
import { userCfg, saveUserCfg } from '../user_cfg';
import * as Mgr from '../mgr/widget_mgr';
import { cssCfg } from './cssCfg';
import { getCache, Widget, setCache, lookup } from "../../pi/widget/widget";
import { gen } from "../../pi/compile/genvdom";
import { toFun } from "../../pi/util/tpl";
import * as Editer from '../util/editer';
import { getClazzName } from '../util/html';
import { sheets } from "./css_sheet"
import { HtmlAttr } from '../util/html_attr';



// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Inspector extends Widget {
	userAttr = { key: null, value: null } //自定义属性
	create() {
		Mgr.register(this);
	}
	//展开
	spread(key) {
		let spreadArr = cssCfg[key].split;
		let index = spread.indexOf(spreadArr[0])
		if (index > -1) {
			spread.splice(index, spreadArr.length);
		}
		else {
			spread = spread.concat(spreadArr);
		}
		updataInsp(this)
	}
	//删除
	delete(key) {
		deleteKey(key);
	}
	deleteTrans(value) {
		if (value) {
			updateKey("transform", value)
		}
		else {
			deleteKey("transform");
		}
	}
	//收藏
	addStar(key, has) {
		if (has) {
			let index = star.indexOf(key);
			star.splice(index, 1);
		}
		else
			star.push(key);
		userCfg.inspector.star = star;
		saveUserCfg();
		updataInsp(this)
	}
	//搜索
	search(e, key) {
		if (key === 'style')
			searchStyle = e.target.value;
		else if (key === 'class')
			searchClass = e.target.value;
		updataInsp(this)
	}
	//自定义attr的输入
	attrKey(e, key) {
		let hideAttrs = ["goto"]
		let v = e.target.value;
		if (key == "key" && /[0-9]/.test(v[0])) {
			alert(`The key cannot be a number!`);
			e.target.value = "";
			return;
		}
		if (key == "key" && hideAttrs.indexOf(v) !== -1) {
			alert(`limited key!`);
			e.target.value = "";
			return;
		}
		this.userAttr[key] = v;
	}
	//添加attr
	addUserAttr(e) {
		let inputs = e.native.target.parentNode.children;
		inputs[0].value = "";
		inputs[1].value = "";
		if (!this.userAttr.key) {
			alert(`The key cannot be empty!`)
			return;
		}
		updataBase(this.userAttr.key, this.userAttr.value);
	}
	//修改自定义attr
	changeUserAttr(e, key) {
		updataBase(key, e.target.value);
	}
	//删除自定义attr
	deleteUserAttr(key) {
		deleteBase(key);
	}

	//修改跳转路径
	changeGoto(e) {
		let value = e.target.value;
		if (/^[a-zA-Z0-9_]+$/.test(value.replace("-", "")))
			updataBase("goto", value)
		else
			alert("format does not match.")
	}
	//删除跳转路径
	deleteGoto() {
		deleteBase("goto");
	}
	//跳转
	gotoPage(path) {
		Mgr.open(path);
	}

	//修改属性值
	changeValue(e) {
		let key = e.target.dataset.key;
		let value = e.target.value;
		updateKey(key, value);
	}
	showClass(str) {
		showClassArr = [];
		if (showClass === str) {
			showClass = "";
		}
		else {
			showClass = str;
			let s = sheets.get(str);
			if (s && s.size) {
				s.forEach((v, k) => {
					showClassArr.push(`${k}: ${v};`)
				})
			}
		}
		updataInsp(this)
	}
	deleteClass(name) {
		let index = classArr.indexOf(name);
		if (index !== -1) {
			classArr.splice(index, 1)
			updataClass(classArr);
			showClass === name && (showClassArr = []);
			updataInsp(this)
		}
	}

	open() {
		updataInsp(this)
	}
	nodeChange() {
		updataInsp(this)
	}
	attrChange() {
		updataInsp(this)
	}
	clazzChange() {
		updataInsp(this)
	}
	selectChange() {
		updataInsp(this)
	}
	addclassChange(param) {
		let sid = Mgr.environment.select.selectSids[0];
		if (sid === undefined) return;
		classArr.push(param);
		updataClass(classArr);
		updataInsp(this)
	}
}

const updataInsp = (w: Widget) => {
	w.props = getData();
	w.paint();
}


let spread = [],//需要展开显示的key
	star = userCfg.inspector.star,//常用的属性
	searchStyle, //搜索属性的内容
	searchClass, //搜索class
	classArr = [],//该元素包含的class
	showClass = '',//当前显示的class名
	showClassArr = []//当前显示的class内容

/**
 * 初始化数据
 */
let clazzMap;
const getData = () => {
	let selects = Mgr.environment.select.selectSids;
	if (!selects || selects.length === 0) {
		return;
	}
	let attrs = Mgr.environment.htmlAttr.getAttrs(selects[selects.length - 1])

	let temp: any = {};
	temp.data = attrs;
	temp.lang = userCfg.inspector.lang;
	temp.clazz = clazzMap = attrs ? Mgr.environment.htmlAttr.getCurClazz(attrs) || new Map() : new Map();
	temp.cssCfg = cssCfg;
	temp.flexCfg = flexCfg;
	temp.gridCfg = gridCfg;
	temp.spread = spread;
	temp.updateKey = updateKey;
	temp.concatAttr = concatAttr;
	temp.splitAttr = splitAttr;
	temp.setBoxShadow = setBoxShadow;
	temp.getBoxShadow = getBoxShadow;
	temp.star = star;
	temp.starArr = concatStar(temp.clazz, attrs ? attrs.style.map : new Map());
	temp.searchStyle = searchStyle;
	temp.saveScript = saveScript;
	temp.searchClass = searchClass;
	temp.changeClass = changeClass;
	temp.showClass = showClass;
	temp.showClassArr = showClassArr;

	classArr = copyArr(attrs ? attrs.class.arr : null);
	temp.classArr = classArr;

	return temp;
}
const copyArr = (old) => {
	let arr = [];
	if (!old) return arr;
	for (let i = 0; i < old.length; i++) {
		arr[i] = old[i]
	}
	return arr;
}

/**
 * 更新base attr
 * @param key 
 * @param value 
 */
const updataBase = (key: string, value: any) => {
	let sid = Mgr.environment.select.getSelectSids()[0];
	let attrs = Mgr.environment.htmlAttr.clone(sid);
	attrs.base.set(key, JSON.stringify(value));
	Editer.modifyAttrs(sid, attrs);
}
/**
 * 删除base attr
 * @param key 要删除的key值
 */
const deleteBase = (key: string) => {
	let sid = Mgr.environment.select.getSelectSids()[0];
	let attrs = Mgr.environment.htmlAttr.clone(sid);
	attrs.base.delete(key);
	Editer.modifyAttrs(sid, attrs);
}
/**
 * 修改class
 * @param oldClass 
 * @param newClass 
 */
const changeClass = (oldClass, newClass) => {
	let i = classArr.indexOf(oldClass)
	classArr[i] = newClass;
	updataClass(classArr);
}
/**
 * 更新class
 * @param newClass 新的class 数组
 */
const updataClass = (newClass: Array<string>) => {
	let sid = Mgr.environment.select.getSelectSids()[0];
	let attrs = Mgr.environment.htmlAttr.clone(sid);
	attrs.class.arr = newClass;
	Editer.modifyAttrs(sid, attrs);
}

const saveScript = (str) => {
	// //撤销
	// let undoParam = [], redoParam = [];
	// let sid = getSelectSids()[0];
	// undoParam.push({ sid: sid, attrs: clone(sid) });

	// let attrs = getAttrs(sid);
	// attrs.script = str;
	// modifyElems([{ sid: sid, attrs: attrs }]);
	// //更新源码块

	// redoParam.push({ sid: sid, attrs: clone(sid) });
	// let unReDo: UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: modifyElems, redo: modifyElems };
	// addUndo(unReDo);
}

/**
 * 删除clazz中的属性
 * @param key 要删除的key值
 */
const deleteKey = (key: string) => {
	let sid = Mgr.environment.select.getSelectSids()[0];
	Editer.delClazzs([key], sid + "");
}

/**
 * 更新某条属性
 * @param key 
 * @param value  
 */
let rootOutKey = ["left", "top", "right", "bottom", "width", "height"];
let layoutKey = ["position", "left", "top"];
const updateKey = (key: string, value: string) => {
	key = key.replace(/(\-)([a-z])/g, (s0, s1, s2) => { return s2.toUpperCase() })
	let selectEs = Mgr.environment.select.getSelectEs()[0];
	if (selectEs.parentElement.getAttribute("layout") && layoutKey.indexOf(key) !== -1) {
		alert(`can not change this value of layout box!`)
		return;
	}

	let sid = Mgr.environment.select.getSelectSids()[0];
	if (sid == 2 && rootOutKey.indexOf(key) !== -1) {
		alert(`can not change this value of main box!`)
		return;
	};

	let clazzMap = new Map<string, string>();
	// grid 网格数
	if (selectEs.getAttribute("layout") === "grid") {
		let style = selectEs.style as any;
		let column = style.gridTemplateColumns.split(" ").length;
		let row = style.gridTemplateRows.split(" ").length;
		switch (key) {
			case "width":
				let ceilWidth = (parseFloat(value) - parseFloat(style.gridRowGap) * (column - 1)) / column;
				clazzMap.set("gridTemplateColumns", `repeat(${column},${Math.floor(ceilWidth)}px)`);
				break;
			case "height":
				let ceilHeight = (parseFloat(value) - parseFloat(style.gridColumnGap) * (row - 1)) / row;
				clazzMap.set("gridTemplateRows", `repeat(${row},${Math.floor(ceilHeight)}px)`)
				break;
			case "gridTemplateRows":
				clazzMap.set("gridTemplateAreas", getGridArea(+value, column));
				let templateRows = (selectEs.clientWidth - parseFloat(style.gridRowGap) * (+value - 1)) / +value;
				value = `repeat(${value},${Math.floor(templateRows)}px)`;
				break;
			case "gridTemplateColumns":
				clazzMap.set("gridTemplateAreas", getGridArea(row, +value));
				let templateColumns = (selectEs.clientWidth - parseFloat(style.gridRowGap) * (+value - 1)) / +value;
				value = `repeat(${value},${Math.floor(templateColumns)}px)`;
				break;
		}
	}
	clazzMap.set(key, value);
	Editer.modifyStyles([{ el: selectEs, style: clazzMap }]);
}
// 计算grid-template-area
const getGridArea = (row: number, column: number): string => {
	let area = [];
	for (let i = 0; i < row; i++) {
		let s = ""
		for (let j = 0; j < column; j++) {
			s += `"r${i}c${j}"`;
		}
		area.push(s)
	}
	return area.join(" ");
}

/**
 * 获取可拆分属性的所有结果 	！！！这里在存储的时候默认是分开存储，所以获取时需要合并一下
 * @param clazz clazz map
 * @param arr 拆分的数组对象
 * @param type 值类型，如果没获取到值、数字类型转换成'0'，其他类型添加 ''
 */
const concatAttr = (clazz, arr, type) => {
	let result = "";
	for (let i = 0; i < arr.length; i++) {
		let v = clazz.get(arr[i].replace(/(\-)([a-z])/g, function (s1, s2, s3) { return s3.toUpperCase() }));
		result += (v ? ' ' + v : type == 'Number' ? ' 0' : '');
	}
	if (result.indexOf(" ") > -1 && parseFloat(result) !== 0)
		return result.slice(1, result.length);
}


/**
 * 更改合并值后拆分存储
 * @param arr 拆分attr
 * @param fun 执行函数
 * @param value 合并值
 */
const splitAttr = (arr, fun, value) => {
	let a = value.split(" ");
	for (let i = 0; i < arr.length; i++) {
		if (i == 0) {
			fun(arr[i], a[0]);
		} else if (i == 1) {
			fun(arr[i], a[1] || a[0]);
		} else if (i == 2) {
			fun(arr[i], a[2] || a[0]);
		} else if (i == 3) {
			fun(arr[i], a[3] || a[2] || a[0]);
		}
		// switch (i) {
		// 	case 0: fun(arr[i], a[0]);
		// 	case 1: fun(arr[i], a[1] || a[0]);
		// 	case 2: fun(arr[i], a[2] || a[0]);
		// 	case 3: fun(arr[i], a[3] || a[2] || a[0]);
		// }
	}
}
/*
result[arr[0]] = a[0];//上
result[arr[1]] = a[1] || a[0];//右
result[arr[2]] = a[2] || a[0];//下
result[arr[3]] = a[3] || a[2] || a[0];//左
*/

/**
 * 修改单一box-shadow属性
 * @param boxShadow box-shadow style
 * @param key 当前修改的是所有组合属性哪个
 * @param value 修改的值
 */
const setBoxShadow = (key, value) => {
	if (value == "outset") value = "";
	let boxShadow = clazzMap.get("boxShadow");
	let arr = getBoxShadow(boxShadow);
	arr[key] = value;
	updateKey("boxShadow", arr.join(" "));
}

// 2px 2xp 2px 2px rgba(0,0,0,0) inset
const getBoxShadow = (str) => {
	!str && (str = "");
	let inset = "", color = "rgb(255,255,255)";
	let boxShadow = ["0px", "0px", "0px", "0px"];
	str = str.replace(/inset/, function (s0) {
		inset = s0;
		return "";
	})

	for (let i = 0; i < boxShadow.length; i++) {
		str = str.replace(/\d+px/, function (s0) {
			boxShadow[i] = s0;
			return "";
		})
	}
	if (str.match(/\S+/))
		color = str.match(/\S+/)[0];
	boxShadow.push(inset);
	boxShadow.unshift(color);
	return boxShadow;
}
const concatStar = (clazz, style) => {
	let arr = JSON.parse(JSON.stringify(star));
	let outRule = ["transform"]
	if (clazz && clazz.size) {
		clazz.forEach((v, k) => {
			if (arr.indexOf(k) === -1 && outRule.indexOf(k) === -1) {
				arr.push(k)
			}
		})
	}
	if (style && style.size) {
		style.forEach((v, k) => {
			if (arr.indexOf(k) == -1) {
				arr.push(k)
			}
		})
	}
	return arr;
}
let mirror = ["scale(1,-1)", "scale(-1,1)", "scale(-1,-1)"];

let transInfo: any = {}
export const parseTrans = (str) => {
	transInfo = {};
	str = str || "";
	let arr = str.split(" ");
	for (let i = 0; i < arr.length; i++) {
		if (mirror.indexOf(arr[i]) !== -1) {
			transInfo.scale = arr[i];
		}
		else if (arr[i].indexOf("rotateZ") !== -1) {
			transInfo.rotateZ = arr[i].replace("rotateZ(", "").replace(")", "").trim();
		}
	}
	return transInfo;
}

export const updataTrans = (key: string, value) => {
	transInfo[key] = value;
	let arr = [];
	if (transInfo.scale) arr.push(transInfo.scale)
	if (transInfo.rotateZ) arr.push(`rotateZ(${transInfo.rotateZ})`)

	updateKey("transform", arr.join(" "))
}
export const deleteTrans = (key: string) => {
	if (key === "rotateZ" && transInfo.scale) {
		return transInfo.scale;
	}
	else if (key === "scale" && transInfo.rotateZ) {
		return `rotateZ(${transInfo.rotateZ})`;
	}
	else return ""
}
//0

let flexCfg = {
	"flexDirection": {
		"arr": ["row", "row-reverse", "column", "column-reverse"],
		"arr_desc": ["从左往右", "从右往左", "从上往下", "从下往上"],
		"desc": "主轴方向"
	},
	"flexWrap": {
		"arr": ["nowrap", "wrap", "wrap-reverse"],
		"arr_desc": ["不换行", "换行", "反向排&换行"],
		"desc": "项目是否换行"
	},
	"justifyContent": {
		"arr": ["flex-start", "flex-end", "center", "space-between", "space-around"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "两端对齐，中间平分", "平分间距"],
		"desc": "主轴上的对齐方式"
	},
	"alignItems": {
		"arr": ["flex-start", "flex-end", "center", "baseline", "stretch"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "文本基底线", "拉伸铺满"],
		"desc": "主轴交叉轴的对齐方式"
	},
	"alignContent": {
		"arr": ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "两端对齐，中间平分", "平分间距", "拉伸铺满"],
		"desc": "多根轴线对齐方式"
	}
}

let gridCfg = {
	"gridTemplateRows": {
		"style": "clientHeight",
		"grap": "gridRowGap",
		"desc": "网格行数"
	},
	"gridTemplateColumns": {
		"style": "clientWidth",
		"grap": "gridColumnGap",
		"desc": "网格列数"
	},
	"gridRowGap": {
		"unit": ["px"],
		"desc": "行间距"
	},
	"gridColumnGap": {
		"unit": ["px"],
		"desc": "列间距"
	},
	"gridAutoFlow": {
		"arr": ["row", "columns"],
		"arr_desc": ["横向", "纵向"],
		"desc": "排列方向"
	},
	"justifyContent": {
		"arr": ["flex-start", "flex-end", "center", "space-between", "space-around"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "两端对齐，中间平分", "平分间距"],
		"desc": "网格横向对齐"
	},
	"justifyItems": {
		"arr": ["flex-start", "flex-end", "center", "baseline", "stretch"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "文本基底线", "拉伸铺满"],
		"desc": "格子内横向对齐"
	},
	"alignContent": {
		"arr": ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "两端对齐，中间平分", "平分间距", "拉伸铺满"],
		"desc": "网格纵向对齐"
	},
	"alignItems": {
		"arr": ["flex-start", "flex-end", "center", "baseline", "stretch"],
		"arr_desc": ["起点对齐", "终点对齐", "中对齐", "文本基底线", "拉伸铺满"],
		"desc": "格子内纵向对齐"
	}
}
