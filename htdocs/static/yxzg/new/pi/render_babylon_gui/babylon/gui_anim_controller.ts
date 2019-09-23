// tslint:disable-next-line:no-reference
/// <reference path="../babylon/babylon.d.ts"/>

import { GUI_ANIM_FRAME_TIME, IAnimData } from './gui_anim_base';
import { AnimMath } from './gui_anim_math';
import { GUIPARAMS } from './gui_base';
import { GUICreator, IPiWidgetControl } from './gui_creator';

/**
 * * 使用框架下 全局帧管理器运行动画 效果较差
 */
// tslint:disable-next-line:one-variable-per-declaration
let animDataMap: Map<IAnimData, IAnimData>,
    animLoopTime: any;
    // animLoopTimer: number = 0;

animLoopTime = 0;
animDataMap = new Map();

export const IAnimDataTypes = [
    'width',
    'height',
    'left',
    'top',
    'right',
    'bottom',
    'hCenter',
    'vCenter',
    'alpha',
    'scale',
    'scaleX',
    'scaleY',
    'rotation',
    'rotate',
    'cellId'
];

export const IAnimDataAttrs = [
    'time',
    'isLoop',
    'callBack',
    'control'
];

export const IAnimDataAttrsSpecial = [
    'cellIdSloop'
];

/**
 * 动画参数 从 cfg[0] 到 cfg[1] 为变化的属性值的域，变化过程由 _math 控制， _math 可以为 GUIAnimMath 中函数名称，也可以是自定义的 (x)=>{ return y; } 函数
 *  @param left_cfg:
 *      left:
 *      left_math:
 *  @param top_cfg:
 *      top:
 *      top_math:
 *  @param right_cfg:
 *      right:
 *      right_math:
 *  @param bottom_cfg:
 *      bottom:
 *      bottom_math:
 *  @param hCenter_cfg:
 *      hCenter:
 *      hCenter_math:
 *  @param vCenter_cfg:
 *      vCenter:
 *      vCenter_math:
 *  @param alpha_cfg:
 *      alpha
 *      alpha_math:
 *  @param scale_cfg:
 *      scale:
 *      scale_math:
 *  @param scaleX_cfg:
 *      scaleX:
 *      scaleX_math:
 *  @param scaleY_cfg:
 *      scaleY:
 *      scaleY_math:
 *  @param rotation_cfg:
 *      rotation:
 *      rotation_math:
 *  @param rotate_cfg:
 *      rotate:
 *      rotate_math:
 *  @param cellId_cfg:
 *      cellId:
 *      cellId_math:
 *      更新 cellId 时，Image 内部有自检，先后连续多次更新为相同cellId,只在第一次变化时重新绘制
 *  @param frame_cfg:
 *      frameCfg_math:
 * 
 *  @param isLoop:
 *  @param callBack:
 *  @param control:
 *  @param time:
 *  @param startTime:
 *  @param progress
 * 
 *  调用方法以重新开始动画
 *  @param reStart
 *  调用方法以从帧调用堆中移除动画
 *  @param dispose
 *  调用方法执行回调
 *  @param doCallBack
 * 
 *  标识 是否移除
 *  @param isDisposed
 *  标识 是否调用回调
 *  @param isCallBacked
 *  记录 最近一次动画时间
 *  @param lastTime :
 * 
 */
