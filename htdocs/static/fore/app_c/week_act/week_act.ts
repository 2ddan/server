//====================================导入
import { Pi, cfg, globalSend } from "app/mod/pi";
import { act_progress } from "app_b/mod/act_progress";
import { Util } from "app/mod/util";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { data as localDB, insert, updata, listen } from "app/mod/db";
import { open, remove, destory } from "pi/ui/root";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request, net_message } from "app_a/connect/main";

import { weekact_type_fore as weekact_type } from "cfg/c/weekact_type";
import { weekact_list_fore as weekact_list } from "cfg/c/weekact_list";
import { listenBack } from "app/mod/db_back";

insert("week", {})

let tip = {};
export const forelet = new Forelet();
//====================================导出
let weekActRead: any = {};
let weekAct: any = {};
let _temp = "";//记录需要监听的任务路径

export class week_act_w extends Widget {

    //物品详情objectInfoShow
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    };
    //导航到任务位置
    goto = (arg) => {
        let func = weekAct[arg].gotoFun;
        globalSend(func);
    };
    //领奖
    getAward = (arg) => {
        let msg = { "param": { "id": arg.act_id - 0 }, "type": "app/activity/week@award" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
            } else if (data.ok) {
                let prop: any = Common.changeArrToJson(data.ok);
                updata("week.week_act_read." + arg.act_id, 1);
                let result: any = Common_m.mixAward(prop);
                forelet.paint(getData());
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                });
            }
        });
    }
}
//====================================本地
const sortProp = (weekAct) => {
    let act = { "done": [], "todo": [], "got": [] };
    let close = weekact_type[weekAct.type].close_date;
    let open = weekact_type[weekAct.type].open_date;
    for (let i in weekAct) {
        if (i == "type" || i == "weekDay" || i == "listen_key") continue;
        let progress = act_progress.count(weekAct[i].type, 0, close - open, weekAct[i].award_condition);
        let p: any = {
            "prop": weekAct[i].award,//奖励
            "id": weekAct[i].id,//活动ID
            "init_count": weekAct[i]["init_count"],
            "condition": weekAct[i].award_condition,//领奖条件
            "progress": progress, //progress
            "index": i,//奖励ID
            "get": weekActRead[weekAct[i].id],//领奖记录
            "desc": weekAct[i].desc//描述
        };
        //type:1 已完成未领取，2 未完成，3 已领取
        if (weekActRead[weekAct[i].id]) {
            p.type = 3;
            act.got.push(p);
            tip[i] = 0;
        }
        else if (progress[0]) {
            p.type = 1;
            act.done.push(p);
            tip[i] = 1;
        }
        else if (!progress[0]) {
            p.type = 2;
            act.todo.push(p);
            tip[i] = 0;
        }
    }
    updata(`week.tip`, tip);
    return act.done.concat(act.todo, act.got);
}

const getData = () => {
    let _data: any = {};
    //_data.weekActRead = localDB.week.week_act_read;
    _data.weekAct = sortProp(weekAct);
    _data.currAct = weekact_type[weekAct.type];
    return _data;
}
//待删除
// const read = () => {
//     let msg = { "param": {}, "type": "app/activity/week@read" };
//     net_request(msg, (data) => {
//         if (data.error) {
//             if (data.error) globalSend("screenTipFun", { words: data.error });
//             if (data.reason) globalSend("screenTipFun", { words: data.reason });
//             console.log(data.why);
//         }
//         else if (data.ok) {
//             let week_base;
//             let result: any = Common.changeArrToJson(data.ok);
//             weekActRead = Common.changeArrToJson(result.record);
//             updata("week.week_act_read", weekActRead);
//             let weekday = new Date(Util.serverTime()).getDay();
//             weekAct = {};
//             for (let e in weekact_list) {
//                 let v = weekact_list[e];
//                 let list = weekact_type[v.act_id];
//                 if (list.open_date <= weekday && weekday <= list.close_date) {
//                     weekAct[e] = v;
//                     if (!weekAct.type) weekAct.type = v.act_id;
//                     weekAct.listen_key = v.type;
//                 }
//             }
//             weekAct.weekDay = weekday;
//             if (weekAct.type) {
//                 return;
//             }
//             updata("week.week_act", weekAct);
//             forelet.paint(getData());
//             if (weekAct.listen_key) {
//                 listen("data_record." + weekAct.listen_key, () => {
//                     forelet.paint(getData());
//                 })
//                 //forelet.paint(getData());
//                 //监听任务完成度
//                 // if (!_temp) {//已存在的监听则不重复添加
//                 //     for (let i in weekAct) {
//                 //         if (_temp.indexOf(weekAct[i].type) >= 0) {
//                 //             listen("data_record." + weekAct[i].type, () => {
//                 //                 forelet.paint(getData());
//                 //             })
//                 //             _temp += weekAct[i].type;
//                 //         }
//                 //     }
//                 // }
//             }
//         }
//     });//通讯结束
// }
const read = (result) => {
    let week_base;
    //let result: any = Common.changeArrToJson(data.ok);
    weekActRead = Common.changeArrToJson(result.record);
    updata("week.week_act_read", weekActRead);
    let weekday = new Date(Util.serverTime()).getDay();
    weekAct = {};
    for (let e in weekact_list) {
        let v = weekact_list[e];
        let list = weekact_type[v.act_id];
        if (list.open_date <= weekday && weekday <= list.close_date) {
            weekAct[e] = v;
            if (!weekAct.type) weekAct.type = v.act_id;
            weekAct.listen_key = v.type;
        }
    }
    weekAct.weekDay = weekday;
    updata("week.week_act", weekAct);
    if (!weekAct.type) {
        return;
    }
    forelet.paint(getData());
    if (weekAct.listen_key) {
        listen("data_record." + weekAct.listen_key, () => {
            forelet.paint(getData());
        })
    }
}
//=======================================立即执行
listenBack("app/activity/week@read", function (data) {
    read(data);
})

forelet.listener = (cmd: string, widget: Widget): void => {
    if (cmd === "add" && weekAct.type) {
        forelet.paint(getData());
    }
}



