/**
 * 战斗决策
 */
 // ================================ 导入
//pi
import { Vector3 } from "pi/math/vector3";
//fight
import { Result, Skill, Fighter, Pos } from "./class"
import { Scene, FMgr } from "./fight";
import { Util } from "./util";
import { Request } from "./request";
import { EType } from "./analyze";
import { Fight_formula } from "./common/fight_formula";


 // ================================ 导出
export class Policy{
    /**
     * @description 遍历某个场景内的所有战斗单位，进行决策
     */
    static run(s: Scene):void{
        s.fighters.forEach((v,k)=>{
            if(v.remove && s.now >= v.remove){
                s.addEvents([EType.remove,v.mapId]);
                s.fighters.delete(v.mapId);
                return;
            }
            single(v,s);
            if(!handMove(v,s)){
                ai(v,s);
            }
        })
    }
    /**
     * @description 设置fighter是否被移除
     *              战斗检查结果， 返回0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
     * @param scene 
     */
    static check(scene: Scene){
        //console.log((new Date()).getTime()-scene.singleNow);
        if(scene.level < 2){
            return 0;
        }
        var limitTime = scene.limitTime || Infinity;
        if (scene.fightTime >= limitTime) return 3;
        var left = 0, right = 0;
        scene.fighters.forEach(f => {
            if (f.camp === 1 && f.hp > 0)
                left++;
            if ((f.camp === 2 && f.hp > 0) || (f.camp === 0 && f.hp > 0))
                right++;
            if(!f.remove && f.hp <= 0 && f.max_hpCount > 0) {
                f.remove = scene.now + 2250;
            }
        });
        if (left > 0 && right > 0)
            return 0;
        return left > 0 ? 1 : 2;
    };
    /**
     * @description 战斗自动释放技能，没有全局冷却。可以是战斗开始的被动技能，也可以是定时释放的光环技能
     * @param fighter 
     * @param castType 释放类型： 1单次技能 2引导技能 3被动技能 4光环技能
     */
    static autoSpread(fighter: Fighter, castType: number, scene: Scene):void{
        autoSpread(fighter, castType, scene);
    }
    /**
     * @description 增加buff
     */
    static addBuff(fighter, target, skill, buff, s: Scene){
        addBuff(fighter, target, skill, buff, s);
    }
}

 // ================================ 本地
 /**
 * @description 执行单个fighter决策
 */
const single = (f: Fighter,s: Scene): void => {
    if(s.level < 2){
        //检查移动状态是否需要重置，解决怪物即将死亡前原地踏步的现象
        chcekMove(f,s);
    }
    // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
    if (f.hp <= 0 && f.max_hpCount > 0) {
        return ;
    }
    //如果是眩晕状态，不能释放技能,不能移动
    if (f.stun) {
        return;
    }
    //移动
    if (f.moveto) {
        if (move(f,s)) {
            f.moveto = undefined;
            //每次移动完，接下一段移动
            // linkMovePath(f,s);
        }
        return;
    }
    if(s.level < 2){
        //只处理释放状态，不释放技能，由后台推送
        checkReleaseSkill(f,s);
        return;
    }
        
    //释放技能
    //TODO....
    //释放光环技能        
    autoSpread(f, 4, s);
    //检查buff是否该清除
    buffTimerCalc(f, s);
    //每帧都判断是否有正在释放的技能，如果有，释放一次
    if(f.godSkill){
        releaseSkill(f,"god", s);
    }
    //延迟一帧真正释放技能，与使用技能错开
    checkReleaseSkill(f,s,releaseSkill);
}
/**
 * @description 清除移动状态
 */
const clearMoveStatus = (f: Fighter) => {
    f.path = undefined;
    f.moveto = undefined;
    f.moving = 0;
}
/**
 * @description 检查fighter是否需要ai，否则就等待手动操作
 *  false:技能计算；移动路径衔接
 *  true :技能选择；在目标存在的情况下，继续按照原定目标点移动，不存在则重新选择            
 */
