import { Card, Fighter }             from "../../fight/class";
import { UINode, getFont }           from "../../app/scene/uiNodeBase";
import { setPermanent, removePermanent } from "../frameCtrl/frameCtrl";
import { UINodeCtrl, UIDataState, UIListenCfg, Z_ORDERS, recordUIJson, UIDataImage, UIDataOpacity } from "../../app/scene/uiNode";
import { CardNodeData, FaceCfg } from "./cardBase";
import { createCard, cardScale }   from "./cardFace";
import { getSelf } from "../fight/fight";
import { UIDataText } from "../../app/scene/uiNodeCreator";

/**
 * version: XXXXXXX
 *      描述：
 *      xxxxxx
 *      功能：
 *          显示一堆卡牌
 *          选择一些卡牌
 *          传出一些卡牌的 UINode
 */
// ========================================模块引入


// ========================================常量定义
const TypeGet       = "GET";
const TypeScrap     = "SCRAP";
const TypeExpend    = "EXPEND";
const TypeNormal    = "NORMAL";
const SelectTypes   = {
        [TypeGet]:      0,
        [TypeScrap]:    1,
        [TypeExpend]:   2,
        [TypeNormal]:   3
    };

const SelectDescs = {
        [TypeGet]:      "GET",
        [TypeScrap]:    "SCRAP",
        [TypeExpend]:   "EXPEND",
        [TypeNormal]:   "NORMAL"
    }

const SelectFlags = [ 0, 1 ];
const maxRowCount: number = 5;
let nodelist:any = [],descImg,descTxt,titleNode;
const NormalCfg = {
    WIDTH: 806,
    HEIGHT: 486,
    Scale: 0.8,
    Scale2: 0.8
}

// ========================================导出接口


// ========================================数据结构
class CardSelectorCallParam {
    cards: Array<Card>;
    maxNum: number;
    minNum: number;
    selectCall: Function;
    selectType: string;
}

class CardItem {
    card: Card;
    node: UINode;
    cardBG: UINode;
    arrIndex: number;
    displayIndex: number;
    selectFlag: boolean = false;
    upCall: Function;
    left: number;
    top: number;
    scale: number;
}

// ========================================变量声明
let frameNode: UINode, frameJson: any, frameData: any, frameClass: string = "cardSelector";
let cardItemList: Array<CardItem>   = [];
let currParam: CardSelectorCallParam;
let displayFlag: number = 0, displayCount: number = 0, displayList: Array<number> = [];
let selectList: Array<number> = [];
let cardBGJson: any;

// ========================================类定义
export class CardSelector {
    static showCards = ( 
            { cardList, maxNum, minNum, selectCall, selectType }:
            { cardList: Array<Card>, maxNum: number, minNum: number, selectCall: Function, selectType: string } )=>{
        
        currParam   = new CardSelectorCallParam;
        currParam.cards         = cardList;
        currParam.selectCall    = selectCall;
        currParam.maxNum        = maxNum;
        currParam.minNum        = minNum;
        currParam.selectType    = selectType;

        CardSelectorFunc.init();

    }
}


