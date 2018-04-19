/*
 * 事件处理模块
 * 提供在节点的事件上直接声明简单函数调用，简单函数还可以是抛出自定义事件的$notify函数
 * 将5种手势事件（单击tap、双击dbltap、长按longtap、移动move(挥swipe)、旋转缩放rotsal(rotote scale)）代码集成进来，作为引擎提供的本地事件，检测平台，模拟缺失平台的事件
 * 挥的判断是：touchend离开时间减去最后一次touchmove移动时间小于规定的值，并且最后一次移动的速度超过规定的速度
 * 
 * 事件支持直接调用widget组件上的方法，和notify方法。
 * 如果是简单字符串就认为是无参数方法。
 * @example <app-ui-btn on-tap=select>"g2"</app-ui-btn>
 * 如果是方法调用，支持参数中使用事件e, 及e的域。
 * @example <app-ui-btn on-tap="select({{v.id}}, 1, e.x, e.y)">"g2"</app-ui-btn>
 * 如果是$notify，支持直接抛出自定义的事件。
 * @example <app-ui-btn on-tap='$notify("ev-brand-btn-select", { "id":{{v.id}}, "x":e.x, "y":e.y})'>"g2"</app-ui-btn>
 */

// ============================== 导入
import { VirtualNode, VirtualWidgetNode } from "./virtual_node";
import { Widget } from './widget';
import { commonjs } from '../lang/mod';
import { HandlerResult, Handler } from "../util/event";
import { getDirection, getAngle } from "../util/math";
import { getValue } from "../util/util";

// ============================== 导出
export const USER_EVENT_PRE = "ev-";
export const BUBBLE_EVENT_PRE = "on-";
export const CAPTURE_EVENT_PRE = "cap-";

/**
 * @description tap事件默认的间隔时间
 */
export let TapInterval = 300;
/**
 * @description tap事件默认是否停止广播
 */
export let TapStopPropagation = true;
/**
 * @description 5种手势事件的移动距离限制
 */
export let MoveLimit = 15;
/**
 * @description 单击的时间值，毫秒
 */
export let TapTime = 600;
/**
 * @description 双击的时间值，毫秒
 */
export let DblTapTime = 600;
/**
 * @description 长按的时间值，毫秒
 */
export let LongTapTime = 800;
/**
 * @description 挥的速度的平方，px/秒
 */
export let SwipeSpeed = 300 * 300;
/**
 * @description 挥的最后停顿时间（touchend离开时间减去最后一次touchmove移动时间），必须小于该时间才认为是挥动
 */
export let SwipeTime = 100;

/**
 * @description 获得事件类型， 只能是ev- on- cap-
 * @example
 */
export const getEventType = (key: string): string => {
	let c = key.charCodeAt(0);
	if (c === 101 && key.startsWith(USER_EVENT_PRE)) {
		return USER_EVENT_PRE;
	} else if (c === 111 && key.startsWith(BUBBLE_EVENT_PRE)) {
		return BUBBLE_EVENT_PRE;
	} else if (c === 99 && key.startsWith(CAPTURE_EVENT_PRE)) {
		return CAPTURE_EVENT_PRE;
	}
}
/**
 * @description 获得用户事件监听器
 * @example
 */
export const getUserEventListener = (key: string, value: string): Function => {
	return getFunction(value);
}
/**
 * @description 获得本地事件监听器
 * @example
 */
export const getNativeEventListener = (key: string, value: string): Handler => {
	return getNativeFunction(getFunction(value));
}
/**
 * @description 重绑定节点事件表
 * @example
 */
export const rebindEventMap = (oldNode: VirtualNode | VirtualWidgetNode, newNode: VirtualNode | VirtualWidgetNode): void => {
	if(!oldNode.ext)
		return;
	let map = oldNode.ext.nativeEventMap;
	if (map) {
		for (let v of map.values()) {
			v.handler.vnode = newNode;
		}
	}
}

/**
 * @description 添加用户事件监听器，没有Handler表示删除用户事件监听器
 * @example
 */
