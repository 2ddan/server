/**
 * 竞技场
 */
//======================================导入
import { updata, data as db, get, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { globalSend,cfg } from "app/mod/pi";
import { listenBack } from "app/mod/db_back";
import { net_request, net_message } from "app_a/connect/main";
import { open, close } from "app/mod/root";
import { Util } from "app/mod/util";
import { map_cfg } from "app/scene/plan_cfg/map";

import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { funIsOpen } from "app_b/open_fun/open_fun";

//外部
import { fight } from "app_b/fight/fight";

import { arena_base } from "cfg/c/arena_base";
import { robot_base } from "cfg/c/robot";
import { vip_advantage } from "cfg/c/vip_advantage";

//======================================本地
let arenafunc,
    interval,
    isGoCity = 0,
    secondMenu = false,
    arenaW,
    baseDate,
    refreshJjc = true,
    delay: boolean = true;//刷新按钮限制
let shopTab,
    _list;
export let arenaRead, time = 0,
    whichRank = 0,
    mixFun: any = {},
    award = {
        "area_award": {},
        "warcraft_award": {}
    };

export const forelet = new Forelet();

export class Arena extends Widget {
    constructor() {
        super();
    } 
    //查看其它玩家
    seeOther(roleId){
        if(!roleId){
            globalSend("screenTipFun", { "words": "无法查看AI玩家状态" });
            return;
        }
        globalSend("gotoSeeOther", roleId);
    }

    achievementShop = () => {
        totalData.shopData = shopData();
        updataHtml();
        if (!forelet.getWidget("app_b-arena-achievementShop")) {
            open("app_c-arena-achievementShop");
        };
    }

    commonShop = () => {
        totalData.shopData = shopData();
        totalData.freeTimes = refreshFreeTime();
        updataHtml();
        if (!forelet.getWidget("app_b-arena-commonShop")) {
            open("app_c-arena-commonShop", "2");
        };
    }

    //退出
    goback = (arg) => {
        close(arg.widget);
    }

    refresh = () => {
        if (!totalData.delay) {
            return;
        }
        refreshRival();
        totalData.delay = false;
        setTimeout(function () {
            totalData.delay = true;
        }, 5000);
        updataHtml();
    }

    setrankData = () => {
        globalSend("gotoRank");
    }
    

    //购买商品
    limitBuy(e: any) {
        limitBuy(e);
    }

    toFight(e) {
        let arena = get("arena"),
            count = cfg.vip_advantage.vip_advantage[get("player.vip")].jjc_free_times + arena.buy_fight_times - arena.fight_times;
        if (!count) {
            globalSend("screenTipFun", { "words": "您的挑战次数已用完" });
            return;
        }
        toFight(e);
    }

    //查看物品详情
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    }

    //购买挑战次数
    buyCount = () => {
        let player = get("player"),
            num = get("arena.buy_fight_times"),
            use = get("arena.fight_times");
        if((arena_base.buycount_cost[num] || arena_base.buycount_cost[arena_base.buycount_cost.length-1]) > player.diamond){
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
            return
        }
        //购买的数据
        let buyData = {
            "title": "购买次数",
            "type": "竞技场",
            "coin": "diamond",
            "btn_name": "购 买",
            "price": arena_base.buycount_cost,
            "max_buy": undefined,
            "already_buy": num,
            "has_count":  vip_advantage[player.vip].jjc_free_times + num - use,
            "buy_count": 1,//购买数量初始值默认为1
            "callBack": (r) => {//参数为本次购买次数
                buy(r);
            }
        };
        globalSend("gotoBuyCount", buyData);
    }
}

const buy = (num) => {
    let arg = {
        "param": {
            "times":num || 1
        },
        "type": "app/pvp/jjc@buy_times"
    };
    net_request(arg, function (data) {
        if (data.error) {
            console.log(data.error)
        } else {
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除花费
            updata("arena.buy_fight_times", prop.buy_fight_times);
            Common_m.deductfrom(prop);
            globalSend("screenTipFun", { words: `购买成功` });
            updataHtml();
        }
    })
}

