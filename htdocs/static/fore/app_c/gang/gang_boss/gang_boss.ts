/**
 * 此功能为门派boss, 可理解为单独的门派
 * 有自己的 widget, forelet
 */
import { analyseFighter } from "fight/a/fore/node_fight";
import { updata, get as getDB, checkTypeof, listen } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { net_message, net_request } from "app_a/connect/main";
import { map_cfg } from "app/scene/plan_cfg/map";
import { FMgr } from "fight/a/fight";

import { mgr_data, mgr } from "app/scene/scene";
import {  resetcanvas } from "app/scene/base/scene";
import { handScene, olFightOrder } from "app_b/fight_ol/handscene";
import { monster_base } from "fight/b/common/monsterBase";
import { monster_attribute } from "fight/b/common/monster_attribute";

import { guild_boss } from "cfg/c/guild_boss";
import { guild_boss_add } from "cfg/c/guild_boss_add";
import { attribute_config } from "cfg/c/attribute_config";
import { guild_base } from "cfg/c/guild_base";
import { guild_rank } from "cfg/c/guild_rank";
import { readBoss, gangTipFun } from "../gang";
import { SMgr } from "app_b/fight_ol/same";


export let forelet = new Forelet();

export let globalReceive = {
    "openGangBoss": () => {
        index = logic.searchIndex();
        readGnagRank(() => {
            boss_max_hp = logic.searchMaxHp(index);
            forelet.paint(getData());
            open("app_c-gang-gang_boss-gang_boss");
        });
    },
    //神兵释放
    "releaseMagic": (msg) => {
        if (mgr_data.name == "gang_boss") {
            olFightOrder({ skill_id: msg.skill_id }, msg.callback);
        }
    },
};

let index = 0; //boss切换
let gangRank = []; //门派排行

let gang_rank: any = {}; //门派击杀boss排行

let boss_hp;
let boss_max_hp; //boss最大血量
let my_damage = 0;
let fight_ing = false; //战斗是否结束
let mixAndMaxGet = [0, 0]; //最小和最大可领奖关卡

const getData = function () {
    let data: any = {};
    data.guild_base = guild_base;
    data.guild_boss = guild_boss;
    data.map_cfg = map_cfg;
    data.monster_base = monster_base;
    data.attribute_config = attribute_config;
    data.guild_boss_add = guild_boss_add;
    data.Pi = Pi;
    data.Common = Common;
    data.checkTypeof = checkTypeof;
    data.guild_rank = guild_rank;
    data.damageAdd = logic.damageAdd;
    data.roleNum = getDB("gang.gangBoss.gang_person_num") || 0;

    data.index = index;
    data.currIndex = logic.searchIndex();
    data.gangRank = gangRank;
    data.boss_max_hp = boss_max_hp;
    data.gangBoss = getDB("gang.gangBoss");
    data.entry_time = getDB("gang.gangExpandData.entry_time");
    data.career_id = getDB("player.career_id");
    data.gang_rank = gang_rank;
    data.my_damage = my_damage;
    data.fight_ing = fight_ing;
    data.mixAndMaxGet = mixAndMaxGet;
    return data;
}

/**
 * 前台操作
 */
export class GangBoss extends Widget {
    //查看物品详情
    propInfoShow(id) {
        globalSend("showOtherInfo", id);
    }
    //关闭
    goback(arg) {
        close(arg.widget);
    }
    //倒计时回调
    timeEnd() {
        exitFight();
    }
    //切换boss
    bossTab(num) {
        index += (num - 0);
        if (index <= 0) {
            index = 0;
        } else if (index >= guild_boss.length) {
            index = guild_boss.length - 1;
        }
        boss_max_hp = logic.searchMaxHp(index);
        forelet.paint(getData());
    }
    //查看排行
    lookRank() {
        readGnagRank(() => {
            forelet.paint(getData());
            open("app_c-gang-gang_boss-gang_rank-gang_rank")
        })
    }
    //挑战boss
    fightBoss() {
        logic.challenge();
    }
    //退出战斗
    exit() {
        //弹出询问框
        globalSend("popTip",{
            title:"<div>是否确定退出?</div>",
            btn_name:["退出","取消"],
            cb:[
                //确认
                ()=>{
                    exitFight();
                },
                //取消
                () => {}
            ]
        })
    }
    //打开宝箱界面
    gotoBox() {
        open("app_c-gang-gang_boss-award_box-award_box");
    }
    //开启宝箱
    openBox(i) {
        //是否已领取
        if (getDB(`gang.gangBoss.role_boss_award.${index}`)) {
            globalSend("screenTipFun", {
                words: `该boss奖励已领取`
            });
            return;
        }
        globalSend("popTip", {
            title: `<div>是否要打开${i - 0 + 1}号宝箱?</div>`,
            btn_name: ["是", "否"],
            cb: [
                //确认
                () => {
                    getBoxAward(index + 1, i - 0 + 1);
                },
                //取消
                () => { }
            ]
        })
    }
    //宝箱预览
    lookAward() {
        open("app_c-gang-gang_boss-award_preview-award_preview");
    }
    //关闭结算页面
    closeFightAward() {
        logic.closeFightAward();
    }
    //查看组队伤害加成
    seeDamage = ()=>{
        globalSend("peopleNumTips",guild_boss_add);
    }
}

