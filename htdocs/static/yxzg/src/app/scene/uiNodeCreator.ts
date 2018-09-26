/**
 * Date: 2018-08-08 11:00:00
 * Version: 0.1
 *      描述：
 *          实现 UI 节点/组件 构建模块
 * 
 *      功能：
 *          提供组件/节点：配置管理，创建销毁，数据绑定/更新，样式更新，监听绑定/响应 等接口
 * 
 * 说明：
 *      创建节点目的    创建一个在场景中显示的 渲染对象 (称为 渲染节点)
 * 
 *      创建节点过程    使用配置 创建 渲染节点所需数据对象 (称为 数据节点)
 *                     使用 数据节点 创建 渲染节点
 *                     渲染节点 绑定在 数据节点的 ._render  属性上，方便数据节点的获取
 *                     在场景中渲染 渲染节点 显示目标
 * 
 *      数据节点功能    数据节点 用来 创建 渲染节点，握住渲染节点的引用
 *                     节点更新时 先更新 数据节点属性，在使用更新后的属性值更新 渲染节点
 *                     数据节点 ._children 构建节点间的 父子关系，作为向下传递 父/根 节点的变化的依据
 *                     外部 业务代码 只需了解 数据节点，对数据节点进行操作 
 * 
 *      节点更新过程    数据节点更新接口 - (更新数据节点数据) - 渲染节点更新接口 - (更新渲染节点数据) - 场景渲染接口 - (更新节点渲染)
 */


import { nextPowerOfTwo, isPowerOfTwo } from '../../pi/util/math';

import * as UIEnum              from "./uiNodeEnum";
import { UINode }               from "./uiNodeBase";
import { UIToolFunc }           from "./uiNodeToolFunc";
import { UIFrameDataCtrl, UINodeDataCtrl }      from "./uiNodeDataCtrl";
import { UINodeRenderCtrl }     from "./uiNodeRenderCtrl";
import { UIListenerCtrl }       from "./uiNodeListenerCtrl";
import { FrameTemplateManage, _FrameTemplateMap }  from "./uiNodeTemplateMgr";

// ===================================== 
// Node 计数器
export let UINodeCounter = 1000000;
// Node rayID-Node  堆
export let _NodeRayIDMap: Map<number, UINode>   = new Map;

// =====================================
/**
 * UI (数据)节点 构建器
 */
export class UINodeCreator {
    /**
     * (数据)节点 创建： 
     *      节点json配置 到 数据节点
     *      会分配一个 rayID 供后续使用
     */
    static createNode = ( json: any )=>{
        let node: UINode;

        node    = UINodeCreator.createUINode( json );
        _NodeRayIDMap.set( node.rayID, node );

        return node;
    }
    /**
     * 创建 (渲染)节点 ：
     *      (数据)节点 到 (渲染)节点
     *      根据 数据节点 的各属性 创建一个场景渲染对象，并绑定到 数据节点 的 ._render
     * 
     */
    // static initUINodeRender  = ( node: UINode )=>{
        
    //     UINodeCreator.analyPosition( node );

    //     node._render = UINodeRenderCtrl.createRender( node );

    //     // if ( node._parent !== undefined ){
    //     //     node._parent._render.children.push( node._render );
    //     // }

    //     node._children.forEach( ele =>{
    //         UINodeCreator.initUINodeRender( ele );
    //     } );
    // }
    // static updateRenderTree = ( node: UINode )=>{
    //     if ( node._parent !== undefined ){
    //         node._parent._render.children.push( node._render );
    //     }

