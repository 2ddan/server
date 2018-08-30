
import * as UIEnum                  from "./uiNodeEnum";
import { UINode }                   from "./uiNodeBase";
import { UINodeRenderCtrl }         from "./uiNodeRenderCtrl";
import { UINodeStateCtrl }          from "./uiNodeStateCtrl";
import { UIToolFunc }               from "./uiNodeToolFunc";

/**
 * UI (数据)节点 数据管理器
 */
export class UINodeDataCtrl {
    /**
     * 设置 数据节点 的 绑定数据
     */
    static setMacthData = ( node: UINode, dataName: string, data: any )=>{
        node._matchData = data;
        node._matchKey  = dataName;
    }
    /**
     * 数据节点 的 数据更新 
     */
    static update = ( node: UINode, data: any )=>{
         
        node._matchData = UIToolFunc.mergeJson( node._matchData, data );

        for ( let key in data ){
            switch (key) {
                case UIEnum.MatchDataKeys[0] : {
                    UINodeDataCtrl.update_imgeURL( node, data[key] );
                    break;
                }
                case UIEnum.MatchDataKeys[1] : {
                    UINodeDataCtrl.update_bgColor( node, data[key] );
                    break;
                }
                case UIEnum.MatchDataKeys[2] : {
                    UINodeDataCtrl.update_opacity( node, data[key] );
                    break;
                }
                case UIEnum.MatchDataKeys[3] : {
                    UINodeDataCtrl.update_text( node, data[key] );
                    break;
                }
                case UIEnum.MatchDataKeys[4] : {
                    UINodeStateCtrl.update( node, data[key] );
                    break;
                }
                // 说明node 应该为组件,但不应该在此处更新，应在 UIFrameDataCtrl.updateFrame 中被更新
                default:{
                    // throw new Error( "UINodeDataCtrl update." )
                    
                    if ( node.nodeType === UIEnum.UITypes[3] ){

                        node._f_frameData   = data;
                        UIFrameDataCtrl.updateFrame( node );
                    }

                }
            }
        }
    }
    static update_imgeURL = ( node: UINode, data: string )=>{

        node.imageURL   = data;

        if ( node._render !== undefined ){
            UINodeRenderCtrl.update_image( node );
        }
    }
    static update_bgColor = ( node: UINode, data: string )=>{

        node.bgColor   = data;

        if ( node._render !== undefined ){
            UINodeRenderCtrl.update_bgColor( node );
        }
    }
    static update_opacity = ( node: UINode, data: number )=>{

        node.opacity   = data;

        if ( node._render !== undefined ){
            UINodeRenderCtrl.update_opacity( node );
        }
    }
    static update_text = ( node: UINode, data: string )=>{

        node.text   = data;

        if ( node._render !== undefined ){
            UINodeRenderCtrl.update_text( node );
        }
    }
}


/**
 * UI (数据)组件 数据管理器
 */
export class UIFrameDataCtrl {
    /**
     * 初始化 组件数据绑定
     */
    static initDataMatch = ( frame: UINode )=>{
        let node: UINode, data: any;

        for (let nodeName in frame._f_dataMatch ) {
            node    = frame._f_nodeMap.get( nodeName );
            data    = UIFrameDataCtrl.readNodeMatchData( frame, nodeName );
            // 组件节点 与 普通节点 区别处理
            if ( node.nodeType === UIEnum.UITypes[3] ){

                UIFrameDataCtrl.initDataMatch( node );

            }else{

                UINodeDataCtrl.setMacthData( node, frame._f_dataMatch[nodeName], data );

            }
        }
    }
    /**
     * 获取 组件 下 子节点 绑定的数据
     */
    static readNodeMatchData = ( frame: UINode, nodeName: string )=>{
        return UIToolFunc.readDataWithLongKey( frame._f_frameData, frame._f_dataMatch[nodeName] ) ;
    }
    /**
     * 通过  数据路径 更新数据
     */
    static updateWithDataName = ( frame: UINode, longKey: string )=>{
    
        for (let nodeName in frame._f_dataMatch ){

            if ( frame._f_dataMatch[nodeName] === longKey ){
                let data: any;

                data = UIToolFunc.readDataWithLongKey( frame._f_frameData, longKey );
                UIFrameDataCtrl.updateWithNodeName( frame, nodeName, data );
                break;

            }

        }

    }
    /**
     * 通过  节点名称 更新数据
     */
    static updateWithNodeName = ( frame: UINode, nodeName: string, data: any )=>{
        let node: UINode;
        
        node    = frame._f_nodeMap.get( nodeName );

        // if ( node.nodeType === UIEnum.UITypes[3] ){

        //     node._f_frameData   = UIToolFunc.readDataWithLongKey( frame._f_frameData, frame._f_dataMatch[nodeName] );
        //     UIFrameDataCtrl.updateFrame( node );

        // }else{

            // node._matchData     = UIToolFunc.readDataWithLongKey( frame._f_frameData, frame._f_dataMatch[nodeName] );
            UINodeDataCtrl.update( node, data );

        // }

    }
    /**
     * 更新 组件 的绑定数据
     */
    static updateFrame = ( frame: UINode )=>{

        for ( let nodeName in frame._f_dataMatchCfg ){
            let data: any, node: UINode;

            data = UIToolFunc.readDataWithLongKey( frame._matchData, frame._f_dataMatchCfg[nodeName] );
            UIFrameDataCtrl.updateWithNodeName( frame, nodeName, data );

        }
    }
    // 动态插入的节点， 不在 父节点渲染树的渲染中
    static updateChildWithParent = ( parent: UINode, child: UINode )=>{
        child.rel_left  += parent.x;
        child.rel_top   += parent.y;
    }
}
