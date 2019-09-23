 /**
  * 战斗逻辑场景
  */
// ==================================== 导入
//mod
import { Util } from "app/mod/util";
import { Formula } from "app/mod/formula";
import { CfgMgr } from "../app/mod/cfg_mgr";
import { globalSend } from "../app/mod/pi";
//fight
import { Fighter, Buff, Skill, Scroll } from "./class";
import { EType } from "./analyze";
import { Policy } from "./policy";
import { Util as FUtil } from "./util";
import { ScrollControl } from "./scroll";
import { data as localDB, updata } from "../app/mod/db";

// ==================================== 变量
let status = 0; //是否战斗中 0否，1是

// ==================================== 导出
/**
 * 战斗逻辑场景
 */
export class FScene{
    constructor(seed){
        //初始化随机种子
        this.seed = seed;
    }
    // 随机种子
    seed = 0
    // 当前时间
    now = 0
    //战斗开始时间
    startTime = 0
    // 战斗时间，除了所有暂停时间
    fightTime = 0
    //出手人次
    fightCount = 0
    
    // 当前回合数
    round = 0
    // 回合开始的时间点
    roundTime = 0
    // 是否暂停
    pause = true
    //战斗者id,自增
    fighter_id = 0
    // 战斗者
    fighters: Map<number,Fighter> = new Map()
    //每个阵营的人数 0-敌方 1-己方
    camp_number = {"0":0,"1":0}
    //关卡类型1:"小怪",2:"精英",3:"BOSS",
    stage_type = 0

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
    //战斗状态 0 非战斗状态 1战斗中
    status: number = 0

