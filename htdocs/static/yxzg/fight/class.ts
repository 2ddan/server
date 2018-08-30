/**
 * 所有战斗中出现的类型
 * 
 */
/**
 * 力量、敏捷、智力、速度
 * 所有属性加成、减免
 * 
 * 能量、卡牌
 * 
 */
export class Fighter{
	_class = "fighter"
	//id
	id:number
	//用户id或者怪物的配置id
	sid:number = 0
	//类型，"fighter" 、 "monster" ...
	type: string
	//名字
	name: string
	//职业
	occupation: number = 1
	//职业名
	occ_name: string  = ""
	//职业英文名
	occ_name_en: string = ""
	//金币
	money: number = 0
	//阵营  1为己方，2为对方
	camp: number
	//营地附加功能
	camp_function:Array<number> = []
	//是否已经初始化自身buff和卡牌buff
	init:number = 0
	
	x:number
	y:number
	z:number

	//血量
	hp = 0
	//血量上限
	max_hp = 0
	//血量下限
	min_hp = 0
	//格挡
	block = 0

	//力量, 提升卡牌造成的伤害
	strength = 0
	//敏捷, 提升从牌中获得的格挡
	agility = 0
	//智力, 提升卡牌造成的真实伤害
	brain = 0
	//反应速度,影响出手顺序
	speed = 0
	//移动速度
	velocity = 0
	//晕眩
	stun = 0
	/**
	//集中,加强充能球的效果
	focus = 0
	//易伤,受到的伤害提高50%(只包括卡牌和怪物攻击造成的伤害)
	vulnerability = 0
	//虚弱,攻击造成的伤害降低25%(只包括卡牌和怪物攻击造成的伤害)
	enervation = 0
	//荆棘,反伤（只反伤卡牌和怪物攻击造成的伤害)
	bramble = 0
	//脆弱,从牌中获得的格挡值降低25%
	frailty = 0
	
	//混乱,抽到的牌，消耗能量将随机变换（范围：0-3）
	chaos = 0
	//多层护甲,回合开始时，获得X格挡，受到伤害而失去生命时，X减1。
	shield = 0
	//柔韧,受到攻击时，获得3点格挡值。每触发一次，获得的格挡值+1.在你的回合开始时，变为3点。
	pliable = 0
	//邪咒,每打出一张攻击牌，都将一张 晕眩 放入抽牌堆中。
	curse = 0
	//恶魔形态,在你的回合开始时，获得2点力量
	devil = 0
	//壁垒,格挡值不会在下回合消失
	vallum = 0
	//金属化,在你的回合结束时，获得X点格挡
	metallization = 0
	//中毒,中毒的生物在每回合开始时，损失相应生命，每回合中毒层数-1
	poisoning = 0
	//无实体,	将受到的所有伤害和生命减少效果降为1
	incorporeity = 0
	//机器学习,每回合额外抽1张牌
	machine_learning = 0
	//愤怒,受到攻击造成的伤害时，提升X点力量
	anger = 0
	//再生,回合结束时恢复X点生命，每回合X-1
	regeneration = 0
	 * 
	 */
	//是否自动
	ai = 0
	//攻击加成
	// add_attack = 0
	//格挡加成
	add_block = 0
	//攻击减免 虚弱
	un_attack = 0
	//格挡减免
	un_block = 0
	//格挡持续回合数
	save_block = 0
	//易伤,受到的伤害提高50%(只包括卡牌和怪物攻击造成的伤害)
	vulnerability = 0
	//受伤害加成
	add_damage = 0
	//伤害乘法系数
	multiplication_damage = 1
	//造成的最小伤害
	min_damage:number = 0
	//伤害减免 
	// un_damage = 0
	//人工制品,免疫下一次受到的负面效果，免疫一次 -1
	artifact = 0
	//无敌
	god:number = 0

	// 能量
	energy = 0
	// 最大能量
	max_energy = 0
	//是否留到下回合
	save_energy:number = 0

	//卷轴
	scrolls: Array<Scroll> = []
	//卷轴使用次数
	scroll_use = 0
	//卷轴数量上限
	scroll_max = 0

