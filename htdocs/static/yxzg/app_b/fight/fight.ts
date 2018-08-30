/*
 * 用户登陆注册
 */

// ============================== 导入
import { globalSend, globalReceive } from "../../app/mod/pi";
import { data as locDB} from "../../app/mod/db";
import { CfgMgr } from "../../app/mod/cfg_mgr";
import { Util } from "../../app/mod/util";

import { addEvents, setShowListener } from "app/scene/scene_show";

import { FSmgr } from "fight/scene";

import { Fighter,Card,Buff } from "fight/class";
import { blend } from "fight/analyze";
import { ShowFunList } from "./show";

// =============================== 导出

export let mapList = {}

/**
 * @description 入口函数
 */
export const main = ():void => {
	FSmgr.create();
	FSmgr.scene.overBack = overBack;
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
/**
 * @description 创建fighter
 */

 const createFighter = ():void => {
	let f = new Fighter(),
		occ = locDB.player.occupation,
		occ_cfg = CfgMgr.getOne("cfg/occupation",occ),
		cards = locDB.cards;
	f.type = "fighter";
	f.name = "玩家";
	f.occupation = occ;
	f.occ_name = occ_cfg.name;
	f.occ_name_en = occ_cfg.name_en;
	f.camp = 1;
	f.x = 100;
	f.y = 100;
	f.sid = locDB.player.rid;
	f.hp = f.max_hp = occ_cfg.hp;
	f.energy = f.max_energy = 3;
	f.money = occ_cfg.money;
	f.cards_hand = [];
	for(let i =0,len = cards.length;i<len;i++){
		f.cards.push(initCard(CfgMgr.create(["cfg/card",`cfg/card_${occ_cfg.name_en}`],cards[i][0]+""+cards[i][1],Card),i));
		// m.cards.push(initCard(CfgMgr.create("cfg/card",cards[i][0]+""+cards[i][1],Card),i));
	}
	FSmgr.scene.insert(f,true);
 };
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
			let mcards = CfgMgr.getOne("cfg/card_group",mcfg.cards).slice();
			if(!mcfg.start){
				FSmgr.scene.seed = Util.randomSort(mcards,FSmgr.scene.seed);
			}
			for(let j = 0,leng = mcards.length;j<leng;j++){
				m.cards.push(initCard(CfgMgr.create(["cfg/card_monster"],mcards[j],Card),j));
			}
			m.energy = m.max_energy = 3;
			m.camp = 2;
			m.x = -100;
			m.y = 100;
			m.ai = 1;
			FSmgr.scene.insert(m);
		}
	}
	
}
/**
 * @description 初始化卡牌
 */
const initCard = (c:any,index:number):Card => {
	let b;
	c.index = index;

	for(let j = 0,leng = c.buffs.length;j<leng;j++){
		b = c.buffs[j];
	}
	//TODO...初始化卡牌自身的buff
	//.....

	return c;
};

/**
 * @description 监听战斗结束
 * @param 1表示左边胜利，2表示右边胜利 , 3表示超时
 */
const overBack = (r:{}) => {
	console.log("战斗结束：",r);
	// FSmgr.scene.setPause(true);
	FSmgr.reset();
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
			}
		}
		addEvents(e);
	}
}

// ================================== 立即执行

//注册全局监听
globalReceive({
	"fight":(msg)=>{
		main();
		createFighter();
		createMonster(msg);
		ShowFunList.fightInit();
		FSmgr.start();
    }
});