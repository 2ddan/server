//导入模块
//pi
//mod
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
//app
import { net_request, net_send, net_message } from "app_a/connect/main";
import { updata, get } from "app/mod/db";

// ============================= 导出
/**
 * @description 全局广播
 */
export const globalReceive: any = {
    pay : (msg) => {
        pay(msg.id,msg.rechargeId,msg.count);
    }
};
/**
 * @description 支付接口
 * @param {number} goodsId 商品id
 * @param {number} count 购买数量
 */
export const pay = (goodsId,rechargeId,count?) =>{
    let msg = { "param": {"body":goodsId,"recharge_id":rechargeId,"count":count || 1}, "type": "app/pay@pay" };
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
}

// =================================== 立即执行
net_message("pay_back", function (msg) {
    let obj:any = Common.changeArrToJson(msg.ok);
    Common_m.payAward(obj.award);
    let rmb = get("player.total_recharge");
    updata("player.total_recharge", rmb - 0 + obj.curr_recharge);
});

