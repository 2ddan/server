/**
 * 
 */// tslint:disable-next-line:no-reference
/// <reference path="../babylon/babylon.d.ts"/>
import { Widget } from '../../widget/widget_gui';

export let GUI_ANIM_FRAME_TIME = 100;

// tslint:disable-next-line = interface-name
export interface IAnimationCfg {
    name : string;
    control? : BABYLON.GUI.Control;
    widget? : Widget;
    animData : IAnimData;
    isActive : boolean;
}

/**
 * 节点动画配置 数据模板
 */
// tslint:disable-next-line:interface-name
export interface IAnimData {
    height_cfg?: number[];
    height?: number;
    height_math?: string | Function | number[];
    width_cfg?: number[];
    width?: number;
    width_math?: string | Function | number[];
    
    left_cfg?: number[];
    left?: number;
    left_math?: string | Function | number[];
    top_cfg?: number[];
    top?: number;
    top_math?: string | Function | number[];
    right_cfg?: number[];
    right?: number;
    right_math?: string | Function | number[];
    bottom_cfg?: number[];
    bottom?: number;
    bottom_math?: string | Function | number[];
    hCenter_cfg?: number[];
    hCenter?: number;
    hCenter_math?: string | Function | number[];
    vCenter_cfg?: number[];
    vCenter?: number;
    vCenter_math?: string | Function | number[];
    alpha_cfg?: number[];
    alpha?: number;
    alpha_math?: string | Function | number[];
    scale_cfg?: number[];
    scale?: number;
    scale_math?: string | Function | number[];
    scaleX_cfg?: number[];
    scaleX?: number;
    scaleX_math?: string | Function | number[];
    scaleY_cfg?: number[];
    scaleY?: number;
    scaleY_math?: string | Function | number[];
    rotation_cfg?: number[];
    rotation?: number;
    rotation_math?: string | Function | number[];
    rotate_cfg?: number[];
    rotate?: number;
    rotate_math?: string | Function | number[];
    cellId_cfg?: number[];
    cellId?: number;
    cellIdSloop?: boolean;
    cellId_math?: string | Function | number[];
    frame_cfg?: number[];
    frameCfg_math?: string | Function | number[];

    isLoop: boolean;
    time: number;
    callBack?: Function;
    control?: BABYLON.GUI.Control | BABYLON.GUI.TextBlock;
    startTime?: number;
    progress?: number;

    reStart?: Function;
    dispose?: Function;
    doCallBack?: Function;

    isDisposed?: boolean;
    isCallBacked?: boolean;
    lastTime?: number;

    stopFlag?: string; 
}
