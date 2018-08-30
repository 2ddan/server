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



 // ================================ 导出
export class Policy{
    /**
     * @description 执行战斗逻辑
     */
    static run(scene: FScene):void{
        let f;
        scene.fighters.forEach((f,id)=> {
            if(f.init === 0){
                return initFighter(f,scene);
            }
            if(f.hp <= 0 && !f.remove && !f.revive){
                f.remove = 1;
                scene.fighters_camp[f.camp] -= 1;
                scene.addEvents([EType.remove,id]);
                return;
            }
        })
        f = scene.fighters.get(scene.cur_fighter);
        if(caclRound(f,scene)){
            return ;
        }
        single(f,scene);
        if(!single(f,scene) && f.ai){
            ai(f,scene);
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
        f.cards_draw = f.cards.slice();
        for(let i = 0,len = f.cards_draw.length;i<len;i++){
            let c = f.cards_draw[i];
            f.cards_type_number[c.type]+=1;
            if(c.inherent >scene.round){
                inherent.push(c);
                f.cards_draw.slice(i,1);
                i--;
            }
        }
        scene.seed = Util.randomSort(f.cards_draw,scene.seed);
        f.cards_draw = inherent.concat(f.cards_draw);
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
            to = "",
            c: Card = f.cards_hand[index];
        if(!c){
            return `There's not the card which index is ${index}`;
        }
        if(c.cost_energy !== "x" && parseInt(c.cost_energy)>f.energy){
            return "You don't have enough energy!!!";
        }
        delete f.cards_hand[index];
        f.cards_hand_number[c.type] -= 1;
        f.cards_played_number[c.type] += 1;
        if(c.deal_type == 1){
            f.cards_expend.push(c);
            to = "cards_expend";
        }else if(c.deal_type == 0){
            f.cards_scrap.push(c);
            to = "cards_scrap";
        }
        f.cards_spread = c;
        f.cards_use = c;
        f.cards_targets = seletTargets(f,c,tid,scene);
        scene.addEvents([EType.useCard,scene.cur_fighter,index,tid]);
        scene.addEvents([EType.cardsMove,f.id,"cards_hand",to,[c.index]]);
        return "";
    }
    /**
     * @description 一个英雄回合结束,处理手牌的去处，弃牌堆、消耗堆、留在手牌堆
     *              重置属性
     */
    static endSingleRound(f: Fighter,scene: FScene): void{
        let out = {
                scrap: [],
                expend: [],
                disappear:[]
            },
            e: Card,
            temp:string,
            to:string;
        f.round = scene.round;
        for(let i = f.cards_hand.length-1;i>=0;i--){
            e = f.cards_hand[i];
            if(!e){
                f.cards_hand.splice(i,1);
                continue;
            }
            if(e.deal_type == 1){
                temp = "expend";
            }else if(e.deal_type == 2){
                out["disappear"].push(e.index);
                f.cards_hand.splice(i,1);
            }else if(e.deal_type == 3){
                
            }else if(e.deal_type == 0 && f.cards_rest){
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
        fireBuff(f,f,22,scene);
        f.ai && restAttr(f,scene);
        for(let k in out){
            to = "cards_"+k;
            if(!f[to]){
                to = "";
            }
            if(out[k].length>0){
                scene.addEvents([EType.cardsMove,f.id,"cards_hand",to,out[k]]);
            }
        }
        Util.initObjValue(f.cards_hand_number,0);
        Util.initObjValue(f.cards_played_number,0);
        scene.addEvents([EType.endSingleRound,f.id,out.scrap,out.expend]);
    }
    /**
     * @description 选择卡牌
     */
    static selectCard(f: Fighter,arr: Array<any>,scene: FScene){
        dealPlayingTake(f,f.wait[1][0],f.wait[1][1],f.wait[1][7],f.wait[1][8],arr,scene);
    }
}

 // ================================ 本地

 const initFighter = (f: Fighter, scene: FScene) => {
    let i,len,b;
    //[[100023,["effect_formula",7]]
    for(i=0,len = f.buff_list.length;i<len;i++){
        addOneBuff(f,f,f.buff_list[i],scene);
    }
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
            fireBuff(e,e,7,scene);
        });
        return true;
    }
    if(f.round >= scene.round){
        next = nextFighter(scene);
        //继续当前回合下一个出手的fighter
        if(next){
            scene.cur_fighter = next;
            
        //大回合结束
        }else{
            scene.round += 1;
            scene.cur_fighter = 0;
            scene.addEvents([EType.endRound,scene.round]);
            //TODO.. 计算回合结束buff
            //  
            scene.fighters.forEach(e => {
                fireBuff(e,e,8,scene);
            });
        }
        return true;
    }else if(f.round == scene.round-1){
        //单回合开始前触发buff
        fireBuff(f,f,21,scene);
        scene.addEvents([EType.singleRound,scene.cur_fighter]);
        //触发抽牌前的buff
        fireBuff(f,f,1,scene);
        takeCards(f,scene);
        //触发抽牌后的buff
        fireBuff(f,f,2,scene);
        f.round += 0.5;
    }

}
/**
 * @description 执行单个fighter决策
 */
