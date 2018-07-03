import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";

import { gangNet, forelet, getData } from "../gang";
import { guild_upgrade } from "cfg/c/guild_upgrade"; //门派等级相关

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
            let result = Common_m.mixAward(_data);
            let gangExpandData = getDB("gang.gangExpandData");
            let num = Common_m.awardFindProp(150005, result.bag);

            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + num;
            //今日贡献
            gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + num;
            //今日已领取
            gangExpandData.gang_salary = 1;
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            })
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};