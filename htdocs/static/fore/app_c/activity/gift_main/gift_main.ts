import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { data as localDB,get as getDB, updata, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { cfg_daily_gifts } from "cfg/b/vip_daily_gifts";
import { recharge_vip_upgrade } from "cfg/c/recharge_vip_upgrade"

export const forelet = new Forelet();
export class gift_main_w extends Widget {
    
    //显示物品详情
    propInfoShow = (arg) => {
        globalSend("showBagPropInfo", { "index": null, "obj": Pi.sample[arg] });
    };
    //获取每日礼包
    getDailyGift = (arg) => {
        let msg = { "param": {}, "type": "app/buy@vip_daily" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.error);
            } else if (data.ok) {
                updata("recharge.daily_gift_state", localDB.player.vip + 1, (data) => { });
                forelet.paint(vip_data());
                let prop: any = Common_m.mixAward(data.ok[1]);
                prop.auto = 1;
                // showNewRes(prop, (result) => {
                //     result.open();
                // })
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
    temp.dailyData = cfg_daily_gifts;
    temp.vipUpNeed = recharge_vip_upgrade;
    temp.vip_state = getDB("recharge.daily_gift_state")
    return temp;
}
forelet.listener = (cmd: string, widget: Widget): void => {
    if (cmd === "add") {
        forelet.paint(vip_data());
    }
}
//vip等级提升可再领一次奖励
listen("player.vip", () => {
    //if(localDB.recharge.daily_gift_state === localDB.player.vip ){
    if(13 === localDB.player.vip ){
        updata("recharge.daily_gift_state", 0, (data) => { });
        forelet.paint(vip_data());
    }
})
