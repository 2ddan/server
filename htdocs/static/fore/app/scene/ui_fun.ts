/**
 * @description 战斗表现
 */
//=============================引入mod下文件

//=============================引入同目录文件
//pi
import * as root from "pi/ui/root";
import { objCall } from 'pi/util/util';
import { set as task } from 'pi/util/task_mgr';
//mod
import { Cach } from "app/mod/cach";
import { Music } from "app/mod/music";
import { Pi, globalSend } from "app/mod/pi";
import { get as getDB } from "app/mod/db";
import { Common } from "app/mod/common";

//scene
import { mgr, mgr_data } from "./scene";
import { Damage } from "./class";
import { module_cfg as _module } from "app/scene/plan_cfg/module_config";
import { monster_cfg as _monster } from "app/scene/plan_cfg/monster_config";
import { startMove } from "app/scene/camera_move";

//fight
import { FMgr } from "fight/a/fight";
//cfg
import { base_cfg } from "cfg/a/base_cfg";

import { getGlobal } from "pi/widget/frame_mgr";

export let shake_finish = 0;

let randomNum: number,
    //震屏
    shakeIndex = 0,
    // shakeTimeRef,
    // 震屏初始幅度
    shakeArray = [[0, 1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0],[0, 1, 0], [0, -1, 0]],
    //伤害飘字列表
    random: any = {},
    roleId = 0,
    //用于特效
    effectID = 2,
    beforeTarget,
    _cfg = {
        "monster": _monster,
        "fighter": _module
    },
    // flag = null,
    shield = {
        effect: false,
        shake: false,
        fighter: false
    },
    propArr = [], //保存掉落物品的prop
    drop_funarr = [], //存储当前掉落的物品，阻止连续播放(当前没有播放完就播放下一次);
    circleArr : any = [],//保存掉落物品的初始坐标
    targetPosition = [], //目标死亡时坐标
    fightStartPosition = [], //初始fighter点
    fighterPosition = [], //fighter移动点
    star_position = [],
    newPosition = [],
    flag = false,
    drop_list = {}; //存储场景上的2D节点

let time = Date.now();
let quality = {1:"",2:"eff_ui_guangzhu_lv",3:"eff_ui_guangzhu_lan",4:"eff_ui_guangzhu_zi",5:"eff_ui_guangzhu_cheng",6:"eff_ui_guangzhu_hong"}; //掉落物品的光柱特效


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
export const setShield = (key, b) => {
    shield[key] = b;
    let back = shield[key + "back"];
    back && back(b);
}
export const getShield = (key) => {
    return shield[key];
}
/**
 * @description 屏蔽设置回调
 */
export const setShieldBack = (key, callback) => {
    shield[key + "back"] = callback;
}
/**
 * @description 将值初始化
 */
export const initValue = () => {
    cuurUI = [];
    effectList = {};
    cuurShow = [];
    UiFunTable.cach.clear();
}

export const getEffectId = (type?) => {
    let id = ++effectID;
    // if(type)
    // console.log(type,id);
    return id;
}

export class UiFunTable {
    //换成飘字列表
    static cach = new Cach();
    /**
     * @description 更新战斗者的攻击动作
     */
    static updateUseSkill(mesh, skill) {
        if (!skill || !mesh || !mesh._show || !mesh._show.old || !mesh._show.old.ref) {
            return;
        }
        let _id = getEffectId("updateUseSkill");
        mesh.playAnim = { "name": skill, "id": _id, "isOnce": true };
        mesh.state = "";
        effectList[_id] = {
            "type": "playAnim",
            "obj": mesh,
            "locTime": Date.now()
        }
        mgr.setAnimator(mesh);
        return true;
    }

    /**
     * @description 一次性动作结束回调,但是死亡不走
     */
    static aniBack(id) {
        let b = false, _t = Date.now();
        if (!effectList[id]) {
            // console.log(`${id}/${effectID}:${effectList[id]}`);
            return b;
        }
        if (effectList[id].type === "effect") {
            
            // if(effectList[id].obj.pos){
            //     if(effectList[id].obj.pos != 3 && effectList[id].obj._show.old.ref){
            //         UiFunTable.removeParent(effectList[id].obj._show.old);
            //     }
            //     if(!UiFunTable.cach.one(effectList[id].obj.effect)){
            //         UiFunTable.cach.add(effectList[id].obj.effect,effectList[id].obj._show);
            //     }
            //     mgr.setOnlyPos(effectList[id].obj,[10000,0,0]);
                
            // }else{
                mgr.remove(effectList[id].obj);
            // }
            b = true;
        } else if (effectList[id].type === "playAnim") {
            let _obj = effectList[id].obj;
            //人死了就不改待机了
            if (_obj.hp > 0) {
                UiFunTable.modifyStatus(_obj,"attack_standby",false);
            }
            b = true;
        }
        if (b) {
            delete effectList[id];
        }
        for (let k in effectList) {
            if (_t - effectList[k].locTime > 10000) {
                // if(effectList[k].type === "effect" && effectList[k].obj._show){
                //     if(effectList[k].obj.pos){
                //         if(effectList[k].obj.pos != 3 && effectList[k].obj._show.old.ref){
                //             UiFunTable.removeParent(effectList[k].obj._show.old);
                //         }
                //         if(!UiFunTable.cach.one(effectList[k].obj.effect)){
                //             UiFunTable.cach.add(effectList[k].obj.effect,effectList[k].obj._show);
                //         }
                //         mgr.setOnlyPos(effectList[k].obj,[10000,0,0]);
                //     }else{
                //         mgr.remove(effectList[k].obj)
                //     }
                // } 
                effectList[k].type === "effect" && effectList[k].obj._show && mgr.remove(effectList[k].obj);
                delete effectList[k];
            }
        }
        return b;
    }

