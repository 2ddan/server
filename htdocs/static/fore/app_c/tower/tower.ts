//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB } from "app/mod/db";
import { Pi, globalSend, cfg } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight, showAccount, goback as closeFight } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { map_cfg } from "app/scene/plan_cfg/map";
import { funIsOpen } from "app_b/open_fun/open_fun";
//导入配置
import { vip_advantage } from "cfg/c/vip_advantage";
import { tower_monster } from "cfg/c/tower_monster";
import { tower_base } from "cfg/c/tower_base";
import { tower_fast_sweep } from "cfg/c/tower_fast_sweep";
import { tower_welfare } from "cfg/c/tower_welfare";

export const forelet = new Forelet();


let floorsNum = [],//层数
    specificNum = [10, 0],//特定层数领取宝箱
    fastSweepTime = [],
    cost_diamond = 0,//快速扫荡消耗总元宝
    time_cd = 5,//挑战间隔
    show_time = true, //倒计时显示
    sweep_total_time = 0,//扫荡总时间
    timer_next_fight; //下一关挑战倒计时
let max = Object.keys(tower_monster).length;
//打开本功能
export const globalReceive = {
    gotoTower: () => {
        if (funIsOpen("tower")) {
            tplData();
            forelet.paint(getData());
            open("app_c-tower-tower");
            globalSend("openNewFun", "tower");
        }
    }
}

//前台操作
export class Tower extends Widget {
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    }

    //奖励详情页
    awardDetails() {
        open("app_c-tower-award-award");
    }

    goback(arg) {
        close(arg.widget);
    }

    startFight() {
        if (max == tower_data.floor_point) {
            globalSend("screenTipFun", {
                words: "已通关天庭秘境"
            });
            return;
        }
        if (!tower_data.start_sweep_time) {
            startFight();
        } else {
            globalSend("screenTipFun", {
                words: "正在扫荡无法挑战"
            });
        }
    }

    startSweep() {
        //logic.fastSweepDiamond();
        getSweepTime();
        logic.isFreeSweep();
    }

    getAward() {
        if (logic.canGetBoxAward()) {
            getBoxAward();
        }
    }

    //领取扫荡奖励
    getSweepAward() {
        getSweepAward();
    }

    //快速扫荡
    fastSweep() {
        let res = logic.fastSweepDiamond();
        if (res) {
            fastSweep();
        }
    }
}

const getSweepTime = () => {
    if (tower_data.start_sweep_time) {
        let sweep_box_time = 0,
            surplus_time = 0,//扫荡宝箱总时间
            nowTime = Util.serverTime(), //当前服务器时间(毫秒)
            count = Math.floor(tower_data.floor_point / 10); //扫荡的宝箱个数
        for (let i = 0; i < count; i++) {
            sweep_box_time += tower_fast_sweep[i + 1].sweep_time;
        }
        sweep_total_time = tower_data.start_sweep_time + sweep_box_time;
        forelet.paint(getData());
    }
}

//刷新快速扫荡消耗的元宝
const refreshDiamond = () => {
    let nowTime = Util.serverTime(true);
    let arr = tower_base.diamond_coefficient;
    let xxx = JSON.parse(JSON.stringify(sweep_total_time - nowTime));

    if (sweep_total_time >= nowTime) {
        let time = setInterval(function () {
            let surplus_time = Math.ceil((xxx) / 60);
            cost_diamond = Math.pow(surplus_time / arr[0], arr[1]) + arr[2];
            xxx--;
            if (xxx <= 0) {
                clearInterval(time);
                time = undefined;
                cost_diamond = 0;
                forelet.paint(getData());
            }
            forelet.paint(getData());
        }, 1000);
    }
}

