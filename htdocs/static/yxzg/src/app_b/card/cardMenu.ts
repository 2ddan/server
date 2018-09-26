
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend } from "../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg, UIDataImage, UIDataState } from "../../app/scene/uiNode";
import { UIDataText } from "../../app/scene/uiNodeCreator";
import { UINode, getFont } from "../../app/scene/uiNodeBase"; 
import { Fighter, Card } from "../../fight/class";
import { getSelf } from "../fight/fight";
import { UINodeAnimData_Math } from "../frameCtrl/imageAnimBase";


// ========================================常量定义
const BtnRoundFlag = {
           "ROUNDSELF"  : 1,
           "ROUNDENEMY" : 2,
           "ROUNDSTOP"  : 3 
        }

const Set0Size: number = 72/4, Set1Size: number = 72/4, Set2Size: number = 64/4;
const PowerSize: number = 96/4, EndRoundSize: number = 80/4;
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
let CallEndRound: Function, endRoundBGActive: boolean = false, endRoundTxtActive: boolean = false;
let nodeCardSet0: UINode, nodeCardSet0Num: UINode;
let nodeCardSet1: UINode, nodeCardSet1Num: UINode;
let nodeCardSet2: UINode, nodeCardSet2Num: UINode;
let cardSet0: number = 0, cardSet1: number = 0, cardSet2: number = 0;
let symbolJson: any, nodePowerBG: UINode;
let powerCurr: PowerDesign, powerTotal: PowerDesign;
let playerFighter: Fighter;
let cardMenuAnimEnd: boolean = false;

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
        cardMenuAnimEnd = false;
        frameName = "cardMenu0";
        if (frame !== undefined){
            console.warn(`${frameName} 不能重复创建.`);
            return ;
        }
        frame = UINodeCtrl.openFrame( {
                        frameClass: frameClass, 
                        nodeName:   frameName, 
                        jsonNew:    undefined, 
                        data:       frameData
                    } );
        
        UINodeCtrl.setFrameNodeListener( frame, "btnEndRound", new UIListenCfg( "up", clickEndRound ) );
        UINodeCtrl.setFrameNodeListener( frame, "btnEndRound", new UIListenCfg( "down", chagneBtnBg ) );
    
        nodeCardSet0    = UINodeCtrl.readNodeByName( frame, "cardSet0" );
        nodeCardSet0Num = UINodeCtrl.readNodeByName( frame, "cardSet0Num" );
        nodeCardSet1    = UINodeCtrl.readNodeByName( frame, "cardSet1" );
        nodeCardSet1Num = UINodeCtrl.readNodeByName( frame, "cardSet1Num" );
        nodeCardSet2    = UINodeCtrl.readNodeByName( frame, "cardSet2" );
        nodeCardSet2Num = UINodeCtrl.readNodeByName( frame, "cardSet2Num" );
        nodePowerBG     = UINodeCtrl.readNodeByName( frame, "powerBG" );

        CardMenu.setEnterAnim(); // 设置进入动画
    }

    /**
     * 牌桌菜单 创建时的 进入动画
     */
    private static animWhileOpen = ()=>{

    } 

    // 初始化 玩家数据 ( 各牌堆表现 )
    static initPlayer = ( fighter: Fighter )=>{

        if ( frame !== undefined ){
            playerFighter   = fighter;
            
            cardMenuAnimEnd && CardMenu.updatePower();
            
            cardSet0    = fighter.cards_draw.length;
            cardSet1    = fighter.cards_scrap.length;
            cardSet2    = fighter.cards_expend.length;
    
            CardSetFunc.changeCardSetCount( nodeCardSet0Num, cardSet0 );
            CardSetFunc.changeCardSetCount( nodeCardSet1Num, cardSet1 );
            CardSetFunc.changeCardSetCount( nodeCardSet2Num, cardSet2 );
        }
    }

    static disposePlayer = ( )=>{
        playerFighter   = undefined;
    }
    
    static closeFrame = ()=>{

        if (frame === undefined){ throw new Error( `frame 未被创建.` ) }

        CardMenu.disposePlayer();
        PowerFunc.dispose();
        UINodeCtrl.removeNode( frame );
    
        nodeCardSet0    = undefined;
        nodeCardSet0Num = undefined;
        nodeCardSet1    = undefined;
        nodeCardSet1Num = undefined;
        nodeCardSet2    = undefined;
        nodeCardSet2Num = undefined;
        cardMenuAnimEnd = false;

        frame = undefined;
    }

    static setEndRoundCall = ( f: Function )=>{
        CallEndRound = ()=>{  f();  } ;
    }
    //结束回合点击样式切换
    

    // 结束回合按钮 的文字切换
    static changeEndRoundText = ( active: boolean )=>{
        if ( frame !== undefined ){
            endRoundTxtActive = active;
            if ( active === true ){
                UINodeCtrl.updateNodeWithName( frame, "txtEndRound", new UIDataText( "结束回合" ) );
            }else{
                UINodeCtrl.updateNodeWithName( frame, "txtEndRound", new UIDataText( "对方回合" ) );
            }
        }
    }
    
    // 结束回合按钮 的显示切换
    static changeEndRoundBG = ( active: boolean )=>{
        if ( frame !== undefined ){
            endRoundBGActive = active;
            if ( active === true ){
                if ( endRoundTxtActive === true ){
                    UINodeCtrl.updateNodeWithName( frame, "btnEndRound", new UIDataImage( "cardMenu/btn_endround.png" ) );
                }
            }else{
                UINodeCtrl.updateNodeWithName( frame, "btnEndRound", new UIDataImage( "cardMenu/btn_endround_no.png" ) );
            }
        }
    }

    /**
     * 外部调用 更新 指定牌堆表现
     * setIndex： 牌堆序号
     * isAdd： true: 数值加一， false: 数值减一
     */
    static updateCardSet = ( setIndex: number, isAdd: boolean )=>{
        let cardSet: UINode, tempIndex: number;
    
        switch (setIndex) {
            case 0 :{
                isAdd ? (cardSet0++) : (cardSet0--) ;
                CardSetFunc.changeCardSetCount( nodeCardSet0Num, cardSet0 );
                CardSetFunc.animCardSet( nodeCardSet0 );
                break;
            }
            case 1 :{
                isAdd ? (cardSet1++) : (cardSet1--) ;
                CardSetFunc.changeCardSetCount( nodeCardSet1Num, cardSet1 );
                CardSetFunc.animCardSet( nodeCardSet1 );
                break;
            }
            case 2 :{
                isAdd ? (cardSet2++) : (cardSet2--) ;
                CardSetFunc.changeCardSetCount( nodeCardSet2Num, cardSet2 );
                CardSetFunc.animCardSet( nodeCardSet2 );
                break;
            }
        }
    }
    // 外部调用 更新 整个能量表现
    static updatePower = (  )=>{
        let curr: number, total: number;

        curr    = playerFighter.energy;
        total   = playerFighter.max_energy;

        if ( powerCurr === undefined ){
            PowerFunc.createPowerCurr( curr );
            PowerFunc.createPowerTotal( total );
        }else{
            if ( curr !== powerCurr.count ){
                powerCurr.count     = curr;
                PowerFunc.updateNodes( powerCurr );
            } 
            
            if(curr===0){
                UINodeCtrl.updateNodeWithName( frame, "powerBG", new UIDataImage( "cardMenu/noPower.png" ) );
            }else{
                UINodeCtrl.updateNodeWithName( frame, "powerBG", new UIDataImage( "cardMenu/power.png" ) );

            }
        }
    }
    // 设置进入动画
    static setEnterAnim = () => {
        if(!frame) return;

        // 创建'结束回合'节点进入动画
        CardMenu.createNodeAnim(frame, 'btnEndRound', {
            time: 260, left: [960, 775]
        }, null);

        // 创建'拥有卡牌'节点进入动画
        CardMenu.createNodeAnim(frame, 'cardSet0', {
            time: 260, left: [-54, 16], top: [540, 470]
        }, null);
        // 创建'消耗卡牌'节点进入动画
        
        CardMenu.createNodeAnim(frame, 'cardSet1', {
            time: 260, left: [960, 890], top: [540, 470]
        }, null);
        // 创建'能量'节点进入动画
        CardMenu.createNodeAnim(frame, 'powerBG', {
            time: 260, left: [-68, 60]
        }, CardMenu.cardMenuAnimEndCall);
    }
    /**创建节点动画
     * @param frameNode {object} 父节点
     * @param nodeName {string} 节点名字
     * @param animData {object} 动画数据
     * @param callback {function} 回调函数
     */
    static createNodeAnim = (frameNode:any, nodeName:string, animData:Object, callback:Function) => {
        let node = UINodeCtrl.readNodeByName(frameNode, nodeName);
        let data = new UINodeAnimData_Math(node, callback);

        for (let k in animData) {
            data[k] = animData[k];
        }

        data.run();
    }

    static cardMenuAnimEndCall = () => {
        cardMenuAnimEnd = true;
        CardMenu.updatePower();
    }
}


