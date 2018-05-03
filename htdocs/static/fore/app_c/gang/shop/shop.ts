
import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { forelet, getData, gangNet } from "../gang";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";

import { guild_shop } from "cfg/c/guild_shop"; //门派商店

export let globalReceive = {
    "openGangShop": () => {
        open("app_c-gang-shop-shop");
    }
}

export class GangShop extends Widget {
    //购买物品
    buyProp(id) {
        canBuyProp(id);
    }
    //关闭
    goback() {
        let w: any = forelet.getWidget("app_c-gang-shop-shop");
        close(w);
        w = undefined;
    }
    //查看物品详情
    showPropInfo(arg) {
        globalSend("showOtherInfo", arg)
    }
}

/**
 * 判断是否满足购买要求
 */
const canBuyProp = function (id) {
    let cost = guild_shop[id - 1].cost;
    let limit = guild_shop[id - 1].limit;
    let gangExpandData = getDB("gang.gangExpandData");
    let level = gangExpandData.build_level_info[1];
    if (level < limit.build_level) {
        globalSend("screenTipFun", {
            words: `藏宝阁等级不足`
        });
        return;
    }
    if (cost.spend_contribute && gangExpandData.gang_contribute < cost.spend_contribute) {
        globalSend("screenTipFun", {
            words: `门派贡献不足`
        });
        return;  
    }
    if (cost.spend_diamond &&  getDB("player.diamond") < cost.spend_diamond) {
        globalSend("screenTipFun", {
            words: `元宝不足`
        });
        return;  
    }
    buyProp(id, gangExpandData);
};

/**
 * 商店购买物品
 */
const buyProp = function (id, gangExpandData) {
    let arg = {
        "param": {
            "id": id
        },
        "type": "app/gang@gang_shop"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            let cost = Common_m.deductfrom(_data);
            if (cost["gang_contribute"]) {
                //扣除贡献
                gangExpandData.gang_contribute = gangExpandData.gang_contribute - cost["gang_contribute"];
            }
            //保存奖励
            let result = Common_m.mixAward(_data);
            updata("gang.gangExpandData.gang_contribute", gangExpandData.gang_contribute);
            //处理次数
            let count = getDB(`gang.data.gang_shop_record.${id}`) || 0;
            updata(`gang.data.gang_shop_record.${id}`, (count + 1));
            forelet.paint(getData());
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};