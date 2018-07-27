/**
 * 导入模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Pi, globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { net_request, net_message } from "app_a/connect/main";
import { get as getDB, updata, insert } from "app/mod/db";
import { Util } from "app/mod/util";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { listenBack } from "app/mod/db_back";
import { map_cfg } from "app/scene/plan_cfg/map";
import { fight } from "app_b/fight/fight";
/**
 * 配置数据
 */
import { guild_battle_base } from "cfg/c/guild_battle_base";
import { guild_battle_guard } from "cfg/c/guild_battle_guard";
import { guild_battle_guild_rank } from "cfg/c/guild_battle_guild_rank";
import { guild_battle_person_rank } from "cfg/c/guild_battle_person_rank";
import { guild_battle_reward } from "cfg/c/guild_battle_reward";
import { guild_upgrade } from "cfg/c/guild_upgrade";
import { arena_base } from "cfg/c/arena_base";
import { area } from "cfg/a/area";

insert("gang_battle", {});

/**
 * 创建数据管理forelet
 */
export let forelet = new Forelet();

/**
 * 读取基础数据
 */
listenBack("app/gang/gang_war@read", (data) => {
    if (data.city_lineup.length > 0) {
        data.city_lineup.forEach(v => {
            let arr = [];
            arr[0] = v[0];
            arr[2] = v[2];
            v[1] = Common.changeArrToJson(v[1]);
            arr[1] = Object.assign({}, v[1]);
            arrange_arr.push(arr);
            arr = null;
        });
    }
    updata("gang_battle.base_data", data);
});

let gate_name = [
    {"name": "天", "flag": "left"},
    {"name": "地", "flag": "right"},
    {"name": "人", "flag": "before"},
    {"name": "中心", "flag": "center"}
];
let day,
    arrange_index = 0, // 城们切换
    rank_index = 0, // 排行榜切换
    target_id, // 集火目标id
    fight_gang_id; // 当前攻打门派id
let post, // 玩家公会职务
    type, //类型 1 --> 可以不报名, 2 --> 权限不足, 3 --> 报名结束
    city_gate_index, // 某个城防
    arrange_arr = []; // 城防副本
let person_rank = [], // 个人战绩排名
    gang_rank = [], // 公会战绩排行
    my_gang_rank, // 我的公会排名
    my_rank; // 我的排名

const getData = function () {
    let data: any = {};
    data.area = area;
    data.gate_name = gate_name;
    data.guild_battle_guard = guild_battle_guard;
    data.guild_battle_base = guild_battle_base;
    data.guild_battle_guild_rank = guild_battle_guild_rank;
    data.guild_battle_person_rank = guild_battle_person_rank;
    data.Util = Util;
    data.Pi = Pi;
    data.Common = Common;
    data.guild_upgrade = guild_upgrade;

    data.day = day;
    // 玩家在门派的职务
    data.post = post;
    // 报名类型
    data.type = type;
    data.arrange_index = arrange_index;
    data.arrange_arr = arrange_arr;
    data.my_gang_level = getDB("gang.data.gang_level");
    data.my_gang_name = getDB("gang.data.gang_name");
    data.base_data = getDB("gang_battle.base_data");
    data.mirror_city_detail = getDB("gang_battle.mirror_city_detail") || [];
    data.role_info = getDB("gang_battle.role_info") || [];
    data.player = getDB("player");

    data.person_rank = person_rank || [];
    data.gang_rank = gang_rank || [];
    data.my_gang_rank = my_gang_rank;
    data.my_rank = my_rank;
    data.battle_reward = logic.rewardSort();
    data.rank_index = rank_index;
    data.target_id = target_id || 0;
    if (fight_gang_id) {
        let match_gang_info = data.base_data.match_gang_info;
        for (let v of match_gang_info) {
            if (fight_gang_id == v[0]) {
                data.fight_gang = v;
                break;
            }
        }
    }
    return data;
}

/**
 * 功能入口
 */
export const globalReceive = {
    "openGangBattle": () => {
        logic.openType()
    }
}

