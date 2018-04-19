import * as piSample from "app/mod/sample";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { remove, destory, getRoot } from "pi/ui/root";
import { open, close } from "app/mod/root";

import { Common } from "app/mod/common";
import { updata, get as getDB, listen } from "app/mod/db";
import { Pi, cfg, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";

import { net_request, net_send, net_message } from "app_a/connect/main";

import { UiFunTable } from "app/scene/ui_fun";

import { equip_level_limit } from "cfg/b/equip_level_limit";
import { equip_level_up } from "cfg/c/equip_level_up";
import { attribute_config } from "cfg/c/attribute_config";
import { equip_diam_equip as diam_equip } from "cfg/c/equip_diam_equip";
import { equip_diam_promote as diam_promote } from "cfg/c/equip_diam_promote";
import { equip_evolution } from "cfg/c/equip_evolution";
import { equip_wash_cost } from "cfg/c/equip_wash_cost";
import { equip_wash } from "cfg/c/equip_wash";
import { vip_advantage } from "cfg/c/vip_advantage";
import { function_open } from "cfg/b/function_open";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { attr_add } from "cfg/c/attr_add";
import { equip_materials_shift } from "cfg/c/equip_materials_shift";
import { Music } from "app/mod/music";
import { config_shortcut } from "cfg/c/config_shortcut";
/************  ***********/

const redId = Object.keys(equip_evolution).sort(function (a, b) {
    return (equip_evolution[a].solt - equip_evolution[b].solt);
});

export const forelet = new Forelet();

let equipLevel: any = getDB("friend_battle.equip_level");
let equip: any = {}, //所有装备
    once_strong_cost = [], //单次强化消耗
    levelUpCost = 0, //装备升级道具消耗
    levelUpMoney = 0, //装备升级银两消耗
    minLevel = 0, //保存筛选出的最低等级
    costType = 0,
    costPropId = 0,
    bagCostPropIndex = 0,
    diamarr = [], //记录装备宝石中的装备位,宝石位
    diamprop = 0,
    diampropcount = 0,
    diammoney = 0,
    levelarr1 = [], //保存装备宝石升级的每个宝石位的等级限制
    levelarr = [], //保存装备宝石本身的等级
    clickequipindex = 0,
    redEquipPos = {}, //用于保存玩家目前所拥有的红装
    red_id = 460501,

    attr_distance = 0, //属性目标位置

    level_up_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//保存升级成功了的装备
    //gem_up_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0], //保存宝石升级成功的装备
    levelFlog = true,//防止连续点击升级

    gemFlog = true,//防止连续点击宝石升级

    redIndex = 0, //记录当前所点击的红装的位置
    forge_cost: any = {}, //红装花费物品
    attr_index = 0, //用于记录需要洗练的属性的位置
    redCanUp = false, //用于控制红装升级
    gem_up_ok = false,//宝石强化成功标识
    //navtab按钮的页卡位置
    cur = 0,
    //材料转换
    this_materials, //待转换材料
    target_materials, //目标材料
    change_num = 1; //转换数量

let keyObj = {
    "0": "equip_level",
    "1": "equip_gem",
    "2": "equip_star",
    "3": "equip_red_forge",
    "4": "equip_red_wash"
};

export const globalReceive: any = {
    gotoForge: (arg?) => {
        arg = arg || 0;
        if (keyObj[arg] && !funIsOpen(keyObj[arg])) {
            return;
        }
        cur = arg - 0;
        let equip = getDB("friend_battle.equip_set");
        let level = getDB("friend_battle.equip_level");
        let min = 0;
        for (let i = 0, len = equip.length; i < len; i++) {
            if (equip[i]) {
                min = i;
                break;
            }
        }
        equip.forEach((v, i) => {
            if (v) {
                min = level[min] > level[i] ? i : min;
            }
        })

        clickequipindex = min;
        once_strong_cost = countOnceCost(clickequipindex);
        getOnekeyupCost();
        diamarr = isdiamlevel();
        //获取红装
        getRedEquip();
        //默认选择的红装id
        let id = defaultId(redEquipPos);
        selectRedEquip(id);
        forelet.paint(getData());
        open("app_c-forge-main-main");
        globalSend("openNewFun", "equip_level");
    },
    getRedEquip: () => {
        getRedEquip();
    }
}

const getData = () => {
    let data: any = {};
    data.Pi = Pi;
    data.levelUpCost = levelUpCost; //一键升级消耗总道具
    data.levelUpMoney = levelUpMoney; //一键升级消耗总银子
    data.minLevel = minLevel; //已穿戴装备中的最低强化等级以及其位置
    data.costType = costType; //一键升级所消耗材料的ID
    data.attriCfg = attribute_config; //基础属性表
    data.diamarr = diamarr;
    data.diamprop = diamprop;
    data.diampropcount = diampropcount;
    data.diammoney = diammoney;
    data.levelarr1 = levelarr1; //宝石开放的等级限制
    data.levelarr = levelarr; //宝石本身等级
    data.gem_up_ok = gem_up_ok; //宝石强化成功标识
    data.level_up_arr = level_up_arr; //保存等级变化的装备的标识
    // if (!clickequipindex) {
    //     let equip = getDB("friend_battle.equip_set");
    //     for (let i = 0, len = equip.length; i < len; i++) {
    //         if (equip[i]) {
    //             clickequipindex = i;
    //             break;
    //         }
    //     }
    // }
    data.clickequipindex = clickequipindex; //用户手动点击处装备的位置
    data.once_strong_cost = once_strong_cost;
    data.function_open = function_open;
    data.equip_wash = equip_wash;
    data.equip_lv = equip_evolution[red_id][Object.keys(equip_evolution[red_id])[0]].level || 50;

    data.redEquipPos = redEquipPos;
    data.levelFlog = levelFlog;
    data.red_id = red_id;//当前红装
    data.redId = redId;//所有红装
    data.forge_cost = forge_cost;
    data.attr_index = attr_index;
    data.redIndex = redIndex;
    data.cur = cur;

    //材料转换
    data.this_materials = this_materials;
    data.target_materials = target_materials;
    data.change_num = change_num;

    data.attr_distance = attr_distance;
    return data;
}

//计算转换材料
const getMaterials = function (sid) {
    let obj = getDB(`bag*sid=${sid}`).pop();
    let arr = obj ? [obj.count, obj.index + 1] : [0, -1];
    return [sid, ...arr];
}

//得到已穿戴装备中的等级最低的一个或多个装备的等级
const equipminiLevel = () => {
    let equip = getDB("friend_battle.equip_set");
    let equipLevels = getDB("friend_battle.equip_level");
    let array = new Array();
    for (let i = 0; i < equipLevels.length; i++) {
        if (equip[i]) {
            array.push(equipLevels[i]);
        }
    }
    if (array.length == 0) {
        return [false, 0];
    } else {
        let min = array[0];
        let index = 0;
        for (let j = 0; j < array.length; j++) {
            if (array[j] < min) {
                min = array[j];
                index = j;
            }
        }
        return [min, index];
    }
}

//判断穿戴装备中的宝石的是否能升级
const isdiamlevel = () => {
    let equip = getDB("friend_battle.equip_set");
    let equip_diam = getDB("friend_battle.equip_diam");
    let array = new Array();
    let bagMoney = getDB("player.money");
    for (let i = 0; i < equip_diam.length; i++) {
        if (equip[i]) {
            array.push(equip_diam[i]);
        }
    }
    if (array.length == 0) {
        return [false, 0, 0];
    } else {
        let num = 0;
        for (let j = 0; j < equip_diam.length; j++) {
            levelarr = [equip_diam[j][0] ? equip_diam[j][0][1] : 0,
            equip_diam[j][0] ? equip_diam[j][0][1] : 0,
            equip_diam[j][1] ? (equip_diam[j][1][1] + equip_diam[j][0][1]) : 0,
            equip_diam[j][2] ? (equip_diam[j][2][1] + equip_diam[j][1][1] + equip_diam[j][0][1]) : 0,
            ];
            levelarr1 = [diam_equip[j + 1][0][1], diam_equip[j + 1][1][1], diam_equip[j + 1][2][1], diam_equip[j + 1][3][1]];

            for (let m = 0; m < equip_diam[j].length; m++) {
                let type = diam_equip[j + 1][m][0];
                diamprop = diam_promote[type][0][0][0];
                let p = Common.getBagPropById(diamprop);
                let bagProp = p ? p[1].count : 0;
                if (equip_diam[j][m]) {
                    let info = equip_diam[j][m];
                    let cost = diam_promote[info[0]][info[1]]
                    diampropcount = cost[0][1];
                    diammoney = cost[2];
                } else {
                    diammoney = 0;
                    diampropcount = 0;
                }
                let diamarr1 = nowGem();
                if (diamarr1.length !== 0) {
                    diampropcount = diamarr1[3];
                    diammoney = diamarr1[4];
                    return [diamarr1[0], diamarr1[1], diamarr1[2]];
                }
                if (equip[j]) {
                    if (levelarr[m] >= levelarr1[m]) {
                        if (bagProp >= diampropcount && bagMoney >= diammoney) {
                            calculateP(equip_diam, j, m);
                            return [true, equip[j].slot - 1, m];
                        }
                    }
                }

                // if(equip[j] && bagProp >= diampropcount && bagMoney >= diammoney && levelarr[0][m] >= diam_equip[equip[j].slot][m][1]){

                //     calculateP(array,j,m)
                //     return [true,equip[j].slot - 1,m];

                // }else if(equip[j] && array[j][m] == 0 ){

                //     if(levelarr[0][m] >= diam_equip[1][m][1]){
                //         calculateP(array,j,m)
                //         return [true,equip[j].slot - 1,m];
                //     }else {
                //         calculateP(array,j,m-1)
                //         return [true,equip[j].slot - 1,m-1 < 0 ? 0 : m - 1]
                //     }
                // }
            }
        }
        for (let i = 0; i < equip.length; i++) {
            if (equip[i]) {
                let diamType = diam_equip[i + 1][0][0];
                diamprop = diam_promote[diamType][0][0][0];
                let p = Common.getBagPropById(diamprop);
                let bagProp = p ? p[1].count : 0;
                diammoney = diam_promote[diamType][equip_diam[i][0] ? equip_diam[i][0][1] : equip_diam[i][0]][2];
                diampropcount = diam_promote[diamType][equip_diam[i][0] ? equip_diam[i][0][1] : equip_diam[i][0]][0][1];
                return [true, i, 0];
            }
        }
    }
}

//判读当前装备宝石位是否能升级
const nowGem = () => {
    let equip = getDB("friend_battle.equip_set");
    let equipDiam = getDB("friend_battle.equip_diam");
    let bagMoney = getDB("player.money");
    let arr = diamarr;
    if (arr.length == 0) return []
    let _levelarr = [equipDiam[arr[1]][0] ? equipDiam[arr[1]][0][1] : 0,
    equipDiam[arr[1]][0] ? equipDiam[arr[1]][0][1] : 0,
    equipDiam[arr[1]][1] ? (equipDiam[arr[1]][1][1] + equipDiam[arr[1]][0][1]) : 0,
    equipDiam[arr[1]][1] ? (equipDiam[arr[1]][2][1] + equipDiam[arr[1]][1][1] + equipDiam[arr[1]][0][1]) : 0,
    ];
    let p　: any, costPropcount = 0, costMoney = 0,
        bagProp: any;
    let _diamprop = diam_promote[diam_equip[arr[1] + 1][arr[2]][0]][1][0][0];
    p = Common.getBagPropById(_diamprop);
    bagProp = p ? p[1].count : 0;
    if (equipDiam[arr[1]][arr[2]]) {
        costPropcount = diam_promote[equipDiam[arr[1]][arr[2]][0]][equipDiam[arr[1]][arr[2]][1]][0][1];
        costMoney = diam_promote[equipDiam[arr[1]][arr[2]][0]][equipDiam[arr[1]][arr[2]][1]][2];
    } else {
        costMoney = diam_promote[diam_equip[arr[1] + 1][arr[2]][0]][0][2];
        costPropcount = diam_promote[diam_equip[arr[1] + 1][arr[2]][0]][0][0][1];
    }

    if (equip[arr[1]] && equipDiam[arr[1]][arr[2]] == 0) {
        if (_levelarr[arr[2]] >= diam_equip[1][arr[2]][1]) {
            diamprop = _diamprop;
            levelarr = _levelarr;
            return [true, equip[arr[1]].slot - 1, arr[2], costPropcount, costMoney]
        } else {
            diamprop = _diamprop;
            levelarr = _levelarr;
            return [true, equip[arr[1]].slot - 1, arr[2] - 1 < 0 ? 0 : arr[2] - 1, costPropcount, costMoney]
        }
    } else if (equip[arr[1]] && bagProp >= costPropcount && bagMoney >= costMoney && _levelarr[arr[2]] >= diam_equip[equip[arr[1]].slot][arr[2]][1]) {
        diamprop = _diamprop;
        levelarr = _levelarr;
        return [true, equip[arr[1]].slot - 1, arr[2], costPropcount, costMoney];
    }
    return [];
}

const calculateP = (array, j, m) => {
    if (array[j][m]) {
        diampropcount = diam_promote[array[j][m][0]][array[j][m][1]][0][1];
        diammoney = diam_promote[array[j][m][0]][array[j][m][1]][2];
    } else {
        diammoney = 0;
        diampropcount = 0;
    }
}

/*
    计算一键强化的材料消耗
*/
const getOnekeyupCost = () => {
    let equipLevel: any = getDB("friend_battle.equip_level");
    let equip: any = getDB("friend_battle.equip_set");
    let counts = 0;
    let min = equipminiLevel()[0];
    minLevel = min;

    if (!min && min !== 0) {
        return;
    }
    for (let i = 0; i < equipLevel.length; i++) {
        if (equip[i]) {
            if (equipLevel[i] == min) {
                counts += 1;
            }
        }
    }
    costType = equip_level_up[min][0];
    levelUpMoney = equip_level_up[min][1] * counts;
    levelUpCost = equip_level_up[min][0][1] * counts;
    costPropId = equip_level_up[min][0][0];
    //addmultiple = [equip_level_up[min][2],equip_level_up[min+1][2]];

    //bagCostPropIndex = getPropIndex();

    let p = Common.getBagPropById(equip_level_up[min][0][0]),
        bagProp = p ? p[1].count : 0,
        bagMoney = getDB("player.money");

    if (bagMoney < levelUpMoney) {
        if (Math.floor(bagMoney / equip_level_up[min][1]) == 0) {
            levelUpMoney = levelUpMoney;
        } else if (Math.floor(bagMoney / equip_level_up[min][1]) > 0) {
            levelUpMoney = Math.floor(bagMoney / equip_level_up[min][1]) * equip_level_up[min][1];
        }
    }
    if (bagProp < levelUpCost) {
        if (Math.floor(bagProp / equip_level_up[min][0][1]) == 0) {
            levelUpCost = levelUpCost;
        } else if (Math.floor(bagProp / equip_level_up[min][0][1]) > 0) {
            levelUpCost = Math.floor(bagProp / equip_level_up[min][0][1]) * equip_level_up[min][0][1];
        }
    }
    updata("friend_battle.levelUpCost", levelUpCost);
    updata("friend_battle.levelUpMoney", levelUpMoney);
}

//计算单次强化消耗
const countOnceCost = (index) => {
    let level = getDB(`friend_battle.equip_level.${index}`);
    let prop = equip_level_up[level][0];
    let money = equip_level_up[level][1];
    return [prop, [100001, money]];
}

//单次强化
const onceStrong = (index) => {
    if (!levelFlog) {
        return;
    }
    let msg = {
        "param": {
            "index": index - 0 + 1
        },
        "type": "app/prop/equip@level_up"
    };
    levelFlog = false;
    net_request(msg, function (data) {
        if (data.error) {
            globalSend("screenTipFun", {
                words: `${data.why},强化失败`
            });
        } else {
            forelet.paint(getData());
            let prop = Common.changeArrToJson(data.ok);
            //扣除花费
            Common_m.deductfrom(prop);
            //保存奖励
            Common_m.mixAward(prop);
            Music.skillSound("other_two");
            globalSend("ui_anim", { name: "streng", time: 1050 });
            let lev = getDB(`friend_battle.equip_level.${index}`) - 0 + 1;
            updata(`friend_battle.equip_level.${index}`, lev);
            //重新计算消耗
            once_strong_cost = countOnceCost(index);
            getOnekeyupCost();
            level_up_arr[index] = 1;
            forelet.paint(getData());
            let base_attr = getDB(`friend_battle.equip_set.${index}`).base_attr[0];
            let a = equip_level_up[lev - 1];
            let b = equip_level_up[lev];
            let add_attr = Math.ceil(b[2] * base_attr[1] + b[3]) - Math.ceil(a[2] * base_attr[1] + a[3]);
            globalSend("attrTip", {
                words: `${attribute_config[base_attr[0]]} +${Common_m.decimalToPercent(add_attr)}`
            });
            setTimeout(function () {
                level_up_arr[index] = 0;
                levelFlog = true;
                forelet.paint(getData());
            }, 600);
        }
    })
}

//一键强化
const getOnekeyup = () => {
    if (!levelFlog) {
        return;
    }
    levelFlog = false;
    let msg = { "param": {}, "type": "app/prop/equip@one_key_level_up" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.error)
        } else {
            let equip = getDB("friend_battle.equip_set");

            Music.skillSound("other_two");
            globalSend("ui_anim", { name: "streng", time: 1050 });
            let old_equip_level = getDB("friend_battle.equip_level");
            old_equip_level = JSON.parse(JSON.stringify(old_equip_level));
            level_up_arr = old_equip_level;
            //let bag = getDB("bag");
            //let player = getDB("player");
            let result: any = Common.changeArrToJson(data.ok);
            updata("friend_battle.equip_level", result.equip_level);

            Common_m.deductfrom(result);
            //重新计算消耗
            once_strong_cost = countOnceCost(clickequipindex);
            getOnekeyupCost();
            forelet.paint(getData());
            let attrObj = {};
            //属性提示
            for (let i = 0, len = old_equip_level.length; i < len; i++) {
                if (old_equip_level[i] < result.equip_level[i]) {
                    level_up_arr[i] = 1;
                    let add = equip_level_up[result.equip_level[i]][2] - equip_level_up[result.equip_level[i] - 1][2];
                    let fixed_val = equip_level_up[result.equip_level[i]][3] - equip_level_up[result.equip_level[i] - 1][3];//固定值
                    let base = equip[i].base_attr[0];
                    attrObj[base[0]] = attrObj[base[0]] ? attrObj[base[0]] + Math.ceil(base[1] * add + fixed_val) : Math.ceil(base[1] * add + fixed_val);
                }
            }
            Object.keys(attrObj).forEach((k) => {
                globalSend("attrTip", {
                    words: `${attribute_config[k]} +${Common_m.decimalToPercent(attrObj[k])}`
                })
            })
            setTimeout(function () {
                attrObj = null;
                level_up_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                levelFlog = true;
                forelet.paint(getData());
            }, 600);
        }
    })
}

