
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
    let do_task = getDB("gang.gangExpandData.liveness_event_info");
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
            //扣除花费
            Common_m.deductfrom(_data);
            let result = Common_m.mixAward(_data);
            let num = Common_m.awardFindProp(150005, result.bag);

            //添加奖励 [门派资金, 贡献]
            let gangExpandData = getDB("gang.gangExpandData");

            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + num;
            //今日贡献
            gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + num;
            
            gangExpandData.liveness_info = _data.liveness_info;
            //门派总总资金 [后台推消息统一处理]
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


/**
 * 日常任务[资金]
 */
net_message("gang_liveness", (msg) => {
    let gang_money = getDB("gang.gangExpandData.gang_money");
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    if (getDB("player.role_id") == msg.role_id) {
        globalSend("attrTip", {
            words: `门派资金增加:${msg.gang_money - gang_money}`
        })
    }
    forelet.paint(getData());
});

/**
 * 
 */
net_message("gang_liveness_event", (msg) => {
    let liveness_event_info = Common.changeArrToJson(msg.liveness_event_info);
    updata("gang.gangExpandData.liveness_event_info", liveness_event_info);
    forelet.paint(getData());
});

// gang_liveness //日常活动

// gang_liveness_event //活跃度事件推送