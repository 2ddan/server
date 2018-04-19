
/*
【数字、字母和符号】 的显示，不用每次重绘。需设isCommon=true， show 表示从常用库中提取所需的字符
【中文】 需要每次重绘，故直接输出结果。不需要isCommon 和 show

【颜色】 可以用rgb、16进制颜色码、颜色名 以及渐变色。适用于所有的颜色，包括不限于字体颜色，背景，描边 
【渐变色】 这里只含线性渐变(详情查看pi/ui/imgtext.ts)，(x1,y1)起始点,(x2,y2)结束点，为了让字体留白部分不占用渐变位置，建议渐变方向上起始和结束位置向中间靠拢，steps为渐变颜色，可以接受多个颜色值 
【间距】 包含isCommon=true 在textcfg【外】设置space，否则在textcfg【内】设置space 
【字体】 依次为"常规/斜体 粗细 大小 字体" kaiti_bold => 粗楷体， chenguang => 晨光（排行榜数字）。若需添加非上述字体，须在app/base/style/public.rcss 中添加改字体的font-face引入
【投影】 "shadow": { // 阴影
			"offsetX": number,
			"offsetY": number, //偏移量
			"blur": number, // 模糊值，一般为5
			"color": string; // 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
		};
*/
let color = 0;
export const getCfg = (key, overload) => {
    let cfg: any = {};
    for (var k in cfgs[key]) {
        if (overload[k]) cfg[k] = overload[k];
        else cfg[k] = cfgs[key][k];
    }
    overload.fontSize && (cfg.font = cfg.font.replace(/\b\d+\.*\d*(?=px\b)/, overload.fontSize));
    overload.fontFamily && (cfg.font = cfg.font.replace(/\b\S+$/, overload.fontFamily));
    
    if(color)cfg["color"]=color;
    color=0;
    return cfg;
}
const cfgs = {}

