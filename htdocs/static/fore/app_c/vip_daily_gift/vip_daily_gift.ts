import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { data as localDB,get as getDB, updata, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";

//导入配置

import { vip_daily_gifts } from "cfg/b/vip_daily_gifts";

export const forelet = new Forelet();
export class gift_main_w extends Widget {
    
    //查看物品详情
    showPropInfo = (arg) => {
        globalSend("showOtherInfo",arg)
    }
    //获取每日礼包
    getDailyGift = (arg) => {
        let msg = { "param": {}, "type": "app/buy@vip_daily" };
        net_request(msg, (data) => {
            if (data.error) {
                console.log(data.why);
                console.log(data.error);
            } else if (data.ok) {
                updata("recharge.daily_gift_state",1);
                forelet.paint(vip_data());
                let prop:any = Common.changeArrToJson(data.ok);
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                })
            }
        })
    }
    //去充值页面
    gotoRecharge() {
        globalSend("gotoRecharge");
    }
}
//==========================本地
const vip_data = () => {
    let temp: any = {};
    temp.Pi = Pi;
    temp.vip = getDB("player.vip");
    temp.dailyData = vip_daily_gifts;
    // temp.vipUpNeed = recharge_vip_upgrade;
    temp.vip_state = getDB("recharge.daily_gift_state")
    return temp;
}

let oldVip = null;

//vip等级提升可再领一次奖励
listen("player.vip", () => {
    let vip = getDB("player.vip");
    if(oldVip === null){
        oldVip = vip;
        return;
    }
    if(vip >  oldVip ){
        updata("recharge.daily_gift_state", 0);
        forelet.paint(vip_data());
        oldVip = vip;
    }
})

/**
 * @description 设置首次打开监听，并设置it1
 */
forelet.listener = (cmd,w) => {
    if(cmd !== "add")return;
    forelet.paint(vip_data());
};