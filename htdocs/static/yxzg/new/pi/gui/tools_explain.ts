/**
 * gui 节点样式数据解析器
 * * 样式数据被压缩为数组结构，解析为字符串表达
 */

import { GradientData, GradientTypes } from './tools';

/**
 * style 数据解释器
 */

// tslint:disable-next-line:no-unnecessary-class
export class ExplainStyle {
    public static explain(key: string, data: any) {
        let res = '';
        if (data !== undefined && data !== null) {
            if (typeof data === 'string') {
                res = data;
            } else {
                res = this[key] ? this[key](data) : data;
                // res = data;
            }
    
        }

        return res;
    }
    public static _RGBA(data: any) {
        let res = '';
        if (typeof data === 'string') {
            res = data;
        } else {
            res = `#${this.toColorHex(data[0])}${this.toColorHex(data[1])}${this.toColorHex(data[2])}${this.toColorHex(data[3])}`;
        }

        return res;
    }
    public static _LengthData(data: any) {
        let res = '';
        if (typeof data === 'string') {
            res = data;
        } else {
            switch (data[0]) {
                case 0: {
                    res = `${data[1]}px`;
                    break;
                }
                case 1: {
                    res = `${data[1]}%`;
                    break;
                }
                case 2: {
                    res = `auto`;
                    break;
                }
                default:
            }
        }

        return res;
    }
    public static _BoxData(data: any) {
        let res = '';
        data.forEach(v => {
            res += this._LengthData(v);
        });

        return res;
    }
    public static _Shadow(data: any) {
        let res = '';
        res += `${data[0]}px`;
        res += `${data[1]}px`;
        res += this._RGBA(data[2]);
        res += `${data[3]}px`;

        return res;
    }
    public static _Gradient(data: GradientData) {
        let res = '';
        const _type = data._t === GradientTypes.linear ? 'linear-gradient' : 'radial-gradient';
        res += _type;
        
        return res;
    }
    public static toColorHex(num: any) {
        const str = `0${(Math.round(num * 255)).toString(16)}`;

        return str.substr(str.length - 2, 2);
    }
    public static toHex(num: any) {
        return num.toString(16);
    }    
    public static alignContent(data: any) {
        let res = '';
        res = YGAlign[data];
        
        return res;
    }

    public static alignItems(data: any) {
        let res = '';
        res = YGAlign[data];
        
        return res;
    }

    public static alignSelf(data: any) {
        let res = '';
        res = YGAlign[data];
        
        return res;
    }

    public static background(data: any) {
        let res = '';
        res = this._RGBA(data);
        
        return res;
    }

    public static backgroundColor(data: any) {
        let res = '';
        res = this._RGBA(data);
        
        return res;
    }

    public static borderColor(data: any) {
        let res = '';
        res = this._RGBA(data);
        
        return res;
    }

