/**
 * 战斗决策
 */
 // ================================ 导入
//mod
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { Util } from "app/mod/util";
//fight
import { Fighter, Card } from "./class";
import { Util as FUtil } from "./util";
import { FScene, FSmgr } from "./scene";
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
        if(f.card_spread){
            return;
        }
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
        // Policy.fireBuff(f,f,2,scene);
    }
    /**
     * @description 一个英雄回合结束,处理手牌的去处，弃牌堆、消耗堆、留在手牌堆
     *              重置属性
     */
    static endSingleRound(f: Fighter,scene: FScene): boolean{
        let out = {
                scrap: [],
                expend: [],
                disappear:[]
            },
            lens = {
                scrap: f.cards_scrap.length,
                expend: f.cards_expend.length
            },
            e: Card,
            temp:string,
            to:string;
        
        for(let i = f.cards_hand.length-1;i>=0;i--){
            e = f.cards_hand[i];
            if(e && e.deal_type == 4){
                useOneCard(f,e,i,0,scene);
            }
            if(f.card_auto){
                return true;
            }
        }
        for(let i = f.cards_hand.length-1;i>=0;i--){
            e = f.cards_hand[i];
            if(!e){
                
                f.cards_hand.splice(i,1);
                continue;
            }
            if(e.deal_type == 2 || e.deal_type == 5){
                temp = "expend";
                Policy.addBuffs(f,[f.id],e,4,scene);
            }else if(f.cards_rest>=1){
                temp = "scrap";
            }
            if(temp){
                out[temp].push(e.index);
                f["cards_"+temp].push(e);
                f.cards_hand.splice(i,1);
                if(temp == "expend"){
                    f.draw_now = e;
                    Policy.fireBuff(f,f,9,scene);
                    delete f.draw_now;
                }
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
                scene.addEvents([EType.cardsMove,f.id,"cards_hand",to,out[k],lens[k]||0]);
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
            count,
            cacl = () => {
                for(let i = 0 ,len = ts.length;i<len;i++){
                    t = scene.fighters.get(ts[i]);
                    if(t.hp>0){
                        f.damage_overflow = 0;
                        caclCard(f,t,c,scene);
                    }
                }
            },
            parseNum = (str: string): number => {
                let n: any = str.replace(/[^0-9]+/,"");
                n = n?Number(n):0;
                return n;
            };
        if(!f.expend_energy){
            Policy.caclEnergy(f,c.cost_energy,scene);
        }
        scene.addEvents(e);
        ei = scene.events.length;
        Policy.addBuffs(f,ts,c,1,scene);
        //TODO...触发使用卡牌前的buff
        for(let i = 0,len = ts.length;i<len;i++){
            Policy.fireBuff(f,scene.fighters.get(ts[i]),3,scene);
        }
        if(c.block){
            count = !(c.cost_energy >=0) && c.cost_energy.indexOf("y") == 0?f.energy + parseNum(c.cost_energy):1;
            for(let i = 0; i < count; i++){
                if(c.target_type == 1){
                    caclBlock(f,t,c,scene);
                }else{
                    for(let i = 0 ,len = ts.length;i<len;i++){
                        t = scene.fighters.get(ts[i]);
                        if(t.hp>0){
                            caclBlock(t,t,c,scene);
                        }
                    }
                }
            }
        }else if(c.damage){
            count = !(c.cost_energy >=0) && c.cost_energy.indexOf("x") == 0?f.energy + parseNum(c.cost_energy):c.damage_count;
            for(let j = 0;j<count;j++){
                scene.addEvents([EType.action,j+1,f.id]);
                cacl();
                if(!c.target_inherit){
                    ts = Policy.seletTargets(f,c,null,scene);
                }
            }
        }
        //fireBuff();
        
        if(Policy.check(scene) == 0){
            Policy.addBuffs(f,ts,c,2,scene);
            //TODO...触发使用卡牌后的buff
            for(let i = 0,len = ts.length;i<len;i++){
                Policy.fireBuff(f,scene.fighters.get(ts[i]),4,scene);
                Policy.fireBuff(scene.fighters.get(ts[i]),f,31,scene);
                Policy.fireBuff(scene.fighters.get(ts[i]),f,39,scene);
            }
        }
        
        e.push(scene.events.splice(ei));
        //重置释放卡牌,会有buff触发某个释放的卡牌再释放一次
        f.damage = 0;
        f.expend_energy = 1;
        f.card_spread.attach_damage = 0;
        f.card_spread.attach_block = 0;
        f.card_spread = f.card_spread_next;
        f.card_targets = f.card_targets_next;
        f.card_spread_next = undefined;
        f.card_targets_next = undefined;
        f.card_auto = 0;
    }
    /**
     * @description 处理buff效果
     */
    static excitationBuff(f: Fighter,t: Fighter,type: string,r: any,reset: Array<any>,scene: FScene){
        
        if(type === "card"){
            playingTake(r,t,scene);
        }else if(type === "drop_draw"){
            replaceCard(f,r,scene);
        }else if(type === "card_copy"){
            cardCopy(t,r,scene);
        }else if(type === "invalid_card"){
            t.card_spread.invalid_card = r;
        }else if(type === "card_attribute"){
            cardAttrubute(t,r,scene);
        }else if(type === "card_attribute_play"){
            cardAttributePlay(t,r,scene);
        }else if(type === "change_cards_group"){
            changeCardsGroup(t,r,scene);
        }else if(type === "attach_damage"){
            t.card_spread && (t.card_spread.attach_damage = r);
        }else if(type === "attach_block"){
            t.card_spread && (t.card_spread.attach_block = r);
        }else if(type === "confusion"){
            confusion(t,r,scene);
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
            Util.initObjValue(f.cards_played_number_all,0);
            !f.remove && scene.addEvents([EType.resetCards,f.id,{"cards_draw":[],"cards_hand":[],"cards_scrap":[],"cards_expend":[]}]);
        });
    }

    /**
     * 使用卡牌
     * @param index 卡牌位置
     * @param tid 目标的fighter_id
     */
    static useCard( fid: number, index: number, tid?: number, scene?: FScene ): string{
        scene = scene || FSmgr.scene;
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
            c: Card = f.cards_hand[index];
        if(!c){
            return `There's not the card which index is ${index}`;
        }else if(c.target_type > 10 && fid === tid){
            return "Can't hit yourself!!";
        }else if(f["cant_play"+c.type] || !Formula.cacl(c.condition_use,FUtil.getArgArr(f,t,c,scene))){
            return "Not meeting the conditions of use!";
        }
        if(c.cost_energy === "n"){
            return "You can't use this card!!!";
        }
        if(c.cost_energy !== "x" && parseInt(c.cost_energy)>f.energy){
            return "You don't have enough energy!!!";
        }
        return useOneCard(f,c,index,tid,scene);
    }
    /**
     * 选择牌
     */
    static selectCard(fid:number,arr: Array<any>,scene?: FScene){
        scene = scene || FSmgr.scene;
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
        if(f.wait[3] === dealPlayingTake){
            dealPlayingTake(f,f.wait[1][0],f.wait[1][1],f.wait[1][7],arr,scene);
        }else if(f.wait[3] === dealCardAttrubute){
            dealCardAttrubute(f,getCardByIndex(f.wait[2],arr),f.wait[1][4],f.wait[1][5],f.wait[1][6],scene);
        }else if(f.wait[3] === dealCardCopy){
            dealCardCopy(f,f.wait[1],f.wait[2],arr,scene);
        }
        delete f.wait;
    }
}

 // ================================ 本地


