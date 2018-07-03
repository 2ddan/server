//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { closeBack } from "pi/ui/root";

import { Common } from "app/mod/common";
import { updata, get as getDB, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight } from "app_b/fight/fight";
import { map_cfg } from "app/scene/plan_cfg/map";
import { funIsOpen } from "app_b/open_fun/open_fun";
//导入配置
import { vip_advantage } from "cfg/c/vip_advantage";
import { attribute_config } from "cfg/c/attribute_config";
import { gest_attribute } from "cfg/c/gest_attribute";
import { gest_shop } from "cfg/c/gest_shop";
import { gest_base } from "cfg/c/gest_base";
import { gest_act } from "cfg/c/gest_act";
import { resetcanvas } from "app/scene/base/scene";
import { monster_base } from "fight/b/common/monsterBase";
import { Music } from "app/mod/music";
import { function_open } from "cfg/b/function_open";


export const forelet = new Forelet();

let refType = "1",//刷新提示
    remind1 = [];
let inhType = "1",//传承提示
    remind2 = [];


export const globalReceive = {
    gotoInherit: () => {
        if (funIsOpen("gest")) {
            gestNumInBag = logic.gestNeedInBag();
            forelet.paint(getData());
            open("app_c-gest-gest");
            globalSend("openNewFun", "gest");
        }
    },
    //心法副本
    gotoGest: () => {
        if (funIsOpen("gest_fb")) {
            forelet.paint(getData());
            open("app_c-gest-gest_fb-gest_fb");
            globalSend("openNewFun", "gest_fb");
        }
    },
    //心法兑换
    gotoGestExchange: (arg) => {
        if (funIsOpen("gest_fb")) {
            gestQuality = arg;
            forelet.paint(getData());
            open("app_c-gest-exchange-exchange", "gest_exchange");
        }
    },
    //退出战斗界面刷新canvas
    refreshGestFb : (type) => {
        let w = forelet.getWidget("app_c-gest-gest_fb-fb-fb");
        if(type && w){
            let _data : any;
            
            for (let i = 0; i < w.children.length; i++) {
                if (w.children[i].name == "app-scene-base-scene") {
                    _data = w.children[i];
                    break;
                }
            }
            resetcanvas(_data)
        }
    }
}

//前台操作
export class Instance extends Widget {
    goback = function (arg) {
        close(arg.widget);
    };
    //去心法副本子界面
    gotoFb(file) {
        //open("app_c-gest-gest_fb-"+file+"-"+file);
        open(`app_c-gest-gest_fb-${file}-${file}`);
    }
    inherit(type) {//心法传承
        logic.isCanInherit(type);
    }
    //挑战boos
    fightBoss() {
        if (gest_data.surplusFight <= 0) {
            globalSend("screenTipFun", {
                words: `挑战次数已用完`
            });
            return;
        }
        startFight();
    }
    //刷新boos
    refreshBoss() {
        logic.refresh()
    }
    //阵法获取途径
    gotoGetWay(id) {
        globalSend("gotoGetWay", id);
    }
    //确认兑换阵法
    sureBuyGest(id, count) {
        logic.sureBuyGest(id, count)
    }
    //打开心法背包或者兑换
    openGest(type) {
        gestQuality = 4;
        logic.openGest(type);
    }
    //打开心法副本
    gotoGestFb() {
        closeBack();
        globalSend("gotoGest");
    }
    //打开兑换弹窗
    exchange(type, id) {
        if (type) {//type=1:分解,0:兑换
            logic.isCanDecompose(id);
            return;
        }
        logic.isCanBuy(id);
    }
    //打开快速兑换
    openFastExchange(id) {
        logic.openChange(id);
        let c = logic.isCanUp(id);
        open("app_c-gest-fast_exchange-fast_exchange", c);
    }
    //确认快速兑换
    fastExchange() {
        logic.sureChange();
        let w = forelet.getWidget("app_c-gest-fast_exchange-fast_exchange");
        if (w) close(w);
        w = undefined;
    }
    //阵法详情
    gestDetail(id) {
        open("app_c-gest-detail-detail",gest_attribute[id]);
    }
    //属性详情
    seeAttr() {
        globalSend("gotoSeeAttr",{"title":"属性详情","attr":gestAttr});//attr必须是Obj
    }

