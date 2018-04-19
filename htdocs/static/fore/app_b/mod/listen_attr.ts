/**
 * 此模块用于监听和战斗力相关模块属性的变化
 */
import { listen, get } from "app/mod/db"
import { gestAttr, instanceAttr, skillAttr, treasure, equip, soul, countFightPower, roleLevel, pet, cloth, weapon_soul } from "./fight_power"
import { formula } from "fight/b/common/formula";

 /**
  * 监听阵法
  */
listen("gest.gest_attr", gestAttr);

/**
 * 监听九幽幻境星图
 */
listen("instance_fb.tactical_record", instanceAttr);

/**
 * 监听技能
 */
listen("skill", skillAttr);

/**
 * 监听神兵
 */
//神兵监听--八卦孔位
listen("magic.hexagram_level", () => {
    treasure.hexagramAttr();
    treasure.gossip();
    treasure.treasureAll();
});
//神兵监听--八卦等级
listen("magic.break_info.0", () => {
    treasure.bgBreakAttr();
    treasure.gossip();
    treasure.treasureAll();
});
//神兵监听--神兵共鸣等级
listen("magic.treasure", () => {
    treasure.treasureLevel();
    treasure.treasureAll();
});


/**
 * 监听装备模块
 */
const equip_set = function (i) {
    equip.equipBaseAdd(i);
    equip.equipStrong(i);
    equip.singleEquip(i);
    equip.equipAttr()
}
//装备监听--装备  [基础 附加、强化、单总、总]
listen(`friend_battle.equip_set.0`, () => {
    equip_set(0);
});
listen(`friend_battle.equip_set.1`, () => {
    equip_set(1);
});
listen(`friend_battle.equip_set.2`, () => {
    equip_set(2);
});
listen(`friend_battle.equip_set.3`, () => {
    equip_set(3);
});
listen(`friend_battle.equip_set.4`, () => {
    equip_set(4);
});
listen(`friend_battle.equip_set.5`, () => {
    equip_set(5);
});
listen(`friend_battle.equip_set.6`, () => {
    equip_set(6);
});
listen(`friend_battle.equip_set.7`, () => {
    equip_set(7);
});
listen(`friend_battle.equip_set.8`, () => {
    equip_set(8);
});
listen(`friend_battle.equip_set.9`, () => {
    equip_set(9);
});
//装备监听--强化  [强化、单总、总]  (一键强化)
listen(`friend_battle.equip_level`, () => {
    for (let i = 0; i < 10; i++) {
        equip.equipStrong(i);
        equip.singleEquip(i);
    }
    equip.equipAttr();
});

const equip_diam = function (i) {
    equip.equipDiam(i);
    equip.singleEquip(i);
    equip.equipAttr();
}
//装备监听--宝石  [宝石、单总、总]
listen(`friend_battle.equip_diam.0`, () => {
    equip_diam(0);
});
listen(`friend_battle.equip_diam.1`, () => {
    equip_diam(1);
});
listen(`friend_battle.equip_diam.2`, () => {
    equip_diam(2);
});
listen(`friend_battle.equip_diam.3`, () => {
    equip_diam(3);
});
listen(`friend_battle.equip_diam.4`, () => {
    equip_diam(4);
});
listen(`friend_battle.equip_diam.5`, () => {
    equip_diam(5);
});
listen(`friend_battle.equip_diam.6`, () => {
    equip_diam(6);
});
listen(`friend_battle.equip_diam.7`, () => {
    equip_diam(7);
});
listen(`friend_battle.equip_diam.8`, () => {
    equip_diam(8);
});
listen(`friend_battle.equip_diam.9`, () => {
    equip_diam(9);
});

//装备监听--升星  [升星、单总、总星数加成、总]
const equip_star = function (i) {
    equip.equipStar(i);
    equip.singleEquip(i);
    equip.equipAllStar();
    equip.equipAttr();
}
listen(`friend_battle.equip_star.0`, () => {
    equip_star(0);
});
listen(`friend_battle.equip_star.1`, () => {
    equip_star(1);
});
listen(`friend_battle.equip_star.2`, () => {
    equip_star(2);
});
listen(`friend_battle.equip_star.3`, () => {
    equip_star(3);
});
listen(`friend_battle.equip_star.4`, () => {
    equip_star(4);
});
listen(`friend_battle.equip_star.5`, () => {
    equip_star(5);
});
listen(`friend_battle.equip_star.6`, () => {
    equip_star(6);
});
listen(`friend_battle.equip_star.7`, () => {
    equip_star(7);
});
listen(`friend_battle.equip_star.8`, () => {
    equip_star(8);
});
listen(`friend_battle.equip_star.9`, () => {
    equip_star(9);
});
//装备监听--星宿阵图  [总]
listen("friend_battle.soul_achieve", () => {
    equip.equipSoulAchieve();
    equip.equipAttr();
});

/**
 * 监听九窍
 */
const countSoulAttr = function (index) {
    soul.singleSoulAttr(index);
    soul.soulAllAttr();
}
listen("soul.soul_info.0", () => {
    countSoulAttr(0);
});
listen("soul.soul_info.1", () => {
    countSoulAttr(1);
});
listen("soul.soul_info.2", () => {
    countSoulAttr(2);
});
listen("soul.soul_info.3", () => {
    countSoulAttr(3);
});
listen("soul.soul_info.4", () => {
    countSoulAttr(4);
});
listen("soul.soul_info.5", () => {
    countSoulAttr(5);
});
listen("soul.soul_info.6", () => {
    countSoulAttr(6);
});
listen("soul.soul_info.7", () => {
    countSoulAttr(7);
});
listen("soul.soul_info.8", () => {
    countSoulAttr(8);
});


/**
 * 监听人物等级
 */
let oldLevel = get("player.level");
listen("player.level", () => {
    let level = get("player.level");
    if (level > oldLevel) {
        oldLevel = level;
        roleLevel.selfAttr(level);
    }
})

/**
 * 监听灵宠
 */
listen("pet.own_skin,pet.pet_star_info", () => {
    pet.petAttr();
});

/**
 * 监听时装
 */
listen("cloth.own_clothes", () => {
    cloth.clothAttr();
});

/**
 * 监听赋灵
 */
const countWeaponAttr = function (index) {
    weapon_soul.singleEleAttr(index);
    weapon_soul.allAttr();
}
listen("weapon_soul.level_record.0", () => {
    countWeaponAttr(0);
});
listen("weapon_soul.level_record.1", () => {
    countWeaponAttr(1);
});
listen("weapon_soul.level_record.2", () => {
    countWeaponAttr(2);
});
listen("weapon_soul.level_record.3", () => {
    countWeaponAttr(3);
});
listen("weapon_soul.class", () => {
    weapon_soul.gradeAttr();
    weapon_soul.allAttr();
});

/**
 * 监听模块属性, 计算战斗力
 */
listen("attr.A", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.B", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.C", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.D", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.E", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.F", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.G", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.H", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.I", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});
listen("attr.J", () => {
    let attr = get("attr");
    countFightPower.singleAttrTotal(attr, formula);
});