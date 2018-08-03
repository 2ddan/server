/**
 * 战斗决策
 */
 // ================================ 导入
//fight
import { Skill, Fighter, Buff, Card } from "./class"
import { FScene } from "./scene";
import { Util } from "./util";
import { EType } from "./analyze";
import { Formula } from "./cfg/formula";


 // ================================ 导出
export class Policy{
    /**
     * @description 执行战斗逻辑
     */
    static run(scene: FScene):void{
        let f = scene.fighters.get(scene.cur_fighter);
        if(caclRound(f,scene)){
            return ;
        }
        single(f,scene);
    }

    /**
     * @description 设置fighter是否被移除
     *              战斗检查结果， 返回0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
     * @param scene 战斗场景
     */
    static check(scene: FScene){
        var limitTime = scene.limitTime || Infinity;
        if (scene.fightTime >= limitTime) return 3;
        var left = 0, right = 0;
        scene.fighters.forEach(f => {
            if (f.camp === 1 && f.hp > 0)
                left++;
            if ((f.camp === 2 && f.hp > 0) || (f.camp === 0 && f.hp > 0))
                right++;
        });
        if (left > 0 && right > 0)
            return 0;
        return left > 0 ? 1 : 2;
    };
    /**
     * @description 初始化牌堆
     */
    static initCards(f: Fighter, scene: FScene){
        let inherent = [];
        for(let i = 0,len = f.cards.length;i<len;i++){
            let c = f.cards[i];
            if(c.inherent >scene.round){
                inherent.push(c);
                f.cards.slice(i,1);
                i--;
            }
        }
        f.cards = inherent.concat(Util.randomSort(f.cards));
    }
    
     
    /**
     * 使用一张卡牌
     * @param fid 使用者的fighter_id
     * @param index 卡牌在手牌中的位置
     * @param tid 
     */
    static useOneCard(fid: number,index: number,tid: number,scene: FScene): string{
        let f: Fighter = scene.fighters.get(scene.cur_fighter),
            t: Fighter = scene.fighters.get(tid),
            c: Card = f.cards_hand[index];
        if(!c){
            return `There's not the card which index is ${index}`;
        }
        delete f.cards_hand[index];
        if(c.deal_type > 0){
            f.cards_expend.push(c);
        }else{
            f.cards_scrap.push(c);
        }
        f.cards_spread = c;
        f.cards_use = c;
        f.cards_targets = seletTargets(f,c,tid,scene);
        scene.addEvents([EType.useCard,scene.cur_fighter,index,tid]);
        return "";
    }
    /**
     * @description 一个英雄回合结束,处理手牌的去处，弃牌堆、消耗堆、留在手牌堆
     *              重置属性
     */
    static endSingleRound(f: Fighter,scene: FScene): void{
        let out = {
                scrap: [],
                expend: []
            },
            e: Card,
            temp:string;
        f.round += 1;
        for(let i = f.cards_hand.length-1;i>0;i--){
            e = f.cards_hand[i];
            if(!e){
                f.cards_hand.splice(i,1);
                continue;
            }
            if(e.deal_type > 0){
                temp = "expend";
            }else if(f.cards_rest){
                temp = "scrap";
            }
            if(temp){
                out[temp].push(e.index);
                f["cards_"+temp].push(e);
                f.cards_hand.splice(i,1);
                temp = "";
            }
        }
        //回合结束后触发buff
        fireBuff(f,f,8,scene);
        restAttr(f,scene);
        scene.addEvents([EType.endSingleRound,f.id,out.scrap,out.expend]);
    }
}

 // ================================ 本地
/**
 * @description 计算回合数，选择下一个出手的英雄
 * @param f 当前出手的fighter
 * @param scene 战斗场景
 * @returns 是否跳出当前帧，不进行后面的战斗计算
 */
const caclRound = (f: Fighter, scene: FScene): boolean => {
    let next;
    if(!f){
        scene.cur_fighter = nextFighter(scene);
        return true;
    }
    if(f.round >= scene.round){
        next = nextFighter(scene);
        //继续当前回合下一个出手的fighter
        if(next){
            //回合开始前触发buff
            fireBuff(f,f,7,scene);
            scene.cur_fighter = next;
            scene.addEvents([EType.singleRound,next]);
            //触发抽牌前的buff
            fireBuff(f,f,1,scene);
            takeCards(f,scene);
            //触发抽牌后的buff
            fireBuff(f,f,2,scene);
        //大回合结束
        }else{
            scene.round += 1;
            scene.cur_fighter = 0;
            scene.addEvents([EType.endRound,next]);
            //TODO.. 计算回合结束buff
            //  
        }
        return true;
    }

}
/**
 * @description 执行单个fighter决策
 */
