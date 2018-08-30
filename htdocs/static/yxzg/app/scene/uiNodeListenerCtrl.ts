
import * as UIEnum              from "./uiNodeEnum";
import { UINode }               from "./uiNodeBase";
import { UIListener }           from "./uiNodeListener";

/**
 * UI (数据)组件 事件监听管理器
 */
export class UIListenerCtrl {
    /**
     * 解析组件监听配置
     */
    static analyListenCfg = ( frame: UINode )=>{
        let callCfg: any, callFunc: Function;
        let rayID: number, node: UINode;

        for (let nodeName in frame._f_listenCfg ){

            callCfg     = frame._f_listenCfg[ nodeName ];
            node        = frame._f_nodeMap.get( nodeName );

            // 节点 复制 监听配置
            for (let type in callCfg ){

                node._listenCfg[ type ] = [ callCfg[ type ][0], callCfg[ type ][1] ];

                UIListenerCtrl.setListen( node, type, callCfg[ type ][0], callCfg[ type ][1] );
            }
        }
    }
    /**
     * 设置点击监听
     */
    static setClickListen = ( frame: UINode, nodeName: string, f: Function )=>{
        let rayID: number, node: UINode;

        node    = frame._f_nodeMap.get( nodeName );
        if ( node.nodeType !== UIEnum.UITypes[3] ){

            rayID   = node.rayID;
            UIListener.setListen( "up", rayID, f );

        }else{
            UIListenerCtrl.createTotalFrameListen( node, "up", f );
        }
    }
    /**
     * 设置监听
     */
    static setListen = ( node: UINode, type: string, f: Function, spread: boolean )=>{
        let rayID: number;

        if ( node.nodeType !== UIEnum.UITypes[3] ){

            rayID   = node.rayID;
            UIListener.setListen( type, rayID, f );

            if ( spread !== false ){
                UIListenerCtrl.setChildListen( node, type, f );
            }

        }else{
            UIListenerCtrl.createTotalFrameListen( node, type, f );
        }
    }
    // 父节点 监听 可传递给子节点
    static setChildListen = ( node: UINode, type: string, f: Function )=>{
        let rayID: number;

        node._children.forEach( child => {
            rayID   = child.rayID;

            // 节点有自己的 该类型监听 则传递中断
            if ( node._listenCfg[ type ] === undefined ){
                
                node._listenCfg[ type ] = [ f ];

                UIListener.setListen( type, rayID, f );

                UIListenerCtrl.setChildListen( child, type, f );
            }

        } );
    }
    // 清除frame下所有节点监听
    static removeFrameListen = ( frame: UINode )=>{
        let rayID: number, cfg: any;

        frame._f_nodeMap.forEach( node =>{

            if ( node.nodeType !== UIEnum.UITypes[3] ){
    
                cfg     = node._listenCfg;

                for ( let type in cfg ){
                    UIListenerCtrl.removeNodeTypeListen( node.rayID, type );
                }
                
            }else{
                UIListenerCtrl.removeFrameListen( node );
            }

        } );
    }
    // 清除指定节点 的所有监听
    static removeNodeListenByName = ( frame: UINode, nodeName: string )=>{
        let node: UINode;

        node    = frame._f_nodeMap.get( nodeName );

        UIListenerCtrl.removeNodeListen( node );
    }
    // 清除指定节点 的所有监听
    // static removeNodeListen = ( frame: UINode, node: UINode )=>{
    static removeNodeListen = ( node: UINode )=>{

        if ( node.nodeType === UIEnum.UITypes[3] ){
            UIListenerCtrl.clearFrameListen( node );
        }else{

            for ( let type in node._listenCfg ){
                // if ( node._listenCfg[ type ][ 1 ] !== false  ){
                //     UIListenerCtrl.removeNodeSpreadListen( node, type );
                // }else{
                    UIListenerCtrl.removeNodeTypeListen( node.rayID, type );
                    delete  node._listenCfg[ type ];
                // }
            }
        }
    }
    // 清除指定节点的 某个可 传播监听
    static removeNodeSpreadListen = ( node: UINode, type: string )=>{

        node._children.forEach( child => {
            if ( child._listenCfg[ type ][ 1 ] !== false ){

                UIListenerCtrl.removeNodeTypeListen( child.rayID, type );

                delete  child._listenCfg[ type ];
            }
        } );
        
        UIListenerCtrl.removeNodeTypeListen( node.rayID, type );
        delete  node._listenCfg[ type ];
    }
    // 清除指定节点 指定类型 监听
    static removeNodeTypeListen = ( rayID: number, type: string )=>{
        UIListener.removeListen( type, rayID );
    }
    /**
     * 创建对 整个组件 的监听
     */
    static createTotalFrameListen = ( frame: UINode, type: string, f: Function )=>{
        frame._f_nodeMap.forEach( node => {
            if ( node.nodeType === UIEnum.UITypes[3] ){

                UIListenerCtrl.createTotalFrameListen( node, type, f );

            }else{

                node._listenCfg[ type ] = [ f ];
                UIListener.setListen( type, node.rayID, f );

            }
        } );
    } 
    /**
     * 清除对 整个组件 的监听
     */
    static clearFrameListen = ( frame: UINode )=>{
        UIListenerCtrl.removeFrameListen( frame );
    }
}