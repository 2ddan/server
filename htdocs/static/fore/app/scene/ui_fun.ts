/**
 * @description 战斗表现
 */
//=============================引入mod下文件

//=============================引入同目录文件
import { mgr, mgr_data } from "./scene";
import {module_cfg as _module} from "app/scene/plan_cfg/module_config";
import {monster_cfg as _monster} from "app/scene/plan_cfg/monster_config";
import { base_cfg } from "cfg/a/base_cfg";
import { Util } from "app/mod/util";
import * as root from "pi/ui/root";
import { Common } from "app/mod/common";
import { Music } from "app/mod/music";
import { objCall } from 'pi/util/util';
import * as Fight from "fight/a/common/fight";
import { set as task } from 'pi/util/task_mgr';
import { Pi, globalSend } from "app/mod/pi";
import { ShowFunTable } from "app_b/widget/drop_out";

let randomNum: number,
    //震屏
    shakeIndex = 0,
    shakeTimeRef,
    shakeTime = 25,
    shakeArray = [[0, 0, 0.2], [0, 0, -0.2], [0, 0, 0.2], [0, 0, -0.2]],
    //伤害飘字列表
    random : any = {},
    roleId = 0,
    //用于特效
    effectID = 2,
    beforeTarget,
    _cfg = {
        "monster":_monster,
        "fighter":_module
    },
    shield = {
        effect : false,
        shake : false,
        fighter : false
    };

let time = Date.now();


export let cuurShow = []; //战斗中UI的表现列表

//战斗表现事件列表
export let cuurUI = [];
//战斗特效列表，用于特效播放完毕之后清除
export let effectList: any = {};
//设置游戏角色id
export const setRole = (id) => {
    roleId = id;
}
/**
 * @description 设置屏蔽状态
 */
export const setShield = (key,b) => {
    shield[key] = b;
    let back = shield[key+"back"];
    back && back(b);
}
export const getShield = (key) => {
    return shield[key];
}
/**
 * @description 屏蔽设置回调
 */
export const setShieldBack = (key,callback) => {
    shield[key+"back"] = callback;
}
/**
 * @description 将值初始化
 */
export const initValue = () => {
    cuurUI = [];
    effectList = {};
    cuurShow = [];
}

export const getEffectId = (type?) => {
    let id = ++effectID;
    // if(type)
        // console.log(type,id);
    return id;
}

export class UiFunTable {
    /**
     * @description 更新战斗者的攻击动作
     */
    static updateUseSkill(mesh, skill) {
        if (!skill || !mesh || !mesh._show || !mesh._show.old || !mesh._show.old.ref) {
            return;
        }
        let _id = getEffectId("updateUseSkill");
        mesh.playAnim = { "name": skill, "id": _id, "isOnce": true };
        effectList[_id] = {
            "type": "playAnim",
            "obj": mesh,
            "locTime":Date.now()
        }
        mgr.modify(mesh);
        return true;
    }

    /**
     * @description 一次性动作结束回调,但是死亡不走
     */
    static aniBack(id) {
        let b = false,_t = Date.now();
        if (!effectList[id]) {
            // console.log(`${id}/${effectID}:${effectList[id]}`);
            return b;
        }
        if (effectList[id].type === "effect") {
            mgr.remove(effectList[id].obj);
            b = true;
        } else if (effectList[id].type === "playAnim") {
            let _obj = effectList[id].obj;
            //人死了就不改待机了
            if (_obj.hp > 0) {
                let anim = _cfg[_obj.type][_obj.module]["attack_standby"];
                _obj.state = "attack_standby";
                _obj.playAnim = { "name": anim }
                mgr.modify(_obj);
            }
            b = true;
        }
        if(b){
            delete effectList[id];
        }
        for(let k in effectList){
            if(_t - effectList[k].locTime > 10000){
                effectList[k].type === "effect" && effectList[k].obj._show && mgr.remove(effectList[k].obj);
                delete effectList[k];
            }
        }
        return b;
    }

    static shakeEffect = function (arg, index, now) {
        let f = arg.fighter,
            skill = arg.skill,
            target = arg.target;
        //未到出现特效的时间
        if (arg.time > Date.now()) {
            return;
        }
        delete cuurShow[index];
        //检查是否屏蔽震屏
        if(shield.shake){
            return;
        }
        if (shakeTimeRef) {
            clearTimeout(shakeTimeRef);
            shakeTimeRef = undefined;
            shakeIndex = 0;
            let _s = mgr_data.sceneTab[mgr_data.name];

            if(_s && _s.handScene) {
                _s.locCamera = 0;
                let _f = _s.own[_s.locCamera];
                mgr.setPos(mgr_data.camera[mgr_data.name], [_f.x, _f.y, _f.z]);
            }
        }

        shakeTimeRef = setTimeout(function () {
            shakeRoot(mgr_data.camera[mgr_data.name], shakeArray, f.skill[arg.index].ShakeFloat || 0, f);
        }, shakeTime);
    }

