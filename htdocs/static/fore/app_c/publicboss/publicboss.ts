// widget
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
// mod
import { open,close,piClose,piOpen } from "app/mod/root";
import { Pi,globalSend,cfg} from "app/mod/pi";
import * as piSample from "app/mod/sample";
import { updata, get as getDB, listen, checkTypeof,insert } from "app/mod/db";
import { listenBack } from "app/mod/db_back";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Util } from "app/mod/util";

import { UiFunTable, initValue,getEffectId } from "app/scene/ui_fun";
import { mgr_data, mgr } from "app/scene/scene";
import { setClickCallback, initAnimFinishCB } from "app/scene/base/scene";
import { map_cfg } from "app/scene/plan_cfg/map";
import { Move, setCache, setFrame, frame } from "app/scene/move";

import { mapList, initMapList, handScene, change_status} from "app_b/fight_ol/handscene";

import { analyseFighter, analyseData } from "fight/a/fore/node_fight";
import { Fight_common } from "fight/a/fore/fight_common";

import { exitWild,intoWild } from "app_b/wild/wild"

// 通讯
import { net_request, net_send, net_message } from "app_a/connect/main";
// 功能相关配置文件
import { publicboss_base } from "cfg/c/publicboss_base";
import { publicboss_award } from "cfg/c/publicboss_award";
import { publicboss_config } from "cfg/c/publicboss_config";
import { monster_attribute } from "fight/b/common/monster_attribute";
import { monster_base } from "fight/b/common/monsterBase";

export const forelet : any = new Forelet();

let initData : any ;
let fight_r = {"fightEvents": [], now: 0};
let fm; //切换场景位置
let boss_base = new Array(); //保存boss的基础信息(总血量,名称)
let award_info ; //奖励详情
let map ; //地图
let end_time = 0; //副本战斗结束时间
let total_count = 0; //总次数
let node_list : any = {}; //保存节点数据
let own_rank : any = {}; //我的排名
let fight_rank : any = {};
let boss_index = 0; //boss位置
let kill_info_index = 0; //击杀记录列表下标
let fight_time = 0; //挑战时限
let fight_award : any = {}; //结束挑战BOSS
let fight_boss_id = 0; //挑战的BOSSID
let award_index = 0; //需要分配的物品的标识位
let lineUpBoss = 0; //记录当前排队的BOSS
let next_fight_id = 0; // 用于判断是否与排队中所挑战的BOSSID相同
let un_line_flag = 0; //取消排队标识位
let create_node_flag = 1; //是否需要创建伤害节点标识
let dead_time : any = {}; //保存BOSS的死亡时间
let tip_arr : any = {}; //保存每个BOSS的提醒状态
let rank_bang : any = null;
let rank_type = "big";
// 接收消息
export const globalReceive : any = {
    // 打开荒野降魔主界面
    "gotoPublicBoss" : () => {
        forelet.paint(getData());
        open("app_c-publicboss-main");
    },
    "publicBossLine" : (arg) => {
        let lineFlag = getDB("publicboss.lineFlag");
        if(lineFlag){
            globalSend("popTip", {
                title: "<div>您当前正处于排队状态</div><div>是否要放弃排队前往该玩法地图中?</div>",
                btn_name: ["进入玩法","继续排队"],
                cb: [
                    //确认
                    () => {
                        unlineUp();
                        un_line_flag = 0;
                        updata("publicboss.lineFlag",0);
                        globalSend(arg);
                    },
                    //取消
                    () => {}
                ]
            });
        }
    }
}

//页面数据
const getData = () => {
    refreshCount();
    let data : any = {};
    data.initData = initData;
    data.player = getDB("player");
    data.boss_base = boss_base;
    data.publicboss_cfg = publicboss_config;
    data.award_info = award_info;
    data.map = map;
    data.end_time = end_time;
    data.total_count = total_count;
    data.kill_info_index = kill_info_index;
    data.fight_time = fight_time;
    data.fight_award = fight_award;
    data.award_index = award_index;
    data.un_line_flag = un_line_flag;
    data.dead_time = dead_time;
    data.tip_arr = tip_arr;
    data.rank_bang = rank_bang;
    return data;
}

export class publicboss extends Widget {
    // 关闭widget
    goback = (arg) => {
        close(arg.widget);
    }

    //tab切换按钮
    // changeColumns = (msg) => {
        // if(tab_type == msg.type_m) return;
        // tab_type = msg.type_m;
        // forelet.paint(getData());
    // }

