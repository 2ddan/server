import { net_request, net_message } from "app_a/connect/main";
import { data as localDB, updata, get as getDB, listen} from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Forelet } from "pi/widget/forelet";
import { open,close} from "app/mod/root";
import { Widget } from "pi/widget/widget";
import { Pi, globalSend, findGlobalReceive } from "app/mod/pi";

//导入配置
import { vip_advantage } from "cfg/c/vip_advantage";
//vip等级对应需要的经验
import { recharge_vip_upgrade } from "cfg/c/recharge_vip_upgrade";
// import { vip_daily_gifts } from "cfg/b/vip_daily_gifts";
import { cfg_super_gifts } from "cfg/b/vip_super_gifts";

export const forelet = new Forelet();


let vipNum;

export const vip_Data = () => {
    let temp: any = {};
    temp.Pi = Pi;
    // temp.dailyData = vip_daily_gifts;
    temp.superData = cfg_super_gifts;
    temp.vipUpNeed = recharge_vip_upgrade;
    temp.vipNum = vipNum;
    temp.vip_level = getDB("player.vip");
    temp.diamond = getDB("player.diamond");
    temp.canBuy = canBuy;
    temp.vip_advantage = vip_advantage;
    temp.vip_exp = getDB("player.vip_exp");
    return temp;
};
const canBuy = (arg) => {
    let info = getDB("recharge.super_gift_state");
    if (!info.length) return 1;
    else {
        for (let i = 0, len = info.length; i < len; i++) {
            if (info[i][0] == Number(arg)) return 0;
        }
    }
    return 1;
}
//领取vip礼包，在活动里，此处应删除
// const getDailyGift = (arg) => {
//     let msg = { "param": {}, "type": "app/buy@vip_daily" };
//     net_request(msg, (data) => {
//         if (data.error) {
//             console.log(data);
//             return;
//         } else if (data.ok) {
//             console.log("---- gift OK ----");
//             console.log(data.ok);
//             updata("recharge.daily_gift_state", 1, (data) => { });
//             // updataHtml();
//             let prop: any = Common_m.mixAward(data.ok[1]);
//             prop.auto = 1;
//             globalSend("showNewRes", {
//                 "arg": prop, "fun": (result) => {
//                     result.open();
//                 }
//             });
//         }
//     })
// };

export const globalReceive: any = {
    goToVip: (arg) => {
        vipNum = getDB("player.vip");
        Common.updataHtml(forelet, "app_b-recharge-vip-vip", vip_Data());
        // open("app_b-recharge-vip-vip");
    }
}

listen("player.vip", () => {
    forelet.getWidget("app_b-recharge-vip-vip") && forelet.paint(vip_Data())
});

listen("player.vip_exp", () => {
    let vip_level = getDB("player.vip");
    let vip_exp = getDB("player.vip_exp");
    let flag = true, changed = false;
    while (flag) {
        if (recharge_vip_upgrade[vip_level]["exp"] <= vip_exp) {
            vip_level++;
            changed = true;
        }
        else flag = false;
    }
    if (changed) {
        updata("player.vip", vip_level);
    }
    forelet.getWidget("app_b-recharge-vip-vip") && forelet.paint(vip_Data());
});


export class vip extends Widget {
    gotoRecharge = ()=>{
        let w = forelet.getWidget("app_b-recharge-vip-vip");
        close(w);
        w = undefined;
        globalSend("gotoRecharge");
    }
    goback = () => {
        let w = forelet.getWidget("app_b-recharge-vip-vip");
        close(w);
        w = undefined;
    };

    vipDetail = (arg) => {
        vipNum = arg;
        Common.updataHtml(forelet, "app_b-recharge-vip-vip", vip_Data())
    };

    changeVip = (arg) => {
        if (arg == "-") {
            if (vipNum >= 1) {
                vipNum--;
            }
        } else {
            if (vipNum <= 14) {
                vipNum = vipNum - 0 + 1;
            }
        }
        forelet.paint(vip_Data())
    };
    // //物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
    

    superBuy = (arg) => {
        arg = Number(arg);
        if (arg > getDB("player.vip")) {
           
            globalSend("screenTipFun", { words: `vip等级不足！请提升vip等级！` });
            return;
        }
        if (!canBuy(vipNum)) {
            globalSend("screenTipFun", { words: `已购买本礼包` });
            return;
        }
        if (cfg_super_gifts[arg].cost > getDB("player.diamond")) {

            // popTipFun({
            //     words: "元宝不足，前往充值！",
            //     callback: [["确定", function () {
            //         let w: any = forelet.getWidget("app_c-recharge-vip-vip");
            //         w.ok ? w.ok() : (w.cancel ? w.cancel() : null);
            //     }]]
            // });
            globalSend("screenTipFun", { words: `元宝不足，前往充值！` });
            return;
        }
        

        let msg = { "param": { "level": arg }, "type": "app/buy@super_gift" };

        net_request(msg, (data) => {
            if (data.error) {
                console.log(data);
                return;
            } else if (data.ok) {
                console.log("---- buy OK ----");
                console.log(data.ok);
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
                forelet.paint(vip_Data())
            }
        });
        forelet.paint(vip_Data())
    };
}

