//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { data as db, get,  listen } from "app/mod/db";

export const forelet = new Forelet();


//野外关卡达到#关
listen("player.level", () => {
    let player = get("player")
    forelet.paint(player);
});