	//牌堆
	cards: Array<Card> = []
	//抽牌堆
	cards_draw: Array<Card> = []
	//摸牌张数
	cards_number = 5
	//摸牌上限
	cards_max: number = 10
	//是否清空手牌
	cards_rest: number = 1
	//摸牌加成张数
	cards_add: number = 0
	//摸牌减少张数
	cards_reduce: number = 0
	//弃牌堆
	cards_scrap: Array<Card> = []
	//手牌堆
	cards_hand: Array<Card> = []
	//消耗堆
	cards_expend: Array<Card> = []
	//当前使用的卡牌，即将释放
	cards_use: Card = undefined
	// 正在释放的卡牌
	cards_spread: Card = undefined
	// 正在释放的卡牌目标
	cards_targets: number[] = undefined
	// cards_spread释放完之后的接着释放的卡牌
	cards_spread_next: Card = undefined
	// cards_spread_next释放的目标
	cards_targets_next: number[] = undefined
	//打牌上限
	cards_play_max:number
	//是否能打出某种类型的牌 1: 攻击，带有伤害的牌，一般归为这类; 2: 能力,可持续整场战斗的BUFF，归为这类; 3: 技能	除了攻击与能力牌外，归为这类; 4: 状态牌; 5:诅咒牌
	can_play = {"1":1,"2":1,"3":1,"4":1,"5":0}
	//牌堆中每种类型牌的数量
	cards_type_number = {"1":0,"2":0,"3":0,"4":0,"5":0}
	//手牌中每种类型牌的数量
	cards_hand_number = {"1":0,"2":0,"3":0,"4":0,"5":0}
	//每回合打出的每种类型牌的数量
	cards_played_number = {"1":0,"2":0,"3":0,"4":0,"5":0}

	//技能
	skills: Array<Skill>
	//当前使用的技能，即将释放
	skills_use: Skill = undefined
	// 正在释放的技能
	skills_spread: Skill = undefined
	// 正在释放的技能目标
	skills_targets: number[] = undefined

	//需要初始化的buff
	buff_list = []
	// buff触发列表
	buffs: Array<Buff> = []

	//出手回合数
	round: number = 0

	//使用卡牌造成伤害，卡牌使用完之后清空
	damage: number = 0
	//使用卡牌造成的溢出伤害,卡牌使用之后触发完buff清除
	damage_overflow:number = 0
	//每次受到的伤害，buff触发完清零
	damaged: number = 0
	//每回合受到不为零的伤害次数,下回合开始，buff触发完后清除
	damage_round: number = 0
	//没场战斗受到不为零的伤害次数
	damgae_field: number = 0
	//等待处理的事件，如果有则不会进行战斗其他计算，例如：需要玩家手动操作
	//[type事件类型(selcetCard:选牌),event事件数据,data玩家操作的数据]
	wait = []
	//是否显示，隐藏不参与战斗计算，参与结算
	visible = 1
	//是否等待复活
	revive = 0
	// 战斗场次
	field = 0
	//是否被移除显示
	remove = 0
}

/**
 * 卡牌
 * 
 */
export class Card{
	constructor(keys,values){
        for(let i =0,len = keys.length;i<len;i++){
            this[keys[i]] = values[keys[i]];
        }
	}
	// 类名
	_class = "card"
	// 卡牌配置id
	sid: number
	// 名字
	name: string
	//颜色 0-无色通用 1-99 职业牌（跟职业id一致） 100-诅咒 101-怪物牌
	color: number = 0
	//卡牌类型 1: 攻击，带有伤害的牌，一般归为这类; 2: 能力,可持续整场战斗的BUFF，归为这类; 3: 技能	除了攻击与能力牌外，归为这类; 4: 状态牌; 5:诅咒牌
	type = 0
	//卡牌品质,1: 灰色，普通卡; 2: 蓝色, 稀有卡，组成各种套路的核心; 3: 金色, 更加稀有，整体卡牌强度比蓝色更高。
	quality = 1
	//效益 1：增益 2：减益
	benefit = 1
	//描述 变化的数字{{number}}  黄色的文本{{text}}
	des = ""
	// 卡牌在背包中的位置
	index:number
	// 卡牌等级
	level:number

