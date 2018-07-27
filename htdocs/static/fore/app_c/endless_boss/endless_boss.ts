import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert, checkTypeof, listen } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { Util } from "app/mod/util";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { mgr_data, mgr } from "app/scene/scene";
import {  resetcanvas } from "app/scene/base/scene";
import { handScene } from "app_b/fight_ol/handscene";
import { monster_base } from "fight/b/common/monsterBase";
import { SMgr } from "app_b/fight_ol/same";
import { analyseFighter } from "fight/a/fore/node_fight";
import { FMgr } from "fight/a/fight";
import * as root from "pi/ui/root";
import { closeBack } from "pi/ui/root";

//导入配置
import { endless_boss_base } from "cfg/c/endless_boss_base";
import { endless_boss_add } from "cfg/c/endless_boss_add";
import { endless_boss_reward } from "cfg/c/endless_boss_reward";
import { endless_boss_rank } from "cfg/c/endless_boss_rank";
import { map_cfg } from "app/scene/plan_cfg/map";


// =========================== 导出
export const forelet: any = new Forelet();
let boss_hp;

let open_day = null,
    open_time = null,
    award_type = "point",
    fight_award = [],
    my_damage = 0,
    curr_damage_info = [],
    own_rank = [],
    rank_index = 0;
let fight_ing = false; //战斗是否结束
let node_list : any = {}; //保存节点数据
let rank_type = "big"; //排行榜收起展开状态
let create_node_flag = 1; //是否需要创建伤害节点标识


insert("endless_boss", {});

/*接收全局广播*/
export const globalReceive: any = {
    //打开页面
    gotoEndlessBoss: () => {
        
        // if (funIsOpen("endless_boss")) {
            if(isOpen()){
                own_rank = logic.getOwnRank();
                logic.readBossHp();
                forelet.paint(getData());
                open("app_c-endless_boss-endless_boss");
            }else{
                globalSend("gotoOpenTips", {
                    title:"掠夺水晶",
                    week: open_day,
                    time:open_time
                });
            }
        // }
    }
}

