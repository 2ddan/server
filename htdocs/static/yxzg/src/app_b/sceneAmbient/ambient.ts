

/**
 * version: XXXXXXX
 *      描述：
 *      3D 环境， 天空盒，地块，相机等
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { getSkyCfg, getStageObj, StageCreateCfg, StageDownCfg } from "./ambientCfg";
import { AmbientCtrl } from "./ambientCtrl";
import { StageObj3D } from "./ambientBase";
import { FightSceneCtrl } from "../fight/fightSceneCtrl";
import { Obj3DAnimData } from "../frameCtrl/obj3DAnimBase";


// ========================================常量定义
const CameraPos = [ 
    [ 0.0, 3.79999995231628, 4.80000019073486 ],
    [ -7.5, 6.65000009536743, -1.5 ]
];

const CameraRotate = [ 
    [ 0.488692134618759, 3.14159297943115, 0.0 ],
    [ 0.785398244857788, 1.9373152256012, 0.0 ]
];

export const CameraFlags = {
    "Normal"    : 0,
    "Fight"     : 1
}


// ========================================导出接口


// ========================================数据结构
class CameraAnimData {
    fromPos: Array<number>;
    toPos: Array<number>;
    fromRotate: Array<number>;
    toRotate: Array<number>;
    startTime: number;
    time: number;
    cb: Function;
}

// ========================================变量定义
let fightSky: any,
    StageObjMap: Map<string, StageObj3D> = new Map,
    currCameraFlag: number, 
    cameraAnimMap: Map<CameraAnimData, CameraAnimData> = new Map;


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

    static initCamera = ()=>{

    }

    /**
     * 相机运动
     * @param flag  相机要转到哪个状态
     * @param cb    设置 cb 则 解析为 运动，运动结束后调用 cb 
     * 
     * 运动时间 需要在这个 方法内 手动修改
     */
    static modifyCamera = ( flag: number, cb?: Function )=>{
        switch ( flag ) {
            case CameraFlags.Normal : {
                if ( cb === undefined ){
                    AmbientCtrl.modifyCameraPos( CameraPos[0] );
                    AmbientCtrl.modifyCameraRotate( CameraRotate[0] );
                }else{
                    CameraFunc.addCameraAnim( currCameraFlag, flag, 1000, cb );
                }
                break;
            }
            case CameraFlags.Fight : {
                
                if ( cb === undefined ){
                    AmbientCtrl.modifyCameraPos( CameraPos[1] );
                    AmbientCtrl.modifyCameraRotate( CameraRotate[1] );
                }else{
                    CameraFunc.addCameraAnim( currCameraFlag, flag, 1300, cb );
                }
                break;
            }
        }
        
        currCameraFlag  = flag;
    }

    static modifyCameraPos = ( diffX: number, diffZ: number )=>{
        let cameraPos: Array<number>;

        cameraPos   = CameraPos[currCameraFlag];

        AmbientCtrl.modifyCameraPos( [ cameraPos[0]+diffX, cameraPos[1], cameraPos[2]+diffZ ] );
    }
    // 地块相对原位置位移
    static modifyStagePos = ( x: number, y: number, diffX: number, diffZ: number )=>{
        let stageObj: StageObj3D;

        stageObj    =  StageObjMap.get( `${x}_${y}` ) ;
        if ( stageObj !== undefined ){
            stageObj.obj3D.transform.position[0] = stageObj.x + diffX;
            stageObj.obj3D.transform.position[2] = stageObj.z + diffZ;
            AmbientCtrl.modifyPos( stageObj.obj3D, stageObj.obj3D.transform.position );
        }

    }
    // 创建天空盒
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

    /**
     * type: 地块美术表现不同， 1，2，3
     */
    static createStage = ( 
            { x, y, type, anim = true }:
            { x: number, y: number, type: number, anim?: boolean } )=>{

        let stageObj: StageObj3D;

        stageObj        = new StageObj3D;
        stageObj.x      = x;
        stageObj.y      = anim ? StageCreateCfg.startY  : StageCreateCfg.endY ;
        stageObj.z      = y;
        stageObj.type   = type;
        stageObj.name   = StageObjFunc.getStageName( x, y );

        stageObj.moveProgress   = anim ? 0 : 1 ;
        stageObj.startTime      = Date.now();
        stageObj.startY         = stageObj.y;
        stageObj.endY           = stageObj.y;
        stageObj.obj3D          = getStageObj( type );

        stageObj.obj3D.transform.position = [ stageObj.x, stageObj.y, stageObj.z ];

        AmbientCtrl.sceneCreate( stageObj.obj3D, undefined, undefined );

        anim && StageObjFunc.setStageUp( stageObj );
        
        if ( StageObjMap.get( stageObj.name ) === undefined ){
            StageObjFunc.addStage( stageObj );
        }
    }
    
    /**
     * 创建 x-z平面 移动的 地块
     */
    static createStage_XZ = ( 
        { x0, z0, x, z, type, time }:
        { x0: number, z0: number, x: number, z: number, type: number, time: number } )=>{

    let stageObj: StageObj3D, animData: Obj3DAnimData;

    stageObj        = new StageObj3D;
    stageObj.x      = x0;
    stageObj.y      = StageCreateCfg.endY ;
    stageObj.z      = z0;
    stageObj.type   = type;
    stageObj.name   = StageObjFunc.getStageName( x, z );
    stageObj.XZArray= [ [x0, z0], [x , z] ];
    stageObj.XZTime = time;

    stageObj.moveProgress   = 0 ;
    stageObj.startTime      = Date.now();
    stageObj.startY         = stageObj.y;
    stageObj.endY           = stageObj.y;
    stageObj.obj3D          = getStageObj( type );
    stageObj.obj3D.transform.position = [ stageObj.x, stageObj.y, stageObj.z ];

    if ( StageObjMap.get( stageObj.name ) === undefined ){

        AmbientCtrl.sceneCreate( stageObj.obj3D, undefined, undefined );
        StageObjFunc.addStage( stageObj );

        // animData    = new Obj3DAnimData( stageObj.obj3D, undefined );
        // animData.posArray   = [ [ x0, stageObj.y, z0], [ x, stageObj.y, z] ];
        // animData.speedMath  = "line";
        // animData.time       = time;
        // animData.run();
    }
}

    static removeStage = ( x: number, y: number )=>{
        let stageObj: StageObj3D;

        stageObj    =  StageObjMap.get( StageObjFunc.getStageName( x, y ) ) ;
        if ( stageObj !== undefined ){
            StageObjFunc.setStageDown( stageObj );
        }
    }

    /**
     * 移除指定 坐标位置的地块
     * [ [ x, y ] ]
     */
    static clearStages = ( list?: Array<Array<number>> )=>{
        let nameList: Array<string> = [];

        if ( list !== undefined && list.length > 0 ){
            list.forEach( pos => {
                nameList.push( StageObjFunc.getStageName( pos[0], pos[1] ) );
            } );
        }

        StageObjMap.forEach( (stageObj, key) => {
            if ( nameList.indexOf( key ) < 0 ){
                StageObjFunc.removeStage( key );
            }
        } ) ;
    }

    /**
     * 重置指定 坐标位置的地块
     * [ [], [] ] 
     */
    static resetStage = ( from: Array<number>, to: Array<number> )=>{
        let fromName: string, toName: string, obj: StageObj3D;

        fromName    = StageObjFunc.getStageName( from[0], from[1] );
        toName      = StageObjFunc.getStageName( to[0], to[1] );

        obj         = StageObjMap.get( fromName );
        
        if ( obj !== undefined ){

            obj.name    = toName;
            obj.x       = to[0];
            obj.z       = to[1];

            StageObjMap.set( toName, obj );
            StageObjMap.delete( fromName );

        }else{
            throw new Error( `Stage ${fromName} 已被销毁.` );
        }
    }
}

