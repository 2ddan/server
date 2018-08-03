 /**
  * 战斗逻辑场景
  */
// ==================================== 导入
import { Fighter, Card } from "./class";
import { Util } from "./util";
import { EType } from "./analyze";
import { Policy } from "./policy";

// ==================================== 导出
/**
 * 战斗逻辑场景
 */
export class FScene{
    constructor(){
        //初始化随机种子
        this.seed = Util.randNumber(0);
    }
    // 随机种子
    seed = 0
    // 当前时间
    now = 0
    //战斗开始时间
    startTime = 0
    // 战斗时间，除了所有暂停时间
    fightTime = 0
    // 当前回合数
    round = 1
    // 回合开始的时间点
    roundTime = 0
    // 是否暂停
    pause = true
    //战斗者id,自增
    fighter_id = 0
    // 战斗者
    fighters: Map<number,Fighter>
    // 当前出手的fighter_id
    cur_fighter: number
    // 当前出手fighter的回合开始时间
    cur_fighter_time: number
    // buff配置表
    buffs: {}
    // 战斗时间限制
    limitTime:number = Infinity
    // 战斗帧率
    FPS = 20
    // 战斗定时器
    timerRef = null
    //每回合战斗事件
    events: Array<any>
    //战斗事件监听，每回合结束则
    listener: Function
    // 战斗结束回调
    overBack: Function

    public start(){
        this.startTime = this.now;
        this.setPause(false);
        this.dealEvents();
        this.frame();
    }

    //战斗主循环
    public loop(){
        this.now = Date.now();
        if(this.pause)
            return false;
        // this.fightTime += (this.now - t);
        this.fightTime += 1000/this.FPS;
        //执行战斗逻辑 
        Policy.run(this);
    }
    /**
     * @deprecated 设置战斗定时器，第一次运行不执行loop, 给战斗逻辑1帧的缓冲时间。
     *             例如在战斗开始前就往战斗中添加所有战斗者，这些事件会在缓冲的一帧推给监听器，而不会跟其他战斗事件一起
     */
    public frame():void{
        let d = Date.now() - this.now, r;
        d = d>16?16:(d>=0?d:0);
        if(this.timerRef !== null){
            this.loop();
        }
        //设置下一帧循环调用
        console.log("The diffrence between near frame::",d);
        this.timerRef = setTimeout(this.frame,1000/this.FPS-d);
        //抛出所有战斗事件
        let evs = this.events;
        // console.log("events list length:: ",evs.length);
        this.events = [];
        this.listener && this.listener({now:this.now,events:evs});
        //检查战斗阵营胜负
        r = Policy.check(this);
        if(r && this.overBack){
            this.overBack(r);
            this.overBack = null;
        }
    }
    /**
     * @description 停止场景
     **/  
    public stop(){
        this.setPause(true);
        this.overBack && this.overBack(-1);
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
        this.events = [];
        this.fighter_id = 0;
        this.startTime = 0;
        this.fightTime = 0;
        this.now = 0;
        this.timerRef = null;
        this.round = 0;
        this.roundTime = 0;
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
        this.listener && this.events.push(evs);
    }
    /**
     * 处理战斗事件
     */
    public dealEvents(){
        let evs = this.events;
        // console.log("events list length:: ",evs.length);
        this.events = [];
        this.listener && this.listener({now:this.now,events:evs});
    }
    /**
     * @description 加入战斗者
     * @param f 战斗者
     */
    public insert(f: Fighter){
        this.fighter_id ++;
        this.fighters.set(this.fighter_id, f);

        //初始化抽牌堆
        Policy.initCards(f,this);

        this.addEvents([EType.insert,f]);
    }
    /**
     * 使用卡牌
     * @param index 卡牌位置
     * @param tid 目标的fighter_id
     */
    public useCard(fid: number,index: number,tid?: number): string{
        if(fid !== this.cur_fighter){
            return "It's not your turn!!";
        }
        
        Policy.useOneCard(fid,index,tid,this);
        return "";
    }
    /**
     * 使用技能
     * @param index 技能位置
     * @param target 目标的fighter_id
     */
    public useSkill(index,target?){

    }
    /**
     * 一个英雄回合结束,选择下回合出手英雄
     * 如果所有英雄都出手了，则结束整个大回合
     */
    public endSingleRound(fighter: number): String{
        let f = this.fighters.get(fighter);
        if(fighter !== this.cur_fighter || !f){
            return "The fighter is wrong!";
        }
        Policy.endSingleRound(f,this);
        return "";
    }
   
    
}