
/**
 * 野外采集功能
 */
import { Forelet } from "pi/widget/forelet";
import { net_message } from "app_a/connect/main";
import { getPage } from "app_b/playermission/playermission";
import { SMgr } from "app_b/fight_ol/same";
import {  mgr } from "app/scene/scene";
import { updata, get as getDB } from "app/mod/db";
import { net_request } from "app_a/connect/main";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { globalSend } from "app/mod/pi";
import { guild_collect } from "cfg/c/guild_collect";
import { wild_map } from "fight/b/common/wild_map_cfg";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { getGlobal } from "pi/widget/frame_mgr";


/**
 * 创建 forelet 并导出
 */
export let forelet = new Forelet();
let frame_mgr = getGlobal();
let clearTimer = null;
let process_num = 0;//进度条数字
let target = [];//采集物坐标
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
    if(clearTimer){
        clearTimeout(clearTimer);
        clearTimer = null;
    }
    clearTimer = setTimeout(()=>{
        clearTimeout(clearTimer);
        clearTimer = null;
        clearCollect();
    },30000);
}

//清除场景采集物
let clearCollect = function () {
    if(clearTimer){
        frame_mgr.clearPermanent(moveEnd);
        clearTimeout(clearTimer);
        clearTimer = null;
    }
    if (!node_list["collect"]) { return; }
    mgr.remove(node_list["collect"]);
    delete node_list["collect"];
}

//采集物进度条
let collectBar = function (callBack) {
    updata("open_box",true);
    let time = new Date().getTime();
    barChange(callBack,time);
    // let timer = setInterval(function () {
    //     updata("open_box",true);
    //     process_num += 4;
    //     forelet.paint(getData());
    //     if (process_num >= 100) {
    //         clearInterval(timer);
    //         timer = null;
    //         callBack();
    //     }
    // }, 80);
}
let barChange = function(callBack,time){
    process_num = Math.floor((new Date().getTime() - time)/2000*100);
    forelet.paint(getData());
    if (process_num >= 100) {
        callBack();
    }else{
        frame_mgr.setAfter(()=>{
            barChange(callBack,time);
        })
    }
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
            clearCollect();
            process_num = 0;
            updata("open_box",false);
            forelet.paint(getData());

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
            let count = collect_info[1];
            let max_count = guild_collect[level].count;
            if (max_count) {
                if ((count + 1) >= max_count) {
                    level++;
                    count = 0;
                } else {
                    count++;
                }
                updata("gang.gangExpandData.collect_info", [level, count]);
            }
        }
        
        let timer = setTimeout(() => {
            SMgr.change_ai(true);
            clearTimeout(timer);
            timer = null;
        }, 1000)
    })

}

/**
 * 后台捐献【野外采集】
 **/
let node_list: any = {};//采集物
net_message("gang_collect", (msg) => {
    if (getPage() !== "app_b-wild-wild") {
        collect();
        return;
    }
    if(node_list["collect"]){
        frame_mgr.clearPermanent(moveEnd);
        clearCollect();
        clearTimeout(clearTimer);
        clearTimer = null;
    }
    createCollect();
    let me = SMgr.getSelf();
    forbid = true;
    forelet.paint(getData());

    //防止不去采集，5s后解除锁定
    let timer = setTimeout(()=>{
        clearTimeout(timer);
        timer = null;
        if(forbid){
            forbid = false;
            forelet.paint(getData());
        }
    },5000);


    //跑到采集点
    SMgr.change_ai(false);
    SMgr.move({x:target[0],y:target[1]});
    frame_mgr.setPermanent(moveEnd);
});
//判断是否到达采集物
let moveEnd = ()=>{
    let f = SMgr.getSelf();
    if(node_list["collect"] && f && !f.moving && !process_num){
        if(Math.sqrt( Math.pow(f.x - target[0],2) + Math.pow(f.y - target[1],2) )<4 ){
            frame_mgr.clearPermanent(moveEnd);
            forbid = false;
            forelet.paint(getData());
            globalSend("resetTimer");
            //采集
            SMgr.change_ai(false);
            collectBar(collect);
        }
    }
}