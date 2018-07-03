//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB ,insert} from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight} from "app_b/fight/fight";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { resetcanvas } from "app/scene/base/scene";
//导入配置
import { vip_advantage } from "cfg/c/vip_advantage";
import { instance_cost } from "cfg/c/instance_cost";
import { instance_drop } from "cfg/c/instance_drop";
import { instance_welfare } from "cfg/c/instance_welfare";
import { instance_star } from "cfg/c/instance_star";
import { instance_base } from "cfg/c/instance_base";
import { attribute_config } from "cfg/c/attribute_config";


// 所有怪物配置
import { monster_base } from "fight/b/common/monsterBase";

export const forelet = new Forelet();
insert("instance_fb", {
    "use_times":0
});

//打开九幽副本
export const globalReceive = {
    "gotoInstance": () => {
        if (funIsOpen("instance_fb")) {
            chapter_id = Math.floor(getDB("instance_fb.instance_point") / 5) + 1;
            forelet.paint(getData());
            open("app_c-instance_fb-instance_fb");
            globalSend("openNewFun", "instance_fb");
            let timer =  setTimeout(()=>{
                globalSend("get_fbmonster",{
                    "type":"instance_fb",
                    "index":chapter_id
                });
                clearTimeout(timer);
                timer = null;
            },100)
        }
    },
    "exitFb": ()=>{
        logic.resetScene();
    }
}


//******************************************test*********************************/
let fb_data: any = {}, //副本购台基础数据
    chapter_id, //当前挑战的章节id
    guard_id, //关卡id
    boss_id, //挑战魔王的id
    star_up_index, //记录当前星图升级孔位
    selectArr = [],//选取未满15星的副本
    sweep_award = [],//扫荡奖励
    opacity = false,
    canSweep = true,//扫荡间隔
    total_star = 0; //九幽幻境总星数



const getData = function () {
    fb_data.instance_boss = getDB("instance_fb.instance_boss");
    fb_data.instance_point = getDB("instance_fb.instance_point");
    fb_data.instance_record = getDB("instance_fb.instance_record");
    fb_data.instance_star = getDB("instance_fb.instance_star");
    fb_data.tactical_record = getDB("instance_fb.tactical_record");
    fb_data.use_times = getDB("instance_fb.use_times");
    fb_data.vip_buy_times = getDB("instance_fb.vip_buy_times");
    fb_data.instance_drop = instance_drop;
    fb_data.instance_base = instance_base;
    fb_data.instance_cost = instance_cost;
    fb_data.instance_welfare = instance_welfare;
    fb_data.instance_star_arr = instance_star;
    fb_data.vip_advantage = vip_advantage;
    fb_data.Pi = Pi;
    fb_data.attr = attribute_config;
    fb_data.player = getDB("player");

    fb_data.chapter_id = chapter_id;
    fb_data.guard_id = guard_id;
    fb_data.boss_id = boss_id;
    fb_data.selectArr = selectArr;
    fb_data.opacity = opacity;

    fb_data.star_up_index = star_up_index;
    fb_data.sweep_award = sweep_award;

    return fb_data;
}


