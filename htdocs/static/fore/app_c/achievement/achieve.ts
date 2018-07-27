/**
 * 模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Common } from "app/mod/common";
import { updata, get as getDB, insert, listen, data as db } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { TaskProgress } from "app_b/mod/task_progress";
import { function_open } from "cfg/b/function_open";

/**
 * 配置
 */
import { achieve_cfg } from "cfg/c/achieve_cfg";

insert("achieve", {
    "record": '',
    "red_tip": new Array(Object.keys(achieve_cfg).length).fill(0)
});

/**
 * 入口
 */
export const globalReceive = {

}

let achieve_data: any = {
    "Pi": Pi,
    "function_open": function_open,
    "fun_id": getDB("open_fun.id") || 0
};
/**
 * 页面数据更新
 */
export const getData = function () {
    //成就配置表信息
    //achieve_data.achieve_cfg = achieve_cfg;
    achieve_data.task = logic.getTask;
    achieve_data.fun_id = getDB("open_fun.id") || 0;
    return achieve_data;
}

/**
 * 读取后台数据
 */
listenBack("app/prop/achievement@read", (data) => {
    updata("achieve.record", data.record);
    forelet.paint(getData());
})

/**
 * 创建forelet
 */
export const forelet = new Forelet();

/**
 * 前台点击
 */
export class Achieve extends Widget {
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    }
    //任务
    openTask(obj) {
        logic.openTask(obj);
    }
}

/**
 * 逻辑处理
 */
const logic = {
    //获取当前应做的成就任务
    getTask() {
        let task = [],
            record = getDB("achieve.record");
        if (!record) {
            return task;
        }
        let keyArr = Object.keys(record);
        keyArr.forEach((k) => {
            if (achieve_cfg[k] && achieve_cfg[k][record[k]]) {
                let obj = achieve_cfg[k][record[k]];
                let arr = TaskProgress[obj.func](obj.params);
                if (arr[0]) {
                    task.unshift({
                        "task": obj,
                        "value": arr  //[true/false, number]
                    });
                } else {
                    task.push({
                        "task": obj,
                        "value": arr
                    });
                }
            }
        })
        return task;
    },
    //[领取 || 前往]
    openTask(obj) {
        if (obj.value[0]) {
            //领奖
            award(obj.task);
        } else {
            if(obj.task.goto == "undefined"){
                return;
            }
            let goto = obj.task.goto.split(",");
            //前往
            globalSend(goto[0],goto[1]?goto[1]:null);
        }
    }
}

/**
 * 后台通讯
 */

/**
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const achieveNet = function (param) {
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
 * 任务完成, 领取奖励
 * @param obj [任务]
 */
export const award = function (obj) {
    let arg = {
        "param": { "award_id": obj.sid - 0 },
        "type": "app/prop/achievement@get"
    };
    achieveNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            //保持奖励
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            //更新任务列表
            let num = getDB(`achieve.record.${obj.type}`) - 0 + 1;
            updata(`achieve.record.${obj.type}`, num);
            forelet.paint(getData());
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                "words": data.why
            });
            console.log(data);
        })
};

/**
 * 监听任务完成情况刷新页面
 */
