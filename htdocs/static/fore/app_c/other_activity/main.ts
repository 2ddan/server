/**
 * 导入模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { Pi, globalSend } from "app/mod/pi";
import { data as localDB, updata, get as getDB, listen} from "app/mod/db";

/**
 * 配置文件
 */
import { welfare_activity_title } from "cfg/c/welfare_activity_title";
import { function_open } from "cfg/b/function_open";


export const forelet = new Forelet();

/**
 * 入口
 */
export const globalReceive = {
    "gotoWelfareAct": (arg) => {
        totalData.index = arg || -1;
        openDailyAct();
    }
}
let totalData:any = {
    "function_open": function_open,
    "menu": welfare_activity_title,
    "index": -1
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
        forelet.paint(totalData);
    }
}

/**
 * 逻辑处理
 */
const openDailyAct = function () {
    let level = getDB("player.level");
    if(totalData.index == -1){
        for(let key in  welfare_activity_title){
            let v = welfare_activity_title[key];
            if((!(v.id == "105" || v.id == "108" || v.id == "109" || v.id == "110")) && level >=  v.level_limit){
                totalData.index = v.index;
                break;
            }
        }
        
        if(totalData.index == -1){
            return;
        }
    }
    totalData.fun_id = getDB("open_fun.id");
    forelet.paint(totalData);
    open("app_c-other_activity-main");
}
