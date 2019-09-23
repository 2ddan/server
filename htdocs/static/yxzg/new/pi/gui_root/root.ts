/*
 * 根组件
 * 负责监控页面大小变化，约束根元素在标准比例附近变化
 * 负责提供组，组的定义在div元素的属性上
 * 负责将指定的组件放入到对应的组上，并计算该组件的进场动画的时间，进程动画完毕后，还负责根据是否透明的配置，将该组下的组件及组设置成隐藏，组件销毁时，要把被隐藏的组件显示出来。动画期间禁止操作
 */

// ============================== 导入
import { Animation } from '../gui/animation_tools';
import { RContainerElement } from '../gui/r_containerelement';
import { RDocument } from '../gui/r_document';
import { RElement } from '../gui/r_element';
import { REventData } from '../gui/r_event_base';
import { REventLimiter } from '../gui/r_event_limiter';
import { RStyle } from '../gui/r_style';
import { Tools } from '../gui/tools';
import { Forelet } from '../gui_virtual/forelet';
import { getRealNode, vdocument } from '../gui_virtual/painter';
import { VNKeyWords } from '../gui_virtual/virtaul_node_keyword';
import { VEventData } from '../gui_virtual/virtual_event';
import { getAttribute, VirtualContainerNode, VirtualNodeBase } from '../gui_virtual/virtual_node';
import { Widget } from '../gui_virtual/widget';
import { RootManager } from './root_manager';
import * as Tool from './tool';

// ============================== 导出
export let logLevel = () => Tool.logLevel;
// 是否记录页面路由信息
export let routerRecord = () => Tool.routerRecord;
// 关闭值
export interface Close {
    widget: Widget;
    callback(w: Widget): any;
}

export class Root extends Widget {
    /**
     * 主力UI的root组件
     */
    public static primaryRoot: Root;
    private static downList:    ((e: REventData) => any)[] = [];
    private static upList:      ((e: REventData) => any)[] = [];
    private static moveList:    ((e: REventData) => any)[] = [];
    private static wheelList:   ((e: REventData) => any)[] = [];
    private static dbclickList: ((e: REventData) => any)[] = [];
    private static clickList:   ((e: REventData) => any)[] = [];
    private static multipointerList: ((e: REventData) => any)[] = [];
    public static addDownListener(f: (e: REventData) => any) {
        if (this.downList.indexOf(f) < 0) {
            this.downList.push(f);
        }
    }
    public static addUpListener(f: (e: REventData) => any) {
        if (this.upList.indexOf(f) < 0) {
            this.upList.push(f);
        }
    }
    public static addMoveListener(f: (e: REventData) => any) {
        if (this.moveList.indexOf(f) < 0) {
            this.moveList.push(f);
        }
    }
    public static addWheelListener(f: (e: REventData) => any) {
        if (this.wheelList.indexOf(f) < 0) {
            this.wheelList.push(f);
        }
    }
    public static addDBClickListener(f: (e: REventData) => any) {
        if (this.dbclickList.indexOf(f) < 0) {
            this.dbclickList.push(f);
        }
    }
    public static addClickListener(f: (e: REventData) => any) {
        if (this.clickList.indexOf(f) < 0) {
            this.clickList.push(f);
        }
    }
    public static addMultiPointerListener(f: (e: REventData) => any) {
        if (this.multipointerList.indexOf(f) < 0) {
            this.multipointerList.push(f);
        }
    }
    public static removeDownListener(f: (e: REventData) => any) {
        const i = this.downList.indexOf(f);
        i >= 0 && this.downList.splice(i, 1);
    }
    public static removeUpListener(f: (e: REventData) => any) {
        const i = this.upList.indexOf(f);
        i >= 0 && this.upList.splice(i, 1);
    }
    public static removeMoveListener(f: (e: REventData) => any) {
        const i = this.moveList.indexOf(f);
        i >= 0 && this.moveList.splice(i, 1);
    }
    public static removeWheelListener(f: (e: REventData) => any) {
        const i = this.wheelList.indexOf(f);
        i >= 0 && this.wheelList.splice(i, 1);
    }
    public static removeDBClickListener(f: (e: REventData) => any) {
        const i = this.dbclickList.indexOf(f);
        i >= 0 && this.dbclickList.splice(i, 1);
    }
    public static removeClickListener(f: (e: REventData) => any) {
        const i = this.clickList.indexOf(f);
        i >= 0 && this.clickList.splice(i, 1);
    }
    public static removeMultiPointerListener(f: (e: REventData) => any) {
        const i = this.multipointerList.indexOf(f);
        i >= 0 && this.multipointerList.splice(i, 1);
    }
    public down = (e: VEventData) => {
        Tools.log('Root Down');
        if (this !== Root.primaryRoot) return;
        Root.downList.forEach(f => {
            f(e);
        });
    }
    public up = (e: VEventData) => {
        Tools.log('Root up');
        if (this !== Root.primaryRoot) return;
        Root.upList.forEach(f => {
            f(e);
        });
    }
    public move = (e: VEventData) => {
        Tools.log('Root move');
        if (this !== Root.primaryRoot) return;
        Root.moveList.forEach(f => {
            f(e);
        });
    }
    public click = (e: VEventData) => {
        Tools.log('Root move');
        if (this !== Root.primaryRoot) return;
        Root.clickList.forEach(f => {
            f(e);
        });
    }
    public dbclick = (e: VEventData) => {
        Tools.log('Root move');
        if (this !== Root.primaryRoot) return;
        Root.dbclickList.forEach(f => {
            f(e);
        });
    }
    public multipointer = (e: VEventData) => {
        Tools.log(`'Root multipointer' ${e.x}, ${e.y}`);
        if (this !== Root.primaryRoot) return;
        Root.multipointerList.forEach(f => {
            f(e);
        });
    }
}

