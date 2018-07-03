//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB, insert, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { Util } from "app/mod/util";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { allTabProp } from "app_b/bag/bag"

//配置表
import { player_exp } from "cfg/b/player_exp";
import { rune } from "cfg/c/rune";
import { vipcard } from "cfg/c/recharge_buy_robolet";
import { vip_advantage } from "cfg/c/vip_advantage";
//经验宝库配置表
import { treasury_base } from "cfg/c/treasury_base";
import { treasury_act } from "cfg/c/treasury_act";
import { treasury_level } from "cfg/c/treasury_level";

export const forelet = new Forelet();

insert("off_line", {});

listenBack("app/role/leave_exp@read", (data) => {
    updata("off_line", data);
    forelet.paint(getData());
    let arr = countTime();
    if (arr[1] == 0) {
        updata("off_line.tip", 1);
    } else {
        updata("off_line.tip", 0);
        tipTimerFun();
    }
})

/**
 * 入口
 */
export const globalReceive = {
    "gotoLeaveExp": () => {
        let player = getDB("player");
        showExp = [player.level,Math.floor(player.exp/player_exp[player.level].exp*100)];
        forelet.paint(getData());
        open("app_c-off_line-off_line");
    },
    "refreshLeaveExp": () => {
        awardList();
        gainBonus();
        allBonus(); 
        forelet.paint(getData());
    }
}

/**
 * 读取离线时间
 */


let off_data: any = {
    "player_exp": player_exp,
    "treasury_base": treasury_base,
    "Pi": Pi
};
let times = 0, //离线收益倍数
    all_bonus : any, //所有奖励加成
    gain_bonus : any, //所有收益加成
    award_list : any, //可获得奖励列表
    get_num=[1,0], //选择收益倍数
    resolve_prop = null, // 被分解的道具
    level_exp_flag = false,
    bagLength = 0,
    showExp = [],
    level_up_timer; //经验进度条动画定时器
    
let tip_timer = null;

const getData = function () {
    //离线时间(秒)
    off_data.player_level = getDB("player.level");
    off_data.player_vip = getDB("player.vip");
    off_data._player_exp = getDB("player.exp");
    off_data.leave_time = countTime()[0];
    off_data.get_num=get_num;
    //倍数
    off_data.times = times;
    off_data.all_bonus = all_bonus;
    off_data.gain_bonus = gain_bonus;
    off_data.award_list = award_list;
    off_data.resolve_prop = resolve_prop;
    off_data.formatNum = formatNum;
    off_data.showExp = showExp;
    return off_data;
}

export class OffLine extends Widget {
    getAward() {
        canGetAward();
    }
    selectTimes(i){
        if(i==0){
           get_num[0]=1;
           get_num[1]=0;
           times=0;
           gain_bonus["元  宝:"] = [0,"未激活" ,treasury_base.diamond_rate];
        }else{
            get_num[0]=0;
            get_num[1]=1;
            times=i-0;
            gain_bonus["元  宝:"] = [treasury_base.diamond_rate,"" ,treasury_base.diamond_rate];
            
        }
        forelet.paint(getData());
        
    }
    //收益加成详细界面
    details() {
        open("app_c-off_line-details-details");
    }
    //关闭界面
    goback(arg) {
        close(arg.widget);
        if(level_exp_flag){
            expEffect();
        }
        
    }
    gotoFunction(arg) {
        globalSend(arg);
        let w : any = forelet.getWidget("app_c-off_line-details-details");
        if(w){
            close(w);
            w = undefined;
        }
    }
    //花费元宝领取
    diamondAward() {
        get_num[0]=0;
        get_num[1]=1;
        times= 1;
        gain_bonus["元  宝:"] = [treasury_base.diamond_rate,"" ,treasury_base.diamond_rate];
        forelet.paint(getData());
        let w : any = forelet.getWidget("app_c-off_line-details-details");
        if(w){
            close(w);
            w = undefined;
        }
    }
    //物品详情
    showPropInfo = (id) => {
        globalSend("showOtherInfo", id);
    }
}

//判断能否领取奖励
const canGetAward = function () {
    let time = countTime()[0];
    if(treasury_base.min_time > time){
        globalSend("screenTipFun", {
            words: `累积时间达到${treasury_base.min_time}小时后才可领取`
        });
        return;
    }
    if (times == 0) {
        getAward();
    } else {
        let diamond = getDB("player.diamond");
        //vip
        if (off_data.player_vip >= treasury_base.need_vip) {
            times = 1;
            getAward();
            return;
        } else if (diamond < treasury_base.diamond) {
            globalSend("screenTipFun", {
                words: `元宝不足`
            });
            return;
        }
        getAward();
    }
};
const expEffect = () => {
    let player = getDB("player"),
        realExp = [player.level,Math.floor(player.exp/player_exp[player.level].exp*100)];

    if(showExp[0] == realExp[0]){
        level_up_timer = setInterval(()=>{
            if(realExp[1] > showExp[1]){
                showExp[1] += 3;
                if(showExp[1] > realExp[1]){
                    showExp[1] = realExp[1];
                    clearInterval(level_up_timer);
                    level_up_timer = undefined;
                }
                forelet.paint(getData());
            }else{
                clearInterval(level_up_timer);
                level_up_timer = undefined;
            }
        },50);
    }else{
        level_up_timer = setInterval(()=>{
            if(realExp[0] > showExp[0]){
                showExp[1] += 3;
                if(showExp[1] >= 100){
                    showExp[1] = 0;
                    showExp[0] = showExp[0]+1;
                }
                forelet.paint(getData());
            }else{
                if(realExp[1] > showExp[1]){
                    showExp[1] += 3;
                    if(showExp[1] > realExp[1]){
                        showExp[1] = realExp[1];
                        clearInterval(level_up_timer);
                        level_up_timer = undefined;
                    }
                    forelet.paint(getData());
                }else{
                    clearInterval(level_up_timer);
                    level_up_timer = undefined;
                }
            }
        },50);
    }
}