class PowerFunc {
    // 创建能量数值节点 （ 最多为 3位数，即 3个 数字拼接
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

            PowerFunc.createNode( param );
        } );
    }
    // 更新能量数值节点 （ 数值变化 可能需要  添加 或 移除 几个 数字
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
    
                PowerFunc.createNode( param );

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

    /**
     * 创建 能量数值 其中一个数字 节点 
     * num： 要创建的数字
     * byteTimes: 该数字为第几位
     * maxbyteTimes: 该数字所在数值 共几位
     * isTotal： 是否为 右边的能量总值
     */
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
        nodeName= PowerFunc.getNodeName( num, isTotal );

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
    // 构建 能量数字节点名称 的方法
    static getNodeName = ( byteTimes: number, isTotal: boolean )=>{
        return isTotal ? `T_${byteTimes}` : `C_${byteTimes}`;
    }
    
    static dispose = ()=>{
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

    static createPowerTotal = ( num: number )=>{
        if ( powerTotal === undefined ){
            powerTotal  = new PowerDesign;
            powerTotal.count    = num;
            powerTotal.isTotal  = true;
            PowerFunc.createNodes( powerTotal );
        }
    }
    
    static createPowerCurr = ( num: number )=>{
        if ( powerCurr === undefined ){
            powerCurr  = new PowerDesign;
            powerCurr.count     = num;
            PowerFunc.createNodes( powerCurr );
        }
    }
}

