import { Fight_formula } from "fight/a/common/fight_formula";
	let table : any= {};

table.damageFormula = "Max(((F.attackCount+0.5*(F.un_defenceCount-T.defenceCount))/defenceReduceFormula*Skill.damagePer+Skill.damage)*Max((1+F.damage_multipleCount-T.un_damage_multipleCount),0.25),1)";

table.pvp_damageFormula = "Max(((F.attackCount+0.5*(F.un_defenceCount-T.defenceCount))/defenceReduceFormula*Skill.damagePer+Skill.damage)*Max((1+F.damage_multipleCount-T.un_damage_multipleCount+F.pvp_damage_multipleCount-T.pvp_un_damage_multipleCount),0.5),1)";

table.criticalDamageFormula = "Max(damageFormula*F.criticalDamageCount,1)";

table.pvp_criticalDamageFormula = "Max(pvp_damageFormula*F.criticalDamageCount,1)";

table.defenceReduceFormula = "pow(0.99,Min(Max(((F.un_defenceCount-T.defenceCount)/200),-120),18))";

table.hitFormula = "pow(1.01,Min(Max(((F.un_dodgeCount-T.dodgeCount)/100),-92),18))";

table.criticalFormula = "1-1/(pow(0.99,Min(Max(((T.un_criticalCount-F.criticalCount)/150),-134),14)))+Skill.crit+0.1";

table.healthFormula = "F.attackCount*Skill.damagePer*(1+F.healthCount)+Skill.damage";

table.criticalHealthFormula = "healthFormula*F.criticalDamageCount";

table.healthCritFormula = "1-1/(pow(0.99,Min(Max((-F.criticalCount/300),-67),0)))+Skill.crit";

table.stealHPFormula = "damageFormula*F.stealHPCount";

table.pvp_stealHPFormula = "pvp_damageFormula*F.stealHPCount";

table.criticalStealHPFormula = "criticalDamageFormula*F.stealHPCount";

table.pvp_criticalStealHPFormula = "pvp_criticalDamageFormula*F.stealHPCount";

table.per_max_hpCount = "A.per_max_hp+B.per_max_hp+C.per_max_hp+D.per_max_hp+E.per_max_hp+F.per_max_hp+G.per_max_hp+H.per_max_hp+I.per_max_hp+J.per_max_hp+K.per_max_hp+L.per_max_hp";

table.per_attackCount = "A.per_attack+B.per_attack+C.per_attack+D.per_attack+E.per_attack+F.per_attack+G.per_attack+H.per_attack+I.per_attack+J.per_attack+K.per_attack+L.per_attack";

table.per_defenceCount = "A.per_defence+B.per_defence+C.per_defence+D.per_defence+E.per_defence+F.per_defence+G.per_defence+H.per_defence+I.per_defence+J.per_defence+K.per_defence+L.per_defence";

table.per_un_defenceCount = "A.per_un_defence+B.per_un_defence+C.per_un_defence+D.per_un_defence+E.per_un_defence+F.per_un_defence+G.per_un_defence+H.per_un_defence+I.per_un_defence+J.per_un_defence+K.per_un_defence+L.per_un_defence";

table.max_hpCount = "(A.max_hp+B.max_hp+C.max_hp+D.max_hp+F.max_hp+G.max_hp+H.max_hp+I.max_hp+J.max_hp+K.max_hp+L.max_hp)*(1+per_max_hpCount)";

table.attackCount = "(A.attack+B.attack+C.attack+D.attack+F.attack+G.attack+H.attack+I.attack+J.attack+K.attack+L.attack)*(1+per_attackCount)";

table.defenceCount = "(A.defence+B.defence+C.defence+D.defence+F.defence+G.defence+H.defence+I.defence+J.defence+K.defence+L.defence)*(1+per_defenceCount)";

table.un_defenceCount = "(A.un_defence+B.un_defence+C.un_defence+D.un_defence+F.un_defence+G.un_defence+H.un_defence+I.un_defence+J.un_defence+K.un_defence+L.un_defence)*(1+per_un_defenceCount)";

table.criticalCount = "A.critical+B.critical+C.critical+D.critical+F.critical+G.critical+H.critical+I.critical+J.critical+K.critical+L.critical";

table.un_criticalCount = "A.un_critical+B.un_critical+C.un_critical+D.un_critical+F.un_critical+G.un_critical+H.un_critical+I.un_critical+J.un_critical+K.un_critical+L.un_critical";

table.dodgeCount = "A.dodge+B.dodge+C.dodge+D.dodge+F.dodge+G.dodge+H.dodge+I.dodge+J.dodge+K.dodge+L.dodge";

table.un_dodgeCount = "A.un_dodge+B.un_dodge+C.un_dodge+D.un_dodge+F.un_dodge+G.un_dodge+H.un_dodge+I.un_dodge+J.un_dodge+K.un_dodge+L.un_dodge";

table.healthCount = "Max(A.health+B.health+C.health+D.health+F.health+G.health+H.health+I.health+J.health+K.health+L.health,-1)";

table.stealHPCount = "A.stealHP+B.stealHP+C.stealHP+D.stealHP+F.stealHP+G.stealHP+H.stealHP+I.stealHP+J.stealHP+K.stealHP+L.stealHP";

table.damage_multipleCount = "A.damage_multiple+B.damage_multiple+C.damage_multiple+D.damage_multiple+F.damage_multiple+G.damage_multiple+H.damage_multiple+I.damage_multiple+J.damage_multiple+K.damage_multiple+L.damage_multiple";

table.un_damage_multipleCount = "A.un_damage_multiple+B.un_damage_multiple+C.un_damage_multiple+D.un_damage_multiple+F.un_damage_multiple+G.un_damage_multiple+H.un_damage_multiple+I.un_damage_multiple+J.un_damage_multiple+K.un_damage_multiple+L.un_damage_multiple";

table.criticalDamageCount = "2+A.criticalDamage+B.criticalDamage+C.criticalDamage+D.criticalDamage+F.criticalDamage+G.criticalDamage+H.criticalDamage+I.criticalDamage+J.criticalDamage+K.criticalDamage+L.criticalDamage";

table.pvp_damage_multipleCount = "A.pvp_damage_multiple+B.pvp_damage_multiple+C.pvp_damage_multiple+D.pvp_damage_multiple+F.pvp_damage_multiple+G.pvp_damage_multiple+H.pvp_damage_multiple+I.pvp_damage_multiple+J.pvp_damage_multiple+K.pvp_damage_multiple+L.pvp_damage_multiple";

table.pvp_un_damage_multipleCount = "A.pvp_un_damage_multiple+B.pvp_un_damage_multiple+C.pvp_un_damage_multiple+D.pvp_un_damage_multiple+F.pvp_un_damage_multiple+G.pvp_un_damage_multiple+H.pvp_un_damage_multiple+I.pvp_un_damage_multiple+J.pvp_un_damage_multiple+K.pvp_un_damage_multiple+L.pvp_un_damage_multiple";

table.skill_level_attrCount = "E.skill_level_attr";

table.buff_attrCount = "B.buff_attr+D.buff_attr+H.buff_attr+J.buff_attr+L.buff_attr";

export const formula = table;
	Fight_formula.init(table);