/**
 * 计算距离上次领奖时间有多久[根据vip等级]
 */
const countTime = function () {
    let time = 0;
    let now_time : any = Util.serverTime(true);
    let award_time = getDB("off_line.award_time");
    time = (now_time - award_time) / 3600;
    let arr = [];
    if (off_data.player_vip < treasury_base.need_vip) {
        arr = time > treasury_base.free_limit_time ? [treasury_base.free_limit_time, 0] : [time, treasury_base.free_limit_time - time];
    } else {
        arr = time > treasury_base.vip_limit_time ? [treasury_base.vip_limit_time, 0] : [time, treasury_base.vip_limit_time - time];
    }
    return arr;
}

const tipTimerFun = function () {
    let arr = countTime();
    let t = arr[1];
    clearImmediate(tip_timer);
    tip_timer = null;
    tip_timer = setTimeout(() => {
        clearImmediate(tip_timer);
        tip_timer = null;
        updata("off_line.tip", 1);
    }, t * 3600 * 1000)
}

/**
 * 领取奖励
 */
const getAward = function () {
    if(level_exp_flag){
        globalSend("screenTipFun", {
            words: `请稍候`
        });
        return;
    }
    let arg = {
        "param": { "type": (times == 1 ? 1 : 0) },
        "type": "app/role/leave_exp@award"
    }
    net_request(arg, (data) => {
        if (data.error) {
            // globalSend("screenTipFun", {
            //     words: `暂无离线经验`
            // });
            globalSend("screenTipFun", {
                words: { words: data.why }
            });
            return;
        }
        let player = getDB("player");
        showExp = [player.level,Math.floor(player.exp/player_exp[player.level].exp*100)];
        // oldPlyaer = player;
        let prop : any = Common.changeArrToJson(data.ok);
        let exp = getExpAward(prop);
        Common_m.deductfrom(prop);
        // let _prop: any = Common.changeArrToJson(prop.award);
        // for(let i=0;i<prop.award.length;i++){
        //     if(prop.award[i][0] == "exp"){
        //         prop.award[i][1] = player.exp;
        //     }
        //     if(prop.award[i][0] == "level"){
        //         prop.award[i][1] = player.level;
        //     }
        // }
        let result = Common_m.mixAward(prop);
        //计算有多少装备被分解以及装备所获得的道具
        let resolve_equip = resolveNum();
        resolve_prop = [award_list[2],resolve_equip[2]];
        result.resolve_equip = resolve_equip;
        updata("off_line.award_time", prop.award_time);
        updata("off_line.tip", 0);
        tipTimerFun();
        result.player.exp = exp;
        forelet.paint(getData());
        
        open("app_c-off_line-award-award", result);

        if(result.player.exp){
            level_exp_flag = true;
        }
    })
};

//计算经验值
const getExpAward = ( arg ) => {
    let player = getDB("player"),
        exp = player.exp,
        level = player.level,
        _exp : any = 0,
        _level : any = 0;

    for(let i=0;i<arg.award.length;i++){
        if(arg.award[i][0] == "exp"){
            _exp = arg.award[i][1];
        }
        if(arg.award[i][0] == "level"){
            _level = arg.award[i][1];
        }
    }

    let _index = _level - level,
        index = 0,
        add_exp = 0;

    if(_index == 0){
        return _exp - exp;
    }
    for(let i in player_exp){
        if( i >= level && index < _index){
            add_exp = player_exp[i].exp + add_exp;
            index++;
        }
    }
    return add_exp - exp + _exp;
}

const resolveNum = () => {
    let _add = 0, //总加成
        vip = getDB("player.vip"),
        level = getDB("player.level"),
        equips = 0; //获得的总装备
    for(let i in gain_bonus){
        _add = _add + gain_bonus[i][0]
    }
    _add = treasury_base.need_vip <= vip ? gain_bonus["元  宝:"][2] : 0;
    equips = Math.floor(all_bonus[2] * countTime()[0] + countTime()[0] * all_bonus[2] * _add);
    //被分解的装备数
    let residue = vip_advantage[vip].equip_count - bagLength;
    let resolves = residue >= equips ? 0 : (equips - residue);
    return [treasury_level[level].exchange_info,resolves,resolves ? equips - resolves : equips];
}

