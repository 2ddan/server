
/**
 * gui 节点样式结构
 * * 节点样式设置
 * * 节点动画设置
 * * 节点动画 添加 - 删除
 * * 节点动画监听 添加 - 删除
 */

import { AnimationControl } from './animation';
import { Animatable, Animation, RuntimeAnimation } from './animation_tools';
import { EnabledTypes, FontStyle, FontWeight, LengthUnitType, TextAlign, UndefinedType, VerticalAlign, YGAlign, YGDisplay, YGEdge, YGFlexDirection, YGJustify, YGPositionType, YGWrap } from './enum';
import { gui } from './gui';
import { RContainerElement } from './r_containerelement';
import { RElementTypeList } from './r_datastruct';
import { RElement } from './r_element';
import { AnimationCmd, BoxA, BoxB, BoxL, BoxR, BoxT, FlexBasis, GradientData, GradientTypes, IBoxData, ILengthData, ILengthVector2, IRGBA, IShadow, IShadowB, IShadowC, IShadowH, IShadowV, ITransform, ITransformDataType, IVector2, ScrollInfo, Tools } from './tools';

const DefaultStyle = {
    fontSize: 16,
    fontFamily: '',
    fontStyle: FontStyle.Undefined,
    fontVariant: 0,
    fontWeight: FontWeight.Normal,
    // Color: new RGBA(1, 1, 1, 1),
    color: [1, 1, 1, 1],
    letterSpacing: 0,
    position: YGPositionType.YGPositionTypeRelative,
    textAlign: TextAlign.Undefined,
    textIndent: 0,
    alignItems: YGAlign.YGAlignAuto,
    justifyContent: YGJustify.YGJustifyFlexStart,
    whiteSpace: 0,
    wordSpacing: 0,
    zIndex: 0
};
/**
 * R gui 节点样式
 */
export class RStyle {

