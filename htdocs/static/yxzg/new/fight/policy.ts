/**
 * 战斗决策
 */
 // ================================ 导入
//mod
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { Util } from "app/mod/util";
//fight
import { Fighter, Buff } from "./class";
import { Util as FUtil } from "./util";
import { FScene, FSmgr } from "./scene";
import { EType } from "./analyze";

import { CardControl } from "./card";
import { EquipmentControl } from "./equipment";
import { SkillControl } from "./skill";

let isFirstRound = 0;//是否是玩家出牌的第一手
 // ================================ 导出
export class Policy{
    //每回合结束之后，重置玩家出手状态
    static changeIsRound(){
        isFirstRound = 0;
    }

    //结束当前回合
    static endCurrRound(id){
        FSmgr.endSingleRound(id);
    }

    /**
     * @description 执行战斗逻辑
     */
    static run(scene: FScene):void{
        let f,rr;
        
        if(!scene.status){
            return;
        }
        f = scene.fighters.get(scene.cur_fighter);
        if(f && f.singleRoundEnding && !f.wait){
            this.endSingleRound(f,scene);
        }
        if(caclRound(f,scene) || f.wait){
            rr = true ;
        }
        //添加初始buff
        if(f){
            scene.fighters.forEach((f,id)=> {
                if(f.init !== 1){
                    return initFighter(f,scene);
                }
            });
        }
        if(rr || f._round !== scene.round+0.6){
            return ;
        }
        //超时自动结束战斗回合
        if(checkLimitTime(f,scene)){
            return;
        }
        // single(f,scene);
        if(!single(f,scene) && f.ai && f.ai_end_round === 0){
            ai(f,scene);
        }

        
        
    }
    /**
     * @description 加入战斗者
     * @param f 战斗者
     */
    static insert(f: Fighter,scene: FScene, isSelf?: boolean,isFirst?: boolean){
        let _f: Fighter,ra = ["cards","energy","max_energy","save_energy","hp","min_hp","max_hp","money","field","strength","reduce_strength","add_strength","speed","brain","vulnerability","agility","un_attack","un_block","god","thorns","artifact","save_block","max_block","damage_round","damgae_field","buff_list","cards_number","cards_rest","cards_add","cards_reduce","cards_play_max","round_time", "scrolls", "scrolls_on","start_damage","min_damage","chaos","cant_play1","cant_play2","cant_play3","bramble","addboom"];
        if(isSelf){
            scene.camp_number = {"0":0,"1":0};
        }
        if(scene.fighter_id !== 1 || !isSelf){
            scene.fighter_id ++;
            f.id = scene.fighter_id;
            scene.fighters.set(scene.fighter_id, f);
            
        }else{
            _f = scene.fighters.get(1);
            _f.cards_hand = [];
            _f.cards_scrap = [];
            _f.cards_expend = [];
            _f.cards_draw = [];
            _f.init = 0;
            for(let i =0,len = ra.length;i<len;i++){
                _f[ra[i]] = f[ra[i]];
            }
            f = _f;
            f._show = undefined;
        }
        scene.camp_number[f.camp] += 1;
        f._round = f.round = scene.fightCount>0?scene.round+1:scene.round;
        scene.addEvents([EType.insert,f]);
        //初始化,牌堆、技能、卷轴
        if(isFirst){
           return; 
        }
        for (let i = 0; i < modIiteration.length; i++) {
            let k = modIiteration[i];
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
        scene.camp_number = {"0":0,"1":0};
        var left = 0, right = 0;
        scene.fighters.forEach(f => {
            if (f.camp === 1 && (f.hp > 0 || f.revive) && f.visible)
                left++;
            if (f.camp === 0 && (f.hp > 0 || f.revive) && f.visible)
                right++;
            if(!f.remove  && f.visible){
                scene.camp_number[f.camp] += 1;
            }
        });
        if (left > 0 && right > 0)
            return 0;
        return left > 0 ? 1 : 2;
    };
    /**
     * @description 检查是否有fighter需要被移除
     * @param scene 
     */
    static checkRemove(scene){
        
        scene.fighters.forEach((f,id)=> {
            if(f.hp <= 0 && !f.remove){
                if(f.died == 0){
                    Policy.fireBuff(f,scene.fighters.get(f.kill)||f,23,scene);
                    f.died = 1;
                }
                if(f.revive){
                    f._round = f.round = scene.round+1;
                }
                if(f.hp <= 0 && !f.revive){
                    if(scene.fighters.get(f.kill)){
                        Policy.fireBuff(scene.fighters.get(f.kill),f,35,scene);
                    }
                    f.remove = 1;
                    scene.camp_number[f.camp] -= 1;

                    scene.addEvents([EType.remove,id]);
                }
                return;
            }else if(f.hp > 0 && f.died == 1){
                f.died = 0;
            }
        })
    }
    /**
     * @description 战斗结束
     */
    static over(scene: FScene,r: number){
        scene.fighters.forEach(f => {
            if(f.hp <= 0){
                return;
            }
            if(r == 1 && f.monster_type === 1 && f.hp > 0){
                scene.addEvents([EType.remove,f.id]);
                return;
            }
            f.field += 1;
            buffTimerCalc(f,scene);
        })
        for (let i = 0; i < modIiteration.length; i++) {
            let k = modIiteration[i];
            if(mod[k].over){
                mod[k].over(scene);
            }
        }
        // for(let k in mod){
        //     if(mod[k].over){
        //         mod[k].over(scene);
        //     }
        // }
    }
    /**
     * @description 一个英雄回合结束,处理手牌的去处，弃牌堆、消耗堆、留在手牌堆
     *              重置属性
     */
    static endSingleRound(f: Fighter,scene: FScene): boolean{
        for (let i = 0; i < modIiteration.length; i++) {
            let k = modIiteration[i];
            if(mod[k].endSingleRound){
                if(mod[k].endSingleRound(f,scene)){
                    return true;
                }
            }
        }
        // for(let k in mod){
        //     if(mod[k].endSingleRound){
        //         if(mod[k].endSingleRound(f,scene)){
        //             return true;
        //         }
        //     }
        // }
        f.singleRoundEnding = 0;
        f.round = f._round = scene.round+1;
        if(f.ai){
            f.ai_end_round = 0;
        }
        Util.initObjValue(f.attChangeCount,0);
        // scene.fighters.forEach(f=>{
        //     if(f.hp>0 || f.revive){
        //         scene.addEvents([EType.updateBuff,f._class,f.id]);
        //     }
        // })
    }
    /**
     * @description 计算能量
     */
    static caclEnergy(f: Fighter, cost: any, scene: FScene){
        let en = f.energy;
        if(typeof cost == "string" && cost.match(/x|y/)){
            f.energy = 0;
        }else if(cost != "n"){
            f.energy -= parseInt(cost);
        }
        if(en != f.energy){
            attrChange(f,"energy",f.energy-en,scene);
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
        let r,camp = f.camp,t = obj.target_type-0,target_condition,temp,oc = obj.target_condition && isNaN(obj.target_condition),key = {},ot,
            push = (el)=>{
                if(key[el[0]]>=0){
                    target_condition.splice(key[el[0]],1);
                }
                key[el[0]] = target_condition.length;
                target_condition.push(el);
            };
        //1选择自己
        if(t === 1){
            return [f.id];
        }
        if(t !== 11){
            target_condition = []; 
        }
        //确定己方还是敌方
        if(t > 10){
            t -= 10;
            camp = camp === 1 ? 0 : 1;
        }
        if(target_condition){
            push(["camp",camp]);
        }else {
            target_condition = [];
        }
        if(t === 5){
            push(["id","!=",f.id]);
        }
        push(["hp",">",0]);
        push(["visible","!=",0]);
        if(oc){
            ot = Formula.cacl(obj.target_condition,FUtil.getArgArr(f,scene.fighters.get(tid),obj,scene,obj,scene.fighters.get(obj.AF), FSmgr.scene.seed));
            for(let i = 0, len = ot.length; i < len; i++){
                push(ot[i]);
            }
        }
        r = select(scene.fighters,target_condition);
        //玩家手动选择己方或敌方1人
        if((t === 12 || t === 2) && obj.target_param === 1 && tid){
            if(Util.getObjByAttr(r,["id",tid])){
                return [tid];
            }
        }
        // 3 || 13 随机选择己方或敌方x个
        if(t === 3 || t === 5 || t === 1){
            scene.seed = Util.randomSort(r,scene.seed);
        }
        // 4 || 14 选择己方或敌方血量最少X人
        //0,1,[["hp",1]]
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
        let t: Fighter,b,buff: Buff,r,skip = ["card_attribute","findvul"];
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
                    r = b[`fix_formula${f+1}`]
                    if(r){
                        if(Util.checkValueInString(skip,r+"") || skip.indexOf(buff.effects[f][0]) >= 0){
                            r = r.replace(/'/g,'"');
                            r = JSON.parse(r);
                        }
                        buff.effects[f][1] = r;
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
        //初始化buff效果数值
        fixBuffEffectValue(b);
        //增加释放buff技能的释放者
        b.AF = b.AF || f[_id];
        //如果再次触发相同buff 应该覆盖旧buff
        index = Util.indexByAttr(t.buffs, "id", b.id);
        if (index < 0) {
            if(b.continue_round){
                b.life = t.round+b.continue_round;
                b.showNum = t.round > scene.round?1:0;
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
            //叠加最大激发次数
            }else if(buff.cover_rule === 3){
                buff.excitation_max_count += b.excitation_max_count;
            //叠加激发次数
            }else if(buff.cover_rule >= 40 && buff.cover_rule < 50){
                this.fireOne(t,f,buff,buff.trigger_excitation,scene);
                // b.event_count++;
                // if(b.event_count % b.excitation_expect_count === 0){
                //     Policy.excitationBuff(t,f,buff,scene);
                // }
            //叠加普通效果数值
            }else if(buff.cover_rule >= 50){
                let c = buff.cover_rule%50;
                if(c){
                    buff.effects[c-1][1] += b.effects[c-1][1];
                }else{
                    for(let i =0,len = buff.effects.length;i<len;i++){
                        buff.effects[i][1] += b.effects[i][1];
                    }
                }
                
            //叠加卡牌属性修改数值
            }else if(buff.cover_rule === 6){
                for(let i =0,len = buff.effects.length;i<len;i++){
                    for(let j = 0,leng = buff.effects[i][1][6].length;j<leng;j++){
                        buff.effects[i][1][6][j] += b.effects[i][1][6][j];
                    }
                }
            }
            if(buff.cover_rule != 2 && (buff.cover_rule < 40 || buff.cover_rule >= 50)){
                scene.addEvents([EType.updateBuff,t._class,t[_id],b.id]);
            }
        }
    }
    static fireOne(f: Fighter,t: Fighter,b: Buff,type: number,scene: FScene): void{
        if(type !== 23 && type !== 35 && type !== 39 && type !== 19 && f.hp<=0 && !f.revive){
            return;
        }
        if (!b || b.trigger_excitation !== type || (b.trigger_condition && !Formula.cacl(b.trigger_condition,FUtil.getArgArr(f,t,null,scene,b,scene.fighters.get(b.AF), FSmgr.scene.seed))))
            return;
        b.event_count++;
        // scene.addEvents([EType.updateBuff,t._class,t.id,b.id]);
        if(b.condition && !Formula.cacl(b.condition,FUtil.getArgArr(f,t,null,scene,b,scene.fighters.get(b.AF), FSmgr.scene.seed))){
            return clearTempBuff(f,scene);;
        }
        if((b.excitation_expect_count && b.event_count % b.excitation_expect_count !== 0)||(b.excitation_max_count && b.event_count > b.excitation_max_count)){
            return;
        }
        if(b.continue_round && b.life < f.round){
            return;
        }
        f.buff_now = b;
        // 事件次数到了，触发buff  新增buff目标判断
        this.excitationBuff(f, t, b, scene);
        clearTempBuff(f,scene);
    }
    /**
     * @description 激活buff
     */
    static fireBuff(f: Fighter, t: Fighter, type: number, scene: FScene){
        //逆序触发，保证触发过程中有buff被清除，而不会遗漏
        for (var i = f.buffs.length - 1; i >= 0; i--) {
            this.fireOne(f,t,f.buffs[i],type,scene);
        }
    }
    /**
     * @description 清除buff效果
     */
    static clearBuff(f: Fighter, b: Buff, scene: FScene){
        clearBuff(f, b, scene);
    }
    /**
     * @description 清除指定buff
     * @param f 
     * @param buffs buff id列表
     * @param scene 
     */
    static clearTheBuffs(f: Fighter,buffs: Array<number>,scene: FScene){
        clearTheBuffs(f,buffs,scene);
    }
    /**
     * @description 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
     */
    static getBuffEffectValue(s: any, AF: number,F:Fighter, T: Fighter,  buff: Buff, scene: FScene){
        return Formula.cacl(s,FUtil.getArgArr(F,T,null,scene,buff,scene.fighters.get(AF), FSmgr.scene.seed));
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
                for (let i = 0; i < modIiteration.length; i++) {
                    let k = modIiteration[i];
                    if(mod[k].excitationBuff && mod[k].excitationBuff(f,t,effect_type,r,reset,scene)){
                        return true;
                    }
                }
                // for(let k in mod){
                //     if(mod[k].excitationBuff && mod[k].excitationBuff(f,t,effect_type,r,reset,scene)){
                //         return true;
                //     }
                // }
            },
            deal = ():void => {
                r = this.getBuffEffectValue(effect_formula, b.AF, f,t,b, scene);
                if(effect_type === "attach_damage" && typeof r == "object" && r[0] === "findvul"){
                    let bt = FUtil.findBuffById(f.buffs,100110);
                    if(bt){
                        r = r[1]*(bt.life - scene.round);
                    }else{
                        r = 0;
                    }
                }
                if (effect_type === "hp") {
                    if(t.type == "fighter"){
                        
                    }
                    if(r == 0 || (r<0 && t.god)){
                        return;
                    }
                    r = (r/Math.abs(r)) * Math.floor(Math.abs(r));
                    r = hp(r,t,reset,scene.fighters.get(b.AF),scene);
                }else if(effect_type === "suck"){
                    r *= Math.floor(f.damage/3);
                    r = hp(r,t,reset,scene.fighters.get(b.AF),scene);
                }else if(effect_type === "max_hp"){
                    r = Math.floor(r);
                    t.max_hp += r;
                    if(r>0){
                        t.hp += r;
                        scene.addEvents([EType.effect,t._class,f[_id],t[_id],b.id,"hp",r]);
                    }else{
                        if(t.max_hp<t.hp){
                            scene.addEvents([EType.effect,t._class,f[_id],t[_id],b.id,"hp",t.max_hp-t.hp]);
                            t.hp=t.max_hp;
                        }
                    }
                    reset.push([effect_type,t[effect_type]]);
                    reset.push(["hp",t.hp]);
                } else if(effect_type === "damage_normal"||effect_type === "block_damage"){
                    if(effect_type === "block_damage"){
                        r *= f.block;
                        effect_type = "damage_normal";
                    }
                    r = Math.round(r);
                    r = this.caclDamageNormal(r,f,t,reset,scene);
                    if(r>0){
                        if(t.god){
                            return;
                        }
                        r = -hp(-r,t,reset,scene.fighters.get(b.AF),scene);
                    }
                } else if(effect_type === "damage_true"){
                    if(r>0){
                        if(t.god){
                            return;
                        }
                        r = -hp(-r,t,reset,scene.fighters.get(b.AF),scene);
                    }
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
                    v.AF = b.AF;
                    //如果主buff目标是自己，但子buff目标又是技能目标，则需要修正目标，不能继承主buff目标
                    this.addOneBuff(f,t,v,scene);
                //立即复活
                }else if(effect_type === "resurrection"){
                    clearTheBuffs(t,null,scene);
                    reset = reset.concat(this.resetFighter(t,scene));
                    t.hp = r;
                    t.init = 2;
                    reset.push(["hp",r]);
                //逃跑
                }else if(effect_type === "runaway"){
                    scene.fighters.forEach(e=>{
                        if(t === e){
                            scene.fighters.delete(e.id);
                            scene.fighter_id -= 1;
                            scene.addEvents([EType.remove,e.id,1]);
                        }
                    })
                }else if(effect_type === "talk"){

                }else if(effect_type === "monster"){

                    let m = FUtil.createMonster(r);
                    m.camp = t.camp;
                    m.summon = 1;
                    this.insert(m,scene);
                }else if(effect_type === "change_model"){

                }else if(effect_type === "name"){
                    t[effect_type] = r[0];
                    reset.push([effect_type,t[effect_type]]);
                }else if(effect_type === "ignore"){

                }else if(effect_type === "card_spread_next" || effect_type === "card_targets_next"){
                    t[effect_type] = r;
                }else if(effect_type === "clear_buff"){
                    clearTheBuffs(scene.fighters.get(r[0]),[r[1]],scene);
                }else if(!forMod()) {
                    if(effect_type.indexOf("#") === 0){
                        effect_type = effect_type.replace("#","");
                        t[effect_type] += r;
                        addvalue(effect_type,r);
                        attrChange(t,effect_type,r,scene);
                    }else if(effect_type.indexOf("$") === 0){
                        effect_type = effect_type.replace("$","");
                        t[effect_type] = r;
                    }else{
                        t[effect_type] += r;
                        attrChange(t,effect_type,r,scene);
                    }
                    reset.push([effect_type,t[effect_type]]);
                }
                if(reset.length){
                    scene.addEvents([EType.restAttr,t.id,reset]);
                }
                scene.addEvents([EType.effect,t._class,f[_id],t[_id],b.id,effect_type,r]);
                reset = [];
            },_for = ():void => {
                for(let j = 0, leng = b.effects.length;j<leng;j++){
                    effect_type = b.effects[j][0];
                    effect_formula = b.effects[j][1];
                    deal();
                }
            };
        
        if (!this.checkProbability(b.probability, scene))//检查生效概率
            return;
        
        if(b.target_type === "f"){
            t = f;
        }else if(b.target_type === "af"){
            t = scene.fighters.get(b.AF);
        }else if(typeof b.target_type == "number" || b.target_type.toLowerCase() !== "t"){
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
        let r = [],s = false,ts,b = f.block;
        if(!se){
            // if(!f.save_block && f.block > 0){
            //     f.block = 0;
            // }
            f.block = Math.min(f.block,f.max_block);
            if(f.multi_block){
                f.block +=  f.multi_block;
            }
            r.push(["block",f.block]);
            if(b !== f.block){
                attrChange(f,"block",f.block-b,scene);
            }
            //无敌
            if(f.god > 0){
                f.god -= 1;
                r.push(["god",f.god]);
            }
            //爆炸效果
            if(f.boom > 0){
                ts = select(scene.fighters,[["hp",">",0],["visible",1],["camp",f.camp]]);
                for(let i = 0,len = ts.length; i < len; i++){
                    Policy.damage(f,ts[i],f.boom,r,scene,0);
                }
                if(f.save_boom>0){
                    f.save_boom -= 1;
                }else{
                    f.boom = 0;
                }
            }
        }else{
            //能量
            if(f.energy>0 && !f.save_energy){
                f.energy = 0;
            }
            f.energy += f.max_energy;
            if(f.add_strength){
                f.strength += f.add_strength;
                f.add_strength = 0;
                r.push(["temp_strength",0]);
                s = true;
            }
            if(f.reduce_strength){
                f.strength -= f.reduce_strength;
                f.reduce_strength = 0;
                r.push(["reduce_strength",0]);
                s = true;
            }
            if(f.cold){
                f.cold = 0;
                r.push(["cold",0]);
            }
            r.push(["energy",f.energy]);
            if(s){
                r.push(["strength",f.strength]);
            }
        }
        if(r.length)scene.addEvents([EType.restAttr,f.id,r]);
    }
    /**
     * @description 重置fighter数据
     * @param f 
     * @param scene
     */
    static resetFighter(f: Fighter,scene: FScene){
        const mcfg = CfgMgr.getOne("cfg/monster",f.sid),r = [["strength",0],["add_strength",0],["reduce_strength",0],["energy",3],["block",0],["vulnerability",0],["speed",0],["agility",0],["brain",0],["min_damage",0]];
        for(let i = r.length-1;i>=0;i--){
            if(f[r[i][0]] !== r[i][1]){
                f[r[i][0]]= r[i][1];
            }else{
                r.splice(i,1);
            }
        }
        return r;
        // scene.addEvents([EType.restAttr,f.id,r]);
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
        let b = t.block;
        r = r - t.block;
        if(r>=0){
            if(t.block > 0){
                t.block = 0;
                reset.push(["block",0]);
                attrChange(t,"block",-b,scene);
            }
        }else{
            t.block = -r; 
            attrChange(t,"block",t.block-b,scene);
            r = 0;
            reset.push(["block",t.block]);
            
        }
        if(r > 0 && t.multi_block > 0){
            t.multi_block -= 1;
        }
        //触发突破格挡的buff
        if(b > 0 && r > 0 && t.block == 0){
            Policy.fireBuff(f,t,20,scene);
            Policy.fireBuff(t,f,37,scene);
        }
        return r;
    }
    /**
     * @description 处理非卡牌造成的伤害
     */
    static hp(_r: number, t: Fighter, f: Fighter, scene: FScene){
        let reset = [],r,tb = t.block;
        _r = this.caclDamageNormal(_r, f, t, reset, scene);
        r = hp(-_r, t, reset, f, scene);
        scene.addEvents([EType.restAttr,t.id,reset]);
        scene.addEvents([EType.damage,f.id,t.id,-r,tb]);
        return r;
    }
    /**
     * @description 处理所有伤害
     */
    static damage(f: Fighter,t: Fighter,r: number,reset: any[],scene: FScene,tb: number){
        r = r > t.start_damage?r:0;
        if(t.firm > 0 && r > 0){
            r = 0;
            t.firm --;
        }
        if(t.reflect > 0 && r > 0){
            Policy.hp(r,f,t,scene);
            r = 0;
            t.reflect --;
        }
        t.hp -= r;
        if(t.min_hp && t.min_hp > t.hp){
            r -= (t.min_hp - t.hp);
        }
        
        if(r>0){
            t.damaged += r;
            t.damgae_field += 1;
            t.damage_round += 1;
        }
        if(t.hp <= 0){
            t.kill = f.id;
            f.damage_overflow += (-t.hp);
            f.damage += (r + t.hp);
        }else{
            f.damage += r;
        }
        
        t.hp = Math.max(t.hp,t.min_hp);
        reset.push(["hp",t.hp]);
        scene.addEvents([EType.restAttr,t.id,reset]);
        scene.addEvents([EType.damage,f.id,t.id,r,tb]);
        if(r > 0){
            Policy.fireBuff(t,f,24,scene);
        }
    }
    /**
     * @description 处理所有属性变化
     */
    static attrChange(f: Fighter, type: string, diff: number, scene: FScene){
        attrChange(f,type,diff,scene);
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
class ModClass {
    get card(){
        return CardControl;
    }
    get equipment() {
        return EquipmentControl;
    }
    get skill () {
        return SkillControl;
    }
}
const mod = new ModClass();
const modIiteration = [ 'card', 'equipment', 'skill' ];

/**
 * @description 初始化战斗者buff
 * @param f 
 * @param scene 
 */
 const initFighter = (f: Fighter, scene: FScene) => {
    let i,len,b;
    //[[100023,["effect_formula",7]]
    //每个功能完成自己的初始化
    // for(let k in mod){
    //     if(mod[k].init){
    //         mod[k].init(f,scene);
    //     }
    // }
    for(i = f.buff_list.length - 1; i >= 0; i--){
        Policy.addOneBuff(f,f,f.buff_list[i],scene);
    }
    if(f.init === 0){
        Policy.fireBuff(f,f,27,scene);
    }
    Util.limitSort(f.buffs,"debuff",-1);
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
        if(scene.cur_fighter == -2){
            endRound(scene);
        }else if(scene.cur_fighter !== -1){

            scene.fighters.forEach(e => {
                Policy.fireBuff(e,e,7,scene);
            });
        }
        scene.fightCount += 1;
        return true;
    }else if(f.hp<=0 && !f.revive){
        f._round = f.round = scene.round+1;
    }
    if(f._round>= scene.round+1){
        next = nextFighter(scene);
        //继续当前回合下一个出手的fighter
        if(next){
            scene.cur_fighter = next;
        //大回合结束
        }else{

            endRound(scene);
        }
        return true;
    }else if(f._round== scene.round){
        scene.addEvents([EType.singleRound,scene.cur_fighter]);
        f.round_single_time = scene.now;
        f.damage_round = 0;
        f._round+= 0.5;
        // f.round = scene.round;
    }else if(f._round == scene.round+0.5){
        
        //单回合开始前触发buff
        Policy.fireBuff(f,f,21,scene);
        //每个功能完成自己的初始化
        for (let i = 0; i < modIiteration.length; i++) {
            let k = modIiteration[i];
            if (mod[k].singleRound) {
                mod[k].singleRound(f,scene);
            }
        }
        //单回合开始后触发buff
        Policy.fireBuff(f,f,34,scene);
        // scene.fighters.forEach(e=>{
        //     if(e.hp>0 || e.revive){
        //         scene.addEvents([EType.updateBuff,e._class,e.id]);
        //     }
        // })
        f._round+= 0.1;
    }

}
const endRound = (scene: FScene) => {
    scene.round += 1;
    scene.cur_fighter = 0;
    //计算回合结束buff
    scene.fighters.forEach(e => {
        Policy.fireBuff(e,e,8,scene);
        if(!e.visible){
            e.round = e._round = scene.round;
        }
    });
    //回合结束清除buff
    scene.fighters.forEach(e=>{
        if(e.hp>0){
            buffTimerCalc(e,scene);
        }
    })
    scene.addEvents([EType.endRound,scene.round]);
}
/**
 * @description 检查fighter是否超出单回合时间限制
 * @param f 
 * @param scene 
 */
const checkLimitTime = (f: Fighter,scene: FScene): boolean => {
    //if(f.round_time > 0 && isFirstRound != f.id && f.id==getSelf().id){
        //globalSend("setAnimaTime",{time:f.round_time,id:f.id});
    //}
    isFirstRound  = f.id;
    if(f.round_time && f.round_single_time + f.round_time*1000 <= Date.now()){
        FSmgr.endSingleRound(f.id);
        return true;
    }
    return false;
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
    for (let i = 0; i < modIiteration.length; i++) {
        let k = modIiteration[i];
        if (mod[k].release) {
            b = checkRelease(f,k,mod[k].release,scene)||b;
        }
    }
    // for(let k in mod){
    //     if(mod[k].release){
    //         b = checkRelease(f,k,mod[k].release,scene)||b;
    //     }
    // }
    return b;
}
/**
 * @deprecated ai逻辑
 */
const ai = (f: Fighter, scene: FScene) => {
    let b;
    //每个功能完成自己的ai操作
    for (let i = 0; i < modIiteration.length; i++) {
        let k = modIiteration[i];
        if (mod[k].ai) {
            b = mod[k].ai(f,scene)||b;
        }
    }
    // for(let k in mod){
    //     if(mod[k].ai){
    //         b = mod[k].ai(f,scene)||b;
    //     }
    // }
    if(!b){
        return;
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
        m,
        c = 0,
        func = (s: Fighter,t: Fighter): Fighter => {
            if(!t.visible){
                return s;
            }
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
            m = m?e.round:(m <= e.round?m:e.round);
            if(e.round == scene.round && (e.hp > 0 || e.revive)){
                r = func(r,e);
            }
            if(e.hp > 0 || e.revive){
                c ++;
            }
        });
    // if(m > scene.round && scene.round == 0){
    //     scene.round = m;
    // }
    r && c > 1 && Policy.restAttr(r,scene,0);
    if(r){
        if(c > 1){
            return r.id;
        }else{
            return -1;
        }
    }else if(c > 1){
        return -2;
    }else{
        return 0
    }
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
const hp = (_r: number,_f: Fighter,reset: Array<any>,af: Fighter,scene: FScene) => {
    if(_r > 0 && _f.hp_effect > 0){
        _r = Math.floor(_r * (1+_f.hp_effect/10));
    }
    _r = _f.max_hp > _f.hp + _r ? _r : _f.max_hp - _f.hp;
    if(_r<0){
        _r *= Math.max(1-_f.un_damage*.1,0);
        _r = Math.abs(_r) > _f.start_damage?Math.round(_r):0;
    }
    if(_f.firm > 0 && _r < 0){
        _r = 0;
        _f.firm --;
    }
    _f.hp += _r;
    _f.hp = Math.max(_f.hp,_f.min_hp);
    if(_f.hp < 0){
        _f.hp = 0;
    }
    if(_f.hp === 0){
        _f.kill = af.id;
    }
    if(_r<0){
        _f.damaged -= _r;
        _f.damgae_field += 1;
        _f.damage_round += 1;
        Policy.fireBuff(_f,af,24,scene);
        _f.damaged = 0;
    }
    if(_r != 0){
        reset.push(["hp",_f.hp]);
    }
    return _r;
}
/**
 * @description 触发属性修改buff
 * @param f 属性变化的战斗对象
 * @param type 属性的名字
 * @param diff 属性的变化值
 * @param scene 战斗场景对象
 */
const attrChange = (f: Fighter, type: string, diff: number, scene: FScene) => {
    f.attrChange = [type,diff];
    if(f.attChangeCount[`${type}R`] !== undefined){
        if(diff < 0){
            f.attChangeCount[`${type}R`] += 1;
        }else if(diff > 0){
            f.attChangeCount[`${type}A`] += 1;
        }
    }
    Policy.fireBuff(f,f,36,scene);
    f.attrChange = [];
    if(type == "block" && f.block == diff){
        Policy.fireBuff(f,f,38,scene);
    }
}
/**
 * @description buff效果的数值从字符串处理成数字,
 */
const fixBuffEffectValue = (b: Buff) => {
    let effs = b.effects;
    for(let i = 0,len = effs.length;i<len;i++){
        if(!isNaN(effs[i][1])){
            effs[i][1] = effs[i][1]-0;
        }
    }
} 

/**
 * @description 清除buff
 */
const clearBuff = (f: Fighter, b: Buff, scene: FScene) => {
    let _id = f._class == "fighter"?"id":"index",r,cs = [],events = [],attr = [],cp = ["cfg/card",`cfg/card_${f.type === "fighter"?f.occ_name_en:f.type}`],ef;
    if(f.type === "fighter"){
        cp.push("cfg/card_hero");
    }
    if (b.add_value){
        for(let k in b.add_value){
            f[k] -= b.add_value[k];
            
            b.add_value[k] = 0;
        }
    }else if(b.cards.length>0){
        for(let ii =0,len = b.cards.length;ii<len;ii++){
            cs[ii] = CfgMgr.create(cp,f.cards[b.cards[ii]].sid+""+f.cards[b.cards[ii]].level,Buff);
        }
        for(let i = 0,len = b.effects.length;i<len;i++){
            if(b.effects[i][0] === "card_attribute"){
                r = this.getBuffEffectValue(b.effects[i][1], b.AF, f,f,b, scene);
                for(let ii = 0,leng = r[4].length;ii<leng;ii++){
                    for(let iii = 0,length = cs.length;iii<length;iii++){
                        attr.push(b.cards[iii]);
                        f.cards[b.cards[iii]][r[4][ii]] = cs[iii][r[4][ii]];
                        attr.push(r[4][ii]);
                        attr.push(cs[iii][r[4][ii]]);
                        events.push(attr);
                        attr = [];
                    }
                }
            }
        }
        scene.addEvents([EType.resetCardAttr,events]);
    }
    for(let i = 0, len = b.effects.length; i < len; i++){
        ef = b.effects[i];
        if(ef[0].indexOf("$") === 0){
            f[ef[0].replace("$","")] = 0;
        }
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
/**
 * @description 清除指定buff,如果不指定，则全部清除
 */
const clearTheBuffs = (f: Fighter,buffs: Array<number>,scene: FScene) => {
    Util.traversal(f.buffs, function (b) {
        if(buffs && buffs.indexOf(b.id) === -1){
            return;
        }
        clearBuff(f, b, scene);
        return true;
    });
}
// 战斗buff定时事件计算
const buffTimerCalc = function (f,scene: FScene) {
    Util.traversal(f.buffs, function (b) {
        b.showNum = 0;
        if(
        (!b.continue_field || b.field_life > f.field) && 
        (!b.excitation_max_count || b.event_count < b.excitation_max_count) && 
        (!b.continue_round || b.life > scene.round)
        ){
            return;
        }
        clearBuff(f, b, scene);
        return true;
    });
};
