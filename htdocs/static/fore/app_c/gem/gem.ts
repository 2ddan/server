//====================================导入
import { globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { Common } from "app/mod/common";
import { data as localDB, get, updata, listen, insert } from "app/mod/db";
import { open, close } from "app/mod/root";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request } from "app_a/connect/main";
import { deepCopy } from "pi/util/util";
import { Util } from "app/mod/util";

import { plush_award } from "cfg/c/gem_eliter_reward";
import { flush_min_score } from "cfg/c/gem_floor";
import { reset_money } from "cfg/c/gem_reset_money";
import { normal_award } from "cfg/c/gem_score_reward";
import { activity_list } from "cfg/c/activity_list";
import { gem_get_score_award } from "cfg/c/gem_score_award";



export const forelet = new Forelet();
export let gemData;

insert("gem_data", {});

export const globalReceive: any = {
    gotoGem: () => {
        let now = Util.serverTime();
        if(now > activity_list[101].close_date){
            globalSend("screenTipFun",{words:"活动已结束"});   
            return;
        }
        if(gemData){
            forelet.paint(gemFun.getData());
            open("app_c-gem-gem"); 
        }else{
            gemFun.read();
            globalSend("screenTipFun",{words:"数据请求中，请稍后重试"});   
        }
        
    }
}


let gemFun, normalRank: any = {}, plushRank: any = {}, rank_tab = "normal", isOpen = 0;
const show_cfg = { 0: [0, 11], 1: [2, 6], 2: [1, 7], 3: [3, 8], 4: [4, 10], 5: [5, 9] };
const lightLine_gemPos = {0: [0, 3, 6, 9, 12], 1: [1, 3, 5], 2: [1, 4, 7], 3: [2, 4, 6, 8, 10], 4: [5, 8, 11], 5: [7, 9, 11]}; // 点亮线的宝石位置
const light_rewardPos = {0: [0, 11], 1: [2, 6], 2: [1, 7], 3: [3, 8], 4: [4, 10], 5: [5, 9]}; // 点亮线的奖励位置
let playedAnim_pos = []; // 已播放动画宝石位置
let gemAnim_pos = []; // 需要播放动画宝石位置
let rewardAnim_pos = []; // 需要播放动画的奖励位置
let lightedLine = [0,0,0,0,0,0]; // 已点亮的线
let lightedLinePos = []; // 已点亮线位置
let state = ''; // 宝石播放动画状态
let award: any;
let gemAddState = ''; // 宝石增加状态
let maskState = ''; // 遮罩状态
let tabSwitch = "normal";
export class gam_w extends Widget {
    goback = (arg) => {
        close(arg.widget);
    }
    tabChange (type) {
        gemFun.read_eliter();
        if (tabSwitch === type) {
            return;
        }
        tabSwitch = type;
        forelet.paint(gemFun.getData());
    }
    //帮助详情
    getHelp = () => {
        globalSend("showHelp", "gem");
    }

