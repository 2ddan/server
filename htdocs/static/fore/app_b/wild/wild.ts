//==========================================导入
//pi
import { Forelet } from "pi/widget/forelet";
import { remove, open, destory ,getHeight,getWidth } from "pi/ui/root";
import { Widget, factory } from "pi/widget/widget";
import { set as task } from 'pi/util/task_mgr';
//mod
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { data as db, updata, get, insert, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Fight_common } from "fight/a/fore/fight_common";
import { cuurUI, UiFunTable, initValue, getEffectId } from "app/scene/ui_fun";
import * as piSample from "app/mod/sample";
import { Util } from "app/mod/util";
import { listenBack } from "app/mod/db_back";

//scene
import { mgr_data, mgr } from "app/scene/scene";
import { setClickCallback, initAnimFinishCB, forelet as sceneForelet, canvasGoBack ,refreshScene, setResetListener } from "app/scene/base/scene";
import { openUiEffect, destoryUiEffect, effectcallback } from "app/scene/anim/scene"
//app
import { net_request, net_send, net_message } from "app_a/connect/main";
import { loadSlow, loadNow, openLoad } from "app_a/download/download";
import { mapList, pet, initMapList, handScene, updateSelfModule, change_status, setChangeData, olFightOrder } from "app_b/fight_ol/handscene";
import { SMgr } from "app_b/fight_ol/same";
import { initFrame, stopWeaken } from "app_b/fight_ol/frame";

import { wild_boss } from "fight/b/common/wild_boss_cfg";
import { wild_map } from "fight/b/common/wild_map_cfg";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { monster_base } from "fight/b/common/monsterBase";
import { scene_music } from "cfg/b/scene_music";
import { module_cfg } from "app/scene/plan_cfg/module_config";
import { showAccount } from "app_b/fight/fight";
import { process_num } from "app_c/gang/hall_gang_build/collect/collect";
//fight
import { role_base } from "fight/b/common/role_base";
import { Request } from "fight/a/request";
import { Init_Fighter } from "fight/a/common/init_fighter";
import { Scene, FMgr } from "fight/a/fight";
import { blend } from "fight/a/analyze";
import { analyseData, analyseFighter } from "fight/a/fore/node_fight";
//掉落效果
import { node_fun, drop_outFun } from "app_b/widget/drop_out";
import { Music } from "app/mod/music";
import { guide_cfg } from "cfg/b/guide_cfg";
import { vipcard } from "cfg/c/recharge_buy_robolet";
import { function_open } from "cfg/b/function_open";

// ================================ 导出
export const forelet = new Forelet();

export class wild extends Widget {
    //挑战boss
    fightBoss = () => {
        fightBoss();
    }; 

    changeMenuMove = () => {
        arrow_btn_scale = show_top_menu ? 'rotate(0deg)' : 'rotate(180deg)';
        show_top_menu = show_top_menu ? '' : 'none';
        forelet.paint(getData());
    }
    //购买银两元宝
    gotoBug = (arg) => {
        if(arg){
            globalSend("gotoRecharge");
            return;
        }
        globalSend("gotoBuyMoney");
    }
    //显示物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid+",task");
    }
    
    goback = () => {
        let w = forelet.getWidget("app_b-wild-select_map-select_map");
        if (w) {
            destory(w);
        }
    }
    //打开选择挂机地图
    gotoCard = () => {
        globalSend("gotoCard");
    }
    //打开选择挂机地图
    selectMap = () => {
        open("app_b-wild-select_map-select_map");
    }
    //选择1-10
    selectMission = (index)=>{
        tabSwitch = index;
        forelet.paint(getData());        
    }
    //选择具体章节
    selectGuide = (mission)=>{//arg = guard_id
        let wild_history = get("wild.wild_history");
        if(mission == wild_history){
            globalSend("screenTipFun",{words:"您已处于当前关卡！"})            
            return;
        }
        leaveWildFight(() => {
            clearData();
            startWildFight({"index": mission},()=>{
                updata("wild.wild_history", mission);
                forelet.paint(getData());    
                let w = forelet.getWidget("app_b-wild-select_map-select_map");
                if (w) {
                    destory(w);
                } 
            });
             
        });
          
    }

    //前往荒野降魔
    gotoPublicboss = (msg) =>{
        globalSend("goFightPublicBoss",msg);
        publicboss_obj = null;
        publicboss_tip_flag = true;
        forelet.paint(getData());
    }

    //关闭荒野BOSS复活TIP
    closeBossReviveTip = () => {
        publicboss_obj = null;
        publicboss_tip_flag = true;
        // globalSend("closeBossReviveTip");
        forelet.paint(getData());
    }
}
/** 
 * @description 挑战BOSS
 */
export const  fightBoss = () => {
    if (fightScene || lock) {
        return;
    }
    lock = true;
    let timer = setTimeout(()=>{
        openFlagHitBoss.icon = 0;
        openFlagHitBoss.inhert = 0;
        forelet.paint(getData());
        clearTimeout(timer);
        timer = null;
    },0);
    console.log("fightBoss fightWildBossBegin");
    fightWildBossBegin();
}; 
/** 
 * @description 进入野外
 */
export const intoWild = (callback) => {
    changeSceneFight();
};

//改变自动战斗状态
export const changeAutoFinght = function (key, state) {
    autoFight[key] = state;
    if(state){//是否自动挑战BOSS，记录进本地数据库，引导使用
        updata("wild.autoNotFight",0);
    }else{
        updata("wild.autoNotFight",1); 
    }
}

/**
 * @description 退出野外
 */
