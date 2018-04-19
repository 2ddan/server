import { updata, get as getDB, listen, get, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { globalSend, Pi, cfg } from "app/mod/pi";
import { listenBack } from "app/mod/db_back";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { open, close } from "app/mod/root";
import { Util } from "app/mod/util";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { wild_random_boss } from "cfg/c/wild_random_boss";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { function_open } from "cfg/b/function_open";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { mgr_data, mgr } from "app/scene/scene";
import { change_status,olFightOrder } from "app_b/fight_ol/handscene";
import { node_fun, drop_outFun } from "app_b/widget/drop_out";
import { getFighter, Move} from "app/scene/move";
import { getGlobal } from "pi/widget/frame_mgr";
import { posTimer } from "app_b/wild/wild";
import { getPage } from "app_b/playermission/playermission";

//======================================本地
let random_boss_id,
    boss = 0,
    process_num = 0,//进度条数字
    coinId = 100018,
    opening = 0,//正在开箱子
    targetPosition = [],//boss坐标
    fightPosition = [],//角色坐标
    fighter_mapId = null,
    open_level = 0,//是否达到开放等级
    node_list : any = {},
    role_id = null,//角色ID
    new_box_id = 0,//推送过来箱子ID
    wildOpenBox = 0,//野外开启宝箱状态
    hasCloseBox = 0,//是否有箱子能够领取
    fight_state = 0;//角色控制状态
export const forelet = new Forelet();
let frame_mgr = getGlobal();

export const globalReceive: any = {
    gotoMysticBox: () => {
        if (funIsOpen("random_boss")) {
            coinId = wild_random_boss[0]['open_box_cost'][0];
            forelet.paint(getData());
            open("app_b-random_boss-mysticBox");
            globalSend("openNewFun", "random_boss");
        }
    },
    leavewild: () => {
        if (boss) {
            boss = 0;
            fighter_mapId = null;
            if(new_box_id){new_box_id = 0;}
            logic.clearBox();
            forelet.paint(getData());
        }
    },
    //判断随机BOSS出现消失
    judgeRandomBoss: (msg) => {
        if (msg.type === "insert" && !boss) {//获得boss出现和boss坐标
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
            if(!fighter_mapId && msg.fighter && msg.fighter.sid==role_id){//获得角色map_id
                fighter_mapId = msg.fighter.mapId;
            }

            //清除本次BOSS状态及显示
            if(msg.type === "remove" &&  msg.mapId === boss){//Boss打死或消失是否执行开箱子
                boss = 0;
                forelet.paint(getData());

                //创建宝箱，30后仍然存在移除
                logic.createBox();
                let clear_timer = setTimeout(()=>{
                    fighter_mapId = null;
                    logic.clearBox();
                    clearTimeout(clear_timer);
                    clear_timer = null;
                },30000 );
                if(!logic.canOpenBox()){ 
                    change_status(0);
                    return;
                }
                let flag = Common_m.bagIsFull();
                if (flag) {
                    globalSend("screenTipFun", {
                        words: `背包数量已满`
                    })
                    change_status(0);
                    return;
                }
                //获取BOSS当前坐标
                let target = getFighter(msg.mapId);
                if(target){
                    targetPosition = [target.x,target.y,target.z];
                }

                //跑到BOSS点,设置自己为被动
                if(!nearBoss()){
                    targetPosition[0] += logic.randomPosition(1);
                    targetPosition[1] +=  logic.randomPosition(1);
                    let result = {
                        data:[targetPosition[0],targetPosition[2],targetPosition[1]],
                        id:-1001,
                        type:"terrain",
                    };
                    change_status(1,()=>{
                        fight_state = 1;
                        olFightOrder({ "type": "wild", "result": JSON.stringify(result) });
                    });
                    return;
                }

                //移除BOSS模型时，距离箱子很近直接开箱
                if(!wildOpenBox && node_list["box"]){
                    wildOpenBox = 1;
                    change_status(1,()=>{
                        fight_state = 1;
                        //挖宝
                        let open_timer = setTimeout(()=>{
                            if(!new_box_id){  
                                wildOpenBox = 0;                          
                                change_status(0);
                                fight_state = 0;
                                return;
                            }
                            logic.openBox(new_box_id,true);
                            clearTimeout(open_timer);
                            open_timer = null;
                        },1500)
                    });
                }
                return;
            }
        }
    }
}

//判断玩家是否处于目标点附近
const nearBoss = ()=>{
    if(!fighter_mapId){return false;}
    let fighter = getFighter(fighter_mapId);

    //获得角色坐标
    if(fighter){
        fightPosition = [fighter.x,fighter.y,fighter.z];
    }

    if(targetPosition.length == 0 || fightPosition.length == 0){
        return false;
    }
    for(let i=0,len=fightPosition.length;i<len-1;i++){
        if(Math.abs(fightPosition[i] - targetPosition[i]) > 2){
            return false;
        }
    }
    return true;
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
        if(!logic.canOpenBox()){return;}
        logic.openBox(id);
    }
}
var baseData: any = {
    Pi: Pi,
    box_base: wild_random_boss[0],
};

