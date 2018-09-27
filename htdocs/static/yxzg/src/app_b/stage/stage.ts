/*
 * 卡牌处理
 */

// ============================== 导入
import { globalReceive, globalSend } from "app/mod/pi";
import { CfgMgr } from "app/mod/cfg_mgr";
import { data as localDB, updata, insert } from "app/mod/db";
import { DBback } from "app/mod/db_back";

import { FSmgr } from "fight/scene";


import { setShowListener } from "app/scene/scene_show";

import { getSelf  } from "app_b/fight/fight";

import { Account } from "./account";
import { ShowFunList } from "../fight/show";
// =============================== 导出

// ================================ 本地
let stageNow,
    nodeNow,
    nextNode,
    initStatus = 2;
const events = {
    "1":"小怪",
    "2":"精英",
    "3":"BOSS",
    "4":"商店",
    "5":"营地",
    "6":"随机",
    "7":"事件"
}
/**
 * @description 选择事件
 * @param index 每层的节点位置
 */
const selectStage = (index) => {
    nodeNow = index;
    let nowFloor = stageNow.node[index],floor_monster,monsters,len;
    nextNode = nowFloor[1];
    updata("stage.nextNode",nextNode);
    //TODO....除战斗外的其他事件
    if(nowFloor[0] > 3){
        
    }else{
        //战斗事件
        floor_monster = CfgMgr.getOne("cfg/floor_monster",stageNow.floor)[nowFloor[0]];
        len = floor_monster.length;
        FSmgr.useSeed(index+1,(r) => {
            monsters = floor_monster[Math.floor(r*len)];
        });
        globalSend("fight",monsters);
    }
    globalSend("intoFloor",nowFloor[0]);
}
/**
 * @description 设置当前关卡配置
 */
const resetStageCfg = () => {
    stageNow = CfgMgr.getOne("cfg/stage",localDB.stage.level+1);
}
/**
 * @description 寻找事件
 */
const findEvents = () => {
    let r = [];
    if(nextNode && nextNode.length){
        for(let i = 0,len = nextNode.length;i<len;i++){
            r.push(stageNow.node[nextNode[i]-1][0]);
        }
    }else{
        for(let i =0, len = stageNow.node.length;i<len;i++){
            r.push(stageNow.node[i][0]);
        }
    }
    return r;
}
/**
 * @description 更新层数
 */
const updateFloor = () => {
    
    resetStageCfg();
    globalSend( "backStage", findEvents() );
}
/**
 * @description 战斗结算
 */
const account = (e) => {
    let floor = CfgMgr.getOne("cfg/floor_monster",stageNow.floor),
        emType = stageNow.node[nodeNow][0],
        nowFloor = floor[`drop${emType}`];
    if(e.result == 1){
        updata("stage.level",localDB.stage.level+1);
        updata("stage.kill.all",localDB.stage.kill.all+FSmgr.getFNbyCamp(0));
        if(emType === "2"){
            updata("stage.kill.elite",localDB.stage.kill.elite+1);
        }else if(emType === "3"){
            updata("stage.kill.boss",localDB.stage.kill.boss+1);
        }
        updata("player.seed",FSmgr.scene.seed); 
        updata("player.hp",getSelf().hp);
        updata("player.max_hp",getSelf().max_hp);
        updata("player.field",localDB.player.field + 1); 
        DBback.save("stage",localDB.stage);
        Account.account(nowFloor);
    //战斗失败
    }else if(e.result == 2){
        Account.fail();
        updata("stage.level",0);
        updata("stage.kill",{
            all:0,
            elite:0,
            boss:0
        });
        updata("stage.nextNode",[]);
        nextNode = [];
        DBback.save("stage",localDB.stage);
    }
}
/**
 * @description 初始化数据
 */
const initDB = (data) => {
    if(data){
        updata("stage.level",data.level);
        updata("stage.kill",data.kill);
        updata("stage.nextNode",data.nextNode);
        nextNode = data.nextNode;
    }
    receive.selectOcc();
}

/**
 * @description 全局监听
 */
const receive = {
	"selectOcc":()=>{
        initStatus -= 1;
        if(initStatus>0){
            return ;
        }
        console.log("selectOcc =============");
        resetStageCfg();
        ShowFunList.init();
        globalSend( "backStage", findEvents() );
    },
    "fightDispose":()=>{
        // account();
        if(localDB.stage.level>0)updateFloor();
    },
    "selectStage": (index)=>{
        if(nextNode && nextNode.length){
            index = nextNode[index] - 1;
        }
        selectStage( index );
    },
    /**
     * @description 退出非战斗关卡节点
     * @param r 
     */
    "outFloor":() => {
        updata("stage.level",localDB.stage.level+1);
        DBback.save("stage",localDB.stage);
        updateFloor();
    }
}
// ================================== 立即执行
//初始化关卡数据
insert("stage",{
    level:0,
    nextNode:0,
    kill:{
        all:0,
        elite:0,
        boss:0
    }
});
//监听后台数据
DBback.listenBack("stage",initDB);
//监听战斗事件
setShowListener("over",account);
//注册全局监听
globalReceive(receive);