const single = (f: Fighter,scene: FScene): void => {
    // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
    if (f.hp <= 0 && f.maxHp > 0) {
        return ;
    }
    // 如果是眩晕状态，不能释放技能,不能移动
    if (f.stun) {
        return;
    }
        
    //释放技能
    //TODO....
    //释放光环技能        
    // autoSpread(f, 4, s);
    //检查buff是否该清除
    buffTimerCalc(f, scene);
    //延迟一帧真正释放技能和卡牌，与使用错开
    checkRelease(f,"cards",releaseCard,scene);
    checkRelease(f,"skills",releaseSkill,scene);
}
/**
 * 获取下次出手的英雄
 * 
 */
const nextFighter = (scene: FScene): number => {
    let r:Fighter,// 该回合剩余未出手fighter中该出手者
        func = (s: Fighter,t: Fighter): Fighter => {
            if(!s){
                return t; 
            }
            let d:number = t.speed - s.speed;
            if(d>0 || (d === 0 && t.camp < s.camp)){
                return t;
            }
        };
        scene.fighters.forEach((e: Fighter, k: number)=> {
        if(e.round < scene.round && e.hp > 0){
            r = func(r,e);
        }
    });
    return r?r.id:0;
}
/**
 * @description 抽牌,先从抽牌堆中抽一次，如果抽牌堆中牌抽完还不够，则把弃牌堆重置到抽牌堆，再抽一次
 */
const takeCards = (f: Fighter, scene: FScene) => {
    let num: number = f.cards_max-f.cards_reduce+f.cards_add,
        left: Array<Card>,
        len: number;
    f.cards_hand = f.cards.splice(0,num);
    len = f.cards_hand.length;
    if(len)scene.addEvents([EType.takeCards,f.id,getCardsIndex(f.cards_hand)]);
    if(len < num){
        sortCards(f, scene);
        left = f.cards.splice(0,num - len);
        f.cards_hand = f.cards_hand.concat(left);
        scene.addEvents([EType.takeCards,f.id,getCardsIndex(left)]);
    }
}
/**
 * @description 获取卡牌列表的位置，返回位置组成的数组，其位置顺序与卡牌顺序一致
 * @param arr 
 */
const getCardsIndex = (arr: Array<Card>) => {
    let c = [];
    for(let i = 0,len = arr.length;i<len;i++){
        c.push(arr[i].index);
    }
    return c;
}
/**
 * @description 重置牌堆
 */
const sortCards = (f: Fighter,scene: FScene): void => {
    let scrap = f.cards_scrap;
    f.cards_scrap = [];
    //怪物的牌不排序，按照配置顺序出牌
    if(f.type == "monster"){
        f.cards = f.cards.concat(scrap);
        return ;
    }
    Util.randomSort(scrap);
    f.cards = f.cards.concat(scrap);
    scene.addEvents([EType.restCards,f.id,getCardsIndex(f.cards)]);
}
/**
 * @description 选择卡牌目标，如果技能目标单一
 * @param f 释放者
 * @param obj 卡牌或者技能
 * @param tid 目标id（玩家手动选择的目标）
 */
const seletTargets = (f: Fighter, obj: any, tid:number, scene: FScene): Array<number> => {
    let r,camp = f.camp,t = obj.target_type;
    //1选择自己
    if(t === 1){
        return [f.id];
    }
    //玩家手动选择己方或敌方1人
    if((t === 12 || t === 2) && obj.target_param === 1 && tid){
        return [tid];
    }
    //确定己方还是敌方
    if(t > 10){
        t -= 1;
        camp = camp === 1 ? 2 : 1;
    }
    r = select(scene.fighters,[["hp",">",0],["camp",camp]]);
    // 3 || 13 随机选择己方或敌方x个
    if(t === 3){
        Util.randomSort(r);
    }
    // 4 || 14 选择己方或敌方血量最少X人
    if(t === 4){
        Util.limitSort(r,"hp",1);
    }
    if(obj.target_param && r.length > obj.target_param){
        r.length = obj.target_param;
    }
    return getCardsIndex(r);
}
/**
 * @description 选择满足条件的fighter
 * @param fighters 
 * @param conds 条件列表 [["hp",">",0],["camp",1]]
 */
const select = (fighters: Map<number,Fighter>,conds: Array<any>) => {
    let r: Array<Fighter> = [];
    fighters.forEach((e)=>{
        if(Util.condsCheck(e,conds)){
            r.push(e);
        }
    });
    return r;
}
/**
 * @description 延迟一帧真正释放技能或卡牌，与使用错开
 * @param func 释放技能或卡牌处理函数
 */
