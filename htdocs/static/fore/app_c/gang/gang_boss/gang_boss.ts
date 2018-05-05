/**
 * 此功能为门派boss, 可理解为单独的门派
 * 有自己的 widget, forelet
 */
import { analyseFighter, analyseData } from "fight/a/fore/node_fight";
import { updata, get as getDB, checkTypeof } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { net_message, net_request } from "app_a/connect/main";
import { map_cfg } from "app/scene/plan_cfg/map";

import { mgr_data, mgr } from "app/scene/scene";
import { initAnimFinishCB, setClickCallback, resetcanvas } from "app/scene/base/scene";
import { handScene, mapList, initMapList, change_status, olFightOrder } from "app_b/fight_ol/handscene";
import { UiFunTable, initValue, getEffectId } from "app/scene/ui_fun";
import { Fight_common } from "fight/a/fore/fight_common";
import { monster_base } from "fight/b/common/monsterBase";
import { monster_attribute } from "fight/b/common/monster_attribute";

import { guild_boss } from "cfg/c/guild_boss";
import { guild_base } from "cfg/c/guild_base";
import { guild_rank } from "cfg/c/guild_rank";
import { readBoss } from "../gang";

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
let fight_r: any = {
    "fightEvent": [],
    "now": 0
};
let gang_rank:any = {}; //门派击杀boss排行
let fm; //切换场景位置
let Boss;
let boss_max_hp; //boss最大血量
let my_damage = 0;
let fight_ing = false; //战斗是否结束


const getData = function () {
    let data: any = {};
    data.guild_base = guild_base;
    data.guild_boss = guild_boss;
    data.map_cfg = map_cfg;
    data.monster_base = monster_base;
    data.Pi = Pi;
    data.Common = Common;
    data.checkTypeof = checkTypeof;
    data.guild_rank = guild_rank;

    data.index = index;
    data.gangRank = gangRank;
    data.boss_max_hp = boss_max_hp;
    data.gangBoss = getDB("gang.gangBoss");
    data.career_id = getDB("player.career_id");
    data.gang_rank = gang_rank;
    data.my_damage = my_damage;
    data.fight_ing = fight_ing;
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
        exitFight(0);
    }
    //切换boss
    bossTab(num) {
        index += (num - 0);
        if (index <= 0) {
            index = 0;
        } else if (index >= (guild_boss.length - 1)) {
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
        exitFight(1);
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
}

/**
 * 数据处理
 */
const logic = {
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
    //进入游戏初始化场景
    initScene: function () {
        //此处判断是否需要切换场景位置
        initAnimFinishCB((id) => {
            if (fm && id === fm.id) {
                mgr.remove(fm);
                fm = undefined
                return;
            }
        });
        // //设置点击监听
        // setClickCallback(function (result) {
        //     logic.clickScene(result);
        // });
    },
    //清除场景数据
    clearData: function () {
        initMapList();
        UiFunTable.clearTO();
        initValue();
    },
    //处理接收到的战斗事件
    dealFightEvents: function () {
        if (fight_r.fightEvents.length > 0) {
            let i = 0,
                len = fight_r.fightEvents.length;
            for (; i < len; i++) {
                let e = fight_r.fightEvents[i];
                handScene[e.type](e, fight_r.now);
                if (e.type === "damage" || e.type === "effect") {
                    logic.damageFun(e);
                }
            }
            if (!Boss) {
                for (let v in mapList) {
                    if (mapList[v].type === "monster") {
                        Boss = mapList[v];
                        break;
                    }
                }
            }
        }
        UiFunTable.runCuurUi(fight_r);
        return true;
    },
    //处理战斗伤害事件
    damageFun: function (e) {
        let role_id = getDB("player.role_id"),
            target = mapList[e.target.mapId],
            _fighter = mapList[e.fighter.mapId],
            r = e.r,
            d;
        //console.log(my_damage, "------------>", r.damage);
        my_damage += (r.damage || 0);
        //自己死亡
        if(target.sid === role_id &&　target.hp <= 0){
            //直接调取结算界面
            exitFight(0);
        }
        //console.log(Boss.show_hp, "------", Boss.hp);
        if(target.type == "monster" && target.hp <= 0){
            exitFight(0);
        }
    },
    //关闭结算页面
    closeFightAward: function () {
        //关闭结算界面
        let _w = forelet.getWidget("app_c-gang-gang_boss-fight_award-fight_award");
        if (_w) {
            close(_w);
        }
        logic.clearData();
        let w = forelet.getWidget("app_c-gang-gang_boss-fight_boss-fight_boss");
        if (w) {
            close(w);
        }
        forelet.paint(getData());
        //进入野外战斗
        globalSend("intoWild", () => {
            logic.resetCanvas();
        });
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
    } catch (err) {
        console.log(err);
        return;
    }
    let prop: any = Common.changeArrToJson(data.ok);
    updata("gang.gangBoss.fight_count", prop.fight_count);
    let events: any = analyseFighter(prop);
    //初始化场景
    logic.initScene();
    fight_r.fightEvents = events.event;
    fight_r.now = events.now;
    //处理伤害事件
    logic.dealFightEvents();
    //自动战斗
    change_status(0);
};
/**
 * 退出战斗  
 * 玩家自己主动退出 type = 1
 * 战斗结束退出 type = 0
 */
const exitFight = async function (type) {
    updata(`gang.gangBoss.boss_info.${index}.2`, Boss.hp);
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
    let prop = Common.changeArrToJson(data.ok);
    let result = Common_m.mixAward(prop);
    fight_ing = false; //战斗结束
    if (type) {
        logic.closeFightAward();
    } else {
        forelet.paint(getData());
        //打开结算页面
        open("app_c-gang-gang_boss-fight_award-fight_award");
    }
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
        rank[i].gang_name = checkTypeof(rank[i].gang_name, "array") ? Common.fromCharCode(rank[i].gang_name) : rank[i].gang_name;
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
}

//接收后台推送战斗指令
net_message("order", (msg) => {
    if (mgr_data.name !== "gang_boss") {
        return;
    }
    let events: any = analyseData(msg);
    fight_r.fightEvents = events.event;
    fight_r.now = events.now;
    logic.dealFightEvents();
});

//boss死
net_message("gang_boss_dead", (msg) => {
    console.log(msg);
    //重新读取
    readBoss(() => {
        forelet.paint(getData());
    });
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
        fun();
    });
});

//其他成员打开宝箱
net_message("gang_boss_award", (msg) => {
    //boss_index  1, 2, 3 ....
    //box_index  1, 2, 3 ....
    updata(`gang.gangBoss.boss_award_info.${msg.boss_index - 1}.${msg.box_index - 1}.1`, 1);
    forelet.paint(getData());
});

// gang_person_num_refresh //门派boss成员人数更新