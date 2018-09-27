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
import { Fighter, Buff, Card } from "./class";
import { Util as FUtil } from "./util";
import { FScene } from "./scene";
import { EType } from "./analyze";
import { Policy } from "./policy";



 // ================================ 导出
export class CardControl{
    /**
     * @description 初始化牌堆
     */
    static insert(f: Fighter, scene: FScene){
        let inherent = [];
        f.cards_draw = f.cards.slice();
        scene.addEvents([EType.resetCards,f.id,{"cards_draw":getCardsIndex(f.cards_draw),"cards_hand":[],"cards_scrap":[],"cards_expend":[]}]);
        Util.initObjValue(f.cards_type_number,0);
        for(let i = 0,len = f.cards_draw.length;i<len;i++){
            let c = f.cards_draw[i];
            f.cards_type_number[c.type]+=1;
            if(c.inherent >scene.round){
                inherent.push(c);
                f.cards_draw.slice(i,1);
                i--;
            }
        }
        if(f.type === "fighter"){
            scene.seed = Util.randomSort(f.cards_draw,scene.seed);
        }
        f.cards_draw = inherent.concat(f.cards_draw);
    }
    /**
     * @description ai的卡牌操作
     * @param f 
     * @param scene 
     */
    static ai(f: Fighter, scene: FScene): boolean{
        for(let i = 0, len = f.cards_hand.length;i< len;i++){
            if(f.cards_hand[i] && !this.useOneCard(f.id,i,null,scene)){
                return;
            }
        }
        return true;
    }
    /**
     * @description 一个英雄的回合开始
     */
    static singleRound(f: Fighter,scene: FScene): void{
        //触发抽牌前的buff
        Policy.fireBuff(f,f,1,scene);
        takeCards(f,scene);
        //触发抽牌后的buff
        Policy.fireBuff(f,f,2,scene);
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
        Policy.fireBuff(f,f,22,scene);
        Policy.restAttr(f,scene,1);
        for(let k in out){
            to = "cards_"+k;
            if(!f[to]){
                to = "";
            }
            if(out[k].length>0){
                scene.addEvents([EType.cardsMove,f.id,"cards_hand",to,out[k]]);
            }
        }
        f.cards_hand_all = f.cards_hand.length;
        Util.initObjValue(f.cards_hand_number,0);
        Util.initObjValue(f.cards_played_number,0);
        scene.addEvents([EType.endSingleRound,f.id,out.scrap,out.expend]);
    }
    /**
     * @description 释放卡牌
     */
    static release(f: Fighter, scene: FScene): void{
        let ts = f.card_targets,
            c = f.card_spread,
            t: Fighter,
            e = [EType.releaseCard,f.id,ts,c.index],
            ei,
            //计算卡牌作用次数
            count = c.cost_energy == "x"?f.energy:(c.damage?c.damage_count:1),
            cacl = () => {
                for(let i = 0 ,len = ts.length;i<len;i++){
                    t = scene.fighters.get(ts[i]);
                    if(t.hp>0){
                        caclCard(f,t,c,scene);
                    }
                }
            };
        //真正使用卡牌前计算能量消耗
        Policy.caclEnergy(f,c.cost_energy,scene);
        scene.addEvents(e);
        ei = scene.events.length;
        Policy.addBuffs(f,ts,c,1,scene);
        //TODO...触发使用卡牌前的buff
        for(let i = 0,len = ts.length;i<len;i++){
            Policy.fireBuff(f,scene.fighters.get(ts[i]),3,scene);
        }
        //fireBuff();
        for(let j = 0;j<count;j++){
            cacl();
            if(!c.target_inherit){
                ts = Policy.seletTargets(f,c,null,scene);
            }
        }
        //计算吸血
        // Policy.caclStealHp(f,scene);
        //fireBuff();
        if(f.damage){
            //TODO...触发使用卡牌造成伤害后的buff
            //fireBuff();
            f.damage = 0;
        }
        Policy.addBuffs(f,ts,c,2,scene);
        //TODO...触发使用卡牌后的buff
        for(let i = 0,len = ts.length;i<len;i++){
            Policy.fireBuff(f,scene.fighters.get(ts[i]),4,scene);
        }
        e.push(scene.events.splice(ei));
        //重置释放卡牌,会有buff触发某个释放的卡牌再释放一次
        f.card_spread = f.card_spread_next;
        f.card_targets = f.card_targets_next;
        f.card_spread_next = undefined;
        f.card_targets_next = undefined;
    }
    /**
     * @description 处理buff效果
     */
    static excitationBuff(f: Fighter,t: Fighter,type: string,r: any,reset: Array<any>,scene: FScene){
        console.log("card buff effect :: ",type);
        if(type === "card"){
            playingTake(r,t,scene);
        }else if(type === "drop_card"){
                
        }else{
            return;
        }
        return true;
    }
    /**
     * @description 战斗结束
     */
    static over(scene:FScene){
        scene.fighters.forEach(f => {
            f.cards_draw = [];
            f.cards_hand = [];
            f.cards_scrap = [];
            f.cards_expend = [];
            Util.initObjValue(f.cards_hand_number,0);
            Util.initObjValue(f.cards_played_number,0);
            f.hp > 0 && scene.addEvents([EType.resetCards,f.id,{"cards_draw":[],"cards_hand":[],"cards_scrap":[],"cards_expend":[]}]);
        });
    }

