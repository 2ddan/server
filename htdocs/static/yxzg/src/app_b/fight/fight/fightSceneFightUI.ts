
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend } from "../../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIDataState } from "../../../app/scene/uiNode";
import { UIDataText } from "../../../app/scene/uiNodeCreator";
import { UINode } from "../../../app/scene/uiNodeBase";

import { Fighter } from "../../../fight/class";

import { Ambient, CameraFlags } from "../../sceneAmbient/ambient";


import { getSelf } from "../fight";
import { FightSceneCtrl, FighterMap } from "../fightSceneCtrl";

import { FighterData, FighterSizeCfg, FighterActionData, ActionType, BuffData }  from "./fightSceneUIBase";
import { BuffNode, BuffFunc } from "./bufferBase";
import { HPFunc } from "./hpBase";
import { DamageFunc } from "./damage";
import { BlockFunc } from "./blockBase";
import { FightSceneFight } from "./fightSceneFight";
import { EnemyPosList_, FriendPosList } from "./fightBase";
import { IntentFunc } from "./intentBase";
import { SelectEffectFunc } from "./selectEffectBase";
import { FighterDetail } from "./fighterDetail";
import { createFightStartAnim } from "./fightStartAnim";



// ========================================常量定义

// ========================================导出接口


// ========================================数据结构


// ========================================类定义

export class FightSceneFightUI {
    static isCreated = ()=>{
        return FightUIIsCreated;
    }
    static init = ( cb?: Function )=>{

        FightUIIsCreated = true;

        // 控制转场 镜头动画 激活状态
        CameraFrameIsActive = true;

        // 阻塞 战斗逻辑 的推送
        globalSend( "changeFighteAnimState", true );

        // Ambient.modifyCamera( CameraFlags.Fight, FightSceneFightUI.initEnd );

        createFightStartAnim( {
                        fighterList: enemyList,
                        cameraFlag: CameraFlags.Fight,
                        cb: ()=>{ FightSceneFightUI.initEnd(); cb && cb();  }
                    } );
    }
    // 进入战斗 镜头动画结束时 的处理
    static initEnd = ()=>{
        let self: Fighter;
        self    = getSelf();

        // 战斗内 UI
        FightSceneFightUI.openFrame();

        // 战斗内 fighter 详细信息 UI
        FighterDetail.init();

        // 接收 战斗逻辑事件
        globalSend( "changeFighteAnimState", false );

        FightSceneFightUI.initFighter( self );
        FightSceneFightUI.createFighterUIDisplays();

        CameraFrameIsActive = false;
    }
    /**
     * 退出战斗
     * @param isFail  失败时需要清除玩家模型， 镜头直接变化
     * 
     */
    static dispose = ( isFail: boolean, cb?: Function )=>{

        if ( isFail === true ){
            let self: Fighter, playerData: FighterData;
            self        = getSelf();
            playerData  = FighterMap.get( self.id );

            if ( friendList.indexOf( playerData ) >= 0 ){
                friendList.splice( playerData.campIndex, 1 );
            }

            FightSceneFightUI.disposeFighter( playerData );

            FighterDetail.dispose();
            FightSceneFightUI.closeFrame();

            HPFunc.dispose(  );
            BlockFunc.dispose(  );
            BuffFunc.dispose(  );
            IntentFunc.dispose(  );

            Ambient.modifyCamera( CameraFlags.Normal );
            cb && cb();
        }else{
            
            FighterDetail.dispose();
            FightSceneFightUI.closeFrame();

            HPFunc.dispose(  );
            BlockFunc.dispose(  );
            BuffFunc.dispose(  );
            IntentFunc.dispose(  );

            Ambient.modifyCamera( CameraFlags.Normal, cb );
        }

  
        
        FightUIIsCreated = false;
    }
    
    /**
     * 战斗结束 在结算时，屏蔽 战斗内操作
     */
    static fightOver = ()=>{
        FighterDetail.dispose();
    }
    
