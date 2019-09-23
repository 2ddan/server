/**
 * gui 节点基类
 */
import { ListenerList } from '../util/event';
import { EnabledTypes, LengthUnitType, YGDisplay } from './enum';
import { gui } from './gui';
import { RAttr } from './r_attribute';
import { RContainerElement } from './r_containerelement';
import { GUIImageResCfg, RElementType } from './r_datastruct';
import { RDocument } from './r_document';
import { ListenerListMgr, REventData, REventListener, REventTypes } from './r_event_base';
import { RStyle } from './r_style';
import { Tools } from './tools';

/**
 * 节点创建配置
 */
export interface RElementOpt {
    document: RDocument;
    /**
     * 节点的渲染数据
     */
    uniqueID?: gui.GUINode;
    /**
     * 渲染模式
     */
    RenderFlag?: number;
}

type DefaultStyleList = [string[], string[], string[]];
const DefaultStyleType = { div: 0, span: 1, img: 2 };

/**
 * 基础节点结构
 */
export class RElement {
    public get value() {
        return this._value;
    }
    public set value(v: any) {
        this._value = v;
    }
    public get className() {
        return ; // return gui._class_name(this._u32);
    }
    public set className(data: string) {
        gui._set_class_name(this.document.uniqueID, (this.uniqueID), data);
    }
    public get display() {
        // return this.style.display !== YGDisplay.YGDisplayNone;
        return  this.document.readStyle(this.style, 'display') !== YGDisplay.YGDisplayNone;
    }
    public set display(b: boolean | string) {
        if (typeof b === 'string') {
            this.document.applyStyle(this.style, 'display', b);
        } else {
            this.document.applyStyle(this.style, 'display', b ? YGDisplay.YGDisplayFlex : YGDisplay.YGDisplayNone);
        }
    }

    /**
     * 在整个页面全局的显示 left
     */
    public get screenX() {
        this.getScreenInfo();

        return this._screenX;
    }

    /**
     * 在整个页面全局的显示 top
     */
    public get screenY() {
        this.getScreenInfo();

        return this._screenY;
    }
    /**
     * 在整个页面全局的显示 left
     */
    public get screenW() {
        this.getScreenInfo();

        return this._screenW;
    }

    /**
     * 在整个页面全局的显示 top
     */
    public get screenH() {
        this.getScreenInfo();

        return this._screenH;
    }

    public get width() {
        this.document.layout();
        this._width     = gui._offset_width(this.document.uniqueID, this.uniqueID);

        return this._width;
    }

    public get height() {
        this.document.layout();
        this._height    = gui._offset_height(this.document.uniqueID, this.uniqueID);
        
        return this._height;
    }
    /**
     * 节点内容宽高
     */
    public get contentWidth() {
        // if (this.document.layoutDirty) {
        this.document.layout();
        // } else {
        //     // 需要确保 render 循环时置 (<any>window).__jsObj = undefined; 
        //     if ((<any>window).__jsObj && (<any>window).__jsObj.width !== undefined) {
        //         return this._width;
        //     }
        // }
        this._contentWidth     = 0;
        (<any>window).__jsObj = {};
        gui._content_box(this.document.uniqueID, this.uniqueID);
        this._contentWidth     = (<any>window).__jsObj.width;
        this._contentHeight    = (<any>window).__jsObj.height;

        return this._contentWidth;
    }

    /**
     * 节点内容宽高
     */
    public get contentHeight() {
        // if (this.document.layoutDirty) {
        this.document.layout();
        // } else {
        //     // 需要确保 render 循环时置 (<any>window).__jsObj = undefined; 
        //     if ((<any>window).__jsObj && (<any>window).__jsObj.height !== undefined) {
        //         return this._height;
        //     }
        // }
        this._contentHeight    = 0;
        (<any>window).__jsObj = {};
        gui._content_box(this.document.uniqueID, this.uniqueID);
        this._contentWidth     = (<any>window).__jsObj.width;
        this._contentHeight    = (<any>window).__jsObj.height;

        return this._contentHeight;
    }

