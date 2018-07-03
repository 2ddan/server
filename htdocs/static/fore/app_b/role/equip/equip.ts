import * as piSample from "app/mod/sample";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { remove, destory } from "pi/ui/root";
import { updata, get as getDB, listen,checkTypeof,insert } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { open } from "app/mod/root";
import { net_request} from "app_a/connect/main";

import { equip_level_limit } from "cfg/b/equip_level_limit";
import { fastWearFun, forelet as fastWearForelet } from "app_b/role/equip/equip_fast_wear";
import { listenBack } from "app/mod/db_back";
import { equip_star_achieve } from "cfg/c/equip_star_achieve";

export const forelet = new Forelet();


//数据
var conect: any = {},
equip_up_tab = "level",
equip_index = 0,
funcallback,
oneKey = true,//一键升级开关
beforeLevel = 0,
// getData = {
//     wear : function(_index){
//         var _equip = getDB("friend_battle.equip_set"),
//             _list = getDB("bag*slot="+_index);
//         return {
//             equip:_equip,
//             bag:_list
//         }
//     }
// },
equipType = 0;

conect.getData = function(){
	var hero = getDB("friend_battle");
	var _data:any = {};
	_data.type = equip_up_tab;
	_data.equip_index = equip_index;
	// _data.LevelUpCost = LevelUpCost;
	// _data.StarUpCost = StarUpCost;
	// _data.LevelUpCostParam = LevelUpCostParam;
	_data.hero = hero;
	_data.equip = hero&&hero.length&&hero.equip_set?hero.equip_set[equip_index-1]:0;
	_data.bag = getDB("bag*slot="+equip_index);
	//_data.state = state;
	_data.oneKey = oneKey;
	//_data.calcCost = getOnekeyupCost;
	_data.beforeLevel = beforeLevel;
	_data.equipType = equipType;
	return _data;
};

const read = (data) => {
	//console.log(data);
	for(let j=0;j<data.equip_set.length;j++){
		if(data.equip_set[j]){
			data.equip_set[j] = piSample.decode(data.equip_set[j],Pi.sample);
		}
	}
	// data.equip_set.sort(function(a,b){
	// 	return (a.slot||0) - (b.slot||0);
	// })
	updata("friend_battle",data);
	updata("friend_battle.soul_level",star_achieve());
}

//计算星宿成就阶段
const star_achieve = () => {
	let equip_star = getDB("friend_battle.equip_star");
    let all_star = 0;
    for(let j=0;j<equip_star.length;j++){
        all_star+=equip_star[j];
    }
    let achieve = equip_star_achieve;
    for(let i in achieve){
		let _i = parseInt(i);
        if(achieve[_i + 1]){
            if(all_star >= achieve[i].star && all_star < achieve[_i + 1].star){
                return _i;
            }
        }else{
            if(all_star >= achieve[i].star){
                return _i;
            }
        }
    }
    return 0;
}

//关闭界面
var goback = function(arg){
	let w:any = forelet.getWidget(arg);
	if(w){ 
		w.ok?w.ok():(w.cancel?w.cancel():null);
	}
};

//显示对应部位的装备
var lookEquipx = function(arg){
	var equipIndex;
	equipIndex = arg;
	var hero = getDB("friend_battle");
	equip_index = equipIndex+1;
	forelet.paint(conect.getData());
	var arr = getDB("bag*slot="+equip_index).filter(function(x){return x});
	if(arr.length || hero.equip_set[equipIndex])open("app_b-role-equip-wear");
	else{
		// var sid = equipIndex-0+400006;
		// globalSend("goIntoGetWay",Pi.sample[sid].drop_location);
		alert("暂时没有该装备");
	}
};

