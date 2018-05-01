/**
 * 战斗中用到的对象
 */

 // ================================ 导入
 import { Policy } from "./policy"

 // ================================ 导出

 export class Fighter {
     // id
     mapId:number
     // 类型
     $class = "Fighter"
     
     // 最大血量
     max_hp = 0
      /*// 攻击，一般用在普通攻击上
      attack = 0,
      // 防御
      defence = 0,
      // 破防
      un_defence = 0,
      // 暴击
      critical = 0,
      // 抗暴
      un_critical = 0,
      // 闪避-仅对物理攻击有效
      dodge = 0,
      // 命中
      un_dodge = 0,
      // 法术抗性
      resist = 0,
      // 法术穿透
      un_resist = 0,
      // 伤害加深
      damage_multiple = 0,
      // 伤害减免
      un_damage_multiple = 0,
      // 气势
      power = 0,
      // 最大能量
      max_energy = 0,
      */
     // 当前血量
     hp = 0
     max_hpCount = 0
     //显示血量
     show_hp = 0
     // 能量
     energy = 0
     // 阵营， 1为己方，2为对方
     camp = 1
     // 出场次序， 1是主角，以后为伙伴
     loc = 1
     // fighters列表位置
     index = -1
     // 仇恨
     taunt = 0
     // 可释放的技能
     skill: Array<Skill> = []
     //技能索引
     skill_index = {}
     //动作时间
     actionTime = 0
     // 公共CD
     publicCDNextTime = 0
     // 位置
     x: number = 0
     y: number = 0
     z: number = 0
     // 移动状态
     moving = false
     // 无敌状态
     god = 0
     // 晕眩状态
     stun = 0
     // 免疫晕眩状态
     un_stun = 0
     // 物理盾
     phyShield = { length: 0 }
     // 魔法盾
     magicShield = { length: 0 }
     // 物理魔法盾
     shield = { length: 0 }
     //系统属性
     A: any = undefined

     // buff
     buff: Buff[] = []
     // 正在释放的技能
     spreadSkill: Skill = undefined
     // 正在释放的技能目标
     spreadTargets: number[] = undefined
     // 正在释放的技能等待时间
     spreadNextTime: number = 0
     // 正在释放的技能等待时间
     useSkillTime = 0
     // 正在释放的技能次数
     spreadCount = 0
     // 正在释放的神兵类技能
     godSkill: Skill = undefined
     // 移动的目的地
     moveto: Pos = undefined
     //移动速度,m/50sm
     speed: number = 0
     // 当前选择的技能
     curSkill: Skill = undefined
     // 当前选择的目标 mapId
     curTarget: number = null
     // 记录fighter承受伤害对象，伤害
     damageList: any = {}
     //队伍id
     groupId: number = -1
     //状态 1:手动选怪 1000:不参与战斗计算，最高限制状态
     status: number = 0
     //战斗者显示类型 0-普通怪，1-boss，2-机器人，3-精英怪
     show_type: number = 0
     //是否是被动fighter
     passive: boolean = false
     //是否显示
     hidden: boolean = false
     // 临时记录用：随机数 || 记录选择目标是，目标到自身的距离平方
     rand: number = 0
     //是否需要移除
     remove: boolean = false
     //是否ai,true: 自动选怪，自动移动，false：计算伤害等最后决策
     ai: boolean = true
     //移动路径Array<Pos>
     path: Pos[] = undefined
     //主动寻怪范围
     round: number = Infinity
     //额外选择目标的条件like： [['hp', '>', 0]] => Fighter.hp > 0  ||  [['hp', 0]] => Fighter.hp == 0
     targetConds: Array<any[]> = undefined
     //fighter的约定id,玩家为role_id,怪物为配置表对应id(可重复),镜像玩家为小于零的整数
     sid : number = 0
     //单次伤害计算清空
     damage: number = 0
     //类型 "fighter" || "monster"
     type: string
     //角色id（职业id）
     career_id: number
     //name
     name: string
     //模型id
     module: number
     //手动移动
     /**
      * {x:number,y:number 初始字段
      * 下面是在生命期临时添加
      * time:number 可以恢复到正常逻辑的时间
      * init:boolean 是否已经处理过
      * }
      */
     handMove: any

     //国家id
     area: number
     //宠物id
     pet: number
     //时装id
     clothes: number
     //技能列表
     skillList: Skill[]
     //赋灵阶段
     ensoulClass: number
     //装备总星级
     equipStar: number
     //装备武器id
     weaponId: number

     //回怪距离
     maximum: number
     //模型缩放比例
     scale: number
     //等级
     level: number
     //掉落金币
     money: number
     //掉落经验值
     exp: number
     //掉落id
     drop_id: number
     //掉落type
     drop_type: string
}

