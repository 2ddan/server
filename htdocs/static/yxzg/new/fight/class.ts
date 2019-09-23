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
	//英雄id
	hid: string = ""
	//职业
	occupation: number = 1
	//职业名
	occ_name: string  = ""
	//职业英文名
	occ_name_en: string = ""
	//金币
	money: number = 0
	//阵营  1为己方，0为对方
	camp: number
	//营地附加功能
	camp_function:Array<number> = []
	//层数
	floor: number = 0
	//是否已经初始化自身buff和卡牌buff
	init:number = 0
	//召唤类型
	summon = 0
	//怪物类型,1: 爪牙
	monster_type = 0

	x:number
	y:number
	z:number

	//level 人物等级
	level:0
	//当前经验
	experience:0
	//装备槽
	equipment_max:0


	//血量
	hp = 0
	//血量上限
	max_hp = 0
	//血量下限
	min_hp = 0
	//格挡
	_block = 0
	get block(){
		return this._block
	}
	set block(v){
		this._block = v;
		if(this._block > 999){
			this._block = 999;
		} 
	}

	//力量, 提升卡牌造成的伤害
	_strength = 0
	get strength(){
		return this._strength
	}
	set strength(v){
		this._strength = v;
		if(this._strength > 999){
			this._strength = 999;
		} 
	}
	//回合结束加力量
	add_strength = 0
	//回合结束减力量
	reduce_strength = 0
	//敏捷, 提升从牌中获得的格挡
	_agility = 0
	get agility(){
		return this._agility
	}
	set agility(v){
		this._agility = v;
		if(this._agility > 999){
			this._agility = 999;
		} 
	}
	//智力, 提升卡牌造成的真实伤害
	_brain = 0
	get brain(){
		return this._brain
	}
	set brain(v){
		this._brain = v;
		if(this._brain > 999){
			this._brain = 999;
		} 
	}
	//反应速度,影响出手顺序
	speed = 0
	//移动速度
	velocity = 0
	//晕眩
	stun = 0
	//恐惧能量 怪物用
	afraid_energy = 0
	//紊乱,抽到的牌，消耗能量将随机变换（范围：0-3）
	chaos = 0
	//荆棘,反伤（只反伤卡牌和怪物攻击造成的伤害)
	bramble = 0
	/**
	//集中,加强充能球的效果
	focus = 0
	//易伤,受到的伤害提高50%(只包括卡牌和怪物攻击造成的伤害)
	vulnerability = 0
	//虚弱,攻击造成的伤害降低25%(只包括卡牌和怪物攻击造成的伤害)
	enervation = 0
	//脆弱,从牌中获得的格挡值降低25%
	frailty = 0
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
	//无实体,将受到的所有伤害和生命减少效果降为1
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
	//最大保留格挡
	max_block = 0
	//多层护甲，没受伤害一次减一层
	multi_block = 0
	//爆炸
	boom = 0
	//爆炸保留
	save_boom = 0
	//寒冷
	cold = 0
	
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
	//造成的最大伤害
	max_damage: number = 0
	//魔法抗性
	un_true_damage: number = 0
	//恢复加成
	hp_effect:number = 0
	//反伤
	thorns: number = 0
	//伤害减免 
	un_damage = 0
	//伤害生效阈值
	start_damage = 0
	//人工制品,免疫下一次受到的负面效果，免疫一次 -1
	artifact = 0
	//无敌
	god:number = 0
	//坚固，抵挡所有伤害的次数
	firm: number = 0
	//反弹伤害,自己不掉血,次数
	reflect: number = 0
	//攻击形态
	attack_state:number = 0
	//防御形态
	defense_state: number = 0
	// 弱点 受到攻击时，伤害增加{{number}}点
	weakness = 0

	//中毒,中毒的生物在每回合开始时，损失相应生命，每回合中毒层数-1
	poisoning = 0
	//毒甲，被攻击者该属性大于0，则攻击者中毒poisoning_block层
	poisoning_block = 0
	//每回合开始添加毒针
	poison_per = 0

	// 能量
	_energy = 0
	get energy(){
		return this._energy
	}
	set energy(v){
		this._energy = v;
		if(this._energy > 99){
			this._energy = 99;
		} 
	}
	// 最大能量
	max_energy = 0
	//是否留到下回合
	save_energy:number = 0
	//卡牌使用是否消耗能量
	expend_energy = 1
	// 能量转换格挡
	energy_block = 0
	

	/*********** 装备 ***********/
	// 装备格子数
	equiment_position: 5
	// 武器
	weapon: Equipment = undefined
	// 防具
	armor: Equipment = undefined
	other_equipments: Array<Equipment> = []

	/********** 卷轴 ************/
	//背包中的卷轴
	scrolls: Array<number> = []
	//卷轴使用次数
	scroll_use = 0
	//卷轴数量上限
	scroll_max = 3
	// 装备的卷轴
	scrolls_on: Array<Scroll> = []

	//牌堆
	cards: Array<Card> = []
	//抽牌堆
	cards_draw: Array<any> = []
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
	cards_scrap: Array<any> = [] 
	//手牌堆
	cards_hand: Array<any> = []
	//消耗堆
	cards_expend: Array<any> = [] 
	//当前使用的卡牌，即将释放
	card_use: Card = undefined
	// 正在释放的卡牌
	card_spread: Card = undefined
	// 正在释放的卡牌目标
	card_targets: number[] = undefined
	// cards_spread释放完之后的接着释放的卡牌
	card_spread_next: Card = undefined
	// cards_spread_next释放的目标
	card_targets_next: number[] = undefined
	//打牌上限
	cards_play_max:number
	//是否能打出某种类型的牌 1: 攻击，带有伤害的牌，一般归为这类; 2: 能力,可持续整场战斗的BUFF，归为这类; 3: 技能	除了攻击与能力牌外，归为这类; 4: 状态牌; 5:诅咒牌
	cant_play1 = 0
	cant_play2 = 0
	cant_play3 = 0
	//牌堆中每种类型牌的数量
	cards_type_number = {"1":0,"2":0,"3":0,"4":0,"5":0}
	//手牌中每种类型牌的数量
	cards_hand_number = {"1":0,"2":0,"3":0,"4":0,"5":0}
	//每回合打出的每种类型牌的数量
	cards_played_number = {"1":0,"2":0,"3":0,"4":0,"5":0,"all":0}
	//每场战斗打出的每种类型牌的数量
	cards_played_number_all = {"1":0,"2":0,"3":0,"4":0,"5":0,"all":0}
	//手牌数量
	cards_hand_all = 0
	//当前抽的牌，用于触发buff,用完就清除
	draw_now: Card
	//牌组id
	cards_group: number = 0
	//自动出牌
	card_auto:number = 0

	//技能[id,cd]
	skill: Array<any> = []
	//当前使用的技能，即将释放
	skill_use: Skill = undefined
	// 正在释放的技能
	skill_spread: Skill = undefined
	// 正在释放的技能目标
	skill_targets: number[] = undefined

	//需要初始化的buff
	buff_list = []
	// buff触发列表
	buffs: Array<Buff> = []
	//当前正在激活的buff,buff计算前绑定，计算后删除
	buff_now: Buff

	//出手回合数
	round: number = 0
	//跟出手回合类似，但多了一个状态, 自己出手时回合数只加 0.5, 结束时才会加到1 
	_round: number = 0
	//单回合时间限制，超过时间，自动结束回合
	round_time: number = 0
	//进入战斗的回合
	round_start: number = 0
	//单回合开始时间点
	round_single_time: number = 0
	//玩家主动结束回合，但是逻辑代码还没有执行完结束回合的操作
	singleRoundEnding: number = 0

	//使用卡牌造成伤害，卡牌使用完之后清空
	damage: number = 0
	//使用卡牌造成的溢出伤害,卡牌使用之后触发完buff清除
	damage_overflow:number = 0
	//每次受到的伤害，buff触发完清零
	damaged: number = 0
	//每回合受到不为零的伤害次数,下回合开始，buff触发完后清除
	damage_round: number = 0
	//每场战斗受到不为零的伤害次数
	damgae_field: number = 0
	//卡牌打出的伤害翻倍
	times: number = 1
	//被谁杀死,fighter id
	kill: number = 0
	//修改的属性和值[key,value]
	attrChange = []
	//属性单局修改的次数
	attChangeCount = {"brainA":0,"brainR":0}
	//等待处理的事件，如果有则不会进行战斗其他计算，例如：需要玩家手动操作
	//[type事件类型(selcetCard:选牌),event事件数据,data玩家操作的数据,function处理函数]
	wait: Array<any>
	//是否显示，隐藏不参与战斗计算，参与结算
	visible = 1
	//是否等待复活
	revive = 0
	// 战斗场次
	field = 0
	//是否被移除显示
	remove = 0
	// ai是否结束回合
	ai_end_round = 0
	// 是否死亡，是则不会再次触发死亡之后的buff
	died = 0
	//意图
	intent: any = {}
	//显示数据
	_show
    //叠加爆炸
    addboom = 0
	//临时属性
	lty = 0
	tdd = 0
	hzc = 0
	bc = 0
	lty1 = 0
	lty2 = 0
	lty3 = 0
	lty4 = 0
	lty5 = 0
	lty6 = 0
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
	//卡牌类型 1: 攻击，带有伤害的牌，一般归为这类;2: 技能	除了攻击与能力牌外，归为这类; 3: 能力,可持续整场战斗的BUFF，归为这类;  4: 状态牌; 5:诅咒牌
	type = 0
	//卡牌品质,1: 灰色，普通卡; 2: 蓝色, 稀有卡，组成各种套路的核心; 3: 金色, 更加稀有，整体卡牌强度比蓝色更高。4:诅咒牌，5:英雄牌
	quality = 1
	//英雄id,所属英雄，没有则是通用牌
	hero = ""
	//效益 1：增益 2：减益
	benefit = 1
	//描述 变化的数字{{number}}  黄色的文本{{text}}
	des = ""
	// 卡牌图片
	icon = ''
	// 卡牌在背包中的位置
	_index:number
	get index(){
		return this._index;
	}
	set index(v){
		this._index = v;
	}
	// 卡牌等级
	level:number

	//能量消耗 0-4 & x:消耗所有能量 n:不能被打出，能量消耗无法估计
	cost_energy:any = "0"
	//释放条件,F:释放者,T:目标,C:判断模块(比较复杂的判断，通过模块归纳))
	//function(F,T,C){return F.cards_hand.length == 1 && C.checkCardType(1,F.cards)}
	condition_use: Function
	//额外消耗
	cost_extra = 0
	//额外消耗类型,1:血量;2:卷轴,3:消耗手牌,4:丢弃手牌
	cost_extra_type = 0
	//目标类型，1:自己; 2:选择己方X人; 3:己方随机X人; 4:己方血量最少X人; 5:己方除自己以外随机x个玩家 11:所有人 12:选择敌方X人; 13:敌方随机X人; 14:敌方血量最少X人
	target_type = 0
	//怪物手中有这张牌的目标选择类型,同上
	monster_target = 0
	//目标选择参数
	target_param = 0
	//生效目标条件
	//[['id',1],['camp',1],...]
	target_condition: any
	//是否继承
	target_inherit = 1
	//伤害类型, 0:普通伤害, 1:真实伤害
	damage_type = 0
	//伤害次数
	damage_count = 1
	//伤害值
	damage: Array<number> = []
	//附加伤害，除开力量，其他的伤害加成减免都参与计算
	attach_damage: number = 0
	//吸血 公式名字
	steal_hp: string
	//吸血百分比 0.2
	steal_percent: number
	//格挡
	block: number = 0
	//附加格挡
	attach_block = 0
	//处理类型, 0: 丢弃, 1: 消耗, 2: 虚无，消耗, 3: 从牌堆中移除, 4: 回合结束自动打出 5: 强制消耗
	deal_type = 0
	//是否固有，是则每局首回合抽牌不参与排序，直接放在抽牌堆顶端
	inherent = 0
	//卡牌打出效果是否无效
	invalid_card = 0
	//所属牌库
	belong: number
	//携带buff
	//{buff:Buff,formula:function(){}}
	buff_list = []
	
	//显示数据
	_show = {old:null}
}
/**
 * 技能
 * 
 */
