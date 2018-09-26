import { UINode } from "../../app/scene/uiNodeBase";
import { Z_ORDERS, UINodeCtrl, recordUIJson } from "../../app/scene/uiNode";
import { UIDataState, UIDataOpacity } from "../../app/scene/uiNodeCreator";
import { setPermanent, removePermanent } from "./frameCtrl";
import { AnimMath } from "./animMath";


let frameClass: string, frameNode: any, frameJson: any, ImageJson: any;
// let ImageAnimMap: Map<ImageAnimData, ImageAnimData> = new Map;
// let UINodeAnimMap: Map<UINodeAnimData, UINodeAnimData> = new Map;
let UINodeAnimMap_Math: Map<UINodeAnimData_Math, UINodeAnimData_Math> = new Map;
let ImageAnimMap_Math: Map<ImageAnimData_Math, ImageAnimData_Math> = new Map;

class AnimData {
    // 缩放 变化设置
    scaleArr: Array<number>;
    // 不透明度 变化设置
    opacityArr: Array<number>;
    // left 变化
    left: Array<number>;
    // top 变化
    top: Array<number>;
    // 动画持续时间
    time: number;
    // 动画起始时间
    _startTime: number;
    // 操作的节点
    _node: UINode;
    // 动画结束回调
    cb: Function;
    constructor( cb: Function ){
        this.cb     = cb;
    }
}

class AnimData_Math   {
    // 缩放 变化设置
    scaleArr: Array<number>;
    // 在 animMath 中的 函数名
    scaleMath: string;
    // 不透明度 变化设置
    opacityArr: Array<number>;
    // 在 animMath 中的 函数名
    opacityMath: string;
    // left 变化
    left: Array<number>;
    // 在 animMath 中的 函数名
    leftMath: string;
    // 动画 使用的具体函数
    leftMathFunc: Function;
    // top 变化
    top: Array<number>;
    // 在 animMath 中的 函数名
    topMath: string;
    // 动画 使用的具体函数
    topMathFunc: Function;
    // 动画持续时间
    time: number;
    // 动画起始时间
    _startTime: number;
    // 操作的节点
    _node: UINode;
    // 动画结束回调
    cb: Function;
    constructor( cb: Function ){
        this.cb     = cb;
    }
}

// /**
//  * 创建一个 临时图片动画，结束后自动销毁
//  * 需手动设置：
//  *      x, y : 图片创建时的位置，
//  *      width, height: 图片尺寸
//  *      time: 动画时间
//  */
// export class ImageAnimData extends AnimData {
//     imageURL: string;
//     x: number;
//     y: number;
//     _node: UINode;
//     width: number;
//     height: number;
//     constructor( imageURL: string, cb?: Function ){
//         super( cb );
//         this.imageURL   = imageURL;
//     }
//     run = ()=>{
//         let jsonNew: any;

//         ImageAnimFunc.init();

//         this._startTime = Date.now();

//         jsonNew = {
//             left: this.x,
//             top: this.y,
//             width: this.width,
//             height: this.height,
//             imageURL: this.imageURL
//         }

//         this._node   = UINodeCtrl.appendNode( {
//             parent: frameNode,
//             nodeName: this.imageURL,
//             jsonOrg: ImageJson,
//             jsonNew,
//             data: undefined
//         } );

//         ImageAnimMap.set( this, this );
//     }
//     dispose = ()=>{
//         this.cb && this.cb();

//         ImageAnimMap.delete( this );
//         UINodeCtrl.removeNode( this._node );
        
//         delete this.imageURL;
//         delete this.x;
//         delete this.y;
//         delete this.width;
//         delete this.height;

//         delete this._node;
//         delete this._startTime;
//         delete this.cb;
//         delete this.dispose;
//         delete this.left;
//         delete this.run;
//         delete this.scaleArr;
//         delete this.time;
//         delete this.top;
//     }
// }

// /**
//  * 创建一个节点的 一维动画
//  */
// export class UINodeAnimData extends AnimData {
//     _node: UINode;
//     constructor( node: UINode, cb: Function ){
//         super( cb );
//         this._node  = node;
//     }
//     run = ()=>{

