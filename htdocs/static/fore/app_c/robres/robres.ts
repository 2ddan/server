import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert, checkTypeof, listen } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { fight } from "app_b/fight/fight";
import { Util } from "app/mod/util";
import { map_cfg } from "app/scene/plan_cfg/map";
import { closeBack } from "pi/ui/root";
import { sendGangChat } from "app_b/chat/chat";

//导入配置
import { funIsOpen } from "app_b/open_fun/open_fun";
import { robres_base } from "cfg/c/robres_base";
import { robres_reward } from "cfg/c/robres_reward";
import { robres_rank } from "cfg/c/robres_rank";
import { robres_global_rank } from "cfg/c/robres_global_rank";
import { arena_base } from "cfg/c/arena_base";


// =========================== 导出
export const forelet: any = new Forelet();

let page = 0,//水晶页卡
    gangInfo = null,//门派水晶列表
    fight_name = [],//[击败玩家,协助玩家(如无则是自己掠夺)]
    rank_index = 0,
    fighting = false,//战斗状态
    help_index = undefined,
    refresh_time = null,//刷新倒计时
    fight_gang_id = undefined,//被掠夺人工会id
    open_day = null,
    open_time = null,
    myGang = [];//我的门派

insert("robres", {});

/*接收全局广播*/
export const globalReceive: any = {
    //打开页面
    gotoRobres: () => {
        let gang_id = getDB("gang.data.gang_id");
        fight_gang_id = undefined;
        if (funIsOpen("robres")) {
            if(gang_id && isOpen()){
                let gang = getDB("gang.data");
                let player = getDB("player");
                myGang = [gang.gang_id,[gang.gang_name,gang.gang_level],[player.area_name,player.area]];
                logic.refresh(true);
                forelet.paint(getData());
                open("app_c-robres-robres");
                
            }else if(!gang_id){
                globalSend("screenTipFun", {
                    words: `请先加入门派`
                });
            }else{
                globalSend("funInfo", {
                    width: 320,
                    hieght: 100,
                    top: 502,
                    text: `<div class="shadow" style="color:#ffd8a6;text-align:center;width:300px;line-height:26px;"> 
                            <div>掠夺水晶开启时间为: </div>
                            <div>星期${open_day}</div>
                            <div>${open_time}</div>
                        </div>`
                });
            }
        }
    },
    exitFb: ()=>{ 
        if(fighting){
            fighting = false;
            logic.endFight(null,null);
        }
    },
    //聊天处跳转到帮助复仇界面
    robresHelpOther: ()=>{
        forelet.paint(getData());
        open("app_c-robres-help_other-help_other");
    }
}