/**
 * 界面操作
 */
export class GangBattle extends Widget {
    // 关闭页面
    goback(arg) {
        close(arg.widget);
    }
    // 报名
    enroll() {
        logic.isCanEnroll()
    }
    // 打开城防部署
    openArrange(i) {
        arrange_index = i;
        let city_lineup = getDB("gang_battle.base_data.city_lineup");
        arrange_arr = [];
        city_lineup.forEach(v => {
            let arr = [];
            arr[0] = v[0];
            arr[2] = v[2];
            arr[1] = Object.assign({}, v[1]);
            arrange_arr.push(arr);
            arr = null;
        });
        forelet.paint(getData());
        open("app_c-gang_battle-arrange-arrange");
    }
    cityTab(i) {
        if (arrange_index == i) {
            return;
        }
        arrange_index = i;
        forelet.paint(getData());
    }
    // 破城奖励
    openReward() {
        forelet.paint(getData());
        open("app_c-gang_battle-reward-reward");
    }
    // 集火目标
    openTarget() {
        target_id = 0;
        let match_gang_info = getDB("gang_battle.base_data.match_gang_info");
        match_gang_info.forEach(v => {
            if (v[4] == 1) {
                target_id = v[0];
            }
        })
        forelet.paint(getData());
        open("app_c-gang_battle-target-target");
    }
    // 打开排行榜
    openRank() {
        // 读取最新排行数据
        readRank();
    }
    // 排行榜切换
    rankTab(i) {
        if (rank_index == i) {
            return;
        }
        rank_index = i;
        forelet.paint(getData());
    }
    // 查看战况
    lookSituation() {
        forelet.paint(getData());
        open("app_c-gang_battle-look_situation-look_situation");
    }
    // 查看详情
    lookMore(id, level) {
        openEgangArrange(id, function (list) {
            forelet.paint(getData());
            open("app_c-gang_battle-look_situation-look_more", { "list": list, "gang_level": level });          
        })
    }
    // 打开敌方具体城防
    openCityGate(index) {
        arrange_index = index;
        forelet.paint(getData())
        open("app_c-gang_battle-city_gate-city_gate");
    }
    // 选择人员
    choose(i) {
        logic.choose(i);
    }
    // 保存城防
    sureArrange() {
        logic.sureArrange();
    }
    // 一键防守
    oneKey() {
        oneKeyArrange();
    }
    // 打开敌对门派城防
    openEgang(id) {
        fight_gang_id = id;
        openEgangArrange(id);
    }
    // 选择集火目标
    chooseTarget(id) {
        target_id = id;
        forelet.paint(getData());
    }
    // 确认集火目标
    sureTarget() {
        sureTarget(target_id)
    }
    // 挑战
    challange(role_id, type, flag) {
        logic.isChallange(role_id, type, flag);
    }
    // 购买次数
    buyCount() {
        logic.canBuyCount();
    }
    // 领取奖励
    getAward(index) {
        getAwardNet(index);
    }
}

/**
 * 逻辑处理
 */
