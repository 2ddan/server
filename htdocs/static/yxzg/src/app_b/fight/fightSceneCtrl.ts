
import { mgr, mgr_data, getRootScale, getRootRotate }       from "../../app/scene/scene";

import { setPermanent, puasePermanent, activePermanent, removePermanent }    from "../frameCtrl/frameCtrl";
import { Ambient } from "../sceneAmbient/ambient";
import { AmbientCtrl } from "../sceneAmbient/ambientCtrl";

import { FighterData }  from "./fight/fightSceneUIBase";
import { data } from "../../app/mod/db";
import { globalSend } from "../../app/mod/pi";


const FightUIFrameKey = "FightUI";

let FrameIsActive: boolean = false, FrameCtrlIsActive: boolean = false;
let AnimIsActive: boolean = false, EffectIsActive: boolean = false;
let FightSceneFrameFunc: Function;
let FightUIFrameFunc: Function;

export let FighterMap: Map<number, FighterData> = new Map;

export class FightSceneCtrl {
    static frameFunc = ()=>{
        if ( FrameCtrlIsActive === true ) {
            FightSceneFrameFunc && FightSceneFrameFunc();
            FightUIFrameFunc && FightUIFrameFunc();
        }
    }
    static activeFrame = ()=>{
        FrameCtrlIsActive = true;

        FightSceneCtrl.init();
    }
    static puaseFrame = ()=>{
        FrameCtrlIsActive = false;
    }
    static checkCardHit = ( { x, y }: {x: number, y: number}, obj3D: any )=>{
        let scaleW: number, scaleH: number;
        let isRotate: boolean;

        isRotate = getRootRotate();

        [scaleW, scaleH] = [1, 1];
        if ( isRotate === true ){
            return mgr_data.threeScene.checkRayCast( x / scaleW, y / scaleH, obj3D.ref.impl.children[0].children[0], false );
        }else{
            return mgr_data.threeScene.checkRayCast( x / scaleW, y / scaleH, obj3D.ref.impl.children[0].children[0], false );
        }
    }
    /**检查X坐标范围内卡牌是否击中 */
    static checkCardHitByXRange = ({x, y}: {x: number, y: number}, fighterData: FighterData) => {
        let size = mgr_data.threeScene.renderer.getSize(),
            actualX = (x / size.width) * 2 -1;
        if (x <= (fighterData.nodeLeft + 80) && x >= fighterData.nodeLeft) {
            return true;
        }
        return false;
    }
    static setFightUIFrameFunc = ( f: Function )=>{
        FightUIFrameFunc     = f;
    }
    static setFightSceneFrameFunc = ( f: Function )=>{
        FightSceneFrameFunc     = f;
    }
    // 初始化战斗场景
    static init = ()=>{
        setPermanent( FightUIFrameKey, FightSceneCtrl.frameFunc );
    }
    // 关闭战斗场景
    static dispose = ()=>{
        removePermanent( FightUIFrameKey );
    }

    static frameActive = ( b: boolean )=>{
        FrameIsActive = b;

        // if ( FrameIsActive === false && AnimIsActive === false && EffectIsActive === false ){
        if ( FrameIsActive === false && AnimIsActive === false ){
            globalSend( "changeFighteAnimState", false );
        }
    }

    static animActive = ( b: boolean )=>{
        AnimIsActive = b;
    }

    // static effectActive = ( b: boolean )=>{
    //     EffectIsActive = b;
    // }

    static isFrameEnd = ()=>{
        // return !FrameIsActive && !AnimIsActive && !EffectIsActive && AmbientCtrl.isFrameEnd();
        return !FrameIsActive && !AnimIsActive  && AmbientCtrl.isFrameEnd();
    }

    static createFighter = ( data: any, type: string )=>{
        mgr.create( data, type );
    }

    static removeFighter = ( data: any )=>{
        mgr.remove( data );
    }

    static changeFighterAnim = ( obj3D: any, data: any )=>{
        mgr.setAnimation( obj3D, data );
    }

    static sceneObjPos = ( data: any, pos: Array<number>  )=>{
        mgr.setOnlyPos2( data, pos );
    }

    static sceneObjRotate = ( data: any, rotate: Array<number> )=>{
        mgr.modifyRotate( data, rotate );
    }

    static sceneObjVisible = ( data: any, b: boolean )=>{
        mgr.modifyVisible( data, b );
    }

    static sceneObjd3DPos = ( data: any, pos: Array<number>, lookAt: Array<number> )=>{
        let lookAtOnce: any ;

        if ( lookAt !== undefined ){
            lookAtOnce  = {
                value: lookAt,
                sign: Math.random()*10
            }
        }
        mgr.setPos( data, pos, lookAtOnce );
    }

    static sceneObj3DLookAt = ( data: any, lookAt: Array<number> )=>{
        let lookAtOnce: any ;

        lookAtOnce  = {
            value: lookAt,
            sign: Math.random()*10
        }

        mgr.setLookAt( data, lookAtOnce );
    }


    static sceneCreate = ( data: any, parent, type )=>{
        mgr.create( data, type, parent );
    }

    static sceneRemove = ( data: any )=>{
        mgr.remove( data );
    }
}