    // 挑战次数倒计时回调
    cdEnd(){
        forelet.paint(getData());
    }

    /** 
     * 倒计时回调 重置对应BOSS的死亡时间
    */
    refershBoss (arg) {
        // let boss_name = null;
        // let _index = 0;
        // for(let i=0;i<initData.boss_info;i++){
        //     if(initData.boss_info[0] == arg - 0){
        //         _index = initData.boss_info[4];
        //     }
        // }
        // boss_name = boss_base[_index].name;
        let arr = getDB("publicboss.tip_arr");
        if(arr[arg]){
            // globalSend("bossRevive",{"boss_id":boss_name,"type":"revive"});
            updata("publicboss.tip_arr."+arg,0);
            // alert(arg+"这个BOSS活了！！！！");
        }
        dead_time[arg] = 0;
        forelet.paint(getData);
    }

    /**
     * 倒计时回调 重置挑战次数时间
     */
    refershCount () {
        forelet.paint(getData);
    } 

    // 打开提醒设置界面
    openTips () {
        open("app_c-publicboss-boss-revive_tip");
    }

    // 设置提醒状态
    setTips (arg) {
        let tips_arr = getDB("publicboss.tip_arr");
        tips_arr = tips_arr == undefined ? {} : tips_arr;
        tips_arr[arg] = tips_arr[arg] ? 0 : 1;
        updata("publicboss.tip_arr."+arg,tips_arr[arg]);
        forelet.paint(getData());
    }

    // 购买挑战次数
    buyCount(){
        let diamond = getDB("player.diamond"),
        vip = getDB("player.vip"),
        costArr = publicboss_config.spend,
        num = getDB("publicboss.buy_count"),
        max = 1000000000;

        globalSend("popTip", {
            title: "<div>是否花费<span style='color:#ff9600'>" + costArr[num > costArr.length - 1 ? costArr.length - 1 : num] + "</span>元宝购买挑战次数</div>",
            btn_name: ["确 定", "取 消"],
            cb: [
                //确认
                () => {
                    if (diamond >= costArr[num > costArr.length - 1 ? costArr.length - 1 : num]) {
                        buyCount();
                    } else {
                        globalSend("popTip", {
                            title: "<div>元宝不足</div><div>是否前往充值</div>",
                            btn_name: ["充值","取消"],
                            cb: [
                                //确认
                                () => {
                                    globalSend("gotoRecharge");
                                },
                                //取消
                                () => {}
                            ]
                        })
                    }
                },
                () => { }
            ]
        })
    }

    //查看奖励详情界面
    openAwardInfo = (arg) => {
        award_info = awardInfo(arg);
        forelet.paint(getData());
        open("app_c-publicboss-award-award_info");
    }

    // 开始挑战BOSS
    startFight = (arg) => {
        if(total_count <= 0){
            globalSend("screenTipFun",{ words: "挑战次数不足！" });
            return;
        }
        chanllengeBoss(arg);
        // open("app_c-publicboss-fight-fight_award");
    }

    // 退出战斗
    exitFight = (arg) => {
        exitFight(arg);
    }

    //击杀记录界面
    killInfo = (arg) => {
        kill_info_index = arg - 0;
        forelet.paint(getData()); 
        open("app_c-publicboss-boss-kill_info");
    }

    //关闭战斗场景
    clothFightScene = () => {
        clearData();
        read();
        let w = forelet.getWidget("app_c-publicboss-fight-fight");
        if (w) {
            piClose(w);
            create_node_flag = 1;
        }
        removeNode();
        rank_type = "big";
        globalSend("intoWild");
    }
    
    //战斗奖励界面的退出场景
    closeFightAward = () => {
        read(()=>{
            closeSceneAndAward();
            forelet.paint(getData());
        });        
    }

    //在次挑战
    againFight = () => {
        if(initData.fight_info[boss_index] >= publicboss_base[fight_boss_id].map_player){
            read(()=>{
                closeSceneAndAward();
                forelet.paint(getData());
            }); 
        }else{
            read(()=>{
                closeSceneAndAward();
                let timer = setTimeout(()=>{
                    chanllengeBoss();
                    clearTimeout(timer);                
                    timer = undefined;
                },200);
            }); 
        }
    }

    //申请索要物品
    apply = (arg) => {
        applyAward(arg);
    }

    // 打开赠送列表
    sendList = (arg) => {
        award_index = arg;
        forelet.paint(getData());
        open("app_c-publicboss-send-list");
    }

    //分配奖励
    sendAward = (arg) => {
        let arr = arg.split(",");
        sendAward(arr);
    }

