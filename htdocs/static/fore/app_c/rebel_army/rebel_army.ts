//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { open as pi_open, destory } from "pi/ui/root";
import { Common } from "app/mod/common";
import { updata, get as getDB } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight, showAccount } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { analyseFighter, analyseData } from "fight/a/fore/node_fight";
import { mgr_data, mgr } from "app/scene/scene";
import { mapList, initMapList, handScene, change_status} from "app_b/fight_ol/handscene";
import { UiFunTable, initValue, getEffectId } from "app/scene/ui_fun";
import { setClickCallback, initAnimFinishCB } from "app/scene/base/scene";
import { Fight_common } from "fight/a/fore/fight_common";
import { map_cfg } from "app/scene/plan_cfg/map";
import { funIsOpen } from "app_b/open_fun/open_fun";
//导入配置
import { kill_monster_base } from "cfg/c/kill_monster_base";
import { kill_monster_num } from "cfg/c/kill_monster_num";
import { kill_monster_damage_level } from "cfg/c/kill_monster_damage_level";
import { kill_monster_damage } from "cfg/c/kill_monster_damage";
import { kill_monster_rank_award } from "cfg/c/kill_monster_rank_award";
 

export const forelet = new Forelet();


//外部打开
export const globalReceive = {
    //打开入口
    gotoRebel: () => {
        if (funIsOpen("rebel")) {
            forelet.paint(getData());
            open("app_c-rebel_army-entry-entry");
            globalSend("openNewFun","rebel");
        }

    }
}

//前台操作
export class Rebel extends Widget {
    //关闭
    goback (arg) {
        close(arg.widget);
    }
    //进入除魔卫道 暂时注释
    openRebel () {
        let flag = logic.isOpen();
        //开启
        if (flag) {
            forelet.paint(getData());
            pi_open("app_c-rebel_army-rebel_army");
            let w = forelet.getWidget("app_c-rebel_army-entry-entry");
            if (w) {
                close(w);
            }
            logic.initRebelScene()
            //退出野外, 进入除魔卫道
            globalSend("exitWild", enterFight)
        }
    }
    //领取杀怪数量 或 个人输出奖励
    getBoxAward (type) {
        if (type === 1) {
            logic.killNumAward(type);
        } else {
            logic.playerDamageAward(type);
        }
    }
    //领取随机宝箱奖励
     getRandomBoxAward () {
        logic.randomBox();
     }
     //查看输出排行
     openRank () {
         lookRank();
     }
     //tab切换
     tabChange (str) {
        if (tabSwitch === str) {
            return;
        } else {
            tabSwitch = str;
            forelet.paint(getData());
        }
     }
     //退出战斗
     exit () {
        exitFight();
     }
}


//******************************************test*********************************/

let rebel_data:any = {
        "kill_monster_base": kill_monster_base,
        "kill_monster_num": kill_monster_num,
        "kill_monster_damage_level": kill_monster_damage_level,
        "kill_monster_damage": kill_monster_damage,
        "kill_monster_rank_award": kill_monster_rank_award,
        "Pi": {
            "sample": Pi.sample,
            "pictures": Pi.pictures
        },
        "map_cfg": map_cfg,
        "Common": Common
    },
    killNumBoxID = 1, //全区杀怪数量，对应领取宝箱id
    damageBoxID = 1, //玩家个人伤害，对应领取宝箱id
    damageAwardLevel = 0, //玩家对应等级领取奖励等级
    tabSwitch = "rank",
    rank_info, //所有排名
    my_rank, //我的排名
    fight_r = {"fightEvents": [], now: 0},
    fm; //切换场景位置

const getData = function () {
    //随机宝箱数
    rebel_data.box_num = getDB("rebel_army.box_num");
    //全区杀怪数量
    rebel_data.total_kill_monster_num = getDB("rebel_army.total_kill_monster_num");
    //全区杀怪数量奖励
    rebel_data.kill_monster_num_record = getDB("rebel_army.kill_monster_num_record");
    //个人总输出
    rebel_data.total_damage = getDB("rebel_army.total_damage");
    //个人总输出奖励
    rebel_data.total_damage_record = getDB("rebel_army.total_damage_record");

    rebel_data.killNumBoxID = killNumBoxID;
    rebel_data.damageBoxID = damageBoxID;
    rebel_data.damageAwardLevel = damageAwardLevel;

    rebel_data.rank_info = rank_info;
    rebel_data.my_rank = my_rank;
    rebel_data.tabSwitch = tabSwitch;

    return rebel_data;
}

