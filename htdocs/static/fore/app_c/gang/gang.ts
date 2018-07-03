/**
 * 模块
 */
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request, net_message } from "app_a/connect/main";
import { Common } from "app/mod/common";
import { insert, updata, get as getDB, checkTypeof } from "app/mod/db";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { globalSend, Pi } from "app/mod/pi";
import { Util } from "app/mod/util";
import { open, close } from "app/mod/root";
import { closeBack } from "pi/ui/root";
import { getRealNode } from "pi/widget/painter";
import { findNodeByAttr } from "pi/widget/virtual_node";
/**
 * 配置表
 */
import { msg as msgCfg } from "cfg/c/msg";
import { guild_base } from "cfg/c/guild_base"; //基础数据
import { guild_upgrade } from "cfg/c/guild_upgrade"; //门派等级相关
import { guild_shop } from "cfg/c/guild_shop"; //门派商店
import { guild_skill } from "cfg/c/guild_skill";
import { attribute_config } from "cfg/c/attribute_config";
import { vip_advantage } from "cfg/c/vip_advantage";
import { guild_activity } from "cfg/c/guild_activity";
import { guild_contribution } from "cfg/c/guild_contribution";
import { guild_collect } from "cfg/c/guild_collect";
import { guild_charge } from "cfg/c/guild_charge";
import { guild_build } from "cfg/c/guild_build";
import { guild_battle_base } from "cfg/c/guild_battle_base";


/**
 * 创建 forelet 并导出
 */
export const forelet = new Forelet();

/**
 * 前台数据库插入字段
 */
insert("gang", {
    //原基础数据
    "data": {},
    //扩展基础数据
    "gangExpandData": {},
    //其它数据
    "other": {
        "skill_id": 1, //选择技能
        "is_fighting": 0, //是否正在战斗
        "is_up_skill": 0
    },
    //门派boss数据
    "gangBoss": {},
    //所有门派
    "gang_list": [],
    //门派boss领奖
    "tip": {}
});

/**
 * 定义变量
 */
let gangData = null, //用于存储从后台读取的门派数据
    gangExpandData = null, //门派扩展功能数据
    gang_list = [], //用于储存工会列表
    gang_tab = "info",  //用于工会信息界面的tab切换
    apply_list = [], //申请列表
    minor_num = 0, //副门主数量
    gang_member = [], //门派成员
    find_list = [], //搜索门派列表
    role_index;  //门派成员标记

//保存创建门派时的信息
let input_text = {
    gang_name: "", //门派名字
    gang_enounce: "", //门派宣言
    gang_notice: "" //门派内部公告
};

export const getData = function () {
    let data: any = {};
    data.Pi = Pi;
    //配置表
    data.guild_base = guild_base;
    data.guild_upgrade = guild_upgrade;
    data.guild_skill = guild_skill;
    data.attribute_config = attribute_config;
    data.vip_advantage = vip_advantage;
    data.guild_shop = guild_shop;
    data.guild_activity = guild_activity;
    data.guild_contribution = guild_contribution;
    data.checkTypeof = checkTypeof;
    data.Common = Common;
    data.guild_collect = guild_collect;
    data.guild_charge = guild_charge;
    data.guild_build = guild_build;

    let gang_contribute = getDB("bag*sid=150005").pop();
    data.gang_contribute = gang_contribute ? gang_contribute.count : 0;
    data.gangData = getDB("gang.data"); //门派数据
    data.gangExpandData = getDB("gang.gangExpandData"); //门派扩展功能数据
    data.gang_tab = gang_tab; //门派tab切换
    data.gang_list = gang_list; //门派列表
    data.gang_member = gang_member; //门派成员
    data.minor_num = minor_num; //副门主数量
    data.apply_list = apply_list; //申请列表
    data.find_list = find_list; //查找门派列表
    data.role_index = role_index; //门派成员index
    data.player = getDB("player");

    data.other = getDB("gang.other");

    data.guild_battle_base = guild_battle_base;
    data.Util = Util;
    return data;
}


/**
 * 功能入口
 */
export const globalReceive = {
    //进入门派功能
    gotoGang: (i?) => {
        if (funIsOpen("gang")) {
            goIntoGang(i);
            globalSend("openNewFun", "gang");
        }
    }
}

const goIntoGang = function (i?) {
    i = i || 0;
    let arr = ["info", "member_list", "build", "event"];
    //tab 页
    gang_tab = arr[i];
    forelet.paint(getData());
    //玩家是否已经在门派了
    if (gangData) {
        open("app_c-gang-hall-hall_m");
    } else {
        readGangList(() => {
            forelet.paint(getData());
            //如果没有则打开申请门派页面
            open("app_c-gang-main-main");
        })
    }
};

