
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend }           from "../../app/mod/pi";
import { FaceHeight, FaceWidth, CardCenterCfg, CardData, 
        CardFlag, PanelWidth, PanelTop, CardCreatCfg, 
        CardAnimFlag, CardNodeData, CardNodeStyle, CardPlaceList }        from "./cardBase";
import { UINodeCtrl, readUIJson, recordUIJson, UIListenCfg, UIDataState } from "../../app/scene/uiNode";
import { creatCard  }                  from "./cardFace";
import { CardDataFunc }         from "./cardPanelBase";
import { CardMenu }             from "./cardMenu";
import { CardPanelCtrlFunc }    from "./cardPanelCtrl";
import { Card, Fighter }        from "../../fight/class";
import { getSelf  }             from "../fight/fight";

// ========================================常量定义


// ========================================导出接口
export const globalReceive = {

}

// ========================================数据结构

// ========================================变量声明
export let frame, frameData, frameJson, frameName;

// 在显示的牌堆
let cardList: Array<CardData>;
// 手牌堆
let cardMapHand: Map<number, CardData>;
let cardCount: number;
// 调用外部 打牌接口
let CardPlayCall: Function;
// 操作中的卡
let CurrCardData: CardData;
// 操作控制，操作是否有效， 卡牌动画过程中操作无效
let cardOperateFlag: boolean;
// 牌堆 牌数目
let cardSet0Num: number = 0;
// 弃牌数
let cardSet1Num: number = 0;
// 消耗牌数
let cardSet2Num: number = 0;
// 卡牌移动时，查询目标
let CheckCardMoveTarget: Function;
// card Target
let CardTargetID: number;



// ========================================类定义
export class CardPanelAction {
    static toHand = ( from: string, index: number )=>{
        let cardData: CardData;

        cardData    = cardMapHand.get( index );

        if ( cardData !== undefined ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
        }
    }
    static toDraw = ( from: string, index: number )=>{
        let cardData: CardData;

        if ( from === CardPlaceList[1] ){
            cardData    = cardMapHand.get( index );
            // CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
        }

        CardMenu.updateCardSet( 0, true );
    }
    static toScrap = ( from: string, index: number )=>{
        let cardData: CardData;

        if ( from === CardPlaceList[1] ){
            cardData    = cardMapHand.get( index );
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.SCRAP );
        }
    }
    static toExpend = ( from: string, index: number )=>{
        let cardData: CardData;

        if ( from === CardPlaceList[1] ){
            cardData    = cardMapHand.get( index );
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.EXPEND );
        }
    }
    static clearExpend = ()=>{

    }
}

export class CardPanel {
    static openFrame = ( cardSetNum: number = 0 )=>{

        if (frame !== undefined){ 
            return ;
            // throw new Error( `frameName 不能重复创建.` ) ;
        }
        
        cardSet0Num = cardSetNum;

        frame = UINodeCtrl.openFrame( {
                        frameClass: "cardPanel", 
                        nodeName: frameName, 
                        jsonNew: undefined, 
                        data: frameData
                    } );

        CardPanelCtrlFunc.activeFrame();
        
    }

    static closeFrame = ()=>{

        if (frame === undefined){ throw new Error( `frameName 未被创建.` ) }


        cardList.forEach( cardData => {
            if ( cardData.card !== undefined ){
                UINodeCtrl.removeNode( cardData.card );
            }
        } )
        
        UINodeCtrl.removeNode( frame );

        cardList.length = 0;
        cardMapHand.clear();
        frame = undefined;
    }

    static setCardPlayCall = ( f: Function )=>{
        if ( CardPlayCall === undefined ){
            CardPlayCall    = f;
        }
    }

    static setEndRoundListen = ( f: Function )=>{
        CardMenu.setEndRoundCall( f );
    }

    static setCheckCardMoveTarget = ( f: Function )=>{
        CheckCardMoveTarget = f;
    }

    static creatOneCard = ( data: Card, index: number )=>{
        let card: any, cardName: string, cardNodeData: CardNodeData, cardNodeStyle: CardNodeStyle, arrIndex: number;
        let cardData: CardData, fighterID;
        let time: any;

        fighterID       = getSelf().id;

        arrIndex        = cardCount++;
        cardName        = `card${index}`;
        cardData        = new CardData;
        cardNodeData    = new CardNodeData( data, fighterID, index );
        cardNodeStyle   = new CardNodeStyle( arrIndex );
        card            = creatCard( {   
                            data:       cardNodeData, 
                            name:       cardName,
                            parent:     frame,
                            jsonNew:    cardNodeStyle
                        } );
    
        cardData.name       = cardName;
        cardData.card       = card;
        cardData.data       = data;
        cardData.index      = index;
        cardData.arrIndex   = arrIndex;
        cardData.x          = card.x;
        cardData.y          = card.y;
        cardData.z          = cardNodeStyle.z_relat;
        cardData.createCall = ()=>{
            CardMenu.updateCardSet( 0, false );
        }
        cardData.scrapCall = ()=>{
            CardPanel.removeOneHandCard( cardData.index );
            CardMenu.updateCardSet( 1, true );
        }
        cardData.expendCall = ()=>{
            CardPanel.removeOneHandCard( cardData.index );
            CardMenu.updateCardSet( 2, true );
        }
        cardData.playCall   = ()=>{
                                checkCardUp( cardData );
                            };
    
        cardData.downCall   = ()=>{
                                checkCardDown( cardData );
                            };
    
        cardData.moveCall   = ( [diffX, diffY] )=>{
                                checkCardMove( {diffX, diffY}, cardData );
                            };
    
        UINodeCtrl.setNodeListener( card, new UIListenCfg( "up", cardData.playCall ) );
        UINodeCtrl.setNodeListener( card, new UIListenCfg( "move", cardData.moveCall ) );
        UINodeCtrl.setNodeListener( card, new UIListenCfg( "down", cardData.downCall ) );
        time    = setTimeout( ()=>{
    
                        cardData.animStartTime = Date.now();
                        cardData.createCall();
                        CardDataFunc.initCardState( cardData );

                        cardMapHand.set( index, cardData );
                        cardList.push( cardData );
                        updateCardSetShow();
    
                        CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.CREATE );
                        CardPanelCtrlFunc.addCardData( cardData );
                        clearTimeout( time );
    
                    }, arrIndex * CardCreatCfg.Times * 0.8 );
    }

    static removeOneHandCard = ( index: number )=>{
        let cardData: CardData;
    
        for ( let i = cardList.length -1; i>=0; i-- ){
            cardData    = cardList[i];
            if ( cardData.index  === index ){
    
                cardList.splice( i, 1 );
                cardCount--;
    
                updateCardSetShow();
    
                break;
            }
        }
    }
}

