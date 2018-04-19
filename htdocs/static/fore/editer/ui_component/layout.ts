
// ============================== 导入
import { DragElement, setDragSelects } from "../util/drag_element";
import { VNode, VWNode, VirtualNode, VirtualWidgetNode, isVirtualWidgetNode, isVirtualNode } from "../../pi/widget/virtual_node";
import { getRealNode, setAttr } from "../../pi/widget/painter";
import { Json } from '../../pi/lang/type';


// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Layout extends DragElement {
    firstPaint(): void {
        addDragEven(this.tree, this);
    }
    dragStart(e) {
        let el: HTMLElement = e.currentTarget;
        setDragSelects([el]);
    }
}

const addDragEven = (node: VNode, widget: DragElement) => {
    let el = getRealNode(node);
    if (el.nodeName === "DIV" && el.getAttribute("dragFlag")) {
        el.addEventListener("dragstart", widget.ondragstart.bind(widget));
        setAttr(node as VirtualNode, "draggable", "true", true);
        setAttr(node as VirtualNode, "ed_src", widget.name, true);
        setAttr(node as VirtualNode, "allowDefault", "true", true);
        return;
    }

    let children = (<any>node).children;
    if (children) {
        for (var i = 0; i < children.length; i++) {
            addDragEven(children[i], widget);
        }
    }
}

