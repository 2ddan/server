
/**
 * Card公式表
 */
// =================================== 导入
import { Formula } from "app/mod/formula";Formula.set("Math.round(Math.min(Math.max((card.damage+f.strength+3*Math.pow(0,t.block))*(1+f.add_damage+t.vulnerability/10)*(1-f.un_attack)*(1-t.un_damage/10)-f.cold,f.min_damage),t.max_damage || 999999))",function(db, f, t, card, scene, buff,af){return Math.round(Math.min(Math.max((card.damage+f.strength+3*Math.pow(0,t.block))*(1+f.add_damage+t.vulnerability/10)*(1-f.un_attack)*(1-t.un_damage/10)-f.cold,f.min_damage),t.max_damage || 999999));});Formula.set("Math.round(Math.min(Math.max((card.damage+f.strength+4*Math.pow(0,t.block))*(1+f.add_damage+t.vulnerability/10)*(1-f.un_attack)*(1-t.un_damage/10)-f.cold,f.min_damage),t.max_damage || 999999))",function(db, f, t, card, scene, buff,af){return Math.round(Math.min(Math.max((card.damage+f.strength+4*Math.pow(0,t.block))*(1+f.add_damage+t.vulnerability/10)*(1-f.un_attack)*(1-t.un_damage/10)-f.cold,f.min_damage),t.max_damage || 999999));});Formula.set("Math.round((card.block + f.agility+3*Math.abs(Math.round(f.hp/f.max_hp)-1))*(1+f.add_block)*(1-f.un_block))",function(db, f, t, card, scene, buff,af){return Math.round((card.block + f.agility+3*Math.abs(Math.round(f.hp/f.max_hp)-1))*(1+f.add_block)*(1-f.un_block));});