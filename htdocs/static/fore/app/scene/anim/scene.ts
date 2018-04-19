/**
 * @description ui特效组件
 */

import { getWidth, getHeight, getScale } from "pi/ui/root"
import { getRealNode, paintCmd3 } from "pi/widget/painter";
import { mgr, mgr_data } from "../scene";
import { Widget } from "pi/widget/widget";
import { open, destory } from "pi/ui/root";
import { ResTab } from "pi/util/res_mgr";
import { initAnimFinishCB, canvasGoBack } from "../base/scene"
import { getEffectId } from "../ui_fun"
//=======================================定义
let cb = {};

//========================================导出
export let uiEffect:{} = {};

/**
 * @description 打开以及更换特效
 * @param  effect:特效名字
 * @param  isOnce:是否只播放一次;若是，必须传true;若不是，可不传
 * @param  z:特效在z轴的位置
 * @param  oldid:在更新特效时，若是上一个创建的特效可不传，若新要创建一个特效请把前一个特效的id传给我
 */
export const openUiEffect = (data , oldid?: number, type?) => {
    type = type || "effect";
    let uiEffectId = getEffectId();
    uiEffect[uiEffectId] = {
        "effect": data.effect,
        "isOnce": data.isOnce || false,
        "id": uiEffectId || 0,
        "z": data.z || -0.2,
        "x": data.x ||0,
        "y": data.y || 0,
        "index": data.index || 0,
        "scale":data.scale || 1,
        "parent":data.parent,
        "lookat":data.lookat || null,
        "locTime":Date.now()
    }
    if (oldid) {
        mgr.create(uiEffect[uiEffectId], type);
        if (uiEffect[oldid] && uiEffect[oldid]._show) {
            mgr.remove(uiEffect[oldid])
            delete uiEffect[oldid]
        }
    } else {
        if (uiEffect[uiEffectId]._show){
            mgr.modify(uiEffect[uiEffectId]);
            // console.log("modify uiEffect");
        }else {
            if(data.parent){
                uiEffect[uiEffectId].x = data.parent._show.old.transform.position[0];
                uiEffect[uiEffectId].y = data.parent._show.old.transform.position[2];
            }
            // else 
            mgr.create(uiEffect[uiEffectId], type);
        }
    }
    return uiEffectId;
}

/**
 * @description 更新同一个特效
 */
export const updateUiEffect = (id: number, arg: Array<any>) => {
    if (!uiEffect[id]) return
    for (let i = 0; i < arg.length; i++) {
        uiEffect[id][arg[i][0]] = arg[i][1]
    }
    mgr.modify(uiEffect[id])
}



/**
 * @description 关闭特效
 * @param id:与创建特效时传的id一致
 */
export const destoryUiEffect = (id?: number) => {
    if (uiEffect[id]) {
        if(uiEffect[id]._show && uiEffect[id]._show.old && uiEffect[id]._show.old.ref)mgr.remove(uiEffect[id]);
        delete uiEffect[id];
        return true;
    }else
        return false;
}

/**
 * @description 特效回调
 * @param callback:函数，自己想要执行德特效回调方法
 */
export const effectcallback = (id,callback: Function) => {
    cb[id] = callback;
}

//=======================================本地


// ====================================== 立即执行

initAnimFinishCB((id) => {
    if (uiEffect[id] && cb) {
        cb[id] && cb[id](id);
        if( (uiEffect[id].isOnce !== undefined) && (!uiEffect[id].isOnce) ){
            return;
        }
        return destoryUiEffect(id);
    }
})