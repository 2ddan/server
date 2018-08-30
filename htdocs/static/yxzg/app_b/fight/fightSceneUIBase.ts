

import { Fighter } from "../../fight/class";
import { UINode } from "../../app/scene/uiNodeBase";
import { BuffNode } from "./bufferBase";

export const FighterFlagCfg = {
    "CREATEMODEL"   : 1,
    "CREATEBUFF"    : 2,
    "CHANGEHP"      : 4,
    "CHANGEBUFF"    : 8,
    "CHANGEMODEL"   : 16
}

export const HPCreateCfg = {
    width: 120,
    height: 20
}

export const BuffCreateCfg = {
    width: 40,
    height: 40
}

export const DropItemCreateCfg = {
    width: 56,
    height: 56
}

export const BuffCfg = {
    CountOneRow:  6,
    WIDTH: 40,
    HEIGHT: 40,
    textSize: 64
};

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

export const RoleAnimFlags = {
    "stand": 0,
    "move": 1,
    "skill1": 2,
    "behit": 3,
    "die": 4
}
const RoleAnimList = [ "act_rolem_standby", "act_rolem_run", "act_rolem_sk1", "act_rolem_sk5", "act_rolem_die" ];

// export const MonsterAnimFlags = {
//     "stand": 0,
//     "run": 1,
//     "skill1": 2,
//     "behit": 3,
//     "die": 4
// }
const MonsterAnimList = [ "standby", "run", "skill1_1", "diefly", "die" ];

export const RoleTplList = [ "role" ];
export const RoleNameList = [ "model_rolem02" ];

export const MonsterTplList = [ "monster" ];
export const MonsterNameList = [ "model_monster01", "model_monster02", "model_monster03" ];

export const ReadMonsterAnim = ( monsterName: string, flag: number )=>{
    return `act_${monsterName}_${MonsterAnimList[flag]}`;
}

export const ReadRoleAnim = ( roleName: string, flag: number )=>{
    return RoleAnimList[flag];
}


export class FighterData {
    fighter: Fighter;
    isEnemy: boolean = true;
    arrIndex: number;
    currHP: number = 0;
    totalHP: number = 0;
    nodeLeft: number;
    nodeTop: number;
    bufferList: Array<string> = [];

    nodeBlock: UINode;
    nodeBlockNum: UINode;
    nodeName: UINode;
    nodeHP: UINode;
    nodeHPBG: UINode;
    nodeHPImage: UINode;
    nodeBufferMap: Map<string, BuffNode> = new Map;
    
    actionGetList: Array<FighterActionData> = [];
    actionCurrList: Array<FighterActionData> = [];

    obj3D: any;
    obj3DFlag: number;
}

export class FighterActionData {
    type: string;
    data: any;
    createTime: number;
    constructor(){
        this.createTime = Date.now();
    }
}

export const FighterDiffCfg = {
    enumey: "#ff0000",
    self:   "#0000ff"
}

export const FighterSizeCfg = {
    WIDTH: 100,
    HEIGHT: 100
}
