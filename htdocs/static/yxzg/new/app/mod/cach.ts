/**
 * 用于管理我们需要缓存的任何数据类型
 * 使用场景，如：
 *     为了避免反复创建场景渲染模型，在同一场景下建立缓冲列表
 *     每次创建先去缓冲列表中寻找，有就直接显示，没有才会创建
 */
// ========================================= 导入
//pi
// ========================================= 导出
export class Cach{
    /**
     * @description 每个Cach实例的缓存列表,二维表
     * 一维是key-value组成的Map
     * 二维是单个缓存对象组成的数组value
     */
    public list:Map<any,any> = new Map();
    /**
     * @description key作为键，每个键对应一个缓存数组，每次添加直接放入该数组队尾
     * @param key 添加到key对应的缓存数组
     * @param obj 需要缓存的对象
     */
    public add(key: any, obj: any){
        const c = this.list.get(key);
        if(c){
            c.push(obj);
        }else{
            this.list.set(key,[obj]);
        }
    };
    /**
     * @description 每次都从队尾取，有助于清除队首长期没用的缓存
     * @param key add缓存时使用的key 
     */
    public one(key){
        const c = this.list.get(key);
        if(c && c.length)
            return c.pop();
    };
    /**
     * @description 清空所有缓存
     */
    public clear(){
        this.list.clear();
    }
}
// ======================================== 本地
// ======================================== 立即执行