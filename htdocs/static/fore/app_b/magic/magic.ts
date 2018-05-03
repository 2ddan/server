import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { listenBack } from "app/mod/db_back";
import { globalSend, Pi, cfg } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { destory } from "pi/ui/root"
import { Common_m } from "app_b/mod/common";
import { Common } from "app/mod/common";
import { data as localDB, updata, get as getDB, listen, insert, checkTypeof } from "app/mod/db";
import { getRealNode } from "pi/widget/painter";
import { findNodeByAttr } from "pi/widget/virtual_node";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { getAttrData } from "app_b/see_attr/attr";
import { mapList, initMapList, handScene, updateSelfModule, change_status, setChangeData, olFightOrder } from "app_b/fight_ol/handscene";
import { TaskProgress } from "app_b/mod/task_progress";
import { openUiEffect, destoryUiEffect } from "app/scene/anim/scene"
import { Util } from "app/mod/util";

import { TreasureRequirement } from "cfg/b/TreasureRequirement";//神兵条件类型
import { treasure_up } from "cfg/b/treasure_up";
import { treasure_break } from "cfg/b/treasure_break";
import { TreasurePhase } from "cfg/b/TreasurePhase";
import { TreasureBase } from "cfg/b/TreasureBase";
import { attribute_config } from "cfg/c/attribute_config";
import { function_open } from "cfg/b/function_open";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { skill } from "fight/b/common/skill";// 技能描述表
import { exp_fb_base } from "cfg/c/exp_fb_base";//试炼副本神兵cd

import { resetcanvas } from "app/scene/base/scene";
import { role_base } from "fight/b/common/role_base";
//scene
import { mgr_data, mgr } from "app/scene/scene";
import { Music } from "app/mod/music";
import { config_shortcut } from "cfg/c/config_shortcut";

// ======================================== 导出
/**
 * @description  导出forelet
 */
export const forelet = new Forelet();

// ======================================== 本地
let energy = 0,//能量
    exp_fb_open = false,//试炼副本进入状态
    index = 0,//页卡
    selected = 0,//神兵阶级
    career_id = 0,//装备角色id
    magic_atrr: any = {},//神兵战斗属性
    break_info = [], //八卦升级信息
    levelSite, //当前八卦预升孔位
    magicFlog = true,//限制连续点击共鸣
    isAutoRelease = 0,//自动释放标识位
    autoTimer, //自动释放不成功，重新调用定时器
    reAutoTime = 5, //自动释放不成功，重新调用时间间隔(s)
    // break_flag, //防止八卦在突破时，用户连续点击
    // treasure_flag = 0,//铸魂进度条状态-1铸魂中，0铸魂结束
    treasure_ok = true,//铸魂成功标识
    img_length = 0,//神兵技能释放时的提示
    //img_width = 0,//神兵技能释放时的图片的大小
    release_signal = false, //神兵释放的标志
    eff_id = 0, //神兵能量满的时候的特效ID
    tabswitch = "magic",//tab切换
    treasure_bar_anima = 0, //铸魂进度条动画播放状态
    treasure_bar_timer = 0, //铸魂进度条动画定时器
    level_timer , //神兵铸魂的定时器
    treasure_timer, //神兵淬炼的定时器
    // level_eff_timer , //神兵铸魂的特效定时器
    treasure_eff_timer, //神兵淬炼的特效定时器
    level_type = false,//神兵淬炼暂停标识
    treasure_type = false;//神兵淬炼暂停标识

//淬炼场景石头位置
let position = [//0位置，1 scale
    [[-0.0520000010728836,1.47000002861023,1.60000002384186],0.849999964237213],
    [[ 0.685000002384186,1.5349999666214,1.60000002384186],0.799999952316284],
    [[ 1.23199999332428,1.64199995994568,1.60000002384186], 0.75],
    [[ 0.910000026226044,1.12999999523163,-1.5],0.75],
    [[ 0.140000000596046,1.16999995708466,-1.5],0.75],
    [[ -0.800000011920929,1.16999995708466, -1.5],0.75],
    [[ -1.21700000762939,1.73800003528595,1.60000002384186],0.649999976158142],
    [[ -0.806999981403351,1.54999995231628,1.60000002384186], 0.799999952316284]
    
],
move_position = [];//移動中的石头位置
/**
 * @description  设置广播消息接收接口
 */
export const globalReceive: any = {
    gotoMagic: (arg?) => {
        if (funIsOpen("magic_activate")) {
            index = arg ?  0 : arg - 0;
            tabswitch = "treasure";
            move_position = [];
            forelet.paint(getMagicHtmlData());
            open("app_b-magic-main");
            let timer = setTimeout(()=>{
                let data = setResetCanvas("app_b-magic-treasure-treasure");
                let hexagram_level = getDB("magic.hexagram_level");
                for(let i=0;i<8;i++){
                    let modu= (hexagram_level[i] == break_info[0]) ? "model_ui_stan" : "model_ui_stanaa";
                    createStone("node_",modu,i);
                }
                //上下浮动
                magicFl(data);
                clearTimeout(timer);
                timer = null;
            },300)
            
            globalSend("openNewFun", "magic_activate");
        }
        // let hexagram_level = getDB("magic.hexagram_level");
        // if(localDB.magic.treasure[0]){
        //     open("app_b-magic-main");
        //     globalSend("openNewFun","magic_activate");
        //     // let _node: any = forelet.getWidget("app_b-magic-main");
        //     // let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
        //     // list.scrollLeft = localDB.magic.treasure[1] * 65;
        // }else if(localDB.player.level >= cfg.function_open.function_open.magic_activate.level_limit){
        //     activate(()=>{
        //         open("app_b-magic-main");
        //     });
        // }else {
        //     globalSend("screenTipFun",{words:cfg.function_open.function_open.magic_activate.level_limit+"级开放！"});            
        // }
        // index = arg ? arg-0 : 0;

        // forelet.paint(getMagicHtmlData());
    },
    //新功能激活
    "activateMagic": () => {
        activate()
    },
    "releaseTreasure" : () => {
        release();
    },
    //试炼副本神兵技能cd
    "openExpFb": (bol?)=>{//true进入缩短Cd,false退出cd恢复正常
        if(bol === 3) return;
        if(bol){
            exp_fb_open = true;
        }else{
            exp_fb_open = false;
        }
    }
}

