/**
 * GUI 节点 CSS 动画数据结构
 */

import { RElement } from './r_element';
import { AnimationCmd, IEnumTransformData, ILengthData, ILengthVector2, StyleMap, Tools } from './tools';

/**
 * 解析动画配置
 */
export class Animation implements IAnimation {
    /**
     * 动画数据名称
     */
    public readonly name: string;
    /**
     * 动画 各属性变化帧数据
     */
    public readonly attrs: AttrFrames[];
    public _from: number;
    public _to: number;
    constructor(name: string) {
        this.name = name;
        this.attrs = [];
    }
}

/**
 * 动画数据配置
 * 
 */
// tslint:disable-next-line:interface-name
export interface IAnimation {
    /**
     * 动画数据名称
     */
    name: string;
    /**
     * 动画 各属性变化帧数据
     */
    attrs: AttrFrames[];
}

export class RuntimeAnimation {
    // 组件配置里获取
    public readonly animaCfg: Animation;
    /**
     * 动画时长
     */
    public readonly totalTime: number;
    /**
     * 动画名称
     */
    public readonly name: string;
    /**
     * 已运行时间
     */
    public runedTime: number = 0;
    /**
     * 开始时间
     */
    public startTime: number = 0;
    /**
     * 动画时长
     */
    public duration: number = 0;
    /**
     * 动画进行时函数
     */
    public timingFunction: string = 'linear';
    /**
     * 动画延时执行
     */
    public delayTime: number = 0;
    /**
     * 重复次数
     */
    public iteration: number = 1;
    /**
     * 播放模式
     */
    public direction: string = 'normal';
    /**
     * 结束时状态
     */
    public fillMode: 'none' | 'forwards' | 'backwards' | 'both' = 'none';
    /**
     * 目标属性列表
     */
    public attrKeysList: string[] = [];
    /**
     * 动画开始前状态
     */
    public stateBefore: Map<string, KeyFrameData> = new Map();
    /**
     * 当前状态
     */
    public stateRuntime: Map<string, KeyFrameData> = new Map();
    /**
     * 当前进行次数
     */
    public runtimeCount: number = 0;
    /**
     * 动画开始的注入
     */
    public startListenerHook: (aname: string) => void;
    /**
     * 动画开始时监听
     */
    public startListener: (aname: string) => void;
    /**
     * 动画一次循环结束时监听
     */
    public iteratListener: (aname: string, loopTime: number) => void;
    /**
     * 动画完全结束时监听
     */
    public endListener: (aname: string) => void;
    /**
     * 动画完全结束时的注入
     */
    public endListenerHook: (aname: string) => void;
    constructor(name: string, cfg: Animation, totalTime: number) {
        this.name       = name;
        this.animaCfg   = cfg;
        this.totalTime  = totalTime;
        this.duration   = totalTime;

        this.animaCfg.attrs.forEach(v => {
            this.attrKeysList.push(v.key);
        });
    }
}
/**
 * 目标节点动画表
 */
export class Animatable {
    public target: RElement;
    public animations: Map<string, RuntimeAnimation>;
    public delayTime: number;
    public lastTime: number;
    public startTime: number;
    constructor(target: RElement) {
        this.target = target;
        this.animations = new Map();
    }
    public reset(target: RElement) {
        this.target     = target;
        this.delayTime  = undefined;
        this.lastTime   = undefined;
        this.startTime  = undefined;
        this.animations.clear();
    }
    public clear() {
        this.target     = undefined;
        this.delayTime  = undefined;
        this.lastTime   = undefined;
        this.startTime  = undefined;
        this.animations.clear();
    }
    /**
     * 添加动画
     * @param anime 运行时动画数据
     */
    public add(anime: RuntimeAnimation) {
        this.animations.set(anime.name, anime);
        anime.startListener     = this.target.style.animStart;
        anime.iteratListener    = this.target.style.animLoop;
        anime.endListener       = this.target.style.animEnd;
    }
    /**
     * 移除动画
     * @param anime 运行时动画数据
     */
    public remove(anime: RuntimeAnimation) {
        this.animations.delete(anime.name);
    }
    /**
     * 移除动画
     * @param anime 运行时动画名称
     */
    public removeByName(animeName: string) {
        this.animations.delete(animeName);
    }
}

/**
 * 目标属性数据
 */
export type KeyFrameData = string | number | ILengthData | ILengthVector2 | IEnumTransformData;

