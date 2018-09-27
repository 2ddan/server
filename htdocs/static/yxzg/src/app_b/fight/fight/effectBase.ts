
import { SceneAnim } from "../../../app/scene/sceneAnim";
import { FightSceneCtrl, FighterMap }   from "../fightSceneCtrl";
import { FighterData } from "./fightSceneUIBase";
import { Effect, EffectFlag } from "../../sceneAmbient/effect";

// ======================================== 常量定义
// export class EffectData {
//     playAnim: any;
//     effectName: string;
//     type: string = "effect";
//     id: number;
//     finishCall: Function;
// }

export const FightEffectFlag = {
    "SKILL1": EffectFlag.SKILL1,
    "BEHIT": EffectFlag.BEHIT,
    "SELECT": EffectFlag.SELECT,
    "FIGHTER_INPUT_1": EffectFlag.FIGHTER_INPUT_1,
    "FIGHTER_INPUT_2": EffectFlag.FIGHTER_INPUT_2,
    "FIGHTER_INPUT_3": EffectFlag.FIGHTER_INPUT_3
}


// let fighterEffectMap: Map<number, EffectData> = new Map; // 特效 堆

// ======================================== 特效方法
export class FightEffect {
    /**
     * 为 fighter 添加特效
     * @param 目标
     * @param effectFlag 特效标识 
     */
    static effect = ( fighterData: FighterData, effectFlag: number )=>{
        
        if ( fighterData.effEndCall === undefined ){
            fighterData.effEndCall = ()=>{ delete fighterData.eff; };
        }

        fighterData.eff = Effect.effect( fighterData.fighter.id, effectFlag, fighterData.obj3D.position, fighterData.effEndCall );
        
        // switch ( effectFlag ){
        //     case FightEffectFlag.SKILL1 : {
        //         FightEffect.skill_1( fighterData );
        //         break;
        //     }
        //     case FightEffectFlag.BEHIT : {
        //         FightEffect.hitted( fighterData );
        //         break;
        //     }
        //     case FightEffectFlag.SELECT : {
        //         FightEffect.select( fighterData );
        //         break;
        //     }
        // }
    }
    // private static skill_1 = ( fighterData: FighterData )=>{
    //     let effect: EffectData;

    //     effect   = new EffectData;
    //     effect.id           = fighterData.fighter.id;
    //     effect.type         = "effect";
    //     effect.playAnim     = { name: "eff_rolem_sk1", isOnce: true, id: effect.id };
    //     effect.effectName   = "eff_rolem_sk1";
    //     effect.finishCall   = ()=>{ 
    //                             fighterEffectMap.delete( effect.id );
    //                             FightSceneCtrl.sceneRemove( effect );
    //                             FightEffect.disposeEffect( effect );
    //                         }

    //     EffectCtrl.addEffect( effect );
    //     FightSceneCtrl.sceneCreate( effect, fighterData.obj3D._show.old, effect.type );
    // }

    // private static hitted = ( fighterData: FighterData )=>{
    //     let effect: EffectData;

    //     effect   = new EffectData;
    //     effect.id           = fighterData.fighter.id;
    //     effect.type         = "hitEffect";
    //     effect.playAnim     = { name: "eff_hit_monster_common", isOnce: true, id: effect.id };
    //     effect.effectName   = "eff_hit_monster_common";
    //     effect.finishCall   = ()=>{ 
    //                             FightSceneCtrl.sceneRemove( effect );
    //                             EffectCtrl.removeEffct( effect );
    //                             FightEffect.disposeEffect( effect );
    //                         }

    //     EffectCtrl.addEffect( effect );
    //     FightSceneCtrl.sceneCreate( effect, fighterData.obj3D._show.old, effect.type );
    // }

    // private static select = ( fighterData: FighterData )=>{
    //     let effect: EffectData;

    //     effect   = new EffectData;
    //     effect.id           = fighterData.fighter.id;
    //     effect.type         = "selectEffct";
    //     effect.playAnim     = { name: "eff_xuanzhong", isOnce: false };
    //     effect.effectName   = "eff_xuanzhong";
    //     effect.finishCall   = ()=>{ 
    //                             FightSceneCtrl.sceneRemove( effect );
    //                             FightEffect.disposeEffect( effect );
    //                             delete fighterData.eff;
    //                         }

    //     FightSceneCtrl.sceneCreate( effect, fighterData.obj3D._show.old, effect.type );
    //     fighterData.eff   = effect;
    // }

    // static disposeEffect = ( effect: EffectData )=>{
    //     delete effect.effectName;
    //     delete effect.finishCall;
    //     delete effect.id;
    //     delete effect.playAnim;
    //     delete effect.type;
    // }
}

// class EffectCtrl {
//     static init = ()=>{
//         SceneAnim.setCall( "fightSceneEffect", EffectCtrl.finishCall );
//     }
//     static dispose = ()=>{
//         SceneAnim.delCall( "fightSceneEffect" );
//     }
//     static finishCall = ( obj: any )=>{
//         fighterEffectMap.forEach( (effect) => {
//             if ( effect.id === (obj as number) ){
//                 effect.finishCall();
//             }
//         } );

//         if ( fighterEffectMap.size > 0 ){
//             FightSceneCtrl.effectActive( true );
//         }else{
//             FightSceneCtrl.effectActive( false );
//         }
//     }
//     static addEffect = ( effect: EffectData )=>{
//         FightSceneCtrl.effectActive( true );

//         fighterEffectMap.set( effect.id, effect );
//     }

//     static removeEffct = ( effect: EffectData )=>{
//         fighterEffectMap.delete( effect.id );
//     }

// }


// const init = ()=>{
//     EffectCtrl.init();
// };
// init();