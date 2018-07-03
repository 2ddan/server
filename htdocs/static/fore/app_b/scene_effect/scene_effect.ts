
import { Forelet } from "pi/widget/forelet"
import { handScene } from "app_b/fight_ol/handscene";
import { open, close, } from "app/mod/root"
import { openUiEffect } from "app/scene/anim/scene" 
import { getSelf } from "app_b/fight/fight";
import { get, listen } from "app/mod/db";
import { Music } from "app/mod/music";

export let forelet = new Forelet();

export const globalReceive = {
    //传送
    "translate": function (arg) {
        translateEffect(arg.fighter, arg.type, arg.cb, arg.time);
    }
}


//升级特效
let oldLevel = get("player.level");
const levelUpEffect = function () {
    let self = handScene.getSelf() || getSelf();
    if (self) {
        let data = {
            "effect":"eff_ui_huobanshengji",
            "isOnce": true,
            "index": 0,
            "z": 0,
            "x": 0,
            "y": 0,
            "scale": 1,
            "parent":self
        }
        open("app_b-scene_effect-level_up");
        openUiEffect(data,null);
        let timer = setTimeout(() => {
            let w: any = forelet.getWidget("app_b-scene_effect-level_up") || {};
            w.name = "app_b-scene_effect-level_up";
            close(w);
            timer = null;
        }, 1000)
    }
};

listen("player.level", () => {
    let level = get("player.level");
    if (oldLevel == 0) {
        oldLevel = level;
    } else if (level > oldLevel) {
        oldLevel = level;
        Music.skillSound('role_level_up');
        levelUpEffect();
    }
});

/**
 * 传送特效
 * @param fighter 需要传送的人物
 * @param type 传送类型
 * @param cb 回调函数
 * @param cb 回调延迟执行时间
 */
const translateEffect = function (fighter, type, cb, time) {
    let data = {
        "effect": type,
        "isOnce": true,
        "index": 0,
        "z": 0,
        "x": 0,
        "y": 0,
        "scale": 1,
        "parent":fighter
    }
    openUiEffect(data,null);
    let t = setTimeout(function () {
        clearTimeout(t);
        t = null;
        cb ? cb() : "";
    }, time);
};