    //     node._children.forEach( ele =>{
    //         UINodeCreator.updateRenderTree( ele );
    //     } );
    // }
    /**
     * 根据 节点配置 生成 数据节点
     */
    private static createUINode = ( json: any )=>{
        let node: UINode;

        node            = new UINode;
        node._json      = json;

        node.rayID      = UINodeCounter++;
        node.nodeType   = json.nodeType;
        node.nodeName   = json.nodeName;
        node.imageURL   = json.imageURL;
        node.bgColor    = json.bgColor;
        node.opacity    = json.opacity === undefined ? 1 : json.opacity ;
        node.text       = json.text;
        node.height     = json.height;
        node.width      = json.width;
        node.boxColloder= json.boxColloder;
        node._children  = [];
        node._listenCfg = {};

        node.rel_left   = json.left;
        node.rel_top    = json.top;
        node.rel_right  = json.right;
        node.rel_bottom = json.bottom;
        node.rel_z      = json.z_relat;
        node.z          = json.z || 0;

        node._t_size    = json.font_size || UIEnum.Font_Fonts_Size[0];
        node._t_scale   = 1;
        node._t_color   = json.color;
        node._t_isCommon= json.isCommon;
        node._t_space   = json.font_space;
        node._t_font    = json.font;
        node._t_textAlign   = json.align       || "center";
        node._t_borderWidth = json.border_width;
        node._t_borderColor = json.border_color;
        node._t_lineHeight  = json.lineHeight;

        if ( json.rotate !== undefined ){
            node.x_rotate   = json.rotate[0]; 
            node.y_rotate   = json.rotate[1]; 
            node.z_rotate   = json.rotate[2]; 
        }
        if ( json.scale !== undefined ){
            node.x_scale    = json.scale[0]; 
            node.y_scale    = json.scale[1]; 
            node.z_scale    = json.scale[2]; 
        }
        
        // 字符节点 父节点无显示意义，width,height 属性无用
        // if ( node.type === UIEnum.UITypes[2] ){

        //     UINodeCreator.analyNodeFont( node );

        //     node.height         = node._t_size;
        //     node.width          = node._t_size * node.text.length;
        // }

        
        return node;
    }
    static initNodeAsFrame = ( frame: UINode )=>{
        frame._f_nodeMap    = new Map;
        frame._f_listenMap  = new Map;
        frame._f_tree       = frame._json.design;
        frame._f_uiClass    = frame._json.uiClass;
        frame._f_dataMatchCfg   = frame._json.dataMatch;
        frame._f_dataMatch      = {};
    }
    // private static analyNodeFont = ( node: UINode )=>{
    //     let size: number;

    //     size    =  node._t_size ;

