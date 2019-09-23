
import { RContainerElement } from '../gui/r_containerelement';
import { RElement } from '../gui/r_element';
import { getGlobal } from '../gui_virtual/frame_mgr';
import { delWidget, getRealNode, paintAttach, paintCmd3, paintDetach } from '../gui_virtual/painter';
import { VNKeyWords } from '../gui_virtual/virtaul_node_keyword';
import { VirtualWidgetNode } from '../gui_virtual/virtual_node';
import { factory, Widget } from '../gui_virtual/widget';
import { commonjs } from '../lang/mod';
import { now } from '../lang/time';
import { createHandlerList } from '../util/event';
import { LogLevel, setBroadcast } from '../util/log';
import { set as task } from '../util/task_mgr';
import { Callback, toString } from '../util/util';
import { RootManager } from './root_manager';

export let PageOpenDebug: any = {
    tempTime:   0,
    active:     false,
    BeforePageOpen: (name: string) => {
        PageOpenDebug.tempTime = Date.now();
        console.warn(`${name} Open Start: ${PageOpenDebug.tempTime}`);
    },
    AfterPageOpen: (name: string) => {
        const now = Date.now();
        console.warn(`${name} Open Start: ${now}`);
        console.warn(`${name} Open Use: ${now - PageOpenDebug.tempTime}`);
    }
};

(<any>window).PageOpenDebug = PageOpenDebug;

// 关闭值
export interface Close {
    widget: Widget;
    callback(w: Widget): any;
}

export let logLevel = commonjs.debug ? LogLevel.info : LogLevel.none;

// 是否记录页面路由信息
export let routerRecord = true;

/**
 * @description 获得是否禁止返回
 * @example
 */
export const isForbidBack = (): boolean => {
    return forbidBack;
};
/**
 * @description 设置是否禁止返回
 * @example
 */
export const setForbidBack = (b: boolean): void => {
    forbidBack = b;
};
/**
 * @description 获得是否禁止默认滚动
 * @example
 */
export const isPreventScroll = (): boolean => {
    return preventScroll;
};
/**
 * @description 设置是否禁止默认滚动
 * @example
 */
export const setPreventScroll = (b: boolean): void => {
    preventScroll = b;
};

/**
 * @description 弹出界面，返回关闭对象
 * @param back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const pop = (w: Widget, ok?: Callback, cancel?: Callback,
    process?: Callback, back?: Callback | 'cancel' | 'force' | 'next',originProps?:any): Close => {
    const b = { widget: w, callback: null };
    const close = { widget: w, callback: backClose };
    if (back === undefined || back === 'cancel') {
        b.callback = () => {
            close.callback(close.widget);
            cancel && cancel('back');
        };
    } else if (back === 'next') {
        b.callback = () => {
            close.callback(close.widget);
            cancel && cancel('back');
            backCall();
        };
    } else if (back !== 'force') {
        b.callback = back;
    }
    backList.push(b);
    let r;
    let propsSensitive = false;
    for (let i = 0; i < routerList.length;i++) {
        const props = routerList[i].props;
        if (props && props.pi_norouter) {
            propsSensitive = true;
            break;
        }
    }
    if ((w && w.props && w.props.pi_norouter) || propsSensitive) {
        r = { name:b.widget.name,props:{ pi_norouter:true } };
    } else {
        r = { name:b.widget.name,props:originProps };
    }
    routerList.push(r);
    routerListSerialize();
    
    // 设置回调
    (<any>w).ok = (<any>w).$ok = (arg) => {
        close.callback(close.widget);
        ok && ok(arg);
    };
    (<any>w).cancel = (<any>w).$cancel = (arg) => {
        close.callback(close.widget);
        cancel && cancel(arg);
    };
    (<any>w).process = (<any>w).$process = process;
    add(w);

    return close;
};
/**
 * @description 弹出新界面，返回关闭对象
 * @param back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const popNew = (name: string, props?: any, ok?: Callback, cancel?: Callback,
    process?: Callback, back?: Callback | 'cancel' | 'force' | 'next'): Close => {
        
    PageOpenDebug.BeforePageOpen && PageOpenDebug.BeforePageOpen(name);

    const w = create(name, props);
    const close = pop(w, ok, cancel, process, back,props);
    const c = close.callback;
    close.callback = (w: Widget) => {
        // popNew创建的，关闭需要销毁
        backClose(w);
        destory(w);
    };
    
    PageOpenDebug.AfterPageOpen && PageOpenDebug.AfterPageOpen(name);

    return close;
};
/**
 * @description 将2个close关联起来，1个界面被关闭时，关闭另外1个界面，一般要求界面1先打开
 * @example
 */
