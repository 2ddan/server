//====================================导入
import { activity } from "cfg/c/activity_normal";
import { activity_wanfa } from "cfg/c/activity_special";
import { activity_list } from "cfg/c/activity_list";
import { weekact_type_fore } from "cfg/c/weekact_type";

import { Pi, globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { data as localDB, insert,get, updata, listen } from "app/mod/db";
import { act_progress } from "app_b/mod/act_progress";
import { open, close } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";

import { findNodeByAttr } from "pi/widget/virtual_node";
import { getRealNode } from "pi/widget/painter";


import { TipFun } from "app/mod/tip_fun";
import { get as getDB } from "app/mod/db";
import { initActTipsList, getActTipsList } from "./tips_activity";

export const forelet: any = new Forelet();
export let actData: any = {}
//====================================导出

insert("activities", {
    "today_activity": {},
    "week_act": {},
    "week_act_read": {}
})
insert("data_record", {})
//insert("activities.today_activity", {})

/**
 * 今日是否开放活动
 * @param id 活动id
 * @return 1 || 0
 */
export const isOpen = (id) => {
    if (!actData.todayActivity) return false;
    for (let k in actData.todayActivity) {
        if (actData.todayActivity[k].id == id) return true;
    }
    return false;
}
export const globalReceive: any = {
    openPlayCard: () => {
        goto(102);
    },
    goIntoGem: () => {
        goto(101);
    },
    // gotoMoneyTree: () => {
    //     goto(104);
    // },
    gotoCard: () => {
        goto(103);
    },
    goDiscountBuy: () => {
        for (let i in actData.todayActivity) {
            let curr = activity[actData.todayActivity[i].id];
            if(!curr){continue;}
            if (curr.type == "discount_buy") {
                goto(actData.todayActivity[i].id);
                return;
            }
        }
        globalSend("screenTipFun", { words: "未开放……" });
        return;
    },
    gotoRechargeTotal: () => {
        goto(51);
    },
    // openCheckin: (msg) => {
    //     goto(106);
    // },
    gotoInvestment: (msg) => {//成长基金
        goto(104);
    },
    gotoActivities: () => {
        //周活动移到日常，这里暂时隐藏
        // let week_act = weekact_type_fore[localDB.activities.week_act.type];
        // if (week_act) {
        //     if (checkTips("activities_weekact")) {
        //         goto(week_act.id);
        //         return;
        //     }
        // }
        for (let i = 0, len = actData.todayActivity.length; i < len; i++) {
            let _id = actData.todayActivity[i].id;
            let curr_act = activity[_id];
            if (_id > 100 && _id <= 120) curr_act = activity_wanfa[_id];
            // if (checkTips("activities_" + curr_act.id) && isOpen(curr_act.id)) {
            //     goto(_id);
            //     return;
            // }
        }
        //都没有红点就打开周活动 || 列表第一个活动
        // if (week_act) goto(week_act.id);
        // else
        goto(actData.todayActivity[0].id);
    }
}

//进入指定活动
const goto = (act_id) => {

    if (act_id < 10000 && !isOpen(act_id)) {
        globalSend("screenTipFun", { words: "未开放……" });
        return;
    }
    if (act_id < 10000 && activity_list[act_id].level_limit > localDB.player.level) {
        globalSend("screenTipFun", { words: "角色达到" + activity_list[act_id].level_limit + "级后开放！" });
        return;
    }
    getData(act_id);
    forelet.paint(actData);
    open("app_c-activity-activity");

}
//完成单个任务后删除
export const deleteTodayActivity = (id) => {
    let activity = actData.todayActivity;
    for (let k = 0; k < activity.length; k++) {
        if (activity[k].id == id)
            activity.splice(k - 0, 1);
    }
}

export class activety_w extends Widget {
    //去充值
    toRecharge = () => {
        globalSend("gotoRecharge");
    }
    //物品详情
    propInfoShow = (arg) => {
        globalSend("showOtherInfo", arg);
    };
    //领奖
    getAward = (arg1) => {
        let arg = [actData.act_id, arg1.cmd];
        let now = actData.activityRead[arg[0]][arg[1]],//已购买次数
            total = activity[arg[0]].init_count[arg[1]],//总次数
            maxNum = total - now,//剩余次数
            diamond = getDB("player.diamond");
        if (now >= total) {
            globalSend("screenTipFun", { words: "次数限制！" });
            return;
        }
        if (diamond < arg1.price) {
            globalSend("popTip", {
                title: "<div>元宝不足</div><div>是否前往充值</div>",
                btn_name: ["充值","取消"],
                cb: [
                    //确认
                    () => {
                        globalSend("gotoRecharge");
                    },
                    //取消
                    () => {}
                ]
            });
            return;
        }
        if (total - now > 1) {
            let id = activity[arg[0]].prop[arg[1]][0][0],
            have = 0;
            if(id == 100001 ||id == 100002){
                let str = id == 100001 ?"money":"diamond";
                have = get("player."+str);
            }else{
                let prop = get("bag*sid="+id).pop();
                prop && (have = prop.count);
            }
            let buyData = {
                "title": "购 买",
                "id": id,
                "coin": "diamond",
                "btn_name": "购 买",
                "num": 1,//默认为1
                // "price": arg1.price,
                "cost": arg1.price,
                "have":have,
                "callBack": (num) => {
                    openAward(arg, num);
                },
                //计算购买一定数量的花费
                "costCoin": (num) => {
                    if (num >= maxNum) {
                        num = maxNum;
                        globalSend("screenTipFun", {
                            words: `已达最大购买数量`
                        });
                    }
                    if (num < 1) {
                        num = 1;
                    }
                    if (num * arg1.price > diamond) {
                        num = Math.floor(diamond / arg1.price);
                    }
                    return {
                        "num": num,
                        "cost": num * arg1.price
                    };
                }
            };
            //发送消息购买
            globalSend("gotoBuy", buyData);
            return;
        }


        openAward(arg, 1);


    };
    gotoActivity = (arg) => {
        if (actData.act_id == arg) return;
        getData(arg);
        if (forelet.getWidget(actData.act_path)) {
            forelet.paint(actData);
        }
        else {
            this.setState(actData);
            this.paint();
        }
        if (arg == 104) {
            globalSend("openNewFun", "investment");
        }
    }
}

//====================================本地

//初始化今日活动
const initToday = () => {
    let day: any = {},
        table = [];
    day.date = Util.serverTime();
    day.role = Common_m.getPersonalDay();
    day.server = Common_m.getServerDay();
    for (let k in activity_list) {
        let v = activity_list[k];
        if (!v.delay_date || (day[v.time_type] <= v.delay_date && day[v.time_type] >= v.open_date)) {
            // if (v.id == 105 || v.id == 109) {//是否包含微信活动
            //     if (Pi.localStorage.ptFrom && JSON.parse(Pi.localStorage.ptFrom).from == "ganchukeji") table.push(v);
            // }
            //else    (此处将 微信活动、微信绑定、每日礼包、手机绑定除外)
            if (v.level_limit <= localDB.player.level && !(v.id == 105 || v.id == 109 || v.id == 107 || v.id == 108)) {
                table.push(v);
            }
        }
    }
    updata("activities.today_activity", table);
    actData.todayActivity = table;
    return table;
}

const getActivityName = (act_id) => {
    if (act_id > 10000) {//周活动
        return weekact_type_fore[act_id].name;
    }
    else {
        let curr_act = activity[act_id];//常规活动
        if (act_id > 100 && act_id <= 111) curr_act = activity_wanfa[act_id];//特殊活动
        return curr_act.name;
    }
}
const openAward = (arg, count) => {//领奖
    let msg: any = {
        "param": { id: arg[0] - 0, index: arg[1] - 0 + 1, count: count },
        "type": "app/activity/various@award"
    };
    net_request(msg, (data) => {
        if (data.error) {
            console.log(data.why);
        } else if (data.ok) {
            let prop: any = Common.changeArrToJson(data.ok);
            actData.activityRead[arg[0]] = prop.award_record;
            if (prop.cost) {
                Common_m.deductfrom(prop);
            }
            updata("activities.activity_read." + arg[0], actData.activityRead[arg[0]]);

            actData.act_info = sortProp(actData.curr_act);

            forelet.paint(actData)
            let result: any = Common_m.mixAward(prop);
            result.auto = 1;

            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            })
        }
    });
}

