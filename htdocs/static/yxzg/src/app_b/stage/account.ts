/*
 * 卡牌处理
 */

// ============================== 导入
import { getWidth, getHeight, globalReceive, globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { CfgMgr } from "app/mod/cfg_mgr";
import { data as localDB, updata, insert } from "app/mod/db";
import { DBback } from "app/mod/db_back";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg, UIDataState, UIDataImage, UIDataOpacity } from "app/scene/uiNode";

import { FSmgr } from "fight/scene";
import { Card } from "../../fight/class";
import { UIDataText } from "../../app/scene/uiNodeCreator";
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
                drop_list.push({type:"card",cards:dropCard(drop,drop.pattern)});
            }
        });
        updata("account.award",drop_list);
        DBback.save("account",localDB.account);
        initAcc();
        openAcc();
   }
   /**
    * @description 战斗失败
    */
   static fail(){
        initFail();
        openFail();
   }
}

// ================================ 本地

const AwardFontSize: number = 18;

let drop_list = [],
    frame,
    comp_acc,
    comp_fail;
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
    z        = Z_ORDERS.POP
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
    let award = drop_list[index],cs,occ,
        //isSelect ture为确认选牌，false为跳过选牌
        sc = (arr:Array<number>,isSelect=true)=>{
            if(isSelect){
                arr.forEach(e=>{             
                    updata(`cards.${localDB.cards.length}`,[cs[e].id,cs[e].level]);
                })
                drop_list.splice(index,1);
                updata("account.award",drop_list);                    
                if(!drop_list.length){
                    //如果当前已经领取完，返回战斗页面,
                    closeAccount(false);
                    return;
                }
            }

            initAcc();
            openAcc();
        };
    if(award.type == "money"){
        updata("player.money",localDB.player.money+award.money);
        drop_list.splice(index,1);
        UINodeCtrl.removeNode( frame );
        initAcc();
        openAcc();
        return;
    }else if(award.type == "card"){
        cs = [];
        occ = CfgMgr.getOne("cfg/occupation",localDB.player.occupation||"1");
        award.cards.forEach(e => {
            cs.push(CfgMgr.create(["cfg/card",`cfg/card_${occ.name_en}`],e,Card));
        });
        UINodeCtrl.removeNode( frame );
        globalSend("selectCard",{
            cardList: cs,
            cb: sc,
            maxNum: 1,
            minNum: 0,
            selectType: "GET"
        })
    }
    updata("account.award_index",index);
    console.log("select award :: ",index);
}
/**
 * @description 获取卡牌掉落
 */
const dropCard = (cfg,count) => {
    let i = 0, index,r = [],
        occ = CfgMgr.getOne("cfg/occupation",localDB.player.occupation||"1"),
        rule = cfg.rule.slice(),
        len = rule.length,
        condition = [];
    if(cfg.add){
        cfg.add.forEach(e => {
            rule.push(e[1])
        });
    }
    console.log("select cards count "+count);
    for(i;i<count;i++){
        index = Util.randomIndexByWeight(rule);
        if(index >= len){
            condition.push(["id",cfg.add[index-len]]);
        }else{
            condition.push(["quality",index+1]);
        }
        if(cfg.match){
            condition = condition.concat(cfg.match);
        }
        console.log(condition);
        r = r.concat(CfgMgr.select(["cfg/card",`cfg/card_${occ.name_en}`],1,FSmgr.scene,condition,cfg.delete));
        condition = [];
    }
    return r;
}
/**
 * @description 初始化结算界面
 */
