/**
 * 战斗
 */

//==========================================导入
//pi
import { Widget, factory } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { getRealNode } from "pi/widget/painter";
import { listenerList,open as pi_open, remove, add, destory,closeBack } from "pi/ui/root";
import { findNodeByAttr } from "pi/widget/virtual_node";
//mod
import { Common } from "app/mod/common";
import { Music } from "app/mod/music";
import { data as db, updata, get ,listen} from "app/mod/db";
import { open, close } from "app/mod/root";
import { Pi, globalSend, cfg } from "app/mod/pi";
import { Util } from "app/mod/util";

//scene
import { mgr, mgr_data } from "app/scene/scene";
import { Move, setFrame } from "app/scene/move";
import { setClickCallback, initAnimFinishCB } from "app/scene/base/scene";
import { cuurUI, UiFunTable, initValue } from "app/scene/ui_fun";
//app
import { Fight_common } from "fight/a/fore/fight_common";
import * as Fight from "fight/a/common/fight";
import { Init_Fighter } from "fight/a/common/init_fighter";
import { handScene, updateSelfModule, initMapList } from "app_b/fight_ol/handscene";
import { fightShow } from "fight/a/fore/fight_show";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { loadNow } from "app_a/download/download";
import { drop_outFun } from "app_b/widget/drop_out";
import { exitWild } from "app_b/wild/wild";
import { Common_m } from "app_b/mod/common";
import { scene_music } from "cfg/b/scene_music";
import { config_stronger } from "cfg/b/config_stronger";

// =============================================== 导出
/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet = new Forelet();

/**
 * @description 当前显示弹窗类型
 */
let fightType = "1";
/**
 * @description 退出提醒,false为需要提醒
 */
let remind = [];

/**
 * @description 记录打开的根组件
 */
let widgetsMap = [];

/**
 * @description 扩展widget
 */

export class Fightm extends Widget {
    attach() {
        if (forelet.getWidget("app_b-fight-fight_move") || forelet.getWidget("app_b-fight-account") || forelet.getWidget("app_b-fight-wild_lose_account")) return;
        mgr_data.limitTime = fightData.limitTime ? (fightData.limitTime * 1000) : "";
        //清空特效表
        clear();
        //绑定特效渲染器
        //UiFunTable.scene = "fightScene";
        //开始渲染
        mgr.pause(false);
        //重置战斗场景
        initFightScene(fightData);
        fightScene.limitTime = (fightData.limitTime ? (fightData.limitTime * 1000) : fightData.limitTime) || Infinity;
        //插入己方战士 
        initOwn(fightData);

        //let fightMove = move_fun[fightData.type] ? 1 : 0;

        // if (!fightMove) {
        //     mgr.setPos(mgr_data.camera.fight, [0, 400, 0]);
        //     mgr_data.camera.fight.rotate = [-Math.PI / 4.8, 0, 0];
        //     mgr.modify(mgr_data.camera.fight);
        // }

        loadSceneOk(fightData);

        fightScene.setPause(false);
    }
    //倒计时节水自动退出界面
    timeEnd1(){
        goback("app_b-fight-account");
        closeBack();
    }
    closeLoseAccount (){
        let w = forelet.getWidget("app_b-fight-wild_lose_account");
        w && w.cancel && w.cancel();
        if (accountBack) accountBack();
    }
    changeFight() {
        if (fightScene.autoFight) {
            fightScene.autoFight = false;
        } else {
            fightScene.autoFight = true;
        }
        getData.scene = { "autoFight": fightScene.autoFight, "fightData": fightData }
        forelet.paint(getData);
    }
    //战斗失败，前往
    gotoMenu(fun){
        goback("app_b-fight-account");
        let arr = fun.split(",");
        globalSend(arr[0],arr[1] || null);
    }
    gotoFunClick(e: any) {
        let fo = cfg.function_open.function_open;
        fo && globalSend(fo[e.cmd].send_fun);
        goback("app_b-fight-account");
    }
    goback() {
        goback("app_b-fight-account");
    }
    goback_tips(type?) {
        if (!remind[fightType])
            globalSend("popTip", {
                title: `是否退出战斗？`,
                type: "",
                btn_name: ["确 定", "取消"],
                cb: [
                    //确认
                    () => {
                        goback("app_b-fight-fight");
                        globalSend("exitFb");
                        if(type=="exp_mission"){
                            globalSend("openExpFb",false);
                        }
                    },
                    //取消
                    () => { }
                ],
                status: () => {
                    remind[fightType] = !remind[fightType];
                }
            });
        else
            goback("app_b-fight-fight");
    }
}