//显示数据 当前层数num [num-2,num-2,num,num+1]  可能获得的奖励(可能为空) 通过固定层数的奖励 以及每层快速挑战的时间总和
const tplData = () => {
    let fast_sweep = cfg.tower_fast_sweep.tower_fast_sweep;
    let arr = [];
    for (var m in fast_sweep) {
        arr.push(fast_sweep[m].sweep_time);
    }
    let sum = 0;
    let subArr = [];
    for (var n = 0; n < arr.length; n++) {
        subArr.push(sum += arr[n]);
    }

    fastSweepTime = subArr;

    let nums = getDB("tower.floor_point");
    if (nums >= max - 2 && nums <= max) {
        floorsNum = [max, max - 1, max - 2];
    } else {
        floorsNum = [nums + 3, nums + 2, nums + 1];
    }

    let tower_welfare = cfg.tower_welfare.tower_welfare;
    let buy_record = getDB("tower.buy_record");
    specificNum = [tower_welfare[box_id].floor_limit, box_id];
}

//******************************************test*********************************/
let tower_data: any = {},
    box_id;

const getData = function () {
    //通过特定层数领取宝箱奖励
    tower_data.buy_record = getDB("tower.buy_record");
    //当前最大通过最大层数
    tower_data.floor_point = getDB("tower.floor_point");
    //扫荡开始时间
    tower_data.start_sweep_time = getDB("tower.start_sweep_time");
    //扫荡已用次数
    tower_data.use_sweep_count = getDB("tower.use_sweep_count");
    //宝箱是否开启
    tower_data.sweep_award = getDB("tower.sweep_award");

    tower_data.box_id = box_id;

    tower_data.floorsNum = floorsNum;

    tower_data.specificNum = specificNum;

    tower_data.sweep_total_time = sweep_total_time;
    tower_data.cost_diamond = cost_diamond;

    tower_data.fastSweepTime = fastSweepTime;
    tower_data.time_cd = time_cd;
    tower_data.show_time = show_time;
    tower_data.max = max;

    return tower_data;
}

//页面逻辑处理
export let logic = {
    //当前领取楼层宝箱id
    floorBoxId: function () {
        let i,
            arr = getDB("tower.buy_record"),
            len = arr.length;
        for (i = 0; i < len; i++) {
            if (arr[i] <= 0) {
                return i + 1;
            }
        }
        return len;
    },
    //判断是否可以领取楼层宝箱
    canGetBoxAward: function () {
        if (tower_data.floor_point < tower_welfare[box_id].floor_limit) {
            // globalSend("screenTipFun", {
            //     words: `通过${tower_welfare[box_id].floor_limit}楼才能领取`
            // });
            open("app_c-tower-preview_award-preview_award");
        }
        return true;
    },
    //判断是否可以开启扫荡
    isFreeSweep: function () {
        if (tower_data.start_sweep_time <= 0) {
            let vip = getDB("player.vip"),
                diamond = getDB("player.diamond");
            if (tower_data.floor_point < 9) {
                globalSend("screenTipFun", {
                    words: "通关十层可开启扫荡"
                })
                return false;
            }
            if (tower_data.use_sweep_count < vip_advantage[vip].tower_sweep_times) {
                return startSweep();
            }
            //花钱扫荡
            let num = tower_data.use_sweep_count - vip_advantage[vip].tower_sweep_times;
            if (num >= vip_advantage[vip].tower_diamond_sweep_times) {
                globalSend("screenTipFun", {
                    words: `扫荡次数已用完`
                })
                return false;
            }
            // let num = tower_data.use_sweep_count - (vip_advantage[vip].tower_sweep_times + vip_advantage[vip].tower_diamond_sweep_times);
            let i = (num >= tower_base.sweep_spend.length) ? tower_base.sweep_spend.length - 1 : num;
            if (diamond >= tower_base.sweep_spend[i]) {
                return startSweep();
            } else {
                globalSend("screenTipFun", {
                    words: `${num <= 0 ? "次数已用完" : "元宝不足"}`
                })
                return false;
            }
        } else {
            //打开页面
            refreshDiamond();
            open("app_c-tower-fast_sweep-fast_sweep");
        }
        forelet.paint(getData());
    },
    //判断是否需要扫荡通讯
    needSweepNet: function () {
        if (tower_data.start_sweep_time <= 0) {
            startSweep();
        }
        //打开扫荡界面
        //open()
    },
    //快速扫荡计算元宝
    fastSweepDiamond: function () {
        let vip = getDB("player.vip"),
            diamond = getDB("player.diamond");
        if (vip >= tower_base.free_sweep_limit) {
            return true;
        }
        let sweep_box_time = 0, //扫荡宝箱总时间
            nowTime = Util.serverTime(), //当前服务器时间(毫秒)
            count = Math.floor(tower_data.floor_point / 10), //扫荡的宝箱个数
            surplus_time; //扫荡剩余时间
        for (let i = 0; i < count; i++) {
            sweep_box_time += tower_fast_sweep[i + 1].sweep_time;
        }
        surplus_time = Math.ceil((tower_data.start_sweep_time + sweep_box_time - nowTime / 1000) / 60);
        if (surplus_time <= 0) {
            globalSend("screenTipFun", { words: `已扫荡完,无需快速扫荡` });
            return false;
        }
        let arr = tower_base.diamond_coefficient; //计算系数
        //计算元宝
        let cost_diamond = Math.pow(surplus_time / arr[0], arr[1]) + arr[2];
        if (diamond < cost_diamond) {
            globalSend("screenTipFun", { words: `元宝不足，无法快速扫荡` });
            return false;
        }
        return true;
    }
}

