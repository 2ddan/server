//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { open as pi_open, destory } from "pi/ui/root";
import { Common } from "app/mod/common";
import { updata, get as getDB, listen } from "app/mod/db";
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
import { config_reset } from "cfg/b/config_reset";
import { funIsOpen } from "app_b/open_fun/open_fun";
//导入配置
import { world_boss_base } from "cfg/c/world_boss_base";
import { world_boss_self_award_level } from "cfg/c/world_boss_self_award_level";
import { world_boss_self_award } from "cfg/c/world_boss_self_award";
import { world_boss_rank_award } from "cfg/c/world_boss_rank_award";
import { vip_advantage } from "cfg/c/vip_advantage";

export const forelet = new Forelet();


//外部打开
export const globalReceive = {
    //打开入口
    gotoWorldBoss: () => {
        if (funIsOpen("world_boss")) {
            //初始化部分数据
            logic.initData();
            forelet.paint(getData());
            open("app_c-world_boss-main-main");
            globalSend("openNewFun", "world_boss");
        }
    }
}

//前台操作
export class Rebel extends Widget {
    //关闭
    goback (arg) {
        close(arg.widget);
    }
    //输出排行切换
    tabChange (type) {
        if (tabSwitch == type) {
            return;
        }
        tabSwitch = type;
        forelet.paint(getData());
    }
    //挑战boss
    challenge () {
        logic.challenge();
    }
    //退出战斗
    exit () {
        exitFight();
    }
    //打开输出排行 
    // openInfo (type) {
    //     damageRank(type);
    // }
}


//******************************************test*********************************/

let world_boss:any = {
        "map_cfg": map_cfg,
        "damage_award": [],
        "rank_award": {},
        //实时排名(后台推送)
        "rank_info": [],
    },
    tabSwitch = "danage",
    boss_id, //此次活动boss_id
    // rank_info, //所有排名
    // my_rank, //我的排名
    fight_r = {"fightEvents": [], now: 0},
    fm, //切换场景位置
    Boss;

const getData = function () {
    //输出奖励
    world_boss.award_record = getDB("world_boss.award_record");
    //boss信息[id,level,hp,max_hp]
    world_boss.boss_info = getDB("world_boss.boss_info");
    //战斗结算时间
    world_boss.fight_end_time = getDB("world_boss.fight_end_time");
    //击杀boss玩家
    world_boss.kill_boss_name = getDB("world_boss.kill_boss_name");
    //幸运一击玩家
    world_boss.luck_attack_user = getDB("world_boss.luck_attack_user");
    //自己的输出排名
    world_boss.own_total_damage_rank = getDB("world_boss.own_total_damage_rank");
    //自己的总输出
    world_boss.total_damage = getDB("world_boss.total_damage");
    //输出排行
    world_boss.total_damage_rank_list = getDB("world_boss.total_damage_rank_list");
    //购买buff次数
    world_boss.buy_buff_count = getDB("world_boss.buy_buff_count");

    world_boss.awardSort = logic.awardSort;
    
    return world_boss;
}

