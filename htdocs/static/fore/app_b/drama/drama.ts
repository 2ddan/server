/**
 * 导入模块
 */
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { destory, open } from "pi/ui/root";
import { data as db } from "app/mod/db";
import { mgr, mgr_data } from "app/scene/scene";
import { getRealNode } from "pi/widget/painter";
import { findNodeByAttr } from "pi/widget/virtual_node";
import { rotateMove } from "app/scene/camera_move";
import { Move } from "app/scene/move";
import { globalSend } from "app/mod/pi";
import { handScene, mapList } from "app_b/fight_ol/handscene";
import { initAnimFinishCB } from "app/scene/base/scene";
import { monster_base } from "fight/b/common/monsterBase";
import { monster_cfg } from "app/scene/plan_cfg/monster_config";
import { module_cfg } from "app/scene/plan_cfg/module_config";
import { role_base } from "fight/b/common/role_base";
import { bossStart } from "app_b/wild/wild";
import { openUiEffect, destoryUiEffect } from "app/scene/anim/scene";
/**
 * 导入配置
 */
import { story } from "cfg/c/story";


export const forelet = new Forelet();

export const globalReceive = {
    "initDrama": (msg) => {
        initDrama(msg);
    }
}

export class DramaEvent extends Widget {
    //点击屏幕, 跳过剧情
}

let speakTimer, //说话字幕定时器
    wordsTimer, //文字更新定时器
    start,
    fightScene,
    boss_module, //记录当前挑战boss的模型
    originRotate = []; //相机初始旋转值
/**
 * kais
 * @param arg {剧情id, 播放完回调}
 */
let startDrama = function (arg) {
    bossStart();
    if (!start) {

        arg.callback();
    } else {
        start(arg);
    }
    start = null;
}

/**
 * 初始化剧情数据 (每场战斗只调用一次)
 */
const initDrama = function (msg) {
    let thisStory = story[msg.id];
    //如果有剧情, 则初始化剧情函数
    if (thisStory) {
        start = gotoDrama;
    }
    fightScene = msg.fightScene;
    let fun = function () {
        let time = setTimeout(function () {
            clearTimeout(time);
            startDrama(msg)
        }, 50)
    }
    Move.setStopBack(fun);
}

/**
 * 获取剧情对话内容[开始剧情]
 * @param id 剧情id
 */
let gotoDrama = function (arg) {
    let thisStory = story[arg.id];
    //直接跳过
    if (!thisStory) {
        arg.callback;
        return;
    }
    initAnimFinishCB(finishCb);
    let cfg = [];
    let self = handScene.getSelf();
    self.lookat.value = arg.fighter_look;
    mgr.modify(self);

    for (let i in thisStory) {
        if (thisStory[i].speaker == "role") {
            thisStory[i].name = db.player.name;
        }
        cfg.push(thisStory[i]);
    }
    showDrama("wild", cfg, arg.callback)
}

/**
 * 剧情展示
 * @param name 场景名称
 * @param cfg 剧情数据
 * @param cb 剧情播放完毕回调
 */
const showDrama = function (name, cfg, cb) {
    //隐藏menu
    globalSend("showDrame", true);
    //获取场景摄像机
    let camera = mgr_data.camera[name];
    //设置手动状态，否则相机会自动根据主角位置移动 
    camera.hand = true;
    //保存相机初始旋转值
    originRotate = [camera.rotate[0], camera.rotate[1], camera.rotate[2]];
    let _index = 0;
    let next = function () {
        speakTimer = setTimeout(function () {
            _index++;
            if (cfg[_index]) {
                //清除定时器
                clearTimeout(speakTimer);
                speakTimer = null;
                //摄像机移动
                if (cfg[_index].camera_pos === 0) {
                    //硬切
                    return cameraMove.move_one(camera, cfg[_index], () => {
                        textDrama(cfg[_index], next);
                    });
                } else {
                    //运动切
                    return cameraMove.move_two(camera, cfg[_index], () => {
                        textDrama(cfg[_index], next);
                    });
                }

            }
            //剧情完毕
            else {
                let w = forelet.getWidget("app_b-drama-drama");
                if (w) {
                    destory(w);
                }
                //显示menu
                globalSend("showDrame", false);
                camera.rotate = originRotate;
                mgr.modify(camera);
                camera.hand = false;
                //清除定时器
                clearTimeout(speakTimer);
                speakTimer = null;
                fightScene.setPause(false);
                //关闭 
                cb && cb();
            }
        }, 1000)
    }
    if (cfg[_index]) {
        let w = forelet.getWidget("app_b-drama-drama");
        if (!w) {
            open("app_b-drama-drama");
        }
        fightScene.setPause(true);
        var firstMove = function () {
            let timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                //摄像机移动
                if (cfg[_index].camera_pos === 0) {
                    //硬切
                    return cameraMove.move_one(camera, cfg[_index], () => {
                        textDrama(cfg[_index], next);
                    });
                } else {
                    //运动切
                    return cameraMove.move_two(camera, cfg[_index], () => {
                        textDrama(cfg[_index], next);
                    });
                }
            }, 500)
        }
        rotateMove(camera, { "info": cfg[_index].camera_look, "func": "linear", "time": 1000 }, () => {
            firstMove();
        }, {}, false);
    }
};

