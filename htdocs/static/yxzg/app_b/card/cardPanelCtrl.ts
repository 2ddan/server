import { create, getGlobal, setInterval }           from "../../pi/widget/frame_mgr";
import { setPermanent, puasePermanent, activePermanent } from "../frameCtrl/frameCtrl";
import { CardDataFunc }     from "./cardPanelBase";
import { CardData, CardAnimFlag }         from "./cardBase";
import { setWait }          from "../../app/scene/scene_show";

export let cardMap: Map<string, CardData>;
let frameKey: string;
let frameIsActive: boolean = false;
// cardFrameEndCall 
let CardFrameEndCall: Function;

export class CardPanelCtrlFunc {
    static frameFunc = ()=>{

        frameIsActive   = false;

        cardMap.forEach( cardData =>{
            CardDataFunc.updateState( cardData );
            if ( cardData.animFlag !== CardAnimFlag.STAY ){
                frameIsActive   = true;
            }
        } );
    }

    static initCardFrameEndCall = ( f: Function )=>{
        CardFrameEndCall = f;
    }

    static addCardData = ( cardData: CardData )=>{
        cardMap.set( cardData.name, cardData );
    }

    static removeCardData = ( cardData: CardData )=>{
        cardMap.delete( cardData.name );
    }

    static activeFrame = ()=>{
        activePermanent( frameKey );
    }

    static puaseFrame = ()=>{
        puasePermanent( frameKey );
    }

    static isFrameEnd = ()=>{
        return !frameIsActive;
    }
}

const init = ()=>{ 
    cardMap         = new Map;
    frameKey        = "CardPanel";
    
    setPermanent( frameKey, CardPanelCtrlFunc.frameFunc );
}

init();