//装备宝石的装备切换
const selectequip = (arg) => {
    let equipIndex = getDB("friend_battle.equip_set")[arg];
    let equip_diam = getDB("friend_battle.equip_diam")[arg];
    let num = 0;
    let bagMoney = getDB("player.money");
    if (!equipIndex) {
        return [true, equipIndex.slot - 1, 0];
    }
    for (let i = 0; i < equip_diam.length; i++) {
        levelarr1 = [diam_equip[equipIndex.slot][0][1], diam_equip[equipIndex.slot][1][1], diam_equip[equipIndex.slot][2][1], diam_equip[equipIndex.slot][3][1]];

        levelarr = [equip_diam[0] ? equip_diam[0][1] : 0,
        equip_diam[0] ? equip_diam[0][1] : 0,
        equip_diam[1] ? (equip_diam[1][1] + equip_diam[0][1]) : 0,
        equip_diam[2] ? (equip_diam[2][1] + equip_diam[1][1] + equip_diam[0][1]) : 0,
        ];
        let p　: any,
            bagProp: any;
        diamprop = diam_promote[diam_equip[equipIndex.slot][i][0]][1][0][0];
        if (equip_diam[i] && diam_promote[equip_diam[i][0]][equip_diam[i][1]][0]) {
            diampropcount = diam_promote[equip_diam[i][0]][equip_diam[i][1]][0][1];
            diammoney = diam_promote[equip_diam[i][0]][equip_diam[i][1]][2];
            p = Common.getBagPropById(diamprop);
            bagProp = p ? p[1].count : 0;
        } else {
            diammoney = 0;
            diampropcount = 0;
            bagProp = 0;
        }
        if (bagProp >= diampropcount && bagMoney >= diammoney && levelarr[i] >= levelarr1[i] && (equip_diam[i] ? diam_promote[equip_diam[i][0]][equip_diam[i][1]][0] : 1)) {
            return [true, equipIndex.slot - 1, i];
        }

    }
}

