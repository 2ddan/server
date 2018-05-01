/**
 * @description 前台切分场景移动
 */
//=============================引入mod下文件
//scene
import { mgr, mgr_data, renderHandlerList } from "app/scene/scene";
//mod
import { Common } from "app/mod/common";
import { Pi,globalSend} from "app/mod/pi";

//=============================引入同目录文件

// ========================================= 导出
export class Move {
    /**
     * @description 事件列表
     */
    static table:{} = {}
    /**
     * @description 目标列表
     */
    static targets = {}
    /**
     * @description 定时器
     */
    static timer:number
    static delta = []
    /**
     * @description 自己停止移动时推送调用函数
     */
    static stopBack:Function
    /**
     * @description 是否渲染
     */
    static render:boolean = true
    /**
     * @description 是否停止循环
     */
    static pause:boolean = false
    static frameBack:Function
    /**
     * @description 过滤战斗事件，添加moveto,否则删除
     * @param {fightevent}e
     */
    static filter(type,e){
        let f,t = Date.now(),mt,mid;
        
        if(type == "move" || type.indexOf("refresh") === 0)
            return ;
        if(type === "moveto"){
            mid = e.fighter>0?e.fighter:e.fighter.mapId;
            f = getFighter(mid);
            if(!f){
                return console.error(cacheList,mapList);
            }
            mt = e.fighter.path && e.fighter.path[e.fighter.path.length-1] || e.fighter.moveto;
            //如果目标点离对象当前位置非常接近，则不再模拟
            if(near(mt,f,f.speed)){
                return;
            }
            let n = Common.shallowClone(e);
            n.fighter = getFighterAttr(e.fighter);
            n.fighter.speed = f.speed;
            delete n.fighter._show;
            Move.table[mid] = JSON.parse(JSON.stringify(n));
            if(e.tid !== -1)
                initTargets(e,mid);
            initFighter(Move.table[mid].fighter,f,t);
        }else if(type === "remove"){
            if(Move.table[e.mapId] && Move.table[e.mapId].tid != -1){
                Move.deleteTarget(Move.table[e.mapId],e.mapId);
            }
            if(Move.targets[e.mapId]){
                Move.deleteAllTarget(e.mapId);
                delete Move.targets[e.mapId];
            }
            delete Move.table[e.mapId];
        }else if(Move.table[e.fighter.mapId]){
            console.log(type);
            //如果神兵类技能(不会打断玩家动作)，则退出
            if(e.skill && checkIsGod(e.skill,e.fighter.mapId)
            // || checkObjSame(e.fighter.moveto,Move.table[e.fighter.mapId].fighter.moveto)
            )
                return;
            if(Move.table[e.fighter.mapId] && Move.table[e.fighter.mapId].tid != -1){
                Move.deleteTarget(Move.table[e.fighter.mapId],e.fighter.mapId);
            }
            delete Move.table[e.fighter.mapId];
        }
        //Move.start();
    }
    /**
     * @description 主循环
     */
    static loop(){
        let e,t = Date.now(),delta;
        if(!Move.timer)
            Move.timer = t;
        delta = t-Move.timer
        // console.log("loop ::: ",t-$time);
        if(!Move.pause){
            //移动帧
            for(let k in Move.table){
                e = fighterMove(Move.table[k].fighter,delta);
                _show(e,k);
            }
        }
        
        // console.log("event time ::: ",Date.now() - t);
        // $time = t;
        Move.timer = t;
        // console.log(delta);
        // Move.delta.push(delta);
    }
    /**
     * @description 获取移动状态
     * @param {number}mapId
     */
    static getPos(mapId){
        return Move.table[mapId] && fighterMove(Move.table[mapId].fighter,Date.now());
    }
    /**
     * @description 从targets列表中清除单个目标
     * @param {number}mapId
     */
    static deleteTarget(e,mapId){
        let ts = Move.targets[e.tid],
            i;
        if(!ts){
            return;
        }
        i = ts.indexOf(mapId);
        ts.splice(i,1);
    }
    /**
     * @description 清除整个targets列表中的目标
     * @param {mapId}tid 目标id
     */
    static deleteAllTarget(tid){
        let ts = Move.targets[tid],
            i = 0,
            len = ts.length,
            r;
        if(!ts || !len) return;
        for(i = len-1;i>=0;i--){
            r = Move.stopSingle(ts[i]);
            if(!r)
               ts.length = i;
        }
    }
    /**
     * @description 清空事件列表
     */
    static clear(){
        Move.timer && clearTimeout(Move.timer);
        Move.table = {};
        Move.timer = null;
    }
    /**
     * @description 设置停止移动时推送调用函数
     */
    static setStopBack(callback){
        Move.stopBack = callback;
    }
    /**
     * @description 设置是否调用渲染
     * @param {boolean}b true-渲染 false-不渲染
     */
    static setRender(b){
        Move.render = b;
    }
    /**
     * @description 停止某个模型移动
     * @param { Number }mapId 
     */
    static stopSingle(mapId){
        let f,e;
        f = Move.table[mapId] && Move.table[mapId].fighter;
        if(!f)return;
        e = { type: "move", fighter: f, moving: 0 };
        _show(e,mapId);
        return true;
    }
    /**
     * @description 获取玩家是否正在移动
     */
    static isMove(mapId){
        return !!Move.table[mapId];
    }
}
/**
 * @description 设置渲染处理
 */
