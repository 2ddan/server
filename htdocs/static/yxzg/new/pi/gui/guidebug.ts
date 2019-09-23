/**
 * 
 */

import {  gui } from './gui';
import { AnimationCmd, BoxA, BoxB, BoxL, BoxR, BoxT, FlexBasis, GradientData, GradientTypes, IBoxData, ILengthData, ILengthVector2, IRGBA, IShadow, IShadowB, IShadowC, IShadowH, IShadowV, ITransform, ITransformDataType, IVector2, ScrollInfo, Tools } from './tools';
import { EnabledTypes, FontStyle, FontWeight, LengthUnitType, TextAlign, UndefinedType, VerticalAlign, YGAlign, YGDisplay, YGEdge, YGFlexDirection, YGJustify, YGPositionType, YGWrap } from './enum';

export type GUIInstance = u32;
export type GUINode = u32;
export type GUIStyle = u32;
export type u32 = number;
export type f32 = number;
export type u8  = number;
export type str = string;

export const cfg = {
    useLib: true,
    counter: 1
};

(<any>window).useLibCfg = cfg;

export function _create_engine(resTimeOut: number): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._create_engine(resTimeOut);
}

export function _set_shader(engine: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_shader(engine);
}

export function _set_clear_color(world: u32, r: f32, g: f32, b: f32, a: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_clear_color(world, r, g, b, a);
}

export function _node_info(world: u32, node: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._node_info(world, node);
}

export function _update_font_texture(world: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._update_font_texture(world);
}

export function _set_render_dirty(doc: GUINode) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_render_dirty(doc);
}

export function _has_texture_res(doc: GUINode, url: string): boolean { 
    if (!cfg.useLib) { return !!0; }
    
    return gui._has_texture_res(doc, url);
}

/**
 * canvas 绘制
 */
export function _add_sdf_font_res(doc: GUINode, v: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._add_sdf_font_res(doc, v);
}

export function _add_font_face(doc: GUINode, v: u8, v1: u8, v2: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._add_font_face(doc,v,v1,v2);
}

/**
 * 初始化
 * @param canvas 目标
 */
export function _create_gui(engine: u32, width: number, height: number): GUIInstance { 
    if (!cfg.useLib) { return 0; }
    
    return gui._create_gui(engine,width,height);
}

export function _set_gui_size(_gui: u32, width: number, height: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_gui_size(_gui,width,height);
}

export function _offset_document(doc: GUINode, node: GUINode) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._offset_document(doc,node);
}

export function _content_box(doc: GUINode, node: GUINode) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._content_box(doc,node);
}

export function _set_border_src(doc: GUINode, node: GUINode, alphaMode: number, zipMode: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_border_src(doc, node,alphaMode,zipMode);
}
export function _set_border_image_slice(doc: GUINode, node: GUINode, u1: f32, v1: f32, u2: f32, v2: f32, fill: boolean) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_border_image_slice(doc,node,u1,v1,u2,v2,fill);
}
export function _set_border_image_clip(doc: GUINode, node: GUINode, u1: f32, v1: f32, u2: f32, v2: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_border_image_clip(doc,node,u1,v1,u2,v2);
}
export function _set_border_image_repeat(doc: GUINode, node: GUINode, vertical: u8, horizontal: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_border_image_repeat(doc,node,vertical,horizontal);
}
export function _set_image_clip(doc: GUINode, node: GUINode, u1: f32, v1: f32, u2: f32, v2: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_image_clip(doc,node,u1,v1,u2,v2);
}
export function _set_object_fit(doc: GUINode, node: GUINode, t: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_object_fit(doc,node,t);
}

/**
 * 节点后处理
 */
// export function _set_filter_grayscale(doc: GUINode, node: GUINode, v: number);

// export function _set_filter_hue_rotate(doc: GUINode, node: GUINode, v: number);

// export function _set_filter_bright_ness(doc: GUINode, node: GUINode, v: number);

export function _set_filter_hsi(doc: GUINode, node: GUINode, h: number, s: number, i: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_filter_hsi(doc,node,h,s,i);
}

/**
 * GUI 渲染调用
 * * 在渲染帧循环内调用
 * @param gui 目标gui实例
 */
