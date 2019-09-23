// tslint:disable-next-line:no-reference
/// <reference path="../babylon/babylon.d.ts"/>

import { BeforeInitTools } from '../babylon/beforeInit';
import { FormatCanvasDisplay } from './format_canvas_display';
import { GUIPARAMS } from './gui_base';

// canvas 事件属性列表 - ( 搜索 babylon.max.js )
const attrList = ['type', 'pointerId', 'button', 'pointerType', 'target', 'srcElement',
    'movementX', 'mozMovementX', 'webkitMovementX', 'msMovementX',
    'movementY', 'mozMovementY', 'webkitMovementY', 'msMovementY',
    'keyCode', 'ctrlKey',
    'sourceEvent', 'gamepad', 'alpha', 'beta', 'gamma'
];

// canvas 事件方法属性列表 - ( 搜索 babylon.max.js )
const funcList: string[] = ['preventDefault'];
// 是否在 Dom 环境中运行
let flagRunInDom: boolean = false;

let _canvas: HTMLCanvasElement;

const PointerEventMap  = {
    down: [],
    move: [],
    up: []
};

// tslint:disable-next-line:interface-name
export interface IPISceneEventInfo {
    DownPoint: BABYLON.Vector2;
    UpPoint: BABYLON.Vector2;
    MovePoint: BABYLON.Vector2;
    isMoveAction: boolean;
    view:any;
}

// tslint:disable-next-line:interface-name
export interface IPISceneWithEventInfo {
    PI_SceneEventInfo: IPISceneEventInfo;
} 

/**
 * 标准化事件响应的方法类
 */