//前台操作
export class Instance extends Widget {
    //第一次渲染
    attach() {
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    detach(){
        let w = forelet.getWidget("app_c-instance_fb-instance_fb");
        if(!w)
            globalSend("remove_node","instance");
    }
    firstPaint() {
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    afterUpdate() {
        let w = forelet.getWidget("app_c-instance_fb-sweep-sweep");
        if(!w){return;}
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    //返回
    goback(arg) {
        let _w = forelet.getWidget("app_c-instance_fb-mission-mission") || forelet.getWidget("app_c-instance_fb-welfare-welfare");
        close(arg.widget);
        selectArr = [];
        if(_w){
            logic.resetScene();
        }

    }
    //购买挑战次数
    buyCount() {
        logic.canBuyCount();
    }
    //切换章节
    switch_chapter(arg) {
        chapter_id += arg;
        if (chapter_id < 1) chapter_id = 1;
        let len = Object.keys(instance_drop).length;
        if (chapter_id > len) chapter_id = len;
        forelet.paint(getData());
        globalSend("modify_node",{
            "type":"instance",
            "index":chapter_id
        });

    }
    //打开星阵图谱
    openStarArr() {
        star_up_index = logic.starUpPos();
        forelet.paint(getData());
        open("app_c-instance_fb-star_arr-star_arr");
    }
    //升级星阵
    up(index) {
        let l = logic.canStarUp(index);
        if (l) {
            starUp();
        }
    }
    //打开Boss关卡详情
    openWelfare() {  
        let monster = monster_base[ instance_welfare[boss_id].moster_id[0][0] ];
        let _module = monster.module;
        let name = monster.des;
        
        open("app_c-instance_fb-welfare-welfare",{"module":_module,"name":name});

    }
    //挑战Boss
    challengeBoss() {
        let flag = logic.canChallengeBoss();
        if (flag) {
            let w = forelet.getWidget("app_c-instance_fb-welfare-welfare");
            close(w);
            challengeBoss(boss_id);
        }
    }
    //打开关卡详情
    openMission(id) {
        guard_id = id;
        forelet.paint(getData());
        let monster = monster_base[ instance_drop[chapter_id][(guard_id-1)%5].moster_id[0][0] ];
        let _module = monster.module;
        let name = monster.des;
        globalSend("remove_node","instance");
        open("app_c-instance_fb-mission-mission",{"module":_module,"name":name,"scale":instance_drop[chapter_id][(guard_id-1)%5].scale});       
    }
    //挑战关卡
    challenge(chapter_id, guard_id) {
        let flag = logic.canChallenge(guard_id);
        if (flag) {
            let w = forelet.getWidget("app_c-instance_fb-mission-mission");
            close(w);
            challenge(chapter_id, guard_id);
        }
    }
    //扫荡
    sweep(chapter_id, guard_id) {
        if (!canSweep)
            return;
        let instance_record = getDB("instance_fb.instance_record");
        if (instance_record[chapter_id - 1][(guard_id - 1) % 5] < 3) {
            globalSend("screenTipFun", { words: `当前关卡星级小于3星,无法扫荡` });
            return false;
        }
        sweep_award = [];
        let flag = logic.canChallenge(guard_id);
        if (flag) {
            canSweep = false;
            let timer = setTimeout(function () {
                canSweep = true;
                clearTimeout(timer);
                timer = null;
            }, 1000)

            sweep(chapter_id, guard_id);
        }
    }
    //选取未满3星的副本
    openSelect() {
        logic.notFullStar();
        forelet.paint(getData());
        let w2 = forelet.getWidget("app_c-instance_fb-star_arr-star_arr");
        close(w2);
        open("app_c-instance_fb-select-select");
    }
    //选择未满3星的章节
    selectThis(arg) {
        chapter_id = arg;
        selectArr = [];
        let w1 = forelet.getWidget("app_c-instance_fb-select-select");
        w1 && close(w1);
        let w2 = forelet.getWidget("app_c-instance_fb-star_arr-star_arr");
        w2 && close(w2);
        forelet.paint(getData());
    }
    //物品详情
    propInfoShow = (id) => {
        globalSend("showOtherInfo", id);
    }
}

//页面逻辑处理
export let logic = {
     //场景重绘
     resetScene: function () {
        let data : any;
        let w = forelet.getWidget("app_c-instance_fb-instance_fb");
        if(!w){
            return;
        }
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app-scene-base-scene") {
                data = w.children[i];
                break;
            }
        }
        resetcanvas(data);
        let timer = setTimeout(()=>{
            globalSend("get_fbmonster",{
                "type":"instance_fb",
                "index":chapter_id
            });
            clearTimeout(timer);
            timer = null;
        },50); 
    },
    //判断是否可以购买次数
    canBuyCount: function () {
        //判断是否还能购买
        let vip = getDB("player.vip"),
            diamond = getDB("player.diamond"),
            num = fb_data.vip_buy_times, //已购买次数
            max = vip_advantage[vip].buy_instance_times,
            costArr = instance_cost;
        if (num >= max) {
            globalSend("screenTipFun", { words: `今日购买次数已用完` });
            return false;
        }
        //判断元宝
        if (diamond < (costArr[num] || costArr[costArr.length - 1])) {
            globalSend("popTip",{
                title:"<div>元宝不足</div><div>是否前往充值</div>",
                btn_name:["充值","取消"],
                cb:[
                    //确认
                    ()=>{
                        globalSend("gotoRecharge"); 
                    },
                    //取消
                    () => {}
                ]
            })
            // globalSend("screenTipFun", { words: `元宝不足,购买需${costArr[num]}元宝` });
            return false;
        }
        let buyData = {
            "title": "购买次数",
            "type": "九幽幻境",
            "coin": "diamond",
            "btn_name": "购 买",
            "price": costArr,
            "max_buy": max,
            "already_buy": num,
            "has_count": vip_advantage[vip].instance_times + num - getDB("instance_fb.use_times"),
            "buy_count": 1,
            "callBack": (r) => {
                buyCount(r);
            }
        };
        //发送消息购买
        globalSend("gotoBuyCount", buyData);
    },
    //判断能否挑战
    canChallenge: function (id) {
        //是否按顺序打关卡
        if (id - 1 > getDB("instance_fb.instance_point")) {
            globalSend("screenTipFun", { words: `请先通关前面的关卡` });
            return false;
        }
        //有无挑战次数
        let vip = getDB("player.vip"),
            //剩余挑战次数
            count = vip_advantage[vip].instance_times + fb_data.vip_buy_times - fb_data.use_times;
        if (count <= 0) {
            globalSend("screenTipFun", { words: `挑战次数已用完` });
            return false;
        }
        // let f = Common_m.bagIsFull();
        // if (f) {
        //     globalSend("screenTipFun", {
        //         words: `背包数量已满`
        //     })
        //     return false;
        // }
        return true;
    },
    //计算当前应当挑战的魔王关卡id
    countBossId: function (arr) {
        let i,
            len = arr.length;
        for (i = 0; i < len; i++) {
            if (arr[i] <= 0) {
                return i + 1;
            }
        }
        return len;
    },
    //判断能否挑战魔王
    canChallengeBoss: function () {
        let guard = instance_welfare[boss_id].limit_guard;
        if (fb_data.instance_point < guard) {
            globalSend("screenTipFun", {
                words: `通关 ${instance_drop[Math.floor(guard / 5)][0].chapter_name} 章节才可挑战该魔王`
            });
            return false;
        }
        return true;
    },
    //收集未满15星的副本
    notFullStar: function () {
        let n = 0,
            num = Math.floor(fb_data.instance_point / 5);
        for (; n <= num; n++) {
            let flag = fb_data.instance_record[n].some((x) => {
                return x < 3;
            })
            if (flag) {
                selectArr.push(n + 1);
            }

        }
    },
    //判断当前星图升级位置(打开星图时调用)
    starUpPos: function () {
        let i = 1,
            arr = getDB("instance_fb.tactical_record"),
            len = arr.length;
        if (arr[0] <= 0) return 1;
        for (; i < len; i++) {
            if (arr[i - 1] > arr[i]) return i + 1;
        }
        return 1;
    },
    //判断是否满足星图升级要求
    canStarUp: function (id) {
        if (!instance_star[id][fb_data.tactical_record[id - 1] + 1]) {
            globalSend("screenTipFun", {
                words: `已满级`
            });
            return false;
        }
        let prop = instance_star[id][fb_data.tactical_record[id - 1]];
        if (fb_data.instance_star < prop.cost_star) {
            globalSend("screenTipFun", {
                words: `星数不足`
            });
            return false;
        }

        return true;
    },
    //总星数
    totalStar: function (arr) {
        let total = 0;
        for (let v of arr) {
            if (v[0] === 0) {
                break;
            }
            v.forEach(i => {
                total += i;
            });
        }
        return total;
    }
}

/**
 * 
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const fbNet = function (param) {
    return new Promise((resolve, reject) => {
        net_request(param, (data) => {
            if (data.error) {
                reject(data);
            } else {
                globalSend("remove_node","instance");
                resolve(data);
            }
        })
    })
}

/**
 * 购买挑战次数
 * @param num :购买次数
 */
export let buyCount = function (num) {
    let arg = {
        "param": { "purchase_num": num },
        "type": "app/pve/instance@purchase"
    }
    fbNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok[1]);
            //扣除花费
            Common_m.deductfrom(prop);
            updata("instance_fb.vip_buy_times", prop.vip_buy_times);
            fb_data.vip_buy_times = getDB("instance_fb.vip_buy_times");
            forelet.paint(fb_data);
            logic.resetScene();
        }, (data) => {
            console.log(data);
        })
};

