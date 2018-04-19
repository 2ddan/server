
// ============================== 导入
import { VNode, VirtualWidgetNode, isVirtualWidgetNode } from "../../pi/widget/virtual_node";
import { getRealNode } from "../../pi/widget/painter";
import { Json } from '../../pi/lang/type';
import { DragElement, getDragStart, getDragSelects } from "../util/drag_element";
import * as Editer from "../util/editer";
import { getElementIn, getClazzName, getPStyle } from '../util/html';
import { register } from '../mgr/widget_mgr';
import { getCache, Widget, lookup } from "../../pi/widget/widget";
import { gen } from "../../pi/compile/genvdom";
import { toFun } from "../../pi/util/tpl";
import * as Mgr from "../mgr/widget_mgr";
import { userCfg, saveUserCfg } from "../user_cfg";
import { debug } from "../../pi/util/log";


// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Operation extends DragElement {
	open_widget: Widget;
	target: HTMLElement;

	create() {
		register(this);
	}
	firstPaint(): void {
		setMouseEvents((<HTMLElement>this.tree.link), this);
		opWidget = this;
	}

	afterUpdate(): void {
		this.open_widget = findOpenWidget(this.tree, this.props);
		if (this.open_widget) {
			let update = this.open_widget.afterUpdate;

			this.open_widget.afterUpdate = () => {
				let se = Mgr.environment.select.reSelect();
				addInitEven(this.open_widget.tree, this);
				if (se.length === 1)
					updateGrid(se[0], this);
				Mgr.notify("selectStyleChange");
			}

			Mgr.environment.setWidget(this.open_widget);
			update();
			addInitEven(this.open_widget.tree, this);
		}
	}
	//拖拽完成
	dragOver(e) {
		this.props.dragEnter = null;
		this.paint();
		let dragSelect = getDragSelects();
		if (!dragSelect || dragSelect.length === 0) return;

		let src = dragSelect[0].getAttribute("ed_src");
		if (src && src !== this.name) {
			let layout = dragSelect[0].getAttribute("dragFlag");
			let eventEl = getDragEnterEl(e.currentTarget);

			let starPos = getDragStart();
			let endPos = getOffsetPos(e.target, eventEl, { x: e.offsetX, y: e.offsetY });

			let style, attr
			switch (layout) {
				// 布局 滚动列表
				case "scroll":
					style = getScrollStyle(starPos, endPos);
					attr = {
						class: "scroll_box_h",
						layout: "scroll"
					}
					Editer.createElem(+eventEl.getAttribute("sid"), style, "div", null, attr)
					break;
				case "flex":
					style = getFlexStyle(starPos, endPos);
					attr = {
						class: "flex_box",
						layout: "flex"
					}
					Editer.createElem(+eventEl.getAttribute("sid"), style, "div", null, attr)
					break;
				case "grid":
					style = getGridStyle(starPos, endPos);
					attr = {
						layout: "grid"
					}
					Editer.createElem(+eventEl.getAttribute("sid"), style, "div", null, attr)
					break
				default:
					Editer.addElem(eventEl, dragSelect, starPos, endPos);
			}
		}
	}
	//拖拽进入
	dragEnter(e) {
		let el = getDragEnterEl(e.currentTarget);
		let pos = getOffsetRootPos(el, { x: 0, y: 0 });
		let dragEnter = { width: el.clientWidth, height: el.clientHeight, left: pos.x, top: pos.y };
		this.props.dragEnter = dragEnter;
		updateGrid(e.currentTarget, this);
		this.paint();
		dragInEl = e.currentTarget;
	}
	dragLeave(e) {
		// 	console.log(e.currentTarget)
		// 	this.props.dragEnter = null;
		// 	this.paint();
		// }
	}
	//捕捉鼠标位置元素
	captureTarget(e) {
		target = e.currentTarget;
		if (!tapOnSelect) {
			Editer.selectS(e, target)
		}
		e.stopPropagation()
	}
	//移动选中元素
	mousemove(e) {
		if (!upFun) return;
		//不是拖拽参考线
		if (target) {
			let info = (<HTMLElement>this.tree.link).getBoundingClientRect();
			let targetPos = target.getBoundingClientRect();
			let moveOut = info.left + 20 > targetPos.left + targetPos.width || info.top + 20 > targetPos.top + targetPos.height || info.left + info.width - 20 < targetPos.left || info.top + info.height - 20 < targetPos.top;
			let sids = Mgr.environment.select.getSelectSids();
			let rootDiv = sids.some((sid) => { return sid === 2 }) || false;
			//超出编辑区
			if (moveOut || rootDiv) {
				upDeal(e, rootDiv);
				return;
			}
		}

		if (moveFun) {
			let changePos = [e.x - lastPos[0], e.y - lastPos[1]];
			if (e.altKey) {
				changePos[0] = 0;
			}
			if (e.shiftKey) {
				changePos[1] = 0;
			}
			moveFun(changePos, e)
			let se = Mgr.environment.select.getSelectEs();
			if (se.length <= 1 && target) {
				dragInEl = se[0].parentElement;
				updateGrid(se[0].parentElement, this);
			}
			lastPos = [e.x, e.y];
			isClick = false;
		}
	}
	//方向键调节位置
	keyMove(e) {
		//只识别方向四键
		if (e.keyCode < 37 || e.keyCode > 40) return;
		keyMove(e.keyCode, e.shiftKey);
		e.preventDefault();
	}
	//标尺
	rulerDown(e, layout) {
		target = null;
		lines.push([layout === "h" ? e.offsetY : e.offsetX, layout]);
		lineIndex = lines.length - 1;
		Mgr.cfg.lines.show = opWidget.props.showLines = true;
		setDownDeal([e.x, e.y, +new Date()], addLineMove, addLineUp, "default");
	}
	moveLine(e, index) {
		if (e.which === 1) {
			lineIndex = index;
			setDownDeal([e.x, e.y, +new Date()], addLineMove, addLineUp, lines[index][1]);
		}
	}
	deleteLine(e, index) {
		if (e.which === 3) {
			lines.splice(index, 1);
			Mgr.cfg.lines.arr = this.props.lines = lines;
			saveUserCfg();
			e.stopPropagation();
			this.paint();
		}
	}

	open() {
		updateTpl();
		lines = Mgr.cfg.lines.arr;
		this.props.open_widget = Mgr.environment.openName;
		this.props.lines = lines;
		this.props.showLines = Mgr.cfg.lines.show;
		this.props.onMove = false;
		this.props.cursor = "default";

		let w = lookup(this.props.open_widget);
		if (w.config && w.config.value && w.config.value.noEvent === false || userCfg.noEvent === false) {
			console.log(111)
		}
		else {
			w.forelet = null;
			w.widget = () => Widget;
		}
		w.sheet = w.sheet || { value: new Map() }

		this.paint();
	}
	nodeChange() {
		updateTpl();
		this.open_widget.styleCache.clear();
		this.open_widget.paint(true);
		let se = Mgr.environment.select.getSelectEs();
		if (se.length <= 1)
			updateGrid(se[0], this);
	}
	attrChange() {
		updateTpl();
		this.open_widget.styleCache.clear();
		this.open_widget.paint(true);
	}
	clazzChange() {
		updateTpl();
		this.open_widget.styleCache.clear();
		this.open_widget.paint(true);
	}
	selectChange() {
		let se = Mgr.environment.select.getSelectEs();
		if (se.length <= 1)
			updateGrid(se[0], this);
	}
	hideLines(sl) {
		this.props.showLines = sl;
		this.paint();
	}
	resoChange() {
		this.open();
	}
	selectOperation() {
		let domtree = this.tree.link as HTMLElement;
		setTimeout(() => {
			domtree.focus();
		}, 60);
	}
	stateChange(data){
		this.open_widget.state = data;
		this.open_widget.paint(true);
	}
}


