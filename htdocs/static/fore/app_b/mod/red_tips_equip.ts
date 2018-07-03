import * as db from "app/mod/db";
import { TipFun } from "app/mod/tip_fun";
import { function_open } from "cfg/b/function_open";
//强化配置
import { equip_level_up } from "cfg/c/equip_level_up";
//升星配置
import { equip_star_promote } from "cfg/c/equip_star_promote_fore";
//星宿配置
import { StarAchievement } from "cfg/c/equip_star_achievement";
//宝石升级配置
import { equip_diam_equip } from "cfg/c/equip_diam_equip";
import { equip_diam_promote } from "cfg/c/equip_diam_promote";
//红装锻造(升级)
import { equip_level_limit } from "cfg/b/equip_level_limit";
import { equip_evolution } from "cfg/c/equip_evolution";
//红装洗练
import { vip_advantage } from "cfg/c/vip_advantage";
import { equip_wash_cost } from "cfg/c/equip_wash_cost";
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
let list = [];


/**
 * 装备模块----心宿加成
 */
let satr_xx = {
    depend: ["friend_battle.soul", "friend_battle.soul_achieve.14.1.4"],
    fun: [
        [
            //是否已满级
            ["==", { dkey: "friend_battle.soul_achieve.14.1.4" }, 0],

            ["<=", function () {
                let soul_achieve = db.get("friend_battle.soul_achieve");
                let x_index,  //星宿序号
                    xx_index,  //星星序号
                    cost_soul;
                for (let arr of soul_achieve) {
                    for (let i = 0, len = arr[1].length; i < len; i++) {
                        if (arr[1][i] === 0) {
                            x_index = arr[0]
                            xx_index = (arr[0] - 1) * 5 + i + 1;
                            break;
                        }
                    }
                    if (xx_index > 0) {
                        break;
                    }
                }
                cost_soul = StarAchievement[x_index][xx_index].sour;
                return cost_soul;
            }, { dkey: "friend_battle.soul" }]
        ]
    ],
    tipKey: "equip.star.xx",
    tipDetail: { "sid": 60040 } //暂定
}
list.push(satr_xx);

/**
 * 装备模块----强化
 */
const equipStrong = function () {
    for (let i = 0; i < 10; i++) {
        let strong_tip = {
            depend: [`friend_battle.equip_level.${i}`, "player.money", `bag*sid=100004`, `friend_battle.equip_set.${i}`],
            fun: [
                [
                    [">=", { dkey: "open_fun.id" },
                        function () {
                            return function_open["equip_level"].id;
                        }
                    ], ["==", function () {
                        let equip = db.get(`friend_battle.equip_set.${i}`);
                        if (!equip) {
                            return 0;
                        }
                        //强化等级
                        let level = db.get(`friend_battle.equip_level.${i}`);
                        if (level >= 0) {
                            let bag_material = db.get(`bag*sid=${equip_level_up[level][0][0]}`).pop();
                            let money = db.get("player.money");
                            //消耗的材料数量
                            let cost_material = equip_level_up[level][0][1];
                            let cost_money = equip_level_up[level][1];
                            if (bag_material && bag_material.count >= cost_material && money >= cost_money) {
                                return 1;
                            }
                            return 0;
                        }
                    }, 1]
                ]
            ],
            tipKey: `equip.level.${i}`,
            tipDetail: { "sid": 60058 } //暂定            
        };
        list.push(strong_tip);
    }
}
equipStrong();

/**
 * 装备模块----升星
 */