    /**
     * 节点在 GUI 整棵节点树中的层级
     */
    public get level() {
        return this._level;
    }
    
    /**
     * 节点是否已销毁
     */
    public get isDestroy() {
        return this._isDestroy;
    }
    public get opt() {
        return this._opt;
    }
    public get style() {
        return this._style;
    }
    public get document() {
        return this._document;
    }
    /**
     * 节点创建时需要设置的默认属性列表
     */
    private static defaultStyleList: DefaultStyleList = [[],[],[]];
    /**
     * 节点类型
     */
    public _type: string;
    /**
     * 节点在渲染层的唯一标识
     */
    public readonly uniqueID:   gui.GUINode;
    /**
     * 节点属性
     */
    public attributes:         RAttr;
    /**
     * 所属 虚拟节点 // todo link
     */
    public virtual: any;
    /**
     * 所属 父节点
     */
    public parentNode: RContainerElement;
    /**
     * 图片加载接口
     */
    public loadImageCall: (src: string, cb: (cfg: GUIImageResCfg) => void) => void;
    /**
     * 节点在 GUI 整棵节点树中的层级
     */
    protected _level: number = 0;
    protected _value: any;
    /**
     * 目标图片内容尺寸
     */
    protected _imageWidth: number;
    /**
     * 目标图片内容尺寸
     */
    protected _imageHeight: number;
    /**
     * 目标图片内容在目标图片文件中起点
     */
    protected _imageLeft: number;
    /**
     * 目标图片内容在目标图片文件中起点
     */
    protected _imageTop: number;
    /**
     * 源图片文件尺寸
     */
    protected _srcImageWidth: number;
    /**
     * 源图片文件尺寸
     */
    protected _srcImageHeight: number;
    /**
     * 节点是否销毁
     */
    protected _isDestroy: boolean = false;
    /**
     * 节点的创建参数
     */
    private _opt:        RElementOpt;
    /**
     * 节点样式
     */
    private _style:      RStyle;
    /**
     * 所属 上下文
     */
    private _document: RDocument;
    
    private upListener:         ListenerList<REventData>;
    private downListener:       ListenerList<REventData>;
    private clickListener:      ListenerList<REventData>;
    private moveListener:       ListenerList<REventData>;
    private longTapListener:    ListenerList<REventData>;
    private dbclickListener:    ListenerList<REventData>;
    private multiListener:      ListenerList<REventData>;
    private scrollListener:     ListenerList<REventData>;
    private blurListener:       ListenerList<REventData>;
    private focusListener:      ListenerList<REventData>;
    /**
     * 在整个页面全局的显示宽度
     */
    private _width: number;
    /**
     * 在整个页面全局的显示高度
     */
    private _height: number;
    /**
     * 在整个页面全局的显示 left
     */
    private _screenX: number;
    /**
     * 在整个页面全局的显示 top
     */
    private _screenY: number;
    /**
     * 在整个页面全局的显示 width
     */
    private _screenW: number;
    /**
     * 在整个页面全局的显示 hieght
     */
    private _screenH: number;
    private _contentHeight: number;
    private _contentWidth: number;

    protected constructor(opt: RElementOpt) {
        this._opt       = opt;
        this.uniqueID   = opt.uniqueID;
        this._document  = opt.document;
        
        this._style     = RStyle.create(this);
        this.attributes = new RAttr(this);

        this._type      = 'ele';
    }
    public static setDefaultStyleList(nodeType: RElementType, keys: string[]) {
        keys.forEach(key => {
            this.defaultStyleList[DefaultStyleType[nodeType]].push(key);
        });
    }
    public static forEachDefaultStyleList(nodeType: RElementType, func: (key: string) => void) {
        const list  = this.defaultStyleList[DefaultStyleType[nodeType]];
        if (list) {
            list.forEach(key => {
                func(key);
            });
        }
    }
    /**
     * 设置节点 attributes
     * @param key 键
     * @param value 值
     */
    public setAttribute(key: string, value: any) { 
        this.attributes[key] = value;
    }

