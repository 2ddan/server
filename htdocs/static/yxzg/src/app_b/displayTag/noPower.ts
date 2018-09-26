import { UINode } from "../../app/scene/uiNodeBase";
import { Z_ORDERS, UINodeCtrl } from "../../app/scene/uiNode";
import { recordUIJson } from "../../app/scene/uiNodeCreator";

/**
 * version: XXXXXXX
 *      描述：
 *      xxxxxx
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
// import { XXX }           from "XX/XX";
// import { XXX as SSS }    from "XX/XX";
// import * as SSS          from "XX/XX";


// ========================================常量定义
const StayTime = 1000;

// ========================================导出接口


// ========================================数据结构


// ========================================变量声明

let frameNode: UINode, frameJson: any, frameData: any, frameClass:string = "NoPower";

// ========================================类定义
export class NoPower {
    static show = ()=>{

        if ( frameNode === undefined ){
            let time: any;

            NoPowerFunc.init();

            time    = setTimeout( ()=>{
                NoPowerFunc.dispose();
                clearTimeout( time );
            }, StayTime );
        }
    }
}

class NoPowerFunc {
    static init = ()=>{
        NoPowerFunc.openFrame();
    }
    static dispose = ()=>{
        NoPowerFunc.closeFrame();
        frameNode   = undefined;
    }
    static openFrame = ()=>{
        frameNode = UINodeCtrl.openFrame( {
                        frameClass, 
                        nodeName: "NoPower0",
                        jsonNew: undefined,
                        data: undefined
                    } );
    }
    static closeFrame = ()=>{
        UINodeCtrl.removeNode( frameNode );
    }
}

// ========================================方法定义


// ========================================立即运行
const init = ()=>{
    // TODO After Load

    frameJson = { nodeName: "nodeName", nodeType: "FRAME", uiClass: frameClass, 
        width: 0, height: 0, left: 0, top: 0, z_relat: Z_ORDERS.POP,
        nodes: [
            { nodeName: "BG", nodeType: "IMAGE", imageURL: "background/noPower.png", width: 116, height: 122, left: 245, top: 80, z_relat: 0  },
            { nodeName: `energyTips`,   nodeType: "TEXT", text: `能量不足`, width: 146, left:265, top: 110,font: `normal normal 18px YaHei`, lineHeight: 18,font_space: 1,color: "#000", align: "left",isCommon: false, z_relat: 1 }
        ],
        design: {
            "BG": true,
            "energyTips": true
        },
        dataMatch: {
        }
    };
    
    recordUIJson( frameClass, frameJson );
};
init();
