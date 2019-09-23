// 其它
import { eff_kexuan_rtpl } from './eff_kexuan_rtpl';
import { eff_xuanzhong_rtpl } from './eff_xuanzhong_rtpl';
import { eff_common_addhp_rtpl } from './eff_common_addhp_rtpl';
import { eff_ui_money_rtpl } from './eff_ui_money_rtpl';
import { model_shadow_rtpl } from './model_shadow_rtpl';
import { eff_common_cardattack01_rtpl } from './eff_common_cardattack01_rtpl';
import { eff_ui_item_rtpl } from './eff_ui_item_rtpl';
import { eff_common_appearmonster01_rtpl } from './eff_common_appearmonster01_rtpl';
import { eff_ui_taozhuangjihuo_rtpl} from './eff_ui_taozhuangjihuo_rtpl';
import { eff_ui_zhuangbeishengxiao_rtpl } from './eff_ui_zhuangbeishengxiao_rtpl';
import { eff_ui_skillcd01_rtpl } from './eff_ui_skillcd01_rtpl';
import { eff_ui_skillcd02_rtpl } from './eff_ui_skillcd02_rtpl'; 

// 意图
import { eff_yt_bm01_rtpl } from './eff_yt_bm01_rtpl';
import { eff_yt_db01_rtpl } from './eff_yt_db01_rtpl';
import { eff_yt_db02_rtpl } from './eff_yt_db02_rtpl';
import { eff_yt_gd01_rtpl } from './eff_yt_gd01_rtpl';
import { eff_yt_gdqh01_rtpl } from './eff_yt_gdqh01_rtpl';
import { eff_yt_gj01_rtpl } from './eff_yt_gj01_rtpl';
import { eff_yt_gj02_rtpl } from './eff_yt_gj02_rtpl';
import { eff_yt_gj03_rtpl } from './eff_yt_gj03_rtpl';
import { eff_yt_gj04_rtpl } from './eff_yt_gj04_rtpl';
import { eff_yt_gjdb01_rtpl } from './eff_yt_gjdb01_rtpl';
import { eff_yt_gjdb02_rtpl } from './eff_yt_gjdb02_rtpl';
import { eff_yt_gjdb03_rtpl } from './eff_yt_gjdb03_rtpl';
import { eff_yt_gjdb04_rtpl } from './eff_yt_gjdb04_rtpl';
import { eff_yt_gjgd01_rtpl } from './eff_yt_gjgd01_rtpl';
import { eff_yt_gjgd02_rtpl } from './eff_yt_gjgd02_rtpl';
import { eff_yt_gjgd03_rtpl } from './eff_yt_gjgd03_rtpl';
import { eff_yt_gjgd04_rtpl } from './eff_yt_gjgd04_rtpl';
import { eff_yt_jh01_rtpl } from './eff_yt_jh01_rtpl';
import { eff_yt_mg01_rtpl } from './eff_yt_mg01_rtpl';
import { eff_yt_mgdb01_rtpl } from './eff_yt_mgdb01_rtpl';
import { eff_yt_mggd01_rtpl } from './eff_yt_mggd01_rtpl';
import { eff_yt_qh01_rtpl } from './eff_yt_qh01_rtpl';
import { eff_yt_sm01_rtpl } from './eff_yt_sm01_rtpl';
import { eff_yt_xy01_rtpl } from './eff_yt_xy01_rtpl';

// 主城

// 卡牌菜单
import { eff_ui_feiyongchar001_rtpl } from './eff_ui_feiyongchar001_rtpl';
import { eff_ui_jieshuhuihe_rtpl } from './eff_ui_jieshuhuihe_rtpl';

// 卡牌
import { eff_ui_qipai_rtpl } from './eff_ui_qipai_rtpl';
import { eff_ui_xiaohaopai_rtpl } from './eff_ui_xiaohaopai_rtpl';
import { eff_ui_yichupai_rtpl } from './eff_ui_yichupai_rtpl';
import { eff_ui_kapaishengji_rtpl } from './eff_ui_kapaishengji_rtpl';

// 人物
import { eff_common_hurt_rtpl } from './eff_common_hurt_rtpl';
import { eff_char_001_attack_rtpl } from './eff_char_001_attack_rtpl';
import { eff_char_001_hurt_rtpl } from './eff_char_001_hurt_rtpl';
import { eff_char_002_hurt_rtpl } from './eff_char_002_hurt_rtpl';
import { eff_char_002_attack_rtpl } from './eff_char_002_attack_rtpl';
import { eff_common_gedangright01_rtpl } from './eff_common_gedangright01_rtpl';
import { eff_common_gedangright02_rtpl } from './eff_common_gedangright02_rtpl';

// 怪物
import { effect_monster_017_attack_rtpl } from './effect_monster_017_attack_rtpl';


/**
 * 特效模型
 */
