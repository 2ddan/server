import { updata, get as getDB, listen, get, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { globalSend, Pi } from "app/mod/pi";
import { listenBack } from "app/mod/db_back";
import { net_request, net_message } from "app_a/connect/main";
import { open, close } from "app/mod/root";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { wild_random_boss } from "cfg/c/wild_random_boss";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { function_open } from "cfg/b/function_open";
import { funIsOpen } from "app_b/open_fun/open_fun";
import {  mgr } from "app/scene/scene";
import { SMgr } from "app_b/fight_ol/same";
import { getGlobal } from "pi/widget/frame_mgr";
import { getPage } from "app_b/playermission/playermission";
import { UiFunTable } from "app/scene/ui_fun";
import { Util } from "app/mod/util";

//======================================本地
let random_boss_id,
    boss = 0,
    coinId =  wild_random_boss[0]['open_box_cost'][0] || 100018,
    targetPosition = [],//boss坐标
    open_level = 0,//是否达到开放等级
    node_list: any = {},
    new_box_id = 0,//推送过来箱子ID
    wildOpenBox = 0,//野外开启宝箱状态
    hasCloseBox = 0,//是否有箱子能够领取
    opening = 0;//是否开箱子


//是否再开箱子
insert("open_box",false);

export const forelet = new Forelet();
let frame_mgr = getGlobal();

export const globalReceive: any = {
    gotoMysticBox: () => {
        if (funIsOpen("random_boss")) {
            forelet.paint(getData());
            open("app_b-random_boss-mysticBox");
            globalSend("openNewFun", "random_boss");
        }
    },
    leavewild: () => {
        if (boss) {
            boss = 0;
            new_box_id = 0;
            wildOpenBox = 0;
            logic.clearBox();
            forelet.paint(getData());
        }
    },
    //判断随机BOSS出现消失
    judgeRandomBoss: (msg) => { 
        if (msg.type === "insert" && !boss && logic.getCount()) {//获得boss出现和boss坐标
            if (msg.fighter.show_type === 1) {
                for (var i = 0, len = random_boss_id.length; i < len; i++) {
                    if (random_boss_id[i] === msg.fighter.sid && open_level) {
                        boss = msg.fighter.mapId;
                        targetPosition = [msg.fighter.x,msg.fighter.y,msg.fighter.z];
                        forelet.paint(getData());
                        globalSend("fightRandomBoss", boss)
                        return;
                    }
                }
            }
        }else if(boss) {
            //清除本次BOSS状态及显示
            if(msg.type === "remove" &&  msg.fighter === boss){//Boss打死或消失是否执行开箱子
                boss = 0;
                forelet.paint(getData());
                //创建宝箱，30后仍然存在移除
                logic.createBox();
                let clear_timer = setTimeout(()=>{
                    logic.clearBox();
                    clearTimeout(clear_timer);
                    clear_timer = null;
                },30000 );
                if(opening>0 || !logic.getCount()){ 
                    SMgr.change_ai(true);
                    return;
                }
                let flag = Common_m.bagIsFull();
                if (flag) {
                    globalSend("screenTipFun", {
                        words: `背包数量已满`
                    })
                    SMgr.change_ai(true);
                    return;
                }

                //跑到BOSS点,设置自己为被动
                targetPosition[0] += logic.randomPosition(1);
                targetPosition[1] +=  logic.randomPosition(1);
                SMgr.change_ai(false);
                SMgr.move({x:targetPosition[0],y:targetPosition[1]})
             
            }
        }
    }
}

/**
 * 查询最近的可开启宝箱结束时间
 */
const findMinTime = function () {
    let time = Util.serverTime();
    let arrTime = [];
    let box = getDB("random_boss.box");
    let keys = Object.keys(box);
    keys.forEach((v) => {
        if (box[v].opened == 0 && box[v].end_time > time) {
            arrTime.push(box[v].end_time);
        }
    });
    if (arrTime.length == 0) {
        return 0;
    }
    return Math.min.apply(null, arrTime);
};
/**
 * 倒计时控制
 */
let timer;

const mySetTimeOut = function () {
    let end_time = findMinTime();
    //清除定时器
    clearTimeout(timer);
    timer = null;
    if (end_time == 0 || hasCloseBox == 0) {
        return;
    }
    let t = end_time - Util.serverTime();
    timer = setTimeout(() => {
        hasCloseBox -= 1;
        updata("random_boss.has_box", hasCloseBox);
        mySetTimeOut();
    }, t + 100);
}

export class Arena extends Widget {
    //退出
    goback = (arg) => {
        close(arg.widget);
    }
  
    //倒计时结束回调
    cdEnd() {
        forelet.paint(getData());
    }
    //查看物品详情
    showPropInfo = (arg) => {
        globalSend("showOtherInfo", arg)
    }
    //开箱子
    openBox = (id) => {
        if(!logic.getCount()){
            globalSend("screenTipFun", {
                words: `您的${Pi.sample[wild_random_boss[0]['open_box_cost'][0]].name}不足,无法开启宝箱`
            });
            return;
        }
        if (Common_m.bagIsFull()) {
            globalSend("screenTipFun", {
                words: `背包数量已满`
            })
            return;
        }
        logic.openBox(id);
    }
    //获取方式
    gotoGetWay() {
        globalSend("gotoGetWay",coinId);
    }
}
var baseData: any = {
    Pi: Pi,
    box_base: wild_random_boss[0],
};

//基本数据
const getData = () => {
    let data = getDB("random_boss");
    baseData.coinId = coinId;
    baseData.box_data = data && data.box;
    baseData.mySort = logic.mySort;
    baseData.money = logic.getCount();
    baseData.boss = boss;
    baseData.wildOpenBox = wildOpenBox;
    baseData.opening = opening;//正在开箱子
    baseData.today_box_num = getDB("random_boss.today_box_num");//今日寻宝次数
    baseData.today_kill_boss_num = getDB("random_boss.today_kill_boss_num");//今日击杀守卫数量
    return baseData;
};

export let logic = {
    //随机一个数字
    randomPosition(num){
        num = num || 1;
        let a = Math.random() * num;
        let b = 1;
        if(a<num/2){b = -1}
        return a * b;
    },
    //计算能否开箱子,无提示
    getCount(){
        let prop = get("bag*sid=" + coinId).pop();
        if(prop && prop.count){
            return prop.count;
        }
        return 0;
    },
    //创建场景箱子
    createBox(){
       if(node_list["box"]){
            mgr.remove(node_list["box"]);
        }
        if(getPage()!=="app_b-wild-wild"){
            return;
        }
        node_list["box"] = {
            "effect": "model_dl_baoxiang",
            "x":targetPosition[0],
            "y":targetPosition[1],
            "z":targetPosition[2],
            "scale":4,
            "isOnce":true
        };
        mgr.create(node_list["box"],"effect");
    },
    //清除场景箱子
    clearBox(){
        if(new_box_id){new_box_id = 0;}
        wildOpenBox = 0;
        if(!node_list["box"]){return;}
        mgr.remove(node_list["box"]);
        delete node_list["box"];
    },
    //箱子更新
    updateBox(data) {
        new_box_id = data[0];
        let _data: any = getDB("random_boss.box");
        // updata("random_boss.box", _data);
        let now = Util.serverTime();
        for(let key in _data){
            if(now > _data[key].end_time){
                delete _data[key];
            }
        }
        _data[data[0]] = {
            "id": data[0],
            "end_time": (data[1] - 0 + baseData.box_base.box_exsit_time * 60) * 1000,
            "opened": 0
        };
        updata("random_boss.box",_data);
    },
    //箱子排序
    mySort(data) {
        let arr = [];
        let now = Util.serverTime();
        for (var key in data) {
            if ((data[key].end_time) > now) {
                arr.push(data[key]);
            }
        }
        return arr.sort(function (a, b) {
            a.opened = a.opened || 0;
            b.opened = b.opened || 0;
            if (a.opened !== b.opened)
                return a.opened - b.opened;
            if (a.end_time !== b.end_time)
                return b.end_time - a.end_time;

        });
    },
    //打开箱子
    openBox(id,isWild?){//箱子id，是否在野外开启
        opening = 1;
        updata("open_box",true);
        if(isWild){
            globalSend("resetTimer");
        }
        // let timer = setInterval(function () {
        //     if (opening < 100) {
        //         opening += 4;
        //     }else{
        //         clearInterval(timer);
        //         timer = null;
        //         logic.open(id,isWild);
        //     }
        //     forelet.paint(getData());
        // }, 80);
        let time = (new Date()).getTime();
        logic.barChange(()=>{logic.open(id,isWild)},time);
    },
    barChange(callBack,time){
        opening = Math.floor(((new Date()).getTime() - time)/2000*100);
        forelet.paint(getData());
        if (opening >= 100) {
            callBack();
        }else{
            frame_mgr.setAfter(()=>{
                logic.barChange(callBack,time);
            })
        }
    },
    //打开箱子通讯
    open(id,isWild) {
        let msg = { "param": { "index": id }, "type": "app/pve/wild/random_boss@open_box" };
        net_request(msg, (data) => {
            opening = 0;
            updata("open_box",false);
            logic.clearBox();

            if (data.error) {
                if (data.why) globalSend("screenTipFun", { words: data.why });
                //野外
                if(isWild){
                    SMgr.change_ai(true);
                }
                forelet.paint(getData());
                return;
            } else if (data.ok) {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                updata("random_boss.box." + id + ".opened", 1);
                // let box = getDB("random_boss.box");
                hasCloseBox -= 1;
                updata("random_boss.open_box_num", prop.open_box_num);
                updata("random_boss.has_box", hasCloseBox);
                updata("random_boss.today_box_num", prop.today_box_num);
                forelet.paint(getData());
                //神秘宝箱界面
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                });
                //野外
                if(isWild){
                    UiFunTable.drop_outFun(prop.award.prop,targetPosition,targetPosition,()=>{
                        let timer = setTimeout(()=>{
                            clearTimeout(timer);
                            timer = null;
                            SMgr.change_ai(true);
                        },1000) 
                    });
                    return;
                }

                
            }
        });
    },
    //随机Boss ID
    boss_id(data) {
        let arr = [];
        for (var key in data) {
            if(String(arr).indexOf(data[key]["random_boss_id"][0]+"")>-1){
                continue;
            }
            arr.push(data[key]["random_boss_id"][0])
        }
        random_boss_id = arr;
    },
    // 读取基础数据
    readBaseData(data) {
        let _data: any = {
            open_box_num: data.open_box_num,
            attend_times: data.attend_times,
            today_box_num: data.today_box_num,
            today_kill_boss_num: data.today_kill_boss_num
        },
        box: any = {};
        if (data) {
            let boxArr = data.box_award_record,
                openedArr = data.open_box_record,
                nowTime = Util.serverTime();
            for (var i = 0, len = boxArr.length; i < len; i++) {
                let end_time = (boxArr[i][1] - 0 + baseData.box_base.box_exsit_time * 60) * 1000;
                if (end_time > nowTime) {
                    let obj: any = {
                        "end_time": end_time,
                        "id": boxArr[i][0]
                    };
                    if (openedArr.length) {//存在记录
                        let flag = 0;
                        for (var j = 0, leng = openedArr.length; j < leng; j++) {
                            if (boxArr[i][1] == openedArr[j][0]) {
                                obj.opened = 1;
                                flag = 1;
                                break;
                            }
                        }
                        if (flag == 0) {
                            obj.opened = 0;
                            hasCloseBox++;
                        }
                    } else {//不存在开箱子记录
                        hasCloseBox++;
                    }

                    box[boxArr[i][0]] = obj;
                }
            }
        }
        _data.box = box;
        _data.has_box = hasCloseBox;
        updata("random_boss", _data);
        mySetTimeOut();
        // forelet.paint(getData());
    }

}