const ai = (f: Fighter, s: Scene):void => {
    let r = Util.checkFighterActive(f,s,true);
    if(r)
        return;
    if(f.ai)
        isAi(f,s);
    else
        notAi(f,s);
}
 /**
  * @description ai运算
  */
const isAi = (f: Fighter, s: Scene) => {
    let target = s.fighters.get(f.curTarget),
        r,
        //使用技能
        us = ():boolean => {
            if(f.curTarget && f.curSkill && caclPath(f,s.fighters.get(f.curTarget),s,f.curSkill.distance)){
                Request.useSkill({type:EType.useSkill,mapId:f.mapId,skill_id:f.curSkill.id,curTarget:f.curTarget,pos:[f.x,f.y],pk:f.pk},s);
                return true;
            //没有目标则按原路线继续跑动
            }else if(!f.curTarget)
                linkMovePath(f,s);
            return false;
        };
    //目标还在,继续移动
    if(!target || target.hp <= 0){
        f.curTarget = undefined;
    }
    if(f.passive === true || (f.spreadSkill && s.level >= 2))
        return;
    //到达目标，使用技能（有可能当前目标已经远离之前的位置，做位置修正，朝新的目标点移动）
    if(f.curTarget && f.curSkill){
        us();
        return;
    }
    
    //技能选择
    if(!f.curSkill){
        f.curSkill = Util.selectSkill(f,s);
    }
    //选择主目标
    if(!f.curTarget && f.curSkill){
        f.curTarget = Util.selectTarget(f,f.curSkill,s);
    }
    //计算移动路径，如果已经接近目标则直接释放技能
    us();
}
 /**
  * @description 非ai运算
  */
const notAi = (f: Fighter, s: Scene) => {
    let t,mt;
    if(s.level < 2 && f.moveto && f.moveto.curTarget){
        t = s.fighters.get(f.moveto.curTarget);
        if(t && f.moveto.near && Util.getPPDistance(f,t).d <= f.moveto.near){
            mt = {x:f.x,y:f.z||0,z:f.y,status:1};
            checkEventRepeat(s,EType.move,[1,"fighter"]);
            s.addEvents([EType.move,f.mapId,mt,0]);
            clearMoveStatus(f);
        }
    }
}
/**
 * @description 计算路径
 * @param d 在目标此半径范围内，算到达目标
 * @returns true: 接近目标; false: 寻找新的路径
 */
const caclPath = (f: Fighter, t: Fighter, s: Scene, d?: number): boolean => {
    let last:any = new Vector3(t.x,0,t.y),dis = Util.getPPDistance(f,t);
    d = d || 0;
    if(dis.d <= d){
        clearMoveStatus(f);
        return true;
    }
    //计算最终目标点，在目标周围以九宫格算法找到最合适的点
    // last = Util.getNearPos(d/.5,d,f,t);
    f.path = Util.getMovePath(s.navMesh, new Vector3(f.x,0,f.y),last,2);
    last = f.path[f.path.length-1];
    if(d>0)
        Util.getFinalPos(f,d);
    // if(f.sid == 10000){
    //     console.log("path :: ",f.path.length,dis.d);
    // }
    linkMovePath(f,s);
    return false;
}
/**
 * @description 处理人物手动移动
 */
const handMove = (f: Fighter,s :Scene) => {
    if(!f.handMove){
        return false;
    }
    if(!f.handMove.init){
        caclPath(f,f.handMove,s);
        f.handMove.init = true;
        return true;
    }
    if(s.now >= f.handMove.time){
        delete f.handMove;
        return false
    }else{
        if(!f.handMove.time && !f.moveto){
            linkMovePath(f,s);
        }
        return true;
    }
}
 /**
  * @description 衔接移动路径
  * @returns true: 正在移动; false: 到达目标点
  */