//页面逻辑处理
export let logic = {
    //判断此时是否开启
    isOpen: function () {
        //获取服务器时间 (毫秒)
        let nowTime = Util.serverTime(),
            time = new Date(nowTime),
            hour = time.getHours(),
            minutes = time.getMinutes();
        let allMinutes = hour * 60 + minutes;
        if (allMinutes >= kill_monster_base.open_time[0] && allMinutes < kill_monster_base.open_time[1]) {
            return true;
        } else {
            globalSend("screenTipFun", { words: `每天19:30-20:00开放` });
            return false;
        }
    },
    //当前领取宝箱id
    boxAwardID: function (arr) {
        let i,
            len = arr.length;
        for (i = 0; i < len; i++) {
            if (arr[i] <= 0) {
                return i + 1;
            }
        }
        return -1;
    },
    //判断能否领取杀怪数量奖励
    killNumAward: function (type) {
        if (killNumBoxID === -1) {
            globalSend("screenTipFun", { words: `奖励已领完` });
            return false;
        }
        if (rebel_data.total_kill_monster_num < kill_monster_num[killNumBoxID]) {
            globalSend("screenTipFun", { words: `杀怪数量不足` });
            return false;
        }
        // let flag = Common_m.bagIsFull();
        // if (flag) {
        //     globalSend("screenTipFun", {
        //         words: `背包已满`
        //     });
        //     return false;
        // }
        return monsterAward(type, killNumBoxID);
    },
    //判断能否领取个人输出奖励
    playerDamageAward: function (type) {
        if (damageBoxID === -1) {
            globalSend("screenTipFun", { words: `奖励已领完` });
            return false;
        }
        let damage = kill_monster_damage[damageAwardLevel];
        if (rebel_data.total_damage < damage[damageBoxID]) {
            globalSend("screenTipFun", { words: `输出伤害不足` });
            return false;
        }
        // let flag = Common_m.bagIsFull();
        // if (flag) {
        //     globalSend("screenTipFun", {
        //         words: `背包已满`
        //     });
        //     return false;
        // }
        monsterAward(type, damageBoxID);
    },
    //找出玩家伤害的等级奖励
    damageAwardLevel: function () {
        let i,
            level = getDB("player.level"),
            len = kill_monster_damage_level.length;
        for (i = 0; i < len; i++) {
            if (level >= kill_monster_damage_level[i][0] && level <= kill_monster_damage_level[i][1]) {
                return i;
            }
        }
        return len - 1;
    },
    //能否领取随机宝箱
    randomBox: function () {
        if (rebel_data.box_num <= 0) {
            globalSend("screenTipFun", { words: `暂时没有随机宝箱` });
            return;
        }
        // let flag = Common_m.bagIsFull();
        // if (flag) {
        //     globalSend("screenTipFun", {
        //         words: `背包已满`
        //     });
        //     return false;
        // }
        //领取
        return randomBoxAward()
    },
    //处理接收到的战斗事件
    dealFightEvents: function () {
        if (fight_r.fightEvents.length > 0) {
            let i = 0,
                len = fight_r.fightEvents.length;
            for ( ; i < len; i++) {
                let e = fight_r.fightEvents[i];
                handScene[e.type](e, fight_r.now);
                if (e.type === "damage" || e.type === "effect") {
                    logic.damageFun(e);
                }
            }
        }
        UiFunTable.runCuurUi(fight_r);
        return true;
    },
    //处理战斗伤害事件
    damageFun: function (e) {
        let role_id = getDB("player.role_id"),
            target = mapList[e.target.mapId],
            _fighter = mapList[e.fighter.mapId],
            r = e.r,
            d;
        //自己死亡
        if(target.sid === role_id &&　target.hp <= 0){
            //TODO..
            globalSend("self_die");
        }
    },
    //屏幕点击事件
    clickScene: function (result) {
        if (!result) return;
        if (fm) {
            mgr.remove(fm);
            fm = undefined;
        }
        if (result.type === "terrain") {
            fm = Fight_common.createDest(result.data[0], result.data[2], false, getEffectId());
        }
        let msg = {
            "param":{
                "type": "rebel",
                "result": JSON.stringify(result)
            },
            "type": "app/same_fight@accept_fight_order"
        };
        rebelNet(msg)
        .then(() => {})
        .catch((data) => {
            console.log(data.why);
        })
    },
    //进游戏初始化场景
    initRebelScene: function () {
        //此处判断是否需要切换场景位置
        initAnimFinishCB((id)=>{ 
            if (fm && id === fm.id) {
                mgr.remove(fm);
                fm = undefined
                return true;
            }
        });
        //设置点击监听
        setClickCallback(function (result) {
            logic.clickScene(result);
        });
    },
    //清除场景数据
    clearData: function () {
        initMapList();
        UiFunTable.clearTO();
        initValue();
    },
    //处理排行数据
    initRankData: function (arr) {
        let id = getDB("player.role_id");
        let len = arr.length,
            rank = [];
        if (len === 0) return rank;
        for (let i = 0; i < len; i++) {
            rank[i] = Common.changeArrToJson(arr[i]);
            rank[i].gang_name = Common.fromCharCode(rank[i].gang_name);
            rank[i].name = Common.fromCharCode(rank[i].name);
            if (rank[i].role_id === id) {
                my_rank = rank[i];
            }
        }
        return rank;
    }
}

/**
 * 
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const rebelNet = function (param) {
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
 * 进入除魔卫道(创建战斗场景)
 */
