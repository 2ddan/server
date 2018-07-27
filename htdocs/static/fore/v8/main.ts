// ================================ 导入
import * as fightJs from "fight/a/fight";
import { Request } from "fight/a/request";
import { Util } from "fight/a/util";
import { Policy } from "fight/a/policy"
import * as fight_scene from "./fight_scene";
import * as v8_util from "./util";
import * as skill from "fight/b/common/skill";
import * as fight_formula_1 from "fight/a/common/fight_formula";
import * as init_fighter from "fight/a/common/init_fighter";
import * as navmesh from "pi/ecs/navmesh";
import * as base58 from "v8/base58";
import { map_cfg as map } from "app/scene/plan_cfg/map";

import * as wild from "./wild";
import * as rebel from "./rebel";
import * as world_boss from "./world_boss";
import * as wilderness_boss from "./wilderness_boss";
import * as gang_expand from "./gang_expand";
import * as endless_boss from "./endless_boss";
import { EType, realType } from "../fight/a/analyze";

// ================================ 导出  

export const scenes = {};
export const sceneNaves = {};
//创建战斗
export const createFight = function (param) {
    var fightScene = insertNewFighter(param),
        fighterObj = toInsertFighter(fightScene);
    return JSON.stringify(fighterObj);
    // return JSON.stringify(param);
};
//执行战斗
export const loop = function (roomID) {
    var fightScene = scenes[roomID],
        pushEvent = [];
    if (!fightScene) return;
    var erlangDeal = functionFileObj[fightScene.type].loop(fightScene);
    pushEvent = filterEvent(fightScene.pushEvent);
    pushEvent = pushEvent.concat(fightScene.pushEvent1);
    fightScene.pushEvent1 = [];
    var result = {
        "event": pushEvent,
        "now": fightScene.now
    };
    // var eventStr = regroupEvent(fightScene);

    return JSON.stringify(result) + "#" + erlangDeal;
};

//退出战斗
export const exitFight = function (roomID, ID, IsSave) {
    var fighterScene = scenes[roomID], count = 0;
    if (!fighterScene) return;
    for (var e of fighterScene.fighters) {
        var f = e[1];
        if (f.sid == ID && !f.isMirror) {
            f.remove = true;
        } else {
            if ((f.type == "fighter" && !f.isMirror) && !f.remove) {
                count++;
            }
        }
    }
    if (functionFileObj[fighterScene.type].exitFight) {
        functionFileObj[fighterScene.type].exitFight(fighterScene);
    }

    if (functionFileObj[fighterScene.type].updateAttrRate) {
        functionFileObj[fighterScene.type].updateAttrRate(fighterScene, ID);
    }
    //销毁场景
    if (count == 0 && !IsSave) {
        destroyScene(roomID);
    }
};
//销毁场景
export const destroyScene = function (roomID) {
    var fightScene = scenes[roomID];
    if (!fightScene) return;
    fightJs.FMgr.destroy(fightScene);
    delete scenes[roomID];
    fightScene = null;
}
//复活战斗者
export const resurgence = function (roomID, ID, isMirror, site) {
    var fighterScene = scenes[roomID];
    site = site ? JSON.parse(site) : [];
    if (!fighterScene) return;
    for (var e of fighterScene.fighters) {
        var f = e[1],
            isSelect;
        if (f.isMirror && isMirror) {
            isSelect = true;
        }
        if (!f.isMirror && !isMirror) {
            isSelect = true;
        }
        if (f.sid == ID && isSelect) {
            f.curTarget = undefined;
            f.curSkill = undefined;
            f.moving = false;
            f.handMove = undefined;
            f.hp = f.max_hpCount;
            f.isDeath = false;
            f.x = site[0] || f.x;
            f.y = site[1] || f.y;
            fighterScene.pushEvent1.push([EType["revive"], f.mapId]);
            break;
        }
    }
};

