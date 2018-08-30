import { UINode } from "../../app/scene/uiNodeBase";
import { UIDataState, UINodeCtrl } from "../../app/scene/uiNode";
import { setPermanent, puasePermanent, activePermanent }    from "../frameCtrl/frameCtrl";

const DamageJson = { nodeName: "", nodeType: "TEXT", text: "", left: 0, top: 0, 
                    font: `normal normal ${60}px mnjsh`, font_space: -2,color: "#f00000", 
                    align: "center", shadow_width: 1, shadow_color: "#000000", isCommon: false, z_relat: 0 };

const DamageCfg = {
        diffY: 40,
        diffO: 0.5,
        times: 500
    }

const frameKey: string = "DamageFrame";

let damageCounter: number = 0;
let damageMap: Map<number,DamageData> = new Map;
let frameFlag: boolean  = false;
let frameIsActive: boolean = false;


class DamageData {
    node: UINode;
    state: UIDataState;
    damageID: number;
    tempState: UIDataState;
    createTime: number;
    progress: number;
    constructor( damage: number, frame: UINode, modelLeft: number, modelTop: number ){
        let jsonNew: any, left: number, top: number, z: number, nodeName: string, damageID: number;
        
        damageID= damageCounter++
        left    = modelLeft +50;
        top     = modelTop  -20;
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

        damageMap.set( damageID, this );
    }
    update = ()=>{
        let currTime: number, progress: number;

        currTime    = Date.now();
        progress    = (currTime - this.createTime) / DamageCfg.times;
        this.progress   = progress > 1 ? 1 : progress;

        if ( this.progress === 1 ){
            this.dispose();
        }else{
            this.updateState();
        }
    }
    private updateState = ()=>{
        this.tempState.state.top    = this.state.state.top -DamageCfg.diffY*this.progress;

        UINodeCtrl.updateNodeData( this.node, this.tempState );
    }
    dispose = ()=>{
        UINodeCtrl.removeNode( this.node );
        damageMap.delete( this.damageID );

        delete this.node;
        delete this.createTime;
        delete this.state;
        delete this.tempState;
        delete this.progress;
        delete this.damageID;
    }
}

export class DamageFunc {
    static addDamage = ( damage: number, frame: UINode, modelLeft: number, modelTop: number )=>{
        let damageData: DamageData;
        damageData  = new DamageData( damage, frame, modelLeft, modelTop );

        if ( frameFlag === false ){
            DamageFunc.init();
        }
    }
    static frameFunc = ()=>{
        frameIsActive   = false;

        damageMap.forEach( ele => {
            ele.update();
            
            frameIsActive = true;
        } );
    }
    static init = ()=>{
        frameFlag   = true;
        setPermanent( frameKey, DamageFunc.frameFunc );
    }
    static isFrameEnd = ()=>{
        return !frameIsActive;
    }
}