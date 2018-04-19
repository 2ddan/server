import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { net_request, net_message } from "app_a/connect/main";
import { Pi, globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { updata, get, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { sevendays_list } from "cfg/c/sevendays_act";
import { listenBack } from "app/mod/db_back";

import { TipFun } from "app/mod/tip_fun";

import { sevenday_title } from "cfg/c/sevenday_title";
import { act_progress } from "app_b/mod/act_progress";


export const forelet = new Forelet();
let currDay,//当前选择的天数
    roleDay,//玩家注册天数
    loginDay,//登录天数
    curr,//选中的navtab
    loginSelect,//选中的登录领奖
    record;//领奖记录
 
//================================================导出
export const globalReceive: any = {
    gotoSevendaysAct: (msg) => {
        loginDay = get("sevendays.loginDay");
        currDay = roleDay;
        if (currDay > 7) {
            globalSend("screenTipFun", {
                words: "七日狂欢已结束！！"
            });
            return;
        }
        curr = 0;
        sevendays.updata();
        open("app_c-sevendays-sevendays");
        globalSend("openNewFun", "sevendays");
    },
    // toLoginAward : () =>{
    //     loginDay = get("sevendays.loginDay");
    //     if (currDay > 7) {
    //         globalSend("screenTipFun", {
    //             words: "七日狂欢已结束！！"
    //         });
    //         return;
    //     }
    //     currDay = roleDay;
    //     curr = 0;
    //     sevendays.updata();
    //     toLoginAward();
    // }
}

// const toLoginAward = function(){
//     loginSelect = getCurrLogin();
//     sevendays.updata();
//     open("app_c-activity-sevendays-login");
// }

export class sevendays_w extends Widget {
    // toLoginAward = () => {
    //     toLoginAward();
    // }
    goback = (arg) => {
        let w = forelet.getWidget("app_c-activity-sevendays-sevendays");
        if(w)
            close(w);
    }
    changeDay = (clickDay) => {
        if (currDay == clickDay || clickDay > roleDay + 1) return;
        currDay = clickDay;
        curr = 0;
        sevendays.updata();
    }
    changeLogin = (sid,currLogin)=>{
        loginSelect = currLogin;
        sevendays.updata();
        this.propInfoShow(sid);
    }
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
    getAward = (act) => {
        if(act.type == "discount_buy"){
            if( roleDay > act.start_time){
                globalSend("screenTipFun",{words:"活动已结束！"});
                return;
            }else if(act.params > get("player.diamond") ){
                globalSend("popTip",{
                    title:"<div>元宝不足</div><div>是否前往充值?</div>",
                    btn_name:["充 值","取消"],
                    cb:[
                        ()=>{
                            globalSend("gotoRecharge"); 
                        },
                        ()=>{}
                    ]
                })
                return;
            }
        }
        sevendays.award(act);
    }
    goto = (arg) => {
        globalSend(arg);
    }
    navchange = (e) => {
        curr = e.cmd;
    }
}

const creatSevendaysAct = () => {
    let module: any = {};
    module.getData = () => {
        let data: any = {};
        data.loginDay = loginDay;
        data.currDay = currDay;
        data.roleDay = roleDay;
        data.curr = curr;
        data.loginSelect = loginSelect;
        data.list = sevendays_list;
        data.record = record;
        data.clearFun = isClear;
        data.mySort = module.mySort; 
        data.sevenday_title = sevenday_title;
        return data;
    }
    /**
     * 读取玩家活动数据
     */
    module.read = (result) => {
        roleDay = result.now_day;
        record = Common.changeArrToJson(result.record) || {};
        let sevendays = {
            "record": record,
            "loginDay": result.login_day,
            "nowDay": result.now_day,
        }
        //TipFun.init(getTipsList());
        updata("sevendays", sevendays);
        
    }
    /**
     * 排序
     */
    module.mySort = (a, b) => {
        let f1 = record[a.act_id] || 0;
        let f2 = record[b.act_id] || 0;
        let f3 = act_progress.sevenday(a.type,a.params)[0];
        let f4 = act_progress.sevenday(b.type,b.params)[0];
        if(f1 !== f2){return f1-f2}
        if(f3 !== f4) return f4-f3;
        return a.act_id - b.act_id
    }
    /**
     * 领奖
     */
    module.award = (act) => {
        let msg = { "param": { id: act.act_id }, "type": "app/activity/7day@award" };
        net_request(msg, (data) => {
            if (data.error) {
                // if (data.error) Common.backThrow(data.why, tips_back, screenTipFun);
                // if (data.reason) Common.backThrow(data.reason, tips_back, screenTipFun);
                globalSend("screenTipFun", { words: `背包已满` })
                console.log(data.why);
            } else if (data.ok) {
                let prop: any = Common.changeArrToJson(data.ok);
                if (prop.cost)
                    Common_m.deductfrom(prop);
                record[act.act_id] = 1;
                updata("sevendays.record", record);
                let result: any = Common_m.mixAward(prop);
                prop.auto = 1;
                globalSend("showNewRes", {
                    result, function (result) {
                        result.open();
                    }
                })
                loginSelect = getCurrLogin();
                module.updata();
            }
        })
    }
    module.updata = () => {
        forelet.paint(module.getData());
    }
    return module;
}

/**
 * 计算该日目标是否完成
 * @param arg 需要判断的那一天
 */
const isClear = (arg) => {
    if (loginDay < arg) return 0;
    let level = sevendays_list[2];
    let task = sevendays_list[3];

    if (!record[level[arg][0].type + "," + level[arg][0].params]) return 0;
    for (var i in task[arg]) {
        if (!record[task[arg][i].type + "," + task[arg][i].params]) return 0;
    }
    return 1;
}

/**
 * 获取第一个可领取的登录奖励的天数
 */
const getCurrLogin = () => {
    for(let i = 1;i <= loginDay;i++){
        if(!record["login,"+i]) return i - 1;
    }
    return loginDay - 1;
}

//====================================立即执行

//监听活动推送广播消息
net_message("activity", (msg) => {
    if (msg) {
        sevendays.updata();
    }
})

const sevendays = creatSevendaysAct();
insert("sevendays",{});
listenBack("app/activity/7day@read", (data) => {
    sevendays.read(data);
})

