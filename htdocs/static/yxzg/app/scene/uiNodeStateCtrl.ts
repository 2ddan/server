
import * as UIEnum                  from "./uiNodeEnum";
import { UINode }                   from "./uiNodeBase";
import { UINodeRenderCtrl }         from "./uiNodeRenderCtrl";

/**
 *  UI (数据)节点  样式管理器
 */
export class UINodeStateCtrl {
    /**
     * 数据节点 的 样式数据更新
     */
    static update = ( node: UINode, state: any )=>{
        let dPosition: boolean, dRotate: boolean, dScale: boolean;

        for ( let key in state ){
            switch (key) {
                case UIEnum.StatePositionKeys[0] : {
                    dPosition   = true;
                    UINodeStateCtrl.update_left( node, state[key] );
                    break;
                }
                case UIEnum.StatePositionKeys[1] : {
                    dPosition   = true;
                    UINodeStateCtrl.update_top( node, state[key] );
                    break;
                }
                case UIEnum.StatePositionKeys[2] : {
                    dPosition   = true;
                    UINodeStateCtrl.update_right( node, state[key] );
                    break;
                }
                case UIEnum.StatePositionKeys[3] : {
                    dPosition   = true;
                    UINodeStateCtrl.update_bottom( node, state[key] );
                    break;
                }
                case UIEnum.StatePositionKeys[4] : {
                    dPosition   = true;
                    UINodeStateCtrl.update_z_relt( node, state[key] );
                    break;
                }
                case UIEnum.StateRotateKeys[0] : {
                    dRotate     = true;
                    UINodeStateCtrl.update_rotate( node, state[key] );
                    break;
                }
                case UIEnum.StateScaleKeys[0] : {
                    dScale      = true;
                    UINodeStateCtrl.update_scale( node, state[key] );
                    break;
                }
            }
        }

        if ( node._render !== undefined ){
            (dPosition === true) && UINodeRenderCtrl.update_position( node );
            (dRotate   === true) && UINodeRenderCtrl.update_rotate( node );
            (dScale    === true) && UINodeRenderCtrl.update_scale( node );
        }
    }
    static update_left = ( node: UINode, data: number )=>{
        node.rel_left   = data;
        node.x          = data;
    }
    static update_top = ( node: UINode, data: number )=>{
        node.rel_top    = data;
        node.y          = data;
    }
    static update_right = ( node: UINode, data: number )=>{
        let parentW: number;

        parentW         = node._parent === undefined ? 0 : node._parent.width ;
        node.rel_right  = data;
        node.rel_left   = parentW - node.width - data ;
        node.x          = node.rel_left;
    }
    static update_bottom = ( node: UINode, data: number )=>{
        let parentH: number;

        parentH         = node._parent === undefined ? 0 : node._parent.height ;
        node.rel_bottom = data;
        node.rel_top    = parentH - node.height - data ;
        node.y          = node.rel_top;
    }
    static update_z_relt = ( node: UINode, data: number )=>{
        node.rel_z      = data;
        node.z          = ( (node._parent !== undefined ? node._parent.z : (node.z) ) + data );
    }
    static update_scale = ( node: UINode, data: Array<number> )=>{
        node.x_scale    = data[0];
        node.y_scale    = data[1];
        node.z_scale    = data[2];
    }
    static update_rotate = ( node: UINode, data: Array<number> )=>{
        node.x_rotate   = data[0];
        node.y_rotate   = data[1];
        node.z_rotate   = data[2];
    }
}

/**
 * UI (数据)组件 样式管理器
 */
export class UIFrameStatesCtrl {
    static update = ( frame: UINode, nodeName: string, stateName: string  )=>{

    }
    static update_left  = ()=>{

    }
    static update_top  = ()=>{
        
    }
    static update_right  = ()=>{
        
    }
    static update_bottom  = ()=>{
        
    }
    static update_z  = ()=>{
        
    }
    static update_position = ()=>{

    }
    static update_scale = ()=>{
        
    }
    static update_rotate = ()=>{
        
    }
    static update_opacity = ()=>{
        
    }
    static update_color = ()=>{
        
    }
}
