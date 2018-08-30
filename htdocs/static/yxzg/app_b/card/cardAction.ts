/*
 * 卡牌处理
 */

// ============================== 导入
import { getWidth, getHeight, globalReceive } from "../../app/mod/pi";
import { insert } from "../../app/mod/db";

import { FSmgr } from "../../fight/scene";

import { setShowListener } from "../../app/scene/scene_show";

import { Fighter, Card, Buff } from "../../fight/class";
import { getSelf  } from "../fight/fight";
import { Util as FUtil  } from "../../fight/util";

import { CardPanel, CardPanelAction } 		from "./cardPanel";
import { CardData, CardPlaceList } 		from "./cardBase";
import { CardMenu }					from "./cardMenu";
// =============================== 导出


export const main = () => {
	
	
};


// ======================================= 变量
let fighterSelf: Fighter;
let checkCardHit: Function;

// ================================ 本地

export class CardAction {
	static init = ()=>{
		CardPanel.openFrame();
		CardMenu.openFrame();
		
		CardPanel.setCardPlayCall( removeCard );
		CardPanel.setEndRoundListen( endRound );
	}

	static dispose = ()=>{
		CardAction.fightOver();
	}

	static initCheckCardHitFunc = ( f: Function )=>{
		checkCardHit	= f;
		CardPanel.setCheckCardMoveTarget( checkCardHit );
	}

	static restCards = (e:any) => {

	};

	static initFighter = ( e: any )=>{
		if ( e.fighter.type !== "monster" ){
			fighterSelf		= e.fighter;

			CardMenu.initPlayer( fighterSelf );

		}else{
			// fighterEnemy	= e.fighter;
		}
	};

	// 抽牌
	static takeCards = ( e: any ) => {

		let fighterSelf = getSelf();
	
		if( e.fighter !== fighterSelf.id ){
			// return "It's not your turn!!";
		}else{
			let handleLen: number;

			handleLen 	= fighterSelf.cards_hand.length;

			e.cards_add.forEach( ( cardIndex, addIndex )=>{
				let handIndex: number, card: Card;
				let drawIndex: number;

				card		= fighterSelf.cards[ cardIndex ];
				handIndex	= handleLen + addIndex;
				drawIndex	= fighterSelf.cards_draw.indexOf( cardIndex );

				fighterSelf.cards_hand[handIndex]	= cardIndex;
				fighterSelf.cards_draw.splice( drawIndex, 1 );

				createCard( card, cardIndex );

				console.log("card remark :: ",FUtil.blendDes(fighterSelf,null,card,null));

			} );
		}
	
	};

	// 用牌
	// "type","fighter","from","to","cards"
	static moveCards = ( e: any )=>{
		let fighterSelf = getSelf();
	
		if( e.fighter === fighterSelf.id ){
			switch (e.to) {
				case CardPlaceList[0]:{
					let handIndex: number;

					e.cards.forEach( index => {

						if ( e.from === CardPlaceList[1] ){
							throw new Error( "Card from hand to draw !" );
							// handIndex = fighterSelf.cards_hand.indexOf( index );
							// delete fighterSelf.cards_hand[ handIndex ]  ;
						}else if ( e.from === CardPlaceList[2] ){
							
							handIndex = fighterSelf.cards_scrap.indexOf( index );
							fighterSelf.cards_scrap.splice( handIndex, 1 );
							CardMenu.updateCardSet( 1, false );

						}else if ( e.from === CardPlaceList[3] ){

							handIndex = fighterSelf.cards_expend.indexOf( index );
							fighterSelf.cards_expend.splice( handIndex, 1 );
							CardMenu.updateCardSet( 2, false );

						}

						CardPanelAction.toDraw( e.from, index );
						fighterSelf.cards_draw.push( index );
					});
					break;
				} 
				case CardPlaceList[1]:{
					let handIndex: number;

					e.cards.forEach( index => {
						
						if ( e.from === CardPlaceList[2] ){

							handIndex = fighterSelf.cards_scrap.indexOf( index );
							fighterSelf.cards_scrap.splice( handIndex, 1 );
							CardMenu.updateCardSet( 1, false );

						}else if ( e.from === CardPlaceList[3] ){

							handIndex = fighterSelf.cards_expend.indexOf( index );
							fighterSelf.cards_expend.splice( handIndex, 1 );
							CardMenu.updateCardSet( 2, false );

						}
						
						CardPanelAction.toHand( e.from, index );
						fighterSelf.cards_hand.push( index );
					});
					break;
				} 
				case CardPlaceList[2]:{
					let handIndex: number;

					e.cards.forEach( index => {
						
						CardPanelAction.toScrap( e.from, index );
						fighterSelf.cards_scrap.push( index );
						
						if ( e.from === CardPlaceList[1] ){
							handIndex = fighterSelf.cards_hand.indexOf( index );
							fighterSelf.cards_hand.splice( handIndex, 1 );
						}

					} );
					break;
				} 
				case CardPlaceList[3]:{
					let handIndex: number;

					e.cards.forEach( index => {

						CardPanelAction.toExpend( e.from, index );
						fighterSelf.cards_expend.push( index );

						if ( e.from === CardPlaceList[1] ){
							handIndex = fighterSelf.cards_hand.indexOf( index );
							fighterSelf.cards_hand.splice( handIndex, 1 );
						}

					} );
					break;
				} 
			}
		}
	}

	// "type","fighter","scrap","expend"
	static endCurrRound = ( e: any )=>{
	}

	static changeEnergy = ()=>{
		CardMenu.updatePower();
	}
	
	static fightOver = ()=>{
		CardPanel.closeFrame();
		CardMenu.closeFrame();
	}
}


/**
 * @description 在场景创建卡牌显示
 * @param c 
 */
const createCard = ( c: Card, index: number ):void => {

	CardPanel.creatOneCard( c, index );
}

const removeCard = ( cardData: CardData, fighterID: number ) => {

	// if ( fighterID !== undefined ){
		playCard( cardData.index, fighterID );
	// }else{
	// 	CardPanelAction.toHand( undefined, cardData.handIndex );
	// }
}



/**
 * @description 出牌
 */
const playCard = ( index: number, fighterIndex: number ):void => {
	let self: Fighter;
	let playRes: any;

	self	= getSelf();
	playRes	= FSmgr.scene.useCard( getSelf().id, index, fighterIndex );

	if( !!playRes ){
		cardPlayError();
	}
}

const cardPlayError = ()=>{
	
} 

const endRound = ()=>{
	FSmgr.scene.endSingleRound(1);
}


// ================================== 立即执行
//初始化卡牌数据
// insert("cards",[[201001,1],[201001,1],[201001,1],[201001,1],[201001,1],[201016,1],[201016,1],[201016,1],[201016,1],[201016,1],[201016,1],[201054,1]]);
//设置战斗事件监听
// setShowListener("takeCards",	CardAction.takeCards );
// setShowListener("restCards",	CardAction.restCards );
// setShowListener("cardsMove",	CardAction.moveCards );
// setShowListener("endSingleRound",	CardAction.endCurrRound );

//添加出牌监听
// mgr.addDealEvent("playCard",playCard);