let opWidget: Widget,
	lines: Array<[number, string]>, //参考线 [[123,"h"],[456,"v"]] h=> 水平， v=> 垂直
	lineIndex: number = -1

/**
* @description 更新模板方法
* @example
*/
const updateTpl = () => {
	let domStr = gen(Mgr.environment.syntaxOp.syntax);
	let path = Mgr.environment.openName.replace(/\-/g, "/") + ".tpl";
	let tplFunc = toFun(domStr, path);
	let tpl = getCache(path);
	tpl.value = tplFunc;
}

//找到当前打开的widget
const findOpenWidget = (n: VNode, props: Json): Widget => {
	if (isVirtualWidgetNode(n)) {
		let widgets = (<VirtualWidgetNode>n).widget.children;
		for (let i = 0; i < widgets.length; i++) {
			if (widgets[i].name === props.open_widget)
				return widgets[i];
		}
	} else {
		var children = (<any>n).children;
		if (children)
			for (let j = 0; j < children.length; j++) {
				let w = findOpenWidget(children[j], props);
				if (w)
					return w;
			}
	}
}
//计算相对位置
const getOffsetRootPos = (target: HTMLElement, pos: { x: number, y: number }) => {
	if (target.getAttribute("sid") !== "2") {
		pos.x += target.offsetLeft;
		pos.y += target.offsetTop;
		getOffsetRootPos(target.parentElement, pos);
	}
	return pos
}
//计算相对位置
const getOffsetPos = (target: HTMLElement, eTarget: HTMLElement, pos: { x: number, y: number }) => {
	if (target !== eTarget) {
		pos.x += target.offsetLeft;
		pos.y += target.offsetTop;
		getOffsetPos(target.parentElement, eTarget, pos);
	}
	return pos
}
// 获取滚动列表样式
const getScrollStyle = (pos: { x: number, y: number }, currPos: { x: number, y: number }): Map<string, string> => {
	let style = new Map<string, string>();
	style.set("position", "absolute");
	style.set("width", "240px");
	style.set("height", "60px");
	style.set("left", currPos.x - pos.x + "px");
	style.set("top", currPos.y - pos.y + "px");

	return style;
}

