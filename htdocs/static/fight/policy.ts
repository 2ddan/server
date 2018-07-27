/**
 * 战斗决策
 */
 // ================================ 导入
//fight
import { Skill, Fighter } from "./class"
import { FScene } from "./scene";
import { Util } from "./util";
import { EType } from "./analyze";
import { Fight_formula } from "./common/fight_formula";


 // ================================ 导出
export class Policy{
    /**
     * @description 遍历某个场景内的所有战斗单位，进行决策
     */
    static run(s: FScene):void{
        s.fighters.forEach((v,k)=>{

        })
    }
    /**
     * @description 设置fighter是否被移除
     *              战斗检查结果， 返回0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
     * @param scene 
     */
    static check(scene: FScene){
        var limitTime = scene.limitTime || Infinity;
        if (scene.fightTime >= limitTime) return 3;
        var left = 0, right = 0;
        scene.fighters.forEach(f => {
            if (f.camp === 1 && f.hp > 0)
                left++;
            if ((f.camp === 2 && f.hp > 0) || (f.camp === 0 && f.hp > 0))
                right++;
        });
        if (left > 0 && right > 0)
            return 0;
        return left > 0 ? 1 : 2;
    };
     /**
     * 获取下次出手的英雄
     * 
     */
    static nextFighter(scene: FScene): number{
        let r:Fighter,// 该回合剩余未出手fighter中该出手者
            func = (s: Fighter,t: Fighter): Fighter => {
                if(!s){
                    return t; 
                }
                let d:number = t.speed - s.speed;
                if(d>0 || (d === 0 && t.camp < s.camp)){
                    return t;
                }
            };
            scene.fighters.forEach((e: Fighter, k: number)=> {
            if(e.round < scene.round){
                r = func(r,e);
            }
        });
        return r?r.id:0;
    }
}

 // ================================ 本地