mixFun.jjc_rival = (data: Array<any>) => {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr[i] = Common.changeArrToJson(data[i]);
        arr[i].detail = Common.changeArrToJson(arr[i].detail);
    }

    return arr;
}

mixFun.dominate_rival = (data: Array<any>) => {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr[i] = Common.changeArrToJson(data[i]);
        arr[i].detail = Common.changeArrToJson(arr[i].detail);
    }
    return arr;
};
mixFun.jjc_rank = (data: Array<any>) => {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr[i] = Common.changeArrToJson(data[i]);
        arr[i].detail = Common.changeArrToJson(arr[i].detail);
    }
    return arr;
};
mixFun.dominate_rank = (data: Array<any>) => {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr[i] = Common.changeArrToJson(data[i]);
        arr[i].detail = Common.changeArrToJson(arr[i].detail);
    }
    return arr;
}

mixFun.jjc_top_rank = (_data) => {//我的竞技场最佳排名
    return _data;
};

const read = (data) => {
    // console.log(data);
    arenaRead = data;
    //rankFun.avgLevel();
    arenaRead = mixData(arenaRead, mixFun, "arena");
    arenaRead = db.arena;
    var d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    time = d.getTime();
    //争霸赛开放期间免费次数提示
    // warcraftFreeCount();
    // updata("arena.arena_preferentialshop", arena_preferentialshop);
    // updata("arena.arena_overflowshop", arena_overflowshop);

}

const limitBuy = (arg) => {
    arg = arg.split(",");
    let prop = cfg.arena_award_shop.arena_award_shop;

    let message = { "param": { "index": (arg[0] - 0 + 1) }, "type": "app/pvp/jjc@buy" };
    net_request(message, (data) => {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data);
        } else if (data.ok) {
            console.log(data.ok);
            let prop = Common.changeArrToJson(data.ok);
            //扣除花费
            Common_m.deductfrom(prop);
            //奖励
            let result: any = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            })
            arenaRead.life_store[arg[0]] = arenaRead.life_store[arg[0]] + 1;
            updataHtml();
        }
    })
};

//刷新对手
const refreshRival = (arg?) => {
    let _player = get("player");
    let msg = { "param": { "type": whichRank }, "type": "app/pvp/jjc@refresh_rival" };
    net_request(msg, function (data) {

        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
        } else if (data.ok) {

            // arenaRead.jjc_rival = mixFun.jjc_rival(data.ok[1]);
            // if (whichRank - 0 == 0) {
                arenaRead.jjc_rival = mixData(mixFun.jjc_rival(data.ok[1]), mixFun, '');
                // Common.replaceAttr(arenaRead.jjc_rival, mixFun.jjc_rival(data.ok[1]), mixFun);
                for (let i = 0; i < arenaRead.jjc_rival.length; i++) {
                    if (_player.role_id == arenaRead.jjc_rival[i].sid - 0) {
                        updata("arena.role_jjc_rank", arenaRead.jjc_rival[i].role_rank);
                    }
                }
                totalData.referTime = arena_base.refresh_time;
                referTime_end();
            // } else {
            //     //Common.replaceAttr(arenaRead.dominate_rival, mixFun.jjc_rival(data.ok[1]), mixFun);
            //     updataHtml();
            //     for (let i = 0; i < arenaRead.dominate_rival.length; i++) {
            //         if (_player.role_id == arenaRead.dominate_rival[i].sid - 0) {
            //             updata("arena.role_dominate_rank", arenaRead.dominate_rival[i].role_rank);
            //         }
            //     }
                // setTime();
            // }
        }
        if(arg){
            getData();
            updataHtml();
            open("app_c-arena-arena");
        }
    });
}

