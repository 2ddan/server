/**
 * @description 基本场景组件
 */

import { ResTab } from "../../../pi/util/res_mgr";
import { Common } from "../../mod/common";
import { createHandlerList } from "../../../pi/util/event";
import { call } from "../../../pi/util/util";
import { depend } from "../../../pi/lang/mod";
import { set as task } from '../../../pi/util/task_mgr';

import { getScale } from "../../mod/pi";

import { mgr, mgr_data } from "../scene";

// ================================== 导出

/**
 * @description 人物旋转
 * @param e ：包含按下的起始位置，现在的位置
 * @param data ：已渲染好的模型
 */
export const rotating = (e: any, data: any) => {
    data.rotate[1] += (Math.PI * ((rotate || e.startX) - e.x))/180;
    if(isUp && rotate === e.x)
        rotate = undefined;
    else
        rotate = e.x;
    mgr.modify(data);
    return data.rotate[1];
}

// 设置一次性动作的回掉
export const initAnimFinishCB = (cb: Function) => {
    if(animFinishListener.indexOf(cb) < 0)animFinishListener.push(cb);
}

// 设置点击回调，主要是场景查询
export const setClickCallback = (cb: Function,name?) => {
    listener[name || mgr_data.name] = cb;
};

/**
 * @description 添加事件监听
 * @param { Function }func 监听函数
 */
export const setResetListener = (func) => {
    (sceneResetEvents as any).add(func);
}
/**
 * @description 获取uiscene的渲染对象
 */
export const getUiMesh = () =>{
    return rotateobj;
};


/**
 * @description 聊天气泡场景显示
 * @param msg:后台返得数据
 * @param mapList:所在场景的玩家列表,
 *                若后台返的数据里面有map_id,则是mapList列表
 *                若无map_id,则是有渲染数据（有_show）玩家列表
 */
export const sendChatMsg = function (msg, mapList, type ? ) {
    let time = Date.now() - relative_time;
    let fighter: any;
    let chat: any = {};
    let arg = msg;
    let length = Common.character(arg.chat);
    //let width = length === arg.chat.length ? 10 : 10;
    let width = 10;
    for (let i in mapList) {
        if (mapList[i] !== '' && (mapList[i].sid || mapList[i].member_id) === arg.role_info.role_id && mapList[i].member_type != "mirror") {
            fighter = mapList[i];
            break;
        }
    }
    if (fighter.chat) {
        mgr.remove(fighter.chat);
        delete chatlist[fighter.chat.old];
    }
    chat.width = length > 15 ? 155 : length * width + (length === arg.chat.length ? 20 : 16);
    chat.height = (length > 15 && length * width > 155) ? 80 : 40;
    chat.text = Common.calculate(30, arg.chat);
    chat.old = time;
    chat.high = 1.55;//fighter.high;

    chat.p = 150;//camera_cfg["chat_position_camera"].value[mgr_data.name];

    fighter.chat = chat;
    mgr.create(fighter.chat, "chat", fighter._show.old);

    chatlist[chat.old] = fighter;
    if (!timer) timer = setTimeout(timerFun, 100);
}
/**
 * @description 获取手指移动位置
 */
export const getTouchPos = () => {
    return touchPos;
};  
// ========================================== 本地
let relative_time = Date.now();
let listener = {},
    animFinishListener = [],
    rotateobj: any,
    rotate,
    isUp = true,
    isMove = false,
    animobj = {},
    chatlist = [],
    timer,
    SceneW,
    taptime,
    curResTab:ResTab,//当前场景资源表
    downMove, //按下移动模拟
    downFrame = 500,
    moveTimer, //滑动事件处理定时器
    offsetX = 0, //模型选择的x的偏移量
    touchPos;//手指移动位置记录
 /**
 * @description 事件处理列表
 * @param event 
 */   
const sceneResetEvents = createHandlerList();
/**
 * @description 拿到对应的scene文件
 * @param arg : 需要匹配的scene文件
 */
const getScene = (arg) => {
    let scene_arg = depend.get("app/scene_res/res/scene/").children;
    for(let i in scene_arg){
        if(i.indexOf(arg) > -1 && i.split(".")[0] != arg){
            let sceneFile = mgr.getSceneFile(i.split(".")[0]);
            mgr.create(sceneFile);
        }
    }
}
 /**
 * @description 处理手指移动事件
 * @param event 
 */   
const dealMove = () => {
    touchPos = calPos(downMove,true);
    if(touchPos)touchPos.type = "terrain";
    listener[mgr_data.name] && listener[mgr_data.name](touchPos);
    clearTimeout(moveTimer);
    moveTimer = setTimeout(
        ()=>{
            dealMove();
        },
        downFrame
    );
}
/**
 * @description 计算手指移动位置坐标
 * @param event 
 */
const calPos = (event,ignoreObj?) => {
    let bound = mgr_data.div[mgr_data.name].getBoundingClientRect();
    let x = ((event.x - bound.left) * mgr_data.scale / getScale());
    let y = ((event.y - bound.top) * mgr_data.scale / getScale());
    let result = mgr_data.threeScene[mgr_data.name].raycast(x, y,ignoreObj);
    //result = "type-arg1-arg2-..."
    let r = result.split("-")
    let type = r.shift();
    eventsHandlers[type] && call(eventsHandlers[type],r);
    return result;
};

const eventsHandlers:Map<string,Function> = new Map();

const chatfun = () => {
    let delTime = 3000,
        _now = Date.now() - relative_time;
    for (var k in chatlist) {
        if (_now - chatlist[k].chat.old >= delTime) {
            mgr.remove(chatlist[k].chat)
            delete chatlist[k].chat;
            delete chatlist[k];
        } else {
            return true;
        }
    }
    timer = null;
}

const timerFun = () => {
    let r = chatfun();
    if (r) timer = setTimeout(timerFun, 100);
};

const runAnimCb = (obj,ani,list) => {
    if (!obj) return;
    let name = obj["name"] || mgr_data.name;
    obj = obj["id"] || obj;
    for(let i=0,len = list.length;i<len;i++){
        if(list[i](obj))
            return;
    }
}

// ================================== 立即执行

/**
 * 一次性动作结束之后的回调函数
 */
// (window as any).AnimFinishCB = (obj) => {
//     // runAnimCb(obj,animobj,animFinishListener);
//     task(runAnimCb,[obj,animobj,animFinishListener],6000,1);
// }