export const addUserEventListener = (node: VirtualNode | VirtualWidgetNode, key: string, type: string, value: string): void => {
	let map = node.ext.eventMap;
	if (!map) {
		node.ext.eventMap = map = new Map();
	}
	if (value)
		map.set(key, getUserEventListener(key, value));
	else
		map.delete(key);
}
/**
 * @description 添加本地事件监听器，没有Handler表示删除本地事件监听器
 * @example
 */
export const addNativeEventListener = (node: VirtualNode | VirtualWidgetNode, realNode: HTMLElement, key: string, type: string, value: string): void => {
	let isCap = type === CAPTURE_EVENT_PRE;
	let map = node.ext.nativeEventMap;
	if (!map) {
		node.ext.nativeEventMap = map = new Map();
	} else {
		let old = map.get(key);
		if (old) {
			if (key === "cap-hashchange") {
				window.removeEventListener("hashchange", old.listener, false);
			} else {
				realNode.removeEventListener(old.type, old.listener, isCap);
				let arr = old.types;
				if (arr) {
					for (let t of arr)
						realNode.removeEventListener(t.type, t.listener, isCap);
				}
			}
		}
	}
	if (!value)
		return;
	let h = getNativeEventListener(key, value);
	// 在监听器上绑定虚拟节点，这样不使用闭包来获得虚拟节点
	(<any>h).vnode = node;
	let bind = eventBind(realNode, h, getEventName(key, type));
	map.set(key, bind);
	// hashchange事件是一个只能绑定在body上的事件，要特殊处理,使得他能向下传递，其他事件都是可以向上传递的
	if (key === "cap-hashchange") {
		window.addEventListener("hashchange", h, false);
	} else {
		realNode.addEventListener(bind.type, bind.listener, isCap);
		let arr = bind.listeners;
		if (arr) {
			for (let t of arr)
				realNode.addEventListener(t.type, t.listener, isCap);
		}
	}
}

/**
 * @description 沿节点树，通知节点上的事件监听器
 * @example
 */
export const notify = (node: VirtualNode | VirtualWidgetNode, eventType: string, e: any): void => {
	let listener, r, set = false;
	if (e) {
		if (typeof e === 'object' || typeof e === 'function') {
			e.type = eventType;
			//e.srcNode为初始事件源，e.native为原生事件
			e.srcNode = node;
			//e.srcWidget为初始组件源
			e.srcWidget = node.widget;
			set = true;
		}
	} else
		e = { type: eventType, srcNode: node, srcWidget: node.widget, node: null, widget: null };
	while (node) {
		if (set) {
			//e.node为当前节点源
			e.node = node;
			e.widget = node.widget;
		}
		let listener = node.ext ? (node.ext.eventMap ? node.ext.eventMap.get(eventType) : null) : null;
		if (listener) {
			let r = listener(e, node.widget);
			if (!r) {
			} else if (r === HandlerResult.BREAK_OK) {
				return;
			}
		}
		node = (node.parent) ? node.parent : node.widget.parentNode;
	}
}

// ============================== 本地
interface EventListener {
	type: string; // 本地事件类型
	listener: any; // 本地事件监听器
}
interface EventBind extends EventListener {
	listeners: Array<EventListener>; // 扩展的本地事件类型数组
	handler: Function;
}
interface Args {
	arr: Array<any>; // 函数参数
	index: number; // e 所在的位置
	fields: string; // e 的域值
}
// 全局事件函数的缓存
const cacheMap = new Map();

/**
 * @description 获得简单事件函数
 * @example
 */
const getSampleFunction = (funName, args?: Args): any => {
	return (e: any, w: Widget) => {
		let arr;
		if (args) {
			arr = args.arr;
			if (args.index >= 0) {
				arr[args.index] = args.fields ? getValue(e, args.fields) : e;
			}
		} else
			arr = [e];
		if (funName === "$notify") {
			notify(w.parentNode, arr[0], arr[1]);
			return HandlerResult.BREAK_OK;
		}
		let r = w.notify(funName, arr);
		if (r)
			return r;
		let f = w.forelet;
		if (!f)
			return;
		return f.notify(funName, arr);
	};
}

/**
 * @description 解析参数
 * @example
 */
