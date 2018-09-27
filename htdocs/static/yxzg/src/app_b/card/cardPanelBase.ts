import { UIDataState, UINodeCtrl }          from "../../app/scene/uiNode";
import { UIDataStateDetail } from "../../app/scene/uiNodeCreator";
import { CardPanelCtrlFunc } from "./cardPanelCtrl";
import { CardCenterCfg, CardData, CardCreatCfg, CardAnimFlag,
        CardCreatEndCfg, CardScrapCfg, CardNormalCfg, CardExpendCfg } from "./cardBase";

export class CardDataFunc {
    /**
     * 牌 列出 抽牌时动画计算
     */
    private static computeStateCreat = ( cardData: CardData )=>{
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number;
        let tempTime: number, tempProgress: number;
        let tempStateDetail: UIDataStateDetail, tempState2Detail: UIDataStateDetail;;

        tempTime    = Date.now() - cardData.animStartTime;
        tempTime    = tempTime < CardCreatCfg.Times ? tempTime : CardCreatCfg.Times;

        tempProgress        = tempTime / CardCreatCfg.Times;
        tempStateDetail     = cardData.tempState.state;
        tempState2Detail    = cardData.tempState2.state;

        tempLeft    = tempState2Detail.left 
                        - ( tempState2Detail.left - cardData.normalState.state.left ) 
                            * tempProgress;
        tempTop     = tempState2Detail.top 
                        - ( tempState2Detail.top - cardData.normalState.state.top ) 
                            * tempProgress;
        tempScale   = tempState2Detail.scale[0]
                        - ( tempState2Detail.scale[0] - CardCreatEndCfg.Scale ) 
                            * tempProgress;
        tempRotate  = tempState2Detail.rotate[0]
                        - ( tempState2Detail.rotate[0] - cardData.normalState.state.rotate[2] ) 
                            * tempProgress;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );

