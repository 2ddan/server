//导入模块
import { listenBack } from "app/mod/db_back";
import { net_request } from "app_a/connect/main";
import {  updata, get as getDB, listen, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Forelet } from "pi/widget/forelet";
import { open,close } from "app/mod/root";
import { Widget } from "pi/widget/widget";
import { Pi, globalSend } from "app/mod/pi";

import { pay } from "./pay"

//购买周卡，月卡
import { vipcard } from "cfg/c/recharge_buy_robolet";
//购买元宝
import { currency } from "cfg/c/recharge_diamond";
//vip等级对应需要的经验
import { recharge_vip_upgrade } from "cfg/c/recharge_vip_upgrade";


export const forelet = new Forelet();
insert("recharge", {
    "first_pay_gift_state":[]
});

let callbackFun,
    detail = [false,false];//是否显示详情

const getData = () => {
    let _data: any = {};
    _data.currency = currency;
    _data.player = getDB("player");
    _data.recharge = getDB("recharge");
    _data.vip_level = getDB("player.vip");
    _data.vip_exp = getDB("player.vip_exp");
    _data.detail = detail;
    _data.Pi = Pi;
    _data.vipcard = vipcard;
    _data.vipUpNeed = recharge_vip_upgrade[_data.vip_level].exp;
    _data.card = [ _data.player.annual_card_due_time,_data.player.month_card_due_time];//周卡，月卡
    return _data;
};

export const globalReceive: any = {
    gotoRecharge: () => {
        let w = forelet.getWidget("app_b-recharge-recharge");
        if(w){
            return;
        }
        detail = [false,false];
        forelet.paint(getData());
        //打开充值界面
        open( "app_b-recharge-recharge");
    }
}



export class recharge extends Widget {

    goback (arg) {
        close(arg.widget);
    }
    //打开vip界面
    vipDetail = () => {
        globalSend("goToVip");
    };
    //打开月卡界面
    gotoCard = () => {
        globalSend("gotoCard");
        let w = forelet.getWidget("app_b-recharge-recharge");
        if(w)
            close(w);
    };
    //月卡查看详情
    gotoDetail = (index) => {
        detail[index] = !detail[index] ;
        forelet.paint(getData());
    };
 
    buy_currency = (arg) => {
        let _item = currency[arg],
            money = _item.price;
        

        if ((getDB("player.rmb") - money) >= 0) {
            buyDiamond(arg);
        } else {
            //直接调用充值
            pay(_item.prop_id, "recharge", 1);
        }
    };

};

listen("player.vip",() => {
    forelet.paint(getData());
});

listen("player.vip_exp",() => {
    forelet.paint(getData());
});

listen("recharge.first_recharge", () => {
    forelet.paint(getData());
})


//购买元宝通讯
const buyDiamond = (arg) => {
    let _item = currency[arg],
        money = _item.price,
        // total_recharge = getDB("player.total_recharge"),
        rmb = getDB("player.rmb"),
        player = getDB("player"),
        diamond = getDB("player.diamond"),
        msg = { param: { "index": arg - 0 + 1 }, type: "app/buy@recharge" };
    net_request(msg, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: `网络故障，通信失败` })
            console.log(data);
            return;
        }
        let _listen = [],
            _data: any = Common.changeArrToJson(data.ok),
            result: any = Common_m.mixAward(_data);
            // updata("player.total_recharge",total_recharge-0+_item.price);
            updata("player.vip", _data.award.vip_level);
            updata("player.vip_exp", _data.award.vip_exp);
        if (player.vip < _data.vip_level && player.daily_gift_state) {
            updata("player.daily_gift_state", 0);
        }
        let spendDetail = getDB("player.spend_detail");
        if (spendDetail.indexOf(_item.prop_id) < 0) {
            spendDetail.push(_item.prop_id);
            updata("player.spend_detail", spendDetail);
        }
        updata("player.rmb", rmb - money);
        _listen.push("player");
        if (!getDB("recharge.first_recharge." + arg)) {
            updata("recharge.first_recharge." + arg, 1);
            _listen.push("recharge.first_recharge." + arg);
        }
        result.auto = 1;
        globalSend("showNewRes", {
            result, function(result){
                result.open();
            }
        }); 
        if (callbackFun) callbackFun();

        forelet.paint(getData());        
    });
};



//读取基本数据
listenBack("app/buy@read", (_data) => {
    updata("recharge", _data);
})
