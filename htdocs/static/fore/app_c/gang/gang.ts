/**
 * 模块
 */
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request, net_message } from "app_a/connect/main";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { insert, updata, get as getDB, checkTypeof } from "app/mod/db";
import { funIsOpen } from "app_b/open_fun/open_fun";
import { globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { open, close } from "app/mod/root";
/**
 * 配置表
 */
import { msg as msgCfg } from "cfg/c/msg";
import { guild_base } from "cfg/c/guild_base"; //基础数据
import { guild_upgrade } from "cfg/c/guild_upgrade"; //公会等级相关
import { guild_shop } from "cfg/c/guild_shop"; //公会商店

/**
 * 创建 forelet 并导出
 */
export const forelet = new Forelet();

/**
 * 前台数据库插入字段
 */
insert("gang", {
    //原基础数据
    "data": {
        //"gangBoxAwardDetil": [],
        //"gang_name": null, //公会名称
        //"apply_list": [], //申请列表
        //"gangSkillAttr": {}
    },
    // "instance": {
    // //     "opened": 0,
    // // },
    // "leave_time": 0
    //扩展基础数据
    "gangExpandData": {

    },
    //其它数据
    "other": {
        "skill_tab": 0 //选择技能
    }
});

/**
 * 定义变量
 */
let gangData = null, //用于存储从后台读取的公会数据
    gangExpandData = null, //公会扩展功能数据
    gang_list = [], //用于储存工会列表
    gang_tab = "info",  //用于工会信息界面的tab切换
    apply_list = [], //申请列表
    minor_num = 0, //副门主数量
    gang_member = [], //公会成员
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
    //配置表
    data.guild_base = guild_base;
    data.guild_upgrade = guild_upgrade;

    data.gangData = getDB("gang.data"); //公会数据
    data.gangExpandData = getDB("gang.gangExpandData"); //公会扩展功能数据
    data.gang_tab = gang_tab; //公会tab切换
    data.gang_list = gang_list; //公会列表
    data.gang_member = gang_member; //公会成员
    data.minor_num = minor_num; //副门主数量
    data.apply_list = apply_list; //申请列表
    data.find_list = find_list; //查找公会列表
    data.role_index = role_index; //公会成员index

    data.other = getDB("gang.other");
    return data;
}


/**
 * 功能入口
 */
export const globalReceive = {
    //进入门派功能
    gotoGang: () => {
        if (funIsOpen("gang")) {
            goIntoGang();
            globalSend("openNewFun", "gang");
        }
    }
}

const goIntoGang = function () {
    //tab 页
    gang_tab = "info";
    forelet.paint(getData());
    //玩家是否已经在公会了
    if (gangData) {
        open("app_c-gang-hall-hall_m");
    } else {
        //如果没有则打开申请门派页面
        open("app_c-gang-main-main");
    }
};

/**
 * 前台操作 [widget]
 */
