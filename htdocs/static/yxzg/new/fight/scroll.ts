/**
 * 卷轴使用
 */
 // ================================ 导入
//mod
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { Common } from "app/mod/common";
import { Util } from "app/mod/util";
import { data as localDB, updata, insert } from "app/mod/db";
import { DBback } from "app/mod/db_back";
//fight
import { Fighter, Buff, Scroll } from "./class";
import { Util as FUtil } from "./util";
import { FScene, FSmgr } from "./scene";
import { EType } from "./analyze";
import { Policy } from "./policy";
import { globalSend } from "../app/mod/pi";
import {request} from "app_a/connect/con_mgr";


 // ================================ 导出
export class ScrollControl{
    /**
     * @description 卷轴丢弃
     * @param index 卷轴在背包中索引
     */
    static dropScroll(index: number): boolean{
        let p = localDB.player;
        p.scrolls.splice(index, 1);
        updata("player.scrolls", p.scrolls);
        return true;
    }

    /**
     * @description 卷轴放入英雄背包
     * @param sid
     */
    static equipScroll(sid: number) {
        let p = localDB.player;
        let param = {
            type: "app/fight/shop@buy_scroll",
            param: {
                scroll_id: sid
            }
        }
        request(param,(res) => {
            if(res.error){
                globalSend("msgScreenTips",{text:"购买卷轴请求错误"})
            }
            if(res.ok){
                p.scrolls = res.ok[1][1];
                updata("player.scrolls", p.scrolls);
                return "";
            }
        })
        return false;
    }

    /**
     * 使用卷轴的战斗逻辑
     * @param fid fighter Id
     * @param sid 卷轴在scroll_on中的索引
     * @param scene 场景
     * @param target 卷轴使用目标
     */
    static useScroll(fid: number, sid: number, scene: FScene, target?: number): string {
        const fighter = scene.fighters.get(fid);
        const scroll = fighter.scrolls_on[sid];
        // 判断是否满足使用条件
        if (!Formula.cacl(scroll.condition_use, FUtil.getArgArr(fighter, null, scroll, scene))) {
            return "Not meeting the conditions of use!";
        }
        let targets = [];
        if (!target) {
            targets = Policy.seletTargets(fighter, scroll, undefined, scene);
        } else {
            targets = targets.concat(target);
        }
        scene.addEvents([EType.useScroll,scene.cur_fighter,sid,target||0]);
        targets.forEach(tid => {
            Policy.fireBuff(fighter, scene.fighters.get(tid), 26, scene);
        });
        Policy.addBuffs(fighter, targets, scroll, 1, scene);
        targets.forEach(tid => {
            Policy.fireBuff(fighter, scene.fighters.get(tid), 32, scene);
        })
        fighter.scroll_use++;
        // 使用后删除fighter上的卷轴
        fighter.scrolls_on[sid] = undefined;
        fighter.scrolls[sid] = undefined;
        return "";
    }
}

 // ================================ 本地
