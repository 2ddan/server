import * as fight from "fight/a/fight";
import { Init_Fighter as initFighter } from "fight/a/common/init_fighter";
import { EType, blend } from "../fight/a/analyze";

// =========================================== 导出
//创建场景
export const createScene = function (data) {
    var isScreen = !!data.is_screen,
        fightScene = fight.FMgr.create(data.type);
    fightScene.start();
    return fightScene;
};

//创建玩家
export const createFight = function (data) {
    var fighterList = initFighter.initFighter(data);
    for (var i = 0; i < fighterList.length; i++) {
        //非ai 不自动战斗，由客户端驱动
        fighterList[i].ai = false;
    }
    return fighterList;
};
//创建怪物
export const createMonster = function (data) {
    var monsterList = initFighter.initMonster(data);
    return monsterList;
};
//json转换为erlang 字符串
export const jsonToErlangString = function (data) {
    return JSON.stringify(data).replace(/:/g, ",")
};

//移除怪物仇恨
export const removeHatred = function (f, scene) {
    if (f.type == "fighter") return;
    var curTarget = scene.fighters.get(f.curTarget),
        a = f.circlePoint[0],
        b = f.circlePoint[1];
    if (curTarget && (curTarget.hp <= 0 || !isCircle(f.backDistance, a, b, curTarget.x, curTarget.y) && !isCircle(f.round, f.x, f.y, curTarget.x, curTarget.y))) {
        f.curTarget = undefined;
        f.curSkill = undefined;
        // f.passive = true;
        f.damageList = {};
        f.hp = f.max_hpCount;
        f.handMove = { x: a, y: b };
        scene.pushEvent1.push([EType["revive"], f.mapId]);
    }
};

// 怪物游走
export const migration = function (f, scene, min, max) {
    if (!f.backDistance) return;
    if (f.type == "monster" && !f.curTarget && f.circlePoint && scene.now > f.moveTime && f.walkRange) {
        var pos = randomCirclePos(f.walkRange, f.circlePoint[0], f.circlePoint[1]);
        f.handMove = { x: pos[0], y: pos[1] };
        f.moveTime = scene.now + random(min * INTERVAL, max * INTERVAL);
    }
};

//随机圆形区域坐标
export const randomCirclePos = function (r, a, b) {
    while (true) {
        var x = Math.random() * 2 * r + (a - r),
            y = Math.random() * 2 * r + (b - r);
        if (isCircle(r, a, b, x, y)) {
            return [x, y]
        }
    }
};



//根据权重得到数组的下标
export const selectOneRandom = function (arr) {
    if (!arr.length) return;
    var sum = 0,
        newArr = [],
        randomNum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
        newArr.push(sum * COEFFICIENT);
    }
    randomNum = random(1, sum * COEFFICIENT);
    if (newArr[0] >= randomNum) return 0;
    for (var i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] < randomNum && randomNum <= newArr[i + 1])
            return i + 1;
    }
    return 0;
};

//从两个数之间随机一个数
export const random = function (Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
};

//监控怪物
export const monitorMonster = function (scene, refreshCDList, walikTime, isCalcDamage?) {
    var erlangDeals = scene.erlangDeals;
    for (var e of scene.fighters) {
        var f = e[1];
        if (f.isMirror && f.hp <= 0) {
            //机器人死亡立即复活
            f.hp = f.max_hpCount;
            scene.pushEvent1.push([EType["revive"], f.mapId]);
        }
        if (f.type == "monster" && f.hp <= 0 && !f.refreshTime) {
            var maxDamge = [0, 0];
            for (var sid in f.damageList) {//sid 表示sid

                if (isNaN(parseInt(sid))) continue;
                var mapF = getFighter(scene, sid);
                if (!mapF) continue;

                var area = mapF.area;
                if (mapF.taskInfo && mapF.taskInfo.task == f.sid) {
                    mapF.taskInfo.killNum++;
                    scene.addEvents([EType.task, mapF.mapId, mapF.taskInfo.killNum]);
                }
                if (f.damageList[sid] > maxDamge[1]) {
                    maxDamge = [mapF, f.damageList[sid]];
                }
                var coe = f.damageList[sid] / f.max_hpCount > 1 ? 1 : f.damageList[sid] / f.max_hpCount;
                //增加经验
                // addDeals("exp", erlangDeals, sid, Math.round(coe * f.exp), mapF.isMirror);
                //增加金钱
                // addDeals("money", erlangDeals, sid, Math.round(coe * f.money), mapF.isMirror);

            }
            var obj = {},
                maxf: any = maxDamge[0];
            obj[f.sid] = f.level;
            if (maxf) {
                addProp(erlangDeals, maxf.sid + "_" + maxf.area, obj, maxf.isMirror);
                addDeals("kill", erlangDeals, maxf.sid, 1, maxf.isMirror);
            }
            var refreshCD = refreshCDList[0] ? random(refreshCDList[0] * INTERVAL, refreshCDList[1] * INTERVAL) : refreshCDList * INTERVAL;
            f.refreshTime = scene.now + refreshCD;
            f.removeTime = scene.now + 2250;
        }
        //移除仇恨
        removeHatred(f, scene);
        //怪物游走
        migration(f, scene, walikTime[0], walikTime[1]);
        //删除怪物
        removeEnemy(f, scene);
    }
    if (isCalcDamage)
        calcDamage(scene, erlangDeals);
};



