/*
 * 根组件
 * 负责监控页面大小变化，约束根元素在标准比例附近变化
 * 负责提供组，组的定义在div元素的属性上
 * 负责将指定的组件放入到对应的组上，并计算该组件的进场动画的时间，进程动画完毕后，还负责根据是否透明的配置，将该组下的组件及组设置成隐藏，组件销毁时，要把被隐藏的组件显示出来。动画期间禁止操作
 */

// ============================== 导入
import { Forelet } from "../widget/forelet";
import { Widget, factory } from "../widget/widget";
import { getGlobal } from "../widget/frame_mgr";
import { VirtualNode, VirtualWidgetNode, getAttribute } from "../widget/virtual_node";
import { getRealNode, delWidget, paintCmd3, paintAttach, paintDetach } from "../widget/painter";
import { now } from "../lang/time";
import { butil, commonjs } from '../lang/mod';
import { Callback, toString } from "../util/util";
import { offsetPos, getStyle } from "../util/html";
import { createHandlerList } from "../util/event";
import { set as task } from '../util/task_mgr';
import { LogLevel, setBroadcast } from '../util/log';
import { Json } from '../lang/type';

// ============================== 导出
export let logLevel = commonjs.debug ? LogLevel.info : LogLevel.none;

// 关闭值
export interface Close {
	widget: Widget;
	callback: (w: Widget) => any;
}

/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet = new Forelet();
/**
 * @description 导出的监听器列表
 * @example
 */
export const listenerList = createHandlerList();

/**
 * @description 根元素的显示兼容配置, 
 * 9×16(360×640 405×720 450×800), 3×5(360×600 420×700), 5×8(350×560 400×640)
 * @example
 */
export const cfg = {
	width: 420, height: 700, wscale: 0.25, hscale: 0.25, full: false
};

/**
 * @description 获得根元素
 * @example
 */
export const getRoot = (): HTMLElement => {
	return root;
}
/**
 * @description 获得根元素的缩放比例
 * @example
 */
export const getScale = (): number => {
	return rootScale;
}
/**
 * @description 获得根元素的宽度
 * @example
 */
export const getWidth = (): number => {
	return rootWidth;
}
/**
 * @description 获得根元素的高度
 * @example
 */
export const getHeight = (): number => {
	return rootHeight;
}

/**
 * @description 指定范围(左上角x1y1, 右下角x2y2)外，禁止鼠标和触控事件，直到超时时间
 * @example
 */
export const forbidEvent = (timeout: number, rect?: Array<number>): void => {
	forbidEventTime = timeout ? now() + timeout : 0;
	if (rect) {
		allowEventRect[0] = rect[0];
		allowEventRect[1] = rect[1];
		allowEventRect[2] = rect[2];
		allowEventRect[3] = rect[3];
	} else
		allowEventRect[0] = allowEventRect[1] = allowEventRect[2] = allowEventRect[3] = 0;
}

/**
 * @description 获得是否禁止返回
 * @example
 */
export const isForbidBack = (): boolean => {
	return forbidBack;
}
/**
 * @description 设置是否禁止返回
 * @example
 */
export const setForbidBack = (b: boolean): void => {
	forbidBack = b;
}
/**
 * @description 获得是否禁止默认滚动
 * @example
 */
export const isPreventScroll = (): boolean => {
	return preventScroll;
}
/**
 * @description 设置是否禁止默认滚动
 * @example
 */
export const setPreventScroll = (b: boolean): void => {
	preventScroll = b;
}
/**
 * @description 弹出界面，返回关闭对象
 * @param back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const pop = (w: Widget, ok?: Callback, cancel?: Callback, process?: Callback, back?: Callback | "cancel" | "force" | "next"): Close => {
	let b = { widget: w, callback: null };
	let close = { widget: w, callback: backClose };
	if (back === undefined || back === "cancel")
		b.callback = () => {
			close.callback(close.widget);
			cancel("back");
		}
	else if (back === "next")
		b.callback = () => {
			close.callback(close.widget);
			cancel("back");
			backCall();
		}
	else if (back !== "force")
		b.callback = back;
	backList.push(b);
	//设置回调
	(<any>w).ok = (<any>w)["$ok"] = (arg) => {
		close.callback(close.widget);
		ok && ok(arg);
	};
	(<any>w).cancel = (<any>w)["$cancel"] = (arg) => {
		close.callback(close.widget);
		cancel && cancel(arg);
	};
	(<any>w).process = (<any>w)["$process"] = process;
	add(w);
	return close;
}
/**
 * @description 弹出新界面，返回关闭对象
 * @param back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const popNew = (name: string, props?: any, ok?: Callback, cancel?: Callback, process?: Callback, back?: Callback | "cancel" | "force" | "next"): Close => {
	let w = create(name, props);
	let close = pop(w, ok, cancel, process, back);
	let c = close.callback;
	close.callback = (w: Widget) => {
		// popNew创建的，关闭需要销毁
		backClose(w);
		destory(w);
	}
	return close;
}
/**
 * @description 将2个close关联起来，1个界面被关闭时，关闭另外1个界面，一般要求界面1先打开
 * @example
 */
