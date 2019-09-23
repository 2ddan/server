
/**
 * 上下文节点
 * * 对应 document
 * * 节点操作接口
 * * 事件处理
 * * 渲染控制
 * * 调试控制
 */

import { ListenerList } from '../util/event';
import { AnimationControl } from './animation';
import { gui } from './gui';
import { RContainerElement } from './r_containerelement';
import { GUIRenderFlags, GUIViewOption, RElementType, RElementTypeList } from './r_datastruct';
import { RElement } from './r_element';
import { REventManager } from './r_event';
import { REventData, REventListener, REventTypes } from './r_event_base';
import { RImageElement } from './r_imageelement';
import { RInputText } from './r_inputtext';
import { RTextArea } from './r_textarea';
import { RTextElement } from './r_textelement';

import { REventLimiter } from './r_event_limiter';
import { RSheet } from './r_sheet';
import { RStyle } from './r_style';
import { initShaders } from './shader_init';
import { Tools } from './tools';

/**
 * GUI 上下文
 */
export class RDocument {
    /**
     * JS 层设置脏
     */
    public get layoutDirty() {
        return this._layoutDirty;
    }

    /**
     * JS 层设置脏
     */
    public set layoutDirty(b: boolean) {
        this._layoutDirty = b;
    }
    /**
     * 渲染模式
     */
    public readonly RenderFlag: number;
    /**
     * 渲染循环的帧句柄 - 暂未用
     */
    public readonly renderFrame: any;
    /**
     * 渲染层创建的上下文实例
     */
    public readonly uniqueID :      gui.GUIInstance;
    /**
     * 对应 DOM body - 上下文根节点
     */
    public readonly body:           RContainerElement;
    /**
     * 渲染容器 - 
     */
    public readonly canvas:         HTMLCanvasElement;
    /**
     * 渲染上下文
     */
    public readonly gl:             WebGLRenderingContext;
    /**
     * 渲染层创建的渲染引擎实例
     */
    public readonly engine:         gui.u32;
    /**
     * 子节点列表
     */
    public readonly childNodes:     RElement[] = [];
    /**
     * 事件管理
     */
    public readonly eventMgr:       REventManager;
    /**
     * 事件响应限制
     */
    public readonly eventLimit: REventLimiter;
    /**
     * 节点堆
     */
    public readonly elementMap:     Map<number, RElement> = new Map();
    /**
     * 上下文根上的事件监听列表
     */
    public readonly upCaps:      ListenerList<REventData> = new ListenerList();
    /**
     * 上下文根上的事件监听列表
     */
    public readonly downCaps:    ListenerList<REventData> = new ListenerList();
    /**
     * 上下文根上的事件监听列表
     */
    public readonly moveCaps:    ListenerList<REventData> = new ListenerList();
    /**
     * 上下文的 渲染 - 显示 配置
     */
    public readonly viewOption:  GUIViewOption;
    /**
     * 当前渲染启动时的时间戳
     */
    public timeStamp: number;
    /**
     * 是否开启命中检查 - 高亮节点矩形信息
     */
    public debug: boolean       = false;
    /**
     * GUI 更新时是否始终设置脏
     */
    public dirtyDebug: boolean  = false;
    /**
     * 节点插入时的检测是否抛出异常
     */
    public appendDebug: boolean = false;
    /**
     * 是否 隔离 gui 库接口的调用
     */
    public debugUseLIB: boolean = true;
    /**
     * 渲染层资源释放延时
     */
    public resTimeOut: number   = 3000;
    /**
     * 全局样式表
     */
    public readonly sheet: RSheet;
    /**
     * FPS 帧率显示
     */
    private FPSDom: HTMLSpanElement;
    /**
     * 保留的上一帧时间戳
     */
    private lastFPSTime: number = 0;
    /**
     * JS 层脏标记
     */
    private _layoutDirty: boolean = true;
    /**
     * 渲染循环计数
     */
    private _renderCount: number = 0;
    /**
     * 调试时 调试高亮显示节点
     */
    private _debugLayer: RElement;
    /**
     * 可滚动节点的记录
     */
    private _scrollEles: Map<number, RContainerElement> = new Map();

