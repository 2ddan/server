/**
 * 相机移动模块
 */

import { mgr, mgr_data } from "./scene";
import * as tween from "pi/math/tween";


let timer: number; let a = true;

//============================== 导出
export const startMove = (start, end, time, func, cb) => {
    if (timer || a) {
        return;
    }
    let fun = tween[func],
        st = new Date().getTime(),
        onceTime = 50,
        _c = tween.calc;
    const _calc = () => {
        timer = setTimeout(() => {
            let t = new Date().getTime() - st;
            t = t >= time ? time : t;

            let x = _c(t, start.x, end.x, time, fun),
                y = _c(t, start.y, end.y, time, fun),
                z = _c(t, start.z, end.z, time, fun),
                lx = _c(t, start.lx, end.lx, time, fun),
                ly = _c(t, start.ly, end.ly, time, fun),
                lz = _c(t, start.lz, end.lz, time, fun);

            mgr_data.camera[mgr_data.name].lookatOnce.value = [lx, ly, lz];
            mgr.modify(mgr_data.camera[mgr_data.name])
            mgr.setPos(mgr_data.camera[mgr_data.name], [x, y, z]);
            if (t >= time) {
                clearTimeout(timer);
                timer = undefined;
                if (cb) cb();
                return
            }
            _calc();
        }, onceTime)
    }
    _calc();
}

export const rotateMove = (before, target, cb, camera_before, type?: boolean) => {
    if (mgr_data.name === "fight"){
        cb();
        return
    }
    if (timer) return;
    let func = tween[target.func],
        st = new Date().getTime(),
        onceTime = 50,
        time = target.time,
        _c = tween.calc,
        _p, _r;

    if (type) {
        camera_before.road = {};
        camera_before.road.p = [];
        camera_before.road.r = [];

        _p = camera_before.road.p;
        _r = camera_before.road.r;

        _p.push([before._show.old.transform.position[0], before._show.old.transform.position[1], before._show.old.transform.position[2]]);
        _r.push([before.rotate[0], before.rotate[1], before.rotate[2]]);
    }

    let _calc = () => {
        timer = setTimeout(() => {
            let t = new Date().getTime() - st;
            t = t >= time ? time : t;

            let x = _c(t, before._show.old.transform.position[0], target.info.x, time, func),
                y = _c(t, before._show.old.transform.position[2], target.info.y - before.position[2], time, func),
                z = _c(t, before._show.old.transform.position[1], target.info.z - before.position[1], time, func),
                rx = _c(t, before.rotate[0], target.info.rx, time, func),
                ry = _c(t, before.rotate[1], target.info.ry, time, func),
                rz = _c(t, before.rotate[2], target.info.rz, time, func);

            if (!mgr_data.camera[mgr_data.name]) return

            if (type) {
                _p.push([x, y, z]);
                _r.push([rx, ry, rz]);
            }
            mgr_data.camera[mgr_data.name].rotate = [rx, ry, rz];
            mgr.modify(mgr_data.camera[mgr_data.name]);
            mgr.setPos(mgr_data.camera[mgr_data.name], [x, y, z]);

            if (t >= time) {
                mgr_data.camera[mgr_data.name].rotate = [target.info.rx, target.info.ry, target.info.rz];
                mgr.modify(mgr_data.camera[mgr_data.name]);
                mgr.setPos(mgr_data.camera[mgr_data.name], [target.info.x, target.info.y - before.position[2], target.info.z - before.position[1]]);
                clearTimeout(timer);
                timer = undefined;

                if (cb) cb();
                return
            }
            _calc();
        }, onceTime)
    }
    _calc();
}