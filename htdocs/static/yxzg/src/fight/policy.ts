/**
 * 战斗决策
 */
 // ================================ 导入
//mod
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { Common } from "app/mod/common";
import { Util } from "app/mod/util";
//fight
import { Skill, Fighter, Buff, Card } from "./class";
import { Util as FUtil } from "./util";
import { FScene } from "./scene";
import { EType } from "./analyze";

import { CardControl } from "./card";



 // ================================ 导出
export class Policy{
    /**
     * @description 执行战斗逻辑
     */
    static run(scene: FScene):void{
        let f;
        
        if(!scene.status){
            return;
        }
        f = scene.fighters.get(scene.cur_fighter);
        if(caclRound(f,scene)){
            return ;
        }
        //添加初始buff
        scene.fighters.forEach((f,id)=> {
            if(f.init === 0){
                return initFighter(f,scene);
            }
        })
        // single(f,scene);
        if(!single(f,scene) && f.ai && f.ai_end_round === 0){
            ai(f,scene);
        }
        //每计算一次，检查是否有fighter需要被移除
        scene.fighters.forEach((f,id)=> {
            if(f.hp <= 0 && !f.remove && !f.revive){
                f.remove = 1;
                scene.camp_number[f.camp] -= 1;
                scene.addEvents([EType.remove,id]);
                return;
            }
        })
        
    }
    /**
     * @description 加入战斗者
     * @param f 战斗者
     */
    static insert(f: Fighter,scene: FScene, isSelf?: boolean){
        let _f: Fighter,ra = ["cards","energy","hp","min_hp","max_hp","money","field","strength","speed","brain","vulnerability","agility","un_attack","un_block","god","thorns","artifact","save_block"];
        if(scene.fighter_id !== 1 || !isSelf){
            scene.fighter_id ++;
            f.id = scene.fighter_id;
            scene.fighters.set(scene.fighter_id, f);
            scene.camp_number[f.camp] += 1;
        }else{
            _f = scene.fighters.get(1);
            _f.cards_hand = [];
            _f.cards_scrap = [];
            _f.cards_expend = [];
            _f.cards_draw = [];
            for(let i =0,len = ra.length;i<len;i++){
                _f[ra[i]] = f[ra[i]];
            }
            f = _f;
            f._show = undefined;
        }
        f._round = f.round = 0;
        scene.addEvents([EType.insert,f]);
        //初始化,牌堆、技能、卷轴
        for(let k in mod){
            if(mod[k].insert){
                mod[k].insert(f,scene);
            }
        }
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
            if (f.camp === 1 && !f.remove)
                left++;
            if (f.camp === 0 && !f.remove)
                right++;
        });
        if (left > 0 && right > 0)
            return 0;
        return left > 0 ? 1 : 2;
    };
    /**
     * @description 战斗结束
     */
    static over(scene: FScene){
        scene.fighters.forEach(f => {
            if(f.hp <= 0){
                return;
            }
            f.field += 1;
            buffTimerCalc(f,scene);
        })
        for(let k in mod){
            if(mod[k].over){
                mod[k].over(scene);
            }
        }
    }
    /**
     * @description 一个英雄回合结束,处理手牌的去处，弃牌堆、消耗堆、留在手牌堆
     *              重置属性
     */
    static endSingleRound(f: Fighter,scene: FScene): void{
        f.round = f._round = scene.round;
        if(f.ai){
            f.ai_end_round = 0;
        }
        for(let k in mod){
            if(mod[k].endSingleRound){
                mod[k].endSingleRound(f,scene);
            }
        }
        scene.fighters.forEach(f=>{
            if(f.hp>0 || f.revive){
                scene.addEvents([EType.updateBuff,f._class,f.id]);
            }
        })
    }
    /**
     * @description 计算能量
     */
    static caclEnergy(f: Fighter, cost: any, scene: FScene){
        let en = f.energy;
        if(cost == "x"){
            f.energy = 0;
        }else{
            f.energy -= parseInt(cost);
        }
        if(en >= 0){
            scene.addEvents([EType.restAttr,f.id,[["energy",f.energy]]]);
        }
    }
    /**
     * @description 选择卡牌目标，如果技能目标单一
     * @param f 释放者
     * @param obj 卡牌或者技能
     * @param tid 目标id（玩家手动选择的目标）
     */
    static seletTargets(f: Fighter, obj: any, tid:number, scene: FScene): Array<number>{
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
            t -= 10;
            camp = camp === 1 ? 0 : 1;
        }
        r = select(scene.fighters,[["hp",">",0],["camp",camp]]);
        // 3 || 13 随机选择己方或敌方x个
        if(t === 3){
            scene.seed = Util.randomSort(r,scene.seed);
        }
        // 4 || 14 选择己方或敌方血量最少X人
        if(t === 4){
            Util.limitSort(r,"hp",1);
        }
        if(obj.target_param && r.length > obj.target_param){
            r.length = obj.target_param;
        }
        return Util.getObjsValueToArr(r,"id");
    }
    /**
     * @description 添加buff
     * @param ts fighter id 组成的数组
     * @param prop 卡牌或者技能
     * @param ta 卡牌添加时间点
     */
    static addBuffs(f: Fighter, ts: Array<number>, prop: any, ta:number,  scene: FScene): void{
        let t: Fighter,b,buff: Buff,r;
        for(let i = 0,len = ts.length;i<len;i++){
            t = scene.fighters.get(ts[i]);
            for(let j = 0,leng = prop.buff_list.length;j<leng;j++){
                b = prop.buff_list[j];
                buff = CfgMgr.create(["cfg/buff"],b.buff,Buff);
                if(b.fix_attribute){
                    // r = Formula.cacl(b.fix_attribute,FUtil.getArgArr(f,t,prop,scene,buff));
                    // r && 
                    Util.fixObjAttrByArr(buff,b.fix_attribute);
                }
                for(let f = 0;f<3;f++){
                    if(b[`fix_formula${f+1}`]){
                        buff.effects[f][1] = b[`fix_formula${f+1}`];
                    }
                }
                if(buff.trigger_add === ta){
                    Policy.addOneBuff(f,t, buff ,scene);
                }
            }
            Util.limitSort(t.buffs,"debuff",-1);
        }
    }
    /**
     * @description 添加一个buff
     */
    static addOneBuff(f: any, t: any, b: Buff, scene: FScene){
        if(t.artifact>0 && b.debuff){
            t.artifact -= 1;
            scene.addEvents([EType.restAttr,t.id,["artifact",t.artifact]]);
            return;
        }
        let index,buff,_id = t._class == "fighter"?"id":"index";
        //增加释放buff技能的释放者
        b.AF = f[_id];
        //如果再次触发相同buff 应该覆盖旧buff
        index = Util.indexByAttr(t.buffs, "id", b.id);
        if (index < 0) {
            if(b.continue_round){
                b.life = t.round+b.continue_round;
            }
            if(b.continue_field){
                b.field_life = t.field + b.continue_field;
            }
            t.buffs.push(b);
            scene.addEvents([EType.addBuff,t._class,f[_id],t[_id],b.id]);
            if(b.trigger_excitation === 0){
                // Policy.excitationBuff(t,f,b,scene);
                this.fireOne(t,f,b,b.trigger_excitation,scene);
            }
        }else {
            buff = t.buffs[index];
            //叠加时间
            if(buff.cover_rule === 1){
                buff.life += b.continue_round;
                buff.continue_round += b.continue_round;
            //叠加效果
            }else if(buff.cover_rule === 2){
                this.fireOne(t,f,buff,buff.trigger_excitation,scene);
            }else if(buff.cover_rule === 3){
                buff.excitation_max_count += b.excitation_max_count;
            }else if(buff.cover_rule === 4){
                this.fireOne(t,f,buff,buff.trigger_excitation,scene);
                // b.event_count++;
                // if(b.event_count % b.excitation_expect_count === 0){
                //     Policy.excitationBuff(t,f,buff,scene);
                // }
            }else if(buff.cover_rule === 5){
                for(let i =0,len = buff.effect.length;i<len;i++){
                    buff.effect[i][1] += b.effects[i][1];
                }
            }
            if(buff.cover_rule >= 1 && buff.cover_rule <= 5){
                scene.addEvents([EType.updateBuff,t._class,t[_id],b.id]);
            }
        }
        clearTempBuff(t,scene);
    }
    static fireOne(f,t,b,type,scene){
        if(f.hp<=0 && !f.revive){
            return;
        }
        if (!b || b.trigger_excitation !== type || (b.trigger_condition && !Formula.cacl(b.trigger_condition,FUtil.getArgArr(f,t,null,scene,b))))
            return;
        b.event_count++;
        if(b.condition && !Formula.cacl(b.condition,FUtil.getArgArr(f,t,null,scene,b))){
            return;
        }
        if(b.excitation_expect_count && b.event_count % b.excitation_expect_count !== 0){
            return;
        }
        if(b.continue_round && b.life < f.round){
            return;
        }
        // 事件次数到了，触发buff  新增buff目标判断
        this.excitationBuff(f, t, b, scene);
    }
    /**
     * @description 激活buff
     */
    static fireBuff(f: Fighter, t: Fighter, type: Number, scene: FScene){
        var b: Buff;
        for (var i = 0, len = f.buffs.length; i < len; i++) {
            this.fireOne(f,t,f.buffs[i],type,scene);
        }
        clearTempBuff(f,scene);
    }
    /**
     * @description 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
     */
    static getBuffEffectValue(s: string, AF: number,F:Fighter, T: Fighter,  buff: Buff, scene: FScene){
        return Formula.cacl(s,FUtil.getArgArr(F,T,null,scene,buff,scene.fighters.get(AF)));
    };
    /**
     * @description 激发buff效果 
     */
    static excitationBuff(f: Fighter, t: Fighter, b: Buff, scene: FScene){
        var v,r,ts, _id = t._class == "fighter"?"id":"index",reset = [],effect_type,effect_formula,
            addvalue = (t,r) => {
                if(b.add_value[t] === undefined){
                    b.add_value[t] = 0;
                }
                b.add_value[t] += r;
            },
            forMod = ():boolean => {
                for(let k in mod){
                    if(mod[k].excitationBuff && mod[k].excitationBuff(f,t,effect_type,r,reset,scene)){
                        return true;
                    }
                }
            },
            deal = ():void => {
                r = this.getBuffEffectValue(effect_formula, b.AF, f,t,b, scene);
                if (effect_type === "hp") {
                    if(t.type == "fighter"){
                        console.log("buff === ",t.hp,r);
                    }
                    hp(r,t,reset);
                } else if(effect_type === "damage_normal"){
                    r = this.caclDamageNormal(r,f,t,reset,scene);
                    r>0 && hp(-r,t,reset);
                } else if(effect_type === "damage_true"){
                    r>0 && hp(-r,t,reset);
                } else if (effect_type === "energy") {
                    t[effect_type] += r;
                    if(t.energy < 0){
                        t.energy = 0;
                    }
                    reset.push([effect_type,t[effect_type]]);
                } else if(effect_type === "camp_function"){
                    if(r && f.camp_function.indexOf(r) < 0){
                        f.camp_function.push(r);
                    }
                    // reset.push([effect_type,t[effect_type]]);
                }else if(effect_type === "buff"){
                    v = CfgMgr.create(["cfg/buff"],r,Buff);
                    //如果主buff目标是自己，但子buff目标又是技能目标，则需要修正目标，不能继承主buff目标
                    this.addOneBuff(f,t,v,scene);
                    v.AF = b.AF;
                }else if(!forMod()) {
                    if(effect_type.indexOf("#") === 0){
                        effect_type = effect_type.replace("#","");
                        t[effect_type] += r;
                        addvalue(effect_type,r);
                    }else if(effect_type.indexOf("$") === 0){
                        effect_type = effect_type.replace("$","");
                        t[effect_type] = r;
                    }else{
                        t[effect_type] += r;
                    }
                    reset.push([effect_type,t[effect_type]]);
                }
                scene.addEvents([EType.restAttr,t.id,reset]);
                scene.addEvents([EType.effect,t._class,f[_id],t[_id],b.id,effect_type,r]);
            },_for = ():void => {
                for(let j = 0, leng = b.effects.length;j<leng;j++){
                    effect_type = b.effects[j][0];
                    effect_formula = b.effects[j][1];
                    deal();
                }
            };
        console.log("excitationBuff",b.id);
        if (!this.checkProbability(b.probability, scene))//检查生效概率
            return;
        console.log("excitationBuff ok :: ",b.id);
        if(b.target_type === "f"){
            t = f;
        }else if(b.target_type === "af"){
            t = scene.fighters.get(b.AF);
        }else{
            ts = this.seletTargets(f,b,t.id,scene);
            for(let i = 0,len = ts.length;i<len;i++){
                t = scene.fighters.get(ts[i]);
                _for();
            }
            return;
        }
        _for();
    };
    /**
     * @description 重置属性
     * @param se 回合开始(0)还是结束(1)
     */
    static restAttr(f: Fighter, scene: FScene, se?: number): void{
        let r = [];
        if(!se){
            if(!f.save_block && f.block > 0){
                f.block = 0;
            }
            r.push(["block",f.block]);
        }else{
            //能量
            if(f.energy>0 && !f.save_energy){
                f.energy = 0;
            }
            f.energy += f.max_energy;
            r.push(["energy",f.energy]);
            //易伤
            if(f.vulnerability > 0){
                f.vulnerability -= 1;
                r.push(["vulnerability",f.vulnerability]);
            }
        }
        if(r.length)scene.addEvents([EType.restAttr,f.id,r]);
    }
    // 检查概率是否通过
    static checkProbability(probability: number,s: FScene) {
        if (probability < 1) {
            var r = s.seed;
            s.seed = Util.randNumber(r);
            if (probability < r / 2147483647)
                return false;
        }
        return true;
    }
    /**
     * @description 计算普通伤害
     */
    static caclDamageNormal(r: number,f: Fighter,t: Fighter,reset: Array<any>,scene: FScene):number{
        r = r - t.block;
        if(r>=0){
            if(t.block > 0){
                t.block = 0;
                reset.push(["block",0]);
            }
        }else{
            t.block = -r; 
            r = 0;
            reset.push(["block",t.block]);
        }
        return r;
    }
}

 // ================================ 本地
 /**
  * @description 战斗功能模块预定的接口
  */
 enum MOD {
    //插入fighter
    insert,
    //某个fighter的回合开始
    singleRound,
    //当前回合是ai的逻辑
    ai,
    //某个fighter结束回合
    endSingleRound,
    //计算道具或者技能
    release,
    //处理特殊buff效果
    excitationBuff,
    //大回合开始
    startRound,
    //大回合结束
    endRound 
 }
 /**
  * @description 战斗功能模块
  */
 const mod = {
     "card": CardControl
 }
