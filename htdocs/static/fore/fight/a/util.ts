/**
 * 战斗决策
 */
 // ================================ 导入
//pi
import { Vector3 } from "pi/math/vector3";
import { NavMesh } from "pi/ecs/navmesh";
//fight
import { Fight_formula } from "./common/fight_formula";
import { Result, Skill, Fighter, Pos } from "./class"
import { Scene } from "./fight";

 // ================================ 导出
export class Util{
    
    /**
     * @description 判断fighter当前是否可活动状态
     */
    static checkFighterActive(f: Fighter,s: Scene): string{
        //死亡
        if (f.hp <= 0 && f.max_hpCount > 0) {
            return "The fighter was died!!";
        }
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
                at += this.getFighterSkill(f,s.backSkill[j]).actionTime;
            }
        }
        return at;
    }
    /**
     * @description 选择可释放技能
     */
    static selectSkill(f: Fighter, s: Scene): Skill {
        var r,
            c = f.curSkill,
            func = (ss)=>{
                if(ss.priority == 0)
                    return
                if (f.actionTime > s.now ||  ss.cdNextTime > s.now || (f.publicCDNextTime  > s.now && !ss.hand) || ss.energyCost > f.energy){
                    return;
                }
                if (c && c.priority >= ss.priority)
                    return;
                    c = ss;
            };
        
        for (var i = 0, len = f.skill.length; i < len; i++) {
            var ss = f.skill[i];
            // 非手动技能，则选择参与筛选
            if (!ss.hand)
                func(ss);
        }
        return c;
    }
    /**
     * @description 判断是否相同坐标点
     */
    static samePos(src: Fighter,target: Fighter): boolean{
        return src && target && src.x === target.x && src.y === target.y;
    }
    /**
     * @description 获取移动路径
     * @param nm 寻路实例
     * @param start 起点
     * @param end 起点
     * @param box 包围盒半径
     */
    static getMovePath(nm: NavMesh,start: Vector3,end: Vector3,box: number): Array<Vector3>{
        if(!nm)
            return [{x:end.x,y:0,z:end.y}];
        start = new Vector3(start.x,0,start.y);
        end = new Vector3(end.x,0,end.y);
        box = box || 0;
        let r = nm.findPath(start,end,box);
        r.shift();
        return r;
    }
    /**
     * @description 选择最小数
     */
    static getMinNumber(a:number,b:number):number{
        if(a && b){
            return Math.min(a,b);
        }
        return a || b;
    }
    /**
     * @description 获得敌人的阵营
     * @param camp 自己的阵营
     */
    static enemy(camp: number): number{
        return camp === 1 ? 2 : 1;
    }
    /**
     * @description 选择战斗者
     * @param arr fighter列表
     * @param conds 需要满足的条件列表
     */
    static select(arr: Map<number,Fighter>, conds: any[]): Array<Fighter>{
        var i, result = [];
        arr.forEach((v,k)=>{
            if (this.condsCheck(v, conds))
                result.push(v);
        })
        return result;
    }
    /**
     * @description 技能选择目标
     * @param f 
     * @param s 
     * @param scene 
     */
    static selectTarget(f: Fighter, s: Skill, scene: Scene): number{
        var r, camp = f.camp, con = f.targetConds || [], round = this.getMinNumber(f.round,s.targetLength) || Number.MAX_SAFE_INTEGER, t;
        // 1自己
        if (s.targetType <= 1)
            return f.mapId;
        // 己方或敌方
        if (s.targetType > 10) {
            camp = Util.enemy(camp);
        }
        r = this.select(scene.fighters, con.concat([['camp', camp], ['hp', '>', 0]]));
        this.round(r, f, round, true);
        return this.getCurTarget(r, f);
    }
    static skillTarget(f, s, scene: Scene) {
        var r, t = s.targetType, camp = f.camp, without = false;
        // 1自己
        if (s.targetType <= 1)
            return [f];
        if (t > 10) {
            t -= 10;
            camp = this.enemy(camp);
            without = true;
        }

        r = this.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
         //最近的应该要排序 
        if(s.distance>0){
            this.round(r, f, s.distance, without);
        }
        // 2全体己方或敌人
        if (t === 2) {
            return r;
        }
        // 3血最少的x个己方或敌人
        if (t === 3) {
            //true 从大到小排列 false相反
            this.limit(r, s.targetAIParam, 'hp', false);
            return r;
        }
        // 4最近的x个队友或敌人
        if (t === 4) {
            if (r.length > s.targetAIParam)
                r.length = s.targetAIParam;
            return r;
        }
        // 5技能施放距离内随机的x个己方（参数为0表示全部）
        if (t === 5) {
            if (s.targetAIParam)
                scene.seed = this.limit(r, s.targetAIParam, undefined, scene.seed);
            return r;
        }
        //这里要排序 应该从近到远
        this.round(r, f, s.distance > 0 ? s.distance : Number.MAX_SAFE_INTEGER, true);
        //11 对于仇恨最高的敌人释放
        if(t == 11){
            scene.seed = this.limit(r, 1, 'taunt', scene.seed, f.curTarget);
        }
        // 15以自己为圆心，周围的x个敌人（x个的参数配置0时，代表全部的）
        if(t == 15){
            if (s.targetAIParam)
                scene.seed = this.limit(r, s.targetAIParam, undefined, scene.seed, f.curTarget);
        }
        return r;
    }
    /**
     * @description 根据技能的作用范围，扩大选择目标
     * @param targets 目标列表
     * @param targetType 目标类型
     * @param distance 技能释放距离
     * @param camp 自己阵营
     * @param scene 
     */
    static rangeTargets(targets: Array<Fighter>, targetType: number, distance: number, camp: number,scene: Scene):Array<Fighter> {
        var arr, n, i, j, e, f, dd = distance * distance, len = targets.length - 1, camp = targetType > 10 ? this.enemy(camp) : camp, dist;
        arr = this.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
        n = arr.length - 1;
        for (i = n; i >= 0; i--) {
            e = arr[i];
            for (j = len; j >= 0; j--) {
                f = targets[j];
                if (e === targets[j])
                    break;
                dist = (f.x - e.x) * (f.x - e.x) + (f.y - e.y) * (f.y - e.y);
                if (dist < dd)
                    break;
            }
            if (j < 0)
                arr[i] = arr[n--];
        }
        arr.length = n + 1;
        return arr;
    }
    /**
     * @description 矩形技能范围
     */
    static polygonTargets(targets: Array<Fighter>,targetType: number, rang: Array<number>,camp: number, f: Fighter, scene: Scene):Array<Fighter>{
        var _x = rang[0]/2,_y = rang[1]/2,rp = [[-_x,_y],[_x,_y],[_x,-_y],[-_x,-_y]],
            _newRp = this.polygonTransform(rp,f,scene.fighters.get(f.curTarget),_y),
            len = targets.length - 1,
            i, j, e,
            arr,
            n;
            camp = targetType > 10 ? this.enemy(camp) : camp;
            arr = this.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
            n = arr.length - 1;
        for (i = n; i >= 0; i--) {
            e = arr[i];
            for (j = len; j >= 0; j--) {
                if (e === targets[j])
                    break;
                if (!this.isOutPolygon(e,_newRp))
                    break;
            }
            if (j < 0)
                arr[i] = arr[n--];
        }
        arr.length = n + 1;
        return arr;
    }
    /**
     * @description 获取当前主目标，可额外绑定选择条件
     * @param r 
     * @param f 
     */
    static getCurTarget(r, f){
        var t;
        for(var i =0,len = r.length;i<len;i++){
            if(r[i].mapId == f.curTarget) return f.curTarget;
        }
        return (r.length > 0) ? r[0].mapId:null;
    }
    // 获得效果的值，可能是直接的数字，也可能是公式计算的值
    static getEffectValue(s, fighter, buff){
        var r = this.parseNumber(s);
        if (r !== false)
            return r;
        return Fight_formula.effectCalc(s, fighter, fighter, buff);
    };
    /**
     * @description 选择周围的人，如果排序则按距离近远  without 选不选自己
     * @param arr 目标
     * @param f 自己
     * @param distance 距离自己的范围
     * @param sort 按距离近远排序
     * @param without 选不选自己
     */
    static round(arr: Array<Fighter>, f: Fighter, distance: number, sort: boolean, without?: boolean): void{
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
    }
    /**
     * @description 条件变量
     */
    static condValue(f: Fighter, cond:any): Fighter{
        var i, n;
        if (typeof cond === typeof "") {
            return f[cond];
        }
        for (i = 0, n = cond.length; i < n; i++) {
            f = f[cond];
            if (f === undefined)
                return;
        }
        return f;
    }
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
    }
    /**
     * @description 判断f是否满足条件conds
     * @param f 需要判断的fighter
     * @param conds 条件列表
     */
    static condsCheck (f: Fighter, conds:Array<any>): boolean{
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
    }
    /**
     * @description 倍增同余算法
     * @param seed 
     */
    static randNumber(seed:number):number {
        var MAX_POSITIVE_INT32 = 2147483647;
        var RAND_A = 16807;
        var RAND_Q = 127773;
        var RAND_MASK = 123459876;
        // 防止种子为0
        var r = seed ^ RAND_MASK;
        // C语言的写法，可防止溢出
        seed = RAND_A * r - ((r / RAND_Q) | 0) * MAX_POSITIVE_INT32;
        return seed < 0 ? seed + MAX_POSITIVE_INT32 : seed;
    }
    /**
     * @description 获取两点之间的距离
     */
    static getPPDistance(p1, p2):any {
        var xx = p1.x - p2.x, yy = p1.y - p2.y;
        var _d1 = (xx * xx + yy * yy)*1000000;
        var _d = Math.sqrt(_d1/1000000);
        return { xx: xx, yy: yy, d: _d };
    }
    /**
     * @description 获取最终目标点
     */
    static getFinalPos(f: Fighter,d: number):void{
        let path = f.path,
            pop = path.pop(),
            last = path[path.length-1] || {x:f.x,y:0,z:f.y},
            pos:any = new Vector3(),
            r = Math.random()*0.5+0.5,
            dis = this.getPPDistance({x:last.x,y:last.z},{x:pop.x,y:pop.z});
        if(dis.d<=d){
            return;
        }
        r = r * d;
        r = 1-r/dis.d;
        pos.x = last.x+(pop.x-last.x)*r;
        pos.z = last.z+(pop.z-last.z)*r;
        path.push(pos);
    }
    /**
     * @description 计算以t为中心的九宫格坐标中离f最近的点
     * @param dimension 坐标维度（以目标点为中心）____ 【一维】
     *                                         |_|_|
     *                                         |_|_|    
     * @param rang 距离范围
     */                                        
    static getNearPos(dimension: number,rang: number,f: Fighter,t: Fighter): any{
        let c = dimension,
            r = {p:{x:t.x,y:t.y},d:99999},
            cacl = (x,y) => {
                let d1 = this.getPPDistance({x:0,y:0},{x:x,y:y}),
                    d2;
                if(d1.d>rang){
                    return;
                }
                x += t.x;
                y += t.y
                d2 = this.getPPDistance(f,{x:x,y:y});
                if(d2.d <= r.d){
                    r.p.x = x;
                    r.p.y = y;
                    r.d = d2.d;
                }
            },
            func = (n) => {
                for(var j=0;j<n*2+.5;j++){
                    var a = n,
                        b = n-j,
                        c = -n+j;
                        cacl(-a,c);
                    if(-a != c){
                        cacl(c,-a);
                    }
                    if(a!==c && b !== -a)cacl(a,b);
                    if(a != b && b !== -a && a !== c){
                        cacl(b,a);
                    }
                }
            };
        while (c > 0){
            func(c--);
        }
        return {x:r.p.x,y:r.p.y};
    }
    /**
     * @description 计算多边形旋转、平移后新的坐标点
     * @param {Array}polygon [[1,2],[2,9],...]多边形位置坐标点
     * @param {Json}f 人物 {x:?,y:?}
     * @param {Json}look 人物朝向 {x:?,y:?}
     * @param {Number}r 多边形中心点到fighter之间的距离
     * @return {Array} 新的polygon坐标点
     */
    static polygonTransform(polygon: Array<any>, f:Fighter, look: Fighter, r: number): Array<any> {
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
    }
    /**
     * @description 判断某点pt是否在任意多边形points内部
     * @return {Boolean} true: 边外或边上; false: 内部
     */
    static isOutPolygon(pt: Pos, points: Array<Pos>):boolean {
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
    }
    /**
     * @description 目标继承
     * @param f 
     * @param s 
     * @param scene 
     */
    static inheritTargets(f: Fighter,t: Array<Fighter>,s: Skill,scene: Scene): Array<Fighter>{
        var type = s.hand == 2?"godPrevTargets":"prevTargets";
        if(s.FollowTarget && f[type]){
            t = this.mapFighters(f[type],scene);
        }
        if(s.backSkill){
            f[type] = this.getMapId(t,scene);
        }else{
            f[type] = null;
        }
        return t;
    }
    /**
     * @description 通过mapId查找fighter
     * @param mapIds 
     * @param scene 
     */
    static mapFighters(mapIds: Array<number>, scene: Scene){
        var arr = [];
        for (var i = 0; i < mapIds.length; i++) {
            let f = scene.fighters.get(mapIds[i]);
            if (f && f.hp > 0) {
                arr.push(f);
            }
        }
        return arr
    }
    /**
     * @description 取得fighters的mapId
     */
    static getMapId(fighters: Array<Fighter>, scene: Scene): Array<number> {
        var arr = [];
        for (var i = 0; i < fighters.length; i++) {
            if (scene.fighters.get(fighters[i].mapId)) {
                arr.push(fighters[i].mapId);
            }
        }
        return arr
    }
    /**
     * @description 选择战斗者, 如果sortKey为undefined, ascending为随机种子, oldTarget上一次选定的目标
     * @param arr 
     * @param n 
     * @param sortKey 
     * @param ascending 
     * @param oldTarget 
     */
    static limit(arr, n, sortKey, ascending, oldTarget?){
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
            return b[sortKey] - a[sortKey];
        } : function (a, b) {
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
    }
// 检查概率是否通过
    static checkProbability = function (probability: number,s: Scene) {
        if (probability < 1) {
            var r = s.seed;
            s.seed = this.randNumber(r);
            if (probability < r / 2147483647)
                return false;
        }
        return true;
    }
    // 查找指定键值对应元素的位置
    static indexByAttr(arr, key, value) {
        var i;
        for (i = arr.length - 1; i >= 0 && arr[i][key] !== value; i--);
        return i;
    }
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
    // 移除用对象方式模拟的数组中的指定位置的元素
    static removeOArray(oarr, i) {
        delete oarr[i];
        oarr.length--;
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
    }
    // 分析字符串是否为数字
    static parseNumber(s) {
        return /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/.test(s) ? parseFloat(s) : false;
    }
}

 // ================================ 本地

 