//         this._startTime = Date.now();

//         UINodeAnimMap.set( this, this );
//     }
//     dispose = ()=>{
//         this.cb && this.cb();

//         UINodeAnimMap.delete( this );

//         delete this._node;
//         delete this._startTime;
//         delete this.cb;
//         delete this.dispose;
//         delete this.left;
//         delete this.run;
//         delete this.scaleArr;
//         delete this.time;
//         delete this.top;
//     }
// }
/**
 * @desc 创建一个 临时图片动画，结束后自动销毁
 * @param x (x, y): 图片创建时的位置，需手动设置
 * @param width (width, height): 图片尺寸，需手动设置
 * @param xxMath xxMathFunc 均不设置时，默认调用 “line” 函数
 * @param time 动画时间, 需手动设置
 * @param xxArr 属性变化设置, 需手动设置
 * @example
 *  this.startAnimData      = new ImageAnimData_Math( "text/startfight.png", this.startTipAnimEndCall );
 *  this.startAnimData.height   = 146;
 *  this.startAnimData.width    = 416;
 *  this.startAnimData.x        = 272;
 *  this.startAnimData.y        = 197;
 *  this.startAnimData.time     = 1200;
 *  this.startAnimData.opacityArr   = [ 0.4, 1 ];
 *  this.startAnimData.opacityMath  = "back1";
 *  this.startAnimData.run( );
 */
export class ImageAnimData_Math extends AnimData_Math {
    imageURL: string;
    x: number;
    y: number;
    width: number;
    height: number;
    cb: Function;
    constructor( imageURL: string, cb?: Function ){
        super( cb );
        this.imageURL   = imageURL;
        this.cb         = cb;
    }
    run = ()=>{
        let jsonNew: any;

        ImageAnimFunc.init();

        this._startTime = Date.now();

        jsonNew = {
            left: this.x,
            top: this.y,
            width: this.width,
            height: this.height,
            imageURL: this.imageURL
        }

        this._node   = UINodeCtrl.appendNode( {
            parent: frameNode,
            nodeName: this.imageURL,
            jsonOrg: ImageJson,
            jsonNew,
            data: undefined
        } );

        ImageAnimMap_Math.set( this, this );
    }
    dispose = ()=>{
        this.cb && this.cb();

        ImageAnimMap_Math.delete( this );
        UINodeCtrl.removeNode( this._node );

        delete this.imageURL;
        delete this.x;
        delete this.y;
        delete this.width;
        delete this.height;

        delete this._node;
        delete this._startTime;
        delete this.cb;
        delete this.dispose;
        delete this.left;
        delete this.leftMath;
        delete this.leftMathFunc;
        delete this.opacityArr;
        delete this.opacityMath;
        delete this.run;
        delete this.scaleArr;
        delete this.scaleMath;
        delete this.time;
        delete this.top;
        delete this.topMath;
        delete this.topMathFunc;
    }
}
/**
 * @description 对指定节点 创建动画; top 可关联 left 的变化，做二维运动动画;
 * @param xxMath xxMathFunc 均不设置时，默认调用 “line” 函数
 * @param time 动画时间, 需手动设置
 * @param xxArr 属性变化设置, 需手动设置
 * @example: 
 *      let data: UINodeAnimData_Math;
 *      // 创建动画实例
 *      data            = new UINodeAnimData_Math( this.node, this.dispose );
 *      // 设置动画时间
 *      data.time       = DamageUICfg.times;
 *      // 设置动画 left 变化 
 *      data.left       = [ left, left2 ];
 *      // 设置动画 left 变化函数名称
 *      data.leftMath   = "line";
 *      // 设置动画 top 变化, 
 *      // 此处 top 变化只传入一个值，表示top起点，动画中top变化函数 left 为函数 自变量，top运动轨迹为 函数图像， 图像横纵比例尺 相同。
 *      // 此处 top 变化传入两个值，则 top 独立 于 left 变化
 *      data.top        = [ top ];
 *      // 设置动画 top 变化函数 
 *      data.topMathFunc    = (x)=>{ return 2*AnimMath["power2_1_3_down_0"](x); } ;
 *      // 开始动画
 *      data.run( );
 */
