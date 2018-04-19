// ========================================= 导入
//pi
import { getWidth, getHeight, getScale,open,destory } from "pi/ui/root";
import { Forelet } from "pi/widget/forelet";
import { objCall, call } from 'pi/util/util';
import { set as task } from 'pi/util/task_mgr';
//mod
import { Pi, cfg as pi_cfg ,globalSend } from "app/mod/pi";
import { data as localDB, updata, get as getDB, listen } from "app/mod/db";

//fight
import * as Fight from "fight/a/common/fight";
import { Fight_common } from "fight/a/fore/fight_common";

import { monster_base } from "fight/b/common/monsterBase";
import { role_base } from "fight/b/common/role_base";
import { Init_Fighter,createSkill } from "fight/a/common/init_fighter";
//scene
import { mgr, mgr_data, renderHandlerList } from "app/scene/scene";
import { uiEffect } from "app/scene/anim/scene"
import { cuurUI,cuurShow,UiFunTable, initValue, effectList, getEffectId, setShieldBack,getShield } from "app/scene/ui_fun";
import { Move, setShow, setList } from "app/scene/move";
//app
import { net_request } from "app_a/connect/main";
import { monster_cfg } from "app/scene/plan_cfg/monster_config";
import { module_cfg } from "app/scene/plan_cfg/module_config";
import { parts_cfg } from "app/scene/plan_cfg/parts_config";
import { pet_module } from "cfg/b/pet_module";
import { weapon_soul_base } from "cfg/c/weapon_soul_base";
import { clothes_module } from "cfg/b/clothes_module";
import { equip_star_achieve } from "cfg/c/equip_star_achieve";
import { Common } from "app/mod/common";
import { ShowFunTable } from "app_b/widget/drop_out";

export const forelet = new Forelet();
// ========================================= 导出
//进入试炼副本
let openExpFb = false,//是否进入试炼副本
	exp_monster = [],//已结记录过的当前地图死亡怪物
	curr_die_monster = [];//记录当前怪物死亡id
export let globalReceive = {
    "openExpFb": (arg?) => {// 3重置map_id数组，true进入经验副本，false退出经验副本
		if(arg === 3){
			exp_monster = [];
			return;			
		}
		if(arg){
			openExpFb = true;
			return;			
		}
		openExpFb = false;
		exp_monster = [];
    }
}



export const setToCallBack = function(fun,limit){
	toCallBack = fun;
	_limit = limit;
}

export const clearToCallBack = function(){
	toCallBack = undefined;
	_limit = undefined;
}

export const initMapList = function () {
	for(let k in mapList){
		mgr.remove(mapList[k]);
		if(pet[k]){
			mgr.remove(pet[k]);
		}
	}
	mapList = {};
	pet = {};
	setList(mapList);
}

// let img_length = 0;
// let magic_w : any;

export let mapList = {};

export let pet = {};

export class handScene {

	static getSelf = function () {
		return __self;
	}

