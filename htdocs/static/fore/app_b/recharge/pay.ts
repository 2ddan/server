//导入模块
//pi
//mod
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
//app
import { net_request, net_message } from "app_a/connect/main";
import { updata, get } from "app/mod/db";

// ============================= 导出
/**
 * @description 全局广播
 */
export const globalReceive: any = {
    pay : (msg) => {
        pay(msg.id, msg.type, msg.count);
    }
};

//测试
export const testPay = function (id, type, money) {
    let msg = {
        "param": {
            "prop_id": id,
            "type": type,
            "rmb":money
        },
        "type": "app/pay@test"
    };
    net_request(msg, function (data) {
        //通讯错误, 或者没有返回值
        if (data.error) {
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
        } else if (data.ok) {
            //console.log(data.ok);
            let result: any = JSON.parse(data.ok);
            Pi.pay(result.ok);
        }
    })
};

/**
 * @description 支付接口
 * @param {number} goodsId 商品id
 * @param {string} type 类型
 * @param {number} count 购买数量
 */
export const pay = (goodsId, type, count?) =>{
    // if(JSON.parse(Pi.localStorage.ptFrom).from === "soeasy"){
    if((window as any).pi_modules.load.exports.isNativeBrowser()){
        let msg = {
            "param": {
                "goods_id": goodsId,
                "type": type,
                "count":count || 1
            },
            "type": "app/pay@pay"
        };
        net_request(msg, function (data) {
            //通讯错误, 或者没有返回值
            if (data.error) {
                globalSend("screenTipFun", { words: data.why });
                console.log(data.why);
            } else if (data.ok) {
                //console.log(data.ok);
                let result: any = JSON.parse(data.ok);
                Pi.pay(result.ok);
            }
        })
    }else{
        globalSend("screenTipFun", { words: "充值尚未开放" });
    }
}

// =================================== 立即执行
net_message("pay_back", function (msg) {
    let obj:any = Common.changeArrToJson(msg.ok);
    if (obj.first_recharge) {
        updata("recharge.first_recharge", obj.first_recharge);
    }
    if (obj.annual_card_due_time) {
        updata("player.annual_card_due_time", obj.annual_card_due_time);
    }
    if (obj.month_card_due_time) {
        updata("player.month_card_due_time", obj.month_card_due_time);
    }
    Common_m.payAward(obj.award);
    let rmb = get("player.total_recharge");
    updata("player.total_recharge", rmb - 0 + obj.curr_recharge);
});

