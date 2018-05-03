import { net_request, net_send, net_message } from "app_a/connect/main";
import { data as localDB, updata, get as getDB, listen, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { closeBack } from "pi/ui/root";
import { Widget } from "pi/widget/widget";
import { showAccount, fight } from "app_b/fight/fight";
import { tips_back } from "app_b/tips/tips_back_cfg";
import { Pi, globalSend, findGlobalReceive } from "app/mod/pi";
import { listenBack } from "app/mod/db_back";
import { Util } from "app/mod/util";
import { getGlobal } from "pi/widget/frame_mgr";
import { listenerList} from "pi/ui/root";

//新手任务配置表
import { playermission } from "cfg/b/playermission";
import { playermission_base } from "cfg/b/playermission_base";

export const forelet = new Forelet();


let currTask,
	readData,
	progress = 0,
	lastTask,
	submitState = false,//提交任务状态
	timeOut = 2*60*1000,//触发引导提交任务间隔
	guideTimer = Util.serverTime(),//记录上一个任务提交时的时间
	is_frame = 0;//创建全局渲染帧永久调用函数和参数


/**
 * @description 记录打开的根组件
 */
let widgetsMap = [];

let frame_mgr = getGlobal();

const getData = function () {
	let data: any = {};
	data.playermission = playermission;
	data.currTask = currTask;
	data.currList = playermission[currTask];
	data.progress = progress;
	if(!submitState &&　getPage() === "app_b-wild-wild"){//在野外执行自动提交完成的任务
		if((data.currList.type !== 'jjc_rank' && progress >= data.currList.arg) || (data.currList.type === 'jjc_rank' && data.currList.arg >= progress)){
			submitState = true;
			let timer = setTimeout(()=>{
				clearTimeout(timer);
				timer = null;
				if(submitState){
					getAward();
				}
			},2000);
		}
	}
	return data;
}


export class playermission_m extends Widget {
	getAward = function () {
		getAward();
	}

	gotoMission = function(fun) {
		guideTimer = Util.serverTime();
		updata("playermission.guide",0);
		if(fun != "undefined"){
			if(fun.indexOf(",") > -1){
				let arr = fun.split(",");
				globalSend(arr[0],arr[1]);
				return;
			}
			globalSend(fun);
		}
	}
}
// 领奖
export const getAward = function () {
	updata("playermission.guide",0);
	guideTimer = Util.serverTime();
	let currList = playermission[currTask];
	if (!!currList) {
		if (currList.type != "jjc_rank") {
			if (progress >= currList.arg || progress >= currList.arg[1]) {
				net_request({ "param": { "task_id": currTask }, "type": "app/activity/task@award" }, function (data) {
					if (data.error) {
						// if(data.error) Common.backThrow(data.why, tips_back, screenTipFun);                 
						// if(data.reason)  Common.backThrow(data.reason, tips_back, screenTipFun);                 
						console.log(data.why);
						return;
					}
					let _data: any = Common.changeArrToJson(data.ok);
					lastTask = currTask;
					currTask = _data.id;
					let task_type = playermission[_data.id].type;
					let type = playermission_base[task_type].type;
					readData = type_mission(_data.id , type , {"task_status":Common.changeArrToJson(_data.task_status)});
					let result: any = Common_m.mixAward(_data);
					result.auto = 1;
					globalSend("showNewRes", {
						result, function(result1) {
							result1.open();
						}
					});
					updata("playermission.curr", parseInt(currTask));
					submitState = false;
					listenFun();
					//checkTask();
					updataHtml();
				})
			} else {
				globalSend(currList.func);
				// changeChat({ "type": "hidden"});
				//globalSend("changeChat", { "type": "hidden"});
			}
		} else {
			if (progress <= currList.arg) {
				net_request({ "param": { "task_id": currTask }, "type": "app/activity/task@award" }, function (data) {
					if (data.error) {
						// if(data.error) Common.backThrow(data.why, tips_back, screenTipFun);                 
						// if(data.reason)  Common.backThrow(data.reason, tips_back, screenTipFun);                 
						console.log(data.why);
						return;
					}
					let _data: any = Common.changeArrToJson(data.ok);
					lastTask = currTask;
					currTask = _data.id;
					let task_type = playermission[_data.id].type;
					let type = playermission_base[task_type].type;
					readData = type_mission(_data.id , type , {"task_status":Common.changeArrToJson(_data.task_status)});
					let result: any = Common_m.mixAward(_data);
					result.auto = 1;
					globalSend("showNewRes", {
						result, function(result1) {
							result1.open();
						}
					});
					updata("playermission.curr", parseInt(currTask));
					submitState = false;
					//listenFun();
					//checkTask();
					updataHtml();
				})
			} else {
				globalSend(currList.func, null);
				// changeChat({ "type": "hidden"});
				//globalSend("changeChat", { "type": "hidden"});
			}
		}
	}
}
export const updataHtml = function () {
	if (Common.isExist(forelet, "app_b-playermission-playermission")) forelet.paint(getData());
}


const listenFun = function () {
	checkTask();
	if (playermission[currTask].listen != "undefined") {
		listen("player", function () {
			checkTask();
		});
		listen("skill", function () {
			checkTask();
		});
		listen("magic", function () {
			checkTask();
		});
		listen("arena", function () {
			checkTask();
		});
		listen("equip", function () {
			checkTask();
		});
		listen("gang.data", function () {
			checkTask();
		});
		listen("tower.floor_point", function () {
			checkTask();
		});
		listen("gest.gest_info", function () {
			checkTask();
		});
		listen("soul.soul_info", function () {
			checkTask();
		});
		listen("equip_fb.equip_fb_star.0.0", function () {
			checkTask();
		})
	}
}

const checkTask = function () {
	let currList = playermission[currTask];
	let temp = progress;

	if (currList) {
		if (playermission[currTask].listen == "undefined") {
			progress = readData[0] ? readData[0][1] : 0;
		} else {
			if (currList.type == "role_level") {			//等级到达15级
				let _player = getDB("player");
				let max_lv = 0;
				max_lv = _player.level
				progress = max_lv;
			} else if (currList.type == "skill_level") {			//任意技能达到5级
				let skill = getDB("skill");
				let max_lv = 0;
				if(skill)for (let i = 0; i < skill.length; i++) {
					if (skill[i][1] >= max_lv) {
						max_lv = skill[i][1];
					}
				}
				progress = max_lv;
			} else if (currList.type == "treasure") {				//激活神兵
				let _treasure = getDB("magic.treasure");
				if (!_treasure) {
					progress = 0;
					return;
				}
				progress = _treasure.length > 0 ? 1 : 0;
			} else if (currList.type == "treasure_phase") {		//神兵进阶至3阶
				let _treasure = getDB("magic.treasure");
				let breakinfo = _treasure ? _treasure[1] : 0;
				progress = breakinfo;
			} else if (currList.type == "ep_level") {				//装备强化总等级达到50级
				let equip_level = getDB("friend_battle.equip_level");
				if (!equip_level) {
					progress = 0;
					return;
				}
				let num = 0;
				for (let i = 0; i < equip_level.length; i++) {
					num += equip_level[i];
				}
				progress = num;
			} else if (currList.type == "jjc_rank") {				//竞技场达到3000名以上
				let rank = getDB("arena.jjc_top_rank");
				let max_rank = rank || 5000;
				progress = max_rank;
			} else if (currList.type == "mission") {   //装备副本第一关第一章
				let mission = getDB("equip_fb.equip_fb_star.0.0");
				progress = mission || 0;
			}else if (currList.type == "ep_diamond") {			//装备宝石总等级达到10级
				let equip_diam = getDB("friend_battle.equip_diam");
				if (!equip_diam) {
					progress = 0;
					return;
				}
				let num = 0;
				for (let v of equip_diam) {
					for (let i of v) {
						if (i === 0) {
							break;
						}
						num += i[1];
					}
				}
				progress = num;
			} else if (currList.type == "guild") {					//加入门派
				let post = getDB("gang.data.apply_list");
				let gang_name = getDB("gang.data.gang_name");
				let gang_id = (post && post.length > 0 || gang_name!==undefined) ? 1 : 0;
				progress = gang_id;
			} else if (currList.type == "tower_point") {			//天庭秘境达到20层以上
				let point = getDB("tower.floor_point");
				let floor = point || 0;
				progress = floor;
			} else if (currList.type == "ep_star") {				//装备总星级达到10级
				let equip_star = getDB("friend_battle.equip_star");
				if (!equip_star) {
					progress = 0;
					return;
				}
				let num = 0;
				for (let v of equip_star) {
					num += v
				}
				progress = num;
			} else if (currList.type == "gest") {					//激活1个阵法
				let num = getDB("gest.active_gest_num") || 0;
				progress = num;
			} else if (currList.type == "soul"){ 				//九窍精魂总等级达到10级
				if(!getDB("soul")) return;
				let soul_info = getDB("soul").soul_info;
				let lv = 0;
				for (let i = 0; i < soul_info.length; i++) {
					for (let j = 0; j < soul_info[i].length; j++) {
						lv += soul_info[i][j][1];
					}
				}
				progress = lv;
			}
		}

		if (temp != progress || lastTask == currTask) {
			updataHtml();
		}
		forelet.paint(getData());
	}
}

net_message("task_status", (msg) => {
	// let key = Object.keys(msg)[0];
	let key = playermission[currTask].type;
	if(msg[key]){
		readData = [[undefined, msg[key]]];
		progress = msg[key];
		forelet.paint(getData());
	}
})


listenBack("app/activity/task@read", (_data) => {
	let task_type = playermission[_data.id].type;
	let type = playermission_base[task_type].type;
	readData = type_mission(_data.id , type , _data);
	currTask = _data.id;
	lastTask = currTask;
	updata("playermission.curr", parseInt(currTask));
	if (playermission[currTask]) {
		listenFun();
		let player = getDB("player");
		if(!is_frame){
			frame_mgr.setPermanent(setPlayermissionGuide);
			is_frame = 1;
		}
	}
	forelet.paint(getData())
})

const setPlayermissionGuide = function(){
	// let player = getDB("player");
	// if(player.level >= 20){
	// 	frame_mgr.clearPermanent(setPlayermissionGuide);
	// 	timeOut = null;
	// }
	let guide = getDB("playermission.guide");
	if(Util.serverTime() - guideTimer > timeOut && !guide){
		updata("playermission.guide",1);
	}
}


//根据任务类型获取任务完成进度
const type_mission = ( id , type , data ) => {
	let _data : any;
	if(type == 0 || type == 1){
		_data = [[playermission[id].type, data.task_status[playermission[id].type] || 0]];
	}else if(type == 2){
		_data = [];
	}
	return _data;
}

/**
 * @description 获取当前所在功能界面
 */
export const getPage = () => {
	if(widgetsMap.length == 0){
		return "main";
	}else{
		return widgetsMap[widgetsMap.length-1];
	}
};

/**
 * @description 初始化数据库排行榜字段
 */
insert("playermission", {
	"guide":0
});

/**
 * @description 注册root监听事件
 */
(<any>listenerList).add((cmd) => {
	if (!cmd || !cmd.group) return;
	if(cmd.group.name === "secondary" || cmd.group.name === "cover" ||  cmd.group.name === "scene"){
		if(cmd.type == "add"){
			widgetsMap.push(cmd.widget.name);
		}else if(cmd.type == "remove"){
			widgetsMap.pop();
			if(!submitState &&　getPage() === "app_b-wild-wild" && ((playermission[currTask].type !== 'jjc_rank' && progress >= playermission[currTask].arg) || (playermission[currTask].type === 'jjc_rank' && playermission[currTask].arg >= progress))){
				submitState = true;
				let timer = setTimeout(()=>{
					clearTimeout(timer);
					timer = null;
					if(submitState){
						getAward();
					}
				},2000);
			}
		}
	}
});
