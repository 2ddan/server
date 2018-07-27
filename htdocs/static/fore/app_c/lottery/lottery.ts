//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { Util } from "app/mod/util";
import { luck_draw_shop } from "cfg/c/luck_draw_shop";
import { luck_draw_set } from "cfg/c/luck_draw_set";
import { luck_draw } from "cfg/c/luck_draw";



export const forelet = new Forelet();
let tabSwtich = "book"; // tab切换
let score_coin = undefined; // 积分id
let cost_coin = undefined; // 抽奖道具id
let resolve_prop = null; // 被分解的符文
let opacity = false,
    lock = 0;//锁屏状态 0,不锁屏，1高级抽，2低级抽


    
insert("lottery", {});

//外部打开此页面
export let globalReceive = {
    gotoLottery: (arg?) => {
        tabSwtich = arg && "shop" || "book";
        if (!score_coin) {
            score_coin = luck_draw_shop[0]["cost"][0]
        }
        if (!cost_coin) {
            cost_coin = luck_draw[1][0]["cost"][0][0]
        }
        forelet.paint(getData());
        open("app_c-lottery-main-main");
    }
}


export class lottery extends Widget {
    //第一次渲染
    attach() {
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    firstPaint() {
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    goback(arg){
        close(arg.widget);
    }
    //界面tab切换
    changeColumns(msg) {
        if (tabSwtich == msg.type_m) return;
        tabSwtich = msg.type_m;
        forelet.paint(getData());
    }
    //抽奖
    getAward = function (prop_id, id) {//消耗id,抽奖id
        if(lock){
            return;
        }
        if (id == -1) {
            if (prop_id == 100002) {
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
            } else {
                globalSend("screenTipFun", { words: `${Pi.sample[prop_id].name}不足` });
                return;
            }
        }
        lock = prop_id == 100002?2:1;                
        forelet.paint(getData());
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            timer = null;
            lock = 3;//关闭背景蒙版
            forelet.paint(getData());
            logic.getAward(id);
        },1800);
    }
    //奖励预览
    seeAward = function (type) {
        open("app_c-lottery-see_award-see_award", type);
    }
    //兑换天书
    buyBook(id) {
        if (!id) {
            globalSend("screenTipFun", { words: `您的积分不足` });
            return;
        }
        logic.buyBook(id);
    }
    //积分点击提示
    scoreTip() {
        globalSend("funInfo", {
            width: 320,
            hieght: 65,
            top: 750,
            text: `<div class="shadow" style="color:#ffd8a6">只有高级抽奖可获得积分，积分可用于在积分商城购买专属秘籍等特殊物品。 </div>`
        })
    }
    //物品详情
    showPropInfo = (id) => {
        let goto = Pi.sample[id].goto;
        if (goto && goto >= 1) {

            globalSend("showPropInfo", { "sid": id, "flag": "bag", "cb": () => {
                let w = forelet.getWidget("app_c-lottery-award-award");
                w && close(w);
            } });
        } else {
            globalSend("showOtherInfo", id);
        }
    }
}



let logic = {
    //道具是否足够
    canGetAward(type, index) {
        let cost = luck_draw[type][index]["cost"][0];
        let prop_id = cost[0];
        if (prop_id == 100002) {
            let diamond = getDB("player.diamond");
            if (cost[1] > diamond) {
                return false;
            }
        } else {
            let prop = getDB("bag*sid=" + prop_id).pop();
            if (!prop || cost[1] > prop.count) {
                return false;
            }
        }
        return true;
    },
    //抽奖
    getAward(id) {//抽奖id
        let arg = {
            "param": {
                "id": id - 0,
            },
            "type": "app/prop/luck_draw@award"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                let _prop: any = Common.changeArrToJson(prop.award.slice(0));
                let result: any = Common_m.mixAward(prop);
                if (JSON.stringify(prop.free_time) != JSON.stringify(getDB("lottery.free_time"))) {
                    updata("lottery.free_time", prop.free_time);
                }
                opacity = false;
                resolve_prop = _prop && _prop.resolve_prop || null;
                forelet.paint(getData());
                let show = awardShow(prop.show_award,resolve_prop);
                open("app_c-lottery-award-award", {"show":show,"bag":result.bag,"extra":prop.extra_award});
                if(result.bag && result.bag.length){
                    let collect = getDB("rune.rune_collect") || [];
                    result.bag.forEach((v) => {
                        if(v.type==="rune" && collect.join(",").indexOf(v.sid+"")===-1){
                            collect.push(v.sid);
                        }
                    });
                    updata("rune.rune_collect",collect);
                }
                
                let timer = setTimeout(()=>{
                    clearTimeout(timer);
                    timer = null;
                    lock = 0;
                    forelet.paint(getData());
                },(prop.show_award && prop.show_award.length == 1) ? 200 : 3800);
                
            }
        })
    },
    //商店兑换
    buyBook(id) {//兑换id
        let arg = {
            "param": {
                "id": id - 0,
            },
            "type": "app/prop/luck_draw@shop"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                let result: any = Common_m.mixAward(prop);
                resolve_prop = prop.award && prop.award.resolve_prop;
                if (resolve_prop) {
                    let _p = result.bag[0];
                    open("app_c-lottery-change_rune-change_rune", _p)
                } else {
                    result.auto = 1;
                    globalSend("showNewRes", {
                        result, function(result1) {
                            result1.open();
                        }
                    });
                }
                forelet.paint(getData());
            }
        })
    },
    getCount(id) {
        let prop = getDB("bag*sid=" + id).pop();
        let num = prop && (prop.count || 1) || 0;//兑换货币数量
        return num;
    }
}


let _data: any = {
    "Pi": Pi,
    "luck_draw_shop": luck_draw_shop,
    "luck_draw_set": luck_draw_set,
    "luck_draw": luck_draw,
    "canGetAward": logic.canGetAward
};
//获取最新数据(刷新)
const getData = function () {
    _data.now_time = Util.serverTime(true);
    _data.player = getDB("player");
    _data.tabSwtich = tabSwtich;
    _data.score_coin = score_coin;
    _data.cost_coin = cost_coin;
    _data.score_num = logic.getCount(score_coin);
    _data.resolve_prop = resolve_prop;
    _data.getCount = logic.getCount;
    _data.cost_num = logic.getCount(cost_coin);//高级抽奖道具数量
    _data.free_time = getDB("lottery.free_time");
    _data.rune = getDB("rune.rune_set");
    _data.opacity = opacity;
    _data.lock = lock;
    return _data;
}

//处理抽奖奖励显示
let awardShow = (show,resolve)=>{//展示奖励，额外奖励，分解获得
    if(!resolve){
        return show;
    }
    let str = resolve.join(",");
    let obj =  Common.changeArrToJson(resolve);
    show.reverse().forEach((v,k)=>{
        let bol = str.indexOf(v[0][0]) !== -1;
        if(bol && obj[v[0][0]]){
            v[0][2] = 1;
            obj[v[0][0]]--;
        }
    })
    return show.reverse();
}



listenBack("app/prop/luck_draw@read", (data) => {
    updata("lottery", data);
});