// 获取flex样式
const getFlexStyle = (pos: { x: number, y: number }, currPos: { x: number, y: number }): Map<string, string> => {
	let style = new Map<string, string>();
	style.set("position", "absolute");
	style.set("width", "240px");
	style.set("height", "240px");
	style.set("left", currPos.x - pos.x + "px");
	style.set("top", currPos.y - pos.y + "px");
	style.set("display", "inline-flex");
	style.set("flexDirection", "row");
	style.set("flexWrap", "wrap");
	style.set("justifyContent", "flex-start");
	style.set("alignItems", "flex-start");
	style.set("alignContent", "flex-start");

	return style;
}

// grid 布局样式
const getGridStyle = (pos: { x: number, y: number }, currPos: { x: number, y: number }): Map<string, string> => {
	let style = new Map<string, string>();
	style.set("position", "absolute");
	style.set("width", "240px");
	style.set("height", "240px");
	style.set("left", currPos.x - pos.x + "px");
	style.set("top", currPos.y - pos.y + "px");
	style.set("display", "inline-grid");
	style.set("gridTemplateRows", "repeat(4, 60px)");
	style.set("gridTemplateColumns", "repeat(4, 60px)");
	style.set("gridTemplateAreas", '"r0c0 r0c1 r0c2 r0c3" "r1c0 r1c1 r1c2 r1c3" "r2c0 r2c1 r2c2 r2c3" "r3c0 r3c1 r3c2 r3c3"');
	style.set("gridRowGap", "0px");
	style.set("gridColumnGap", "0px");
	style.set("gridAutoFlow", "row");

	return style;
}

