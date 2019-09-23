/**
 * 
 */

export type EventType = 'up' | 'down' | 'enter' | 'out' | 'move' | 'click' /* | 'blur' */ | 'textChanged';
export type EventCall = (data: any, e: any, s: BABYLON.EventState) => any;
// tslint:disable-next-line:interface-name
export interface IGUIEventCfg {
    up?:    [string | EventCall, any?, IEventCallCfg?];
    down?:  [string | EventCall, any?, IEventCallCfg?];
    enter?: [string | EventCall, any?, IEventCallCfg?];
    out?:   [string | EventCall, any?, IEventCallCfg?];
    move?:  [string | EventCall, any?, IEventCallCfg?];
    click?: [string | EventCall, any?, IEventCallCfg?];
    blur?:  [string | EventCall, any?, IEventCallCfg?];
    textChanged?: [string | EventCall, any?, IEventCallCfg?];
    [index:string]:[string | EventCall, any?, IEventCallCfg?];
}

// tslint:disable-next-line:interface-name
export interface IGUIEvent {
    up?:    EventCall;
    down?:  EventCall;
    enter?: EventCall;
    out?:   EventCall;
    move?:  EventCall;
    click?: EventCall;
    blur?:  EventCall;
    textChanged?: EventCall;
}

// tslint:disable-next-line:interface-name
export interface IEventCallCfg {
    pointerAnim?: boolean | number;
    skipNext?: boolean;
}

// tslint:disable-next-line:interface-name
export interface IEventCfg {
    func: Function;
    arg: any;
    cfg: IEventCallCfg;
}

export enum GUIKeys  {
    alpha = 'alpha',
    background = 'background',
    zIndex = 'zIndex',
    scaleX = 'scaleX',
    scaleY = 'scaleY',
    scale = 'scale',
    rotation = 'rotation',
    isVertical = 'isVertical',
    isVisible = 'isVisible',
    isEnabled = 'isEnabled',
    horizontalAlignment = 'horizontalAlignment',
    verticalAlignment = 'verticalAlignment',
    shadowBlur = 'shadowBlur',
    shadowColor = 'shadowColor',
    shadowOffsetX = 'shadowOffsetX',
    shadowOffsetY = 'shadowOffsetY',
    clipChildren = 'clipChildren',
    margin = 'margin',
    color = 'color',
    fontSize = 'fontSize',
    fontFamily = 'fontFamily',
    fontWeight = 'fontWeight',
    lineSpacing = 'lineSpacing',
    outlineColor = 'outlineColor',
    outlineWidth = 'outlineWidth',
    resizeToFit = 'resizeToFit',
    textHorizontalAlignment = 'textHorizontalAlignment',
    textVerticalAlignment = 'textVerticalAlignment',
    cellId = 'cellId',
    cellHeight = 'cellHeight',
    cellWidth = 'cellWidth',
    autoScale = 'autoScale',
    sourceLeft = 'sourceLeft',
    sourceTop = 'sourceTop',
    sourceWidth = 'sourceWidth',
    sourceHeight = 'sourceHeight',
    placeholderText = 'placeholderText',
    placeholderColor = 'placeholderColor',
    disabledColor = 'disabledColor',
    focusedBackground = 'focusedBackground',
    x1 = 'x1',
    x2 = 'x2',
    y1 = 'y1',
    y2 = 'y2',
    dash = 'dash',
    lineWidth = 'lineWidth',
    left = 'left',
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    hCenter = 'hCenter',
    vCenter = 'vCenter',
    width = 'width',
    height = 'height',
    maxWidth = 'maxWidth',
    image = 'image',
    src = 'src',
    'z-index' = 'z-index',
    z = 'z',
    rotate = 'rotate',
    txtLeft = 'txtLeft',
    txtTop = 'txtTop',
    txtRight = 'txtRight',
    txtBottom = 'txtBottom',
    txtClip = 'txtClip',
    txtEllipsis = 'txtEllipsis',
    txtWrap = 'txtWrap',
    text = 'text',
    paddingLeft = 'paddingLeft',
    paddingTop = 'paddingTop',
    paddingRight = 'paddingRight',
    paddingBottom = 'paddingBottom',
    stretch_extend = 'stretch_extend',
    stretch_fill = 'stretch_fill',
    stretch_none = 'stretch_none',
    stretch_uniform = 'stretch_uniform',
    transformCenterX = 'transformCenterX',
    transformCenterY = 'transformCenterY',
    thickness = 'thickness',
    cornerRadius = 'cornerRadius',
    sliceWidths = 'sliceWidths',
    sourceSliceWidths = 'sourceSliceWidths',
    textGradientDash = 'textGradientDash',
    maxLength = 'maxLength'
}

