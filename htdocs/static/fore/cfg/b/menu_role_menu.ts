const tab = [];

tab.push({
    "icon": "menu_skil_icon",
    "text": "技能",
    "func": "gotoSkill",
    "tip_keys": ["role.skill"],
    "fun_key": null
})
tab.push({
    "icon": "menu_magic_icon",
    "text": "神兵",
    "func": "gotoMagic",
    "tip_keys": ["role.magic_activate"],
    "fun_key": "magic_activate"
})
tab.push({
    "icon": "menu_gest_icon",
    "text": "心法",
    "func": "gotoInherit",
    "tip_keys": ["role.gest"],
    "fun_key": "gest"
})
tab.push({
    "icon": "menu_dargon_icon",
    "text": "龙魂",
    "func": "gotoSoul",
    "tip_keys": ["role.soul"],
    "fun_key": "soul"
})
tab.push({
    "icon": "menu_cloth_icon",
    "text": "时装",
    "func": "gotoSurface,0",
    "tip_keys": ["role.cloth"],
    "fun_key": "cloth"
})
tab.push({
    "icon": "menu_pet_icon",
    "text": "灵宠",
    "func": "gotoSurface,1",
    "tip_keys": ["role.pet"],
    "fun_key": "pet"
})
tab.push({
    "icon": "menu_soul_icon",
    "text": "赋灵",
    "func": "gotoWeaponSoul",
    "tip_keys": ["role.weapon_soul"],
    "fun_key": "weapon_soul"
})

export const menu_role_menu = tab;