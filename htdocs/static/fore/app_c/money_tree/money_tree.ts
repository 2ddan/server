//==========================================导入
import { Pi, globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { data as localDB, updata, listen, get as getDB, insert } from "app/mod/db";
import { open, close } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request } from "app_a/connect/main";

import { openUiEffect, effectcallback, updateUiEffect, destoryUiEffect } from "app/scene/anim/scene";

import { MoneyTreeBuyPrice } from "cfg/c/money_tree_price";
import { MoneyTreeBoxAward } from "cfg/c/money_tree_box";
import { MoneyTree_Award } from "cfg/c/money_tree_award";
import { vip_advantage } from "cfg/c/vip_advantage";
import { listenBack } from "app/mod/db_back";

insert("money_tree", {});


let shopType = "1";
/**
 * @description 刷新提醒,false为需要提醒
 */
let remind = [];

let moneyTreeInfo, mtFunc, shakeAward, boxInfo = {}, moveTimeout = 2000, time = 0, type = true;//用冷却时间判断 用 摇啊摇;
let moveTime = 0;
// let star_num = 0; //所需要的星星数量
let box_award = {}; //宝箱中的奖励
let needstar = 0; //领取需要的星数
let allstar = 0; //现在拥有的星数
let bow_box = 0;
let tree_move = false,//树是否在摇动
    attached = false,
    treeIndex = 0;//树的特效，递增