    //     if ( !isPowerOfTwo(size) ){
    //         size            = nextPowerOfTwo( size );
    //         node._t_scale   = size / node._t_size;
    //         node._t_size    = size;
    //     }
    // }
    /**
     * 解析/计算 数据节点 定位属性
     */
    static analyPosition = ( node: UINode )=>{
        
        // 检查该节点是不是组件最外层
        if (node._parent !== undefined) {
            UINodeCreator.computeNodeLR( node );
            UINodeCreator.computeNodeTB( node );
        }

        UINodeCreator.computeNodeX( node );
        UINodeCreator.computeNodeY( node );
        UINodeCreator.computeNodeZ( node );
    }
    /**
     * 计算 数据节点 宽度属性
     */
    private static analyWidth = ( node: UINode )=>{
        if ( node.width === undefined ){
            node.width  = node._parent.width - node.rel_left - node.rel_right;
        }
    }
    /**
     * 计算 数据节点 高度属性
     */
    private static analyHeight = ( node: UINode )=>{
        if ( node.height === undefined ){
            node.height = node._parent.height - node.rel_top - node.rel_bottom;
        }
    }
    /**
     * 计算 数据节点 水平相对定位属性
     *      left, right 都设置的情况 认为 宽度需要计算
     */
    private static computeNodeLR = ( node: UINode )=>{
        let parentW: number;

        parentW     = node._parent.width;

        if ( node.rel_left !== undefined ){

            if ( node.rel_right  === undefined ) {
                node.rel_right  = parentW - node.rel_left - node.width;
            }else{
                UINodeCreator.analyWidth( node );
            }

        }else if ( node.rel_right !== undefined ){

            if ( node.rel_left  === undefined ) {
                node.rel_left   = parentW - node.rel_right - node.width;
            }else{
                UINodeCreator.analyWidth( node );
            }

        }else{
            throw new Error("computeNodeLR");
        }
    }
    /**
     * 计算 数据节点 垂直相对定位属性
     *      top, bottom 都设置的情况 认为 高度需要计算
     */
    private static computeNodeTB = ( node: UINode )=>{
        let parentH: number;

        parentH     = node._parent.height;
        
        if ( node.rel_top !== undefined ){

            if ( node.rel_bottom  === undefined ) {
                node.rel_bottom     = parentH - node.rel_top - node.height;
            }else{
                UINodeCreator.analyHeight( node );
            }

        }else if ( node.rel_bottom !== undefined ){

            if ( node.rel_top  === undefined ) {
                node.rel_top        = parentH - node.rel_bottom - node.height;
            }else{
                UINodeCreator.analyHeight( node );
            }

        }else{
            throw new Error("computeNodeLR");
        }
    }
    /**
     * 计算 数据节点 x 定位属性
     */
    private static computeNodeX = ( node: UINode )=>{
        node.x      = node.rel_left;
    }
    /**
     * 计算 数据节点 y 定位属性
     */
    private static computeNodeY = ( node: UINode )=>{
        node.y      = node.rel_top;
    }
    /**
     * 计算 数据节点 z 定位属性
     */
    private static computeNodeZ = ( node: UINode )=>{
        // node.z      = ( node._parent === undefined ? node.z : node._parent.z) + node.rel_z;
        node.z      = ( node._parent === undefined ? node.z : 0) + node.rel_z;
    }
    /**
     * 销毁 数据节点
     */
    static disposeNode = ( frame: UINode, node: UINode )=>{

        if ( frame !== undefined ){
            frame._f_nodeMap.delete( node.nodeName );
        }

        // node._children.forEach( ele => {

        //     if ( ele.nodeType === UIEnum.UITypes[3] ){
        //         UIFrameCreator.disposeFrame( frame, ele );
        //     }else{
        //         UINodeCreator.disposeNode( frame, ele );
        //     }
            
        // } );

        UINodeRenderCtrl.remove( node );
        UIListenerCtrl.removeNodeListen( node );
        _NodeRayIDMap.delete( node.rayID );

        delete node.nodeName   ;
        delete node.nodeType   ;
        delete node.rayID      ;
        delete node.width      ;
        delete node.height     ;
        delete node.rel_left   ;
        delete node.rel_top    ;
        delete node.rel_right  ;
        delete node.rel_bottom ;
        delete node.rel_z      ;
        delete node.x          ;
        delete node.y          ;
        delete node.z          ;
        delete node.x_scale    ;
        delete node.y_scale    ;
        delete node.z_scale    ;
        delete node.x_rotate   ;
        delete node.y_rotate   ;
        delete node.z_rotate   ;
        delete node.imageURL   ;
        delete node.bgColor    ;
        delete node.text       ;
        delete node.boxColloder;
        delete node.userData   ;
        delete node.opacity    ;
        delete node._json      ;
        delete node._render    ;
        delete node._parent    ;
        delete node._root      ;
        delete node._children  ;
        delete node._matchData ;
        delete node._matchKey  ;
        delete node._listenCfg ;
        
        delete node._t_font         ;
        delete node._t_size         ;
        delete node._t_scale        ;
        delete node._t_color        ;
        delete node._t_space        ;
        delete node._t_shadow       ;
        delete node._t_borderWidth  ;
        delete node._t_borderColor  ;
        delete node._t_strokeWidth  ;
        delete node._t_strokeColor  ;
        delete node._t_textAlign    ;
        delete node._t_isCommon     ;

        delete node._f_dataMatch;
        delete node._f_dataMatchCfg;
        delete node._f_frameData;
        delete node._f_listenCfg;
        delete node._f_listenMap;
        delete node._f_nodeMap;
        delete node._f_states;
        delete node._f_tree;
        delete node._f_uiClass;
    }
}


/**
 * UI (数据)组件   构建器
 */
export class UIFrameCreator {
    /**
     * 根据组件 原始配置&使用时传入配置 创建 数据组件
     */
    // static createFrame = ( parent: UINode, frameName: string,frameClass: string, data: any, jsonOut: any )=>{
    //     let frame: UINode;

    //     jsonOut = jsonOut === undefined ? {} : jsonOut ;
    //     jsonOut.nodeName    = frameName;

    //     frame = UIFrameCreator.createFrameData( parent, frameClass, data, jsonOut );

