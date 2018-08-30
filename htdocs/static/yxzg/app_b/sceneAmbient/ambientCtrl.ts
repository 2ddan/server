import { mgr } from "../../app/scene/scene";

import { setPermanent, puasePermanent, activePermanent }    from "../frameCtrl/frameCtrl";


let FrameFunc: Function, FrameKey: string = "AmbientFrame" ;
let FrameIsActive: boolean = false;

export class AmbientCtrl {
    static sceneCreate = ( data: any, type: string, parent: any )=>{
        mgr.create( data, type, parent );
    }
    static sceneRemove = ( data: any )=>{
        mgr.remove( data );
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
    static updatePosition = ( data: any, pos: any )=>{
        mgr.setOnlyPos2( data, pos );
    }
}