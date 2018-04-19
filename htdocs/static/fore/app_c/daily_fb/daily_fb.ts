//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight, showAccount } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { function_open } from "cfg/b/function_open";
import { map_cfg } from "app/scene/plan_cfg/map";
import { getWildName } from "app_b/open_fun/open_fun";
//导入配置
import { daily_fb_base } from "cfg/c/daily_fb_base";
import { daily_fb_act } from "cfg/c/daily_fb_act";
import { vip_advantage } from "cfg/c/vip_advantage";
import { funIsOpen } from "app_b/open_fun/open_fun";

//掉落效果
import { node_fun, drop_outFun } from "app_b/widget/drop_out";

export const forelet = new Forelet();
//外部打开此页面
export let globalReceive = {
    "gotoDailyFB": () => {
        if (funIsOpen("daily_fb")) {
            forelet.paint(getData());
            open("app_c-daily_fb-daily_fb");
            globalSend("openNewFun", "daily_fb");
        }
    }
}
//定义变量
let fb_data: any = {},
    buyData: any = {},
    fb_id;//要挑战的副本id
//逻辑处理
let logic = {
    //判断能否购买挑战次数
    canBuyCount: function () {
        let diamond = getDB("player.diamond"),
            vip = getDB("player.vip"),
            costArr = daily_fb_base[fb_id - 1].buyCost,
            num = fb_data.vip_daily_times[fb_id - 1],
            max = vip_advantage[vip].buy_daily_instance_times;

        //判断次数是否用完
        if (num >= max) {
            globalSend("screenTipFun", {
                words: `此副本购买次数已用完`
            })
            return;
        }
        //元宝是否足够
        if (diamond < (costArr[num] || costArr[costArr.length - 1])) {
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
            })
            return;
        }
        // fb.buyCount();
        //购买的数据
        buyData = {
            "title": "购买次数",
            "type": "每日副本",
            "coin": "diamond",
            "btn_name": "购 买",
            "cost": costArr[num] || costArr[costArr.length - 1],
            "max": max,
            "now": num,
            "hasCount": vip_advantage[vip].daily_instance_times + num - fb_data.use_times[fb_id - 1],
            "num": 1,//购买数量初始值默认为1
            "callBack": (r) => {
                fb.buyCount(r);
            },
            "costCoin": (r) => {
                let d = buyData,
                    arr: any = {
                        "num": r,
                        "cost": 0
                    },//能购买的数量,花费
                    money = getDB("player." + d.coin);
                if (r > d.max - d.now) arr.num = d.max - d.now;
                if (r <= 0) {
                    arr.num = d.max - d.now ? 1 : 0;
                }
                let len = costArr.length;
                //计算总价
                for (var i = d.now; i < (arr.num - 0 + d.now); i++) {
                    let costNow = arr.cost;
                    if (costArr[i]) arr.cost += costArr[i];
                    else arr.cost += costArr[len - 1];
                    if (arr.cost > money) {
                        arr.num = i - d.now;
                        arr.cost = costNow;
                        break;
                    }
                }
                return arr;
            }
        };
        //发送消息购买
        globalSend("gotoBuyCount", buyData);
    },
    //判断能否挑战
    canChallenge: function (arg) {
        let arr = arg.split(","),
            vip = getDB("player.vip"),
            wild_max_mission = getDB("wild.wild_max_mission");
        //玩家等级是否满足要求
        if (arr[1] > wild_max_mission) {
            globalSend("screenTipFun", { words: `通过野外${getWildName(arr[1])}开放` });
            return null;
        }
        //剩余挑战次数是否为0
        let surplus = vip_advantage[vip].daily_instance_times + fb_data.vip_daily_times[fb_id - 1] - fb_data.use_times[fb_id - 1];
        if (surplus <= 0) {
            globalSend("screenTipFun", { words: `剩余次数为零,无法挑战` });
            return null;
        }
        return arr;
    }
}

//获取最新数据(刷新)
const getData = function () {
    fb_data.fb_id = fb_id;
    //挑战的关卡位置
    fb_data.site = getDB("daily_fb.site");
    //每个关卡的星数
    fb_data.star_total = getDB("daily_fb.star_total");
    //每个副本已挑战次数
    fb_data.use_times = getDB("daily_fb.use_times");
    //vip购买次数
    fb_data.vip_daily_times = getDB("daily_fb.vip_daily_times");
    //玩家信息
    fb_data.player = getDB("player");
    fb_data.Pi = Pi;
    fb_data.daily_fb_base = open_fb();
    fb_data.wild_max_mission = getDB("wild.wild_max_mission") || 0;
    fb_data.vip_advantage = vip_advantage;
    fb_data.daily_fb_act = daily_fb_act;
    // fb_data.openDayFun = openDay;
    fb_data.getWildName = getWildName;
    return fb_data;
}
//副本排序,今日开放排前面
var open_fb = function () {
    let time = Util.serverTime();
    let weekDay = new Date(time).getDay() === 0 ? 7 : new Date(time).getDay();
    let arr = [];
    let wild_max_mission = getDB("wild.wild_max_mission") || 0;

    for (let v of daily_fb_base.slice(0)) {
        if (v.openDay.indexOf(weekDay) >= 0) {
            v.open = 1;
            arr.unshift(v);
        } else {
            arr.push(v);
        }
    }
    return arr.sort(function(a,b){
        let limit_a = Number(a.guard_limit>wild_max_mission);
        let limit_b =  Number(b.guard_limit>wild_max_mission);
        if(limit_a!==limit_b){
            return limit_a - limit_b;
        }
        if(a.open!==b.open){
            return b.open - a.open;
        }
        return a.guard_limit - b.guard_limit;
    });
};

