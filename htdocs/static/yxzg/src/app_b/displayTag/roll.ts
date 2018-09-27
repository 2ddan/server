import { UINode } from "../../app/scene/uiNodeBase";
import { Z_ORDERS, UINodeCtrl, UIDataState, recordUIJson } from "../../app/scene/uiNode";
import { UIDataText } from "../../app/scene/uiNodeCreator";
import { setPermanent, removePermanent } from "../frameCtrl/frameCtrl";

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
const LeftCfgBegin = {
    left: -960
}

const LeftCfgEnd = {
    left: 0
}

const RightCfgBegin = {
    left: 960
}
const RightCfgEnd = {
    left: 450
}

const INTime    = 300;
const OutTime   = 400;
const StayTime  = 500;
const TEXTSIZE1 = (80/4);
const TEXTSIZE2 = (64/4);


const RollAnimFlags = {
    "IN": 0,
    "STAY": 1,
    "OUT": 2
}


// ========================================导出接口


// ========================================数据结构
class CallParam {
    callBack: Function;
}

class AnimData {
    animFlag: number;
    animStartTime: number;
    animProgrerss: number;
}

class FrameData {
    text1: UIDataText;
    text2: UIDataText;
}

// ========================================变量声明
let frameNode: UINode, frameJson: any, frameData: any, frameClass:string = "FrameRoll";
let currCallParam: CallParam, currAnimData: AnimData;
let counter: number = 0;


// ========================================类定义
export class Roll {
    static show = ( 
            { text1, text2, cb }:
            { text1: string, text2: string, cb: Function } )=>{

        currCallParam   = new CallParam;
        currCallParam.callBack  = cb;

        (frameData as FrameData ).text1 = new UIDataText( text1 );
        (frameData as FrameData ).text2 = new UIDataText( text2 );

        RollFunc.init();
    }
}

class RollFunc {
    static init = ()=>{
        RollFunc.openFrame();
        RollFunc.initAnimData();
    }
    static dispose = ()=>{
        let cb: Function;

        cb  = currCallParam.callBack;

        cb && cb();
        RollFunc.disposeAnimData();
        RollFunc.closeFrame();
        
        currCallParam   = undefined;
        currAnimData    = undefined;
        frameNode       = undefined;
    }
    static openFrame = ()=>{

        frameNode = UINodeCtrl.openFrame( { 
                        frameClass,
                        nodeName:   `frameRoll${counter++}`,
                        jsonNew:    undefined,
                        data:       frameData
                    } );

        AnimCtrl.active( true );
    }
    static closeFrame = ()=>{
        
        AnimCtrl.active( false );
        UINodeCtrl.removeNode( frameNode );
    }
    static initAnimData = ()=>{
        currAnimData    = new AnimData;
        currAnimData.animFlag   = RollAnimFlags.IN;
        currAnimData.animProgrerss  = 0;
        currAnimData.animStartTime  = Date.now();
    }
    static disposeAnimData = ()=>{
        delete currAnimData.animFlag ;
        delete currAnimData.animProgrerss ;
        delete currAnimData.animStartTime ;

        currAnimData    = undefined;
    }
}