export const linkClose = (close1: Close, close2: Close): void => {
    const c1 = close1.callback;
    const c2 = close2.callback;
    close1.callback = (w: Widget) => {
        c2(close2.widget);
        c1(w);
    };
    close2.callback = (w: Widget) => {
        c2(w);
        c1(close1.widget);
    };
};

/**
 * @description 用任务队列的方式弹出界面2，并与界面1关联起来，如果界面1已经关闭，则自动销毁界面2
 * @example
 */
export const popLink = (close1: Close, name: string, props?: any, ok?: Callback, cancel?: Callback,
    process?: Callback, back?: Callback | 'cancel' | 'force' | 'next'): void => {
    getGlobal().setAfter(() => {
        task(() => {
            if (!close1.widget.parentNode) {
                return;
            }
            
            PageOpenDebug.BeforePageOpen && PageOpenDebug.BeforePageOpen(name);

            const w = create(name, props);
            
            PageOpenDebug.AfterPageOpen && PageOpenDebug.AfterPageOpen(name);

            if (!close1.widget.parentNode) {
                destory(w);

                return;
            }
            const close2 = pop(w, ok, cancel, process, back);
            close2.callback = (w: Widget) => {
                backClose(w);
                destory(w);
            };
            linkClose(close1, close2);
        }, undefined, 1000, 1);
    });
};

/**
 * @description 创建指定名称的组件
 * @example
 */
export const create = (name: string, props?: any): Widget => {
    const w = factory(name);
    if (!w) {
        return;
    }
    if (props !== undefined) {
        w.setProps(props);
    }
    w.paint();

    return w;
};
/**
 * @description 创建指定名称的组件，根据组件上的配置，将组件加入到指定的组上，会延迟到帧调用时添加
 * @example
 */
export const open = (name: string, props?: any): Widget => {
    PageOpenDebug.BeforePageOpen && PageOpenDebug.BeforePageOpen(name);
    
    const w = factory(name);
    if (!w) {
        return;
    }
    if (props !== undefined) {
        w.setProps(props);
    }
    w.paint();
    add(w);

    PageOpenDebug.AfterPageOpen && PageOpenDebug.AfterPageOpen(name);
    
    return w;
};

/**
 * @description 将指定的组件，根据组件上的配置，将组件加入到指定的组上，会延迟到帧调用时添加
 * @example
 */
export const add = (w: Widget, props?: any): void => {
    // root.appendChild(getRealNode(w.tree));
    // paintCmd3(root, 'appendChild', [getRealNode(w.tree)]);

    // return;
    const cfg = w.getConfig();
    const name = cfg && cfg.group;
    const group = RootManager.findGroup(name || 'main');
    if (!group) {
        return;
    }
    if (w.parentNode) {
        return;
    }
    group.arr.push(w);
    if (props !== undefined) {
        w.setProps(props);
        w.paint();
    }
    // tslint:disable-next-line:no-object-literal-type-assertion
    const node: VirtualWidgetNode = <any>{
        [VNKeyWords.attrs]: {}, 
        [VNKeyWords.attrSize]: 0, 
        [VNKeyWords.attrHash]: 0, 
        [VNKeyWords.link]: w, 
        [VNKeyWords.widget]: rootWidget, 
        [VNKeyWords.childHash]: 0xffffffff, 
        [VNKeyWords.child]: null
    };
    w.parentNode = node;
    // TODO 计算进场动画时间和是否透明
    // paintCmd3(group.el, 'appendChild', [getRealNode(w.tree)]);
    group.el.appendChild(getRealNode(w.tree));
    paintAttach(w);

    RootManager.updateGroupVisible();

    listenerList({ type: 'add', widget: w, group: group });
};
/**
 * @description 将指定的组件移除，会延迟到帧调用时移除
 * @example
 */