/**
 * 前台操作 [widget]
 */
export class Gang extends Widget {
    clearText() {
        let w:any = forelet.getWidget("app_c-gang-gang_msg-gang_msg");
        if (!w) {
            return;
        }
        let _listNode : any = getRealNode(findNodeByAttr(w.tree, "data-desc" ,"text"));
        _listNode.value = '';
    }
    //查看其它玩家
    seeOther(roleId) {
        globalSend("gotoSeeOther", roleId);
        let w: any = forelet.getWidget("app_c-gang-role-role_m");
        w && w.cancel && w.cancel();
    }
    //打开申请列表
    openApplyList() {
        open("app_c-gang-apply_list-apply_list");
    }
    //门派排名
    gotoRankClick() {
        readGangList(() => {
            forelet.paint(getData());
            open("app_c-gang-gang_list-gang_list");
        })
    }
    //工会信息界面tab切换
    changeColumns(msg) {
        if (gang_tab == msg.type_m) return;
        gang_tab = msg.type_m;
        if (gang_tab == "member_list") {
            //读取门派成员
            readMemberList(() => {
                forelet.paint(getData())
            })
        } else {
            forelet.paint(getData())
        }
    }
    goback(arg) {
        // let w: any = forelet.getWidget("app_c-gang-hall-hall_m");
        // close(w);
        // w = undefined;
        close(arg.widget);
    }
    //关闭浮窗
    closeCover(arg) {
        close(arg.widget);
    }
    //详情帮助
    getHelp(arg) {
        globalSend("showHelp", arg);
    };
    //打开创建门派界面
    gotoCreateClick() {
        open("app_c-gang-create-create");
    }
    //玩家在创建工会输入框中输入数据时调用
    getFocusInput(arg) {
        let text = '';
        let num = 0;
        if (arg.id == "gangname") {
            input_text.gang_name = arg.text;
            text = "门派名字";
            num = 5;
        }
        if (arg.id == "gangenounce") {
            input_text.gang_enounce = arg.text;
            text = "门派宣言";
            num = 16;
        }
        if (arg.id == "gangnotice") {
            input_text.gang_notice = arg.text;
            text = "内部公告";
            num = 200;
        }
        //计算输入长度
        if (gangFun.bytesNum(arg.text) > num * 2) {
            globalSend("screenTipFun", {
                words: text + "不能超过" + num + "个字"
            });
            return;
        }
    }
    //确定创建
    createClick(bol) {
        if (bol) {
            let w = forelet.getWidget("app_c-gang-create-create");
            w && close(w);
            gangFun.lackDiamond();
            return;
        }
        let name = input_text.gang_name;//5
        //let text = input_text.gang_enounce;//16
        if (!name) {
            globalSend("screenTipFun", {
                words: "门派名字不能为空"
            });
            return;
        }
        if (gangFun.bytesNum(name) > 10) {
            globalSend("screenTipFun", {
                words: "门派名字不能超过5个字"
            });
            return;
        }
        // if (gangFun.bytesNum(text) > 32) {
        //     globalSend("screenTipFun", {
        //         words: "门派宣言不能超过16个字"
        //     });
        //     return;
        // }
        createGang(name);
    }
    // //打开搜索界面  [此版本取消该功能]
    // gotoFindClick() {
    //     //重置数据
    //     find_list = [];
    //     input_text.gang_name = '';
    //     //调用获取门派列表的函数
    //     readGangList(() => {
    //         forelet.paint(getData());
    //         open("app_c-gang-find_m-find_m");
    //     });
    // }
    //快速加入
    quickJoin() {
        quickJoin();
    }
    //搜索门派
    findClick() {
        let name = input_text.gang_name;
        if (!name) {
            globalSend("screenTipFun", {
                words: "搜索信息不能为空！"
            });
            return;
        }
        gangFun.disposeFind();
    }
    //申请加入工会
    applyGangClick(msg) {
        applyGang(msg);
    }
    //门主或副门主处理申请
    disposeApplyClick(msg) {
        disposeApply(msg);
    }
    //打开门主更改工会名字弹窗
    gotoChangNameClick() {
        input_text.gang_name = '';
        open("app_c-gang-change_name-change_name");
    }
    //确认更改工会名字
    changNameClick(bol) {
        if (bol) {
            gangFun.lackDiamond();
            return;
        }
        gangFun.changeGangName();
    }
    roleInfoClick(i) {
        role_index = i;
        forelet.paint(getData());
        open("app_c-gang-role-role_m");
    }
    //打开任职界面
    gotoPostClick() {
        open("app_c-gang-post-post");
    }
    //根据传入的参数不同任命不同的职位(1 -> 门主, 2 -> 副门主, 3 -> 成员)
    appoint(msg) {
        msg = msg - 0;
        gangFun.appointTip(msg);
        forelet.paint(getData());
    }
    //修改门派宣言 门派内部公告弹窗 (根据传参不同)
    changeInfo(arg) {
        let flag = arg - 0;
        input_text.gang_enounce = '';
        input_text.gang_notice = '';
        open("app_c-gang-gang_msg-gang_msg", { "flag": flag });
    }
    //确认修改门派公告
    sureNoticeClick() {
        gangFun.sureNoticeClick()
    }
    //确认修改门派宣言
    sureMsgClick() {
        gangFun.sureMsgClick();
    }
    //退出门派
    exitClick() {
        globalSend("popTip", {
            btn_name: ["确定", "取消"],
            title: `是够离开门派?(<span style="color:red">离开门派24小时内不可再加入门派</span>)`,
            cb: [function () {
                exitGnag();
            }, ""]
        });
    }
    //解散门派
    DisbandClick() {
        open("app_c-gang-tips_tpl-disband");
    }
    //确定解散
    DismissGang() {
        dismissGang();
    }
    //将成员踢出门派
    kickMember() {
        open("app_c-gang-tips_tpl-kickmember");
    }
    //确定踢出
    sureKickMember() {
        sureKickMember();
    }