export const exitWild = (callback) => {
    //正在打boss
    if (!inwild && fightScene) {
        fightScene.setPause(true);
        FMgr.destroy(fightScene);
        fightScene = undefined;
        mgr_data.fightSceneName = "";
        //野外挂机
    } else if (inwild){
        leaveWildFight(() => {
            clearData();
            callback && callback();
        });
        return;
    }
    callback && setTimeout(callback, 0);
};
/**
 * @description 获得开始打野外BOSS时间
 */
export const bossStart = () => {
    wild_boss_start = Util.serverTime();
};

/**
 * 全局广播
 */
export const globalReceive: any = {
    //断线重连
    relogin_ok: () => {
        if(!inwild)
            return;
        //终止推送
        story_scene = true;
        //清除同屏ui_fun数据
        // for (let e in mapList) {
        //     mgr.remove(mapList[e]);
        // }
        refreshScene();
        clearData();
        //请求数据
        let self = handScene.getSelf(),
            arg = {site:[self.x, self.y]};
        leaveWildFight(()=>{
            changeSceneFight(arg);
        },true);
    },
    widgetOpen: (msg) => {
        if(msg === "secondary" && showWild){
            showWild = false;
            mgr.pause(true);
            if(inwild){
                SMgr.setPause(true);
            }
        }else if(msg === "main"){
            showWild = true;
            mgr.pause(false);
            //处理进入二级界面但没切换场景的情况
            if(!changed){
                sceneBack();
            }
        }
        console.log("widgetOpen =============== ");
    },
    releaseMagic: (msg) => {
        

    },
    intoWild: (cb) => {
        intoWild(cb);
    },
    exitWild: (cb) => {
        exitWild(cb);
    },
    closeFastlogin: () => {
        opencount += 1;
        if (opencount !== 2)
            return;
        initWildScene();
        setTimeout(() => {
            open("app_b-wild-wild");
        }, 0);
        open("app_b-wild-change_map-change_map");

    },
    //手动挑战地图上任意一个fighter
    fightRandomBoss: (mapid,cb?) => {
        if(!mapid){
            posTimer = Date.now();
            return;
        }
        let func = () => {
            SMgr.fight(mapid);
        }
        if(curTarget && curTarget != mapid){
            func();
            handScene.updateModule(curTarget,{iscurr:false});
        }else if(!curTarget){
            
            change_status(1,func);
        }
        curTarget = mapid;        
    },
    //显示剧情 隐藏主界面
    showDrame: (arg) => {
        visible = arg;
        forelet.paint(getData());
    },
    //显示menu_top
    show_menu_top : () =>{
        arrow_btn_scale = "rotate(0deg)";
        show_top_menu = "";
        forelet.paint(getData());
    },
    //显示荒野降魔的BOSS复活提醒
    bossRevive : (arg) => {
        publicboss_obj = arg;
        forelet.paint(getData());
        let reviveTimer = setInterval(()=>{
            let time1 = 0;
            time1 += 1;
            if(time1 == 30 || publicboss_tip_flag){
                clearInterval(reviveTimer);
                reviveTimer = undefined;
                publicboss_obj = null;
                forelet.paint(getData());
            }
        },1000)
    },
    //显示荒野降魔的BOSS排队倒计时
    bossLineUp : (arg) => {
        publicboss_obj = arg;
        updata("publicboss.line_up_flag",true);
        lineUpNode();
        forelet.paint(getData());
        modifyPublicboss();
    }
}

const lineUpNode = ( time ?  ) => {
    //排队时间背景板
    node_list["line_up_bg"] = {} ;
    node_list["line_up_bg"].x = 145;
    node_list["line_up_bg"].y = -80;
    node_list["line_up_bg"].z = 5;
    node_list["line_up_bg"].attachment = "2D",
    //背景图
    node_list["line_up_bg"].image = "images/line_up_bg.png";
    //宽高
    node_list["line_up_bg"].imgWidth = 330;
    node_list["line_up_bg"].imgHeight = 170;
    //创建
    mgr.create(node_list["line_up_bg"],"node2d",null,"wild");

    //排队时间
    node_list["line_up_time"] = {} ;
    node_list["line_up_time"].type = "team_damage";
    node_list["line_up_time"].text = (time || 0) + "s";
    node_list["line_up_time"].x = -58;
    node_list["line_up_time"].y = -138;
    node_list["line_up_time"].z = 6;
    node_list["line_up_time"].horizontalAlign = "center";
    node_list["line_up_time"].verticalAlign = "center";
    node_list["line_up_time"].textcfg = "publicbossLineTime";
    mgr.create(node_list["line_up_time"],"text",null,"wild");
}

const removePublicboss = () => {
    mgr.remove(node_list["line_up_time"]);
    mgr.remove(node_list["line_up_bg"]);
    node_list["line_up_bg"] = undefined;
    node_list["line_up_time"] = undefined;
}
const modifyPublicboss = () => {
    let timer;
    timer = setInterval(()=>{
        let line_flag = get("publicboss.lineFlag");
        if(line_flag && publicboss_obj != null){
            line_time += 1;
            node_list["line_up_time"].text = line_time + "s";
            mgr.modify(node_list["line_up_time"]);
        }else{
            clearInterval(timer);
            timer = undefined;
            line_time = 0
            removePublicboss();
            publicboss_obj = null;
            forelet.paint(getData());
        }
    },1000);

}


// ================================= 本地
//1800/(1.5*CEILING(A/F.attackCount,1))*B
let _self;

