//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB, insert, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";


//配置表
import { player_exp } from "cfg/b/player_exp";
import { master_off_line } from "cfg/c/master_off_line";

export const forelet = new Forelet();

insert("off_line", {});

listenBack("app/role/leave_exp@read", (data) => {
    updata("off_line", data);
    forelet.paint(getData());
})
/**
 * 读取离线时间
 */


let off_data: any = {
    "player_exp": player_exp,
    "master_off_line": master_off_line,
    "Pi": Pi
};
let times = 1.5, //离线收益倍数
    get_num=[0,1]; //选择收益倍数

const getData = function () {
    //离线时间(秒)
    off_data.player_level = getDB("player.level");
    off_data.player_vip = getDB("player.vip");
    off_data.leave_time = countTime();
    off_data.get_num=get_num;
    //倍数
    off_data.times = times;
    return off_data;
}

export class OffLine extends Widget {
    getAward() {
        canGetAward();
    }
    selectTimes(i){
        if(i==0){
           get_num[0]=1;
           get_num[1]=0;
           times=1;
        }else{
            get_num[0]=0;
            get_num[1]=1;
            times=i-0;
        }
        forelet.paint(getData());
        
    }
}

//判断能否领取奖励
const canGetAward = function () {
    if (times == 1) {
        getAward();
    } else {
        let diamond = getDB("player.diamond");
        //vip
        if (off_data.player_vip >= master_off_line.free_vip) {
            getAward();
            return;
        } else if (diamond < master_off_line.spend_diamond) {
            globalSend("screenTipFun", {
                words: `元宝不足`
            });
            return;
        }
        getAward();
    }
};

/**
 * 计算离线时间[根据vip等级]
 */
const countTime = function () {
    let time = 0;
    let leave_time = getDB("off_line.leave_time") / 60;
    if (off_data.player_vip < master_off_line.need_vip) {
        time = leave_time > master_off_line.free_limit_time ? master_off_line.free_limit_time : leave_time;
    } else {
        time = leave_time > master_off_line.vip_limit_time ? master_off_line.vip_limit_time : leave_time;
    }
    return time;
}

/**
 * 领取奖励
 */
const getAward = function () {
    let arg = {
        "param": { "type": (times == 1 ? 0 : 1) },
        "type": "app/role/leave_exp@award"
    }
    net_request(arg, (data) => {
        if (data.error) {
            globalSend("screenTipFun", {
                words: `暂无离线经验`
            });
            return;
        }
        let prop = Common.changeArrToJson(data.ok);
        let result = Common_m.mixAward(prop);
        result.auto = 1;
        globalSend("showNewRes", {
            result, function(result1) {
                result1.open();
            }
        });
        updata("off_line.leave_time", 0);
        forelet.paint(getData());
    })
};


/**
 * 监听等级
 */
let origin_level = 0;
listen("player.level", () => {
    let level = getDB("player.level");
    if (level <= origin_level) {
        return;
    }
    origin_level = level;
    forelet.paint(getData())
});
/**
 * 监听vip等级
 */
listen("player.vip", () => {
    forelet.paint(getData())
});