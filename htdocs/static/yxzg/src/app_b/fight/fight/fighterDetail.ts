
/**
 * version: XXXXXXX
 *      描述：
 *      fighter 状态详细描述
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { UINode, getFont } from "app/scene/uiNodeBase";
import { FighterData, IntentIconList, IntentNames, IntentTypes } from "./fightSceneUIBase";
import { UIListener } from "app/scene/uiNodeListener";
import { FighterMap } from "../fightSceneCtrl";
import { recordUIJson } from "../../../app/scene/uiNodeCreator";
import { EnemyDetailPosList_, FriendDetailPosList } from "./fightBase";
import { UINodeCtrl, Z_ORDERS } from "../../../app/scene/uiNode";



// ========================================常量定义
const ItemCfg = {

    width: 160,
    height: 68,
    maxCol: 3,
    maxRow: 5,
    // 横向间隔
    spaceW: 6,
    // 竖向间隔
    spaceH: 4,
    
    NameBG: "background/detail_NameBG.png",
    BuffBG: "background/detail_BuffBG.png",
    IntentBG: "background/detail_IntentBG.png",

    // fighter名称
    nameHeight: 24,
    nameWidth: 128,
    nameColor: "#c0ad7e",
    nameSize: 20,
    nameLT: [ 80, 1 ],
    
    // 图标
    iconSize: 20,
    iconLT: [ 17, 7 ],

    // 描述名称
    titleColor: "#ffb400",
    titleSize: 16,
    titleWidth: 128,
    titleLT: [ 39, 7],

    // 描述类型
    typeSize: 14,
    typeColor: "#bdbdbd",
    typeWidth: 64,
    typeLT: [ 96, 7],
    
    // 描述内容
    descSize: 14,
    descColor: "#ffffff",
    descWidth: 128,
    descLT: [ 17, 30 ]
}

const DetailTypes = [ "意图", "BUFF" ];

// ========================================导出接口


// ========================================数据结构
class DetailData {
    fighterName: string;
    itemArr: Array<DetailItem> = [];
}

class DetailItem {
    type: any;
    name: any;
    desc: any;
    icon: any;
    bgURL: any;
}

// ========================================变量声明
let frameJson: any, frameData: any, frameClass: string;
let itemJson: any, itemData: any, itemClass: string;

// ========================================类定义
// 玩家信息
export class FighterDetail {
    static init = ()=>{
        UIListener.add3DListenDown( "FighterDetail", sceneDownCall );
        UIListener.add3DListenUp( "FighterDetail", sceneUpCall );
    }
    static dispose = ()=>{
        UIListener.del3DListenDown( "FighterDetail" );
        UIListener.del3DListenUp( "FighterDetail" );
    }
    static show = ( fighterData: FighterData )=>{
        let diffTop: number;
        if ( fighterData.nodeDetail === undefined ){

            diffTop = FighterDetail.computeTopDiff( fighterData );

            if ( (fighterData.campIndex === 2 )  ){
                diffTop += 100;
            }

            FighterDetail.createFrame( fighterData, diffTop );
            FighterDetail.createItems( fighterData, diffTop );

        }

    }
    static close = ( fighterData: FighterData )=>{

        if ( fighterData.nodeDetail !== undefined ){

            FighterDetail.disposeItems( fighterData );
            FighterDetail.disposeFrame( fighterData );
    
            delete fighterData.nodeDetail;
        }

    }
    private static computeTopDiff = ( fighterData: FighterData )=>{
        let itemCount: number;
        itemCount   = fighterData.intentList.length + fighterData.bufferList.length;

        if ( itemCount < ItemCfg.maxRow ){
            return -(itemCount)/2 * ItemCfg.height;
        }else{
            return -(ItemCfg.maxRow)/2 * ItemCfg.height;
        }
    }
    private static createFrame = ( fighterData: FighterData, diffTop: number )=>{
        let tempPos: Array<number>, jsonNew: any, frameData: any;

        if ( fighterData.isEnemy === true ){
            tempPos = EnemyDetailPosList_[fighterData.campCount-1][fighterData.campIndex];
            jsonNew     = { left: tempPos[0] -ItemCfg.width,  top: tempPos[1] + diffTop };
        }else{
            tempPos = FriendDetailPosList[fighterData.campIndex];
            jsonNew     = { left: tempPos[0],  top: tempPos[1] + diffTop };
        }

        frameData   = { fighterName : { text: fighterData.fighter.name == "" ? "玩家" :  fighterData.fighter.name }  };

        fighterData.nodeDetail  = UINodeCtrl.openFrame({
                        frameClass,
                        nodeName: `${fighterData.fighter.id}_detail`,
                        jsonNew,
                        data: frameData
                    });

    }
    private static disposeFrame = ( fighterData: FighterData )=>{
        UINodeCtrl.removeNode( fighterData.nodeDetail );
    }
    private static createItems = ( fighterData: FighterData, diffTop: number  )=>{
        let tempIndex: number = 0, tempItem: DetailItem = new DetailItem, itemNode: UINode, intentIndex: number;

        fighterData.nodeDetailItems     = [];

        fighterData.intentList.forEach( ( data )=>{

            intentIndex     = Math.pow( 2, IntentTypes.indexOf( (data.type as any) -0) ) ;

            tempItem.desc   = { text: data.desc ? data.desc : "意图描述" };
            tempItem.icon   = { imageURL: IntentIconList[ intentIndex  ] };
            tempItem.name   = { text: IntentNames[  `${data.type}`  ] };
            tempItem.type   = { text: DetailTypes[0] };
            tempItem.bgURL  = { imageURL: ItemCfg.IntentBG };

            itemNode    = FighterDetail.createItem( fighterData, tempItem, tempIndex++, diffTop );

            fighterData.nodeDetailItems.push( itemNode );
        } );

        fighterData.bufferList.forEach( ( data )=>{

            tempItem.desc   = { text: data.desc ? data.desc : "buff描述" };
            tempItem.icon   = { imageURL: `symbol/${data.icon}.png` };
            tempItem.name   = { text: data.name ? data.name : "BUFF" } ;
            tempItem.type   = { text: DetailTypes[1] };
            tempItem.bgURL  = { imageURL: ItemCfg.BuffBG };

            itemNode    = FighterDetail.createItem( fighterData, tempItem, tempIndex++, diffTop );

            fighterData.nodeDetailItems.push( itemNode );
        } );
    }
    private static createItem = ( fighterData: FighterData, item: DetailItem, index: number, diffTop: number  )=>{
        let node: UINode, left: number, top: number, tempData: any, jsonNew: any, tempPos: Array<number>;

        if ( fighterData.isEnemy === true ){
            tempPos = EnemyDetailPosList_[fighterData.campCount-1][fighterData.campIndex];
        }else{
            tempPos = FriendDetailPosList[fighterData.campIndex];
        }

        if ( fighterData.isEnemy === true ){
            left    = tempPos[0] - (Math.floor( index / ItemCfg.maxRow ) +1)*(ItemCfg.width + ItemCfg.spaceW) + ItemCfg.spaceW;
            top     = tempPos[1] + ( index % ItemCfg.maxCol )*(ItemCfg.height + ItemCfg.spaceH) + diffTop;
        }else{
            left    = tempPos[0] + (Math.floor( index / ItemCfg.maxRow ))*(ItemCfg.width + ItemCfg.spaceW);
            top     = tempPos[1] + ( index % ItemCfg.maxCol )*(ItemCfg.height + ItemCfg.spaceH) + diffTop;
        }

        jsonNew     = {
                        left: left,
                        top: top,
                        z_relat: fighterData.nodeDetail.z + 1
                    };
        
        tempData    = item;
        node        = UINodeCtrl.appendNode( {
                        parent: fighterData.nodeDetail,
                        nodeName: `detail_${index}`,
                        jsonOrg: itemJson,
                        jsonNew,
                        data: tempData
                    } );

        return node;
    }
    private static disposeItems = ( fighterData: FighterData )=>{
        fighterData.nodeDetailItems.forEach( node => {
            UINodeCtrl.removeNode( node );
            node    = undefined;
        } ) ;

        fighterData.nodeDetailItems.length = 0;

        delete fighterData.nodeDetailItems;
    }
}


// ========================================方法定义

const sceneDownCall = ( res )=>{
    let target: FighterData;

    if ( res !== undefined && res.id !== undefined ){
        FighterMap.forEach( fighterData =>{
            if ( res.id === fighterData.fighter.id ){
                target = fighterData;
            }
        } );

        FighterDetail.show( target );
    }

}
const sceneUpCall = ( res )=>{
    FighterMap.forEach( fighterData =>{
        FighterDetail.close( fighterData );
    } );
}

// ========================================立即运行
const init = ()=>{
    // TODO After Load
    frameClass  = "FighterDetailFrame";
    itemClass   = "FighterDetailItem";

    frameJson   = { nodeName: "nodeName", nodeType: "FRAME", uiClass: frameClass, 
                    width: 0, height: 0, left: 0, top: 0, z_relat: Z_ORDERS.POP2,
                    nodes: [
                        { nodeName: "nameBG", nodeType: "IMAGE", imageURL: ItemCfg.NameBG, 
                            width: ItemCfg.width, height: ItemCfg.nameHeight, left: 0, top: 0-ItemCfg.nameHeight-5, z_relat: 0 },

                        { nodeName: "nameTxt", nodeType: "TEXT", text: "", width: ItemCfg.nameWidth,
                            left: ItemCfg.nameLT[0], top: ItemCfg.nameLT[1], 
                            font: getFont(ItemCfg.nameSize), font_space: -2,
                            color: ItemCfg.nameColor, align: "center", isCommon: false, z_relat: 1 }
                    ],
                    design: {
                        "nameBG": [ "nameTxt" ]
                    },
                    // 对应 DetailData
                    dataMatch: {
                        "nameTxt": "fighterName"
                    }
                };
    itemJson    = { nodeName: "nodeName", nodeType: "FRAME", uiClass: itemClass, 
                    width: ItemCfg.width, height: ItemCfg.height, left: 0, top: 0, z_relat: 0,
                    nodes: [
                        { nodeName: "BG", nodeType: "IMAGE", imageURL: "", 
                            width: ItemCfg.width, height: ItemCfg.height, left: 0, top: 0, z_relat: 0 },

                        { nodeName: "Icon", nodeType: "IMAGE", imageURL: "", 
                            width: ItemCfg.iconSize, height: ItemCfg.iconSize, 
                            left: ItemCfg.iconLT[0], top: ItemCfg.iconLT[1], z_relat: 1 },

                        { nodeName: "Title", nodeType: "TEXT", text: "", width: ItemCfg.titleWidth,
                            left: ItemCfg.titleLT[0], top: ItemCfg.titleLT[1], 
                            font: getFont(ItemCfg.titleSize), font_space: -2, 
                            color: ItemCfg.titleColor, align: "left", 
                            isCommon: false, z_relat: 1 },

                        { nodeName: "Type", nodeType: "TEXT", text: "", width: ItemCfg.typeWidth,
                            left: ItemCfg.typeLT[0]+ItemCfg.typeWidth-ItemCfg.iconLT[0]+7, top: ItemCfg.typeLT[1],
                            font: getFont(ItemCfg.typeSize), font_space: -2,
                            color: ItemCfg.typeColor, align: "right", 
                            isCommon: false, z_relat: 1 },

                        { nodeName: "Desc", nodeType: "TEXT", text: "", width: ItemCfg.descWidth,
                            left: ItemCfg.descLT[0], top: ItemCfg.descLT[1], 
                            font: getFont(ItemCfg.descSize), font_space: -2,
                            color: ItemCfg.descColor, align: "left", 
                            isCommon: false, z_relat: 1 }
                    ],
                    design: {
                        "BG": true,
                        "Icon": true,
                        "Title": true,
                        "Type": true,
                        "Desc": true
                    },
                    // 对应 DetailItem
                    dataMatch: {
                        "Icon": "icon",
                        "Title": "name",
                        "Type": "type",
                        "Desc": "desc",
                        "BG": "bgURL"
                    }
                };
    
    recordUIJson( frameClass, frameJson );
    recordUIJson( itemClass, itemJson );
};
init();