let uiEffectId = 0;
let drop_funarr = [];
let publicboss_obj : any = {}; //保存荒野降魔BOSS复活的数据 {"name":"boss名称","type":"revive" || "line_up",? "line_up_time":"排队等待时间"}
let visible = false;//显示隐藏主界面
let change_map_width = 0;
let change_map_length = 0;
let targetPosition = []; //目标死亡时怪的坐标点
let fighterStartPosition = []; //目标死亡时fighter的坐标点
let fighterPosition = []; //fighter移动时的坐标
let tabSwitch = 0;//选择地图的大章节
let mission = 0;//选择具体地图章节
let wild_boss_start = 0;//开始挑战跳关BOSS的时间
let fightBossFlag = 0; //正在挑战BOSS
let task_anima = {//任务动画管理
    "border_opacity":1,
    "con_opacity":2,
    "fly":0
};
/**
 * @description 是否野外被锁定
 * enum {
 *  1: 挑战boss开始到战斗逻辑开始运行
 * }
 */
let lock = false; // 是否野外被锁定


let fightScene: Scene,
    flagHitBoss: any = 0,//野外击杀boss标志
    openFlagHitBoss:any = {
        "inhert": 0,
        "icon":0
    },//播放野外boss心跳效果动画
    inwild = false,//是否在野外挂机
    showWild = true,//野外界面是否可见
    changed = false,//野外场景是否被切换过
    fm,
    opencount = 0;

let lastSite = [0, 0];

export let node_list = {}; //存储场景上的2D节点

let bossMisson = false;

let publicboss_tip_flag = false;

let autoFight = {
    'autoFightBoss': false //是否自动挑战boss
};

let arrow_btn_scale = 'rotate(0deg)'; //控制arrow_btn_round箭头指向方向

let line_time = 0; //排队时间

let show_top_menu = ''; //显示隐藏menu_top

let bossNum = 0; //boss挑战任务中的boss击杀个数

let totask = 1;//回到任务点标志

let story_scene = false;
//野外战斗缓存事件，按mapId存储，重新回到野外时一次性更新
//{move:{},insert:{},remove:{}}
let fight_cache: any;

let endTimer = null,
    startTimer = null;

///////////////////////////////////////////////战斗 begin///////////////////////////////////////////////

const changeSceneFight = (arg?) => {
    startWildFight(arg);
}
//与后台通信 请求同屏数据
const startWildFight = function (arg?,callback?) {
    console.log("startWildFight ===== ");
    //TODO
    let msg;
    if (!arg) {
        msg = { "param": {}, "type": "app/pve/wild@fight" };
    } else {
        if (arg.index && arg.site) {
            msg = { "param": { "site": JSON.stringify(arg.site), "guard": arg.index }, "type": "app/pve/wild@fight" };
        } else if (arg.index) {
            msg = { "param": { "guard": arg.index }, "type": "app/pve/wild@fight" };
        } else if (arg.site) {
            msg = { "param": { "site": JSON.stringify(arg.site) }, "type": "app/pve/wild@fight" };
        }
    }
    // return;
    //"site":[1,2] "guard":index
    net_request(msg, function (data) {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
        } else if (data.ok) {
            //获取当前场景资源配置背景音乐
            let sce = wild_map[wild_mission[db.wild.wild_history].map_id].res;
            let src = scene_music[sce];
            if (src) {
                Music.playBgMusci(src);
            }
            fightBossFlag = 0;
            inwild = true;
            story_scene = false;
            let _data: any = Common.changeArrToJson(data.ok);
            let events: any = analyseFighter(_data);
            updata("wild.wild_task_num", _data.wild_task_num);
            SMgr.start("wild",events,dealFightEvents,FMgr.createNavMesh(mgr.getSceneBuffer(sce, ".nav")));
            refreshTask();
            // clearFlag = false;
            callback && callback();
            //人物开始移动
            startTimer = setTimeout(() => {
                change_status(0);
                startTimer = null;
                initFrame();
            }, 1000)
        }
    },true);
}
/**
 * @description 退出野外
 */
const leaveWildFight = function (callback,forcibly?) {
    //停止同屏帧率同步
    stopWeaken();
    SMgr.leave();
    //TODO
    let msg = { "param": {}, "type": "app/pve/wild@exit" };
    net_request(msg, function (data) {
        globalSend("leavewild");
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
            if(forcibly && callback)callback();
        } else if (data.ok) {
            inwild = false;
            startTimer && clearTimeout(startTimer) && (startTimer = null);
            callback && callback();
        }
    });
}
const getData = function () {
    let data: any = {};
    data.flagHitBoss = flagHitBoss;
    data.openFlagHitBoss = openFlagHitBoss;
    data.show_top_menu = show_top_menu;
    data.arrow_btn_scale = arrow_btn_scale;
    data.wild_boss = wild_boss;
    //data.autoFight = autoFight;
    data.wild_mission = wild_mission;
    data.wild_mission_key = Object.keys(wild_mission);
    //data.attackCount = _self ? _self.attackCount : 0;
    data.attackCount = handScene.getSelf() ? handScene.getSelf().attackCount : 0;
    data.bossMisson = bossMisson;
    data.bossNum = bossNum;
    // data.chatDisplay = chatDisplay;
    data.wild_map = wild_map;
    data.vipcard = vipcard;
    data.guide_cfg = guide_cfg;
    data.wild = get("wild");
    data.visible = visible;
    data.change_map_width = change_map_width;
    data.change_map_length = change_map_length;
    data.tabSwitch = tabSwitch;
    data.mission = mission;
    data.fightBossFlag = fightBossFlag;
    data.task_anima = task_anima;
    data.publicboss_obj = publicboss_obj;
    return data;
}
/**
 * @description 每个同屏功能单独处理战斗事件
 */
