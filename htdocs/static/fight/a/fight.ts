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
 * 
 * 释放技能，由客户端发起；服务端验证技能是否符合释放条件
 * 
 * 4.组队：
 * 
 */

 // ================================ 导入
 import { Fighter , Skill, Buff } from "./class"
 import { EType } from "./analyze"
import { Policy } from "./policy";

 // ================================ 导出

/**
 * @description 单场景
 **/  
export class Scene {
    /**
     * 
     * @param name 场景名字
     * @param listener 战斗事件监听器
     * @param overCallback 战斗结束回调
     * @param level 场景级别
     */
    constructor(
      readonly id:any, 
      readonly listener:Function, 
      readonly overCallback:Function, 
      level?
    ){
        this.level = level || 10;
        this.now = Date.now();
        Mgr.scenes.set(this.id,this);
    }
    /**
     * @description 场景级别,决定当前场景事件处理哪些事件，>=1 处理移动, >=2 剩下的
     */
    readonly level = 10
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

    /**
     * @description 开始战斗
     **/  
    public start():boolean{
        this.startTime = this.now;
        return true;
    }
    /**
     * @description 停止场景
     **/  
    public stop(){
        this.overCallback && this.overCallback(-1, this);
    }
    /**
     * @description 主循环
     **/  
    public loop():any{
        this.now = Date.now();
        if(this.pause)
            return false;
        //TODO...遍历战斗池，生成最终事件
        //移动，当前技能释放 
        Policy.run(this);
        let evs = this.listenEvent;
        this.listenEvent = [];
        return {now:this.now,events:evs};
    }
    /**
     * @description 暂停
     **/  
    public setPause(b : boolean){
        if(this.pause === b){
            return;
        }
        if(this.pause){
            this.fightTime += (this.now - this.startTime);
        }
        this.pause = b;
    }
    /**
     * @description 销毁战斗场景
     **/  
    public destroy():boolean{
        Mgr.scenes.delete(this.id);

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
}

/**
 * @description 场景管理
 **/  
export class Mgr{
    /**
     * @description 场景表
     */
    static scenes = new Map<string,Scene>()
    /**
     * @description 推动所有场景
     * @param now 当前时间戳
     */
    static loop(){
        Mgr.scenes.forEach((v: Scene,k: any)=>{
            let evs = v.loop();
            v.listener && v.listener(evs);
        })
    }
    /**
     * @description 设置战斗主循环到帧管理器，每16ms进一次
     */
    static setFrame(frameMgr: any):void{
        let t = Date.now();
        frameMgr.setPermanent(()=>{
            let tt = Date.now();
            if(tt-t>=frame){
                Mgr.loop();
                t = tt;
            }
        })
    }
}
 // ================================ 本地
 /**
  * @description 帧率,frameMgr帧率是16ms,所以控制在最多3帧跑一次战斗计算
  */
 const frame = 48;



