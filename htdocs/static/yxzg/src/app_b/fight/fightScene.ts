/**
 * version: XXXXXXX
 *      描述：
 *      3D场景，
 *      功能：
 *      切换 战斗/地图/商店/遗迹/等
 *      玩家自己 始终存在
 */
// ========================================模块引入

import { Fighter } from "fight/class";

import { FightSceneMap }                    from "./fightSceneMap";
import { getSelf }                          from "./fight";

import { FighterData }                      from "./fight/fightSceneUIBase";
import { FightSceneFight }                  from "./fight/fightSceneFight";
import { FightSceneFightUI }                from "./fight/fightSceneFightUI";
import { Camp } from "./camp/camp";



// ========================================常量定义
const LookAtCfg = [
    [ 0, 0, -5.5 ]
];


// ========================================导出接口


// ========================================数据结构


// ========================================变量声明
let frameIsActive: boolean = false;
let player: FighterData;

// ========================================类定义
export class FightScene {
    static init = ()=>{
        
    }
    static dispose = ()=>{
        
    }
    static openMap = ( cfg: any )=>{
        FightSceneMap.init( cfg );
    }
    static openFight = ()=>{

        FightSceneFight.init();
        
    }
    static openCamp = ( cfg: any )=>{
        Camp.init();
    }
}

// ========================================方法定义


// ========================================立即运行
const init = ()=>{

};
init();
