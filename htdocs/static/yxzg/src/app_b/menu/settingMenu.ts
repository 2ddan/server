
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend, globalReceive } from "../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS } from "../../app/scene/uiNode";
import { getFont } from "../../app/scene/uiNodeBase";

// ========================================常量定义


// ========================================导出接口

// ========================================数据结构

// ========================================变量声明
export let frame, frameData, frameJson, frameName, frameClass;

// ========================================类定义

// ========================================方法定义

export const openFrame = ()=>{
    frameName = "settingMenu0"
    if (frame !== undefined){ return ; } // throw new Error( `${frameName} 不能重复创建.` ) }
    frame = UINodeCtrl.openFrame( {
                    frameClass: frameClass, 
                    nodeName:   frameName, 
                    jsonNew:    undefined, 
                    data:       frameData
                } );
}

const closeFrame = ()=>{
    if (frame === undefined){ throw new Error( `${frameName} 未被创建.` ) }
    UINodeCtrl.removeNode( frame );
}


// ========================================立即运行

const init = ()=>{
    frameClass  = "settingMenu";

    frameJson = {
        nodeName:    frameClass,
        nodeType:    "FRAME",
        width:   180, 
        height:  48,
        left:    780,    
        top:     0,
        z:       Z_ORDERS.MAIN,
        z_relat: 0,
        nodes: [
            { nodeName: "cardSet",      nodeType: "IMAGE", imageURL: "settingMenu/icon_card_count.png", 
                    width: 40, height: 40, left: 6, top: 4, z_relat: 0 },
            { nodeName: "cardSetNum",   nodeType: "TEXT", text: "1", 
                    left: 25, top: 30,    font: getFont(16), lineHeight: 16,
                    font_space: -2,     color: "#ffffff", align: "center", 
                    border_width: 1,    border_color: "#000000", isCommon: false, z_relat: 1 },
            { nodeName: "LBS",          nodeType: "IMAGE", imageURL: "settingMenu/icon_lbs.png", 
                    width: 40, height: 40, left: 68, top: 4, z_relat: 0 },
            { nodeName: "setting",      nodeType: "IMAGE", imageURL: "settingMenu/icon_setting.png", 
                    width: 40, height: 40, left: 128, top: 4, z_relat: 0 },
            
        ],
        design: {
            cardSet: true,
            cardSetNum: true,
            LBS: true,
            setting: true
        },
        states: {
        },
        dataMatch: {   
        }
    };

    frameData = {
    };

    recordUIJson( frameClass, frameJson );

    globalReceive( {
        "openSettingMenu": ()=>{
            openFrame();
        }
    } )
};

init();