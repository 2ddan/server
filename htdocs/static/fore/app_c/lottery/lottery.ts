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
import { fight, showAccount } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { vip_advantage } from "cfg/c/vip_advantage";
import { luck_draw_shop } from "cfg/c/luck_draw_shop";
import { luck_draw_set } from "cfg/c/luck_draw_set";
import { luck_draw } from "cfg/c/luck_draw";


export const forelet = new Forelet();
let tabSwtich = "book";//tab切换
let score_coin = undefined;//tab切换
let cost_coin = undefined;//tab切换
//外部打开此页面
export let globalReceive = {
    gotoLottery: (arg?) => {
        tabSwtich = arg&&"shop" || "book";
        if(!score_coin){
            score_coin = luck_draw_shop[0]["cost"][0]
        }
        if(!cost_coin){
            cost_coin = luck_draw[1][0]["cost"][0]
        }
        forelet.paint(getData());
        open("app_c-lottery-main-main");
    }
}


export class lottery extends Widget {
    //界面tab切换
    changeColumns(msg) {
        if (tabSwtich == msg.type_m) return;
        tabSwtich = msg.type_m;
        forelet.paint(getData());
    }
    //抽奖
    getAward = function (prop_id,id) {//消耗id,抽奖id
        if(id == -1){
            if(prop_id == 100002){
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
            }else{
                globalSend("screenTipFun", { words: `${Pi.sample[prop_id].name}不足` });
                return;
            }
        }
		logic.getAward(id);
    }
    //奖励预览
    seeAward = function(type){
        open("app_c-lottery-see_award-see_award");
    }
    //物品详情
    propInfoShow = function(id){
        globalSend("showOtherInfo", id);
    }
    //兑换天书
    buyBook(id){
        logic.buyBook(id);
    }
}



let logic = {
    //道具是否足够
    canGetAward(type,index){
        let cost = luck_draw[type][index]["cost"];
        let prop_id = cost[0];
        if(prop_id == 100002){
            let diamond = getDB("player.diamond");
            if(cost[1] > diamond){
                return false;
            }
        }else{
            let prop = getDB("bag*sid="+prop_id).pop();
            if(!prop  || cost[1] > prop.count){
                return false;
            }
        }
        return true;
    },
    //抽奖
    getAward(id) {//抽奖id
        let arg = {
            "param": {
                "id": id-0,
            },
            "type": "app/prop/luck_draw@award"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);                
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                if(JSON.stringify(prop.free_time)!=JSON.stringify(getDB("lottery.free_time"))){
                    updata("lottery.free_time",prop.free_time);
                }
                globalSend("showNewRes", {
                    result, function(result1) {
                        result1.open();
                    }
                });
                forelet.paint(getData())
            }
        })
    },
    //商店兑换
    buyBook(id) {//兑换id
        let arg = {
            "param": {
                "id": id-0,
            },
            "type": "app/prop/luck_draw@shop"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);                
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result1) {
                        result1.open();
                    }
                });
                forelet.paint(getData())
            }
        })
    },
    getCount(id){
        let prop = getDB("bag*sid="+id).pop()
        let num = prop && prop.count || 0;//兑换货币数量
        return num;
    }
}
 

let _data:any = {
    "Pi":Pi,
    "luck_draw_shop":luck_draw_shop,
    "luck_draw_set":luck_draw_set,
    "luck_draw":luck_draw,
    "canGetAward":logic.canGetAward,
    "getCount": logic.getCount,
};
//获取最新数据(刷新)
const getData = function () {
    _data.now_time = Util.serverTime(true);
    _data.player = getDB("player");
    _data.tabSwtich = tabSwtich;
    _data.score_num = logic.getCount(score_coin);
    _data.cost_num = logic.getCount(cost_coin);//高级抽奖道具数量
    _data.free_time = getDB("lottery.free_time");
    _data.rune = getDB("rune.rune_set").join(",");
    return _data;
}


insert("lottery",{});
listenBack("app/prop/luck_draw@read",(data)=>{
    updata("lottery",data);
});