	//能量消耗 0-4 & x:消耗所有能量 n:不能被打出，能量消耗无法估计
	cost_energy = "0"
	//释放条件,F:释放者,T:目标,C:判断模块(比较复杂的判断，通过模块归纳))
	//function(F,T,C){return F.cards_hand.length == 1 && C.checkCardType(1,F.cards)}
	condition_use: Function
	//额外消耗
	cost_extra = 0
	//额外消耗类型,1:血量;2:卷轴,3:消耗手牌,4:丢弃手牌
	cost_extra_type = 0
	//目标类型，1:自己; 2:选择己方X人; 3:己方随机X人; 4:己方血量最少X人; 12:选择敌方X人; 13:敌方随机X人; 14:敌方血量最少X人
	target_type = 0
	//怪物手中有这张牌的目标选择类型,同上
	monster_target = 0
	//目标选择参数
	target_param = 0
	//是否继承
	target_inherit = 1
	//伤害类型, 0:普通伤害, 1:真实伤害
	damage_type = 0
	//伤害次数
	damage_count = 1
	//伤害值
	damage: Array<number> = []
	//吸血 公式名字
	steal_hp: string
	//吸血百分比 0.2
	steal_percent: number
	//格挡
	block: number
	//处理类型, 0: 丢弃, 1: 消耗, 2: 虚无，消耗, 3: 从牌堆中移除
	deal_type = 0
	//是否固有，是则每局首回合抽牌不参与排序，直接放在抽牌堆顶端
	inherent = 0
	//所属牌库
	belong: number
	//携带buff
	//{buff:Buff,formula:function(){}}
	buff_list = []
	//触发buff列表
	buffs = [

	]
	//显示数据
	_show = {old:null}
}
/**
 * 技能
 * 
 */
export class Skill{

}
/**
 * buff
 * 
 */
export class Buff{
	constructor(keys,values){
        for(let i =0,len = keys.length;i<len;i++){
            this[keys[i]] = values[keys[i]];
        }
	}
	_class = "buff"
	//buff id
	id = 0
	//buff名字
	name:string
	//添加buff的触发点 1:伤害格挡前挂上BUFF; 2:伤害格挡后挂上BUFF; 3:初始化牌堆时添加 4:抽到此牌时添加 5:此牌打出时添加
	trigger_add:number
	//激活触发点,0:添加时立即触发,1:抽牌前，2:抽牌后,3:打出一张牌前,4:打出一张牌后,5:受到攻击时,6:受到攻击伤害大于0,7:回合开始,8:回合结束,9:消耗一张牌, 10: 打出攻击牌, 11: 打出技能牌, 12: 打出能力牌, 13: 手动丢弃一张牌， 14: 手动抽到一张技能牌, 15: 手动抽到一张攻击牌, 16: 手动抽到一张能力牌, 17: 手动抽到一张诅咒牌,18: 手动抽到一张状态牌, 19：卡牌杀死敌人, 20: 突破敌人格挡, 21: 单回合开始, 22: 单回合结束, 23: 死亡之后触发, 24: 受到所有伤害都触发
	trigger_excitation = 0
	//类型，1:
	type = 0
	//生效几率
	probability = 1
	//触发条件
	trigger_condition: string
	//生效条件
	condition: string
	//生效对象 "F":buff拥有者 "T":目标 
	effectiv_target:string
	//效果类型 生命-hp 生命上限-maxHp 力量-strength 敏捷-agility 智力-brain 速度-speed 攻击减免-un_attack 格挡减免-un_block 易伤-vulnerability 受伤加成-un_damage 无敌-god 最小血量-min_hp 
	//处理卡牌-deal_cards([from,to,from_random?,to_select?,formula(卡牌条件["属性名","属性值",...]),to_number,from_number,id,[addbuff,..(添加到抽出来的卡牌)]]) 获得卷轴-get_scroll([id,number])
	//营地附加功能-camp_function 掉落卡牌-drop_card 掉落装备-drop_equip 掉落卷轴-drop_scroll 从牌库中删除一张-delete-card 逃跑-escape
	//卡牌升级-level_card([from(从哪个牌堆选择),random（随机还是手动选择）,condition(卡牌条件["属性名","属性值"]),select_number(最终升级的数量)])
	effect_type:string
	//效果公式
	effect_formula: string
	//期望激发次数
	excitation_expect_count:number = 0
	//最大激发次数
	excitation_max_count: number = 0
	//持续回合
	continue_round: number = 0
	//效果持续回合
	effective_life:0
	//叠加规则 1 叠加时间 2 叠加效果 3 叠加最大激发次数
	cover_rule = 1
	//持续战斗场数
	continue_field: number = 0
	//

	//效果值,每次生效的结果值的累加
	add_value: number
	//已经激发的次数
	event_count: number
	//效果在第几回合激活
	effective: number
	//生命周期
	life: number
	//添加buff者（即谁触发的添加）的id
	AF: number

	//特效规则 1:一直循环, 2:触发时播放, 3:只播放一次
	effect_rule: number
	//特效名字
	effect_name: string
	//音效名字
	music: string
	//图标名字
	icon: string
	//描述
	des:string
	//备注
	remarks:string
	//是否显示buff图标 0:隐藏, 1:显示
	icon_visible: number
}
/**
 * 卷轴
 * 
 */
export class Scroll{

}

// ======================================== 本地

