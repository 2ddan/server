/*
 * 卡牌处理
 */

// ============================== 导入
import { getWidth, getHeight, globalReceive, globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { CfgMgr } from "app/mod/cfg_mgr";
import { data as localDB, updata, insert } from "app/mod/db";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg } from "app/scene/uiNode";

import { FSmgr } from "fight/scene";
// =============================== 导出
export class Account{
    /**
    * @description 战斗结算
    */
   static account(dl){
       let drop;
        dl.forEach(e => {
            drop = CfgMgr.getOne("cfg/drop",e);
            if(drop.type == "money"){
                drop_list.push({type:"money",money:drop.rule[0]+Math.floor((drop.rule[1]-drop.rule[0])*Math.random())});
            }else if(drop.type == "card"){
                drop_list.push({type:"card",cards:dropCard(drop,3)});
            }
        });
        updata("account.award",drop_list);
        initAcc();
        openAcc();
   }
}

// ================================ 本地
let drop_list = [],
    frame,
    comp_acc,
    comp_card;
/**
 * @description 组件类
 */
class Component{
    constructor(public nodeName: string){
        
    }
    nodeType =    "FRAME"
    width    = 960 
    height   = 540
    left     = 0    
    top      = 0
    z        = Z_ORDERS.MAIN
    z_relat  = 0
    nodes    = []
    design   = {}
    states   = {}
    dataMatch= {}
}
/**
 * @description 选择奖励
 */
const selectAward = (index) => {
    let award = drop_list[index];
    if(award.type == "money"){
        updata("player.money",localDB.player.money+award.money);
        drop_list.splice(index,1);
        UINodeCtrl.removeNode( frame );
        initAcc();
        openAcc();
        return;
    }
    updata("account.award_index",index);
    console.log("select award :: ",index);
}
/**
 * @description 获取卡牌掉落
 */
const dropCard = (cfg,count) => {
    let i = 0, index,r = [],
        occ = CfgMgr.getOne("cfg/occupation",localDB.player.occupation||"1");
    for(i;i<count;i++){
        index = Util.randomIndexByWeight(cfg.rule);
        r.push(CfgMgr.select(["cfg/card",`cfg/card_${occ.name_en}`],1,{quality:index+1}));
    }
    return r;
}
/**
 * @description 初始化结算界面
 */
const initAcc = () => {
    comp_acc = new Component("account");
    comp_acc.nodes.push({ nodeName: "account_bg", nodeType: "COLOR", bgColor: "#000000", width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: .5  });
    comp_acc.design["account_bg"] = true;
    for(let i =0, len = drop_list.length;i<len;i++){
        comp_acc.nodes.push({ nodeName: "drop_bg"+(i+1), nodeType: "COLOR", bgColor: "#ffffff", width: 300, height: 40, left: 290, top: i*50+200, z_relat: 0, opacity: .5  });
        comp_acc.nodes.push({ nodeName: `drop_text${i+1}`,   nodeType: "TEXT", text: mixText(drop_list[i].type,drop_list[i].money),left:300, top: i*50+201,font: `normal normal ${72}px mnjsh`, lineHeight: 72,font_space: -2,color: "#000000", align: "center",shadow_width: 1, isCommon: false, z_relat: 1 });
        comp_acc.design["drop_bg"+(i+1)] = true;
        comp_acc.design[`drop_text${i+1}`] = true;
    }
    comp_acc.nodes.push({ nodeName: "skip_bg", nodeType: "COLOR", bgColor: "#ffffff", width: 100, height: 40, left: 385, top: 400, z_relat: 0, opacity: 1  });
    comp_acc.nodes.push({ nodeName: `skip_text`,   nodeType: "TEXT", text: "跳过奖励",left:370, top: 405,font: `normal normal ${72}px mnjsh`, lineHeight: 72,font_space: -2,color: "#000000", align: "center",shadow_width: 1, isCommon: false, z_relat: 1 });
    comp_acc.design["skip_bg"] = true;
    comp_acc.design["skip_text"] = true;
    recordUIJson( comp_acc.nodeName, comp_acc );
}

const initCard = () => {
    comp_card = new Component("select_card");
    comp_card.nodes.push({ nodeName: "select_card_bg", nodeType: "COLOR", bgColor: "#000000", width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: .5  });
    comp_card.design["select_card_bg"] = true;
    for(let i =0, len = drop_list.length;i<len;i++){
        comp_card.nodes.push({ nodeName: "drop_bg"+(i+1), nodeType: "COLOR", bgColor: "#ffffff", width: 300, height: 40, left: 290, top: i*50+200, z_relat: 0, opacity: .5  });
        comp_card.nodes.push({ nodeName: `drop_text${i+1}`,   nodeType: "TEXT", text: mixText(drop_list[i].type,drop_list[i].money),left:300, top: i*50+201,font: `normal normal ${72}px mnjsh`, lineHeight: 72,font_space: -2,color: "#000000", align: "center",shadow_width: 1, isCommon: false, z_relat: 1 });
        comp_card.design["drop_bg"+(i+1)] = true;
        comp_card.design[`drop_text${i+1}`] = true;
    }
    comp_card.nodes.push({ nodeName: "skip_bg", nodeType: "COLOR", bgColor: "#ffffff", width: 100, height: 40, left: 385, top: 400, z_relat: 0, opacity: 1  });
    comp_card.nodes.push({ nodeName: `skip_text`,   nodeType: "TEXT", text: "跳过奖励",left:370, top: 405,font: `normal normal ${72}px mnjsh`, lineHeight: 72,font_space: -2,color: "#000000", align: "center",shadow_width: 1, isCommon: false, z_relat: 1 });
    comp_card.design["skip_bg"] = true;
    comp_card.design["skip_text"] = true;
    recordUIJson( comp_card.nodeName, comp_card );
}

/**
 * @description 打开结算界面
 */
const openAcc = () => {
    frame = UINodeCtrl.openFrame( {
		frameClass: comp_acc.nodeName, 
		nodeName:   "account_list", 
		jsonNew:    undefined, 
		data:       {}
    } );
    for(let i =0, len = drop_list.length;i<len;i++){
        UINodeCtrl.setFrameNodeListener(frame,"drop_bg"+(i+1), new UIListenCfg( "up", ((index)=>{return function(){selectAward(index)}})(i) ) );
    }
    UINodeCtrl.setFrameNodeListener(frame,"skip_bg", new UIListenCfg( "up", closeAccount));
}
/**
 * @description 混合奖励文字
 */
const mixText = (type,num?) => {
    if(type == "money"){
        return `${num}金币`;
    }else if(type == "card"){
        return "将一张卡牌放入你的牌组中";
    }
}
const close = () => {}
/**
 * @description 关闭结算
 */
const closeAccount = () => {
    UINodeCtrl.removeNode( frame );
    globalSend("fightOver");
}
// ================================== 立即执行
//初始化奖励数据
insert("account",{
    award:[],
    award_index:-1
});
//设置战斗事件监听
// setShowListener("takeCards",takeCards);
//添加出牌监听
// mgr.addDealEvent("playCard",playCard);
//监听战斗事件
// setShowListener("over",account);
//注册全局监听
// globalReceive({
// 	"selectOcc":()=>{
//         resetStageCfg();
//         initFrame();
//         openFrame();
//     },
//     "fightOver":()=>{
//         // account();
//         updateFloor();
//     }
// });