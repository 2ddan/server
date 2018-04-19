import { offsetPos, Pos } from "../../pi/util/html";
import { Json } from "../../pi/lang/type";
import { VNode, VWNode, VirtualNode, VirtualWidgetNode, isVirtualWidgetNode } from "../../pi/widget/virtual_node";


export const isContain = (parent: HTMLElement, child: Json) => {
    let pos = offsetPos(parent, null, { x: 0, y: 0 });
    if (pos.x < child.x && pos.y < child.y && pos.x + parent.scrollWidth > child.x && pos.y + parent.scrollHeight > child.y) {
        return true;
    }
}

/***
 * 在指定元素上获取指定属性的元素  (向外查找)
 * <br />一直查找到document节点，如果没有设置value，则直接返回该节点， 否则与value值进行比较
 * @param {element} el 指定元素
 * @param {string} name 属性名
 * @param {string} value 属性值
 * @param {string} stopAttr 结束属性名
 * @return {element} 查找的元素
 */
export const getElement = function (el: any, name, value?, stopAttr?): any {
    var v, doc = el.ownerDocument;
    while (el && el !== doc) {
        if (el.getAttribute) {
            if (stopAttr) {
                v = el.getAttribute(stopAttr);
                if (v === "" || v) {
                    return;
                }
            }
            v = el.getAttribute(name);
            if (v === "" || v) {
                if (value !== undefined) {
                    if (value === v) {
                        return el;
                    }
                } else {
                    return el;
                }
            }
        }
        el = el.parentNode;
    }
};

/***
 * 在指定元素上获取指定属性的元素  (向内查找)
 * <br />一直查找到document节点，如果没有设置value，则直接返回该节点， 否则与value值进行比较
 * @param {element} el 指定元素
 * @param {string} name 属性名
 * @param {string} value 属性值
 * @return {element} 查找的元素
 */
export const getElementIn = function (el: HTMLElement, name: string, value: any, isChild?: boolean): HTMLElement {
    if (el.getAttribute(name) === value) {
        return el;
    } else {
        if (el.getAttribute("w-tag") && isChild) {
            return;
        }
        let childs = el.children;
        let len = childs.length, node;
        for (let i = 0; i < len; i++) {
            node = getElementIn(<HTMLElement>childs[i], name, value, true);
            if (node)
                return node;
        }
    }
};

//根据绝对位置，结合元素本身的定位方式，计算出元素的位置信息（暂时只支持绝对定位，待实现）
export const getPStyle = (pos: Pos): Map<string, string> => {
    let map = new Map<string, string>();
    map.set("position", "absolute");
    map.set("left", `${pos.x}px`);
    map.set("top", `${pos.y}px`);
    return map;
}

//获取多拽后的样式
export const getDragStyle = (pos: Pos, layout: string): Map<string, string> => {
    let map = new Map<string, string>();
    map.set("left", `${pos.x}px`);
    map.set("top", `${pos.y}px`);
    switch (layout) {
        case "flex":
            map.set("position", "relative");
            break;
        case "grid":
            map.set("position", "relative");
            break;
        case "gridChild":
            map.set("position", "relative");
            break;
        default:
            map.set("position", "absolute");

    }
    return map;
}

//计算绝对位置
export const calAPos = (parent: HTMLElement, pos: Json): Pos => {
    let parentPos = offsetPos(parent, null, { x: 0, y: 0 });
    let postion: Pos = { x: pos.x - parentPos.x, y: pos.y - parentPos.y };
    return postion;
}

// 返回节点的字符串
export const htmlToStr = (node: HTMLElement): string => {
    var div = document.createElement("div");
    div.appendChild(node);
    return div.innerHTML;
}

// 拷贝节点的根节点
export const copyRoot = (node: HTMLElement): string => {
    let attrs = node.attributes;
    var div = document.createElement("div");
    div.appendChild(node);
    return div.innerHTML;
}

// 获取编辑器的clazz
export const getClazzName = (node: HTMLElement): string => {
    let clazzStr = node.getAttribute("w-class");
    if (clazzStr) {
        let arr = clazzStr.replace(/ +/g, " ").trim().split(" ");
        return arr[arr.length - 1];
    }
}

