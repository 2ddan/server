/*
 * 用户登陆注册
 */

// ============================== 导入
import { CfgMgr } from "app/mod/cfg_mgr";
import { insert, updata, data as localDB, listen } from "app/mod/db";
import { DBback } from "app/mod/db_back";
import { globalSend, globalReceive } from "app/mod/pi";

import { FSmgr } from "fight/scene";
import { Fighter,Card } from "fight/class";
import { Util as FUtil } from "fight/util";
import { Policy } from "fight/policy";

import { UINodeCtrl, recordUIJson, Z_ORDERS, UIListenCfg } from "app/scene/uiNode";

// =============================== 导出
/**
 * @description 游戏进入选择英雄界面
 */
export const main = () => {
	sendOcc();
};
/**
 * @description 创建fighter
 */

export const createFighter = ():void => {
	let f = new Fighter(),
		occ = localDB.player.occupation,
		occ_cfg = CfgMgr.getOne("cfg/occupation",occ),
		cards = localDB.cards;
	f.type = "fighter";
	f.name = "玩家";
	f.occupation = occ;
	f.occ_name = occ_cfg.name;
	f.occ_name_en = occ_cfg.name_en;
	f.camp = 1;
	f.x = 100;
	f.y = 100;
	f.sid = localDB.player.rid;
	f.hp = localDB.player.hp;
	f.max_hp = localDB.player.max_hp;
	f.energy = f.max_energy = 3;
	f.money = localDB.player.money;
	f.cards_hand = [];
	f.field = localDB.player.field;
	for(let i =0,len = cards.length;i<len;i++){
		f.cards.push(FUtil.initCard(CfgMgr.create(["cfg/card",`cfg/card_${occ_cfg.name_en}`],cards[i][0]+""+cards[i][1],Card),i));
		// m.cards.push(initCard(CfgMgr.create("cfg/card",cards[i][0]+""+cards[i][1],Card),i));
	}
	Policy.insert(f,FSmgr.scene,true);
 };
// ================================ 本地
let frame,frameClass = "occ";
/**
 * @description 选择英雄
 * @param id 职业id
 */
const selectOcc = (id) => {
	console.log(id);
	let occ_cfg = CfgMgr.getOne("cfg/occupation",id);
	updata("player.hp",occ_cfg.hp);
	updata("player.max_hp",occ_cfg.hp);
	updata("player.money",occ_cfg.money);
	updata("player.occupation",id);
	initCardDB(id);
	UINodeCtrl.removeNode( frame );
	frame = undefined;
	sendOcc();
}
const open = () => {
	initFrame();
	openUser();
}
/**
 * @description 打开选择英雄界面
 */
const openUser = () => {
	frame = UINodeCtrl.openFrame( {
		frameClass: frameClass, 
		nodeName:   "occ_select", 
		jsonNew:    undefined, 
		data:       {}
	} );
	UINodeCtrl.setFrameNodeListener(frame,"occ1", new UIListenCfg( "up", ()=>{selectOcc(1)} ) );
}
/**
 * @description 初始化选择英雄界面
 */
const initFrame = () => {
	let frameJson = {
		nodeName:    frameClass,
		nodeType:    "FRAME",
		width:   100, 
		height:  100,
		left:    500,    
		top:     200,
		z:       Z_ORDERS.MAIN,
		z_relat: 0,
		nodes: [
		],
		design: {
		},
		states: {
		},
		dataMatch: {   
		}
	},
	cfg = CfgMgr.get("cfg/occupation");

	for(let k in cfg){
		frameJson.nodes.push({ nodeName: "occ"+cfg[k][0], nodeType: "COLOR", bgColor: "#cccccc", width: 100, height: 100, left: (cfg[k][0]-1)*105, top: 0, z_relat: 0, opacity: 1  });
		frameJson.nodes.push({ nodeName: `occ${cfg[k][0]}_name`,   nodeType: "TEXT", text: cfg[k][1],left: (cfg[k][0]-1)*105+20, top: 40,font: `normal normal ${18}px mnjsh`, lineHeight: 72,font_space: -2,color: "#000000", align: "center",shadow_width: 1,shadow_color: "#000000", isCommon: false, z_relat: 1 });
		frameJson.design["occ"+cfg[k][0]] = true;
		frameJson.design[`occ${cfg[k][0]}_name`] = true;
	}
	recordUIJson( frameClass, frameJson );
}

/**
 * @description 初始化职业卡牌，测试用
 * @param id 
 */
const initCardDB = (id?) => {
	let occ = CfgMgr.getOne("cfg/occupation",id||"1"),
		r = [];
	for(let i = 0,len = occ.cards.length;i<len;i++){
		let c = occ.cards[i];
		for(let j = 0;j<c[0];j++){
			r.push([c[1],1]);
		}
	}
	updata("cards",r);
	DBback.save("cards",r);
}
const initscene = () => {
	FSmgr.create(localDB.player.seed);
	globalSend("fightMain");
	createFighter();
	FSmgr.run();
	console.log("initscene ===============");
}
/**
 * @description 初始化后台数据
 */
const initDB = (data) => {
	if(data){
			for(let k in data){
			updata("player."+k,data[k]);
		}
	}
	sendOcc();
}
/**
 * @description 初始化卡牌后台数据
 */
const initCardBack = (data) => {
	if(data){
		updata("cards",data);
	}
	console.log("send selectOcc~~~");
	sendOcc();
}
const sendOcc = (()=>{
	let s = 2;
	return ()=>{
		if(s<=0){
			if(localDB.player.occupation){
				initscene();
				globalSend("selectOcc");
			}else{
				open();
			}
			globalSend( "openPlayerMenu" );
		}
		s--;
	}
})();
// ================================== 立即执行
/**
 * @description 初始化数据库字段
 */
insert("player",{
	"rid":10000,
	"name":"",
	"hp": 0,
	"max_hp": 0,
	"occupation":0, //职业
	"seed": 0, //随机数
	"field":0 //战斗场次
});
insert("cards",[]);
/**
 * @description 监听前台数据库
 */
listen("player",() => {
	DBback.save("player",localDB.player);
})
listen("cards",() => {
	DBback.save("cards",localDB.cards);
})
/**
 * @description 监听后台数据
 */
DBback.listenBack("player",initDB);
DBback.listenBack("cards",initCardBack);
/**
 * @description 设置全局监听
 */
globalReceive({
	"fail":()=>{
		updata("player.occupation",0);
		updata("player.field",0);
		open();
	}
});