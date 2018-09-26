import { mgr, mgr_data } from "../../app/scene/scene";

import { setPermanent, puasePermanent, activePermanent }    from "../frameCtrl/frameCtrl";

export const SceneObjTypes = [ "Stage", "Sky" ];

let FrameFunc: Function, FrameKey: string = "AmbientFrame" ;
let FrameIsActive: boolean = false;
let AmbinetStageList: Array<any> = [];
let EffectIsActive: boolean = false;

export class AmbientCtrl {
    static sceneCreate = ( data: any, type: string, parent: any )=>{
        // switch ( type ){
        //     case SceneObjTypes[0] :
        //     {

        //         break;
        //     }
        //     case SceneObjTypes[1] :
        //     {

        //         break;
        //     }
        // }
        mgr.create( data, type, parent );
    }
    static sceneRemove = ( data: any )=>{
        mgr.remove( data );
    }
    static modifyCameraPos = ( pos: Array<number> )=>{
        mgr.setOnlyPos2( mgr_data.camera, pos );
    }
    static modifyCameraRotate = ( pos: Array<number> )=>{
        mgr.modifyRotate( mgr_data.camera, pos );
    }
    static setFrameFunc = ( f: Function )=>{
        FrameFunc = f;
    }
    static frameFunc = ()=>{
        FrameFunc && FrameFunc();
    }
    static setFrameActive = ( b: boolean )=>{
        FrameIsActive = b;
    }
    static isFrameEnd = ()=>{
        return !FrameIsActive;
    }
    static activeFrame = ()=>{
        setPermanent( FrameKey, AmbientCtrl.frameFunc );
    }
    static modifyPos = ( data: any, pos: any )=>{
        mgr.setOnlyPos2( data, pos );
    }
    
    static effectActive = ( b: boolean )=>{
        EffectIsActive = b;
    }
    static isEffectActive = ()=>{
        return EffectIsActive;
    }
}