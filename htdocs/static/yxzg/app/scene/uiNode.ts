import { UIToolFunc }           from "./uiNodeToolFunc";
import { UITypes, 
        StatePositionKeys, StateScaleKeys, 
        StateRotateKeys }       from "./uiNodeEnum";
import { UINode }               from "./uiNodeBase";
import { UINodeDataCtrl }       from "./uiNodeDataCtrl";
import { UINodeRenderCtrl }     from "./uiNodeRenderCtrl";
import { UIListenerCtrl }       from "./uiNodeListenerCtrl";
import { UINodeCreator }        from "./uiNodeCreator";
import { FrameTemplateManage }  from "./uiNodeTemplateMgr";

export const Z_ORDERS = {
    "FIGHT" : 0,
    "MAIN"  : 1000,
    "POP"   : 3000
}

export class UINodeCtrl {

    static openFrame = ( 
            { frameClass, nodeName, jsonNew, data } : 
            { frameClass: string, nodeName: string, jsonNew: any, data: any } )=>{

        let jsonOrg: any, frame: UINode;
        jsonOrg = readUIJson( frameClass );

        frame   = UINodeCtrl.creatNode( { 
                    frame: undefined, 
                    nodeName: nodeName, 
                    jsonOrg: jsonOrg, 
                    jsonNew: jsonNew
                } );

        // 如果节点类型 为 FRAME , 构建节点 树结构
        UINodeCtrl.buildFrameTree( frame );

        // 如果节点类型 为 FRAME 处理节点内数据绑定配置
        UINodeCtrl.analyDataMatchCfg( frame );

        // 绑定数据应用  [ 节点， 数据 ]
        UINodeCtrl.updateNodeData( frame, data );

        // 创建渲染目标
        UINodeCtrl.createNodeRender( frame );

        // 构建渲染树结构
        UINodeCtrl.buildRenderTree( frame );
        
        // 渲染节点
        UINodeCtrl.renderNode( frame );

        return frame;
    }
        
    // 传入 配置的目标节点 的组件 frame 、 目标节点名称 nodeName 、 配置原始配置 jsonOrg 、 配置更改配置 jsonNew
    static creatNode = ( 
            {frame, nodeName, jsonOrg, jsonNew}:
            {frame: UINode, nodeName: string, jsonOrg: any, jsonNew: any} )=>{

        let jsonCur: any, node: UINode;

        // 合并 原始配置 与 更改配置为 jsonCur
        jsonCur     = UIToolFunc.mergeJson( jsonOrg, jsonNew );
        // 根据配置初始化 node 属性 
        node        = UINodeCreator.createNode( jsonCur );
        node.nodeName   = nodeName;
        // 如果 配置中说明节点为 FRAME 类型，根据 配置初始化属于 FRAME类型的 属性
        if ( node.nodeType === UITypes[3] ){
        // 此处会 形成递归 创建，
            UINodeCreator.initNodeAsFrame( node );
            if ( node._json.nodes && node._json.nodes.length > 0 ){
                // 如果 配置中有 nodes, 遍历其中 配置，创建节点，
                node._json.nodes.forEach( json => {
                    // 创建的节点 放入 node 的 node列表
                    let child: UINode;
                    if ( node.nodeType === UITypes[3] ){
                        child   = UINodeCtrl.creatNode( { 
                                    frame: node, 
                                    nodeName: json.nodeName, 
                                    jsonOrg: readUIJson( json.uiClass ), 
                                    jsonNew: json
                                } );
                    }else{
                        child   = UINodeCtrl.creatNode({ 
                                    frame: node, 
                                    nodeName: json.nodeName, 
                                    jsonOrg: readUIJson( json.uiClass ), 
                                    jsonNew: undefined
                                } );
                    }
                    node._f_nodeMap.set( child.nodeName, child );
                });
            }

        }

        // 创建的节点 设置 _frame 指向 frame
        node._frame     = frame;

        return node;
    }


