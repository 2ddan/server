import { get as getDB} from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common"; 
import { Common_m } from "app_b/mod/common";
import { net_request} from "app_a/connect/main";
import { choose_box } from "./item_box";
import { open, close } from "app/mod/root";
import { base_cfg } from "cfg/a/base_cfg";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { config_buy_money } from "cfg/b/config_buy_money";
import { item_usefor } from "cfg/c/item_usefor";


export const forelet = new Forelet();

let
    changeBack,
    chooseIndex,//选中的要开启的宝箱
    boxCallback,//显示宝箱界面回调方法
    propObj: any,//宝箱内物品信息显示
    propObjChoose: any,
    _count = 1,
    choose: any = { "callback": null, "count": null, "maxCount": null };//chooseCount--选择物品数量界面，加减数量时，记录的数量,  countCallback--选择物品数量界面回调方法

//得到页面显示数据
var getDataChoose = function () {
    var _data: any = {};
    _data = JSON.parse(JSON.stringify(propObjChoose));
    _data.choose_box = choose_box;
    _data.chooseIndex = chooseIndex;
    return _data;
};
var changMoneyDate = function (diamond, count?, cost?) {
    var _data: any = {};
    _data.maxCount = Math.floor((diamond || 0) / base_cfg["lowDiamondUnit"].value);
    _data.callback = changMoneyx;
    _data.costFun = changeMoneyCost;
    _data.config_buy_money = config_buy_money;
    _data.count = count ? count : 1;
    _data.cost = cost ? cost : base_cfg["lowDiamondUnit"].value;
    _data.costType = "diamond";
    return _data;
}
var changeMoneyCost = function (num) {
    return num * base_cfg["lowDiamondUnit"].value;
}

var changMoneyx = function (num) {
    net_request({ "param": { "count": num }, "type": "app/role@exchange" }, function (data) {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why);
            // if (data.reason) Common.backThrow(data.reason);
            console.log(data.why);
            return;
        }
        let prop: any = Common.changeArrToJson(data.ok);
        //扣除花费
        Common_m.deductfrom(prop);
        let result = Common_m.mixAward(prop);
        globalSend("screenTipFun", { words: `获得${result.player.money}银两` });
        let w = forelet.getWidget("app_b-prop_d-buy_money-buy_money");
        if (w)
            close(w);
        if (changeBack) changeBack();
    });
}
/************************ 前台操作 ***********************/

const closeW = (arg) => {
    let w: any = forelet.getWidget(arg);
    if (w) {
        w.ok ? w.ok() : (w.cancel ? w.cancel() : null);
    }
    _count = 1;
    add_count = 0;
}
export const globalReceive: any = {
    "showBagPropInfo": (msg) => {
        showBagPropInfo(msg);
    },
    "gotoBuyMoney": (msg) => {
        changMoney(msg ? msg.arg : null, msg ? msg.fun : null);
    },
    "getSpirit": () => {
        getSpirit();
    },
    "showBox": (r) => {
        showBox(r)
    },
    "showOtherInfo": (arg) => {
        let str = arg;
        if (String(arg).indexOf("task") !== -1) {
            arg = arg.split(",")[0];
        }
        if (Pi.sample[arg].type === "equip") {
            globalSend("gotoEquipUnknown", arg);
            return;
        }
        showPropInfo(str);
    },
    "showPropInfo": (arg) => {
        if (Object.prototype.toString.apply(arg) == "[object Object]") {
            let goto_id = Pi.sample[arg.sid].goto;
            let obj = null;
            if (goto_id) {
                obj = item_usefor[goto_id];
            }
            cb = arg.cb;
            showPropInfo(arg.sid, obj);
        } else {
            if (Pi.sample[arg].type === "equip") {
                globalSend("gotoEquipUnknown", arg);
                return;
            } else if (Pi.sample[arg].use_mode != -1 && Pi.sample[arg].use_mode === "choose") {
                showBagPropInfo(Pi.sample[arg]);
                return;
            } else if (Pi.sample[arg].use_mode != -1) {
                showBagPropInfo(Pi.sample[arg]);
                return;
            }
            showPropInfo(arg);
        }
    }
}

