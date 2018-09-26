
/**
 * version: XXXXXXX
 *      描述：
 *      战斗场景表现
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { globalReceive } from "../../../app/mod/pi";
import { Fighter } from "../../../fight/class";

import { Ambient, CameraFlags }  from "../../sceneAmbient/ambient";
import { FightEffectFlag } from "./effectBase";

import { getSelf } from "../fight";
import { FightSceneCtrl, FighterMap }   from "../fightSceneCtrl";

import { FighterData } from "./fightSceneUIBase";
import { FightEffect }  from "./effectBase";
import { FighterAnim } from "./animBase";
import { SelectEffectFunc } from "./selectEffectBase";
import { EnemyPosList_, FriendPosList, RoleAnimFlags,
    RoleTplList, RoleNameList, MonsterNameList, MonsterTplList, 
    ReadMonsterAnim, ReadRoleAnim } from "./fightBase";


// ======================================== 常量定义
const SceneSelectFlags = [ "Friend", "Enemy", "ALLFriend", "ALLEnemy", "NONE" ];


// ======================================== 变量声明
let frameIsActive: boolean = false;
let currHit: FighterData;


// ========================================类定义
export class FightSceneFight {
    static init = ()=>{
        currHit = undefined;
    }
    static dispose = ()=>{
        currHit = undefined;
    }

    // 创建一个fighter
    static create = ( fighterData: FighterData, totalNum?: number )=>{

        let self: Fighter;

        self    = getSelf();

        console.log( "FightSceneFight create", fighterData.fighter.id );

        if ( fighterData.isEnemy ){
            FightSceneFight.createMonster( fighterData );
        }else{
            if ( fighterData.fighter.id !== self.id ){
                FightSceneFight.createPerson( fighterData );
            }
        }
        
    }

    private static createPerson = ( fighterData: FighterData )=>{
        let data: any, roleName: string;
        let pos: Array<number>;

        pos         = FriendPosList[fighterData.campIndex];
        roleName    = RoleNameList[0];
        data        = {
                        rayID: fighterData.fighter.id,
                        name: roleName,
                        position: pos,
                        playAnim: {
                            name: ReadRoleAnim( roleName, RoleAnimFlags.stand ),
                            isOnce: false
                        },
                        lookAt: EnemyPosList_[fighterData.campIndex][0]
                    }

        fighterData.obj3D = data;

        FightSceneCtrl.createFighter( data, RoleTplList[0] );

        // Ambient.createStage( { x: pos[0], y: pos[2], type: 1, anim: false } );
    }

    private static createMonster = ( fighterData: FighterData )=>{
        let data: any, monsterName: string;
        let pos: Array<number>;

        pos     = EnemyPosList_[fighterData.campList.length][fighterData.campIndex];
        monsterName = MonsterNameList[0];

        data    = {
                    rayID: fighterData.fighter.id,
                    name: monsterName,
                    position: pos,
                    playAnim: {
                        name: ReadMonsterAnim( monsterName, RoleAnimFlags.stand ),
                        isOnce: false
                    },
                    lookAt: FriendPosList[0]
                }

        fighterData.obj3D = data;

        FightSceneCtrl.createFighter( data, MonsterTplList[0] );

        // Ambient.createStage( { x: pos[0], y: pos[2], type: 3, anim: false } );
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
        fighterData.obj3DFlag   = RoleAnimFlags.behit;

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

    // 获取命中目标
    static getCardHit = ( { x, y }:{x: number, y: number} )=>{
        let hitRes: boolean, hitID: number, tempFighter: FighterData;

        hitRes  = false;
        FighterMap.forEach( fighterData => {
            if ( hitRes === false || hitRes === undefined ){
                hitID       = fighterData.fighter.id; 
                // hitRes      = FightSceneCtrl.checkCardHit( { x, y }, fighterData.obj3D._show.old ); 
                hitRes      = FightSceneCtrl.checkCardHitByXRange( { x, y }, fighterData ); 
                tempFighter = fighterData;
            }
        } );
        
        if ( hitRes === false || hitRes === undefined ){
            currHit     = undefined;
            hitID       = undefined;
        }else{
            currHit     = tempFighter;
        }
        return hitID;
    }
    static updateHitTarget = ( id )=>{
        FighterMap.forEach( (fighterData, key) =>{
            if ( id !== key ){
                if ( fighterData.eff !== undefined ){
                    fighterData.eff.finishCall();
                }
                if ( fighterData.selectEff !== undefined) {
                    fighterData.selectEff.finishCall();
                }
            }else{
                // if ( fighterData.eff === undefined && fighterData.fighter.hp > 0 ){
                //     FightEffect.effect( fighterData, FightEffectFlag.SELECT );
                // }
                if ( fighterData.selectEff === undefined && fighterData.fighter.hp > 0 ){
                    SelectEffectFunc.createSelectEffect(fighterData);
                }
            }
        } );
    }
    static clearCardHit = ()=>{
        currHit     = undefined;

        FighterMap.forEach( fighterData =>{
            if ( fighterData.eff !== undefined ){
                fighterData.eff.finishCall();
            }
            if ( fighterData.selectEff !== undefined){
                fighterData.selectEff.finishCall();
            }
        } );
    }

    static update = ()=>{

        FighterMap.forEach( fighterData =>{

        } );
    }

    static isFrameEnd = ()=>{
        return !frameIsActive;
    }

}

// ========================================方法定义
/**
 * 卡牌移动时 卡牌目标检测，更新目标选择特效
 * @param param 
 */