    /**
     * 扩展功能操作
     */
    //打开一键加入
    openAutoJoin() {
        openAutoJoin()
    }
    //打开每日俸禄
    openDailySalary() {
        globalSend("openDailySalary");
    }
    //打开门派商店
    openGangShop() {
        globalSend("openGangShop");
    }
    //打开学习技能
    openGangSkill() {
        globalSend("openGangSkill");
    }
    //打开日常
    openGangActivity() {
        globalSend("openGangActivity");
    }
    //打开门派boss
    openGangBoss() {
        globalSend("openGangBoss");
    }
    //打开门派战
    openGangBattle() {
        // globalSend("openGangBattle");
        globalSend("attrTip", { words: `敬请期待....` })
    }
    funInfo() {
        globalSend("funInfo", {
            width: 235,
            hieght: 90,
            text: `<div class="shadow" style="color:#ffd8a6">开启自动通过以后，申请进入门派的玩家会不经过审核直接加进门派。</div>`
        })
    }
}


/**
 * 数据操作
 */
const gangFun = {
    //判断是否满足修改公告条件
    sureNoticeClick: function () {
        let txt = input_text.gang_notice;
        if (gangFun.bytesNum(txt) > 400) {
            globalSend("screenTipFun", {
                words: "公告不能超过200个字！"
            });
            return;
        }
        if (!txt) {
            globalSend("screenTipFun", {
                words: "公告不能为空!"
            });
            return;
        }
        sureNoticeClick(txt);
    },
    //判断是否满足修改宣言条件
    sureMsgClick: function () {
        let txt = input_text.gang_enounce;
        if (!txt) {
            globalSend("screenTipFun", {
                words: "宣言不能为空!"
            });
            return;
        }
        if (gangFun.bytesNum(txt) > 32) {
            globalSend("screenTipFun", {
                words: "宣言不能超过16个字！!"
            });
            return;
        };
        sureMsgClick(txt);
    },
    //判断是否满足任职条件
    appointTip: function (msg) {
        let txt = msg == 1 ? "门主" : (msg == 2 ? "副门主" : "成员");
        //var m = gang_member[role_index].post<msg?"提升":"降";
        if (gang_member[role_index].post == msg) {
            globalSend("screenTipFun", {
                words: "该成员已是" + txt
            });
            return;
        } else if (msg == 2 && minor_num == 2) {
            globalSend("screenTipFun", {
                words: "副门主职位已满"
            });
            return;
        } else if (msg == 1) {
            globalSend("popTip", {
                title: "确定转让门主职位吗",
                btn_name: ["确认", "取消"],
                cb: [function () {
                    appoint(msg);
                }, ""]
            });
            return;
        }
        globalSend("popTip", {
            title: "确认任命该玩家为" + txt,
            btn_name: ["确认", "取消"],
            cb: [function () {
                appoint(msg);
            }, ""]
        });
    },
    //修改门派名称
    changeGangName: function () {
        let name = input_text.gang_name;
        if (!name) {
            globalSend("screenTipFun", {
                words: "名字不能为空！"
            });
            return;
        }
        if (gangFun.bytesNum(name) > 10) {
            globalSend("screenTipFun", {
                words: "名字不能超过5个字！"
            });
            return;
        }
        changeGangName(name);
    },
    //处理门派搜索
    disposeFind: function () {
        //过滤门派, 在门派列表中找到玩家输入的 门派id 或者 门派名字
        find_list = gang_list.filter((x) => {
            return (name == x.gang_name || name == x.gang_id + '')
        });
        if (!find_list.length) {
            globalSend("screenTipFun", {
                words: "没有该门派！"
            });
            return;
        }
        forelet.paint(getData());
    },
    //计算字节数
    bytesNum: function (msg) {
        if (!msg) {
            return 0;
        }
        let Zhlength = 0;// 全角
        let Enlength = 0;// 半角
        let val = msg + '';
        for (let i = 0; i < val.length; i++) {
            if (val.substring(i, i + 1).match(/[^\x00-\xff]/ig) != null)
                Zhlength += 1;
            else
                Enlength += 1;
        }
        return Zhlength * 2 + Enlength;
    },
    //元宝不足, 前往充值
    lackDiamond: function () {
        globalSend("popTip", {
            title: "<div>元宝不足</div><div>是否前往充值</div>",
            btn_name: ["充值", "取消"],
            cb: [
                //确认
                () => {
                    globalSend("gotoRecharge");
                },
                () => { }
            ]
        });
    },
    //门派事件的格式解析
    disposeEvent: function (data) {
        let app_msg = msgCfg;
        let _data = JSON.parse(JSON.stringify(data));
        let s: any = {};
        let text = app_msg[data.text_id].content;
        _data.post = _data.post == 1 ? "门主" : (_data.post == 2 ? "副门主" : "成员");
        _data.name = _data.name ? (checkTypeof(_data.name, "Array") ? Common.fromCharCode(_data.name) : _data.name) : _data.id;
        _data.name1 = _data.name1 ? (checkTypeof(_data.name1, "Array") ? Common.fromCharCode(_data.name1) : _data.name1) : _data.id1;
        _data.pray_name = _data.pray_name ? (checkTypeof(_data.pray_name, "Array") ? Common.fromCharCode(_data.pray_name) : _data.pray_name) : undefined;
        _data.prop_name = _data.prop_name ? (checkTypeof(_data.prop_name, "Array") ? Common.fromCharCode(_data.prop_name) : _data.prop_name) : undefined;
        _data.gang_name = checkTypeof(_data.gang_name, "Array") ? Common.fromCharCode(_data.gang_name) : _data.gang_name;
        _data.boss_name = _data.boss_name ? (checkTypeof(_data.boss_name, "Array") ? Common.fromCharCode(_data.boss_name) : _data.boss_name) : undefined;

        
        _data.desc = checkTypeof(_data.desc, "Array") ? Common.fromCharCode(_data.desc) : _data.desc;
        _data.notice = checkTypeof(_data.notice, "Array") ? Common.fromCharCode(_data.notice) : _data.notice;
        for (let k in _data) {
            if (text.indexOf("{{" + k + "}}") >= 0) {
                text = text.replace("{{" + k + "}}", _data[k]);
            }
        }
        s.time = _data.time ? _data.time : Util.serverTime(true);
        s.text = text;
        s.text_id = _data.text_id;
        return s;
    },
    //清空申请列表
    disposeClear: function () {
        apply_list = [];
        forelet.paint(getData());
    },
    //关闭界面
    closeW: function (arg) {
        let w: any = forelet.getWidget(arg);
        if (w) {
            close(w);
        }
    },
    //关闭所有窗体
    closeAll: function () {
        let w = forelet.getWidget("app_c-gang-hall-hall_m");
        if (w) {
            closeBack();
        }

        // gangFun.closeW("app_c-gang-hall-hall_m");
        // gangFun.closeW("app_c-gang-shop-shop_m");
        // gangFun.closeW("app_c-gang-instance-main-chapter");
        // gangFun.closeW("app_c-gang-role-role_m");
        // gangFun.closeW("app_c-gang-gang_list-gang_list");
    },
    //门主或者副门主处理申请后, 后台推送消息, 重新读取门派成员
    disposeMember: function (sid) {
        //删除该条申请
        apply_list = apply_list.filter(function (x) { return sid != x.role_id });
        updata("gang.data.apply_list", apply_list);
        //新加入的玩家
        if (sid == getDB("player").role_id) {
            readAllData(() => {
                if (Common.isExist(forelet, "app_c-gang-main-main")) {
                    gangFun.closeW("app_c-gang-main-main");
                    forelet.paint(getData());
                    open("app_c-gang-hall-hall_m");
                }
                globalSend("attrTip", {
                    words: "恭喜你加入 " + gangData.gang_name + " 门派"
                });
            })
        } else {
            //老成员 [更新门派成员数量]
            gangData.gang_count++;
            updata("gang.data.gang_count", gangData.gang_count);
            readMemberList(() => {
                forelet.paint(getData());
            })
        }
    },
    //退出门派
    disposeKick: function (data) {
        let player = getDB("player");
        gangData.gang_count--;
        updata("gang.data.gang_count", gangData.gang_count);
        //被踢的玩家
        if (data.id == player.role_id) {
            globalSend("popTip", {
                title: "很抱歉, 你已被请离门派...",
                btn_name: ["确认", "取消"],
                cb: [function () {
                    gangFun.notifyPlayer();
                }, function () {
                    gangFun.notifyPlayer();
                }]
            });
        }
        //将被踢除的玩家删除
        gang_member = gang_member.filter(function (x) { return data.id != x.role_id });
        //踢人的管理员
        if (data.id1 == player.role_id) {
            gangFun.closeW("app_c-gang-role-role_m");
        }
        forelet.paint(getData());
    },
    //弹出框通知玩家已被踢出门派
    notifyPlayer: function () {
        gangData = null;
        readAllData();
        gangFun.closeAll();
    }
};


