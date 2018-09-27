/**
 * @description 2d文本节点的textcfg
 */
export const textcfg = {
    //激活的敌方
    "fight_active_enemy": {
        "font": "normal bold 16px arial,serif",
        "space": -1,
		"color": "#ff0000",
        "hfactor":1.8,
        "isPowerOfTwo": true,
        "strokeWidth": 2,
        "strokeColor": "rgb(31,31,31)",
        "textAlign":"center"
    },
    //未激活的敌方
    "fight_noactive_enemy": {
        "font": "normal bold 16px arial,serif",
        "color": "#ffff00",
        "space": -1,
        "hfactor": 1.8,
        "strokeWidth": 2,
        "strokeColor": "rgb(31,31,31)",
        "isPowerOfTwo": true,
        "textAlign":"center"
    },
    //自己
    "fight_own": {
        "font": "normal bold 16px arial,serif",
        "space": -3,
		"color": "#39e226",
        "hfactor":1.8,
        "strokeWidth": 2,
        "strokeColor": "rgb(31,31,31)",
        "isPowerOfTwo":true,
        "textAlign":"center"
    },
    //其他fighter
    "fight_other": {
        "font": "normal bold 16px arial,serif",
        "space": -3,
		"color": "#ffffff",
        "hfactor":1.8,
        "strokeWidth": 2,
        "strokeColor": "rgb(31,31,31)",
        "isPowerOfTwo":true,
        "textAlign":"center"
    },
    //战斗头像BOSS等级
    "boss_level":{
        "font": "normal 400 24px mnjsh",
        "color": "#b5e8ff",
        "isPowerOfTwo": true,
        "hfactor": 1.8,
        "textAlign":"center",
        "text": "Lv0123456789",
        "strokeWidth": 1,
        "strokeColor": "rgb(27,13,8)",
    },
    //战斗头像BOSS血量
    "boss_boold":{
        "font": "normal 400 26px mnjsh",
        "color": "#ffffff",
        "isPowerOfTwo": true,
        "hfactor": 1.8,
        "strokeWidth": 1,
        "space": -1,
        "strokeColor": "rgb(0,0,0)",
        "text": "0123/+456789万",
        "textAlign":"center"
    },
    //战斗头像的名字
    "fight_name": {
        "font": "normal 400 32px mnjsh",
        "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "25%", "steps": [0, "rgb(246,240,196)", 1, "rgb(212,159,67)"] },
        "hfactor": 1.8,
        "isPowerOfTwo": true,
        "strokeWidth": 1,
        "space": -4,
        "strokeColor": "rgb(27,13,8)",
        "textAlign":"left"
    },
    "damage":{
        "font": "normal 400 24px mnjsh",
        "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "75%", "steps": [0, "rgb(255,219,193)", 0.4 , "rgb(249,38,38)", 1, "rgb(199,34,36)"] },
        "textAlign": "center",
        "hfactor":2.0,
        "factor":1.4,
        "strokeWidth": 2,
        "strokeColor": "rgb(24,13,9)",
        "isPowerOfTwo":true,
        "space": -6,
    },
    "damageM":{
        "font": "normal 400 24px mnjsh",
        "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "75%", "steps": [0, "rgb(255,253,193)", 0.4 , "rgb(255,250,116)", 1, "rgb(215,131,0)"] },
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.4,
        "strokeWidth": 2,
        "strokeColor": "rgb(24,13,9)",
        "isPowerOfTwo":true,
        "space": -6,
    },
    "stealHP":{
        "font": "normal 400 24px mnjsh",
        "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "75%", "steps": [0, "rgb(229,255,193)", 0.4 , "rgb(133,237,31)", 1, "rgb(77,156,24)"] },
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.4,
        "strokeWidth": 2,
        "strokeColor": "rgb(24,13,9)",
        "isPowerOfTwo":true,
        "space": -6,
    },
    "critical":{
        "font": "normal 400 30px hanyi",
        "color": { "x1": 0, "y1": "13%", "x2": 0, "y2": "60%", "steps": [0, "rgb(255,254,198)", 0.4 , "rgb(236,234,107)", 0.6, "rgb(229,75,21)"] },
        "textAlign": "center",
        "hfactor":1.8,  
        "factor":1.4, 
        "strokeWidth": 1,
        "strokeColor": "rgb(24,13,9)",
        "space": -8,
        "isPowerOfTwo":true
    },
    //荒野降魔我的伤害
    "publicbossrank":{
        "font": "normal 400 20px arial,seriff",
        "color": "#fde7ca",
        "textAlign": "center",
        "hfactor":1.8,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true
    },
    //FPS
    "nodeFps":{
        "font": "normal 400 28px xxxxx",
        "color": "#ffffff",
        "textAlign": "center",
        "hfactor":1.8,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon":true,
        "text": "0123456789.:;zxcvbnmasdfghjklqwertyuiop"
    }
};