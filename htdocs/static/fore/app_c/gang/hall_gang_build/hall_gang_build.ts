
import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";
import { net_message } from "app_a/connect/main";
import { gangNet, forelet, getData } from "../gang";

import { guild_upgrade } from "cfg/c/guild_upgrade"; //公会等级相关
import { guild_build } from "cfg/c/guild_build"; //公会建设
import { guild_charge } from "cfg/c/guild_charge"; //祭天
import { guild_contribution } from "cfg/c/guild_contribution";


export class DailySalary extends Widget {
    //查看旗子属性
    openFlag() {
        open("app_c-gang-hall_gang_build-flag-flag");
    }
    //打开建筑升级弹窗
    opBuild() {
        open("app_c-gang-hall_gang_build-build-build");
    }
    //门主建筑升级
    buildUp(index) {
        canBuildUp(index - 0);
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
};

/**
 * 判断是否满足祭天要求 [0, 1, 2]
 */
export const canSacrifice = function (index) {
    let limit = guild_charge[index].limit;
    //次数限制
    if (limit >= 0 && getDB(`gang.gangExpandData.pray_info.${index}`) >= limit) {
        globalSend("screenTipFun", {
            words: `该祭祀次数已用完`
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
export const canBuildUp = function (index) {
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
    let build_need = guild_build[index][gangExpandData.build_level_info[index - 1]].need;
    let cost = (index == 0) ? guild_upgrade[gangData.gang_level].guild_money : build_need.guild_money;
    //门派资金
    if (gangExpandData.gang_money < cost) {
        globalSend("screenTipFun", {
            words: `公会资金不足`
        });
        gangData = null;
        gangExpandData = null;
        return;
    }
    //[藏宝阁、藏金阁]升级 [依赖旗子等级]
    if (index > 0 && build_need.flag_level > gangData.gang_level) {
        globalSend("screenTipFun", {
            words: `请先升级旗子`
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
export const canDonateProp = function (index) {
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
            let award = Common.changeArrToJson(_data.award);
            //扣除花费
            Common_m.deductfrom(_data);
            //添加奖励 [公会资金, 贡献]
            let gangExpandData = getDB("gang.gangExpandData");
            //可用贡献
            gangExpandData.own_contribute = gangExpandData.own_contribute - 0 + award["gang_contribute"];
            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + award["gang_contribute"];
            //今日贡献
            //gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + award["gang_contribute"];
            
            gangExpandData.pray_info = _data.pray_info;
            //门派总总资金 [后台推消息统一处理]
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
            globalSend("attrTip", {
                words: `祭天失败`
            });
        })
};
/**
 * 建筑升级 {[0 -> 旗子升级[公会升级], 1 -> 藏经阁, 2 -> 藏宝阁}
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
                words: `升级失败`
            });
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
            let award = Common.changeArrToJson(_data.award);
            //扣除花费
            Common_m.deductfrom(_data);
            //添加奖励 [贡献]
            let gangExpandData = getDB("gang.gangExpandData");
            //可用贡献
            gangExpandData.own_contribute = gangExpandData.own_contribute - 0 + award["gang_contribute"];
            //历史总贡献
            gangExpandData.role_history_contribute = gangExpandData.role_history_contribute - 0 + award["gang_contribute"];
            //今日贡献
            //gangExpandData.role_today_contribute = gangExpandData.role_today_contribute - 0 + award["gang_contribute"];
            
            //门派总总资金 [后台推消息统一处理]
            updata("gang.gangExpandData", gangExpandData);
            forelet.paint(getData());
            globalSend("attrTip", {
                words: `捐献成功`
            });
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `成员捐献材料失败`
            });
        })
}




/**
 * 后台推送 [祭天]
 */
net_message("gang_pray", (msg) => {
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    forelet.paint(getData());
});
/**
 * 后台推送 [建筑升级]
 */
net_message("gang_build", (msg) => {
    if (msg.gang_level) {
        updata("gang.data.gang_level", msg.gang_money);        
    }
    if (msg.build_level_info) {
        updata("gang.gangExpandData.build_level_info", msg.build_level_info);
    }
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    forelet.paint(getData());
});
/**
 * 后台捐献 [公会捐献]
 */
net_message("gang_donate", (msg) => {
    console.log(msg);
    updata("gang.gangExpandData.donate_record", msg.donate_info);
    updata("gang.gangExpandData.gang_money", msg.gang_money);
    forelet.paint(getData());
});
