//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert, listen } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { resetcanvas } from "app/scene/base/scene";
import { fight, showAccount } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { pay } from "app_b/recharge/pay"

//导入配置
import { exp_fb_base } from "cfg/c/exp_fb_base";
import { exp_fb_condition } from "cfg/c/exp_fb_condition";
import { exp_fb_map } from "cfg/c/exp_fb_map";
import { exp_fb_mission } from "cfg/c/exp_fb_mission";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { TaskProgress } from "app_b/mod/task_progress";
import { vipcard } from "cfg/c/recharge_buy_robolet";

//掉落效果
import { node_fun, drop_outFun } from "app_b/widget/drop_out";
// 所有怪物配置
import { monster_base } from "fight/b/common/monsterBase";
// 怪物模型配置
import { monster_cfg } from "app/scene/plan_cfg/monster_config";

insert("exp_fb", {
    "total_count":0
});

export const forelet = new Forelet();

//打开装备副本
export let globalReceive = {
    "gotoExpFB": () => {
        if (funIsOpen("exp_fb")) {
            forelet.paint(getData());
            open("app_c-exp_fb-exp_fb");
            globalSend("openNewFun", "exp_fb");
        }        
    },
    //怪物死亡记录ID
    monsterDied: (msg) => {
        str += msg;
    }
}



//定义变量
let fb_data: any = {},
    map_id = 1,//默认副本地图id
    openExpFb = false,//是否开始进入地图
    curr_id = 1,//试炼副本当前级别id
    str = "",//怪物死亡id字符串
    end_time = 0,//本次副本结束时间.ms
    index = 0//第几波;