//========================================导出
//接收战斗资源管理界面关闭消息
//这才是真正的战斗开始
export const loadSceneOk = (fightData) => {
    if (!fightData) return
    let time = 0,
        fightMove = 0, // move_fun[fightData.type] ? 1 : 0,
        // startAni = function_open[fightData.type] ? function_open[fightData.type].fightStartAni : 0;   VS动画 
        startAni = 0;

    beginShow(startAni, time);
}

//显示战斗奖励

/**
 * @param msg {
        //战斗结束传到每个功能的
        result:{
            战斗结果
            r:1(己方胜)||2(敌方胜),
            战斗者最终信息
            fighter:{own:[{sid:10001,hp:100},...],enemy:[{sid:60001,hp:100},...]},
            整场战斗时间
            time:2200
        },
        战斗奖励
        award : {},
        额外零散数据
        extra : {
            //功能名字，与function_open表配置的key一致
            "source": "mission",
            //战斗星级
            "star": 0-3
        },
        后台判定结果，某些功能需要后台重新判定输赢，比如竞技场战斗超时，需要额外判定
        resu? : "win"||"lose";
    }
 */
export let account_data;
export const showAccount = (msg, callback) => {
    account_data = msg;
    account_data.name = "app_b-fight-account";
    accountBack = callback;
    let txt = '', text = "";
    let fo = cfg.function_open.function_open;
    if (fo && fo[msg.extra.source] && fo[msg.extra.source].fightBalance) {
        if (msg.result.r == 1) {
            txt = 'win', text = "战斗评价";
        }
        else {
            txt = 'balance';
        }
    } else {
        if (msg.result.r == 1 || msg.resu == "win") {
            txt = 'win', text = "战斗评价";
        }
        else {
            txt = 'lose', text = "请再接再厉,来日再战";
        }
    }

    //提升战斗力功能提示
    //if (txt == 'lose') msg.up_power_cfg = up_power_cfg;
    setTimeout(() => {
        msg.outcome = txt;
        msg.text = text;
        msg.time = Math.ceil(msg.result.time/1000) || 0;
        getData.account = msg;
        getData.Pi = Pi;
        getData.config_stronger = config_stronger;
        getData.function_open = cfg.function_open.function_open;
        getData.player = db.player;
        getData.fun_id = (db.open_fun && db.open_fun.id) || 0;
        getData.timeStr = timeStr;
        getData.exitStartTime = Util.serverTime();
        forelet.paint(getData);
        if(msg.extra.source === "wild_boss_lose"){
            open("app_b-fight-wild_lose_account");
        }else{
            open("app_b-fight-account");
        }
        let data: any = { "star": msg.extra.star, "r": msg.result.r, "source": msg.extra.source }
        if (msg.extra.flag) {
            data.flag = msg.extra.flag;
        }
        globalSend("openAccount", data)
        //Music.startUiSound("fight_win");
    }, 1500)
    // if (msg.result.r == 1 || ((msg.result.r == 2 || msg.result.r == 3) && fo[msg.extra.source].fightBalance)) {
    //     setTimeout(() => {
    //         //changNewRes(w);
    //     }, 3000);
    // }
}