    public static borderImage(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static borderRadius(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static borderWidth(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static bottom(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static boxShadow(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static color(data: any) {
        let res = '';
        res = this._RGBA(data);
        
        return res;
    }

    public static direction(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static display(data: any) {
        let res = '';
        res = YGDisplay[data];
        
        return res;
    }

    public static flexBasis(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static flexDirection(data: any) {
        let res = '';
        res = YGFlexDirection[data];
        
        return res;
    }

    public static flexGrow(data: any) {
        let res = '';
        res = data;
        
        return res;
    }

    public static flexShrink(data: any) {
        let res = '';
        res = data;
        
        return res;
    }

    public static flexWrap(data: any) {
        let res = '';
        res = YGWrap[data];
        
        return res;
    }

    public static fontFamily(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static fontSize(data: any) {
        let res = '';
        res = data;
        
        return res;
    }

    public static fontStyle(data: any) {
        let res = '';
        res = FontStyle[data];
        
        return res;
    }

    public static fontVariant(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static fontWeight(data: any) {
        let res = '';
        res = data;
        
        return res;
    }

    public static height(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static justifyContent(data: any) {
        let res = '';
        res = YGJustify[data];
        
        return res;
    }

    public static left(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static letterSpacing(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static lineGradient(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static lineHeight(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static margin(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static marginBottom(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static marginLeft(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static marginRight(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static marginTop(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static maxHeight(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static maxWidth(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static minHeight(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static minWidth(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static opacity(data: any) {
        let res = '';
        res = data;
        
        return res;
    }

    public static outlineColor(data: any) {
        let res = '';
        res = this._RGBA(data);
        
        return res;
    }

    public static outlineOffset(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static outlineStyle(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static outlineWidth(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static oveflowWrap(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static overflow(data: any) {
        let res = '';
        res = YGOverflow[data ? 1 : 0];
        
        return res;
    }

    public static padding(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static paddingBottom(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static paddingLeft(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static paddingRight(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static paddingTop(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static position(data: any) {
        let res = '';
        res = YGPositionType[data];
        
        return res;
    }

    public static radioGradient(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static right(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static rotate(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static scale(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static scroll(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static textAlign(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static textContent(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static textDecoration(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static textIndent(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static textOverflow(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static textShadow(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static textTransform(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static top(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static transform(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static transformOrigin(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static translate(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static translateX(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static translateY(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static unicodeBidi(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static verticalAlign(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static visibility(data: any) {
        let res = '';
        res = data ? 'visible' : 'hidden';
        
        return res;
    }

    public static whiteSpace(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static width(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static wordSpacing(data: any) {
        let res = '';
        res = this._LengthData(data);
        
        return res;
    }

    public static zIndex(data: any) {
        let res = '';
        res = data;
        
        return res;
    }

    public static animation(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static borderImageSource(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static borderImageClip(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static borderImageRepeat(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static borderImageSlice(data: any) {
        let res = '';
        res = '';
        
        return res;
    }

    public static imageClip(data: any) {
        let res = '';
        res = '';
        
        return res;
    }
}

/**
 * 
 */
export enum YGAlign {
  'auto' = 0,
  'flex-start' = 1,
  'center' = 2,
  'flex-end' = 3,
  'stretch' = 4,
  'baseline' = 5,
  'space-between' = 6,
  'space-around' = 7
}

export enum YGDimension {
  'width' = 0,
  'height' = 1
}

export enum YGDirection {
  'inherit' = 0,
  'LTR' = 1,
  'RTL' = 2
}

export enum YGDisplay {
  'flex' = 0,
  'none' = 1
}

export enum YGEdge {
  'left'        = 0,
  'top'         = 1,
  'right'       = 2,
  'bottom'      = 3,
  'start'       = 4,
  'end'         = 5,
  'horizontal'  = 6,
  'vertical'    = 7,
  'all'         = 8
}

export enum YGExperimentalFeature {
  'WebFlexBasis' = 0
}

export enum YGFlexDirection {
  'column'          = 0,
  'column-reverse'  = 1,
  'row'             = 2,
  'row-reverse'     = 3
}

export enum YGJustify {
  'flex-start'      = 0,
  'center'          = 1,
  'flex-end'        = 2,
  'space-between'   = 3,
  'space-around'    = 4,
  'space-evenly'    = 5
}

export enum YGLogLevel {
  'error'   = 0,
  'warn'    = 1,
  'info'    = 2,
  'debug'   = 3,
  'verbose' = 4,
  'fatal'   = 5
}

export enum YGMeasureMode {
  'undefined'   = 0,
  'exactly'     = 1,
  'atMost'      = 2
}

export enum YGNodeType {
  'default'     = 0,
  'text'        = 1
}

export enum YGOverflow {
  'visible'     = 0,
  'hidden'      = 1,
  'scroll'      = 2
}

export enum YGPositionType {
  'relative'    = 0,
  'absolute'    = 1
}

export enum YGPrintOptions {
  'Layout'      = 1,
  'Style'       = 2,
  'Children'    = 4
}

export enum YGWrap {
  'no-wrap'     = 0,
  'wrap'        = 1,
  'wrap-reverse' = 2
}

export enum LengthUnitType {
  'px'      = 0,
  '%'       = 1,
  'auto'    = 2
}

export enum Opacity {
  'Opaque' = 0,
  'Translucent' = 1,
  'Transparent' = 2
}

export enum RadialGradientShapes {
  circle = 0,
  ellipse = 1
}

export enum RadialGradientSize {
    ClosestSide = 0,
    FarthestSide = 1,
    ClosestCorner = 2,
    Farthestcorner = 3
}
export enum UndefinedType {
  // decorate
  BorderColor,
  BorderRadius,

  BoxShadowColor,
  BoxShadowH,
  BoxShadowV,
  // BoxShadowBlur, 暂不支持

  BackgroundColor,

  //
  Opacity,
  Overflow,
  Visibility,

  // 变换
  TransformRotate,
  TransformScale,
  TransformScaleX,
  TransformScaleY,
  TransformTranslate,
  TransformTranslateX,
  TransformTranslateY,

  // 布局
  AlignContent,
  JustifyContent,
  FlexDirection,
  FlexWrap,
  FlexGrow,
  FlexShrink,
  FlexBasis,
  AlignSelf,

  Left,
  Top,
  Right,
  Bottom,

  Width,
  Height,

  MaxWidth,
  MaxHeight,
  MinWidth,
  MinHeight,

  PaddingLeft,
  PaddingTop,
  PaddingRight,
  PaddingBottom,

  MarginLeft,
  MarginTop,
  MarginRight,
  MarginBottom
}

/**
 */
export enum VerticalAlign {
  Center,
  Top,
  Bootom,
  Undefined
}
/**
 */
export enum TextDirection {
  Left,
  Right,
  Top,
  Bootom,
  Undefined
}
/**
 */
export enum TextAlign {
  'left',
  'right',
  'center',
  'justify',
  'undefined'
}
/**
 */
export enum WhiteSpace {
  'normal',
  'nowrap',
  'pre-wrap',
  'pre',
  'pre-line',
  'undefined'
}
/**
 */
export enum FontStyle {
  'Normal',
  'Ttalic',
  'Oblique',
  'Undefined'
}
/**
 */
export enum FontWeight {
  Normal = 600,
  Bold = 700,
  Bolder = 900,
  Lighter = 300,
  One = 100,
  Two = 200,
  Three = 300,
  Four = 400,
  Five = 500,
  Six = 600,
  Seven = 700,
  Eight = 800,
  Nine = 900,
  Undefined = 500
}
/**
 */
export enum FontSizeType {
//   Medium,
//   XXSmall,
//   XSmall,
//   Small,
//   Large,
//   XLarge,
//   XXLarge,
//   Smaller,
//   Larger,
  Length,
  Percent
//   Undefined,
}

export enum ClipPathBasicShapeType {
    Polygon,
    Circle // 暂不支持
}

export enum ClipPathGeometryBoxType {
    MarginBox,
    BorderBox,
    PaddingBox,
    ContentBox
}

export enum BorderImageRepeat {
    'stretch' = 0, // 拉伸源图像的边缘区域以填充每个边界之间的间隙。
    'repeat' = 1,  // 源图像的边缘区域被平铺（重复）以填充每个边界之间的间隙。可以修剪瓷砖以实现适当的配合。
    'round' = 2,   // 源图像的边缘区域被平铺（重复）以填充每个边界之间的间隙。可以拉伸瓷砖以实现适当的配合。
    'space' = 3    // 源图像的边缘区域被平铺（重复）以填充每个边界之间的间隙。可以缩小瓷砖以实现适当的配合。
}