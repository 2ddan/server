export let skill = {
	table:{
		
	},
	around:{
		
	}
}
	var s, table = skill.table, max = 0,min = 0,around: any = skill.around;
    
	s = {
		id: 901001,
		name: "普攻",
		hand: 0,
        combo: 1,
        backSkill: [901002,901003],
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2850,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolem_attack",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:350,
		skillSound: "atk_rolem",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901002,
		name: "普攻2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.35",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901003,
		name: "普攻3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.55",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 750,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:1500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901101,
		name: "横扫八方",
		hand: 0,
        combo: 1,
        backSkill: [901102],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 7000,
		initialCDTime:3500,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_rolem_sk1",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:350,
		skillSound: "skill1_rolem",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901102,
		name: "横扫八方2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 800,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:1750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901201,
		name: "雷龙入地",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 3,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 3.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2+Skill.level*0.04",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 10000,
		initialCDTime:5000,
		energyCost: 0,
		bloodDelayTime: 600,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 600,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_rolem_sk2",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolem_sk2",3,[0,0,0]],
		actionTime:1433,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "skill2_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901301,
		name: "游龙枪",
		hand: 0,
        combo: 1,
        backSkill: [901302],
		priority: 4,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 4.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 12000,
		initialCDTime:6000,
		energyCost: 0,
		bloodDelayTime: 333,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolem_sk3",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:334,
		skillSound: "skill3_rolem",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901302,
		name: "游龙枪2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [4.5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.7+Skill.level*0.035",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 950,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 950,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:1533,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901401,
		name: "奔雷枪",
		hand: 0,
        combo: 1,
        backSkill: [901402,901403,901404,901405],
		priority: 5,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.7+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 16000,
		initialCDTime:8000,
		energyCost: 0,
		bloodDelayTime: 366,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolem_sk4",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:367,
		skillSound: "skill4_rolem",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901402,
		name: "奔雷枪2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.7+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 533,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:534,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901403,
		name: "奔雷枪3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.4+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901404,
		name: "奔雷枪4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.4+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:201,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901405,
		name: "奔雷枪5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [4,10],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.6+Skill.level*0.04",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 433,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 433,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:1350,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901501,
		name: "破天枪舞",
		hand: 0,
        combo: 1,
        backSkill: [901502,901503,901504,901505,901506,901507,901508,901509],
		priority: 6,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 20000,
		initialCDTime:10000,
		energyCost: 0,
		bloodDelayTime: 833,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolem_sk5",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:834,
		skillSound: "skill5_rolem",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901502,
		name: "破天枪舞2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901503,
		name: "破天枪舞3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901504,
		name: "破天枪舞4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901505,
		name: "破天枪舞5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901506,
		name: "破天枪舞6",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901507,
		name: "破天枪舞7",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901508,
		name: "破天枪舞8",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 901509,
		name: "破天枪舞9",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3+Skill.level*0.04",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 250,
		backDistance:[5,7],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolem_common",1,[0,0,0]],
		actionTime:1400,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902001,
		name: "普攻",
		hand: 0,
        combo: 1,
        backSkill: [902002,902003],
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2850,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolef_attack",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:350,
		skillSound: "atk_rolef",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902002,
		name: "普攻2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.35",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:350,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902003,
		name: "普攻3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.55",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 900,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:1634,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902101,
		name: "气元斩",
		hand: 0,
        combo: 1,
        backSkill: [902102],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 4.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 7000,
		initialCDTime:3500,
		energyCost: 0,
		bloodDelayTime: 480,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_rolef_sk1",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:480,
		skillSound: "skill1_rolef",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902102,
		name: "气元斩2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 4.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 680,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:1587,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902201,
		name: "刺空踢",
		hand: 0,
        combo: 1,
        backSkill: [902202,902203],
		priority: 3,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 2,
		range: [3,6],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1+Skill.level*0.02",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 10000,
		initialCDTime:5000,
		energyCost: 0,
		bloodDelayTime: 300,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 333,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_rolef_sk2",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:300,
		skillSound: "skill2_rolef",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902202,
		name: "刺空踢2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 533,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:534,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902203,
		name: "刺空踢3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:900,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902301,
		name: "刀刃风暴",
		hand: 0,
        combo: 1,
        backSkill: [902302,902303,902304],
		priority: 4,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 12000,
		initialCDTime:6000,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_rolef_sk3",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:350,
		skillSound: "skill3_rolef",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902302,
		name: "刀刃风暴2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 180,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:180,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902303,
		name: "刀刃风暴3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 180,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:180,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902304,
		name: "刀刃风暴4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1+Skill.level*0.02",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 180,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:1290,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902401,
		name: "魅影杀阵",
		hand: 0,
        combo: 1,
        backSkill: [902402,902403,902404],
		priority: 5,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 4.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 16000,
		initialCDTime:8000,
		energyCost: 0,
		bloodDelayTime: 366,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolef_sk4",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:367,
		skillSound: "skill4_rolef",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902402,
		name: "魅影杀阵2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 400,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:401,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902403,
		name: "魅影杀阵3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 433,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:434,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902404,
		name: "魅影杀阵4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 5.5,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2+Skill.level*0.03",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 466,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 466,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:1666,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902501,
		name: "影袭",
		hand: 0,
        combo: 1,
        backSkill: [902502,902503,902504,902505,902506,902507,902508,902509],
		priority: 6,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 20000,
		initialCDTime:10000,
		energyCost: 0,
		bloodDelayTime: 166,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_rolef_sk5",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:167,
		skillSound: "skill5_rolef",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902502,
		name: "影袭2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902503,
		name: "影袭3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902504,
		name: "影袭4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902505,
		name: "影袭5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902506,
		name: "影袭6",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902507,
		name: "影袭7",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902508,
		name: "影袭8",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.3+Skill.level*0.005",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:230,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 902509,
		name: "影袭9",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.5,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3+Skill.level*0.04",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 230,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 266,
		backDistance:[5,7],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_rolef_common",1,[0,0,0]],
		actionTime:1233,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903001,
		name: "普攻",
		hand: 0,
        combo: 1,
        backSkill: [903002],
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 520,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_roleg_attack",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:520,
		skillSound: "atk_roleg",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903002,
		name: "普攻2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 800,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:2400,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903101,
		name: "劲气横扫",
		hand: 0,
        combo: 1,
        backSkill: [903102,903103],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.53+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 7000,
		initialCDTime:3500,
		energyCost: 0,
		bloodDelayTime: 600,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_roleg_sk1",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:600,
		skillSound: "skill1_roleg",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903102,
		name: "劲气横扫2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.53+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 300,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:300,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903103,
		name: "劲气横扫3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.53+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 300,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:1300,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903201,
		name: "摄魂圣锤",
		hand: 0,
        combo: 1,
        backSkill: [903202,903203],
		priority: 3,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 10000,
		initialCDTime:5000,
		energyCost: 0,
		bloodDelayTime: 870,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 870,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_roleg_sk2",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:870,
		skillSound: "skill2_roleg",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903202,
		name: "摄魂圣锤2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:60,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903203,
		name: "摄魂圣锤3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 4,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1+Skill.level*0.02",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:1135,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903301,
		name: "地裂天崩",
		hand: 0,
        combo: 1,
        backSkill: [903302,903303],
		priority: 4,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 2,
		range: [2.5,6],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 12000,
		initialCDTime:6000,
		energyCost: 0,
		bloodDelayTime: 770,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 770,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_roleg_sk3",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:770,
		skillSound: "skill3_roleg",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903302,
		name: "地裂天崩2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 2,
		range: [2.5,6],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.8+Skill.level*0.015",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:60,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903303,
		name: "地裂天崩3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 2,
		range: [2.5,6],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.9+Skill.level*0.02",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:1300,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903401,
		name: "圣光爆破",
		hand: 0,
        combo: 1,
        backSkill: [903402,903403],
		priority: 5,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 6,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.5+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 16000,
		initialCDTime:8000,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_roleg_sk4",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_roleg_sk4",3,[0,0,0]],
		actionTime:1200,
		skillSound: "skill4_roleg",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903402,
		name: "圣光爆破2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 6,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.65+Skill.level*0.025",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 800,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 1,
		shakeTime: 800,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: [],
		actionTime:800,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903403,
		name: "圣光爆破3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 6,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.65+Skill.level*0.025",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: [],
		actionTime:900,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903501,
		name: "乱舞天华",
		hand: 0,
        combo: 1,
        backSkill: [903502,903503,903504,903505,903506,903507,903508,903509],
		priority: 6,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 20000,
		initialCDTime:10000,
		energyCost: 0,
		bloodDelayTime: 800,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.2,
		shakeTime: 800,
		backDistance:[4,6],
		skillEffect: [
			
			["eff_roleg_sk5",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:800,
		skillSound: "skill5_roleg",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903502,
		name: "乱舞天华2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.2,
		shakeTime: 500,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903503,
		name: "乱舞天华3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.2,
		shakeTime: 500,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903504,
		name: "乱舞天华4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.2,
		shakeTime: 500,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903505,
		name: "乱舞天华5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.2,
		shakeTime: 500,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903506,
		name: "乱舞天华6",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.2,
		shakeTime: 500,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903507,
		name: "乱舞天华7",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903508,
		name: "乱舞天华8",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:500,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 903509,
		name: "乱舞天华9",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 2.8,
		isRangeSkill: 1,
		range: 7,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "0.6+Skill.level*0.01",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[4,6],
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_roleg_common",1,[0,0,0]],
		actionTime:1900,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990101,
		name: "野猪怪普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 833,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:2200,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9901021,
		name: "野猪拳师普攻",
		hand: 0,
        combo: 1,
        backSkill: [9901022],
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 433,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:433,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9901022,
		name: "野猪拳师普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 433,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1134,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990103,
		name: "狂斧山猪普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 733,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1733,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990104,
		name: "山林石怪普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 767,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1667,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990105,
		name: "金刚石怪普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 767,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1667,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990106,
		name: "熔岩石怪普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 767,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1667,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990107,
		name: "蜥蜴剑客普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1233,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990108,
		name: "山石蜥蜴普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 500,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1233,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990109,
		name: "武装蜥蜴普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 700,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1667,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990110,
		name: "大地幼龙普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 533,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1267,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990111,
		name: "风暴幼龙普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 533,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1267,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990112,
		name: "炎火幼龙普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 533,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1267,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990113,
		name: "水晶魔蝎普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 367,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990114,
		name: "玄武魔蝎普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 467,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1033,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990115,
		name: "幽冥魔蝎普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 3000,
		initialCDTime:3000,
		energyCost: 0,
		bloodDelayTime: 600,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1067,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990211,
		name: "牛魔首领普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1500,
		skillSound: "boss_niutou_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902121,
		name: "牛魔首领技能",
		hand: 0,
        combo: 1,
        backSkill: [9902122,9902123],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 600,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
			["eff_boss01_sk1",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:600,
		skillSound: "boss_niutou_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902122,
		name: "牛魔首领技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 533,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:533,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902123,
		name: "牛魔首领技能3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 700,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.8,
		shakeTime: 700,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1434,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990221,
		name: "金刚巨像普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 634,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1400,
		skillSound: "boss_yanshi_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902221,
		name: "金刚巨像技能",
		hand: 0,
        combo: 1,
        backSkill: [9902222,9902223],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.66",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 900,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.8,
		shakeTime: 900,
		backDistance:0,
		skillEffect: [
			
			["eff_boss02_sk1",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:900,
		skillSound: "boss_yanshi_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902222,
		name: "金刚巨像技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.66",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:60,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902223,
		name: "金刚巨像技能3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.66",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 60,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:840,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990231,
		name: "烈焰巨龙普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1533,
		skillSound: "boss_huolong_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902321,
		name: "烈焰巨龙1技能",
		hand: 0,
        combo: 1,
        backSkill: [9902322],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [8,4],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 734,
		backDistance:0,
		skillEffect: [
			
			["eff_boss03_sk1",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:734,
		skillSound: "boss_huolong_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902322,
		name: "烈焰巨龙1技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [8,4],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 734,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1467,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902331,
		name: "烈焰巨龙2技能",
		hand: 0,
        combo: 1,
        backSkill: [9902332,9902333,9902334,9902335],
		priority: 3,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 12000,
		initialCDTime:6000,
		energyCost: 0,
		bloodDelayTime: 1300,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 1300,
		backDistance:0,
		skillEffect: [
			
			["eff_boss03_sk2",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1300,
		skillSound: "boss_huolong_skill2",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902332,
		name: "烈焰巨龙2技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:340,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902333,
		name: "烈焰巨龙2技能3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:340,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902334,
		name: "烈焰巨龙2技能4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:340,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902335,
		name: "烈焰巨龙2技能5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:550,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990241,
		name: "寒冰巨龙普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1533,
		skillSound: "boss_huolong_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902421,
		name: "寒冰巨龙1技能",
		hand: 0,
        combo: 1,
        backSkill: [9902422],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [8,4],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 734,
		backDistance:0,
		skillEffect: [
			
			["eff_boss04_sk1",0,2,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:734,
		skillSound: "boss_huolong_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902422,
		name: "寒冰巨龙1技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [8,4],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 734,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 734,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1467,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902431,
		name: "寒冰巨龙2技能",
		hand: 0,
        combo: 1,
        backSkill: [9902432,9902433,9902434,9902435],
		priority: 3,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 12000,
		initialCDTime:6000,
		energyCost: 0,
		bloodDelayTime: 1300,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 1300,
		backDistance:0,
		skillEffect: [
			
			["eff_boss04_sk2",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1300,
		skillSound: "boss_binglong_skill2",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902432,
		name: "寒冰巨龙2技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:340,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902433,
		name: "寒冰巨龙2技能3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:340,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902434,
		name: "寒冰巨龙2技能4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:340,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902435,
		name: "寒冰巨龙2技能5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [5,8],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 340,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 340,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:550,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990251,
		name: "三界邪王普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 667,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1334,
		skillSound: "boss_waixing_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990252,
		name: "三界邪王技能",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 6,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 1334,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.8,
		shakeTime: 1334,
		backDistance:0,
		skillEffect: [
			
			["eff_boss05_sk1",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:2234,
		skillSound: "boss_waixing_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990261,
		name: "魔蝎领主普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 934,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1467,
		skillSound: "boss_azimo_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990262,
		name: "魔蝎领主技能",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 1,
		range: 6,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 1100,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.8,
		shakeTime: 1100,
		backDistance:0,
		skillEffect: [
			
			["eff_boss06_sk1",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1734,
		skillSound: "boss_azimo_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 990271,
		name: "青铜古兽普攻",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 1,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 11,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 0,
		range: 0,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 2500,
		initialCDTime:2500,
		energyCost: 0,
		bloodDelayTime: 967,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:1634,
		skillSound: "boss_qingtong_atk",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902721,
		name: "青铜古兽技能",
		hand: 0,
        combo: 1,
        backSkill: [9902722,9902723,9902724,9902725],
		priority: 2,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.2",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 8000,
		initialCDTime:4000,
		energyCost: 0,
		bloodDelayTime: 466,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 466,
		backDistance:0,
		skillEffect: [
			
			["eff_boss07_sk1",0,3,[0,0,0]]
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:466,
		skillSound: "boss_qingtong_skill1",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902722,
		name: "青铜古兽技能2",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.2",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 250,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902723,
		name: "青铜古兽技能3",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.2",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 250,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902724,
		name: "青铜古兽技能4",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.2",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 250,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:250,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9902725,
		name: "青铜古兽技能5",
		hand: 0,
        combo: 0,
        backSkill: 0,
		priority: 0,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:999,
		distance: 3,
		isRangeSkill: 2,
		range: [3,7],
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "1.2",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 250,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.5,
		shakeTime: 250,
		backDistance:0,
		skillEffect: [
			
		],
		hitEffect: ["eff_hit_monster_common",1,[0,0,0]],
		actionTime:300,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981011,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981012,981013],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [9810111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981012,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981013,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981021,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981022,981023],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [9810111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981022,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981023,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981031,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981032,981033,981034],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [9810111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981032,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981033,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981034,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981041,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981042,981043,981044],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [9810111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981042,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981043,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981044,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981051,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981052,981053,981054,981055],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [9810111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981052,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981053,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981054,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981055,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem01",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981061,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981062,981063,981064,981065],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [9810611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981062,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981063,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981064,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981065,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981071,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981072,981073,981074,981075,981076],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [9810611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981072,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981073,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981074,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981075,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981076,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981081,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981082,981083,981084,981085,981086],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [9810611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981082,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981083,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981084,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981085,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981086,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981091,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981092,981093,981094,981095,981096,981097],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [9810611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981092,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981093,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981094,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981095,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981096,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981097,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981101,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981102,981103,981104,981105,981106,981107],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [9810611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981102,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981103,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981104,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981105,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981106,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981107,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem02",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981111,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981112,981113,981114,981115,981116,981117,981118],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [9811111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981112,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981113,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981114,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981115,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981116,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981117,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981118,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981121,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981122,981123,981124,981125,981126,981127,981128],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [9811111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981122,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981123,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981124,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981125,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981126,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981127,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981128,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981131,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981132,981133,981134,981135,981136,981137,981138,981139],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [9811111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981132,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981133,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981134,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981135,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981136,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981137,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981138,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981139,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981141,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981142,981143,981144,981145,981146,981147,981148,981149],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [9811111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981142,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981143,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981144,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981145,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981146,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981147,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981148,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981149,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981151,
		name: "神兵天降",
		hand: 2,
        combo: 1,
        backSkill: [981152,981153,981154,981155,981156,981157,981158,981159,9811510],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [9811111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 350,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 350,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolem03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolem03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:950,
		skillSound: "treasure_start_rolem",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981152,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981153,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981154,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981155,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981156,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981157,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981158,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 981159,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9811510,
		name: "神兵天降",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 150,
		icon: "undefined",
		shake: 1,
		ShakeFloat: 0.7,
		shakeTime: 150,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolem03",0,3,[-2.5,-2.5,0]]
		],
		hitEffect: [],
		actionTime:750,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit_rolem",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982011,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982012,982013],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [9820111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982012,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982013,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982021,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982022,982023],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [9820111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982022,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982023,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982031,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982032,982033,982034],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [9820111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982032,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982033,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982034,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982041,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982042,982043,982044],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [9820111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982042,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982043,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982044,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982051,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982052,982053,982054,982055],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [9820111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef01",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982052,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982053,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982054,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982055,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef01",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982061,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982062,982063,982064,982065],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [9820611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982062,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982063,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982064,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982065,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982071,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982072,982073,982074,982075,982076],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [9820611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982072,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982073,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982074,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982075,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982076,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982081,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982082,982083,982084,982085,982086],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [9820611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982082,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982083,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982084,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982085,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982086,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982091,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982092,982093,982094,982095,982096,982097],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [9820611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982092,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982093,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982094,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982095,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982096,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982097,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982101,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982102,982103,982104,982105,982106,982107],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [9820611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef02",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982102,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982103,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982104,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982105,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982106,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982107,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef02",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit2_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982111,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982112,982113,982114,982115,982116,982117,982118],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [9821111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982112,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982113,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982114,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982115,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982116,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982117,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982118,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982121,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982122,982123,982124,982125,982126,982127,982128],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [9821111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982122,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982123,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982124,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982125,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982126,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982127,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982128,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982131,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982132,982133,982134,982135,982136,982137,982138,982139],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [9821111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982132,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982133,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982134,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982135,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982136,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982137,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982138,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982139,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982141,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982142,982143,982144,982145,982146,982147,982148,982149],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [9821111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982142,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982143,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982144,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982145,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982146,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982147,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982148,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982149,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982151,
		name: "幻花乱影",
		hand: 2,
        combo: 1,
        backSkill: [982152,982153,982154,982155,982156,982157,982158,982159,9821510],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [9821111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_rolef03",0,2,[0,0,0]],
			["eff_hit_godweapon_rolef03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_rolef",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982152,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982153,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982154,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982155,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982156,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982157,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982158,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 982159,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9821510,
		name: "幻花乱影",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_rolef03",0,3,[-2.5,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit3_rolef",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983011,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983012,983013],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [9830111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg01",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983012,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983013,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983021,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983022,983023],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [9830111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg01",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983022,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983023,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983031,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983032,983033,983034],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [9830111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg01",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983032,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983033,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983034,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983041,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983042,983043,983044],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [9830111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg01",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983042,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983043,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983044,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "2.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983051,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983052,983053,983054,983055],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [9830111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1200,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg01",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg01",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983052,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983053,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983054,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983055,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1000,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg01",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983061,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983062,983063,983064,983065],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [9830611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg02",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983062,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983063,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983064,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983065,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983071,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983072,983073,983074,983075,983076],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [9830611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg02",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983072,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983073,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983074,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983075,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983076,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983081,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983082,983083,983084,983085,983086],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [9830611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg02",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983082,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983083,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983084,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983085,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983086,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983091,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983092,983093,983094,983095,983096,983097],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [9830611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg02",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983092,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983093,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983094,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983095,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983096,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983097,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "3.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983101,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983102,983103,983104,983105,983106,983107],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [9830611,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg02",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg02",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983102,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983103,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983104,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983105,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983106,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983107,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg02",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983111,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983112,983113,983114,983115,983116,983117,983118],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [9831111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg03",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983112,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983113,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983114,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983115,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983116,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983117,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983118,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983121,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983122,983123,983124,983125,983126,983127,983128],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [9831111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg03",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983122,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983123,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983124,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983125,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983126,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983127,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983128,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.6",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983131,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983132,983133,983134,983135,983136,983137,983138,983139],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [9831111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg03",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983132,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983133,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983134,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983135,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983136,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983137,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983138,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983139,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.7",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983141,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983142,983143,983144,983145,983146,983147,983148,983149],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [9831111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg03",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983142,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983143,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983144,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983145,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983146,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983147,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983148,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983149,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "4.8",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983151,
		name: "天煌神引",
		hand: 2,
        combo: 1,
        backSkill: [983152,983153,983154,983155,983156,983157,983158,983159,9831510],
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [9831111,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1350,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_godweapon_roleg03",0,2,[0,0,0]],
			["eff_hit_godweapon_roleg03",200,3,[1.5,1.5,0]]
			
		],
		hitEffect: [],
		actionTime:1200,
		skillSound: "treasure_start_roleg",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983152,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983153,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983154,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,-1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983155,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983156,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983157,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-1.5,1.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983158,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[0,2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 983159,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[2.5,0,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
	s = {
		id: 9831510,
		name: "天煌神引",
		hand: 2,
        combo: 0,
        backSkill: undefined,
		priority: 99,
		skillType: 1,
		castType: 1,
		FollowTarget:0,
		targetType: 15,
		targetAIParam: 0,
		targetLength:30,
		distance: 30,
		isRangeSkill: 1,
		range: 10,
		guideCount: 0,
		guideInterval: 0,
		FlyTime:0,
		FlyEffect:"",
		damageType: 1,
		damagePer: "5",
		damage: "0",
		crit: 0,
		carryBuff: [0,0,0,0,0],
		cdTime: 0,
		initialCDTime:0,
		energyCost: 0,
		bloodDelayTime: 1150,
		icon: "undefined",
		shake: 0,
		ShakeFloat: 0,
		shakeTime: 0,
		backDistance:[5,7],
		skillEffect: [
			
			["eff_hit_godweapon_roleg03",0,3,[-2.5,-2.5,0]]
		],
		hitEffect: [],
		actionTime:1000,
		skillSound: "",
		skillSoundDelay: 0,
		hitSound: "treasure_hit1_roleg",
		delaySpreadSkillTime: 0,
		level: 0,
		buff: undefined,
		cdNextTime: 0
	};

    


table[s.id] = s;
max = 9902725;
min = 901001;
around.min = min;
around.max = max;