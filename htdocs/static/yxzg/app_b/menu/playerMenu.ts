
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend } from "../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIDataText, UIDataImage } from "../../app/scene/uiNode";

// ========================================常量定义


// ========================================导出接口
export const globalReceive = {
}

// ========================================数据结构

// ========================================变量声明
export let frame, frameData, frameJson, frameName, frameClass;
let nodePlayerName: any, nodePlayerDesc: any, nodePlayerMoney: any, nodeAvater: any;
let nodeReelList: Array<any>;

// ========================================类定义

// ========================================方法定义

export const openFrame = ()=>{

    frameName = "playerMenu0";

    if (frame !== undefined){ return ; } //throw new Error( `frameName 不能重复创建.` ) }

    frame   = UINodeCtrl.openFrame( {
                    frameClass, 
                    nodeName: frameName, 
                    jsonNew: undefined, 
                    data: frameData
                } );

    nodePlayerName      = UINodeCtrl.readNodeByName( frame, `playerName` );
    nodePlayerDesc      = UINodeCtrl.readNodeByName( frame, `playerDesc` );
    nodePlayerMoney     = UINodeCtrl.readNodeByName( frame, `moneyText` );
    nodeAvater          = UINodeCtrl.readNodeByName( frame, `avater` );

}

const closeFrame = ()=>{
    if (frame === undefined){ throw new Error( `frameName 未被创建.` ) }
    UINodeCtrl.removeNode( frame );

    nodePlayerName      = undefined;
    nodePlayerDesc      = undefined;
    nodePlayerMoney     = undefined;
    nodeAvater          = undefined;

}

/**
 * 更新玩家名
 */
const updatePlayerName = ( str: string )=>{
    UINodeCtrl.updateNodeData( nodePlayerName, new UIDataText( `${str}` ) );
}

/**
 * 更新玩家金币
 */
const updatePlayerMoney = ( count: number )=>{
    UINodeCtrl.updateNodeData( nodePlayerMoney, new UIDataText( `${count}` ) );
}

/**
 * 更新玩家头像
 */
const updatePlayerAvater = ( url: string )=>{
    UINodeCtrl.updateNodeData( nodeAvater, new UIDataImage( `${url}` ) );
}

/**
 * 更新玩家描述
 */
const updatePlayerDesc = ( desc: string )=>{
    UINodeCtrl.updateNodeData( nodePlayerDesc, new UIDataImage( `${desc}` ) );
}

/**
 * 更新卷轴
 */
const updateReel = ()=>{

}
const addOneReel = ()=>{
     
}
const removeOneReel = ()=>{
    
}


// ========================================立即运行

const init = ()=>{
    frameClass  = "playerMenu";

    frameJson = {
        nodeName:    frameClass,
        nodeType:    "FRAME",
        width:   450, 
        height:  70,
        left:    0,    
        top:     0,
        z:       Z_ORDERS.MAIN,
        z_relat: 0,
        nodes: [
            { nodeName: "bg",           nodeType: "IMAGE", imageURL: "playerMenu/player_bg.png", 
                    width: 434, height: 70, left: 0, top: 0, z_relat: 0 },
            { nodeName: "avater",       nodeType: "IMAGE", imageURL: "playerMenu/player_avater.png", 
                    width: 56, height: 56, left: 6, top: 6, z_relat: 1 },
            { nodeName: "moneyIcon",    nodeType: "IMAGE", imageURL: "", 
                    width: 24, height: 24, left: 184, top: 12, z_relat: 1 },
            { nodeName: "playerName",   nodeType: "TEXT", text: "玩家名小脑虎", 
                    left: 64, top: 10,    font: `normal normal ${72}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    shadow_width: 1,    shadow_color: "#000000", isCommon: false, z_relat: 0 },
            { nodeName: "playerDesc",   nodeType: "TEXT", text: "大地武士", 
                    left: 40, top: 36,    font: `normal normal ${64}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    shadow_width: 1,    shadow_color: "#000000", isCommon: false, z_relat: 0 },
            { nodeName: "moneyText",    nodeType: "TEXT", text: "2486", 
                    left: 212, top: 16,    font: `normal normal ${64}px mnjsh`, lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    shadow_width: 1,    shadow_color: "#000000", isCommon: false, z_relat: 0 },
        ],
        design: {
            bg: [ "avater", "moneyIcon", "moneyText", "playerName", "playerDesc" ]
        },
        states: {
        },
        dataMatch: {   
        }
    };

    frameData = {
    };



    recordUIJson( frameClass, frameJson );
};

init();