    showPropInfo = (id) => {
        globalSend("showOtherInfo", id)
    }
    //阵法tab切换
    tabChangeGset(quality) {
        if (matrixQuality == quality) {
            return;
        }
        matrixQuality = quality;
        forelet.paint(getData());
    }
    //兑换tab切换
    tabChange(index) {
        logic.tabChange(index);
    }
    //激活或升級
    gestStarUp(id, lv) {
        if (getDB("player.level") < gest_attribute[id][lv]["player_level"]) {
            globalSend("screenTipFun", {
                words: `您的等级不足,请先提升等级`
            })
            return false;
        }
        let arr = [id, lv];
        logic.gestStarUp(arr);
    }
}


//******************************************test*********************************/
let gest_data: any = {
    "vip_advantage": vip_advantage,
    "gest_attribute": gest_attribute,
    "attribute_config": attribute_config,
    "gest_shop": gest_shop,
    "gest_base": gest_base,
    "monster_base": monster_base,
    "gest_act": gest_act,
    "Pi": Pi,

},
    gestNumInBag = {}, //获取相应阵法升级消耗心法在背包里的数量
    myGest = [], //我所拥有的心法
    gestQuality, //心法品质
    matrixQuality = 4,//阵法品质
    select_gest = [],
    changeGest, //兑换的阵法
    gestAttr: any = {}, //阵法属性加成
    changeCost, //快速兑换消耗
    diamondCost; //兑换消耗元宝
    //gest_tip: any = {}; //阵法激活(升星)


const getData = function () {
    gest_data.player = getDB("player");
    //挑战的boss id
    gest_data.boss_index = getDB("gest.boss_index");
    //挑战次数
    gest_data.challenged_times = getDB("gest.challenged_times");
    //传承次数
    gest_data.gest_count = getDB("gest.gest_count");
    //刷新次数
    gest_data.refresh_times = getDB("gest.refresh_times");
    //阵法激活详情
    gest_data.gest_info = getDB("gest.gest_info");


    gest_data.gestNumInBag = gestNumInBag;
    gest_data.myGest = myGest;
    gest_data.mySort = logic.mySort;
    gest_data.isExchange = logic.isExchange;
    gest_data.isCanUp = logic.isCanUp;//判断阵法能否升级
    gest_data.gestQuality = gestQuality;
    gest_data.matrixQuality=matrixQuality;
    gest_data.getQualityGest = logic.getQualityGest;
    //剩余免费刷新次数
    gest_data.freeRefresh = logic.countFreeRefresh();
    //剩余挑战次数
    gest_data.surplusFight = logic.countSurplusFight();

    gest_data.changeCost = changeCost;
    gest_data.diamondCost = diamondCost;
    gest_data.selectGest = logic.selectGest;
    return gest_data;
}