export const remove = (w: Widget): void => {
    if (!w.parentNode) {
        return;
    }
    w.parentNode = null;

    // paintCmd3(getRealNode(w.tree), 'remove', []);
    getRealNode(w.tree).remove();

    paintDetach(w);

    const cfg = w.getConfig();
    const name = cfg && cfg.group;
    
    const group = RootManager.findGroup(name || 'main');

    if (!group) {
        return;
    }

    const i = group.arr.indexOf(w);

    if (i < 0) {
        return;
    }

    group.arr.splice(i, 1);

    RootManager.updateGroupVisible();

    listenerList({ type: 'remove', widget: w, group: group });
};
/**
 * @description 显示或隐藏组
 * @example
 */
export const show = (groupName: string, b: boolean): void => {
    const group = RootManager.findGroup(groupName || 'main');
    if (!group) {
        return;
    }

    RootManager.visibleGroup(group, b);
};

/**
 * @description 将指定的组件移除并销毁
 * @example
 */
export const destory = (w: Widget): void => {
    remove(w);
    delWidget(w);
};

/**
 * @description 返回调用，返回弹出界面的数量
 * @example
 */
export const backCall = (): number => {
    const h = backList[backList.length - 1];
    h.callback && h.callback(h.widget);
    routerList.pop();
    routerListSerialize();

    return backList.length;
};

/**
 * @description 尽量关闭所有的返回对象，返回最后留下的弹出界面的数量
 * @example
 */
export const closeBack = (): number => {
    let len = backList.length;
    let i = backCall();
    while (i && i < len) {
        len = i;
        i = backCall();
        routerList.pop();
    }
    routerListSerialize();

    return i;
};

/**
 * @description 指定范围(左上角x1y1, 右下角x2y2)外，禁止鼠标和触控事件，直到超时时间
 * @example
 */
export const forbidEvent = (timeout: number, rect?: number[]): void => {
    forbidEventTime = timeout ? now() + timeout : 0;
    if (rect) {
        allowEventRect[0] = rect[0];
        allowEventRect[1] = rect[1];
        allowEventRect[2] = rect[2];
        allowEventRect[3] = rect[3];
    } else {
        allowEventRect[0] = allowEventRect[1] = allowEventRect[2] = allowEventRect[3] = 0;
    }
};

/**
 * @description 日志显示，仅处理在手机上，commonjs.debug打开，log级别为info,warn的日志
 * @example
 */
export const log = (level, msg, args1, args2, args3, args4, args5, args6, args7, args8, args9): void => {
    if (level < logLevel || !logContainer) {
        return;
    }
    let s;
    if (args9 !== undefined) {
        // tslint:disable:max-line-length prefer-template
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + ', ' + toString(args4) + ', ' + toString(args5) + ', ' + toString(args6) + ', ' + toString(args7) + ', ' + toString(args8) + ', ' + toString(args9) + '\n';
    } else if (args8 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + ', ' + toString(args4) + ', ' + toString(args5) + ', ' + toString(args6) + ', ' + toString(args7) + ', ' + toString(args8) + '\n';
    } else if (args7 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + ', ' + toString(args4) + ', ' + toString(args5) + ', ' + toString(args6) + ', ' + toString(args7) + '\n';
    } else if (args6 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + ', ' + toString(args4) + ', ' + toString(args5) + ', ' + toString(args6) + '\n';
    } else if (args5 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + ', ' + toString(args4) + ', ' + toString(args5) + '\n';
    } else if (args4 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + ', ' + toString(args4) + '\n';
    } else if (args3 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + ', ' + toString(args3) + '\n';
    } else if (args2 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + ', ' + toString(args2) + '\n';
    } else if (args1 !== undefined) {
        s = toString(msg) + ', ' + toString(args1) + '\n';
    } else {
        s = toString(msg) + '\n';
    }
    logClearTime = now() + LogClearTimeout;
    const t = document.createTextNode(s);
    logs.unshift(t);
    paintCmd3(logContainer, 'appendChild', [t]);
    
    if (logs.length === 1) {
        paintCmd3(root, 'appendChild', [logContainer]);
        setTimeout(clearLog, LogClearInterval);
    }
};

/**
 * @description 导出的监听器列表
 * @example
 */
export const listenerList = createHandlerList();