export class Gang extends Widget {
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
        forelet.paint(getData())
    }
    goback(arg) {
        let w: any = forelet.getWidget("app_c-gang-hall-hall_m");
        close(w);
        w = undefined;
    }
    //关闭浮窗
    closeCover(arg) {
        close(arg.widget);
    }
    //详情帮助
    getHelp(arg) {
        globalSend("showHelp", arg);
    };
    //打开创建公会界面
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
            gangFun.lackDiamond();
            return;
        }
        let name = input_text.gang_name;//5
        let text = input_text.gang_enounce;//16
        if (!name || !text) {
            globalSend("screenTipFun", {
                words: "门派名字和宣言不能为空"
            });
            return;
        }
        if (gangFun.bytesNum(name) > 10) {
            globalSend("screenTipFun", {
                words: "门派名字不能超过5个字"
            });
            return;
        }
        if (gangFun.bytesNum(text) > 32) {
            globalSend("screenTipFun", {
                words: "门派宣言不能超过16个字"
            });
            return;
        }
        createGang(name, text);
    }
    //打开搜索界面
    gotoFindClick() {
        //重置数据
        find_list = [];
        input_text.gang_name = '';
        //调用获取门派列表的函数
        readGangList(() => {
            forelet.paint(getData());
            open("app_c-gang-find_m-find_m");
        });

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
    //退出公会
    exitClick() {
        globalSend("popTip", {
            btn_name: ["确定", "取消"],
            title: "是否退出，和本门派恩断义绝！",
            cb: [function () {
                exitGnag();
            }, ""]
        });
    }
    //解散公会
    DisbandClick() {
        open("app_c-gang-tips_tpl-disband");
    }
    //确定解散
    DismissGang() {
        dismissGang();
    }
    //将成员踢出公会
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
    //打开每日俸禄
    openDailySalary() {
        globalSend("openDailySalary");
    }
    //打开公会商店
    openGangShop() {
        globalSend("openGangShop");
    }
    //打开学习技能
    openGangSkill() {
        globalSend("openGangSkill");
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
    //修改公会名称
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
        _data.gang_name = checkTypeof(_data.gang_name, "Array") ? Common.fromCharCode(_data.gang_name) : _data.gang_name;
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
        gangFun.closeW("app_c-gang-hall-hall_m");
        gangFun.closeW("app_c-gang-shop-shop_m");
        gangFun.closeW("app_c-gang-instance-main-chapter");
        gangFun.closeW("app_c-gang-role-role_m");
        gangFun.closeW("app_c-gang-gang_list-gang_list");
    },
    //门主或者副门主处理申请后, 后台推送消息, 重新读取公会成员
    disposeMember: function (sid) {
        //删除改天申请
        apply_list = apply_list.filter(function (x) { return sid != x.role_id });
        //新加入的玩家
        if (sid == getDB("player").role_id) {
            //读取公会基本数据
            read(() => {
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
            //老成员 [更新公会成员数量]
            gangData.gang_count++;
            updata("gang.data.gang_count", gangData.gang_count);
            readMemberList(() => {
                forelet.paint(getData());
            })
        }
    },
    //退出公会
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
                }, ""]
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
        updata("gang.data", {});
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
 * 读取公会基础数据
 */
const read = function (callback?) {
    let arg = {
        "param": {},
        "type": "app/gang@read"
    };
    gangNet(arg)
        .then((data: any) => {
            let _data:any = Common.changeArrToJson(data.ok);
            if (_data.gang_id == 0) {
                readGangList();
                updata("gang.data.apply_list", _data.apply_list);
                return;
            }
            readExpand();
            //读取公会成员列表
            readMemberList();
            //读取申请列表
            readApply();
            /**
             * 解析公会数据
             */
            gangData = Common.changeArrToJson(data.ok);
            //门派名字
            gangData.gang_name = Common.fromCharCode(gangData.gang_name);
            //门派宣言
            gangData.gang_bulletin = Common.fromCharCode(gangData.gang_bulletin);
            //门派内部公告
            gangData.gang_notice = Common.fromCharCode(gangData.gang_notice);
            //??????
            gangData.gang_reward_record = gangData.gang_reward_record ? Common.changeArrToJson(gangData.gang_reward_record) : {};
            //门派商店
            gangData.gang_shop_record = gangData.gang_shop_record ? Common.changeArrToJson(gangData.gang_shop_record) : {};
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
            globalSend('screenTip', {
                words: '公会数据读取失败'
            })
            return;
        })
};
/**
 * 读取扩展基础数据
 */
const readExpand = function () {
    let arg = {
        "param": {},
        "type": "app/gang/expand@read"
    };
    gangNet(arg)
        .then((data: any) => {
            gangExpandData = Common.changeArrToJson(data.ok);
            //存入前台数据库
            updata("gang.gangExpandData", gangExpandData);
            console.log(gangExpandData);
        })
        .catch((data) => {
            console.log(data);
            globalSend("screenTip", {
                words: `读取公会扩展数据失败`
            })
        })
};
/**
 * 读取公会列表
 */
const readGangList = function (callback?) {
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
            callback && callback();
        })
        .catch((data) => {
            globalSend('screenTip', {
                words: '读取公会列表失败'
            })
            return;
        })
};
/**
 * 读取玩家所在公会成员
 */
