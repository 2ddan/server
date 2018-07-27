/**
 * 此模块用于计算各功能属性
 * 
 */
import { Pi } from "app/mod/pi";
import { net_request, net_send } from "app_a/connect/main";
import { updata, get, listen, insert, data as db } from "app/mod/db";
import { Fight_formula } from "fight/a/common/fight_formula";
import { formula } from "fight/b/common/formula";
import { TaskProgress } from "app_b/mod/task_progress";

import { attribute } from "cfg/c/attribute";
import { instance_star } from "cfg/c/instance_star";
import { skill_level } from "cfg/b/skill_upgrade";
import { treasure_up } from "cfg/b/treasure_up";
import { treasure_break } from "cfg/b/treasure_break";
import { TreasurePhase } from "cfg/b/TreasurePhase";
import { treasure_buff } from "cfg/b/Treasure_buff";
import { equip_level_up } from "cfg/c/equip_level_up";
import { equip_diam_promote as diam_promote } from "cfg/c/equip_diam_promote";
import { equip_star_promote } from "cfg/c/equip_star_promote_fore";
import { StarAchievement } from "cfg/c/equip_star_achievement";
import { equip_star_achieve } from "cfg/c/equip_star_achieve";
import { equip_level_up_fixed } from "cfg/c/equip_level_up_fixed_fore";
// 玩家等级属性
import { player_exp } from "cfg/b/player_exp";
// 灵宠等级属性
import { pet_upgrade } from "cfg/b/pet_upgrade";
import { pet_buff } from "cfg/b/pet_buff";
// 龙魂属性
import { soul_level_up } from "cfg/c/soul_level_up";
import { soul_resonance } from "cfg/c/soul_resonance";
import { soul_seat } from "cfg/c/soul_seat";
import { soul_buff } from "cfg/c/soul_buff";
// 赋灵
import { weapon_soul_base } from "cfg/c/weapon_soul_base";
import { weapon_soul_grade } from "cfg/c/weapon_soul_grade";
import { guild_upgrade } from "cfg/c/guild_upgrade";
import { guild_skill } from "cfg/c/guild_skill";
// 符文系统
import { rune_state } from "cfg/c/rune_state";
import { rune_practice } from "cfg/c/rune_practice";
import { rune } from "cfg/c/rune";
import { rune_collect } from "cfg/c/rune_collect";
import { single_power_formula } from "cfg/b/single_power_formula";



insert("attr", {});
let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I","J", "K", "L"];
//阵法属性
let gest_attr = {};
//九幽幻境星图属性
let instance_attr = {};
//技能属性
let skill_attr = {};
//神兵属性
let treasure_attr = {
    "hexagram": {}, //八卦孔位属性
    "bg_break": {}, //八卦等级突破属性
    "attr_rate": 0, //八卦加成百分比
    "gossip": {}, //神兵八卦总属性
    "treasure_level": {}, //神兵阶级属性
    "all": {} //神兵总属性
};
//装备属性
let equip_attr = {
    "0": {
        "base": {}, //基础属性
        "add": {}, //附加属性
        "strong": {}, //强化属性
        "diam": {}, //宝石属性
        "star": {}, //升星属性
        "attr_rate": 0, //升星比例
        "equip": {} //此装备总属性
    },
    "1": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "2": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "3": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "4": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "5": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "6": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "7": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "8": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "9": { "base": {}, "add": {}, "strong": {}, "diam": {}, "star": {}, "attr_rate": 0, "equip": {} },
    "star_achieve": {}, //星宿阵图属性
    "equip_star": [],  //升星总星数加成
    "all": {} //装备系统总属性
};
//龙魂属性
let soul_attr = {
    //[0-8]各窍属性
    "0": {},
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "all_attr": {} //龙魂总属性
};
//灵宠属性
let pet_attr = {};
//时装属性
let cloth_attr = {};
//赋灵属性
let weapon_soul_attr = {
    "0": [], //元素1属性
    "1": [], //元素2属性
    "2": [], //元素3属性
    "3": [], //元素4属性
    "grade_attr": [], //赋灵突破属性
    "all_attr": {}  //赋灵系统总属性
};
//门派属性
let gang_attr = {
    //旗帜属性
    "flag_attr": [],
    //技能属性
    "skill_attr": [],
    //门派总属性
    "all_attr": {}
}
//符文模块
let rune_attr = {
    // 密集镶嵌
    "book_attr": [],
    // 修行
    "state_attr": [],
    // 筋脉
    "practice_attr": [],
    // 收集
    "collect_attr": [],
    // 符文总属性
    "all_attr": {}
}
/**
 * 装备模块属性  A
 */