    /**
     * @description 移除节点上所绑的父节点
     */
    static removeParent = function (obj) {
        if(!obj.children || obj.children.length == 0){
            return;
        }
        if(obj.ref.impl.parent){
            obj.ref.impl.parent.remove(obj.ref.impl);
        }
        for(let i=0,len = obj.children.length;i<len;i++){
            obj.children[i].ref.impl.parent.remove(obj.children[i].ref.impl);
            fun(obj.children[i]);
        }

        function fun (node) {
            if (node.children) {
                for(let j=0,len=node.children.length;j<len;j++){
                    let v = node.children[j];
                    fun(v);
                    v.ref.impl.parent.remove(v.ref.impl);
                }

            } 
        }
    }

    /**
     * @description 在每一个子节点上添加父节点
     */
    static addParent = function (parent,children) {
        for (let i = 0; children && i < children.length; ++i) {
            let obj = children[i];
            if (!obj.ref.impl) continue;
            parent.ref.impl.add(obj.ref.impl);
            UiFunTable.addParent(obj,obj.children);
        }
    }

    static shakeEffect = function (arg, index, now) {
        let f = arg.fighter,
            skill = arg.skill,
            target = arg.target;
        //未到出现特效的时间
        if (arg.time > Date.now()) {
            return;
        }
        delete cuurUI[index];
        //检查是否屏蔽震屏
        if (shield.shake) {
            return;
        }
        //上一个震屏还未结束, 下一个震屏来到, 下一次的震屏忽略
        let d = new Date();
        if (d.getTime() < shake_finish) {
            return
        }
        // if (shakeTimeRef) {
        //     clearTimeout(shakeTimeRef);
        //     shakeTimeRef = undefined;
        //     shakeIndex = 0;
        //     let _s = mgr_data.sceneTab[mgr_data.name];
        //     if (_s && _s.handScene) {
        //         _s.locCamera = 0;
        //         let _f = _s.own[_s.locCamera];
        //         mgr.setPos(mgr_data.camera[mgr_data.name], [_f.x, _f.y, _f.z]);
        //     }
        // }
        shake_finish = d.getTime() + 300;
        cuurUI.push({
            "param": {
                camera: mgr_data.camera[mgr_data.name],
                float: f.skill[arg.index].ShakeFloat || 0,
                f: f
            },
            "fun": shakeRoot
        });
    }

