/**
 *  base64操作的封装
 */

import * as base64js from './base64js.min';

/**
 * 二进制转base64字符串
 */
export const fromByteArray = (arr:Uint8Array):string => {
    return base64js.fromByteArray(arr);
};

/**
 * 获得二进制的长度
 */
export const byteLength = (arr:Uint8Array):number => {
    return base64js.byteLength(arr);
};

/**
 * base64字符串转二进制
 */
export const toByteArray = (arrStr:string):Uint8Array => {
    return base64js.toByteArray(arrStr);
};