export class endless_boss extends Widget {
    //物品详情
    propInfoShow = (id) => {
        globalSend("showOtherInfo", id);
    }
    //排行榜tab切换
    changeColumns(msg){
        if(rank_index == msg.type_m){
            return;
        }
        rank_index = msg.type_m;
        forelet.paint(getData());
    }
    //奖励tab切换
    changeColumns1(msg){
        if(award_type == msg.type_m){
            return;
        }
        award_type = msg.type_m;
        forelet.paint(getData());
    }
    //退出
    goback = (arg) => {
        close(arg.widget);
    }
    //战斗次数增加倒计时
    timeEnd(){
        forelet.paint(getData());
    }
    //战斗时间结束
    timeEnd1(){
        logic.exitFight();
    }
    //排行榜
    gotoRank(){
        forelet.paint(getData());
        open("app_c-endless_boss-rank-rank");
    }
    //详情帮助
    gotoHelp() {
        globalSend("showHelp", "endless_boss");
    };
    //奖励
    gotoAward(){
        forelet.paint(getData());
        open("app_c-endless_boss-award-award");
    }
    //领奖
    award(id){
        if(!id){
            globalSend("screenTipFun", {
                words: "暂无可领取对象"
            }); 
        }
        logic.award(id);
    }
     //挑战boss
     fightBoss(count) {
        logic.challenge(count);
    }
    //战报
    gotoFightEvent(){
        let record = getDB("endless_boss.event_record");
        if(!record){
            globalSend("screenTipFun", {
                words: "暂无战报"
            });
            return;
        }
        forelet.paint(getData());
        open("app_c-endless_boss-fight_event-fight_event");
    }
    //退出战斗
    exit() {
        //弹出询问框
        globalSend("popTip",{
            title:"<div>是否退出战斗?</div>",
            btn_name:["退出","取消"],
            cb:[
                //确认
                ()=>{
                    logic.exitFight();
                },
                //取消
                () => {}
            ]
        })
    }
    //关闭结算页面
    closeFightAward() {
        logic.closeFightAward();
    }
    //战斗场景中的排行排收起和展开状态控制
    showRankInfo = () => {
        //先remove在create为暂时解决方法,不支持该方法(底层BUG有待修复);修复之后直接modify
        mgr.remove(node_list["rank_num"]);

        rank_type = rank_type == "big" ? "small" : "big";
        node_list["rank_num"].image = "images/"+rank_type+"_rank_bg.png";
        node_list["rank_num"].imgWidth = (rank_type == "big" ? 310 : 310 ) * (mgr_data.scale * (2/2.7) + 0.11);
        node_list["rank_num"].imgHeight = (rank_type == "big" ? 650 : 163) * (mgr_data.scale * (2/2.7) + 0.11);
        mgr.create(node_list["rank_num"],"node2d");
    }
    //购买次数
    buyCount(count){    
        let diamond = getDB("player.diamond") || 0,
            info = getDB("endless_boss"),
            buy_count = info.buy_count || 0,
            max = endless_boss_base.buy_limit,
            cost = endless_boss_base.buy_price[buy_count] || endless_boss_base.buy_price[endless_boss_base.buy_price.length -1];
        if(buy_count >= max){
            globalSend("screenTipFun", {
                words: "已达购买上限"
            });
            return;
        }
        if(cost > diamond){
            globalSend("popTip",{
                title:"<div>元宝不足</div><div>是否前往充值</div>",
                btn_name:["充值","取消"],
                cb:[
                    //确认
                    ()=>{
                        globalSend("gotoRecharge"); 
                    },
                    //取消
                    ()=>{
                       
                    }
                ]
            })
            return;
        }
        let buyData = {
            "title": "购买次数",
            "type": "无尽战斗",
            "coin": "diamond",
            "btn_name": "购 买",
            "price": endless_boss_base.buy_price,
            "max_buy": max,
            "already_buy": buy_count,
            "has_count": logic.getCount()[0],
            "buy_count": 1,
            "callBack": (r) => {
                logic.buyCount(r);
            }
        };
        //发送消息购买
        globalSend("gotoBuyCount", buyData);
    }
}

//更新数据
let update_data:any = {
    "Pi": Pi,
    "endless_boss_base": endless_boss_base,
    "endless_boss_add": endless_boss_add,
    "endless_boss_rank": endless_boss_rank,
    "endless_boss_reward": endless_boss_reward,
    "monster_base": monster_base,
    "map_cfg": map_cfg,
    "menu":{
        "help": ["帮助","help","gotoHelp"],
        "rank": ["排行榜","pic_ranking","gotoRank"],
        "award": ["奖励","menu_sale_icon","gotoAward"]
    }
}
//数据更新
const getData = function () {
    update_data.player = getDB("player");
    update_data.info = getDB("endless_boss");
    update_data.rank_index = rank_index;
    update_data.award_type = award_type;
    update_data.fight_ing = fight_ing;
    update_data.fight_award = fight_award;
    update_data.own_rank = own_rank;
    update_data.curr_damage_info = curr_damage_info;

    update_data.mySort = logic.mySort;
    update_data.sortEvent = logic.sortEvent;
    update_data.getCount = logic.getCount;
    update_data.news = logic.news;
    update_data.getMyRank = logic.getMyRank;
    update_data.checkTypeof = checkTypeof;
    update_data.Util = Util;
    update_data.damageAdd = logic.damageAdd;
    update_data.Common = Common;
    return update_data ;
}

//活动是否开放
export const isOpen = function(){
    let arr = Util.arrDate(Util.serverTime());
    let min = arr[3] * 60 + arr[4];
    if(endless_boss_base.open_day.indexOf(arr[6]+"") !== -1 && (min>=endless_boss_base.open_time[0] && min < endless_boss_base.open_time[1])){
        return true;
    }
    return false;           
}

