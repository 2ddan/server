/** 翻翻乐**/

//================================导入
import { globalSend } from "app/mod/pi";
import { net_request } from "app_a/connect/main";
import { open} from "app/mod/root";

import { Widget } from "pi/widget/widget";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Forelet } from "pi/widget/forelet";
import { updata, get as getDB, insert } from "app/mod/db";
import { Util } from "app/mod/util";

import { normal_card } from "cfg/c/playcard_normal_card";
import { normal_money } from "cfg/c/playcard_normal_money";
import { normal_award } from "cfg/c/playcard_normal_award";

import { plush_card } from "cfg/c/playcard_plush_card";
import { plush_money } from "cfg/c/playcard_plush_money";
import { plush_award } from "cfg/c/playcard_plush_award";
import { plush_exp } from "cfg/c/playcard_plush_exp";

import { flush_min_score } from "cfg/c/playcard_flush_min_score";
//积分奖励
import { card_get_score_award } from "cfg/c/card_score_award";


export const forelet = new Forelet();

insert("play_card", {})

let remind = false;

export const globalReceive: any = {
    gotoPlayCard: () => {
        openPlayCard();
    }
}

export class play_card_w extends Widget {
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
        clearTimeout(lookTimeOut);
        lookTimeOut = undefined;
        return true;
    }
    //双倍
    doubleClick = () => {
        if (cardData.use_double == 1) {
            globalSend("screenTipFun", {
                words: "本局已翻倍，不能重复翻倍!"
            });
            return;
        }
        cardFun.double();
    }
    tabChange (type) {
        if (tabSwitch === type) {
            return;
        }
        tabSwitch = type;
        forelet.paint(cardFun.getData());
    }
    //重置
    resetClick = () => {
        if (cardData.use_count == 0) {
            globalSend("screenTipFun", {
                words: "未翻牌，不能重置!"
            });
            return;
        }
        cardFun.reset();
    }
    //翻牌
    turnClick = (arg) => {
        arg = arg.cmd
        // if (!isCover && !cardData.use_count) return;
        if (cardData.record[arg - 0]) {
            if (cardData.record[arg - 0].length == 2) return;
            // this.objectInfoShow({ "cmd": cardData.record[arg - 0][0] }); return;
        }
        let costCfg = cardData.type == "normal" ? normal_money : plush_money;
        let diamond = costCfg[cardData.use_count] || costCfg[costCfg.length - 1];
        
        if (!remind) {
            globalSend("popTip", {
                title: `<div>此次翻牌花费${diamond}元宝</div>`,
                btn_name: ["确定", "取消"],
                status: () => {
                    remind = !remind
                },
                cb: [
                    //确认
                    () => {
                        if (diamond > getDB("player.diamond")) {
                            globalSend("screenTipFun", {
                                words: "元宝不足!"
                            });
                            return;
                        }
                        cardFun.turn(arg-0);
                    },
                    () => { }
                ]
            })
        } else {
            if (diamond > getDB("player.diamond")) {
                globalSend("screenTipFun", {
                    words: "元宝不足!"
                });
                return;
            }
            cardFun.turn(arg-0);
        } 
    }
    //物品详情objectInfoShow
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    };
    //帮助详情
    getHelp = () => {
        globalSend("showHelp", "playCard")
    }
    //积分领奖
    openAward = () => {
        forelet.paint(cardFun.getData());
        open("app_c-play_card-award")
    }
    //排行榜
    rankClick = () => {
        let i = 0;
        let fun = function () {
            i++;
            if (i == 2) {
                i = null;
                forelet.paint(cardFun.getData());
                open("app_c-play_card-rank");
            }
        }
        cardFun.read_rank(() => {
            fun();
        });
        cardFun.read_eliter(() => {
            fun();
        });
    }
    //领取积分奖励
    getScoreAward = (index) => {
        let _index = index - 0;
        let msg = { "param": { "index": _index }, "type": "app/activity/card@score_award" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let data1 = Common.changeArrToJson(data.ok);
                cardData.score_once_award[_index - 1] = 1;
                updata("play_card", cardData)
                cardFun.updataHtml();
                let result: any = Common_m.mixAward(data1);
                result.auto = 1;
                globalSend("showNewRes",{
                    result, function (result1) {
                        result1.open();
                    }
                });
            }
        });
    }
}


