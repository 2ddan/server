/**
 * 怪物初始力量公式表
 */
// =================================== 导入
import { Formula } from "app/mod/formula";

Formula.set('monster_strength',
function(floor)
{return Math.max(Math.ceil(floor/10),1);});