export class Skill{
	constructor(keys,values){
        for(let i =0,len = keys.length;i<len;i++){
            this[keys[i]] = values[keys[i]];
        }
	}
	_class = "skill"
	// 技能id
	id: number
	// 名字
	name: string
	// 等级
	level = 1
	//目标类型，1:自己; 2:选择己方X人; 3:己方随机X人; 4:己方血量最少X人; 12:选择敌方X人; 13:敌方随机X人; 14:敌方血量最少X人
	target_type = 0
	// 目标参数
	target_param = 0
	// 多次目标是否继承
	target_inherit = 1
	//触发buff列表
	buff_list = [

	]
	// 前置条件
	condition_use: string
	// 是否是被动技能，0：不是，1：是
	passive_skill: number
	// 是否战斗技能 0：不是，1：是
	fight_skill: number
	// 冷却时间(战斗场次)
	cd: number
	//剩余冷却时间
	cd_last = 0
	// 图标
	icon: string
	// 描述
	description: string
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
	//添加buff的触发点 1:伤害格挡前挂上BUFF; 2:伤害格挡后挂上BUFF; 3:初始化牌堆时添加 4:此牌被消耗时添加 5: 使用卡牌前
	trigger_add:number
	// 1: 攻击，带有伤害的牌，一般归为这类;2: 技能	除了攻击与能力牌外，归为这类; 3: 能力,可持续整场战斗的BUFF，归为这类;  4: 状态牌; 5:诅咒牌
	//激活触发点,0:添加时立即触发,1:抽牌前，2:抽牌后,3:计算打出的牌前,4:计算打出的牌后,5:受到攻击时,6:受到攻击伤害大于0 damaged,7:回合开始,8:回合结束,9:消耗一张牌, 13: 手动丢弃一张牌， 14: 手动抽到一张攻击牌, 15: 手动抽到一张技能牌, 16: 手动抽到一张能力牌, 17: 手动抽到一张状态牌,18: 手动抽到一张诅咒牌, 19：被卡牌杀死, 20: 突破敌人格挡, 21: 单回合开始, 22: 单回合结束, 23: 死亡之后触发, 24: 受到所有伤害都触发, 25：受到治疗, 26: 使用卷轴 27: 战斗开始时, 28: 使用卡牌前, 29: 卡牌对每人每次造成伤害， 30：复制卡牌后， 31：被卡牌、技能、卷轴每个完整攻击计算后, 32：使用卷轴后，33: 回合结束前，34: 单回合开始后, 35: 有人死亡 36: 属性变化时 37: 格挡被突破 38: 格挡从无到有 39: 被卡牌攻击后（无论死亡）40: card效果触发的丢牌（到弃牌堆）时（一张一张）触发
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
	target_type:string
	//生效目标数量
	target_param:number = 0
	//生效目标条件
	target_condition: any
	//效果类型 生命-hp 生命上限-maxHp 力量-strength 敏捷-agility 智力-brain 速度-speed 攻击减免-un_attack 格挡减免-un_block 易伤-vulnerability 受伤加成-un_damage 无敌-god 最小血量-min_hp 
	//处理卡牌-card(
		//[from,to,from_random,to_select,formula,from_number,to_number,id]
		//0,from 源牌堆，从哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆 0:配置表
		//1,to 目标牌堆，放哪个牌堆里面抽 cards:牌堆 cards_draw：抽牌堆 cards_scrap：弃牌堆 cards_hand:手牌堆
		//2,from_random 抽取源牌堆是否随机
		//3,to_select 是否由玩家自己选择(1:必须选择to_number的数量,2:最大选择to_number的数量),0直接进入目标牌堆，
		//4,formula [["属性名","属性值"],["",">",""],...]判断牌是否满足条件的函数（抽取源牌堆时使用）
		//5,from_number 源牌堆中可供选择牌的张数
		//6,to_number 欲放到目标牌堆的数量
		//7,id 直接取某个id的牌
	//)
	//营地附加功能-camp_function 掉落卡牌-drop_card 掉落装备-drop_equip 掉落卷轴-drop_scroll 从牌库中删除一张-delete-card 逃跑-escape
	//卡牌升级-level_card([from(从哪个牌堆选择),random（随机还是手动选择）,condition(卡牌条件["属性名","属性值"]),select_number(最终升级的数量)])
	//修改卡牌属性-card_attribute([from,from_random?（0:手动选择，1:随机选, 2:顺序选）,from_number,卡牌条件([["属性名","属性值",...],...]),需要修改的属性名([key1,key2,...]),修改属性的运算符(["+","-","*","/","=",...]),修改运算符右边的值([value1,value2,value3,....])])
	//f.cards_hand.length
	//复制卡牌-card_copy(['card_spread cards_hand '+f.cards_hand.length,to,from_random?（0:手动选择，1:随机选, 2:顺序选）,from_number,卡牌条件([["属性名","属性值",...],...])])
	//[effect_type:string(效果类型), effect_formula: string(效果公式)]
	//切换牌组-change_cards_group
	//立即复活-resurrection
	//逃跑-runaway
	//招怪-monster
	effects: Array<any> = []
	//期望激发次数
	excitation_expect_count:number = 0
	//最大激发次数
	excitation_max_count: number = 0
	//持续回合
	continue_round: number = 0
	//效果持续回合
	// effective_life:0
	//叠加规则 1 叠加时间 2 叠加效果 3 叠加最大激发次数 4 叠加激发次数 5 叠加效果数值
	cover_rule = 1
	//持续战斗场数
	continue_field: number = 0
	//截至战斗场次
	field_life: number = 0

