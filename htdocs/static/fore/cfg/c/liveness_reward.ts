export const liveness_reward = [
    
    {
         "id": "999900",
         "type": "task_mystic_box",
         "condition_value": 5,
         "liveness": 20,
         "desc": "开启5次神秘宝箱",
         "award": [
             [100002,0],
             [100001,0],
             [100018,1]
         ],
        "fun_key": "random_boss",
        "icon": "menu_role_icon",
        "key": "open_mystic_box",
        "goto": "gotoMysticBox"
    }
    ,
    {
         "id": "999901",
         "type": "task_pet",
         "condition_value": 20,
         "liveness": 15,
         "desc": "灵宠培养20次",
         "award": [
             [100002,0],
             [100001,0],
             [100028,2]
         ],
        "fun_key": "pet",
        "icon": "menu_bag_icon",
        "key": "pet",
        "goto": "gotoSurface,1"
    }
    ,
    {
         "id": "999902",
         "type": "task_equipFB",
         "condition_value": 5,
         "liveness": 15,
         "desc": "装备副本挑战5次",
         "award": [
             [100002,0],
             [100001,0],
             [100004,100]
         ],
        "fun_key": "equip_fb",
        "icon": "menu_function_icon",
        "key": "equip_fb",
        "goto": "gotoEquipFB"
    }
    ,
    {
         "id": "999903",
         "type": "task_instance",
         "condition_value": 5,
         "liveness": 15,
         "desc": "九幽幻境挑战5次",
         "award": [
             [100002,0],
             [100001,0],
             [100005,10]
         ],
        "fun_key": "instance_fb",
        "icon": "recharge_all",
        "key": "instance",
        "goto": "gotoInstance"
    }
    ,
    {
         "id": "999904",
         "type": "task_jjc",
         "condition_value": 2,
         "liveness": 15,
         "desc": "竞技场挑战2次",
         "award": [
             [100002,0],
             [100001,20000],
             [0,0]
         ],
        "fun_key": "arena",
        "icon": "menu_role_icon",
        "key": "arena",
        "goto": "gotoArena"
    }
    ,
    {
         "id": "999905",
         "type": "task_money_tree",
         "condition_value": 4,
         "liveness": 15,
         "desc": "摇钱树完成4次",
         "award": [
             [100002,0],
             [100001,10000],
             [0,0]
         ],
        "fun_key": "money_tree",
        "icon": "menu_bag_icon",
        "key": "money_tree",
        "goto": "gotoMoneyTree"
    }
    ,
    {
         "id": "999906",
         "type": "task_tower_fastsweep",
         "condition_value": 1,
         "liveness": 10,
         "desc": "扫荡天庭秘境1次",
         "award": [
             [100002,0],
             [100001,0],
             [101201,2]
         ],
        "fun_key": "tower",
        "icon": "menu_function_icon",
        "key": "tower_sweep",
        "goto": "gotoTower"
    }
    ,
    {
         "id": "999907",
         "type": "task_dailyFB",
         "condition_value": 6,
         "liveness": 15,
         "desc": "材料副本挑战6次",
         "award": [
             [100002,0],
             [100001,20000],
             [0,0]
         ],
        "fun_key": "daily_fb",
        "icon": "recharge_all",
        "key": "dailyCopy",
        "goto": "gotoDailyFB"
    }
    ,
    {
         "id": "999908",
         "type": "world_speak",
         "condition_value": 1,
         "liveness": 5,
         "desc": "在世界频道发言1次",
         "award": [
             [100002,0],
             [100001,5000],
             [0,0]
         ],
        "fun_key": null,
        "icon": "menu_function_icon",
        "key": "world_speak",
        "goto": "undefined"
    }
    ,
    {
         "id": "999909",
         "type": "rank_pt",
         "condition_value": 5,
         "liveness": 5,
         "desc": "排行榜扔蛋或送花共5次",
         "award": [
             [100002,0],
             [100001,5000],
             [0,0]
         ],
        "fun_key": null,
        "icon": "recharge_all",
        "key": "rank_pt",
        "goto": "gotoAllRank"
    }
    ,
    {
         "id": "999910",
         "type": "treasure_hexagram",
         "condition_value": 2,
         "liveness": 10,
         "desc": "神兵铸魂2次",
         "award": [
             [100002,0],
             [100001,0],
             [100017,2]
         ],
        "fun_key": "magic_activate",
        "icon": "menu_bag_icon",
        "key": "treasure_hexagram",
        "goto": "gotoMagic,1"
    }
    ,
    {
         "id": "999911",
         "type": "equip_intensify",
         "condition_value": 1,
         "liveness": 10,
         "desc": "装备强化1次",
         "award": [
             [100002,0],
             [100001,0],
             [100004,50]
         ],
        "fun_key": "equip_level",
        "icon": "menu_function_icon",
        "key": "equip_intensify",
        "goto": "gotoForge"
    }
    ,
    {
         "id": "999912",
         "type": "equip_melt",
         "condition_value": 80,
         "liveness": 10,
         "desc": "熔炼80件装备",
         "award": [
             [100002,0],
             [100001,0],
             [100004,50]
         ],
        "fun_key": "reclaim",
        "icon": "recharge_all",
        "key": "equip_melt",
        "goto": "gotoBag"
    }
    ,
    {
         "id": "999913",
         "type": "equip_wash",
         "condition_value": 2,
         "liveness": 5,
         "desc": "洗练2次红色装备",
         "award": [
             [100002,0],
             [100001,0],
             [100015,5]
         ],
        "fun_key": "equip_red_wash",
        "icon": "menu_bag_icon",
        "key": "equip_wash",
        "goto": "gotoForge,4"
    }
    ,
    {
         "id": "999914",
         "type": "gest_fight",
         "condition_value": 2,
         "liveness": 10,
         "desc": "心法挑战2次",
         "award": [
             [100002,0],
             [100001,0],
             [101302,1]
         ],
        "fun_key": "gest",
        "icon": "menu_function_icon",
        "key": "gest_fight",
        "goto": "gotoGest"
    }
    ,
    {
         "id": "999915",
         "type": "gest_inherit",
         "condition_value": 2,
         "liveness": 5,
         "desc": "心法传承2次",
         "award": [
             [100002,0],
             [100001,0],
             [101302,1]
         ],
        "fun_key": "gest",
        "icon": "recharge_all",
        "key": "gest_inherit",
        "goto": "gotoGest"
    }
    
];