listenBack("app/pve/wild/random_boss@read", logic.readBaseData);


// 接受后台推送-Boss参与奖
net_message("wild_random_boss_attend_award", (data) => {
    Common_m.mixAward(data);
});



// 接受后台推送-箱子
net_message("wild_boss_kill", (data) => {
    let t = setTimeout(() => {
        clearTimeout(t);
        t = null;
        hasCloseBox += 1;
    }, 5 * 60 * 1000);
    updata("random_boss.today_kill_boss_num", data.kill_boss_num);
    updata("random_boss.has_box", hasCloseBox);
    logic.updateBox(data.box_award[0]);
});

//玩家等级是否达到开放等级
listen("player.level",()=>{
    let player = getDB("player");
    if(!open_level){
        open_level = player.level >= function_open.random_boss.level_limit ? 1 : 0;
    }
})

logic.boss_id(wild_mission);


frame_mgr.setPermanent(()=>{
	if(!!node_list["box"] && !wildOpenBox){
        let f = SMgr.getSelf();
        if(f && !f.moving){
            let cost = wild_random_boss[0]['open_box_cost'];
            let prop = get("bag*sid=" + cost[0]).pop();
            if ((!prop) || cost[1] > prop.count) {
                return;
            }
            if(Math.sqrt( Math.pow(f.x - targetPosition[0],2) + Math.pow(f.y - targetPosition[1],2) )<4){

                if(!new_box_id){   
                    SMgr.change_ai(true);                       
                    return;
                }
                wildOpenBox = 1;
                SMgr.change_ai(false);
                logic.openBox(new_box_id,true);
            } 
        }
       
    }
})