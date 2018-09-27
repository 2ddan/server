/**
 * 场景事件：
 *      点击反馈
 *          down
 *          up
 *          longTap
 *      
 *      移动反馈
 *          拖动目标
 *          缩放相机
 *          旋转相机
 *          移动相机
 */

import { UIListenerTypes }       from "./uiNodeEnum";
import { mgr, mgr_data, getRootScale, getRootRotate, getDisplayDiff }            from "./scene";
import { HEIGHT } from "./sceneCfg";

let FLAG_UP: boolean,
    FLAG_DOWN: Boolean;

let Event_last: any, Event_down: any, Event_scale: any;
let SpeedX: number, SpeedY: number;
let DownX: number, DownY: number;
let Radio: number;

let downRayCast: RayCastCfg, upRayCast: RayCastCfg;
let moveLastRayCast: RayCastCfg, moveCurrRayCast: RayCastCfg;
let Listen3DMapDown: Map<string, Function> = new Map;
let Listen3DMapUp: Map<string, Function> = new Map;

export let UpListenerMap: Map<number, Function>         = new Map;
export let DownListenerMap: Map<number, Function>       = new Map;
export let TapListenerMap: Map<number, Function>        = new Map;
export let LongTapListenerMap: Map<number, Function>    = new Map;
export let MoveListenerMap: Map<number, Function>       = new Map;
export let ListenMaps: any;


class TouchEvent {
    touches: Array<any>;
    changedTouches: Array<any>;
}

export class RayCastCfg {
    time: number;
    x: number;
    y: number;
    target: any;
    constructor(){
        this.time   = Date.now();
        this.x      = undefined;
        this.y      = undefined;
        this.target = undefined;
    }
    dispose = ()=>{
        this.time   = undefined;
        this.x      = undefined;
        this.y      = undefined;
        this.target = undefined;
    }
}

export class CanvasListener {
    static up = ( event )=>{
        let res: any, flag: string;
        let x: number, y: number;
        
        event.preventDefault();

        [ x, y ]    = ToolFunc.readChangeTouch( event );
        [ res, flag ]      = ToolFunc.getRayCastTarget( [ x, y ] );

        FLAG_UP     = true;
        Event_last  = event;

        // down 与 up 目标一致时才响应 up
        // if ( target !== undefined && target.id !== undefined ){
            // if ( downRayCast.target !== undefined && downRayCast.target.id === target.id ){
                // UIListener.callListen( UIListenerTypes[0], target.id );
            // }
        // }
        if (downRayCast.target !== undefined){

            UIListener.callListen( UIListenerTypes[0], downRayCast.target.id );

        }
        
        if ( flag !== "2D" ){
            UIListener.call3DListenUp( downRayCast.target );
        }

        downRayCast.dispose();
        moveLastRayCast.dispose();
        moveCurrRayCast.dispose();
    }
    static down = ( event )=>{
        let res: any, flag: string;
        let x: number, y: number;
        
        // event.preventDefault();
        
        [ x, y ]    = ToolFunc.readTouch( event );

        [ res, flag ]      = ToolFunc.getRayCastTarget( [ x, y ] );


        FLAG_DOWN   = true;
        Event_down  = (event as TouchEvent ).touches[0];
        
        downRayCast.target  = res;
        downRayCast.x       = x;
        downRayCast.y       = y;
        downRayCast.time    = Date.now();
    
        if ( flag === "2D" ){

            if ( res !== undefined && res.id !== undefined ){
                UIListener.callListen( UIListenerTypes[1], res.id );
            }

        }else{
            
            UIListener.call3DListenDown( res );

        }
    }
    static move = ( event )=>{
        let diffX: number, diffY: number;
        let x: number, y: number;

        
        event.preventDefault();

        [ x, y ]    = ToolFunc.readTouch( event );

        if ( moveLastRayCast.target === undefined ){
            moveLastRayCast.target  = downRayCast.target;
            moveLastRayCast.x       = x;
            moveLastRayCast.y       = y;
            moveLastRayCast.time    = Date.now();

        }

        if ( moveCurrRayCast.target !== undefined ){
            moveLastRayCast.target  = downRayCast.target;
            moveLastRayCast.x       = moveCurrRayCast.x ;
            moveLastRayCast.y       = moveCurrRayCast.y ;
            moveLastRayCast.time    = moveCurrRayCast.time ;
        }

        moveCurrRayCast.target  = downRayCast.target;
        moveCurrRayCast.x       = x;
        moveCurrRayCast.y       = y;
        moveCurrRayCast.time    = Date.now();

        if ( moveCurrRayCast.target !== undefined && moveCurrRayCast.target.id !== undefined ){
            [ diffX, diffY ]        = ToolFunc.computeMoveDiff();
            UIListener.callListen( UIListenerTypes[4], moveCurrRayCast.target.id, [ diffX, diffY ] );
        }
    }
}