open_day = Common_m.changeNumToWeek(endless_boss_base.open_day);
open_time = Common_m.changeMinToTime(endless_boss_base.open_time);

let logic = {
    //计算活动结束剩余时间
    // getEndTime(){
    //     let now = Util.serverTime();
    //     let arr = Util.arrDate(now);
    //     return [now, now + (endless_boss_base.open_time[1] - arr[3] * 60 + arr[4])*60*1000 - arr[5]*1000];
    // },
    //计算[可挑战次数,下一次增加次数时间]
    getCount(){
        let now = Util.serverTime(true);
        let r = Math.floor((now - update_data.info.time) / endless_boss_base.cd);
        let next = now + Math.ceil(endless_boss_base.cd - (now - update_data.info.time)%endless_boss_base.cd);
        return [r,[now*1000,next*1000]] ;
    },
     //成就排序
     mySort(){
        let arr = endless_boss_reward[award_type].slice(0);
        let data = getDB("endless_boss");
        let has = award_type == "point" ? (data.damage_info && data.damage_info[1] || 0) : data.kill_boss_num;
        arr.forEach((v,i)=>{
            if(data.award_record[v.id-1]){//已领
                v.get = 3;
            }else if(has >= v.condition){//未领
                v.get = 1;
            }else{//未达成
                v.get = 2;
                v.progress = has;
            }
        })
        return arr.sort((a,b)=>{
            if(a.get !== b.get){
                return a.get - b.get;
            }else{
                return a.id - b.id;
            }
        })
    },
    damageAdd(){
        let num = getDB("endless_boss.role_count") || 0;
       if(!num){
           return false;
       }
       if(endless_boss_add[num] !== undefined){
           return endless_boss_add[num];
       }else{
           let r = Object.keys(endless_boss_add).pop();
           return endless_boss_add[r];
       }
   },
    //挑战boss
    challenge: function (count) {
        let boss_info = getDB("endless_boss.boss_info");
        // 判断当前boss是否可挑战
        if (boss_info[2] <= 0) {
            globalSend("screenTipFun", {
                words: `当前BOSS已死亡，即将刷新，请等待！`
            });
            return;
        }
        //判断是否还有挑战次数
        if (count<1) {
            globalSend("screenTipFun", {
                words: `挑战次数已用完`
            });
            return;
        }
        fight_ing = true;
        my_damage = 0;
        fight_award = [];
        curr_damage_info = getDB("endless_boss.damage_info") || [0,0];
        //打开场景
        open("app_c-endless_boss-fight_boss-fight_boss");

        setTimeout(()=>{
            let w = forelet.getWidget("app_c-endless_boss-endless_boss");
            w && close(w);
        },0)
        
        //退出野外(回调请求数据, 开始战斗)
        globalSend("exitWild", logic.startFight);
    },
    /**
     * 开始战斗
     * @param %通讯参数 无
    */
    startFight(){
        let arg = {
            "param": {},
            "type": "app/pve/endless_boss@fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                updata("endless_boss.is_fighting", 1);
                let prop: any = Common.changeArrToJson(data.ok);
                updata("endless_boss.time", prop.time);
                let events: any = analyseFighter(prop);
                let sce = map_cfg["endless_boss"];
                nub_node();
                SMgr.start("endless_boss", events, [null, logic.dealFightEvents], FMgr.createNavMesh(mgr.getSceneBuffer(sce, ".nav")));
            }
        })
    },
     //处理接收到的战斗事件
     dealFightEvents: function (events) {
        if (events.event.length > 0) {
            let i = 0,
                len = events.event.length;
            for (; i < len; i++) {
                let e = events.event[i];
                if (e.type === "damage" || e.type === "effect") {
                    logic.damageFun(e);
                }
            }
        }
    },
     //处理战斗伤害事件
     damageFun: function (e) {
        let role_id = getDB("player.role_id");
        let target;
        let r = e.r;
        if (typeof e.target == 'number') {
            target = handScene.mapList[e.target]
        } else {
            target = e.target;
        }
        //自己死亡
        if (target.sid === role_id && target.hp <= 0) {
            //直接调取结算界面
            logic.exitFight();
        }
        //如果目标是boss
        if ((target.show_type == 1) && (target.type == "monster")) {
            my_damage += (r.damage || 0);
            boss_hp = target.hp || boss_hp;
            // console.log("boss血量=>boss_hp---------------------------", boss_hp);
            if (target.hp <= 0) {
                console.log("boss死亡-------------")
                boss_hp = 0;
                // console.log("boss血量=>-----------------------", target);
                let t = setTimeout(() => {
                    clearTimeout(t);
                    t = null;
                    logic.exitFight();
                }, 1000)
            }
        }
    },
    /**
     * 结束战斗
     * @param %通讯参数 无
     * 
    */
    exitFight(){
        if(!fight_ing){
            return;
        }
        fight_ing = false; //战斗结束
        let arg = {
            "param": {},
            "type": "app/pve/endless_boss@exit"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                updata("endless_boss.is_fighting", 0);
                SMgr.leave();
                removeNode();
                create_node_flag = 1;
                logic.readBossHp();
                forelet.paint(getData());
                //打开结算页面
                open("app_c-endless_boss-fight_award-fight_award");
            }
        })
    },
    /**
     * 购买次数
     * @param %通讯参数 
     * count": 购买次数 1
     * 
    */
   buyCount(count){
        let arg = {
            "param": {
                count: count
            },
            "type": "app/pve/endless_boss@buy_count"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                //扣除花费
                Common_m.deductfrom(prop);
                updata("endless_boss.buy_count",prop.buy_count);
                updata("endless_boss.time",prop.time);
                forelet.paint(getData());
            }
        })
    },
    /**
     * 成就领奖
     * @param %通讯参数 id
     * 
    */
   award(id){
        let arg = {
            "param": {
                id:id
            },
            "type": "app/pve/endless_boss@award"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let prop:any = Common.changeArrToJson(data.ok);
                updata("endless_boss.award_record", prop.award_record);
                let result = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result1) {
                        result1.open();
                    }
                });
                forelet.paint(getData());
            }
        })
    },
    /**
     * 读取BOSS血量
     * 
     * 
    */
   readBossHp(){
        let arg = {
            "param": {},
            "type": "app/pve/endless_boss@read_boss_info"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let prop:any = Common.changeArrToJson(data.ok);
                updata("endless_boss.boss_info", prop.boss_info);
                updata("endless_boss.damage_info", prop.damage_info);
                curr_damage_info = [prop.damage_info[0] - curr_damage_info[0],prop.damage_info[1] - curr_damage_info[1]]
                forelet.paint(getData());
            }
        })
    },
    //计算自己排名
    getMyRank(){
        let data = getDB("endless_boss");
        if(!data.damage_info || !data.damage_info_rank_detail){
            return [0,0];
        }else{
            let id = update_data.player.role_id;
            let arr = data.damage_info_rank_detail[1];
            for(let i = 0,len = arr.length;i<len;i++){
                if(arr[i][0][1] == id){
                    return [i-0+1,arr[i][12][1][1]];
                }
            }
            return [0,data.damage_info[1]]
        }
    },
     //关闭结算页面
     closeFightAward: function () {
        let w = forelet.getWidget("app_c-endless_boss-fight_boss-fight_boss");
        w && close(w);

        let w1 = forelet.getWidget("app_c-endless_boss-endless_boss");
        forelet.paint(getData());
        !w1 && open("app_c-endless_boss-endless_boss");

        let _w = forelet.getWidget("app_c-endless_boss-fight_award-fight_award");
        _w && close(_w);
        globalSend("intoWild");
        // setTimeout( logic.resetCanvas,50);
        
    } ,
    //重绘模型
    resetCanvas: function () {
        let w = forelet.getWidget("app_c-endless_boss-endless_boss");
        if(!w){
            return;
        }
        let data: any;
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app-scene-base-scene") {
                data = w.children[i];
                break;
            }
        }
        resetcanvas(data);
    },
    //处理战报获得的物品
    news(data){
        let str = "";
        for(var key in data){
            if(key === "diamond"){
                str += `元宝x${data[key]}`
            }else if(key === "money"){
                str += `银两x${data[key]}`
            }else{
                
            }
        }
        return str;
    },
    //处理场景渲染的排行榜信息
    getSceneRank(data){
        let arr = [];
        data.forEach((v,k)=>{
            let _name = checkTypeof(v[2][1],"Array") ? Common.fromCharCode(v[2][1]) : v[2][1];
            arr.push([_name, Common.numberCarry(v[12][1][0],10000) + "",v[0][1]]);
        });
        return arr;
    },
    //计算自己的排名信息
    getOwnRank(){
        let player = getDB("player");
        let detail = getDB("endless_boss.damage_info_rank_detail");
        if(!detail || detail && !detail[0]){
            return ["0",player.name, "0"];
        }

        //自己 的 rank
        for(let i = 0,len = detail[1].length;i<len;i++){
            let curr = detail[1][i];
            if(curr[0][1] == player.role_id){
                return [i-0+1+"", player.name, Common.numberCarry(curr[12][1][0],10000) + ""];
            }
        }
        return  ["0",player.name, "0"];
    },
    //按BOSS处理战报
    sortEvent(){
        let msg:any = {};
        let event = getDB("endless_boss.event_record");
        if(!event){
            return false;
        }

        event.forEach((v)=>{
            let key = v[4].join("-");
            msg[key] = msg[key] || [];
            msg[key].push(v);
        })
        return msg;
    }
}
// 处理场景上的2D节点
const nub_node = () => {
    let _width = root.getWidth() * mgr_data.scale;
    let _height = root.getHeight() * mgr_data.scale;
    // let player = getDB("player.name");
    //我的输出节点
    node_list["my_damage"] = {} ;
    node_list["my_damage"].x = _width * (20 / 76) + 43.9474;
    node_list["my_damage"].y = _height * (40 / 98 * (0 - 1)) + 87.6735;
    node_list["my_damage"].z = 5;
    node_list["my_damage"].attachment = "2D",
    //背景图
    node_list["my_damage"].image = "images/my_rank.png";
    //宽高
    node_list["my_damage"].imgWidth = 600 * (mgr_data.scale * (2/2.7) + 0.11);
    node_list["my_damage"].imgHeight = 100 * (mgr_data.scale * (2/2.7) + 0.11);
    //创建
    mgr.create(node_list["my_damage"],"node2d");

    //左侧战斗信息节点
	node_list["rank_num"] = {};
	//节点位置
	node_list["rank_num"].x = _width * (91.8757 / 189.76217) - 1.3408;
	node_list["rank_num"].y = _height * (83.4694 / 180) + 26.3267;
    node_list["rank_num"].z = 5;
    node_list["rank_num"].attachment = "2D",
	//背景图
	node_list["rank_num"].image = "images/"+rank_type+"_rank_bg.png";
	//宽高
	node_list["rank_num"].imgWidth = (rank_type == "big" ? 310 : 310 ) * (mgr_data.scale * (2/2.7) + 0.11);
	node_list["rank_num"].imgHeight = (rank_type == "big" ? 650 : 163) * (mgr_data.scale * (2/2.7) + 0.11);
	//创建
    mgr.create(node_list["rank_num"],"node2d"); 
    
}

