_$define("v8/main", function (require, exports, module) {
    var fightJs = require("fight/a/common/fight"),
        fight_scene = require("./fight_scene"),
        v8_util = require("./util"),
        skill = require("fight/b/common/skill"),
        fight_formula_1 = require("fight/a/common/fight_formula"),
        init_fighter = require("fight/a/common/init_fighter"),
        navmesh = require("pi/ecs/navmesh"),
        base58 = require("v8/base58"),
        map = require("app/scene/plan_cfg/map").map_cfg,
        functionFileObj = { "wild": require("./wild"), "rebel": require("./rebel"), "world_boss": require("./world_boss"), "wilderness_boss": require("./wilderness_boss"), "gang_expand": require("./gang_expand") };

    var scenes = {};
    var sceneNaves = {};

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
    var pushEvent = ["insert", "moveto", "effect", "damage", "spreadSkill", "remove", "useSkill"];

    exports.scenes = scenes;
    exports.sceneNaves = sceneNaves;
    //创建战斗
    exports.createFight = function (param) {
        var fightScene = insertNewFighter(param),
            fighterObj = toInsertFighter(fightScene);
        return JSON.stringify(fighterObj);
        // return JSON.stringify(param);
    };

    //插入新战斗者(玩家)
    function insertNewFighter(param) {
        var fightScene = scenes[param.room_id];
        if (fightScene) {
            f = functionFileObj[fightScene.type].createFight(param, fightScene);
            fightScene.insert(f);
            return fightScene;
        } else {
            return createScene(param);
        }
    };

    //将fighter封装成推送消息的insert格式
    function toInsertFighter(fightScene) {
        var fighters = fightScene.fighters,
            arr = [];
        for (var i = 0; i < fighters.length; i++) {
            arr.push({ type: "insert", fighter: getNewObj(attr.insertFighter, fighters[i], true) })
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
        if (!fightScene.navMesh) fightScene.setNavMesh(main.sceneNaves[map[param.type]]);
        // scenes.push(fightScene);
        scenes[param.room_id] = fightScene;
        //战斗事件监听
        fightScene.listener = function (r) {
            fightScene.pushEvent = r.events;
            return true;
        };
        return fightScene;
    };

    //执行战斗
    exports.loop = function (roomID) {
        var fightScene = scenes[roomID],
            pushEvent = [];
        if (!fightScene) return;
        var erlangDeal = functionFileObj[fightScene.type].loop(fightScene);
        pushEvent = filterEvent(fightScene.pushEvent);
        pushEvent = fightScene.pushEvent1.concat(pushEvent);
        fightScene.pushEvent1 = [];
        var result = {
            "event": pushEvent,
            "now": fightScene.now
        };
        // var eventStr = regroupEvent(fightScene);

        return JSON.stringify(result) + "#" + erlangDeal;
    };

    //过滤事件
    function filterEvent(event) {
        var events = [];
        for (var i = 0; i < event.length; i++) {
            var e = event[i];
            if (pushEvent.indexOf(e.type) != -1) {
                events.push(getNewEvent(e));
            }
        }
        return events;
    }

    //重组事件
    function regroupEvent(fightScene) {
        var str = "";
        for (var i = 0; i < fightScene.fighters.length; i++) {
            var f = fightScene.fighters[i];
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

    //退出战斗
    exports.exitFight = function (roomID, ID, IsSave) {
        var fighterScene = scenes[roomID], count = 0;
        if (!fighterScene) return;
        for (var i = 0; i < fighterScene.fighters.length; i++) {
            if (fighterScene.fighters[i].sid == ID && !fighterScene.fighters[i].isMirror) {
                fighterScene.fighters[i].remove = true;
            } else {
                if ((fighterScene.fighters[i].type == "fighter" && !fighterScene.fighters[i].isMirror) && !fighterScene.fighters[i].remove) {
                    count++;
                }
            }
        }
        if (functionFileObj[fighterScene.type].exitFight) {
            functionFileObj[fighterScene.type].exitFight(fighterScene);
        }
        //销毁场景
        if (count == 0 && !IsSave) {
            destroyScene(roomID);
        }
    };

    exports.destroyScene = function (roomID) {
        destroyScene(roomID);
    }

    //销毁场景
    function destroyScene(roomID) {
        var fightScene = scenes[roomID];
        if (!fightScene) return;
        fightScene.destroyScene();
        delete scenes[roomID];
        fightScene = null;
    };

    //复活战斗者
    exports.resurgence = function (roomID, ID, isMirror, site) {
        var fighterScene = scenes[roomID];
        site = site ? JSON.parse(site) : [];
        if (!fighterScene) return;
        for (var i = 0; i < fighterScene.fighters.length; i++) {
            var f = fighterScene.fighters[i],
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
                break;
            }
        }
    };

    //处理事件
    exports.disposeOrder = function (param) {
        var fightScene = scenes[param.room_id],
            role_id = param.id,
            f = {};
        if (!fightScene) return;
        for (var i = 0; i < fightScene.fighters.length; i++) {
            if (fightScene.fighters[i].sid == role_id && !fightScene.fighters[i].isMirror) {
                f = fightScene.fighters[i];
                break;
            }
        }
        if (param.result) {
            var result = JSON.parse(param.result);
            return clickScene(result, f, fightScene);
        }
        if (param.skill_id) {
            return handSkill(param.skill_id, f, fightScene);
        }
    }
    //处理点击事件
    function clickScene(result, fighter_own, fightScene) {
        let at = fighter_own.actionTime - fightScene.now;
        if (result.type === "terrain") {
            fighter_own.handMove = { x: result.data[0], y: result.data[2], click: result.click };
            fighter_own.curTarget = undefined;
        } else if (result.type == "ping") {
            return `{"now":${fightScene.now}}`;
        }
        else {
            var curTarget = fightScene.mapList[result.id];
            if (curTarget && curTarget.hp > 0) {
                fighter_own.curTarget = curTarget.mapId;
                fighter_own.handMove = undefined;
            } else return `{"fail":"no target","action":${fighter_own.actionTime}}`;

            //fighter_own.curSkill = fighter_own.skill[0];
            // if (fightScene.group[fighter_own.groupId].indexOf(result.id) == -1 && curTarget.groupId >= 0) {
            //     fighter_own.ownTarget = curTarget.mapId;
            // }
            return `{"ok":${fighter_own.actionTime - fightScene.now},"action":${fighter_own.actionTime}}`;
        }
    };

    function handSkill(skillId, fighter, fightScene) {
        var skills = fighter.skill, f = fighter.mapId;
        for (var k in skills) {
            var skill = skills[k];
            if (skill && skill.id == skillId) {
                if (!fightScene.handSkill(f, skill)) {
                    return "no target";
                }
            }
        }
    };

    //得到简化后的对象
    function getNewObj(attr, obj, addSkill) {
        var newObj = {};
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
        var new_e = {},
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
                    var newObj = {};
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
            scene.pushEvent1.push({ type: "refreshPet", pet: info.skin_id, mapId: f.mapId });
            console.log("refreshPet");
        }
        if (info.skin_id != f.clothes && info.type == "clothes") {
            f.clothes = info.skin_id;
            scene.pushEvent1.push({ type: "refreshClothes", clothes: info.skin_id, mapId: f.mapId });
            console.log("refreshClothes");
        }
    }

    //更新属性
    exports.refreshAttr = function (roomID, ID, info, type) {
        var fighterScene = scenes[roomID],
            attr = info.attr,
            skillList = info.skill;
        if (!fighterScene) return;
        for (var i = 0; i < fighterScene.fighters.length; i++) {
            var f = fighterScene.fighters[i];
            if (f.sid == ID && !f.isMirror) {
                if (attr) {
                    pushExtraEvent(fighterScene, "refreshAttr", "max_hpCount", attr.max_hp, f);
                    f.A = attr;
                    fight_formula_1.Fight_formula.count(f);
                }
                if (skillList) {
                    var skillInfo = initSkill(skillList, f, fighterScene);
                    replaceSkill(skillInfo, f, fighterScene, skillList);
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

    //推送额外事件
    function pushExtraEvent(fighterScene, pushType, attrType, value, f) {
        var oldValue = f[attrType],
            event = {};
        if (value != oldValue) {
            f[attrType] = value;
            event["type"] = pushType;
            event["mapId"] = f.mapId;
            event[attrType] = value;
            fighterScene.pushEvent1.push(event);
        }
    }
    //初始化技能
    function initSkill(skillList, f, scene) {
        var skillInfo = init_fighter.initSkill(skillList, f);
        for (var i = 0; i < skillInfo.length; i++) {
            var s = skillInfo[i];
            s.damage = fightJs.getEffectValue(s.damage, f, s);
            s.damagePer = fightJs.getEffectValue(s.damagePer, f, s);
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
        if (skillInfo.length || skillLength != f.skill.length) {
            scene.pushEvent1.push({ type: "refreshSkill", skill: skillList, mapId: f.mapId });
            f.skill = f.skill.concat(skillInfo);
        }
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

    // 增加buff
    exports.addBuff = function (f, buffId, fightScene) {
        // var buff = createBuff(buffId);
        var buff = init_fighter.getBuff(buffId);
        fightScene.addBuff(f, f, undefined, buff);
    }

    //更新历史等级
    exports.refreshLevel = function (roomID, level) {
        var fightScene = scenes[roomID];
        if (!fightScene) return;
        fightScene.monsterLevel = level;
    };

    //fighter状态切换
    exports.changeFightStats = function (roleID, roomID, status) {
        var fightScene = scenes[roomID];
        if (!fightScene) return;
        for (var i = 0; i < fightScene.fighters.length; i++) {
            var f = fightScene.fighters[i];
            if (f.sid == roleID && (f.type == "fighter" && !f.isMirror)) {
                f.status = status;
                f.curTarget = undefined;
                f.curSkill = undefined;
            }
        }
    };

    //清除怪物
    exports.clearMonster = function (roomId) {
        var fightScene = scenes[roomId];
        if (!fightScene) return;
        clearMonster(fightScene);
    }

    //清除怪物
    function clearMonster(fightScene) {
        for (var i = 0; i < fightScene.fighters.length; i++) {
            if (fightScene.fighters[i].type == "monster") {
                fightScene.fighters[i].remove = true;
            }
        }
    };

    //得到boss的受到的伤害
    exports.getMonsterDamage = function (roomID) {
        var fightScene = scenes[roomID];
        if (!fightScene) return;
        for (var i = 0; i < fightScene.fighters.length; i++) {
            var f = fightScene.fighters[i];
            if (f.type == "monster") {
                return (f.max_hpCount - f.hp);
            }
        }
    };

    exports.loadSceneNav = function (name, str) {
        var arrayBuffer = _base64ToArrayBuffer(str);
        var nav = new navmesh.NavMesh();
        nav.load(arrayBuffer);
        sceneNaves[name] = nav;
    }

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

});