
// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import { VNode, VirtualNode, VirtualWidgetNode, isVirtualWidgetNode } from "../../pi/widget/virtual_node";
import { getRealNode, setAttr } from "../../pi/widget/painter";
import { Json } from '../../pi/lang/type';
import { DragElement } from "../util/drag_element";
import { muForelet } from "../forelet/mu_forelet";
import { Syntax } from "../../pi/compile/parser";
import * as Editer from "../util/editer";
import { dataTab } from "./structure";
import * as Mgr from '../mgr/widget_mgr';



// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class SyntaxTree extends DragElement {
	open_widget: Widget;
	startIndex: number;//用于选中显示
	endIndex: number;

	create() {
		Mgr.register(this);
	}
	/**
	 * @description 选中
	 * @example
	 */
	select(e) {
		let native = e.native as MouseEvent;
		let sid = e.data.sid;
		//选中
		if (e.native.which === 1)
			e.w.props.show.open = !e.w.props.show.open;
		Editer.selectS(native, sid);
	}

	//右键
	downr(e, arg) {
		let native = e.native as MouseEvent;
		let sid = e.data.sid;
		Editer.selectS(native, sid);
		muForelet.open({ x: native.x, y: native.y }, arg, e.tagName);

		Mgr.setTreeUpdate(e.treeWidget);
		//Editer.createElem(sid);
	}

	firstPaint(): void {
		//treemenu
		let trees = (<any>this.tree).children[1].children
		if (trees && trees[0]) {
			let treemenu = trees[0].link.tree;
			addDragEven(treemenu, this);
		}
	}

	afterUpdate(): void {
		let trees = (<any>this.tree).children[1].children
		if (trees && trees[0]) {
			let treemenu = trees[0].link.tree;
			addDragEven(treemenu, this);
		}
		// addDragEven(this.tree, this);
	}
	//拖拽到元素上
	dragOver(e) {
		let curTarget = e.currentTarget;
		let parentSid = curTarget.vNode.widget.props.sid;
		let selectsSid = Mgr.environment.select.getSelectSids();
		let dragIndex = curTarget.getAttribute("dragIndex");
		//修改index
		curTarget.style.backgroundColor = "transparent";
		if (dragIndex) {
			Editer.modifyParent(parentSid, selectsSid, +dragIndex);
		}
		//修改父容器
		else {
			curTarget.parentElement.style.borderColor = "transparent";
			//拖到非容器上面
			if (Mgr.environment.select.isExist(parentSid) || !curTarget.vNode.widget.props.isBox) {
				return;
			}
			let selects = Mgr.environment.select.getSelectEs();
			if (!selects || selects.length === 0)
				return;

			let src = e.dataTransfer.getData("src");
			//拖动源是自己
			if (src === this.name) {
				Editer.modifyParent(parentSid, selectsSid, null);
			} else {
				//Editer.addW1(parentSid, selects);
			}
		}
	}
	//拖拽到index上
	dragEnter(e) {
		let curTarget = e.currentTarget;
		let dragIndex = curTarget.getAttribute("dragIndex");
		if (dragIndex) {
			curTarget.style.backgroundColor = "#3a80c2";
		}
		else {
			curTarget.parentElement.style.borderColor = "#ddd";
		}
	}
	//离开index上
	dragLeave(e) {
		let curTarget = e.currentTarget;
		let dragIndex = curTarget.getAttribute("dragIndex");
		if (dragIndex) {
			curTarget.style.backgroundColor = "transparent";
		}
		else {
			curTarget.parentElement.style.borderColor = "transparent";
		}
	}
	toDataTab() {
		dataTab();
	}

	open() {
		updataSyTree(this)
	}
	nodeChange() {
		updataSyTree(this)
	}
	selectChange() {
		updataSyTree(this)
	}
	syTreeReopen() {
		updataSyTree(this)
	}
}

const updataSyTree = (w: Widget) => {
	w.props = w.props || {};
	w.props.tree = Mgr.environment.treeOp.tree;
	w.paint();
}

const addDragEven = (node: VNode, widget: DragElement) => {
	//不包含可拖拽元素的div
	if (!(<VirtualWidgetNode>node).attrs["dragFlag"]) {
		return;
	}
	//可拖拽元素 => div | 组件 |
	else if ((<VirtualWidgetNode>node).attrs["dragFlag"] == 2) {
		let el = getRealNode(node);
		el.ondragstart = widget.ondragstart.bind(widget);
		el.ondrop = widget.ondrop.bind(widget);
		el.ondragover = widget.ondragover.bind(widget);
		el.ondragenter = widget.ondragenter.bind(widget);
		el.ondragleave = widget.ondragleave.bind(widget);
		setAttr(node as VirtualNode, "draggable", "true", true);
		setAttr(node as VirtualNode, "ed_src", widget.name, true);
		setAttr(node as VirtualNode, "allowDefault", "true", true);

	}
	else if ((<VirtualWidgetNode>node).attrs["dragFlag"] == 4) {
		let el = getRealNode(node);
		el.ondrop = widget.ondrop.bind(widget);
		el.ondragover = widget.ondragover.bind(widget);
		el.ondragenter = widget.ondragenter.bind(widget);
		el.ondragleave = widget.ondragleave.bind(widget);

		return;
	}
	let children = (<any>node).children;

	if (children) {
		for (var i = 0; i < children.length; i++) {
			if (isVirtualWidgetNode(children[i]))
				addDragEven(children[i].link.tree, widget);
			else
				addDragEven(children[i], widget);
		}
	}
}