const setResetCanvas = (arg) =>{
    let data : any;
    let w = forelet.getWidget(arg);
    for (let i = 0; i < w.children.length; i++) {
        if (w.children[i].name == "app-scene-base-scene") {
            data = w.children[i];
            break;
        }
    }
    return data;
}
/**
 * @description  创建释放神兵技能时的UI提示节点
 */
const node_fun = () => {
    let _node_list : any = {};

    _node_list["magic_release_bg"] = {};

    _node_list["magic_release_bg"].x = 0;
    _node_list["magic_release_bg"].y = 0;
    _node_list["magic_release_bg"].z = 3;

    _node_list["magic_release_bg"].imgHeight = 374;
    _node_list["magic_release_bg"].scale1 = 0.7;

    //创建
    mgr.create(_node_list["magic_release_bg"],"magic_release");
}
let node_list:any = {};
let magic_p:any;
let float_timer = null;//浮动动画定时器
/**
 * @description  导出组件
 */
export class RoleWidget extends Widget {
    detach(): void {
        removeAllStone();
        //清除浮动动画定时器
        if(float_timer){
            clearInterval(float_timer);
            float_timer = null;
        }
        level_timer  = false, 
        treasure_timer = false, 
        // level_eff_timer = false, 
        treasure_eff_timer = false,
        level_type = false,
        treasure_bar_timer = null,
        treasure_type = false;//神兵淬炼暂停标识
	}
    changeColumns = (msg) => {
        if (tabswitch == msg.type_m)
            return;
        tabswitch = msg.type_m;
        let data: any;
        if (tabswitch == "magic") {
            // removeAllStone();            
            data = setResetCanvas("app_b-magic-magic");
            magicFl(data);

        } else {
            // treasure_flag = 0;
            // break_flag = 0;
            move_position = [];
            data = setResetCanvas("app_b-magic-treasure-treasure");               
            let tim = setTimeout(()=>{
                let hexagram_level = getDB("magic.hexagram_level");
                for(let i=0;i<8;i++){
                    let modu= (hexagram_level[i] == break_info[0]) ? "model_ui_stan" : "model_ui_stanaa";
                    createStone("node_",modu,i);
                }
               //上下浮动
               magicFl(data);
               clearTimeout(tim);
               tim = null;
            },0)
        
        }
        resetcanvas(data);
        forelet.paint(getMagicHtmlData());

    };
    // attach(){
    //     let _node: any = forelet.getWidget("app_b-magic-magic");
    //     if(_node && localDB.magic.treasure[0] >= 6){
    //         let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
    //         list.scrollLeft = (localDB.magic.treasure[1] - 5) * 65;
    //     }
    // }
	/**
	 * @description  返回事件
	 */
    goback() {
        // this.name === arg && ((w)=>{
        // 	//循环外调用
        // 	setTimeout(()=>{close(w)},0);
        // })(this);
        let w = forelet.getWidget("app_b-magic-main");
        close(w);
        w = undefined;
        globalSend("magicClosed");
    }
    select(msg) {
        selected = msg - 0;
        forelet.paint(getMagicHtmlData());
    }
    up(e) {
        if (!e) {
            globalSend("screenTipFun", { words: "升阶条件不足！" });
        } else {
            up();
        }
    }

