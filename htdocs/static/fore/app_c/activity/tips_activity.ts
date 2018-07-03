
import { get } from "app/mod/db";
import { act_progress } from "app_b/mod/act_progress";
import { Common_m } from "app_b/mod/common";
//累计登录
import { activity as activity_normal } from "cfg/c/activity_normal";

//.*
//* 提示配置表
//* depend 依赖的数据库监听路径,如果该监听路径下的数据发生变化,则调用fun里面的提示生成条件,如果条件成立则生成提示,否则删除
//* fun [
//*		第一维判断条件为或关系,只要有一个条件成立,就成立
//*		[
//*			第二维判断条件为与关系,所有条件成立,才成立
//*			fun : app.tipFunc中配置的运算方法(如:>,>=,<,<=,...详细见app.tipFunc),如果没有匹配到则在app.tips中匹配相应方法
//*				如果以上两处都没有且fun的类型为function,则原样返回,否则返回function(){return false;};
//*			[fun,param1,param2,param3,....],
//*			[]
//*		],
//*		[]
//* ]
//*

let list: any = [];


/**
 * 常规活动  活动id 0 ~ 100 && 1000 ~ 10000
 * @param today_act 今日开放的所有活动
 */

export const initActTipsList = (today_act) => {
    for (let i = 0, len = today_act.length; i < len; i++) {
        let act = today_act[i];
        /**
         * 登录送礼
         */
        if (act.img == "menu_loginAward_icon") {
            let login = {
                depend: ["data_record.login", "activities.today_activity", "activities.activity_read"],
                fun:
                [
                    [
                        ["==", function () {
                            let info = activity_normal[act.id];
                            let act_read = get("activities.activity_read");
                            for (let j in info.condition) {
                                let condition = info.condition[j];
                                for (let k = 0, len = info.prop.length; k < len; k++) {
                                    let progress = act_progress[j](info.data_type, Common_m.getDatesTo(act.close_date, act.time_type), Common_m.getDatesTo(act.open_date, act.time_type), condition[k], act_read[act.id][k]);
                                    if (progress[0] && act_read[act.id][k] < info["init_count"][k]) {
                                        return 1;
                                    }
                                    if (k == info.prop.length - 1) {
                                        return 0;
                                    }
                                }
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: "activities." + act.id,
                tipDetail: { "sid": act.care[0] }
            }
            list.push(login);
        }
        /**
         * 累冲
         */
        else if (act.img == "menu_newCharge_icon") {
            let total = {
                depend: ["data_record.recharge", "activities.today_activity", "activities.activity_read"],
                fun:
                [
                    [
                        ["==", function () {
                            let info = activity_normal[act.id];
                            let act_read = get("activities.activity_read");
                            for (let j in info.condition) {
                                let condition = info.condition[j];
                                for (let k = 0, len = info.prop.length; k < len; k++) {
                                    let progress = act_progress[j](info.data_type, Common_m.getDatesTo(act.close_date, act.time_type), Common_m.getDatesTo(act.open_date, act.time_type), condition[k], act_read[act.id][k]);
                                    if (progress[0] && act_read[act.id][k] < info["init_count"][k]) {
                                        return 1;
                                    }
                                    if (k == info.prop.length - 1) {
                                        return 0;
                                    }
                                }
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: "activities." + act.id,
                tipDetail: { "sid": act.care[0] }
            }
            list.push(total);
        }
        /**
        * 微信分享
        */
        // else if (act.img == "card_icon") {
        //     list.push({
        //         depend: ["player.wx_share", "player.wx_share_award"],
        //         fun:
        //         [
        //             [
        //                 [">", { dkey: "player.wx_share" }, { dkey: "player.wx_share_award" }]
        //             ]
        //         ],
        //         tipKey: "activities.109",
        //         tipDetail: { "sid": 60132 }
        //     })
        // }
        /**
         * 微信绑定
         */
        // else if (act.img == "card_icon") {
        //     list.push({
        //         depend: ["player.wx_award", "player.wx_bind"],
        //         fun:
        //         [
        //             [
        //                 [">", { dkey: "player.wx_bind" }, { dkey: "player.wx_award" }]
        //             ]
        //         ],
        //         tipKey: "activities.105",
        //         tipDetail: { "sid": 60133 }
        //     })
        // }
    }
}

export const getActTipsList = () => {
    return list;
};