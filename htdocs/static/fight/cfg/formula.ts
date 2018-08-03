/**
 * 战斗公式
 */
// =================================== 导入
import { Fighter, Card, Buff } from "../class";
// ===================================== 导出
export class Formula{
    /**
     * @description 卡牌普通伤害计算
     * @param Max 求最大值
     * @param Min 求最小值
     * @param Pow 求某个数的幂 Pow(4,3) = 64; Pow(4,2) = 16
     * @param F 使用者
     * @param T 使用目标
     * @param Card 使用的卡牌
     */
    static damage_normal(Max: Function, Min: Function, Pow: Function, F: Fighter, T: Fighter, Card: Card):number{
        return Max((Card.damage+F.strength)*(1+T.add_damage+T.vulnerability)*(1-F.un_attack),F.min_damage);
    }
    /**
     * @description 卡牌格挡计算
     */
    static block(Max: Function, Min: Function, Pow: Function, F: Fighter, T: Fighter, Card: Card){
        return (Card.block + F.agility)*(1+F.add_block)*(1-F.un_block);
    }
    /**
     * @description 卡牌真实伤害计算
     */
    static damage_true(Max: Function, Min: Function, Pow: Function, F: Fighter, T: Fighter, Card: Card, Buff: Buff){
        return Max((Card.damage+F.brain)*(1+F.add_damage+T.vulnerability)*(1-F.un_attack),0);
    }
}

// ================================= 本地