/**
 * 后台通讯
 */
/**
 * @param param : 通讯参数对象
 * @return : Promise对象
 */
export const gangNet = function (param) {
    return new Promise((resolve, reject) => {
        net_request(param, (data) => {
            if (data.error) {
                reject(data);
            } else {
                resolve(data);
            }
        })
    })
};
/**
 * 读取门派基础数据
 */
const read = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang@read"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            if (_data.gang_id == 0) {
                readGangList();
                updata("gang.data", _data);
                return;
            }

            /**
             * 解析门派数据
             */
            gangData = Common.changeArrToJson(data.ok);
            //门派名字
            gangData.gang_name = Common.fromCharCode(gangData.gang_name);
            //门派宣言
            gangData.gang_bulletin = Common.fromCharCode(gangData.gang_bulletin);
            //门派内部公告
            gangData.gang_notice = Common.fromCharCode(gangData.gang_notice);
            //门派商店[已购买的商品]
            gangData.gang_reward_record = gangData.gang_reward_record ? Common.changeArrToJson(gangData.gang_reward_record) : {};

            //门派事件
            if (!gangData.gang_event_record) {
                gangData.gang_event_record = [];
            }
            for (let i = 0, len = gangData.gang_event_record.length; i < len; i++) {
                gangData.gang_event_record[i] = Common.changeArrToJson(gangData.gang_event_record[i]);
                gangData.gang_event_record[i] = gangFun.disposeEvent(gangData.gang_event_record[i]);
            }
            //门主信息
            gangData.leader_info = Common.changeArrToJson(gangData.leader_info);
            //存入前台数据库
            updata("gang.data", gangData);
            callback && callback();
        })
        .catch((data) => {
            // globalSend("screenTipFun", {
            //     words: `${data.why}`
            // });
            console.log(data.why);
        })
};
/**
 * 读取扩展基础数据
 */
