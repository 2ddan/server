/*
 * 样式模块，提供组件内包含子组件范围内基于clazz的样式匹配，clazz使用内联样式作用到实际节点上。
 * 而内联样式则不支持伪类( :hover)、伪对象( :first-child)和关键帧动画( animation keyframes)。
 * 因此，不能支持伪类和关键帧动画。可以使用全局class来处理。
 * 样式沿组件树上溯，寻找到后就注入，这样优先使用外部定义，如果没有则使用默认。
 */

// ============================== 导入
import { butil } from '../lang/mod';
import { allHash } from '../util/hash';
import { getSupportedProperty } from '../util/html';
import { arrayEqual, mapDiff } from '../util/util';
import { VNKeyWords } from './virtaul_node_keyword';
import { Widget } from './widget';

// ============================== 导出

/**
 * @description 含有URL的信息
 * @example
 */
export interface URLInfo {
    key: string; // 效果名称
    arr: string[]; // 前缀,(文件,后缀)...
}
/**
 * @description 效果表
 * @example
 */
export interface URLEffect {
    map: Map<string, string>;
    url: URLInfo; // 含有的键和URL
}
/**
 * @description 组件样式表
 * @example
 */
export type Sheet = Map<string, URLEffect>;

/**
 * @description 解析字符串，返回样式表
 * @example
 * 只支持class
 */
export const parse = (str: string, path: string): Sheet => {
    let r = styleRxp.exec(str);
    if (!r) {
        return null;
    }
    const sheet = new Map();
    while (r) {
        const s = r[1];
        const effect = parseEffect(r[2], path);
        r = styleRxp.exec(str);
        if (!effect) {
            continue;
        }
        let rr = classRxp.exec(s);
        while (rr) {
            sheet.set(rr[1], effect);
            rr = classRxp.exec(s);
        }
    }

    return sheet.size > 0 ? sheet : null;
};

/**
 * @description 分析样式效果，可用于内联样式和外部样式的分析
 * @example
 */
export const parseEffect = (str: string, path: string): URLEffect => {
    const arr = str.split(';');
    const effect: URLEffect = { map: new Map(), url: null };
    const map = effect.map;
    let n = 0;
    for (const s of arr) {
        const i = s.indexOf(':');
        if (i < 0) {
            continue;
        }
        n++;
        const k = getSupportedProperty(s.slice(0, i).trim());
        const v = s.slice(i + 1);
        const url = getURL(k, v, path);
        if (!url) {
            map.set(k, v);
        } else {
            effect.url = url;
        }
    }

    return n > 0 ? effect : null;
};

/**
 * @description 分析样式效果，可用于内联样式和外部样式的分析
 * @example
 */
export const parseEffect2 = (key: string, value: any, effect?: URLEffect): URLEffect => {
    effect = effect || { map: new Map(), url: null };
    const map = effect.map;
    map.set(key, value);

    return effect;
};

/**
 * @description 计算clazz的样式特效，沿组件树上溯查找定义的clazz
 * @example
 */
export const calcClazz = (widget: Widget, clazz: string[], clazzStr: string, result: Map<string, any>) => {
    // 先从本地缓存中寻找 - 现 wcss 实现为 js 导出对象，组件加载时便有
    if (!result) {
        result = new Map();
    } else {
        result.clear();
    }

    clazz.forEach((v, k) => {
        const effect = readClazz(widget, v);
        if (effect) {
            for (const k in effect) {
                result.set(k, effect[k]);
            }
        }
    });

    return result;
};
export const readClazz = (widget: Widget, clazz: string) => {
    let result;
    if (widget.r_sheet) {
        result = widget.r_sheet.value[clazz];
    }

    if (!result) {
        if (widget.parentNode[VNKeyWords.widget]) {
            result = readClazz(widget.parentNode[VNKeyWords.widget], clazz);
        }
    }

    return result;
};
/**
 * @description 合并内联样式和clazz样式
 * @example
 */
