// 游戏修正时间，减0小时,//28800
// ========================================= 导入
import { Formula } from "app/mod/formula";
import { Fighter } from "./class";

export class Util {
    /**
     * @description 获得技能计算的公式参数列表
     * @param f 使用者
     * @param t 使用目标
     * @param prop 使用道具 卡牌或者技能
     * @param [Max, Min, Pow, F, T, Card||Skill,buff,AF]
     */
    static getArgArr = (f, t, prop,scene, buff?,af?): Array<any> => {
        let arr = [];
        arr[0] = function (a, b) { return a > b ? a : b };
        arr[1] = function (a, b) { return a < b ? a : b };
        arr[2] = Math.pow;
        arr[3] = Math.abs;
        arr[4] = f;
        arr[5] = t;
        arr[6] = prop;
        arr[7] = scene;
        arr[8] = buff;
        arr[9] = af;
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
            if(!Formula.table[e[1]]){
                strs[i] = [e[1],{color:"#ffff00"}];
                continue;
            }
            idx = e[1].indexOf("fix_formula");
            if(idx == 0){
                idx = idx.replace("fix_formula","")-1;
                fm = c.buff_list[idx].fix_formula;
            }
            fm = fm || e[1];
            strs[i] = [Formula.cacl(fm,this.getArgArr(f,t,c,scene)),{color:"#ffff00"}];
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
            e;
        for(let i = 0,len = buffs.length;i<len;i++){
            b = buffs[i];
            if(b.icon_visible === 0){
                continue;
            }
            idx = icon.indexOf(b.icon);
            e = r[idx] || (()=>{
                icon.push(b.icon);
                let _r = {icon:b.icon,number:0,des:""};
                r.push(_r);
                return _r;
            })();
            if(b.cover_rule == 1){
                e.number += (b.life - scene.round);
            }else if(b.cover_rule == 2){
                e.number += b.add_value;
            }else if(b.cover_rule == 3){
                if(b.excitation_expect_count>1){
                    e.number += (b.event_count%b.excitation_expect_count);
                }else{
                    e.number += (b.excitation_max_count - b.event_count)
                }
            }
            //TODO..描述混合
            //....
        }
        return r;
    }
};