    //自动释放技能
    autoRelease() {
        isAutoRelease = !isAutoRelease ? 1 : 0;
        forelet.paint(getMagicHtmlData());
        let md = localDB.magic;
        //自动释放不成功，重新调用定时器
        if (autoTimer) {
            clearTimeout(autoTimer);
        }
        if (isAutoRelease && md.skill_energy >= getCfg("TreasureBase")[md.treasure[0]].max_energy) {
            rskill(md);
        }
    }
    /**
	 * @description  释放技能
	 */
    release(cmd) {
        release();
    }
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props, oldProps?): void {
        if (this.name !== "app_b-magic-skill")
            this.props = props;
    }
    /**
     * 神兵八卦升级
     * _index : 0为非月卡或VIP8用户升级 1为月卡或VIP8用户升级
     */
    hexagramLevelUp(_index) {
        if(!_index && !level_type){//单次铸魂
            // if(!treasure_flag){
                canLevelUp(levelSite, break_info[0] - 1,_index);
            // }else{
            //     globalSend("screenTipFun", {
            //         words: "正在铸魂，请稍后！"
            //     }); 
            // }
            return;
        }
        level_type = !level_type;  
        if(level_type){
            // if(treasure_flag ){
            //     globalSend("screenTipFun", {
            //         words: "正在铸魂，请稍后！"
            //     });
                // level_type = !level_type;  
                // return;
            // };//进度条中按钮禁用
            canLevelUp(levelSite, break_info[0] - 1,_index);
        }else{
            // clearTimeout(level_eff_timer);
            clearTimeout(level_timer);
            // level_eff_timer = undefined;
            level_timer = undefined; 
            // treasure_flag = 0;
            eff_loop(0);            
            forelet.paint(getMagicHtmlData());
        }
    }

    //
    // arrowChange = (arg) => {
    //     let _node: any = forelet.getWidget("app_b-magic-magic");
    //     let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
    //     let curr_act = getRealNode(findNodeByAttr(_node.tree,"data-desc", "node_path_" + arg));
    //     if (arg == "1") {
    //         if(list.scrollLeft==3){
    //             return;
    //         }else list.scrollLeft = list.scrollLeft-65;
    //     } 
    //     if (arg == "2") {
    //         if(list.scrollLeft >= 975){ return}
    //         else list.scrollLeft = list.scrollLeft + 65;
    //     }
    // }

    gotoFunc = function (arg) {
        if (arg) {
            arg = arg.split(",");
            globalSend(arg[0], arg[1]);
        }
    };

    //八卦突破
    canBreak = (_type) => {
        // if(!_type && !treasure_type){//单次淬炼
        //     // if(!break_flag){
        //         canBreak(_type);
        //     // }else{
        //     //     globalSend("screenTipFun", {
        //     //         words: "正在淬炼，请稍后！"
        //     //     }); 
        //     // }
        //     return;
        // }
        
        treasure_type = !treasure_type;
        if(treasure_type){
            // if (break_flag) {
                // treasure_type = !treasure_type;
                // globalSend("screenTipFun", {
                //     words: "正在淬炼，请稍后！"
                // });
            //     return;
            // }
            canBreak(_type);
        }else{
            clearTimeout(treasure_eff_timer);
            clearTimeout(treasure_timer);
            treasure_eff_timer = undefined;
            treasure_timer = undefined;
            eff_absorb(0);         
            // break_flag = 0;
            forelet.paint(getMagicHtmlData());
        }
    }

    //获取途径
    gotoGetWay(id) {
        gotoGetWay(id);
    }

    //下级属性
    nextAttr() {
        let data = TreasurePhase[localDB.magic.treasure[0]];
        let attr:any = {
            "attr":data[selected-0+1].attr_add,
            "describe":data[selected].describe
        };
        open("app_b-magic-attr-attr",attr);   
    }
    //查看属性
    seeAttr() {
        globalSend("gotoSeeAttr",{
            "title":"属性详情",
            "attr":treasureAttr()
        });//attr必须是Obj {"max_hp":1000,"max_hp":1000}       
    }
};

export const magic: any = {
    get: () => {
        return magic_atrr;
    },
    set: (msg) => {
        magic_atrr = msg;
        forelet.paint(getMagicHtmlData());
    }
}
/*神兵浮动动画*/
const magicFl = (data)=>{
    let a = 1;
    let _p = data.props.module.position;
    !magic_p && (magic_p = _p[1]);
    float_timer = setInterval(()=>{
        if(_p[1]　>= magic_p +　0.15){
            a = -1;
        }else if(_p[1] <= magic_p+0.0001){
           a = 1;
        }
        data.props.module.position = [_p[0],(_p[1]+=0.002*a),_p[2]];
        mgr.modify(data.props.module);

        if(tabswitch != "magic"){//铸魂石头上下移动
            for(let i=0;i<8;i++){
                if(node_list["node_"+i]){
                    let y =　node_list["node_"+i].position[1];
                    y += 0.001*a;
                    let po = [position[i][0][0],y,position[i][0][2]];
                    if(!move_position[i]){
                        move_position.push(po);
                    }else{
                        move_position[i] = po;
                    }
                    
                    node_list["node_"+i].position = move_position[i];
                    mgr.modify(node_list["node_"+i]);
                    if(node_list["eff_loop"+i]){//闪烁
                        node_list["eff_loop"+i].position = move_position[i];
                        mgr.modify(node_list["eff_loop"+i]);
                    }else if(node_list["treasure_dark"+i]){//变暗
                        node_list["treasure_dark"+i].position = move_position[i];
                        mgr.modify(node_list["treasure_dark"+i]);
                    }else if(node_list["treasure_light"+i]){//闪电
                        node_list["treasure_light"+i].position = move_position[i];
                        mgr.modify(node_list["treasure_light"+i]);
                    }
                }
            }
        }
    },35)
}
/*切换页面时移除所有铸魂页面的石头及特效*/
const removeAllStone = ()=>{
    for(let key in node_list){
        removeOneStone(key);
    }
}

/**
 * @description 创建石头及光
 */
const createStone = (type,modu,index?) => {//取名,特效名字,位置
    let w = forelet.getWidget("app_b-magic-treasure-treasure")
    if(!w || w.parentNode.attrs.style.indexOf("hidden") > -1){
        return;
    }
    if(!index && index!== 0){
        if(!node_list[type]){
            node_list[type] = {
                "model_stone": modu
            };
            mgr.create(node_list[type],"magic_stone");   
        }              
        return;
    }
    if(!node_list[type+index]){
        
        node_list[type+index] = {
            "model_stone": modu,
            "position":move_position.length  ? move_position[index] : position[index][0],
            "scale":position[index][1]
        };
        mgr.create(node_list[type+index],"magic_stone");
        if(modu == "model_ui_stan"){
            let curr = position[index][0];
            node_list["node_light"+index] = {
                "model_stone": "model_ui_stangg",
                "position":[curr[0],curr[1],curr[2]-0.001],
                "scale":position[index][1]
            };
            mgr.create(node_list["node_light"+index],"magic_stone");            
        }
    }
};
/**
 * @description 移除一个石头或特效
 */