//页面逻辑处理
export let logic = {
    /**
     * 阵法品质筛选
     */
    selectGest: function (gest_info) {
        let arr = gest_info.filter((v) => {
            if (gest_attribute[v[0]].quality == matrixQuality) {
                return v;
            }
        });
        return arr;
    },
    /**
     * 品质心法标签切换
     */
    tabChange: function (quality) {
        if (gestQuality === quality) {
            return;
        }
        gestQuality = quality;
        forelet.paint(getData());
    },
    /**
     * 获取在背包中的心法 (在打开背包心法和心法分解的时候调用)
     */
    getMyGest: function () {
        let arr = getDB("bag*type='gest'").filter((x) => {
            if (x && x.type === "gest") {
                return x;
            }
        });
        return arr;
    },
    //判断能否兑换
    isExchange: function (soul_id) {
        let costArr = gest_shop[soul_id].price,
            prop = Pi.sample[costArr[0]],
            arr = getDB(`bag*sid=${costArr[0]}`);

        if ((arr.length === 0) || (arr[arr.length - 1].count < costArr[1])) {
            return false;
        }
        return true;
    },
    //阵法排序
    mySort: function (a, b) {
        let needRed1 = gestNumInBag[a[0]]['needRed'];
        let needRed2 = gestNumInBag[b[0]]['needRed'];
        let up1 = (JSON.stringify(logic.isCanUp(a[0])) !== "{}" ? 1 : 0);
        let up2 = (JSON.stringify(logic.isCanUp(b[0])) !== "{}" ? 1 : 0);
        let lv1 = gest_attribute[a[0]][a[1]]["player_level"] > getDB("player.level") ? 1 : 0;//等级限制
        let lv2 = gest_attribute[b[0]][b[1]]["player_level"] > getDB("player.level") ? 1 : 0;//等级限制
        let lvFull_1 = a[1] == 6 ? 1 : 0;//满级
        let lvFull_2 = b[1] == 6 ? 1 : 0;//满级


        if (lvFull_1 !== lvFull_2) {
            return lvFull_1 - lvFull_2;
        }
        if (lv1 !== lv2) {
            return lv1 - lv2;
        }
        
        if (up1 !== up2) {
            return  up1 -up2;
        }
        if (needRed1 !== needRed2) {
            return needRed1 - needRed2;
        }

    },
    //属性排序
    // attrSort: function () {
    //     let attr = [];
    //     if (JSON.stringify(gestAttr) === "{}") {
    //         return attr;
    //     }
    //     let len = Object.keys(gestAttr).length;
    //     for (var key in gestAttr) {
    //         if (key == "damage_multiple" || key == "un_damage_multiple") {
    //             attr.push([key, gestAttr[key]]);
    //         } else {
    //             attr.unshift([key, gestAttr[key]]);
    //         }
    //     }
    //     return attr;

    // },
    //判断阵法能否升级或者激活
    isCanUp: function (soul_id) {
        let obj: any = {};
        let data = gestNumInBag[soul_id]["needGest"];
        for (var i = 0, len = data.length; i < len; i++) {
            // if(data[i][1] > gestNumInBag[soul_id]["bagGest"][ data[i][0] ]){
            //     obj[data[i][0]] = data[i][1] - gestNumInBag[soul_id]["bagGest"][ data[i][0] ];
            // }
            obj[data[i][0]] = data[i][1];
        }
        return obj;
    },
    /**
     * 打开心法背包 或者 心法兑换
     * @param type 打开类型 gest_bag   gest_change
     */
    openGest: function (type) {
        if (type === "gest_bag") {
            myGest = logic.getMyGest();
        }
        forelet.paint(getData());
        open("app_c-gest-exchange-exchange", type);
    },

    /**
     * 获取相应品质的心法
     * @param gestArr 心法数组
     * @param quality 品质
     */
    getQualityGest: function (gestArr, quality) {
        return gestArr.filter((x) => {
            if (x && x.quality === quality) {
                return x;
            }
        })
    },

    /**
     * 获取每种阵法升级需要的心法在背包中的数量
     */
    gestNeedInBag: function (arg?) {
        let arr = arg || getDB("gest.gest_info");
        let player_level = getDB("player.level") || 1;
        let bagGest: any = {};
        let gest_quality_tip = {};
        let gest_tip = {};
        for (let v of arr) {
            if (player_level >= gest_attribute[v[0]][v[1]].player_level && v[1] < 6) {
                gest_tip[v[0]] = 1;
            } else {
                gest_tip[v[0]] = 0;
            }
            //读取对应阵法等级对应需要的心法
            let costGest = gest_attribute[v[0]][v[1]].need_gest;
            bagGest[v[0]] = {
                //是否缺少红装
                "needRed": false,
                //还差什么心法
                "needGest": [],
                //背包里有哪些心法
                "bagGest": {}
            };
            //循环所需心法数组
            for (let val of costGest) {
                //在背包获取对应心法
                let prop = getDB(`bag*sid=${val[0]}`);
                if (prop.length === 0) {
                    bagGest[v[0]]["bagGest"][val[0]] = 0;
                } else {
                    bagGest[v[0]]["bagGest"][val[0]] = prop[prop.length - 1].count;
                }
                //当背包里对应心法数量 < 所需心法数量时
                let num = val[1] - bagGest[v[0]]["bagGest"][val[0]];
                if (num > 0) {
                    let p = Pi.sample[val[0]];
                    if (p.quality === 6) {
                        bagGest[v[0]].needRed = true;
                    }
                    gest_tip[v[0]] = 0;
                    bagGest[v[0]].needGest.push([val[0], num])
                }
            }
            if (gest_tip[v[0]] == 1 && !gest_quality_tip[gest_attribute[v[0]].quality]) {
                gest_quality_tip[gest_attribute[v[0]].quality] = 1;
            }
        }
        gest_tip = null;
        updata("gest.gest_quality_tip",gest_quality_tip);
        return bagGest;
    },

    /**
     * 阵法激活或者升星
     * @param arr [阵法id, 阵法level]
     */
    gestStarUp: function (arr) {
        gestActiveOrStarUp(arr[0], arr[1] - 0);
    },
    /**
     * 阵法激活(升星)计算属性
     * @param arr [阵法id, 阵法当前level]
     */
    countAttr: function (gest_id, level) {
        let next_attr = gest_attribute[gest_id][level + 1].attr;
        let attr = getDB("gest.gest_attr");
        if (level === -1) {
            for (let v of next_attr) {
                //属性加成计算
                if (gestAttr[v[0]]) {
                    gestAttr[v[0]] = gestAttr[v[0]] + v[1];
                } else {
                    gestAttr[v[0]] = v[1];
                }
                globalSend("attrTip", {
                    words: `${attribute_config[v[0]]} +${Common_m.decimalToPercent(v[1])}`
                })
                // updata("gest.gest_attr."+v[0], (attr[v[0]]||0)-0+v[1]);
            }
        } else {
            let attr = gest_attribute[gest_id][level].attr;
            for (let i = 0, len = attr.length; i < len; i++) {
                //减去上一星属性, 加上下一星属性
                let add = next_attr[i][1] - attr[i][1];
                gestAttr[attr[i][0]] = gestAttr[attr[i][0]] + add;
                globalSend("attrTip", {
                    words: `${attribute_config[attr[i][0]]} +${Common_m.decimalToPercent(add)}`
                });
                // updata("gest.gest_attr."+attr[i][0], (attr[attr[i][0]]||0)-0+add);
            }
        }
        updata("gest.gest_attr", gestAttr);
    },
    //分解
    isCanDecompose: function (id) {
        //计算最大分解数量
        let maxNum = 0;
        for (var i = 0, len = myGest.length; i < len; i++) {
            if (myGest[i].sid === id) maxNum = myGest[i]["count"];
        }
        if (!gest_shop[id]) {
            globalSend("screenTipFun", {
                words: `红色心法不能分解`
            });
            return;
        }
        let price = gest_shop[id]["price"][1] * gest_base["melt_rate"];
        let buyData = {
            "title": "分 解",
            "id": id ,
            "coin": "gest_coin",
            "btn_name": "分 解",
            // "price": price,
            "num": 1,//分解初始值默认为1
            "cost": price, //初始获得代币           
            "have": maxNum,

            //确认分解
            "callBack": (num) => {
                logic.sureDecompose(id, num);
            },
            //计算购买一定数量的花费
            "costCoin": (num) => {
                if (num >= maxNum) {
                    num = maxNum;
                    globalSend("screenTipFun", {
                        words: `已达最大分解数量`
                    });
                }
                if (num <= 1) {
                    num = 1;
                }
                return {
                    "num": num,
                    "cost": num * price
                };
            }
        };
        //发送消息购买
        globalSend("gotoBuy", buyData);
    },
    /**
     * 判断能否购买心法(及购买次数)
     * @param soul_id 心法id
     */
    isCanBuy: function (soul_id) {
        let costArr = gest_shop[soul_id].price,
            prop = Pi.sample[costArr[0]],
            arr = getDB(`bag*sid=${costArr[0]}`);

        if ((arr.length === 0) || (arr[arr.length - 1].count < costArr[1])) {
            globalSend("screenTipFun", {
                words: `缺少${prop.name}`
            })
            return;
        }
        //计算最大兑换数量
        let maxNum = Math.floor(arr[arr.length - 1].count / costArr[1]);

        let list = getDB(`bag*sid=${soul_id}`);
        let buyData = {
            "title": "兑 换",
            "id": soul_id,   //物品Id        
            "coin": "gest_coin",
            // "price": costArr[1],   
            "num": 1,//购买数量初始值默认为1
            "cost": costArr[1], //初始购买花费           
            "have": list.length ? list[list.length - 1].count : 0,
            "btn_name": "兑 换",
            //确认购买
            "callBack": (num) => {
                logic.sureBuyGest(soul_id, num);
            },
            //计算购买一定数量的花费
            "costCoin": (num) => {
                if (num >= maxNum) {
                    num = maxNum;
                    globalSend("screenTipFun", {
                        words: `已达最大兑换数量`
                    });
                }
                if (num <= 1) {
                    num = 1;
                }
                return {
                    "num": num,
                    "cost": num * costArr[1]
                };
            }
        };
        //发送消息购买
        globalSend("gotoBuy", buyData);
    },

    /**
     * 确认购买心法
     * @param count 购买数量
     */
    sureBuyGest: function (soul_id, count) {
        let str = `${soul_id}-${count}`
        buyGest(str);
    },

    /**
     * 打开兑换界面
     * @param id 阵法id
     */
    openChange: function (id) {
        changeCost = 0;
        //计算所需代币
        changeGest = gestNumInBag[id].needGest;
        for (let v of changeGest) {
            changeCost += gest_shop[v[0]].price[1];
        }
        let cost_id = gest_shop[changeGest[0][0]].price[0];
        let myProp = getDB(`bag*sid=${cost_id}`);
        if (myProp.length === 0) {
            diamondCost = Math.ceil(changeCost / gest_base.buy_coin);
        } else {
            diamondCost = Math.ceil((changeCost - myProp[myProp.length - 1].count) / gest_base.buy_coin);
        }
        gest_data.changeCost = changeCost;
        gest_data.diamondCost = diamondCost;
        forelet.paint(gest_data);

    },
    /**
     * 确认兑换
     */
    sureChange: function () {
        let diamond = getDB("player.diamond");
        if (diamond < diamondCost) {
            globalSend("popTip", {
                title: "<div>元宝不足</div><div>是否前往充值</div>",
                btn_name: ["充值","取消"],
                cb: [
                    //确认
                    () => {
                        globalSend("gotoRecharge");
                    },
                    //取消
                    ()=>{}
                ]
            });
            return;
        }
        let str = changeGest.map((v) => `${v[0]}-${v[1]}`).toString();
        buyGest(str);
    },
    /**
     * 确认分解心法
     * @param soul_id 心法id
     * @param count 当前心法数量
     */
    sureDecompose: function (soul_id, num) {
        let str = `${soul_id}-${num}`;
        decomposeGest(str);
    },

    /**
     * 计算激活的阵法的属性加成
     */
    gestAttrAdd: function () {
        // if (Object.keys(gestAttr).length > 0) {
        //     return;
        // }
        let arr = getDB("gest.gest_info");
        for (let v of arr) {
            if (v[1] >= 0) {
                let attr = gest_attribute[v[0]][v[1]].attr;
                for (let at of attr) {
                    if (gestAttr[at[0]]) {
                        gestAttr[at[0]] = gestAttr[at[0]] + at[1];
                    } else {
                        gestAttr[at[0]] = at[1];
                    }
                }
            }
        }
        updata("gest.gest_attr", gestAttr);
    },

    /**
     * @param num 传承次数
     */
    isCanInherit: function (num) {
        //传承一次
        if (num === 1) {
            if (gest_data.gest_count[0] >= gest_base.day_count) {
                let diamond = getDB("player.diamond");
                if (diamond < gest_base.one_price) {
                    globalSend("popTip", {
                        title: "<div>元宝不足</div><div>是否前往充值</div>",
                        btn_name: ["充值","取消"],
                        cb: [
                            //确认
                            () => {
                                globalSend("gotoRecharge");
                            },
                            //取消
                            ()=>{}
                        ]
                    });
                    return;
                }
            }
        } else if (num === 5) {
            let diamond = getDB("player.diamond");
            if (diamond < gest_base.five_price) {
                globalSend("popTip", {
                    title: "<div>元宝不足</div><div>是否前往充值</div>",
                    btn_name: ["充值","取消"],
                    cb: [
                        //确认
                        () => {
                            globalSend("gotoRecharge");
                        },
                        //取消
                        ()=>{}
                    ]
                });
                return;
            }
        }
        if (num === 5 || gest_data.gest_count[0] >= gest_base.day_count) {
            if (!remind2[inhType]) {
                globalSend("popTip", {
                    title: "传承将消耗<span style='font-size:19px;color:rgb(255,222,0);text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;padding:0 3px;'>" + (num === 5 ? gest_base.five_price : gest_base.one_price) + "</span>元宝，确认刷新？",
                    btn_name: ["确定", "取消"],
                    cb: [
                        //确认
                        () => {
                            inherit(num)
                        },
                        //取消
                        () => { }
                    ],
                    status: () => {
                        remind2[inhType] = !remind2[inhType];
                    }
                })
                return;
            }
        }
        //传承
        return inherit(num);
    },

    /**
     * 计算免费刷新次数
     */
    countFreeRefresh: function () {
        let vip = getDB("player.vip"),
            num = vip_advantage[vip].gest_free_refresh_times - getDB("gest.refresh_times");
        num = num > 0 ? num : 0;
        return num;
    },

    /**
     * 计算剩余挑战次数
     */
    countSurplusFight: function () {
        let vip = getDB("player.vip"),
            num = vip_advantage[vip].gest_free_challenge_times - getDB("gest.challenged_times");
        num = num > 0 ? num : 0;
        return num;
    },

    /**
     * 刷新boos
     */
    refresh: function () {
        if (gest_data.freeRefresh <= 0) {//免费次数用完
            let diamond = getDB("player.diamond");
            if (diamond < gest_base.fresh_price) {
                globalSend("popTip", {
                    title: "<div>元宝不足</div><div>是否前往充值</div>",
                    btn_name: ["充值","取消"],
                    cb: [
                        //确认
                        () => {
                            globalSend("gotoRecharge");
                        },
                        //取消
                        ()=>{}
                    ]
                });
                return;
            }

            if (!remind1[refType]) {
                globalSend("popTip", {
                    title: "刷新将消耗<span style='font-size:19px;color:rgb(255,222,0);text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;padding:0 3px;'>" + gest_base.fresh_price + "</span>元宝，确认刷新？",
                    btn_name: ["确定", "取消"],
                    cb: [
                        //确认
                        () => {
                            refreshBoss();
                        },
                        //取消
                        () => { }
                    ],
                    status: () => {
                        remind1[refType] = !remind1[refType];
                    }
                })
                return;
            }
        }
        refreshBoss();
    }
}