//处理事件
export const disposeOrder = function (param) {
    var fightScene = scenes[param.room_id],
        role_id = param.id,
        f = {};
    if (!fightScene) return;
    for (var e of fightScene.fighters) {
        if (e[1].sid == role_id && !e[1].isMirror) {
            f = e[1];
            break;
        }
    }
    if (param.result) {
        var result = JSON.parse(param.result);
        return clickScene(result, f, fightScene);
    }
}
//更新属性
export const refreshAttr = function (roomID, ID, info, type) {
    var fighterScene = scenes[roomID],
        attr = info.attr,
        skillList = info.skill;
    if (!fighterScene) return;
    for (var e of fighterScene.fighters) {
        var f = e[1];
        if (f.sid == ID && !f.isMirror) {
            if (attr) {
                pushExtraEvent(fighterScene, "refreshAttr", "max_hpCount", attr.max_hp, f);
                f.A = attr;
                fight_formula_1.Fight_formula.count(f);
            }
            if (!compareList(skillList, f.skillList)) {
                var skillInfo = initSkill(skillList, f, fighterScene);
                replaceSkill(skillInfo, f, fighterScene, skillList);
                f.skillList = skillList;
            }
            if (!f.baseBuffList) {
                f.baseBuffList = []
                for (var i = 0; i < f.buffList.length; i++) {
                    f.baseBuffList.push([f.buffList[i].id, 1]);
                }
            }
            if (!compareList(info.buff, f.baseBuffList)) {
                var buff = info.buff.slice(f.baseBuffList.length, info.buff.length);
                for (var i = 0; i < buff.length; i++) {
                    addBuff(f, buff[i][0], fighterScene);
                }
                f.baseBuffList = info.buff;
            }
            if (info.info) {
                pushExtraEvent(fighterScene, "refreshEnsoulClass", "ensoulClass", info.info.ensoul_class, f);
                pushExtraEvent(fighterScene, "refreshEquipStar", "equipStar", info.info.equip_star, f);
                pushExtraEvent(fighterScene, "refreshWeapon", "weaponId", info.info.equip[0], f);
            }
            if (type == "skin") {
                refreshSkin(f, info, fighterScene);
            }
            return;
        }
    }
};

// 比较两个列表是否相等
function compareList(list, list1) {
    if (!list) {
        return true;
    }
    if (list.length != list1.length) {
        return false;
    }
    for (var i = 0; i < list.length; i++) {
        if (v8_util.isArray(list[i]) && v8_util.isArray(list1[i])) {
            if (!compareList(list[i], list1[i])) {
                return false
            }
            continue;
        }
        if (list[i] != list1[i]) {
            return false;
        }
    }
    return true;
}

// 增加buff
export const addBuff = function (f, buffId, fightScene) {
    // var buff = createBuff(buffId);
    var buff = init_fighter.getBuff(buffId);
    Policy.addBuff(f, f, undefined, buff, fightScene);
}

//更新历史等级
export const refreshLevel = function (roomID, level) {
    var fightScene = scenes[roomID];
    if (!fightScene) return;
    fightScene.monsterLevel = level;
};

//fighter状态切换
export const changeFightStats = function (roleID, roomID, status) {
    var fightScene = scenes[roomID];
    if (!fightScene) return;
    for (var e of fightScene.fighters) {
        var f = e[1];
        if (f.sid == roleID && (f.type == "fighter" && !f.isMirror)) {
            f.status = status;
            f.curTarget = undefined;
            f.curSkill = undefined;
        }
    }
};

//清除怪物
export const clearMonster = function (roomId) {
    var fightScene = scenes[roomId];
    if (!fightScene) return;
    clearMonsters(fightScene);
}

//得到boss的受到的伤害
export const getMonsterDamage = function (roomID) {
    var fightScene = scenes[roomID];
    if (!fightScene) return;
    for (var e of fightScene.fighters) {
        var f = e[1];
        if (f.type == "monster") {
            return (f.max_hpCount - f.hp);
        }
    }
};

export const loadSceneNav = function (name, str) {
    var arrayBuffer = _base64ToArrayBuffer(str);
    var nav = new navmesh.NavMesh();
    nav.load(arrayBuffer);
    sceneNaves[name] = nav;
}

// ==================================== 本地
var functionFileObj = { "wild": wild, "rebel": rebel, "world_boss": world_boss, "wilderness_boss": wilderness_boss, "gang_expand": gang_expand, "endless_boss": endless_boss };