// let div: HTMLDivElement;
// const loggg  = (arg) => {
//     if (!div) {
//         div = document.createElement('div');
//         document.body.appendChild(div);
//         div.style.cssText = 'position:absolute;top:100px;color:#ff0;';
//     }

//     div.innerText = typeof arg === 'string' ? arg :  JSON.stringify(arg);
// };

/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet = new Forelet();
/**
 * @description 导出的监听器列表
 * @example
 */
export const listenerList = Tool.listenerList;

/**
 * @description 根元素的显示兼容配置, 
 * 1x2(500x1000 600x1200) 2, 25x48(500x960 750x1440) 1.92, 8x15(480x900 560x1050 640x1200) 1.875, 5x9(500x900 600x1080) 1.8, 9x16(450x800 540x960) 1.77.., 3x5(480x800 540x900) 1.66.., 5x8(500x800) 1.6
 * @example
 */
export const cfg = {
    width: 750, height: 1334, wscale: 0, hscale: 0.25, full: false
};

/**
 * @description 获得根元素
 * @example
 */
export const getRoot = (): RDocument | RElement => {
    return Tool.root;
};
/**
 * @description 获得根元素的缩放比例
 * @example
 */
export const getScale = (): number => {
    return Tool.rootScale;
};
/**
 * @description 获得根元素的宽度
 * @example
 */
export const getWidth = (): number => {
    return Tool.rootWidth;
};
/**
 * @description 获得根元素的高度
 * @example
 */
export const getHeight = (): number => {
    return Tool.rootHeight;
};

/**
 * 获取键盘高度
 */
export const getKeyBoardHeight = (): number => {
    return Tool.keyBoardHeight;
};

/**
 * @description 指定范围(左上角x1y1, 右下角x2y2)外，禁止鼠标和触控事件，直到超时时间
 * @example
 */
export const forbidEvent = Tool.forbidEvent;

/**
 * @description 获得是否禁止返回
 * @example
 */
export const isForbidBack = Tool.isForbidBack;
/**
 * @description 设置是否禁止返回
 * @example
 */
export const setForbidBack = Tool.setForbidBack;
/**
 * @description 获得是否禁止默认滚动
 * @example
 */
export const isPreventScroll = Tool.isPreventScroll;
/**
 * @description 设置是否禁止默认滚动
 * @example
 */
