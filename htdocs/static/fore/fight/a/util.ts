/**
 * 战斗决策
 */
 // ================================ 导入
import { Fight_formula } from "./common/fight_formula";
import { Result, Skill, Fighter } from "./class"
import { Scene } from "./fight";

 // ================================ 导出
export class Util{
    /**
     * @description 判断fighter当前是否可活动状态
     */
    static checkFighterActive(f: Fighter,s: Scene): string{
        //晕眩
        if (!f || f.stun) {
            return "The fighter was stunned!!";
        }
        //动作播放中
        if(f.actionTime && s.now < f.actionTime){
            return "The fighter is playing action!!";
        }
        return "";
    }
    /**
     * @description 根据技能id查找技能
     */
    static getFighterSkill(f: Fighter,sid: number): Skill{
        let r
        for(let i=0,len = f.skill.length;i<len;i++){
            if(f.skill[i].id == sid)
                r = f.skill[i];
        }
        return r;
    }
    /**
     * @description 计算技能动作播放时间
     */
    static actionTime(f: Fighter,s: Skill){
        let at = s.actionTime;
        if(s.combo){
            for(let j = 0, leng = s.backSkill.length;j<leng;j++){
                at += Util.getFighterSkill(f,s.backSkill[j]).actionTime;
            }
        }
        return at;
    }
    /**
     * @description 选择可释放技能
     */
    static selectSkill(f: Fighter, s: Scene) {
        var r,
            func = (ss)=>{
                if(ss.priority == 0)
                    return
                if (f.actionTime > s.now ||  ss.cdNextTime > s.now || (f.publicCDNextTime  > s.now && !ss.hand) || ss.energyCost > f.energy){
                    return;
                }
                if (f.curSkill && f.curSkill.priority >= ss.priority)
                    return;
                f.curSkill = ss;
            };
        
        for (var i = 0, len = f.skill.length; i < len; i++) {
            var ss = f.skill[i];
            // 非手动技能，则选择参与筛选
            if (!ss.hand)
                func(ss);
        }
        return f.curSkill;
    }



