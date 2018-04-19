import { gangNet } from "../gang";
import { guild_upgrade } from "cfg/c/guild_upgrade"; //公会等级相关
import { guild_shop } from "cfg/c/guild_shop"; //公会商店
import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { forelet, getData } from "../gang";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";
import { guild_skill } from "cfg/c/guild_skill";

let index;

export let globalReceive = {
    "openGangSkill": () => {
        index = 0;
        open("app_c-gang-gang_skill-gang_skill");
    }
};

export class GangSkill extends Widget {
    //切换
    changeTab(id) {
        if (index == id) {
            return;
        }
        index = id;
        updata("gang.other.index", id);
        forelet.paint(getData());
    }
    //学习
    studySkill() {
        studySkill(index)
    }
    //关闭
    goback() {
        let w: any = forelet.getWidget("app_c-gang-gang_skill-gang_skill");
        close(w);
        w = undefined;
    }
}

/**
 * 判断能否学习
 */
// const canStudySkill = function () {
//     let skill_level = getDB(`gang.gangExpandData.role_gang_skill.${index - 1}`)
//     let cost = guild_skill[index][]
// }

/**
 * 学习技能
 */
export const studySkill = function (skill_id) {
    let arg = {
        "param": {
            "skill_id": skill_id
        },
        "type": "app/gang/expand@study_skill"
    };
    gangNet(arg)
        .then((data:any) => {
            let _data: any = Common.changeArrToJson(data.ok);
            //扣除花费
            let cost = Common.changeArrToJson(_data.cost);
            updata("player.diamond", getDB("player.diamond") - cost["diamond"]);
            let own_contribute = getDB("gang.gangExpandData.own_contribute") - (cost["diamond"] || 0);
            updata("gang.gangExpandData.own_contribute", own_contribute);
            updata(`gang.gangExpandData.role_gang_skill.${skill_id - 1}`, _data.gang_skill[skill_id - 1]);
            forelet.paint(getData());
            console.log(_data);
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `学习技能失败`
            });
            console.log(data);
        })
}