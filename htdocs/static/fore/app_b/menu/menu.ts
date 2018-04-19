//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, remove, add, destory } from "pi/ui/root";
import { menu_top } from "cfg/b/menu_top";
//app
import { updata, get as getDB, listen } from "app/mod/db";
import { globalSend } from "app/mod/pi";
import { menu_parent } from "cfg/b/menu_parent";

// =========================== 导出
export const forelet: any = new Forelet();

export class menu_m extends Widget {
    gotoMenu = function (arg) {
        arg = arg.split(',');
        globalSend(arg[0], arg[1]);
    };
}

export const globalReceive = {
    "loadover": () => {
        show = true;
        forelet.paint(getData());
    }
}

// =========================== 本地
/**
 * @description 处理body点击事件,完成点击菜单外部区域，隐藏子菜单
 */
const listenBody = () => {

};
let data: any = {},
    show = false;
/**
 * @description 获取显示数据
 */
//menu_top数据
const getData = () => {
    let state = getDB("recharge.first_pay_gift_state");
    state && (data.state = state.length > 0 ? 1 : 0); //首冲领取状态
    data.menu_top = menu_top;
    data.fun_open_id = getDB("open_fun.id") || 0;
    data.show = show;
    return data;
};

//监听open_fun的变化
listen("open_fun.id", () => {
    forelet.paint(getData());
});
listen("open_fun.tips", () => {
    forelet.paint(getData());
});
// =========================== 立即执行

/*** forelet 初始化 ***/
listen("recharge", function (data) {
    forelet.paint(getData());
});


let oldLevel = 0;

listen("player.level", () => {
    let level = getDB("player.level");
    if (oldLevel <= level) {
        return;
    }
    oldLevel = level;
    if (oldLevel >= menu_parent[3].level_limit) {
        forelet.paint(getData());
        return;
    }
    if (oldLevel >= menu_parent[4].level_limit) {
        forelet.paint(getData());
        return;
    }
});

// =========================== 测试代码
//openMenu();
forelet.paint(getData());