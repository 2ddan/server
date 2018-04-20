/**
 * 解析后台推送事件
 */
/**
 * @description 枚举事件类型
 */
export enum EType{
    insert      = "insert", 
    remove      = "remove", 
    moveto      = "moveto", 
    useSkill    = "useSkill",
    spreadSkill = "spreadSkill", 
    addBuff     = "addBuff", 
    clearBuff   = "clearBuff", 
    effect      = "effect", 
    addGroup    = "addGroup", 
    removeGroup = "removeGroup"
}
/**
 * @description 推送事件映射表
 */
export const eventsKeys = {
    insert  : ["type","fighter"],
    addGroup: ["type","mapId","groupId"],
    spreadSkill: ["type","mapId","target","skill_id"]
}
/**
 * @description 混合后台事件，转换为{key,value}
 */
export const blend = (evs:any[]) => {
    let t = evs[0],
        ks = eventsKeys[t],
        r = {};
    for(let i = 0,len = ks.length;i<len;i++){
        r[ks[i]] = evs[i];
    }
    return r;
}