const parseArgs = (arg: string): Args => {
	arg = arg.replace(/'/g, '"');
	let len = arg.length, attr;
	let findElemE = (arg: string, start): number => {
		for (let i = start; i < len; i++) {
			if (arg[i] !== " ")
				return (arg[i] === "e") ? i : -1;
		}
	}
	let findAttrOfE = (arg: string, start) => {
		if (arg[start] !== ".")
			return;
		let i = start + 1;
		for (; i < len; i++) {
			if (arg[i] === " " || arg[i] === ",")
				break;
		}
		attr = arg.slice(start + 1, i);
	}
	let findStrEnd = (arg: string, start, closedChar): number => {
		for (let i = start; i < len; i++) {
			if (arg[i] === closedChar)
				return i;
		}
	}
	let j = findElemE(arg, 0);
	if (j < 0) {
		for (let c, i = 0; i < len; i++) {
			c = arg[i];
			if (c === "'")
				i = findStrEnd(arg, i + 1, "'");
			else if (c === '"')
				i = findStrEnd(arg, i + 1, '"');
			else if (c === ",") {
				j = findElemE(arg, i + 1);
				if (j !== -1) {
					findAttrOfE(arg, j + 1);
					break;
				}
			}
		}
	} else
		findAttrOfE(arg, j + 1);
	if (j >= 0)
		arg = arg.substring(0, j) + '"$_"' + arg.substring(attr ? j + attr.length + 2 : j + 1, arg.length);
	try {
		let r = JSON.parse("[" + arg + "]");//匹配字符串中的",e",将其替换成",'$_'"
		return { arr: (r as Array<any>), index: r.indexOf("$_"), fields: attr };
	} catch (error) {
		throw new Error("parseArgs fail, args: " + arg);
	}
}

/**
 * @description 获得事件函数
 * @example
 */
const getFunction = (str: string): Function => {
	str = str.trim();
	//字符串中存在(,解析字符串中的方法名和参数
	let index = str.indexOf("(");
	if (index > 0) {
		let funName = str.slice(0, index);
		return getSampleFunction(funName, parseArgs(str.slice(index + 1, str.length - 1)));
	}
	return getSampleFunction(str);
}

/**
 * @description 获得本地事件函数，从函数身上取到绑定的虚拟节点，添加到事件上
 * @example
 */
const getNativeFunction = (h: Function): Handler => {
	let func = (e: any): HandlerResult => {
		let node = (<any>func).vnode;
		if (!node)
			return;
		let ext = node.ext;
		if(!ext)
			ext = node.ext = {};
		if ((!ext.eventAttr) && e.type === "tap") {
			ext.eventAttr = { tap: { interval: TapInterval, stop: TapStopPropagation, nextTime: 0 } };
		}
		if (ext.eventAttr) {
			let cfg = ext.eventAttr[e.type];
			if ((!cfg) && e.type === "tap") {
				ext.eventAttr[e.type] = cfg = { interval: TapInterval, stop: TapStopPropagation, nextTime: 0 };
			}
			if (cfg) {
				if (cfg.stop) {
					e.native ? e.native.stopPropagation() : e.stopPropagation();
				}
				if (cfg.prevent) {
					e.native ? e.native.preventDefault() : e.preventDefault();
				}
				if (cfg.interval) {
					if (cfg.nextTime && cfg.nextTime > e.timeStamp)
						return;
					cfg.nextTime = e.timeStamp + cfg.interval;
				}
			}
		}
		e.node = node;
		e.srcNode = node;
		e.widget = node.widget;
		e.srcWidget = node.widget;
		return h(e, node.widget);
	};
	return func;
}

/**
 * @description 获得原始的事件类型名
 * @example
 */
const getEventName = (str: string, type: string): string => {
	return str.slice(type.length);
}

/**
 * @description 事件绑定
 * @example
 */
const eventBind = (el: HTMLElement, h: Function, name: string): EventBind => {
	let func = gesture[commonjs.flags.mobile ? 0 : 1][name];
	return func ? func(el, h) : { type: name, name2: null, handler: h, listener: h };
}

// 触控手势
// 移动
const touchMove = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, xx = 0, yy = 0, lasttime = 0, lastx = 0, lasty = 0, state = -1;
	let fire = (e, type) => {
		h({ type: "move", subType: type, native: e, x: xx, y: yy, timeStamp: e.timeStamp, startTime: time, startX: x, startY: y, lastTime: lasttime, lastX: lastx, lastY: lasty });
	}
	let down = (e) => {
		if (e.touches.length > 1) {
			if (state > 0)
				cancel(e);
			else if (state === 0)
				state = -1;
			return;
		}
		state = 0;
		time = e.timeStamp;
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
		lasttime = time;
		lastx = x;
		lasty = y;
		xx = x;
		yy = y;
	}
	let move = (e) => {
		if (state < 0)
			return;
		if (e.touches.length > 1)
			return cancel(e);
		lasttime = e.timeStamp;
		lastx = xx;
		lasty = yy;
		xx = e.touches[0].pageX, yy = e.touches[0].pageY;
		if (state > 0) {
			fire(e, "keep");
		} else if (Math.abs(x - xx) > MoveLimit || Math.abs(y - yy) > MoveLimit) {
			state = 1;
			fire(e, "start");
		}
	}
	let up = (e) => {
		if (state > 0) {
			let t = e.timeStamp - lasttime;
			h({ type: "move", subType: "over", native: e, x: xx, y: yy, timeStamp: e.timeStamp, startTime: time, startX: x, startY: y, lastTime: lasttime, lastX: lastx, lastY: lasty, swipe: (t < SwipeTime) && ((lasty - xx) * (lasty - xx) + (lasty - yy) * (lasty - yy)) > SwipeSpeed * t / 1000 });
		}
		state = -1;
	}
	let cancel = (e) => {
		if (state > 0)
			fire(e, "cancel");
		state = -1;
	}
	return { type: "touchstart", listener: down, listeners: [{ type: "touchmove", listener: move }, { type: "touchend", listener: up }, { type: "touchcancel", listener: cancel }], handler: h };
}
// 单击
const touchTap = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, state = -1;
	let down = (e) => {
		if (e.touches.length > 1) {
			state = -1;
			return;
		}
		state = 1;
		time = e.timeStamp;
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
	}
	let move = (e) => {
		let xx = e.touches[0].pageX, yy = e.touches[0].pageY;
		if (state > 0 && (e.touches.length > 1 || Math.abs(x - xx) > MoveLimit || Math.abs(y - yy) > MoveLimit)) {
			state = -1;
		}
	}
	let up = (e) => {
		if (state > 0 && e.timeStamp < time + TapTime)
			h({ type: "tap", native: e, x: x, y: y, timeStamp: e.timeStamp });
		state = -1;
	}
	let cancel = (e) => {
		state = -1;
	}
	return { type: "touchstart", listener: down, listeners: [{ type: "touchmove", listener: move }, { type: "touchend", listener: up }, { type: "touchcancel", listener: cancel }], handler: h };
}

