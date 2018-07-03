import * as piSample from "app/mod/sample";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { Common } from "app/mod/common";
import { updata, get as getDB, listen, insert } from "app/mod/db";
import { listenBack } from "app/mod/db_back";
import { Pi, globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { vip_advantage } from "cfg/c/vip_advantage";
import { net_request } from "app_a/connect/main";
import { Common_m } from "app_b/mod/common";


export const forelet = new Forelet();
/**
 * @description 导出给组件用的forelet
 * @example
 */
var 
    allBagPropsArr = [],
    select = [],//筛选
    page = 1,
    maxPage = 1,
    newResCallBack,
    tabswitch = "equip",
    isChoose = false,
    smithyMake = 0,
    propRes = null;
var newAutoData;

//获取背包物品数量
var getBagPropsCount = function () {
    var count = 0;
    allBagPropsArr = getDB("bag");
    for (var i = 0; i < allBagPropsArr.length; i++) {
        if (allBagPropsArr[i]) count++;
    }
    return count;
};

// coin>rune_chip>activity>rune>ep_level>ep_star>ep_wash>skill_level>stone>soul>key>donate>box
const type_value = {
    coin: 1,
    rune_chip: 2,
    activity: 3,
    rune: 4,
    ep_level: 5,
    ep_star: 6,
    ep_wash: 7,
    skill_level: 8,
    stone: 9,
    soul: 10,
    key: 11,
    donate: 12,
    box: 13
}
//背包物品排序
const bagPropSort = (a, b) => {
    if (a.type === b.type) {
        return a.sid - b.sid;
    } else {
        let a_num = findOrder(a.type);
        let b_num = findOrder(b.type);
        return a_num - b_num;
    }
}
const findOrder = function (type) {
    let index;
    if (type_value[type]) {
        index = type_value[type];
    } else if (type.indexOf("coin") >= 0) {
        index = 1;
    } else {
        index = 20;
    }
    return index;
}

//背包装备排序
const bagEquipSort = (a, b) => {
    //let useA = (a.use_mode && a.use_mode != -1) ? 1 : 0;
    //let useB = (b.use_mode && b.use_mode != -1) ? 1 : 0;
    //let use = useA - useB;
    let qu = a.quality - b.quality;
    let level = (a.level || 1) - (b.level || 1);
    let slot = -((a.slot || 0) - (b.slot || 0));
    let grade = (a.grade || 0) - (b.grade || 0);
    let id = a.id - b.id;
    //if (use > 0) return -1;
    //else if (use < 0) return 1;
    if (qu > 0) return -1;
    else if (qu < 0) return 1;
    else if (level > 0) return -1;
    else if (level < 0) return 1;
    else if (slot > 0) return -1;
    else if (slot < 0) return 1;
    else if (grade > 0) return -1;
    else if (grade < 0) return 1;
    else if (id > 0) return -1;
    else if (id < 0) return 1;
    else return 0;
}
//获取bag页面数据
const getBagHtmlData = function () {
    var _data: any = {};
    _data.tabswitch = tabswitch;
    _data.player = getDB("player");
    // _data.res = getDB("bag",[]).filter(function(x){return x});
    _data.stage = getDB("mission");
    _data.count = getBagPropsCount();
    _data.bagCount = 1;
    _data.maxPage = maxPage;
    _data.page = page;
    _data.isChoose = isChoose;
    _data.smithyMake = smithyMake;
    _data.propRes = propRes;
    _data.forelet = forelet;
    // _data.bagPropSort = bagPropSort;
    _data.allProp = allTabProp(getDB("bag", []));
    return _data;
};

//初始化基础数据
var initBagData = function (data) {
    "use strict";
    var propArr = [];
    for (var i = 0; i < data.length; i++) {
        if (!data[i]) {
            propArr[i] = 0;
            continue;
        }
        propArr[i] = piSample.decode(data[i], Pi.sample);
        //propArr[i] = calc_attr.getEquipAttr(propArr[i]);

        propArr[i].index = i;//位置
    }
    return propArr;
};
//读取背包基础数据
var readBagBaseData = function (data) {
    allBagPropsArr = initBagData(data);
    //将数据放入数据库
    Common.upDataDbData("bag", allBagPropsArr);
};
const getNewRes = function (msg) {
    var _data: any = {},
        newMsg = msg;
    _data.player = msg.player;
    _data.res = getDB("bag");
    // _data.Move_mark = Move_mark;
    for (var k in newMsg) {
        if (newMsg[k]) _data[k] = newMsg[k];
    }
    return _data;
};

/*** forelet 初始化 ***/

/********************** 前台点击事件 **********************/
//页面切换
// const changeColumns = (msg) => {
//     if (tabswitch != msg) select = [];
//     tabswitch = msg;
//     page = 1;
//     forelet.paint(getBagHtmlData());
//     // Common.updataHtml(forelet,"app_b-bag-main-bag_m",getBagHtmlData());
// };


//获取当前Tab类型的所有物品
export const allTabProp = (arr) => {
    let prop = [[], []];
    arr.forEach(v => {

        if (v && v.type != "equip" && v.type != "weapon" && v.type != "gest" && v.type != "cloth" && v.type != "pet") {
            prop[0].push(v);
        }
        if (v && v.type == "equip") {
            prop[1].push(v);
        }
    });
    prop[0] = prop[0].length && prop[0].sort(bagPropSort) || null;

    prop[1] = prop[1].length && prop[1].sort(bagEquipSort) || null;
    return prop;
}

//使用道具 arg为物品在背包中的位置
const usePropx = function (arg, callback) {
    "use strict";
    arg = arg.split("-");
    var _prop = getDB("bag")[arg[0] - 0],
        _use = function (select_prop) {
            net_request({ "param": { "index": arg[0] - 0 + 1, "count": arg[1] - 0, "choose": arg[2] - 0 ? (arg[2] - 0) : 0 }, "type": "app/prop/use@use" }, function (data) {
                if (data.error) {
                    //提示
                    // if(data.error)Common.backThrow(data.why);                 
                    // if(data.reason) Common.backThrow(data.reason);                 
                    console.log(data.why);
                } else if (data.ok) {
                    //console.log("--------物品使用---------");
                    //console.log(data);
                    //更新道具，多个则数量-1，一个直接删除
                    //var p = Common.newTurn(null,[_prop]);
                    let result: any = Common.changeArrToJson(data.ok);
                    Common_m.deductfrom(result);
                    var prop: any = Common_m.mixAward(result);
                    if (select_prop.use_mode == 1) {
                        updata("player.level", result.role_level);
                        updata("player.exp", result.role_exp);
                    }
                    if (prop) {
                        prop.auto = 1;
                        showNewRes(prop, function (result) {
                            result.open();
                        });
                    }
                    if (callback) callback();
                    forelet.paint(getBagHtmlData());
                }
            });
        };
    _use(_prop);
};



//出售道具 arg为物品在背包中的位置
const sellPropx = function (arg, e?) {
    "use strict";
    arg = arg.split("-");
    var _prop = getDB("bag")[arg[0] - 0],
        fun_sell = function (select_prop) {
            net_request({ "param": { "index": arg[0] - 0 + 1, "count": arg[1] - 0 }, "type": "app/prop/use@sell" }, function (data) {
                if (data.error) {
                    //提示
                    // if(data.error)Common.backThrow(data.why);                 
                    // if(data.reason) Common.backThrow(data.reason);                 
                    console.log(data.why);
                } else if (data.ok) {
                    let result: any = Common.changeArrToJson(data.ok);
                    Common_m.deductfrom(result.cost);
                    var prop: any = Common_m.mixAward(result.award);
                    if (prop) {
                        prop.auto = 1;
                        showNewRes(prop, function (result) {
                            result.open();
                        });
                        forelet.paint(getBagHtmlData());
                    }

                }
            });
        };
    fun_sell(_prop);

}



/***************** 外部接口 **************/
export const globalReceive: any = {
    gotoBag: (msg) => {
        forelet.paint(getBagHtmlData());
        open("app_b-bag-main-bag");
    },
    showNewRes: (data) => {
        showNewRes(data.result, data.function)
    },
    useProp: (msg) => {
        usePropx(msg.arg, msg.cb);
    },
    reclaimEnd: () => {
        forelet.paint(getBagHtmlData());
    }
}
/*
 * @param
 * msg new{"bag":{index:number,.....},"player":{exp:新增经验,cash:新增钻石,....}
 * callback : ({open:function(){打开新物品窗体},close:function(){关闭新物品窗体}})源页面回调
 * */

export const showNewRes = function (msg, callback) {
    "use strict";
    console.log("--------------包裹接收收获新装备-------------");
    var arg = "app_b-bag-new_res-new_auto";
    let w: any = forelet.getWidget(arg);
    if (w) close(w);
    msg.auto = arg;
    newAutoData = msg;
    // 返回显示|关闭方法
    if (callback) {
        callback({
            "open": function (callBack) {
                if (msg.bag || msg.player || msg.clothes) {
                    open(arg, getNewRes(msg));
                }
                if (callBack)
                    newResCallBack = callBack;
            },
            "close": function () {
                let w = forelet.getWidget(arg);
                if (w) close(w);
                w = undefined;
            }
        });
    }
};
//更新包裹数据
export const toReadBag = function () {
    "use strict";
    // readBagBaseData();
};

//使用道具
export const useProp = function (msg, callback) {
    "use strict";
    usePropx(msg, callback);
};

//出售道具
export const sellProp = function (msg) {
    "use strict";
    sellPropx(msg);
};
export class bag_m extends Widget {
    goback = (msg) => {
        close(msg.widget);
    };
    changeColumns = (msg) => {
        if (tabswitch == msg.type_m) return;
        tabswitch = msg.type_m;
        forelet.paint(getBagHtmlData());
    };
    /** 显示物品详情 **/
    objectInfoShow = (arg) => {
        globalSend("equipChange", { index: arg, type: 0 });
    };
    attach(): void {
        var arg = "app_b-bag-new_res-new_auto";
        let w: any = forelet.getWidget(arg);
        if (w) {
            let timer = setTimeout(function () {
                close(w);
                clearTimeout(timer);
                timer = null;
            }, 1800);
        }
    }
    openRL(): void {
        globalSend("open_reclaim");
    };
    extensionBag(): void {
        let player = getDB("player");
        if (vip_advantage[player.vip + 1]) {
            globalSend("popTip", {
                title: "<div>提升至<span style='color:#ff9600'>VIP" + (player.vip + 1) + "</span>可扩展至" + vip_advantage[player.vip + 1].equip_count + "个装备格</div>",
                btn_name: ["充值", "取消"],
                cb: [
                    //确认
                    () => {
                        globalSend("gotoRecharge");
                    },
                    () => { }
                ]
            })
        } else {
            globalSend("screenTipFun", { words: "已达到最大装备格!" });
        }
    };

    //查看物品详情
    showPropInfo = (arg) => {
        let goto = Pi.sample[arg].goto;
        if (goto && goto >= 1) {
            globalSend("showPropInfo", { "sid": arg, "flag": "bag" });
        } else {
            globalSend("showPropInfo", arg);
        }
    }
};
// ================================ 立即执行
/**
 * @description 初始化数据库背包字段
 */
insert("bag", []);
/**
 * @description 监听背包数据变化
 */
// listen("bag", function () {
//     forelet.paint(getBagHtmlData());
// });
/**
 * @description 获取背包数据
 */
listenBack("app/prop@read", readBagBaseData);
/**
 * @description 设置首次打开监听，并设置it1
 */
forelet.listener = (cmd, w) => {
    if (cmd !== "first_paint") return;
    forelet.paint(getBagHtmlData());
};