	static insert(e, now) {
		if (!id) id = getDB("user.rid");
		if (!mapList[e.fighter.mapId]) {
			//添加show_hp
			e.fighter.show_hp = e.fighter.hp;
			// 初始化时，应该看向场景中心(0,0,0)

			if (!e.fighter.lookat)
				e.fighter.lookat = { "value": [0, 0, 0], sign: Date.now() };
			e.fighter.state = "standby";
			//名字前加服务器
			if (e.fighter.type != "monster" && e.fighter.area>=0) {
				e.fighter.name = "S" + e.fighter.area + " " + e.fighter.name;
			}
			
			//task(objCall, [mgr, "create", [e.fighter, e.fighter.type]], 60000, 1);

			let skillList = [];
			//创建技能 {id,index,level}
			for (let i = 0; i < e.fighter.skill.length; i++) {
				let s = e.fighter.skill[i];
				let ss = createSkill(s.id, s.level, role_base[e.fighter.career_id]);
				ss.cdNextTime = ss.initialCDTime + now;
				skillList.push(ss);
			}
			e.fighter.skill = skillList;
			
			//插入的时候 把fighter 放在 list 里面
			mapList[e.fighter.mapId] = e.fighter;
			if(e.fighter.type == "monster"){
				e.fighter.scale = monster_base[e.fighter.sid].scale;
			}

			//处理武器
			if(e.fighter.weaponId){
				//初始化武器模型
				updateSelfModule(e.fighter);
			}
			if (e.fighter.sid == id && !e.fighter.isMirror) {
				__self = mapList[e.fighter.mapId];
				
				
				mgr.setOnlyPos(mgr_data.camera[mgr_data.name], [e.fighter.x, e.fighter.y, e.fighter.z]);
				//handScene.initFighterImage(__self.skill);
                //cuurUI.push({ "param": { head: null, f: __self , mapList : mapList}, "fun": UiFunTable.curTargetEffect });
				// if(mgr_data.name == "fight"){
				// 	cuurUI.push({ "param": { head: null, f: __self , mapList : mapList}, "fun": UiFunTable.targetHead })
				// }
			}else if(getShield("fighter") && e.fighter.type == "fighter"){
				e.fighter.hidden = true;
			}
			//处理宠物
			if(e.fighter.pet){
				updatePet(e.fighter.pet,e.fighter);
			}
			//处理时装
			if(e.fighter.clothes){
				initFighterModule(e.fighter);
			}
			//处理附灵特效
			if(e.fighter.ensoulClass){
				updateSoulEffect(e.fighter);
			}
			//处理升星特效
			if(e.fighter.equipStar){
				updateStarEffect(e.fighter);
			}
			//创建模型
			mgr.create(e.fighter, e.fighter.type);
			if(e.fighter.hidden == true){
				mgr_data.threeScene[mgr_data.name].modify(e.fighter._show.old, ["visible"]);
			}
			return true;
		}else{
			console.error("There is a same fighter which mapid is "+e.fighter.mapId);
			return false;
		}	
	};

	static remove = function (e, now) {
		let func = function () {
			task(objCall, [mgr, "remove", [mapList[e.mapId]],mgr_data.name], 60000, 1);
			pet[e.mapId] && task(objCall, [mgr, "remove", [pet[e.mapId]],mgr_data.name], 60000, 1);
			//mgr.remove(mapList[e.mapId]);
			delete mapList[e.mapId];
			delete pet[e.mapId];
		};
		cuurUI.push({"param": {func:func,time:now},"fun": UiFunTable.remove});
	};

	static move = function (e) {
		//e = Move.getPos(e[1]);
		
		let fighter = mapList[e.fighter.mapId];
		if(!fighter || fighter.hp<=0)return;

		//setChangeData(fighter, e.fighter,now);
		if (e.moving === 0) {
			fighter.state = "standby";
			fighter.moving = 0
		} else {
			fighter.state = "run";
			fighter.moving = Date.now();
		}

		if (fighter.sid === id && fighter.playAnim){
			delete fighter.playAnim;
		}

		// if(mgr_data.name == "gang_war" && toCallBack && _limit && fighter.mapId == __self.mapId){
		// 	if((__self.x-_limit.x)*(__self.x-_limit.x)+(__self.y-_limit.y)*(__self.y-_limit.y)<=_limit.range*_limit.range){
		// 		toCallBack();
		// 		clearToCallBack();
		// 	}
		// }

		if(e.fighter.path && e.fighter.path.length){
            if (fighter.lookat.value[0] != e.fighter.path[0].x || fighter.lookat.value[1] != e.fighter.path[0].z) {
                fighter.lookat = {
                    "value": [e.fighter.path[0].x, e.fighter.path[0].z, 0],
                    sign: Date.now()
                };
			}
			// if(e.moveing == 0 || fighter.path[0].x == e.fighter.x && fighter.path[0].y == e.fighter.y){
			// 	fighter.path.shift();
			// }
        //看向点击操作的方向
        }
		fighter.x = e.fighter.x;
		fighter.y = e.fighter.y;
		mgr_data.camera[mgr_data.name]._pos.x = e.fighter.x;
		mgr_data.camera[mgr_data.name]._pos.y = e.fighter.y;
		//if(limitModify(fighter) || e.moving === 0)
			mgr.setPos(fighter, [e.fighter.x, e.fighter.y, 0], fighter.lookat, cfg[fighter.type][fighter.module][fighter.state]);
		if (fighter.sid == id){
			// mgr.setOnlyPos(mgr_data.camera[mgr_data.name], [e.fighter.x, e.fighter.y,0]);
			//moveToSever(e.fighter);
			//refreshRand(mapList);
		}
	};