//装备宝石的宝石切换
const selectdiam = (arg) => {
    let equipIndex = getDB("friend_battle.equip_set")[arg[0] - 1]
    let equip_diam = getDB("friend_battle.equip_diam")[arg[0] - 1];
    let equip_index = equip_diam[arg[1]];
    for (let i = 0; i < equip_diam.length; i++) {
        diamprop = diam_promote[diam_equip[equipIndex.slot][arg[1]][0]][1][0][0];
        levelarr = [equip_diam[i] ? equip_diam[i][1] : 0,
        equip_diam[i] ? equip_diam[i][1] : 0,
        equip_diam[i + 1] ? (equip_diam[i + 1][1] + equip_diam[i][1]) : 0,
        equip_diam[i + 2] ? (equip_diam[i + 2][1] + equip_diam[i + 1][1] + equip_diam[i][1]) : 0,
        ];
        break;
    }
    if (equip_index[0]) {
        diampropcount = diam_promote[equip_index[0]][equip_index[1]][0][1];;
        diammoney = diam_promote[equip_index[0]][equip_index[1]][2];
    } else {
        diampropcount = diam_promote[diam_equip[arg[0]][arg[1]][0]][0][0][1];
        diammoney = diam_promote[diam_equip[arg[0]][arg[1]][0]][0][2];
    }
    if (equip_index[0] && !diam_promote[equip_index[0]][equip_index[1]][0] && !diam_promote[equip_index[0]][equip_index[1]][2]) {
        return [true, equipIndex.slot - 1, arg[1], "满级"]
    }
    if (levelarr[arg[1]] >= diam_equip[equipIndex.slot][arg[1]][1]) {
        return [true, equipIndex.slot - 1, arg[1]];
    } else {
        return [true, equipIndex.slot - 1, arg[2]];
    }
}

