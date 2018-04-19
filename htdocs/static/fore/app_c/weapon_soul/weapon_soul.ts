/**
 * 导入模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { listenBack } from "app/mod/db_back";
import { updata, insert, get as getDB } from "app/mod/db";
import { net_request } from "app_a/connect/main";
import { globalSend, Pi } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { open, close } from "app/mod/root";
import { parts_cfg } from "app/scene/plan_cfg/parts_config";
import { resetcanvas, setResetListener } from "app/scene/base/scene";
import { mgr } from "app/scene/scene";
import { Music } from "app/mod/music";
import { openUiEffect, effectcallback, destoryUiEffect } from "app/scene/anim/scene";
import { funIsOpen } from "app_b/open_fun/open_fun";

/**
 * 配置数据
 */
import { weapon_soul_base } from "cfg/c/weapon_soul_base";
import { weapon_soul_grade } from "cfg/c/weapon_soul_grade";
import { attribute_config } from "cfg/c/attribute_config";




export const forelet = new Forelet();

insert("weapon_soul", {});

/**
 * 读取后台数据
 */
listenBack("app/prop/ensoul@read", (data) => {
    updata("weapon_soul", data);
});

/**
 * 功能入口
 */
export const globalReceive = {
    "gotoWeaponSoul": () => {
        if (!funIsOpen("weapon_soul")) {return;}
        //判断玩家有没武器
        if (!getDB("friend_battle.equip_set.0")) {
            globalSend("screenTipFun", {
                words: `请先装备武器`
            });
            return;
        }
        if (Object.keys(eff.element).length) {
            logic.deleteEff();
        }
        is_break = logic.weaponCanBreak();
        if (is_break && getDB('weapon_soul.class') == weapon_soul_base.length - 1) {
            is_full = true;
        }
        forelet.paint(getData());
        open("app_c-weapon_soul-weapon_soul");
        globalSend("openNewFun", "weapon_soul"); 
        let t = setTimeout(() => {
            clearTimeout(t);
            t = null;
            logic.createEff(false);
        }, 150);
    }
}

/**
 * 定义变量
 */
let type = 0,  //当前赋灵位类型
    is_break = false, //当前是否可以突破阶数
    is_full = false, // 记录当前赋灵功能是否已满
    all_attr = null, //赋灵总属性
    eff_index = 1, //预览特效idnex
    weapon_data: any = {};
export let eff = {
        "element": {}, //元素特效
        "select": {}, //选择特效
        "element_level_up": {}, //元素升级特效
        "treasure_break": null //武器突破特效
    };


const getData = function () {
    weapon_data.weapon_soul_base = weapon_soul_base;
    weapon_data.weapon_soul_grade = weapon_soul_grade;
    weapon_data.attribute_config = attribute_config; parts_cfg
    weapon_data.parts_cfg = parts_cfg;
    weapon_data.Pi = Pi;
    weapon_data.Common = Common;
    //武器
    weapon_data.equip = getDB("friend_battle.equip_set.0");
    //career_id
    weapon_data.career_id = getDB("player.career_id");
    weapon_data.money = getDB("player.money");
    //赋灵阶级
    weapon_data.class = getDB("weapon_soul.class");
    //各灵等级
    weapon_data.level_record = getDB("weapon_soul.level_record");
    //当前灵位
    weapon_data.type = type;
    weapon_data.all_attr = all_attr;
    weapon_data.eff_index = eff_index;
    weapon_data.is_break = is_break;
    weapon_data.is_full = is_full;

    return weapon_data
}

/**
 * 前台操作
 */