// tslint:disable-next-line:no-unnecessary-class
export class FormatEvent {
    public static DisplayRect: { x: number; y: number; width: number; height: number; left: number; top: number; right: number; bottom: number };
    public static format(canvas: HTMLCanvasElement, scene: BABYLON.Scene, engine: BABYLON.Engine) {

        FormatEvent.formatWay1(canvas, scene, engine);
        // formatWay2(  canvas, scene, engine  );

    }
    /**
     * 标识 babylon 在 Dom 结构中运行
     */
    public static setFlagRunInDom() {
        flagRunInDom = true;
    }
    /**
     * 标准化方法1
     * @param canvas v
     * @param scene v
     * @param engine v
     */
    // tslint:disable-next-line:max-func-body-length
    private static formatWay1(canvas: HTMLCanvasElement, scene: BABYLON.Scene, engine: BABYLON.Engine) {

        const _scene = <any>scene;

        const oldUp = _scene._onPointerUp,
            oldDown = _scene._onPointerDown,
            oldMove = _scene._onPointerMove;

        const DownPoint: BABYLON.Vector2    = new BABYLON.Vector2(0,0);
        const UpPoint: BABYLON.Vector2      = new BABYLON.Vector2(0,0);
        const MovePoint: BABYLON.Vector2    = new BABYLON.Vector2(0,0);

        const info: IPISceneEventInfo = {
            DownPoint,
            UpPoint,
            MovePoint,
            isMoveAction: false,
            view:undefined
        };

        (<IPISceneWithEventInfo>_scene).PI_SceneEventInfo = info;

        const eventPrefix = BABYLON.Tools.GetPointerPrefix();

        _canvas = canvas;

        canvas.removeEventListener(`${eventPrefix}move`, oldMove);
        canvas.removeEventListener(`${eventPrefix}down`, oldDown);
        window.removeEventListener(`${eventPrefix}up`, oldUp);

        // engine.setHardwareScalingLevel(1 / EngineArgs.HardwareScalingLevel);

        // 改造 engine 获取到的 cavas 显示矩形范围
        engine.getRenderingCanvasClientRect = () => {
            if (!(<any>engine)._renderingCanvas) {
                return null;
            }

            return FormatEvent.getBoundingClientRect_();
            // return getBoundingClientRect2();
        };

        // Wheel
        _scene._onPointerUp = (evt: PointerEvent) => {

            let e;

            const info = (<IPISceneWithEventInfo>_scene).PI_SceneEventInfo;
            if (info.view === undefined) {
                info.view = evt.view;
            }

            // if (!evt.view) return;
            if (info.view !== evt.view) return;

            e = FormatEvent.formatTransEvent_(evt);
            // console.log(name);

            UpPoint.x = e.clientX;
            UpPoint.y = e.clientY;

            DownPoint.x = 0;
            DownPoint.y = 0;

            MovePoint.x = 0;
            MovePoint.y = 0;

            oldUp(e);

        };

        _scene._onPointerDown = (evt: PointerEvent) => {

            let e;

            const info = (<IPISceneWithEventInfo>_scene).PI_SceneEventInfo;
            if (info.view === undefined) {
                info.view = evt.view;
            }
            // if (!evt.view) {
            //     alert(evt.view);

            //     return;
            // }

            if (info.view !== evt.view) return;

            e = FormatEvent.formatTransEvent_(evt);
            // console.log(name);

            DownPoint.x = e.clientX;
            DownPoint.y = e.clientY;

            MovePoint.x = e.clientX;
            MovePoint.y = e.clientY;

            (<IPISceneWithEventInfo>_scene).PI_SceneEventInfo.isMoveAction = false;

            oldDown(e);

        };

        _scene._onPointerMove = (evt: PointerEvent) => {

            let e;
            const info = (<IPISceneWithEventInfo>_scene).PI_SceneEventInfo;
            if (info.view === undefined) {
                info.view = evt.view;
            }

            // if (!evt.view) return;

            if (info.view !== evt.view) return;

            e = FormatEvent.formatTransEvent_(evt);

            // console.log(name);

            if (Math.abs(MovePoint.x - e.clientX) > GUIPARAMS.Motion_Check_Distance
                || Math.abs(MovePoint.y - e.clientY) > GUIPARAMS.Motion_Check_Distance) {

                MovePoint.x = e.clientX;
                MovePoint.y = e.clientY;

                (<IPISceneWithEventInfo>_scene).PI_SceneEventInfo.isMoveAction = true;

                oldMove(e);
            }

        };

        canvas.addEventListener(`${eventPrefix}move`, _scene._onPointerMove);
        // Whee
        canvas.addEventListener(`${eventPrefix}down`, _scene._onPointerDown, false);

        canvas.addEventListener(`${eventPrefix}up`, _scene._onPointerUp, false);
    
        document.body.addEventListener(`touchmove`, (event: PointerEvent) => {
            if (event.view) return;
            event.preventDefault();
        }, { passive: false });
    }
    // private static down(evt) {

    // }
    // private static up(evt) {
        
    // }
    // private static move(evt) {
        
    // }
    /**
     * 标准化方法 2
     * @param canvas v
     * @param scene v
     * @param engine v
     */
    // private static formatWay2(canvas: any, scene: BABYLON.Scene, engine: BABYLON.Engine) {

    //     const _scene = <any>scene;

    //     const oldUp = _scene._onPointerUp,
    //         oldDown = _scene._onPointerDown,
    //         oldMove = _scene._onPointerMove;

    //     const eventPrefix = BABYLON.Tools.GetPointerPrefix();

    //     canvas.removeEventListener(`${eventPrefix}move`, oldMove);
    //     canvas.removeEventListener(`${eventPrefix}down`, oldDown);
    //     window.removeEventListener(`${eventPrefix}up`, oldUp);

    //     // engine.setHardwareScalingLevel(  getRootScale() );

    //     // 改造 engine 获取到的 cavas 显示矩形范围
    //     engine.getRenderingCanvasClientRect = () => {
    //         if (!(<any>engine)._renderingCanvas) {
    //             return null;
    //         }

    //         // return getBoundingClientRect();
    //         return FormatEvent.getBoundingClientRect2();
    //     };

    //     // (Tese 02)
    //     // let oldRootPICK = host._rootContainer._processPicking.bind(host._rootContainer);
    //     // host._rootContainer._processPicking = function (x, y, type, pointerId, buttonIndex) {
    //     //     oldRootPICK(x / FormatCanvasDisplay.getRootScale(), y / FormatCanvasDisplay.getRootScale(), type, pointerId, buttonIndex);
    //     // };

