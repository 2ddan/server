
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend } from "../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg, UIDataImage } from "../../app/scene/uiNode";
import { UIDataText } from "../../app/scene/uiNodeCreator";
import { UINode } from "../../app/scene/uiNodeBase"; 
import { Fighter } from "../../fight/class";


// ========================================常量定义
const BtnRoundFlag = {
           "ROUNDSELF"  : 1,
           "ROUNDENEMY" : 2,
           "ROUNDSTOP"  : 3 
        }

const Set0Size: number = 72, Set1Size: number = 72, Set2Size: number = 64;
const PowerSize: number = 96, EndRoundSize: number = 80;
const PowerWidth: number = 68, PowerHeight: number = 68;
const PowerLeft: number = 60, PowerTop: number = 408;
const SymbolWidth: number = 30;
const PowerNumberURLArr: Array<string> = [ `symbol/0.png`, `symbol/1.png`, 
        `symbol/2.png`, `symbol/3.png`, `symbol/4.png`, `symbol/5.png`,
        `symbol/6.png`, `symbol/7.png`, `symbol/8.png`, `symbol/9.png` ];
const PowerSlashURL: string = `symbol/slash.png`;

// ========================================导出接口


// ========================================数据结构

// ========================================变量声明
let frame: UINode, frameData, frameJson, frameName, frameClass;
let CallEndRound: Function;
let nodeCardSet0: UINode, nodeCardSet0Num: UINode;
let nodeCardSet1: UINode, nodeCardSet1Num: UINode;
let nodeCardSet2: UINode, nodeCardSet2Num: UINode;
let cardSet0: number = 0, cardSet1: number = 0, cardSet2: number = 0;
let symbolJson: any, nodePowerBG: UINode;
let powerCurr: PowerDesign, powerTotal: PowerDesign;
let playerFighter: Fighter;

// ========================================类定义
class PowerDesign {
    count: number;
    node1: UINode;
    node2: UINode;
    node3: UINode;
    numArr: Array<string>;
    isTotal: boolean;
}

export class CardMenu {
    static openFrame = ()=>{
        frameName = "cardMenu0";
        if (frame !== undefined){ return ; throw new Error( `${frameName} 不能重复创建.` ) }
        frame = UINodeCtrl.openFrame( {
                        frameClass: frameClass, 
                        nodeName:   frameName, 
                        jsonNew:    undefined, 
                        data:       frameData
                    } );
    
        UINodeCtrl.setFrameNodeListener( frame, "btnEndRound", new UIListenCfg( "up", clickEndRound ) );
    
        nodeCardSet0    = UINodeCtrl.readNodeByName( frame, "cardSet0" );
        nodeCardSet0Num = UINodeCtrl.readNodeByName( frame, "cardSet0Num" );
        nodeCardSet1    = UINodeCtrl.readNodeByName( frame, "cardSet1" );
        nodeCardSet1Num = UINodeCtrl.readNodeByName( frame, "cardSet1Num" );
        nodeCardSet2    = UINodeCtrl.readNodeByName( frame, "cardSet2" );
        nodeCardSet2Num = UINodeCtrl.readNodeByName( frame, "cardSet2Num" );
        nodePowerBG     = UINodeCtrl.readNodeByName( frame, "powerBG" );
    }

    static initPlayer = ( fighter: Fighter )=>{

        playerFighter   = fighter;

        CardMenu.updatePower();
        
        cardSet0    = fighter.cards_draw.length;
        cardSet1    = fighter.cards_scrap.length;
        cardSet2    = fighter.cards_expend.length;

        changeCardSetCount( nodeCardSet0Num, cardSet0 );
        changeCardSetCount( nodeCardSet1Num, cardSet1 );
        changeCardSetCount( nodeCardSet2Num, cardSet2 );
    }

    static disposePlayer = ( )=>{
        playerFighter   = undefined;
    }
    
    static closeFrame = ()=>{

        if (frame === undefined){ throw new Error( `frame 未被创建.` ) }

        CardMenu.disposePlayer();
        CardMenu.disposePower();
        UINodeCtrl.removeNode( frame );
    
        nodeCardSet0    = undefined;
        nodeCardSet0Num = undefined;
        nodeCardSet1    = undefined;
        nodeCardSet1Num = undefined;
        nodeCardSet2    = undefined;
        nodeCardSet2Num = undefined;

        frame = undefined;
    }

    static setEndRoundCall = ( f: Function )=>{
        CallEndRound = f;
    }

    static createNodes = ( power: PowerDesign )=>{
        let maxbyteTimes: number, tempStr: string, isTotal: boolean;
        let param: any;

        tempStr         = power.count+"";
        power.numArr    = tempStr.split(""); 
        maxbyteTimes    = power.numArr.length;
        isTotal         = power.isTotal;

        power.numArr.forEach( (num, index) => {
            param       = {
                            power: power, 
                            num: (num as any)-0, 
                            byteTimes: maxbyteTimes - index, 
                            maxbyteTimes: maxbyteTimes, 
                            isTotal: isTotal
                        }

            CardMenu.createNode( param );
        } );
    }
    