	static spreadSkill = function (e, now) {
		let curTarget = mapList[e.fighter.curTarget];
		let fighter = mapList[e.fighter.mapId];
		// if(!curTarget)return;
		if(!fighter)return;
		let targets = [];
		let target_mark = false;
		let ss = e.skill;
		let index = getSkillIndex(fighter.skill,ss.id);
		let _play;
		let player = getDB("player");

		//神兵类技能不更新释放者
		if(fighter.skill[index].hand !== 2){
			setChangeData(fighter, e.fighter,now);
		}
		//此处神兵技能释放，已移动到神兵功能里面，此处暂留
		// }else if(fighter.sid == player.role_id && fighter.skill[index].hand == 2){
		// 	updata("magic.img_length",img_length);
			
		// 	if(!magic_w){
		// 		magic_w = true;
		// 		open("app_b-magic-magic_release_tips");
		// 		let set = setInterval(()=>{
		// 			img_length += 0.1;
		// 			updata("magic.img_length",img_length);
		// 			if(img_length >= 3.5){
		// 				clearInterval(set);
		// 				img_length = 0
		// 				updata("magic.img_length",0);
		// 				set = undefined;
		// 				let w = forelet.getWidget("app_b-magic-magic_release_tips");
		// 				destory(w);
		// 				magic_w = undefined;
		// 			}
		// 		},100);
		// 	}
		// }
		for (let i = 0; i < e.target.length; i++) {
			setChangeData(mapList[e.target[i].mapId], e.target[i],now);
			targets.push(mapList[e.target[i].mapId]);
		}
		
		if(fighter.skill[index].hand !== 2){
			_play = UiFunTable.updateUseSkill(fighter, getSkillAction(e));
		}

		if (id == fighter.sid) {
			//更新技能
			fighter.skill[index].cdNextTime = now + ss.cdTime;
		}

		e.fighter = fighter;
		e.target = targets;
		e.curTarget = curTarget;
		if (fighter.skill[index].hand !== 2 && curTarget && (fighter.lookat.value[0] != curTarget.x || fighter.lookat.value[1] != curTarget.y)) {
			fighter.lookat = { "value": [curTarget.x, curTarget.y, curTarget.z], sign: Date.now() };
		}		
		// if(_play)task(objCall, [mgr, "setAnimationOnce", [fighter, fighter.playAnim, fighter.lookat,[e.fighter.x, e.fighter.y, e.fighter.z]]], 60000, 1);
		if(_play)objCall(mgr,"setAnimationOnce",[fighter, fighter.playAnim, fighter.lookat,[e.fighter.x, e.fighter.y, e.fighter.z]]);
		// TODO 根据e.skill 来确定技能特效
		for(let j = 0,len = fighter.skill[index].skillEffect.length;j<len;j++){
			cuurUI.push({ "param": { fighter:fighter,skill:ss,index:j,time:e.time }, "fun": UiFunTable.skillEffect });
		}
		//震屏
		if(fighter.type == "monster" || id == fighter.sid){
			if(fighter.skill[index].shake){
				e.time = Date.now() + fighter.skill[index].shakeTime;
				e.index = index;
				cuurShow.push({"param": e,"fun": UiFunTable.shakeEffect});
				
			}
			if(fighter.skill[index].skillSound){
				cuurUI.push({ "fun": UiFunTable.sound, "param": {name:fighter.skill[index].skillSound,time:now+fighter.skill[index].skillSoundDelay} });
			}
		}
		if(fighter.curTarget && (mgr_data.name == "public_boss" || Fight.count > 0)){
			if(mapList[fighter.curTarget] && mapList[fighter.curTarget].type == "monster" && mapList[fighter.curTarget].show_type == 1){			
				if(cuurShow.length == 0){
					cuurShow.push({ "param": { head: null, f: e.fighter ,mapList:mapList }, "fun": ShowFunTable.targetHead });	
					target_mark = true;
					return;
				}
				for(var i in cuurShow){
					if(cuurShow[i]){
						if(cuurShow[i].fun.name == "targetHead"){
							cuurShow[i].param.f =  e.fighter;
							cuurShow[i].param.mapList = mapList;
							target_mark = true;
							return;
						}
					}
				}
				if(!target_mark){
					cuurShow.push({ "param": { head: null, f: e.fighter ,mapList:mapList }, "fun": ShowFunTable.targetHead });
				}	
			}
		}
		//插入BOSS头像

		//cuurUI.push({ "param": e, "fun": UiFunTable.skillSpecialEffect });

		// TODO 根据e.skill 来确定技能音效
		
	};