export class UINodeAnimData_Math extends AnimData_Math {
    cb: Function;
    constructor( node: UINode, cb: Function ){
        super( cb );
        this._node  = node;
        this.cb     = cb;
    }
    run = ()=>{
        this._startTime = Date.now();

        UINodeAnimMap_Math.set( this, this );
    }
    dispose = ()=>{
        this.cb && this.cb();

        UINodeAnimMap_Math.delete( this );

        delete this._node;
        delete this._startTime;
        delete this.cb;
        delete this.dispose;
        delete this.left;
        delete this.leftMath;
        delete this.leftMathFunc;
        delete this.opacityArr;
        delete this.opacityMath;
        delete this.run;
        delete this.scaleArr;
        delete this.scaleMath;
        delete this.time;
        delete this.top;
        delete this.topMath;
        delete this.topMathFunc;
    }

}


export class ImageAnimFunc {
    static init = ()=>{
        if ( frameNode === undefined ){
            ImageAnimFunc.openFrame();
        }
    }
    static dispose = ()=>{

        ImageAnimFunc.closeFrame();

        frameNode   = undefined;
    }
    static openFrame = ()=>{
        frameNode   = UINodeCtrl.openFrame( {
                        frameClass,
                        nodeName: frameClass+"0",
                        jsonNew: undefined,
                        data: undefined
                    } );
    }
    static closeFrame = ()=>{
        UINodeCtrl.removeNode( frameNode );
    }
}

class AnimCtrl {
    static init = ()=>{
        setPermanent( "ImageAnimFrame", AnimCtrl.update );
    }
    static dispose = ()=>{
        removePermanent( "ImageAnimFrame" );
    }
    static update = ()=>{
        // ImageAnimMap.forEach( data => {
        //     AnimCtrl.computeImageState( data );
        // } );
        
        // UINodeAnimMap.forEach( data => {
        //     AnimCtrl.computeUINodeState( data );
        // } );
        
        ImageAnimMap_Math.forEach( data => {
            AnimCtrl.computeImageState_Math( data );
        } );

        UINodeAnimMap_Math.forEach( data => {
            AnimCtrl.computeUINodeState_Math( data );
        } );
    }
    // static computeImageState = ( data: ImageAnimData )=>{
    //     let timeProgress: number, state: UIDataState, opacity: UIDataOpacity;

    //     timeProgress    = (Date.now() - data._startTime) / data.time;
    //     timeProgress    = timeProgress > 1 ? 1 : timeProgress ;

    //     AnimCtrl.computeState( data, timeProgress );
        
    //     if ( timeProgress === 1 ){
    //         data.dispose();
    //     }
    // }
    
    static computeImageState_Math = ( data: ImageAnimData_Math )=>{
        let timeProgress: number;

        timeProgress    = (Date.now() - data._startTime) / data.time;
        timeProgress    = timeProgress > 1 ? 1 : timeProgress ;

        AnimCtrl.computeState_Math( data, timeProgress );
        
        if ( timeProgress === 1 ){
            data.dispose();
        }
    }
    
    // static computeUINodeState = ( data: UINodeAnimData )=>{
    //     let timeProgress: number, state: UIDataState, opacity: UIDataOpacity, left: number, top: number, scale: number;;

    //     timeProgress    = (Date.now() - data._startTime) / data.time;
    //     timeProgress    = timeProgress > 1 ? 1 : timeProgress ;

    //     AnimCtrl.computeState( data, timeProgress );
        
    //     if ( timeProgress === 1 ){
    //         data.dispose();
    //     }
    // }
    
    static computeUINodeState_Math = ( data: UINodeAnimData_Math )=>{
        let timeProgress: number;

        timeProgress    = (Date.now() - data._startTime) / data.time;
        timeProgress    = timeProgress > 1 ? 1 : timeProgress ;

        AnimCtrl.computeState_Math( data, timeProgress );
        
        if ( timeProgress === 1 ){
            data.dispose();
        }
    }

    // static computeState = ( data: AnimData, timeProgress: number )=>{
    //     let state: UIDataState, opacity: UIDataOpacity, left: number, top: number, scale: number;

