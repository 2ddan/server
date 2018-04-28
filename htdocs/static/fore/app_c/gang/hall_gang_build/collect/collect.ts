
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

/**
 * 创建 forelet 并导出
 */
export let forelet = new Forelet();
export let process_num = 0;//进度条数字

export const globalReceive: any = {
    leavewild: () => {
        if (process_num) {
            collect();
        }
    }
}

let getData = function(){
    let data:any = {};
    data.process = process_num;
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
 let createCollect = function(){
    if(node_list["collect"]){
         mgr.remove(node_list["collect"]);
     }
     if(getPage()!=="app_b-wild-wild"){
         return;
     }
     node_list["collect"] = {
         "effect": "model_dl_baoxiang",
         "x":fighterPosition[0],
         "y":fighterPosition[1],
         "z":fighterPosition[2],
         "scale":1,
         "isOnce":true
     };
     mgr.create(node_list["collect"],"effect");
 }

//清除场景采集物
let clearCollect = function(){
    if(!node_list["collect"]){return;}
    mgr.remove(node_list["collect"]);
    delete node_list["collect"];
}

//采集物进度条
let collectBar = function(callBack){
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
let collect = function(){
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
        }
        clearCollect();
        process_num = 0;
        forelet.paint(getData());
        let timer = setTimeout(()=>{
            change_status(0);
            clearTimeout(timer);
            timer = null;
        },2000)
    })
    
}

//后台捐献【野外采集】
let fighterPosition = [];//角色当前位置，随机后为采集物出现的位置
let node_list:any = {};//采集物
net_message("gang_collect", (msg) => {
    if(getPage()!=="app_b-wild-wild"){
        collect();
        return;
    }
    let role_id = getDB("player.role_id");
    for(let i in mapList){
        if(mapList[i].sid == role_id){
            fighterPosition = [mapList[i].x,mapList[i].y,mapList[i].z];
            break;
        }
    }
    // fighterPosition[0] += randomPosition(5);
    // fighterPosition[1] += randomPosition(5);
    createCollect();
    change_status(1,()=>{
        //采集
        collectBar(collect);
    });
});