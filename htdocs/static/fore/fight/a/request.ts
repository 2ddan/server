/**
 * 战斗外部请求
 * 如果需要同步后台，则必须设置server通讯接口
 */
 // ================================ 导入
import { Scene, FMgr } from "./fight";
import { Fighter, Pos, Skill, Result } from "./class";
import { Policy } from "./policy";
import { Util } from "./util";
import { EType } from "./analyze";
import { Fight_formula } from "./common/fight_formula";

 // ================================ 导出
export class Request{
    /**
     * @description fighter进入接口
     * @param {Fighter}fighter
     **/  
    static insert(fighter : Fighter, scene: Scene):boolean{
        if(scene.level < 2){
            scene.fighters.set(fighter.mapId,fighter);
            return;
        }

        if (fighter.A)
            Fight_formula.count(fighter);
        if (fighter.hp === 0)
            fighter.hp = fighter.max_hpCount;
        fighter.show_hp = fighter.hp;
        fighter.mapId = scene.mapCount;
        // 计算技能的伤害
        for (var i = 0, len = fighter.skill.length; i < len; i++) {
            var s = fighter.skill[i];
            s.damage = Util.getEffectValue(s.damage, fighter, s);
            s.damagePer = Util.getEffectValue(s.damagePer, fighter, s);
            s.cdNextTime = s.initialCDTime + scene.now;
        }
        scene.fighters.set(scene.mapCount,fighter);

        // 释放被动技能
        Policy.autoSpread(fighter, 3, scene);
        //默认队伍
        if(fighter.groupId){
            Request.addGroup({"mapId":fighter.mapId,"gid":fighter.groupId},scene);
        }

        scene.addEvents([EType.insert,fighter]);
        scene.mapCount += 1;
        return true;
    }
    /**
     * @description 加入组
     * @param {Json}param {mapId:fighter.mapId,gid:队伍id}
     * @param {Scene}scene fighter所在场景 
     * @return 错误信息，""为成功
     **/  
    static addGroup(param: any, scene: Scene): string{
        let fighter = scene.fighters.get(param.mapId),
            gid = param.gid;
        if(fighter.groupId>0 && fighter.groupId != gid){
            Request.removeGroup(fighter.mapId,scene);
        }
        let g = scene.group[gid];
        if(!g)
            g = scene.group[gid] = [];
        if(g.indexOf(fighter.mapId) < 0){
            g.push(fighter.mapId);
            scene.addEvents([EType.addGroup,fighter.mapId,gid]);
            //通知后台
            FMgr.netRequest(EType.addGroup,param);
            return "";
        }
        return "The fighter has been in the group!!";
    }
    /**
     * @description 退出组队
     * @param {Json}param {mapId:fighter.mapId}
     * @return 错误信息，""为成功
     **/  
    static removeGroup(param: any, scene: Scene):string{
        let fighter = scene.fighters.get(param.mapId),
            gid = fighter.groupId,
            g = scene.group[gid],
            idx = g.indexOf(fighter.mapId);
        if(idx >= 0){
            g.splice(idx,1);
            scene.addEvents([EType.removeGroup,fighter.mapId,gid]);
            if(g.length === 0)
                delete scene.group[gid];
            //通知后台
            FMgr.netRequest(EType.removeGroup,param);
            return "";
        }
        return "The fighter isn't in the group!";
    }
    /**
     * @description 使用技能
     * @param {Json}param {type:"useSkill",mapId:fighter.mapId,skill_id:技能id,curtarget:mapId,pos:[]}
     * @return {string} !"" 则不成功，返回值就是错误信息，否则成功
     * @return 错误信息，""为成功
     **/  
    static useSkill(param: any, scene: Scene):string{
        
        let f = scene.fighters.get(param.mapId),
            curTarget = scene.fighters.get(param.curTarget),
            s = Util.getFighterSkill(f,param.skill_id),
            r = Util.checkFighterActive(f,scene);
        
        if(s.hand == 2){
            f.godSkill = s;
            FMgr.netRequest(EType.useSkill,param);
            return "";
        }
        if(param.pos){
            f.x = param.pos[0];
            f.y = param.pos[1];
        }
        //判断玩家当前是否可活动状态
        if(r)
            return r;
        f.curSkill = s;
        f.curTarget = param.curTarget;
        s.cdNextTime = scene.now + s.cdTime;//下次cd时间
        f.spreadSkill = s;//释放技能
        f.spreadCount = s.guideCount;//引导次数
        f.spreadNextTime = scene.now;
        f.energy -= s.energyCost;
        f.publicCDNextTime = scene.now + scene.publicCD;//下次公共cd时间
        //临时代码
        f.actionTime = scene.now + Util.actionTime(f,s);

        scene.addEvents([EType.useSkill,param.mapId,param.skill_id,param.curTarget,param.pos]);
        //通知后台
        FMgr.netRequest(EType.useSkill,param);
        // if(f.sid == 10000)
        //     console.log("useSkill",f.x,f.y);
        return "";
    }
    /**
     * @description 移动
     * @param param {mapId:fighter.mapId,pos:Pos,old:Pos} pos可选
     * @param scene 
     * @return 错误信息，""为成功
     */
    static move(param: any, scene: Scene):string{
        let f = scene.fighters.get(param.mapId);
        f.x = param.old.x;
        f.y = param.old.y;
        if(!param.pos){
            return;
        }
        if(f.x != param.pos.x || f.y != param.pos.z){
            f.moveto = param.pos;
        }
        scene.addEvents([EType.moveto,param.mapId,Util.copy(param.pos)]);
        //通知后台
        FMgr.netRequest(EType.moveto,param);
        return "";
    }
    /**
     * @description 移除
     * @param param {mapId:fighter.mapId}
     * @param scene 
     * @return 错误信息，""为成功
     */
    static remove(param: any, scene: Scene):string{
        scene.fighters.delete(param.mapId);
        return "";
    }
}

 // ================================ 本地


 