//初始化数据
const getData = (act_sid) => {
    actData.act_id = act_sid;

    if (act_sid > 10000) {//周活动
        actData.act_type = "week_act";
        actData.act_name = weekact_type_fore[act_sid].name;
    }
    else {
        let curr_act = activity[act_sid];//常规活动
        if (act_sid > 100 && act_sid <= 111) curr_act = activity_wanfa[act_sid];//特殊活动

        actData.act_type = curr_act.type;
        actData.act_name = curr_act.name;
        actData.curr_act = curr_act;
        actData.act_list = activity_list[act_sid];
        if (actData.act_list.open_date) {
            actData.act_info = sortProp(curr_act);
            actData.time = Common_m.changeTimeToDate(actData.act_list["delay_date"], actData.act_list["time_type"]);
        }
    }
    //根据活动类型查找要打开的tpl路径
    actData.act_path = "app_c-activity-" + actData.act_type + "-" + actData.act_type;
    actData.getActivityName = getActivityName;
}
/**
 * 对活动完成情况进行排序
 * @param act_info 当前活动的内容
 */
const sortProp = (act_info) => {
    let act = { "done": [], "todo": [], "got": [] };
    let close = Common_m.getDatesTo(actData.act_list.close_date, actData.act_list.time_type);
    let open = Common_m.getDatesTo(actData.act_list.open_date, actData.act_list.time_type);
    for (let i in act_info.prop) {
        let progress, condition;
        for (let j in act_info.condition) {
            condition = j;
            progress = act_progress[j](act_info.data_type, close, open, act_info.condition[j][i], 1);
        }
        let p: any = {
            "prop": act_info.prop[i],//奖励
            "id": act_info.id,//活动ID
            "init_count": act_info["init_count"][i],
            "condition": act_info.condition[condition][i],//领奖条件
            "progress": progress, //progress
            "index": i,//奖励ID
            "get": actData.activityRead[act_info.id][i]//领奖记录
        };
        //type:1 已完成未领取，2 未完成，3 已领取
        if (act_info["init_count"][i] <= actData.activityRead[act_info.id][i]) {
            p.type = 3;
            act.got.push(p);
        }
        else if (progress[0]) {
            p.type = 1;
            act.done.push(p);
        }
        else if (!progress[0]) {
            p.type = 2;
            act.todo.push(p);
        }
    }
    return act.done.concat(act.todo, act.got);
}
//从服务器读取所有活动
const read = (data) => {
    //初始化今日活动
    initToday();
    //添加监听(红点提示)
    initActTipsList(actData.todayActivity);
    TipFun.init(getActTipsList());
    actData.activityRead = Common.changeArrToJson(data.award_record);
    updata("activities.activity_read", actData.activityRead);
    forelet.getWidget("app_c-activity-activity") && forelet.paint(actData);
}

