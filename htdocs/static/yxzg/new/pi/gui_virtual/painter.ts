/**
 * vdom和组件的渲染器，提供全局的命令列表，将真实dom操作延迟到帧渲染时调用
 * 新建DOM节点及子节点时，不发送渲染命令，直接调用方法
 * 注意：如果父组件修改子组件属性，并且子组件也更改根节点的属性，则以最后修改的为准
 * 注意：如果父组件定义了子组件w-class样式，并且子组件也定义了根节点的w-class样式，则以子组件的优先
 */

// ============================== 导入
import { CombineCfg2, CombineImageMgr } from '../combine_image/combine';
import { RContainerElement } from '../gui/r_containerelement';
import { GUIImageResCfg, GUIRenderFlags, GUIViewOption, RElementTypeList } from '../gui/r_datastruct';
import { RDocument } from '../gui/r_document';
import { RElement } from '../gui/r_element';
import { RImageElement } from '../gui/r_imageelement';
import { StyleMap, Tools } from '../gui/tools';
import { butil, commonjs, depend } from '../lang/mod';
import { Json } from '../lang/type';
import { LogLevel, logLevel, warn } from '../util/log';
import { getTransWebpName, NORMAL_IMAGE_TYPE, Res, RES_TYPE_BLOB, ResTab } from '../util/res_mgr';
import { arrDrop, call, objCall } from '../util/util';
import * as event from './event';
import { getGlobal } from './frame_mgr';
import { calcClazz, difference, differenceStyle, filter, filterStyle, mergeStyle, parseEffect, parseEffect2, URLEffect, URLInfo } from './style';
import { VNKeyWords } from './virtaul_node_keyword';
import {
    asVirtualContainerNode, asVirtualImageNode, asVirtualTextNode, asVirtualWidgetNode, create,
    getAttribute, replace, VirtualContainerNode, VirtualImageNode, VirtualNodeBase, VirtualTextNode, VirtualWidgetNode, VNode, VWNode
} from './virtual_node';
import { factory, relative, Widget } from './widget';

import { MathTools } from '../gui/math_tools';
import { GUI_IMAGE_TYPE, GUIRes } from '../gui_res/res_mgr';

// ============================== 导出
// export class Painter {
//     public static level: any = commonjs.debug ? logLevel : LogLevel.info;
//     public static vdocument: RDocument = null;
//     public static frameMgr: any;
//     /**
//      * 是否忽略hash相同，强制比较和替换
//      */
//     public static forceReplace: boolean = false;
//     /**
//      * 是否显示w-前缀的属性
//      */
//     private static showWAttr: boolean = false;
//     /**
//      * 创建节点后的处理函数，一般给扩展方调用
//      */
//     private static createHandler: Function = null;
//     public static init() {
//         this.vdocument = new RDocument(document.getElementsByTagName('canvas')[0]);
//         // vdocument = new RDocument(document.body);
//         (<any>window).vdocument = Painter.vdocument;
//         this.frameMgr = getGlobal();
//         this.frameMgr.setPermanent(this.vdocument.render);
//     }
//     /**
//      * 是否显示w-前缀的属性
//      */
//     public static setShowWAttr = (value: boolean) => {
//         Painter.showWAttr = value;
//     }
//     /**
//      * 创建节点后的处理函数
//      */
//     public static setCreateHandler = (value: Function) => {
//         Painter.createHandler = value;
//     }
//     /**
//      * 获得真实的dom节点
//      */
//     public static getRealNode = (node: VirtualNodeBase): RElement => {
//         let n: VirtualWidgetNode;

//         while (node) {
//             n = asVirtualWidgetNode(node);
//             if (!n) {
//                 return (<any>node).link;
//             }
//             node = n.link.tree;
//         }
//     }
//     /**
//      * 替换节点，只替换了当前节点的link ext, 其他属性和子节点均没有替换
//      */
//     public static replaceNode = (oldNode: VWNode, newNode: VWNode): void => {
//         newNode.link = oldNode.link;
//         const n = asVirtualWidgetNode(newNode);
//         if (n) {
//             n.link.parentNode = n;
//         }
//         newNode.ext = oldNode.ext;
//         event.rebindEventMap(oldNode, newNode);
//     }
//     public static addAttr = (node: VWNode, key: string, value: string): void => {
//         setAttr(node, key, value);
//     }
//     public static modifyAttr = (node: VWNode, key: string, newValue: string, oldValue: string): void => {
//         setAttr(node, key, newValue);
//     }
//     public static delAttr = (node: VWNode, key: string): void => {
//         setAttr(node, key);
//     }
//     public static addStyle = (node: VWNode, key: string, value: string): void => {
//         setAttrStyle(node, key, value);
//     }
// }

export let level = commonjs.debug ? logLevel : LogLevel.info;

