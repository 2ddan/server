
import { SceneAnim } from "app/scene/sceneAnim";
import { AmbientCtrl }   from "./ambientCtrl";

export class EffectData {
    playAnim: any;
    position: Array<number>;
    effectName: string;
    type: string = "effect";
    id: number;
    finishCall: Function;
    cb: Function;
}

export const EffectFlag = {
    "SKILL1": 1,
    "BEHIT": 2,
    "SELECT": 3,
    "FIGHTER_INPUT_1": 4,
    "FIGHTER_INPUT_2": 5,
    "FIGHTER_INPUT_3": 6
}
export const FighterCreatAnimNames = [ "eff_guaiwuguang01", "eff_guaiwuguang02", "eff_guaiwuguang03" ];


let effectMap: Map<EffectData, EffectData> = new Map; // 特效 堆

export class Effect {
    /**
     * fighter 添加特效
     */
    static effect = ( id: number, effectFlag: number, pos: Array<number>, cb?: Function )=>{
        let data: EffectData;

        switch ( effectFlag ){
            case EffectFlag.SKILL1 : {
                data = Effect.skill_1( id, pos, cb );
                break;
            }
            case EffectFlag.BEHIT : {
                data = Effect.hitted( id, pos, cb );
                break;
            }
            case EffectFlag.SELECT : {
                data = Effect.select(  id, pos, cb );
                break;
            }
            case EffectFlag.FIGHTER_INPUT_1 : {
                data = Effect.fighterInput(  id, pos, cb, 0 );
                break;
            }
            case EffectFlag.FIGHTER_INPUT_2 : {
                data = Effect.fighterInput(  id, pos, cb, 1 );
                break;
            }
            case EffectFlag.FIGHTER_INPUT_3 : {
                data = Effect.fighterInput(  id, pos, cb, 2 );
                break;
            }
        }

        return data;
    }
    private static skill_1 = ( rayID: number, pos: Array<number>, cb: Function )=>{
        let effect: EffectData;

        effect   = new EffectData;
        effect.id           = rayID;
        effect.cb           = cb;
        effect.type         = "effect";
        effect.playAnim     = { name: "eff_rolem_sk1", isOnce: true, id: effect.id };
        effect.effectName   = "eff_rolem_sk1";
        effect.position     = [ pos[0], pos[1], pos[2] ];
        effect.finishCall   = ()=>{ 
                                AmbientCtrl.sceneRemove( effect );
                                EffectCtrl.removeEffctListen( effect );

                                effect.cb && effect.cb();

                                Effect.disposeEffect( effect );
                                console.log( `AmbientCtrl.sceneRemove : "eff_rolem_sk1" ${effectMap.size}` );
                            }

        EffectCtrl.addEffectListen( effect );
        AmbientCtrl.sceneCreate( effect, effect.type, undefined );
        
        console.log( `AmbientCtrl.sceneCreate : "eff_rolem_sk1" ${effectMap.size}` );
        
        return effect;
    }

    private static hitted = ( rayID: number, pos: Array<number>, cb: Function )=>{
        let effect: EffectData;

        effect   = new EffectData;
        effect.id           = rayID;
        effect.cb           = cb;
        effect.type         = "hitEffect";
        effect.playAnim     = { name: "eff_hit_monster_common", isOnce: true, id: effect.id };
        effect.effectName   = "eff_hit_monster_common";
        effect.position     = [ pos[0], pos[1], pos[2] ];
        effect.finishCall   = ()=>{ 
                                AmbientCtrl.sceneRemove( effect );
                                EffectCtrl.removeEffctListen( effect );

                                effect.cb && effect.cb();
                                
                                Effect.disposeEffect( effect );
                            }

        EffectCtrl.addEffectListen( effect );
        AmbientCtrl.sceneCreate( effect, effect.type, undefined );
        
        return effect;
    }

    private static select = ( rayID: number, pos: Array<number>, cb: Function )=>{
        let effect: EffectData;

        effect   = new EffectData;
        effect.id           = rayID;
        effect.cb           = cb;
        effect.type         = "selectEffct";
        effect.playAnim     = { name: "eff_xuanzhong", isOnce: false };
        effect.effectName   = "eff_xuanzhong";
        effect.position     = [ pos[0], pos[1], pos[2] ];
        effect.finishCall   = ()=>{ 
                                AmbientCtrl.sceneRemove( effect );

                                effect.cb && effect.cb();
                                
                                Effect.disposeEffect( effect );
                            }

        AmbientCtrl.sceneCreate( effect, effect.type, undefined );

        return effect;
    }

    static fighterInput = ( rayID: number, pos: Array<number>, cb: Function, flag: number )=>{
        let effect: EffectData;

        effect              = new EffectData;
        effect.id           = rayID;
        effect.cb           = cb;
        effect.type         = "effect";
        effect.playAnim     = { name: FighterCreatAnimNames[flag], isOnce: true, id: effect.id };
        effect.effectName   = "eff_guaiwuguang";
        effect.position     = [ pos[0], pos[1], pos[2] ];
        effect.finishCall   = ()=>{ 
                                AmbientCtrl.sceneRemove( effect );
                                EffectCtrl.removeEffctListen( effect );

                                effect.cb && effect.cb();
                                
                                Effect.disposeEffect( effect );
                            }

        EffectCtrl.addEffectListen( effect );
        AmbientCtrl.sceneCreate( effect, effect.type, undefined );
        
        return effect;
    }

    static disposeEffect = ( effect: EffectData )=>{
        delete effect.effectName;
        delete effect.finishCall;
        delete effect.id;
        delete effect.playAnim;
        delete effect.type;
    }
}

class EffectCtrl {
    static init = ()=>{
        SceneAnim.setCall( "fightSceneEffect", EffectCtrl.finishCall );
    }
    static dispose = ()=>{
        SceneAnim.delCall( "fightSceneEffect" );
    }
    static finishCall = ( obj: any )=>{
        effectMap.forEach( (effect) => {
            if ( effect.id === (obj as number) ){
                effect.finishCall();
            }
        } );

        if ( effectMap.size > 0 ){
            AmbientCtrl.effectActive( true );
        }else{
            AmbientCtrl.effectActive( false );
        }
    }
    static addEffectListen = ( effect: EffectData )=>{
        AmbientCtrl.effectActive( true );

        effectMap.set( effect, effect );
    }

    static removeEffctListen = ( effect: EffectData )=>{
        effectMap.delete( effect );
    }

}


const init = ()=>{
    EffectCtrl.init();
};
init();