//玩家等级
let origin_level = 0;
let record_level = 0;
listen("player.level,achieve.record.level", () => {
    let level = db.player.level;
    let num = getDB("achieve.record.level");
    if (level <= origin_level && record_level == num) {
        return;
    }
    origin_level = level;
    record_level = num;
    if (num >= 0 && achieve_cfg["level"][num]) {
        let obj = achieve_cfg["level"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.0", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.0", 0);     
    }
});
//技能最低等级
let min_skill_level = 0;
listen("skill,achieve.record.all_skill_level", () => {
    let num = db.achieve.record.all_skill_level;
    if (num >= 0 && achieve_cfg["all_skill_level"][num]) {
        let obj = achieve_cfg["all_skill_level"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.1", arr[0] ? 1 : 0);
        if (arr[1] > min_skill_level) {
            forelet.paint(getData());
        }
    } else {
        updata("achieve.red_tip.1", 0);
    }
});
//玩家战斗力
listen("player.power,achieve.record.fightAbility", () => {
    let num = db.achieve.record.fightAbility;
    if (num >= 0 && achieve_cfg["fightAbility"][num]) {
        let obj = achieve_cfg["fightAbility"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.2", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.2", 0);    
    }
});
//玩家vip
let origin_vip = 0;
let record_vip = 0;
listen("player.vip,achieve.record.vip", () => {
    let vip = db.player.vip;
    let num = getDB("achieve.record.vip");
    if (vip <= origin_vip && record_vip == num) {
        return;
    }
    origin_vip = vip;
    record_vip = num;
    if (num >= 0 && achieve_cfg["vip"][num]) {
        let obj = achieve_cfg["vip"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.3", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.3", 0);  
    }
});
//装备副本总星数
listen("equip_fb.totalStar,achieve.record.equipFB_star", () => {
    if (achieve_data.fun_id < function_open["equip_fb"].id) {
        return;
    }
    let num = db.achieve.record ? db.achieve.record.equipFB_star : -1;
    if (num >= 0 && achieve_cfg["equipFB_star"][num]) {
        let obj = achieve_cfg["equipFB_star"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.4", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.4", 0);  
    }
});
//九幽副本总星数
listen("instance_fb.total_star,achieve.record.instance_star", () => {
    if (achieve_data.fun_id < function_open["instance_fb"].id) {
        return;
    }
    let num = db.achieve.record.instance_star;
    if (num >= 0 && achieve_cfg["instance_star"][num]) {
        let obj = achieve_cfg["instance_star"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.5", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.5", 0);  
    }
});
//所有装备最小强化等级
listen("friend_battle.equip_level,achieve.record.all_equipment_lv", () => {
    if (achieve_data.fun_id < function_open["equip_level"].id) {
        return;
    }
    let num = db.achieve.record.all_equipment_lv;
    if (num >= 0 && achieve_cfg["all_equipment_lv"][num]) {
        let obj = achieve_cfg["all_equipment_lv"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.6", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.6", 0); 
    }
});
//所有装备升星总星数
listen("friend_battle.equip_star,achieve.record.all_equipment_star", () => {
    if (achieve_data.fun_id < function_open["equip_star"].id) {
        return;
    }
    let num = db.achieve.record.all_equipment_star;
    if (num >= 0 && achieve_cfg["all_equipment_star"][num]) {
        let obj = achieve_cfg["all_equipment_star"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.7", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.7", 0);
    }
});
//所有装备宝石总等级
listen("friend_battle.equip_diam,achieve.record.all_equipment_diamond", () => {
    if (achieve_data.fun_id < function_open["equip_gem"].id) {
        return;
    }
    let num = db.achieve.record.all_equipment_diamond;
    if (num >= 0 && achieve_cfg["all_equipment_diamond"][num]) {
        let obj = achieve_cfg["all_equipment_diamond"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.8", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.8", 0);
    }
});
//灵宠阶级
let pet_origin = 0;
let record_pet = 0;
listen("pet.pet_star_info.0,achieve.record.pet", () => {
    if (achieve_data.fun_id < function_open["pet"].id) {
        return;
    }
    let num = db.achieve.record.pet;
    let level = db.pet.pet_star_info[0];
    if (level && level == pet_origin && record_pet == num) {
        return
    }
    pet_origin = level;
    record_pet = num;
    if (num >= 0 && achieve_cfg["pet"][num]) {
        let obj = achieve_cfg["pet"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.9", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.9", 0);
    }
});
//时装数量
listen("cloth.own_clothes,achieve.record.fashion", () => {
    // if (achieve_data.fun_id < function_open["cloth"].id) {
    //     return;
    // }
    let num = db.achieve.record.fashion;
    if (num >= 0 && achieve_cfg["fashion"][num]) {
        let obj = achieve_cfg["fashion"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.10", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.10", 0);
    }
});
//摇钱树累计银两
listen("money_tree.total_money,achieve.record.moneytree", () => {
    if (achieve_data.fun_id < function_open["money_tree"].id) {
        return;
    }
    let num = db.achieve.record.moneytree;
    if (num >= 0 && achieve_cfg["moneytree"][num]) {
        let obj = achieve_cfg["moneytree"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.11", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.11", 0);
    }
});
//神兵共鸣阶级
listen("magic.treasure,achieve.record.treasure_GM", () => {
    if (achieve_data.fun_id < function_open["magic_activate"].id) {
        return;
    }
    let num = db.achieve.record.treasure_GM;
    if (num >= 0 && achieve_cfg["treasure_GM"][num]) {
        let obj = achieve_cfg["treasure_GM"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.12", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.12", 0);
    }
});
//神兵注魂
let origin_break = 0;
listen("magic.break_info,magic.treasure,achieve.record.treasure_BG", () => {
    if (achieve_data.fun_id < function_open["magic_activate"].id) {
        return;
    }
    let treasure = db.magic.treasure;
    let break_info = db.magic.break_info;
    if (treasure.length == 0) {
        return;
    }
    origin_break = break_info[0];
    let num = db.achieve.record.treasure_BG;
    if (num >= 0 && achieve_cfg["treasure_BG"][num]) {
        let obj = achieve_cfg["treasure_BG"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.13", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.13", 0);
    }
});
//集齐红装最低等级
listen("friend_battle.red_collect,achieve.record.red_equipment_collect", () => {
    if (achieve_data.fun_id < function_open["equip_red_forge"].id) {
        return;
    }
    let num = db.achieve.record.red_equipment_collect;
    if (num >= 0 && achieve_cfg["red_equipment_collect"][num]) {
        let obj = achieve_cfg["red_equipment_collect"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.14", arr[0] ? 1 : 0);
        forelet.paint(getData());
    }else {
        updata("achieve.red_tip.14", 0);
    }
});
//红装洗练次数   
listen("friend_battle.total_wash_times,achieve.record.red_equipment_Wash", () => {
    let num = db.achieve.record.red_equipment_Wash;
    if (num >= 0 && achieve_cfg["red_equipment_Wash"][num]) {
        let obj = achieve_cfg["red_equipment_Wash"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.15", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.15", 0); 
    }
});
//锻造红装数量
listen("friend_battle.god_equip_num,achieve.record.forge_red_equipment", () => {
    if (achieve_data.fun_id < function_open["equip_red_forge"].id) {
        return;
    }
    let num = db.achieve.record.forge_red_equipment;
    if (num >= 0 && achieve_cfg["forge_red_equipment"][num]) {
        let obj = achieve_cfg["forge_red_equipment"][num];
        let arr = TaskProgress[obj.func](obj.params);
        updata("achieve.red_tip.16", arr[0] ? 1 : 0);
        forelet.paint(getData());
    } else {
        updata("achieve.red_tip.16", 0);
    }
});

listen("open_fun.id", () => {
    forelet.paint(getData())
})