import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { net_request, net_message } from "app_a/connect/main";
import { TipFun } from "app/mod/tip_fun";
import { Pi, globalSend } from "app/mod/pi";
import { data as localDB, updata, get, checkTypeof, listen } from "app/mod/db";
import { fa_base } from "cfg/c/fa_base";
import { fa_acttype } from "cfg/c/fa_acttype";
import { fa_actlist } from "cfg/c/fa_actlist";
import { function_open } from "cfg/b/function_open";
import { Util } from "app/mod/util";
import { act_progress } from "app_b/mod/act_progress";
import { toChooseCount } from "app_b/prop_d/prop";
import { currency } from "cfg/c/recharge_diamond";
import { tipsFestival, getTipsList } from "./tips_festivalactivity";

//导入充值
import { pay } from "app_b/recharge/pay"


export const forelet = new Forelet();
export const globalReceive: any = {
    gotoFestivalActivity: (msg) => {
        let player = localDB.player;

        let days = Common_m.getDatesTo(player.area_time * 1000, "date");
        if (days + 1 < fa_base["servertime_limit"]) {
            globalSend("screenTipFun", {
                words: "活动在开服时间第" + fa_base["servertime_limit"] + "天之后开放！"
            });
            return;
        }
        if (Util.serverTime() > fa_base.delay_date) {
            globalSend("screenTipFun", {
                words: "活动已结束！"
            });
            return;
        }

        if (player.level < fa_base["level_limit"]) {
            globalSend("screenTipFun", {
                words: "角色等级需要达到" + fa_base["level_limit"] + "级！"
            });
            return;
        }
        act_index = todayAct.length;
        forelet.paint(getData());
        open("app_c-activity-festivalactivity-festivalactivity");
    }
}
export const isOpen = (id) => {
    let v = fa_acttype[id];
    let day = Util.serverTime();
    if (!v.close_date) {
        return true;
    }
    return day >= v.open_date && day <= v.delay_date;
}

export class fest_act_w extends Widget {
    //返回
    goback = (arg) => {
        close(arg.widget);
    }
    // //物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
    //切换活动页面（活动一，活动二，活动三……）
    changePage = (arg) => {
        act_index = arg;
        forelet.paint(getData());
    }

    //打开兑换页面
    toExchange = () => {
        forelet.paint(getData());
        open("app_c-activity-festivalactivity-exchange-exchange");
    }
    //去充值
    // toRecharge = (obj) => {
    //     let arg = fa_actlist[obj.act_id][obj.index];
    //     let state = isOpenOrClose(obj.act_id);
    //     if (!state[0]) {
    //         globalSend("screenTipFun", {
    //             words: "此活动未开始！"
    //         });
    //         return;
    //     }
    //     else if (!state[1]) {
    //         globalSend("screenTipFun", {
    //             words: "此活动已结束！"
    //         });
    //         return;
    //     }
    //     globalSend("gotoRecharge");
    // }
    //前往
    goto = (arg) => {
        let a = fa_actlist[arg.act_id][arg.index],
            bol = isOpenOrClose(arg.act_id);
        if (!bol[0]) {
            globalSend("screenTipFun", {
                words: "此活动未开始！"
            });
            return;
        }
        else if (!bol[1]) {
            globalSend("screenTipFun", {
                words: "此活动已结束！"
            });
            return;
        }
        if (a.goto) {
            let arr = String(a.goto).split(",");
            globalSend(arr[0], arr[1]);
            // let w = forelet.getWidget("app_c-activity-festivalactivity-festivalactivity");
            // w && close(w);
        }

        // let func = function_open[a.data_type];
        // try {
        //     globalSend(func.send_fun);
        // } catch (e) {
        //     console.log(e.error);
        // }
    }