    //     // 初始化各节点数据绑定
    //     UIFrameDataCtrl.initDataMatch( frame );
    //     // 更新各节点数据的解析
    //     UIFrameDataCtrl.updateFrame( frame );
    //     // 设置节点监听
    //     UIListenerCtrl.analyListenCfg( frame );

    //     return frame;
    // }
    /**
     * 根据组件 原始配置&使用时传入配置 创建 数据组件
     */
    // private static createFrameData = ( parent: UINode, frameClass: string, data: any, jsonOut: any )=>{
    //     let frame: UINode, jsonSelf: any, json;

    //     jsonSelf    = FrameTemplateManage.read( frameClass );
    //     // 外部调用者传入的配置属性 覆盖源配置属性
    //     json        = UIToolFunc.mergeJson( jsonSelf, jsonOut );
    //     frame       = UINodeCreator.createNode( json );

    //     // frame._f_states     = json.states;
    //     frame._f_dataMatch  = json.dataMatch;
    //     frame._f_frameData  = data;
    //     frame._f_nodeMap    = new Map;
    //     frame._f_tree       = json.design;
    //     frame._f_listenMap  = new Map;
    //     frame._f_listenCfg  = json.listen;
    //     frame._f_uiClass    = json.uiClass;

    //     frame._parent       = parent;
    //     frame._root         = frame;

    //     UIFrameCreator.createNodes( frame, json );
    //     UIFrameCreator.initFrameTree( frame, json.design );
    //     return frame;
    // }
    /**
     * 创建 数据组件下 数据节点
     */
    // private static createNodes = ( frame: UINode, json: any )=>{

    //     json.nodes.forEach( eleJson => {
    //         let node: UINode;

    //         // 区别处理 组件节点 与 普通节点
    //         if ( eleJson.nodeType === UIEnum.UITypes[3] ){
    //             let frameName: string, frameClass: string, matchData: any;

    //             frameName   = eleJson.nodeName;
    //             frameClass  = eleJson.uiClass;
    //             matchData   = UIFrameDataCtrl.readNodeMatchData( frame, frameName );
    //             node        = UIFrameCreator.createFrameData( frame, frameClass, matchData, eleJson );

    //         }else{

    //             node    = UINodeCreator.createNode( eleJson );
                
    //         }

    //         frame._f_nodeMap.set( node.nodeName, node );

    //     } );
    // }
    /**
     * 初始化 组件节点树关系
     */
    // static initFrameTree  = ( parent: UINode, jsonTree: any )=>{
    //     for ( let nodeName in jsonTree ){
    //         let chilNode: UINode;

    //         chilNode            = parent._root._f_nodeMap.get( nodeName );
    //         UIFrameCreator.addNodeToParent( parent, chilNode );

    //         // 非叶子节点 的处理
    //         if ( jsonTree[nodeName] !== true ){
    //             UIFrameCreator.initFrameTree( chilNode, jsonTree[nodeName] );
    //         }
    //     }
    // }
    // static addNodeToParent = ( parent: UINode, child: UINode )=>{
    //     child._parent    = parent;
    //     child._root      = parent._root;
    //     parent._children.push( child );
    // }
    // static renderFrame = ( frame: UINode )=>{
    //     UINodeCreator.initUINodeRender( frame );
    //     UINodeCreator.updateRenderTree( frame );
    //     UINodeRenderCtrl.renderNode( frame );
    // }
    /**
     * 销毁  (数据)组件
     */
    // static disposeFrame = ( parent: UINode, frame: UINode )=>{
        
    //     // UIListenerCtrl.clearFrameListen( frame );

    //     frame._children.forEach( node => {
    //         // 组件节点 与 普通节点 区别处理
    //         if ( node.nodeType === UIEnum.UITypes[3] ){
    //             UIFrameCreator.disposeFrame( parent, node );
    //         }else{
    //             UINodeCreator.disposeNode( frame, node );
    //         }
            
    //     } );
        
    //     frame._children.length  = 0;

    //     UINodeCreator.disposeNode( parent, frame );

    //     frame._f_nodeMap.clear();
    //     frame._f_listenMap.clear();
        
