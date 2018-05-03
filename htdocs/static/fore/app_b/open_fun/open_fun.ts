/**
 * 导入模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Common } from "app/mod/common";
import { updata, listen, get as getDB, insert } from "app/mod/db";
import { listenBack } from "app/mod/db_back";
import { Pi, globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { getPage, is_guide } from "app_a/guide/guide";
/**
 * 导入配置
 */
import { function_guid } from "cfg/b/function_guid";
import { function_open } from "cfg/b/function_open";
import { skill_describe } from "cfg/b/skill_describe";
import { guide_cfg } from "cfg/b/guide_cfg";
import { wild_boss } from "fight/b/common/wild_boss_cfg";
import { wild_mission } from "fight/b/common/wild_mission_cfg";
import { publicboss_base } from "cfg/c/publicboss_base";

export const globalReceive = {
    "openNewFun": (fun_key) => {
        openNewFun(fun_key);
    }
}


insert("open_fun", {
    "id": -2,
    "tips": {}
})



export const forelet = new Forelet();

let id = 0, //应开放功能id
    next_fun = null, //待开发功能
    fly_fun: any = {}, //飞行功能
    move = true, //动画控制
    skill_anima = false,
    tips: any = {},
    condition = null;//领奖条件

let openData: any = {
    "Pi": Pi
};

const getData = function () {
    openData.player = getDB("player");
    openData.skill = getDB("skill");
    openData.skill_describe = skill_describe;
    openData.key = function_open[id];
    openData.move = move;
    openData.skill_anima = skill_anima;
    openData.id = id;
    openData.fly_fun = fly_fun;
    openData.next_fun = next_fun;
    openData.funIsFinish = funIsFinish;
    openData.getWildName = getWildName;
    return openData;
}

/**
 * 前台操作
 */
export class OpenFun extends Widget {
    //关闭
    goback(arg) {
        close(arg.widget)
    }
    //打开领取奖励界面
    openAward() {
        openAward();
    }
    //领奖
    getAward() {
        let level = getDB("player.level");
        if (next_fun.level_limit && level < next_fun.level_limit) {
            globalSend("screenTipFun", { words: `等级未到` });
            return;
        }
        let wild = getDB("wild");
        if (next_fun.stage_id > wild.wild_max_mission || (wild.wild_max_mission == next_fun.stage_id && wild.wild_task_num < condition[1])) {
            let guard_name = wild_mission[next_fun.stage_id].guard_name.split(",");
            globalSend("screenTipFun", {
                words: `通过${guard_name[1]} ${guard_name[0]}开放`
            });
            return;
        }
        award();
    }
    //第一次渲染
    attach() {
        if (move) return;
        move = true;
        forelet.paint(getData());
    }
    afterUpdate() {
        if (move) return;
        move = true;
        forelet.paint(getData());
    }
    propInfoShow(sid) {
        globalSend("showOtherInfo", sid);
    }
}

//打开领取奖励界面
const openAward = () => {
    forelet.paint(getData());
    open("app_b-open_fun-award-award");
    let player = getDB("player");
}
/**
 * 获取新功能红点路径
 */
export const getTips = function () {
    return getDB("open_fun.tips");
}

/**
 * 野外地图名字
 */
export const getWildName = function(stage_id){
    let name = wild_mission[stage_id].guard_name;
    let arr = name.split(",");
    return arr[1];
}
//获得任务激活条件
const getTaskCondition = function(){
    let curr_mission = wild_mission[next_fun.stage_id];
    if(!curr_mission){return false;}
    let next_guide = curr_mission.guide;
    if(!next_guide){return false;}
    for(let i = 0,len = next_guide.length;i<len;i++){
        if(function_open[guide_cfg[next_guide[i][0]].fun_key].id == next_fun.id){
            return [next_fun.stage_id,next_guide[i][1]]//[地图id,需要完成杀怪任务数量]
        }
    }
    return false;
}

/**
 * 领取奖励
 */
const award = function () {
    let arg = {
        "param": { "id": id },
        "type": "app/activity@open_function"
    };
    //显示menu_top
    if (function_guid[id].target_point[0] > 0) {
        globalSend("show_menu_top");
    }
    net_request(arg, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: `通讯失败` });
            return;
        } else {
            
            let prop: any = Common.changeArrToJson(data.ok);
            Common_m.mixAward(prop);
            let w = forelet.getWidget("app_b-open_fun-award-award");
            if (w) {
                close(w);
            }
            id = prop.function_record + 1;
            updata("open_fun.id", prop.function_record);

            // let guide_list = getDB("guide");
            // let wild_guide = getDB("wild.task.guide");
            // if(wild_guide && (guide_list.curr != wild_guide[0] || !guide_list.start)){
            // if(wild_guide && id >= function_open[guide_cfg[wild_guide[0]].fun_key].id ){
            //     updata("guide.list",guide_list.list ? guide_list.list + "-" + wild_guide[0] : wild_guide[0] );
            // }
            //技能有动画特殊处理
            let is_skill = function_guid[id-1].key.indexOf("skill")>-1;
            if(is_skill){
                skill_anima = true;
                forelet.paint(getData());
                let anima_timer = setTimeout(()=>{
                    clearTimeout(anima_timer);
                    anima_timer = null;
                    skill_anima = false;
                    move = false;
                    forelet.paint(getData());
                },1000)
            }

            //下一个开放的功能
            next_fun = function_guid[id] ? function_guid[id] : null;
            if (next_fun) {
                condition = getTaskCondition();
            }
            if(!is_skill){
                move = false;
                forelet.paint(getData());
            }
            updata(`open_fun.tips.${fly_fun.func_tips}`, 1);

            let timer = setTimeout(() => {
                fly_fun = function_guid[id] ? function_guid[id] : null;
                globalSend("upTip");
                clearTimeout(timer);
                timer = null;
            }, is_skill ? 2000 : 1000);
            //神兵激活
            if (function_guid[prop.function_record].key == "magic_activate") {
                globalSend("activateMagic");
            }
            //技能激活
            let keyArr = ["skill1", "skill2", "skill3", "skill4", "skill5"];
            let index = keyArr.indexOf(function_guid[prop.function_record].key);
            if (index >= 0) {
                globalSend("activateSkill", index + 1);
            }
            //灵宠激活
            if (function_guid[prop.function_record].key == "pet") {
                globalSend("activatePet");
            }
            if (function_guid[prop.function_record].key == "public_boss"){
                let level = getDB("player.level");
                let publicBoss : any = {}
                for(let i in publicboss_base){
                    if(level >= publicboss_base[i].level){
                        publicBoss[i] = 1;
                    }
                }
                Pi.localStorage.setItem("publicBoss", JSON.stringify(publicBoss));
            }
        }
    })
};