/**
 * @description 初始化战斗者buff
 * @param f 
 * @param scene 
 */
 const initFighter = (f: Fighter, scene: FScene) => {
    let i,len,b;
    //[[100023,["effect_formula",7]]
    for(i=0,len = f.buff_list.length;i<len;i++){
        Policy.addOneBuff(f,f,f.buff_list[i],scene);
    }
    Util.limitSort(f.buffs,"debuff",-1);
    f.buff_list = [];
    f.init = 1;
 }
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
        scene.fighters.forEach(e => {
            Policy.fireBuff(e,e,7,scene);
        });
        return true;
    }else if(f.hp<=0){
        f._round = f.round = scene.round;
    }
    if(f._round>= scene.round){
        next = nextFighter(scene);
        //继续当前回合下一个出手的fighter
        if(next){
            scene.cur_fighter = next;
        //大回合结束
        }else{
            scene.round += 1;
            scene.cur_fighter = 0;
            //TODO.. 计算回合结束buff
            //  
            scene.fighters.forEach(e => {
                Policy.fireBuff(e,e,8,scene);
            });
            scene.addEvents([EType.endRound,scene.round]);
            //每个大回合清除一次buff
            // scene.fighters.forEach((f,id)=> {
            //     buffTimerCalc(f,scene);
            // })
        }
        buffTimerCalc(f,scene);
        return true;
    }else if(f._round== scene.round-1){
        scene.addEvents([EType.singleRound,scene.cur_fighter]);
        //单回合开始前触发buff
        Policy.fireBuff(f,f,21,scene);
        //每个功能完成自己的初始化
        for(let k in mod){
            if(mod[k].singleRound){
                mod[k].singleRound(f,scene);
            }
        }
        scene.fighters.forEach(e=>{
            if(e.hp>0 || e.revive){
                scene.addEvents([EType.updateBuff,e._class,e.id]);
            }
        })
        f._round+= 0.5;
        f.round = scene.round;
    }

}
/**
 * @description 执行单个fighter决策
 */
