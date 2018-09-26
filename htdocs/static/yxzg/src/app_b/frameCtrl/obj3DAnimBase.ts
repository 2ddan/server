

import { setPermanent, removePermanent } from "./frameCtrl";
import { AnimMath } from "./animMath";
import { mgr } from "../../app/scene/scene";

/**
 * 3D 模型动画
 */
export class Obj3DAnimData {

    scaleArr: Array<number>;
    scaleMath: string;

    speedMath: string;
    speedMathFunc: Function;

    posArray: Array<Array<number>>;
    xMath: string;
    xMathFunc: Function;

    yMath: string;
    yMathFunc: Function;
    
    zMath: string;
    zMathFunc: Function;

    time: number;
    _startTime: number;
    _obj3D: any;
    cb: Function;
    constructor( obj3D: any, cb: Function ){
        this._obj3D = obj3D;
        this.cb     = cb;
    }
    run = ()=>{
        this._startTime = Date.now();

        Obj3DAnimMap.set( this, this );
    }
    dispose = ()=>{
        this.cb && this.cb();

        Obj3DAnimMap.delete( this );

        delete this._obj3D;
        delete this._startTime;
        delete this.cb;
        delete this.dispose;
        delete this.posArray;
        delete this.run;
        delete this.scaleArr;
        delete this.scaleMath;
        delete this.time;
        delete this.xMath;
        delete this.xMathFunc;
        delete this.yMath;
        delete this.yMathFunc;
        delete this.zMath;
        delete this.zMathFunc;
        
        delete this.speedMath;
        delete this.speedMathFunc;
    }
}


let Obj3DAnimMap: Map<Obj3DAnimData, Obj3DAnimData> = new Map;


class AnimCtrl {
    static init = ()=>{
        setPermanent( "Obj3DAnimFrame", AnimCtrl.update );
    }
    static dispose = ()=>{
        removePermanent( "Obj3DAnimFrame" );
    }
    static update = ()=>{

        Obj3DAnimMap.forEach( data => {
            if ( data._obj3D.ref === undefined || data._obj3D.ref.impl === undefined ){
                data.cb = undefined;
                data.dispose();
            }else{
                AnimCtrl.computeObj3DState_Math( data );
            }
        } );
    }
    
    static computeObj3DState_Math = ( data: Obj3DAnimData )=>{
        let timeProgress: number;

        timeProgress    = (Date.now() - data._startTime) / data.time;
        timeProgress    = timeProgress > 1 ? 1 : timeProgress ;

        AnimCtrl.computeState_Math( data, timeProgress );
        
        if ( timeProgress === 1 ){
            data.dispose();
        }
    }

    static computeState_Math = ( data: Obj3DAnimData, timeProgress: number )=>{

        let speedProgress: number, progress: number, x: number, y: number, z: number, scale: number, tempFun: Function, tempFunName: string;

        tempFun     = data.speedMath ? AnimMath[ data.speedMath ] : data.speedMathFunc ;
        tempFun     = tempFun ? tempFun : AnimMath[ "line" ];

        speedProgress   = tempFun( timeProgress );

        if ( data.scaleArr !== undefined ){
            
            data.scaleMath  = data.scaleMath ? data.scaleMath : "line";

            progress    = AnimMath[ data.scaleMath ]( speedProgress );
            scale       = data.scaleArr[0] - progress * ( data.scaleArr[0] - data.scaleArr[1] );
            scale       = scale <= 0 ? 0.001 : scale ;

            mgr.setOnlyScale( data._obj3D, [scale, scale, scale] );
        }
        
        if ( data.posArray !== undefined ){

            tempFun     = data.xMath ? AnimMath[ data.xMath ] : data.xMathFunc;
            tempFun     = tempFun ? tempFun : AnimMath[ "line" ];
            progress    = tempFun( speedProgress );
            x           = data.posArray[0][0] - progress * ( data.posArray[0][0] - data.posArray[1][0] );
            // console.warn( progress, x );

            
            tempFun     = data.yMath ? AnimMath[ data.yMath ] : data.yMathFunc;
            tempFun     = tempFun ? tempFun : AnimMath[ "line" ];
            progress    = tempFun( speedProgress );
            y           = data.posArray[0][1] - progress * ( data.posArray[0][1] - data.posArray[1][1] );
            // console.warn( progress, y );
            
            tempFun     = data.zMath ? AnimMath[ data.zMath ] : data.zMathFunc;
            tempFun     = tempFun ? tempFun : AnimMath[ "line" ];
            progress    = tempFun( speedProgress );
            z           = data.posArray[0][2] - progress * ( data.posArray[0][2] - data.posArray[1][2] );
            // console.warn( progress, z );

            mgr.setOnlyPos2( data._obj3D, [x, y, z] );
        }
    }
}


const init = ()=>{
    AnimCtrl.init();
}

init();