// ========================================= 导入
//pi

//fight
import { EType } from "fight/a/analyze"
//scene

//app
import { net_request } from "app_a/connect/main";

import { handScene } from "./handscene";

// ========================================= 导出
export const Net = {};

Net[EType.useSkill] = (param,callback?) => {
    olFightOrder(param,callback);
}
Net[EType.moveto] = (param,callback?) => {
    olFightOrder(param,callback);
}
// ======================================== 本地
/**
 * @description 向后台发送战斗指令
 * @param {Json}param {type:"move",mapId:fighter.mapId,pos:Pos,old:Pos} => 移动
 * 					  {type:"useSkill",mapId:0,skill_id:10002,curtarget:1,pos:[]} => 手动释放技能
 * @param {Function}callback 通讯回调执行
 */
const olFightOrder = (param,callback?)=>{
	let msg = {type:"app/same_fight@accept_fight_order",param:{result:JSON.stringify(param)}};
	net_request(msg,(data)=>{
		// console.log(msg,data);
		callback && callback(data);
	});
};
// ================================= 立即执行
