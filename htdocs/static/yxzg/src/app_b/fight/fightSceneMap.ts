

/**
 * version: XXXXXXX
 *      描述：
 *      地图选择界面
 *      功能：
 *      xxxxxx
 */
// ========================================模块引入
import { UIListener } from "../../app/scene/uiNodeListener";
import { getWidth, getHeight, globalReceive, globalSend } from "app/mod/pi";
import { Fighter } from "../../fight/class";
import { setPermanent, removePermanent } from "../frameCtrl/frameCtrl";
import { Ambient, CameraFlags }  from "../sceneAmbient/ambient";

import { FightSceneCtrl, FighterMap } from "./fightSceneCtrl";
import { getSelf } from "./fight";

import { RoleNameList, RoleAnimFlags, ReadRoleAnim, RoleTplList, MapPosArrList } from "./fight/fightBase";
import { FighterData } from "./fight/fightSceneUIBase";
import { FighterAnim } from "./fight/animBase";


// ========================================常量定义
const ItemFlags = {
    "NO":       0,
    "FACE":     1,
    "RIGHT":    2,
    "LEFT":     3
}
const PerSatgeMoveTime = 600 ;
const ItemYCfg  = [ 0.5, 1.5 ];
const ItemRotateSpeeed = 0.2;

// 关卡选择 的表现对象 RTPL 类型
const ItemNames  = [ "model_sj02", "model_sj02", "model_sj02", "model_sj01", "model_sj01", "model_sj01", "model_sj01", "model_sj01", "model_sj01" ];
// 关卡选择 的表现对象 TPL 类型
const ItemType   = "shijian";
// 关卡选择 的表现对象 rayID 起点
const ItemRayID  = 10;
// 远近 台阶出现的间隔
const StageInterval = 200;

// ========================================导出接口


// ========================================数据结构
class Item {
    position: Array<number>;
    rayID: number;
    name: string;
    rotate: number = 0;
}

// ========================================变量声明
let player: FighterData;
let passCfg: any;
// selectedFlag 为 ShijianItemList 中目标 index+1  左: 3, 中：1， 右： 2
let selectedFlag: number = 0;
// 玩家运动的 起始时间
let startMoveTime: number = 0;
// 玩家运动过程 lookAt 更改次数
let lookAtChangeTime: number = 0;
// 玩家运动的 目标点
let moveEndPos: Array<number>;
// 关卡选择目标列表  左:  2, 中： 0， 右： 1
let ShijianItemList: Array<Item> = [];
// 行进路线上 已掉落的 块数目
let DownStageCount: number = 0;

// ========================================类定义
export class FightSceneMap {
    static init = ( cfg: any )=>{

        passCfg     = cfg;

        AnimCtrl.init();
        Ambient.modifyCamera( CameraFlags.Normal );
        
        FightSceneMap.createPlayer();
        FightSceneMap.createItems();

        UIListener.add3DListenDown( "FightMap", sceneClickCall );
    }
    static dispose = ()=>{
        let selectIndex: number;

        selectIndex = selectedFlag-1;

        UIListener.del3DListenDown( "FightMap" );

        // FightSceneCtrl.removeFighter( player.obj3D );

        FightSceneMap.clearStages();
        FightSceneMap.clearItems();

        AnimCtrl.dispose();

        selectedFlag    = 0;
        startMoveTime   = 0;
        DownStageCount  = 0;
        passCfg         = undefined;
        ShijianItemList.length  = 0;
        lookAtChangeTime        = 0;

        globalSend( "selectStage", selectIndex );
    }
    /**
     * 创建玩家模型
     * 
     */
    static createPlayer = ()=>{
        let self: Fighter;

        self    = getSelf();
        player  = FighterMap.get( self.id );

        if ( player && player.obj3D !== undefined ){
            return;
        }

        player  = new FighterData;
        player.fighter  = self; 

        FightSceneMap.createPlayerObj3D();

        FighterMap.set( self.id, player );

    }