const toFight = (args: string) => {
    let arg: any = args.split(",");
    if (arg[0] - 0 != 2) {
        if (whichRank == 1) {
            if (arenaRead.role_dominate_rank == arenaRead.dominate_rival[arg[1]].role_rank) {
                globalSend("screenTipFun",
                    { words: "不能向自己挑战！" }
                );
                return;
            }
        } else {
            if (arenaRead.role_jjc_rank == arenaRead.jjc_rival[arg[1]].role_rank) {
                globalSend("screenTipFun", {
                    words: "不能向自己挑战！"
                });
                return;
            }
        }
        let rankNum = (arg[0] - 0 == 0) ? arenaRead.role_jjc_rank : arenaRead.role_dominate_rank;
        let rival = (arg[0] - 0 == 0) ? arenaRead.jjc_rival : arenaRead.dominate_rival;
        /*竞技场提示*/
        if ((rankNum == 0 || rankNum > 18) && rival[arg[1] - 0][1] != 0 && rival[arg[1] - 0][1] <= 10) {
            globalSend("screenTipFun", {
                words: "前18名才能挑战，去提升排名吧！"
            });
            return;
        }
    }
    /*********************判断挑战次数是否足够****************************/
    let msg = { "param": { type: arg[0] - 0, rank: arenaRead.jjc_rival[arg[1]].role_rank }, "type": "app/pvp/jjc@start_fight" };
    net_request(msg, (data) => {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
        } else if (data.ok) {
            let fightData: any = Common.changeArrToJson(data.ok);
            fightData.type = "arena";
            fightData.cfg = arena_base;
            fightData.cfg.scene = map_cfg["arena"];
            fight(fightData, function (r) {
                fightEnd(arg[0] - 0, r);
                if (r.r === 1) {
                    // fightEnd(arg[0] - 0, r);
                } else {
                    Common_m.openAccount(r, "arena", {});
                }
                return true;
            });
            console.log(data.ok);
        }
    });
}
/**
 * @description 战斗结束
 */
const fightEnd = (type, result) => {
    let msg = {
        "param": {
            type: type,
            own: JSON.stringify(result.fighters.own),
            enemy: JSON.stringify(result.fighters.enemy)
        }, "type": "app/pvp/jjc@end_fight"
    };
    net_request(msg, (data) => {
        if (data.error) {
            // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
            // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
            console.log(data.why);
        } else if (data.ok) {
            let r: any = Common.changeArrToJson(data.ok);

            //失败
            if(result.r !== 1){
                updata("arena.fight_times", r.fight_times);
                Common_m.openAccount(r, "arena", {});
                updataHtml();
                return;
            }

            //成功
            let award = Common_m.mixAward(r);
            if (!Common.checkJsonIsEmpty(award.player)) r.player = award.player;
            if (award.bag.length) r.bag = award.bag;
            arenaRead.jjc_rival = mixData(mixFun.jjc_rival(r.jjc_rival), mixFun, '');
            updata("arena.fight_times", r.fight_times);
            updata("arena.jjc_top_rank", r.jjc_top_rank);
            updata("arena.role_jjc_rank", r.role_jjc_rank);
            Common_m.openAccount(result, "arena", r,"none");
            getData();
            updataHtml();
        }
    });
}


const referTime_end = () => {
    totalData.referTime;
    let m = setInterval(function () {
        totalData.referTime--;
        updataHtml();
        if (totalData.referTime == 0) {
            totalData.referTime = 5;
            clearInterval(m);
            m = undefined;
            updataHtml();
        }
    }, 1000);
}

//得到竞技场基本数据
const getData = () => {
    let temp: any = {};
    temp.arenaRead = arenaRead;
    totalData.getData = temp;
    totalData.referTime = arena_base.refresh_time;
};