const readExpand = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang/expand@read"
    };
    gangNet(arg)
        .then((data: any) => {
            gangExpandData = Common.changeArrToJson(data.ok);
            //存入前台数据库
            gangExpandData.liveness_event_info = Common.changeArrToJson(gangExpandData.liveness_event_info);
            updata("gang.gangExpandData", gangExpandData);
            console.log(gangExpandData);
            callback && callback();
        })
        .catch((data) => {
            // globalSend("screenTipFun", {
            //     words: `${data.why}`
            // });
            console.log(data.why);
        })
};
/**
 * 读取门派boss数据
 */
export const readBoss = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang/expand@read_boss"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            _data.kill_boss_info.forEach((v, i) => {
                _data.kill_boss_info[i] = Common.changeArrToJson(v)
            });
            
            _data.boss_award_info.forEach((arr, i) => {
                if (Array.isArray(arr)) {
                    arr.forEach((v, j) => {
                        if (Array.isArray(v[1])) {
                            v[1] = Common.fromCharCode(v[1])
                        }
                    })
                }
            });
            // console.log(_data.boss_award_info);
            updata("gang.gangBoss", _data);
            callback && callback();
        })
        .catch((data) => {
            // globalSend("screenTipFun", {
            //     words: `${data.why}`
            // });
        })
}
/**
 * 读取门派列表
 */