    static damageCartoon(arg, index) {
        let p, s, a, o , x;
        let cfg: any = base_cfg;
        let isWhile = true;
        if (arg.type == 1) {
            p = cfg.buffValueP;
            s = cfg.buffValueS;
            a = cfg.buffValueA;
        } else if (arg.type == "drop") {
            p = cfg.dropP;
            s = cfg.dropS;
            a = cfg.dropA;
        } else {
            //对怪物的伤害冒字
            if(arg.node.type == "damage"){
                if(!random[index]){
                    let Rand = Math.random();
                    random[index] = 1 + Math.round(Rand * 3); //四舍五入
                }
                
                p = cfg.damage_type[random[index] - 1].damagePZ; //高度
                x = cfg.damage_type[random[index] - 1].damagePX; //左右偏移量
                s = cfg.damage_type[random[index] - 1].scale; //缩放
                o = cfg.damage_type[random[index] - 1].opacity //透明度
                a = {"value":[254,254]};
            }else if(arg.node.type == "damageM"){  //怪物对人物的伤害冒字
                p = cfg.damageM_type[0].damagePZ //高度
                x = cfg.damageM_type[0].damagePX //左右偏移量
                s = cfg.damageM_type[0].scale //缩放
                o = cfg.damageM_type[0].opacity //透明度
                a = {"value":[254,254]};
            }else if(arg.node.type == "critical"){ //暴击的伤害冒字
                p = cfg.critical_type[0].damagePZ //高度
                x = cfg.critical_type[0].damagePX //左右偏移量
                s = cfg.critical_type[0].scale //缩放
                o = cfg.critical_type[0].opacity //透明度
                a = {"value":[254,254]};
            }else if(arg.node.type == "stealHP"){ //其他的伤害冒字
                p = {"value":[40,5,5,5,0,0,0,10,15,15,15,20,20,20]};
                s = {"value":[ 0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75]};
                a = {"value":[254,254]};
                o = {"value":[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]};
            }else{
                p = {"value":[40,5,5,5,0,0,0,10,15,15,15,20,20,20]};
                s = {"value":[ 0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75]};
                a = {"value":[254,254]};
                o = {"value":[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]}
            }
        }

        let node = arg.node;
        if (!node.frameIndex) {
            node.frameIndex = 0;
        }
        let frameIndex = node.frameIndex;
        // frameIndex = Math.floor(frameIndex * cuurShow[index].delta);
        if(x){node.x = node.x + x.value[frameIndex];}
        node.z = node.z + p.value[frameIndex];
        node.scale = s.value[frameIndex];
        node.transp = a.value[frameIndex];
        if(o) {node.opacity = o.value[frameIndex];}
        // if(frameIndex >= p.value.length-1){
        //     console.log(111111111111111,frameIndex,p.value.length-1);
        // }
        if (frameIndex == p.value.length-1) {
            delete cuurShow[index];
            delete random[index];
            
            mgr.remove(arg.node,node.scene);
            return
        }
        mgr.modify(node);
        // mgr.setDamage(node, node.scale);
        // mgr.setPos(node, [node.x / 100, node.y / 100, node.z / 100]);
        node.frameIndex++;
    }