export class WeaponSoul extends Widget {
    /**
     * 关闭注灵界面
     */
    goback() {
        let w = forelet.getWidget("app_c-weapon_soul-weapon_soul");
        close(w);
        w = undefined;
        logic.deleteEff();
        globalSend("magicClosed");
    }
    /**
     * 选择赋灵类型
     */
    selectType(t) {
        if (type == t || is_break) {
            return;
        }
        type = t;
        eff.select.x = selectEff[type].x;
        eff.select.y = selectEff[type].y;
        eff.select.z = selectEff[type].z;
        mgr.modify(eff.select);
        forelet.paint(getData());
    }
    /**
     * 赋灵
     */
    giveSoul() {
        logic.giveSoul();
    }
    /**
     * 突破
     */
    weaponBreak() {
        logic.weaponBreak();
    }
    /**
     * 查看总属性
     */
    lookAllAttr() {
        let attr = getDB("attr.J");
        globalSend("gotoSeeAttr", {
            "title": "赋灵属性",
            "attr": attr
        });
    }
    /**
     * 打开预览特效界面
     */
    lookEff() {
        //删除赋界面特效
        logic.deleteEff();
        eff_index = weapon_data.class > 0 ? weapon_data.class : 1;
        forelet.paint(getData());
        open("app_c-weapon_soul-effect_preview-effect_preview");
        let t = setTimeout(() => {
            clearTimeout(t);
            t = undefined;
            logic.createEff(true);
        }, 100)
    }
    /**
     * 关闭预览界面
     */
    goclose() {
        //删除特效
        logic.deleteEff();
        let w = forelet.getWidget("app_c-weapon_soul-effect_preview-effect_preview");
        close(w);
        //重绘
        w = null;
        logic.resetCanvas();
        let t = setTimeout(() => {
            clearTimeout(t);
            t = undefined;
            logic.createEff(false);
        }, 50)
    }
    /**
     * 选择预览的特效
     */
    sellectEff(index) {
        if (eff_index == index) {
            return;
        }
        eff_index = index;
        forelet.paint(getData());
        let t = setTimeout(() => {
            clearTimeout(t);
            t = undefined;
            logic.createEff(true);
        }, 50)
    }
    /**
     * 查看物品详情
     */
    gotoGetWay(sid) {
        globalSend("gotoGetWay", sid);
    }
};

/**
 * 元素特效
 */
let elemetnEff = {
    "0": {
        "x": 1.28,
        "y": 0,
        "z": 3.4
    },
    "1": {
        "x": -1.28,
        "y": 0,
        "z": 3.4
    },
    "2": {
        "x": 1.32,
        "y": 0,
        "z": 1.61
    },
    "3": {
        "x": -1.32,
        "y": 0,
        "z": 1.61
    }
}
/**
 * 选中特效
 */
let selectEff = {
    "0": {
        "x": 1.28,
        "y": 0,
        "z": 3.4
    },
    "1": {
        "x": -1.28,
        "y": 0,
        "z": 3.4
    },
    "2": {
        "x": 1.32,
        "y": 0,
        "z": 1.61
    },
    "3": {
        "x": -1.32,
        "y": 0,
        "z": 1.61
    }
}

/**
 * 逻辑处理
 */
