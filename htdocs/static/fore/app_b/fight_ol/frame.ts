// ========================================= 导入
//pi
//scene
import { frame } from "app/scene/move";
//app
import { olFightOrder } from "./handscene";

// ========================================= 导出
/**
 * @description 开始同步后台帧率
 */
export const initFrame = () => {
    if(pTimer || fTimer){
        clear();
    }
    allTime = Date.now();
    weakenFrame();
    fTimer = setTimeout(() => {
        initFrame();
    }, fTime);
}
/**
 * @description 清空帧率同步数据
 */
export const stopWeaken = () => {
    clear();
};

// ======================================== 本地
/**
 * @description 移动帧率, 本地为50 || 外网为55
 */
var out = frame.out, //外网帧率
    loc = frame.loc, //本地帧率
    fTime = 60000, //每个同屏场景同步时间间隔
    pTime = 2000, //每次同步间隔
    allTime, //每次同步所花事件
    fTimer, //每个场景同步定时器
    pTimer=null, //每次同步定时器
    count = 0, //每次同步次数
    cid = 0, //同步通讯的id自增，如果通讯回来的cid不一致则不处理
    atime = 0, //消息来回时间的一半
    now; //每次同步的场景时间差
/**
 * @description 同步帧率
 */
const weakenFrame = () => {
    let _cid = cid,
        _ac = Date.now();
    olFightOrder({ "type": "wild", "result": '{"type":"ping" }'},(data) => {
        if(_cid !== cid)
            return;
        if(data.ok[0][1] !== "undefined"){
            let r = JSON.parse(data.ok[0][1]),
                n = Date.now();
            atime += (n-_ac)/2;
            if(count == 2){
                now = r.now-now;
                allTime = n - allTime;
                calc();
                clear();
            }else{
                now = r.now;
                pTimer = setTimeout(() => {
                    weakenFrame();
                }, pTime);
            }
        }
    });
    cid += 1;
    _cid = cid;
    count += 1;
};
/**
 * @description 同步帧率
 */
const calc = () => {
    let t = allTime - atime * 1.5,
        f = now / loc,
        r = t/f;
    if(r> frame.max)r = frame.max;
    else if(r < frame.min) r = frame.min;
    frame.out = out = r; 
}

const clear = () => {
    fTimer && clearTimeout(fTimer);
    pTimer && clearTimeout(pTimer);
    allTime = undefined;
    fTimer = null;
    pTimer = null;
    count = 0;
    atime = 0;
    now = undefined;
}
// ================================= 立即执行
