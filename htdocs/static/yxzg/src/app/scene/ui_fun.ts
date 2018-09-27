/**
 * @description 战斗表现
 */
//=============================引入mod下文件

//=============================引入同目录文件
//pi
import * as root from "../../pi/ui/root";
//mod
import { Cach } from "../mod/cach";
//scene
import { mgr, mgr_data } from "./scene";
import { Damage } from "./class";
import { module_cfg as _module } from "./plan_cfg/module_config";
import { monster_cfg as _monster } from "./plan_cfg/monster_config";

import { getGlobal } from "../../pi/widget/frame_mgr";

let randomNum: number,
    roleId = 0,
    //用于特效
    effectID = 2,
    beforeTarget,
    _cfg = {
        "monster": _monster,
        "fighter": _module
    },
    show_damage = true;

let time = Date.now();

//战斗表现事件列表
export let cuurUI = [];
//战斗特效列表，用于特效播放完毕之后清除
export let effectList: any = {};
//设置游戏角色id
export const setRole = (id) => {
    roleId = id;
}

/**
 * @description 将值初始化
 */
export const initValue = () => {
    cuurUI = [];
    effectList = {};
    UiFunTable.cach.clear();
}

export const getEffectId = (type?) => {
    let id = ++effectID;
    return id;
}

export class UiFunTable {
    //换成飘字列表
    static cach = new Cach();

    //移除伤害冒字节点
    static damageCartoon(arg, index) {
        let _node = arg.node;

        _node._show.time = Date.now();
        UiFunTable.cach.add(_node.value+"-"+_node.type,_node._show);
        delete cuurUI[index - 0];
        // mgr.remove(arg.node,node.scene);
        mgr.setOnlyPos(_node,[1000,0,0]);
        return
    }
    
    //创建技能特效
    static skillEffect(arg, index, now) {
        // let f = arg.fighter,
        //     skill = arg.skill,
        //     ss = getSkill(arg.fighter.skill, skill.id),
        //     eff = ss.skillEffect[arg.index],
        //     effectTime, skillEffectObj, effctClearTime,
        //     len = ss.skillEffect.length,
        //     ce,
        //     rl;
        // if (arg.time + eff[1] > now) {
        //     return; //技能特效延迟
        // }
        // if (len > 0) {
        //     ce = (se) => {
        //         let _id = getEffectId("skillEffect");
        //         let skillMirror: any = {
        //             "id": { "id": _id, "name": f.sname },
        //             "effect": se[0],
        //             "isOnce": true,
        //             // "pos":se[2],
        //             "x": 0,
        //             "y": 0,
        //             "z": 0
        //         };
        //         effectList[_id] = {
        //             "type": "effect",
        //             "obj": skillMirror,
        //             "locTime": Date.now()
        //         }
        //         return skillMirror;
        //     };
        //     rl = (se) => {
        //         //se[1]:----1:目标身上， 2：自己身上， 3：场景上,  4:自己武器上，5：自己外层，6：目标外层
        //         if (se[2] == 1) {

        //             for (let i = 0; i < arg.target.length; i++) {
        //                 let target = arg.target[i], sm;
        //                 if (!target || !target._show || !target._show.old || !target._show.old.ref)
        //                     continue;
        //                 effctClearTime = now + effectTime;
        //                 //console.log("effect:"+effectID)
        //                 sm = ce(se);
        //                 effectPos(target, sm, ss, "skill", se);
        //                 mgr.create(sm, "effect", target._show.old.children[0]); //将技能特效添加到目标身上

        //             }

        //         } else if (se[2] == 2) {
        //             if (!f || !f._show || !f._show.old || !f._show.old.ref) {
        //                 delete cuurUI[index];
        //                 return;
        //             }
        //             let sm = ce(se);
        //             effectPos(f, sm, ss, "skill", se);
        //             //console.log("effect:"+effectID)
        //             mgr.create(sm, "effect", f._show.old.children[0]); //将技能特效添加到自己身上

        //         } else if (se[2] == 3) {
        //             let sm = ce(se);
        //             sm.x = f.x;
        //             sm.y = f.y;
        //             sm.lookat = f.lookat;
        //             effectPos(f, sm, ss, "skill", se);
        //                 mgr.create(sm, "effect");//将技能特效添加到场景上

        //         } else if (se[2] == 4) {
        //             let sm = ce(se);
        //             effectPos(f, sm, ss, "skill", se);
        //             mgr.create(sm, "effect", f._show.old.children[0].children[1]);//将技能特效添加到武器上

        //         } else if (se[2] == 5) {
        //             let sm = ce(se);
        //             effectPos(f, sm, ss, "skill", se);
        //             //console.log("effect:"+effectID)
        //             mgr.create(sm, "effect", f._show.old); //将技能特效添加到自己外层

        //         } else if (se[2] == 6) {
        //             for (let i = 0; i < arg.target.length; i++) {
        //                 let target = arg.target;
        //                 if (!target || !target._show || !target._show.old || !target._show.old.ref)
        //                     continue;

        //                 effctClearTime = now + effectTime;
        //                 let sm = ce(se);
        //                 effectPos(target, sm, ss, "skill", se);
        //                 //console.log("effect:"+effectID)
        //                 mgr.create(sm, "effect", target._show.old); //将技能特效添加到目标外层
        //             }
        //         }
        //     }
        //     rl(eff);
        // }

        // delete cuurUI[index]; //从cuurUI中删除本方法(停止运行)
    }

