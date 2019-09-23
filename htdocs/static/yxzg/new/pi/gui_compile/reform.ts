import { VNKeyWords } from '../gui_virtual/virtaul_node_keyword';
import { calTextHash, nextHashName } from '../util/gui_tpl';
import { nextHash } from '../util/hash';

/**
 * 将class和w-class提取从node.attr中提取到node上
 */
export const reformClass = (script: string[], start: number, end: number) => {
    const classNames = script.slice(start, end).join('');
    const hasScript = classNames.startsWith('{');

    // let k = classNames.match(/node.attrs\["(.*?)"\]/)[1];
    let k = classNames.match(/\$n\["a"\]\["(.*?)"\]/)[1];
    const v = getValue(classNames, hasScript);

    if (k === 'w-class') k = 'wclass';

    let result = '';
    if (hasScript) {
        result = `{${v}${VNKeyWords.node}["${VNKeyWords[k] || k}"]=attrvalue;}`;
    } else {
        result = `${VNKeyWords.node}["${VNKeyWords[k] || k}"]=${v};`;
    }

    script.fill('', start, end);
    script[start] = result;
};

/**
 * 生成代码中，对属性赋值的值
 * * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * * 正则匹配里注意手动改属性名
 */
export const getValue = (script: string, hasScript: boolean) => {
    let str = '';

    if (hasScript) {
        // str = script.match(/\{(.*?)node\.attrs.*\}node.attrHash/)[1];
        str = script.match(/\{(.*?)\$n\["a"\].*\}\$n\["aH"\]/)[1];
    } else {
        str = script.match(/= (.*?);$/)[1];
    }
    // if (str.search(';node.attr') >= 0) {
    if (str.search(';\$n["a"]') >= 0) {
        // str = str.match(/(^.+?);node\.attrHash.*/)[1];
        str = str.match(/(^.+?);\$n\["aH"\].*/)[1];
    }

    return str;
};

const eventHash = 0;
export const reformEvent = (ev: string[], start: number, end: number) => {
    const evScript = ev.slice(start, end).join('');
    const hasScript = evScript.startsWith('{');

    // let k = evScript.match(/node.attrs\["(.*?)"\]/)[1];
    let k = evScript.match(/\$n\["a"\]\["(.*?)"\]/)[1];
    const v = getValue(evScript, hasScript);

    k = eventMap[k] || k;
    // console.log('event ===============', k, v, evScript);

    let result = '';
    const kHash = calTextHash(k);
    if (hasScript) {
        result = `{${v}${VNKeyWords.node}["${VNKeyWords.event}"]["${k}"]=attrvalue;
        ${VNKeyWords.node}["${VNKeyWords.eventHash}"]=${nextHashName}(${VNKeyWords.node}["${VNKeyWords.eventHash}"], ${nextHashName}(${kHash}, _calTextHash(attrvalue)));
}`;
    } else {
        const vHash = calTextHash(v);
        const kvHash = nextHash(kHash, vHash);
        result = `${VNKeyWords.node}["${VNKeyWords.event}"]["${k}"]=${v};
        ${VNKeyWords.node}["${VNKeyWords.eventHash}"]=${nextHashName}(${VNKeyWords.node}["${VNKeyWords.eventHash}"],${kvHash});`;
    }
    ev.fill('', start, end);
    ev[start] = result;
    // console.log('event result ============', result);
};

const eventMap = {
    'on-up': 'pointerup',
    'on-down': 'pointerdown',
    'on-tap': 'pointerclick',
    'on-move': 'pointermove',
    'on-longtap': 'longTap',
    'on-dbltap': 'dbclick',
    'on-multipointer': 'multipointer',
    'on-change': 'change',
    'on-blur': 'blur'
};

export const camelcase = (name: string) => {
    const arr = name.split('-');

    let str = '';

    arr.forEach((item, idx) => {
        if (idx > 0 && item) {
            item = item[0].toUpperCase() + item.slice(1);
        }
        str += item;
    });

    return str;
};
