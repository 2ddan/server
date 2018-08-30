import { recordUIJson, UINodeCtrl, UIDataState } from "../../app/scene/uiNode";
import { CardNodeData, FaceHeight, FaceWidth } from "./cardBase";

// ========================================常量定义
const NameSize  = 48, NameTop = 5;
const TypeSize  = 40, TypeTop = 94;
const TypeSize2 = 36, TypeTop2 = 94;
const DescSize  = 36, DescTop = 110;
const ShowScale = 1; 

// ========================================数据结构

// ========================================变量声明
let frameJson, frameClass;

// ========================================类定义

// ========================================方法定义
/**
 * 创建卡牌， 作内部缩放
 */
export const creatCard = ( { data, name, parent, jsonNew } : 
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

/**
 * 宽高等比缩放
 */
export const cardScale = ( card: any, s: number ) => {
    let scaleTemp: number;

    scaleTemp   = ShowScale * s;

    UINodeCtrl.updateNodeData( card, new UIDataState( { "scale" : [ scaleTemp, scaleTemp, 1 ] } ) );

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
        width: FaceWidth, height: FaceHeight, 
        left: 0, top: 0,
        z: 1, 
        z_relat: 0, 
        nodes : [
            { nodeName: "bg", nodeType: "IMAGE", imageURL: "", width: FaceWidth, height: FaceHeight, 
                    left: -(FaceWidth/2), top: -(FaceHeight/2), z_relat: 1 },
            { nodeName: "cardEnergy", nodeType: "TEXT", text: "", 
                    left: 10-(FaceWidth/2), top: NameTop-(FaceHeight/2), font: `normal normal ${NameSize}px mnjsh`, lineHeight: NameSize, font_space: -2,color: "#000000", align: "center", shadow_width: 4, shadow_color: "#000000", isCommon: false, z_relat: 5 },
            { nodeName: "cardTypeName", nodeType: "TEXT", text: "", 
                    left: 50-(FaceWidth/2), top: TypeTop-(FaceHeight/2), font: `normal normal ${TypeSize2}px mnjsh`, lineHeight: NameSize, font_space: -2,color: "#000000", align: "center", shadow_width: 0, shadow_color: "#000000", isCommon: false, z_relat: 5 },
            { nodeName: "cardName", nodeType: "TEXT", text: "", 
                    left: 60-(FaceWidth/2), top: NameTop-(FaceHeight/2), font: `normal normal ${TypeSize}px mnjsh`, lineHeight: TypeSize, font_space: -2, color: "#000000", align: "center", shadow_width: 0, shadow_color: "#000000", isCommon: false, z_relat: 5 },
            { nodeName: "cardDesc", nodeType: "TEXT", text: "", 
                    left: 20-(FaceWidth/2), top: DescTop-(FaceHeight/2), font: `normal normal ${DescSize}px mnjsh`, lineHeight: DescSize, font_space: -2, color: "#000000", align: "center", shadow_width: 0, shadow_color: "#000000", isCommon: false, z_relat: 5 },
            { nodeName: "cardFrame", nodeType: "IMAGE", imageURL: "", width: FaceWidth, height: FaceHeight, 
                    left: 0-(FaceWidth/2), top: 0-(FaceHeight/2), z_relat: 3 },
            { nodeName: "cardImage", nodeType: "IMAGE", imageURL: "", width: 82, height: 82, 
                    left: 20-(FaceWidth/2), top: 14-(FaceHeight/2), z_relat: 2 },
            { nodeName: "cardPower", nodeType: "IMAGE", imageURL: "card/card_power.png", width: 26, height: 32, 
                    left: 2-(FaceWidth/2), top: 0-(FaceHeight/2), z_relat: 4 },
        ],
        design: {
            "bg": true,
            "cardName": true, 
            "cardDesc": true, 
            "cardEnergy": true, 
            "cardFrame": true, 
            "cardImage": true, 
            "cardPower": true,
            "cardTypeName": true
        },
        states: {
        },
        dataMatch: {   
            "bg" : "cardBG",
            "cardEnergy"  : "card_energy",
            "cardTypeName"  : "card_typeName",
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