//得到玩家fighter(包括镜像)
export const getFighter = function (scene, sid) {
    for (var e of scene.fighters) {
        var f = e[1];
        if (f.type == "fighter" && f.sid == sid) {
            return f;
        }
    }
    return undefined;
}

export const addDeals = function (type, obj, sid, val, isMirror?) {
    if (isMirror) return;
    if (!obj[type]) obj[type] = {};
    if (!obj[type][sid]) obj[type][sid] = 0;
    obj[type][sid] += val;
};
export const addProp = function (obj, sidArea, val, isMirror) {
    if (isMirror) return;
    if (!obj.prop) obj.prop = {};
    if (!obj.prop[sidArea]) obj.prop[sidArea] = [];
    obj.prop[sidArea].push(val);
};

//计算造成伤害
export const calcDamage = function (scene, erlangDeals) {
    var event = blend(scene.pushEvent.clone());
    for (var i = 0; i < event.length; i++) {
        var e: any = event[i];
        if (e.type == "damage") {
            var f = scene.fighters.get(e.fighter),
                t = scene.fighters.get(e.target),
                damage = e.r.damage || 0;
            if (f.type == "fighter" && f.sid != t.sid)
                // 伤害
                addDeals("damage", erlangDeals, f.sid, damage, f.isMirror);
        }
        if (e.type == "effect" && e.effect == "hp" && e.value < 0) {
            var f = scene.fighters.get(e.fighter),
                t = scene.fighters.get(e.target),
                damage: any = -e.value || 0;
            if (f.type == "fighter" && f.sid != t.sid)
                addDeals("damage", erlangDeals, f.sid, damage, f.isMirror);
        }
    }
}

export const calcDeath = function (scene, erlangDeals) {
    var bossDead;
    for (var e of scene.fighters) {
        var f = e[1];
        if (f.type == "fighter" && f.hp <= 0 && !f.isDeath) {
            addDeals("death", erlangDeals, f.sid, 1, f.isMirror);
            f.isDeath = true;
        }
        if (f.show_type == 1 && f.hp <= 0) {
            bossDead = true;
        }
    }
    return bossDead;
}

//计算场景内玩家人数
export const calcFighterCount = function (scene, ID) {
    var len = 0,
        list = [];
    for (var e of scene.fighters) {
        var f = e[1];
        if (f.type == "fighter" && !f.isMirror && f.sid != ID) {
            len++;
            list.push(f);
        }
    }
    return { "count": len, "list": list };
}

// ========================================= 本地
var COEFFICIENT = 100000,
    INTERVAL = 1000;
//是否在圆内a、b:圆心 x,y:目标坐标 r:半径
function isCircle(r, a, b, x, y) {
    return (x - a) * (x - a) + (y - b) * (y - b) <= r * r;
}

//删除怪物
function removeEnemy(f, scene) {
    if (f.type == "monster" && f.removeTime < scene.now && f.show_type != 1) {
        var newf = f.clone();
        f.remove = true;
        if (!scene.refreshList) scene.refreshList = [];
        scene.refreshList.push(f);
    }
}