export class robres extends Widget {
    //物品详情
    propInfoShow = (id) => {
        globalSend("showOtherInfo", id);
    }
    //排行榜tab切换
    changeColumns(msg){
        let index = msg.type_m == "area" ? 0 : 1;
        if(rank_index == index){
            return;
        }
        rank_index = index;
        forelet.paint(getData());
    }
    //退出
    goback = (arg) => {
        close(arg.widget);
    }
    //掠夺增加次数倒计时
    timeEnd(){
        logic.readAll();
        forelet.paint(getData());
    }
    //增加固定水晶倒计时
    timeEnd1(){
        let has = getDB("robres.own_total_forage") || 0;
        updata("robres.own_total_forage",has-0 + robres_base.spell_get_fixed_provender[1]);
        forelet.paint(getData());
    }
    //刷新据点倒计时
    timeEnd2(){
        refresh_time = null;
        forelet.paint(getData());
    }
    //资源排行
    gotoRank(){
        logic.readRank();
    }
    //查看成就
    gotoAchieve(){
        forelet.paint(getData());
        open("app_c-robres-achieve-achieve");
    }
    //成就领奖
    award(id){
        logic.award(id);
    }
    //我的资源
    gotoResource(){
        forelet.paint(getData());
        open("app_c-robres-my_source-my_source");
    }
    //去掠夺界面
    gotoGangPage(gang_id){
        page = 0;
        fight_gang_id = gang_id;
        logic.readGang(gang_id);
    }
    //掠夺
    gotoRob(id,count,name){
        if(!count){
            globalSend("screenTipFun", {
                words: `掠夺次数不足`
            });
            return;
        }
        let mid = getDB("player.role_id");
        if(id === mid){
            globalSend("screenTipFun", {
                words: `不能掠夺自己`
            });
            return;
        }
        let data = getDB("robres.plunder_info");
        if(data){
            for(let v of data){
                if(v[0] == id){
                    if(v[1] >= robres_base.most_beaten_times){
                        globalSend("screenTipFun", {
                            words: `他已经很可怜了，得饶人处且饶人吧`
                        });
                        return;
                    }
                    break;
                }
            }
        }
        if(fight_gang_id === update_data.myGang[0]){
            globalSend("popTip",{
                title:`是否掠夺${name}<span style="color:#f00">(同门派)</span>的水晶？`,
                btn_name:["掠 夺","取 消"],
                cb:[
                    //确认
                    ()=>{
                        logic.startFight(0,id,null,null);
                    },
                    //取消
                    ()=>{
                       
                    }
                ]
            })
            return;

        }
        logic.startFight(0,id,null,null);
    }
    //打开复仇弹窗
    openRevenge(data){
        logic.readPlunderFlow(data);
    }
    //复仇
    revenge(index){
        if(robres_base.init_revenge_times + update_data.info.revenge_buy_count - update_data.info.revenge_count <= 0){
            globalSend("screenTipFun", {
                words: `复仇次数不足`
            });
            return;
        }
        let w = forelet.getWidget("app_c-robres-my_source-my_source");
        w && close(w);
        let w1 = forelet.getWidget("app_c-robres-revenge_tips-revenge_tips");
        w1 && close(w1);
        let w2 = forelet.getWidget("app_c-robres-review-review");
        w2 && close(w2);

        logic.startFight(1,null,index,null);
    }
    //协助复仇
    helpRevenge(index,id,name,h_index,count){
        if(!count){
            globalSend("screenTipFun", {
                words: `协助次数不足`
            });
            return;
        }
        help_index = h_index;
        let w = forelet.getWidget("app_c-robres-my_source-my_source");
        w && close(w);
        let w1 = forelet.getWidget("app_c-robres-help_other-help_other");
        w1 && close(w1);
        logic.startFight(2,null,index,id,name);
    }
    //请求帮助
    getHelp(index){
        let diamond = getDB("player.diamond") || 0,
            buy_count = getDB("robres.seek_help_buy_count") || 0,
            cost = robres_base.seek_help_price[update_data.info.seek_help_buy_count] || robres_base.seek_help_price[robres_base.seek_help_price.length-1],         
            max = robres_base.can_buy_seek_help_times;
        //如果免费
        if(robres_base.seek_help_times - update_data.info.seek_help_count > 0 || !cost){
            logic.help(index);
            return;
        }
        //购买次数已用完
        if(buy_count >= max){
            globalSend("screenTipFun", {
                words: `求助次数已达上限`
            });
            return;
        }
        //元宝不足
        if(cost > diamond){
            globalSend("popTip",{
                title:"<div>元宝不足</div><div>是否前往充值</div>",
                btn_name:["充值","取消"],
                cb:[
                    //确认
                    ()=>{
                        globalSend("gotoRecharge"); 
                    },
                    //取消
                    ()=>{
                    
                    }
                ]
            })
            return;
        }
        //购买次数并发布
        globalSend("popTip",{
            title:`<div>是否花费${cost}元宝发布请求信息?</div>(本日剩余${robres_base.seek_help_times + max - update_data.info.seek_help_count}次)`,
            btn_name:["发 布","取 消"],
            cb:[
                //确认
                ()=>{
                    logic.buyCount(3,1,index);
                },
                //取消
                ()=>{
                    
                }
            ]
        })        
    }
    //刷新帮会
    refresh(){
        if(refresh_time){
            return;
        }
        logic.refresh();
    }
    //购买次数
    buyCount(type,count){    
        let diamond = getDB("player.diamond") || 0,
            info = getDB("robres"),
            cost = 0,
            buy_count = 0,
            max = 0,
            key;
        if(type === 0){
            buy_count = info.buy_count || 0;
            key = "buy_loot_price";
            max = robres_base.can_buy_loot_times;
        }else if(type === 1){
            buy_count = info.revenge_buy_count || 0;
            key = "buy_revenge_price";
            max = robres_base.can_buy_revenge_times;
        }else if(type === 2){
            buy_count = info.assist_buy_count || 0;
            key = "buy_help_price";
            max = robres_base.can_buy_help_times;
        }/*else{
            buy_count = info.seek_help_buy_count || 0;
            key = "seek_help_price";
            max = robres_base.can_buy_seek_help_times;
        }*/
        cost = robres_base[key][buy_count] || robres_base[key][robres_base[key].length -1];
        if(buy_count >= max){
            globalSend("screenTipFun", {
                words: "已达购买上限"
            });
            return;
        }
        if(cost > diamond){
            globalSend("popTip",{
                title:"<div>元宝不足</div><div>是否前往充值</div>",
                btn_name:["充值","取消"],
                cb:[
                    //确认
                    ()=>{
                        globalSend("gotoRecharge"); 
                    },
                    //取消
                    ()=>{
                       
                    }
                ]
            })
            return;
        }
        globalSend("popTip", {
            title: `<div>是否花费<span style='color:#ff9600'>${cost}</span>元宝购买一次${type == 0 ? "攻打" : type == 1 ? "复仇" : "协助" }次数</div>`,
            btn_name: ["确 定", "取 消"],
            cb: [
                //确认
                () => {
                    logic.buyCount(type,count);
                },
                () => { }
            ]
        })
        
    }
    //帮会水晶左右切换
    nextPage(arg){
        page += arg;
        forelet.paint(getData());
    }
    //协助伙伴
    helpOther(){
        forelet.paint(getData());
        open("app_c-robres-help_other-help_other");
    }
    //战况回顾
    review(){
        forelet.paint(getData());
        open("app_c-robres-review-review");
    }
}

