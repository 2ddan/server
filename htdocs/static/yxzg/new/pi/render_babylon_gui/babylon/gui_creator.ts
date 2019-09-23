// tslint:disable-next-line:no-reference
/// <reference path='../babylon/babylon.d.ts'/>

import { RootManager } from '../../ui/root_gui';
import { loadImageRes, ResTab } from '../../util/res_mgr';
import { IWidgetGUICfg, Widget } from '../../widget/widget_gui';
import { FormatEvent, IPISceneWithEventInfo } from './format_event';
import { IAnimationCfg } from './gui_anim_base';
import { GUIAnimController, IAnimDataAttrs, IAnimDataAttrsSpecial, IAnimDataTypes } from './gui_anim_controller';
import { ATTR_FORMAT_FLAG, EEventDebugTypes, EventDebugsCall, EventTypeList, GUIConstructor, GUIPARAMS, IEventCallCfg } from './gui_base';
import { BABYLON_IMAGE_TYPE, ImageRes } from '../babylon/loader';

// ===============================================

let FPSNode: BABYLON.GUI.Container;

// tslint:disable-next-line:one-variable-per-declaration
let host: BABYLON.GUI.AdvancedDynamicTexture,
    UICfgMap: Map<string, any>,
    CustomizeControlMap: Map<string, Function>;

UICfgMap = new Map();
CustomizeControlMap = new Map();

// ===============================================
export let ImageMap: Map<string, HTMLImageElement> =  new Map();
/**
 * GUI 拓展 pi_update 方法，用于界面更新
 */
// tslint:disable-next-line:interface-name
export interface IPiContainer extends BABYLON.GUI.Container {
    pi_update: Function;
}

/**
 * GUI 拓展 pi_update 方法，用于界面更新
 */
// tslint:disable-next-line:interface-name
export interface IPiWidgetControl extends BABYLON.GUI.Control {
    pi_widget: Widget;
    pi_cfg: IWidgetGUICfg;
}

// tslint:disable-next-line:interface-name
export interface IPIImage extends BABYLON.GUI.Image {
    pi_image: string;
}

// tslint:disable-next-line:interface-name
export interface IPiWidgetContainer extends BABYLON.GUI.Container {
    pi_widget: Widget;
    pi_cfg: IWidgetGUICfg;
}

/**
 * GUI 构建方法类
 */
// tslint:disable-next-line:no-unnecessary-class
export class GUICreator {
    /**
     * 初始化创建 全屏 UI 根节点
     * * GUIScene 实例化之后调用
     */
    // tslint:disable-next-line:function-name
    public static Init(canvas: HTMLCanvasElement) {

        host = BABYLON.GUI.AdvancedDynamicTexture.CreateOffscreenFullscreenUI('root2', GUIPARAMS.GUISceneInstance, canvas);

        host.piGUIRenderMode = BABYLON.GUI.AdvancedDynamicTexture.RenderOffscreen;

        GUIAnimController.Init();

        RootManager.initGroups();
        // RootManager.initGroups_2();

        return host;
    }
    /**
     * 设置对 UI 全局的事件监听函数
     * @param eType ： 监听类型
     * @param cb ：监听回调
     */
    public static setUIPointerObserver(eType: string, cb: (e: any, s: BABYLON.EventState) => any) {
        host._rootContainer[`on${eType}Observable`].add(cb);
    }
    /**
     * 移除对 UI 全局的事件监听函数
     * @param eType ： 监听类型
     * @param cb ：监听回调
     */
    public static delUIPointerObserver(eType: string, cb: (e: any, s: BABYLON.EventState) => any) {
        host._rootContainer[`on${eType}Observable`].removeCallback(cb);
    }
    public static initFPS() {
        FPSNode = new BABYLON.GUI.Container('FPS');
        const bgNode = new BABYLON.GUI.Container('FPS');
        FPSNode.addControl(bgNode);
        const textNode = new BABYLON.GUI.TextBlock('FPS', '0');
        FPSNode.addControl(textNode);

        GUICreator.setControlAttrs(
            FPSNode, 
            {
                style: {
                    width: 60,
                    height: 30,
                    right: 0,
                    top: 0,
                    zIndex: 10000
                }
            }
        );
        
        GUICreator.setControlAttrs(
            bgNode, 
            {
                style: {
                    background: '#333',
                    alpha: 0.4
                }
            }
        );

        GUICreator.setControlAttrs(
            textNode, 
            {
                style: {
                    color: '#eeeeee',
                    fontSize: 22,
                    txtLeft: true
                }
            }
        );

        host.addControl(FPSNode);

    }
    /**
     * 更新 FPS 
     * @param fps FPS 数值
     */
    public static updateFPS(fps: number, isVisible: boolean = true) {
        if (FPSNode === undefined) {
            GUICreator.initFPS();
        }

        FPSNode.isVisible = isVisible;
        
        (<BABYLON.GUI.TextBlock>FPSNode.children[1]).text = `${fps}`;
    }

    /**
     * 返回 UI 根节点
     */
    public static getUIRoot() {
        return host;
    }

    /**
     * 切换 UI 显示与隐藏
     */
    public static triggerUIVisible() {
        host.rootContainer.isVisible = !host.rootContainer.isVisible;
    }

    /**
     * 更改 UI 显示与隐藏
     * @param b 是否显示
     */
    public static setUIVisible(b: boolean) {
        host.rootContainer.isVisible = b;
    }

    /**
     * 设置 节点属性 - 多属性 - 检测/更新 等 - Pi 自动更新等使用  
     * @param control 目标节点
     * @param cfg 节点配置
     */
    public static setControlAttrs(control: BABYLON.GUI.Control, cfg: IWidgetGUICfg, oldCfg?: IWidgetGUICfg) {
        // cfg.style = GUICreator.mergeJson(cfg.style, cfg.styleNew);

        for (const key in cfg.style) {
            if (cfg.style[key] === ATTR_FORMAT_FLAG) {

                GUICreator.setControlAttr(control, key, cfg.style[key]);

            }
        }
        
        for (const key in cfg.style) {
            if (cfg.style[key] !== undefined && cfg.style[key] !== ATTR_FORMAT_FLAG) {
                // if (oldCfg && oldCfg.style) {
                //     if (oldCfg.style[key] !== cfg.style[key]) {
                //         GUICreator.setControlAttr(control, key, cfg.style[key]);
                //     }
                // } else {
                GUICreator.setControlAttr(control, key, cfg.style[key]);
                // }

            }
        }
        
        for (const key in cfg.events) {
            if (cfg.events[key] === ATTR_FORMAT_FLAG) {

                GUICreator.setControlAttr(control, key, cfg.events[key]);

            }
        }
        
        for (const key in cfg.events) {
            if (cfg.events[key] !== undefined && cfg.events[key] !== ATTR_FORMAT_FLAG) {

                GUICreator.setControlAttr(control, key, cfg.events[key]);

            }
        }
        
        // for (const key in cfg._events) {
        //     if (cfg._events[key] === ATTR_FORMAT_FLAG) {

        //         GUICreator.setControlAttr(control, key, cfg._events[key]);

        //     }
        // }
        
        // for (const key in cfg._events) {
        //     if (cfg._events[key] !== undefined && cfg._events[key] !== ATTR_FORMAT_FLAG) {

        //         GUICreator.setControlAttr(control, key, cfg._events[key]);

        //     }
        // }

        // 置灰处理
        if (cfg.style && cfg.style.pi_isGray) {
            control.onAfterDrawObservable.add(GUICreator.grayControl);
        } else {
            control.onAfterDrawObservable.removeCallback(GUICreator.grayControl);
        }

        // 动画处理
        if (cfg.animations !== undefined) {
            GUICreator.analyControlAnim(cfg, control, (<IPiWidgetControl>control).pi_widget);
        } else {
            GUICreator.clearControlAnimations(control, (<IPiWidgetControl>control).pi_widget);
        }

        control.isPointerBlocker = true;
    }

