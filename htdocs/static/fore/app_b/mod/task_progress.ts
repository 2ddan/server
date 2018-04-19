import { get } from "app/mod/db";
import { Common } from "app/mod/common";
export class TaskProgress {
    //主角等级
    static getPlayerLevel(value) {
        let level = get("player.level") || 0;
        return [level >= value, level >= value ? value : level];
    };
    //技能总等级
    static allSkillLevel(value) {
        let skill = get("skill");
        if (!skill) {
            return [false, 0];
        }
        let num = 0;
        for (let i = 0, len = skill.length; i < len; i++) {
            num += skill[i][1];
        }
        return [num >= value, num >= value ? value : num];
    }
    //主角战斗力
    static getFightAbility(value) {
        let power = get("player.power") || 0;
        return [power >= value, power >= value ? value : power];
    };
    //主角vip等级
    static getPlayerVip(value) {
        let vip = get("player.vip") || 0;
        return [vip >= value, vip >= value ? value : vip];
    };
    //装备副本总星数
    static getEquipFbStar(value) {
        let totalStar = get("equip_fb.totalStar") || 0;
        return [totalStar >= value, totalStar >= value ? value : totalStar];
    }
    //九幽幻境总星数
    static getInstanceStar(value) {
        let total_star = get("instance_fb.total_star") || 0;
        return [total_star >= value, total_star >= value ? value : total_star];
    }
    //所有装备强化最低等级
    static minEquipStrongLevel(value) {
        let equip_level = get("friend_battle.equip_level") || 0;
        let min = Math.min.apply(null, equip_level);
        return [min >= value, min >= value ? value : min];
    }
    //所有装备强化总等级
    static allEquipStrongLevel(value) {
        let equip_level = get("friend_battle.equip_level");
        if(!equip_level) {
            return [false, 0];
        }
        let all = 0;
        for (let v of equip_level) {
            all += v;
        }
        return [all >= value, all >= value ? value : all];
    }
    //所有装备升星总星数
    static allEquipStar(value) {
        let equip_star = get("friend_battle.equip_star");
        if (equip_star) {
            return [false, 0];
        }
        let num = 0;
        for (let v of equip_star) {
            num += v
        }
        return [num >= value, num > value ? value : num];
    }
    //所有装备宝石总等级
    static allEquipDiam(value) {
        let equip_diam = get("friend_battle.equip_diam");
        if (!equip_diam) {
            return [false, 0];
        }
        let num = 0;
        for (let v of equip_diam) {
            for (let i of v) {
                if (i === 0) {
                    break;
                }
                num += i[1];
            }
        }
        return [num >= value, num >= value ? value : num];
    }
    //灵宠阶级
    static getPetLevel(value) {
        let arr = get("pet.pet_star_info") || [];
        if (arr.length === 0) {
            return [false, 0];
        }
        return [arr[0] > value, arr[0] >= value ? value : arr[0]];
    }
    //收集时装套数
    static getFashionNum(value) {
        let arr = get("cloth.own_clothes") || [];
        return [arr.length >= value, arr.length >= value ? value : arr.length];
    };
    //摇钱树总银两
    static moneytree(value) {
        let money = get("money_tree.total_money") || 0;
        return [money >= value, money >= value ? value : money];
    };
    //神兵共鸣阶数
    static treasureGM(value) {
        let treasure = get("magic.treasure");
        let level = 0;
        if (treasure && treasure.length > 0) {
            level = treasure[1];
        }
        return [level >= value, level >= value ? value : level];
    };
    //神兵八卦阶数
    static treasureBG(value) {
        let treasure = get("magic.treasure");
        let break_info = get("magic.break_info");
        let level = 0;
        if (treasure && treasure.length > 0 && break_info) {
            level = break_info[0];
        }
        return [level >= value, level >= value ? value : level];
    };
    //收集齐红装数量
    static forgeRedNum(value) {
        let num = get("friend_battle.god_equip_num") || 0;
        return [num >= value, num >= value ? value : num];
    };
    //集齐红装最低等级
    static reqEquipLevel (value) {
        let arr = get("friend_battle.red_collect") || [0];
        let minLevel = Math.min.apply(null, arr);
        return [minLevel >= value, minLevel >= value ? value : minLevel];
    }
    //红装洗练次数
    static reqEquipWash(value) {
        let num = get("friend_battle.total_wash_times") || 0;
        return [num >= value, num >= value ? value : num];
    };
    //激活阵法个数
    static activeGestNum(value) {
        let num = get("gest.active_gest_num") || 0;
        return [num >= value, num >= value ? value : num];
    }
    //九窍总等级
    static allSoulLevel(value) {
        let soul = get("soul.soul_info") || [];
        let num = 0;
        if (soul.length > 0) {
            for (let arr of soul) {
                arr.forEach(v => {
                    num += v[1];
                });
            }
        }
        return [num >= value, num >= value ? value : num];
    }
    //野外达到第几关
    static wildMission(value) {
        let mission = get("wild.wild_max_mission") || 0;
        return [mission >= value, mission >= value ? value : mission];
    }
}