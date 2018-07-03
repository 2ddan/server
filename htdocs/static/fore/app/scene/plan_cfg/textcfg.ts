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
    //pvp中结束战斗时间的倒计时
    "time_cutdown": {
        "font": "normal 400 17px kaiti",
        "color": "#ffffff",
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "hfactor": 1.0,
        "isPowerOfTwo": true,
        "isCommon": true,
        "text": "0123456789:后结束战斗"
    },
    //战斗头像的战斗力、等级
    "fight_power_level": {
        "font": "normal 400 21px arial,serif",
        "color": "#ffffff",
        "isPowerOfTwo": true,
        "isCommon": true,
        "hfactor": 1.8,
        "text": "0123/+456789万"
    },//战斗头像BOSS等级
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
    //野外掉落包裹
    "drop": {
        "font": "normal 400 24px arial,serif",
        "color": "#ffffff",
        "isPowerOfTwo": true,
        "isCommon": true,
        "hfactor": 1.8,
        "text": "0123/+456789"
    },
    //技能里的名字
    "skill_name": {
        "font": "normal 400 29px arial,serif",
        "color": "#ddb46a",
        "textAlign": "center",
        "hfactor": 1.8,
        "isPowerOfTwo": true
    },
    //技能里的次数
    "skill_time": {
        "font": "normal 400 29px arial,serif",
        "color": "#ffffff",
        "isPowerOfTwo": true,
        "isCommon": true,
        "text": "0123456789"
    },
    //伙伴名字
    "friend_name":{
        "font": "normal 400 17px arial,serif",
        "color": "#ddb46a",
        "hfactor":1.8,
        "textAlign": "center",
        "isPowerOfTwo":true
    },
    //伙伴技能冷却时间
    "skill_cd":{
        "font": "normal 400 23px arial,serif",
        "color": "#ffffff",
        "textAlign": "center",
        "hfactor":1.8,
        "isPowerOfTwo":true,
        "isCommon": true,
        "text":"0123456789"
    },
    //除魔卫道奖励数字
    "reber_award":{
        "font": "normal 400 21px kaiti_bold",
        "color": "#ffffff",
        "textAlign": "left",
        "hfactor":1.8,
        "isPowerOfTwo":true,
        "isCommon": true,
        "text": "0123456789"
    },
    //除魔卫道输出、击杀数
    "rebel_info":{
        "font": "normal 400 21px kaiti_bold",
        "color": "#e3d8bb",
        "textAlign": "left",
        "hfactor":1.8,
        "isPowerOfTwo":true,
        "isCommon": true,
        "text": "0123/+456789万"
    },
    //除魔卫道倒计时
    "rebel_cutdowm_time":{
        "font": "normal 400 21px kaiti",
        "color": "#70ed5c",
        "textAlign": "left",
        "hfactor":1.8,
        "isPowerOfTwo":true,
        "isCommon": true,
        "text": "0123/:456789万"
    },
    //协作任务相关信息(波数、积分、代币)
    "team_info":{
        "font": "normal 400 20px kaiti_bold",
        "color": "#e3d8bb",
        "textAlign": "left",
        "strokeWidth": 1,
        "strokeColor": "rgb(28,28,47)",
        "hfactor":1.8,
        "isPowerOfTwo":true,
    },
    //协作任务数据名称配置
    "team_info_name":{
        "font": "normal 400 19px kaiti_bold",
        "color": "#f6973b",
        "textAlign": "left",
        "strokeWidth": 1,
        "strokeColor": "rgb(20,7,2)",
        "hfactor":1.8,
        "isPowerOfTwo":true,  
    },
    //协作任务倒计时
    "team_cut_down":{
        "font": "normal 400 19px kaiti_bold",
        "color": "#70ed5c",
        "textAlign": "left",
        "strokeWidth": 1,
        "strokeColor": "rgb(28,28,47)",
        "hfactor":1.8,
        "isPowerOfTwo":true,  
    },
    //敌方暴击伤害字体
    "tdamage1":{
        "font": "normal 400 39px kaiti_bold",
        "color": "#c20000",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 3,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -6,
        "text": "+-0123/:456789万"
    },
    //非暴击伤害
    "tdamage0":{
        "font": "normal 400 21px arial,serif",
        "color": "#ff1200",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 2,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -3,
        "text": "+-0123/:456789万"
    },
       //己方暴击伤害字体
    "fdamage1":{
        "font": "normal 400 39px kaiti_bold",
        "color": "#ffffff",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 3,
        "strokeColor": "rgb(96,65,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -6,
        "text": "+-0123/:456789万"
    },
    //非暴击伤害
    "fdamage0":{
        "font": "normal 400 21px arial,serif",
        "color": "#ffffff",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 2,
        "strokeColor": "rgb(210,144,50)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -3,
        "text": "+-0123/:456789万"
    },
    //敌方暴击治疗
    "tstealHP1":{
        "font": "normal 400 39px kaiti_bold",
        "color": "#c20000",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 3,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -6,
        "text": "+-0123/:456789万"
    },
    //敌方非暴击治疗
    "tstealHP0":{
        "font": "normal 400 21px arial,serif",
        "color": "#ff1200",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 2,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -3,
        "text": "+-0123/:456789万"
    },
    //我方暴击治疗
    "fstealHP1":{
        "font": "normal 400 39px kaiti_bold",
        "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,255,255)", 1, "rgb(56,231,46)"] },
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 3,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -6,
        "text": "+-0123/:456789万"
    },
    //我方非暴击治疗
    "fstealHP0":{
        "font": "normal 400 21px arial,serif",
        "color": "#36f928",
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "strokeWidth": 2,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true,
        "isCommon": true,
        "space": -3,
        "text": "+-0123/:456789万"
    },
    //协作任务玩家输出
    "team_damage":{
        "font": "normal 400 40px mnjsh",
        "color": "#FF6C00",
        "textAlign": "center",
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "hfactor":1.8,
        "isPowerOfTwo":true
    },
    //场景复活数字
    "scene_revive":{
        "font": "normal 400 25px kaiti_bold",
        "color": "#ff1800",
        "textAlign": "center",
        "hfactor":1.8,
        "isPowerOfTwo":true, 
        "isCommon":true,
        "text":"0123456789"
    },
    //工会BOSS倒计时
    "gongboss_time":{
        "font": "normal 400 20px kaiti",
        "color": "#ff4e00",
        "textAlign": "center",
        "strokeWidth": 1,
        "strokeColor": "rgb(28,28,47)",
        "hfactor":1.8,
        "isPowerOfTwo":true, 
        "isCommon":true,
        "text":"0123456789:"
    },
    //工会战公会占领地
    "gangfightname":{
        "font": "normal 400 16px kaiti",
        "color": "#ffffff",
        "textAlign": "center",
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "hfactor":1.8,
        "space":-2,
        "isPowerOfTwo":true
    },
    //工会战公会积分
    "gangfightscore":{
        "font": "normal 400 16px kaiti_bold",
        "color": "#ffffff",
        "textAlign": "left",
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "hfactor":1.8,
        "isPowerOfTwo":true
    },
    //工会战占领倒计时
    "gangfighttime":{
        "font": "normal 400 34px kaiti_bold",
        "color": "#ff1800",
        "textAlign": "center",
        "hfactor":1.8,
        "isPowerOfTwo":true
    },
    //公会战倍数
    "gangfightbeishu":{
        "font": "normal 400 26px kaiti_bold",
        "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(246,214,187)", 1, "rgb(226,121,36)"] },
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.2,
        "space":-6,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true
    },
    //公会战房间
    "gangfighthouse":{
        "font": "normal 400 20px kaiti_bold",
        "color": "#f1cf9f",
        "textAlign": "left",
        "hfactor":1.8,
        "space":-3,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true
    },
    //公会战人数
    "gangfightnumber":{
        "font": "normal 400 19px arial,serif",
        "color": "#9dff7f",
        "textAlign": "left",
        "hfactor":1.8,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true
    }, 
    "damage":{
        "font": "normal 400 24px mnjsh",
        "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "75%", "steps": [0, "rgb(255,219,193)", 0.4 , "rgb(249,38,38)", 1, "rgb(199,34,36)"] },
        "textAlign": "center",
        "hfactor":2.0,
        "factor":1.4,
        "strokeWidth": 2,
        "strokeColor": "rgb(24,13,9)",
        // "isCommon":true,
        "isPowerOfTwo":true,
        "space": -6,
        // "text": "+-0123/:456789万"
    },
    "damageM":{
        "font": "normal 400 24px mnjsh",
        "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "75%", "steps": [0, "rgb(255,253,193)", 0.4 , "rgb(255,250,116)", 1, "rgb(215,131,0)"] },
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.4,
        "strokeWidth": 2,
        "strokeColor": "rgb(24,13,9)",
        // "isCommon":true,
        "isPowerOfTwo":true,
        "space": -6,
        // "text": "+-0123/:456789万"
    },
    "stealHP":{
        "font": "normal 400 24px mnjsh",
        "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "75%", "steps": [0, "rgb(229,255,193)", 0.4 , "rgb(133,237,31)", 1, "rgb(77,156,24)"] },
        "textAlign": "center",
        "hfactor":1.8,
        "factor":1.4,
        "strokeWidth": 2,
        "strokeColor": "rgb(24,13,9)",
        // "isCommon":true,
        "isPowerOfTwo":true,
        "space": -6,
        // "text": "+-0123/:456789万"
    },
    "critical":{
        "font": "normal 400 28px hanyi",
        "color": { "x1": 0, "y1": "13%", "x2": 0, "y2": "60%", "steps": [0, "rgb(255,254,198)", 0.4 , "rgb(236,234,107)", 0.6, "rgb(229,75,21)"] },
        "textAlign": "center",
        "hfactor":1.8,  
        "factor":1.4, 
        "strokeWidth": 1,
        "strokeColor": "rgb(24,13,9)",
        "space": -8,
        // "isCommon":true,
        "isPowerOfTwo":true,
        // "text":"0123456789:/+-万暴击"
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
    //荒野降魔我的伤害
    "publicbossGreenrank":{
        "font": "normal 400 20px arial,seriff",
        "color": "#50cf2c",
        "textAlign": "center",
        "hfactor":1.8,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true
    },
    //荒野降魔排行榜
    "publicbossmyrank":{
        "font": "normal 400 28px mnjsh",
        "color": "#fde7ca",
        "textAlign": "center",
        "hfactor":1.8,
        "strokeWidth": 1,
        "strokeColor": "rgb(0,0,0)",
        "isPowerOfTwo":true
    },
    //荒野降魔排队时间
    "publicbossLineTime":{
        "font": "normal 400 20px mnjsh",
        "color": "#51e650",
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