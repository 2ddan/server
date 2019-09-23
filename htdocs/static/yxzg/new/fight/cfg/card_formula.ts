
/**
 * Card公式表
 */
// =================================== 导入
import { Formula } from "app/mod/formula";Formula.set("['cards_draw','cards_hand',0,0,0,1,1,0,0]",function(db, f, t, card, scene, buff,af){return ['cards_draw','cards_hand',0,0,0,1,1,0,0];});Formula.set("f.cards_hand_all>1",function(db, f, t, card, scene, buff,af){return f.cards_hand_all>1;});Formula.set("['cards_expend','cards_hand',0,1,0,0,1,0,0]",function(db, f, t, card, scene, buff,af){return ['cards_expend','cards_hand',0,1,0,0,1,0,0];});Formula.set("['cards_expend','cards_hand',0,1,0,0,1,0,0]",function(db, f, t, card, scene, buff,af){return ['cards_expend','cards_hand',0,1,0,0,1,0,0];});