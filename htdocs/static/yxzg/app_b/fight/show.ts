/*
 * 战斗显示处理
 */

// ============================== 导入
import { mgr } from "../../app/scene/scene";

import { globalSend, globalReceive } from "../../app/mod/pi";
import { setShowListener, setWait as activeEventList, setWait } from "../../app/scene/scene_show";

import { getSelf, mapList as FighterList  } from "./fight";
import { getGlobal } from "../../pi/widget/frame_mgr";
//mod
import { Cach } from "../../app/mod/cach";

import { FSmgr } from "../../fight/scene";
import { FightSceneUI } from "./fightSceneUI";
import { Fighter } from "../../fight/class";
import { CardAction } from "../card/cardAction";
import { CardMenu }    from "../card/cardMenu";
import { AttrCfg }  from "./attrBase";
import { FightScene } from "./fightScene";
import { FightSceneCtrl } from "./fightSceneCtrl";
import { setFightFlag, FightFlags }     from "./fightBase";

import { openFrame as openPlayerMenu }      from "../menu/playerMenu";
import { openFrame as openSettingMenu }     from "../menu/settingMenu";


let FightCurrFlag: string;

export class ShowFunList {
    //换成飘字列表
    static cach = new Cach();

    static fightInit = ()=>{
        console.log("fightInit::")
        FightSceneCtrl.init();
        FightSceneUI.init();
        CardAction.init();

        CardAction.initCheckCardHitFunc( FightScene.getCardHit );

        openPlayerMenu();
        openSettingMenu();

        setFightFlag( FightFlags.INIT );
    }

    static fightDispose = ()=>{
        console.log("fightDispose::");
        
        CardAction.dispose();
        FightSceneUI.dispose();
        FightSceneCtrl.dispose();

        setFightFlag( FightFlags.DISPOSED );

        setWait( false );
    }

    static recordFightFlag = ( flag: number )=>{

    }

    //插入模型
    static insertFighter = (e) => {
        console.log("insertFighter::",e)
        let fighter: Fighter;

        setFightFlag( FightFlags.BEGIN );

        fighter     = FighterList[e.fighter.id];

        FightSceneUI.createFighter( fighter );
        CardAction.initFighter( e );

    }
    
    // "type","fighter","target","r"
    static damage = (e) => {
        console.log("damage::",e)

        FightSceneUI.damage2( e.fighter, e.target, e.r );
    }

    // 移除伤害冒字节点
    static damageAnim = (arg, index,now) => {
        
    }
    
    //
    static useCard = (e) => {
        console.log("useCard::",e)
        
        setFightFlag( FightFlags.ING );
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

        e.attrs.forEach( ele => {
            AttrFunc.resetAttr( ele[0], e.fighter, ele[1] );
        });
    }
    
    // "type","fighter","target","card","buff"
    static releaseCard = (e) => {
        console.log("releaseCard::",e)
    }
    
    // "type","class","fighter","target","buff"
    static addBuff = (e) => {
        console.log("addBuff::",e);
        // FightSceneUI.addBuff2( e.target, e.buff );
        let buffList: Array<any>;
        
        buffList = FSmgr.blendBuff( e.target );

        if ( buffList !== undefined ){
            buffList.forEach( ele => {
                FightSceneUI.updateBuff2( e.target, ele );
            } );
        }
    }

    // "type","class","fighter","effect","value"
    static clearBuffer = ( e: any )=>{
        console.log("clearBuffer::",e)
        FightSceneUI.clearBuff2( e.fighter );
    }

    // "type","class","fighter","buff","key","value"
    static updateBuffer= ( e: any )=>{
        console.log("updateBuffer::",e)
        let buffList: Array<any>;
        
        buffList = FSmgr.blendBuff( e.fighter );

        if ( buffList !== undefined ){
            buffList.forEach( ele => {
                FightSceneUI.updateBuff2( e.target, ele );
            } );
        }
    }

    // "type","fighter"
    static singleRound = (e) => {
        console.log("singleRound::",e)
    }
    // "type","fighter","scrap","expend"
    static endSingleRound = ( e: any )=>{
        console.log("endSingleRound::",e)

        CardAction.endCurrRound( e );
    }

    // "type","fighter"
    static removeFighter = ( e: any )=>{
        console.log("removeFighter::",e)
        FightSceneUI.removeFighter( e.fighter );

        delete FighterList[ e.fighter ];
    }

    static moveCards = ( e: any )=>{
        console.log("moveCard::",e)
        
        CardAction.moveCards( e );
    }

    static takeCards = ( e: any )=>{
        console.log("takeCards::",e)

        CardAction.takeCards( e );
    }

    static restCards = ( e: any )=>{
        console.log("restCards::",e)

        CardAction.restCards( e );
    }

    static endRound = ( e: any )=>{
        console.log("endRound::",e)
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
            CardMenu.updatePower();
        }
    }
    
    static resetBlock = ( fighterID: number, num: number )=>{
        let fighter: Fighter;
    
        fighter = FighterList[ fighterID ];
    
        fighter.block   = num;
        
        FightSceneUI.updateBlock2( fighterID, num );
    }
}

let callDisposeTime: any;
const callFightDispose = ()=>{
    
    if ( callDisposeTime !== undefined ){
        clearTimeout( callDisposeTime );
    }

    if ( FightSceneCtrl.isFrameEnd() ){

        ShowFunList.fightDispose();

    }else{

        callDisposeTime = setTimeout( callFightDispose, 50 );

    }
}



setShowListener("insert",       ShowFunList.insertFighter);
setShowListener("singleRound",  ShowFunList.singleRound);
setShowListener("damage",       ShowFunList.damage);
setShowListener("useCard",      ShowFunList.useCard);
setShowListener("restAttr",     ShowFunList.restAttr);
setShowListener("releaseCard",  ShowFunList.releaseCard);

setShowListener("addBuff",      ShowFunList.addBuff);
setShowListener("updateBuffer", ShowFunList.updateBuffer);
setShowListener("clearBuff",    ShowFunList.clearBuffer);

setShowListener("remove",       ShowFunList.removeFighter);
setShowListener("endSingleRound",	ShowFunList.endSingleRound );
setShowListener("cardsMove",	    ShowFunList.moveCards );

setShowListener("takeCards",	    ShowFunList.takeCards );
setShowListener("restCards",	    ShowFunList.restCards );

setShowListener("endRound",	        ShowFunList.endRound );


//注册全局监听
globalReceive({
	"fightOver":() => {
        setFightFlag( FightFlags.END );
        callDisposeTime = setTimeout( callFightDispose, 50 );
	}
});
