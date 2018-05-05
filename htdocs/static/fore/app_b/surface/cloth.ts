import * as piSample from "app/mod/sample";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { updata, get as getDB, listen, checkTypeof } from "app/mod/db";
import { listenBack } from "app/mod/db_back";

import { Pi, globalSend, cfg } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { attribute_config } from "cfg/c/attribute_config";

import { clothes_change_coin } from "cfg/b/clothes_change_coin";
import { clothes_module } from "cfg/b/clothes_module";
import { cloth_skin } from "cfg/b/clothes_skin";
import { role_base } from "fight/b/common/role_base";

import { pet_change_coin } from "cfg/b/pet_change_coin";
import { pet_module } from "cfg/b/pet_module";
import { pet_upgrade } from "cfg/b/pet_upgrade";
import { pet_skin } from "cfg/b/pet_skin_show";

import { handScene, updatePet } from "app_b/fight_ol/handscene";
import { resetcanvas } from "app/scene/base/scene";

import { forelet as _forelet } from "app_b/role/role";
import { Music } from "app/mod/music";
import { mgr } from "app/scene/scene";
import { config_shortcut } from "cfg/c/config_shortcut";
import { openUiEffect, effectcallback, destoryUiEffect } from "app/scene/anim/scene";

export const forelet: any = new Forelet();
let cloth_id = 10001,//人物时装id
    clothes_coin_id = 150001,//人物代币

    pet_id = 2222228,//宠物时装id
    pet_coin_id = 100006,//宠物代币

    set,//记录定时器
    click_index = false,
    //chosen_type = 0, //记录是否选择元宝升级
    pose = "",
    pose_show = "",
    pose_timer,
    pose_show_timer,
    // pet_flag = false,//宠物培养点击间隔
    index = 0,//0时装，1灵宠
    new_star = -1, //当前升第几颗星
    one_key = '',  //是够开启一键升星
    uping = null, //是否正在升级
    bar_anim = null, //进度条动画
    pet_ok = true, //升级成功
    break_eff = false,
    bar_anim_timer = null; //进度条动画定时器

//接收消息
export const globalReceive: any = {
    "activatePet": () => {
        logic.petActive();//激活宠物
    },
    "gotoSurface": (arg) => {
        let key = (arg == 0) ? "cloth" : "pet";
        if(!arg){
            index = 0;
            let skin = getDB("cloth.wear_skin");
            cloth_id = skin ? skin : 1,//时装id        
            clothes_coin_id = clothes_change_coin[Object.keys(clothes_change_coin)[0]].award[0][0];
            forelet.paint(getData());
            open("app_b-surface-cloths");
            return;
        }
        index = arg - 0;
        if (funIsOpen("pet")) {
            // pet_flag = false;
            new_star = -1;
            uping = null;
            one_key = "";
            pet_id = pet_skin[0];//时装id
            updata("player.pet_rotate", 0);
            pet_coin_id = pet_change_coin[Object.keys(pet_change_coin)[0]].award[0][0];
            forelet.paint(getData());
            open("app_b-surface-pet");
            changeState();
            globalSend("openNewFun", key);
        }
    }
}

//宠物外观界面关闭时重新绘制CANVAS
const pet_show_close = () => {
    let w = forelet.getWidget("app_b-surface-pet");
    let data: any;
    for (let i = 0; i < w.children.length; i++) {
        if (w.children[i].name == "app-scene-base-scene") {
            data = w.children[i];
            break;
        }
    }
    resetcanvas(data);
}

//时装外观界面关闭时重新绘制CANVAS
const reset_cloths = () => {
    let w = forelet.getWidget("app_b-surface-cloths");
    let data: any;
    for (let i = 0; i < w.children.length; i++) {
        if (w.children[i].name == "app-scene-base-scene") {
            data = w.children[i];
            break;
        }
    }
    resetcanvas(data);
}

export class cloth extends Widget {

