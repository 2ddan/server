
import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { forelet, getData, gangNet } from "../gang";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";
import { net_message } from "app_a/connect/main";
import { guild_activity } from "cfg/c/guild_activity";

export let globalReceive = {
    "openGangActivity": () => {
        open("app_c-gang-gang_activity-gang_activity", { "taskSort": taskSort });
    }
}

export class GangActivity extends Widget {
    goback(arg) {
        close(arg.widget);
    }
    //前往
    goto() {

    }
    //领奖
    getAward(id) {
        getAward(id)
    }
}

/**
 * 任务排序
 */
const taskSort = function () {
    let a = [], b = [], c = [];
    let liveness_info = getDB("gang.gangExpandData.liveness_info");
    let do_task = Common.changeArrToJson(getDB("gang.gangExpandData.liveness_event_info"));
    guild_activity.forEach((v, i) => {
        if (liveness_info[i]) {
            c.push([v, 3]); //已领取
        } else if (do_task[v.type] >= v.param) {
            a.push([v, 1, do_task[v.type]]); //已完成
        } else {
            b.push([v, 2, (do_task[v.type] || 0)]); //未完成
        }
    });
    return [...a, ...b, ...c];
}

/**
 * 领奖
 */
export const getAward = function (id) {
    let arg = {
        "param": {
            "activity_id": id
        },
        "type": "app/gang/expand@liveness_award"
    };
    gangNet(arg)
        .then((data:any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            let award = Common.changeArrToJson(_data.award);
            //扣除花费
            Common_m.deductfrom(_data);
            //添加奖励 [公会资金, 贡献]
            let gangExpandData = getDB("gang.gangExpandData");
            //可用贡献
            gangExpandData.own_contribute = gangExpandData.own_contribute - 0 + award["gang_contribute"];
            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + award["gang_contribute"];
            //今日贡献
            //gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + award["gang_contribute"];
            
            gangExpandData.liveness_info = _data.liveness_info;
            //门派总总资金 [后台推消息统一处理]
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `门派活动领奖失败`
            });
        })
};


/**
 * 日常任务[资金]
 */
net_message("gang_liveness", (msg) => {
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    forelet.paint(getData());
});

/**
 * 
 */
net_message("gang_liveness_event", (msg) => {
    updata("gang.gangExpandData.liveness_event_info", msg.liveness_event_info);
});