/**
 * 
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
const gestNet = function (param) {
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
 * 阵法激活 或者 阵法升星
 * @param gest_id 阵法id
 * @param level 当前阵法等级
 */
export const gestActiveOrStarUp = function (gest_id, level) {
    let arg = {
        "param": { "gest_id": gest_id },
        "type": "app/prop/gest@star_up"
    };
    gestNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            //扣除心法
            Common_m.deductfrom(prop);
            updata("gest.gest_info", prop.gest_info);
            //重新获取背包心法
            gestNumInBag = logic.gestNeedInBag();
            Music.skillSound("other_one");
            //激活阵法+1
            if (level == -1) {
                let num = getDB("gest.active_gest_num") - 0 + 1;
                updata("gest.active_gest_num", num);
            }
            globalSend("attrTip", {
                words: `阵法${(level === -1) ? "激活" : "升级"}成功`
            });
            logic.countAttr(gest_id, level);
            forelet.paint(getData());
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: data.why
            });
            console.log(data);
        })
};

/**
 * 购买心法
 * @param str  "80001-1,80002-2" 表示"心法id-购买数量,心法id-购买数量"
 */
const buyGest = function (str) {
    let arg = {
        "param": {
            "buy_info": str
        },
        "type": "app/prop/gest@buy"
    };
    gestNet(arg)
        .then((data: any) => {
            let prop = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            Common_m.mixAward(prop);
            globalSend("screenTipFun", {
                words: `购买成功`
            });
            /**
             * 如果是快速兑换购买心法，购买成功后关闭快速兑换页面
             */
            gestNumInBag = logic.gestNeedInBag();
            forelet.paint(getData());
        })
        .catch((data) => {
            console.log(data);
        })
}