/**
 * @description 抽牌,先从抽牌堆中抽一次，如果抽牌堆中牌抽完还不够，则把弃牌堆重置到抽牌堆，再抽一次
 */
const takeCards = (f: Fighter, scene: FScene) => {
    let num: number = f.cards_number-f.cards_reduce+f.cards_add,
        start:number = f.cards_hand.length,
        left: Array<Card>,
        leftIndex: Array<number>,
        len: number;
    num = Math.min(num,f.cards_max-f.cards_hand.length);
    
    // scene.seed = Util.randomSort(f.cards_draw,scene.seed);
    left = f.cards_draw.splice(0,num);
    f.cards_hand = f.cards_hand.concat(left);
    // if(left.length)scene.addEvents([EType.takeCards,f.id,getCardsIndex(left)]);
    if(left.length < num){
        sortCards(f, scene);
        left = f.cards_draw.splice(0,num - left.length);
        leftIndex = getCardsIndex(left);
        f.cards_hand = f.cards_hand.concat(left);
        // scene.addEvents([EType.takeCards,f.id,leftIndex]);
    }
    for(let i = 0,len = f.cards_hand.length;i<len;i++){
        f.cards_hand_number[f.cards_hand[i].type] += 1;
    }
    f.cards_hand_all = f.cards_hand.length;
    for(start;start < f.cards_hand.length;start++){
        scene.addEvents([EType.takeCards,f.id,[f.cards_hand[start].index]]);
        f.draw_now = f.cards_hand[start];
        Policy.fireBuff(f,f,2,scene);
        if(f.chaos && typeof f.draw_now.cost_energy == "number"){
            FSmgr.useSeed(0,(r)=>{
                let old = f.draw_now.cost_energy;
                f.draw_now.cost_energy = Math.floor(4 * r);
                if(old != f.draw_now.cost_energy){
                    scene.addEvents([EType.resetCardAttr,f.id,[[f.draw_now.index,"cost_energy",f.draw_now.cost_energy]]]);
                }
            })
        }
        delete f.draw_now;
    }
}
/**
 * 
 */