const single = (f: Fighter,scene: FScene): boolean => {
    // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
    if (f.hp <= 0 && f.max_hp > 0) {
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
    if(checkRelease(f,"cards",releaseCard,scene) || checkRelease(f,"skills",releaseSkill,scene)){
        return true;
    }
}
/**
 * @deprecated ai逻辑
 */
const ai = (f: Fighter, scene: FScene) => {
    for(let i = 0, len = f.cards_hand.length;i< len;i++){
        if(f.cards_hand[i]){
            if(Policy.useOneCard(f.id,i,null,scene)){
                return Policy.endSingleRound(f,scene);
            }
            return;
        }
    }
    Policy.endSingleRound(f,scene);
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
            return s;
        };
        scene.fighters.forEach((e: Fighter, k: number)=> {
        if(e.round < scene.round && e.hp > 0){
            r = func(r,e);
        }
    });
    r && !r.ai && restAttr(r,scene);
    return r?r.id:0;
}

/**
 * @description 抽牌,先从抽牌堆中抽一次，如果抽牌堆中牌抽完还不够，则把弃牌堆重置到抽牌堆，再抽一次
 */
const takeCards = (f: Fighter, scene: FScene) => {
    let num: number = f.cards_number-f.cards_reduce+f.cards_add,
        left: Array<Card>,
        leftIndex: Array<number>,
        len: number;
    num = Math.min(num,f.cards_max);
    f.cards_hand = f.cards_draw.splice(0,num);
    len = f.cards_hand.length;
    if(len)scene.addEvents([EType.takeCards,f.id,getCardsIndex(f.cards_hand)]);
    if(len < num){
        sortCards(f, scene);
        left = f.cards_draw.splice(0,num - len);
        leftIndex = getCardsIndex(left);
        f.cards_hand = f.cards_hand.concat(left);
        scene.addEvents([EType.takeCards,f.id,leftIndex]);
    }
    for(let i = 0,len = f.cards_hand.length;i<len;i++){
        f.cards_hand_number[f.cards_hand[i].type] += 1;
    }
}
/**
 * @description 从某个牌堆中选择牌
 * @param f 
 * @param from 从哪个牌堆选
 * @param from_random 是否随机选择
 * @param from_number 选择几张
 * @param id 只选某个id的卡牌
 * @param to_number 最后放入目标牌堆的数量
 */
const selectCards = (f: Fighter,scene: FScene,from: string,from_random: number,formula: Array<any>,from_number: number,id: number,to_number: number):Array<number> => {
    let cards = f[from],
        select = (cs: Array<Card>): Array<number> => {
            let r = [],fm = formula?formula:[];
            if(id){
                fm = fm.concat(["id",id]);
            }
            if(from_random){
                cs = cs.slice();
                scene.seed = Util.randomSort(cs,scene.seed);
            }
            for(let i =0,len = cs.length;i<len;i++){
                if(Util.checkObjHasValue(cs[i],fm)){
                    r.push(cs[i].index);
                    if(from_number>0 && r.length == from_number){
                        break;
                    }
                }
            }
            return r;
        },
        result;
    if(cards.length < to_number && from === "cards_draw"){
        sortCards(f,scene);
    }
    result = select(cards);
    return result;
}
/**
 * @description 局内抽牌，如果有id限制或者没有指定from，则为卡牌复制,否则为卡牌移动
 * @param param [from,to,from_random,to_select,formula,to_number,from_number,id,fix_formula]
 *        0,from 源牌堆，从哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆 0:配置表
 *        1,to 目标牌堆，放哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆
 *        2,from_random 抽取源牌堆是否随机
 *        3,to_select 是否由玩家自己选择(1:必须选择to_number的数量,2:最大选择to_number的数量),0直接进入目标牌堆，
 *        4,formula ["属性名","属性值",...]判断牌是否满足条件的函数（抽取源牌堆时使用）
 *        5,from_number 从源牌堆中取的张数
 *        6,to_number 放到目标牌堆的数量
 *        7,id 直接取某个id的牌
 *        8,buffs Array<Buff.id> 添加到抽出来的卡牌
 */
