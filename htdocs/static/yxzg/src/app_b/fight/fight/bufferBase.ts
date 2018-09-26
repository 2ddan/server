
// ======================================== 模块引入

import { UINode, getFont } from "../../../app/scene/uiNodeBase";
import { UINodeCtrl, UIDataState }   from "../../../app/scene/uiNode";
import { FighterData, BuffUICfg }  from "./fightSceneUIBase";
import { ImageAnimData_Math } from "../../frameCtrl/imageAnimBase";
import { setPermanent, removePermanent } from "../../frameCtrl/frameCtrl";

// ======================================== 常量定义

export const BufferCfg = {
    "100035": "attack", // 攻击
    "100029": "quick", // 加速
    "100036": "disrupt", // 混乱
    "100023": "thorns", // 荆棘
    "100032": "guardBreak", // 破防
    "100031": "strong"  // 强壮
}


export const readBuffURL = ( buffID: number )=>{
    return `symbol/${BufferCfg[buffID]}.png`;
}



// ======================================== 数据结构
// buff 表现数据
export class BuffNode {
    node: UINode;
    nodeText: UINode;
    number: number = 0;
    color: number = 0;
    buffIcon: string;
    buffIndex: number;
}
// buff 表现的动画数据
class BuffAnimData {
    node: UINode;
    startTime: number;
}


// ======================================== 变量声明
let frame: UINode, 
    nodeBuffJson: any,
    nodeBuffTextJson: any,
    BuffAnimMap: Map<BuffAnimData, BuffAnimData> = new Map;


// ======================================== 类定义

export class BuffFunc {
    static initFrame = ( parent: UINode )=>{
        frame   = parent;
        AnimCtrl.init();
    }
    
    static dispose = ( )=>{
        AnimCtrl.dispose();
    }

    static disposeFighter = ( fighterData: FighterData )=>{


        fighterData.nodeBufferMap.forEach( (buff) => {
            BuffFunc.removeBuff( buff );
        } );

        fighterData.bufferList.length   = 0;
        fighterData.nodeBufferMap.clear();
    }
    /**
     * 创建一个 buff 图标及数值表现
     */
    static createNodeBuff = ( buff: BuffNode, fighterData: FighterData )=>{
        let node: UINode, nodeText: UINode, tempZ: number, imgURL: string, jsonNew: any;
        let tempLeft: number, tempTop: number, nodeName: string;


        imgURL  = BuffFunc.getBufferURL(buff.buffIcon) ;
        tempZ   = frame.z + 10;
        tempLeft= BuffFunc.computeBufferDiffLeft( fighterData, buff.buffIndex );
        tempTop = BuffFunc.computeBufferDiffTop( fighterData, buff.buffIndex );
        nodeName= BuffFunc.getBufferName( buff.buffIcon, fighterData.fighter.id );
        jsonNew = {
                    z_relat:    tempZ,
                    imageURL:   imgURL,
                    left:       tempLeft,
                    top:        tempTop   
                };
        node    = UINodeCtrl.appendNode( {
                    parent:     frame,
                    jsonOrg:    nodeBuffJson,
                    jsonNew:    jsonNew,
                    nodeName:   nodeName,
                    data:       undefined
                } );

        if ( buff.number !== undefined && buff.number !== 0 ){

            tempZ   = tempZ + 1;
            tempLeft= tempLeft + BuffUICfg.WIDTH;
            tempTop = tempTop  + BuffUICfg.HEIGHT -BuffUICfg.textSize;
            jsonNew = {
                        z_relat:    tempZ,
                        left:       tempLeft,
                        top:        tempTop,
                        text:       `${buff.number}`,
                        color:      buff.color > 0 ? "#00ff00" : "#ff0000" 
                    };
            nodeText= UINodeCtrl.appendNode( {
                        parent:     frame,
                        jsonOrg:    nodeBuffTextJson,
                        jsonNew:    jsonNew,
                        nodeName:   nodeName + "_txt",
                        data:       undefined
                    } );
        }

        buff.node       = node;
        buff.nodeText   = nodeText;

        AnimCtrl.add( node );

        BuffFunc.createImageAnim( imgURL, fighterData );

        return buff;
    }

    /**
     * 创建 BUFF 的简单图片动画
     */
    private static createImageAnim = ( imgURL: string, fighterData: FighterData )=>{
        let imageAnimdata: ImageAnimData_Math;

        imageAnimdata   = new ImageAnimData_Math(  imgURL ) ;
        imageAnimdata.imageURL  = imgURL;
        imageAnimdata.scaleArr  = [ 1, 2 ];
        imageAnimdata.time      = 1000;
        imageAnimdata.width     = 32;
        imageAnimdata.height    = 32;
        imageAnimdata.x         = fighterData.nodeLeft -16;
        imageAnimdata.y         = fighterData.nodeTop -16;

        imageAnimdata.run( );
    }