export const enterFight = function () {
    let arg = {
        "param": {},
        "type": "app/pve/rebel_army@fight"
    };
    rebelNet(arg)
    .then((data:any) => {
        //数量奖励
        killNumBoxID = logic.boxAwardID(rebel_data.kill_monster_num_record);
        //伤害奖励
        damageBoxID = logic.boxAwardID(rebel_data.total_damage_record);
        //按玩家等级选取领奖等级
        damageAwardLevel = logic.damageAwardLevel();

        //*****************************场景创建开始 */
        let _data:any = Common.changeArrToJson(data.ok);
        let events:any = analyseFighter(_data);
        fight_r.fightEvents = events.event;
        fight_r.now = events.now;
        logic.dealFightEvents();
        change_status(0);
        //*****************************场景创建结束 */
    })
    .catch((data) => {
        console.log(data);
    })
};

/**
 * 领取宝箱奖励
 * @param type Number (1表示全区击杀怪物数量奖励，2表示玩家个人伤害奖励)
 */
export const monsterAward = function (type, index) {
    let arg = {
        "param": {
            "type": type,
            "index": index
        },
        "type": "app/pve/rebel_army@award"
    };
    rebelNet(arg)
    .then((data:any) => {
        let prop = Common.changeArrToJson(data.ok);
        Common_m.mixAward(prop);
        if (type === 1) {
            updata(`rebel_army.kill_monster_num_record.${index-1}`, 1);
            let arr = getDB("rebel_army.kill_monster_num_record");
            killNumBoxID = logic.boxAwardID(arr);
        } else if (type === 2) {
            updata(`rebel_army.total_damage_record.${index-1}`, 1);
            let arr = getDB("rebel_army.total_damage_record");
            damageBoxID = logic.boxAwardID(arr);
        }
        forelet.paint(getData());
    })
    .catch((data) => {
        console.log(data);
    })
};

/**
 * 领取随机宝箱
 */
export const randomBoxAward = function () {
    let arg = {
        "param": {},
        "type": "app/pve/rebel_army@box_award"
    };
    rebelNet(arg)
    .then((data:any) => {
        let prop:any = Common.changeArrToJson(data.ok);
        Common_m.mixAward(prop);
        updata("rebel_army.box_num", prop.box_num);
        rebel_data.box_num = prop.box_num;
        forelet.paint(rebel_data);
    }).catch((data) => {
        console.log(data);
    })
};

/**
 * 查看输出排行
 */
export const lookRank = function () {
    let arg = {
        "param": {},
        "type": "app/pve/rebel_army@rank"
    };
    rebelNet(arg)
    .then((data:any) => {
        let prop:any = Common.changeArrToJson(data.ok);
        //console.log(prop);
        rank_info = logic.initRankData(prop.rank_info);
        forelet.paint(getData());
        open("app_c-rebel_army-rank-rank");
    })
    .catch((data) => {
        console.log(data);
    })

}

/**
 * 退出战斗场景
 */
const exitFight = function () {
    let arg = {
        "param": {},
        "type": "app/pve/rebel_army@exit_fight"
    };
    rebelNet(arg)
    .then((data:any) => {
        //清楚各种场景数据
        logic.clearData();
        //关闭除魔卫道
        let w = forelet.getWidget("app_c-rebel_army-rebel_army");
        if (w) {
            destory(w);
        }
        //进入野外战斗
        globalSend("intoWild");
    })
    .catch((data) => {
        console.log(data);
    })
};


//读取基本数据
listenBack("app/pve/rebel_army@read", (data) => {
    //console.log(data);
    updata("rebel_army", data);
    forelet.paint(getData());
})


/**
 * 后台推送
 * 
 * rebel_army_kill_monster 全区杀怪数量
 * 
 * rebel_army_total_damage 个人总输出
 * 
 * rebel_army_box_num 随机宝箱
 * 
 * rebel_award 每杀一个怪的奖励
 */

 net_message("rebel_army_kill_monster", (data) => {
    updata("rebel_army.total_kill_monster_num", data.num);
    forelet.paint(getData());
 });

 net_message("rebel_army_total_damage", (data) => {
    //console.log(data);
    updata("rebel_army.total_damage", data.damage);
    forelet.paint(getData());
 });

 net_message("rebel_army_box_num", (data) => {
     let id = getDB("player.role_id");
     if (data.box_num_info[0][0] == id) {
        let name = getDB("player.name");
        updata("rebel_army.box_num", data.box_num_info[0][1][1][1]);
        //抛出提示
        globalSend("screenTipFun", {
            words: `恭喜${name}获得随机宝箱`
        })
     }
    //console.log(data);
 });

 net_message("rebel_award", (data) => {
    //console.log(data);
    let result = Common_m.mixAward(data);
    result.auto = 1;
    globalSend("showNewRes",{
        result, function (result1) {
            result1.open();
        }
    });
 });

//接收后台推送战斗指令
net_message("order", (msg) => {
    if (mgr_data.name !== "rebel") {
        return;
    }
    let events:any = analyseData(msg);
    fight_r.fightEvents = events.event;
    fight_r.now = events.now;
    logic.dealFightEvents();
});