    static damageCartoon(arg, index) {
        let p, s, a, o, x;
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
            if (arg.node.type == "damage") {
                if (!random[index]) {
                    let Rand = Math.random();
                    random[index] = 1 + Math.round(Rand * 3); //四舍五入
                }
                p = cfg.damage_type[random[index] - 1].damagePZ; //高度
                x = cfg.damage_type[random[index] - 1].damagePX; //左右偏移量
                s = cfg.damage_type[random[index] - 1].scale; //缩放
                o = cfg.damage_type[random[index] - 1].opacity //透明度
                a = { "value": [254, 254] };
            } else if (arg.node.type == "damageM") {  //怪物对人物的伤害冒字
                p = cfg.damageM_type[0].damagePZ //高度
                x = cfg.damageM_type[0].damagePX //左右偏移量
                s = cfg.damageM_type[0].scale //缩放
                o = cfg.damageM_type[0].opacity //透明度
                a = { "value": [254, 254] };
            } else if (arg.node.type == "critical") { //暴击的伤害冒字
                p = cfg.critical_type[0].damagePZ //高度
                x = cfg.critical_type[0].damagePX //左右偏移量
                s = cfg.critical_type[0].scale //缩放
                o = cfg.critical_type[0].opacity //透明度
                a = { "value": [254, 254] };
            } else if (arg.node.type == "stealHP") { //其他的伤害冒字
                p = { "value": [40, 5, 5, 5, 0, 0, 0, 10, 15, 15, 15, 20, 20, 20] };
                s = { "value": [0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75] };
                a = { "value": [254, 254] };
                o = { "value": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1] };
            } else {
                p = { "value": [40, 5, 5, 5, 0, 0, 0, 10, 15, 15, 15, 20, 20, 20] };
                s = { "value": [0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75] };
                a = { "value": [254, 254] };
                o = { "value": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1] }
            }
        }

        let _node = arg.node;
        if (!_node.frameIndex) {
            _node.frameIndex = 0;
        }
        let frameIndex = _node.frameIndex;
        if(x){
            _node.x = _node.x + x.value[frameIndex];
        }
        _node.z = _node.z + p.value[frameIndex];
        _node.scale = s.value[frameIndex];
        _node.transp = a.value[frameIndex];
        if(o) {_node.opacity = o.value[frameIndex];}
        if (frameIndex >= p.value.length-1) {
            _node._show.time = Date.now();
            UiFunTable.cach.add(_node.value+"-"+_node.type,_node._show);

            delete cuurUI[index - 0];
            delete random[index - 0];
            
            // mgr.remove(arg.node,node.scene);
            mgr.setOnlyPos(_node,[1000,0,0]);
            return
        }
        // mgr.modify(_node);
        mgr.setDamage(_node, _node.scale,null,_node.opacity,null,null,[_node.x / 100, _node.y / 100, _node.z / 100]);
        _node.frameIndex++;
    }
    

    //创建技能特效
    static skillEffect(arg, index, now) {
        let f = arg.fighter,
            skill = arg.skill,
            ss = getSkill(arg.fighter.skill, skill.id),
            eff = ss.skillEffect[arg.index],
            effectTime, skillEffectObj, effctClearTime,
            len = ss.skillEffect.length,
            ce,
            rl;
        if (arg.time + eff[1] > now) {
            return; //技能特效延迟
        }
        if (len > 0) {
            ce = (se) => {
                let _id = getEffectId("skillEffect");
                let skillMirror: any = {
                    "id": { "id": _id, "name": f.sname },
                    "effect": se[0],
                    "isOnce": true,
                    // "pos":se[2],
                    "x": 0,
                    "y": 0,
                    "z": 0
                };
                effectList[_id] = {
                    "type": "effect",
                    "obj": skillMirror,
                    "locTime": Date.now()
                }
                return skillMirror;
            };
            rl = (se) => {
                //se[1]:----1:目标身上， 2：自己身上， 3：场景上,  4:自己武器上，5：自己外层，6：目标外层
                if (se[2] == 1) {

                    for (let i = 0; i < arg.target.length; i++) {
                        let target = arg.target[i], sm;
                        if (!target || !target._show || !target._show.old || !target._show.old.ref)
                            continue;
                        effctClearTime = now + effectTime;
                        //console.log("effect:"+effectID)
                        sm = ce(se);
                        effectPos(target, sm, ss, "skill", se);
                        controlShield("effect", () => {
                            // const cach = UiFunTable.cach.one(sm.effect);
                            // if(cach){
                            //     sm._show = cach;
                            //     // mgr.setDamage(node,null,0,node.opacity);
                            //     // target._show.old.children[0].ref.impl.add(sm._show.old.ref.impl);
                            //     UiFunTable.addParent(target._show.old.children[0],[sm._show.old]);
                            //     mgr.setOnlyPos(sm,[sm.x,sm.y,sm.z]);
                            //     UiFunTable.cach.list.delete(sm);
                            // }else{
                            //     mgr.create(sm, "effect", target._show.old.children[0]); //将技能特效添加到目标身上
                            // }
                            mgr.create(sm, "effect", target._show.old.children[0]); //将技能特效添加到目标身上
                        }, f.sid);
                    }

                } else if (se[2] == 2) {
                    if (!f || !f._show || !f._show.old || !f._show.old.ref) {
                        delete cuurUI[index];
                        return;
                    }
                    let sm = ce(se);
                    effectPos(f, sm, ss, "skill", se);
                    //console.log("effect:"+effectID)
                    controlShield("effect", () => {
                        // const cach = UiFunTable.cach.one(sm.effect);
                        // if(cach){
                        //     sm._show = cach;
                        //     mgr.setOnlyPos(sm,[sm.x,sm.y,sm.z]);
                        //     UiFunTable.addParent(f._show.old.children[0],[sm._show.old]);
                            
                        //     UiFunTable.cach.list.delete(sm);
                        // }else{
                        //     mgr.create(sm, "effect", f._show.old.children[0]); //将技能特效添加到目标身上
                        // }
                        mgr.create(sm, "effect", f._show.old.children[0]); //将技能特效添加到自己身上
                    }, f.sid);
                } else if (se[2] == 3) {
                    let sm = ce(se);
                    sm.x = f.x;
                    sm.y = f.y;
                    sm.lookat = f.lookat;
                    effectPos(f, sm, ss, "skill", se);
                    controlShield("effect", () => {
                        // const cach = UiFunTable.cach.one(sm.effect);
                        // if(cach){
                        //     sm._show = cach;
                        //     mgr.setOnlyPos(sm,[sm.x,sm.y,sm.z]);
                        //     mgr.setLookAt(sm,sm.lookat);
                        //     UiFunTable.cach.list.delete(sm);
                        // }else{
                        //     mgr.create(sm, "effect"); //将技能特效添加到目标身上
                        // }
                        mgr.create(sm, "effect");//将技能特效添加到场景上
                    }, f.sid);
                } else if (se[2] == 4) {
                    let sm = ce(se);
                    effectPos(f, sm, ss, "skill", se);
                    controlShield("effect", () => {
                        // const cach = UiFunTable.cach.one(sm.effect);
                        // if(cach){
                        //     sm._show = cach;
                        //     // mgr.setDamage(node,null,0,node.opacity);
                        //     // f._show.old.children[0].children[1].ref.impl.add(sm._show.old.ref.impl);
                        //     UiFunTable.addParent(f._show.old.children[0],[sm._show.old]);
                        //     mgr.setOnlyPos(sm,[sm.x,sm.y,sm.z]);
                        //     UiFunTable.cach.list.delete(sm);
                        // }else{
                        //     mgr.create(sm, "effect", f._show.old.children[0].children[1]); //将技能特效添加到目标身上
                        // }
                        mgr.create(sm, "effect", f._show.old.children[0].children[1]);//将技能特效添加到武器上
                    }, f.sid);

                } else if (se[2] == 5) {
                    let sm = ce(se);
                    effectPos(f, sm, ss, "skill", se);
                    //console.log("effect:"+effectID)
                    controlShield("effect", () => {
                        // const cach = UiFunTable.cach.one(sm.effect);
                        // if(cach){
                        //     sm._show = cach;
                        //     // mgr.setDamage(node,null,0,node.opacity);
                        //     UiFunTable.addParent(f._show.old.children[0],[sm._show.old]);
                        //     // f._show.old.ref.impl.add(sm._show.old.ref.impl);
                        //     mgr.setOnlyPos(sm,[sm.x,sm.y,sm.z]);
                        //     UiFunTable.cach.list.delete(sm);
                        // }else{
                        //     mgr.create(sm, "effect", f._show.old); //将技能特效添加到自己外层
                        // }
                        mgr.create(sm, "effect", f._show.old); //将技能特效添加到自己外层
                    }, f.sid);
                } else if (se[2] == 6) {
                    for (let i = 0; i < arg.target.length; i++) {
                        let target = arg.target;
                        if (!target || !target._show || !target._show.old || !target._show.old.ref)
                            continue;

                        effctClearTime = now + effectTime;
                        let sm = ce(se);
                        effectPos(target, sm, ss, "skill", se);
                        //console.log("effect:"+effectID)
                        controlShield("effect", () => {
                            // const cach = UiFunTable.cach.one(sm.effect);
                            // if(cach){
                            //     sm._show = cach;
                            //     // mgr.setDamage(node,null,0,node.opacity);
                            //     UiFunTable.addParent(target._show.old,[sm._show.old]);
                            //     // target._show.old.ref.impl.add(sm._show.old.ref.impl);
                            //     mgr.setOnlyPos(sm,[sm.x,sm.y,sm.z]);
                            //     UiFunTable.cach.list.delete(sm);
                            // }else{
                            //     mgr.create(sm, "effect", target._show.old); //将技能特效添加到自己外层
                            // }
                            mgr.create(sm, "effect", target._show.old); //将技能特效添加到目标外层
                        }, f.sid);
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
                target.show_hp += ((arg.r.hp || 0)+(arg.r.steal||0));
                if (arg.r.dodge) { //闪避
                    text_type = goal + "_dodge";
                    type = "dodge";
                } else if (arg.r.damage) { //伤害
                    text_type = goal + "_damage";
                    if (arg.target.camp == 1) {
                        type = "damageM";
                    } else {
                        type = "damage";
                    }
                    value = arg.r.damage;
                    // target.hp = target.show_hp;
                    if (arg.r.critical) { //暴击
                        text_type += "_critical";
                        if (arg.target.camp == 1) {
                            type = "damageM";
                        } else {
                            type = "critical";
                        }
                        isCrits = 1;
                    } else text_type += "_normal";
                }
                //过滤非自身造成的伤害
                if (f.sid !== roleId && target.sid !== roleId)
                    return;
                if (type) {
                    let node : any = {
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
                        "scene": mgr_data.name,
                    };
                    UiFunTable.damgeText(node);
                    
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
                    let _node : any= {
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
                    UiFunTable.damgeText(_node);

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
                    let _node : any = {
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
                    UiFunTable.damgeText(_node);
                }
                // UiFunTable.modifyHP(target);
            },
            ce = () => {
                let _id = getEffectId("hitEffect");
                let hitEffect: any = {
                    "id": { "id": _id, "name": f.sname },
                    "isOnce": true,
                    "effect": ss.hitEffect[0],
                    "x": 0,
                    "y": 0,
                    "z": 0
                };
                effectList[_id] = {
                    "type": "effect",
                    "obj": hitEffect,
                    "locTime": Date.now()
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
        if (ss.hitEffect.length) {
            //hitEffectTarget----- 1:目标胸口， 3:场景上， 2：目标脚下
            if (ss.hitEffect[1] == 1) {
                if (!ss.isRangeSkill || (ss.isRangeSkill && arg.curTarget >= 0)) {

                    //console.log("hitEffect:"+effectID)
                    //创建特效数据
                    if (target && target._show && target._show.old && target._show.old.ref) {
                        let he = ce();
                        effectPos(target, he, ss, "hit", ss.hitEffect);
                        controlShield("effect", () => {
                            // if(f.sid > 0 && f.sid < 20000)console.log("目标胸口被击特效");
                            mgr.create(he, "effect", target._show.old.children[0].children[5]);

                        }, f.sid);
                    }
                }

            } else if (ss.hitEffect[1] == 3) {
                if (!ss.isRangeSkill || (ss.isRangeSkill && arg.curTarget >= 0)) {
                    let he = ce();
                    he.x = target.x;
                    he.y = target.y;
                    effectPos(target, he, ss, "hit", ss.hitEffect);
                    //console.log("hitEffect:"+effectID)
                    controlShield("effect", () => {
                        mgr.create(he, "effect");
                    }, f.sid);
                }
            }
            else if (ss.hitEffect[1] == 2) {
                if (!ss.isRangeSkill || (ss.isRangeSkill && arg.curTarget >= 0)) {
                    //console.log("hitEffect:"+effectID)
                    if (target && target._show && target._show.old && target._show.old.ref) {
                        let he = ce();
                        effectPos(target, he, ss, "hit", ss.hitEffect);
                        controlShield("effect", () => {
                            mgr.create(he, "effect", target._show.old);
                        }, f.sid);
                    }
                }
            }
        }

        //检查目标是否死亡
        if (target.show_hp <= 0) {
            target.die_time = now - ss.bloodDelayTime;
            if (target.state !== "die") {
                //target.ani = { value: "die1", sign: Date.now() };
                target.c_visible = false;
                //击飞效果
                if (ss.backDistance && _cfg[target.type][target.module].die_fly) {
                    target.state = "die_fly";
                    cuurUI.push({ "fun": UiFunTable.hitFlay, "param": { "fighter": target, "moveto": lineVP(f, target, ss.backDistance[0] + Math.random() * (ss.backDistance[0] - ss.backDistance[1])), time: now } });
                } else
                    target.state = "";
                UiFunTable.modifyStatus(target,target.state || "die",true);
            }

            // if (target._show && target._show.old && target._show.old.children[0] && target._show.old.children[0].ref)
            //     if (target.camp != 1)
            //         cuurUI.push({ "fun": UiFunTable.clearMesh, "param": { "clearTime": now + 3000, "mesh": target } });
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
                let attack_standby = _cfg[target.type][target.module]["attack_standby"], state = _cfg[target.type][target.module].hit;

                if (state && (!target.playAnim || target.playAnim.name == attack_standby || new Date().getTime() - target.playAnim.time >= 1200)) {
                    // target.ani = { value: "attacked01", sign: Date.now() };
                    let _id = getEffectId("attack_standby");
                    effectList[_id] = {
                        "type": "playAnim",
                        "obj": target,
                        "locTime": Date.now()
                    }
                    UiFunTable.modifyStatus(target,"hit",true);
                }
            }
        }
        if (f.sid == roleId && ss.hitSound) {
            //Music.startSceneSound(skill.hitSound); //播放击中音效
            UiFunTable.sound({ name: ss.hitSound }, -1, now);
        }
        //设为主动怪
        if (target.type == "monster" && target.passive) {
            target.passive = false;
            target.name = target.name + " ";
        }
        // mgr.modify(target);
        UiFunTable.modifyHP(target);
        
        delete cuurUI[index];
    }
    //更新figher/monster的血条
    static modifyHP(arg) {
        let hp = arg.show_hp <= 0 ? 0 : arg.show_hp;
        let scale = hp == 0 ? 0.001 : hp / arg.max_hpCount;
        let _visible = hp == 0 ? false : null;
        mgr.setHP(arg, arg.type == "fighter" ? 1 : 1, [scale, 1, 1], _visible );
    }
    //初始化figher/monster的血条
    static initHP(arg,visible?) {
        let scale = 1;
        let _visible = true;
        mgr.initializationHP(arg, 1, [scale, 1, 1], _visible );
        return scale;
    }
    /**
     * 更新飘字
     */
    static damgeText(node) {
        const cach = UiFunTable.cach.one(node.value+"-"+node.type);
        if(cach){
            node._show = cach;
            // mgr.setDamage(node,null,0,node.opacity);
            mgr.setOnlyPos(node,[node.x / 100,node.y / 100,node.z / 100]);
        }else{
            node = new Damage(node);
            node.time = Date.now();
            mgr.create(node, "damage");
        }
        if(node._show && node._show.old.ref){
            // alert("创建伤害:"+_node.value);
        }
        if (UiFunTable.damageCartoon) {
            let _p = {
                "fun": UiFunTable.damageCartoon,
                "param": {
                    "node": node
                }
            };
            cuurUI.push(_p);
        }
    }
    /**
	 * @description 更新战斗对象动作状态
	 */
	static modifyStatus(data,status,isOnce){
        // console.log("modifyStatus++++++++++++"+status,Date.now());
		data.state = status;
        data.playAnim = { "name": _cfg[data.type][data.module][data.state],"isOnce": isOnce};
		mgr.setAnimator(data);
	}
    static sound(arg, index, now) {
        if (arg.time > now) {
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
    static remove(arg, index, now) {
        if (now < arg.time) {
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
            target.show_hp += value;
            if (value >= 0) {
                text_type = goal + "_stealHP";
                type = "stealHP";
            } else {
                text_type += goal + "_damage";
                type = "damageM";
                value = -value;
            }
            text_type += "_critical";
            // mgr.modify(target);
            UiFunTable.modifyHP(target);
            let node : any = {
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
            UiFunTable.damgeText(node);

        } else if (type === "god") {

            let text_type = "";
            if (target.camp == 1) text_type = "f";
            else text_type = "t";
            text_type += "_god";

            let node : any = {
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
            UiFunTable.damgeText(node);

        } else if (type === "shield") {
            let text_type = "";
            if (target.camp == 1) text_type = "f";
            else text_type = "t";
            text_type += "_shield";

            let node : any = {
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
            UiFunTable.damgeText(node);

        } else if (type === "stun") {
            let text_type = "";
            if (target.camp == 1) text_type = "f";
            else text_type = "t";
            text_type += "_stun";

            let node : any = {
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
            UiFunTable.damgeText(node);
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

    //击飞动画
    static hitFlay(arg, index, now) {
        //cuurUI.push({ "fun": UiFunTable.hitFlay, "param": { "fighter":fighter,"moveto":[0,0],"time":now } });
        let l = 500,
            t = now - arg.time,
            p = t / l,
            dx = arg.moveto[0] - arg.fighter.x,
            dy = arg.moveto[1] - arg.fighter.y,
            r;
        if (t === 0)
            return;
        p = p > 1 ? 1 : p;
        r = [arg.fighter.x + dx * p, arg.fighter.y + dy * p];
        mgr.setPos(arg.fighter, r);
        if (p === 1) {
            delete cuurUI[index];
        }
    }
    
    //执行cuurUI列表
    static runCuurUi() {
        let frame = getGlobal();
        let timer = Date.now();
        frame.setPermanent(()=>{
            let time = Date.now();
            if(time - timer < 38)
                return;
            timer = time;
            for (let i in cuurUI) {
                cuurUI[i].fun(cuurUI[i].param, parseInt(i), timer);
            }
            UiFunTable.cach.list.forEach((v,k) => {
                for(let j =0,len = v.length;j<len;j++){
                    if(time - v[j].time >= 30000){
                        mgr.remove(v[j]);
                        v.splice(j,1);
                        j--;
                        len--;       
                    }else{
                        break;   
                    }
                }
                if(v.length == 0){
                    UiFunTable.cach.list.delete(k);                    
                }
            });
            if (Date.now() - timer < 10) {
                for (let i = 0, leng = cuurUI.length; i < leng; i++) {
                    if (!cuurUI[i]) {
                        cuurUI.splice(i, 1);
                        i--;
                        leng--;
                    }
                }
                if (cuurUI.length == 0) {
                    beforeTarget = undefined;
                }
            }
        })
    }

    //清除定时器
    static clearTO() {
        beforeTarget = undefined;
    }

    //加事件
    static addEvent(event) {
        cuurUI.push(event);
    }

    /**
     * 切换场景时直接移除掉落效果
     */
    static removeProp(){
        if(propArr){
            remove_nodes_fun(propArr);
        }
    }

    static drop_outFun(arg,msg,fighter,callback ?) {
        // if(!false){
        //     return;
        // }    
        if (drop_funarr.length == 0) {
            // console.log("开始展示掉落效果~~~~~~！在此计算需不需要出现掉落效果")
            if (arg && arg[0]) {
                let award = arg,
                    sample,
                    sample1;
                    propArr = [];
                //遍历prop 去重
                for (let i = 0, len = award.length; i < len; i++) {
                    if (i > 8) break;
                    sample = Pi.sample[award[i][0][0] || award[i][0]];
                    let career_id = getDB("player.career_id");
                    let count = sample.type === "equip" ? 1 : (award[i][0][1] ? award[i][0][1][0] : award[i][1]);
                    for (let j = i + 1; j < len; j++) {
                        sample1 = Pi.sample[award[j][0][0] || award[j][0] ];
                        if ((sample.id || sample.sid) === (sample1.sid || sample1.id)) {
                            j = ++i;
                            count += sample1.type === "equip"? 1 : (award[i][0][1] ? award[i][0][1][0] : award[i][1]);
                        }
                    }
                    if(sample.folder_pos == "Equip" ? sample.drop_module[sample.career_id.indexOf(career_id)] == "undefined" : sample.drop_module == "undefined") continue
                    if((sample.id || sample.sid) == 150002) continue;
                    propArr.push(sample);
                    globalSend("goodsTip", {
                        words: [ sample.id || sample.sid, count ]
                    });
                }
    
                drop_funarr.push(arg);
                if(propArr.length != 0){
                    circleArr = [];
                    Circel.circelBox = [];
                    targetPosition.push(msg[0],msg[1],msg[2]);
                    fightStartPosition = [];
                    // console.log("开始计算掉落的物品的随机坐标~~~~!，计算开始")
                    fightStartPosition.push(fighter[0],fighter[1],fighter[2],fighter[3])
                    for(let i=0;i<propArr.length;i++){
                        if(propArr[i] !== '104'){
                            // console.log("在此是计算后的掉落物品的初始坐标~~~~~!",i,Circel.circelBox)
                            Circel.createRandomNew(msg[0],msg[1]);
                        }
                    }
                    circleArr = Circel.circelBox;
                    // console.log("start position",fighterPosition);
                    // console.log("位置！！！",Circel.circelBox,propArr)
                    // console.log("坐标计算完毕，开始创建模型！展示到场景上~~~~~")                
                    node_fun();
                    let time = mgr_data.name == "wild" ? 1500 : 2000;
                    let set1 = setTimeout(()=>{
                        flag = true;
                        callback && callback();
                        clearTimeout(set1);
                        set1 = undefined;
                    },time)
                    
                }else{
                    drop_funarr = [];
                }
            }
        }
    }

    /**
	 * @description 掉落效果
	 */
	static fighter_position (msg,index){
        if(!flag) return;
        fighterPosition = [];
        fighterPosition.push(msg.msg[0],msg.msg[1],msg.msg[2]);
        if(star_position.length == 0){
            star_position = [fighterPosition[0],fighterPosition[2]];
        }
        let empty = 0;
        newPosition = [];
        let speed = 0.55;
        let mark = false;
        // console.log('fighter的位置++++',fighterPosition)
        for(let i=0;i<circleArr.length;i++){
            //控制模型飞到人物的胸口
            let high = fightStartPosition[3];
            //两点之间的直线距离
            let dist =  Math.sqrt(Math.pow((fighterPosition[2] - circleArr[i][1]),2) + Math.pow((fighterPosition[0] - circleArr[i][0]),2));
            
            if(star_position.length !== 0 && star_position[0] !== fighterPosition[0] && star_position[1] !== fighterPosition[2]){
                speed = speed+0.1;
                // console.log("速度的变化+++++++++",speed)            
            }
            //每一步的跨度
            dist = (speed / dist);
            // console.log("两点之间的直线距离+++++++++",i,dist)
            
            high = high+0.05;
            if(high >= fightStartPosition[3]){
                high = fightStartPosition[3];
            }
            // console.log('模型的飞行高度++++',high,fightStartPosition[3])
            if(dist >= 1){
                newPosition[i] = [fighterPosition[0],fighterPosition[2],high];
                circleArr[i] = 0;
                remove_node_fun(i);
                continue;
            }
            if(circleArr[i] != 0){ 
            //移动之后的坐标 = 原点坐标 + 跨度
                circleArr[i][0] += (fighterPosition[0] - circleArr[i][0]) * dist;
                circleArr[i][1] += (fighterPosition[2] - circleArr[i][1]) * dist;
                // console.log("移动之后的坐标+++++++++"+i,circleArr[i][0],circleArr[i][1],fighterPosition,star_position)
                newPosition[i] = [circleArr[i][0],circleArr[i][1],high];
            }
        }

        if(mgr_data.name !== "wild" && mgr_data.name !== "fight"){
            remove_nodes_fun(newPosition);
            delete cuurUI[index]
        }
        for(let i=0;i<circleArr.length;i++){
            if(circleArr[i] != 0){
                mark = true;
            }
        }
        if(!mark){
            delete cuurUI[index];
        }
        for(let n=0;n<circleArr.length;n++){
            if(circleArr[n] == 0){
                empty++;
            }
            if(empty == circleArr.length){
                
                drop_funarr = [];
                flag = false;
                return;
            } 
        }
        drop_out_effect(propArr,newPosition);
    }


    /**
     * boss血条
     * @param arg 
     * @param index 
     * @param now 
     */
    static targetHead(arg, index, now) {
        let headMesh = arg.head,
            fighter,
            target;
        fighter = typeof(arg.f.fighter) == "number" ? FMgr.scenes.fighters.get(arg.f.fighter) : arg.f.fighter;
        target = arg.f.curTarget ? FMgr.scenes.fighters.get(arg.f.curTarget) : arg.f.target;
        
        if(target && fighter){
            if (target.hp <= 0 || fighter.hp <= 0 ) {
                mgr.remove(headMesh);
                delete cuurUI[index];
                return;
            }
        }

        if(arg.f.curTarget == -1 && headMesh ){
            // console.log(" targethead",headMesh,arg.f);
            mgr.remove(headMesh);
            delete cuurUI[index];
            return;
        }

        if (!headMesh && target) {
            if (fighter && fighter._show && fighter._show.old.ref && typeof target != "number" && target._show && target._show.old && target._show.old.ref && target.show_type == 1) {
                headMesh = {};
                let width = mgr_data["div"][mgr_data.name]["width"],
                    height = mgr_data["div"][mgr_data.name]["height"];
                headMesh.x = mgr_data.name == "wild" ? width * 0.2 - 40.5 :  width * 0.2 - 80.5;
                headMesh.y = mgr_data.name == "wild" ? 10 : height * ((0 - 1) * 173/266) + 36.9586;
                headMesh.z = 0;
                headMesh.scale = mgr_data.name == "wild" ? (mgr_data.scale * (2/3)) : (mgr_data.scale * (2/2.7) + 0.11);
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

        if(target){
            // headMesh.head = target.head;
            headMesh.level = target.level;
            headMesh.name = target.name;
            headMesh.hp = target.hp > 0 ? parseInt(target.hp) : 0;
            headMesh.max_hpCount = target.max_hpCount;
            let h = Common.numberCarry(parseInt(headMesh.hp), 1000000) + "/" + Common.numberCarry(parseInt(headMesh.max_hpCount), 1000000);
            let visible = (headMesh.hp / headMesh.max_hpCount <= 0) ? false : true;
            mgr.setDamage(headMesh, [headMesh.hp / headMesh.max_hpCount, 1, 1], 1)
            mgr.setText(headMesh,h,5);
            // mgr.modify(headMesh);
        }
        
    }

}

//--------------------------------物品掉落已经boss血条-------------------------------//
/**
 * remove所有节点
 * @param arr 
 */
const remove_nodes_fun = (arr) => {
    for(let i = 0;i<arr.length;i++){
        if(arr[i] !== "104"){
            //移除
            let time1 = Date.now();
            mgr.remove(drop_list["drop_out_"+i]);
            let time2 = Date.now();
            // console.log("掉落飞行的modify的时间" + i + " + "+  (time2 - time1))
        }
    }
}

/**
 * 创建掉落物品节点
 */
const node_fun = () => {
    
    for(let i = 0;i<propArr.length;i++){
        let career_id = getDB("player.career_id");
        let icon;
        if(propArr[i].folder_pos == "Equip"){
            icon = propArr[i].drop_module[propArr[i].career_id.indexOf(career_id)];
        }else{
            icon = propArr[i].drop_module;
        }
        
        drop_list["drop_out_"+i] = {};
        //倒计时背景图片
        //节点位置
        drop_list["drop_out_"+i].x = circleArr[i][0];
        drop_list["drop_out_"+i].y = circleArr[i][1];
        drop_list["drop_out_"+i].z = 0;
        drop_list["drop_out_"+i].scale = 1;
        drop_list["drop_out_"+i].isOnce = true;
        drop_list["drop_out_"+i].Gscale = 1;
        drop_list["drop_out_"+i].model = icon;
        drop_list["drop_out_"+i].guangzhu = quality[propArr[i].quality];
        //创建.
        mgr.create(drop_list["drop_out_"+i],"drop_out");
    }
}

/**
 * remove单个掉落节点
 * @param num 第几个掉落物品
 */
const remove_node_fun = (num : number) => {
    mgr.remove(drop_list["drop_out_"+num]);
}

/**
 * 更新掉落物品坐标等
 * @param arr 
 * @param msg 
 */
const drop_out_effect = (arr,msg) => {
    for(let i = 0;i<circleArr.length;i++){
        if(circleArr[i] !== "104" && circleArr[i] != 0){
            //节点位置
            drop_list["drop_out_"+i].x = msg[i][0];
            drop_list["drop_out_"+i].y = msg[i][1];
            drop_list["drop_out_"+i].z = msg[i][2];
            drop_list["drop_out_"+i].Gscale = 0.1;
            //更新
            mgr.setOnlyPos(drop_list["drop_out_"+i],[msg[i][0],msg[i][2],msg[i][1]]); //更新模型position
            if(drop_list["drop_out_"+i]._show && drop_list["drop_out_"+i]._show.old.children[1].ref){
                mgr.setDamage(drop_list["drop_out_"+i],0.1,1); //更新模型的缩放
            }
            // mgr.modify(node_list["drop_out_"+i]);
        }
    }
}

/**
 * 计算掉落物品的初始坐标
 */
let Circel = {
    circelBox: new Array(),

    //随机圆形区域坐标
    randomCirclePos : function (r, a, b) {
        while (true) {
            var x = Math.random() * 2 * r + (a - r),
                y = Math.random() * 2 * r + (b - r);
            if (Circel.isCircle(r, a, b, x, y)) {
                return [x, y]
            }
        }
    },

    //是否在圆内
    isCircle : function(r, a, b, x, y) {
        return (x - a) * (x - a) + (y - b) * (y - b) <= r * r;
    },

    createRandomNew: function (x,y) {
        var newCircel;
        var bTouch;
        //随机一个点
        newCircel = Circel.randomCirclePos(2.3,x,y);
        bTouch = false;
        
        for(var c = 0; c < Circel.circelBox.length; c++) {
            var oldCircel = Circel.circelBox[c];

            var distance = Math.sqrt(Math.abs(Math.pow(newCircel[0]-oldCircel[0], 2)) +
            Math.abs(Math.pow(newCircel[1]-oldCircel[1], 2)));
            // console.log("两个物品之间的距离~~~~",distance);
            if (distance <= 0.3){
                bTouch = true;
                break
            }
        }

        if (false == bTouch) {
            Circel.circelBox.push(newCircel);
            return newCircel;
        }else{
            Circel.createRandomNew(targetPosition[0],targetPosition[1]);
        }
    }
};

//-------------------------------分割线----------------------------------//
/**
 * 控制特效是否屏蔽
 * @param type 
 * @param callback 
 */
const controlShield = (type, callback, sid) => {
    if (shield[type] || (shield["fighter"] && roleId !== sid)) {
        return;
    }
    //task(callback,null,6000,1);
    callback();
}
const getSkill = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) return list[i];
    }
}
const comboShake = (list, skill) => {
    let s, backSkill = skill.backSkill, t = 0;
    if (!backSkill) {
        return;
    }
    for (let i = backSkill.length - 1; i >= 0; i--) {
        s = getSkill(list, backSkill[i]);
        if (t) {
            t += s.actionTime;
        }
        if (s.shake) {
            t += 1;
        }
    }
    if (t) {
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
const effectPos = (f, effect, skill, type, index) => {
    let ak;
    if (type == "skill") {
        ak = index[3]
    } else if (type == "hit") {
        ak = index[2];
    }

    if (!ak)
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
const lineVP = (start, end, r) => {
    let fl_d_x = end.x - start.x,
        fl_d_y = end.y - start.y,
        fl = Math.sqrt(fl_d_x * fl_d_x + fl_d_y * fl_d_y) || 1,
        //新原点坐标
        dx = fl_d_x * (fl + r) / fl + start.x,
        dy = fl_d_y * (fl + r) / fl + start.y;
    return [dx, dy];
}
/**
 * @description 震屏动画
 * @param camera 相机
 * @param shakeArray 震动动画点 
 * @param float 幅度
 * @param f fighter
 */
UiFunTable.runCuurUi();

const shakeRoot = function shakeRoot (param, i) {
    if (shakeIndex >= shakeArray.length) {
        let d = new Date();
        shake_finish = d.getTime();
        shakeIndex = 0;
        cuurUI.splice(i, 1);
        // let _s = mgr_data.sceneTab[mgr_data.name];

        // if(!_s || _s.handScene){
        //     if (param.f.sid == getDB("player").role_id) {
        //         mgr.setPos(param.camera, [param.f.x, param.f.y, param.f.z]);
        //     }
        // }
        return;
    }
    // console.log("改变前", [...param.camera._show.old.transform.position])
    let x = param.camera._show.old.transform.position[0] + shakeArray[shakeIndex][0] * param.float;
    let y = param.camera._show.old.transform.position[2] + shakeArray[shakeIndex][1] * param.float;
    let z = param.camera._show.old.transform.position[1] + shakeArray[shakeIndex][2] * param.float;
    mgr.setOnlyPos(param.camera, [x, y, z]);
    // console.log("改变后", [...param.camera._show.old.transform.position])
    shakeIndex++;
    cuurUI.splice(i, 1);
    return cuurUI.push({
        "param": {
            camera: param.camera,
            float: param.float,
            f: param.f
        },
        "fun": shakeRoot
    });  
};




// const shakeRoot = function (camera, shakeArray,float, f) {
//     if (shakeIndex >= shakeArray.length) {
//         shock_screen = false;
//         if (shakeTimeRef) clearTimeout(shakeTimeRef);
//         shakeTimeRef = undefined;
//         shakeIndex = 0;
//         let _s = mgr_data.sceneTab[mgr_data.name];

//         if(!_s || _s.handScene){
//             if (f.sid == getDB("player").role_id) {
//                 mgr.setPos(camera, [f.x, f.y, f.z]);
//             }
//         }
//         return;
//     }
//     console.log("改变前", [...camera._show.old.transform.position])
//     let x = camera._show.old.transform.position[0] + shakeArray[shakeIndex][0] * float;
//     let y = camera._show.old.transform.position[2] + shakeArray[shakeIndex][1] * float;
//     let z = camera._show.old.transform.position[1] + shakeArray[shakeIndex][2] * float;
//     mgr.setPos(camera, [x, y, z]);
//     console.log("改变后", [...camera._show.old.transform.position])
//     shakeIndex++;
//     shakeTimeRef = setTimeout(function () {
//         shakeRoot(camera, shakeArray, float, f);
//     }, shakeTime);
// };