// ========================================方法定义
class CardSelectorFunc {
    static init = ( )=>{
        CardSelectorFunc.openFrame();
        AnimCtrl.init();

        CardItemFunc.createCardItems();

        CardItemFunc.updateCardsDisplay();

    }
    static dispose = ()=>{


        AnimCtrl.dispose();
        CardSelectorFunc.closeFrame();
    }
    static openFrame = ()=>{
        let w: number, h: number;
        let left: number, top: number,currDom;


        if ( frameNode !== undefined ){ return; }
        
        frameNode  = UINodeCtrl.openFrame( {
                        frameClass, 
                        nodeName: "cardSelector0",
                        jsonNew: undefined,
                        data: frameData
                    } );
        
        if( currParam.minNum > 0){
            descTxt.text = `可选择${currParam.maxNum}张卡牌`;
            currDom = descTxt;
        }else{
            descImg.imageURL = "text/select_card.png";
            currDom = descImg;
        }
        titleNode  = UINodeCtrl.appendNode( {
            parent: frameNode,
            jsonOrg: currDom,
            jsonNew:{z_relat:frameNode.z},
            data: undefined,
            nodeName: "descImg"
        } );
        UINodeCtrl.setFrameNodeListener( frameNode, "btn", new UIListenCfg( "up", CardSelectorFunc.doSkip ) );
        UINodeCtrl.setFrameNodeListener( frameNode, "btn", new UIListenCfg( "down", CardSelectorFunc.scaleBtn ) );
        UINodeCtrl.setFrameNodeListener( frameNode, "btn_sure", new UIListenCfg( "up", CardSelectorFunc.doSure ) );
        UINodeCtrl.setFrameNodeListener( frameNode, "btn_sure", new UIListenCfg( "down", CardSelectorFunc.scaleBtnSure ) );
    }
    static closeFrame = ()=>{
        
        if ( frameNode === undefined ){ return; }

        cardItemList.forEach( ele => {
            UINodeCtrl.removeNode( ele.node ) ;
        } );

        cardItemList.length     = 0;

        UINodeCtrl.removeNode( frameNode );

        frameNode   = undefined;
        currParam   = undefined;
        displayFlag = 0;
        displayCount= 0;
        displayList.length  = 0;
        selectList.length   = 0;

    }
    static doHold = ( cardItem: CardItem )=>{

    }
    static scaleBtn = (item) =>{
        
        // UINodeCtrl.updateNodeWithName( frameNode, "btn", new UIDataImage( "background/p_down_btn.png" ) );
        UINodeCtrl.updateNodeWithName( frameNode, "btn", new UIDataState( { scale:[0.8,0.8,1] } ) );
        UINodeCtrl.updateNodeWithName( frameNode, "btn_txt", new UIDataState( { top:453,scale:[0.8,0.8,1] } ) );
    }
    static scaleBtnSure = (item) =>{
        UINodeCtrl.updateNodeWithName( frameNode, "btn_sure", new UIDataState( { scale:[0.8,0.8,1] } ) );
        // UINodeCtrl.updateNodeWithName( frameNode, "btn_sure", new UIDataImage( "background/p_down_btn.png" ) );
        UINodeCtrl.updateNodeWithName( frameNode, "sure_text", new UIDataState( { top:453,scale:[0.8,0.8,1] } ) );
    }
    static doUP = ( cardItem: CardItem )=>{
        CardItemFunc.doSelect( cardItem );
    }
    static doMove = ( cardItem: CardItem )=>{

    }
    static doSure  = ()=>{             
        let tempArr: Array<number>;
        let callBack: Function;
        if ( selectList.length >= currParam.minNum ){
            tempArr     = [];
            callBack    = currParam.selectCall;
            selectList.forEach( arrIndex => {
                tempArr.push( arrIndex ) ;
            } );
    
            
            // if ( currParam.selectType !== TypeNormal ){
            //     selectList.forEach( arrIndex => {
            //         cardItemList.splice( arrIndex, 1 );
            //     } )
            // }
    
            if ( 1 ){
                setTimeout(()=>{
                    CardItemFunc.closeCardBg();
                    CardSelectorFunc.closeTitleNode();
                    CardSelectorFunc.closeFrame();
                    callBack && callBack( tempArr );
                },1000);
            }

        }
    }
    static doSkip = ()=>{
        let callBack: Function;
        callBack    = currParam.selectCall;  
        CardItemFunc.closeCardBg();      
        CardSelectorFunc.closeTitleNode();
        CardSelectorFunc.closeFrame();
        callBack && callBack( [] , false );
        
    }
    static closeTitleNode = ()=>{
        UINodeCtrl.removeNode(titleNode)
        titleNode = null;
    }
    

    static comoputeFrameData = ( selectorType: string )=>{
        let bgW: number, bgH: number;

        switch (selectorType) {
            case ( TypeGet ): {
                break;
            }
            case ( TypeScrap ): {
                break;
            }
            case ( TypeExpend ): {
                break;
            }
            case ( TypeNormal ): {
                break;
            }
        }
    }
}

class CardItemFunc {

    static createCardItems = ()=>{
        let arrIndex: number;

        currParam.cards.forEach( ele => {
            let cardItem: CardItem;

            arrIndex    = cardItemList.length;

            cardItem    = new CardItem;
            cardItem.arrIndex   = arrIndex;
            cardItem.card       = ele;
            cardItem.selectFlag = false;

            cardItemList.push( cardItem );
        } );
    }