//==========================================本地
let cardFun,
    cardData,
    normalRank: any = {},
    // isCover,
    plushRank: any = {},
    startTime,
    lookTimeOut,//看牌时间定时器
    tabSwitch = "normal";
const createCardFun = () => {
    let module: any = {}, cardList, currLevel,
        lookTime = 2;//看牌时间5s
        //moveArr = [];
    module.getData = () => {
        let _data: any = {};
        _data.normal_card = normal_card;
        !cardData  && (cardData = getDB("play_card"));
        _data.cardData = cardData;
        _data.costCfg = cardData.type == "normal" ? normal_money : plush_money;//
        _data.plush_card = plush_card;
        _data.plush_exp = plush_exp;
        _data.cardList = cardList;
        // _data.isCover = isCover;//是否可以翻牌
        _data.rankData = { "normal": normalRank, "plush": plushRank };//排行榜数据
        _data.award = { "normal": normal_award, "plush": plush_award };//奖励
        _data.flush_min_score = flush_min_score;//精英榜最低积分
        _data.currLevel = currLevel;
        _data.lookTime = lookTime;//看牌时间
        //_data.moveArr = moveArr;
        _data.award_fun = award_fun;//计算奖励方法
        _data.next_fun = next_fun;//计算目标方法
        _data.tabSwitch = tabSwitch;

        _data.card_get_score_award = card_get_score_award;
        return _data;
    };

    //读取
    module.read = (arg) => {
        let type = arg ? 1 : 0;
        let msg = { "param": { "type": type }, "type": "app/activity/card@read" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                if (data.ok[0] == "state" && data.ok[1] == "false") return;
                cardData = Common.changeArrToJson(data.ok);
                updata("play_card", cardData)
                cardList = module.getCurrLevel().sort((a, b) => .5 - Math.random());
                // for (let k = 0; k < cardData.record.length; k++) {
                //     if (cardData.record[k]) moveArr[k] = 1;
                //     else moveArr[k] = 0;
                // }
                // if (arg) isCover = 0;
                module.updataHtml();
                // module.move();
            }
        });
    };
    //读取积分榜
    module.read_rank = (callback?) => {
        let msg = { "param": {}, "type": "app/activity/card@rank" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok), arr = [];
                console.log("翻翻乐积分榜数据");
                console.log(_data);
                if (_data.rank_index) normalRank.ownRank = Common.changeArrToJson(_data.rank_index);
                if (_data.rank_list.length) {
                    for (let i = 0; i < _data.rank_list.length; i++) {
                        arr[i] = Common.changeArrToJson(_data.rank_list[i]);
                        arr[i].detail = Common.changeArrToJson(arr[i].detail);
                    }
                }
                normalRank.list = arr;
                callback && callback();
            }
        });
    };
    //读取精英榜
    module.read_eliter = (callback?) => {
        let msg = { "param": {}, "type": "app/activity/card@eliter_rank" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok), arr = [];
                console.log("翻翻乐精英榜数据");
                console.log(_data);
                if (_data.rank_index) plushRank.ownRank = Common.changeArrToJson(_data.rank_index);
                if (_data.rank_list.length) {
                    for (let i = 0; i < _data.rank_list.length; i++) {
                        arr[i] = Common.changeArrToJson(_data.rank_list[i]);
                        arr[i].detail = Common.changeArrToJson(arr[i].detail);
                    }
                }
                plushRank.list = arr;
                callback && callback();
            }
        });
    };
    //重置
    module.reset = () => {
        module.read(1);
    };
    //翻倍
    module.double = () => {
        let msg = { "param": {}, "type": "app/activity/card@double" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok);
                cardData.num = _data.num;
                cardData.use_double = 1;
                module.updataHtml();
            }
        });
    };
    //翻卡牌
    module.turn = (arg) => {
        let result: any;
        let msg = { "param": { "index": arg + 1 }, "type": "app/activity/card@turn" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok);
                if (_data.cost) updata("player.diamond", getDB("player.diamond") - _data.cost);
                if (_data.num) cardData.num = _data.num;
                if (_data.turn_card) cardData.record[arg] = _data.turn_card;
                if (_data.goods) {
                    
                    let list: any = Common.changeArrToJson(_data.goods);
                    result = Common_m.mixAward(list);
                    result.auto = 1;
                    globalSend("showNewRes", {
                        result, function(result) {
                            result.open();
                        }
                    })
                    if (list.score) result.score = list.score;
                    if (list.ex) result.ex = list.ex;
                    cardData.ex += list.ex ? list.ex : 0;
                    cardData.score += list.score ? list.score : 0;
                    cardData.num = 1;
                    // if (list.score) {
                    //     module.read_rank();
                    //     module.read_eliter();
                    // }
                }
                cardData.use_count++;
                updata("play_card", cardData)
                module.updataHtml();
                // setTimeout(() => {
                //     module.move(arg + '');
                //     globalSend("showNewRes", {
                //         result, function(result1) {
                //             result.open(() => {
                //                 if (_data.all_card) {
                //                     cardData.record = _data.all_card;
                //                     updata("play_card", cardData)
                //                     module.updataHtml()
                //                     for (let i = 0; i < cardData.record.length; i++) {
                //                         if (!moveArr[i]) moveArr[i] = 1;
                //                     }
                //                     setTimeout(() => {
                //                         module.updataHtml()
                //                     }, 1000)
                //                 }
                //             });
                //         }
                //     });
                // }, 700)
            }
        });
    };
    //取出当前等阶段的物品
    module.getCurrLevel = () => {
        let cfg = cardData.type == "normal" ? normal_card : plush_card;
        for (let i in cfg) {
            if (cardData.avg_level <= cfg[i].level_range[1] && cardData.avg_level >= cfg[i].level_range[0]) {
                currLevel = parseInt(i);
                return cfg[i].card;
            }
        }
        return [];
    }
    //动画时间
    // module.move = (msg) => {
    //     let time = (lookTime + 2) * 1000;
    //     if (cardData.use_count == 0) {
    //         lookTimeOut = setTimeout(() => {
    //             isCover = 1;
    //             module.updataHtml();
    //         }, time);
    //         return;
    //     }
    //     if (msg) {
    //         moveArr[msg - 0] = 1;
    //         module.updataHtml();
    //     }
    // }
    //随机排序
    module.randomsort = (a, b) => {
        return Math.random() > .5 ? -1 : 1;
    }
    //更新页面
    module.updataHtml = () => {
        forelet.paint(module.getData())
    };
    return module;
};