    //     // Wheel
    //     _scene._onPointerUp = (evt) => {

    //         let e;

    //         e = FormatEvent.formatTransEvent2(evt);

    //         oldUp(e);

    //     };

    //     _scene._onPointerDown = (evt) => {

    //         let e;

    //         e = FormatEvent.formatTransEvent2(evt);

    //         oldDown(e);

    //     };

    //     _scene._onPointerMove = (evt) => {

    //         let e;

    //         e = FormatEvent.formatTransEvent2(evt);

    //         oldMove(e);

    //     };

    //     canvas.addEventListener(`${eventPrefix}move`, _scene._onPointerMove, false);
    //     // Whee
    //     canvas.addEventListener(`${eventPrefix}down`, _scene._onPointerDown, false);

    //     window.addEventListener(`${eventPrefix}up`, _scene._onPointerUp, false);

    //     // 屏蔽浏览器环境菜单
    //     canvas.addEventListener('contextmenu', (e) => {
    //         e.preventDefault();
    //     });

    // }

    /**
     * 修改 事件 (Tese 01)
     * @param evt 原事件
     */
    // private static formatTransEvent(evt: PointerEvent) {
    //     const e: any = {}, rect: any = FormatEvent.getBoundingClientRect();
    //     // let parentClientX: number, parentClientY: number;

    //     // if (flagRunInDom) {
    //     //     parentClientX = evt.clientX ;
    //     //     parentClientY = evt.clientY ;
    //     // } else {
    //     //     parentClientX = evt.clientX ;
    //     //     parentClientY = evt.clientY ;
    //     // }

    //     // 处理旋转 (顺时针90)
    //     // if (FormatCanvasDisplay.getIsRotate()) {
    //     //     e.clientX = parentClientY;
    //     //     e.clientY = FormatCanvasDisplay.getClientW() - parentClientX;
    //     // } else {
    //     //     e.clientX = parentClientX;
    //     //     e.clientY = parentClientY;
    //     // }
        
    //     e.clientX = evt.clientX / FormatCanvasDisplay.getDeviceViewScale();
    //     e.clientY = evt.clientY / FormatCanvasDisplay.getDeviceViewScale();

    //     // 处理缩放, x 方向 点击进入 canvas 范围
    //     if (e.clientX > rect.x) {
    //         // 处理缩放, x 方向 点击超出 canvas 范围
    //         if (e.clientX > rect.x + rect.width * FormatCanvasDisplay.getRootScaleW()) {
    //             e.clientX = rect.width + (e.clientX - rect.width * FormatCanvasDisplay.getRootScaleW());
    //         } else {
    //             e.clientX = rect.x + (e.clientX - rect.x) / FormatCanvasDisplay.getRootScaleW() * GUIPARAMS.HardwareScalingLevel;
    //         }
    //     }

    //     // 处理缩放, y 方向 点击进入 canvas 范围
    //     if (e.clientY > rect.y) {
    //         // 处理缩放, y 方向 点击超出 canvas 范围
    //         if (e.clientY > rect.y + rect.height * FormatCanvasDisplay.getRootScale()) {
    //             e.clientY = rect.height + (e.clientY - rect.height * FormatCanvasDisplay.getRootScale());
    //         } else {
    //             e.clientY = rect.y + (e.clientY - rect.y) / FormatCanvasDisplay.getRootScale() * GUIPARAMS.HardwareScalingLevel;
    //         }
    //     }

    //     // 握住原生事件
    //     FormatEvent.recordEventAttr(evt, e);

    //     return e;
    // }

