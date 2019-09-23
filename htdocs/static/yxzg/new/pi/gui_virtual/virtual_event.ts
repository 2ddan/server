import { REventData } from '../gui/r_event_base';
import { VirtualNodeBase } from './virtual_node';
import { Widget } from './widget';

/**
 * 虚拟节点事件属性
 * * PointerEvent
 * * 封装事件: 长按，双击
 */
export class VirtualEvent {
    public pointerdown?: string;
    public pointerup?: string;
    public pointermove?: string;
    public pointerclick?: string;
    public longtap?: string;
    public dbclick?: string;
    public notify?: Object;
}

export interface VEventAttr { 
    mousedown?: VEventAttrData;
}

export interface VEventAttrData { 
    interval: number; 
    stop: boolean; 
    nextTime: number; 
}

/**
 * R gui 事件数据
 */
export interface VEventData extends REventData {
    /**
     * 用户数据
     */
    userData: any;
    /**
     * 当前虚拟节点
     */
    node: VirtualNodeBase;
    srcNode: VirtualNodeBase;
    widget: Widget;
    srcWidget: Widget;
    /**
     * 事件时间戳
     */
    timeStamp: number;
}