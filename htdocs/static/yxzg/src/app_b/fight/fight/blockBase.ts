
/**
 * version: XXXXXXX
 *      描述：
 *      xxxxxx
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { UINode, getFont } from "app/scene/uiNodeBase";
import { UINodeCtrl, UIDataText, UIDataOpacity }   from "app/scene/uiNode";
import { FighterData, BlockUICfg } from "./fightSceneUIBase";
import { setPermanent, removePermanent } from "../../frameCtrl/frameCtrl";
import { UIDataState } from "../../../app/scene/uiNodeCreator";


// import { XXX }           from "XX/XX";
// import { XXX as SSS }    from "XX/XX";
// import * as SSS          from "XX/XX";


// ========================================常量定义


// ========================================导出接口


// ========================================数据结构
class BlockAnimData {
    nodeImg: UINode;
    nodeTxt: UINode;
    startTime: number;
    lastImgTop: number;
    lastTxtTop: number;
    animType: number;
    constructor(){};
    dispose = ()=>{

        delete this.animType;
        delete this.nodeImg;
        delete this.nodeTxt;
        delete this.startTime;
    }
}

// ========================================变量声明
let frame: UINode, 
    BlockAnimMap: Map<BlockAnimData, BlockAnimData> = new Map, 
    nodeBlockJson: any, 
    nodeBlockTxtJson: any;


// ========================================类定义
export class BlockFunc {
    static initFrame = ( parent: UINode )=>{
        frame   = parent;
        AnimCtrl.init();
    }
    static dispose = ()=>{
        frame   = undefined;
        AnimCtrl.dispose();
    }
    static create = ( fighterData: FighterData )=>{
        let animData: BlockAnimData;

        BlockFunc.createImage( fighterData );
        BlockFunc.createText( fighterData );
        
        animData= new BlockAnimData;
        animData.animType   = 0;
        animData.nodeImg    = fighterData.nodeBlock;
        animData.nodeTxt    = fighterData.nodeBlockNum;
        animData.startTime  = Date.now();
        animData.lastImgTop    = fighterData.nodeBlock.y;
        animData.lastTxtTop    = fighterData.nodeBlockNum.y;

        AnimCtrl.add( animData );
    }
    static update = ( fighterData: FighterData )=>{
        let dataState: UIDataText;

        dataState       = new UIDataText;
        dataState.text  = `${fighterData.fighter.block}`;
        UINodeCtrl.updateNodeData( fighterData.nodeBlockNum, dataState );
    }
    static disposeFighter = ( fighterData: FighterData )=>{
        if ( fighterData.nodeBlock !== undefined ){
            UINodeCtrl.removeNode( fighterData.nodeBlock );
            UINodeCtrl.removeNode( fighterData.nodeBlockNum );
        }
        delete fighterData.nodeBlock;
        delete fighterData.nodeBlockNum;
    }
    /**
     * 格挡图片
     */
    private static createImage = ( fighterData: FighterData )=>{
        let left: number, top: number, z: number, jsonNew: any, nodeName: string;

        left    = fighterData.nodeLeft + BlockUICfg.DiffLeft;
        top     = fighterData.nodeTop  + BlockUICfg.startDiffTop;
        z       = frame.z + BlockUICfg.DiffZ;
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
    /**
     * 格挡数值
     */
    private static createText = ( fighterData: FighterData )=>{
        let left: number, top: number, z: number, jsonNew: any, nodeName: string;

        left    = fighterData.nodeLeft + BlockUICfg.DiffLeft +BlockUICfg.WIDTH/2;
        top     = fighterData.nodeTop  + BlockUICfg.startDiffTop - (BlockUICfg.TextSize-BlockUICfg.HEIGHT)/2 -3;
        z       = frame.z + BlockUICfg.DiffZ +1;
        nodeName= `${fighterData.fighter.id}_blockTxt`;
        jsonNew = {
                    left:       left,
                    top:        top,
                    z_relat:    z,
                    text:       `${fighterData.fighter.block}`,
                    opacity:    1
                };
        fighterData.nodeBlockNum= UINodeCtrl.appendNode( {
                    parent:     frame,
                    nodeName,
                    jsonNew,
                    jsonOrg:    nodeBlockTxtJson,
                    data:       undefined
                } );

    }
    /**
     * 格挡帧 动画 是否结束
     */
    static isFrameEnd = ()=>{
        // console.log( "BlockAnimMap.size ", BlockAnimMap.size );
        return BlockAnimMap.size === 0;
    }
    
    static _logMapSize = ()=>{
        return [ "BlockAnimMap.size ", BlockAnimMap.size ];
    }
}

class AnimCtrl {
    static init = ()=>{
        setPermanent( "FighterBlockAnim", AnimCtrl.update );
    }
    static dispose = ()=>{
        removePermanent( "FighterBlockAnim" );
    }
    static update = ()=>{
        BlockAnimMap.forEach( data => {
            switch ( data.animType ){
                case (0):
                {
                    AnimCtrl.computeCreate( data );
                    break;
                }
                case (1):
                {
                    AnimCtrl.computeMore( data );
                    break;
                }
                case (2):
                {
                    AnimCtrl.computeLess( data );
                    break;
                }
                case (3):
                {
                    AnimCtrl.computeRemove( data );
                    break;
                }
            }
        } )
    }
    static add = ( data: BlockAnimData )=>{
        BlockAnimMap.set( data, data );
    }
    /**
     * 格挡 创建时 的动画帧计算
     */
    static computeCreate = ( data: BlockAnimData )=>{
        let progress: number, state1: UIDataState, state2: UIDataState, opacity: UIDataOpacity, scale: number;

        progress    = (Date.now() - data.startTime) / BlockUICfg.time;
        progress    = progress > 1 ? 1 : progress;
        scale       = BlockUICfg.startTextScale -(BlockUICfg.startTextScale - 1) * progress

        opacity     = new UIDataOpacity( progress );

        state1      = new UIDataState;
        state1.state.top    = data.lastImgTop + progress * (BlockUICfg.DiffTop -BlockUICfg.startDiffTop);
        UINodeCtrl.updateNodeData( data.nodeImg, state1 );
        UINodeCtrl.updateNodeData( data.nodeImg, opacity );

        state2      = new UIDataState;
        state2.state.top    = data.lastTxtTop + progress * (BlockUICfg.DiffTop -BlockUICfg.startDiffTop);
        state2.state.scale  = [ scale, scale, 1 ];
        UINodeCtrl.updateNodeData( data.nodeTxt, state2 );

        if ( progress === 1 ){
            BlockAnimMap.delete( data );
            data.dispose();
        }
    }
    static computeMore = ( data: BlockAnimData )=>{
        
    }
    static computeLess = ( data: BlockAnimData )=>{
        
    }
    static computeRemove = ( data: BlockAnimData )=>{
        
    }
}

// ========================================立即运行
const init = ()=>{
    
    nodeBlockJson       = { nodeName: "", nodeType: "IMAGE", imageURL: BlockUICfg.BGURL, width: BlockUICfg.WIDTH, height: BlockUICfg.HEIGHT, left: -100, top: -100, z_relat: 0 };
    nodeBlockTxtJson    = { nodeName: "", nodeType: "TEXT", text: "", width: BlockUICfg.TextWidth,
                    left: BlockUICfg.TextWidth/2+BlockUICfg.WIDTH/2, top: 0, font: getFont(BlockUICfg.TextSize), 
                    font_space: -2,color: BlockUICfg.TextColor, align: "center", isCommon: false, z_relat: 0 };

    
    AnimCtrl.init();
}

init();