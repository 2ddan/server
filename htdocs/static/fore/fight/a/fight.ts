/**
 * 帧同屏，状态同步
 * 
 * 请求层：客户端，AI
 * ---- 通过scene
 *    ↓
 * 响应请求：判断请求是否合理，并生成战斗事件
 * ---- 决策判断（policy）
 *    |
 *    | 决策合理，更新信息池
 *    ↓
 * 信息池：包含场景内所有逻辑数据（玩家）
 *    |
 *    | 按照固定帧率(50sm)，分发事件到显示层
 *    ↓
 * 显示层：演播技能特效、动作、伤害，模拟移动
 * 
 * 
 * //保障流畅度
 * 1.释放技能，由客户端发起，不论成功与否，前端都播放技能，cd照样更新；
 *   服务端接收到消息后按照正常技能逻辑走，反馈前端是否释放成功
 *   成功之后更新技能cd，防止后台技能cd没好之前，又请求释放
 * 
 * 2.移动前端按照正常移动走，同时通知后台移动，不等后台回调
 *   每次发起新的移动，会把前端当前位置同时推给后台，保证前后台位置同步
 * 
 * 3.自身伤害进入显示队列，正常情况下伤害都会后于技能释放，不会造成不流畅
 *
 * 
 */

 // ================================ 导入
//pi
import { NavMesh } from "pi/ecs/navmesh";

//fight
import { Fighter , Skill, Buff } from "./class";
import { EType, blend } from "./analyze";
import { Policy } from "./policy";
import { Util } from "./util";

 // ================================ 导出

/**
 * @description 单场景
 **/  
export class Scene {
    /**
     * 
     * @param name 场景名字
     * @param level 场景级别
     */
    constructor(
      readonly type:any, 
      level?
    ){
        this.level = level || 10;
        this.now = Date.now();
    }
    id = 0
    /**
     * @description 场景级别,决定当前场景事件处理哪些事件，=1 处理移动, >=2 剩下的
     */
    level = 10
    // 随机种子
    seed = 0
    // 默认的公共CD配置
    publicCD = 1000
    // 启动时间
    startTime = 0
    // 战斗事件列表
    listenEvent = []
    // 暂停的时间点
    pauseTime = 0
    // 战斗时间，除了所有暂停时间
    fightTime = 0
    // 战斗者
    fighters = new Map<number,Fighter>();
    // 当前时间
    now = 0
    // 是否暂停
    pause = true
    // 本场景战斗限制时间，到时间则结束，调取overCallback
    limitTime = Infinity
    // 战斗定时器
    timerRef = undefined
    // fighter.mapId每添加一个递增
    mapCount = 1
    // 队伍信息，{队伍id:[队伍成员mapId,..]}
    group = {}
    // 寻路
    navMesh: NavMesh

    /**
     * @description 事件监听函数
     * @param evs 战斗事件列表
     */
    public listener(evs: any):void{}
    /**
     * @description 战斗结束回调
     * @param r 战斗结果 0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
     */
    public overCallback(r:number,s: Scene):void{}
    /**
     * @description 战斗有结果时回调，但不一定战斗结束，可能只是一波战斗结束，新的怪还没进入场景
     * @param r 战斗结果 0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
     * @return {boolean} true为最后一波，false战斗还没真正结束
     */
    public over(r:number):boolean{
        return true
    }
    /**
     * @description 开始战斗
     **/  
    public start():boolean{
        this.startTime = this.now;
        this.setPause(false);
        return true;
    }
    /**
     * @description 停止场景
     **/  
    public stop(){
        this.setPause(true);
        this.overCallback && this.overCallback(-1, this);
    }
    /**
     * @description 主循环
     **/  
    public loop():any{
        let t = this.now;
        this.now = Date.now();
        if(this.pause)
            return false;
        // this.fightTime += (this.now - t);
        this.fightTime += 50;
        //移动，当前技能释放 
        Policy.run(this);
        let evs = this.listenEvent;
        this.listenEvent = [];
        this.listener && this.listener({now:this.now,events:evs});
    }
    /**
     * @description 暂停
     **/  
    public setPause(b : boolean){
        if(this.pause === b){
            return;
        }
        this.pause = b;
    }
    /**
     * @description 销毁战斗场景
     **/  
    public destroy():boolean{
        this.setPause(true);
        this.fighters.clear();
        this.listenEvent = [];
        this.mapCount = 0;
        this.group = {};
        return true;
    }
    /**
     * @description 添加事件
     * @param {Json}evs 推向前端的场景事件
     *  {
     *     type：string, *必须
     *     参数：..., 【全部参数可选】
     *     .
     *     .
     *  }
     * @param {EType}type
     **/  
    public addEvents(evs: any[]): void{
        this.listener && this.listenEvent.push(evs);
    }
    /**
     * @description 设置寻路处理器
     */
    public setNavMesh(n: NavMesh){
        this.navMesh = n;
    }
}

/**
 * @description 场景管理
 **/  
export class FMgr{
    /**
     * @description 场景的数量
     */
    static scenesId = 1
    /**
     * @description 帧率20,50sm/f
     */
    static FPS = 20
    /**
     * @description 帧管理器
     */
    static frame
    /**
     * @description 后台通讯接口列表
     */
    static server:any
    /**
     * @description 场景表
     */
    static scenes = new Map<number,Scene>()
    /**
     * @description 创建场景
     */
    static create(type:any,level?:number,server?:any){
        let s: Scene = new Scene(type,level);
        s.id = this.scenesId++;
        this.server = server;
        this.scenes.set(s.id,s);
        return s;
    }
    /**
     * @description 销毁场景
     */
    static destroy(s:Scene){
        this.scenes.delete(s.id);
        s.destroy();
    }
    /**
     * @description 推动所有场景
     * @param now 当前时间戳
     */
    static loop(){
        this.scenes.forEach((v: Scene,k: any)=>{
            let evs = v.loop(),
                r = Policy.check(v);
            if(r>0 && v.over && v.over(r)){
                v.overCallback && v.overCallback(r,v);
                v.over = null;
            }
        })
    }
    /**
     * @description 设置战斗主循环到帧管理器，每16ms进一次
     */
    static startFrame(frame):void{
        this.frame = frame;
        this.frame.setInterval(1000/this.FPS);
        this.frame.setPermanent(()=>{
            this.loop();
        })
    }
    /**
     * @description 设置后台通讯接口
     * @param nr 接口列表
     */
    static setNetRequest(nr: any){
        this.server = nr;
    }
    /**
     * @description 向后台同步战斗事件
     * @param type 事件类型，同EType
     * @param param 事件接收参数，前后台一致
     * @param callback 事件通讯回调，部分事件需要后台返回成功，再执行，就必须在回调里面调用
     */
    static netRequest(type: string, param: any, callback?: Function){
        if(this.server && this.server[type]){
            this.server[type](param,callback);
        }
    }
    /**
     * @description 创建寻路对象
     * @param 
     */
     static createNavMesh(d){
        const navMesh = new NavMesh();
        //加载场景寻路配置   
        navMesh.load(d);
        return navMesh;
     }
}
 // ================================ 本地

 // ================================ 立即执行
 /**
  * @description 开始循环
  */
//  FMgr.startFrame();