export const goback = (arg: string, isfale?: boolean) => {
    let w: any = forelet.getWidget(arg);
    if (!fightScene && w) {
        close_w(arg, w);
        if (accountBack) accountBack();
        accountBack = null;
        return;
    }

    //Music.startBgSound("normal_only");//播放场景音乐

    //暫停渲染
    mgr.pause(true);
    fightScene.destroyScene(clear);
    //先暫停渲染在關閉頁面
    if (w) {
        close_w(arg, w);
    }
    //关闭结算窗体同时关闭战斗场景窗体
    if (arg === "app_b-fight-account") {
        //closeAccount(1);
        if (!isfale) {
            let w1: any = forelet.getWidget("app_b-fight-fight");
            if (w1) close_w("app_b-fight-fight", w1);
        }
        accountBack && accountBack();
        accountBack = null;
        //手动关闭战斗场景,则强制结束战斗
    } else if (arg == "app_b-fight-fight") {
        fightScene.setPause(true);
        //fighting && escapeBack && escapeBack();
        escapeBack && escapeBack();
    }
    fightData = null;
    fighting = false;
    escapeBack = null;
    fightCount = 0;
    getData = {};
    fightScene = null;
    delete mgr_data.sceneTab["fight"];
    //退出战斗界面 向心法副本界面 推送消息 重绘canvas
    globalSend("refreshGestFb", true);
}

export const findRes = (msg) => {
    let arr = [],
        repeat = {},
        _find = (f) => {
            let addRes = (_type, _value, key, _w?) => {
                let r = _type + _value + (_w || ""),
                    s: any = { type: _type };
                if (_w >= 0) {
                    s.weapon = _w;
                }
                if (!repeat[r]) {
                    s[key] = _value;
                    arr.push(s);
                    repeat[r] = 1;
                }
            };
            //设置配置表
            let _cfg = {
                "monster": (window as any).pi_modules["app/sample/monster_base"].exports.monster_base,
                "fighter": Pi.sample
            };
            //获取配置表的key robot
            let sid = (f.type === "player" || f.type === "robot") ? "player_" + f.info.sex : f.info.sid;
            //模型类型
            let type = f.type === "monster" ? "monster" : "fighter";
            //添加人物、怪物模型
            addRes(type, _cfg[type][sid].module, "id", f.mode.weapon || 0);
            //技能
            for (let k in f.skill) {
                // if(fight_skill.table[k].skillEffect && fight_skill.table[k].skillEffect != "undefined")addRes("effect",fight_skill.table[k].skillEffect,"name");
                // if(fight_skill.table[k].hitEffect && fight_skill.table[k].hitEffect != "undefined")addRes("effect",fight_skill.table[k].hitEffect,"name");
            }
            //幻化
            if (f.mode.change_to) {
                addRes("fighter", Pi.sample[f.mode.change_to].module, "id");
            }
            //时装
            if (f.mode.fashion) {
                addRes("fighter", Pi.sample[f.mode.fashion].module_f, "id");
                addRes("fighter", Pi.sample[f.mode.fashion].module_m, "id");
            }
            //翅膀
            if (f.mode.wing >= 0) {
                addRes("wing", (window as any).pi_modules["app/sample/wing_skin"].exports.wing_skin[f.mode.wing].module, "id");
            }
        };
    // if(msg.scene)arr.push({type:"scene",name:msg.scene || scene_floor.list[msg.type]['scene']});
    for (let k in msg.own_fight) {
        _find(msg.own_fight[k]);
    }
    for (let k in msg.enemy_fight) {
        for (let j in msg.enemy_fight[k]) {
            _find(msg.enemy_fight[k][j]);
        }
    }
    // return mgr.findRes(arr);
    return [];
};
/**
 * @description 开始战斗
 * @param {Json}msg 战斗数据{own_fight:[],enemy_fight:[],type:"arena(功能名字)",scene?:"场景文件名",cfg:{}(战斗配置，包括怪物及自己刷新初始位置)}
 * @param {Function}callback 战斗正常结束回调
 * @param {Function}escapeback 战斗中途退出回调
 * @example
 */
export const fight = (msg, callback, escapeback?) => {
    // if (Fight.count > 0 && (!fightData || msg.type !== fightData.type)) {
    //     globalSend("screenTipFun", {
    //         words: `正在挑战野外boss，请稍后再挑战。`
    //     })
    //     return;
    // }
    fightCount += 1;
    escapeBack = escapeback;
    // loadNow(findRes(msg),()=>{},()=>{
    //     _fight(msg,callback);
    // });
    exitWild(() => {
        _fight(msg, callback);
    });
}
/**
 * @description  设置广播消息接收接口
 */