/**
 * 更新字幕
 * @param obj [剧情各模型信息]
 * @param callback [字幕播放完毕回调]
 */
const textDrama = function (obj, callback) {
    let w: any = forelet.getWidget("app_b-drama-drama");
    //获取节点
    let node = getRealNode(findNodeByAttr(w.tree, "data-desc", "dramaTalk"));
    node.parentElement.style.backgroundColor = "rgba(0,0,0,0.7)";
    let model; //模型
    let action; //动作
    let effect; //特效
    let anim_id;  // 1 -> 玩家, 2 -> boss
    //模型动作 (玩家)
    if (obj.speaker === "role") {
        model = handScene.getSelf();
        action = obj.speaker_action[db.player.career_id];
        anim_id = 1;
        effect = obj.speaker_effect[db.player.career_id];
    } else if (obj.speaker === "boss") {
        let arr = Object.keys(mapList);
        for (let i of arr) {
            if (mapList[i].sid === obj.monster_id) {
                boss_module = mapList[i];
                model = mapList[i];
                action = obj.speaker_action["boss"];
                anim_id = 2;
                effect = obj.speaker_effect["boss"];
            }
        }
    }
    //模型特效
    if (effect) {
        let data = {
            "effect": effect,
            "isOnce": true,
            "index": 0,
            "lookat":model.lookat,
            "scale": 1,
            "parent": model
        };
        //mgr.create(data, "effect");
        openUiEffect(data, null);
    }
    //动作
    if (model) {
        model.playAnim = { "name": action, "isOnce": true, "id": anim_id };
        mgr.modify(model);
    }
    
    node.innerHTML = '';
    if (obj.words) {
        node.style.backgroundColor = "transparent";
        node.innerHTML = `${obj.name}: ${obj.words}`;
    } else {
        node.parentElement.style.backgroundColor = "transparent";
    }
    let timer = setTimeout(function () {
        clearTimeout(timer);
        wordsTimer = null;
        callback && callback();
    }, 800);
}

/**
 * 摄像机移动
 */
const cameraMove = {
    //硬切
    move_one: function (camera, obj, callback) {
        //1.获取相机位置
        let pos = obj.camera_look;
        //2.设置相机位置
        camera.rotate = [pos.rx, pos.ry, pos.rz];
        mgr.setPos(camera, [pos.x, pos.y - camera.position[2], pos.z - camera.position[1]]);
        mgr.modify(camera);
        callback && callback();
    },
    //动画移动
    move_two: function (camera, obj, callback) {
        rotateMove(camera, { "info": obj.camera_pos[1], "func": obj.camera_sport, "time": obj.camera_sport_time }, callback, {}, false);
    }
}

/**
 * 动作播放完毕, 回到待机状态
 */
const finishCb = function (id) {
    let action;
    if (id == 1) {
        let count = 0
        console.log("1 ->", count++);
        let player = handScene.getSelf();
        action = module_cfg[role_base[player.career_id].module].attack_standby;
        player.playAnim = { "name": action, "isOnce": false, "id": 1001 };
        mgr.modify(player)
    } else if (id == 2) {
        let count = 0
        console.log("2 ->", count++);
        action = monster_cfg[monster_base[boss_module.sid].module].attack_standby;
        boss_module.playAnim = { "name": action, "isOnce": false, "id": 1002 };
        mgr.modify(boss_module);
    }
}