export const mergeStyle = (innerStyle: Map<string, any>, clazzStyle: Map<string, any>): Map<string, any> => {
    
    const style: Map<string, any> = new Map();

    if (!innerStyle) {
        if (clazzStyle) {
            clazzStyle.forEach((value: any, key: string) => {
                style.set(key, value);
            });
        }

        return style;
    }
    
    if (!clazzStyle) {
        if (innerStyle) {
            innerStyle.forEach((value: any, key: string) => {
                style.set(key, value);
            });
        }

        return style;
    }

    // 合并 - inner 覆盖 clazz
    clazzStyle.forEach((value: any, key: string) => {
        style.set(key, value);
    });

    innerStyle.forEach((value: any, key: string) => {
        style.set(key, value);
    });

    return style;
};

/**
 * @description 计算新旧样式的差异部分
 * @example
 */
export const difference = (oldStyle: URLEffect, newStyle: URLEffect): URLEffect => {
    if (!oldStyle) {
        return newStyle;
    }
    const diff = { map: new Map(), url: null };
    const om = oldStyle.map;
    const dm = diff.map;
    if (!newStyle) {
        for (const k of om.keys()) {
            dm.set(k, '');
        }

        return diff;
    }
    mapDiff(newStyle.map, om, diffMap, dm);
    if (oldStyle.url) {
        if (newStyle.url) {
            if (oldStyle.url.key !== newStyle.url.key || !arrayEqual(oldStyle.url.arr, newStyle.url.arr)) {
                diff.url = newStyle.url;
            }
        }
    } else if (newStyle.url) {
        diff.url = newStyle.url;
    }

    return diff;
};
export const differenceStyle = (oldStyle: Map<string, any>, newStyle: Map<string, any>): Map<string, any> => {
    if (!oldStyle) {
        return newStyle;
    }

    const diff: Map<string, any> = new Map();

    // 没有新属性, 旧属性全清空
    if (!newStyle) {

        oldStyle.forEach((value: any, key: string) => {
            diff.set(key, undefined);
        });

        return diff;
    }

    oldStyle.forEach((value: any, key: string) => {
        // if (newStyle.get(key) !== value) {
        if (allHash(newStyle.get(key), null) !== allHash(value, null)) {
            diff.set(key, newStyle.get(key));
        }
    });
    
    newStyle.forEach((value: any, key: string) => {
        // if (oldStyle.get(key) !== value) {
        if (allHash(oldStyle.get(key), null)  !== allHash(value, null)) {
            diff.set(key, newStyle.get(key));
        }
    });

    return diff;
};
/**
 * @description 在高优先级的样式中过滤指定新样式
 * @example
 */
export const filter = (highStyle: URLEffect, style: URLEffect) => {
    if (!highStyle) {
        return;
    }
    const map2 = style.map;
    const map1 = highStyle.map;
    for (const k of map2.keys()) {
        if (!map1.has(k)) {
            continue;
        }
        map2.delete(k);
        if (style.url && style.url.key === k) {
            style.url = null;
        }
    }
};
export const filterStyle = (highStyle: Map<string, any>, style: Map<string, any>) => {
    if (!highStyle) {
        return;
    }
    const map2 = style;
    const map1 = highStyle;
    for (const k of map2.keys()) {
        if (!map1.has(k)) {
            continue;
        }
        map2.delete(k);
        // if (style.url && style.url.key === k) {
        //     style.url = null;
        // }
    }
};

// ============================== 本地
// 匹配样式
const styleRxp = /\s*([^{]*)\s*{\s*([^}]*)}/g;
// 匹配类选择器
const classRxp = /\s*\.([-_\w]+)\s*,?/g;
// 匹配CSS的effect中的url，不匹配含有:的字符串，所以如果是http:或https:，则不替换
const effectURL = /url\(([^\)"':]*)\)/g;

// 获得路径的url
const getURL = (k: string, v: string, path: string): URLInfo => {
    // 替换url为全路径
    let rr = effectURL.exec(v);
    if (!rr) {
        return;
    }
    const info = { key: k, arr: [] };
    let suffix = 0;
    const arr = info.arr;
    do {
        // tslint:disable:prefer-template
        arr.push(v.slice(suffix, rr.index) + 'url(');
        arr.push(butil.relativePath(rr[1], path));
        suffix = rr.index + rr[0].length - 1;
        rr = effectURL.exec(v);
    } while (rr);
    arr.push(v.slice(suffix));

    return info;
};

// 写入diffMap
const diffMap = (dm: Map<string, string>, key: string, newv: string, oldv: string) => {
    dm.set(key, newv || '');
};
