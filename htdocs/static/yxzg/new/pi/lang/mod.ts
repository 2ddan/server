/**
 * 
 */
/* tslint:disable:no-reserved-keywords only-arrow-functions no-constant-condition no-var-requires 
no-require-imports no-implicit-dependencies*/
declare function require(modName: string);
declare var winit, pi_modules;
/*
 * 内置模块导出
 */

// ============================== 导入
const butilMod      = pi_modules.butil.exports;
const dependMod     = pi_modules.depend.exports;
const storeMod      = pi_modules.store.exports;
const ajaxMod       = pi_modules.ajax.exports;
const loadMod       = pi_modules.load.exports;
const commonjsMod   = pi_modules.commonjs.exports

// ============================== 导出
export type Mod = any;

const isWXMiniGame = pi_modules.load.exports.isWXMiniGame();
if (isWXMiniGame) {
    commonjsMod.debug = winit.debug
    commonjsMod.flags = {}
}

// butil模块
export const butil = (isWXMiniGame ? butilMod : ((typeof self !== 'undefined') && (<any>self)._$define) ? require('butil') : {});
// depend模块
export const depend = (isWXMiniGame ? dependMod : ((typeof self !== 'undefined') && (<any>self)._$define) ? require('depend') : {});
// store模块
export const store = (isWXMiniGame ? storeMod : ((typeof self !== 'undefined') && (<any>self)._$define) ? require('store') : {});
// ajax模块
export const ajax = (isWXMiniGame ? ajaxMod : ((typeof self !== 'undefined') && (<any>self)._$define) ? require('ajax') : {});
// load模块
export const load = (isWXMiniGame ? loadMod : ((typeof self !== 'undefined') && (<any>self)._$define) ? require('load') : {});
// commonjs模块
export const commonjs = (isWXMiniGame ? commonjsMod : ((typeof self !== 'undefined') && (<any>self)._$define) ? require('commonjs') : {});

// ============================== 本地

// ============================== 立即执行
