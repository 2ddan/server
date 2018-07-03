/**
 * 导入模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";

/**
 * 配置文件
 */
import { daily_activity_title } from "cfg/c/daily_activity_title";
import { function_open } from "cfg/b/function_open";

export const forelet = new Forelet();

/**
 * 入口
 */
export const globalReceive = {
    "gotoDailyAct": (arg) => {
        totalData.index = arg || 0;
        let w = forelet.getWidget("app_c-daily_activity-main");
        if (w) {
            forelet.paint(totalData);
            return;
        }
        openDailyAct();
    },
    "gotoMoneyTree": () => {
        totalData.index = 1;
        let w = forelet.getWidget("app_c-daily_activity-main");
        if (w) {
            forelet.paint(totalData);
            return;
        }
        openDailyAct();
    }
}
let totalData = {
    "function_open": function_open,
    "menu": daily_activity_title,
    "index": 0,
    "fun_id": 0,
    "week_act_type": null,
    "level": 1
}

/**
 * 前台操作
 */
export class DailyAct extends Widget {
    //tab切换
    tabChange(i) {
        if (totalData.index === i) {
            return;
        }
        totalData.index = i;
        if (!(totalData.menu[i].type == "week_act" || totalData.menu[i].type == "undefined")) {
            globalSend("openNewFun", totalData.menu[i].type);
        }
        forelet.paint(totalData);
    }
}

/**
 * 逻辑处理
 */
const openDailyAct = function () {
    totalData.fun_id = getDB("open_fun.id");
    totalData.level = getDB("player.level");
    totalData.week_act_type = getDB("week.week_act.type");
    forelet.paint(totalData);
    open("app_c-daily_activity-main");
}