class CardSetFunc {

    static changeCardSetCount = ( cardSetNum: UINode, count: number )=>{
        UINodeCtrl.updateNodeData( cardSetNum, new UIDataText( `${count}` ) );
    }
    
    static initCardSetsCount = ( cardSetNum: UINode, count: number )=>{
    
    }
    
    /**
     * 牌堆变化时，牌堆特效  三个牌堆
     */
    static animCardSet = ( cardSet: UINode )=>{
        
    }
}
// ========================================方法定义


/**
 * 结束回合按下效果
 */
const chagneBtnBg = ( )=>{
    if ( endRoundTxtActive === true){
        UINodeCtrl.updateNodeWithName( frame, "btnEndRound", new UIDataImage( "background/p_down_btn.png" ) );
    }
}
/**
 * 结束回合
 */
const clickEndRound = ()=>{    
    if ( endRoundTxtActive === true && endRoundBGActive === true ){
        UINodeCtrl.updateNodeWithName( frame, "btnEndRound", new UIDataImage( "cardMenu/btn_endround.png" ) );
        CallEndRound();
    }
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
            // 能量_背景
            { nodeName: "powerBG",      nodeType: "IMAGE",  imageURL: "cardMenu/power.png", 
                    width: 68, height: 68, left: -68, top: 408, z_relat: 0 },
                // "/"_文字
                { nodeName: "powerSlash",      nodeType: "IMAGE",  imageURL: "symbol/slash.png", 
                        width: SymbolWidth, height: SymbolWidth, left: 19, top: 16, z_relat: 1 },
            // 拥有卡牌_背景
            { nodeName: "cardSet0",     nodeType: "IMAGE",  imageURL: "cardMenu/cardset0.png", 
                    width: 54, height: 54, left: -54, top: 540, z_relat: 0 },
                // 拥有卡牌数值_文字
                { nodeName: "cardSet0Num",  nodeType: "TEXT",   text: "0", 
                        left: 48, top: 29,    font: getFont( Set0Size ), width: 64, lineHeight: 24,
                        font_space: -2,     color: "#ffffff", align: "center", 
                        border_width: 1,    border_color: "rgb(27,13,8)", isCommon: false, z_relat: 2 },
                // 拥有卡牌数值_背景
                { nodeName: "cardSet0Image",nodeType: "IMAGE",  imageURL: "cardMenu/cardset_num_bg.png", 
                        width: 28, height: 28, left: 34, top: 24, z_relat: 1 },
            // 消耗卡牌_背景
            { nodeName: "cardSet1",     nodeType: "IMAGE",  imageURL: "cardMenu/cardset1.png", 
                    width: 54, height: 54, left: 890, top: 470, z_relat: 0 },
                // 消耗卡牌数值_文字
                { nodeName: "cardSet1Num",  nodeType: "TEXT",   text: "0", 
                        left: 4, top: 29,    font: getFont( Set1Size ), width: 64, lineHeight: 24,
                        font_space: -2,     color: "#ffffff", align: "center", 
                        border_width: 1,    border_color: "rgb(27,13,8)", isCommon: false, z_relat: 2 },
                // 消耗卡牌数值_背景
                { nodeName: "cardSet1Image",nodeType: "IMAGE",  imageURL: "cardMenu/cardset_num_bg.png", 
                        width: 28, height: 28, left: -10, top: 24, z_relat: 1 },
                        
                // 移除卡牌_背景
                { nodeName: "cardSet2",     nodeType: "IMAGE",  imageURL: "cardMenu/cardset3.png", 
                        width: 28, height: 28, left: 37, top: -28, z_relat: 0 },
                // 移除卡牌数值_文本
                { nodeName: "cardSet2Num",  nodeType: "TEXT",   text: "0", 
                        left: 51, top: -23,    font: getFont( Set2Size ), width: 64, lineHeight: 24,
                        font_space: -2,     color: "#990099", align: "center", 
                        border_width: 1,    border_color: "rgb(27,13,8)", isCommon: false, z_relat: 1 },

                
            // 结束回合按钮_按钮
            { nodeName: "btnEndRound",  nodeType: "IMAGE",  imageURL: "cardMenu/btn_endround.png", 
                    width: 120, height: 42, left: 960, top: 400, z_relat: 1 },
                // '结束回合'_文字
                { nodeName: "txtEndRound",  nodeType: "TEXT",   text: "结束回合", 
                        left: 60, top: 10,    font: getFont( EndRoundSize ), width: 128, lineHeight: 24,
                        font_space: -2,     color: "#ffffff", align: "center", 
                        border_width: 1,    border_color: "rgb(27,13,8)", isCommon: false, z_relat: 1 },
            
        ],
        design: {
            "powerBG": ['powerSlash'],
            // "powerSlash": true,
            "cardSet0": ['cardSet0Num', 'cardSet0Image'],
            // "cardSet0Image": [ "cardSet0Num" ],
            "cardSet1": ['cardSet1Num', 'cardSet1Image', 'cardSet2', 'cardSet2Num'],
            // "cardSet1Image": [ "cardSet1Num" ],
            "btnEndRound": [ "txtEndRound" ],
            // "cardSet2": [ "cardSet2Num" ]
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