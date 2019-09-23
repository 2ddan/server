/** 
 * 这个模块实际并不使用class定义的类型，类型也并不导出。主要的考虑是，在模板函数中为了优化性能，直接使用字面量表达
 * 类型定义：
 * Node = {type, attrMap, attrHash, children, childHash, simHash, ext, dom|widget}
 * ext = {classSet, clazzSet, clazzStyle, style}
 * TextNode = {hash, content, dom | json}
 */
// ============================== 导入
import { RContainerElement } from '../gui/r_containerelement';
import { RElementTypeList } from '../gui/r_datastruct';
import { RElement } from '../gui/r_element';
import { RImageElement } from '../gui/r_imageelement';
import { RTextElement } from '../gui/r_textelement';
import { Json } from '../lang/type';
import { warn } from '../util/log';
// import { objDiff } from '../util/util';
import * as painter from './painter';
import { URLEffect } from './style';
import { VNKeyWords } from './virtaul_node_keyword';
import { equalAttr, VirtualAttr } from './virtual_attr';
import { VEventAttr, VirtualEvent } from './virtual_event';
import { VirtualStyle } from './virtual_style';
import { Widget } from './widget';
// ============================== 导出
/**
 * tagName - tg
 * offsetOld - oO
 * offset - o
 * nodeHash - nH
 * attrHash - aH
 * attrSize - aS
 * attrs - a
 * styleHash - sH
 * styleSize - sS
 * style - s
 * eventHash - eH
 * eventSize - eS
 * event - e
 * childHashMap - cHM
 * childHash - cH
 * 
 */
/**
 * @description 普通节点
 * @example
 */
export class VirtualNodeBase {
    public readonly tg: string;
    /**
     * 静态ID
     * * 由模板分析代码赋值，
     * * 为0表示模板阶段没有确定
     */
    public readonly si?: number; 
    /**
     * 动态ID
     * * 一般由应用代码来赋值，
     * * 字段为w-id，
     * * 如果不赋值，则根据attrHash和childHash来确定是否相同。
     * * 如果不同，则根据自身在父容器的位置进行tag比较，如果tag相同，则认为是同一个节点
     */
    public readonly di?: string;  
    /**
     * 在父节点的位置
     * offset
     */
    public o?: number; 
    /**
     * 在旧节点上的位置
     * offsetOld
     */
    public oO?: number; 
    /**
     * 所属 Widget 
     */
    public w?: Widget;
    /**
     * 父节点
     */
    public p?: VirtualContainerNode;
    /**
     * 样式集
     */
    public ext?: VNodeExt;
    /**
     * nodeHash
     */
    public nH: number;
    /**
     * 虚拟节点属性集
     * attrs
     */
    public a: VirtualAttr;
    /**
     * 属性计算出来的hash
     * attrHash
     */
    public aH: number; 
    /**
     * 属性数量
     * attrSize
     */
    public aS: number; 
    /**
     * 虚拟节点样式集
     * style
     */
    public s: VirtualStyle;
    /**
     * 样式集 Hash
     * styleHash
     */
    public sH: number;
    /**
     * 样式集 大小
     * styleSize
     */
    public sS: number;
    /**
     * 虚拟节点事件 集
     */
    public e: VirtualEvent;
    /**
     * 事件集 hash
     * eventHash
     */
    public eH: number;
    /**
     * 事件集大小
     * eventSize
     */
    public eS: number;
    /**
     * 子节点数组计算出来的内容的hash
     * childHash
     */
    public cH:  number; 
    public wc: string;
    public l: RElement | RContainerElement | Widget | RImageElement | RTextElement;
    constructor(tagName: string, sid?: number, did?: string) {
        this.tg = tagName;
        this.si    = sid;
        this.di    = did;
        this.s  = new VirtualStyle([]);
        this.e  = new VirtualEvent();
        this.a  = new VirtualAttr();
        this.ext    = new VNodeExt();
    }
    public get widget () {
        return this.w;
    }
    public get link () {
        return this.l;
    }
    public get parent () {
        return this.p;
    }
    public get attrs () {
        return this.a;
    }
}
/**
 * 对应 div 节点
 */