const useOneCard = (f: Fighter,c: Card,index: number,tid: number,scene: FScene,noCaclEnergy?:boolean): string => {
    let to: string,ti: number,invalid;
    f.cards_hand_number[c.type] -= 1;
    f.cards_played_number[c.type] += 1;
    f.cards_played_number.all += 1;
    f.cards_played_number_all[c.type] += 1;
    f.cards_played_number_all.all += 1;
    f.cards_hand_all -= 1;
    f.card_spread = c;
    
    Policy.fireBuff(f,f,28,scene);
    invalid = c.invalid_card;
    if(c.invalid_card){
        f.card_spread = undefined;
        c.invalid_card = 0;
    }else{
        f.card_auto = 1;
        f.card_use = c;
        f.card_targets = Policy.seletTargets(f,c,tid,scene);
        Policy.addBuffs(f,f.card_targets,c,5,scene);
    }
    delete f.cards_hand[index];
    if(c.deal_type == 1 || c.deal_type == 5){
        f.cards_expend.push(c);
        to = "cards_expend";
        ti = f.cards_expend.length-1;
        Policy.fireBuff(f,f,9,scene);
    }else if(c.deal_type !== 3){
        f.cards_scrap.push(c);
        to = "cards_scrap";
        ti = f.cards_scrap.length-1;
    }
    scene.addEvents([EType.useCard,scene.cur_fighter,c.index,tid||0,invalid]);
    scene.addEvents([EType.cardsMove,f.id,"cards_hand",to,[c.index],ti]);
    //使用卡牌计算能量消耗
    if(!noCaclEnergy && !invalid){
        f.expend_energy = 0;
    }
    if(invalid){
        Policy.caclEnergy(f,c.cost_energy,scene);
    }
    return "";
}
/**
 * @description 从某个牌堆中选择牌
 * @param f 
 * @param from 从哪个牌堆选
 * @param from_random 是否随机选择
 * @param from_number 选择几张,0为全部
 * @param id 只选某个id的卡牌
 * @param to_number 最后放入目标牌堆的数量
 */
