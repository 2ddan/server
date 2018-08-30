/**
 * 解析战斗推送事件
 */
/**
 * @description 枚举事件类型
 */
export enum EType{
    insert             = "a", // fighter进入场景
    singleRound        = "b", // 单回合开始，某个fighter出手
    endSingleRound     = "c", // fighter结束自己的单回合
    useCard            = "d", // 使用卡牌
    endRound           = "e", // 大回合结束
    takeCards          = "f", // 抽卡
    cardsMove          = "g", // 移动卡牌，把某个牌堆的牌移动到另外一个牌堆
    releaseCard        = "h", // 释放卡牌
    restAttr           = "i", // 重置属性
    damage             = "j", // 技能或卡牌造成的伤害
    effect             = "k", // buff效果
    clearBuff          = "l", // 清除buff效果
    addBuff            = "m", // 添加buff
    updateBuff         = "n", // 更新buff属性
    selectCard         = "o", // 玩家手动选卡
    copyCard           = "p", // 复制卡牌,把某个牌堆的牌复制到另外一个牌堆
    remove             = "q", // 移除玩家
    over               = "r",

    refreshEquipStar   = "s",
    refreshWeapon      = "t",
    revive             = "u"
}
/**
 * @description 推送事件映射表
 */
export const eventsKeys = {
    insert             : ["type","fighter"],
    singleRound        : ["type","fighter"],
    endSingleRound     : ["type","fighter","scrap","expend"],
    useCard            : ["type","fighter","index","target"],
    endRound           : ["type"],
    takeCards          : ["type","fighter","cards_add"],
    cardsMove          : ["type","fighter","from","to","cards"],
    releaseCard        : ["type","fighter","target","card","buff"],
    restAttr           : ["type","fighter","attrs"],
    damage             : ["type","fighter","target","r"],
    effect             : ["type","class","fighter","target","buff","effect","value"],
    clearBuff          : ["type","class","fighter","effect","value"],
    addBuff            : ["type","class","fighter","target","buff"],
    updateBuff         : ["type","class","fighter","buff","key","value"],
    selectCard         : ["type","fighter","buff","key","value"],
    copyCard           : ["type","fighter","from","to","value"],
    remove             : ["type","fighter"],
    over               : ["type","result"],


    refreshAttr        : ["type","fighter","attr"],
    refreshEnsoulClass : ["type","fighter","attr"],
    refreshEquipStar   : ["type","fighter","attr"],
    refreshWeapon      : ["type","fighter","attr"],

    refreshPet         : ["type","pet","fighter"],
    refreshClothes     : ["type","clothes","fighter"],
    refreshSkill       : ["type","skill","fighter"],
    task               : ["type", "fighter","killNum"],

    revive             : ["type","fighter"]
}
/**
 * @description 混合后台事件(单个)，转换为{key,value}
 */
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
 * @description 混合后台事件(列表)，转换为{key,value}
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