export class VirtualContainerNode extends VirtualNodeBase {
    /**
     * childHash 快速判断是否为相同节点， 
     * 如果是其他语言，可以将tagName和sid也放入键中，这样结构更好一些
     * childHashMap
     */
    public cHM: Map<number, VWNode[]>; 

    /**
     * children
     */
    public cd: VNode[];
    /**
     * did快速判断是否为相同节点， 
     * 如果是其他语言，可以将tagName和sid也放入键中，这样结构更好一些
     */
    public dM: Map<string, VNode>;
    /**
     * textHash快速判断是否为相同节点
     * textHashMap
     */
    public tHM: Map<number, VirtualTextNode[]>; 
    /**
     * 虚拟节点的实现指向
     */
    public l: RContainerElement;
    constructor(tagName: string, sid?: number, did?: string) {
        super(tagName, sid, did);
        this.cHM   = new Map();
        this.cd       = [];
        this.dM         = new Map();
        this.tHM    = new Map();
    }
    public get children () {
        return this.cd;
    }
}

/**
 * 对应 widget 节点
 */
export class VirtualWidgetNode extends VirtualNodeBase {
    /**
     *  内容数据 - 组件属性数据
     */
    public ch: Json; 
    /**
     * 是否有 内容数据
     */
    public cs: boolean; 
    /**
     * 虚拟节点的实现指向
     */
    public l: Widget;
    constructor(tagName: string, sid?: number, did?: string) {
        super(tagName, sid, did);
    }
}

/**
 * 对应 span 节点
 */
export class VirtualTextNode extends VirtualNodeBase {
    public t:       string;
    public l:       RTextElement;
    public textHash: number;
    constructor(tagName: string, sid?: number, did?: string) {
        super(tagName, sid, did);
    }
}

/**
 * 对应 img 节点
 */
export class VirtualImageNode extends VirtualNodeBase {
    // public src:        string;
    public l:       RImageElement;
    constructor(tagName: string, sid?: number, did?: string) {
        super(tagName, sid, did);
    }
}

export class VNodeExt {
    /**
     * 合并后的样式
     */
    public style?: URLEffect;
    /**
     * 内联样式
     */
    public innerStyle?: URLEffect;
    /**
     * clazz内联样式
     */
    public clazzStyle?: URLEffect;
    public plugin?: any;
    public eventAttr?: VEventAttr;
    /**
     * 用户事件表
     */
    public eventMap?: Map<string, any>;
    /**
     * 本地事件表 
     * * key:"click" value: ()=>{}
     */
    public nativeEventMap?: Map<string, any>;
    /**
     * props是否使用更新模式，
     * * 默认为false,替换模式
     */
    public propsUpdate?: boolean;
    /**
     * 合并后的样式
     */
    public r_style?: Map<string, any>;
    public r_innerStyle?: Map<string, any>;
    public r_clazzStyle?: Map<string, any>;
}

export type VWNode = VirtualContainerNode | VirtualWidgetNode | VirtualTextNode;
export type VNode = VWNode | VirtualTextNode;

/**
 * @description 转换类型获得VirtualNode
 * @return <VirtualContainerNode> | undefined
 */
export const asVirtualContainerNode = (node: VirtualNodeBase): VirtualContainerNode => {
    if ((<VirtualContainerNode>node).tg === RElementTypeList.DIV || (<VirtualContainerNode>node).tg === RElementTypeList.input) {
        return <VirtualContainerNode>node;
    }
};
/**
 * @description 转换类型获得 VirtualWidgetNode
 * @return <VirtualWidgetNode> | undefined
 */