// 组对象
export interface Group {
    name:   string;
    el?:     RContainerElement; // 组元素
    arr?:    Widget[]; // 组上的组件
}

export interface Back {
    widget:     Widget; // 组件
    callback:   Callback; // 回调函数
}

export interface Router {
    name:string;  // widget名字
    props:any;   // props 属性
}
// 日志清除掉超时时间，20秒，也就是说20秒内，如果有日志写入，则不清除日志
const LogClearTimeout: number = 20000;
// 日志清除的间隔时间，2秒
const LogClearInterval: number = 2000;
// 日志最多100条
const LogLimit: number = 100;

// 根元素
export let root: RElement = null;
export const setRoot = (e) => {
    root = e;
}; 
// 根组件
export let rootWidget: Widget = null;
export const setRootWidget = (e) => {
    rootWidget = e;
}; 
// 组对象表
export const groupMap: Map<string, Group> = RootManager.groupMap;
// 返回记录
export const backList: Back[] = [];
// 路由记录
export const routerList:Router[] = [];
// 禁止返回
export let forbidBack: boolean = false;
// 禁止默认滚动
export let preventScroll: boolean = false;

// 日志
const logs: Text[] = [];
// 日志的清理时间
let logClearTime: number = 0;
// 日志的dom容器
export let logContainer: RElement = null;
export const setLogContainer = (e) => {
    logContainer = e;
}; 

// 根元素的缩放比例
export let rootScale = 1;
// 根元素的xy坐标
export let rootX = 0;
export let rootY = 0;
// 根元素的宽度和高度
export let rootWidth = 0;
export let rootHeight = 0;
// 旧的高度
export let oldHeight = 0;
// 手机模式弹出键盘的高度
export let keyBoardHeight = 0;

// 禁止触控时间
export let forbidEventTime = 0;
// 允许的矩形区域外，禁止触控

export const resetSize = (l: number, t: number, w: number, h: number) => {
    rootX = l;
    rootY = t;
    rootWidth = w;
    rootHeight = h;
};

const allowEventRect = [0, 0, 0, 0];

// 序列化routerList
const routerListSerialize = () => {
    if (routerRecord) {
        localStorage.setItem('pi_router_list',JSON.stringify(routerList));
    }
};

/**
 * @description 返回关闭
 * @example
 */
const backClose = (w: Widget) => {
    remove(w);
    (<any>w).ok = (<any>w).$ok = null;
    (<any>w).cancel = (<any>w).$cancel = null;
    (<any>w).process = (<any>w).$process = null;
    backList.pop();
    routerList.pop();
    routerListSerialize();

};

/**
 * @description 检查坐标是否在允许区域内
 * @example
 */
const checkAllowRect = (x: number, y: number, rect: number[]): boolean => {
    return (x > rect[0] && x < rect[2] && y > rect[1] && y < rect[3]);
};
/**
 * @description 负责监控页面大小变化，约束根元素在标准比例附近变化
 * @example
 */
const browserAdaptive = () => {
    if (!root) {
        return;
    }

    return;
};

/**
 * @description 日志清除
 * @example
 */
const clearLog = () => {
    // 清除超过100条的日志
    let i = logs.length - 1;
    if (i >= LogLimit) {
        for (; i >= LogLimit; i--) {
            paintCmd3(logs[i], 'remove', []);
        }
        logs.length = i + 1;
    } else {
        const t = now();
        if (t > logClearTime) {
            paintCmd3(logs[i--], 'remove', []);
            logs.pop();
        }
    }
    if (i >= 0) {
        setTimeout(clearLog, LogClearInterval);
    } else {
        paintCmd3(logContainer, 'remove', []);
    }
};

// ============================== 立即执行
// 在手机上才需要注册日志函数
commonjs.flags.mobile && setBroadcast(log);

// 监听onresize
window.onresize = browserAdaptive;
// 取顶层窗口
try {
    const win = top.window;
    // 注册系统返回事件
    win.onpopstate = () => {
        win.history.pushState({}, null);
        if (forbidBack) {
            return;
        }
        if (backList.length) {
            backCall();
        } else {
            listenerList({ type: 'back' });
        }
    };
    win.history.pushState({}, null);
// tslint:disable-next-line:no-empty
} catch (e) {
}