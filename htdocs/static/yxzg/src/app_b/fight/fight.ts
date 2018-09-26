/*
 * 用户登陆注册
 */

// ============================== 导入
import { globalSend, globalReceive } from "../../app/mod/pi";
import { data as locDB} from "../../app/mod/db";
import { CfgMgr } from "../../app/mod/cfg_mgr";
import { Util } from "../../app/mod/util";

import { addEvents, setShowListener } from "app/scene/scene_show";

import { FSmgr, FScene } from "fight/scene";
import { Policy } from "fight/policy";
import { Fighter,Card,Buff } from "fight/class";
import { Util as FUtil } from "fight/util";
import { blend } from "fight/analyze";
import { ShowFunList } from "./show";

//app_a
import { createFighter } from "app_a/user/user";

// =============================== 导出

export let mapList = {}

/**
 * @description 入口函数
 */
export const main = ():void => {
	FSmgr.scene.listener = fighterListener;
};

/**
 * @description 获取玩家信息
 */
export const getSelf = () => {
	return mySelf;
}


// ================================ 本地

/**
 * @description 自己
 */
let mySelf : Fighter;

const createMonster = (monster):void => {
	let m,b,mcfg;
	for(let j = 0,leng = monster.length;j<leng;j+=2){
		for(let i = 0,len = monster[j+1];i<len;i++){
			m = new Fighter();
			mcfg = CfgMgr.getOne("cfg/monster",monster[j]);
			m.sid = mcfg.id;
			m.type = "monster";
			m.name = mcfg.name;
			if(mcfg.hp_rang.length>1){
				m.hp = m.max_hp = mcfg.hp_rang[0]+Math.floor((mcfg.hp_rang[1]-mcfg.hp_rang[0]) * Math.random());
			}else{
				m.hp = m.max_hp = mcfg.hp_rang[0];
			}
			if(mcfg.buff_init.length){
				for(let n = 0,length = mcfg.buff_init.length;n<length;n++){
					b = CfgMgr.create(["cfg/buff"],mcfg.buff_init[n][0],Buff);
					if(mcfg.buff_init[n][1] && mcfg.buff_init[n][1].length){
						Util.fixObjAttrByArr(b,mcfg.buff_init[n][1]);
					}
					m.buff_list.push(b);
				}
			}
			let mcards = CfgMgr.getOne("cfg/card_group",mcfg.cards).slice(),s = mcfg.start,lf;
			if(!mcfg.start){
				FSmgr.useSeed(1,(r)=>{
					s = Math.floor(r*mcards.length);
				});
			}
			lf = mcards.splice(s-1);
			mcards = lf.concat(mcards);
			for(let mm = 0,leng = mcards.length;mm<leng;mm++){
				m.cards.push(FUtil.initCard(CfgMgr.create(["cfg/card_monster"],mcards[mm],Card),mm));
			}
			m.energy = m.max_energy = 3;
			m.camp = 0;
			m.x = -100;
			m.y = 100;
			m.ai = 1;
			m.cards_rest = 0;
			Policy.insert(m,FSmgr.scene)
		}
	}
	
}

/**
 * @description 战斗事件监听
 */
const fighterListener = (evs: any):void => {
	let list = blend(evs.events),i=0,len = list.length,e,f;
	if(evs.events.length)console.log("战斗事件：",list);
	for(; i<len; i++){
		e = list[i];
		if(e.type == "insert"){
			if(!mapList[e.fighter.id]){
				mapList[e.fighter.id] = Util.copy(e.fighter);
				mapList[e.fighter. id].cards_draw = Util.getObjsValueToArr(mapList[e.fighter.id].cards_draw,"index");
				if(e.fighter.sid == locDB.player.rid){
					mySelf = mapList[e.fighter.id];
				}
			}else{
				f = Util.copy(e.fighter);
				mapList[e.fighter.id].cards = f.cards;
				mapList[e.fighter.id].cards_hand = [];
				mapList[e.fighter.id].cards_scrap = [];
				mapList[e.fighter.id].cards_expend = [];
				mapList[e.fighter.id].cards_draw = [];
				mapList[e.fighter.id].hp = f.hp;
				mapList[e.fighter.id].max_hp = f.max_hp;
				mapList[e.fighter.id].energy = f.energy;
				mapList[e.fighter.id].field = f.field;
			}
		}
		if(e.events){
			e.events = blend(e.events);
		}
		addEvents(e);
	}
}

// ================================== 立即执行

//注册全局监听
globalReceive({
	"fight":(msg)=>{
		createFighter();
		createMonster(msg);
		FSmgr.start();
		ShowFunList.fightInit();
	},
	"fightMain":() => {
		main();
	}
});