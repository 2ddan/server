//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { Music } from "app/mod/music";
import { mgr } from "app/scene/scene";
import { resetcanvas } from "app/scene/base/scene";

//导入配置
import { attribute_config } from "cfg/c/attribute_config";
import { soul_base } from "cfg/c/soul_base";
import { soul_level_up } from "cfg/c/soul_level_up";
import { soul_resonance_need } from "cfg/c/soul_resonance_need";
import { soul_resonance } from "cfg/c/soul_resonance";
import { soul_seat } from "cfg/c/soul_seat";
import { soul_type_name } from "cfg/c/soul_type_name";


export const forelet = new Forelet();

export const globalReceive = {
    gotoSoul: () => {
        if (funIsOpen("soul")) {
            initData();
            let soul_arr = getDB("soul.soul_info");
            resonate_level = logic.getMinLevel(soul_arr);
            logic.deleteEff("acupoint_eff");
            logic.deleteEff("resonate_acupoint");
            forelet.paint(getData());
            open("app_c-soul-soul");
            globalSend("openNewFun", "soul");
            let t = setTimeout(() => {
                clearTimeout(t);
                t = null;
                resonate_level.forEach((v, i) => {
                    if (v >= 0) {
                        logic.createEff(i, v, 0);
                    }
                })
            }, 150);
        }
    },
    soulchange: () => {
        forelet.paint(getData());
        open("app_c-soul-prop_change-prop_change");
    }
}

//前台操作
export class Instance extends Widget {
    //关闭共鸣界面的时候部分数据需要重新设置(写界面的时候再加上)
    goback(arg) {
        close(arg.widget);
        if (arg.widget.name == "app_c-soul-soul") {
            logic.deleteEff("acupoint_eff");
            globalSend("magicClosed");
        }
        if (arg.widget.name == "app_c-soul-resonate-resonate") {
            logic.deleteEff("resonate_acupoint");
            logic.resetCanvas();
            let t = setTimeout(() => {
                clearTimeout(t);
                t = null;
                resonate_level.forEach((v, i) => {
                    if (v >= 0) {
                        logic.createEff(i, v, 0);
                    }
                })
            }, 100);
        }
    }

    //选择孔穴
    selectAcupoint(index) {
        if (soul_data.player_level >= soul_seat[index - 1].open_level) {
            logic.selectAcupoint(index);
            logic.countCost();
            forelet.paint(getData());
        }
    }
    //选择精元
    selectSoul(index) {
        logic.selectSoul(index);
        forelet.paint(getData());
    }
    //精元升级
    soulUp() {
        if (logic.isCanUp()) {
            //升级
            soulUp(acupoint, soul_index, status);
        }
    }
    //打开共鸣界面
    openResonate() {
        logic.deleteEff("acupoint_eff");
        forelet.paint(getData());
        open("app_c-soul-resonate-resonate");
        let t = setTimeout(() => {
            clearTimeout(t);
            t = null;
            resonate_level.forEach((v, i) => {
                if (v >= 0) {
                    logic.createEff(i, v, 1);
                }
            })
        }, 150);
    }
    //查看属性
    lookAttr() {
        globalSend("gotoSeeAttr", { "title": "角色属性", "attr": getDB("attr.D") });
    }
    //查看物品详情
    showPropInfo(arg) {
        globalSend("showOtherInfo", arg)
    }
    //打开精元背包
    openSoulBag() {
        bagSoul = logic.getSoulInBag();
        forelet.paint(getData())
        open("app_c-soul-bag_soul-bag_soul");
    }

    //打开转换
    openPropChange() {
        let w = forelet.getWidget("app_c-soul-bag_soul-bag_soul");
        w && close(w);
        change_num = 1;
        targetSoul = null; //可能先通过获取途径进入
        forelet.paint(getData());
        open("app_c-soul-prop_change-prop_change");
    }
    //添加数量
    add(num) {
        if (!thisSoul) {
            globalSend("screenTipFun", {
                words: `请先选择需要转换的龙魂`
            });
            return;
        }
        num = num - 0;
        if ((num > 0) && change_num == thisSoul.count) {
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
        change_num = (change_num <= 0) ? 1 : (change_num > thisSoul.count ? thisSoul.count : change_num);
        forelet.paint(getData());
    }
    //打开选择精元类型  [1 =>初始原精元, 2 => 目标精元]
    openSelect(type) {
        open_type = type;
        forelet.paint(getData());
        open("app_c-soul-select_soul-select_soul")
    }
    //选择需要转换的精元id
    selectThisSoul(i) {
        thisSoul = bagSoul[i];
        let w = forelet.getWidget("app_c-soul-select_soul-select_soul");
        w && close(w);
        change_num = 1;
        forelet.paint(getData());
    }
    //选择需要的目标精元id
    selectTargetSoul(sid) {
        let obj = getDB(`bag*sid=${sid}`).pop();
        targetSoul = [sid, obj ? obj.count : 0];
        let w = forelet.getWidget("app_c-soul-select_soul-select_soul");
        w && close(w);
        forelet.paint(getData());
        obj = null;
    }
    //转换
    convert() {
        logic.isCanConvert();
    }
    //查看物品
    propInfoShow(sid) {
        globalSend("showOtherInfo", sid);
    }
}


//******************************************test*********************************/
let soul_data: any = {
    "soul_base": soul_base,
    "soul_level_up": soul_level_up,
    "soul_resonance_need": soul_resonance_need,
    "soul_resonance": soul_resonance,
    "soul_seat": soul_seat,
    "soul_type_name": soul_type_name,
    "Pi": Pi,
    "attribute_config": attribute_config,
    "Common": Common,
    "soul_id": Object.keys(soul_base)
},
    resonate_level = [], //孔位共鸣等级
    acupoint = 1, //九窍孔位 [1~9]
    soul_index = 0, //精元位置 [0~3]