    constructor(canvas: HTMLCanvasElement, fbo: WebGLFramebuffer, opt: GUIViewOption, renderFlag: number = GUIRenderFlags.BIND) {
        
        this.viewOption = opt || {
            left: 0,
            top: 0,
            width: canvas.width,
            height: canvas.height,
            clearColor: '#000000'
        };

        this.RenderFlag = renderFlag;
        this.eventMgr   = new REventManager(this);
        this.eventLimit = new REventLimiter(this);

        this.canvas     = canvas;
        this.gl         = this.canvas.getContext('webgl');
        
        // 底层创建上下文接口
        (<any>window).__gl  = this.gl;
        (<any>window).__fbo = fbo || undefined;
        this.engine         = gui._create_engine(this.resTimeOut);

        // 为底层初始化Shader
        initShaders(this.engine);

        this.uniqueID   = this.createDocument();
        this.body       = this.createBody();

        this.sheet = new RSheet(this);

        this.createFPS();
    }
    /**
     * 获取目标节点 底层信息
     * @param _doc 目标上下文标识
     * @param id 目标节点标识
     */
    public static nodeInfo(_doc: number, id: number) {
        gui._node_info(_doc, id);
        // tslint:disable-next-line:no-unnecessary-local-variable
        const res = (<any>window).__jsObj;
        Tools.log(res);

        return res;
    }
    public afterDisplayDebugLayer = (node: RElement) => {
        //
    }
    public askWidgetEnableCall: (ele: RElement) => Boolean = (ele: RElement) => {
        return true;
    }
    /**
     * 应用目标样式
     * @param s 目标样式
     * @param key 样式键
     * @param value 样式值
     */
    public applyStyle(s: RStyle, key: string, value: any) {
        // s[`set${key}`] && s[`set${key}`](value);
        s[key] = value;

        return this;
    }

    /**
     * 获取目标样式
     * @param s 目标样式
     * @param key 样式键
     */
    public readStyle(s: RStyle, key: string) {
        // if (s[`get${key}`]) {
        //     return s[`get${key}`]();
        // } else {
        //     return ;
        // }

        return s[key];
    }
    /**
     * 上下文渲染接口
     */
    public render = () => {
        this._renderCount++;
        this.timeStamp = Date.now();
        if (this.timeStamp - this.lastFPSTime > 500) {
            this.renderFps(Math.ceil(this._renderCount * 2 * 500 / (this.timeStamp - this.lastFPSTime)));
            this.lastFPSTime = this.timeStamp;
            this._renderCount = 0;
        }

        // 动画循环
        AnimationControl.loop();

        // gui 强制脏
        this.dirtyDebug && gui._set_render_dirty(this.uniqueID);

        // 调试节点 高亮 隐藏
        !this.debug && this.hiddenDebugLayer();

        // 检查激活 scroll 的节点的状态
        this.checkScrollEles();

        // gui 渲染调用
        gui._render((<gui.GUINode>this.uniqueID));

        this.layoutDirty = false;
        
        // 全局通信对象重置
        (<any>window).__jsObj = undefined; 
    }
    /**
     * 手动执行布局
     */
    public layout() {
        this._layoutDirty === true && gui._cal_layout(this.uniqueID);
        this._layoutDirty = false;
    }
    