    //[开启、关闭 一键强化]
    openOneKey() {
        if (one_key == 'one_key') {
            one_key = '';
            uping = null;
            forelet.paint(getData());
        } else {
            if (getDB("player.month_card_due_time") || getDB("player.level") >= config_shortcut["pet"].type[1]) {
                one_key = 'one_key';
                forelet.paint(getData());
            } else {
                globalSend("gotoMonthCardWay", "pet");
            }
        }
    }
    //已穿戴的提示
    wearTip(){
        globalSend("screenTipFun", {
            words: `已穿戴该时装`
        });
    }
    //还原
    // restore(arg) {//0还原，1恢复
    //     forelet.paint(getData());
    //     reset_cloths();
    // }
    goback(w) {
        close(w.widget);
    }
    //退出宠物相关界面
    petgoback (arg) {
        updata("player.pet_rotate", 0);
        if (arg.widget && arg.widget.name == "app_b-surface-pet") {
            pose = ""
            clearInterval(pose_timer);
            close(arg.widget);
            uping = null;
            globalSend("magicClosed");
        } else if (arg.widget && arg.widget.name == "app_b-surface-pet_show-pet_show") {
            pose = ""
            clearInterval(pose_timer);
            clearInterval(pose_show_timer);
            close(arg.widget);
            pet_show_close();
            changeState();
        }
    }

    //退出时装相关界面
    clothgoback (arg) {
        if (arg.widget && (arg.widget.name == "app_b-surface-attr-attr" || arg.widget.name == "app_b-surface-recovery-recovery")) {
            close(arg.widget);
            reset_cloths();
        } else {
            close(arg.widget);
            // globalSend("gotoRole");
            // setTimeout(() => {
            globalSend("magicClosed");
            // },12)

        }
    }
    //物品展示
    showPropInfo (id) {
        globalSend("showOtherInfo", id)
    }
    //查看属性
    lookClothesAttr () {
        globalSend("gotoSeeAttr", { "title": "时装属性", "attr": getDB("attr.I") });
    }
    lookPetAttr () {
        click_index = false;
        // clearInterval(set);
        // set = undefined;
        uping = null;
        forelet.paint(getData());
        globalSend("gotoSeeAttr", { "title": "灵宠属性", "attr": getDB("attr.H") });
    }
    //时装切换
    clothChange(index, arg) {
        if ((!index && cloth_id - 0 === arg) || (index && pet_id - 0 === arg)) {
            return;
        }
        !index && (cloth_id = arg);
        index && (pet_id = arg);
        forelet.paint(getData());
    }
    //打开一键回收
    gotoRecovery() {
        let data = getCoinCount();
        if (!data.coin) {
            globalSend("screenTipFun", {
                words: `你还没拥有碎片呢`
            });
            return;
        }
        click_index = false;
        // clearInterval(set);
        // set = undefined;
        uping = null;
        forelet.paint(getData());
        open("app_b-surface-recovery-recovery", data);
    }
    //一键回收
    recovery() {
        if (!index) {//角色
            logic.roleRecovery();
        } else {//宠物
            logic.petRecovery();
        }
    }
    //兑换时装
    change(id) {
        let condition = Pi.sample[id].act_condition;

        let prop = getDB("bag*sid=" + condition[0]).pop();
        if (!prop || prop.count < condition[1]) {
            // globalSend("screenTipFun", {
            //     words: `${Pi.sample[condition[0]].name}不足！`
            // });
            globalSend("gotoGetWay", condition[0]);
            return;
        }
        if (!index) {//角色
            logic.changeRoleCloth(id);
        } else {//宠物
            logic.changePetCloth(id);
        }

    }
    //穿戴、
    wear() {
        if (!index) {//角色
            logic.roleWear();
        } else {//宠物
            logic.petWear();
        }
    }
    //卸下
    down() {
        if (!index) {//角色
            logic.roleDown();
        } else {//宠物
            logic.petDown();
        }
    }
    //打开宠物时装界面
    openPetShow() {
        uping = null;
        pose = "";
        pose_show = "";
        clearInterval(pose_timer);
        updata("player.pet_show_rotate", 0);
        forelet.paint(getData());
        // updata("player.module_rotate",0);        
        open("app_b-surface-pet_show-pet_show");
        petShowState();
    }
    //宠物升星
    petStarUp(cost_type, count) {
        if (one_key == "one_key") {
            uping = uping ? null : cost_type;
        }
        pet_up(cost_type, count)
    }
    //宠物突破
    petBreak() {
        logic.petBreak();
    }
}

