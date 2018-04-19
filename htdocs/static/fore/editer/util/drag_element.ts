// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import * as Mgr from '../mgr/widget_mgr';
import { getElement } from '../util/html';
import { notify } from "../../pi/widget/event";
import { offsetPos, Pos } from "../../pi/util/html";
import { getRealNode, setAttr } from "../../pi/widget/painter";
import { VNode, VWNode, VirtualNode, VirtualWidgetNode, isVirtualWidgetNode } from "../../pi/widget/virtual_node";

export interface DragElem {
	elemType: string,
	realNode: HTMLElement,
	src: string,
	diffX: number,
	diffY: number
}
let dragStart;
let dragSelects;
let startPos;

/**
 * @description 导出组件Widget类
 * @example
 */
export class DragElement extends Widget {
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		this.props = props;
	}

	/**
	 * @description 阻止dragover的默认事件
	 * @example
	 */
	ondragover(evt) {
		evt.dataTransfer.dropEffect = 'move';
		var evt = evt || window.event;
		if (typeof evt.preventDefault == "function") {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
		this.dragMove(evt);
	}

	/**
	 * @description 阻止dragenter的默认事件
	 * @example
	 */
	ondragenter(evt) {
		var evt = evt || window.event;
		if (typeof evt.preventDefault == "function") {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
		this.dragEnter(evt); //执行拖拽进入时执行的方法
		evt.stopPropagation();
	}

	/**
	 * @description 阻止dragenter的默认事件
	 * @example
	 */
	ondragleave(evt) {
		var evt = evt || window.event;
		if (typeof evt.preventDefault == "function") {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
		this.dragLeave(evt); //执行拖拽进入时执行的方法
		evt.stopPropagation();
	}



	/**
	 * @description 开始拖拽，选中一个元素
	 * @example
	 */
	ondragstart(evt) {
		evt.dataTransfer.effectAllowed = 'move';
		evt = evt || window.event;
		let offsetLeft = 0, offsetTop = 0;

		if (evt.target.getAttribute("dragList")) {
			offsetLeft = evt.target.children[0].offsetLeft + evt.target.children[0].children[0].offsetLeft;
			offsetTop = evt.target.children[0].offsetTop + evt.target.children[0].children[0].offsetTop;
		}

		dragStart = { x: evt.offsetX - offsetLeft, y: evt.offsetY - offsetTop };//盒子的pandding
		evt.dataTransfer.setData("src", this.name);
		//let selects = getSelectSids();
		//if(!selects || selects.length === 0)
		//	return;
		//setMpos({x:evt.clientX, y:evt.clientY});
		//evt.dataTransfer.setData("selects",selects);
		//evt.dataTransfer.setData("mpos",{x:evt.clientX, y:evt.clientY});//鼠标点击位置
		//select({realNode: elem, elemType: type, src: ed_src, diffX: evt.clientX - pos.x, diffY: evt.clientY - pos.y});

		let selects = Mgr.environment.select.getSelectSids();

		this.dragStart(evt);
		evt.stopPropagation();
	}

	/**
	 * @description 开始拖拽，选中一个元素
	 * @example
	 */
	ondragend(evt) {
		this.dragend(evt);
		evt.stopPropagation();
	}

	/**
	 * @description 开始拖拽，选中一个元素
	 * @example
	 */
	ondragexit(evt) {
		this.dragexit(evt);
		evt.stopPropagation();
	}


	/**
	 * @description 拖拽结束
	 * @example
	 */
	ondrop(evt) {
		if (typeof evt.preventDefault == "function") { //阻止drop事件的默认行为
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
		this.dragOver(evt); //执行拖拽结束时执行的方法
		//deletSelectE();//删除选中元素
		evt.stopPropagation();
	}

	/**
	 * @description 拖放结束
	 * @example
	 */
	dragOver(e): void {

	}

	/**
	 * @description 拖放开始
	 * @example
	 */
	dragStart(e): void {

	}

	/**
	 * @description 移动
	 * @example
	 */
	dragMove(e): void {

	}

	/**
	 * @description 拖放结束
	 * @example
	 */
	dragend(e): void {

	}
	/**
	 * @description 拖放进入
	 * @example
	 */
	dragEnter(e): void {

	}
	/**
	 * @description 拖放进入
	 * @example
	 */
	dragLeave(e): void {

	}
	/**
	 * @description 拖放取消
	 * @example
	 */
	dragexit(e): void {

	}
}

export const getDragStart = () => {
	return dragStart;
}

export const setDragSelects = (array) => {
	dragSelects = array;
}

export const getDragSelects = () => {
	return dragSelects;
}


const createDragE = (elem: HTMLElement, mp: Pos): DragElem => {
	let w_name = elem.getAttribute("w-tag");
	let type = w_name ? "widget" : "div";
	let ed_src = elem.getAttribute("ed_src");
	let pos = offsetPos(elem, null, { x: 0, y: 0 });
	let el = { realNode: elem, elemType: type, src: ed_src, diffX: mp.x - pos.x, diffY: mp.y - pos.y };
	return el;
}

