import { Font_Fonts }   from "./uiNodeEnum";

/**
 * Date: 2018-08-06 11:00:00
 * Version: 0.1
 *      描述：
 *          UI 场景内节点数据结构
 *      功能：
 *          定义 UI 场景数据结构
 * PS:
 *      所有 类 创建时 不会调用 子属性的 构造函数，其子属性类型的实例 在 外部 创建后 附加给 类实例的子属性
 */

/**
 * 节点数据结构定义
 *      无前缀属性  节点在场景中生成模型节点所需使用的数据
 *      _ 前缀属性  为创建时为节点绑定的数据
 *      _f前缀属性  为组件节点创建时绑定的数据
 *      _t前缀属性  为节点 为 字符类型 时 使用的属性
 */
export class UINode {
    nodeName:   string;
    nodeType:   string;
    rayID:      number;
    width:      number;
    height:     number;
    rel_left:   number;
    rel_top:    number;
    rel_right:  number;
    rel_bottom: number;
    rel_z:      number;
    x:          number;
    y:          number;
    z:          number;
    x_scale:    number;
    y_scale:    number;
    z_scale:    number;
    x_rotate:   number;
    y_rotate:   number;
    z_rotate:   number;
    imageURL:   string;
    bgColor:    string;
    opacity:    number;
    text:       string;
    boxColloder:any;
    userData:   any;
    _matchData: any;
    _matchKey:  string;
    _json:      any;
    _render:    UINodeRender;
    _parent:    UINode;
    _root:      UINode;
    _children:  Array<UINode>;
    _listenCfg: any;
    _frame:     any;

    _t_font:        string;
    _t_size:        number;
    _t_scale:       number;
    _t_color:       string;
    _t_space:       number;
    _t_shadow:      string;
    _t_borderWidth: number;
    _t_borderColor: string;
    _t_strokeWidth: number;
    _t_strokeColor: string;
    _t_textAlign:   string;
    _t_isCommon:    boolean;
    _t_lineHeight:  number;

    _f_uiClass:     string;
    _f_dataMatch:   any;
    _f_nodeMap:     Map<string, UINode>;
    _f_frameData:   any;
    _f_states:      any;
    _f_tree:        any;
    _f_listenMap:   Map<number,Function>;
    _f_listenCfg:   any;
    _f_dataMatchCfg:any;
}

// ================================================
/**
 * 场景节点 渲染数据数据的 定位，旋转 缩放设置
 */
export class Transform {
    position:   Array<number>;
    scale:      Array<number>;
    rotate:     Array<number>;
    constructor(){
        this.position   = [0 ,0 ,0];
        this.scale      = [1, 1, 1];
        this.rotate     = [0, 0, 0];
    }
}
/**
 * 场景节点 渲染数据数据的 网格属性
 */
export class Geometry {
    width:      number;
    height:     number;
    type:       string;
}
/**
 * 场景节点 渲染数据数据的 纹理设置的 纹理属性 图片资源 设置
 */
export class MaterialMap {
    filter:             Array<number>;
    generateMipmaps:    boolean = false;
    image:              any;
}
/**
 * 场景节点 渲染数据数据的 纹理设置的 纹理属性
 */
export class Material {
    type:       string;
    transparent:boolean = false;
    layer:      number;
    color:      string;
    map:        MaterialMap;
    opacity:    number;
}
/**
 * 场景节点 渲染数据数据的 纹理设置
 */
export class MeshRender {
    material:   Material;
}
/**
 * 场景节点包围盒属性
 */
export class BoxColloder {
    min:        Array<number>;
    max:        Array<number>;
    constructor(){
        this.min    = [-0.5,-0.5,-0.5];
        this.max    = [0.5,0.5,0.5];
    }
}

export class TextCfg {
    font: string;
    space: number;
    color: string;
    hfactor: number;
    strokeWidth: number;
    strokeColor: string | GradientCfg;
    background: string | GradientCfg;
    isPowerOfTwo: boolean;
    textAlign: string;
    isCommon: boolean;
    text: string;
    lineHeight: number;
    zoomfactor:number;
    width: number;
    constructor(){
        this.font       = Font_Fonts[0];
        this.space      = -3;
        this.color      = "#ff0000";
        this.hfactor    = 1.2;
        this.strokeWidth= 0;
        this.strokeColor= "rgb(256,256,256)";
        this.isCommon   = false;
        this.text       = "";
        this.isPowerOfTwo   = true;
        this.width      = 32;
        this.zoomfactor = 1;
    }
}

export class TextCon {
    show: string;
    opacity: number;
    horizontalAlign: string;
    verticalAlign: string;
    textcfg: TextCfg;
    constructor(){
        this.show       = "";
        this.opacity    = 1;
        // this.horizontalAlign    = "left";
        // this.verticalAlign      = "top";
    }
}

export class FontShadow {
    offsetX: number;
    offsetY: number; //偏移量
    blur: number; // 模糊值，一般为5
    color: string; // 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
}

// 渐变配置， x1y1x2y2可以使用百分数，表示图像宽高度的百分比
export interface GradientCfg {
	x1: number, y1: number, r1?: number, // 渐变的起始位置及半径，不定义半径或半径为0，表示为线性渐变
	x2: number, y2: number, r2?: number, // 渐变的起始和结束位置，径向渐变
	steps: Array<number | string>; // steps为2个元素一组，第一个为0-1之间的数，第二个为颜色。比如：[0, "rgba(0,0,0,0.5)", 1, "#636363"]
};

//  ========================================
/**
 * 场景节点 渲染数据结构
 */
export class UINodeRender {
    _node:      any;
    renderType: string;
    renderName: string;
    rayID:      number;
    transform:  Transform;
    geometry:   Geometry;
    meshRender: MeshRender;
    boxColloder:BoxColloder
    children:   Array<any>;
    attachment: string;
    textCon:    TextCon;
    name:       string;
}

export const getFont = ( size: number, weight: number = 200 )=>{
    return `normal ${weight} ${size}px SimHei`;
}