/**
 * 开始挑战关卡
 * @param chapter_id 章节id
 * @param guard_id 关卡id
 */
export let challenge = function (chapter_id, guard_id) {
    let arg = {
        "param": {
            "chapter_id": chapter_id,
            "guard_id": guard_id
        },
        "type": "app/pve/instance@start_fight"
    };
    fbNet(arg)
        .then((data: any) => {
            let prop = instance_drop[chapter_id][(guard_id - 1) % 5];
            let msg: any = Common.changeArrToJson(data.ok);
            let _show_award = Common.shallowClone(msg.show_award);
            for(let i= 0; i<msg.enemy_fight.length; i++){
                for(let j=0; j<msg.enemy_fight[i].length; j++){
                    msg.enemy_fight[i][j].push(_show_award[0]);
                    _show_award.splice(0,1);
                }
            }
            msg.type = "instance_mission";
            msg.cfg = prop;
            msg.star = 1;
            globalSend("fbStar", 1);
            return msg;
        }, (data) => {
            console.log(data);
        })
        .then((msg) => {
            fight(msg, (fightData) => {
                globalSend("fbStar", 0);
                //战斗胜利
                if (fightData.r === 1) {
                    winFight(guard_id, fightData);
                } else {
                    Common_m.openAccount(fightData, "instance_fb",{},0,()=>{
                        logic.resetScene();
                    });
                }
                globalSend("popBack");
                return true;
            })
        })
};