const checkRelease = (f: Fighter,type:string,func: Function, scene: FScene):void => {
    //延迟一帧真正释放技能，与使用技能错开
    if (f[type+"_spread"]) {
        if(f[type+"_use"])
            f[type+"_use"] = undefined;
        else
            func && func(f, scene);
    }
}
/**
 * @description 释放卡牌
 */
const releaseCard = (f: Fighter, scene: FScene): void => {
    let ts = f.cards_targets,
        c = f.cards_spread,
        t: Fighter,
        //计算卡牌作用次数
        count = c.cost_energy == "x"?f.energy:c.damage_count,
        cacl = () => {
            for(let i = 0 ,len = ts.length;i<len;i++){
                t = scene.fighters.get(ts[i]);
                caclCard(f,t,c,scene);
            }
        };
    scene.addEvents([EType.releaseCard,f.id,ts,c.index]);
    addBuffs(f,ts,c,1,scene);
    //TODO...触发使用卡牌前的buff
    for(let i = 0,len = ts.length;i<len;i++){
        fireBuff(f,scene.fighters.get(ts[i]),3,scene);
    }
    //fireBuff();
    for(let j = 0;j<count;j++){
        cacl();
        if(!c.target_inherit){
            ts = seletTargets(f,c,null,scene);
        }
    }
    //计算吸血
    caclStealHp(f,scene);
    //fireBuff();
    if(f.damage){
        //TODO...触发使用卡牌造成伤害后的buff
        //fireBuff();
        f.damage = 0;
    }
    addBuffs(f,ts,c,2,scene);
    //TODO...触发使用卡牌后的buff
    for(let i = 0,len = ts.length;i<len;i++){
        fireBuff(f,scene.fighters.get(ts[i]),4,scene);
    }
    //重置释放卡牌,会有buff触发某个释放的buff再释放一次
    f.cards_spread = f.cards_spread_next;
    f.cards_targets = f.cards_targets_next;
    f.cards_spread_next = undefined;
    f.cards_targets_next = undefined;
}
/**
 * @description 释放技能
 */
const releaseSkill = (f: Fighter, scene: FScene): void => {

}
/**
 * @description 重置属性
 */
const restAttr = (f: Fighter, scene: FScene): void => {
    let r = [];
    if(!f.save_block && f.block > 0){
        f.block = 0;
        r.push(["block",0]);
    }
    if(r.length)scene.addEvents([EType.restAttr,f.id,r]);
}
/**
 * @description 获得技能计算的公式参数列表
 * @param f 使用者
 * @param t 使用目标
 * @param prop 使用道具 卡牌或者技能
 * @param [Max, Min, Pow, F, T, Card||Skill,buff,AF]
 */
const getArgArr = (f: Fighter, t: Fighter, prop:any, buff?: Buff,af?:Fighter): Array<any> => {
    let arr = [];
    arr[0] = function (a, b) { return a > b ? a : b };
    arr[1] = function (a, b) { return a < b ? a : b };
    arr[2] = Math.pow;
    arr[3] = f;
    arr[4] = t;
    arr[5] = prop;
    arr[6] = buff;
    arr[7] = af;
    return arr;
}
/**
 * @description 计算卡牌效果
 */
const caclCard = (f: Fighter, t: Fighter, c: Card, scene: FScene): void => {
    let r,s = "normal",rest = [];
    //计算伤害
    if(c.damage){
        caclDamage(f,t,c,scene);
        fireBuff(t,f,5,scene);
        if(f.damage){
            fireBuff(t,f,6,scene);
        }
    }
    //计算格挡
    if(c.block){
        caclBlock(f,t,c,scene);
    }
    
}
/**
 * 计算卡牌伤害
 */
const caclDamage = (f: Fighter, t: Fighter, c: Card, scene: FScene):void => {
    let r,s = "normal",rest = [];
    if(c.damage_type){
        s = "true";
    }
    r = Util.call(Formula["damage_"+s],getArgArr(f,t,c));
    if(!c.damage_type){
        r = r - t.block;
        if(r>=0){

            if(t.block > 0){

                t.block = 0;
                rest.push(["block",0]);
            }
        }else{
            rest.push(["block",t.block+r]);
            t.block = -r; 
            r = 0;
        }
    }
    t.hp -= r;
    rest.push(["hp",t.hp]);
    scene.addEvents([EType.damage,f.id,t.id,r]);
    scene.addEvents([EType.restAttr,t.id,rest]);
    rest = [];
}
/**
 * 计算卡牌伤害
 */