    /**
     * 设置 节点属性 - 多属性 - 仅用作设置属性 - animControl 场景等使用  
     * @param control 目标节点
     * @param cfg 节点配置
     */
    public static setControlAttrsBase(control: BABYLON.GUI.Control, cfg: IWidgetGUICfg) {

        for (const key in cfg.style) {
            if (cfg.style[key] !== undefined && cfg.style[key] !== ATTR_FORMAT_FLAG) {

                GUICreator.setControlAttr(control, key, cfg.style[key]);

            }
        }
        
        control.isPointerBlocker = true;
    }
    /**
     * 设置 节点指定属性
     * !! 部分节点类型的部分属性特殊处理
     * @param control 目标节点
     * @param key 属性名
     * @param value 属性值 
     */
    public static setControlAttr(control: BABYLON.GUI.Control, key: string, value: any) {

        if (Attr1.indexOf(key) >= 0) {

            if (Attr1_1.indexOf(key) >= 0) {
                value = Math.round(value * 10) / 10;
            } else if (Attr1_2.indexOf(key) >= 0) {
                value = Math.round(value);
            }

            if (control.typeName === 'Button' && AttrButtonSpecial.indexOf(key) >= 0) {
                specialAttrButton(<any>control, key, value);
            } else {
                // 基本属性未做新旧差异时的处理
                // TO DO
                if (value !== ATTR_FORMAT_FLAG) {
                    control[key] = value;
                }
            }

        } else if (AttrFunc[key] !== undefined) {

            if (control.typeName === 'Button' && AttrButtonSpecial.indexOf(key) >= 0) {
                specialAttrButton((<any>control), key, value);
            } else {
                AttrFunc[key](control, value);
            }

        } else if (EventFunc[key] !== undefined) {

            EventFunc[key](control, value);

        }

    }
    