/**
 * 目标帧位置
 */
export type IProgress  = number;
/**
 * 属性名称
 */
export type IDataKey   = string;
/**
 * 目标帧数据：
 */
export type IKeyFrameCfg  = [IProgress, KeyFrameData];

/**
 * 目标属性的帧数据
 * * 配置数据，用于初始化运行时动画
 */
export class AttrFrames implements IAttrFrames {
    public readonly key: string;
    public data: IKeyFrameCfg[];
    constructor(key: string) {
        this.key = key;
    }
}

/**
 * 帧数据内各属性数据结构
 */
// tslint:disable-next-line:interface-name
export interface IAttrFrames {
    key: string;
    data: IKeyFrameCfg[];
}

/**
 * 运行时动画帧数据结构
 */
export class RuntimeKeyFrame {
    public progress: number;
    public dataKey: string;
    public dataValue: KeyFrameData;
    constructor(progress: number, key: string, value: KeyFrameData) {
        this.progress   = progress;
        this.dataKey    = key;
        this.dataValue  = value;
    }
}
/**
 * 动画播放模式枚举
 */
export enum DirectionTypes {
    normal = 'normal',
    reverse = 'reverse',
    alternate = 'alternate',
    alternate_reverse = 'alternate-reverse'
}

/**
 * 动画显式支持的目标属性表
 */
export const FrameClassKeys = {
    transform : StyleMap.transform,
    opacity : StyleMap.opacity,
    left : StyleMap.left,
    top : StyleMap.top,
    cellId : 'cellId'
};

/**
 * GUI 节点 CSS 动画运行时数据操作工具
 */
// tslint:disable-next-line:no-unnecessary-class
export class AnimeTools {
    /**
     * 拷贝帧数据
     * @param key 属性名
     * @param frameData 帧数据
     */
    public static cloneAttrFrame(key: string, frame: KeyFrameData): KeyFrameData {
        let value: KeyFrameData;
        switch (key) {
            case (FrameClassKeys.transform): {
                value = Tools.copyEnumTransformData(<IEnumTransformData>frame);
                break;
            }
            case (FrameClassKeys.left):
            case (FrameClassKeys.top): {
                value = Tools.copyLengthData(<ILengthData>frame);
                break;
            }
            case (FrameClassKeys.opacity):
            case (FrameClassKeys.cellId):
            default: {
                value = frame;
            }
        }

        return value;
    }
    /**
     * 两个数据中线性取中间数据
     * @param key 属性名称
     * @param comparePercent 百分比
     * @param lastFrame 起点数据
     * @param nextFrame 终点数据
     */
    public static mixFrameData(key: string, comparePercent: number, lastFrame: KeyFrameData, nextFrame: KeyFrameData) {
        let currFrame: KeyFrameData;
        switch (key) {
            case (FrameClassKeys.transform): {
                currFrame = Tools.mixEnumTransformData(comparePercent, <IEnumTransformData>lastFrame, <IEnumTransformData>nextFrame);
                break;
            }
            case (FrameClassKeys.left):
            case (FrameClassKeys.top): {
                currFrame = Tools.mixILengthData(comparePercent, <ILengthData>lastFrame, <ILengthData>nextFrame);
                break;
            }
            case (FrameClassKeys.opacity): {
                currFrame   = <number>lastFrame +  (<number>nextFrame - <number>lastFrame) * comparePercent;
                currFrame   = Tools.clipFloat(currFrame);
                break;
            }
            case (FrameClassKeys.cellId):
            default: {
                currFrame   = <number>lastFrame +  (<number>nextFrame - <number>lastFrame) * comparePercent;
                currFrame   = Tools.clipInt(currFrame);
            }
        }

        return currFrame;
    }
    /**
     * 构建运行时动画
     * @param cmd 动画运行命令
     * @param cfg 动画帧数据
     */
    public static initRuntimeAnimation(cmd: AnimationCmd, cfg: Animation) {
        
        // 创建新 运行时动画
        const runtimeAnimation = new RuntimeAnimation(cmd.name, cfg, cmd.duration);

        // 设置 运行时动画参数
        runtimeAnimation.delayTime      = cmd.delayTime;
        runtimeAnimation.direction      = cmd.direction;
        runtimeAnimation.fillMode       = cmd.fillMode;
        runtimeAnimation.timingFunction = cmd.timingFunction;
        runtimeAnimation.iteration      = cmd.iteration;

        return runtimeAnimation;
    }
}