let logic = {
    // 判断类型
    openType: function () {
        post = getDB("gang.data.post");
        let base = guild_battle_base;
        let time = Util.serverTime();
        let date = new Date(time);
        day = date.getDay(); // 星期几
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let total_minutes = hours * 60 + minutes;
        // 如果已经报名了
        if (getDB("gang_battle.base_data.apply_gang_list")) {
            forelet.paint(getData());
            if (post == 1 || post == 2) {
                if ((day == base.application_day) || (day == 2 && total_minutes < base.fight_time[0])) {
                    open("app_c-gang_battle-main-main");
                } else if (base.fight_day.indexOf(day) >= 0 && total_minutes > base.fight_time[0] && total_minutes < base.fight_time[1]) {
                    open("app_c-gang_battle-main_two-main_two")
                } else {
                    globalSend("screenTipFun", {
                        words: "门派备战中...."
                    });
                    return;
                }
            } else {
                type = 3;
                open("app_c-gang_battle-apply_page-apply_page");
            }
            return;
        }
        // 还没有报名
        // 可以报名
        if ((day == base.application_day) && (total_minutes > base.application_time[0]) && (total_minutes < base.application_time[1])) {
            if (post === 1 || post === 2) {
                type = 1;
            } else {
                type = 2;
            }
        }
        // 报名结束
        else {
            type = 3;
        }
        forelet.paint(getData());
        open("app_c-gang_battle-apply_page-apply_page");
    },
    // 判断是否有报名资格
    isCanEnroll: function () {
        let gang_level = getDB("gang.data.gang_level");
        if (gang_level < guild_battle_base.gang_level) {
            globalSend("screenTipFun", {
                words: `门派等级不足${guild_battle_base.gang_level}级，请加快建设门派等级吧!`
            });
            return;
        }
        let num = getDB("gang.data.gang_member").length;
        if (num < guild_battle_base.gang_member) {
            globalSend("screenTipFun", {
                words: `门派成员不足${guild_battle_base.gang_member}人，请多多招兵买马吧!`
            });
            return;
        }
        // 通讯code [报名]
        enrollNet();
    },
    // 领奖排序
    rewardSort: function () {
        let keys = Object.keys(guild_battle_reward);
        let a = []; // 未领取
        let b = []; // 未达成
        let c = []; // 已领取
        let award_record = getDB("gang_battle.base_data.award_record");
        let break_city = getDB("gang_battle.base_data.break_city_info");
        keys.forEach(k => {
            guild_battle_reward[k].forEach((v, i) => {
                // 已领取
                if (award_record[v.index - 1] == 1) {
                    v.flag = 3;
                    c.push(v);
                }
                // 未领取 
                else if (break_city[k] >= v.param) {
                    v.flag = 1;
                    a.push(v);
                }
                // 未达到
                else {
                    v.flag = 2;
                    b.push(v)
                }
            })
        });
        return [...a, ...b, ...c];
    },
    choose: function (i) {
        // 判断城防是否人员是否超多限制
        if (arrange_arr[i][2]) {
            arrange_arr[i][2] = 0;
        } else {
            let n = 0;
            arrange_arr.forEach(v => {
                if (v[2] == (arrange_index + 1)) {
                    n++;
                }
            });
            let gang_level = getDB("gang.data.gang_level");
            if (n >= guild_battle_guard[gate_name[arrange_index].flag][gang_level].config_person_num) {
                globalSend("screenTipFun", { words: `当前驻守人员已达上限` });
                return;
            }
            arrange_arr[i][2] = arrange_index + 1;
        }
        forelet.paint(getData());
    },
    // 确认城防
    sureArrange: function () {
        let str = ''
        // 格式化参数
        arrange_arr.forEach((v, i) => {
            str += `${v[0]}-${v[2]},`;
        });
        let s = str.slice(0, -1);
        str = null;
        arrangeNet(s)
    },
    // 有无战斗次数
    isChallange: function (role_id, type, flag) {
        if (flag == 1) {
            globalSend("screenTipFun", { words: `该结界点已击破` });
            return;
        }
        // 当最少击破[天, 地, 人]中的一个才能挑战中心
        if (type == 4) {
            let mirror = getDB("gang_battle.mirror_city_detail");
            if (mirror[0][3] || mirror[1][3] || mirror[2][3]) {

            } else {
                globalSend("screenTipFun", { words: `最少击破[天, 地, 人]中的一个才能攻击中心结界` });
                return;
            }
        }
        // 判断有无战斗次数
        let use_count = getDB("gang_battle.base_data.combat_record.0") || 0;
        let buy_count = getDB("gang_battle.base_data.buy_record") || 0;
        if ((guild_battle_base.everyday_fight_num + buy_count - use_count) > 0) {
            startFightNet(role_id, type);
        } else {
            globalSend("screenTipFun", {
                words: `挑战次数已用完`
            });
            return;
        }
    },
    // 判断能否购买次数
    canBuyCount: function () {
        let diamond = getDB("player.diamond");
        let buy_count = getDB("gang_battle.base_data.buy_record") || 0;
        let use_count = getDB("gang_battle.base_data.combat_record.0") || 0;
        //判断次数是否用完
        if (buy_count >= guild_battle_base.buy_num_limit) {
            globalSend("screenTipFun", {
                words: `今日购买次数已用完`
            })
            return;
        }
        let cost = guild_battle_base.buy_cost;
        //元宝是否足够
        if (diamond <  (cost[buy_count] || cost[cost.length - 1])) {
            globalSend("popTip",{
                title:"<div>元宝不足</div><div>是否前往充值</div>",
                btn_name:["充值","取消"],
                cb:[
                    //确认
                    ()=>{
                        globalSend("gotoRecharge"); 
                    },
                    //取消
                    () => {}
                ]
            })
            return;
        }
        let buyData = {
            "title": "购买次数",
            "type": "公会战",
            "coin": "diamond",
            "btn_name": "购 买",
            "price": cost,
            "max_buy": guild_battle_base.buy_num_limit,
            "already_buy": buy_count,
            "has_count": guild_battle_base.everyday_fight_num + buy_count - use_count,
            "buy_count": 1,
            "callBack": (r) => {
                sureBuyCount(r);
            }
        };
        //发送消息购买
        globalSend("gotoBuyCount", buyData);
    }
}

