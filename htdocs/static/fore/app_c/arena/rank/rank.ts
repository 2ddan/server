/**
 * 竞技场排行榜
 */
import { arenaRead, award } from "../arena";
import { globalSend, Pi,cfg } from "app/mod/pi";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { updata } from "app/mod/db";
import { open,close } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Widget, factory } from "pi/widget/widget";
import { Common } from "app/mod/common";

let lookRank = 1, arena_rankW;
export const forelet = new Forelet();

const createRankFun = () => {
    let module: any = {},
        avg_level = 1;
    module.zData = function () {
        let data: any = {};
        data.base = arenaRead;
        data.rank_avg_level = avg_level;//竞技场领取哪个奖励
        data.arena_rank_award = cfg.arena_rank_award.arena_rank_award;//竞技榜 奖励数据
        data.area_award = award.area_award;//自己和目标排名和奖励情况 目标是自己排名的前一个排名项
        data.detailAward = rankFun.detailAward;
        data.avgLevel = rankFun.avgLevel;
        return data;
    };
    module.avgLevel = function() {
        let award = cfg.arena_rank_award.arena_rank_award;
        let own_index = arenaRead.role_jjc_rank;
        // for (let k in award) {
        //     if (arenaRead.avg_level <= award[k].mean_level[1] && arenaRead.avg_level >= award[k].mean_level[0]) {
        //         avg_level = parseInt(k) - 0; break;
        //     }
        // };
        return module.rankAward(award, own_index);
        //forelet.paint(rankFun.zData());
    }
    module.rankAward = (cfg, index) => {
        let a = [], data: any = {}, now: any = {}, goal: any = {};
        for (let i in cfg) {
            let arr: any = i.split(',');
            a.push(i);
            if (arr.length == 1) {
                if (index == arr[0] - 0) {
                    now.award = cfg[index];
                    goal.index = index - 1;
                    goal.award = cfg[index - 1 + ''];
                }
            } else {
                if ((index <= arr[1] - 0) && index >= arr[0] - 0) {
                    now.award = cfg[i];
                    let b = a[a.length - 2].split(',');
                    if (!b[1]) {
                        goal.index = b[0] - 0;
                    } else {
                        goal.index = b[1] - 0;
                    }
                    goal.award = cfg[a[a.length - 2]];
                }
            }
            if (!index || index - 0 == 5001) {
                goal.index = arr[1] - 0;
                goal.award = cfg[i];
                if (arr[1] == "5000") {
                    now.award = cfg[i];
                    goal.index = a[a.length - 1].split(",")[1];
                }
            }
        }
        now.index = index;
        data.now = now;
        data.goal = goal;
        return data;
    }
    module.detailAward = function (index) {//由页面传 类型和名次 判断领取的奖励
        let prop, award = cfg.arena_rank_award.arena_rank_award, avgLevel = rankFun.zData().rank_avg_level;
        for (let k in award) {
            let arg = k.split(",");
            if (!arg[1] && index == Number(arg[0])) {
                prop = award[k];
                return prop;
            }
            if (index >= arg[0] && index <= arg[1]) {
                prop = award[k];
                return prop;
            }
        }
    }
    return module;
};

/************前台点击事件*************/

export class Rank extends Widget {
    constructor() {
        super();
    }

    //退出
    goback = (arg) => {
        close(arg.widget);
    }

    //查看物品详情
    showPropInfo = (arg) => {
        globalSend("showOtherInfo",arg)
    }

     //查看其它玩家
     seeOther(roleId){
        if(!roleId){
            globalSend("screenTipFun", { "words": "无法查看AI玩家状态" });
            
        }
        globalSend("gotoSeeOther", roleId);
        
    }
}

const jjc_rank = (data: Array<any>) => {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr[i] = Common.changeArrToJson(data[i]);
        arr[i].detail = Common.changeArrToJson(arr[i].detail);
    }
    return arr;
};

net_message("jjc_rank",(msg)=>{
    arenaRead.jjc_rank = jjc_rank(msg.jjc_rank);
    forelet.paint(rankFun.zData());
})

// export const showInfo = function (arg) {
//     let rank_list;
//     if (lookRank == 0) {
//         rank_list = arenaRead.jjc_rank;
//     } else {
//         rank_list = arenaRead.dominate_rank;
//     }
//     let roleType = rank_list[arg - 0].role_type;
//     if (roleType == 'robot') {
//         screenTipFun({ words: "无法查看该玩家信息！" });
//         return;
//     }
//     gotoOtherRole(rank_list[arg - 0].detail);
// }

/************外部接收事件*************/
export let rankFun = createRankFun();

export const globalReceive : any = {
    gotoRank : (arg?) => {
        forelet.paint(rankFun.zData());
        if (!forelet.getWidget("app_c-arena-rank-rankShop")) {
            open("app_c-arena-rank-rankShop");
        }
    }
}