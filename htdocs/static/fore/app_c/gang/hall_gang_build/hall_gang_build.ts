
import { updata, get as getDB, listen } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";
import { net_message } from "app_a/connect/main";
import { gangNet, forelet, getData, readMemberList } from "../gang";

import { guild_upgrade } from "cfg/c/guild_upgrade"; //门派等级相关
import { guild_build } from "cfg/c/guild_build"; //门派建设
import { guild_charge } from "cfg/c/guild_charge"; //祭天
import { guild_contribution } from "cfg/c/guild_contribution"; //捐献

export const globalReceive = {
    "gotoSacrifice": () => {
        open("app_c-gang-hall_gang_build-sacrifice-sacrifice");
    }
}

export class GangBuild extends Widget {
    funInfo_one() {
        globalSend("funInfo", {
            width: 240,
            hieght: 70,
            text: `<div class="shadow" style="color:#ffd8a6">捐献任务每日重置, 每轮(<span style="color:#51e650">3种</span>)全部完成即可进入下一轮</div>`
        })
    };
    
    funInfo_two() {
        globalSend("funInfo", {
            width: 320,
            hieght: 100,
            text: `<div class="shadow" style="color:#ffd8a6">玩家在野外战斗有几率搜索获得采集物, 等级越高, 可发现的采集数量越多, 种类越高级, 采集道具只能用来捐献</div>`
        })
    };

    //查看物品详情
    propInfoShow(id) {
        globalSend("showOtherInfo", id);
    }
    //查看旗子属性
    openFlag() {
        forelet.paint(getData());
        open("app_c-gang-hall_gang_build-flag_attr-flag_attr");
    }
    //打开建筑升级弹窗
    openBuild() {
        open("app_c-gang-hall_gang_build-build-build", { "canBuildUp": canBuildUp });
    }
    //门主建筑升级
    buildUp(index) {
        isCanBuildUp(index - 0);
        //gangBuildUp(index - 0);
    }
    //打开祭天弹窗
    openSacrifice() {
        open("app_c-gang-hall_gang_build-sacrifice-sacrifice");
    }
    //成员祭天
    sacrifice(index) {
        canSacrifice(index)
    }
    //捐献
    donateProp(index) {
        canDonateProp(index);
    }
    //关闭弹窗
    goback(arg) {
        close(arg.widget)
    }
    //打开捐献排行
    openSalaryRank() {
        readMemberList(() => {
            forelet.paint(getData())
            open("app_c-gang-hall_gang_build-salary_rank-salary_rank", { "salaryRank": salaryRank });
        });
    }
};

/**
 * 根据门派成员本日捐献资金排序
 */
const salaryRank = function (arr) {
    return arr.slice(0).sort((a, b) => {
        return (b.today_gang_money - a.today_gang_money);
    });
};
/**
 * 计算建筑是否可以升级
 */

/**
 * 判断是否满足祭天要求 [0, 1, 2]
 */
const canSacrifice = function (index) {
    let limit = guild_charge[index].limit;
    //次数限制
    if (limit >= 0 && getDB(`gang.gangExpandData.pray_info.${index}`) >= limit) {
        globalSend("screenTipFun", {
            words: `该祈福次数已用完`
        });
        return;
    }
    //花费限制
    let cost = guild_charge[index].cost;
    if (cost.money && getDB("player.money") < cost.money) {
        globalSend("screenTipFun", {
            words: `金币不足`
        });
        return;
    }
    if (cost.diamond && getDB("player.diamond") < cost.diamond) {
        globalSend("screenTipFun", {
            words: `元宝不足`
        });
        return;
    }
    return memberSacrifice(index);
};

/**
 * 判断建筑是否满足升级条件 [0, 1, 2]
 */
const canBuildUp = function () {
    let result = [0, 0, 0];
    let gang_level = getDB("gang.data.gang_level");
    let gang_money = getDB("gang.gangExpandData.gang_money");
    //判断旗帜能否升级
    if (guild_upgrade[gang_level + 1] && gang_money >= guild_upgrade[gang_level].guild_money) {
        result[0] = 1;
    }
    let build;
    let build_level_info = getDB("gang.gangExpandData.build_level_info");
    //判断 藏宝阁 能否升级
    build = guild_build[1][build_level_info[0]];
    if (gang_level >= build.flag_level && gang_money >= build.guild_money) {
        result[1] = 1;
    }
    //判断 藏经阁 能否升级
    build = guild_build[2][build_level_info[1]];
    if (gang_level >= build.flag_level && gang_money >= build.guild_money) {
        result[2] = 1;
    }
    return result;
}