    //创建技能特效
    static skillEffect(arg, index, now) {
        let f = arg.fighter,
            skill = arg.skill,
            ss = getSkill(arg.fighter.skill,skill.id),
            eff = ss.skillEffect[arg.index],
            effectTime, skillEffectObj, effctClearTime,
            len = ss.skillEffect.length,
            ce,
            rl;
        if (arg.time + eff[1] > now) {
            return; //技能特效延迟
        }
        if(len > 0){
            ce  = (se) => {
                let _id = getEffectId("skillEffect");
                let skillMirror:any = {
                    "id": { "id": _id, "name": f.sname },
                    "effect": se[0],
                    "isOnce": true,
                    "x":0,
                    "y":0,
                    "z":0
                };
                effectList[_id] = {
                    "type": "effect",
                    "obj": skillMirror,
                    "locTime":Date.now()
                }
                return skillMirror;
            };
            rl = (se) => {
                //se[1]:----1:目标身上， 2：自己身上， 3：场景上,  4:自己武器上，5：自己外层，6：目标外层
                if (se[2] == 1) {

                    for (let i = 0; i < arg.target.length; i++) {
                        let target = arg.target[i],sm;
                        if (!target || !target._show || !target._show.old || !target._show.old.ref)
                            continue;
                        effctClearTime = now + effectTime;
                        //console.log("effect:"+effectID)
                        sm = ce(se);
                        effectPos(target,sm,ss,"skill",se);
                        controlShield("effect",()=>{
                            mgr.create(sm, "effect", target._show.old.children[0]); //将技能特效添加到目标身上
                        },f.sid);
                    }

                } else if (se[2] == 2) {
                    if (!f || !f._show || !f._show.old || !f._show.old.ref) {
                        delete cuurUI[index];
                        return;
                    }
                    let sm = ce(se);
                    effectPos(f,sm,ss,"skill",se);
                    //console.log("effect:"+effectID)
                    controlShield("effect",()=>{
                        mgr.create(sm, "effect", f._show.old.children[0]); //将技能特效添加到自己身上
                    },f.sid);
                } else if (se[2] == 3) {
                    let sm = ce(se);
                    sm.x = f.x;
                    sm.y = f.y;
                    sm.lookat = f.lookat;
                    effectPos(f,sm,ss,"skill",se);
                    controlShield("effect",()=>{
                        mgr.create(sm, "effect");//将技能特效添加到场景上
                    },f.sid);
                } else if (se[2] == 4) {
                    let sm = ce(se);
                    effectPos(f,sm,ss,"skill",se);
                    controlShield("effect",()=>{
                        mgr.create(sm,"effect",f._show.old.children[0].children[1]);//将技能特效添加到武器上
                    },f.sid);

                } else if (se[2] == 5) {
                    let sm = ce(se);
                    effectPos(f,sm,ss,"skill",se);
                    //console.log("effect:"+effectID)
                    controlShield("effect",()=>{
                        mgr.create(sm, "effect", f._show.old); //将技能特效添加到自己外层
                    },f.sid);
                } else if (se[2] == 6) {
                    for (let i = 0; i < arg.target.length; i++) {
                        let target = arg.target;
                        if (!target || !target._show || !target._show.old || !target._show.old.ref)
                            continue;

                        effctClearTime = now + effectTime;
                        let sm = ce(se);
                        effectPos(target,sm,ss,"skill",se);
                        //console.log("effect:"+effectID)
                        controlShield("effect",()=>{
                            mgr.create(sm, "effect", target._show.old); //将技能特效添加到目标外层
                        },f.sid);
                    }
                }
            }
            //播放技能特效，支持多个
            // for(let i=0;i<len;i++){
                rl(eff);
            // }
        }
        
        delete cuurUI[index]; //从cuurUI中删除本方法(停止运行)
    }

    //定时删除网格
    static clearMesh(arg, index, now) {
        let mesh = arg.mesh;
        if (!mesh || !mesh._show || !mesh._show.old || !mesh._show.old.ref) {
            delete cuurUI[index];
            return;
        }
        let clearTime = arg.clearTime;
        //	未到删除时间
        if (clearTime > now) {
            return;
        }
        mgr.remove(mesh);
        delete cuurUI[index];
    }

    //定时修改网格
    static modifyMesh(arg, index, now) {
        let mesh = arg.mesh;
        if (!mesh || !mesh._show || !mesh._show.old || !mesh._show.old.ref) {
            delete cuurUI[index];
            return;
        }

        let newData = arg.newData; //新数据
        let clearTime = arg.clearTime;

        //	未到更新时间
        if (clearTime > now) {
            return;
        }

        for (let k in newData) {
            if (mesh.hasOwnProperty(k)) {
                mesh[k] = newData[k];
            }
        }
        mgr.modify(mesh);
        delete cuurUI[index];
    }

