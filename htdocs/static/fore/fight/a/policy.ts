/**
 * 战斗决策
 */
 // ================================ 导入
import { Result, Skill, Fighter } from "./class"
import { Scene } from "./fight";
import { Util } from "./util";

 // ================================ 导出
export class Policy{
    /**
     * @description 遍历某个场景内的所有战斗单位，进行决策
     */
    static run(s: Scene):void{
        s.fighters.forEach((v,k)=>{
            Policy.single(v,s);
            Policy.ai(v,s);
        })
    }
    /**
     * @description 执行单个fighter决策
     */
    static single(f: Fighter,s: Scene):void{
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
            f.curSkill = undefined;
            if (Policy.move(f)) {
                f.moveto = undefined;
            }
            return;
        }
        //释放技能

    }
    /**
     * @description 执行fighter移动
     */
    static move(f: Fighter):boolean{
        let near = 0,x = f.moveto.x,y = f.moveto.y;
        var dist = Math.sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y)), speed = f.speed;
        if (dist < near) {
            f.moving = false;
            return true;
        }
        dist = speed / dist;
        if (dist >= 1) {
            f.x = x;
            f.y = y;
            f.moving = false;
            return true;
        }
        f.x += (x - f.x) * dist;
        f.y += (y - f.y) * dist;
        f.moving = true;
        return false;
    }
    /**
     * @description 检查fighter是否需要ai，否则就等待手动触发
     *              主要技能释放，和移动路径衔接
     */
    static ai(f: Fighter, s: Scene):boolean{
        if(!f.ai)
            return;
        return false;
    }
}

 // ================================ 本地

 