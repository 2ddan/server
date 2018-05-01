// ================================ 导入
//fight
import {nameWare} from "fight/b/common/name_ware_house";
import { wildBase } from "fight/b/common/wild_base";
import { role_base as roleBase } from "fight/b/common/role_base";
import * as init_fighter from "fight/a/common/init_fighter";
import * as wildMission from "fight/b/common/wild_mission_cfg";
import * as wildMap from "fight/b/common/wild_map_cfg";
import * as WildBoss from "fight/b/common/wild_boss_cfg";
import { Request } from "fight/a/request";

import * as fight_scene from "./fight_scene";
import * as main from "./main";
    


// ========================================== 导出
    //执行战斗
    export const loop = function (fightScene) {
        fightScene.loop();
        //监控玩家任务完成情况
        monitorTask(fightScene);
        //监控怪物 记录伤害和移除
        fight_scene.monitorMonster(fightScene, wildBase.refresh_cd, wildBase.move_interval);
        //刷新怪物
        refreshEnemy(fightScene);

        removeHelpFight(fightScene);
        if (!(fightScene.fightTime % INTERVAL) && Object.keys(fightScene.erlangDeals).length) {
            var erlangDeals = fightScene.erlangDeals;
            fightScene.erlangDeals = {};
            return JSON.stringify(erlangDeals);
        }
        return "{}";
    };

    //创建场景
    export const createScene = function (data) {
        var fightScene:any = fight_scene.createScene(data),
            guard = data.extra.guard,
            missionInfo = wildMission.wild_mission[guard],
            map = wildMap.wild_map[missionInfo.map_id];
        fightScene.guard = guard;
        fightScene.erlangDeals = {};
        fightScene.pushEvent1 = [];
        fightScene.setNavMesh(main.sceneNaves[map.res]);
        //创建玩家
        var f = createFightOne(data, fightScene);
        //刷怪
        refreshMonster(fightScene);
        Request.insert(f,fightScene);
        copyPlayer(data.extra.person_num - 1, f, fightScene);
        if (data.extra.is_boss)
        insertBossOne(fightScene, data.extra.exsit_time, data.extra.add_robot_num);

        return fightScene;
    };

    //创建fighter
    export const createFight = function (data, scene) {
        var newf = createFightOne(data, scene);
        for(var e of scene.fighters){
            let f = e[1];
            if (f.isMirror && !f.exsitTime) {
                f.remove = true;
                break;
            }
        }
        return newf;
    };

    //插入boss
    export const insertBoss = function (roomID, exsitTime, addRobotNum) {
        var scene = main.scenes[roomID];
        if (!scene) return;
        insertBossOne(scene, exsitTime, addRobotNum);
    }

    //退出战斗的处理
    export const exitFight = function (scene) {
        if (!scene) return;
        var f = getRandomFighter(scene);
        copyPlayer(1, f, scene);
    };

    //刷新任务
    export const refreshTask = function (roomID, mapId) {
        var scene = main.scenes[roomID];
        if (!scene) return;
        var f = scene.fighters.get(mapId);
        if (!f) return;
        refreshTaskOne(scene.guard, f);
        return JSON.stringify(f.taskInfo);
    }


    //判断是否可以领奖
    export const isAward = function (roomID, mapId) {
        var scene = main.scenes[roomID];
        if (!scene) return;
        var f = scene.fighters.get(mapId);
        if (!f) return;
        if (f.taskInfo.killNum >= f.taskInfo.needKillNum && !f.taskInfo.isAward) {
            main.addBuff(f, 9999991, scene);
            var guard = scene.guard,
                index = f.taskInfo.award_index + 1;
            f.taskInfo.isAward = true;
            return JSON.stringify({ "guard": guard, "index": index });
        }
        return false;
    }