const handlers:any = {};
//插入
handlers.insert = (e) => {
    if(mapList[e.fighter] || e.fighter.sid !== db.player.role_id)
        return;
    // node_fun();
    // open("app_b-wild-tips_boss-tips_boss");
    open("app_b-wild-change_map-change_map");
    setTimeout(()=>{
        let set = setInterval(()=>{
            change_map_length += 0.1;
            if(change_map_length <= 0.5){
                change_map_width += 0.2;
            }
            if(change_map_length == 1){change_map_width = 1;}

            forelet.paint(getData());

            if(change_map_length >= 2){
                clearInterval(set);
                change_map_length = 0;
                change_map_width = 0;
                forelet.paint(getData());
                set = undefined;
                let w = forelet.getWidget("app_b-wild-change_map-change_map");
                if (w) {
                    destory(w);
                }
            }
            
        },50);
    },1500)
    
    setTimeout(()=>{
        globalSend("translate", {
            "fighter": e.fighter,
            "type": "eff_rwcstx02",
            "time": 3100
        })
    },0);
}
handlers.update_state= 0;
//更新任务
handlers.task = (e) => {
    let _guide_task = get("wild.task.guide");
    if(e.killNum && _guide_task && guide_task()){
        return;
    }
    if(e.fighter !== SMgr.getSelfMapid())
        return;
    if(e.killNum){
        updata("wild.task.killNum",e.killNum);
    }
    if(db.wild.task && db.wild.task.killNum >= db.wild.task.needKillNum){
        if(!handlers.update_state){
            handlers.update_state = 1;
            setTimeout(()=>{
                submitTask();
                handlers.update_state = 0;
            },1200)
        }
    }
}
//处理接收到的战斗事件
const dealFightEvents = function (events) {
    // if(clearFlag) events.event = [];
    //设置移动渲染
    if (events.event.length > 0) {
        let curEvent: any = events.event;
        for (let i = 0; i < curEvent.length; i++) {
            let e = curEvent[i],
                type;
            type = e.type || e[0];
            handlers[type] && handlers[type](e);
            //额外战斗事件处理
            
            globalSend("judgeRandomBoss", e);
            damageFun(e,events.now);
        }
    }
    return true;
}

//判断当前事件主角是否自己
const checkSid = (e,sid) => {
    if(e.fighter && e.fighter.sid === sid){
        return true;
    }
}

//处理战斗伤害事件
let curTarget;
let posTimer;
const damageFun = function (e,now) {
    if(e.type.indexOf("refresh") === 0)
        return;
    if (e.type !== "damage" && e.type !== "effect"){
        let _self = handScene.getSelf(),
            _t = getFighter(curTarget),
            //目标不存在了
            _b = curTarget && (!_t || _t.hp <=0);
        if(e.type !== "remove" && e.fighter.sid === db.user.rid){
            posTimer = Date.now();
        }
        if(e.type === "remove" && e.mapId == curTarget || Date.now()-posTimer > 15 * 1000 ){
            curTarget = null;
            change_status(0);
        }
        return;
    }
    //TODO
    let role_id = db.user.rid;
    let target = mapList[e.target] || fight_cache && fight_cache[e.target].fighter;
    let _fighter = mapList[e.fighter] || fight_cache && fight_cache[e.fighter].fighter;
    if(!target)
        return;
    getPosition(target,_fighter);
    //背包满了打精英怪给引导
    if(target.sid !== role_id && target.show_type == 3){
        let bagFull = get("reclaim.bagFull");
        if (bagFull) {
            updata("reclaim.reclaim_guide",1)
        }
    }
    //更新任务信息 
    // let _guide_task = get("wild.task.guide");
    // if (_fighter.sid === role_id && target.hp <= 0 &&( _fighter.taskInfo || _guide_task)) {
    //     updateTaskDb(_fighter.taskInfo);
    // }
    //自己死亡
    //target 目标怪物 
    if (target.sid === role_id && target.hp <= 0) {
        //TODO..
        totask = -1;
        globalSend("self_die");
    }
}
/**
 * 获得目标怪物死亡时的坐标以及当前人物的坐标
 */
const getPosition = (target,_fighter) => {
    let player = get("player");
    let _module = role_base[player.career_id].module;
    let module_high = module_cfg[_module].high;
    if(target.sid !== player.role_id && target.hp <= 0 && _fighter.sid == player.role_id){
        targetPosition = []; 
        fighterStartPosition = []; 
        targetPosition.push(target.x,target.y,target.z);
        fighterStartPosition.push(_fighter.x,_fighter.y,_fighter.z,module_high/2);
    }
}
/**
 * @description 更新任务数据
 * @param 
 */

const updateTaskDb = (taskInfo) => {
    // if(!taskInfo){return;}
    if(guide_task() || !taskInfo){return;}
    taskInfo.bossName = monster_base[taskInfo.task].name;
    //设置怪物目标
    SMgr.setCondistion([["sid",taskInfo.task]]);
    //当前的小任务
    updata("wild.task", taskInfo);
    
};
/**
 * @description 筛选目标
 * @param 
 */
const selectTarget = (_self,task) => {
    let Dd = function(base){
        this.base = base;
        this.min = [Infinity,null]
        this.max = [-1,null];
        this.calc = function(t){
            let dx = t.x - this.base.x,
                dy = t.y - this.base.y,
                d = dx * dx + dy * dy;
            if(d < this.min[0])
                this.min = [d,t];
            if(d > this.min[0])
                this.max = [d,t];
        }
    };
    let dd = new Dd(_self);
    for(let k in mapList){
        if(mapList[k].sid === task){
            if(mapList[k].hp>0)dd.calc(mapList[k]);
        }
    }
    if(fight_cache){
        for(let k in fight_cache){
            if(!mapList[k] && fight_cache[k].fighter && fight_cache[k].fighter.sid == task && fight_cache[k].fighter.hp > 0){
                dd.calc(fight_cache[k].fighter);
            }
        }
    }
    return dd;
};
/**
 * @description 获取场景中的战斗对象
 * @param 
 */