    //     delete frame._f_dataMatch   ;
    //     delete frame._f_nodeMap     ;
    //     delete frame._f_frameData   ;
    //     // delete frame._f_states      ;
    //     delete frame._f_tree        ;
    //     delete frame._f_listenMap   ;
    //     delete frame._f_listenCfg   ;

    // }
    /**
     * 打开组件
     */
    // static open = ( parent: UINode, frameName: string, frameClass: string, data: any, jsonOut: any )=>{
    //     let frame: UINode;

    //     frame   = UIFrameCreator.createFrame( parent, frameName, frameClass, data, jsonOut );

    //     UIFrameCreator.renderFrame( frame );

    //     return frame;
    // }
    /**
     * 关闭组件
     */
    // static close = ( frame: UINode )=>{
    //     // 清除数据
    //     UIFrameCreator.disposeFrame( undefined, frame );
    //     // 移除场景
    //     UINodeRenderCtrl.remove( frame );
    // }
    
    /**
     * 根据组件 原始配置&使用时传入配置 创建 数据组件
     */
    static initFrame = ( frame: UINode )=>{

        frame._f_nodeMap    = new Map;
        frame._f_listenMap  = new Map;
        frame._f_tree       = frame._json.design;
        frame._f_uiClass    = frame._json.uiClass;

        return frame;
    }
}

// export class UICreator {
//     static create = ( parent: UINode, uiName: string, json: any, json2: any )=>{
//         let node: UINode, _json: any;

//         _json   = UIToolFunc.mergeJson( json, json2 );
//         // 初始化 节点属性
//         node                = UINodeCreator.createNode( _json );
//         node.nodeName       = uiName;

//         if ( parent !== undefined ){
//             node._parent    = parent;
//             node._root      = parent._root;
//         }else{
//             node._root      = node;
//         }

//         // 初始化 节点组件属性
//         if ( _json.nodes !== undefined && _json.nodes.length > 0 ){
//             node._root      = node;
//             UIFrameCreator.initFrame( node );
//             UICreator.creatNodes( node );
//             UIFrameCreator.initFrameTree( node, node._f_tree );
//         }

//         return node;
//     }
//     static render = ( node: UINode )=>{
//         UINodeCreator.initUINodeRender( node );
//         UINodeCreator.updateRenderTree( node );
//         UINodeRenderCtrl.renderNode( node );
//     }
//     static updateBindData = ( node: UINode, data: any )=>{
//         UINodeDataCtrl.update( node, data );
//     }
//     static updateBindLinstens = ( node: UINode, listenCfgs: Array<UIListenCfg> )=>{
//         listenCfgs.forEach( cfg => {
//             UICreator.updateBindLinsten( node, cfg );
//         } );
//     }
//     static updateBindLinsten = ( node: UINode, listenCfg: UIListenCfg )=>{
//         node._listenCfg[ listenCfg.type ]  = [ listenCfg.func, listenCfg.spread ];

//         UIListenerCtrl.setListen( node, listenCfg.type, listenCfg.func, listenCfg.spread );
//     }
//     static removeBindLinsten = ( node: UINode, listenType: string )=>{
//         delete node._listenCfg[ listenType ];

//         UIListenerCtrl.removeNodeTypeListen( node.rayID, listenType );
//     }
//     static readNodeByName = ( frame: UINode, nodeName: string )=>{
//         return frame._f_nodeMap.get( nodeName );
//     }
//     static close = ( node: UINode )=>{

//     }
//     private static creatNodes = ( frame: UINode )=>{
//         frame._json.nodes.forEach( json => {
//             let node: UINode;

//             if ( json.nodeType === UIEnum.UITypes[3] ){
//                 node        = UICreator.create( frame, json.nodeName, readUIJson( json.uiClass ), json );
//             }else{
//                 node        = UICreator.create( frame, json.nodeName, json, undefined );
//             }

//             frame._children.push( node );
//             frame._f_nodeMap.set( node.nodeName, node );

//         } );
        
//     }
// }

// // =========================================接口

// export class UINodeAPI {
    