export const asVirtualWidgetNode = (node: VirtualNodeBase): VirtualWidgetNode => {
    // if ((<VirtualWidgetNode>node)[VNKeyWords.childHas] !== undefined || (<VirtualWidgetNode>node)[VNKeyWords.child] !== undefined) {
    //     return <VirtualWidgetNode>node;
    // }
    if (RElementTypeList.LIST.indexOf((<VirtualWidgetNode>node).tg) < 0) {
        return <VirtualWidgetNode>node;
    }
};
/**
 * @description 转换类型获得 VirtualTextNode
 * @return <VirtualTextNode> | undefined
 */
export const asVirtualTextNode = (node: VirtualNodeBase): VirtualTextNode => {
    if ((<VirtualTextNode>node).tg === RElementTypeList.SPAN) {
        return <VirtualTextNode>node;
    }
};

/**
 * @description 转换类型获得 VirtualImageNode
 * @return <VirtualTextNode> | undefined
 */
export const asVirtualImageNode = (node: VirtualNodeBase): VirtualImageNode => {
    if ((<VirtualImageNode>node).tg === RElementTypeList.IMAGE) {
        return <VirtualImageNode>node;
    }
};
/**
 * @description 获得指定属性的值
 * @example
 */
export const getAttribute = (attr: Object, name: string): string => {
    return attr[name];
};
/**
 * @description 寻找满足指定属性的第一个节点，递归调用，遍历vdom树。value为undefined，有属性就可以
 * @example
 */
export const findNodeByAttr = (node: VirtualContainerNode, key: string, value?: string): VWNode => {
    const arr: VirtualNodeBase[] = node.cd;

    for (const n of arr) {
        let transNode: VirtualContainerNode | VirtualWidgetNode | VirtualTextNode;
        transNode = asVirtualContainerNode(n);

        if (transNode) {
            const value0 = getAttribute(transNode.a, key);

            if (value !== undefined) {
                if (value === value0) {
                    return transNode;
                }
            } else if (value0 !== undefined) {
                return transNode;
            }

            transNode = findNodeByAttr(transNode, key, value);
            if (transNode) {
                return transNode;
            }

        } else if (asVirtualWidgetNode(n)) {
            transNode = asVirtualWidgetNode(n);

            if (transNode) {
                const value0 = getAttribute(transNode.a, key);

                if (value !== undefined) {
                    if (value === value0) {
                        return transNode;
                    }
                } else if (value0 !== undefined) {
                    return transNode;
                }
            }
        } else {
            const value0 = getAttribute(n.a, key);

            if (value !== undefined) {
                if (value === value0) {
                    return <VNode>n;
                }
            } else if (value0 !== undefined) {
                return <VNode>n;
            }
        }
    }
};
/**
 * @description 寻找满足指定Tag的第一个节点，递归调用，遍历vdom树
 * @example
 */
export const findNodeByTag = (node: VirtualContainerNode, tag: string): VWNode => {
    const arr = node.cd;
    for (let n of arr) {
        if (asVirtualContainerNode(n)) {
            if ((<VirtualContainerNode>n).tg === tag) {
                return <VirtualContainerNode>n;
            }
            n = findNodeByTag(<VirtualContainerNode>n, tag);
            if (n) {
                return <VirtualContainerNode>n;
            }
        } else if (asVirtualWidgetNode(n)) {
            if ((<VirtualWidgetNode>n).tg === tag) {
                return <VirtualWidgetNode>n;
            }
        }
    }
};

/**
 * @description 用新节点创建
 * @example
 */
export const create = (n: VNode): void => {
    if (asVirtualWidgetNode(n)) {
        painter.createWidget((<VirtualWidgetNode>n));
    } else {
        createNode((<VirtualContainerNode>n));
    }
};

/**
 * @description 用新节点替换旧节点
 * replace的前提是，已经判断这是同一个节点了，替换后对旧节点做标记，
 * @example
 */
