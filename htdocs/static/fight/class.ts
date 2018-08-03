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
	//id
	id:number
	//类型，"fighter" 、 "monster" ...
	type: String
	//名字
	name: String
	//阵营  1为己方，2为对方
	camp: number
	x:number
	y:number
	z:number

	//血量
	hp = 0
	//血量上限
	maxHp = 0
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
	min_damage:number
	//伤害减免 
	// un_damage = 0
	//人工制品,免疫下一次受到的负面效果，免疫一次 -1
	artifact = 0
	//无敌
	god:number

	// 能量
	energy = 0
	// 最大能量
	max_energy = 0
	//是否留到下回合
	save_energy:number

	//卷轴
	scrolls: Array<Scroll>
	//卷轴使用次数
	scroll_use = 0
	//卷轴数量上限
	scroll_max = 0

	//牌堆
	cards: Array<Card>
	//摸牌上限
	cards_max: number = 10
	//是否清空手牌
	cards_rest: number = 0
	//摸牌加成张数
	cards_add: number
	//摸牌减少张数
	cards_reduce: number
	//弃牌堆
	cards_scrap: Array<Card>
	//手牌堆
	cards_hand: Array<Card>
	//消耗堆
	cards_expend: Array<Card>
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
	//是否能打出状态牌
	can_play_4:number

	//技能
	skills: Array<Skill>
	//当前使用的技能，即将释放
	skills_use: Skill = undefined
	// 正在释放的技能
	skills_spread: Skill = undefined
	// 正在释放的技能目标
	skills_targets: number[] = undefined

	// buff触发列表
	buffs: Array<Buff>

	//出手回合数
	round: number

	//使用卡牌造成伤害，卡牌使用完之后清空
	damage: number
	
}
/**
 * 卡牌
 * 
 */
export class Card{
	// 卡牌配置id
	sid: number
	//卡牌类型 1: 攻击，带有伤害的牌，一般归为这类; 2: 能力,可持续整场战斗的BUFF，归为这类; 3: 技能	除了攻击与能力牌外，归为这类; 4: 状态牌; 5:诅咒牌
	type = 0
	//卡牌品质,1: 灰色，普通卡; 2: 蓝色, 稀有卡，组成各种套路的核心; 3: 金色, 更加稀有，整体卡牌强度比蓝色更高。
	quality = 1
	// 卡牌在背包中的位置
	index:number

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
	//目标选择参数
	target_param = 0
	//是否继承
	target_inherit = 1
	//伤害类型, 0:普通伤害, 1:真实伤害
	damage_type = 0
	//伤害次数
	damage_count = 1
	//伤害值
	damage: number
	//吸血 公式名字
	steal_hp: string
	//吸血百分比 0.2
	steal_percent: number
	//格挡
	block: number
	//处理类型, 0: 丢弃, 1: 消耗, 2: 虚无，消耗
	deal_type = 0
	//是否固有，是则每局首回合抽牌不参与排序，直接放在抽牌堆顶端
	inherent = 0
	//所属牌库
	belong: number
	//携带buff
	//{buff:Buff,formula:function(){}}
	buffs = [

	]
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
	//buff id
	id = 0
	//buff名字
	name:string
	//添加buff的触发点 1:伤害格挡前挂上BUFF; 2:伤害格挡后挂上BUFF; 3:初始化牌堆时添加 4:抽到此牌时添加 5:此牌打出时添加
	trigger_add:number
	//激活触发点,0:添加时立即触发,1:抽牌前，2:抽牌后,3:打出一张牌前,4:打出一张牌后,5:受到攻击时,6:受到攻击伤害大于0,7:回合开始,8:回合结束,9:消耗一张牌, 10: 打出攻击牌, 11: 打出技能牌, 12: 打出能力牌, 13: 手动丢弃一张牌， 14: 手动抽到一张技能牌, 15: 手动抽到一张攻击牌, 16: 手动抽到一张能力牌, 17: 手动抽到一张诅咒牌,18: 手动抽到一张状态牌, 19：卡牌杀死敌人, 20: 突破敌人格挡
	trigger_excitation = 0
	//类型，1:
	type = 0
	//生效几率
	probability = 1
	//触发条件
	condition: Function
	//生效对象 "F":buff拥有者 "T":目标 
	effectiv_target:string
	//效果类型 生命-hp 生命上限-maxHp 力量-strength 敏捷-agility 智力-brain 速度-speed 攻击减免-un_attack 格挡减免-un_block 易伤-vulnerability 受伤加成-un_damage
	//处理卡牌-deal_cards([from,to,random?,from_random?,formula(卡牌条件),to_number,from_number,id]) 获得卷轴-get_scroll([id,number])
	effect_type:string
	//效果公式
	effect_formula: Function
	//最大激发次数
	excitationMaxCount: number
	//持续回合
	continue_round: number
	//效果持续回合
	effective_life:0
	//叠加规则 1 叠加时间 2 叠加效果 3 叠加最大激发次数
	cover_rule = 1

	//效果值,每次生效的结果值的累加
	addValue: number
	//已经激发的次数
	eventCount: number
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

