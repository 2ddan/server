import { Pi } from "app/mod/pi";
    var s, table,arr = [], min = 99999999, max = 0,
	key=["sid","use_mode","count","name","type","use_drop_id","quality","price","attr_id","intact_id","icon","drop_location","describe","folder_pos","drop_module","goto","effect"];
    if(!Pi.sample) {
		Pi.sample = {};
	};
    table = Pi.sample;
    arr.push([100001,-1,["$var",1],"银两","money",-1,1,100001,100001,-1,"res_100001",[],"钱不是万能的，但没有钱是万万不能的！","Item","model_dl_daizi",-1,0]);arr.push([100002,-1,["$var",1],"元宝","diamond",-1,5,100002,100002,-1,"res_100002",[],"有钱！任性！买买买！","Item","model_dl_daizi",-1,1]);arr.push([100003,-1,["$var",1],"经验值","exp",-1,1,100003,100003,-1,"res_100003",[],"经验值是拿来升级的！","Item","model_dl_daizi",-1,0]);arr.push([100004,-1,["$var",1],"强化石","ep_level",-1,2,100004,100004,-1,"res_100004",[[100],[110],[106],[104]],"装备强化时所需要消耗的材料。","Item","model_dl_shitou",6,0]);arr.push([100005,-1,["$var",1],"升星石","ep_star",-1,3,100005,100005,-1,"res_100005",[[100],[105],[106]],"装备升星时所需要消耗的材料。","Item","model_dl_baoshi",7,0]);arr.push([100006,-1,["$var",1],"星泪","ep_star",-1,6,100006,100006,-1,"res_100006",[[200],[201],[202]],"装备升星时所需要消耗的珍贵材料。","Item","model_dl_baoshi",8,1]);arr.push([100007,-1,["$var",1],"生命宝石","stone",-1,4,100007,100007,-1,"res_100007",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100008,-1,["$var",1],"攻击宝石","stone",-1,4,100008,100008,-1,"res_100008",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100009,-1,["$var",1],"防御宝石","stone",-1,4,100009,100009,-1,"res_100009",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100010,-1,["$var",1],"破甲宝石","stone",-1,4,100010,100010,-1,"res_100010",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100011,-1,["$var",1],"命中宝石","stone",-1,4,100011,100011,-1,"res_100011",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100012,-1,["$var",1],"闪避宝石","stone",-1,4,100012,100012,-1,"res_100012",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100013,-1,["$var",1],"暴击宝石","stone",-1,4,100013,100013,-1,"res_100013",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100014,-1,["$var",1],"抗暴宝石","stone",-1,4,100014,100014,-1,"res_100014",[[100],[101],[104],[108]],"装备宝石升级时消耗的材料。","Item","model_dl_baoshi",8,0]);arr.push([100015,-1,["$var",1],"洗练冰晶","ep_wash",-1,6,100015,100015,-1,"res_100015",[[100],[106],[203],[204]],"红色装备洗练时消耗的材料。","Item","model_dl_baoshi",9,0]);arr.push([100016,-1,["$var",1],"技能石","skill_level",-1,2,100016,100016,-1,"res_100016",[[100],[104],[106],[203]],"技能升级时消耗的材料。","Item","model_dl_shitou",1,0]);arr.push([100017,-1,["$var",1],"灵魂之核","stone",-1,2,100017,100017,-1,"res_100017",[[100],[104],[106],[203]],"神兵淬炼时消耗的材料。","Item","model_dl_shitou",4,0]);arr.push([100018,-1,["$var",1],"金钥匙","key",-1,6,100018,100018,-1,"res_100018",[[200],[203],[204]],"金钥匙！可开启宝箱守卫的宝箱获得珍贵赋灵材料。","Item","model_dl_daizi",-1,1]);arr.push([100019,-1,["$var",1],"生命龙魂","soul",-1,4,100019,100019,-1,"res_100019",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100020,-1,["$var",1],"攻击龙魂","soul",-1,4,100020,100020,-1,"res_100020",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100021,-1,["$var",1],"防御龙魂","soul",-1,4,100021,100021,-1,"res_100021",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100022,-1,["$var",1],"破甲龙魂","soul",-1,4,100022,100022,-1,"res_100022",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100023,-1,["$var",1],"命中龙魂","soul",-1,4,100023,100023,-1,"res_100023",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100024,-1,["$var",1],"闪避龙魂","soul",-1,4,100024,100024,-1,"res_100024",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100025,-1,["$var",1],"暴击龙魂","soul",-1,4,100025,100025,-1,"res_100025",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100026,-1,["$var",1],"抗暴龙魂","soul",-1,4,100026,100026,-1,"res_100026",[[100],[106],[104],[105]],"龙魂升级时消耗的材料。","Item","model_dl_shitou",3,0]);arr.push([100027,-1,["$var",1],"神之魂","stone",-1,6,100027,100027,-1,"res_100027",[[107],[203],[109],[200]],"可用于提高红色装备的等级。","Item","model_dl_shitou",11,1]);arr.push([100028,-1,["$var",1],"灵石","stone",-1,5,100028,100028,-1,"res_100028",[[100],[106],[203]],"灵宠养成时消耗的材料。","Item","model_dl_baoshi",12,0]);arr.push([100029,-1,["$var",1],"玄金晶","stone",-1,6,100029,100029,-1,"res_100029",[[203],[109],[200],[201]],"集齐100个可用于锻造红色装备，也可以转化为神之魂。","Item","model_dl_baoshi",11,1]);arr.push([100030,-1,["$var",1],"玄晶符","stone",-1,6,100030,100030,-1,"res_100030",[[200],[201],[202]],"集齐25个玄晶符可召唤灵宠:玄晶兽","Item","model_dl_daizi",-1,1]);arr.push([100031,-1,["$var",1],"召唤符2","stone",-1,5,100031,100031,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100032,-1,["$var",1],"召唤符3","stone",-1,5,100032,100032,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100033,-1,["$var",1],"召唤符4","stone",-1,5,100033,100033,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100034,-1,["$var",1],"召唤符5","stone",-1,5,100034,100034,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100035,-1,["$var",1],"召唤符6","stone",-1,5,100035,100035,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100036,-1,["$var",1],"召唤符7","stone",-1,5,100036,100036,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100037,-1,["$var",1],"召唤符8","stone",-1,5,100037,100037,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100038,-1,["$var",1],"召唤符9","stone",-1,5,100038,100038,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100039,-1,["$var",1],"召唤符10","stone",-1,5,100039,100039,-1,"undefined",[],"兑换灵宠外观的材料,预留，不用就不要配","Item","undefined",-1,1]);arr.push([100040,-1,["$var",1],"锦缎","stone",-1,6,100040,100040,-1,"res_100040",[[200],[201],[202]],"集齐20个可兑换稀有时装","Item","model_dl_daizi",-1,1]);arr.push([100041,-1,["$var",1],"布料2","stone",-1,5,100041,100041,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100042,-1,["$var",1],"布料3","stone",-1,5,100042,100042,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100043,-1,["$var",1],"布料4","stone",-1,5,100043,100043,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100044,-1,["$var",1],"布料5","stone",-1,5,100044,100044,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100045,-1,["$var",1],"布料6","stone",-1,5,100045,100045,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100046,-1,["$var",1],"布料7","stone",-1,5,100046,100046,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100047,-1,["$var",1],"布料8","stone",-1,5,100047,100047,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100048,-1,["$var",1],"布料9","stone",-1,5,100048,100048,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100049,-1,["$var",1],"布料10","stone",-1,5,100049,100049,-1,"undefined",[],"兑换时装外观的材料，预留，不用就不要配","Item","undefined",-1,1]);arr.push([100050,-1,["$var",1],"宝石","stone",-1,4,100050,100050,-1,"res_100008",[],"装备宝石升级材料","Item","undefined",-1,0]);arr.push([100051,-1,["$var",1],"龙魂","stone",-1,4,100051,100051,-1,"res_100019",[],"龙魂升级时消耗的材料。","Item","undefined",-1,0]);arr.push([100052,-1,["$var",1],"水之灵","stone",-1,6,100052,100052,-1,"res_100052",[[108],[202],[200]],"赋灵生命材料,突破后可获得武器炫酷特效！","Item","model_dl_baoshi",5,1]);arr.push([100053,-1,["$var",1],"火之灵","stone",-1,6,100053,100053,-1,"res_100053",[[108],[202],[200]],"赋灵攻击材料,突破后可获得武器炫酷特效！","Item","model_dl_baoshi",5,1]);arr.push([100054,-1,["$var",1],"风之灵","stone",-1,6,100054,100054,-1,"res_100054",[[108],[202],[200]],"赋灵防御材料,突破后可获得武器炫酷特效！","Item","model_dl_baoshi",5,1]);arr.push([100055,-1,["$var",1],"雷之灵","stone",-1,6,100055,100055,-1,"res_100055",[[108],[202],[200]],"赋灵破甲材料,突破后可获得武器炫酷特效！","Item","model_dl_baoshi",5,1]);arr.push([100056,-1,["$var",1],"试炼令牌","key",-1,6,100056,100056,-1,"res_100056",[[204],[200],[203],[201]],"神奇钥匙！可开启试炼副本获得大量经验和红装材料","Item","model_dl_daizi",-1,1]);arr.push([100057,-1,["$var",1],"传世秘页","rune_chip",-1,6,100057,100057,-1,"res_100057",[],"分解高级秘籍的产物，用于提升境界！","Item","model_dl_shitou",-1,0]);arr.push([100058,-1,["$var",1],"普通秘页","rune_chip",-1,2,100058,100058,-1,"res_100058",[],"分解低级秘籍的产物，用于打通经脉","Item","model_dl_shitou",-1,0]);arr.push([100059,-1,["$var",1],"神秘装备","stone",-1,2,100059,100059,-1,"res_451209",[],"遗落在时间长河中的装备，分解可获得大量强化石和银两!","Item","undefined",-1,0]);arr.push([101101,"share",["$var",1],"龙魂福袋","box",63600,4,101101,101101,-1,"res_101000",[],"打开可以获得1个随机龙魂！","Item","model_dl_daizi",-1,0]);arr.push([101102,"share_10",["$var",1],"龙魂大福袋","box",63600,4,101102,101102,-1,"res_101000",[],"打开可以获得10个随机龙魂！","Item","model_dl_daizi",-1,0]);arr.push([101103,"recharge",["$var",1],"1元红包","box",[{diamond:10},{vip_exp:10},{recharge:1}],5,101103,101103,-1,"res_101007",[],"打开可以获得10元宝，10vip经验和1元充值额度","Item","model_dl_baoxiang",-1,0]);arr.push([101104,"recharge",["$var",1],"6元红包","box",[{diamond:60},{vip_exp:60},{recharge:6}],5,101104,101104,-1,"res_101007",[],"打开可以获得60元宝，60vip经验和6元充值额度","Item","model_dl_baoxiang",-1,0]);arr.push([101201,"share",["$var",1],"宝石宝箱","box",64001,4,101201,101201,-1,"res_101003",[],"打开可以获得1个随机宝石！","Item","model_dl_baoxiang",-1,0]);arr.push([101202,"share_10",["$var",1],"宝石大宝箱","box",64001,4,101202,101202,-1,"res_101003",[],"打开可以获得10个随机宝石！","Item","model_dl_baoxiang",-1,0]);arr.push([101207,"share",["$var",1],"紫色心法袋","box",64007,4,101207,101207,-1,"res_101000",[],"打开可以获得1个随机紫色心法！","Item","model_dl_daizi",-1,0]);arr.push([101208,"share",["$var",1],"橙色心法袋","box",64006,5,101208,101208,-1,"res_101001",[],"打开可以获得1个随机橙色心法！","Item","model_dl_daizi",-1,0]);arr.push([101209,"share",["$var",1],"红色心法袋","box",64005,6,101209,101209,-1,"res_101002",[],"打开可以获得1个随机红色心法！","Item","model_dl_daizi",-1,1]);arr.push([101301,"choose",["$var",1],"红装宝箱","box",-1,6,101301,101301,-1,"res_101005",[],"打开可以从玄金晶*1和神之魂*5中二选一！","Item","model_dl_baoxiang",-1,1]);arr.push([101302,"share",["$var",1],"心法福袋","box",64201,4,101302,101302,-1,"res_101000",[],"打开可以随机获得一个心法！（大概率获得紫色，小概率获得橙色和红色）","Item","model_dl_daizi",-1,0]);arr.push([101402,"share_unique_8",["$var",1],"宝石惊喜包","box",62002,5,101402,101402,-1,"res_101001",[],"打开可以获得全部8种类型的宝石各1个！","Item","model_dl_daizi",-1,0]);arr.push([101501,"share_unique_3",["$var",1],"战神礼包","box",64301,5,101501,101501,-1,"res_101002",[],"战神的恩赐，打开可以获得强化石*2000、攻击宝石*20、攻击龙魂*30！","Item","model_dl_daizi",-1,0]);arr.push([101601,"choose",["$var",1],"宝石选择箱","box",-1,4,101601,101601,-1,"res_101003",[],"打开可以从攻击宝石*1和生命宝石*1中二选一！","Item","model_dl_baoxiang",-1,0]);arr.push([101602,"choose",["$var",1],"龙魂选择箱","box",-1,4,101602,101602,-1,"res_101003",[],"打开可以从攻击龙魂*1和生命龙魂*1中二选一！","Item","model_dl_baoxiang",-1,0]);arr.push([101603,"share_unique_4",["$var",1],"战神礼包","box",64401,5,101603,101603,-1,"res_101002",[],"战神的礼包，打开可以获得强化石*1000、攻击宝石*10、攻击龙魂*20、技能石100！","Item","model_dl_daizi",-1,0]);arr.push([101604,"share_unique_5",["$var",1],"阵法激活包","box",64402,4,101604,101604,-1,"res_101001",[],"阵法尝鲜礼包，打开可以获得天华冥月决和血月决的全部激活材料！","Item","model_dl_daizi",-1,0]);arr.push([101608,"choose",["$var",1],"星泪选择箱","box",-1,6,101608,101608,-1,"res_101005",[],"打开可以从星泪*100和试炼令牌*33中二选一！","Item","model_dl_baoxiang",-1,1]);arr.push([101609,"share_unique_10",["$var",1],"橙装全套包","box",64406,5,101609,101609,-1,"res_101002",[],"打开可以获得全套的橙色80级属性的变异装备,1级就可穿戴！","Item","model_dl_daizi",-1,1]);arr.push([101701,"share",["$var",1],"赋灵宝箱","box",64501,6,101701,101701,-1,"res_101005",[],"打开可以获得一个随机赋灵材料！","Item","model_dl_baoxiang",-1,1]);arr.push([101801,"share",["$var",1],"红装惊喜箱","box",64601,6,101801,101801,-1,"res_101005",[],"打开必得玄金晶*1或神之魂*1，助你战力飙升！","Item","model_dl_baoxiang",-1,1]);arr.push([101901,-1,["$var",1],"木材","donate",-1,3,101901,101901,-1,"res_101901",[],"门派建设普通材料，可在野外挂机中采集获得","Item","undefined",-1,0]);arr.push([101902,-1,["$var",1],"灵药","donate",-1,3,101902,101902,-1,"res_101902",[],"门派建设普通材料，可在野外挂机中采集获得","Item","undefined",-1,0]);arr.push([101903,-1,["$var",1],"铁矿","donate",-1,4,101903,101903,-1,"res_101903",[],"门派建设罕见材料，可在野外挂机中采集获得","Item","undefined",-1,0]);arr.push([101904,-1,["$var",1],"红铜矿","donate",-1,4,101904,101904,-1,"res_101904",[],"门派建设罕见材料，可在野外挂机中采集获得","Item","undefined",-1,0]);arr.push([101905,-1,["$var",1],"水晶矿","donate",-1,5,101905,101905,-1,"res_101905",[],"门派建设极度稀有材料，可在野外挂机中采集获得","Item","undefined",-1,0]);arr.push([102001,"choose",["$var",1],"神机选择箱","box",-1,6,102001,102001,-1,"res_101005",[],"打开可以从试炼令牌*1和金钥匙*3中二选一！","Item","model_dl_baoxiang",-1,1]);arr.push([102101,"choose",["$var",1],"天赐选择箱","box",-1,6,102101,102101,-1,"res_101005",[],"打开可以从赋灵随机箱*5和红装宝箱*2中二选一！","Item","model_dl_baoxiang",-1,1]);arr.push([102102,"choose",["$var",1],"战力提升包","box",-1,5,102102,102102,-1,"res_101002",[],"打开可以从强化石*1000,精元随机*20和宝石随机*10中三选一","Item","model_dl_daizi",-1,0]);arr.push([102103,"choose",["$var",1],"神兵小福袋","box",-1,3,102103,102103,-1,"res_101000",[],"打开可以从灵魂之核*40和灵魂残片*1333中二选一","Item","model_dl_daizi",-1,0]);arr.push([102104,"choose",["$var",1],"强化培养袋","box",-1,3,102104,102104,-1,"res_101000",[],"打开可以从强化石*1000和银两*40万中二选一","Item","model_dl_daizi",-1,0]);arr.push([102105,"choose",["$var",1],"宠物零食袋","box",-1,3,102105,102105,-1,"res_101000",[],"打开可以从内丹*10和银两*40万中二选一","Item","model_dl_daizi",-1,0]);arr.push([102106,"choose",["$var",1],"传世心法","box",-1,4,102106,102106,-1,"res_101000",[],"打开可以从红色心法随机袋*1和心法残页*4000中二选一","Item","model_dl_daizi",-1,0]);arr.push([102201,"choose",["$var",1],"天赐选择箱","box",-1,6,102201,102201,-1,"res_101005",[],"打开可以从星泪*40,玄晶符*2和锦缎*1中三选一","Item","model_dl_baoxiang",-1,1]);arr.push([102202,"choose",["$var",1],"神兵福袋","box",-1,3,102202,102202,-1,"res_101000",[],"打开可以从灵魂之核*100和灵魂残片*3333中二选一","Item","model_dl_daizi",-1,0]);arr.push([102203,"choose",["$var",1],"装备培养包","box",-1,3,102203,102203,-1,"res_101000",[],"打开可以从洗练冰晶*50或升星石*500或强化石*2500中三选一","Item","model_dl_daizi",-1,0]);arr.push([102301,"share_unique_2",["$var",1],"时光宝箱","box",65001,6,102301,102301,-1,"res_101005",[],"遗落在时间长河中的宝箱，天知道你能开出什么东西!","Item","model_dl_baoxiang",-1,1]);
min = 100001;
max = 102301;
for(var i=0,len = arr.length;i<len;i++){
	s = {};
	for(var k = 0,leng = key.length;k<leng;k++){
		s[key[k]] = arr[i][k];
	}
	table[arr[i][0]] = s;
}