// tslint:disable-next-line:cyclomatic-complexity
export const replace = (oldNode: VirtualNodeBase, newNode: VirtualNodeBase): boolean => {
    let bool: boolean;
    // if (asVirtualTextNode(oldNode) && asVirtualTextNode(newNode)) {
    //     if ((<VirtualTextNode>oldNode).text !== undefined && (<VirtualTextNode>oldNode).text !== null && (<VirtualTextNode>newNode).text !== undefined && (<VirtualTextNode>newNode).text !== null) {
    //         return replaceAsTextNode(oldNode, newNode);
    //     }
    // // } else if (asVirtualImageNode(oldNode) && asVirtualImageNode(newNode)) {
    // //     if ((<VirtualImageNode>oldNode).src !== undefined && (<VirtualImageNode>oldNode).src !== null && (<VirtualImageNode>newNode).src !== undefined && (<VirtualImageNode>newNode).src !== null) {
    // //         return replaceAsImageNode(oldNode, newNode);
    // //     }
    // } else {
    //     oldNode = <VirtualContainerNode | VirtualWidgetNode>oldNode;
    //     newNode = <VirtualContainerNode | VirtualWidgetNode>newNode;

    //     painter.replaceNode(<VWNode>oldNode, <VWNode>newNode);
    
    //     newNode.oO = oldNode.o;
    //     oldNode.o = -1;

    //     bool = replaceAttr(<VWNode>oldNode, <VWNode>newNode);

    //     if (oldNode.cH !== newNode.cH || painter.forceReplace) {
    //         if (asVirtualContainerNode(<VWNode>oldNode) && asVirtualContainerNode(<VWNode>newNode)) {
    //             replaceChilds(<VirtualContainerNode>oldNode, <VirtualContainerNode>newNode);
    //         } else if (asVirtualWidgetNode(<VWNode>oldNode) && asVirtualWidgetNode(<VWNode>newNode)) {
    //             painter.modifyWidget(<VirtualWidgetNode>oldNode, (<VirtualWidgetNode>newNode).child, (<VirtualWidgetNode>oldNode).child);
    //         }
    //         bool = true;

    //     } else if (asVirtualContainerNode(<VWNode>oldNode) && asVirtualContainerNode(<VWNode>newNode)) {
    //         // 将oldNode上的子节点及索引移动到新节点上
    //         (<VirtualContainerNode>newNode).didMap = (<VirtualContainerNode>oldNode).didMap;
    //         (<VirtualContainerNode>newNode).children = (<VirtualContainerNode>oldNode).children;
    //         (<VirtualContainerNode>newNode).textHashMap = (<VirtualContainerNode>oldNode).textHashMap;
    //         (<VirtualContainerNode>newNode).cHM = (<VirtualContainerNode>oldNode).cHM;
    //         for (const n of (<VirtualContainerNode>newNode).children) {
    
    //             n.parent = (<VirtualContainerNode>newNode);
    //         }
    //     }
    
    //     return bool;
    // }
    
    if (asVirtualTextNode(oldNode) && asVirtualTextNode(newNode)) {
        if ((<VirtualTextNode>oldNode).t !== undefined && (<VirtualTextNode>oldNode).t !== null && (<VirtualTextNode>newNode).t !== undefined && (<VirtualTextNode>newNode).t !== null) {
            replaceAsTextNode(oldNode, newNode);
        }
    } else {
        oldNode = <VirtualContainerNode | VirtualWidgetNode>oldNode;
        newNode = <VirtualContainerNode | VirtualWidgetNode>newNode;
        painter.replaceNode(<VWNode>oldNode, <VWNode>newNode);
    }

    newNode.oO = oldNode.o;
    oldNode.o = -1;

    bool = replaceAttr(<VWNode>oldNode, <VWNode>newNode);

    if (oldNode.cH !== newNode.cH || painter.forceReplace) {
        if (asVirtualContainerNode(<VWNode>oldNode) && asVirtualContainerNode(<VWNode>newNode)) {
            replaceChilds(<VirtualContainerNode>oldNode, <VirtualContainerNode>newNode);
        } else if (asVirtualWidgetNode(<VWNode>oldNode) && asVirtualWidgetNode(<VWNode>newNode)) {
            painter.modifyWidget(<VirtualWidgetNode>oldNode, (<VirtualWidgetNode>newNode)[VNKeyWords.child], (<VirtualWidgetNode>oldNode)[VNKeyWords.child]);
        }
        bool = true;

    } else if (asVirtualContainerNode(<VWNode>oldNode) && asVirtualContainerNode(<VWNode>newNode)) {
        // 将oldNode上的子节点及索引移动到新节点上
        (<VirtualContainerNode>newNode).dM = (<VirtualContainerNode>oldNode).dM;
        (<VirtualContainerNode>newNode).cd = (<VirtualContainerNode>oldNode).cd;
        (<VirtualContainerNode>newNode).tHM = (<VirtualContainerNode>oldNode).tHM;
        (<VirtualContainerNode>newNode).cHM = (<VirtualContainerNode>oldNode).cHM;
        for (const n of (<VirtualContainerNode>newNode).cd) {

            n.p = (<VirtualContainerNode>newNode);
        }
    }

    return bool;
};

