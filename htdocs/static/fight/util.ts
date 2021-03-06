 /**
  * 战斗工具代码
  */
// ==================================== 导入
import { FScene } from "./scene"

// ==================================== 导出
export class Util{
    /**
     * @description 按某字段排序
     * @param arr 需要排序的对象列表
     * @param key 用来排序的字段
     * @param downup 升序（1）还是降序（-1）
     */
    static limitSort(arr: Array<any>, key: string, downup: number){
        arr.sort((a,b)=>{
            return (a-b)*downup;
        });
    }
    /**
     * @description 随机排序,只适合对象排序，其他基础类型排序不实用
     */
    static randomSort(arr: Array<any>): void{
        let seed = this.randNumber(0);
        for(let i = 0,len = arr.length;i<len;i++){
            arr[i].__rand = seed;
            seed = this.randNumber(seed);
        }
        arr.sort((seed / 2147483647)>.5?(a,b)=>{
            return a.__rand - b.__rand;
        }:(a,b)=>{
            return b.__rand - a.__rand;
        })
    }
    /**
     * 在列表中获取指定字段的对象
     * @param list json对象数组
     * @param arr key-value组成的数组 [key1, value1, key2, value2]
     */
    static getObjByAttr(list: Array<{}>,arr: Array<any>):{}{
        for(let i =0,len = list.length;i<len;i++){
            if(this.checkObjHasValue(list[i],arr)){
                return list[i];
            }
        }
        return null;
    }
    /**
     * 检查对象是否还有某些特定的字段且值满足需求
     * @param obj {}
     * @param arr [key1, value1, key2, value2]
     */
    static checkObjHasValue(obj:{},arr:Array<any>):boolean{
        for(let j = 0,leng = arr.length;j<leng;j+=2){
            if(obj[arr[j]] !== arr[j+1]){
                return false;
            }
        }
        return true;
    }
    // 检查概率是否通过
    static checkProbability = function (probability: number,s: FScene) {
        if (probability < 1) {
            var r = s.seed;
            s.seed = this.randNumber(r);
            if (probability < r / 2147483647)
                return false;
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
     * @description 从后往前遍历数组， 返回true表示移除该元素， 返回false表示停止遍历
     */
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
    /**
     * @description 条件变量
     */
    static condValue(obj:{}, cond:any): {}{
        var i, n;
        if (typeof cond === typeof "") {
            return obj[cond];
        }
        for (i = 0, n = cond.length; i < n; i++) {
            obj = obj[cond];
            if (obj === undefined)
                return;
        }
        return obj;
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
     * @description 判断对象是否满足条件conds
     * @param obj 需要判断的对象
     * @param conds 条件列表 [["hp",">",0],["camp",1]]
     */
    static condsCheck (obj:{}, conds:Array<any>): boolean{
        var i,j, c, 
            and = (_c):boolean => {
                if (_c.length == 2) {
                    return this.condValue(obj, _c[0]) === _c[1];
                } else{
                    return this.condMap[_c[1]](this.condValue(obj, _c[0]), _c[2]);
                }
            },
            or = (_c):boolean => {
                for(j = _c.length - 1; j > 0; j--){
                    if(and(_c[j])){
                        return true;
                    }
                } 
                return false;
            };
        for (i = conds.length - 1; i >= 0; i--) {
            c = conds[i];
            if(c[0]=="or"){
                if(!or(c)){
                    return false;
                }
            }else if(!and(c)){
                return false
            }
        }
        return true;
    }
    // 查找指定键值对应元素的位置
    static indexByAttr(arr, key, value) {
        var i;
        for (i = arr.length - 1; i >= 0; i--){
            if(arr[i] && arr[i][key] === value){
                break;
            }
        };
        return i;
    }
    /**
     * @description 深度克隆对象
     * @param o 
     */
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
    // 分析字符串是否为数字
    static parseNumber(s) {
        return /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/.test(s) ? parseFloat(s) : false;
    }
    /**
     * @description 函数调用
     * @example
     */
    static call(func: Function, args: any[]){
        if (Array.isArray(args)) {
            switch (args.length) {
                case 0:
                    return func();
                case 1:
                    return func(args[0]);
                case 2:
                    return func(args[0], args[1]);
                case 3:
                    return func(args[0], args[1], args[2]);
                case 4:
                    return func(args[0], args[1], args[2], args[3]);
                case 5:
                    return func(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                    return func(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                    return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                case 8:
                    return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
                default:
                    func.apply(undefined, args);
            }
        } else {
            return func(args);
        }
    };
}