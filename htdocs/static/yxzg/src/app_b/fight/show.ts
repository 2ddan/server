/*
 * 战斗显示处理
 */

// ============================== 导入
import { mgr } from "../../app/scene/scene";

import { globalSend, globalReceive } from "../../app/mod/pi";
import { setShowListener, setWait as activeEventList, setWait } from "../../app/scene/scene_show";

import { getSelf, mapList as FighterList  } from "./fight";
//mod
import { Cach } from "../../app/mod/cach";

import { FSmgr } from "../../fight/scene";
import { Fighter, Card } from "../../fight/class";

import { Roll } from "../displayTag/roll";
import { Ambient } from "../sceneAmbient/ambient";
import { CardSelector } from "../card/cardSelector";
import { CardAction } from "../card/cardAction";

import { FightScene } from "./fightScene";
import { FightSceneCtrl, FighterMap } from "./fightSceneCtrl";

import { FightSceneFightUI }            from "./fight/fightSceneFightUI";
import { FightSceneFight }              from "./fight/fightSceneFight";
import { setFightFlag, FightFlags }     from "./fight/fightBase";
import { Camp } from "./camp/camp";

// ================================
const AttrCfg = {
    AttrList: [ "energy", "block" ]
}

/**
 * @description 枚举事件类型
 */
const  ETypeList0 = [
    "a", // fighter进入场景
    "b", // 单回合开始，某个fighter出手
    "c", // fighter结束自己的单回合
    "d", // 使用卡牌
    "e", // 大回合结束
    "f", // 抽卡
    "g", // 移动卡牌，把某个牌堆的牌移动到另外一个牌堆
    "h", // 释放卡牌
    "i", // 重置属性
    "j", // 技能或卡牌造成的伤害
    "k", // buff效果
    "l", // 清除buff效果
    "m", // 添加buff
    "n", // 更新buff属性
    "o", // 玩家手动选卡
    "p", // 复制卡牌,把某个牌堆的牌复制到另外一个牌堆
    "q", // 移除玩家
    "r",

    "s",
    "t",
    "u"
];

const ETypeList = [
    "insert"             , // fighter进入场景
    "singleRound"        , // 单回合开始，某个fighter出手
    "endSingleRound"     , // fighter结束自己的单回合
    "useCard"            , // 使用卡牌
    "endRound"           , // 大回合结束
    "takeCards"          , // 抽卡
    "cardsMove"          , // 移动卡牌，把某个牌堆的牌移动到另外一个牌堆
    "releaseCard"        , // 释放卡牌
    "restAttr"           , // 重置属性
    "damage"             , // 技能或卡牌造成的伤害
    "effect"             , // buff效果
    "clearBuff"          , // 清除buff效果
    "addBuff"            , // 添加buff
    "updateBuff"         , // 更新buff属性
    "selectCard"         , // 玩家手动选卡
    "copyCard"           , // 复制卡牌,把某个牌堆的牌复制到另外一个牌堆
    "remove"             , // 移除玩家
    "over"               ,
    
    "refreshEquipStar"   ,
    "refreshWeapon"      ,
    "revive"             
]

let FightCurrFlag: string;
export let EnemyRoundRecord: Array<number> = [];

export class ShowFunList {
    //换成飘字列表
    static cach = new Cach();

    static init = ()=>{
        FightSceneCtrl.init();
        FightScene.init();
        Ambient.init();
    }

    static dispose = ()=>{
        
        Ambient.dispose();
        FightScene.dispose();
        FightSceneCtrl.dispose();
    }

    static fightInit = ()=>{
        console.log("fightInit::")

        // FightSceneFightUI.init( ShowFunList.initCardAction );

        globalSend( "changeFighteAnimState", false );
        setFightFlag( FightFlags.INIT );

    }

    static fightInitDisplay = ( cb?: Function )=>{
        console.log("fightInitDisplay::");

        FightSceneFightUI.init( ()=>{ 
            ShowFunList.initCardAction(); 
            cb && cb(); 
        } );

        setFightFlag( FightFlags.INIT );
    }

    static initCardAction = ()=>{
        let self: Fighter;

        self    = getSelf();

        CardAction.init();

        CardAction.initCheckCardHitFunc( FightSceneFight.getCardHit );
        CardAction.initClearCardHitFunc( FightSceneFight.clearCardHit );

        CardAction.initFighter( self );
    }
    
