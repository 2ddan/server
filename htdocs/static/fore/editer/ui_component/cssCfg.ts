export const cssCfg = {
    "position": {
        "desc_key": "定位方式",
        "value_type": "Enum",
        "enum": [
            "absolute",
            "relative",
            "fixed"
        ],
        "desc_enum": [
            "绝对定位(受父级定位元素影响)",
            "相对定位(受父级定位元素影响并且保留原位置)",
            "固定(不受任何元素影响)"
        ],
        "split": 1
    },
    "left": {
        "desc_key": "左",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1,
        "tips": "需要设置position"
    },
    "top": {
        "desc_key": "上",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1,
        "tips": "需要设置position"
    },
    "right": {
        "desc_key": "右",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1,
        "tips": "需要设置position"
    },
    "bottom": {
        "desc_key": "下",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1,
        "tips": "需要设置position"
    },
    "margin": {
        "desc_key": "外间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": [
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left"
        ],
        "split_arg": 1
    },
    "margin-top": {
        "desc_key": "上间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "tips": "如果父级没有定位/padding-top/overflow:hidden，该值会合并到父级的margin-top"
    },
    "margin-right": {
        "desc_key": "右间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "margin-bottom": {
        "desc_key": "下间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "margin-left": {
        "desc_key": "左间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "padding": {
        "desc_key": "内间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": [
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left"
        ],
        "split_arg": 1,
        "tips": "内间距会将该容器撑大，如果设置内间距，请从宽高中除去相应大小"
    },
    "padding-top": {
        "desc_key": "内上间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "padding-right": {
        "desc_key": "内右间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "padding-bottom": {
        "desc_key": "内下间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "padding-left": {
        "desc_key": "内左间距",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ]
    },
    "border-width": {
        "desc_key": "边框宽度",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split": [
            "border-top-width",
            "border-right-width",
            "border-bottom-width",
            "border-left-width"
        ],
        "split_arg": 1
    },
    "border-top-width": {
        "desc_key": "上边框宽度",
        "value_type": "Number",
        "value_unit": [
            "px"
        ]
    },
    "border-right-width": {
        "desc_key": "右边框宽度",
        "value_type": "Number",
        "value_unit": [
            "px"
        ]
    },
    "border-bottom-width": {
        "desc_key": "下边框宽度",
        "value_type": "Number",
        "value_unit": [
            "px"
        ]
    },
    "border-left-width": {
        "desc_key": "左边框宽度",
        "value_type": "Number",
        "value_unit": [
            "px"
        ]
    },
    "border-style": {
        "desc_key": "边框样式",
        "value_type": "Enum",
        "enum": [
            "none",
            "solid",
            "dotted",
            "double",
            "inset",
            "outset"
        ],
        "desc_enum": [
            "无边框",
            "实线",
            "点状",
            "双线",
            "3D内边框",
            "3D外边框"
        ],
        "split": [
            "border-top-style",
            "border-right-style",
            "border-bottom-style",
            "border-left-style"
        ],
        "split_arg": 1
    },
    "border-top-style": {
        "desc_key": "上边框样式",
        "value_type": "Enum",
        "enum": [
            "none",
            "solid",
            "dotted",
            "double",
            "inset",
            "outset"
        ],
        "desc_enum": [
            "无边框",
            "实线",
            "点状",
            "双线",
            "3D内边框",
            "4D外边框"
        ]
    },
    "border-right-style": {
        "desc_key": "右边框样式",
        "value_type": "Enum",
        "enum": [
            "none",
            "solid",
            "dotted",
            "double",
            "inset",
            "outset"
        ],
        "desc_enum": [
            "无边框",
            "实线",
            "点状",
            "双线",
            "3D内边框",
            "5D外边框"
        ]
    },
    "border-bottom-style": {
        "desc_key": "下边框样式",
        "value_type": "Enum",
        "enum": [
            "none",
            "solid",
            "dotted",
            "double",
            "inset",
            "outset"
        ],
        "desc_enum": [
            "无边框",
            "实线",
            "点状",
            "双线",
            "3D内边框",
            "6D外边框"
        ]
    },
    "border-left-style": {
        "desc_key": "左边框样式",
        "value_type": "Enum",
        "enum": [
            "none",
            "solid",
            "dotted",
            "double",
            "inset",
            "outset"
        ],
        "desc_enum": [
            "无边框",
            "实线",
            "点状",
            "双线",
            "3D内边框",
            "7D外边框"
        ]
    },
    "border-color": {
        "desc_key": "边框颜色",
        "value_type": "Color",
        "split": [
            "border-top-color",
            "border-right-color",
            "border-bottom-color",
            "border-left-color"
        ],
        "split_arg": 1
    },
    "border-top-color": {
        "desc_key": "上边框颜色",
        "value_type": "Color"
    },
    "border-right-color": {
        "desc_key": "右边框颜色",
        "value_type": "Color"
    },
    "border-bottom-color": {
        "desc_key": "下边框颜色",
        "value_type": "Color"
    },
    "border-left-color": {
        "desc_key": "左边框颜色",
        "value_type": "Color"
    },
    "background": {
        "desc_key": "背景",
        "split": [
            "background-color",
            "background-image",
            "background-size",
            "background-repeat",
            "background-position"
        ],
        "split_arg": 2
    },
    "background-color": {
        "desc_key": "背景颜色",
        "value_type": "Color"
    },
    "background-image": {
        "desc_key": "背景图片",
        "value_type": "Url"
    },
    "background-size": {
        "desc_key": "背景大小",
        "value_type": "Rich",
        "value_unit": [
            "px",
            "%"
        ],
        "tips": "第二个值默认等于第一个值"
    },
    "background-repeat": {
        "desc_key": "背景重复",
        "value_type": "Enum",
        "enum": [
            "repeat",
            "repeat-x",
            "repeat-y",
            "no-repeat"
        ],
        "desc_enum": [
            "重复",
            "水平方向重复",
            "垂直方向重复",
            "不重复"
        ]
    },
    "background-position": {
        "desc_key": "背景定位",
        "value_type": "Rich",
        "enum": [
            "top left",
            "top center",
            "top right",
            "center left",
            "center center",
            "center right",
            "bottom left",
            "bottom center",
            "bottom right"
        ],
        "value_unit": [
            "px",
            "%"
        ],
        "tips": "第二个值默认center"
    },
    "width": {
        "desc_key": "宽度",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "min-width": {
        "desc_key": "最小宽度",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "max-width": {
        "desc_key": "最大宽度",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "height": {
        "desc_key": "高度",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "min-height": {
        "desc_key": "最小高度",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "max-height": {
        "desc_key": "最大高度",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "border-radius": {
        "desc_key": "边框倒角",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "font": {
        "desc_key": "字体",
        "split": [
            "font-style",
            "font-weight",
            "font-size",
            "font-family"
        ],
        "split_arg": 2
    },
    "font-style": {
        "desc_key": "字体样式",
        "value_type": "Enum",
        "enum": [
            "normal",
            "italic"
        ],
        "desc_enum": [
            "正常",
            "斜体"
        ]
    },
    "font-weight": {
        "desc_key": "字体粗细",
        "value_type": "Enum",
        "enum": [
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900"
        ],
        "desc_enum": [
            "100",
            "200",
            "300",
            "常规字",
            "500",
            "600",
            "粗体字",
            "800",
            "900"
        ],
        "tips": "400等于normal,700等于bold"
    },
    "font-size": {
        "desc_key": "字体大小",
        "value_type": "Number",
        "value_unit": [
            "px"
        ]
    },
    "font-family": {
        "desc_key": "字体系列",
        "value_type": "Enum",
        "enum": [
            "mnjsh",
            "courier",
            "arial"
        ],
        "desc_enum": [
            "书魂字体",
            "字体",
            "字体"
        ]
    },
    "display": {
        "desc_key": "元素显示类型",
        "value_type": "Enum",
        "enum": [
            "none",
            "block",
            "inline",
            "inline-block"
        ],
        "desc_enum": [
            "隐藏(不保留位置)",
            "块",
            "行内",
            "行内块"
        ],
        "split": 1
    },
    "white-space": {
        "desc_key": "文本换行",
        "value_type": "Enum",
        "enum": [
            "nowrap",
            "normal"
        ],
        "desc_enum": [
            "不换行",
            "自动换行"
        ],
        "split": 1
    },
    "visibility": {
        "desc_key": "可见性",
        "value_type": "Enum",
        "enum": [
            "visible",
            "hidden"
        ],
        "desc_enum": [
            "显示",
            "隐藏(保留位置)"
        ],
        "split": 1
    },
    "opacity": {
        "desc_key": "不透明度",
        "value_type": "Number",
        "split": 1,
        "tips": "值介于0-1"
    },
    "z-index": {
        "desc_key": "层叠顺序",
        "value_type": "Number",
        "split": 1,
        "tips": "z-index应严格控制,请咨询项目负责人"
    },
    "vertical-align": {
        "desc_key": "垂直对其方式",
        "value_type": "Enum",
        "enum": [
            "top",
            "text-top",
            "middle",
            "bottom",
            "text-bottom"
        ],
        "desc_enum": [
            "与最高元素顶部对齐",
            "与文本顶部对齐",
            "放在父级中间",
            "与最低元素对齐",
            "与文本底部对齐"
        ],
        "split": 1
    },
    "overflow": {
        "desc_key": "内容溢出",
        "value_type": "Enum",
        "enum": [
            "visible",
            "hidden",
            "scroll",
            "auto"
        ],
        "desc_enum": [
            "可见",
            "隐藏",
            "滚动",
            "自动(没有溢出不显示滚动条)"
        ],
        "split": [
            "overflow-x",
            "overflow-y"
        ],
        "split_arg": 1
    },
    "overflow-x": {
        "desc_key": "水平溢出",
        "value_type": "Enum",
        "enum": [
            "visible",
            "hidden",
            "scroll",
            "auto"
        ],
        "desc_enum": [
            "可见",
            "隐藏",
            "滚动",
            "自动(没有溢出不显示滚动条)"
        ]
    },
    "overflow-y": {
        "desc_key": "垂直溢出",
        "value_type": "Enum",
        "enum": [
            "visible",
            "hidden",
            "scroll",
            "auto"
        ],
        "desc_enum": [
            "可见",
            "隐藏",
            "滚动",
            "自动(没有溢出不显示滚动条)"
        ]
    },
    "color": {
        "desc_key": "文本颜色",
        "value_type": "Color",
        "split": 1
    },
    "direction": {
        "desc_key": "文本朝向",
        "value_type": "Enum",
        "enum": [
            "ltr",
            "rtl"
        ],
        "desc_enum": [
            "从左到右",
            "从右到左"
        ],
        "split": 1
    },
    "letter-spacing": {
        "desc_key": "字间距",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split": 1
    },
    "line-height": {
        "desc_key": "行高",
        "value_type": "Number",
        "value_unit": [
            "px",
            "%"
        ],
        "split": 1
    },
    "text-indent": {
        "desc_key": "首行缩进",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split": 1
    },
    "text-align": {
        "desc_key": "文本对齐",
        "value_type": "Enum",
        "enum": [
            "left",
            "center",
            "right"
        ],
        "desc_enum": [
            "左对齐",
            "居中",
            "右对齐"
        ],
        "split": 1
    },
    "box-shadow": {
        "desc_key": "盒子阴影",
        "split": [
            "h-shadow",
            "v-shadow",
            "shadow-blur",
            "shadow-spread",
            "shadow-color",
            "shadow-inset"
        ],
        "split_arg": 3
    },
    "h-shadow": {
        "desc_key": "阴影水平位置",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split_arg": "box-shadow",
        "default": "0px"
    },
    "v-shadow": {
        "desc_key": "阴影垂直位置",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split_arg": "box-shadow",
        "default": "0px"
    },
    "shadow-blur": {
        "desc_key": "阴影模糊",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split_arg": "box-shadow",
        "default": "0px"
    },
    "shadow-spread": {
        "desc_key": "阴影尺寸",
        "value_type": "Number",
        "value_unit": [
            "px"
        ],
        "split_arg": "box-shadow",
        "default": "0px"
    },
    "shadow-color": {
        "desc_key": "阴影颜色",
        "value_type": "Color",
        "split_arg": "box-shadow",
        "default": "#fff"
    },
    "shadow-inset": {
        "desc_key": "阴影朝向",
        "value_type": "Enum",
        "enum": [
            "inset",
            "outset"
        ],
        "desc_enum": [
            "内阴影",
            "外阴影"
        ],
        "split_arg": "box-shadow",
        "default": "inset"
    }
}