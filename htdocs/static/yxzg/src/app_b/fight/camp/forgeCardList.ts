
/**
 * @desc 锻造_卡牌列表: 展示可以升级的卡牌列表
*/
// ========================================模块引入
import { globalSend, globalReceive } from "../../../app/mod/pi";
import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg, UIDataState } from "../../../app/scene/uiNode";
import { UINode } from "../../../app/scene/uiNodeBase"; 
import { data as localDB, updata } from "../../../app/mod/db";
import { CfgMgr } from "../../../app/mod/cfg_mgr";
import { getSelf } from "../../fight/fight";
import { CardNodeData, FaceCfg } from "../../card/cardBase";
import { appendCard, cardScale } from "../../card/cardFace";
import { Card, Fighter } from "../../../fight/class";
import { CardSelector } from "../../card/cardSelector";

import { CampFrames } from "./campFrames";

// ========================================常量定义
// 卡牌基本配置
const CfgCardBase = {
    MARGIN_TOP: 30, // 外边距_上
    MARGIN_LEFT: 20, // 外边距_左
    SCALE: 0.7 // 卡牌缩放比例
};
// 卡牌列表基本配置
const CfgCardList = {
    WIDTH: 960, // 卡牌展示列表宽
    HEIGHT: 540, // 卡牌展示列表高
    PADDING_TOP: 0, // 内边距_上
    PADDING_LEFT: 80, // 内边距_左
    PADDING_RIGHT: 0 // 内边距_右
}

// ========================================导出接口

// ========================================数据结构

// ========================================变量声明
let frameNode, frameData, frameJson, frameName, frameClass:any;
let upgradeCardList: Array<CardItem> = [], // 可以升级的卡牌列表
    yMoveLen: number = 0, // Y方向的可移动长度
    isMoveFlag: boolean = false, // 是否是移动状态
    yMoveDistance: number = 0,
    currCardIndex: number = 0;
// ========================================类定义
class CardItem {
    card: Card;
    node: UINode;
    arrIndex: number;
    dbIndex: number;
    upHandler: Function;
    moveHandler: Function;
    left: number;
    top: number;
    scale: number;
    column: number;
    row: number;
}

class ForgeCardList {
    /**打开界面 */
    static pageOpenFrame = () => {
        openFrame();
    };
    /**关闭界面 */
    static pageCloseFrame = () => {
        closeFrame();
        globalSend('msgOpenCampFrame');
    };
    /**打开升级界面
     * @param {Object}
     */
    static pageOpenUpgradeFrame = (cardItem: CardItem) => {
        openUpgradeFrame(cardItem);
    };
    /**滑动界面 */
    static pageSlideCardList = (event) => {
        slideHander(event);
    };
    /**滑动卡牌 */
    static pageSlideCard = (event) => {
        slideHander(event);
    };
    /**页面up事件 */
    static pageCardListUp = () => {
        changeIsMoveFlag(false);
    };
}

// ========================================方法定义
/**打开界面 */
const openFrame = () => {
    if (frameNode !== undefined){ throw new Error( `${frameClass} 不能重复创建.` ) }

    frameNode = UINodeCtrl.openFrame({
                    frameClass: frameClass, 
                    nodeName:   frameClass, 
                    jsonNew:    undefined, 
                    data:       frameData
                });
    
    bindFrameNodeHandler();
    
    showCardList(); // 显示卡牌列表
};
/**关闭界面 */
const closeFrame = () => {
    if (frameNode === undefined){
        console.log(`${frameClass} 未被创建.`);
        return;
    }
    clearCards();
    UINodeCtrl.removeNode( frameNode );
    frameNode = undefined;
};

/**绑定页面节点事件 */
const bindFrameNodeHandler = () => {
    UINodeCtrl.setFrameNodeListener(frameNode, 'BG', new UIListenCfg('move', ForgeCardList.pageSlideCardList));
    UINodeCtrl.setFrameNodeListener(frameNode, 'BG', new UIListenCfg('up', ForgeCardList.pageCardListUp));
    UINodeCtrl.setFrameNodeListener(frameNode, 'btnFCLCancel', new UIListenCfg('up', ForgeCardList.pageCloseFrame));
};