const linkMovePath = (f: Fighter,s: Scene): void => {
    if(f.path && f.path.length == 0){
        console.error("the path is error!!");
        return clearMoveStatus(f);
    }
    if(!f.moveto && f.path){
        f.moveto = f.path.shift();
        if(f.path.length == 0){
            f.path = undefined;
            f.moveto.status = 1;
        }
        //发送目标点以及靠近距离，缓解移动过程中进入可放技能范围时，前后台位置不一致
        if(f.curTarget){
            f.moveto.curTarget = f.curTarget;
            if(f.curSkill){
                f.moveto.near = f.curSkill.distance;
            }
        }
        // if(f.sid == 10000){
        //     console.log("moveto :: ",f.moveto);
        // }
        Request.moveto({type:EType.moveto,mapId:f.mapId,pos:f.moveto,old:{x:f.x,y:f.y}},s);
    }
}
/**
 * @description 执行fighter移动
 */
const move = (f: Fighter,s: Scene):boolean => {
    let near = 0,x = f.moveto.x,y = f.moveto.z;
    let dist = Math.sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y)), speed = f.speed;
    const clear = () => {
        if(f.moveto.status){
            if(f.handMove && f.handMove.init)
                f.handMove.time = s.now + 2000;
            f.moving = 0;
        }
        // if(f.sid == 10000){
        //     console.log("move end");
        // }
        s.addEvents([EType.move,f.mapId,f.moveto,0]);
        f.moveto = undefined;
    };
    if (dist < near) {
        clear();
        return true;
    }
    dist = speed / dist;
    if (dist >= 1) {
        f.x = x;
        f.y = y;
        clear();
        return true;
    }
    f.x += (x - f.x) * dist;
    f.y += (y - f.y) * dist;
    checkEventRepeat(s,EType.move,[1,"fighter"]);
    s.addEvents([EType.move,f.mapId,f.moveto,1]);
    f.moving = s.now;
    // if(f.sid == 10000){
    //     console.log("moving",f.moveto);
    // }
    return false;
}
/**
 * @description 检查事件是否重复，重复事件覆盖
 * @param s 场景
 * @param type 事件类型，同 EType
 * @param condition [index,value] index:事件数组的索引，value: 事件数组的值
 */
const checkEventRepeat = (s,type,condition) => {
    for(let i = s.listenEvent.length-1;i>=0;i--){
        let e = s.listenEvent[i];
        if(!e){
            return console.log(`The element is ${e} at ${i} of listenEvent`);
        }
        if(e[0] == type && e[condition[0]] == condition[1]){
            s.listenEvent.splice(i,1);
            return console.log(`The element is exist same type ${type}`);
        }
    }
}
/**
 * @description 检查移动状态是否超过2帧，超时则重置为非移动状态
 * @param f 
 * @param s 
 */
const chcekMove =  (f: Fighter,s: Scene):void => {
    const mt = {x:f.x,y:f.z||0,z:f.y,status:1};
    // if(f.moving && !f.moveto)console.log(f.mapId,s.now - f.moving);
    if(f.show_hp > 0 && f.actionTime <= s.now && f.moving && (s.now - f.moving)/(1000/FMgr.FPS) >= 3){
        // console.log("stop moving ~~~~~",f.mapId);
        // if(f.sid == 10000){
        //     console.log("stop moving");
        // }
        s.addEvents([EType.move,f.mapId,mt,0]);
        f.moving = 0;
    }
}
/**
 * @description 战斗自动释放技能，没有全局冷却。可以是战斗开始的被动技能，也可以是定时释放的光环技能
 * @param fighter 
 * @param castType 释放类型： 1单次技能 2引导技能 3被动技能 4光环技能
 */