const sceneCardMoveTarget = ( param: any )=>{
    let id: number;

    id = FightSceneFight.getCardHit( { x: param.x, y: param.y } );

    if ( param.targetType < 10 ){
        if ( param.targetNum === 0 ){
            FighterMap.forEach( fighterData =>{
                if ( fighterData.isEnemy === true ){
                    if ( fighterData.eff !== undefined ){
                        fighterData.eff.finishCall();
                    }
                }else{
                    // if ( fighterData.eff === undefined ){
                    //     FightEffect.effect( fighterData, FightEffectFlag.SELECT );
                    // }
                    if ( fighterData.selectEff !== undefined) {
                        fighterData.selectEff.finishCall();
                    }
                }
            } );
            
            id  = undefined;
        }else{
            if ( id !== undefined && FighterMap.get( id ).isEnemy !== true ){
                FightSceneFight.updateHitTarget( id );
            }else{
                !id && FightSceneFight.clearCardHit();
                id  = undefined;
            }
        }
    }else{
        if ( param.targetNum === 0 ){
            FighterMap.forEach( fighterData =>{
                if ( fighterData.isEnemy !== true ){
                    if ( fighterData.eff !== undefined ){
                        fighterData.eff.finishCall();
                    }
                    if ( fighterData.selectEff !== undefined) {
                        fighterData.selectEff.finishCall();
                    }
                }else{
                    // if ( fighterData.eff === undefined ){
                    //     FightEffect.effect( fighterData, FightEffectFlag.SELECT );
                    // }
                    if (fighterData.selectEff === undefined) {
                        SelectEffectFunc.createSelectEffect(fighterData);
                    }
                }
            } );

            id  = undefined;
        }else{
            if ( id !== undefined && FighterMap.get( id ).isEnemy === true ){
                FightSceneFight.updateHitTarget( id );
            }else{
                !id && FightSceneFight.clearCardHit();
                id  = undefined;
            }
        }
    }
    param.cb && param.cb( id );
}

// ========================================立即运行
const init = ()=>{
    globalReceive( {
        // x, y, targetType, targetNum, cb
        "sceneCardMoveTarget": ( param: any )=>{
            sceneCardMoveTarget( param );
        }
    } );
};
init();