export const linkClose = (close1: Close, close2: Close): void => {
	let c1 = close1.callback;
	let c2 = close2.callback;
	close1.callback = (w: Widget) => {
		c2(close2.widget);
		c1(w);
	}
	close2.callback = (w: Widget) => {
		c2(w);
		c1(close1.widget);
	}
}

/**
 * @description 用任务队列的方式弹出界面2，并与界面1关联起来，如果界面1已经关闭，则自动销毁界面2
 * @example
 */
export const popLink = (close1: Close, name: string, props?: any, ok?: Callback, cancel?: Callback, process?: Callback, back?: Callback | "cancel" | "force" | "next"): void => {
	getGlobal().setAfter(() => {
		task(() => {
			if (!close1.widget.parentNode)
				return;
			let w = create(name, props);
			if (!close1.widget.parentNode) {
				destory(w);
				return;
			}
			let close2 = pop(w, ok, cancel, process, back);
			close2.callback = (w: Widget) => {
				backClose(w);
				destory(w);
			}
			linkClose(close1, close2);
		}, undefined, 1000, 1);
	});
}

/**
 * @description 创建指定名称的组件
 * @example
 */
export const create = (name: string, props?: any): Widget => {
	var w = factory(name);
	if (!w)
		return;
	if (props !== undefined)
		w.setProps(props);
	w.paint();
	return w;
}
/**
 * @description 创建指定名称的组件，根据组件上的配置，将组件加入到指定的组上，会延迟到帧调用时添加
 * @example
 */
export const open = (name: string, props?: any): Widget => {
	var w = factory(name);
	if (!w)
		return;
	if (props !== undefined)
		w.setProps(props);
	w.paint();
	add(w);
	return w;
}

/**
 * @description 将指定的组件，根据组件上的配置，将组件加入到指定的组上，会延迟到帧调用时添加
 * @example
 */
export const add = (w: Widget, props?: any): void => {
	let cfg = w.getConfig();
	let name = cfg && cfg.group;
	let group = groupMap.get(name || "main");
	if (!group)
		return;
	if (w.parentNode)
		return;
	group.arr.push(w);
	if (props !== undefined) {
		w.setProps(props);
		w.paint();
	}
	let node = <VirtualWidgetNode>{ attrs: {}, attrSize: 0, attrHash: 0, link: w, widget: rootWidget, childHash: 0xffffffff, child: null };
	w.parentNode = node;
	// TODO 计算进场动画时间和是否透明
	paintCmd3(group.el, "appendChild", [getRealNode(w.tree)]);
	paintAttach(w);
	if (group.arr.length === 1)
		paintCmd3(root, "appendChild", [group.el]);
	listenerList({ type: "add", widget: w, group: group });
}
/**
 * @description 将指定的组件移除，会延迟到帧调用时移除
 * @example
 */
export const remove = (w: Widget): void => {
	if (!w.parentNode)
		return;
	w.parentNode = null;
	paintCmd3(getRealNode(w.tree), "remove", []);
	paintDetach(w);
	let cfg = w.getConfig();
	let name = cfg && cfg.group;
	let group = groupMap.get(name || "main");
	if (!group)
		return;
	let i = group.arr.indexOf(w);
	if (i < 0)
		return;
	group.arr.splice(i, 1);
	// TODO 计算离场动画时间和是否透明
	if (group.arr.length === 0)
		paintCmd3(group.el, "remove", []);
	listenerList({ type: "remove", widget: w, group: group });
}
/**
 * @description 显示或隐藏组
 * @example
 */
export const show = (groupName: string, b: boolean): void => {
	let group = groupMap.get(groupName || "main");
	if (!group)
		return;
	paintCmd3(group.el.style, "visibility", b ? "visible" : "hidden");
}

/**
 * @description 将指定的组件移除并销毁
 * @example
 */