    //打开排队界面
    lineUp = (arg) => {
        if(total_count <= 0){
            globalSend("screenTipFun",{ words: "挑战次数不足！" });
            return;
        }
        kill_info_index = arg - 0;
        forelet.paint(getData());
        open("app_c-publicboss-boss-line_up");
    }

    //排队
    line = (arg) => {
        let lineFlag = getDB("publicboss.lineFlag");
        let nextLineFlag = getDB("publicboss.nextLineFlag");
        kill_info_index = arg[1];
        if(nextLineFlag && lineFlag && nextLineFlag != lineFlag){
            kill_info_index = arg[1];
            unlineUp(arg[0] - 0);
            return;
        }
        lineUpBoss = arg[0] - 0;
        lineUp(arg[0] - 0);
    }

    // 取消排队询问
    unlineUp = () => {
        // unlineUp();
        let boss_id = getDB("publicboss.lineFlag");
        if(boss_id){
            un_line_flag = 1;
            forelet.paint(getData());
        }else{
            let w = forelet.getWidget("app_c-publicboss-boss-line_up");
            if(w){
                close(w);
            }
        }
    }

    //取消排队
    goOnUnlineUp = () => {
        unlineUp();
        un_line_flag = 0;        
    }

    //继续排队
    goOnLineUp = () => {
        un_line_flag = 0;
        updata("publicboss.nextLineFlag",0);
        forelet.paint(getData());
    }

    //查看排行榜
    lookRank = () => {
        let w = forelet.getWidget("app_c-publicboss-fight-fight_award");
        if(w){
            close(w);
        }
        open("app_c-publicboss-boss-kill_info");
    }

    //关闭排行榜界面
    gobackrank = () => {
        let w = forelet.getWidget("app_c-publicboss-boss-kill_info");
        if(w){
            close(w);
        }
        open("app_c-publicboss-fight-fight_award");
    }

    //从战斗结算界面前往索要
    gotoAward = () => {
        // tab_type = "award";
        closeSceneAndAward();
        forelet.paint(getData());
        open("app_c-publicboss-award-award");
    }

    //战斗场景中的排行排收起和展开状态控制
    showRankInfo = () => {
        rank_type = rank_type == "big" ? "small" : "big";
        node_list["rank_num"].image = "images/"+rank_type+"_rank_bg.png";
        node_list["rank_num"].imgWidth = rank_type == "big" ? 310 : 310;
        node_list["rank_num"].imgHeight = rank_type == "big" ? 650 : 163;
        mgr.modify(node_list["rank_num"]);
    }
}

//关闭战斗场景和战斗奖励界面
const closeSceneAndAward = () => {
    let w = forelet.getWidget("app_c-publicboss-fight-fight_award");
    if(w){
        close(w);
    }
    let _w = forelet.getWidget("app_c-publicboss-fight-fight");
    if(_w){
        clearData();
        piClose(_w);
        create_node_flag = 1;
        globalSend("intoWild");
    }
    removeNode();
    rank_bang = null;
    rank_type = "big";
}

//挑战BOSS
const chanllengeBoss = (arg?) => {
    let arr;
    if(arg){
        arr = arg.split(",");
    }else{
        arr = [fight_boss_id,boss_index];
    }
    let lineFlag = getDB("publicboss.lineFlag");
    next_fight_id = arr[0] - 0;
    updata("publicboss.nextLineFlag",next_fight_id);
    if(lineFlag && lineFlag != next_fight_id){
        forelet.paint(getData());
        open("app_c-publicboss-boss-line_up");
        return;
    }else if(lineFlag && lineFlag != next_fight_id){
        open("app_c-publicboss-boss-line_up");
        return
    }
    //获取boss房间的地图
    map = publicboss_base[arr[0] - 0].map_id;
    boss_index = arr[1] - 0;
    fight_boss_id = arr[0] - 0;
    fight_time = publicboss_base[fight_boss_id].challenge_time * 1000 + Util.serverTime();
    //打开场景
    forelet.paint(getData());
    
    globalSend("exitWild",()=>{
        startFight(fight_boss_id);
    });
}