export class Skill {
    // id
    id = 0
    // 名字
    name = ""
    // 类型
    $class = "Skill"
    // 是否为手动技能，手动技能不会受到公共CD的限制，但仍然会产生公共CD
    // 1为普通手动技能：使用技能-释放技能 ; 2为手动立即释放技能：释放技能
    hand = 0
    // 最大等级
    maxLevel = 0
    // 优先级
    priority = 0
    // 技能类型， 1物理 2法术
    skillType = 1
    // 释放类型 1单次技能 2引导技能 3被动技能 4光环技能
    castType = 1
    // 目标类型：
    // 1自己 2全体己方 3血最少的x个己方 4最近的x个队友（不包含自己） 5技能施放距离内随机的x个己方（参数为0表示全部）
    //11仇恨最高的敌人 12 全体敌人 13血最少的x个敌人 14最近的x个敌人 15技能施放距离内随机的x个敌人（参数为0表示全部）
    targetType = 11
    // 目标类型AI参数
    targetAIParam = 0
    // 是否继承目标
    FollowTarget = false
    // 技能施放距离
    distance = 0
    // 是否范围技能
    isRangeSkill = 0
    // 技能范围 半径
    range:any = 0
    // 引导次数
    guideCount = 0
    // 引导间隔
    guideInterval = 0
    // 伤害类型 1伤害（如果是物理技能需要判断命中） 2治疗（不判断命中） 3没有伤害和治疗（不判断命中）
    damageType = 1
    // 伤害加成
    damagePer = 1
    // 固定伤害
    damage = 0
    // 附带暴击率
    crit = 0
    // 携带buff
    carryBuff = []
    // 技能CD
    cdTime = 0
    // 能量耗费
    energyCost = 0
    // 释放延迟
    spreadDelay = 0
    // 技能图标
    icon = ""
    // 震屏持续时间
    shakeTime = 0
    // 技能特效
    skillEffect = 0
    // 技能特效延迟
    skillEffectDelay = 0
    // 技能特效位置 1当前目标（胸口） 2自己（胸口） 3场景上
    skillEffectPos = 0
    // 击中特效
    hitEffect = 0
    // 击中特效位置
    hitEffectPos = 0
    // 技能音效
    skillSound = 0
    // 技能音效延迟
    skillSoundDelay = 0
    //技能动作时间
    actionTime = 0
    //是否连招
    combo = 0
    //连招后续技能
    backSkill = []
    // 击中音效
    hitSound = ""
    // 等级
    level = 0
    // 携带buff
    buff = undefined
    // 冷却到期时间
    cdNextTime = 0
    //目标选择距离
    targetLength = 999
    //伤害延迟
    bloodDelayTime:number = 0
    //初始CD
    initialCDTime: number = 0
}

export class Buff {
    // id
    id = 0
    // 名字
    name = ""
    // 类型
    $class = "Buff"
    // 目标类型 1是释放者，2是目标
    targetType = 1
    // 生效几率
    probability = 1
    // buff开始时间，1是技能计算前，2是技能计算后
    addTime = 1
    // buff类型， 1增益，2减益
    buffType = 1

    // buff生存时间
    lifeTime = 0
    // 事件触发类型，1时间触发 2攻击前（连命中都没开始算-攻击者触发-每技能仅一次） 3攻击时伤害计算前（算完命中以后，扣血前-攻击者触发-群攻会触发多次） 4被攻击时伤害计算前（算完命中以后，扣血前-攻击目标触发） 5被攻击时伤害计算后（扣完血以后-攻击目标触发） 6攻击时伤害计算后（扣完血以后-攻击者触发-群攻会触发多次） 7攻击后（攻击者触发-每技能仅一次） 8叠加层数触发（叠加会重置启动时间，叠到要求层数时才触发效果） 9叠加每层触发（叠加会重置启动时间，每叠一次都多一层效果，超过最大次数不消失）
    eventType = 1
    // 激发需要的触发次数
    excitationCount = 1
    // 激发的最大作用次数，到达最大次数会清除该buff，除了类型9
    excitationMaxCount = 1
    // 时间触发的作用间隔，如果为0表示立即触发1次，以后不再触发。为正数表示延迟该秒数，然后每该秒数增加1次触发计数
    timerInterval = 0
    // 攻击类事件触发的血量参数的%，0为都触发 正数表示小于指定的值才触发，负数表示大于指定的值才触发
    attackHP = 0
    // 攻击类事件的触发冷却时间，冷却期间不增加触发
    attackCD = 0
    // buff效果，每次激发都会执行一遍效果
    effect = []
    // 图标
    icon = ""
    // 体型改变 需要配置变大的比例
    bodyType = 0

    // 开始时间
    startTime = 0
    // 触发次数
    eventCount = 0
    // 冷却到期时间
    cdNextTime = 0
    // 源buff
    src = undefined
}

export class Pet {
    constructor(obj){
        this.speed = obj.speed;
        this.module = obj.module;
        this.scale = obj.scale;
        this.name = obj.name;
        this.id = obj.id;
    }
    id = 0
    $class = "Pet"
    //名字
    name = ""
    //类型pet,暂用monster
    type = "monster"
    //动作状态 run || standby
    state = ""
    //位置
    x = 0
    y = 0
    //模型id
    module = 0
    //时装id
    sid = 0
    //移动速度
    speed = 0
    //缩放
    scale = 1
    //朝向
    lookat = {}
    parent: Fighter
}

 /**
* @description 坐标点
*/
export class Pos{
   x:number
   y:number
   z:number
   status:number
}

/**
 * @description 处理返回结果
 */
export class Result{
    static error(des: string){
        return `{"error":${des}}`;
    }
    static ok(des?: string){
        
        return `{"ok":${des||"ok"}}`;
    }
}
 // ================================ 本地

 