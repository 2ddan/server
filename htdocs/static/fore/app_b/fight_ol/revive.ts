// ========================================= 导入
//pi
import { getWidth, getHeight, getScale } from "pi/ui/root";
import { objCall } from 'pi/util/util';
//mod
import { Pi, globalSend, cfg } from "app/mod/pi";
import { data as localDB, updata, get as getDB, listen } from "app/mod/db";
import { Common } from "app/mod/common";
//app
import { net_request } from "app_a/connect/main";
import { Common_m } from "app_b/mod/common";
import { SMgr } from "app_b/fight_ol/same";

// ========================================= 导出
/**
 * 全局广播
 */
export const globalReceive: any = {
    //自己死亡
	self_die:()=>{
        sendDie(conFlag,()=>{
            let t = cfg.config_reset.config_reset.revive*1000+100 + Date.now();
            globalSend("popTip",{
                title:"s 后自动复活!",
                btn_name:["立即复活"],
                icon:["diamond",50],
                to_time:t,
                cb:[
                    //确认
                    ()=>{
                        revive(conFlag);
                    }
                ]
            })
        });
    },
    //重登录
    relogin_ok:()=>{
        failMgr.revive.count = failMgr.send.count = 0;
        conFlag += 1;
        for(let k in failMgr){
            failMgr[k].count = 0;
            if(failMgr[k].timer){
                clearTimeout(failMgr[k].timer);
                failMgr[k].timer = null;
            }
        }
    }
}

// ======================================== 本地
/**
 * @description 失败管理
 */
const failMgr = {
    revive : {
        count:0, // 重复通讯次数
        timer:null //重复通讯定时器
    },
    send : {count:0,timer:null}
};
/**
 * @description 连接标识,重连会变化
 */
let conFlag = 0;

/**
 * @description 同屏战斗复活接口
 */
const revive = (flag) => {
    failMgr.revive.count += 1;
	let msg = {"param": {}, "type": "app/pve/wild@resurgence"};
    net_request(msg, function (data) {
        if(flag !== conFlag)
            return;
        if (data.error) {
            globalSend("screenTipFun",{words:data.why})
            if(failMgr.revive.count < 5)
                failMgr.revive.timer = setTimeout(()=>{
                    revive(conFlag);
                },50);
            else failMgr.revive.count = 0;
            return;
        }
        globalSend("screenTipFun",{words:"您已复活！！"})
        let d = Common.changeArrToJson(data.ok);
        Common_m.deductfrom(d);
        // Common_m.mixAward(d);
        failMgr.revive.count = 0;
        let max_hp = getDB("player.allAttr.max_hp") || 10000;
        SMgr.getSelf().hp = max_hp;
        SMgr.getSelf().show_hp = max_hp;
    });
};
/**
 * @description 通知后台死亡
 */
const sendDie = (flag,callback) => {
    failMgr.send.count += 1;
	let msg = {"param": {}, "type": "app/pve/wild@record_dead_time"};
    net_request(msg, function (data) {
        if(flag !== conFlag)
            return;
        if(data.error) {
            globalSend("screenTipFun",{words:data.why})
            if(failMgr.send.count < 5)
            failMgr.send.timer = setTimeout(()=>{
                    sendDie(conFlag,callback);
                },50);
            else failMgr.send.count = 0;
            return;
        }
        failMgr.send.count = 0;
        callback && callback();
    });
};
// ================================= 立即执行

