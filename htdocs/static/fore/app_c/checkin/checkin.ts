//***************** 签到 ***************//
//====================================导入
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { get, insert, updata } from "app/mod/db";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request } from "app_a/connect/main";


import { checkinCfg } from "cfg/c/checkin_cfg";

export const forelet = new Forelet();

insert("checkin_data", {})

let isloaded = false;
export class checkin_w extends Widget {
    //签到
    checkIn() {
        checkinFun.checkinFun();
    };
    //签到满三次开宝箱
    openGemBox() {
        checkinFun.openGemBox();
    }
    //物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
    /**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
    destroy(): boolean {
        if (this.name === "app_c-activity-checkin-checkin") isloaded = false;
        if (!this.tpl)
            return false;
        this.tpl = undefined;
        if (this.resTab) {
            this.resTab.timeout = this.resTimeout;
            this.resTab.release();
        }
        this.forelet && this.forelet.removeWidget(this);
        return true;
    }
}
//签到
let checkinFun: any,
    checkInData, //签到数据
    secondMenu = false;

const createCheckinFun = () => {
    let module: any = {},
        cyclic_day = checkinCfg[0]["cyclic_day"] || 30,
        times_total = checkinCfg[0]["checkin_times"] || 3;

    module.getData = () => {
        let _data: any = {};
        _data.checkInData = checkInData; //服务器数据
        _data.checkinCfg = checkinCfg;
        _data.Pi = Pi;
        _data.player = get("player");
        _data.times_total = times_total;
        _data.cyclic_day = cyclic_day;
        _data.secondMenu = secondMenu;
        return _data;
    };
    //开宝箱
    module.openGemBox = () => {
        if (checkInData.boxday < times_total) {
            globalSend("screenTipFun", {
                words: "累计签到次数不足 " + times_total + " 次"
            });
            return;
        }
        let msg = { "param": {}, "type": "app/activity/checkin@get_checkin_box" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                checkInData.boxday = 0;
                updata("checkin_data", checkInData);
                let prop = Common.changeArrToJson(data.ok);
                let result: any = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                })
                module.updataHtml();
            }
        });
    };
    //签到通讯
    module.checkinFun = () => {
        let msg = { "param": {}, "type": "app/activity/checkin@do" };
        net_request(msg, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                checkInData.checkin_state = 1;
                checkInData.boxday += 1;
                checkInData.day += 1;
                updata("checkin_data.checkin_state", checkInData.checkin_state);
                updata("checkin_data.boxday", checkInData.boxday);
                updata("checkin_data.day", checkInData.day);
                let prop = Common.changeArrToJson(data.ok);
                let result = Common_m.mixAward(prop);
                result.auto = 1;
                globalSend("showNewRes", {
                    result, function(result) {
                        result.open();
                    }
                })
                module.updataHtml();
            }
        });
    };
    //更新页面
    module.updataHtml = () => {
        forelet.paint(module.getData());
    };

    //读取服务器签到数据
    module.read = () => {
        let msg = {
            "param": {},
            "type": "app/activity/checkin@read_checkin_reward"
        }
        net_request(msg, (data) => {
            if (data.error) {
                globalSend("screenTipFun", {
                    words: `通信失败`
                });
                return;
            }
            checkInData = Common.changeArrToJson(data.ok);
            // if (checkInData.checkin_state == 1) {
            //     checkInData.day -= 1;
            // }
            checkInData.times_total = times_total;
            updata("checkin_data", checkInData);
            forelet.paint(module.getData())
        });
    };
    return module;
};

checkinFun = createCheckinFun();
checkinFun.read();

