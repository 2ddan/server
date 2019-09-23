// 游戏修正时间，减0小时,//28800
// ========================================= 导入
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { data as localDB } from "app/mod/db";
import { Fighter, Skill, Card,  Equipment, SuitEquipment, Buff } from "./class";
import { FScene, FSmgr } from "./scene";
import { Util as MUtile } from "app/mod/util";
import { Common } from "app/mod/common"
import { fightStatus } from "../app_b/fight_show/bridge/fight_status";

export class Util {
    /**
     * @description 通过id查找fighter身上的buff
     * @param buffs 
     * @param id 
     */
    static findBuffById(buffs: Buff[],id: number): Buff{
        for(let bi = 0, bl = buffs.length;bi < bl; bi++){
            if(buffs[bi].id == id){
                return buffs[bi];
            }
        }
    }
    /**
     * @description 获得技能计算的公式参数列表
     * @param f 使用者
     * @param t 使用目标
     * @param prop 使用道具 卡牌或者技能
     * @param [db, f, t, Card||Skill,buff,af]
     */
    static getArgArr = (f, t, prop,scene, buff?,af?, seed?): Array<any> => {
        let arr = [];
        arr[0] = localDB;
        arr[1] = f;
        arr[2] = t;
        arr[3] = prop;
        arr[4] = scene;
        arr[5] = buff;
        arr[6] = af;
        arr[7] = seed;
        return arr;
    }
    /**
     * @description 获取卡牌描述
     */
    static blendDes(f,t,c,scene){
        let strs = c.des.split(/(\{\{[^\{\{\}\}]+\}\})/),e,fm,idx,fi,nb,bf,fb = !f,emt = strs?strs.indexOf(""):-1,
        isDel = false;
        if(!f){
            f = new Fighter();
            if(fightStatus.mySelf){
                f.camp=fightStatus.mySelf.fighter.camp;  
            }
        }
        
        t = t || new Fighter();
        scene = scene || new FScene(0);
        while (emt>=0){
            strs.splice(emt,1);
            emt = strs.indexOf("");
        }
        for(let i =0, len = strs.length;i<len;i++){
            e = strs[i].match(/\{\{(.+)\}\}/);
            if(!e){
                if(isDel){
                    strs[i]  = strs[i] .substr(1,strs[i].length);
                    isDel = false;
                }
                strs[i] = [strs[i],{color:"#cccccc"}];
                continue;
            }
            idx = e[1].indexOf("fix_formula");
            if(idx == 0){
                if(fb){
                    strs[i] = ["",{color:"#ffff00"}];
                    strs[i-1][0] = strs[i-1][0].replace("+","");
                }
                idx = parseInt(e[1].replace("fix_formula",""));
                fi = idx % 10;
                idx = Math.floor(idx/10)-1;
                fm = c.buff_list[idx]["fix_formula"+fi];
                bf = CfgMgr.getOne("cfg/buff",c.buff_list[idx].buff);
            }
            fm = fm || e[1];
            if(!Formula.table[fm]){
                strs[i] = [fm,{color:"#ffb253"}];
                fm = bf = null;
                continue;
            }
            if(FSmgr.isFight()){
                nb = Formula.cacl(fm,this.getArgArr(f,t,c,scene,null,f));
                if(bf && Formula.table[bf.effects[fi-1][0]]){
                    c[bf.effects[fi-1][0]] = nb;
                    nb = Formula.cacl(bf.effects[fi-1][0],this.getArgArr(f,t,c,scene,null,f));
                }
            }else{
                let currUtil = ["damage_normal","damage_true","attach_damage","block","attach_block"];
                //判断当前公式是否在当前大类，如果存在则获取改值，反之则赋值为""且index-1的值为""
                if(currUtil.indexOf(fm) >= 0){
                    nb = Util.initCardAttr(fm,c);
                }else if(e[1].indexOf("fix_formula") < 0){
                    nb = Formula.cacl(fm,this.getArgArr(f,t,c,scene,null,f));
                    if(bf && Formula.table[bf.effects[fi-1][0]]){
                        c[bf.effects[fi-1][0]] = nb;
                        nb = Formula.cacl(bf.effects[fi-1][0],this.getArgArr(f,t,c,scene,null,f));
                    }
                }
            }

            //判断是否在战斗中，如果不在战斗中,取消力量,敏捷,速度,智力等加成

            if(e[0].indexOf("{{") >= 0 && e[0].indexOf("}}") >= 0 ){
                if(!FSmgr.isFight() && strs[i-1] && strs[i-1][0].indexOf("（") >= 0){
                    strs[i-1][0] = strs[i-1][0].substr(0,strs[i-1][0].length-1);
                    isDel = true;
                    nb = "";
                }
            }
            strs[i] = [nb,{color:"#6fdf0c"}];
            fm = bf = null;
        }
        return strs;
    }
    /**
     * @description 获取buff描述
     */
    static blendBuff(f,scene){
        let r = [],
            icon = [],
            buffs = f.buffs,
            b,
            idx,
            e,
            cfg = CfgMgr.get("cfg/buff_show"),
            zhBuffCfg = {},
            rp = (des,number) => {
                e = des.match(/(\{\{[^\{\{\}\}]+\}\})/g);
                if(e){
                    for(let i = 0,len = e.length;i<len;i++){
                        if(!Formula.table[e[i]]){
                            des = des.replace(e[i],e[i].match(/\{\{(.+)\}\}/)[1]);
                            continue;
                        }
                        des = des.replace(e[i],Formula.cacl(e[i],[number]));
                    }
                }
                return des;
            };
        for(let k in cfg){
            let v = f[k];
            if(v){
                r.push({name:cfg[k][0], icon:cfg[k][3], number:v, des:rp(cfg[k][2],v), color:v>0?1:-1, key: k, cfgDes: cfg[k][2]});
            }
            zhBuffCfg[cfg[k][0]] = cfg[k][1];
        }
        for(let i = 0,len = buffs.length;i<len;i++){
            b = buffs[i];
            if(!b.icon){
                continue;
            }
            idx = icon.indexOf(b.icon);
            e = r[idx] || (()=>{
                icon.push(b.icon);
                let _r = {
                    name:b.name, icon:b.icon, number:0, des:b.des,
                    color:b.debuff?-1:1, id: b.id,af:b.af, key: zhBuffCfg[b.name], cfgDes: b.des
                };
                r.push(_r);
                return _r;
            })();
            if(b.cover_rule == 1){
                e.number += (b.life - scene.round - b.showNum);
            }else if(b.cover_rule == 2){
                e.number += (b.add_value[b.icon] || 0);
            }else if(b.cover_rule == 3){
                if(b.excitation_expect_count>1){
                    e.number += (b.event_count%b.excitation_expect_count);
                }else{
                    e.number += (b.excitation_max_count - b.event_count);
                }
            }else if(b.cover_rule >= 40 && b.cover_rule < 50){
                if(b.cover_rule == 40){
                    e.number += b.event_count%b.excitation_expect_count;
                }else if(b.cover_rule == 41){
                    e.number += (b.excitation_expect_count - b.event_count%b.excitation_expect_count);
                }
                
                if(e.number == 0){
                    e.show = 1;
                }
            }else if(b.cover_rule >= 50){
                let ii = b.cover_rule % 50 || 1;
                e.number += b.effects[ii-1][1];
            }else{
                e.show = 1;
            }
        }
        for(let i = r.length-1;i>=0;i--){
            let it = r[i];
            if(!it.show && it.number === 0){
                r.splice(i,1);
                continue;
            }
            if(!it.des){
                continue;
            }
            it.des = rp(it.des,it.number);
        }
        
        return r;
    }
    /**
     * @description 获取意图 1.增益 2.减益 3.强大减益 11.普通攻击 12.魔法攻击 13.格挡
     * @param f 卡牌拥有者 
     * @param t 卡牌目标
     * @param scene 场景
     * @param cfg 意图详情配置表{"id":1(意图id),"name":"","des":""}}
     * @return {"1":[0(是否有该意图),0(是否显示数字),0(数字),0(层数),{name:string,des:string}],"2":[0,0,0,0,{name:string,des:string}],"3":[0,0,0,0,{name:string,des:string}],"11":[0,0,0,0,{name:string,des:string}],"12":[0,0,0,0,{name:string,des:string}],"13":[0,0,0,0,{name:string,des:string}]} 值大于0则表示有该意图
     */
    static intent(f: Fighter,t: Fighter,scene: FScene){
        let c: Card,e: number,energy = f.energy,r = {},cfg,
            num: number = f.cards_number-f.cards_reduce+f.cards_add,
            func = (arr: Array<Card>) => {
                if(num<=0){
                    return;
                }
                for(let i = 0, len = arr.length;i< len;i++){
                    c = arr[i];
                    if(!c){
                        continue;
                    }
                    e = parseInt(c.cost_energy);
                    if(e<= energy && Formula.cacl(c.condition_use,this.getArgArr(f,t,c,scene))){
                        energy -= e;
                        if(c.benefit){
                            r[c.benefit] = [1,0,0,0];
                        }
                        if(c.block){
                            r[13] = [1,0,Math.ceil(Formula.cacl("block",this.getArgArr(f,t,c,scene))),0];
                        }
                        if(c.damage){
                            r[`${c.damage_type?"12":"11"}`] = [1,1,Math.ceil(Formula.cacl(`damage_${c.damage_type?"true":"normal"}`,this.getArgArr(f,t,c,scene))),c.damage_count];
                        }
                    }
                    num -= 1;
                    if(num === 0){
                        return;
                    }
                }
            };
        
        //解决怪的figter的回合大于场景回合而意图显示不正常的问题
        if(f.round > scene.round){
            return r;
        }

        num = Math.min(num,f.cards_max-f.cards_hand.length)+f.cards_hand.length;
        func(f.cards_hand);
        func(f.cards_draw);
        func(f.cards_scrap);
        for(let k in r){
            cfg = CfgMgr.getOne("cfg/intention",k);
            if(cfg.des.indexOf("{{")>=0){
                cfg.des = cfg.des.replace("{{number1}}",r[k][2]).replace("{{number2}}",r[k][3]);
            }
            r[k].push(cfg);
        }
        f.intent = r;
        
        return r;
    }
    /**
     * @description 创建fighter
     */
    static createFighter(): Fighter{
        let unlockHard = localDB.player.difficulty;
        let curseCardNum = 0; // 诅咒牌数量
        let f = new Fighter(),
            heroCfg = CfgMgr.getOne("cfg/hero",localDB.player.hid),
            occCfg = CfgMgr.getOne("cfg/occupation",heroCfg.occupation),
            cards = localDB.cards;
        
        
        f.type = "fighter";
        f.name = heroCfg.name;
        f.occupation = heroCfg.occupation;
        f.occ_name = heroCfg.name;
        f.occ_name_en = occCfg.name_en;
        f.hid = heroCfg.id;
        f.camp = 1;
        f.x = 100;
        f.y = 100;
        f.sid = localDB.player.rid;
        f.hp = localDB.player.hp;
        f.max_hp = localDB.player.max_hp;
        if(unlockHard == 1){
            f.energy = f.max_energy = 4;
        }else{
            f.energy = f.max_energy = 3;
        }
        f.money = localDB.player.money;
        f.strength = localDB.player.strength;
        f.agility = localDB.player.agility;
        f.brain = localDB.player.brain;
        f.speed = localDB.player.speed;
        f.cards_hand = [];
        f.field = localDB.player.field;
        // 技能卷轴对象初始化
        f.scrolls = localDB.player.scrolls;
        f.scrolls_on = localDB.player.scrolls_on;
        f.scroll_use = localDB.player.scroll_use;
        // f.skill = localDB.player.skills[1] ? localDB.player.skills[1] : undefined;
        f.skill = undefined;
        localDB.player.skills.forEach((v,i) => {
            let skill = CfgMgr.create(['cfg/skill'], v[0]+"", Skill);
            if(skill.fight_skill == 1){
                f.skill = localDB.player.skills[i];
            }
        });

        for(let i =0,len = cards.length;i<len;i++){
            f.cards.push(Util.initCard(CfgMgr.create(["cfg/card",`cfg/card_${occCfg.name_en}`,"cfg/card_hero"],cards[i][0]+""+cards[i][1],Card),i));

            if (f.cards[i].type === 5) curseCardNum++;
            // m.cards.push(initCard(CfgMgr.create("cfg/card",cards[i][0]+""+cards[i][1],Card),i));
        }

        Common.achieveDiffDBArr().forEach(achieveDiffDB => {
            achieveDiffDB.caNum = cards.length;
            achieveDiffDB.cuCaNum = curseCardNum;
            achieveDiffDB.bat.maxP = f.strength;
        }); 



        // TODELETE
        if (localDB.testCard) {
            let index = cards.length;
            for (let i = 0; i < 5; i++) {
                f.cards.push(Util.initCard(CfgMgr.create(["cfg/card",`cfg/card_test`], '999991',Card),index));
                index++;
                f.cards.push(Util.initCard(CfgMgr.create(["cfg/card",`cfg/card_test`], '888881',Card),index));
                index++;
            }
        }
        // TODELETE

        if(heroCfg.buffs){
            for(let i = 0, len = heroCfg.buffs.length; i < len; i++){
                let buff = CfgMgr.create(["cfg/buff"], heroCfg.buffs[i]+'', Buff);
                f.buff_list.push(buff);
            }
        }

        // 装备buff
        let equipments = [];
        if (localDB.player.other_equipments) equipments = equipments.concat(localDB.player.other_equipments);
        if (localDB.player.weapon)           equipments = equipments.concat(localDB.player.weapon);
        if (localDB.player.armor)            equipments = equipments.concat(localDB.player.armor);
        

        let tmpSuits = [];
        for(let e of equipments){
            if(e){
                let equipment = CfgMgr.create(["cfg/equipment"], `${e}`, Equipment);

                for(let b of equipment.buff_list) {
                    let buff = CfgMgr.create(["cfg/buff"], b.buff+'', Buff);
                    if(b.fix_attribute){
                        MUtile.fixObjAttrByArr(buff,b.fix_attribute);
                    }
                    for(let f = 0;f<3;f++){
                        if(b[`fix_formula${f+1}`]){
                            buff.effects[f][1] = b[`fix_formula${f+1}`];
                        }
                    }
                    f.buff_list.push(buff);
                }
                let t = tmpSuits.find(s => s.id == equipment.suit_id);
                if(t){
                    // 存在则数量加1
                    t.num++;
                } else {
                    // 不存在则加入tmp
                    let suit = {"id": equipment.suit_id,"num":1}
                    tmpSuits.push(suit);
                }
            }
        }
        // 套装buff添加
        for(let s of tmpSuits) {
            if(s.id){
                let suit = CfgMgr.create(["cfg/suit"],s.id,SuitEquipment);
                let num = suit.components.split(",").length;
                if(s.num == num) {
                    for(let b of suit.buff_list) {
                        let buff = CfgMgr.create(["cfg/buff"], b.buff+'', Buff);
                        if(b.fix_attribute){
                            MUtile.fixObjAttrByArr(buff,b.fix_attribute);
                        }
                        for(let f = 0;f<3;f++){
                            if(b[`fix_formula${f+1}`]){
                                buff.effects[f][1] = b[`fix_formula${f+1}`];
                            }
                        }
                        f.buff_list.push(buff);
                    }
                }
            }
        }
        return f;
    }
    /**
     * @description 创建怪物
     * @param sid 怪物id
     */
    static createMonster(sid): Fighter{
        let unlockHard = localDB.player.difficulty;
        let unlockDifficulty = CfgMgr.getOne('cfg/difficulty',unlockHard);
        let m:Fighter,b,mcfg;
            m = new Fighter();
			mcfg = CfgMgr.getOne("cfg/monster",sid);
			m.sid = mcfg.id;
			m.type = "monster";
			m.name = mcfg.name;
			if(mcfg.hp_rang.length>1){
                m.hp = m.max_hp = mcfg.hp_rang[0]+Math.floor((mcfg.hp_rang[1]-mcfg.hp_rang[0]) * Math.random());
			}else{
				m.hp = m.max_hp = mcfg.hp_rang[0];
            }
            m.hp = m.max_hp = Math.ceil(m.hp * unlockDifficulty.monster_hp);
			if(mcfg.buff_init.length){
            //逆序添加，因为buff触发的时候也是逆序遍历，这样就跟策划配置的顺序一致了
				for(let n =  mcfg.buff_init.length-1;n >= 0;n--){
					b = CfgMgr.create(["cfg/buff"],mcfg.buff_init[n][0],Buff);
					if(mcfg.buff_init[n][1] && mcfg.buff_init[n][1].length){
						MUtile.fixObjAttrByArr(b,mcfg.buff_init[n][1]);
					}
					m.buff_list.push(b);
				}
            }
            let mcards = CfgMgr.getOne("cfg/card_group",mcfg.cards),s = mcfg.start,lf;
            if(mcards){
                mcards = mcards.slice();
                if(!mcfg.start){
                    FSmgr.useSeed(1,(r)=>{
                        s = Math.floor(r*mcards.length);
                    });
                }
                lf = mcards.splice(s-1);
                mcards = lf.concat(mcards);
                for(let mm = 0,leng = mcards.length;mm<leng;mm++){
                    m.cards.push(this.initCard(CfgMgr.create(["cfg/card_monster"],mcards[mm],Card),mm));
                }
            }			
            m.energy = m.max_energy = 3;
            if(unlockHard > 4){             
                m.strength = Formula.cacl('monster_strength',localDB.floor);     
                    //  const calcPowerFunc = new Function('floor', `return ${unlockDifficulty.monster_strength}`);
                    //  const power = calcPowerFunc(localDB.floor);
                    //  m.strength = power;                                                                                          
            }else{
                m.strength =0;
            }
			m.camp = 0;
			m.x = -100;
			m.y = 100;
			m.ai = 1;
			m.cards_rest = 0;
			m.cards_group = mcfg.cards;
            m.visible = mcfg.visible;
            for(let i = 0, len = mcfg.init_attr.length; i < len; i++){
                m[mcfg.init_attr[i][0]] = mcfg.init_attr[i][1];
            }
        return m;
    }
    /**
     * @description 初始化卡牌
     */
    static initCard = (c:any,index:number):Card => {
        // let b;
        c.index = index;

        // for(let j = 0,leng = c.buffs.length;j<leng;j++){
        //     b = c.buffs[j];
        // }
        //TODO...初始化卡牌自身的buff
        //.....

        return c;
    };
    /****
     * @description 获取卡牌基础属性
     */
    static initCardAttr = (type,card) => {
        let attrNum;
        switch(type){
            case "damage_normal":
            case "damage_true":
                attrNum = card.damage;
                break;
            case "attach_damage":
                attrNum = card.attach_damage;
                break;
            case "block":
            case "attach_block":
                attrNum = card.block;
                break;
        }
        attrNum = attrNum || 0;
        return attrNum;
    }
};
