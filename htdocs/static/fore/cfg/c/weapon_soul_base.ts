let tab = [];

tab.push({
    "class": 0,
    "name": "武灵初起",
    "career_id": [700001,700002,700003],
    "effect": [],
    "cost": [[100052,30],[100054,30], ["100001",500000]],
    "attr": []
})

tab.push({
    "class": 1,
    "name": "融会贯通",
    "career_id": [700001,700002,700003],
    "effect": ["fumo_rolem_01","fumo_rolef_01","fumo_roleg_01"],
    "cost": [[100053,60],[100055,60], ["100001",1000000]],
    "attr": [['damage_multiple',0.03],['un_damage_multiple',0.03]]
})

tab.push({
    "class": 2,
    "name": "出类拔萃",
    "career_id": [700001,700002,700003],
    "effect": ["fumo_rolem_02","fumo_rolef_02","fumo_roleg_02"],
    "cost": [[100052,150],[100054,150], ["100001",2000000]],
    "attr": [['damage_multiple',0.06],['un_damage_multiple',0.06]]
})

tab.push({
    "class": 3,
    "name": "炉火纯青",
    "career_id": [700001,700002,700003],
    "effect": ["fumo_rolem_03","fumo_rolef_03","fumo_roleg_03"],
    "cost": [[100053,300],[100055,300], ["100001",4000000]],
    "attr": [['damage_multiple',0.09],['un_damage_multiple',0.09]]
})

tab.push({
    "class": 4,
    "name": "登峰造极",
    "career_id": [700001,700002,700003],
    "effect": ["fumo_rolem_04","fumo_rolef_04","fumo_roleg_04"],
    "cost": [[100052,500],[100053,500], ["100001",6000000]],
    "attr": [['damage_multiple',0.12],['un_damage_multiple',0.12]]
})

tab.push({
    "class": 5,
    "name": "举世无双",
    "career_id": [700001,700002,700003],
    "effect": ["fumo_rolem_05","fumo_rolef_05","fumo_roleg_05"],
    "cost": [ ["100001",0]],
    "attr": [['damage_multiple',0.15],['un_damage_multiple',0.15]]
})


export const weapon_soul_base = tab;