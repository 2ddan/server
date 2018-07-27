// ========================================= 导入
//pi
import { getWidth, getHeight, getScale,open,destory } from "pi/ui/root";
import { Forelet } from "pi/widget/forelet";
import { objCall, call } from 'pi/util/util';
import { set as task } from 'pi/util/task_mgr';
import { GeometryRes } from 'pi/render3d/load';
import { THREE } from "pi/render3d/three";
import { getGlobal } from "pi/widget/frame_mgr";
//mod
import { Pi, cfg as pi_cfg, globalSend } from "app/mod/pi";
import { get as getDB } from "app/mod/db";
import { Cach } from "app/mod/cach";

//fight
import { Fight_common } from "fight/a/fore/fight_common";
import { FMgr } from "fight/a/fight";
import { monster_base } from "fight/b/common/monsterBase";
import { role_base } from "fight/b/common/role_base";
import { Init_Fighter,createSkill } from "fight/a/common/init_fighter";
//scene
import { mgr, mgr_data, renderHandlerList } from "app/scene/scene";
import { uiEffect } from "app/scene/anim/scene";
import { cuurUI,UiFunTable, initValue, effectList, getEffectId, setShieldBack,getShield } from "app/scene/ui_fun";
import { Mesh } from "app/scene/class"
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

export const forelet = new Forelet();
// ========================================= 导出
//进入试炼副本
let openExpFb = false,//是否进入试炼副本
	exp_monster = [],//已结记录过的当前地图死亡怪物
	curr_die_monster = [];//记录当前怪物死亡id
