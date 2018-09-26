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

export const CardPowerBGList = [ "card/card_power.png", "card/card_power_r.png" ]

export class CardNodeData {
    // 类型
    card_type: any;
    // 能量
    card_energy: any;
    // 能量背景
    card_energy_bg: any;
    // 描述
    card_desc: any;
    // 名称
    card_name: any;
    // 背景
    cardBG: any;
    // 框架
    card_frame: any;
    // 原画
    card_image: any;
    // 类型名
    card_typeName: any;
    constructor( data: Card, fighterID: number, cardIndex: number, isActive: boolean ){
        let quality: string, type: string, bgFlag: number;
        let desc: Array<Array<any>>, descStr: string;
        let energy: number;

        descStr = "";
        if ( cardIndex === undefined ){
            desc    = FSmgr.blendDesByCard( fighterID, undefined, data );
            desc.forEach( str => { descStr += str[0] } );
        }else{
            if ( fighterID !== undefined ){
                desc    = FSmgr.blendDes( fighterID, undefined, cardIndex );
                desc.forEach( str => { descStr += str[0] } );
            }
        }

        quality = data.quality === 1 ? "attack" : "skill";
        
        type    = CardShowType[data.type];
        bgFlag  = data.type === 5 ? 3 : ( data.type === 4 ? 2 : 1 );

        energy  =  isNaN((data.cost_energy as any) -0) ? 0 : (data.cost_energy as any) -0;

        this.card_desc  = { text: `${descStr}` };
        this.card_type  = data.type;
        this.card_energy= { imageURL: getNumberImageURL( energy -0 ) };
        this.card_energy_bg = { imageURL: CardPowerBGList[ isActive ? 0 : 1 ] };
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
    // 卡牌显示节点
    cardNode: UINode;
    _card: Card;
    power: number = 0;
    powerIsActive: boolean = true;
    // handIndex: number;
    // 在总牌堆的序号
    index: number;
    name: string;
    arrIndex: number;
    playCall: Function;
    moveCall: Function;
    downCall: Function;
    createCall: Function;
    scrapCall: Function;
    expendCall: Function;
    // 在手牌时的 显示状态
    normalState:  UIDataState = new UIDataState;
    // 临时 显示状态，用于更新表现
    tempState:  UIDataState = new UIDataState;
    // 临时 显示状态 的记录，用于变化下一状态的起点
    tempState2:  UIDataState = new UIDataState;
    tempScale: number;

    // > 0 时 牌可打出， 否则出牌时回到手牌
    playLockFlag: number = 1;
    // 卡牌 位置状态 
    flag: number = CardFlag.NORMAL;
    // 卡牌 动画状态 
    animFlag: number = CardAnimFlag.STAY;
    animStartTime: number;

    // 卡牌所在牌堆名
    from: string;
    to: string;

    x: number;
    y: number;
    moveX: number = 0;
    moveY: number = 0;
    z: number;
    // createTime: number;
}


export const FaceCfg = {
    // 牌高度
    Height:         358,
    // 牌宽度
    Width:          260,
    HidePer:        0.4,
    // 手牌 牌旋转角度
    RotateAngle:    6,
    StartTop:       410,
    // 手牌弧半径
    Radius:         800,
    // 能量图标
    PowerSize: [ 64, 64 ],
    PowerLT: [ 0, 0 ],
    // 能量文字
    PowerTextLT: [ 16, 10 ],
    PowerTextSize: 32,
    // 顶部文字
    TitleFontSize: 24,
    TitleWidth: 256,
    TitleLT: [ 136, 13 ],
    TitleColor: "#ffffff",
    // 顶部文字描边
    TitleBorderColor: "#331f08",
    TitleBorderWidth: 1,
    // 顶部文字 升级后颜色
    TitleColor2: "#00ff00",
    // 卡牌内容背景
    CardImageSize: [ 186, 156 ],
    CardImageLT: [ 36, 40 ],
    // 卡牌描述
    DescLT: [ 54, 238 ],
    DescFontSize: 16,
    DescFontColor: "#61341e",
    DescFontWidth: 128,
}
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

export const CardDrawCfg = {
    Times   : 500,
    Rotate  : -0.3,
    Scale   : 0.2,
    Left    : 16,
    Top     : 470
}

export const CardScrapCfg = {
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
    Times   : 300,
    scale: 0.5
}


export const CardCenterCfg = {
    Times   : 100,
    Rotate  : 0,
    Scale   : 1,
    Left    : 480,
    Top     : 280,
    z_realt : 100 
}

export const CardCreatEndCfg = {
    Times   : 200,
    Rotate  : 0,
    Scale   : 0.5,
    Left    : 420 + FaceCfg.Width/2,
    Top     : 330 + FaceCfg.Height/2
}

export const getNumberImageURL = ( num: number )=>{
    return `symbol/${num}.png`;
}

export const getNumberImageURL_R = ( num: number )=>{
    return `symbol/${num}_r.png`;
}

export const CardPlaceList = [ "cards_draw", "cards_hand", "cards_scrap", "cards_expend", "center", "custom" ];