export enum EEventDebugTypes {
    PointerClick = 'PointerClick',
    PointerDown = 'PointerDown',
    PointerEnter = 'PointerEnter',
    PointerMove = 'PointerMove',
    PointerUp = 'PointerUp',
    PointerOut = 'PointerOut',
    AfterDraw = 'AfterDraw',
    Dirty = 'Dirty'
}

export const EventDebugsCall = {
    [EEventDebugTypes.AfterDraw]:       (e,s) => { console.log(EEventDebugTypes.AfterDraw, e, s); },
    [EEventDebugTypes.Dirty]:           (e,s) => { console.log(EEventDebugTypes.Dirty, e, s); },
    [EEventDebugTypes.PointerClick]:    (e,s) => { console.log(EEventDebugTypes.PointerClick, e, s); },
    [EEventDebugTypes.PointerDown]:     (e,s) => { console.log(EEventDebugTypes.PointerDown, e, s); },
    [EEventDebugTypes.PointerEnter]:    (e,s) => { console.log(EEventDebugTypes.PointerEnter, e, s); },
    [EEventDebugTypes.PointerMove]:     (e,s) => { console.log(EEventDebugTypes.PointerMove, e, s); },
    [EEventDebugTypes.PointerOut]:      (e,s) => { console.log(EEventDebugTypes.PointerOut, e, s); },
    [EEventDebugTypes.PointerUp]:       (e,s) => { console.log(EEventDebugTypes.PointerUp, e, s); }
};

export const EventTypeList = [
    'up', 
    'down', 
    'enter', 
    'out', 
    'move', 
    'click', 
    'textChanged', 
    'blur'
];

// tslint:disable-next-line:interface-name
export interface IGUIStyleCfg {
    /**
     * 节点名称
     */
    name?: string;
    /**
     * 不透明度
     */
    alpha?: number;
    /**
     * 背景色
     */
    background?: string;
    /**
     * 节点层级
     */
    zIndex?: number;
    /**
     * 水平缩放
     */
    scaleX?: number;
    /**
     * 垂直缩放
     */
    scaleY?: number;
    /**
     * 水平和垂直 相同的缩放值
     */
    scale?: number;
    /**
     * 旋转
     */
    rotation?: number;
    /**
     * 设置X轴上的变换中心
     */
    transformCenterX?: number;
    /**
     * 设置y轴上的变换中心
     */
    transformCenterY?: number;
    /**
     * 容器是否 垂直方向堆叠 内容
     */ 
    isVertical?: boolean;
    /**
     * 是否可见
     */
    isVisible?: boolean;
    /**
     * 是否可操作
     */
    isEnabled?: boolean;
    // 元素对齐
    // 'horizontalAlignment?: number; 
    // 'verticalAlignment?: number;
    // 元素阴影
    /**
     * 节点阴影宽度
     */
    shadowBlur?: number;
    /**
     * 节点阴影 颜色
     */
    shadowColor?: string;
    /**
     * 节点阴影 水平偏移
     */
    shadowOffsetX?: number;
    /**
     * 节点阴影 垂直偏移
     */
    shadowOffsetY?: number;
    // 容器裁剪
    clipChildren?: boolean;
    // 'margin?: string;

    // 文本属性
    /**
     * 文本颜色
     */
    color?: string;
    /**
     * 文本尺寸
     */
    fontSize?: number;
    /**
     * 文本样式
     */
    fontFamily?: string;
    /**
     * 文本粗细
     */
    fontWeight?: string;
    /**
     * 文本间距
     */
    lineSpacing?: number; 
    /**
     * 文本描边颜色
     */
    outlineColor?: string; 
    /**
     * 文本描边宽度
     */
    outlineWidth?: number;
    /**
     * 文本充满整行
     */
    resizeToFit?: boolean;
    // 文本对齐设置 - 推荐 使用 Attr5 中属性名
    // 'textHorizontalAlignment?: number; 
    // 'textVerticalAlignment?: number;
    // 文本对齐， 不设置 则分别有 重置居中，水平居中
    /**
     * 文本 左对齐
     */
    txtLeft?: boolean; 
    /**
     * 文本 上对齐
     */
    txtTop?: boolean; 
    /**
     * 文本 右对齐
     */
    txtRight?: boolean; 
    /**
     * 文本 底对齐
     */
    txtBottom?: boolean; 
    /**
     * 文本 水平方向居中
     */
    txtHCenter?: boolean; 
    /**
     * 文本 垂直方向居中对齐
     */
    txtVCenter?: boolean; 
    // 文本换行
    /**
     * 文本 文本不换行，截取显示
     */
    txtClip?: boolean;
    /**
     * 文本 ... 省略号结束
     */
    txtEllipsis?: boolean;
    /**
     * 文本 自动换行显示
     */
    txtWrap?: boolean; 
    /**
     * 文本 内容
     */
    text?: string;

