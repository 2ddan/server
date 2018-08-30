/*
 * 卡牌处理
 */

// ============================== 导入
import { getWidth, getHeight, globalReceive, globalSend } from "app/mod/pi";
import { CfgMgr } from "app/mod/cfg_mgr";
import { data as localDB, updata } from "app/mod/db";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg } from "app/scene/uiNode";

import { FSmgr } from "fight/scene";

import { setShowListener } from "app/scene/scene_show";

import { getSelf  } from "app_b/fight/fight";

import { Account } from "./account";
// =============================== 导出

export const main = () => {
	
	
};

// ================================ 本地
let stageNow,
    nodeNow,
    nextNode,
    frameClass = "stage",
    frame;
const events = {
    "1":"小怪",
    "2":"精英",
    "3":"BOSS",
    "4":"商店",
    "5":"营地",
    "6":"随机"
}
/**
 * @description 界面模板
 */
const frameJson = {
    nodeName:    frameClass,
    nodeType:    "FRAME",
    width:   100, 
    height:  100,
    left:    100,    
    top:     200,
    z:       Z_ORDERS.MAIN,
    z_relat: 0,
    nodes: [
    ],
    design: {
    },
    states: {
    },
    dataMatch: {   
    }
}
/**
 * @description 选择事件
 * @param index 每层的节点位置
 */
const selectStage = (index) => {
    nodeNow = index;
    let nowFloor = stageNow.node[index],floor_monster,monsters;
    nextNode = nowFloor[1];
    UINodeCtrl.removeNode( frame );
    //TODO....除战斗外的其他事件
    if(nowFloor[0] > 3){
        updateFloor();
        return;
    }
    //战斗事件
    floor_monster = CfgMgr.getOne("cfg/floor_monster",stageNow.floor)[nowFloor[0]];
    monsters = floor_monster[Math.floor(floor_monster.length*Math.random())];
    globalSend("fight",monsters);
}
/**
 * @description 初始化界面
 */
const initFrame = () => {
    const pushNode = (i) => {
        frameJson.nodes.push({ nodeName: "snode"+(i+1), nodeType: "COLOR", bgColor: "#cccccc", width: 100, height: 100, left: i*105, top: 0, z_relat: 0, opacity: 1  });
        frameJson.nodes.push({ nodeName: `snode${i+1}_name`,   nodeType: "TEXT", text: events[stageNow.node[i][0]],left: i*105+20, top: 40,font: `normal normal ${72}px mnjsh`, lineHeight: 72,font_space: -2,color: "#000000", align: "center",shadow_width: 1,shadow_color: "#000000", isCommon: false, z_relat: 1 });
        frameJson.design["snode"+(i+1)] = true;
        frameJson.design[`snode${i+1}_name`] = true;
    };
    frameJson.nodes = [];
    frameJson.design = {};
    if(nextNode){
        for(let i = 0,len = nextNode.length;i<len;i++){
            pushNode(nextNode[i]-1);
        }
    }else {
        for(let i =0, len = stageNow.node.length;i<len;i++){
            pushNode(i);
        }
    }
    
    recordUIJson( frameClass, frameJson );
}
/**
 * @description 打开界面
 */
const openFrame = () => {
    frame = UINodeCtrl.openFrame( {
		frameClass: frameClass, 
		nodeName:   "stage_list", 
		jsonNew:    undefined, 
		data:       {}
    } );
    if(nextNode){
        for(let i = 0,len = nextNode.length;i<len;i++){
            UINodeCtrl.setFrameNodeListener(frame,"snode"+nextNode[i], new UIListenCfg( "up", ((index)=>{return function(){selectStage(index)}})(nextNode[i]-1) ) );
        }
    }else{
        for(let i =0, len = stageNow.node.length;i<len;i++){
            UINodeCtrl.setFrameNodeListener(frame,"snode"+(i+1), new UIListenCfg( "up", ((index)=>{return function(){selectStage(index)}})(i) ) );
        }
    }
    
	
}
/**
 * @description 设置当前关卡配置
 */
const resetStageCfg = () => {
    stageNow = CfgMgr.getOne("cfg/stage",localDB.player.stage+1);
}
/**
 * @description 更新层数
 */
const updateFloor = () => {
    updata("player.stage",localDB.player.stage+1);
    resetStageCfg();
    initFrame();
    openFrame();
}
/**
 * @description 战斗结算
 */
const account = () => {
    let floor = CfgMgr.getOne("cfg/floor_monster",stageNow.floor),
        nowFloor = floor[`drop${stageNow.node[nodeNow][0]}`];
    Account.account(nowFloor);
}

// ================================== 立即执行
//初始化卡牌数据
// insert("cards",[[201001,1],[201001,1],[201001,1],[201001,1],[201001,1],[201016,1],[201016,1],[201016,1],[201016,1],[201016,1],[201016,1],[201054,1]]);
//设置战斗事件监听
// setShowListener("takeCards",takeCards);
//添加出牌监听
// mgr.addDealEvent("playCard",playCard);
//监听战斗事件
setShowListener("over",account);
//注册全局监听
globalReceive({
	"selectOcc":()=>{
        resetStageCfg();
        initFrame();
        openFrame();
    },
    "fightOver":()=>{
        // account();
        updateFloor();
    }
});