const single = (f: Fighter,scene: FScene): boolean => {
    let b;
    // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
    if (f.hp <= 0 && f.max_hp > 0) {
        return ;
    }
    // 如果是眩晕状态，不能释放技能,不能移动
    if (f.stun) {
        return;
    }
    //释放光环技能        
    // autoSpread(f, 4, s);
    //检查buff是否该清除
    // buffTimerCalc(f, scene);
    //延迟一帧真正释放技能和卡牌，与使用错开
    //每个功能完成自己的释放
    for(let k in mod){
        if(mod[k].release){
            b = checkRelease(f,k,mod[k].release,scene)||b;
        }
    }
    return b;
}
/**
 * @deprecated ai逻辑
 */
const ai = (f: Fighter, scene: FScene) => {
    let b;
    //每个功能完成自己的ai操作
    for(let k in mod){
        if(mod[k].ai){
            b = mod[k].ai(f,scene)||b;
        }
    }
    
    if(f.ai_end_round === 0){
        scene.addEvents([EType.aiRoundEnd,f.id]);
    }
    f.ai_end_round = 1;
    // if(b){
    //     Policy.endSingleRound(f,scene);
    // }
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
            if(d>0 || (d === 0 && t.camp > s.camp)){
                return t;
            }
            return s;
        };
        scene.fighters.forEach((e: Fighter, k: number)=> {
            if(e.round < scene.round && e.hp > 0){
                r = func(r,e);
            }
        });
    r && Policy.restAttr(r,scene,0);
    return r?r.id:0;
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
const checkRelease = (f: Fighter,type:string,func: Function, scene: FScene):boolean => {
    //延迟一帧真正释放技能，与使用技能错开
    if (f[type+"_spread"]) {
        if(f[type+"_use"])
            f[type+"_use"] = undefined;
        else
            func && func(f, scene);
        return true;
    }
}
/**
 * @description 处理血量
 */