/**
 * 分解心法
 * @param melt_info String  "80001-1" 表示"心法id-分解数量"
 */
const decomposeGest = function (melt_info) {
    let arg = {
        "param": {
            "melt_info": melt_info
        },
        "type": "app/prop/gest@melt"
    };
    gestNet(arg)
        .then((data: any) => {
            let prop = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            let award = Common_m.mixAward(prop);
            //重新计算背包里的心法
            myGest = logic.getMyGest();
            gestNumInBag = logic.gestNeedInBag();
            forelet.paint(getData());
            globalSend("screenTipFun", {
                words: `分解成功`
            });
        })
        .catch((data) => {
            console.log(data)
        })
}

/**
 * 心法传承
 * @param type 传承一次:1   传承五次:5
 */
const inherit = function (type) {
    let arg = {
        "param": {
            "type": type
        },
        "type": "app/prop/gest@inherit"
    };
    gestNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            let result: any = Common_m.mixAward(prop);
            updata("gest.gest_count", prop.gest_count);
            gest_data.gest_count = prop.gest_count;
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result) {
                    result.open();
                }
            });
            forelet.paint(gest_data);
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `通讯失败`
            });
        })
}

/**
 * 刷新boss
 */
const refreshBoss = function () {
    let arg = {
        "param": {},
        "type": "app/prop/gest@refresh_boss"
    };
    gestNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(prop);
            updata("gest.boss_index", prop.boss_index);
            updata("gest.refresh_times", prop.refresh_times);
            forelet.paint(getData());
            globalSend("screenTipFun", {
                words: `刷新成功`
            });
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `通讯失败`
            });
        })
}