const removeOneStone = (key) => {
    if(!node_list[key]){
        return;
    }
    mgr.remove(node_list[key]);
    delete node_list[key];
};
/**
 * @description 获取配置表
 */
const getCfg = (name) => {
    return cfg[name][name];
};
/**
 * @description 激活
 */
const activate = (callback?) => {
    net_request({ "param": {}, "type": "app/prop/treasure@activate" }, function (data) {
        if (data.error) {
            //提示
            console.log(data.why);
            return;
        } else if (data.ok) {
            globalSend("ui_anim", { name: "active", time: 1050 });
            let r: any = Common.changeArrToJson(data.ok);
            selected = r.treasure[1];
            updata("magic.skill_energy", r.skill_energy);
            updata("magic.treasure", r.treasure);
            callback && callback();
        }
    });
}
const up = () => {
    if (!magicFlog) return;
    net_request({ "param": {}, "type": "app/prop/treasure@evolution" }, function (data) {
        if (data.error) {
            //提示
            console.log(data.why);
        } else if (data.ok) {
            magicFlog = false;
            Music.skillSound("other_one");
            globalSend("ui_anim", { name: "advance", time: 1050 });
            let result: any = Common.changeArrToJson(data.ok);
            Common_m.deductfrom(result);
            updata("magic.treasure", result.treasure);
            selected = result.treasure[1];
            forelet.paint(getMagicHtmlData());
            //选中当前阶位
            let _node: any = forelet.getWidget("app_b-magic-magic");
            // if (localDB.magic.treasure[0] >= 6) {
                // let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
                // list.scrollLeft = (localDB.magic.treasure[1] - 5) * 65;
            // }
            //属性变化提示
            let preAttr = TreasurePhase[result.treasure[0]][result.treasure[1] - 1].attr_add;
            let nowAttr = TreasurePhase[result.treasure[0]][result.treasure[1]].attr_add;
            for (let i in nowAttr) {
                if (nowAttr.hasOwnProperty(i)) {
                    globalSend("attrTip", {
                        words: `${attribute_config[i]} +${Common_m.decimalToPercent(preAttr[i] ? (nowAttr[i] - preAttr[i]) : nowAttr[i])}`
                    })
                }
            }

            updata("magic.treasure", result.treasure);
            setTimeout(function () {
                magicFlog = true;
                forelet.paint(getMagicHtmlData());
                data = setResetCanvas("app_b-magic-magic");
                resetcanvas(data);
            }, 500);
        }
    });
}
//处理共鸣参数
const setAttr = (msg) => {
    let arr = [];
    for (let v of msg) {
        let task:any = {};
        let key = Object.keys(v)[0];
        let val = v[key];
        //获取当前任务
        let obj = TreasureRequirement[key];
        if(!obj)continue;
        task.text = obj.describe.replace("#", val);
        //前往
        task.fun = obj.go;
        //当前任务进度
        task.progress = TaskProgress[obj.function] && TaskProgress[obj.function](val) && TaskProgress[obj.function](val)[1];
        task.val = val;
        arr.push(task);
    }
    return arr;
}
//初始化数据
const initData = (data) => {
    console.log(data);
    selected = data.treasure[1];
    break_info = data.break_info;

    updata("magic.treasure", data.treasure);
    updata("magic.hexagram_exp", data.hexagram_exp);
    updata("magic.skill_energy", data.skill_energy);
    updata("magic.hexagram_level", data.hexagram_level);
    updata("magic.break_info", data.break_info);
    levelSite = getLevelSite();
    if (data.skill_energy === 0 && data.treasure[0] > 0) {
        updateEnergy();
    }
}
//获取页面数据
const getMagicHtmlData = () => {
    let data: any = {};
    data.function_open = function_open;
    career_id = localDB.magic.treasure[0];
    data.limit = function_open.magic_activate;
    data.player = localDB.player;
    data.index = index;
    data.fun_id = localDB.open_fun.id || 0; //功能开放id
    data.Pi = Pi;
    data.magicFlog = magicFlog;
    data.treasure_bar_anima = treasure_bar_anima;
    data.isAutoRelease = isAutoRelease; //自动释放标识位
    data.attribute_config = getCfg("attribute_config");
    if (!career_id) return data;
    data.magic_id = career_id;//神兵ID
    data.magic_atrr = magic_atrr;//神兵战斗属性
    data.magic_atrr.energy = getCfg("TreasureBase")[career_id].energy;//神兵回复能量值
    data.magic_atrr.max_energy = getCfg("TreasureBase")[career_id].max_energy;//神兵能量最大值
    data.magic_atrr.energySpacing = getCfg("TreasureBase")[career_id].energySpacing;//回复能量间隔
    data.magic_atrr.skill_energy = localDB.magic.skill_energy;//当前能量
    data.treasur = selected;//神兵阶级属性
    data.TreasurePhase = getCfg("TreasurePhase")[localDB.magic.treasure[0]][selected];//神兵阶级属性属性
    data.TreasurePhase.getHave = (a) => (getDB("bag*sid=" + a).pop());
    data.allTreasurePhase = getCfg("TreasurePhase")[localDB.magic.treasure[0]];//神兵阶级属性属性
    data.getAttr = setAttr(getCfg("TreasurePhase")[localDB.magic.treasure[0]][selected].resonance);//神兵进阶条件
    data.skill = skill;//技能
    //data.nextAttr = setAttr(getCfg("TreasurePhase")[localDB.magic.treasure[0]][selected+1 ? selected+1 : selected].resonance)

    //神兵八卦数据
    data.treasure_up = treasure_up;
    data.hexagram_exp = getDB("magic.hexagram_exp");
    data.treasure_break = treasure_break;
    data.break_info = break_info;
    data.levelSite = levelSite;
    data.roleCfg = role_base;
    data.TreasureBase = TreasureBase;
    data.level_type = level_type;//铸魂进度条状态-1铸魂中，0铸魂结束
    // data.treasure_flag = treasure_flag;
    data.treasure_ok = treasure_ok;
    data.treasure_type = treasure_type;
    data.img_length = img_length;
    return data;
}
const rskill = (md) => {
    globalSend("releaseMagic", {
        skill_id: getCfg("TreasurePhase")[md.treasure[0]][md.treasure[1]].skill_id,
        callback: (data) => {
            console.log(data);
            let r: any = Common.changeArrToJson(data.ok);
            // if(eff_id){
            //     destoryUiEffect(eff_id);
            // }
            // eff_id = 0;
            if (r.result == "undefined")
                expendEnergy(0);
            else {
                if (isAutoRelease)
                    autoTimer = setTimeout(() => {
                        rskill(md);
                    }, reAutoTime * 1000);
                globalSend("screenTipFun", {
                    words: r.result
                });
            }
        }
    }
    );
}