/**
 * 关卡战斗胜利
 * @param chapter_id 章节id
 * @param guard_id 关卡id
 * @param time 战斗所以时间
 */
let winFight = function (guard_id, result) {
    let arg = {
        "param": {
            "chapter_id": chapter_id,
            "guard_id": guard_id,
            "fight_time": result.time / 1000
        },
        "type": "app/pve/instance@end_fight"
    };
    fbNet(arg).then((data: any) => {
        let prop: any = Common.changeArrToJson(data.ok);
        //console.log(data);
        let award = Common_m.mixAward(prop);
        if (Object.keys(award.player).length > 0) {
            prop.player = award.player;
        }
        if (award.bag.length > 0) {
            prop.bag = award.bag;
        }

        total_star = total_star + prop.star_info[0][1] - fb_data.instance_record[chapter_id - 1][(guard_id - 1) % 5];
        //几星通关
        updata(`instance_fb.instance_record.${chapter_id - 1}.${(guard_id - 1) % 5}`, prop.star_info[0][1]);
        updata("instance_fb.total_star", total_star);
        //最大关卡
        updata(`instance_fb.instance_point`, prop.star_info[1][1]);

        //所用次数
        updata(`instance_fb.use_times`, prop.star_info[2][1]);
        //保存星数
        updata(`instance_fb.instance_star`, prop.star_info[3][1]);
        chapter_id = Math.floor(prop.star_info[1][1] / 5) + 1;
        forelet.paint(getData());
        // drop_outFun(prop.award.prop, function () {
        //     Common_m.openAccount(result, "instance_fb", prop, prop.star_info[0][1]);
        // });
        Common_m.openAccount(result, "instance_fb", prop, prop.star_info[0][1],()=>{
            logic.resetScene();
        });
    }).catch((data) => {
        console.log(data);
    })
}

/**
 * 扫荡关卡
 * @param chapter_id 章节id
 * @param guard_id 关卡id
 */
