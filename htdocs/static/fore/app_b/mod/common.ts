
import { data as localDB, updata, get as getDB, listen, checkTypeof } from "app/mod/db";
import { Pi, globalSend, cfg } from "app/mod/pi";
import { decode } from "app/mod/sample";
import { Common } from "app/mod/common";
import { Util } from "app/mod/util";
import { showAccount } from "app_b/fight/fight";
import { vip_advantage } from "cfg/c/vip_advantage";


export class Common_m {
    //获得个人时间轴的天数
    static getPersonalDay() {
        return Util.getDaysTo(Util.serverTime(), localDB.player.role_time * 1000);
    };
    //获得服务器时间轴的天数
    static getServerDay() {
        return Util.getDaysTo(Util.serverTime(), localDB.player.area_time * 1000);
    }
    //根据时间类型，获得当前时间  data,server,role
    static getCurrDay(type) {
        if (type == "date") {
            return Util.serverTime();
        } else if (type == "role") {
            return this.getPersonalDay();
        } else if (type == "server") {
            return this.getServerDay();
        }
    };
    /**
     * 时间戳转换成日期
     * @param time 时间（开服天数，创建角色天数，毫秒数）
     * @param type 时间类型
     */
    static changeTimeToDate(time, type?) {
        let date;
        if (!type || type == "date")
            date = new Date(time);
        else if (type == "server") {
            let stime = localDB.player.area_time;
            date = new Date(stime * 1000 + (time - 1) * 24 * 60 * 60 * 1000);
        } else if (type == "role") {
            let rtime: any = localDB.player.role_time;
            date = new Date(rtime * 1000 + (time - 1) * 24 * 60 * 60 * 1000);
        }
        return [date.getFullYear(), (date.getMonth() + 1), date.getDate()];
    }
    /**
     * 计算当前时间到某个时间间隔的天数
     * @param time 时间（开服天数，创建角色天数，毫秒数）
     * @param type 时间类型
     */
    static getDatesTo(day, type) {
        let now: any = {};
        if (type == "date") {
            now = Util.serverTime();
            day = new Date(day);
            day = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
            return Math.floor((now - day) / (24 * 60 * 60 * 1000));
        } else if (type == "role") {
            now = this.getPersonalDay();
        } else if (type == "server") {
            now = this.getServerDay();
        }
        return now - day;
    };
    /**
     * @description 获取消耗
     * @param {Json}_cfg {diamond:2334||0,money:2323||0,coin:[prop_sid,123]||0}
     * @return [消耗类型||物品sid, 消耗数量] => ["money"||"diamon"|| prop || prop_sid , number]
     */
    static getConsume(_cfg){
        let k,count;
        if(_cfg.diamond){
            k = "diamond";
            count = _cfg.diamond;
        }else if(_cfg.money){
            k = "money";
            count = _cfg.money;
        }else if(_cfg.coin){
            k = _cfg.coin[0];
            count = _cfg.coin[1];
        }
        return [k,count];
    }
    /**
     * @description 检查消耗是否充足
     * @param {Array}arg [消耗类型||物品sid, 消耗数量] => ["money"||"diamon"|| prop || prop_sid , number]
     * @return 不足则发消息到对应功能处理，充足则返回true
     */
    static checkConsume(arg){
        if(!arg)return true;
        let ch = {"diamond":"钻石","money":"金币"};
        //金币或钻石不足，弹出充值或兑换金币提示
        if(arg[0] === "diamond" || arg[0] === "money"){
            if(localDB.player[arg[0]] < arg[1]){
                // ?????? 充值和金币兑换功能就绪之后，下段代码则不再需要
                // globalSend("screenTipFun",{words:ch[arg[0]]+"不足，等待充值和金币兑换功能！！"});
                // globalSend("notEnough_"+arg[0]);
                globalSend("popTip",{
                    title:"<div>元宝不足</div><div>是否前往充值</div>",
                    btn_name:["充值","取消"],
                    cb:[
                        //确认
                        ()=>{
                            globalSend("gotoRecharge"); 
                        },
                        //取消
                        ()=>{
                           
                        }
                    ]
                })
                return false;
            }
        }else{
            // let _prop = arg[0]>0?Pi.sample[arg[0]]:arg[0],
            let _prop = getDB("bag*sid="+arg[0]).pop(),
            //  _count = _prop.count || 0;
             _count = (_prop && _prop.count) || 0;
             _prop = Pi.sample[arg[0]];
            if(_count < arg[1]){
                globalSend("screenTipFun",{words:"还需"+(arg[1]-_count)+_prop.name});
                return false;
            }
        }
        return true;
    };
    /**
     * 处理消耗
     * @param data 
     */
    static deductfrom(data) {
        if (!data) return false;
        let _player = localDB.player;
        let cost = data.cost = Common.changeArrToJson(data.cost);
        for(let k in cost){
            if(_player[k] && cost[k]>0)
                updata("player."+k,_player[k]-cost[k]);
            else if(k === "prop"){
                let arr = cost[k];
                for (let i = 0, len = cost[k].length; i < len; i++) {
                    let index = arr[i][0]-1;
                    let prop = getDB("bag."+index);
                    if (prop.count > arr[i][1]) {
                        updata("bag."+index+".count", prop.count-arr[i][1]);
                    } else {
                        updata("bag."+index, 0);
                    }
                }         
            }
        }
        return cost;
    };
    /**
     * @description 计算获得经验
     * @param {Number}level 达到的等级
     * @param {Number}exp 当前等级剩余经验
     */
    static calcExp(level,exp):Number{
        let old_level = localDB.player.level,
            old_exp = localDB.player.exp,
            diff = level-old_level,
            _cfg = cfg.player_exp.player_exp,
            r = 0;
        for(old_level;old_level<level;old_level++){
            r = r + _cfg[old_level];
        }
        return r-old_exp+exp;
    }
    /**
     * @description 处理奖励/获得物品,并广播newProps{"prop_type":[prop,...]},prop_type: "equip","ep_level"...
     * @param data 
     */
    static mixAward(data) {
        if (!data) return;
        let _player = localDB.player;
        let _bag = localDB.bag;
        let _props = {};
        let award:any = data.award = Common.changeArrToJson(data.award);
        let r:any = {player:{},bag:[]}
        for(let k in award){
            if(k === "money"){
                updata("player.money", _player.money+award[k]);
                if(award[k]>0)r.player.money = award[k];
            }else if(k === "exp"){
                let exp = Common_m.calcExp(award.level,award.exp);
                updata("player.exp", award[k]);
                if(exp>0)r.player.exp = exp;
            }else if(k === "rmb"){
                let rmb = _player.rmb + award.rmb;
                updata("player.rmb", rmb);
                if(award.rmb>0)r.player.rmb = award.rmb;
            }else if(k === "level"){
                updata("player.level", award[k]);
            }else if(k === "vip_level"){
                updata("player.vip", award[k]);
            }else if(k === "vip_exp"){
                updata("player.vip_exp", award[k]);
            }else if(k === "diamond"){
                updata("player.diamond", _player.diamond + award[k]);
                if(award[k]>0)r.player.diamond = award[k];
            }else if(k === "gang_contribute"){
                updata("player.gang_contribute", _player.gang_contribute + award[k]);
                if(award[k]>0)r.player.gang_contribute = award[k];
            }else if(k === "prop"){
                let prop = award[k];
                for(let i = 0,len = prop.length;i < len;i ++){
                    let index = prop[i][1]-1,
                    sample = decode(prop[i][0],Pi.sample);
                    //判断是否为红装(更新相应数据)
                    if (sample.type == 'equip' && sample.quality == 6) {
                        let num = getDB("friend_battle.god_equip_num") - 0 + 1;
                        updata("friend_battle.god_equip_num", num);
                        updata(`friend_battle.red_collect.${sample.slot - 1}`, sample.level);
                    }
                    _props[sample.type] = _props[sample.type] || [];
                    _props[sample.type].push(sample);
                    sample.index = index;
                    if (_bag[index]) {
                        updata("bag." + index + ".count", _bag[index].count+sample.count);
                    }
                    else {
                        updata("bag." + (index), sample);
                    }
                    r.bag.push(sample);
                }
            }
        }
        if(!Common.checkJsonIsEmpty(_props))
            globalSend("newProps",_props);
        return r;
    };
    /**
     * @description 支付奖励回调
     */
    static payAward(data) {
        this.mixAward({award:data});
    }
    /**
     * @description 调取结算界面
     * @param result 战斗结束返回值
     * @param source 功能名字，与function_open表配置的key一致
     * @param prop 战斗胜利后台通信返回结果
     */
    static openAccount (result, source, prop:any = {}, star = 0,callback?) {
        prop.result = result;
        prop.extra = {
            "source": source,
            "star": star
        }
        showAccount(prop, () => {
            callback && callback();
        });
    }

    /**
     * 判断背包是否已满
     * @return ture(满), false(未满)
     */
    static bagIsFull () {
        let vip = getDB("player.vip"),
            bag = getDB("bag"),
            arr = bag.filter((x) => {
                if (x && x.type === "equip") return x;
            })
        if (arr.length >= vip_advantage[vip].equip_count) {
            return true;
        }
        return false;
    }
    /**
     * 判断背包是否已满
     * @return ture(满), false(未满)
     */
    static treasureSkill (fightScene,msg) {
        let m = {ok:[["result","undefined"]]};
        if(fightScene && !fightScene.pause){
            if(!fightScene.handSkill(fightScene.fighters[0].mapId,Common.getObjHasOneValue(fightScene.fighters.get(1).skill,"id",msg.skill_id)))
                m.ok[0][1] = "no target";
            setTimeout(function() {
                msg.callback && msg.callback(m); 
            }, 0);
        }
    }
    /**
     * 小数 转换成 百分比
     */
    static decimalToPercent (num) {
        return num < 1 ? `${num * 100}%` : num;
    }
}
