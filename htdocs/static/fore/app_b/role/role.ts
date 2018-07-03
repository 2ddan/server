/**
 * @description 
 */
// ============================== 导入
//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";

//mod
import { globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { data as localDB,listen ,updata} from "app/mod/db"
import { resetcanvas } from "app/scene/base/scene";

//fight
import { role_base } from "fight/b/common/role_base";

//menu
import { menu_role_menu } from "cfg/b/menu_role_menu";
import { clothes_module } from "cfg/b/clothes_module";

// ======================================= 导出
/**
 * @description  导出forelet
 */
export const forelet = new Forelet();
/**
 * @description  设置广播消息接收接口
 */
export const globalReceive :any = {
	/**
	 * @description 进入主城
	 */
	gotoRole:()=>{
		forelet.paint(getData());
		open("app_b-role-role");
		//return "app_b-role-role"
	} ,
	magicClosed: ()=>{
		reset();
	}
}

//重绘
let reset = function(){
	let w = forelet.getWidget("app_b-role-role");
	if(!w){return;}
	let data : any;
	for(let i=0;i<w.children.length;i++){
		if(w.children[i].name == "app-scene-base-scene"){
			data = w.children[i];
			break;
		}
	}
	resetcanvas(data);
}
/**
 * @description  导出组件
 */
export class RoleWidget extends Widget {
	// attach () {
	// 	let player = localDB.player;
	// 	let friend_battle = localDB.friend_battle;
	// 	let _module = role_base[player.career_id].module;
	// 	let weapon= friend_battle.equip_set[0];
	// 	let _index = weapon?weapon.career_id.indexOf(player.career_id):null;
	// 	let m = weapon?weapon.module[_index]:null;
	// 	let weapon_m = null;
	// 	let w_eff = null;
	// 	if(weapon){
	// 		weapon_m = m[1];
	// 	}
	// 	if(m && m.length > 2){
	// 		w_eff = m.slice(2);
	// 	}
	// 	let node = {};
	// 	node = {
	// 		"module":_module,
	// 		"weapond":weapon_m,
	// 		"w_eff":w_eff,
	// 		"position":[0,-2,4],
	// 		"scale":2,
	// 		"rotate":[0,0,0]
	// 	};
	// 	mgr.create(node,"fighter");
	// }
	/**
	 * @description  返回事件
	 */
	goback(arg){
		close(arg.widget);
	}
    gotoMenu(arg) {
		arg = arg.split(",");
		globalSend(arg[0], arg[1]);
	};
    gotoSurface(arg) {//外观
		globalSend("gotoSurface",arg);
	};
    gotoAttr() {
		let attr = localDB.player.allAttr;
		globalSend("gotoSeeAttr",{"title":"角色属性","attr":attr});//attr必须是Obj
	};
}

listen("friend_battle.showInfo",()=>{
	forelet.paint(getData());
});

//监听玩家数据变化
listen("cloth.wear_skin", () => {
	forelet.paint(getData());
});
listen("open_fun.id",()=>{
	forelet.paint(getData());	
})
// ============================== 本地
/**
 * @description  获取页面数据
 */
const getData = () => {
	let _data:any = {};
	_data.localDB = localDB;
	_data.roleCfg = role_base;
	_data.menu = menu_role_menu;
	_data.clothes_module = clothes_module;
	return _data;
};

// =========================== 立即执行
forelet.listener = (cmd) => {
	if(cmd == "remove"){
		updata("friend_battle.showInfo",false);
	}
	if(cmd !== "add")
		return;
	forelet.paint(getData());
}