    /**
     * 读取节点 attributes
     * @param key 键
     * @param value 值
     */
    public getAttribute(key: string) {
        return this.attributes[key];
    }

    /**
     * 删除节点 attributes
     * @param key 键
     * @param value 值
     */
    public removeAttribute(key: string) {
        this.attributes[key] = undefined;
    }

    /**
     * 节点相对 屏幕 (canvas) 的矩形信息
     */
    public getBoundingClientRect() {
        const res = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        [res.x, res.y, res.width, res.height] = this.getScreenInfo();

        return res; 
    }
    /**
     * 节点相对 root (root 节点 / body) 的矩形信息
     */
    public getBoundingClientRectRelativeRoot() {
        const res = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        [res.x, res.y, res.width, res.height] = this.getScreenInfo();

        res.x -= this.document.viewOption.left;
        res.y -= this.document.viewOption.top;

        return res; 
    }

    /**
     * 节点移除
     * * 0. 取消在上下文中的引用
     * * 1. 事件清空
     * * 2. 从父节点移除
     * * 3. 解除数据引用
     * * TODO - 和渲染层对接节点销毁
     */
    public remove() {
        // 0. 取消在上下文中的引用
        this.document && this.document.destroyElement(this);

        // 1. 事件清空
        this.clearListener();

        // 2. 从父节点移除
        if (this.parentNode) {
            this.parentNode.removeChild(this);
            this.removeCall();
        } else {
            // 为根节点
            if (this.document) {
                const index = this.document.childNodes.indexOf(this);

                this.document.childNodes.splice(index, 1);
                this.removeCall();
            }
        }

        // 3. 解除数据引用
        this.attributes = undefined;
        // this.virtual    = undefined;
        this.parentNode = undefined;
        this._style     = undefined;
        this._opt       = undefined;
        this._level     = -1;
    }
    /**
     * 添加事件监听
     * @param _type 监听的事件类型
     * @param _listener 监听调用
     */
    // tslint:disable-next-line:cyclomatic-complexity
    public addEventListener(_type: string, _listener: REventListener) {
        switch (_type) {
            case (REventTypes.up) : {
                !this.upListener && (this.upListener = ListenerListMgr.create());
                this.upListener.add(_listener);
                break;
            } 
            case (REventTypes.down) : {
                !this.downListener && (this.downListener = ListenerListMgr.create());
                this.downListener.add(_listener);
                break;
            } 
            case (REventTypes.click) : {
                !this.clickListener && (this.clickListener = ListenerListMgr.create());
                this.clickListener.add(_listener);
                break;
            } 
            case (REventTypes.move) : {
                !this.moveListener && (this.moveListener = ListenerListMgr.create());
                this.moveListener.add(_listener);
                break;
            } 
            case (REventTypes.dbclick) : {
                !this.dbclickListener && (this.dbclickListener = ListenerListMgr.create());
                this.dbclickListener.add(_listener);
                break;
            } 
            case (REventTypes.longTap) : {
                !this.longTapListener && (this.longTapListener = ListenerListMgr.create());
                this.longTapListener.add(_listener);
                break;
            }
            case (REventTypes.multiPointer) : {
                !this.multiListener && (this.multiListener = ListenerListMgr.create());
                this.multiListener.add(_listener);
                break;
            }
            case (REventTypes.scroll) : {
                !this.scrollListener && (this.scrollListener = ListenerListMgr.create());
                this.scrollListener.add(_listener);
                break;
            }
            case (REventTypes.blur) : {
                !this.blurListener && (this.blurListener = ListenerListMgr.create());
                this.blurListener.add(_listener);
                break;
            }
            case (REventTypes.focus) : {
                !this.focusListener && (this.focusListener = ListenerListMgr.create());
                this.focusListener.add(_listener);
                break;
            }
            default:
        }
    }

