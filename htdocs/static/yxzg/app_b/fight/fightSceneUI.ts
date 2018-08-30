
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend } from "../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIDataState } from "../../app/scene/uiNode";
import { Fighter } from "../../fight/class";
import { UINode } from "../../app/scene/uiNodeBase";

import { FighterData, FighterDiffCfg, FighterSizeCfg, BuffCfg, FighterActionData, ActionType }  from "./fightSceneUIBase";
import { FightSceneCtrl, FighterMap } from "./fightSceneCtrl";
import { UIDataText } from "../../app/scene/uiNodeCreator";
import { readBuffURL, BuffNode, BuffFunc, BuffData } from "./bufferBase";
import { HPFunc } from "./hpBase";
import { DamageFunc } from "./damage";
import { BlockFunc } from "./blockBase";
import { FightScene } from "./fightScene";
import { FightEffectFlag } from "./fightBase";



// ========================================常量定义

// ========================================导出接口
export const globalReceive = {

}

// ========================================数据结构


// ========================================类定义

export class FightSceneUI {
    static init = ()=>{
        FightSceneUI.openFrame();
    }
    static dispose = ()=>{
        FightSceneUI.closeFrame();
    }
    static openFrame = ()=>{
        if (frame !== undefined){ return ; }; //throw new Error( `${frameName} 不能重复创建.` ) }
        
        frameName = "FightUI0"
        frame = UINodeCtrl.openFrame( {
                        frameClass: frameClass, 
                        nodeName:   frameName, 
                        jsonNew:    undefined, 
                        data:       frameData
                    } );

        FightSceneCtrl.activeFrame();

        HPFunc.initFrame( frame );
        BlockFunc.initFrame( frame );
        BuffFunc.initFrame( frame );

        FightSceneCtrl.setFightUIFrameFunc( FightSceneUI.update );
    }
    
    static  closeFrame = ()=>{
        if (frame === undefined){ throw new Error( `${frameName} 未被创建.` ) }

        FightSceneCtrl.puaseFrame();

        FighterMap.forEach( (fighterData, id) => {
            FightSceneUI.removeFighter( id );
        } );

        FighterMap.clear();
        UINodeCtrl.removeNode( frame );
    }

    // static addBuff2 = ( fighterID: number, bufferID: number, data: number = 0 )=>{
    //     let fighterData: FighterData;
    //     let actionData: FighterActionData;

    //     actionData      = new FighterActionData;
    //     actionData.type = ActionType.addBuff;
    //     actionData.data = { bufferID: bufferID, data: data };

    //     fighterData     = FighterMap.get( fighterID );
    //     fighterData.actionGetList.push( actionData );

    //     // FighterDataFunc.createBuffer( fighterData, bufferID, data );
    // }

    // static addBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{
    //     FighterDataFunc.createBuffer( fighterData, (actionData.data as BuffData ) );
    // }