export let vdocument: RDocument = null;

/**
 * @description 是否忽略hash相同，强制比较和替换
 * @example
 */
export let forceReplace = false;

/**
 * @description 是否显示w-前缀的属性
 * @example
 */
export let showWAttr = false;
/**
 * @description 创建节点后的处理函数，一般给扩展方调用
 * @example
 */
export let createHandler: Function = null;

/**
 * @description 是否显示w-前缀的属性
 * @example
 */
export let setShowWAttr = (value: boolean) => {
    showWAttr = value;
};
/**
 * @description 是否显示w-前缀的属性
 * @example
 */
export let setCreateHandler = (func: Function) => {
    createHandler = func;
};

/**
 * @description 获得真实的dom节点
 * @example
 */
export const getRealNode = (node: VirtualNodeBase): RElement => {
    let n: VirtualWidgetNode;
    while (node) {
        n = asVirtualWidgetNode(node);
        if (!n) {
            return (<any>node).l;
        }
        node = n.l.tree;
    }
};

/**
 * @description 替换节点，只替换了当前节点的link ext, 其他属性和子节点均没有替换
 * @example
 */
export const replaceNode = (oldNode: VWNode, newNode: VWNode): void => {
    newNode.l = oldNode.l;
    const n = asVirtualWidgetNode(newNode);
    if (n) {
        n.l.parentNode = n;
    }
    newNode.ext = oldNode.ext;
    event.rebindEventMap(<VirtualContainerNode | VirtualWidgetNode>oldNode, <VirtualContainerNode | VirtualWidgetNode>newNode);
};

/**
 * @description 添加节点的属性，并没有真正的添加，只是传了一个命令
 * @example
 */
export const addAttr = (node: VWNode, key: string, value: string): void => {
    setAttr(node, key, value);
};
/**
 * @description 修改节点的属性
 * @example
 */
export const modifyAttr = (node: VWNode, key: string, newValue: string, oldValue: string): void => {
    setAttr(node, key, newValue);
};
/**
 * @description 删除节点的属性
 * @example
 */
export const delAttr = (node: VWNode, key: string): void => {
    setAttr(node, key);
};

/**
 * @description 添加节点的 样式 属性，并没有真正的添加，只是传了一个命令
 * @example
 */
export const addStyle = (node: VWNode, key: string, value: string): void => {
    setAttrStyle(node, key, value);
};
/**
 * @description 修改节点的 样式 属性
 * @example
 */
export const modifyStyle = (node: VWNode, key: string, newValue: string, oldValue: string): void => {
    setAttrStyle(node, key, newValue);
};
/**
 * @description 删除节点的 样式 属性
 * @example
 */
export const delStyle = (node: VWNode, key: string, value?: string): void => {
    setAttrStyle(node, key, value);
};

/**
 * @description 添加节点的 事件 属性，并没有真正的添加，只是传了一个命令
 * @example
 */
export const addEvent = (node: VWNode, key: string, value: string): void => {
    setAttrEventListener(node, key, value);
};
/**
 * @description 修改节点的 事件 属性
 * @example
 */
export const modifyEvent = (node: VWNode, key: string, newValue: string, oldValue: string): void => {
    setAttrEventListener(node, key, newValue);
};
/**
 * @description 删除节点的 事件 属性
 * @example
 */
export const delEvent = (node: VWNode, key: string, value?: string): void => {
    setAttrEventListener(node, key, value);
};

/**
 * @description 添加节点的属性，并没有真正的添加，只是传了一个命令
 * @example
 */
// tslint:disable-next-line:cyclomatic-complexity
export const setAttr = (node: VirtualNodeBase, key: string, value?: string, immediately: boolean = true): void => {
    if (key === 'class') {
        cmdSet(getRealNode(node), 'className', value, immediately);
        
        return;
    }
    if (key === 'anim') {
        analyAttrAnim(node, value);

        return;
    }
    // if (key === 'style') {
    //     return setAttrStyle(node, key, value, immediately);
    // }
    // if (setAttrEventListener(node, key, value) && !showWAttr) {
    //     return;
    // }
    if (key.charCodeAt(0) === 119 && key.charCodeAt(1) === 95 || key.charCodeAt(1) === 45) {
        // key.replace('-', '_');
        // if (key === 'w_class') {
        //     setAttrClazz(node, key, value, immediately);
        // } else 
        if (key === 'w-plugin') {
            setAttrPlugin(node, value ? JSON.parse(value) : undefined);
        } else if (key === 'w-props') {
            if (asVirtualWidgetNode(node)) {
                (<VirtualWidgetNode>node).ext.propsUpdate = (value === 'update');
            }
        } else if (key.charCodeAt(2) === 101 && key.charCodeAt(3) === 118 && key.charCodeAt(4) === 45) {
            // "w-ev-***"
            let attr = node.ext.eventAttr;
            if (!attr) {
                node.ext.eventAttr = attr = {};
            }
            attr[key.slice(5)] = value ? JSON.parse(value) : undefined;
        }
        if (!showWAttr) {
            return;
        }
    }
    const el = getRealNode(node);
    // 匹配img src
    if (key === 'src' && asVirtualImageNode(node)) {
        setAttrSrc((<VirtualImageNode>node), value);
    } else if (key === 'value' && (node.tg === 'INPUT' || node.tg === 'TEXTAREA')) {
        cmdSet(el, 'value', value, immediately);
    } else if (value) {
        cmdObjCall(el, 'setAttribute', key, value, immediately);
    } else {
        cmdObjCall(el, 'removeAttribute', key, '', immediately);
    }
};