const selectCards = (f: Fighter,scene: FScene,from: string,from_random: number,formula: Array<any>,from_number: number,id: number,to_number: number):Array<number> => {
    let cards = Util.getNotNullEl(f[from]),
        select = (cs: Array<Card>): Array<number> => {
            let r = [],fm = formula?formula:[];
            if(id){
                fm = fm.concat(["id",id]);
            }
            if(from_random){
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
        cards = f[from];
    }
    result = select(cards);
    return result;
}
/**
 * @description 选择手牌中符合条件的牌
 * @param f 
 */
const targetCards = (f: Fighter,scene: FScene,conditions: Array<any>):Array<number> => {
    let cards = Util.getNotNullEl(f.cards_hand),
        select = (cs: Array<Card>): Array<number> => {
            let r = [],fm = conditions?conditions:[];
            scene.seed = Util.randomSort(cs,scene.seed);
            for(let i =0,len = cs.length;i<len;i++){
                if(Util.condsCheck(cs[i],fm)){
                    r.push(cs[i].index);
                }
            }
            return r;
        },
        result;
    result = select(cards);
    return result;
}
/**
 * @description 局内抽牌，如果有id限制或者没有指定from，则为卡牌复制,否则为卡牌移动
 * @param param [from,to,from_random,to_select,formula,from_number,to_number,id]
 *        0,from 源牌堆，从哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆 0:配置表
 *        1,to 目标牌堆，放哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆 (cards_hand 1)
 *        2,from_random 抽取源牌堆是否随机
 *        3,to_select 是否由玩家自己选择(1:必须选择to_number的数量,2:最大选择to_number的数量),0直接进入目标牌堆，
 *        4,formula [["属性名","属性值"],["",">",""],...]判断牌是否满足条件的函数（抽取源牌堆时使用）
 *        5,from_number 源牌堆中可供选择牌的张数
 *        6,to_number 欲放到目标牌堆的数量
 *        7,id 直接取某个id的牌
 */
const playingTake = (param: Array<any>,f: Fighter,scene: FScene) => {
    let select = [],d = f.cards_max- Util.getNotNullEl(f.cards_hand).length,cp = ["cfg/card",`cfg/card_${f.type === "fighter"?f.occ_name_en:f.type}`];
    if(f.type === "fighter"){
        cp.push(`cfg/card_hero`);
    }
    //存在源牌堆，则选牌，否则从配置表复制一张牌
    if(param[0]){
        select = selectCards(f,scene,param[0],param[2],param[4],param[5],param[7],param[6]);
    }else{
        for(let i =0 ;i<param[5];i++){
            select = select.concat(CfgMgr.select({paths:cp,num:1,scene:FSmgr.scene,condition:mergeAttr(param[4],param[7]),deleteCon:null,type:"card",isFight:true}));
            
        }
    }
    //未选择牌
    if(select.length === 0){
        return;
    }
    //若目标牌堆为手牌，判断是否超过最大手牌数限制
    if(param[1] == "cards_hand") {
        if(d===0){
            return "cards_hand full";
        }else if(d<param[6]){
            param[6] = d;
        }
    }
    switch(param[3])
    {
    //必须选择to_number的数量
    case 1:
        //可供选择的牌不足
        if(select.length < param[6]){
            return;
        }else if(select.length == param[6]){
            dealPlayingTake(f,param[0],param[1],param[7],select,scene);
            scene.addEvents([EType.autoTakeCard,f.id]);
        }else{
            f.wait = ["selectCard",param,select,dealPlayingTake];
            scene.addEvents([EType.selectCard,f.id,param,select]);
        }
        break;
    //最大选择to_number的数量
    case 2:
        //没有可供选择的牌
        if(select.length == 0){
            return;
        }else{
            f.wait = ["selectCard",param,select,dealPlayingTake];
            scene.addEvents([EType.selectCard,f.id,param,select]);
        }
        break;
    //直接进入目标牌堆
    case 0:
        dealPlayingTake(f,param[0],param[1],param[7],select,scene);
        scene.addEvents([EType.autoTakeCard,f.id]);
        break;
    //参数错误
    default:
        return "error param to_select";
    }
}

/**
 * 换牌
 */
const replaceCard = (f: Fighter,r: any,scene: FScene) => {
    let contitions = r[0],
        fun = (num) => {
            // 后随机抽取抽牌堆中select.length+1张牌到手牌
            let select2 = selectCards(f,scene,'cards_draw',1,[],num,0,num);
            // 未选择牌
            if(select2.length === 0){
                return;
            }
            dealPlayingTake(f,'cards_draw','cards_hand',0,select2,scene);
        }
        
    // 先选择手牌放入弃牌堆
    let select = targetCards(f,scene,contitions);
    let dn = select.length + r[1];
    
    // 未选择牌
    if(select.length === 0){
        fun(dn);
        return;
    }
    dealPlayingTake(f,'cards_hand','cards_scrap',0,select,scene,fun,dn);
}

/**
 * @description 处理局中抽牌结果
 */
const dealPlayingTake = (f: Fighter,from: string,to: string,id: number,cs:Array<any>,scene: FScene,callback?: Function,dn?: number) => {
    let t,cards =[],src = f[from],c,startIndex = f.cards.length,ei = to.indexOf(" "),ti,temp,cp = ["cfg/card",`cfg/card_${f.type === "fighter"?f.occ_name_en:f.type}`];
    if(ei>0){
        to = to.slice(0,ei);
        ti = to.slice(ei+1);
    }else{
        ti = f[to].length;
    }
    if(from == "cards"){
        t = EType.copyCard;
    }else{
        t = EType.cardsMove;
    }
    if(!src){
        if(f.type === "fighter"){
            cp.push("cfg/card_hero");
        }
        for(let i = 0, len = cs.length;i<len;i++){
            c = CfgMgr.create(cp,cs[i],Card);
            c.index = (startIndex++);
            f.cards.push(c);
            cards.push(c);
        }
        scene.addEvents([EType.addNewCards,f.id,cards,from||""]);
    }else{
        cards = getCardByIndex(src,cs,t === EType.copyCard,startIndex);
        
        if(t === EType.copyCard){
            for(let i = 0,len = cards.length;i<len;i++){
                cards[i].index = (startIndex++);
                f.cards.push(cards[i]);
            }
            scene.addEvents([EType.addNewCards,f.id,cards,from||""]);
        }
    }
    temp = f[to].splice(ti);
    f[to] = f[to].concat(cards).concat(temp);
    if(to == "cards_hand" || from == "cards_hand"){
        f.cards_hand_all = Util.getNotNullEl(f.cards_hand).length;
    }
    scene.addEvents([EType.cardsMove,f.id,from||"",to,getCardsIndex(cards),ti]);
    if(to == "cards_hand"){
        for(let i = 0,len = cards.length;i<len;i++){
            f.draw_now = cards[i];
            Policy.fireBuff(f,f,2,scene);
            Policy.fireBuff(f,f,13+cards[i].type,scene);
            if(f.chaos && typeof f.draw_now.cost_energy == "number"){
                FSmgr.useSeed(0,(r)=>{
                    let old = f.draw_now.cost_energy;
                    f.draw_now.cost_energy = Math.round(old * r);
                    if(old != f.draw_now.cost_energy){
                        scene.addEvents([EType.resetCardAttr,f.id,[[f.draw_now.index,"cost_energy",f.draw_now.cost_energy]]]);
                    }
                })
            }
            delete f.draw_now;
        }
        
    }
    if(to == "cards_expend"){
        for(let i = 0,len = cards.length;i<len;i++){
            Policy.addBuffs(f,[f.id],cards[i],4,scene);
            f.draw_now = cards[i];
            Policy.fireBuff(f,f,9,scene);
            delete f.draw_now;
        }
    }
    if(to == "cards_scrap"){
        for(let i = 0,len = cards.length;i<len;i++){
            f.draw_now = cards[i];
            Policy.fireBuff(f,f,40,scene);
            delete f.draw_now;
        }
    }
    if(callback) callback(dn);
}
/**
 * @description  修改牌的属性
 * @param f 需要修改的fighter
 * @param r 修改的参数[from,from_random?,from_number,卡牌条件([["属性名","属性值",...],...]),需要修改的属性名([key1,key2,...]),修改属性的运算符(["+","-","*","/","=",...]),修改运算符右边的值([value1,value2,value3,....])]
 */
const cardAttrubute = (f: Fighter,r: Array<any>,scene: FScene) => {
    let fm = r[0].split(" "),
        src = f[fm[0]],select,
        rmNotMatch = () => {
            if(!isNaN(r[4])){
                return;
            }
            for(let i = select.length-1;i>=0;i--){
                if(!select[i] || !Util.condsCheck(select[i],r[3])){
                    select.splice(i,1);
                }
            }
        };
    if(src && fm[1]){
        src = src[fm[1]-1];
    }
    if(!src){
        return;
    }
    if(src._class === "card"){
        select = [src];
        
    }else if(src.length>0){
        select = src.slice();
        rmNotMatch();
        if(r[1] == 1){
            scene.seed = Util.randomSort(select,scene.seed);
        }
        if(r[2] && src.length > r[2]){
            select.length = r[2];
        }
        if(r[1] == 0){
            f.wait = ["selcetCard",r,select,dealCardAttrubute];
            scene.addEvents([EType.selectCard,f.id,r,getCardsIndex(select)]);
            select = null;
        }
    }
    if(select){
        return dealCardAttrubute(f,select,r[4],r[5],r[6],scene);
    }
    
}
/**
 * @description 处理修改卡牌属性
 */
const dealCardAttrubute = (f: Fighter,cs: Array<Card>, keys: Array<string>, operations: Array<string>, values: Array<any>, scene: FScene) => {
    let c: Card,r = [],event = [];
    for(let i in cs){
        c = cs[i];
        r.push(c.index);
        for(let j = 0, leng = keys.length; j < leng; j ++){
            r.push(keys[j]);
            c[keys[j]] = Util.calculate[operations[j]](c[keys[j]],values[j]);
            r.push(c[keys[j]]);
        }
        event.push(r);
        if(f.buff_now && f.buff_now.cards.indexOf(c.index) === -1){
            f.buff_now.cards.push(c.index);
        }
        r = [];
    }
    scene.addEvents([EType.resetCardAttr,f.id,event]);
    event = [];
    return c;
}
/**
 * @description 修改卡牌属性，并打出
 * @param f 
 * @param r 
 * @param scene 
 */
const cardAttributePlay = (f: Fighter,r: Array<any>,scene: FScene) => {
    let c = cardAttrubute(f,r,scene),index = 0;
    if(!c){
        return;
    }
    for(let i = 0, len = f.cards_hand.length; i < len; i++){
        if(f.cards_hand[i].index == c.index){
            index = i;
        }
    }
    useOneCard(f,c,index,null,scene,true);
}
/**
 * @description 复制卡牌
 * @param f 
 * @param r [from,to,from_random,to_select,formula,from_number,to_number]
 *        0 from: 'card_spread'||'cards_hand '+f.cards_hand.length
 *        1 to  :
 *        2 from_random?: 0:手动选择，1:随机选, 2:顺序选
 *        3 to_select: 是否由玩家自己选择(1:必须选择to_number的数量,2:最大选择to_number的数量),0直接进入目标牌堆，
 *        4 formula 卡牌条件([["属性名","属性值",...],...]
 *        5 from_number
 *        6 to_number
 * @param scene 
 */
const cardCopy = (f: Fighter, r: Array<any>,scene: FScene) => {
    let ei = r[0].indexOf(" "),
        key = ei>0?r[0].slice(0,ei):r[0],
        ci = ei>0?parseInt(r[0].slice(ei+1)):-1,
        c = f[key],
        select: Array<Card> = [];
    //指定位置的卡牌
    if(ci > 0){
        select = [c[ci-1]];
    //当前使用的卡牌
    }else if(c._class == "card"){
        select = [c];
    }else{
        for(let i = c.length-1;i>=0;i--){
            if(Util.condsCheck(c[i],r[4])){
                select.push(c[i]);
            }
        }
        //0 手动选择
        if(r[2] === 0){
            select.length = r[5];
            r[0] = key;
            f.wait = ["selectCard",r,select,dealCardCopy];
            scene.addEvents([EType.selectCard,f.id,r,select]);
            select = null;
        //自动选择
        }else{
            //随机
            if(r[2] === 1){
                scene.seed = Util.randomSort(select,scene.seed);
            }
            select.length = r[6];
        }
    }
    if(select){
        dealCardCopy(f,r,select,getCardsIndex(select),scene);
    }
}
/**
 * @description 处理复制卡牌
 * @param f 
 * @param r 复制卡牌的buff效果
 * @param select 从from列表里面拿出来给玩家选择的cards
 * @param arr 玩家选择的卡牌位置列表
 * @param scene 
 */
const dealCardCopy = (f: Fighter,r: Array<any>,select: Array<Card>,arr: Array<number>,scene: FScene) => {
    let to = f[r[1]],
        c: Card,
        si = f.cards.length,
        cards = [],ti,temp;
    for(let i = 0,len = select.length;i<len;i++){
        if(arr.indexOf(select[i].index) >= 0){
            c = Util.copy(select[i]);
            c.index = si++;
            cards.push(c);
            f.cards.push(c);
        }
    }
    scene.addEvents([EType.addNewCards,f.id,cards,r[0]]);
    if(r[1] === "cards_draw"){
        ti = 0;
    }else{
        ti = to.length;
    }
    temp = f[r[1]].splice(ti);
    f[r[1]] = f[r[1]].concat(cards).concat(temp);
    scene.addEvents([EType.copyCard,f.id,r[0],r[1],getCardsIndex(cards)]);
    scene.addEvents([EType.cardsMove,f.id,r[0],r[1],getCardsIndex(cards),ti]);
    for(let i = 0,len = cards.length;i<len;i++){
        f.draw_now = cards[i];
        Policy.fireBuff(f,f,30,scene);
        delete f.draw_now;
    }
} 
/**
 * @description 错乱效果
 */
const confusion = (t,r,scene: FScene) => {
    let event = [];
    if(t.draw_now){
        FSmgr.useSeed(0,(s) => {
            t.draw_now.cost_energy = Math.floor(s * (r + 1));
            event.push([t.draw_now.index,"cost_energy",t.draw_now.cost_energy]);
            scene.addEvents([EType.resetCardAttr,t.id,event]);
        })
    }
}  
/**
 * @description 切换怪物牌组
 */
const changeCardsGroup = (f: Fighter,groupid: number, scene: FScene): void => {
    if(f.cards_group === groupid){
        return;
    }
    let mcards = CfgMgr.getOne("cfg/card_group",groupid).slice();
    f.cards_group = groupid;
    f.cards = [];
    f.cards_hand = [];
    f.cards_scrap = [];
    f.cards_expend = [];
    scene.addEvents([EType.resetCards,f.id,{"cards":[],"cards_draw":[],"cards_hand":[],"cards_scrap":[],"cards_expend":[]}]);
    for(let mm = 0,leng = mcards.length;mm<leng;mm++){
        f.cards.push(FUtil.initCard(CfgMgr.create(["cfg/card_monster"],mcards[mm],Card),mm));
    }
    f.cards_draw = f.cards.slice();
    scene.addEvents([EType.addNewCards,f.id,f.cards,""]);
    scene.addEvents([EType.resetCards,f.id,{"cards_draw":getCardsIndex(f.cards_draw)}]);
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
 * @param indexs 索引列表
 */
const getCardByIndex = (cards: Array<Card>,indexs: Array<number>,iscopy?:boolean,startIndex?:number):Array<Card> => {
    let r = [],c;
    for(var i  = cards.length-1;i>=0;i--){
        if(cards[i] && indexs.indexOf(cards[i].index)>=0){
            c = cards[i];
            
            if(iscopy === false){
                cards.splice(i,1);
            }else if(iscopy === true){
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
    let scrap = f.cards_scrap,dl = f.cards_draw.length;
    f.cards_scrap = [];
    //怪物的牌不排序，按照配置顺序出牌
    if(f.type == "monster"){
        f.cards_draw = f.cards_draw.concat(scrap);
        return ;
    }
    if(scrap.length === 0){
        return ;
    }
    scene.seed = Util.randomSort(scrap,scene.seed);
    f.cards_draw = f.cards_draw.concat(scrap);
    scene.addEvents([EType.cardsMove,f.id,"cards_scrap","cards_draw",getCardsIndex(scrap),dl]);
}

/**
 * @description 计算卡牌效果
 */
const caclCard = (f: Fighter, t: Fighter, c: Card, scene: FScene): void => {
    let dg = f.damage,reset = [],r,fb = f.block;
    //计算伤害
    if(c.damage){
        if(!t.god)caclDamage(f,t,c,scene);
        Policy.fireBuff(t,f,5,scene);
        if(t.damaged){
            Policy.fireBuff(t,f,6,scene);
        }
        if(t.hp <= 0){
            Policy.fireBuff(t,f,19,scene);
        }
        if(f.damage > dg){
            Policy.fireBuff(f,t,29,scene);
        }
        //反伤
        if(t.bramble){
            r = Policy.caclDamageNormal(t.bramble,t,f,reset,scene);
            Policy.damage(t,f,r,reset,scene,fb);
            reset = [];
            f.damaged = 0;
            t.damage = 0;
        }
        t.damaged = 0;
    }
    
}
/**
 * 计算卡牌伤害
 */
const caclDamage = (f: Fighter, t: Fighter, c: Card, scene: FScene):void => {
    let r,s = "normal",reset = [],tb = t.block;
    if(c.damage_type){
        s = "true";
    }
    r = Math.round(Formula.cacl("damage_"+s,FUtil.getArgArr(f,t,c,scene)));
    // r = Math.round(r * Math.max(1-t.un_damage*.1,0));
    if(!c.damage_type){
        r = Policy.caclDamageNormal(r,f,t,reset,scene);
    }
    Policy.damage(f,t,r,reset,scene,tb);
    reset = [];
}
/**
 * 计算卡牌格挡
 */
const caclBlock = (f: Fighter, t: Fighter, c: Card, scene: FScene):void => {
    let r,reset = [];
    r = Math.ceil(Formula.cacl("block",FUtil.getArgArr(f,t,c,scene)));
    if(isNaN(r)){

    }
    if(isNaN(f.block)){

    }
    if(r > 0){
        f.block += r;
        reset.push(["block",f.block]);
        scene.addEvents([EType.restAttr,f.id,reset]);
        reset = [];
        Policy.attrChange(f,"block",r,scene);
    }
}