export function _render(doc: GUIInstance) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._render(doc);
}

export function _create_texture_res(engine: u32, path: string, width: number, height: number, x: number, y: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._create_texture_res(engine, path, width, height, x, y);
}

// ========================= 节点创建接口
export function _set_enable(doc: GUIInstance, node: GUINode, b: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_enable(doc, node, b);
}

export function _query(doc: GUIInstance, x: f32, y: f32): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._query(doc, x, y);
}

export function _iter_query(doc: GUIInstance, x: f32, y: f32): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._iter_query(doc, x, y);
}

export function _reset_style(doc: GUIInstance, node: GUINode, key: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._reset_style(doc, node, key);
}

export function _create_text_node(doc: GUIInstance): GUINode { 
    if (!cfg.useLib) { return cfg.counter++; }
    
    return gui._create_text_node(doc);
}

export function _create_image_node(doc: GUIInstance): GUINode { 
    if (!cfg.useLib) { return cfg.counter++; }
    
    return gui._create_image_node(doc);
}

// export function _create_background_node(gui: GUIInstance): GUINode;

export function _create_node(doc: GUIInstance): GUINode { 
    if (!cfg.useLib) { return cfg.counter++; }
    
    return gui._create_node(doc);
}

// ========================= 节点通用基础属性

export function _set_class_name(doc: GUINode, node: GUINode, class_name: str) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_class_name(doc, node, class_name);
}

export function _cal_layout(doc: GUINode) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._cal_layout(doc);
}

// export function _class_name(doc: GUINode, node: GUINode): u32;

// export function _attributes(doc: GUINode, node: GUINode): u32;

// export function _style(doc: GUINode, node: GUINode): u32;

// export function _length(doc: GUINode, node: GUINode): u32;

// export function _get_named_item(doc: GUINode, node: GUINode, key: string): u32;

// export function _remove_named_item(doc: GUINode, node: GUINode, key: string): u32;

// export function _set_named_item(doc: GUINode, node: GUINode, key: string, value: string): u32;

// export function _to_linear_gradient_color(color_and_positions: f32[], direction: f32);

// ========================= 节点操作接口

export function _append_child(doc: GUINode, child: GUINode, node: GUINode): any { 
    if (!cfg.useLib) { return 0; }
    
    return gui._append_child(doc, child, node);
}

export function _remove_child(doc: GUINode, child: GUINode): any { 
    if (!cfg.useLib) { return 0; }
    
    return gui._remove_child(doc, child);
}

export function _insert_before(doc: GUINode, child: GUINode, brother: GUINode): any { 
    if (!cfg.useLib) { return 0; }
    
    return gui._insert_before(doc, child, brother);
}

// export function _insert_child_back(ndoe: GUINode, child: GUINode, brother: GUINode): any;

// ========================== 节点内容接口
// ------------ background container
export function _set_background_rgba_color(doc: GUINode, node: GUINode, value: IRGBA) { 
    if (!cfg.useLib) { return 0; }

    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.BackgroundColor);
    } else {
        gui._set_background_rgba_color(this._doc, this._ele, value[0], value[1], value[2], value[3]);
    }
}
/**
 * 
 * @param doc gui
 * @param node node
 * @param color_and_positions [r,g,b,a,<Decimal> | ...]
 * @param center_x <Decimal>
 * @param center_y <Decimal>
 * @param shape RadialGradientShape
 * @param size RadialGradientSize
 */
export function _set_background_radial_gradient_color(doc: GUINode, node: GUINode, center_x: f32, center_y: f32, shape: u8, size: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_background_radial_gradient_color(doc, node, center_x, center_y, shape, size);
}
/**
 * 
 * @param doc gui
 * @param node node
 * @param color_and_positions [r, g, b, a, <Decimal> | ...]
 * @param direction <angle>
 */
export function _set_background(doc: GUINode, node: GUINode, value: GradientData) {
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

// export function _background_color(doc: GUINode, node: GUINode): u32;

// ------------ image
// export function _src(doc: GUINode, node: GUINode): str;

export function _set_src(doc: GUINode, node: GUINode, alphaMode: number, zipMode: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_src(doc, node, alphaMode, zipMode);
}

// ------------ text
export function _text(doc: GUINode, node: GUINode): string { 
    if (!cfg.useLib) { return `0`; }
    
    return gui._text(doc, node);
}

export function _set_text_content(doc: GUINode, node: GUINode) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_text_content(doc, node);
}

