import { first_pay_gift } from "cfg/c/first_pay_gift";
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { updata, get as getDB, listen } from "app/mod/db";
import { piOpen, piClose } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request, net_message } from "app_a/connect/main";

import { Common_m } from "app_b/mod/common";
//import { currency } from "cfg/c/recharge_diamond";

//导入充值
import { pay } from "app_b/recharge/pay"

let index = 4;

//==================================导出
export const forelet = new Forelet()

export const globalReceive: any = {
    gotoFirstGift: (msg) => {
        let arr = getDB("recharge.first_pay_gift_state");
        arr.length > 0 ? index = arr[0][0] : index = 4;
        forelet.paint(getData.first());
        piOpen("app_c-activity-first_pay-first_pay");
    }
}
export class first_pay_w extends Widget {
    //选择充值档次
    selectLevel(i) {
        if (index == i) {
            return;
        }
        let arr = getDB("recharge.first_pay_gift_state");
        if (arr.length > 0) {
            globalSend("screenTipFun", {
                words: `你已充值${first_pay_gift[arr[0][0]].rmb_level}元档`
            });
            return;
        }
        index = i;
        forelet.paint(getData.first());
    }
    goback(arg){
        piClose(forelet.getWidget("app_c-activity-first_pay-first_pay"));
    }
    //充值
    firstRecharge(i) {
        //piClose(forelet.getWidget("app_c-activity-first_pay-first_pay"));
        pay(first_pay_gift[i].id, "first_recharge_gift", 1);            
        return;
    }
    //领奖
    getAward(i) {
        let id = first_pay_gift[i].id;
        let arr = getDB("recharge.first_pay_gift_state");
        if (arr.length > 0 &&  arr[0][1] == 1) {
            globalSend("screenTipFun", {
                words: `奖励已领取`
            });
            return;
        }
        getAward(id);
    }
    // //物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
}

const getAward = function (id) {
    let msg = {
        param: {
            "prop_id": id
        },
        type: "app/buy@first_gift"
    };
    net_request(msg, (data) => {
        if (data.error) {
            // if (data.error) globalSend("screenTipFun", { words: data.error });
            // if (data.reason) globalSend("screenTipFun", { words: data.reason });
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        let _data: any = Common.changeArrToJson(data.ok),
            result: any = Common_m.mixAward(_data);
            result.auto = 1;
        globalSend("showNewRes", {
            result, function(result){
                result.open();
            }
        }); 
        updata("recharge.first_pay_gift_state.0.1", 1);
        piClose(forelet.getWidget("app_c-activity-first_pay-first_pay"));
    })
}


// ==================================== 本地



let getData: any = {};
getData.first = () => {
    let _data: any = {};
    _data.first_pay_gift = first_pay_gift;
    _data.Pi = Pi;
    _data.recharge = getDB("recharge");
    _data.player = getDB("player");
    _data.index = index; 
    return _data;
};
listen("recharge.first_pay_gift_state",()=>{
    forelet.paint(getData.first());
})
net_message("first_rechage_gift", (msg) => {
    console.log("首充推送:", msg);
    //let arr = getDB("recharge.first_pay_gift_state") || [];
    //arr.push(msg.first_pay_gift_state); 
    updata("recharge.first_pay_gift_state", msg.first_pay_gift_state);
    forelet.paint(getData());
});
