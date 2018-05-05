import { Common } from "app/mod/common";
import { Forelet } from "pi/widget/forelet";
import { open, close,closeAll} from "app/mod/root";
import { Widget } from "pi/widget/widget";
import { Pi, globalSend } from "app/mod/pi";
import { item_getWay } from "cfg/b/item_getWay";
import { updata, get as getDB,get } from "app/mod/db";

import { isOpen } from "app_c/activity/activity";
import { config_shortcut } from "cfg/c/config_shortcut";

export const forelet = new Forelet();

var sid = null;
const getData = function (sid) {
    let data: any = {};
    data.Pi = Pi;
    let _p = "bag*sid="+sid;
    let bag = get(_p).pop();
    data.count = bag ? bag.count : 0;
    data.dropData = handle(sid);
    data.player = getDB("player");
    // data.mission = localDB.mission;
    // data.instance = localDB.instance;
    // data.fun = isOpen;
    // data.fest_fun = fest_fun;
    return data;
}
//传送过来物品sid处理
const handle = function (sid) {
    let arr = Pi.sample[sid].drop_location;
    let list:any = {};
    if(!arr || !arr.length){
        return false;
    }
    for(var i = 0,len = arr.length;i<len ;i++ ){
        for(var key in  item_getWay){
            if(arr[i][0] == key){
                list[key] = item_getWay[key];
                break;
            }
        }
    }
    return list;
}
/*************************前台点击事件**********************************/
//副本
var goback = function () {
    let w = forelet.getWidget("app_c-get_way-get_way")
    if(w) close(w);
};
/*************************接收外部事件**********************************/
export const globalReceive: any = {
    gotoGetWay: (msg) => {
        forelet.paint(getData(msg));
        open("app_c-get_way-get_way",msg);
    },
    gotoMonthCardWay : (name)=>{
        let desc = config_shortcut[name].desc
        open("app_c-get_way-month_card_way", {"desc": desc});
    }
}

export class get_way extends Widget {
    goback = () => {
        goback();
    }
    gotoFun = function (obj) {
        let arr = obj.activity;
        if(arr){
            for(let i=0,len=arr.length;i<len;i++){
                if(isOpen(arr[i])){
                    goback();
                    globalSend(obj.fun);
                    return;
                }
            }
            globalSend("screenTipFun", { words: `${obj.name}未开放…`});
            return;
        }
        goback();
        let fun_arr = obj.fun.split(",");
        globalSend(fun_arr[0],fun_arr[1]);
    };
    gotoCard = function (){
        let w = forelet.getWidget("app_c-get_way-month_card_way")
        if(w) close(w);
        globalSend("gotoCard");
        globalSend("close_reclaim");
    }
}