// 处理场景上的2D节点
const nub_node = () => {
    let player = getDB("player.name");
    //我的输出节点
    node_list["my_damage"] = {} ;
    node_list["my_damage"].x = 270;
    node_list["my_damage"].y = -460;
    node_list["my_damage"].z = 5;
    node_list["my_damage"].attachment = "2D",
    //背景图
    node_list["my_damage"].image = "images/my_rank.png";
    //宽高
    node_list["my_damage"].imgWidth = 600;
    node_list["my_damage"].imgHeight = 100;
    //创建
    mgr.create(node_list["my_damage"],"node2d");

    //左侧战斗信息节点
	node_list["rank_num"] = {};
	//节点位置
	node_list["rank_num"].x = -120;
	node_list["rank_num"].y = 600;
    node_list["rank_num"].z = 5;
    node_list["rank_num"].attachment = "2D",
	//背景图
	node_list["rank_num"].image = "images/big_rank_bg.png";
	//宽高
	node_list["rank_num"].imgWidth = 310;
	node_list["rank_num"].imgHeight = 650;
	//创建
    mgr.create(node_list["rank_num"],"node2d");
    
    node_list["my_rank"] = {} ;
    node_list["my_rank"].type = "team_damage";
    node_list["my_rank"].text = 0;
    node_list["my_rank"].x = 100;
    node_list["my_rank"].y = -395;
    node_list["my_rank"].z = 6;
    node_list["my_rank"].horizontalAlign = "center";
    node_list["my_rank"].verticalAlign = "center";
    node_list["my_rank"].textcfg = "publicbossmyrank";
    mgr.create(node_list["my_rank"],"text");
}

// 创建战斗场景中的排行榜节点
const create_rank_node = (arg,text,name,num,textcfg?) => {
    let _index = arg-0+1;
    node_list[_index] = {};
    node_list[_index].type = "team_damage";
    node_list[_index].text = text || 0;
    node_list[_index].x = -255;
    node_list[_index].y = (rank_type == "big" ? 347 : 380) - arg * 30;
    node_list[_index].z = 6;
    node_list[_index].visible = true;
    node_list[_index].horizontalAlign = "center";
    node_list[_index].verticalAlign = "center";
    node_list[_index].textcfg = textcfg ? "publicbossGreenrank" : "publicbossrank";
    mgr.create(node_list[_index],"text");

    let __index = arg-0+11;
    node_list[__index] = {};
    node_list[__index].type = "team_damage";
    node_list[__index].text = name || 0;
    node_list[__index].x = -190;
    node_list[__index].y = (rank_type == "big" ? 347 : 380) - arg * 30;
    node_list[__index].z = 6;
    node_list[__index].visible = true;
    node_list[__index].horizontalAlign = "center";
    node_list[__index].verticalAlign = "center";
    node_list[__index].textcfg = textcfg ? "publicbossGreenrank" : "publicbossrank";
    mgr.create(node_list[__index],"text");
    
    let ___index = arg-0+111;
    node_list[___index] = {};
    node_list[___index].type = "team_damage";
    node_list[___index].text = num || 0;
    node_list[___index].x = -125;
    node_list[___index].y = (rank_type == "big" ? 347 : 380) - arg * 30;
    node_list[___index].z = 6;
    node_list[___index].visible = true;
    node_list[___index].horizontalAlign = "center";
    node_list[___index].verticalAlign = "center";
    node_list[___index].textcfg = textcfg ? "publicbossGreenrank" : "publicbossrank";
    mgr.create(node_list[___index],"text");
}

const removeNode = () =>{
    for(let i in node_list){
        mgr.remove(node_list[i]);
        node_list[i] = undefined;
    }
}
//清除场景数据
const clearData = () => {
    initMapList();
    UiFunTable.clearTO();
    initValue();
}

// 取消排队 
const unlineUp = (msg ?) =>{
    let arg = {
        "param": {},
        "type": "app/pve/wilderness_boss@un_line_up"
    };
    net_request(arg,(data)=>{
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let _data:any = Common.changeArrToJson(data.ok);
        let w = forelet.getWidget("app_c-publicboss-boss-line_up");
        updata("publicboss.lineFlag",0);
        if(w){
            close(w);
        }
        if(msg){
            lineUpBoss = msg;
            lineUp(msg);
        }
    });
}

