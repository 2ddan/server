

import { Fighter } from "../../../fight/class";
import { UINode } from "../../../app/scene/uiNodeBase";
import { EffectData } from "../../sceneAmbient/effect";
import { SelectEffectData } from "./selectEffectBase";

import { BuffNode } from "./bufferBase";

export const FighterFlagCfg = {
    "CREATEMODEL"   : 1,
    "CREATEBUFF"    : 2,
    "CHANGEHP"      : 4,
    "CHANGEBUFF"    : 8,
    "CHANGEMODEL"   : 16
}

export const ReferenceSize = {
    WIDTH: 70,
    HEIGHT: 100
}

export const HPUICfg = {
    WIDTH: 110,
    HEIGHT: 14,
    DiffTop: ReferenceSize.HEIGHT/2 + 13,
    DiffLeft: -110/2,
    BGURL: "symbol/hp_bg.png",
    HPURL: "symbol/hp_role.png",
    HPURL2: "symbol/hp_enemy.png",
    HPURL3: "symbol/hp_block.png",
    TextSize: (16),
    TextWidth: (128),
    textColor: "#ffffff",
    textBorderWidth: 1,
    textBorderColor: "#000000",
    ID_HP_BG: 0,
    ID_HP_IMG: 1,
    ID_HP_IMG2: 2,
    ID_HP_TXT: 3
}



export const IntentUICfg = {
    TextSize: 18,
    WIDTH: 32,
    HEIGHT: 32,
    txtWidth: 64,
    textColor: "#FFFFFF",
    textBorderColor: "#000000",
    diffLeft: -32/2,
    diffTop: -ReferenceSize.HEIGHT/2 -36
}


// 1.增益 2.减益 3.强大减益 11.普通攻击 12.魔法攻击 13.格挡
// 0,     1,     2,         3,        4,          5
// 1,     2,     4,         8,        16,        32
export const IntentNames = { "1":"增益", "2":"减益", "3":"强大减益", "11":"普通攻击", "12":"魔法攻击", "13":"格挡" } ;
export const IntentTypes = [1, 2, 3, 11, 12, 13];
export let  IntentIconList: Array<string> = [];
IntentIconList[1+0]     = "symbol/intent_buff.png";
IntentIconList[1+8]     = "symbol/intent_attack_buff.png";
IntentIconList[1+16]    = "symbol/intent_magic_buff.png";
IntentIconList[1+32]    = "symbol/intent_block_buff.png";

IntentIconList[2+0]     = "symbol/intent_debuff.png";
IntentIconList[2+8]     = "symbol/intent_attack_debuff.png";
IntentIconList[2+16]    = "symbol/intent_magic_debuff.png";
IntentIconList[2+32]    = "symbol/intent_block_debuff.png";

IntentIconList[4+0]     = "symbol/intent_debuffBig.png";
IntentIconList[4+8]     = "symbol/intent_attack_debuffBig.png";
IntentIconList[4+16]    = "symbol/intent_magic_debuffBig.png";
IntentIconList[4+32]    = "symbol/intent_block_debuffBig.png";

IntentIconList[8+0]     = "symbol/intent_attack.png";
IntentIconList[8+32]    = "symbol/intent_attack_block.png";

IntentIconList[16+0]    = "symbol/intent_magic.png";
IntentIconList[16+32]   = "symbol/intent_magic_block.png";

IntentIconList[32+0]    = "symbol/intent_block.png";

export const DropItemCreateCfg = {
    width: 56,
    height: 56
}


export const BuffUICfg = {
    CountOneRow:  5,
    WIDTH: 22,
    HEIGHT: 22,
    startScale: 2,
    endScale: 1,
    textSize: (12),
    textColor: "#00FF00",
    diffTop: ReferenceSize.HEIGHT/2 + 34,
    diffLeft: -110/2,
};

export const DamageUICfg = {
    diffY: 40,
    diffO: 0.5,
    times: 500,
    txtSize: 40,
    txtColor: "#ff0000",
    txtBorderWidth: 2,
    txtBorderColor: "#000000"
};

export const BlockUICfg = {
    WIDTH: 32,
    HEIGHT: 32,
    startOpacity: 0,
    startDiffTop: ReferenceSize.HEIGHT/2 +8 - 32/2,
    DiffTop: ReferenceSize.HEIGHT/2 +18 - 32/2,
    DiffLeft: -ReferenceSize.WIDTH/2 -34 -32/2,
    DiffZ:  4,
    BGURL: "symbol/block.png",
    startTextScale: (20/14),
    TextSize: (14),
    TextWidth: 64,
    TextColor: "#ffffff",
    time: 500
}

const ActionTypeList = [
    "updateBlock",
    "updateHP",
    "damage",
    "addBuff",
    "removeBuff",
    "updateBuff",
    "clearBuff"
];

export const ActionType = {
    [ActionTypeList[0]]: ActionTypeList[0],
    [ActionTypeList[1]]: ActionTypeList[1],
    [ActionTypeList[2]]: ActionTypeList[2],
    [ActionTypeList[3]]: ActionTypeList[3],
    [ActionTypeList[4]]: ActionTypeList[4],
    [ActionTypeList[5]]: ActionTypeList[5],
    [ActionTypeList[6]]: ActionTypeList[6]
};



export class FighterData {
    fighter: Fighter;
    isEnemy: boolean = true;
    campIndex: number;
    campCount: number;
    campList: Array<FighterData>;
    currHP: number = 0;
    totalHP: number = 0;
    nodeLeft: number;
    nodeTop: number;
    bufferList: Array<BuffData> = [];
    intentList: Array<IntentData> = [];

    nodeBlock: UINode;
    nodeBlockNum: UINode;
    nodeName: UINode;
    nodeHPList: Array<UINode> = [];
    nodeBufferMap: Map<string, BuffNode> = new Map;
    nodeIntentImg: UINode;
    nodeIntentTxt: UINode;
    nodeDetail: UINode;
    nodeDetailItems: Array<UINode>;
    selectEff: SelectEffectData;
    
    actionGetList: Array<FighterActionData> = [];
    actionCurrList: Array<FighterActionData> = [];

    eff: EffectData;
    effEndCall: Function;
    obj3D: any;
    obj3DName: string;
    obj3DFlag: number;

    createObjCall: Function;
    createUICall: Function;
}

export class FighterActionData {
    type: string;
    data: any;
    createTime: number;
    constructor(){
        this.createTime = Date.now();
    }
}

export class BuffData {
    icon: string;
    desc: string;
    number: number;
    color: number;
    name: string;
}

export class IntentData {
    type: string;
    desc: string;
}


export const FighterDiffCfg = {
    enumey: "#ff0000",
    self:   "#0000ff"
}

export const FighterSizeCfg = {
    WIDTH: 100,
    HEIGHT: 100
}