// 双击
const touchDbltap = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, state = -1;
	let down = (e) => {
		if (e.touches.length > 1 || state === 0 || state > 1) {
			state = -1;
			return;
		}
		let t = e.timeStamp, xx = e.touches[0].pageX, yy = e.touches[0].pageY;
		if (state === 1 && (t > time + DblTapTime || Math.abs(x - xx) > MoveLimit || Math.abs(y - yy) > MoveLimit)) {
			state = -1;
			return;
		}
		state++;
		time = t;
		x = xx;
		y = yy;
	}
	let move = (e) => {
		let xx = e.touches[0].pageX, yy = e.touches[0].pageY;
		if (state > 0 && (e.touches.length > 1 || Math.abs(x - xx) > MoveLimit || Math.abs(y - yy) > MoveLimit)) {
			state = -1;
		}
	}
	let up = (e) => {
		if (state === 0 && e.timeStamp < time + TapTime) {
			state = 1;
			time = e.timeStamp;
			return;
		}
		if (state === 2 && e.timeStamp < time + TapTime)
			h({ type: "dbltap", native: e, x: x, y: y, timeStamp: e.timeStamp });
		state = -1;
	}
	let cancel = (e) => {
		state = -1;
	}
	return { type: "touchstart", listener: down, listeners: [{ type: "touchmove", listener: move }, { type: "touchend", listener: up }, { type: "touchcancel", listener: cancel }], handler: h };
}

