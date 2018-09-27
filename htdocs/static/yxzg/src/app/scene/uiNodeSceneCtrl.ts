
import { mgr }          from "./scene";  

export class UISceneCtrl {
    static open = ()=>{

    }
    static close = ()=>{

    }
    static nodePosToScenePos = ( data: Array<number>, w: number, h: number )=>{
        // let cameraPos: Array<number>;
        // cameraPos   = mgr.getCamera2DPosition();
        data[0]     = 0-(data[0] + w/2);
        data[1]     = 0-(data[1] + h/2);
    }
    static renderNode = ( node: any )=>{
        // mgr.create( node, FormatEnum.NodeRenderType );
        mgr.create( node );
    }
    static modifyScale = ( data: any, scale: Array<number> )=>{
        mgr.setOnlyScale( data, scale );
    }
    static modifyOpacity = ( data: any, opacity: number )=>{
        mgr.setOpacity( data, opacity );
    }
    static modifyPosition = ( data: any, pos: Array<number>, w?: number, h?: number )=>{
        // NodeFrameCtrl.nodePosToScenePos( pos, w, h );
        mgr.setOnlyPos2( data, pos );
    }
    static modifyRotate = ( data: any, rotate: Array<number> )=>{
        mgr.modifyRotate( data, rotate );
    }
    static modifyImage = ( data: any, url: string )=>{
        mgr.setImageDetail( data, url );
    }
    static modifyVisible = ( data: any, b: boolean )=>{
        mgr.modifyVisible( data, b );
    }
    static modifyText = ( data: any, txt: string )=>{
        mgr.setOnlyText( data, txt );
    }
    static remove = ( data: any )=>{
        mgr.remove( data );
    }
    static getNodeToSceneSizeRatio = ()=>{
        return 1;
        // return 102.4/0.3;
    }
    static getNodeToScenePosRatio = ()=>{
        return 1;
        // return -102.4/0.3;
    }
}