const autoSpread = (fighter: Fighter, castType: number, scene: Scene) => {
    for (var i = 0, len = fighter.skill.length; i < len; i++) {
        var s = fighter.skill[i];
        if (s.castType !== castType || (s.cdTime > 0 && s.cdNextTime > scene.now))
            continue;
        s.cdNextTime = scene.now + s.cdTime;
        spreadSkill(fighter, Util.skillTarget(fighter, s, scene), s, scene);
    }
}
/**
 * @description 技能释放
 * @param { Fighter } f 
 * @param { String } type "spread"普通释放技能 || "god"神兵类释放技能，不影响人物其它技能、动作
 */
const releaseSkill = (f,type, scene: Scene) => {
    var s = type+"Skill",
        nextTime = type+"NextTime",
        targets = type+"Targets",
        tl;
    if (f[nextTime] > scene.now)
            return;
    tl = Util.skillTarget(f,f[s], scene);
    f[s].delaySpreadSkillTime =  scene.now;
    spreadSkill(f, tl, f[s], scene);
    //连招技能
    if(f[s].backSkill){
        var bs = f[s].backSkill.slice(0) || [],
            skill = Util.getFighterSkill(f,bs.shift());
        if(skill){
            skill.backSkill = bs;
            f[nextTime] = scene.now + f[s].actionTime;
            f[s] = skill;
            return;
        }
    }
    f[nextTime] = scene.now;
    f[s] = f[targets] = undefined;
    return;
};
/**
 * @description 延迟一帧真正释放技能，与使用技能错开
 * @param func 释放技能处理函数
 */
const checkReleaseSkill = (f: Fighter,s: Scene,func?: Function) => {
    //延迟一帧真正释放技能，与使用技能错开
    if (f.spreadSkill) {
        if(f.curSkill)
            f.curSkill = undefined;
        else
            func && func(f,"spread", s);
    }
}
/**
 * @description 释放技能
 * @param f 释放者
 * @param t 释放目标
 * @param s 释放技能
 */
const spreadSkill = function (f: Fighter, t: Array<Fighter>, s: Skill, scene: Scene) {
    var probability, i, arg, r,
        cur = scene.fighters.get(f.curTarget)?f.curTarget:Util.selectTarget(f, s, scene),
        curTarget = scene.fighters.get(cur),
        ts;
    f.curTarget = cur;
    //继承目标
    t = Util.inheritTargets(f,t,s,scene);
    ts = Util.getMapId(t,scene);
    // if(f.sid == 10000){
    //     console.log(t);
    // }
    scene.addEvents([EType.spreadSkill,f.mapId,ts,s.id]);
    // 根据技能的作用范围和目标类型，修正目标数组
    //圆形范围
    if (s.isRangeSkill === 1)
        t = Util.rangeTargets(t, s.targetType, s.range, f.camp, f,scene);
    //矩形范围
    else if(s.isRangeSkill === 2){
        t = Util.polygonTargets(t, s.targetType , s.range, f.camp, f, scene);
    }
    addSkillBuff(f, t, s, 1, scene);
    //增加技能携带的被动buff addTime 3
    addSkillBuff(f, t, s, 3,scene);
    // 攻击前触发相应buff
    for (var i:any = 0; i < t.length; i++) {
        fireBuff(f, t[i], 2, scene);
    }
    for (var k = 0, len = t.length; k < len; k++) {
        i = t[k];
        arg = Fight_formula.getArgArr(f, i, s, true);
        //console.log("spreadSkill:", f.id);
        if (s.damageType === 1) {
            probability = (s.skillType === 1) ? Fight_formula.skillCalc("hitFormula", arg) : 1;
            if (Util.checkProbability(probability,scene)) {
                r = calcAction(f, i, s, arg, calcDamage,scene);
                //目标承受伤害记录到列表中
                if (i.damageList[f.sid]) i.damageList[f.sid] += r.damage;
                else i.damageList[f.sid] = r.damage;

                //把人物造成的伤害累加绑在自己身上 参与buff吸血计算
                if (f.damage !== undefined) f.damage += r.damage;
                else f.damage = r.damage;
            } else {
                r = { dodge: true };
            }
            scene.addEvents([EType.damage,f.mapId,ts.indexOf(i.mapId),i.mapId,r,s.id]);
            if(i.passive){
                //被动变主动
                i.passive = false;
                //怪物反击
                i.curTarget = f.mapId;
            }
        } else if (s.damageType === 2) {
            r = calcAction(f, i, s, arg, calcHealth,scene);
            scene.addEvents([EType.damage,f.mapId,ts.indexOf(i.mapId),i.mapId,r,s.id]);
        }
    }
    addSkillBuff(f, t, s, 2, scene);
    // 攻击后触发相应buff
    for (var i:any = 0; i < t.length; i++) {
        fireBuff(f, t[i], 7,scene);
    }
    clearTempBuff(f,scene);
    for (var k = 0, len = t.length; k < len; k++) {
        i = t[k];
        clearTempBuff(i,scene);
    }
    //单次伤害计算清空
    f.damage = 0;
};

