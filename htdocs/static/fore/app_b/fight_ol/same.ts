// ========================================= 导入
//pi
import { create, setInterval as setFrameInterval } from "pi/widget/frame_mgr";
//mod
import { data as db } from "app/mod/db";
import { hiddenTable } from "app/mod/hidden";
//fight
import { analyseFighter, analyseData } from "fight/a/fore/node_fight";
import { FMgr, Scene } from "fight/a/fight";
import { EType, blendOne } from "fight/a/analyze";
import { Request } from "fight/a/request";
import { Util } from "fight/a/util";
import { Fighter } from "fight/a/class";
import { createSkill } from "fight/a/common/init_fighter";
import { role_base } from "fight/b/common/role_base";
//scene
import { mgr_data, mgr } from "app/scene/scene";
import { UiFunTable, initValue } from "app/scene/ui_fun";
//app
import { net_message } from "app_a/connect/main";

import { handScene, updateSkill, refreshClothes} from "./handscene";
import { Net } from "./net";

// ========================================= 导出
/**
 * @description 同屏管理
 */
export class SMgr{
    static type: string
    /**
     * @description 是否停止向渲染层抛事件
     */
    static pause:boolean
    /**
     * @description 开始一场同屏战斗
     * @param type 同mgr_data.name
     * @param events 第一次初始化战斗事件，insert
     * @param arr ([pre_fun, next_fun]) 战斗事件处理函数，根据每个同屏功能自己决定 [伤害更改之前, 伤害更改之后]
     */
    static start(type: string,events: Array<any>, arr: Array<Function>, navMesh: any, pause?: boolean){
        this.setPause(pause);
        fightScene = FMgr.create(type,1,Net);
        fightScene.setNavMesh(navMesh);
        fightScene.listener = dealLocEvents;
        handlerList.set(type, arr);
        dealFightEvents(events);
        fightScene.start();
        this.type = type;
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
        handScene.clear();
        initValue();
        this.setPause(false);
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
        if(mapId == mSelf){
            return "You can't fight your-self!!";
        }
        oldCurTarget = f.curTarget ? f.curTarget : -1;
        f.curTarget = mapId;
        if(t.type == "fighter"){
            f.pk = 2;
        }else{
            f.pk = 0;
        }
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
        let f,v = FMgr.scenes;
        if(v.type == "fight"){
            f = v.fighters.get(1);
        }else{
            f = v.fighters.get(mSelf);
        }
        Request.useSkill({type:EType.useSkill,mapId:f.mapId,skill_id:skill_id,pos:[f.x,f.y]},v);
    }

    /**
     * @description 获取同屏场景中自己的mapId
     */
    static getSelfMapid(){
        return mSelf;
    }
    /**
     * @description 获取同屏场景中自己的fighter对象
     */
    static getSelf(){
        return fightScene.fighters.get(mSelf);
    }
    /**
     * @description 设置是否暂停渲染
     */
    static setPause(b:boolean):void{
        if(b !== undefined)
            this.pause = b;
        if(fightScene){
            mgr.pause(this.pause);
        }
    }
    /**
     * @description 获取同屏场景
     */
    static getScene(): Scene{
        return fightScene;
    }
    /**
     * @description 改变自己是否ai控制
     * @param bol[true,false]
     */
    static change_ai(bol,callback?){
        try{
            let self = SMgr.getSelf();
            if(self && self.ai!=bol){
                self.ai = bol;
            }
        }finally{
            callback && callback();
        }       
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
 * @description old curTarget
 */
let oldCurTarget : number;
/**
 * @description 等待自己进入，进入场景之后，人物插入都由后台跟战斗事件一起推送过来
 */
const wait = new Map<Function,any>();

/**
 * @description 每个功能需要单独处理战斗事件时，注册的处理函数表 [ 同屏数据处理前 , 同屏数据处理后 ]
 */
const handlerList = new Map<string,Array<Function>>();
/**
 * @description 处理战斗事件到表现层
 * @param list 
 */
const dealFightEvents = (list) => {
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
            !SMgr.pause && handScene[e.type] && handScene[e.type](e, fightScene.now);
        }
    }
    
    return true;
}
/**
 * @description 分发本地事件
 */
const dealLocEvents = (list) => {
    const arr = [];
    for(let i=0,len=list.events.length;i<len;i++){
        let e = blendOne(list.events[i]);
        // LocHandlers[e.type] && LocHandlers[e.type](e);
        if(e._type == EType.move || checkSelf(e)){
            // Move.filter(e.type,e);
            !SMgr.pause && handScene[e.type] && handScene[e.type](e, fightScene.now);
        }
    }
    
    // !SMgr.pause && modifySelect();
    // !SMgr.pause && UiFunTable.runCuurUi(list,fightScene.now);
}
/**
 * @description 更新选中状态
 */
