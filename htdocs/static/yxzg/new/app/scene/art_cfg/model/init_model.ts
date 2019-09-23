// ========================================模块引入
import HeroModel from './hero_model';
import MonsterModel from './monster_model';
import DropModel from './drop_model';
import StageModel from './stage_model';
import EffectModel from './effect_model';


// ========================================数据结构
/**
 * 3D数据类型
 */
export type Obj3dData = {
    /**模型名称 */
    name: string;
    /**位置 */
    position: [number, number, number];
    /**缩放 */
    scale?: [number, number, number];
    /**旋转 */
    rotate?: [number, number, number];
    /**是否是2D相机看 */
    is2D?: boolean;
    /**动画 */
    playAnim: Anim3D;
    /**rid */
    rayID: number | string;
    /**朝向 */
    lookAt: [number, number ,number]
};
/**
 * 动画数据
 */
type Anim3D = {
    /**
     * 名字
     */
    name: string;
    /**
     * 是否是一次性动作
     */
    isOnce: boolean;
    /**
     * 速度
     */
    speed?: any;
    /**
     * id
     */
    id?: any;
};

// ========================================类定义

/**
 * @class 模型Json
 */
export class ModelJson {
    //=========================================================================
    //  人物
    //=========================================================================
    static hero = (data: Obj3dData) => {
        return ModelUtils.getHero(data);
    }
    
    //=========================================================================
    //  怪物
    //=========================================================================
    static monster = (data: Obj3dData) => {
        return ModelUtils.getMonster(data);
    }
    
    //=========================================================================
    //  地图
    //=========================================================================
    /**
     * 掉落
     */
    static drop = (data: Obj3dData) => {
        return ModelUtils.getDropModel(data);
    }
    /**
     * 关卡模型
     */
    static stage = (data: Obj3dData) => {
        return ModelUtils.getStageModel(data);
    }
    
    //=========================================================================
    //  特效
    //=========================================================================
    static effect = (data: any) => {
        return ModelUtils.getEffectModel(data);
    };
    
}

class ModelUtils {
    /**
     * 获取英雄模型
     */
    static getHero = (data: Obj3dData) => {
        const modelCfg = JSON.parse(JSON.stringify(HeroModel[data.name]));

        modelCfg.controller = HeroModel.ainMod[modelCfg.aniControl];
        modelCfg.position   = data.position;
        modelCfg.scale      = data.scale;
        modelCfg.rotate     = data.rotate;
        modelCfg.playAnim   = data.playAnim;
        modelCfg.rayID      = data.rayID;
        modelCfg.is2D       = data.is2D
        modelCfg.lookAtOnce = {
            "value": data.lookAt || [1,1,1],
            "sign" : Math.random() * 10
        };

        return modelCfg;
    }

    /**
     * 获取怪物模型
     */
    static getMonster = (data: Obj3dData) => {
        let modelCfg: any = JSON.parse(JSON.stringify(MonsterModel[data.name]));

        modelCfg.controller = MonsterModel.ainMod[modelCfg.aniControl];
        modelCfg.position   = data.position;
        modelCfg.scale      = data.scale;
        modelCfg.rotate     = data.rotate;
        modelCfg.playAnim   = data.playAnim;
        modelCfg.rayID      = data.rayID;
        modelCfg.is2D       = data.is2D
        modelCfg.lookAtOnce = {
            "value": data.lookAt || [0,0,0],
            "sign" : Math.random() * 10
        };

        return modelCfg;
    }

    /**
     * 获取掉落模型
     */
    static getDropModel = (data: Obj3dData)=>{
        let modelCfg: any;

        modelCfg          = JSON.parse(JSON.stringify(DropModel[data.name]));
        modelCfg.position = data.position;
        modelCfg.rotate   = data.rotate;
        modelCfg.rayID    = data.rayID;

        return modelCfg;
    }

    /**
     * 获取关卡模型
     */
    static getStageModel = (data: Obj3dData)=>{
        let modelCfg: any;

        modelCfg          = JSON.parse(JSON.stringify(StageModel[data.name]));
        modelCfg.position = data.position;
        modelCfg.rotate   = data.rotate;
        modelCfg.rayID    = data.rayID;

        return modelCfg;
    }

    /**
     * 获取特效模型
     */
    static getEffectModel = (data: any) => {
        let modelCfg: any = {};

        modelCfg.position   = data.position;
        modelCfg.playAnim   = data.playAnim;
        modelCfg.rayID      = data.rayID;
        modelCfg.scale      = data.scale;
        modelCfg.rotate     = data.rotate;
        modelCfg.customData = data.customData;
        modelCfg.tpl        = EffectModel[data.effectName][0];

        return modelCfg;
    };
}