/**
 * 开始挑战
 */
export const startFight = function () {
    let arg = {
        "param": {},
        "type": "app/prop/gest@start_fight"
    };
    gestNet(arg)
        .then((data: any) => {
            let msg: any = Common.changeArrToJson(data.ok);
            let prop: any = gest_base;
            prop.moster_id = [[gest_data.boss_index]];
            prop.scene = map_cfg["gest"];
            msg.type = "gest";
            msg.cfg = prop;
            fight(msg, (fightData) => {
                globalSend("popBack");

                if (fightData.r === 1) {
                    winFight(fightData);
                    // node_fun();
                    
                } else {
                    return Common_m.openAccount(fightData, "gest");
                }
            });
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `通讯失败`
            });
            console.log(data);
        })
}

/**
 * 战斗胜利结算
 */
const winFight = function (result) {
    let arg = {
        "param": {},
        "type": "app/prop/gest@end_fight"
    };
    gestNet(arg)
        .then((data: any) => {
            let prop: any = Common.changeArrToJson(data.ok);
            let award = Common_m.mixAward(prop);
            if (Object.keys(award.player).length > 0) {
                prop.player = award.player;
            }
            if (award.bag.length > 0) {
                prop.bag = award.bag;
            }
            updata("gest.challenged_times", prop.challenged_times);
            updata("gest.boss_index", prop.boss_index);
            //重新获取背包中的心法
            gestNumInBag = logic.gestNeedInBag();
            forelet.paint(getData());
            //先播放掉落效果  然后打开结算界面
            // drop_outFun(prop.award.prop, function () {
            //     Common_m.openAccount(result, "gest", prop);
            // });
            Common_m.openAccount(result, "gest", prop);
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTipFun", {
                words: `通讯失败`
            });
        })
}


//读取基本数据
listenBack("app/prop/gest@read", (data) => {
    //计算当前激活阵法数量
    let num = 0;
    for(let v of data.gest_info) {
        if (v[1] >= 0) {
            num++;
        }
    }
    data.active_gest_num = num;
    // console.log(data);
    updata("gest", data);
    logic.gestNeedInBag(data.gest_info);
    //计算阵法加成属性
    logic.gestAttrAdd();
});

listen("bag*type='gest'", () => {
    logic.gestNeedInBag();
});

let oldLevel = getDB("player.level");
listen("player.level", () => {
    let level = getDB("player.level");
    if (oldLevel == 0) {
        oldLevel = level;
    } else if (level > oldLevel) {
        oldLevel = level;
        (getDB("open_fun.id") >= function_open["gest"].id) && forelet.paint(getData());
    }
});