//更新数据
let update_data:any = {
    "Pi": Pi,
    "menu":{
        "rank": ["资源排行","pic_ranking","gotoRank"],
        "achieve": ["成就","menu_achieve_icon","gotoAchieve","new_fun.robres.award"],
        "resource": ["我的资源","menu_shop_icon","gotoResource", "new_fun.robres.event"]
    },
    "robres_reward": robres_reward,
    "robres_base": robres_base,
    "robres_rank": robres_rank,
    "robres_global_rank": robres_global_rank

}
//数据更新
const getData = function () {
    update_data.player = getDB("player");
    update_data.page = page;
    update_data.rank_index = rank_index;
    update_data.refresh_time = refresh_time;
    update_data.info = getDB("robres");
    update_data.getCount = logic.getCount;
    update_data.checkTypeof = checkTypeof;
    update_data.gangInfo = gangInfo;
    update_data.myGang = myGang;
    update_data.Common = Common;
    update_data.getPropCount = logic.getPropCount;
    update_data.getEndTime = logic.getEndTime;
    update_data.getFixTime = logic.getFixTime;
    update_data.mySort = logic.mySort;
    return update_data ;
}

//活动是否开放
export const isOpen = function(){
    let arr = Util.arrDate(Util.serverTime());
    let min = arr[3] * 60 + arr[4];
    if(robres_base.open_day.indexOf(arr[6]+"") !== -1 && (min>=robres_base.open_time[0] && min < robres_base.open_time[1])){
        return true;
    }
    return false;           
}
//替换开放日期数字为汉字
const replaceOpenDay = function () {
    let day = ["一", "二", "三", "四", "五", "六", "日"]
    return robres_base.open_day.replace(/,/g,"、").replace(/\d/g, function (a, b) {
        return day[a];
    });
}
//计算活动开放时间
const openTime = function () {
    let t = robres_base.open_time;
    let arr = [];
    arr[0] = Math.floor(t[0]/60)+":" + (Math.floor(t[0]%60)<10 ? ("0" + Math.floor(t[0]%60)) : Math.floor(t[0]%60));
    arr[1] = Math.floor(t[1]/60)+":" + (Math.floor(t[1]%60)<10 ? ("0" + Math.floor(t[1]%60)) : Math.floor(t[1]%60));
    return arr.join("-");
}
open_day = replaceOpenDay();
open_time = openTime();

