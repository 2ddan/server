import { gangNet } from "../gang";
import { guild_upgrade } from "cfg/c/guild_upgrade"; //门派等级相关
import { guild_shop } from "cfg/c/guild_shop"; //门派商店
import { updata, get as getDB } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { forelet, getData } from "../gang";
import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";
import { guild_skill } from "cfg/c/guild_skill";
import { attribute_config } from "cfg/c/attribute_config";

let skill_id = 1;

export let globalReceive = {
    "openGangSkill": () => {
        skill_id = defaultSelect();
        updata("gang.other.skill_id", skill_id);
        forelet.paint(getData());
        open("app_c-gang-gang_skill-gang_skill");
    }
};

export class GangSkill extends Widget {
    //切换
    changeTab(id) {
        if (skill_id == id) {
            return;
        }
        skill_id = id;
        updata("gang.other.skill_id", id);
        forelet.paint(getData());
    }
    //学习
    studySkill() {
        canStudySkill()
    }
    //关闭
    goback() {
        let w: any = forelet.getWidget("app_c-gang-gang_skill-gang_skill");
        close(w);
        w = undefined;
    }
}
/**
 * 默认选则 [当没有可选择技能时选中第一个技能, 当有可学习技能时选择可学习的第一个]
 */
const defaultSelect = function () {
    let money = getDB("player.money");
    let gang_contribute = getDB("gang.gangExpandData.gang_contribute");
    let build = getDB("gang.gangExpandData.build_level_info");
    let role_gang_skill = getDB("gang.data.role_gang_skill");

    for (let i = 0, len = role_gang_skill.length; i < len; i++) {
        let skill = guild_skill[i + 1][role_gang_skill[i]];
        if (build[0] >= skill.limit.guild_level && money >= skill.cost.cost_money && gang_contribute >= skill.cost.cost_contribute) {
            return i + 1;
        }
    }
    return 1;
}


/**
 * 判断能否学习
 */
const canStudySkill = function () {
    let skill_level = getDB(`gang.data.role_gang_skill.${skill_id - 1}`);
    let skill = guild_skill[skill_id][skill_level];
    if (getDB("gang.gangExpandData.build_level_info")[0] < skill.limit.guild_level) {
        globalSend("screenTipFun", {
            words: `请先升级藏经阁`
        });
        return;
    }
    if (getDB("gang.gangExpandData.gang_contribute") < skill.cost.cost_contribute) {
        globalSend("screenTipFun", {
            words: `贡献不足`
        });
        return;
    }
    if (getDB("player.money") < skill.cost.cost_money) {
        globalSend("screenTipFun", {
            words: `金币不足`
        });
        return;
    }
    studySkill(skill_id);
}

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
            let cost = Common_m.deductfrom(_data);
            let gang_contribute = getDB("gang.gangExpandData.gang_contribute") - (cost["gang_contribute"] || 0);
            updata("gang.gangExpandData.gang_contribute", gang_contribute);
            let level = _data.gang_skill[skill_id - 1];
            updata(`gang.data.role_gang_skill.${skill_id - 1}`,level);
            forelet.paint(getData());

            //增加属性
            let pre_attr = guild_skill[skill_id][level - 1].attr
            let now_attr = guild_skill[skill_id][level].attr;
            globalSend("attrTip", {
                words: `${attribute_config[now_attr[0]]} +${Common_m.decimalToPercent(now_attr[1] - pre_attr[1])}`
            });
            console.log(_data);
        })
        .catch((data) => {
            globalSend("screenTipFun", {
                words: `${data.why}`
            });
            return;
            console.log(data);
        })
}