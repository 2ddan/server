//pi
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";

import { open, close } from "app/mod/root";
import { get as getDB} from "app/mod/db";
import { Pi } from "app/mod/pi";
import { handScene} from "app_b/fight_ol/handscene";
import { SMgr } from "app_b/fight_ol/same";

//===============================================导出
export const forelet = new Forelet();

export const globalReceive: any = {
    gotoPkResult:(msg)=>{
        forelet.paint(getData());
        open("app_b-wild_pk-result",msg);
        let timer =setTimeout(()=>{
            let w = forelet.getWidget("app_b-wild_pk-result");
            w && close(w);
            clearTimeout(timer);
            timer = null;
        })
    }
}

let state = false;//列表展开状态
let fight_mapId = 0;//正在pk的角色mapId
let type = 1;//PK模式
export class wild_pk extends Widget {
    //是否展开pk列表
    changeState(){
        state = !state;
        forelet.paint(getData());
        // open("app_b-wild_pk-result",[700001,700002]);
    }
    //展开改变PK模式弹窗
    openTypeTips(){
        // open()
    }
    //改变pk模式
    changeType(arg){
        if(type == arg){
            return;
        }
        type = arg;
        forelet.paint(getData());
    }
    //去杀人
    gotoFight(map_id){
        if(fight_mapId == map_id){
            return;
        }
        fight_mapId = map_id;
        SMgr.fight(map_id);
    }
}

const getData = function(){
    let data:any = {};
    data.state = state;
    if(state){
        data.role_list = getRobot();
    }
    data.Pi = Pi;
    return data;
}


//获取当前地图的机器人
const getRobot = function(){
    let role_id = getDB("player.role_id");
    let data = handScene.mapList;
    let arr = [];
    for(var key in data){
        let f = data[key];
        if(f.type === "fighter" && f.hp>0 && f.sid !== role_id){
            arr.push(f);
        }
    }
    return arr;
}