// 抬起
const touchUp = (el: HTMLElement, h: Function): EventBind => {
	let up = (e) => {
		h({ type: "up", native: e, timeStamp: e.timeStamp });
	}
	return { type: "touchend", listener: up, listeners: null, handler: h };
}

// 按下
const touchDown = (el: HTMLElement, h: Function): EventBind => {
	let down = (e) => {
		h({ type: "down", native: e, x: e.touches[0].pageX, y: e.touches[0].pageY, timeStamp: e.timeStamp });
	}
	return { type: "touchstart", listener: down, listeners: null, handler: h };
}

// 长按
const touchLongtap = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, ref = 0;
	let down = (e) => {
		if (e.touches.length > 1)
			return up(e);
		ref && clearTimeout(ref);
		time = e.timeStamp;
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
		ref = setTimeout(() => {
			ref = 0;
			h({ type: "longtap", native: e, x: x, y: y, timeStamp: time + LongTapTime, startTime: time });
		}, LongTapTime);
	};
	let move = (e) => {
		if (ref && (e.touches.length > 1 || Math.abs(x - e.touches[0].pageX) > MoveLimit || Math.abs(y - e.touches[0].pageY) > MoveLimit)) {
			clearTimeout(ref);
			ref = 0;
		}
	}
	let up = (e) => {
		ref && clearTimeout(ref);
		ref = 0;
	}
	return { type: "touchstart", listener: down, listeners: [{ type: "touchmove", listener: move }, { type: "touchend", listener: up }, { type: "touchcancel", listener: up }], handler: h };
}
// 旋转 缩放
const touchRotsal = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, xx = 0, yy = 0, xx1 = 0, yy1 = 0, xx2 = 0, yy2 = 0, dist1 = 0, dist2 = 0, vx1 = 0, vy1 = 0, vx2 = 0, vy2 = 0, direction = 0, angle = 0, state = -1;
	let fire = (e, type) => {
		h({ type: "rotsal", subType: type, native: e, dist: dist2, scale: dist2 / dist1, direction: direction, angle: angle, timeStamp: e.timeStamp, startTime: time, x: xx, y: yy, x1: x1, y1: y2, x2: x2, y2: y2, xx1: xx1, yy1: yy1, xx2: xx2, yy2: yy2, startDist: dist1 });
	}
	let down = (e) => {
		if (e.touches.length === 1) {
			if (state > 0)
				cancel(e);
			else if (state === 0)
				state = -1;
			return;
		}
		state = 0;
		time = e.timeStamp;
		x1 = e.touches[0].pageX;
		y1 = e.touches[0].pageY;
		x2 = e.touches[1].pageX;
		y2 = e.touches[1].pageY;
		x = (x1 + x2) / 2;
		y = (y1 + y2) / 2;
		vx1 = x1 - x2;
		vy1 = y1 - y2;
		dist1 = Math.sqrt(vx1 * vx1 + vy1 * vy1);
	}
	let move = (e) => {
		if (state < 0)
			return;
		if (e.touches.length === 1)
			return cancel(e);
		xx1 = e.touches[0].pageX, yy1 = e.touches[0].pageY;
		xx2 = e.touches[1].pageX, yy2 = e.touches[1].pageY;
		xx = (xx1 + xx2) / 2;
		yy = (yy1 + yy2) / 2;
		vx2 = xx1 - xx2;
		vy2 = yy1 - yy2;
		if (state > 0) {
			dist2 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
			direction = getDirection(vx1, vy1, vx2, vy2);
			angle = getAngle(vx1, vy1, vx2, vy2);
			fire(e, "keep");
		} else {
			let dx1 = Math.abs(x1 - xx1), dy1 = Math.abs(y1 - yy1);
			let dx2 = Math.abs(x2 - xx2), dy2 = Math.abs(y2 - yy2);
			if (dx1 + dy1 + dx2 + dy2 > MoveLimit) {
				state = 1;
				dist2 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
				direction = getDirection(vx1, vy1, vx2, vy2);
				angle = getAngle(vx1, vy1, vx2, vy2);
				fire(e, "start");
			}
		}
	}
	let up = (e) => {
		if (state > 0)
			fire(e, "over");
		state = -1;
	}
	let cancel = (e) => {
		if (state > 0)
			fire(e, "cancel");
		state = -1;
	}
	return { type: "touchstart", listener: down, listeners: [{ type: "touchmove", listener: move }, { type: "touchend", listener: up }, { type: "touchcancel", listener: cancel }], handler: h };
}