    //     if ( data.opacityArr !== undefined ){
    //         opacity = new UIDataOpacity( data.opacityArr[0] - timeProgress * ( data.opacityArr[0] - data.opacityArr[1] ) );
    //         UINodeCtrl.updateNodeData( data._node, opacity );
    //     }

    //     if ( data.scaleArr !== undefined ){
    //         scale   = data.scaleArr[0] - timeProgress * ( data.scaleArr[0] - data.scaleArr[1] );
    //         scale   = scale <= 0 ?  0.001 : scale ;
    //     }
        
    //     if ( data.left !== undefined ){
    //         left    = data.left[0] - timeProgress * ( data.left[0] - data.left[1] );
    //     }
        
    //     if ( data.top !== undefined ){
    //         top     = data.top[0] - timeProgress * ( data.top[0] - data.top[1] );
    //     }

    //     if ( scale !== undefined || left !== undefined || top !== undefined ){
    //         state   = new UIDataState( { left: left, top: top, scale: scale === undefined ? undefined : [scale, scale, scale] } ); 
    //         UINodeCtrl.updateNodeData( data._node, state );
    //     }
    // }

    static computeState_Math = ( data: AnimData_Math, timeProgress: number )=>{

        let progress: number, state: UIDataState, opacity: UIDataOpacity, left: number, top: number, scale: number, tempFun: Function;

        if ( data.opacityArr !== undefined ){

            data.opacityMath    = data.opacityMath ? data.opacityMath : "line";

            progress    = AnimMath[ data.opacityMath ]( timeProgress );
            opacity     = new UIDataOpacity( data.opacityArr[0] - progress * ( data.opacityArr[0] - data.opacityArr[1] ) );
            UINodeCtrl.updateNodeData( data._node, opacity );
        }

        if ( data.scaleArr !== undefined ){
            
            data.scaleMath  = data.scaleMath ? data.scaleMath : "line";

            progress    = AnimMath[ data.scaleMath ]( timeProgress );
            scale       = data.scaleArr[0] - progress * ( data.scaleArr[0] - data.scaleArr[1] );
            scale       = scale <= 0 ? 0.001 : scale ;
        }
        
        if ( data.left !== undefined ){

            tempFun     = data.leftMath ? AnimMath[ data.leftMath ] : data.leftMathFunc;
            tempFun     = tempFun ? tempFun : AnimMath[ "line" ];

            progress    = tempFun( timeProgress );
            left        = data.left[0] - progress * ( data.left[0] - data.left[1] );
        }
        
        if ( data.top !== undefined ){
            // top 随 left 变化 的条件
            if ( tempFun !== undefined && data.top.length === 1 ){

                tempFun = data.topMath ? AnimMath[ data.topMath ] : data.topMathFunc;
                tempFun = tempFun ? tempFun : AnimMath[ "line" ];

                progress= tempFun( progress );
                top     = data.top[0] - progress * ( Math.abs(data.left[0] - data.left[1]) );

            }else{

                tempFun = data.topMath ? AnimMath[ data.topMath ] : data.topMathFunc;
                tempFun = tempFun ? tempFun : AnimMath[ "line" ];

                progress= tempFun( timeProgress );
                top     = data.top[0] - progress * ( data.top[0] - data.top[1] );
            }
        }

        if ( scale !== undefined || left !== undefined || top !== undefined ){
            state   = new UIDataState( { left: left, top: top, scale: scale === undefined ? undefined : [scale, scale, scale] } ); 
            UINodeCtrl.updateNodeData( data._node, state );
        }
    }
}


const init = ()=>{

    frameClass = "ImageAnimFrame";

    frameJson = { nodeName: "ImageAnimFrame0", nodeType: "FRAME", uiClass: frameClass, width: 0, height: 0, left: 0, top: 0, z_relat: Z_ORDERS.POP2,
                nodes: [],
                design: {}
            };
    ImageJson = { nodeName: "nodeName", nodeType: "IMAGE", imageURL: "", width: 32, height: 32, left: 0, top: 0, z_relat: 0 };

    recordUIJson( frameClass, frameJson );
    
    AnimCtrl.init();
}

init();