/**
 * 获取八卦总属性
 */
const treasureAttr = function () {
    let magic = getDB("magic");
    let obj: any = {},
        breakAttr = treasure_break[magic.break_info[0] - 1] ? treasure_break[magic.break_info[0] - 1].attr : 0;
    let total = (breakAttr && breakAttr.slice(0)) || [];
    for(var j = 0, leng = magic.hexagram_level.length; j < leng; j++ ){
        let prop = treasure_up[j-0+1][magic.hexagram_level[j]];
        prop && prop.attr && total.push(prop.attr);
    }
    if (total.length > 1) {
        for (var i = 0, len = total.length; i < len; i++) {
            obj[total[i][0]] = (obj[total[i][0]] || 0) + total[i][1];
        }
    }
    breakAttr && (obj.attr_rate = treasure_break[magic.break_info[0] - 1].attr_rate)
    return obj;
};
/**
 * 获取八卦升级的孔位
 */
const getLevelSite = function () {
    let arr = getDB("magic.hexagram_level"),
        i = 0,
        len = arr.length;
    if (arr[0] <= 0) return 1;
    for (; i < len; i++) {
        if (arr[i - 1] > arr[i]) return i + 1;
    }
    return 1;
};

/**
 * 
 * @param site 卦象孔位id
 * @param level 预升等级
 */
const canLevelUp = function (site, level,_index) {
    let hex_lv = getDB("magic.hexagram_level");
    if (hex_lv[hex_lv.length - 1] === break_info[0]) {
        globalSend("screenTipFun", { words: `请先突破` });
        return;
    }
    let obj = treasure_up[site][level],
        prop = getDB(`bag*sid=${obj.material_id}`).pop();
    //玩家vip超过一定限制
    let vip = getDB("player.vip");
    let month_card = getDB("player.month_card_due_time");
    let player_level = getDB("player.level");

    if(_index){
        if (vip >= TreasureBase[career_id].one_key_up_vip) {
            if (prop) {
                hexagramLevelUp(site, 1,_index);
            } else {
                // globalSend("screenTipFun", { words: `${prop.name}不足` });
                gotoGetWay(obj.material_id);
            }
            level_type = !level_type;
            return;
        }
        if(month_card || player_level >= config_shortcut["treasure_up"].type[1]){
            if (prop && prop.count >= costCount()) {
                eff_loop(1);                        
                hexagramLevelUp(site, 0, vip,_index);
            } else {
                // globalSend("screenTipFun", { words: `${prop.name}不足` });
                gotoGetWay(obj.material_id);
            }
        }else{
            level_type = !level_type;  
            globalSend("gotoMonthCardWay", "treasure_up");
			return;
        }
    }else{
        if (prop && prop.count >= costCount()) {
            eff_loop(2);                                
            hexagramLevelUp(site, 0, vip,_index);
        } else {
            // globalSend("screenTipFun", { words: `${prop.name}不足` });
            gotoGetWay(obj.material_id);
        }
    }
};

const gotoGetWay = function(id){
    globalSend("gotoGetWay",id);
}
/**
 * 计算此次注魂消耗
 */
const costCount = function () {
    //计算此次消耗多少
    let hexagram = treasure_up[levelSite][break_info[0] - 1];
    let my_exp = getDB("magic.hexagram_exp"),
        need_exp = hexagram.need_exp;
    let need_num = (need_exp - my_exp) / hexagram.per_exp;
    need_num = need_num < hexagram.one_cost_times ? need_num : hexagram.one_cost_times;
    return need_num;
}

/**
 * 神兵卦象升级
 * @param index 卦象孔位
 * @param type {0--普通升级, 1--一键升级}
 */