//装备宝石激活
const diamActiv = (arg) => {
    let msg = { "param": { "index": arg[0] - 0, "diam_index": arg[1] - 0 + 1 }, "type": "app/prop/equip@activate_diam" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.error)
        } else {
            globalSend("ui_anim", { name: "active", time: 1050 });
            let result: any = Common.changeArrToJson(data.ok);
            updata("friend_battle.equip_diam", result.equip_diam);
            diamarr = isdiamlevel();
            forelet.paint(getData());
        }
    })
}

//装备宝石升级
const diamlevelup = (arg) => {
    if (!gemFlog) return;
    let equip_diam = getDB("friend_battle.equip_diam")[arg[0] - 1];
    let diam_index = equip_diam[arg[1]];
    if (!diam_promote[diam_index[0]][diam_index[1]]) {
        console.log("已达到最大的等级");
        return;
    }
    let msg = { "param": { "index": arg[0] - 0, "diam_index": arg[1] - 0 + 1 }, "type": "app/prop/equip@level_up_diam" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.error)
        } else {
            let result: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(result);
            gemFlog = false;
            Music.skillSound("other_two");
            globalSend("ui_anim", { name: "levelup", time: 1050 });
            let bag = getDB("bag");
            let player = getDB("player");
            updata("friend_battle.equip_diam." + (arg[0] - 1), result.equip_diam[arg[0] - 1]);
            gem_up_ok = true;
            diamarr = isdiamlevel();
            forelet.paint(getData());
            let type = result.equip_diam[arg[0] - 1][arg[1]][0];
            let level = result.equip_diam[arg[0] - 1][arg[1]][1];
            //实现提示
            let preAttr = diam_promote[type][level - 1][1];
            let nowAttr = diam_promote[type][level][1];
            globalSend("attrTip", {
                words: `${attribute_config[nowAttr[0]]} +${Common_m.decimalToPercent(preAttr ? (nowAttr[1] - preAttr[1]) : nowAttr[1])}`
            })
            setTimeout(function () {
                gem_up_ok = false;
                gemFlog = true;
                forelet.paint(getData())
            }, 500);
        }
    })
};