const equipStar = function () {
    for (let i = 0; i < 10; i++) {
        let star_tip = {
            depend: [`friend_battle.equip_set.${i}`, "open_fun.id", `friend_battle.equip_star.${i}`, "player.money", `bag*sid=100005`, `bag*sid=100006`],
            fun: [
                [
                    [">=", { dkey: "open_fun.id" },
                        function () {
                            return function_open["equip_star"].id;
                        }
                    ], ["==", function () {
                        let equip = db.get(`friend_battle.equip_set.${i}`);
                        if (!equip) {
                            return 0;
                        }
                        //升星等级
                        let star = db.get(`friend_battle.equip_star.${i}`);
                        let cost = equip_star_promote[i + 1][star].cost;
                        let cost_money = equip_star_promote[i + 1][star].money;
                        let money = db.get("player.money");
                        if (star >= 0) {
                            if (cost_money > money || cost.length == 0) {
                                return 0;
                            }
                            for (let arr of cost) {
                                let bag_material = db.get(`bag*sid=${arr[0]}`).pop();
                                if (!bag_material || arr[1] > bag_material.count) {
                                    return 0;
                                }
                            }
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `equip.star.${i}`,
            tipDetail: { "sid": 60058 } //暂定
        }
        list.push(star_tip);
    }
}
equipStar();

/**
 * 装备模块----宝石升级
 */
const equipDiam = function () {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 4; j++) {
            let diam_tip = {
                depend: [`friend_battle.equip_set.${i}`, "open_fun.id", `friend_battle.equip_diam.${i}.${j}`, "player.money", `bag*sid=${equip_diam_promote[equip_diam_equip[i + 1][0][0]][0][0][0]}`],
                fun: [
                    [
                        [">=", { dkey: "open_fun.id" },
                            function () {
                                return function_open["equip_gem"].id;
                            }
                        ], ["==", function () {
                            let equip = db.get(`friend_battle.equip_set.${i}`);
                            if (!equip) {
                                return 0;
                            }
                            let total = 0;
                            let diam = db.get(`friend_battle.equip_diam.${i}`);
                            for (let v of diam) {
                                if (v[1] == 0) {
                                    break;
                                }
                                total += v[1];
                            }
                            let arr = equip_diam_equip[i + 1][j]; //[宝石类型, 激活条件]
                            //未开放
                            if (diam[j][1] === 0 && total < arr[1]) {
                                return 0;
                            }
                            //获取对应宝石类型及相应等级的升级花费
                            let costArr = equip_diam_promote[arr[0]][diam[j][1]];
                            //满级状态
                            if (!costArr) {
                                return 0;
                            }
                            //可升级状态
                            if (diam[j][1] >= 0) {
                                let bag_material = db.get(`bag*sid=${costArr[0][0]}`).pop();
                                let money = db.get("player.money");
                                //消耗的材料数量
                                let cost_material = costArr[0][1];
                                let cost_money = costArr[2];
                                if (bag_material && bag_material.count >= cost_material && money >= cost_money) {
                                    return 1;
                                }
                                return 0;
                            }
                        }, 1]
                    ]
                ],
                tipKey: `equip.diam.${i}.${j}`,
                tipDetail: { "sid": 60058 } //暂定
            };
            list.push(diam_tip);
        }
    }
}
equipDiam();

/**
 * 装备模块----红装升级(锻造)
 */
const redId = Object.keys(equip_evolution).sort(function (a, b) {
    return (equip_evolution[a].solt - equip_evolution[b].solt);
});
const equipRed = function () {
    for (let i = 0, len = redId.length; i < len; i++) {
        let forge_tip = {
            depend: [`friend_battle.equip_set.${i}`, "open_fun.id", "player.level", `bag*sid=100027`, `bag*sid=100029`],
            fun: [
                [
                    [">=", { dkey: "open_fun.id" },
                        function () {
                            return function_open["equip_red_forge"].id;
                        }
                    ], ["==", function () {
                        //是否满足锻造等级
                        let playerLevel = db.get("player.level");
                        if (playerLevel < equip_level_limit[i + 1].red_open_level) {
                            return 0;
                        }
                        //寻找红装
                        let equip;
                        let eq_1 = db.get(`friend_battle.equip_set.${i}`);
                        let eq_2 = db.get(`bag*id=${redId[i]}`).pop();
                        equip = eq_1.quality == 6 ? eq_1 : ((eq_2 && eq_2.quality == 6) ? eq_2 : null);

                        let bag_material,  //背包里的材料
                            level,
                            cost;

                        //如果有红装(升级)
                        if (equip) {
                            let next_level = equip_evolution[redId[i]][equip.level].next_level;
                            if (next_level == 0) {
                                return 0;
                            }
                            if (next_level > playerLevel) {
                                return 0;
                            }
                            cost = equip_evolution[redId[i]][next_level].cost;
                        } else {
                            //如果没有红装(锻造)
                            level = equip_level_limit[i + 1].red_open_level;
                            cost = equip_evolution[redId[i]][level].cost;
                        }
                        bag_material = db.get(`bag*sid=${cost[0]}`).pop();
                        if (bag_material && bag_material.count >= cost[1]) {
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `equip.red.${redId[i]}`,
            tipDetail: { "sid": 60058 } //暂定
        };
        list.push(forge_tip);
    }
};
equipRed();

/**
 * 装备模块----属性洗练
 */
const equipWash = function () {
    for (let i = 0, len = redId.length; i < len; i++) {
        let wash_tip = {
            depend: [`friend_battle.equip_set.${i}`, "player.level", "player.vip", "friend_battle.wash_times", "open_fun.id", `bag*sid=${equip_wash_cost.cost_prop_id}`, "player.money"],
            fun: [
                [
                    [">=", { dkey: "open_fun.id" },
                        function () {
                            return function_open["equip_red_wash"].id;
                        }
                    ], ["==", function () {
                        let equip;
                        let eq_1 = db.get(`friend_battle.equip_set.${i}`);
                        let eq_2 = db.get(`bag*id=${redId[i]}`).pop();
                        equip = eq_1.quality == 6 ? eq_1 : ((eq_2 && eq_2.quality == 6) ? eq_2 : null);
                        //如果是红装
                        if (equip) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }, 1],
                    ["==", function () {
                        let vip = db.get("player.vip");
                        let num = vip_advantage[vip].equip_wash_times;
                        let useNum = db.get("friend_battle.wash_times");
                        //是否免费
                        if (num > useNum) {
                            return 1;
                        }
                        //花费洗练次数
                        let costNum = useNum - num;
                        costNum = costNum < equip_wash_cost.prop_cost_num.length ? costNum : equip_wash_cost.prop_cost_num.length - 1;
                        let money = db.get("player.money");
                        let prop = db.get(`bag*sid=${equip_wash_cost.cost_prop_id}`).pop();
                        if (prop && prop.count >= equip_wash_cost.prop_cost_num[costNum] && money >= equip_wash_cost.cost_money[costNum]) {
                            return 1;
                        }
                        return 0;
                    }, 1]
                ]
            ],
            tipKey: `equip.wash.${redId[i]}`,
            tipDetail: { "sid": 60058 } //暂定
        };
        list.push(wash_tip);
    }
};
equipWash();
/**
 * 合并多个提示配置表
 */
TipFun.init(list);
list = null;