//从服务器读取领奖记录
const readRecord = (i) => {
    let actList = [
        "login",
        "instance",
        "jjc_top",
        "recharge",
        "open_mystic_box",
        "money_tree",
        "dailyCopy",
        "arena",
        "rebel",
        "equip_fb",
        "tower_sweep",
        "pet",
        "wild_elite_kill",
        "world_speak",
        "rank_pt",
        "treasure_hexagram",
        "equip_intensify",
        "equip_melt",
        "equip_wash",
        "gest_fight",
        "exp_fb",
        "gest_inherit"
    ];
    if (!actList[i]) return;
    let msg = { "param": { "type": actList[i] }, "type": "app/activity/various@record" };
    net_request(msg, (data) => {
        readRecord(i + 1);
        if (data.error) {
            if (data.error) globalSend("screenTipFun", { words: data.why });
            if (data.reason) globalSend("screenTipFun", { words: data.reason });
            console.log(data.why);
        } else if (data.ok) {
            let data_record: any = Common.changeArrToJson(data.ok);
            updata("data_record." + data_record.type, data_record.record);//保存所有活动领奖记录到本地

        }
    });
}


//监听活动推送广播消息
net_message("activity", (msg) => {
    if (msg) {
        for (let k in msg) {
            updata("data_record." + k, msg[k]);
        }
        forelet.paint(actData);
    }
})
//====================================立即执行
// //初始化今日活动
// initToday();
//添加监听(红点提示)
// initActTipsList(actData.todayActivity);
// TipFun.init(getActTipsList());


listenBack("app/activity/various@read", (data) => {
    read(data);
});

readRecord(0);