export const globalReceive: any = {
    releaseMagic: (msg) => {
        Common_m.treasureSkill(fightScene, msg);
    }
}
/**
 * @description  获取角色自己
 */
export const getSelf = () => {
    return fightScene && !fightScene.pause && fightScene.fighters[0];
}
/**
 * @description  获取是否本地战斗进行中
 */
export const checkFighting = () => {
    return Fight.count;
}

//========================================本地
let getData: any = {};
let countHp = 0,
    fightScene,
    //是否开始战斗
    fighting = false,
    //缓存战斗数据
    fightData,
    //贴图资源
    meshRes,
    //战斗结束回调
    overCallback,
    //结算界面关闭回调
    accountBack,
    //战斗中途退出回调
    escapeBack,
    fightCount = 0;

/**
 * @description 处理开场动画
 * @param {Boolean} startAni 是否有开场动画
 * @param {Number} time 动画持续时间
 */
const beginShow = (startAni?, time?) => {
    //fightScene.setPause(true)
    if (startAni) {
        //开场动画
        open("app_b-fight-fight_move", fightData);
        //开场动画完成之后才开始战斗
        setTimeout(() => {
            //关闭开场动画
            close(forelet.getWidget("app_b-fight-fight_move"));
            //放入敌方战斗人员,开始战斗
            fightStart(fightData);
            fightScene.fightMove = true;
            fighting = true;
            //Fight_common.initFighterImage(fightSkills, fightScene);
        }, time);
    } else {
        //放入敌方战斗人员,开始战斗
        fightStart(fightData);
        fightScene.fightMove = true;
        fighting = true;
        //Fight_common.initFighterImage(fightSkills, fightScene);
    }
}
/**
 * @description 清理事件
 */
const clear = () => {
    initMapList();
    UiFunTable.clearTO();
    Move.clear();
    initValue();
};
//处理敌人波数
const _enemy = (msg) => {
    msg.enemy = [];
    if (msg.enemy_fight.length) {
        msg.enemy = msg.enemy_fight;
    }
    msg.enemy_fight = msg.enemy[0];
    msg.batch = 0;
};

const _fight = (msg, callback) => {
    //closeAccount(0);
    mgr_data.name = "fight";
    if (!fightScene) {
        initFightScene(msg);
    } else {
        // fightScene.destroyScene();
        // UiFunTable.clearTO();
        initValue();
        // fightScene.now = 0;
        fightScene.campTarget = undefined;
        fightScene.limitTime = msg.limitTime * 1000;
    }
    //设置怪物波数
    _enemy(msg);
    fightData = msg;
    getData.scene = { "autoFight": fightScene.autoFight, "fightData": fightData };
    forelet.paint(getData);
    //app.mod.fight_common.findRenderPic(msg);
    //处理战斗渲染资源,返回模型贴图路径表
    //meshRes = app.mod.fight_common.findRenderPic(msg);
    //加载贴图资源
    // //forelet.request("loadMeshRes",app.mod.fight_common.findRenderPic(fightData),function(r){
    //Music.stopBgSound("normal_only");//停止场景音乐
    //Music.startBgSound("fight_only");//播放战斗音乐
    //console.log("战斗资源加载成功！！"+r);
    let sce = getData.scene.fightData.cfg.scene;
    let src = scene_music[sce];
    if (src) {
        Music.playBgMusci(src);
    }


    //设置战斗结束回调
    overCallback = (r, scene) => {
        // fightScene.initmove();
        fighting = false;
        callback(r, scene);
        //野外boss战斗结束直接关闭战斗场景
        if (fightData.type == "Wildboss") goback("app_b-fight-account");
    };
    //},"sceneload");
    if (fightCount > 1) {
        initOwn(fightData);
        beginShow();
    } else {
        globalSend("initChat");
        pi_open("app_b-fight-fight");
    }
    // //初始化剧情数据
    // globalSend("initDrama", { 
    //     "id": "90001",
    //     "fightScene": fightScene
    // })    
};