const hexagramLevelUp = function (site, type, vip?,_index?) {
    // if(!type){//升级进度条时石头动画
    //     treasure_flag = 1;
    //     forelet.paint(getMagicHtmlData());
    // }
    treasure_ok = false;
    forelet.paint(getMagicHtmlData());

    let arg = {
        "param": {
            "index": site,
            "type": type
        },
        "type": "app/prop/treasure@hexagram_level_up"
    };
    net_request(arg, (data) => {
        treasure_ok = true;
        if (data.error) {
            console.log(data);
            // treasure_flag = 0;
            removeOneStone("eff_loop"+(levelSite-2)) ;                       
            return;
        }
        treasure_bar_anima = 1;
        if(treasure_bar_timer){
            clearTimeout(treasure_bar_timer);
            treasure_bar_timer = null;
        }
        treasure_bar_timer = setTimeout(()=>{
            clearTimeout(treasure_bar_timer);
            treasure_bar_timer = null;
            treasure_bar_anima = 0;
            forelet.paint(getMagicHtmlData());
        },800);
        let prop: any = Common.changeArrToJson(data.ok);
        //扣除消耗
        Common_m.deductfrom(prop);
        let s_exp =(prop.hexagram_exp || treasure_up[levelSite][break_info[0]-1].need_exp) - getDB("magic.hexagram_exp");
        if(s_exp){
            globalSend("barTip",{
                "words":`+${s_exp}`,
                "top":700
            }) 
        }
        updata("magic.hexagram_exp", prop.hexagram_exp || treasure_up[levelSite][break_info[0]-1].need_exp);
        Music.skillSound("other_two");
        forelet.paint(getMagicHtmlData());
        //只有升级才更新
        let old_level = getDB("magic.hexagram_level");
        if (prop.hexagram_level[site - 1] > old_level[site - 1]) {
            treasure_light();            
            eff_loop(0);
            let tim = setTimeout(function(){
                //更新孔位
                updata("magic.hexagram_exp", prop.hexagram_exp);
                updata("magic.hexagram_level", prop.hexagram_level);
                //前一级属性
                let preAttr = treasure_up[site][break_info[0] - 1].attr;
                //升级后属性
                let nowAttr = treasure_up[site][break_info[0]].attr;
                globalSend("attrTip", {
                    words: `${attribute_config[nowAttr[0]]} +${Common_m.decimalToPercent(preAttr ? nowAttr[1] - preAttr[1] : nowAttr[1])}`
                });
                if (treasure_up[levelSite + 1]) {
                    levelSite++;
                }
                // treasure_flag = 0;
                level_type = false;
                forelet.paint(getMagicHtmlData());
                clearTimeout(tim);
                tim = null;
            },1050);
        } else {
            let obj = treasure_up[site][break_info[0] - 1],
            prop = getDB(`bag*sid=${obj.material_id}`).pop();
            if ((vip < TreasureBase[career_id].one_key_up_vip) && prop && prop.count >= costCount()) {
                let w = forelet.getWidget("app_b-magic-treasure-treasure")
                if(!w || w.parentNode.attrs.style.indexOf("hidden") > -1){
                    eff_loop(0);
                    // treasure_flag = 0;
                    return;
                }
                if(_index == 1){
                    level_timer = setTimeout(() => {
                        // treasure_flag = 0;
                        hexagramLevelUp(site, 0, vip,1);
                        clearTimeout(level_timer);
                        level_timer = null;
                    }, 500);
                }else{
                    // let timer = setTimeout(()=>{
                    //     clearTimeout(timer);
                    //     timer = null;
                    //     treasure_flag = 0;
                    //     forelet.paint(getMagicHtmlData());
                    // },600);
                }
            } else {
                eff_loop(0);
                // treasure_flag = 0;
            }
            
        }
        
    })
};

/**
 * 查看是否有突破材料
 * @param level 突破后的等级
 */
const canBreak = function (_type) {
    let sid = treasure_break[break_info[0]].prop;
    let arr = getDB(`bag*sid=${sid}`),
        // month_card = getDB("player.month_card_due_time"),
        prop = arr[arr.length - 1],
        num = getDB("magic.break_info");
    
              
    if (num[1] >= treasure_break[num[0]].need_exp) {
        hexagramBreak(0,_type);
        return;
    }
    
    if (prop && prop.count > 0) {
                 
         //玩家vip超过一定限制
        let vip = getDB("player.vip");
        // if(_type != 0){
            if (vip >= TreasureBase[career_id].one_key_break_vip) {
                eff_absorb(1);
                hexagramBreak(1,_type);
                treasure_type = !treasure_type;
                return;
            }
        
            // if(month_card){
                eff_absorb(1);
                hexagramBreak(2,_type);
            // }else{
            //     treasure_type = !treasure_type;
            //     globalSend("gotoMonthCardWay", "treasure_up");
            //     return;
            // }
        // }else{
        //     eff_absorb(2);
        //     hexagramBreak(2,_type);
        // }
    } else {
        // globalSend("screenTipFun", { words: `没有突破材料` });
        gotoGetWay(sid);

    }
}

/**
 * 八卦升阶
 * @param type: "type": 0 :表示突破 1:表示一键吃经验,2表示单次吃经验
 * @param index: 当type为2时此项有意义，表示type为1时返回的经验列表中已经演播到的位置                 
 */