// 环境 动画类
export class AmbientAnim {
    static update = ()=>{
        AmbientAnim.updateStages();
        AmbientAnim.updateCamera();
    }
    static updateStages = ()=>{
        let isActive: boolean;

        isActive    = false;

        StageObjMap.forEach( stageObj => {
            if ( stageObj.moveProgress !== 1 ){
                isActive    = true;

                if ( stageObj.XZTime !== undefined ){
                    StageObjFunc.computePosition_XZ( stageObj );
                }else{
                    StageObjFunc.computePosition( stageObj );
                }
            }
        } );

        AmbientCtrl.setFrameActive( isActive );
    }
    static updateCamera = ()=>{
        cameraAnimMap.forEach( data =>{
            CameraFunc.computeCameraState( data );
        } );
    }
}

// 相机方法类
export class CameraFunc {
    static addCameraAnim = ( flagFrom: number, flagTo: number, time: number, cb: Function )=>{
        let cameraAnimData: CameraAnimData;

        cameraAnimData  = new CameraAnimData;
        cameraAnimData.fromPos      = CameraPos[flagFrom];
        cameraAnimData.fromRotate   = CameraRotate[flagFrom];
        cameraAnimData.toPos        = CameraPos[flagTo];
        cameraAnimData.toRotate     = CameraRotate[flagTo];
        cameraAnimData.startTime    = Date.now();
        cameraAnimData.time         = time;
        cameraAnimData.cb           = cb;

        cameraAnimMap.set( cameraAnimData, cameraAnimData );
    }
    static computeCameraState = ( data: CameraAnimData )=>{
        let progress: number, tempPos: Array<number> = [], tempRotate: Array<number> = [];

        progress    = ( Date.now() - data.startTime )/data.time;
        progress    = progress > 1 ? 1 : progress;

        for ( let i=0; i<3; i++ ){
            tempPos[i]      = data.fromPos[i] + (data.toPos[i] - data.fromPos[i]) * progress; 
            tempRotate[i]   = data.fromRotate[i] + (data.toRotate[i] - data.fromRotate[i]) * progress; 
        }

        AmbientCtrl.modifyCameraPos( tempPos );
        AmbientCtrl.modifyCameraRotate( tempRotate );

        if ( progress === 1 ){
            data.cb && data.cb();

            cameraAnimMap.delete( data );

            delete data.cb;
            delete data.fromPos;
            delete data.fromRotate;
            delete data.startTime;
            delete data.time;
            delete data.toPos;
            delete data.toRotate;
        }
    }
}