	static damage = function (e, now) {
		let fighter = mapList[e.fighter.mapId];
		let curTarget = mapList[e.target.mapId];
		e = Common.shallowClone(e);
		if(!fighter){
			console.warn("Don't find the fighter who is ",e.fighter);
			return;
		}
		if(!curTarget)return;

		setChangeData(fighter, e.fighter,now);
		setChangeData(curTarget, e.target,now);
		
		curTarget.self = (curTarget.mapId == __self.mapId);
		fighter.self = (fighter.mapId == __self.mapId);
		e.curTarget = e.fighter.curTarget;
		e.target = curTarget;
		e.fighter = fighter;
		//e.time = e.time - now;
		MCrontal.add(curTarget);	
		cuurUI.push({ "param": e, "fun": UiFunTable.hitEffect });
		let dieMoster = [];

		if(openExpFb){
			for(let key in mapList){
				let me = mapList[key];
				if(me.type == "monster" && exp_monster.indexOf(me.mapId) == -1 && me.hp <= 0){
					curr_die_monster.push(me.sid);
					exp_monster.push(me.mapId);
				}
			}
			if(curr_die_monster.length>0){
				globalSend("monsterDied",curr_die_monster.join(","));
				curr_die_monster = [];
			}
		}	
	};

	//添加buff
	static addBuff = function (e, now) {
		//没特效
		//cuurUI.push({"param":e,"fun":UiFunTable.buffEffect});
	};

	//激发buff
	static effect = function (e, now) {
		let fighter = mapList[e.fighter.mapId];
		let curTarget = mapList[e.target.mapId];
		if(!curTarget)return;
		setChangeData(fighter, e.fighter,now);
		setChangeData(curTarget, e.target,now);
		e.target = curTarget;
		e.fighter = fighter;
		if(fighter.mapId == __self.mapId || curTarget.mapId == __self.mapId){
			// if (curTarget.hp<=0 ) {
				MCrontal.add(curTarget);
				cuurUI.push({ "param": e, "fun": UiFunTable.excitationBuff });
			// }
		}

	};

	//清除buff
	static clearBuff = function (e, now) {

	};