    /**
     * @description 战斗开始
     */
    public start(){
        this.startTime = this.now;
        this.status = 1;
        this.pause = false;
        // this.now = 0;
        FSmgr.changeStatus(this.status);
        // this.dealEvents();
    }
    /**
     * @description 清除战斗数据
     */
    public destory(){
        this.setPause(true);
        clearTimeout(this.timerRef);
        this.fighters.clear();
        this.events = [];
        this.fighter_id = 0;
        this.startTime = 0;
        this.fightTime = 0;
        this.now = 0;
        this.timerRef = null;
        this.round = 0;
        this.roundTime = 0;
        this.fightCount = 0;
    }
    /**
     * @description 清除上一场战斗相关数据
     */
    public clear(){
        this.fighters.forEach((e,k)=>{
            // if(e.hp <= 0 || e.camp != 1){
                this.fighters.delete(k);
                this.fighter_id -= 1;
            // }
        });
        this.round = 0;
        this.fightCount = 0;
        this.pause  = true;
        this.fightTime = 0;
        this.cur_fighter = 0;
        this.cur_fighter_time = 0;
        this.roundTime = 0;
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
        // this.overBack && this.overBack(-1);
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
        
        this.events = [];
        this.listener && this.listener({now:this.now,events:evs});
    }
    /**
     * @description 战斗结束
     * @param r 战斗结果
     */
    public over(r: number){
        Policy.over(this,r);
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
    static create(seed){
        if(!this.scene){
            this.scene = new FScene(seed);
        }
    }
    /**
     * @description 开始战斗
     */
    static start(){
        this.scene.start();
    }
    /**
     * @description 开始战斗场景循环
     */
    static run(){
        this.scene.setPause(false);
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
        FSmgr.scene.timerRef = setTimeout(FSmgr.frame,f-d);
        Policy.checkRemove(FSmgr.scene);
        //检查战斗阵营胜负
        r = Policy.check(FSmgr.scene);
        if(r>0 && FSmgr.scene.status){
            FSmgr.scene.over(r);
            FSmgr.scene.addEvents([EType.over,r]);
            FSmgr.scene.status = 0;            
            FSmgr.changeStatus(0);
        }
        //抛出所有战斗事件
        let evs = FSmgr.scene.events;
        
        FSmgr.scene.events = [];
        FSmgr.scene.listener && FSmgr.scene.listener({now:FSmgr.scene.now,events:evs});
    }
    /**
     * @description 清除上一场战斗遗留
     */
    static clear(){
        this.scene.clear();
    }
    /**
     * @description 获取某个阵营的数量
     */
    static getFNbyCamp(camp:number){
        let n = 0;
        this.scene.fighters.forEach((e: Fighter,k:number)=>{
            if(e.camp === camp){
                n+=1;
            }
        });
        return n;
    }
    /**
     * @description 销毁战斗场景
     **/  
    static destroy():boolean{
        updata("player.seed",this.scene.seed);
        FSmgr.scene.destory();
        delete FSmgr.scene;
        return true;
    }
    /**
     * 一个英雄回合结束,选择下回合出手英雄
     * 如果所有英雄都出手了，则结束整个大回合
     */
    static endSingleRound(fighter: number): String{
        let f = FSmgr.scene.fighters.get(fighter);
        if(fighter !== FSmgr.scene.cur_fighter || !f){
            return "The fighter is wrong!";
        }

        f.singleRoundEnding = 1;
        //回合结束后触发buff 
        Policy.fireBuff(f,f,33,this.scene);
        Policy.changeIsRound();
        // Policy.endSingleRound(f,FSmgr.scene);
        return "";
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
     * @description 获取卡牌描述
     * @param fid 玩家id
     * @param tid 目标id
     * @param c 卡牌
     * @returns [[string,{color:"#ffff00",...}],...]
     */
    static blendDesByCard(fid,tid,c): Array<any[]>{
        if(this.net){
            return;
        }
        let f = this.scene.fighters.get(fid),
            t = this.scene.fighters.get(tid);
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
        if(!f){
            return [];
        }
        return FUtil.blendBuff(f,this.scene);
    }
    /**
     * @description 获取意图
     * @param fid 拥有者id
     * @param tid 目标id
     */
    static intent(fid,tid){
        if(this.net || this.scene.cur_fighter === fid){
            return;
        }
        let f = this.scene.fighters.get(fid),
            t = this.scene.fighters.get(tid);
        
        if(!f){
            return {};
        }
        if(f.remove){
            return null;
        }
        return FUtil.intent(f,t,this.scene);
    }
    /**
     * @description 使用随机数
     */
    static useSeed(count: number,func: Function){
        var r = this.scene?this.scene.seed:localDB.player.seed,nr;
        while(count > 0){
            r = Util.randNumber(r);
            count --;
        }
        nr = Util.randNumber(r);
        if(this.scene.seed){
            this.scene.seed = nr;
        }else{
            updata("player.seed",nr);
        }
        func(r / 2147483647);
    }
    /**
     * @description 添加buff
     * @param fid fighter id
     * @param buff_id 添加的buff id
     */
    static addBuff(fid,buff_id){
        let f: Fighter = this.scene.fighters.get(fid),buff:Buff = CfgMgr.create(["cfg/buff"],buff_id,Buff);
        Policy.addOneBuff(f,f,buff,this.scene);
    }
    /**
     * @description 添加buff
     * @param prop 卡牌或者技能
     * @param ta 卡牌添加时间点
     */
    static addBuffs(fid:number, prop: any, ta:number): void{
        let f = this.scene.fighters.get(fid);
        // fighter id 组成的数组
        let ts = Policy.seletTargets(f, prop, undefined, this.scene);
        Policy.addBuffs(f, ts, prop, ta, this.scene);
    }
    /**
     * @description 清除buff效果
     */
    static clearBuff(fid:number, b: Buff){
        let f = this.scene.fighters.get(fid);
        Policy.clearBuff(f, b, this.scene);
    }
    /**
     * @description 插入fighter
     */
    static insert(f: Fighter){
        Policy.insert(f,this.scene);
    }

    /**
     * @description 技能使用
     * @param fid 使用人
     * @param skill 技能
     * @param targets 施放目标
     */
    static useSkill(fid: number, skill: Skill, targets: Array<number> = []): string{
        let f = this.scene.fighters.get(fid);
        if(skill.cd_last != 0){
            return "Skill Cooling";
        }
        f.skill_use = skill;
        f.skill_spread = skill;
        f.skill_targets = targets;
        if(targets.length == 0) {
            targets = Policy.seletTargets(f, skill, undefined, this.scene);
        }
        Policy.addBuffs(f, targets, skill, 1, this.scene);
        f.skill[1] = skill.cd;
        let skills = localDB.player.skills;
        skills[0][1] = skill.cd;
        updata("player.skills", skills);
        return "";
    }

    /**
     * @description 卷轴使用，视图层接口
     * @param fid
     * @param index 卷轴在scroll_on中的索引
     * @param targets
     */
    static useScroll(fid: number, index: number, target?: number): string{
        const result = ScrollControl.useScroll(fid, index, this.scene, target);
        if (result === "") {
            const fighter = this.scene.fighters.get(fid);
            globalSend("updateReel", fighter);
        }
        return result;
    }
    static changeStatus(number:number){
        
        status = number;//1为战斗中，0为战斗结束
        // globalSend("mapProgress",status);
        globalSend("updateSkill");
    }
    static isFight (){
        
        return status;
    }
}