    //伤害冒字
    static damgeText(node) {
        if(!show_damage){ return; }
        const cach = UiFunTable.cach.one(node.value+"-"+node.type);
        if(cach){
            node._show = cach;
            mgr.setOnlyPos(node,[node.x / 100,node.y / 100,node.z / 100]);
        }else{
            node = new Damage(node);
            node.time = Date.now();
            mgr.create(node, "damage");
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

    //buff特效
    static buffEffect(arg, index, now) {
        // let f = typeof(arg.target) == "number" ? FMgr.scenes.fighters.get(arg.target) : arg.target;
        // if(!f){
        //     delete cuurUI[index];
        //     return
        // }
        // if(f.buffEffList[arg.effect+"_"+f.sid+"_"+arg.id] || f.hidden){
        //     return; 
        // } 
        // let id = getEffectId();
        // f.buffEffList[arg.effect+"_"+f.sid+"_"+arg.id] = {
        //     "id":{"id" : id},
        //     "effect": arg.effect,
        //     "isOnce": arg.once == 1 || arg.once == 2 ? false : true,
        //     "fighter" : f,
        //     "scale" : f.buffEffScale ? f.buffEffScale : 1,
        //     "effectType" : arg.once,
        //     "x": 0,
        //     "y": 0,
        //     "z": 0
        // };
        
        // delete cuurUI[index];
    }

    //移除BUFF特效
    static removeBuffEffect(arg, index, now) {
        // let f = typeof(arg.fighter) == "number" ? FMgr.scenes.fighters.get(arg.fighter) : arg.fighter;
        // if(!f) {
        //     delete cuurUI[index];
        //     return;
        // }
        // if(!f.buffEffList[arg.effect+"_"+f.sid+"_"+arg.id]){
        //     return; 
        // }

        // if(f.buffEffList[arg.effect+"_"+f.sid+"_"+arg.id]._show){
        //     mgr.remove(f.buffEffList[arg.effect+"_"+f.sid+"_"+arg.id]);
        // }
        // delete f.buffEffList[arg.effect+"_"+f.sid+"_"+arg.id];
        
        // delete cuurUI[index];
    }

    //激发buffUi
    static excitationBuff(arg, index, now) {
        // let arr = [-5, -3, 0, 3, 5];
        // let randomNum = arr[Math.ceil(Math.random() * 10) % 5];
        // let type = arg.effect,
        //     target = arg.target,
        //     _buff = buff[arg.buffId],
        //     goal;
        // let value = parseInt(arg.value);
        //     delete cuurUI[index];            
        // if (type === "hp") {
        //     //buff会有加血减血之分，有可能buff是扣自己血，所以应该当成伤害显示
        //     let text_type = "";
        //     if (target.camp == 1) goal = "f";
        //     else goal = "t";
        //     target.show_hp += value;
        //     if (value >= 0) {
        //         text_type = goal + "_stealHP";
        //         type = "stealHP";
        //     } else {
        //         target = _buff.triggerTarget == "F" ? arg.fighter : arg.target;
        //         text_type += goal + "_damage";
        //         type = "debuff";
        //         value = -value;
        //     }
        //     text_type += "_critical";
        //     // mgr.modify(target);
        //     UiFunTable.modifyHP(target);
        //     let node : any = {
        //         x: target.x * 100 + randomNum,
        //         y: target.y * 100 - 100,
        //         z: target.z * 100 + base_cfg["buffValueP"].value[0],
        //         scale: base_cfg["buffValueS"].value[0],
        //         transp: base_cfg["buffValueA"].value[0],
        //         "r": arg.r,
        //         "text_type": text_type,
        //         "type": type,
        //         "isCrits": 0,
        //         "goal": goal,
        //         "value": value,
        //         "scene": mgr_data.name
        //     };
        //     UiFunTable.damgeText(node);

        // } else if (type === "god") {

        //     let text_type = "";
        //     if (target.camp == 1) text_type = "f";
        //     else text_type = "t";
        //     text_type += "_god";

        //     let node : any = {
        //         x: target.x * 100 + randomNum,
        //         y: target.y * 100 - 100,
        //         z: target.z * 100 + base_cfg["buffValueP"].value[0],
        //         scale: base_cfg["buffValueS"].value[0],
        //         transp: base_cfg["buffValueA"].value[0],
        //         "r": arg.r,
        //         "text_type": text_type,
        //         "type": type,
        //         "isCrits": 0,
        //         "goal": goal,
        //         "value": value,
        //         "scene": mgr_data.name
        //     };
        //     UiFunTable.damgeText(node);

        // } else if (type === "shield") {
        //     let text_type = "";
        //     if (target.camp == 1) text_type = "f";
        //     else text_type = "t";
        //     text_type += "_shield";

        //     let node : any = {
        //         x: target.x * 100 + randomNum,
        //         y: target.y * 100 - 100,
        //         z: target.z * 100 + base_cfg["buffValueP"].value[0],
        //         scale: base_cfg["buffValueS"].value[0],
        //         transp: base_cfg["buffValueA"].value[0],
        //         "r": arg.r,
        //         "text_type": text_type,
        //         "type": type,
        //         "isCrits": 0,
        //         "goal": goal,
        //         "value": value,
        //         "scene": mgr_data.name
        //     };
        //     UiFunTable.damgeText(node);

        // } else if (type === "stun") {
        //     let text_type = "";
        //     if (target.camp == 1) text_type = "f";
        //     else text_type = "t";
        //     text_type += "_stun";

        //     let node : any = {
        //         x: target.x * 100 + randomNum,
        //         y: target.y * 100 - 100,
        //         z: target.z * 100 + base_cfg["buffValueP"].value[0],
        //         scale: base_cfg["buffValueS"].value[0],
        //         transp: base_cfg["buffValueA"].value[0],
        //         "r": arg.r,
        //         "text_type": text_type,
        //         "type": type,
        //         "isCrits": 0,
        //         "goal": goal,
        //         "value": value,
        //         "scene": mgr_data.name
        //     };
        //     UiFunTable.damgeText(node);
        // }
    }

    //移除模型
    static remove(arg, index, now) {
        if (now < arg.time) {
            return;
        }
        arg.func();
        delete cuurUI[index];
    }
    
    //执行cuurUI列表
    static runCuurUi() {
        let frame = getGlobal();
        let timer = Date.now();
        frame.setPermanent(()=>{
            let time = Date.now();
            if(time - timer < 28)
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

    //加事件
    static addEvent(event) {
        cuurUI.push(event);
    }

}

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

UiFunTable.runCuurUi();