    public set backgroundColor(value: IRGBA | string) {
        if (typeof value === 'string') {
            value = Tools.backgroundColor(<string>value);
        }

        if (Tools.noValue(value)) {
            this._backgroundColor = value;
            this.setStyleUndefined(UndefinedType.BackgroundColor);
        } else {
            // gui._set_backgroud_rgba_color(this._doc, this._ele, value.r, value.g, value.b, value.a);
            this._backgroundColor = <any>[...value];
            gui._set_background_rgba_color(this._doc, this._ele, value[0], value[1], value[2], value[3]);
        }
    }
    public get backgroundColor() {
        return this._backgroundColor;
    }
    public set background(value: GradientData | string) {
        this._background = <string>value;

        if (typeof value === 'string') {
            value = Tools.background_(<string>value);
        }

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.BackgroundColor);
        } else {
            // Tools.log('gradient', value);
            if (value._t === GradientTypes.linear) {
                (<any>window).__jsObj = value.color_and_positions;
                gui._set_background_linear_gradient_color(this._doc, this._ele, value.direction);
                (<any>window).__jsObj = undefined;
            } else {
                (<any>window).__jsObj = value.color_and_positions;
                gui._set_background_radial_gradient_color(this._doc, this._ele, value.center_x, value.center_y, value.shape, value.size);
                (<any>window).__jsObj = undefined;
            }
        }
    }
    public get background() {
        return this._background;
    }
    public set boxShadow(value: IShadow | string) {
        if (typeof value === 'string') {
            value = Tools.boxShadow(<string>value);
        }

        this._boxShadow = value;

        if (Tools.noValue(value)) {
            // this.setStyleUndefined(UndefinedType.Textshadow);
        } else {
            // gui._set_box_shadow(this._doc, this._ele, value.h, value.v, value.color.r, value.color.g, value.color.b, value.color.a, value.blur);
            // gui._set_box_shadow_color(this._doc, this._ele, value.color.r, value.color.g, value.color.b, value.color.a);
            // gui._set_box_shadow_h(this._doc, this._ele, value.h);
            // gui._set_box_shadow_v(this._doc, this._ele, value.v);
            
            gui._set_box_shadow_color(this._doc, this._ele, value[IShadowC][0], value[IShadowC][1], value[IShadowC][2], value[IShadowC][3]);
            gui._set_box_shadow_h(this._doc, this._ele, value[IShadowH]);
            gui._set_box_shadow_v(this._doc, this._ele, value[IShadowV]);
            gui._set_box_shadow_blur(this._doc, this._ele, value[IShadowB]);
        }
    }
    public get boxShadow() {
        return this._boxShadow;
    }
    /**
     * _edge： All
     */
    public set borderWidth(value: IBoxData | string) {
        if (typeof value === 'string') {
            value = Tools.borderWidth(<string>value);
        }

        this._borderWidth = value;
        
        if (Tools.noValue(value)) {
            this.setBorderValue(YGEdge.YGEdgeAll, [LengthUnitType.Pixel, 0]);
        } else {
            if (value[BoxA] !== undefined && value[BoxA] !== null) {
                this.setBorderValue(YGEdge.YGEdgeAll, value[BoxA]);
            } else {
                
                !Tools.noValue(value[BoxT]) && (this.setBorderValue(YGEdge.YGEdgeTop,     value[BoxT]));
                !Tools.noValue(value[BoxR]) && (this.setBorderValue(YGEdge.YGEdgeRight,   value[BoxR]));
                !Tools.noValue(value[BoxB]) && (this.setBorderValue(YGEdge.YGEdgeBottom,  value[BoxB]));
                !Tools.noValue(value[BoxL]) && (this.setBorderValue(YGEdge.YGEdgeLeft,    value[BoxL]));
            }
        }
    }
    public get borderWidth() {
        return this._borderWidth;
    }
    /**
     * _edge： All
     */
    public set borderColor(value: IRGBA | string) {
        if (typeof value === 'string') {
            value = Tools.borderColor(<string>value);
        }

        this._borderColor = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.BorderColor);
        } else {
            this.setBorderColor(YGEdge.YGEdgeAll, value);
        }
    }
    public get borderColor() {
        return this._borderColor;
    }
    public set borderRadius(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.borderRadius(<string>value);
        }

        this._borderRadius = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.BorderRadius);
        } else {
            gui._set_border_radius(this._doc, this._ele, value);
        }
    }

    public get borderRadius() {
        return this._borderRadius;
    }

    public set display(value: YGDisplay | string) {
        if (typeof value === 'string') {
            value = Tools.display(<string>value);
        }

        // Tools.log('Display', value);
        this._display = value;

        if (Tools.noValue(value)) {
            gui._set_display(this._doc, this._ele, Tools.display(undefined));
        } else {
            gui._set_display(this._doc, this._ele, value);
        }
    }
    public get display() {
        return this._display;
    }
    public set visibility(value: boolean | string) {
        if (typeof value === 'string') {
            value = Tools.visibility(<string>value);
        }

        this._visibility = value;

        if (Tools.noValue(value)) {
            gui._set_visibility(this._doc, this._ele, true);
        } else {
            gui._set_visibility(this._doc, this._ele, value);
        }
    }

    public get visibility() {
        return this._visibility;
    }

    public set flexDirection(value: YGFlexDirection | string) {
        if (typeof value === 'string') {
            value = Tools.flexDirection(<string>value);
        }

        this._flexDirection = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.FlexDirection);
        } else {
            gui._set_flex_direction(this._doc, this._ele, value);
        }
    }
    public get flexDirection() {
        return this._flexDirection;
    }
    public set flexWrap(value: YGWrap | string) {
        if (typeof value === 'string') {
            value = Tools.flexWrap(<string>value);
        }

        this._flexWrap = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.FlexWrap);
        } else {
            gui._set_flex_wrap(this._doc, this._ele, value);
        }
    }
    public get flexWrap() {
        return this._flexWrap;
    }
    public set flexGrow(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.flexGrow(<string>value);
        }

        this._flexGrow = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.FlexGrow);
        } else {
            gui._set_flex_grow(this._doc, this._ele, value);
        }
    }
    public get flexGrow() {
        return this._flexGrow;
    }
    public set flexShrink(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.flexShrink(<string>value);
        }

        this._flexShrink = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.FlexShrink);
        } else {
            gui._set_flex_shrink(this._doc, this._ele, value);
        }
    }
    public get flexShrink() {
        return this._flexShrink;
    }
    public set flexBasis(value: FlexBasis | string) {
        if (typeof value === 'string') {
            value = Tools.flexBasis(<string>value);
        }

        this._flexBasis = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.FlexBasis);
        } else {
            if (value.auto) {
                gui._set_flex_basis_auto(this._doc, this._ele);
            } else {
                gui._set_flex_basis(this._doc, this._ele, value.value);
            }
        }
    }

    public get flexBasis() {
        return this._flexBasis;
    }

    public set fontFamily(value: string) {
        if (typeof value === 'string') {
            value = Tools.fontFamily(<string>value);
        }

        this._fontFamily = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            value = DefaultStyle.fontFamily;
            if (RStyle.FontFamilyList.indexOf(value) >= 0) {
                (<any>window).__jsObj = value;
                gui._set_font_family(this._doc, this._ele);
            } else {
                Tools.warn(`Font 未下载: ${value}`);
            }
        } else {
            if (RStyle.FontFamilyList.indexOf(value) < 0) {
                value = DefaultStyle.fontFamily;
            }
            if (RStyle.FontFamilyList.indexOf(value) >= 0) {
                (<any>window).__jsObj = value;
                gui._set_font_family(this._doc, this._ele);
            } else {
                Tools.warn(`Font 未下载: ${value}`);
            }
        }
        Tools.log(value);
    }
    public get fontFamily() {
        return this._fontFamily;
    }
    public set fontSize(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.fontSize(<string>value);
        }

        this._fontSize = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            gui._set_font_size(this._doc, this._ele, DefaultStyle.fontSize);
        } else {
            gui._set_font_size(this._doc, this._ele, value);
        }
        Tools.log(value);
    }
    public get fontSize() {
        return this._fontSize;
    }
    public set fontStyle(value: FontStyle | string) {
        if (typeof value === 'string') {
            value = Tools.fontStyle(<string>value);
        }

        this._fontStyle = value;
        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            gui._set_font_style(this._doc, this._ele, DefaultStyle.fontStyle);
        } else {
            gui._set_font_style(this._doc, this._ele, value);
        }
    }
    public get fontStyle() {
        return this._fontStyle;
    }
    // public set fontVariant(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.fontVariant(<string>value);
    //     }

    //     this._fontVariant = value;

    //     if (!(this.ele._type === RElementTypeList.SPAN)) {
    //         return;
    //     }
    //     if (Tools.noValue(value)) {
    //         Tools.notSupposeStyle('fontVariant');
    //     } else {
    //         Tools.notSupposeStyle('fontVariant');
    //     }
    // }
    // public get fontVariant() {
    //     return this._fontVariant;
    // }
    public set fontWeight(value: FontWeight | string) {
        if (typeof value === 'string') {
            value = Tools.fontWeight(<string>value);
        }

        this._fontWeight = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            gui._set_font_weight(this._doc, this._ele, DefaultStyle.fontWeight);
        } else {
            gui._set_font_weight(this._doc, this._ele, value);
        }
    }
    public get fontWeight() {
        return this._fontWeight;
    }
    public set height(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.height(<string>value);
        }

        this._height = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Height);
        } else {
            switch (value[0]) {
                case (LengthUnitType.Pixel): {
                    gui._set_height(this._doc, this._ele, value[1]);
                    break;
                }
                case (LengthUnitType.Percent): {
                    gui._set_height_percent(this._doc, this._ele, value[1]);
                    break;
                }
                default: {
                    gui._set_height_auto(this._doc, this._ele);
                }
            }
        }
        Tools.log(value);
    }
    public get height() {
        return this._height;
    }
    public set width(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.width(<string>value);
        }

        this._width = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Width);
        } else {
            switch (value[0]) {
                case (LengthUnitType.Pixel): {
                    gui._set_width(this._doc, this._ele, value[1]);
                    break;
                }
                case (LengthUnitType.Percent): {
                    gui._set_width_percent(this._doc, this._ele, value[1]);
                    break;
                }
                default: {
                    gui._set_width_auto(this._doc, this._ele);
                }
            }
        }
        Tools.log(value);
    }
    public get width() {
        return this._width;
    }
    public set maxHeight(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.maxHeight(<string>value);
        }

        this._maxHeight = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MaxHeight);
        } else {
            switch (value[0]) {
                case (LengthUnitType.Pixel): {
                    gui._set_max_height(this._doc, this._ele, value[1]);
                    break;
                }
                case (LengthUnitType.Percent): {
                    gui._set_max_height_percent(this._doc, this._ele, value[1]);
                    break;
                }
                default:
            }
        }
    }
    public get maxHeight() {
        return this._maxHeight;
    }
    public set minHeight(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.minHeight(<string>value);
        }
        
        this._minHeight = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MinHeight);
        } else {
            switch (value[0]) {
                case (LengthUnitType.Pixel): {
                    gui._set_min_height(this._doc, this._ele, value[1]);
                    break;
                }
                case (LengthUnitType.Percent): {
                    gui._set_min_height_percent(this._doc, this._ele, value[1]);
                    break;
                }
                default:
            }
        }
    }
    public get minHeight() {
        return this._minHeight;
    }
    public set maxWidth(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.maxWidth(<string>value);
        }

        this._maxWidth = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MaxWidth);
        } else {
            switch (value[0]) {
                case (LengthUnitType.Pixel): {
                    gui._set_max_width(this._doc, this._ele, value[1]);
                    break;
                }
                case (LengthUnitType.Percent): {
                    gui._set_max_width_percent(this._doc, this._ele, value[1]);
                    break;
                }
                default:
            }
        }
    }
    public get maxWidth() {
        return this._maxWidth;
    }
    public set minWidth(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.minWidth(<string>value);
        }

        this._minWidth = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MinWidth);
        } else {
            switch (value[0]) {
                case (LengthUnitType.Pixel): {
                    gui._set_min_width(this._doc, this._ele, value[1]);
                    break;
                }
                case (LengthUnitType.Percent): {
                    gui._set_min_width_percent(this._doc, this._ele, value[1]);
                    break;
                }
                default:
            }
        }
    }
    public get minWidth() {
        return this._minWidth;
    }
    // ===================================== margin
    public set margin(value: IBoxData | string) {
        if (typeof value === 'string') {
            value = Tools.margin(<string>value);
        }

        this._margin = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MarginTop);
            this.setStyleUndefined(UndefinedType.MarginBottom);
            this.setStyleUndefined(UndefinedType.MarginRight);
            this.setStyleUndefined(UndefinedType.MarginLeft);
        } else {
            if (value[BoxA] !== undefined && value[BoxA] !== null) {
                this.setMarginValue(YGEdge.YGEdgeAll, value[BoxA]);
            } else {
                value[BoxT] !== undefined && value[BoxT] !== null && (this.setMarginValue(YGEdge.YGEdgeTop,     value[BoxT]));
                value[BoxR] !== undefined && value[BoxR] !== null && (this.setMarginValue(YGEdge.YGEdgeRight,   value[BoxR]));
                value[BoxB] !== undefined && value[BoxB] !== null && (this.setMarginValue(YGEdge.YGEdgeBottom,  value[BoxB]));
                value[BoxL] !== undefined && value[BoxL] !== null && (this.setMarginValue(YGEdge.YGEdgeLeft,    value[BoxL]));
            }
        }
    }
    public get margin() {
        return this._margin;
    }
    public set marginBottom(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.marginBottom(<string>value);
        }

        this._marginBottom = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MarginBottom);
        } else {
            this.setMarginValue(YGEdge.YGEdgeBottom, value);
        }
    }
    public get marginBottom() {
        return this._marginBottom;
    }
    public set marginLeft(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.marginLeft(<string>value);
        }

        this._marginLeft = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MarginLeft);
        } else {
            this.setMarginValue(YGEdge.YGEdgeLeft, value);
        }
    }
    public get marginLeft() {
        return this._marginLeft;
    }
    public set marginRight(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.marginRight(<string>value);
        }

        this._marginRight = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MarginRight);
        } else {
            this.setMarginValue(YGEdge.YGEdgeRight, value);
        }
    }
    public get marginRight() {
        return this._marginRight;
    }
    public set marginTop(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.marginTop(<string>value);
        }

        this._marginTop = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.MarginTop);
        } else {
            this.setMarginValue(YGEdge.YGEdgeTop, value);
        }
    }
    public get marginTop() {
        return this._marginTop;
    }
    public set opacity(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.opacity(<string>value);
        }

        this._opacity = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Opacity);
        } else {
            gui._set_opacity(this._doc, this._ele, value);
        }
    }
    public get opacity() {
        return this._opacity;
    }
    // public set outlineColor(value: IRGBA | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.outlineColor(<string>value);
    //     }

    //     this._outlineColor = value;

    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.OutlineColor);
    //     } else {
    //         Tools.notSupposeStyle('outlineColor');
    //     }
    // }
    // public get outlineColor() {
    //     return this._outlineColor;
    // }
    // public set outlineOffset(value: ILengthData | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.outlineOffset(<string>value);
    //     }

    //     this._outlineOffset = value;

    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.OutlineOffset);
    //     } else {
    //         Tools.notSupposeStyle('outlineOffset');
    //     }
    // }
    // public get outlineOffset() {
    //     return this._outlineOffset;
    // }
    // public set outlineStyle(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.outlineStyle(<string>value);
    //     }

    //     this._outlineStyle = value;

    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.OutlineStyle);
    //     } else {
    //         Tools.notSupposeStyle('outlineStyle');
    //     }
    // }
    // public get outlineStyle() {
    //     return this._outlineStyle;
    // }
    // public set outlineWidth(value: ILengthData | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.outlineWidth(<string>value);
    //     }

    //     this._outlineWidth = value;

    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.OutlineWidth);
    //     } else {
    //         Tools.notSupposeStyle('outlineWidth');
    //     }
    // }
    // public get outlineWidth() {
    //     return this._outlineWidth;
    // }
    // ====================== Overflow
    public set overflow(value: boolean | string) {
        if (typeof value === 'string') {
            value = Tools.overflow(<string>value);
        }

        this._overflow = value;
        
        if (Tools.noValue(value)) {
            this._overflow = false;
        } else {
            this._overflow = value;
        }

        gui._set_overflow(this._doc, this._ele, this._overflow);
    }
    public get overflow() {
        return this._overflow;
    }
    public set overflowWrap(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.oveflowWrap(<string>value);
        }
        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Overflow);
        } else {
            // gui._set_overflow_wrap(this._doc, this._ele, value);
        }
    }
    // public set clip(value: number | string) {
    //     if (typeof value === 'string') {
    //         // value = Tools.clip(<string>value);
    //     }

    //     this._clip = <any>value;

    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.Clip);
    //     } else {
    //         Tools.notSupposeStyle('clip');
    //     }
    // }
    // public get clip() {
    //     return this._clip;
    // }

    // ====================== PADDING
    /**
     * _edge 
     */
    public set padding(value: IBoxData | string) {
        if (typeof value === 'string') {
            value = Tools.padding(<string>value);
        }

        this._padding = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.PaddingBottom);
            this.setStyleUndefined(UndefinedType.PaddingLeft);
            this.setStyleUndefined(UndefinedType.PaddingRight);
            this.setStyleUndefined(UndefinedType.PaddingTop);
        } else {
            if (value[BoxA] !== undefined && value[BoxA] !== null) {
                this.setPaddingValue(YGEdge.YGEdgeAll,  value[BoxA]);
            } else {
                value[BoxT]    !== undefined && value[BoxT] !== null && (this.setPaddingValue(YGEdge.YGEdgeTop,    value[BoxT]));
                value[BoxR]    !== undefined && value[BoxR] !== null && (this.setPaddingValue(YGEdge.YGEdgeRight,  value[BoxR]));
                value[BoxB]    !== undefined && value[BoxB] !== null && (this.setPaddingValue(YGEdge.YGEdgeBottom, value[BoxB]));
                value[BoxL]    !== undefined && value[BoxL] !== null && (this.setPaddingValue(YGEdge.YGEdgeLeft,   value[BoxL]));
            }
        }
    }
    public get padding() {
        return this._padding;
    }
    public set paddingBottom(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.paddingBottom(<string>value);
        }

        this._paddingBottom = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.PaddingBottom);
        } else {
            this.setPaddingValue(YGEdge.YGEdgeBottom, value);
        }
    }
    public get paddingBottom() {
        return this._paddingBottom;
    }
    public set paddingLeft(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.paddingLeft(<string>value);
        }

        this._paddingLeft = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.PaddingLeft);
        } else {
            this.setPaddingValue(YGEdge.YGEdgeLeft, value);
        }
    }
    public get paddingLeft() {
        return this._paddingLeft;
    }
    public set paddingRight(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.paddingRight(<string>value);
        }

        this._paddingRight = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.PaddingRight);
        } else {
            this.setPaddingValue(YGEdge.YGEdgeRight, value);
        }
    }
    public get paddingRight() {
        return this._paddingRight;
    }
    public set paddingTop(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.paddingTop(<string>value);
        }

        this._paddingTop = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.PaddingTop);
        } else {
            this.setPaddingValue(YGEdge.YGEdgeTop, value);
        }
    }
    public get paddingTop() {
        return this._paddingTop;
    }

    // ========================== position
    public set position(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.position(<string>value);
        }

        this._position = value;

        if (Tools.noValue(value)) {
            gui._set_position_type(this._doc, this._ele, DefaultStyle.position);
        } else {
            gui._set_position_type(this._doc, this._ele, value);
        }
    }
    public get position() {
        return this._position;
    }
    public set bottom(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.bottom(<string>value);
        }

        this._bottom = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Bottom);
        } else {
            this.setPositionTRBL(YGEdge.YGEdgeBottom, value);
        }
    }
    public get bottom() {
        return this._bottom;
    }
    public set left(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.left(<string>value);
        }

        this._left = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Left);
        } else {
            this.setPositionTRBL(YGEdge.YGEdgeLeft, value);
        }
    }
    public get left() {
        return this._left;
    }
    public set right(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.right(<string>value);
        }

        this._right = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Right);
        } else {
            this.setPositionTRBL(YGEdge.YGEdgeRight, value);
        }
    }
    public get right() {
        return this._right;
    }
    public set top(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.top(<string>value);
        }
        
        this._top = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.Top);
        } else {
            this.setPositionTRBL(YGEdge.YGEdgeTop, value);
        }
    }
    public get top() {
        return this._top;
    }
    public set zIndex(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.zIndex(<string>value);
        }

        this._zIndex = value;

        if (Tools.noValue(value)) {
            gui._set_zindex(this._doc, this._ele, DefaultStyle.zIndex);
        } else {
            gui._set_zindex(this._doc, this._ele, value);
        }
    }
    public get zIndex() {
        return this._zIndex;
    }
    // public set direction(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.direction(<string>value);
    //     }

    //     this._direction = <any>value;

    //     if (Tools.noValue(value)) {
    //         Tools.notSupposeStyle('direction');
    //     } else {
    //         Tools.notSupposeStyle('direction');
    //     }
    // }
    // public get direction() {
    //     return this._direction;
    // }

    // ===================================== text
    public set color(value: IRGBA | string) {
        if (typeof value === 'string') {
            value = Tools.color(<string>value);
        }

        this._color = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            value = <IRGBA>DefaultStyle.color;
        }

        gui._set_text_rgba_color(this._doc, this._ele, value[0], value[1], value[2], value[3]);
    }
    public get color() {
        return this._color;
    }
    public set letterSpacing(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.letterSpacing(<string>value);
        }

        this._letterSpacing = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            gui._set_letter_spacing(this._doc, this._ele, DefaultStyle.letterSpacing);
        } else {
            gui._set_letter_spacing(this._doc, this._ele, value[1]);
        }
    }
    public get letterSpacing() {
        return this._letterSpacing;
    }
    public set lineHeight(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.lineHeight(<string>value);
        }

        this._lineHeight = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            // this.setStyleUndefined(UndefinedType.lineHeight);
        } else {
            gui._set_line_height(this._doc, this._ele, value[1]);
        }

    }
    public get lineHeight() {
        return this._lineHeight;
    }
    public set textContent(value: string | string) {
        if (typeof value === 'string') {
            value = Tools.textContent(<string>value);
        }

        this._textContent = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            // gui._set_text_content(this._doc, this._ele, value);
        } else {
            // gui._set_text_content(this._doc, this._ele, value);
        }
    }
    public get textContent() {
        return this._textContent;
    }
    // public set textAlign(value: TextAlign | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.textAlign(<string>value);
    //     }

    //     this._textAlign = value;

    //     if (!(this.ele._type === RElementTypeList.SPAN)) {
    //         return;
    //     }
    //     if (Tools.noValue(value)) {
    //         // gui._set_text_align(this._doc, this._ele, DefaultStyle.textAlign);
    //         Tools.notSupposeStyle('text-align');
    //     } else {
    //         // gui._set_text_align(this._doc, this._ele, value);
    //         Tools.notSupposeStyle('text-align');
    //     }
    // }
    // public get textAlign() {
    //     return this._textAlign;
    // }
    // public set textDecoration(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.textDecoration(<string>value);
    //     }

    //     this._textDecoration = value;

    //     if (!(this.ele._type === RElementTypeList.SPAN)) {
    //         return;
    //     }
    //     if (Tools.noValue(value)) {
    //         Tools.notSupposeStyle('textDecoration');
    //     } else {
    //         Tools.notSupposeStyle('textDecoration');
    //     }
    // }
    // public get textDecoration() {
    //     return this._textDecoration;
    // }
    public set textIndent(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.textIndent(<string>value);
        }

        this._textIndent = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            gui._set_text_indent(this._doc, this._ele, 0);
        } else {
            gui._set_text_indent(this._doc, this._ele, value);
        }
    }
    public get textIndent() {
        return this._textIndent;
    }
    public set textShadow(value: IShadow | string) {
        if (typeof value === 'string') {
            value = Tools.textShadow(<string>value);
        }

        this._textShadow = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            // this.setStyleUndefined(UndefinedType.Textshadow);
        } else {
            gui._set_text_shadow(this._doc, this._ele, value[IShadowH], value[IShadowV], value[IShadowC][0], value[IShadowC][1], value[IShadowC][2], value[IShadowC][3], value[IShadowB]);
        }
    }
    public get textShadow() {
        return this._textShadow;
    }
    public get textStroke() {
        return this._textStroke;
    }
    public set textStroke(value: string | number[]) {

        if (typeof value === 'string') {
            value = Tools.textStroke(<string>value);
        }

        this._textStroke = value;

        if (Tools.noValue(value)) {

            this.setStyleUndefined(UndefinedType.BackgroundColor);

        } else {

            gui._set_text_stroke(this._doc, this._ele, value[0], value[1], value[2], value[3], value[4]);

        }
    }
    public get textGradient() {
        return this._textGradient;
    }
    public set textGradient(value: string | GradientData) {

        this._textGradient = <string>value;

        if (typeof value === 'string') {
            value = Tools.textGradient_(<string>value);
        }

        if (Tools.noValue(value)) {

            this.setStyleUndefined(UndefinedType.BackgroundColor);

        } else {

            // Tools.log('gradient', value);

            if (value._t === GradientTypes.linear) {
                (<any>window).__jsObj = value.color_and_positions;
                gui._set_text_linear_gradient_color(this._doc, this._ele, value.direction);
                (<any>window).__jsObj = undefined;
            } else {
                // (<any>window).__jsObj = value.color_and_positions;
                // gui._set_background_radial_gradient_color(this._doc, this._ele, value.center_x, value.center_y, value.shape, value.size);
                // (<any>window).__jsObj = undefined;
            }
        }
    }
    // public set textTransform(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.textTransform(<string>value);
    //     }

    //     this._textTransform = value;

    //     if (!(this.ele._type === RElementTypeList.SPAN)) {
    //         return;
    //     }
    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.TextTransform);
    //     } else {
    //         Tools.notSupposeStyle('textTransform');
    //     }
    // }
    // public get textTransform() {
    //     return this._textTransform;
    // }
    // public set textOverflow(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.textOverflow(<string>value);
    //     }
    //     if (!(this.ele._type === RElementTypeList.SPAN)) {
    //         return;
    //     }
    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.TextOverflow);
    //     } else {
    //         Tools.notSupposeStyle('textOverflow');
    //     }
    // }
    public set whiteSpace(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.whiteSpace(<string>value);
        }

        this._whiteSpace = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            gui._set_white_space(this._doc, this._ele, DefaultStyle.whiteSpace);
        } else {
            gui._set_white_space(this._doc, this._ele, value);
        }
    }
    public get whiteSpace() {
        return this._whiteSpace;
    }
    public set wordSpacing(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.wordSpacing(<string>value);
        }

        this._wordSpacing = value;

        if (!(this.ele._type === RElementTypeList.SPAN)) {
            return;
        }
        if (Tools.noValue(value)) {
            // this.setStyleUndefined(UndefinedType.WordSpacing);
        } else {
            Tools.notSupposeStyle('wordSpacing');
        }
    }
    public get wordSpacing() {
        return this._wordSpacing;
    }

    // ============================== item
    // public set unicodeBidi(value: number | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.unicodeBidi(<string>value);
    //     }
    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.UnicodeBidi);
    //     } else {
    //         Tools.notSupposeStyle('unicodeBidi');
    //     }
    // }
    // public set verticalAlign(value: VerticalAlign | string) {
    //     if (typeof value === 'string') {
    //         value = Tools.verticalAlign(<string>value);
    //     }

    //     this._verticalAlign = value;

    //     if (Tools.noValue(value)) {
    //         // this.setStyleUndefined(UndefinedType.VerticalAlign);
    //     } else {
    //         Tools.notSupposeStyle('verticalAlign');
    //     }
    // }
    // public get verticalAlign() {
    //     return this._verticalAlign;
    // }
    // public set alignSelf(data: string) {
    //     const value = Tools.alignSelf(data);
    public set alignSelf(value: YGAlign | string) {
        if (typeof value === 'string') {
            value = Tools.alignSelf(<string>value);
        }

        this._alignSelf = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.AlignSelf);
        } else {
            gui._set_align_self(this._doc, this._ele, value);
        }
    }
    public get alignSelf() {
        return this._alignSelf;
    }
    // public set alignContent(data: string) {
    // const value = Tools.alignContent(data);
    public set alignContent(value: YGAlign | string) {
        if (typeof value === 'string') {
            value = Tools.alignContent(<string>value);
        }

        this._alignContent = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.AlignContent);
        } else {
            gui._set_align_content(this._doc, this._ele, value);
        }
    }
    public get alignContent() {
        return this._alignContent;
    }
    // public set alignItems(data: string) {
    //     const value = Tools.alignItems(data);
    public set alignItems(value: YGAlign | string) {
        if (typeof value === 'string') {
            value = Tools.alignItems(<string>value);
        }

        this._alignItems = value;

        if (Tools.noValue(value)) {
            gui._set_align_items(this._doc, this._ele, DefaultStyle.alignItems);
        } else {
            gui._set_align_items(this._doc, this._ele, value);
        }
    }
    public get alignItems() {
        return this._alignItems;
    }
    // public set justifyContent(data: string) {
    //     const value = Tools.justifyContent(data);
    public set justifyContent(value: YGJustify | string) {
        if (typeof value === 'string') {
            value = Tools.justifyContent(<string>value);
        }

        this._justifyContent = value;

        if (Tools.noValue(value)) {
            gui._set_justify_content(this._doc, this._ele, DefaultStyle.justifyContent);
        } else {
            gui._set_justify_content(this._doc, this._ele, value);
        }
    }
    public get justifyContent() {
        return this._justifyContent;
    }
    
    public set pointerEvents(value: string | EnabledTypes) {
        if (typeof value === 'string') {
            value = Tools.pointerEvents(<string>value);
        }

        this._pointerEvents = value;
        this.ele.enabled(value);
    }
    
    public get pointerEvents() {
        return this._pointerEvents;
    }

    public set objectFit(value: string | number) {
        if (typeof value === 'string') {
            value = Tools.objectFit(<string>value);
        }

        this._objectFit = value;
        gui._set_object_fit(this._doc, this._ele, value);
    }

    public get objectFit() {
        return this._objectFit;
    }

    // ======================================= Transform
    // public set transform(data: string) {
    //     const value = Tools.transform(data);
    public set transform(value: ITransform | string) {
        if (typeof value === 'string') {
            value = Tools.transform(<string>value);
        }

        gui._clear_transform(this._doc, this._ele);
        
        this._translateX[1] = 0;
        this._translateY[1] = 0;
        this._scale[0] = 0;
        this._scale[1] = 0;
        this._rotate = 0;

        this._transform = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.BackgroundColor);
        } else {
            value.forEach(v => {
                switch (v.t) {
                    case ITransformDataType.translate: {
                        this.translate  = <ILengthVector2>v.d;
                        break;
                    }
                    case ITransformDataType.rotateZ: {
                        this.rotate     = <number>v.d;
                        break;
                    }
                    case ITransformDataType.scale: {
                        this.scale      = <IVector2>v.d;
                        break;
                    }
                    default:
                }
            });
        }
    }
    public get transform() {
        return this._transform;
    }

    public set transformOrigin(value: ILengthVector2 | string) {
        if (typeof value === 'string') {
            value = Tools.transformOrigin(<string>value);
        }

        this._transformOrigin = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.TransformTranslate);
        } else {
            gui._transform_origin(this._doc, this._ele, value[0][0], value[0][1], value[1][0], value[1][1]);
        }
    }
    public get transformOrigin() {
        return this._transformOrigin;
    }

    public set translate(value: ILengthVector2 | string) {
        if (typeof value === 'string') {
            value = Tools.translate(<string>value);
        }

        this._translate = value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.TransformTranslate);
        } else {
            this.translateX = value[0];
            this.translateY = value[1];
        }
    }
    public get translate() {
        return this._translate;
    }
    public set scale(value: number[] | string) {
        if (typeof value === 'string') {
            value = Tools.scale(<string>value);
        }

        // this._scale = <any>value;

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.TransformScale);
            this._scale[0] = 1;
            this._scale[1] = 1;
        } else {
            gui._transform_scale(this._doc, this._ele, value[0] - this._scale[0], value[1] - this._scale[1]);
            this._scale[0] = value[0];
            this._scale[1] = value[1];
        }
    }
    public get scale() {
        return this._scale;
    }
    public set rotate(value: number | string) {
        if (typeof value === 'string') {
            value = Tools.rotate(<string>value);
        }

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.TransformRotate);
            this._rotate = 0;
        } else {
            gui._transform_rotate(this._doc, this._ele, value - this._rotate);
            this._rotate = value;
        }
    }
    public get rotate() {
        return this._rotate;
    }
    public set translateX(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.translateX(<string>value);
        }

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.TransformTranslateX);
            this._translateX[0] = 0;
            this._translateX[1] = 0;
        } else {
            if (value[0] === LengthUnitType.Percent) {
                gui._transform_translate_x_percent(this._doc, this._ele, value[1] - this._translateX[1]);
            } else {
                gui._transform_translate_x(this._doc, this._ele, value[1] - this._translateX[1]);
            }
            
            this._translateX[0] = value[0];
            this._translateX[1] = value[1];
        }
        
    }
    public get translateX() {
        return this._translateX;
    }
    public set translateY(value: ILengthData | string) {
        if (typeof value === 'string') {
            value = Tools.translateY(<string>value);
        }

        if (Tools.noValue(value)) {
            this.setStyleUndefined(UndefinedType.TransformTranslateY);
            this._translateY[0] = 0;
            this._translateY[1] = 0;
        } else {
            if (value[0] === LengthUnitType.Percent) {
                gui._transform_translate_y_percent(this._doc, this._ele, value[1] - this._translateY[1]);
            } else {
                gui._transform_translate_y(this._doc, this._ele, value[1] - this._translateY[1]);
            }

            this._translateY[0] = value[0];
            this._translateY[1] = value[1];
        }
    }
    public get translateY() {
        return this._translateY;
    }
    public set animation(value: AnimationCmd[] | string) {
        if (typeof value === 'string') {
            value = Tools.animation(<string>value);
        }

        const currAnimeNames: string[] = [];

        value.forEach((v) => {
            // 记录当前动画配置 RuntimeAnimation
            currAnimeNames.push(v.name);

            if (!this._animatable.animations.get(v.name)) {
                // 创建新 RuntimeAnimation
                const runtimeAnimation = new RuntimeAnimation(v.name, RStyle.AnimationCfgRequest(this.ele, v.name), v.duration);

                // TODO
                v.delayTime !== undefined && v.delayTime !== null && (runtimeAnimation.delayTime = v.delayTime);
                v.direction !== undefined && v.direction !== null && (runtimeAnimation.direction = v.direction);
                v.fillMode  !== undefined && v.fillMode !== null && (runtimeAnimation.fillMode   = v.fillMode);
                v.timingFunction !== undefined && v.timingFunction !== null && (runtimeAnimation.timingFunction = v.timingFunction);
                v.iteration !== undefined && v.iteration !== null && (runtimeAnimation.iteration = v.iteration);

                this._animatable.add(runtimeAnimation);
            }
        });

        // 移除不再设置的动画
        this._animatable.animations.forEach((v) => {
            if (currAnimeNames.indexOf(v.name) < 0) {
                this._animatable.removeByName(v.name);
            }
        });

        if (this._animatable.animations.size > 0) {
            AnimationControl.add(this._animatable);
        } else {
            AnimationControl.remove(this._animatable);
        }
    }

    public set borderImage(value: string) {
        this._borderImage = value;
    }
    public get borderImage() {
        return this._borderImage;
    }
    public set borderImageSource(value: string) {
        value = Tools.borderImageSource(<string>value);
        if (Tools.noValue(value)) {
            // 
        } else {
            this._borderImageSource = value;
            (<RContainerElement>this.ele).loadBorderImage();
        }
    }
    public get borderImageSource() {
        return this._borderImageSource;
    }
    public set borderImageSlice(value: string | number[]) {
        if (typeof value === 'string') {
            value = Tools.borderImageSlice(<string>value);
        }
        if (Tools.noValue(value)) {
            // 
        } else {
            this._borderImageSlice = value;
            this.ele.activeBorderImageSlice();
        }
    }
    public get borderImageSlice() {
        return this._borderImageSlice;
    }
    public set borderImageClip(value: string | number[]) {
        if (typeof value === 'string') {
            value = Tools.borderImageClip(<string>value);
        }
        if (Tools.noValue(value)) {
            // 
        } else {
            this._borderImageClip = value;
            this.ele.activeBorderImageClip();
        }
    }
    public get borderImageClip() {
        return this._borderImageClip;
    }
    public set borderImageRepeat(value: string | number[]) {
        if (typeof value === 'string') {
            value = Tools.borderImageRepeat(<string>value);
        }
        if (Tools.noValue(value)) {
            // 
        } else {
            this._borderImageRepeat = value;
            gui._set_border_image_repeat(this._doc, this._ele, this._borderImageRepeat[0], this._borderImageRepeat[1]);
        }
    }
    public get borderImageRepeat() {
        return this._borderImageRepeat;
    }
    public set imageClip(value: string | number[]) {
        if (typeof value === 'string') {
            value = Tools.imageClip(<string>value);
        }
        if (Tools.noValue(value)) {
            // 
        } else {
            this.ele.attributes.imageClip = value;
        }
    }
    public get imageClip() {
        return this.ele.attributes.imageClip;
    }

    /////////////////////////////////////////////////////////////
    // private set matrix(data: string) {
    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.matrix);
    //     } else {
    //         Tools.notSupposeStyle('matrix');
    //     }
    // }
    // private set matrix3d(data: string) {
    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.matrix3d);
    //     } else {
    //         Tools.notSupposeStyle('matrix3d');
    //     }
    // }
    // private set translate3d(data: string) {
    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.translate3d);
    //     } else {
    //         Tools.notSupposeStyle('translate3d');
    //     }
    // }
    // private set translateZ(data: string) {
    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformTranslateZ);
    //     } else {
    //         Tools.notSupposeStyle('translateZ');
    //     }
    // }

    // private set scale3d(data: string) {
    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformScale3D);
    //     } else {
    //         Tools.notSupposeStyle('scale3d');
    //     }
    // }
    // public set scaleX(value: string | number) {
    //     if (typeof value === 'string') {
    //         value = (<any>(<string>value).trim()) - 0;
    //     }

    //     this._scaleX = value;

    //     if (Tools.noValue(value)) {
    //         this._scale[0] = 1;
    //         this.setStyleUndefined(UndefinedType.TransformScaleX);
    //     } else {
    //         this._scale[0] = value;
    //         gui._transform_scale(this._doc, this._ele, this._scale[0], this._scale[1]);
    //     }
    // }
    // public get scaleX() {
    //     return this._scaleX;
    // }
    // public set scaleY(value: string | number) {
    //     if (typeof value === 'string') {
    //         value = (<any>(<string>value).trim()) - 0;
    //     }

    //     this._scaleY = value;

    //     if (Tools.noValue(value)) {
    //         this._scale[1] = 1;
    //         this.setStyleUndefined(UndefinedType.TransformScaleY);
    //     } else {
    //         this._scale[1] = value;
    //         gui._transform_scale(this._doc, this._ele, this._scale[0], this._scale[1]);
    //     }
    // }
    // public get scaleY() {
    //     return this._scaleY;
    // }
    // private set scaleZ(data: string) {

    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformScaleZ);
    //     } else {
    //         Tools.notSupposeStyle('scaleZ');
    //     }
    // }

    // private set rotate3d(data: string) {

    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformRotate3d);
    //     } else {
    //         Tools.notSupposeStyle('rotate3d');
    //     }
    // }
    // private set rotateX(data: string) {

    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformRotateX);
    //     } else {
    //         Tools.notSupposeStyle('rotateX');
    //     }
    // }
    // private set rotateY(data: string) {

    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformRotateY);
    //     } else {
    //         Tools.notSupposeStyle('rotateY');
    //     }
    // }
    // private set rotateZ(data: string) {

    //     if (data === undefined) {
    //         // this.setStyleUndefined(UndefinedType.TransformRotateZ);
    //     } else {
    //         Tools.notSupposeStyle('rotateZ');
    //     }
    // }

    /**
     * 项目内设置支持的字体名称
     */
    public static FontFamilyList: string[] = [];
    private static recycleList: RStyle[] = [];
    private static AnimationCfgRequest: (ele: RElement, aname: string) => Animation;
    private ele: RElement;
    private _ele: gui.GUINode;
    private _doc: gui.GUINode;
    // private _scroll: ScrollInfo = new ScrollInfo();
    private _backgroundColor: IRGBA;
    private _animatable: Animatable;
    private _alignContent: number;
    private _alignItems: number;
    private _alignSelf: number;
    private _background: string;
    private _borderColor: IRGBA;
    private _borderImage: string;
    private _borderImageSource: string;
    private _borderImageClip: number[];
    private _borderImageRepeat: number[];
    private _borderImageSlice: number[];
    private _borderRadius: number;
    private _borderWidth: IBoxData;
    private _bottom: ILengthData;
    private _boxShadow: IShadow;
    // private _clip: number;
    private _color: IRGBA;
    // private _direction: number;
    private _display: number;
    private _flexBasis: FlexBasis;
    private _flexDirection: number;
    private _flexGrow: number;
    private _flexShrink: number;
    private _flexWrap: number;
    private _fontFamily: string;
    private _fontSize: number;
    private _fontStyle: number;
    // private _fontVariant: number;
    private _fontWeight: number;
    private _height: ILengthData;
    private _justifyContent: number;
    private _left: ILengthData;
    private _letterSpacing: ILengthData;
    private _lineHeight: ILengthData;
    private _margin: IBoxData;
    private _marginLeft: ILengthData;
    private _marginTop: ILengthData;
    private _marginRight: ILengthData;
    private _marginBottom: ILengthData;
    private _maxHeight: ILengthData;
    private _maxWidth: ILengthData;
    private _minHeight: ILengthData;
    private _minWidth: ILengthData;
    private _objectFit: any;
    private _opacity: number;
    // private _outlineColor: IRGBA;
    // private _outlineOffset: ILengthData;
    // private _outlineStyle: number;
    // private _outlineWidth: ILengthData;
    private _overflow: boolean;
    private _padding: IBoxData;
    private _paddingLeft: ILengthData;
    private _paddingTop: ILengthData;
    private _paddingRight: ILengthData;
    private _paddingBottom: ILengthData;
    private _pointerEvents: number;
    private _position: number;
    private _right: ILengthData;
    private _rotate: number;
    // private _rotateZ: number;
    private _scale: IVector2 = <any>[1,1];
    // private _scaleX: number;
    // private _scaleY: number;
    // private _textAlign: number;
    private _textContent: string;
    // private _textDecoration: number;
    private _textIndent: number;
    // private _textOverflow: number;
    private _textShadow: IShadow;
    // private _textTransform: number;
    private _top: ILengthData;
    private _transform: ITransform = [{ t: 'r', d: 0 },{ t: 's', d: [0,0] },{ t: 't', d: [[0,0], [0,0]] }];
    private _transformOrigin: ILengthVector2;
    private _translate: ILengthVector2 = [[0,0],[0,0]];
    // private _scroll_translate: ILengthVector2 = [[0,0],[0,0]];
    private _translateX: ILengthData = [0,0];
    private _translateY: ILengthData = [0,0];
    // private _verticalAlign: number;
    private _visibility: boolean;
    private _whiteSpace: number;
    private _width: ILengthData;
    private _wordSpacing: number;
    private _zIndex: number = 0;
    private _textStroke: number[];
    private _textGradient: string;
    private _animListenerMap: Map<string, Function[]> = new Map();
    private _animListenerHookMap: Map<string, Function[]> = new Map();

    constructor(node: RElement) {
        this.createCall(node);
        this._animatable = new Animatable(this.ele);
    }

    public static create(node: RElement) {
        let r: RStyle;

        if (this.recycleList.length > 0) {
            r = this.recycleList.pop();
            r.createCall(node);
            r._animatable.reset(node);
        } else {
            r = new RStyle(node);
        }

        return r;
    }
    public static addDefaultStyle(key: string, value: string) {
        if (Tools[key] !== undefined) {
            DefaultStyle[key] = Tools[key](value);
        }
    }
    public static getDefaultStyle(key: string) {
        return DefaultStyle[key];
    }
    /**
     * 设置 animation 的帧数据获取方法
     */
    public static setAnimationCfgRequest(f: (ele: RElement, aname: string) => Animation) {
        this.AnimationCfgRequest = f;
    }
    private static recycle(r: RStyle) {
        this.recycleList.push(r);
    }

    ///////////////////////////////////////////////
    /**
     * 添加目标动画的监听
     * @param animName 动画名称
     * @param listenType 监听类型
     * @param f 监听方法
     */
    public addAnimListener(animName: string, listenType: 'start' | 'end' | 'loop', f: Function) {
        let funcList: Function[] = this._animListenerMap.get(animName);
        if (!funcList) {
            funcList = [];
            this._animListenerMap.set(animName, funcList);
        }
        switch (listenType) {
            case 'start' : {
                funcList[0] = f;
                break;
            }
            case 'loop' : {
                funcList[1] = f;
                break;
            }
            default: {
                funcList[2] = f;
            }
        }
    }
    /**
     * 添加目标动画的监听
     * @param animName 动画名称
     * @param listenType 监听类型
     * @param f 监听方法
     * * 由底层使用的接口
     */
    public addAnimListenerHook(animName: string, listenType: 'start' | 'end' | 'loop', f: Function) {
        let funcList: Function[] = this._animListenerHookMap.get(animName);
        if (!funcList) {
            funcList = [];
            this._animListenerHookMap.set(animName, funcList);
        }
        switch (listenType) {
            case 'start' : {
                funcList[0] = f;
                break;
            }
            case 'loop' : {
                funcList[1] = f;
                break;
            }
            default: {
                funcList[2] = f;
            }
        }
    }
    /**
     * 添加运行时动画
     * @param runtimeAnimation 运行时动画
     */
    public addAnimation(runtimeAnimation: RuntimeAnimation) {
        this._animatable.add(runtimeAnimation);

        if (this._animatable.animations.size > 0) {
            AnimationControl.add(this._animatable);
        } else {
            AnimationControl.remove(this._animatable);
        }
    }
    /**
     * 移除运行时动画
     * @param animeName 目标动画名称
     */
    public removeAnimation(animeName: string) {
        
        // 移除不再设置的动画
        this._animatable.removeByName(animeName);
        
        if (this._animatable.animations.size > 0) {
            AnimationControl.add(this._animatable);
        } else {
            AnimationControl.remove(this._animatable);
        }
    }
    /**
     * 销毁
     */
    public remove() {
        this.removeCall();
        RStyle.recycle(this);
    }
    /**
     * 动画开始时的通用调用
     * @param aname 目标动画名称
     */
    public animStart = (aname: string) => {
        const hookList = this._animListenerHookMap.get(aname);
        hookList && hookList[0] && hookList[0]();

        const funcList = this._animListenerMap.get(aname);
        funcList && funcList[0] && funcList[0]();
    }
    /**
     * 动画一次循环结束时的通用调用
     * @param aname 目标动画名称
     */
    public animLoop = (aname: string, iter: number) => {
        const hookList = this._animListenerHookMap.get(aname);
        hookList && hookList[1] && hookList[1]();

        const funcList = this._animListenerMap.get(aname);
        funcList && funcList[1] && funcList[1](iter);
    }
    /**
     * 动画结束时的通用调用
     * @param aname 目标动画名称
     */
    public animEnd = (aname: string) => {
        const hookList = this._animListenerHookMap.get(aname);
        hookList && hookList[2] && hookList[2]();

        const funcList = this._animListenerMap.get(aname);
        funcList && funcList[2] && funcList[2]();
    }

    private createCall(node: RElement) {
        this.ele    = node;
        this._ele   = node.uniqueID;
        this._doc   = node.document.uniqueID;
    }
    ///////////////////////////////////////////////
    /**
     * 
     * @param _edge 要设置的 border 选择
     * @param data border 数据
     */
    private setBorderValue(_edge: number, data: ILengthData) {

        switch (data[0]) {
            case (LengthUnitType.Pixel): {
                gui._set_border(this._doc, this._ele, _edge, data[1]);
                break;
            }
            default:
        }
    }
    /**
     * 
     * @param _edge 要设置的 border 选择
     * @param data border 数据
     */
    private setBorderColor(_edge: number, data: IRGBA) {
        gui._set_border_color(this._doc, this._ele, data[0], data[1], data[2], data[3]);
    }
    /**
     * 
     * @param _edge 要设置的 padding 选择
     * @param data padding 数据
     */
    private setPaddingValue(_edge: number, data: ILengthData) {

        switch (data[0]) {
            case (LengthUnitType.Pixel): {
                gui._set_padding(this._doc, this._ele, _edge, data[1]);
                break;
            }
            case (LengthUnitType.Percent): {
                gui._set_padding_percent(this._doc, this._ele, _edge, data[1]);
                break;
            }
            default:
        }
    }
    /**
     * 
     * @param _edge 要设置的 Margin 选择
     * @param data Margin 数据
     */
    private setMarginValue(_edge: YGEdge, data: ILengthData) {

        switch (data[0]) {
            case (LengthUnitType.Pixel): {
                gui._set_margin(this._doc, this._ele, _edge, data[1]);
                break;
            }
            case (LengthUnitType.Percent): {
                gui._set_margin_percent(this._doc, this._ele, _edge, data[1]);
                break;
            }
            default: {
                gui._set_margin_auto(this._doc, this._ele, _edge);
            }
        }
    }
    /**
     * 
     * @param _edge 要设置的 Position 选择
     * @param data Position 数据
     */
    private setPositionTRBL(_edge: YGEdge, data: ILengthData) {

        switch (data[0]) {
            case (LengthUnitType.Pixel): {
                gui._set_position(this._doc, this._ele, _edge, data[1]);
                break;
            }
            case (LengthUnitType.Percent): {
                gui._set_position_percent(this._doc, this._ele, _edge, data[1]);
                break;
            }
            default:
        }
    }

    private removeCall() {
        AnimationControl.remove(this._animatable);
        this._animatable.clear();
        this.ele = undefined;
        this._ele = undefined;
        this._doc = undefined;
        this._backgroundColor = undefined;
        this._alignContent = undefined;
        this._alignItems = undefined;
        this._alignSelf = undefined;
        this._background = undefined;
        this._borderColor = undefined;
        this._borderImage = undefined;
        this._borderImageSource = undefined;
        this._borderImageClip = undefined;
        this._borderImageRepeat = undefined;
        this._borderImageSlice = undefined;
        this._borderRadius = undefined;
        this._borderWidth = undefined;
        this._bottom = undefined;
        this._boxShadow = undefined;
        this._color = undefined;
        this._display = undefined;
        this._flexBasis = undefined;
        this._flexDirection = undefined;
        this._flexGrow = undefined;
        this._flexShrink = undefined;
        this._flexWrap = undefined;
        this._fontFamily = undefined;
        this._fontSize = undefined;
        this._fontStyle = undefined;
        this._fontWeight = undefined;
        this._height = undefined;
        this._justifyContent = undefined;
        this._left = undefined;
        this._letterSpacing = undefined;
        this._lineHeight = undefined;
        this._margin = undefined;
        this._marginLeft = undefined;
        this._marginTop = undefined;
        this._marginRight = undefined;
        this._marginBottom = undefined;
        this._maxHeight = undefined;
        this._maxWidth = undefined;
        this._minHeight = undefined;
        this._minWidth = undefined;
        this._objectFit = undefined;
        this._opacity = undefined;
        this._overflow = undefined;
        this._padding = undefined;
        this._paddingLeft = undefined;
        this._paddingTop = undefined;
        this._paddingRight = undefined;
        this._paddingBottom = undefined;
        this._pointerEvents = undefined;
        this._position = undefined;
        this._right = undefined;
        this._rotate = undefined;
        this._scale = [1,1];
        this._textContent = undefined;
        this._top = undefined;
        this._transform = [{ t: 'r', d: 0 },{ t: 's', d: [0,0] },{ t: 't', d: [[0,0], [0,0]] }];
        this._transformOrigin = undefined;
        this._translate = [[0,0],[0,0]];
        this._translateX = [0,0];
        this._translateY = [0,0];
        this._visibility = undefined;
        this._whiteSpace = undefined;
        this._width = undefined;
        this._wordSpacing = undefined;
        this._zIndex = 0;
        this._textStroke = undefined;
        this._textGradient = undefined;
        this._animListenerMap.clear();
        this._animListenerHookMap.clear();
    }

    private setStyleUndefined(key: UndefinedType) {
        // gui._reset_style(this._doc, this._ele, key);
    }
    // private radial_gradient(data: string) {
    //     // 
    // }
    // private linear_gradient(data: string) {
    //     // 
    // }
}