
// ============================== 导入
import { Json } from '../../pi/lang/type';
import { VNode, VWNode, VirtualNode, VirtualWidgetNode, isVirtualWidgetNode } from "../../pi/widget/virtual_node";
import { getRealNode, setAttr } from "../../pi/widget/painter";
import { DragElement, setDragSelects } from "../util/drag_element";
import { moveWD } from "../util/editer";

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class ShowRes extends DragElement {

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
    dblclick(e) {
        if (cb) cb(e.target.getAttribute("srcPath"));
        cb = null;
    }
}

let cb: Function = null;
export const setDblClick = (callback: Function) => {
    cb = callback;
}

const addDragEven = (node: VNode, widget: DragElement) => {
    let el = getRealNode(node);

    if (el.getAttribute("draggable")) {
        el.addEventListener("dragstart", widget.ondragstart.bind(widget));
        return;
    }

    let children = (<any>node).children;
    if (children) {
        for (var i = 0; i < children.length; i++) {
            addDragEven(children[i], widget);
        }
    }
}