export const analyAttrAnim = (node: VirtualNodeBase, value: string) => {
    const cmdList = value.split(',');
    cmdList.forEach(v => {
        const parmList = v.split('-');
        const animName = parmList[0];
        const evtType  = parmList[1];
        const funcName = parmList[2];
        (<RElement>node.l).style.addAnimListener(animName, <any>evtType, (<Widget>node.w)[funcName]);
    });
};

export const setAttrSrc = (node: VirtualImageNode, value?: string, immediately: boolean = true) => {
    const el = getRealNode(node);

    // src 设置一定延时 - 底层
    immediately = false;
    
    if (value) {
        if (value.indexOf(':') < 0) {
            value = butil.relativePath(value, node.w.tpl.path);
            loadSrc(el, node.w, value, immediately);
        } else {
            // cmdSet(el, 'src', value, immediately);
            loadSrc(el, node.w, value, immediately);
        }
    } else {
        // cmdSet(el, 'src', '', immediately);
        loadSrc(el, node.w, '', immediately);
    }
};

export const setAttrText = (node: VirtualTextNode, value?: string, immediately: boolean = true) => {
    modifyText(node, value, undefined);
};

/**
 * @description 创建组件
 * @example
 */
export const createWidget = (node: VirtualWidgetNode): void => {
    // 处理相对tpl路径的组件
    let s = node.w.tpl.wpath;
    if (!s) {
        node.w.tpl.wpath = s = node.w.tpl.path.replace(/\//g, '-');
    }
    const w = factory(relative(node.tg, s));
    if (!w) {
        throw new Error(`widget not found, name: ${node.tg}`);		
    }
    node.l = w;
    node.w.children.push(w);
    w.parentNode = node;
    if (node.cs || node.ch) {
        if (getAttribute(node.a, 'w_props')) {
            w.updateProps(node.ch);
        } else {
            w.setProps(node.ch);
        }
    }
    w.paint();
    if (node.w.inDomTree) {
        attachList.push(w);
    }
    // if (node.aize) {
    node.ext = {};
    // }
    
    if (node.wc) {
        setAttrClazz(node, node.wc, node.wc, true);
    }

    const obj = node.a;
    for (const k in obj) {
        setAttr(node, k, obj[k], true);
    }

    const event = node.e;
    for (const k in event) {
        setAttrEventListener(node, k, event[k]);
    }
    
    const style = node.s;
    for (const k in style) {
        setAttrStyle(node, k, style[k], true);
    }

    setDiffStyle(node);
    // cmdCall(setDiffStyle, node, undefined, false);
    
    // cmdCall(setStyle, node.link.tree.link, mergeStyle(node.ext.r_innerStyle, node.ext.r_clazzStyle), false);
    
    createHandler && createHandler(node);
};
/**
 * @description 创建真实节点
 * @example
 */
export const createNode = (node: VirtualNodeBase): void => {
    const rnode = vdocument.createElement(<any>node.tg);
    node.l = rnode;
    node.l.virtual = node;

    if (asVirtualTextNode(node)) {
        setAttrText(<VirtualTextNode>node, (<VirtualTextNode>node).t);
    // } else if (asVirtualImageNode(node)) {
    //     setAttrSrc(<VirtualImageNode>node, (<VirtualImageNode>node).a.src);
    } else {
        (<RContainerElement | RImageElement>rnode).loadImageCall = (src: string, cb: (cfg: GUIImageResCfg) => void) => {

            src = analySrcPath(src, node.w);
            
            const info = depend.get(src);

            let combineInfo: CombineCfg2;
            
            if (!info) {
                combineInfo = analySrcCombineInfo(src);
            }
        
            if (combineInfo) {
                src = combineInfo[4];
            }

            const callBack = (path: string, cfg: GUIImageResCfg) => {
        
                if (rnode.isDestroy) return;

                cfg.path    = path;
                cfg.url     = path;

                if (!rnode.isDestroy) {
                    if (combineInfo && rnode._type === 'div') {

                        cfg.width               = combineInfo[0];
                        cfg.height              = combineInfo[1];
                        cfg.isCombine           = true;
                        cfg.combineWidth        = combineInfo[0];
                        cfg.combineHeight       = combineInfo[1];
                        cfg.combineLeft         = combineInfo[2];
                        cfg.combineTop          = combineInfo[3];

                        if (rnode.document.readStyle(rnode.style, 'borderImageClip')) {
                            Tools.warn(`不能为使用合并图片集的DIV设置 borderImageClip`);
                        } else {
                            rnode.document.applyStyle(rnode.style, 'borderImageClip', [combineInfo[3], combineInfo[2] + combineInfo[0], combineInfo[3] + combineInfo[1], combineInfo[2], 0]);
                        }
                    }
    
                    cb(cfg);
                }
                
            };

            loadSrcNormal(node.w, src, callBack);
        };
    }

    // if (node.aize) {
    node.ext = {};
    // }
    
    if (node.wc) {
        setAttrClazz(node, node.wc, node.wc, true);
    }

    const obj = node.a;
    for (const k in obj) {
        setAttr(node, k, obj[k], true);
    }
    
    const event = node.e;
    for (const k in event) {
        setAttrEventListener(node, k, event[k]);
    }
    
    const style = node.s;
    for (const k in style) {
        setAttrStyle(node, k, style[k], true);
    }
    setDiffStyle(node);

    createHandler && createHandler(node);
};
/**
 * @description 创建文本节点
 * @example
 */
// export const createTextNode = (node: VirtualTextNode): void => {
//     node.link = <RTextElement>vdocument.createTextNode(node.text);
//     node.link.host = node;
// };
/**
 * @description 插入节点
 * @example
 */
export const insertNode = (parent: RContainerElement, node: VNode, offset: number): void => {
    // cmdList.push([insertBefore, [parent, getRealNode(node), offset]]);
    insertBefore(parent, getRealNode(node), offset);
};
/**
 * @description 添加节点
 *
 * @example
 */
export const addNode = (parent: RContainerElement, node: VNode, immediately: boolean = true): void => {
    immediately = true;
    if (immediately) {
        parent.appendChild(getRealNode(node));
    } else {
        cmdList.push([parent, 'appendChild', [getRealNode(node)]]);
    }
};
/**
 * @description 删除节点，不仅要删除节点还要删除其下widget
 * @example
 */
export const delNode = (node: VNode): void => {
    let r: RElement | Widget = node.l;

    if (asVirtualContainerNode(node)) {
        delChilds(<VirtualContainerNode>node);
    } else if (asVirtualWidgetNode(node)) {
        arrDrop((<VirtualWidgetNode>node).w.children, r);
        const w = <Widget>r;
        delWidget(w);
        r = getRealNode(w.tree);
    }
    (<RElement>r).remove();
    // cmdList.push([r, 'remove', []]);
};
/**
 * @description 修改组件节点的数据
 * @example
 */
export const modifyWidget = (node: VirtualWidgetNode, newValue: Json, oldValue: Json): void => {
    const w = <Widget>node.l;
    if (node.ext && node.ext.propsUpdate) {
        w.updateProps(newValue, oldValue);
    } else {
        w.setProps(newValue, oldValue);
    }
    w.paint();
};
/**
 * @description 修改文本节点的文本
 * @example
 */
export const modifyText = (node: VirtualTextNode, newValue: string, oldValue: string): void => {
    // cmdList.push([node.l, 'nodeValue', newValue]);
    node.l.nodeValue = newValue;
};
/**
 * @description 修改Image节点的src
 * @example
 */
export const modifySrc = (node: VirtualImageNode, newValue: string, oldValue: string): void => {
    setAttrSrc(node, newValue);
};

/**
 * @description 删除widget及其子widgets
 * @example
 */
export const delWidget = (w: Widget): void => {
    if (!w.destroy()) {
        return;
    }
    if (w.inDomTree) {
        detachList.push(w);
    }

    delWidgetChildren(w.children);
};
/**
 * @description 获得显示在真实的dom节点的组件名称
 * @example
 */
export const getShowWidgetName = (node: VNode, name: string): string => {
    const n = asVirtualWidgetNode(node);

    // tslint:disable:prefer-template
    return (n) ? getShowWidgetName(n.l.tree, name + ' ' + n.l.name) : name;
};

/**
 * @description 渲染Widget方法，如果当前正在渲染，则缓冲，渲染完成后会继续渲染该数据
 * @example
 */
export const paintWidget = (w: Widget, reset?: boolean): void => {
    const tpl = w.tpl;
    if (!tpl) {
        return;
    }
    const frameMgr: any = getGlobal();
    if (cmdList.length === 0) {
        frameMgr.setBefore(paint1);
    }
    const tree: VWNode = tpl.value(w.getConfig() || empty, w.getProps(), w.getState(), w);
    let old = w.tree;
    tree.w = w;
    if (old) {
        if (reset) {
            try {
                w.beforeUpdate();
                const arr = w.children;
                for (const w of arr) {
                    delWidget(w);
                }
                w.children = [];
                create(tree);
                const node = getRealNode(tree);
                node.setAttribute('w_tag', getShowWidgetName(tree, w.name));
                cmdList.push([replaceTree, [node, getRealNode(old)]]);
                cmdList.push([w, 'afterUpdate', []]);
                w.tree = tree;
            } catch (e) {
                warn(level, 'paint reset fail, ', w, e);
            }
        } else {
            const b = old.sH         !== tree.sH 
                    || old.aH         !== tree.aH 
                    || old.cH        !== tree.cH 
                    || old.eH        !== tree.eH 
                    || (<VirtualTextNode>old).textHash  !== (<VirtualTextNode>tree).textHash 
                    || forceReplace;
            if (b) {
                try {
                    w.beforeUpdate();
                    old = w.tree;
                    replace(old, tree);
                    cmdList.push([w, 'afterUpdate', []]);
                    w.tree = tree;
                } catch (e) {
                    warn(level, 'paint replace fail, ', w, e);
                    if (old.o < 0) {
                        fixOld(asVirtualContainerNode(old));
                    }
                }
            }
        }
    } else {
        try {
            create(tree);
            getRealNode(tree).setAttribute('w_tag', getShowWidgetName(tree, w.name));
            w.tree = tree;
            w.firstPaint();
        } catch (e) {
            warn(level, 'paint create fail, ', w, e);
        }
    }
};

/**
 * @description 渲染命令2方法
 * @example
 */
export const paintCmd = (func, args?): void => {
    const frameMgr: any = getGlobal();
    if (cmdList.length === 0) {
        frameMgr.setBefore(paint1);
    }
    cmdList.push([func, args]);
};
/**
 * @description 渲染命令3方法
 * @example
 */
export const paintCmd3 = (obj: any, funcOrAttr: string, args?: any): void => {
    const frameMgr: any = getGlobal();
    if (cmdList.length === 0) {
        frameMgr.setBefore(paint1);
    }
    cmdList.push([obj, funcOrAttr, args]);
};
/**
 * @description 绘制时，添加组件，调用组件及子组件的attach方法
 * @example
 */
export const paintAttach = (w: Widget): void => {
    attachList.push(w);
};
/**
 * @description 绘制时，删除组件，调用组件及子组件的detach方法
 * @example
 */
export const paintDetach = (w: Widget): void => {
    detachList.push(w);
};

// ============================== 本地
// 空配置
const empty = {};// 每个painter的指令都被放入其中
let cmdList = [];
// 每个被添加的widget
let attachList: Widget[] = [];
// 每个被删除的widget
let detachList: Widget[] = [];
// 临时变量
let cmdList1 = [];
let attachList1: Widget[] = [];
let detachList1: Widget[] = [];

/**
 * @description 最终的渲染方法，渲染循环时调用，负责实际改变dom
 * @example
 */
const paint1 = (): void => {
    let arr = detachList;
    detachList = detachList1;
    detachList1 = arr;
    arr = cmdList;
    cmdList = cmdList1;
    cmdList1 = arr;
    arr = attachList;
    attachList = attachList1;
    attachList1 = arr;
    // 先调用所有要删除的widget的detach方法
    arr = detachList1;
    for (const w of arr) {
        paintDetach1(w);
    }
    arr.length = 0;
    arr = cmdList1;
    for (const cmd of (<any[]>arr)) {
        if (cmd.length === 3) {
            const args = cmd[2];
            if (Array.isArray(args)) {
                objCall(cmd[0], cmd[1], args);
            } else {
                cmd[0][cmd[1]] = args;
            }
        } else if (cmd.length === 2) {
            call(cmd[0], cmd[1]);
        }
    }
    // arr.length > 3 && level <= LogLevel.debug && debug(level, "painter cmd: ", arr.concat([]));
    arr.length = 0;
    // 调用所有本次添加上的widget的attach方法
    arr = attachList1;
    for (const w of arr) {
        paintAttach1(w);
    }
    arr.length = 0;
};
/**
 * @description 删除子组件
 * @example
 */
const delWidgetChildren = (arr: Widget[]): void => {
    for (const w of arr) {
        if (w.destroy()) {
            delWidgetChildren(w.children);
        }
    }
};
/**
 * @description 绘制时，添加组件，调用组件及子组件的attach方法
 * @example
 */
const paintAttach1 = (w: Widget): void => {
    if (w.inDomTree) {
        return;
    }
    w.inDomTree = true;
    w.attach();
    for (const c of w.children) {
        paintAttach1(c);
    }
};
/**
 * @description 绘制时，删除组件，调用组件及子组件的detach方法
 * @example
 */
const paintDetach1 = (w: Widget): void => {
    if (!w.inDomTree) {
        return;
    }
    w.inDomTree = false;
    for (const c of w.children) {
        paintDetach1(c);
    }
    w.detach();
};

/**
 * @description 设置节点的style
 * @example
 */
const setAttrStyle = (node: VirtualNodeBase, key: string, value: string, immediately?: boolean): void => {
    // node.ext.innerStyle = value ? parseEffect(value, node.widget.tpl.path) : null;
    // setDiffStyle(node, immediately);

    // node.ext.innerStyle = parseEffect2(key, value, node.ext.innerStyle);
    node.ext.r_innerStyle = node.ext.r_innerStyle || new Map();
    node.ext.r_innerStyle.set(key, value);
};
/**
 * @description 设置节点的clazz
 * @example
 */
// const setAttrClazz = (node: VWNode, key: string, value: string, immediately?: boolean): void => {
//     if (value) {
//         const clazz = value.trim().split(/\s+/);
//         if (clazz[0].length > 0) {
//             node.ext.clazzStyle = calc(node.widget, clazz, clazz.join(' '), { map: new Map(), url: null });
//         }
//     } else {
//         node.ext.clazzStyle = null;
//     }
    
//     setDiffStyle(node, immediately);
// };

const setAttrClazz = (node: VirtualNodeBase, key: string, value: string, immediately?: boolean): void => {
    if (value) {
        const clazz = value.trim().split(/\s+/);
        if (clazz[0].length > 0) {
            node.ext.r_clazzStyle = calcClazz(node.w, clazz, clazz.join(' '), new Map());
        }
    } else {
        node.ext.r_clazzStyle = null;
    }
    
    // setDiffStyle(node, immediately);
};
/**
 * @description 设置节点的插件
 * @example
 */
const setAttrPlugin = (node: VirtualNodeBase, cfg: Json): void => {
    let mod;
    const w = node.w;
    const old = node.ext.plugin;
    node.ext.plugin = cfg;
    if (cfg) {
        mod = commonjs.relativeGet(cfg.mod, w.tpl.path);
    } else if (old) {
        mod = commonjs.relativeGet(old.mod, w.tpl.path);
    }
    mod && mod.exports.pluginBind && mod.exports.pluginBind(w, node, cfg, old);
};
/**
 * @description 设置节点的style
 * @example
 */
export const setDiffStyle = (node: VirtualNodeBase, immediately: boolean = true): void => {
    // const ext   = node.ext;
    // const style = mergeStyle(ext.innerStyle, ext.clazzStyle);
    // const diff  = difference(ext.s, style);

    const ext   = node.ext;
    const style = mergeStyle(ext.r_innerStyle, ext.r_clazzStyle);
    const diff  = differenceStyle(ext.r_style, style);

    ext.r_style   = style;

    if (!diff) {
        return;
    }

    const el = getFilterStyleRealNode(node, diff);

    if (!el) {
        return;
    }

    // loadURL(el, node.widget, diff);
    cmdCall(setStyle, el, diff, immediately);
};

/**
 * @description 获得过滤样式后的真实的dom节点,如果过滤的样式不存在，则不向下获取dom节点
 * @example
 */
// const getFilterStyleRealNode = (node: VWNode, diff: URLEffect): RElement => {
const getFilterStyleRealNode = (node: VirtualNodeBase, diff: Map<string, any>): RElement => {
    let n: VirtualWidgetNode;
    // tslint:disable-next-line:no-constant-condition
    while (true) {
        n = asVirtualWidgetNode(node);
        if (!n) {
            return (<any>node).l;
        }
        node = n.l.tree;
        if (!node) {
            return null;
        }
        if (!node.ext) {
            continue;
        }
        // filter(node.ext.clazzStyle, diff);
        // filter(node.ext.innerStyle, diff);
        
        filterStyle(node.ext.r_clazzStyle, diff);
        filterStyle(node.ext.r_innerStyle, diff);

        if (diff.size === 0) {
            return null;
        }
    }
};

/**
 * @description 设置节点的事件，因为并不影响显示，所以立即处理，而不是延迟到渲染时。因为vnode已经被改变，如果延迟，也是会有事件不一致的问题
 * @example
 */
const setAttrEventListener = (node: VirtualNodeBase, key: string, value: string): boolean => {
    // tslint:disable:no-reserved-keywords
    // const type = event.getEventType(key);
    const type = key;
    if (type.startsWith(event.USER_EVENT_PRE)) {
        event.addUserEventListener(node, key, type, value);

        return true;
    }
    if (type) {
        // event.addNativeEventListener(node, getRealNode(node), key, type, value);
        event.addNativeEventListener2(node, getRealNode(node), key, type, value);

        return true;
    }

    return false;
};
/**
 * @description 命令属性设置
 * @example
 */
const cmdSet = (obj: any, key: string, value: any, immediately: boolean = true): void => {
    if (immediately) {
        obj[key] = value;
    } else {
        cmdList.push([obj, key, value]);
    }
};
/**
 * @description 命令方法调用
 * @example
 */
const cmdCall = (func: Function, arg1: any, arg2: any, immediately: boolean = true): void => {
    if (immediately) {
        func(arg1, arg2);
    } else {
        cmdList.push([func, [arg1, arg2]]);
    }
};
/**
 * @description 命令方法调用
 * @example
 */
const cmdObjCall = (obj: any, func: string, arg1: any, arg2: any, immediately: boolean = true): void => {
    if (immediately) {
        obj[func](arg1, arg2);
    } else {
        cmdList.push([obj, func, [arg1, arg2]]);
    }
};
/**
 * @description 删除节点的子节点，不仅要删除节点还要删除其下widget
 * @example
 */
const delChilds = (node: VirtualContainerNode): void => {
    const arr = node.cd;
    for (const n of arr) {
        if (asVirtualContainerNode(n)) {
            delChilds(<VirtualContainerNode>n);
        } else if (asVirtualWidgetNode(n)) {
            delWidget(<Widget>n.l);
        }
    }
};

// DOM 版本代码
// /**
//  * @description 设置元素的样式，跳过指定样式
//  * @example
//  */
// export const setStyle = (el: RElement, style: URLEffect): void => {
//     const s = el.s;
//     const map = style.map;
//     for (const [k, v] of map) {
//         s[k] = v;
//     }
// };

export const setStyle = (el: RElement, style: Map<string, any>): void => {
    if (el.isDestroy) {
        console.error('节点已销毁！', el);

        return;
    }
    const s = el.style;
    const map = style;

    Tools.log('setStyle', el.uniqueID);
    
    map.forEach((value: any, key: string) => {
        key = StyleMap[key];
        Tools.log('setStyle', key, value);

        el.document.applyStyle(s, key, value);
    });
};

export const setOneStyle = (el: RElement, key: string, value: any) => {
    const s = el.style;
    
    Tools.log('setStyle', el.uniqueID);

    Tools.log('setStyle', key, value);

    el.document.applyStyle(s, key, value);
};

/**
 * @description 插入节点
 * @example
 */
const insertBefore = (parent: RContainerElement, el: RElement, offset: number): void => {
    parent.insertBefore(el, parent.childNodes[offset]);
};

/**
 * @description 删除树节点
 * @example
 */
const replaceTree = (newEl: RElement, oldEl: RElement): void => {
    const parent = oldEl.parentNode;
    parent && parent.replaceChild(newEl, oldEl);
};

/**
 * @description 替换图像的src
 * @example
 */
const loadSrc = (el: RElement, widget: Widget, src: string, immediately: boolean = true): void => {
    // let tab = widget.resTab;
    // if (!tab) {
    //     widget.resTab = tab = new ResTab();
    // }
    // const name = NORMAL_IMAGE_TYPE + ':' + src;
    // const res = tab.get(name);
    // if (res) {
    //     cmdSet(el, 'src', res.link, immediately);
    // } else {
    //     tab.load(name, NORMAL_IMAGE_TYPE, src, tab, (res) => {
    //         paintCmd3(el, 'src', res.link);
    //     });
    // }

    src = analySrcPath(src, widget);
    const info = depend.get(src);

    let combineInfo: CombineCfg2;
    
    if (!info) {
        combineInfo = analySrcCombineInfo(src);
    }

    if (combineInfo) {
        src = combineInfo[4];
    }

    const callBack = (path: string, cfg: GUIImageResCfg) => {

        if (el.isDestroy) return;

        cfg.path    = path;
        cfg.url     = path;
        cfg.width   = cfg.width;
        cfg.height  = cfg.height;

        if (combineInfo) {
            
            cfg.width               = combineInfo[0];
            cfg.height              = combineInfo[1];
            cfg.isCombine           = true;
            cfg.combineWidth        = combineInfo[0];
            cfg.combineHeight       = combineInfo[1];
            cfg.combineLeft         = combineInfo[2];
            cfg.combineTop          = combineInfo[3];

            (<RImageElement>el).attributes.imageClip = [combineInfo[3], combineInfo[2] + combineInfo[0], combineInfo[3] + combineInfo[1], combineInfo[2], 0];
            src = combineInfo[4];
        }

        (<RImageElement>el).src = cfg;
    };
    loadSrcNormal(widget, src, callBack);
};

/**
 * 解析目标资源的合并图片集信息
 * @param url 资源项目路径
 */
const analySrcCombineInfo = (url: string) => {
    return CombineImageMgr.readImageInfo(url);
};

/**
 * 计算目标路径的项目路径
 * @param src tpl 中的路径
 * @param widget 所属 Widget
 */
const analySrcPath = (src: string, widget: Widget) => {
    if (src.indexOf(':') < 0) {
        src = butil.relativePath(src, widget.tpl.path);
    }

    return src;
};

/**
 * 节点加载图片资源
 * @param widget ：
 * @param src ：
 * @param cb ：
 */
const loadSrcNormal = (widget: Widget, src: string, cb: (path: string, link: GUIImageResCfg) => void) => {

    let tab = widget.resTab;
    if (!tab) {
        widget.resTab = tab = new ResTab();
    }

    const name = GUI_IMAGE_TYPE + ':' + src;
    const res  = tab.get(name);
    if (res) {
        paintCmd(cb, [src, res.link]);
        // cb(src, res.link);
        // res.unuse(10,0);
        // cmdList.push([cb, [res.link]]);
    } else {
        tab.load(name, GUI_IMAGE_TYPE, src, tab, (res) => {
            // paintCmd(cb, [src, res.link]);
            cb(src, res.link);
            // res.unuse(10,0);
            // cmdList.push([cb, [res.link]]);
        });
    }

    // let url = getTransWebpName(src);

    // url = depend.get(url).path;

    // url = `${depend.httpDomains[0]}${depend.rootDomains()}${depend.rootPath()}${url}`;

    // RDocument.createImageSrc()
};

// DOM 版本代码
// /**
//  * @description 替换含URL的样式或图像的src
//  * @example
//  */
// const loadURL = (el: RElement, widget: Widget, style: URLEffect): void => {
//     let tab = widget.resTab;
//     const url = style.url;
//     if (!url) {
//         return;
//     }
//     if (!tab) {
//         widget.resTab = tab = new ResTab();
//     }
//     const arr = url.arr.concat();
//     let count = (arr.length / 2) | 0;
//     for (let i = arr.length - 2; i > 0; i -= 2) {
//         const file = arr[i];
//         const name = RES_TYPE_BLOB + ':' + file;
//         const res = tab.get(name);
//         if (res) {
//             arr[i] = res.link;
//             count--;
//             if (count <= 0) {
//                 style.map.set(url.key, arr.join(''));
//             }
//         } else {
//             tab.load(name, RES_TYPE_BLOB, file, undefined, urlLoad(arr, i, () => {
//                 count--;
//                 if (count <= 0) {
//                     paintCmd3(el.style, url.key, arr.join(''));
//                 }
//             }));
//         }
//     }
// };

// DOM 版本代码
// /**
//  * @description 替换含URL的样式或图像的src
//  * @example
//  */
// const urlLoad = (arr: string[], i: number, callback: Function): Function => {
//     return (res) => {
//         arr[i] = res.link;
//         callback();
//     };
// };

/**
 * @description 尽量修复旧节点，已经重绑定的事件和发出的渲染指令还是会生效
 * @example
 */
const fixOld = (old: VirtualContainerNode): void => {
    if (!old) {
        return;
    }
    const arr = old.cd;
    for (let n, i = 0, len = arr.length; i < len; i++) {
        n = arr[i];
        if (n.o >= 0) {
            continue;
        }
        n.o = i;
        fixOld(asVirtualContainerNode(n));
    }
};

export const initGUI = (canvas: HTMLCanvasElement, fbo: WebGLFramebuffer, opt: GUIViewOption, renderFlag: number = GUIRenderFlags.BIND) => {
    vdocument = new RDocument(canvas, fbo, opt, renderFlag);
    (<any>window).vdocument = vdocument;
    // const frame = getGlobal();
    // frame.setPermanent(vdocument.render);

    GUIRes.vdocument = vdocument.uniqueID;

    // 设置 widget enabled 查询接口
    vdocument.askWidgetEnableCall = (ele: RElement) => {
        let result = true;

        if (ele.virtual) {
            let w: Widget = (<VirtualNodeBase>ele.virtual).w;
    
            // tslint:disable-next-line:no-constant-condition
            while (true) {
                // 不存在 组件
                if (!w) {
                    break;
                }
                // 组件 enable === false
                if (!w.widgetEnabled()) {
                    result = false;
                    break;
                }
    
                if (!w.parentNode) {
                    break;
                }
    
                w = w.parentNode.w;
            }
        }

        return result;
    };
    
    MathTools.Init();

    return vdocument;
};
