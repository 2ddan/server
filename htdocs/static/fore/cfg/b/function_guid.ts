const tab = [];

tab.push({
    "id": 0,
    "level_limit": 2,
    "stage_id": null,
    "name": "技能开启",
    "key": "skill2",
    "desc": "强力技能开启，能力提升",
    "award": [[100016,20], ["100001", 0], ["100002", 0]],
    "icon": "undefined",
    "target_point": [0,0],
    "music": "music-skill",
    "guide_text": "有新技能可以开启，赶快激活看看吧！",
    "func_tips": "role-skill"
})

tab.push({
    "id": 1,
    "level_limit": null,
    "stage_id": 2,
    "name": "装备强化",
    "key": "equip_level",
    "desc": "装备强化可以增强装备的基础属性",
    "award": [[420003,1],[100004,20], ["100001", 5000], ["100002", 0]],
    "icon": "menu_red_icon",
    "target_point": [0,1],
    "music": "music-equip_level",
    "guide_text": "强化装备可以更好的发挥装备的实力！",
    "func_tips": "equip-level"
})

tab.push({
    "id": 2,
    "level_limit": null,
    "stage_id": 3,
    "name": "装备熔炼",
    "key": "reclaim",
    "desc": "熔炼掉不需要的装备可以获得强化石",
    "award": [[420002,10],[420005,10], ["100001", 0], ["100002", 0]],
    "icon": "menu_role_icon",
    "target_point": [0,2],
    "music": "music-reclaim",
    "guide_text": "熔炼掉不需要的装备可以获得大量强化石哦！",
    "func_tips": "bag-reclaim"
})

tab.push({
    "id": 3,
    "level_limit": null,
    "stage_id": 4,
    "name": "神兵",
    "key": "magic_activate",
    "desc": "神兵一出八方皆灭，瞬间消灭大量敌人",
    "award": [[150002,100], ["100001", 0], ["100002", 0]],
    "icon": "menu_magic_icon",
    "target_point": [0,0],
    "music": "music-magic_activate",
    "guide_text": "使用神兵可以瞬间消灭大量敌人！",
    "func_tips": "role-magic_activate"
})

tab.push({
    "id": 4,
    "level_limit": 15,
    "stage_id": null,
    "name": "技能开启",
    "key": "skill3",
    "desc": "强力技能开启，能力提升",
    "award": [[100016,20], ["100001", 0], ["100002", 0]],
    "icon": "undefined",
    "target_point": [0,0],
    "music": "music-skill",
    "guide_text": "有新技能可以开启，赶快激活看看吧！",
    "func_tips": "role-skill"
})

tab.push({
    "id": 5,
    "level_limit": null,
    "stage_id": 5,
    "name": "试炼副本",
    "key": "exp_fb",
    "desc": "挑战获得大量经验和珍贵红装材料，错过不在有！",
    "award": [[100004,50], ["100001", 0], ["100002", 0]],
    "icon": "menu_equipFb_icon",
    "target_point": [0,4],
    "music": "music-exp_fb",
    "guide_text": "挑战获得大量经验和珍贵红装材料，错过不在有！",
    "func_tips": "explore-exp_fb"
})

tab.push({
    "id": 6,
    "level_limit": null,
    "stage_id": 6,
    "name": "七日活动",
    "key": "sevendays",
    "desc": "参加七日活动可以让战力大量飙升",
    "award": [0,0, ["100001", 5000], ["100002", 50]],
    "icon": "menu_sevenday_icon",
    "target_point": [2,3],
    "music": "music-sevendays",
    "guide_text": "参加七日活动可以快速提升战力，还有红色武器相送哦！",
    "func_tips": "sevendays"
})

tab.push({
    "id": 7,
    "level_limit": null,
    "stage_id": 7,
    "name": "灵宠",
    "key": "pet",
    "desc": "灵宠通灵，伴你闯荡江湖",
    "award": [0,0, ["100001", 50000], ["100002", 0]],
    "icon": "menu_pet_icon",
    "target_point": [0,0],
    "music": "music-pet",
    "guide_text": "快来领养一只属于你的小可爱吧！",
    "func_tips": "role-pet"
})

tab.push({
    "id": 8,
    "level_limit": null,
    "stage_id": 7,
    "name": "摇钱树",
    "key": "money_tree",
    "desc": "摇钱树可以获取大量银两",
    "award": [0,0, ["100001", 10000], ["100002", 0]],
    "icon": "menu_moneyTree_icon",
    "target_point": [1,3],
    "music": "music-money_tree",
    "guide_text": "摇钱树可以获得大量银两，更有一百倍大奖等你来拿！",
    "func_tips": "daily_act-money_tree"
})

tab.push({
    "id": 9,
    "level_limit": null,
    "stage_id": 8,
    "name": "装备宝石",
    "key": "equip_gem",
    "desc": "镶嵌宝石，获得强力属性提升",
    "award": [[100008,2],[100013,2], ["100001", 0], ["100002", 0]],
    "icon": "menu_gem_icon",
    "target_point": [0,1],
    "music": "music-equip_gem",
    "guide_text": "强化宝石可以让战力飙升哦！",
    "func_tips": "equip-diam"
})

