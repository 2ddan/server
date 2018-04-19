import { data as localDB, updata, get as getDB, listen } from "app/mod/db";
import * as Fight from "fight/a/common/fight";
import { mgr, mgr_data } from "app/scene/scene";

export class Fight_common {
	//创建目标点特效
	static createDest(x, y, fightScene, id?) {
		id = id || 0;
		let fm = Fight.createOtherEffect("eff_sce_dianji", id, true);
		fm.x = x;
		fm.y = y;
		fm.z = 0;
		mgr.create(fm, "effect");

		return fm;
	};

   	/**
	 * @description 该模型的动作对象
	 * @param anim ：动作名字
	 * @param isOnce:默认是true(持续性动作)，另一个值是false（一次性动画）
	 * @param speed:速度
	 */
	static playAnim(anim: string, id: number, isOnce?: boolean, speed?: number) {
		return {
			"name": anim,
			"id": id,
			"isOnce": isOnce || false,
			"speed": speed || 1,
			"time" : new Date().getTime()
		}
	};
	//获取剩余血量
	static getLeftHp(fightScene) {
		let arr = { own: [], enemy: [] };
		for (let i = 0, len = fightScene.fighters.length; i < len; i++) {
			let f = fightScene.fighters[i];
			if (f.type != "treasure") {
				arr[f.camp == 1 ? "own" : "enemy"].push({
					sid: f.sid,
					hp: f.hp,
					maxHp: f.max_hpCount
				});
			}
		}
		return arr;
	};
	/**
	 * @description 根据记录的技能释放时间判断当前技能释放动作
	 * @param {Array}stime 技能释放时间表，最后一位为当前技能释放时间
	 * @param {Array}actions 技能动作列表，存放的是技能动作名字
	 * @param {Number}during 释放时间间隔，超过则使用第一个动作
	 */
	static chooseAction(stime,actions,during){
		let idx = 0,
			sl = stime.length-1;
		for(let i = 0,len = actions.length;i<len;i++){
			if(stime[sl]-stime[sl-1] <= during){
				idx += 1;
				sl -= 1; 
			}else break;
		}
		return actions[idx];
	}
}