    static removeBuff = ( buff: BuffNode )=>{

        buff.node && UINodeCtrl.removeNode( buff.node );
        buff.nodeText && UINodeCtrl.removeNode( buff.nodeText );

        delete buff.node;
        delete buff.buffIndex;
        delete buff.buffIcon;
        delete buff.nodeText;
        delete buff.number;
    }

    static getBufferName = ( buffIcon: string, fighterID: number )=>{
        return `${fighterID}_${buffIcon}`;
    }
    
    static getBufferURL = ( buffIcon: string )=>{
        return `symbol/${buffIcon}.png`;
    }

    /**
     * 更新 buff 图标表现  < buff 数目 及 buff 数值 变化时>
     */
    static updateBufferState = ( fighterData: FighterData, buffIcon: string, buffIndex: number )=>{
        let left: number, top: number;
        let dataStateText: UIDataState, dataState: UIDataState;
        let buff: BuffNode;

        left    = BuffFunc.computeBufferDiffLeft( fighterData, buffIndex );
        top     = BuffFunc.computeBufferDiffTop( fighterData, buffIndex );
        buff    = fighterData.nodeBufferMap.get( buffIcon );

        dataState   = new UIDataState;
        dataState.state.left    = left;
        dataState.state.top     = top;

        UINodeCtrl.updateNodeData( buff.node, dataState );

        dataStateText   = new UIDataState;
        dataStateText.state.left    = left + BuffUICfg.WIDTH;
        dataStateText.state.top     = top  + BuffUICfg.HEIGHT -BuffUICfg.textSize;

        UINodeCtrl.updateNodeData( buff.nodeText, dataStateText );
    }

    static computeBufferDiffLeft = ( fighterData: FighterData, buffindex: number )=>{
        return fighterData.nodeLeft + ( buffindex % BuffUICfg.CountOneRow ) * BuffUICfg.WIDTH + BuffUICfg.diffLeft;
    }

    static computeBufferDiffTop = ( fighterData: FighterData, buffindex: number )=>{
        return fighterData.nodeTop + Math.floor( buffindex / BuffUICfg.CountOneRow ) * BuffUICfg.HEIGHT + BuffUICfg.diffTop;
    }

    static isFrameEnd = ()=>{
        // console.log( "BuffAnimMap.size ", BuffAnimMap.size );
        return BuffAnimMap.size === 0;
    }

    static _logMapSize = ()=>{
        return [ "BuffAnimMap.size ", BuffAnimMap.size ];
    }
}

// buff 表现的动画处理
class AnimCtrl {
    static init = ()=>{
        setPermanent( "FighterBuffFrame", AnimCtrl.update );
    }
    static dispose = ()=>{
        removePermanent( "FighterBuffFrame" );
    }
    static update = ()=>{
        BuffAnimMap.forEach( data => {
            AnimCtrl.computeState( data );
        } );
    }
    static add = ( node: UINode )=>{
        let data: BuffAnimData;

        data    = new BuffAnimData;
        data.node       = node;
        data.startTime  = Date.now();

        BuffAnimMap.set( data, data );
    }
    static computeState = ( data: BuffAnimData )=>{
        let progress: number, scale: number;

        progress    = (Date.now() - data.startTime )/ 400;
        progress    = progress > 1 ? 1 : progress;
        scale       = BuffUICfg.startScale - (BuffUICfg.startScale - BuffUICfg.endScale)*progress;

        UINodeCtrl.updateNodeData( data.node, new UIDataState( { scale: [ scale, scale, scale ] } ) );

        if (progress === 1 ){
            BuffAnimMap.delete(data );
        }
    }
}


// ======================================== 立即执行
const init = ()=>{
    
    nodeBuffJson        = { nodeName: "", nodeType: "IMAGE", imageURL: "", width: BuffUICfg.WIDTH, height: BuffUICfg.HEIGHT, left: -100, top: -100, z_relat: 0 }
    nodeBuffTextJson    = { nodeName: "", nodeType: "TEXT", text: "", width: 64,
                                left: 0, top: 0, font: getFont(BuffUICfg.textSize, 100), 
                                font_space: -2, color: BuffUICfg.textColor, align: "right", 
                                border_width: 1, border_color: "#000000", isCommon: false, z_relat: 0 };
}
init();