    //插入模型
    static insertFighter = (e) => {
        console.log("insertFighter::",e)
        let fighter: Fighter;
        let self: Fighter;

        self    = getSelf();

        if ( self.id !== e.fighter.id ){

            setFightFlag( FightFlags.BEGIN );
    
            fighter     = FighterList[e.fighter.id];
    
            FightSceneFightUI.initFighter( fighter );

        }else{
            // CardAction.initFighter( self );
        }

        globalSend( "changeFighteAnimState", false );
    }

    static fightDispose = ( isFail: boolean )=>{
        console.log("fightDispose::");
        
        globalSend( "changeFighteAnimState", true );

        CardAction.dispose();
        FightSceneFightUI.dispose( 
                                isFail, 
                                ()=>{ 
                                    globalSend( "changeFighteAnimState", false );
                                    globalSend( "fightDispose" );
                                    setFightFlag( FightFlags.DISPOSED );
                                } 
                            );


    }

    static recordFightFlag = ( flag: number )=>{

    }

    
    // "type","fighter","target","r"
    static damage = (e) => {

        console.table( [ "damage", e.r ] );

        FightSceneFightUI.damage2( e.fighter, e.target, e.r );
    }

    // 移除伤害冒字节点
    static damageAnim = (arg, index,now) => {
        
    }
    
    //
    static useCard = (e) => {
        console.log("useCard::",e)
    }
    
    static rest = {
        hp:(f,r)=>{
            f.showhp.textCon.show = `${f.name}费：${f.energy},血：${f.hp}`;
            mgr.setText(f.showhp);
        },
        energy:(f,r) => {
            f.showhp.textCon.show = `${f.name}费：${f.energy},血：${f.hp}`;
            mgr.setText(f.showhp);
        }
    }

    // "type","fighter","attrs"
    static restAttr = (e) => {
        console.log("restAttr::",e)

        if ( FightSceneFightUI.isCreated() === true ){
            e.attrs.forEach( ele => {
                AttrFunc.resetAttr( ele[0], e.fighter, ele[1] );
            });
        }else{
            globalSend( "changeFighteAnimState", false );
        }
    }
    
    // "type","fighter","target","card","events"
    static releaseCard = (e) => {
        console.log("releaseCard::",e);

        let typeMap: any = {};

        if (e.events !== undefined && e.events.length >0 ){
            e.events.forEach( tempE =>{
                if ( typeMap[tempE.type] === undefined ){
                    typeMap[tempE.type] = 0;
                }else{
                    typeMap[tempE.type]++;
                }

                    EventCfg[ tempE.type ]( tempE );
            } );
        }
    }
    
    // "type","class","fighter","target","buff"
    static addBuff = (e) => {
        console.log("addBuff::",e);
        // FightSceneFightUI.addBuff2( e.target, e.buff );
        
        ShowFunList.updateBuffer( { fighter: e.target } );
    }

    // "type","class","fighter","effect","value"
    static clearBuffer = ( e: any )=>{
        console.log("clearBuffer::",e)
        
        ShowFunList.updateBuffer( { fighter: e.fighter } );
    }

    // "type","class","fighter","buff","key","value"
    static updateBuffer = ( e: any )=>{
        console.log("updateBuffer::",e)
        
        let buffList: Array<any>;
        
        buffList = FSmgr.blendBuff( e.fighter );

        if ( buffList !== undefined ){
            buffList.forEach( ele => {
                FightSceneFightUI.updateBuff2( e.fighter, ele );
            } );
        }
    }