export const equip = {
    //单装备基础属性 和 附加属性
    equipBaseAdd: function (index) {
        let attr_base = {};
        let attr_add = {};
        let equip_set = get(`friend_battle.equip_set.${index}`);
        if (equip_set) {
            let base_attr = equip_set.base_attr[0];
            attr_base[base_attr[0]] = base_attr[1];

            let addition_attr = equip_set.addition_attr;
            addition_attr.forEach((v) => {
                attr_add[v[0]] = attr_add[v[0]] ? (attr_add[v[0]] + v[1]) : v[1];
            })
        }
        equip_attr[index].base = attr_base;
        attr_base = null;
        equip_attr[index].add = attr_add;
        attr_add = null;
    },
    //单装备强化属性  [基础*强化比例+强化固定值]
    equipStrong: function (index) {
        
        let attr_obj = {};
        let eq_level = get(`friend_battle.equip_level.${index}`);
        if (eq_level > 0) {
            let base = get(`friend_battle.equip_set.${index}`).base_attr[0];
            let arr = equip_level_up[eq_level];
            let up_arr = equip_level_up_fixed[index + 1];
            let j = 0;
            for (let i = 0, len = up_arr.length; i < len; i++) {
                if (eq_level >= up_arr[i].level) {
                    j = i;
                }
            }
            let ep_level = eq_level;
            //attr_obj[base[0]] = Math.ceil(base[1] * arr[2]) + arr[3];
            attr_obj[base[0]] = myMathCeil(base[0], base[1] * arr[2]) + eval('('+ up_arr[j].val +')');
        }
        equip_attr[index].strong = attr_obj;
        attr_obj = null;
    },
    //单装备宝石属性
    equipDiam: function (index) {
        let attr_obj = {};
        let equip_diam = get(`friend_battle.equip_diam.${index}`);
        for (let v of equip_diam) {
            if (v && v[1] > 0) {
                let attr = diam_promote[v[0]][v[1]][1];
                attr_obj[attr[0]] = attr_obj[attr[0]] ? attr_obj[attr[0]] + attr[1] : attr[1];
            }
        }
        equip_attr[index].diam = attr_obj;
        attr_obj = null;
    },
    //单装备升星属性
    equipStar: function (index) {
        let attr_obj = {};
        let equip_star = get(`friend_battle.equip_star.${index}`);
        if (equip_star > 0) {
            let obj = equip_star_promote[index - 0 + 1][equip_star];
            equip_attr[index].attr_rate = obj.attr_ratio;
            Object.keys(obj.attr).forEach((k) => {
                attr_obj[k] = obj.attr[k] - 0;
            })
        }
        equip_attr[index].star = attr_obj;
        attr_obj = null;
    },
    //单装备总属性   [(基础+附加+强化+宝石+升星属性)*(升星比例+1)]
    singleEquip: function (index) {
        let arr = ["base", "add", "strong", "diam", "star"],
            attr_obj = {},
            obj = equip_attr[index];
        for (let v of arr) {
            Object.keys(obj[v]).forEach((k) => {
                attr_obj[k] = attr_obj[k] ? (attr_obj[k] + obj[v][k]) : obj[v][k];
            })
        }
        Object.keys(attr_obj).forEach((k) => {
            //attr_obj[k] = Math.ceil(attr_obj[k] * (1 + obj.attr_rate));
            attr_obj[k] = myMathCeil(k, attr_obj[k] * (1 + obj.attr_rate));
        })
        equip_attr[index].equip = attr_obj;
        attr_obj = null;
    },
    //星宿阵图属性
    equipSoulAchieve: function () {
        let soul_achieve = get("friend_battle.soul_achieve"),
            attr_obj = {};
        for (let arr of soul_achieve) {
            for (let i = 0, len = arr[1].length; i < len; i++) {
                if (arr[1][i] === 0) {
                    break;
                }
                let att = StarAchievement[arr[0]][(arr[0] - 1) * 5 + i + 1].attr;
                Object.keys(att).forEach((k) => {
                    attr_obj[k] = attr_obj[k] ? (attr_obj[k] + att[k]) : att[k];
                });
            }
        }
        equip_attr.star_achieve = attr_obj;
        attr_obj = null;
    },
    //装备升星总星数到达一定程度属性加成
    equipAllStar: function () {
        let key = Object.keys(equip_star_achieve);
        let arr = [];
        for (let k of key) {
            let obj = equip_star_achieve[k];
            let flag = TaskProgress.allEquipStar(obj.star)[0];
            if (flag) {
                arr = obj.attr;
            }
        }
        equip_attr.equip_star = arr;
        arr = null;
    },
    //装备模块总属性
    equipAttr: function () {
        let attr_obj = {};
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let index of arr) {
            let obj = equip_attr[index].equip;
            Object.keys(obj).forEach((k) => {
                attr_obj[k] = attr_obj[k] ? (attr_obj[k] + obj[k]) : obj[k];
            })
        }
        Object.keys(equip_attr.star_achieve).forEach((k) => {
            attr_obj[k] = attr_obj[k] ? (attr_obj[k] + equip_attr.star_achieve[k]) : equip_attr.star_achieve[k];
        });
        if (equip_attr.equip_star.length > 0) {
            equip_attr.equip_star.forEach((v) => {
                attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
            });
        }
        equip_attr.all = attr_obj;
        updata("attr.A", equip_attr.all);
        //updata("attr.A", equip_attr);
        attr_obj = null;
    }
};

