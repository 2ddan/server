// ======================================== 导入
import { Request } from "fight/a/request";
import { KillMonsterBase as killBase} from "fight/b/common/kill_base";
import { killMonsterPosition1 as  killMonsterPosition} from "fight/b/common/kill_monster_position";

import * as fight_scene from "./fight_scene";
    

// ======================================= 导出
//执行战斗
export const loop = function (fightScene) {
    fightScene.loop();
    //刷怪
    isRefreshMonster(fightScene);
    //监控怪物 记录伤害和移除
    fight_scene.monitorMonster(fightScene, killBase.refresh_cd, [3, 5], true);
    //刷怪
    refreshEnemy(fightScene);
    if (!(fightScene.now % INTERVAL) && Object.keys(fightScene.erlangDeals).length) {
        var erlangDeals = fightScene.erlangDeals;
        fightScene.erlangDeals = {};
        return JSON.stringify(erlangDeals);
    }
    return "{}";
};

//创建场景
export const createScene = function (data) {
    var fightScene:any = fight_scene.createScene(data),
        monsterLevel = data.extra.monster_level;
    fightScene.monsterLevel = monsterLevel;
    fightScene.erlangDeals = {};
    fightScene.pushEvent1 = [];
    //创建玩家
    var f = createFight(data)
    //刷怪
    isRefreshMonster(fightScene);

    Request.insert(f,fightScene);

    return fightScene;
};

//创建fighter
export const createFight = function (data) {
    var f = fight_scene.createFight(data.own)[0],
        birth = killBase.borth_site;
    f.x = birth[0];
    f.y = birth[1];
    return f;
}

// ========================================== 本地
var HOUR_TO_MIN_TO_SEC = 60,
        INTERVAL = 1000,
        MAXINTERVAL = 5000;
    //刷怪
    function isRefreshMonster(fightScene) {
        var isOpen = isOpenTime();
        if (isOpen && !fightScene.isRefresh) {
            fightScene.isRefresh = true;
            //先清空所有怪物
            //初始化怪物
            initMonster(fightScene);
        }
        if (!isOpen && fightScene.isRefresh) {
            fightScene.isRefresh = false;
        }
    }

    //是否开放时间
    function isOpenTime() {
        var openTime = killBase.open_time,
            nowDate = new Date(),
            now = (nowDate.getHours() * HOUR_TO_MIN_TO_SEC + nowDate.getMinutes()) * HOUR_TO_MIN_TO_SEC + nowDate.getSeconds();
        for (var i = 0; i < openTime.length; i++) {
            var min = openTime[i][0] * HOUR_TO_MIN_TO_SEC, max = openTime[i][1] * HOUR_TO_MIN_TO_SEC;
            if (min <= now && now <= max) {
                return true;
            }
        }
        return false;
    }
    //初始化怪物
    //[{ "refresh_range": [[-8, 0], [-8, 0]], "monster_num": 3 }, { "refresh_range": [[-8, 0], [8, 0]], "monster_num": 3 }, { "refresh_range": [[8, 0], [8, 0]], "monster_num": 3 }, { "refresh_range": [[8, 0], [-8, 0]], "monster_num": 3 }]
    function initMonster(scene) {
        for (var i = 0; i < killMonsterPosition.length; i++) {
            var positObj = killMonsterPosition[i].clone(),
                monsterNum = positObj.monster_num,
                monsterId = positObj.monster_id;
            while (monsterNum > 0) {
                var site = getRandomSite(positObj.refresh_range),
                    index = fight_scene.random(0, monsterId.length - 1),
                    f = createMonster(scene, monsterId[index], scene.monsterLevel, site, i);
                Request.insert(f,scene);
                monsterNum--;
            }
        }
    }
    //得到随机坐标
    function getRandomSite(refresh_range) {
        var x = fight_scene.random(refresh_range[0][0], refresh_range[0][1]),
            y = fight_scene.random(refresh_range[1][0], refresh_range[1][1]);
        return [x, y];
    }

    function createMonster(scene, id, level, site, index) {
        var arr = fight_scene.createMonster([[id, level, 0]]),
            monster = arr[0];
        monster.x = site[0];
        monster.y = site[1];
        monster.birth = site;
        monster.passive = true;
        monster.level = level;
        monster.moveTime = scene.now + fight_scene.random(INTERVAL, MAXINTERVAL);
        monster.circlePoint = site;
        monster.walkRange = killBase.walk_range;
        monster.groupId = 0;
        monster.zoomIndex = index;
        return monster;
    }

    //刷新怪物
    function refreshEnemy(scene) {
        if (!scene.refreshList) return;
        for (var i = 0; i < scene.refreshList.length; i++) {
            var f = scene.refreshList[i];
            if (f.refreshTime < scene.now && isOpenTime()) {
                var index = f.zoomIndex,
                    positObj = killMonsterPosition[index].clone(),
                    monsterId = positObj.monster_id,
                    site = getRandomSite(positObj.refresh_range),
                    sid = monsterId[fight_scene.random(0, monsterId.length - 1)];
                scene.refreshList.splice(i, 1);
                i--;
                Request.insert(createMonster(scene, sid, scene.monsterLevel, site, index),scene);
            }
        }
    }
