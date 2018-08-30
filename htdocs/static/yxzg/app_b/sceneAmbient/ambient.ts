import { getSkyCfg, getStageObj, StageCreateCfg, StageDownCfg } from "./ambientCfg";
import { AmbientCtrl } from "./ambientCtrl";
import { StageObj3D } from "./ambientBase";

/**
 * version: XXXXXXX
 *      描述：
 *      xxxxxx
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
// import { XXX }           from "XX/XX";
// import { XXX as SSS }    from "XX/XX";
// import * as SSS          from "XX/XX";


// ========================================常量定义


// ========================================导出接口


// ========================================数据结构


// ========================================变量定义
let fightSky: any;
let StageObjMap: Map<string, StageObj3D> = new Map;


// ========================================类定义
export class Ambient {
    static init = ()=>{

        AmbientCtrl.activeFrame();
        AmbientCtrl.setFrameFunc( AmbientAnim.update );

        Ambient.createSky();
    }

    static dispose = ()=>{
        Ambient.removeSky();
    }

    static createSky = ( flag: number = 0 )=>{

        if ( fightSky === undefined ){
            fightSky = getSkyCfg();
            AmbientCtrl.sceneCreate( fightSky, undefined, undefined );
        }
    }

    static removeSky = ( flag: number = 0 )=>{
        AmbientCtrl.sceneRemove( fightSky );
        fightSky    = undefined;
    }

    static createStage = ( 
            { x, y, type }:
            { x: number, y: number, type: number } )=>{

        let stageObj: StageObj3D;

        stageObj        = new StageObj3D;
        stageObj.x      = x;
        stageObj.y      = StageCreateCfg.startY;
        stageObj.z      = y;
        stageObj.type   = type;
        stageObj.name   = `${x}_${y}`;

        stageObj.moveProgress   = 0;
        stageObj.startTime      = Date.now();
        stageObj.obj3D          = getStageObj( type );
        stageObj.obj3D.transform.position = [ stageObj.x, stageObj.y, stageObj.z ];

        AmbientCtrl.sceneCreate( stageObj.obj3D, undefined, undefined );

        StageObjFunc.setStageUp( stageObj );
    }

    static removeStage = ( x: number, y: number )=>{
        let stageObj: StageObj3D;

        stageObj    =  StageObjMap.get( `${x}_${y}` ) ;
        if ( stageObj !== undefined ){
            StageObjFunc.setStageDown( stageObj );
        }
    }
}

export class AmbientAnim {
    static update = ()=>{
        AmbientAnim.updateStages();
    }
    static updateStages = ()=>{
        let isActive: boolean;

        isActive    = false;

        StageObjMap.forEach( stageObj => {
            if ( stageObj.moveProgress !== 1 ){
                isActive    = true;
                StageObjFunc.computePosition( stageObj );
            }
        } );

        AmbientCtrl.setFrameActive( isActive );
    }
}

export class StageObjFunc {
    static addStage = ( stage: StageObj3D )=>{
        StageObjMap.set( stage.name, stage );
    }
    static removeStage = ( name: string )=>{
        let stageObj: StageObj3D;

        stageObj    = StageObjMap.get( name );

        StageObjMap.delete( name );

        AmbientCtrl.sceneRemove( stageObj.obj3D );

        StageObjFunc.disposeStage( stageObj );
    }
    static setStageUp = ( stage: StageObj3D )=>{
        stage.startTime = Date.now();
        stage.startY = StageCreateCfg.startY;
        stage.endY   = StageCreateCfg.endY;
        stage.moveProgress   = 0;

        if ( StageObjMap.get( stage.name ) === undefined ){
            StageObjFunc.addStage( stage );
        }
    }
    static setStageDown = ( stage: StageObj3D )=>{
        stage.startTime = Date.now();
        stage.startY = StageDownCfg.startY;
        stage.endY   = StageDownCfg.endY;
        stage.moveProgress   = 0;
    }
    static computePosition = ( stage: StageObj3D )=>{
        let tempY: number, isUp: boolean, progress: number;;

        isUp    = (stage.startY - stage.endY) < 0;

        progress    = ( Date.now() - stage.startTime) / (isUp ? StageCreateCfg.time : StageDownCfg.time);
        stage.moveProgress  = progress > 1 ? 1 : progress;

        stage.y     = stage.startY + progress * ( stage.endY - stage.startY );

        stage.obj3D.transform.position[1] = stage.y;

        AmbientCtrl.updatePosition( stage.obj3D, stage.obj3D.transform.position );
    
        if ( !isUp && stage.moveProgress === 1 ){
            StageObjFunc.removeStage( stage.name );
        }
    }
    static disposeStage = ( stageObj: StageObj3D )=>{
        delete stageObj.name;
        delete stageObj.moveProgress;
        delete stageObj.obj3D;
        delete stageObj.startTime;
        delete stageObj.type;
        delete stageObj.x;
        delete stageObj.y;
        delete stageObj.z;
    }
}


// ========================================方法定义


// ========================================立即运行
const init = ()=>{
    // TODO After Load
};

init();