	//释放技能
	static useSkill = function (e, now) {
		
	};
	//更新技能
	static refreshSkill = (e,now) => {
		// console.log("refreshSkill",e);
		let f = mapList[e.mapId];
		updateSkill(f,e.skill,now);
	};
	//更新技能
	static refreshAttr = (e,now) => {
		// console.log("refreshSkill",e);
		let f = mapList[e.mapId];
		updateAttr(f,e,now);
	};
	//更新技能
	static refreshWeapon = (e,now) => {
		// console.log("refreshSkill",e);
		let f = mapList[e.mapId];
		f.weaponId = e.weaponId;
		updateSelfModule(f);
	};
	//更新宠物
	static refreshPet = (e,now) => {
		// console.log("refreshSkill",e);
		let f = mapList[e.mapId];
		updatePet(e.pet,f);
	};
	//更新时装
	static refreshClothes = (e,now) => {
		// console.log("refreshSkill",e);
		let f = mapList[e.mapId];
		if(f.clothes == e.clothes)
			return;
		f.clothes = e.clothes;
		initFighterModule(f);
		// handScene.updateModule(__self.mapId,{module:f.module});
	};
	//更新附灵特效
	static refreshEnsoulClass = (e,now) => {
		let f = mapList[e.mapId];
		if(f.ensoulClass == e.ensoulClass)
			return;
		f.ensoulClass = e.ensoulClass;
		updateSoulEffect(f);
	}
	//更新星宿成就特效
	static refreshEquipStar = (e,now) => {
		let f = mapList[e.mapId];
		if(f.equipStar == e.equipStar)
			return;
		f.equipStar = e.equipStar;
		updateStarEffect(f);
	}
	static initFighterImage = function (skills) {
		let width = getWidth() * mgr_data.scale;
		let height = getHeight() * mgr_data.scale;
		let imgW = 420;
		let imgH = 113;
		let leftX = ((width - imgW) / 2) > 0 ? ((width - imgW) / 2) : 0;
		let node: any = { x: imgW / 2 , y: -225, z: 3, startX: leftX, imgWidth: imgW, imgHeight: imgH, width: width, height: imgH, image : "images/bg_skill_fight.png", type: "node2d" };
		//创建技能节点
		mgr.create(node, node.type);
		let j = 0;
		let count = 4;
		let startX = (Math.ceil((420 - ((count - 1) * (-920) + count * 840)) / 2));
		for (let k = 0; k < skills.length; k++) {
			let skill = skills[k];
			if (!skill.hand)
				continue;
			let img: any = Fight.createMesh(mgr.yszzFight.mesh);
			img.y = -42;
			img.x = startX - j * 80.5;
			img.z = 100;
			j++;
			img.res = "skill/" + skill.icon + ".png";
			img.name = skill.name;
			img.cdSpeed = 0;
			img.time = 0;
			img.node = node;
			img.type = "skill_img";
			img.rayID = skill.id;
			img.cdTime = Math.ceil(skill.cdTime/ 1000);
			skill.imgMesh = img;
			img.animName = "eff_ui_skillpower01";
			img.isOnce = false;
			img.isShow = true;
			mgr.create(img, img.type, node._show.old);
			cuurUI.push({ "param": { skill: skill, fighter: __self }, "fun": UiFunTable.handSkillCD });
		}
		if (j < 4) {
			for (let i = j; i < 4; i++) {
				let img: any = Fight.createMesh(mgr.yszzFight.mesh);
				img.y = -42;
				img.x = startX - j * 80;
				img.z = 100;
				j++;
				img.res = "images/skill_lock.png";
				img.name = "未激活";
				img.cdSpeed = 0;
				img.time = 0;
				img.isClose = true;
				img.type = "skill_img";
				img.rayID = -100001;
				mgr.create(img, img.type, node._show.old);
			}
		}

	};

	static getFighters(){
		let arr = [];
		for(let e in mapList){
			if(mapList[e].type != "monster"){
				arr.push(e);
			}
		}
		return arr;
	};

	static getGroupFighters(){
		let arr = [];
		for(let e in mapList){
			if(mapList[e].groupId == __self.groupId){
				arr.push(e);
			}
		}
		return arr;
	}
	/**
     * @description 模型更新
     * @param {Json}data 需要更新的节点数据
     */
	static updateFighterModule(data){
		if(!__self)return;
		handScene.updateModule(__self.mapId,data);
	}
	/**
     * @description 模型更新
     * @param {Json}obj 需要更新的节点数据
     */
	static updateModule(mapId,obj){
		let f = mapList[mapId];
		if(!f)return;
		for(let k in obj){
			f[k] = obj[k];
		}
		mgr.modify(f);
	}
	/**
	 * @description 渲染空帧
	 */
	static emptyFrame(delta){
		for(let k in pet){
			let p = pet[k];
			petMove(p,delta);
			updatePetPos(p);
			updateEffectPos();
		}
	}
	/**
	 * @description 重新插入模型
	 */
	static reInsert(){
		let func = (f,type?) => {
			mgr.remove(f);
			delete f._show;
			if (f.sid == id)
				mgr.setOnlyPos(mgr_data.camera[mgr_data.name], [f.x, f.y, f.z]);
			f.state = "standby";
			mgr.create(f, type || f.type);
			if(f.hidden == true || (type && mapList[f.id].hidden == true)){
				mgr_data.threeScene[mgr_data.name].modify(f._show.old, ["visible"]);
			}
		}
		for (let k in mapList) {
			func(mapList[k]);
		}
		for (let k in pet) {
			func(pet[k],"pet");
		}
	};
}
/**
 * @description 更新宠物
 */