//页面逻辑处理
export let logic = {
    //判断此时是否开启
    isOpen: function () {
        //boss是否已被杀害
        if (world_boss.kill_boss_name) {
            globalSend ("screenTipFun", {
                words: `boss已被${world_boss.kill_boss_name}击杀`
            });
            return false;
        }

        //是否在活动期间 获取服务器时间 (毫秒)
        let nowTime = Util.serverTime(),
            time = new Date(nowTime),
            hour = time.getHours(),
            minutes = time.getMinutes();
        let allMinutes = hour * 60 + minutes;
        if (allMinutes >= world_boss_base.open_time && allMinutes < world_boss_base.close_time) {
            return true;
        } else {
            globalSend("screenTipFun", { words: `每天19:30-20:00开放` });
            return false;
        }
    },
    //获得
    initData: function () {
        //玩家输出奖励等级
        let lv = 0,
            level = getDB("player.level");
        for (let i = 0,len = world_boss_self_award_level.length; i < len; i++) {
            if (level >= world_boss_self_award_level[0] && level <= world_boss_self_award_level[1]) {
                lv = i;
            }
        }
        world_boss.damage_award = world_boss_self_award[lv];
        
        //获取boss配置奖励
        world_boss.rank_award = world_boss_rank_award[boss_id];

    },
    //挑战
    challenge: function () {
        let flag = logic.isOpen();
        if (flag) {
            //打开场景
            forelet.paint(getData());
            pi_open("app_c-world_boss-world_boss");
            //初始化场景
            //logic.initRebelScene();
            //退出野外 (回调通信开始战斗)
            globalSend("exitWild", enterFight);
        }
    },
    //购买buff (一次一次的购买)
    buyBuff: function () {
        let diamond = getDB("player.diamond"),
            cost = 0,
            arr = world_boss_base.buy_buff_price,
            num = (world_boss.buy_buff_count < arr.length) ? world_boss.buy_buff_count : arr.length -1;
        cost = arr[num];
        if (diamond < cost) {
            globalSend("screenTipFun", {
                words: `元宝不足`
            });
            return;
        }
        buyBuff();
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
            if (!Boss) {
                for (let v in mapList) {
                    if (mapList[v].type === "monster") {
                        Boss = mapList[v];
                        break;
                    }
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
            //弹出框询问是否复活
            globalSend("popTip",{
                title: "s 后自动复活",
                btn_name: ["立即复活", "退出"],
                to_time: config_reset.revive*1000,
                cb: [
                    //确认
                    (flag)=>{
                        logic.resurgence((flag?1:0));
                    },
                    () => {
                        //退出战斗
                        exitFight();
                    }
                ]
            })
        }
    },
    //立即复活 type: 0-> 表示玩家点击立即复活,  1-> 表示倒计时结束后自动复活
    resurgence: function (type) {
        let vip = getDB("player.vip"),
        resurgence_time = getDB("world_boss.resurgence_time");
        //是否为免费复活
        if ((type === 1) || (vip_advantage[vip] > resurgence_time)) {
            //免费
            resurgence()
        } else {
            let num = resurgence_time - vip_advantage[vip],
                diamond = getDB("player.diamond"),
                costArr = world_boss_base.resurrection_expend;
            num = (num < costArr.length) ? num : (costArr.length - 1);
            if (diamond < costArr[num]) {
                globalSend("screenTipFun", {
                    words: `元宝不足, 倒计时结束后自动复活`
                });
                return;
            } else {
                resurgence();
            }
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
                "type": "world_boss",
                "result": JSON.stringify(result)
            },
            "type": "app/same_fight@accept_fight_order"
        };
        worldBossNet(msg)
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
                return;
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
    //处理伤害排行数据
    initRankData: function (arr) {
        let len = arr.length,
            rank = [];
        if (len === 0) return rank;
        for (let i = 0; i < len; i++) {
            rank[i] = Common.changeArrToJson(arr[i]);
            if (Array.isArray(rank[i].name)) {
                rank[i].name = Common.fromCharCode(rank[i].name);
            }
        }
        return rank;
    },
    //领取奖励 1,2,3,4...
    getAward: function (index) {
        if (world_boss.award_record[index] > 0) {
            globalSend("screenTipFun", {
                words: `已领取`
            });
            return;
        }
        if (world_boss.total_damage < world_boss.damage_award[index].damage) {
            globalSend("screenTipFun", {
                words: `输出伤害不足`
            });
            return;
        }
        getDamageAward(index-0+1);
    },
    //排序
    awardSort: function (arr) {
        let sortArr = arr.slice(0).sortArr.sort((a, b) => {
            return world_boss.award_record[a.index] - world_boss.award_record[b.index];
        });
        return sortArr;
    }
}

/**
 * 
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const worldBossNet = function (param) {
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
const enterFight = function () {
    let arg = {
        "param": {},
        "type": "app/pve/worldboss@fight"
    };
    worldBossNet(arg)
    .then((data:any) => {
        let _data:any = Common.changeArrToJson(data.ok);
        let events:any = analyseFighter(_data);
        //初始化场景
        logic.initRebelScene();
        fight_r.fightEvents = events.event;
        fight_r.now = events.now;
        //处理伤害事件
        logic.dealFightEvents();
        //自动战斗
        change_status(0);
    })
    .catch((data) => {
        console.log(data);
        globalSend("screenTipFun", {
            words: `通信失败`
        })
    })
};

/**
 * 购买buff
 */
const buyBuff = function () {
    let arg = {
        "param": {},
        "type": "app/pve/worldboss@buy_buff"
    };
    worldBossNet(arg)
    .then((data:any) => {
        let prop:any = Common.changeArrToJson(data.ok);
        Common_m.deductfrom(prop);
        updata("world_boss.buy_buff_count", prop.buy_buff_count);
        world_boss.buy_buff_count = prop.buy_buff_count;
        forelet.paint(world_boss);
    })
    .catch((data) => {
        console.log(data);
        globalSend("screenTopFun", {
            words: `购买失败`
        })
    })
}

/**
 * 退出战斗场景
 */
export const exitFight = function () {
    let arg = {
        "param": {},
        "type": "app/pve/worldboss@exit"
    };
    worldBossNet(arg)
    .then((data) => {
        //清理场景数据，关闭页面
        logic.clearData();
        let w = forelet.getWidget("app_c-world_boss-world_boss");
        if (w) {
            destory(w);
        }
        //进入野外战斗
        globalSend("intoWild");
    })
    .catch((data) => {
        console.log(data);
        globalSend("screenTipFun", {
            words: `退出失败`
        })
    })
};

/**
 * 请求伤害排名数据 (幸运一击, 伤害排行, 我的排名)
 */
export const damageRank = function () {
    let arg = {
        "param": {},
        "type": "app/pve/worldboss@rank"
    };
    worldBossNet(arg)
    .then((data:any) => {
        let prop:any = Common.changeArrToJson(data.ok);
        //console.log(prop);
        let damage_rank = logic.initRankData(prop.total_damage_rank_list);
        updata("world_boss.total_damage_rank_list", damage_rank);

        let luck_user = logic.initRankData(prop.luck_attack_user);
        updata("world_boss.luck_attack_user", luck_user);

        updata("world_boss.own_total_damage_rank", prop.own_total_damage_rank);

        forelet.paint(getData());
        //open("app_c-world_boss-rank-rank");
    })
    .catch((data) => {
        console.log(data);
        globalSend("screenTipFun", {
            words: `通讯失败`
        })
    })
}

/**
 * 获取输出奖励
 * @param index 奖励序号
 */
const getDamageAward = function (index) {
    let arg = {
        "param": {
            "index": index
        },
        "type": "app/pve/worldboss@award"
    };
    worldBossNet(arg)
    .then((data:any) => {
        let prop = Common.changeArrToJson(data.ok);
        Common_m.mixAward(prop);

        forelet.paint(world_boss);
    })
    .catch((data) => {
        console.log(data);
        globalSend("screenTipFun", {
            words: `通讯失败`
        })
    })
}

/**
 * 复活
 */
const resurgence = function () {
    let arg = {
        "param": {},
        "type": "app/pve/worldboss@resurgence"
    };
    worldBossNet(arg)
    .then((data:any) => {
        let prop:any = Common.changeArrToJson(data.ok);
        Common_m.deductfrom(prop);
        updata("world_boss.resurgence_time", prop.resurgence_time);
    })
    .catch((data) => {
        console.log(data);
        globalSend("screenTipFun", {
            words: `通讯失败`
        })
    })
}


//读取基本数据
listenBack("app/pve/worldboss@read", (data) => {
    //console.log(data);
    data.luck_attack_user = logic.initRankData(data.luck_attack_user);
    updata("world_boss", data);
    //获取boss的id
    boss_id = data.boss_info[0];
    forelet.paint(getData());
});
//监听玩家等级
listen("player.level", () => {
    logic.initData();
})

/**
 * 杀死boss玩家
 * world_boss_kill_info
 * 
 * 伤害排名
 * world_boss_rank_info
 * 
 * 全服总伤害
 * world_boss_damage
 */
net_message("world_boss_kill_info", (data) => {
    //console.log(data);
    updata("world_boss.kill_boss_name", data.name);
    exitFight();
    forelet.paint(getData());
});
net_message("world_boss_rank_info", (data) => {
    //console.log(data);
    world_boss.rank_info = logic.initRankData(data.rank_info[1]);
    updata("world_boss.total_damage", data.damage);
    updata("world_boss.own_total_damage_rank", data.own_rank);
    forelet.paint(world_boss);
});
net_message("world_boss_damage", (data) => {
    //console.log(data.damage);
    let num = Boss.max_hpCount - data.damage;
        Boss.hp > num && (Boss.hp = num);
        Boss.show_hp > num && (Boss.show_hp = num);
});

//滚动消息，其他地方处理
// net_message("roll_notice", (data) => {
//     console.log(data);
// });


//接收后台推送战斗指令
net_message("order", (msg) => {
    if (mgr_data.name !== "world_boss") {
        return;
    }
    let events:any = analyseData(msg);
    fight_r.fightEvents = events.event;
    fight_r.now = events.now;
    logic.dealFightEvents();
});
