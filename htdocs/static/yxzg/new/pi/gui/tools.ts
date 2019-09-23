import { BorderImageRepeat, EnabledTypes, FitTypes, FontStyle, FontWeight, LengthUnitType, RadialGradientShapes, RadialGradientSize, TextAlign, TextDirection, VerticalAlign, WhiteSpace, YGAlign, YGDisplay, YGEdge, YGFlexDirection, YGJustify, YGOverflow, YGPositionType, YGWrap } from './enum';

/**
 * 颜色 数据类型集
 */
export const BackgroundColorType = {
    RGBA: 1,
    RGB: 2
};

export enum ScrollPaths {
    x = 1,
    y = 2,
    xy = 3,
    X = 'x',
    Y = 'y',
    XY = 'xy'
}

export enum ScrollTypes {
    none = 0,
    xianpi = 1,
    NONE = 'none',
    XianPi = 'xianpi'
}

export enum GradientTypes {
    linear = 0,
    radial = 1
}

/**
 * 工具方法
 */
export class FlexBasis {
    public auto: boolean;
    public value: number;
}

/**
 * RGB 数据模板
 */
export class RGB {
    public r: number;
    public g: number;
    public b: number;
    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export type ILengthData = [number, number];

export class LengthData {
    public _t: LengthUnitType;
    /**
     * @example 50px => 50 | 50% => 50
     */
    public _d: number;
    constructor(_t: LengthUnitType, _d: number) {
        this._t = _t;
        this._d = _d;
    }
    // tslint:disable-next-line:function-name
    public static Zero() {
        return new LengthData(LengthUnitType.Pixel, 0);
    }
    public static mix(percent: number, first: LengthData, second: LengthData, target: LengthData) {
        target._d = first._d + percent * (second._d - first._d);
    }
    public static mixILengthData(percent: number, first: ILengthData, second: ILengthData): ILengthData {
        const result: ILengthData = [0,0];
        result[0] = first[0];
        result[1] = Tools.clipFloat(first[1] + percent * (second[1] - first[1]));

        return result;
    }
    public static cloneFrom(src: LengthData) {
        return new LengthData(src._t, src._d);
    }
    public static cloneFromILengthData(src: ILengthData): ILengthData {
        return [src[0], src[1]];
    }
    public clone() {
        return new LengthData(this._t, this._d);
    }
    public cloneILengthData() {
        return [this._t, this._d];
    }
    get value() {
        return [this._t, this._d];
    }
}

export type IRGBA = [number, number, number, number];
/**
 * RGBA 数据模板
 */
export class RGBA extends RGB {
    public a: number;
    constructor(r: number, g: number, b: number, a: number) {
        super(r, g, b);
        this.a = a;
    }
}

export type IVector2 = [number, number];

export class Vector2 {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public static mix(percent: number, first: Vector2, second: Vector2, target: Vector2) {
        target.x = first.x + percent * (second.x - first.x);
        target.y = first.y + percent * (second.y - first.y);
    }
    public static mixIVector2(percent: number, first: IVector2, second: IVector2): IVector2 {
        const result: IVector2 = <any>[];
        result[0] = Tools.clipFloat(first[0] + percent * (second[0] - first[0]));
        result[1] = Tools.clipFloat(first[1] + percent * (second[1] - first[1]));

        return result;
    }
    public static cloneFrom(src: Vector2) {
        return new Vector2(src.x, src.y);
    }
    public static cloneFromIVector2(src: IVector2): IVector2 {
        return [src[0], src[1]];
    }
}

export type ILengthVector2 = [[number,number],[number,number]];
export class LengthVector2 {
    public x: LengthData;
    public y: LengthData;
    constructor(x: LengthData, y: LengthData) {
        this.x = x;
        this.y = y;
    }
    // tslint:disable-next-line:function-name
    public static Zero() {
        return new LengthVector2(LengthData.Zero(), LengthData.Zero());
    }
    public static mix(percent: number, first: LengthVector2, second: LengthVector2, target: LengthVector2) {
        LengthData.mix(percent, first.x, second.x, target.x);
        LengthData.mix(percent, first.y, second.y, target.y);
    }
    public static mixILengthVector2(percent: number, first: ILengthVector2, second: ILengthVector2): ILengthVector2 {
        const result: ILengthVector2 = <any>[];
        result[0] = LengthData.mixILengthData(percent, first[0], second[0]);
        result[1] = LengthData.mixILengthData(percent, first[1], second[1]);

        return result;
    }
    public static cloneFrom(src: LengthVector2) {
        return new LengthVector2(LengthData.cloneFrom(src.x), LengthData.cloneFrom(src.y));
    }
    public static cloneFromILengthVector2(src: ILengthVector2): ILengthVector2 {
        return [LengthData.cloneFromILengthData(src[0]), LengthData.cloneFromILengthData(src[1])];
    }
}
export const ITransT = 0;
export const ITransR = 1;
export const ITransS = 2;
export const ITransM = 3;
export const ITransM3 = 4;
export type ITransform = ITransformData[];
export class Transform {
    public translate: LengthVector2;
    public rotate: number;
    public scale: Vector2;
    public matrix: string;
    public matrix3d: string;
} 

export const ITransformDataTypes = ['r', 't', 's'];
export enum ITransformDataType {
    translate   = 't',
    scale       = 's',
    rotateZ     = 'r'
}
// tslint:disable-next-line:interface-name
export interface IEnumTransformData {
    t: ILengthVector2;
    r: number;
    s: IVector2;
}

// tslint:disable-next-line:interface-name
export interface ITransformData {
    t: string;
    d: ILengthVector2 | number | IVector2;
} 

export const IShadowH = 0;
export const IShadowV = 1;
export const IShadowC = 2;
export const IShadowB = 3;
export type IShadow = [number,number,IRGBA,number];

export class Shadow {
    public h: number;
    public v: number;
    public color: RGBA;
    public blur: number;
}

export class OverFlow {
    public x: YGOverflow;
    public y: YGOverflow;
}

export class ScrollInfo {
    public path: ScrollPaths;
    public style: ScrollTypes;
}
export const BoxA = 0;
export const BoxT = 1;
export const BoxR = 2;
export const BoxB = 3;
export const BoxL = 4;
export type IBoxData = [ILengthData, ILengthData,ILengthData,ILengthData,ILengthData];
export class BoxData {
    public top: LengthData; 
    public right: LengthData; 
    public bottom: LengthData; 
    public left: LengthData; 
    public all: LengthData;
}

export class GradientData {
    public _t: GradientTypes;
    public color_and_positions: Float32Array;
    public direction: number;
    public center_x: number;
    public center_y: number;
    public shape: number;
    public size: number;
}

export class AnimationCmd {
    /**
     * 要执行的动画的关键帧数据名称
     */
    public readonly name: string;
    /**
     * 动画时长
     */
    public duration: number = 0;
    /**
     * 动画执行应用的数学过程
     */
    public timingFunction: string = 'linear';
    /**
     * 动画延时
     */
    public delayTime: number = 0;
    /**
     * 动画循环次数
     */
    public iteration: number = 1;
    /**
     * 动画循环模式
     */
    public direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' = 'normal';
    /**
     * 动画结束状态
     */
    public fillMode: 'none' | 'forwards' | 'backwards' | 'both' = 'none';
    constructor(name: string) {
        this.name = name;
    }
}

/**
 * R gui 工具方法集
 */
// tslint:disable-next-line:no-unnecessary-class
export class Tools {
    public static logFlag: boolean = true;
    public static warnFlag: boolean = true;
    public static errorFlag: boolean = false;
    /**
     * 是否为开发环境进行断点
     */
    public static isDev: boolean = false;
    public static log(...args: any[]) {
        if (this.logFlag)  {
            console.log(...args);
        }
    }
    public static warn(...args: any[]) {
        if (this.warnFlag)  {
            if (this.isDev) {
                this.devError(args.toString());
            } else {
                console.warn(...args);
            }
        }
    }
    public static error(...args: any[]) {
        if (this.errorFlag)  {
            if (this.isDev) {
                this.devError(args.toString());
            } else {
                console.warn(...args);
            }
        }
    }
    public static devError(msg: string) {
        try {
            throw new Error(msg);
        } catch (error) {
            // 
        }
    }
    /**
     * 解析长度数据
     * @param data 表示长度的字符串
     * * 20px
     * * 20%
     */
    // public static lengthData(data: string): LengthData {
    public static lengthData(data: string): ILengthData {
        data = data.trim();

        if (data === undefined) {
            return ;
        } else if (data === 'auto') {
            return [LengthUnitType.Auto, 0];
        } else {
            const len = data.length;
            let _t: number, _d: any;
    
            if (data[len - 2] === `p` && data[len - 1] === `x`) {
                _t = LengthUnitType.Pixel;
                _d = data.substring(0, len - 2); 
            } else if (data[len - 1] === `%`) {
                _t = LengthUnitType.Percent;
                _d = data.substring(0, len - 1); 
                _d = (_d - 0) ;
            } else {
                _t = LengthUnitType.Pixel;
                _d = 0;
                if (data !== '0') {
                    Tools.warn(`无效 lengthData : ${data}, 设置为默认 0%`);
                }
            }
    
            _d = _d - 0;
    
            // return new LengthData(_t, _d);
            return [_t, _d];
        }
    }
    /**
     * 打印不支持的属性名称
     * @param _t 属性名称
     * * debug 反馈不支持的属性名称
     */
    public static notSupposeStyle(_t: string) {
        Tools.log(`暂不支持属性 ${_t}`);
    }
    /**
     * 解析 border 数据
     * @param data border 
     */
    public static color(data: string) {
        return Tools.backgroundColor(data);
    }
    /**
     * 
     * @param data 表示颜色的字符串
     * * #fff
     * * #ffff00
     * * #ffff0066
     * * rgb(255, 0, 255)
     * * rgba(255, 0, 0, 0.5)
     * @returns RGBA : {r: <0~1>, g: <0~1>, b: <0~1>, a: <0~1>}
     */
    public static backgroundColor(data: string) {
        data = data || '';
        data = this.format_space(data);

        let _t: number, r: number = 0, g: number = 0, b: number = 0, a: number = 1;
        // let _d: RGBA;
        let _d: IRGBA;

        // hex 类型颜色设置
        if (data[0] === '#') {
            _t = BackgroundColorType.RGBA;

            // #FFF
            if (data.length === 4) {
                [r, g, b] = [parseInt(data[1], 16) / 15, parseInt(data[2], 16) / 15, parseInt(data[3], 16) / 15];
                
            // #FFFFFF
            } else if (data.length === 7) {
                [r, g, b] = [parseInt(data[1] + data[2], 16) / 255, parseInt(data[3] + data[4], 16) / 255, parseInt(data[5] + data[6], 16) / 255];
            } else if (data.length === 9) {
                [r, g, b, a] = [parseInt(data[1] + data[2], 16) / 255, parseInt(data[3] + data[4], 16) / 255, parseInt(data[5] + data[6], 16) / 255, parseInt(data[7] + data[8], 16) / 255];
            }

        // rgb() 类型颜色设置
        } else if (data[0] === 'r' && data[1] === 'g' && data[2] === 'b') {
            let list: any[];

            // rgba(255, 255, 255, 0.5)
            if (data[3] === 'a') {

                _t = BackgroundColorType.RGBA;
                data  = data.trim();
                data  = data.substring(5, data.length - 1);
                list  = data.split(',');
                [r,g,b,a] = [(list[0] - 0) / 255, (list[1] - 0) / 255, (list[2] - 0) / 255, (list[3] - 0)];

            // rgb(255, 255, 255)
            } else {

                _t = BackgroundColorType.RGBA;
                data  = data.substring(4, data.length - 1);
                list  = data.split(',');
                [r,g,b] = [(list[0] - 0) / 255, (list[1] - 0) / 255, (list[2] - 0) / 255];

            }
        } else {
            a = 0;
            Tools.warn(`无效 RGBA : ${data}`);
        }
        
        // _d = new RGBA(Tools.clipFloat(r), Tools.clipFloat(g), Tools.clipFloat(b), Tools.clipFloat(a));
        _d = [Tools.clipFloat(r), Tools.clipFloat(g), Tools.clipFloat(b), Tools.clipFloat(a)];

        return _d;
    }
    public static clipFloat(v: number) {
        return (Math.round(v * 100) / 100);
    }
    public static clipInt(v: number) {
        return Math.round(v);
    }
    /**
     * 构建期调用, 不解析，因为生成的类型数组经过 json 处理会变成简单对象
     * @param data html样式
     */
    public static background(data: string) {
        data = this.format_space(data);

        return data; 
    }
    /**
     * 运行期调用，生成的类型数组可生效
     * @param data html样式
     */
    public static background_(data: string) {
        data = this.format_space(data);
        
        const startChar = data[0];
        let  graidient: GradientData;
        switch (startChar) {
            case ('l'): {
                graidient = this.lineGradient(data);
                break;
            }
            case ('r'): {
                graidient = this.radioGradient(data);
                break;
            }
            default: {
                Tools.warn(`无效 background : ${data}`);
            }
        }

        return graidient; 
    }
    // public static width(data: string): LengthData {
    public static width(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    // public static height(data: string): LengthData {
    public static height(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    // public static minWidth(data: string): LengthData {
    public static minWidth(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    // public static maxWidth(data: string): LengthData {
    public static maxWidth(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    // public static minHeight(data: string): LengthData {
    public static minHeight(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    // public static maxHeight(data: string): LengthData {
    public static maxHeight(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    /**
     * 解析 display 属性
     * @param data html 样式数据
     */
    public static display(data: string): YGDisplay {
        let value: YGDisplay;

        switch (data) {
            case ('none'): {
                value = YGDisplay.YGDisplayNone;
                break;
            }
            // 默认flex布局为 inline-flex 
            default: {
                value = YGDisplay.YGDisplayFlex;
            }
        }

        return value;
    }
    /**
     * 不透明度
     * @param data html 样式数据
     * * 未处理 0-1 范围外的值
     */
    public static opacity(data: string): number {

        let value = <any>data - 0;
        if (isNaN(value)) {
            value = 1;
            
            Tools.warn(`无效 opacity : ${data}`);
        } 

        return value;
    }
    public static zIndex(data: string): number {

        let value = <any>data - 0;
        if (isNaN(value)) {
            value = undefined;
            Tools.warn(`无效 zIndex : ${data}`);
        } 

        return value;
    }
    /**
     * 是否可见
     * @param data html 样式数据
     */
    public static visibility(data: string): boolean {

        let value: boolean;
        switch (data) {
            case ('hidden'): {
                value = false;
                break;
            }
            default: {
                value = true;
            }
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static flexDirection(data: string): YGFlexDirection {

        let value: YGFlexDirection;

        switch (data) {
            case ('column'): {
                value = YGFlexDirection.YGFlexDirectionColumn;
                break;
            }
            case ('column-reverse'): {
                value = YGFlexDirection.YGFlexDirectionColumnReverse;
                break;
            }
            case ('row'): {
                value = YGFlexDirection.YGFlexDirectionRow;
                break;
            }
            case ('row-reverse'): {
                value = YGFlexDirection.YGFlexDirectionRowReverse;
                break;
            }
            default: {
                Tools.warn(`无效 flexDirection : ${data}`);
            }
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static flexWrap(data: string): YGWrap {

        let value: YGWrap;

        switch (data) {
            case ('nowrap'): {
                value = YGWrap.YGWrapNoWrap;
                break;
            }
            case ('wrap'): {
                value = YGWrap.YGWrapWrap;
                break;
            }
            case ('wrap-reverse'): {
                value = YGWrap.YGWrapWrapReverse;
                break;
            }
            default: {
                
                Tools.warn(`无效 flexWrap : ${data}`);
            }
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     * * 
     */
    public static flexGrow(data: string): number {
        let value: number;

        switch (data) {
            case ('inherit'): {
                value = 0;
                break;
            }
            default: {
                value = <any>data - 0;
            }
        }

        isNaN(value) && (value = 0);

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static flexShrink(data: string): number {

        let value: number;

        switch (data) {
            case ('initial'):
            case ('inherit'): {
                value = 1;
                break;
            }
            default: {
                value = <any>data - 0;
            }
        }

        isNaN(value) && (value = 0);

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static flexBasis(data: string): FlexBasis {

        const value: FlexBasis = new FlexBasis();

        switch (data) {
            case ('auto'): {
                value.auto = true;
                break;
            }
            default: {
                // value.value = Tools.lengthData(data)._d;
                value.value = Tools.lengthData(data)[1];
            }
        }

        return value;
    }
    /**
     * 解析 border 数据
     * @param data border 
     */
    public static borderWidth(data: string) {
        data = this.format_space(data);
        
        return this.box(data,YGEdge.YGEdgeAll);

        // // let _d: LengthData;
        // let _d: ILengthData;

        // if (data === undefined) {
        //     // _d = new LengthData(LengthUnitType.Pixel, 0);
        //     _d = [LengthUnitType.Pixel, 0];
        // } else {
        //     _d = Tools.lengthData(data);
        // }

        // return _d; 
    }
    /**
     * 解析 border 数据
     * @param data border 
     */
    public static borderColor(data: string) {
        return Tools.backgroundColor(data);
    }
    /**
     * 解析 border 数据
     * @param data border 
     */
    public static borderRadius(data: string): number {
        // return Tools.lengthData(data)._d;
        return Tools.lengthData(data)[1];
    }
    /**
     * 解析 margin 数据
     * @param data margin 
     */
    public static margin(data: string) {
        data = this.format_space(data);

        return Tools.box(data);
    }
    /**
     * 解析 margin 数据
     * @param data margin 
     */
    public static marginTop(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 margin 数据
     * @param data margin 
     */
    public static marginRight(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 margin 数据
     * @param data margin 
     */
    public static marginBottom(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 margin 数据
     * @param data margin 
     */
    public static marginLeft(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 padding 数据
     * @param data padding 
     */
    public static padding(data: string) {
        data = this.format_space(data);

        return Tools.box(data);
    }
    /**
     * 解析 padding 数据
     * @param data padding 
     */
    public static paddingTop(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 padding 数据
     * @param data padding 
     */
    public static paddingRight(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 padding 数据
     * @param data padding 
     */
    public static paddingBottom(data: string) {

        return Tools.boxOneSide(data);
    }
    /**
     * 解析 padding 数据
     * @param data padding 
     */
    public static paddingLeft(data: string) {
        return Tools.boxOneSide(data);
    }
    /**
     * 解析 Position 样式
     * @param data Position 样式
     */
    public static position(data: string) {

        let _d: number;

        switch (data) {
            case (`absolute`): {
                _d = YGPositionType.YGPositionTypeAbsolute;
                break;
            }
            case (`relative`): {
                _d = YGPositionType.YGPositionTypeRelative;
                break;
            }
            default: {
                Tools.warn(`无效 position : ${data}`);
            }
        }

        return _d;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static left(data: string) {
        return Tools.lengthData(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static top(data: string) {
        return Tools.lengthData(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static right(data: string) {
        return Tools.lengthData(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static bottom(data: string) {
        return Tools.lengthData(data);
    }
    /**
     * 
     * @param data html 样式数据
     * * translate(<percent>|<pixel>,<percent>|<pixel>) rotate(<deg>) scale(<decimal>,<decimal>) 
     */
    // public static transform(data: string) {
    //     const result: Transform = new Transform();
    //     const datas = data.split(') ');
    //     datas.forEach(str => {
    //         switch (str[0]) {
    //             case ('m'): {
    //                 this._matrix(str, result);
    //                 break;
    //             }
    //             case ('t'): {
    //                 this._translate(str, result);
    //                 break;
    //             }
    //             case ('s'): {
    //                 this._scale(str, result);
    //                 break;
    //             }
    //             case ('r'): {
    //                 this._rotate(str, result);
    //                 break;
    //             }
    //             default: 
    //         }
    //     });

    //     return result;
    // }
    
    public static transform(data: string) {
        data = this.format_space(data);

        const result: ITransform = [];

        const datas = data.split(') ');
        datas.forEach(str => {
            switch (str[0]) {
                case ('m'): {
                    this._matrix(str, result);
                    break;
                }
                case ('t'): {
                    this._translate(str, result);
                    break;
                }
                case ('s'): {
                    this._scale(str, result);
                    break;
                }
                case ('r'): {
                    this._rotate(str, result);
                    break;
                }
                default: {
                    Tools.warn(`无效 transform : ${data}`);
                }
            }
        });

        return result;
    }
    public static readTransform(data: ITransform) {
        const newData: IEnumTransformData = {
            r: 0,
            t: [[0, 0], [0, 0]],
            s: [1, 1]
        };

        data.forEach(v => {
            newData[v.t] = v.d;
        });

        return newData;
    }
    public static copyEnumTransformData(data: IEnumTransformData): IEnumTransformData {
        const newData: IEnumTransformData = {
            r: 0,
            t: [[0, 0], [0, 0]],
            s: [1, 1]
        };

        data.r !== undefined && (newData.r = data.r);
        data.s !== undefined && (newData.s = Vector2.cloneFromIVector2(data.s));
        data.t !== undefined && (newData.t = LengthVector2.cloneFromILengthVector2(data.t));

        return newData;
    }
    public static copyLengthData(data: ILengthData): ILengthData {
        return LengthData.cloneFromILengthData(data);
    }
    public static mixEnumTransformData(comparePercent: number, last: IEnumTransformData, next: IEnumTransformData): IEnumTransformData {
        const newData: IEnumTransformData = {
            r: 0,
            t: [[0, 0], [0, 0]],
            s: [1, 1]
        };

        if (last === undefined) {
            last = newData;
        }
        
        if (next === undefined) {
            next = newData;
        }

        newData.r = Tools.mixNumber(comparePercent, last.r, next.r);
        newData.s = Tools.mixIVector2(comparePercent, last.s, next.s);
        newData.t = Tools.mixILengthVector2(comparePercent, last.t, next.t);

        return newData;
    }
    public static mixNumber(comparePercent: number, last: number, next: number) {
        return last + (next - last) * comparePercent;
    }
    public static mixILengthData(comparePercent: number, last: ILengthData, next: ILengthData) {
        return LengthData.mixILengthData(comparePercent, last, next);
    }
    public static mixIVector2(comparePercent: number, last: IVector2, next: IVector2) {
        return Vector2.mixIVector2(comparePercent, last, next);
    }
    public static mixILengthVector2(comparePercent: number, last: ILengthVector2, next: ILengthVector2) {
        return LengthVector2.mixILengthVector2(comparePercent, last, next);
    }
    /**
     * 变换中心
     * @param data html
     * * <percent> | <pixel> 
     */
    public static transformOrigin(data: string) {
        data = this.format_space(data);

        // let x: LengthData, y: LengthData;
        // const value     = data.split(' ');
        // if (value[0] !== undefined) {
        //     x = this.lengthData(<any>value[0].trim());
        // }
        // if (value[1] !== undefined) {
        //     y = this.lengthData(<any>value[1].trim());
        // } else {
        //     y = this.lengthData(<any>value[0].trim());
        // }

        // return new LengthVector2(x, y);
        
        let x: ILengthData, y: ILengthData;
        const value     = data.split(' ');
        if (value[0] !== undefined) {
            x = this.lengthData(<any>value[0].trim());
        }
        if (value[1] !== undefined) {
            y = this.lengthData(<any>value[1].trim());
        } else {
            y = this.lengthData(<any>value[0].trim());
        }

        return <ILengthVector2>[x, y];
    }
    public static translate(data: string) {
        data = this.format_space(data);

        // let x: LengthData, y: LengthData;
        // const value     = data.split(',');
        // if (value[0] !== undefined) {
        //     x = this.translateX(<any>value[0].trim());
        // }
        // if (value[1] !== undefined) {
        //     y = this.translateY(<any>value[1].trim());
        // } else {
        //     y = this.translateY(<any>value[0].trim());
        // }

        // return new LengthVector2(x, y);
        
        let x: ILengthData, y: ILengthData;
        const value     = data.split(',');
        if (value[0] !== undefined) {
            x = this.translateX(<any>value[0].trim());
        }
        if (value[1] !== undefined) {
            y = this.translateY(<any>value[1].trim());
        } else {
            y = this.translateY(<any>value[0].trim());
        }

        return <ILengthVector2>[x, y];
    }
    public static translateX(data: string) {
        data = this.format_space(data);

        return this.ananly_translate(data);
    }
    public static translateY(data: string) {
        data = this.format_space(data);

        return this.ananly_translate(data);
    }
    // public static scale(data: string) {
    //     let x: number = 0, y: number = 0;
    //     const value     = data.split(',');
    //     if (value[0] !== undefined) {
    //         x = (<any>value[0].trim()) - 0;
    //     }
    //     if (value[1] !== undefined) {
    //         y = (<any>value[0].trim()) - 0;
    //     } else {
    //         y = x;
    //     }

    //     return new Vector2(x, y);
    // }
    public static scale(data: string) {
        data = this.format_space(data);

        let x: number = 0, y: number = 0;
        const value     = data.split(',');
        if (value[0] !== undefined) {
            x = (<any>value[0].trim()) - 0;
        }
        if (value[1] !== undefined) {
            y = (<any>value[0].trim()) - 0;
        } else {
            y = x;
        }

        return [x, y];
    }
    public static rotate(data: string) {
        data = this.format_space(data);

        return (<any>data.trim()).replace('deg', '') - 0;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static whiteSpace(data: string) {
        data = this.format_space(data);
        
        let _d: number;

        switch (data) {
            case ('normal'): {
                _d = WhiteSpace.Normal;
                break;
            }
            case ('nowrap'): {
                _d = WhiteSpace.Nowrap;
                break;
            }
            case ('pre-wrap'): {
                _d = WhiteSpace.PreWrap;
                break;
            }
            case ('pre'): {
                _d = WhiteSpace.Undefined;
                Tools.warn(`white-space 不支持 'pre'.`);
                break;
            }
            case ('pre-line'): {
                _d = WhiteSpace.PreLine;
                break;
            }
            default: {
                Tools.warn(`无效 WhiteSpace : ${data}`);
                _d = WhiteSpace.Undefined;
            }
        }
        
        return _d;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static wordSpacing(data: string): number {
        // let value: number;

        // if (data !== undefined) {
        //     value = Tools.lengthData(data)._d;
        // }

        // return value;
        
        let value: number;

        if (data !== undefined) {
            value = Tools.lengthData(data)[1];
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     */
    // public static letterSpacing(data: string): LengthData {
    //     return Tools.lengthData(data);
    // }
    public static letterSpacing(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    // public static lineHeight(data: string): LengthData {
    //     return Tools.lengthData(data);
    // }
    public static lineHeight(data: string): ILengthData {
        return Tools.lengthData(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static fontFamily(data: string) {
        return data;
    }
    public static fontSize(data: any) {
        // const _d: LengthData = Tools.lengthData(data);
        // let value: number;
        // if (_d !== undefined) {
        //     value = _d._d;
        // }

        // return value;
        
        const _d: ILengthData = Tools.lengthData(data);
        let value: number;
        if (_d !== undefined) {
            value = _d[1];
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static fontStyle(data: string): FontStyle {
        let _d: FontStyle;
        switch (data) {
            case ('normal'): {
                _d = FontStyle.Normal;
                break;
            }
            case ('italic'): {
                _d = FontStyle.Ttalic;
                break;
            }
            case ('oblique'): {
                _d = FontStyle.Oblique;
                break;
            }
            default: {
                Tools.warn(`无效 fontStyle : ${data}`);
                _d = FontStyle.Undefined;
            }
        }

        return _d;
    }
    /**
     * 
     * @param data html 样式数据
     * * iOS 环境 设置为数值时有问题 ()
     */
    public static fontWeight(data: string): FontWeight {
        
        let _d: number;

        switch (data) {
            case ('100'): {
                _d = FontWeight.One;
                break;
            }
            case ('200'): {
                _d = FontWeight.Two;
                break;
            }
            case ('300'): {
                _d = FontWeight.Three;
                break;
            }
            case ('400'): {
                _d = FontWeight.Four;
                break;
            }
            case ('500'): {
                _d = FontWeight.Five;
                break;
            }
            case ('600'): {
                _d = FontWeight.Six;
                break;
            }
            case ('700'): {
                _d = FontWeight.Seven;
                break;
            }
            case ('800'): {
                _d = FontWeight.Eight;
                break;
            }
            case ('900'): {
                _d = FontWeight.Nine;
                break;
            }
            case ('Normal'): {
                _d = FontWeight.Normal;
                break;
            }
            case ('Bold'): {
                _d = FontWeight.Bold;
                break;
            }
            case ('Bolder'): {
                _d = FontWeight.Bolder;
                break;
            }
            case ('Lighter'): {
                _d = FontWeight.Lighter;
                break;
            }
            default: {
                Tools.warn(`无效 FontWeight : ${data}`);
                _d = FontWeight.Undefined;
            }
        }

        return _d;
    }
    public static fontVariant(data: string): number {
        return 0;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static textContent(data: string): string {
        return data;
    }
    /**
     * 
     * @param data html 样式数据
     * * #fc0 1px 0 10px
     */
    public static textShadow(data: string) {
        data = this.format_space(data);

        // const result: Shadow = new Shadow();
        // const values = data.split(' ');

        // if (values.length === 4) {
        //     result.color = this.backgroundColor(<any>values[0]);
        //     result.h    = this.lengthData(<any>values[1])._d;
        //     result.v    = this.lengthData(<any>values[2])._d;
        //     result.blur = this.lengthData(<any>values[3])._d;
        
        //     return result;
        // } else {
        //     Tools.warn(`Shadow template: color | offset-x | offset-y | blur-radius ; example: #fc0 1px 2px 10px`);
    
        //     return ;
        // }
        
        const result: IShadow = <any>[];
        const values = data.split(' ');

        if (values.length === 4) {
            result[2]   = this.backgroundColor(<any>values[0]);
            result[0]   = this.lengthData(<any>values[1])[1];
            result[1]   = this.lengthData(<any>values[2])[1];
            result[3]   = this.lengthData(<any>values[3])[1];
        
            return result;
        } else {
            Tools.warn(`Shadow 错误: color | offset-x | offset-y | blur-radius ; example: #fc0 1px 2px 10px`);
    
            return ;
        }
    }
    public static boxShadow(data: string) {
        return this.textShadow(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static textAlign(data: string): TextAlign {
        
        let _d: number;

        switch (data) {
            case ('left'): {
                _d = TextAlign.Left;
                break;
            }
            case ('right'): {
                _d = TextAlign.Right;
                break;
            }
            case ('center'): {
                _d = TextAlign.Center;
                break;
            }
            case ('justify'): {
                _d = TextAlign.Justify;
                break;
            }
            default: {
                _d = TextAlign.Undefined;
            }
        }

        return _d;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static textDecoration(data: string): number {
        
        let _d: number;

        switch (data) {
            case ('left'): {
                _d = TextDirection.Left;
                break;
            }
            case ('right'): {
                _d = TextDirection.Right;
                break;
            }
            case ('top'): {
                _d = TextDirection.Top;
                break;
            }
            case ('bottom'): {
                _d = TextDirection.Bootom;
                break;
            }
            default: {
                Tools.warn(`无效 textDecoration : ${data}`);
                _d = TextDirection.Undefined;
            }
        }

        return _d;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static textIndent(data: string): number {
        
        // let _d: number;

        // _d = this.lengthData(data)._d;

        // return _d;
        
        let _d: number;

        _d = this.lengthData(data)[1];

        return _d;
    }
    public static textStroke(data: string) {
        data = this.format_space(data);
        let res: number[];

        const cmdList = data.split(' ');
        if (cmdList.length === 2) {
            const lenData = this.lengthData(cmdList[0]);
            const rgba = this.backgroundColor(cmdList[1]);
            res = [lenData[1], rgba[0], rgba[1], rgba[2], rgba[3]];
        }

        return res;
    }
    public static textGradient(data: string) {
        return this.background(data);
    }
    public static textGradient_(data: string) {
        return this.background_(data);
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static textTransform(data: string): number {
        
        let _d: number;

        switch (data) {
            case ('left'): {
                _d = 1;
                break;
            }
            default: {
                _d = 0;
            }
        }

        return _d;
    }
    public static textOverflow(data: string) {
        return 0;
    }
    public static unicodeBidi(data: string) {
        return 0;
    }
    /**
     * 
     * @param data html 样式数据
     */
    public static verticalAlign(data: string): VerticalAlign {
        
        let _d: number;

        switch (data) {
            case ('bottom'): {
                _d = VerticalAlign.Bootom;
                break;
            }
            case ('center'): {
                _d = VerticalAlign.Center;
                break;
            }
            case ('top'): {
                _d = VerticalAlign.Top;
                break;
            }
            default: {
                _d = VerticalAlign.Undefined;
            }
        }

        return _d;
    }
    /**
     * 
     * @param data html 样式数据 
     */
    public static alignSelf(data: string): YGAlign {
        let value: YGAlign;

        switch (data) {
            case 'space-between': {
                value = YGAlign.YGAlignSpaceBetween;
                break;
            }
            case 'space-around': {
                value = YGAlign.YGAlignSpaceAround;
                break;
            }
            case 'center': {
                value = YGAlign.YGAlignCenter;
                break;
            }
            case 'flex-end': {
                value = YGAlign.YGAlignFlexEnd;
                break;
            }
            case 'flex-start': {
                value = YGAlign.YGAlignFlexStart;
                break;
            }
            case 'stretch': {
                value = YGAlign.YGAlignStretch;
                break;
            }
            case 'baseline': {
                value = YGAlign.YGAlignBaseline;
                break;
            }
            default: {
                
                Tools.warn(`无效 alignSelf : ${data}`);
            }
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据 
     */
    public static justifyContent(data: string): YGJustify {
        let value: YGJustify;

        switch (data) {
            case 'center': {
                value = YGJustify.YGJustifyCenter;
                break;
            }
            case 'flex-end': {
                value = YGJustify.YGJustifyFlexEnd;
                break;
            }
            case 'flex-start': {
                value = YGJustify.YGJustifyFlexStart;
                break;
            }
            case 'space-evenly': {
                value = YGJustify.YGJustifySpaceEvenly;
                break;
            }
            case 'space-between': {
                value = YGJustify.YGJustifySpaceBetween;
                break;
            }
            case 'space-around': {
                value = YGJustify.YGJustifySpaceAround;
                break;
            }
            default: {
                Tools.warn(`无效 justifyContent : ${data}`);
                value = YGJustify.YGJustifyFlexStart;
            }
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据 
     */
    public static alignContent(data: string): YGAlign {
        let value: YGAlign;

        switch (data) {
            case 'space-between': {
                value = YGAlign.YGAlignSpaceBetween;
                break;
            }
            case 'space-around': {
                value = YGAlign.YGAlignSpaceAround;
                break;
            }
            case 'center': {
                value = YGAlign.YGAlignCenter;
                break;
            }
            case 'flex-end': {
                value = YGAlign.YGAlignFlexEnd;
                break;
            }
            case 'flex-start': {
                value = YGAlign.YGAlignFlexStart;
                break;
            }
            case 'stretch': {
                value = YGAlign.YGAlignStretch;
                break;
            }
            case 'baseline': {
                value = YGAlign.YGAlignBaseline;
                break;
            }
            default: {
                
                Tools.warn(`无效 alignContent : ${data}`);
            }
        }

        return value;
    }
    /**
     * 
     * @param data html 样式数据 
     */
    public static alignItems(data: string): YGAlign {
        let value: YGAlign;

        switch (data) {
            // case 'auto': {
            //     value = YGAlign.YGAlignAuto;
            //     break;
            // }
            case 'baseline': {
                value = YGAlign.YGAlignBaseline;
                break;
            }
            case 'center': {
                value = YGAlign.YGAlignCenter;
                break;
            }
            case 'flex-end': {
                value = YGAlign.YGAlignFlexEnd;
                break;
            }
            case 'flex-start': {
                value = YGAlign.YGAlignFlexStart;
                break;
            }
            case 'stretch': {
                value = YGAlign.YGAlignStretch;
                break;
            }
            default: {
                
                Tools.warn(`无效 alignItems : ${data}`);
                value = YGAlign.YGAlignAuto;
            }
        }

        return value;
    }
    public static overflow(data: string) {
        
        // const list = data.split(' ');
        // const overFlow = new OverFlow();

        // if (list.length === 1) {
        //    overFlow.x = list[0] === 'hidden' ? YGOverflow.YGOverflowHidden : YGOverflow.YGOverflowVisible;
        //     overFlow.y = overFlow.x;
        // } else {
        //     overFlow.x = list[0] === 'hidden' ? YGOverflow.YGOverflowHidden : YGOverflow.YGOverflowVisible;
        //     overFlow.y = list[1] === 'hidden' ? YGOverflow.YGOverflowHidden : YGOverflow.YGOverflowVisible;
        // }

        // return overFlow;
        
        // hidden  是 表示要裁剪，即为 true
        return data === 'hidden' ? true : false;
    }
    public static oveflowWrap(data: string) {
        let value: number;
        
        switch (data) {
            case ('normal') : {
                value = 1;
                break;
            }
            case ('word-break') : {
                value = 2;
                break;
            }
            default: 
                value = 0;
        }

        return value;
    }
    public static overflowX(data: string): YGOverflow {
        return data === 'hidden' ? YGOverflow.YGOverflowHidden : YGOverflow.YGOverflowVisible;
    }
    public static overflowY(data: string): YGOverflow {
        return data === 'hidden' ? YGOverflow.YGOverflowHidden : YGOverflow.YGOverflowVisible;
    }
    public static scroll(data: string): ScrollInfo {
        
        const list = data.split(' ');
        const scrollInfo = new ScrollInfo();

        switch (list[0]) {
            case ('x'): {
                scrollInfo.path = ScrollPaths.x;
                break;
            }
            case ('y'): {
                scrollInfo.path = ScrollPaths.y;
                break;
            }
            case ('xy'): {
                scrollInfo.path = ScrollPaths.xy;
                break;
            }
            default: 
        }

        switch (list[1]) {
            case ('none'): {
                scrollInfo.style = ScrollTypes.none;
                break;
            }
            default: 
                scrollInfo.style = ScrollTypes.none;
        }

        return scrollInfo;
    }
    public static direction(data: string) {
        return data;
    }
    public static outlineColor(data: any) {
        return this.backgroundColor(data);
    }
    public static outlineWidth(data: any) {
        return Tools.lengthData(data);
    }
    public static outlineOffset(data: any) {
        return Tools.lengthData(data);
    }
    public static outlineStyle(data: any) {
        return 0;
    }
    public static pointerEvents(data: string) {
        if (Tools.noValue(data)) {
            return EnabledTypes.auto;
        } else {
            return (this.format_space(data) === 'none') ? EnabledTypes.none : EnabledTypes.visible;
        }
    }
    public static objectFit(data: string) {
        data = this.format_space(data);
        switch (data) {
            case ('fill'): {
                return FitTypes.None;
            }
            case ('contain'): {
                return FitTypes.Contain;
            }
            case ('cover'): {
                return FitTypes.Cover;
            }
            case ('scale-down'): {
                return FitTypes.ScaleDown;
            }
            case ('none'): 
            default: {
                return FitTypes.None;
            }
        }
    }
    public static animation(data: string) {
        data = this.format_space(data);

        const cmdList = data.split(',');
        const result: AnimationCmd[] = [];

        cmdList.forEach(cmd => {
            result.push(this.analyAnimationCmd(cmd.trim()));
        });

        return result;
    }
    public static borderImage(data: string) {
        data = this.format_space(data);
        let url: string, left: number, top: number, bottom: number, right: number, mode: number = BorderImageRepeat.Space;
        const slices: number[] = [];
        let tempCmd: string;

        const cmdList = data.split(' ');
        const len = cmdList.length;
        
        for (let i = 0; i < len; i++) {
            tempCmd = cmdList[i];
            const temp = <any>tempCmd - 0;
            if (!isNaN(temp)) {
                slices.push(temp / 100);
            } else if (i === 0) {
                url = tempCmd.replace('url(', '').replace(')', '');
            } else {
                mode = this._repeatAnaly(tempCmd);
            }
        }

        top         = slices[0];
        right       = this.noValue(slices[1])   ? top   : slices[1]; 
        bottom      = this.noValue(slices[2])   ? top   : slices[2]; 
        left        = this.noValue(slices[3])   ? right : slices[3]; 

        return [url,top,right,bottom,left,mode];
    }
    public static borderImageClip(data: string) {
        return this._clipAnaly(data);
    }
    public static borderImageSource(data: string) {
        return data.replace('url(', '').replace(')', '');
    }
    public static borderImageSlice(data: string) {
        return this._sliceAnaly(data);
    }
    public static borderImageRepeat(data: string) {
        data = this.format_space(data);

        const cmdList = data.split(' ');
        const h = this._repeatAnaly(cmdList[0]);
        const v = cmdList[1] === undefined ? h : this._repeatAnaly(cmdList[1]);

        return [h, v];
    }
    public static _repeatAnaly(data: string) {
        let mode: BorderImageRepeat;
        switch (data) {
            case 'stretch': {
                mode = BorderImageRepeat.Stretch;
                break;
            }
            case 'round': {
                mode = BorderImageRepeat.Round;
                break;
            }
            case 'repeat': {
                mode = BorderImageRepeat.Repeat;
                break;
            }
            default: {
                Tools.warn(`无效 BorderImageRepeat : ${data}`);
                mode = BorderImageRepeat.Space;
            }
        }

        return mode;
    }
    public static imageClip(data: string) {
        return this._clipAnaly(data);
    }
    public static _clipAnaly(data: string) {
        data = this.format_space(data);

        let left: number, top: number, bottom: number, right: number;
        const slices: number[] = [];
        const slicesType: number[] = [];
        let tempCmd: string;

        const cmdList = data.split(' ');
        const len = cmdList.length;

        for (let i = 0; i < len; i++) {
            tempCmd = cmdList[i];
            const temp: ILengthData = this.lengthData(tempCmd);
            
            if (temp[0] === 0) {
                slicesType[i] = temp[0];
                slices[i] = temp[1];
            } else if (temp[0] === 1) {
                slicesType[i] = temp[0];
                slices[i] = temp[1] / 100;
            } else {
                slicesType[i] = temp[0];
                slices[i] = 0;
            }
            
        }
        
        top         = slices[0] ? slices[0] : 0;
        right       = this.noValue(slices[1])   ? top   : slices[1]; 
        bottom      = this.noValue(slices[2])   ? top   : slices[2]; 
        left        = this.noValue(slices[3])   ? right : slices[3]; 

        return [top,right,bottom,left,slicesType[0]];
    }
    public static _sliceAnaly(data: string) {
        data = this.format_space(data);

        let left: number, top: number, bottom: number, right: number, mode: number = 0;
        const slices: number[] = [];
        const slicesType: number[] = [];
        let tempCmd: string;

        const cmdList = data.split(' ');
        const len = cmdList.length;
        
        for (let i = 0; i < len; i++) {
            tempCmd = cmdList[i];
            const temp: ILengthData = this.lengthData(tempCmd);
            if (temp[0] === 0) {
                slicesType.push(temp[0]);
                slices.push(temp[1]);
            } else if (temp[0] === 1) {
                slicesType.push(temp[0]);
                slices.push(temp[1] / 100);
            } else {
                mode = 0;
            }
            
            mode = tempCmd === 'fill' ? 1 : 0;
        }

        top         = slices[0];
        right       = this.noValue(slices[1])   ? top   : slices[1]; 
        bottom      = this.noValue(slices[2])   ? top   : slices[2]; 
        left        = this.noValue(slices[3])   ? right : slices[3]; 

        return [top,right,bottom,left,mode,slicesType[0]];
    } 
    /**
     * 
     * @param data html css
     */
    public static cellId(data: string) {
        return (<any>data) - 0;
    }
    public static noValue(value: any) {
        return value === undefined || value === null;
    }
    public static format_space = (value: string) => {
        return value.replace(/\s+/g, ' ').replace(', ', ',');
    }

    public static analy(key: string, data: string) {
        if (Tools[AnalyMap[key]]) {
            return Tools[AnalyMap[key]](data);
        } else {
            Tools.error(`无法解析：${key}`);
        }
    }
    /**
     * 
     * @param data html 样式数据
     */
    private static boxOneSide(data: string) {
        return Tools.lengthData(data);
    }
    /**
     * 解析 盒子模型相关 数据
     * @param data html 样式数据 
     */
    private static box(data: string, cType: YGEdge = YGEdge.YGEdgeAll) {
        // const result: BoxData = new BoxData();
        
        // let list = data.split(' ');

        // if (cType === YGEdge.YGEdgeAll) {
        //     if (list.length === 1) {
        //         result.all = Tools.lengthData(list[0]);
        //     } else {
        //         if (list[0]) {
        //             result.top = Tools.lengthData(list[0]);
        //         }
                
        //         if (list[1]) {
        //             result.right = Tools.lengthData(list[1]);
        //         }
    
        //         if (list[2]) {
        //             result.bottom = Tools.lengthData(list[2]);
        //         } else {
        //             result.bottom = result.top.clone();
        //         }
    
        //         if (list[3]) {
        //             result.left = Tools.lengthData(list[3]);
        //         } else {
        //             result.left = result.right.clone();
        //         }
    
        //         list = undefined;
        //     }
        // }

        // return result;
        
        const result: IBoxData = [undefined,undefined,undefined,undefined,undefined];
        
        let list = data.split(' ');

        if (cType === YGEdge.YGEdgeAll) {
            if (list.length === 1) {
                result[BoxA] = Tools.lengthData(list[0]);
            } else {
                if (list[0]) {
                    result[BoxT] = Tools.lengthData(list[0]);
                }
                
                if (list[1]) {
                    result[BoxR] = Tools.lengthData(list[1]);
                }
    
                if (list[2]) {
                    result[BoxB] = Tools.lengthData(list[2]);
                } else {
                    result[BoxB] = Tools.lengthData(list[0]);
                }
    
                if (list[3]) {
                    result[BoxL] = Tools.lengthData(list[3]);
                } else {
                    result[BoxL] = Tools.lengthData(list[1]);
                }
    
                list = undefined;
            }
        }

        return result;
    }
    /**
     * 
     * @param data html 样式数据
     * @param result 解析结果
     */
    // private static _translate(data: string, result: Transform) {
        // let x: LengthData, y: LengthData;
        // const keys      = data.split('(');
        // const value     = keys[1].split(')')[0].split(',');
        // switch (keys[0]) {
        //     case ('translate'): {
        //         if (value[0] !== undefined) {
        //             x = this.translateX(value[0].trim());
        //         }
        //         if (value[1] !== undefined) {
        //             y = this.translateY(value[1].trim());
        //         } else {
        //             y = this.translateY(value[0].trim());
        //         }
        //         if (x !== undefined && y !== undefined) {
        //             result.translate = new LengthVector2(x, y);
        //         }
        //         break;
        //     }
        //     // case ('translate3d'): {
        //     //     this.translate3d = value;
        //     //     break;
        //     // }
        //     // case ('translateX'): {
        //     //     this.translateX = value;
        //     //     break;
        //     // }
        //     // case ('translateY'): {
        //     //     this.translateY = value;
        //     //     break;
        //     // }
        //     // case ('translateZ'): {
        //     //     this.translateZ = value;
        //     //     break;
        //     // }
        //     default:
        //         result.translate = LengthVector2.Zero();
        // }
    // }
       
    private static _translate(data: string, result: ITransform) { 
        data = this.format_space(data);

        let x: ILengthData = [0, 0], y: ILengthData = [0,0];
        const keys      = data.split('(');
        const value     = keys[1].split(')')[0].split(',');
        switch (keys[0]) {
            case ('translate'): {
                if (value[0] !== undefined) {
                    x = this.translateX(value[0].trim());
                }
                if (value[1] !== undefined) {
                    y = this.translateY(value[1].trim());
                } else {
                    y = this.translateY(value[0].trim());
                }
                if (x !== undefined && y !== undefined) {
                    result.push({ t: ITransformDataType.translate, d: [x, y] });
                }
                break;
            }
            // case ('translate3d'): {
            //     this.translate3d = value;
            //     break;
            // }
            case ('translateX'): {
                x = this.translateX(value[0].trim());
                result.push({ t: ITransformDataType.translate, d: [x, y] });
                break;
            }
            case ('translateY'): {
                y = this.translateX(value[0].trim());
                result.push({ t: ITransformDataType.translate, d: [x, y] });
                break;
            }
            // case ('translateZ'): {
            //     this.translateZ = value;
            //     break;
            // }
            default:
                result.push({ t: ITransformDataType.translate, d: [x, y] });
        }
    }
    
    private static ananly_translate(data: string) {
        // let value: LengthData;
        // value = this.lengthData(<any>data.trim());

        // return value;
        
        let value: ILengthData;
        value = this.lengthData(<any>data.trim());

        return value;
    }
    /**
     * 
     * @param data html 样式数据
     * @param result 解析结果
     */
    // private static _rotate(data: string, result: Transform) {
    //     const keys      = data.split('(');
    //     const value     = keys[1].split(')')[0];
    //     switch (keys[0]) {
    //         case ('rotate'): {
    //             result.rotate = (<any>value.trim().replace('deg', '')) - 0;
    //             break;
    //         }
    //         // case ('rotate3d'): {
    //         //     this.rotate3d = value;
    //         //     break;
    //         // }
    //         // case ('rotateX'): {
    //         //     this.rotateX = value;
    //         //     break;
    //         // }
    //         // case ('rotateY'): {
    //         //     this.rotateY = value;
    //         //     break;
    //         // }
    //         // case ('rotateZ'): {
    //         //     this.rotateZ = value;
    //         //     break;
    //         // }
    //         default:
    //             result.rotate = 0;
    //     }
    // }
    private static _rotate(data: string, result: ITransform) {
        data = this.format_space(data);
        
        const keys      = data.split('(');
        const value     = keys[1].split(')')[0];
        const rotate    = (<any>value.trim().replace('deg', '')) - 0;
        switch (keys[0]) {
            case ('rotate'): {
                // result[ITransR] = (<any>value.trim().replace('deg', '')) - 0;
                result.push({ t: ITransformDataType.rotateZ, d: rotate });
                break;
            }
            // case ('rotate3d'): {
            //     this.rotate3d = value;
            //     break;
            // }
            // case ('rotateX'): {
            //     this.rotateX = value;
            //     break;
            // }
            // case ('rotateY'): {
            //     this.rotateY = value;
            //     break;
            // }
            case ('rotateZ'): {
                result.push({ t: ITransformDataType.rotateZ, d: rotate });
                break;
            }
            default:
                result.push({ t: ITransformDataType.rotateZ, d: 0 });
        }
    }
    /**
     * 
     * @param data html 样式数据
     * @param result 解析结果
     */
    // private static _scale(data: string, result: Transform) {
    //     let x: number = 0, y: number = 0;
    //     const keys      = data.split('(');
    //     const value     = keys[1].split(')')[0].split(',');
    //     switch (keys[0]) {
    //         case ('scale'): {
    //             if (value[0] !== undefined) {
    //                 x = (<any>value[0]).trim() - 0;
    //             }
    //             if (value[1] !== undefined) {
    //                 y = (<any>value[1]).trim() - 0;
    //             } else {
    //                 y = x;
    //             }
    //             if (x !== undefined && y !== undefined) {
    //                 result.scale = new Vector2(x, y);
    //             }
    //             break;
    //         }
    //         // case ('scale3d'): {
    //         //     this.scale3d = value;
    //         //     break;
    //         // }
    //         // case ('scaleX'): {
    //         //     this.scaleX = value;
    //         //     break;
    //         // }
    //         // case ('scaleY'): {
    //         //     this.scaleY = value;
    //         //     break;
    //         // }
    //         // case ('scaleZ'): {
    //         //     this.scaleZ = value;
    //         //     break;
    //         // }
    //         default:
    //             result.scale = new Vector2(x, y);
    //     }
    // }
    private static _scale(data: string, result: ITransform) {
        let x: number = 1, y: number = 1;
        const keys      = data.split('(');
        const value     = keys[1].split(')')[0].split(',');
        switch (keys[0]) {
            case ('scale'): {
                if (value[0] !== undefined) {
                    x = (<any>value[0]).trim() - 0;
                }
                if (value[1] !== undefined) {
                    y = (<any>value[1]).trim() - 0;
                } else {
                    y = x;
                }
                if (x !== undefined && y !== undefined) {
                    // result[ITransS] = [x, y];
                    result.push({ t: ITransformDataType.scale, d: [x, y] });
                }
                break;
            }
            // case ('scale3d'): {
            //     this.scale3d = value;
            //     break;
            // }
            case ('scaleX'): {
                x = (<any>value[0]).trim() - 0;
                result.push({ t: ITransformDataType.scale, d: [x, y] });
                break;
            }
            case ('scaleY'): {
                y = (<any>value[0]).trim() - 0;
                result.push({ t: ITransformDataType.scale, d: [x, y] });
                break;
            }
            // case ('scaleZ'): {
            //     this.scaleZ = value;
            //     break;
            // }
            default:
                result.push({ t: ITransformDataType.scale, d: [1, 1] });
        }
    }
    /**
     * 
     * @param data html 样式数据
     * @param result 解析结果
     */
    // private static _matrix(data: string, result: Transform) {
    //     const keys      = data.split('(');
    //     const value     = keys[1].split(')')[0];

    //     switch (keys[0]) {
    //         case ('matrix'): {
    //             result.matrix = value.trim();
    //             break;
    //         }
    //         // case ('matrix3d'): {
    //         //     result.matrix3d = value;
    //         //     break;
    //         // }
    //         default:
    //     }
    // }
    private static _matrix(data: string, result: ITransform) {
        const keys      = data.split('(');
        const value     = keys[1].split(')')[0];

        switch (keys[0]) {
            case ('matrix'): {
                // result.push(value.trim()); 
                break;
            }
            // case ('matrix3d'): {
            //     result.matrix3d = value;
            //     break;
            // }
            default:
        }
    }
    private static alignEnum(data: string) {
        let value: YGAlign;

        switch (data) {
            case 'space-between': {
                value = YGAlign.YGAlignSpaceBetween;
                break;
            }
            case 'space-around': {
                value = YGAlign.YGAlignSpaceAround;
                break;
            }
            case 'center': {
                value = YGAlign.YGAlignCenter;
                break;
            }
            case 'flex-end': {
                value = YGAlign.YGAlignFlexEnd;
                break;
            }
            case 'flex-start': {
                value = YGAlign.YGAlignFlexStart;
                break;
            }
            case 'stretch': {
                value = YGAlign.YGAlignStretch;
                break;
            }
            case 'baseline': {
                value = YGAlign.YGAlignBaseline;
                break;
            }
            default:
        }

        return value;
    }
    /**
     * 
     * @param data html css
     * @example background: linear-gradient(30deg, #eee000, #cf0800 10%, #600000 50%, #996990);
     * * 最多四个颜色
     */
    private static lineGradient(data: string) {
        let gradientData: GradientData;
        // 
        const param = data.match(/\(([^)]*)\)/)[1];

        if (param) {
            const list: [string, string, string, string, string] = <any>param.split(',');

            gradientData = new GradientData();
            gradientData._t = GradientTypes.linear;
            gradientData.direction = this.computeAngle(list[0].trim());
            gradientData.color_and_positions = this.analyColorAndPos(list);
        }
        
        return gradientData;
    }
    /**
     * 
     * @param data html css
     * @example background: radial-gradient(circle at 50% 50%, #eee000, #cf0800 10%, #600000 50%, #996990);。
     * * 最多四个颜色
     */
    private static radioGradient(data: string) {
        let gradientData: GradientData;
        // 
        const param = data.match(/\(([^)]*)\)/)[1];

        if (param) {
            const list: [string, string, string, string, string] = <any>param.split(','); 
            gradientData = new GradientData();
            gradientData._t = GradientTypes.radial;
            gradientData.color_and_positions = this.analyColorAndPos(list);
            this.analyCircle(list[0], gradientData);
        }

        return gradientData;
    }

    /**
     * 
     * @param data deg
     * @example 10deg
     * * 设置值无效时默认为 0
     * * WEBGL 0 度 为 x 正方向
     * * DOM 0 度 为 y 正方向
     */
    private static computeAngle(data: string) {
        let value: number = 0;

        const len = data.length;
        if (data[len - 3] === 'd'
            && data[len - 2] === 'e'
            && data[len - 1] === 'g'
        ) {
            data = data.substr(0, len - 3);
            value = <any>data - 0;

            isNaN(value) && (value = 0);
        }

        return value - 90; 
    }
    private static computeRadian(data: string) {
        // 
    }
    // private static analyColorAndPos(list: [string, string, string, string, string]) {
    //     const valueMaxCount: number = 4;
    //     const valueSize: number = 5;
    //     const valueList: number[] = [];
    //     for (let i = 0; i < valueMaxCount; i++) {
    //         if (list[i + 1] !== undefined) {
    //             const c_p       = list[i + 1].trim().split(' ');
    //             const rgba      = this.backgroundColor(c_p[0]);
    //             const offset    = i * valueSize;
    //             let lenData: LengthData;
    //             let lenValue: number;
                
    //             valueList[offset + 0] = rgba.r;
    //             valueList[offset + 1] = rgba.g;
    //             valueList[offset + 2] = rgba.b;
    //             valueList[offset + 3] = rgba.a;

    //             if (c_p[1] === undefined) {
    //                 lenValue = null;
    //             } else {
    //                 lenData = this.lengthData(c_p[1]);
    //                 if (lenData._t === LengthUnitType.Percent) {
    //                     lenValue = lenData._d / 100;
    //                 } else {
    //                     lenValue = null;
    //                 }
    //             }

    //             // 未设置点位时
    //             if (lenValue === null) {
    //                 valueList[offset + 4] = i === 0 ? 0 : 1;
    //                 // 为未设置值，且判定为末尾时，不再解析后续
    //                 if (i !== 0) {
    //                     break;
    //                 }
    //             } else {
    //                 valueList[offset + 4] = lenValue;
    //             }

    //         } else {
    //             break;
    //         }
    //     }
    //     if (valueList) {
    //         const typeList: Float32Array = new Float32Array(valueList.length);
    //         for (let i = valueList.length - 1; i >= 0; i--) {
    //             typeList[i] = valueList[i];
    //         }

    //         return typeList;
    //     }

    //     return ;
    // }
    private static analyColorAndPos(list: [string, string, string, string, string]) {
        const valueMaxCount: number = 4;
        const valueSize: number = 5;
        const valueList: number[] = [];
        for (let i = 0; i < valueMaxCount; i++) {
            if (list[i + 1] !== undefined) {
                const c_p       = list[i + 1].trim().split(' ');
                const rgba      = this.backgroundColor(c_p[0]);
                const offset    = i * valueSize;
                let lenData: ILengthData;
                let lenValue: number;
                
                valueList[offset + 0] = rgba[0];
                valueList[offset + 1] = rgba[1];
                valueList[offset + 2] = rgba[2];
                valueList[offset + 3] = rgba[3];

                if (c_p[1] === undefined) {
                    lenValue = null;
                } else {
                    lenData = this.lengthData(c_p[1]);
                    if (lenData[0] === LengthUnitType.Percent) {
                        lenValue = lenData[1] / 100;
                    } else {
                        lenValue = null;
                    }
                }

                // 未设置点位时
                if (lenValue === null) {
                    valueList[offset + 4] = i === 0 ? 0 : 1;
                    // 为未设置值，且判定为末尾时，不再解析后续
                    if (i !== 0) {
                        break;
                    }
                } else {
                    valueList[offset + 4] = lenValue;
                }

            } else {
                break;
            }
        }
        if (valueList) {
            const typeList: Float32Array = new Float32Array(valueList.length);
            for (let i = valueList.length - 1; i >= 0; i--) {
                typeList[i] = valueList[i];
            }

            return typeList;
        }

        return ;
    }
    /**
     * 
     * @param data css
     * @example circle at 50% 50%
     * * 设置值无效时默认节点中心 [0.5,0.5]
     */
    // private static analyCircle(data: string, gradientData: GradientData) {
    //     const list: [string, string, string, string, string] = <any>data.split(' ');
    //     const atIndex: number = list.indexOf('at');

    //     if (list[atIndex + 1] !== undefined && list[atIndex + 2] !== undefined) {
    //         gradientData.center_x = this.lengthData(list[atIndex + 1])._d / 100;
    //         gradientData.center_y = this.lengthData(list[atIndex + 2])._d / 100;
    //     } else {
    //         gradientData.center_x = 0.5;
    //         gradientData.center_y = 0.5;
    //     }

    //     gradientData.shape = this.analyRadialGradientShape(list[0]);
    //     gradientData.size = this.analyRadialGradientSize(list[atIndex - 1]);
    // }
    private static analyCircle(data: string, gradientData: GradientData) {
        const list: [string, string, string, string, string] = <any>data.split(' ');
        const atIndex: number = list.indexOf('at');

        if (list[atIndex + 1] !== undefined && list[atIndex + 2] !== undefined) {
            gradientData.center_x = this.lengthData(list[atIndex + 1])[1] / 100;
            gradientData.center_y = this.lengthData(list[atIndex + 2])[1] / 100;
        } else {
            gradientData.center_x = 0.5;
            gradientData.center_y = 0.5;
        }

        gradientData.shape = this.analyRadialGradientShape(list[0]);
        gradientData.size = this.analyRadialGradientSize(list[atIndex - 1]);
    }
    private static analyRadialGradientShape(data: string): RadialGradientShapes {
        let value: RadialGradientShapes;

        switch (data) {
            case ('circle'): {
                value = RadialGradientShapes.circle;
                break;
            }
            case ('ellipse'): 
            default: 
                value = RadialGradientShapes.ellipse;
        }

        return value;
    }
    private static analyRadialGradientSize(data: string): RadialGradientSize {
        let value: RadialGradientSize;

        switch (data) {
            case ('closest-side'): {
                value = RadialGradientSize.ClosestSide;
                break;
            }
            case ('closest-corner'): {
                value = RadialGradientSize.ClosestCorner;
                break;
            }
            case ('farthest-side'): {
                value = RadialGradientSize.FarthestSide;
                break;
            }
            case ('farthest-corner'): 
            default: 
                value = RadialGradientSize.Farthestcorner;
        }

        return value;
    }
    private static analyAnimationCmd(value: string) {

        const keylist = value.split(' ');
        const animationCmd = new AnimationCmd(keylist[0]);

        if (keylist.length !== 7) {
            Tools.error('AnimationCmd Error, 动画样式解析错误！缺少参数');

            return;
        }
        if (keylist[1].indexOf('ms') > 0) {
            animationCmd.duration   = <any>keylist[1].replace('ms','') - 0;
        } else {
            animationCmd.duration   = (<any>keylist[1].replace('s','') - 0) * 1000;
        }

        animationCmd.timingFunction = keylist[2];

        if (keylist[3].indexOf('ms') > 0) {
            animationCmd.delayTime   = <any>keylist[3].replace('ms','') - 0;
        } else {
            animationCmd.delayTime   = (<any>keylist[3].replace('s','') - 0) * 1000;
        }

        animationCmd.iteration  = <any>keylist[4] - 0;
        animationCmd.direction  = <any>keylist[5];
        animationCmd.fillMode   = <any>keylist[6];

        return animationCmd;
    }
}

const AnalyMap = {
    opacity: 'opacity',
    width: 'lengthData',
    height: 'lengthData',
    left: 'lengthData',
    top: 'lengthData',
    transform: 'transform'
};

export let StyleMap = {
    alignContent: 'a',
    alignItems: 'b',
    alignSelf: 'c',
    background: 'd',
    backgroundColor: 'e',
    borderColor: 'f',
    borderImage: 'g',
    borderRadius: 'h',
    borderWidth: 'i',
    bottom: 'j',
    boxShadow: 'k',
    color: 'l',
    direction: 'm',
    display: 'n',
    flexBasis: 'o',
    flexDirection: 'p',
    flexGrow: 'q',
    flexShrink: 'r',
    flexWrap: 's',
    fontFamily: 't',
    fontSize: 'u',
    fontStyle: 'v',
    fontVariant: 'w',
    fontWeight: 'x',
    height: 'y',
    justifyContent: 'z',
    left: 'a0',
    letterSpacing: 'a1',
    lineGradient: 'a2',
    lineHeight: 'a3',
    margin: 'a4',
    marginBottom: 'a5',
    marginLeft: 'a6',
    marginRight: 'a7',
    marginTop: 'a8',
    maxHeight: 'a9',
    maxWidth: 'b0',
    minHeight: 'b1',
    minWidth: 'b2',
    opacity: 'b3',
    // outlineColor: 'b4',
    // outlineOffset: 'b5',
    // outlineStyle: 'b6',
    // outlineWidth: 'b7',
    oveflowWrap: 'b8',
    overflow: 'b9',
    padding: 'c0',
    paddingBottom: 'c1',
    paddingLeft: 'c2',
    paddingRight: 'c3',
    paddingTop: 'c4',
    position: 'c5',
    // radioGradient: 'c6',
    right: 'c7',
    rotate: 'c8',
    scale: 'c9',
    scroll: 'd0',
    // textAlign: 'd1',
    textContent: 'd2',
    textDecoration: 'd3',
    textIndent: 'd4',
    // textOverflow: 'd5',
    textShadow: 'd6',
    textTransform: 'd7',
    top: 'd8',
    transform: 'd9',
    transformOrigin: 'e0',
    translate: 'e1',
    translateX: 'e2',
    translateY: 'e3',
    // unicodeBidi: 'e4',
    // verticalAlign: 'e5',
    visibility: 'e6',
    whiteSpace: 'e7',
    width: 'e8',
    wordSpacing: 'e9',
    zIndex: 'f0',
    textGradient: 'f1',
    textStroke: 'f2',
    pointerEvents: 'f3',
    objectFit: 'f4',
    animation: 'animation',
    borderImageSource: 'borderImageSource',
    borderImageClip: 'borderImageClip',
    borderImageRepeat: 'borderImageRepeat',
    borderImageSlice: 'borderImageSlice',
    imageClip: 'imageClip'
};

export const StyleReflectMap = () => {
    for (const k in StyleMap) {
        StyleMap[StyleMap[k]] = k;
    }
};
StyleReflectMap();

// export enum StyleMap  {
//     alignContent = 'a',
//     alignItems = 'b',
//     alignSelf = 'c',
//     background = 'd',
//     backgroundColor = 'e',
//     borderColor = 'f',
//     borderImage = 'g',
//     borderRadius = 'h',
//     borderWidth = 'i',
//     bottom = 'j',
//     boxShadow = 'k',
//     color = 'l',
//     direction = 'm',
//     display = 'n',
//     flexBasis = 'o',
//     flexDirection = 'p',
//     flexGrow = 'q',
//     flexShrink = 'r',
//     flexWrap = 's',
//     fontFamily = 't',
//     fontSize = 'u',
//     fontStyle = 'v',
//     fontVariant = 'w',
//     fontWeight = 'x',
//     height = 'y',
//     justifyContent = 'z',
//     left = 'a0',
//     letterSpacing = 'a1',
//     lineGradient = 'a2',
//     lineHeight = 'a3',
//     margin = 'a4',
//     marginBottom = 'a5',
//     marginLeft = 'a6',
//     marginRight = 'a7',
//     marginTop = 'a8',
//     maxHeight = 'a9',
//     maxWidth = 'b0',
//     minHeight = 'b1',
//     minWidth = 'b2',
//     opacity = 'b3',
//     outlineColor = 'b4',
//     outlineOffset = 'b5',
//     outlineStyle = 'b6',
//     outlineWidth = 'b7',
//     oveflowWrap = 'b8',
//     overflow = 'b9',
//     padding = 'c0',
//     paddingBottom = 'c1',
//     paddingLeft = 'c2',
//     paddingRight = 'c3',
//     paddingTop = 'c4',
//     position = 'c5',
//     radioGradient = 'c6',
//     right = 'c7',
//     rotate = 'c8',
//     scale = 'c9',
//     scroll = 'd0',
//     textAlign = 'd1',
//     textContent = 'd2',
//     textDecoration = 'd3',
//     textIndent = 'd4',
//     textOverflow = 'd5',
//     textShadow = 'd6',
//     textTransform = 'd7',
//     top = 'd8',
//     transform = 'd9',
//     transformOrigin = 'e0',
//     translate = 'e1',
//     translateX = 'e2',
//     translateY = 'e3',
//     unicodeBidi = 'e4',
//     verticalAlign = 'e5',
//     visibility = 'e6',
//     whiteSpace = 'e7',
//     width = 'e8',
//     wordSpacing = 'e9',
//     zIndex = 'f0'
// }