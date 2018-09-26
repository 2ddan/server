/**
* version: XXXXXXX
*      描述：
*      xxxxxx
*      功能：
*      xxxxxx
*/
// ========================================模块引入
import { UINode, getFont } from "app/scene/uiNodeBase";
import { UINodeCtrl, UIDataText, UIDataState }   from "app/scene/uiNode";
import { UIDataOpacity } from "../../../app/scene/uiNodeCreator";
import { FighterData, HPUICfg }  from "./fightSceneUIBase";
import { setPermanent, removePermanent } from "../../frameCtrl/frameCtrl";
import { UIDataImage } from "../../../app/scene/uiNodeCreator";
// ========================================常量定义


// ========================================导出接口

// ========================================数据结构

// ========================================变量声明
let frameNode: UINode, frameData, frameJson, frameName, frameClass;
let selectImgJson: any; // 选中效果图片JSON

// ========================================类定义
export class SelectEffectData {
    id: number; // id
    effectName: string; // 效果名称
    icon: string; // 图标
    node: UINode; // 当前图片的node节点
    animIntervalId: number; // 动画循环id
    nowOpacity: 1; // 当前透明度
    changeOptStep: number; // 改变透明度的大小间隔
    finishCall: Function; // 结束回调方法
    startAnimFun: Function; // 开始动画方法
    cancelAnimFun: Function; // 取消动画方法
}


export class SelectEffectFunc {
    /**初始化frame
     * @param 父节点
     */
    static initFrame = (parent: UINode) => {
        frameNode = parent;
    };
    static disposeFrame = () => {
        frameNode = undefined;
    };
    static calcSelectLeft = (fighterData: FighterData) => {
        return fighterData.nodeLeft + (-71);
    };
    /**创建选中图片 */
    static createSelectImg = (fighterData: FighterData, selectEff: SelectEffectData) => {
        let imgLeft:number = SelectEffectFunc.calcSelectLeft(fighterData), jsonNew: any, node: any;
        
        jsonNew = {
            left: imgLeft,
            top: 0,
            imageURL: fighterData.isEnemy ? 'background/enemy_select_bg.png' : 'background/own_select_bg.png'
        };

        node = UINodeCtrl.appendNode({
            parent: frameNode,
            nodeName: `${fighterData.fighter.id}_SELECT_EFFECT_IMG`,
            jsonOrg: selectImgJson,
            jsonNew,
            data: undefined
        });

        selectEff.node = node;
        fighterData.selectEff = selectEff;
    };
    // 选中
    static createSelectEffect = (fighterData: FighterData) => {
        let selectEffect = new SelectEffectData();
        
        selectEffect.id = fighterData.fighter.id;
        selectEffect.effectName = 'imgSelectEffect';
        selectEffect.nowOpacity  = 1;
        selectEffect.changeOptStep = 0.03;
        selectEffect.icon = fighterData.isEnemy ? 'background/enemy_select_bg.png' : 'background/own_select_bg.png';
        selectEffect.startAnimFun = SelectEffectFunc.startAnim;
        selectEffect.cancelAnimFun = SelectEffectFunc.cancelAnim;
        selectEffect.finishCall = () => {
            SelectEffectFunc.dispose(fighterData);
        };
        

        SelectEffectFunc.createSelectImg(fighterData, selectEffect);
        fighterData.selectEff.startAnimFun(fighterData);
    };
    // 删除
    static dispose = (fighterData: FighterData) => {
        if (fighterData.selectEff !== undefined) {
            fighterData.selectEff.cancelAnimFun(fighterData);
            UINodeCtrl.removeNode(fighterData.selectEff.node);
            delete fighterData.selectEff;
        }
    };
    /**开始动画
     * @desc 根据判断是否在范围内, 振荡改变透明度
     * @param fighterData {object} 战斗者对象
     */
    static startAnim = (fighterData: FighterData) => {
        let selectEffData = fighterData.selectEff;

        if (selectEffData.nowOpacity >= 1) selectEffData.changeOptStep = -0.03;
        else if (selectEffData.nowOpacity <= 0.4) selectEffData.changeOptStep = 0.03;
        

        selectEffData.nowOpacity += selectEffData.changeOptStep;

        let opacity = new UIDataOpacity(selectEffData.nowOpacity);
        UINodeCtrl.updateNodeData( fighterData.selectEff.node, opacity );
        selectEffData.animIntervalId = setTimeout(()=> {
            fighterData.selectEff.startAnimFun(fighterData)
        }, 50);
    }
    /**取消动画 */
    static cancelAnim = (fighterData: FighterData) => {
        if (fighterData.selectEff && fighterData.selectEff.animIntervalId) {
            clearTimeout(fighterData.selectEff.animIntervalId);
        }
    }
}

// ========================================方法定义


// ========================================立即运行

const init = () => {
    selectImgJson = {
        nodeName: 'imgSelectEffect', nodeType: 'IMAGE', imageURL: '',
        width: 142, height: 540, left: 0, top: 0, z_relat: 0, opacity: 1
    };
}

init();