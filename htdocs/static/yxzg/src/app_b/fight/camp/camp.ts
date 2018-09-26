/**
 * @module 营地模块 
 * @desc 休息: 增加玩家的hp, 锻造: 升级一张卡牌
 */
// ========================================模块引入

import { globalSend, globalReceive } from "../../../app/mod/pi";
import { UINode, getFont } from "../../../app/scene/uiNodeBase";
import { recordUIJson, UINodeCtrl, UIListenCfg, Z_ORDERS } from "../../../app/scene/uiNode";
import { data as localDB, updata } from "../../../app/mod/db";
import { CfgMgr } from "../../../app/mod/cfg_mgr";

import { CampFrames } from "./campFrames";


// ========================================常量定义


// ========================================导出接口


// ========================================数据结构


// ========================================变量声明
let frameNode: UINode, frameJson: any, frameData: any, frameClass: any;
let cfg_Camp: any;
let nodeRecoverVal:any; // 回复血量值


// ========================================类定义
export class Camp {
    static init = ()=>{
        Camp.openFrame();

    }
    // 打开界面
    static openFrame = ()=>{
        if ( frameNode === undefined ){

            cfg_Camp = CfgMgr.get("cfg/camp"); // 营地配置

            let player: any = localDB.player
            frameData.textRestDes = { text: `回复你最大生命的${cfg_Camp["10"][3]}%血量(${Math.floor(player.max_hp * (Number(cfg_Camp["10"][3]))/100)})` };

            frameNode   = UINodeCtrl.openFrame( {
                            frameClass,
                            nodeName: "camp01",
                            jsonNew: undefined,
                            data: frameData
                        });
            bindFrameNodeHanlder();
        }
    }
    // 关闭界面
    static closeFrame = ()=>{
        UINodeCtrl.removeNode( frameNode );
    }
    // 释放界面
    static dispose = ()=>{
        Camp.closeFrame();
        outCamp();
        frameNode   = undefined;
    }
    // 休息
    static rest = () => {
        restToRecoverHp();
    }
    static openForgeFrame = () => {
        // globalSend('msgOpenForgeFrame');
        // Camp.closeFrame();
        // frameNode = undefined;
    }
    
}


// ========================================方法定义
/**给页面节点元素绑定处理事件 */
const bindFrameNodeHanlder = () => {
    UINodeCtrl.setFrameNodeListener(frameNode, "btnClose", new UIListenCfg( "up", Camp.dispose ) );
    UINodeCtrl.setFrameNodeListener(frameNode, "btnRest", new UIListenCfg('up', Camp.rest));
    UINodeCtrl.setFrameNodeListener(frameNode, "btnForging", new UIListenCfg( "up", Camp.openForgeFrame ) );
}

/**退出营地 */
const outCamp = ()=>{
    globalSend( "outFloor" );
}

/**休息*/
const restToRecoverHp = () => {
    let player: any = localDB.player,
        nowHp = player.hp + Math.floor(player.max_hp * (Number(cfg_Camp["10"][3])/100));

    updata("player.hp", nowHp > player.max_hp ? player.max_hp : nowHp)
    Camp.dispose();
};

// ========================================立即运行
const init = ()=>{

    globalReceive({
        "msgOpenCampFrame": () => {
            Camp.openFrame();
        },
        // "msgCloseCampFrame": () => {
        //     Camp.dispose();
        // }
    })

    let campFJ = CampFrames.getCampFrameJson();

    frameClass = campFJ.nodeName;
    // TODO After Load
    frameJson = campFJ;
    frameData = {
        textRestDes: {text: '休息描述'}
    }
    recordUIJson( frameClass, frameJson );
};
init();