const getFighter = (mapId) => {
    return fight_cache && fight_cache[mapId] && fight_cache[mapId].fighter || mapList && mapList[mapId];
};
/**
 * @description 回到任务点
 * @param 
 */
let taskStatus = 1;
/**
 * @description 提交任务
 * @param 
 */
const submitTask = () => {
    if(taskStatus)return;
    taskStatus = 1;
    let msg = { "param": {}, "type": "app/pve/wild@award" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log("submitTask_error",data);
            taskStatus = 0;
        } else if (data.ok) {
            let d:any = Common.changeArrToJson(data.ok);
            Common_m.mixAward(d);
            //当前挑战boss任务
            let cur_task = wild_boss[db.wild.wild_boss_order];
            //
            updata("wild.wild_task_num", d.wild_task_num);
            let guide_num = get("wild.guide_num");
            if(d.wild_task_num >= cur_task.task_num && guide_num >= cur_task.guide_num) {
                flagHitBoss = 1;
                openFlagHitBoss.icon = 1;
                updata("wild.flagHitBoss", flagHitBoss);             
                let timer = setTimeout(()=>{
                    openFlagHitBoss.inhert = 1;
                    forelet.paint(getData());
                    clearTimeout(timer);
                    timer = null;                    
                },350);
            }
            refreshTask();
        }
    });
};
/**
 * @description 提交引导任务
 * @param 
 */
export const submitGuideTask = () => {
    if(taskStatus)return;
    taskStatus = 1;
    let msg = { "param": {}, "type": "app/pve/wild@record_guide_num" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.why);
        } else if (data.ok) {
            let d:any = Common.changeArrToJson(data.ok);
            // Common_m.mixAward(d);
            updata("wild.guide_num", d.guide_num);
            let wild = get("wild");
            //当前挑战boss任务
            let cur_task = wild_boss[wild.wild_boss_order];
            if (wild.wild_task_num >= cur_task.task_num && d.guide_num >= cur_task.guide_num) {
                flagHitBoss = 1;
                openFlagHitBoss.icon = 1;
                updata("wild.flagHitBoss", flagHitBoss);             
                let timer = setTimeout(()=>{
                    openFlagHitBoss.inhert = 1;
                    forelet.paint(getData());
                    clearTimeout(timer);
                    timer = null;                    
                },350);
            }
            refreshTask();
        }
    });
};
/**
 * @description 刷新任务
 * @param 
 */
const refreshTask = () => {
    if(guide_task()){   
        return;
    }
    let msg = { "param": {}, "type": "app/pve/wild@refresh_task" };
    net_request(msg, function (data) {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
        } else if (data.ok) {
            //任务完成特效
            if (db.wild.task && db.wild.task.killNum >= db.wild.task.needKillNum && mgr_data.name === "wild") {
                let data = { "effect": "eff_ui_rwwc02", "isOnce": true, "index": 0, "z": -245, "x": -190, "y": 0, "scale": 100, "parent": handScene.getSelf()._show.old.children[0] }
            }
            let task:any = Common.changeArrToJson(data.ok);
            updateTaskDb(JSON.parse(task.result));
            taskStatus = 0;
        }
    });
};
//满足条件刷新成引导任务
const guide_task = ()=>{
    let wild = get("wild");
    if(wild.task && wild.task.guide){
        if(!wild.task.guide[1]){
            let id = get("open_fun.id");
            if(id >= function_open[guide_cfg[wild.task.guide[0]].fun_key].id){
                updata("wild.task.guide", [wild.task.guide[0],1]);
                updata("wild.task.killNum", 1);
                setTimeout(()=>{
                   submitGuideTask();
                   forelet.paint(getData());
                },1200)
            }
            return true;//未完成不刷新任务
        }else{
            return false;//完成刷新任务
        }
    }
    let curr = wild_mission[wild.wild_history].guide;
    if(wild.wild_history == wild.wild_max_mission && curr ){
        let count = 0;
        for(let  i = 0,len = curr.length;i<len;i++){
           
            if(wild.wild_task_num == curr[i][1]){
                let  need = guide_cfg[curr[i][0]].need;//是否是必要的，才能刷新到下一个任务
                if(!need){
                    count--;
                    continue;
                }
                if(wild.guide_num >= i+1+count){continue;}
                updata("wild.task", {
                    "guide": [curr[i][0],0],
                    "taskQuality":1,
                    "killNum":0,
                    "needKillNum":1
                });
                taskStatus = 0;
                forelet.paint(getData());
                return true;
            }
        }
        
    }
    return false;
}
//前台剧情
const gotoStory = function (startFight) {
    //完成剧情对话操作 
    //TODO 

    //执行开始战斗的回调
    //startFight && startFight();
    fightScene.setPause(false);
}
//同屏野外点击事件
const clickScene = (result) => {
    if (!result) return;

    if (fm) {
        mgr.remove(fm);
        fm = undefined;
    }

    if (result.type === "terrain") {
        //TODO
        result.click = true;
        let t, x, y;
        if(result.id >= 0){
            t = mapList[result.id];
            if(!t)
                return;
            x = t.x;
            y = t.y;
        }
        fm = Fight_common.createDest(x || result.data[0], y || result.data[2], false, getEffectId());
        // console.log(fm.id);
        // olFightOrder({ "type": "wild", "result": JSON.stringify(result) });
        SMgr.move({x:result.data[0],y:result.data[2]})
        //清除手动打怪
        // if(curTarget){
        //     change_status(0);
        //     handScene.updateModule(curTarget,{iscurr:false});
        //     curTarget = null;
        // }
        return;
    }else if(result.id){
        let f = mapList[result.id];
        if(f && f.camp !== handScene.getSelf().camp){
            SMgr.fight(result.id);
            // globalReceive.fightRandomBoss(result.id,(data) => {
            //     if(data.ok[0][1] !== "undefined"){
            //         let r = JSON.parse(data.ok[0][1]);
            //         handScene.updateModule(result.id,{iscurr:true});
            //         console.log("",r);
            //     }else{
            //         change_status(0);
            //         curTarget = null;
            //     }
            // });
        }
    } 
    // alert(Move.delta.splice(Move.delta.length -50,50));
    // Move.delta.length = 0;
}