// let gridItems = [];
let dragInEl;
// 更新grid显示区域
const updateGrid = (target: HTMLElement, widget: DragElement) => {
	// 清除上次的
	// for (let i = 0; i < gridItems.length; i++) {
	// 	gridItems[i].remove()
	// }
	// gridItems = [];

	// if (se.length === 1 && target.getAttribute("layout") === "grid") {
	// 	let row = (target.style as any).gridTemplateRows;
	// 	let columns = (target.style as any).gridTemplateColumns;
	// 	let count = row.split(" ").length * columns.split(" ").length;
	// 	for (let i = 0; i < count; i++) {
	// 		let el = document.createElement("div");
	// 		gridItems.push(el);
	// 		el.style.border = "1px dotted rgba(255,255,255,0.4)";
	// 		el.style.marginTop = "-1px";
	// 		el.style.marginLeft = "-1px";
	// 		el.style.pointerEvents = "none";
	// 		target.appendChild(el);
	// 	}
	// }

	let oldGrip = widget.props.grid;
	if (target && (target.getAttribute("layout") === "grid" || dragInEl && dragInEl.getAttribute("layout") === "grid")) {
		let row = (target.style as any).gridTemplateRows;
		let columns = (target.style as any).gridTemplateColumns;
		let rowGap = (target.style as any).gridRowGap;
		let columnGap = (target.style as any).gridColumnGap;
		let pos = { x: 0, y: 0 }
		getOffsetRootPos(target, pos);
		// debugger
		widget.props.grid = {
			w: target.offsetWidth,
			h: target.offsetHeight,
			x: pos.x,
			y: pos.y,
			itemCount: row.split(" ").length * columns.split(" ").length,
			row: row,
			columns: columns,
			rowGap: rowGap,
			columnGap: columnGap
		}
	}
	else {
		widget.props.grid = null;
	}
	// if (oldGrip !== widget.props.grid)
		// widget.paint();
}

const addInitEven = (node: VNode, widget: DragElement): void => {
	let el = getRealNode(node);
	if (el.nodeName != "#text") {
		el.onmousedown = (<Operation>widget).captureTarget.bind(widget);
		el.ondragover = widget.ondragover.bind(widget);
		el.ondragenter = widget.ondragenter.bind(widget);
		el.ondragleave = widget.ondragleave.bind(widget);
		el.ondrop = widget.ondrop.bind(widget);
	}
	if (isVirtualWidgetNode(node)) {
		return;
	}
	let children = (<any>node).children;
	if (children) {
		for (var i = 0; i < children.length; i++) {
			addInitEven(children[i], widget);
		}
	}
}

let notDragin = ["INPUT", "SPAN", "IMG"]
//向上找到可以防止拖拽元素的元素
const getDragEnterEl = (el) => {
	let currEl = el;
	while (currEl) {
		if (currEl.getAttribute("sid") === "2" || notDragin.indexOf(currEl.tagName) === -1 && !currEl.getAttribute("w-tag")) {
			return currEl
		}
		currEl = currEl.parentElement;
	}

}

//撤销恢复
let undoArr = [], redoArr = [];
/**
 * 移动组件鼠标移动事件
 * @param pos 鼠标位置 [x,y]
 */
const widgetMove = (pos: Array<number>) => {
	let selectEs = Mgr.environment.select.getSelectEs();
	let sPos, offsetPos;

	for (let i = 0; i < selectEs.length; i++) {
		sPos = {
			left: selectEs[i].offsetLeft - parseFloat(selectEs[i].style.marginLeft || "0"),
			top: selectEs[i].offsetTop - parseFloat(selectEs[i].style.marginTop || "0"),
			width: selectEs[i].offsetWidth,
			height: selectEs[i].offsetHeight
		}
		offsetPos = calcNear(sPos, 10, pos);

		selectEs[i].style.position = "absolute";
		selectEs[i].style.left = offsetPos.left + "px";
		selectEs[i].style.top = offsetPos.top + "px";
	}
}
/**
 * 移动组件鼠标结束事件
 * @param isClick 是否是点击
 * @param pos 鼠标位置 [x,y]
 */
const widgetUp = (isClick: boolean, pos: Array<number>) => {
	if (isClick) return;
	redoArr = [];
	let selectEs = Mgr.environment.select.getSelectEs();
	let param = [];
	for (let i = 0; i < selectEs.length; i++) {
		let clazzMap = getPStyle({ x: selectEs[i].offsetLeft + pos[0], y: selectEs[i].offsetTop + pos[1] });
		param.push({ el: selectEs[i], style: clazzMap });
	}
	Editer.modifyStyles(param)
}
/**
 * 参考线移动事件
 * @param pos 鼠标位置 [x,y]
 */
const addLineMove = (pos: Array<number>) => {
	if (lineIndex === -1) return;
	lines[lineIndex][0] += lines[lineIndex][1] === "h" ? pos[1] : pos[0];
	opWidget.props.lines = lines;
	opWidget.paint();
}

/**
 * 参考线移动结束事件
 * @param isClick 是否是点击
 * @param pos 鼠标位置 [x,y]
 */
