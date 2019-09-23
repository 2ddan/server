// ========================================模块引入
import { sceneMgr } from './scene';

// ========================================常量定义

// ========================================类型定义
type EffectName = 
    //=========================================================================
    //  其它
    //=========================================================================
    'eff_kexuan' |
    'eff_xuanzhong' |
    'eff_common_addhp' |
    'eff_ui_money' |
    'model_shadow' |
    'eff_common_cardattack01' |
    'eff_ui_item' |
    'eff_common_appearmonster01' |
    'eff_ui_taozhuangjihuo'|
    'eff_ui_zhuangbeishengxiao'| 
    'eff_ui_skillcd01' |
    'eff_ui_skillcd02' | 

    //=========================================================================
    //  意图
    //=========================================================================
    'eff_yt_gj01' |
    'eff_yt_gj02' |
    'eff_yt_gj03' |
    'eff_yt_gj04' |
    'eff_yt_mg01' |
    'eff_yt_gd01' |
    'eff_yt_qh01' |
    'eff_yt_db01' |
    'eff_yt_db02' |
    'eff_yt_bm01' |
    'eff_yt_sm01' |
    'eff_yt_jh01' |
    'eff_yt_xy01' |
    'eff_yt_gjdb01' |
    'eff_yt_gjdb02' |
    'eff_yt_gjdb03' |
    'eff_yt_gjdb04' |
    'eff_yt_mgdb01' |
    'eff_yt_gjgd01' |
    'eff_yt_gjgd02' |
    'eff_yt_gjgd03' |
    'eff_yt_gjgd04' |
    'eff_yt_mggd01' |
    'eff_yt_gdqh01' |

    //=========================================================================
    //  主城
    //=========================================================================

    //=========================================================================
    //  卡牌菜单
    //=========================================================================
    'eff_ui_feiyongchar001' |
    'eff_ui_jieshuhuihe' |

    //=========================================================================
    //  卡牌
    //=========================================================================
    'eff_ui_qipai' |
    'eff_ui_xiaohaopai' |
    'eff_ui_yichupai' |
    'eff_ui_kapaishengji' |

    //=========================================================================
    //  人物
    //=========================================================================
    'eff_common_hurt' |
    'eff_char_001_hurt' |
    'eff_char_002_hurt' |
    'eff_char_002_attack' |
    'eff_common_gedangright01' |
    'eff_common_gedangright02'
    
    //=========================================================================
    //  怪物
    //=========================================================================
;

/**
 * 场景类型 effScene特效场景在GUI上面
 */
type TSceneType = 'curScene' | 'effScene';

// ========================================导出接口

// ========================================数据结构
interface IEffectCfg {
    pos?: number[],
    scale?: number[],
    rotate?: number[],
    isOnce?: boolean;
    animName?: string;
}

// ========================================变量声明
let effectCount:number = 0;
/**
 * @description 意图动作
 */
export const EffectAction = {
    "eff_yt_gj01":{
        "loop":"eff_yt_gj01",
        "trigger":"eff_yt_cf01"
    },
"eff_yt_gj02":{
    "loop":"eff_yt_gj02",
    "trigger":"eff_yt_cf01"
},
"eff_yt_gj03":{
    "loop":"eff_yt_gj03",
    "trigger":"eff_yt_cf01"
},
"eff_yt_gj04":{
    "loop":"eff_yt_gj04",
    "trigger":"eff_yt_cf01"
},
"eff_yt_mg01":{
    "loop":"eff_yt_mg01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_gd01":{
    "loop":"eff_yt_gd01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_qh01":{
    "loop":"eff_yt_qh01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_db01":{
    "loop":"eff_yt_db01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_db02":{
    "loop":"eff_yt_db02",
    "trigger":"eff_yt_cf01"
},
"eff_yt_bm01":{
    "loop":"eff_yt_bm01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_sm01":{
    "loop":"eff_yt_sm01",
    "trigger":"eff_yt_sm01"
},
"eff_yt_jh01":{
    "loop":"eff_yt_jh01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_xy01":{
    "loop":"eff_yt_xy01",
    "trigger":"eff_yt_cf01"
},
"eff_yt_gjdb01":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjdb02":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjdb03":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjdb04":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_mgdb01":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjgd01":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjgd02":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjgd03":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gjgd04":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_mggd01":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
},
"eff_yt_gdqh01":{
    "loop":"eff_yt_fuheyitu01",
    "trigger":"eff_yt_cf02"
}
}

// ========================================类定义
export class Effect {
    static increaseEffID = () => {
        return effectCount++;
    };

    /**
     * 3D场景中的特效
     * @param name 特效名称
     * @param effCfg 特效配置
     * @param callback 回调
     * @param sceneType 场景类型
     * @param parent 父节点
     * @param customData 自定义数据
     */
    static baseEffect = (name: EffectName, effCfg: IEffectCfg = {}, callback?: Function, sceneType: TSceneType = 'curScene', parent?: any, customData = {}, rayID: number = Effect.increaseEffID()) => {

        const isOnce = effCfg.isOnce;
        const animName = effCfg.animName;
        const pos = effCfg.pos;
        const scale = effCfg.scale;
        const rotate = effCfg.rotate;

        let eff = {
            type      : 'effect', 
            effectName: name,
            rayID     : rayID,
            position  : pos    ? [pos[0],    pos[1],    pos[2]]    : null,
            scale     : scale  ? [scale[0],  scale[1],  scale[2]]  : null,
            rotate    : rotate ? [rotate[0], rotate[1], rotate[2]] : null,
            customData : customData,
            playAnim: { 
                name: animName || name, 
                isOnce: isOnce ? true : false,
                id: () => {
                    console.log("is once effect");
                    callback && callback();
                }
            }
        };

        sceneMgr[sceneType].create(eff, eff.type, parent);

        return eff;
    }
    
    /**
     * 移除3D场景的特效
     * @param eff 特效模型
     * @param sceneType 场景类型
     */
    static removeEffect(eff: any, sceneType: TSceneType = 'curScene'){
        sceneMgr[sceneType].remove(eff);
    }
}
// ========================================方法定义

// ========================================立即运行
