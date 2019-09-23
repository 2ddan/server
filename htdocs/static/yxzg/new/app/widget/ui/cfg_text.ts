interface ICfgText {
    /**
     * 字体
     */
    font: string;
    /**
     * 颜色 或渐变颜色
     */
    color: { deg: string, steps: string[] };
    /**
     * 描边宽度
     */
    strokeWidth: number;
    /**
     * 描边颜色
     */
    strokeColor: string;
    /**
     * 阴影
     */
    shadow?: {
        /**
         * X偏移量
         */
        offsetX: number,
        /**
         * Y偏移量
         */
        offsetY: number,
        /**
         * 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
         */
        color: string,
        /**
         * 模糊值，一般为5
         */
        blur: number
    };
    /**
     * 字间距
     */
    space?: number;
    /**
     * 倾斜因子(用measureText方法取到的字体宽度未考虑字体的倾斜)
     */
    factor?: number;
    /**
     * 某些字体存在bug，高度总是比其它字体的size大，因此应乘以一个比1大的数
     */
    hfactor?: number;
}

export const cfgText = {
    /**
     * 测试
     */
    "roundText": <ICfgText>{
        font: "normal 300 20px hansansk",
        color: { deg: 'y', steps: ['#ffffff', '#dfbe8f 35%', '#676469'] },
        shadow: {
            offsetX: 0,
            offsetY: 3,
            color: "#19120d", 
            blur: 2
        },
        strokeWidth: 2,
        strokeColor: "#181514",
        space: 0,
    },
    "dropTitle":<ICfgText>{
        font: "normal 300 20px hansansk",
        color: { deg: 'y', steps: ['#eed389','#843a16 61%'] }, 
        strokeWidth: 2,
        strokeColor: "#1b1414", 
        space: 0, 
    },
    //按钮文字
    "btn":{
        font: "normal 300 20px hansansk",
        color: { deg: 'y', steps: ["#ffffff", "#ffeeaa 45%", "#cab79d"] },
        strokeWidth: 2,
        strokeColor: "#2b1002",
        space: 0
    },
    //挂牌标题
    "drop1":{
        font: "normal 300 20px hansansk",
        color: { deg: 'y', steps: ["#75594c", "#efd39d 60%", "#ffffff"] },
        strokeWidth: 2,
        strokeColor: "#181514",
        space: 0
    },
    "drop2":{
        font: "normal 300 20px hansansk",
        color: { deg: 'y', steps: ["#843a16", "#eed389 60%", "#ffffff"] },
        strokeWidth: 2,
        strokeColor: "#181514",
        space: 0
    },
    "drop3":{
        font: "normal 300 29px hanyi",
        color: { deg: 'y', steps: ["#75594c", "#efd39d 60%", "#ffffff"] },
        strokeWidth: 2,
        strokeColor: "#181514",
        space: 0,
        factor: 1,
        hfactor: 2
    },
    //结束回合
    "jieshu":{
        font: "normal 300 20px hansansk",
        color: { deg: 'y', steps: ["#c36650", "#666666 35%", "#ffffff"] },
        strokeWidth: 2,
        strokeColor: "#181514",
        space: 0
    },
    // 冒险
    "btn1":{
        font: "normal 300 33px hanyi",
        color: { deg: 'y', steps: ["#ecd09b", "#a78b6d 50%", "#7f6353"] },
        strokeWidth: 2,
        strokeColor: "#2b1002",
        space: 10
    },
     // 开始游戏
     "startbtn":{
        font: "normal 300 26px kaiti",
        color: { deg: 'y', steps: ["#ffdbac", "#f6a351 50%", "#e78a51"] },
        strokeWidth: 2,
        strokeColor: "#734120",
        space: 1
    }
}