    //领取奖励
    getAward = (obj) => {
        let arg = fa_actlist[obj.act_id][obj.index];
        let act_id = obj.act_id;
        let count1 = 1;
        let progress = act_progress[arg.award_rule](arg.data_type, Common_m.getDatesTo(fa_acttype[act_id].close_date, fa_acttype[act_id].time_type), Common_m.getDatesTo(fa_acttype[act_id].open_date, fa_acttype[act_id].time_type), arg.award_condition, festActRead[arg.id]);
        let type = fa_acttype[act_id].type;
        if (!progress[0]) {
            globalSend("screenTipFun", {
                words: arg.award_rule == "diamond" ? "元宝不足" : "不满足条件！"
            });
            return;
        } else if (festActRead[arg.id] >= arg.init_count) {
            globalSend("screenTipFun", {
                words: "次数限制！"
            });
            return;
        }
        if (!isOpenOrClose(act_id)[0]) {
            globalSend("screenTipFun", {
                words: "此活动未开始！"
            });
            return;
        } else if (!isOpenOrClose(act_id)[(type === "exchange") ? 2 : 1]) {
            // else if (!isOpenOrClose(act_id)[ (act_id > 6 && act_id < 10)? 1 : 2]) {
            if (type === "sale" || type === "exchange" || !progress[0]) {
                globalSend("screenTipFun", {
                    words: "此活动已结束！"
                });
                return;
            }
        }
        let fun = (index, count) => {
            if (count) count1 = count - 0;
            let msg = { "param": { id: index - 0, count: count1 }, "type": "app/activity/festival@award" };
            net_request(msg, (data) => {
                if (data.error) {
                    console.log(data.why);
                } else if (data.ok) {
                    let prop: any = Common.changeArrToJson(data.ok);

                    if (prop.cost) {
                        Common_m.deductfrom(prop);
                    }
                    let result: any = Common_m.mixAward(prop);
                    festActRead[index] = festActRead[index] + count1;
                    updata("festActRead." + index, festActRead[index]);
                    forelet.paint(getData());
                    result.auto = 1;
                    globalSend("showNewRes", {
                        result, function(result) {
                            result.open();
                        }
                    })
                }
            });
        }

        if (fa_acttype[act_id].type == "sale") {
            buy(arg, arg.init_count - festActRead[arg.id], fun);
        } else if (fa_acttype[act_id].type == "exchange") {
            exchange(arg, arg.init_count - festActRead[arg.id], fun);
        } else {
            fun(arg.id, "");
        }
    };
}

//==========================================本地
let festActRead: any = {}, act_index = 1, todayAct = [];
// 根据活动id查找活动类型
const getActType = (id) => {
    for (let i in fa_actlist) {
        for (let k in fa_actlist[i]) {
            if (fa_actlist[i][k].id == id) {
                return fa_actlist[i][k]
            }
        }
    }
}
//初始化活动数据
const getData = () => {
    let _data: any = {};
    _data.func = func;
    _data.sort = sortProp;
    _data.Common_m = Common_m;
    _data.act_progress = act_progress;
    _data.checkTypeof = checkTypeof;
    _data.Util = Util;
    _data.fa_acttype = fa_acttype;
    _data.fa_actlist = fa_actlist;
    _data.fa_base = fa_base;
    _data.festActRead = festActRead;
    _data.actIndex = act_index;
    _data.todayAct = todayAct;
    _data.player = get("player");
    _data.Pi = Pi;
    return _data;
};
/**
 * 对活动完成情况进行排序
 * @param act_info 当前活动的内容
 */