export const setPreventScroll = Tool.setPreventScroll;
/**
 * @description 弹出界面，返回关闭对象
 * @param back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const pop = Tool.pop;
/**
 * @description 弹出新界面，返回关闭对象
 * @param back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const popNew = Tool.popNew;
/**
 * @description 将2个close关联起来，1个界面被关闭时，关闭另外1个界面，一般要求界面1先打开
 * @example
 */
export const linkClose = Tool.linkClose;

/**
 * @description 用任务队列的方式弹出界面2，并与界面1关联起来，如果界面1已经关闭，则自动销毁界面2
 * @example
 */
export const popLink = Tool.popLink;

/**
 * @description 创建指定名称的组件
 * @example
 */
export const create = Tool.create;
/**
 * @description 创建指定名称的组件，根据组件上的配置，将组件加入到指定的组上，会延迟到帧调用时添加
 * @example
 */
export const open = Tool.open;

/**
 * @description 将指定的组件，根据组件上的配置，将组件加入到指定的组上，会延迟到帧调用时添加
 * @example
 */
export const add = Tool.add;
/**
 * @description 将指定的组件移除，会延迟到帧调用时移除
 * @example
 */
export const remove = Tool.remove;
/**
 * @description 显示或隐藏组
 * @example
 */
export const show = Tool.show;

/**
 * @description 将指定的组件移除并销毁
 * @example
 */
export const destory = Tool.destory;

/**
 * @description 日志显示，仅处理在手机上，commonjs.debug打开，log级别为info,warn的日志
 * @example
 */
export const log = Tool.log;

/**
 * @description 获取指定属性的父元素，如果遇到root根节点则返回undefined
 * @example
 */
export const getParentByAttr = (el: RElement, key: string, value?: string): RElement | undefined => {
    while (el !== null && el !== Tool.root) {
        const v = el.getAttribute(key);
        if (v !== null) {
            if ((!value) || v === value) {
                return el;
            }
        }

        el = (<RElement>el).parentNode;
    }
};
/**
 * @description 返回最后一个弹出界面
 * @example
 */
export const lastBack = (): Widget => {
    const h = backList[backList.length - 1];

    return h ? h.widget : null;
};
/**
 * @description 返回调用，返回弹出界面的数量
 * @example
 */
export const backCall = Tool.backCall;
/**
 * @description 尽量关闭所有的返回对象，返回最后留下的弹出界面的数量
 * @example
 */
export const closeBack = Tool.closeBack;
// 返回记录
export const backList: Tool.Back[] = Tool.backList;
// 路由记录
export const routerList: Tool.Router[] = Tool.routerList;

const GUIInitHookList: (() => void)[] = [];

export const init = () => {
    Root.primaryRoot = <Root>create('pi-gui_root-root');
    vdocument.body.appendChild(<RContainerElement>Root.primaryRoot.tree[VNKeyWords.link]);

    RStyle.setAnimationCfgRequest(AnimationKeyFrameRequest);

    GUIInitHookList.forEach(f => {
        f();
    });
};

export const registerGUIInitHook = (f: () => void) => {
    GUIInitHookList.push(f);
};

const AnimationKeyFrameRequest = (ele: RElement, aname: string): Animation =>  {
    // r_sheet.value.keyframes 键名与构建器 对应
    return ((<VirtualNodeBase>ele.virtual).w).r_sheet.value.keyframes[aname];
};
// ============================== 本地
// ============================== 立即执行

// 监听添加widget
// tslint:disable-next-line:max-func-body-length
forelet.listener = (cmd: string, widget: Widget): void => {
    if (cmd !== 'firstPaint') {
        return;
    }

    Tool.setRootWidget(widget);

    Tool.setRoot(getRealNode(widget.tree));

    const arr = (<VirtualContainerNode>widget.tree)[VNKeyWords.children];

    for (const n of arr) {
        const e = getRealNode(n);
        const name = getAttribute(n.a, 'group');
        if (!name) {
            continue;
        }

        RootManager.addGroup(name, e);

        if (name === 'log') {
            Tool.setLogContainer(e);
        }
    }

    RootManager.updateGroupVisible();
    // browserAdaptive();
};

// setTimeout(() => { (<any>window).test24(); }, 2000);