/**
 * 技能使用
 */
 // ================================ 导入
//mod
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { Common } from "app/mod/common";
import { Util } from "app/mod/util";
import { data as localDB, updata, insert } from "app/mod/db";
import { DBback } from "app/mod/db_back";
//fight
import { Fighter, Buff, Skill } from "./class";
import { Util as FUtil } from "./util";
import { FScene, FSmgr } from "./scene";
import { EType } from "./analyze";
import { Policy } from "./policy";
import { globalSend, globalReceive } from "../app/mod/pi";



 // ================================ 导出
export class SkillControl{
    /**
     * @description 初始化战斗者装备buff
     * @param f 
     * @param scene 
     */
    static init(f: Fighter, scene: FScene): Boolean{
        // 暂无
        return true;
    }
    /**
     * @description 技能添加
     * @param sid 技能id
     */
    static equipSkill(sid: number): boolean{
        let p = localDB.player,
            len = p.skills.length;
        if(len == 0){
            p.skills.push([sid,0]);
        }
        else if(len == 1){
            let skill = CfgMgr.create(["cfg/skill"], sid+'', Skill);
            if(skill.fight_skill){
                p.skills.push([sid,0]);
            }else{
                p.skills.unshift([sid,0]);
            }
        }
        else{
            return false;
        }
        updata("player.skills", p.skills);
        return true;
    }

    /**
     * @description 战斗外技能使用
     * @param f 使用人
     */
    static useSkill(): string{
        // 默认第一个技能为战斗外技能
        let arr = localDB.player.skills[1] || localDB.player.skills[0],
            skill = CfgMgr.create(["cfg/skill"], arr[0]+'', Skill);
        if(arr[1] != 0){
            return "Skill Cooling";
        }
        addEffect(localDB.player, skill.function_effect);
        arr[1] = skill.cd;
        updata("player.skills", localDB.player.skills);
        return "";
    }
}

 // ================================ 本地

 // 添加功能效果
const addEffect = function(p,effect: String) {
    let effects = fixEffectValue(effect);
    for(let e of effects) {
        if(e.type == "max_hp"){
            let r = Math.floor(e.value);
            p.max_hp += r;
            updata("player.max_hp", p.max_hp);
            if(r>0){
                p.hp += r;
                updata("player.hp", p.hp);
            }else{
                if(p.max_hp<p.hp) {
                    p.hp=p.max_hp;
                    updata("player.hp", p.hp);
                }
            }
        }
        else if(e.type == "hp"){
            let r = Math.floor(e.value);
            p.hp += r;
            if(p.hp <= 0) {
                p.hp = 0;
                globalSend('msgScreenTips', {text: '角色失血过多，重伤死亡!'});
                globalSend("stageFail");
                return;
            }
            if(p.hp > p.max_hp) {
                p.hp = p.max_hp;
            }
            updata("player.hp", p.hp);
        }
        else{
            p[e.type] += e.value;
            updata("player." + e.type, p[e.type]);
        }
    }
}

// 处理功能效果数值
const fixEffectValue = function(e: String) {
    let effects = [],
        tmp = e.split(",");
    for(let i=0,len=tmp.length;i<len;i+=2){
        let _e = {type: "", value: 0};
        _e.type = tmp[i];
        _e.value = parseInt(tmp[i+1]);
        effects.push(_e);
    }
    return effects;
}