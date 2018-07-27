/**
 * 战斗
 */

//==========================================导入
//pi
import { Widget, factory } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { getRealNode } from "pi/widget/painter";
import { open as pi_open, destory,closeBack } from "pi/ui/root";
import { findNodeByAttr } from "pi/widget/virtual_node";

//mod
import { Common } from "app/mod/common";
import { Music } from "app/mod/music";
import { data as db,listen} from "app/mod/db";
import { open, close } from "app/mod/root";
import { Pi, globalSend, cfg } from "app/mod/pi";

//scene
import { mgr, mgr_data } from "app/scene/scene";
import { setClickCallback, initAnimFinishCB } from "app/scene/base/scene";
import { UiFunTable, initValue } from "app/scene/ui_fun";
//fight
import { Scene as FightScene, FMgr } from "fight/a/fight";
import { Request } from "fight/a/request";
import { blend } from "fight/a/analyze";
import { buff } from "fight/b/common/buff";
//app
import { Fight_common } from "fight/a/fore/fight_common";
import { Init_Fighter } from "fight/a/common/init_fighter";
import { handScene, updateSelfModule } from "app_b/fight_ol/handscene";
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
        // initFightScene(fightData);
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
        wildLoss();
    }
    changeFight() {
        if (fightScene.level >=2) {
            fightScene.level = 1;
        } else {
            fightScene.level = 2;
        }
        getData.scene = { "autoFight": fightScene.level, "fightData": fightData }
        forelet.paint(getData);
    }
    //野外战斗失败，前往
    wildMenu(fun){
        wildLoss();
        let arr = fun.split(",");
        globalSend(arr[0],arr[1] || null);
    }
    //副本战斗失败，前往
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

//野外战斗失败弹窗点击
let wildLoss = ()=>{
    let w:any = forelet.getWidget("app_b-fight-wild_lose_account");
    w && w.cancel && w.cancel();
    if (accountBack) accountBack();
}
//========================================导出
//接收战斗资源管理界面关闭消息
//这才是真正的战斗开始
export const loadSceneOk = (fightData) => {
    if (!fightData) return
    let time = 0,
        // fightMove = 0, // move_fun[fightData.type] ? 1 : 0,
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
        getData.exitStartTime = Date.now();
        forelet.paint(getData);
        globalSend("popBack");
        if(msg.extra.source === "wild_boss_lose"){
            open("app_b-fight-wild_lose_account");
        }else{
            open("app_b-fight-account");
        }
        let data: any = { "star": msg.extra.star, "r": msg.result.r, "source": msg.extra.source }
        if (msg.extra.flag) {
            data.flag = msg.extra.flag;
        }
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
    if(!w){
        return;
    }
    if (!fightScene && w) {
        close_w(arg, w);
        if (accountBack) accountBack();
        accountBack = null;
        return;
    }
    globalSend("exitFb");

    //Music.startBgSound("normal_only");//播放场景音乐

    //暫停渲染
    mgr.pause(true);
    FMgr.destroy(fightScene);
    clear();
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
 * @param callback 战斗正常结束回调
 * @param escapeback 战斗中途退出回调
 * @param loclistener 每个功能需要对战斗事件进行的监听函数
 * @example
 */
export const fight = (msg: any, callback?: Function , escapeback?: Function,loclistener?: Function) => {
    fightCount += 1;
    if(!fightScene){
        escapeBack = escapeback;
        locListener = loclistener;
    }
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


//========================================本地
let getData: any = {};
let countHp = 0,
    fightScene: FightScene,
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
    //功能战斗事件监听
    locListener,
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
            // fightScene.fightMove = true;
            fighting = true;
            //Fight_common.initFighterImage(fightSkills, fightScene);
        }, time);
    } else {
        //放入敌方战斗人员,开始战斗
        fightStart(fightData);
        // fightScene.fightMove = true;
        fighting = true;
        //Fight_common.initFighterImage(fightSkills, fightScene);
    }
}
/**
 * @description 清理事件
 */