// 创建战斗场景中的排行榜节点
const create_rank_node = (arg,text,name,num,textcfg?) => {
    let _width = root.getWidth() * mgr_data.scale;
    let _height = root.getHeight() * mgr_data.scale;
    let _top = _height * (44.9184 / 180) + 20.7039;
    let __top = _height * (52.9184 / 180) + 5.7039;
    let _interval = _height * (3 / 180) + 13;
    let _index = arg-0+1;

    node_list[_index] = {};
    node_list[_index].type = "team_damage";
    node_list[_index].text = String(text || 0);
    node_list[_index].x = _width * (49.9376 / 189.7627) - 86.0528;
    node_list[_index].y = rank_type == "big" ? _top - arg * _interval : __top;
    node_list[_index].z = 6;
    node_list[_index].visible = true;
    node_list[_index].horizontalAlign = "center";
    node_list[_index].verticalAlign = "center";
    node_list[_index].textcfg = textcfg ? "publicbossGreenrank" : "publicbossrank";
    mgr.create(node_list[_index],"text");

    let __index = arg-0+11;
    node_list[__index] = {};
    node_list[__index].type = "team_damage";
    node_list[__index].text = String(name || 0);
    node_list[__index].x = _width * (54.9376 / 189.7627) - 40.2811;
    node_list[__index].y = rank_type == "big" ? _top - arg * _interval : __top;
    node_list[__index].z = 6;
    node_list[__index].visible = true;
    node_list[__index].horizontalAlign = "center";
    node_list[__index].verticalAlign = "center";
    node_list[__index].textcfg = textcfg ? "publicbossGreenrank" : "publicbossrank";
    mgr.create(node_list[__index],"text");
    
    let ___index = arg-0+111;
    node_list[___index] = {};
    node_list[___index].type = "team_damage";
    node_list[___index].text = String(num || 0);
    node_list[___index].x = _width * (54.9376 / 189.7627) + 19.7189;
    node_list[___index].y = rank_type == "big" ? _top - arg * _interval : __top;
    node_list[___index].z = 6;
    node_list[___index].visible = true;
    node_list[___index].horizontalAlign = "center";
    node_list[___index].verticalAlign = "center";
    node_list[___index].textcfg = textcfg ? "publicbossGreenrank" : "publicbossrank";
    mgr.create(node_list[___index],"text");
}