const initAcc = () => {
    comp_acc = new Component("account");
    comp_acc.nodes.push({ nodeName: "account_bg", nodeType: "COLOR", bgColor: "#000000", width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: .5  });
    comp_acc.nodes.push({ nodeName: "account_bgImage", nodeType: "IMAGE", imageURL: "background/rewardBG.png", width: 518, height: 374, left: 221, top: 83, z_relat: 0, opacity: 1  });
    // comp_acc.nodes.push({ nodeName: "btnClose", nodeType: "IMAGE", imageURL: "icon/close_normal.png", width: 32, height: 32, right: -16, top: -16, z_relat: 1, opacity: 1  });
    comp_acc.design["account_bg"] = true;
    
    let iconURL: string, iconTxtURL: string ;
    iconURL = "icon/icon_vector.png";
    iconTxtURL  = "text/reward.png";
    comp_acc.nodes.push({ nodeName: "icon", nodeType: "IMAGE", imageURL: `${iconURL}`, width: 394, height: 172, left: 62+221, top: -80+83, z_relat: 1, opacity: 1  });
    comp_acc.nodes.push({ nodeName: "iconText", nodeType: "IMAGE", imageURL: `${iconTxtURL}`, width: 178, height: 40, left: 108, top: 66, z_relat: 1, opacity: 1  });

    // comp_acc.design["account_bgImage"] = [ "btnClose" ];
    comp_acc.design["account_bgImage"] = true;
    comp_acc.design["icon"] = [ "iconText" ];


    for(let i =0, len = drop_list.length;i<len;i++){
        comp_acc.nodes.push({ nodeName: "drop_bg"+(i+1), nodeType: "IMAGE", imageURL: "background/select_bar_normal_bg.png", width: 452, height: 66, left: 254, top: i*70+200, z_relat: 0 });
        comp_acc.nodes.push({ nodeName: `drop_text${i+1}`,   nodeType: "TEXT", text: mixText(drop_list[i].type,drop_list[i].money), width: 256, left:480, top: i*70+204+16,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#ffffff", align: "center",shadow_width: 1, isCommon: false, z_relat: 1 });
        comp_acc.design["drop_bg"+(i+1)] = true;
        comp_acc.design[`drop_text${i+1}`] = true;
    }
    comp_acc.nodes.push({ nodeName: "skip_bg", nodeType: "IMAGE", imageURL: "icon/btn_normal.png", width: 188, height: 44, left: 385, top: 422, z_relat: 0, opacity: 1  });
    comp_acc.nodes.push({ nodeName: `skip_text`,   nodeType: "TEXT", text: `${drop_list.length?"跳过奖励":"关闭结算"}`, width: 128, left:479, top: 430,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#FFFFFF", align: "center",shadow_width: 1, isCommon: false, z_relat: 1 });
    comp_acc.design["skip_bg"] = true;
    comp_acc.design["skip_text"] = true;
    recordUIJson( comp_acc.nodeName, comp_acc );
}

const initFail = () => {
    
    let space = 35;//每一行的间隔
    comp_fail = new Component("fail");
    comp_fail.nodes.push({ nodeName: "fail_bg", nodeType: "COLOR", bgColor: "#000000", width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: .5  });
    comp_fail.design["fail_bg"] = true;
    
    let iconURL: string, iconTxtURL: string ;
    iconURL = "icon/icon_fail.png";
    iconTxtURL  = "text/fail.png";
    comp_fail.nodes.push({ nodeName: "icon", nodeType: "IMAGE", imageURL: `${iconURL}`, width: 394, height: 172, left: 62+221, top: -80+83, z_relat: 1, opacity: 1  });
    comp_fail.nodes.push({ nodeName: "iconText", nodeType: "IMAGE", imageURL: `${iconTxtURL}`, width: 178, height: 40, left: 108, top: 66, z_relat: 1, opacity: 1  });
    comp_fail.design["icon"] = [ "iconText" ];

    comp_fail.nodes.push({ nodeName: "fail_bg1", nodeType: "COLOR", bgColor: "", width: 370, height: 40, left: 300, top: space+150, z_relat: 0, opacity: 0  });
    comp_fail.nodes.push({ nodeName: `fail_text1`,   nodeType: "TEXT", text: `攀爬的楼层（${localDB.stage.level}）`, width: 256, left:300, top: space+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "left",isCommon: false, z_relat: 1 });
    comp_fail.nodes.push({ nodeName: `fail_score1`,   nodeType: "TEXT", text: `9`, width: 64, left:646, top: space+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "right",isCommon: false, z_relat: 1 });
    comp_fail.design["fail_bg1"] = true;
    comp_fail.design["fail_text1"] = true;
    comp_fail.design["fail_score1"] = true;
    comp_fail.nodes.push({ nodeName: "fail_bg2", nodeType: "COLOR", bgColor: "", width: 370, height: 40, left: 300, top: space*2+150, z_relat: 0, opacity: 0  });
    comp_fail.nodes.push({ nodeName: `fail_text2`,   nodeType: "TEXT", text: `杀死的敌人（${localDB.stage.kill.all}）`, width: 256, left:300, top: space*2+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "left",isCommon: false, z_relat: 1 });
    comp_fail.nodes.push({ nodeName: `fail_score2`,   nodeType: "TEXT", text: `7`, width: 64, left:646, top: space*2+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "right",isCommon: false, z_relat: 1 });
    comp_fail.design["fail_bg2"] = true;
    comp_fail.design["fail_text2"] = true;
    comp_fail.design["fail_score2"] = true;
    comp_fail.nodes.push({ nodeName: "fail_bg3", nodeType: "COLOR", bgColor: "", width: 370, height: 40, left: 300, top: space*3+150, z_relat: 0, opacity: 0  });
    comp_fail.nodes.push({ nodeName: `fail_text3`,   nodeType: "TEXT", text: `精英击杀（${localDB.stage.kill.elite}）`, width: 256, left:300, top: space*3+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "left",isCommon: false, z_relat: 1 });
    comp_fail.nodes.push({ nodeName: `fail_score3`,   nodeType: "TEXT", text: `123`, width: 64, left:646, top: space*3+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "right",isCommon: false, z_relat: 1 });
    comp_fail.design["fail_bg3"] = true;
    comp_fail.design["fail_text3"] = true;
    comp_fail.design["fail_score3"] = true;
    comp_fail.nodes.push({ nodeName: "fail_bg4", nodeType: "COLOR", bgColor: "", width: 370, height: 40, left: 300, top: space*4+150, z_relat: 0, opacity: 0  });
    comp_fail.nodes.push({ nodeName: `fail_text4`,   nodeType: "TEXT", text: `打败BOSS（${localDB.stage.kill.boss}）`, width: 256, left:300, top: space*4+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "left",isCommon: false, z_relat: 1 });
    comp_fail.nodes.push({ nodeName: `fail_score4`,   nodeType: "TEXT", text: `500`, width: 64, left:646, top: space*4+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "right",isCommon: false, z_relat: 1 });
    comp_fail.design["fail_bg4"] = true;
    comp_fail.design["fail_text4"] = true;
    comp_fail.design["fail_score4"] = true;


    comp_fail.nodes.push({ nodeName: "fail_bg5", nodeType: "COLOR", bgColor: "", width: 370, height: 50, left: 300, top: space*5+150, z_relat: 0, opacity: 0  });
    comp_fail.nodes.push({ nodeName: `fail_text5`,   nodeType: "TEXT", text: `分数`, width: 256, left:300, top: space*5+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "left",isCommon: false, z_relat: 1 });
    comp_fail.nodes.push({ nodeName: `fail_score5`,   nodeType: "TEXT", text: `1352`, width: 64, left:646, top: space*5+151+9,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#d8c9ab", align: "right",isCommon: false, z_relat: 1 });
    comp_fail.design["fail_bg5"] = true;
    comp_fail.design["fail_text5"] = true;
    comp_fail.design["fail_score5"] = true;

    comp_fail.nodes.push({ nodeName: "count_task_pregress", nodeType: "COLOR", bgColor: "#545b61", width: 390, height: 10, left: 280, top: space*5+150+50, z_relat: 0, opacity: 1  });
    comp_fail.nodes.push({ nodeName: "curr_task_pregress", nodeType: "COLOR", bgColor: "#c8c611", width: 300, height: 10, left: 280, top: space*5+150+50, z_relat: 1, opacity: 1  });
    comp_fail.nodes.push({ nodeName: `curr_task_pregress_text`,   nodeType: "TEXT", text: `[604/750]`, width: 410, left:280, top: space*5+150+50+10,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#aca090", align: "left",isCommon: false, z_relat: 1 });
    comp_fail.nodes.push({ nodeName: `curr_task_pregress_residue`,   nodeType: "TEXT", text: `解锁剩余: 10`, width: 410, left:666, top: space*5+150+50+10,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#aca090", align: "right",isCommon: false, z_relat: 1 });
    comp_fail.design["count_task_pregress"] = true;
    comp_fail.design["curr_task_pregress"] = true;
    comp_fail.design["curr_task_pregress_text"] = true;
    comp_fail.design["curr_task_pregress_residue"] = true;

    comp_fail.nodes.push({ nodeName: "back_bg", nodeType: "IMAGE", imageURL: "icon/btn_normal.png", width: 188, height: 44, left: 385, top: 422, z_relat: 0, opacity: 1  });
    comp_fail.nodes.push({ nodeName: `back_text`,   nodeType: "TEXT", text: "主菜单", width: 188, left:479, top: 429,font: `normal normal ${AwardFontSize}px YaHei`, lineHeight: AwardFontSize,font_space: 1,color: "#ffffff", align: "center",isCommon: false, z_relat: 1 });
    comp_fail.design["back_bg"] = true;
    comp_fail.design["back_text"] = true;
    recordUIJson( comp_fail.nodeName, comp_fail );
}

/**
 * @description 打开成功结算界面
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
    UINodeCtrl.setFrameNodeListener(frame,"skip_bg", new UIListenCfg( "down", scaleBtn));
}
/**
 * @description 打开失败结算界面
 */
const openFail = () => {
    frame = UINodeCtrl.openFrame( {
		frameClass: comp_fail.nodeName, 
		nodeName:   "account_fail", 
		jsonNew:    undefined, 
		data:       {}
    } );
    UINodeCtrl.setFrameNodeListener(frame,"back_bg", new UIListenCfg( "up", backHome));
}
/**
 * @description 打开通关结算界面
 */
const  openVactory= () => {
    frame = UINodeCtrl.openFrame( {
		frameClass: comp_fail.nodeName, 
		nodeName:   "account_fail", 
		jsonNew:    undefined, 
		data:       {}
    } );
    UINodeCtrl.updateNodeWithName( frame, "icon", new UIDataImage( "icon/icon_vactory.png" ) );
    UINodeCtrl.updateNodeWithName( frame, "iconText", new UIDataOpacity( 0 ) );
    UINodeCtrl.updateNodeWithName( frame, "back_text", new UIDataText( "重新开始" ) );
    UINodeCtrl.setFrameNodeListener(frame,"back_bg", new UIListenCfg( "up", backHome));
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
const backHome = () => {
    UINodeCtrl.removeNode( frame );
    FSmgr.destroy();
    clearData();
    globalSend("fightOver", true );
    globalSend("fail");
}
/**
 * @description 按钮点击缩小
 */
const scaleBtn = () => {
    UINodeCtrl.updateNodeWithName( frame, "skip_bg", new UIDataState( { scale:[0.8,0.8,1] } ) );
    // UINodeCtrl.updateNodeWithName( frame, "skip_bg", new UIDataImage( "background/p_down_btn.png" ) );
    UINodeCtrl.updateNodeWithName( frame, "skip_text", new UIDataState( { top:433,scale:[0.8,0.8,1] } ) );
}
/**
 * @description 关闭结算
 * @param isTrue 判断是否需要removeNode
 */
const closeAccount = (isTrue=true) => {
    if(isTrue){
        UINodeCtrl.removeNode( frame );
    }
    clearData();
    if(FSmgr.scene.fighter_id>1){
        FSmgr.clear();
        globalSend("fightOver");
    }
}
const clearData = () => {
    drop_list = [];
    updata("account.award",[]);
    updata("account.award_index",-1);
    DBback.save("account",localDB.account);
}
/**
 * @description 初始化后台数据
 */
const initDB = (data) => {
    if(!data){
        return;
    }
    updata("account.award",data.award);
    updata("account.award_index",data.award_index);
    if(data.award.length){
        //TODO...接上一次结算
        drop_list = data.award;
        initAcc();
        openAcc();
    }
}
// ================================== 立即执行
//初始化奖励数据
insert("account",{
    award:[],
    award_index:-1
});
//监听后台数据
DBback.listenBack("account",initDB);
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