const clickScene = (result) => {
    if (!result) return;
    let __self = fightScene.mapList[1], isSkill = null;
    if (result.type === "terrain") {
        __self.handMove = { x: result.data[0], y: result.data[2], click: true };
    } else {

        for (let k in __self.skill) {
            if (result.id == __self.skill[k].id)
                isSkill = __self.skill[k];
        }
        if (isSkill) {
            handSkill(isSkill, __self.mapId);
        } else if (fightScene.mapList[result.id] && fightScene.mapList[result.id].hp > 0 && fightScene.mapList[result.id].camp != 1) {
            fightScene.campTarget = result.id;
        }
    }
}

const handSkill = (skill, mapId) => {
    fightScene.handSkill(mapId, skill);
    globalSend("guideSkill");
}

//初始化战斗场景
const initFightScene = (msg) => {
    //设置点击监听
    setClickCallback((result) => {
        //console.log(result);
        //点击事件处理
        clickScene(result);
    });
    initAnimFinishCB((id) => {
        return UiFunTable.aniBack(id);
    })
    //设置移动渲染
    Move.setRender(true);
    //设置为本地帧率
    setFrame(false);
    if (fightScene) {
        fightScene.startTime = Date.now();
        return;
    };
    fightScene = Fight.createScene(1024, 1024, 1, "fight", mgr.yszzFight.scene, null, mgr.getSceneBuffer(msg.cfg.scene, ".nav"));
    fightScene.name = "fight";
    mgr_data.sceneTab["fight"] = fightScene;
    //战斗事件监听
    fightScene.listener = (r) => {
        if (mgr_data.name != "fight") return;

        //return;
        if (r.events.length > 0) {
            for (let i = 0, leng = r.events.length; i < leng; i++) {
                let e = r.events[i];

                Move.filter(e.type, e);
                try {
                    if(e.type == "damage" && e.target.hp <= 0){
                        let award = e.target.award,
                            fighter = e.fighter,
                            target = e.target,
                            award_list = [];
                        let fighter_pos = [fighter.x ,fighter.y ,fighter.z];
                        let target_pos = [target.x ,target.y ,target.z];
                        if(award){
                            for(let i = 0;i < award.length;i++){
                                if(award[i][0] != "money" && award[i][0] != "exp"){
                                    award_list.push(award[i]);
                                }
                            }
                            if(award_list.length != 0){
                                let timer = setTimeout(()=>{
                                    drop_outFun(award_list,target_pos,fighter_pos);
                                    clearTimeout(timer);                                    
                                },1500)
                            }
                        }
                    }
                    //console.log("app.mod.scene.fightShow : ",e);
                    if (e.type == "insert")
                        e = JSON.parse(JSON.stringify(e));
                    //战斗事件处理
                    handScene[e.type] && handScene[e.type](e, r.now);
                } catch (ex) {
                    if (console) {
                        console.log(e, ex);
                    }
                }
            }
        }
        //Move.loop();
        //if(ft>10)app.mod.scene.log("事件处理时间："+ft);
        //return;
        //执行特效
        setTimeout(()=>{
            UiFunTable.runCuurUi(r);
        },0)
        //if(ft>5)app.mod.scene.log("特效计算时间："+ft);
        return true;
    };

    fightScene.setPause(true);

    //战斗结束回调
    fightScene.overCallback = (r, scene) => {
        if (fighting && overCallback) {
            //延迟执行战斗结束回调
            setTimeout(() => {
                overCallback({
                    r: r,
                    time: fightScene.isEndFight,
                    fighters: Fight_common.getLeftHp(fightScene)
                }, scene);
                //Music.stopBgSound("fight_only");//停止战斗音乐
                overCallback = null;
            }, 1500);
        }
    };
    //战斗每波结束时附加判断，没到最后一波怪，不会真正结束
    fightScene.over = (r): boolean => {
        if (r == 1 && fightData.batch < fightData.enemy.length - 1) {
            fightData.batch += 1;
            fightData.enemy_fight = fightData.enemy[fightData.batch];
            //Fight_common.insertEnemy(fightData, fightScene);
            fightStart(fightData);
            return false;
        }
        return true;
    };
    //战斗开始
    fightScene.start();
}