//开始游戏
const openPlayCard = () => {
    if (!cardData) {
        globalSend("screenTipFun", {
            words: "未开放……"
        });
        return;
    }
    // isCover = 0;
    startTime = Util.serverTime();
    //cardFun.move();
    forelet.paint(cardFun.getData());    
    open("app_c-play_card-play_card"); 
    
}
/**
 * 根据排名获取奖励类型
 * @param rank 当前排名
 */
const award_fun = (rank) => {
    if (rank == 0) return 1;
    else if (rank == 1) return 2;
    else if (rank == 2) return 3;
    else if (rank < 10) return 4;
    else if (rank < 20) return 5;
}
/**
 * 根据排名获取目标排名
 * @param rank 当前排名
 * @param list_lenth 排行榜列表长度
 */
const next_fun = (rank, list_lenth) => {
    if (rank == 0) {
        if (list_lenth == 0) return 1;
        else if (list_lenth < 20) return list_lenth + 1;
        else return 20;
    }
    else if (rank < 4) return rank - 1;
    else if (rank < 10) return 3;
    else if (rank < 20) return 10;
}
//==============================================立即执行
// forelet.listener = (cmd: string, widget: Widget): void => {
//     if (cmd === "add") {
//         openPlayCard()
//     }
// }

cardFun = createCardFun();
cardFun.read();
cardFun.read_rank();
cardFun.read_eliter();