/**
 * 
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const towerNet = function (param) {
    return new Promise((resolve, reject) => {
        net_request(param, (data) => {
            if (data.error) {
                reject(data);
            } else {
                resolve(data);
            }
        })
    })
};

/**
 * 开始挑战
 */
export const startFight = function () {
    let arg = {
        "param": {},
        "type": "app/pve/tower@start_fight"
    };
    towerNet(arg)
        .then((data: any) => {
            let ms = Util.serverTime();
            let prop: any = Common.shallowClone(tower_monster[tower_data.floor_point + 1]);
            let msg: any = Common.changeArrToJson(data.ok);
            prop.scene = map_cfg["tower"];
            msg.type = "tower";
            msg.cfg = prop;
            msg.floor_point = tower_data.floor_point + 1;
            msg.time = ms + tower_base.fight_time_limit * 1000;
            msg.limitTime = tower_base.fight_time_limit;
            return msg;
        })
        .then((msg) => {
            fight(msg, (fightData) => {
                if (fightData.r === 1) {
                    winFight(fightData);
                } else {
                    Common_m.openAccount(fightData, "tower");
                }
            }, () => {
                //手动退出回调
                let w = forelet.getWidget("app_c-tower-next_tips");
                if (w) {
                    clearInterval(timer_next_fight);
                    timer_next_fight = undefined;
                    time_cd = 5;
                    show_time = true;
                    close(w);
                    w = null;
                }
            })
        })
        .catch((data) => {
            console.log(data);
        })
};

/**
 * 战斗结束
 * @param fight_time 战斗时间
 * @param r 
 */
const winFight = function (result) {
    console.log(result.time);
    let arg = {
        "param": { "fight_time": Math.floor(result.time / 1000) },
        "type": "app/pve/tower@end_fight"
    };
    towerNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            let num = tower_data.floor_point + 1;
            updata("tower.floor_point", num);
            let result = Common_m.mixAward(prop);
            tplData();
            forelet.paint(getData());

            result.auto = 1;
            if (prop.award) {
                globalSend("showNewRes", {
                    result, function(result1) {
                        result1.open();
                    }
                });
            }
            forelet.paint(getData());
            let w = forelet.getWidget("app_c-tower-next_tips");
            if (!w) {
                open("app_c-tower-next_tips");
            }
            if (time_cd == 5) {
                timer_next_fight = setInterval(function () {
                    show_time = false;
                    time_cd -= 1;
                    forelet.paint(getData());
                    if (time_cd == 0) {
                        clearInterval(timer_next_fight);
                        timer_next_fight = undefined;
                        time_cd = 5;
                        show_time = true;
                        let map = forelet.getWidget("app_c-tower-next_tips");
                        map && close(map);
                        map = undefined;
                        closeFight("app_b-fight-fight");
                        startFight();
                        forelet.paint(getData());
                    }
                }, 1000)
            }
        }).catch((data) => {
            console.log(data);
        })
};