const hexagramBreak = function (type,_type) {
    // break_flag = true;
    let arg = {
        "param": {
            "type": type
        },
        "type": "app/prop/treasure@break"
    };
    net_request(arg, (data) => {
        if (data.error) {
            // break_flag = false;
            eff_absorb(0); 
            console.log(data);
            return;
        }
        treasure_bar_anima = 1;
        if(treasure_bar_timer){
            clearTimeout(treasure_bar_timer);
            treasure_bar_timer = null;
        }
        treasure_bar_timer = setTimeout(()=>{
            clearTimeout(treasure_bar_timer);
            treasure_bar_timer = null;
            treasure_bar_anima = 0;
            forelet.paint(getMagicHtmlData());
        },800);
        
        let prop: any = Common.changeArrToJson(data.ok);
        if (type === 2) {
            break_info = prop.break_info;  
            let s_exp = break_info[1] - getDB("magic.break_info")[1];
            if(s_exp){
                globalSend("barTip",{
                    "words":`+${s_exp}`,
                    "crt":prop.crt_count,
                    "top":680
                }) 
            }       
            updata("magic.break_info",prop.break_info);   
            Common_m.deductfrom(prop);   
            Music.skillSound("other_two");         
            let w = forelet.getWidget("app_b-magic-treasure-treasure")
            if(!w || w.parentNode.attrs.style.indexOf("hidden") > -1){
                // break_flag = 0;
                eff_absorb(0);
                return;
            }
            if(prop.break_info[1] >= treasure_break[prop.break_info[0]].need_exp){
                // break_flag = false;     
                treasure_type = false;           
                treasure_timer = setTimeout(function(){
                    eff_absorb(0); 
                    clearTimeout(treasure_eff_timer);
                    treasure_eff_timer = null;
                },500);
            }else{
                let arr = getDB(`bag*sid=${treasure_break[break_info[0]].prop}`),
                _prop = arr[arr.length - 1];
                if(_prop && _prop.count && _type == 1){
                    treasure_timer =setTimeout(()=>{
                        hexagramBreak(2,1);
                        clearTimeout(treasure_timer);
                        treasure_timer = null;
                    },500);
                }else{
                    // let timer = setTimeout(()=>{
                    //     clearTimeout(timer);
                    //     timer = null;
                    //     break_flag = 0;
                    // },600);
                }
                
            }
            
            forelet.paint(getMagicHtmlData());                        
            // return progress(prop);
        } else if (type === 1) {
            Common_m.deductfrom(prop);
            break_info = prop.break_info;
            let s_exp = break_info[1] - getDB("magic.break_info")[1];
            if(s_exp){
                globalSend("barTip",{
                    "words":`+${s_exp}`,
                    "crt":prop.crt_count,
                    "top":680
                }) 
            }     
            updata("magic.break_info", prop.break_info);
            Music.skillSound("other_two");
            // break_flag = false;
            forelet.paint(getMagicHtmlData());            
            let timer = setTimeout(function(){
                eff_absorb(0); 
                clearTimeout(timer);
                timer = null;
            },500);
        } else if (type === 0) {
            eff_light();
            //升阶 更新数据
            let timer = setTimeout(function(){
                break_info = prop.break_info;
                let s_exp = break_info[1] - getDB("magic.break_info")[1];
                if(s_exp){
                    globalSend("barTip",{
                        "words":`+${s_exp}`,
                        "crt":prop.crt_count,
                        "top":680
                    }) 
                }    
                updata("magic.break_info", prop.break_info);
                 
                let preAttr = treasure_break[prop.break_info[0] - 1].attr;
                let nowAttr = treasure_break[prop.break_info[0]].attr;
                for (let i = 0, len = nowAttr.length; i < len; i++) {
                    let str = `${attribute_config[nowAttr[i][0]]} +${Common_m.decimalToPercent(nowAttr[i][1] - preAttr[i][1])}`;
                    globalSend("attrTip", {
                        words: str
                    })
                }
                // break_flag = false;
                levelSite = 1;
                forelet.paint(getMagicHtmlData());
                
                clearTimeout(timer);
                timer = null;
            },4100)
           
            
        }
    })
}


const eff_absorb = function(bol){//吸收特效
    if(!bol){
        removeOneStone("eff_absorb");    
        return;
    }
    if(bol == 2){//单次淬炼
        let index = "eff_absorb_once"+Util.serverTime();
        createStone(index,"eff_ui_cuilian_xishouyici");
        let timer = setTimeout(()=>{
            removeOneStone(index) ; 
            clearTimeout(timer);
            timer = null;
        },1000)
        return;
    }
    createStone("eff_absorb","eff_ui_cuilian_xishou");       
}
const eff_light = function(){//切换神兵特效
    createStone("eff_light","eff_ui_cuilian_dianliang");
    Music.skillSound("treasure_break"); 
    let timer = setTimeout(()=>{
        // mgr.remove(node_list["eff_light"]);
        treasure_dark();     
        let time = setTimeout(()=>{
            removeOneStone("eff_light");                    
            clearTimeout(time);
            time = null;
        },1500)   
        clearTimeout(timer);
        timer = null;
    },3500)
}
const treasure_light = function(){//闪电
    
   //移除循环
    // removeOneStone("eff_loop"+(levelSite-1));

    createStone("treasure_light","eff_ui_zhuhun_dianliang",levelSite-1) ;   

    let timer1 = setTimeout(()=>{
        removeOneStone("node_"+(levelSite-1));//移除暗石头
        createStone("node_","model_ui_stan",levelSite-1) ;
        clearTimeout(timer1);   
        timer1 = null;
    },800)
    let timer = setTimeout(()=>{
        removeOneStone("treasure_light"+(levelSite-1));//移除闪电
        clearTimeout(timer);  
        timer = null;
    },1000)
        
}
const treasure_dark = function(){//铸魂变暗
  
    let hexagram_level = getDB("magic.hexagram_level");
    for(let i=0;i<8;i++){
        removeOneStone("node_"+i) ;     //移除亮石头            
        createStone("treasure_dark","eff_ui_zhuhun_bianan",i) ;           
    }
    let timer = setTimeout(()=>{
        for(let i=0;i<8;i++){
            if(node_list["treasure_dark"+i]){                    
                removeOneStone("treasure_dark"+i) ;     //移除变暗           
                removeOneStone("node_light"+i) ;     //移除底座光            
                
            }
            createStone("node_","model_ui_stanaa",i) ;           
        }
       
        clearTimeout(timer);
        timer = null;
    },1100)
}
const eff_loop = function(arg?){//铸魂循环0,1,2
    if(!arg){
        removeOneStone("eff_loop"+(levelSite-1)) ;                       
        return;
    }
    if(arg == 2){//单次铸魂
        let index = "eff_loop_once"+Math.ceil(Util.serverTime());
        createStone(index,"eff_ui_zhuhun_yici",levelSite-1);
        let id = index+(levelSite-1);
        let timer = setTimeout(()=>{
            removeOneStone(id) ; 
            clearTimeout(timer);
            timer = null;
        },1000)
        return;
    }
    createStone("eff_loop","eff_ui_zhuhun_xunhuan",levelSite-1);
}


