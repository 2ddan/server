
/**
 * 野外采集功能
 */
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_message } from "app_a/connect/main";
import { getPage } from "app_b/playermission/playermission";
import { mapList, change_status, olFightOrder } from "app_b/fight_ol/handscene";
import { mgr_data, mgr } from "app/scene/scene";
import { insert, updata, get as getDB, checkTypeof } from "app/mod/db";
import { net_request } from "app_a/connect/main";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { globalSend, Pi } from "app/mod/pi";
import { guild_collect } from "cfg/c/guild_collect";
import { wild_map } from "fight/b/common/wild_map_cfg";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { getFighter, Move} from "app/scene/move";
import { getGlobal } from "pi/widget/frame_mgr";


/**
 * 创建 forelet 并导出
 */
export let forelet = new Forelet();
let frame_mgr = getGlobal();

export let process_num = 0;//进度条数字
let target = [];//采集物坐标
let map_id = null;//角色map_id
let forbid = false;//是否禁止操作
export const globalReceive: any = {
    leavewild: () => {
        if (process_num) {
            collect();
        }
    }
}

let getData = function () {
    let data: any = {};
    data.process = process_num;
    data.forbid = forbid;
    return data;
}
//随机一个位置
// const randomPosition = function(num){
//     num = num || 1;
//     let a = Math.random() * num;
//     let b = 1;
//     if(a<num/2){b = -1}
//     return a * b;
// }

//创建采集物
let createCollect = function () {
    if (node_list["collect"]) {
        mgr.remove(node_list["collect"]);
    }
    if (getPage() !== "app_b-wild-wild") {
        return;
    }
    let guard = getDB("wild.wild_history");
    if(!guard){return;}
    let collect_info = getDB("gang.gangExpandData.collect_info");

    //采集技能等级
    let level = collect_info && collect_info[0] || 1;
    let quality = guild_collect[level].collect_lv[Math.floor(Math.random()*guild_collect[level].collect_lv.length)];
    //采集物坐标组
    let arr = wild_map[wild_mission[guard].map_id].collect;
    let index = Math.floor(Math.random()*arr.length);
    target = arr[index];
    node_list["collect"] = {
        "effect": "model_cjw0"+quality,
        "x": target[0],
        "y": target[1],
        "z": 0,
        "scale": 1,
        "isOnce": true
    };
    mgr.create(node_list["collect"], "effect");
}

//清除场景采集物
let clearCollect = function () {
    if (!node_list["collect"]) { return; }
    mgr.remove(node_list["collect"]);
    delete node_list["collect"];
}

//采集物进度条
let collectBar = function (callBack) {
    let timer = setInterval(function () {
        process_num += 1;
        forelet.paint(getData());
        if (process_num >= 100) {
            clearInterval(timer);
            timer = null;
            callBack();
        }
    }, 20);
}

//采集领奖
let collect = function () {
    let arg = {
        "param": {},
        "type": "app/gang/expand@collect_award"
    };
    net_request(arg, function (data) {
        if (data.error) {
            console.log(data);
        } else {
            let prop: any = Common.changeArrToJson(data.ok);
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes", {
                result, function(result1) {
                    result1.open();
                }
            });
            //更新采集次数和等级
            let collect_info = getDB("gang.gangExpandData.collect_info");
            let level = collect_info[0];
            let count = collect_info[1]
            if ((count + 1) >= guild_collect[level]) {
                level++;
                count = 0;
            } else {
                count++;
            }
            updata("gang.gangExpandData.collect_info", [level, count]);
        }
        clearCollect();
        process_num = 0;
        forbid = false;
        forelet.paint(getData());
        let timer = setTimeout(() => {
            change_status(0);
            clearTimeout(timer);
            timer = null;
        }, 2000)
    })

}

/**
 * 后台捐献【野外采集】
 **/
let fighterPosition = [];//角色当前位置，随机后为采集物出现的位置
let node_list: any = {};//采集物
net_message("gang_collect", (msg) => {
    if (getPage() !== "app_b-wild-wild") {
        collect();
        return;
    }
    createCollect();
    let role_id = getDB("player.role_id");
    for(let i in mapList){
        if(mapList[i].sid == role_id){
            map_id = mapList[i].mapId; 
            break;
        }
    }

    let result = {
        data:[target[0],0,target[1]],
        id:-1001,
        type:"terrain",
    };
    //跑到采集点
    change_status(1,()=>{
        forbid = true;
        forelet.paint(getData());
        olFightOrder({ "type": "wild", "result": JSON.stringify(result) });
    });
    frame_mgr.setPermanent(moveEnd);

});
//判断是否到达采集物
let moveEnd = ()=>{
    if(node_list["collect"] && !Move.isMove(map_id) && !process_num){
        let f = getFighter(map_id);
        if(Math.abs(f.x - target[0]) <= 0.5 && Math.abs(f.y - target[1]) <= 0.5 ){
            //清除定时器
            frame_mgr.clearPermanent(moveEnd);
            //重置长时间不动会自动打怪的间隔时间
            globalSend("fightRandomBoss");
            //采集
            change_status(1, () => {
                collectBar(collect);
            });
            
        }
    }
}