    //积分领奖
    openAward = () => {
        forelet.paint(gemFun.getData());
        open("app_c-gem-award");
    }
    //排行榜
    rankClick = () => {
        if(JSON.stringify(normalRank)!=="{}"){
            forelet.paint(gemFun.getData());
            open("app_c-gem-rank");
        }else{
            globalSend("screenTipFun",{words:"暂无排行榜数据，请稍后重试"}); 
        }
        
    }
    //重置
    resetClick = () => {
        let cost = reset_money[gemData.use_count] || reset_money[reset_money.length - 1];
        if(cost > localDB.player.diamond){
            globalSend("screenTipFun",{words:"元宝不足，无法重置！"});
            return;
        }
        globalSend("popTip",{
            title:"<div>本次重置将花费<span style='color:#ff9600'>"+cost+"</span>元宝</div>",
            btn_name:["重置","取消"],
            cb:[
                //确认
                ()=>{
                    gemFun.reset();
                },
                ()=>{}
            ]
        })
        // popTipFun({
        //     words: "本次重置将花费" + cost + "元宝",
        //     callback: [["确定", () => {
        //         if(cost > localDB.player.diamond){
        //             globalSend("screenTipFun",{words:"元宝不足！"});
        //             return;
        //         }else{
        //             if (Common.isReach({ "cost": { "diamond": cost } }, forelet)) {
        //                 playedAnim_pos = [];
        //                 gemAnim_pos = [];
        //                 rewardAnim_pos = [];
        //                 lightedLine = [0,0,0,0,0,0];
        //                 lightedLinePos = [];
        //                 state = "";
        //                 gemAddState = "";
        //                 maskState = "";
        //                 gemFun.read(cost);
        //             }
        //         }
        //     }]]
        // });
        
    }
    //放宝石
    turnClick = (msg) => {
        if (gemData.gem_pos[msg - 0]) {
            globalSend("screenTipFun",{
                words: "已放入宝石，无需再放！"
            });
            return;
        }
        if (gemData.gem <= 0) {
            globalSend("screenTipFun",{
                words: "没有宝石可放,请重置！"
            });
            return;
        }
        gemFun.turn(msg - 0);
    }
    //物品详情objectInfoShow
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg);
    };
    //
    getScoreAward = (index) => {
        let score = get("gem_data.score");
        if(gem_get_score_award.award_limit[index-1] >= score){
            globalSend("screenTipFun", { words: "您的积分不足" });
            return;
        }
        
        let _index = index - 0;
        let msg = { "param": { "index": _index }, "type": "app/activity/gem@score_award" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok);
                gemData.score_once_award[_index - 1] = 1;
                updata("gem_data", gemData);
                gemFun.updataHtml();
                let result: any = Common_m.mixAward(_data);
                result.auto = 1;
                globalSend("showNewRes",{
                    result, function (result1) {
                        result1.open();
                    }
                });
            }
        });
    }
    
    // 动画执行完的回调
    animBack = (e) => {
        console.log("gem animBack===============");
        console.log(e);
        
        if (e.m == gemAnim_pos.length - 1 && e.name == "gem_line_success") {
            console.log("=======================clear state================");
            state="";
            maskState = "";
            forelet.paint(gemFun.getData());
            // showNewRes(award, (result) => {
            //     result.open();
            //     award = null;
            // });
        }
        if (e.name == "gem_add_success") {
            gemAddState="";
            forelet.paint(gemFun.getData());
        }
    }
}

