_$define("v8/fight_scene", function (require, exports, module) {
    var fight = require("fight/a/common/fight"),
        initFighter = require("fight/a/common/init_fighter").Init_Fighter,
        COEFFICIENT = 100000,
        INTERVAL = 1000;
    //创建场景
    exports.createScene = function (data) {
        var isScreen = !!data.is_screen,
            fightScene = fight.createScene(1024, 1024, 1, data.type, null, isScreen);
        fightScene.type = data.type;

        return fightScene;
    };

    //创建玩家
    exports.createFight = function (data) {
        var fighterList = initFighter.initFighter(data);
        for (var i = 0; i < fighterList.length; i++) {
            //status 1000表示不参与战斗
            fighterList[i].status = 1000;
        }
        return fighterList;
    };
    //创建怪物
    exports.createMonster = function (data) {
        var monsterList = initFighter.initMonster(data);
        return monsterList;
    };
    //json转换为erlang 字符串
    exports.jsonToErlangString = function (data) {
        return JSON.stringify(data).replace(/:/g, ",")
    };

    //移除怪物仇恨
    exports.removeHatred = function (f, scene) {
        if (f.type == "fighter") return;
        var curTarget = scene.mapList[f.curTarget],
            a = f.circlePoint[0],
            b = f.circlePoint[1];
        if (curTarget && (curTarget.hp <= 0 || !isCircle(f.backDistance, a, b, curTarget.x, curTarget.y) && !isCircle(f.round, f.x, f.y, curTarget.x, curTarget.y))) {
            f.curTarget = undefined;
            f.curSkill = undefined;
            // f.passive = true;
            f.damageList = {};
            f.hp = f.max_hpCount;
            f.handMove = { x: a, y: b };
        }
    };

    // 怪物游走
    exports.migration = function (f, scene, min, max) {
        if (!f.backDistance) return;
        if (f.type == "monster" && !f.curTarget && f.circlePoint && scene.now > f.moveTime && f.walkRange) {
            var pos = exports.randomCirclePos(f.walkRange, f.circlePoint[0], f.circlePoint[1]);
            f.handMove = { x: pos[0], y: pos[1] };
            f.moveTime = scene.now + exports.random(min * INTERVAL, max * INTERVAL);
        }
    };

    //随机圆形区域坐标
    exports.randomCirclePos = function (r, a, b) {
        while (true) {
            var x = Math.random() * 2 * r + (a - r),
                y = Math.random() * 2 * r + (b - r);
            if (isCircle(r, a, b, x, y)) {
                return [x, y]
            }
        }
    };

    //是否在圆内a、b:圆心 x,y:目标坐标 r:半径
    function isCircle(r, a, b, x, y) {
        return (x - a) * (x - a) + (y - b) * (y - b) <= r * r;
    }

    //根据权重得到数组的下标
    exports.selectOneRandom = function (arr) {
        if (!arr.length) return;
        var sum = 0,
            newArr = [],
            randomNum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
            newArr.push(sum * COEFFICIENT);
        }
        randomNum = exports.random(1, sum * COEFFICIENT);
        if (newArr[0] >= randomNum) return 0;
        for (var i = 0; i < newArr.length - 1; i++) {
            if (newArr[i] < randomNum && randomNum <= newArr[i + 1])
                return i + 1;
        }
        return 0;
    };

    //从两个数之间随机一个数
    exports.random = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };

    //监控怪物
    exports.monitorMonster = function (scene, refreshCDList, walikTime, isCalcDamage) {
        var erlangDeals = scene.erlangDeals;
        for (var i = 0; i < scene.fighters.length; i++) {
            var f = scene.fighters[i];
            if (f.isMirror && f.hp <= 0) {
                //机器人死亡立即复活
                f.hp = f.max_hpCount;
            }
            if (f.type == "monster" && f.hp <= 0 && !f.refreshTime) {
                var maxDamge = [0, 0];
                for (var sid in f.damageList) {//sid 表示sid
                    if (isNaN(sid)) continue;
                    var mapF = exports.getFighter(scene, sid);
                    if (!mapF) continue;

                    var area = mapF.area;
                    if (mapF.taskInfo && mapF.taskInfo.task == f.sid) {
                        mapF.taskInfo.killNum++;
                    }
                    if (f.damageList[sid] > maxDamge[1]) {
                        maxDamge = [mapF, f.damageList[sid]];
                    }
                    var coe = f.damageList[sid] / f.max_hpCount > 1 ? 1 : f.damageList[sid] / f.max_hpCount;
                    //增加经验
                    // exports.addDeals("exp", erlangDeals, sid, Math.round(coe * f.exp), mapF.isMirror);
                    //增加金钱
                    // exports.addDeals("money", erlangDeals, sid, Math.round(coe * f.money), mapF.isMirror);

                }
                var obj = {},
                    maxf = maxDamge[0];
                obj[f.sid] = f.level;
                if (maxf) {
                    exports.addProp(erlangDeals, maxf.sid + "_" + maxf.area, obj, maxf.isMirror);
                    exports.addDeals("kill", erlangDeals, maxf.sid, 1, maxf.isMirror);
                }
                var refreshCD = refreshCDList[0] ? exports.random(refreshCDList[0] * INTERVAL, refreshCDList[1] * INTERVAL) : refreshCDList * INTERVAL;
                f.refreshTime = scene.now + refreshCD;
                f.removeTime = scene.now + 2250;
            }
            //移除仇恨
            exports.removeHatred(f, scene);
            //怪物游走
            exports.migration(f, scene, walikTime[0], walikTime[1]);
            //删除怪物
            removeEnemy(f, scene);
        }
        if (isCalcDamage)
            exports.calcDamage(scene, erlangDeals);
    };

    //删除怪物
    function removeEnemy(f, scene) {
        if (f.type == "monster" && f.removeTime < scene.now && f.show_type != 1) {
            var newf = f.clone();
            f.remove = true;
            if (!scene.refreshList) scene.refreshList = [];
            scene.refreshList.push(f);
        }
    }

    //得到玩家fighter(包括镜像)
    exports.getFighter = function (scene, sid) {
        for (var i = 0; i < scene.fighters.length; i++) {
            var f = scene.fighters[i];
            if (f.type == "fighter" && f.sid == sid) {
                return f;
            }
        }
        return undefined;
    }

    exports.addDeals = function (type, obj, sid, val, isMirror) {
        if (isMirror) return;
        if (!obj[type]) obj[type] = {};
        if (!obj[type][sid]) obj[type][sid] = 0;
        obj[type][sid] += val;
    };
    exports.addProp = function (obj, sidArea, val, isMirror) {
        if (isMirror) return;
        if (!obj.prop) obj.prop = {};
        if (!obj.prop[sidArea]) obj.prop[sidArea] = [];
        obj.prop[sidArea].push(val);
    };

    //计算造成伤害
    exports.calcDamage = function (scene, erlangDeals) {
        var event = scene.pushEvent;
        for (var i = 0; i < event.length; i++) {
            var e = event[i];
            if (e.type == "damage") {
                var f = e.fighter,
                    t = e.target,
                    damage = e.r.damage || 0;
                if (f.type == "fighter" && f.sid != t.sid)
                    // 伤害
                    exports.addDeals("damage", erlangDeals, f.sid, damage, f.isMirror);
            }
            if (e.type == "effect" && e.effect == "hp" && e.value < 0) {
                var f = e.fighter,
                    t = e.target,
                    damage = -e.value || 0;
                if (f.type == "fighter" && f.sid != t.sid)
                    exports.addDeals("damage", erlangDeals, f.sid, damage, f.isMirror);
            }
        }
    }

    exports.calcDeath = function (scene, erlangDeals) {
        var bossDead;
        for (var i = 0; i < scene.fighters.length; i++) {
            var f = scene.fighters[i];
            if (f.type == "fighter" && f.hp <= 0 && !f.isDeath) {
                exports.addDeals("death", erlangDeals, f.sid, 1, f.isMirror);
                f.isDeath = true;
            }
            if (f.show_type == 1 && f.hp <= 0) {
                bossDead = true;
            }
        }
        return bossDead;
    }

});