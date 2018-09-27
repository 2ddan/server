
/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { globalSend } from "../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS } from "../../app/scene/uiNode";
import { UINode } from "../../app/scene/uiNodeBase";

// ========================================常量定义


// ========================================导出接口
export const globalReceive = {
}

// ========================================数据结构
class DropItem {
    name: string;
    type: number;
    node: UINode;
}

class DropItemFunc {
    static createNode = ( item: DropItem )=>{

    }
}

// ========================================变量声明
let frame: UINode, frameData, frameJson, frameName, frameClass;
let dropItemList: Array<DropItem>;

// ========================================类定义

// ========================================方法定义

export const openFrame = ()=>{
    frameName = "dropItems0"
    if (frame !== undefined){ throw new Error( `${frameName} 不能重复创建.` ) }
    frame = UINodeCtrl.openFrame( {
                    frameClass: frameClass, 
                    nodeName:   frameName, 
                    jsonNew:    undefined, 
                    data:       frameData
                } );
}

export const closeFrame = ()=>{
    if (frame === undefined){ throw new Error( `${frameName} 未被创建.` ) }
    UINodeCtrl.removeNode( frame );
}



// ========================================立即运行

const init = ()=>{
    frameClass  = "dropItems";

    frameJson = {
        nodeName:    frameClass,
        nodeType:    "FRAME",
        width:   0, 
        height:  0,
        left:    0,    
        top:     0,
        z:       Z_ORDERS.FIGHT,
        z_relat: 0,
        nodes: [   
        ],
        design: {
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