export const updatePet = (pId,_fighter?) => {
	let fighter ;
	let player = getDB("player");
	if(_fighter){
		fighter = _fighter
	}else{
		for(let i in mapList){
			if(mapList[i].sid == player.role_id){
				fighter = mapList[i];
				break;
			}
		}
	}
	let p = pet_module[pId],
		cp = pet[fighter.mapId],
	x = fighter.x,
	y = fighter.y;
	if(pet[pId] && pet[pId].module === p.module){
		return;
	}
	//删除老的宠物
	if(cp){
		cp.x = x;
		cp.y = y;
		mgr.remove(cp);
	}
	
	pet[fighter.mapId] = Init_Fighter.initPet(cp,p,fighter);
	if(!cp){
		pet[fighter.mapId].name = Common.fromCharCode(pet[fighter.mapId].name);
	}
	//单独为玄晶兽添加宠物特效
	if(pet[fighter.mapId].module == 45007){
		pet[fighter.mapId].pet_eff = "eff_pet_1";
	}
	//创建模型
	mgr.create(pet[fighter.mapId], "pet");
	if(fighter.hidden == true){
		mgr_data.threeScene[mgr_data.name].modify(pet[fighter.mapId]._show.old, ["visible"]);
	}
};
/**
 * @description 更新武器
 */
export const updateSelfModule = (_fighter) => {
	if(!_fighter || _fighter.clothes)
		return;
    let weapon = _fighter.weaponId ? Pi.sample[_fighter.weaponId] : null,
		career_id = _fighter.career_id,
		_index = weapon?weapon.career_id.indexOf(career_id):null,
		m = weapon?weapon.module[_index]:null,
		weapon_mid = m?m[1]:null,
		w_eff,
		body_eff, //人物的全身特效
        model = weapon_mid?parts_cfg[weapon_mid].module:null,
		_n:any = {};
	if(m && m.length > 2){
		w_eff = m.slice(2);
	}
	if(!!_fighter.weapond !== !!model || _fighter.weapond && model && _fighter.weapond[0][0] != model[0][0]){
		_fighter.weapond = model;
	}
	if(!!_fighter.w_eff !== !!w_eff || _fighter.w_eff && w_eff && _fighter.w_eff[0] != w_eff[0]){
		_fighter.w_eff = w_eff;
	}
};
/**
 * @description 向后台发送战斗指令
 * @param {Json}param {result:{type:"terrain",data:[0,0,0]}} => 移动
 * 					  {skill_id:10002} => 手动释放技能
 * 					  {id:60005} => 手动点击怪物攻击
 * @param {Function}callback 通讯回调执行
 */
export const olFightOrder = (param,callback?)=>{
	let msg = {type:"app/same_fight@accept_fight_order",param:param};
	net_request(msg,(data)=>{
		callback && callback(data);
	});
};
/**
 * @description 修改fighter在场景中的状态
 * @param {Number} status >= 0 , 0:不做任何限制，1:手动选怪，....，1000:不参与战斗计算，最高限制
 */
export const change_status = function (status,callback?) {
	if(status_net)
		return;
	status_net = 1;
	let msg = {type:"app/same_fight@change_status",param:{status:status}};
	net_request(msg,(data)=>{
		callback && callback(data);
		status_net = 0;
		// console.log("change_status:",status,data)
	});
};

// ======================================== 本地
let __self, id, temp_self;
let toCallBack,_limit,
	cfg = {
		"monster":monster_cfg,
		"fighter":module_cfg
	},
	status_net;
/**
 * @description 更新属性
 */
export const setChangeData = function (before, target,now) {
	if(!before || !target)
		return;
	let keys = ["camp","damageList","curTarget","curHeadTarget","max_hpCount","hp","x","y","z","taskInfo","isProtect"];
	for(let k in target){
		if(keys.indexOf(k) >= 0 && target[k] != undefined){
			before[k] = target[k];
		}
	}
	if(before.show_hp<=0 && target.hp != undefined && target.hp>0)before.show_hp = target.hp;
}
/**
 * @description 初始化模型时装
 */
