// 游戏修正时间，减0小时,//28800
// ========================================= 导入
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { data as localDB } from "app/mod/db";
import { Fighter, Card } from "./class";
import { FScene } from "./scene";

export class Util {
    /**
     * @description 获得技能计算的公式参数列表
     * @param f 使用者
     * @param t 使用目标
     * @param prop 使用道具 卡牌或者技能
     * @param [db, f, t, Card||Skill,buff,af]
     */
    static getArgArr = (f, t, prop,scene, buff?,af?): Array<any> => {
        let arr = [];
        arr[0] = localDB;
        arr[1] = f;
        arr[2] = t;
        arr[3] = prop;
        arr[4] = scene;
        arr[5] = buff;
        arr[6] = af;
        return arr;
    }
    /**
     * @description 获取卡牌描述
     */
    static blendDes(f,t,c,scene){
        let strs = c.des.split(/(\{\{[^(\{\{)(\}\})]+\}\})/),e,fm,idx;
        t = t || new Fighter();
        for(let i =0, len = strs.length;i<len;i++){
            e = strs[i].match(/\{\{(.+)\}\}/);
            if(!e){
                strs[i] = [strs[i],{color:"#cccccc"}];
                continue;
            }
            idx = e[1].indexOf("fix_formula");
            if(idx == 0){
                idx = e[1].replace("fix_formula","")-1;
                fm = c.buff_list[idx][e[1]];
            }
            fm = fm || e[1];
            if(!Formula.table[fm]){
                strs[i] = [fm,{color:"#ffff00"}];
                continue;
            }
            strs[i] = [Formula.cacl(fm,this.getArgArr(f,t,c,scene,null,f)),{color:"#ffff00"}];
            fm = null;
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
            cfg = {
                "strength":"攻击伤害提升$",
                "agility":"卡牌获得格挡增加$"
            };
        for(let i = 0,len = buffs.length;i<len;i++){
            b = buffs[i];
            if(!b.icon){
                continue;
            }
            idx = icon.indexOf(b.icon);
            e = r[idx] || (()=>{
                icon.push(b.icon);
                let _r = {icon:b.icon,number:0,des:b.des,color:b.debuff?-1:1};
                r.push(_r);
                return _r;
            })();
            if(b.cover_rule == 1){
                e.number += (b.life - f.round);
            }else if(b.cover_rule == 2){
                e.number += (b.add_value[b.icon] || 0);
            }else if(b.cover_rule == 3){
                if(b.excitation_expect_count>1){
                    e.number += (b.event_count%b.excitation_expect_count);
                }else{
                    e.number += (b.excitation_max_count - b.event_count)
                }
            }
        }
        for(let i = r.length-1;i>=0;i--){
            let it = r[i];
            if(it.number === 0){
                r.splice(i,1);
                return;
            }
            if(!it.des){
                return;
            }
            e = it.des.match(/\{\{([^(\{\{)(\}\})]+)\}\}/g);
            if(e){
                for(let i = 0,len = e.length;i<len;i++){
                    it.des = it.des.replace(e[i],Formula.cacl(e[i],[it.number]));
                }
            }
        }
        for(let k in cfg){
            let v = f[k];
            if(v){
                r.push({icon:k,number:v,des:cfg[k].replace("$",v),color:v>0?1:-1});
            }
        }
        console.log(f.id,r);
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
                    if(e<= energy){
                        energy -= e;
                        if(c.benefit){
                            r[c.benefit] = [1,0,0,0];
                        }
                        if(c.damage){
                            r[`${c.damage_type?"12":"11"}`] = [1,1,Math.ceil(Formula.cacl(`damage_${c.damage_type?"true":"normal"}`,this.getArgArr(f,t,c,scene))),c.damage_count];
                        }
                        if(c.block){
                            r[13] = [1,0,Math.ceil(Formula.cacl("block",this.getArgArr(f,t,c,scene))),0];
                        }
                    }
                    num -= 1;
                    if(num === 0){
                        return;
                    }
                }
            };
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
        return r;
    }
    /**
     * @description 初始化卡牌
     */
    static initCard = (c:any,index:number):Card => {
        let b;
        c.index = index;

        for(let j = 0,leng = c.buffs.length;j<leng;j++){
            b = c.buffs[j];
        }
        //TODO...初始化卡牌自身的buff
        //.....

        return c;
    };
};