let logic = {
    //计算活动结束剩余时间
    getEndTime(){
        let now = Util.serverTime();
        let arr = Util.arrDate(now);
        return [now, now + (robres_base.open_time[1] - arr[3] * 60 + arr[4])*60*1000 - arr[5]*1000];
    },
    //计算[可掠夺剩余次数,下一次增加次数时间]
    getCount(){
        let now = Util.serverTime(true);
        let r = Math.floor((now - update_data.info.time)/(robres_base.loot_times_revert*60));
        let next = now + Math.ceil(robres_base.loot_times_revert * 60 - (now - update_data.info.time)%(robres_base.loot_times_revert*60));
        return [r,[now*1000,next*1000]] ;
    },
    //计算被掠夺次数和被掠夺数量
    getPropCount(){
        let data = getDB("robres.revenge_info_list");
        if(!data){
            return [0,0];
        }
        let count = 0;
        data.forEach((v) => {
            count += v[1][2];
        });
        return [data.length,count];
    },
    //计算获得获得固定水晶时间
    getFixTime(){
        let now = Util.serverTime();
        let arr = Util.arrDate(now);
        let s = arr[2]*60*60 + arr[3] * 60 + arr[4];
        let r = robres_base.spell_get_fixed_provender[0]*60 - s%(robres_base.spell_get_fixed_provender[0]*60);
        return [now,now + r *1000];
    },
    //成就排序
    mySort(){
        let arr = robres_reward.slice(0);
        let data = getDB("robres");
        arr.forEach((v,i)=>{
            if(data.award_record[i]){//已领
                v.get = 0;
            }else if(data.achieve_record[v.type] >= v.condition){//未领
                v.get = 2;
            }else{//未达成
                v.get = 1;
            }
        })
        return arr.sort((a,b)=>{
            if(a.get !== b.get){
                return b.get - a.get;
            }else{
                return a.id - b.id;
            }
        })
    },
    //读取数据
    readAll(){
        let arg = {
            "param": {},
            "type": "app/pve/take_food@read"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why)
            } else {
                let prop:any = Common.changeArrToJson(data.ok);
                if(checkTypeof(prop.achieve_record,"Array")){
                    prop.achieve_record = Common.changeArrToJson(prop.achieve_record);
                }
                updata("robres",prop);
                forelet.paint(getData());
            }
        })
    },
    //刷新
    refresh(first?){
        let arg = {
            "param": {},
            "type": "app/pve/take_food@refresh"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data);
            } else {

                //非第一次刷新需要走倒计时
                if(!first){
                    let now = Util.serverTime();
                    refresh_time = [now,now+5000];
                    globalSend("screenTipFun", {
                        words: `已刷新水晶据点`
                    });
                }
                let prop:any = Common.changeArrToJson(data.ok);
                updata("robres.match_info",prop.match_info);
                forelet.paint(getData());
            }
        })
    },
    /**
     * 读取工会争夺水晶详情
     * @param gang_id 门派ID
     * 
    */
    readGang(gang_id){
        let arg = {
            "param": {
                gang_id: gang_id
            },
            "type": "app/pve/take_food@read_match_detail"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let msg:any = Common.changeArrToJson(data.ok);
                gangInfo = msg.match_detail;
                if(!gangInfo){
                    globalSend("screenTipFun", {
                        words: `该门派暂无成员可掠夺,请掠夺其它门派`
                    });
                    return;
                }
                forelet.paint(getData());
                let w = forelet.getWidget("app_c-robres-rob-rob");
                !w && open("app_c-robres-rob-rob");
            }
        })
    },
    /**
     * 读取复仇可获得的流动粮草
     * @param id 复仇对象id
     * 
    */
    readPlunderFlow(msg){
        let arg = {
            "param": {
                id: msg[1][0]
            },
            "type": "app/pve/take_food@read_plunder_flow"
        };
        net_request(arg, function (data) {
            if (data.error) {
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let result:any = Common.changeArrToJson(data.ok);
                forelet.paint(getData());
                open("app_c-robres-revenge_tips-revenge_tips",{"data":msg,"flow":result.gain_flow_forage});
            }
        })
    },
    /**
     * 读取排行榜
     * @param 无
     * 
    */
    readRank(){
        let arg = {
            "param": {},
            "type": "app/pve/take_food@read_rank"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let msg:any = Common.changeArrToJson(data.ok);
                update_data.rank = msg;
                forelet.paint(getData());
                open("app_c-robres-rank-rank");
            }
        })
    },
    /**
     * 开始战斗
     * @param %通讯参数
		"type" 0 表示掠夺  rival_id 1000 掠夺人id
		"type" 1 表示复仇  index  表示复仇列表id
		"type" 2 表示协助  index 表示 协助列表中的id assist_id 表示求助者id
     * 
    */
    startFight(type,rival_id,index,assist_id,name?){
        let arg = {
            "param": {
                type:type
            },
            "type": "app/pve/take_food@start_fight"
        };
        if(rival_id){//掠夺
            arg.param["rival_id"] = rival_id;
        }else if(assist_id){//协助
            arg.param["index"] = index;
            arg.param["assist_id"] = assist_id;
        }else{//复仇
            arg.param["index"] = index;
        }
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                fighting = true;
                let fightData: any = Common.changeArrToJson(data.ok);
                if(fightData.achieve_record){
                    updata("robres.achieve_record", Common.changeArrToJson(fightData.achieve_record));
                }
                if(fightData.time){
                    updata("robres.time", fightData.time);
                }
                if(fightData.revenge_count){
                    updata("robres.revenge_count", fightData.revenge_count);
                }
                if(fightData.assist_count){
                    updata("robres.assist_count", fightData.assist_count);
                }
                fight_name = [Common.fromCharCode(fightData.enemy_fight[0][4][1][4][1])]
                if(name){
                    fight_name.push(name);
                }
                fightData.type = "robres";
                fightData.cfg = arena_base;
                fightData.cfg.scene = map_cfg["arena"];
                fight(fightData, function (r) {
                    fighting = false;
                    logic.endFight(type,r);
                    return true;
                });
            }
        })
    },
    /**
     * 结束战斗
     * @param %通讯参数 无
     * 
    */
    endFight(type,result){
        let arg = {
            "param": {},
            "type": "app/pve/take_food@end_fight"
        };
        if(result){
            arg.param = {
                own: JSON.stringify(result.fighters.own),
                enemy: JSON.stringify(result.fighters.enemy)
            }
        }
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                //手动退出结算
                if(!result){
                    return;
                }
                let r: any = Common.changeArrToJson(data.ok);

                /**********打输了***********/
                if(result.r !== 1){
                    Common_m.openAccount(r, "robres", {});
                    forelet.paint(getData());
                    return;
                }

                /**********打赢了***********/

                //协助记录
                if(r.assist_record){
                    updata("robres.assist_record", r.assist_record);
                }
                //更新掠夺对象被掠夺次数记录 
                if(type == 0 ){
                    let sid = result.fighters.enemy[0].sid;
                    logic.updatePlunderInfo(sid);
                }               
                
                //更新复仇记录
                if(r.revenge_info){
                    let list = getDB("robres.revenge_info_list");
                    list.splice((r.revenge_info[0]-1),1,r.revenge_info);
                    updata("robres.revenge_info_list",list);
                    updata("robres.revenge_record", r.revenge_record);
                }
                //更新帮助复仇记录
                if(help_index !== undefined){
                    let list = getDB("robres.gang_assist_list");
                    list.splice(help_index,1)
                    updata("robres.gang_assist_list", list);
                    help_index = undefined;
                }
                //更新成就具体值
                if(r.achieve_record){
                    updata("robres.achieve_record", Common.changeArrToJson(r.achieve_record));
                }
                //更新自己水晶记录
                if(type !== 2){
                    let total = getDB("robres.own_total_forage") || 0;
                    updata("robres.own_total_forage",total + (r.fix_forage || 0) + (r.plunder_forage || 0));
                }
               
                let award = Common_m.mixAward(r);
                award.fix_forage = r.fix_forage;
                award.plunder_forage = r.plunder_forage;
                award.role_name = fight_name;
                Common_m.openAccount(result, "robres", award,"none");
                forelet.paint(getData());

            }
        })
    },
    //更新掠夺记录列表及刷新被掠夺者下次可掠夺数量
    updatePlunderInfo(id){

        //本地手动减少
        // for(let v of update_data.gangInfo){
        //     if(id == v[0]){
        //         v[1] = Math.floor((v[1]/0.1 - v[1])*0.1);
        //         break;
        //     }
        // }
        //直接读取服务器数据
        fight_gang_id && logic.readGang(fight_gang_id);

        let plunder_info = getDB("robres.plunder_info") || [];
        let bol = plunder_info.join("-").indexOf(id+"") !== -1;
        if(!bol){
            plunder_info.push([id,1]);
        }else{
            for(let v of plunder_info){
                if(v[0] === id){
                    v[1]++;
                    break;
                }
            }
        }
        updata("robres.plunder_info",plunder_info);
    },
    /**
     * 求助
     * @param %通讯参数 无
     * 
    */
    help(index){
        let arg = {
            "param": {
                index:index
            },
            "type": "app/pve/take_food@help"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                }); 
                return;
            } else {
                sendGangChat(["app_c-robres-chat","","robresHelpOther"]);
                let result: any = Common.changeArrToJson(data.ok);
                if(result.seek_help_count){
                    updata("robres.seek_help_count", result.seek_help_count);
                }
                if(result.revenge_info){
                    updata("robres.revenge_info_list."+(result.revenge_info[0]-1), result.revenge_info);
                }
                forelet.paint(getData());
            }
        })
    },
    /**
     * 成就领奖
     * @param %通讯参数 id
     * 
    */
   award(id){
        let arg = {
            "param": {
                id:id
            },
            "type": "app/pve/take_food@award"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let prop:any = Common.changeArrToJson(data.ok);
                updata("robres.award_record", prop.award_record);
                let result = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result1) {
                        result1.open();
                    }
                });
                forelet.paint(getData());
            }
        })
    },
    /**
     * 购买次数
     * @param %通讯参数 
     * type : 0 掠夺次数 1 复仇次数  2 帮助次数 3 求助次数 
     * count": 购买次数 1
     * 
    */
   buyCount(type,count,index?){
        let arg = {
            "param": {
                type: type,
                count: count
            },
            "type": "app/pve/take_food@buy"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", {
                    words: `${data.why}`
                });
                return;
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                //扣除花费
                Common_m.deductfrom(prop);
                if(prop.revenge_buy_count){
                    updata("robres.revenge_buy_count", prop.revenge_buy_count);
                }
                if(prop.buy_count){
                    updata("robres.buy_count", prop.buy_count);
                }
                if(prop.time){
                    updata("robres.time", prop.time);
                }
                if(prop.assist_buy_count){
                    updata("robres.assist_buy_count", prop.assist_buy_count);
                }
                if(prop.seek_help_buy_count){
                    updata("robres.seek_help_buy_count", prop.seek_help_buy_count);
                }
                forelet.paint(getData());
                if(type === 3){
                    logic.help(index);
                }
            }
        })
    },
    //协助列表中过滤掉 ：1.目标是自己,2.求助人是自己,3.已完成的求助
    filterAssist(data){
        let arr = [];
        let role_id = getDB("player.role_id");
        data.forEach((v)=>{
            if(v[0][1] == role_id){
                return;
            }else if(v[1][0] == role_id){
                return;
            }else if(!!v[1][4]){
                return;
            }else{
                arr.push(v);
            }
        });
        return arr;
    }
}

