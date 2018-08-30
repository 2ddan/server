/**
 * Date: 2018-08-08 11:00:00
 * Version: 0.4
 *      描述：
 *          创建 节点渲染管理模块
 * 
 *      功能：
 *          渲染节点的 创建，更新，渲染，渲染更新
 */


import * as UIEnum          from "./uiNodeEnum";
import { UIToolFunc }       from "./uiNodeToolFunc";
import { UINode, UINodeRender, Geometry, 
         Material, MaterialMap, MeshRender,
         BoxColloder, Transform, TextCfg, TextCon 
        }                   from "./uiNodeBase";


/**
 * 渲染节点 构建器
 */
export class UINodeRenderCreator {
    static creat = ( node: UINode ): UINodeRender =>{
        let render: UINodeRender ;

        render          = UINodeRenderCreator.createRender( node );
        node._render    = render;
        return render;
    }

    private static createBoxColloder  = ( json: any )=>{
        let box: BoxColloder;

        box     = new BoxColloder;
        box.min = json.min || [ -0.5, -0.5, -0.5 ];
        box.max = json.max || [ 0.5, 0.5, 0.5 ];

        return box;
    }

    private static createRender = ( node: UINode )=>{
        let render: UINodeRender;

        switch (node.nodeType) {
            case UIEnum.UITypes[0] :{
                render  = UINodeRenderCreator.createRender_Color( node );
                break;
            }
            case UIEnum.UITypes[1] :{
                render  = UINodeRenderCreator.createRender_Image( node );
                break;
            }
            case UIEnum.UITypes[2] :{
                render  = UINodeRenderCreator.createRender_Text( node );
                break;
            }
            case UIEnum.UITypes[3] :{
                render  = UINodeRenderCreator.createRender_Frame( node );
                break;
            }
            case UIEnum.UITypes[4] :{
                // meshRender  = UINodeRenderCreator.createRender_Frame( data );
            }
        }

        render.children     = [];
        render._node        = node;
        render.attachment   = "2D";
        render.name         = node.nodeName;

        return render;
    }
    private static createRender_Color = ( node: UINode )=>{
        let render: UINodeRender, geo: Geometry, meshRender: MeshRender, transform: Transform;

        render      = new UINodeRender;
        transform   = UINodeRenderCreator.createTransform( node );
        geo         = UINodeRenderCreator.createGeometry( node );
        meshRender  = UINodeRenderCreator.createMeshRender( node );
        

        render.renderType   = "COLOR";
        render.rayID        = node.rayID;
        render.renderName   = node.nodeName;
        render.transform    = transform;
        render.geometry     = geo;
        render.meshRender   = meshRender;

        return render;
    }
    private static createRender_Image = ( node: UINode )=>{
        let render: UINodeRender, geo: Geometry, meshRender: MeshRender, transform: Transform;

        render      = new UINodeRender;
        transform   = UINodeRenderCreator.createTransform( node );
        geo         = UINodeRenderCreator.createGeometry( node );
        meshRender  = UINodeRenderCreator.createMeshRender( node );
        

        render.renderType   = "IMAGE";
        render.rayID        = node.rayID;
        render.renderName   = node.nodeName;
        render.transform    = transform;
        render.geometry     = geo;
        render.meshRender   = meshRender;

        return render;
    }
    private static createRender_Text = ( node: UINode )=>{
        let render: UINodeRender, textCon: TextCon, transform: Transform;

        render      = new UINodeRender;
        transform   = UINodeRenderCreator.createTransform( node );
        textCon     = UINodeRenderCreator.createTextCon( node );
        

        render.renderType   = "TEXT";
        render.rayID        = node.rayID;
        render.renderName   = node.nodeName;
        render.transform    = transform;
        render.textCon      = textCon;

        render.transform.scale  = [ 0.25, 0.25, 1 ];

        return render;
    }
    private static createRender_Frame = ( node: UINode )=>{
        let render: UINodeRender, transform: Transform;

        render      = new UINodeRender;
        transform   = UINodeRenderCreator.createTransform( node );
        

        render.renderType   = "FRAME";
        render.rayID        = node.rayID;
        render.renderName   = node.nodeName;
        render.transform    = transform;

        return render;
    }
    private static createRender_Space = ( node: UINode )=>{

    }
    private static createTransform  = ( node: UINode )=>{
        let transform: Transform;
        
        transform   = new Transform;
        
        transform.position  = UIToolFunc.computePosition( node );
        transform.rotate    = UIToolFunc.computeRotate( node );
        transform.scale     = UIToolFunc.computeScale( node );

        return transform;
    }
    private static createGeometry  = ( node: UINode )=>{
        let geo: Geometry;

        geo         = new Geometry ;
        geo.width   = node.width ;
        geo.height  = node.height ;
        geo.type    = "Plane" ;

        return geo;
    }
    private static createMeshRender = ( node: UINode )=>{
        let meshRender: MeshRender;
        switch (node.nodeType) {
            case UIEnum.UITypes[0] :{
                meshRender  = UINodeRenderCreator.createMeshRender_Color( node );
                break;
            }
            case UIEnum.UITypes[1] :{
                meshRender  = UINodeRenderCreator.createMeshRender_Image( node );
                break;
            }
            case UIEnum.UITypes[2] :{
                // meshRender  = UINodeRenderCreator.createMeshRender_Text( node );
                break;
            }
            case UIEnum.UITypes[3] :{
                // meshRender  = UINodeRenderCreator.createMeshRender_Frame( node );
                break;
            }
            case UIEnum.UITypes[4] :{
                // meshRender  = UINodeRenderCreator.createMeshRender_Space( node );
                break;
            }
        }

        return meshRender;
    }
    private static createMeshRender_Color = ( node: UINode )=>{
        let meshRender: MeshRender, material: Material, map: MaterialMap;
        meshRender      = new MeshRender;
        material        = new Material;

        material.type           = UIEnum.MaterialTypes[0];
        material.transparent    = true;
        material.layer          = 1;
        material.color          = node.bgColor ;
        material.opacity        = node.opacity;

        meshRender.material     = material;

        return meshRender;
    }
    private static createMeshRender_Image = ( node: UINode )=>{
        let meshRender: MeshRender, material: Material, map: MaterialMap;
        meshRender      = new MeshRender;
        material        = new Material;
        map             = new MaterialMap;

        map.filter              = [ 1006, 1007 ];
        map.generateMipmaps     = true;
        map.image               = { name: node.imageURL };

        material.type           = UIEnum.MaterialTypes[0];
        material.transparent    = true;
        material.layer          = 1;
        material.map            = map;
        material.opacity        = node.opacity;

        meshRender.material     = material;

        return meshRender;
    }
    private static createTextCon = ( node: UINode )=>{
        let textCfg: TextCfg, textCon: TextCon;
        
        textCon     = new TextCon;
        textCfg     = new TextCfg;

        textCfg.color           = node._t_color;
        textCfg.font            = node._t_font;
        textCfg.space           = node._t_space;
        textCfg.textAlign       = node._t_textAlign;
        textCfg.strokeColor     = node._t_borderColor;
        textCfg.strokeWidth     = node._t_borderWidth;
        textCfg.isCommon        = node._t_isCommon;
        textCfg.lineHeight      = node._t_lineHeight;

        textCon.show            = node.text;
        textCon.opacity         = node.opacity;
        textCon.textcfg         = textCfg;

        return textCon;
    }
    private static createMeshRender_Frame = ( node: UINode )=>{
        let meshRender: MeshRender, material: Material, map: MaterialMap;
    }
    private static createMeshRender_Space = ( node: UINode )=>{
        let meshRender: MeshRender, material: Material, map: MaterialMap;
    }
}
