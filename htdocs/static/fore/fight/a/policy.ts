/**
 * 战斗决策
 */
 // ================================ 导入
import { Result, Skill, Fighter, Pos } from "./class"
import { Scene } from "./fight";
import { Util } from "./util";
import { Request } from "./request";
import { EType } from "./analyze";

 // ================================ 导出
export class Policy{
    /**
     * @description 遍历某个场景内的所有战斗单位，进行决策
     */
    static run(s: Scene):void{
        s.fighters.forEach((v,k)=>{
            single(v,s);
            ai(v,s);
        })
    }
}

 // ================================ 本地
 /**
 * @description 执行单个fighter决策
 */
const single = (f: Fighter,s: Scene):void => {
    if (f.hp <= 0 && f.max_hpCount > 0) {
        // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
        return;
    }
    //如果是眩晕状态，不能释放技能,不能移动
    if (f.stun) {
        return;
    }
    //移动
    if (f.moveto) {
        if (move(f)) {
            f.moveto = undefined;
        }
        return;
    }
    //释放技能
    //TODO....
    //释放光环技能        
    Util.autoSpread(f, 4);
    //检查buff是否该清除
    Util.buffTimerCalc(f);
}
/**
 * @description 执行fighter移动
 */
const move = (f: Fighter):boolean => {
    let near = 0,x = f.moveto.x,y = f.moveto.y;
    var dist = Math.sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y)), speed = f.speed;
    if (dist < near) {
        f.moveto = undefined;
        return true;
    }
    dist = speed / dist;
    if (dist >= 1) {
        f.x = x;
        f.y = y;
        f.moveto = undefined;
        return true;
    }
    f.x += (x - f.x) * dist;
    f.y += (y - f.y) * dist;
    f.moving = true;
    return false;
}
/**
 * @description 清除移动状态
 */
// const clearMoveStatus = (f: Fighter) => {
//     f.moving = false;
//     f.path = undefined;
//     f.moveto = undefined;
// }
/**
 * @description 检查fighter是否需要ai，否则就等待手动操作
 *  false:技能计算；移动路径衔接
 *  true :技能选择；在目标存在的情况下，继续按照原定目标点移动，不存在则重新选择            
 */
const ai = (f: Fighter, s: Scene):void => {
    let r = Util.checkFighterActive(f,s);
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
        moving = false,
        r,
        //使用技能
        us = ():boolean => {
            if(f.curTarget && f.curSkill && caclPath(f,s.fighters.get(f.curTarget),s,f.curSkill.distance)){
                Request.useSkill({mapId:f.mapId,skill_id:f.curSkill.id,curTarget:f.curTarget,pos:[f.x,f.y]},s);
                return true;
            }
            return false;
        };
    //目标还在,继续移动
    if(target && target.hp > 0){
        moving = linkMovePath(f,s);
    }else{
        f.curTarget = undefined;
    }
    if(moving || f.passive === true)
        return;
    //到达目标，使用技能（有可能当前目标已经远离之前的位置，做位置修正，朝新的目标点移动）
    r = us();
    if(r || !r && f.path){
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
    
}
/**
 * @description 计算路径
 * @param d 在目标此半径范围内，算到达目标
 * @returns true: 接近目标; false: 寻找新的路径
 */
const caclPath = (f: Fighter, t: Fighter, s: Scene, d?: number): boolean => {
    let lastest = {x:t.x,y:t.y};
    d = d || 0;
    if(Util.getPPDistance(f,t).d <= d)
        return true;
    //TODO..
    //计算最终目标点，在目标周围以九宫格算法找到最合适的点
    lastest = Util.getNearPos(3,f,t);
    f.path = Util.getMovePath(s.navMesh,f,lastest,2);
    return false;
}
 /**
  * @description 衔接移动路径
  * @returns true: 正在移动; false: 到达目标点
  */
const linkMovePath = (f: Fighter,s: Scene): boolean => {
    if(!f.moveto && f.path){
        f.moveto = f.path.shift();
        if(f.path.length == 0)
            f.path = undefined;
        Request.move({mapId:f.mapId,pos:f.moveto,old:{x:f.x,y:f.y}},s);
        return true;
    }else if(f.moveto){
        return true;
    }
    return false;
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
        spreadSkill(fighter, Util.skillTarget(fighter, s), s, scene);
    }
}
/*释放技能
         * @param f-释放者，t-释放目标，s-释放技能*/
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
        ts = curTarget?[curTarget]:[];
    f.curTarget = cur;
    // 根据技能的作用范围和目标类型，修正目标数组
    //圆形范围
    if (s.isRangeSkill === 1)
        t = Util.rangeTargets(ts, s.targetType, s.range, f.camp,scene);
    //矩形范围
    else if(s.isRangeSkill === 2 && curTarget){
        t = Util.polygonTargets(ts, s.targetType , s.range, f.camp, f, scene);
    }
    //继承目标
    t = Util.inheritTargets(f,s,scene);
    //mgr.getMapId(targets, scene);//释放目标
    scene.addEvents([EType.spreadSkill,f.mapId,t,s.id]);
    scene.addSkillBuff(f, t, s, 1);
    //增加技能携带的被动buff addTime 3
    scene.addSkillBuff(f, t, s, 3);
    // 攻击前触发相应buff
    for (var i = 0; i < t.length; i++) {
        scene.fireBuff(f, t[i], 2);
    }
    for (var k = 0, len = t.length; k < len; k++) {
        i = t[k];
        arg = fight_formula_1.Fight_formula.getArgArr(f, i, s, true);
        //console.log("spreadSkill:", f.id);
        if (s.damageType === 1) {
            probability = (s.skillType === 1) ? fight_formula_1.Fight_formula.skillCalc("hitFormula", arg) : 1;
            if (scene.checkProbability(probability)) {
                r = scene.calcAction(f, i, s, arg, scene.calcDamage);
                //目标承受伤害记录到列表中
                if (i.damageList[f.sid]) i.damageList[f.sid] += r.damage;
                else i.damageList[f.sid] = r.damage;

                //把人物造成的伤害累加绑在自己身上 参与buff吸血计算
                if (f.damage !== undefined) f.damage += r.damage;
                else f.damage = r.damage;
            } else {
                r = { dodge: true };
            }
            scene.listener && scene.listenEvent.push({
                type: "damage",
                fighter: f,
                curTarget : curTarget,
                target: i,
                r: r,
                skill: s,
                time: s.bloodDelayTime + s.delaySpreadSkillTime
            });
            if(i.passive)
                i.passive = false;
        } else if (s.damageType === 2) {
            r = scene.calcAction(f, i, s, arg, scene.calcHealth);
            scene.listener && scene.listenEvent.push({
                type: "damage",
                fighter: f,
                curTarget : curTarget,
                target: i,
                r: r,
                skill: s,
                time: s.bloodDelayTime + s.delaySpreadSkillTime
            });
        }
    }
    scene.addSkillBuff(f, t, s, 2);
    // 攻击后触发相应buff
    for (var i = 0; i < t.length; i++) {
        scene.fireBuff(f, t[i], 7);
    }
    scene.clearTempBuff(f);
    for (var k = 0, len = t.length; k < len; k++) {
        i = t[k];
        scene.clearTempBuff(i);
    }
    //单次伤害计算清空
    f.damage = 0;
};