class AnimCtrl {
    static update = ()=>{
        AnimCtrl.computeAnim();
    }
    static active = ( b: boolean )=>{
        if ( b === true ){
            setPermanent( "RollFrame", AnimCtrl.update );
        }else{
            removePermanent( "RollFrame" );
        }
    }
    static computeAnim = ()=>{
        let progress: number, tempTime: number;

        if ( currAnimData.animFlag === RollAnimFlags.IN ){
            tempTime    = Date.now() - currAnimData.animStartTime;
            progress    = tempTime / INTime;
            progress    = progress > 1 ? 1 : progress ;
            
            if ( progress === 1 ){

                currAnimData.animStartTime  = currAnimData.animStartTime + INTime;
                currAnimData.animFlag       = RollAnimFlags.STAY;
                currAnimData.animProgrerss  = 0;

                UINodeCtrl.updateNodeWithName( frameNode, "ROLLBG", new UIDataState( { left: LeftCfgEnd.left } ) );
                UINodeCtrl.updateNodeWithName( frameNode, "TEXTBG", new UIDataState( { left: RightCfgEnd.left } ) );
                
            }else{

                currAnimData.animProgrerss  = progress;
                UINodeCtrl.updateNodeWithName( frameNode, "ROLLBG", new UIDataState( { left: LeftCfgBegin.left+(currAnimData.animProgrerss)*(LeftCfgEnd.left - LeftCfgBegin.left) } ) );
                UINodeCtrl.updateNodeWithName( frameNode, "TEXTBG", new UIDataState( { left: RightCfgBegin.left+(currAnimData.animProgrerss)*(RightCfgEnd.left - RightCfgBegin.left) } ) );
            
            }

        }else if ( currAnimData.animFlag === RollAnimFlags.STAY ) {

            tempTime    = Date.now() - currAnimData.animStartTime;
            progress    = tempTime / StayTime;
            progress    = progress > 1 ? 1 : progress ;
            
            if ( progress === 1 ){
                currAnimData.animStartTime  = currAnimData.animStartTime + StayTime;
                currAnimData.animFlag       = RollAnimFlags.OUT;
                currAnimData.animProgrerss  = 0;
            }else{
                currAnimData.animProgrerss  = progress;
            }

        }else{

            tempTime    = Date.now() - currAnimData.animStartTime;
            progress    = tempTime / OutTime;
            progress    = progress > 1 ? 1 : progress ;
            
            if ( progress === 1 ){
                RollFunc.dispose();
            }else{
                currAnimData.animProgrerss  = progress;
                UINodeCtrl.updateNodeWithName( frameNode, "ROLLBG", new UIDataState( { left: LeftCfgEnd.left+(currAnimData.animProgrerss)*(LeftCfgBegin.left - LeftCfgEnd.left) } ) );
                UINodeCtrl.updateNodeWithName( frameNode, "TEXTBG", new UIDataState( { left: RightCfgEnd.left+(currAnimData.animProgrerss)*(RightCfgBegin.left - RightCfgEnd.left) } ) );
            }
        }
    }
}


// ========================================方法定义


// ========================================立即运行
const init = ()=>{
    // TODO After Load

    frameJson = { 
        nodeName: "nodeName", nodeType: "FRAME", uiClass: frameClass, 
        width: 960, height: 540, left: 0, top: 0, z_relat: Z_ORDERS.POP,
        nodes: [
            { nodeName: "BG", nodeType: "COLOR", bgColor: "#222222", width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: 0.2  },
            { nodeName: "ROLLBG", nodeType: "COLOR", bgColor: "#000000", width: 960, height: 80, left: -960, top: 240, z_relat: 0, opacity: 0.8 },
            { nodeName: "TEXTBG", nodeType: "COLOR", bgColor: "#666666", width: 160, height: 80, left: 960,  top: 240, z_relat: 0, opacity: 0.5  },
            { nodeName: "TEXT1", nodeType: "TEXT", text: "", 
                    width: 160, left: 80, top: 5, font: `normal normal ${TEXTSIZE1}px mnjsh`, 
                    font_space: -2,color: "#ffffff", align: "center", 
                    border_width: 1, border_color: "#000000", isCommon: false, z_relat: 0 },
            { nodeName: "TEXT2", nodeType: "TEXT", text: "", 
                    width: 160, left: 80, top: 30, font: `normal normal ${TEXTSIZE2}px mnjsh`, 
                    font_space: -2,color: "#e0e0e0", align: "center", 
                    border_width: 1, border_color: "#000000", isCommon: false, z_relat: 0 }
        ],
        design: {
            "BG":       true,
            "ROLLBG":   true,
            "TEXTBG":   [ "TEXT1", "TEXT2" ]
        },
        dataMatch: {
            "TEXT1" : "text1",
            "TEXT2" : "text2"
        }
    };

    frameData = {
        text1: { "text" : "TEXT1" },
        text2: { "text" : "text2" }
    };
    
    recordUIJson( frameClass, frameJson );
};
init();