    private static createPlayerObj3D = ()=>{
        let data: any, 
            roleName: string,
            pos: Array<number>;

        pos         = MapPosArrList[0][0];
        roleName    = RoleNameList[0];
        data        = {
                        rayID: player.fighter.id,
                        name: roleName,
                        position: [pos[0], 0, pos[1]],
                        playAnim: {
                            name: ReadRoleAnim( roleName, RoleAnimFlags.stand ),
                            isOnce: false
                        },
                        lookAt: [MapPosArrList[0][1][0], 0, MapPosArrList[0][1][1]]
                    }

        player.obj3D        = data;
        player.obj3DName    = roleName;
        player.isEnemy      = false;
        player.obj3DFlag    = RoleAnimFlags.stand;

        FightSceneCtrl.createFighter( data, RoleTplList[0] );

        Ambient.createStage( { x: pos[0], y: pos[1], type: 1, anim: false } );
    }
    /**
     * 创建关卡 地图
     */
    private static createItems = ()=>{
        passCfg.forEach( (data, index) => {
            FightSceneMap.createStage( index+1, data );
            // FightSceneMap.createItem( index+1, data ) ;
        } );
    }
    /**
     * 创建关卡 目标
     */
    private static createItem = ( flag: number, type: number)=>{
        let posArr: Array<Array<number>>, 
            pos: Array<number>,
            itemName: string, itemItem: Item;

        posArr  = MapPosArrList[ flag ];
        pos     = posArr[ posArr.length -1 ] ;
        pos     = [ pos[0], ItemYCfg[0], pos[1] ];

        itemName = ItemNames[ type -1 ];
        itemItem = new Item;
        itemItem.position        = pos;
        itemItem.name            = itemName;
        itemItem.rayID           = ItemRayID+flag;

        ShijianItemList.push( itemItem );
        FightSceneCtrl.sceneCreate( itemItem, undefined, ItemType );
    }
    /**
     * 创建地块
     */
    private static createStage = ( flag: number, itemType: number )=>{
        let posArr: Array<Array<number>>;

        posArr  = MapPosArrList[flag];

        posArr.forEach( (pos, index) => {
            let stagetype: number;
            if ( pos[0] % 6 === 0 ){
                if ( pos[1] % 9 === 0 ){
                    // 战斗事件
                    if ( itemType <= 3 ){
                        stagetype = 1;
                    }else{
                        stagetype = 3;
                    }
                }else{
                    stagetype = 4;
                }
            }else{
                stagetype = 4;
            }

            let time = setTimeout( ()=>{
                clearTimeout( time );

                Ambient.createStage( { x: pos[0], y: pos[1], type: stagetype } );

                if ( index === posArr.length-1 ){
                    let cfg: any;

                    cfg     = passCfg[flag-1];
                    FightSceneMap.createItem( flag, cfg );
                }

                console.log( pos, Date.now() );
            }, Math.abs(pos[1] / 3) * StageInterval );
        } );
    }
    // 清除关卡图标
    private static clearItems = ()=>{

        ShijianItemList.forEach( (ele, index) => {

            if ( index+1 === selectedFlag ){
                let time = setTimeout( ()=>{ 
                        clearTimeout( time ); 
                        FightSceneCtrl.sceneRemove( ele );
                    }, 1200 );
            }else{
                FightSceneCtrl.sceneRemove( ele );
            }

        } );

        ShijianItemList.length = 0;
    }
    // 清除关卡地图中的地块
    private static clearStages = ()=>{

        Ambient.clearStages( [ moveEndPos ] );

        Ambient.resetStage( moveEndPos, [ 0, 0 ] );
    }
}

// 关卡地图 运动控制
class AnimCtrl {

    static init = ()=>{
        setPermanent( "FighteMapFrame", AnimCtrl.update );
    }

    static dispose = ()=>{
        removePermanent( "FighteMapFrame" );
    }
    
    static startMove = ()=>{
        startMoveTime   = Date.now();
        FighterAnim.toAnim( player, RoleAnimFlags.move );
    }
    // 人物到达关卡图标
    static moveEndCall = ()=>{
        startMoveTime  = 0;

        FighterAnim.toAnim( player, RoleAnimFlags.stand );

        FightSceneMap.dispose();
    }

    // 根据行进进度 更新 地图表现
    static update = ()=>{
        let progress: number, tempTime: number, totalTime: number;
        let x: number, z: number;
        let from: Array<number>, to: Array<number>;
        let lookAt: Array<number>;
        let item: Item;

        if ( startMoveTime === 0 ) return ;

        if ( selectedFlag > ItemFlags.NO ){
            tempTime    = Date.now() - startMoveTime;
            totalTime   = MapPosArrList[selectedFlag].length * PerSatgeMoveTime;
            progress    = tempTime > totalTime ? 1 : tempTime / totalTime ;

            if ( selectedFlag === ItemFlags.FACE ){
                from    = MapPosArrList[0][0];
                to      = MapPosArrList[selectedFlag][2];
                x       = from[0] + progress * (to[0] - from[0]);
                z       = from[1] + progress * (to[1] - from[1]);

                if ( lookAtChangeTime < 1 ){
                    lookAtChangeTime++;
                    lookAt  = [0, to[1], 0];
                }
            }else{
                if ( progress >= 0.4 ){
                    from    = MapPosArrList[selectedFlag][1];
                    to      = MapPosArrList[selectedFlag][4];
                    x       = from[0] + (progress-0.4)/0.6 * (to[0] - from[0]);
                    z       = from[1] + (progress-0.4)/0.6 * (to[1] - from[1]);

                    if ( lookAtChangeTime < 2 ){
                        lookAtChangeTime++;
                        lookAt  = [0, to[1], 0];
                    }
                }else{
                    from    = MapPosArrList[0][0];
                    to      = MapPosArrList[selectedFlag][1];
                    x       = from[0] + (progress/0.4) * (to[0] - from[0]);
                    z       = from[1] + (progress/0.4) * (to[1] - from[1]);
                    
                    if ( lookAtChangeTime < 1 ){
                        lookAtChangeTime++;
                        lookAt  = [to[0], 0, 0];
                    }
                }
            }

            if ( lookAt !== undefined )
            {
                FightSceneCtrl.sceneObj3DLookAt( player.obj3D, lookAt );
            }

            // AnimCtrl.cameraModify( x, z );

            moveEndPos  = to;

            MapPosArrList.forEach( arr =>{
                arr.forEach( pos=>{
                    Ambient.modifyStagePos( pos[0], pos[1], -x, -z );
                } );
            } );
            
            item        = ShijianItemList[ selectedFlag-1 ];
            item.rotate = (Date.now() - startMoveTime) /100 * ItemRotateSpeeed;

            FightSceneCtrl.sceneObjRotate( item, [ 0, item.rotate, 0 ] );
            FightSceneCtrl.sceneObjPos( item, [ item.position[0] -x, item.position[1], item.position[2] -z, ] )

            AnimCtrl.computeOverStage( progress, selectedFlag );

            if ( progress === 1 ){
                AnimCtrl.moveEndCall( );
            }
        }

    }
    