tab.push({
    "id": 10,
    "level_limit": null,
    "stage_id": 8,
    "name": "商店",
    "key": "store",
    "desc": "有钱任性，元宝买买买！",
    "award": [0,0, ["100001", 0], ["100002", 100]],
    "icon": "menu_shop_icon",
    "target_point": [3,0],
    "music": "music-store",
    "guide_text": "快来商店看看有没有心仪的道具吧，还有意想不到的折扣哦！",
    "func_tips": "store"
})

tab.push({
    "id": 11,
    "level_limit": null,
    "stage_id": 9,
    "name": "天庭秘境",
    "key": "tower",
    "desc": "挑战自我，更上一层楼，可获取大量宝石",
    "award": [[101201,5], ["100001", 0], ["100002", 0]],
    "icon": "menu_tower_icon",
    "target_point": [0,4],
    "music": "music-tower",
    "guide_text": "天庭秘境可以掉落大量稀有材料，快来挑战吧！",
    "func_tips": "explore-tower"
})

tab.push({
    "id": 12,
    "level_limit": null,
    "stage_id": 10,
    "name": "门派",
    "key": "gang",
    "desc": "创建门派，广收门徒，成为大家宗师！",
    "award": [0,0, ["100001", 5000], ["100002", 100]],
    "icon": "pic_gang",
    "target_point": [0,3],
    "music": "music-gang",
    "guide_text": "加入门派大家庭跟小伙伴们一起玩耍吧！",
    "func_tips": "gang"
})

tab.push({
    "id": 13,
    "level_limit": null,
    "stage_id": 12,
    "name": "材料副本",
    "key": "daily_fb",
    "desc": "各种材料快速获取，每日必去之地",
    "award": [[100004,100], ["100001", 10000], ["100002", 0]],
    "icon": "menu_dailyFb_icon",
    "target_point": [0,4],
    "music": "music-daily_fb",
    "guide_text": "材料副本中可以产出大量珍贵材料哟！",
    "func_tips": "explore-dailyFb"
})

tab.push({
    "id": 14,
    "level_limit": null,
    "stage_id": 16,
    "name": "神秘宝物",
    "key": "random_boss",
    "desc": "开启神秘宝箱，获得红色赋灵材料和宝石",
    "award": [[100018,1], ["100001", 0], ["100002", 0]],
    "icon": "random_boss",
    "target_point": [0,4],
    "music": "music-random_boss",
    "guide_text": "消灭守卫可以在神秘宝箱里开启神秘宝物哦！",
    "func_tips": "explore-randomBox"
})

tab.push({
    "id": 15,
    "level_limit": 40,
    "stage_id": null,
    "name": "技能开启",
    "key": "skill4",
    "desc": "强力技能开启，能力提升",
    "award": [[100016,20], ["100001", 0], ["100002", 0]],
    "icon": "undefined",
    "target_point": [0,0],
    "music": "music-skill",
    "guide_text": "有新技能可以开启，赶快激活看看吧！",
    "func_tips": "role-skill"
})

tab.push({
    "id": 16,
    "level_limit": null,
    "stage_id": 18,
    "name": "荒野降魔",
    "key": "public_boss",
    "desc": "各凭本事，虐夺大量红色稀有材料！",
    "award": [0,0, ["100001", 20000], ["100002", 0]],
    "icon": "menu_arena_icon",
    "target_point": [0,5],
    "music": "undefined",
    "guide_text": "组队击杀boss，获得各种红色材料和特级稀有橙色装备！",
    "func_tips": "new_fun-public_boss"
})

tab.push({
    "id": 17,
    "level_limit": null,
    "stage_id": 20,
    "name": "装备副本",
    "key": "equip_fb",
    "desc": "橙装产出地，千万不要错过",
    "award": [[450305,1], ["100001", 0], ["100002", 0]],
    "icon": "menu_equipFb_icon",
    "target_point": [0,4],
    "music": "music-equip_fb",
    "guide_text": "挑战装备副本可以获得极品装备哦！",
    "func_tips": "explore-equipFb"
})

tab.push({
    "id": 18,
    "level_limit": null,
    "stage_id": 22,
    "name": "竞技场",
    "key": "arena",
    "desc": "和他人同场竞技，成就武林第一人",
    "award": [[150004,1000], ["100001", 0], ["100002", 0]],
    "icon": "menu_arena_icon",
    "target_point": [0,4],
    "music": "music-arena",
    "guide_text": "快来竞技场跟小伙伴们一决高下吧！",
    "func_tips": "explore-arena"
})

tab.push({
    "id": 19,
    "level_limit": null,
    "stage_id": 22,
    "name": "成长基金",
    "key": "investment",
    "desc": "小投资大回报，成长基金祝你盆钵满盈",
    "award": [0,0, ["100001", 5000], ["100002", 0]],
    "icon": "menu_growthFund_icon",
    "target_point": [1,1],
    "music": "music-investment",
    "guide_text": "小投入大回报，投资成长基金可以赚到超高倍的返利哦！",
    "func_tips": "activities-104"
})