// 鼠标手势
// 移动
const mouseMove = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, lasttime = 0, lastx = 0, lasty = 0, state = -1;
	let fire = (e, type) => {
		h({ type: "move", subType: type, native: e, x: e.pageX, y: e.pageY, timeStamp: e.timeStamp, startTime: time, startX: x, startY: y, lastTime: lasttime, lastX: lastx, lastY: lasty });
	}
	let down = (e) => {
		state = 0;
		time = e.timeStamp;
		x = e.pageX;
		y = e.pageY;
		lasttime = time;
		lastx = x;
		lasty = y;
	}
	let move = (e) => {
		if (state > 0) {
			fire(e, "keep");
		} else if (state < 0) {
		} else if (Math.abs(x - e.pageX) > MoveLimit || Math.abs(y - e.pageY) > MoveLimit) {
			state = 1;
			lasttime = e.timeStamp;
			lastx = e.pageX;
			lasty = e.pageY;
			fire(e, "start");
		}
	}
	let up = (e) => {
		if (state > 0) {
			let t = e.timeStamp - lasttime;
			h({ type: "move", subType: "over", native: e, x: e.pageX, y: e.pageY, timeStamp: e.timeStamp, startTime: time, startX: x, startY: y, lastTime: lasttime, lastX: lastx, lastY: lasty, swipe: (t < SwipeTime) && ((lasty - e.pageX) * (lasty - e.pageX) + (lasty - e.pageY) * (lasty - e.pageY)) > SwipeSpeed * t / 1000 });
		}
		state = -1;
	}
	return { type: "mousedown", listener: down, listeners: [{ type: "mousemove", listener: move }, { type: "mouseup", listener: up }], handler: h };
}
// 单击
const mouseTap = (el: HTMLElement, h: Function): EventBind => {
	let hh = (e) => {
		h({ type: "tap", native: e, x: e.pageX, y: e.pageY, timeStamp: e.timeStamp });
	};
	return { type: "click", listener: hh, listeners: null, handler: h };
}
// 双击
const mouseDbltap = (el: HTMLElement, h: Function): EventBind => {
	let hh = (e) => {
		h({ type: "dbltap", native: e, x: e.pageX, y: e.pageY, timeStamp: e.timeStamp });
	};
	return { type: "dblclick", listener: hh, listeners: null, handler: h };
}
// 长按
const mouseLongtap = (el: HTMLElement, h: Function): EventBind => {
	let time = 0, x = 0, y = 0, ref = 0;
	let down = (e) => {
		ref && clearTimeout(ref);
		time = e.timeStamp;
		x = e.pageX;
		y = e.pageY;
		ref = setTimeout(() => {
			ref = 0;
			h({ type: "longtap", native: e, x: x, y: y, timeStamp: time + LongTapTime, startTime: time });
		}, LongTapTime);
	};
	let move = (e) => {
		if (ref && (Math.abs(x - e.pageX) > MoveLimit || Math.abs(y - e.pageY) > MoveLimit)) {
			clearTimeout(ref);
			ref = 0;
		}
	}
	let up = (e) => {
		ref && clearTimeout(ref);
		ref = 0;
	}
	return { type: "mousedown", listener: down, listeners: [{ type: "mousemove", listener: move }, { type: "mouseup", listener: up }], handler: h };
}

