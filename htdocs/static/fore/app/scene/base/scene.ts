/**
 * @description 基本场景组件
 */

import { ResTab } from "pi/util/res_mgr";
import { Widget } from "pi/widget/widget";
import { Json } from 'pi/lang/type';
import { getWidth, getHeight, getScale } from "pi/ui/root"
import { getRealNode, paintCmd3 } from "pi/widget/painter";
import { Forelet } from "pi/widget/forelet";
import { Common } from "app/mod/common";
import { Pi } from "app/mod/pi";
import { updata } from "app/mod/db";
import { createHandlerList } from "pi/util/event";

import { mgr, mgr_data } from "../scene";
import { camera_cfg } from "../plan_cfg/camera_config";
import { map_cfg} from "../plan_cfg/map";
import { map_eff} from "../plan_cfg/map_eff";

// ================================== 导出
/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet = new Forelet();

export class Scene extends Widget {
    /**
     * @description 鼠标或手指抬起事件
     * @example
     */
    up(e) {
        isUp = true;
        if (mgr_data.name === "uiscene") {
            rotate = undefined;
        }
        if(moveTimer){
            clearTimeout(moveTimer);
            moveTimer = null;
        }
    };

    move(e) {
        downMove = e;
        let rotate = null;
        if (mgr_data.name === "uiscene") {
            
            if (Math.abs(e.x - offsetX) < 0.1) {
                return;
            }
            offsetX = e.x;
            rotate = rotating(e, rotateobj);
        }
        isMove = true;
        if(rotateobj){
            if(rotateobj.type == "pet"){
                updata("player.pet_rotate",rotate);
            }else if(rotateobj.type == "pet_show"){
                updata("player.pet_show_rotate",rotate);
            }
        }
        
    }

    down(e){
        if (mgr_data.name !== "uiscene") {
            downMove = e;
            dealMove();
        }
    }

    longtap(e){
        touchPos = calPos(e);
        listener[mgr_data.name] && listener[mgr_data.name](touchPos);
    }

    onRayCast(event: any) {
        let t = Date.now();
        if (!isUp || (taptime && t-taptime < downFrame)) return;
        isUp = false;
        if (mgr_data.name !== "uiscene" && mgr_data.name !== "loginscene") {
            if (mgr.pause[mgr_data.name] || !listener) return;
            //console.log(result.data)
            if(!isMove)listener[mgr_data.name] && listener[mgr_data.name](calPos(event));
        }
        isMove = false;
        taptime = t;
    }

    /**
     * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
     * @example
     */
    setProps(props: Json, oldProps?: Json): void {
        let d = forelet.widgets,
            on = this.props && this.props.newscene;
        if (this.props && this.props.module && this.props.module._show) {
            mgr.remove(this.props.module);
            this.props.module = undefined;
        }
        console.log(on,props.newscene);
        this.props = props;
        if ((props.name === "uiscene") && this.tree && props.name === d[d.length - 1].props.name && props.rootname === d[d.length - 1].props.rootname) {
            resetcanvas(this);
        }else if(on !== this.props.newscene && this.tree){
            // console.log("setProps");
            resetcanvas(this);
        }
        if((props.name === "uiscene"))
            setTimeout(()=>{
                mgr.pause(false);
            },0);
    }

}


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