// 地块方法类
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
        stage.startY    = StageCreateCfg.startY;
        stage.endY      = StageCreateCfg.endY;
        stage.moveProgress   = 0;

    }
    static setStageDown = ( stage: StageObj3D )=>{
        stage.startTime = Date.now();
        stage.startY    = StageDownCfg.startY;
        stage.endY      = StageDownCfg.endY;
        stage.moveProgress   = 0;
    }
    static computePosition = ( stage: StageObj3D )=>{
        let tempY: number, isUp: boolean, progress: number;;

        isUp    = (stage.startY - stage.endY) < 0;

        progress    = ( Date.now() - stage.startTime) / (isUp ? StageCreateCfg.time : StageDownCfg.time);
        stage.moveProgress  = progress > 1 ? 1 : progress;

        stage.y     = stage.startY + stage.moveProgress * ( stage.endY - stage.startY );

        stage.obj3D.transform.position[1] = stage.y;

        AmbientCtrl.modifyPos( stage.obj3D, stage.obj3D.transform.position );
    
        if ( !isUp && stage.moveProgress === 1 ){
            StageObjFunc.removeStage( stage.name );
        }
    }
    static computePosition_XZ = ( stage: StageObj3D )=>{
        let progress: number;

        progress    = ( Date.now() - stage.startTime) / (stage.XZTime);
        stage.moveProgress  = progress > 1 ? 1 : progress;

        stage.x     = stage.XZArray[0][0] + stage.moveProgress * ( stage.XZArray[1][0] - stage.XZArray[0][0] );
        stage.z     = stage.XZArray[0][1] + stage.moveProgress * ( stage.XZArray[1][1] - stage.XZArray[0][1] );

        stage.obj3D.transform.position[0] = stage.x;
        stage.obj3D.transform.position[2] = stage.z;

        AmbientCtrl.modifyPos( stage.obj3D, stage.obj3D.transform.position );
        
        if ( stage.moveProgress === 1 ){
            stage.XZArray   = undefined;
            stage.XZTime    = undefined;
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
    static getStageName = ( x: number, y: number )=>{
        return `${x}_${y}`;
    }
}


// ========================================方法定义


// ========================================立即运行
const init = ()=>{
    // TODO After Load
};

init();