// 参考
const textCfgs = {
    // 计谋
    jimou: {
        font: "normal 300 20px hanyi",
        color: { deg: 'y', steps: ["#f00", "#ffeeaa 45%", "#fff"] },
        shadow: {
            offsetX: 0,
            offsetY: 3,
            color: "#19120d",
            blur: 2
        },
        strokeWidth: 2,
        strokeColor: "#181514",
        space: 0
    },
    // "titleCover", "layerHang", "layerCard", "secondaryName", "buildUpdate", "missionTitle", "missionTitleDeep"
    titleCover: {
        font: "normal 300 32px hanyi",
        color: { deg: 'y', steps: ["#fffde7", "#ffeeaa 45%", "#cab79d"] },
        shadow: {
            offsetX: 0,
            offsetY: 1,
            color: "#000",
            blur: 2
        },
        strokeWidth: 1,
        strokeColor: "#2c1f16",
        space: 0
    },
    // 右侧悬挂页签 
    layerHang: {
        font: "normal 300 18px hanyi",
        color: { deg: 'y', steps: ["#fffde7", "#ffeeaa 45%", "#cab79d"] },
        shadow: {
            offsetX: 0,
            offsetY: 1,
            color: "#19120d",
            blur: 1
        },
        space: -2
    },
    // 卡片页签 
    layerCard: {
        font: "normal 300 18px kaiti",
        color: { deg: 'y', steps: ["#fffde7", "#ffeeaa 45%", "#cab79d"] },
        shadow: {
            offsetX: 0,
            offsetY: 2,
            color: "#1f140f",
            blur: 1
        },
        strokeWidth: 1,
        strokeColor: "#1f140f",
        space: -2
    },
    // 卡片页签 
    layerCardKai: {
        font: "normal 300 18px kaiti",
        color: { deg: 'y', steps: ["#fffde7", "#ffeeaa 45%", "#cab79d"] },
        shadow: {
            offsetX: 0,
            offsetY: 2,
            color: "#1f140f",
            blur: 1
        },
        strokeWidth: 1,
        strokeColor: "#1f140f",
        space: -2
    },
    // everyday
    everyDayR: {
        font: "italic 300 55px kaiti",
        color: { deg: 'y', steps: ["#ffffe9", "#ff8a04"] },
        shadow: {
            offsetX: 0,
            offsetY: 2,
            color: "#e85115",
            blur: 1
        },
        strokeWidth: 1,
        strokeColor: "#8d1d15",
        space: -3,
        factor: 1.1
    },
    // menu
    menu: {
        font: "normal 300 34px hanyi",
        color: {  deg: 'y', steps: ["#fafad4", "#fae28d"] },
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#000",
            blur: 1
        },
        space: -1,
        factor: 1.1
    },
    // everyday
    showDrop: {
        font: "normal 900 55px hanyi",
        color: {  deg: 'y', steps: ["#750701", "#9d1903"] },

        factor: 1.1
    },
    // everyday
    showDrop1: {
        font: "normal 900 55px hanyi",
        color: {  deg: 'y', steps: ["#9d1903", "#750701"] },

        factor: 1.1
    },
    // title功能名【背包】【军团】等等
    secondaryName: {
        font: "normal 100 54px hanyi",
        color: {  deg: 'y', steps: ["#fef5d5", "#d1c89f 30%", "#78644b 63%", "#cdc99b 85%"] },
        shadow: {
            offsetX: 0,
            offsetY: 8,
            color: "#221913",
            blur: 16
        },
        strokeWidth: 3,
        strokeColor: "#221913",
    },
    // 升级界面【大殿】
    buildUpdate: {
        font: "normal 300 30px hanyi",
        color: {  deg: 'y', steps: ["#fffde7", "#ffeeaa 45%", "#cab79d"] },
        shadow: {
            offsetX: 0,
            offsetY: 3,
            color: "#19120d",
            blur: 2
        },
        strokeWidth: 2,
        strokeColor: "#181514",
    },
    // 副本title
    missionTitle: {
        font: "normal 300 30px hanyi",
        color: {  deg: 'y', steps: ["#fffae7", "#fce488 37%", "#907a55"] },
        shadow: {
            offsetX: 0,
            offsetY: 2,
            color: "#423022",
            blur: 1
        },
        strokeWidth: 2,
        strokeColor: "#392c1a",
        space: -3
    },
    missionTitleDeep: {
        font: "normal 300 30px hanyi",
        color: {deg: 'y', steps: ["#fedea0", "#c3a263 25%", "#694e30"] },
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#000",
            blur: 1
        },
        strokeWidth: 1,
        strokeColor: "#0c0501",
        space: -2
    },
    // vip
    vip: {
        font: "normal 700 14px kaiti",
        color: { deg: 'y', steps: ["#f34839", "#ebae45 55%", "#ffdda4"] },
        strokeWidth: 2,
        strokeColor: "#150909",
        space: 0
    },
    fightPower: {
        font: "normal 700 14px kaiti",
        color: { deg: 'y', steps: ["#ffff89", "#ff6e02"] },
        strokeWidth: 2,
        strokeColor: "#150909",
        space: -2
    },
    // 队伍一|已出征。。。 角标的文字
    corner_0: {
        font: "normal 300 17px hanyi",
        color: "#fff",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#0c0501",
            blur: 0
        },
        strokeWidth: 1,
        strokeColor: "#1bff6b",
        space: -2
    },
    corner_1: {
        font: "normal 300 17px hanyi",
        color: "#fff",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#0c0501",
            blur: 0
        },
        strokeWidth: 1,
        strokeColor: "#1bff6b",
        space: -2
    },
    corner_2: {
        font: "normal 300 17px hanyi",
        color: "#fff",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#0c0501",
            blur: 0
        },
        strokeWidth: 1,
        strokeColor: "#427cfd",
        space: -2
    },
    corner_3: {
        font: "normal 300 17px hanyi",
        color: "#fff",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#0c0501",
            blur: 0
        },
        strokeWidth: 1,
        strokeColor: "#c11bff",
        space: -2
    },
    corner_4: {
        font: "normal 300 17px hanyi",
        color: "#fff",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#0c0501",
            blur: 0
        },
        strokeWidth: 1,
        strokeColor: "#ff9600",
        space: -2
    },
    corner_5: {
        font: "normal 300 17px hanyi",
        color: "#fff",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#0c0501",
            blur: 0
        },
        strokeWidth: 1,
        strokeColor: "#1bff6b",
        space: -2
    },
    // 地图主城切换按钮
    mapIconText: {
        font: "normal 300 17px hanyi",
        color: "#ede2b1",
        shadow: {
            offsetX: 0,
            offsetY: 2,
            color: "#19120d",
            blur: 2
        },
        strokeWidth: 2,
        strokeColor: "#19120d",
        space: -3
    },
    // 黑市收购中
    compounding: {
        font: "normal 300 14px hanyi",
        color: "#f9f474",
        strokeWidth: 2,
        strokeColor: "#933802"
    },
    // 速度
    btnSpend: {
        font: "normal 700 18px kaiti",
        color: "#EDE2B1",
        shadow: {
            offsetX: 0,
            offsetY: 0,
            color: "#19120d",
            blur: 2
        },
        strokeWidth: 1,
        strokeColor: "#181514",
        space: -3
    },
    //等级开放
    functionOpen: {
        font: "normal 300 18px kaiti",
        color: "#d9ce9f",
        strokeWidth: 2,
        strokeColor: "#22120e",
        space: -2
    },
    //折扣
    sevenDay: {
        font: "normal 300 30px hanyi",
        color: { deg: 'y', steps: ["#f8f38f", "#ffd323"] },
        strokeWidth: 2,
        strokeColor: "#c94a1e",
        space: -2,
        shadow: {
            offsetX: 0,
            offsetY: 0,
            color: "#d66908",
            blur: 2
        }
    },
    //rightMenu
    rightMenu: {
        font: "normal 300 18px hanyi",
        color: { deg: 'y', steps: ["#e5d1b6", "#f3dfc6"] },
        space: -2
    },
    rightMenu1: {
        font: "normal 300 18px hanyi",
        color: {deg: 'y', steps: ["#dac6a9", "#cfbc9d"] },
        space: -2
    },
    exchangeActivity: {
        font: "normal 300 30px kaiti",
        color: "rgb(255, 233, 0)",
        strokeWidth: 2,
        strokeColor: "#cc2b28",
        space: -2
    },
    discount: {
        font: "normal 300 14px kaiti",
        color: "#fff",
        strokeWidth: 2,
        strokeColor: "#4d0000",
        space: -3
    },
    shop: {
        font: "normal 300 20px hanyi",
        color: { deg: 'y', steps: ["#48190f", "#8e401a"] },
        space: 2
    },
    timeSignActivity: {
        font: "normal 300 38px kaiti",
        color: "#EFE4B1",
        strokeWidth: 2,
        strokeColor: "#3d1201",
        space: -2
    },
    timeSignActivity2: {
        font: "normal 700 14px kaiti",
        color: "#f58220",
        strokeWidth: 2,
        strokeColor: "#150909",
        space: -2
    },
    contry: {
        font: "normal 400 30px hanyi",
        color: {deg: 'y', steps: ["#fffd95", "#e9ab44"] },
        strokeWidth: 1,
        strokeColor: "#871723",
        space: -2
    },
    sigin:{
        font: "normal 400 20px kaiti",
        color: { deg: 'y', steps: ["#fde0ae", "#fa9f6d"] },
        strokeWidth: 2,
        strokeColor: "#ac5203",
        space: -2
    },
    sigin1:{
        font: "normal 400 20px kaiti",
        color: { deg: 'y', steps: ["#5cf143", "#4eb632"] },
        strokeWidth: 1,
        strokeColor: "#335c2e",
        space: -2
    },
    chapterName:{
        font: "normal 400 42px hanyi",
        color: { deg: 'y', steps: ["#fde7ad", "#b37436"] },
        strokeWidth: 2,
        //strokeColor: "#335c2e",
        space: -2,
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "#000",
            blur: 2
        }
    },
    foundation1:{
        font: "normal 300 15px kaiti",
        color: "#ffedaf",
        strokeWidth: 2,
        strokeColor: "#2c1b0f",
        space: -3 
    },
    foundation2: {
        font: "normal 300 20px kaiti",
        color: "#92fd4b",
        strokeWidth: 2,
        strokeColor: "#2c1b0f",
        space: -3 
    },
    foundation3: {
        font: "normal 300 18px kaiti",
        color: "#dd703f",
        strokeWidth: 2,
        strokeColor: "#310202",
        space: -4
    },
    foundation4: {
        font: "normal 300 18px kaiti",
        color: "#f1e6b1",
        strokeWidth: 2,
        strokeColor: "#310202",
        space: -4 
    },
    accrual_recharge: {
        font: "normal 300 16px kaiti",
        color: "#fef2c7",
        strokeWidth: 2,
        strokeColor: "#4a1b09",
        space: -4
    },
    accrual_recharge2: {
        font: "normal 300 16px kaiti",
        color: "#f1e6b1",
        strokeWidth: 2,
        strokeColor: "#310202",
        space: -4
    },
    firstweek_progress:{
        font: "normal 400 16px kaiti",
        color: "#dfd5a5",
        strokeWidth: 2,
        strokeColor: "#38200e",
        space: -4
    }
}