//boss战斗点击事件
const clickBossFight = function (result) {
    if (!result) return;
    if (result.type === "terrain") {
        return
    } else {
        fightScene.fighters.get(1).curTarget = result.id;
    }
}

//创建战斗scene
const initFightScene = function () {
    //创建战斗场景
    let sn = wild_map[wild_mission[db.wild.wild_history].map_id].res;
    fightScene = FMgr.create("fight");
    fightScene.setNavMesh(FMgr.createNavMesh(mgr.getSceneBuffer(sn, ".nav")));
    // node_fun()
    mgr_data.sceneTab["fight"] = fightScene;
    mgr_data.fightSceneName = "fight";
    //战斗事件监听 
    fightScene.listener = (r) => {
        r.event = blend(r.events);
        delete r.events;
        if (mgr_data.name != "wild"){
            fightScene.setPause(true);
            fight_cache = r;
            return;
        }
        if (r.event.length > 0) {
            dealFightseneEvents(r);
        }
        //Move.loop();
        //执行特效
        UiFunTable.runCuurUi(r);
        return true;
    };

    //战斗结束回调
    fightScene.overCallback = (r, scene) => {
        endTimer = setTimeout(() => {
            fightWildBossEnd(r);
        }, 3000);
        findFighterPos(scene);
        console.log(r, scene);
        return true;
    };

}
const dealFightseneEvents = (r) => {
    for (let i = 0, leng = r.event.length; i < leng; i++) {
        let e = r.event[i];
        try {
            //战斗事件处理
            handScene[e.type] && handScene[e.type](e,r.now);
        } catch (ex) {
            if (console) {
                console.error(e, ex);
            }
        }
    }
};
let clearFlag = false;
//清除场景数据
const clearData = function () {
    // clearFlag = true;
    initMapList();
    UiFunTable.clearTO();
    initValue();
    fight_cache = null;
}

//初始化boss挑战场景
const initBossScene = (fd) => {
    let _data: any = Common.changeArrToJson(fd);
    let monsterList = Init_Fighter.initMonster(_data.enemy_fight[0]);
    let fighterList = Init_Fighter.initFighter(_data.own_fight);
    //战斗人员是否为被动
    let passives = [];
    //创建战斗scene
    initFightScene();

    //当前关卡
    let order = db.wild.wild_boss_order;
    let map_id = wild_mission[order].map_id;

    let boss_point; //boss 点
    let fighter_point; //fighter 点

    let boss_look; //boss 朝向
    let fighter_look; //fighter 朝向

    let drama = wild_boss[order].story;

    if (drama) {
        let index = wild_boss[order].boss_site;
        boss_point = wild_map[map_id][`boss_point${index}`];
        fighter_point = wild_map[map_id][`fighter_point${index}`];

        boss_look = wild_map[map_id][`boss_look${index}`];
        fighter_look = wild_map[map_id][`fighter_look${index}`];
    } else {
        if (Math.random() > 0.5) {
            boss_point = wild_map[map_id].boss_point1;
            fighter_point = wild_map[map_id].fighter_point1;

            boss_look = wild_map[map_id].boss_look1;
            fighter_look = wild_map[map_id].fighter_look1;
        } else {
            boss_point = wild_map[map_id].boss_point2;
            fighter_point = wild_map[map_id].fighter_point2;

            boss_look = wild_map[map_id].boss_look2;
            fighter_look = wild_map[map_id].fighter_look2;
        }
    }

    for (let i = 0; i < fighterList.length; i++) {
        let f = fighterList[i];
        f.name = Common.fromCharCode(f.name);
        f.lookat = { "value": [0,0,0], sign: Date.now() };
        f.x = lastSite[0];
        f.y = lastSite[1];
        passives.push(f.passive);
        //设置为被动
        f.passive = true;
        //人物跑到怪面前
        f.handMove = { "x": fighter_point[0], "y": fighter_point[1] };


        updateSelfModule(f);
        Request.insert(f,fightScene);
    }

    for (let i = 0; i < monsterList.length; i++) {
        let f = monsterList[i];
        f.name = Common.fromCharCode(f.name);
        f.lookat = { "value": boss_look, sign: Date.now() };
        f.x = boss_point[i][0];
        f.y = boss_point[i][1];
        passives.push(f.passive);
        //被动怪
        f.passive = true;
        //f.p_visible = false;
        Request.insert(f,fightScene);
    }
    fightScene.setPause(true);

    //初始化剧情数据
    globalSend("initDrama", {
        "id": drama,
        "fightScene": fightScene,
        "fighter_look": fighter_look,
        callback: () => {
            fightScene.fighters.forEach((v,k) => {
                v.passive = passives[k];
            });
        }
    });
    fightScene.setPause(false);
    fightScene.start();
};