const hp = (_r: number,_f: Fighter,reset: Array<any>) => {
    _r = _f.max_hp > _f.hp + _r ? _r : _f.max_hp - _f.hp;
    if(_r > 0 && _f.hp_effect > 0){
        _r *= _f.hp_effect;
    }
    _f.hp += _r;
    _f.hp = Math.max(_f.hp,_f.min_hp);
    if(_f.hp < 0){
        _f.hp = 0;
    }
    reset.push(["hp",_f.hp]);
}

/**
 * @description 清除buff
 */
const clearBuff = (f: Fighter, b: Buff, scene: FScene) => {
    let _id = f._class == "fighter"?"id":"index";
    if (!b.add_value)
        return;
    for(let k in b.add_value){
        f[k] -= b.add_value[k];
        
        b.add_value[k] = 0;
    }
    // b.effective = b.add_value = 0;
    scene.addEvents([EType.clearBuff,f._class,f[_id],b.id]);
    // scene.listener && scene.listenEvent.push({ type: "clearBuff", fighter: f, buff: b });
};
const clearTempBuff = (f: Fighter,scene: FScene) => {
    Util.traversal(f.buffs, function (b) {
        if(!b.excitation_max_count || b.event_count < b.excitation_max_count){
            return;
        }
        clearBuff(f, b, scene);
        return true;
    });
}
// 战斗buff定时事件计算
const buffTimerCalc = function (f,scene: FScene) {
    Util.traversal(f.buffs, function (b) {
        if(
        (!b.continue_field || b.field_life > f.field) && 
        (!b.excitation_max_count || b.event_count < b.excitation_max_count) && 
        (!b.continue_round || b.life > f.round)
        ){
            return;
        }
        clearBuff(f, b, scene);
        return true;
    });
};