    // "type","fighter"  回合开始
    static singleRound = (e) => {
        console.log("singleRound::",e);

        // let self: Fighter;

        // self    = getSelf();

        // setWait( true );

        // if ( self.id === e.fighter ){
        //     Roll.show( { text1: "回合开始", text2: "你的回合", cb: ()=>{ setWait( false ) } } );

        //     FightSceneFightUI.updateIntent( self.id );

        //     CardAction.singleRound();

        // }else{
            
        // }

        if ( FightSceneFightUI.isCreated() === true ){

            ShowFunList.singleRoundDisplay( e );
            
        }else{

            ShowFunList.fightInitDisplay( ()=>{ ShowFunList.singleRoundDisplay( e ); } );
        }
    }
    static singleRoundDisplay = ( e )=>{
        
        console.log("singleRoundDisplay::",e)

        let self: Fighter;

        self    = getSelf();

        globalSend( "changeFighteAnimState", true );

        if ( self.id === e.fighter ){
            Roll.show( { 
                text1: "回合开始", 
                text2: "你的回合", 
                cb: ()=>{ 
                    globalSend( "changeFighteAnimState", false );
                } 
            } );

            EnemyRoundRecord.length = 0;

            FightSceneFightUI.updateEnemyIntents();

            CardAction.singleRound();

        }else{
            
            EnemyRoundRecord.push( e.fighter );
        }
    }
    // "type","fighter","scrap","expend"
    static endSingleRound = ( e: any )=>{

        console.log("endSingleRound::",e)

        CardAction.endCurrRound( e );

        FighterMap.forEach( fighterData => {
            ShowFunList.updateBuffer( {
                fighter: fighterData.fighter.id
            } );
        } );
    }
    /**
     * 处理 对手回合 结束信号，通知后台 前台的回合结束
     */
    static endEnemySingleRound = ( e: any )=>{

        FSmgr.endSingleRound( e.fighter ); 

        globalSend( "changeFighteAnimState", false );
    }

    // "type","fighter"
    static removeFighter = ( e: any )=>{
        console.log("removeFighter::",e);
        let self: Fighter;

        self    = getSelf();

        if ( self.id !== e.fighter ){
            FightSceneFightUI.removeFighter( e.fighter );
        }

        delete FighterList[ e.fighter ];
    }

    static moveCards = ( e: any )=>{
        console.log("moveCard::",e)
        
        CardAction.moveCards( e );
    }

    static takeCards = ( e: any )=>{
        console.log("takeCards::",e)

        let self: Fighter;

        CardAction.takeCards( e );
        
    }

    // "type","fighter","cards: { setName: [index] }"
    static resetCards = ( e: any )=>{
        console.log("resetCards::",e)

        let self: Fighter;

        self    = getSelf();

        if ( self.id === e.fighter ){
            for ( let setName in e.cards ){
                self[ setName ]   = e.cards[ setName ];
            }

            if ( FightSceneFightUI.isCreated() === true ){
                CardAction.resetCards( e );
            }else{
                globalSend( "changeFighteAnimState", false );
            }
        }else{
            globalSend( "changeFighteAnimState", false );
        }
    }

    static endRound = ( e: any )=>{
        console.log("endRound::",e)
    }

    static rewardCardSelect = ( param: any )=>{
        let cardList: Array<Card>, max: number, min: number;
        let selectType: string, callBack: Function;


    }

    static openPassMap = ( stageNow: any )=>{
        FightScene.openMap( stageNow );
    }

    static openFightScene = ()=>{
        FightScene.openFight();
    }

    static openCamp = ()=>{
        FightScene.openCamp( undefined );
    }

    // cardList, min, max, cb
    static selectCard = ( param: any )=>{
        CardSelector.showCards( {
            cardList: param.cardList,
            selectCall: param.cb,
            maxNum: param.maxNum,
            minNum: param.minNum,
            selectType: "GET"
        } );
    }

    // 选择关卡后， 进入
    static intoFloor = ( type: number )=>{
        
        switch ( type ){
            case 1: {
                ShowFunList.openFightScene();
                break;
            }
            case 2: {
                ShowFunList.openFightScene();
                break;
            }
            case 3: {
                ShowFunList.openFightScene();
                break;
            }
            case 4: {
                ShowFunList.openCamp();
                break;
            }
            case 5: {
                ShowFunList.openCamp();
                break;
            }
            case 6: {
                ShowFunList.openCamp();
                break;
            }
            case 7: {
                ShowFunList.openCamp();
                break;
            }
            case 8: {
                ShowFunList.openCamp();
                break;
            }
        }
    }

    // effect buff效果 "type","class","fighter","target","buff","effect","value"
    static effect = ( e )=>{
        switch ( e.effect ){
            case ("damage_normal"): 
            {
                e.r         = e.value;
                e.fighter   = undefined;
                ShowFunList.damage( e );
                break;
            }
            case ("damage_true"): 
            {
                e.r         = e.value;
                e.fighter   = undefined;
                ShowFunList.damage( e );
                break;
            }
            case (""): 
            {
                break;
            }
        }
    }

    // 战斗结束 在结算时的处理
    static over = ()=>{
        FightSceneFightUI.fightOver();
        CardAction.over();
    }
}