    static openFrame = ()=>{
        if (frame !== undefined){ return ; }; //throw new Error( `${frameName} 不能重复创建.` ) }
        
        frameName   = "FightUI0"
        frame       = UINodeCtrl.openFrame( {
                        frameClass: frameClass, 
                        nodeName:   frameName, 
                        jsonNew:    undefined, 
                        data:       frameData
                    } );

        FightSceneCtrl.activeFrame();

        HPFunc.initFrame( frame );
        BlockFunc.initFrame( frame );
        BuffFunc.initFrame( frame );
        IntentFunc.initFrame( frame );
        SelectEffectFunc.initFrame( frame );
        
        FightSceneCtrl.setFightUIFrameFunc( FightSceneFightUI.update );
    }
    
    static  closeFrame = ()=>{
        let self: Fighter;

        if (frame === undefined){ throw new Error( `${frameName} 未被创建.` ) };

        self    = getSelf();

        FightSceneCtrl.puaseFrame();

        FighterMap.forEach( (fighterData, id) => {

            FightSceneFightUI.removeFighter( id );

        } );

        UINodeCtrl.removeNode( frame );

        frame   = undefined;
    }
    
    static initFighter = ( fighter: Fighter, totalNum?: number )=>{
        
        console.log("initFighter::");

        let fighterData: FighterData;

        fighterData = FighterMap.get( fighter.id );

        if ( fighterData === undefined ){
            fighterData     = new FighterData;
            FighterMap.set( fighter.id, fighterData );
        }

        fighterData.fighter = fighter;
        fighterData.totalHP = fighter.max_hp;
        fighterData.currHP  = fighter.hp;

        if ( fighter.camp === 1 ){

            fighterData.isEnemy     = false;
            fighterData.campList    = enemyList;
            fighterData.campIndex   = friendList.length;
            friendList.push( fighterData );

        }else{

            fighterData.campList    = enemyList;
            fighterData.campIndex   = enemyList.length;
            enemyList.push( fighterData );
            
        }
        

        fighterData.createObjCall = ()=>{
            FightSceneFightUI.createFighterDisplay( fighterData );
        }

        fighterData.createUICall = ()=>{
            FightSceneFightUI.createFighterUIDisplay( fighterData );
        }
    }

    private static createFighterDisplays = ()=>{
        FighterMap.forEach( fighterData => {
            FightSceneFightUI.createFighterDisplay( fighterData );
        } );
    }

    private static createFighterDisplay = ( fighterData: FighterData )=>{
        FightSceneFight.create( fighterData );
    }
    
    private static createFighterUIDisplays = ()=>{
        FighterMap.forEach( fighterData => {
            FightSceneFightUI.createFighterUIDisplay( fighterData );
        } );
    }

    private static createFighterUIDisplay = ( fighterData: FighterData )=>{

        FighterDataFunc.initFighter2DPos( fighterData );

        HPFunc.createHP( fighterData );

        fighterData.campCount   = fighterData.campList.length;

        if ( fighterData.isEnemy ){
            FightSceneFightUI.updateIntent( fighterData );
        }
    }
    
    static removeFighter = ( fighterID: number )=>{
        let fighterData: FighterData, self: Fighter, index: number;

        self            = getSelf();
        fighterData     = FighterMap.get( fighterID );
        if ( fighterData !== undefined ){
            
            if ( fighterData.isEnemy !== true ){

                index   = friendList.indexOf( fighterData );
                friendList.splice( index, 1 );

            }else{

                index   = enemyList.indexOf( fighterData );
                enemyList.splice( index, 1 );

            }

            if ( fighterID !== self.id ){
                FightSceneFightUI.disposeFighter( fighterData );
            }else{
                FightSceneFightUI.disposeFighter2( fighterData );
            }

        }
    }

    /**
     * 移除 死亡fighter 包括模型
     */
    private static disposeFighter = ( fighterData )=>{
        HPFunc.disposeFighter( fighterData );
        BlockFunc.disposeFighter( fighterData );
        BuffFunc.disposeFighter( fighterData );
        IntentFunc.disposeFighter( fighterData );
        SelectEffectFunc.dispose( fighterData );

        fighterData.eff && fighterData.eff.finishCall();
        fighterData.selectEff && fighterData.selectEff.finishCall();
        FightSceneFight.remove( fighterData );
        FighterMap.delete( fighterData.fighter.id );
    }