    // 组件 各节点的属性初始化结束后，处理组件 树结构
    static buildFrameTree = ( frame: UINode )=>{
        let node: UINode, tempArr: any;
        // frame._tree 遍历 key
        for ( let nodeName in frame._f_tree ){
            
            // 通过 key 从 frame._nodeMap 读取 节点 node ，设置 node 节点 _parent 为 frame
            node            = frame._f_nodeMap.get( nodeName );
            node._parent    = frame;
            // 读取 frame._tree[key]，
            // 如果不为 true 遍历 该字符串数组，
            tempArr         = frame._f_tree[ nodeName ];
            if ( tempArr !== true ){
                tempArr.forEach( childName => {
                    let child: UINode;
                    // 每个 string 从 frame_nodeMap 读取 节点 node1 ，设置节点 _parent 为 node
                    child           = frame._f_nodeMap.get( childName );
                    child._parent   = node;
                    // 如果 节点类型为 FRAME 调用函数本身传入 该节点 处理该节点树结构
                    if ( child.nodeType === UITypes[3] ){
                        UINodeCtrl.buildFrameTree( child );
                    }
                } );
            }else{
                // 如果 节点类型为 FRAME 调用函数本身传入 该节点 处理该节点树结构
                if ( node.nodeType === UITypes[3] ){
                    UINodeCtrl.buildFrameTree( node );
                }
            }

        }
    }


    // 树结构创建后，处理数据绑定配置
    static analyDataMatchCfg = ( frame: UINode )=>{
        let node: UINode, dataKey: string;
        // frame._dataMatchCfg 遍历 key
        for ( let nodeName in frame._f_dataMatchCfg ){
            // 通过 key 从 frame._nodeMap 读取 节点 node ，设置 node 节点 _dataKey 为 frame._dataMatch[key]
            node    = frame._f_nodeMap.get( nodeName );
            dataKey = frame._f_dataMatchCfg[ nodeName ];

            frame._f_dataMatch[ dataKey ] = node

            // 如果 节点类型为 FRAME 调用函数本身传入 该节点 处理该节点数据绑定
            if ( node.nodeType === UITypes[3] ){
                UINodeCtrl.analyDataMatchCfg( node );
            }
            
        }

    }

    // 数据绑定处理过后， 绑定数据应用  节点 - 数据
    static updateNodeData = ( node: UINode, data: any )=>{

        // 更新数据的应用
        UINodeDataCtrl.update( node, data );

        // // 如果 节点类型为 FRAME
        // if ( node.nodeType === UITypes[3] ){
        //     // 遍历 节点._dataMatch [ dataKey, node ]
        //     for ( let dataKey in node._f_dataMatch ){
        //         let tempData: any;

        //         // 通过 dataKey 获取 nodeData
        //         tempData    = UIToolFunc.readDataWithLongKey( node._matchData, dataKey );

        //         // 调用自身， 传入 node, nodeData
        //         UINodeCtrl.updateNodeData( node._f_dataMatch[ dataKey ], tempData );
        //     }
        // }
        
    }


    // 数据绑定应用后， 创建渲染目标
    static createNodeRender = ( node: UINode )=>{

        UINodeCreator.analyPosition( node );
        UINodeRenderCtrl.createRender( node );

        // 如果 节点类型为  FRAME 
        // 遍历 node map, 为各节点 创建 _render
        if ( node.nodeType === UITypes[3] ){
            node._f_nodeMap.forEach( child => {
                UINodeCtrl.createNodeRender( child );
            } )
        }
        
    }


    // 渲染目标创建后， 构建渲染树结构
    static buildRenderTree = ( node: UINode )=>{

        if ( node._parent !== undefined && node._parent._render !== undefined ){
            node._parent._render.children.push( node._render );
        }

        // 如果 节点类型为 FRAME 调用自身传入 node
        // 遍历 nodeMap,
        if ( node.nodeType === UITypes[3] ){
            node._f_nodeMap.forEach( child => {
                UINodeCtrl.buildRenderTree( child );
            } );
        }
    }
            

    // 渲染树创建后， 执行渲染.
    static renderNode = ( node: UINode )=>{
        UINodeRenderCtrl.renderNode( node );
        return node;
    }


    // 节点初始化后， 设置节点监听  [ node, type, func, spread ]
    static setNodeListener = ( node: UINode, cfg: UIListenCfg )=>{
        let childArr: any;

        node._listenCfg[ cfg.type ] = [ cfg.func, cfg.spread ];
        UIListenerCtrl.setListen( node, cfg.type, cfg.func, cfg.spread )

        // 如果节点类型为 FRAME 
        if ( node.nodeType === UITypes[3] ){
            // 遍历 nodeMap 为 各子节点 调用自身， 插入 [ 子节点，type, func, spread  ]
            node._f_nodeMap.forEach( child => {
                UINodeCtrl.setNodeListener( child, cfg );
            } );
        }else{
            // 如果 spread !== false
            if ( cfg.spread !== false ){
                // node.frame._tree 查找 该节点 子节点， 调用自身 ， 插入 [ 子节点，type, func, spread  ]
                if ( node._frame._f_tree[ node.nodeName ] !== true ){
                    childArr = node._frame._f_tree[ node.nodeName ];
                    if ( childArr !== undefined && childArr !== true  ){
                        (childArr as Array<string> ).forEach( nodeName => {
                            UINodeCtrl.setNodeListener( node._frame._f_nodeMap.get( nodeName ), cfg );
                        } );
                    }
                }
            }
        }

        return node;
    }