//数据更新
const getData = function () {
    fb_data.exp_fb_base = exp_fb_base;
    fb_data.exp_fb_condition = exp_fb_condition;
    fb_data.exp_fb_mission = exp_fb_mission[curr_id];
    fb_data.task = logic.getTask;
    //令牌
    let sid = exp_fb_base["cost"][0]
    let prop = getDB("bag*sid="+ sid).pop();
    prop = prop || Pi.sample[sid];
    let count = prop.count>0?prop.count:0;
    fb_data.prop_count = count ;  
    logic.count();  
    return fb_data;
}
//前台界面操作
export class exp_fb extends Widget {
    cdEnd(){
        forelet.paint(getData());
        updata("exp_fb.total_count",fb_data.count);
    }
    goback(arg) {
        close(arg.widget);   
    }
    //获取次数
    getCount() {
        forelet.paint(getData());
        open("app_c-exp_fb-get_count-get_count");
    }
    //物品详情
    propInfoShow = (id) => {
        globalSend("showOtherInfo", id);
    } 
    //领取次数奖励
    getAward(obj) {
        fb.award(obj);
    }
    //购买月卡
    buyCard(){
        // let id = vipcard[0].prop_id;
        // pay(id,id,1);
        globalSend("gotoCard");
    }
    //挑战
    challenge(arg,bol) {//0次数，1道具,bol能否挑战
        if(!bol){
            globalSend("screenTipFun", {"words": `副本试炼次数不足`}) 
            return;          
        }
        // if(checkFighting()){
        //     globalSend("screenTipFun", {"words": `正在挑战野外BOSS，请稍后再试！`}) 
        //     return;
        // }
        let level = getDB("player.level");
        let id = 1;
        for(let key in exp_fb_mission){
            if(level >= exp_fb_mission[key].level && level < (exp_fb_mission[parseInt(key)+1] && exp_fb_mission[parseInt(key)+1].level)){
                id = parseInt(key);
                break;
            }else if(level >= exp_fb_mission[key].level && !exp_fb_mission[parseInt(key)+1] ){
                id = parseInt(key);
                break;
            }
        }
        curr_id = id;    
        fb.challenge(id,arg);      
    }
}
//逻辑处理
let logic = {
    //计算次数
    count(){
        let player = getDB("player");
        let cd = player.month_card_due_time ? exp_fb_base["card_cd"] : exp_fb_base["normal_cd"];
        let data = getDB("exp_fb");
        let now =  Util.serverTime(true);    
        let seconds = now - data.time;
        let count = Math.floor(seconds/cd);
        let init_count = exp_fb_base["init_count"];
        count = count < 0 ? 0 : count > init_count  ? init_count : count;
        fb_data.count = count + data.count;//总次数
        fb_data.end_time = 0;
        if(fb_data.count < init_count){//计算恢复时间点
            let sec = cd - seconds%cd;//sec后恢复次数            
            fb_data.end_time = (now + sec)*1000 ;  //恢复初始次数的时间点      
        }
        
    },
     //获取当前应做的任务
    getTask() {
        let task = [],
            record = getDB("exp_fb.record");
        if (!record) {
            return task;
        }
        let keyArr = Object.keys(record);
        keyArr.forEach((k) => {
            if (exp_fb_condition[k] && exp_fb_condition[k][record[k]]) {
                let obj = exp_fb_condition[k][record[k]];
                let func = k == "level" ? "getPlayerLevel" : k == "power" ? "getFightAbility" : k == "wild" ? "wildMission" : "";
                if(!func){
                    console.log("=====================方法不存在，请写入");
                }
                let arr = TaskProgress[func](obj.params);
                if (arr[0]) {
                    task.unshift({
                        "task": obj,
                        "value": arr  //[true/false, number]
                    });
                } else {
                    task.push({
                        "task": obj,
                        "value": arr
                    });
                }
            }
        })
        return task;
    },
    //每波战斗打完数据处理
    setFight(fightData,id){
        if (fightData.r === 1 && exp_fb_mission[id].monster.length > index) {
            let timer = setTimeout(()=>{
                fb.nextFight(fightData,id);                                                                   
                clearTimeout(timer);
                timer = null;
            },exp_fb_base["refresh_cd"]*1000) ;
        } else {
            let time = end_time - Util.serverTime();
            fb.closeFight(time,fightData);
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
const achieveNet = function (param) {
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
//网络通讯
let fb = {
    //领取次数奖励
    award: function (obj) {
        let arg = {
            "param": { "award_id": obj.id - 0 },
            "type": "app/pve/exp_instance@award_count"
        };
        achieveNet(arg)
            .then((data: any) => {
                let prop: any = Common.changeArrToJson(data.ok);
                //保持奖励
                globalSend("screenTipFun", {
                    "words": `试炼次数+1`
                })
                updata("exp_fb.count", prop.count);
                updata("exp_fb.time", prop.time);
                //更新任务列表
                let num = getDB(`exp_fb.record.${obj.type}`) - 0 + 1;
                updata(`exp_fb.record.${obj.type}`, num);
                forelet.paint(getData());
                updata("exp_fb.total_count",fb_data.count);                
                
            })
            .catch((data) => {
                globalSend("screenTipFun", {
                    "words": `通讯失败`
                })
                console.log(data);
            })
    },
    //开始挑战
    challenge: function (id,type) {//0次数，1道具
        index = 0;
        let arg = {
            "param": {
                "index": id,
                "type": type 
            },
            "type": "app/pve/exp_instance@start_fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {    
                //进入战斗场景
                let msg: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(msg);                
                updata("exp_fb.count", msg.count);
                updata("exp_fb.time", msg.time);
                end_time = Util.serverTime() + exp_fb_base["fight_time"]*1000;                
                msg.time = end_time;                
                msg.limitTime = exp_fb_base["fight_time"];                
                msg.type = "exp_mission";
                //地图信息
                let arr = exp_fb_mission[id].map_id;
                map_id = arr[Math.floor(Math.random()*arr.length)];
                let info  =  JSON.parse(JSON.stringify(exp_fb_map[map_id]));
                info.enemy_pos = [info.enemy_pos[info.refresh_order[index]-1]];
                msg.cfg = info; 
                index++; 
                msg.index = index;
                str = "";
                openExpFb =  true;
                let timer = setInterval(()=>{
                    if(!openExpFb){
                        clearInterval(timer);
                        timer = null;
                        return;
                    }
                    if(str){
                        fb.getExp(str);
                        str = "";                        
                    }
                },300)
                globalSend("openExpFb",openExpFb);     
                fight(msg, function (fightData) {
                    logic.setFight(fightData,id);
                })
                forelet.paint(getData());                   
                updata("exp_fb.total_count",fb_data.count);                
            }
        })
    },
    //请求下一波
    nextFight: function (result,id) {
        let arg = {
            "param": {},
            "type": "app/pve/exp_instance@next_fight"
        };
        net_request(arg, function (data) {
            let hasTime = (end_time - Util.serverTime())/1000;
            if (data.error) {
                console.log(data.error);
                fb.closeFight(hasTime,result);
            } else {
                if(Util.serverTime() >= end_time){
                    fb.closeFight(hasTime,result);
                    return;
                }
                let msg: any = Common.changeArrToJson(data.ok);               
                msg.type = "exp_mission";
                let info  = JSON.parse(JSON.stringify(exp_fb_map[map_id]));
                info.enemy_pos = [info.enemy_pos[info.refresh_order[index]-1]];
                msg.cfg = info; 
                msg.time = end_time;    
                msg.limitTime = hasTime;                                
                index++;
                msg.index = index;  
                let ti = setTimeout(()=>{
                    openExpFb =  3;                    
                    globalSend("openExpFb",openExpFb); //重置怪物map_id记录   
                    clearTimeout(ti);
                    ti = null;
                },1) ;
                                        
                fight(msg, function (fightData) {
                    logic.setFight(fightData,id); 
                })
                forelet.paint(getData());   
                updata("exp_fb.total_count",fb_data.count);                                
            }
        })
    },
    //战斗结算
    closeFight: function (time,result?) {
        openExpFb = false;
        globalSend("openExpFb",openExpFb);             
        let arg = {
            "param": {},
            "type": "app/pve/exp_instance@end_fight"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.error)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);

                let r:any = {player:{},bag:[]}
                
                if(!prop.show_award){
                    prop.result = {
                        r:2,
                    }
                }else{
                    let award:any = Common.changeArrToJson(prop.show_award);
                    for(let k in award){
                        if(k === "money"){
                            if(award[k]>0)r.player.money = award[k];
                        }else if(k === "exp"){
                            if(award[k]>0)r.player.exp = award[k];
                        }else{
                            let _prop = JSON.parse(JSON.stringify(Pi.sample[k]));
                            _prop.count = award[k];
                            if( _prop.type == "equip"){
                                _prop.level = _prop.level[1];
                                let i = 0;
                                while(i < _prop.count){
                                    r.bag.push(_prop);
                                    i++;
                                }
                            }else{
                                r.bag.push(_prop);
                            }
                            
                           
                        }
                    }
                    prop.bag = r.bag;
                    prop.player = r.player;
                    let tolol_time = Math.ceil(exp_fb_base["fight_time"] - time/1000);//战斗总时间
                    prop.result = {
                        r:1,
                        time: (tolol_time > exp_fb_base["fight_time"] ? exp_fb_base["fight_time"] : tolol_time)*1000
                    };                    
                }
                prop.extra = {
                    "source": "exp_fb",
                    "star": "none"
                }
                showAccount(prop, () => { });
                forelet.paint(getData());                   
            }
        })
    },
    //杀怪领取经验
    getExp: function (str) {//str=>"怪物1 id,怪物2 id"
        let arg = {
            "param": {
                "monster_id":str
            },
            "type": "app/pve/exp_instance@award_exp"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                let award = Common_m.mixAward(prop);
                // globalSend("screenTipFun", { words: `Exp + ${award.player.exp}` });
                if(award.player && award.player.exp){
                    globalSend("goodsTip", {
                        words: [ 100003, award.player.exp ]
                    });
                }
            }
        })
    }
}

