/**
 * 战斗公式
 */
// =================================== 导入
//mod
import { Util } from "./util";

// ===================================== 导出
export class CfgMgr{
    /**
     * @description 每张配置表对应的字段
     * @example {"cfg/buff":["id","name","probability","trigger_add","effect_type","effect_formula","trigger_excitation","condition","effectiv_target","target_param","excitation_expect_count","excitation_max_count","continue_round","continue_field","effective_life","cover_rule","effect_name","music","icon","des","remarks"]}
     */
    static keys = {}
    /**
     * @description 配置表
     */
    static table = {}
    /**
     * @description 配置表对应id组成的数组
     * @example {"cfg/buff":[100252,100352,...]}
     */
    static tableKeys = {}
    /**
     * @description 初始化
     */
    static init(cfg:{}): void{
        this.keys = cfg;
    }
    /**
     * @description 配置路径名字, like: "cfg/buff"
     * @param key 配置路径
     * @param cfg 配置json数据
     */
    static add(key: any,cfg: {}):void{
        key = key.replace(".cfg","");
        if(this.table[key]){
            return;
        }
        this.table[key] = cfg;
    }
    /**
     * @description 获取配置
     * @param key 配置路径
     */
    static get(key: any): any{
        return this.table[key];
    }
    /**
     * @description 获取某一条配置
     */
    static getOne(path:string,key:any):any{
        let r = {},
            keys = this.keys[path],
            e = this.table[path][key];
        if(!e || !keys){
            return e;
        }
        for(let i = 0,len = keys.length;i<len;i++){
            r[keys[i]] = Util.copy(e[i]);
        }
        return r;
    }
    /**
     * @description 随机获x个符合条件的配置
     * @param paths 配置路径列表，考虑到卡牌这种可能会多张表联合查询，所以采用数组形式
     * @param num 获取个数
     * @param condition 满足条件，key-value形式
     */
    static select(paths: Array<string>,num: number,condition:{}):Array<any>{
        let d = Date.now();
        let r = [],i,
        arr = [],
        len,
        c = 0,
        e;
        for(i = 0,len = paths.length;i<len;i++){
            let t = this.tableKeys[paths[i]];
            if(!t){
                t = this.getKeys(paths[i]);
            }
            arr = arr.concat(t);
        }
        Util.randomSort(arr,Util.randNumber(0));
        c = arr.length;
        while (r.length < num){
            i = Math.floor(c * Math.random());
            for(;i<c;i++){
                for(let j = 0,leng = paths.length;j<leng;j++){
                    e = this.table[paths[j]][arr[i]];
                    if(!e)continue;
                    if(this.checkCondition(paths[j],e,condition)){
                        r.push(arr[i]);
                    }
                    break;
                }
            }
        }
        console.log("selcet random cards cost time :: "+(Date.now()-d));
        return r;
    }
    /**
     * @description 创建实例
     */
    static create(paths: Array<string>,id: string,constructor: any): any{
        let e,p;
        for(let i = 0,len = paths.length;i<len;i++){
            e = this.getOne(paths[i],id)//this.table[paths[i]][id];
            if(e){
                p = paths[i];
                break;
            }
        }
        if(!e){
            return;
        }
        return new constructor(this.keys[p],e);
    }
    /**
     * @description 生成key组成的数组
     */
    static getKeys(path: string): Array<number>{
        let o = this.table[path],arr = [];
        for(let k in o){
            arr.push(k);
        }
        this.tableKeys[path] = arr;
        return arr;
    }
    /**
     * @description 检查配置条件是否满足
     */
    static checkCondition(path: string,cfg: {},condition: {}): boolean{
        let ks = this.keys[path],
            idx;
        for(let k in condition){
            idx = ks.indexOf(k);
            if(cfg[idx] != condition[k]){
                return false;
            }
        }
        return true;
    }
}

// ================================= 本地