export const forelet = new Forelet();
let effid : any;
//======================================导出
export class money_tree_w extends Widget {
    attach() {
        if (attached) return;
        attached = true;
        tree_move = false;
        if(effid) return;
        effid = openUiEffect({
            "effect": "eff_ui_yaoqianshu01",
            "isOnce": false,
            "x":0,
            "y":6,
            "z":-2.5,
            "index": 1
        });
        effectcallback(effid, () => {
            updateUiEffect(effid, [["index", 1], ["isOnce", false]]);
            tree_move = false;
            forelet.paint(mtFunc.getData());
        })
        globalSend("openNewFun", "money_tree");
    }
    /**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
    destroy(): boolean {
        if (!this.tpl)
            return false;
        this.tpl = undefined;
        if (this.resTab) {
            this.resTab.timeout = this.resTimeout;
            this.resTab.release();
        }
        this.forelet && this.forelet.removeWidget(this);
        if (this.name == "app_c-money_tree-money_tree") {
            destoryUiEffect(effid);
            effid = undefined;
            attached = false;
        }
        return true;
    }
    //倒计时结束回调
    cdEnd() {
        forelet.paint(mtFunc.getData());
    }
    //点击宝箱
    showBox = (arg) => {
        arg = arg.split(",");
        let msg: any = {};
        // msg.title = "宝箱详情";
        // msg.content = MoneyTreeBoxAward.cfg[0].award[arg[0]];
        msg.index = MoneyTreeBoxAward.cfg[0].limit_count[arg[0]];
        // msg.state = arg[1];
        // msg.callback = mtFunc.getAward;
        if (moneyTreeInfo.count >= msg.index && !moneyTreeInfo.box[arg[0]]) {
            globalSend("screenTipFun", { words: `已领取该宝箱` });
            return;
        }
        // if (moneyTreeInfo.count < msg.index) {
            // star_num = msg.index;
            box_award = MoneyTreeBoxAward.cfg[0].award[arg[0]-0];
            needstar = msg.index;
            allstar = moneyTreeInfo.count;
            bow_box = arg[0];
            forelet.paint(mtFunc.getData());
            open("app_c-money_tree-box-box");
            // globalSend("screenTipFun", { words: `还差${msg.index - moneyTreeInfo.count > 0 ? msg.index - moneyTreeInfo.count : 0}次才可领取` });
            // return;
        // }
       
        // mtFunc.getAward(msg.index);
        // showBoxinfo(msg);
    }
    //领取箱子奖励
    getBoxAward = (arg) => {
        let init_count = MoneyTreeBoxAward.cfg[0].limit_count[arg[0]];
         if (moneyTreeInfo.count < init_count) {
            globalSend("screenTipFun", { words: `还差${init_count - moneyTreeInfo.count}次才可领取` });
            return;
        }
        mtFunc.getAward(init_count);
        let w = forelet.getWidget("app_c-money_tree-box-box");
        w && close(w);
    }
    //查看物品信息
    propInfoShow = (id) => {
        globalSend("showOtherInfo", id);
    }
    ///摇树 
    toShake = () => {
        if (tree_move) return;
        let nowTime = Util.serverTime(true);
        time = Math.floor(moneyTreeInfo.free_config[1] - (nowTime - moneyTreeInfo.last_time));
        let diamond = 0;
        if (moneyTreeInfo.buy_count >= MoneyTreeBuyPrice.price.length) {
            diamond = MoneyTreeBuyPrice.price[MoneyTreeBuyPrice.price.length - 1];
        } else {
            diamond = MoneyTreeBuyPrice.price[moneyTreeInfo.buy_count - 0];
        }
        if (time <= 0) {//
            if (moneyTreeInfo.surplus >= moneyTreeInfo.free_config[0]) {
                if (vip_advantage[localDB.player.vip].daily_money_treeTimes <= moneyTreeInfo.buy_count) {
                    globalSend("popTip", {
                        title: "<div>次数不足</div><div>是否前往充值提升VIP等级</div>",
                        btn_name: ["充值","取消"],
                        cb: [
                            //确认
                            () => {
                                globalSend("gotoRecharge");
                            },
                            //取消
                            ()=>{}
                        ]
                    });
                    return;
                }
                if (localDB.player.diamond < diamond) {
                    globalSend("popTip", {
                        title: "<div>元宝不足</div><div>是否前往充值</div>",
                        btn_name: ["充值","取消"],
                        cb: [
                            //确认
                            () => {
                                globalSend("gotoRecharge");
                            },
                            //取消
                            ()=>{}
                        ]
                    });
                    return;
                } 
                type = false;
                if(!remind[shopType]){
                    globalSend("popTip",{
                        title:"摇一摇将消耗<span style='font-size:19px;color:rgb(255,222,0);text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;padding:0 3px;'>"+diamond+"</span>元宝，确认摇一摇？",
                        btn_name:["确定","取消"],
                        cb:[
                            //确认
                            ()=>{
                                mtFunc.buyCount();
                            },
                            //取消
                            ()=>{}
                        ],
                        status:()=>{
                            remind[shopType] = !remind[shopType];
                        }
                    })
                    return;
                }
                mtFunc.buyCount();
            } else {//使用免费次数
                type = true;
                setTimeout(function () {
                    updata("money_tree.free_cd_end", Util.serverTime());
                }, moneyTreeInfo.free_config[1] * 1000);
                mtFunc.shakeAward();
            }
        } else {
            if (vip_advantage[localDB.player.vip].daily_money_treeTimes <= moneyTreeInfo.buy_count) {
                globalSend("popTip", {
                    title: "<div>次数不足</div><div>是否前往充值提升VIP等级</div>",
                    btn_name: ["充值","取消"],
                    cb: [
                        //确认
                        () => {
                            globalSend("gotoRecharge");
                        },
                        //取消
                        ()=>{}
                    ]
                });
                return;
            }
            if (localDB.player.diamond < diamond) {
                globalSend("popTip", {
                    title: "<div>元宝不足</div><div>是否前往充值</div>",
                    btn_name: ["充值","取消"],
                    cb: [
                        //确认
                        () => {
                            globalSend("gotoRecharge");
                        },
                        //取消
                        ()=>{}
                    ]
                });
                return;
            }
            type = false;
            if(!remind[shopType]){
                globalSend("popTip",{
                    title:"摇一摇将消耗<span style='font-size:19px;color:rgb(255,222,0);text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;padding:0 3px;'>"+diamond+"</span>元宝，确认摇一摇？",
                    btn_name:["确定","取消"],
                    cb:[
                        //确认
                        ()=>{
                            mtFunc.buyCount();
                        },
                        //取消
                        ()=>{}
                    ],
                    status:()=>{
                        remind[shopType] = !remind[shopType];
                    }
                })
                return;
            }
            mtFunc.buyCount();
        }
    }
    goback(arg) {
        close(arg.widget);
    }
}

let createMtFunc = () => {
    let module: any = {};
    //初始化数据
    module.getData = (msg) => {
        let temp: any = {};
        temp.moneyTreeInfo = moneyTreeInfo; //摇钱树信息
        temp.MoneyTreeBoxAward = MoneyTreeBoxAward;//宝箱奖励
        temp.MoneyTreeBuyPrice = MoneyTreeBuyPrice;//购买摇钱次数花费元宝数
        temp.vip_advantage = vip_advantage;//vip购买次数
        temp.player = getDB("player");//vip购买次数
        temp.dayTime = 1;//初始设定 开服天数为1
        temp.end_time = moneyTreeInfo ? moneyTreeInfo.free_config[1] + moneyTreeInfo.last_time : 0;//定时器结束时间
        temp.move = msg ? msg : 0;//掉钱
        temp.tree_move = tree_move;//树是否在摇晃
        temp.MoneyTree_Award = MoneyTree_Award;//不同等级的奖励
        temp.Pi = Pi;//不同等级的奖励
        // temp.star_num = star_num;
        temp.box_award = box_award;
        temp.needstar = needstar;
        temp.allstar = allstar;
        temp.bow_box = bow_box;
        temp.Pi = Pi;
        return temp;
    }
    //读取基本信息
    module.read = (data) => {
        moneyTreeInfo = data;
        updata("money_tree", moneyTreeInfo);
        forelet.paint(mtFunc.getData());
    };
    //消耗免费次数
    module.shakeAward = () => {
        let msg = { "param": {}, "type": "app/activity/mtree@shake" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
            } else if (data.ok) {
                //设置等待时间
                shakeAward = Common.changeArrToJson(data.ok);
                moneyTreeInfo.last_time = shakeAward.record[3][1];
                moneyTreeInfo.box = shakeAward.record[1][1];
                moneyTreeInfo.surplus++;
                if (moneyTreeInfo.count < 20) {
                    moneyTreeInfo.count++;
                }
                // let newData = { last_time: moneyTreeInfo.last_time, box: moneyTreeInfo.box, surplus: moneyTreeInfo.surplus, count: moneyTreeInfo.count };
                // updata("money_tree", newData);

                for(let v of shakeAward.record){
                    updata("money_tree." + v[0] , v[1]);
                }
                updata("money_tree.total_money", shakeAward.total_money);
                updata("player.money", localDB.player.money + (shakeAward.get_money - 0), (data) => {
                });
                module.move(shakeAward.crits);
                // if (shakeAward.crits) {
                //     // let count = localDB.achievement.crits_count;
                //     // updata("achievement.crits_count", count - 0 + 1, (data) => { });
                //     module.crit(shakeAward.crits)
                // }
                globalSend("goodsTip", {
                    words: [100001, shakeAward.get_money]
                });
            }
        })
    };
    //消耗元宝
    module.buyCount = () => {
        tree_move = true;        
        let msg = { "param": {}, "type": "app/activity/mtree@buy" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
            } else if (data.ok) {
                let buyCountInfo: any = Common.changeArrToJson(data.ok);

                updata("player.money", localDB.player.money + (buyCountInfo.get_money - 0), (data) => {
                });
                updata("player.diamond", buyCountInfo.diamond - 0, (data) => {
                });
                if (moneyTreeInfo.count < 20) {
                    moneyTreeInfo.count++;
                }
                moneyTreeInfo.buy_count++;
                moneyTreeInfo.box = buyCountInfo.record[1][1];

                // let newData = { buy_count: moneyTreeInfo.buy_count, box: moneyTreeInfo.box, count: moneyTreeInfo.count };
                // updata("money_tree", newData);
                for(let v of buyCountInfo.record){
                    updata("money_tree." + v[0] , v[1]);
                }
                module.move(buyCountInfo.crits);
                // if (buyCountInfo.crits) {
                //     // let mtree = localDB.money_tree;
                //     // updata("money_tree.crit", mtree.crit + buyCountInfo.crits, (data) => { });
                //     // let count = localDB.achievement.crits_count;
                //     // updata("achievement.crits_count", count - 0 + 1, (data) => { });
                //     module.crit(buyCountInfo.crits)
                // }
                globalSend("goodsTip", {
                    words: [100001, buyCountInfo.get_money]
                });
            }
        })
    };
    // //暴击显示
    // module.crit = (arg) => {
    //     let divRoot = document.getElementById("crit");
    //     if (!divRoot) return;
    //     var son = document.createElement("div");
    //     var style = '';
    //     style = "width:100%;white-space:nowrap;animation:goodsTip 2s forwards;";

    //     son.setAttribute("style", style);
    //     let i = 0, str = arg + "", html = `<div  style="width:100%;white-space:nowrap;"><img src="../app_c/activity/images/money_tree/money_tree_crit.png"/>`;
    //     while (i < str.length) {
    //         html += `<img src="../app_c/activity/images/money_tree/money_tree_${str[i]}.png"/>`;
    //         i++;
    //     }
    //     son.innerHTML = `${html}<img src="../app_c/activity/images/money_tree/money_tree_bei.png"/></div>`;

    //     divRoot.appendChild(son);
    //     setTimeout(function () {
    //         divRoot.removeChild(son);
    //     }, moveTimeout);

    // }
    /* 领取宝箱 */
    module.getAward = (arg) => {
        let msg = { "param": { "index": arg - 0 }, "type": "app/activity/mtree@box" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
            } else if (data.ok) {
                let boxAward: any = Common.changeArrToJson(data.ok);
                for (let i = 0, len = moneyTreeInfo.box.length; i < len; i++) {
                    if (moneyTreeInfo.box[i] == arg - 0) {
                        moneyTreeInfo.box[i] = 0;
                    }
                }
                updata("money_tree.box", moneyTreeInfo.box, (data) => { });
                forelet.paint(mtFunc.getData());
                let result: any = Common_m.mixAward(boxAward);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                });
            }
        })
    };
    //摇动
    module.move = (msg) => {
        forelet.paint(mtFunc.getData(msg));
        updateUiEffect(effid, [["index", 0], ["isOnce", true]]);
    }
    return module;
}
//========================================立即执行
mtFunc = createMtFunc();

listenBack("app/activity/mtree@read", (data) => {
    mtFunc.read(data);
})


forelet.listener = (cmd: string, widget: Widget): void => {
    if (cmd === "add") {
        updata("money_tree.free_cd_end", Util.serverTime());
        forelet.paint(mtFunc.getData())
    }
}
listen("player.vip", () => {
    // if (localDB.recharge.daily_gift_state - 1 !== localDB.player.vip) {
    if (0 !== localDB.player.vip) {
        forelet.paint(mtFunc.getData())
    }
})