/**
 * 神兵模块属性  B
 */
export const treasure = {
    //八卦孔位等级属性
    hexagramAttr: function () {
        let attr_obj = {};
        let hexagram_level = get("magic.hexagram_level");
        for (let i = 0, len = hexagram_level.length; i < len; i++) {
            if (hexagram_level[i] == 0) {
                break;
            }
            let attr = treasure_up[i + 1][hexagram_level[i]].attr;
            attr_obj[attr[0]] = attr_obj[attr[0]] ? (attr_obj[attr[0]] + attr[1]) : attr[1];
        }
        treasure_attr.hexagram = attr_obj;
        attr_obj = null;
    },
    //八卦等级突破属性
    bgBreakAttr: function () {
        let attr_obj = {};
        //当神兵为激活时,不计算
        let treasure = get("magic.treasure");
        if (treasure.length == 0) {
            treasure_attr.bg_break = attr_obj;
            attr_obj = null;
            return;
        }
        let break_info = get("magic.break_info");
        if (break_info[0] > 0) {
            let obj = treasure_break[break_info[0]];
            let attr = obj.attr;
            //获取加成比例
            treasure_attr.attr_rate = obj.attr_rate;
            for (let v of attr) {
                attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
            }
        }        
        treasure_attr.bg_break = attr_obj;
        attr_obj = null;
    },
    //神兵八卦总属性
    gossip: function () {
        let attr_obj = {};
        Object.keys(treasure_attr.hexagram).forEach((k) => {
            attr_obj[k] = treasure_attr.hexagram[k];
        });
        Object.keys(treasure_attr.bg_break).forEach((k) => {
            attr_obj[k] = attr_obj[k] ? (attr_obj[k] + treasure_attr.bg_break[k]) : treasure_attr.bg_break[k];
        });
        Object.keys(attr_obj).forEach((k) => {
            //attr_obj[k] = Math.ceil(attr_obj[k] * (1 + treasure_attr.attr_rate));
            attr_obj[k] = myMathCeil(k, attr_obj[k] * (1 + treasure_attr.attr_rate));
        });
        treasure_attr.gossip = attr_obj;
        attr_obj = null;
    },
    //神兵共鸣等级属性
    treasureLevel: function () {
        let attr_obj = {};
        let treasure = get("magic.treasure");
        //神兵已激活
        if (treasure.length > 0) {
            let attr_add = TreasurePhase[treasure[0]][treasure[1]].attr_add;
            Object.keys(attr_add).forEach((k) => {
                attr_obj[k] = attr_obj[k] ? (attr_obj[k] + attr_add[k]) : attr_add[k];
            })
        }
        treasure_attr.treasure_level = attr_obj;
        attr_obj = null;
    },
    //计算神兵总属性
    treasureAll: function () {
        let attr_obj = {};
        Object.keys(treasure_attr.gossip).forEach((k) => {
            attr_obj[k] = treasure_attr.gossip[k];
        });
        Object.keys(treasure_attr.treasure_level).forEach((k) => {
            attr_obj[k] = attr_obj[k] ? (attr_obj[k] + treasure_attr.treasure_level[k]) : treasure_attr.treasure_level[k];
        });
        let break_info = get("magic.break_info");
        // 神兵突破 buff 计算
        let index = -1; 
        for (let i = 0, len = treasure_buff.length; i < len; i++) {
            if (break_info[0] >= treasure_buff[i].break_level) {
                index = i;
            }
        }
        if (index >= 0) {
            let buff = treasure_buff[index].buff_value;
            attr_obj[buff[0]] = attr_obj[buff[0]] ? attr_obj[buff[0]] + buff[1] : buff[1];
        }
        treasure_attr.all = attr_obj;
        attr_obj = null;
        updata("attr.B", treasure_attr.all);
    }
};

