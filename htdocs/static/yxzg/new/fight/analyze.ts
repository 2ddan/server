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
    over               = "r", // 战斗结束
    resetCards         = "s", // 重置牌堆
    aiRoundEnd         = "t", // 某个ai回合计算结束，但没真正结束回合，需由外部调用回合结束接口
    addNewCards        = "u", // 添加新卡牌
    resetCardAttr      = "x",  // 重置卡牌属性
    autoTakeCard       = "y", //自动抽牌
    useScroll          = "z",  //使用卷轴
    action             = "v"  //动作段数
}
/**
 * @description 推送事件映射表
 */
export const eventsKeys = {
    insert             : ["type","fighter"],
    singleRound        : ["type","fighter"],
    endSingleRound     : ["type","fighter","scrap","expend"],
    useCard            : ["type","fighter","index","target","invalid"],
    endRound           : ["type"],
    takeCards          : ["type","fighter","cards_add"],
    cardsMove          : ["type","fighter","from","to","cards","to_index"],
    releaseCard        : ["type","fighter","target","card","events"],
    restAttr           : ["type","fighter","attrs"],
    damage             : ["type","fighter","target","r","target_block"],
    effect             : ["type","class","fighter","target","buff","effect","value"],
    clearBuff          : ["type","class","fighter","buff"],
    addBuff            : ["type","class","fighter","target","buff"],
    updateBuff         : ["type","class","fighter","buff"],
    /**
     * param []
     * 0,from 源牌堆，从哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆 0:配置表
     * 1,to 目标牌堆，放哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆
     * 2,from_random 抽取源牌堆是否随机
     * 3,to_select 是否由玩家自己选择(1:必须选择to_number的数量,2:最大选择to_number的数量),0直接进入目标牌堆，
     * 4,formula [["属性名","属性值"],["",">",""],...]判断牌是否满足条件的函数（抽取源牌堆时使用）
     * 5,from_number 源牌堆中可供选择牌的张数
     * 6,to_number 欲放到目标牌堆的数量
     * 7,id 直接取某个id的牌
    */
    selectCard         : ["type","fighter","param","cards"],
    copyCard           : ["type","fighter","from","to","cards","to_index"],
    remove             : ["type","fighter","runaway"],
    over               : ["type","result"],
    resetCards         : ["type","fighter","cards"],
    aiRoundEnd         : ["type","fighter"],
    addNewCards        : ["type","fighter","cards","from"],
    resetCardAttr      : ["type","fighter","results"], //results [[card_index,key1,value1,key2,value2,...],...]
    autoTakeCard       : ["type","fighter"],

    refreshEnsoulClass : ["type","fighter","attr"],
    refreshEquipStar   : ["type","fighter","attr"],
    refreshWeapon      : ["type","fighter","attr"],

    refreshPet         : ["type","pet","fighter"],
    refreshClothes     : ["type","clothes","fighter"],
    refreshSkill       : ["type","skill","fighter"],
    task               : ["type", "fighter","killNum"],

    revive             : ["type","fighter"],

    useScroll          : ["type","fighter","index","target"],

    action             : ["type","value","fighter"]
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
    evs[0] = ot;
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