//保留参数
var attr = {
    //初始化战斗者数据推送
    insertFighter: ["sid", "camp", "career_id", "x", "y", "z", "hp", "max_hpCount", "god", "mapId", "level", "useSkillTime", "curTarget", "curHeadTarget", "damageList", "state", "area", "taskInfo", "handMove", "type", "module", "name", "attackCount", "show_type", "isMirror", "path", "moveto", "speed", "pet", "clothes", "ensoulClass", "equipStar", "weaponId"],
    //战斗者
    fighter: ["sid", "x", "y", "z", "hp", "mapId", "curTarget", "taskInfo", "type", "show_type", "isMirror", "path", "moveto"],
    target: ["mapId", "x", "y", "z", "hp"],
    //技能
    skill: ["cdNextTime", "index", "cdTime", "id", "delaySpreadSkillTime"]
};

//需推送的事件列表
var pushEvent = [EType.insert, EType.moveto, EType.effect, EType.damage, EType.spreadSkill, EType.remove, EType.useSkill, EType.task];

//插入新战斗者(玩家)
function insertNewFighter(param) {
    var fightScene = scenes[param.room_id],
        FileMod = functionFileObj[param.type];
    if (fightScene) {
        const f = FileMod.createFight(param, fightScene);
        Request.insert(f, fightScene);
        if (FileMod.updateAttrRate) {
            FileMod.updateAttrRate(fightScene);
        }
        return fightScene;
    } else {
        return createScene(param);
    }
};

//将fighter封装成推送消息的insert格式
function toInsertFighter(fightScene) {
    var fighters = fightScene.fighters,
        arr = [];
    for (var e of fighters) {
        if (e[1].remove) {
            continue;
        }
        arr.push([EType.insert, getNewObj(attr.insertFighter, e[1], true)])
    }
    // console.log(sizeof(JSON.stringify(arr)));
    var obj = {
        event: arr,
        now: fightScene.now
    };
    return obj;
};

//创建战斗场景
function createScene(param) {
    var fightScene = functionFileObj[param.type].createScene(param);
    if (!fightScene.navMesh) fightScene.setNavMesh(sceneNaves[map[param.type]]);
    // scenes.push(fightScene);
    scenes[param.room_id] = fightScene;
    //战斗事件监听
    fightScene.listener = function (r) {
        fightScene.pushEvent = r.events;
        return true;
    };
    return fightScene;
};



//过滤事件
function filterEvent(event) {
    var events = [];
    for (var i = 0; i < event.length; i++) {
        var e = event[i];
        if (pushEvent.indexOf(e[0]) != -1) {
            events.push(e);
        }
    }
    return events;
}

//重组事件
function regroupEvent(fightScene) {
    var str = "";
    for (var e of fightScene.fighters) {
        var f = e[1];
        if (!f.isMirror && f.type == "fighter") {
            var event = getRalteEvent(fightScene.pushEvent, f);
            var result = {
                "event": event,
                "now": fightScene.now
            };
            str += f.sid + "$_$" + JSON.stringify(result) + "%%";
        }
    }
    return str;
};

//得到在自己视野内的事件
function getRalteEvent(pushEvent, ownF) {
    var event = [];
    for (var i = 0; i < pushEvent.length; i++) {
        var e = pushEvent[i],
            f = e.fighter;
        if (isScope(ownF, f, 15) || e.type == "move" || e.type == "insert" || e.type == "remove") {
            event.push(e);
        }
    }
    // console.log(ownF.sid ,event.length);
    // console.log(pushEvent.length);
    return event;
}

//是否在范围内
function isScope(ownF, f, r) {
    if (!f) return true;
    if (ownF == f) return true;
    var x = f.x, y = f.y, a = ownF.x, b = ownF.y;
    if ((x - a) * (x - a) + (y - b) * (y - b) <= r * r) {
        return true;
    }
    return false;
}


//处理点击事件
function clickScene(result, fighter_own, fightScene) {
    let t, r;
    if (result.type === "terrain") {
        fighter_own.handMove = { x: result.data[0], y: result.data[2], click: result.click };
        fighter_own.curTarget = undefined;
    } else if (result.type == "ping") {
        return `{"now":${fightScene.now}}`;
    }
    else {
        t = realType(result.type);
        r = Request[t] && Request[t](result, fightScene);
        if (r) console.log(r);
        return r;
    }
};

//得到简化后的对象
function getNewObj(attr, obj, addSkill?) {
    var newObj: any = {};
    if (addSkill) {
        var skill = []
        for (var i = 0; i < obj.skill.length; i++) {
            var s = obj.skill[i];
            skill.push({ id: s.id, level: s.level });
        }
        newObj.skill = skill;
    }
    for (var i = 0; i < attr.length; i++) {
        newObj[attr[i]] = obj[attr[i]];
    }
    return newObj
}

