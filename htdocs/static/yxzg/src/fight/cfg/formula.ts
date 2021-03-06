/**
 * 战斗公式表
 */
// =================================== 导入
import { Formula } from "app/mod/formula";

Formula.set('damage_normal',function(db,f, t, card, scene, buff,af){return Math.max((card.damage+f.strength)*(1+t.add_damage+t.vulnerability)*(1-f.un_attack),f.min_damage);});Formula.set('damage_true',function(db,f, t, card, scene, buff,af){return Math.max((card.damage+f.brain)*(1+f.add_damage+t.vulnerability)*(1-f.un_attack),0);});Formula.set('block',function(db,f, t, card, scene, buff,af){return (card.block + f.agility)*(1+f.add_block)*(1-f.un_block);});