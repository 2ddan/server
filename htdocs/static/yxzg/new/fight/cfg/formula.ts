/**
 * 战斗公式表
 */
// =================================== 导入
import { Formula } from "app/mod/formula";

Formula.set('damage_normal',function(db,f, t, card, scene, buff,af){return Math.round(Math.min(Math.max((card.damage+f.strength+card.attach_damage)*(1+f.add_damage+t.vulnerability/10)*(1-f.un_attack)*(1-t.un_damage/10)*f.times-f.cold,f.min_damage),t.max_damage || 999999));});Formula.set('damage_true',function(db,f, t, card, scene, buff,af){return Math.round(Math.min(Math.max((card.damage+f.brain+card.attach_damage)*(1+f.add_damage+t.vulnerability/10)*(1-f.un_attack)*(1-t.un_true_damage/10)*(1-t.un_damage/10)*f.times-f.cold,f.min_damage),t.max_damage || 999999));});Formula.set('block',function(db,f, t, card, scene, buff,af){return Math.round((card.block + f.agility+card.attach_block)*(1+f.add_block)*(1-f.un_block));});