    /**
     * @description 判断某点pt是否在任意多边形points内部
     * @return {Boolean}
     */
    static isOutPolygon(pt, points) {
        //判断是否在最大四边形外
        var maxY = points[0][1], maxX = points[0][0], minY = maxY, minX = maxX;
        for (var i = 0, len = points.length; i < len; i++) {
            if (points[i][0] > maxX)
                maxX = points[i][0];
            else if (points[i][0] < minX)
                minX = points[i][0];
    
            if (points[i][1] > maxY)
                maxY = points[i][1];
            else if (points[i][1] < minY)
                minY = points[i][1];
        }
        if (pt.x < minX || pt.x > maxX || pt.y < minY || pt.y > maxY) {
            return true;
        }
    
        var p1, p2, ct = 0;
        for (var i = 0, len = points.length; i < len; i++) {
            p1 = points[i];
            if (i == len - 1) {
                p2 = points[0];
            } else {
                p2 = points[i + 1];
            }
            //如果pt.y小于p1.y,p2.y,这pt在直线下方，水平向右射线不想交
            if (pt.y < Math.min(p1[1], p2[1]) || pt.y > Math.max(p1[1], p2[1])) {
                continue;
            }
    
            //pt在直线上
            if ((pt.x - p1[0]) * (p2[1] - p1[1]) == (pt.y - p1[1]) * (p2[0] - p1[0])) {
                return false;
            }
    
            //直线水平,与水平向右射线重合
            if (pt.y == p1[1] && pt.y == p2[1] && pt.x < Math.min(p1[0], p2[0])) {
                var pf = (i == 0) ? points[len - 1] : points[i - 1];//pi-1
                var pn = ((len - i - 1) < 2) ? points[1 - (len - i - 1)] : points[i + 2];//pi+2
                if ((pf[1] > pt.y) == (pn[1] > pt.y)) {
                    continue;
                } else {
                    ct++;
                    continue;
                }
            }
    
            //水平向右射线与顶点相交
            if (pt.y == p1[1] || pt.y == p2[1]) {
                var pf = (i == 0) ? points[len - 1] : points[i - 1];//pi-1
                var pn = ((len - 1 - i) < 1) ? points[0] : points[i + 1];//pi+1
                if ((pf[1] > pt.y) == (pn[1] > pt.y)) {
                    continue;
                } else {
                    ct++;
                    continue;
                }
            }
    
            //非特殊情况
            var x = (pt.y - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
            if (x > pt.x)
                ct++; //如果交点在右边，统计加一。
        }
    
        if (ct % 2 == 1) {
            return false; //如果是奇数，说明在多边形里
        }
        else {
            return true; //否则在多边形外 或 边上
        }
    };
    /**
     * @description 计算多边形旋转、平移后新的坐标点
     * @param {Array}polygon [[1,2],[2,9],...]多边形位置坐标点
     * @param {Json}f 人物 {x:?,y:?}
     * @param {Json}look 人物朝向 {x:?,y:?}
     * @param {Number}r 多边形中心点到fighter之间的距离
     * @return {Array} 新的polygon坐标点
     */
    static polygonTransform(polygon, f, look, r) {
        //计算新的坐标原点
        var //f={x:45,y:5},look={x:-98,y:99},
            //r,
            _pl=[],
            fl_d_x = look.x-f.x,
            fl_d_y = look.y-f.y,
            fl = this.getPPDistance(f,look).d,
            //新原点坐标
            // dx = (r/fl)*fl_d_x+f.x,
            // dy = (r/fl)*fl_d_y+f.y,
            dx = fl_d_x*(fl+r)/fl+f.x,
            dy = fl_d_y*(fl+r)/fl+f.y,
            //斜率
            k = fl_d_y/fl_d_x,
            //通过斜率得到自身与朝向两点直线与x轴之间的夹角
            //该夹角则为多边形旋转的角度
            a = Math.PI/2-Math.abs(Math.atan(k));
        //顺时针旋转为正
        a = -(k/Math.abs(k))*a;
        for(var i=0,leng = polygon.length;i<leng;i++){
            var __p = polygon[i],
                _r = [];
            //通过极坐标运算得到新的旋转坐标
            //以及多边形平移的坐标，最终得到多边形各顶点新的坐标
            _r[0] = __p[0]*Math.cos(a)-__p[1]*Math.sin(a)+dx;
            _r[1] = __p[1]*Math.cos(a)+__p[0]*Math.sin(a)+dy;
            _pl[i] = _r;
        }
        return _pl;
    };
    //获取两点之间的距离
    static getPPDistance(p1, p2) {
        var xx = p1.x - p2.x, yy = p1.y - p2.y;
        var _d1 = (xx * xx + yy * yy)*1000000;
        var _d = Math.sqrt(_d1/1000000);
        return { xx: xx, yy: yy, d: _d };
    };
    // 选择战斗者
    static select(arr, conds, result){
        var i, result = result || [];
        for (i = arr.length - 1; i >= 0; i--) {
            if (this.condsCheck(arr[i], conds))
                result.push(arr[i]);
        }
        return result;
    };
    // 选择战斗者, 如果sortKey为undefined, ascending为随机种子, oldTarget上一次选定的目标
    static limit(arr, n, sortKey, ascending,oldTarget){
        var i,len;
        if (arr.length <= n)
            return arr;
        if (!sortKey) {
            for (i = arr.length - 1; i >= 0; i--) {
                arr[i].rand = ascending;
                ascending = this.randNumber(ascending);
            }
            sortKey = 'rand';
        }
        arr.sort(ascending ? function (a, b) {
            //  return a[sortKey] < b[sortKey];
            return b[sortKey] - a[sortKey];
        } : function (a, b) {
            //  return a[sortKey] > b[sortKey];
            return a[sortKey] - b[sortKey];
        });
        //把自己换到第一个位置
        if(oldTarget){
            for(i=0,len=arr.length;i<len;i++){
                if(arr[i].mapId == oldTarget){
                    if(i!==0){
                        var o = arr[0];
                        arr[0] = arr[i];
                        arr[i] = o;
                    }
                    break;
                }
            }
        }
        arr.length = n;
        return ascending;
    };
    // 选择周围的人，如果排序则按距离近远  without 选不选自己
    static round(arr, f, distance, sort, without){
        var dd = distance * distance * 10000, n = arr.length - 1, i, e, dist;
        for (i = n; i >= 0; i--) {
            e = arr[i];
            if (e === f) {
                if (without)
                    arr[i] = arr[n--];
                else
                    f.rand = 0;
                continue;
            }
            dist = ((f.x - e.x) * (f.x - e.x) * 10000 + (f.y - e.y) * (f.y - e.y) * 10000) | 0;
    
            if (dist > dd) {
                arr[i] = arr[n--];
                continue;
            }
            e.rand = dist / 10000;
        }
        arr.length = n + 1;
        if (sort){
            arr.sort(function (a, b) {
                return a['rand'] - b['rand'];
            });
        }
    };
    // 复制
    static copy(o){
        var deepClone = (obj) => {
            var t = typeof obj,
                newObj;
            if(obj === null || t !== "object")
                return obj;
            newObj= obj instanceof Array?[]:{};
            for(var i in obj){
                newObj[i] = deepClone(obj[i]);    
            }
            return newObj;
        }
        return deepClone(o);
    }
    // 获得敌人的阵营
    static enemy(camp){
        return camp === 1 ? 2 : 1;
    }
    // 从后往前遍历数组， 返回true表示移除该元素， 返回false表示停止遍历
    static traversal(arr, func){
        // TODO 用链表实现，可以更简单的处理删除、添加的问题
        if (!arr) return;
        var n = arr.length, delIndex = -1, i, el, r;
        for (i = n - 1; i >= 0; i--) {
            el = arr[i];
            if (el) {
                try {
                    r = func(el);
                } catch (ex) {
                    if (console) {
                        console.log("traversal, ex: ", ex, ", el:", el);
                    }
                }
                if (r === false)
                    break;
                if (r === true) {
                    arr[i] = undefined;
                    delIndex = i;
                }
            } else {
                delIndex = i;
            }
        }
        if (delIndex >= 0) {
            for (i = delIndex + 1; i < n; ++i) {
                el = arr[i];
                if (el)
                    arr[delIndex++] = el;
            }
            arr.length = delIndex;
        }
    }
    // 使用盾，返回剩下的伤害
    static useShield(shield, damage){
        var i, e;
        //需要找到scene
        // var scene = app.mod.fight.sceneTab.fight;
        if (shield.length === 0)
            return damage;
        for (i in shield) {
            if (i !== 'length' && shield.hasOwnProperty(i)) {
                e = shield[i];
                if (e > 0) {
                    if (damage < e) {
                        shield[i] -= damage;
                        return 0;
                    }
                    damage -= e;
                }
                delete shield[i];
                shield.length--;
            }
        }
        return damage;
    };
    // 移除用对象方式模拟的数组中的指定位置的元素
    static removeOArray(oarr, i) {
        delete oarr[i];
        oarr.length--;
    };
    // 乱序
    static shuffle(arr, rand) {
        var len = arr.length, i, idx, temp;
        for (i = len - 1; i > 0; i--) {
            idx = rand.randomInt(0, i); // 闭区间
            temp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = temp;
        }
        return arr;
    };
    // 查找指定键值对应元素的位置
    static indexByAttr(arr, key, value) {
        var i;
        for (i = arr.length - 1; i >= 0 && arr[i][key] !== value; i--);
        return i;
    };
    // 分析字符串是否为数字
    static parseNumber(s) {
        return /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/.test(s) ? parseFloat(s) : false;
    };
    // 获得效果的值，可能是直接的数字，也可能是公式计算的值
    static getEffectValue(s, fighter, buff) {
        var r = this.parseNumber(s);
        if (r !== false)
            return r;
        return Fight_formula.effectCalc(s, fighter, fighter, buff);
    };
    // 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
    static getBuffEffectValue(s, F, T, buff, scene) {
        var r = this.parseNumber(s), F = scene.mapList[F], T = scene.mapList[T];
        if (r !== false)
            return r;
        return Fight_formula.effectCalc(s, F, T, buff);
    };
    //根据队伍索引取得队伍成员
    static selectGroup(scene, f, targetType) {
        var curTarget = scene.mapList[f.curTarget],
            enemyList = [];
        //打敌人
        if (targetType > 10) {
            //如果是针对敌方，没有目标 返回空数组
            if (!curTarget) return [];
            //如果是针对仇恨最高的敌方， 返回目标
            if (targetType == 11) {
                if ((f.groupId != curTarget.groupId) && curTarget.groupId >= 0) {
                    return [curTarget];
                } else {
                    return [];
                }
            };
            //如果是有条件筛选的技能，返回所有敌人列表
            enemyList = this.groupFighters(f, scene);
            //返回成fighters
            return this.mapFighter(enemyList, scene);
        }
        //己方
        return this.mapFighter(scene.group[f.groupId], scene);
    }
    //根据mapID取得fighter
    static mapFighter(mapIds, scene) {
        var arr = [];
        for (var i = 0; i < mapIds.length; i++) {
            if (scene.mapList[mapIds[i]] && scene.mapList[mapIds[i]].hp > 0) {
                arr.push(scene.mapList[mapIds[i]]);
            }
        }
        return arr
    }
    //取得fighters的mapId
    static getMapId(fighters, scene) {
        var arr = [];
        for (var i = 0; i < fighters.length; i++) {
            if (scene.mapList[fighters[i].mapId]) {
                arr.push(fighters[i].mapId);
            }
        }
        return arr
    }
    // 随机圆内坐标
    static randomCirclePos(r, a, b) {
        while (true) {
            var x = Math.random() * 2 * r + (a - r),
                y = Math.random() * 2 * r + (b - r);
            if ((x - a) * (x - a) + (y - b) * (y - b) <= r * r) {
                return [x, y]
            }
        }
    }
    
    //选择某个玩家的队员
    static groupFighters(f, scene) {
        var i = f.groupId;
        var arr = [];
        for (var e in scene.group) {
            if (parseInt(e) >= 0 && e != i) {
                arr = arr.concat(scene.group[e]);
            }
        }
        //mapId
        return arr;
    }

    //条件变量
    static condValue(f, cond) {
        var i, n;
        if (typeof cond === typeof "") {
            return f[cond];
        }
        for (i = 0, n = cond.length; i < n; i++) {
            f = f[cond];
            if (f === undefined)
                return undefined;
        }
        return f;
    };
    // 条件判断表
    static condMap = {
        '>': function (a, b) {
            return a > b;
        },
        '>=': function (a, b) {
            return a >= b;
        },
        '<': function (a, b) {
            return a < b;
        },
        '=<': function (a, b) {
            return a <= b;
        },
        '!=': function (a, b) {
            return a !== b
        }
    };
    // 条件判断
    static condsCheck (f, conds) {
        var i, c;
        for (i = conds.length - 1; i >= 0; i--) {
            c = conds[i];
            if (c.length == 2) {
                if (this.condValue(f, c[0]) !== c[1])
                    return false;
            } else if (!this.condMap[c[1]](this.condValue(f, c[0]), c[2])) {
                return false;
            }
        }
        return true;
    };
    // 倍增同余算法
    static randNumber(seed) {
        var MAX_POSITIVE_INT32 = 2147483647;
        var RAND_A = 16807;
        var RAND_Q = 127773;
        var RAND_MASK = 123459876;
        // 防止种子为0
        var r = seed ^ RAND_MASK;
        // C语言的写法，可防止溢出
        seed = RAND_A * r - ((r / RAND_Q) | 0) * MAX_POSITIVE_INT32;
        return seed < 0 ? seed + MAX_POSITIVE_INT32 : seed;
    };
}

 // ================================ 本地

 