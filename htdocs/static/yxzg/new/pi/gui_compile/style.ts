import { StyleMap, Tools } from '../gui/tools';
import { VNKeyWords } from '../gui_virtual/virtaul_node_keyword';
import { calJsonHash, calJsonHashName } from '../util/gui_tpl';
import { camelcase, getValue } from './reform';

/**
 * 将构建的style的形式由字符串改造成json对象形式
 */
export const styleWithJsonForm = (script: string[], start: number, end: number) => {
    const style = script.slice(start, end).join('');
    const hasScript = style.startsWith('{');

    const v = getValue(style, hasScript);
    const text = buildCode(v, hasScript);

    script.fill('', start, end);
    script[start] = text;
};

const buildCode = (validValue: string, hasScript: boolean) => {
    let r = '{';
    let hash = '';
    if (hasScript) {
        r += validValue;
        r += `attrvalue=${styleStr2JsonName}(attrvalue);`;
        r += `${VNKeyWords.node}["${VNKeyWords.style}"]=attrvalue;`;
        r += `${VNKeyWords.node}["${VNKeyWords.styleSize}"]=Object.keys(attrvalue).length;`;
        r += `${VNKeyWords.node}["${VNKeyWords.styleHash}"]=${calJsonHashName}(attrvalue);`;
    } else {
        const obj = styleStr2Json(validValue);
        const text = obj2JsonStr(obj);
        const size = Object.keys(obj).length;

        hash = calJsonHash(obj);
        r += `${VNKeyWords.node}["${VNKeyWords.style}"]=${text};${VNKeyWords.node}["${VNKeyWords.styleHash}"]=${hash};`;

        if (size > 0) {
            r += `${VNKeyWords.node}["${VNKeyWords.styleSize}"]=${size};`;
        }
    }

    r += '}';

    return r;
};

// export const styleStr2JsonName = '_styleStr2Json';
export const styleStr2JsonName = '_s';
/**
 * 将style字符串转换成json对象
 */
export const styleStr2Json = (styleValue: string) => {
    styleValue = styleValue.replace(/^["']/, '').replace(/["']$/, '');

    const obj = {};
    const kvPairs = styleValue.split(/\s*;\s*/);
    kvPairs.forEach((item) => {
        const [k, v] = item.split(/\s*:\s*/);
        if (k && v) {
            obj[StyleMap[camelcase(k)]] = `${v}`;
        }
    });

    return obj;
};

/**
 * 将style对象转换成文本形式
 */
const obj2JsonStr = (obj) => {
    let r = '{';

    Object.keys(obj).forEach((k) => {
        let value = Tools[StyleMap[k]] ? Tools[StyleMap[k]](obj[k]) : obj[k];
        if (typeof value === typeof 'str') {
            value = `"${value}"`;
        } else {
            value = JSON.stringify(value);
        }
        r += `"${k}":${value},`;
    });
    r = r.replace(/,$/, '');

    r += '}';

    return r;
};
