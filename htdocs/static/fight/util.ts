 /**
  * 战斗工具代码
  */
// ==================================== 导入
import { FScene } from "./scene"

// ==================================== 导出
export class Util{
    /**
     * @description 随机排序,只适合对象排序，基础类型排序不实用
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
    //在列表中获取指定字段的对象
    /**
     * 
     * @param list json对象数组
     * @param arr key-value组成的数组 [key1, value1, key2, value2]
     */
    static getObjByParam(list: Array<{}>,arr: Array<any>):{}{
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
}