    /**
     * 移除事件监听
     * @param _type 监听的事件类型
     * @param _listener 监听调用
     */
    public removeEventListener(_type: string, _listener: REventListener) {

        switch (_type) {
            case (REventTypes.up) : {
                this.upListener.remove(_listener);
                break;
            } 
            case (REventTypes.down) : {
                this.downListener.remove(_listener);
                break;
            } 
            case (REventTypes.click) : {
                this.clickListener.remove(_listener);
                break;
            } 
            case (REventTypes.move) : {
                this.moveListener.remove(_listener);
                break;
            } 
            case (REventTypes.dbclick) : {
                this.dbclickListener.remove(_listener);
                break;
            } 
            case (REventTypes.longTap) : {
                this.longTapListener.remove(_listener);
                break;
            }
            case (REventTypes.multiPointer) : {
                this.multiListener.remove(_listener);
                break;
            }
            case (REventTypes.scroll) : {
                this.scrollListener.remove(_listener);
                break;
            }
            case (REventTypes.blur) : {
                this.blurListener.remove(_listener);
                break;
            }
            case (REventTypes.focus) : {
                this.focusListener.remove(_listener);
                break;
            }
            default:
        }
    }

    /**
     * 清空事件监听
     */
    public clearListener() {
        ListenerListMgr.recycle(this.upListener);
        ListenerListMgr.recycle(this.moveListener);
        ListenerListMgr.recycle(this.blurListener);
        ListenerListMgr.recycle(this.downListener);
        ListenerListMgr.recycle(this.clickListener);
        ListenerListMgr.recycle(this.multiListener);
        ListenerListMgr.recycle(this.scrollListener);
        ListenerListMgr.recycle(this.longTapListener);
        ListenerListMgr.recycle(this.dbclickListener);
    }

