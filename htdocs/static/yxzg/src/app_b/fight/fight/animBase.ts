
import { SceneAnim } from "app/scene/sceneAnim";
import { FightSceneCtrl }   from "../fightSceneCtrl";
import { FighterData } from "./fightSceneUIBase";
import { RoleAnimFlags, ReadMonsterAnim, ReadRoleAnim } from "./fightBase";


let fighterAnimMap: Map<FighterData, FighterData> = new Map;



// =============================Anim

export class FighterAnim {

    /**
     * 更改 fighter 动作
     * @param fighterData 动作执行的目标
     * @param animFlag  动作标识 0 -- 5
     */
    static toAnim = ( fighterData: FighterData, animFlag: number )=>{
        let aniName: string, isOnce: boolean, isDown: boolean;

        if ( fighterData.isEnemy ){
            aniName     = ReadMonsterAnim( fighterData.obj3D.name, animFlag);
        }else{
            aniName     = ReadRoleAnim( fighterData.obj3D.name, animFlag);
        }

        // 2 - 5 的动作都是一次性的动作
        isOnce  = animFlag >= 2 ;

        // 更改模型动作
        FightSceneCtrl.changeFighterAnim( 
                                fighterData.obj3D, 
                                { name: aniName, isOnce: isOnce, id: isOnce ? (fighterData) : undefined } 
                            );
        
        // 为一次性动作时要监听动作的结束
        if ( isOnce === true ){
            AnimCtrl.addAnimFinishListen( fighterData );
        }

    }

    static _logMapSize = ()=>{
        return [ "fighterAnimMap.size ", fighterAnimMap.size ];
    }
}

class AnimCtrl {

    static init = ()=>{
        SceneAnim.setCall( "fightSceneAnim", AnimCtrl.finishCall );
    }

    static dispose = ()=>{
        SceneAnim.delCall( "fightSceneAnim" );
    }

    /**
     * 3D 特效/动作 结束监听
     */
    static finishCall = ( obj: any )=>{
        fighterAnimMap.forEach( fighterData => {
            if ( fighterData === obj ){
                fighterAnimMap.delete( fighterData );

                // 技能和受击 动作后 恢复为 站立动作
                if (  fighterData.obj3DFlag === RoleAnimFlags.skill1 
                        || fighterData.obj3DFlag === RoleAnimFlags.behit  ){

                    FighterAnim.toAnim( fighterData, RoleAnimFlags.stand );
                }
            }
        } );
        
        
        // console.log( "fighterAnimMap.size ", fighterAnimMap.size );

        if ( fighterAnimMap.size > 0 ){
            FightSceneCtrl.animActive( true );
        }else{
            FightSceneCtrl.animActive( false );
        }
    }

    static addAnimFinishListen = ( fighterData: FighterData )=>{
        fighterAnimMap.set( fighterData, fighterData );
    }
}


const init = ()=>{
    AnimCtrl.init();
};
init();