const playingTake = (param: Array<any>,f: Fighter,scene: FScene) => {
    let select,d = f.cards_max-f.cards_hand.length;
    if(param[1] == "cards_hand"){
        if(d===0){
            return "cards_hand full";
        }else if(d<param[6]){
            param[6] = d;
        }
    }
    if(param[0]){
        select = selectCards(f,scene,param[0],param[2],param[4],param[5],param[7],param[6]);
    }else{
        select = CfgMgr.select(["cfg/card",`cfg/card_${f.occ_name_en}`],param[5],mergeAttr(param[4],param[7]));
    }
    if(select.length === 0){
        return;
    }
    if(select.length <= param[6]){
        dealPlayingTake(f,param[0],param[1],param[7],param[8],select,scene);
    }else{
        f.wait = ["selcetCard",param,select];
        scene.addEvents([EType.selectCard,f.id,param,select]);
    }
}
/**
 * @description 处理局中抽牌结果
 */
const dealPlayingTake = (f: Fighter,from: string,to: string,id: number,buffs: Array<string>,cs:Array<any>,scene: FScene) => {
    let t,cards =[],src = f[from],c,startIndex = f.cards.length,b;
    if(id || from == "cards"){
        t = EType.copyCard;
    }else{
        t = EType.cardsMove;
    }
    if(!src){
        for(let i = 0, len = cs.length;i<len;i++){
            c = CfgMgr.create(["cfg/card",`cfg/card_${f.occ_name_en}`],cs[i],Card);
            c.index = (startIndex++);
            cards.push(c);
        }
    }else{
        cards = getCardByIndex(src,cs,t === EType.copyCard,startIndex);
    }
    f[to] = f[to].concat(cards);
    scene.addEvents([t,f.id,from,to,cs]);
    //添加卡牌buff
    if(!buffs){
        return;
    }
    for(let i = 0,len = cards.length;i<len;i++){
        c = cards[i];
        for(let j =0,leng = buffs.length;j<leng;j++){
            b = CfgMgr.create(["cfg/buff"],buffs[i],Buff);
            addOneBuff(c,c,b,scene);
        }
    }
}
/**
 * @description 合并卡牌选择条件
 */
const mergeAttr = (arr,id): {} => {
    let attr;
    if(arr){
        attr = id?arr.concat(["id",id]):arr.slice();
    }else if(id){
        attr = ["id",id];
    }
    attr = Common.changeArrToJson(attr);
    return attr;
}
/**
 * @description 获取卡牌列表的位置，返回位置组成的数组，其位置顺序与卡牌顺序一致
 * @param arr 
 */
const getCardsIndex = (arr: Array<Card>) => {
    return Util.getObjsValueToArr(arr,"index");
}
/**
 * @description 通过卡牌位置索引获取卡牌
 * @param cards 卡牌列表
 * @param index 索引
 */
const getCardByIndex = (cards: Array<Card>,indexs: Array<number>,iscopy:boolean,startIndex:number):Array<Card> => {
    let r = [],c;
    for(var i  = cards.length;i>=0;i--){
        if(indexs.indexOf(cards[i].index)>=0){
            c = cards[i];
            
            if(!iscopy){
                cards.splice(i,1);
            }else{
                c = Util.copy(Util.shallowCopy(c,["_show"]));
                c.index = (startIndex++);
            }
            r.push(c);
        }
    }
    return r;
}
/**
 * @description 重置牌堆
 */