const replaceAsTextNode = (oldNode: any, newNode: any): boolean => {
    newNode.l = oldNode.l;
    newNode.ext = oldNode.ext;

    if (oldNode.t === newNode.t) {
        return false;
    }

    painter.modifyText(newNode, newNode.t, oldNode.t);

    return true;
};

// ============================== 本地
/**
 * @description 替换属性，计算和旧节点属性的差异
 * @example
 */
const replaceAttr = (oldNode: VWNode, newNode: VWNode): boolean => {
    const sameAttr  = oldNode.aH === newNode.aH;
    const sameStyle = oldNode.sH === newNode.sH;
    const sameEvent = oldNode.eH === newNode.eH;

    if (sameAttr
        && sameStyle
        && sameEvent
        && !painter.forceReplace
    ) {
        return false;
    }

    if (newNode.aS && !newNode.ext) {
        newNode.ext = {};
    }

    !sameAttr   && objDiff(newNode.a,   newNode.aS,   oldNode.a,  oldNode.aS,   attrDiff,    newNode);
    !sameEvent  && objDiff(newNode.e,   newNode.eS,  oldNode.e,  oldNode.eS,  eventDiff,   newNode);
    if (!sameStyle) {
        objDiff(newNode.s,  newNode.sS,  oldNode.s,  oldNode.sS,  styleDiff,   newNode);
        painter.setDiffStyle(newNode, false);
    }

    return true;
};
/**
 * @description 替换属性，计算和旧节点属性的差异
 * @example
 */
const attrDiff = (newNode: VWNode, key: string, v1: string, v2: string) => {
    if (v1 === undefined) {
        return painter.delAttr(newNode, key);
    }
    if (v2 === undefined) {
        return painter.addAttr(newNode, key, v1);
    }
    painter.modifyAttr(newNode, key, v1, v2);
};
/**
 * @description 替换属性，计算和旧节点属性的差异
 * @example
 */
const styleDiff = (newNode: VWNode, key: string, v1: any, v2: any) => {
    if (v1 === undefined) {
        return painter.delStyle(newNode, key);
    }
    if (v2 === undefined) {
        return painter.addStyle(newNode, key, v1);
    }
    painter.modifyStyle(newNode, key, v1, v2);
};
/**
 * @description 替换属性，计算和旧节点属性的差异
 * @example
 */
const eventDiff = (newNode: VWNode, key: string, v1: string, v2: string) => {
    if (v1 === undefined) {
        return painter.delEvent(newNode, key);
    }
    if (v2 === undefined) {
        return painter.addEvent(newNode, key, v1);
    }
    painter.modifyEvent(newNode, key, v1, v2);
};
/**
 * @description 替换属性，计算和旧节点属性的差异
 * @example
 */