//宠物升星
const pet_up = (cost_type, count) => {
    let arr = pet_upgrade[data.pet.pet_star_info[0]][data.pet.pet_star_info[1]][cost_type];
    if (cost_type != "prop") {
        let player = getDB("player");
        if (count * arr[1] > player[cost_type]) {
            uping = null;
            bar_anim = null;
            // clearInterval(set);
            // set = undefined;
            // globalSend("screenTipFun", {
            //     words: `您的${cost_type}不足`
            // });
            let fun = cost_type == "money" ? "gotoBuyMoney" : "gotoRecharge";
            globalSend(fun);
            return;
        }
    } else {
        let prop = getDB("bag*sid=" + arr[0]).pop();
        if (!prop || prop.count < arr[1] * count) {
            uping = null;
            // clearInterval(set);
            // set = undefined;
            // globalSend("screenTipFun", {
            //     words: `您的道具不足`
            // });
            globalSend("gotoGetWay", arr[0]);
            return;
        }
    }

    logic.petStarUp(cost_type, count);
}

let data: any = {
    "pet": {},
    "cloth": {},
    //宠物时装
    "pet_change_coin": pet_change_coin,
    //人物时装
    'cloth_change_coin': clothes_change_coin,
    "pet_upgrade": pet_upgrade,
    "pet_skin": pet_skin,
    "cloth_skin": cloth_skin,

    //通用
    "Pi": Pi,
    "attribute_config": attribute_config
}

const getData = function () {
    if (index == 0) {
        data.cloth_id = cloth_id;
        let cloth = getDB("cloth");
        data.cloth = cloth;
        data.roleCfg = role_base;
    }
    if (index == 1) {
        data.pet_id = pet_id;
        let pet = getDB("pet");
        data.pet = pet;
        let c = getDB('bag*sid=' + pet_upgrade[1][1]["prop"][0]).pop();//升星材料 
        data.prop_count = c && c.count || 0;
        data.pet_ok = pet_ok;
        // data.pet_flag = pet_flag;
    }
    data.getCoinCount = getCoinCount;

    data.pet_coin_id = pet_coin_id,
    data.clothes_coin_id = clothes_coin_id,

    data.getFragCount = getFragCount;
    data.getAttr = getAttr;
    data.pet_module = pet_module;
    data.clothes_module = clothes_module;
    data.index = index;
    data.player = getDB("player");
    data.pose = pose;
    data.pose_show = pose_show;
    data.new_star = new_star;
    data.one_key = one_key;
    data.uping = uping;
    data.bar_anim = bar_anim;
    return data;
}

//更新宠物动作
const changeState = () => {
    let time = getMondule(0);
    let i = 0;
    pose_timer = setInterval(() => {
        if(break_eff){return;}
        i++;
        if (i / 100 == (time[0] * 5)) {
            pose = "pose";
            forelet.paint(getData());
        }
        if (i / 100 == (time[0] * 5 + time[1])) {
            pose = "";
            i = 0;
            forelet.paint(getData());
        }
    }, 10);
}

//更新宠物动作
const petShowState = () => {
    let i = 0;
    let time = getMondule(1);
    pose_show_timer = setInterval(() => {
        i++;
        if (i / 100 == (time[0] * 5)) {
            pose_show = "pose";
            forelet.paint(getData());
        }
        if (i / 100 == (time[0] * 5 + time[1])) {
            pose_show = "";
            i = 0;
            forelet.paint(getData());
        }
    }, 10);
}

const getMondule = (type) => {
    let pet_infos = getDB("pet.pet_star_info");
    let module_info = null;
    if (type == 1) {
        module_info = pet_module[pet_id];
        return [module_info.standyTime, module_info.poseTime];
    } else {
        let moduleID = pet_upgrade[pet_infos[0]].module;
        module_info = pet_module[moduleID];
        return [module_info.standyTime, module_info.poseTime]
    }
}