    /**
     * 创建 控件
     * @param cfg 节点配置
     * @param parentW 节点所属组件
     */
    // tslint:disable-next-line:function-name
    public static CreateControlWithWidget(cfg: IWidgetGUICfg, parentW: Widget) {

        let control: BABYLON.GUI.Control;

        // 格式化默认 style 设置
        if (cfg.style === undefined) {
            cfg.style = {};
        }

        if (cfg.type !== undefined) {

            GUICreator.analyWidgetEvents(cfg, parentW);
            control = GUICreator.CreateControlWithWidgetByType(cfg, parentW);

        } else if (cfg.w_tag !== undefined)  {

            GUICreator.analyWidgetEvents(cfg, parentW);
            control = GUICreator.CreateControlWithWidgetByWTag(cfg, parentW);

        }

        return control;
    }
    /**
     * 创建组件节点
     */
    // tslint:disable-next-line:function-name
    public static CreateControlWithWidgetByWTag(cfg: IWidgetGUICfg, parentW: Widget) {

        let control: BABYLON.GUI.Control;
        let widget: Widget;
        let currCfg: IWidgetGUICfg;

        if (cfg.w_tag !== undefined) {

            // widget = RootManager.create(cfg.w_tag, cfg.it);

            // 构建 widget 数据
            widget = RootManager.factoryWidget(cfg.w_tag);

            widget.style = cfg;

            widget.parent = parentW;

            // 解析父组件给的样式
            GUICreator.analyCfgStyle(cfg, parentW);
            GUICreator.analyWidgetEvents(cfg, parentW);
            GUICreator.analyControlEvents(cfg, parentW);

            // 创建 widget 节点
            RootManager.createWidget(widget, cfg.it);

            currCfg = widget.tree;
            
            // 解析自己定义时的的样式
            GUICreator.analyCfgStyle(currCfg, parentW);
            GUICreator.analyWidgetEvents(currCfg, widget);
            GUICreator.analyControlEvents(currCfg, widget);

            // 合并 widget 节点的样式
            currCfg.style = GUICreator.mergeJson(currCfg.style, cfg.style);
            // 合并 widget 事件
            currCfg.events = GUICreator.mergeJson(currCfg.events, cfg.events);
            
            if (widget !== undefined) {

                widget.parent = parentW;

                control = widget.control;

                parentW.children.push(widget);

                (<IPiWidgetControl>control).pi_widget = widget;
                GUICreator.setControlAttrs(control, currCfg);

            } else {

                console.warn(`widget (${cfg.w_tag}) 未注册！`);

            }

        }

        return control;
    }
    /**
     * 创建普通节点
     * @param cfg 节点配置
     * @param parentW 节点所属组件
     */
    // tslint:disable-next-line:max-func-body-length
    // tslint:disable-next-line:function-name
    public static CreateControlWithWidgetByType(cfg: IWidgetGUICfg, parentW: Widget) {

        let control: BABYLON.GUI.Control;
        const controlType = GUICreator.transformTypeName(cfg.type);

        GUICreator.analyControlEvents(cfg, parentW);
        GUICreator.analyCfgStyle(cfg, parentW);

        if (GUIConstructor[controlType] !== undefined) {

            control = GUIConstructor[controlType](cfg.style);
            
            // 文字节点预处理
            if (controlType === UIType1[0]) {
                GUICreator.setControlAttr(control, 'fontFamily', GUIPARAMS.Design_FontFamily);
                GUICreator.setControlAttr(control, 'fontSize', GUIPARAMS.Design_FontSize);
                GUICreator.setControlAttr(control, 'fontWeight', 'normal');
                GUICreator.setControlAttr(control, 'fontStyle', 'normal');
            }

            if (UITypeButton.indexOf(controlType) >= 0) {
                // 原生按钮 边框为 1, 此处取消边框 
                (<BABYLON.GUI.Button>control).thickness = 0;
            }
            
            (<IPiWidgetControl>control).pi_widget = parentW;
            GUICreator.setControlAttrs(control, cfg);

        // 自定义控件节点
        } else if (CustomizeControlMap.get(controlType) !== undefined) {
            let customizeControl: Function;

            customizeControl = CustomizeControlMap.get(controlType);

            control = customizeControl(cfg.style);
            
            (<IPiWidgetControl>control).pi_widget = parentW;
            GUICreator.setControlAttrs(control, cfg);

        // 自定义基础组件节点
        } else {
            
            const registerCfg = GUICreator.readComponentCfg(controlType);

            if (registerCfg !== undefined) {

                if (registerCfg instanceof Function) {

                    control = registerCfg(cfg.it);
                    
                    (<IPiWidgetControl>control).pi_widget = parentW;
                    GUICreator.setControlAttrs(control, cfg);

                } else {

                    cfg = GUICreator.mergeJson(registerCfg, cfg);

                    if (controlType !== undefined) {
                        control = GUICreator.CreateControlWithWidget(cfg, parentW);
                    }

                }
            } else {
                console.warn(`未定义 ${controlType} 类型的创建方法`);
            }
        }

        return control;
    }
    /**
     * 解析节点动画配置
     * @param cfg :
     * @param control :
     */
    public static analyControlAnim(cfg: IWidgetGUICfg, control: BABYLON.GUI.Control, w: Widget) {
        let animCfgMap: Map<string, IAnimationCfg>;
        let widget: Widget;

        if (cfg.animations !== undefined && w !== undefined) {
            // widget = w.isTempContainer ? w.parent : w;
            widget = w;
    
            animCfgMap = widget.addControlAnimMap(control);

            // 移除配置中已不存在的动画
            animCfgMap.forEach((animCfg) => {
                const index = cfg.animations.findIndex(ele => { 
                    return ele.name === animCfg.name;
                });

                if (index < 0) {
                    widget.stopControlAnim(control, animCfg.name);
                }
            });
            
            // 处理新动画配置
            GUICreator.analyControlAnimationsCfg(cfg.animations, control, widget, animCfgMap);
        }
    }
    public static analyControlAnimationsCfg(animations: IAnimationCfg[], control: BABYLON.GUI.Control, widget: Widget, animCfgMap: Map<string, IAnimationCfg>) {
        // 处理新动画配置
        animations.forEach(animCfg => {

            let _animCfg: IAnimationCfg;
            let isNewAnim: boolean;

            if (animCfg !== undefined) {
                // 正在播放的动画列表中 获取指定名称的动画
                _animCfg    = animCfgMap.get(animCfg.name);
                isNewAnim   = true;

                // 动画没有在播放, 
                if (_animCfg !== undefined) {
                    // 新旧动画配置不同
                    if (GUICreator.checkAnimDataIsDiff(_animCfg, animCfg)) {
                        widget.stopControlAnim(control, animCfg.name);
                        isNewAnim = true;
                    } else {
                        isNewAnim = false;
                    }
                } else {
                    isNewAnim = true;
                }

                if (isNewAnim && animCfg.isActive) {
                    if (animCfg.name !== undefined && animCfg.name !== '') {
                        (<any>_animCfg)         = {};
                        (<any>_animCfg.animData)    = {};
                        _animCfg.name           = animCfg.name;
                        _animCfg.control        = control;
                        _animCfg.widget         = widget;
    
                        _animCfg.animData.control = control;
                        
                        IAnimDataTypes.forEach(key => {
                            if (animCfg.animData[`${key}_cfg`] !== undefined) {
                                _animCfg.animData[`${key}_cfg`]     = animCfg.animData[`${key}_cfg`];
                                _animCfg.animData[`${key}_math`]    = animCfg.animData[`${key}_math`];
                            } else {
                                _animCfg.animData[`${key}_cfg`]     = undefined;
                                _animCfg.animData[`${key}_math`]    = undefined;
                            }
                        });
    
                        IAnimDataAttrs.forEach(key => {
                            if (animCfg.animData[key] !== undefined) {
                                _animCfg.animData[`${key}`] = animCfg.animData[`${key}`];
                            }
                        });
                        
                        IAnimDataAttrsSpecial.forEach(key => {
                            _animCfg.animData[`${key}`] = animCfg.animData[`${key}`];
                        });
                        
                        _animCfg.isActive = animCfg.isActive;
                        
                        animCfgMap.set(_animCfg.name, _animCfg);
                        
                        // if (animCfg.isActive === true) {
                        widget.activeControlAnim(control, _animCfg.name);
                        // } else {
                        //     widget.stopControlAnim(control, _animCfg.name);
                        // }
                    } else {
                        console.warn(`from : ${widget.name} - ${animCfg} 请检查 name 设置`);
                    }

                } else {
                    // 动画未激活
                }
            }
            
        });
    }
    public static clearControlAnimations(control: BABYLON.GUI.Control, w: Widget) {
        if (w !== undefined) {
            w.delControlAnimCfgs(control);
        }
    }
    public static checkAnimDataIsDiff(_animCfg: IAnimationCfg, animCfg: IAnimationCfg) {
        let noDiff: Boolean = false;

        noDiff = _animCfg.isActive === animCfg.isActive;

        if (noDiff) {
            IAnimDataTypes.forEach(key => {
                // 指定属性配置均为 undefined
                if (_animCfg.animData[`${key}_cfg`] === undefined && animCfg.animData[`${key}_cfg`] === undefined) {
                    noDiff && (noDiff = true);
                } else {
                    // 指定属性配置均为 不为undefined
                    if (_animCfg.animData[`${key}_cfg`] !== undefined && animCfg.animData[`${key}_cfg`] !== undefined) {
                        // 动画数据配置是否相同
                        noDiff && (noDiff = _animCfg.animData[`${key}_cfg`][0] === animCfg.animData[`${key}_cfg`][0]);
                        noDiff && (noDiff = _animCfg.animData[`${key}_cfg`][1] === animCfg.animData[`${key}_cfg`][1]);
                        // 动画函数是否相同
                        noDiff && (noDiff = _animCfg.animData[`${key}_math`]   === animCfg.animData[`${key}_math`]);
                    // 新旧配置 一个 undefined， 一个有动画配置
                    } else {
                        noDiff = false;
                    }
                }
            });
        }

        if (noDiff) {
            IAnimDataAttrs.forEach(key => {
                if (animCfg.animData[key] !== undefined && key !== 'callBack' && key !== 'control') {
                    noDiff = _animCfg.animData[`${key}`] === animCfg.animData[`${key}`];
                }
            });
        }
        
        if (noDiff) {
            IAnimDataAttrsSpecial.forEach(key => {
                noDiff = _animCfg.animData[`${key}`] === animCfg.animData[`${key}`];
            });
        }

        return !noDiff;
    }
    /**
     * 解析鼠标事件
     * @param cfg 节点配置节点配置
     * @param w 节点鼠标事件所属组件
     */
    public static analyControlEvents(guiCfg: IWidgetGUICfg, w: Widget) {
        if (guiCfg.events !== undefined) {

            for (let len = EventTypeList.length - 1; len >= 0; len--) {
                const eventType = EventTypeList[len];
                // tslint:disable-next-line:one-variable-per-declaration
                let eventCfg: ((data: any, e: any, s: BABYLON.EventState) => any) | (any[]), funcTag: Function | string;
                let func: Function, arg: any, cfg: IEventCallCfg;
    
                eventCfg = guiCfg.events[eventType];
    
                if (eventCfg !== undefined && eventCfg !== null) {
                    // 数组配置
                    if (!(eventCfg instanceof Function)) {
                        funcTag         = eventCfg[0];
                        arg   = eventCfg[1];
                        cfg   = eventCfg[2];

                        if (typeof funcTag === 'string') {
                            func  = w.isTempContainer ? w.parent[funcTag] : w[funcTag];

                            if (!func) {
                                guiCfg.events[eventType] = undefined;
                                console.warn(`widget (${w.name}) 上不存在方法: ${funcTag}`);
                            }
                        } else {
                            func   = funcTag;
                        }
        
                        if (!!func) {
                            (<any>guiCfg.events)[eventType] = (e: any, s: BABYLON.EventState) => {

                                GUICreator.eventCall(func, cfg, eventType, arg, e, s);
                                
                            };
                        } else {
                            guiCfg.events[eventType] = undefined;
                            if (cfg !== undefined && eventType === 'down' || eventType === 'up') {
                                (<any>guiCfg.events)[eventType] = (e: any, s: BABYLON.EventState) => {

                                    GUICreator.eventCall(undefined, cfg, eventType, undefined, e, s);

                                };
                            }
                        }
    
                    } else {
                        // console.warn(`节点事件配置没有设置为数组形式`);
                    }
                }
            }
        }
    }

    public static eventCall(func: Function, cfg: IEventCallCfg, eventType: string, arg: any, e: any, s: BABYLON.EventState) {
        GUIPARAMS.GUIEventCallBefore && GUIPARAMS.GUIEventCallBefore();

        if (cfg && cfg.pointerAnim !== undefined) {
            let tempScale: number = 0.9;

            if (typeof cfg.pointerAnim === 'number') {
                tempScale = cfg.pointerAnim;
            }

            const control = s.currentTarget;

            if (eventType === 'down') {
                GUICreator.setControlAttr(control, 'scale', tempScale);
            } else if (eventType === 'up') {
                GUICreator.setControlAttr(control, 'scale', 1);
            }
        }

        func && func(arg, e, s); 

        if (cfg && cfg.skipNext) {
            s.skipNextObservers = true;
        } else {
            s.skipNextObservers = false;
        }
        GUIPARAMS.GUIEventCallAfter && GUIPARAMS.GUIEventCallAfter();
    }

    /**
     * 控件置灰
     */
    public static grayControl(eventData: BABYLON.GUI.Control, eventState: BABYLON.EventState) {
        const measure = eventData._currentMeasure;
        const ctx  = eventData._host.getContext();
        const imgSrc = ctx.getImageData(measure.left, measure.top, measure.width, measure.height);
        const imgSrcData = imgSrc.data;
        const len = imgSrcData.length;
        let luma;

        // convert by iterating over each pixel each representing RGBA
        for (let i = 0; i < len; i += 4) {
            // calculate luma, here using Rec 709
            luma = imgSrcData[i] * 0.2126 + imgSrcData[i + 1] * 0.7152 + imgSrcData[i + 2] * 0.0722;
      
            // update target's RGB using the same luma value for all channels
            imgSrcData[i] = imgSrcData[i + 1] = imgSrcData[i + 2] = luma;
            imgSrcData[i + 3] = imgSrcData[i + 3];                            // copy alpha
        }

        // put back luma data so we can save it as image
        ctx.putImageData(imgSrc, measure.left, measure.top);

    }