	//效果值,每次生效的结果值的累加
	add_value: any = {}
	//是否在自己出手之后添加的buff,大回合结束时清为0
	showNum: number = 0
	//已经激发的次数
	event_count: number = 0
	//效果在第几回合激活
	// effective: number = 0
	//生命周期
	life: number = 0
	//添加buff者（即谁触发的添加）的id
	AF: number = 0
	//作用的卡牌 
	cards: Array<number> = []

	//特效规则 1:一直循环, 2:触发时播放, 3:只播放一次
	effect_rule: number
	//特效名字
	effect_name: string
	//音效名字
	music: string
	//图标名字
	icon: string
	//是否减益
	debuff: number = 0
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
	constructor(keys,values){
        for(let i =0,len = keys.length;i<len;i++){
            this[keys[i]] = values[keys[i]];
        }
	}
	// 类名
	_class = "scroll"
	// 卷轴id
	id: number
	// 名字
	name: string
	// 类型
	type: number
	// 稀有度,1：普通，2：优秀，3：稀有，4：罕有
	quality = 1
	//目标类型，1:自己; 2:选择己方X人; 3:己方随机X人; 4:己方血量最少X人; 12:选择敌方X人; 13:敌方随机X人; 14:敌方血量最少X人
	target_type = 0
	// 目标参数
	target_param = 0
	// 多次目标是否继承
	target_inherit = 1
	// 伤害类型，0：普通伤害，1：真实伤害
	damage_type = 0
	// 伤害值
	damage: Array<number> = []
	// 伤害次数
	damage_count = 1
	// 格挡
	block: number
	// buff列表
	buff_list = [

	]
	//释放条件
	condition_use: string
	// 图标
	icon: string
	// 购买所需金币
	money: number
	// 描述
	description: string
}

