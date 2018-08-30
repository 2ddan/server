import { UINode } from "../../app/scene/uiNodeBase";
import { UINodeCtrl, UIDataText }   from "../../app/scene/uiNode";
import { FighterData }  from "./fightSceneUIBase";

let frame: UINode;


const BlockCfg = {
    WIDTH: 40,
    HEIGHT: 40,
    DiffTop: 130,
    DiffLeft: -40,
    DiffZ:  4,
    BGURL: "symbol/block.png",
    TextSize: 64
}

const nodeBlockJson   = { nodeName: "", nodeType: "IMAGE", imageURL: BlockCfg.BGURL, width: BlockCfg.WIDTH, height: BlockCfg.HEIGHT, left: -100, top: -100, z_relat: 0 };
const nodeBlockTxtJson    = { nodeName: "", nodeType: "TEXT", text: "", 
                    left: 0, top: 0, font: `normal normal ${BlockCfg.TextSize}px mnjsh`, 
                    font_space: -2,color: "#00FF00", align: "center", shadow_width: 1, 
                    shadow_color: "#000000", isCommon: false, z_relat: 0 };


export class BlockFunc {
    static initFrame = ( parent: UINode )=>{
        frame   = parent;
    }
    static create = ( fighterData: FighterData )=>{
        BlockFunc.createImage( fighterData );
        BlockFunc.createText( fighterData );
    }
    static update = ( fighterData: FighterData )=>{
        let dataState: UIDataText;

        dataState       = new UIDataText;
        dataState.text  = `${fighterData.fighter.block}`;
        UINodeCtrl.updateNodeData( fighterData.nodeBlockNum, dataState );
    }
    static dispose = ( fighterData: FighterData )=>{
        if ( fighterData.nodeBlock !== undefined ){
            UINodeCtrl.removeNode( fighterData.nodeBlock );
            UINodeCtrl.removeNode( fighterData.nodeBlockNum );
        }
    }
    private static createImage = ( fighterData: FighterData )=>{
        let left: number, top: number, z: number, jsonNew: any, nodeName: string;

        left    = fighterData.nodeLeft + BlockCfg.DiffLeft;
        top     = fighterData.nodeTop  + BlockCfg.DiffTop;
        z       = frame.z + BlockCfg.DiffZ;
        nodeName= `${fighterData.fighter.id}_block`;
        jsonNew = {
                    left:       left,
                    top:        top,
                    z_relat:    z
                };
        fighterData.nodeBlock   = UINodeCtrl.appendNode( {
                    parent:     frame,
                    nodeName,
                    jsonNew,
                    jsonOrg:    nodeBlockJson,
                    data:       undefined
                } );
    }
    private static createText = ( fighterData: FighterData )=>{
        let left: number, top: number, z: number, jsonNew: any, nodeName: string;

        left    = fighterData.nodeLeft + BlockCfg.DiffLeft +10;
        top     = fighterData.nodeTop  + BlockCfg.DiffTop  +10;
        z       = frame.z + BlockCfg.DiffZ +1;
        nodeName= `${fighterData.fighter.id}_blockTxt`;
        jsonNew = {
                    left:       left,
                    top:        top,
                    z_relat:    z,
                    text:       `${fighterData.fighter.block}`
                };
        fighterData.nodeBlockNum= UINodeCtrl.appendNode( {
                    parent:     frame,
                    nodeName,
                    jsonNew,
                    jsonOrg:    nodeBlockTxtJson,
                    data:       undefined
                } );
    }

    static isFrameEnd = ()=>{
        return true;
    }
}