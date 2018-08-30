import { UIDataState }          from "../../app/scene/uiNode";
import { Card, Fighter }                 from "../../fight/class";
import { UINode }               from "../../app/scene/uiNodeBase";
import { FSmgr }                from "../../fight/scene";

const CardType = {
	"1": "攻击",
	"2": "能力",
	"3": "技能",
	"4": "状态",
	"5": "诅咒"
};


const CardShowType = {
	"1": "attack",
	"2": "skill",
	"3": "ability",
	"4": "state",
	"5": "curse"
};

export class CardNodeData {
    card_type: any;
    card_energy: any;
    card_desc: any;
    card_name: any;
    cardBG: any;
    card_frame: any;
    card_image: any;
    card_typeName: any;
    constructor( data: Card, fighterID: number, cardIndex: number ){
        let quality: string, type: string, bgFlag: number;
        let desc: Array<Array<any>>, descStr: string;

        descStr = "";
        desc    = FSmgr.blendDes( fighterID, undefined, cardIndex );
        desc.forEach( str => { descStr += str[0] } );

        quality = data.quality === 1 ? "attack" : "skill";
        
        type    = CardShowType[data.type];
        bgFlag   = data.type === 5 ? 3 : ( data.type === 4 ? 2 : 1 );

        this.card_desc  = { text: `${descStr}` };
        this.card_type  = data.type;
        this.card_energy= { text: `${data.cost_energy}` };
        this.card_name  = { text: `${data.name}` };
        this.cardBG     = { imageURL: `card/card_bg_${bgFlag}.png` };
        this.card_frame = { imageURL: `card/${type}/card_frame_${data.quality}.png` };
        this.card_image = { imageURL: `card/${type}/card_image.png` };
        this.card_typeName  = { text: CardType[data.type] };
    }
}
export class CardNodeStyle {
    left: number;
    top: number;
    z_relat: number;
    constructor( arrIndex: any ){
        this.left = 0;
        this.top  = 800;
        this.z_relat    = arrIndex*10;
    }
}

export class CardData {
    card: UINode;
    data: Card;
    // handIndex: number;
    index: number;
    name: string;
    arrIndex: number;
    playCall: Function;
    moveCall: Function;
    downCall: Function;
    createCall: Function;
    scrapCall: Function;
    expendCall: Function;
    normalState:  UIDataState = new UIDataState;
    tempState:  UIDataState = new UIDataState;
    tempState2:  UIDataState = new UIDataState;
    tempScale: number;
    flag: number = CardFlag.NORMAL;
    animFlag: number = CardAnimFlag.STAY;
    x: number;
    y: number;
    moveX: number = 0;
    moveY: number = 0;
    z: number;
    // createTime: number;
    animStartTime: number;
}


export const FaceHeight = 180, FaceWidth = 130;
export const PanelHeight = 120;
export const PanelWidth = 960;
export const PanelTop = 390;
export const CardFlag  = { 
        "NORMAL"        : 0,
        "FIRSTCLICK"    : 1,
        "MOVE"          : 2,
        "INPANEL"       : 3,
        "INSELF"        : 4,
        "INENEMY"       : 5,
        "INFIGHT"       : 5
      };
export const CardAnimFlag  = { 
        "STAY"      : 0,
        "NORMAL"    : 1,
        "CREATE"    : 2,
        "HOLD"      : 3,
        "SCRAP"     : 4,
        "MOVE"      : 5,
        "EXPEND"    : 6
    };

export const CardCreatCfg = {
    Times   : 500,
    Rotate  : -0.3,
    Scale   : 0.2,
    Left    : 16,
    Top     : 470
}

export const CardCenterCfg = {
    Times   : 100,
    Rotate  : 0,
    Scale   : 2,
    Left    : 390 + FaceWidth*2/2,
    Top     : 100 + FaceHeight*2/2,
    z_realt : 100 
}

export const CardCreatEndCfg = {
    Times   : 200,
    Rotate  : 0,
    Scale   : 1,
    Left    : 420 + FaceWidth/2,
    Top     : 330 + FaceHeight/2
}

export const CardRemoveCfg = {
    Times   : 200,
    Rotate  : 1,
    Scale   : 0.2,
    Left    : 900,
    Top     : 500
}

export const CardExpendCfg = {
    Times   : 200,
    Rotate  : 1,
    Scale   : 0.2,
    Left    : 930,
    Top     : 470
}

export const CardNormalCfg = {
    Times   : 300
}


export const CardPlaceList = [ "cards_draw", "cards_hand", "cards_scrap", "cards_expend" ];