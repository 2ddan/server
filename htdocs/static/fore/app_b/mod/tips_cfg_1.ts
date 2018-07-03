import * as db from "app/mod/db";
import { Util } from "app/mod/util";
import { Pi } from "app/mod/pi";
import { TipFun } from "app/mod/tip_fun";
import { function_open } from "cfg/b/function_open";
import { TaskProgress } from "app_b/mod/task_progress";
import { activity_list } from "cfg/c/activity_list";
// 经验副本
import { exp_fb_base } from "cfg/c/exp_fb_base";
import { exp_fb_condition } from "cfg/c/exp_fb_condition";
// 灵宠
import { pet_skin } from "cfg/b/pet_skin_show";
// 时装
import { cloth_skin } from "cfg/b/clothes_skin";
// 周活动
import { weekact_list_fore as weekact_list } from "cfg/c/weekact_list";
import { weekact_type_fore as weekact_type } from "cfg/c/weekact_type";
// 七日活动
import { tips_7days } from "cfg/c/tips_7days";
import { act_progress } from "app_b/mod/act_progress";
// 公会相关
import { guild_activity } from "cfg/c/guild_activity";
import { guild_upgrade } from "cfg/c/guild_upgrade";
import { guild_build } from "cfg/c/guild_build";
import { guild_skill } from "cfg/c/guild_skill";
import { guild_boss } from "cfg/c/guild_boss";
import { guild_charge } from "cfg/c/guild_charge";
// 符文相关
import { rune_state } from "cfg/c/rune_state";
import { rune_practice } from "cfg/c/rune_practice";
import { rune } from "cfg/c/rune";
// 天书抽奖
import { luck_draw_set } from "cfg/c/luck_draw_set";
// 翻翻乐
import { card_get_score_award } from "cfg/c/card_score_award";
// 宝石迷阵
import { gem_get_score_award } from "cfg/c/gem_score_award";
// 抢夺水晶
import { robres_reward } from "cfg/c/robres_reward";
import { robres_base } from "cfg/c/robres_base";