/**
 * 收益加成详细信息
 */
const gainBonus = () => {
    let month_card = getDB("player.month_card_due_time"),
        wekcard = getDB("player.annual_card_due_time"),
        vip = getDB("player.vip"),
        times1 = times;
    gain_bonus = {
        "金  卡:":[month_card ? vipcard[0].exp_add : 0,month_card ? "" : "未激活",vipcard[1].exp_add,treasury_base.gotoWeekCard],
        "白金卡:":[wekcard ? vipcard[1].exp_add : 0,wekcard ? "" : "未激活",vipcard[1].exp_add,treasury_base.gotoMonthCard],
        "秘  籍:":[nowRuneBonus() > runeBonus() ? runeBonus() : nowRuneBonus(),nowRuneBonus() == 0 ? "未激活": "" ,runeBonus(),treasury_base.gotoRune],
        "元  宝:":[
            times1 ? treasury_base.diamond_rate : (vip >= treasury_base.need_vip ? treasury_base.diamond_rate : 0),
            times1 ? "" : (vip > treasury_base.need_vip ? "" : "未激活"),
            treasury_base.diamond_rate
        ]
    }
}

/**
 * 符文加成
 */
const runeBonus = () =>{
    let _exp = 0;
    for(let i in rune){
        _exp = _exp + (rune[i][0].add_exp ? rune[i][0].add_exp : 0) * 10;
    }
    return _exp / 10;
}
/**
 * 当前符文加成
 */
const nowRuneBonus = () => {
    let _rune = getDB("rune.rune_set");
    let rune_bouns = 0;
    for(let i in rune){
        if(_rune[i - 0 - 1] !== 0){
            for(let j=0;j<rune[i].length;j++){
                if(rune[i][j].prop_id == _rune[i - 0 - 1]){
                    rune_bouns = rune_bouns + (rune[i][j].add_exp ? rune[i][j].add_exp : 0);
                }
            }
        }
    }
    return rune_bouns;
}

/**
 * 关卡奖励加成
 */
let missionBonus = () => {
    let mission = getDB("wild").wild_max_mission;
    return [
        treasury_act[mission].exp, //经验效率
        treasury_act[mission].money, //银币收益加成
        treasury_act[mission].equip_count, //装备收益加成
        treasury_act[mission].high_box_count //高级宝箱收益加成
    ]
}

/**
 * 等级奖励加成
 */
let levelBonues = () => {
    let level = getDB("player").level;
    return [
        treasury_level[level].exp, //经验效率
        treasury_level[level].money, //银币收益加成
        treasury_level[level].equip_count, //装备收益加成
        treasury_level[level].high_box_count, //高级宝箱收益加成
    ]
}
/**
 * 可获得奖励
 */
let awardList = () => {
    let level = getDB("player").level;
    award_list =  [
        100003,
        100001,
        treasury_level[level].show_equip_id, //装备ID
        treasury_level[level].high_box_id, //高级宝箱ID
    ]
}

/**
 * 总奖励加成
 */
const allBonus = () => {
    let level_bonus = levelBonues();
    let mission_bonus = missionBonus();
    
    all_bonus = [level_bonus[0] + mission_bonus[0],
                level_bonus[1] + mission_bonus[1],
                level_bonus[2] + mission_bonus[2],
                level_bonus[3] + mission_bonus[3]
            ];
}

//处理双精度计算误差
const formatNum = (f, digit) => { 
    let m = Math.pow(10, digit); 
    return Math.ceil(f * m) / m; 
} 

/**
 * 监听等级
 */
let origin_level = 0;
listen("player.level", () => {
    let player = getDB("player");
    let level = player.level;
    if (level <= origin_level) {
        return;
    }
    if(!level_exp_flag){
        showExp = [level,Math.floor(player.exp/player_exp[level].exp*100)]
    }
    origin_level = level;
    gainBonus();
    allBonus();
    forelet.paint(getData())
});
/**
 * 监听vip等级
 */
listen("player.vip", () => {
    gainBonus();
    allBonus();
    forelet.paint(getData())
    if (getDB("player.vip") == treasury_base.need_vip) {
        tipTimerFun();
    }
});
/**
 * 监听秘籍
 */
listen("rune.rune_set", () => {
    gainBonus();
    allBonus();
    forelet.paint(getData())
});

forelet.listener = (cmd: string, widget: Widget): void => {
    if (widget.name !== "app_c-off_line-off_line") {
        return;
    }
    if (cmd == "remove"){
        if(level_exp_flag){
            clearInterval(level_up_timer);
            level_up_timer = undefined;
            level_exp_flag = false;
            forelet.paint(getData());
        }
        
    }
    if (cmd === "add") {
        bagLength = allTabProp(getDB("bag",[]))[1] ? allTabProp(getDB("bag",[]))[1].length : 0;
        awardList();
        gainBonus();
        allBonus(); 
        forelet.paint(getData());
    }
}