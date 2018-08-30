import { UINode } from "../../app/scene/uiNodeBase";
import { UINodeCtrl, UIDataState }   from "../../app/scene/uiNode";
import { FighterData, BuffCfg }  from "./fightSceneUIBase";

export const BufferCfg = {
    "100035": "attack", // 攻击
    "100029": "quick", // 加速
    "100036": "disrupt", // 混乱
    "100023": "thorns", // 荆棘
    "100032": "guardBreak", // 破防
    "100031": "strong"  // 强壮
}

export class BuffData {
    icon: string;
    desc: string;
    num: number;
}

export const readBuffURL = ( buffID: number )=>{
    return `symbol/${BufferCfg[buffID]}.png`;
}

const nodeBuffJson    = { nodeName: "", nodeType: "IMAGE", imageURL: "", width: 40, height: 40, left: -100, top: -100, z_relat: 0 }
const nodeBuffTextJson    = { nodeName: "", nodeType: "TEXT", text: "", 
                    left: 0, top: 0, font: `normal normal ${BuffCfg.textSize}px mnjsh`, 
                    font_space: -2,color: "#000000", align: "center", shadow_width: 1, 
                    shadow_color: "#000000", isCommon: false, z_relat: 0 };
let frame: UINode;

export class BuffNode {
    node: UINode;
    nodeText: UINode;
    num: number = 0;
    buffIcon: string;
    buffIndex: number;
}



export class BuffFunc {
    static initFrame = ( parent: UINode )=>{
        frame   = parent;
    }
    static createNodeBuff = ( buff: BuffNode, fighterData: FighterData )=>{
        let node: UINode, nodeText: UINode, tempZ: number, imgURL: string, jsonNew: any;
        let tempLeft: number, tempTop: number, nodeName: string;


        imgURL  = buff.buffIcon ;
        tempZ   = frame.z + 10;
        tempLeft= fighterData.nodeLeft + BuffFunc.computeBufferDiffLeft( buff.buffIndex );
        tempTop = fighterData.nodeTop  + 100 + BuffFunc.computeBufferDiffTop( buff.buffIndex );
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

        tempZ   = tempZ + 1;
        tempLeft= tempLeft + BuffCfg.WIDTH  -20;
        tempTop = tempTop  + BuffCfg.HEIGHT -20;
        jsonNew = {
                    z_relat:    tempZ,
                    left:       tempLeft,
                    top:        tempTop,
                    text:       `${buff.num}`
                };
        nodeText= UINodeCtrl.appendNode( {
                    parent:     frame,
                    jsonOrg:    nodeBuffTextJson,
                    jsonNew:    jsonNew,
                    nodeName:   nodeName + "_txt",
                    data:       undefined
                } );

        buff.node       = node;
        buff.nodeText   = nodeText;

        return buff;
    }

    static dispose = ( fighterData: FighterData )=>{
        fighterData.nodeBufferMap.forEach( (buff) => {
            BuffFunc.removeBuff( buff );
        } );

        fighterData.bufferList.length   = 0;
        fighterData.nodeBufferMap.clear();
    }

    static removeBuff = ( buff: BuffNode )=>{

        UINodeCtrl.removeNode( buff.node );
        UINodeCtrl.removeNode( buff.nodeText );

        delete buff.node;
        delete buff.buffIndex;
        delete buff.buffIcon;
        delete buff.nodeText;
        delete buff.num;
    }

    static getBufferName = ( buffIcon: string, fighterID: number )=>{
        return `${fighterID}_${buffIcon}`;
    }

    static updateBufferState = ( fighterData: FighterData, buffIcon: string, buffIndex: number )=>{
        let left: number, top: number;
        let dataStateText: UIDataState, dataState: UIDataState;
        let buff: BuffNode;

        left    = fighterData.nodeLeft + BuffFunc.computeBufferDiffLeft( buffIndex );;
        top     = fighterData.nodeTop  + 100 + BuffFunc.computeBufferDiffTop( buffIndex );
        buff    = fighterData.nodeBufferMap.get( buffIcon );

        dataState   = new UIDataState;
        dataState.state.left    = left;
        dataState.state.top     = top;

        UINodeCtrl.updateNodeData( buff.node, dataState );

        dataStateText   = new UIDataState;
        dataStateText.state.left    = left + BuffCfg.WIDTH  -10;
        dataStateText.state.top     = top  + BuffCfg.HEIGHT -10;

        UINodeCtrl.updateNodeData( buff.nodeText, dataStateText );
    }

    static computeBufferDiffLeft = ( index: number )=>{
        return ( index % BuffCfg.CountOneRow ) * BuffCfg.WIDTH;
    }

    static computeBufferDiffTop = ( index: number )=>{
        return Math.ceil( index / BuffCfg.CountOneRow ) * BuffCfg.HEIGHT;
    }

    static isFrameEnd = ()=>{
        return true;
    }
}