export let globalReceive = {
    "openExpFb": (arg?) => {// 3重置map_id数组，true进入经验副本，false退出经验副本
		if(arg === 3){
			// exp_monster = [];
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


export class handScene {
		/**
	 * @description 渲染列表
	 */
	static mapList = {}
	/**
	 * @description 宠物列表
	 */
	static pet = {}
	/**
	 * @description 缓冲模型列表
	 */
	static cach = new Cach()
	/**
	 * @description 清除
	 */
	static clear(){
		for(let k in this.mapList){
			mgr.remove(this.mapList[k]);
			if(this.pet[k]){
				mgr.remove(this.pet[k]);
			}
			delete this.mapList[k];
			delete this.pet[k];
		}
		this.cach.list.forEach(v => {
			for(let i=0,len = v.length;i<len;i++){
				mgr.remove(v[i]);
			}
		});
		this.cach.clear();
	}
	/**
	 * @description 一次性移动停止回调
	 */
	static stopMoveBack: Function
	static setStopMoveBack(back: Function){
		this.stopMoveBack = back;
	}
	static getSelf() {
		return __self;
	}

	static insert(e, now) {
		if (!id) id = getDB("user.rid");
		if (!handScene.mapList[e.fighter.mapId]) {
			//添加show_hp
			e.fighter.show_hp = e.fighter.hp;
			// 初始化时，应该看向场景中心(0,0,0)

			if (!e.fighter.lookat)
				e.fighter.lookat = { "value": [0, 0, 0], sign: Date.now() };
			e.fighter.state = "standby";
			//名字前加服务器
			if (e.fighter.type != "monster" && e.fighter.area>=0 && !(/S\d+ /).test(e.fighter.name)) {
				e.fighter.name = "S" + e.fighter.area + " " + e.fighter.name;
			}
			
			//task(objCall, [mgr, "create", [e.fighter, e.fighter.type]], 60000, 1);

			// let skillList = [];
			//创建技能 {id,index,level}
			// for (let i = 0; i < e.fighter.skill.length; i++) {
			// 	let s = e.fighter.skill[i];
			// 	let ss = createSkill(s.id, s.level, role_base[e.fighter.career_id]);
			// 	ss.cdNextTime = ss.initialCDTime + now;
			// 	skillList.push(ss);
			// }
			// e.fighter.skill = skillList;
			
			//插入的时候 把fighter 放在 list 里面
			handScene.mapList[e.fighter.mapId] = e.fighter;
			if(e.fighter.type == "monster"){
				e.fighter.scale = monster_base[e.fighter.sid].scale;
			}

			//处理武器
			if(e.fighter.weaponId){
				//初始化武器模型
				updateSelfModule(e.fighter);
			}
			if (e.fighter.sid == id && !e.fighter.isMirror) {
				__self = handScene.mapList[e.fighter.mapId];
				
				
				mgr.setOnlyPos(mgr_data.camera[mgr_data.name], [e.fighter.x, e.fighter.y, e.fighter.z]);
				// setCamera(mgr_data.camera[mgr_data.name],e.fighter,[e.fighter.x, e.fighter.y, e.fighter.z],{x:0,y:0,z:0});
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
			const cach = this.cach.one(e.fighter.sid);
			if(cach){
				e.fighter._show = cach;
				mgr.setOnlyPos(e.fighter,[e.fighter.x,e.fighter.y,0]);
				let sclae = UiFunTable.initHP(e.fighter,true);

				//初始化动作
				UiFunTable.modifyStatus(e.fighter,"attack_standby",false);
			}else
				mgr.create(e.fighter, e.fighter.type);
			// if(e.fighter.hidden == true){
			// 	mgr_data.threeScene[mgr_data.name].modify(e.fighter._show.old, ["visible"]);
			// }
			return true;
		}else{
			console.error("There is a same fighter which mapid is "+e.fighter.mapId);
			return false;
		}	
	};

	static remove = function (e, now) {
		let f = this.mapList[e.fighter],
			func = function () {
				if(f.type == "monster"){
					mgr.setOnlyPos(f,[1000,0,0]);
					//调用dispose
					// let mmm  = f._show.old.ref.impl.clone(true);
					f._show.time = Date.now();
					handScene.cach.add(f.sid,f._show);
					// let _res = new GeometryRes();
					// removeGeo(f._show.old.ref.impl,(data)=>{
					// 	_res.link = data;
					// 	_res.destroy();
					// });
				}else{
					task(objCall, [mgr, "remove", [f],mgr_data.name], 60000, 1);
					if(handScene.pet[e.fighter]){
						task(objCall, [mgr, "remove", [handScene.pet[e.fighter]],mgr_data.name], 60000, 1);
						delete handScene.pet[e.fighter];
					}
				}
				delete handScene.mapList[e.fighter];
				// console.log("show remove :: ",e.fighter);
			};
		
		if(f)cuurUI.push({"param": {func:func,time:f.remove},"fun": UiFunTable.remove});
	};

	static move = function (e) {
		const fighter = handScene.mapList[e.fighter];
		let drop_mark = false;
		if(!fighter || fighter.state =="die_fly" || fighter.state =="die"){
			return;
		}
		if (e.moveto.status && e.moving === 0) {
			UiFunTable.modifyStatus(fighter,"standby",false);
			// fighter.moving = 0;
			//处理第一个fighter移动停止的回调
			this.stopMoveBack && ((back,ev)=>{
				setTimeout(() => {
					back(ev);
				}, 0)
				return true;
			}
			)(this.stopMoveBack,e) && this.setStopMoveBack(null);
		} else {
			UiFunTable.modifyStatus(fighter,"run",false);
			// fighter.moving = Date.now();
		}
		if (fighter.sid === id && fighter.playAnim){
			delete fighter.playAnim;
		}

		if(e.moving !== 0){
			// if(fighter.sid == 10000){
			// 	console.log("move: ",e);
			// }
			fighter.lookat = {
				"value": [e.moveto.x, e.moveto.z, 0],
				sign: Date.now()
			};
        //看向点击操作的方向
        }
		mgr.setPos(fighter, [fighter.x, fighter.y, 0], fighter.lookat);

		if(!__self || mgr_data.name == "loginscene" || mgr_data.name == "uiscene")
            return;
        let c = mgr_data.camera[mgr_data.name],
            cp = c._show.old.transform.position,
            fp = __self._show.old.transform.position,
            r;

        if(fighter == __self && (cp[0] != fp[0] || cp[2] != fp[2])){
            setCamera(c,__self,fp,e.moveto);
		}
		if(__self){
			let fighterPosition = [fp[0],fp[1],fp[2]];

			if(cuurUI.length == 0){
				cuurUI.push({ "param": {msg:fighterPosition},"fun": UiFunTable.fighter_position });	
				drop_mark = true;
				return;
			}
			for(var i in cuurUI){
				if(cuurUI[i]){
					if(cuurUI[i].fun.name == "fighter_position"){
						cuurUI[i].param.msg = fighterPosition;
						drop_mark = true;
						return;
					}
				}
			}
			if(!drop_mark){
				cuurUI.push({ "param": {msg:fighterPosition},"fun": UiFunTable.fighter_position });
			}
			
            // globalSend("fighter_position",fighterPosition);
		}
	};

	static spreadSkill = function (e, now) {
		
	};
	static revive(e){
		const fighter = handScene.mapList[e.fighter];
		UiFunTable.modifyStatus(fighter,"standby",false);
		UiFunTable.modifyHP(fighter);
	}
	static damage = function (e, now) {
		let fighter = handScene.mapList[e.fighter];
		let curTarget = handScene.mapList[e.target];
		e = Common.shallowClone(e);
		if(!fighter){
			console.warn("Don't find the fighter who is ",e.fighter);
			return;
		}
		if(!curTarget)return;
		
		curTarget.self = (curTarget.mapId == __self.mapId);
		fighter.self = (fighter.mapId == __self.mapId);
		e.curTarget = e.curTarget;
		e.target = curTarget;
		e.fighter = fighter;
		e.skill = fighter.skill[getSkillIndex(fighter.skill,e.skill)];
		e.time = now + e.skill.bloodDelayTime;
		// MCrontal.add(curTarget);	
		cuurUI.push({ "param": e, "fun": UiFunTable.hitEffect });
		let dieMoster = [];

		if(openExpFb){
			for(let key in handScene.mapList){
				let me = handScene.mapList[key];
				if(me.type == "monster" && exp_monster.indexOf(me.mapId) == -1 && me.hp <= 0){
					curr_die_monster.push(me.sid+"-"+me.level);
					exp_monster.push(me.mapId);
				}
			}
			if(curr_die_monster.length>0){
				globalSend("monsterDied",curr_die_monster.join(","));
				curr_die_monster = [];
			}
		}

		modifyTargetHead(fighter,e);
	};

	//添加buff
	static addBuff = function (e, now) {
		//没特效
		//cuurUI.push({"param":e,"fun":UiFunTable.buffEffect});
	};

	//激发buff
	static effect = function (e, now) {
		let fighter = handScene.mapList[e.fighter];
		let curTarget = handScene.mapList[e.target];
		if(!curTarget)return;
		// setChangeData(fighter, e.fighter,now);
		// setChangeData(curTarget, e.target,now);
		e.target = curTarget;
		e.fighter = fighter;
		if(fighter.mapId == __self.mapId || curTarget.mapId == __self.mapId){
			// if (curTarget.hp<=0 ) {
				// MCrontal.add(curTarget);
				cuurUI.push({ "param": e, "fun": UiFunTable.excitationBuff });
			// }
		}else if(e.effect == "hp"){
			curTarget.show_hp += e.value;
			UiFunTable.modifyHP(curTarget);
		}
	};

	//清除buff
	static clearBuff = function (e, now) {

	};

	//释放技能
	static useSkill = function (e, now) {
		let _play;
		let fighter = handScene.mapList[e.fighter];
		if(!fighter){
			return;
		}
		let curTarget = handScene.mapList[e.curTarget];
		let index = getSkillIndex(fighter.skill,e.skill);
		if(index === undefined){
			return;
		}
		let ss = fighter.skill[index];
		let target_mark = false;
		//先改变朝向
		if (fighter.skill[index].hand !== 2 && curTarget && (fighter.lookat.value[0] != curTarget.x || fighter.lookat.value[1] != curTarget.y)) {
			fighter.lookat = { "value": [curTarget.x, curTarget.y, curTarget.z], sign: Date.now() };
			mgr.setPos(fighter,[fighter.x,fighter.y,0],fighter.lookat);
		}
		//更新技能动作
		if(fighter.skill[index].hand !== 2){
			_play = UiFunTable.updateUseSkill(fighter, getSkillAction(e));
		}
		// if(_play)objCall(mgr,"setAnimationOnce",[fighter, fighter.playAnim, fighter.lookat,[e.fighter.x, e.fighter.y, e.fighter.z]]);
		// 技能特效
		skillEffect(fighter,ss,now);
		//震屏
		if(fighter.type == "monster" || id == fighter.sid){
			if(fighter.skill[index].shake){
				cuurUI.push({"param": {fighter:fighter,skill:ss,index:index,time:Date.now() + fighter.skill[index].shakeTime},"fun": UiFunTable.shakeEffect});
				// let _time = {fighter:fighter,skill:ss,index:index,time:Date.now() + fighter.skill[index].shakeTime};
				// UiFunTable.shakeEffect(_time);

			}
			if(fighter.skill[index].skillSound){
				cuurUI.push({ "fun": UiFunTable.sound, "param": {name:fighter.skill[index].skillSound,time:now+fighter.skill[index].skillSoundDelay} });
			}
		}
		//插入BOSS头像		
		modifyTargetHead(fighter,e);
	};
	//更新技能
	static refreshSkill = (e,now) => {
		// console.log("refreshSkill",e);
		let f = handScene.mapList[e.fighter];
		updateSkill(f,e.skill,now);
	};
	//更新技能
	static refreshWeapon = (e,now) => {
		// console.log("refreshSkill",e);
		let f = handScene.mapList[e.fighter];
		f.weaponId = e.weaponId;
		updateSelfModule(f);
	};
	//更新宠物
	static refreshPet = (e,now) => {
		// console.log("refreshSkill",e);
		let f = handScene.mapList[e.fighter];
		updatePet(e.pet,f);
	};
	//更新时装
	static refreshClothes = (e,now) => {
		// console.log("refreshSkill",e);
		let f = handScene.mapList[e.fighter];
		if(f.clothes == e.clothes)
			return;
		f.clothes = e.clothes;
		initFighterModule(f);
		// handScene.updateModule(__self.mapId,{module:f.module});
	};
	//更新附灵特效
	static refreshEnsoulClass = (e,now) => {
		let f = handScene.mapList[e.fighter];
		if(f.ensoulClass == e.ensoulClass)
			return;
		f.ensoulClass = e.ensoulClass;
		updateSoulEffect(f);
	}
	//更新星宿成就特效
	static refreshEquipStar = (e,now) => {
		let f = handScene.mapList[e.fighter];
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
			let img: any = new Mesh(-42,startX - j * 80.5,100);
			j++;
			img.res = "skill/" + skill.icon + ".png";
			img.name = skill.name;
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
				let img: any = new Mesh(-42,startX - j * 80,100);
				j++;
				img.res = "images/skill_lock.png";
				img.name = "未激活";
				img.isClose = true;
				img.type = "skill_img";
				img.rayID = -100001;
				mgr.create(img, img.type, node._show.old);
			}
		}

	};

	static getFighters(){
		let arr = [];
		for(let e in handScene.mapList){
			if(handScene.mapList[e].type != "monster"){
				arr.push(e);
			}
		}
		return arr;
	};

	static getGroupFighters(){
		let arr = [];
		for(let e in handScene.mapList){
			if(handScene.mapList[e].groupId == __self.groupId){
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
		let f = handScene.mapList[mapId];
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
		for(let k in handScene.pet){
			let p = handScene.pet[k];
			petMove(p,delta);
			updatePetPos(p);
			updateEffectPos();
		}
	}
	/**
	 * @description 重新插入模型
	 */
	static reInsert(fighters,reset?){
		let func = (f,type?) => {
			delete f._show;
			if (f.sid == id)
				// setCamera(mgr_data.camera[mgr_data.name],f,[f.x,f.y,f.z]);
				mgr.setCameraPos(mgr_data.camera[mgr_data.name], [f.x, f.y, f.z]);
			f.state = "standby";
			mgr.create(f, type || f.type);
			// if(f.hidden == true || (type && handScene.mapList[f.id].hidden == true)){
			// 	mgr_data.threeScene[mgr_data.name].modify(f._show.old, ["visible"]);
			// }
		}
		//如果场景没重刷，则需要清楚已经移除的模型
		if(!reset){
			for(let k in handScene.mapList){
				if(!fighters.get(k)){
					mgr.remove(handScene.mapList[k]);
					delete handScene.mapList[k];
				}
			}
		}
		fighters.forEach(f => {
			let mf = handScene.mapList[f.mapId],
				mp = handScene.pet[f.mapId];
			if(mf && reset){
				func(f);
			}
			if(mp && reset){
				func(mp,"pet");
			}
			if(!mf){
				handScene.insert({fighter:f},Date.now());
			}
		});
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
		for(let i in handScene.mapList){
			if(handScene.mapList[i].sid == player.role_id){
				fighter = handScene.mapList[i];
				break;
			}
		}
	}
	let p = pet_module[pId],
		cp = handScene.pet[fighter.mapId],
	x = fighter.x,
	y = fighter.y;
	if(handScene.pet[pId] && handScene.pet[pId].module === p.module){
		return;
	}
	//删除老的宠物
	if(cp){
		cp.x = x;
		cp.y = y;
		mgr.remove(cp);
	}
	
	handScene.pet[fighter.mapId] = Init_Fighter.initPet(cp,p,fighter);
	if(!cp){
		handScene.pet[fighter.mapId].name = Common.fromCharCode(handScene.pet[fighter.mapId].name);
	}
	//单独为玄晶兽添加宠物特效
	if(handScene.pet[fighter.mapId].module == 45007){
		handScene.pet[fighter.mapId].pet_eff = "eff_pet_1";
	}
	//创建模型
	mgr.create(handScene.pet[fighter.mapId], "pet");
	if(fighter.hidden == true){
		mgr_data.threeScene[mgr_data.name].modify(handScene.pet[fighter.mapId]._show.old, ["visible"]);
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
 * @description 更新技能
 */
export const updateSkill = (f, skills, now) => {
	let skillList = [];
	//创建技能 {id,index,level}
	for (let i = 0; i < skills.length; i++) {
		let s = skills[i],
			old = f.skill[getSkillIndex(skillList,s.id)] || {};
		if(s[1]==0)
			continue;
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

export const refreshClothes = (e,now) => {
	let f = FMgr.scenes.fighters.get(e.fighter);
	if(f.clothes == e.clothes)
		return;
	f.clothes = e.clothes;
	initFighterModule(f);
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
 * 插入更新头像血条
 */
const modifyTargetHead = (fighter,e) => {
	let target_mark = false;
	if(fighter.curTarget && (mgr_data.name == "public_boss" || mgr_data.name == "wild" || mgr_data.name == "gang_boss" || mgr_data.name == "endless_boss" || (FMgr.scenes && FMgr.scenes.type == "fight"))){
		if(handScene.mapList[fighter.curTarget] && handScene.mapList[fighter.curTarget].type == "monster" && handScene.mapList[fighter.curTarget].show_type == 1 && handScene.mapList[fighter.curTarget].name.indexOf("宝箱守卫") == -1){			
			if(cuurUI.length == 0){
				cuurUI.push({ "param": { head: null, f: e ,mapList:handScene.mapList }, "fun": UiFunTable.targetHead });	
				target_mark = true;
				return;
			}
			for(var i in cuurUI){
				if(cuurUI[i]){
					if(cuurUI[i].fun.name == "targetHead"){
						target_mark = true;
						cuurUI[i].param.f =  e;
						cuurUI[i].param.mapList = handScene.mapList;
						return;
					}
				}
			}
			if(!target_mark){
				cuurUI.push({ "param": { head: null, f: e ,mapList:handScene.mapList }, "fun": UiFunTable.targetHead });
			}
		}
	}
}
 
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
	// if(before.show_hp<=0 && target.hp != undefined && target.hp>0)before.show_hp = target.hp;
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
 * @description 递归查找geometry属性并移除
 */
const removeGeo = (data,cb?) => {
	if(data.geometry){
		cb && cb(data.geometry)
	}
	if(data.children){
		data.children.forEach(v=>{
			removeGeo(v,cb)
		})
	}
}

/**
 * 计算两点的直线与y正方向的夹角
 * @param src 
 * @param target 
 */
const calcRang = (src, target) => {
	let zero = new THREE.Vector3(0,0,12),a = new THREE.Vector3(target.x-src.x,0,target.y-src.y),r = zero.angleTo(a);
	// console.log(a,r);
	if(a.x<0){
		r = Math.PI*2-r;
	}
	r+=Math.PI;
	// if(r>=Math.PI*2){
	// 	r-=Math.PI*2;
	// }
	// console.log(r,"=========================");
	return r;
}
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
	let fighters = handScene.mapList;
	for(let i in fighters){
		if(fighters[i].type == "fighter" && __self && fighters[i].sid !== __self.sid){
			fighters[i].hidden = b;
			mgr.modify(fighters[i]);
			handScene.pet[fighters[i].mapId] && mgr.modify(handScene.pet[fighters[i].mapId]);
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
		f = handScene.mapList[e.fighter],
		_during,
		skill_action;
	//获取配置信息
	__cfg = __cfg?__cfg.robot_base:{};
	__cfg = __cfg[f.career_id] || role_base[f.career_id] || monster_base[f.career_id];
	_during = __cfg.normal_during;
	skill_action = __cfg.skill_action[e.skill];
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
		f = handScene.mapList[p.id],
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
	p.playAnim = {"name" : cfg[p.type][p.module][p.state],"isOnce" : p.state == "standby"? true : false }
	mgr.setAnimator(p);
	// mgr.modify(p);
	mgr.setPos(p, [p.x, p.y, 0], p.lookat);
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
		p.playAnim = {"name" : cfg[p.type][p.module][p.state],"isOnce":true}
		mgr.setAnimator(p);
	}else if(t-p.poseTime > 10000 && p.state == "standby"){
		p.state = "pose";
		p.poseTime = t;
		p.playAnim = {"name" : cfg[p.type][p.module][p.state],"isOnce":false}
		mgr.setAnimator(p);
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
 * @description 技能特效，连招特效一起计算，到时释放
 * @param f 
 * @param skill 
 * @param time 
 */
const skillEffect = (f,skill,time) => {
	let func = (_f,_skill,_time) => {
		for(let j = 0,len = _skill.skillEffect.length;j<len;j++){
			cuurUI.push({ "param": { fighter:_f,skill:_skill,index:j,time:_time+_skill.skillEffect[j][1] }, "fun": UiFunTable.skillEffect });
		}
	};
	func(f,skill,time);
	if(skill.backSkill){
		
		for(let i=0,len = skill.backSkill.length;i<len;i++){
			let index = getSkillIndex(f.skill,skill.backSkill[i])
			let s = f.skill[index];

			if (s.shake && id == f.sid) {
				cuurUI.push({"param": {fighter:f,skill:s,index:index,time:time + skill.actionTime + s.shakeTime},"fun": UiFunTable.shakeEffect});
			}
			time += s.actionTime;
			func(f,s,time);
		}
	}
}
/**
 * @description 两点距离公式
 * @param t 
 * @param p 
 */
const cDd = (t,p) => {
    return Math.sqrt((p.x - t.x) * (p.x - t.x) + (p.y - t.y) * (p.y - t.y))
};
/**
 * @description 设置摄像机位置
 * @param c 
 * @param f 
 * @param s 
 * @param n 
 */
const setCamera = (c,f,fp,moveto?) => {
	// let d = cDd({x:c[0],y:c[2]},{x:f[0],y:f[2]}),r;
	let oldTotate = c.fixto;
	mgr.setOnlyPos(c, [fp[0],fp[2],0]);
	if(moveto){
		c.fixto = calcRang(f,{x:moveto.x,y:moveto.z})||oldTotate;
		// console.log(c.fixto);
		//Util.slope(fighter,{x:e.moveto.x,y:e.moveto.z}) || 0;
	}
	// if(!c.fixing && !isNaN(c.fixto)){
		// cuurUI.push({ "param": {camera:c}, "fun": UiFunTable.rotateCamera });
		
		// c.fixing = true;
	// }
	if(isNaN(c.fixto)){
		c.fixto = oldTotate;
	}
};
//相机旋转
const rotateCamera = () => {
	let DELAY = 300,
		rotate: number,
		diff: number,
		dtime: number,
		perRotate = Math.PI/400,
		camera = mgr_data.camera[mgr_data.name],
		per : number,
		abs : number,
		mark : number,
		func = () => {
			if(camera.rotate[1]>=Math.PI*2){
				camera.rotate[1]-=Math.PI*2;
			}
			if(camera.rotate[1]<0){
				camera.rotate[1]+=Math.PI*2;
			}
			camera.time = Date.now()+10000000;
			camera.fixing = false;
		};
	
	if(!camera || mgr_data.name !== "wild" || (FMgr.scenes && FMgr.scenes.type == "fight")) return;
	if(camera._show){
		rotate = camera._show.old.transform.rotate[1];
	}else{
		return;
	}
	
	diff = camera.fixto-rotate;
	if(!__self){
		return;
	}
	// console.log(__self.moving,__self.state);
	if(__self.moving === 0 || diff == 0){
		func();
		camera.fixto = rotate;
		return;
	}else if(__self.moving > 0 && !camera.fixing){
		camera.time = Date.now()+DELAY;
		camera.fixing = true;
		return;
	}
	dtime = Date.now() - camera.time;
	if(dtime <= 0){
		return;
	}
	camera.time = Date.now();
	perRotate *= (dtime/16);
	abs = Math.abs(diff);
	mark = abs/diff;
	if(abs>Math.PI){
		rotate += mark*2*Math.PI;
		diff = camera.fixto-rotate;
	}
	per = diff/perRotate;
	abs = Math.abs(per);
	mark = per/abs;
	per = abs<=1?diff:(perRotate*mark);
	mgr.setRotate(camera,[0,rotate+per,0]);
	camera.rotate[1] = rotate+per;
	if(abs<=1){
		func();
	}
}
/**
 * @description 全局帧回调
 */
const permanent = ()=>{
	rotateCamera();
	// let t = Date.now();
	// handScene.cach.list.forEach((v, j) => {
	// 	for(let i = 0, len = v.length; i < len; i++){
	// 		if (t - v[i].time > 10000) {
	// 			v.splice(i, 1);
	// 			i--;
	// 			len--;
	// 		}
	// 	}
	// });
}

// ================================= 立即执行
setShieldBack("fighter",refreshRand);
(renderHandlerList as any).add((msg)=>{
    if(msg.type !== "before"){
        return;
	}
	handScene.emptyFrame(msg.delta*1000);
});
getGlobal().setPermanent(permanent);