export const setShow = (show) => {
    sceneShow = show;
};
/**
 * @description 设置缓存列表
 */
export const setCache = (cache) => {
    cacheList = cache;
};
/**
 * @description 设置缓存列表
 */
export const setList = (list) => {
    mapList = list;
};
/**
 * @description 设置移动帧率
 * @param { boolean }b false本地，true外网
 */
export const setFrame = (b) => {
    frame.type = b?"out":"loc";
};
/**
 * @description 移动帧率, 本地为50 || 外网为55
 * @key type 类型 "out"外网 || "in"内网
 * @key out 外网帧率
 * @key loc 本地帧率
 */
export let frame = {type:"out",out : 55, loc : 50, max: 70, min: 50};

// =========================================== 本地
/**
 * @description 处理渲染的事件处理对象
 */
let sceneShow;
/**
 * @description 场景中的战斗对象列表
 */
let mapList;
/**
 * @description 缓存的战斗对象，不在当前渲染场景内
 */
let cacheList;

const cDd = (t,p) => {
    return Math.sqrt((p.x - t.x) * (p.x - t.x) + (p.y - t.y) * (p.y - t.y))
};
/**
 * @description 计算点p是否接近线段ft
 * @param f 起点
 * @param t 终点
 * @param p 测试点
 * @param d 靠近距离
 */
const near = function(t,p,d){
    return cDd(t,p) <= d;
}
/**
 * 
 */
const initTargets = (e,fid) => {
    let tg = getFighter(e.tid);
    if(!tg)return;
    if(Move.targets[e.tid] && Move.targets[e.tid].indexOf(fid) < 0){
        Move.targets[e.tid].push(fid);
    }else if(!Move.targets[e.tid]){
        Move.targets[e.tid] = [fid];
    }
    

};
/**
 * @description 设置fighter位置
 */
const initFighter = (fighter,f,t) => {
    if(near(fighter,f,f.speed*10)){
        fighter.x = f.x;
        fighter.y = f.y;
    }else{
        f.x = fighter.x;
        f.y = fighter.y; 
    }
};
/**
 * @description 移动按步距拆分
 * @param {Json}f 战斗对象
 */
const _move = (f,during) => {
    let x,y;
    if(!f.path)
        return { type: "move", fighter: f, moving: 0 };
    //到达目标点检测，是否是最终点
    var checkLastPos = function(){
        if(f.path && f.path.length > 1){
            f.path.shift();
            f.moveto.x = f.path[0].x;
            f.moveto.z = f.path[0].z;
            return false;
        }
        f.moving = false;
        return { type: "move", fighter: f, moving: 0 };
    };
    //重置目标点
    x = f.moveto.x;
    y = f.moveto.z;
    var dist = Math.sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y)), speed = f.speed*during;
    //靠近目标范围
    if (dist <= f.moveto.near) {
        return checkLastPos();
    }
    //距离目标点不足一步
    dist = speed / dist;
    if (dist >= 1) {
        f.x = x;
        f.y = y;
        return checkLastPos();
    }
    //按每步距离拆分
    f.x += (x - f.x) * dist;
    f.y += (y - f.y) * dist;
    f.moving = true;
    return { type: "move", fighter: f, moving: f.moving ? 1 : 2 };
};
/**
 * @description 移动
 * @param {Json}f 战斗对象
 */