    /**
     * up 事件响应
     * @param e 事件数据
     */
    public up(e: REventData) {
        Tools.log('up', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        // e.isSendNextLayer = true;

        if (!e.isOnlyBubble) {
            try {
                if (this.upListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.upListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (!e.isPostprocess) {
            e.path.push(this);
            // if (!e.stopPropagation) { // up 默认冒泡，不可阻挡
            if (this.parentNode) {
                this.parentNode.up(e);
            }
            // }
        }
    }

    /**
     * down 事件响应
     * @param e 事件数据
     */
    public down(e: REventData) {
        Tools.log('down', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        if (!e.isOnlyBubble) {
            try {
                if (this.downListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.downListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (!e.isPostprocess) {
            e.path.push(this);
            if (!e.stopPropagation) {
                if (this.parentNode) {
                    this.parentNode.down(e);
                }
            }
        }
    }

    /**
     * click 事件响应
     * @param e 事件数据
     */
    public click(e: REventData) {
        Tools.log('click', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        if (!e.isOnlyBubble) {
            try {
                if (this.clickListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.clickListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (!e.isPostprocess) {
            e.path.push(this);
            if (!e.stopPropagation) {
                if (this.parentNode) {
                    this.parentNode.click(e);
                }
            }
        }
    }

    /**
     * move 事件响应
     * @param e 事件数据
     */
    public move(e: REventData) {
        Tools.log('move', this._level, e.x, e.y, e.pointerID);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        if (!e.isOnlyBubble) {
            try {
                if (this.moveListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.moveListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            Tools.log('move', 'isOnlyBubble');
        }

        if (!e.isPostprocess) {
            e.path.push(this);
            if (!e.stopPropagation) {
                if (this.parentNode) {
                    this.parentNode.move(e);
                }
            }
        }
    }
    
    /**
     * longtap 事件响应
     * @param e 事件数据
     */
    public longTap(e: REventData) {
        Tools.log('longtap', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        if (!e.isOnlyBubble) {
            try {
                if (this.longTapListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.longTapListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (!e.isPostprocess) {
            e.path.push(this);
            if (!e.stopPropagation) {
                if (this.parentNode) {
                    this.parentNode.longTap(e);
                }
            }
        }
    }

    /**
     * 双击 事件响应
     * @param e 事件数据
     */
    public dbclick(e: REventData) {
        Tools.log('dbclick', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        if (!e.isOnlyBubble) {
            try {
                if (this.dbclickListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.dbclickListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (!e.isPostprocess) {
            e.path.push(this);
            if (!e.stopPropagation) {
                if (this.parentNode) {
                    this.parentNode.dbclick(e);
                }
            }
        }
    }
    /**
     * 节点内部滚动处理
     * * 优先 Y 方向滚动
     * * Y 方向 没有剩余滚动量时，X 方向滚动
     * * x 方向 没有剩余滚动量时，向上冒泡
     */
    public wheel(e: REventData) {
        Tools.log('scroll', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        
        if (!e.stopPropagation) {
            if (this.parentNode) {
                this.parentNode.wheel(e);
            }
        } else {
            try {
                // 触发 Scroll 监听器
                this.scroll(e);
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    /**
     * 多点操作 事件响应
     * @param e 事件数据
     */
    public multipointer(e: REventData) {
        Tools.log('multipointer', this._level);
        e.current = this;
        // e.isSendNextLayer = e.isSendNextLayer || <boolean>this.attributes.isSendNextLayer;
        
        if (!e.isOnlyBubble) {
            try {
                if (this.multiListener) {
                    if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                        this.multiListener.notify(e);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        if (!e.isPostprocess) {
            e.path.push(this);
            if (!e.stopPropagation) {
                if (this.parentNode) {
                    this.parentNode.multipointer(e);
                }
            }
        }
    }

    /**
     * 节点产生有效滚动时 响应监听器
     */
    public scroll(e: REventData) {
        Tools.log('scroll', this._level);
        e.current = this;
        if (this.scrollListener) {
            if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                this.scrollListener.notify(e);
            }
        }
    }
    
    /**
     * 获得焦点 事件响应
     * @param e 事件数据
     */
    public focus(e: REventData) {
        Tools.log('focus', this._level);
        e.current = this;
        
        if (this.focusListener) {
            if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                this.focusListener.notify(e);
            }
        }
    }

    /**
     * 失去焦点 事件响应
     * @param e 事件数据
     */
    public blur(e: REventData) {
        Tools.log('blur', this._level);
        e.current = this;
        if (this.blurListener) {
            if (!this.document.askWidgetEnableCall || this.document.askWidgetEnableCall(this)) {
                this.blurListener.notify(e);
            }
        }
    }

    public debugFocus() {
        this.document.renderDebugLayer(this);
    }

    public debugBlur() {
        this.document.renderDebugLayer();
    }

    /**
     * 层级信息更新
     */
    public updateLevel() {
        this._level = this.parentNode._level + 1;
    }
    /**
     * 节点可操作性
     * @param b 是否可操作
     */
    public enabled(b: EnabledTypes) {
        gui._set_enable(this.document.uniqueID, this.uniqueID, b);
    }
    /**
     * 节点在 上下文中显示信息
     */
    public getScreenInfo() {
        
        this.document.layout();
        
        this._screenX   = 0;
        (<any>window).__jsObj = {};
        gui._offset_document(this.document.uniqueID, this.uniqueID);
        this._screenX   = (<any>window).__jsObj.left;
        this._screenY   = (<any>window).__jsObj.top;
        this._screenW   = (<any>window).__jsObj.width;
        this._screenH   = (<any>window).__jsObj.height;

        return [this._screenX, this._screenY, this._screenW, this._screenH];
    }
    /**
     * 节点滚动处理
     * * trsnaform - translate
     * @param x X 方向
     * @param y Y 方向
     */
    public doScroll(x: number, y: number) {

        if (this._isDestroy) return;
        
        this.document.applyStyle(this.style, 'translate', [[LengthUnitType.Pixel, x], [LengthUnitType.Pixel, y]]);

        this.document.layoutDirty = false;
    }

    public activeScroll() {
        // 
    }
    /**
     * BorderImageSlice 的激活调用
     * css clip: (top, right, bottom, left) 相对边缘的量
     * gui clip: (top, right, bottom, left) 相对边缘的量
     */
    public activeBorderImageSlice() {
        let value = this.document.readStyle(this.style, 'borderImageSlice');

        if (typeof value === 'string') {
            value = Tools.borderImageSlice(<string>value);
        }
        if (!Tools.noValue(value)) {
            const _value: number[] = [];
            if (value[5] === 0) {
                if (this._imageWidth && this._imageHeight) {
                    _value[0] = value[0] / this._imageHeight;
                    _value[1] = value[1] / this._imageWidth ;
                    _value[2] = value[2] / this._imageHeight;
                    _value[3] = value[3] / this._imageWidth ;
                    gui._set_border_image_slice(this.document.uniqueID, this.uniqueID, _value[0], _value[1], _value[2], _value[3], value[4] === 1);
                }
            } else {
                _value[0] = value[0];
                _value[1] = value[1];
                _value[2] = value[2];
                _value[3] = value[3];
                gui._set_border_image_slice(this.document.uniqueID, this.uniqueID, _value[0], _value[1], _value[2], _value[3], value[4] === 1);
            }

        }
    }
    /**
     * BorderImageClip 的激活调用
     * css clip: (top, right, bottom, left) 为坐标
     * gui clip: (x0, y0, x1, y1) 左上-右下坐标
     */
    public activeBorderImageClip() {
        let value = this.document.readStyle(this.style, 'borderImageClip');

        if (typeof value === 'string') {
            value = Tools.borderImageClip(<string>value);
        }
        if (!Tools.noValue(value)) {
            const _value: number[] = [];
            if (value[4] === 0) {
                if (this._srcImageHeight && this._srcImageWidth) {
                    _value[0] = value[0] / this._srcImageHeight;
                    _value[1] = value[1] / this._srcImageWidth ;
                    _value[2] = value[2] / this._srcImageHeight;
                    _value[3] = value[3] / this._srcImageWidth ;
                    gui._set_border_image_clip(this.document.uniqueID, this.uniqueID, _value[3], _value[0], _value[1], _value[2]);
                }
            } else {
                _value[0] = value[0];
                _value[1] = value[1];
                _value[2] = value[2];
                _value[3] = value[3];
                gui._set_border_image_clip(this.document.uniqueID, this.uniqueID, _value[3], _value[0], _value[1], _value[2]);
            }
        }
    }
    /**
     * ImageClip 的激活调
     * 
     * css clip: (top, right, bottom, left) 为坐标
     * gui clip: (x0, y0, x1, y1) 左上-右下坐标
     */
    public activeImageClip() {
        let result: boolean = false;

        // let value = this.style.imageClip || this.attributes.imageClip;
        let value = this.attributes.imageClip || this.document.readStyle(this.style, 'imageClip');

        if (typeof value === 'string') {
            value = Tools.imageClip(<string>value);
        }
        if (!Tools.noValue(value)) {
            const _value: number[] = [];
            if (value[4] === 0) {
                if (this._srcImageHeight && this._srcImageWidth) {
                    _value[0] = value[0] / this._srcImageHeight;
                    _value[1] = value[1] / this._srcImageWidth ;
                    _value[2] = value[2] / this._srcImageHeight;
                    _value[3] = value[3] / this._srcImageWidth ;

                    gui._set_image_clip(this.document.uniqueID, this.uniqueID, _value[3], _value[0], _value[1], _value[2]);
                    result = true;
                }
            } else {
                _value[0] = value[0];
                _value[1] = value[1];
                _value[2] = value[2];
                _value[3] = value[3];
                gui._set_image_clip(this.document.uniqueID, this.uniqueID, _value[3], _value[0], _value[1], _value[2]);
                result = true;
            }
        }
        
        return result;
    }

    protected initDefaultStyle(nodeType: RElementType) {
        RElement.forEachDefaultStyleList(
            nodeType, 
            key => {
                this.style[key] = RStyle.getDefaultStyle(key);
            }
        );
    }

    private removeCall() {
        if (this._isDestroy) {
            try {
                throw new Error(`节点不能再次销毁`);
            } catch (e) {
                console.error(e);
            }

            return;
        }

        Tools.log('remove', this.uniqueID);

        this._isDestroy             = true;
        this.document.layoutDirty   = true;
        this.style.remove();
        gui._remove_child(this.document.uniqueID, (this.uniqueID));
    }
}