const removeNode = () =>{
    for(let i in node_list){
        if(i == "rank_num"){
            node_list["rank_num"].image == "images/big_rank_bg.png";
            mgr.modify(node_list["rank_num"])
        }
        mgr.remove(node_list[i]);
        node_list[i] = undefined;
    }
}

// endless_boss_rank_info
// endless_boss_damage
// endless_boss_award
// endless_boss_role_count_refresh
// endless_boss_refresh
// endless_boss_dead

//boss死亡推送
net_message("endless_boss_dead",(data)=>{
    data.boss_info[6] = checkTypeof(data.boss_info[6],"Array") ? Common.fromCharCode(data.boss_info[6]) : data.boss_info[6];
    updata("endless_boss.boss_info", data.boss_info);
    updata("endless_boss.kill_boss_num", (getDB("endless_boss.kill_boss_num") || 0) - 0 + 1);
})

//boss刷新推送
net_message("endless_boss_refresh",(data)=>{
    updata("endless_boss.boss_info", data.boss_info);
    forelet.paint(getData());
    let monster = monster_base[data.boss_info[0]]
    globalSend("screenTipFun", {
        words: `${monster.des}&nbsp;Lv.${data.boss_info[1]}已复活！`
    });
})

//刷新房间人数推送
net_message("endless_boss_role_count_refresh",(data)=>{
    updata("endless_boss.role_count", data.count);
    forelet.paint(getData());
})