//正常挑战boss 
const fightWildBossBegin = function () {
    console.log("fightWildBossBegin");
    let callback_create_fight_scene = function () {
        console.log("callback_create_fight_scene");
        bossMisson = true;
        console.log("wild forelet paint");
        //重置同屏场景自己位置，并清除战斗表现
        let _f = handScene.getSelf();
        lastSite = [_f.x, _f.y];
        //终止推送
        story_scene = true;
        //清除同屏ui_fun数据
        refreshScene();
        clearData();
        fightBossFlag = 1;
        forelet.paint(getData());
        open("app_b-wild-tips_boss-tips_boss");
        setTimeout(function () {
            let w = forelet.getWidget("app_b-wild-tips_boss-tips_boss");
            if (w) {
                destory(w);
            }
        }, 2500);
        let msg = { "param": {}, "type": "app/pve/wild@start" };
        net_request(msg, function (data) {
            // alert(JSON.stringify(data));
            if (data.error) {
                // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
                // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
                console.log(data.why);
            } else if (data.ok) {
                initBossScene(data.ok);
            }
            lock = false;
        });
        //创建前台scene 通信 请求数据
    }

    //通知后台离开同屏战斗挑战boss 回调中设置事件
    leaveWildFight(callback_create_fight_scene);
}

//挑战boss成功 领奖
const getAward = function (callback?) {
    let fast_time = Math.round(Util.serverTime() - wild_boss_start);
    let msg = { "param": {"fast_time":fast_time}, "type": "app/pve/wild@end" };
    net_request(msg, function (data) {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
            callback && callback();
        } else if (data.ok) {
            let r: any = Common.changeArrToJson(data.ok);
            Common_m.mixAward(r);
            globalSend("wildBossExit",[r.fast_time,fast_time]);//最短时间，我的时间
            drop_outFun(r.award.prop,targetPosition,fighterStartPosition);
            targetPosition = [];
            fighterStartPosition = [];
            callback && callback(r);
        }
    });
}
/**
 * @description 寻找战斗结束时fighter坐标，每次战斗结束时及时读取，因为战斗过程中，fighter会随死亡而被移除场景
 * @param scene 
 */
const findFighterPos = (scene: Scene) => {
    const player = get("player"),
        _module = role_base[player.career_id].module,
        module_high = module_cfg[_module].high;
    scene.fighters.forEach((v)=>{
        if(v.show_type == 1){
            targetPosition = [];
            targetPosition.push(v.x,v.y,v.z);
        }
        if(v.sid == player.role_id){
            fighterStartPosition = []; 
            fighterStartPosition.push(v.x,v.y,v.z,module_high/2);
        }
    });
}

//销毁前台战斗scene
const destoryFight = function () {
    FMgr.destroy(fightScene);
    fightScene = undefined;
    mgr_data.fightSceneName = "";
    destoryUiEffect(uiEffectId);
    //清除剧情ui_fun
    clearData();
}
let bossBackWild;
//处理战斗结束退出boss战斗 callback 在 initFightScene 设置
const fightWildBossEnd = function (r) {
    let player = get("player");
    //如果胜利 需要切换地图
    if (r && r == 1) {
        bossNum = 1;
        forelet.paint(getData());
        console.log("wild forelet paint");
        let data = { "effect": "eff_ui_rwwc02", "isOnce": true, "index": 0, "z": -245, "x": -190, "y": 0, "scale": 100, "parent": handScene.getSelf()._show.old.children[0] }
        //mgr.create(data,"ui_effect");
        // uiEffectId = openUiEffect(data, null, "effect_2d");
        //领奖
        getAward((result) => {
            let back = (r) => {
                bossNum = 1;
                forelet.paint(getData());
                refresh_task_anima();
                // console.log("wild forelet paint");
                globalSend("translate", {
                    "fighter": handScene.getSelf(),
                    "type": "eff_rwcstx01",
                    "cb": function () {
                        destoryFight();
                        globalSend("removeProp");
                        //切换地图通讯
                        let cur = db.wild.wild_history;
                        console.log(r);
                        updata("wild.flagHitBoss", flagHitBoss);
                        for (let k in r) {
                            if (k == "award")
                                continue;
                            updata("wild." + k, r[k]);
                        }
                        flagHitBoss = 0;
                        bossMisson = false;
                        updata("wild.flagHitBoss", flagHitBoss);
                        updata("wild.guide_num", 0);
                        updata("wild.wild_task_num", 0);
                        updata("wild.wild_boss_order", cur + 1);
                        if(mgr_data.name == "wild" && wild_mission[cur].map_id == wild_mission[cur+1].map_id){
                            changeSceneFight();
                        }   
                    },
                    "time": 2000
                })
            };
            if(mgr_data.name == "wild"){
                setTimeout(()=>{
                    if(mgr_data.name == "wild"){
                        back(result);
                    }else{
                        bossBackWild = ((r)=>{
                            back(r);
                        })(result)
                    }
                }, 1000);
            }else{
                bossBackWild = ((r)=>{
                    back(r);
                })(result);
            }
        });
    }
    //失败
    if (r && r == 2) {
        //死亡之后关闭自动挑战boss
        if(autoFight.autoFightBoss)globalSend("setupState",5);
        bossMisson = false;
        showAccount({
            "outcome": "lose",
            "extra": {
                "source": "wild_boss_lose",
                "star": "none"
            },
            "result":{"r": 2}
        }, () => {
            destoryFight();
            let arg: any = {};
            let self = handScene.getSelf();
            arg.site = [self.x, self.y];
            arg.index = db.wild.wild_history;
            changeSceneFight(arg);
         });
    //     let arg: any = {};
    //     let self = handScene.getSelf();
    //     arg.site = [self.x, self.y];
    //     arg.index = db.wild.wild_history;
    //     changeSceneFight(arg);
    }

}
/**
 * @description 场景切换回野外时调用
 */
const sceneBack = () => {
    if(lock)
        return;
    if(bossBackWild){
        bossBackWild();
        bossBackWild = null;
    }else if (!fightScene && !inwild) {
        changeSceneFight();
    }else if(fightScene){
        //挑战boss时场景切换
        if(changed){
            handScene.reInsert(fightScene.fighters,changed);
            fightScene.setPause(false);
        }
    } else {
        if(!changed){
            // lock = true;
            // refreshScene();
            let line_flag = get("publicboss.lineFlag")
            if(line_flag && publicboss_obj != null){
                lineUpNode(line_time)
            }
        }
        //更新老的fighter
        handScene.reInsert(SMgr.getScene().fighters,changed);
        SMgr.setPause(false);
        lock = false;
    }
    changed = false;
};