//替换1，2，3
const openDay = function (arr) {
    let day = [0, "一", "二", "三", "四", "五", "六", "日"]
    return arr.join("、").replace(/\d/g, function (a, b) {
        return day[a];
    });
}

//网络请求
let fb = {
    //购买挑战次数
    buyCount: function (r) {
        let arg = {
            "param": {
                "purchase_num": r, //购买次数
                "instance_id": fb_id
            },
            "type": "app/pve/daily_instance@purchase"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok[1]);
                //扣除花费
                Common_m.deductfrom(prop);
                updata("daily_fb.vip_daily_times." + (fb_id - 1), prop.total_purchased_times);
                globalSend("screenTipFun", { words: `购买成功` });
                forelet.paint(getData());
            }
        })
    },
    //挑战
    challenge: function (chapter_id) {
        let arg = {
            "param": {
                "instance_id": fb_id,
                "guard_id": chapter_id //关卡id
            },
            "type": "app/pve/daily_instance@start_fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                //进入战斗场景
                let prop = daily_fb_act[fb_id][(chapter_id - 1) % 5];
                let msg: any = Common.changeArrToJson(data.ok);
                prop.scene = map_cfg["daily_mission"];
                msg.type = "daily_mission";
                msg.cfg = prop;
                fight(msg, function (fightData) {
                    //战斗胜利
                    if (fightData.r === 1) {
                        fb.winFight(chapter_id, fightData);
                        // node_fun();
                    } else {
                        prop.result = fightData;
                        prop.extra = {
                            "source": "daily_fb",
                            "star": 0
                        };
                        showAccount(prop, () => { });
                    }
                    globalSend("popBack");
                })
                forelet.paint(getData());
            }
        })
    },
    //战斗胜利
    winFight: function (chapter_id, result) {
        let arg = {
            "param": {
                "instance_id": fb_id,
                "guard_id": chapter_id, //关卡id
                "fight_time": result.time / 1000
            },
            "type": "app/pve/daily_instance@end_fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                let award = Common_m.mixAward(prop);

                if (Object.keys(award.player).length > 0) {
                    prop.player = award.player;
                }
                if (award.bag.length > 0) {
                    prop.bag = award.bag;
                }
                let useNum = getDB("daily_fb.use_times." + (fb_id - 1));
                updata("daily_fb.use_times." + (fb_id - 1), useNum - 0 + 1);
                updata("daily_fb.star_total." + (chapter_id - 1), prop.star_info[1]);
                forelet.paint(getData());
                prop.result = result;
                prop.extra = {
                    "source": "daily_fb",
                    "star": prop.star_info[1]
                }
                //let goods = prop.award.prop || [[[100001, [prop.award.money]]]];
                // drop_outFun(goods,function(){
                //     showAccount(prop, () => {});
                // });
                showAccount(prop, () => { });
            }
        })
    },
    //扫荡
    sweep: function (chapter_id) {
        let arg = {
            "param": {
                "instance_id": fb_id,
                "guard_id": chapter_id //关卡id
            },
            "type": "app/pve/daily_instance@sweep"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                let result = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                });
                let useNum = getDB("daily_fb.use_times." + (fb_id - 1));
                updata("daily_fb.use_times." + (fb_id - 1), useNum - 0 + 1);
                forelet.paint(getData());
            }
        })
    }
}
//页面操作
export class DailyFb extends Widget {
    goback(arg) {
        close(arg.widget);
    }

    //打开对应副本的任务列表
    openTask(id) {
        let wild_max_mission = getDB("wild.wild_max_mission");
        //关卡是否满足要求
        if (daily_fb_base[id - 1].guard_limit > wild_max_mission) {
            globalSend("screenTipFun", { words: `通过野外${getWildName(daily_fb_base[id - 1].guard_limit)}开放` });
            return ;
        }
        //副本开放？
        let time = Util.serverTime(),
            today = new Date(time).getDay();
        today = (today == 0) ? 7 : today;
        if (daily_fb_base[id - 1].openDay.indexOf(today) == -1) {
            globalSend("screenTipFun", {
                words: `今日不开放`
            });
            return null;
        }
        fb_id = id;
        forelet.paint(getData());
        open("app_c-daily_fb-task-task");
        // open("app_b-fight-fight_result");//打开战斗结果
    }
    //购买挑战次数
    buyCount() {
        logic.canBuyCount();
    }
    //挑战关卡
    challenge(arg) {
        //console.log(arg);
        let arr = logic.canChallenge(arg);
        if (arr) {
            fb.challenge(arr[0] - 0);
        }
    }
    //扫荡关卡
    sweep(chapter_id) {
        let vip = getDB("player.vip");
        //剩余挑战次数是否为0
        let surplus = vip_advantage[vip].daily_instance_times + fb_data.vip_daily_times[fb_id - 1] - fb_data.use_times[fb_id - 1];
        if (surplus <= 0) {
            globalSend("screenTipFun", { words: `剩余次数为零,无法挑战` });
            return null;
        }
        fb.sweep(chapter_id);
    }
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    }
}

//监听每日副本基础数据接口
listenBack("app/pve/daily_instance@read", function (data) {
    updata("daily_fb", data);
})

