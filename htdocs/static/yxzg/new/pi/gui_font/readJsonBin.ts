/**
 * 
 */
import { utf8Decode } from '../util/util';

let curOffset: number;

const getPages = (arrbuff: ArrayBuffer) => {
    const u16v = new Uint16Array(arrbuff, 0, 1);
    const len = u16v[0];
    const buf = arrbuff.slice(0, len);
    const pages = [];
    curOffset += 2;
    while (curOffset < len) {
        const u8 = new Uint8Array(buf, curOffset, 1);
        ++curOffset;

        const nameBuf = buf.slice(curOffset, curOffset + u8[0]);
        const name = utf8Decode(nameBuf);

        curOffset += u8[0];
        pages.push(name);
    }

    return pages;
};

const getFontName = (arrbuff: ArrayBuffer) => {
    curOffset += 12;
    const lenBuf = arrbuff.slice(curOffset, curOffset + 1);
    const lenView = new Uint8Array(lenBuf);
    ++curOffset;
    const nameEnd = curOffset + lenView[0];
    const nameBuf = arrbuff.slice(curOffset, nameEnd);

    curOffset = nameEnd;
    
    return utf8Decode(nameBuf);
};

const getLineHeight = (arrbuff: ArrayBuffer) => {
    const buf = arrbuff.slice(curOffset, curOffset + 1);
    const view = new Uint8Array(buf);

    curOffset += 1;

    return view[0];
};

const getPictureSize = (arrbuff: ArrayBuffer) => {
    const buf = arrbuff.slice(curOffset, curOffset + 4);
    const view = new Uint8Array(buf);
    const view2 = new Uint16Array(view.buffer);

    curOffset += 4;

    return [view2[0], view2[1]];
};

const getPadding = (arrbuff: ArrayBuffer) => {
    const buf = arrbuff.slice(curOffset, curOffset + 8);
    const view = new Uint16Array(buf);

    curOffset += 8;

    return [view[0], view[1], view[2], view[3]];
};

const getCharsetMap = (arrbuff: ArrayBuffer) => {
    const len = arrbuff.byteLength;
    const info = [];
    const charset = [];
    while (curOffset < len) {
        const infoBuf = arrbuff.slice(curOffset, curOffset + 12);
        curOffset += 12;

        const u16View = new Uint16Array(infoBuf, 0, 3);
        const s8View = new Int8Array(infoBuf, 6, 2);
        const u8View = new Uint8Array(infoBuf, 8);
        const [id, x, y] = u16View;
        const [xoffset, yoffset] = s8View;
        const [width, height, advance, page] = u8View;
        charset.push(String.fromCharCode(id));
        info.push({ id, x, y, xoffset, yoffset, width, height, advance, page });
    }

    return [info, charset];
};

export const bin2Json = (arrbuff: ArrayBuffer) => {
    curOffset = 0;
    // 这部分函数调用必须按照该顺序，不能打乱顺序，不然数据读取出错
    const pages = getPages(arrbuff);
    const face = getFontName(arrbuff);
    const lineHeight = getLineHeight(arrbuff);
    const [scaleW, scaleH] = getPictureSize(arrbuff);
    const padding = getPadding(arrbuff);
    const [chars, charset] = getCharsetMap(arrbuff);

    return {
        pages,
        chars,
        info: {
            face,
            padding,
            charset
        },
        common: {
            lineHeight,
            scaleW,
            scaleH
        }
    };
};