// 根据添加时间（addTime--1：攻击前，2：攻击后），添加fighter, targets的buff（targetType--1：目标类型为目标，2：目标类型为自己）
const addSkillBuff = (fighter, targets, skill, addTime, scene: Scene) => {
    var b, t;
    for (var i = 0, leng = skill.buff.length; i < leng; i++) {
        b = skill.buff[i];
        if ((!b) || b.addTime !== addTime)
            continue;
        //给自己加
        if (b.targetType === 2) {
            addBuff(fighter, fighter, skill, b, scene);
            continue;
            //给目标加
        } else if (b.targetType === 1) {
            for (var k = 0, len = targets.length; k < len; k++) {
                t = targets[k];
                addBuff(fighter, t, skill, b, scene);
            }
        } else if (b.targetType === 3) {
            //给全体队员加
            t = Util.select(scene.fighters, [["groupId",fighter.groupId],['camp', fighter.camp], ['hp', '>', 0]]);

            for (var k = 0, len = t.length; k < len; k++) {
                addBuff(fighter, t[k], skill, b,scene);
            }
        } else if (b.targetType === 4) {
            //给血最少的一个队员加
            t = Util.select(scene.fighters, [["groupId",fighter.groupId],['camp', fighter.camp], ['hp', '>', 0]]);
            Util.limit(t, 1, 'hp', false);
            if(t && t.length>0)addBuff(fighter, t[0], skill, b, scene);
        }
    }
};
// 添加buff
const addBuff = (fighter, target, skill, buff, s: Scene) => {
    var i = -1;
    var same = 0;
    skill = skill || {};
    
    //eventType为8、9时为叠加类buff，8：叠到要求层数时才触发效果，中途没效果，9：每叠一次都多一层效果

    //增加了一个 buff等级  取决于技能等级
    if (!buff.level) buff.level = skill.level || 1;
    if (!buff.star) buff.star = skill.star || 0;

    if (buff.eventType === 8 || buff.eventType === 9) {
        // 叠加计算，寻找是否有相同的buff
        i = Util.indexByAttr(target.buff, "id", buff.id);
        if (i >= 0) {
            buff = target.buff[i];
            //增加释放buff技能的释放者 以及 目标
            buff.T = target.mapId;
            buff.F = fighter.mapId;
            buff.eventCount++;
        }
    }
    if (i < 0) {
        buff = Util.copy(buff);
        //增加释放buff技能的释放者 以及 目标
        buff.T = target.mapId;
        buff.F = fighter.mapId;
        //如果再次触发相同buff 应该覆盖旧buff
        i = Util.indexByAttr(target.buff, "id", buff.id);
        if (i < 0) {
            target.buff.push(buff);
            s.addEvents([EType.addBuff,fighter.mapId,target.mapId,skill.id,buff.id]);
        }else {
            buff = target.buff[i];
        }
        
    }
    buff.startTime = s.fightTime;//buff添加时间
    if (buff.eventType === 1 && buff.timerInterval >= 0) {
        // 立即执行的时间触发的buff
        if(!buff.effective)excitationBuff(fighter, target, buff, s);
    } else if ((buff.eventType === 8 || buff.eventType === 9) && buff.eventCount <= buff.excitationCount * buff.excitationMaxCount && buff.eventCount % buff.excitationCount === 0) {
        // 立即执行的叠加触发的buff
        excitationBuff(fighter, target, buff, s);
    }
};
// 在fighter上触发buff
const fireBuff = (fighter, target, eventType, scene: Scene) => {
    var b;
    for (var i = 0, len = fighter.buff.length; i < len; i++) {
        b = fighter.buff[i];
        if ((!b) || b.eventType !== eventType)
            continue;
        if (b.cdNextTime > scene.now)
            continue;
        if (b.attackHP > 0 && fighter.max_hpCount * b.attackHP >= fighter.hp)
            continue;
        if (b.attackHP < 0 && fighter.max_hpCount * -b.attackHP < fighter.hp)
            continue;
        b.eventCount++;
        if (b.eventCount <= b.excitationCount * b.excitationMaxCount && b.eventCount % b.excitationCount === 0) {
            // 事件次数到了，触发buff  新增buff目标判断
            b.triggerTarget == "T" ? excitationBuff(fighter, target, b, scene) : excitationBuff(fighter, fighter, b, scene, target);
        }
    }
};
// 计算技能的动作
const calcAction = (f, t, s, arg, action, scene: Scene) => {
    fireBuff(f, t, 3, scene);
    fireBuff(t, f, 4, scene);
    var r = action(f, t, s, arg, scene);
    fireBuff(t, f, 5, scene);
    fireBuff(f, t, 6, scene);
    return r;
};
// 计算技能的伤害
const calcDamage = (f, t, s, arg,scene: Scene) => {
    var probability, damage, hp, steal, critical,isPvp = (f.type == "fighter" && t.type == "fighter"),pvp = isPvp?"pvp_":"";
    //debugger;
    // 计算防御减免
    Fight_formula.skillCalc("defenceReduceFormula", arg);
    // 计算伤害
    damage = Fight_formula.skillCalc(`${pvp}damageFormula`, arg) | 0;
    // 计算是否暴击
    probability = Fight_formula.skillCalc("criticalFormula", arg);
    if (Util.checkProbability(probability,scene)) {
        critical = true;
        damage = Fight_formula.skillCalc(`${pvp}criticalDamageFormula`, arg) | 0;
    }
    // console.log("damage:"+damage+",seed:"+scene.seed+",id="+f._id);
    // console.log("s.cdNextTime = "+s.cdNextTime+",now = "+scene.now+",f.publicCDNextTime = "+f.publicCDNextTime+",s.id = " +s.id);
    if (s.skillType === 2) {
        // 如果是魔法伤害，要计算抗性和穿透
        Fight_formula.skillCalc("magicReduceFormula", arg);
        damage = Fight_formula.skillCalc(critical ? "criticalDamageFormula" : "magicDamageFormula", arg) | 0;
        //使用盾
        damage = Util.useShield(t.magicShield, damage);
        damage = Util.useShield(t.shield, damage);
    } else if (s.skillType === 1) {
        damage = Util.useShield(t.phyShield, damage);
        damage = Util.useShield(t.shield, damage);
        // 如果是物理伤害，要计算吸血
        if (!t.god)
            steal = Fight_formula.skillCalc(critical ? `${pvp}criticalStealHPFormula` : `${pvp}stealHPFormula`, arg) | 0;
    }
    hp = t.hp;
    if (t.god) {
        //无敌状态 免疫伤害 将伤害至为0 不抛出伤害效果
        damage = 0;
        scene.addEvents([EType.effect,f.mapId,t.mapId,"god",damage]);
    } else {
        if (damage) {
            t.hp -= damage;
            if (t.hp > t.max_hpCount)
                t.hp = t.max_hpCount;
            if(t.hp <= 0){
                t.killed = f.mapId;
            }
        } else {
            //抛吸收
            scene.addEvents([EType.effect,f.mapId,t.mapId,"shield",damage]);
        }
    }
    hp = t.hp - hp;
    f.hp += steal | 0;
    if (f.hp > f.max_hpCount)
        f.hp = f.max_hpCount;
    return { critical: critical, damage: damage, hp: hp, steal: steal };
};
// 计算技能的治疗
const calcHealth = (f, t, s, arg,scene: Scene) => {
    var critical;
    // 计算治疗 除掉小数
    var health = Fight_formula.skillCalc("healthFormula", arg) | 0;
    // 计算是否暴击
    var probability = Fight_formula.skillCalc("healthCritFormula", arg);
    if (Util.checkProbability(probability,scene)) {
        critical = true;
        health = Fight_formula.skillCalc("criticalHealthFormula", arg) | 0;
    }
    t.hp += health;
    if (t.hp > t.max_hpCount)
        t.hp = t.max_hpCount;
    return { critical: critical, health: health };
};
// 激发buff效果
const excitationBuff = (f, t, b, scene: Scene,rt?) => {
    var arr = b.effect, r, v, per;
    if (b.attackCD){
        b.cdNextTime = scene.now + b.attackCD;
    }
    console.log("excitationBuff",b.id);
    if (!Util.checkProbability(b.probability, scene))//检查生效概率
        return;
    b.effective = scene.fightTime;//设置buff生效时间
    if (t.god && b.buffType === 2)
        return;
    console.log("excitationBuff ok :: ",b.id);
    // debugger;
    for (var i = 0, len = b.effect.length; i < len; i++) {
        var e = b.effect[i];
        r = getBuffEffectValue(e.value, b.F, b.T, b, scene);
        v = r;
        if (e.type === "phyShield") {
            t.phyShield.length++;
            t.phyShield[b.id] = r;
            e.addValue = b.id;
        } else if (e.type === "magicShield") {
            t.magicShield.length++;
            t.magicShield[b.id] = r;
            e.addValue = b.id;
        } else if (e.type === "shield") {
            t.shield.length++;
            t.shield[b.id] = r;
            e.addValue = b.id;
        } else if(e.type === "buff"){
            v = scene.buffs[r];
            //如果主buff目标是自己，但子buff目标又是技能目标，则需要修正目标，不能继承主buff目标
            addSkillBuff(f,(v.targetType == 1 && b.targetType == 2)?[rt]:[t],{buff:[v]},v.addTime,scene);
        } else if (e.type === "skill") {
            // TODO
        } else if (e.type === "repel") {
            // TODO
        } else if (e.type === "hp") {
            r = t.max_hpCount > t.hp + r ? r : t.max_hpCount - t.hp;
            t[e.type] += r;
            if(t.hp <= 0){
                t.killed = f.mapId;
            }
        } else if (e.type === "energy") {
            r = t.max_energyCount > t.energy + r ? r : t.max_energyCount - t.energy;
            t[e.type] += r;
        } else if (e.type === "max_hpCount") {
            e.addValue += r;
            per = r / t[e.type];
            t["hp"] = t["hp"] * (1 + per);
            t[e.type] += r;
        } else if (e.type === "per_attackCount") {
            e.addValue += r;
            t["attackCount"] = t["attackCount"] * (1 + r);
            t[e.type] += r;
        } else if (e.type === "per_defenceCount") {
            e.addValue += r;
            t["defenceCount"] = t["defenceCount"] * (1 + r);
            t[e.type] += r;
        } else if (e.type === "per_max_hpCount") {
            e.addValue += r;
            t["max_hpCount"] = t["max_hpCount"] * (1 + r);
            t["hp"] = t["hp"] * (1 + r);
            t[e.type] += r;
        } else if (e.type === "per_un_defenceCount") {
            e.addValue += r;
            t["un_defenceCount"] = t["un_defenceCount"] * (1 + r);
            t[e.type] += r;
        } else {
            e.addValue += r;
            t[e.type] += r;
        }
        scene.addEvents([EType.effect,f.mapId,t.mapId,e.type,r]);
    }
};
// 清除buff
const clearBuff = (f, b, scene: Scene) => {
    var arr = b.effect, per;
    for (var i = 0, len = b.effect.length; i < len; i++) {
        var e = b.effect[i];
        if (!e.addValue)
            continue;
        if (e.type === "phyShield") {
            Util.removeOArray(f.phyShield, e.addValue);
        } else if (e.type === "magicShield") {
            Util.removeOArray(f.magicShield, e.addValue);
        } else if (e.type === "shield") {
            Util.removeOArray(f.shield, e.addValue);
        } else if (e.type === "max_hpCount") {
            per = e.addValue / (f[e.type] - e.addValue);
            f["hp"] = f["hp"] / (1 + per);
            f[e.type] -= e.addValue;
        } else if (e.type === "per_attackCount") {
            f["attackCount"] = f["attackCount"] / (1 + e.addValue);
            f[e.type] -= e.addValue;
        } else if (e.type === "per_defenceCount") {
            f["defenceCount"] = f["defenceCount"] / (1 + e.addValue);
            f[e.type] -= e.addValue;
        } else if (e.type === "per_max_hpCount") {
            f["max_hpCount"] = f["max_hpCount"] / (1 + e.addValue);
            f["hp"] = f["hp"] / (1 + e.addValue);
            f[e.type] -= e.addValue;
        } else if (e.type === "per_un_defenceCount") {
            f["un_defenceCount"] = f["un_defenceCount"] / (1 + e.addValue);
            f[e.type] -= e.addValue;
        } else {
            f[e.type] -= e.addValue;
        }
    }
    b.effective = e.addValue = 0;
    scene.addEvents([EType.clearBuff,f.mapId,b.id]);
    // scene.listener && scene.listenEvent.push({ type: "clearBuff", fighter: f, buff: b });
};
// 清理临时buff
const clearTempBuff = (f, s:Scene) => {
    Util.traversal(f.buff, function (b) {
        //清除超时的buff效果
        if(b.effectiveTime&& b.effective && b.effective + b.effectiveTime < s.fightTime){
            return clearBuff(f, b, s);
        // 类型9，或有生命周期并没有到达最大激发次数，不清除
        }else if (b.eventType === 9 || b.excitationCount == 0 || b.excitationMaxCount == 0 || b.eventCount < b.excitationCount * b.excitationMaxCount)
            return;
        console.log("buffTimerCalc",b.id);
        if(b.effective)clearBuff(f, b, s);
        return true;
    });
};

// 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
const getBuffEffectValue = (s, F, T, buff, scene) => {
    var r = Util.parseNumber(s), F = scene.fighters.get(F), T = scene.fighters.get(T);
    if (r !== false)
        return r;
    return Fight_formula.effectCalc(s, F, T, buff);
};
// 战斗buff定时事件计算
const buffTimerCalc = function (f,scene: Scene) {
    Util.traversal(f.buff, function (b) {
        var c1, c2;
        if (b.timerInterval > 0) {
            c1 = ((scene.fightTime - b.startTime) / b.timerInterval) | 0;
            c2 = ((scene.fightTime + 1000/FMgr.FPS - b.startTime) / b.timerInterval) | 0;
            // 是否跨作用间隔
            if (c2 - c1) {
                excitationBuff(f, f, b, scene);
            }
        }
        //清除超时的buff效果
        if(b.effectiveTime && b.effective && b.effective + b.effectiveTime < scene.fightTime){            
            return clearBuff(f, b, scene);
        }else if (b.lifeTime == 0 || b.startTime == 0 || b.startTime + b.lifeTime > scene.fightTime)
            return;
        console.log("buffTimerCalc",b.id);
        if(b.effective){
            clearBuff(f, b, scene);
        }
        return true;
    });
};