//获得碎片数量
var getFragCount = function (arg) {
    let id = Pi.sample[arg].act_condition[0];
    var count = 0;
    var c = getDB('bag*sid=' + id).pop();//材料 
    c && (count = c.count);
    return count;
}

//获得时装总属性
var getAttr = (index) => {
    let data: any = {};
    let arr = getDB(index ? "pet.own_skin" : "cloth.own_clothes");
    for (var i = 0, len = arr.length; i < len; i++) {
        let prop = Pi.sample[arr[i]];
        for (var j = 0, leng = prop.attr.length; j < leng; j++) {
            data[prop.attr[j][0]] = (data[prop.attr[j][0]] || 0) + prop.attr[j][1]
        }
    }
    return data;
}
//获得兑换后能获得的代币
var getCoinCount = function () {
    let data: any = {
        "coin": 0,
        "fragList": []
    };
    let has = getDB(index ? "pet.own_skin" : "cloth.own_clothes");
    let coinArr = [];
    let ChangeArr = index ? pet_change_coin : clothes_change_coin;
    let clothArr = Object.keys(index ? pet_module : clothes_module);

    for (let key in clothArr) {
        let prop = Pi.sample[clothArr[key]];
        if (!prop) {
            continue;
        }
        let act_condition = prop.act_condition;
        if (!act_condition) {
            continue;
        }
        let p = act_condition[0];
        if (has.indexOf(Number(clothArr[key])) != -1) {
            (coinArr.indexOf(p - 0) == -1) && coinArr.push(p);
        } else {
            (coinArr.indexOf(p - 0) != -1) && coinArr.splice(coinArr.indexOf(p - 0), 1);
        }
    }
    for (let v of coinArr) {
        let prop = getDB('bag*sid=' + v).pop();
        if (prop && prop.count) {
            data.coin += (prop.count * ChangeArr[v].award[0][1]);
            data.fragList.push([v, prop.count]);
        }
    }
    return data;
}


