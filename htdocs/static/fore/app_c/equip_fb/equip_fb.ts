//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { resetcanvas } from "app/scene/base/scene";
import { fight, showAccount } from "app_b/fight/fight";
//导入配置
import { equip_fb_cost } from "cfg/c/equip_fb_cost";
import { equip_fb_data } from "cfg/c/equip_fb_data";
import { vip_advantage } from "cfg/c/vip_advantage";
import { equip_fb_star } from "cfg/c/equip_fb_star";
import { equip_fb_base } from "cfg/c/equip_fb_base";
import { equip_fb_welfare_box } from "cfg/c/equip_fb_welfare_box";
import { funIsOpen } from "app_b/open_fun/open_fun";

//掉落效果
import { node_fun, drop_outFun } from "app_b/widget/drop_out";
// 所有怪物配置
import { monster_base } from "fight/b/common/monsterBase";
// 怪物模型配置
import { monster_cfg } from "app/scene/plan_cfg/monster_config";


export const forelet = new Forelet();

insert("equip_fb", {
    "use_times":0
});

//打开装备副本
export let globalReceive = {
    "gotoEquipFB": ( i? ) => {
        if (funIsOpen("equip_fb")) {
            let time = i ? 150 : 100;
            index = i || Math.floor(getDB("equip_fb.mission_point") / 5) + 1;
            forelet.paint(getData());
            open("app_c-equip_fb-equip_fb");
            globalSend("openNewFun", "equip_fb");
            let timer = setTimeout(()=>{
                globalSend("get_fbmonster",{
                    "type":"equip_fb",
                    "index":index
                });
                clearTimeout(timer);
                timer = null;
            },time)
        }
    },
    "exitFb": ()=>{
        logic.resetScene();
    }
}



//定义变量
let fb_data: any = {},
    buyData: any = {},//购买页面数据
    totalStar, //玩家通关总星数
    allBoxId, //总星数领取宝箱的id
    selectArr = [], //选取未满15星的
    index, //当前所处章节id
    mission_id, //关卡id
    sweep_award = [],
    box_award, //总星数, 是否领取宝箱
    opacity = false,
    canSweep = true;//扫荡间隔
