
// ============================== 导入
import { Json } from '../../pi/lang/type';
import { offsetPos } from "../../pi/util/html";
import { Widget } from "../../pi/widget/widget";
import { getElementIn, getClazzName } from "../util/html";
import { Forelet } from "../../pi/widget/forelet";
import { setDownDeal } from "./operation";
import { dataTab } from "./structure";
import { mapCopy } from "../../pi/util/util";
import * as Mgr from '../mgr/widget_mgr';
import * as Editer from '../util/editer';
import { style } from '../../pi/widget/scroller/dom';


let left = 5000, top = 5000, right = -5000, bottom = -5000;

let points = [[-1, -1, 1, 1], [0, -1, 0, 1], [1, -1, 0, 1], [-1, 0, 1, 0], [1, 0, 0, 0], [-1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]];

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Select extends Widget {
	pos = [0, 0];
	point = -1;
	create() {
		Mgr.register(this);
	}
	setState(state: Json, oldStates?: Json): void {
		let selectEs = Mgr.environment.select.getSelectEs(),
			style, sct, ret, def = { left: 9999, top: 9999, right: -9999, bottom: -9999 }, pos;
		this.state = state = {};
		this.state.selects = [];

		for (let i = 0; i < selectEs.length; i++) {
			sct = selectEs[i];
			style = calcPos(sct);
			ret = calwhlt(style.width, style.height, style.left, style.top, def);
			this.state.selects.push(style);
		}
		if (ret) {
			this.state.box = ret;
		}
	}
	calPosWh(elem: HTMLElement, ret: Json) {
		return calwhlt(elem.offsetWidth, elem.offsetHeight, elem.clientLeft, elem.clientTop, ret);
	}
	down(e, cursor) {
		undoArr = [];
		let sids = Mgr.environment.select.getSelectSids();
		if (sids.some(function (a) { return a == 2 })) return;

		let dealFun = pointMove.bind(pointMove, this, points[e.target.dataset.point]);
		let endFun = modifyMoveEnd.bind(modifyMoveEnd, points[e.target.dataset.point])
		setDownDeal([e.x, e.y], dealFun, endFun, cursor);
		for (let i = 0; i < sids.length; i++) {
			undoArr.push({ sid: sids[i], attrs: Mgr.environment.htmlAttr.clone(sids[i]) });
		}
	}
	toDataTab() {
		dataTab();
	}

	open() {
		this.setState(null, null);
		this.paint();
	}

	nodeChange() {
		this.setState(null, null);
		this.paint();
	}
	attrChange() {
		this.setState(null, null);
		this.paint();
	}
	// clazzChange() {
	// 	this.setState(null, null);
	// 	this.paint();
	// }
	selectChange() {
		this.setState(null, null);
		this.paint();
	}
	selectStyleChange() {
		this.setState(null, null);
		this.paint();
	}
}

//撤销恢复
let undoArr = [], redoArr = [];


/**
 * 八个点的移动
 * @param point points 对应的点系数
 * @param value 鼠标位置 [x,y]
 */
const pointMove = (w, point: Array<number>, value: Array<number>) => {
	let selectEs = Mgr.environment.select.getSelectEs();
	let elems = [];
	let keys = ["width", "height", "left", "top"];
	for (let i = 0; i < selectEs.length; i++) {
		let style = [selectEs[i].clientWidth, selectEs[i].clientHeight, selectEs[i].offsetLeft, selectEs[i].offsetTop];

		for (let j = 0; j < keys.length; j++) {
			if (selectEs[i].parentElement.getAttribute("layout") && j > 1) {
				continue
			}
			let v = value[j % 2] * point[j] + style[j];
			selectEs[i].style[keys[j]] = (v < 0 ? 0 : v) + "px";
		}
	}
	w.paint();
}
/**
 * 八个点鼠标事件结束
 * @param point points 对应的点系数
 * @param isClick 是否是点击
 * @param value 鼠标位置 [x,y]
 */
const modifyMoveEnd = (point: Array<number>, isClick: boolean, value: Array<number>) => {
	if (isClick) return
	redoArr = [];

	let selectEs = Mgr.environment.select.getSelectEs();
	let sids = Mgr.environment.select.getSelectSids();
	let param = [];
	let keys = ["width", "height", "left", "top"];
	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let style = [selectEs[i].clientWidth, selectEs[i].clientHeight, selectEs[i].offsetLeft, selectEs[i].offsetTop];

		for (let j = 0; j < keys.length; j++) {
			let v = value[j % 2] * point[j] + style[j];
			// grid 网格数
			if (selectEs[i].getAttribute("layout") === "grid") {
				let style = selectEs[i].style as any;
				if (keys[j] === "width") {
					let column = style.gridTemplateColumns.split(" ").length;
					let ceilWidth = (v - parseFloat(style.gridRowGap) * (column - 1)) / column;
					clazzMap.set("gridTemplateColumns", `repeat(${column},${Math.floor(ceilWidth)}px)`);
				}
				else if (keys[j] === "height") {
					let row = style.gridTemplateRows.split(" ").length;
					let ceilHeight = (v - parseFloat(style.gridColumnGap) * (row - 1)) / row;
					clazzMap.set("gridTemplateRows", `repeat(${row},${Math.floor(ceilHeight)}px)`);
				}
			}
			clazzMap.set(keys[j], (v < 0 ? 0 : v) + "px");
		}
		// 布局子元素
		if (selectEs[i].parentElement.getAttribute("layout")) {
			clazzMap.delete("left");
			clazzMap.delete("top");
			clazzMap.set("position", "relative");
		}
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}