    //被击特效
    static hitEffect(arg, index, now) {
        let f = arg.fighter,
            skill = arg.skill,
            ss = arg.skill,
            target = arg.target,
            //如果是自己则不飘字
            _damageFunc = () => {
                //随机一个伤害出现点的x坐标
                let arr = [-5, -3, 0, 3, 5],
                type, value = 0,
                text_type, goal, isCrits = 0;
                randomNum = arr[Math.ceil(Math.random() * 10) % 5];
                if (target.camp == 1) goal = "f";
                else goal = "t";
        
                if (arg.r.dodge) { //闪避
                    text_type = goal + "_dodge";
                    type = "dodge";
                } else if (arg.r.damage) { //伤害
                    text_type = goal + "_damage";
                    if(arg.target.camp == 1){
                        type = "damageM";
                    }else{
                        type = "damage";
                    }
                    value = arg.r.damage;
                    target.show_hp -= arg.r.damage;
                    target.hp = target.show_hp;
                    if (arg.r.critical) { //暴击
                        text_type += "_critical";
                        if(arg.target.camp == 1){
                            type = "damageM";
                        }else{
                            type = "critical";
                        }
                        isCrits = 1;
                    } else text_type += "_normal";
                }
                //过滤非自身造成的伤害
                if(f.sid !== roleId && target.sid !== roleId)
                    return;
                if (type) {
                    let node = {
                        x: target.x * 100 + randomNum,
                        y: target.y * 100 - 100,
                        z: target.z * 100 + base_cfg["damageP"].value[0],
                        scale: base_cfg["damageS"].value[0],
                        transp: base_cfg["damageA"].value[0],
                        "r": arg.r,
                        "text_type": text_type,
                        "type": type,
                        "isCrits": isCrits,
                        "goal": goal,
                        "value": value,
                        "scene": mgr_data.name
                    };
                    node = mgr.yszzFight.damage(node);
                    mgr.create(node, "damage");
                    if (UiFunTable.damageCartoon) {
                        let p = {
                            "fun": UiFunTable.damageCartoon,
                            "param": {
                                "node": node
                            }
                        };
                        cuurUI.push(p);
                    }
                }
        
        
                if (arg.r.steal) { //吸血
                    if (target.camp == 1) goal = "t";
                    else goal = "f";
                    text_type = goal + "_stealHP";
                    type = "stealHP";
                    value = arg.r.steal;
                    isCrits = 0;
                    if (arg.r.criticalPH) { //暴击
                        text_type += "_critical";
                        isCrits = 1;
                    } else text_type += "_normal";
                    let _node = {
                        x: f.x * 100 + randomNum,
                        y: f.y * 100 - 100,
                        z: f.z * 100 + base_cfg["damageP"].value[0],
                        scale: base_cfg["damageS"].value[0],
                        transp: base_cfg["damageA"].value[0],
                        "isCrits": isCrits,
                        "text_type": text_type,
                        "type": type,
                        "goal": goal,
                        "value": value,
                        "scene": mgr_data.name
                    };
                    _node = mgr.yszzFight.damage(_node);
                    mgr.create(_node, "damage");
                    if (UiFunTable.damageCartoon) {
                        let _p = {
                            "fun": UiFunTable.damageCartoon,
                            "param": {
                                "node": _node
                            }
                        };
                        cuurUI.push(_p);
                    }
                }
                if (arg.r.health) { //治疗
                    if (target.camp == 1) goal = "f";
                    else goal = "t";
                    text_type = goal + "_stealHP";
                    type = "stealHP";
                    value = arg.r.health;
                    isCrits = 0;
                    if (arg.r.critical) { //暴击
                        text_type += "_critical";
                        isCrits = 1;
                    } else text_type += "_normal";
                    let _node = {
                        x: target.x * 100 + randomNum,
                        y: target.y * 100 - 100,
                        z: target.z * 100 + base_cfg["damageP"].value[0],
                        scale: base_cfg["damageS"].value[0],
                        transp: base_cfg["damageA"].value[0],
                        "isCrits": isCrits,
                        "text_type": text_type,
                        "type": type,
                        "goal": goal,
                        "value": value,
                        "scene": mgr_data.name
                    };
                    _node = mgr.yszzFight.damage(_node);
                    mgr.create(_node, "damage");
                    if (UiFunTable.damageCartoon) {
                        let _p = {
                            "fun": UiFunTable.damageCartoon,
                            "param": {
                                "node": _node
                            }
                        };
                        cuurUI.push(_p);
                    }
                }
            },
            ce = () => {
                let _id = getEffectId("hitEffect");
                let hitEffect: any = {
                    "id": { "id": _id, "name": f.sname },
                    "isOnce": true,
                    "effect": ss.hitEffect[0],
                    "x":0,
                    "y":0,
                    "z":0
                };
                effectList[_id] = {
                    "type": "effect",
                    "obj": hitEffect,
                    "locTime":Date.now()
                }
                // console.log("hitEffect :: ",hitEffect);
                return hitEffect;
            };
        //未到出现特效的时间
        if (arg.time > now) {
            return;
        }
        
        _damageFunc();
        
        //hitEffect.position = skill.hitEffectPos;
        if(ss.hitEffect.length){
            //hitEffectTarget----- 1:目标胸口， 3:场景上， 2：目标脚下
            if (ss.hitEffect[1] == 1) {
                if (!ss.isRangeSkill || (ss.isRangeSkill && arg.curTarget == target.mapId)) {
                    
                    //console.log("hitEffect:"+effectID)
                    //创建特效数据
                    if (target && target._show && target._show.old && target._show.old.ref) {
                        let he = ce();
                        effectPos(target,he,ss,"hit",ss.hitEffect);
                        controlShield("effect",()=>{
                            // if(f.sid > 0 && f.sid < 20000)console.log("目标胸口被击特效");
                            mgr.create(he, "effect", target._show.old.children[0].children[5]);

                        },f.sid);
                    }
                }

            } else if (ss.hitEffect[1] == 3) {
                if (!ss.isRangeSkill || (ss.isRangeSkill && arg.curTarget == target.mapId)) {
                    let he = ce();
                    he.x = target.x;
                    he.y = target.y;
                    effectPos(target,he,ss,"hit",ss.hitEffect);
                    //console.log("hitEffect:"+effectID)
                    controlShield("effect",()=>{
                        mgr.create(he, "effect");
                    },f.sid);
                }
            }
            else if (ss.hitEffect[1] == 2) {
                if (!ss.isRangeSkill || (ss.isRangeSkill && arg.curTarget == target.mapId)) {
                    //console.log("hitEffect:"+effectID)
                    if (target && target._show && target._show.old && target._show.old.ref) {
                        let he = ce();
                        effectPos(target,he,ss,"hit",ss.hitEffect);
                        controlShield("effect",()=>{
                            mgr.create(he, "effect", target._show.old);
                        },f.sid);
                    }
                }
            }
        }

        //检查目标是否死亡
        if (target.show_hp <= 0) {
            target.die_time = now;
            if (target.state !== "die") {
                
                //target.ani = { value: "die1", sign: Date.now() };
                target.c_visible = false;
                //击飞效果
                if(ss.backDistance && _cfg[target.type][target.module].die_fly){
                    target.state = "die_fly";
                    cuurUI.push({ "fun": UiFunTable.hitFlay, "param": { "fighter": target, "moveto":  lineVP(f,target,ss.backDistance[0]+Math.random()*(ss.backDistance[0]-ss.backDistance[1])), time:now} });
                }else
                    target.state = "";
                target.state = target.state ||  "die";
                target.playAnim = { "name": _cfg[target.type][target.module][target.state], "isOnce": true };
                target.state = "";
            }

            if (target._show && target._show.old && target._show.old.children[0] && target._show.old.children[0].ref)
                if (target.camp != 1)
                    cuurUI.push({ "fun": UiFunTable.clearMesh, "param": { "clearTime": now + 3000, "mesh": target } });
                    //spirit_base.die_time
            if (mgr_data.name == "fight" && target.skill) {
                for (let i = 0; i < target.skill.length; i++) {
                    let tSkill = target.skill[i];
                    if (tSkill.imgMesh && tSkill.imgMesh._show) {
                        tSkill.imgMesh.isDie = 1;
                        mgr.modify(tSkill.imgMesh);
                    }
                }
            }

        } else {
            
            //暂时屏蔽 之后加权重
            //目标如果没移动，播放受击动作
            if (target.moving == 0 && !arg.r.health) {
                let attack_standby = _cfg[target.type][target.module]["attack_standby"],state = _cfg[target.type][target.module].hit;

                if (state && (!target.playAnim || target.playAnim.name == attack_standby || new Date().getTime() - target.playAnim.time >= 1200)) {
                    // target.ani = { value: "attacked01", sign: Date.now() };
                    target.state = "hit";
                    let _id = getEffectId("attack_standby");
                    effectList[_id] = {
                        "type": "playAnim",
                        "obj": target,
                        "locTime":Date.now()
                    }
                    target.playAnim = { "name": state, id: { "id": _id, "name": target.sname }, "isOnce": true };
                }
            }
        }
        if (f.sid == roleId && ss.hitSound) {
           //Music.startSceneSound(skill.hitSound); //播放击中音效
           UiFunTable.sound({name:ss.hitSound},-1,now);
        }
        //设为主动怪
        if(target.type == "monster" && target.passive){
            target.passive = false;
            target.name = target.name+" ";
        }
        mgr.modify(target);
        delete cuurUI[index];
    }
    static sound(arg, index, now) {
        if(arg.time > now){
            return;
        }
        Music.skillSound(arg.name);
        delete cuurUI[index];
    }
    //buff特效
    static buffEffect(arg, index, now) {
        delete cuurUI[index];
    }
    //移除模型
    static remove(arg, index, now){
        if(now < arg.time){
            return;
        }
        arg.func();
        delete cuurUI[index];
    }
    //激发buffUi
    static excitationBuff(arg, index, now) {
        let arr = [-5, -3, 0, 3, 5];
        let randomNum = arr[Math.ceil(Math.random() * 10) % 5];
        let type = arg.effect,
            target = arg.target,
            goal;
        let value = parseInt(arg.value);
        delete cuurUI[index];
        if (type === "hp") {
            //buff会有加血减血之分，有可能buff是扣自己血，所以应该当成伤害显示
            let text_type = "";
            if (target.camp == 1) goal = "f";
            else goal = "t";
            if (value >= 0) {
                text_type = goal + "_stealHP";
                type = "stealHP";
            } else {
                text_type += goal + "_damage";
                type = "damageM";
                value = -value;
            }
            target.show_hp += value;
            text_type += "_critical";
            mgr.modify(target);
            let node = {
                x: target.x * 100 + randomNum,
                y: target.y * 100 - 100,
                z: target.z * 100 + base_cfg["buffValueP"].value[0],
                scale: base_cfg["buffValueS"].value[0],
                transp: base_cfg["buffValueA"].value[0],
                "r": arg.r,
                "text_type": text_type,
                "type": type,
                "isCrits": 0,
                "goal": goal,
                "value": value,
                "scene": mgr_data.name
            };
            node = mgr.yszzFight.damage(node);;
            mgr.create(node, "damage");
            cuurUI.push({
                "fun": UiFunTable.damageCartoon,
                "param": {
                    "node": node,
                    type: 1
                }
            });

        } else if (type === "god") {

            let text_type = "";
            if (target.camp == 1) text_type = "f";
            else text_type = "t";
            text_type += "_god";

            let node = {
                x: target.x * 100 + randomNum,
                y: target.y * 100 - 100,
                z: target.z * 100 + base_cfg["buffValueP"].value[0],
                scale: base_cfg["buffValueS"].value[0],
                transp: base_cfg["buffValueA"].value[0],
                "r": arg.r,
                "text_type": text_type,
                "type": type,
                "isCrits": 0,
                "goal": goal,
                "value": value,
                "scene": mgr_data.name
            };
            node = mgr.yszzFight.damage(node);
            mgr.create(node, "damage");
            cuurUI.push({
                "fun": UiFunTable.damageCartoon,
                "param": {
                    "node": node,
                    type: 1
                }
            });

        } else if (type === "shield") {
            let text_type = "";
            if (target.camp == 1) text_type = "f";
            else text_type = "t";
            text_type += "_shield";

            let node = {
                x: target.x * 100 + randomNum,
                y: target.y * 100 - 100,
                z: target.z * 100 + base_cfg["buffValueP"].value[0],
                scale: base_cfg["buffValueS"].value[0],
                transp: base_cfg["buffValueA"].value[0],
                "r": arg.r,
                "text_type": text_type,
                "type": type,
                "isCrits": 0,
                "goal": goal,
                "value": value,
                "scene": mgr_data.name
            };
            node = mgr.yszzFight.damage(node);;
            mgr.create(node, "damage");
            cuurUI.push({
                "fun": UiFunTable.damageCartoon,
                "param": {
                    "node": node,
                    type: 1
                }
            });
        } else if (type === "stun") {
            let text_type = "";
            if (target.camp == 1) text_type = "f";
            else text_type = "t";
            text_type += "_stun";

            let node = {
                x: target.x * 100 + randomNum,
                y: target.y * 100 - 100,
                z: target.z * 100 + base_cfg["buffValueP"].value[0],
                scale: base_cfg["buffValueS"].value[0],
                transp: base_cfg["buffValueA"].value[0],
                "r": arg.r,
                "text_type": text_type,
                "type": type,
                "isCrits": 0,
                "goal": goal,
                "value": value,
                "scene": mgr_data.name
            };
            node = mgr.yszzFight.damage(node);
            mgr.create(node, "damage");
            cuurUI.push({
                "fun": UiFunTable.damageCartoon,
                "param": {
                    "node": node,
                    type: 1
                }
            });
        }
    }

