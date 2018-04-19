import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { data as localDB,get as getDB, updata, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { net_request ,net_message} from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { pay } from "app_b/recharge/pay";

//导入配置

import { investment_base } from "cfg/c/investment_base";
import { investment_list } from "cfg/c/investment_list";

export const forelet = new Forelet();
export class investment extends Widget {
    
    //查看物品详情
    showPropInfo = (arg) => {
        globalSend("showOtherInfo",arg)
    }
    // 领奖
    getAward(type,index){
        if(type == 2){
            if(!index){
                globalSend("screenTipFun", {
                     words: "您的等级不足!" 
                });
                return;
            }
            levelAward(index);
            return;
        }
        buyAward();
    }
    //购买
    buy(goodsId,rechargeId) {
        // let msg = { "param": {}, "type": "app/pay@test" };
        // net_request(msg, (data) => {
           
        // })
        pay(goodsId,rechargeId,1);
    }
}
//==========================本地
const getData = () => {
    let temp: any = {};
    temp.Pi = Pi;
    temp.player = getDB("player");
    let key = Object.keys(investment_base)[0];
    temp.investment_base = investment_base[key];
    temp.investment_list = investment_list[key];
    temp.baseData = getDB("investment");
    return temp;
}


const levelAward = (index) => {//type: 1 购买基金领奖 2 基金等级领奖; "index" : 领取基金等级奖励的位置(1,2,3,4……)，type=1时不需要index
    let msg = { "param": {"type":2 ,"index": index }, "type": "app/buy/investment@award" };
    net_request(msg, (data) => {
        if (data.error) {
            console.log(data.why);
            console.log(data.error);
        } else if (data.ok) {
            let prop: any = Common.changeArrToJson(data.ok);
            
            updata("investment.award_record", prop.award_record);
            forelet.paint(getData());
            let result: any = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            });
        }
    })
}
const buyAward = () => {
    let msg = { "param": {"type":1 }, "type": "app/buy/investment@award" };
    net_request(msg, (data) => {
        if (data.error) {
            console.log(data.why);
            console.log(data.error);
        } else if (data.ok) {
            let prop: any = Common.changeArrToJson(data.ok);
            
            updata("investment.buy_record", prop.buy_record);
            forelet.paint(getData());
            let result: any = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            });
        }
    })
}
/**
 * 读取后台数据
 */
listenBack("app/buy/investment@read", (data) => {
    updata("investment",data);
    forelet.paint(getData());
})


forelet.listener = (cmd: string, widget: Widget): void => {
    if (cmd === "add") {
        forelet.paint(getData());
    }
}

//监听活动推送广播消息
net_message("investment", (msg) => {
    updata("investment",msg);
    forelet.paint(getData());
})