    // 图片裁剪显示
    /**
     * 图片 - 显示资源图片的 序列帧 序号
     */
    cellId?: number; 
    /**
     * 图片 - 显示资源图片的 序列帧 帧高度
     */
    cellHeight?: number;
    /**
     * 图片 - 显示资源图片的 序列帧 帧宽度
     */
    cellWidth?: number;
    /**
     * 图片 - 图片控件大小自适应图片资源大小 
     */
    autoScale?: boolean;
    /**
     * 图片 - 截取资源图片的 left
     */
    sourceLeft?: number; 
    /**
     * 图片 - 截取资源图片的 top
     */
    sourceTop?: number; 
    /**
     * 图片 - 截取资源图片的 宽度
     */
    sourceWidth?: number;
    /**
     * 图片 - 截取资源图片的 高度
     */
    sourceHeight?: number;

    // Input 控件
    /**
     * Input 控件 - 初始文本
     */
    placeholderText?: string; 
    /**
     * Input 控件 - 初始背景色
     */
    placeholderColor?: string; 
    /**
     * Input 控件 - 禁止输入时背景色
     */
    disabledColor?: string;
    /**
     * Input 控件 - 获得焦点时背景色
     */
    focusedBackground?: string;

    // line
    /**
     * line 控件 - 起点
     */
    x1?: number; 
    /**
     * line 控件 - 终点
     */
    x2?: number; 
    /**
     * line 控件 - 起点
     */
    y1?: number; 
    /**
     * line 控件 - 终点
     */
    y2?: number;
    /**
     * line 控件 - [实，虚，实，虚...] 虚线配置
     */
    dash?: number[]; 
    /**
     * line 控件 - 线宽度
     */
    lineWidth?: number;

    /**
     * 绝对定位 - 左部定位偏移
     */
    left?: number;
    /**
     * 绝对定位 - 上部定位偏移
     */
    top?: number; 
    /**
     * 绝对定位 - 右部定位偏移
     */
    right?: number; 
    /**
     * 绝对定位 - 底部定位偏移
     */
    bottom?: number;
    /**
     * 绝对定位 - 水平居中定位偏移 - 左负 右正
     */
    hCenter?: number; 
    /**
     * 绝对定位 - 垂直居中定位偏移 - 上负 下正
     */
    vCenter?: number;
    /**
     * 绝对定位 - 相对链接3D 模型的 x 平移
     */
    linkOffsetX?: number; 
    /**
     * 绝对定位 - 相对链接3D 模型的 y 平移
     */
    linkOffsetY?: number;
    /**
     * 节点宽度
     */
    width?: number; 
    /**
     * 节点高度
     */
    height?: number; 
    /**
     * input 节点 - 最大宽度 - (PS: 不是文本最大长度 - 文本最大长度需代码控制)
     */
    maxWidth?: number;
    /**
     * 图片节点 - 资源图片路径
     */
    image?: string; 
    // 取消 - 使用 image
    // 'src?: string; 
    // 取消 - 使用 zIndex
    // 'z-index?: number;
    // 'z?: number;

    // 'rotate?: number;

    paddingLeft?: number; 
    paddingTop?: number; 
    paddingRight?: number;
    paddingBottom?: number;

    /**
     * Image 填充模式
     */
    stretch_extend?: boolean; 
    stretch_fill?: boolean; 
    stretch_none?: boolean;
    stretch_uniform?: boolean;
    stretch_nine_patch?: boolean;