/** 宝石迷阵**/
const createGemFun = () => {
    let module: any = {},
        currLevel,
        gemStackArr = [],
        award_goods_pos = [];

    module.getData = () => {
        let _data: any = {};
        // _data.gemData = gemData;//宝石迷阵数据
        _data.gemData = get("gem_data");//宝石迷阵数据
        _data.flush_min_score = flush_min_score;//精英榜最低分数
        _data.reset_money = reset_money;//重置花费的元宝数
        _data.rankData = { "normal": normalRank, "plush": plushRank };//排行榜数据
        _data.award = { "normal": normal_award, "plush": plush_award };//奖励
        _data.currLevel = currLevel;
        _data.gemStackArr = gemStackArr;
        _data.award_goods_pos = award_goods_pos;
        _data.award_fun = award_fun;//计算奖励的方法
        _data.next_fun = next_fun;//计算目标排名的方法
        _data.gemAnim_pos = gemAnim_pos; // 需要播放动画的宝石位置
        _data.rewardAnim_pos = rewardAnim_pos; // 需要播放动画的装备位置
        _data.state = state; // 连线状态
        _data.gemAddState = gemAddState; // 宝石增加状态
        _data.maskState = maskState; // 遮罩层状态
        _data.tabSwitch = tabSwitch;

        _data.gem_get_score_award = gem_get_score_award;
        return _data;
    };

    //读取
    module.read = (arg) => {
        let type = arg ? 1 : 0;
        let msg = { "param": { "type": type }, "type": "app/activity/gem@read" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                if (data.ok[0] == "state" && data.ok[1] == "false") return;
                gemData = Common.changeArrToJson(data.ok);
                updata("gem_data", gemData);
                module.isShowProp();
                module.getCurrLevel();
                module.hadPlayedAnimPos();
                if (type) {
                    updata("player.diamond", localDB.player.diamond - arg);
                    playedAnim_pos = [];
                    gemAnim_pos = [];
                    rewardAnim_pos = [];
                    lightedLine = [0,0,0,0,0,0];
                    lightedLinePos = [];
                    state = "";
                    gemAddState = "";
                    maskState = "";
                }
                forelet.paint(module.getData())
            }
        });
    };
    //读取积分榜
    module.read_rank = () => {
        let msg = { "param": {}, "type": "app/activity/gem@rank" };
        net_request(msg, (data) => {
            if (data.error) {
               if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok), arr = [];
                if (_data.rank_index) normalRank.ownRank = Common.changeArrToJson(_data.rank_index);
                if (_data.rank_list.length) {
                    for (let i = 0; i < _data.rank_list.length; i++) {
                        arr[i] = Common.changeArrToJson(_data.rank_list[i]);
                        arr[i].detail = Common.changeArrToJson(arr[i].detail);
                    }
                }
                normalRank.list = arr;
                forelet.paint(module.getData());
                console.log(normalRank);
                setTimeout(() => {
                    module.read_rank();
                }, 30 * 60 * 60 * 1000);
            }
        });
    };
    //读取精英榜
    module.read_eliter = () => {
        let msg = { "param": {}, "type": "app/activity/gem@eliter_rank" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok), arr = [];
                if (_data.rank_index) plushRank.ownRank = Common.changeArrToJson(_data.rank_index);
                if (_data.rank_list.length) {
                    for (let i = 0; i < _data.rank_list.length; i++) {
                        arr[i] = Common.changeArrToJson(_data.rank_list[i]);
                        arr[i].detail = Common.changeArrToJson(arr[i].detail);
                    }
                }
                plushRank.list = arr;
                console.log(normalRank)
                forelet.paint(module.getData());
                setTimeout(() => {
                    module.read_eliter();
                }, 30 * 60 * 60 * 1000);
            }
        });
    };
    //重置
    module.reset = () => {
        module.read(1);
    };
    //处理物品是否领取
    module.isShowProp = () => {
        let _data = deepCopy(gemData.use_goods);
        let length = gemData.use_goods.length;
        let arry = [];
        for (let i = 0; i < length; i++) {
            let arr = show_cfg[i];
            arry[arr[0]] = arry[arr[1]] = _data[i];
        }
        gemData.use_goods = [];
        gemData.use_goods[1] = arry;
        gemData.use_goods[0] = _data;

    }
    //放宝石
    module.turn = (arg) => {
        let msg = { "param": { "index": arg + 1 }, "type": "app/activity/gem@put" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                gemStackArr = [];
                let _data: any = Common.changeArrToJson(data.ok);
                gemData.gem_pos[arg - 0] = 1;
                gemData.gem--;
                if (_data.get_score) {
                    gemData.score += _data.get_score;
                    updata("gem_data", gemData);
                    module.read_rank();
                    module.read_eliter();
                }
                for (let i = 0; i < _data.award_goods_pos.length; i++) {
                    award_goods_pos[_data.award_goods_pos[i] - 1] = _data.award_goods_pos[i];
                }
                for (let i = 0; i < _data.gem_stack.length; i++) {
                    if (_data.gem_stack[i] != gemData.gem_stack[i]) gemStackArr[i] = 1;
                    else gemStackArr[i] = 0;
                }
                if (!gemStackArr.filter((x) => { return x }).length && !award_goods_pos.length) {
                    gemData.use_goods = _data.use_goods;
                    module.isShowProp();
                    gemAddState = '';
                    module.updataHtml();
                } else {
                    maskState = "mask_visible";
                    module.updataHtml();
                    setTimeout(() => {
                        gemData.use_goods = _data.use_goods;
                        module.isShowProp();
                        module.getPlayingAnimPos();
                        gemData.gem_stack = _data.gem_stack;
                        award_goods_pos = [];
                        if (_data.award_gem) {
                            gemData.gem += _data.award_gem;
                            gemAddState = 'gem_add';
                            maskState = "";
                            globalSend("attrTip", {
                                words: `恭喜获得宝石一颗`
                            });
                        }
                        module.updataHtml();
                        if (_data.award) {
                            let result: any = Common_m.mixAward(_data);
                            if(!result){
                                return ;
                            }
                            result.auto = 1;
                            globalSend("showNewRes",{
                                result, function (result1) {
                                    result1.open();
                                }
                            });
                        }
                     }, 300)
                }

            }
        });
    };

    //取出当前等阶段的物品
    module.getCurrLevel = () => {
        let cfg = rank_tab == "normal" ? normal_award : plush_award;
        for (let i = 0, len = cfg.length; i < len; i++) {
            if (gemData.avg_level <= cfg[i].level_range[1] && gemData.avg_level >= cfg[i].level_range[0]) {
                currLevel = i - 0; break;
            }
        }
    }
    //更新页面
    module.updataHtml = () => {
        forelet.paint(module.getData())
    };
    // 已播放动画的宝石位置
    module.hadPlayedAnimPos = () => {
        let tempArr = [],tempObj = {};
        for (let i = 0, len = gemData.use_goods[0].length; i < len; i++) {
            if (lightedLine[i] != gemData.use_goods[0][i]) {
                tempArr = tempArr.concat(lightLine_gemPos[i])
            }
        }
        for (let j = 0, len = tempArr.length; j < len; j++) {
            if (!tempObj[tempArr[j]]) {
                playedAnim_pos.push(tempArr[j]);
                tempObj[tempArr[j]] = 1;
            }
        }
        lightedLine = gemData.use_goods[0];  
    }
    // 刚点亮线的位置
    module.getLightedLinePos = () => {
        for (let i = 0, len = gemData.use_goods[0].length; i < len; i++) {
            if (lightedLine[i] != gemData.use_goods[0][i])lightedLinePos.push(i); 
        }
        lightedLine = gemData.use_goods[0];
        // console.log(lightedLinePos);
    }
    // 需要播放动画的宝石和奖励位置
    module.getPlayingAnimPos = () => {
        module.getLightedLinePos();
        maskState = "mask_visible";
        let current_gemAnim_pos = [];// 临时存储宝石位置
        gemAnim_pos = [];
        rewardAnim_pos = [];
        for (let k = 0, len = lightedLinePos.length; k < len; k++){
            // console.log(current_gemAnim_pos);
            current_gemAnim_pos = [];
            if (playedAnim_pos.length && lightedLinePos.length > 0) {
                // console.log("playedAnim_pos have length================");
                let samePos = lightLine_gemPos[lightedLinePos[k]];
                current_gemAnim_pos = current_gemAnim_pos.concat(lightLine_gemPos[lightedLinePos[k]]);
                rewardAnim_pos = rewardAnim_pos.concat(light_rewardPos[lightedLinePos[k]]);
                for (let i = 0; i < playedAnim_pos.length; i++) {
                    for (let j = 0;  j < samePos.length; j++) {
                        if (samePos[j] == playedAnim_pos[i]) {
                            current_gemAnim_pos.splice(j, 1);
                        }
                    }
                }
                state = "gem_line_success";
            }else if(!playedAnim_pos.length && lightedLinePos.length > 0){
                // console.log("playedAnim_pos don't have length================")
                state = "gem_line_success";            
                current_gemAnim_pos = current_gemAnim_pos.concat(lightLine_gemPos[lightedLinePos[k]]);
                rewardAnim_pos = rewardAnim_pos.concat(light_rewardPos[lightedLinePos[k]]);
                
            }
            gemAnim_pos = gemAnim_pos.concat(current_gemAnim_pos);
            playedAnim_pos = playedAnim_pos.concat(current_gemAnim_pos);
        }
        lightedLinePos = [];
    }
    return module;
};

/**
 * 根据排名获取奖励类型
 * @param rank 当前排名
 */
const award_fun = (rank) =>{
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
const next_fun =  (rank,list_lenth) => {
    if (rank == 0){
        if(list_lenth == 0)  return 1;
        else if (list_lenth < 20 ) return list_lenth +1;
        else return 20;
    }
    else if (rank < 4) return rank - 1;
    else if (rank < 10) return 3;
    else if (rank < 20) return 10;
}

//=========================================立即执行

gemFun = createGemFun();
gemFun.read();
gemFun.read_rank();
gemFun.read_eliter();