/**
 * 通讯
 */
const gangBattleNet = function (arg) {
    return new Promise((resolve, reject) => {
        net_request(arg, (data) => {
            resolve(data);
        })
    })
};

/**
 * 报名参赛
 */
const enrollNet = async function () {
    let arg = {
        "param": {},
        "type": "app/gang/gang_war@gang_apply"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    updata("gang_battle.base_data.apply_gang_list", 1);
    // 关闭报名页面
    let w = forelet.getWidget("app_c-gang_battle-apply_page-apply_page");
    w && close(w);
    // 打开城防布置页面
    forelet.paint(getData());
    open("app_c-gang_battle-main-main");
}

/**
 * 城防布置
 */
const arrangeNet = async function (s) {
    let arg = {
        "param": { "role_id_type": s },
        "type": "app/gang/gang_war@gang_defense"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    let prop: any = Common.changeArrToJson([_data.ok]);
    prop.city_config_info.forEach(v => {
        v[1] = Common.changeArrToJson(v[1]);
        v[1].name = Common.fromCharCode(v[1].name);
    });
    updata("gang_battle.base_data.city_lineup", prop.city_config_info);
    let w = forelet.getWidget("app_c-gang_battle-arrange-arrange");
    w && close(w);
    globalSend("attrTip", { words: `成功保存当前配置` });
    arrange_arr = [];
};

/**
 * 一键防守
 */
const oneKeyArrange = async function () {
    let arg = {
        "param": {},
        "type": "app/gang/gang_war@gang_default_defense"
    };
    let _data:any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    let prop:any = Common.changeArrToJson(_data.ok);
    updata("gang_battle.base_data.city_lineup", prop.city_config_info);
    forelet.paint(getData());
}

/**
 * 读取镜像信息
 * @param {Number} 公会id
 */
const openEgangArrange = async function (egang_id, callback?) {
    let arg = {
        "param": { "egang_id": egang_id },
        "type": "app/gang/gang_war@read_mirror"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    let prop: any = Common.changeArrToJson(_data.ok);

    if (Object.prototype.toString.apply(callback) == "[object Function]") {
        callback(prop.mirror_city_detail);
    } else {
        prop.role_info.forEach((arr, i) => {
            arr.forEach((v, j) => {
                v = Common.changeArrToJson(v);
                v.name = Common.fromCharCode(v.name);
                prop.role_info[i][j] = v;
            });
        });
        updata("gang_battle.mirror_city_detail", prop.mirror_city_detail);
        updata("gang_battle.role_info", prop.role_info);
        prop = null;
        forelet.paint(getData());
        open("app_c-gang_battle-beaten_gang-beaten_gang");
    }
};

/**
 * 确认集火目标
 */
const sureTarget = async function (id) {
    let arg = {
        "param": { "egang_id": id },
        "type": "app/gang/gang_war@set_focus_gang"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    globalSend("attrTip", { words: `集火目标设置成功` });
    let w = forelet.getWidget("app_c-gang_battle-target-target");
    w && close(w);
};

/**
 * 开始战斗
 * @param {role_id} 目标id
 * @param {type} 目标所在城门
 */
const startFightNet = async function (role_id, type) {
    let arg = {
        "param": {
            "role_id": role_id,
            "type": type
        },
        "type": "app/gang/gang_war@start_fight"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    let w = forelet.getWidget("app_c-gang_battle-city_gate-city_gate");
    w && close(w);
    let fightData: any = Common.changeArrToJson(_data.ok);
    fightData.type = "arena";
    fightData.cfg = arena_base;
    fightData.cfg.scene = map_cfg["arena"];
    fight(fightData, function (r) {
        endFightNet(role_id, type, r);
        return true;
    });
};

/**
 * 战斗结束
 * @param {role_id} 目标id
 * @param {type} 目标所在城门
 * @param {r} 战斗结果
 */
const endFightNet = async function (role_id, type, r) {
    let arg = {
        "param": {
            "role_id": role_id,
            "type": type,
            "result": r.r == 1 ? 1 : 0
        },
        "type": "app/gang/gang_war@end_fight"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.error });
        return;
    }
    let integration = 0;
    let prop: any = Common.changeArrToJson(_data.ok);
    if (r.r == 1) {
        // 个人战斗次数和个人战绩[当天]
        updata("gang_battle.base_data.combat_record", prop.combat_record);
        let total_integration = getDB("gang_battle.base_data.personal_total_integration")[1];
        integration = prop.personal_total_integration[1] - total_integration;
        // 个人总战绩[每周]
        updata("gang_battle.base_data.personal_total_integration", prop.personal_total_integration);
    }

    forelet.paint(getData());
    // 调出结算界面
    let result = {
        "r": r.r,
        "gate": `结界·${gate_name[type - 1].name}`,
        "enemy_name": '',
        "integration": integration,
        "deduct_hp": prop.deduct_hp
    }
    let arr = getDB("gang_battle.role_info")[type - 1];
    for (let obj of arr) {
        if (obj.role_id == role_id) {
            result.enemy_name = obj.name;
            break;
        }
    };
    Common_m.openAccount(result, "gang_battle");
    
};

/**
 * 购买次数
 */
const sureBuyCount = async function (num) {
    let arg = {
        "param": { "buy_num": num },
        "type": "app/gang/gang_war@buy_attack_times"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.error });
        return;
    }
    let prop: any = Common.changeArrToJson(_data.ok);
    Common_m.deductfrom(prop);
    updata("gang_battle.base_data.buy_record", prop.total_buy_times);
    forelet.paint(getData());
    globalSend("attrTip", { words: `购买成功` });
};

/**
 * 读取排行数据
 */
const readRank = async function () {
    let arg = {
        "param": {},
        "type": "app/gang/gang_war@read_rank"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.error });
        return;
    }
    let prop: any = Common.changeArrToJson(_data.ok);
    console.log(prop);
    person_rank = [];
    gang_rank = [];
    my_gang_rank = 0;
    my_rank = 0;
    let gang_id = getDB("gang.data.gang_id");
    prop.gang_rank_detail[1].forEach((v, i) => {
        let obj: any = Common.changeArrToJson(v);
        obj.gang_name = Array.isArray(obj.gang_name) ? Common.fromCharCode(obj.gang_name) : obj.gang_name;
        if (my_gang_rank == 0) {
            if (gang_id == obj.gang_id) {
                my_gang_rank = i + 1;
            }
        }
        gang_rank.push(obj);
        obj = null;
    });
    let my_id = getDB("player.role_id");
    prop.personal_rank_detail[1].forEach((v, i) => {
        let obj: any = Common.changeArrToJson(v);
        obj.name = Array.isArray(obj.name) ? Common.fromCharCode(obj.name) : obj.name;
        if (my_rank == 0) {
            if (my_id == obj.role_id) {
                my_rank = i + 1;
            }
        }
        person_rank.push(obj);
        obj = null;
    });
    console.log(gang_rank)
    console.log(person_rank)
    forelet.paint(getData());
    open("app_c-gang_battle-rank_award-rank_award");
}

