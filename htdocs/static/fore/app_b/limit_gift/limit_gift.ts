//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB, insert } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { Util } from "app/mod/util";
//配置表
import { time_limit_gift } from "cfg/c/time_limit_gift";
import { pay } from "app_b/recharge/pay"

export const forelet = new Forelet();

insert("limit_gift", {});

/**
 * 读取数据
 */
listenBack("app/buy/limit_gift@read", (data) => {
    updata("limit_gift", data);
    if (hasLimitGift(data)) {
        forelet.paint(getData());
    }
});

let gift_data: any = {
    "time_limit_gift": time_limit_gift,
    "Util": Util,
    "Pi": Pi
},
    has_gift = false;
/**
 * it1
 */
const getData = function () {
    gift_data.limit_gift_record = getDB("limit_gift.limit_gift_record");
    gift_data.recharge_record = getDB("limit_gift.recharge_record");
    gift_data.player = getDB("player");
    gift_data.has_gift = has_gift;
    return gift_data;
}

export class LimitGift extends Widget {
    //关闭
    goback(arg) {
        close(arg.widget);
    }
    //查看(打开窗体)
    lookAward() {
        forelet.paint(getData());
        open("app_b-limit_gift-award-award");
    }
    //充值
    recharge() {
        recharge();
    }
    //领取奖励
    getAward() {
        getAward();
    }
    //倒计时结束
    timeEnd() {
        has_gift = false;
        forelet.paint(getData());
    }
    //显示物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
}

/**
 * 判断礼包是否存在(时间过了、已领奖)
 */
const hasLimitGift = function (data) {
    let gift = time_limit_gift[data.limit_gift_record[0]];
    let start_time = data.limit_gift_record[1];
    let is_get = data.limit_gift_record[2];
    let now_time = Util.serverTime(true);
    if (gift && (now_time < (gift.limit_time + start_time)) && (is_get === 0)) {
        has_gift = true;
        return true;
    }
    has_gift = false;
    return false;
}

/**
 * 礼包充值
 */
const recharge = function () {
    let id = time_limit_gift[gift_data.limit_gift_record[0]].prop_id;
    pay(id, "limit_gift", 1);
};

/**
 * 领取奖励
 */
const getAward = function () {
    let arg = {
        "param": {},
        "type": "app/buy/limit_gift@award"
    };
    net_request(arg, (data) => {
        if (data.error) {
            globalSend("screenTipFun", {
                words: `通讯失败`
            });
            return;
        }
        let w = forelet.getWidget("app_b-limit_gift-award-award");
        if (w) {
            close(w);
        }
        let prop:any = Common.changeArrToJson(data.ok);
        let result = Common_m.mixAward(prop);
        result.auto = 1;
        globalSend("showNewRes", {
            result, function(result1) {
                result1.open();
            }
        });
        updata("limit_gift.limit_gift_record", prop.limit_gift_record);
        hasLimitGift(prop);
        forelet.paint(getData());
    })
}
 
/**
 * 玩家充值推送
 */
net_message("limit_gift_recharge", (msg) => {
    updata("limit_gift.recharge_record", msg.recharge_record);
    has_gift = true;
    forelet.paint(getData());
});

/**
 * 限时礼包推送
 */
net_message("limit_buy", (msg) => {
    updata("limit_gift.limit_gift_record", msg.limit_gift_record);
    has_gift = true;
    forelet.paint(getData());
});
