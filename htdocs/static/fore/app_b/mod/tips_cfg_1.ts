import * as db from "app/mod/db";
import { Util } from "app/mod/util";
import { Pi } from "app/mod/pi";
import { Common } from "app/mod/common";
import { TipFun } from "app/mod/tip_fun";
import { vip_advantage } from "cfg/c/vip_advantage";
import { function_open } from "cfg/b/function_open";
import { TaskProgress } from "app_b/mod/task_progress";
//经验副本
import { exp_fb_base } from "cfg/c/exp_fb_base";
import { exp_fb_condition } from "cfg/c/exp_fb_condition";
//灵宠
import { pet_skin } from "cfg/b/pet_skin_show";
//时装
import { cloth_skin } from "cfg/b/clothes_skin";
//周活动
import { weekact_list_fore as weekact_list } from "cfg/c/weekact_list";
import { weekact_type_fore as weekact_type } from "cfg/c/weekact_type";
//七日活动
import { tips_7days } from "cfg/c/tips_7days";
import { act_progress } from "app_b/mod/act_progress";
//公会相关
import { guild_activity } from "cfg/c/guild_activity";
import { guild_upgrade } from "cfg/c/guild_upgrade";
import { guild_build } from "cfg/c/guild_build";
import { guild_skill } from "cfg/c/guild_skill";


let list = [
    /**
     * 经验副本----令牌挑战
     */
    {
        depend: [`${exp_fb_base["cost"][0]}`, "open_fun.id"],
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
                    if (gang_level >= build.flag_level && gang_money >= build.guild_money) {
                        return 1;
                    }
                    //判断 藏宝阁 能否升级
                    build = guild_build[2][build_level_info[1]];
                    if (gang_level >= build.flag_level && gang_money >= build.guild_money) {
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
    }
];

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
        let seven_tip = {
            depend: ["sevendays.record", "sevendays.nowDay", "player.diamond"],
            fun: [
                [
                    ["==", { dkey: "sevendays.nowDay" }, function () {
                        return now_day;
                    }],
                    ["==", function () {
                        for (let task of arr) {
                            if (db.get("player.diamond") < task.params) {
                                return 0;
                            }
                            if (db.get(`sevendays.record.${task.id}`)) {
                                return 0;
                            }
                        }
                        return 1;
                    }, 1]
                ]
            ],
            tipKey: `sevendays.${now_day}.${tab}`,
            tipDetail: { "sid": 60040 }
        }
        list.push(seven_tip);
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