import { net_request } from "app_a/connect/main";
import { insert, updata, get as getDB, listen } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { Widget } from "pi/widget/widget";
import {  globalSend } from "app/mod/pi";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { Music } from "app/mod/music";
import { config_shortcut } from "cfg/c/config_shortcut";


export const forelet = new Forelet();

let curr_prop_list,//装备列表
	// reclaim_flag = false,//单次分解间隔
	choose_return: any = {},
	reclaim_ok = false,//熔炼成功标识
	reclaim_anima = false,//熔炼成功标识
	selectList = [];//分解框选择列表
let onOff: any = {},
	curr_award: any = {};

//背包满，引导熔炼
insert("reclaim",{});

export const globalReceive = {
	"open_reclaim": () => {
		if (funIsOpen("reclaim")) {
			one_choose();
			updatahtml();
			open("app_c-reclaim_share-reclaim_bg1");
			globalSend("openNewFun", "reclaim");
		}
	},
	"close_reclaim": ()=>{
		let w = forelet.getWidget("app_c-reclaim_share-reclaim_bg1");
		if(w){
			close(w);
			w = undefined;
		}
	}
}


const getdata = function () {
	let data: any = {};
	data.choose_return = choose_return;
	data.selectList = selectList;
	data.curr_prop_list = curr_prop_list;
	data.curr_award = curr_award;
	data.onOff = onOff;
	data.reclaim_ok = reclaim_ok;
	data.reclaim_anima = reclaim_anima;
	// data.reclaim_flag = reclaim_flag;
	return data;
}

getdata();


//一键添加
let one_choose = function ( type? ) {  //type  区分是否为一键熔炼 0 不是一键熔炼  1 是一键熔炼
	let height_score: any = {}; //记录每个空位最高分
	//排序
	updataCurrList();
	let all = getDB("friend_battle.equip_set");
	//choose_list={};
	selectList = [];
	for (let i = 0; i < curr_prop_list.length; i++) {
		let index = curr_prop_list[i].slot - 1;
		let fq = all[index];
		if (!fq) {
			if (!height_score[index]) {
				height_score[index] = curr_prop_list[i];
				continue;
			}
			fq = height_score[index];
		}
		if (curr_prop_list[i].grade > fq.grade) {
			let p = height_score[index];
			if (p) {
				if (p.grade < curr_prop_list[i].grade) {
					selectList.push(p);
					height_score[index] = curr_prop_list.splice(i, 1)[0];
					i--;
				} else {
					selectList.push(curr_prop_list[i]);
				}
			} else {
				height_score[index] = curr_prop_list.splice(i, 1)[0];
				i--;
			}
		} else {
			selectList.push(curr_prop_list[i]);
			curr_prop_list.splice(i, 1);
			i--;
		}

		//如果不是月卡用户则不能一键熔炼
		if(!type){
			if (selectList.length >= 6) break;
		}
	}
	//updatahtml();
};