const sortCards = (f: Fighter,scene: FScene): void => {
    let scrap = f.cards_scrap;
    f.cards_scrap = [];
    //怪物的牌不排序，按照配置顺序出牌
    if(f.type == "monster"){
        f.cards_draw = f.cards_draw.concat(scrap);
        return ;
    }
    scene.seed = Util.randomSort(scrap,scene.seed);
    f.cards_draw = f.cards_draw.concat(scrap);
    scene.addEvents([EType.cardsMove,f.id,"cards_scrap","cards_draw",getCardsIndex(scrap)]);
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
        t -= 10;
        camp = camp === 1 ? 2 : 1;
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
 * @description 释放卡牌
 */
const releaseCard = (f: Fighter, scene: FScene): void => {
    let ts = f.cards_targets,
        c = f.cards_spread,
        t: Fighter,
        //计算卡牌作用次数
        count = c.cost_energy == "x"?f.energy:(c.damage?c.damage_count:1),
        cacl = () => {
            for(let i = 0 ,len = ts.length;i<len;i++){
                t = scene.fighters.get(ts[i]);
                caclCard(f,t,c,scene);
            }
        };
    //真正使用卡牌前计算能量消耗
    caclEnergy(f,c.cost_energy,scene);
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
    //重置释放卡牌,会有buff触发某个释放的卡牌再释放一次
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
    }
    r.push(["block",f.block]);
    if(f.energy>0 && !f.save_energy){
        f.energy = 0;
    }
    f.energy += f.max_energy;
    r.push(["energy",f.energy]);
    if(r.length)scene.addEvents([EType.restAttr,f.id,r]);
}

/**
 * @description 计算能量
 */