const clear = () => {
    handScene.clear();
    UiFunTable.clearTO();
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

const _fight = (msg, callback?) => {
    // overBack = overBack || over;
    //closeAccount(0);
    mgr_data.name = "fight";
    msg.nowTime = (new Date()).getTime();
    //设置怪物波数
    _enemy(msg);
    if (!fightScene) {
        initFightScene(msg);
    } else {
        // fightScene.destroyScene();
        // UiFunTable.clearTO();
        // initValue();
        // fightScene.now = 0;
        // fightScene.campTarget = undefined;
        // fightScene.limitTime = msg.limitTime * 1000;
        if (msg.own_fight) {
            // //表示新的一场战斗开始
            fightScene.fightTime = 0;
            fightScene.limitTime = msg.limitTime * 1000;
            //重新设置战斗结束回调
            fightScene.overCallback = overBack;
            overCallback = (r, scene) => {
                // fightScene.initmove();
                fighting = false;
                return callback(r, scene);
            };
            getData.scene = { "autoFight": fightScene.level, "fightData": msg };
            forelet.paint(getData);
            initOwn(msg);
        }
        //怪物数量
        if(msg.count){
            getData.scene.fightData.count = msg.count;
            forelet.paint(getData);
        }
        fighting = true;
        fightStart(msg);
        return;
    }
    fightData = msg;
    getData.scene = { "autoFight": fightScene.level, "fightData": fightData };
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
        return callback(r, scene);
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
    let __self = fightScene.fighters.get(1), isSkill = null;
    if (result.type === "terrain") {
        __self.handMove = { x: result.data[0], y: result.data[2]};
    } else {
    }
}
//战斗事件监听
const fightListener = (r) => {
    if (mgr_data.name != "fight") return;
    r.events = blend(r.events);
    //return;
    if (r.events.length > 0) {
        for (let i = 0, leng = r.events.length; i < leng; i++) {
            let e = r.events[i];
            let target = typeof(e.target) == "number" ? FMgr.scenes.fighters.get(e.target) : e.target;
            try {
                if(e.type == "damage" && target.hp <= 0){
                    let _target = typeof(e.target) == "number" ? FMgr.scenes.fighters.get(e.target) : e.target,
                        fighter = typeof(e.fighter) == "number" ? FMgr.scenes.fighters.get(e.fighter) : e.fighter,
                        award = e.target.award ? e.target.award : _target.show_award,
                        award_list = [];


                    let fighter_pos = [fighter.x ,fighter.y ,fighter.z];
                    let target_pos = [_target.x ,_target.y ,_target.z];
                    if(getData.scene && getData.scene.fightData.type == "exp_mission"){
                        globalSend("expFBI",{fp:fighter_pos,tp:fighter_pos});                        
                    }
                    if(award){
                        for(let i = 0;i < award.length;i++){
                            if(award[i][0] != "money" && award[i][0] != "exp"){
                                award_list.push(award[i]);
                            }
                        }
                        if(award_list.length != 0){
                            let timer = setTimeout(()=>{
                                UiFunTable.drop_outFun(award_list,target_pos,fighter_pos);
                                clearTimeout(timer);                                    
                            },1500)
                        }
                    }
                }
                locListener && locListener(e);
                //战斗事件处理
                handScene[e.type] && handScene[e.type](e, r.now);
            } catch (ex) {
                if (console) {
                    console.log(e, ex);
                }
            }
        }
    }
    //if(ft>10)app.mod.scene.log("事件处理时间："+ft);
    //return;
    //执行特效
    // setTimeout(()=>{
    //     if(fightScene)UiFunTable.runCuurUi(r,fightScene.now);
    // },0)
    //if(ft>5)app.mod.scene.log("特效计算时间："+ft);
    return true;
};
//战斗结束
const overBack = (r, scene) => {
    return fighting && overCallback && overCallback({
        r: r,
        time: fightScene.fightTime,
        fighters: Fight_common.getLeftHp(fightScene)
    }, scene);
};
//战斗每波结束时附加判断，没到最后一波怪，不会真正结束
const over = (r): boolean => {
    return true;
};

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
    
    fightScene = FMgr.create("fight",buff);
    fightScene.setNavMesh(FMgr.createNavMesh(mgr.getSceneBuffer(msg.cfg.scene, ".nav")));
    mgr_data.sceneTab["fight"] = fightScene;
    //战斗事件监听
    fightScene.listener = fightListener;

    fightScene.setPause(true);

    //战斗结束回调
    fightScene.overCallback = overBack;
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
        Request.insert(f,fightScene)
    }
}
/**
 * @description 插入己方人员
 * @param msg 
 */
const initOwn = (msg) => {
    if (!msg) return;
    //插入己方战斗人员
    //Fight_common.initOwn(fightScene, msg.own_fight);
    let _list = Init_Fighter.initFighter(msg.own_fight),
        pos = msg.cfg.role_pos;
    //连续多次挑战，加血特效
    if (fightCount > 1) {
        let me = fightScene.fighters.get(1);
        // initMapList();
        for (let i in _list[0]) {
            if (i !== "x" && i !== "y" && i !== "name" && i != "skill") me[i] = _list[0][i];
        }
        me.show_hp = me.hp;
        // delete me._show;
        // fightScene.insert(me);
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
            Request.insert(_list[i],fightScene);
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

// ============================== 立即执行