// 排队 
const lineUp = (msg) =>{
    let arg = {
        "param": {"boss_id" : msg},
        "type": "app/pve/wilderness_boss@line_up"
    };
    net_request(arg,(data)=>{
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let line_up = initData.line_up_info[kill_info_index];
        let boss_name = boss_base[kill_info_index].name;
        let line_time = (publicboss_base[msg].challenge_time - 0 / 5) + (line_up.length+1) / 2 + 10;
        globalSend("bossLineUp",{"name":boss_name,"type":"line_up","line_up_time":line_time});
        // let _data:any = Common.changeArrToJson(data.ok);
        updata("publicboss.nextLineFlag",0);
        updata("publicboss.lineFlag",msg);
        forelet.paint(getData());
        let w = forelet.getWidget("app_c-publicboss-boss-line_up");
        if(!w){
            open("app_c-publicboss-boss-line_up");
        }
    });
}
// 战斗相关
const startFight = (msg) =>{
    
    let arg = {
        "param": {
            "boss_id" : msg - 0
        },
        "type": "app/pve/wilderness_boss@fight"
    };
    net_request(arg,(data)=>{
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            // return;
        }
        piOpen("app_c-publicboss-fight-fight");
        //初始化场景
        initScene();
        // total_count--;
        // forelet.paint(getData());
        // change_status(1,()=>{})
        let _data:any = Common.changeArrToJson(data.ok);
        let events:any = analyseFighter(_data);
        fight_r.fightEvents = events.event;
        fight_r.now = events.now;
        updata("publicboss.time",_data.time);
        //处理伤害事件
        dealFightEvents(fight_r);
        nub_node();
    })    
}