/************************* 外部接口 ************************/
export const showBagPropInfo = function (prop) {
    if (prop.use_mode == "choose") {
        propObjChoose = prop;
        chooseIndex = null;
        open("app_b-prop_d-prop_choose", getDataChoose());
        return;
    }
    propObj = prop;
    open("app_b-prop_d-prop_d", JSON.parse(JSON.stringify(propObj)));
    changeBack = prop.callback;
};


/*显示宝箱详情
* @param msg--{"title":标题,"content":宝箱内容}
* @param callback --- 回调方法
* */
export const showBox = function (msg) {
    choose = {};
    boxCallback = msg.callback;
    open("app_b-prop_d-get_box", msg);
};

/* 弹出物品数量选择界面
 * @param msg--{"costType":花费类型,"maxCount":选择最大数量限制,
 "goods":{"money":数量,"prop":[物品id,数量]}，money和prop只能又一个,
 "callback":点击确认时的回调方法,"costFun":消耗道具（代币，元宝，金币）所用的方法,
 "text":描述，"title":标题}
 * @param callback --- 回调方法
 * */
export const toChooseCount = function (msg) {
    choose = msg;
    choose.count = 1;
    open("app_b-prop_d-choose_count", choose);
};
export const changMoney = function (msg?, callback?) {
    choose = {};
    var player = getDB("player");
    changeBack = typeof callback === "function" ? callback : null;
    if (player.diamond < base_cfg["lowDiamondUnit"].value) {
        globalSend("screenTipFun", { words: `您的元宝不足，无法购买银两` });
        return;
    }
    open("app_b-prop_d-change_money", changMoneyDate(player.diamond));
};
export const getSpirit = function (msg?, callback?) {
    var prop = getDB("bag*sid=100038");
    prop = prop.length ? prop.pop() : 0;
    if (prop) {
        showBagPropInfo({ "bag": 1, "index": prop.index, "obj": prop, "sourceType": "other" });
    } else {
        globalSend("goIntoGetWay", Pi.sample[100038].drop_location);
    }
};

/**
 * 显示物品详情 伙伴，神兵，专属，装备
 * @param sid 道具ID，在wild发送过来的是 sid + "task",需要特殊处理
 */
export const showPropInfo = (sid, usefor?) => {
    let arr = [];
    let type = null;
    if (String(sid).indexOf("task") !== -1) {
        arr = sid.split(",");
        sid = arr[0];
        type = arr[1];
    }
    let prop = Pi.sample[sid],
        count = 0;
    if ((sid == 100001) || (sid == 100002)) {
        let player = getDB("player");
        (sid == 100001) && (count = player.money);
        (sid == 100002) && (count = player.diamond);

    } else {
        if (Common.getBagPropById(sid)) {
            let item: any = Common.getBagPropById(sid);
            count = item[1].count || 1;
        }else if(prop.type === "rune" && !Common.getBagPropById(sid)){
            //符文特殊处理
            let rune = getDB("rune.rune_set");
            if(rune && rune.join(",").indexOf(sid+"") !== -1){
                count = 1;
            }
        }
    }
    
    open("app_b-prop_d-prop_info", [sid, count, type, usefor]);
};

/**
 * 显示可选择的物品
 * @param sid 道具ID
 */
export const showChooseBox = (sid) => {

}

// 物品功能跳转 [回调]
let cb = null;

/**
 * 显示可批量使用的物品
 * @param sid 道具ID
 */
