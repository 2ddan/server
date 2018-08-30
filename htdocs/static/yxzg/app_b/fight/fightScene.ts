/**
 * version: XXXXXXX
 *      描述：
 *      xxxxxx
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { FightSceneCtrl }   from "./fightSceneCtrl"
import { FighterMap }       from "./fightSceneCtrl";
import { FighterData, RoleAnimFlags,
        RoleTplList, RoleNameList, MonsterNameList, MonsterTplList, 
        ReadMonsterAnim, ReadRoleAnim } from "./fightSceneUIBase";
import { data } from "../../app/mod/db";
import { Ambient }  from "../sceneAmbient/ambient";
import { EffectData, FightEffectFlag } from "./fightBase";
import { SceneAnim } from "../../app/scene/sceneAnim";


// ========================================常量定义
const LookAtCfg = [
    [ 0, 0, 0 ]
];


// ========================================导出接口


// ========================================数据结构


// ========================================变量声明
let frameIsActive: boolean = false;
let objSky: any;
let fighterAnimMap: Map<FighterData, FighterData> = new Map;
let fighterEffectMap: Map<number, EffectData> = new Map;

// ========================================类定义
export class FightScene {

    // 创建一个fighter
    static create = ( fighterData: FighterData )=>{
        let data: any;
        let x :number, z: number;

        if ( fighterData.isEnemy ){
            FightScene.createMonster( fighterData );
        }else{
            FightScene.createPerson( fighterData );
        }
        
    }

    private static createPerson = ( fighterData: FighterData )=>{
        let data: any, roleName: string;
        let x :number, z: number;

        x           = (fighterData.arrIndex*2 +2) ;
        z           = -0 ;
        roleName    = RoleNameList[0];

        data    = {
            rayID: fighterData.fighter.id,
            name: roleName,
            position: [ x, -0, z ],
            playAnim: {
                name: ReadRoleAnim( roleName, RoleAnimFlags.stand ),
                isOnce: false
            }
        }

        fighterData.obj3D = data;

        FightSceneCtrl.createFighter( data, RoleTplList[0] );

        Ambient.createStage( { x: x, y: z, type: 1 } );
    }

    private static createMonster = ( fighterData: FighterData )=>{
        let data: any, monsterName: string;
        let x :number, z: number;

        x       = -(fighterData.arrIndex*2 +2);
        z       = -0 ;
        monsterName = MonsterNameList[0];

        data    = {
                    rayID: fighterData.fighter.id,
                    name: monsterName,
                    position: [ x, -0, z ],
                    playAnim: {
                        name: ReadMonsterAnim( monsterName, RoleAnimFlags.stand ),
                        isOnce: false
                    }
                }

        fighterData.obj3D = data;

        FightSceneCtrl.createFighter( data, MonsterTplList[0] );

        Ambient.createStage( { x: x, y: z, type: 1 } );
    }

    // 移动一个fighter

    static doSkill = ( fighterID: number )=>{        
        let fighterData: FighterData;

        fighterData     = FighterMap.get( fighterID );
        fighterData.obj3DFlag   = RoleAnimFlags.skill1;

        FighterAnim.toAnim( fighterData, RoleAnimFlags.skill1 );
        FightEffect.effect( fighterData, FightEffectFlag.SKILL1 );
    }

    static beHit = ( fighterID: number )=>{
        let fighterData: FighterData;

        fighterData     = FighterMap.get( fighterID );

        FighterAnim.toAnim( fighterData, RoleAnimFlags.behit );
        FightEffect.effect( fighterData, FightEffectFlag.BEHIT );
    }

    static doStand = ( fighterID: number )=>{
        let fighterData: FighterData;

        fighterData     = FighterMap.get( fighterID );
        fighterData.obj3DFlag   = RoleAnimFlags.stand;

        FighterAnim.toAnim( fighterData, RoleAnimFlags.stand );
    }

    static doMove = ( fighterID: number )=>{
        let fighterData: FighterData;

        fighterData     = FighterMap.get( fighterID );
        fighterData.obj3DFlag   = RoleAnimFlags.move;

        FighterAnim.toAnim( fighterData, RoleAnimFlags.move );
    }
    
    static doDie = ( fighterID: number )=>{
        let fighterData: FighterData;

        fighterData     = FighterMap.get( fighterID );
        fighterData.obj3DFlag   = RoleAnimFlags.die;

        FighterAnim.toAnim( fighterData, RoleAnimFlags.die );
    }

    // 移除一个fighter
    static remove = ( fighterData: FighterData )=>{

        Ambient.removeStage( fighterData.obj3D.position[0], fighterData.obj3D.position[2] );

        FightSceneCtrl.removeFighter( fighterData.obj3D );
        
        delete fighterData.obj3D;
        delete fighterData.obj3DFlag;
    }


    // 相机动作

    // 创建场景背景

    // 获取命中目标
    static getCardHit = ( { x, y }:{x: number, y: number} )=>{
        let hitRes: boolean, hitID: number;

        hitRes  = false;
        FighterMap.forEach( fighterData => {
            if ( hitRes === false || hitRes === undefined ){
                hitID   = fighterData.fighter.id;
                hitRes  = FightSceneCtrl.checkCardHit( { x, y }, fighterData.obj3D._show.old );
            }
        } );

        if ( hitRes === false || hitRes === undefined ){
            return ;
        }else{
            return hitID;
        }
    }

    static update = ()=>{

        FighterMap.forEach( fighterData =>{

        } );
    }

    static isFrameEnd = ()=>{
        return !frameIsActive;
    }

}

// =============================Anim

export class FighterAnim {

    // 更改 fighter 动作
    static toAnim = ( fighterData: FighterData, animFlag: number )=>{
        let aniName: string, isOnce: boolean, isDown: boolean;

        if ( fighterData.isEnemy ){
            aniName     = ReadMonsterAnim( fighterData.obj3D.name, animFlag);
        }else{
            aniName     = ReadRoleAnim( fighterData.obj3D.name, animFlag);
        }

        isOnce  = animFlag >= 2 ;
        FightSceneCtrl.changeFighterAnim( 
                                fighterData.obj3D, 
                                { name: aniName, isOnce: isOnce, id: isOnce ? (fighterData) : undefined } 
                            );
        
        if ( isOnce === true ){
            AnimCtrl.addAnim( fighterData );
        }

    }
}

class AnimCtrl {

    static init = ()=>{
        SceneAnim.setCall( "fightSceneAnim", AnimCtrl.finishCall );
    }

    static dispose = ()=>{
        SceneAnim.delCall( "fightSceneAnim" );
    }

    static finishCall = ( obj: any )=>{
        fighterAnimMap.forEach( fighterData => {
            if ( fighterData === obj ){
                fighterAnimMap.delete( fighterData );

                if (  fighterData.obj3DFlag === RoleAnimFlags.skill1 
                        || fighterData.obj3DFlag === RoleAnimFlags.behit  ){

                    FighterAnim.toAnim( fighterData, RoleAnimFlags.stand );
                }
            }
        } );
        
        if ( fighterAnimMap.size > 0 ){
            FightSceneCtrl.animActive( true );
        }else{
            FightSceneCtrl.animActive( false );
        }
    }

    static addAnim = ( fighterData: FighterData )=>{
        fighterAnimMap.set( fighterData, fighterData );
    }
}

class FightEffect {
    static effect = ( fighterData: FighterData, effectFlag: number )=>{
        switch ( effectFlag ){
            case FightEffectFlag.SKILL1 : {
                FightEffect.skill_1( fighterData );
                break;
            }
            case FightEffectFlag.BEHIT : {
                FightEffect.hitted( fighterData );
                break;
            }
        }
    }
    static skill_1 = ( fighterData: FighterData )=>{
        let effect: EffectData;

        effect   = new EffectData;
        effect.id        = fighterData.fighter.id;
        effect.playAnim  = { name: "eff_rolem_sk1", isOnce: true, id: effect.id };
        effect.effectName = "eff_rolem_sk1";
        effect.finishCall= ()=>{ 
                            fighterEffectMap.delete( effect.id );
                            FightSceneCtrl.sceneRemove( effect );

                            delete effect.effectName;
                            delete effect.finishCall;
                            delete effect.id;
                            delete effect.playAnim;
                            delete effect.type;
                        }

        EffectCtrl.addEffect( effect );
        FightSceneCtrl.sceneCreate( effect, fighterData.obj3D._show.old, effect.type );
    }

    static hitted = ( fighterData: FighterData )=>{
        let effect: EffectData;

        effect   = new EffectData;
        effect.id        = fighterData.fighter.id;
        effect.playAnim  = { name: "eff_hit_rolem_common", isOnce: true, id: effect.id };
        effect.effectName = "eff_hit_rolem_common";
        effect.finishCall= ()=>{ 
                            fighterEffectMap.delete( effect.id );
                            FightSceneCtrl.sceneRemove( effect );

                            delete effect.effectName;
                            delete effect.finishCall;
                            delete effect.id;
                            delete effect.playAnim;
                            delete effect.type;
                        }

        EffectCtrl.addEffect( effect );
        FightSceneCtrl.sceneCreate( effect, fighterData.obj3D._show.old, effect.type );
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
        fighterEffectMap.forEach( (effect) => {
            if ( effect.id === (obj as number) ){
                effect.finishCall();
            }
        } );

        if ( fighterEffectMap.size > 0 ){
            FightSceneCtrl.effectActive( true );
        }else{
            FightSceneCtrl.effectActive( false );
        }
    }
    static addEffect = ( effect: EffectData )=>{
        FightSceneCtrl.effectActive( true );

        fighterEffectMap.set( effect.id, effect );
    }
}


// ========================================方法定义


// ========================================立即运行
const init = ()=>{
    EffectCtrl.init();
    AnimCtrl.init();
};
init();