    /**
     * 修改 事件 (Tese 01)
     * @param evt 原事件
     */
    private static formatTransEvent_(evt: PointerEvent) {
        const e: any = {};
        [e.clientX, e.clientY] = [evt.clientX, evt.clientY];

        if (FormatCanvasDisplay.getIsRotate() && !FormatCanvasDisplay.getIsWXGame()) {
            [e.clientX, e.clientY] = [e.clientY, FormatCanvasDisplay.getDeviceHeight() - e.clientX];
        }
        
        e.clientX = e.clientX / FormatCanvasDisplay.getDeviceViewScale() - FormatCanvasDisplay.getContentDisplayLeft();
        e.clientY = e.clientY / FormatCanvasDisplay.getDeviceViewScale() - FormatCanvasDisplay.getContentDisplayTop();

        e.clientX = e.clientX * GUIPARAMS.HardwareScalingLevel;
        e.clientY = e.clientY * GUIPARAMS.HardwareScalingLevel;

        // // 处理缩放, x 方向 点击进入 canvas 范围
        // if (e.clientX > FormatCanvasDisplay.getContentDisplayLeft()) {
        //     // 处理缩放, x 方向 点击超出 canvas 范围
        //     if (e.clientX > rect.x + rect.width) {
        //         e.clientX = e.clientX;
        //     } else {
        //         e.clientX = rect.x + (e.clientX - rect.x) / FormatCanvasDisplay.getRootScaleW() * GUIPARAMS.HardwareScalingLevel;
        //     }
        // }

        // // 处理缩放, y 方向 点击进入 canvas 范围
        // if (e.clientY > rect.y) {
        //     // 处理缩放, y 方向 点击超出 canvas 范围
        //     if (e.clientY > rect.y + rect.height * FormatCanvasDisplay.getRootScale()) {
        //         e.clientY = rect.height + (e.clientY - rect.height * FormatCanvasDisplay.getRootScale());
        //     } else {
        //         e.clientY = rect.y + (e.clientY - rect.y) / FormatCanvasDisplay.getRootScale() * GUIPARAMS.HardwareScalingLevel;
        //     }
        // }

        // 握住原生事件
        FormatEvent.recordEventAttr(evt, e);

        return e;
    }

    /**
     * 另一种 修改事件 的测试 (Tese 02)
     * @param evt 原事件
     */
    // private static formatTransEvent2(evt: PointerEvent) {
    //     const e: any = {};
    //     const rect = FormatEvent.getBoundingClientRect();

    //     // 处理旋转 (顺时针90)
    //     if (FormatCanvasDisplay.getIsRotate()) {
    //         e.clientX = evt.clientY;
    //         e.clientY = FormatCanvasDisplay.getClientW() - evt.clientX;
    //     } else {
    //         e.clientX = evt.clientX;
    //         e.clientY = evt.clientY;
    //     }

    //     // 握住原生事件
    //     FormatEvent.recordEventAttr(evt, e);

    //     return e;
    // }

    /**
     * 复制事件信息
     * @param evt 原事件
     * @param e 新事件
     */
    private static recordEventAttr(evt: PointerEvent, e: PointerEvent) {

        attrList.forEach(key => {
            e[key] = evt[key];
        });

        funcList.forEach(key => {
            e[key] = evt[key];

            e[key] = () => {
                evt[key]();
            };

        });
    }