    /**
     * 是否置灰
     */
    pi_isGray?: boolean;
    /**
     * 节点边框 宽度 - 调试用
     */
    thickness?: number;
    /**
     * 边框圆角半径
     */
    cornerRadius?: number;
    useBitmapCache?: boolean;
    useDisplayLimit?: boolean;
    displayLimitLeft?: number;
    displayLimitTop?: number;
    displayLimitWidth?: number;
    displayLimitHeight?: number;
    sliceWidths?: string;
    sourceSliceWidths?: string;
    textGradientDash?: string;
    isAnimDraw?: boolean;
    /**
     * inputText 文本字符最大数目
     */
    maxLength?: boolean;
}

/**
 * 替代 属性值
 * 节点更新时使用
 * 旧配置具有某个属性 但新配置不具有该属性，则新配置添加该属性，值为这个替代属性值，以便于设置节点属性时清除原属性
 */
export const ATTR_FORMAT_FLAG = {};

// export let EngineInstance: BABYLON.Engine = null;

// export let GUISceneInstance: BABYLON.Scene = null;

// export let GUIADTInstance: BABYLON.GUI.AdvancedDynamicTexture = null;

// /**
//  * 达到移动距离才响应move监听
//  */
// export let Motion_Check_Distance: number = 10;
// /**
//  * 项目设计尺寸 - 高度
//  */
// export let Design_Height: number = 960;
// /**
//  * 项目设计尺寸 - 宽度
//  */
// export let Design_Width: number = 540;
// /**
//  * 项目显示变形限制
//  */
// export let Design_DiffLimit: number = 0.15;
// /**
//  * 项目基本字体
//  */
// export let Design_FontFamily: string = 'Arial';
// /**
//  * 项目基本字体
//  */
// export let Design_FontSize: number = 20;
// /**
//  * GUI 默认路径
//  */
// export let GUIImagePath: string = '';
// /**
//  * GUI 默认路径
//  */
// export let GUIAnimLimitFPS: number = 20;

// tslint:disable-next-line:no-unnecessary-class
export class GUIPARAMS {
    public static EngineInstance: BABYLON.Engine = null;
    
    public static GUISceneInstance: BABYLON.Scene = null;
    
    public static GUIADTInstance: BABYLON.GUI.AdvancedDynamicTexture = null;

    public static HardwareScalingLevel: number = 1;
    /**
     * 达到移动距离才响应move监听
     */
    public static Motion_Check_Distance: number = 10;
    /**
     * 项目设计尺寸 - 高度
     */
    public static Design_Height: number = 960;
    /**
     * 项目设计尺寸 - 宽度
     */
    public static Design_Width: number = 540;
    /**
     * 项目显示变形限制
     */
    public static Design_DiffLimit: number = 0.15;
    /**
     * 项目基本字体
     */
    public static Design_FontFamily: string = 'Arial';
    /**
     * 项目基本字体
     */
    public static Design_FontSize: number = 20;
    /**
     * GUI 默认路径
     */
    public static GUIImagePath: string = '';
    /**
     * GUI 默认路径
     */
    public static GUIAnimLimitFPS: number = 10;
    public static GUIDrawDebug: boolean = false;
    /**
     * 全局 GUI 项目逻辑事件响应后的钩子调用
     */
    public static GUIEventCallAfter: Function;
    public static GUIEventCallBefore: Function;
    