//     static updateNodeWithDataName = ( frame: UINode, dataLongKey: string )=>{
//         UIFrameDataCtrl.updateWithDataName( frame, dataLongKey );
//     }
    
//     static updateFrame = ( frame: UINode )=>{
//         UIFrameDataCtrl.updateFrame( frame )
//     }
    
//     static updateNodeWithName = ( frame: UINode, nodeName: string, data: any )=>{
//         UIFrameDataCtrl.updateWithNodeName( frame, nodeName, data );
//     }
    
//     static removeNodeByName = ( frame: UINode, nodeName: string )=>{
//         let node: UINode;
    
//         node    = frame._f_nodeMap.get( nodeName );
    
//         UINodeAPI.removeNode( frame, node );
//     }
    
//     static removeNode = ( frame: UINode, node: UINode )=>{

//         for ( let i=frame._children.length-1; i>=0; i-- ){
//             if (frame._children[i].rayID === node.rayID){
//                 frame._children.splice( i, 1 );
//                 break;
//             }
//         }

//         if ( node.nodeType  === UIEnum.UITypes[3] ){
//             UIFrameCreator.disposeFrame( frame, node );
//         }else{
//             UINodeCreator.disposeNode( frame, node );
//         }
    
//         frame._f_nodeMap.delete( node.nodeName );
//     }
//     static createNodeForFrame = ( frame: UINode, nodeName: string, json: any, jsonOut: any, data: any )=>{
//         let node: UINode, nodeJson: any;
    
//         if ( frame === undefined ){
//             throw new Error( "frame 未创建。" );
//         }

//         if ( json.nodeType === UIEnum.UITypes[3] ){
//             node    = UIFrameCreator.createFrame( frame, nodeName, json.uiClass, data, jsonOut );
//         }else{
//             nodeJson= UIToolFunc.mergeJson( json, jsonOut );
//             node    = UINodeCreator.createNode( nodeJson );
//         }
    
//         UIFrameCreator.addNodeToParent( frame, node );
//         UINodeCreator.initUINodeRender( node );
//         UINodeCreator.updateRenderTree( node );
//         UINodeRenderCtrl.renderNode( node );
//         UINodeRenderCtrl.updateChildParent( frame, node );
//         // frame._children.push( node );
//         frame._f_nodeMap.set( node.nodeName, node );
    
//         return node;
//     }
    
//     static setNodeListener = ( node: UINode, json: any )=>{
//         for ( let type in json ){
//             node._listenCfg[ type ] = json[ type ];
//             UIListenerCtrl.setListen( node, type, json[type][0], json[type][1] );
//         }
//     }
// }


export const recordUIJson = ( frameClass: string, json: any )=>{
    FrameTemplateManage.record( frameClass, json );
}

export const readUIJson = ( frameClass: string )=>{
    return FrameTemplateManage.read( frameClass );
}

// ==========================================数据结构

export class UIDataImage {
    imageURL: string;
    constructor( path?: string ){
        this.imageURL   = path;
    }
}

export class UIDataText {
    text: string;
    constructor( text?: string ){
        this.text       = text;
    }
}

export class UIDataColor {
    bgColor: string;
    constructor( bgColor?: string ){
        this.bgColor    = bgColor;
    }
}

export class UIDataOpacity {
    opacity: number;
    constructor( opacity?: number ){
        this.opacity    = opacity;
    }
}

export class UIDataState {
    state: UIDataStateDetail;
    constructor( state?: any ){
        this.state      = new UIDataStateDetail;
        if ( state !== undefined ){

            UIEnum.StatePositionKeys.forEach( key => {
                if (state[key] !== undefined){
                    this.state[key]     = state[key];
                }
            } );

            UIEnum.StateScaleKeys.forEach( key => {
                if (state[key] !== undefined){
                this.state[key]     = state[key];
                }
            } );

            UIEnum.StateRotateKeys.forEach( key => {
                if (state[key] !== undefined){
                this.state[key]     = state[key];
                }
            } );
            
        }
    }
}

export class UIDataStateDetail {
    left: number;
    top: number;
    right: number;
    bottom: number;
    z_relat: number;
    scale: Array<number>;
    rotate: Array<number>;
}