/**
 * 领取破城奖励
 */
const getAwardNet = async function (index) {
    let arg = {
        "param": { "award_id": index },
        "type": "app/gang/gang_war@award"
    };
    let _data: any = await gangBattleNet(arg);
    if (_data.error) {
        globalSend("screenTipFun", { words: _data.why });
        return;
    }
    let prop = Common.changeArrToJson(_data.ok);
    // 更新已领奖数据
    updata(`gang_battle.base_data.award_record.${index - 1}`, 1);
    // 保存奖励
    let result = Common_m.mixAward(prop);
    forelet.paint(getData());
    result.auto = 1;
    globalSend("showNewRes", {
        result, function(result) {
            result.open();
        }
    });
}

/**
 * 后台推送[城防默认分配]
 */
net_message("gang_war_lineup", (msg) => {
    arrange_arr = [];
    msg.city_lineup_info.forEach(v => {
        let arr = [];
        arr[0] = v[0];
        arr[2] = v[2];
        v[1] = Common.changeArrToJson(v[1]);
        v[1].name = Common.fromCharCode(v[1].name);
        arr[1] = Object.assign({}, v[1]);
        arrange_arr.push(arr);
        arr = null;
    });
    updata("gang_battle.base_data.city_lineup", msg.city_lineup_info);
});

