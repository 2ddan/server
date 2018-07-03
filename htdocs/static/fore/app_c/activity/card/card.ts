//导入模块
import { net_request} from "app_a/connect/main";
import { updata, get as getDB, listen } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Forelet } from "pi/widget/forelet";
import { Util } from "app/mod/util";
import { Widget } from "pi/widget/widget";
import { globalSend } from "app/mod/pi";
import { pay } from "app_b/recharge/pay"

//购买周卡，月卡
import { vipcard } from "cfg/c/recharge_buy_robolet";


export const forelet = new Forelet();


let cardPrefix = ["month_card", "annual_card"];


const getData = () => {
    let _data: any = {};
    _data.vipcard = vipcard;
    // _data.getEndDay = getEndDay;
    _data.Util = Util;
    _data.player = getDB("player");
    _data.recharge = getDB("recharge");
    return _data;
};

export const globalReceive: any = {
    pay_back: (r) => {
        let obj:any =Common.changeArrToJson(r); 
        if(obj && obj.curr_recharge)updata("player.total_recharge",getDB("player.total_recharge")+obj.curr_recharge);
        if(r[3]){
            for(var k in vipcard){
                if(vipcard[k].price==r[3][1]){
                    let _k = k=="0"?"player.month_card_due_time":"player.annual_card_due_time",
                        _t = getDB(_k) || Date.now()/1000;
                    updata(_k,_t+vipcard[k].vaild_time*24*60*60);
                    return;
                }
            }
        }
    }
}


export class recharge extends Widget {

    //购买周卡或者月卡
    buy_vipcard = (arg) => {//arg=>0:月卡,1:周卡
        let _item = vipcard[arg],
            money = _item.price,
            player = getDB("player"),
            due_time = player[cardPrefix[arg] + "_due_time"];

        // data.money = money;
        // data.type = _item.prop_id;
        // data.propCount = 1;       //数量
        // data.describe = _item;    //描述

        if (due_time && due_time > Util.serverTime(true)) {
            globalSend("screenTipFun", {  words: "不能重复购买!" })
            return;
        }
        if (player.rmb < money) {      
           pay(_item.prop_id, "card", 1);
        } else { 
            vipCard_conect(arg);
        }
    };
    //领取月卡
    receiveCard = (arg) => {
        let arr = ["month","annual"];
        if(getDB("recharge."+arr[arg]+"_card_receive_diamond")){
            globalSend("screenTipFun", { words: `请勿重复领取` });
            return;
        }
        vipCard_conect(arg, true);
    };
};

//购买||领取月卡
const vipCard_conect = (arg, receive?) => {
    let _item = vipcard[arg],
        money = _item.price,
        rmb = getDB("player.rmb"),
        player = getDB("player"),
        msg = {
            param: {
                "index": arg - 0 + 1,
                "type": (receive ? "get" : "buy")
            },
            type: "app/buy@robolet"
        };
    net_request(msg, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: `网络故障，通信失败` })
            console.log(data)
            return;
        }
        let _days = [30, 7],
            _data: any = Common.changeArrToJson(data.ok),
            result: any = Common_m.mixAward(_data);
            // updata("player.total_recharge",money-0+_item.price);         
        if (!receive) {
            if (player.vip < _data.vip_level && player.daily_gift_state) {
                updata("player.daily_gift_state", 0);
            }
            updata("player.vip", _data.award.vip_level);
            updata("player.vip_exp", _data.award.vip_exp);
            updata("player.rmb", rmb - money);
            updata("player." + cardPrefix[arg] + "_due_time", Util.serverTime(true) + _days[arg] * 24 * 60 * 60);
            globalSend("screenTipFun", { words: `购买成功` });
        } else {
            updata("recharge." + cardPrefix[arg] + "_receive_diamond", 1);
            // globalSend("screenTipFun", { words: `获得元宝${vipcard[arg]["diamond_count"]}` });
        }
        result.auto = 1;
        globalSend("showNewRes", {
            result, function(result) {
                result.open();
            }
        });
        //刷新页面
        forelet.paint(getData());
    });
};
/**
 * 计算到结束当天24时的剩余天数
 * @param s 结束时间（秒数）
 */
// const getEndDay =(s) =>{
//     let d1 = new Date().setHours(24,0,0,0),
//         d2 = new Date(s * 1000).setHours(24,0,0,0);
//     return (d2 - d1 )/(24 * 60 * 60 * 1000) - 1;
// }
//读取基本数据
// listenBack("app/buy@read", (_data) => {
//     updata("recharge", _data);
//     
// })
//周卡
listen("recharge.annual_card_receive_diamond", () => {
    forelet.paint(getData());
})
//月卡
listen("recharge.month_card_receive_diamond", () => {
    forelet.paint(getData());
})
forelet.listener = (cmd: string, widget: Widget): void => {
    if (cmd === "add") {
        forelet.paint(getData());
    }
}

listen("player.annual_card_due_time", () => {
    forelet.paint(getData());
});

listen("player.month_card_due_time", () => {
    forelet.paint(getData());
})