const initFighterModule = (f) => {
	if(!f.om){
		f.om = f.module;
	}
	if(!f.clothes){
		if(f.om != f.module){
			f.module = f.om;
			updateSelfModule(f);
		}
		return;
	}
	if(f.clothes === f.module)
		return;
	let cfg = clothes_module[f.clothes],
		career_id = f.career_id,
		index = cfg.career_id.indexOf(career_id),
		m = cfg.module[index],

		//用于判断任务武器是双手还是单手
		weapon = f.weaponId ? Pi.sample[f.weaponId] : null,
		_index = weapon?weapon.career_id.indexOf(career_id):null,
		m_eff = weapon?weapon.module[_index]:null,
		w_length;

	f.module = m;
	
	delete f.weapond;
};

/**
 *  @description 获取附灵给武器加的特效
 */
const updateSoulEffect = ( f ) => {
	let cfg = weapon_soul_base[f.ensoulClass],
		career_id = f.career_id,
		index = cfg.career_id.indexOf(career_id),
		eff = cfg.effect[index],

		//用于判断任务武器是双手还是单手
		weapon = f.weaponId ? Pi.sample[f.weaponId] : null,
		_index = weapon?weapon.career_id.indexOf(career_id):null,
		m_eff = weapon?weapon.module[_index]:null,
		w_length;


	if(m_eff && m_eff.length > 2){
		w_length = m_eff.slice(2);
	}
	if(eff){
		f.s_eff = eff;
	}else{
		delete f.w_eff;
	}
}
/**
 *  @description 获取星宿成就附加在人物的特效
 */
const updateStarEffect = ( f ) => {
	let achieve = equip_star_achieve,
		all_star = f.equipStar,
		career_id = f.career_id,
		body_eff,
		ach_info;
	for(let i in achieve){
		if(achieve[parseInt(i) + 1]){
			if(all_star >= achieve[i].star && all_star < achieve[parseInt(i) + 1].star){
				ach_info = achieve[i];
				break;
			}
		}else{
			if(all_star >= achieve[i].star){
				ach_info = achieve[i];
				break;
			}
		}
	}
	if(ach_info){
	let	index = ach_info.career_id.indexOf(career_id);
		body_eff = ach_info.effect[index];
	}
	if(body_eff){
		f.body_eff = body_eff;
	}
}
/**
 * @description 更新技能
 */
const updateSkill = (f, skills, now) => {
	let skillList = [];
	//创建技能 {id,index,level}
	for (let i = 0; i < skills.length; i++) {
		let s = skills[i],
			old = f.skill[getSkillIndex(skillList,s.id)] || {};
		let ss = createSkill(s[0], s[1], role_base[f.career_id]);
		ss.cdNextTime = old.cdNextTime || (ss.initialCDTime + now);
		skillList.push(ss);
		if(!old.id){
			if (ss.combo && ss.backSkill) {
                for (let j = 0; j < ss.backSkill.length; j++) {
                    let _s = createSkill(ss.backSkill[j], s[1]);
                    skillList.push(_s);
                }
            }
		}
	}
	f.skill = skillList;
};
const updateAttr = (f,attr,now?) => {
	for(let k in attr){
		if(k == "mapId" || k == "type")
			continue;
		f[k] = attr[k];
	}
};
/**
 * @description 计算距离
 * @param s 源对象
 * @param t 目标对象
 */
const calcDst = (s,t) =>{
	let xx = t.x - s.x, yy = t.y - s.y;
	return Math.sqrt(xx * xx + yy * yy);
}
/**
 * @description 检查目标跟自己的距离是否符合预期
 * @param target 目标对象 
 * @param d 预期距离 默认25米
 */
const limitModify = (target,d?) => {
	d = d || 25;
	//if(1)return true;
	if (!__self) return true;
	if (calcDst(__self,target)<d) return true;
	return false;
}
/**
 * @description 显示或隐藏fighter
 */