//更换、卸下、穿上
//arg[0] 为装备位于背包中的位置 0表示卸下
//arg[1] 为装备位
conect.changeEquip = (arg,funcallback?) => {
	arg = arg.split("-");
	var msg = {"param": {"equip_index":arg[1] - 0,"prop_index":arg[0] - 0}, "type": "app/prop/equip@change_equip"};
    net_request(msg, function (data) {
      //console.log(data);
		if(data.error) {
			// if(data.error) Common.backThrow(data.why,tips_back,screenTipFun);
			// if(data.reason) Common.backThrow(data.reason,tips_back,screenTipFun);
			console.log(data.why);
            return;
		}
		var prop : any = {};
		let equip = piSample.decode(data.ok[0][1][0][0],Pi.sample);
		if(arg[0] - 0 == 0){
			updata("friend_battle.equip_set."+(arg[1] - 0 - 1),0);
			prop = piSample.decode(data.ok[1][1][0][0],Pi.sample);
			//prop = calc_attr.getEquipAttr(prop);
			prop.index = data.ok[1][1][0][1]-1;
			updata("bag."+(data.ok[1][1][0][1]-1),prop);
		}else{
			updata("friend_battle.equip_set."+(arg[1] - 0 - 1),piSample.decode(data.ok[0][1][0][0],Pi.sample));
			updata("friend_battle.equip_set."+(arg[1] - 0 - 1)+".index",data.ok[0][1][0][1]);
			if(checkTypeof(data.ok[1][1][0][0],"Array")){
				prop = piSample.decode(data.ok[1][1][0][0],Pi.sample);
				//prop = calc_attr.getEquipAttr(prop);
				prop.index = data.ok[1][1][0][1] - 0 - 1;
				updata("bag."+(data.ok[1][1][0][1] - 1),prop);
				let mixAwardData = {}, arr = [];
				arr.push(data.ok[1]);
				mixAwardData["award"] = arr;
				// Common_m.mixAward(mixAwardData);
			}else updata("bag."+(arg[0] - 0 - 1),0);
			if (!!fastWearForelet.getWidget("app_b-role-equip-equip_fast_wear")) {
				remove(fastWearForelet.getWidget("app_b-role-equip-equip_fast_wear"));
				destory(fastWearForelet.getWidget("app_b-role-equip-equip_fast_wear"));
				fastWearFun.getFastWearEquip();
            }
		}
		goback("app_b-role-equip-wear");
		let w :any =forelet.getWidget("app_b-role-equip-equip_info");
		if(w){
			remove(w);
			destory(w);
			w = undefined;
		}
		//Common.roleAttr(role_index);
		//if(callback)callback();
		if(funcallback)funcallback();
		if(equip && equip.quality == 6){
			globalSend("getRedEquip", null);
		}
		conect.updataHtml();
		funcallback = null;
        //updataInfo(null);
    });
}

//刷新数据
conect.updataHtml = function(){
	forelet.paint(conect.getData());
};

export class equip extends Widget {
	//查看对应装备位的所有装备
    lookEquip = (arg) => {
		let showInfo = getDB("friend_battle.showInfo");
		let equip = getDB("friend_battle.equip_set");
		if(equip[arg]){
			if(showInfo){
				updata("friend_battle.showInfo",false);
				// let set = setTimeout(()=>{
					updata("friend_battle.showInfo",true);
					globalSend("gotoPopup",arg);
					// clearTimeout(set);
					// set = undefined;
				// },200);
			}else{
				updata("friend_battle.showInfo",true);
				globalSend("gotoPopup",arg);
			}
		}
		//lookEquipx(arg);
		// equipType = arg;
		// forelet.paint(conect.getData());
		// let friend_battle1 = getDB("friend_battle");
		// if(friend_battle1.equip_set[arg]){
		// 	open("app_b-role-equip-equip_info");
		// }else{
		// 	lookEquipx(arg);
		// }
	}

	//更换装备
	chage = (arg)=>{
		replaceEquip(arg);
		//let f = Common.isReach({"limit":{"friend_battle":[role_index,limit]}},forelet,false,screenTipFun);
		//if(!f)return;
	};

	//查看所有对应装备位装备
	lookEquips = (arg) => {
		let w :any =forelet.getWidget("app_b-role-equip-equip_info");
		remove(w);
		destory(w);
		w = undefined;
		lookEquipx(arg)
	};

	gobackEquipinfo = (arg) => {
		destory(arg.widget);
	}
}

//更换装备外部
export const replaceEquip = (arg,callback?) => {
	let m = arg.cmd.split("-");
	if(m[0] == 0){
		conect.changeEquip(arg.cmd);
	}else{
		let _equip = getDB("bag")[m[0] - 1];
		let level = _equip.level?(_equip.level-1):0;
		let limit = equip_level_limit[m[1]].open_level;
		let player = getDB("player");
		if(player.level >= limit){
			conect.changeEquip(arg.cmd,callback);
		}else{
			alert("未达到穿戴等级");
		}
	}
}

/**
 * @description 初始化人物装备孔字段
 */
insert("friend_battle",[]);


listenBack("app/prop/equip@read",read);