export const showAlotofUse = (sid) => {

}
let add_count = 0;
export class prop_m extends Widget {
    gotoFun = (name) => {
        let arg = name.split(",");
        globalSend(arg[0], arg[1]);
        cb && cb();
        cb = null;
        let w = forelet.getWidget("app_b-prop_d-prop_info");
        if(w){
            close(w);
        }
    }
    goback = function (arg) {
        close(arg.widget);
    };
    selectcount = (obj) => {
        _count = obj.count
        if (choose.costFun && Common.isExist(forelet, "app_b-prop_d-choose_count")) {
            let w = forelet.getWidget("app_b-prop_d-choose_count");
            choose.count = _count;
            w.setProps(choose);
            w.paint();
        } else if (Common.isExist(forelet, "app_b-prop_d-change_money")) {
            var player = getDB("player");
            let w = forelet.getWidget("app_b-prop_d-change_money");
            let _data = changMoneyDate(player.diamond, _count, changeMoneyCost(_count));
            choose.maxCount = _data.maxCount;
            w.setProps(_data);
            w.paint();
        }
        if (_count == choose.maxCount) {
            if (add_count) globalSend("screenTipFun", {
                words: "已达最大!"
            });
            add_count++;
        }
    }
    //arg为物品在背包中的位置 卖东西
    sellPropx = function (arg) {
        let w = forelet.getWidget("app_b-prop_d-prop_d");
        close(w);
        w = undefined;
        // popTipFun({
        //     words: "确定出售吗",
        //     callback: [["确认", function () {
        //         globalSend("sellProp", arg + "-" + _count);
        //     }]]
        // });
    };
    //arg为物品在背包中的位置
    usePropx = function (arg) {
        var cfg = propObjChoose ? propObjChoose : propObj;
        var k = cfg.use_mode == "choose" ? (arg + "-" + _count + "-" + chooseIndex) : (arg + "-" + _count);
        if (cfg.use_mode == "choose" && !chooseIndex) {
            globalSend("screenTipFun", {
                words: "请选择其中一个宝箱"
            });
            return;
        }
        globalSend("useProp", {
            "arg": k, cb: () => {
                if (changeBack) changeBack();
            }
        });
        closeW("app_b-prop_d-prop_d");
        closeW("app_b-prop_d-prop_choose");
    };
    resolveClick = function (msg) {
        msg = msg.split(",");
        closeW("app_b-prop_d-prop_d");
        globalSend("gotoBagReclaim", msg[1]);
    }
    gotoRoleClick = function () {
        closeW("app_b-prop_d-prop_d");
        globalSend("gotoFriend", null);
    }
    gotoGestClick = function () {
        closeW("app_b-prop_d-prop_d");
        globalSend("gotoSoul", null);
    }
    chooseIndexClick = function (msg) {
        if (chooseIndex != msg - 0) chooseIndex = msg;
        else chooseIndex = null;
        let w = forelet.getWidget("app_b-prop_d-prop_choose");
        w.setProps(getDataChoose());
        w.paint();
    }
    //物品详情objectInfoShow
    propInfoShow = function (arg) {
        // showBagPropInfo({ "index": null, "obj": Pi.sample[arg] });
        showPropInfo(arg);
    };
    submitBuy = function (arg, num) {
        if (choose.callback) choose.callback(choose.index, _count);
        else changMoneyx(_count)
        closeW("app_b-prop_d-choose_count");
        closeW("app_b-prop_d-change_money");
    }
    //显示宝箱界面，”领取奖励“事件方法
    getCallback = function (msg) {
        if (boxCallback) {
            boxCallback(msg - 0);
            boxCallback = null;
            closeW("app_b-prop_d-get_box");
        }
    }
    /**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
    destroy(): boolean {
        //选择宝箱时，关闭查看物品详情还是关闭选择界面
        if(this && this.name === "app_b-prop_d-prop_info"){
            this.tpl = undefined;
            this.forelet && this.forelet.removeWidget(this);
            return false;
        }
        if (propObj) {
            propObj = undefined;
        }else {
            chooseIndex = undefined;
            propObjChoose = undefined;
            _count = 1;
            add_count = 0;
        }

        if (!this.tpl)
            return false;
        this.tpl = undefined;
        if (this.resTab) {
            this.resTab.timeout = this.resTimeout;
            this.resTab.release();
        }
        this.forelet && this.forelet.removeWidget(this);
        return true;
    }
}