    /**
     * 设置设计高度
     */
    public static setDesignHeight(h: number) {
        this.Design_Height = Math.ceil(h / GUIPARAMS.HardwareScalingLevel);
    }
    /**
     * 设置设计宽度
     */
    public static setDesignWidth(w: number) {
        this.Design_Width = Math.ceil(w / GUIPARAMS.HardwareScalingLevel);
    }
    /**
     * 设置设计引擎内部要实现的像素缩放比， level = 逻辑像素 / 实际显示像素
     */
    public static setEngineHardwareScalingLevel(level: number) {
        this.HardwareScalingLevel = level;
    }
    /**
     * 设置移动事件的 判定距离
     * @param distance ： 判定距离
     */
    public static setMotionCheckDistance(distance: number) {
        this.Motion_Check_Distance = distance;
    }
    /**
     * s设置项目基本字体
     * @param fontFamily 字体名称
     */
    public static setFontFamily(fontFamily: string) {
        this.Design_FontFamily = fontFamily;
    }
    /**
     * s设置项目基本大小
     * @param fontSize 字体大小
     */
    public static setFontSize(fontSize: string) {
        this.Design_FontFamily = fontSize;
    }
    /**
     * 设置默认 UI 图片路径
     * @param path 资源路径
     * * 绝对路径
     */
    public static setGUIImagePath(path: string) {
        this.GUIImagePath = path;
    }
    /**
     * 记录 引擎实例
     * @param engine 引擎实例
     */
    public static recordEngineInstance(engine: BABYLON.Engine) {
        this.EngineInstance = engine;
    }
    /**
     * 记录 GUI 场景实例
     * @param scene GUI 场景实例
     */
    public static recordGUISceneInstance(scene: BABYLON.Scene) {
        this.GUISceneInstance = scene;
    }
    /**
     * 记录 GUI 纹理实例
     * @param adt GUI 场景实例
     */
    public static recordGUIADTInstance(adt: BABYLON.GUI.AdvancedDynamicTexture) {
        this.GUIADTInstance = adt;
        this.GUIADTInstance.debugControlLog = this.GUIDrawDebug;
    }
    /**
     * 设置 GUI 动画运行的最小 FPS 环境
     * @param fps fps
     * * 引擎帧数低于改数值时将忽略动画的过程，仅更新动画结果
     */
    public static setGUIAnimLimitFPS(fps: number) {
        this.GUIAnimLimitFPS = fps;
    }
    /**
     * 项目显示变形限制
     * @param value 限制值
     */
    public static setDesignDiffLimit(value: number) {
        this.Design_DiffLimit = value;
    }
    /**
     * 设置是否调试 GUI 创建页面时的节点统计信息
     * @param b: 
     */
    public static setGUIConstructorDebug(b: boolean) {
        GUIConstructor.isDebug = b;
    }
    /**
     * 设置是否调试 GUI 绘制时的节点统计信息
     * @param b: 
     */
    public static setGUIDrawDebug(b: boolean) {
        this.GUIDrawDebug = b;
    }
    public static setGUIEventCallAfter(f: Function) {
        this.GUIEventCallAfter = f;
    }
    public static setGUIEventCallBefore(f: Function) {
        this.GUIEventCallBefore = f;
    }
    
}

// tslint:disable-next-line:no-unnecessary-class
export class GUIConstructor {
    public static isDebug: boolean = false;
    private static FrameControlCounter: number = 0;
    private static FrameImageCounter: number = 0;
    private static FrameTextBlockCounter: number = 0;
    private static FrameInputCounter: number = 0;
    private static FrameGridCounter: number = 0;
    // tslint:disable-next-line:function-name
    public static Image(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        this.FrameImageCounter++;

        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.Image(_style.name);
        // return BABYLON.GUI.Image.Create(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static Container(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;

        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.Container(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static TextBlock(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        this.FrameTextBlockCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.TextBlock(_style.name);
        // return BABYLON.GUI.TextBlock.Create(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static StackPanel(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.StackPanel(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static Rectangle(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.Rectangle(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static InputText(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        this.FrameInputCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.InputText(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static InputPassword(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        this.FrameInputCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.InputPassword(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static Line(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.Line(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static Ellipse(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.Ellipse(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static Grid(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        this.FrameGridCounter++;
        
        _style = _style || ATTR_FORMAT_FLAG;

        return new BABYLON.GUI.Grid(_style.name);
    }
    // tslint:disable-next-line:function-name
    public static ImageButton(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        
        console.warn(`取消使用 ImageButton, 请替换`);
        _style = _style || ATTR_FORMAT_FLAG;

        return BABYLON.GUI.Button.CreateImageButton(_style.name, _style.text, _style.image);
    }
    // tslint:disable-next-line:function-name
    public static ImageOnlyButton(_style: IGUIStyleCfg) {
        this.FrameControlCounter++;
        
        console.warn(`取消使用 ImageOnlyButton, 请替换`);

        _style = _style || ATTR_FORMAT_FLAG;

        return BABYLON.GUI.Button.CreateImageOnlyButton(_style.name, _style.image);
    }
    // tslint:disable-next-line:function-name
    public static BeginControlCounter() {
        this.FrameControlCounter = 0;
        this.FrameGridCounter = 0;
        this.FrameInputCounter = 0;
        this.FrameImageCounter = 0;
        this.FrameTextBlockCounter = 0;
    }
    // tslint:disable-next-line:function-name
    public static EndControlCounter(key?: string) {
        if (this.isDebug) {
            console.log(`Create ${key}. Control:${this.FrameControlCounter},Grid:${this.FrameGridCounter},Input:${this.FrameInputCounter},Image:${this.FrameImageCounter},TextBlock:${this.FrameTextBlockCounter}`);    
        }
    }
}