/**
 * 阵法模块属性  C
 */
export const gestAttr = function () {
    let attr_obj = get("gest.gest_attr");
    gest_attr = Object.assign({}, attr_obj);
    updata("attr.C", gest_attr);
};

/**
 * 龙魂模块属性 D
 */
export const soul = {
    //单个精元属性
    singleSoulAttr: function (index) {
        let level = get("player.level");
        if (level < soul_seat[index].open_level) {
            return;
        }
        let attr_obj = {};
        let arr = get(`soul.soul_info.${index}`);
        let minLevel = arr[0][1]; //精元最低等级
        for (let v of arr) {
            minLevel = minLevel > v[1] ? v[1] : minLevel;
            if (v[1] != 0) {
                let attr = soul_level_up[v[0]][v[1]].attr;
                attr_obj[attr[0]] = attr_obj[attr[0]] ? (attr_obj[attr[0]] + attr[1]) : attr[1];
            }
        }
        //计算共鸣属性
        if (minLevel > 0) {
            let gm_attr = soul_resonance[index + 1][minLevel];
            gm_attr.forEach((v) => {
                attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
            })
        }
        soul_attr[index] = attr_obj;
        attr_obj = null;
    },
    //计算龙魂模块总属性
    soulAllAttr: function () {
        let attr_obj = {};
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        arr.forEach((v) => {
            let obj = soul_attr[v];
            Object.keys(obj).forEach((k) => {
                attr_obj[k] = attr_obj[k] ? (attr_obj[k] + obj[k]) : obj[k];
            });
        });
        // 计算龙魂buff
        let num = get("soul.num") || 0;
        let index = -1;
        for (let i = 0, len = soul_buff.length; i < len; i++) {
            if (num >= soul_buff[i].num) {
                index = i;
            }
        }
        if (index >= 0) {
            let buff = soul_buff[index].buff_value;
            attr_obj[buff[0]] = buff[1];
        }
        soul_attr.all_attr = attr_obj;
        updata("attr.D", soul_attr.all_attr);
        attr_obj = null;
    }
};

