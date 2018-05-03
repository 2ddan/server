_$define("v8/gang_expand", function (require, exports, module) {
    var fight_scene = require("./fight_scene"),
        INTERVAL = 1000;


    //执行战斗
    exports.loop = function (fightScene) {
        fightScene.loop();
        //计算伤害
        fight_scene.calcDamage(fightScene, fightScene.erlangDeals);
        var bossDead = fight_scene.calcDeath(fightScene, fightScene.erlangDeals);
        if (!(fightScene.now % INTERVAL) && Object.keys(fightScene.erlangDeals).length || bossDead) {
            var erlangDeals = fightScene.erlangDeals;
            fightScene.erlangDeals = {};
            return JSON.stringify(erlangDeals);
        }
        return "{}";
    };
   
    //创建场景
    exports.createScene = function (data) {
        var fightScene = fight_scene.createScene(data),
            bossInfo = data.extra.boss_info;
        fightScene.erlangDeals = {};
        fightScene.pushEvent1 = [];
        //创建玩家
        var f = exports.createFight(data);
        //刷怪
        createMonster(fightScene, bossInfo[0], bossInfo[1], data.extra);
        fightScene.setNavMesh(main.sceneNaves[data.extra.scene_id]);
        fightScene.insert(f);

        return fightScene;
    };

    //创建fighter
    exports.createFight = function (data) {
        var f = fight_scene.createFight(data.own)[0],
            birth = data.extra.birth_site;
        f.x = birth[0];
        f.y = birth[1];
        f.status = 0;
        return f;
    }

    //创建boss
    function createMonster(scene, id, level, data) {
        var arr = fight_scene.createMonster([[id, level, 0]]),
            monster = arr[0],
            site = data.monster_site,
            hp = data.monster_hp;
        monster.x = site[0];
        monster.y = site[1];
        monster.birth = site;
        monster.level = level;
        monster.groupId = 0;
        monster.hp = hp;
        monster.show_type = 1;
        scene.insert(monster);
    }

});