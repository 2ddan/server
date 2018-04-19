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
    "openDailySalary": () => {
        open("app_c-gang-daily_salary-daily_salary");
    }
}

export class DailySalary extends Widget {
    //领取每日俸禄
    getSalary() {
        getDailySalary()
    }
    //关闭
    goback() {
        let w: any = forelet.getWidget("app_c-gang-daily_salary-daily_salary");
        close(w);
        w = undefined;
    }
}

/**
 * 领取每日俸禄
 */
const getDailySalary = function () {
    let arg = {
        "param": {},
        "type": "app/gang/expand@salary"
    };
    gangNet(arg)
        .then((data:any) => {
            let _data:any = Common.changeArrToJson(data.ok);
            let award = Common.changeArrToJson(_data.award);
            updata("player.diamond", getDB("player.diamond") - 0 + award["diamond"]);
            let gangExpandData = getDB("gang.gangExpandData");
            //可用贡献
            gangExpandData.own_contribute = gangExpandData.own_contribute - 0 +  award["gang_contribute"];
            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 +  award["gang_contribute"];
            //今日贡献
            gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 +  award["gang_contribute"];
            //今日已领取
            gangExpandData.gang_salary = 1;
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
            globalSend("attrTip", {
                words: `领取每日俸禄失败`
            });
        })
};