    /**
     * 解析自定义事件
     * @param cfg 配置
     * @param widget 配置所属 widget
     */
    public static analyWidgetEvents(cfg: IWidgetGUICfg, widget: Widget) {

        const events = cfg.events;

        if (events !== undefined && widget !== undefined) {

            for (const key in events) {

                if (EventTypeList.indexOf(key) < 0 && events[key] !== undefined) {

                    const funcName: string = <any>events[key];
        
                    if (funcName !== undefined) {

                        widget.guiEventMap.set(key, widget[funcName]);

                    }
                }

            }

        }

    }

    /**
     * 创建带有树结构的UI
     * @param cfg 节点配置
     */
    // tslint:disable-next-line:function-name
    public static CreateControlWithTreeWidget(cfg: IWidgetGUICfg, widget: Widget) {

        let control: BABYLON.GUI.Control;

        control = GUICreator.CreateControlWithWidget(cfg, widget);

        // 绑定节点配置
        (<IPiWidgetControl>control).pi_cfg = cfg;

        if (cfg.children !== undefined) {

            const _control: BABYLON.GUI.Container = <any>control;
            GUICreator.createControlChildrenWithTreeWidget(<IPiWidgetContainer>_control, cfg);
            
        }

        return control;
    }

    public static createControlChildrenWithTreeWidget(control: IPiWidgetContainer, cfg: IWidgetGUICfg) {
        
        cfg.children.forEach(eleCfg => {

            let _control: BABYLON.GUI.Control;

            _control = GUICreator.CreateControlWithTreeWidget(eleCfg, control.pi_widget);

            control.addControl(_control);

        });

    }
    /**
     * 注册组件
     * @param name 组件名称
     * @param cfg 节点配置(it:any, it1:any) => {} 的方法 或 { type, width } 的配置
     */
    public static registerComponentCfg(name: string, cfg: (it: any, it1: any) => any | any) {
        UICfgMap.set(name, cfg);
    }

    /**
     * 获取组件配置
     * @param name 组件名称
     */
    public static readComponentCfg(name: string) {
        return UICfgMap.get(name);
    }

    /**
     * 注册自定义控件构造函数
     * @param name 控件名称
     * @param createFunc 控件创建方法 | 构造函数方法
     */
    public static registerCustomizeControl(name: string, createFunc: (name?: string) => any) {
        CustomizeControlMap.set(name, createFunc);
    }
    /**
     * 刷新容器内容 - 该容器内容为自定义界面内容
     * @param control 目标节点指定刷新该容器内容
     * @param createFunc 自定义界面内容创建方法
     */
    public static refreshWithCreateFunc(control: BABYLON.GUI.Container, createFunc: (...param: any) => BABYLON.GUI.Control, param?: any) {

        const newChild = createFunc(param);

        GUICreator.clearChildren(control);

        control.addControl(newChild);
        
    }
    /**
     * 刷新容器内容 - 该容器内容为已注册的组件
     * @param control 目标节点指定刷新该容器内容
     * @param registerName 已注册的组件名称
     * @param it 组件数据
     * @param it1 组件数据
     */
    public static refreshWithComponentName(control: BABYLON.GUI.Container, registerName: string, it: any, it1: any) {
        const registerFunc = UICfgMap.get(registerName);

        GUICreator.clearChildren(control);

        if (registerFunc !== undefined) {

            const newChild = registerFunc(it, it1);
            control.addControl(newChild);

        }
    }

    /**
     * 销毁容器所有子组件
     * @param control 目标节点目标容器
     */
    public static clearChildren(control: BABYLON.GUI.Container) {

        for (let len = control.children.length - 1; len >= 0; len--) {

            // child.dispose();
            GUICreator.disposeWithTreeWidget(control.children[len]);

        }
        
    }

    public static disposeWithTreeWidget(control: BABYLON.GUI.Control) {
        
        GUICreator.disposeWithTreeWidgetCall(control);
    }
    
    public static disposeWithTreeWidgetCall = (control: BABYLON.GUI.Control) => {
        
        const pi_widget = (<IPiWidgetControl>control).pi_widget;

        pi_widget && pi_widget.delControlAnimCfgs(control);
        
        if (pi_widget && pi_widget.control === control) {

            const parentW   = pi_widget.parent;

            // 从 父组件移除 组件
            if (parentW !== undefined) {
                
                const index = parentW.children.findIndex(w => {
                    return (w === pi_widget);
                });
                
                if (index >= 0) {
                    parentW.children.splice(index, 1);
                }

            }

            // 从 组件销毁
            pi_widget.destroy();

        } else {

            if ((<BABYLON.GUI.Container>control).children !== undefined) {
    
                // (<BABYLON.GUI.Container>control).children.forEach(child => {
                //     GUICreator.disposeWithTreeWidget(child);
                // });
                GUICreator.clearChildren((<BABYLON.GUI.Container>control));
        
                // (<BABYLON.GUI.Container>control).children.length = 0;
            }
    
            GUICreator.disposeControl(control);
        }
    }

    /**
     * 转换节点配置中的节点类型为BABYLON节点类型
     * @param cfgType :
     */
    public static transformTypeName(cfgType: string) {
        let targetType: string;

        targetType = TransformTypeCfgs[cfgType];
        targetType = targetType ? targetType : cfgType;

        return targetType;
    }

    /**
     * (取消使用) - 解析节点 样式设置 w_class 合并到 style
     * 请使用 computeCfgStyleWhileCreateCfg
     * @param cfg 节点配置
     * @param widget 配置 w_class 所属widget
     */
    public static analyCfgStyle(cfg: IWidgetGUICfg, widget: Widget) {

        let tempStyle = {};

        if (cfg.w_class !== undefined) {

            if (widget.sheet !== undefined) {

                cfg.w_class.forEach(key => {

                    tempStyle = GUICreator.mergeJson(tempStyle, widget.sheet[`${key}`]);

                });

            }

        }

        cfg.style = GUICreator.mergeJson(tempStyle, cfg.style);
    }

    /**
     * 解析节点 在创建节点配置之后
     * @param cfg 节点配置
     * @param widget 配置 w_class 所属widget
     */
    public static computeCfgStyleWhileCreateCfg(cfg: IWidgetGUICfg, sheet: any) {

        let tempStyle = {};

        if (cfg.w_class !== undefined) {

            if (sheet !== undefined) {

                cfg.w_class.forEach(key => {

                    tempStyle = GUICreator.mergeJson(tempStyle, sheet[`${key}`]);

                });

            }

            cfg.w_class = undefined;
    
            cfg.style = GUICreator.mergeJson(tempStyle, cfg.style);

        }

    }
        
    /**
     * 返回 合并两个对象属性 的新对象 - 新属性值替换旧属性值
     * @param srcObj 原始对象
     * @param newObj 新对象
     */
    public static mergeJson(srcObj: any, newObj: any) {
        let res: any;

        // res = {};

        // for (const key in srcObj) {
        //     res[key] = srcObj[key];
        // }
        
        res = srcObj;

        if (!!res) {
            if (newObj !== undefined) {
    
                for (const key in newObj) {
    
                    if (newObj[key] !== undefined) {
                        res[key] = newObj[key];
                    }
    
                }
    
            }
        } else {
            res = newObj;
        }

        return res;
    }
    /**
     * 更新节点属性 
     * @param control 目标节点
     * @param newCfg 新属性配置
     */
    public static changeControlAttr(control: BABYLON.GUI.Control, newCfg: IWidgetGUICfg) {

        const oldCfg: IWidgetGUICfg = (<IPiWidgetControl>control).pi_cfg;

        const style = GUICreator.mergeAttrCfg(oldCfg.style, newCfg.style);

        const events = GUICreator.mergeAttrCfg(oldCfg.events, newCfg.events);

        const animations = newCfg.animations;

        GUICreator.clearControlEvents(control);

        GUICreator.setControlAttrs(control, { style, events, animations }, oldCfg);

        (<IPiWidgetControl>control).pi_cfg = newCfg;

    }
    /**
     * 返回 合并两个对象属性 的新对象 - 新配置里用标准占位对象赋值旧配置
     * @param srcObj 原始对象
     * @param newObj 新对象
     */
    public static mergeAttrCfg(srcObj: any, newObj: any) {
        let res: any;

        res = {};

        // 新对象 属性全保留
        for (const key in newObj) {
            res[key] = newObj[key];
        }

        if (srcObj !== undefined) {

            for (const key in srcObj) {

                // 新对象 没有， 老对象有
                if (res[key] === undefined) {
                    res[key] = ATTR_FORMAT_FLAG;
                }

            }

        }

        return res;
    }
        