export const readGangList = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang@read_gang_list"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            gang_list = [];
            //处理工会列表的数据格式
            for (let i = 0, len = _data.gang_list.length; i < len; i++) {
                gang_list[i] = Common.changeArrToJson(_data.gang_list[i]);
                gang_list[i].gang_name = checkTypeof(gang_list[i].gang_name, "array") ? Common.fromCharCode(gang_list[i].gang_name) : gang_list[i].gang_name;
                gang_list[i].gang_bulletin = checkTypeof(gang_list[i].gang_bulletin, "array") ? Common.fromCharCode(gang_list[i].gang_bulletin) : gang_list[i].gang_bulletin;
                gang_list[i].index = i;
                gang_list[i].leader_info = Common.changeArrToJson(gang_list[i].leader_info);
            }
            updata("gang.gang_list", gang_list);
            callback && callback();
        })
        .catch((data) => {
            // globalSend("screenTipFun", {
            //     words: `${data.why}`
            // });
            return;
        })
};
/**
 * 读取玩家所在门派成员
 */
export const readMemberList = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang@read_member_list"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            //副门主数量
            minor_num = _data.count;
            gang_member = [];

            for (let member of _data.gang_member) {
                let id = member[0];
                let obj: any = Common.changeArrToJson(member[1]);
                obj.name = Common.fromCharCode(obj.name);
                obj.gang_name = Common.fromCharCode(obj.gang_name);
                obj.role_id = id;
                gang_member.push(obj);
            }
            updata("gang.data.gang_member", gang_member);
            callback && callback();
        })
        .catch((data) => {
            // globalSend("screenTipFun", {
            //     words: `${data.why}`
            // });
            return;
        })
};
/**
 * 申请加入门派
 */
const applyGang = function (msg) {
    msg = msg.split(",");
    let arg = {
        "param": {
            "gang": msg[0] - 0
        },
        "type": "app/gang@apply_gang"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            if (_data.gang_id > 0) {
                // 加入门派重新读取数据
                readAllData(() => {
                    let w = forelet.getWidget("app_c-gang-main-main");
                    w && close(w);
                    forelet.paint(getData());
                    open("app_c-gang-hall-hall_m")
                })
            } else {
                gang_list[msg[1] - 0].is_apply = 1;
                forelet.paint(getData());
                globalSend("screenTipFun", {
                    words: "申请成功！"
                });
                updata("gang.data.apply_list", _data.apply_list);
            }
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
}
/**
 * 读取申请列表
 */
const readApply = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang@check_apply"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            apply_list = [];
            for (let i = 0, len = _data.apply_list.length; i < len; i++) {
                let id = _data.apply_list[i][0];
                apply_list[i] = Common.changeArrToJson(_data.apply_list[i][1]);
                apply_list[i].gang_name = checkTypeof(apply_list[i].gang_name, "Array") ? Common.fromCharCode(apply_list[i].gang_name) : apply_list[i].gang_name;
                apply_list[i].name = checkTypeof(apply_list[i].name, "Array") ? Common.fromCharCode(apply_list[i].name) : apply_list[i].name;
                apply_list[i].role_id = id;
            };
            updata("gang.data.apply_list", apply_list);
            callback && callback();
        })
        .catch((data) => {
            // if (data.why == "not have gang") {
            //     return;
            // }
            // globalSend("screenTipFun", {
            //     words: `${data.why}`
            // });
            // return;
        })
};
/**
 * 处理申请
 */