tab.push({
    "id": 20,
    "level_limit": null,
    "stage_id": 24,
    "name": "装备升星",
    "key": "equip_star",
    "desc": "装备升星，激发超强潜力，提高战斗力",
    "award": [[100005,100], ["100001", 10000], ["100002", 0]],
    "icon": "menu_gem_icon",
    "target_point": [0,1],
    "music": "music-equip_star",
    "guide_text": "装备升星可以整体提升装备属性，战力飞越不是梦哟",
    "func_tips": "equip-star"
})

tab.push({
    "id": 21,
    "level_limit": null,
    "stage_id": 26,
    "name": "龙魂",
    "key": "soul",
    "desc": "修炼龙魂，明净清志，可大幅提升战力",
    "award": [[100019,5],[100020,5], ["100001", 10000], ["100002", 0]],
    "icon": "menu_dargon_icon",
    "target_point": [0,0],
    "music": "music-soul",
    "guide_text": "修炼龙魂可以大幅度提高战斗力哟！",
    "func_tips": "role-soul"
})

tab.push({
    "id": 22,
    "level_limit": null,
    "stage_id": 30,
    "name": "九幽幻境",
    "key": "instance_fb",
    "desc": "可获得大量的元宝和龙魂材料，每日必去之地！",
    "award": [[100020,10], ["100001", 0], ["100002", 0]],
    "icon": "menu_instance_icon",
    "target_point": [0,4],
    "music": "music-instance_fb",
    "guide_text": "首次挑战九幽幻境可以获得大量元宝，快来领取福利吧！",
    "func_tips": "explore-instance"
})

tab.push({
    "id": 23,
    "level_limit": 80,
    "stage_id": null,
    "name": "神装锻造",
    "key": "equip_red_forge",
    "desc": "绝世神装，谁主沉浮，大幅提升战斗力",
    "award": [[100029,5], ["100001", 0], ["100002", 0]],
    "icon": "menu_red_icon",
    "target_point": [0,1],
    "music": "music-equip_red_forge",
    "guide_text": "神装一出谁与争锋，快锻造一件属于自己的神装吧",
    "func_tips": "equip-red"
})

tab.push({
    "id": 24,
    "level_limit": 82,
    "stage_id": null,
    "name": "神装洗练",
    "key": "equip_red_wash",
    "desc": "可改变神装的附加属性，大幅提升战斗力",
    "award": [[100015,20], ["100001", 10000], ["100002", 0]],
    "icon": "menu_wash_icon",
    "target_point": [0,1],
    "music": "music-equip_red_wash",
    "guide_text": "洗练神装可以强化它的附加属性！",
    "func_tips": "equip-wash"
})

tab.push({
    "id": 25,
    "level_limit": 90,
    "stage_id": null,
    "name": "阵法",
    "key": "gest",
    "desc": "心法绝学，潜心修习，可获得大量战力",
    "award": [[800040,2],[800035,1], ["100001", 0], ["100002", 0]],
    "icon": "menu_gest_icon",
    "target_point": [0,0],
    "music": "music-gest",
    "guide_text": "集齐阵法可以提升大量属性哦！",
    "func_tips": "role-gest"
})

tab.push({
    "id": 26,
    "level_limit": 90,
    "stage_id": null,
    "name": "心法奇遇",
    "key": "gest_fb",
    "desc": "心法奇遇，挑战可获得大量心法哦",
    "award": [[800030,1],[150001,800], ["100001", 0], ["100002", 0]],
    "icon": "menu_gestFb_icon",
    "target_point": [0,4],
    "music": "music-gest_fb",
    "guide_text": "挑战心法奇遇即可获得珍贵的阵法材料！",
    "func_tips": "explore-gest"
})

tab.push({
    "id": 27,
    "level_limit": 95,
    "stage_id": null,
    "name": "赋灵",
    "key": "weapon_soul",
    "desc": " 武器赋灵，提升超强战力，获取华丽特效",
    "award": [[100053,5], ["100001", 10000], ["100002", 0]],
    "icon": "menu_soul_icon",
    "target_point": [0,0],
    "music": "music-weapon_soul",
    "guide_text": "给武器赋灵不仅可以提供强力属性，还可以激活炫酷武器外观！",
    "func_tips": "role-weapon_soul"
})

tab.push({
    "id": 28,
    "level_limit": 200,
    "stage_id": null,
    "name": "离线收益",
    "key": "off_line",
    "desc": "离线也能领福利，快来吧！",
    "award": [0,0, ["100001", 5000], ["100002", 0]],
    "icon": "menu_offLine_icon",
    "target_point": [1,3],
    "music": "music-off_line",
    "guide_text": "离线也可以嗖嗖升级，快来看看离线奖励吧！",
    "func_tips": "daily_act-off_line"
})


export const function_guid = tab;