    /**
     * 清除节点原生事件
     * @param control 目标节点
     */
    public static clearControlEvents = (control: BABYLON.GUI.Control) => {
        EventTypeList.forEach(key => {
            GUICreator.clearControlEvent(control, key);
        });
    }

    /**
     * 清除节点原生事件
     * @param control 目标节点
     * @param type 事件类型
     */
    public static clearControlEvent = (control: BABYLON.GUI.Control, key: string) => {

        let observable: BABYLON.Observable<any>;
        
        switch (key) {
            case (EventTypeList[0]): {
                observable = (<BABYLON.GUI.Control>control).onPointerUpObservable;
                break;
            }
            case (EventTypeList[1]): {
                observable = (<BABYLON.GUI.Control>control).onPointerDownObservable;
                break;
            }
            case (EventTypeList[2]): {
                observable = (<BABYLON.GUI.Control>control).onPointerEnterObservable;
                break;
            }
            case (EventTypeList[3]): {
                observable = (<BABYLON.GUI.Control>control).onPointerOutObservable;
                break;
            }
            case (EventTypeList[4]): {
                observable = (<BABYLON.GUI.Control>control).onPointerMoveObservable;
                break;
            }
            case (EventTypeList[5]): {
                observable = (<BABYLON.GUI.Control>control).onPointerClickObservable;
                break;
            }
            case (EventTypeList[6]): {
                observable = (<BABYLON.GUI.InputText>control).onTextChangedObservable;
                break;
            }
            case (EventTypeList[7]): {
                observable = (<BABYLON.GUI.InputText>control).onBlurObservable;
                break;
            }
            // tslint:disable-next-line:no-empty
            default: {}
        }

        if (observable !== undefined) {
            observable.clear();
        }
    }
    /**
     * 检查基本节点类型是否为 容器类型
     * @param type 节点类型
     */
    public static checkTypeIsContainer(ntype: string) {
        return !(UITypeSimple.indexOf(ntype) >= 0);
    }
    public static debugEvent(debugs?: string[]) {
        if (debugs !== undefined) {
            debugs.forEach((value) => {
                host._rootContainer[`on${value}Observable`].add(EventDebugsCall[`${value}`]);
            });
        } else {
            for (const key in EEventDebugTypes) {
                host._rootContainer[`on${key}Observable`].removeCallback(EventDebugsCall[`${key}`]);
            }
        }
    }
    /**
     * 创建 image 数据
     * @param url : 图片资源路径
     */
    public static createImageDOM(url: string, resTab: ResTab, onload: (domImage: HTMLImageElement) => any) {

        // loadImage(url, onload);

        // let imageDOM = ImageMap.get(url);

        // if (imageDOM === undefined) {

        //     imageDOM = new Image(); // document.createElement('img');
        //     imageDOM.onload  = () => { onload && onload(imageDOM); };
        //     imageDOM.src = url;
        //     ImageMap.set(url, imageDOM);

        // } else {

        //     if (imageDOM.width) {
        //         onload && onload(imageDOM);
        //     } else {
        //         const old = imageDOM.onload.bind(this);
        //         imageDOM.onload  = () => { onload && onload(imageDOM); old && old(); };
        //     }

        // }

        // let res: any, imageDOM: HTMLImageElement;

        // res = resTab.get(url);

        // if (res !== undefined) {

        // } else {

        // }

        loadImageRes(url, resTab, (image, args) => {
            onload(image);
        });

        // return imageDOM;
    }
    /**
     * 销毁 GUI 节点
     * @param control ： 
     */
    public static disposeControl(control: BABYLON.GUI.Control) {
        control.dispose();
        control._linkedMesh = undefined;
        
        // if ((<IPIImage>control).pi_image !== undefined) {
        //     releaseImage((<IPIImage>control).pi_image);
        // }
    }
    public static checkVisible(control: BABYLON.GUI.Control) {
        let b = true;
        
        if (!control.isVisible) {
            b = false;
        } else {
            if (control._root && !control._root.isVisible) {
                b = false;
            }
        }

        if (b && control._root) {
            b = GUICreator.checkVisible(control._root);
        }
        
        return b;
    }
}

/**
 * 计算像素定位/设置单位的属性的值
 * @param value 属性值 属性值
 */
const computePixiAttrValue = (value: number): string |number => {
    // if (typeof(value) === 'string') {
    //     debugger;
    //     return value;
    // } else {
    return Math.abs(value) > 1 ? `${Math.floor(value / GUIPARAMS.HardwareScalingLevel)}px` : `${value * 100}%`;
    // }
};

/**
 * Control 属性设置
 * @param control 目标节点目标节点
 * @param value 属性值 值
 */