//读取装备副本信息
listenBack("app/pve/exp_instance@read", function (data) {
    updata("exp_fb", data);
    logic.count();
    updata("exp_fb.total_count",fb_data.count);
});

/**
 * 监听任务完成情况刷新页面
 */
//玩家等级
let origin_level = 0;
let record_level = 0;
listen("player.level,exp_fb.record.level", () => {
    let level = getDB("player.level");
    let num = getDB("achieve.record.level");
    if (level <= origin_level && record_level == num) {
        return;
    }
    origin_level = level;
    record_level = num;
    if (num >= 0 && exp_fb_condition["level"][num]) {
        let obj = exp_fb_condition["level"][num];
        let arr = TaskProgress["getPlayerLevel"](obj.params);
        // updata("exp_fb.red_tip.0", arr[0] ? 1 : 0);
        forelet.paint(getData());
    }
});
//玩家战斗力
listen("player.power,exp_fb.record.power", () => {
    let num = getDB("exp_fb.record.power");
    if (num >= 0 && exp_fb_condition["power"][num]) {
        let obj = exp_fb_condition["power"][num];
        let arr = TaskProgress["getFightAbility"](obj.params);
        // updata("achieve.red_tip.2", arr[0] ? 1 : 0);
        forelet.paint(getData());
    }
});
//野外关卡达到#关
listen("wild.wild_max_mission,exp_fb.record.wild", () => {
    let num = getDB("exp_fb.record.wild");
    if (num >= 0 && exp_fb_condition["wild"][num]) {
        let obj = exp_fb_condition["wild"][num];
        let arr = TaskProgress["wildMission"](obj.params);
        // updata("achieve.red_tip.2", arr[0] ? 1 : 0);
        forelet.paint(getData());
    }
});