//boss事件推送（幸运，终结，）
net_message("endless_boss_award",(data)=>{
    if(data.event){
        //处理玩家名字
        data.event[1] = checkTypeof(data.event[1],"Array") ? Common.fromCharCode(data.event[1]) : data.event[1];
        //处理奖励
        data.event[2] = checkTypeof(data.event[2],"Array") ? Common.changeArrToJson(data.event[2]) : data.event[2];
        let event_record = getDB("endless_boss.event_record") || [];
        event_record.unshift(data.event);
        if(event_record.length > endless_boss_base.event_count){
            event_record.pop();
        }
        updata("endless_boss.event_record",event_record);
    }
    let id = getDB("player.role_id");
    if(id == data.id){
        fight_award.push([data.type,data.award]);
    }
})

let old_damage = 0;
//所有人对boss造成总伤害
net_message("endless_boss_damage",(data)=>{
    if(old_damage >= data.damage){
        return;
    }
    old_damage = data.damage;
    for(let k in handScene.mapList){
        let f = handScene.mapList[k];
        if(f.type === "monster"){
            f.show_hp = f.max_hpCount - (data.damage - old_damage);
            return;
        }
    }

})


//排行榜
net_message("endless_boss_rank_info",(data)=>{
    let isChange = JSON.stringify(data.rank_info) !== JSON.stringify(getDB("endless_boss.damage_info_rank_detail"));
    if(isChange){
        updata("endless_boss.damage_info_rank_detail", data.rank_info);
    }
    
    //计算自己的排名信息
    if(!own_rank.length){
        own_rank = logic.getOwnRank();
    }



    if (!fight_ing && mgr_data.name !== "endless_boss") {
        return;
    }
    let player = getDB("player");
    //推送的rank
    let fight_rank = logic.getSceneRank(data.rank_info[1]);

    //自己 的 rank
    for(let i = 0,len = fight_rank.length;i<len;i++){
        if(fight_rank[i][2] == player.role_id){
            own_rank = [i-0+1+"", player.name, fight_rank[i][1]];
            break;
        }
        if(i === len - 1){
            let damage = getDB("endless_boss.damage_info.0") || 0;
            own_rank = ["0", player.name, Common.numberCarry(damage + my_damage,10000) + ""];
        }
    }

    for(let i=0;i<fight_rank.length;i++){
        if(rank_type != "small" && (!fight_rank[i] || create_node_flag || !node_list[i - 0 + 1] || node_list[i - 0 + 1].visible == false)){
            create_rank_node(i,fight_rank[i][1],fight_rank[i][0],i+1);
            create_node_flag = 0;
        }else{
            let _index = i - 0 + 1;
            let __index =  i - 0 + 11;
            let ___index = i - 0 + 111;
            if(rank_type == "small"){
                node_list[_index].visible = false;
                node_list[__index].visible = false;
                node_list[___index].visible = false;
                mgr.remove(node_list[_index]);
                mgr.remove(node_list[__index]);
                mgr.remove(node_list[___index]);
                continue;
            }else{
                node_list[_index].visible = true;
                node_list[_index].text = fight_rank[i][1];
                
                node_list[__index].visible = true;
                node_list[__index].text = fight_rank[i][0];
                
                node_list[___index].visible = true;
                node_list[___index].text = String(i + 1);
            }
            mgr.modify(node_list[_index]);
            mgr.modify(node_list[__index]);
            mgr.modify(node_list[___index]);
        }
    }

    let _height = root.getHeight() * mgr_data.scale;
    let _top = _height * (23.9898 / 180) - 9.6531;
    let __top = _height * (52.9184 / 180) + 5.7039;
    if(!node_list[6]){
        create_rank_node(5, own_rank[2], own_rank[1],own_rank[0],(rank_type == "small" ? 1 : 0))
    }else{
        node_list[6].y = rank_type == "small" ? __top : _top;
        node_list[6].text = own_rank[2];        
        mgr.modify(node_list[6]);
        
        node_list[16].y = rank_type == "small" ? __top : _top;
        node_list[16].text = own_rank[1];
        mgr.modify(node_list[16]);
        
        node_list[116].y = rank_type == "small" ? __top : _top;
        node_list[116].text = own_rank[0];
        mgr.modify(node_list[116]);
    }
})





//读取基础数据
listenBack("app/pve/endless_boss@read",(data)=>{
    updata("endless_boss",data);
})

/**
 * @description 设置活动结束关闭页面
 */
forelet.listener = () => {
    if(!isOpen()){
        if(fight_ing){
            fight_ing = false;
            logic.exitFight();
        }
        closeBack();
        globalSend("screenTipFun", {
            words: "活动已结束"
        }); 
    }
}