//resetScene 
export const resetcanvas = (widget, data?) => {
    // console.log("resetcanvas");
    SceneW = widget;
    if (data) widget.props = data;
    let map1;
    mgr.pause(true);
    sceneResetEvents({"type":"before","name":widget.props.name})
    mgr_data.name = widget.props.name;
    //配置
    let scene_cfg: any = {
        lights: [{
            type: "Ambient",
            color: [1, 1, 1],
            intensity: 1.0
        }]
    };
    //配置 camera 
    let c: any;
    //if (mgr_data.name !== "loginscene") {
        c = mgr.yszzFight.camera(camera_cfg[mgr_data.name + "_camera"]||camera_cfg["wild_camera"]);
        c._pos = {x:0,y:0};
    //}

    if(curResTab)
        curResTab.release();
    
    scene_cfg.resTab = curResTab = new ResTab();
    curResTab.timeout = 10000;
    mgr.reset(scene_cfg, mgr_data.name, c, widget.props.width || getWidth(), widget.props.height || getHeight());

    mgr.pause(false);

    let canvas = mgr.getCanvas();
    if (widget.tree.link.children.length === 1) {
        widget.tree.link.appendChild(canvas);
    } else {
        paintCmd3(getRealNode(widget.tree), "appendChild", [canvas]);
    }

    let scene_module = widget.props.newscene || map_cfg[widget.props.type] || map_cfg[mgr_data.name] || null;
    if (scene_module) {
        let sceneJson = mgr.getSceneFile(scene_module);
        let mapEff = undefined; //场景本身特效
        if(map_eff[scene_module]){
            mapEff = mgr.getSceneFile(map_eff[scene_module]);
        }
        mgr.create(sceneJson);
        if(map_eff[scene_module]) mgr.create(mapEff);
    }

    if (widget.props.module) {
        if (widget.props.type === "treasure") {
            animobj[widget.props.module.module] = widget.props.module;
        }
        rotateobj = widget.props.module;
        mgr.create(widget.props.module, widget.props.type);
    }else{
        rotateobj = null;
    }
    sceneResetEvents({"type":"after","name":mgr_data.name});
}
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
 * @description 回到上一次的场景界面
 */
export const canvasGoBack = (d) => {
    if (d[d.length - 1]) {
    //     if (d[d.length - 1].props.name === "ui_effect" && d.length === 2)
    //         d[d.length - 1].props.name = "gang";
    //     if (d[d.length - 1].props.name !== "city")
            //continueScene(d[d.length - 1], d[d.length - 1].props.name)
            // console.log("canvasGoBack");
            resetcanvas(d[d.length - 1]);
    }
}
/**
 * @description 刷新场景
 */
export const refreshScene = () => {
    let wds = forelet.widgets,
        w = wds[wds.length - 1];
    if(!w)return;
    mgr.destroyScene(w["props"].name);
    // console.log("refreshScene");
    resetcanvas(w);
}

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

    return result;
};

const continueScene = (widgetNode, name) => {
    let div = widgetNode;
    if (!div) return; 
    let canvas = div.tree.link;

    mgr.pause(true);//停止老的场景渲染
    mgr_data.name = name;
    canvas.appendChild(mgr.getCanvas());
    mgr.pause(false);
    mgr_data.div[name] = canvas;
    return div;
};

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
    if (name === "uiscene") {
        if (ani[obj]) {
            ani[obj].state = "action_standby";
            mgr.modify(ani[obj])
            return
        }
    }
    for(let i=0,len = list.length;i<len;i++){
        if(list[i](obj))
            return;
    }
}

// ================================== 立即执行

/**
 * 一次性动作结束之后的回调函数
 */
(window as any).AnimFinishCB = (obj) => {
    runAnimCb(obj,animobj,animFinishListener);
}

// 监听添加widget
forelet.listener = (cmd: string, widget: Widget): void => {
    if (widget.name !== "app-scene-frame" && widget.props && (cmd === "firstPaint" || (cmd === "afterUpdate" && mgr_data.name === "uiscene"))) {
        // console.log(cmd);
        resetcanvas(widget)
    }

    if (cmd === "remove") {
        let d = forelet.widgets;

        if (widget.name === "app-scene-anim-scene") {
            mgr.destroyScene("ui_effect");
            canvasGoBack(d);
            return;
        }

        if (d.length === 0 || d[d.length - 1].name === "app-scene-frame") return;
        if (SceneW["props"] && d[d.length - 1].props && (SceneW["props"].name !== "uiscene" || SceneW["props"].name !== d[d.length - 1].props.name)) {
            if (SceneW["props"].module && SceneW["props"].module._show) {
                mgr.remove(SceneW["props"].module);
                SceneW["props"].module = undefined;
            }
            mgr.destroyScene(widget["props"].name);
            canvasGoBack(d);
        }

        if (d.length !== 0 && d[d.length - 1].props && d[d.length - 1].props.name === "uiscene") {
            mgr_data.name = d[d.length - 1].props.name;
            d[d.length - 1].paint(true);
            // resetcanvas(d[d.length - 1]);
        }
        SceneW = d[d.length - 1]; 

        animobj = {};
        // rotateobj = undefined;
    }
}