export const destory = (w: Widget): void => {
	remove(w);
	delWidget(w);
}

/**
 * @description 日志显示，仅处理在手机上，commonjs.debug打开，log级别为info,warn的日志
 * @example
 */
export const log = (level, msg, args1, args2, args3, args4, args5, args6, args7, args8, args9): void => {
	if (level < logLevel || !logContainer)
		return;
	let s;
	if (args9 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + ", " + toString(args4) + ", " + toString(args5) + ", " + toString(args6) + ", " + toString(args7) + ", " + toString(args8) + ", " + toString(args9) + "\n";
	else if (args8 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + ", " + toString(args4) + ", " + toString(args5) + ", " + toString(args6) + ", " + toString(args7) + ", " + toString(args8) + "\n";
	else if (args7 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + ", " + toString(args4) + ", " + toString(args5) + ", " + toString(args6) + ", " + toString(args7) + "\n";
	else if (args6 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + ", " + toString(args4) + ", " + toString(args5) + ", " + toString(args6) + "\n";
	else if (args5 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + ", " + toString(args4) + ", " + toString(args5) + "\n";
	else if (args4 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + ", " + toString(args4) + "\n";
	else if (args3 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + ", " + toString(args3) + "\n";
	else if (args2 !== undefined)
		s = toString(msg) + ", " + toString(args1) + ", " + toString(args2) + "\n";
	else if (args1 !== undefined)
		s = toString(msg) + ", " + toString(args1) + "\n";
	else
		s = toString(msg) + "\n";
	logClearTime = now() + LogClearTimeout;
	let t = document.createTextNode(s);
	logs.unshift(t);
	paintCmd3(logContainer, "appendChild", [t]);
	if (logs.length === 1) {
		paintCmd3(root, "appendChild", [logContainer]);
		setTimeout(clearLog, LogClearInterval);
	}
}

/**
 * @description 获取指定属性的父元素，如果遇到root根节点则返回undefined
 * @example
 */
export const getParentByAttr = (el: Element, key: string, value?: string): Element | undefined => {
	while (el !== null && el !== root && el !== document.body) {
		let v = el.getAttribute(key);
		if (v !== null) {
			if ((!value) || v === value)
				return el;
		}
		el = el.parentNode as Element;
	}
}
/**
 * @description 返回最后一个弹出界面
 * @example
 */
export const lastBack = (): Widget => {
	let h = backList[backList.length - 1];
	return h ? h.widget : null;
}
/**
 * @description 返回调用，返回弹出界面的数量
 * @example
 */
export const backCall = (): number => {
	let h = backList[backList.length - 1];
	h && h.callback && h.callback(h.widget);
	return backList.length;
}
/**
 * @description 尽量关闭所有的返回对象，返回最后留下的弹出界面的数量
 * @example
 */
export const closeBack = (): number => {
	let len = backList.length, i = backCall();
	while (i && i < len) {
		len = i;
		i = backCall();
	}
	return i;
}
export const setEvents = (type,handler):void => {
	rootEvents[type] = handler;
}
// ============================== 本地
// 组对象
interface Group {
	name: string;
	el: HTMLElement; // 组元素
	arr: Array<Widget>; // 组上的组件
}
interface Back {
	widget: Widget; // 组件
	callback: Callback; // 回调函数
}

// 日志清除掉超时时间，20秒，也就是说20秒内，如果有日志写入，则不清除日志
const LogClearTimeout: number = 20000;
// 日志清除的间隔时间，2秒
const LogClearInterval: number = 2000;
// 日志最多100条
const LogLimit: number = 100;

// 根元素
let root: HTMLElement = null;
// 根组件
let rootWidget: Widget = null;
// 组对象表
const groupMap: Map<string, Group> = new Map();
// 返回记录
const backList: Array<Back> = [];
// 禁止返回
let forbidBack: boolean = false;
// 禁止默认滚动
let preventScroll: boolean = false;
// 根事件列表
let rootEvents : {} = {
	"touchStart": null,
	"touchMove" : null,
	"touchEnd"  : null
};

// 日志
const logs: Array<Text> = [];
// 日志的清理时间
let logClearTime: number = 0;
// 日志的dom容器
let logContainer: HTMLElement = null;

// 根元素的缩放比例
let rootScale = 1;
// 根元素的xy坐标
let rootX = 0, rootY = 0;
// 根元素的宽度和高度
let rootWidth = 0, rootHeight = 0;
// 旧的高度
let oldHeight = 0;

// 禁止触控时间
let forbidEventTime = 0;
// 允许的矩形区域外，禁止触控
let allowEventRect = [0, 0, 0, 0];

/**
 * @description 返回关闭
 * @example
 */
const backClose = (w: Widget) => {
	remove(w);
	(<any>w).ok = (<any>w)["$ok"] = null;
	(<any>w).cancel = (<any>w)["$cancel"] = null;
	(<any>w).process = (<any>w)["$process"] = null;
	backList.pop();
}

/**
 * @description 检查坐标是否在允许区域内
 * @example
 */
const checkAllowRect = (x:number, y:number, rect:Array<number>): boolean => {
	return (x > rect[0] && x < rect[2] && y > rect[1] && y < rect[3]);
}
/**
 * @description 负责监控页面大小变化，约束根元素在标准比例附近变化
 * @example
 */
const browserAdaptive = () => {
	if (!root)
		return;
	let clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
	let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	let ae = document.activeElement as HTMLElement;
	//表示因为是输入，手机上弹出输入面板后的页面变小
	if ((ae.tagName === "INPUT" || ae.tagName === "TEXTAREA") && oldHeight > clientHeight) {
		let rect = ae.getBoundingClientRect();
		if (rect.bottom > clientHeight) {
			rootY -= (rect.bottom - clientHeight) / rootScale;// ?TODO 好像不应该/rootScale
			paintCmd3(root.style, "top", rootY + "px");
			oldHeight = clientHeight;
		}
		return;
	}
	if (cfg.full) {
		rootWidth = clientWidth;
		rootHeight = clientHeight;
		return paintCmd3(root.style, "cssText", "position:absolute;overflow:hidden;width:100%;height:100%;");
	}
	oldHeight = clientHeight;
	rootWidth = cfg.width;
	rootHeight = cfg.height;
	let scaleW = clientWidth / rootWidth;
	let scaleH = clientHeight / rootHeight;
	if (scaleW >= scaleH) {
		let diff = scaleW/scaleH - 1;
		diff = diff>cfg.wscale?cfg.wscale:diff;
		
		rootWidth *= (1+diff);
		// 宽度比例变动大于高度比例变动
		/* if (scaleW > scaleH * (1 + cfg.wscale)) {
			// 大于规定的比例
			rootWidth = rootWidth * (1 + cfg.wscale) | 0;
		} else {
			rootWidth = (clientWidth / scaleH) | 0;
		} */
		rootScale = scaleW = scaleH;
	} else {
		/* if (scaleH > scaleW * (1 + cfg.hscale)) {
			rootHeight = rootHeight * (1 + cfg.hscale) | 0;
		} else {
			rootHeight = (clientHeight / scaleW) | 0;
		} */
		let diff = scaleH/scaleW - 1;
		diff = diff>cfg.hscale?cfg.hscale:diff;
		rootHeight *= (1+ diff);
		rootScale = scaleH = scaleW;
	}
	rootX = (clientWidth - rootWidth) / 2;
	rootY = (clientHeight - rootHeight) / 2;
	paintCmd3(root.style, "cssText", "position: absolute;overflow: hidden;left: " + rootX + "px;top: " + rootY + "px;width:" + rootWidth + "px;height: " + rootHeight + "px;-webkit-transform:scale(" + scaleW + "," + scaleH + ");-moz-transform:scale(" + scaleW + "," + scaleH + ");-ms-transform:scale(" + scaleW + "," + scaleH + ");transform:scale(" + scaleW + "," + scaleH + ");");
	listenerList({ type: "resize", root: root, scale: rootScale, x: rootX, y: rootY, width: rootWidth, height: rootHeight });
}

/**
 * @description 日志清除
 * @example
 */
const clearLog = () => {
	// 清除超过100条的日志
	let i = logs.length - 1;
	if (i >= LogLimit) {
		for (; i >= LogLimit; i--)
			paintCmd3(logs[i], "remove", []);
		logs.length = i + 1;
	} else {
		let t = now();
		if (t > logClearTime) {
			paintCmd3(logs[i--], "remove", []);
			logs.pop();
		}
	}
	if (i >= 0)
		setTimeout(clearLog, LogClearInterval);
	else
		paintCmd3(logContainer, "remove", []);
}

// ============================== 立即执行
// 在手机上才需要注册日志函数
commonjs.flags.mobile && setBroadcast(log);

// 监听添加widget
forelet.listener = (cmd: string, widget: Widget): void => {
	if (cmd !== "firstPaint")
		return;
	rootWidget = widget;
	root = getRealNode(widget.tree);
	let forbid = (e) => {
		if (forbidEventTime > 0) {
			if (now() < forbidEventTime && !checkAllowRect(e.clientX, e.clientY, allowEventRect)) {
				e.stopPropagation();
			} else {
				forbidEventTime = 0;
			}
		}
	}
	let forbidTouch = (e) => {
		if (forbidEventTime > 0) {
			if (now() < forbidEventTime && !checkAllowRect(e.touches[0].pageX, e.touches[0].pageY, allowEventRect)) {
				e.stopPropagation();
			} else {
				forbidEventTime = 0;
			}
		}
	}
	let stop = (e) => {
		e.stopPropagation();
		rootEvents["touchend"] && rootEvents["touchend"](e);
	}
	let disabled = (e) => {
		e.stopPropagation();
		e.preventDefault();
	}
	let allowDefault = (e) => {
		e.stopPropagation();
		el = e.target;
		while (el !== null && el !== root && el !== document.body) {
			//如果元素为输入框或允许默认事件，则返回
			if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.getAttribute('allowDefault'))
				return;
			el = el.parentNode as Element;
		}
		e.preventDefault();
	}
	let startX, startY, el, orientation;
	let onTouchStart = (e) => {
		startX = e.touches[0].screenX;
		startY = e.touches[0].screenY;
		e.stopPropagation();
		orientation = 0;
		el = e.target;
		while (el !== null && el !== root && el !== document.body) {
			//如果元素为输入框或允许默认事件，则返回
			if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.getAttribute('allowDefault'))
				return;
			if(!preventScroll){
				// 如果完全使用better-scroll，则可以去掉
				let st = getStyle(el);
				if (st.overflowX === "auto")
					orientation |= 1;
				if (st.overflowY === "auto")
					orientation |= 2;
				//如果元素为可滚动，则返回
				if (orientation !== 0)
					return;
			}
			el = el.parentNode as Element;
		}
		rootEvents["touchStart"] && rootEvents["touchStart"](e);
		listenerList({ type: "ontouchstart" });
		// 禁止默认操作，防止微信及浏览器的返回或拉下
		e.preventDefault();
	}
	let onTouchMove = (e) => {
		if (orientation === 0) {
			e.preventDefault();
			return;
		}
		let endX = e.touches[0].screenX;
		let endY = e.touches[0].screenY;
		if ((orientation & 2) !== 0) {
			if (endY - startY >= 0) {
				if (el.scrollTop <= 0)
					e.preventDefault();
			} else {
				if (el.scrollHeight - el.clientHeight <= el.scrollTop)
					e.preventDefault();
			}
		}
		if ((orientation & 1) !== 0) {
			if (endX - startX >= 0) {
				if (el.scrollLeft <= 0)
					e.preventDefault();
			} else {
				if (el.scrollWidth - el.clientWidth <= el.scrollLeft)
					e.preventDefault();
			}
		}
		startX = endX;
		startY = endY;
		rootEvents["touchmove"] && rootEvents["touchmove"](e);
	}
	root.addEventListener("mousemove", forbid, true);
	root.addEventListener("mousedown", forbid, true);
	root.addEventListener("mouseup", forbid, true);
	root.addEventListener("touchmove", forbidTouch, true);
	root.addEventListener("touchstart", forbidTouch, true);
	root.addEventListener("touchend", forbidTouch, true);

	root.addEventListener("mousemove", allowDefault, false);
	root.addEventListener("mousedown", stop, false);
	root.addEventListener("mouseup", allowDefault, false);
	root.addEventListener("touchmove", onTouchMove, false);
	root.addEventListener("touchstart", onTouchStart, false);
	root.addEventListener("touchend", stop, false);
	let arr = (widget.tree as VirtualNode).children;
	for (let n of arr) {
		let e = getRealNode(n);
		paintCmd3(e, "remove", []);
		let name = getAttribute((n as any).attrs, "group");
		if (!name)
			continue;
		groupMap.set(name, { name: name, el: e, arr: [] });
		if (name === "log")
			logContainer = e;
	}
	browserAdaptive();
}
// 监听onresize
window.onresize = browserAdaptive;
// 取顶层窗口
try {
	let win = top.window;
	//注册系统返回事件
	win.onpopstate = () => {
		win.history.pushState({}, null);
		if (forbidBack)
			return;
		if (backList.length)
			backCall();
		else
			listenerList({ type: "back" });
	};
	win.history.pushState({}, null);
} catch (e) {
}