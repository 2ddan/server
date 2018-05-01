// =================================== 导入
import { Request } from "fight/a/request";
import * as fight_scene from "./fight_scene";
    

// ================================== 导出
//执行战斗
export const loop = function (fightScene) {
    fightScene.loop();
    //计算伤害
    fight_scene.calcDamage(fightScene, fightScene.erlangDeals);
    var bossDead = fight_scene.calcDeath(fightScene, fightScene.erlangDeals);
    if (!(fightScene.fightTime % INTERVAL) && Object.keys(fightScene.erlangDeals).length || bossDead) {
        var erlangDeals = fightScene.erlangDeals;
        fightScene.erlangDeals = {};
        return JSON.stringify(erlangDeals);
    }
    return "{}";
};

//创建场景
export const createScene = function (data) {
    var fightScene: any = fight_scene.createScene(data),
        bossInfo = data.extra.boss_info;
    fightScene.erlangDeals = {};
    fightScene.pushEvent1 = [];
    //创建玩家
    var f = createFight(data);
    //刷怪
    createMonster(fightScene, bossInfo[0], bossInfo[1], data.extra.monster_site);

    Request.insert(f,fightScene);
    return fightScene;
};

//创建fighter
export const createFight = function (data) {
    var f = fight_scene.createFight(data.own)[0],
        birth = data.extra.birth_site;
    f.x = birth[0];
    f.y = birth[1];
    f.status = 0;
    return f;
}

// ======================================= 本地
    var INTERVAL = 1000;
    //创建boss
    function createMonster(scene, id, level, site) {
        var arr = fight_scene.createMonster([[id, level, 0]]),
            monster = arr[0];
        monster.x = site[0];
        monster.y = site[1];
        monster.birth = site;
        monster.level = level;
        monster.groupId = 0;
        monster.show_type = 1;
        Request.insert(monster,scene);
    }