export class UIListener {
    static setListen = ( type: string, rayID: number, f: Function )=>{
        let tempMap: Map<number, Function>;

        if ( ListenMaps[type] !== undefined ){
            tempMap = ListenMaps[type];

            if ( tempMap.get( rayID ) === undefined ){
                tempMap.set( rayID, f );
            }
        }
    }
    static callListen = ( type: string, rayID: number, data?: any )=>{
        let tempMap: Map<number, Function>, func: Function;

        if ( ListenMaps[type] !== undefined ){
            tempMap = ListenMaps[type];

            func    = tempMap.get( rayID );
            func    && func( data );
        }
    }
    static removeListen = ( type: string, rayID: number )=>{
        let tempMap: Map<number, Function>;

        if ( ListenMaps[type] !== undefined ){
            tempMap = ListenMaps[type];

            if ( tempMap.get( rayID ) !== undefined ){
                tempMap.delete( rayID );
            }
        }
    }
    static add3DListenDown = ( key: string, f: Function )=>{
        Listen3DMapDown.set( key, f ); 
    }
    static del3DListenDown = ( key: string )=>{
        Listen3DMapDown.delete( key ); 
    }
    static add3DListenUp = ( key: string, f: Function )=>{
        Listen3DMapUp.set( key, f ); 
    }
    static del3DListenUp = ( key: string )=>{
        Listen3DMapUp.delete( key ); 
    }
    static call3DListenDown  = ( res )=>{
        Listen3DMapDown.forEach( f => {
            f && f( res );
        } )
    }
    static call3DListenUp  = ( res )=>{
        Listen3DMapUp.forEach( f => {
            f && f( res );
        } )
    }
}

export class ToolFunc {
    static computeMoveDiff = ()=>{
        let diffX: number, diffY: number;
        let scaleW: number, scaleH: number;
        let isRotate: boolean;

        isRotate = getRootRotate();

        [scaleW, scaleH] = getRootScale();

        diffX   = moveCurrRayCast.x - moveLastRayCast.x;
        diffY   = moveCurrRayCast.y - moveLastRayCast.y;

        if ( isRotate === true ){
            return [ diffY/scaleH, -diffX/scaleW  ];
        }else{
            return [ diffX/scaleW, diffY/scaleH ];
        }
    }
    static computeScaleDiff = ()=>{

    }
    static getRayCastTarget = ( [ x, y ] )=>{
        let scaleW: number, scaleH: number;
        let diffW: number, diffH: number;
        let isRotate: boolean;
        let res: any, flag: any;

        isRotate = getRootRotate();

        [scaleW, scaleH] = getRootScale();

        [ diffW, diffH ] = getDisplayDiff();


        if ( isRotate === true ){
            
            return mgr_data.threeScene.raycast( (y -diffW) / scaleW, (HEIGHT - (x -diffH) / scaleH) );
        }else{
            return mgr_data.threeScene.raycast( (x -diffW) / scaleW, (y -diffH) / scaleH );
        }

    }
    static readTouch = ( touch: TouchEvent, index: number = 0 )=>{
        return [ touch.touches[0].clientX, touch.touches[0].clientY ];
    }
    static readChangeTouch = ( touch: TouchEvent, index: number = 0 )=>{
        return [ touch.changedTouches[0].clientX, touch.changedTouches[0].clientY ]
    }
}



export const init = ()=>{
    let canvas = mgr.getCanvas();

    FLAG_UP     = false,
    FLAG_DOWN   = false;
    
    // let Event_last: any, Event_down: any, Event_scale: any;
    // let SpeedX: number, SpeedY: number;
    // let DownX: number, DownY: number;
    // let Radio: number;
    
    downRayCast = new RayCastCfg;
    upRayCast   = new RayCastCfg;
    
    moveCurrRayCast = new RayCastCfg;
    moveLastRayCast = new RayCastCfg;

    UpListenerMap       = new Map;
    DownListenerMap     = new Map;
    TapListenerMap      = new Map;
    LongTapListenerMap  = new Map;
    MoveListenerMap     = new Map;

    ListenMaps          = {};
    ListenMaps[ UIListenerTypes[0] ]    = UpListenerMap;
    ListenMaps[ UIListenerTypes[1] ]    = DownListenerMap;
    ListenMaps[ UIListenerTypes[2] ]    = TapListenerMap;
    ListenMaps[ UIListenerTypes[3] ]    = LongTapListenerMap;
    ListenMaps[ UIListenerTypes[4] ]    = MoveListenerMap;
    
    canvas.addEventListener( 'touchstart', CanvasListener.down, false );
    canvas.addEventListener( 'touchend', CanvasListener.up, false );
    canvas.addEventListener( 'touchmove', CanvasListener.move, false );
    canvas.addEventListener( 'contextmenu', function(e){
        e.preventDefault();
      });
}