const addLineUp = (isClick: boolean, pos: Array<number>) => {
	if (isClick && lines[lineIndex][0] < 18)
		lines.splice(lineIndex, 1);
	Mgr.cfg.lines.arr = opWidget.props.lines = lines;
	saveUserCfg();
	opWidget.paint();
}



let lastPos: Array<number> = null,//鼠标上一次的位置[x,y]
	moveFun: Function = null,//鼠标移动执行函数
	upFun: Function = null,//鼠标松开执行函数
	isClick: boolean = true,//是否是点击事件
	target: HTMLElement = null,//捕获的目标元素
	startClick: Array<number> = [0, 0, 0], //第一次点击的坐标和时间[x,y,time]
	tapOnSelect: boolean = false //点击区域是否有选中元素


/**
 * select按下的设置
 * @param pointStar 鼠标按下位置
 * @param pointMove 鼠标移动执行函数
 */
export const setDownDeal = (pointStar: Array<number>, move: Function, up: Function, setCursor?: string) => {
	//添加移动遮罩层
	opWidget.props.onMove = true;
	opWidget.props.cursor = setCursor;
	saveUserCfg();
	opWidget.paint();

	//移动的处理函数
	lastPos = pointStar;
	moveFun = move;
	upFun = up;
}

//移动结束操作
const upDeal = (e, rootDiv) => {
	//移除移动遮罩层
	opWidget.props.onMove = false;
	opWidget.props.cursor = "default";
	opWidget.paint();

	upFun(isClick, rootDiv ? [0, 0] : [e.x - lastPos[0], e.y - lastPos[1]]);
	lastPos = null;
	startClick = [0, 0, 0];
	tapOnSelect = false;
	moveFun = null;
	upFun = null;
	isClick = true;
	target = null;
	tempTop = 0;
	tempLeft = 0;
}

/**
 * 捕捉鼠标按下事件 添加鼠标弹起事件
 * @param el operation的根元素
 */
const setMouseEvents = (el: HTMLElement, w: Widget) => {
	//添加移动事件
	el.addEventListener("mousedown", (e) => {
		if (e.which === 1) {
			startClick = [e.x, e.y, +new Date()];
			let s = Mgr.environment.select.getSelectEs();
			let sids = Mgr.environment.select.getSelectSids();
			//只选中了根元素
			if (sids[0] === 2 && sids.length === 1) {
				setDownDeal([e.x, e.y, +new Date()], widgetMove, widgetUp, "move");
			}
			//有选中的目标
			else if (sids.length && sids.indexOf(2) === -1) {
				//记录按下位置是否是选中区域 => 在下一阶段select该元素
				tapOnSelect = s.some((k) => {
					let info = k.getBoundingClientRect();
					return info.left <= e.x && info.top <= e.y && info.left + info.width >= e.x && info.top + info.height >= e.y;
				})
				//添加move事件
				setDownDeal([e.x, e.y, +new Date()], widgetMove, widgetUp, "move");
			}
		}
	}, true);

	//up 处理
	el.addEventListener("mouseup", (e) => {
		isClick = Math.abs((e.x - startClick[0])) < 5 && Math.abs((e.y - startClick[1])) < 5 && (+new Date() - startClick[2]) < 300;
		//添加选中
		if (isClick && target && tapOnSelect) {
			Editer.selectS(e, target)
		}
		if (upFun) {
			upDeal(e, false);
		}
	}, false);
}


/**
 * 方向键移动
 * @param key 按键
 * @param shiftKey 移动5像素 
 */
const keyMove = (key, shiftKey) => {
	//37←  38↑  39→  40↓
	let arrow = { "37": ["left", "offsetLeft", -1], "38": ["top", "offsetTop", -1], "39": ["left", "offsetLeft", 1], "40": ["top", "offsetTop", 1] };
	let pos = [arrow[key][0], arrow[key][1], (shiftKey ? 10 : 1) * arrow[key][2]];

	let ssid = Mgr.environment.select.getSelectSids();
	if (ssid.indexOf(2) !== -1) return;
	let selectEs = Mgr.environment.select.getSelectEs();
	let param = []
	for (let i = 0; i < selectEs.length; i++) {
		let clazzMap = new Map<string, string>();
		clazzMap.set("position", "absolute");
		clazzMap.set(pos[0], selectEs[i][pos[1]] + pos[2] + "px");
		param.push({ el: selectEs[i], style: clazzMap });
	}
	Editer.modifyStyles(param)
}