// 抬起
const mouseUp = (el: HTMLElement, h: Function): EventBind => {
	let up = (e) => {
		h({ type: "up", native: e, x: e.pageX, y: e.pageY, timeStamp: e.timeStamp });
	}
	return { type: "mouseup", listener: up, listeners: null, handler: h };
}

// 按下
const mouseDown = (el: HTMLElement, h: Function): EventBind => {
	let down = (e) => {
		h({ type: "down", native: e, x: e.pageX, y: e.pageY, timeStamp: e.timeStamp });
	}
	return { type: "mousedown", listener: down, listeners: null, handler: h };
}

// ============================== 立即执行
// 设置当前的手势函数表
const gesture = [{
	move: touchMove,
	tap: touchTap,
	dbltap: touchDbltap,
	longtap: touchLongtap,
	rotsal: touchRotsal,
	up: touchUp,
	down: touchDown
}, {
		move: mouseMove,
		tap: mouseTap,
		dbltap: mouseDbltap,
		longtap: mouseLongtap,
		up: mouseUp,
		down: mouseDown
	}
];

// 事件分类，参考用
const HTML_DEFAULT_EVENTS = {
	WINDOW_EVENT: {
		AFTER_PRINT: "afterprint",
		BEFORE_PRINT: "beforeprint",
		BEFORE_UNLOAD: "beforeunload",
		ERROR: "error",
		HASH_CHANGE: "hashchange",
		LOAD: "load",
		MESSAGE: "message",
		OFFLINE: "offline",
		LINE: "line",
		PAGE_HIDE: "pagehide",
		PAGE_SHOW: "pageshow",
		POP_STATE: "popstate",
		REDO: "redo",
		RESIZE: "resize",
		STORAGE: "storage",
		UNDO: "undo",
		UNLOAD: "unload",
	},
	KEYBOARD_EVENT: {
		KEY_DOWN: "keydown",
		KEY_PRESS: "keypress",
		KEY_UP: "keyup",
	},
	MOBILE_EVENT: {
		TOUCH_START: "touchstart",
		TOUCH_END: "touchend",
		TOUCH_MOVE: "touchmove",
		TOUCH_CANCEL: "touchcancel",
	},
	MOUSE_EVENT: {
		CLICK: "click",
		DBL_CLICK: "dblclick",
		DRAG: "drag",
		DRAG_END: "dragend",
		DRAG_ENTER: "dragenter",
		DRAG_LEAVE: "dragleave",
		DRAG_OVER: "dragover",
		DRAG_START: "dragstart",
		DROP: "drop",
		MOUSE_DOWN: "mousedown",
		MOUSE_MOVE: "mousemove",
		MOUSE_OUT: "mouseout",
		MOUSE_OVER: "mouseover",
		MOUSE_UP: "mouseup",
		MOUSE_WHEEL: "mousewheel",
		SCROLL: "scroll",
	},
	FORM_EVENT: {
		BLUR: "blur",
		CHANGE: "change",
		CTEXT_MENU: "ctextmenu",
		FOCUS: "focus",
		FORM_CHANGE: "formchange",
		FORM_INPUT: "forminput",
		INPUT: "input",
		INVALID: "invalid",
		RESET: "reset",
		SELECT: "select",
		SUBMIT: "submit",
	},
	MEDIA_EVENT: {
		ABOUT: "abort",
		CAN_PLAY: "canplay",
		CAN_PLAY_THROUGH: "canplaythrough",
		DURATI_CHANGE: "duratichange",
		EMPTIED: "emptied",
		ENDED: "ended",
		ERROR: "error",
		LOADED_DATA: "loadeddata",
		LOADED_META_DATA: "loadedmetadata",
		LOAD_START: "loadstart",
		PAUSE: "pause",
		PLAY: "play",
		PLAYING: "playing",
		PROGRESS: "progress",
		RATE_CHANGE: "ratechange",
		READY_STATE_CHANGE: "readystatechange",
		SEEKED: "seeked",
		SEEKING: "seeking",
		STALLED: "stalled",
		SUSPEND: "suspend",
		TIME_UPDATE: "timeupdate",
		VOLUME_CHANGE: "volumechange",
		WATING: "waiting",
	},
};