// 初始化场景
const initScene = () => {
    //此处判断是否需要切换场景位置
    initAnimFinishCB((id)=>{ 
        if (fm && id === fm.id) {
            mgr.remove(fm);
            fm = undefined
            return;
        }
    });
    //设置点击监听
    setClickCallback(function (result) {
        clickScene(result);
    });
}
// 场景的点击事件
const clickScene = (result) => {
    if (!result) return;
    if (fm) {
        mgr.remove(fm);
        fm = undefined;
    }
    if (result.type === "terrain") {
        fm = Fight_common.createDest(result.data[0], result.data[2], false, getEffectId());
    }
    let msg = {
        "param":{
            "type": "world_boss",
            "result": JSON.stringify(result)
        },
        "type": "app/same_fight@accept_fight_order"
    };
    net_request(msg,(data)=>{
        if(data.errpt){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
    })
}

//退出战斗
/**
 * 
 * @param type 是否需要打开奖励界面
 */
const exitFight = (type) => {
    let arg = {
        "param" : {},
        "type" : "app/pve/wilderness_boss@exit"
    }
    net_request(arg,(data)=>{
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let result = Common.changeArrToJson(data.ok);
        fight_award = Common_m.mixAward(result);
        fight_award.own_rank = own_rank;
        fight_time = 0;
        let count = getDB("publicboss.count");
        if(count){
            count = count - 1;
            updata("publicboss.count",count);
        }
        rank_bang = fight_rank;
        read(()=>{
            forelet.paint(getData());      
            
            if(type){
                open("app_c-publicboss-fight-fight_award");
            }else{
                clearData();
                let w = forelet.getWidget("app_c-publicboss-fight-fight");
                if (w) {
                    piClose(w);
                }
                removeNode();
                create_node_flag = 1;
                rank_type = "big";
                globalSend("intoWild");
            }
        });
        
        
    })
}

// 购买挑战次数
const buyCount = () => {
    net_request({"param":{},"type":"app/pve/wilderness_boss@buy"},(data)=>{
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let result : any= Common.changeArrToJson(data.ok);
        updata("publicboss.buy_count", result.buy_count);
        updata("publicboss.count", result.count);
        updata("publicboss.time", result.time);
        Common_m.deductfrom(result);
        globalSend("screenTipFun", { words: `购买成功` });
        forelet.paint(getData());
    })
}

// 索要归属奖励
// Index 索要物品的ID 
const applyAward = (arg) => {
    net_request({"param":{"index" : arg},"type":"app/pve/wilderness_boss@apply_distribute"},(data)=>{
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let result : any = Common.changeArrToJson(data.ok);
        let awardList = initData.distribute_award_info;
        let player = getDB("player");
        for(let i=0;i<awardList.length;i++){
            if(awardList[i][0] == result.apply){
                if(checkTypeof(awardList[i][5],"Array")){
                    awardList[i][5].push(player.role_id);
                }else{
                    awardList[i][5] = [player.role_id];
                }
                
            }
            if(awardList[i][0] == result.un_apply){
                if(checkTypeof(awardList[i][5],"Array")){
                    for(let m = 0;m < awardList[i][5].length;m++){
                        if(awardList[i][5][m] == player.role_id){
                            delete awardList[i][5][m];
                        }
                    }
                }else{
                    awardList[i][5] = [];
                }
            }
        }
        forelet.paint(getData());
    })
}

//分配奖励
const sendAward = (arg) => {
    let _data : any = {
        "param":{
            "index":arg[0] - 0,
            "type":arg[1] - 0
        },
        "type":"app/pve/wilderness_boss@distribute"
    };
    if(arg.length == 3){
        _data.param.distribute_id = arg[2] - 0;
    }
    net_request(_data,(data)=>{
        if (data.error) {
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let result = Common.changeArrToJson(data.ok);
        let w = forelet.getWidget("app_c-publicboss-send-list");
        if(w){
            close(w);
        }
    })
}

const read = ( callback? ) => {
    net_request({"param":{},"type":"app/pve/wilderness_boss@read"}, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        initData = Common.changeArrToJson(data.ok);
        // 在bossinfo中加入一个标志位 因为排序会导致原来位置发生错乱，对应关系也会出错
        for(let i=0;i<initData.boss_info.length;i++){
            initData.boss_info[i].push(i);
        }
        initData.boss_info = initData.boss_info.sort(sortBoss);
        let role_list = initData.role_info_list;
        // 格式化玩家列表数据
        for(let i=0;i<role_list.length;i++){
            initData.role_info_list[i][1] = Common.changeArrToJson(role_list[i][1]);
        }
        // 格式化分配奖励列表中的物品数据
        distributeAward();
        dealBoss();
        updata("publicboss.count",initData.count);
        updata("publicboss.time",initData.time);
        updata("publicboss.buy_count",initData.buy_count);
        refreshCount();
        if(callback){
            callback()
        }
    })
}
/**
 * 格式化归属分配奖励列表中的物品数据
 * @param msg 可传可不传  传既表示只处理单个数据
 */
const distributeAward = (msg ?) => {
    let data = msg || initData.distribute_award_info;
    for(let i=0;i<data.length;i++){
        let prop = Pi.sample[data[i][2][0]];
        if(prop.type == "equip"){
            data[i][2][1] = piSample.decode(data[i][2],Pi.sample);
        }else{
            data[i][2][1] =  prop;
        }
    }
    return data;
}

/**
 * 处理单个归属分配奖励
 * @param msg 归属奖励
 */
const oneDistributeAward = (msg) => {
    let awardList = initData.distribute_award_info;    
    let data = distributeAward([msg.distribute_info]);
    for(let i = 0;i<awardList.length;i++){
        if(awardList[i][0] == msg.index){
            initData.distribute_award_info[i] = data[0];
        }
    }
    forelet.paint(getData());
}

//处理boss的血量和名称
const dealBoss = () =>{
    let index;
    let boss = initData.boss_info;
    boss_base = new Array();
    for(let i=0;i<boss.length;i++){
        let monster : any = {};
        let level = monster_base[boss[i][0]].attr_id+"-"+boss[i][1];
        let info = monster_attribute[level];
        monster.maxHp = info.attr.max_hp;
        monster.name = Common.fromCharCode(monster_base[boss[i][0]].name);
        boss_base.push(monster);
    }
}

//计算次数
const refreshCount = () => {
    let player = getDB("player");
    let cd = publicboss_config["cd"] * 60;
    let data = getDB("publicboss");
    let now =  Util.serverTime(true);    
    let seconds = now - data.time;
    let count = Math.floor(seconds/cd);
    let init_count = publicboss_config["fight_times"];
    count = count < 0 ? 0 : count > init_count  ? init_count : count;
    total_count = count + data.count;//总次数
    end_time = 0;
    if(total_count < init_count){//计算恢复时间点
        let sec = cd - seconds%cd;//sec后恢复次数            
        end_time = (now + sec)*1000 ;  //恢复初始次数的时间点
    }
}

// 奖励详情界面
const awardInfo = (arg) => {
    let award_info = [];
    let award = publicboss_award[arg];
    // 归属分配奖励
    award_info[0] = [award.distribute_showaward,"归属分配奖励"];
    // 归属奖励 (第一名奖励)
    award_info[1] = [award.attribute_award,"归属奖励"];
    // 第一档奖励
    award_info[2] = [award.first_award,"第一档奖励"+(award.first_num[0]+"-"+award.first_num[1])];
    // 第二档奖励
    award_info[3] = [award.second_award,"第二档奖励"+(award.second_num[0]+"-"+award.second_num[1])];
    // 第三档奖励
    award_info[4] = [award.third_award,"第三档奖励"+(award.third_num[0]+"-"+award.third_num[1])];
    return award_info;
}

//对BOSS进行排序 规则 可挑战>当前不可挑战（等级不足）>还未刷新的顺序进行排列
const sortBoss = (a,b) => {
    let player = getDB("player.level");
    // let time = new Date().getTime();
    let levelA = player - a[1];
    let levelB = player - b[1];
    let hpA = a[2] <= 0 ? 1 : 0;
    let hpB = b[2] <= 0 ? 1 : 0;
    let time = a[3] - b[3];
    
    if(hpA < hpB) return 0;
    else if(hpA > hpB) return 1;
    else if(levelA < levelB) return 1;
    else if(levelA > levelB) return 0;
    else if(time > 0) return 1;
    else if(time < 0) return 0;
}

//处理接收到的战斗事件
const dealFightEvents = (events) => {
    Move.setRender(true);
    if(Move.pause)
        Move.pause = false;
    if (fight_r.fightEvents.length > 0) {
        let i = 0,
            len = fight_r.fightEvents.length;
        for ( ; i < len; i++) {
            let e = fight_r.fightEvents[i],
                type;
            type = e.type || e[0];            
            Move.filter(type,e);
            handScene[e.type] && handScene[e.type](e, fight_r.now);
            if (e.type === "damage" || e.type === "effect") {
                damageFun(e);
            }
        }
    }
    UiFunTable.runCuurUi(fight_r);
    return true;
}

// 伤害事件
const damageFun = (e) => {
    let role_id = getDB("player.role_id"),
        target = mapList[e.target.mapId],
        _fighter = mapList[e.fighter.mapId],
        r = e.r,
        d;
    //自己死亡
    if(target.sid === role_id &&　target.hp <= 0){
        //直接调取结算界面
        exitFight(1);
    }
    if(target.sid !== role_id && target.type == "monster" && target.hp<=0){
        dead_time[fight_boss_id] = Util.serverTime();
        exitFight(1);
        // forelet.paint(getData);
    }
}

// 初始化排行榜数据
const initRankData = (arr : any) => {
    let len = arr.length,
        rank = [];
    if (len === 0) return rank;
    for (let i = 0; i < len; i++) {
        rank[i] = Common.changeArrToJson(arr[i]);
        if (Array.isArray(rank[i].name)) {
            rank[i].name = Common.fromCharCode(rank[i].name);
        }
        if (Array.isArray(rank[i].gang_name)) {
            rank[i].gang_name = Common.fromCharCode(rank[i].gang_name);
        }
    }
    return rank;
}

//接收后台推送战斗指令
net_message("order", (msg) => {
    if (mgr_data.name !== "public_boss") {
        return;
    }
    let events:any = analyseData(msg);
    fight_r.fightEvents = events.event;
    fight_r.now = events.now;
    dealFightEvents(fight_r);
});

//战斗的排行榜
net_message("publicboss_rank_info", (msg) => {
    if (mgr_data.name !== "public_boss") {
        return;
    }
    let player = getDB("player");
    let own_damage = 0;
    let fight_rank_clone = JSON.parse(JSON.stringify(fight_rank));//fight_rank;
    fight_rank[msg.index - 1] = initRankData(msg.rank_info[1]);
    let rank = fight_rank[msg.index - 1];

    node_list["my_rank"].text ="归属: " + rank[0].name + Common.numberCarry(rank[0].damage || 0,100000);
    mgr.modify(node_list["my_rank"]);

    for(let m = 0;m<msg.room_rank_info.length;m++){
        if(msg.room_rank_info[m][0] == player.role_id){
            own_rank = msg.room_rank_info[m][1][1]; 
            own_damage = Common.numberCarry(msg.room_rank_info[m][1][0],100000);
            break;
        }
    }

    if(!fight_rank_clone[msg.index - 1] || create_node_flag){
        for(let i=0;i<rank.length;i++){
            create_rank_node(i,Common.numberCarry(rank[i].damage,100000),rank[i].name,i+1);
            create_node_flag = 0;
            break;
        }
    }
    
    for(let i=0;i<rank.length;i++){
        if(!fight_rank_clone[msg.index - 1][i] || create_node_flag){
            create_rank_node(i,Common.numberCarry(rank[i].damage,100000),rank[i].name,i+1);
            create_node_flag = 0;
        }else{
            let _index = i - 0 + 1;
            let __index =  i - 0 + 11;
            let ___index = i - 0 + 111;
            if(rank_type == "small"){
                node_list[_index].visible = false;
                node_list[__index].visible = false;
                node_list[___index].visible = false;
            }else{
                node_list[_index].visible = true;
                node_list[__index].visible = true;
                node_list[___index].visible = true;
                node_list[_index].text = Common.numberCarry(rank[i].damage,100000);
                node_list[__index].text = rank[i].name;
                node_list[___index].text = i + 1 ;
            }
            mgr.modify(node_list[_index]);
            mgr.modify(node_list[__index]);
            mgr.modify(node_list[___index]);
        }
    }

    if(!node_list[6]){
        create_rank_node(5,own_damage,player.name,own_rank,(rank_type == "small" ? 1 : 0))
    }else{
        node_list[6].y = rank_type == "small" ? 380 : 190;
        node_list[6].text = own_damage;        
        mgr.modify(node_list[6]);
        
        node_list[16].y = rank_type == "small" ? 380 : 190;
        node_list[16].text = player.name;
        mgr.modify(node_list[16]);
        
        node_list[116].y = rank_type == "small" ? 380 : 190;
        node_list[116].text = own_rank;
        mgr.modify(node_list[116]);
    }
});

// publicboss_role_info 玩家信息
net_message("publicboss_role_info",(msg)=>{
    // console.log("publicboss_role_info",msg);
    let data = Common.changeArrToJson(msg.role_info[1]);
    initData.role_info_list.push([msg.role_info[0],data]);
    forelet.paint(getData());
});

// publicboss_exit 战斗人员退出
net_message("publicboss_exit",(msg)=>{
    // console.log("publicboss_exit",msg);
    let boss_id = 0;    
    for(let i=0;i<initData.boss_info.length;i++){
        if(initData.boss_info[i][4] == msg.index-1){
            boss_id = initData.boss_info[i]
        }
    }
    if(total_count <= 0){
        globalSend("screenTipFun",{ words: "挑战次数不足！" });
        return;
    }
    let arr = boss_id + "," + msg.index;
    chanllengeBoss(arr);
});

// publicboss_refresh boss列表的boss状态更新
net_message("publicboss_refresh",(msg)=>{
    // console.log("publicboss_refresh",msg);
    let data = initData.boss_info;
    let index = 0;
    let boss_id = 0;
    for(let n = 0;n<data.length;n++){
        for(let m=0;m<msg.boss_info.length;m++){
            if(msg.boss_info[m][2] !== data[n][2] && data[n][2] == 0){
                index = data[n][4];
                boss_id = data[n][0];
                break;
            }
        }
    }
    let dead_arr = getDB("publicboss.tip_arr");
    let boss_name = boss_base[index].name;        
    if(mgr_data.name == "wild" && dead_arr[boss_id]){
        globalSend("bossRevive",{"name":boss_name,"type":"revive"});        
    }

    for(let i=0;i<msg.boss_info.length;i++){
        msg.boss_info[i].push(i);
    }
    dead_time[boss_id] = 0;
    initData.boss_info = msg.boss_info.sort(sortBoss);
    dealBoss();
    forelet.paint(getData());
});


//publicboss_person_num_refresh 挑战人数更新
net_message("publicboss_person_num_refresh",(msg)=>{
    // console.log("publicboss_person_num_refresh",msg);
    let fighter_info_index = initData.boss_info[msg.index - 1][4];
    initData.fight_info[fighter_info_index] = msg.role_length;
    forelet.paint(getData());
});

// publicboss_distribute_award 分配装备
net_message("publicboss_distribute_award",(msg)=>{
    // console.log("publicboss_distribute_award",msg);
    for(let i=0;i<msg.distribute_info.length;i++){
        let data = distributeAward([msg.distribute_info[i]]);
        initData.distribute_award_info.unshift(data[i]);
    }
    forelet.paint(getData());
});

// publicboss_apply_refresh 申请归属奖励的更新
net_message("publicboss_apply_refresh",(msg)=>{
    // console.log("publicboss_apply_refresh",msg);
    oneDistributeAward(msg);
});

// publicboss_distribute_refresh 分配奖励更新
net_message("publicboss_distribute_refresh",(msg)=>{
    console.log("publicboss_distribute_refresh",msg);
});

//public_boss_line_up 排队数据更新
net_message("public_boss_line_up",(msg)=>{
    // console.log("public_boss_line_up",msg);
    let boss = initData.boss_info;
    let _index = 0;
    for(let i = 0;i<boss.length;i++){
        if(boss[i][0] == lineUpBoss){
            _index = boss[i][4];
        }
    }
    initData.line_up_info[_index] = msg.line_up;
    
});

/**
 * @description 初始化数据库荒野降魔字段
 */
insert("publicboss",{
    "tip_arr":{}
});

read();