const logic = {
    /**
     * 创建特效[元素/选择]
     * @param bool [true -> 预览特效, false -> 正常元素特效]
     */
    createEff: function (bool) {
        let grade = getDB("weapon_soul.class");
        let arr = getDB("weapon_soul.level_record");
        
        arr.forEach((v, i) => {
            let effect;
            let arr = weapon_soul_grade[grade][i + 1];
            if (bool) {
                effect = arr[arr.length - 1].effect;
            } else {
                effect = arr[v].effect;
            }
            eff.element[i] = {
                "effect": effect,
                "isOnce": false,
                "x": elemetnEff[i].x,
                "y": elemetnEff[i].y,
                "z": elemetnEff[i].z,
                "scale": 0.8
            }
            mgr.create(eff.element[i], "effect");
        });
        if ((!logic.weaponCanBreak()) && (!bool)) {
            eff.select = {
                "effect": "eff_ui_fuling_xuanzhong",
                "isOnce": false,
                "x": selectEff[type].x,
                "y": selectEff[type].y,
                "z": selectEff[type].z,
                "scale": 0.8
            }
            mgr.create(eff.select, "effect");
        }
    },
    /**
     * 创建预览特效
     */
    /**
     * 删除特效[元素/选择]
     */
    deleteEff: function () {
        //删除选中圈
        if (Object.keys(eff.select).length) {
            mgr.remove(eff.select);
            eff.select = {};
        }
        //删除元素特效
        let arr = getDB("weapon_soul.level_record");
        arr.forEach((v, i) => {
            mgr.remove(eff.element[i]);
            delete eff.element[i];
        });
    },
    /**
     * 赋灵升级
     */
    giveSoul: function () {
        //当前阶数
        let grade = weapon_data.class;
        //当前赋灵位等级
        let level = weapon_data.level_record[type];
        //消耗的材料
        let cost = weapon_soul_grade[grade][type + 1][level].cost;
        if (this.costEnough(cost) && !eff.element_level_up[type]) {
            giveSoulNet();
        }
    },
    /**
     * 进阶
     */
    weaponBreak: function () {
        //获取消耗材料
        let cost = weapon_soul_base[weapon_data.class].cost;
        if (this.costEnough(cost) && !eff.treasure_break) {
            //创建进阶特效
            eff.treasure_break = {
                "effect": "eff_ui_fuling_jinjie",
                "isOnce": true,
                "x": -0.03,
                "y": 0,
                "z": 2.5,
                "scale": 1
            }
            Music.skillSound("other_one");
            //mgr.create(eff.treasure_break,"effect");
            let id = openUiEffect(eff.treasure_break, null);
            effectcallback(id, () => {
                eff.treasure_break = null;
                weaponBreakNet();
            });
        }
    },
    /**
     * 判断材料是否足够
     * @return 布尔值
     */
    costEnough(cost) {
        for (let v of cost) {
            if (v[0] == 100001) {
                let money = getDB("player.money");
                if (money < v[1]) {
                    // globalSend("screenTipFun", { words: `银两不足` });
                    globalSend("gotoBuyMoney", null);
                    return false;
                }
            } else {
                let prop = getDB(`bag*sid=${v[0]}`).pop();
                if (!prop || prop.count < v[1]) {
                    // globalSend("screenTipFun", { words: `材料不足` });
                    globalSend("gotoGetWay",v[0]);
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * 属性提升提示
     */
    attrTip(old_attr, now_attr) {
        now_attr.forEach((v, i) => {
            let add = old_attr[i] ? (v[1] - old_attr[i][1]) : v[1];
            globalSend("attrTip", {
                words: `${attribute_config[v[0]]} +${Common_m.decimalToPercent(add)}`
            })
        });
    },
    /**
     * 判断是否达到突破阶数条件
     */
    weaponCanBreak: function () {
        let grade = getDB("weapon_soul.class");
        let arr = getDB("weapon_soul.level_record");
        let obj = weapon_soul_grade[grade];
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] < (obj[i + 1].length - 1)) {
                return false;
            }
        }
        return true;
    },
    /**
     * 重绘
     */
    resetCanvas: function () {
        let w = forelet.getWidget("app_c-weapon_soul-weapon_soul");
        let data: any;
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app_c-weapon_soul-weapon_module-weapon_module") {
                data = w.children[i].children[0];
                break;
            }
        }
        resetcanvas(data);
    }
}


/**
 * 后台交互
 */