//开放活动推送
net_message("rores_open",()=>{
   logic.readAll();
})
//被掠夺推送
net_message("robres_add_revenge",(data)=>{
    let a = getDB("robres.revenge_info_list") || [];
    a[data.revenge_info[0]-1] = data.revenge_info;
    updata("robres.revenge_info_list",a);

})
//复仇列表改变推送
net_message("robres_refresh_revenge",(data)=>{
    updata("robres.revenge_info_list."+(data.revenge_info[0]-1), data.revenge_info);
    let revenge_record = getDB("robres.revenge_record");
    updata("robres.revenge_record", [revenge_record[0]+1,revenge_record[1] + data.revenge_info[1][2]]);
})
//别人请求帮助推送
net_message("robres_help_list_add",(data)=>{

    let list = logic.filterAssist([data.refresh_help_info]);
    if(list.length){
        let a = getDB("robres.gang_assist_list") || [];
        a.push(data.refresh_help_info);
        updata("robres.gang_assist_list", a);
    }
})
//刷新帮助列表推送
net_message("robres_help_list_refresh",(data)=>{
    let list = data.refresh_help_info;
    let a = getDB("robres.gang_assist_list");
    if(!a){
        return;
    }
    for(let i = 0,len = a.length;i<len;i++){
        if(a[i][0][0] === list[0][0] && list[1][4] && list[1][4]!==1){
            a.splice(i,1);
            updata("robres.gang_assist_list", a);
            return;
        }
    }
})

//监听加入门派
listen("gang.data.gang_id",()=>{
    let gang_id = getDB("gang.data.gang_id");
    if(gang_id){
        logic.readAll();
        forelet.paint(getData());
    }else{
        let w = forelet.getWidget("app_c-robres-robres");
        if(w){
            closeBack();
        }
    }
})


//读取基础数据
listenBack("app/pve/take_food@read",(data)=>{
    updata("robres",data);

    //过滤援助列表无用的部分。
    let old = getDB("robres.gang_assist_list");
    if(!old){
        return;
    }
    let list = logic.filterAssist(old);
    updata("robres.gang_assist_list",list.length ? list : "");
})

//robres_help_list_refresh 刷新帮助列表

//robres_add_revenge

//robres_refresh_revenge

//robres_help_list_add

//area_forage_rank_detail

//dominate_forage_rank_detail