/**
 * 技能升级模块属性  E
 */
export const skillAttr = function () {
    let attr_obj = {};
    let arr = get("skill");
    for (let v of arr) {
        if (v[1] >= 1) {
            let sk = skill_level[v[0]][v[1]];
            if (attr_obj[sk.add_power_attr]) {
                attr_obj[sk.add_power_attr] = attr_obj[sk.add_power_attr] + sk.attr_value;
            } else {
                attr_obj[sk.add_power_attr] = sk.attr_value;
            }
        }
    }
    skill_attr = attr_obj;
    updata("attr.E", skill_attr);
    attr_obj = null;
};

/**
 * 九幽幻境模块属性  F
 */
export const instanceAttr = function () {
    let attr_obj = {};
    let arr = get("instance_fb.tactical_record");
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === 0) {
            break;
        }
        let attr = instance_star[i + 1][arr[i]].attr;
        if (attr_obj[attr[0]]) {
            attr_obj[attr[0]] = attr_obj[attr[0]] + attr[1];
        } else {
            attr_obj[attr[0]] = attr[1];
        }
    }
    instance_attr = attr_obj;
    updata("attr.F", instance_attr);
    attr_obj = null;
}

/**
 * 人物等级属性 G
 */
export const roleLevel = {
    selfAttr: function (level) {
        let attr_obj = {};
        let arr = player_exp[level].attr;
        arr.forEach((v) => {
            attr_obj[v[0]] = v[1];
        });
        updata("attr.G", attr_obj);
    }
};

/**
 * 灵宠属性 H
 */
export const pet = {
    petAttr: function () {
        let attr_obj = {};
        //灵宠皮肤激活属性
        let own_skin = get("pet.own_skin");
        if (own_skin && own_skin.length > 0) {
            for (let k of own_skin) {
                let arr = Pi.sample[k].attr;
                arr.forEach((v) => {
                    attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
                })
            }
        }
        //灵宠阶级属性
        let pet_info = get("pet.pet_star_info");
        if (pet_info && pet_info.length > 0) {
            let arr = pet_upgrade[pet_info[0]][pet_info[1]].attr;
            arr.forEach((v) => {
                attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
            });
        }
        // buff 属性
        let index = -1;
        for (let i = 0, len = pet_buff.length; i < len; i++) {
            if (pet_info[0] >= pet_buff[i].grade) {
                index = i;
            }
        }
        if (index >= 0) {
            let buff = pet_buff[index].buff_value;
            attr_obj[buff[0]] = buff[1];
        }

        pet_attr = attr_obj;
        updata("attr.H", pet_attr);
        attr_obj = null;
    }
};

/**
 * 时装属性 I
 */
export const cloth = {
    clothAttr: function () {
        let attr_obj = {};
        let own_clothes = get("cloth.own_clothes");
        if (own_clothes && own_clothes.length > 0) {
            for (let k of own_clothes) {
                let arr = Pi.sample[k].attr;
                arr.forEach((v) => {
                    attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
                })
            }
        }
        cloth_attr = attr_obj;
        updata("attr.I", cloth_attr);
        attr_obj = null;
    }
}

/**
 * 赋灵系统属性计算  J
 */