const fighterMove = function (f,delta) {
    let d = delta / frame[frame.type];
    return _move(f,d || 1);
};
/**
 * @description 渲染
 * @param {Json}e
 * @param { number } mapId
 */
const _show = function (e,mapId) {
    if(e && e.moving === 0){
        if(Move.table[mapId].tid != -1){
            Move.deleteTarget(Move.table[mapId],mapId);
        }
        delete Move.table[mapId];
    }
    try{
        Move.render && e && sceneShow && sceneShow.move(e);
        !Move.render && e && updateCache(e);
    }catch(e){
        console && console.error(e);
    }
    if(e && e.moving === 0 && Move.stopBack){
        Move.stopBack(e);
        Move.setStopBack(null);
    }
};
/**
 * @description 检查两个对象是否相同（对应的值相同）
 * @param {Json}obj1 obj2 键值数量以obj1为准
 */
const checkObjSame = (obj1,obj2) => {
    if(typeof obj1 !== "object" || !!obj1 !== !!obj2)
        return;
    for(let k in obj1){
        if(obj1[k] != obj2[k])
            return false;
    }
    return true;
};
const checkIsGod = (skill,mapId) => {
    let f = getFighter(mapId);
    if(!f)
        return;
    for(let k in f.skill){
        if(f.skill[k].id === skill.id)
            return f.skill[k].hand === 2;
    }
};
/**
 * @description 获取fighter
 */
export const getFighter = (mapId) => {
    return cacheList && cacheList[mapId] && cacheList[mapId].fighter || mapList && mapList[mapId];
}
/**
 * @description 更新位置信息
 */
const updateCache = (e) => {
    let f = getFighter(e.fighter.mapId);
    if(!f){
        return;
    }
    f.x = e.fighter.x;
    f.y = e.fighter.y;
}
/**
 * @description 设置摄像机位置
 * @param c 
 * @param f 
 * @param s 
 * @param n 
 */
const setCamera = (c,f,s,n) => {
    let d = cDd({x:c[0],y:c[2]},{x:f[0],y:f[2]}),r;
    return [f[0],f[2],0];
};
/**
 * @description
 */
const getFighterAttr = (f) => {
    let attr = ["sid", "camp", "career_id", "x", "y", "z", "hp", "max_hpCount", "god", "mapId", "level", "useSkillTime", "curTarget", "curHeadTarget", "damageList", "state", "area", "taskInfo", "handMove", "type", "module", "name", "attackCount", "show_type", "isMirror", "path", "moveto", "speed"],
        o = {};
    for(let k in attr){
        o[attr[k]] = f[attr[k]];
    }
    return o;
}
// =========================================== 立即执行
(renderHandlerList as any).add((msg)=>{
    if(msg.type !== "before"){
        return;
    }
    let delta = msg.delta;
    Move.loop();
    // globalSend("drop_fun");
    let __self;
    if(sceneShow){
        __self = sceneShow.getSelf();
        
        if(!__self || mgr_data.name == "loginscene" || mgr_data.name == "uiscene")
            return;
        let c = mgr_data.camera[mgr_data.name],
            cp = c._show.old.transform.position,
            fp = __self._show.old.transform.position,
            r;
        if(__self){
            let fighterPosition = [fp[0],fp[1],fp[2]];
            globalSend("fighter_position",fighterPosition);
        }
        // globalSend("runShowFun",msg);
        if(!c.hand && (cp[0] != fp[0] || cp[2] != fp[2])){
            r = setCamera(cp,fp,__self.speed,1);
            r && mgr.setOnlyPos(c, r);
        }
    }
});
// =========================================== 测试
let $time = 0;