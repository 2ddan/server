
import { UINode, getFont } from "app/scene/uiNodeBase";
import { UINodeCtrl, UIDataText, UIDataState }   from "app/scene/uiNode";
import { FighterData, HPUICfg }  from "./fightSceneUIBase";
import { setPermanent, removePermanent } from "../../frameCtrl/frameCtrl";
import { UIDataImage } from "../../../app/scene/uiNodeCreator";
import { UINodeAnimData_Math } from "../../frameCtrl/imageAnimBase";

// ======================================== 常量定义

const HPAnimTime: number = 400;

// ======================================== 数据结构
// 血条的 动画数据结构
class HPAnimData {
    id: number;
    startTime: number;
    fighterData: FighterData;
    diffHP: number;
};

// ======================================== 变量声明

let frame: UINode,
    nodeHPJsonBG,
    nodeHPJsonImage2,
    nodeHPJsonImage,
    nodeHPJson,
    HPAnimMap: Map<number, HPAnimData> = new Map;

// ======================================== 类定义
/**
 * 血条操作方法类
 * 创建血条，更新血条，移除血条
 */
export class HPFunc {
    static initFrame = ( parent: UINode )=>{
        frame   = parent;
        AnimCtrl.init();
    }
    static dispose = ()=>{
        frame   = undefined;
        AnimCtrl.dispose();
    }
    static disposeFighter = ( fighterData: FighterData )=>{

        fighterData.nodeHPList.forEach( node => {
            UINodeCtrl.removeNode( node );
        } );

        fighterData.nodeHPList.length = 0;
    }
    /**
     * 血条表现： 背景，中间动画表现，上层数值表现，数值文字表现
     */
    static createHP = ( fighterData: FighterData )=>{
        HPFunc.createHPBG( fighterData );
        HPFunc.createHPImage( fighterData );
        HPFunc.createHPText( fighterData );

        fighterData.nodeHPList.forEach( node => {
            let animData: UINodeAnimData_Math;
    
            animData    = new UINodeAnimData_Math( node, undefined );
            animData.opacityArr     = [ 0.2, 1 ];
            animData.time           = 600;
            animData.run();
        } );

        HPFunc.updateHPImage( fighterData, fighterData.fighter.max_hp - fighterData.fighter.hp );
    }
    // 更新格挡状态血条表现
    static changeHPWithBlock = ( fighterData: FighterData, isGetBlock: boolean )=>{
        if ( isGetBlock === true ){
            UINodeCtrl.updateNodeData( fighterData.nodeHPList[2], new UIDataImage( HPUICfg.HPURL3 ) ) ;
            UINodeCtrl.updateNodeData( fighterData.nodeHPList[1], new UIDataImage( HPUICfg.HPURL3 ) ) ;
        }else{
            if ( fighterData.isEnemy === true ){
                UINodeCtrl.updateNodeData( fighterData.nodeHPList[2], new UIDataImage( HPUICfg.HPURL2 ) ) ;
                UINodeCtrl.updateNodeData( fighterData.nodeHPList[1], new UIDataImage( HPUICfg.HPURL2 ) ) ;
            }else{
                UINodeCtrl.updateNodeData( fighterData.nodeHPList[2], new UIDataImage( HPUICfg.HPURL ) ) ;
                UINodeCtrl.updateNodeData( fighterData.nodeHPList[1], new UIDataImage( HPUICfg.HPURL ) ) ;
            }
        }
    }
    private static createHPBG = ( fighterData: FighterData )=>{

        let tempLeft: number, tempTop: number, tempZ: number;
        let tempName: string, tempNode: UINode;
        let jsonNew: any;
        
        tempLeft    = fighterData.nodeLeft +HPUICfg.DiffLeft;
        tempTop     = fighterData.nodeTop  +HPUICfg.DiffTop;
        tempName    = `${fighterData.fighter.id}_HP_BG`;
        tempZ       = frame.z + 2;
        jsonNew     = {
                        left:   tempLeft,
                        top:    tempTop,
                        z_relat:tempZ,
                        opacity:    0.2
                    }

        tempNode    = UINodeCtrl.appendNode( {
                        parent:     frame,
                        jsonOrg:    nodeHPJsonBG,
                        jsonNew:    jsonNew,
                        nodeName:   tempName,
                        data:       undefined
                    } );

        fighterData.nodeHPList[ HPUICfg.ID_HP_BG ]   = tempNode;
    }
    private static createHPImage = ( fighterData: FighterData )=>{

        let tempLeft: number, tempTop: number, tempZ: number;
        let tempName: string, tempNode: UINode, tempNode2: UINode;
        let jsonNew: any, imgURL: string;
        
        tempLeft    = fighterData.nodeLeft +HPUICfg.DiffLeft +1;
        tempTop     = fighterData.nodeTop +HPUICfg.DiffTop +1;

        // 下方 动画 血条
        tempName    = `${fighterData.fighter.id}_HP_1`;
        tempZ       = frame.z + 3;
        jsonNew     = {
                        left:       tempLeft,
                        top:        tempTop,
                        z_relat:    tempZ,
                        opacity:    0.2
                    }

        tempNode2   = UINodeCtrl.appendNode( {
                        parent:     frame,
                        jsonOrg:    nodeHPJsonImage,
                        jsonNew:    jsonNew,
                        nodeName:   tempName,
                        data:       undefined
                    } );

        fighterData.nodeHPList[ HPUICfg.ID_HP_IMG ]   = tempNode2;

        // 前方血条
        imgURL      = fighterData.isEnemy ? HPUICfg.HPURL2 : HPUICfg.HPURL;
        tempName    = `${fighterData.fighter.id}_HP_2`;
        tempZ       = frame.z + 4;
        jsonNew     = {
                        left:       tempLeft,
                        top:        tempTop,
                        z_relat:    tempZ,
                        imageURL:   imgURL,
                        opacity:    0.2
                    }

        tempNode    = UINodeCtrl.appendNode( {
                        parent:     frame,
                        jsonOrg:    nodeHPJsonImage2,
                        jsonNew:    jsonNew,
                        nodeName:   tempName,
                        data:       undefined
                    } );

        fighterData.nodeHPList[ HPUICfg.ID_HP_IMG2 ]   = tempNode;

    }
    private static createHPText = ( fighterData: FighterData )=>{
        let node: UINode, jsonNew: any, left: number, top: number, txt: string, z: number;
        let nodeName: string, diffLeft: number, isEnemy: boolean;

        txt     = `${fighterData.fighter.hp}/${fighterData.fighter.max_hp}`;
        nodeName= txt;
        left    = fighterData.nodeLeft +HPUICfg.DiffLeft + HPUICfg.WIDTH/2;
        top     = fighterData.nodeTop  +HPUICfg.DiffTop  - ( HPUICfg.TextSize - HPUICfg.HEIGHT);
        z       = frame.z +5 ;
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
            
        fighterData.nodeHPList[ HPUICfg.ID_HP_TXT ]   = node;
    }
    static updateHP = ( fighterData: FighterData, damage: number )=>{
        HPFunc.updateHPImage( fighterData, damage );
        HPFunc.updateHPText( fighterData );
    }
    // 根据伤害表现血条变化
    static updateHPImage = ( fighterData: FighterData, damage: number )=>{
        let scale: number, left: number, tempState: UIDataState, hpAnimData: HPAnimData;

        scale   = fighterData.fighter.hp / fighterData.fighter.max_hp;
        left    = fighterData.nodeLeft +HPUICfg.DiffLeft - (1-scale)/2 * HPUICfg.WIDTH +1;

        scale   = scale <= 0 ? 0.001 : scale;

        tempState   = new UIDataState;
        tempState.state.left    = left;
        tempState.state.scale   = [ scale, 1, 1 ];

        UINodeCtrl.updateNodeData(fighterData.nodeHPList[ HPUICfg.ID_HP_IMG2 ], tempState  );

        hpAnimData  = HPAnimMap.get(fighterData.fighter.id);
        if (  hpAnimData !== undefined ){
            hpAnimData.diffHP       += damage;
            hpAnimData.startTime    = Date.now();
        }else{
            hpAnimData  = new HPAnimData;
            hpAnimData.id           = fighterData.fighter.id;
            hpAnimData.startTime    = Date.now();
            hpAnimData.fighterData  = fighterData;
            hpAnimData.diffHP       = damage;

            AnimCtrl.addHPAnim( hpAnimData );
        }
    }
    static updateHPText = ( fighterData: FighterData )=>{
        UINodeCtrl.updateNodeData(fighterData.nodeHPList[ HPUICfg.ID_HP_TXT ], new UIDataText( `${fighterData.fighter.hp}/${fighterData.fighter.max_hp}` )  );
    }