const disposeApply = function (msg) {
    msg = msg.split(",");
    let arg = {
        "param": {
            "select": msg[0] - 0,
            "role": msg[1] - 0
        },
        "type": "app/gang@dispose_apply"
    };
    gangNet(arg)
        .then((data: any) => {
            forelet.paint(getData());
            globalSend("attrTip", {
                words: "已成功处理！"
            });
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 创建门派
 * @param name [门派名字]
 * @param txt [门派宣言]
 */
const createGang = function (name) {
    let arg = {
        "param": {
            "name": name
        },
        "type": "app/gang@create"
    };
    gangNet(arg)
        .then((data: any) => {
            let cost = guild_base.create_spend;
            //更新前台玩家元宝
            updata("player.diamond", getDB("player.diamond") - cost);
            //关闭界面
            gangFun.closeW("app_c-gang-create-create");
            gangFun.closeW("app_c-gang-main-main");
            readAllData(() => {
                forelet.paint(getData());
                open("app_c-gang-hall-hall_m");
            });
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 更改门派名称
 */
const changeGangName = function (name) {
    let arg = {
        "param": {
            "name": name
        },
        "type": "app/gang@change_gang_name"
    };
    gangNet(arg)
        .then((data: any) => {
            let cost = guild_base.rename;
            let _data = Common.changeArrToJson(data.ok);
            updata("player.diamond", getDB("player.diamond") - cost);
            gangData.gang_name = name;
            updata("gang.data.gang_name", gangData.gang_name);
            gangFun.closeW("app_c-gang-change_name-change_name");
            forelet.paint(getData());
            globalSend("attrTip", {
                words: `门派名字修改成功`
            })
        })
        .catch((data: any) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 任命职位
 */
const appoint = function (msg) {
    let arg = {
        "param": {
            "id": gang_member[role_index].role_id,
            "index": msg
        },
        "type": "app/gang@appoint"
    };
    gangNet(arg)
        .then((data) => {
            gangFun.closeW("app_c-gang-post-post");
            gangFun.closeW("app_c-gang-role-role_m");
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 修改公告
 */
const sureNoticeClick = function (txt) {
    let arg = {
        "param": {
            "notice": txt
        },
        "type": "app/gang@change_gang_notice"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            gangData.gang_notice = txt;
            updata("gang.data.gang_notice", gangData.gang_notice);
            gangFun.closeW("app_c-gang-gang_msg-gang_msg");
            forelet.paint(getData());
            globalSend("attrTip", {
                words: "修改公告成功!"
            });
        })
        .catch((data: any) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 修改宣言
 */
const sureMsgClick = function (txt) {
    let arg = {
        "param": {
            "desc": txt
        },
        "type": "app/gang@chang_gang_desc"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            gangFun.closeW("app_c-gang-gang_msg-gang_msg");
            //更新数据
            gangData.gang_bulletin = txt;
            updata("gang.data.gang_bulletin", gangData.gang_bulletin);
            forelet.paint(getData());
            globalSend("screenTipFun", {
                words: "修改宣言成功!"
            });
        })
        .catch((data: any) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 退出门派
 */
const exitGnag = function () {
    let arg = {
        "param": {},
        "type": "app/gang@exit"
    };
    gangNet(arg)
        .then((data) => {
            gangData = null;
            updata("gang.data", null);
            gangFun.closeW("app_c-gang-hall-hall_m");
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 解散门派
 */
const dismissGang = function () {
    let arg = {
        "param": {},
        "type": "app/gang@dismiss_gang"
    };
    gangNet(arg)
        .then((data) => {
            gangFun.closeW("app_c-gang-tips_tpl-disband");
            gangFun.notifyPlayer();
            globalSend("attrTip", {
                words: "门派解散成功！"
            });
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
        })
};
/**
 * 踢出门派
 */
const sureKickMember = function () {
    let id = gang_member[role_index].role_id;
    let arg = {
        "param": {
            "role": id
        },
        "type": "app/gang@kick_member"
    };
    gangNet(arg)
        .then((data) => {
            let w = forelet.getWidget("app_c-gang-tips_tpl-kickmember");
            w && close(w);
            globalSend("attrTip", {
                words: `该玩家已踢出门派`
            });
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
        })
};
/**
 * 打开一键加入功能
 */
const openAutoJoin = function () {
    let arg = {
        "param": {},
        "type": "app/gang/expand@change_gang_open"
    };
    gangNet(arg)
        .then((data: any) => {
            let obj: any = Common.changeArrToJson(data.ok);
            updata("gang.gangExpandData.is_auto", obj.is_auto);
            forelet.paint(getData());
            globalSend("attrTip", {
                words: `自动通过已${obj.is_auto == "true" ? '开启' : '关闭'}`
            })
        })
        .catch((data) => {
            console.log("开启失败")
        })
};
/**
 * 一键加入
 */
const quickJoin = function () {
    let arg = {
        "param": {},
        "type": "app/gang/expand@quick_entry"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            if (_data.gang_id == 0) {
                globalSend("screenTipFun", {
                    words: `暂无合适门派`
                });
                return;
            }
            //读取门派数据
            readAllData(() => {
                let w = forelet.getWidget("app_c-gang-main-main");
                w && close(w);
                forelet.paint(getData());
                open("app_c-gang-hall-hall_m")
            })
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: data.why
            })
        })
}

/**
 * 后台推送消息
 */
// //门派宣言更改通知
// net_message("modify_desc", (msg) => {
//     gangData.gang_bulletin = msg.desc;
//     updata("gang.data.gang_bulletin", gangData.gang_bulletin);
//     note(msg);
// });
//门派内部公告更改通知
net_message("modify_notice", (msg) => {
    gangData.gang_notice = msg.notice;
    updata("gang.data.gang_notice", gangData.gang_notice);
    note(msg);
});
//门派名字更改通知
net_message("modify_name", (msg) => {
    gangData.gang_name = msg.gang_name;
    updata("gang.data.gang_name", gangData.gang_name);
    note(msg);
});
//门派解散通知
net_message("modify_dismiss", (msg) => {
    if (msg.gang_id == gangData.gang_id) {
        if (gangData.post != 1) {
            globalSend("popTip", {
                title: "很抱歉, 你所在的门派已解散...",
                btn_name: ["确认", "取消"],
                cb: [function () {
                    gangFun.notifyPlayer();
                }, ""]
            });
        } else if (gangData.post == 1) {
            gangFun.notifyPlayer();
        }
        note(msg);
    }
});
//门派申请通知
net_message("gang_apply", (msg) => {
    readApply(() => {
        forelet.paint(getData());
    });
    note(msg);
});
//新增门派成员
net_message("gang_add", (msg) => {
    gangFun.disposeMember(msg.id);
    note(msg);
});
// 退出工会通知
net_message("gang_exit", (msg) => {
    gangData.gang_count--;
    updata("gang.data.gang_count", gangData.gang_count);
    let player = getDB("player");
    if (player.role_id !== msg.id) {
        //readMemberList();
        //此处直接前台操作, 减少后台通讯
        gang_member = gang_member.filter((x) => {
            return msg.id != x.role_id;
        });
    }
    note(msg);
});
//清空申请列表
net_message("modify_clear", (msg) => {
    gangFun.disposeClear();
    note(msg);
});
//踢出工会通知
net_message("gang_kick", (msg) => {
    gangFun.disposeKick(msg);
    note(msg);
});
//任命职位通知
net_message("gang_appoint", (msg) => {
    gangData.leader_info = Common.changeArrToJson(msg.leader_info);
    readMemberList(() => {
        forelet.paint(getData());
    });
    let player = getDB("player");
    updata("gang.data.leader_info", gangData.leader_info)
    if (player.role_id == gangData.leader_info.role_id) {
        updata("gang.data.post", 1)
    } else if (msg.post == 1) {
        updata("gang.data.post", 3)
    } else {
        updata("gang.data.post", msg.post)
    }
    note(msg);
});
//门派等级提升通知
net_message("gang_level", (msg) => {
    gangData.gang_exp = msg.exp;
    updata("gang.data.gang_exp", gangData.gang_exp);
    if (msg.level > gangData.gang_level) {
        globalSend("screenTipFun", {
            words: "门派等级：+" + 1
        });
        gangData.gang_level = msg.level;
        updata("gang.data.gang_level", gangData.gang_level);
    }
    note(msg);
});
//门派技能通知
net_message("gang_skill", (msg) => {
    let gang_total_liveness = getDB("gang.data.gang_total_liveness");
    updata("gang.data.gang_total_liveness", gang_total_liveness - msg.skill_cost);
    updata("gang.data.gang_skill." + msg.skill_type, msg.skill_level);
    note(msg);
});
//门派事件
net_message("gang_event_add", (msg) => {
    note(msg);
})

//后台推送消息, 门派内部发生的事件
const note = function (msg) {
    //因为新成员进来后, 与后台的通讯获取 gangData 还没有完成, 此时为 undefined 
    if (gangData == undefined) return;
    gangData.gang_event_record.unshift(gangFun.disposeEvent(msg));
    updata("gang.data.gang_event_record", gangData.gang_event_record);
    forelet.paint(getData());
};

// /**
//  * 读取数据 立即执行
//  */
// read();
// readExpand();

/**
 * 统一读取数据
 */
const readAllData = function (callback?) {
    //读取门派数据
    let count = 0;
    let fun = function () {
        count++;
        if (count == 5) {
            count = null;
            fun = null;
            callback && callback();
        }
    }

    read(() => {
        fun();
    });
    //读取扩展功能数据
    readExpand(() => {
        fun();
    });
    //读取boss数据
    readBoss(() => {
        fun();
    });
    //读取门派成员列表
    readMemberList(() => {
        fun();
    });
    //读取申请列表
    readApply(() => {
        fun();
    });
};

readAllData(() => {
    gangTipFun();
});

export const gangTipFun = function () {
    let entry_time = getDB("gang.gangExpandData.entry_time") || 0;
    if (entry_time > 0) {
        let boss_info = getDB("gang.gangBoss.boss_info"); 
        let role_boss_award = getDB("gang.gangBoss.role_boss_award");
        let kill_boss_info = getDB("gang.gangBoss.kill_boss_info");
        let tip = {};
        for (let i = 0, len = boss_info.length; i < len; i++) {
            if (role_boss_award[i] == 1) {
                tip[i] = 0;
                continue;
            }
            if (boss_info[i][2] <= 0 && entry_time < kill_boss_info[i].kill_boss_time) {
                tip[i] = 1; //可以领取
            } else {
                tip[i] = 0; //不能领取
            }
        }
        updata("gang.tip", tip);
    }
}