        if ( tempProgress === 1 ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.NORMAL );
        }
        
    }
    // 牌回收 弃牌时动画计算
    private static computeStateScrap = ( cardData: CardData )=>{
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number;
        let tempTime: number, tempProgress: number;
        let tempStateDetail: UIDataStateDetail, tempState2Detail: UIDataStateDetail;


        tempTime    = Date.now() - cardData.animStartTime;
        tempTime    = tempTime < CardScrapCfg.Times ? tempTime : CardScrapCfg.Times;
        
        tempProgress        = tempTime / CardScrapCfg.Times;
        tempStateDetail     = cardData.tempState.state;
        tempState2Detail    = cardData.tempState2.state;
        
        tempLeft    = tempState2Detail.left
                        - ( tempState2Detail.left - CardScrapCfg.Left ) 
                            * tempProgress;
        tempTop     = tempState2Detail.top
                        - ( tempState2Detail.top - CardScrapCfg.Top ) 
                            * tempProgress;
        tempScale   = tempState2Detail.scale[0]
                        - ( tempState2Detail.scale[0] - CardScrapCfg.Scale ) 
                            * tempProgress;
        tempRotate  = tempState2Detail.rotate[2]
                        - ( tempState2Detail.rotate[2] - CardScrapCfg.Rotate ) 
                            * tempProgress;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );

        if ( tempProgress === 1 ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.STAY );
            cardData.scrapCall();
            CardDataFunc.removeCardData( cardData );
        }
    }
    // 弃牌 消耗牌时动画计算
    private static computeStateExpend = ( cardData: CardData )=>{
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number;
        let tempTime: number, tempProgress: number;
        let tempStateDetail: UIDataStateDetail, tempState2Detail: UIDataStateDetail;


        tempTime    = Date.now() - cardData.animStartTime;
        tempTime    = tempTime < CardExpendCfg.Times ? tempTime : CardExpendCfg.Times;
        
        tempProgress        = tempTime / CardExpendCfg.Times;
        tempStateDetail     = cardData.tempState.state;
        tempState2Detail    = cardData.tempState2.state;
        
        tempLeft    = tempState2Detail.left
                        - ( tempState2Detail.left - CardExpendCfg.Left ) 
                            * tempProgress;
        tempTop     = tempState2Detail.top
                        - ( tempState2Detail.top - CardExpendCfg.Top ) 
                            * tempProgress;
        tempScale   = tempState2Detail.scale[0]
                        - ( tempState2Detail.scale[0] - CardExpendCfg.Scale ) 
                            * tempProgress;
        tempRotate  = tempState2Detail.rotate[2]
                        - ( tempState2Detail.rotate[2] - CardExpendCfg.Rotate ) 
                            * tempProgress;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );

        if ( tempProgress === 1 ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.STAY );
            cardData.expendCall();
            CardDataFunc.removeCardData( cardData );
        }
    }
    // 牌回收 回手牌时动画计算
    private static computeStateNormal = ( cardData: CardData )=>{
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number;
        let tempTime: number, tempProgress: number;
        let tempStateDetail: UIDataStateDetail, tempState2Detail: UIDataStateDetail;


        tempTime    = Date.now() - cardData.animStartTime;
        tempTime    = tempTime < CardNormalCfg.Times ? tempTime : CardNormalCfg.Times;
        
        tempProgress        = tempTime / CardNormalCfg.Times;
        tempStateDetail     = cardData.tempState.state;
        tempState2Detail    = cardData.tempState2.state;
        
        tempLeft    = tempState2Detail.left
                        - ( tempState2Detail.left - cardData.normalState.state.left ) 
                            * tempProgress;
        tempTop     = tempState2Detail.top
                        - ( tempState2Detail.top - cardData.normalState.state.top ) 
                            * tempProgress;
        tempScale   = tempState2Detail.scale[0]
                        - ( tempState2Detail.scale[0] - cardData.normalState.state.scale[0] ) 
                            * tempProgress;
        tempRotate  = tempState2Detail.rotate[2]
                        - ( tempState2Detail.rotate[2] - cardData.normalState.state.rotate[2] ) 
                            * tempProgress;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );

        if ( tempProgress === 1 ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.STAY );
        }
        
    }
    // 操作 按住时动画计算
    private static computeStateHold = ( cardData: CardData )=>{
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number, tempZ: number;
        let tempTime: number, tempProgress: number;
        let tempStateDetail: UIDataStateDetail, tempState2Detail: UIDataStateDetail;


        tempTime    = Date.now() - cardData.animStartTime;
        tempTime    = tempTime < CardCenterCfg.Times ? tempTime : CardCenterCfg.Times;
        
        tempProgress        = tempTime / CardCenterCfg.Times;
        tempStateDetail     = cardData.tempState.state;
        tempState2Detail    = cardData.tempState2.state;
        
        tempLeft    = tempState2Detail.left;
                        // - ( tempState2Detail.left - CardCenterCfg.Left ) 
                        //     * tempProgress;
        tempTop     = tempState2Detail.top
                        - ( tempState2Detail.top - CardCenterCfg.Top ) 
                            * tempProgress;
        tempScale   = tempState2Detail.scale[0]
                        - ( tempState2Detail.scale[0] - CardCenterCfg.Scale ) 
                            * tempProgress;
        tempRotate  = tempState2Detail.rotate[2]
                        - ( tempState2Detail.rotate[2] - CardCenterCfg.Rotate ) 
                            * tempProgress;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );
        
        if ( tempProgress === 1 ){
            CardDataFunc.changeAnimFlag( cardData, CardAnimFlag.MOVE );
        }


    }
    static updateCardMove = (  cardData: CardData )=>{
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number;
        let normalState: UIDataState, tempStateDetail: UIDataStateDetail;

        normalState     = cardData.normalState;
        tempStateDetail = cardData.tempState.state;

        tempLeft        = normalState.state.left + cardData.moveX;
        tempTop         = normalState.state.top  + cardData.moveY;
        tempScale       = normalState.state.scale[0];
        tempRotate      = 0;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );
    }
    static updateCardZ = ( cardData: CardData, isCenter: boolean )=>{
        if ( isCenter === true ){
            UINodeCtrl.updateNodeData( cardData.cardNode, new UIDataState( { "z_relat": cardData.z + CardCenterCfg.z_realt } ) );
        }else{
            UINodeCtrl.updateNodeData( cardData.cardNode, new UIDataState( { "z_relat": cardData.z } ) );
        }
    }
    static updateCardTempState = ( cardData: CardData )=>{
        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.tempState );
    }
    static updateCardNormalState = ( cardData: CardData )=>{
        UINodeCtrl.updateNodeData( cardData.cardNode, cardData.normalState );
    }
    static updateState = ( cardData: CardData )=>{
        switch (cardData.animFlag) {
            case CardAnimFlag.STAY:{
                break;
            }
            case CardAnimFlag.NORMAL:{
                CardDataFunc.computeStateNormal( cardData );
                break;
            }
            case CardAnimFlag.HOLD:{
                CardDataFunc.computeStateHold( cardData );
                break;
            }
            case CardAnimFlag.CREATE:{
                CardDataFunc.computeStateCreat( cardData );
                break;
            }
            case CardAnimFlag.SCRAP:{
                CardDataFunc.computeStateScrap( cardData );
                break;
            }
            case CardAnimFlag.EXPEND:{
                CardDataFunc.computeStateExpend( cardData );
                break;
            }
        }
    }
    static removeCardData = ( cardData: CardData ) =>{
        CardPanelCtrlFunc.removeCardData( cardData );
        UINodeCtrl.removeNode( cardData.cardNode );
        CardDataFunc.disposeCardData( cardData );
    }
    static disposeCardData = ( cardData: CardData )=>{
        delete cardData.animFlag;
        delete cardData.arrIndex;
        delete cardData.cardNode;
        delete cardData.animStartTime;
        delete cardData._card;
        delete cardData.downCall;
        delete cardData.expendCall;
        delete cardData.flag;
        delete cardData.index;
        delete cardData.moveCall;
        delete cardData.normalState;
        delete cardData.playCall;
        delete cardData.tempScale;
    }
    static changeAnimFlag = ( cardData: CardData, flag: number )=>{
        let tempState2: UIDataState, normalStateDetail: UIDataStateDetail, tempStateDetail: UIDataStateDetail;

        cardData.animFlag       = flag;
        cardData.animStartTime  = Date.now();
        tempState2              = cardData.tempState2;

        if ( flag === CardAnimFlag.HOLD || flag === CardAnimFlag.MOVE ){
            CardDataFunc.updateCardZ( cardData, true );
        }else{
            CardDataFunc.updateCardZ( cardData, false );
        }
        
        tempStateDetail     = cardData.tempState.state;
        if ( tempStateDetail.left === undefined ){
            tempStateDetail     = cardData.tempState.state;
        }

        tempState2.state.left      = tempStateDetail.left;
        tempState2.state.top       = tempStateDetail.top;
        tempState2.state.rotate    = [ 0, 0, tempStateDetail.rotate[2] ];
        tempState2.state.scale     = [ tempStateDetail.scale[0], tempStateDetail.scale[1], 1 ];
    }
    static initCardState = ( cardData: CardData )=>{
        
        let tempLeft: number, tempTop: number, tempScale: number, tempRotate: number;
        let tempStateDetail: UIDataStateDetail;

        tempStateDetail     = cardData.tempState.state;

        tempLeft            = CardCreatCfg.Left;
        tempTop             = CardCreatCfg.Top;
        tempScale           = CardCreatCfg.Scale;
        tempRotate          = CardCreatCfg.Rotate;

        tempStateDetail.left    = tempLeft;
        tempStateDetail.top     = tempTop;
        tempStateDetail.scale   = [ tempScale, tempScale, 1 ];
        tempStateDetail.rotate  = [ 0, 0, tempRotate ];

    }
}