//获取玩家的红装 (暴露给自动穿戴装备,回调)
const getRedEquip = () => {
    let bag = getDB("bag");
    let equip = getDB("friend_battle.equip_set");
    bag.forEach(function (v, i) {
        if (v && v.quality === 6 && v.type == "equip") {
            redEquipPos[v.id] = {
                "prop": v,
                "bag_type": 0,
                "index": i
            }
        }
    });
    equip.forEach(function (v, i) {
        if (v && v.quality === 6 && v.type == "equip") {
            redEquipPos[v.id] = {
                "prop": v,
                "bag_type": 1,
                "index": i
            }
        }
    })
};

//锻造红装
const forgeRed = () => {
    if (!levelFlog) {
        return;
    }
    //判断是否满足要求
    if (forge_cost.total < forge_cost.cost[1]) {
        // globalSend("screenTipFun", {
        //     words: `材料不足`
        // })
        globalSend("gotoGetWay",forge_cost.cost[0]);
        return;
    }
    if (getDB("player.level") < equip_level_limit[1].red_open_level) {
        globalSend("screenTipFun", {
            words: `人物未到达${equip_level_limit[1].red_open_level}级,无法锻造神装`
        })
        return;
    }
    let flag = Common_m.bagIsFull();
    if (flag) {
        globalSend("screenTipFun", {
            words: `背包数量已满`
        })
        return;
    }
    levelFlog = false;
    let msg = { "param": { "equip_id": red_id - 0 }, "type": "app/prop/equip@forge" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.error);
            levelFlog = true;
        } else {
            let prop: any = Common.changeArrToJson(data.ok);
            Music.skillSound("other_one");
            //扣除花费
            Common_m.deductfrom(prop);
            //保存物品
            Common_m.mixAward(prop);
            let index = redIndex;
            level_up_arr[index] = 1;
            //重新获取红装
            getRedEquip();
            selectRedEquip(red_id);
            forelet.paint(getData());
            setTimeout(function () {
                level_up_arr[index] = 0;
                levelFlog = true;
                forelet.paint(getData());
            }, 600);
        }
    })
}
//红装进阶升级
const gradeUpRed = function () {
    if (redCanUp) {
        return;
    }
    let words = "";
    let p = redEquipPos[red_id];
    //判断是否满足要求
    if (forge_cost.total < forge_cost.cost[1]) {
        // globalSend("screenTipFun", {
        //     words: `材料不足`
        // })
        globalSend("gotoGetWay",forge_cost.cost[0]);
        return;
    }
    if (getDB("player.level") < p.prop.level + 10) {
        globalSend("screenTipFun", {
            words: `人物等级不能低于装备等级`
        })
        return;
    }
    redCanUp = true;
    let msg = { "param": { "index": p.index - 0 + 1, "bag_type": p.bag_type - 0 }, "type": "app/prop/equip@evolution" };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.error);
            redCanUp = false;
        } else {
            globalSend("ui_anim", { name: "levelup", time: 1050 });
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除花费
            Common_m.deductfrom(prop);
            let newEquip = piSample.decode(prop.equip, Pi.sample);
            newEquip.index = p.index;
            updata(`${p.bag_type === 0 ? "bag." : "friend_battle.equip_set."}${p.index}`, newEquip);
            updata("friend_battle.red_collect", prop.red_collect);
            getRedEquip();
            let index = redIndex;
            level_up_arr[index] = 1;
            selectRedEquip(red_id);

            forelet.paint(getData());
            setTimeout(function () {
                level_up_arr[index] = 0;
                redCanUp = false;
                forelet.paint(getData());
            }, 600);
        }
    })
};
//红装洗练
const washRed = function (type, p) {
    if (redCanUp) {
        return;
    }
    redCanUp = true;
    let msg = {
        "param": {
            "index": p.index - 0 + 1,
            "bag_type": p.bag_type - 0,
            "wash_index": attr_index - 0 + 1,
            "wash_type": type - 0
        },
        "type": "app/prop/equip@wash"
    };
    net_request(msg, function (data) {
        if (data.error) {
            console.log(data.error);
            redCanUp = false;            
        } else {
            let prop: any = Common.changeArrToJson(data.ok);
            Music.skillSound("other_two");
            //扣除花费
            if (type === 0) {
                updata("friend_battle.total_wash_times", prop.total_wash_times);
                updata("friend_battle.wash_times", getDB("friend_battle.wash_times") + 1);
                Common_m.deductfrom(prop);
            }
            let newEquip = piSample.decode(prop.equip, Pi.sample);
            updata(`${p.bag_type === 0 ? "bag." : "friend_battle.equip_set."}${p.index}`, newEquip);
            if (type === 1) {
                globalSend("screenTipFun", { words: `替换成功` });
            }
            level_up_arr[redIndex] = 1;
            //重新获取红装
            getRedEquip();
            forelet.paint(getData());
            setTimeout(function () {
                level_up_arr[redIndex] = 0;
                redCanUp = false;
                forelet.paint(getData());
            }, 400);
        }
    })
};

