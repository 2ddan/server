/**
 * 战斗公式
 */
// =================================== 导入
//pi
import { Util } from "app/mod/util";

// ===================================== 导出
export class Formula{
    /**
     * @description 公式列表
     */
    static table = {}
    /**
     * @description 添加公式
     * @param key 公式名字
     * @param func 公式函数
     */
    static set(key: any,func: Function):void{
        if(!isNaN(key) || this.table[key]){
            return;
        }
        this.table[key] = func;
    }
    /**
     * @description 调用公式计算
     * @param key 公式名
     * @param params 公式所用参数
     */
    static cacl(key: any,params: Array<any>): any{
        if(!isNaN(key)){
            return parseInt(key);
        }
        return Util.call(this.table[key],params);
    }
}

// ================================= 本地
