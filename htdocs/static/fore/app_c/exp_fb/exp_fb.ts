//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert, listen } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request,net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight, showAccount } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { UiFunTable } from "app/scene/ui_fun";
//导入配置
import { exp_fb_base } from "cfg/c/exp_fb_base";
import { exp_fb_condition } from "cfg/c/exp_fb_condition";
import { exp_fb_map } from "cfg/c/exp_fb_map";
import { exp_fb_mission } from "cfg/c/exp_fb_mission";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { TaskProgress } from "app_b/mod/task_progress";
import { vip_advantage } from "cfg/c/vip_advantage";

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
        str = (str && str+",") + msg;
    },
    //怪物死亡时坐标
    expFBI: (msg) => {
        position = msg;
    }
}



//定义变量
let fb_data: any = {},
    map_id = 1,//默认副本地图id
    openExpFb = false,//是否开始进入地图
    curr_id = 1,//试炼副本当前级别id
    str = "",//怪物死亡id字符串
    end_time = 0,//本次副本结束时间.ms
    total_count = 0,//存活怪物数量
    position = null,
    drop_list = [],
    fightEnd = true,
    refresh_timer = null;//刷怪timer

//数据更新
const getData = function () {
    fb_data.exp_fb_base = exp_fb_base;
    fb_data.exp_fb_condition = exp_fb_condition;
    fb_data.exp_fb_mission = exp_fb_mission[curr_id];
    fb_data.task = logic.getTask;
    fb_data.max = vip_advantage[getDB("player.vip")||0].buy_exp_fb_times;
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
    //购买次数
    buyCount(bol) {
        if(!bol){
            globalSend("screenTipFun", {
                words: `购买次数已用完`
            });
            return;
        }
        let diamond = getDB("player.diamond"),
            costArr = exp_fb_base["buy_spend"],
            max = fb_data.max;

        let now_buy = fb_data.buy_count;
        //元宝是否足够
        if (diamond < (costArr[now_buy] || costArr[costArr.length - 1])) {
            globalSend("popTip", {
                title: "<div>元宝不足</div><div>是否前往充值</div>",
                btn_name: ["充值", "取消"],
                cb: [
                    //确认
                    () => {
                        let w = forelet.getWidget("app_c-exp_fb-get_count-get_count");
                        if(w)close(w);
                        globalSend("gotoRecharge");
                        
                    },
                    //取消
                    () => { }
                ]
            })
            return;
        }
        globalSend("popTip", {
            title: "<div>是否花费<span style='color:#ff9600'>" + (costArr[now_buy] || costArr[costArr.length - 1]) + "</span>元宝购买一次进入次数</div>",
            btn_name: ["确 定", "取 消"],
            cb: [
                //确认
                () => {
                    fb.buyCount(1);
                },
                () => { }
            ]
        })
       
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
        // let level = getDB("player.level");
        // let id = 1;
        // for(let key in exp_fb_mission){
        //     if(level >= exp_fb_mission[key].level && level < (exp_fb_mission[parseInt(key)+1] && exp_fb_mission[parseInt(key)+1].level)){
        //         id = parseInt(key);
        //         break;
        //     }else if(level >= exp_fb_mission[key].level && !exp_fb_mission[parseInt(key)+1] ){
        //         id = parseInt(key);
        //         break;
        //     }
        // }
        // curr_id = id;    
        fb.challenge(curr_id,arg);      
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
        fb_data.buy_count = data.buy_count;//已购买几次
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
    //真正结算
    resultFight(){
        fightEnd = true;
        clearInterval(refresh_timer);
        refresh_timer = null;
        let time = end_time - (new Date()).getTime();
        fb.closeFight(time);
    },
    //刷怪
    refresh(monster_total,count_str){
        let m: any = {};
        //第几波怪
        m.enemy_fight = [monster_total.splice(0,exp_fb_base["refresh_num"])];
        total_count += exp_fb_base["refresh_num"];
         //显示文字第几波
         m.count = [count_str[1]-(monster_total.length||0),count_str[1]];
        //怪物地点
        let info  = exp_fb_map[map_id];
        m.cfg =  {
            "scene": info.scene,
            "enemy_pos":[logic.refreshPosition(exp_fb_base["refresh_num"],m.count[0])]
        };
       
        fight(m);
    },
    //获得怪物出生点
    refreshPosition(count,total){
        // let i = 0,
        //     p = exp_fb_map[map_id]["enemy_pos"],
        //     arr = [];
        // for(let i = 0,len = p.length;i<count;i++){
        //     arr.push(p[Math.floor(Math.random()*len)]);
        // }
        let p = exp_fb_map[map_id]["enemy_pos"],
            arr = [];
        for(let i = 0,len = p.length;i<count;i++){
            arr.push(p[total%len]);
        }
        return arr;
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
    //购买次数
    buyCount: function (count) {
        let arg = {
            "param": { "count": count},
            "type": "app/pve/exp_instance@buy_count"
        };
        achieveNet(arg)
            .then((data: any) => {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);  
                updata("exp_fb.count", prop.count);
                updata("exp_fb.time", prop.time);
                updata("exp_fb.buy_count", prop.buy_count);
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
                //获得经验处理  
                globalSend("enterLevel", getDB("player"));
                fightEnd = false;
                //进入战斗场景
                let msg: any = Common.changeArrToJson(data.ok);
                // let monster_total = msg.enemy_fight;
                let monster_total = [];//所有怪物列表
                msg.enemy_fight.forEach((v)=>{
                    monster_total = [...monster_total, ...v];
                });
                Common_m.deductfrom(msg);                
                updata("exp_fb.count", msg.count);
                updata("exp_fb.time", msg.time);

                //地图信息
                let arr = exp_fb_mission[id].map_id;
                map_id = arr[Math.floor(Math.random()*arr.length)];
                let info = exp_fb_map[map_id];
                total_count = info.enemy_pos.length || 6;
                msg.cfg =  {
                    "scene": info.scene,
                    "role_pos": info.role_pos,
                    "enemy_pos":[info.enemy_pos]
                };
                let count_str = [total_count,monster_total.length];//怪物数量
                msg.count = count_str;

                end_time = (new Date()).getTime() + exp_fb_base["fight_time"]*1000;                
                msg.time = end_time;                
                msg.limitTime = exp_fb_base["fight_time"];                
                msg.type = "exp_mission";
                msg.enemy_fight = [monster_total.splice(0,total_count)];
               
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
                },300);
                globalSend("openExpFb",openExpFb);     
                fight(msg,(fightData)=>{
                    if (fightData.r === 1) {
                        if( monster_total.length && end_time > (new Date()).getTime()){  
                            return false;
                        }else{
                            logic.resultFight();
                            return true;
                        }
                    }else{
                        logic.resultFight();
                        return true;
                    }
                },()=>{
                    fightEnd = true;
                    clearInterval(refresh_timer);
                    refresh_timer = null;
                    openExpFb = false;
                    globalSend("openExpFb",false);
                },(msg)=>{
                    if(msg.type==="remove" && !fightEnd){
                        total_count--;
                        //当前已在刷新或未满足条件不刷新
                        if(refresh_timer || total_count > exp_fb_base["refresh_limit"]){
                            return;
                        }
                        //立即刷新一次
                        if(monster_total.length && total_count < exp_fb_map[map_id]["enemy_pos"].length){
                            logic.refresh(monster_total,count_str);
                        }
                        //刷新队列
                        refresh_timer = setInterval(()=>{
                            if(monster_total.length && total_count < exp_fb_map[map_id]["enemy_pos"].length && !fightEnd){
                                logic.refresh(monster_total,count_str);
                            }else{
                                clearInterval(refresh_timer);
                                refresh_timer = null;
                            }
                        },exp_fb_base["cd"]*1000)
                    }
                });
                forelet.paint(getData());                   
                updata("exp_fb.total_count",fb_data.count);                
            }
        })
    },
    //战斗结算
    closeFight: function (time) {
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
    getExp: function (str) {//str=>"id-level,id-level"
        let arg = {
            "param": {
                "monster_info":str
            },
            "type": "app/pve/exp_instance@award_exp"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data)
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                let _prop: any = Common.changeArrToJson(prop.award.slice(0));
                if(_prop.prop && _prop.prop.length > 0){
                    drop_list = _prop.prop;
                }
                if(drop_list.length !== 0){
                    UiFunTable.drop_outFun(drop_list,position.tp,position.fp,()=>{
                        drop_list = [];
                        position = null;
                    });
                }
                //经验条显示
                if(_prop && _prop.exp){
                    let exp = Common_m.calcExp(_prop.level,_prop.exp);
                    if(exp){
                        globalSend("showExp", [exp, str.split(",").length||1]);
                    }
                }
                let award = Common_m.mixAward(prop);
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
let oldLevel = 0;
listen("player.level", () => {
    let level = getDB("player.level");
    if(level > oldLevel){
        oldLevel = level;
        for(let key in exp_fb_mission){
            if(level >= exp_fb_mission[key].level && level < (exp_fb_mission[parseInt(key)+1] && exp_fb_mission[parseInt(key)+1].level)){
                curr_id = parseInt(key);
                break;
            }else if(level >= exp_fb_mission[key].level && !exp_fb_mission[parseInt(key)+1] ){
                curr_id = parseInt(key);
                break;
            }
        }
    }
});

//买了铂金卡刷新页面
listen("player.month_card_due_time", () => {
    forelet.paint(getData());
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

//买月卡时推送更新次数
net_message("exp_instance",(data)=>{
    updata("exp_fb.time",data.time);                
});
