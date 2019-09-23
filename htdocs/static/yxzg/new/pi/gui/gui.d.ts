export module gui {
    type GUIInstance = u32;
    type GUINode = u32;
    type GUIStyle = u32;
    type u32 = number;
    type f32 = number;
    type u8  = number;
    type str = string;
    
    function _create_engine(resTimeOut: number): u32;

    function _set_shader(engine: u32);

    function _set_clear_color(world: u32, r: f32, g: f32, b: f32, a: f32);

    function _node_info(world: u32, node: f32);

    function _update_font_texture(world: u32);

    function _set_render_dirty(doc: GUINode);
    
    function _has_texture_res(doc: GUINode, url: string): boolean;

    /**
     * canvas 绘制
     */
    function _add_sdf_font_res(doc: GUINode, v: u8);
    
    function _add_font_face(doc: GUINode, v: u8, v1: u8, v2: u8);

    /**
     * 初始化
     * @param canvas 目标
     */
    function _create_gui(engine: u32, width: number, height: number): GUIInstance;

    function _set_gui_size(_gui: u32, width: number, height: number);

    function _offset_document(doc: GUINode, node: GUINode);

    function _content_box(doc: GUINode, node: GUINode);

    function _set_border_src(doc: GUINode, node: GUINode, alphaMode: number, zipMode: number);
    
    function _set_border_src_with_texture(doc: GUINode, node: GUINode, textureID: number);

    function _set_border_image_slice(doc: GUINode, node: GUINode, top: f32, right: f32, bottom: f32, left: f32, fill: boolean);
    function _set_border_image_clip(doc: GUINode, node: GUINode, u1: f32, v1: f32, u2: f32, v2: f32);
    function _set_border_image_repeat(doc: GUINode, node: GUINode, vertical: u8, horizontal: u8);
    function _set_image_clip(doc: GUINode, node: GUINode, u1: f32, v1: f32, u2: f32, v2: f32);
    function _set_object_fit(doc: GUINode, node: GUINode, t: u8);

    /**
     * 节点后处理
     */
    // function _set_filter_grayscale(doc: GUINode, node: GUINode, v: number);

    // function _set_filter_hue_rotate(doc: GUINode, node: GUINode, v: number);

    // function _set_filter_bright_ness(doc: GUINode, node: GUINode, v: number);

    function _set_filter_hsi(doc: GUINode, node: GUINode, h: number, s: number, i: number);
    
    /**
     * GUI 渲染调用
     * * 在渲染帧循环内调用
     * @param gui 目标gui实例
     */
    function _render(gui: GUIInstance);

    /**
     * window.__jsObj   image
     * window.__jsObj1  key
     */
    function _create_texture_res(gui: GUIInstance, alphaMode: number, zipMode: number): u32;

    function _release_texture_res(texture: u32);
    
    // ========================= 节点创建接口
    function _set_enable(gui: GUIInstance, node: GUINode, b: u8);

    function _query(gui: GUIInstance, x: f32, y: f32): u32;

    function _iter_query(gui: GUIInstance, x: f32, y: f32): u32;

    function _reset_style(gui: GUIInstance, node: GUINode, key: number);
    
    function _create_text_node(gui: GUIInstance): GUINode;
    
    function _create_image_node(gui: GUIInstance): GUINode;
    
    // function _create_background_node(gui: GUIInstance): GUINode;
    
    function _create_node(gui: GUIInstance): GUINode;
    
    // ========================= 节点通用基础属性
    
    function _set_class_name(doc: GUINode, node: GUINode, class_name: str);

    function _cal_layout(doc: GUINode);
    
    // function _class_name(doc: GUINode, node: GUINode): u32;
    
    // function _attributes(doc: GUINode, node: GUINode): u32;
    
    // function _style(doc: GUINode, node: GUINode): u32;
    
    // function _length(doc: GUINode, node: GUINode): u32;
    
    // function _get_named_item(doc: GUINode, node: GUINode, key: string): u32;
    
    // function _remove_named_item(doc: GUINode, node: GUINode, key: string): u32;
    
    // function _set_named_item(doc: GUINode, node: GUINode, key: string, value: string): u32;

    // function _to_linear_gradient_color(color_and_positions: f32[], direction: f32)
    
    // ========================= 节点操作接口
    
    function _append_child(doc: GUINode, child: GUINode, node: GUINode): void;
    
    function _remove_child(doc: GUINode, child: GUINode): void;
    
    function _insert_before(doc: GUINode, child: GUINode, brother: GUINode): void;
    
    // function _insert_child_back(ndoe: GUINode, child: GUINode, brother: GUINode): void;
    
    // ========================== 节点内容接口
    // ------------ background container
    function _set_background_rgba_color(doc: GUINode, node: GUINode, r: f32, g: f32, b: f32, a: f32);
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
    function _set_background_radial_gradient_color(doc: GUINode, node: GUINode, center_x: f32, center_y: f32, shape: u8, size: u8 )
    /**
     * 
     * @param doc gui
     * @param node node
     * @param color_and_positions [r, g, b, a, <Decimal> | ...]
     * @param direction <angle>
     */
    function _set_background_linear_gradient_color(doc: GUINode, node: GUINode, direction: f32);

    // function _background_color(doc: GUINode, node: GUINode): u32;
    
    // ------------ image
    // function _src(doc: GUINode, node: GUINode): str;

    function _set_src(doc: GUINode, node: GUINode, alphaMode: number, zipMode: number);
    
    function _set_src_with_texture(doc: GUINode, node: GUINode, textureID: number);
    
    // ------------ text
    function _text(doc: GUINode, node: GUINode): string;

    function _set_text_content(doc: GUINode, node: GUINode);

    // =========================== 节点内容样式
    // ------------ 通用
    function _set_display(doc: GUINode, node: GUINode, value: u8);
    
    // function _transform(doc: GUINode, node: GUINode): u32;
    
    // function _layout(doc: GUINode, node: GUINode): u32;
    
    function _set_clip_path_geometry_box(doc: GUINode, node: GUINode, value: u8);

    function _set_clip_path_basic_shape(doc: GUINode, node: GUINode, ty: u8, data: f32[]);

    function _set_overflow(doc: GUINode, node: GUINode, data: boolean);

    function _set_opacity(doc: GUINode, node: GUINode, value: f32);

    function _set_zindex(doc: GUINode, node: GUINode, value: f32);

    function _set_visibility(doc: GUINode, node: GUINode, value: boolean);
    
    // ------------ container
    ///////////////////////////////////////////////////////////////////////////////////////
    
    // ================================= text
    function _text_align(doc: GUINode, node: GUINode): u32;
    
    function _set_text_align(doc: GUINode, node: GUINode, _data: u32);
    
    function _letter_spacing(doc: GUINode, node: GUINode): f32;
    
    function _set_letter_spacing(doc: GUINode, node: GUINode, _data: u32);
    
    function _line_height(doc: GUINode, node: GUINode): u32;
    
    function _set_line_height(doc: GUINode, node: GUINode, _data: u32);
    
    function _text_indent(doc: GUINode, node: GUINode): u32;
    
    function _set_text_indent(doc: GUINode, node: GUINode, _data: u32);
    
    function _white_space(doc: GUINode, node: GUINode): u32;
    
    function _set_white_space(doc: GUINode, node: GUINode, _data: u32);

    function _set_text_stroke(doc: GUINode, node: GUINode, size: u32, r: u32, g: u32, b: u32, a: u32);

    function _set_text_linear_gradient_color(doc: GUINode, node: GUINode, x: number);
    
    
    // ---------- text_shadow 
    
    // function _text_shadow(doc: GUINode, node: GUINode): u32;

    function _set_text_shadow(doc: GUINode, node: GUINode, h: f32, v: f32, r: f32, g: f32, b: f32, a: f32, blur: f32)
    
    // function _h_text_shadow(doc: GUINode, node: GUINode): u32;
    
    // function _set_h_text_shadow(doc: GUINode, node: GUINode, _data: u32);
    
    // function _v_text_shadow(doc: GUINode, node: GUINode): u32;
    
    // function _set_v_text_shadow(doc: GUINode, node: GUINode, _data: u32);
    
    // function _blur_text_shadow(doc: GUINode, node: GUINode): u32;
    
    // function _set_blur_text_shadow(doc: GUINode, node: GUINode, _data: u32);
    
    // function _color_text_shadow(doc: GUINode, node: GUINode): u32;
    
    // function _set_color_text_shadow(doc: GUINode, node: GUINode, _data: u32);
    
    function _set_text_rgba_color(doc: GUINode, node: GUINode, r: u32, g: u32, b: u32, a: u32): string;
    
    // function _set_text_color(doc: GUINode, node: GUINode, _data: string);
    
    
    // ---------- font 
    
    function _font(doc: GUINode, node: GUINode): u32;
    
    function _font_style(doc: GUINode, node: GUINode): u32;
    
    function _set_font_style(doc: GUINode, node: GUINode, _data: u32);
    
    function _font_weight(doc: GUINode, node: GUINode): u32;
    
    function _set_font_weight(doc: GUINode, node: GUINode, _data: u32);
    
    function _font_size(doc: GUINode, node: GUINode): u32;
    
    function _set_font_size(doc: GUINode, node: GUINode, _data: u32);
    
    function _font_family(doc: GUINode, node: GUINode): string;
    
    function _set_font_family(doc: GUINode, node: GUINode);
    
    
    // ================================= layout
    // function _layout(doc: GUINode, node: GUINode): u32;
    
    // function _set_layout(doc: GUINode, node: GUINode, _data: u32);
    
    // function _flex_container(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_container(doc: GUINode, node: GUINode, _data: u32);
    
    
    // ---------- flex_item 
    
    // function _flex_item(doc: GUINode, node: GUINode): u32;
    
    // function _flex_direction(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_direction(doc: GUINode, node: GUINode, _data: u8);
    
    // function _flex_wrap(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_wrap(doc: GUINode, node: GUINode, _data: u8);
    
    // function _flex_grow(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_grow(doc: GUINode, node: GUINode, _data: u8);
    
    // function _flex_shrink(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_shrink(doc: GUINode, node: GUINode, _data: u8);
    
    // function _flex_basis(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_basis(doc: GUINode, node: GUINode, _data: u8);
    
    // function _flex_basis(doc: GUINode, node: GUINode): u32;
    
    function _set_flex_basis_auto(doc: GUINode, node: GUINode);
    
    
    // ---------- margin 
    
    // function _margin(doc: GUINode, node: GUINode): u32;

    function _set_margin(doc: GUINode, node: GUINode, edge: u8, value: f32);

    function _set_margin_percent(doc: GUINode, node: GUINode, edge: u8, value: f32);

    function _set_margin_auto(doc: GUINode, node: GUINode, edge: u8);
    
    // function _margin_top(doc: GUINode, node: GUINode): u32;
    
    // function _set_margin_top(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _margin_right(doc: GUINode, node: GUINode): u32;
    
    // function _set_margin_right(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _margin_bottom(doc: GUINode, node: GUINode): u32;
    
    // function _set_margin_bottom(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _margin_left(doc: GUINode, node: GUINode): u32;
    
    // function _set_margin_left(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    
    // ---------- border 
    
    // function _border(doc: GUINode, node: GUINode): u32;

    function _set_border(doc: GUINode, node: GUINode, edge: u8, value: f32);
    
    function _set_border_color(doc: GUINode, node: GUINode, r: u8, g: u8, b: u8, a: u8);

    function _set_border_radius(doc: GUINode, node: GUINode, value: f32);
    
    // function _border_top(doc: GUINode, node: GUINode): u32;
    
    // function _set_border_top(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _border_right(doc: GUINode, node: GUINode): u32;
    
    // function _set_border_right(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _border_bottom(doc: GUINode, node: GUINode): u32;
    
    // function _set_border_bottom(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _border_left(doc: GUINode, node: GUINode): u32;
    
    // function _set_border_left(doc: GUINode, node: GUINode, _type: u32, _data: u32);

    // ---------------- box
    function _set_box_shadow_color(doc: GUINode, node: GUINode, r: f32, g: f32, b: f32, a: f32);

    function _set_box_shadow_h(doc: GUINode, node: GUINode, value: f32);

    function _set_box_shadow_v(doc: GUINode, node: GUINode, value: f32);

    function _set_box_shadow_blur(doc: GUINode, node: GUINode, value: f32);
    
    
    // ---------- padding 
    
    // function _padding(doc: GUINode, node: GUINode): u32;

    function _set_padding(doc: GUINode, node: GUINode, edge: u8, _data: f32);

    function _set_padding_percent(doc: GUINode, node: GUINode, edge: u8, _data: f32);
    
    // function _padding_top(doc: GUINode, node: GUINode): u32;
    
    // function _set_padding_top(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _padding_right(doc: GUINode, node: GUINode): u32;
    
    // function _set_padding_right(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _padding_bottom(doc: GUINode, node: GUINode): u32;
    
    // function _set_padding_bottom(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _padding_left(doc: GUINode, node: GUINode): u32;
    
    // function _set_padding_left(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    
    // ---------- content_box 
    
    // function _content_box(doc: GUINode, node: GUINode): u32;
    
    function _offset_width(doc: GUINode, node: GUINode): u32;
    
    function _set_width(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_width_percent(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_width_auto(doc: GUINode, node: GUINode);
    
    function _offset_height(doc: GUINode, node: GUINode): u32;
    
    function _set_height(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_height_percent(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_height_auto(doc: GUINode, node: GUINode);
    
    // function _max_width(doc: GUINode, node: GUINode): u32;
    
    function _set_max_width(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_max_width_percent(doc: GUINode, node: GUINode, _data: f32);
    
    // function _max_height(doc: GUINode, node: GUINode): u32;
    
    function _set_max_height(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_max_height_percent(doc: GUINode, node: GUINode, _data: f32);
    
    // function _min_width(doc: GUINode, node: GUINode): u32;
    
    function _set_min_width(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_min_width_percent(doc: GUINode, node: GUINode, _data: f32);
    
    // function _min_height(doc: GUINode, node: GUINode): u32;
    
    function _set_min_height(doc: GUINode, node: GUINode, _data: f32);
    
    function _set_min_height_percent(doc: GUINode, node: GUINode, _data: f32);
    
    
    // ---------- position 
    
    // function _position(doc: GUINode, node: GUINode): u32;

    function _set_position(doc: GUINode, node: GUINode, edge:u8, value: f32);

    function _set_position_percent(doc: GUINode, node: GUINode, edge:u8, value: f32);
    
    // function _position_ty(doc: GUINode, node: GUINode): u32;
    function _set_position_type(doc: GUINode, node: GUINode, value: u8);
    
    // function _set_position_ty(doc: GUINode, node: GUINode, _data: u32);
    
    function _offset_top(doc: GUINode, node: GUINode): u32;
    
    // function _set_position_top(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    function _offset_left(doc: GUINode, node: GUINode): u32;
    
    // function _set_position_left(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _position_right(doc: GUINode, node: GUINode): u32;
    
    // function _set_position_right(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _position_bottom(doc: GUINode, node: GUINode): u32;
    
    // function _set_position_bottom(doc: GUINode, node: GUINode, _type: u32, _data: u32);
    
    // function _align_content(doc: GUINode, node: GUINode): u32;
    
    function _set_align_content(doc: GUINode, node: GUINode, _data: u8);
    
    // function _align_items(doc: GUINode, node: GUINode): u32;
    
    function _set_align_items(doc: GUINode, node: GUINode, _data: u8);
    
    // function _align_self(doc: GUINode, node: GUINode): u32;
    
    function _set_align_self(doc: GUINode, node: GUINode, _data: u32);
    
    // function _justify_content(doc: GUINode, node: GUINode): u32;
    
    function _set_justify_content(doc: GUINode, node: GUINode, _data: u8);
    
    
    // ================================= transform
    
    function _clear_transform(doc: GUINode, node: GUINode): u32;
    
    function _transform_translate_x_percent(doc: GUINode, node: GUINode, _x: u32);
    function _transform_translate_y_percent(doc: GUINode, node: GUINode, _y: u32);

    function _transform_translate_x(doc: GUINode, node: GUINode, _x: u32);
    function _transform_translate_y(doc: GUINode, node: GUINode, _y: u32);

    function _transform_translate_percent(doc: GUINode, node: GUINode, _x: u32, _y: u32);
    function _transform_translate(doc: GUINode, node: GUINode, _x: u32, _y: u32);

    function _transform_scale(doc: GUINode, node: GUINode, _x: f32, _y: f32);

    function _transform_rotate(doc: GUINode, node: GUINode, _value: f32);

    function _transform_origin(doc: GUINode, node: GUINode, tx: u8, _x: f32, ty: u8, _y: f32);

    // ================================== class
    /**
     * 在指定上下文中创建一个 文本样式表
     */
    function _create_text_style_class(doc: u32, class_id: u32): boolean;

    /**
     * 设置指定 文本样式表的 font-family
     * * 值为 : window.__jsObj : 字符串
     */
    function _set_text_style_class_font_family(doc: u32, class_id: u32);

    /**
     * 设置指定 文本样式表的 font-size
     */
    function _set_text_style_class_font_size(world: u32, class_id: u32, value: f32);

    /**
     * 设置指定 文本样式表的 font-style
     */
    function _set_text_style_class_font_style(world: u32, class_id: u32, value: u8);

    /**
     * 设置指定 文本样式表的 font-weight - 暂时未用
     */
    function _set_text_style_class_font_weight(world: u32, class_id: u32, value: f32);

    /**
     * 字符间距
     */
    function _set_text_style_class_letter_spacing(world: u32, class_id: u32, value: f32);

    /**
     * 文本颜色
     */
    function _set_text_style_class_text_rgba_color(world: u32, class_id: u32, r: f32, g: f32, b: f32, a: f32);

    /**
     * 线性渐变
     * 颜色渐变配置: 
     * window.__jsObj: [r, g, b, a, pos,   r, g, b, a, pos] 
     */
    function _set_text_style_class_linear_gradient_color(world: u32, class_id: u32, direction: f32);

    /**
     * 设置指定 文本样式表的 line-height ; 行高
     */
    function _set_text_style_class_line_height(world: u32, class_id: u32, value: f32);

    /**
     * 设置指定 文本样式表的 text-indent ; 首行缩进  - 使用的少
     */
    function _set_text_style_class_text_indent(world: u32, class_id: u32, value: f32);

    /**
     * 设置指定 文本样式表的 white-space ；空白符处理<换行符是否要实现换行>
     */
    function _set_text_style_class_white_space(world: u32, class_id: u32, value: u8);

    /**
     * 设置指定 文本样式表的 text-stroke ; 描边
     */
    function _set_text_style_class_text_stroke(world: u32, class_id: u32, width: f32, r: f32, g: f32, b: f32, a: f32);

    /**
     * 设置指定 文本样式表的 text-shadow
     */
    function _set_text_style_class_text_shadow(world: u32, class_id: u32, h: f32, v: f32, r: f32, g: f32, b: f32, a: f32, blur: f32);


    ///////////////////////////
    /// 文本节点处理 添加接口 应该是 text.rs
    ///////////////////////////

    /**
     * 给指定节点 指定默认样式表
     */
    function _set_text_style_class(world: u32, node_id: u32, class_id: u32);
}