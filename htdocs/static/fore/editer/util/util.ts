//向数组中插入元素
export const arrayInserts = (array: Array<any>, childs: Array<any>, index?: number, ignore?: Function): number => {
    let pos;
    if (index !== 0 && !index) {
        pos = array.length - 1;
        for (let i = 0; i < childs.length; i++) {
            array.push(childs[i]);
        }
        return pos;
    }

    if (ignore) {
        for (let i = 0; i < index; i++) {
            if (ignore(array[i])) {
                index++;
            }
        }
    }

    let plen = array.length;
    let clen = childs.length;
    for (let i = plen - 1; i >= index; i--) {
        array[clen + i] = array[i];
    }

    for (let i = 0; i < clen; i++) {
        array[index + i] = childs[i];
    }
    return index;
}

//从数组中删除多个元素
export const arrayDelByIndex = (array: Array<any>, index: number, count: number): Array<any> => {
    let len = array.length;
    let delsE = [];
    if (index >= len) {
        throw `index不存在：${index}`;
    }

    for (let i = index; i <= (array.length - count); i++) {
        delsE.push(array[i]);
        array[i] = array[i + count];
    }
    array.length = array.length - count;
    return delsE;
}

//从数组中删除一个元素
export const arrayDel = (array: Array<any>, child: any): { index: number, elem: any } => {
    let index;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === child) {
            index = i;
        }
    }

    if (index !== 0 && !index)
        throw `删除找不到元素`;

    let dels = arrayDelByIndex(array, index, 1);
    return { index: index, elem: dels[0] };
}

export const arrayCopy = function (src, start0, dest, start1, len) {
    var i, j;
    for (i = start0, j = start1; i < len && j < len; i++ , j++) {
        dest[j] = src[i];
    }
    return;
};


export const trim = (s: string) => {
    var c, i = 0, j = s.length;
    for (; i < j; i++) {
        c = s.charCodeAt(i);
        if (c > 32) break;
    }
    for (; j > i; j--) {
        c = s.charCodeAt(j);
        if (c > 32) break;
    }
    return s.substring(i, j + 1);
}