const modifySelect = () => {
    let f : any = fightScene.fighters.get(mSelf);
    let t : any = fightScene.fighters.get(oldCurTarget);
    let _t : any = fightScene.fighters.get(f.curTarget);

    if( oldCurTarget == -1 && t){
        // t.isCurr = false;
        // mgr.modify(t);
        mgr.setVisibled(t,2,false);
    }else{
        if(f.curTarget != oldCurTarget && _t){
            if(t){
                // t.isCurr = false;
                // mgr.modify(t); 
                mgr.setVisibled(t,2,false);
            }
            // _t.isCurr = true;
            // mgr.modify(_t);
            mgr.setVisibled(_t,2,true);
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
 * @description 检查自己的pk状态, 自己或者目标死亡, 都初始化为0
 * @param f 
 */
const checkPkStatus = (f,t) => {
    if(!f.pk){
        return;
    }
    if((t.mapId == f.curTarget && t.hp <= 0) || f.hp <= 0){
        f.pk = 0;
        f.curTarget = null;
    }
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
 * @description 处理本地事件
 */
class LocHandlers{
    /**
     * @description 移除fighter
     * @param e 
     */
    static remove(e){
        // console.log("remove:: ",e.fighter);
        Request.remove({mapId:e.fighter},fightScene);
    }
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
        if(f.sid == db.user.rid){
            mSelf = f.mapId;
            f.ai = true;
            //自己
            setTimeout(runWait,0);
        }else{
            f.ai = false;
        }
        for(let i = 0,len = f.skill.length;i<len;i++){
            f.skill[i] = createSkill(f.skill[i].id,f.skill[i].level,role_base[f.career_id]);
            f.skill[i].cdNextTime = f.skill[i].initialCDTime + fightScene.now;
        }
        e.fighter = f;
        // console.log("insert:: ",f.mapId);
        Request.insert(f,fightScene);
    }
    /**
     * @description 移除fighter
     * @param e 
     */
    static remove(e){
        let f = fightScene.fighters.get(e.fighter);
        if(!f){
            console.warn(`There is not a fighter who's mapId is ${e.fighter}`);
            return;
        }
        f.remove = f.die_time || (fightScene.now + 2250);
        Request.remove({mapId:e.fighter},fightScene);
        // console.log("back remove:: ",e.fighter,[...fightScene.fighters.keys()]);
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
        let t:Fighter = fightScene.fighters.get(e.target),d;
        if(t){
            d = ((e.r.hp || 0)+(e.r.steal||0));
            t.hp += d;
            checkPkStatus(fightScene.fighters.get(mSelf),t);
        }  
    }
    /**
     * @description buff
     * @param e 
     */
    static effect(e){
        let t = fightScene.fighters.get(e.target);
        if(t && e.effect == "hp"){
            t.hp += e.value;
            checkPkStatus(fightScene.fighters.get(mSelf),t);
        }
    }
    /**
     * @description 使用技能
     */
    static useSkill(e){
        let f = fightScene.fighters.get(e.fighter),
            t = fightScene.fighters.get(e.curTarget);
        if(!f){
            return console.log(`The fighter who's mapId is ${e.fighter} isn't in the scene`);
        }
        if(e.pos){
            if(Util.getPPDistance(f,{x:e.pos[0],y:e.pos[1]}).d > f.speed * 3 ){
                f.x = e.pos[0];
                f.y = e.pos[1];
            }
        }
        if(e.pk){
            f.pk = e.pk;
        }
        if(f.type == "fighter" && e.curTarget == mSelf && t && t.pk == 0){
            t.pk = 1;
            t.curTarget = e.fighter;
        }
    }
    /**
     * @description 复活（血量回满）
     */
    static revive(e){
        const f = fightScene.fighters.get(e.fighter);
        if(!f){
            return console.log(`The fighter who's mapId is ${e.fighter} isn't in the scene`);
        }
        if(e.fighter == mSelf){
            return;
        }
        f.hp = f.show_hp = f.max_hpCount;
    }
    //可不用，因为handscene里面用的同一个fighter
    //理论上所有更新都应该在这边更新
    //handscene不能修改fighter身上关键数据，比如技能cd
    static refreshSkill(e){
        const f = fightScene.fighters.get(e.fighter);
        updateSkill(f,e.skill,fightScene.now);
    }
    /**
     * @description 更新时装
     */
    static refreshClothes = (e) => {
		refreshClothes(e,fightScene.now);
		// handScene.updateModule(__self.mapId,{module:f.module});
    };
    /**
     * @description 更新属性
     */
    static refreshAttr = (e) => {
        const f = fightScene.fighters.get(e.fighter);
        for(let k in e.attr){
            f[k] = e.attr[k];
        }
    }
}

// ================================= 立即执行
//接收后台推送战斗指令
net_message("order", (msg) => {
    const h = handlerList.get(SMgr.type),
        events:any = analyseData(msg,ev => {
            if(ev.type != "insert" || !fightScene.fighters.get(ev.fighter.mapId))
                return true;
        });
    if(!events)
        return;
    h && h[0] && h[0](events); // 处理伤害之前
    dealFightEvents(events);
    h && h[1] && h[1](events); // 处理伤害之后
});
/**
 * @description 设置帧管理
 */
(()=>{
    let frame = create();
    setFrameInterval(frame);
    FMgr.startFrame(frame);
})();
// /**
//  * @description 设置后台运行时的监听
//  */
// hiddenTable.addHandler("hidden",(r:boolean):any => {
//     if(fightScene){
//         SMgr.setPause(r);
//     }
// })