//基本数据
const getData = () => {
    baseData.num = process_num;//进度条的数字
    let data = getDB("random_boss");
    baseData.coinId = coinId;
    baseData.box_data = data && data.box;
    baseData.mySort = logic.mySort;
    let prop = get("bag*sid=" + coinId).pop();
    prop = prop || Pi.sample[coinId];
    let count = prop.count > 0 ? prop.count : 0;
    baseData.money = count;
    baseData.boss = boss;
    baseData.wildOpenBox = wildOpenBox;
    baseData.opening = opening;//正在开箱子
    baseData.today_box_num = getDB("random_boss.today_box_num");//今日寻宝次数
    baseData.today_kill_boss_num = getDB("random_boss.today_kill_boss_num");//今日击杀守卫数量
    return baseData;
};

let logic: any = {
    //随机一个数字
    randomPosition(num){
        num = num || 1;
        let a = Math.random() * num;
        let b = 1;
        if(a<num/2){b = -1}
        return a * b;
    },
    //计算能否开箱子
    canOpenBox(){
        let cost = wild_random_boss[0]['open_box_cost'];//[100006,100]
        let prop = get("bag*sid=" + cost[0]).pop();
        if ((!prop) || cost[1] > prop.count) {
            globalSend("screenTipFun", {
                words: `您的${Pi.sample[cost[0]].name}不足,无法开启宝箱`
            });
            return false;
        }
        return true;
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
        let _data: any = getDB("random_boss.box");
        // updata("random_boss.box", _data);
        let now = Util.serverTime();
        for(let key in _data){
            if(now > _data[key].end_time){
                delete _data[key];
            }
        }
        new_box_id = data[0];
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
        for (var key in data) {
            if ((data[key].end_time) > Util.serverTime(true)) {
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
    openBox(id,isWild){//箱子id，是否在野外开启
        opening = 1;
        process_num = 0;
        if(isWild){
            posTimer = Date.now();
            // console.log(posTimer,fight_state)
        }
        let timer = setInterval(function () {
            if (opening && opening < 100) {
                opening += 1;
            }
            if (opening >= 100) {
                clearInterval(timer);
                timer = null;
                logic.open(id,isWild);
            }
            process_num += 1;
            forelet.paint(getData());
        }, 20);
    },
    //打开箱子通讯
    open(id,isWild) {
        let msg = { "param": { "index": id }, "type": "app/pve/wild/random_boss@open_box" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.why) globalSend("screenTipFun", { words: data.why });
                opening = 0;
                let w = forelet.getWidget("app_b-random_boss-open_box");
                // w && close(w);
                w && w.cancel && w.cancel();
                //野外
                if(isWild){
                    change_status(0);
                    fight_state = 0;
                    forelet.paint(getData());
                }
                return;
            } else if (data.ok) {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                opening = 0;
                updata("random_boss.box." + id + ".opened", 1);
                let box = getDB("random_boss.box");
                hasCloseBox = 0;
                for (var key in box) {
                    if (!box[key].opened) {
                        hasCloseBox = 1;
                        break;
                    }
                }
                updata("random_boss.open_box_num", prop.open_box_num);
                updata("random_boss.has_box", hasCloseBox);
                updata("random_boss.today_box_num", prop.today_box_num);
                forelet.paint(getData());

                //野外
                if(isWild){
                    // let w = forelet.getWidget("app_b-random_boss-open_box");
                    // w && close(w);
                    // forelet.paint(getData());
                    logic.clearBox();
                    
                    drop_outFun(prop.award.prop,targetPosition,targetPosition,()=>{
                        let timer = setTimeout(()=>{
                            change_status(0);
                            fight_state = 0;
                            clearTimeout(timer);
                            timer = null;
                        },1000) 
                    });
                    return;
                }

                //神秘宝箱界面
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                });
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
                        for (var j = 0, leng = openedArr.length; j < leng; j++) {
                            if (boxArr[i][1] == openedArr[j][0]) {
                                obj.opened = 1;
                                break;
                            }
                            if (!hasCloseBox) {
                                hasCloseBox = 1;
                            }
                        }
                    } else {//不存在开箱子记录
                        if (!hasCloseBox) {
                            hasCloseBox = 1;
                        }
                    }

                    box[boxArr[i][0]] = obj;
                }
            }
        }
        _data.box = box;
        _data.has_box = hasCloseBox;
        updata("random_boss", _data);
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
    hasCloseBox = 1;
    updata("random_boss.today_kill_boss_num", data.kill_boss_num);
    updata("random_boss.has_box", hasCloseBox);
    logic.updateBox(data.box_award[0]);
});

//玩家等级是否达到开放等级
listen("player.level",()=>{
    let player = getDB("player");
    role_id = player.role_id || null;
    if(!open_level){
        open_level = player.level >= function_open.random_boss.level_limit ? 1 : 0;
    }
})

logic.boss_id(wild_mission);


frame_mgr.setPermanent(()=>{
	if(node_list["box"] && fighter_mapId && !wildOpenBox && !Move.isMove(fighter_mapId)){
        let cost = wild_random_boss[0]['open_box_cost'];
        let prop = get("bag*sid=" + cost[0]).pop();
        if ((!prop) || cost[1] > prop.count) {
            return;
        }
        if(nearBoss()){
            if(!new_box_id){   
                if(fight_state) {
                    // console.log(posTimer,fight_state)
                    change_status(0);
                    fight_state = 0;
                }                        
                return;
            }
            wildOpenBox = 1;
            change_status(1,()=>{  
                fight_state = 1;                
                logic.openBox(new_box_id,true);
            });
        } 
    }
})