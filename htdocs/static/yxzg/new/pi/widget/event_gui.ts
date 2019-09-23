/** 
 * 事件处理模块
 * 提供在节点的事件上直接声明简单函数调用，简单函数还可以是抛出自定义事件的$notify函数
 * 将5种手势事件（单击tap、双击dbltap、长按longtap、移动move(挥swipe)、旋转缩放rotsal(rotote scale)）代码集成进来，作为引擎提供的本地事件，检测平台，模拟缺失平台的事件
 * 挥的判断是：touchend离开时间减去最后一次touchmove移动时间小于规定的值，并且最后一次移动的速度超过规定的速度
 * 
 * 事件支持直接调用widget组件上的方法，和notify方法。
 * 如果是简单字符串就认为是无参数方法。
 */

// ============================== 导入
import { Widget } from './widget_gui';

// ============================== 导出
// tslint:disable-next-line:interface-name
export interface IEvent {
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    srcWidget: Widget;
    widget: Widget;
    data?: any;
}

/**
 * @description 处理器返回值
 */
export enum HandlerResult {
    OK = 0, // ok
    REMOVE_SELF, // 从处理器列表删除自身，以后不会收到事件
    BREAK_OK, // 结束此次事件调用，不继续调用处理器
    BREAK_REMOVE_SELF // 结束此次事件调用，不继续调用处理器，从处理器列表删除自身，以后不会收到事件
}

/**
 * @description 沿节点树，通知节点上的事件监听器
 * @example
 */
export const notify = (widget: Widget, eventType: string, data: any): void => {
    let e: IEvent;

    e = { type: eventType, srcWidget: widget, widget: widget, data: data };

    notifyLoop(widget, e);

};

/**
 * @description 沿节点树，通知节点上的事件监听器
 * @example
 */
const notifyLoop = (widget: Widget, e: IEvent): void => {
    
    if (e !== undefined) {

        e.widget = widget;

    }

    while (widget) {

        e.widget = widget;

        const listener = widget.guiEventMap.get(e.type);

        if (listener) {

            const r = listener(e);

            switch (r) {
                case (HandlerResult.OK): {
                    widget = (<any>(<Widget>widget).control.parent).pi_widget;
                    break;
                }
                case (HandlerResult.BREAK_OK): {

                    widget = undefined;
                    break;
                }
                case (HandlerResult.REMOVE_SELF): {

                    widget.guiEventMap.delete(e.type);

                    widget = (<any>(<Widget>widget).control.parent).pi_widget;
                    break;
                }
                case (HandlerResult.BREAK_REMOVE_SELF): {

                    widget.guiEventMap.delete(e.type);

                    widget = undefined;
                    break;
                }
                default: {
                    return;
                }
            }

        } else {

            widget = (<any>(<Widget>widget).control.parent).pi_widget;

        }
        
    }
};