let list = [
    /**
     * 经验副本----令牌挑战
     */
    {
        depend: [`bag*sid=${exp_fb_base["cost"][0]}`, "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["exp_fb"].id;
                }
                ], ['==', function () {
                    let prop = db.get(`bag*sid=${exp_fb_base["cost"][0]}`).pop();
                    return prop ? 1 : 0;
                }, 1]
            ]
        ],
        tipKey: "explore.exp_fb.token",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 经验副本----次数挑战
     */
    {
        depend: ["exp_fb.total_count", "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["exp_fb"].id;
                }
                ], ['>', { dkey: `exp_fb.total_count` }, 0]
            ]
        ],
        tipKey: "explore.exp_fb.count",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 经验副本----level
     */
    {
        depend: ["exp_fb.record.level", "player.level", "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["exp_fb"].id;
                }
                ], ["==", function () {
                    let num = db.get('exp_fb.record.level') || 0;
                    let params = exp_fb_condition["level"][num].params;
                    let flag = TaskProgress.getPlayerLevel(params)[0];
                    if (flag) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.exp_fb.task.level",
        tipDetail: { "sid": 60040 } //暂定
    },
    //power
    {
        depend: ["exp_fb.record.power", "player.power", "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["exp_fb"].id;
                }
                ], ["==", function () {
                    let num = db.get('exp_fb.record.power') || 0;
                    let params = exp_fb_condition["power"][num].params;
                    let flag = TaskProgress.getFightAbility(params)[0];
                    if (flag) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.exp_fb.task.power",
        tipDetail: { "sid": 60040 } //暂定
    },
    //wild
    {
        depend: ["exp_fb.record.wild", "wild.wild_max_mission", "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["exp_fb"].id;
                }
                ], ["==", function () {
                    let num = db.get('exp_fb.record.wild') || 0;
                    let params = exp_fb_condition["wild"][num].params;
                    let flag = TaskProgress.wildMission(params)[0];
                    if (flag) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: "explore.exp_fb.task.wild",
        tipDetail: { "sid": 60040 } //暂定
    },
    /**
     * 灵宠培养
     */
    {
        depend: ["bag*sid=100028", "open_fun.id"],
        fun: [
            [
                [">=", { dkey: "open_fun.id" }, function () {
                    return function_open["pet"].id;
                }
                ], ["==", function () {
                    let prop = db.get("bag*sid=100028").pop();
                    if (prop) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `role.pet.upgrade`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 门派申请
     */
    {
        depend: ["gang.data.apply_list", "gang.data.post"],
        fun: [
            [
                ["==", function () {
                    let post = db.get("gang.data.post") || 3;
                    if (post === 3) {
                        return 0;
                    }
                    let apply_list = db.get("gang.data.apply_list");
                    if (apply_list && apply_list.length > 0) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `gang.member.apply`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 领取每日俸禄
     */
    {
        depend: ["gang.gangExpandData.gang_salary", "gang.data.gang_id"],
        fun: [
            [
                [">=", function () {
                    return db.get("gang.data.gang_id") || 0;
                }, 1],
                ["==", { dkey: "gang.gangExpandData.gang_salary" }, 0]
            ]
        ],
        tipKey: `gang.info.salary`,
        tipDetail: { "sid": 60040 }        
    },
    /**
     * 门派日常任务领奖
     */
    {
        depend: ["gang.gangExpandData.liveness_event_info", "gang.data.gang_id", "gang.gangExpandData.liveness_info"],
        fun: [
            [
                [">=", function () {
                    return db.get("gang.data.gang_id") || 0;
                }, 1],
                ["==", function () {
                    let liveness_info = db.get("gang.gangExpandData.liveness_info");
                    if (!liveness_info) {
                        return 0;
                    }
                    let do_task = db.get("gang.gangExpandData.liveness_event_info");
                    for (let i = 0, len = liveness_info.length; i < len; i++) {
                        if (liveness_info[i] == 0) {
                            if (do_task[guild_activity[i].type] >= guild_activity[i].param) {
                                return 1;
                            }
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `gang.info.activity`,
        tipDetail: { "sid": 60040 }        
    },
    /**
     * 建筑升级
     */
    {
        depend: ["gang.gangExpandData.gang_money", "gang.data.gang_id", "gang.data.post"],
        fun: [
            [
                [">=", function () {
                    return db.get("gang.data.gang_id") || 0;
                }, 1],
                ["==", { dkey: "gang.data.post" }, 1],
                ["==", function () {
                    let gang_level = db.get("gang.data.gang_level") || 0;
                    let gang_money = db.get("gang.gangExpandData.gang_money") || 0;
                    if (gang_level == 0) {
                        return 0;
                    }
                    //判断旗帜能否升级
                    if (guild_upgrade[gang_level + 1] && gang_money >= guild_upgrade[gang_level].guild_money) {
                        return 1;
                    }
                    let build;
                    let build_level_info = db.get("gang.gangExpandData.build_level_info");
                    //判断 藏经阁 能否升级
                    build = guild_build[1][build_level_info[0]];
                    
                    if (build.flag_level != 0 && gang_level >= build.flag_level && gang_money >= build.guild_money) {
                        return 1;
                    }
                    //判断 藏宝阁 能否升级
                    build = guild_build[2][build_level_info[1]];
                    if (build.flag_level != 0 && gang_level >= build.flag_level && gang_money >= build.guild_money) {
                        return 1;
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `gang.build.building`,
        tipDetail: { "sid": 60040 }        
    },
    /**
     * 门派祈福
     */
    {
        depend: ["gang.gangExpandData.pray_info", "player.money", "player.diamond"],
        fun: [
            [
                [">", function () {
                    let gang_id = db.get("gang.data.gang_id") || 0;
                    return gang_id;
                }, 0],
                ["==", function () {
                    let pray_info = db.get("gang.gangExpandData.pray_info");
                    let money = db.get("player.money");
                    let diamond = db.get("player.diamond");
                    for (let i = 0, len = pray_info.length; i < len; i++) {
                        let obj = guild_charge[i];
                        if (pray_info[i] < obj.limit && money >= obj.cost.money && diamond >= obj.cost.diamond) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `gang.build.pray`,
        tipDetail: { "sid": 60040 }   
    },
    /**
     * 公会绝学
     */
    {
        depend: ["player.money", "gang.gangExpandData.own_contribute", "gang.data.gang_id"],
        fun: [
            [
                [">=", function () {
                    return db.get("gang.data.gang_id") || 0;
                }, 1],
                ["==", function () {
                    let money = db.get("player.money");
                    let own_contribute = db.get("gang.gangExpandData.own_contribute");
                    let build = db.get("gang.gangExpandData.build_level_info");
                    let role_gang_skill = db.get("gang.data.role_gang_skill");

                    for (let i = 0, len = role_gang_skill.length; i < len; i++) {
                        let skill = guild_skill[i + 1][role_gang_skill[i]];
                        if (build[0] >= skill.limit.guild_level && money >= skill.cost.cost_money && own_contribute >= skill.cost.cost_contribute) {
                            return 1
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `gang.info.skill`,
        tipDetail: { "sid": 60040 }  
    },
    /**
     * 荒野降魔 [奖励分配]
     */
    {
        depend: ["publicboss.award_tip", "player.role_id"],
        fun: [
            [
                [">=", function () {
                    let id = db.get("player.role_id");
                    return (db.get(`publicboss.award_tip.${id}`) || 0);
                }, 1]
            ]
        ],
        tipKey: `new_fun.public_boss.award`,
        tipDetail: { "sid": 60040 }  
    },
    /**
     * 符文修行
     */
    {
        depend: ["player.money", "bag*sid=100057", "rune.rune_state"],
        fun: [
            [
                ["==", function () {
                    let state = db.get("rune.rune_state");
                    if (!state) {
                        return 0;
                    }
                    let obj = rune_state[state[0]][state[1]];
                    // 已到最高
                    if (!obj.cost_prop) {
                        return 0;
                    }
                    // 获取消耗
                    let money = db.get("player.money") || 0;
                    let prop = db.get("bag*sid=100057").pop();
                    if (prop && prop.count >= obj.cost_prop[1] && money >= obj.cost_money) {
                        return 1;
                    }
                }, 1]
            ]
        ],
        tipKey: `role.rune.state`,
        tipDetail: { "sid": 60040 }         
    },
    /**
     * 符文经脉
     */
    {
        depend: ["player.money", "bag*sid=100058", "rune.rune_practice"],
        fun: [
            [
                ["==", function () {
                    let practice = db.get("rune.rune_practice");
                    if (!practice) {
                        return 0;
                    }
                    let obj = rune_practice[practice[0]][practice[1]];
                    // 已到最高
                    if (!obj.cost_prop) {
                        return 0;
                    }
                    // 获取消耗
                    let money = db.get("player.money") || 0;
                    let prop = db.get("bag*sid=100058").pop();
                    if (prop && prop.count >= obj.cost_prop[1] && money >= obj.cost_money) {
                        return 1;
                    }
                }, 1]
            ]
        ],
        tipKey: `role.rune.practice`,
        tipDetail: { "sid": 60040 }          
    },
    // 天书抽奖 Book of heaven
    {
        depend: ["lottery.free_time.0"],
        fun: [
            [
                [">=", function () {
                    let time = Util.serverTime(true);
                    return time - luck_draw_set.prop_cd;
                }, { dkey: "lottery.free_time.0" }]
            ]
        ],
        tipKey: `lottery.book.0`,
        tipDetail: { "sid": 60040 }          
    },
    {
        depend: ["lottery.free_time.1"],
        fun: [
            [
                [">=", function () {
                    let time = Util.serverTime(true);
                    return time - luck_draw_set.diamond_cd;
                }, { dkey: "lottery.free_time.1" }]
            ]
        ],
        tipKey: `lottery.book.1`,
        tipDetail: { "sid": 60040 }          
    },
    /**
     * 翻翻乐
     */
    {
        depend: ["play_card.score", "play_card.score_once_award"],
        fun: [
            [
                ["==", function () {
                    // 活动开放
                    let time = Util.serverTime();
                    let act = activity_list[102];
                    if (time >= act.open_date && time <= act.delay_date) {
                        return 1;
                    }
                    return 0;
                }, 1],
                ["==", function () {
                    // 有没奖励可领取
                    let score = db.get("play_card.score");
                    let score_once_award = db.get("play_card.score_once_award");
                    let award_limit = card_get_score_award.award_limit;
                    for (let i = 0, len = award_limit.length; i < len; i++) {
                        if (score >= award_limit[i] && score_once_award[i] == 0) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `play_card.award.score_award`,
        tipDetail: { "sid": 60040 }  
    },
    /**
     * 宝石迷阵
     */
    {
        depend: ["gem_data.score", "gem_data.score_once_award"],
        fun: [
            [
                ["==", function () {
                    // 活动开放
                    let time = Util.serverTime();
                    let act = activity_list[101];
                    if (time >= act.open_date && time <= act.delay_date) {
                        return 1;
                    }
                    return 0;
                }, 1],
                ["==", function () {
                    // 有没奖励可领取
                    let score = db.get("gem_data.score");
                    let score_once_award = db.get("gem_data.score_once_award");
                    let award_limit = gem_get_score_award.award_limit;
                    for (let i = 0, len = award_limit.length; i < len; i++) {
                        if (score >= award_limit[i] && score_once_award[i] == 0) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: `gem.award`,
        tipDetail: { "sid": 60040 }
    },
    /**
     * 抢夺水晶----领奖
     */
    {
        depend: ["robres.achieve_record.get_res", "robres.achieve_record.grab_time", "robres.award_record"],
        fun: [
            [
                ["==", function () {
                    let get_res = db.get("robres.achieve_record.get_res") || 0;
                    let times = db.get("robres.achieve_record.grab_time") || 0;
                    let award_record = db.get("robres.award_record") || [];
                    if (award_record.length == 0) {
                        return 0;
                    }
                    for (let i = 0, len = robres_reward.length; i < len; i++) {
                        if (award_record[i]) {
                            continue;
                        }
                        let obj = robres_reward[i];
                        if (obj.type == "get_res" && get_res >= obj.condition) {
                            return 1;
                        }
                        if (obj.type == "grab_time" && times >= obj.condition) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
            ]
        ],
        tipKey: 'new_fun.robres.award',
        tipDetail: { "sid": 60040 }
    },
    /**
     * 抢夺水晶----我的资源----伙伴协助
     */
    {
        depend: ["robres.assist_buy_count", "robres.assist_count", "robres.gang_assist_list"],
        fun: [
            [
                [">", function () {
                    let list = db.get("robres.gang_assist_list") || [];
                    return list.length;
                }, 0]
                // [">", function () {
                //     let buy_count = db.get("robres.assist_buy_count") || 0;
                //     let use_count = db.get("robres.assist_count") || 0;
                //     return robres_base.init_help_times + buy_count - use_count;
                // }, 0]
            ]
        ],
        tipKey: 'new_fun.robres.event.assist',
        tipDetail: { "sid": 60040 }        
    },
    /**
     * 抢夺水晶----我的资源----复仇
     */
    {
        depend: ["robres.revenge_buy_count", "robres.revenge_count", "robres.revenge_info_list", "robres.seek_help_buy_count","robres.seek_help_count"],
        fun: [
            [
                ["==", function () {
                    let list = db.get("robres.revenge_info_list") || [];
                    for(let v of list) {
                        if (v && v[1][4] == 0) {
                            return 1;
                        }
                    }
                    return 0;
                }, 1]
                // ["==", function () {
                //     let revenge_buy_count = db.get("robres.revenge_buy_count") || 0;
                //     let revenge_count = db.get("robres.revenge_count") || 0;
                //     if ((robres_base.init_revenge_times + revenge_buy_count - revenge_count) > 0) {
                //         return 1;
                //     }
                //     let seek_help_buy_count = db.get("robres.seek_help_buy_count") || 0;
                //     let seek_help_count = db.get("robres.seek_help_count") || 0;
                //     if ((robres_base.seek_help_times + seek_help_buy_count - seek_help_count) > 0) {
                //         return 1;
                //     }
                //     return 0;
                // }, 1]
            ]
        ],
        tipKey: 'new_fun.robres.event.revenge',
        tipDetail: { "sid": 60040 }        
    }
];

/**
 * 符文秘籍 镶嵌
 */

const runeBook = function () {
    let len = Object.keys(rune).length;
    for (let i = 0; i < len; i++) {
        let p1 = rune[i + 1][0].prop_id;
        let p2 = rune[i + 1][1].prop_id;
        let tip = {
            depend: [`rune.rune_set.${i}`, `bag*sid=${p1}`, `bag*sid=${p2}`],
            fun: [
                [
                    ["==", function () {
                        let rune_set = db.get(`rune.rune_set.${i}`) || 0;
                        // 已装备高级秘籍
                        if (rune_set == p1) {
                            return 0;
                        }
                        // 以装备低级秘籍 [并且有高级秘籍]
                        let a = db.get(`bag*sid=${p1}`);
                        let prop_1 = a ? a.pop() : undefined; // 高级
                        if ((rune_set == p2) && prop_1) {
                            return 1;
                        }
                        // 还未装备秘籍
                        let b = db.get(`bag*sid=${p2}`);
                        let prop_2 = b ? b.pop() : undefined; // 低级
                        if (rune_set == 0 && (prop_2 || prop_1)) {
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `role.rune.book.${i}`,
            tipDetail: { "sid": 60040 } 
        };
        list.push(tip);
    }
};
runeBook();

/**
 * 公会boss 领取奖励
 */
let len = guild_boss.length;
let gangBossAward = function () {
    for (let i = 0; i < len; i++) {
        let gang_boss_tip = {
            depend: [`gang.tip.${i}`],
            fun: [
                [
                    [">=", function () {
                        return db.get("gang.data.gang_id") || 0;
                    }, 1],
                    ["==", function () {
                        return db.get(`gang.tip.${i}`) || 0;
                    }, 1]
                ]
            ],
            tipKey: `gang.info.boss.award.${i}`,
            tipDetail: { "sid": 60040 } 
        };
        list.push(gang_boss_tip);
    }
};
gangBossAward();

/**
 * 周活动---领奖
 */
let week_act_id = Object.keys(weekact_list);
const weekActTip = function () {
    week_act_id.forEach((id) => {
        let week_tip = {
            depend: [`week.tip.${id}`, "player.level"],
            fun: [
                [
                    [">=", { dkey: "player.level" }, function () {
                        return weekact_type[weekact_list[id].act_id].role_limit;
                    }
                    ], ["==", function () {
                        return db.get(`week.tip.${id}`) || 0;
                    }, 1]
                ]
            ],
            tipKey: `daily_act.week_act.${id}`,
            tipDetail: { "sid": 60040 }
        };
        list.push(week_tip);
    })
};
weekActTip();

/**
 * 灵宠皮肤合成
 */
const petSkinTip = function () {
    for (let key of pet_skin) {
        let obj = Pi.sample[key];
        if (obj && obj.is_default) {
            let skin = {
                depend: [`bag*sid=${obj.act_condition[0]}`, "pet.own_skin", "open_fun.id"],
                fun: [
                    [
                        [">=", { dkey: "open_fun.id" }, function () {
                            return function_open["pet"].id;
                        }
                        ], ["==", function () {
                            let prop = db.get(`bag*sid=${obj.act_condition[0]}`).pop();
                            let arr = db.get("pet.own_skin") || [];
                            if (prop && prop.count >= obj.act_condition[1] && arr.indexOf(Number(key)) < 0) {
                                return 1;
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: `role.pet.skin.${key}`,
                tipDetail: { "sid": 60040 }
            };
            list.push(skin);
        }
    }
}
petSkinTip();

/**
 * 灵宠皮肤碎片清理
 */
const petSkinClearTip = function () {
    for (let key of pet_skin) {
        let obj = Pi.sample[key];
        if (obj && obj.is_default) {
            let skin_clear = {
                depend: [`bag*sid=${obj.act_condition[0]}`, "pet.own_skin"],
                fun: [
                    [
                        ["==", function () {
                            let prop = db.get(`bag*sid=${obj.act_condition[0]}`).pop();
                            let arr = db.get("pet.own_skin") || [];
                            if (prop && arr.indexOf(Number(key)) >= 0) {
                                return 1;
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: `role.pet.skin.clear.${key}`,
                tipDetail: { "sid": 60040 }
            };
            list.push(skin_clear);
        }
    }
};
petSkinClearTip();

/**
 * 时装合成
 */
const clothSkinTip = function () {
    for (let key of cloth_skin) {
        let obj = Pi.sample[key];
        if (obj) {
            let cloth = {
                depend: [`bag*sid=${obj.act_condition[0]}`, "cloth.own_clothes"],
                fun: [
                    [
                        ["==", function () {
                            let prop = db.get(`bag*sid=${obj.act_condition[0]}`).pop();
                            let arr = db.get("cloth.own_clothes") || [];
                            if (prop && prop.count >= obj.act_condition[1] && arr.indexOf(Number(key)) < 0) {
                                return 1;
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: `role.cloth.${key}`,
                tipDetail: { "sid": 60040 }
            };
            list.push(cloth);
        }
    }
};
clothSkinTip();

/**
 * 时装碎片清理
 */
const clothSkinClearTip = function () {
    for (let key of cloth_skin) {
        let obj = Pi.sample[key];
        if (obj) {
            let cloth_clear = {
                depend: [`bag*sid=${obj.act_condition[0]}`, "cloth.own_clothes"],
                fun: [
                    [
                        ["==", function () {
                            let prop = db.get(`bag*sid=${obj.act_condition[0]}`).pop();
                            let arr = db.get("cloth.own_clothes") || [];
                            if (prop && arr.indexOf(Number(key)) >= 0) {
                                return 1;
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: `role.cloth.clear.${key}`,
                tipDetail: { "sid": 60040 }
            };
            list.push(cloth_clear);
        }
    }
};
clothSkinClearTip();

/**
 * 七日活动
 * @param now_day [第几天]
 * @param tab [第几项]
 * @param arr [任务队列]
 */
const sevenDay = function (now_day, tab, arr) {
    if (tab == 4) {
        // let seven_tip = {
        //     depend: ["sevendays.record", "sevendays.nowDay", "player.diamond"],
        //     fun: [
        //         [
        //             ["==", { dkey: "sevendays.nowDay" }, function () {
        //                 return now_day;
        //             }],
        //             ["==", function () {
        //                 for (let task of arr) {
        //                     if (db.get("player.diamond") < task.params) {
        //                         return 0;
        //                     }
        //                     if (db.get(`sevendays.record.${task.id}`)) {
        //                         return 0;
        //                     }
        //                 }
        //                 return 1;
        //             }, 1]
        //         ]
        //     ],
        //     tipKey: `sevendays.${now_day}.${tab}`,
        //     tipDetail: { "sid": 60040 }
        // }
        // list.push(seven_tip);
    } else {
        let seven_tip = {
            depend: ["sevendays.record", "sevendays.nowDay"],
            fun: [
                [
                    [">=", { dkey: "sevendays.nowDay" }, function () {
                        return now_day;
                    }],
                    ["==", function () {
                        for (let task of arr) {
                            if (db.get(`sevendays.record.${task.id}`)) {
                                continue;
                            }
                            if (act_progress.sevenday(task.type, task.params)[0]) {
                                return 1;
                            }
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `sevendays.${now_day}.${tab}`,
            tipDetail: { "sid": 60040 }
        }
        list.push(seven_tip);
    }
}
const sd = function () {
    for (let k in tips_7days) {
        for (let tab in tips_7days[k]) {
            sevenDay(k, tab, tips_7days[k][tab]);
        }
    }
}
sd();

/**
 * 合并多个提示配置表
 */
TipFun.init(list);
list = null;