    /**
     * 创建指定类型节点
     * - 向 DOM createElement 接口对齐
     * * 1. 创建指定类型节点
     * * 2. 记录创建的节点
     * @param _type 节点类型
     */
    public createElement(_type: RElementType): RElement {
        let ele: RElement;

        // 1. 创建指定类型节点
        switch (_type) {
            case RElementTypeList.DIV: {
                ele = new RContainerElement({ document: this , RenderFlag: this.RenderFlag });
                break;
            }
            case RElementTypeList.IMAGE: {
                ele = new RImageElement({ document: this , RenderFlag: this.RenderFlag });
                break;
            }
            case RElementTypeList.SPAN: {
                ele = new RTextElement({ document: this , RenderFlag: this.RenderFlag });
                break;
            }
            case RElementTypeList.textarea: {
                ele = new RTextArea({ document: this , RenderFlag: this.RenderFlag });
                break;
            }
            case RElementTypeList.input: {
                ele = new RInputText({ document: this , RenderFlag: this.RenderFlag });
                break;
            }
            default:
        }

        // 2. 记录创建的节点
        if (ele) {
            this.elementMap.set(ele.uniqueID, ele);
        }

        // Tools.log('Create Element', ele.uniqueID);

        return ele;
    }
    /**
     * 节点销毁调用
     * @param ele 目标节点
     * * 节点移除前调用，清除节点在根上的记录
     * * 仅 RElement.remove 调用
     */
    public destroyElement(ele: RElement) {
        if (ele) {
            this.elementMap.delete(ele.uniqueID);
        }
    }
    /**
     * 添加全局事件监听
     * @param _type 监听类型
     * @param _listener 监听函数
     * @param isCap 是否在捕获期执行
     */
    public addCapEventListener(_type: REventTypes, _listener: REventListener, isCap: boolean = true) {
        switch (_type) {
            case (REventTypes.up) : {
                this.upCaps.add(_listener);
                break;
            } 
            case (REventTypes.down) : {
                this.downCaps.add(_listener);
                break;
            }
            case (REventTypes.move) : {
                this.moveCaps.add(_listener);
                break;
            }
            default:
        }
    }

    /**
     * 移除全局事件监听
     * @param _type 监听类型
     * @param _listener 监听函数
     * @param isCap 是否在捕获期执行
     */
    public removeCapEventListener(_type: REventTypes, _listener: REventListener, isCap: boolean) {
        switch (_type) {
            case (REventTypes.up) : {
                this.upCaps.remove(_listener);
                break;
            } 
            case (REventTypes.down) : {
                this.downCaps.remove(_listener);
                break;
            }
            case (REventTypes.move) : {
                this.moveCaps.remove(_listener);
                break;
            }
            default:
        }
    }

    /**
     * 根上 down 事件触发
     * * 1. 捕获处理
     * * 2. 冒泡响应
     */
    public downFire = (e: PointerEvent) => {
        if (!this.eventLimit.checkForbid(e.clientX, e.clientY)) {
            // 1. 捕获处理
            const evt = this.eventMgr.getEventData(e);
            this.downCaps.notify(evt);
    
            // 2. 冒泡响应
            if (!evt.stopPropagation) {
                this.eventMgr.downFire(e);
            }
        }
    }
    /**
     * 根上 up 事件触发
     * * 1. 捕获处理
     * * 2. 冒泡响应
     */
    public upFire = (e: PointerEvent) => {
        if (!this.eventLimit.checkForbid(e.clientX, e.clientY)) {
            // 1. 捕获处理
            const evt = this.eventMgr.getEventData(e);
            this.upCaps.notify(evt);

            // 2. 冒泡响应
            // if (!evt.stopPropagation) {
            this.eventMgr.upFire(e);
            // }
        }
    }
    /**
     * 根上 move 事件触发
     * * 1. 捕获处理
     * * 2. 冒泡响应
     */
    public moveFire = (e: PointerEvent) => {
        if (!this.eventLimit.checkForbid(e.clientX, e.clientY)) {
            // 1. 捕获处理
            const evt = this.eventMgr.getEventData(e);
            this.moveCaps.notify(evt);

            // 2. 冒泡响应
            if (!evt.stopPropagation) {
                this.eventMgr.moveFire(e);
            } else {
                if (this.debug) {
                    this.eventMgr.pickResult(evt);
                }
            }
        }
    }

    /**
     * 滑轮事件响应
     */
    public wheelFire = (e: WheelEvent) => {
        if (!this.eventLimit.checkForbid(e.clientX, e.clientY)) {
            // 2. 冒泡响应
            this.eventMgr.wheelFire(e);
        }
    }

    /**
     * 渲染 调试的目标节点的 调试信息
     * @param ele 目标节点
     */
    public renderDebugLayer(ele?: RElement) {
        this.hiddenDebugLayer();
        if (this.debug) {
            this.createDebugLayer();
            if (ele) {
                this.displayDebugLayer(ele);
                Tools.log(ele);
                RDocument.nodeInfo(this.uniqueID, ele.uniqueID);
                (<any>window).debugNode = ele;
                this.afterDisplayDebugLayer(ele);
            }
        }
    }