// =========================== 节点内容样式
// ------------ 通用
export function _set_display(doc: GUINode, node: GUINode, value: YGDisplay) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        gui._set_display(this._doc, this._ele, Tools.display(undefined));
    } else {
        gui._set_display(this._doc, this._ele, value);
    }
}

// export function _transform(doc: GUINode, node: GUINode): u32;

// export function _layout(doc: GUINode, node: GUINode): u32;

export function _set_clip_path_geometry_box(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_clip_path_geometry_box(doc, node, value);
}

export function _set_clip_path_basic_shape(doc: GUINode, node: GUINode, ty: u8, data: f32[]) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_clip_path_basic_shape(doc, node, ty, data);
}

export function _set_overflow(doc: GUINode, node: GUINode, data: boolean) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_overflow(doc, node, data);
}

export function _set_opacity(doc: GUINode, node: GUINode, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_opacity(doc, node, value);
}

export function _set_zindex(doc: GUINode, node: GUINode, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_zindex(doc, node, value);
}

export function _set_visibility(doc: GUINode, node: GUINode, value: boolean) { 
    if (!cfg.useLib) { return 0; }

    if (Tools.noValue(value)) {
        gui._set_visibility(this._doc, this._ele, true);
    } else {
        gui._set_visibility(this._doc, this._ele, value);
    }
}

// ------------ container
///////////////////////////////////////////////////////////////////////////////////////

// ================================= text
export function _text_align(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._text_align(doc, node);
}

export function _set_text_align(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_text_align(doc, node, value);
}

export function _letter_spacing(doc: GUINode, node: GUINode): f32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._letter_spacing(doc, node);
}

export function _set_letter_spacing(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_letter_spacing(doc, node, value);
}

export function _line_height(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._line_height(doc, node);
}

export function _set_line_height(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_line_height(doc, node, value);
}

export function _text_indent(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._text_indent(doc, node);
}

export function _set_text_indent(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_text_indent(doc, node, value);
}

export function _white_space(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._white_space(doc, node);
}

export function _set_white_space(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_white_space(doc, node, value);
}

export function _set_text_stroke(doc: GUINode, node: GUINode, size: u32, r: u32, g: u32, b: u32, a: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_text_stroke(doc, node, size, r, g, b, a);
}

export function _set_text_linear_gradient_color(doc: GUINode, node: GUINode, x: number) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_text_linear_gradient_color(doc, node, x);
}

// ---------- text_shadow 

// export function _text_shadow(doc: GUINode, node: GUINode): u32;

export function _set_text_shadow(doc: GUINode, node: GUINode, h: f32, v: f32, r: f32, g: f32, b: f32, a: f32, blur: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_text_shadow(doc, node, h, v, r, g, b, a, blur);
}

export function _set_text_rgba_color(doc: GUINode, node: GUINode, r: u32, g: u32, b: u32, a: u32): string { 
    if (!cfg.useLib) { return `0`; }
    
    return gui._set_text_rgba_color(doc, node, r, g, b, a);
}

// ---------- font 

export function _font(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._font(doc, node);
}

export function _font_style(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._font_style(doc, node);
}

export function _set_font_style(doc: GUINode, node: GUINode, value: FontStyle) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        gui._set_font_style(this._doc, this._ele, FontStyle.Undefined);
    } else {
        gui._set_font_style(this._doc, this._ele, value);
    }
}

export function _font_weight(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._font_weight(doc, node);
}

export function _set_font_weight(doc: GUINode, node: GUINode, value: FontWeight) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        gui._set_font_weight(this._doc, this._ele, FontWeight.Normal);
    } else {
        gui._set_font_weight(this._doc, this._ele, value);
    }
}

export function _font_size(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._font_size(doc, node);
}

export function _set_font_size(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        gui._set_font_size(this._doc, this._ele, 16);
    } else {
        gui._set_font_size(this._doc, this._ele, value);
    }
    Tools.log(value);
}

export function _font_family(doc: GUINode, node: GUINode): string { 
    if (!cfg.useLib) { return `0`; }
    
    return gui._font_family(doc, node);
}

