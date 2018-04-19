import { data as localDB, get } from "app/mod/db";
import { Pi } from "app/mod/pi";
import { gest_attribute } from "cfg/c/gest_attribute";
import { TaskProgress } from "app_b/mod/task_progress";

export class act_progress {
    /**
     * 查询一段时间内某活跃(key)的总数是否达到定值(value)
     * @param key 要查询的数据
     * @param start 开始天
     * @param end 结束天
     * @param value 进度需要达到的值
     */
    static sum(key, start, end, value) {
        let _item = localDB.data_record[key], num = 0;
        if (key && !_item)
            return [false, 0];
        let d = concatDay(concatDay(_item, start, end), 0);
        for (let i = 0, len = d.length; i < len; i++) {
            num += d[i];
        }
        return [num >= value, num >= value ? value : num];
    };
    /**
     * 查询一段时间内某活跃(key)达到定值(value)的次数是否达到(c)
     * @param key 要查询的数据
     * @param start 开始天
     * @param end 结束天
     * @param value 进度需要达到的值
     * @param c 后台读取领奖的次数
     */
    static has(key, start, end, value, c) {
        let _item = localDB.data_record[key];
        if (key && !_item)
            return [false, 0];
        let d = concatDay(concatDay(_item, start, end), 0);
        let count = 0, flag = false;
        for (let i = 0; i < d.length; i++) {
            if (d[i] == value)
                count++;
        }
        if (count > c) flag = true;
        return [flag,count];
    };
    /**
     * 查询一段时间内某活跃(key)次数是否达到(value)
     * @param key 要查询的数据
     * @param start 开始天
     * @param end 结束天
     * @param value 进度需要达到的值
     */
    static count(key, start, end, value) {
        let _item = localDB.data_record ? localDB.data_record[key] : null;
        if (key && !_item)
            return [0, 0];
        let d = concatDay(concatDay(_item, start, end), 0);
        if (!d) return [0, 0];
        if (d.length >= value)
            return [true, d.length];
        else return [false, d.length];
    };
    /**
     * 查询一段时间所有物品(value)收集达指定数量
     * @param key 要查询的数据
     * @param start 开始天
     * @param end 结束天
     * @param value [['400003',10],['400003',10],['400003',10]]
     */
    static prop(key, start, end, value) {
        let bag = localDB.bag;
        let c = 0;
        for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < bag.length; j++) {
                if (bag[j] && bag[j].sid == value[i][0] && bag[j].count >= value[i][1]) {
                    c++;
                    continue;
                }
            }
        }
        if (c == value.length)
            return [true];
        else
            return [false];
    };
    static diamond(key, start, end, value) {
        return [localDB.player.diamond >= value, localDB.player.diamond];
    };
    static money(key, start, end, value) {
        return [localDB.player.money >= value, localDB.player.money];
    };
    static level(key, start, end, value) {
        return [localDB.player.level >= value, localDB.player.level];
    };
    /**
     * 根据7日活动挑战任务类型查询进度
     * @param type 任务类型
     * @param params 领奖参数
     */
    static sevenday = (type, params) => {
        //任务等级
        if (type == "level") {
            let level = get("player.level") || 1;
            return [level >= params, level >= params ? params : level];
        }
        //登录天数
        else if (type === "login") {
            let num = get("sevendays.loginDay") || 1;
            return [num >= params, num >= params ? params : num];
        }
        //战斗力
        else if (type === "player_power") {
            let power = get("player.power");
            return [power >= params, power >= params ? params : power];
        }
        //累计充值
        else if (type === "recharge_total") {
            let arr = get("data_record.recharge");
            let recharge = 0;
            if (!arr) {
                return [recharge >= params, recharge >= params ? params : recharge];
            }
            for (let v of arr) {
                for (let i of v) {
                    recharge += i[0];
                }
            }
            return [recharge >= params, recharge >= params ? params : recharge];
        }
        //击杀野外boss
        else if (type === "wild_boss") {
            let num = get("wild.kill_boss_num") || 0;
            return [num >= params, num >= params ? params : num];
        }
        //装备副本总星数
        else if (type === "equipFB_star") {
            let star = get("equip_fb.totalStar") || 0;
            return [star >= params, star >= params ? params : star];
        }
        //野外寻宝
        else if (type === "explore_box") {
            let num = get("random_boss.open_box_num") || 0;
            return [num >= params, num >= params ? params : num];
        }
        //九幽幻境总星数
        else if (type === "instance_star") {
            let total_star = get("instance_fb.total_star") || 0;
            return [total_star >= params, total_star >= params ? params : total_star];
        }
        //除魔卫道总输出
        else if (type === "rebel_damage") {
            let arr = get("data_record.rebel");
            let damage = 0;
            if (!arr) {
                return [damage >= params, damage >= params ? params : damage];
            }
            for (let v of arr) {
                for (let i of v) {
                    damage += i[0];
                }
            }
            return [damage >= params, damage >= params ? params : damage];
        }
        //竞技场排名
        else if (type === "jjc_rank") {
            let rank = get("arena.role_jjc_rank") || 4999;
            return [rank <= params, rank <= params ? params : rank];
        }
        //天庭秘境层数
        else if (type === "tower") {
            let floor = get("tower.floor_point") || 0;
            return [floor >= params, floor >= params ? params : floor];
        }
        //装备强化总等级
        else if (type == "equip_level") {
            // TaskProgress.allEquipStrongLevel(params);
            let arr = get("friend_battle.equip_level");
            let totalLevel = 0;
            if (!arr) {
                return [totalLevel >= params, totalLevel >= params ? params : totalLevel];
            }
            totalLevel = arr.reduce(function(a, b){
                return a + b;
            },0);
           return [totalLevel >= params, totalLevel >= params ? params : totalLevel]; 
        }
        //装备星级总等级
        else if (type == "equip_star") {
            let arr = get("friend_battle.equip_star");
            let totalLevel = 0;
            if (!arr) {
                return [totalLevel >= params, totalLevel >= params ? params : totalLevel];
            }
            totalLevel = arr.reduce(function(a, b){
                return a + b;
            },0);
           return [totalLevel >= params, totalLevel >= params ? params : totalLevel]; 
        }
        //装备星级最高等级
        else if (type == "equip_star_max") {
            let arr = get("soul.soul_info");
            let level = 0;
            if (!arr) {
                return [false, level >= params ? params : level];
            }
            for (let v of arr) {
                if (v[0] === 0) {
                    continue;
                }
                for (let i of v) {
                    if (i === 0) {
                        break;
                    }
                    if(v[1] > level){
                        level = v[1];
                    }
                    
                }
            }
            return [level >= params, level >= params ? params : level];
        }   
        //装备宝石总等级
        else if (type == "equip_diamond") {
            let arr = get("friend_battle.equip_diam");
            let totalLevel = 0;
            if (!arr) {
                return [totalLevel >= params, totalLevel >= params ? params : totalLevel];
            }
            for (let v of arr) {
                if (v[0] === 0) {
                    continue;
                }
                for (let i of v) {
                    if (i === 0) {
                        break;
                    }
                    totalLevel += i[1];
                }
            }
            return [totalLevel >= params, totalLevel >= params ? params : totalLevel]; 
        }
        //单颗宝石最高等级
        else if (type == "equip_diamond_level") {
            let arr = get("friend_battle.equip_diam");
            let level = 0;
            if (!arr) {
                return [false, level >= params ? params : level];
            }
            for (let v of arr) {
                if (v[0] === 0) {
                    continue;
                }
                for (let i of v) {
                    if (i === 0) {
                        break;
                    }
                    if(v[1] > level){
                        level = v[1];
                    }
                    
                }
            }
            return [level >= params, level >= params ? params : level];
        }
        //九窍总等级
        else if (type === "soul") {
            let arr = get("soul.soul_info");
            let totalLevel = 0;
            if (!arr) {
                return [totalLevel >= params, totalLevel >= params ? params : totalLevel];
            }
            for (let v of arr) {
                totalLevel += v.reduce(function(a, b){
                    return a + b[1];
                }, 0)
            }
            return [totalLevel >= params, totalLevel >= params ? params : totalLevel];
        }    
         //九窍最高等级
         else if (type == "soul_max") {
            let arr = get("soul.soul_info");
            let level = 0;
            if (!arr) {
                return [false, level >= params ? params : level];
            }
            for (let v of arr) {
                if (v[0] === 0) {
                    continue;
                }
                for (let i of v) {
                    if (i === 0) {
                        break;
                    }
                    if(v[1] > level){
                        level = v[1];
                    }
                    
                }
            }
            return [level >= params, level >= params ? params : level];
        }   
        //神兵铸魂达到X阶
        else if (type === "treasureBG") {
            let level = get("magic.break_info.0") || 0;
            return [level >= params, level >= params ? params : level];
        }
        //神兵共鸣达到X阶
        else if (type === "treasure_level") {
            let level = get("magic.treasure.1") || 0;
            return [level >= params, level >= params ? params : level];
        }
        //激活政法个数
        else if (type === "gest") {
            let arr = get("gest.gest_info");
            let num = 0;
            if (!arr) {
                return [num >= params, num >= params ? params : num];
            }
            for (let i of arr) {
                if (i[1] >= 0) {
                    num++;
                }
            }
            return [num >= params, num >= params ? params : num];
        }
        //激活包含橙色心法的阵法
        else if (type === "orange_gest") {
            let arr = get("gest.gest_info");
            let num = 0;
            if (!arr) {
                return [num >= params, num >= params ? params : num];
            }
            for (let i of arr) {
                if (gest_attribute[i[0]].quality >= 5 && i[1]>=0) {
                    num++;
                }
            }
            return [num >= params, num >= params ? params : num];
        }
        //激活包含红色心法的阵法
        else if (type === "red_gest") {
            let arr = get("gest.gest_info");
            let num = 0;
            if (!arr) {
                return [num >= params, num >= params ? params : num];
            }
            for (let i of arr) {
                if (gest_attribute[i[0]].quality >= 6 && i[1]>=0) {
                    num++;
                }
            }
            return [num >= params, num >= params ? params : num];
        }
        //身上橙装件数
        else if (type.indexOf("wearEquip")>-1) {
            let condition = type.split("_").slice(1);
            let arr = get("friend_battle.equip_set");
            let num = 0;
            if (!arr) {
                return [num >= params, num >= params ? params : num];
            }
            for (let v of arr) {
                if (v.quality >= condition[0] && v.level >= condition[1]) {
                    num++;
                }
            }
            return [num >= params, num >= params ? params : num];
        }
    }

}

const concatDay = (_list, start, end?) => {
    let result = [];
    if (start > _list.length - 1) return [];
    if (start < 0) start = 0;
    if ((!end && end !== 0) || end > _list.length - 1) end = _list.length - 1;
    for (let i = start; i <= end; i++) {
        if (!_list[i]) continue;
        if (_list[i]) result = result.concat(_list[i]);
    }
    return result;
};

