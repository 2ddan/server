import { Pi, globalSend } from "app/mod/pi";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { get as getDB, updata} from "app/mod/db";
import { net_request} from "app_a/connect/main";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";

import { cfg_super_gifts } from "cfg/b/vip_super_gifts";
import { vip_advantage } from "cfg/c/vip_advantage";

// ============================= 导出
export const forelet = new Forelet();

/**
 * @description 全局广播
 */
export const globalReceive: any = {
    vipUp : (msg) => {
        forelet.paint(getData());
       open("app_b-recharge-vip_up-vip_up",msg);
    }
};

export const getData = () => {
    let temp: any = {};
    temp.Pi = Pi;
    temp.superData = cfg_super_gifts;
    temp.vip_advantage = vip_advantage;
    temp.career_id = getDB("player.career_id");
    temp.diamond = getDB("player.diamond");
    return temp;
};

/**
 * @description 导出组件
 */
export class Mail extends Widget {
    //显示物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
    //前往查看
    goToVip = () => {
        globalSend("goToVip");
        let w = forelet.getWidget("app_b-recharge-vip_up-vip_up");
        w && close(w);
    }
    //购买礼包
    superBuy = (arg) => {
       
        if (!arg) {
            globalSend("screenTipFun", { words: `元宝不足，前往充值！` });
            return;
        }
        

        let msg = { "param": { "level": arg }, "type": "app/buy@super_gift" };

        net_request(msg, (data) => {
            let w = forelet.getWidget("app_b-recharge-vip_up-vip_up");
            w && close(w);
            if (data.error) {
                console.log(data);
                return;
            } else if (data.ok) {
               
                let prop = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                let info = getDB("recharge.super_gift_state");
                info[info.length] = [];
                info[info.length - 1][0] = arg;
                info[info.length - 1][1] = 1;
                updata("recharge.super_gift_state", info);
               
                globalSend("showNewRes", {
                    result, function (result) {
                        result.open();
                    }
                });
            }
        });
    };
}