//默认红装id
const defaultId = function (equip) {
    let k = Object.keys(equip),
        cost = [];
    //有可以锻造的
    if (k.length < 10) {
        for (let i of redId) {
            if (!equip[i]) {
                return i;
            }
        }
    } else {
        for (let i of k) {
            let p = equip_evolution[i][equip[i].prop.level];
            let cost_prop = getDB("bag*sid=" + p.cost[0]);
            if (!cost_prop[cost_prop.length - 1]) {
                return +i;
            }
            if (cost_prop[cost_prop.length - 1].count >= p.cost[1]) {
                return +i;
            }
        }
    }
    return +k[0];
};

const selectRedEquip = function (id) {
    red_id = id;
    let eq = redEquipPos[red_id],
        cost;
    if (eq) {
        let arr = equip_evolution[red_id][eq.prop.level - 0 + 10];
        cost = (arr && arr.cost) || [];
    } else {
        cost = equip_evolution[red_id][equip_level_limit[1].red_open_level].cost;
    }
    forge_cost["cost"] = cost.slice();
    let prop = getDB("bag*sid=" + cost[0]);
    if (prop[prop.length - 1]) {
        forge_cost["total"] = prop[prop.length - 1].count;
    } else {
        forge_cost["total"] = 0;
    }
}