let logic: any = {
    //人物穿戴、
    roleWear() {
        let data = getDB("bag*sid=" + cloth_id).pop();
        let arg = {
            "param": { "index": data.index - 0 + 1 },
            "type": "app/prop/clothes@wear"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            updata("cloth.wear_skin", prop.wear_skin);
            globalSend("screenTipFun", {
                //words: `穿戴${Pi.sample[cloth_id].name}成功`
                words: `穿戴成功`
            });
            forelet.paint(getData());
            let time = setTimeout(() => {
                reset_cloths();
                clearTimeout(time);
            }, 100)
        })
    },
    
    //宠物穿戴
    petWear() {
        let data = getDB("bag*sid=" + pet_id).pop();
        let arg = {
            "param": { "index": data.index - 0 + 1 },
            "type": "app/prop/pet@wear"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            updata("pet.wear_skin", prop.wear_skin);
            globalSend("screenTipFun", {
                words: `穿戴${Pi.sample[pet_id].name}成功`
            });
            forelet.paint(getData());
        })
    },
    //卸下
    roleDown() {
        let arg = {
            "param": {},
            "type": "app/prop/clothes@take_down_skin"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            updata("cloth.wear_skin", prop.wear_skin);
            globalSend("screenTipFun", {
                words: `穿戴成功`
            });
            forelet.paint(getData());
            let time = setTimeout(() => {
                reset_cloths();
                clearTimeout(time);
            }, 100)
        })
    },
    //卸下
    petDown() {
        let arg = {
            "param": {},
            "type": "app/prop/pet@take_down_skin"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            updata("pet.wear_skin", prop.wear_skin);
            globalSend("screenTipFun", {
                words: `脱衣服成功`
            });
            forelet.paint(getData());
        })
    },
    //一键回收
    roleRecovery() {
        let arg = {
            "param": {},
            "type": "app/prop/clothes@one_key_change"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除消耗
            Common_m.deductfrom(prop);
            let result: any = Common_m.mixAward(prop);

            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            });
            let w = forelet.getWidget("app_b-surface-recovery-recovery");
            w && w.cancel && w.cancel();
            forelet.paint(getData());
        })
    },
    petRecovery() {
        let arg = {
            "param": {},
            "type": "app/prop/pet@one_key_change"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除消耗
            Common_m.deductfrom(prop);
            let result: any = Common_m.mixAward(prop);

            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            });
            let w = forelet.getWidget("app_b-surface-recovery-recovery");
            w && w.cancel && w.cancel();
            forelet.paint(getData());
        })
    },
    // 兑换人物时装
    changeRoleCloth(id) {
        let arg = {
            "param": { "id": id },
            "type": "app/prop/clothes@exchange"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除消耗
            Common_m.deductfrom(prop);
            let award = Common_m.mixAward(prop);
            let own_clothes = getDB("cloth.own_clothes");
            own_clothes.push(id);
            updata("cloth.own_clothes", own_clothes);
            let career_id = getDB("player.career_id");
            let index = clothes_module[id].career_id.indexOf(career_id);
            let name = clothes_module[id].name[index];
            globalSend("screenTipFun", {
                words: `恭喜获得${name}`
            });
            forelet.paint(getData());
        })
    },
    // 兑换宠物时装
    changePetCloth(id) {
        let arg = {
            "param": { "id": id },
            "type": "app/prop/pet@exchange"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除消耗
            Common_m.deductfrom(prop);
            let award = Common_m.mixAward(prop);
            let own_clothes = getDB("pet.own_skin");
            own_clothes.push(id);
            updata("pet.own_skin", own_clothes);
            globalSend("screenTipFun", {
                words: `恭喜获得${Pi.sample[id].name}`
            });
            forelet.paint(getData());
        })
    },
    //宠物激活
    petActive() {
        let arg = {
            "param": {},
            "type": "app/prop/pet@enable"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            updata("pet.pet_star_info", prop.pet_star_info);
            globalSend("screenTipFun", {
                words: `宠物激活成功`
            });
            let module_id = pet_upgrade[prop.pet_star_info[0]].module; //获得宠物的模型ID
            updatePet(module_id)
            forelet.paint(getData());
        })
    },
    //宠物升星
    petStarUp(cost_type, count) {
        // if (pet_flag) {
        //     if (!getDB("player.month_card_due_time")) {
        //         globalSend("screenTipFun", {
        //             words: `宠物培养中，请稍后……`
        //         });
        //         return;
        //     }
        // }
        pet_ok = false;
        forelet.paint(getData());
        let arg = {
            "param": {
                "type": (cost_type == 'money') ? 'normal' : 'expensive',
                "cost_type": cost_type,
                "count": count,
            },
            "type": "app/prop/pet@star_up"
        };
        net_request(arg, (data) => {
            pet_ok = true;
            if (data.error) {
                console.log(data);
                // pet_flag = false;
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            // let total_exp = pet_upgrade[prop.pet_star_info[0]][prop.pet_star_info[1]].exp;
            //扣除消耗
            Common_m.deductfrom(prop);
            Music.skillSound("other_two");
            updata("pet.total_train", prop.total_train);
            // pet_flag = false;
            if(bar_anim_timer){
                clearTimeout(bar_anim_timer);
                bar_anim_timer = null;
            }
            bar_anim_timer = setTimeout(() => {
                clearTimeout(bar_anim_timer);
                bar_anim_timer = null;
                bar_anim = null;
                forelet.paint(getData());
            }, 1000);
            bar_anim = true; //开始动画
            let pet_infos = getDB("pet.pet_star_info");
            let pet_star_exp = getDB("pet.pet_star_exp");
            //表示升星
            if (pet_infos[1] !== prop.pet_star_info[1]) {
                //计算经验增加量
                let s_exp = pet_upgrade[pet_infos[0]][pet_infos[1]].exp - pet_star_exp + prop.pet_star_exp;
                if(s_exp){
                    globalSend("barTip",{
                        "words":`+${s_exp}`,
                        "crt":prop.crt || prop.sup_crt,
                        "top":720
                    }) 
                }

                updata("pet.pet_star_exp", pet_upgrade[pet_infos[0]][pet_infos[1]].exp);
                new_star = prop.pet_star_info[1];
                forelet.paint(getData());

                // let timer = setTimeout(() => {
                //     clearTimeout(timer);
                //     timer = null;
                //     updata("pet.pet_star_exp", prop.pet_star_exp);
                //     updata("pet.pet_star_info", prop.pet_star_info);
                //     forelet.paint(getData());
                // }, 800);

                //该突破了
                if (prop.pet_star_info[1] == 10) {
                    let t = setTimeout(() => {
                        // pet_flag = false;
                        updata("pet.pet_star_info", prop.pet_star_info);
                        updata("pet.pet_star_exp", prop.pet_star_exp);
                        clearTimeout(t);
                        t = null;
                        new_star = -1;
                        uping = null;
                        forelet.paint(getData());
                    }, 1000);
                    return;
                }
                if (one_key == 'one_key' && uping) {
                    let t = setTimeout(() => {
                        updata("pet.pet_star_info", prop.pet_star_info);
                        updata("pet.pet_star_exp", prop.pet_star_exp);
                        clearTimeout(t);
                        t = null;
                        new_star = -1;
                        return pet_up(cost_type, count);
                    }, 1000);
                } else {
                    let t = setTimeout(() => {
                        updata("pet.pet_star_info", prop.pet_star_info);
                        updata("pet.pet_star_exp", prop.pet_star_exp);
                        clearTimeout(t);
                        t = null;
                        new_star = -1;
                        forelet.paint(getData());
                    }, 1000);
                }
            } else {
                //计算经验增加量
                let s_exp = prop.pet_star_exp - pet_star_exp;
                if(s_exp){
                    globalSend("barTip",{
                        "words":`+${s_exp}`,
                        "crt":prop.crt || prop.sup_crt,
                        "top":720
                    }) 
                }
                updata("pet.pet_star_exp", prop.pet_star_exp);

                forelet.paint(getData());
                if (one_key == 'one_key' && uping) {
                    let t = setTimeout(() => {
                        // pet_flag = false;
                        clearTimeout(t);
                        t = null;
                        return pet_up(cost_type, count);
                    }, 600);
                }
            }
        })
    },
    //宠物突破
    petBreak() {
        let arg = {
            "param": {},
            "type": "app/prop/pet@break"
        };
        net_request(arg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            }
            let eff = {
                "effect": "eff_ui_chongwu_jinjie",
                "isOnce": true,
                "x": 0,
                "y": 0,
                "z": 2,
                "scale": 0.8
            }
            //mgr.create(eff.treasure_break,"effect");
            break_eff = true;
            let id = openUiEffect(eff, null);
            effectcallback(id, () => {
                let prop: any = Common.changeArrToJson(data.ok);
                updata("pet.pet_star_info", prop.pet_star_info);
                globalSend("screenTipFun", {
                    words: `宠物突破成功`
                });
                break_eff = false;
                forelet.paint(getData());
            });
        })
    }
}
//人物
listenBack("app/prop/clothes@read", (data) => {
    updata("cloth", data);
});
//宠物
listenBack("app/prop/pet@read", (data) => {
    updata("pet", data);
});
// 监听人物money变化
listen("player.money", () =>{
    forelet.paint(getData());
});

forelet.listener = (cmd) => {
    if (cmd != "remove") {
        return;
    }
    click_index = false;
    // clearInterval(set);
    // set = undefined;
    uping = null;
    forelet.paint(getData());
}

// //经验增加提示
// export const errTip = function (option) {
// 	let divRoot = document.getElementById("bar");
// 	if (!divRoot) return;
//     var div = document.createElement("div");
//     div.style.cssText = "position:absolute;width:100px;height:20px;line-height:20px;color:#3cff00;"



// 	var style = '', t;
	
// 	// style = "background-image:url(/dst/app_b/tips/image/err_bg.png);background-size:100% 100%;background-repeat:no-repeat;height:24px;line-height:24px;margin:0 auto;margin-bottom: 3px;padding:0 30px;display:inline-block;animation:errTip 2s forwards;opacity: 0;";
// 	t = 1500;
// 	son.setAttribute("class", "err_tip");
// 	son.innerHTML = words;
// 	var divNode = document.createElement("div");
// 	divNode.appendChild(son);
// 	divRoot.appendChild(divNode);
// 	setTimeout(function () {
// 		divRoot.removeChild(divNode);
// 	}, t);
// };