const fightStart = (msg) => {
    //竞技场走机器人配置表
    let monster_cfg = msg.type == "arena" ? cfg.robot.robot_base : null;
    let _list: any;
    if (msg.enemy_fight[0][2] || msg.enemy_fight[0][2] == 0)
        _list = Init_Fighter.initMonster(msg.enemy_fight, monster_cfg);
    else
        _list = Init_Fighter.initFighter([msg.enemy_fight]);
    let pos = msg.cfg.enemy_pos[msg.batch];
    for (let i in _list) {
        let f = _list[i];
        f.name = Common.fromCharCode(f.name);
        f.x = pos[i][0];
        f.y = pos[i][1];
        f.camp = 2;
        if (msg.show_award) {
            f.award = msg.show_award.shift();
        }
        fightScene.insert(f);
    }
}

const initOwn = (msg) => {
    if (!msg) return;
    //插入己方战斗人员
    //Fight_common.initOwn(fightScene, msg.own_fight);
    let _list = Init_Fighter.initFighter(msg.own_fight),
        pos = msg.cfg.role_pos;
    //连续多次挑战，加血特效
    if (fightCount > 1) {
        let me = fightScene.mapList[1];
        initMapList();
        for (let i in _list[0]) {
            if (i !== "x" && i !== "y" && i !== "name") me[i] = _list[0][i];
        }
        me.show_hp = me.max_hpCount;
        fightScene.mapList = {};
        fightScene.fighters = [];
        fightScene.mapCount = 1;
        delete me._show;
        fightScene.insert(me);
        //第一次挑战
    } else {
        for (let i in _list) {
            let f = _list[i];
            f.name = Common.fromCharCode(f.name);
            f.x = pos[0];
            f.y = pos[1];
            //设置为被动
            //f.passive = true;   
            //人物跑到怪面前
            //let p = msg.cfg.enemy_pos[0][0];
            //f.handMove = { "x": p[0], "y": p[1] };
            if (f.sid === db.player.role_id)
                updateSelfModule(f);
            fightScene.insert(_list[i]);
        }
    }
}

/** 战斗结算 **/
const changNewRes = (w) => {
    let _w: any = forelet.getWidget(w);
    let node: any = getRealNode(findNodeByAttr(_w.tree, "move"));
    let count = node.length;
    let fun = (msg) => {
        let s = node[msg].getAttribute("style");
        s += "opacity: 1;-webkit-backface-visibility: hidden;-moz-backface-visibility: hidden;-ms-backface-visibility: hidden;backface-visibility: hidden;-webkit-transition: all 0.2s linear;-moz-transition: all 0.2s linear;-o-transition: all 0.2s linear;-ms-transition: all 0.2s linear;"
        node[msg].setAttribute("style", s);
        msg++;
        if (msg < count) {
            setTimeout(() => {
                fun(msg);
            }, 200)
        }
    };
    fun(0);
}
//计算本次副本时间
const timeStr = (second) =>{
    let s:any = second%60;
    s<10 && (s = "0" + s);

    let m:any = Math.floor(second/60);
    m<10 && (m = "0" + m);
    m += ":";

    let h:any = Math.floor(second/3600);
    h = (h?( h<10 && (h = "0" + h) ) :"");
    h && (h+=":");
    return h+m+s;
}

listen("chat.show",()=>{
    forelet.paint(getData);
});

/**
 * 关闭界面
 */
const close_w = (name, widget) => {
    if (name == "app_b-fight-fight")
        destory(widget)
    else close(widget);
    globalSend("initChat");
};

/**
 * @description 获取当前所在功能界面
 */
const getPage = () => {
	if(widgetsMap.length == 0){
		return false;
	}else{
		return widgetsMap[widgetsMap.length-1];
	}
};
