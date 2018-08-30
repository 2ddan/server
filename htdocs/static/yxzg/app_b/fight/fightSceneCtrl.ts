
import { mgr, mgr_data, getRootScale, getRootRotate }       from "../../app/scene/scene";
import { HEIGHT } from "../../app/scene/sceneCfg";
import { setPermanent, puasePermanent, activePermanent, removePermanent }    from "../frameCtrl/frameCtrl";
import { UINode } from "../../app/scene/uiNodeBase";
import { FighterData }  from "./fightSceneUIBase";
import { setWait } from "../../app/scene/scene_show";
import { Ambient } from "../sceneAmbient/ambient";
import { AmbientCtrl } from "../sceneAmbient/ambientCtrl";
import { SceneAnim } from "../../app/scene/sceneAnim";


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
            return mgr_data.threeScene.checkRayCast( y / scaleW, (HEIGHT - x / scaleH), obj3D.ref.impl.children[0].children[0], false );
        }else{
            return mgr_data.threeScene.checkRayCast( x, y, obj3D.ref.impl.children[0].children[0], false );
        }
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

        Ambient.init();

    }
    // 关闭战斗场景
    static dispose = ()=>{
        removePermanent( FightUIFrameKey );

        Ambient.dispose();
    }

    static frameActive = ( b: boolean )=>{
        FrameIsActive = b;

        if ( FrameIsActive === false && AnimIsActive === false && EffectIsActive === false ){
            setWait( false );
        }
    }

    static animActive = ( b: boolean )=>{
        AnimIsActive = b;
    }

    static effectActive = ( b: boolean )=>{
        EffectIsActive = b;
    }

    static isFrameEnd = ()=>{
        return !FrameIsActive && !AnimIsActive && !EffectIsActive && AmbientCtrl.isFrameEnd();
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

    static sceneCreate = ( data: any, parent, type )=>{
        mgr.create( data, type, parent );
    }

    static sceneRemove = ( data: any )=>{
        mgr.remove( data );
    }
}