const readMemberList = function (callback?) {
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
                //let id = _data.gang_member[i][0];
                //gang_member[i] = Common.changeArrToJson(_data.gang_member[i][1]);
                // gang_member[i].gang_name = checkTypeof(gang_member[i].gang_name, "Array") ? Common.fromCharCode(gang_member[i].gang_name) : gang_member[i].gang_name;
                // gang_member[i].name = checkTypeof(gang_member[i].name, "Array") ? Common.fromCharCode(gang_member[i].name) : gang_member[i].name;
                // gang_member[i].role_id = id;
            }
            callback && callback();
        })
        .catch((data) => {
            globalSend('screenTip', {
                words: '读取玩家所在公会成员失败'
            })
            return;
        })
};
/**
 * 申请加入公会
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
            gang_list[msg[1] - 0].is_apply = 1;
            forelet.paint(getData());
            globalSend("screenTipFun", {
                words: "申请成功！"
            });
            updata("gang.data.apply_list", _data.apply_list);
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: "离开门派一小时后才能申请加入"
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
        })
        .catch((data) => {
            globalSend('screenTip', {
                words: '读取申请列表失败'
            })
            return;
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
            let _data = Common.changeArrToJson(data.ok);
            //将该套申请删除
            apply_list.splice(msg[2], 1);
            updata("gang.data.apply_list", apply_list);
            forelet.paint(getData());
            globalSend("attrTip", {
                words: "已成功处理！"
            });
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: "处理申请失败"
            });
            return;
        })
};
/**
 * 创建公会
 * @param name [公会名字]
 * @param txt [公会宣言]
 */
const createGang = function (name, txt) {
    let arg = {
        "param": {
            "name": name,
            "desc": txt
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
            //读取公会数据
            read(() => {
                forelet.paint(getData());
                open("app_c-gang-hall-hall_m");
            });
        })
        .catch((data) => {
            if (data.why == "forbid substr") {
                globalSend("screenTipFun", {
                    words: "含有非法字符或敏感字符"
                });
            } else {
                globalSend("screenTipFun", {
                    words: "离开门派一小时后才能创建门派"
                });
            }
            return;
        })
};
/**
 * 更改公会名称
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
        })
        .catch((data: any) => {
            if (data.why == "forbid substr") {
                globalSend("screenTipFun", {
                    words: "含有非法字符或敏感字符"
                });
            } else {
                globalSend("screenTipFun", {
                    words: "更改公会名称失败"
                });
            }
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
            globalSend("screenTip", {
                words: `任命失败`
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
            if (data.why == "forbid substr") {
                globalSend("screenTipFun", {
                    words: "含有非法字符或者敏感字符"
                });
            } else {
                globalSend("screenTipFun", {
                    words: "修改公告失败"
                });
            }
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
            if (data.why == "forbid substr") {
                globalSend("screenTipFun", {
                    words: "含有非法字符或敏感字符"
                });
            } else {
                globalSend("screenTipFun", {
                    words: "修改宣言失败"
                });
            }
            return;
        })
};
/**
 * 退出公会
 */
const exitGnag = function () {
    let arg = {
        "param": {},
        "type": "app/gang@dismiss_gang"
    };
    gangNet(arg)
        .then((data) => {
            gangData = null;
            updata("gang.data", null);
            gangFun.closeW("app_c-gang-hall-hall_m");
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: "退出公会失败"
            });
            console.log(data);
            return;
        })
};
/**
 * 解散公会
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
            console.log(data);
            globalSend("attrTip", {
                words: `公会解散失败`
            });
            return;
        })
};
/**
 * 踢出公会
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
            globalSend("attrTip", {
                words: `该玩家已踢出公会`
            });
        })
        .catch((data) => {
            console.log(data);
            globalSend("attrTip", {
                words: `踢出公会失败`
            });
        })
}



/**
 * 学习技能
 */




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
    readApply();
    note(msg);
});
//新增公会成员
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





//后台推送消息, 门派内部发生的事件
const note = function (msg) {
    //因为新成员进来后, 与后台的通讯获取 gangData 还没有完成, 此时为 undefined 
    if (gangData == undefined) return;
    if (msg.text_id) {
        gangData.gang_event_record.unshift(gangFun.disposeEvent(msg));
        forelet.paint(getData());
    }
};

/**
 * 读取数据 立即执行
 */
read();
readExpand();



// gang_build //门派升级

// gang_pray //祭天

// gang_donate //门派捐献

// gang_liveness //日常活动

// gang_person_num_refresh //门派boss成员人数更新

// gang_boss_award //打boss开箱子

// liveness_event_info //活跃度事件推送

// gang_collect //采集

// gang_boss_refresh //boss刷新 [每周]

// gang_event_add //公会事件