/**
 * 判断功能是否开放
 * @param fun_key [功能key]
 */
export const funIsOpen = function (fun_key) {
    
    if(function_open[fun_key].stage_id){
        let id = getDB("open_fun.id");
        let wild = getDB("wild");
        let limit_guide = function_open[fun_key].stage_id;
        if (limit_guide > wild.wild_max_mission || (wild.wild_max_mission == limit_guide && wild.wild_task_num < condition[1] && id < function_open[fun_key].id)) {
            let guard_name = wild_mission[limit_guide].guard_name.split(",");
            globalSend("screenTipFun", {
                words: `通过${guard_name[1]} ${guard_name[0]}开放`
            });
            return false;
        }
    }else if(function_open[fun_key].level_limit){
       let level = getDB("player.level");
        if (level < function_open[fun_key].level_limit) {
            globalSend("screenTipFun", {
                words: `${function_open[fun_key].level_limit}级开放`
            });
            return false;
        }
    }
    // let limit_guide = function_open[fun_key].stage_id;
    // if (limit_guide > wild.wild_max_mission || (wild.wild_max_mission == limit_guide && wild.wild_task_num < condition[1] && id < function_open[fun_key].id)) {
    //     let guard_name = wild_mission[limit_guide].guard_name.split(",");
    //     globalSend("screenTipFun", {
    //         words: `通过${guard_name[1]} ${guard_name[0]}开放`
    //     });
    //     return false;
    // }
    if (id < function_open[fun_key].id) {
        globalSend("screenTipFun", {
            words: `功能未激活`
        });
        return false;
    }
    return true;
}
/**
 * 判断功能开放条件是否满足
 * @param fun_key [功能key]
 */
 const funIsFinish = function(fun_key){
    if(function_open[fun_key].stage_id){
        let wild = getDB("wild");
        let limit_guide = function_open[fun_key].stage_id;
        if (wild.wild_max_mission > limit_guide || (wild.wild_max_mission == limit_guide && wild.wild_task_num >= condition[1])) {
            return true;
        }
    }else if(function_open[fun_key].level_limit){
        let level = getDB("player.level");
        if (level >= function_open[fun_key].level_limit) {
            return true;
        }
    }
    
    return false;
}

/**
 * 玩家打开新功能(取消'新'提示)
 */
const openNewFun = function (fun_key) {
    let id = function_open[fun_key].id;
    let key = function_guid[id].func_tips;
    if (getDB(`open_fun.tips.${key}`)) {
        updata(`open_fun.tips.${key}`, 0);
        let timer = setTimeout(() => {
            globalSend("upTip");
            clearTimeout(timer);
            timer = null;
        }, 1000);
    }
    return;
};

listen("player.function_record", (data) => {
    let player = getDB("player");
    id = player.function_record + 1;
    updata("open_fun.id", player.function_record);
    let magic = getDB("magic.treasure");
    if(id >= function_open.magic_activate.id && !magic.length){
        globalSend("activateMagic"); 
    }
    if (player.function_record >= -1 && function_guid[id]) {
        for (let i = id, len = function_guid.length; i < len; i++) {
            tips[function_guid[i].func_tips] = 0;
        }
        //新功能开放红点监听
        updata("open_fun.tips", tips);
        updata("open_fun.tips", tips);
        next_fun = function_guid[id];
        fly_fun = function_guid[id];
        condition = getTaskCondition();
        forelet.paint(getData());
        return;
    }
    condition = [0,0];
});

listen("wild.wild_task_num", () => {
    if(!condition){return;}
    let wild = getDB("wild");
    let max_mission = wild.wild_max_mission;
    let history = wild.wild_history;
    let task_num = wild.wild_task_num;
    if (max_mission == history && (id != undefined) && function_guid[id + 1] && function_guid[id].stage_id == history && task_num >= condition[1]) {
        let guide = (wild.task && wild.task.guide) || 0;
        if(guide && !is_guide()){
            getPage();
        }
        forelet.paint(getData());
    }
});
let oldLevel = 0;
listen("player.level", () => {
    let level = getDB("player.level");
    if(oldLevel>= level){return;}
    oldLevel = level;
    forelet.paint(getData());
});