//切换地图通讯
const changeWildScene = function (id) {
    let msg = { "param": {}, "type": "app/pve/new_rebel_army@exit_fight" };
    net_request(msg, function (data) {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
        } else if (data.ok) {
            //
            initWildScene();
            //通知后台进入
            changeSceneFight(db.wild.wild_history);
        }
    });
}

///////////////////////////////////战斗 end //////////////////////////////////////

//////////////////////////////////////// 场 景 ////////////////////////////////////////
/**
 * @description 一次性动画回调
 */
const animBack = (id) => {
    let b=false;
    if (fm && id === fm.id) {
        mgr.remove(fm);
        fm = undefined
        b = true;
    }
    if (!b) {
        b = UiFunTable.aniBack(id);
    }
    return b;
};
//进游戏初始化场景
const initWildScene = function () {
    //此处判断是否需要切换场景

    initAnimFinishCB(animBack);

    //设置点击监听
    setClickCallback(function (result) {
        if (story_scene) {
            clickBossFight(result);
        } else {
            clickScene(result);
        }
    },"wild");
}
// ======================================== 立即执行

//初始化数据库字段
insert("wild", {});
/**
 * @description 监听野外数据变化,刷新页面
 */
let flag = false;
listen("wild.task.killNum,wild.flagHitBoss", () => { 
    if (flagHitBoss && autoFight.autoFightBoss && !process_num) {
        if (lock || !inwild) {
            return;
        }
        let t = setTimeout(() => {
            if(FMgr.getByType("fight").length){
                return;
            }
            if(process_num){
                lock = false;
                return;
            }
            openFlagHitBoss.icon = 0;
            openFlagHitBoss.inhert = 0;
            fightWildBossBegin();
            // fightBoss();
            console.log("db listen fightWildBossBegin");
            // flag = false;
        }, 3000);
        lock = true;
    } else {
        forelet.paint(getData());
    }
});

setResetListener((cmd)=>{
    if(cmd.type === "before")
        return;
    console.log(cmd);
    if(cmd.name === "wild"){
        sceneBack();
    }else{
        changed = true;
    }
        
});
//设置刷新任务动画
const refresh_task_anima = function(){
    let timer_1 = setTimeout(()=>{//消失
        anima_state = 1;
        task_anima.border_opacity = 0;
        forelet.paint(getData());
        clearTimeout(timer_1);
        timer_1 = null;
    },600);

    let timer_out = setTimeout(()=>{//出现+刷新
        anima_after();
        clearTimeout(timer_out);
        timer_out = null;
    },1300);

    function anima_after(){
        // if(!anima_state){
        //     return;
        // }
        task_anima.border_opacity = 1;
        task_anima.con_opacity = 0;
        bossNum && (bossNum = 0);
        forelet.paint(getData());
        let timer_2 = setTimeout(()=>{
            task_anima.con_opacity = 1;
            forelet.paint(getData());
            clearTimeout(timer_2);
            timer_2 = null;
        },600)
        let timer_3 = setTimeout(()=>{
            task_anima.con_opacity = 2;
            forelet.paint(getData());
            anima_state = 0;
            clearTimeout(timer_3);
            timer_3 = null;
        },1200)
    }
}
//推送领奖,怪物的
net_message("wild_award", (msg) => {
    let prop: any = Common.changeArrToJson(msg.award);
    drop_outFun(prop.prop,targetPosition,fighterStartPosition);
    Common_m.mixAward(msg);

});


listen("player.annual_card_due_time,player.month_card_due_time,chat.show,player.allAttr.un_defence,player.diamond",()=>{
    forelet.paint(getData());
});

// listen("player.allAttr.un_defence", () => {
//     forelet.paint(getData());
// })

// listen("guide.list",()=>{
//     let task = get("wild.task.guide");
//     if(!task){return;}
//     let guide = get("guide.list").split("-");
//     if(guide.indexOf(task[0]+"")>-1 && !task[1]){
//         updata("wild.task.guide", [task[0],1]);
//         updata("wild.task.killNum", 1);
//         setTimeout(()=>{
//             submitGuideTask();
//             forelet.paint(getData());
//         },1200)
//     }
// })

let anima_state = 0;
listen("wild.task",()=>{
    let task = get("wild.task");
    if(!task){return;}
    let need = task.needKillNum;
    let now = task.killNum;
    if(now>=need && !anima_state){
        anima_state = 1;
        refresh_task_anima();
    }
})

listenBack("app/pve/wild@read", function (data) {
    let dataInfo = data;
    for (let e in dataInfo) {
        updata("wild." + e, dataInfo[e]);
    }

    updata("wild.wild_boss", wild_boss);

    //当前任务波数
    let cur = db.wild.wild_task_num;
    //当前挑战boss任务
    let cur_task = wild_boss[db.wild.wild_boss_order];
    //
    updata("wild.wild_task_num", cur);

    if (cur >= cur_task.task_num && dataInfo.guide_num >= cur_task.guide_num) {
        flagHitBoss = 1;
        openFlagHitBoss.icon = 1;
        let timer = setTimeout(()=>{
            openFlagHitBoss.inhert = 1;
            forelet.paint(getData());
            
            clearTimeout(timer);
            timer = null;
        },350)
        updata("wild.flagHitBoss", flagHitBoss);
    }
    forelet.paint(getData());
    globalReceive.closeFastlogin();
});