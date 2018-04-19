
// ============================== 导入
import { DragElement, setDragSelects } from "../util/drag_element";
import { Json } from '../../pi/lang/type';
import { notify } from "../../pi/widget/event";
import { VNode, VWNode, VirtualNode, VirtualWidgetNode, isVirtualWidgetNode } from "../../pi/widget/virtual_node";
import { getRealNode, setAttr } from "../../pi/widget/painter";
import * as mgr from "../mgr/widget_mgr";

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class ShowWidget extends DragElement {

	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		let p = this.parentNode.widget.props;
		let iter = (tree) => {
			if (tree.arr && tree.arr.length > 0) {
				for (var i = 0; i < tree.arr.length; i++) {
					let obj = findW(tree.arr[i]);
					if (obj)
						return obj;
				}
			}
		}
		let findW = (tree) => {
			if (tree && tree.show && tree.show.path === props) {
				return tree;
			}
			return iter(tree);
		}
		if (props === "search")
			this.props = p.searchTree;
		else
			this.props = findW(p.tree);
	}

	firstPaint(): void {
		addDragEven(this.tree, this);
	}

	afterUpdate(): void {
		addDragEven(this.tree, this);
	}

	dragStart(e): void {
		let el: HTMLElement = e.currentTarget;
		setDragSelects([el.childNodes[0].childNodes[0]]);
	}

	dbltap(name) {
		mgr.environment.select.clearS();
		open(name);
	}
}

const addDragEven = (node: VNode, widget: DragElement) => {
	let el = getRealNode(node);
	let draggable;
	if (draggable = el.getAttribute("draggable")) {
		el.addEventListener("dragstart", widget.ondragstart.bind(widget));
		if (!draggable) {
			setAttr(node as VirtualNode, "draggable", "true", true);
			setAttr(node as VirtualNode, "ed_src", widget.name, true);
			setAttr(node as VirtualNode, "allowDefault", "true", true);
		}
		return;
	}

	let children = (<any>node).children;
	if (children) {
		for (var i = 0; i < children.length; i++) {
			addDragEven(children[i], widget);
		}
	}
}

