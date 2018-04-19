import { first_pay_gift } from "cfg/c/first_pay_gift";
import { Pi, globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { Common } from "app/mod/common";
import { data as localDB, updata, get as getDB, listen } from "app/mod/db";
import { piOpen, piClose } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request } from "app_a/connect/main";

import { Common_m } from "app_b/mod/common";
import { currency } from "cfg/c/recharge_diamond";

//导入充值
import { pay } from "app_b/recharge/pay"

//==================================导出
export const forelet = new Forelet()

export const globalReceive: any = {
    gotoFirstGift: (msg) => {
        forelet.paint(getData.first());
        piOpen("app_c-activity-first_pay-first_pay");
    }
}
export class first_pay_w extends Widget {
    goback(arg){
        piClose(forelet.getWidget("app_c-activity-first_pay-first_pay"));
    }
    //充值/领奖
    getFirst = (arg) => {
        if(arg===1){//1充值,0领奖
            piClose(forelet.getWidget("app_c-activity-first_pay-first_pay"));
            pay(currency[0].prop_id,currency[0].prop_id,1);            
            return;
        }
        let that = this;
        let recharge = getDB("recharge"),
            _rmb = first_pay_gift[0].rmb_level,
            msg = { param: { "type": _rmb }, type: "app/buy@first_gift" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            }
            let _data: any = Common.changeArrToJson([data.ok]),
                result: any = Common_m.mixAward(_data);
                result.auto = 1;
            globalSend("showNewRes", {
                result, function(result){
                    result.open();
                }
            }); 
            updata("recharge.first_pay_gift_state", [_rmb,Util.serverTime()]);
            piClose(forelet.getWidget("app_c-activity-first_pay-first_pay"));
        })
    }

    // //物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
}

// ==================================== 本地



let getData: any = {};
getData.first = () => {
    let _data: any = {};
    _data.first_pay_gift = first_pay_gift[0];
    _data.Pi = Pi;
    _data.recharge = getDB("recharge");
    _data.player = getDB("player");    
    return _data;
};
listen("recharge.first_pay_gift_state",()=>{
    forelet.paint(getData.first());
})