export function _set_font_family(doc: GUINode, node: GUINode, value: string) { 
    if (!cfg.useLib) { return 0; }
    
    (<any>window).__jsObj = value;
    gui._set_font_family(this._doc, this._ele);
}

// ================================= layout
// export function _layout(doc: GUINode, node: GUINode): u32;

// export function _flex_container(doc: GUINode, node: GUINode): u32;

export function _set_flex_container(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_flex_container(doc, node, value);
}

// ---------- flex_item 

// export function _flex_item(doc: GUINode, node: GUINode): u32;

// export function _flex_direction(doc: GUINode, node: GUINode): u32;

export function _set_flex_direction(doc: GUINode, node: GUINode, value: YGFlexDirection) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.FlexDirection);
    } else {
        gui._set_flex_direction(this._doc, this._ele, value);
    }
}

// export function _flex_wrap(doc: GUINode, node: GUINode): u32;

export function _set_flex_wrap(doc: GUINode, node: GUINode, value: YGWrap) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.FlexWrap);
    } else {
        gui._set_flex_wrap(this._doc, this._ele, value);
    }
}

// export function _flex_grow(doc: GUINode, node: GUINode): u32;

export function _set_flex_grow(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { return 0; }

    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.FlexGrow);
    } else {
        gui._set_flex_grow(this._doc, this._ele, value);
    }
}

// export function _flex_shrink(doc: GUINode, node: GUINode): u32;

export function _set_flex_shrink(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.FlexShrink);
    } else {
        gui._set_flex_shrink(this._doc, this._ele, value);
    }
}

// export function _flex_basis(doc: GUINode, node: GUINode): u32;

export function _set_flex_basis(doc: GUINode, node: GUINode, value: FlexBasis) { 
    if (!cfg.useLib) { return 0; }
    
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

// export function _flex_basis(doc: GUINode, node: GUINode): u32;

export function _set_flex_basis_auto(doc: GUINode, node: GUINode) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_flex_basis_auto(doc, node);
}

// ---------- margin 

// export function _margin(doc: GUINode, node: GUINode): u32;

export function _set_margin(doc: GUINode, node: GUINode, edge: u8, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
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

// ---------- border 

// export function _border(doc: GUINode, node: GUINode): u32;

export function _set_border(doc: GUINode, node: GUINode, value: IBoxData) { 
    if (!cfg.useLib) { return 0; }
        
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

export function _set_border_color(doc: GUINode, node: GUINode, value: IRGBA) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.BorderColor);
    } else {
        this.setBorderColor(YGEdge.YGEdgeAll, value);
    }
}

export function _set_border_radius(doc: GUINode, node: GUINode, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    if (Tools.noValue(value)) {
        this.setStyleUndefined(UndefinedType.BorderRadius);
    } else {
        gui._set_border_radius(this._doc, this._ele, value);
    }
}