export const weapon_soul = {
    //单个赋灵元素等级属性
    singleEleAttr: function (index) {
        let grade = get("weapon_soul.class");
        let level = get(`weapon_soul.level_record.${index}`);
        let arr = weapon_soul_grade[grade][index + 1][level].attr;
        weapon_soul_attr[index] = arr;
        arr = null;
    },
    //突破阶段属性
    gradeAttr: function () {
        let grade = get("weapon_soul.class");
        let arr = weapon_soul_base[grade].attr.slice(0);
        //计算buff属性
        if (grade > 0) {
            arr.push(weapon_soul_base[grade].buff_value);
        }
        weapon_soul_attr["grade_attr"] = arr;
        arr = null;
    },
    //赋灵总属性
    allAttr: function () {
        let attr_obj = {};
        let arr = [];
        arr = [...weapon_soul_attr[0],...weapon_soul_attr[1],...weapon_soul_attr[2],...weapon_soul_attr[3],...weapon_soul_attr["grade_attr"]];
        if (arr.length == 0) {
            attr_obj = null;
            updata("attr.J", {});
            return;
        }
        arr.forEach((v) => {
            attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
        })
        weapon_soul_attr.all_attr = attr_obj;
        updata("attr.J", weapon_soul_attr.all_attr);
        attr_obj = null;
        arr = null;
    }
}

/**
 * 门派属性 [旗帜 + 门派技能] K
 */
export const gang = {
    //旗帜属性
    flagAttr: function () {
        let arr = [];
        let level = get("gang.data.gang_level") || 0;
        if (level > 0) {
            arr.push(guild_upgrade[level].attr);
        }
        gang_attr["flag_attr"] = arr;
        arr = null;
    },
    //门派技能
    gangSkill: function () {
        let arr = [];
        let all_skill = get("gang.data.role_gang_skill") || [];
        if (all_skill.length > 0) {
            all_skill.forEach((lv, i) => {
                // arr.push(guild_skill[i + 1][lv].attr);
                arr = [...arr, ...guild_skill[i + 1][lv].attr];
            })
        }
        gang_attr["skill_attr"] = arr;
        arr = null;
    },
    //门派总属性
    allAttr: function () {
        let attr_obj = {};
        let arr = [...gang_attr["flag_attr"], ...gang_attr["skill_attr"]];
        if (arr.length > 0) {
            arr.forEach((v) => {
                attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
            })
        }
        gang_attr["all_attr"] = attr_obj;
        updata("attr.K", gang_attr["all_attr"]);
        attr_obj = null
    }
}

/**
 * 符文系统 L
 */
export const runeModule = {
    // 秘籍镶嵌属性 + buff
    runeBook: function () {
        let arr = [];
        let rune_set = get("rune.rune_set") || [];
        rune_set.forEach((v, i) => {
            if (v) {
                let book = rune[i + 1];
                let obj = book[0].prop_id == v ? book[0] : book[1];
                if (obj.attr[0] !== "undefined") {
                    arr.push(obj.attr);
                }
                if (obj.buff_id) {
                    arr.push(obj.buff_value);
                }
            }
        });
        rune_attr["book_attr"] = arr;
        arr = null;
    },
    // 修行属性 + buff
    runeState: function () {
        let arr = [];
        let s = get("rune.rune_state");
        if (!s) {
            return;
        }
        let obj = rune_state[s[0]][s[1]];
        // buff
        if (obj.buff_value) {
            arr.push(obj.buff_value);
        }

        if (obj.attr) {   
            arr = [...arr, ...obj.attr];
        }

        rune_attr["state_attr"] = arr;
        arr = null;
    },
    // 筋脉属性
    runePractice: function () {
        let p = get("rune.rune_practice");
        if (!p) {
            return;
        }
        let obj = rune_practice[p[0]][p[1]];
        if (obj.attr) {
            rune_attr["practice_attr"] = obj.attr;
        }
    },
    // 搜集秘籍数量
    runeCollect: function () {
        let num = 0;
        let rune_set = get("rune.rune_set") || [];
        rune_set.forEach((v) => {
            if (v) {
                num++
            }
        });
        let bag = get("bag") || [];
        bag.forEach(v => {
            if (v && v.type == "rune") {
                num++;
            }
        });
        let index = -1;
        rune_collect.forEach((v, i) => {
            if (num >= v.num) {
                index = i;
            }
        });
        if (index >= 0) {
            rune_attr.collect_attr = rune_collect[index].attr;
        }
    },
    // 符文总属性
    runeAllAttr: function () {
        let attr_obj = {};
        let arr = [...rune_attr["book_attr"], ...rune_attr["state_attr"], ...rune_attr["practice_attr"], ...rune_attr["collect_attr"]];
        if (arr.length == 0) {
            attr_obj = null;
            updata("attr.L", {});
            return;
        }
        arr.forEach((v) => {
            attr_obj[v[0]] = attr_obj[v[0]] ? (attr_obj[v[0]] + v[1]) : v[1];
        });
        rune_attr.all_attr = attr_obj;
        updata("attr.L", rune_attr.all_attr);
        attr_obj = null;
        arr = null;
    }
}