/**
* 
* @param param : 通讯参数对象
* @return : Promise对象
*/
const weaponSoulNet = function (param) {
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
 * 赋灵升级
 */
const giveSoulNet = function () {
    let msg = {
        "param": { "index": type + 1 },
        "type": "app/prop/ensoul@level_up"
    };
    weaponSoulNet(msg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除消耗
            Common_m.deductfrom(prop);
            //现有等级
            let now_level = prop.level_record[type];
            //获取原等级
            let old_level = now_level - 1;
            let obj = weapon_soul_grade[weapon_data.class][type + 1];
            //获取原属性
            let oldAttr = obj[old_level].attr;
            //现有属性
            let nowAttr = obj[now_level].attr;
            logic.attrTip(oldAttr, nowAttr);
            updata(`weapon_soul.level_record.${type}`, now_level);
            Music.skillSound("other_two");
            //创建升级特效
            eff.element_level_up[type] = {
                "effect": "eff_ui_fuling_shengji",
                "isOnce": true,
                "x": elemetnEff[type].x,
                "y": elemetnEff[type].y,
                "z": elemetnEff[type].z,
                "scale": 0.8
            }
            mgr.create(eff.element_level_up[type],"effect");
            //删除升级特效
            let timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                mgr.remove(eff.element_level_up[type]);
                eff.element_level_up[type] = null;
            }, 500)

            is_break = logic.weaponCanBreak();
            if (is_break && getDB('weapon_soul.class') == weapon_soul_base.length - 1) {
                is_full = true;
            }
            //删除选中特效
            if (is_break) {
                mgr.remove(eff.select);
                eff.select = {};
            }
            //判断是否需要更新特效
            if (now_level == obj.length - 1) {
                mgr.remove(eff.element[type]);
                eff.element[type] = {
                    "effect": obj[now_level].effect,
                    "isOnce": false,
                    "x": elemetnEff[type].x,
                    "y": elemetnEff[type].y,
                    "z": elemetnEff[type].z,
                    "scale": 0.8
                }
                mgr.create(eff.element[type],"effect");
            }
            forelet.paint(getData());
        }).catch((error) => {
            console.log(error);
            globalSend("screenTipFun", { words: `通讯失败` });
        });
}

/**
 * 突破
 */
const weaponBreakNet = function () {
    let msg = {
        "param": {},
        "type": "app/prop/ensoul@break"
    };
    weaponSoulNet(msg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            updata("weapon_soul.level_record", prop.level_record);
            //原属性
            let oldAttr = weapon_soul_base[prop.class - 1].attr;
            //现有属性
            let nowAttr = weapon_soul_base[prop.class].attr;
            logic.attrTip(oldAttr, nowAttr);
            updata("weapon_soul.class", prop.class);

            is_break = false;
            type = 0;
            // 删除特效
            logic.deleteEff();
            // 创建特效       
            forelet.paint(getData());
            let t = setTimeout(() => {
                clearTimeout(t);
                t = null;
                logic.createEff(false);
            }, 50);

        }).catch((error) => {
            console.log(error);
            globalSend("screenTipFun", { words: `通讯失败` });
        })
}



/**
 * 赋灵升级  async函数异步解决方案
 */
// const giveSoulNet = async function () {
//     let msg = {
//         "param": { "index": type + 1 },
//         "type": "app/prop/ensoul@level_up"
//     };
//     console.log("await执行前");
//     let data = await weaponSoulNet(msg);
//     console.log("await执行中");
//     let prop: any = Common.changeArrToJson(data.ok);
//     //扣除消耗
//     Common_m.deductfrom(prop);
//     //现有等级
//     let now_level = prop.level_record[type];
//     //获取原等级
//     let old_level = now_level - 1;
//     let obj = weapon_soul_grade[weapon_data.class][type + 1];
//     //获取原属性
//     let oldAttr = obj[old_level].attr;
//     //现有属性
//     let nowAttr = obj[now_level].attr;
//     logic.attrTip(oldAttr, nowAttr);
//     updata(`weapon_soul.level_record.${type}`, now_level);
//     is_break = logic.weaponCanBreak();
//     if (is_break && getDB('weapon_soul.class') == weapon_soul_base.length - 1) {
//         is_full = true;
//     }
//     //删除选中特效
//     if (is_break) {
//         mgr.remove(eff.select);
//         eff.select = {};
//     }
//     //判断是否需要更新特效
//     if (now_level == obj.length - 1) {
//         mgr.remove(eff.element[type]);
//         eff.element[type] = {
//             "effect": obj[now_level].effect,
//             "isOnce": false,
//             "x": elemetnEff[type].x,
//             "y": elemetnEff[type].y,
//             "z": elemetnEff[type].z,
//             "scale": 0.8
//         }
//         mgr.create(eff.element[type],"effect");
//     }
//     forelet.paint(getData());
//     console.log("await执行后");
//     console.log(data);
// };