    //手动场景 释放技能
    static handSkillCD = function (arg, index, now) {
        let skill = arg.skill;
        let fighter = arg.fighter;
        let time = Math.ceil((skill.cdNextTime - now) / 1000);
        skill.imgMesh.isDie = (fighter.hp > 0) ? 0 : 1;
        skill.imgMesh.time = (time >= 0) ? time : '';

        let anim = arg.skill.animName;

        if (time > 0) {
            skill.imgMesh.isShow = false;
            anim = undefined;
            skill.imgMesh.animName = "eff_ui_skillpower01";
            skill.imgMesh.isOnce = false;
            skill.imgMesh.isShow = false;
        }

        if (!anim && skill.imgMesh.time == 0 || skill.imgMesh.time == "") {
            skill.imgMesh.animName = "eff_ui_skillpower01";
            skill.imgMesh.isOnce = false;
            skill.imgMesh.isShow = true;
        } else {
            skill.imgMesh.animName = "eff_ui_skillpower02";
            skill.imgMesh.isOnce = true;
            skill.imgMesh.isShow = true;
        }
        mgr.modify(skill.imgMesh);
    }

    //技能cd动画
    static skillCD(arg, index, now) {
        let skill = arg.skill;
        let time = Math.ceil((skill.cdNextTime - now) / 1000);
        skill.imgMesh.res = skill.fighter.head;
        skill.imgMesh.hp = skill.fighter.hp;
        //console.log(index,time);
        skill.imgMesh.isDie = (skill.fighter.hp > 0) ? 0 : 1;
        skill.imgMesh.max_hpCount = skill.fighter.max_hpCount;
        skill.imgMesh.time = (time >= 0) ? time : '';
        mgr.modify(skill.imgMesh);
    }