// tslint:disable-next-line:no-unnecessary-class
export class GUIAnimController {
    /**
     * 初始化，启动动画循环
     */
    // tslint:disable-next-line:function-name
    public static Init() {
        // GUIAnimController.animLoop();

        // animLoopTimer = Date.now();
        // setInterval(GUIAnimController.animLoop);
    }
    /**
     * 添加一个动画运行
     * @param animData v
     */
    public static addAnimData(animData: IAnimData) {

        animDataMap.set(animData, animData);

        animData.startTime = Date.now();
        animData.lastTime = animData.startTime;
        animData.isDisposed = false;
        animData.isCallBacked = false;

        animData.dispose = () => {
            animData.isDisposed = true;
            GUIAnimController.delAnimData(animData);
        };

        animData.doCallBack = () => {
            animData.callBack && animData.callBack();
            animData.isCallBacked = true;
        };

        animData.reStart = () => {
            animData.startTime = Date.now();
        };

        GUIAnimController.computeAnimData(animData);
    }
    /**
     * 移除一个动画的运行
     * @param animData v
     */
    public static delAnimData(animData: IAnimData) {
        animDataMap.delete(animData);
    }
    /**
     * 动画循环
     */
    public static animLoop = () => {

        // if (Date.now() - animLoopTimer >= GUI_ANIM_FRAME_TIME) {

        //     GUIAnimController.computeAnimDatas();

        //     animLoopTimer = Date.now();
        // }

        // if (animLoopTime !== undefined) {
        //     clearTimeout(animLoopTime);
        // }

        // animLoopTime = setTimeout(GUIAnimController.animLoop, GUI_ANIM_FRAME_TIME);

        GUIAnimController.computeAnimDatas();

    }
    /**
     * 计算动画进度
     * @param animData v
     */
    private static computeProgress(animData: IAnimData) {
        let timeProgress: number;

        timeProgress = (Date.now() - animData.startTime) / animData.time;
        timeProgress = timeProgress <= 0 ? 0 : timeProgress;
        timeProgress = timeProgress > 1 ? 1 : timeProgress;

        animData.progress = timeProgress;
    }
    /**
     * 计算属性
     * @param animData v
     * @param key v
     */
    private static computeAttr(animData: IAnimData, key: string) {
        // tslint:disable-next-line:one-variable-per-declaration
        let cfg: number[], mathCfg: Function | any[] | string, math: Function, value: number;

        cfg = animData[`${key}_cfg`];
        mathCfg = animData[`${key}_math`];

        if (cfg !== undefined) {
            
            mathCfg = mathCfg === undefined ? 'line' : mathCfg;

            if (mathCfg instanceof Function) {

                math = mathCfg;
                value = math(animData.progress);
                value = cfg[0] + (cfg[1] - cfg[0]) * value;

            } else if (mathCfg instanceof Array) {

                math = AnimMath.getBezierFunc(mathCfg);
                value = math(animData.progress);
                value = cfg[0] + (cfg[1] - cfg[0]) * value;

            } else {

                if (AnimMath[`${mathCfg}`] !== undefined) {

                    math = AnimMath[`${mathCfg}`];
                    value = math(animData.progress);
                    value = cfg[0] + (cfg[1] - cfg[0]) * value;

                } else {
                    console.warn(`AnimMath 没有该函数: ${mathCfg} .`);
                }

            }

        }

        if (value !== undefined) {
            if (key === 'left' || key === 'top' || key === 'width' || key === 'height') {
                // 计算结果在 0-1， 且原配置 不在 0-1， 则 忽略该 0-1 之间的计算结果，避免属性设置时单位变化
                if (Math.abs(value) <= 1 && (Math.abs(cfg[0]) > 1 || Math.abs(cfg[1]) > 1)) {
                    return;
                }
            }
            animData[`${key}`] = value;
        }
    }

    /**
     * 计算属性列表
     * @param animData v
     */
    private static computeAttrs(animData: IAnimData) {

        IAnimDataTypes.forEach(key => {
            GUIAnimController.computeAttr(animData, key);
        });

        if (animData.cellId !== undefined && animData.cellIdSloop !== true) {
            animData.cellId = Math.round(animData.cellId);
        }

    }
    /**
     * 计算指定动画数据
     * @param animData v
     */
    private static computeAnimData(animData: IAnimData) {

        if (animData.control === undefined) {

            animData.dispose();

        } else {
            GUIAnimController.computeProgress(animData);

            GUIAnimController.computeAttrs(animData);

            const isVisible: boolean = GUIAnimController.checkVisible(animData.control);

            // const widget = (<IPiWidgetControl>(animData.control)).pi_widget;
            // if (isVisible && widget !== undefined && widget.control !== undefined) {
            //     if (!widget.control.isVisible) {
            //         isVisible = false;
            //     }
            // }

            if (isVisible) {
                if (GUIPARAMS.EngineInstance.getFps() >= GUIPARAMS.GUIAnimLimitFPS || (!animData.isLoop && animData.progress === 1)) {
                    GUICreator.setControlAttrsBase(animData.control, { style: animData });
                }
            }

            if (animData.progress === 1) {

                if (animData.isLoop === true) {

                    animData.reStart();

                } else {

                    animData.dispose();
                    animData.doCallBack();

                }

            }
        }

        animData.lastTime = Date.now();
    }
    private static checkVisible(control: BABYLON.GUI.Control) {
        let b = true;
        
        if (!control.isVisible) {
            b = false;
        } else {
            if (control._root && !control._root.isVisible) {
                b = false;
            }
        }

        if (b && control._root) {
            b = GUIAnimController.checkVisible(control._root);
        }
        
        return b;
    }
    /**
     * 计算指定所有动画数据
     */
    private static computeAnimDatas() {
        animDataMap.forEach(data => {
            GUIAnimController.computeAnimData(data);
        });
    }

}