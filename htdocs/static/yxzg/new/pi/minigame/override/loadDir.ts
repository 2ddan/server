/**
 * 重载 util 模块 的 loadDir 函数
 */
// 导入 ==============================
import * as wutil from '../../widget/util';
import * as util from '../../gui_virtual/util';
import { Json } from '../../lang/type';
import { load, store, depend } from '../../lang/mod';
import { downloadFile } from '../download';
import { autoRegisterWidget } from '../../gui_virtual/util';

const { listDirFile } = util;

declare var winit;

// 本地 ==============================
const imageSuf = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

const sortFiles = (dirs: string[], flags: Json, resultMap: Json, suffixCfg: Json, withOut: Function) => {
    const suffixMap: Map<string, FileInfo[]> = new Map();
    listDirFile(dirs, flags, [], suffixMap, resultMap, suffixCfg, withOut);

    const image = [];
    const other = [];
    suffixMap.forEach((v, k) => {
        if (imageSuf.indexOf(k) >= 0) {
            image.push(...v);
        } else {
            other.push(...v);
        }
    });

    return {
        fileList: [...image, ...other],
        suffixMap: suffixMap,
        image, other
    };
};

const MAX_DOWNLOAD_SAMETIME = 10;                   // 一批下载的最大并发量(微信小游戏网络请求的最大并发量为10，所以取10)
const MAX_FAILURE_TIMES_PER_RES = 3;                // 下载失败的文件最多可下载次数

interface FileInfo {
    path: string;
    sign: string;
    size: number;
}
/**
 * 批量下载文件
 * @param waiting 需要下载的文件的信息数组
 * @param success 成功回调
 * @param fail 失败回调
 * @param process 进度监控，process(已下载文件数量，总共需要下载的文件数量)
 */
const downFiles = (waiting: FileInfo[], success: Function, fail: Function, process?: Function) => {
    process || (process = () => 0);
    const total = waiting.length;

    const loading = [];
    const failFiles = {};
    const doneFiles = [];
    const localSign = {};

    const lstore = load.getStore();
    const complete = () => {
        if (doneFiles.length === total) {
            success(doneFiles);
        } else {
            fail(failFiles);
        }
        if (Object.keys(localSign).length > 0) {
            localStorage.localSign = Object.assign(localStorage.localSign, localSign);
            store.read(lstore, '', (data) => {
                Object.assign(data, localSign);
                store.write(lstore, '', data, () => {
                    console.warn('localSign write success');
                }, (err) => {
                    console.warn('localSign write fail', err);
                })
            }, (err) => {
                console.warn('localSign read fail', err);
            });
        }
    };

    const downStart = () => {
        while (loading.length < MAX_DOWNLOAD_SAMETIME && waiting.length > 0) {
            const t = waiting.splice(0, 1)[0];
            const { path, size, sign } = t;
            if (load.isLocal(path)) {
                doneFiles.push(t);
                process(doneFiles.length, total)
                if (!loading.length && !waiting.length) {
                    complete();
                }
                continue;
            }

            loading.push(t);
            const save = ((localStorage.dbSize + size) < winit.limitSize);
            save && (localStorage.dbSize += size);
            downloadFile(path, save, (res) => {
                if (save) {
                    localSign[path] = sign;
                    lstore.files[path] = true;
                } else {
                    lstore.tmpFileMap[path] = {
                        sign: sign,
                        path: res.filePath
                    };
                }
                const idx = loading.indexOf(t);
                loading.splice(idx, 1);
                downStart();
                doneFiles.push(t);
                process(doneFiles.length, total);
                if (!loading.length && !waiting.length) {
                    complete();
                }
            }, (err) => {
                const idx = loading.indexOf(t);
                loading.splice(idx, 1);
                failFiles[path] = {
                    error: err,
                    count: (failFiles[path] ? failFiles[path].count + 1 : 1)
                }
                if (failFiles[path].count <= MAX_FAILURE_TIMES_PER_RES) {
                    waiting.push(t);
                }
                downStart();
                if (!loading.length && !waiting.length) {
                    complete();
                }
                save && (localStorage.dbSize -= size);
                process(doneFiles.length, total);
            })
        }
    };

    downStart();
}

/*
 * 为小游戏重写的loadDir函数
 * 现组件相关文件都通过load模块下载，故注册组件放到load模块下载的成功回调中
 */
const loadDir = (
    dirs: string[], flags: Json, resultMap: any, suffixCfg: any,
    successCallback: Function, errorCallback: Function,
    processCallback?: Function, withOut?: Function
): Json => {
    const { fileList, suffixMap, other, image } = sortFiles(dirs, flags, resultMap, suffixCfg, withOut);
    processCallback || (processCallback = () => {});
    const p1 = new Promise((resolve, reject) => {
        const down = load.create(other, (fileMap) => {
            // 将组件注册进widgetMap
            autoRegisterWidget(fileMap, suffixMap);
            resolve();
        }, (err) => {
            reject(err);
        });
        down.fileTab = resultMap || {};
        load.start(down);
    });

    const arr = filterTmpFile(image);
    console.log("image: %d, other: %d", arr.length, other.length);
    processCallback({ type: 'loadStart', loadAmount: 0, downAmount: arr.length })
    const p2 = new Promise((resolve, reject) => {
        if (!arr.length) {
            processCallback({ type: 'loadDirCompleted' });
            resolve();
        } else {
            downFiles(arr, (files) => {
                processCallback({ type: 'loadDirCompleted' });
                // 将组件注册进widgetMap
                // readWidgetFiles(suffixMap, () => {
                //     resolve();
                // }, (err) => {
                //     reject(err);
                // });
                const lstore = load.getStore();
                localStorage.tmpFileMap = lstore.tmpFileMap;
                resolve();
                // successCallback(files, [], suffixMap);
            }, (err) => {
                reject(err);
            }, (count, total) => {
                processCallback({ type: 'downFile', total, count })
            });
        }
    });

    Promise.all([p1, p2]).then(() => {
        successCallback(fileList, []);
    }, (err) => {
        errorCallback(err);
    });
};

const filterTmpFile = (arr: FileInfo[]) => {
    const result: FileInfo[] = [];
    const { tmpFileMap } = load.getStore();
    for (const item of arr) {
        const tmp = tmpFileMap[item.path];
        const info = depend.get(item.path);
        if (!tmp || !info || tmp.sign !== info.sign) {
            result.push(item);
        }
    }
    return result;
};

const readWidgetFiles = (suffixMap: Map<string, any[]>, callback: Function, errCb?: Function) => {
    const cfg     = suffixMap.get('cfg');
    const wcss    = suffixMap.get('wcss');
    const widget  = suffixMap.get('widget');
    const lstore  = load.getStore();
    const files   = [];
    const waiting = [];
    const fileMap = {}
    cfg    && files.push(...cfg);
    wcss   && files.push(...wcss);
    widget && files.push(...widget);
    if (files.length === 0) {
        return callback();
    }
    files.forEach(({path}) => {
        const p = new Promise((resolve, reject) => {
            store.read(lstore, path, (data) => {
                fileMap[path] = data;
                resolve([path, data])
            }, (err) => {
                reject(err);
            });
        });
        waiting.push(p);
    })
    Promise.all(waiting)
        .then(() => {
            autoRegisterWidget(fileMap, suffixMap);
            callback();
        })
        .catch((err) => { errCb && errCb(err) });
}

// 立即执行 ===============

// 导出 ===================
Object.assign(util, { loadDir });
Object.assign(wutil, { loadDir });
