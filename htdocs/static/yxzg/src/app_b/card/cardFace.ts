import { recordUIJson, UINodeCtrl, UIDataState, UIDataImage } from "../../app/scene/uiNode";
import { UINode, getFont }       from "../../app/scene/uiNodeBase";
import { CardNodeData, FaceCfg, getNumberImageURL_R,  getNumberImageURL, CardPowerBGList }        from "./cardBase";

// ========================================常量定义
const ShowScale = 1; 

// ========================================数据结构

// ========================================变量声明
let frameJson, frameClass;
let CardCounter: number = 0;
let CardMap: Map<number, UINode> = new Map;

// ========================================类定义

// ========================================方法定义
/**
 * 创建卡牌， 作内部缩放
 */
export const appendCard = ( { data, name, parent, jsonNew } : 
            { data: CardNodeData, name: string, parent: any, jsonNew: any } )=>{

    let card: any;

    card    = UINodeCtrl.appendNode( { 
                    parent:     parent,
                    nodeName:   name,
                    jsonOrg:    frameJson,
                    jsonNew:    jsonNew,
                    data:       data
                } );

    cardScale( card, 1 );

    return card;
}

export const createCard = ( { data, name, parent, jsonNew } : 
        { data: CardNodeData, name: string, parent: any, jsonNew: any } )=>{

    let card: any;

    card    = UINodeCtrl.openFrame( { 
                    nodeName:   name,
                    frameClass: frameClass,
                    jsonNew:    jsonNew,
                    data:       data
            } );
    cardScale( card, 1 );

    return card;
}

/**
 * 宽高等比缩放
 */
export const cardScale = ( card: any, s: number ) => {
    let scaleTemp: number;

    scaleTemp   = ShowScale * s;

    UINodeCtrl.updateNodeData( card, new UIDataState( { "scale" : [ scaleTemp, scaleTemp, 1 ] } ) );

} 

export const cardPowerChange = ( card: any, energy: number, isActive: boolean )=>{
    let powerURL: string, bgURL: string;


    if ( energy !== undefined ){
        powerURL    = isActive ? getNumberImageURL(energy) : getNumberImageURL_R(energy) ;
        UINodeCtrl.updateNodeWithName( card, "cardEnergy", new UIDataImage( powerURL ) );
    }

    // bgURL   = CardPowerBGList[ isActive ? 0 : 1 ];
    // UINodeCtrl.updateNodeWithName( card, "cardPower",  new UIDataImage( bgURL ) );
}

/**
 * 缩放过渡 接口
 */
const animScale = ( toScale: number ) => {

}


/**
 * 缩放过渡 计算循环
 */
const requestAnimScale = ()=>{

}


// ========================================立即运行
const init = ()=>{
    frameClass  = "cardFace";
    frameJson   = { 
        nodeType: "FRAME", 
        uiClass: frameClass, 
        width: FaceCfg.Width, height: FaceCfg.Height, 
        left: 0, top: 0,
        z: 1, 
        z_relat: 0, 
        nodes : [
            { nodeName: "bg", nodeType: "IMAGE", imageURL: "", width: FaceCfg.Width, height: FaceCfg.Height, 
                    left: -(FaceCfg.Width/2), top: -(FaceCfg.Height/2), z_relat: 1 },
            { nodeName: "cardName", nodeType: "TEXT", text: "", width: FaceCfg.TitleWidth,
                    left: FaceCfg.TitleLT[0]-(FaceCfg.Width/2), top: FaceCfg.TitleLT[1]-(FaceCfg.Height/2), 
                    font: getFont( FaceCfg.TitleFontSize ), lineHeight: FaceCfg.TitleFontSize, 
                    font_space: -2, color: FaceCfg.TitleColor, align: "center", //
                    // border_color: null, border_width: null , 
                    isCommon: false, z_relat: 5 },
            { nodeName: "cardDesc", nodeType: "TEXT", text: "", width: FaceCfg.DescFontWidth, 
                    left: (FaceCfg.Width-FaceCfg.DescFontWidth)/2-(FaceCfg.Width/2), top: FaceCfg.DescLT[1]-(FaceCfg.Height/2), 
                    font: getFont( FaceCfg.DescFontSize ), lineHeight: 8, 
                    font_space: -2, color: FaceCfg.DescFontColor, align: "left",
                    border_color: FaceCfg.DescFontColor, border_width: 1 , 
                    isCommon: false, z_relat: 5 },
            { nodeName: "cardFrame", nodeType: "IMAGE", imageURL: "", width: FaceCfg.Width, height: FaceCfg.Height, 
                    left: 0-(FaceCfg.Width/2), top: 0-(FaceCfg.Height/2), z_relat: 3 },
            { nodeName: "cardImage", nodeType: "IMAGE", imageURL: "", 
                    width: FaceCfg.CardImageSize[0], height: FaceCfg.CardImageSize[1], 
                    left: FaceCfg.CardImageLT[0]-(FaceCfg.Width/2), top: FaceCfg.CardImageLT[1]-(FaceCfg.Height/2), 
                    z_relat: 2 },
            { nodeName: "cardPower", nodeType: "IMAGE", imageURL: "", 
                    width: FaceCfg.PowerSize[0], height: FaceCfg.PowerSize[1], 
                    left: FaceCfg.PowerLT[0]-(FaceCfg.Width/2), top: FaceCfg.PowerLT[1]-(FaceCfg.Height/2), 
                    z_relat: 4 },
            { nodeName: "cardEnergy", nodeType: "IMAGE", imageURL: "", 
                    left: FaceCfg.PowerTextLT[0]-(FaceCfg.Width/2), top: FaceCfg.PowerTextLT[1]-(FaceCfg.Height/2), 
                    width: FaceCfg.PowerTextSize, height: FaceCfg.PowerTextSize, z_relat: 5 }
        ],
        design: {
            "bg": true,
            "cardName": true, 
            "cardDesc": true, 
            "cardEnergy": true, 
            "cardFrame": true, 
            "cardImage": true, 
            "cardPower": true
        },
        states: {
        },
        dataMatch: {   
            "bg" : "cardBG",
            "cardPower" : "card_energy_bg",
            "cardEnergy"  : "card_energy",
            "cardName"  : "card_name",
            "cardDesc"  : "card_desc",
            "cardFrame" : "card_frame",
            "cardImage" : "card_image"
        },
        listen: {

        }
    }

    recordUIJson( frameClass, frameJson );
}

init();