    static curTargetEffect(arg, index, now) {
        let fighter = arg.f,
            target,
            _mapList = arg.mapList;
        if (_mapList) { target = _mapList[fighter.curHeadTarget]; } else { target = mgr_data.sceneTab[mgr_data.name].mapList[fighter.curHeadTarget]; }

        if (!target) {
            if (beforeTarget && beforeTarget._show && beforeTarget._show.old && beforeTarget.hp > 0) {
                beforeTarget.c_visible = false;
                mgr.modify(beforeTarget);
            }
            beforeTarget = undefined;
        }

        if (beforeTarget === undefined && target) {
            beforeTarget = target;
            target.c_visible = true;
            mgr.modify(target);
        }

        if (target && target._show && target._show.old && beforeTarget !== target) {
            if (beforeTarget && beforeTarget._show && beforeTarget._show.old && beforeTarget.hp > 0) {
                beforeTarget.c_visible = false;
                mgr.modify(beforeTarget);
            }
            beforeTarget = target;
            target.c_visible = true;
            mgr.modify(target);
        }
    }

    //更新目标头像
    static targetHead(arg, index, now) {
        let headMesh = arg.head,
            fighter,
            target;
        
        if (mgr_data.name == "rebel" || mgr_data.name == "gang_fight") {
            fighter = arg.mapList[arg.f.mapId];
            target = arg.mapList[arg.f.curHeadTarget];
        } else {
            fighter = arg.mapList[arg.f.mapId];
            target = arg.mapList[arg.f.curHeadTarget];
        }
        // console.log(11111111111,Fight.count);
        if (Fight.count == 0 ) {
            if (headMesh && headMesh._show && headMesh._show.old && headMesh._show.old.ref)
                mgr.remove(headMesh);
            delete cuurUI[index];
            return;
        }

        if (!headMesh) {
            if (fighter && fighter._show && fighter._show.old.ref && target && target._show && target._show.old && target._show.old.ref && target.show_type == 1) {
                headMesh = {};
                let width = root.getWidth() * mgr_data.scale,
                    height = root.getHeight() * mgr_data.scale;
                headMesh.x = (-width / 2 - 8) / 100;
                headMesh.y = (height / 2) / 100;
                headMesh.z = 0;
                // headMesh.head = target.head;
                headMesh.level = target.level;
                headMesh.name = target.name;
                headMesh.hp = target.hp > 0 ? parseInt(target.hp) : 0;
                headMesh.max_hpCount = target.max_hpCount;
                // if (mgr_data.limitTime)
                //     headMesh.time = Util.getDuration(Math.floor((mgr_data.limitTime - now) / 1000));
                mgr.create(headMesh, "target_head");
                arg.head = headMesh;

            }
            return;
        }

        if (!target) {
            headMesh.head = "";
            headMesh.level = 0;
            headMesh.name = "";
            headMesh.hp = 0;
            if (mgr_data.limitTime) {
                headMesh.time = Util.getDuration(Math.floor((mgr_data.limitTime - now) / 1000));
            }
            mgr.modify(headMesh);
        } else {
            // headMesh.head = target.head;
            headMesh.level = target.level;
            headMesh.name = target.name;
            headMesh.hp = target.hp > 0 ? parseInt(target.hp) : 0;
            headMesh.max_hpCount = target.max_hpCount;
            let h = Common.numberCarry(parseInt(headMesh.hp), 1000000) + "/" + Common.numberCarry(parseInt(headMesh.max_hpCount), 1000000);
            // if (mgr_data.limitTime) {
            //     headMesh.time = Util.getDuration(Math.floor((mgr_data.limitTime - now) / 1000));
            //     // mgr.setText(headMesh, headMesh.time + "后结束战斗", 9, 0)
            //     mgr.modify(headMesh);
            // }
            // if (headMesh._show.old.children[8].textCon.show !== target.name) {
            //     headMesh.name = target.name;
            //     headMesh.level = target.level;
            //     // mgr.setText(headMesh, headMesh.name, 8);
            //     // mgr.setText(headMesh, "Lv" + headMesh.level, 7);
            //     // mgr.setImage(headMesh, headMesh.head, 0);
            //     mgr.modify(headMesh);
            // }
            let visible = (headMesh.hp / headMesh.max_hpCount <= 0) ? false : true;
            // mgr.setDamage(headMesh, [headMesh.hp / headMesh.max_hpCount, 1, 1], 2, visible)
            // mgr.setText(headMesh);
            mgr.modify(headMesh);

        }

    }