    /**
     * 使用卡牌
     * @param index 卡牌位置
     * @param tid 目标的fighter_id
     */
    static useCard( fid: number, index: number, scene: FScene, tid?: number ): string{
        if(fid !== scene.cur_fighter){
            return "It's not your turn!!";
        }
        let f = scene.fighters.get(fid),r,s;
        for(let i in f.cards_hand){
            if(f.cards_hand[i] && f.cards_hand[i].index == index){
                r = this.useOneCard(fid,parseInt(i),tid,scene);
                s = 1;
                break;
            }
        }
        if(!s){
            r = `You don't have the card which index is ${index}!!`;
        }
        r && console && console.log && console.log(r);
        return r;
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
        }else if(c.target_type > 10 && fid === tid){
            return "Can't hit yourself!!";
        }else if(!Formula.cacl(c.condition_use,FUtil.getArgArr(f,t,c,scene))){
            return "Not meeting the conditions of use!";
        }
        if(c.cost_energy !== "x" && parseInt(c.cost_energy)>f.energy){
            return "You don't have enough energy!!!";
        }
        delete f.cards_hand[index];
        f.cards_hand_number[c.type] -= 1;
        f.cards_played_number[c.type] += 1;
        f.cards_hand_all -= 1;
        if(c.deal_type == 1){
            f.cards_expend.push(c);
            to = "cards_expend";
        }else if(c.deal_type == 0){
            f.cards_scrap.push(c);
            to = "cards_scrap";
        }
        f.card_spread = c;
        f.card_use = c;
        f.card_targets = Policy.seletTargets(f,c,tid,scene);
        scene.addEvents([EType.useCard,scene.cur_fighter,index,tid]);
        scene.addEvents([EType.cardsMove,f.id,"cards_hand",to,[c.index]]);
        console.log(`cards_hand_number::${JSON.stringify(f.cards_hand_number)},cards_played_number::${JSON.stringify(f.cards_played_number)}`);
        return "";
    }
    /**
     * 选择牌
     */
    static selectCard(fid:number,arr: Array<any>,scene: FScene){
        let f = scene.fighters.get(fid);
        if(!f.wait || f.wait[0] !== "selectCard"){
            return "you don't have a 'selectCard' event!";
        }
        //检查选择的牌是否符合要求
        if(f.wait[1][3] === 1 && arr.length != f.wait[1][6]){
            return `you have to select ${f.wait[1][6]} cards!` 
        }else if(f.wait[1][3] === 2 && arr.length > f.wait[1][6]){
            return `you can select ${f.wait[1][6]} cards at most!`
        }
        dealPlayingTake(f,f.wait[1][0],f.wait[1][1],f.wait[1][7],f.wait[1][8],arr,scene);
    }
}

 // ================================ 本地


/**
 * @description 抽牌,先从抽牌堆中抽一次，如果抽牌堆中牌抽完还不够，则把弃牌堆重置到抽牌堆，再抽一次
 */
