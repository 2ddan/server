
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend, globalReceive } from "../../app/mod/pi";
import { listen, data as localDB } from "../../app/mod/db";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIDataText, UIDataImage } from "../../app/scene/uiNode";
import { getFont } from "../../app/scene/uiNodeBase";

// ========================================常量定义

// ========================================导出接口

// ========================================数据结构

// ========================================变量声明
export let frame, frameData, frameJson, frameName, frameClass;
let nodePlayerName: any, nodePlayerDesc: any, nodePlayerMoney: any, nodeAvater: any;
let nodeReelList: Array<any>;

// ========================================类定义

// ========================================方法定义

export const openFrame = ()=>{

    let player: any;

    player  = localDB.player;

    console.log( player );
    frameData.playerName    = { text: player.name === "" ? "玩家名字香独秀" : player.name };
    frameData.playerDesc    = { text: player.desc ? player.desc : "大地武士"  };
    frameData.money         = { text: player.money ? `${player.money}`: "0"  };


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

    initPlayerListen();
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

const initPlayerListen = ()=>{
    listen( "player.money", ()=>{ 
            if ( frame !== undefined ){
                updatePlayerMoney( localDB.player.money );
            }
        } );
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
            { nodeName: "moneyIcon",    nodeType: "IMAGE", imageURL: "icon/money.png", 
                    width: 30, height: 30, left: 192, top: 12, z_relat: 1 },
            { nodeName: "playerName",   nodeType: "TEXT", text: "玩家名小脑虎", width: 256,
                    left: 64, top: 16,    font: getFont(18), lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "left", 
                    border_width: 1,    border_color: "#000000", isCommon: false, z_relat: 0 },
            { nodeName: "playerDesc",   nodeType: "TEXT", text: "大地武士", width: 128,
                    left: 64, top: 42,    font: getFont(16), lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "left", 
                    border_width: 1,    border_color: "#000000", isCommon: false, z_relat: 0 },
            { nodeName: "moneyText",    nodeType: "TEXT", text: "2486", width: 64,
                    left: 222, top: 16,    font: getFont(16), lineHeight: 24,
                    font_space: -2,     color: "#ffffff", align: "left", 
                    border_width: 1,    border_color: "#000000", isCommon: false, z_relat: 0 },
        ],
        design: {
            bg: [ "avater", "moneyIcon", "moneyText", "playerName", "playerDesc" ]
        },
        states: {
        },
        dataMatch: {   
            "playerName": "playerName",
            "playerDesc": "playerDesc",
            "moneyText": "money"
        }
    };

    frameData = {
        playerName: { text: "玩家名小脑虎" },
        playerDesc: { text: "大地武士" },
        moneyText: { text: "0" }
    };


    recordUIJson( frameClass, frameJson );
    
    globalReceive({
        "openPlayerMenu": ()=>{
            openFrame();
            globalSend( "openSettingMenu" );
        }
    });
};

init();