const otherDiff = (newNode: VWNode, key: string, v1: string, v2: string) => {
    if (v1 === undefined) {
        return painter.delAttr(newNode, key);
    }
    if (v2 === undefined) {
        return painter.addAttr(newNode, key, v1);
    }
    painter.modifyAttr(newNode, key, v1, v2);
};
/**
 * @description 在数组中寻找相同节点
 * @example
 */
const findSameHashNode = (arr: VWNode[], node: VWNode): VWNode | void => {
    if (!arr) {
        return;
    }
    for (let n, i = 0, len = arr.length; i < len; i++) {
        n = arr[i];
        if (n.o >= 0 && n.tg === node.tg && n.si === node.si && n.aH === node.aH) {
            return n;
        }
    }
};
/**
 * @description 在数组中寻找相似节点
 * @example
 */
const findLikeHashNode = (arr: VWNode[], node: VWNode): VWNode | void => {
    if (!arr) {
        return;

    }

    for (let n, i = 0, len = arr.length; i < len; i++) {

        n = arr[i];

        if (n.o >= 0 && n.tg === node.tg && n.si === node.si) {

            return n;

        }

    }

};

/**
 * @description 寻找相同节点的函数
 * VirtualNode根据 did attrHash childHash 寻找相同节点，如果没有找到，则返回undefined
 * @example
 */

const findSameVirtualNode = (oldParent: VirtualContainerNode, newParent: VirtualContainerNode, child: VWNode): VWNode | void => {

    let n;

    if (child.di && oldParent.dM) {

        n = oldParent.dM.get(child.di);

        if (n && n.o >= 0 && (<any>n).tg === child.tg && (<any>n).si === child.si) {

            return <any>n;

        }

    } else if (oldParent.cHM) {

        return findSameHashNode(oldParent.cHM.get(child.cH), child);

    }

};

/**
 * @description 寻找相似节点的函数
 * VirtualNode根据 childHash attrHash offset 依次寻找相似节点，如果没有找到，则返回undefined
 * @example
 */

const findLikeVirtualNode = (oldParent: VirtualContainerNode, newParent: VirtualContainerNode, child: VWNode, offset: number): VWNode | void => {

    if (!oldParent.cHM) {

        return;

    }

    let n: VWNode;

    const arr = oldParent.cHM.get(child.cH);

    n = <VWNode>findLikeHashNode(arr, child);

    if (n) {

        return n;

    }

    n = <VWNode>oldParent.cd[offset];

    if (n && n.cH !== undefined && n.o >= 0 && child.tg === n.tg && child.si === n.si) {

        return n;

    }

};

/**
 * @description 寻找相同文本节点的函数
 * VirtualNode根据 textHash依次寻找相同节点，如果没有找到，则返回undefined
 * @example
 */

const findSameVirtualTextNode = (oldParent: VirtualContainerNode, newParent: VirtualContainerNode, child: VirtualTextNode): VirtualTextNode | void => {

    return <any>findSameVirtualNode(oldParent, newParent, <any>child);

    // const arr = oldParent.cHM && oldParent.cHM.get(child.cH);

    // if (arr && arr.length > 0) {

    //     return arr.shift();

    // }

};

/**
 * @description 寻找相似文本节点的函数
 * VirtualNode根据 offset 寻找相似节点，如果没有找到，则返回undefined
 * @example
 */

// tslint:disable:max-line-length
const findLikeVirtualTextNode = (oldParent: VirtualContainerNode, newParent: VirtualContainerNode, child: VirtualTextNode, offset: number): VirtualTextNode | void => {

    return <any>findLikeVirtualNode(oldParent, newParent, <any>child, offset);

    const n = oldParent.cd[offset];

    if (n && (<VirtualTextNode>n).t && n.o >= 0) {

        return <VirtualTextNode>n;

    }

};

/**
 * @description 初始化子节点，并在父节点上添加索引
 * @example
 */