/**
 * 装备
 * 
 */
export class Equipment{
	constructor(keys,values){
        for(let i =0,len = keys.length;i<len;i++){
            this[keys[i]] = values[keys[i]];
        }
	}
	// 类名
	_class = "equipment"
	// 装备id
	id: number
	// 名字
	name: string
	// 职业，1：战士，2：法师
	career: number = 1
	// 装备类型，1：武器，2：防具，3：其他
	type: number
	// 装备稀有度，1：白（普通），2：绿（优秀)，3：蓝（精良），4：紫（史诗）
	rarity = 1
	// 携带buff
	buff_list = [

	]
	// 功能id
	open_function: number
	// 功能效果
	function_effect: string
	// 套装id
	suit_id: number
	// 套装数量
	suit_number: number
	// 来源，（1）普通遗物：精英怪，事件，商店（2）罕见遗物：精英怪，事件，商店（3）稀有遗物：精英怪，事件，商店（4）BOSS遗物：只由BOSS掉落
	dropfrom: number
	// 金币
	money: number
	// 图标
	icon: string
	// 描述 变化的数字{{number}}  黄色的文本{{text}}
	description = ""

	// 合成所需材料 [兽皮：1，铁块：2，...]，为空表示无法通过材料合成
	materials = [

	]
	//显示数据
	_show = {old:null}
}

/**
 * 套装
 * 
 */
export class SuitEquipment{
	constructor(keys,values){
        for(let i =0,len = keys.length;i<len;i++){
            this[keys[i]] = values[keys[i]];
        }
	}
	// 类名
	_class = "suit_equipment"
	// 套装id
	id: number
	// 套装名
	name: string
	// 组建
	components: Array<number>
	// 携带buff
	buff_list = [

	]
	// 描述
	description = ""
}
// ======================================== 本地