export const countFightPower = {
    /**
     * 计算战斗力
     * @param moduelAttr 各模块属性
     * @param formula 计算公式
     */
    singleAttrTotal: function (moduelAttr, formula) {
        let power = 0;
        let obj: any = { "attr": {}, "power": 0 };
        //需要取整的属性名
        if (moduelAttr && moduelAttr.A && moduelAttr.B && moduelAttr.C && moduelAttr.D && moduelAttr.E && moduelAttr.F && moduelAttr.G && moduelAttr.H && moduelAttr.I && moduelAttr.J && moduelAttr.K && moduelAttr.L) {
            for (let i in attribute) {
                if ((i + '').indexOf("per_") > -1) continue;
                let attr = countFightPower.singleAttr(i, moduelAttr, formula);
                if (attr) {
                    attr = myMathCeil(i, attr);
                    let val = attr - attribute[i].init_value;
                    power += (val > 0 ? val : 0) * attribute[i].prower_ratio;
                    // 过滤skill_level_attr
                    if ((i + '').indexOf("skill_") < 0) obj.attr[i] = attr;
                }

            }
            if (power) {
                let damage_multiple = obj.attr.damage_multiple || 0;
                let un_damage_multiple = obj.attr.un_damage_multiple || 0;
                let pvp_damage_multiple = obj.attr.pvp_damage_multiple || 0;
                let pvp_un_damage_multiple = obj.attr.pvp_un_damage_multiple || 0;
                let buff_attr = obj.attr.buff_attr || 0;
                let f = single_power_formula;
                power = power * eval('(' + f + ')');
                power = Math.floor(power);
                obj.power = power;
            }
            updata("player.power", obj.power);
            updata("player.allAttr", obj.attr);
        }
    },
    /**
     * 计算所有模块单个属性总和
     * @param key 要计算的属性名
     * @param moduelAttr 各模块属性
     * @param formula 计算公式
     */
    singleAttr: function (key, moduelAttr, formula) {
        for (var k in arr) {
            for (let i in attribute) {
                if (!formula[i + "Count"]) {
                    continue;
                }
                if (!moduelAttr[arr[k]]) {
                    moduelAttr[arr[k]] = {};
                }
                if (!moduelAttr[arr[k]][i]) moduelAttr[arr[k]][i] = 0;
            }
        }
        if (formula[key + "Count"]) {
            return Fight_formula.effectCalc(key + "Count", moduelAttr);
        } else {
            return 0;
        }
    }
}

let locPower = 0;
listen("player.power", function () {
    locPower = db.player.power;
})
/**
 * 监听数据库listen队列跑完，每次跑完都会跑
 */
listen("$listenerOver", function () {
    if (locPower) {
        net_send({
            "param": { "power": locPower },
            "type": "app/role@refresh_power"
        });
        locPower = 0;
    }
});


let notCeilKey = ['damage_multiple', 'un_damage_multiple', 'criticalDamage', 'pvp_damage_multiple', 'pvp_un_damage_multiple', 'buff_attr'];
const myMathCeil = function (key, num) {
    return (notCeilKey.indexOf(key) >= 0) ? num : Math.ceil(num);
}