const refreshRand = (b)=>{
	let fighters = mapList;
	for(let i in fighters){
		if(fighters[i].type == "fighter" && __self && fighters[i].sid !== __self.sid){
			fighters[i].hidden = b;
			mgr.modify(fighters[i]);
			pet[fighters[i].mapId] && mgr.modify(pet[fighters[i].mapId]);
		}
	}
}
/**
 * @description 获取技能位置
 */
const getSkillIndex = function(skillList,id){
	for(let i=0;i<skillList.length;i++){
		if(id == skillList[i].id)return i;
	}
}
/**
 * @description 获取技能动作
 */
const getSkillAction = (e) => {
	let __cfg = pi_cfg.robot,
		f = mapList[e.fighter.mapId],
		_during,
		skill_action;
	//获取配置信息
	__cfg = __cfg?__cfg.robot_base:{};
	__cfg = __cfg[f.career_id] || role_base[f.career_id] || monster_base[f.career_id];
	_during = __cfg.normal_during;
	skill_action = __cfg.skill_action[e.skill.id];
	if(!skill_action)
		return null;
	else//技能动作
		return skill_action[0];
};

/**
 * @description 更新宠物
 */
const petMove = (p,delta) => {
	let n = 1.5,//靠近玩家的距离，停止移动
		m = 2.5,//开始移动距离，与玩家达到此距离开始移动
		f = mapList[p.id],
		during = delta/50,
		dd = calcDst(p,f),
		near = dd<=n,
		dst,
		change = false,
		_move = () => {
			dst = p.speed*during/calcDst(p.moveto,p);
			if(dst >= n){
				p.x = p.moveto.x;
				p.y = p.moveto.y;
				delete p.moveto;
			}else{
				p.x += (p.moveto.x-p.x)*dst;
				p.y += (p.moveto.y-p.y)*dst;
			}
			change = true;
		};
	if(near){//靠近玩家
		if(p.moveto){
			delete p.moveto;
			change = true;
		}
	}else if(p.moveto){//移动中
		p.moveto = {x:f.x,y:f.y};
		_move();
	}else if(dd > m){//达到开始移动距离
		p.moveto = {x:f.x,y:f.y};
		_move();
	}
	if(!change)
		return;
	if(p.moveto){
		p.lookat = {value:[p.moveto.x,p.moveto.y,0],sign:Date.now()};
		p.state = "run";
	}else{
		p.state = "standby";
	}
		
	// mgr.modify(p);
	mgr.setPos(p, [p.x, p.y, 0], p.lookat, cfg[p.type][p.module][p.state]);
};
/**
 * @description 更新宠物pos动作
 */
const updatePetPos = (p) => {
	let t = Date.now(),
	poseState = "pose";
	if(!p.poseTime)
		p.poseTime = t;
	if(t-p.poseTime > 1600 && p.state == poseState){
		p.state = "standby";
		mgr.setAnimator(p,cfg[p.type][p.module][p.state],false);
	}else if(t-p.poseTime > 10000 && p.state == "standby"){
		p.state = "pose";
		p.poseTime = t;
		mgr.setAnimator(p,cfg[p.type][p.module][p.state],false);
	}
}
/**
 * @description 更新特效位置
 */
const updateEffectPos = () => {
	for(let k in uiEffect){
		if(uiEffect[k].parent){
			let p = uiEffect[k].parent._show.old.transform.position;
			mgr.setOnlyPos(uiEffect[k],[p[0],p[2],p[1]]);
		}
	}
}
/**
 * @description 场景modify
 */
class MCrontal {
	static add (mesh){
		if(mesh.modify === undefined){
			mesh.modify = 0;
		}else if(mesh.modify > 0){
			return;
		}
		mesh.modify += 1;
		task(objCall, [MCrontal,"modify", [mesh]], 60000, 1);
		if(mesh.modify > 1){
			alert(`repeat add mesh modify event~`);
		}
	}
	static modify (mesh){
		mgr.modify(mesh);
		mesh.modify -= 1;
	}	
}
// ================================= 立即执行
setShow(handScene);
setList(mapList);
setShieldBack("fighter",refreshRand);
(renderHandlerList as any).add((msg)=>{
    if(msg.type !== "before"){
        return;
	}
	handScene.emptyFrame(msg.delta*1000);
});