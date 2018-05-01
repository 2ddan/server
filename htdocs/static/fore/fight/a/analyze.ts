/**
 * 解析后台推送事件
 */
/**
 * @description 枚举事件类型
 */
export enum EType{
    insert      = "a", 
    remove      = "b", 
    moveto      = "c", 
    move        = "d",
    useSkill    = "e",
    spreadSkill = "f", 
    addBuff     = "g", 
    clearBuff   = "h", 
    effect      = "i", 
    addGroup    = "j", 
    removeGroup = "k",
    damage      = "l",
    refreshAttr = "m",
    refreshPet  = "n",
    refreshClothes = "o",
    refreshSkill = "p",
    task        = "q"
}
/**
 * @description 推送事件映射表
 */
export const eventsKeys = {
    insert     : ["type","fighter"],
    addGroup   : ["type","fighter","groupId"],
    useSkill   : ["type","fighter","skill","curTarget","pos"],
    spreadSkill: ["type","fighter","target","skill"],
    addBuff    : ["type","fighter","target","skill","buff"],
    clearBuff  : ["type","fighter","buff"],
    effect     : ["type","fighter","target","effect","value"],
    damage     : ["type","fighter","curTarget","target","r","skill"],//curTarget 是否为主目标
    remove     : ["type","fighter"],
    move       : ["type","fighter","moveto","moving"],
    moveto     : ["type","fighter","moveto"],

    refreshAttr: ["type","fighter","attr"],
    refreshPet : ["type","pet","fighter"],
    refreshClothes : ["type","clothes","fighter"],
    refreshSkill : ["type","skill","fighter"],
    task       : ["type", "fighter","killNum"]
}
export const blendOne = (evs):any => {
    let ot = evs[0],
        t = types[ot],
        ks = eventsKeys[t],
        r:any = {};
    evs[0] = t;
    for(let i = 0,len = ks.length;i<len;i++){
        r[ks[i]] = evs[i];
    }
    r["_"+ks[0]] = ot;
    return r;
}
/**
 * @description 混合后台事件，转换为{key,value}
 */
export const blend = (evsList:any[]) => {
    let arr = [];
    for(let k=0,l = evsList.length;k<l;k++){
        arr.push(blendOne(evsList[k]));
    }
    return arr;
}

/**
 * @description 获取真实type
 */
export const realType = (t) => {
    return types[t];
}

// ================================= 本地
const types = {};
for(let k in EType){
    types[EType[k]] = k;
}