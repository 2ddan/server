/**
 * 
 */

// tslint:disable-next-line:ordered-imports
import './weapp-adapter';
// tslint:disable-next-line:ordered-imports
import './pep';
// tslint:disable-next-line:ordered-imports
import './override/wxInit';
// tslint:disable-next-line:ordered-imports
import './override/loadDir';
// tslint:disable-next-line:ordered-imports
import './keyboard';

// 上面几个的导入顺序不能变，且必须最先导入

import { ajax, load, store } from '../lang/mod';
import { downloadFile } from './download';
import { fullLocalPath, isFileExist, writeFile } from './filemanager';
import { loadFont } from './wxInfo';

// tslint:disable-next-line:no-reserved-keywords
declare var exports, module, require;

const winit = (<any>window).winit;

const empty = (...ignore) => 0;

(<any>window).global = window;

(<any>window)._$define = (str: string, func: Function) => {
    const mod = {};
    (<any>window).pi_modules[str] = { exports: mod };
    func(require, mod, module);
    Object.assign(exports, mod);
};

// 更换图片路径，又项目中的写法更换成微信小游戏本地图片路径
export const replaceImagePath = (src: string, cb = empty, errCb = empty) => {
    const lstore = load.getStore();
    if (lstore.files[src]) {
        // 文件已保存到本地用户目录下
        cb(fullLocalPath(src));
    } else if (lstore.tmpFileMap[src]) {
        // 文件已保存到本地临时目录下
        cb(lstore.tmpFileMap[src].path);
    } else if (lstore.db[src]) {
        // 文件内容未保存，但已存入store中
        writeFile(src, lstore.db[src], () => {
            cb(fullLocalPath(src));
        }, (err) => {
            errCb(err);
        });
    } else {
        // 文件不再本地，也不在内存中
        downloadFile(src, false, (res) => {
            cb(res.filePath);
        }, (err) => {
            errCb(err);
        });
    }
};

// 获取图片以外的资源内容
export const readResContext = (filePath: string, cb = empty, errCb = empty) => {
    store.read(load.getStore(), filePath, cb, () => {
        let idx = 0;
        const getRemote = () => {
            ajax.get(`${winit.domains[idx]}${winit.path}${filePath}`, undefined, undefined, ajax.RESP_TYPE_BIN, 0, (data) => {
                cb(data);
            }, (err) => {
                idx += 1;
                if (winit.domains[idx]) {
                    getRemote();
                } else {
                    errCb(err);
                }
            });
        };
        getRemote();
    });
};

// 此处使用的是iOS加载出来的字体名，因为在Android平台上，
// 两个字体加载出来的字体名相同，小游戏现在使用字体都用这个配置
winit.fontFamily = {};
const FontFamilyCfg = {};

/**
 * @param key 项目内自定义的名称
 * @return 微信小游戏里解析出的字体名称
 */
export const readFontNameInWXGame = (key: string) => {
    return FontFamilyCfg[key];
};

/**
 * 初始化字体
 * @param fontFile [ ['字体名称','字体文件绝对路径'] ...]
 * * 字体名称 : 小游戏里不能自定义字体名称，使用的是字体文件内定义的 字体名称
 * * 所以
 */
export const initFonts = (fontFile: string[][]) => {
    const getFontFamily = (key: string, path: string) => {
        if (isFileExist(path)) {
            winit.fontFamily[key] = loadFont(fullLocalPath(path));
            FontFamilyCfg[key] = winit.fontFamily[key];
        } else {
            downloadFile(path, true, ({ filePath }) => {
                winit.fontFamily[key] = loadFont(filePath);
                FontFamilyCfg[key] = winit.fontFamily[key];
            });
        }
    };
    for (let len = fontFile.length - 1; len >= 0; len--) {
        getFontFamily(fontFile[len][0], fontFile[len][1]);
    }
};

(<any>window).pi_modules['pi/minigame/adapter'] = { exports };