//数据更新
const getData = function () {
    fb_data.index = index;
    fb_data.mission_id = mission_id;
    fb_data.box_award_record = getDB("equip_fb.box_award_record");
    fb_data.equip_fb_star = getDB("equip_fb.equip_fb_star");
    fb_data.mission_point = getDB("equip_fb.mission_point");
    fb_data.star_total_award_record = getDB("equip_fb.star_total_award_record");
    fb_data.use_times = getDB("equip_fb.use_times");
    fb_data.vip_buy_times = getDB("equip_fb.vip_buy_times");
    fb_data.totalStar = totalStar;
    fb_data.allBoxId = allBoxId;
    fb_data.selectArr = selectArr;

    fb_data.player = getDB("player");
    fb_data.Pi = Pi;
    fb_data.boxData = logic.boxData;
    fb_data.vip_advantage = vip_advantage;
    fb_data.equip_fb_data = equip_fb_data;
    fb_data.equip_fb_base = equip_fb_base;
    fb_data.equip_fb_star_1 = equip_fb_star;
    fb_data.equip_fb_welfare_box = equip_fb_welfare_box;
    fb_data.sweep_award = sweep_award;
    fb_data.opacity = opacity;

    return fb_data;
}
//前台界面操作
export class EquipFB extends Widget {
    //第一次渲染
    attach() {
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    afterUpdate() {
        if (opacity) return;
        opacity = true;
        forelet.paint(getData());
    }
    detach(){
        let w = forelet.getWidget("app_c-equip_fb-equip_fb");
        if(!w)
            globalSend("remove_node","equip");
    }
    goback(arg) {
        let _w = forelet.getWidget("app_c-equip_fb-mission-mission")
        close(arg.widget);
        selectArr = [];
        if(_w){
            logic.resetScene();
        }
        
    }
    //装备详情
    propInfoShow = (id) => {
        globalSend("showOtherInfo", id);
    }
    //购买挑战次数
    buyCount() {
        logic.canBuyCount();
    }
    //打开对应关卡详情
    openMission(id) {
        mission_id = id;
        forelet.paint(getData());
        let monster_id = monster_base[ equip_fb_data[index][(id-1)%5].moster_id[2][0] ].module;
        globalSend("remove_node","equip");

        open("app_c-equip_fb-mission-mission",monster_id);
    }
    //打开领取宝箱弹窗
    openBoxAward() {
        open("app_c-equip_fb-box-box");
    }
    //领取宝箱奖励
    getBoxAward(bol?) {
        if(bol){
            globalSend("screenTipFun", {
                words: `星星不足`
            })
            return;
        }
        logic.canGetBoxAward();
    }
    //领取关卡宝箱
    getMissionBoxAward(box_id) {
        let flag = Common_m.bagIsFull();
        if (flag) {
            globalSend("screenTipFun", {
                words: `背包数量已满`
            })
            return;
        }
        fb.getBoxAward(1, box_id);
    }
    openSelect() {
        logic.notThreeStar();
        forelet.paint(getData());
        open("app_c-equip_fb-select-select");
    }
    //选择未满3星的章节
    selectThis(arg) {
        index = arg;
        selectArr = [];
        let w = forelet.getWidget("app_c-equip_fb-select-select");
        close(w);
        forelet.paint(getData());
    }
    //切换章节
    switch_chapter(arg) {
        index += arg;
        // if (index < 1) index = 1;
        // let len = fb_data.equip_fb_star.length;
        // if (index > len) index = len;
        forelet.paint(getData());
        globalSend("modify_node",{
            "type":"equip",
            "index":index
        });
    }
    //挑战关卡
    challenge(level_limit) {
        let flag = logic.canChallenge(level_limit);
        if (flag) {
            let w = forelet.getWidget("app_c-equip_fb-mission-mission");
            close(w);
            fb.challenge();
        }
    }
    //扫荡
    sweep(level_limit) {
        if (!canSweep)
            return;
        let equip_record = getDB("equip_fb.equip_fb_star");
        if (equip_record[index - 1][(mission_id - 1) % 5] < 3) {
            globalSend("screenTipFun", { words: `当前关卡星级小于3星,无法扫荡` });
            return false;
        }
        sweep_award = [];
        let flag = logic.canChallenge(level_limit);
        if (flag) {
            canSweep = false;
            let timer = setTimeout(function () {
                canSweep = true;
                clearTimeout(timer);
                timer = null;
            }, 1000)
            fb.sweep();
        }
    }
}
//逻辑处理
let logic = {
    //场景重绘
    resetScene: function () {
        let data : any;
        let w = forelet.getWidget("app_c-equip_fb-equip_fb");
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
        globalSend("get_fbmonster",{
            "type":"equip_fb",
            "index":index
        });
    },
    //当前通关总星数
    totalStar: function (arr) {
        let num = 0;
        for (let i of arr) {
            for (let j of i) {
                if (j > 0) { num += j; }
            }
        }
        return num;
    },
    //领取对应宝箱的id
    getAllBoxId: function (arr) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] <= 0) {
                return i + 1;
            }
        }
    },
    //宝箱数据处理
    boxData: function (obj) {
        let arr = [];
        arr = obj.prop.slice(0);
        if (obj.money)
            arr.push([100001, obj.money]);
        if (obj.diamond)
            arr.push([100002, obj.diamond]);
        return arr;
    },
    //判断是否满足购买条件
    canBuyCount: function () {
        let diamond = getDB("player.diamond"),
            vip = getDB("player.vip"),
            num = fb_data.vip_buy_times,
            max = vip_advantage[vip].buy_equip_instance_times,
            costArr = equip_fb_cost;
        //判断次数是否用完
        if (num >= max) {
            globalSend("screenTipFun", {
                words: `今日购买次数已用完`
            })
            return;
        }
        //元宝是否足够
        if (diamond <  (costArr[num] || costArr[costArr.length - 1])) {
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
            return;
        }
        //购买的数据
        buyData = {
            "title":"购买次数",
            "type":"装备副本",
            "coin":"diamond",
            "btn_name":"购 买",
            "cost":costArr[num] || costArr[costArr.length-1],
            "max":max,
            "now":num,
            "hasCount":vip_advantage[vip].equip_instance_times + num - fb_data.use_times,
            "num":1,//购买数量初始值默认为1
            "callBack": (r) => {
                fb.buyCount(r);
            },
            "costCoin": (r) => {
                let d = buyData,
                    arr: any = {
                        "num": r,
                        "cost": 0
                    },//能购买的数量,花费
                    money = getDB("player." + d.coin);
                if (r > d.max - d.now) arr.num = d.max - d.now;
                if (r <= 0) {
                    arr.num = d.max - d.now ? 1 : 0;
                }
                let len = costArr.length;
                //计算总价
                for (var i = d.now; i < (arr.num - 0 + d.now); i++) {
                    let costNow = arr.cost;
                    if (costArr[i]) arr.cost += costArr[i];
                    else arr.cost += costArr[len - 1];
                    if (arr.cost > money) {
                        arr.num = i - d.now;
                        arr.cost = costNow;
                        break;
                    }
                }
                return arr;
            }
        };
        //发送消息购买
        globalSend("gotoBuyCount", buyData);
    },
    //判断能够领取宝箱
    canGetBoxAward: function () {
        if (box_award === 0) {
            globalSend("screenTipFun", { words: `总星数不够，无法领取` })
            return;
        }
        let flag = Common_m.bagIsFull();
        if (flag) {
            globalSend("screenTipFun", {
                words: `背包数量已满`
            })
            return;
        }
        fb.getBoxAward(0, allBoxId);
    },
    //收集未满15星的副本
    notThreeStar: function () {
        let n = 0,
            num = Math.floor(fb_data.mission_point / 5);
        for (; n <= num; n++) {
            let flag = fb_data.equip_fb_star[n].some((x) => {
                return x < 3;
            })
            if (flag) {
                selectArr.push(n + 1);
            }

        }
    },
    //判断能否挑战
    canChallenge: function (level_limit) {
        let vip = getDB("player.vip"),
            level = getDB("player.level");
        //玩家等级是否吗，满足要求
        if (level < level_limit) {
            globalSend("screenTipFun", { words: `${level_limit}级开放` });
            return false;
        }
        //是否按顺序打关卡
        if (fb_data.mission_id - 1 > fb_data.mission_point) {
            globalSend("screenTipFun", { words: `请先通关前面的关卡` });
            return false;
        }
        //判断是否是首通关卡
        let star = getDB("equip_fb.equip_fb_star." + (index - 1) + "." + ((mission_id - 1) % 5));
        if (star === 0) {
            return true;
        }
        //剩余挑战次数是否为0
        let surplus = vip_advantage[vip].equip_instance_times + fb_data.vip_buy_times - fb_data.use_times;
        if (surplus <= 0) {
            globalSend("screenTipFun", { words: `剩余次数为零,无法挑战` });
            return false;
        }
        let f = Common_m.bagIsFull();
        if (f) {
            globalSend("screenTipFun", {
                words: `背包数量已满`
            })
            return false;
        }
        return true;
    }
}
//网络通讯
let fb = {
    //购买次数
    buyCount: function (r) {
        let arg = {
            "param": { "purchase_num": r }, //购买次数
            "type": "app/pve/equip_instance@purchase"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok[1]);
                //扣除花费
                Common_m.deductfrom(prop);
                updata("equip_fb.vip_buy_times", prop.vip_buy_times);
                globalSend("screenTipFun", { words: `购买成功` });
                forelet.paint(getData());
            }
        })
    },
    //领取宝箱
    getBoxAward: function (type, box_id) {
        let arg = {
            "param": {
                "type": type,
                "index": box_id
            },
            "type": "app/pve/equip_instance@award"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                let result = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result1) {
                        result1.open();
                    }
                });
                if (type === 0) {
                    updata("equip_fb.star_total_award_record." + (box_id - 1), 1);
                    allBoxId = logic.getAllBoxId(getDB("equip_fb.star_total_award_record"));
                    box_award = totalStar < equip_fb_star[allBoxId].total_star ? 0 : 1;
                    updata("equip_fb.box_award", box_award);
                } else if (type === 1) {
                    updata("equip_fb.box_award_record." + (box_id - 1), 1);
                }
                forelet.paint(getData());
            }
        })
    },
    //开始挑战
    challenge: function () {
        let arg = {
            "param": {
                "chapter_id": index,
                "mission_id": mission_id //关卡id
            },
            "type": "app/pve/equip_instance@start_fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                globalSend("remove_node","equip");
                //进入战斗场景
                let prop = equip_fb_data[index][(mission_id - 1) % 5];
                let msg: any = Common.changeArrToJson(data.ok);
                msg.type = "equip_mission";
                msg.cfg = prop;
                msg.star = 1;
                globalSend("fbStar", 1);
                fight(msg, function (fightData) {
                    globalSend("fbStar", 0);

                    // node_fun();
                    if (fightData.r === 1) {
                        fb.winFight(fightData);

                    } else {
                        Common_m.openAccount(fightData, "equip_fb",{},0,()=>{
                            logic.resetScene();
                        })
                    }

                    globalSend("popBack");


                })
                forelet.paint(getData());
            }
        })
    },
    //战斗胜利
    winFight: function (result) {
        let arg = {
            "param": {
                "chapter_id": index, //章节id
                "mission_id": mission_id, //关卡id
                "fight_time": result.time / 1000
            },
            "type": "app/pve/equip_instance@end_fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                let award = Common_m.mixAward(prop);

                if (Object.keys(award.player).length > 0) {
                    prop.player = award.player;
                }
                if (award.bag.length > 0) {
                    prop.bag = award.bag;
                }
                let point = prop.star_info[1][1];
                updata("equip_fb.mission_point", point);
                updata("equip_fb.use_times", prop.star_info[2][1]);
                updata("equip_fb.equip_fb_star." + (index - 1) + "." + ((mission_id - 1) % 5), prop.star_info[0][1]);

                totalStar = logic.totalStar(getDB("equip_fb.equip_fb_star"));

                box_award = totalStar < equip_fb_star[allBoxId].total_star ? 0 : 1;
                updata("equip_fb.totalStar", totalStar)
                updata("equip_fb.box_award", box_award);
                //计算最大副本
                index = Math.floor(point / 5) + 1;
                forelet.paint(getData());
                if (!Common.checkJsonIsEmpty(award.player)) prop.player = award.player;
                if (award.bag.length) prop.bag = award.bag;
                // drop_outFun(prop.award.prop, function () {

                //     Common_m.openAccount(result, "equip_fb", prop, prop.star_info[0][1]);
                // });
                Common_m.openAccount(result, "equip_fb", prop, prop.star_info[0][1],()=>{
                    logic.resetScene();
                });
            }
        })
    },
    //扫荡
    sweep: function () {
        let arg = {
            "param": {
                "chapter_id": index, //章节id
                "mission_id": mission_id //关卡id
            },
            "type": "app/pve/equip_instance@sweep"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                //let sweep_award = Common_m.mixAward(prop);
                let result = Common_m.mixAward(prop);
                updata("equip_fb.use_times", prop.use_times);
                for (let v of result.bag) {
                    sweep_award.push({
                        id: v.id || v.sid,
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

                let w: any = forelet.getWidget("app_c-equip_fb-sweep-sweep");
                if (!w) {
                    forelet.paint(getData());
                    open("app_c-equip_fb-sweep-sweep");
                } else {
                    forelet.paint(getData());
                }

            }
        })
    }
}

//读取装备副本信息
listenBack("app/pve/equip_instance@read", function (data) {
    //console.log(data);
    totalStar = logic.totalStar(data.equip_fb_star);
    data.totalStar = totalStar;
    allBoxId = logic.getAllBoxId(data.star_total_award_record);
    index = Math.floor(data.mission_point / 5) + 1;
    box_award = totalStar < equip_fb_star[allBoxId].total_star ? 0 : 1;
    data["box_award"] = box_award;
    updata("equip_fb", data);
});