const caclBlock = (f: Fighter, t: Fighter, c: Card, scene: FScene):void => {
    let r,rest = [];
    r = Util.call(Formula["block"],getArgArr(f,t,c));
    if(r > 0){
        f.block += r;
        rest.push(["block",f.block]);
        scene.addEvents([EType.restAttr,t.id,rest]);
        rest = [];
    }
}
/**
 * @description 添加buff
 * @param ts fighter id 组成的数组
 * @param prop 卡牌或者技能
 * @param ta 卡牌添加时间点
 */
const addBuffs = (f: Fighter, ts: Array<number>, prop: any, ta:number,  scene: FScene): void => {
    let t: Fighter,b,buff;
    for(let i = 0,len = ts.length;i<len;i++){
        t = scene.fighters.get(ts[i]);
        for(let j = 0,leng = prop.buffs.length;j<leng;j++){
            b = prop.buffs[j];
            buff = new b.buff();
            if(buff.trigger_add === ta){
                addOneBuff(f,t,b.formula(buff),scene);
            }
        }
    }
}
/**
 * @description 添加一个buff
 */
const addOneBuff = (f: Fighter, t: Fighter, b: Buff, scene: FScene) => {
    let index,buff;
    //增加释放buff技能的释放者
    b.AF = f.id;
    //如果再次触发相同buff 应该覆盖旧buff
    index = Util.indexByAttr(t.buffs, "id", b.id);
    if (index < 0) {
        if(b.continue_round){
            b.life = scene.fightTime+b.continue_round;
        }
        t.buffs.push(b);
        scene.addEvents([EType.addBuff,f.id,t.id,b.id]);
        if(b.trigger_add === 0){
            excitationBuff(f,t,b,scene);
        }
    }else {
        buff = t.buffs[index];
        //叠加时间
        if(buff.cover_rule === 1){
            buff.life += b.continue_round;
            buff.continue_round += b.continue_round;
            scene.addEvents([EType.updateBuff,t.id,b.id,"continue_round",buff.continue_round]);
        //叠加效果
        }else if(buff.cover_rule === 2){
            excitationBuff(f,t,buff,scene);
        }
    }
}
/**
 * @description 计算技能或卡牌吸血
 * @param f 
 * @param scene 
 */
const caclStealHp = (f: Fighter, scene: FScene):void => {

}
/**
 * @description 激活buff
 */
const fireBuff = (f: Fighter, t: Fighter, type: Number, scene: FScene) => {
    var b: Buff;
    for (var i = 0, len = f.buffs.length; i < len; i++) {
        b = f.buffs[i];
        if (!b || b.trigger_excitation !== type)
            continue;
        if(!Util.call(b.condition,getArgArr(f,t,null,b))){
            continue;
        }
        // 事件次数到了，触发buff  新增buff目标判断
        b.effectiv_target == "T" ? excitationBuff(f, t, b, scene) : excitationBuff(f, f, b, scene);
    }
}
/**
 * @description 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
 */
const getBuffEffectValue = (s: Function, AF: number,F:Fighter, T: Fighter,  buff: Buff, scene: FScene) => {
    return Util.call(s,getArgArr(F,T,null,buff,scene.fighters.get(AF)));
};
/**
 * @description 激发buff效果 
 */
const excitationBuff = (f: Fighter, t: Fighter, b: Buff, scene: FScene) => {
    var r, v;
    b.eventCount++;
    console.log("excitationBuff",b.id);
    if (!Util.checkProbability(b.probability, scene))//检查生效概率
        return;
    console.log("excitationBuff ok :: ",b.id);
    r = getBuffEffectValue(b.effect_formula, b.AF, f,t,b, scene);
    v = r;
    if (b.effect_type === "hp") {
        r = t.maxHp > t.hp + r ? r : t.maxHp - t.hp;
        t[b.effect_type] += r;
    } else if (b.effect_type === "energy") {
        r = t.max_energy > t.energy + r ? r : t.max_energy - t.energy;
        t[b.effect_type] += r;
    }else {
        b.addValue += r;
        t[b.effect_type] += r;
    }
    scene.addEvents([EType.effect,f.id,t.id,b.id,b.effect_type,r]);
};
/**
 * @description 清除buff
 */
const clearBuff = (f: Fighter, b: Buff, scene: FScene) => {
    let per, e;
    if (!b.addValue)
        return;
    f[b.effect_type] -= b.addValue;
    
    // b.effective = b.addValue = 0;
    scene.addEvents([EType.clearBuff,f.id,b.effect_type,b.addValue]);
    // scene.listener && scene.listenEvent.push({ type: "clearBuff", fighter: f, buff: b });
};
// 战斗buff定时事件计算
const buffTimerCalc = function (f,scene: FScene) {
    Util.traversal(f.buff, function (b) {
            clearBuff(f, b, scene);
        return true;
    });
};