    /**
     * 自定义 canvas 范围, 处理 canvas 旋转和缩放 产生的变化
     * 
     *  背景：
     *      事件捕获使用的坐标： 
     *          事件在 UI 上的坐标, 对全屏UI 而言 即在 canvas 内部的 ( x, y )  )
     * 
     *      pos0    缩放的canvas上的坐标
     *      diffPos 实际canvas上的坐标
     *      联系： pos0  = diffPos * 缩放比例
     * 
     *      GUI 使用 pos0 在 缩放后大小 区域 进行事件捕获
     * 
     *      GUI 内部计算 pos0:  clientX - canvas.left = pos0.x
     *                         clientY - canvas.top  = pos0.y
     * 
     *  目标:  使得计算出的 pos0 的值等于 diffPos
     * 
     *  方案:  改造 clientX， canvas.left,  clientY， canvas.top 
     * 
     *  
     */
    // private static getBoundingClientRect() {
    //     if (FormatCanvasDisplay.getIsRotate()) {
    //         if (FormatCanvasDisplay.getIsWeixinGAME()) {
    //             return {
    //                 x: 0,
    //                 y: 0,
    //                 left: 0,
    //                 top: 0,
    //                 right: FormatCanvasDisplay.getRootW(),
    //                 bottom: FormatCanvasDisplay.getRootH() + 0,
    //                 width: FormatCanvasDisplay.getRootW(),
    //                 height: FormatCanvasDisplay.getRootH()
    //             };
    //         } else {
    //             return {
    //                 x: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayW()) / 2,
    //                 y: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayH()) / 2,
    //                 left: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayW()) / 2,
    //                 top: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayH()) / 2,
    //                 right: (FormatCanvasDisplay.getClientH() + FormatCanvasDisplay.getRootW()) / 2,
    //                 bottom: (FormatCanvasDisplay.getClientW() + FormatCanvasDisplay.getRootH()) / 2,
    //                 width: FormatCanvasDisplay.getRootW(),
    //                 height: FormatCanvasDisplay.getRootH()
    //             };
    //         }
    //     } else {
    //         if (FormatCanvasDisplay.getIsWeixinGAME()) {
    //             return {
    //                 x: 0,
    //                 y: 0,
    //                 left: 0,
    //                 top: 0,
    //                 right: FormatCanvasDisplay.getRootW(),
    //                 bottom: FormatCanvasDisplay.getRootH() + 0,
    //                 width: FormatCanvasDisplay.getRootW(),
    //                 height: FormatCanvasDisplay.getRootH()
    //             };
    //         } else {
    //             return {
    //                 x: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayW()) / 2,
    //                 y: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayH()) / 2,
    //                 left: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayW()) / 2,
    //                 top: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayH()) / 2 ,
    //                 right: (FormatCanvasDisplay.getClientW() + FormatCanvasDisplay.getRootW()) / 2,
    //                 bottom: (FormatCanvasDisplay.getClientH() + FormatCanvasDisplay.getRootH()) / 2,
    //                 width: FormatCanvasDisplay.getRootW(),
    //                 height: FormatCanvasDisplay.getRootH()
    //             };
    //         }
    //     }
    // }

    /**
     * 简单处理 canvas 旋转 产生的变化
     */
    // private static getBoundingClientRect2() {
    //     if (FormatCanvasDisplay.getIsRotate()) {
    //         return {
    //             x: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayW()) / 2,
    //             y: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayH()) / 2,
    //             left: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayW()) / 2,
    //             top: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayH()) / 2,
    //             right: (FormatCanvasDisplay.getClientH() + FormatCanvasDisplay.getDisplayW()) / 2,
    //             bottom: (FormatCanvasDisplay.getClientW() + FormatCanvasDisplay.getDisplayH()) / 2,
    //             width: FormatCanvasDisplay.getDisplayW(),
    //             height: FormatCanvasDisplay.getDisplayH()
    //         };
    //     } else {
    //         return {
    //             x: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayW()) / 2,
    //             y: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayH()) / 2,
    //             left: (FormatCanvasDisplay.getClientW() - FormatCanvasDisplay.getDisplayW()) / 2,
    //             top: (FormatCanvasDisplay.getClientH() - FormatCanvasDisplay.getDisplayH()) / 2,
    //             right: (FormatCanvasDisplay.getClientW() + FormatCanvasDisplay.getDisplayW()) / 2,
    //             bottom: (FormatCanvasDisplay.getClientH() + FormatCanvasDisplay.getDisplayH()) / 2,
    //             width: FormatCanvasDisplay.getDisplayW(),
    //             height: FormatCanvasDisplay.getDisplayH()
    //         };
    //     }
    // }
    private static getBoundingClientRect_() {
        if (!FormatEvent.DisplayRect) {
            FormatEvent.DisplayRect = {    
                x: 0,
                y: 0,
                left: 0,
                top: 0,
                right: FormatCanvasDisplay.getContentDisplayWidth() + 0,
                bottom: FormatCanvasDisplay.getContentDisplayHeight() + 0,
                width: FormatCanvasDisplay.getContentDisplayWidth(),
                height: FormatCanvasDisplay.getContentDisplayHeight()
            };
        }

        return FormatEvent.DisplayRect;
    }

}