    // 清除目标线路外的地块
    static downOtherStage = ( )=>{
        let tempPosArr: Array<Array<number>>;

        passCfg.forEach( (data, index) => {
            if ( index+1 !== selectedFlag ){
                tempPosArr  = MapPosArrList[index+1];

                tempPosArr.forEach( pos=>{
                    Ambient.removeStage( pos[0], pos[1] );
                } );
            }
        } );
    }
    
    // 目标线路外的地块 随玩家前进进度 下落
    static downOtherStage2 = ( index: number, flag: number )=>{
        let tempPosArr: Array<Array<number>>;

        if ( index > 0 ){
            for ( let i=1; i<=3; i++ ){
                if ( i !== flag ){
                    if ( flag === ItemFlags.FACE ){
                        tempPosArr  = MapPosArrList[ i ];

                        // 中间线路 前进过程 跨过第二个地块，左右两条线路的 前两个地块下落
                        if ( index === 1 ){
                        Ambient.removeStage( tempPosArr[ index-1 ][ 0 ], tempPosArr[ index-1 ][ 1 ] );
                        }

                        Ambient.removeStage( tempPosArr[ index   ][ 0 ], tempPosArr[ index   ][ 1 ] );
                    }else{

                        tempPosArr  = MapPosArrList[ i ];

                        if ( i !== ItemFlags.FACE || index < 4 ){
                            Ambient.removeStage( tempPosArr[ index-1 ][ 0 ], tempPosArr[ index-1 ][ 1 ] );
                        }
                    }
                }
            }
        }
    }
    // 计算玩家前进进度 控制地块下落
    static computeOverStage = ( progress: number, flag: number )=>{
        let movePosArr: Array<Array<number>>, times: number;
        let temp: number;

        movePosArr  = MapPosArrList[ flag ];
        times       = movePosArr.length;

        for ( let i=0; i<times; i++ ){

            temp    = (i*2+1)/(times*2);

            if ( temp > DownStageCount/times && progress > temp ){

                if ( i === 0 ){
                    Ambient.removeStage( MapPosArrList[ 0 ][ 0 ][ 0 ], MapPosArrList[ 0 ][ 0 ][ 1 ] );
                }else{
                    Ambient.removeStage( movePosArr[ i-1 ][ 0 ], movePosArr[ i-1 ][ 1 ] );

                    AnimCtrl.downOtherStage2( i, flag );
                }

                // 目标线路 下落的地块数目加一
                DownStageCount++;

                break;
            }
        }

    }
    static cameraModify = ( x: number, y: number )=>{
        Ambient.modifyCameraPos( x, y );
    }
    static computeItemRotate = ()=>{

    }
    static selectItemUp = ( item: Item )=>{
        item.position[1]  = ItemYCfg[1];
        FightSceneCtrl.sceneObjPos( item, item.position );
    }
    // 移除其他关卡图标
    static removeOtherItem = (  target: Item  )=>{
        ShijianItemList.forEach( (item, index) =>{
            if ( target !== item ){
                FightSceneCtrl.sceneRemove( item );
                delete ShijianItemList[index];
            }
        } );
    }
}


// ========================================方法定义
const sceneClickCall = ( res )=>{
    let target: Item, index: number;

    if ( res !== undefined && res.id !== undefined && selectedFlag === ItemFlags.NO ){
        target = ShijianItemList.find( (item)=>{
                        return item.rayID === res.id;
                    } );

        if ( target !== undefined ){
            index   = ShijianItemList.indexOf( target );
                    
            if (index >= 0){

                selectItem( index+1 );

                AnimCtrl.selectItemUp( target );

                AnimCtrl.removeOtherItem( target );

                // AnimCtrl.downOtherStage();

            }
        }
    }

}

const selectItem = ( flag: number )=>{
    if ( selectedFlag === ItemFlags.NO ){
        selectedFlag    = flag;
        AnimCtrl.startMove();
    }
}

// ========================================立即运行
const init = ()=>{
    // TODO After Load
};
init();
