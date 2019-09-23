/**
 * gui dom 层事件模块数据结构
 */

import { ListenerList } from '../util/event';
import { RElement } from './r_element';

/**
 * 事件结果记录
 * * 记录事件冒泡的路径节点
 * * 记录事件坐标
 * * 记录事件时间
 */
export class REventResult {
    /**
     * 事件类型
     */
    public readonly _type: REventTypes;
    /**
     * 事件点坐标
     */
    public readonly x: number;
    /**
     * 事件点坐标
     */
    public readonly y: number;
    /**
     * 事件时间戳
     */
    public readonly time: number;
    /**
     * 事件响应的路径
     */
    public readonly path: RElement[];
    constructor(evt: REventData) {
        this.x      = evt.x;
        this.y      = evt.y;
        this._type  = evt.pointerType;
        this.time   = evt.timeNow;
        this.path   = evt.path;
    }
}

/**
 * 事件监听函数模板
 */
export type REventListener = (e: REventData) => void;

/**
 * R gui 节点事件类型
 */
export enum REventTypes {
    up          = 'pointerup',
    down        = 'pointerdown',
    click       = 'pointerclick',
    move        = 'pointermove',
    longTap     = 'longTap',
    dbclick     = 'dbclick',
    multiPointer= 'multipointer',
    wheel       = 'wheel',
    scroll      = 'scroll',
    change      = 'change',
    blur        = 'blur',
    focus       = 'focus'
}

/**
 * 以 PointerID 为区分的事件数据记录
 * * 对 具有相同 pointerID 的 up,down,move 等事件做执行状态记录
 */
export class PointerRecord {
    /**
     * 当前坐标
     */
    public currX: number;
    /**
     * 当前坐标
     */
    public currY: number;
    /**
     * 按下 标识
     */
    public isDown: boolean = false;
    /**
     * 移动 标识
     */
    public isMove: boolean = false;
    /**
     * 点击 有效标识 - move 超出限制后不能响应 click
     */
    public isClickEffective: boolean = false;
    /**
     * 移动起点
     */
    public moveStartX: number = 0;
    /**
     * 移动起点
     */
    public moveStartY: number = 0;
    /**
     * 本次事件 长按事件 延时句柄
     */
    public longTapHandler: number;
    /**
     * 本次事件 长按 标识
     */
    public isLongTap: boolean = false;
    /**
     * 唯一 id
     */
    public readonly pointerID: number;
    /**
     * 是否为主事件
     */
    public readonly isPrimary: boolean;
    constructor(id: number, isPrimary: boolean) {
        this.pointerID  = id;
        this.isPrimary  = isPrimary;
    }
}

/**
 * 节点使用的事件数据
 */
export interface REventData {
    /**
     * 事件 坐标
     */
    x: number;
    /**
     * 事件 坐标
     */
    y: number;
    /**
     * 事件 上一次响应时坐标 - (move， 滚动)
     */
    lastX: number;
    /**
     * 事件 上一次响应时坐标 - (move， 滚动)
     */
    lastY: number;
    /**
     * X 滑动量
     */
    deltaX: number;
    /**
     * Y 滑动量
     */
    deltaY: number;
    /**
     * 事件类型
     */
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    /**
     * 事件类型
     */
    pointerType: REventTypes;
    /**
     * 是否为主事件
     */
    isPrimary: boolean;
    /**
     * 事件 ID
     */
    pointerID: number;
    /**
     * 多点事件数据堆 - 坐标堆
     * * key: 事件ID
     * * value: { x, y } 事件坐标
     */
    pointers: {x: number; y: number; id: number }[];
    /**
     * 事件响应 起始节点
     */
    source: RElement;
    /**
     * 当前事件响应节点
     */
    current: RElement;
    /**
     * 事件路径上的节点
     */
    path: RElement[];
    /**
     * 是否中止事件传播
     */
    stopPropagation: boolean | Function;
    /**
     * 是否阻止事件默认处理
     */
    preventDefault: boolean | Function;
    /**
     * 事件响应事件戳
     */
    timeStamp: number;
    /**
     * 事件响应事件戳
     */
    timeNow: number;
    /**
     * 是否为后处理 - down - up , moveenter - moveleave 等成对事件 失去焦点后处理 up - leave
     */
    isPostprocess: boolean;
    /**
     * 是否仅冒泡，不执行
     */
    isOnlyBubble: boolean;
    /**
     * 事件是否传递到 GUI 外去 <比如另一个3D场景>
     */
    isSendNextLayer: boolean;
}

/**
 * 回收 ListenerList
 */
// tslint:disable-next-line:no-unnecessary-class
export class ListenerListMgr {
    private static list: ListenerList<REventData>[] = [];
    public static create() {
        if (this.list.length) {
            return this.list.pop();
        } else {
            return new ListenerList<REventData>();
        }
    }
    public static recycle(l: ListenerList<REventData>) {
        if (l) {
            l.clear();
            this.list.push(l);
        }
    }
}