/**显示卡牌列表 */
const showCardList = () => {
    let cardList  = filterCanUpgradeCards(),
        occ       = CfgMgr.getOne('cfg/occupation', localDB.player.occupation || '1'), // 职业配置
        columnNum = Math.floor((CfgCardList.WIDTH - (CfgCardList.PADDING_LEFT+CfgCardList.PADDING_RIGHT)) / (FaceCfg.Width*CfgCardBase.SCALE + CfgCardBase.MARGIN_LEFT)), //列数 = (列表宽度-内边距_左+内边距_右) / (卡牌宽度*缩放比例+卡牌外边距)
        rowNum    = Math.ceil(cardList.length / columnNum); // 行数
    
    yMoveLen = (CfgCardList.PADDING_TOP + (FaceCfg.Height*CfgCardBase.SCALE + CfgCardBase.MARGIN_TOP) * rowNum) - CfgCardList.HEIGHT;
    yMoveLen = yMoveLen > 0 ? yMoveLen : 0;


    for (let i = 0, len = cardList.length; i < len; i++) {
        let cardItem:any  = {};
        let card:CardItem = CfgMgr.create(['cfg/card', `cfg/card_${occ.name_en}`], cardList[i].cardID, Card);

        cardItem.card     = card;
        cardItem.arrIndex = i;
        cardItem.column   = i % columnNum; // 列数: 0...
        cardItem.row      = Math.floor(i / columnNum); // 行数: 0...
        cardItem.scale    = 1;
        cardItem.dbIndex  = cardList[i].index;
        
        createCardNode(cardItem);
        upgradeCardList.push(cardItem);
    }
};

/**筛选可以升级的卡牌列表
 * @returns [{index: number, cardID: number}]
 */
const filterCanUpgradeCards = () => {
    let dbCards = localDB.cards,
        cardList = [],
        cfg_CardWarrior = CfgMgr.get('cfg/card_warrior'); // 战士卡牌配置

    for (let i = 0, len = dbCards.length; i < len; i++) {
        let nextCardID = `${dbCards[i][0]}${dbCards[i][1]+1}`; // 卡牌下一等级id
        if (cfg_CardWarrior[nextCardID]) {
            cardList.push({index: i, cardID: `${dbCards[i][0]}${dbCards[i][1]}`});
        }
    }

    return cardList;
};

/**创建一张卡牌
 * @param {Object} cardItem 卡牌数据
 */
const createCardNode = (cardItem: CardItem) => {
    let node: UINode, jsonNew: any, cardData: CardNodeData;
    let ownFighter: Fighter = getSelf();
    let left: number, top: number, z: number;

    // 计算变换的数据(卡牌的原点在中心点)
    left = CfgCardList.PADDING_LEFT + CfgCardBase.MARGIN_LEFT * (cardItem.column+1)  + FaceCfg.Width * CfgCardBase.SCALE * cardItem.column + FaceCfg.Width * CfgCardBase.SCALE / 2;
    top  = CfgCardList.PADDING_TOP + CfgCardBase.MARGIN_TOP * (cardItem.row+1)  + FaceCfg.Height * CfgCardBase.SCALE * cardItem.row + FaceCfg.Height * CfgCardBase.SCALE / 2;
    

    z    = frameNode.z + 5;
    jsonNew = { left: left, top: top, z_relat: z };
    // 创建卡牌节点数据
    cardData = new CardNodeData(cardItem.card, ownFighter.id, undefined, true);
    
    node = appendCard({
        data: cardData,
        name: `forgeCardList${cardItem.arrIndex}`,
        parent: frameNode,
        jsonNew: jsonNew
    });
    cardItem.node = node;
    // 为每张卡绑定事件
    cardItem.upHandler = () => {
        ForgeCardList.pageOpenUpgradeFrame(cardItem);
    };
    cardItem.moveHandler = (event) => {
        ForgeCardList.pageSlideCard(event);
    }
    UINodeCtrl.setNodeListener(node, new UIListenCfg('up', cardItem.upHandler));
    UINodeCtrl.setNodeListener(node, new UIListenCfg('move', cardItem.moveHandler));
    cardScale(node, CfgCardBase.SCALE);
    return node;
};