//材料转换
const convert = function (index, count) {
    let msg = {
        "param": {
            "index": index,
            "count": count
        },
        "type": "app/prop/equip@change_material"
    };
    net_request(msg, (data) => {
        if (data.error) {
            globalSend("screenTipFun", {
                words: `转换失败`
            });
        } else {
            let prop: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            Common_m.mixAward(prop);
            //重新获取
            this_materials = getMaterials(equip_materials_shift[0]);
            target_materials = getMaterials(equip_materials_shift[1][0]);
            change_num = 1;
            globalSend("attrTip", {
                words: `转换成功`
            });
            forelet.paint(getData());
        }
    })
}

export class forge extends Widget {
    //切换
    changeColumns = (arg) => {
        if (arg.type_m === "redEquip") {
            // 该界面进来后，默认选中可以锻造的装备。（可锻造的装备优先级大于可进阶的装备）										
            // 若有多个可以锻造的装备，则按照顺序，默认选中顺序最前面的可锻造神装																	
            // 若不存在可锻造的神装，只存在可进阶的神装，则则按照顺序，默认选中顺序最前面的可进阶神装									
            // 若没有可以锻造且没有可进阶的神装，则默认选中第一个神装	
            getRedEquip();
            let id = defaultId(redEquipPos);
            redIndex = redId.indexOf(`${id}`);
            selectRedEquip(id);
            globalSend("openNewFun", "equip_red_forge");
        }
        //洗练
        else if (arg.type_m === "wash") {
            getRedEquip();
            // if (Object.keys(redEquipPos).length === 0) {              
            //     globalSend("screenTipFun", {words: `请先锻造神装`});
            //     return;
            // }
            red_id = +(Object.keys(redEquipPos)[0] ? Object.keys(redEquipPos)[0] : red_id);
            redIndex = redId.indexOf(`${red_id}`);
            globalSend("openNewFun", "equip_red_wash");
        }
        else if (arg.type_m === "equip_gem") {
            globalSend("openNewFun", "equip_gem");
        }
        else if (arg.type_m === "equip_star") {
            globalSend("openNewFun", "equip_star");
        }
        else if (arg.type_m === "equip_level") {
            globalSend("openNewFun", "equip_level");
        }
        forelet.paint(getData());
    }
    //单次强化
    onceStrong = (bag_count, money) => {
        if (bag_count < once_strong_cost[0][1]) {
            // globalSend("screenTipFun", { words: `材料不足` });
            globalSend("gotoGetWay",once_strong_cost[0][0]);

            return;
        }
        if (money < once_strong_cost[1][1]) {
            // globalSend("screenTipFun", { words: `银两不足` });
            globalSend("gotoBuyMoney");
            return;
        }
        onceStrong(clickequipindex);
    }
    //一键升级
    level_up = (bol) => {
        let month_card = getDB("player.month_card_due_time");
        let player_level = getDB("player.level");
        
        if (month_card == 0 && player_level < config_shortcut["equip_strong"].type[1]) {
            globalSend("gotoMonthCardWay", "equip_strong");
            return;
        }
        if (!bol) {
            globalSend("gotoBuyMoney", null)
            return;
        } else if (bol == "2") {
            // globalSend("screenTipFun", { words: `材料不足` });
            globalSend("gotoGetWay",once_strong_cost[0][0]);
            return;
        }
        getOnekeyup();
    }
    //退出
    goback = (arg) => {
        destory(arg.widget);
    }
    //装备升级界面装备切换
    lookEquip = (arg) => {
        clickequipindex = arg;
        once_strong_cost = countOnceCost(clickequipindex);
        forelet.paint(getData());
    }
    //装备宝石激活
    diamActiv = (arg) => {
        diamActiv(arg);
    }
    //装备宝石升级
    diamlevelup = (arg) => {
        if (arg[2]) {
            // globalSend("screenTipFun", { words: `宝石不足` });
            globalSend("gotoGetWay",arg[2]);
            return;
        } else if (arg[3]) {
            globalSend("gotoBuyMoney", null);
            return;
        }
        diamlevelup(arg);
    }
    //装备宝石切换
    clickdiam = (arg) => {
        diamarr = selectdiam(arg);
        forelet.paint(getData());
    }
    //装备宝石装备切换
    diamEquip = (arg) => {
        diamarr = selectequip(arg);
        if (!diamarr) {
            let equipIndex = getDB("friend_battle.equip_set")[arg];
            calculateP(getDB("friend_battle.equip_diam"), equipIndex.slot - 1, 0);
            diamarr = [true, equipIndex.slot - 1, 0];
            diamprop = diam_promote[diam_equip[equipIndex.slot][0][0]][1][0][0];
        }
        forelet.paint(getData());
    }
    //选择红装
    selectRedEquip(arg) {
        let arr = arg.split(",");
        selectRedEquip(arr[1]);
        redIndex = arr[0];
        forelet.paint(getData())
    }
    //锻造时，点击没有合成的神装，抛出提示
    notSelect() {
        globalSend("screenTipFun", { words: "请先合成该神装" });
        return;
    }
    //锻造红装
    forgeRed() {
        forgeRed();
    }
    //红装进级
    gradeUpRed() {
        gradeUpRed();
    }
    //选择洗练属性
    selectAttr(index) {
        attr_index = index;
        attr_distance = index * 30;
        forelet.paint(getData());
    }
    //洗练
    washRed(type) {
        let p = redEquipPos[red_id];
        if (type === 0) {
            let wash_times = getDB("friend_battle.wash_times");
            let vip = getDB("player.vip");
            let num = wash_times - vip_advantage[vip].equip_wash_times;
            num = num < equip_wash_cost.prop_cost_num.length ? num : equip_wash_cost.prop_cost_num.length - 1;
            //判断是否为没费
            if (num >= 0) {
                //判断材料够不
                let cost_prop = getDB("bag*sid=" + equip_wash_cost.cost_prop_id);
                if (cost_prop.length === 0 || equip_wash_cost.prop_cost_num[num] > cost_prop[cost_prop.length - 1].count) {
                    // globalSend("screenTipFun", { words: `材料不足无法洗练` });
                    globalSend("gotoGetWay",equip_wash_cost.cost_prop_id);
                    return;
                }
                //判断银元够不
                if (equip_wash_cost.cost_money[num] > getDB("player.money")) {
                    globalSend("gotoBuyMoney", null);
                    return;
                }
            }
            //当前洗练出来的是对应的天命属性
            if (redEquipPos[red_id] && redEquipPos[red_id].prop.wash.length > 0 && redEquipPos[red_id].prop.wash[0][1][0][0] == attr_add[red_id][0]) {
                globalSend("popTip", {
                    title: "<div>已洗练出此装备的天命属性, 是否放弃此属性继续洗练?</div>",
                    btn_name: ["确定", "取消"],
                    cb: [
                        //确认
                        () => {
                            washRed(type - 0, p);
                        },
                        () => { }
                    ]
                });
            } else {
                washRed(type - 0, p);
            }
        }
        if (type === 1) {
            let wash = p.prop.wash;
            if (wash.length === 0) {
                globalSend("screenTipFun", { words: `此属性无法替换，请先洗练` });
                return;
            } else {
                let flag = wash.some((v) => {
                    return v[0] === (attr_index - 0 + 1);
                });
                if (!flag) {
                    globalSend("screenTipFun", { words: `此属性无法替换，请先洗练` });
                    return;
                }
                washRed(type - 0, p);
            }
        }
    }
    close() {
        let w = forelet.getWidget("app_c-forge-main-main");
        close(w);
        w = undefined
    }
    //获取途径
    gotoGetWay(id) {
        globalSend("gotoGetWay", id);
    }
    //打开转换
    openChange() {
        this_materials = getMaterials(equip_materials_shift[0]);
        target_materials = getMaterials(equip_materials_shift[1][0]);
        forelet.paint(getData());
        open("app_c-forge-prop_change-prop_change");
    }
    //材料转化
    convert() {
        if (this_materials[1] == 0) {
            globalSend("screenTipFun", {
                words: `暂无原材料`
            });
            return;
        }
        convert(this_materials[2], change_num);
    }
    //添加数量
    add(num) {
        num = num - 0;
        if (num > 0 && change_num == this_materials[1]) {
            globalSend("screenTipFun", {
                words: `已达最大数量`
            });
            return;
        }
        if (num < 0 && change_num == 1) {
            globalSend("screenTipFun", {
                words: `已达最小数量`
            });
            return;
        }
        change_num += num;

        change_num = (change_num <= 0) ? 1 : (change_num >= this_materials[1] ? this_materials[1] : change_num);
        forelet.paint(getData());
    }
    //物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
}

//监听背包中所需消耗材料的变化从，并更新界面
listen("bag*sid=" + equip_level_up[0][0][0], function () {
    //getOnekeyupCost();
    forelet.paint(getData());
});
listen("player.money", function () {
    forelet.paint(getData());
});
//监听如果人物有新装备穿戴，更新界面
listen("friend_battle.equip_set",function(){
    getOnekeyupCost();
    diamarr = isdiamlevel();
    forelet.paint(getData());
});
