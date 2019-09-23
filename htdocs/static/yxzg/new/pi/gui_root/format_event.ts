/**
 * 项目事件预处理
 * * 主 canvas 添加事件监听
 * * 此处响应主canvas事件，并向各监听器分发
 * * 其他渲染内容的事件需在此注册监听
 */

import { FormatCanvasDisplay } from './format_canvas_display';

// tslint:disable-next-line:no-unnecessary-class
export class FormatEvent {
    private static downListener: ((e: PointerEvent) => void)[] = [];
    private static upListener: ((e: PointerEvent) => void)[] = [];
    private static moveListener: ((e: PointerEvent) => void)[] = [];
    private static wheelListener: ((e: WheelEvent) => void)[] = [];
    // canvas 事件属性列表 - ( 搜索 babylon.max.js )
    private static attrList: string[] = ['type', 'pointerId', 'button', 'pointerType', 'target', 'srcElement', 'isPrimary',
        'movementX', 'mozMovementX', 'webkitMovementX', 'msMovementX',
        'movementY', 'mozMovementY', 'webkitMovementY', 'msMovementY',
        'keyCode', 'ctrlKey', 'deltaX', 'deltaY', 'deltaMode',
        'sourceEvent', 'gamepad', 'alpha', 'beta', 'gamma'
    ];
    // canvas 事件方法属性列表 - ( 搜索 babylon.max.js )
    private static funcList: string[] = ['preventDefault'];
    private static canvas: HTMLCanvasElement;

    public static format(canvas: HTMLCanvasElement) {
        FormatEvent.canvas = canvas;

        canvas.addEventListener(`pointermove`, FormatEvent.move);
        canvas.addEventListener(`pointerdown`, FormatEvent.down, false);
        window.addEventListener(`pointerup`,   FormatEvent.up, false);

        try {
            canvas.addEventListener(`wheel`, this.wheel, false); 
        } catch {
            //
        }
        
        document.body.addEventListener(`touchmove`, (event: PointerEvent) => {
            if (event.view) return;
            event.preventDefault();
        }, { passive: false });
        
        // 屏蔽浏览器环境菜单
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

    }
    public static addDownListener(f: (e: PointerEvent) => void) {
        if (this.downListener.indexOf(f) < 0) {
            this.downListener.push(f);
        }
    }
    public static addUpListener(f: (e: PointerEvent) => void) {
        if (this.upListener.indexOf(f) < 0) {
            this.upListener.push(f);
        }
    }
    public static addMoveListener(f: (e: PointerEvent) => void) {
        if (this.moveListener.indexOf(f) < 0) {
            this.moveListener.push(f);
        }
    }
    public static addWheelListener(f: (e: WheelEvent) => void) {
        if (this.wheelListener.indexOf(f) < 0) {
            this.wheelListener.push(f);
        }
    }

    private static down = (ev: PointerEvent) => {
        try {
            const evt = FormatEvent.formatTransEvent_(ev);

            // evt.pointerId = FormatEvent._totalPointersPressed;
            FormatEvent.downListener.forEach(f => {
                f(evt);
            });

        } catch (e) {
            // alert(e);
        }

        ev.preventDefault();
    }
    private static up = (ev: PointerEvent) => {
        try {
            const evt = FormatEvent.formatTransEvent_(ev);
            // 
            FormatEvent.upListener.forEach(f => {
                f(evt);
            });
        } catch (e) {
            // alert(e);
        }
        
        ev.preventDefault();
    }
    private static move = (ev: PointerEvent) => {
        try {
            const evt = FormatEvent.formatTransEvent_(ev);
            // 
            FormatEvent.moveListener.forEach(f => {
                f(evt);
            });
        } catch (e) {
            // alert(e);
        }
        
        ev.preventDefault();
    }
    private static wheel = (ev: WheelEvent) => {
        try {
            const evt = FormatEvent.formatTransEvent_(ev);
            // 
            FormatEvent.wheelListener.forEach(f => {
                f(evt);
            });
        } catch (e) {
            // alert(e);
        }
        
        ev.preventDefault();
    }
    private static translatePoint(x: number, y: number) {
        if (FormatCanvasDisplay.getIsRotate()) {
            [x, y] = [y, FormatCanvasDisplay.getDeviceHeight() - x];
        }

        x /= FormatCanvasDisplay.getDeviceViewScale();
        y /= FormatCanvasDisplay.getDeviceViewScale();

        return [x, y];
    } 
    
    /**
     * 修改 事件 (Tese 01)
     * @param evt 原事件
     */
    private static formatTransEvent_(evt: PointerEvent | WheelEvent) {
        const e: any = {};

        [e.clientX, e.clientY] = this.translatePoint(evt.clientX, evt.clientY);

        // 握住原生事件
        FormatEvent.recordEventAttr(evt, e);

        return e;
    }

    /**
     * 复制事件信息
     * @param evt 原事件
     * @param e 新事件
     */
    private static recordEventAttr(evt: PointerEvent | WheelEvent, e: PointerEvent) {

        this.attrList.forEach(key => {
            e[key] = evt[key];
        });

        this.funcList.forEach(key => {
            e[key] = () => {
                evt[key]();
            };

        });
    }
}

let div: HTMLDivElement;
const log  = (arg) => {
    if (!div) {
        div = document.createElement('div');
        document.body.appendChild(div);
        div.style.cssText = 'position:absolute;color:#ff0;top: 200px;z-index:-100;';
    }

    div.innerText = typeof arg === 'string' ? arg :  JSON.stringify(arg);
};