const initAndMakeIndex = (n: VWNode, i: number, parent: VirtualContainerNode): void => {

    let map;
    let nodes;

    n.p = parent;

    n.o = i;

    n.w = parent.w;

    if (n.di) {

        if (!parent.dM) {

            parent.dM = new Map();

        }

        parent.dM.set(n.di, n);

    } else {

        map = parent.cHM;

        if (!map) {

            parent.cHM = map = new Map();

        }

        nodes = map.get(n[VNKeyWords.childHas]) || [];

        nodes.push(n);

        map.set(n[VNKeyWords.childHas], nodes);

        nodes = map.get(n.nH) || [];

        nodes.push(n);

        map.set(n.nH, nodes);

    }

};

/**
 * @description 文本索引
 * @example
 */

const makeTextIndex = (n: VirtualTextNode, i: number, parent: VirtualContainerNode): void => {

    initAndMakeIndex((<any>n), i, parent);

    return;

    n.p = parent;

    n.o = i;
    
    n.w = parent.w;

    let map = parent.tHM;

    if (!map) {

        parent.tHM = map = new Map();

    }

    const nodes = map.get(n.cH) || [];

    nodes.push(n);

    map.set(n.cH, nodes);

};

/**
 * @description 用新节点创建
 * @example
 */

const createNode = (node: VirtualContainerNode): void => {

    const arr = node.cd;

    painter.createNode(node);

    const parent = node.l;
    
    if (!arr) return;

    for (let n, i = 0, len = arr.length; i < len; i++) {

        n = arr[i];

        switch (n.tg) {
            case (RElementTypeList.DIV):
            case (RElementTypeList.input):
            case (RElementTypeList.textarea): 
            case (RElementTypeList.BG): 
            case (RElementTypeList.IMAGE): 
            case (RElementTypeList.SPAN): {
                initAndMakeIndex(n, i, node);
                createNode(n);
                break;
            }
            default: {
                if ((<VirtualNodeBase>node).cH !== undefined || (<VirtualNodeBase>node)[VNKeyWords.child] !== undefined) {
                    initAndMakeIndex(n, i, node);
                    painter.createWidget(n);
                } else {
                    warn(100, `节点类型 ${n.tg} 不支持`);
                }
            }
        }
        // if (asVirtualWidgetNode(n)) {

        //     initAndMakeIndex(n, i, node);

        //     painter.createWidget(n);

        // } else if (n.tg === RElementTypeList.DIV || n.tg === RElementTypeList.input || n.tg === RElementTypeList.textarea) {

        //     initAndMakeIndex(n, i, node);

        //     createNode(n);
        
        // } else if (n.tg === RElementTypeList.BG) {

        //     initAndMakeIndex(n, i, node);
        //     createNode(n);

        // } else if (n.tg === RElementTypeList.IMAGE) {

        //     initAndMakeIndex(n, i, node);
        //     createNode(n);

        // } else if (n.tg === RElementTypeList.SPAN)  {

        //     makeTextIndex(n, i, node);

        //     createNode(n);
        //     // painter.createTextNode(n);

        // } else {
        //     warn(100, `节点类型 ${n.tg} 不支持`);
        // }

        painter.addNode(<RContainerElement>parent, n, true);

    }

};

/**
 * @description 子节点替换方法，不应该使用编辑距离算法
 * 依次处理所有删除的和一般修改的节点。最后处理位置变动和新增的，如果位置变动超过1个，则清空重新添加节点
 * @example
 */