let tempTop = 0, tempLeft = 0;
/**
 * 
 * @param pos 目标移动前的位置
 * @param offsetNear 自动靠拢偏移量
 * @param offsetLeave 离开偏移量
 * @param offsetPos 移动差值
 */
const calcNear = (pos: { left: number, top: number, width: number, height: number }, offsetNear: number, offsetPos: Array<number>) => {
	let reso = userCfg.resolution.cfg[userCfg.resolution.curr];
	let boerderLine: Array<[number, string]> = [[20, "h"], [20, "v"], [reso[2] + 20, "h"], [reso[1] + 20, "v"]];

	let allLine = lines.concat(boerderLine);

	let nearest = { left: pos.left + offsetPos[0], top: pos.top + offsetPos[1] }//返回结果 
	for (let i = 0; i < allLine.length; i++) {
		let v = allLine[i][0] - 20;
		//水平参考线
		if (allLine[i][1] === "h") {
			//线在目标上面
			if (v < pos.top) {
				//向上移动 ，并且在范围内 → 吸附
				if (offsetPos[1] < 0 && pos.top - v <= offsetNear) {
					nearest.top = v;
				}
			}
			//线在目标下面
			else if (v > pos.top + pos.height) {
				//向下移动 ，并且在范围内 → 吸附
				if (offsetPos[1] > 0 && v - pos.top - pos.height <= offsetNear) {
					nearest.top = v - pos.height;

				}
			}
			//线在目标中央
			else {
				let nearTop = v < pos.top + pos.height / 2 ? -1 : 1;

				//进入范围,没对齐，操作靠近 → 吸附
				if ((v <= pos.top + offsetNear || v >= pos.top + pos.height - offsetNear) && v !== pos.top + (nearTop < 0 ? 0 : pos.height) && offsetPos[1] * nearTop < 0) {
					nearest.top = v - (nearTop < 0 ? 0 : pos.height);
				}
				//已对齐，并且移动没超过偏移量 → 不动
				else if (v === pos.top + (nearTop < 0 ? 0 : pos.height) && Math.abs(tempTop) < offsetNear) {
					nearest.top = pos.top;
					tempTop += offsetPos[1];
				}
				//已对齐，超过偏移量 → 加上总偏移量
				else if (v === pos.top + (nearTop < 0 ? 0 : pos.height)) {
					nearest.top = pos.top + tempTop;
					tempTop = 0;
				}
			}
		}
		//垂直参考线
		else {
			//线在目标左边
			if (v < pos.left) {
				//向左移动 ，并且在范围内 → 吸附
				if (offsetPos[0] < 0 && pos.left - v <= offsetNear) {
					nearest.left = v;
				}
			}
			//线在目标右边
			else if (v > pos.left + pos.width) {
				//向右移动 ，并且在范围内 → 吸附
				if (offsetPos[0] > 0 && v - pos.left - pos.width <= offsetNear) {
					nearest.left = v - pos.width;
				}
			}
			//线在目标中央
			else {
				let nearLeft = v < pos.left + pos.width / 2 ? -1 : 1;

				//进入范围,没对齐，操作靠近 → 吸附
				if ((v <= pos.left + offsetNear || v >= pos.left + pos.width - offsetNear) && v !== pos.left + (nearLeft < 0 ? 0 : pos.width) && offsetPos[0] * nearLeft < 0) {
					nearest.left = v - (nearLeft < 0 ? 0 : pos.width);
				}
				//已对齐，并且移动没超过偏移量 → 不动
				else if (v === pos.left + (nearLeft < 0 ? 0 : pos.width) && Math.abs(tempLeft) < offsetNear) {
					nearest.left = pos.left;
					tempLeft += offsetPos[0];
				}
				//已对齐，超过偏移量 → 加上总偏移量
				else if (v === pos.left + (nearLeft < 0 ? 0 : pos.width)) {
					nearest.left = pos.left + tempLeft;
					tempLeft = 0;
				}
			}
		}
	}
	return nearest;
}