    static updateCardsDisplay = ()=>{
        let startIndex: number, endIndex: number, cardItem: CardItem;
        let arrIndex: number;
        nodelist = [];

        startIndex      = displayFlag;
        displayCount    = Math.min( (cardItemList.length - startIndex), maxRowCount );
        endIndex        = startIndex +displayCount -1;
        for ( let i=displayList.length; i>=0; i-- ){
            arrIndex    = displayList[i];

            if ( arrIndex < startIndex || arrIndex > endIndex ){
                if ( selectList.indexOf( arrIndex ) >= 0 ){
                    // TO DO
                }else{
                    displayList.splice( i, 1 );
                }
            }
        }

        for ( let i=startIndex, end=startIndex+displayCount-1; i<=end; i++ ){
            cardItem        = cardItemList[i];
            cardItem.displayIndex   = displayList.indexOf( i );

            if ( cardItem.displayIndex >= 0 ){

                CardItemFunc.updateCardNode( cardItem );

            }else{

                cardItem.displayIndex   = displayList.length;
                cardItem.node           = CardItemFunc.createCardNode( cardItem );

                displayList.push( i );

            }

        }

    }

    static createCardNode = ( cardItem: CardItem )=>{
        let node: UINode, jsonNew: any, cardData: CardNodeData;
        let fighter: Fighter;
        let left: number, top: number, z: number;

        fighter     = getSelf();
        // if ( fighter === undefined ){
            cardData    = new CardNodeData( cardItem.card, fighter.id, undefined, true );
        // }else{
        //     cardData    = new CardNodeData( cardItem.card, fighter.id, cardItem.card.index );
        // }

        left    = 960/2 - (cardItem.displayIndex +0.5 - displayCount/2) * (FaceCfg.Width*NormalCfg.Scale + 20);
        top     = 265;
        z       = frameNode.z + 5;
        cardItem.left   = left;
        cardItem.top    = top;
        cardItem.scale  = 1;
        jsonNew = {
                    left: left,
                    top: top,
                    z_relat: z
                }
        node    = createCard( {
                    data: cardData,
                    name: "",
                    parent: undefined,
                    jsonNew: jsonNew
                } );
        cardItem.upCall  = ()=>{                            
                            CardSelectorFunc.doUP( cardItem );
                        }
        nodelist.push(cardItem);//做动画用
        UINodeCtrl.setNodeListener( node, new UIListenCfg( "up", cardItem.upCall ) );
        (FaceCfg.Width + 20);

        cardScale( node, NormalCfg.Scale );

        return node;
    }
    static updateCardNode = ( cardItem: CardItem )=>{
        let left: number;
        left    = 960/2 - (cardItem.displayIndex - displayCount/2 +0.5) * (FaceCfg.Width + 20);

        UINodeCtrl.updateNodeData( cardItem.node, new UIDataState( { left: left } ) );
    }
    
    static change = ()=>{

    }