    soulArr = [], //储存选择穴位对应的精元
    soulIcon = [], //精元图标
    bagSoul = [], //储存背包里的精元
    up_cost = [], //升级消耗

    my_prop, //我bag里对应材料
    status = 0, //花费元宝升级精元
    change_num = 1, //需要转化的数量

    open_type = 1, //打开类型
    thisSoul, //当前需要转换的精元
    targetSoul; //转换的目标精元

const getData = function () {
    soul_data.soul_info = getDB("soul.soul_info");
    soul_data.total_level = getDB("soul.num");
    soul_data.acupoint = acupoint;
    soul_data.soul_index = soul_index;
    soul_data.soulArr = soulArr;
    soul_data.soulIcon = soulIcon;
    soul_data.up_cost = up_cost;
    soul_data.my_prop = my_prop;

    soul_data.resonate_level = resonate_level;
    soul_data.thisSoul = thisSoul;
    soul_data.targetSoul = targetSoul;
    soul_data.bagSoul = bagSoul;
    soul_data.change_num = change_num;
    soul_data.open_type = open_type;
    let player = getDB("player");
    soul_data.player_level = player.level;
    soul_data.player_money = player.money;

    soul_data.getSoulMinLv = logic.getSoulMinLv;
    return soul_data;
}

export const eff = {
    "acupoint_eff": {},  //升级界面孔位特效
    "resonate_acupoint": {}, //共鸣界面孔位特效
    "soul_level_up": {}, //升级特效
    "up_name": "eff_ui_longhun_shengji",
    "resonate_eff": {}, //共鸣特效
    "resonate_name": "eff_ui_longhun_bianse"
}
const effect = [
    "eff_ui_longhun_lan",
    "eff_ui_longhun_lan",
    "eff_ui_longhun_lan",
    "eff_ui_longhun_lan",
    "eff_ui_longhun_lan",
    "eff_ui_longhun_zi",
    "eff_ui_longhun_zi",
    "eff_ui_longhun_zi",
    "eff_ui_longhun_zi",
    "eff_ui_longhun_cheng",
    "eff_ui_longhun_cheng",
    "eff_ui_longhun_cheng",
    "eff_ui_longhun_cheng",
]
//孔位特效位
const acupointEffPos = [
    { "x": 0.78, "y": 0, "z": -2.08 },
    { "x": -0.61, "y": 0, "z": -1.68 },
    { "x": 0.78, "y": 0, "z": -1.19 },
    { "x": -0.62, "y": 0, "z": -0.97 },
    { "x": 0.61, "y": 0, "z": -0.27 },
    { "x": 1.01, "y": 0, "z": 0.84 },
    { "x": -0.24, "y": 0, "z": 1.25 },
    { "x": -1.64, "y": 0, "z": -0.16 },
    { "x": -0.61, "y": 0, "z": 0.14 }
];
//共鸣孔位特效位
const resonateEffPos = [
    { "x": 1.8, "y": 0, "z": 1.065 },
    { "x": 1.332, "y": 0, "z": 0.115 },
    { "x": 0.87, "y": 0, "z": 1.065 },
    { "x": 0.4, "y": 0, "z": 0.115 },
    { "x": -0.06, "y": 0, "z": 1.065 },
    { "x": -0.534, "y": 0, "z": 0.115 },
    { "x": -1, "y": 0, "z": 1.065 },
    { "x": -1.465, "y": 0, "z": 0.115 },
    { "x": -1.935, "y": 0, "z": 1.065 },
];
//精元升级特效位
const soulLevleUP = [
    { "x": 1.96, "y": 0, "z": -3.06 },
    { "x": 0.66, "y": 0, "z": -3.28 },
    { "x": -0.66, "y": 0, "z": -3.28 },
    { "x": -1.96, "y": 0, "z": -3.06 },
]

//页面逻辑处理
export let logic = {
    /**
     * 获取孔位最低等级 [当孔位未开放时, 等级为-1]
     */
    getMinLevel: function (soul) {
        let player_level = getDB("player.level") || 1;
        let arr = [];
        soul.forEach((v, i) => {
            if (player_level >= soul_seat[i].open_level) {
                // let level = [];
                // v.forEach((n) => {
                //     level.push(n[1]);
                // });
                // arr.push(Math.min.apply(null,level));
                arr.push(logic.getSoulMinLv(v));
            } else {
                arr.push(-1);
            }
        });
        return arr;
    },
    /**
     * 创建孔位特效
     * @param index [第几个孔位]
     * @param level [孔位共鸣等级]
     * @param index [0->升级界面, 1->共鸣界面]
     */
    createEff: function (index, level, type) {
        if (level < 0) {
            return;
        }
        let key = (type == 0) ? "acupoint_eff" : "resonate_acupoint";
        let pos = (type == 0) ? acupointEffPos : resonateEffPos;
        eff[key][index] = {
            "effect": effect[level],
            "isOnce": false,
            "x": pos[index].x,
            "y": pos[index].y,
            "z": pos[index].z,
            "scale": 1
        }
        mgr.create(eff[key][index], "effect");
    },
    /**
     * 删除特效
     */
    deleteEff: function (key) {
        //删除孔位特效
        Object.keys(eff[key]).forEach((v, i) => {
            mgr.remove(eff[key][i]);
            delete eff[key][i];
        });
    },
    /**
     * 选择穴位
     * @param index 穴位号id [1~9]
     */
    selectAcupoint: function (index) {
        acupoint = index;
        soulArr = soul_seat[index - 1].hole;
        //查找精元图标
        soulIcon = logic.searchSoulIcon(getDB("soul.soul_info"));
    },
    /**
     * 查找精元图标
     */
    searchSoulIcon: function (soul_info) {
        let icon = [];
        soulArr.forEach((v, i) => {
            let level_arr = soul_type_name[v].level;
            let soul_level = soul_info[acupoint - 1][i][1];
            for (let arr of level_arr) {
                if (soul_level <= arr[0]) {
                    icon.push(arr[1]);
                    break;
                }
            }
        });
        return icon;
    },
    /**
     * 选择准备升级的精元
     * @param index 精元位置 [0~3]
     */
    selectSoul: function (index) {
        soul_index = index;
        logic.countCost();
    },
    /**
     * 计算对应孔位相关精元升级消耗材料
     */
    countCost: function () {
        //获取精元类型和等级
        let type = soul_level_up[soulArr[soul_index]],
            level = getDB("soul.soul_info")[acupoint - 1][soul_index][1];
        if (level < type.length - 1) {
            up_cost = type[level].cost;
            //或许我背包里对应的材料数量
            my_prop = getDB(`bag*sid=${up_cost[0][0]}`).pop() || { "sid": up_cost[0][0], "count": 0 };
        }
    },
    /**
     * 是否消耗元宝升级
     */
    upUseDiamond: function () {
        status = (status === 1) ? 0 : 1;
    },
    /**
     * 判断此精元是否可以升级
     */
    isCanUp: function () {
        let money = getDB("player.money");
        if (money < up_cost[1][1]) {
            globalSend("gotoBuyMoney", null);
            return false;
        }
        if (status === 0) {
            //此处应该是一个弹出询问框(暂无)
            if (my_prop.count < up_cost[0][1]) {
                globalSend("gotoGetWay",my_prop.sid);
                let obj = getDB(`bag*sid=${my_prop.sid}`).pop();
                targetSoul = [my_prop.sid, obj ? obj.count : 0];
                return false;
            }
        } else if (status === 1) {
            let diamond = getDB("player.diamond");
            let num = up_cost[0][1] - my_prop.count;
            num = num > 0 ? num : 0;
            if (diamond < num * soul_base[up_cost[0][0]].fill_price) {
                if (my_prop.count < up_cost[0][1]) {
                    // globalSend("screenTipFun", {
                    //     words: `元宝不足`
                    // });
                    globalSend("gotoRecharge");
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * 获取bag里的所有精元
     */
    getSoulInBag: function () {
        return getDB("bag").filter((v) => {
            if (v.type == "soul") {
                return v;
            }
        });
    },
    /**
     * 判断元宝是否足够
     */
    isCanConvert: function () {
        let diamond = getDB("player.diamond"),
            cost = soul_base[targetSoul[0]].turn_price * change_num;
        if (diamond < cost) {
            globalSend("screenTipFun", {
                words: `元宝不足`
            });
            return;
        };
        convertSoul(thisSoul.index + 1, change_num, targetSoul[0]);
    },
    /**
     * 重绘
     */
    resetCanvas: function () {
        let w = forelet.getWidget("app_c-soul-soul");
        let data: any;
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app-scene-base-scene") {
                data = w.children[i];
                break;
            }
        }
        resetcanvas(data);
    },
    /**
     * 计算单个孔位的最低精元等级
     * 参数[孔位的精元信息]  二维数组
     */
    getSoulMinLv: function (soul_info) {
        let arr = [];
        soul_info.forEach((v) => {
            arr.push(v[1]);
        });
        return Math.min.apply(null, arr);
    }
}

/**
 * 
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const soulNet = function (param) {
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
 * 精元升级
 * @param index 穴窍位置
 * @param soul_index 精元位置
 * @param status 是否元宝补足
 */
const soulUp = function (index, soul_index, status) {
    let arg = {
        "param": {
            "index": index, //穴窍位置
            "soul_index": soul_index - 0 + 1, //精元位置
            "status": status// 是否元宝补足
        },
        "type": "app/prop/soul@level_up"
    }
    soulNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);    
            //计算前后最低等级
            let pre_min = logic.getSoulMinLv(getDB(`soul.soul_info.${index - 1}`));
            let now_min = logic.getSoulMinLv(prop.index_soul_info);
            if (now_min > pre_min) {
                globalSend("attrTip", {
                    words: `激活${now_min}阶共鸣`
                });
            }

            updata(`soul.soul_info.${index - 1}`, prop.index_soul_info);
            let num = getDB("soul.num") - 0 + 1;
            updata("soul.num", num);
            Music.skillSound("other_two");

            //soul特效
            eff.soul_level_up[soul_index] = {
                "effect": eff.up_name,
                "isOnce": true,
                "x": soulLevleUP[soul_index].x,
                "y": soulLevleUP[soul_index].y,
                "z": soulLevleUP[soul_index].z,
                "scale": 1.25
            }
            //孔位升级特效
            eff.resonate_eff[index - 1] = {
                "effect": eff.resonate_name,
                "isOnce": true,
                "x": acupointEffPos[index - 1].x,
                "y": acupointEffPos[index - 1].y,
                "z": acupointEffPos[index - 1].z,
                "scale": 0.7
            }
            mgr.create(eff.soul_level_up[soul_index], "effect");
            mgr.create(eff.resonate_eff[index - 1], "effect");
            //删除特效
            let timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                mgr.remove(eff.soul_level_up[index]);
                eff.soul_level_up[index] = null;
                mgr.remove(eff.resonate_eff[index - 1]);
                eff.resonate_eff[index - 1] = null;
            }, 500);

