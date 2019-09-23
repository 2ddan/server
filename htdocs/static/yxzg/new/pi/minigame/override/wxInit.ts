// 导入 ===========================
import '../beforePiInit';
import '../../boot/init';
import { store } from '../../lang/mod';
import { WriteFileQueue } from './writeFQ';
import {
    writeFile, readFile, deleteFile,
    getFileInfoSync, isFileExist
} from '../filemanager';

const load = pi_modules.load.exports
const depend = pi_modules.depend.exports;
const storeMod = pi_modules.store.exports;

declare var winit, pi_modules;

// 本地 ===========================

const WXMiniGame = navigator.userAgent.search("WX_GAME") !== -1;
let wfq: WriteFileQueue;

// 抽取原init.js中store模块的onerror函数
const onerror = function (cb: Function, type: string, key: string, e: any) {
    if (!cb)
        return;

    cb({
        nativeError: e,
        error: type,
        reason: key + ", error message: " + e.errMsg
    });
}

interface storeType {
    db: any,            // 内存中的数据
    files: any,         // 保存到本地用户目录下的文件名 {fileName: true}
    tmpFileMap: any     /* 保存到本地临时目录下的文件名及其保存到本地的临时文件名
                           {fileName: {path:localFileName, sign}} */
}
/**
 * 获取store中储存的所有键
 */
const allKeysInStore = (store: storeType) => {
    return [...Object.keys(store.db), ...Object.keys(store.files)]
};

// 导出 ===========================

// 添加判断微信小游戏环境的函数
const isWXMinigame = () => WXMiniGame;

// 重写store模块
// 在小游戏中， localSign存储在localStorage中
// 如果存入的数据是arraybuffer，则检查是否还可以继续写文件
// 如果可以，则将其写入文件中，否则，就存在内存中

const storeInit = (store: storeType, callback?: Function) => {
    localStorage.dbSize || (localStorage.dbSize = 0);
    localStorage.localSign || (localStorage.localSign = {});
    // localSign
    store.db = {
        "": Object.assign({}, localStorage.localSign)
    };
    // 存入本地的文件
    store.files = {};
    for (const k in store.db[""]) {
        store.files[k] = true;
    }
    // 存入临时文件路径对照表，该内容来源于downloadFile接口下载的临时文件
    store.tmpFileMap = localStorage.tmpFileMap || {};
    for (const p in store.tmpFileMap) {
        const pp = store.tmpFileMap[p].path;
        if (!isFileExist(pp)) {
            delete store.tmpFileMap[p];
        }
    }
    localStorage.tmpFileMap = store.tmpFileMap;
    wfq = new WriteFileQueue(store);
    callback && callback();
}

const storeRead = (store: storeType, key: string, callback: Function, errorCallback?: Function) => {
    // 如果一个键的内容不是存成文件，则在内存中
    if (store.db.hasOwnProperty(key)) {
        setTimeout(() => {
            callback(store.db[key], key);
        }, 0);
    } else if (store.files[key] || store.tmpFileMap[key]) {
        const filePath = store.tmpFileMap[key] ? store.tmpFileMap[key].path : key;
        // 读取键对应的文件内容
        readFile(filePath, (data) => {
            callback(data, key);
        }, (err) => {
            onerror(errorCallback, storeMod.ERR_READ, key, err);
        })
    } else {
        const err = new Error();
        err.message = "No that key in store: " + key;
        onerror(errorCallback, storeMod.ERR_READ, key, err);
    }
}

/**
 * 由于files接口请求到的数据切分好后写的文件很多，一次行写入
 * 过多文件，小游戏会出现卡顿现象，故加入写文件队列，缓慢写入文件
 */
const storeWrite = (store: storeType, key: string, data: any, callback?: Function, errorCallback?: Function) => {
    store.db[key] = data;
    callback && callback();
    // localSign存放到localstorage
    if (key === "") {
        wfq.start();
        return;
    }
    // arraybuffer内容通过写文件队列往文件里写
    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        wfq.add(key, { path: key, data: data, sign: depend.get(key).sign });
    }
}

const storeDelete = (store: storeType, key: string, callback?: Function, errorCallback?: Function) => {
    if (store.files[key]) {
        // 数据在本地用户文件中

        // 获取文件大小
        const info = depend.get(key);
        const size = (info && info.size !== undefined) ? info.size : (getFileInfoSync(key).size || 0);
        const errCb = (err) => {
            onerror(errorCallback, storeMod.ERR_DELETE, key, err);
        }
        deleteFile(key, () => {
            // 删除文件成功后修改数据库大小，并重新写入索引及索引文件
            delete store.files[key];
            store.db[""] && delete store.db[""][key];
            localStorage.dbSize -= size;
            delete localStorage.localSign[key];
            localStorage.localSign = localStorage.localSign;
            callback && callback();
        }, errCb);
    } else if (store.tmpFileMap[key]) {
        // 数据在本地临时文件中

        // 本地临时文件无需删除文件，直接删除其在store内的文件路径对照
        // 即可，微信对本地临时文件有相应的回收机制
        delete store.tmpFileMap[key];
    } else {
        // 数据在内存中

        delete store.db[key];
        if (key === "") {
            delete localStorage.localSign;
        }
        callback && callback()
    }
}

const storeIterate = (store: storeType, callback: Function, errorCallback?: Function) => {
    let noErr = true;

    const keys = allKeysInStore(store);

    // 读取写入文件中的数据
    let count = 0
    for (const key in store.files) {
        storeMod.read(store, key, (data, k) => {
            count += 1
            callback(k, data)
            // 所有数据遍历完后返回undefined
            if (count === keys.length) {
                callback()
            }
        }, (err) => {
            // 保证只调用一次错误回调
            if (!noErr) {
                return
            }
            noErr = false
            onerror(errorCallback, storeMod.ITERATE, "", err)
        })
    }
}

const storeClear = (store: storeType, callback: Function, errorCallback?: Function) => {
    const keys = allKeysInStore(store);
    if (keys.length === 0) {
        callback();
    }

    let count = 0;
    let noErr = true;
    // 清除文件内容
    for (let key of keys) {
        storeMod.delete(store, key, () => {
            count += 1;
            // 清除完成，调用成功回调
            if (count === keys.length) {
                callback();
            }
        }, (err) => {
            // 保证失败回调只调用一次
            if (!noErr) {
                return;
            }
            noErr = false;
            onerror(errorCallback, storeMod.CLEAR, "", err);
        })
    }
}

// 重写模块方法

// load模块添加 isWXMinigame 方法
Object.assign(load, { isWXMinigame });

// store 模块方法重写
Object.assign(store, {
    init: storeInit,
    read: storeRead,
    clear: storeClear,
    write: storeWrite,
    delete: storeDelete,
    iterate: storeIterate
});
