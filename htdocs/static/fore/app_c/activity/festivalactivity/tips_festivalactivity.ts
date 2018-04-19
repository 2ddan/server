import { Pi, cfg } from "app/mod/pi";
import { get } from "app/mod/db";
import { act_progress } from "app_b/mod/act_progress";
import { Common_m } from "app_b/mod/common";
import { fa_base } from "cfg/c/fa_base";
import { fa_acttype } from "cfg/c/fa_acttype";
import { fa_actlist } from "cfg/c/fa_actlist";

let list: any = [];


//index为轮数，从1开始
const getActByIndex = function (index) {
    let table = [];
    for (let k in fa_acttype) {
        if (fa_acttype[k].act_index == index - 0) {
            table.push(fa_actlist[k]);
        }
    }
    return table;
}

export const tipsFestival = function (todayAct) {
    todayAct.forEach((v, i) => {
        let table = getActByIndex(i + 1);
        for (let j = 0, len = table.length; j < len; j++) {
            let arr = table[j];
            if (arr[0].listen_path == "" || arr[0].listen_path == "bag") {
                continue;
            }
            let dep = ["player.level", "festActRead"];
            dep.push(arr[0].listen_path);
            dep.indexOf(arr[arr.length - 1].listen_path) >= 0 ? dep.push(arr[arr.length - 1].listen_path) : null;
            let tip_fes = {
                depend: dep,
                fun: [
                    [
                        ["==", function () {
                            return get("player.level") >= fa_base["level_limit"] ? 1 : 0;
                        }, 1],
                        ["==", function () {
                            for (let obj of arr) {
                                // if (get(`festActRead.${obj.id}`)) {
                                //     continue;
                                // }
                                let act_type = fa_acttype[obj.act_id];
                                let progress = act_progress[obj.award_rule](obj["data_type"], Common_m.getDatesTo(act_type.close_date, act_type.time_type), Common_m.getDatesTo(act_type.open_date, act_type.time_type), obj.award_condition, get("festActRead." + obj.id));
                                if (progress[0] && get("festActRead." + obj.id) < obj["init_count"]) {
                                    return 1;
                                }
                            }
                            return 0;
                        }, 1]
                    ]
                ],
                tipKey: "fest." + (i + 1) + "." + j,
                tipDetail: { "sid": 60144 }
            }
            list.push(tip_fes);
        }
    });
}

export const getTipsList = () => {
    return list;
};