//得到简化后的事件
function getNewEvent(e) {
    var new_e: any = {},
        isCreateSkill = (e.type == "insert"),
        attr1;
    if (e.type == "insert") attr1 = attr.insertFighter;
    else attr1 = attr.fighter;
    if (e.type == "move") {
        var path = e.fighter.path ? [e.fighter.path[0]] : null,
            f = [e.fighter.mapId, e.fighter.x, e.fighter.y, e.fighter.path];
        new_e.type = e.type;
        new_e.moving = e.moving;
        new_e.fighter = f;
        return [e.type, e.moving, f];
    } else {
        for (var i in e) {
            if (i == "fighter" || i == "curTarget") {
                new_e[i] = getNewObj(attr1, e.fighter, isCreateSkill);
            } else if (i == "skill") {
                new_e[i] = getNewObj(attr.skill, e.skill);
            } else if (i == "target") {
                var newObj: any = {};
                if (v8_util.isArray(e.target)) {
                    newObj = [];
                    for (var j = 0; j < e.target.length; j++) {
                        newObj.push(getNewObj(attr.target, e.target[j]));
                    }
                } else {
                    newObj = getNewObj(attr.target, e.target);
                }
                new_e[i] = newObj;
            } else {
                new_e[i] = e[i];
            }
        }
    }
    return new_e;
};

//更新皮肤
function refreshSkin(f, info, scene) {
    if (info.skin_id != f.pet && info.type == "pet") {
        f.pet = info.skin_id;
        scene.pushEvent1.push([EType.refreshPet, info.skin_id, f.mapId]);
        console.log("refreshPet");
    }
    if (info.skin_id != f.clothes && info.type == "clothes") {
        f.clothes = info.skin_id;
        scene.pushEvent1.push([EType.refreshClothes, info.skin_id, f.mapId]);
        console.log("refreshClothes");
    }
}



//推送额外事件
function pushExtraEvent(fighterScene, pushType, attrType, value, f) {
    var oldValue = f[attrType],
        attr = {};
    if (value != oldValue) {
        f[attrType] = value;
        attr[attrType] = value;
        fighterScene.pushEvent1.push([EType[pushType], f.mapId, attr]);
    }
}
//初始化技能
function initSkill(skillList, f, scene) {
    var skillInfo = init_fighter.initSkill(skillList, f);
    for (var i = 0; i < skillInfo.length; i++) {
        var s = skillInfo[i];
        s.damage = Util.getEffectValue(s.damage, f, s);
        s.damagePer = Util.getEffectValue(s.damagePer, f, s);
        s.cdNextTime = s.initialCDTime + scene.now;
    }
    return skillInfo;
}
//替换技能
function replaceSkill(skillInfo, f, scene, skillList) {
    var skillLength = f.skill.length;
    for (var i = 0; i < f.skill.length; i++) {
        if (!isExistSkill(skillInfo, f.skill[i])) {
            f.skill.remove(f.skill[i]);
            i--;
        }
    }
    scene.pushEvent1.push([EType.refreshSkill, skillList, f.mapId]);
    f.skill = f.skill.concat(skillInfo);
};
//是否存在技能
function isExistSkill(skillInfo, skill) {
    for (var i = 0; i < skillInfo.length; i++) {
        var s = skillInfo[i];
        if (s.id == skill.id) {
            if (s.level == skill.level) {
                skillInfo.remove(skillInfo[i]);
                return true;
            }
            s.cdNextTime = skill.cdNextTime;
        }
    }
    return false;
};



//清除怪物
function clearMonsters(fightScene) {
    for (var e of fightScene.fighters) {
        if (e[1].type == "monster") {
            e[1].remove = true;
        }
    }
};


function _base64ToArrayBuffer(base64) {
    var bigInteger = base58.decode(base64),
        binary_string = bigIntegerToByte(bigInteger);

    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string[i];
    }
    return bytes.buffer;
}

function bigIntegerToByte(bigInteger) {
    var byteList = [],
        integer = 256;
    while (bigInteger._s !== 0) {
        var byte = bigInteger.remainder(integer)._d[0] ? bigInteger.remainder(integer)._d[0] : 0;
        byteList.push(byte);
        bigInteger = bigInteger.quotient(integer);
    }
    return byteList.reverse();
}
