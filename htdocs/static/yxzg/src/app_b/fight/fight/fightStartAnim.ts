
import { ImageAnimData_Math } from "../../frameCtrl/imageAnimBase";
import { Ambient } from "../../sceneAmbient/ambient";
import { Effect, EffectData, EffectFlag } from "../../sceneAmbient/effect";
import { EnemyPosList_ } from "./fightBase";
import { setWait } from "../../../app/scene/scene_show";
import { FighterData } from "./fightSceneUIBase";


const EffectID: number = 10000;
const FighterInputTimes = [ 450, 900, 1350, 1800 ];

export const createFightStartAnim = ( 
        { fighterList, cameraFlag, cb }:
        { fighterList: Array<FighterData>, cameraFlag: number, cb: Function } )=>{
    let data: FightStartAnimData;

    data    = new FightStartAnimData;
    data.setCallback( cb );
    data.setCamera( cameraFlag );
    data.setFigherArr( fighterList );
    
    data.begin();
}

/**
 * 选择关卡后动画
 * 1. 创建台阶
 * 2. 相机旋转 & 怪生成动画
 * 3. 怪物创建 & 血条创建
 * 4. 战斗开始 tip 动画
 */
export class FightStartAnimData {
    figterArr: Array<FighterData>;
    // 目标相机配置的标识
    cameraFlag: number;
    // 相机动画结束标识
    cameraAnimEnd: boolean = false;
    // fighter 进入动画的结束标识
    fighterInputAnimEnd: boolean = false;
    // fighter 进入的特效动画
    fighterInputAnim: EffectData;
    fighterInputStartTime: number;
    // fighter 已创建的个数
    fighterCreateNum: number = 0;
    // 战斗开始 的图片 淡入淡出动画
    startAnimData: ImageAnimData_Math;
    cb: Function;

    constructor( ){
        setWait( true )
    }
    setFigherArr = ( list: Array<FighterData> )=>{
        this.figterArr = list;
    }
    setCamera  = ( flag: number )=>{
        this.cameraFlag = flag;
    }
    setCallback = ( f: Function )=>{
        this.cb = f;
    }
    begin = ()=>{
        let effectType: number;

        effectType  = EffectFlag[`FIGHTER_INPUT_${this.figterArr.length}`];
        this.fighterInputAnim = Effect.effect( EffectID, effectType, [ 0, 0, 0 ], this.fighterInputEndCall );

        this.createStages();
        this.createFighters();

        Ambient.modifyCamera( this.cameraFlag, this.cameraAnimEndCall );

    }
    private createStages = ()=>{
        let pos: Array<number>;

        for ( let i=0; i<this.figterArr.length; i++ ){
            pos = EnemyPosList_[ this.figterArr.length ][ i ];
            Ambient.createStage_XZ( { x0: 0, z0: -1, x: pos[0], z: pos[2], type: 3, time: 600 } );
        }
       
    }
    // 创建fighter 的时机，跟随特效节奏
    private createFighters = ()=>{
        let count: number;

        count   = this.figterArr.length;
        for ( let i=0; i<count; i++ ){

            let time = setTimeout( ()=>{

                clearTimeout( time );

                this.figterArr[i].createObjCall();

                this.fighterCreateNum ++;

                this.startTipAnimBegin();

                console.log( `FightSceneFight.create( undefined, ${i} );` );

            }, FighterInputTimes[i+1] );
        }

    }
    private cameraAnimEndCall = ()=>{
        this.cameraAnimEnd  = true;
        this.startTipAnimBegin();
    }
    private fighterInputEndCall = ()=>{
        this.fighterInputAnimEnd = true;
        this.startTipAnimBegin();
    }
    private startTipAnimBegin = ()=>{
        if ( this.fighterInputAnimEnd && this.cameraAnimEnd &&  this.fighterCreateNum === this.figterArr.length ){
            this.startAnimData      = new ImageAnimData_Math( "text/startfight.png", this.startTipAnimEndCall );
            this.startAnimData.height   = 146;
            this.startAnimData.width    = 416;
            this.startAnimData.x        = 272;
            this.startAnimData.y        = 197;
            this.startAnimData.time     = 1200;
            this.startAnimData.opacityArr   = [ 0.4, 1 ];
            this.startAnimData.opacityMath  = "back1";

            this.startAnimData.run( );
        }
    }
    private startTipAnimEndCall = ()=>{
        this.cb && this.cb();

        this.dispose();
    }
    private dispose = ()=>{
        delete this.begin;
        delete this.figterArr;
    
        delete this.cameraFlag;
        delete this.cameraAnimEnd;
    
        delete this.fighterInputAnimEnd;
        delete this.fighterInputAnim;
        delete this.fighterInputStartTime;
        delete this.fighterCreateNum;
    
        delete this.startAnimData;
        delete this.cb;
    }
}