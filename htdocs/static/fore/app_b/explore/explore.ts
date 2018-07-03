//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";

//app
import { get as getDB} from "app/mod/db";
import { globalSend} from "app/mod/pi";
import { open, close } from "app/mod/root";
import { function_open } from "cfg/b/function_open";
import { menu_explore } from "cfg/b/menu_explore";
import { wild_mission } from "fight/b/common/wild_mission_cfg";


// =========================== 导出
export const forelet: any = new Forelet();

export class menu_m extends Widget {
    gotoExplores = function (arg) {
        // globalSend("screenTipFun", {
        //     words: `暂未开放`
        // });
        let lineFlag = getDB("publicboss.lineFlag");
        if(arg !== "gotoPublicBoss" && lineFlag){
            globalSend("publicBossLine",arg);
        }else{
          globalSend(arg);            
        }
    };
    //退出
    goback = (arg) => {
        close(arg.widget);
    }
}
let fun_open_min = null;
export const globalReceive: any = {
    gotoExplore: () => {
        let open_fun_id = getDB('open_fun.id');
        let data = {
            'function_open': function_open,
            'open_fun_id':open_fun_id
        }
        
        if (data.open_fun_id == 'undefined') {
            globalSend("screenTipFun", {
                words: `数据还在加载`
            });
            return;
        }
        fun_open_min = function_open["public_boss"];
        if (fun_open_min.id > open_fun_id) {
            let guard_name = wild_mission[fun_open_min.stage_id].guard_name.split(",");
            globalSend("screenTipFun", {
                words: `通过${guard_name[1]} ${guard_name[0]}开放`
            });
            return;
        }
        open("app_b-explore-explore", data);
    }
}
