/**
 * 战斗公式
 */
// =================================== 导入
//mod
import { Util } from "./util";
import { data  as localDB, updata} from "./db";

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
        key = key.replace(".config","");
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
     * @param scene 绑定随机数
     * @param num 获取个数
     * @param condition 满足条件 [["hp",">",0],["camp",1],["or",["type",1],...]]
     * @param deleteCon 排除的条件[["hp",">",0],["camp",1],["or",["type",1],...]]
     * @param type:  掉落类型
     * @param isFight 是否在战斗中 默认为否
     */
    static select({paths,num,scene,condition,deleteCon,type,isFight}:{paths: Array<string>,num: number,scene: any,condition:Array<any>,deleteCon?:Array<any>,type?: string,isFight?}):Array<any>{
        let d = Date.now();
        let r = [],i,t,e,
        arr = [],
        conditionArr = [],//附加条件
        len,
        player = localDB.player,
        bag = localDB.bag;
        if(type == "card" && !isFight){
            let t = [];
            localDB.unlock_cards.forEach(id=>{
                t.push(`${id}1`);
                t.push(`${id}2`);
            })
            // ;
            for(let j=0,lent = t.length;j<lent;j++){
                
                for(i = 0,len = paths.length;i<len;i++){
                    e = this.getOne(paths[i],t[j]);
                    // 
                    if(!e){
                        continue;
                    }
                    // 
                    if(Util.condsCheck(e,condition) && (!deleteCon || !Util.condsCheck(e,deleteCon))){
                        arr.push(t[j]);
                    }
                };
                // 
            }
        }else{
            for(i = 0,len = paths.length;i<len;i++){
                let t = this.table[paths[i]];
                if(type == "equipment") conditionArr = [].concat((player.weapon || [],player.armor || [], player.other_equipments || [], bag.equipment || []))
                for(let key in t){
                    e = this.getOne(paths[i],key);
                    if(Util.condsCheck(e,condition) && (!deleteCon || !Util.condsCheck(e,deleteCon)) && conditionArr.indexOf(key) == -1){
                        arr.push(key);
                    }
                };
            }
        }
        if(scene){
            scene.seed = Util.randomSort(arr,scene.seed);
        }else{
            updata("player.seed",Util.randomSort(arr,localDB.player.seed));
        }
        
        // ;
        r = r.concat(arr.slice(0,num));
        ;
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
    /**
     * @description 检查配置条件是否满足
     */
    static checkConditionArr(path: string,cfg: {},condition: []): boolean{
        let ks = this.keys[path],
            idx;
        for(let k in condition){
            idx = ks.indexOf(condition[k][0]);
            if(cfg[idx] != condition[k][1]){
                return false;
            }
        }
        return true;
    }
}

// ================================= 本地