/**
 * 后台推送[匹配的公会]
 */
net_message("match_gang_info", (msg) => {
    updata("gang_battle.base_data.match_gang_info", msg.match_gang_info);
    let w = forelet.getWidget("app_c-gang_battle-main-main");
    w && close(w);
    forelet.paint(getData());
    open("app_c-gang_battle-main_two-main_two")
});

/**
 * 后台推送[集火目标]
 */
net_message("gang_war_focus", (msg) => {
    msg.new_gang_match_info.forEach(v => {
        if (Array.isArray(v[1][0])) {
            v[1][0] = Common.fromCharCode(v[1][0]);
        }
    });
    updata("gang_battle.base_data.match_gang_info", msg.new_gang_match_info);
    forelet.paint(getData());
});
/**
 * 后台推送[战斗胜利]
 */
net_message("gang_war_fight_win", (msg) => {
    // 公会资金
    if (msg.beat_city_get_money > 0) {
        let gang_money = getDB("gang.gangExpandData.gang_money") || 0;
        updata("gang.gangExpandData.gang_money", msg.beat_city_get_money + gang_money);
    }
    // 公会战绩
    updata("gang_battle.base_data.gangl_total_integration.1", msg.gang_integration);
    // 破城个数
    updata("gang_battle.base_data.break_city_info", Common.changeArrToJson(msg.break_info));

    msg.new_gang_match_info.forEach(v => {
        if (Array.isArray(v[1][0])) {
            v[1][0] = Common.fromCharCode(v[1][0]);
        }
    });
    updata("gang_battle.base_data.gangl_total_integration.1", msg.gang_integration);
    updata("gang_battle.base_data.match_gang_info", msg.new_gang_match_info);
    updata("gang_battle.mirror_city_detail", msg.new_mirror_info);
    forelet.paint(getData());
});

/**
 * 后台推送[战斗失败]
 */
net_message("gang_war_fight_lose", (msg) => {
    msg.new_gang_match_info.forEach(v => {
        if (Array.isArray(v[1][0])) {
            v[1][0] = Common.fromCharCode(v[1][0]);
        }
    });
    updata("gang_battle.base_data.match_gang_info", msg.new_gang_match_info);
    updata("gang_battle.mirror_city_detail", msg.new_mirror_info);
    forelet.paint(getData());
});