// 属性
cfgs["attr"] = {
    "hfactor": 1.2,
    "zoomfactor": 0,
    "text": "this is attr text",
    "font": "normal 400 18px kaiti_bold",
    "color":"rgb(232,223,178)",
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -4.8
}
// 品质白
cfgs["1"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(231,227,239)", 1, "rgb(166,175,189)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质绿
cfgs["2"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(231,242,224)", 1, "rgb(108,167,72)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质蓝
cfgs["3"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "40%", "x2": 0, "y2": "80%", "steps": [0, "rgb(224,238,242)", 1, "rgb(72,121,167)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1

}
// 品质紫
cfgs["4"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "40%", "x2": 0, "y2": "90%", "steps": [0, "rgb(220,200,241)", 1, "rgb(121,51,181)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质橙
cfgs["5"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(242,213,189)", 1, "rgb(182,104,42)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质红
cfgs["6"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(231,227,239)", 1, "rgb(166,175,189)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}

// 战斗力数字
cfgs["powerNum"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "0123456789.万亿",
    "font": "normal 400 18px mnjsh",
    "color": { "x1": 0, "y1": "45%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,226,124)", 1, "rgb(235,112,38)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -1,
    "isCommon": true
}

// 活动图标名称
cfgs["actName"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px kaiti_bold",
    "color": { "x1": 0, "y1": "40%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,252,243)", 1, "rgb(255,234,178)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}

// 节日活动标题
cfgs["festTitle"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 25px kaiti_bold",
    "color": { "x1": 0, "y1": "35%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,255,89)", 1, "rgb(255,93,37)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(85,50,6)",
    "space": -4
}

//主菜单文字
cfgs["menu_main"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 11px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps":[0, "rgb(255,249,246)", 0.72, "rgb(193,150,86)", 1, "rgb(193,150,86)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(49,34,19)",
    "space": 0
}
cfgs["menu_main_gray"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 11px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps":[0, "rgb(255,249,246)", 0.72, "rgb(217,217,217)", 1, "rgb(217,217,217)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(49,34,19)",
    "space": 0
}


// 主城带圆圈icon
cfgs["iconCircle"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps": [0, "rgb(255,255,255)", 1, "rgb(255,232,169)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -2
}

// 排行榜分类标题
cfgs["rankClass"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps": [0, "rgb(172,125,94)", 1, "rgb(250,229,191)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": 0
}
// 人物装备界面(未装备)
cfgs["heroEquip"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 15px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "90%", "steps": [0, "rgb(255,255,255)", 1, "rgb(205,202,202)"] },
    "space": -2
}

cfgs["equipFastLevel"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 15px SSSSS",
    "color": { "x1": 0, "y1": "50%", "x2": 0, "y2": "95%", "steps": [0, "rgb(255,255,255)", 1, "rgb(205,202,202)"] },
    "space": -2
}


// 人物装备界面(未解锁)
cfgs["heroEquipGray"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 13px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "90%", "steps": [0, "rgb(255,157,109)", 1, "rgb(255,48,0)"] },
    "space": -2
}


// 人物装备界面(未解锁)
cfgs["heroEquipRed"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "90%", "steps": [0, "rgb(178,125,92)", 1, "rgb(136,88,64)"] },
    "space": -2
}

// 人物装备界面(未解锁)
cfgs["heroEquipGreen"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "90%", "steps": [0, "rgb(233,255,109)", 1, "rgb(126,255,0)"] },
    "space": -2
}
// 每日副本xx级开启
cfgs["lvOpenRed"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,157,109)", 1, "rgb(255,48,0)"] },
    "space": -2
}

// xxxx(xxxx)
cfgs["namesss"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px kaiti_bold",
    "color": { "x1": 0, "y1": "70%", "x2": 0, "y2": "30%", "steps": [0, "rgb(255,255,255)", 1, "rgb(255,232,169)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -2
}

// 获取方式(选择宝箱)
cfgs["choseProp"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "40%", "x2": 0, "y2": "60%", "steps": [0, "rgb(231,227,239)", 1, "rgb(166,175,189)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(13,22,46)",
    "space": -4
}

// 排行榜分类标题
cfgs["gangRankClass"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px kaiti_bold",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps": [0, "rgb(172,125,94)", 1, "rgb(250,229,191)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -6
}

// 翅膀阶数
cfgs["wingDegree"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px kaiti_bold",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps": [0, "rgb(223,255,218)", 1, "rgb(58,241,161)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -2
}

//战斗力数字
cfgs["power1"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "italic 400 17px kaiti_bold",
    "color": { "x1": 0, "y1": "60%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,229,88)", 1, "rgb(199,90,42)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -3
}

// 门派名称文字
cfgs["gangName"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px shskjsss",
    "color": { "x1": 0, "y1": "60%", "x2": 0, "y2": "80%", "steps": [0, "#ffffff", 1, "#ffdd80"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -2
}

//门主VIP
cfgs["leaderVip"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal bold 12px shskjsss",
    "color": { "x1": 0, "y1": "40%", "x2": 0, "y2": "90%", "steps": [0, "#fbf7ac", 1, "#fab011"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(123,10,10)",
    "space": -4
}

// 品质白
cfgs["ten1"] = {
    "width": 20,
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(231,227,239)", 1, "rgb(166,175,189)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质绿
cfgs["ten2"] = {
    "width": 20,
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(231,242,224)", 1, "rgb(108,167,72)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质蓝
cfgs["ten3"] = {
    "width": 20,
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(224,238,242)", 1, "rgb(72,121,167)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1

}
// 品质紫
cfgs["ten4"] = {
    "width": 20,
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(224,205,241)", 1, "rgb(121,51,181)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质橙
cfgs["ten5"] = {
    "width": 20,
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(242,213,189)", 1, "rgb(182,104,42)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}
// 品质红
cfgs["ten6"] = {
    "width": 20,
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px kaiti_bold",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(231,227,239)", 1, "rgb(166,175,189)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -1
}

//VIP
cfgs["vip"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 11px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps":[0, "rgb(251,247,172)", 1, "rgb(250,176,17)"] },
    "strokeWidth": 1,
    "space": 0
}

//门派成员VIP
cfgs["gangVip"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps":[0, "rgb(255,224,190)", 1, "rgb(196,128,32)"] },
    "strokeWidth": 1,
    "space": 0
}

cfgs["equipFast"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 11px SSSSS",
    "color": { "x1": 0, "y1": "25%", "x2": 0, "y2": "90%", "steps":[0, "#e9d6f9", 1, "#7b34ba"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -2
}
cfgs["equipDiamType"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 11px SSSSS",
    "color": { "x1": 0, "y1": "11%", "x2": 0, "y2": "94%", "steps":[0, "#e6e6cd", 1, "#ee8c19"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -2
}
//副标题
cfgs["singleTitle"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px mnjsh",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0,"rgb(228,202,172)", 1, "rgb(172,125,94)", ] },
    "strokeWidth": 2,
    "strokeColor": "rgb(49,34,19)",
    "space": 0
}


//卦象名字
cfgs["gossipName"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "95%", "steps": [0, "rgb(236,207,130)", 1, "rgb(120,88,61)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(49,34,19)",
    "space": 0
}
//阵法名字
cfgs["gestName"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "95%", "steps": [0, "rgb(231,227,239)", 1, "rgb(166,175,189)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(10,10,18)",
    "space": -4
}

//阵法商店名字
cfgs["gestShop"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 16px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "95%", "steps": [0, "rgb(255, 255, 255)", 1, "rgb(255, 232, 169)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0, 0, 0)",
    "space": -4
}
//阵法副本名字
cfgs["gestFb"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 22px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "75%", "steps": [0, "rgb(255,244,194)", 1, "rgb(228,131,79)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(16, 9, 4)",
    "space": 0
}
//购买
cfgs["buyMin"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 18px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "95%", "steps": [0, "rgb(98, 111, 178)", 1, "rgb(98, 111, 178)"] },
    "strokeWidth": 1,
    "space": -4
}
//充值元宝数字
cfgs["rechargeDiamond"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 26px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "70%", "steps": [0, "rgb(242, 213, 189)", 1, "rgb(182, 104, 42)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0, 0, 0)",
    "space": 0
}
//充值vip数字
cfgs["vipLv"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 26px mnjsh",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "50%", "steps": [0, "rgb(255, 216, 195)", 1, "rgb(255, 162, 0)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(164, 76, 22)",
    "space": -2
}
//充值查看特权
cfgs["gotoVip"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 16px mnjsh",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255, 255, 255)", 1, "rgb(166, 175, 189)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(48, 43, 68)",
    "space":-2
}
//vip页面vip特权
cfgs["vipNum"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 16px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "60%", "steps": [0, "rgb(238, 217, 75)", 1, "rgb(255, 93, 37)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(85, 50, 6)",
    "space":-2
}
cfgs["vipPower"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "lineHeight":0,
    "text": "this is text",
    "font": "normal 500 30px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "60%", "steps": [0, "rgb(255, 255, 139)", 1, "rgb(255, 248, 210)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(255, 96, 0)",
    "space":-2
}
//活动
cfgs["activity"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 19px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "95%", "steps": [0, "rgb(255,252,215)", 0.6, "rgb(255,208,107)", 1, "rgb(233,131,48)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": 0
}

//活动
cfgs["activityBorRed"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 19px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "95%", "steps": [0, "rgb(255,252,215)", 0.6, "rgb(255,208,107)", 1, "rgb(233,131,48)"] },
    "strokeWidth": 2,
    "strokeColor": "#892206",
    "space": 0
}
//除魔卫道标题
cfgs["rebelInfo"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 19px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,243,186)", 0.4, "rgb(246,205,61)", 1, "rgb(246,139,61)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}

//除魔卫道标题
cfgs["rebelScenetext"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "40%", "x2": 0, "y2": "100%", "steps": [0, "rgb(255,208,107)", 1, "rgb(233,131,48)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(40,45,58)",
    "space": -4
}

//门派的门派宣言和门派公告
cfgs["gangMsg"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "75%", "steps": [0, "rgb(255,243,186)", 1, "rgb(217,164,124)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(6,8,54)",
    "space": -4
}
//门派cover标题
cfgs["gangCoverTitle"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "35%", "x2": 0, "y2": "65%", "steps": [0, "rgb(255,249,246)", 0.4, "rgb(214,181,132)", 1, "rgb(179,131,72)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(49,34,19)",
    "space": -4
}
//门派cover标题
cfgs["fbName"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px mnjsh",
    "color": { "x1": 0, "y1": "35%", "x2": 0, "y2": "85%", "steps": [0.02, "rgb(195,127,44)", 0.6, "rgb(251,219,141)", 1, "rgb(255,249,246)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(49,34,19)",
    "space": -4
}
//确认框提示按钮文字
cfgs["confirm_tips"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 14px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "80%", "steps": [0, "rgb(255,243,186)", 1, "rgb(217,164,124)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(6,8,54)",
    "space": 0
}
//活动倍数
cfgs["activityNum"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px aaaa",
    "color": { "x1": 0, "y1": "4%", "x2": 0, "y2": "100%", "steps": [0, "rgb(252,240,196)",0.54, "rgb(247,213,91)", 1, "rgb(242,171,46)"] },
    "space": 0
}

//查看属性按钮
cfgs["lookDetails"]={
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "95%", "steps": [0, "#d9a47c", 1, "#fff3ba"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}
//评分
cfgs["scoring"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "45%", "x2": 0, "y2": "65%", "steps": [0, "rgb(255,248,53)", 1, "rgb(251,120,24)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(29,15,10)",
    "space": -4
}
//菱形按钮字体
cfgs["lingBtn"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 20px mnjsh",
    "color": { "x1": 0, "y1": "45%", "x2": 0, "y2": "75%", "steps": [0, "rgb(234,205,174)", 1, "rgb(212,118,67)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(29,15,10)",
    "space": 0
}
//在线领奖字体配置
cfgs["onlineGift"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "60%", "steps": [0, "rgb(255,239,222)", 1, "rgb(196,128,32)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(62,32,24)",
    "space": 0
}
//充值X元绿色
cfgs["rechargeGreen"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 20px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "60%", "steps": [0, "rgb(234,245,197)",0.47, "rgb(208,242,104)", 1, "rgb(99,233,68)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(96,45,44)",
    "space": -4
}
//功能描述
cfgs["funDesc"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "15%", "x2": 0, "y2": "92%", "steps": [0, "rgb(252,203,97)", 1, "rgb(255,230,212)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(41,22,17)",
    "space": 0
}
//领奖
cfgs["getAward"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": {"x1": 0, "y1": "31%", "x2": 0, "y2": "86%", "steps": [0, "rgb(255,239,222)", 0.4, "rgb(255,224,116)", 1, "rgb(255,149,0)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(132,46,3)",
    "space": -5
}
//等级限制
cfgs["levelLimit"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "25%", "x2": 0, "y2": "73%", "steps": [0, "rgb(255,157,109)", 1, "rgb(255,48,0)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(47,37,28)",
    "space": -5
}
//功能名字
cfgs["funName"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "30%","x2": 0, "y2": "70%", "steps": [0, "rgb(255,249,246)", 0.4, "rgb(255,213,111)", 1, "rgb(218,72,0)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(83,33,5)",
    "space": -5
}
//rmb
cfgs["rechargeNum"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "20%","x2": 0, "y2": "85%", "steps": [0, "rgb(255,245,156)", 0.5, "rgb(248,99,253)", 1, "rgb(118,40,248)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(149,21,81)",
    "space": -5
}

//rmb
cfgs["rankInfo"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "70%", "steps":[0, "rgb(255,245,216)", 1, "rgb(212,140,46)"] },
    "space": 0,
    "shadow": { // 阴影
        "offsetX": 3,
        "offsetY": 3, //偏移量
        "blur": 5, // 模糊值，一般为5
        "color": "#311d15" // 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
    }
}
cfgs["blue"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 19px mnjsh",
    "color": { "x1": 0, "y1": "5%", "x2": 0, "y2": "95%", "steps": [0, "rgb(245,255,255)", 1, "rgb(70,209,207)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(6,58,137)",
    "space": 0
}
//灰
cfgs["gray"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "#bebebe", 1, "#555555"] },
    "strokeWidth": 2,
    "strokeColor": "#515151",
    "space": -5
}

//签到活动第X天
cfgs["checkinDay"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "25%", "x2": 0, "y2": "80%", "steps": [0, "rgb(244,229,149)", 1, "rgb(247,139,1)"] },
    "strokeWidth": 2,
    "strokeColor": "#8e3715",
    "space": -5
}

//战斗失败，我要变强
cfgs["changeStrong"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "25%", "x2": 0, "y2": "80%", "steps": [0, "rgb(246,246,255)",0.41, "rgb(132,171,214)",0.98, "rgb(72,128,179)"] },
    "strokeWidth": 2,
    "strokeColor": "#1a252e",
    "space": -4
}
//关卡
cfgs["wildMission"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "45%", "x2": 0, "y2": "70%", "steps":[0, "rgb(234,205,174)", 1, "rgb(212,118,67)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(27,13,8)",
    "space": -4
}
//当前BOSS关卡
cfgs["missionHot"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px mnjsh",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "70%", "steps":[0.07, "rgb(242,221,139)", 1, "rgb(211,29,29)"] },
    "strokeWidth": 1,
    "strokeColor": "#9d0000",
    "space": -4
}
//及日日活动标题，紫色
cfgs["fesTitle"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 18px mnjsh",
    "color": { "x1": 0, "y1": "30%", "x2": 0, "y2": "90%", "steps":[0, "rgb(238,214,251)", 1, "rgb(255,255,255)"] },
    "strokeWidth": 1,
    "strokeColor": "#5228b0",
    "space": -4
}
//活跃度中列表字体
cfgs["livenessList"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 16px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "90%", "steps": [0, "rgb(255,255,255)", 1, "rgb(161,158,157)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}
//商店vip折扣
cfgs["vipDiscountGold"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "80%", "steps": [0.26, "rgb(236,185,137)", 1, "rgb(143,78,49)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}
//商店vip折扣
cfgs["vipDiscountYellow"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "80%", "steps": [0.24, "rgb(242,234,137)", 1, "rgb(171,115,49)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}
//商店vip折扣
cfgs["vipDiscountGray"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 22px mnjsh",
    "color": { "x1": 0, "y1": "10%", "x2": 0, "y2": "80%", "steps": [0, "rgb(224,230,239)", 0.88, "rgb(126,126,153)"] },
    "strokeWidth": 1,
    "strokeColor": "rgb(0,0,0)",
    "space": -4
}

cfgs["dist_award"] = {
    "hfactor": 1.1,
    "zoomfactor": 2,
    "text": "this is text",
    "font": "normal 400 11px mnjsh",
    "color": { "x1": 0, "y1": "20%", "x2": 0, "y2": "80%", "steps": [0, "rgb(247,249,193)", 0.88, "rgb(245,221,104)"] },
    "strokeWidth": 2,
    "strokeColor": "rgb(175,47,3)",
    "space": 0 
}