    //击飞动画
    static hitFlay(arg,index,now){
        //cuurUI.push({ "fun": UiFunTable.hitFlay, "param": { "fighter":fighter,"moveto":[0,0],"time":now } });
        let l = 500,
        t = now - arg.time,
        p = t/l,
        dx = arg.moveto[0] - arg.fighter.x,
        dy = arg.moveto[1] - arg.fighter.y,
        r;
        if(t === 0)
            return;
        p = p>1?1:p;
        r = [arg.fighter.x+dx*p,arg.fighter.y+dy*p];
        mgr.setPos(arg.fighter,r);
        if(p === 1){
            delete cuurUI[index];
        }
    }

    //执行cuurUI列表
    static runCuurUi(r) {
        // let nullObj = 0;
        let timer = Date.now();
        for (let i in cuurUI) {
            if(cuurUI[i].fun.name == "damageCartoon"){
                cuurUI[i].index = i;
                cuurShow.push({"fun": UiFunTable.damageCartoon,
                "param": {
                    "node": cuurUI[i].param.node
                }});
                delete cuurUI[i];
                // time = timer + 50;
            }else{
                cuurUI[i].fun(cuurUI[i].param,parseInt(i), r.now);                    
            }
            // nullObj++;
        }
        // if (nullObj == 0) {
        //     cuurUI = [];
        //     beforeTarget = undefined;
        // }
        if(Date.now()-timer < 10){
            for(let i =0,leng = cuurUI.length;i<leng;i++){
                if(!cuurUI[i]){
                    cuurUI.splice(i,1);
                    i--;
                    leng--;
                }
            }
            if(cuurUI.length == 0){
                beforeTarget = undefined;
            }
        }
        
    }