const takeCards = (f: Fighter, scene: FScene) => {
    let num: number = f.cards_number-f.cards_reduce+f.cards_add,
        left: Array<Card>,
        leftIndex: Array<number>,
        len: number;
    num = Math.min(num,f.cards_max-f.cards_hand.length);
    left = f.cards_draw.splice(0,num);
    f.cards_hand = f.cards_hand.concat(left);
    if(left.length)scene.addEvents([EType.takeCards,f.id,getCardsIndex(left)]);
    if(left.length < num){
        sortCards(f, scene);
        left = f.cards_draw.splice(0,num - left.length);
        leftIndex = getCardsIndex(left);
        f.cards_hand = f.cards_hand.concat(left);
        scene.addEvents([EType.takeCards,f.id,leftIndex]);
    }
    for(let i = 0,len = f.cards_hand.length;i<len;i++){
        f.cards_hand_number[f.cards_hand[i].type] += 1;
    }
    f.cards_hand_all = f.cards_hand.length;
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
 *        4,formula [["属性名","属性值"],["",">",""],...]判断牌是否满足条件的函数（抽取源牌堆时使用）
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
        select = CfgMgr.select(["cfg/card",`cfg/card_${f.occ_name_en}`],param[5],scene,mergeAttr(param[4],param[7]));
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
    if(to == "cards_hand"){
        f.cards_hand_all = f.cards_hand.length;
    }
    scene.addEvents([t,f.id,from,to,cs]);
    //添加卡牌buff
    if(!buffs){
        return;
    }
    for(let i = 0,len = cards.length;i<len;i++){
        c = cards[i];
        for(let j =0,leng = buffs.length;j<leng;j++){
            b = CfgMgr.create(["cfg/buff"],buffs[i],Buff);
            Policy.addOneBuff(c,c,b,scene);
        }
    }
}
/**
 * @description 合并卡牌选择条件
 */
const mergeAttr = (arr,id): Array<any> => {
    let attr = arr?arr.slice():[];
    if(id){
        attr.push(["id",id]);
    }
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
 * @description 计算卡牌效果
 */
const caclCard = (f: Fighter, t: Fighter, c: Card, scene: FScene): void => {
    // let r,s = "normal",rest = [];
    //计算伤害
    if(c.damage){
        caclDamage(f,t,c,scene);
        Policy.fireBuff(t,f,5,scene);
        if(f.damage){
            Policy.fireBuff(t,f,6,scene);
        }
        if(t.hp <= 0){
            Policy.fireBuff(t,f,19,scene);
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
    let r,s = "normal",reset = [],block;
    if(c.damage_type){
        s = "true";
    }
    r = Math.ceil(Formula.cacl("damage_"+s,FUtil.getArgArr(f,t,c,scene)));
    if(!c.damage_type){
        block = t.block;
        r = Policy.caclDamageNormal(r,f,t,reset,scene);
        //触发突破格挡的buff
        block > 0 && r > 0 && Policy.fireBuff(f,t,20,scene);
    }
    if(t.type == "fighter"){
        console.log("card :: ",t.hp,r);
    }
    t.hp -= r;
    t.hp = Math.max(t.hp,t.min_hp);
    if(t.hp < 0){
        f.damage_overflow += (-t.hp);
        t.hp = 0;
    }
    reset.push(["hp",t.hp]);
    scene.addEvents([EType.restAttr,t.id,reset]);
    scene.addEvents([EType.damage,f.id,t.id,r]);
    reset = [];
}
/**
 * 计算卡牌格挡
 */
const caclBlock = (f: Fighter, t: Fighter, c: Card, scene: FScene):void => {
    let r,reset = [];
    r = Math.ceil(Formula.cacl("block",FUtil.getArgArr(f,t,c,scene)));
    if(isNaN(r)){
        console.log("block r = ",r);
    }
    if(isNaN(f.block)){
        console.log("f.block = ",f.block);
    }
    if(r > 0){
        f.block += r;
        reset.push(["block",f.block]);
        scene.addEvents([EType.restAttr,f.id,reset]);
        reset = [];
    }
}