export class detail_main extends Widget {
	goback(msg) {
		choose_return = {};
		close(msg.widget);
		forelet.paint(getdata());
	}
	close(msg) {
		choose_return = {};
		close(msg.widget);
	}
	//open
	getChoose(index) {
		if (selectList[index]) {
			curr_prop_list.push(selectList[index]);
			selectList[index] = 0;
			updatahtml();
		} else {
			updatahtml();
			open("app_c-reclaim_share-choose_prop-choose_prop");
		}
	}
	//click
	setChoose(msg) {
		let arg = msg.split(",");
		if (choose_return[arg[0]]) {
			delete choose_return[arg[0]];
			updatahtml();
			return
		} else {
			let count = 0;
			let selectCount = 0;
			for (let e in choose_return) {
				if (choose_return[e] != 0) count++;
			}
			for (let e of selectList) {
				if (e != 0) selectCount++;
			}
			if (selectCount + count >= 6) {
				globalSend("screenTipFun", { words: `六件熔炼装备已满` });
				return;
			}
			choose_return[arg[0]] = curr_prop_list[arg[1]];
		}
		updatahtml();
	}
	sureChoose(msg) {
		for (let k in choose_return) {
			if (choose_return.hasOwnProperty(k)) {
				let i = selectList.indexOf(0);
				if (i >= 0) {
					selectList[i] = choose_return[k];
				}
			}
		}
		choose_return = {};
		close(msg.widget);
		updatahtml();
	}
	//分解
	propResolved = function () {
		// if(reclaim_flag){
		// 	globalSend("screenTipFun", {
		// 		words: `熔炼炉冷却中，请稍后`
		// 	});
		// 	return;
		// }
		one_choose();
		propResolve();
	}
	//一键分解
	propResolveds = function () {
		// if(reclaim_flag){
		// 	globalSend("screenTipFun", {
		// 		words: `熔炼炉冷却中，请稍后`
		// 	});
		// 	return;
		// }
		let month_card = getDB("player.month_card_due_time");
        let player_level = getDB("player.level");
        
        if (month_card == 0 && player_level < config_shortcut["reclam"].type[1]) {
            globalSend("gotoMonthCardWay", "reclam");
            return;
        }

		one_choose(1);
		propResolve();
	}
}

const propResolve = function () {
	if (selectList.length === 0) {
		globalSend("screenTipFun", {
			words: `没有物品`
		});
		return;
	}
	let bagFull = getDB("reclaim.bagFull");
	if (bagFull) {
		updata("reclaim.bagFull",0);
		updata("reclaim.reclaim_guide",0);			
	}
	propResolved();
}

//分解
const propResolved = function () {
	// reclaim_flag = true;
	// updatahtml();
	reclaim_ok = true;
	updatahtml();
	let str = "",
		len = selectList.length;
	for (let i = 0; i < len; i++) {
		if (selectList[i]) {
			str += selectList[i].index - 0 + 1 + ",";
		}
	}
	str = str.substring(0, str.length - 1);
	net_request({ "param": { "index": str }, "type": "app/prop/melt@melt" }, function (data) {
		if (data.error) {
			console.log(data.why);
			return;
		}
		Music.skillSound("other_two");
		let prop: any = Common.changeArrToJson(data.ok);
		Common_m.deductfrom(prop);
		let result = Common_m.mixAward(prop);
		if (result.player.money) {
			globalSend("goodsTip", {
				words: [100001, result.player.money]
			});
		}
		for (var i = 0, len = result.bag.length; i < len; i++) {
			if (result.bag[i].sid && result.bag[i].count) {
				globalSend("goodsTip", {
					words: [result.bag[i].sid, result.bag[i].count || 0]
				});
			}
		}
		reclaim_anima = true;
		reclaim_ok = false;
		choose_return = {};
		one_choose();
		updatahtml();
		globalSend("reclaimEnd");
		let timer = setTimeout(function () {
			reclaim_ok = false;
			// reclaim_flag = false;
			reclaim_anima = false;
			updatahtml();
			clearTimeout(timer);
			timer = null;
		}, 600);
	})
}

//刷新当前道具列表
const updataCurrList = function () {
	curr_prop_list = getDB("bag*type='equip'").filter(function (x) {
		if (x && x.quality < 6) return x;
	});
	if (curr_prop_list.length == 0) return;
}
/********************************************************************************/
const updatahtml = function () {
	forelet.paint(getdata())
}
//背包满了，引导一次熔炼
listen("bag*type='equip'",()=>{
	let flag = Common_m.bagIsFull();
	let bagFull = getDB("reclaim.bagFull");
	if (flag && !bagFull) {
		updata("reclaim.bagFull",1)
	}
});
// //背包满了，打精英怪引导熔炼
// listen("reclaim.bagFull",()=>{
// 	let bagFull = getDB("reclaim.bagFull");
// 	if (bagFull) {
// 		updata("reclaim.bagFull",1)
// 	}
// })