//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";

//app
import {  get as getDB} from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { function_open } from "cfg/b/function_open";
import { menu_discover } from "cfg/b/menu_discover";
import { wild_mission } from "fight/b/common/wild_mission_cfg";


// =========================== 导出
export const forelet: any = new Forelet();

export class menu_m extends Widget {
    gotoExplores = function (arg) {
        // if(arg == "gotoExpFB"){
        //     arg = "gotoPublicBoss"
        // }
        // let lineFlag = getDB("publicboss.lineFlag");
        // if(arg !== "gotoPublicBoss" && lineFlag){
        //     globalSend("publicBossLine",arg);
        // }else{
            globalSend(arg);
        // }
    };
    //退出
    goback = (arg) => {
        close(arg.widget);
    }
}
let fun_open_min = null;
export const globalReceive: any = {
    gotoFb: () => {
        let open_fun_id = getDB('open_fun.id');
        if (!fun_open_min) {
            // let menu = menu_discover.slice(0).sort(function(a,b){
            //     return function_open[a.fun_key]["stage_id"] - function_open[b.fun_key]["stage_id"];
            // })
            // fun_open_min = function_open[menu[0].fun_key]
            fun_open_min = function_open["exp_fb"]
        }
        if (fun_open_min.id > open_fun_id) {
            let guard_name = wild_mission[fun_open_min.stage_id].guard_name.split(",");
            globalSend("screenTipFun", {
                words: `通过${guard_name[1]} ${guard_name[0]}开放`
            });
            return;
        }
        let data = {
            'function_open': function_open,
            'open_fun_id':open_fun_id
        }
        if (data.open_fun_id == 'undefined') {
            globalSend("screenTip", {
                words: `数据还在加载`
            });
            return;
        }
        open("app_b-fb-fb", data);
    }
}
