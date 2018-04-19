import { gangNet } from "../gang";
import { guild_upgrade } from "cfg/c/guild_upgrade"; //公会等级相关
import { guild_shop } from "cfg/c/guild_shop"; //公会商店
import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { forelet, getData } from "../gang";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";

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
        globalSend("screenTip", {
            words: `藏宝阁等级不足`
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
            //扣除贡献
            gangExpandData.own_contribute = gangExpandData.own_contribute - _data.cost[0][1];
            //保存奖励
            let prop = Common_m.mixAward(_data);
            updata("gang.gangExpandData.own_contribute", gangExpandData.own_contribute);
            //处理次数
            let count = getDB(`gang.data.gang_shop_record${id}`) || 0;
            updata(`gang.data.gang_shop_record.${id}`, (count + 1));
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTip", {
                words: `商店购买物品失败`
            })
        })
};