    /**
     * 移除 fighter 不包括模型
     */
    private static disposeFighter2 = ( fighterData )=>{
        HPFunc.disposeFighter( fighterData );
        BlockFunc.disposeFighter( fighterData );
        BuffFunc.disposeFighter( fighterData );
        IntentFunc.disposeFighter( fighterData );
        SelectEffectFunc.dispose( fighterData );
        
        fighterData.eff && fighterData.eff.finishCall();
        fighterData.selectEff && fighterData.selectEff.finishCall();
    }

    /**
     * 战斗逻辑 调用 移除Buff, 
     */
    static removeBuff2 = ( fighterID: number, bufferID: number )=>{

        console.table( [ "removeBuff2", fighterID, bufferID ] );

        let fighterData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.removeBuff;
        actionData.data = { bufferID: bufferID };

        fighterData     = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
        
        FightSceneFightUI.updateIntent( fighterData );

    }
    
    /**
     * 内部进行 移除buff的动画
     */
    static removeBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{

        let buff: BuffNode;
        let buffList: Array<BuffData>, buffIndex: number;

        buff            = fighterData.nodeBufferMap.get( actionData.data.bufferID );

        BuffFunc.removeBuff( buff );

        buffList        = fighterData.bufferList;
        buffIndex       = buffList.indexOf( actionData.data.bufferID );
        
        buffList.splice( buffIndex, 1 );

        for ( let i=buffIndex, len=buffList.length; i<len; i++ ){
            BuffFunc.updateBufferState( fighterData, buffList[i].icon, i );
        }
    }

    /**
     * 战斗逻辑 调用 更新Buff, 
     */
    static updateBuff2 = ( fighterID: number, data: BuffData )=>{
        console.table( [ "updateBuff2", fighterID, data ] );
        
        let fighterData: FighterData, buff: BuffNode;
        let actionData: FighterActionData;

        actionData  = new FighterActionData;
        actionData.type = ActionType.updateBuff;
        actionData.data = { buffData: data };

        fighterData = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
        
        FightSceneFightUI.updateIntent( fighterData );
    }

    /**
     * 内部进行 更新buff的动画
     */
    static updateBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{
        let buff: BuffNode, bufferIcon: string, num: number;
        bufferIcon  = (actionData.data.buffData.icon);
        buff        = fighterData.nodeBufferMap.get( bufferIcon );

        if ( buff === undefined ){
            FighterDataFunc.createBuffer( fighterData, (actionData.data.buffData) );
        }else{
            FighterDataFunc.updateBuffer( fighterData, (actionData.data.buffData) );
        }
    }

    /**
     * 战斗逻辑 调用 清除Buff, 
     */
    static clearBuff2 = ( fighterID: number )=>{

        console.table( [ "clearBuff2", fighterID ] );

        let fighterData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.clearBuff;

        fighterData     = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
        
        FightSceneFightUI.updateIntent( fighterData );
    }

    /**
     * 内部进行 清除buff的动画
     */
    static clearBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{

        fighterData.nodeBufferMap.forEach( ( buff ) => {
            UINodeCtrl.removeNode( buff.node );
            UINodeCtrl.removeNode( buff.nodeText );
        } );

        fighterData.bufferList.length   = 0;
        fighterData.nodeBufferMap.clear();

    }
    
    /**
     * 战斗逻辑 调用 产生伤害, 
     */
    static damage2 = ( fighterID: number, targetID: number, damage: number )=>{
        let targetData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.damage;
        actionData.data = { damage: damage };

        targetData  = FighterMap.get( targetID );
        targetData.actionGetList.push( actionData );

        fighterID !== undefined && FightSceneFight.doSkill( fighterID );
        FightSceneFight.beHit( targetID );
    }

