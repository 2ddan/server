/**
 * @description 战斗显示
 */
//=====================================引入mod文件
import { data as db } from "app/mod/db";
import { cfg } from "app/mod/pi";

//=====================================引入同目录文件
import { mgr, mgr_data } from "app/scene/scene";
import { cuurUI, UiFunTable,cuurShow } from "app/scene/ui_fun";

import { monster_base } from "fight/b/common/monsterBase";
import { role_base } from "fight/b/common/role_base";

import {Fight_common} from "./fight_common";

export const fightShow = {
    //插入战斗者
    insert: (e: any) => {

        // 初始化时，应该看向场景中心(0,0,0)
        if (!e.fighter.lookat)
            e.fighter.lookat = {
                "value": [0, 0, 0],
                sign: Date.now()
            };
        mgr.create(e.fighter, e.fighter.type);

        if (e.fighter.sid === db.user.rid) {
            mgr.setPos(mgr_data.camera[mgr_data.name], [e.fighter.x, e.fighter.y, e.fighter.z]);
        }
    },

    //创建其他模型
    create: (e: any) => {
        if (e.parent && (!e.parent._show || !e.parent._show.old || !e.parent._show.old.ref))
            return;
        mgr.create(e.mesh, e.mesh.type, e.parent ? e.parent._show.old : null);
    },
    
    move: function (e) {
        let scene_name = mgr_data.fightSceneName || mgr_data.name;
        let curTarget = mgr_data.sceneTab[scene_name].mapList[e.fighter.curTarget];
        //var curTarget = mgr_data.sceneTab[mgr_data.name].mapList[e.fighter.curTarget];

        mgr.setPos(e.fighter, [e.fighter.x, e.fighter.y, e.fighter.z]);
        if (mgr_data.name == "wild") {
            let _f = mgr_data.sceneTab[scene_name].own[0];
            mgr.setPos(mgr_data.camera[mgr_data.name], [_f.x, _f.y, _f.z]);
        } else if (e.fighter.sid == db.user.rid)
            mgr.setPos(mgr_data.camera[mgr_data.name], [e.fighter.x, e.fighter.y, e.fighter.z]);


        if (e.moving === 0) {
            e.fighter.state = "standby";
            if (e.fighter.wing) {
                e.fighter.winganim = "standby";
            }
        } else {
            e.fighter.state = "run";
            if (e.fighter.wing) {
                e.fighter.winganim = "run";
            }
        }
        if (e.fighter.playAnim) delete e.fighter.playAnim

        if(e.fighter.path && e.fighter.path.length){
            if (e.fighter.lookat.value[0] != e.fighter.path[0].x || e.fighter.lookat.value[1] != e.fighter.path[0].z) {
                e.fighter.lookat = {
                    "value": [e.fighter.path[0].x, e.fighter.path[0].z, 0],
                    sign: Date.now()
                };
            }
        //看向点击操作的方向
        }else if (e.fighter.handMove) {
            if (e.fighter.lookat.value[0] != e.fighter.handMove.x || e.fighter.lookat.value[1] != e.fighter.handMove.y) {
                e.fighter.lookat = {
                    "value": [e.fighter.handMove.x, e.fighter.handMove.y, 0],
                    sign: Date.now()
                };
            }

            // 应该看向自己的目标
        } else if (curTarget) {
            if (e.fighter.lookat.value[0] != curTarget.x || e.fighter.lookat.value[1] != curTarget.y) {
                e.fighter.lookat = {
                    "value": [curTarget.x, curTarget.y, curTarget.z],
                    sign: Date.now()
                };
            }

        }
        mgr.modify(e.fighter);
    },
    spreadSkill: function (e) {
        let scene_name = mgr_data.fightSceneName || mgr_data.name;
        let curTarget = mgr_data.sceneTab[scene_name].mapList[e.fighter.curTarget];
        let fighter = e.fighter;
        let ss = e.skill;
        if (e.fighter.lookat.value[0] != curTarget.x || e.fighter.lookat.value[1] != curTarget.y) {
            e.fighter.lookat = {
                "value": [curTarget.x, curTarget.y, curTarget.z],
                sign: Date.now()
            };
        }
            
        UiFunTable.updateUseSkill(e.fighter, getSkillAction(e));

        if(!ss.delaySpreadSkillTime){
            
            mgr.setAnimationOnce(fighter, fighter.playAnim, fighter.lookat,[e.fighter.x, e.fighter.y, e.fighter.z])

            // task(objCall, [mgr, "setAnimationOnce", [fighter, fighter.playAnim, fighter.lookat,[e.fighter.x, e.fighter.y, e.fighter.z]]], 60000, 1);

            // TODO 根据e.skill 来确定技能特效
            cuurUI.push({ "param": e, "fun": UiFunTable.skillEffect });
            
            //震屏
            if(db.user.rid == fighter.sid && ss.shake){
                cuurShow.push({"param": e,"fun": UiFunTable.shakeEffect});
            }

            //cuurUI.push({ "param": e, "fun": UiFunTable.skillSpecialEffect });

            // TODO 根据e.skill 来确定技能音效
            cuurUI.push({ "param": e, "fun": UiFunTable.skillSound });	
            
            return;	
        }
        e.sid = fighter.sid;
        e.curTarget = curTarget;
        cuurUI.push({ "param": e, "fun": UiFunTable.delaySpreadSkill });

        // // TODO 根据e.skill 来确定技能特效
        // cuurUI.push({
        //     "param": e,
        //     "fun": UiFunTable.skillEffect
        // });

        // //震屏
        // if (e.skill.shake && e.fighter.camp == 1) {
        //     cuurUI.push({ "param": e, "fun": UiFunTable.shakeEffect });
        // }

        // // 飞行特效
        // //	cuurUI.push({ "param": e, "fun": UiFunTable.skillSpecialEffect });

        // //TODO 根据e.skill 来确定技能音效
        // // cuurUI.push({
        // //     "param": e,
        // //     "fun": UiFunTable.skillSound
        // // });

    },
    damage: function (e) {
        // // e.r.critical 暴击
        cuurUI.push({
            "param": e,
            "fun": UiFunTable.hitEffect
        });
        

        // TODO 以后增加运动和渐变特效
    },
    //添加buff
    addBuff: function (e) {
        cuurUI.push({
            "param": e,
            "fun": UiFunTable.buffEffect
        });
    },
    //激发buff
    effect: function (e) {
        cuurUI.push({
            "param": e,
            "fun": UiFunTable.excitationBuff
        });
    },
    //清除buff
    clearBuff: function (e) {

    },
    useSkill: function (e) {
        
    }
}

// ============================================= 本地
/**
 * @description 获取技能动作
 */
const getSkillAction = (e) => {
    let __cfg = cfg.robot,
        _during,
        skill_action;
    //获取配置信息
    __cfg = __cfg?__cfg.robot_base:{};
    __cfg = __cfg[e.fighter.career_id] || role_base[e.fighter.career_id] || monster_base[e.fighter.career_id];
    _during = __cfg.normal_during;
    skill_action = __cfg.skill_action[e.skill.id];
    if(!skill_action)
        return null;
    else//技能动作
    	return skill_action[0];
};
