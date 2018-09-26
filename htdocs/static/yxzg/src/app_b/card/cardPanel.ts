
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend }           from "../../app/mod/pi";
import { FaceCfg, CardCenterCfg, CardData, 
        CardFlag, PanelWidth, PanelTop, CardCreatCfg, 
        CardAnimFlag, CardNodeData, CardNodeStyle, CardPlaceList, CardNormalCfg }        from "./cardBase";
import { UINodeCtrl, readUIJson, recordUIJson, UIListenCfg, UIDataState, Z_ORDERS } from "../../app/scene/uiNode";
import { appendCard, cardPowerChange  }          from "./cardFace";
import { CardDataFunc }         from "./cardPanelBase";
import { CardMenu }             from "./cardMenu";
import { CardPanelCtrlFunc }    from "./cardPanelCtrl";
import { Card, Fighter }        from "../../fight/class";
import { getSelf  }             from "../fight/fight";

// ========================================常量定义


// ========================================导出接口

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
let CheckCardMoveTarget: Function, ClearCardMoveTarget: Function;
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
            cardData.playLockFlag = 0;
            // CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
        }

        CardMenu.updateCardSet( 0, true );
    }
    static toScrap = ( from: string, index: number )=>{
        let cardData: CardData;

        if ( from === CardPlaceList[1] ){
            cardData    = cardMapHand.get( index );
            cardData.playLockFlag = 0;
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.SCRAP );
        }
    }
    static toExpend = ( from: string, index: number )=>{
        let cardData: CardData;

        if ( from === CardPlaceList[1] ){
            cardData    = cardMapHand.get( index );
            cardData.playLockFlag = 0;
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
            if ( cardData.cardNode !== undefined ){
                UINodeCtrl.removeNode( cardData.cardNode );
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
        CardMenu.setEndRoundCall( ()=>{
                if ( CardPanelCtrlFunc.isFrameEnd() ){
                    f(); 
                }
            }
        );
    }

    static setCheckCardMoveTarget = ( f: Function )=>{
        CheckCardMoveTarget = f;
    }

    static setClearCardMoveTarget = ( f: Function )=>{
        ClearCardMoveTarget = f;
    }

    // static creatCard = ( data: Card, from: string, to: string )=>{

    // }

    static creatOneCard = ( card: Card, index: number )=>{
        let cardNode: any, cardName: string, cardNodeData: CardNodeData, cardNodeStyle: CardNodeStyle, arrIndex: number;
        let cardData: CardData, fighterID: number, self: Fighter;
        let time: any;
        self            = getSelf();
        fighterID       = self.id;

        arrIndex        = cardCount++;
        cardName        = `card${index}`;

        cardData        = new CardData;
        cardData.power          = isNaN((card.cost_energy as any) -0) ? 0 : (card.cost_energy as any) -0;
        cardData.powerIsActive  = self.energy >= cardData.power;

        cardNodeData    = new CardNodeData( card, fighterID, index, cardData.powerIsActive );
        cardNodeStyle   = new CardNodeStyle( arrIndex );
        cardNode        = appendCard( {   
                            data:       cardNodeData, 
                            name:       cardName,
                            parent:     frame,
                            jsonNew:    cardNodeStyle
                        } );
    
        cardData.name       = cardName;
        cardData.cardNode   = cardNode;
        cardData._card      = card;
        cardData.index      = index;
        cardData.arrIndex   = arrIndex;
        cardData.x          = cardNode.x;
        cardData.y          = cardNode.y;
        cardData.z          = cardNodeStyle.z_relat;
        cardData.createCall = ()=>{
            CardMenu.updateCardSet( 0, false );
        }
        cardData.scrapCall = ()=>{
            cardMapHand.delete( cardData.index );
            CardPanel.removeOneHandCard( cardData.index );
            CardMenu.updateCardSet( 1, true );
        }
        cardData.expendCall = ()=>{
            cardMapHand.delete( cardData.index );
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
    
        UINodeCtrl.setNodeListener( cardNode, new UIListenCfg( "up", cardData.playCall ) );
        UINodeCtrl.setNodeListener( cardNode, new UIListenCfg( "move", cardData.moveCall ) );
        UINodeCtrl.setNodeListener( cardNode, new UIListenCfg( "down", cardData.downCall ) );
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
    
                    }, arrIndex * CardCreatCfg.Times * 0.2 );
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
    
    // 玩家能量变化时，更新手牌能量消耗较大的牌的 能量表现， 恢复未超过玩家能量的 卡牌表现
    static changeCardPowerDisplay = ()=>{
        let currEnergy: number, cost_energy: number, isActive: boolean;

        currEnergy  = getSelf().energy;

        cardMapHand.forEach( cardData =>{
            if ( !isNaN((cardData._card.cost_energy as any ) -0) ){

                cost_energy = (cardData._card.cost_energy as any ) -0;
                CardPanel.changeCardPowerNum(cardData,cost_energy,currEnergy);
            }
        } );
    }

    // 某卡牌 能量变化
    static changeCardPowerNum = ( cardData: CardData, energy: number, playerEnergy: number )=>{

        let isActive = energy <= playerEnergy;
            cardData.power      = energy;
        if ( isActive !== cardData.powerIsActive ) {
            cardPowerChange( cardData.cardNode, energy, isActive );
            cardData.powerIsActive  = isActive;
        }
    }
    // 设置所有手牌锁定
    static setAllHandCardLock = () => {
        cardMapHand.forEach(cardData => {
            cardData.playLockFlag = 0;
        });
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

    normalState.state.left     = FaceCfg.Radius * ((Math.sin(FaceCfg.RotateAngle *Math.PI* (index -(count-1)/2) / 180)) ) + PanelWidth / 2 ;
    normalState.state.top      = FaceCfg.StartTop + FaceCfg.Radius * (1 - Math.abs(Math.cos(FaceCfg.RotateAngle *Math.PI * (index -(count-1)/2) / 180)) ) + FaceCfg.Height/2*CardNormalCfg.scale; // + ((index - count/2 > 1) ? 0 : 10);
    normalState.state.rotate   = [ 0, 0, (index - (count-0.5)/2)*(FaceCfg.RotateAngle/180)*Math.PI ];
    normalState.state.scale    = [ CardNormalCfg.scale, CardNormalCfg.scale, CardNormalCfg.scale ];

}

/**
 * 外部 获得一张选中的卡
 */
const checkCardDown = ( cardData: CardData )=>{

    if (cardData.playLockFlag > 0){

        CurrCardData    = cardData;
        cardData.flag   = CardFlag.MOVE ;
    
        CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.HOLD );
    }
}
/**
 * 内部 卡牌移动结果
 */
const checkCardUp = ( cardData: CardData )=>{

    CurrCardData    = undefined;
    cardData.moveX  = 0;
    cardData.moveY  = 0;

    ClearCardMoveTarget && ClearCardMoveTarget();
    
    if (cardData.playLockFlag > 0){

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
}

const checkCardMove = ( {diffX, diffY}:{diffX: number, diffY: number}, cardData: CardData )=>{
    let data: UIDataState;
    if (cardData.playLockFlag <= 0) return;
    if ( cardData.flag  >= CardFlag.MOVE ){
        
        cardData.moveX += diffX;
        cardData.moveY += diffY;
        CardDataFunc.updateCardMove( cardData );

        checkCardMoveFlag( cardData );
    }
    cardData.animFlag   = CardAnimFlag.MOVE;

    globalSend( "sceneCardMoveTarget", 
                {   x: cardData.cardNode.x, 
                    y: cardData.cardNode.y,
                    targetType: cardData._card.target_type,
                    targetNum: cardData._card.target_param,
                    cb: recordCardTarget
                } 
            );
};

const recordCardTarget = ( fighterID: number )=>{

    CardTargetID    = fighterID;
}

const checkCardMoveFlag = ( cardData: CardData )=>{
    
    let x: number, y: number;

    x   = cardData.cardNode.x;
    y   = cardData.cardNode.y;

    if ( cardData.flag  >= CardFlag.MOVE ){
        // 卡牌 未脱出 牌桌
        if ( y > PanelTop ){
            cardData.flag   = CardFlag.INPANEL;
        }else{
            // 卡牌 在己方出牌
            if ( x < 300 ){
                cardData.flag   = CardFlag.INSELF;
            }else if ( x > 450 ){
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
        top:     390,
        z:       Z_ORDERS.FIGHT_MENU,
        z_relat: 0,
        nodes: [
            { nodeName: "BG", nodeType: "COLOR", bgColor: "#555555", width: 960, height: 190, left: 0, top: 0, z_relat: 0, opacity: 0.5  },
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