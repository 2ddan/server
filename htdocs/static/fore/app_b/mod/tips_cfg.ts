import * as db from "app/mod/db";
import { Util } from "app/mod/util";
import { Common } from "app/mod/common";
import { TipFun } from "app/mod/tip_fun";
import { vip_advantage } from "cfg/c/vip_advantage";
import { function_open } from "cfg/b/function_open";
import { TaskProgress } from "app_b/mod/task_progress";
//每日副本配置
import { daily_fb_base } from "cfg/c/daily_fb_base";
//九幽幻境星宿配置
import { instance_star } from "cfg/c/instance_star";
//天庭秘境
import { tower_welfare } from "cfg/c/tower_welfare";
//活跃度配置
import { liveness_reward } from "cfg/c/liveness_reward";
import { liveness_box } from "cfg/c/liveness_box";
//技能升级配置
import { skill_level } from "cfg/b/skill_upgrade";
import { skill_describe } from "cfg/b/skill_describe";
//神兵八卦空位配置
import { treasure_up } from "cfg/b/treasure_up";
//神兵八卦突破配置
import { treasure_break } from "cfg/b/treasure_break";
//神兵共鸣配置文件
import { TreasureRequirement } from "cfg/b/TreasureRequirement";
import { TreasurePhase } from "cfg/b/TreasurePhase";
//心法配置
import { gest_base } from "cfg/c/gest_base";
import { gest_attribute } from "cfg/c/gest_attribute";
//离线收益配置
import { master_off_line } from "cfg/c/master_off_line";
//排行榜配置
import { rank_base } from "cfg/c/rank_base";
//成长基金
import { investment_list } from "cfg/c/investment_list";
//赋灵
import { weapon_soul_grade } from "cfg/c/weapon_soul_grade";
import { weapon_soul_base } from "cfg/c/weapon_soul_base";
//装备副本----关卡宝箱
import { equip_fb_welfare_box } from "cfg/c/equip_fb_welfare_box";
//摇钱树
import { MoneyTreeBoxAward } from "cfg/c/money_tree_box";
//九窍
import { soul_seat } from "cfg/c/soul_seat";
import { soul_level_up } from "cfg/c/soul_level_up";
import { soul_resonance_need } from "cfg/c/soul_resonance_need";
// ================================= 本地
//.*
//* 提示配置表
//* depend 依赖的数据库监听路径,如果该监听路径下的数据发生变化,则调用fun里面的提示生成条件,如果条件成立则生成提示,否则删除
//* fun [
//*		第一维判断条件为或关系,只要有一个条件成立,就成立
//*		[
//*			第二维判断条件为与关系,所有条件成立,才成立
//*			fun : app.tipFunc中配置的运算方法(如:>,>=,<,<=,...详细见app.tipFunc),如果没有匹配到则在app.tips中匹配相应方法
//*				如果以上两处都没有且fun的类型为function,则原样返回,否则返回function(){return false;};
//*			[fun,param1,param2,param3,....],
//*			[]
//*		],
//*		[]
//* ],
// tipKey: "warcraft", || store.lottery.partner
// tipDetail: {"sid": 60040}
//*.
let list = [
    /**
     * 背包是否已满
     */
    {
        depend: ["bag", "player.vip"],
        fun: [
            [
                ["==", function () {
                    let vip = db.get("player.vip") || 0,
                        bag = db.get("bag") || [],
                        arr = bag.filter((x) => {
                            if (x && x.type === "equip") return x;
                        })
                    if (arr.length >= vip_advantage[vip].equip_count) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "bag.reclaim",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 装备副本----能否挑战
     */
    {
        depend: ["player.vip", "open_fun.id", "equip_fb.use_times", "equip_fb.vip_buy_times"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" },
                    function () {
                        return function_open["equip_fb"].id;
                    }
                ], ["==", function () {
                    let vip = db.get("player.vip") || 0,
                        useNum = db.get("equip_fb.use_times") || 0,
                        buyNum = db.get("equip_fb.vip_buy_times") || 0;
                    let freeNum = vip_advantage[vip].equip_instance_times;
                    if ((freeNum + buyNum) > useNum) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.equipFb",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 装备副本----领取宝箱
     */
    {
        depend: ["equip_fb.box_award"],
        fun: [
            [
                ["==", { dkey: "equip_fb.box_award" }, 1]
            ]
        ],
        tipKey: "explore.equipFb.box_award",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 九幽幻境----能否挑战
     */
    {
        depend: ["player.vip", "open_fun.id", "instance_fb.use_times", "instance_fb.vip_buy_times"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" },
                    function () {
                        return function_open["instance_fb"].id;
                    }
                ], ["==", function () {
                    let vip = db.get("player.vip") || 0,
                        useNum = db.get("instance_fb.use_times") || 0,
                        buyNum = db.get("instance_fb.vip_buy_times") || 0;
                    let freeNum = vip_advantage[vip].equip_instance_times;
                    if ((freeNum + buyNum) > useNum) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.instance",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 九幽幻境----点亮星图
     */
    {
        depend: ["instance_fb.instance_star"],
        fun: [
            [
                ["==", function () {
                    let star = db.get("instance_fb.instance_star");
                    let arr = db.get("instance_fb.tactical_record");
                    if (!arr || !star) {
                        return 0;
                    }
                    //获取当前应当升的星位
                    let starUpPos = function () {
                        let i = 1,
                            len = arr.length;
                        if (arr[0] <= 0) return 1;
                        for (; i < len; i++) {
                            if (arr[i - 1] > arr[i]) return i + 1;
                        }
                        return 1;
                    };
                    let index = starUpPos();
                    //计算消耗星数
                    let cost = instance_star[index][arr[index - 1]].cost_star;
                    if (star >= cost) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.instance.star",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 九幽幻境挑战魔王
     */
    {
        depend: ["instance_fb.instance_point", "instance_fb.instance_boss"],
        fun: [
            [
                ["==", function () {
                    let point = db.get("instance_fb.instance_point");
                    if (point && point < 5) {
                        return 0;
                    }
                    let instance_boss = db.get("instance_fb.instance_boss") || [];
                    let index = Math.floor(point / 5);
                    for (let i = 0; i < index; i++) {
                        if (instance_boss[i] == 0) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.instance.welfare",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 活跃度----宝箱奖励
     */
    {
        depend: ["liveness.liveness_value", "liveness.value_award"],
        fun: [
            [
                ["==", function () {
                    let box_award = db.get("liveness.value_award");
                    if (!box_award) {
                        return 0;
                    }
                    let value = db.get("liveness.liveness_value") || 0;
                    let len = liveness_box.length;
                    for (let i = 0; i < len; i++) {
                        if (box_award[i] > 0) {
                            continue;
                        }
                        if (value >= liveness_box[i].liveness_value) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "daily_act.liveness.box",
        tipDetail: { "sid": 60040 } //暂定        
    },
    /**
     * 天庭秘境----通关领宝箱
     */
    {
        depend: ["tower.floor_point", "tower.buy_record"],
        fun: [
            [
                [">=", { dkey: "tower.floor_point" }, function () {
                    let record = db.get("tower.buy_record");
                    if (!record) {
                        return 10000;
                    }
                    let num = 1;
                    for (let v of record) {
                        if (v === 0) {
                            break;
                        }
                        num++;
                    }
                    return tower_welfare[num].floor_limit;
                }]
            ]
        ],
        tipKey: `explore.tower.box`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 天庭秘境----扫荡
     */
    {
        depend: ["tower.use_sweep_count", "player.vip", "tower.floor_point"],
        fun: [
            [
                [">=", { dkey: "tower.floor_point" }, 10],
                ["<", { dkey: "tower.use_sweep_count" }, function () {
                    let vip = db.get("player.vip") || 0;
                    return vip_advantage[vip].tower_sweep_times;
                }]
            ]
        ],
        tipKey: `explore.tower.sweep`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 技能1
     */
    {
        depend: ["player.level", "bag*sid=100016"],
        fun: [
            [
                ["==", function () {
                    let level = db.get("player.level") || 1;
                    let skill_1 = db.get("skill.0");
                    if (!skill_1) {
                        return 0;
                    }
                    let s_obj = skill_level[skill_1[0]][skill_1[1]];
                    if (!s_obj) {
                        return 0;
                    }
                    let prop = db.get("bag*sid=100016").pop();
                    if ((level >= s_obj.level_limit) && prop && prop.count >= s_obj.number) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.skill.1`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 技能2
     */
    {
        depend: ["open_fun.id", "player.level", "bag*sid=100016"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["skill2"].id;
                }],
                ["==", function () {
                    let level = db.get("player.level") || 1;
                    let skill_2 = db.get("skill.1");
                    if (!skill_2) {
                        return 0;
                    }
                    let prop = db.get("bag*sid=100016").pop();
                    let s_obj = skill_level[skill_2[0]][skill_2[1]];
                    if (!s_obj) {
                        return 0;
                    }
                    if ((level >= s_obj.level_limit) && prop && prop.count >= s_obj.number) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.skill.2`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 技能3
     */
    {
        depend: ["open_fun.id", "player.level", "bag*sid=100016"],
        fun: [
            [

                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["skill3"].id;
                }],
                ["==", function () {
                    let level = db.get("player.level") || 1;
                    let skill_3 = db.get("skill.2");
                    if (!skill_3) {
                        return 0;
                    }
                    let prop = db.get("bag*sid=100016").pop();
                    let s_obj = skill_level[skill_3[0]][skill_3[1]];
                    if (!s_obj) {
                        return 0;
                    }
                    if ((level >= s_obj.level_limit) && prop && prop.count >= s_obj.number) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.skill.3`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 技能4
     */
    {
        depend: ["open_fun.id", "player.level", "bag*sid=100016"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["skill4"].id;
                }],
                ["==", function () {
                    let level = db.get("player.level") || 1;
                    let skill_4 = db.get("skill.3");
                    if (!skill_4) {
                        return 0;
                    }
                    let prop = db.get("bag*sid=100016").pop();
                    let s_obj = skill_level[skill_4[0]][skill_4[1]];
                    if (!s_obj) {
                        return 0;
                    }
                    if ((level >= s_obj.level_limit) && prop && prop.count >= s_obj.number) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.skill.4`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 技能5 [激活]
     */
    {
        depend: ["player.level", "skill.0", "skill.1", "skill.2", "skill.3"],
        fun: [
            [
                [">=", { dkey: "player.level" }, function () {
                    let skill_5 = db.get("skill.4");
                    return skill_5 ? skill_describe[skill_5[0]].activate_level : 60;
                }],
                ["==", function () {
                    let skill_5 = db.get("skill.4");
                    if ((!skill_5) || (skill_5[1] > 0)) {
                        return 0;
                    }
                    let skill_arr = db.get("skill");
                    let limit = skill_describe[skill_5[0]].activate_other_level;
                    for (let i = 0, len = skill_arr.length - 1; i < len; i++) {
                        if (skill_arr[i][1] < limit[i][1]) {
                            return 0;
                        }
                    }
                    return 1;
                }, 1]
            ]
        ],
        tipKey: `role.skill.active`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 技能5 [升级]
     */
    {
        depend: ["player.level", "bag*sid=100016"],
        fun: [
            [
                ["==", function () {
                    let level = db.get("player.level") || 1;
                    let skill_5 = db.get("skill.4");
                    if (!skill_5 || (skill_5[1] == 0)) {
                        return 0;
                    }
                    let prop = db.get("bag*sid=100016").pop();
                    let s_obj = skill_level[skill_5[0]][skill_5[1]];
                    if (!s_obj) {
                        return 0;
                    }
                    if ((level >= s_obj.level_limit) && prop && prop.count >= s_obj.number) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.skill.5`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 竞技场----挑战
     */
    {
        depend: ["open_fun.id", "player.vip", "arena.fight_times", "arena.buy_fight_times"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["arena"].id;
                }],
                ["==", function () {
                    let vip = db.get("player.vip") || 0;
                    let free_num = vip_advantage[vip].jjc_free_times;
                    let buy_num = db.get("arena.buy_fight_times") || 0;
                    let use_num = db.get("arena.fight_times") || 0;
                    if (free_num + buy_num - use_num > 0) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `explore.arena`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 神兵----激活
     */
    // {
    //     depend: ["open_fun.id", "open_fun.tips.role-magic_activate"],
    //     fun: [
    //         [
    //             [">=", { dkey: "open_fun.id" }, function () {
    //                 return function_open["magic_activate"].id;
    //             }],
    //             ["==", function () {
    //                 let tip = db.get("open_fun.tips.role-magic_activate") || 0;
    //                 if (tip == 1) {
    //                     return 1;
    //                 }
    //                 return 0;
    //             }, 1]
    //         ]
    //     ],
    //     tipKey: `role.magic_activate`,
    //     tipDetail: { "sid": 60040 }
    // },
    /**
     * 神兵----共鸣
     */
    {
        depend: [
            "open_fun.id",
            "friend_battle.equip_level",
            "friend_battle.equip_star",
            "friend_battle.equip_diam",
            "player.power",
            "player.level",
            "friend_battle.god_equip_num",
            "magic.break_info.0",
            "gest.gest_info",
            "soul.soul_info",
            "skill",
            "pet.pet_star_info"
        ],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["magic_activate"].id;
                }],
                ["==", function () {
                    let trea = db.get("magic.treasure") || [];
                    let flag = 1;
                    if (trea.length == 0 || trea[0] == 0) {
                        return 0;
                    }
                    let arr = TreasurePhase[trea[0]][trea[1]].resonance;
                    for (let obj of arr) {
                        let k = Object.keys(obj)[0],
                            o = TreasureRequirement[k];
                        if (!o || !TaskProgress[o.function] || !TaskProgress[o.function](obj[k])[0]) {
                            flag = 0;
                            break;
                        }
                    }
                    return flag;
                }, 1]
            ]
        ],
        tipKey: `role.magic_activate.gm`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 神兵----八卦空位升级
     */
    {
        depend: ["open_fun.id", "bag*sid=150002", "magic.hexagram_level", "magic.break_info.0"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["magic_activate"].id;
                }],
                ["==", function () {
                    let hexagram = db.get("magic.hexagram_level");
                    let break_info = db.get("magic.break_info");
                    if (!hexagram || !break_info) {
                        return 0;
                    }
                    let index = 0; //当前应该升级孔位 [0--表示暂无孔位]
                    for (let i = 0, len = hexagram.length; i < len; i++) {
                        if (hexagram[i] < break_info[0]) {
                            index = i + 1;
                            break;
                        }
                    }
                    if (index == 0) {
                        return 0;
                    }
                    let prop = db.get("bag*sid=150002").pop();

                    let obj = treasure_up[index][hexagram[index - 1]];
                    let my_exp = db.get("magic.hexagram_exp"),
                        need_exp = obj.need_exp,
                        need_num = (need_exp - my_exp) / obj.per_exp;
                    need_num = need_num < obj.one_cost_times ? need_num : obj.one_cost_times;

                    if (prop && prop.count >= need_num) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.magic_activate.bg.hexagram`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 神兵----八卦突破
     */
    {
        depend: ["open_fun.id", "magic.hexagram_level", "bag*sid=100017", "magic.break_info"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["magic_activate"].id;
                }],
                ["==", function () {
                    let hexagram = db.get("magic.hexagram_level");
                    let break_info = db.get("magic.break_info");
                    if (!hexagram || !break_info) {
                        return 0;
                    }
                    if (break_info[1] == treasure_break[break_info[0]].need_exp) {
                        return 1;
                    }
                    if (hexagram[hexagram.length - 1] == break_info[0]) {
                        let prop = db.get("bag*sid=100017").pop();
                        if (prop) {
                            return 1;
                        }
                        return 0;
                    }
                }, 1]
            ]
        ],
        tipKey: `role.magic_activate.bg.break`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 心法传承----一次
     */
    {
        depend: ["open_fun.id", "gest.gest_count.0"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["gest_fb"].id;
                }],
                ["<", function () {
                    return db.get("gest.gest_count") ? db.get("gest.gest_count")[0] : 0;
                }, function () {
                    return gest_base.day_count;
                }]
            ]
        ],
        tipKey: `explore.gest.inherit.1`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 心法副本----挑战boss
     */
    {
        depend: ["open_fun.id", "gest.challenged_times", "player.vip"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["gest_fb"].id;
                }],
                [">", function () {
                    let vip = db.get("player.vip") || 0;
                    return vip_advantage[vip].gest_free_challenge_times;
                }, { dkey: "gest.challenged_times" }]
            ]
        ],
        tipKey: `explore.gest.fb.fight`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 随机boss奖励
     */
    {
        depend: ["open_fun.id", "random_boss.has_box", "bag*sid=100018"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["random_boss"].id;
                }],
                ["==", { dkey: "random_boss.has_box" }, 1],
                ["==", function () {
                    let prop = db.get("bag*sid=100018").pop();
                    if (prop) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `explore.randomBox`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 签到----今天是否签到
     */
    {
        depend: ["checkin_data.checkin_state"],
        fun: [
            [
                ["==", { dkey: "checkin_data.checkin_state" }, 0]
            ]
        ],
        tipKey: `welfare_act.checkin.check`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 签到----领宝箱
     */
    {
        depend: ["checkin_data.boxday"],
        fun: [
            [
                ["==", { dkey: "checkin_data.boxday" }, function () {
                    return db.get("checkin_data.times_total") || 3;
                }]
            ]
        ],
        tipKey: `welfare_act.checkin.box`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 摇钱树----免费摇
     */
    {
        depend: ["money_tree.surplus", "money_tree.free_cd_end", "open_fun.id", "money_tree.free_config.0", "money_tree.last_time"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" },function () {
                        return function_open["money_tree"].id;
                    }
                ],
                [">", { dkey: "money_tree.free_config.0" }, { dkey: "money_tree.surplus" }],
                [">=", function () {
                    return Util.serverTime(true);
                }, function () {
                    let mtree_db = db.get("money_tree");
                    return (mtree_db && mtree_db.last_time) ? mtree_db.last_time + mtree_db.free_config[1] : 0;
                }]
            ]
        ],
        tipKey: "daily_act.money_tree.free",
        tipDetail: { "sid": 60040 }
    },
    /**
     * 摇钱树----宝箱1
     */
    {
        depend: ["money_tree.box.0", "money_tree.count"],
        fun: [
            [
                [">", { dkey: "money_tree.box.0" }, 0],
                [">=", { dkey: "money_tree.count" }, function () {
                    return MoneyTreeBoxAward.cfg[0].limit_count[0] || 5;
                }]
            ]
        ],
        tipKey: "daily_act.money_tree.box_0",
        tipDetail: { "sid": 60013 }
    },
    /**
     * 摇钱树----宝箱2
     */
    {
        depend: ["money_tree.box.1", "money_tree.count"],
        fun: [
            [
                [">", { dkey: "money_tree.box.1" }, 0],
                [">=", { dkey: "money_tree.count" }, function () {
                    return MoneyTreeBoxAward.cfg[0].limit_count[1] || 10;
                }]
            ]
        ],
        tipKey: "daily_act.money_tree.box_1",
        tipDetail: { "sid": 60013 }
    },
    /**
     * 摇钱树----宝箱3
     */
    {
        depend: ["money_tree.box.2", "money_tree.count"],
        fun: [
            [
                [">", { dkey: "money_tree.box.2" }, 0],
                [">=", { dkey: "money_tree.count" }, function () {
                    return MoneyTreeBoxAward.cfg[0].limit_count[2] || 20;
                }]
            ]
        ],
        tipKey: "daily_act.money_tree.box_2",
        tipDetail: { "sid": 60013 }
    },
    /**
     * 每日礼包
     */
    {
        depend: ["recharge.daily_gift_state"],
        fun: [
            [
                ["==", { dkey: "recharge.daily_gift_state" }, 0]
            ]
        ],
        tipKey: "welfare_act.daily_gift",
        tipDetail: { "sid": 60013 }
    },
    /**
     * 离线收益
     */
    {
        depend: ["off_line.leave_time", "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" },function () {
                        return function_open["off_line"].id;
                    }
                ], ["==", function () {
                    let leave_time = (db.get("off_line.leave_time") || 0) / 60;
                    let vip = db.get("player.vip") || 0;
                    let time = 0;
                    if (vip < master_off_line.need_vip) {
                        time = master_off_line.free_limit_time;
                    } else {
                        time = master_off_line.vip_limit_time;
                    }
                    return leave_time >= time ? 1 : 0;
                }, 1]
            ]
        ],
        tipKey: `daily_act.off_line`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 邮件
     */
    {
        depend: ["mail"],
        fun: [
            [
                [">", function () {
                    let arr = db.get("mail") || [];
                    return arr.length;
                }, 0]
            ]
        ],
        tipKey: "mail",
        tipDetail: { "sid": 60013 }
    }
    /**
     * 排行榜
     */
    {
        depend: ["player.rank_count"],
        fun: [
            [
                [">=", function () {
                    let rank_count = db.get("player.rank_count");
                    if (rank_count < rank_base.limit) {
                        return 1;
                    } else {
                        return 0;
                    }
                }, 1]
            ]
        ],
        tipKey: `rank.base`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 月卡
     */
    {
        depend: ["player.month_card_due_time", "recharge.month_card_receive_diamond"],
        fun: [
            [
                ["==", function () {
                    let due_time = db.get("player.month_card_due_time") || 0;
                    let now_time = Util.serverTime(true);
                    if (due_time == 0 || now_time > due_time) {
                        return 0;
                    }
                    return 1
                }, 1],
                ["==", { dkey: "recharge.month_card_receive_diamond" }, 0]
            ]
        ],
        tipKey: `activities.103.month`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 周卡
     */
    {
        depend: ["player.annual_card_due_time", "recharge.annual_card_receive_diamond"],
        fun: [
            [
                ["==", function () {
                    let due_time = db.get("player.annual_card_due_time") || 0;
                    let now_time = Util.serverTime(true);
                    if (due_time == 0 || now_time > due_time) {
                        return 0;
                    }
                    return 1
                }, 1],
                ["==", { dkey: "recharge.annual_card_receive_diamond" }, 0]
            ]
        ],
        tipKey: `activities.103.week`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 成长基金----是否购买
     */
    {
        depend: ["investment.buy_record.0", "investment.buy_record.1"],
        fun: [
            [
                [">", { dkey: "investment.buy_record.0" }, 0],
                ["==", { dkey: "investment.buy_record.1" }, 0]
            ]
        ],
        tipKey: `activities.104.award`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 赋灵突破
     */
    {
        depend: ["weapon_soul.level_record", "weapon_soul.class"],
        fun: [
            [
                ["<", { dkey: "weapon_soul.class" }, function () {
                    return weapon_soul_base.length - 1;
                }], ["==", function () {
                    let arr = db.get("weapon_soul.level_record");
                    let grade = db.get("weapon_soul.class");
                    for (let i = 0; i < arr.length; i++) {
                        let len = weapon_soul_grade[grade][i + 1].length;
                        if (arr[i] < (len - 1)) {
                            return 0;
                        }
                    }
                    return 1;
                }, 1]
            ]
        ],
        tipKey: `role.weapon_soul.break`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 阵法激活升星
     */
    {
        depend: [`gest.gest_quality_tip.4`, "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["gest"].id;
                }],
                ["==", function () {
                    return db.get(`gest.gest_quality_tip.4`);
                }, 1]
            ]
        ],
        tipKey: `role.gest.4`,
        tipDetail: { "sid": 60040 } //暂定
    },
    {
        depend: [`gest.gest_quality_tip.5`, "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["gest"].id;
                }],
                ["==", function () {
                    return db.get(`gest.gest_quality_tip.5`);
                }, 1]
            ]
        ],
        tipKey: `role.gest.5`,
        tipDetail: { "sid": 60040 } //暂定
    },
    {
        depend: [`gest.gest_quality_tip.6`, "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["gest"].id;
                }],
                ["==", function () {
                    return db.get(`gest.gest_quality_tip.6`);
                }, 1]
            ]
        ],
        tipKey: `role.gest.6`,
        tipDetail: { "sid": 60040 } //暂定
    }
];
/**
 * 九窍----升级
 */
const gestLevelUp = function () {
    let seat_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let soul_arr = [0, 1, 2, 3];
    seat_arr.forEach((seat) => {
        soul_arr.forEach((soul) => {
            let gest_level = {
                depend: ['player.money', `soul.soul_info.${seat}.${soul}.1`, `${soul_level_up[soul_seat[seat].hole[soul]][0].cost[0][0]}`, 'open_fun.id', 'player.level'],
                fun: [
                    [
                        [">=", { dkey: "open_fun.id" },function () {
                                return function_open["soul"].id;
                            }
                        ],["==", function () {
                            let arr = db.get(`soul.soul_info.${seat}.${soul}`);
                            if (!arr) {
                                return 0;
                            }
                            //是否为最高等级
                            if (arr[1] >= soul_resonance_need[seat + 1].length) {
                                return 0;
                            }
                            //是否开放孔位
                            let level = db.get('player.level');
                            if (level < soul_seat[seat].open_level) {
                                return 0;
                            }
                            let cost = soul_level_up[arr[0]][arr[1]].cost;
                            //获取背包里的材料
                            let prop = db.get(`bag*sid=${cost[0][0]}`).pop();
                            let money = db.get("player.money");
                            if (prop && prop.count >= cost[0][1] && money >= cost[1][1]) {
                                return 1;
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: `role.soul.${seat + 1}.${soul}`,
                tipDetail: { "sid": 60040 }
            };
            list.push(gest_level);
        });
    });
};
gestLevelUp();

/**
 * 装备副本----关卡宝箱
 */
const equipFbMissionBox = function () {
    let arr = Object.keys(equip_fb_welfare_box);
    for (let i = 0, len = arr.length; i < len; i++) {
        let mission_box = {
            depend: ["equip_fb.mission_point", `equip_fb.box_award_record.${i}`],
            fun: [
                [
                    ["==", { dkey: `equip_fb.box_award_record.${i}` }, 0],
                    [">=", { dkey: "equip_fb.mission_point" }, function () {
                        return arr[i];
                    }]
                ]
            ],
            tipKey: `explore.equipFb.${i + 1}`,
            tipDetail: { "sid": 60040 }
        };
        list.push(mission_box);
    }
};
equipFbMissionBox();

/**
 * 元素赋灵
 */
const giveWeaponSoul = function () {
    let id = [100053, 100054, 100052, 100055];
    let arr = [1, 2, 3, 4];
    for (let type of arr) {
        let give_soul = {
            depend: [`bag*sid=${id[type - 1]}`, "player.money", "open_fun.id", `weapon_soul.level_record.${type - 1}`],
            fun: [
                [
                    [">=", { dkey: "open_fun.id" }, function () {
                        return function_open["weapon_soul"].id;
                    }],
                    ["==", function () {
                        let level = db.get(`weapon_soul.level_record.${type - 1}`) || 0;
                        let grade = db.get("weapon_soul.class") || 0;
                        let obj = weapon_soul_grade[grade][type];
                        //满级
                        if (level == obj.length - 1) {
                            return 0;
                        }
                        //未满级
                        let cost = obj[level].cost;
                        if (!cost) {
                            return 0;
                        }
                        //背包物品
                        let prop = db.get(`bag*sid=${id[type - 1]}`).pop();
                        let money = db.get("player.money");
                        if (prop && (prop.count >= cost[0][1]) && (money >= cost[1][1])) {
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `role.weapon_soul.${type - 1}`,
            tipDetail: { "sid": 60040 }
        };
        list.push(give_soul);
    }
};
giveWeaponSoul();

/**
 * 成长基金----等级领奖
 */
const invLevelAward = function () {
    let key = Object.keys(investment_list)[0];
    for (let obj of investment_list[key]) {
        let level_award = {
            depend: [`investment.award_record.${obj.id - 1}`, "player.level"],
            fun: [
                [
                    [">=", { dkey: "player.level" }, function () {
                        return obj.level_limit;
                    }],
                    ["==", function () {
                        let flag = db.get(`investment.award_record.${obj.id - 1}`);
                        if (flag === 0) {
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `activities.104.${obj.id}`,
            tipDetail: { "sid": 60040 }
        };
        list.push(level_award);
    }
}
invLevelAward();

/**
 * 每日副本
 */
const dailyFb = function () {
    for (let i = 0; i < 6; i++) {
        let daily_tip = {
            depend: [`daily_fb.use_times.${i}`, "open_fun.id", `daily_fb.vip_daily_times.${i}`, "player.vip", "wild.wild_max_mission"],
            fun: [
                [
                    [">=", { dkey: "open_fun.id" },
                        function () {
                            return function_open["daily_fb"].id;
                        }
                    ],
                    [">=", { dkey: "wild.wild_max_mission" }, function () {
                        return daily_fb_base[i].guard_limit;
                    }],
                    ["==", function () {
                        //今天是否开放
                        let openDay = daily_fb_base[i].openDay;
                        let time = Util.serverTime();
                        let weekDay = new Date(time).getDay();
                        if (openDay && openDay.indexOf(weekDay) >= 0) {
                            return 1;
                        }
                        return 0;
                    }, 1], ["==", function () {
                        //有无剩余挑战次数
                        let vip = db.get("player.vip") || 0;
                        //vip每日免费次数
                        let freeNum = vip_advantage[vip].daily_instance_times,
                            //已使用次数
                            useNum = db.get(`daily_fb.use_times.${i}`) || 0,
                            //已购买次数
                            buyNum = db.get(`daily_fb.vip_daily_times.${i}`) || 0;
                        if ((freeNum + buyNum) > useNum) {
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `explore.dailyFb.${i + 1}`,
            tipDetail: { "sid": 60040 }
        };
        list.push(daily_tip);
    }
}
dailyFb();

/**
 * 活跃度----任务
 */
const livenessTask = function () {
    let len = liveness_reward.length;
    for (let i = 0; i < len; i++) {
        let liveness_tip = {
            depend: [`data_record.${liveness_reward[i].key}`, `liveness.type_award.${i}`, `open_fun.id`],
            fun: [
                [
                    [">=", { dkey: `open_fun.id` }, function () {
                        if (liveness_reward[i].fun_key) {
                            return function_open[liveness_reward[i].fun_key].id;
                        } else {
                            return 1000;
                        }
                    }],["==", function () {
                        let award = db.get(`liveness.type_award.${i}`);
                        if (award > 0) {
                            return 0;
                        }
                        let arr = db.get(`data_record.${liveness_reward[i].key}`);
                        if (!arr) {
                            return 0;
                        }
                        //完成值
                        let task_over = arr[0].length > 0 ? arr[0].length : 0;
                        //目标值
                        let aim = liveness_reward[i].condition_value;
                        return task_over >= aim ? 1 : 0;
                    }, 1]
                ]
            ],
            tipKey: `daily_act.liveness.${i}`,
            tipDetail: { "sid": 60040 } //暂定
        };
        list.push(liveness_tip);
    }
};
livenessTask();

/**
 * 成就
 */
const achieveTask = function () {
    for (let i = 0; i < 17; i++) {
        let achieve_tip = {
            depend: [`achieve.red_tip.${i}`],
            fun: [
                [
                    ["==", { dkey: `achieve.red_tip.${i}` }, 1]
                ]
            ],
            tipKey: `welfare_act.achieve.${i}`,
            tipDetail: { "sid": 60040 } //暂定
        };
        list.push(achieve_tip);
    }
};
achieveTask();


/**
 * 新功能开放
 */
// let new_fun = [
//     "equip-diam",
//     "equip-red",
//     "equip-star",
//     "equip-wash",
//     "explore-arena",
//     "explore-dailyFb",
//     "explore-equipFb",
//     "explore-gest",
//     "explore-instance",
//     "explore-randomBox",
//     "explore-rebel",
//     "explore-tower",
//     "gang",
//     "role-cloth",
//     "role-gest",
//     "role-magic_activate",
//     "role-pet",
//     "role-skill",
//     "role-soul",
//     "explore-worldBoss",
//     "role-weapon_soul"
// ];
// const newFunOpen = function () {
//     for(let v of new_fun) {
//         let tip = {
//             depend: [`open_fun.tips.${v}`],
//             fun: [
//                 [
//                     ["==", { dkey: `open_fun.tips.${v}` }, 1]
//                 ]
//             ],
//             tipKey: `${v.replace('-', '.')}`,
//             tipDetail: { "sid": 60040 }
//         };
//         list.push(tip);
//     }
// };
// newFunOpen();



/**
 * 合并多个提示配置表
 */
TipFun.init(list);
list = null;