// ========================================== 本地
var  PETSKIN = [2222221, 2222222, 2222223, 2222224],
        INTERVAL = 1000;
    
    //移除助战boss
    function removeHelpFight(scene) {
        var helpFight = [],
            bossDead = false;
        for(var e of scene.fighters){
            var f = e[1];
            if (f.show_type == 1) {
                for (var sid in f.damageList) {
                    let s = parseInt(sid);
                    if (isNaN(s)) continue;
                    if (s < 0) continue;

                    //记录参与打boss的人员
                    fight_scene.addDeals("fight_boss", scene.erlangDeals, sid, f.damageList[sid]);
                }
            }
            if (f.show_type == 1 && (f.hp <= 0 || f.exsitTime < scene.now)) {
                if (f.hp <= 0)
                    fight_scene.addDeals("boss_dead", scene.erlangDeals, f.sid, 1);
                bossDead = true;
                f.remove = true;
            };
            if (f.isMirror) {
                helpFight.push(f);
            };
        };
        if (bossDead) {
            for (var i = 0; i < helpFight.length; i++) {
                var f = helpFight[i];
                if (f.exsitTime)
                    f.remove = true;
                else
                    f.status = 0;
            }
        }
    }

    

    function createFightOne(data, scene) {
        var f = fight_scene.createFight(data.own)[0];
        // refreshTaskOne(data.extra.guard, f);
        // if (!f.isMirror) {
        //     scene.pushEvent1.push({ type: "taskInfo", sid: f.sid, taskInfo: f.taskInfo });
        // }
        var missionInfo = wildMission.wild_mission[data.extra.guard],
            map = wildMap.wild_map[missionInfo.map_id],
            birth = map.birth;
        f.x = birth[0];
        f.y = birth[1];
        f.birth = birth;
        if (data.extra.site) {
            var site = JSON.parse(data.extra.site);
            f.x = site[0];
            f.y = site[1];
        }
        return f;
    };

    
    function insertBossOne(scene, exsitTime, addRobotNum) {
        var missionInfo = wildMission.wild_mission[scene.guard],
            map = wildMap.wild_map[missionInfo.map_id],
            randomBossId = missionInfo.random_boss_id,
            randomBossLevel = missionInfo.random_boss_level,
            randomBossSite = map.random_boss_site;
        var index = fight_scene.random(0, randomBossId.length - 1),
            bossID = randomBossId[index];
        index = fight_scene.random(0, randomBossSite.length - 1);
        var boss = createMonster(scene, [bossID, 1], missionInfo.random_boss_level, randomBossSite[index]);
        boss.walkRange = undefined;
        boss.exsitTime = scene.now + exsitTime * 1000;
        Request.insert(boss,scene);
        // insertHelpFight(scene, addRobotNum, exsitTime, boss);
        autoFightBoss(scene, boss);
    };
    //插入助战镜像
    function insertHelpFight(scene, robotNum, exsitTime, boss) {
        for (var i = 0; i < robotNum; i++) {
            var f = copyFighter(getRandomFighter(scene), scene);
            f.exsitTime = scene.now + exsitTime * 1000;
            // f.ownTarget = boss.mapId;
            Request.insert(f,scene);
        }
    }
    //让镜像自动打boss
    function autoFightBoss(scene, boss) {
        for(var e of scene.fighters){
            var f = e[1];
            if (f.isMirror) {
                f.status = 1;
                f.curTarget = boss.mapId;
            }
        }
    }

    
    //得到随机玩家
    function getRandomFighter(scene) {
        var fighters = [];
        for(var e of scene.fighters){
            var f = e[1];
            if (!f.isMirror && f.type == "fighter")
                fighters.push(f);
        }
        var index = fight_scene.random(0, fighters.length - 1);
        return fighters[index];
    };

    function copyFighter(f, scene) {
        var newF = f.clone(),
            roleBaseKeys: any = Object.keys(roleBase),
            index = randomIndex(roleBaseKeys);
        var sample = roleBase[roleBaseKeys[index]],
            skillList = getSkillList(sample.skill, f.skillList);
        newF.name = getUnquieName(scene);
        newF.isMirror = true;
        newF.status = 0;
        newF.sid = -new Date().getTime();
        newF.clothes = 0;
        newF.pet = PETSKIN[randomIndex(PETSKIN)];
        newF.module = sample.module;
        newF.x = newF.birth[0];
        newF.y = newF.birth[1];
        newF.career_id = roleBaseKeys[index] | 0;
        newF.skill = init_fighter.initSkill(skillList, newF);
        newF.skill_index = {};
        newF.curTarget = undefined;
        newF.curSkill = undefined;
        newF.spreadSkill = undefined;
        newF.spreadTargets = undefined;
        newF.ensoulClass = 0;
        newF.equipStar = 0;
        newF.weaponId = 0;
        newF.ai = true;
        return newF;
    }

    function getSkillList(skill, skillList) {
        var newSkillList = [];
        for (var i = 0; i < skill.length; i++) {
            newSkillList.push([skill[i], skillList[i][1] | 0]);
        }
        return newSkillList;
    }

    //复制玩家
    function copyPlayer(personNum, f, scene) {
        for (var i = 0; i < personNum; i++) {
            var newF = copyFighter(f, scene);
            refreshTaskOne(scene.guard, newF);
            Request.insert(newF,scene);
        }
    };

    function getUnquieName(scene) {
        var nameList = [];
        for(var e of scene.fighters){
            var f = e[1];
            if (f.type == "fighter") {
                nameList.push(f.name + "");
            }
        };
        var name = getRandomName();
        while (nameList.indexOf(name + "") != -1) {
            name = getRandomName();
        }
        return name;
    }

    function getRandomName() {
        var name = [];
        for (var i = 0; i < nameWare.length; i++) {
            var index = fight_scene.random(0, nameWare[i].length - 1);
            name = name.concat(nameWare[i][index]);
        }
        return name;
    }
    

    //刷新任务
    function refreshTaskOne(guard, f) {
        var missionInfo = wildMission.wild_mission[guard],
            map = wildMap.wild_map[missionInfo.map_id],
            task = missionInfo.task1.clone(),
            site = missionInfo.site.clone(),
            taskQuality = missionInfo.task_quality,
            killNum = missionInfo.kill_num;
        if (f && f.taskInfo) {
            site.remove(site[task.indexOf(f.taskInfo.task)]);
            task.remove(f.taskInfo.task);
        };
        // 随机任务index
        var index = randomIndex(task);
        task = task[index];
        site = map.refresh_zoom[site[index] - 1];
        site = site[randomIndex(site)];
        site = fight_scene.randomCirclePos(wildBase.role_task_excursion, site[0], site[1])
        index = fight_scene.selectOneRandom(missionInfo.quality_random);
        f.taskInfo = { "task": task, "taskQuality": taskQuality[index], "needKillNum": killNum[index], "killNum": 0, "site": site, "award_index": index };
        f.birth = map.birth;
        //绑定任务怪
        // if (f.isMirror)
        f.targetConds = [["sid", task]];
        // f.handMove = { x: site[0], y: site[1] };
        return f;
    }

    

    //刷怪
    function refreshMonster(scene) {
        var missionInfo = wildMission.wild_mission[scene.guard],
            refreshMonsterZoom = missionInfo.refresh_monster_zoom.clone(),
            refreshEliteMonsterZoom = missionInfo.refresh_elite_monster_zoom_info.clone(),
            refreshMonsterZoomLevel = missionInfo.refresh_monster_zoom_level.clone(),
            mapRefreshZoom = wildMap.wild_map[missionInfo.map_id].refresh_zoom;
        scene.radius = wildMap.wild_map[missionInfo.map_id].radius;
        for (var i = 0; i < refreshMonsterZoom.length; i++) {
            var refreshZoom = mapRefreshZoom[i].clone().reverse(),
                level = refreshMonsterZoomLevel[i],
                eliteMonsterZoom = refreshEliteMonsterZoom[i];
            for (var j = 0; j < refreshMonsterZoom[i].length; j++) {
                var refreshMonsterInfo = refreshMonsterZoom[i][j],
                    count = refreshMonsterInfo[1];
                while (count > 0) {
                    var site = refreshZoom.pop(),
                        monsterInfo = refreshMonsterId(eliteMonsterZoom, refreshMonsterInfo[0]);
                    count--;
                    var f = createMonster(scene, monsterInfo, level, site);
                    f.zoomIndex = i;
                    f.monsterId = refreshMonsterInfo[0];
                    Request.insert(f,scene);
                }
            }
        }
    }

    //刷新精英怪
    function refreshMonsterId(eliteMonsterZoom, monsterId) {
        var eliteMonsterId = eliteMonsterZoom[0],
            eliteMonsterRate = eliteMonsterZoom[1];
        for (var i = 0; i < eliteMonsterId.length; i++) {
            if (isRefreshEilte(eliteMonsterRate[i]))
                return [eliteMonsterId[i], 3];
        }
        return [monsterId, 0]
    }

    function isRefreshEilte(rate) {
        var randomNum = fight_scene.random(1, 10000);
        return randomNum <= rate * 10000;
    }

    function createMonster(scene, monsterInfo, level, site) {
        var arr = fight_scene.createMonster([[monsterInfo[0], level, 0]]),
            monster = arr[0];
        monster.x = site[0];
        monster.y = site[1];
        monster.birth = site;
        monster.level = level;
        monster.moveTime = scene.now + fight_scene.random(wildBase.move_interval[0] * INTERVAL, wildBase.move_interval[1] * INTERVAL);
        monster.circlePoint = site;
        monster.walkRange = scene.radius;
        monster.groupId = 0;
        monster.show_type = monsterInfo[1];
        monster.backDistance = wildBase.wild_back_distance;
        return monster;
    }

    function refreshEnemy(scene) {
        if (!scene.refreshList) return;
        var refreshEliteMonsterZoom = wildMission.wild_mission[scene.guard].refresh_elite_monster_zoom_info;
        for (var i = 0; i < scene.refreshList.length; i++) {
            var f = scene.refreshList[i];
            if (f.refreshTime < scene.now) {
                var index = f.zoomIndex,
                    monsterInfo = refreshMonsterId(refreshEliteMonsterZoom[index], f.monsterId),
                    birth = fight_scene.randomCirclePos(wildBase.monster_refresh_excursion, f.birth[0], f.birth[1]);
                var newf = createMonster(scene, monsterInfo, f.level, f.birth);
                newf.zoomIndex = index;
                newf.monsterId = f.monsterId;
                scene.refreshList.splice(i, 1);
                i--;
                Request.insert(newf,scene);
            }
        }
    }

    //机器人任务是否完成
    function monitorTask(scene) {
        for(var e of scene.fighters){
            var f = e[1];
            if (f.type == "fighter" && f.isMirror && f.taskInfo) {
                if (f.taskInfo.killNum >= f.taskInfo.needKillNum) {
                    refreshTaskOne(scene.guard, f);
                    main.addBuff(f, 9999991, scene);
                }
                //判断是否需要返回任务挂机点
                //gobackTaskPos(f, scene.fighters);
            }
        }
    }
    //两点距离
    function calcPosDis(p1, p2) {
        var xx = p1.x - p2.x, yy = p1.y - p2.y;
        var _d1 = (xx * xx + yy * yy) * 1000000 | 0;
        var _d = Math.sqrt(_d1 / 1000000);
        return { xx: xx, yy: yy, d: _d };
    }
    //判断是否需要返回任务挂机点
    function gobackTaskPos(f, mapList) {
        //目标判断，没有目标 || 目标血量为0
        var b = function () {
            return !f.curTarget || f.curTarget && mapList.get(f.curTarget) && mapList.get(f.curTarget).hp <= 0;
        };
        if (b() && !f.handMove && calcPosDis(f, { x: f.taskInfo.site[0], y: f.taskInfo.site[1] }).d > 10) {
            var site = f.taskInfo.site;
            f.handMove = { x: site[0], y: site[1] };
            f.curTarget = undefined;
        }
    };


    //随机一个数组得到随机出的index
    function randomIndex(arr) {
        if (!arr.length) return;
        var index = fight_scene.random(0, arr.length - 1);
        return index;
    }