// tslint:disable-next-line:cyclomatic-complexity
const replaceChilds = (oldNode: VirtualContainerNode, newNode: VirtualContainerNode): void => {

    let n: VirtualNodeBase;
    let same;
    let arr = newNode.cd;
    const len = arr.length;
    let next = false;
    let insert = false;
    let move = 0;

    for (let i = 0, offset = 0; i < len; i++) {
        n = arr[i];
        if (n.tg !== RElementTypeList.SPAN) {
            initAndMakeIndex(<VWNode>n, i, newNode);
            // 在旧节点寻找相同节点
            same = findSameVirtualNode(oldNode, newNode, <VWNode>n);
        } else {
            makeTextIndex(<VirtualTextNode>n, i, newNode);
            // 在旧节点寻找相同节点
            same = findSameVirtualTextNode(oldNode, newNode, <VirtualTextNode>n);
        }

        if (!same) {
            offset++;
            // 猜测用最新的位置差能够找到变动的节点
            n.oO = -offset;
            next = true;
            continue;
        }

        // 记录最新相同节点的位置差
        offset = same.o + 1;
        replace(same, n);
        // 计算有无次序变动
        if (move >= 0) {
            move = (move <= offset) ? offset : -1;
        }
    }

    if (next) {
        move = 0;
        // 寻找相似节点
        for (let i = 0; i < len; i++) {
            n = arr[i];
            if (n.oO >= 0) {
                // 计算有无次序变动
                if (move >= 0) {
                    move = (move <= n.oO) ? n.oO : -1;
                }
                continue;
            }
            if (n.tg !== RElementTypeList.SPAN) {
                same = findLikeVirtualNode(oldNode, newNode, <VWNode>n, -n.oO - 1);
            } else {
                same = findLikeVirtualTextNode(oldNode, newNode, <VirtualTextNode>n, -n.oO - 1);
            }
            if (!same) {
                create(<VNode>n);
                insert = true;
                continue;
            }

            replace(same, n);
            // 计算有无次序变动
            if (move >= 0) {
                move = (move <= n.oO) ? n.oO : -1;
            }
        }
    }

    // 删除没有使用的元素

    arr = oldNode.cd;

    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].o >= 0) {
            painter.delNode(arr[i]);
        }
    }

    arr = newNode.cd;

    const parent = newNode.l;
    // 如果有节点次序变动，则直接在新节点上加入新子节点数组，代码更简单，性能更好
    if (move < 0) {
        // painter.paintCmd3(parent, "innerHTML", ""); //不需要清空，重新加一次，一样保证次序
        for (let i = 0; i < len; i++) {
            painter.addNode(<RContainerElement>parent, arr[i], true);
        }
    } else if (insert) {

        // 如果没有节点次序变动，则插入节点
        for (let i = 0; i < len; i++) {
            n = arr[i];
            if (n.oO < 0) {
                painter.insertNode(<RContainerElement>parent, <VNode>n, n.o);
            }
        }
    }
};

// 比较方法的回调函数
export interface DiffCallback {
    (args: any, key: string | number, v1: any, v2: any);
}
// tslint:disable-next-line:cyclomatic-complexity
export const objDiff = (obj1: any, objSize1: number, obj2: any, objSize2: number, cb: DiffCallback, args?: any): number => {
    let c = 0;
    if (objSize1 < objSize2) {
        for (const k in obj2) {
            if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
                continue;
            }
            const v1 = obj1[k];
            if (v1 !== undefined) {
                c++;
                const v2 = obj2[k];
                if (!equalAttr(v1, v2)) {
                    cb(args, k, v1, v2);
                }
            } else {
                cb(args, k, v1, obj2[k]);
            }
        }
        if (c < objSize1) {
            for (const k in obj1) {
                if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
                    continue;
                }
                const v2 = obj2[k];
                if (v2 === undefined) {
                    cb(args, k, obj1[k], v2);
                }
            }
        }
    } else {
        for (const k in obj1) {
            if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
                continue;
            }
            const v2 = obj2[k];
            if (v2 !== undefined) {
                c++;
                const v1 = obj1[k];
                if (!equalAttr(v1, v2)) {
                    cb(args, k, v1, v2);
                }
            } else {
                cb(args, k, obj1[k], v2);
            }
        }
        if (c < objSize2) {
            for (const k in obj2) {
                if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
                    continue;
                }
                const v1 = obj1[k];
                if (v1 === undefined) {
                    cb(args, k, v1, obj2[k]);
                }
            }
        }
    }

    return c;
};

// ============================== 立即执行
