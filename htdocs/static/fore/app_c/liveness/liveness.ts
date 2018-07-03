/**
 * 模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB, insert, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { function_open } from "cfg/b/function_open";

/**
 * 配置
 */
import { liveness_box } from "cfg/c/liveness_box";
import { liveness_reward } from "cfg/c/liveness_reward";

insert("liveness", {});

/**
 * 入口
 */
export const globalReceive = {

}

let liveness_data: any = {
    "Pi": Pi,
    "function_open": function_open
};

/**
 * 页面数据更新
 */
const getData = function () {
    //活跃度
    liveness_data.liveness_value = getDB("liveness.liveness_value");
    //开箱子要求达到活跃度
    liveness_data.liveness_condition = logic.live_con();
    //任务奖励是否已领取
    liveness_data.type_award = getDB("liveness.type_award");
    //宝箱领取
    liveness_data.value_award = getDB("liveness.value_award");
    //任务
    liveness_data.mySort = logic.mySort;
    liveness_data.fun_id = getDB("open_fun.id") || 0;
    return liveness_data;
}

/**
 * 读取后台数据
 */
listenBack("app/activity/liveness@read", (data) => {
    updata("liveness", data);
    forelet.paint(getData());
})


/**
 * 创建forelet
 */
export const forelet = new Forelet();

/**
 * 前台点击
 */
export class Liveness extends Widget {
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    }
    //任务
    openTask(obj) {
        logic.openTask(obj);
    }
    //打开宝箱 [0, 1, 2, 3, 4]
    openBox(index) {
        let value_award = getDB("liveness.value_award");
        if (value_award[index]) {

            globalSend("screenTipFun", {
                "words": `已领取`
            })
            return;
        }
        logic.openBox(index);
    }
}


/**
 * 逻辑处理
 */
const logic = {
    //活跃度条件进度条
    live_con() {
        let obj: any = {
            "limit": [],
            "progress": []
        };
        let arr = [];
        let max = liveness_box.slice(0).pop().liveness_value;
        for (var i = 0, len = liveness_box.length; i < len; i++) {
            obj.progress.push(Math.floor(liveness_box[i].liveness_value / max * 100));
            obj.limit.push(liveness_box[i].liveness_value);
        }
        obj.max = max;
        return obj;
    },
    //任务排序 1: 可以领取, 2: 不能领取, 3:已领取
    mySort() {
        let arr = liveness_reward.slice(0);
        let type_award = getDB("liveness.type_award");
        let task = [],
            over = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            let value = logic.task_progress(arr[i].key, arr[i].condition_value);
            //已完成
            if (type_award[i] > 0) {
                over.push({
                    "task": arr[i],
                    "value": value,
                    "flag": 3,
                    "index": i
                });
                continue;
            }
            if (value[0]) {
                task.unshift({
                    "task": arr[i],
                    "value": value,
                    "flag": 1,
                    "index": i,
                    "completion": 1 //完成度
                })
            } else {
                task.push({
                    "task": arr[i],
                    "value": value,
                    "flag": 2,
                    "index": 1,
                    "completion": (value[1] / arr[i].condition_value).toFixed(2) //完成度
                });
            }
        }
        task.sort(function(a,b){
            return (b.completion > a.completion ? 1 : -1);
        })
        return [...task, ...over];
    },
    //任务完成情况
    task_progress(key, value) {
        let arr = getDB(`data_record.${key}`);
        let num = 0;
        if (key == "equip_melt") {
            arr[0].forEach(v => {
                num += v.length;
            });
        } else {
            num = arr[0].length > 0 ? arr[0].length : 0;
        }
        return [num >= value, num >= value ? value : num];
    },
    //任务 [领取 || 前往]
    openTask(obj) {
        if (obj.flag === 1) {
            //领奖
            taskAward(obj.index);
        } else if (obj.flag === 2) {
            //前往
            let goto = obj.task.goto.split(",");
            globalSend(goto[0], goto[1] ? goto[1] : null);
        }
    },
    //宝箱 [领取 || 打开预览]
    openBox(index) {
        if (liveness_data.liveness_value >= liveness_box[index].liveness_value) {
            //领取奖励
            boxAward(index - 0);
        } else {
            //打开预览
            open("app_c-liveness-show_box", index);
        }
    }
}

/**
 * 后台通讯
 */

/**
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const livenessNet = function (param) {
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
 * 任务完成, 领取奖励
 * @param index
 */
const taskAward = function (index) {
    let arg = {
        "param": { "index": index + 1 },
        "type": "app/activity/liveness@single_award"
    };
    livenessNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            //保持奖励
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            liveness_data.liveness_value += prop.liveness;
            updata("liveness.liveness_value", liveness_data.liveness_value);
            updata(`liveness.type_award.${index}`, 1);
            forelet.paint(getData());
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                "words": data.why
            })
            console.log(data);
        })
}

/**
 * 领取宝箱奖励
 * @param index 
 */
const boxAward = function (index) {
    let arg = {
        "param": { "index": index + 1 },
        "type": "app/activity/liveness@liveness_award"
    };
    livenessNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            //保持奖励
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            let value_award = getDB("liveness.value_award");
            value_award[index] = 1;
            updata("liveness.value_award", value_award);
            forelet.paint(getData());
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                "words": `通讯失败`
            })
            console.log(data);
        })
}

/**
 * 后台推送-刷新任务
 */
let message = [
    "open_mystic_box", //神秘宝箱
    "pet", //翅膀培养
    "equip_fb",  //装备副本
    "instance", //就有副本
    "arena",  //竞技场
    "money_tree", //摇钱树
    "tower_sweep", //天庭秘境扫荡
    "dailyCopy",  //每日副本
    "wild_elite_kill", //击杀野外精英怪
    "world_speak", //世界频道发言
    "rank_pt", //排行榜送花
    "treasure_hexagram", //神兵注魂
    "equip_intensify", //装备强化
    "equip_melt", //装备熔炼
    "equip_wash", //装备洗练
    "gest_fight", //心法挑战
    "gest_inherit" //心法传承
];
let listen_str = message.map((x) => `data_record.${x}`).toString();
listen(listen_str, () => {
    forelet.paint(getData());
})