/**
 * 数据处理
 */
const logic = {
     damageAdd(){
         let num = getDB("gang.gangBoss.gang_person_num") || 0;
        if(!num){
            return false;
        }
        if(guild_boss_add[num] !== undefined){
            return guild_boss_add[num];
        }else{
            let r = Object.keys(guild_boss_add).pop();
            return guild_boss_add[r];
        }
    },
    //查找可领奖的最小关卡和最大关卡
    findMinAndMaxAward: function () {
        let tip = getDB("gang.tip");
        let arr = [];
        for (let i in tip) {
            if (tip.hasOwnProperty(i) && tip[i] == 1) {
                arr.push(i);
            }
        }
        return [Math.min.apply(null, arr), Math.max.apply(null, arr)]
    },
    //重绘模型
    resetCanvas: function () {
        let w = forelet.getWidget("app_c-gang-gang_boss-gang_boss");
        let data: any;
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app-scene-base-scene") {
                data = w.children[i];
                break;
            }
        }
        resetcanvas(data);
    },
    //查找当前应挑战的boss
    searchIndex: function () {
        let boss_info = getDB("gang.gangBoss.boss_info");
        for (let i = 0, len = boss_info.length; i < len; i++) {
            if (boss_info[i][2] > 0) {
                return i;
            }
        }
        return 0;
    },
    //查找boss最大血量
    searchMaxHp: function (index) {
        let boss = guild_boss[index];
        let level = boss.monster_level;
        let attr_id = monster_base[boss.monster_id].attr_id;
        let info = monster_attribute[`${attr_id}-${level}`];
        return info.attr.max_hp;
    },
    //挑战boss
    challenge: function () {
        let boss_info = getDB("gang.gangBoss.boss_info");
        //判断当前boss是否可挑战
        if (index > 0 && boss_info[index - 1][2] > 0) {
            globalSend("screenTipFun", {
                words: `请先击杀前一关BOSS`
            });
            return;
        }
        //判断是否还有挑战次数
        if (getDB("gang.gangBoss.fight_count") >= guild_base.init_count) {
            globalSend("screenTipFun", {
                words: `挑战次数已用完`
            });
            return;
        }
        my_damage = 0;
        fight_ing = true;
        //打开场景
        forelet.paint(getData());
        open("app_c-gang-gang_boss-fight_boss-fight_boss");
        //退出野外(回调请求数据, 开始战斗)
        globalSend("exitWild", enterFight);
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
            // target = handScene.mapList[e.target],
            // _fighter = handScene.mapList[e.fighter],
 
            // d;
        //自己死亡
        if (target.sid === role_id && target.hp <= 0) {
            //直接调取结算界面
            exitFight();
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
                    exitFight();
                }, 1000)
            }
        }
    },
    //关闭结算页面
    closeFightAward: function () {
        //关闭结算界面
        let _w = forelet.getWidget("app_c-gang-gang_boss-fight_award-fight_award");
        if (_w) {
            close(_w);
        }
        //logic.clearData();
        let w = forelet.getWidget("app_c-gang-gang_boss-fight_boss-fight_boss");
        if (w) {
            close(w);
        }
        globalSend("intoWild");
        logic.resetCanvas();
        forelet.paint(getData());
    }
}

/**
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
export const gangBossNet = function (param) {
    return new Promise((resolve, reject) => {
        net_request(param, (data) => {
            if (data.error) {
                reject(data);
            } else {
                resolve(data);
            }
        })
    })
};

/**
 * 进入门派boss(创建战斗场景) 
 */