const isCanBuildUp = function (index) {
    let gangData = getDB("gang.data");
    //只能门主才有权限
    if (gangData.post !== 1) {
        globalSend("screenTipFun", {
            words: `只有门主才有权限`
        });
        gangData = null;
        return;
    }
    let gangExpandData = getDB("gang.gangExpandData");
    let cost;
    let build;
    if (index == 0) {
        cost = guild_upgrade[gangData.gang_level].guild_money
    } else {
        build = guild_build[index][gangExpandData.build_level_info[index - 1]];
        cost = build.guild_money;
    }
    //门派资金
    if (gangExpandData.gang_money < cost) {
        globalSend("screenTipFun", {
            words: `门派资金不足`
        });
        gangData = null;
        gangExpandData = null;
        return;
    }
    //[藏宝阁、藏金阁]升级 [依赖旗子等级]
    if (index > 0 && build.flag_level > gangData.gang_level) {
        globalSend("screenTipFun", {
            words: `请先升级旗帜`
        });
        gangData = null;
        gangExpandData = null;
        return;
    }
    return gangBuildUp(index);
}
/**
 * 判断有无捐献材料 [0, 1, 2]
 */
const canDonateProp = function (index) {
    let donate_record = getDB("gang.gangExpandData.donate_record");
    let id = guild_contribution[donate_record[0]][index].id;
    let prop = getDB(`bag*sid=${id}`).pop();
    if (!prop) {
        globalSend("screenTipFun", {
            words: `暂无该捐献材料`
        });
        return;
    }
    memberDonateProp(index - 0);
};

/**
 * 成员祭天祭天 [1、2、3]
 */
const memberSacrifice = function (index) {
    let arg = {
        "param": {
            "index": (index - 0 + 1)
        },
        "type": "app/gang/expand@pray"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            //扣除花费
            Common_m.deductfrom(_data);
            let result = Common_m.mixAward(_data);
            let num = Common_m.awardFindProp(150005, result.bag);
            //添加奖励 [门派资金, 贡献]
            let gangExpandData = getDB("gang.gangExpandData");

            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + num;
            //今日贡献
            gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + num;
            
            gangExpandData.pray_info = _data.pray_info;
            //门派总总资金 [后台推消息统一处理]
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            })
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 建筑升级 {[0 -> 旗子升级[门派升级], 1 -> 藏经阁, 2 -> 藏宝阁}
 */
const gangBuildUp = function (index) {
    let arg = {
        "param": {
            "index": (index - 0)
        },
        "type": "app/gang/expand@upgrade_build"
    };
    gangNet(arg)
        .then((data: any) => {
            //let _data: any = Common.changeArrToJson(data.ok);
            globalSend("attrTip", {
                words: `升级成功`
            });
            //消耗资金 [后台推送统一处理]
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
}
/**
 * 成员捐献材料
 */
const memberDonateProp = function (index) {
    let arg = {
        "param": {
            "index": (index + 1)
        },
        "type": "app/gang/expand@donate"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            //扣除花费
            Common_m.deductfrom(_data);
            let result = Common_m.mixAward(_data);
            let num = Common_m.awardFindProp(150005, result.bag);
            //添加奖励 [贡献]
            let gangExpandData = getDB("gang.gangExpandData");
            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + num;
            //今日贡献
            gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + num;
            
            //门派总总资金 [后台推消息统一处理]
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
            globalSend("attrTip", {
                words: `捐献成功`
            });
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            })
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};

/**
 * 采集次数变化
 */
listen("gang.gangExpandData.collect_info", () => {
    forelet.paint(getData());
})


/**
 * 后台推送 [祈福]
 */
net_message("gang_pray", (msg) => {
    let gang_money = getDB("gang.gangExpandData.gang_money");
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    if (getDB("player.role_id") == msg.role_id) {
        globalSend("attrTip", {
            words: `门派资金增加:${msg.gang_money - gang_money}`
        })
    }
    forelet.paint(getData());
});
/**
 * 后台推送 [建筑升级]
 */
net_message("gang_build", (msg) => {
    if (msg.gang_level) {
        updata("gang.data.gang_level", msg.gang_level);        
    }
    if (msg.build_level_info) {
        updata("gang.gangExpandData.build_level_info", msg.build_level_info);
    }
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    forelet.paint(getData());
});
/**
 * 后台捐献 [门派捐献]
 */
net_message("gang_donate", (msg) => {
    updata("gang.gangExpandData.donate_record", msg.donate_info);
    let gang_money = getDB("gang.gangExpandData.gang_money");
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    if (getDB("player.role_id") == msg.role_id) {
        globalSend("attrTip", {
            words: `门派资金增加:${msg.gang_money - gang_money}`
        })
    }
    forelet.paint(getData());
});