    /**
     * 内部进行 产生伤害的动画
     */
    static damage = ( fighterData: FighterData, actionData: FighterActionData )=>{
        let damage: number;

        damage  = fighterData.fighter.hp < actionData.data.damage ? fighterData.fighter.hp : actionData.data.damage ;
        fighterData.fighter.hp   -= damage;
        fighterData.fighter.hp   = fighterData.fighter.hp < 0 ? 0 : fighterData.fighter.hp;

        if ( fighterData.fighter.hp === 0 ){
            FightSceneFight.doDie( fighterData.fighter.id );
        }

        HPFunc.updateHP( fighterData, damage );
        DamageFunc.addDamage( actionData.data.damage, frame, fighterData.nodeLeft, fighterData.nodeTop, fighterData.fighter.id );
    }
    
    static updateIntent = ( fighterData: FighterData )=>{
        
        if ( friendList.indexOf( fighterData ) >= 0 ){

            enemyList.forEach( ( tempData )=>{
                IntentFunc.update( tempData );
            } );

        }else{

            IntentFunc.update( fighterData );

        }
    }

    static updateEnemyIntents = ()=>{
        enemyList.forEach( ( tempData )=>{
            IntentFunc.update( tempData );
        } );
    };


    /**
     * 战斗逻辑 调用 更新格挡, 
     */
    static updateBlock2 = ( fighterID: number, block: number )=>{
        let fighterData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.updateBlock;
        actionData.data = { block: block };

        fighterData  = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
    }


    /**
     * 内部进行 更新格挡的动画
     */
    static updateBlock = ( fighterData: FighterData, actionData: FighterActionData )=>{

        fighterData.fighter.block   = actionData.data.block;

        if ( fighterData.fighter.block === 0 ){
            BlockFunc.disposeFighter( fighterData );
            HPFunc.changeHPWithBlock( fighterData, false );
        }else{
            if ( fighterData.nodeBlock === undefined ){
                BlockFunc.create( fighterData );
                HPFunc.changeHPWithBlock( fighterData, true );
            }else{
                BlockFunc.update( fighterData );
            }
        }
    }

    static update = ()=>{
        FighterMap.forEach( fighterData => {
            let actionData: FighterActionData;
            let actionFunc: Function;

            while ( fighterData.actionGetList.length > 0 ){
                actionData  = fighterData.actionGetList.shift();
                actionFunc  = FightSceneFightUI[actionData.type];

                fighterData.actionCurrList.push( actionData );
                
                if ( FightUIIsCreated ){
                    actionFunc( fighterData, actionData );
                }

            } ;

        } );

        // ==========================LOG
        LOG_INTERVAL_COUNTER ++;
        if ( LOG_INTERVAL_COUNTER === 360 ){
            LOG_INTERVAL_COUNTER = 0;
            console.table([ BuffFunc._logMapSize(), BlockFunc._logMapSize(), HPFunc._logMapSize(), DamageFunc._logMapSize() ]);
        }
        // ==========================LOG

        if (    BuffFunc.isFrameEnd() 
            &&  BlockFunc.isFrameEnd()
            &&  HPFunc.isFrameEnd()
            &&  DamageFunc.isFrameEnd()
            &&  !CameraFrameIsActive   
        ){
            FightSceneCtrl.frameActive( false );
        }else{
            FightSceneCtrl.frameActive( true );
        }
    }

}