    static updateNodes = ( power: PowerDesign )=>{
        let maxbyteTimes: number, tempStr: string, isTotal: boolean, tempNode: UINode ;
        let param: any;

        tempStr         = power.count+"";
        power.numArr    = tempStr.split(""); 
        maxbyteTimes    = power.numArr.length;
        isTotal         = power.isTotal;

        power.numArr.forEach( (num, index) => {
            tempNode    = power[`node${maxbyteTimes-index}`];
            if ( tempNode !== undefined ){
                UINodeCtrl.updateNodeData( 
                                    tempNode, 
                                    new UIDataImage( PowerNumberURLArr[ (num as any)-0 ] ) 
                                );
            }else{
                param       = {
                                power: power, 
                                num: (num as any)-0, 
                                byteTimes: maxbyteTimes - index, 
                                maxbyteTimes: maxbyteTimes, 
                                isTotal: isTotal
                            }
    
                CardMenu.createNode( param );

            }
        } );

        for ( let i=power.numArr.length; i<3; i++ ){
            tempNode    = power[`node${i+1}`];
            if ( tempNode !== undefined ){
                UINodeCtrl.removeNode( tempNode );
                delete power[`node${i+1}`];
            }
        }
    }

    static createNode = ( 
                { power, num, byteTimes, maxbyteTimes, isTotal }:
                { power: PowerDesign, num: number, byteTimes: number, maxbyteTimes: number, isTotal: boolean} )=>{
        let node: UINode, jsonNew: any, left: number, top: number, z: number, nodeName: string;

        left    = isTotal === true
                    ? PowerWidth/2 + SymbolWidth * (maxbyteTimes - byteTimes) * 0.5 
                    : PowerWidth/2 - SymbolWidth * (byteTimes) * 0.5 -10 ;
        left    += PowerLeft;
        top     = PowerHeight/2 - SymbolWidth/2 + PowerTop;
        z       = frame.z + 5;
        nodeName= CardMenu.getNodeName( num, isTotal );

        jsonNew = {
            imageURL: PowerNumberURLArr[ num ],
            left: left,
            top: top,
            z_relat: z
        };
        node    = UINodeCtrl.appendNode( {
                            parent: frame, 
                            nodeName: nodeName, 
                            jsonOrg: symbolJson,
                            jsonNew: jsonNew,
                            data: undefined
                        } );

        power[`node${byteTimes}`] = node;
        return node;
    }

    static getNodeName = ( byteTimes: number, isTotal: boolean )=>{
        return isTotal ? `T_${byteTimes}` : `C_${byteTimes}`;
    }

    static updateCardSet = ( setIndex: number, isAdd: boolean )=>{
        let cardSet: UINode, tempIndex: number;
    
        switch (setIndex) {
            case 0 :{
                isAdd ? (cardSet0++) : (cardSet0--) ;
                changeCardSetCount( nodeCardSet0Num, cardSet0 );
                animCardSet( nodeCardSet0 );
                break;
            }
            case 1 :{
                isAdd ? (cardSet1++) : (cardSet1--) ;
                changeCardSetCount( nodeCardSet1Num, cardSet1 );
                animCardSet( nodeCardSet1 );
                break;
            }
            case 2 :{
                isAdd ? (cardSet2++) : (cardSet2--) ;
                changeCardSetCount( nodeCardSet2Num, cardSet2 );
                animCardSet( nodeCardSet2 );
                break;
            }
        }
    }

    static updatePower = (  )=>{
        let curr: number, total: number;

        curr    = playerFighter.energy;
        total   = playerFighter.max_energy;

        if ( powerCurr === undefined ){
            createPowerCurr( curr );
            createPowerTotal( total );
        }else{
            if ( curr !== powerCurr.count ){
                powerCurr.count     = curr;
                CardMenu.updateNodes( powerCurr );
            }
        }
    }

    static disposePower = ()=>{
        for (let i=0; i<3; i++){
            let node: UINode;

            node    = powerCurr[`node${i}`];

            if ( node !== undefined ){
                UINodeCtrl.removeNode( node );
            }

            node    = powerTotal[`node${i}`];

            if ( node !== undefined ){
                UINodeCtrl.removeNode( node );
            }

            delete powerCurr[`node${i}`];
            delete powerTotal[`node${i}`];
        }

        powerCurr   = undefined;
        powerTotal  = undefined;
    }
}

// ========================================方法定义

