
import { UINode } from "../../app/scene/uiNodeBase";
import { UINodeCtrl, UIDataText, UIDataState }   from "../../app/scene/uiNode";
import { FighterData, FighterSizeCfg }  from "./fightSceneUIBase";


const HPCfg = {
    WIDTH: 100,
    HEIGHT: 12,
    DiffTop: 140,
    DiffLeft: 0,
    BGURL: "symbol/hp_bg.jpg",
    HPURL: "symbol/hp_role.jpg",
    HPURL2: "symbol/hp_enemy.png"
}

let frame: UINode;


const nodeHPJsonBG    = { nodeName: "", nodeType: "IMAGE", imageURL: HPCfg.BGURL, width: HPCfg.WIDTH, height: HPCfg.HEIGHT, left: -100, top: -100, z_relat: 0 }
const nodeHPJsonImage = { nodeName: "", nodeType: "IMAGE", imageURL: "", width: HPCfg.WIDTH, height: HPCfg.HEIGHT, left: -100, top: -100, z_relat: 0 }
const nodeHPJson  = { nodeName: "", nodeType: "TEXT", text: "", 
                left: 0, top: 0, font: `normal normal ${80}px mnjsh`, 
                font_space: -2,color: "#00ff00", align: "center", 
                shadow_width: 1, shadow_color: "#000000", isCommon: false, z_relat: 0 };


export class HPFunc {
    static initFrame = ( parent: UINode )=>{
        frame   = parent;
    }
    static createHP = ( fighterData: FighterData )=>{
        HPFunc.createHPBG( fighterData );
        HPFunc.createHPImage( fighterData );
        HPFunc.createHPText( fighterData );
    }
    static dispose = ( fighterData: FighterData )=>{
        UINodeCtrl.removeNode( fighterData.nodeHP );
        UINodeCtrl.removeNode( fighterData.nodeHPImage );
        UINodeCtrl.removeNode( fighterData.nodeHPBG );
    }
    private static createHPBG = ( fighterData: FighterData )=>{
        let tempLeft: number, tempTop: number, tempZ: number;
        let tempName: string, tempNode: UINode;
        let jsonNew: any;
        
        tempLeft    = fighterData.nodeLeft +HPCfg.DiffLeft;
        tempTop     = fighterData.nodeTop  +HPCfg.DiffTop;
        tempName    = `${fighterData.fighter.id}_HP_BG`;
        tempZ       = frame.z + 2;
        jsonNew     = {
                        left:   tempLeft,
                        top:    tempTop,
                        z_relat:tempZ
                    }

        tempNode    = UINodeCtrl.appendNode( {
                        parent:     frame,
                        jsonOrg:    nodeHPJsonBG,
                        jsonNew:    jsonNew,
                        nodeName:   tempName,
                        data:       undefined
                    } );

        fighterData.nodeHPBG    = tempNode;
    }
    private static createHPImage = ( fighterData: FighterData )=>{
        let tempLeft: number, tempTop: number, tempZ: number;
        let tempName: string, tempNode: UINode;
        let jsonNew: any, imgURL: string;
        
        tempLeft    = fighterData.nodeLeft;
        tempTop     = fighterData.nodeTop +HPCfg.DiffTop;
        tempName    = `${fighterData.fighter.id}_HP_BG`;
        imgURL      = fighterData.isEnemy ? HPCfg.HPURL2 : HPCfg.HPURL;
        tempZ       = frame.z + 3;
        jsonNew     = {
                        left:       tempLeft,
                        top:        tempTop,
                        z_relat:    tempZ,
                        imageURL:   imgURL
                    }

        tempNode    = UINodeCtrl.appendNode( {
                        parent:     frame,
                        jsonOrg:    nodeHPJsonImage,
                        jsonNew:    jsonNew,
                        nodeName:   tempName,
                        data:       undefined
                    } );

        fighterData.nodeHPImage    = tempNode;
    }
    private static createHPText = ( fighterData: FighterData )=>{
        let node: UINode, jsonNew: any, left: number, top: number, txt: string, z: number;
        let nodeName: string, diffLeft: number, isEnemy: boolean;

        isEnemy = fighterData.isEnemy;
        txt     = `${fighterData.fighter.hp}/${fighterData.fighter.max_hp}`;
        nodeName= txt;
        left    = isEnemy ? 550 : 300;
        diffLeft= fighterData.arrIndex * FighterSizeCfg.WIDTH * 1.1 ;
        left    = isEnemy ? left +diffLeft : left -diffLeft;
        top     = fighterData.nodeTop +HPCfg.DiffTop;
        z       = frame.z +3 ;
        jsonNew     = {
                            left: left,
                            top: top,
                            z_relat: z,
                            text: txt
                        } ; 

        node    = UINodeCtrl.appendNode({
                    parent: frame,
                    nodeName,
                    jsonOrg: nodeHPJson,
                    jsonNew: jsonNew,
                    data: undefined
                });
            
        fighterData.nodeHP   = node;
    }
    static updateHPImage = ( fighterData: FighterData )=>{
        let scale: number, left: number, tempState: UIDataState;

        scale   = fighterData.fighter.hp / fighterData.fighter.max_hp;
        left    = fighterData.nodeLeft - (1-scale)/2 * HPCfg.WIDTH;

        tempState   = new UIDataState;
        tempState.state.left    = left;
        tempState.state.scale   = [ scale, 1, 1 ];

        UINodeCtrl.updateNodeData(fighterData.nodeHPImage, tempState  );

    }
    static updateHPText = ( fighterData: FighterData )=>{
        UINodeCtrl.updateNodeData(fighterData.nodeHP, new UIDataText( `${fighterData.fighter.hp}/${fighterData.fighter.max_hp}` )  );
    }

    static isFrameEnd = ()=>{
        return true;
    }
}