class FighterDataFunc {
    static createBuffer = ( fighterData: FighterData, data: BuffData )=>{
        let buff: BuffNode;
        buff    = new BuffNode;
        buff.buffIndex  = fighterData.bufferList.length;
        buff.buffIcon   = data.icon;
        buff.number     = data.number;
        buff.color      = data.color;

        BuffFunc.createNodeBuff( buff, fighterData );

        fighterData.bufferList.push( data );
        fighterData.nodeBufferMap.set( data.icon, buff );
    }
    static removeBuffer = ( fighterData: FighterData, bufferID: number )=>{

    }
    static createName = ( fighterData: FighterData )=>{
        let node: UINode, jsonNew: any, left: number, top: number, txt: string, z: number;
        let nodeName: string, diffLeft: number, isEnemy: boolean;

        isEnemy = fighterData.isEnemy;
        txt     = fighterData.fighter.name;
        nodeName= txt;
        left    = fighterData.nodeLeft +40;
        top     = fighterData.nodeTop -20;
        z       = frame.z +1 ;
        jsonNew         = {
                            left: left,
                            top: top,
                            z_relat: z,
                            text: txt
                        } ; 

        node    = UINodeCtrl.appendNode({
                    parent: frame,
                    nodeName,
                    jsonOrg: nodeNameJson,
                    jsonNew: jsonNew,
                    data: undefined
                });
            
        fighterData.nodeName   = node;

    }

    /**
     * 初始化 fighter UI 界面定位
     */
    static initFighter2DPos = ( fighterData: FighterData )=>{
        let pos: Array<number>;

        if ( fighterData.isEnemy === true ){
            pos = EnemyPosList_[fighterData.campList.length][fighterData.campIndex +fighterData.campList.length];
        }else{
            pos = FriendPosList[fighterData.campIndex+3];
        }

        fighterData.nodeLeft    = pos[0];
        fighterData.nodeTop     = pos[1];
    }

    static updateBuffer = ( fighterData: FighterData, data: BuffData )=>{
        let buff: BuffNode, dataText: UIDataText;

        buff        = fighterData.nodeBufferMap.get( data.icon );
        buff.number = data.number;
        buff.color  = data.color;

        dataText    = new UIDataText;
        dataText.text   = `${buff.number}`;
        UINodeCtrl.updateNodeData( buff.nodeText, dataText );

    }

    static updateAnim = ( fighterData: FighterData )=>{

    }
    static update = ()=>{
        FighterMap.forEach( fighterData => {

        } );
    }
}



// class IntendFunc {
//     static create = ( fighterData: FighterData )=>{

//     }
//     static update = ( fighterData: FighterData )=>{

//     }
//     static dispose = ( fighterData: FighterData )=>{

//     }
// }


// ========================================变量声明
let frame: UINode, frameData, frameJson, frameName, frameClass;
let nodeName: UINode, nodeNameJson: any, nodeBuffJson: any, nodeBuffTextJson: any;
let nodeHPJson: any, nodeHPJsonBG: any, nodeHPJsonImage: any;
let nodeBlockJson: any, nodeBlockTxtJson: any;


let fighterJson: any;
let enemyList: Array<FighterData>;
let friendList: Array<FighterData>;
let frameIsActive: boolean = false;
let CameraFrameIsActive: boolean = false;
// 战斗界面是否已创建
let FightUIIsCreated: boolean = false;
let LOG_INTERVAL_COUNTER: number = 0;

// ========================================方法定义


// ========================================立即运行

const init = ()=>{
    frameClass  = "FightUI";

    frameJson = {
        nodeName:    frameClass,
        nodeType:    "FRAME",
        width:   0, 
        height:  0,
        left:    0,    
        top:     0,
        z:       Z_ORDERS.FIGHT,
        z_relat: 0,
        nodes: [
            
        ],
        design: {
        },
        states: {
        },
        dataMatch: {   
        }
    };

    frameData = {
    };
    
    recordUIJson( frameClass, frameJson );

    enemyList   = [];
    friendList  = [];

    fighterJson = { nodeName: "", nodeType: "COLOR", bgColor: "", 
                    width: FighterSizeCfg.WIDTH, height: FighterSizeCfg.HEIGHT, 
                    left: 0, top: 0, z_relat: 0, opacity: 1  };
    nodeNameJson= { nodeName: "", nodeType: "TEXT", text: "", 
                    left: 0, top: 0, font: `normal normal ${80}px mnjsh`, 
                    font_space: -2,color: "#00ff00", align: "center", 
                    shadow_width: 1, shadow_color: "#000000", isCommon: false, z_relat: 0 };

 
};

init();