    static setFrameNodeListener  = ( frame: UINode, nodeName: string, cfg: UIListenCfg )=>{
        let node: UINode;

        node    = frame._f_nodeMap.get( nodeName );
        UINodeCtrl.setNodeListener( node, cfg );

        return node;
    }


    // 指定 节点 插入 新节点， [ 目标节点, 新节点名称， 新节点配置， 新节点数据 ]
    static appendNode = ( 
            {parent, nodeName, jsonOrg, jsonNew, data}:
            {parent: UINode, nodeName: string, jsonOrg: any, jsonNew: any, data: any} )=>{
                
        let frame: UINode, node: UINode, json: any;

        if ( nodeName == "" ){
            throw new Error( `need nodeName .` );
        }
        json    = UIToolFunc.mergeJson( jsonOrg, jsonNew );
        // 获取 目标 frame
        frame   = parent;
        // 目标节点 类型 是否为 FRAME
        if ( parent.nodeType !== UITypes[3] ){
            frame       = parent._frame;
        }
        // 初始化节点 [ frame, 新节点名称， 新节点配置， 新节点数据 ]
        node    = UINodeCtrl.creatNode( {
                    frame: frame, 
                    nodeName: nodeName, 
                    jsonOrg: json, 
                    jsonNew: undefined
                } );

        // 构建树结构
        node._parent   = frame;
        if ( node.nodeType === UITypes[3] ){
            // 如果节点类型 为 FRAME , 构建节点 树结构
            UINodeCtrl.buildFrameTree( node );

            // 如果节点类型 为 FRAME 处理节点内数据绑定配置
            UINodeCtrl.analyDataMatchCfg( node );
        }

        // 绑定数据应用  [ 节点， 数据 ]
        UINodeCtrl.updateNodeData( node, data );

        // 创建渲染目标
        UINodeCtrl.createNodeRender( node );

        // 构建渲染树结构
        UINodeCtrl.buildRenderTree( node );
        
        // 渲染节点
        UINodeCtrl.renderNode( node );

        return node;
    }



    // 移除 指定节点 [ 目标节点 ]  (动态加入的节点。非动态加入的节点应该通过 visible 来表现移除 )
    static removeNode = ( node: UINode )=>{

        node._render.children.length   = 0;

        // 如果节点类型 为 FRAME
        if ( node.nodeType === UITypes[3] ){
            // 遍历 nodeMap 调用自身 传入 子节点
            node._f_nodeMap.forEach( child => {
                UINodeCtrl.removeNode( child );
            } ) ;
        }

        // 移除 监听
        // UIListenerCtrl.removeNodeListen( node );

        // 从 父 渲染目标移除 渲染目标

        
        // 从场景 移除 渲染目标
        // UINodeRenderCtrl.remove( node );

        // 销毁节点
        UINodeCreator.disposeNode( node._frame, node );

        return node;
    }

    static removeNodeByName = ( frame: UINode, nodeName: string )=>{
        let node: UINode;

        node    = UINodeCtrl.readNodeByName( frame, nodeName );
        UINodeCtrl.removeNode( node );
    }
    
    static readNodeByName = ( frame: UINode, nodeName: string )=>{
        return frame._f_nodeMap.get( nodeName );
    }

    static updateNodeWithName = ( frame: UINode, nodeName: string, data: any )=>{
        let node: UINode;

        node    = UINodeCtrl.readNodeByName( frame, nodeName );
        UINodeCtrl.updateNodeData( node, data );
        return node;
    }
}


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

            StatePositionKeys.forEach( key => {
                if (state[key] !== undefined){
                    this.state[key]     = state[key];
                }
            } );

            StateScaleKeys.forEach( key => {
                if (state[key] !== undefined){
                this.state[key]     = state[key];
                }
            } );

            StateRotateKeys.forEach( key => {
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