    /**
     * 添加激活 scroll 的节点记录
     */
    public addScrollEle(ele: RContainerElement) {
        this._scrollEles.set(ele.uniqueID, ele);
    }

    /**
     * 移除激活 scroll 的节点记录
     */
    public removeScrollEle(ele: RContainerElement) {
        this._scrollEles.delete(ele.uniqueID);
    }

    /**
     * 执行激活 scroll 的节点 在渲染前的检查
     */
    public checkScrollEles() {
        this._scrollEles.forEach(ele => {
            ele.checkScroll();
        });
    }

    /**
     * 创建上下文 - canvas 全屏
     */
    private createDocument() {
        const _doc = gui._create_gui(this.engine, this.canvas.width, this.canvas.height);

        const rgba = Tools.backgroundColor(this.viewOption.clearColor);

        // 设置 GUI 清屏颜色
        gui._set_clear_color(_doc, rgba[0], rgba[1], rgba[2], rgba[3]);

        return _doc;
    }

    /**
     * 创建 body 节点
     * * 项目指定显示范围
     */
    private createBody() {
        const ele = <RContainerElement>this.createElement(`div`); 
        const s = ele.style;
        
        this.applyStyle(s, 'left',`${this.viewOption.left}px`)
            .applyStyle(s, 'top',`${this.viewOption.top}px`)
            .applyStyle(s, 'width',`${this.viewOption.width}px`)
            .applyStyle(s, 'height',`${this.viewOption.height}px`)
            .applyStyle(s, 'position',`absolute`);

        gui._append_child(this.uniqueID, ele.uniqueID, 1); // 父节点为 document 特殊处理

        return ele;
    }

    /**
     * 创建 FPS 显示
     */
    private createFPS() {
        try {
            const div = document.createElement('div');
            div.style.cssText = 'position:absolute;width:60px;height:26px;top:0;left:0;z-index:1000000;';
            const bg = document.createElement('div');
            bg.style.cssText = 'position:absolute;width:60px;height:26px;top:0;left:0;backkground-color:#ddd;opacity:0.8;';

            this.FPSDom = document.createElement('span');
            this.FPSDom.style.cssText = 'position:absolute;width:60px;height:26px;font-size:20px;font-weight:bold;color:#e00;';

            document.body.appendChild(div);
            div.appendChild(bg);
            div.appendChild(this.FPSDom);
        } catch (error) {
            this.FPSDom = undefined;
        }
    }
    private renderFps(time: number) {
        if (this.FPSDom) {
            this.FPSDom.textContent = `${time}-FPS`;
        }
    }
    /**
     * 创建调试节点
     */
    private createDebugLayer() {
        if (this._debugLayer === undefined) {
            this._debugLayer = new RContainerElement({ document: this , RenderFlag: this.RenderFlag });
            
            const a = this._debugLayer.style;

            this.applyStyle(a, 'position', 'absolute')
                .applyStyle(a, 'borderColor', '#0e20ff')
                .applyStyle(a, 'borderWidth', '2px')
                .applyStyle(a, 'backgroundColor', '#5cb3cc77')
                .applyStyle(a, 'left', '-10px')
                .applyStyle(a, 'top', '-10px')
                .applyStyle(a, 'width', '10px')
                .applyStyle(a, 'height', '10px');

            this._debugLayer.enabled(1);
            this.hiddenDebugLayer();
            gui._append_child(this.uniqueID, this._debugLayer.uniqueID, 1);
        }
    }
    private displayDebugLayer(ele: RElement) {
        const [l,t,w,h] = ele.getScreenInfo();
        const a = this._debugLayer.style;

        this.applyStyle(a, 'display', 'flex')
            .applyStyle(a, 'left', `${l}px`)
            .applyStyle(a, 'top', `${t}px`)
            .applyStyle(a, 'width', `${w}px`)
            .applyStyle(a, 'height', `${h}px`);
    }
    private hiddenDebugLayer() {
        if (this._debugLayer) {
            this.applyStyle(this._debugLayer.style, 'display', 'none');
        }
    }
}