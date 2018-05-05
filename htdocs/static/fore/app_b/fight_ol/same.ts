// ========================================= 导入
//pi
import { create, setInterval as setFrameInterval } from "pi/widget/frame_mgr";
//mod
import { data as db } from "app/mod/db";
//fight
import { analyseFighter, analyseData } from "fight/a/fore/node_fight";
import { FMgr, Scene } from "fight/a/fight";
import { EType, blendOne } from "fight/a/analyze";
import { Request } from "fight/a/request";
import { Util } from "fight/a/util";
import { Fighter } from "fight/a/class";
//scene
import { mgr_data, mgr } from "app/scene/scene";
import { UiFunTable } from "app/scene/ui_fun";
import { Move } from "app/scene/move";
//app
import { net_message } from "app_a/connect/main";

import { handScene, updateSkill } from "./handscene";
import { Net } from "./net";

// ========================================= 导出
/**
 * @description 同屏管理
 */
export class SMgr{
    /**
     * @description 是否停止向渲染层抛事件
     */
    static pause:boolean
    /**
     * @description 开始一场同屏战斗
     * @param type 同mgr_data.name
     * @param events 第一次初始化战斗事件，insert
     * @param func 战斗事件处理函数，根据每个同屏功能自己决定
     */
    static start(type: string,events: Array<any>, func: Function, navMesh?){
        fightScene = FMgr.create(type,1,Net);
        fightScene.setNavMesh(navMesh);
        fightScene.listener = dealLocEvents;
        handlerList.set(type,func);
        dealFightEvents(events);
        fightScene.start();
    }
    /**
     * @description 离开同屏
     * @param type 同mgr_data.name
     */
    static leave(){
        FMgr.destroy(fightScene);
        handlerList.delete(fightScene.type);
        fightScene = null;
        wait.clear();
        this.pause = false;
    }
    /**
     * @description 移动
     * @param type 同mgr_data.name
     */
    static move(pos){
        const f = fightScene.fighters.get(mSelf);
        f.handMove = {x:pos.x,y:pos.y};
    }
    /**
     * @description 打怪
     * @param mapId
     */
    static fight(mapId){
        const t = fightScene.fighters.get(mapId),f = fightScene.fighters.get(mSelf);
        if(!t){
            return "no target";
        }
        f.curTarget = mapId;
    }
    /**
     * @description 添加额外选怪条件
     * @param con [['hp', '>', 0]] = Fighter.hp > 0  ||  [['hp', 0]] = Fighter.hp == 0
     */
    static setCondistion(con:Array<any[]>){
        const f: Fighter = fightScene.fighters.get(mSelf);
        if(!f){
            return wait.set(this.setCondistion,con);
        }
        f.targetConds = con;
    }
    /**
     * @description 使用技能
     * @param mapId
     */
    static useSkill(skill_id){
        let f;
        FMgr.scenes.forEach(v => {
            if(v.type == "fight"){
                f = v.fighters.get(1);
            }else{
                f = v.fighters.get(mSelf);
            }
            Request.useSkill({type:EType.useSkill,mapId:f.mapId,skill_id:skill_id,pos:[f.x,f.y]},v);
        });
    }

    /**
     * @description 获取同屏场景中自己的mapId
     */
    static getSelfMapid(){
        return mSelf;
    }
    /**
     * @description 设置是否暂停渲染
     */
    static setPause(b:boolean):void{
        this.pause = b;
    }
    /**
     * @description 获取同屏场景
     */
    static getScene(): Scene{
        return fightScene;
    }
}

// ======================================== 本地
/**
 * @description 当前同屏场景
 */
let fightScene: Scene;
/**
 * @description 自己的mapId
 */
let mSelf: number;
/**
 * @description 等待自己进入，进入场景之后，人物插入都由后台跟战斗事件一起推送过来
 */
const wait = new Map<Function,any>();

/**
 * @description 每个功能需要单独处理战斗事件时，注册的处理函数表
 */