// ========================================方法定义

/**
 * 内部 管理 0-10 张卡的显示
 * des - 内部 管理 0-n 张卡的显示
 *       一次最多10张卡
 */
const updateCardSetShow = ()=>{
    let count: number;

    count   = cardList.length;

    cardList.forEach( (cardData, index )=>{
        cardData.arrIndex   = index;

        computeCardNormalState( cardData, count );

        if ( cardData.animFlag !== CardAnimFlag.SCRAP &&  cardData.animFlag !== CardAnimFlag.EXPEND  ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
        }
    });
}

const computeCardNormalState = ( cardData: CardData, count: number )=>{
    let index: number, normalState: UIDataState;

    index       = cardData.arrIndex;
    normalState = cardData.normalState;

    normalState.state.left     = (index - count/2) * (FaceWidth-30) + PanelWidth / 2 + FaceWidth/2;
    normalState.state.top      = 400 + Math.sin( Math.abs(index - count/2 +0.5) * 6 / 180 ) * 200 + FaceHeight/2; // + ((index - count/2 > 1) ? 0 : 10);
    normalState.state.rotate   = [ 0, 0, (index - count/2 +0.5)*(6/180)*1.57 ];
    normalState.state.scale    = [ 1, 1, 1 ];

}

/**
 * 外部 获得一张选中的卡
 */
const checkCardDown = ( cardData: CardData )=>{

    CurrCardData    = cardData;

    cardData.flag   = CardFlag.MOVE ;

    CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.HOLD );
}
/**
 * 内部 卡牌移动结果
 */
const checkCardUp = ( cardData: CardData )=>{

    CurrCardData    = undefined;
    cardData.moveX  = 0;
    cardData.moveY  = 0;

    if ( cardData.flag >= CardFlag.MOVE ){
        switch (cardData.flag) {
            case CardFlag.INPANEL: {
                cardData.flag   = CardFlag.NORMAL;
                // UINodeCtrl.updateNodeData( cardData.card, cardData.normalState );
                CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
                break;
            }
            case CardFlag.INSELF: {
                CardPlayCall( cardData, CardTargetID );
                break;
            }
            case CardFlag.INENEMY: {
                CardPlayCall( cardData, CardTargetID );
                break;
            }
            case CardFlag.INFIGHT: {
                CardPlayCall( cardData, CardTargetID );
                break;
            }
            default: {
                cardData.flag   = CardFlag.NORMAL;
                CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
                break;
            }
        }
    }else{
        
        CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
    }
}

const checkCardMove = ( {diffX, diffY}:{diffX: number, diffY: number}, cardData: CardData )=>{
    let data: UIDataState;
    
    if ( cardData.flag  >= CardFlag.MOVE ){
        
        cardData.moveX += diffX;
        cardData.moveY += diffY;
        CardDataFunc.updateCardMove( cardData );

        checkCardMoveFlag( cardData );
    }
    cardData.animFlag   = CardAnimFlag.MOVE;
    recordCardTarget( cardData );
};

const recordCardTarget = ( cardData: CardData )=>{
    CardTargetID    = CheckCardMoveTarget( { 
                            x: cardData.card.x, // + FaceWidth/2, 
                            y: cardData.card.y // + FaceHeight/2
                        } );
}

const checkCardMoveFlag = ( cardData: CardData )=>{
    
    let x: number, y: number;

    x   = cardData.card.x;
    y   = cardData.card.y;

    if ( cardData.flag  >= CardFlag.MOVE ){
        // 卡牌 未脱出 牌桌
        if ( y - CardCenterCfg.Scale * FaceHeight * 0.5 > PanelTop ){
            cardData.flag   = CardFlag.INPANEL;
        }else{
            // 卡牌 在己方出牌
            if ( x < 230 ){
                cardData.flag   = CardFlag.INSELF;
            }else if ( x > 300 ){
                // 卡牌 在敌方出牌
                cardData.flag   = CardFlag.INENEMY;
            }else{
                cardData.flag   = CardFlag.INFIGHT;
            }
        }
    }
}

// ========================================立即运行

const init = ()=>{
    frameName  = "cardPanel";

    frameJson = {
        nodeName:   frameName,
        uiClass:    frameName,
        nodeType:   "FRAME",
        width:   960, 
        height:  190,
        left:    0,    
        top:     350,
        z:       0,
        z_relat: 0,
        nodes: [
            { nodeName: "BG", nodeType: "COLOR", bgColor: "#555555", width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: 0.5  },
        ],
        design: {
            "BG": true
        },
        states: {
        },
        dataMatch: {
        },
        listen: {
        
        }
    };

    frameData = {
        cardList: {}
    };

    recordUIJson( frameName, frameJson );

    cardList    = [];
    cardCount   = 0;
    cardMapHand = new Map;
};

init();