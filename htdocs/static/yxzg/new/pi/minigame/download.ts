import { ajax, depend as dependMod } from '../lang/mod'
import { readFileSync, writeFile, fullLocalPath, prepareDir } from './filemanager';

declare var winit, wx;
// 固定配置
const remoteDependURL = `${winit.domains[0]}${winit.path}miniGame_depend?${Math.random()}`;
const dependFile = fullLocalPath("depend");
const fileNameMap = fullLocalPath("fileNameMap");

// 小游戏网络请求最大并发量为10
const MAX_DOWNLOAD_SAMETIME = 10;   // 最大同时下载的文件数量
const MAX_FAILURE_TIMES_PER_RES = 3 // 每个文件最大允许出错次数

// 本地变量

let allResSize = 0;                 // 所有资源大小
let downloadedSize = 0              // 已经下载的大小
const limitSize = 45 * 1024 * 1024  // 文件下载到本地用户目录下的大小限制，超过该限制后的文件将下载到本地临时目录
const depend = {};                  // 服务器上的depend内容
const localDepend = {};             // 本地保存的depend内容
const loading = [];                 // 正在下载的文件名数组
const waiting = [];                 // 需要下载的文件名数组
const fileName2LocalFileURL = {};   // 资源文件名和该资源在本地的路径对照表

// 进度
let process = (done, waiting) => {
    console.log("下载进度: " + done * 100 / (done + waiting) + "%");
};

export const getLocalURL = (fileName) => {
    return fileName2LocalFileURL[fileName];
}

// 请求服务器上的depend文件内容
export const requestDepend = () => {
    console.log(remoteDependURL);
    return new Promise((resolve, reject) => {
        ajax.get(remoteDependURL, undefined, undefined, ajax.RESP_TYPE_JSON, 0, data => {
            Object.assign(depend, data);
            waiting.push(...Object.keys(depend));
            resolve(depend);
        }, err => {
            reject(err);
        });
    });
};

// 获取本地保存的depend文件内容
const getLocalDepend = () => {
    if (localStorage.dependFile) {
        let data = readFileSync(localStorage.dependFile, 'utf8');
        data = JSON.parse(<string>data.data);
        Object.assign(localDepend, data);
    }
};

// 获取文件名和本地文件路径对照表
const getFileNameMap = () => {
    if (localStorage.fileNameMap) {
        let data = readFileSync(localStorage.fileNameMap, 'utf8');
        data = JSON.parse(<string>(data.data));
        Object.assign(fileName2LocalFileURL, data);
    }
}

const downloadFailFiles = {};
// 开始下载资源文件
export const downStart = (complete) => {
    while (loading.length < MAX_DOWNLOAD_SAMETIME && waiting.length > 0) {

        const t = waiting.splice(0, 1)[0];
        const fileSize = depend[t].size;
        if (localDepend[t] && depend[t].sign === localDepend[t].sign && fileName2LocalFileURL[t]) {
            downloadedSize += fileSize;
            process(downloadedSize, allResSize - downloadedSize)
            if (!waiting.length && !loading.length) {
                complete && complete(fileName2LocalFileURL, downloadFailFiles);
            }
            continue;
        }
        loading.push(t);
        const save = ((downloadedSize + fileSize) < limitSize);
        downloadFile(t, save, res => {
            fileName2LocalFileURL[t] = res.filePath;
            // localDepend只存储保存到本地用户目录下的文件的信息
            save && (localDepend[t] = depend[t]);
            const i = loading.indexOf(t);
            loading.splice(i, 1);
            downStart(complete);
            // console.log(Object.keys(fileName2LocalFileURL).length, waiting.length, loading.length);
            if (waiting.length == 0) {
                console.log(loading);
            }
            // process(Object.keys(fileName2LocalFileURL).length,waiting.length,null);
            downloadedSize += fileSize;
            process(downloadedSize, allResSize - downloadedSize);
            if (!loading.length && !waiting.length) {
                complete && complete(fileName2LocalFileURL, downloadFailFiles)
                writeFile(fileNameMap, JSON.stringify(fileName2LocalFileURL), () => {
                    console.log("s", fileNameMap);
                    localStorage.fileNameMap = fileNameMap;
                }, e => {
                    console.warn("write fileNameMap fail:", e);
                });
                writeFile(dependFile, JSON.stringify(localDepend), r => {
                    console.log("f", r);
                    localStorage.dependFile = dependFile;
                }, e => {
                    console.warn("write dependFile fail:", e);
                });
            }
        }, err => {
            const i = loading.indexOf(t);
            loading.splice(i, 1);
            downloadFailFiles[t] = {
                error: err,
                count: (downloadFailFiles[t] ? downloadFailFiles[t].count + 1 : 1)
            }
            if (downloadFailFiles[t].count <= MAX_FAILURE_TIMES_PER_RES) {
                waiting.push(t)
            }
            downStart(complete);
            console.log(t, err);
            if (!loading.length && !waiting.length) {
                complete && complete(fileName2LocalFileURL, downloadFailFiles);
            }
            downloadedSize -= fileSize;
            // console.log(downloadedSize, allResSize, downloadedSize/allResSize*100)
            process(downloadedSize, allResSize - downloadedSize);
        });
    }
};

// 构造执行depend.init所需格式参数
const buildDepend = (r) => {
    const dpd = [];
    for (const k in r) {
        const size = r[k].size;
        allResSize += size;
        dpd.push({
            path: k,
            sign: r[k].sign,
            size: size
        });
    }
    console.log("all Res size:", allResSize)
    dependMod.init(dpd);
}

// 下载资源文件
/**
 * fileName                     // 下载的文件名，可以是完整的URL，也可以是不带domains的字符串
 * save                         // boolean, 是否根据fileName保存成本地用户文件
 * success(res)                 // 成功回调
 * fail(err)                    // 失败回调
 * progress(p)                  // 下载进度变化回调
 */
export const downloadFile = (fileName: string, save?: boolean, success?: Function, fail?: Function, progress?: Function) => {
    let domainsIdx = 0,
        filePath = undefined;

    if (save) {
        filePath = fullLocalPath(fileName);
        prepareDir(filePath);
    }

    const down = () => {
        const url = `${winit.domains[domainsIdx]}${winit.path}${fileName}`;
        const task = wx.downloadFile({
            url,
            filePath: filePath,
            success(res) {
                res.url = url;
                if (!res.filePath) {
                    res.filePath = res.tempFilePath;
                }
                if (res.statusCode === 404) {
                    domainsIdx += 1;
                    if (winit.domains[domainsIdx]) {
                        down();
                    } else {
                        fail && fail({
                            url,
                            errMsg: "downloadFile: 404"
                        });
                    }
                } else {
                    success && success(res);
                }
            },
            fail(err) {
                domainsIdx += 1;
                if (winit.domains[domainsIdx]) {
                    down();
                } else {
                    err.url = url;
                    fail && fail(err);
                }
            }
        });

        progress && task.onProgressUpdate(progress);
    };
    down();
};

// 准备进入游戏所需资源
export const prepareRes = (p) => {
    p && (process = p);
    return requestDepend()
        .then(buildDepend)
        .then(getLocalDepend)
        .then(getFileNameMap)
        .then(() => {
            return new Promise((resolve, reject) => {
                downStart((res, failRes) => {
                    if (failRes.length) {
                        reject(failRes);
                    } else {
                        resolve(res);
                    }
                })
            });
        });
}