const handlerList = new Map<string,Function>();
/**
 * @description 处理战斗事件到表现层
 * @param list 
 */
const dealFightEvents = (list) => {
    if(Move.pause)
        Move.pause = false;
    if (list.event.length > 0) {
        let i = 0,
            len = list.event.length;
        for ( ; i < len; i++) {
            let e = list.event[i],
                type;
            type = e.type || e[0];    
            if(checkSelf(e))
                continue;        
            // Move.filter(type,e);
            Handlers[type] && Handlers[type](e);
            !SMgr.pause && handScene[e.type] && handScene[e.type](e, list.now);
        }
    }
    UiFunTable.runCuurUi(list);
    return true;
}
/**
 * @description 处理本地事件
 */
const dealLocEvents = (list) => {
    const arr = [];
    for(let i=0,len=list.events.length;i<len;i++){
        let e = blendOne(list.events[i]);
        if(e._type == EType.move || checkSelf(e)){
            // Move.filter(e.type,e);
            handScene[e.type] && handScene[e.type](e, fightScene.now);
        }
    }
}
/**
 * @description 检查是否自己
 */
const checkSelf = (e): boolean => {
    if((e._type == EType.moveto || e._type == EType.useSkill ) && e.fighter == mSelf){
        return true;
    }
    return false;
}
/**
 * @description 执行等待队列
 */
const runWait = () => {
    wait.forEach((func,arg)=>{
        func(arg);
    });
    wait.clear();
}
/**
 * @description 同屏需要同步处理的后台事件
 */
class Handlers{
    /**
     * @description 添加到fightScene
     * @param e 
     */
    static insert(e){
        const f = new Fighter();
        for(let k in e.fighter){
            f[k] = e.fighter[k];
        }
        if(f.sid == db.player.role_id){
            mSelf = f.mapId;
            f.ai = true;
            //自己
            setTimeout(runWait,0);
        }else{
            f.ai = false;
        }
        e.fighter = f;
        Request.insert(f,fightScene);
    }
    /**
     * @description 移除fighter
     * @param e 
     */
    static remove(e){
        // console.log("remove"+e.fighter)
        Request.remove({mapId:e.fighter},fightScene);
    }
    /**
     * @description 同步移动
     * @param e 
     */
    static moveto(e){
        let f = fightScene.fighters.get(e.fighter);
        if(f && e.moveto)
            f.moveto = e.moveto;
    }
    /**
     * @description 伤害
     * @param e 
     */
    static damage(e){
        let f = fightScene.fighters.get(e.target);
        if(f){
            f.hp += (e.r.hp+e.r.steal);
            //如果怪物死亡，则让它停止移动，否则会原地踏步
            if(f.hp <= 0){
                f.moveto = {x:f.x,y:f.z,z:f.y,status:1}; 
            }
        }  
    }
    /**
     * @description 使用技能
     */
    static useSkill(e){
        let f = fightScene.fighters.get(e.fighter);
        if(f && e.pos){
            f.x = e.pos[0];
            f.y = e.pos[1];
        }
    }
    //可不用，因为handscene里面用的同一个fighter
    //理论上所有更新都应该在这边更新
    //handscene不能修改fighter身上关键数据，比如技能cd
    static refreshSkill(e){
        const f = fightScene.fighters.get(e.fighter);
        updateSkill(f,e.skill,fightScene.now);
    }
}

// ================================= 立即执行
//接收后台推送战斗指令
net_message("order", (msg) => {
    const h = handlerList.get(mgr_data.name),
        events:any = analyseData(msg,ev => {
            if(ev.type != "insert" || !fightScene.fighters.get(ev.fighter.mapId))
                return true;
        });
    if(!events)
        return;
    h && h(events);
    dealFightEvents(events);
});
/**
 * @description 设置帧管理
 */
(()=>{
    let frame = create();
    setFrameInterval(frame);
    FMgr.startFrame(frame);
})();