    //清除定时器
    static clearTO() {
        beforeTarget = undefined;
    }

    //加事件
    static addEvent(event) {
        cuurUI.push(event);
    }


}

/**
 * 控制特效是否屏蔽
 * @param type 
 * @param callback 
 */
const controlShield= (type,callback,sid)=>{
    if(shield[type] || (shield["fighter"] && roleId !== sid)){
        return;
    }
    //task(callback,null,6000,1);
    callback();
}
const getSkill = (list,id) => {
    for(let i=0;i<list.length;i++){
		if(id == list[i].id)return list[i];
	}
}
const comboShake = (list,skill) => {
    let s,backSkill = skill.backSkill,t=0;
    if(!backSkill){
        return;
    }
    for(let i=backSkill.length-1;i>=0;i--){
        s = getSkill(list,backSkill[i]);
        if(t){
            t += s.actionTime;
        }
        if(s.shake){
             t += 1;
        }
    }
    if(t){
        t += skill.actionTime;
    }
    return t;
};
/**
 * @description 设置特效的偏移位置
 * @param f 
 * @param effect 
 * @param {Json}skill 
 * @param {String}type hit || skill
 */
const effectPos = (f,effect,skill,type,index) => {
    let ak;
    if(type == "skill"){
        ak = index[3]
    }else if(type == "hit"){
        ak = index[2];
    }
    
    if(!ak)
        return;
    effect.x += ak[0];
    effect.y += ak[1];
    effect.z += ak[2];
}
//相对于自己上下左右
const sxzy_Z = function (a, b, type) {
    let x = a.x;
    let y = a.y;

    //a 在 b 左边
    if (a.x - b.x > 0) {
        x -= 0.3;
    } else {
        x += 0.3;
    }
    //a 在 b 下边
    if (a.y - b.y > 0) {
        y -= 0.3;
    } else {
        y += 0.3;
    }

    if (type) {
        return y;
    } else return x;

}

//获取某方向上距离自身r的点
const lineVP = (start,end,r) => {
    let fl_d_x = end.x-start.x,
    fl_d_y = end.y-start.y,
    fl = Math.sqrt(fl_d_x * fl_d_x + fl_d_y * fl_d_y)||1,
    //新原点坐标
    dx = fl_d_x*(fl+r)/fl+start.x,
    dy = fl_d_y*(fl+r)/fl+start.y;
    return [dx,dy];
}
/**
 * @description 震屏动画
 * @param camera 相机
 * @param shakeArray 震动动画点 
 * @param float 幅度
 * @param f fighter
 */
const shakeRoot = function (camera, shakeArray,float, f) {
    if (shakeIndex == shakeArray.length) {
        if (shakeTimeRef) clearTimeout(shakeTimeRef);
        shakeTimeRef = undefined;
        shakeIndex = 0;
        let _s = mgr_data.sceneTab[mgr_data.name];

        if(!_s || _s.handScene){
            mgr.setPos(camera, [f.x, f.y, f.z]);
        }
        return;
    }
    let x = camera._show.old.transform.position[0] + shakeArray[shakeIndex][0] * float;
    let y = camera._show.old.transform.position[2] + shakeArray[shakeIndex][1] * float;
    let z = camera._show.old.transform.position[1] + shakeArray[shakeIndex][2] * float;
    mgr.setPos(camera, [x, y, z]);
    shakeIndex++;
    shakeTimeRef = setTimeout(function () {
        shakeRoot(camera, shakeArray, float, f);
    }, shakeTime);
}