export class UIListenCfg {
    type: string;
    func: Function;
    spread: boolean;
    constructor( type: string, f: Function, spread?: boolean ){
        this.type   = type;
        this.spread = spread;
        this.func   = f;
    }
}





// 传入 配置的目标节点 的组件 frame 、 目标节点名称 nodeName 、 配置原始配置 jsonOrg 、 配置更改配置 jsonNew
    // 合并 原始配置 与 更改配置为 jsonCur
    // 根据配置初始化 node 属性 

    // 如果 配置中说明节点为 FRAME 类型，根据 配置初始化属于 FRAME类型的 属性
    // 此处会 形成递归 创建，
        // 如果 配置中有 nodes, 遍历其中 配置，创建节点，

        // 创建的节点 放入 node 的 node列表

    // 创建的节点 设置 _frame 指向 frame


// 组件 各节点的属性初始化结束后，处理组件 树结构
    // frame._tree 遍历 key
    // 通过 key 从 frame._nodeMap 读取 节点 node ，设置 node 节点 _parent 为 frame
        // 读取 frame._tree[key]，
        // 如果不为 true 遍历 该字符串数组， 
            // 每个 string 从 frame_nodeMap 读取 节点 node1 ，设置节点 _parent 为 node
        // 如果 节点类型为 FRAME 调用函数本身传入 该节点 处理该节点树结构


// 树结构创建后，处理数据绑定配置
    // frame._dataMatchCfg 遍历 key
    // 通过 key 从 frame._nodeMap 读取 节点 node ，设置 node 节点 _dataKey 为 frame._dataMatch[key]
    // frame._dataMatch[ dataKEY ] = node
        // 如果 节点类型为 FRAME 调用函数本身传入 该节点 处理该节点数据绑定


// 数据绑定处理过后， 绑定数据应用  节点 - 数据
    // 节点 _data = 数据
    // 更新数据的应用
    // 如果 节点类型为 FRAME
        // 遍历 节点._dataMatch [ dataKey, node ]
        // 通过 dataKey 获取 nodeData
        // 调用自身， 传入 node, nodeData


// 数据绑定应用后， 创建渲染目标
    // 遍历 node map, 为各节点 创建 _render
        // 如果 节点类型为  FRAME 调用自身 传入 节点


// 渲染目标创建后， 构建渲染树结构
    // 遍历 nodeMap,
        // 设置 node._render.parent = node._parent._render
        // 如果 节点类型为 FRAME 调用自身传入 node
        

// 渲染树创建后， 执行渲染.


// 节点初始化后， 设置节点监听  [ node, type, func, spred ]
    // node.listenCfg[ type ] = [ func, spred ]
    // 如果节点类型为 FRAME 
        // 遍历 nodeMap 为 各子节点 调用自身， 插入 [ 子节点，type, func, spred  ]
    // 如果 spread !== false
        // node.frame._tree 查找 该节点 子节点， 调用自身 ， 插入 [ 子节点，type, func, spred  ]


// 指定 节点 插入 新节点， [ 目标节点, 新节点名称， 新节点配置， 新节点数据 ]
    // 获取 目标 frame
        // 目标节点 类型 是否为 FRAME
    // 初始化节点 [ frame, 新节点名称， 新节点配置， 新节点数据 ]
    // 构建树结构
        // 如果节点类型 为 FRAME , 构建节点 树结构
        // 节点._parent = frame
    // 数据绑定
        // 如果节点类型 为 FRAME 处理节点内数据绑定配置
    // 绑定数据应用  [ 节点， 数据 ]
    // 创建渲染目标
    // 构建渲染树结构
    // 设置 节点._render.parent = node._parent._render
    // 渲染节点

// // 指定节点 监听绑定 [ node, type, func, spred ]


// 移除 指定节点 [ 目标节点 ]  (动态加入的节点。非动态加入的节点应该通过 visible 来表现移除 )
    // 节点.frame._f_nodemap delete
    // 如果节点类型 为 FRAME
        // 遍历 nodeMap 调用自身 传入 子节点
    // 移除 监听
    // 从 父 渲染目标移除 渲染目标
    // 从场景 移除 渲染目标
    // 销毁节点