const _formatHCenter = (control: BABYLON.GUI.Control, value) => {
    // control.left = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.left = computePixiAttrValue(value);
    } else {
        control.left = 0;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点目标节点
 * @param value 属性值 值
 */
const _formatVCenter = (control: BABYLON.GUI.Control, value) => {
    // control.top = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.top = computePixiAttrValue(value);
    } else {
        control.top = 0;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatLeft = (control: BABYLON.GUI.Control, value) => {
    // control.left = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.left = computePixiAttrValue(value);
        control.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    } else {
        control.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点目标节点
 * @param value 属性值 值
 */
const _formatTop = (control: BABYLON.GUI.Control, value) => {
    // control.top = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.top = computePixiAttrValue(value);
        control.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    } else {
        control.top = 0;
        control.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatRight = (control: BABYLON.GUI.Control, value) => {
    // control.left = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        value = -value;
    
        control.left = computePixiAttrValue(value);
        control.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    } else {
        control.left = 0;
        control.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatBottom = (control: BABYLON.GUI.Control, value) => {
    // control.top = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        value = -value;
    
        control.top = computePixiAttrValue(value);
        control.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    } else {
        control.top = 0;
        control.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatLinkOffX = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        control.linkOffsetX = computePixiAttrValue(value);
    } else {
        control.linkOffsetX = 0;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatLinkOffY = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        control.linkOffsetY = computePixiAttrValue(value);
    } else {
        control.linkOffsetY = 0;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatZ = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.zIndex = value;
    } else {
        control.zIndex = 0;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatScale = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.scaleX = value;
        control.scaleY = value;
    } else {
        control.scaleX = 1;
        control.scaleY = 1;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatRotation = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.rotation = value;
    } else {
        control.rotation = 0;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatText = (control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.text = `${value}`;
    } else {
        control.text = '';
    }
};

const _formatFontSize = (control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.fontSize = computePixiAttrValue(value);
        // control.fontSize = (typeof value === 'number') ? `${value / EngineArgs.HardwareScalingLevel}px` : value;
    // } else {
    //     control.fontSize = '';
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextLeft = (control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    } else {
        control.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextTop = (control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    } else {
        control.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextRight = (control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    } else {
        control.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextBottom = (control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    } else {
        control.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    }
};

/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextClip = (control: BABYLON.GUI.TextBlock, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textWrapping = BABYLON.GUI.TextWrapping.Clip;
    } else {
        control.textWrapping = BABYLON.GUI.TextWrapping.Clip;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextEllipsis = (control: BABYLON.GUI.TextBlock, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textWrapping = BABYLON.GUI.TextWrapping.Ellipsis;
    } else {
        control.textWrapping = BABYLON.GUI.TextWrapping.Clip;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatTextWrap = (control: BABYLON.GUI.TextBlock, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
    } else {
        control.textWrapping = BABYLON.GUI.TextWrapping.Clip;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatHeight = (control: BABYLON.GUI.Control, value) => {
    // control.height = 1;
    if (value !== ATTR_FORMAT_FLAG) {
        control.height = computePixiAttrValue(value);
    } else {
        control.height = 1;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatWidth = (control: BABYLON.GUI.Control, value) => {
    // control.width = 1;
    if (value !== ATTR_FORMAT_FLAG) {
        control.width = computePixiAttrValue(value);
    } else {
        control.width = 1;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatImage = (control: BABYLON.GUI.Control, value: string) => {
    // tslint:disable-next-line:prefer-const
    let url: string, resTab: ResTab;

    let widget  = (<IPiWidgetControl>control).pi_widget;

    if (widget === undefined) {
        widget = (<IPiWidgetContainer>control.parent).pi_widget;
    }

    if (widget !== undefined) {
        resTab = widget.resTab;
    }

    if (resTab === undefined) {
        resTab = Widget.ImageResTab;
    }

    url = '';

    if (value.indexOf('undefined') >= 0 || value.indexOf('//') >= 0) {
        console.error(`图片路径错误: ${value}`);

        return;
    }

    if (value !== ATTR_FORMAT_FLAG) {

        url = value[0] !== '/' ? `${GUIPARAMS.GUIImagePath}${value}` : value;

        if (value[0] === '/') {
            url = url.substring(1,url.length);
        }

        resTab.load(
            `${BABYLON_IMAGE_TYPE}:${url}`, 
            BABYLON_IMAGE_TYPE, 
            url, 
            resTab,  
            (domImage: ImageRes) => {
                if ((<BABYLON.GUI.Image>control).domImage !== domImage.link) {
                    (<BABYLON.GUI.Image>control).domImage = domImage.link;
                }
            }
        );

    } else {

        (<BABYLON.GUI.Image>control).source = url;

    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatPaddingLeft = (control: BABYLON.GUI.Control, value) => {
    // control.paddingLeft = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.paddingLeft = computePixiAttrValue(value);
    } else {
        control.paddingLeft = 0;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatPaddingTop = (control: BABYLON.GUI.Control, value) => {
    // control.paddingTop = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.paddingTop = computePixiAttrValue(value);
    } else {
        control.paddingTop = 0;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatPaddingRight = (control: BABYLON.GUI.Control, value) => {
    // control.paddingRight = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.paddingRight = computePixiAttrValue(value);
    } else {
        control.paddingRight = 0;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 属性值 
 */
const _formatPaddingBottom = (control: BABYLON.GUI.Control, value) => {
    // control.paddingBottom = 0;
    if (value !== ATTR_FORMAT_FLAG) {
        control.paddingBottom = computePixiAttrValue(value);
    } else {
        control.paddingBottom = 0;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 */
const _formatStretchExtend = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_EXTEND;
    } else {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NONE;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 */
const _formatStretchFill = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_FILL;
    } else {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NONE;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 */
const _formatStretchNone = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NONE;
    } else {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NONE;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 */
const _formatStretchUniform = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    } else {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NONE;
    }
};
const _formatStretchNinePatch = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NINE_PATCH;
    } else {
        (<BABYLON.GUI.Image>control).stretch = BABYLON.GUI.Image.STRETCH_NONE;
    }
};

const _formatMaxWidth = (control: BABYLON.GUI.Control, value: any) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.InputText>control).maxWidth = computePixiAttrValue(value);
    } else {
        (<BABYLON.GUI.InputText>control).maxWidth = 1;
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _up = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.onPointerUpObservable.clear();
        control.onPointerUpObservable.add(value);
    } else {
        control.onPointerUpObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _down = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.onPointerDownObservable.clear();
        control.onPointerDownObservable.add(value);
    } else {
        control.onPointerDownObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _enter = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.onPointerEnterObservable.clear();
        control.onPointerEnterObservable.add(value);
    } else {
        control.onPointerEnterObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _out = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.onPointerOutObservable.clear();
        control.onPointerOutObservable.add(value);
    } else {
        control.onPointerOutObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _click = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.onPointerClickObservable.clear();
        control.onPointerClickObservable.add((e: any, s: BABYLON.EventState) => {
            if (!(<IPISceneWithEventInfo>(<any>control._host.getScene())).PI_SceneEventInfo.isMoveAction) {
                value && value(e, s);
            }
        });
    } else {
        control.onPointerClickObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _move = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        control.onPointerMoveObservable.clear();
        control.onPointerMoveObservable.add(value);
    } else {
        control.onPointerMoveObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _textChanged = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.InputText>control).onTextChangedObservable.clear();
        (<BABYLON.GUI.InputText>control).onTextChangedObservable.add(value);
    } else {
        (<BABYLON.GUI.InputText>control).onTextChangedObservable.clear();
    }
};
/**
 * Control 属性设置
 * @param control 目标节点
 * @param value 响应函数
 */
const _blur = (control: BABYLON.GUI.Control, value) => {
    if (value !== ATTR_FORMAT_FLAG) {
        (<BABYLON.GUI.InputText>control).onBlurObservable.clear();
        (<BABYLON.GUI.InputText>control).onBlurObservable.add(value);
    } else {
        (<BABYLON.GUI.InputText>control).onBlurObservable.clear();
    }
};

const _useBitmapCache = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        (<any>control).useBitmapCache = value;
    } else {
        (<any>control).useBitmapCache = false;
    }
};

const _displayLimitLeft = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        (<any>control).displayLimitLeft = value / GUIPARAMS.HardwareScalingLevel;
    } else {
        (<BABYLON.GUI.Container>control).displayLimitLeft = 0;
    }
};
const _displayLimitTop = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        (<any>control).displayLimitTop = value / GUIPARAMS.HardwareScalingLevel;
    } else {
        (<BABYLON.GUI.Container>control).displayLimitTop = 0;
    }
};
const _displayLimitWidth = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        (<any>control).displayLimitWidth = value / GUIPARAMS.HardwareScalingLevel;
    } else {
        (<BABYLON.GUI.Container>control).displayLimitWidth = 0;
    }
};
const _displayLimitHeight = (control: BABYLON.GUI.Control, value) => {
    
    if (value !== ATTR_FORMAT_FLAG) {
        (<any>control).displayLimitHeight = value / GUIPARAMS.HardwareScalingLevel;
    } else {
        (<BABYLON.GUI.Container>control).displayLimitHeight = 0;
    }
};
/**
 * 控件类型
 */
// const UITypeEnum = {
//     Grid: 'Grid',
//     Container: 'Container',
//     StackPanel: 'StackPanel',
//     Image: 'Image',
//     TextBlock: 'TextBlock',
//     ImageButton: 'ImageButton',
//     SimpleButton: 'SimpleButton',
//     ImageOnlyButton: 'ImageOnlyButton',
//     ImageWithCenterTextButton: 'ImageWithCenterTextButton',
// }

/**
 * 简单控件
 */
const UIType1 = ['TextBlock', 'Container', 'StackPanel', 'Rectangle', 'InputText', 'InputPassword', 'Grid', 'Line', 'Ellipse'];
/**
 * 图片控件
 */
const UIType2 = ['Image'];
/**
 * 按钮控件
 * _image           图片
 * _textBlock       文本
 * 
 * ImageButton      左 20% Image, 右 80% TextBlock
 * SimpleButton:    文本居中
 * ImageOnlyButton: 图片充满
 * ImageWithCenterTextButton: 图片充满 & 文本居中
 */
const UITypeButton = ['ImageButton', 'SimpleButton', 'ImageOnlyButton', 'ImageWithCenterTextButton'];

/**
 * Button控件创建方法
 */
const UIButtonCreate = {
    [UITypeButton[0]]: (cfg) => {
        const control  = BABYLON.GUI.Button.CreateImageButton(
            cfg.name, 
            cfg.text, 
            cfg.image[0] !== '/' ? `${GUIPARAMS.GUIImagePath}cfg.image` : cfg.image
        );
        if ((<any>control).image === undefined) {
            (<any>control).image = control.children[1];
            (<any>control).textBlock = control.children[0];
        }

        return control;
    },
    [UITypeButton[1]]: (cfg) => {
        const control =  BABYLON.GUI.Button.CreateSimpleButton(cfg.name, cfg.text);
        if ((<any>control).textBlock === undefined) {
            (<any>control).textBlock = control.children[0];
        }

        return control;
    },
    [UITypeButton[2]]: (cfg) => {
        const control =  BABYLON.GUI.Button.CreateImageOnlyButton(cfg.name, (cfg.image[0] !== '/' ? `${GUIPARAMS.GUIImagePath}cfg.image` : cfg.image));
        if ((<any>control).image === undefined) {
            (<any>control).image = control.children[0];
        }

        return control;
    },
    [UITypeButton[3]]: (cfg) => {
        const control =  BABYLON.GUI.Button.CreateImageWithCenterTextButton(
            cfg.name, 
            cfg.text, 
            cfg.image[0] !== '/' ? `${GUIPARAMS.GUIImagePath}cfg.image` : cfg.image
        );
        if ((<any>control).image === undefined) {
            (<any>control).image = control.children[0];
            (<any>control).textBlock = control.children[1];
        }

        return control;
    }
};

/**
 * H5节点控件
 */
const UITypeH5 = ['SPAN', 'DIV'];

/**
 * 容器 控件类型
 */
const UITypeContainer = [
    UIType1[1], UIType1[2], UIType1[3], UIType1[6]
];
/**
 * 非容器 控件类型
 */
const UITypeSimple = [
    UIType1[0], UIType1[4], UIType1[5], UIType1[7],
    UIType2[0],
    UITypeButton[0], UITypeButton[1], UITypeButton[2], UITypeButton[3]
];

/**
 * 界面节点类型HS语义化名称与BABYLON节点类型名称映射表
 */
const TransformTypeCfgs = {
    [UITypeH5[0]]: UIType1[0],
    [UITypeH5[1]]: UIType1[1]
};

/**
 * 控件属性
 */

/**
 * Control 属性名 相同，可直接赋值(无单位类型的影响)
 * 
 * alpha:       不透明度
 * background:  背景颜色
 * color:       文本颜色，容器背景颜色, 边框颜色
 * text:        文本内容
 * fontSize:    文本尺寸
 */
const Attr1 = ['alpha', 'background',
    'zIndex', 'scaleX', 'scaleY', 'rotation',
    // 元素状态
    'isVertical', 'isVisible', 'isEnabled',
    // 元素对齐
    'horizontalAlignment', 'verticalAlignment',
    // 元素阴影
    'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY',
    // 容器裁剪
    'clipChildren',
    'margin',
    // 文本属性
    'color', 'fontFamily', 
    // 'fontWeight',
    'lineSpacing', 'outlineColor', 'outlineWidth',
    // 调整以充满容器，类似文本行充满
    'resizeToFit',
    // 文本对齐设置 - 推荐 使用 Attr5 中属性名
    'textHorizontalAlignment', 'textVerticalAlignment',

    // 图片裁剪显示
    'cellId', 'cellHeight', 'cellWidth',
    // 图片控件大小自适应图片资源大小 
    'autoScale',
    // 图片资源截取显示的设置
    'sourceLeft', 'sourceTop', 'sourceWidth', 'sourceHeight',

    // Input 控件
    'placeholderText', 'placeholderColor', 'disabledColor',
    'focusedBackground',

    // line
    'x1', 'x2', 'y1', 'y2',
    'dash', 'lineWidth',
    /**
     * 设置X轴上的变换中心
     */
    'transformCenterX',
    /**
     * 设置y轴上的变换中心
     */
    'transformCenterY',
    'thickness',
    'cornerRadius',
    'name',
    'useDisplayLimit',
    'sliceWidths', 'sourceSliceWidths',
    'textGradientDash',
    'isAnimDraw',
    'maxLength'
];

const AttrDisplayLimit = ['displayLimitLeft', 'displayLimitTop','displayLimitWidth', 'displayLimitHeight'];

const Attr1_1 = [
    'alpha', 'scaleX', 'scaleY'
];

const Attr1_2 = [
    'shadowOffsetX', 'shadowOffsetY'
];

/**
 * Control 属性有多种处理
 * 
 * left:    相对父节点 左边缘定位
 * top:     相对父节点 上边缘定位
 * right:   相对父节点 右边缘定位
 * bottom:  相对父节点 下边缘定位
 * hCenter: 相对父节点 水平方向中部定位
 * vCenter: 相对父节点 垂直方向中部定位
 */
const Attr2 = ['left', 'top', 'right', 'bottom', 'hCenter', 'vCenter', 'linkOffsetX', 'linkOffsetY'];

/**
 * Control 属性有多种单位
 * 
 * 属性值 >  1, 视为 px    单位
 * 属性值 <= 1, 视为 百分比 单位
 * 属性值 =  0, 俩种单位无影响，所以视为 百分比单位
 */
const Attr3 = ['width', 'height', 'maxWidth'];

/**
 * Control 属性名有差异
 * 
 * H5 中 图片路径属性 相对 Babylon 设置资源路径有所差异 
 */
const Attr4 = ['image', 'src', 'z-index', 'z', 'rotate'];
/**
 * Control 属性名简写
 * 
 */
const Attr5 = [
    // 文本对齐， 不设置 则分别有 重置居中，水平居中
    'txtLeft', 'txtTop', 'txtRight', 'txtBottom', 
    // 文本换行
    'txtClip', 'txtEllipsis', 'txtWrap', 'text'
];
/**
 * Control 属性名共用
 */
const Attr6 = ['scale'];
/**
 * Control 属性有多种单位
 * 属性值 >=  1, 视为 px    单位
 * 属性值 < 1, 视为 百分比 单位
 * 属性值 =  0, 俩种单位无影响，所以视为 百分比单位
 */
const Attr7 = ['paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom'];

/**
 * Image 填充模式
 */
const Attr8 = ['stretch_extend', 'stretch_fill', 'stretch_none', 'stretch_uniform', 'stretch_nine_patch'];

const Attr9 = ['fontSize'];

const Attr10 = ['useBitmapCache'];
/**
 * 节点属性映射表
 */
const TransformAttrCfgs = {
    overflow: 'clipChildren'
};
/**
 * 特殊属性设置方法集合
 */
const AttrFunc = {

    [Attr2[0]]: _formatLeft,
    [Attr2[1]]: _formatTop,
    [Attr2[2]]: _formatRight,
    [Attr2[3]]: _formatBottom,
    [Attr2[4]]: _formatHCenter,
    [Attr2[5]]: _formatVCenter,
    [Attr2[6]]: _formatLinkOffX,
    [Attr2[7]]: _formatLinkOffY,

    [Attr3[0]]: _formatWidth,
    [Attr3[1]]: _formatHeight,
    [Attr3[2]]: _formatMaxWidth,

    [Attr4[0]]: _formatImage,
    [Attr4[1]]: _formatImage, // 取消 src 属性支持
    [Attr4[2]]: _formatZ,
    [Attr4[3]]: _formatZ,
    [Attr4[4]]: _formatRotation,

    [Attr5[0]]: _formatTextLeft,
    [Attr5[1]]: _formatTextTop,
    [Attr5[2]]: _formatTextRight,
    [Attr5[3]]: _formatTextBottom,
    [Attr5[4]]: _formatTextClip,
    [Attr5[5]]: _formatTextEllipsis,
    [Attr5[6]]: _formatTextWrap,
    [Attr5[7]]: _formatText,

    [Attr6[0]]: _formatScale,

    [Attr7[0]]: _formatPaddingLeft,
    [Attr7[1]]: _formatPaddingTop,
    [Attr7[2]]: _formatPaddingRight,
    [Attr7[3]]: _formatPaddingBottom,

    [Attr8[0]]: _formatStretchExtend,
    [Attr8[1]]: _formatStretchFill,
    [Attr8[2]]: _formatStretchNone,
    [Attr8[3]]: _formatStretchUniform,
    [Attr8[4]]: _formatStretchNinePatch,

    [Attr9[0]]: _formatFontSize,
    [Attr10[0]]: _useBitmapCache,
    [AttrDisplayLimit[0]]: _displayLimitLeft,
    [AttrDisplayLimit[1]]: _displayLimitTop,
    [AttrDisplayLimit[2]]: _displayLimitWidth,
    [AttrDisplayLimit[3]]: _displayLimitHeight
};

/**
 * Event 绑定处理
 */
const EventFunc = {
    [EventTypeList[0]]: _up,
    [EventTypeList[1]]: _down,
    [EventTypeList[2]]: _enter,
    [EventTypeList[3]]: _out,
    [EventTypeList[4]]: _move,
    [EventTypeList[5]]: _click,
    [EventTypeList[6]]: _textChanged,
    [EventTypeList[7]]: _blur
};

/**
 * button 节点特殊属性 
 */
const AttrButtonSpecial = ['text', 'image'];

const specialAttrButton = (control: BABYLON.GUI.Button, key: string, value: any) => {
    switch (key) {
        case (AttrButtonSpecial[0]) : {
            GUICreator.setControlAttr(control.textBlock, key, value);
            break;
        }
        case (AttrButtonSpecial[1]) : {
            GUICreator.setControlAttr(control.image, key, value);
            break;
        }
        // tslint:disable-next-line:no-empty
        default: {
        }
    }
};

// tslint:disable-next-line:max-func-body-length
const patchBabylonControls = () => {
    // PatchBabylonControlMap.set(
    //     'Container',
    //     (name?: string) => {
    //         return new Container(name);
    //     }
    // );

    // 控件释放子组件处理
    // const old = BABYLON.GUI.Container.prototype.dispose;
    // BABYLON.GUI.Container.prototype.dispose = function () {

    //     // tslint:disable-next-line:no-invalid-this
    //     for (let i = this.children.length - 1; i >= 0; i--) {
    //         // tslint:disable-next-line:no-invalid-this
    //         this.children[i].dispose();
    //     }

    //     // tslint:disable-next-line:no-invalid-this
    //     this.children.length = 0;

    //     // tslint:disable-next-line:no-invalid-this
    //     old.call(this);
    // };

    // 文本换行处理
    (<any>BABYLON.GUI.TextBlock.prototype)._parseLineWordWrap = (line: string = '', width: number,
        context: CanvasRenderingContext2D): object[] => {
        const lines = [];
        const words = line.split('');
        let lineWidth = 0;

        for (let n = 0; n < words.length; n++) {
            const testLine = n > 0 ? `${line}${words[n]}` : words[0];
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > width && n > 0) {
                lines.push({ text: line, width: lineWidth });
                line = words[n];
                lineWidth = context.measureText(line).width;
            } else {
                lineWidth = testWidth;
                line = testLine;
            }
        }
        lines.push({ text: line, width: lineWidth });

        return lines;
    };

    // 文本样式解析  - 默认字体
    // tslint:disable-next-line:cyclomatic-complexity
    // BABYLON.GUI.Control._GetFontOffset = (font: string): { ascent: number; height: number; descent: number } => {
    //     let ascent: number = 13, height: number = 17, descent: number = 4;
    //     let fontSize: number, result: { ascent: number; height: number; descent: number };
    //     let fontWeight: string;
    //     const fontArr = font.split(' ');
    //     const weightList = ['100','200','300','400','500','600','700','800'];

    //     for (let len = fontArr.length - 1; len >= 0; len--) {
    //         const temp = fontArr[len];

    //         if (temp.length > 2) {

    //             if (fontSize === undefined) {
    //                 const tempSize = temp.substring(0, temp.length - 2);
    //                 const size = (<any>tempSize) - 0;
    //                 if (!isNaN(size)) {
    //                     fontSize = size;
    //                 }
    //             }

    //             if (fontWeight === undefined) {
    //                 let tempWeight;
    //                 if (temp === 'normal')          tempWeight = '400';
    //                 else if (temp === 'bold')       tempWeight = '600';
    //                 else if (temp === 'bolder')     tempWeight = '800';
    //                 else if (temp === 'lighter')    tempWeight = '200';
    //                 else if (weightList.indexOf(temp) >= 0) {
    //                     tempWeight = temp;
    //                 }

    //                 const index = weightList.indexOf(tempWeight);
    //                 fontWeight = index < 0 ? undefined : index <= 3 ? 'BOLD' : 'LIGHT';
    //             }

    //             if (fontWeight !== undefined && fontSize !== undefined) {
    //                 break;
    //             }
    //         }
    //     }

    //     fontWeight = fontWeight === undefined ? 'BOLD' : fontWeight;

    //     if (fontSize) {
    //         ascent = fontSize < 12
    //                         ? 13
    //                         : fontSize < 26
    //                             ? fontSize + 1
    //                             : fontSize < 42
    //                                 ? fontSize + 2
    //                                 : fontSize + 3;

    //         descent = fontSize < 18
    //                         ? 4
    //                         : Math.floor((fontSize - 18) / 4) + 5;

    //         if (fontWeight === 'LIGHT') {
    //             ascent = ascent - 1;
    //             descent = descent + 1;
    //         }

    //         height  = ascent + descent;
    //     }

    //     result = { ascent, height, descent };

    //     (<any>(BABYLON.GUI.Control))._FontHeightSizes[font] = result;
                
    //     return result;
    // };
    
    // 文本样式解析 - hbyy
    // tslint:disable-next-line:cyclomatic-complexity
    BABYLON.GUI.Control._GetFontOffset = (font: string): { ascent: number; height: number; descent: number } => {
        let ascent: number = 13, height: number = 17, descent: number = 4;
        let fontSize: number, result: { ascent: number; height: number; descent: number };
        let fontWeight: string;
        const fontArr = font.split(' ');
        const weightList = ['100','200','300','400','500','600','700','800'];

        for (let len = fontArr.length - 1; len >= 0; len--) {
            const temp = fontArr[len];

            if (temp.length > 2) {

                if (fontSize === undefined) {
                    const tempSize = temp.substring(0, temp.length - 2);
                    const size = (<any>tempSize) - 0;
                    if (!isNaN(size)) {
                        fontSize = size;
                    }
                }

                if (fontWeight === undefined) {
                    let tempWeight;
                    if (temp === 'normal')          tempWeight = '400';
                    else if (temp === 'bold')       tempWeight = '600';
                    else if (temp === 'bolder')     tempWeight = '800';
                    else if (temp === 'lighter')    tempWeight = '200';
                    else if (weightList.indexOf(temp) >= 0) {
                        tempWeight = temp;
                    }

                    const index = weightList.indexOf(tempWeight);
                    fontWeight = index < 0 ? undefined : index <= 3 ? 'BOLD' : 'LIGHT';
                }

                if (fontWeight !== undefined && fontSize !== undefined) {
                    break;
                }
            }
        }

        fontWeight = fontWeight === undefined ? 'BOLD' : fontWeight;

        if (fontSize) {

            descent = fontSize < 30
                            ? 4
                            : fontSize < 35
                                    ? 5
                                    : fontSize < 38
                                        ? 6
                                        : 7;
    
            ascent = fontSize < 20
                            ? fontSize - descent + 2
                            : fontSize - descent + 1;

            if (fontWeight === 'LIGHT') {
                ascent = ascent - 1;
                descent = descent + 1;
            }

            height  = ascent + descent;
        }

        result = { ascent, height, descent };

        (<any>(BABYLON.GUI.Control))._FontHeightSizes[font] = result;
                
        return result;
    };
};

patchBabylonControls();