/**滑动卡牌列表/卡牌
 * @param {Object} event 事件上下文
 */
const slideHander = (event: any) => {
    changeIsMoveFlag(true);
    if (!isCanSlide(event)) return;
    for (let i = 0, len = upgradeCardList.length; i < len; i++) {
        let cardNode = upgradeCardList[i].node,
            tempTop  = cardNode.rel_top;

        tempTop += event[1];
        UINodeCtrl.updateNodeData(cardNode, new UIDataState({top: tempTop}));
    }

    // console.log(event);
};
/**是否可以滑动 TODO */
const isCanSlide = (event) => {
    if (!yMoveLen) return false;

    yMoveDistance += event[1];

    console.log(yMoveDistance);
    // let firstNode = upgradeCardList[0].node,
    //     maxTop = CfgCardList.PADDING_TOP + CfgCardBase.MARGIN_TOP + FaceCfg.Height * CfgCardBase.SCALE / 2,
    //     minTop = maxTop - yMoveLen;
    // if (firstNode.rel_top > maxTop || firstNode.rel_top < minTop) {
    //     return false;
    // }
    return true;
};

/**打开升级界面 */
const openUpgradeFrame = (cardItem: CardItem) => {
    if (isMoveFlag) {
        changeIsMoveFlag(false);
        return;
    }
    globalSend('msgOpenUpgradeFrame', {
        cardItem: cardItem,
        cancelFunc: null,
        sureFunc: closeFrame
    });
    // console.log(`openUpgradeFrame${cardItem.arrIndex}`);
};

/**改变isMoveFlag */
const changeIsMoveFlag = (state: boolean) => {
    isMoveFlag = state;
};
/**清除卡牌 */
const clearCards = () => {
    for (let i = 0, len = upgradeCardList.length; i < len; i++) {
        let tempCard = upgradeCardList[i];
        if (tempCard) {
            UINodeCtrl.removeNode(tempCard.node);
            delete tempCard.node;
            delete tempCard.moveHandler;
            delete tempCard.upHandler;
            upgradeCardList[i] = undefined;
        }
        
    }
    upgradeCardList = [];
};
/**升级卡牌 TODO */
const upgradeCard = (data) => {
    let cards = localDB.cards,
        cardItem = data.cardItem,
        handleCard = cards[cardItem.dbIndex],
        cfg_CardWarrior = CfgMgr.get('cfg/card_warrior'); // 战士卡牌配置
    // 数据库不存在这张卡牌 || 配置表中没有升级后的卡牌
    if (!handleCard || !cfg_CardWarrior[`${handleCard[0]}${handleCard[1]+1}`]) {
        console.log('升级失败');
        return;
    }
    
    updata(`cards.${cardItem.dbIndex}.1`, handleCard[1]+1);
    data.sureFunc && data.sureFunc();
    globalSend("outFloor"); // 关闭营地界面
    console.log('升级成功');
};
// ========================================立即运行

/**初始化 */
const init = ()=>{
    // 注册全局监听
    globalReceive({
        "msgOpenForgeFrame": () => {
            ForgeCardList.pageOpenFrame();
        },
        "msgOpenUpgradeFrame": (data) => {
            upgradeCard(data);
        }
    });

    let forgeFCLF = CampFrames.getForgeCardListFrameJson(); // 获取锻造卡牌列表JSON数据

    frameClass  = forgeFCLF.nodeName;

    frameJson = forgeFCLF;

    frameData = {};

    recordUIJson( frameClass, frameJson );
};

init();