/**
 * @description 消耗能量,跟后台通讯
 */
const expendEnergy = (_energy) => {
    //TODO..
    net_request({ "param": { skill_power: _energy }, "type": "app/prop/treasure@refresh_energy" }, function (data) {
        if (data.error) {
            console.log(data.why);
        } else if (data.ok) {
            updata("magic.skill_energy", _energy);
            if (_energy === 0)
                updateEnergy();
        }
    });
}
/**
 * @description 更新能量
 */
const updateEnergy = (() => {
    let timer = null,
        career_id,
        _cfg,
        _max,
        _dur,
        _ite,
        func = () => {
            if (localDB.magic.skill_energy < _max) {
                let _speed = exp_fb_open ? _max/exp_fb_base["treasure_power"] : 1;   //恢复速度为基础的几倍             
                let e = localDB.magic.skill_energy + _ite * _speed;
                // console.log("magic.ts能量更新++++",e)
                e = e >= _max ? _max : e;
                updata("magic.skill_energy", e);
                setTimeout(func, _dur);
                forelet.paint(getMagicHtmlData());
            } else if (isAutoRelease && localDB.magic.skill_energy >= _max) {
                expendEnergy(_max);
                let md = localDB.magic;
                //showSkillName();
                rskill(md);

                open("app_b-magic-magic_release_tips");
                let set = setInterval(()=>{
                    img_length += 0.1;
                    
                    forelet.paint(getMagicHtmlData());
        
                    if(img_length >= 3.5){
                        clearInterval(set);
                        img_length = 0;
                        release_signal = false;
                        forelet.paint(getMagicHtmlData());
                        set = undefined;
                        let w = forelet.getWidget("app_b-magic-magic_release_tips");
                        if (w) {
                            close(w);
                        }
                    } 
                    
                },100);
            }
            if(localDB.magic.skill_energy >= _max){
                expendEnergy(_max);
                // let w = handScene.getSelf();
                // let data = {
                //     "effect":"eff_ui_shenbingnengliang",
                //     "isOnce": false,
                //     "index": 0,
                //     "name" : "effect123",
                //     "z": -105,
                //     "x": -395,
                //     "y": 15,
                //     "scale": 100
                // }
                // if(!eff_id){
                //     eff_id = openUiEffect(data,null,"effect_2d");
                // }
            }
        };
    return () => {
        career_id = localDB.magic.treasure[0];
        _cfg = getCfg("TreasureBase")[career_id];
        _max = _cfg.max_energy;
        _dur = _cfg.energySpacing;
        _ite = _cfg.energy;
        setTimeout(func, _dur);
        forelet.paint(getMagicHtmlData());
    }
})();


const release = () => {
    let md = localDB.magic;
    //自动释放不成功，重新调用定时器
    if (autoTimer) {
        clearTimeout(autoTimer);
    }
    // if (localDB.player.level < cfg.function_open.function_open.magic_activate.level_limit)
    //     globalSend("screenTipFun", { words: cfg.function_open.function_open.magic_activate + "级开放！" });
    // else if (!md.treasure[0])
    //     activate();
    // else if (md.skill_energy >= getCfg("TreasureBase")[md.treasure[0]].max_energy) {
    //     rskill(md);
    //     // node_fun();
    // } else
    //     globalSend("screenTipFun", { words: "能量不足" });
    if (md.skill_energy >= TreasureBase[md.treasure[0]].max_energy) {
        showSkillName();
        rskill(md);
    } else {
        globalSend("screenTipFun", { words: "能量不足" });
    }
};

//展示神兵技能名字
const showSkillName = function () {
    updata("magic.img_length", img_length);
    open("app_b-magic-magic_release_tips");
    let set = setInterval(()=>{
        img_length += 0.1;
        updata("magic.img_length",img_length);
        if(img_length >= 3.5){
            clearInterval(set);
            img_length = 0
            updata("magic.img_length", 0);
            set = undefined;
            let w = forelet.getWidget("app_b-magic-magic_release_tips");
            if(w){
                destory(w);
                w = null;
            }
        }
    }, 100);
}

// ============================================ 立即执行

/**
 * @description 初始化神兵字段
 */
insert("magic", {
    treasure: [0, 0],
    skill_energy: 0
});
//数据
listenBack("app/prop/treasure@read", initData);
// 监听人物数据变化
listen("player.level", () => {
    forelet.paint(getMagicHtmlData());
});
// 监听背包数据变化
listen("bag", () => {
    // forelet.paint(getMagicHtmlData());
});

// 监听神兵数据变化
listen("magic", () => {
    // forelet.paint(getMagicHtmlData());
});
listen("open_fun.id", () => {
    forelet.paint(getMagicHtmlData());
})
/**
 * @description 设置首次打开监听，并设置it1
 */
forelet.listener = (cmd, w) => {
    if (cmd == "firstPaint" || cmd == "add") {
        forelet.paint(getMagicHtmlData());
    }
};