    static doSelect = ( cardItem: CardItem )=>{
        let dataState: UIDataState;
        let tempIndex: number;   

        cardItem.selectFlag = !cardItem.selectFlag;

        dataState   = new UIDataState;

        if(currParam.maxNum >1 ){
            tempIndex   = selectList.indexOf( cardItem.arrIndex );
            if ( tempIndex >= 0 ){
                selectList.splice( tempIndex, 1 );
                UINodeCtrl.removeNode(cardItem.cardBG)
                delete cardItem.cardBG;
            }
        }else{
            nodelist.forEach((v,i)=>{
                if(v.cardBG){
                    tempIndex   = selectList.indexOf( i );
                    selectList.splice( tempIndex, 1 );
                    UINodeCtrl.removeNode(v.cardBG)
                    delete v.cardBG;
                }else if(cardItem.arrIndex == i){
                    selectList.push( cardItem.arrIndex );
            
                    let node = cardItem.node;
                    let jsonNew =  { 
                        width: (node.width+32)*NormalCfg.Scale,
                        height:(node.height+32)*NormalCfg.Scale,
                        left: node.x - (node.width+30)*NormalCfg.Scale/2,
                        top: node.y - (node.height+32)*NormalCfg.Scale/2,
                        z_relat:node.z-5
                    }
                    cardItem.cardBG = UINodeCtrl.appendNode( {
                        parent: cardItem.node,
                        jsonOrg: cardBGJson,
                        jsonNew,
                        data: undefined,
                        nodeName: "cardSelectBG"
                    } );
                    UINodeCtrl.setNodeListener( cardItem.cardBG, new UIListenCfg( "up", cardItem.upCall ) );
                    nodelist[cardItem.arrIndex] = cardItem;
                }
            })



           

        //     cardScale( cardItem.node, NormalCfg.Scale );

        //     UINodeCtrl.updateNodeWithName( frameNode, "btn", new UIDataImage( `icon/btn_normal.png` ) );
        //     UINodeCtrl.updateNodeWithName( frameNode, "btn_txt", new UIDataText( `继续选择（${selectList.length}/${currParam.maxNum}）` ) );

        }
        
    }
    static closeCardBg = () =>{
        nodelist.forEach((v,i)=>{
            if(v.cardBG){
                UINodeCtrl.removeNode(v.cardBG)
                delete v.cardBG;
            }
        })
    } 

}

class AnimCtrl {
    static init = ()=>{
        setPermanent( "CardSelector", AnimCtrl.update );
    }
    static dispose = ()=>{
        removePermanent( "CardSelector" );

        // TO DO
    }
    static update = ()=>{
    }
    static addOneCard = ()=>{

    }
    static delOneCard = ()=>{

    }
    static computeCard = ()=>{

    }
}



// ========================================立即运行
const init = ()=>{
    // TODO After Load
    frameJson = { 
        nodeName: "cardSelector0", 
        nodeType: "FRAME", 
        uiClass: frameClass, 
        width: 960, height: 540, left: 0, top: 0, z_relat: Z_ORDERS.POP,
        nodes: [
            { nodeName: "BG", nodeType: "COLOR", bgColor: "#000000", 
                    width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: .5 },
            { nodeName: "btn", nodeType: "IMAGE", imageURL: "icon/btn_normal.png", 
                    width: 160, height: 40, left: 300, top: 445, z_relat: 1 },
            { nodeName: "btn_txt", nodeType: "TEXT", text: "跳过", width: 256,
                    left: 380, top: 450, font: `normal normal ${18}px YaHei`, lineHeight: 24, 
                    font_space: -2, color: "#FFFFFF", align: "center", 
                    border_width: 1, border_color: "#000000", isCommon: false, z_relat: 3 },
            { nodeName: "btn_sure", nodeType: "IMAGE", imageURL: "icon/btn_normal.png", 
                    width: 160, height: 40, left: 480, top: 445, z_relat: 1 },
            { nodeName: "sure_text", nodeType: "TEXT", text: "确认", width: 256,
                    left: 560, top: 450, font: `normal normal ${18}px YaHei`, lineHeight: 24, 
                    font_space: -2, color: "#FFFFFF", align: "center", 
                    border_width: 1, border_color: "#000000", isCommon: false, z_relat: 3 }
        ],
        design: {
            "BG": true,
            "btn": true,
            "btn_txt": true,
            "btn_sure": true,
            "sure_text": true
        },
        states: {
        },
        dataMatch: {
        }
    };
    descImg = { nodeName: "descImg", nodeType: "IMAGE", imageURL: "",  width: 200, height: 64, left: 370, top: 34, z_relat: 1 }

    descTxt = { nodeName: "desc", nodeType: "TEXT", text: "", width: 256,left: 500, top: 34, font: getFont(18), lineHeight: 24, font_space: -2, color: "#FFFFFF", align: "center", border_width: 1, border_color: "#000000", isCommon: false, z_relat: 2 }

    frameData = {
        descTxt: { text: "choupaimiaosu" }
    }
    
    cardBGJson = { nodeName: "cardSelectBG", nodeType: "IMAGE",  
            imageURL: "cardMenu/bg_frame.png",
            width: 0, height: 0, 
            left: 0, top:  0, z_relat: 0 };

    recordUIJson( frameClass, frameJson );
};
init();