    static isFrameEnd = ()=>{
        // console.log( "HPAnimMap.size ", HPAnimMap.size );
        return HPAnimMap.size === 0;
    }
    
    static _logMapSize = ()=>{
        return [ "HPAnimMap.size ", HPAnimMap.size ];
    }
}
/**
 * 血条动画控制
 */
class AnimCtrl {
    static init = ()=>{
        setPermanent( "FighterHPAnim", AnimCtrl.update );
    }
    static dispose = ()=>{
        removePermanent( "FighterHPAnim" );
    }
    static addHPAnim = ( hpAnimData: HPAnimData )=>{
        HPAnimMap.set( hpAnimData.id, hpAnimData );
    }
    private static update = ()=>{

        HPAnimMap.forEach( hpAnimData =>{
            AnimCtrl.updateHPImage2( hpAnimData );
        } );

    }
    private static updateHPImage2 = ( hpAnimData: HPAnimData )=>{
        let scale: number, left: number, tempState: UIDataState, progress: number;

        progress= (Date.now() - hpAnimData.startTime) / HPAnimTime;
        progress= progress > 1 ? 1 : progress ;

        scale   = (hpAnimData.fighterData.fighter.hp + ( hpAnimData.diffHP * (1 -progress) )) / hpAnimData.fighterData.fighter.max_hp;
        left    = hpAnimData.fighterData.nodeLeft  +HPUICfg.DiffLeft - (1-scale)/2 * HPUICfg.WIDTH;

        scale   = scale <= 0 ? 0.001 : scale;

        tempState   = new UIDataState;
        tempState.state.left    = left;
        tempState.state.scale   = [ scale, 1, 1 ];

        UINodeCtrl.updateNodeData( hpAnimData.fighterData.nodeHPList[ HPUICfg.ID_HP_IMG ], tempState  );

        if ( progress === 1 ){
            HPAnimMap.delete( hpAnimData.id );
            hpAnimData.fighterData  = undefined;

            delete hpAnimData.diffHP;
            delete hpAnimData.fighterData;
            delete hpAnimData.startTime;
        }
    }
}


