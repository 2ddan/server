/**
 * 战斗公式
 */
// =================================== 导入
import { Buff } from "../class";
// ===================================== 导出
export const buffCfg = {
    "10001":class Buff10001 extends Buff{
        constructor(){
            super();
            this.id = 10001;
            this.name = "力量";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "strength";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10002":class Buff10002 extends Buff{
        constructor(){
            super();
            this.id = 10002;
            this.name = "敏捷";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "agility";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10003":class Buff10003 extends Buff{
        constructor(){
            super();
            this.id = 10003;
            this.name = "智力";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "brain";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10004":class Buff10004 extends Buff{
        constructor(){
            super();
            this.id = 10004;
            this.name = "速度";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "speed";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10005":class Buff10005 extends Buff{
        constructor(){
            super();
            this.id = 10005;
            this.name = "临时力量";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "strength";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 1;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10006":class Buff10006 extends Buff{
        constructor(){
            super();
            this.id = 10006;
            this.name = "临时敏捷";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "agility";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 1;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10007":class Buff10007 extends Buff{
        constructor(){
            super();
            this.id = 10007;
            this.name = "临时智力";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "brain";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 1;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10008":class Buff10008 extends Buff{
        constructor(){
            super();
            this.id = 10008;
            this.name = "临时速度";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "speed";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 1;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10009":class Buff10009 extends Buff{
        constructor(){
            super();
            this.id = 10009;
            this.name = "虚弱";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "un_attack";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0.25;
            };
            this.trigger_excitation = 3;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 1;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10010":class Buff10010 extends Buff{
        constructor(){
            super();
            this.id = 10010;
            this.name = "易伤";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "vulnerability";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0.5;
            };
            this.trigger_excitation = 3;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 1;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10011":class Buff10011 extends Buff{
        constructor(){
            super();
            this.id = 10011;
            this.name = "脆弱";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "un_block";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0.25;
            };
            this.trigger_excitation = 3;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 1;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10012":class Buff10012 extends Buff{
        constructor(){
            super();
            this.id = 10012;
            this.name = "抽卡";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "take_cards";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10013":class Buff10013 extends Buff{
        constructor(){
            super();
            this.id = 10013;
            this.name = "换卡";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "scrap_cards";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 0;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10014":class Buff10014 extends Buff{
        constructor(){
            super();
            this.id = 10014;
            this.name = "韧性";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "artifact";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return 0;
            };
            this.trigger_excitation = 5;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 2;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10015":class Buff10015 extends Buff{
        constructor(){
            super();
            this.id = 10015;
            this.name = "再生";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "hp";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return buff.continue_round;
            };
            this.trigger_excitation = 8;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 1;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    },
    "10016":class Buff10016 extends Buff{
        constructor(){
            super();
            this.id = 10016;
            this.name = "中毒";
            this.probability = 1;
            this.trigger_add = 2;
            this.effect_type = "damage_true";
            this.effect_formula = function(Max, Min, Pow, F, T, Card,buff,AF){
                return buff.continue_round;
            };
            this.trigger_excitation = 8;
            this.condition = function(Max, Min, Pow, F, T, Card,buff,AF){
                return true;
            };;
            this.effectiv_target = "F";
            this.excitationMaxCount = 0;
            this.continue_round = 0;
            this.effective_life = 0;
            this.cover_rule = 1;
            this.effect_rule = undefined;
            this.music = undefined;
        }
    }
}

// ================================= 本地