const createPowerTotal = ( num: number )=>{
    if ( powerTotal === undefined ){
        powerTotal  = new PowerDesign;
        powerTotal.count    = num;
        powerTotal.isTotal  = true;
        CardMenu.createNodes( powerTotal );
    }
}
const createPowerCurr = ( num: number )=>{
    if ( powerCurr === undefined ){
        powerCurr  = new PowerDesign;
        powerCurr.count     = num;
        CardMenu.createNodes( powerCurr );
    }
}

const changeCardSetCount = ( cardSetNum: UINode, count: number )=>{
    UINodeCtrl.updateNodeData( cardSetNum, new UIDataText( `${count}` ) );
}

const initCardSetsCount = ( cardSetNum: UINode, count: number )=>{

}

/**
 * 牌堆变化时，牌堆特效  三个牌堆
 */
const animCardSet = ( cardSet: UINode )=>{

}

/**
 * 结束回合
 */
const clickEndRound = ()=>{
    CallEndRound();
}

const changeBtnRoundShow = ( flag: number )=>{

}



// ========================================立即运行

const init = ()=>{
    frameClass  = "cardMenu";

    frameJson = {
        nodeName:    frameClass,
        nodeType:    "FRAME",
        width:   960, 
        height:  540,
        left:    0,    
        top:     0,
        z:       Z_ORDERS.MAIN,
        z_relat: 0,
        nodes: [
            { nodeName: "powerBG",      nodeType: "IMAGE",  imageURL: "cardMenu/power.png", 
                    width: 68, height: 68, left: 60, top: 408, z_relat: 0 },
            { nodeName: "powerSlash",      nodeType: "IMAGE",  imageURL: "symbol/slash.png", 
                    width: SymbolWidth, height: SymbolWidth, left: 78, top: 423, z_relat: 1 },
            { nodeName: "cardSet0",     nodeType: "IMAGE",  imageURL: "cardMenu/cardset0.png", 
                    width: 54, height: 54, left: 16, top: 470, z_relat: 0 },
            { nodeName: "cardSet0Num",  nodeType: "TEXT",   text: "0", 
                    left: 0, top: 0,    font: `normal normal ${Set0Size}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    shadow_width: 1,    shadow_color: "rgb(27,13,8)", isCommon: false, z_relat: 2 },
            { nodeName: "cardSet0Image",nodeType: "IMAGE",  imageURL: "cardMenu/cardset_num_bg.png", 
                    width: 28, height: 28, left: 50, top: 496, z_relat: 1 },
            { nodeName: "cardSet1",     nodeType: "IMAGE",  imageURL: "cardMenu/cardset1.png", 
                    width: 54, height: 54, right: 16, top: 470, z_relat: 0 },
            { nodeName: "cardSet1Num",  nodeType: "TEXT",   text: "0", 
                    left: 0, top: 0,    font: `normal normal ${Set1Size}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    shadow_width: 1,    shadow_color: "rgb(27,13,8)", isCommon: false, z_relat: 2 },
            { nodeName: "cardSet1Image",nodeType: "IMAGE",  imageURL: "cardMenu/cardset_num_bg.png", 
                    width: 28, height: 28, right: 50, top: 496, z_relat: 1 },
            { nodeName: "btnEndRound",  nodeType: "IMAGE",  imageURL: "cardMenu/btn_endround.png", 
                    width: 120, height: 42, left: 775, top: 400, z_relat: 1 },
            { nodeName: "txtEndRound",  nodeType: "TEXT",   text: "结束回合", 
                    left: 0, top: 0,    font: `normal normal ${EndRoundSize}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    shadow_width: 1,    shadow_color: "rgb(27,13,8)", isCommon: false, z_relat: 1 },
            { nodeName: "cardSet2",     nodeType: "IMAGE",  imageURL: "cardMenu/cardset3.png", 
                    width: 28, height: 28, right: 5, bottom: 70, z_relat: 0 },
            { nodeName: "cardSet2Num",  nodeType: "TEXT",   text: "0", 
                    left: 0, top: 0,    font: `normal normal ${Set2Size}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#990099", align: "center", 
                    shadow_width: 1,    shadow_color: "rgb(27,13,8)", isCommon: false, z_relat: 1 },
        ],
        design: {
            "powerBG": true,
            "powerSlash": true,
            "cardSet0": true,
            "cardSet0Image": [ "cardSet0Num" ],
            "cardSet1": true,
            "cardSet1Image": [ "cardSet1Num" ],
            "btnEndRound": [ "txtEndRound" ],
            "cardSet2": [ "cardSet2Num" ]
        },
        states: {
        },
        dataMatch: {   
        }
    };

    frameData = {
    };

    symbolJson = { nodeName: "symbol", nodeType: "IMAGE", imageURL: "", width: 24, height: 24, left: 0, top: 0, z_relat: 5 },
    

    recordUIJson( frameClass, frameJson );
};

init();