export const EffectRTPL = {
    //=========================================================================
    //  其它
    //=========================================================================
    "eff_kexuan": (it: any) => {
        return eff_kexuan_rtpl(it);
    },
    "eff_xuanzhong": (it: any) => {
        return eff_xuanzhong_rtpl(it);
    },
    "eff_common_addhp": (it: any) => {
        return eff_common_addhp_rtpl(it);
    },
    "eff_ui_money": (it: any) => {
        return eff_ui_money_rtpl(it);
    },
    "model_shadow": (it: any) => {
        return model_shadow_rtpl(it);
    },
    "eff_common_cardattack01": (it: any) => {
        return eff_common_cardattack01_rtpl(it);
    },
    "eff_ui_item": (it: any) => {
        return eff_ui_item_rtpl(it);
    },
    "eff_common_appearmonster01": (it: any) => {
        return eff_common_appearmonster01_rtpl(it);
    },
    "eff_ui_taozhuangjihuo":(it: any) => {
        return eff_ui_taozhuangjihuo_rtpl(it);
    }, 
    "eff_ui_zhuangbeishengxiao":(it: any) => {
        return eff_ui_zhuangbeishengxiao_rtpl(it); 
    },

    //=========================================================================
    //  意图
    //=========================================================================
    "eff_yt_bm01": (it: any) => {
        return eff_yt_bm01_rtpl(it);
    },
    "eff_yt_db01": (it: any) => {
        return eff_yt_db01_rtpl(it);
    },
    "eff_yt_db02": (it: any) => {
        return eff_yt_db02_rtpl(it);
    },
    "eff_yt_gd01": (it: any) => {
        return eff_yt_gd01_rtpl(it);
    },
    "eff_yt_gdqh01": (it: any) => {
        return eff_yt_gdqh01_rtpl(it);
    },
    "eff_yt_gj01": (it: any) => {
        return eff_yt_gj01_rtpl(it);
    },
    "eff_yt_gj02": (it: any) => {
        return eff_yt_gj02_rtpl(it);
    },
    "eff_yt_gj03": (it: any) => {
        return eff_yt_gj03_rtpl(it);
    },
    "eff_yt_gj04": (it: any) => {
        return eff_yt_gj04_rtpl(it);
    },
    "eff_yt_gjdb01": (it: any) => {
        return eff_yt_gjdb01_rtpl(it);
    },
    "eff_yt_gjdb02": (it: any) => {
        return eff_yt_gjdb02_rtpl(it);
    },
    "eff_yt_gjdb03": (it: any) => {
        return eff_yt_gjdb03_rtpl(it);
    },
    "eff_yt_gjdb04": (it: any) => {
        return eff_yt_gjdb04_rtpl(it);
    },
    "eff_yt_gjgd01": (it: any) => {
        return eff_yt_gjgd01_rtpl(it);
    },
    "eff_yt_gjgd02": (it: any) => {
        return eff_yt_gjgd02_rtpl(it);
    },
    "eff_yt_gjgd03": (it: any) => {
        return eff_yt_gjgd03_rtpl(it);
    },
    "eff_yt_gjgd04": (it: any) => {
        return eff_yt_gjgd04_rtpl(it);
    },
    "eff_yt_jh01": (it: any) => {
        return eff_yt_jh01_rtpl(it);
    },
    "eff_yt_mg01": (it: any) => {
        return eff_yt_mg01_rtpl(it);
    },
    "eff_yt_mgdb01": (it: any) => {
        return eff_yt_mgdb01_rtpl(it);
    },
    "eff_yt_mggd01": (it: any) => {
        return eff_yt_mggd01_rtpl(it);
    },
    "eff_yt_qh01": (it: any) => {
        return eff_yt_qh01_rtpl(it);
    },
    "eff_yt_sm01": (it: any) => {
        return eff_yt_sm01_rtpl(it);
    },
    "eff_yt_xy01": (it: any) => {
        return eff_yt_xy01_rtpl(it);
    },

    //=========================================================================
    //  主城
    //=========================================================================

    //=========================================================================
    //  卡牌菜单
    //=========================================================================
    "eff_ui_feiyongchar001": (it: any) => {
        return eff_ui_feiyongchar001_rtpl(it);
    },
    "eff_ui_jieshuhuihe": (it: any) => {
        return eff_ui_jieshuhuihe_rtpl(it);
    },
    "eff_ui_skillcd01":(it: any) => {
        return eff_ui_skillcd01_rtpl(it);
    },
    "eff_ui_skillcd02":(it: any) => {
        return eff_ui_skillcd02_rtpl(it); 
    },

    //=========================================================================
    //  卡牌
    //=========================================================================
    "eff_ui_qipai": (it: any) => {
        return eff_ui_qipai_rtpl(it);
    },
    "eff_ui_xiaohaopai": (it: any) => {
        return eff_ui_xiaohaopai_rtpl(it);
    },
    "eff_ui_yichupai": (it: any) => {
        return eff_ui_yichupai_rtpl(it);
    },
    "eff_ui_kapaishengji": (it: any) => {
        return eff_ui_kapaishengji_rtpl(it);
    },

    //=========================================================================
    //  人物
    //=========================================================================
    "eff_common_hurt": (it: any) => {
        return eff_common_hurt_rtpl(it);
    },
    "eff_char_001_attack": (it: any) => {
        return eff_char_001_attack_rtpl(it);
    },
    "eff_char_001_hurt": (it: any) => {
        return eff_char_001_hurt_rtpl(it);
    },
    "eff_char_002_hurt": (it: any) => {
        return eff_char_002_hurt_rtpl(it);
    },
    "eff_char_002_attack": (it: any) => {
        return eff_char_002_attack_rtpl(it);
    },
    "eff_common_gedangright01": (it: any) => {
        return eff_common_gedangright01_rtpl(it);
    },
    "eff_common_gedangright02": (it: any) => {
        return eff_common_gedangright02_rtpl(it);
    },

    //=========================================================================
    //  怪物
    //=========================================================================
    "effect_monster_017_attack": (it: any) => {
        return effect_monster_017_attack_rtpl(it);
    },
};