/**
 * 领取楼层奖励宝箱
 */
export const getBoxAward = function () {
    let arg = {
        "param": { "index": box_id },
        "type": "app/pve/tower@buy"
    };
    towerNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            updata("tower.buy_record", prop.buy_record);
            tower_data.buy_record = getDB("tower.buy_record");
            box_id = logic.floorBoxId();
            tplData();
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
        })
};

/**
 * 开始扫荡，记录开始时间
 */
const startSweep = function () {
    let arg = {
        "param": {},
        "type": "app/pve/tower@start_sweep"
    };
    towerNet(arg)
        .then((data: any) => {
            let surplus_time = 0;
            let prop: any = Common.changeArrToJson(data.ok);
            updata("tower.start_sweep_time", prop.start_sweep_time);
            updata("tower.use_sweep_count", prop.use_times);
            updata("tower.sweep_award", prop.sweep_award);
            //console.log(prop);
            let sweep_box_time = 0, //扫荡宝箱总时间
                nowTime = Util.serverTime(), //当前服务器时间(毫秒)
                count = Math.floor(tower_data.floor_point / 10); //扫荡的宝箱个数
            for (let i = 0; i < count; i++) {
                sweep_box_time += tower_fast_sweep[i + 1].sweep_time;
            }
            //扫荡总时间
            sweep_total_time = prop.start_sweep_time + sweep_box_time;
            let arr = tower_base.diamond_coefficient;
            surplus_time = Math.ceil((prop.start_sweep_time + sweep_box_time - nowTime / 1000) / 60);
            cost_diamond = Math.pow(surplus_time / arr[0], arr[1]) + arr[2];
            refreshDiamond();
            forelet.paint(getData());
            open("app_c-tower-fast_sweep-fast_sweep");
        })
        .catch((data) => {
            console.log(data);
        })
}

/**
 * 领取扫荡奖励
 */
export const getSweepAward = function () {
    let arg = {
        "param": {},
        "type": "app/pve/tower@sweep_award"
    };
    towerNet(arg)
        .then((data: any) => {
            let sweep_box_time = 0, //扫荡宝箱总时间
                nowTime = Util.serverTime(), //当前服务器时间(毫秒)
                count = Math.floor(tower_data.floor_point / 10); //扫荡的宝箱个数
            let prop: any = Common.changeArrToJson(data.ok);
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            updata("tower.start_sweep_time", prop.start_sweep_time);
            updata("tower.sweep_award", prop.sweep_award);

            for (let i = 0; i < count; i++) {
                sweep_box_time += tower_fast_sweep[i + 1].sweep_time;
            }
            //扫荡总时间
            sweep_total_time = tower_data.start_sweep_time + sweep_box_time;

            //console.log(prop);
            //领取宝箱后关闭扫荡界面
            //--------------code
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
        })
}

/**
 * 快速扫荡
 */
export const fastSweep = function () {
    let arg = {
        "param": {},
        "type": "app/pve/tower@quick_sweep"
    };
    towerNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            updata("tower.sweep_award", prop.sweep_award);
            updata("tower.start_sweep_time", prop.start_sweep_time);
            sweep_total_time = 0;
            cost_diamond = 0;
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
        })
}


//读取基本数据
listenBack("app/pve/tower@read", (data) => {
    console.log(data);
    updata("tower", data);
    //获取领取宝箱id
    box_id = logic.floorBoxId();
    forelet.paint(getData());
})