            //变色特效
            let arr = [];
            prop.index_soul_info.forEach((v) => {
                arr.push(v[1]);
            });
            let min = Math.min.apply(null, arr);
            if (effect[resonate_level[index - 1]] != effect[min]) {
                //删除原来特效
                mgr.remove(eff.acupoint_eff[index - 1]);
                logic.createEff(index - 1, min, 0);
            }
            resonate_level[index - 1] = min;


            let type = prop.index_soul_info[soul_index][0],
                level = prop.index_soul_info[soul_index][1];
            let pre_attr = soul_level_up[type][level - 1].attr
            let now_attr = soul_level_up[type][level].attr;
            globalSend("attrTip", {
                words: `${attribute_config[now_attr[0]]} +${Common_m.decimalToPercent(now_attr[1] - pre_attr[1])}`
            })
            logic.countCost();
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
        })
};

/**
 * 精元转换
 * @param index 待转换精元在背包里的位置
 * @param count 转换数量
 * @param target_id 目标精元id
 */
const convertSoul = function (index, count, target_id) {
    let arg = {
        "param": {
            "index": index,
            "count": count,
            "target_id": target_id
        },
        "type": "app/prop/soul@turn"
    };
    soulNet(arg)
        .then((data: any) => {
            let prop = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            let award = Common_m.mixAward(prop);
            bagSoul = logic.getSoulInBag();
            targetSoul[1] = targetSoul[1] + award.bag[0].count;
            thisSoul = null;
            targetSoul = null;
            change_num = 1;
            globalSend("attrTip", {
                words: `转换成功`
            });
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
        })
};

//初始化初始数据
const initData = function () {
    logic.selectAcupoint(1);
    logic.selectSoul(0);
}
// 监听人物money变化
listen("player.money", () =>{
    forelet.paint(getData());
});
//读取基本数据
listenBack("app/prop/soul@read", (data) => {
    let num = 0;
    for (let arr of data.soul_info) {
        arr.forEach(v => {
            num += v[1];
        });
    }
    updata("soul", data);
    updata("soul.num", num);
    //forelet.paint(getData());
})