    static removeBuff2 = ( fighterID: number, bufferID: number )=>{
        let fighterData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.removeBuff;
        actionData.data = { bufferID: bufferID };

        fighterData     = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );

    }

    static removeBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{
        let buff: BuffNode;
        let buffList: Array<string>, buffIndex: number;

        buff            = fighterData.nodeBufferMap.get( actionData.data.bufferID );

        BuffFunc.removeBuff( buff );

        buffList        = fighterData.bufferList;
        buffIndex       = buffList.indexOf( actionData.data.bufferID );
        buffList.splice( buffIndex, 1 );

        for ( let i=buffIndex, len=buffList.length; i<len; i++ ){
            BuffFunc.updateBufferState( fighterData, buffList[i], i );
        }
    }

    static updateBuff2 = ( fighterID: number, data: BuffData )=>{
        let fighterData: FighterData, buff: BuffNode;
        let actionData: FighterActionData;

        actionData  = new FighterActionData;
        actionData.type = ActionType.updateBuff;
        actionData.data = { data: BuffData };

        fighterData = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
    }

    static updateBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{
        let buff: BuffNode, bufferIcon: string, num: number;
        bufferIcon  = (actionData.data as BuffData).icon;
        buff        = fighterData.nodeBufferMap.get( bufferIcon );

        if ( buff === undefined ){
            FighterDataFunc.createBuffer( fighterData, (actionData.data as BuffData) );
        }else{
            FighterDataFunc.updateBuffer( fighterData, (actionData.data as BuffData) )
        }
    }

    static clearBuff2 = ( fighterID: number )=>{
        let fighterData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.clearBuff;

        fighterData     = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
    }

    static clearBuff = ( fighterData: FighterData, actionData: FighterActionData )=>{

        fighterData.nodeBufferMap.forEach( ( buff ) => {
            UINodeCtrl.removeNode( buff.node );
            UINodeCtrl.removeNode( buff.nodeText );
        } );

        fighterData.bufferList.length   = 0;
        fighterData.nodeBufferMap.clear();
    }
    
    static damage2 = ( fighterID: number, targetID: number, damage: number )=>{
        let targetData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.damage;
        actionData.data = { damage: damage };

        targetData  = FighterMap.get( targetID );
        targetData.actionGetList.push( actionData );

        FightScene.doSkill( fighterID );
        FightScene.beHit( targetID );
    }

    static damage = ( fighterData: FighterData, actionData: FighterActionData )=>{

        fighterData.fighter.hp   -= actionData.data.damage;
        fighterData.fighter.hp   = fighterData.fighter.hp < 0 ? 0 : fighterData.fighter.hp;

        FighterDataFunc.updateHP( fighterData );

        if ( fighterData.fighter.hp === 0 ){
            FightScene.doDie( fighterData.fighter.id );
        }

        DamageFunc.addDamage( actionData.data.damage, frame, fighterData.nodeLeft, fighterData.nodeTop );
    }
    
    static createFighter = ( fighter: Fighter )=>{
        let fighterData: FighterData;

        fighterData     = new FighterData;
        fighterData.fighter = fighter;
        fighterData.totalHP = fighter.max_hp;
        fighterData.currHP  = fighter.hp;
        FighterMap.set( fighter.id, fighterData );

        if ( fighter.camp === 1 ){

            fighterData.isEnemy = false;
            fighterData.arrIndex= friendList.length;
            friendList.push( fighter.id );

        }else{

            fighterData.arrIndex= enemyList.length;
            enemyList.push( fighter.id );

        }

        FighterDataFunc.initFighterData( fighterData );
        FightScene.create( fighterData );
        HPFunc.createHP( fighterData );
        FighterDataFunc.createName( fighterData );
    }
    
    static removeFighter = ( fighterID: number )=>{
        let fighterData: FighterData;

        fighterData     = FighterMap.get( fighterID );
        if ( fighterData !== undefined ){

            FightScene.remove( fighterData );
            UINodeCtrl.removeNode( fighterData.nodeName );


            HPFunc.dispose( fighterData );
            BlockFunc.dispose( fighterData );
            BuffFunc.dispose( fighterData );

            FighterMap.delete( fighterID );
        }
    }

    static updateBlock2 = ( fighterID: number, block: number )=>{
        let fighterData: FighterData;
        let actionData: FighterActionData;

        actionData      = new FighterActionData;
        actionData.type = ActionType.updateBlock;
        actionData.data = { block: block };

        fighterData  = FighterMap.get( fighterID );
        fighterData.actionGetList.push( actionData );
    }


    static updateBlock = ( fighterData: FighterData, actionData: FighterActionData )=>{

        fighterData.fighter.block   = actionData.data.block;

        if ( fighterData.nodeBlock === undefined ){
            BlockFunc.create( fighterData );
        }else{
            BlockFunc.update( fighterData );
        }
    }

    static update = ()=>{
        FighterMap.forEach( fighterData => {
            let actionData: FighterActionData;
            let actionFunc: Function;

            while ( fighterData.actionGetList.length > 0 ){
                actionData  = fighterData.actionGetList.pop();
                actionFunc  = FightSceneUI[actionData.type];

                fighterData.actionCurrList.push( actionData );
                actionFunc( fighterData, actionData );

            } ;

        } );

        if (    BuffFunc.isFrameEnd() 
            &&  BlockFunc.isFrameEnd()
            &&  HPFunc.isFrameEnd()
            &&  DamageFunc.isFrameEnd()   
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
        buff.num        = data.num;

        BuffFunc.createNodeBuff( buff, fighterData );

        fighterData.bufferList.push( data.icon );
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
        left    = isEnemy ? 550 : 300;
        diffLeft= fighterData.arrIndex * FighterSizeCfg.WIDTH ;
        left    = isEnemy ? left +diffLeft : left -diffLeft;
        top     = 180;
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

    static updateHP = ( fighterData: FighterData )=>{
        HPFunc.updateHPImage( fighterData );
        HPFunc.updateHPText( fighterData );
    }

    static initFighterData = ( fighterData: FighterData )=>{
        let node: UINode, jsonNew: any, left: number, top: number, color: string, z: number;
        let nodeName: string, diffLeft: number, isEnemy: boolean;

        isEnemy = fighterData.isEnemy;
        nodeName= `${fighterData.fighter.id}`;
        left    = isEnemy ? 550 : 300;
        diffLeft= fighterData.arrIndex * FighterSizeCfg.WIDTH * 1.1 ;
        left    = isEnemy ? left +diffLeft : left -diffLeft;
        top     = 200;

        fighterData.nodeLeft    = left;
        fighterData.nodeTop     = top;
    }

    static updateBuffer = ( fighterData: FighterData, data: BuffData )=>{
        let buff: BuffNode, dataText: UIDataText;

        buff    = fighterData.nodeBufferMap.get( data.icon );
        buff.num= data.num;

        dataText    = new UIDataText;
        dataText.text   = `${buff.num}`;

        UINodeCtrl.updateNodeData( buff.nodeText, dataText );
    }

    static updateAnim = ( fighterData: FighterData )=>{

    }
    static update = ()=>{
        FighterMap.forEach( fighterData => {

        } );
    }
}



class IntendFunc {
    static create = ( fighterData: FighterData )=>{

    }
    static update = ( fighterData: FighterData )=>{

    }
    static dispose = ( fighterData: FighterData )=>{

    }
}


// ========================================变量声明
let frame: UINode, frameData, frameJson, frameName, frameClass;
let nodeName: UINode, nodeNameJson: any, nodeBuffJson: any, nodeBuffTextJson: any;
let nodeHPJson: any, nodeHPJsonBG: any, nodeHPJsonImage: any;
let nodeBlockJson: any, nodeBlockTxtJson: any;


let fighterJson: any;
let enemyList: Array<number>;
let friendList: Array<number>;
let frameIsActive: boolean = false;

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