
/**
 * GUI CSS 动画循环
 * * 每个 gui 帧执行一次
 * * 遍历记录的节点表
 * * 遍历各节点的动画表
 * * 遍历各节点的各动画的样式表
 * * 计算各节点的各动画的各样式的当前值
 * * 应用 计算出的样式值
 */

import { Animatable, AnimeTools, AttrFrames, DirectionTypes, FrameClassKeys, IKeyFrameCfg, RuntimeAnimation } from './animation_tools';
import { MathTools } from './math_tools';
import { RElement } from './r_element';
import { IEnumTransformData, StyleMap, Tools } from './tools';

// tslint:disable-next-line:no-unnecessary-class
export class AnimationControl {
    /**
     * 要处理动画列表 <节点>
     */
    public static animeMap: Map<RElement, Animatable> = new Map();
    /**
     * 当前帧的时间
     */
    public static now: number;
    /**
     * GUI 动画的帧循环调用
     * * GUI 渲染循环内会在GUI渲染前调用
     */
    public static loop() {
        this.now = Date.now();

        this.animeMap.forEach((v, k) => {
            this.analy(v);
        });
    }
    /**
     * 添加一个目标节点的动画
     * @param anime 动画表
     */
    public static add(anime: Animatable) {
        if (anime.lastTime === undefined) {
            anime.lastTime = this.now || Date.now();
        }
        this.animeMap.set(anime.target, anime);
    }
    /**
     * 取消目标节点的动画
     * @param anime 动画表
     */
    public static remove(anime: Animatable) {
        this.animeMap.delete(anime.target);
    }
    /**
     * 解析节点的动画表
     * @param anime 节点的动画表
     */
    private static analy(anime: Animatable) {
        anime.delayTime = this.now - anime.lastTime;
        this.analyAnimatable(anime);
        anime.lastTime  = this.now;
    }
    /**
     * 处理目标动画表的当前帧
     * @param anime 目标动画表
     */
    private static analyAnimatable(anime: Animatable) {
        anime.animations.forEach((v, i) => {
            v.runedTime += anime.delayTime;
            this.analyRuntimeAnime(anime.target, v, anime.animations);
        });
    }
    /**
     * 处理当前帧的目标运行时动画
     * @param target 目标动画节点
     * @param runtimeAnime 运行时动画数据
     * @param animations 运行时动画数据列表
     */
    // tslint:disable-next-line:max-func-body-length
    private static analyRuntimeAnime(target: RElement, runtimeAnime: RuntimeAnimation, animations: Map<string, RuntimeAnimation>) {
        // 延时检查
        const startTime = runtimeAnime.startTime + runtimeAnime.delayTime;

        if (startTime < runtimeAnime.runedTime) {

            // 当前为第几次动画
            const currCount = Math.ceil((runtimeAnime.runedTime - startTime) / runtimeAnime.duration);

            // 新的一轮动画
            if (currCount !== runtimeAnime.runtimeCount) {
                runtimeAnime.runtimeCount = currCount;

                if (currCount === 1) {
                    // 动画开始
                    try {
                        runtimeAnime.startListener && runtimeAnime.startListener(runtimeAnime.name);
                    } catch (e) {
                        Tools.error(e);
                    }
                } else {
                    // 动画播放完一次
                    try {
                        runtimeAnime.iteratListener && runtimeAnime.iteratListener(runtimeAnime.name, currCount - 1);
                    } catch (e) {
                        Tools.error(e);
                    }
                }

                if (runtimeAnime.iteration !== -1 && runtimeAnime.iteration < currCount) {
                    switch (runtimeAnime.fillMode) {
                        case ('forwards'):
                        case ('both') : {
                            // // TODO - 当前实现为 结束时 保持第一帧状态 还是 结束帧状态
                            // // 调用 结束监听前跑最后一帧，因为 结束回调里可能会做节点销毁操作
                            // const timeprogress = 1.0;
                            
                            // // 要表现的帧的计算进度
                            // const renderProgress = this.computeRenderProgress(timeprogress, runtimeAnime.direction, runtimeAnime.runtimeCount);

                            // // 计算目标渲染帧状态
                            // this.computeRuntimeFrame(renderProgress, runtimeAnime);
                            
                            // // 应用帧效果
                            // this.applyKeyFrame(target, runtimeAnime);
                            // break;
                        }
                        default: {
                            // TODO 回到动画运行前的状态

                            // TODO - 当前实现为 结束时 保持第一帧状态 还是 结束帧状态
                            // 调用 结束监听前跑最后一帧，因为 结束回调里可能会做节点销毁操作
                            const timeprogress = 1.0;

                            // 要表现的帧的计算进度
                            const renderProgress = this.computeRenderProgress(timeprogress, runtimeAnime.direction, runtimeAnime.runtimeCount);

                            // 计算目标渲染帧状态
                            this.computeRuntimeFrame(renderProgress, runtimeAnime);
                            
                            // 应用帧效果
                            this.applyKeyFrame(target, runtimeAnime);
                        }
                    }

                    // 非循环动画结束
                    try {
                        runtimeAnime.endListener && runtimeAnime.endListener(runtimeAnime.name);
                    } catch (e) {
                        Tools.error(e);
                    }
                    animations.delete(runtimeAnime.name);

                    runtimeAnime = undefined;

                    return;
                }
            }

            // 当前动画过程的进度
            const timeprogress = (runtimeAnime.runedTime - startTime - (runtimeAnime.runtimeCount - 1) * runtimeAnime.duration) / runtimeAnime.duration;

            // 要表现的帧的计算进度
            const renderProgress = this.computeRenderProgress(timeprogress, runtimeAnime.direction, runtimeAnime.runtimeCount);

            // 计算目标渲染帧状态
            this.computeRuntimeFrame(renderProgress, runtimeAnime);
            
            // 应用帧效果
            this.applyKeyFrame(target, runtimeAnime);
        } else {
            // 处理 等待时间里使用动画第一帧 的模式
            if (runtimeAnime.fillMode === 'backwards' || runtimeAnime.fillMode === 'both') {
                // 当前动画过程的进度
                const timeprogress = 0.0;
    
                // 要表现的帧的计算进度
                const renderProgress = this.computeRenderProgress(timeprogress, runtimeAnime.direction, 1);
    
                // 计算目标渲染帧状态
                this.computeRuntimeFrame(renderProgress, runtimeAnime);
                
                // 应用帧效果
                this.applyKeyFrame(target, runtimeAnime);
            }
        }
    }
    /**
     * 计算运行时动画运行进度 <在关键帧配置里的进度>
     * @param timeprogress 运行时长与动画时长百分比
     * @param direction 动画播放模式
     * @param count 当前动画游戏轮次
     */
    private static computeRenderProgress(timeprogress: number, direction: string, count: number) {
        let result: number;

        switch (direction) {
            case (DirectionTypes.alternate): {
                result = count % 2 === 1 ? 1 - timeprogress : timeprogress;
                break;
            }
            case (DirectionTypes.alternate_reverse): {
                result = count % 2 === 0 ? 1 - timeprogress : timeprogress;
                break;
            }
            case (DirectionTypes.reverse): {
                result = 1 - timeprogress;
                break;
            }
            case (DirectionTypes.normal): 
            default: {
                result = timeprogress;
            }
        }

        return result;
    }
    /**
     * 计算运行时动画数据
     * @param renderProgress 动画运行进度
     * @param runtimeAnime 运行时动画
     */
    private static computeRuntimeFrame(renderProgress: number, runtimeAnime: RuntimeAnimation) {
        renderProgress = renderProgress < 0 ? 0 : renderProgress;
        renderProgress = renderProgress > 1 ? 1 : renderProgress;
        
        const len = runtimeAnime.attrKeysList.length;
        for (let i = 0; i < len; i++) {
            const attrKey = runtimeAnime.attrKeysList[i];
            const attrFrames = runtimeAnime.animaCfg.attrs.find(v => {
                return v.key === attrKey;
            });

            if (attrFrames === undefined) continue;

            if (runtimeAnime.stateRuntime.get(attrKey) === undefined) {
                this.analyStartStateRuntime(attrKey, runtimeAnime, attrFrames);
            }
            
            if (renderProgress === 0) {
                this.analyStartStateRuntime(attrKey, runtimeAnime, attrFrames);
            } else {
                // const cfgProgress = runtimeAnime.animaCfg._from + renderProgress * runtimeAnime.animaCfg._to;
                const cfgProgress = renderProgress;
        
                const nextkeyIndex = attrFrames.data.findIndex((v, i) => {
                    return (v[0] >= cfgProgress);
                });
        
                if (nextkeyIndex === 0) {
                    this.analyStartStateRuntime(attrKey, runtimeAnime, attrFrames);
                } else if (nextkeyIndex === -1) {
                    this.analyEndStateRuntime(attrKey, runtimeAnime, attrFrames);
                } else {
                    const lastFrameCfg = attrFrames.data[nextkeyIndex - 1];
                    const nextFrameCfg = attrFrames.data[nextkeyIndex];
        
                    // runtimeAnime.stateRuntime.progress = cfgProgress;
        
                    runtimeAnime.stateRuntime.set(attrKey, this.computeMidFrameData(attrKey, runtimeAnime.timingFunction, cfgProgress, lastFrameCfg, nextFrameCfg));
                }
            }
        }

    }
    /**
     * 解析动画开始时数据
     * @param attrKey 目标属性名称
     * @param runtimeAnime 运行时动画
     * @param attrFrames 目标属性关键帧列表
     */
    private static analyStartStateRuntime(attrKey: string, runtimeAnime: RuntimeAnimation, attrFrames: AttrFrames) {
        if (attrFrames.data[0][0] === 0) {
            runtimeAnime.stateRuntime.set(attrKey, AnimeTools.cloneAttrFrame(attrKey, attrFrames.data[0][1]));
        }
    }
    /**
     * 解析动画结束时数据
     * @param attrKey 目标属性名称
     * @param runtimeAnime 运行时动画
     * @param attrFrames 目标属性关键帧列表
     */
    private static analyEndStateRuntime(attrKey: string, runtimeAnime: RuntimeAnimation, attrFrames: AttrFrames) {
        if (attrFrames.data[attrFrames.data.length - 1][0] === 1) {
            runtimeAnime.stateRuntime.set(attrKey, AnimeTools.cloneAttrFrame(attrKey, attrFrames.data[attrFrames.data.length - 1][1]));
        }
    }
    /**
     * 计算动画进行时数据
     * @param attrKey 目标属性名称
     * @param math 运行函数
     * @param cfgProgress 在整个动画过程的百分比
     * @param lastFrame 上一个关键帧
     * @param nextFrame 下一个关键帧
     */
    private static computeMidFrameData(attrKey: string, math: string, cfgProgress: number, lastFrame: IKeyFrameCfg, nextFrame: IKeyFrameCfg) {

        cfgProgress = MathTools.mathCall(math, ((cfgProgress - lastFrame[0]) / (nextFrame[0] - lastFrame[0])));

        return AnimeTools.mixFrameData(attrKey, cfgProgress, lastFrame[1], nextFrame[1]);
    }
    /**
     * 对目标节点应用动画当前状态数据
     * @param target 目标节点
     * @param anime 运行时动画
     */
    private static applyKeyFrame(target: RElement, runTimeAnima: RuntimeAnimation) {
        runTimeAnima.stateRuntime.forEach((v, k) => {
            switch (k) {
                case (FrameClassKeys.transform): {
                    const nv = [];
                    for (const key in <IEnumTransformData>v) {
                        nv.push({ t: key, d: v[key] });
                    }
                    target.style[StyleMap[k]] = <any>nv;
                    break;
                }
                case (FrameClassKeys.cellId): {
                    target.attributes[k] = <any>v;
                    break;
                }
                case (FrameClassKeys.opacity):
                default: {
                    target.style[StyleMap[k]] = <any>v;
                }
            }
        });
    }
}