const sortProp = (act_list) => {
    let act = { "done": [], "todo": [], "got": [] };
    let date = fa_acttype[act_list[0].act_id];
    let close = Common_m.getDatesTo(date.close_date, date.time_type);
    let open = Common_m.getDatesTo(date.open_date, date.time_type);
    for (let i in act_list) {
        let progress = act_progress[act_list[i].award_rule](act_list[i].data_type, close, open, act_list[i].award_condition, festActRead[act_list[i].id]);
        let p: any = {
            "prop": act_list[i].award,//奖励
            "id": act_list[i].id,//活动ID
            "init_count": act_list[i]["init_count"],//总次数
            "condition": act_list[i].award_condition,//领奖条件
            "progress": progress, //progress
            "act_id": act_list[i].act_id,//活动类型ID
            "index": i,
            "get": festActRead[act_list[i].id],//领奖记录
            "desc": act_list[i].desc//描述
        };
        //type:1 已完成未领取，2 未完成，3 已领取
        if (act_list[i]["init_count"] <= festActRead[act_list[i].id]) {
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
const func = {
    //index为轮数，从1开始
    "getActByIndex": (index) => {
        let table = [];
        for (let k in fa_acttype) {
            if (fa_acttype[k].act_index == index - 0)
                table.push(fa_acttype[k]);
        }
        return table;
    },
    //找到节日兑换的数据
    "getExAct": () => {
        let table = [];
        for (let k in fa_actlist) {
            let item = fa_actlist[k];
            for (let i = 0; i < item.length; i++) {
                if (fa_acttype[item[i].act_id].type == "exchange" && todayAct[fa_acttype[item[i].act_id].act_index - 1]) {
                    item[i]["index"] = i;
                    table.push(item[i]);
                }
            }
        }
        return table;
    },
    //兑换活动是否提示
    "exHasTips": () => {
        for (let k in fa_acttype) {
            if (fa_acttype[k].type == "exchange") {
                // if (todayAct[fa_acttype[k].act_index - 1] && Common.hasTips(fa_acttype[k].care))
                //     return true;
            }
        }
    },
    //兑换需要的物品是否足够
    "canExchange": (arr) => {
        for (var i = 0, len = arr.length; i < len; i++) {
            let have = Common.getBagPropById(arr[i][0]),
                count = (have && have[1].count) || 0;
            if (arr[i][1] > count) {
                return false;
            }
        }
        return true;
    },
    //兑换排序
    "mySort": (a, b) => {
        let c1 = func.canExchange(a.award_condition) ? 1 : 0;
        let c2 = func.canExchange(b.award_condition) ? 1 : 0;
        let e1 = a.init_count - festActRead[a.id] ? 1 : 0;
        let e2 = b.init_count - festActRead[b.id] ? 1 : 0;
        if (e1 !== e2) {
            return e2 - e1;
        }
        if (c1 !== c2) {
            return c2 - c1;
        }
        return a.id - b.id
    }
};

/*读取节日活动领奖数据
* @festActRead  {"活动行id":领奖情况} ，活动行id表示每个活动的每一项的id ，如充值活动，充值满5块领取奖励的活动id为1，充值活动充值满10块的活动id为2……，领奖情况为领奖为0，领取一次加1
*/
const read = () => {
    let msg = { "param": {}, "type": "app/activity/festival@read" };
    net_request(msg, (data) => {
        if (data.error) {
            console.log(data.why);
        } else if (data.ok) {
            let result: any = Common.changeArrToJson(data.ok);
            if (!result.record) {
                for (let i = 1, len = fa_actlist[fa_base.total_count * 4][fa_actlist[fa_base.total_count * 4].length - 1].id; i <= len; i++) {
                    festActRead[i] = 0;
                }
            } else {
                festActRead = Common.changeArrToJson(result.record);
            }
            updata("festActRead", festActRead);
            todayAct = initToday();
            //红点监听
            if (todayAct.length > 0) {
                tipsFestival(todayAct);
                TipFun.init(getTipsList());
            }
            if (fa_base["delay_date"] < Util.serverMillisecond) {
                close(forelet.getWidget("app_c-activity-festivalactivity-festivalactivity"));
                // toReadBag();
                // updataMenuHtml();
                forelet.paint(getData());
            }
            forelet.paint(getData())
        }
    })
}
//初始化今日活动
const initToday = () => {
    let day, table = [];
    for (let k in fa_acttype) {
        let v = fa_acttype[k];
        day = Util.serverTime();;
        if (!v.delay_date || (day <= v.delay_date && day >= v.open_date)) {
            table[v.act_index - 1] = 1;
        }
    }
    return table;
}
/**
 * 判断活动是否开始或结束
 * @param id 当前活动id
 * @param return [开始,关闭,结束]
 */
const isOpenOrClose = (act_id) => {
    let v = fa_acttype[act_id];
    let day = Util.serverTime();;
    if (!v.close_date) {
        return [true, true]
    }
    return [day >= v.open_date, day <= v.close_date, day <= v.delay_date]
}

//购买  act--act_list中的一个活动，  func购买方法
const buy = (act, limitCount, func) => {
    let diamond = localDB.player.diamond,
        max = limitCount;
    if (diamond < act.award_condition) {
        globalSend("popTip", {
            title: "<div>元宝不足</div><div>是否前往充值</div>",
            btn_name: ["充值", "取消"],
            cb: [
                //确认
                () => {
                    globalSend("gotoRecharge");
                },
                //取消
                () => { }
            ]
        });
        return;
    }
    let id = act.award[0][0];
    let have = 0;
    if (id == 100001 || id == 100002) {
        let str = id == 100001 ? "money" : "diamond";
        have = get("player." + str);
    } else {
        let prop = get("bag*sid=" + id).pop();
        prop && (have = prop.count);
    }
    if (max > 1) {
        let buyData = {
            "title": "购 买",
            "id": id,
            "have": have,
            "coin": "diamond",
            "btn_name": "购 买",
            "num": 1,//默认为1
            "cost": act.award_condition,
            // "price":act.award_condition,
            "callBack": (num) => {
                func(act.id, num);
            },
            //计算购买一定数量的花费
            "costCoin": (num) => {
                if (num >= max) {
                    num = max;
                    globalSend("screenTipFun", {
                        words: `已达最大购买数量`
                    });
                }
                if (num < 1) {
                    num = 1;
                }
                if (num * act.award_condition > diamond) {
                    num = Math.floor(diamond / act.award_condition);
                }
                return {
                    "num": num,
                    "cost": num * act.award_condition
                };
            }
        };
        //发送消息购买
        globalSend("gotoBuy", buyData);
        return;
    }
    func(act.id, 1);
}

//兑换  act--act_list中的一个活动，  func购买方法
const exchange = (act, limitCount, func) => {
    const maxCount = () => {
        let bag = localDB.bag;
        let count: any = -1;
        for (let i = 0; i < act.award_condition.length; i++) {
            for (let j = 0; j < bag.length; j++) {
                if (bag[j] && bag[j].sid == act.award_condition[i][0] && bag[j].count >= act.award_condition[i][1]) {
                    let c = Math.round(bag[j].count / act.award_condition[i][1]);
                    if (count == -1 || c < count)
                        count = c;
                    continue;
                }
            }
        }
        if (count == -1) count = 0;
        if (count > limitCount)
            count = limitCount;
        return count;
    }

    let max = maxCount(),
        sid = act.award[0][0],
        list: any = {};
    if (sid == 100001 || sid == 100002) {
        let str = sid == 100001 ? "money" : "diamond";
        list.count = get("player." + str);
    } else {
        list = get(`bag*sid=${sid}`).pop();
    }
    let buyData = {
        "title": "兑 换",
        "id": sid,
        "coin": act.award_condition[0][0],
        "have": list ? list.count : 0,
        "btn_name": ["兑 换"],
        "cost": act.award_condition[0][1], //初始购买花费
        "num": 1,//购买数量初始值默认为1
        //确认购买
        "callBack": (num) => {
            func(act.id, num);
        },
        //计算购买一定数量的花费
        "costCoin": (num) => {
            if (num >= max) {
                num = max;
                globalSend("screenTipFun", {
                    words: `已达最大兑换数量`
                });
            }
            if (num <= 1) {
                num = 1;
            }
            return {
                "num": num,
                "cost": num * act.award_condition[0][1]
            };
        }
    };
    //发送消息购买
    globalSend("gotoBuy", buyData);
}

listen("data_record.recharge,data_record.dailyCopy,data_record.money_tree", () => {
    if (todayAct.length > 0) {
        forelet.paint(getData());
    }
})

//=================================立即执行
read();