const mixData = (_data, mixFun, name) => {
    if (!_data || !mixFun) return;
    for (let k in _data) {
        let d;
        if (mixFun[k]) d = mixFun[k](_data[k]);
        else d = _data[k];
        if (name)
            updata(name + "." + k, d);
        _data[k] = d;
    }
    return _data;
};

//积分商店数据
const shopData = () => {
    let conf: any = {};
    conf.shopTab = shopTab;
    conf.arena_award_shop = cfg.arena_award_shop.arena_award_shop; //成就商店
    conf.shop_price = cfg.shop_price.shop_price; //普通商店
    conf.arena_rank_award = cfg.arena_rank_award.arena_rank_award; //排行奖励
    conf.overFlow = db.arena.day_store;
    conf.sort_shop = sort_shop;
    conf.arenaRead = arenaRead;
    return conf;
};

const refreshFreeTime = () => {
    let times = cfg.shop_base.shop_base[2].refresh_time;
    let s = Util.serverTime();
    let server = new Date(s);
    let time = [];
    for (let i = 0, len = times.length; i < len; i++) {
        time.push(new Date(server.getFullYear(), server.getMonth(), server.getDate(), 0, times[i], 0).getHours());
    }
    return time;
}

const sort_shop = (a, b) => {
    var _cfg = arenaRead.life_store;
    let fun = (m) => {
        let num = 0;
        if (arenaRead.jjc_top_rank <= m.buy_rank_limit && m.buy_count_limit > _cfg[m.index]) {
            num = 10000000000 - m.buy_rank_limit
        } else if (arenaRead.jjc_top_rank > m.buy_rank_limit) {
            num = 1000000 - m.buy_rank_limit
        } else if (m.buy_count_limit <= _cfg[m.index]) {
            num = 1000 - m.buy_rank_limit;
        }
        return num;
    }
    if (fun(a) - fun(b) > 0) return -1;
    else return 1;
}

export const globalReceive: any = {
    gotoArena: () => {
        if (funIsOpen("arena")) {
            if (!totalData.delay) {
                getData();
                updataHtml();
                open("app_c-arena-arena");
            }else{
                refreshRival(true);
            }
            globalSend("openNewFun", "arena");
        }
    },
    gotoArenaShop: () => {
        if (funIsOpen("arena")) {
            totalData.shopData = shopData();
            updataHtml();
            if (!forelet.getWidget("app_b-arena-commonShop")) {
                open("app_c-arena-commonShop");
            };
        }
    }
}

export const totalData = {
    "getData": {},
    "shopData": {},
    "rankData": {},
    "getWarcraftData": {},
    "pvp_sweep": {},
    "other": [{
        "title": "战勋商店",
        "icon": "pic_common_shop",
        "func": "commonShop",
        "tip_keys": ""
    }, {
        "title": "成就奖励",
        "icon": "menu_achieve_icon",
        "func": "achievementShop",
        "tip_keys": "explore.arena.award"
    }, {
        "title": "排行奖励",
        "icon": "pic_ranking",
        "func": "setrankData",
        "tip_keys": ""
    }],
    "widget": "app_b-arena-arena",
    "text": ["竞技场", "挑战消耗精力"],
    "time": "",
    "referTime": 0,
    "freeTimes": [],
    "delay" : true,
    "vip_advantage":vip_advantage
}

export const updataHtml = (isSet?: boolean) => {
    forelet.paint(totalData);
}


net_message("jjc_rank",(msg)=>{
    arenaRead.jjc_rank = mixFun.jjc_rank(msg.jjc_rank);
    updataHtml();
})

// ================================ 立即执行
/**
 * @description 初始化数据库竞技场字段
 */
insert("arena", []);
/**
 * @description 监听竞技场数据变化
 */

/**
 * @description 获取竞技场数据
 */
listenBack("app/pvp/jjc@read", read);
// listen("arena.jjc_top_rank", () => {
//     //canBuyOrGet();
// });
// listen("player.jjc_score", () => {
//     //canBuyOrGet();
// });

// read();
