import { UINode, getFont } from "app/scene/uiNodeBase";
import { UIDataState, UINodeCtrl } from "app/scene/uiNode";
import { setPermanent, puasePermanent, activePermanent }    from "../../frameCtrl/frameCtrl";

import { DamageUICfg }    from "./fightSceneUIBase";
import { UINodeAnimData_Math } from "../../frameCtrl/imageAnimBase";
import { AnimMath } from "../../frameCtrl/animMath";

// ======================================== 常量定义
const frameKey: string = "DamageFrame";

// ======================================== 变量声明
let damageCounter: number = 0,  // 伤害表现计数器
    // 伤害表现 堆
    damageMap: Map<number,DamageData> = new Map,
    // 伤害动画循环是否激活
    frameFlag: boolean  = false,
    DamageJson: any;


// ======================================== 数据结构
// 伤害表现数据
class DamageData {
    node: UINode;
    state: UIDataState;
    damageID: number;
    tempState: UIDataState;
    createTime: number;
    progress: number;
    fighterID: number;
    /**
     * 
     * @param damage        伤害数值
     * @param frame         伤害 在该 组件内 表现
     * @param modelLeft     fighter 在 UI 层的定位
     * @param modelTop      fighter 在 UI 层的定位
     * @param fighterID     
     */
    constructor( damage: number, frame: UINode, modelLeft: number, modelTop: number, fighterID: number ){
        let jsonNew: any, left: number,  left2: number, top: number, z: number, nodeName: string, damageID: number;
        
        damageID= damageCounter++
        left    = modelLeft ;
        left2   = modelLeft + 150;
        top     = modelTop;

        z       = frame.z   +10;
        nodeName= `damage${damageID}`;

        jsonNew = {
                    left:       left,
                    top:        top,
                    z_relat:    z,
                    text:       `-${damage}`
                };

        this.createTime = Date.now();
        this.damageID   = damageID;
        this.node   = UINodeCtrl.appendNode({
                            parent:         frame,
                            jsonOrg:        DamageJson,
                            jsonNew:        jsonNew,
                            nodeName:       nodeName,
                            data:           undefined
                        });

        this.state      = new UIDataState;
        this.tempState  = new UIDataState;

        this.state.state.top    = top;
        this.state.state.z_relat= z;

        this.tempState.state.top    = top;
        this.tempState.state.z_relat= z;

        this.progress   = 0;
        this.fighterID  = fighterID;

            
        this.createTime = Date.now();
        damageMap.set( damageID, this );

        // let data: UINodeAnimData;
        
        // data    = new UINodeAnimData( this.node, this.dispose );
        // data.time   = DamageUICfg.times;
        // data.top    = [ top, top -DamageUICfg.diffY ];

        // UINodeAnimFunc.add( data );

        let data: UINodeAnimData_Math;
        data            = new UINodeAnimData_Math( this.node, this.dispose );
        data.time       = DamageUICfg.times;
        data.left       = [ left, left2 ];
        data.leftMath   = "line";
        data.top        = [ top ];
        data.topMathFunc    = (x)=>{ return 2*AnimMath["power2_1_3_down_0"](x); } ;

        data.run( );
    }
    /**
     * 伤害动画 更新
     */
    // update = ()=>{
    //     let currTime: number, progress: number;

    //     currTime    = Date.now();
    //     progress    = (currTime - this.createTime) / DamageUICfg.times;
    //     this.progress   = progress > 1 ? 1 : progress;

    //     if ( this.progress === 1 ){
    //         this.dispose();
    //     }else{
    //         this.updateState();
    //     }
    // }
    /**
     * 伤害节点 更新
     */
    // private updateState = ()=>{
    //     this.tempState.state.top    = this.state.state.top -DamageUICfg.diffY*this.progress;

    //     UINodeCtrl.updateNodeData( this.node, this.tempState );
    // }
    dispose = ()=>{
        UINodeCtrl.removeNode( this.node );
        damageMap.delete( this.damageID  );

        delete this.node;
        delete this.createTime;
        delete this.state;
        delete this.tempState;
        delete this.progress;
        delete this.damageID;
    }
}

// ======================================== 类定义
// 伤害表现方法
export class DamageFunc {
    /**
     * 外部 创建一个 伤害动画
     */
    static addDamage = ( damage: number, frame: UINode, modelLeft: number, modelTop: number, fighterID: number )=>{

        let damageData: DamageData, tempIndex: number = 0;

        damageMap.forEach( ele => {
            if ( fighterID === ele.fighterID ){
                tempIndex++;
            }
        } );

        if ( tempIndex > 0 ){
            let time = setTimeout( ()=>{

                damageData  = new DamageData( damage, frame, modelLeft, modelTop, fighterID );

                clearTimeout( time );
            }, tempIndex * 120 );
            
        }else{
            damageData  = new DamageData( damage, frame, modelLeft, modelTop, fighterID );
        }

        if ( frameFlag === false ){
            DamageFunc.init();
        }
    }
    static frameFunc = ()=>{
        // damageMap.forEach( ele => {
            // ele.update();
        // } );
    }
    private static init = ()=>{
        frameFlag   = true;
        setPermanent( frameKey, DamageFunc.frameFunc );
    }
    static isFrameEnd = ()=>{
        // console.log( "damageMap.size ", damageMap.size );
        return damageMap.size === 0;
    }

    
    static _logMapSize = ()=>{
        return [ "damageMap.size ", damageMap.size ];
    }
}

// ======================================== 立即执行
const init = ()=>{
    
    DamageJson = { nodeName: "", nodeType: "TEXT", text: "", left: 0, top: 0, 
                    font: getFont(DamageUICfg.txtSize), font_space: -2,
                    color: DamageUICfg.txtColor, align: "center",  
                    border_width:DamageUICfg.txtBorderWidth, border_color: DamageUICfg.txtBorderColor, 
                    isCommon: false, z_relat: 0 };
}
init();