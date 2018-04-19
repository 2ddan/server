/**
 * @description 
 */
// ============================== 导入
//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { logout } from "pi/ui/con_mgr";
import { getTask, getPrioritySize } from "pi/util/task_mgr";
//mod
import { globalSend, refresh, Pi } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { insert, updata, listen, data as localDB } from "app/mod/db";
import { listenBack } from "app/mod/db_back";
import { setShield } from "app/scene/ui_fun";
import { Music, changeMusicState } from "app/mod/music";
//scene
import { setRole } from "app/scene/ui_fun";
//app
import { net_message, net_send } from "app_a/connect/main";

//外部
import { powerAnim } from "app_b/power_anim/power_anim"
import { changeAutoFinght } from "app_b/wild/wild";
// ======================================= 导出
/**
 * @description  导出forelet
 */
export const forelet: any = new Forelet();

/**
 * @description  导出组件
 */
export class Player extends Widget {
	/**
	 * @description 打开角色详情
	 */
	showDetail() {
		open("app_b-player-detail");
	}
	//去vip界面
	gotoVip = () => {
    	globalSend("goToVip");
    }
	/**
	 * @description 关闭
	 */
	goback(arg) {
		this.name === arg && ((w) => {
			//循环外调用
			setTimeout(() => { close(w) }, 0);
		})(this);
	}
	/**
	 * 其他
	 */
	stateChange(index) {
		stateChange(index);
		forelet.paint();
	}
	alertTaskSize(){
		let ts = getTask(),s = `${ts.size()}|||`,t = {},tail;
		ts.sync.forEach((v,k)=>{
			s += `${k}:${v.size};`;
		})
		for(let i = ts.async.size;i>0;i--){
			if(!tail)tail = ts.async.tail;
			if(t[tail.priority]){
				t[tail.priority] += 1;
			}else 
				t[tail.priority] = 1;
			tail = tail.next
		}
		alert(s+JSON.stringify(t));
	}
}
/**
 * 全局广播
 */
export const globalReceive: any = {
	setupState : (index) => {
		stateChange(index);
		forelet.paint();
	}
}
// ============================== 本地
/**
 * @description 玩家数据库字段
 */
let _db = {
	area_time: 0,
	annual_card_due_time: 0,
	area: 1,
	career_id: 0,
	diamond: 0,
	dominate_area: 0,
	exp: 0,
	head: "",
	level: 1,
	money: 0,
	month_card_due_time: 0,
	name: "",
	phone: "",
	power: 0,
	recharge_detail: [],
	rmb: 0,
	role_id: 0,
	role_time: 0,
	sex: 0,
	spend_detail: [],
	task_tag: "",
	total_recharge: 0,
	vip: 0,
	vip_exp: 0,
	wx_award: 0,
	wx_bind: 0,
	wx_share: 0,
	wx_share_award: 0,
	function_record: -1
};
let funArr = ["bgMusic", "btnMusic", "effect", "shake", "fighter", "autoFightBoss"];
/**
 * @description  处理原始数据
 */
const initData = (data) => {
	for (let k in data) {
		updata(`player.${k}`, data[k]);
	}
	//设置uifun里面的role id
	setRole(localDB.player.role_id);
}

// =========================== 立即执行
//添加player字段到数据库
insert("player", _db);
//获取玩家数据
listenBack("app/role@read", initData);
//监听玩家数据变化
listen("player", () => {
	forelet.paint();
});
/**
 * 监听战斗力是否变化
 */
let locPower = 0;
listen("player.power", function () {
	locPower = localDB.player.power;
});
/**
 * 监听数据库listen队列跑完，每次跑完都会跑
 */
listen("$listenerOver", function () {
	if (locPower) {
		net_send({ param: { power: locPower }, type: "app/role@refresh_power" });
		powerAnim(locPower);
		locPower = 0;
		// console.log("power =================================== ");
	}
});
//账号在其他地方登录
net_message("other_place_login", (msg) => {
	//断开连接
	logout();
	let s = `其他用户(ip:${msg.ip})正在登录该账号！\n 请重新进入~`;
	if (globalSend("popTip", {
		title: s,
		btn_name: ["刷新", "取消"],
		cb: [
			//确认
			() => {
				refresh();
			},
			//取消
			() => {

			}
		]
	})) {
		return;
	}
	confirm();
	refresh();
	// popTipFun(
	// 	{
	// 		words: Common.mergeTips(tips_pop.other_place_login, [msg.param.ip]),
	// 		callback: [[tips_pop.other_place_login.btn_name[0], function () {
	// 			refresh();
	// 		}]],
	// 		close: function () {
	// 			refresh();
	// 		}
	// 	}
	// )
});


//读取音效、特效等本地设置
(function () {
	funArr.forEach((v, i) => {
		let loc = Pi.localStorage[v];
		if (i < 2 && loc) {
			changeMusicState(v, true);
		} else if (i >= 2 && i < 5 && loc) {
			setShield(v, true);
		} else if (i == 5) {
			loc &&　changeAutoFinght(v, true);
			!loc && changeAutoFinght(v, false);
		}
	})
})();

const stateChange = function (index) {
	if (index < 2) {
		fun(index, changeMusicState);
	} else if (index == 5) {
		fun(index, changeAutoFinght);
	} else {
		fun(index, setShield);
	}
};

const fun = function (index, callback) {
	if (!Pi.localStorage[funArr[index]]) {
		Pi.localStorage.setItem(funArr[index], 1);
		callback(funArr[index], true);
	} else {
		Pi.localStorage.removeItem([funArr[index]]);
		callback(funArr[index], false);
	}
}
