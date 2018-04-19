//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { close, open } from "app/mod/root";
import { Common } from "app/mod/common";
import { updata, get as getDB } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { Util } from "app/mod/util";
import { online_gift_base } from "cfg/b/online_gift_base";
import { Music } from "app/mod/music";

export const forelet = new Forelet();

//前台点击操作
export class OnlineGift extends Widget {
    //关闭
    goback(arg) {
        close(arg.widget)
    }
    getAward() {
        canGetAward();
    }
    timeEnd() {
        forelet.paint(getData());
        updata("online_gift.get_award", 1);        
    }
    propInfoShow(sid) {
        globalSend("showOtherInfo", sid);
    }
}

let index, //当前应该领取哪一个奖励 (当为-1时，说明奖励已领完)
    end_time = 0,
    online_date: any = {
        "Util": Util,
        "online_gift_base": online_gift_base,
        "Pi": Pi
    }
const getData = function () {
    online_date.index = index;
    online_date.id = getDB("online_gift.id");
    online_date.end_time = end_time;
    online_date.career_id = getDB("player.career_id");
    return online_date;
}

//当前领取奖励
const hanAward = function (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i][1] === 0) {
            return i;
        }
    }
    return -1;
}

//canGetAward
export const canGetAward = function () {
    let time = Util.serverTime(true);
    if (end_time > time) {
        forelet.paint(getData());
        open("app_b-online_gift-award-award");
    } else {
        getAward();
    }
}


//领取奖励
const getAward = function () {
    let arg = {
        "param": {},
        "type": "app/activity/online_gift@award"
    };
    net_request(arg, (data) => {
        updata("online_gift.get_award", 0);                
        if (data.error) {
            globalSend("screenTipFun", {
                words: `时间未到`
            });
            return;
        }
        let prop: any = Common.changeArrToJson(data.ok);
        let result = Common_m.mixAward(prop);
        result.auto = 1;
        globalSend("showNewRes", {
            result, function(result1) {
                result1.open();
            }
        });
        updata("online_gift.award", prop.award_info[1]);
        index = hanAward(prop.award_info[1]);
        updata("online_gift.curr", index);
        
        if (index >= 0) {
            end_time = prop.award_info[1][index][0] + online_gift_base[online_date.id][index].award_time * 60;
        }
        forelet.paint(getData());
    })
}



listenBack("app/activity/online_gift@read", (data) => {
    //console.log(data);
    let _data: any = {};
    _data.id = data.award_info[0];
    _data.award = data.award_info[1];
    index = hanAward(_data.award);
    _data.curr = index;
    if (index >= 0) {
        end_time = _data.award[index][0] + online_gift_base[_data.id][index].award_time * 60;
    }
    updata("online_gift", _data);
    forelet.paint(getData());
    let now = Util.serverTime(true);
    if(index != -1 && now >= end_time){
        updata("online_gift.get_award", 1);
    }
})