// ---------------- box
export function _set_box_shadow(doc: GUINode, node: GUINode, value: IShadow) {
    if (!cfg.useLib) { return 0; }

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

export function _set_box_shadow_color(doc: GUINode, node: GUINode, r: f32, g: f32, b: f32, a: f32) { 
    // if (!cfg.useLib) { return 0; }
    
    gui._set_box_shadow_color(doc, node, r, g, b, a);
}

export function _set_box_shadow_h(doc: GUINode, node: GUINode, value: f32) { 
    // if (!cfg.useLib) { return 0; }
        
    gui._set_box_shadow_h(doc, node, value);
}

export function _set_box_shadow_v(doc: GUINode, node: GUINode, value: f32) { 
    // if (!cfg.useLib) { return 0; }
    
    gui._set_box_shadow_v(doc, node, value);
}

export function _set_box_shadow_blur(doc: GUINode, node: GUINode, value: f32) { 
    // if (!cfg.useLib) { return 0; }
    
    gui._set_box_shadow_blur(doc, node, value);
}

// ---------- padding 

// export function _padding(doc: GUINode, node: GUINode): u32;

export function _set_padding(doc: GUINode, node: GUINode, edge: u8, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_padding(doc, node, edge, value);
}

export function _set_padding_percent(doc: GUINode, node: GUINode, edge: u8, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_padding_percent(doc, node, edge, value);
}

// ---------- content_box 

// export function _content_box(doc: GUINode, node: GUINode): u32;

export function _offset_width(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._offset_width(doc, node);
}

export function _set_width(doc: GUINode, node: GUINode, value: ILengthData) {
    if (!cfg.useLib) { return 0; }
    
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

export function _offset_height(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._offset_height(doc, node);
}

export function _set_height(doc: GUINode, node: GUINode, value: ILengthData) { 
    if (!cfg.useLib) { return 0; }
    
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

// export function _max_width(doc: GUINode, node: GUINode): u32;

export function _set_max_width(doc: GUINode, node: GUINode, value: ILengthData) { 
    if (!cfg.useLib) { return 0; }
    
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

// export function _max_height(doc: GUINode, node: GUINode): u32;

export function _set_max_height(doc: GUINode, node: GUINode, value: ILengthData) { 
    if (!cfg.useLib) { return 0; }
    
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

// export function _min_width(doc: GUINode, node: GUINode): u32;

export function _set_min_width(doc: GUINode, node: GUINode, value: ILengthData) { 
    if (!cfg.useLib) { return 0; }
    
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

// export function _min_height(doc: GUINode, node: GUINode): u32;

export function _set_min_height(doc: GUINode, node: GUINode, value: ILengthData) { 
    if (!cfg.useLib) { return 0; }

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

// ---------- position 

// export function _position(doc: GUINode, node: GUINode): u32;

export function _set_position(doc: GUINode, node: GUINode, edge:u8, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_position(doc, node, edge, value);
}

export function _set_position_percent(doc: GUINode, node: GUINode, edge:u8, value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_position_percent(doc, node, edge, value);
}

// export function _position_ty(doc: GUINode, node: GUINode): u32;
export function _set_position_type(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_position_type(doc, node, value);
}

export function _offset_top(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._offset_top(doc, node);
}

export function _offset_left(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._offset_left(doc, node);
}

// export function _align_content(doc: GUINode, node: GUINode): u32;

export function _set_align_content(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { 
        return 0; 
    }
    
    return gui._set_align_content(doc, node, value);
}

// export function _align_items(doc: GUINode, node: GUINode): u32;

export function _set_align_items(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { return 0; }

    return gui._set_align_items(doc, node, value);
}

// export function _align_self(doc: GUINode, node: GUINode): u32;

export function _set_align_self(doc: GUINode, node: GUINode, value: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_align_self(doc, node, value);
}

// export function _justify_content(doc: GUINode, node: GUINode): u32;

export function _set_justify_content(doc: GUINode, node: GUINode, value: u8) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._set_justify_content(doc, node, value);
}

// ================================= transform

export function _clear_transform(doc: GUINode, node: GUINode): u32 { 
    if (!cfg.useLib) { return 0; }
    
    return gui._clear_transform(doc, node);
}

export function _transform_translate_x_percent(doc: GUINode, node: GUINode, _x: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_translate_x_percent(doc, node, _x);
}
export function _transform_translate_y_percent(doc: GUINode, node: GUINode, _y: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_translate_y_percent(doc, node, _y);
}

export function _transform_translate_x(doc: GUINode, node: GUINode, _x: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_translate_x(doc, node, _x);
}
export function _transform_translate_y(doc: GUINode, node: GUINode, _y: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_translate_y(doc, node, _y);
}

export function _transform_translate_percent(doc: GUINode, node: GUINode, _x: u32, _y: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_translate_percent(doc, node, _x, _y);
}
export function _transform_translate(doc: GUINode, node: GUINode, _x: u32, _y: u32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_translate(doc, node, _x, _y);
}

export function _transform_scale(doc: GUINode, node: GUINode, _x: f32, _y: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_scale(doc, node, _x, _y);
}

export function _transform_rotate(doc: GUINode, node: GUINode, _value: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_rotate(doc, node, _value);
}

export function _transform_origin(doc: GUINode, node: GUINode, tx: u8, _x: f32, ty: u8, _y: f32) { 
    if (!cfg.useLib) { return 0; }
    
    return gui._transform_origin(doc, node, tx, _x, ty, _y);
}