export const calwhlt = (w: number, h: number, l: number, t: number, old: Json) => {
	if (t < old.top)
		old.top = t;
	if (l < old.left)
		old.left = l;
	if ((l + w) > old.right)
		old.right = l + w;
	if (h + t > old.bottom)
		old.bottom = h + t;
	return { left: old.left, top: old.top, width: old.right - old.left, height: old.bottom - old.top };
};
const calcPos = (elem: HTMLElement) => {
	let el: HTMLElement = elem,
		style = { width: el.offsetWidth, height: el.offsetHeight, left: el.offsetLeft, top: el.offsetTop };
	if (el.parentElement && el.parentElement.id !== "bungees") {
		let parent = calcPos(el.parentElement);
		style.left += parent.left;
		style.top += parent.top;
	}
	return style
}

//对齐
export const align = (dir: string) => {
	let selectEs = Mgr.environment.select.getSelectEs();
	if (selectEs.some(function (a) { return +a.getAttribute("sid") == 2 })) return;

	switch (dir) {
		case "left": getLeft(selectEs);
			break;
		case "h_center": getHorCenter(selectEs);
			break;
		case "right": getRight(selectEs);
			break;
		case "top": getTop(selectEs);
			break;
		case "v_center": getVerCenter(selectEs);
			break;
		case "bottom": getBottom(selectEs);
			break;
	}
}

const getLeft = (selectEs) => {
	let left = 9999;
	for (let i = 0; i < selectEs.length; i++) {
		let sct = selectEs[i];
		left = sct.offsetLeft < left ? sct.offsetLeft : left;
	}
	if (selectEs.every(function (a) { return a.offsetLeft == left })) return;

	let param = [];
	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let sid = +selectEs[i].getAttribute("sid");
		clazzMap.set("left", left + "px");
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}

const getRight = (selectEs) => {
	let left = 0;
	for (let i = 0; i < selectEs.length; i++) {
		let sct = selectEs[i];
		left = (sct.offsetLeft + sct.offsetWidth) > left ? sct.offsetLeft + sct.offsetWidth : left;
	}
	if (selectEs.every(function (a) { return a.offsetLeft == left })) return;

	let param = [];
	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let sid = +selectEs[i].getAttribute("sid");
		clazzMap.set("left", left - selectEs[i].offsetWidth + "px");
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}

const getTop = (selectEs) => {
	let top = 9999;
	for (let i = 0; i < selectEs.length; i++) {
		let sct = selectEs[i];
		top = sct.offsp ? sct.offsetTop : top;
	}
	if (selectEs.every(function (a) { return a.offsetTop == top })) return;

	let param = [];
	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let sid = +selectEs[i].getAttribute("sid");
		clazzMap.set("top", top + "px");
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}

const getBottom = (selectEs) => {
	let top = 0;
	for (let i = 0; i < selectEs.length; i++) {
		let sct = selectEs[i];
		top = (sct.offsetTop + sct.offsetHeight) > top ? sct.offsetTop + sct.offsetHeight : top;
	}
	if (selectEs.every(function (a) { return a.offsetTop == top })) return;

	let param = [];
	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let sid = +selectEs[i].getAttribute("sid");
		clazzMap.set("top", top - selectEs[i].offsetHeight + "px");
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}

const getHorCenter = (selectEs) => {
	let param = [];
	if (selectEs.every(function (a) { return a.offsetLeft == a.parentElement.offsetWidth - a.offsetWidth })) return;
	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let sid = +selectEs[i].getAttribute("sid");
		clazzMap.set("left", (selectEs[i].parentElement.offsetWidth - selectEs[i].offsetWidth) / 2 + "px");
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}

const getVerCenter = (selectEs) => {
	let param = [];
	if (selectEs.every(function (a) { return a.offsetTop == a.parentElement.offsetHeight - a.offsetHeight })) return;

	for (let i = 0; i < selectEs.length; i++) {
		let clazzName = getClazzName(selectEs[i]);
		let clazzMap = new Map<string, string>();
		let sid = +selectEs[i].getAttribute("sid");
		clazzMap.set("top", (selectEs[i].parentElement.offsetHeight - selectEs[i].offsetHeight) / 2 + "px");
		param.push({ clazzMap: clazzMap, clazzName: clazzName });
	}
	Editer.addClazzs(param);
}