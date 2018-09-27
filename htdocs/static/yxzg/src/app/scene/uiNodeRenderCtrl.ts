
import { UISceneCtrl }              from "./uiNodeSceneCtrl";
import { UINode, UINodeRender }     from "./uiNodeBase";
import { UIToolFunc }               from "./uiNodeToolFunc";
import { UINodeRenderCreator }      from "./uiNodeRenderCreator";  

/**
 * 渲染节点 渲染管理器
 */
export class UINodeRenderCtrl {
    static createRender  = ( node: UINode ): UINodeRender=>{
        return UINodeRenderCreator.creat( node );
    }
    static renderNode = ( node: UINode )=>{

        // if ( node._parent !== undefined ){
        //     node._parent._render.children.push( node._render );
        // }

        UISceneCtrl.renderNode( node._render );
    }
    static update_transform = ( node: UINode )=>{
        
    }
    static update_position = ( node: UINode )=>{
        let data: Array<number>;

        data    = UIToolFunc.computePosition( node );
        UISceneCtrl.modifyPosition( node._render, data  );

        UINodeRenderCtrl.updateChildrenMatrix( node._render );
    }
    static update_scale = ( node: UINode )=>{
        let data: Array<number>;
        
        data    = UIToolFunc.computeScale( node );
        UISceneCtrl.modifyScale( node._render, data  );

        UINodeRenderCtrl.updateChildrenMatrix( node._render );
    }
    static update_rotate = ( node: UINode )=>{
        let data: Array<number>;
        
        data    = UIToolFunc.computeRotate( node );
        UISceneCtrl.modifyRotate( node._render, data  );
        
        UINodeRenderCtrl.updateChildrenMatrix( node._render );
    }
    static update_opacity = ( node: UINode )=>{
        UISceneCtrl.modifyOpacity( node._render, node.opacity );
    }
    static update_image = ( node: UINode )=>{
        UISceneCtrl.modifyImage( node._render, node.imageURL );
    }
    static update_bgColor = ( node: UINode )=>{
        
    }
    static update_text = ( node: UINode )=>{
        UISceneCtrl.modifyText( node._render, node.text );
    }
    static remove = ( node: UINode )=>{
        UISceneCtrl.remove( node._render );
        node._render    = undefined;
    }
    static updateChildParent = ( parent: UINode, node: UINode )=>{
        ( node._render as any ).ref.impl.parent = ( parent._render as any ).ref.impl;
    }
    static updateChildrenMatrix = ( render: UINodeRender )=>{

        render.children.forEach( child => {

            child.ref.impl.matrixWorldNeedsUpdate = true;
            UINodeRenderCtrl.updateChildrenMatrix( child );

        } );

    }

}

export class UIRenderCtrl_After {
    static appendChildToParent = ( parent: UINode, child: UINode )=>{
        ( child._render as any ).ref.impl.parent = ( parent._render as any ).ref.impl;
    }
    static updateChildrenMatrix = ( render: UINodeRender )=>{

        render.children.forEach( child => {

            child.ref.impl.matrixWorldNeedsUpdate = true;
            UINodeRenderCtrl.updateChildrenMatrix( child );

        } );

    }
    // static removeChild
}
         