const enterFight = async function () {
    let arg = {
        "param": {
            "index": index + 1
        },
        "type": "app/gang/expand@fight_boss"
    };
    let data;
    try {
        data = await gangBossNet(arg);
        if (data.error) {
            return;
        }
    } catch (err) {
        console.log(err);
        globalSend("screenTipFun", {
            words: `${data.why}`
        })
        return;
    }
    updata("gang.other.is_fighting", 1);
    let prop: any = Common.changeArrToJson(data.ok);
    updata("gang.gangBoss.fight_count", prop.fight_count);
    let events: any = analyseFighter(prop);
    let sce = map_cfg["gang_boss"];
    SMgr.start("gang_boss", events, [null, logic.dealFightEvents], FMgr.createNavMesh(mgr.getSceneBuffer(sce, ".nav")));
};
/**
 * 退出战斗  
 */
const exitFight = async function () {
    let arg = {
        "param": {},
        "type": "app/gang/expand@exit_boss"
    };
    let data
    try {
        data = await gangBossNet(arg);
    } catch (error) {
        console.log(error);
        return;
    }
    updata("gang.other.is_fighting", 0);
    updata(`gang.gangBoss.boss_info.${index}.2`, boss_hp);
    SMgr.leave();
    let prop = Common.changeArrToJson(data.ok);
    let result = Common_m.mixAward(prop);
    fight_ing = false; //战斗结束
    forelet.paint(getData());
    //打开结算页面
    open("app_c-gang-gang_boss-fight_award-fight_award");
};
/**
 * 查看门派排行
 */
const readGnagRank = async function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang/expand@read_rank"
    };
    let data;
    try {
        data = await gangBossNet(arg);
    } catch (error) {
        console.log(error)
    }
    gang_rank = {};
    gang_rank = Common.changeArrToJson(data.ok);
    let rank = gang_rank.rank_info[1];
    for (let i = 0, len = rank.length; i < len; i++) {
        rank[i] = Common.changeArrToJson(rank[i]);
        rank[i].gang_name = checkTypeof(rank[i].gang_name, "Array") ? Common.fromCharCode(rank[i].gang_name) : rank[i].gang_name;
    }
    console.log(gang_rank);
    callback && callback();
};
/**
 * 打开宝箱
 */
const getBoxAward = async function (boss_index, box_index) {
    let arg = {
        "param": {
            "boss_index": boss_index,
            "box_index": box_index
        },
        "type": "app/gang/expand@boss_award"
    };
    let data;
    try {
        data = await gangBossNet(arg);
    } catch (error) {
        console.log(error);
        return;
    }
    let prop = Common.changeArrToJson(data.ok);
    //记录已领取
    //updata(`gang.gangBoss.boss_award_info.${boss_index - 1}.${box_index - 1}.1`, 1); //推送中处理
    updata(`gang.gangBoss.role_boss_award.${boss_index - 1}`, 1);

    //保存奖励
    let result = Common_m.mixAward(prop);
    forelet.paint(getData());
    result.auto = 1;
    globalSend("showNewRes", {
        result, function(result1) {
            result1.open();
        }
    });

    updata(`gang.tip.${boss_index - 1}`, 0);
}

//boss死
net_message("gang_boss_dead", (msg) => {
    console.log(msg);
    //重新读取
    readBoss(() => {
        gangTipFun();
        forelet.paint(getData());
    });
    readGnagRank(() => {
        forelet.paint(getData());
    })
});

//boss每周刷新 [重新读取boss相关数据]
net_message("gang_boss_refresh", (msg) => {
    index = 0;
    let count = 0;
    let fun = function () {
        count++;
        if (count >= 2) {
            fun = null;
            count = null;
            forelet.paint(getData());
        }
    }
    readGnagRank(() => {
        boss_max_hp = logic.searchMaxHp(index);
        fun();
    });
    readBoss(() => {
        gangTipFun();
        fun();
    });
});

//其他成员打开宝箱
net_message("gang_boss_award", (msg) => {
    //boss_index  1, 2, 3 ....
    //box_index  1, 2, 3 ....
    updata(`gang.gangBoss.boss_award_info.${msg.boss_index - 1}.${msg.box_index - 1}.1`, msg.role_name);
    forelet.paint(getData());
});

// gang_person_num_refresh //门派boss成员人数更新
//其他成员打开宝箱
net_message("gang_person_num_refresh", (msg) => {
    updata("gang.gangBoss.gang_person_num", msg.role_length);
    forelet.paint(getData());
});
//监听红点
listen("gang.tip", () => {
    mixAndMaxGet = logic.findMinAndMaxAward();
    forelet.paint(getData());
})