class AttrFunc {
    static resetAttr = ( attr: string, fighterID: number, data: any )=>{
        switch (attr) {
            case AttrCfg.AttrList[0]: {
                AttrFunc.resetEnergy( fighterID, data );
                break;
            }
            case AttrCfg.AttrList[1]: {
                AttrFunc.resetBlock( fighterID, data );
                break;
            }
        }
    }
    
    static resetEnergy = ( fighterID: number, num: number )=>{
        let self: Fighter;
    
        self    = getSelf();
    
        if ( fighterID === self.id ){
            self.energy = num;
            CardAction.changeEnergy();
        }
    }
    
    static resetBlock = ( fighterID: number, num: number )=>{
        let fighter: Fighter;
    
        fighter = FighterList[ fighterID ];
    
        fighter.block   = num;
        
        FightSceneFightUI.updateBlock2( fighterID, num );

        console.table( [ ["resetBlock", fighterID, num ] ] );
    }

}

let callFightOverTime: any;
const callFightOver = ( isFail: boolean )=>{

    if ( callFightOverTime !== undefined ){
        clearTimeout( callFightOverTime );
    }

    if ( FightSceneCtrl.isFrameEnd() ){


        ShowFunList.fightDispose( isFail );
        
        if ( isFail === true ){
            Ambient.clearStages();
            Ambient.removeSky();
        }

    }else{

        callFightOverTime = setTimeout( ()=>{ callFightOver( isFail ) }, 50 );

    }
}

const EventCfg = {
    "insert":       ShowFunList.insertFighter,
    "singleRound":  ShowFunList.singleRound,
    "damage":       ShowFunList.damage,
    "useCard":      ShowFunList.useCard,
    "restAttr":     ShowFunList.restAttr,
    "releaseCard":  ShowFunList.releaseCard,
    
    // "effect":       ShowFunList.updateBuffer,
    "addBuff":      ShowFunList.addBuff,
    "updateBuff":   ShowFunList.updateBuffer,
    "clearBuff":    ShowFunList.clearBuffer,
    
    "remove":       ShowFunList.removeFighter,
    "endSingleRound":	ShowFunList.endSingleRound ,
    "cardsMove":	    ShowFunList.moveCards ,
    
    "takeCards":	    ShowFunList.takeCards ,
    "resetCards":	    ShowFunList.resetCards ,
    
    "endRound":         ShowFunList.endRound ,
    "effect":       ShowFunList.effect,
}

setShowListener("insert",       ShowFunList.insertFighter);
setShowListener("singleRound",  ShowFunList.singleRound);
setShowListener("damage",       ShowFunList.damage);
setShowListener("useCard",      ShowFunList.useCard);
setShowListener("restAttr",     ShowFunList.restAttr);
setShowListener("releaseCard",  ShowFunList.releaseCard);

// setShowListener("effect",       ShowFunList.updateBuffer);
setShowListener("addBuff",      ShowFunList.addBuff);
setShowListener("updateBuff",   ShowFunList.updateBuffer);
setShowListener("clearBuff",    ShowFunList.clearBuffer);

setShowListener("remove",       ShowFunList.removeFighter);
setShowListener("endSingleRound",	ShowFunList.endSingleRound );
setShowListener("aiRoundEnd",	    ShowFunList.endEnemySingleRound );

setShowListener("cardsMove",	    ShowFunList.moveCards );

setShowListener("takeCards",	    ShowFunList.takeCards );
setShowListener("resetCards",	    ShowFunList.resetCards );

setShowListener("endRound",	        ShowFunList.endRound );
setShowListener("effect",	        ShowFunList.effect );

// 战斗结算
setShowListener("over",     ShowFunList.over );



//注册全局监听
globalReceive({
	"fightOver":( isFail: boolean ) => {
        setFightFlag( FightFlags.END );
        callFightOverTime = setTimeout( ()=>{ callFightOver( isFail ); }, 50 );
	},
	"reward":( param: any ) => {
        ShowFunList.rewardCardSelect( param );
    },
    "backStage": ( cfg )=>{
        ShowFunList.openPassMap( cfg );
    },
    "intoFloor": ( type: any )=>{
        ShowFunList.intoFloor( type );
    },
    "selectCard": ( param )=>{
        ShowFunList.selectCard( param );
    },
    "changeFighteAnimState": ( isActive: boolean )=>{
        if ( isActive === true ){
            setWait( true );
            CardAction.active( false );
        }else{
            setWait( false );
            CardAction.active( true );
        }
    }
});
