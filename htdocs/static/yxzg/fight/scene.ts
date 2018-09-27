 /**
  * 战斗逻辑场景
  */
// ==================================== 导入
//mod
import { Util } from "app/mod/util";
//fight
import { Fighter } from "./class";
import { EType } from "./analyze";
import { Policy } from "./policy";
import { Util as FUtil } from "./util";

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
    fighters: Map<number,Fighter> = new Map()
    //每个阵营的人数
    fighters_camp = {"1":0,"2":0}

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
    events: Array<any> = []
    //战斗事件监听，每回合结束则
    listener: Function
    //战斗结果 返回0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
    result : number = 0
    // 战斗结束回调
    overBack: Function

    public start(){
        this.startTime = this.now;
        this.setPause(false);
        this.dealEvents();
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
    public insert(f: Fighter,isSelf?: boolean){
        let _f;
        if(this.fighter_id !== 1 || !isSelf){
            this.fighter_id ++;
            f.id = this.fighter_id;
            this.fighters.set(this.fighter_id, f);
            this.fighters_camp[f.camp] += 1;
        }else{
            _f = this.fighters.get(1);
            _f.cards = f.cards;
            _f.cards_hand = [];
            _f.cards_draw = [];
        }
        //初始化抽牌堆
        Policy.initCards(f,this);

        this.addEvents([EType.insert,f]);
    }
    /**
     * 使用卡牌
     * @param index 卡牌位置
     * @param tid 目标的fighter_id
     */
    public useCard( fid: number, index: number, tid?: number ): string{
        if(fid !== this.cur_fighter){
            return "It's not your turn!!";
        }
        
        let f = this.fighters.get(fid),r;
        for(let i = 0,len = f.cards_hand.length;i<len;i++){
            if(f.cards_hand[i] && f.cards_hand[i].index == index){
                r = Policy.useOneCard(fid,i,tid,this);
                break;
            }
        }
        r && console.log(r);
        return r;
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
    /**
     * 选择牌
     */
    public selectCard(fid:number,arr: Array<any>){
        let f = this.fighters.get(fid);
        if(!f.wait || f.wait[0] !== "selectCard"){
            return "you don't have a 'selectCard' event!";
        }
        //检查选择的牌是否符合要求
        if(f.wait[1][3] === 1 && arr.length != f.wait[1][6]){
            return `you have to select ${f.wait[1][6]} cards!` 
        }else if(f.wait[1][3] === 2 && arr.length > f.wait[1][6]){
            return `you can select ${f.wait[1][6]} cards at most!`
        }
        Policy.selectCard(f,arr,this);
    }
};
export class FSmgr{
    /**
     * @description 后台通讯模块
     */
    static net
    /**
     * @description 场景
     */
    static scene: FScene
    /**
     * @description 创建场景
     */
    static create(){
        this.scene = new FScene();
    }
    /**
     * @description 开始战斗
     */
    static start(){
        this.scene.start();
        this.frame();
    }
    /**
     * @deprecated 设置战斗定时器，第一次运行不执行loop, 给战斗逻辑1帧的缓冲时间。
     *             例如在战斗开始前就往战斗中添加所有战斗者，这些事件会在缓冲的一帧推给监听器，而不会跟其他战斗事件一起
     */
    static frame(){
        let f = 1000/FSmgr.scene.FPS,
            t = Date.now(),
            d, 
            r;
        if(FSmgr.scene.timerRef !== null){
            FSmgr.scene.loop();
        }
        d = Date.now() - t-f;
        d = d>16?16:(d>=0?d:0);
        //设置下一帧循环调用
        if(d>0)console.log("The fight loop is too long::",d);
        FSmgr.scene.timerRef = setTimeout(FSmgr.frame,f-d);
        //抛出所有战斗事件
        let evs = FSmgr.scene.events;
        // console.log("events list length:: ",evs.length);
        FSmgr.scene.events = [];
        FSmgr.scene.listener && FSmgr.scene.listener({now:FSmgr.scene.now,events:evs});
        //检查战斗阵营胜负
        r = Policy.check(FSmgr.scene);
        if(r>0 && r !== FSmgr.scene.result){
            FSmgr.scene.addEvents([EType.over,r]);
        }
        FSmgr.scene.result = r;
    }
    /**
     * @description 重置战斗,开始另一场战斗
     */
    static reset(){
        clearTimeout(FSmgr.scene.timerRef);
        FSmgr.scene.events = [];
        FSmgr.scene.fighter_id = 1;
        FSmgr.scene.startTime = 0;
        FSmgr.scene.fightTime = 0;
        FSmgr.scene.now = 0;
        FSmgr.scene.timerRef = null;
        FSmgr.scene.round = 0;
        FSmgr.scene.roundTime = 0;
    }
    /**
     * @description 销毁战斗场景
     **/  
    static destroy():boolean{
        FSmgr.scene.setPause(true);
        FSmgr.scene.fighters.clear();
        FSmgr.scene.events = [];
        FSmgr.scene.fighter_id = 0;
        FSmgr.scene.startTime = 0;
        FSmgr.scene.fightTime = 0;
        FSmgr.scene.now = 0;
        FSmgr.scene.timerRef = null;
        FSmgr.scene.round = 0;
        FSmgr.scene.roundTime = 0;
        return true;
    }
    /**
     * @description 获取卡牌描述
     * @param fid 玩家id
     * @param tid 目标id
     * @param cidx 卡牌在牌堆中的位置
     * @returns [[string,{color:"#ffff00",...}],...]
     */
    static blendDes(fid,tid,cidx): Array<any[]>{
        if(this.net){
            return;
        }
        let f = this.scene.fighters.get(fid),
            t = this.scene.fighters.get(tid),
            c = f.cards[cidx];
        return FUtil.blendDes(f,t,c,this.scene);
    }
    /**
     * @description 获取玩家buff详情
     * 
     * @returns [{icon:"图标名字",number:0（显示的数字）,des:"描述"},...]
     */
    static blendBuff(fid):any{
        if(this.net){
            return;
        }
        let f = this.scene.fighters.get(fid);
        return FUtil.blendBuff(f,this.scene);
    }
    
}