const caclEnergy = (f: Fighter, cost: any, scene: FScene) => {
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
 * @description 计算卡牌效果
 */
const caclCard = (f: Fighter, t: Fighter, c: Card, scene: FScene): void => {
    // let r,s = "normal",rest = [];
    //计算伤害
    if(c.damage){
        caclDamage(f,t,c,scene);
        fireBuff(t,f,5,scene);
        if(f.damage){
            fireBuff(t,f,6,scene);
        }
        if(t.hp <= 0){
            fireBuff(t,f,19,scene);
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
    r = Formula.cacl("damage_"+s,FUtil.getArgArr(f,t,c,scene));
    if(!c.damage_type){
        r = r - t.block;
        if(r>=0){

            if(t.block > 0){
                r > 0 && fireBuff(f,t,20,scene);
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
    if(t.hp < 0){
        f.damage_overflow += (-t.hp);
        t.hp = 0;
    }
    rest.push(["hp",t.hp]);
    scene.addEvents([EType.damage,f.id,t.id,r]);
    scene.addEvents([EType.restAttr,t.id,rest]);
    rest = [];
}
/**
 * 计算卡牌格挡
 */
const caclBlock = (f: Fighter, t: Fighter, c: Card, scene: FScene):void => {
    let r,rest = [];
    r = Formula.cacl("block",FUtil.getArgArr(f,t,c,scene));
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
    let t: Fighter,b,buff: Buff,r;
    for(let i = 0,len = ts.length;i<len;i++){
        t = scene.fighters.get(ts[i]);
        for(let j = 0,leng = prop.buff_list.length;j<leng;j++){
            b = prop.buff_list[j];
            buff = CfgMgr.create(["cfg/buff"],b.buff,Buff);
            if(b.fix_attribute){
                // r = Formula.cacl(b.fix_attribute,FUtil.getArgArr(f,t,prop,scene,buff));
                r && Util.fixObjAttrByArr(buff,b.fix_attribute);
            }
            if(b.fix_formula){
                buff.effect_formula = b.fix_formula;
            }
            if(buff.trigger_add === ta){
                addOneBuff(f,t, buff ,scene);
            }
        }
    }
}
/**
 * @description 添加一个buff
 */
const addOneBuff = (f: Fighter, t: Fighter, b: Buff, scene: FScene) => {
    let index,buff,_id = t._class == "fighter"?"id":"index";
    //增加释放buff技能的释放者
    b.AF = f[_id];
    //如果再次触发相同buff 应该覆盖旧buff
    index = Util.indexByAttr(t.buffs, "id", b.id);
    if (index < 0) {
        if(b.continue_round){
            b.life = scene.round+b.continue_round;
        }
        t.buffs.push(b);
        scene.addEvents([EType.addBuff,t._class,f[_id],t[_id],b.id]);
        if(b.trigger_excitation === 0){
            excitationBuff(f,t,b,scene);
        }
    }else {
        buff = t.buffs[index];
        //叠加时间
        if(buff.cover_rule === 1){
            buff.life += b.continue_round;
            buff.continue_round += b.continue_round;
            scene.addEvents([EType.updateBuff,t._class,t[_id],b.id,"continue_round",buff.continue_round]);
        //叠加效果
        }else if(buff.cover_rule === 2){
            excitationBuff(f,t,buff,scene);
        }else if(buff.cover_rule === 3){
            buff.excitation_max_count += b.excitation_max_count;
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
        if (!b || b.trigger_excitation !== type || !Formula.cacl(b.trigger_condition,FUtil.getArgArr(f,t,null,scene,b)))
            continue;
        b.event_count++;
        if(!Formula.cacl(b.condition,FUtil.getArgArr(f,t,null,scene,b))){
            continue;
        }
        // 事件次数到了，触发buff  新增buff目标判断
        b.effectiv_target == "T" ? excitationBuff(f, t, b, scene) : excitationBuff(f, f, b, scene);
    }
}
/**
 * @description 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
 */
const getBuffEffectValue = (s: string, AF: number,F:Fighter, T: Fighter,  buff: Buff, scene: FScene) => {
    return Formula.cacl(s,FUtil.getArgArr(F,T,null,scene,buff,scene.fighters.get(AF)));
};
/**
 * @description 激发buff效果 
 */
const excitationBuff = (f: Fighter, t: Fighter, b: Buff, scene: FScene) => {
    var r, v, _id = t._class == "fihter"?"id":"index";
    console.log("excitationBuff",b.id);
    if (!checkProbability(b.probability, scene))//检查生效概率
        return;
    console.log("excitationBuff ok :: ",b.id);
    t = b.effectiv_target === "f"?f:t;
    r = getBuffEffectValue(b.effect_formula, b.AF, f,t,b, scene);
    v = r;
    if (b.effect_type === "hp") {
        r = t.max_hp > t.hp + r ? r : t.max_hp - t.hp;
        t[b.effect_type] += r;
        if(t.hp < 0){
            t.hp = 0;
        }
    } else if (b.effect_type === "energy") {
        r = t.max_energy > t.energy + r ? r : t.max_energy - t.energy;
        t[b.effect_type] += r;
    } else if(b.effect_type === "take_cards"){
        playingTake(r,t,scene);
    }else if(b.effect_type === "camp_function"){
        if(r && f.camp_function.indexOf(r) < 0){
            f.camp_function.push(r);
        }
    }else if(b.effect_type === "drop_card"){
        
    }else {
        b.add_value += r;
        t[b.effect_type] += r;
    }
    scene.addEvents([EType.effect,t._class,f[_id],t[_id],b.id,b.effect_type,r]);
};
/**
 * @description 清除buff
 */
const clearBuff = (f: Fighter, b: Buff, scene: FScene) => {
    let per, e, _id = f._class == "fihter"?"id":"index";
    if (!b.add_value)
        return;
    f[b.effect_type] -= b.add_value;
    
    // b.effective = b.add_value = 0;
    scene.addEvents([EType.clearBuff,f._class,f[_id],b.effect_type,b.add_value]);
    // scene.listener && scene.listenEvent.push({ type: "clearBuff", fighter: f, buff: b });
};
// 战斗buff定时事件计算
const buffTimerCalc = function (f,scene: FScene) {
    Util.traversal(f.buff, function (b) {
            clearBuff(f, b, scene);
        return true;
    });
};
// 检查概率是否通过
const checkProbability = function (probability: number,s: FScene) {
    if (probability < 1) {
        var r = s.seed;
        s.seed = this.randNumber(r);
        if (probability < r / 2147483647)
            return false;
    }
    return true;
}