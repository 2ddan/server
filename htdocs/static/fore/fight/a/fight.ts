/**
 * 战斗单场景及前台场景管理
 * 后台不需要此场景管理，而是由erlang端+v8协同管理
 * 
 */

 // ================================ 导入
//pi
import { NavMesh } from "pi/ecs/navmesh";
//fight
import { Fighter} from "./class";
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
      buffs,
      level?
    ){
        this.level = level || 10;
        this.now = Date.now();
        this.buffs = buffs;
        Util.checkProbability(0,this);
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
    //buff配置表，策划需求buff内部嵌套buff，战斗过程中需要在配置表中寻找新的触发buff,此方法最简单
    buffs = {}

    /**
     * @description 事件监听函数
     * @param evs 战斗事件列表
     */
    public listener(evs: any):void{}
    /**
     * @description 战斗结束回调
     * @param r 战斗结果 0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
     * @return true 战斗真正结束; false 战斗不结束，继续朝战斗里面放怪
     */
    public overCallback(r:number,s: Scene):boolean{return true}
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
        // console.log("events list length:: ",evs.length);
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
     *  [
     *     string, *type必须
     *     参数：..., 【全部参数可选】
     *     .
     *     .
     *  ]
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
     * @description 场景
     */
    static scenes: Scene
    /**
     * @description 创建场景
     */
    static create(type:any,buffs,level?:number,server?:any){
        let s: Scene = new Scene(type,buffs,level);
        this.server = server;
        this.scenes = s;
        return s;
    }
    /**
     * @description 销毁场景
     */
    static destroy(s:Scene){
        this.scenes = null;
        s.destroy();
    }
    /**
     * @description 推动所有场景
     * @param now 当前时间戳
     */
    static loop(){
        if(!this.scenes)
            return;
        let v = this.scenes,
            evs = v.loop(),
            r = Policy.check(v);
        if(v.level > 1 && r>0 && v.overCallback && v.overCallback(r,v)){
            v.overCallback = null;
        }
    }
    static time = 0
    /**
     * @description 设置战斗主循环到帧管理器
     */
    static startFrame(frame):void{
        this.time = Date.now();
        this.frame = frame;
        this.frame.setInterval(1000/this.FPS);
        this.frame.setPermanent(()=>{
            // console.log(Date.now()-this.time);
            // this.time = Date.now();
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