// =======================================
const init = ()=>{
    

    nodeHPJsonBG      = { nodeName: "", nodeType: "IMAGE", imageURL: HPUICfg.BGURL, width: HPUICfg.WIDTH, height: HPUICfg.HEIGHT, left: -100, top: -100, z_relat: 0 }
    nodeHPJsonImage2  = { nodeName: "", nodeType: "IMAGE", imageURL: "", width: HPUICfg.WIDTH-2, height: HPUICfg.HEIGHT-2, left: -100, top: -100, z_relat: 0 }
    nodeHPJsonImage   = { nodeName: "", nodeType: "IMAGE", imageURL: `${HPUICfg.HPURL2}`, width: HPUICfg.WIDTH-2, height: HPUICfg.HEIGHT-2, left: -100, top: -100, z_relat: 0, opacity: 0.5 }
    nodeHPJson        = { nodeName: "", nodeType: "TEXT", text: "", width: HPUICfg.TextWidth,
                            left: HPUICfg.WIDTH/2, top: 0, font:  getFont(HPUICfg.TextSize, 300), 
                            font_space: -2, color: HPUICfg.textColor, align: "center", 
                            border_width: HPUICfg.textBorderWidth, border_color: HPUICfg.textBorderColor, 
                            isCommon: false, z_relat: 0 };
    
    AnimCtrl.init();
}

init();