//pi
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
//mod
import { Pi, globalSend } from "app/mod/pi";
import { data as localDB, get as getDB, updata, insert, listen, checkTypeof } from "app/mod/db";
import { listenBack } from "app/mod/db_back";
import { Common } from "app/mod/common";
import { open, close } from "app/mod/root";
import { Util } from "app/mod/util";
//app
import { net_request, net_message } from "app_a/connect/main";
import { Common_m } from "app_b/mod/common";
import { showNewRes } from "app_b/bag/bag";

let count = 0;//打开页面次数

export const forelet = new Forelet();

export const globalReceive = {
    gotoNews: () => {
        forelet.paint(getData());
        open("app_c-news-news");
        count = 1;
    }
}
export class Mail extends Widget {
    detach(){
        if(count){
            updateSate();
        }
    }
    goback = function (msg) {
        let w = newsWidget;
        newsWidget = null;
        close(w);
    }
    /**
     * @description 领取奖励
     * @param {Number}arg mail index
     */
    receiveAward(arg) {
        receiveAward(arg - 0);
    }
    //一键领取
    receiveAllAward(arg) {
        if (!arg) {
            globalSend("screenTipFun", { words: `无可领取的邮件` });
            return;
        }
        receiveAll();
    }
    //物品详情
    showPropInfo = (id) => {
        globalSend("showOtherInfo", id);
    }
    //退出页面时更新 新字状态
}


// ==================================== 本地
/**
 * @description news widget
 */
let newsWidget,
    newsData: any = {
        "Pi": Pi,
        "Util": Util
    };
/**
 * @description news mail object
 */
let createMail = (_d) => {
    let prop = _d[1][1][3];
    return {
        index: _d[1][0],
        receive: _d[0],
        time: _d[1][1][0],
        title: Common.fromCharCode(_d[1][1][1]),
        detail: Common.fromCharCode(_d[1][1][2]),
        prop: prop.length ? prop : null
    };
}


const getData = function () {
    let player = getDB("player");
    newsData.career_id = player.career_id;
    newsData.list = mySort();//邮件排序
    return newsData;
}
const mySort = function () {
    newsData.oneKey = 0;
    let arr = getDB("mail");
    let now = Util.serverTime();
    let a = [],
        b = [];
    // c = [];


    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].receive === 0) {
            if (arr[i].time - 0 + 3600 * 24 * 7 * 1000 > now) {
                a.push(arr[i]);
            }
        } else if (arr[i].receive === 1) {
            if (arr[i].time - 0 + 3600 * 24 * 3 * 1000 > now) {
                b.push(arr[i]);
            }
        }
        if (arr[i].receive !== 2 && arr[i].prop && !newsData.oneKey) {
            newsData.oneKey = 1;
        }
        // if (arr[i].receive === 2) {
        //     if(arr[i].time - 0 + 3600*24*3*1000 > now){
        //         c.push(arr[i]);
        //         continue;
        //     }
        // } 
    }
    a.length && a.sort((m, n) => { return n.time - m.time });
    b.length && b.sort((m, n) => { return n.time - m.time });
    // c.length && c.sort((m,n)=>{return m.time - n.time});
    // return [...a, ...b,...c];
    return [...a, ...b];
}


/**
 * @description 处理邮件数据
 */
const readMail = (data) => {
    let _d = data.mail,
        list = [];
    for (let i = _d.length - 1; i >= 0; i--) {
        if (_d[i][0] != 2) {
            list.push(createMail(_d[i]));
        }

    }
    updata("mail", list);
}
/**
* @description 领取奖励
* @param {Number}index mail index
*/
const receiveAward = (index) => {
    net_request({ "param": { "index": index }, "type": "app/mail@award" }, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: `背包已满` });
            console.log(data.why);
            return;
        }
        let prop: any = Common.changeArrToJson(data.ok);
        let result = Common_m.mixAward(prop);
        if (JSON.stringify(result.player) == "{}" && !result.bag.length) {
            globalSend("screenTipFun", { words: `背包已满` });
        } else {
            result.auto = 1;
            showNewRes(result, function (result) {
                result.open();
            });
        }
        //更新mail
        let _m = getDB("mail");
        for (let i = 0, len = _m.length; i < len; i++) {
            if (_m[i].index == index) {
                // updata("mail." + i + ".receive", 2);
                _m.splice(i,1);
                updata("mail",_m);
                break;
            }
        }

        let timer = setTimeout(() => {
            forelet.paint(getData());
            clearTimeout(timer);
            timer = null;
        }, 0)
    });
};
/**
* @description 一键领取
* @param
*/
const receiveAll = () => {
    net_request({ "param": {}, "type": "app/mail@one_key_award" }, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: `背包已满` });
            console.log(data.why);
            return;
        }
        let prop: any = Common.changeArrToJson(data.ok);
        let result = Common_m.mixAward(prop);
        if (JSON.stringify(result.player) == "{}" && !result.bag.length) {
            globalSend("screenTipFun", { words: `背包已满` });
        } else {
            result.auto = 1;
            showNewRes(result, function (result) {
                result.open();
            });
        }

        // //更新mail
        net_request({ "param": {}, "type": "app/mail@read" }, (data) => {
            if (data.error) {
                globalSend("screenTipFun", { words: data.why });
                console.log(data.why);
                return;
            }

            readMail(Common.changeArrToJson(data.ok));

            let timer = setTimeout(() => {
                forelet.paint(getData());
                clearTimeout(timer);
                timer = null;
            }, 0)
        });
        // let _m = getDB("mail");
        // for(let len = _m.length,i=len-1;i>=0;i--){
        //     for(let v of prop.mail){

        //         if( v[1][0] == _m[i].index){
        //             updata("mail."+i+".receive",v[0]);
        //             break;
        //         }
        //     }
        // }

    });
};
/**
* @description 更新邮件是否为新
* @param {Number}index mail index
*/
const updateSate = () => {
    count = 0;
    let mail = getDB("mail");
    let arr = [];
    let str = "";
    for (let v of mail) {
        (!v.receive) && (arr.push(v.index))
    }
    if (!arr.length) {
        return;
    }
    str = arr.join(",");

    net_request({ "param": { "index": str }, "type": "app/mail@refresh_status" }, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }

        //更新mail
        let _m = getDB("mail");
        for (let i = 0, len = _m.length; i < len; i++) {
            if (!_m[i].receive) {
                updata("mail." + i + ".receive", 1);
            }

        }
    });
};
/**
* @description 添加邮件
* @param {Number}index mail index
*/
const addMail = (data) => {
    let _m = createMail(data.mail);
    // _m.title = Common.fromCharCode(_m.title);
    // _m.detail = Common.fromCharCode(_m.detail);
    // _m.prop = _m.prop.length ?  _m.prop : null;
    updata("mail." + localDB.mail.length, _m);
}
// =================================== 立即执行

/**
 * @description 初始化数据库邮件字段
 */
insert("mail", []);
/**
 * @description 监听数据库
 */
// listen("mail",()=>{
//     forelet.paint({});
// });

/**
 * @description 获取邮件数据
 */
listenBack("app/mail@read", (data) =>{
    readMail(data);
});
/**
 * @description 监听邮件推送
 */
net_message("mail", function (data) {
    if (count) {
        updateSate();
    }
    addMail(data);
});
/**
 * @description forelet 监听
 */
forelet.listener = (cmd, w) => {
    if (cmd !== "firstPaint")
        return;
    if (w.name == "app_c-news-news")
        newsWidget = w;
}