export let sweep = function (chapter_id, guard_id) {
    let arg = {
        "param": {
            "chapter_id": chapter_id,
            "guard_id": guard_id
        },
        "type": "app/pve/instance@sweep"
    };
    fbNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            //console.log(data);
            let result = Common_m.mixAward(prop);
            //所用次数
            updata(`instance_fb.use_times`, prop.use_times);
            fb_data.use_times = getDB("instance_fb.use_times");

            for (let v of result.bag) {
                sweep_award.push({
                    id: v.sid || v.id,
                    count: v.count || 0,
                    quality: v.quality
                });
            }
            if (result.player.money) {
                sweep_award.push({
                    id: 100001,
                    count: result.player.money,
                    quality: 1
                });
            }

            opacity = false;
            forelet.paint(getData());
            let w: any = forelet.getWidget("app_c-instance_fb-sweep-sweep");
            if (!w) {
                forelet.paint(getData());
                open("app_c-instance_fb-sweep-sweep");
            } else {
                forelet.paint(getData());
            }

        })
        .catch((data) => {
            console.log(data);
        })
}

/**
 * 开始挑战Boss
 * @param instance_id 魔王副本id
 */
export let challengeBoss = function (instance_id) {
    let arg = {
        "param": { "instance_id": instance_id },
        "type": "app/pve/instance@start_boss_fight"
    };
    fbNet(arg)
        .then((data: any) => {
            let prop = instance_welfare[instance_id];
            let msg: any = Common.changeArrToJson(data.ok);
            msg.type = "instance_boss";
            msg.cfg = prop;
            msg.fightTime = 1;
            fight(msg, (fightData) => {
                //战斗胜利
                if (fightData.r === 1) {
                    winBossFight(instance_id, fightData);
                    // node_fun();
                } else {
                    Common_m.openAccount(fightData, "instance_fb");
                    Common_m.openAccount(fightData, "instance_fb",{},0,()=>{
                        logic.resetScene();
                    });
                }
                globalSend("popBack");

            })
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `请依次通关`
            })
        })
};

/**
 * 魔王副本挑战胜利
 * @param instance_id 魔王副本id
 */
let winBossFight = function (instance_id, result) {
    let arg = {
        "param": { "instance_id": instance_id },
        "type": "app/pve/instance@end_boss_fight"
    };
    fbNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            let award = Common_m.mixAward(prop);
            if (Object.keys(award.player).length > 0) {
                prop.player = award.player;
            }
            if (award.bag.length > 0) {
                prop.bag = award.bag;
            }


            updata("instance_fb.instance_boss", prop.boss_record);

            //计算变化值
            boss_id = logic.countBossId(prop.boss_record);
            fb_data.boss_id = boss_id;
            fb_data.instance_boss = getDB("instance_fb.instance_boss");

            // drop_outFun(prop.award.prop, function () {
            //     Common_m.openAccount(result, "instance_fb", prop);
            // });
            Common_m.openAccount(result, "instance_fb", prop);
            Common_m.openAccount(result, "instance_fb",prop,0,()=>{
                logic.resetScene();
            });
            forelet.paint(fb_data);
        })
};

/**
 * 星图升级
 * @param index 星图升级的孔位
 */
export let starUp = function () {
    let arg = {
        "param": { "index": star_up_index },
        "type": "app/pve/instance@star_up"
    };
    fbNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            updata("instance_fb.tactical_record", prop.tactical_record);

            updata("instance_fb.instance_star", prop.instance_star);
            //属性提示
            let obj = instance_star[star_up_index];
            let preAttr = obj[prop.tactical_record[star_up_index - 1] - 1].attr;
            let nowAttr = obj[prop.tactical_record[star_up_index - 1]].attr;
            globalSend("attrTip", {
                words: `${attribute_config[nowAttr[0]]} +${Common_m.decimalToPercent(nowAttr[1] - preAttr[1])}`
            });
            if (star_up_index === 8) {
                star_up_index = 1;
            } else {
                star_up_index++;
            }
            forelet.paint(getData());
            logic.resetScene();

        })
        .catch((data) => {
            console.log(data);
        })
}

//读取基本数据
listenBack("app/pve/instance@read", (data) => {
    boss_id = logic.countBossId(data.instance_boss);
    chapter_id = Math.floor(data.instance_point / 5) + 1;
    total_star = logic.totalStar(data.instance_record);
    data.total_star = total_star;
    updata("instance_fb", data);
})

