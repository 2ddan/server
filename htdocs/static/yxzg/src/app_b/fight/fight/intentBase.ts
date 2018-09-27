

/**
 * version: XXXXXXX
 *      描述：
 *      意图表现
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { FighterData } from "./fightSceneUIBase";
import { UINode, getFont } from "../../../app/scene/uiNodeBase";
import { UINodeCtrl } from "../../../app/scene/uiNode";
import { UIDataState, UIDataImage, UIDataText } from "../../../app/scene/uiNodeCreator";
import { FightSceneCtrl } from "../fightSceneCtrl";
import { FSmgr } from "../../../fight/scene";
import { Fighter } from "../../../fight/class";
import { EnemyRoundRecord } from "../show";

import { getSelf } from "../fight";
import { IntentUICfg, IntentIconList, IntentTypes, IntentData }  from "./fightSceneUIBase"
import { UINodeAnimData_Math } from "../../frameCtrl/imageAnimBase";



// ========================================常量定义



// ========================================导出接口


// ========================================数据结构
class IntentData2 {
    icon: string;
    isShowTxt: boolean = false;
    count: number;
    count2: number;
}

// ========================================变量声明
let intentImageJson: any, 
    intentTextJson: any,
    frame: UINode;



// ========================================类定义
export class IntentFunc {

    static initFrame = ( parent: UINode )=>{
        frame   = parent;
        // AnimCtrl.init();
    }
    static dispose = ()=>{
        frame   = undefined;
        // AnimCtrl.dispose();
    }
    // 更新意图
    static update = ( fighterData: FighterData )=>{
        let intent: any, intentData: IntentData2, txt: string;
        let self: Fighter;

        self    = getSelf();

        if ( self.id === fighterData.fighter.id ){
            return;
        }

        fighterData.intentList.length   = 0;

        // 获取意图
        intent  = FSmgr.intent( fighterData.fighter.id, self.id );

        console.table( [ ["update intent EnemyRoundRecord"], EnemyRoundRecord] );

        // 在自己回合 不处理更新
        if ( intent === undefined || EnemyRoundRecord.indexOf( fighterData.fighter.id ) >= 0 )
        {
            return;
        }

        // 解析意图数据
        intentData = IntentFunc.formatIntent( fighterData, intent );

        // 无可显示意图
        if ( intentData.icon === undefined ){

            if ( fighterData.nodeIntentImg !== undefined ){
                IntentFunc.visible( fighterData.nodeIntentImg, false );
            }
            
            if ( fighterData.nodeIntentTxt !== undefined ){
                IntentFunc.visible( fighterData.nodeIntentTxt, false );
            }

        }else{
            txt = `${intentData.count}${intentData.count2<=1 ? "" : " X "+intentData.count2}`;

            if ( fighterData.nodeIntentImg === undefined ){
                IntentFunc.createImg( fighterData, intentData.icon );
            }else{
                IntentFunc.visible( fighterData.nodeIntentImg, true );
                UINodeCtrl.updateNodeData( fighterData.nodeIntentImg, new UIDataImage( intentData.icon ) );
            }
            
            if ( fighterData.nodeIntentTxt === undefined ){
                if ( intentData.isShowTxt === true ){
                    IntentFunc.createTxt( fighterData, txt );
                }
            }else{

                if ( intentData.isShowTxt !== true ){
                    UINodeCtrl.removeNode( fighterData.nodeIntentTxt );
                    delete fighterData.nodeIntentTxt;
                }else{
                
                    IntentFunc.visible( fighterData.nodeIntentTxt, true );
                    UINodeCtrl.updateNodeData( fighterData.nodeIntentTxt, new UIDataText( txt ) );
                }
            }

        }
    }
    // 清除意图
    static disposeFighter = ( fighterData: FighterData )=>{
        if ( fighterData.nodeIntentImg !== undefined ){
            UINodeCtrl.removeNode( fighterData.nodeIntentImg );
    
            delete fighterData.nodeIntentImg;
        }
        if ( fighterData.nodeIntentTxt !== undefined ){
            UINodeCtrl.removeNode( fighterData.nodeIntentTxt );

            delete fighterData.nodeIntentTxt;
        }
    }
    static formatIntent = ( fighterData: FighterData, data: any )=>{
        let intentData: IntentData2, typeCounter: number, typeIndex: number, typeUIIndex: number;

        intentData  = new IntentData2;
        typeCounter = 0;

        for ( let key in data ){
            typeIndex   = IntentTypes.indexOf( (key as any) -0 );

            // 有该意图
            if ( data[key][ 0 ] !== 0 ){

                let tempData: IntentData;
                
                tempData    = new IntentData;
                tempData.desc   = "";
                tempData.type   = `${key}`;
                fighterData.intentList.push( tempData );

                // 组合意图的ICON序号
                typeUIIndex = Math.pow( 2, typeIndex );
                typeCounter += typeUIIndex;
                
                // 该意图 为攻击或格挡
                if ( typeIndex >= 3 ){
                    intentData.count  = data[key][ 2 ];
                    intentData.count2 = data[key][ 3 ];
                }
                
                if ( data[key][ 1 ] !== 0 ){
                    intentData.isShowTxt   = true;
                }
            }
        }

        intentData.icon = IntentIconList[ typeCounter ];

        return intentData;
    }
    
    private static createImg = ( fighterData: FighterData, imgURL: string )=>{
        let left: number, top: number, jsonNew: any;
        let node: UINode;

        left    = IntentFunc.computeIntentLeft( fighterData );
        top     = IntentFunc.computeIntentTop( fighterData );
        jsonNew = {
                    left: left,
                    top:  top,
                    imageURL: imgURL,
                    opacity:    0.2
                }

        node    = UINodeCtrl.appendNode( {
                    parent: frame,
                    nodeName: `${fighterData.fighter.id}_INTENT_IMG`,
                    jsonOrg: intentImageJson,
                    jsonNew,
                    data: undefined
                } );

        fighterData.nodeIntentImg   = node;

        let animData: UINodeAnimData_Math;
        animData    = new UINodeAnimData_Math( node, undefined );
        animData.opacityArr     = [ 0.2, 1 ];
        animData.time           = 600;
        animData.run();
    }

    private static computeIntentLeft = (fighterData: FighterData)=>{
        return fighterData.nodeLeft + IntentUICfg.diffLeft;
    }
    private static computeIntentTop = (fighterData: FighterData)=>{
        return fighterData.nodeTop + IntentUICfg.diffTop;
    }
    
    private static createTxt = ( fighterData: FighterData, txt: string )=>{
        let left: number, top: number, jsonNew: any;
        let node: UINode;

        left    = fighterData.nodeIntentImg.rel_left + IntentUICfg.txtWidth/2 - IntentUICfg.WIDTH/2 ;
        top     = fighterData.nodeIntentImg.rel_top  + IntentUICfg.HEIGHT - IntentUICfg.TextSize;
        jsonNew = {
                    left: left,
                    top:  top,
                    text: txt 
                }

        node    = UINodeCtrl.appendNode( {
                    parent: frame,
                    nodeName: `${fighterData.fighter.id}_INTENT_TXT`,
                    jsonOrg: intentTextJson,
                    jsonNew,
                    data: undefined
                } );

        fighterData.nodeIntentTxt   = node;

    }
    
    private static visible = ( node: UINode, b: boolean )=>{
        FightSceneCtrl.sceneObjVisible( node._render, b );
    }
}


// ========================================方法定义


// ========================================立即运行
const init = ()=>{
    // TODO After Load
    intentImageJson = { nodeName: "nodeName", nodeType: "IMAGE", imageURL: "", 
                            width: IntentUICfg.WIDTH, height: IntentUICfg.HEIGHT, 
                            left: 0, top: 0, z_relat: 0 };
    intentTextJson  = { nodeName: "nodeName", nodeType: "TEXT", text: "", 
                            left: 0, top: 0, font: getFont(IntentUICfg.TextSize, 300), 
                            font_space: -2, width: IntentUICfg.txtWidth,
                            color: IntentUICfg.textColor, align: "center", isCommon: false, z_relat: 2 };

};
init();
