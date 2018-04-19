/**
 * 此模块用于当玩家切换到别处后, 游戏后执行注册的事件
 * 如：网页tab切换、网友最小化、手机返回到主屏幕等
 **/
import { HandlerTable } from "pi/util/event";

export const hiddenTable = new HandlerTable();

//document隐藏注册事件
const eventType = ['hidden'];

//本地执行
document.addEventListener("visibilitychange", function() {
    eventType.forEach((k) => {
        hiddenTable.notify(k, [document.hidden])
    });
});