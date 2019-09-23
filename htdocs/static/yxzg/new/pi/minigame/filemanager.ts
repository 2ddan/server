/**
 * 微信小游戏文件相关接口封装
 */

declare var wx, exports, pi_modules;

// 本地用户文件根目录
const root = `${wx.env.USER_DATA_PATH}/`;
const localFlag = '://';

// 文件系统对象
const fs = wx.getFileSystemManager();

/**
 * 格式化目录，目标格式为"example/"
 */
const formatDir = (dir: string) => {
    if (dir[0] === "/") {
        dir.slice(1);
    }
    if (dir[dir.length - 1] !== "/") {
        dir += "/";
    }
    return dir;
};

/**
 * 获取path在根目录下的完整URL
 */
export const fullLocalPath = (path: string) => {
    if (path.startsWith("/")) {
        path = path.slice(1);
    }
    if (path.search(localFlag) === -1) {
        path = root + path;
    }
    return path;
};

/**
 * 判断path对应的文件是否存在
 */
export const isFileExist = (path: string) => {
    path = fullLocalPath(path);
    try {
        fs.accessSync(path);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * 为即将下载的文件准备目录，防止不能存储
 */
export const prepareDir = (fileName: string) => {
    fileName = fileName.replace(root, '');
    if (fileName.startsWith("/")) {
        fileName.slice(1);
    }

    if (navigator.platform === "devtools") {
        let i = 0;
        while ((i = fileName.indexOf("/", i + 1)) >= 0) {
            let dir = `${fileName.slice(0, i)}`;
            dir = fullLocalPath(dir);
            if (!isFileExist(dir)) {
                fs.mkdirSync(dir);
            }
        }
    } else {
        // 在开发者工具中该方法报错，真机上可用
        const idx = fileName.lastIndexOf("/");
        if (idx !== -1) {
            fileName = fileName.slice(0, idx);
        }
        fileName = fullLocalPath(fileName);
        if (!isFileExist(fileName)) {
            fs.mkdirSync(fileName, true);
        }
    }

};

/**
 * 递归删除指定目录及该目录下的所有文件
 * @param dir 要删除的目录，如不指定，则默认删除根目录下的所有文件及文件夹
 */
export const clearDir = (dir = root) => {
    try {
        // 根目录不能删除(无权限)，只能删除根目录下的文件及文件夹
        if (fullLocalPath(dir) === root) {
            const files = fs.readdirSync(root);
            files.forEach((file) => {
                file = `${root}${file}`;
                if (fs.statSync(file).isFile()) {
                    fs.unlinkSync(file);
                } else {
                    fs.rmdirSync(file, true);
                }
            });
        } else {
            dir = fullLocalPath(dir);
            fs.rmdirSync(dir, true);
        }
    } catch (err) {
        console.warn("clearDirSync:", dir, err);
    }
};

interface UserFileList {
    dir: string[],
    file: string[],
    err?: any
}
/**
 * 列出目录下的所有文件及文件夹
 * @param dirPath 需要列出文件的目录，不传则默认列出根目录下的所有文件及文件夹
 */
export const listUserFiles = (dirPath = root) => {
    const userFiles: UserFileList = { dir: <string[]>[], file: [], err: undefined };
    const listFiles = (dir) => {
        dir = formatDir(dir);
        try {
            const files = fs.readdirSync(dir);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (fs.statSync(dir + file).isDirectory()) {
                    userFiles.dir.push(dir + file);
                    listFiles(dir + file);
                } else {
                    userFiles.file.push(dir + file);
                }
            }
        } catch (err) {
            userFiles.err = err;
        }
        return userFiles;
    };
    return listFiles(dirPath);
};

enum Status {
    OK = "OK",
    ERR = "ERR"
}
/**
 * 同步读取本地文件内容
 */
export const readFileSync = (path: string, encoding?: string) => {
    path = fullLocalPath(path);
    try {
        const data: string|ArrayBuffer = fs.readFileSync(path, encoding);
        return {
            data,
            status: Status.OK
        };
    } catch (err) {
        return {
            status: Status.ERR,
            msg: <string>err.message
        };
    }
};
readFileSync.status = Status;

/**
 * 读取文件内容
 * @param path 文件路径
 * @param cb 成功回调，参数为读出来的文件内容
 * @param errCb 失败回调
 * @param encoding 编码方式，如果不传该参数，则读取的数据是 ArrayBuffer
 */
export const readFile = (path: string, cb?: Function, errCb?: Function, encoding?: string) => {
    path = fullLocalPath(path);
    fs.readFile({
        encoding,
        filePath: path,
        success(res) {
            cb && cb(res.data);
        },
        fail(err) {
            err.path = path;
            errCb && errCb(err);
        }
    });
};

/**
 * 获取文件信息
 * @param path 文件路径
 * @param cb 成功回调
 * @param errCb 失败回调
 */
export const getFileInfo = (path: string, cb: Function, errCb?: Function) => {
    path = fullLocalPath(path)
    fs.stat({
        path,
        success({ stats }) {
            cb({ path, stats })
        },
        fail(err) {
            err.path = path
            errCb && errCb(err)
        }
    })
}

/**
 * 获取文件信息(同步)
 * @param path 文件路径
 */
export const getFileInfoSync = (path: string) => {
    path = fullLocalPath(path)
    try {
        return fs.statSync(path)
    } catch (e) {
        return e
    }
}

// 写文件
export const writeFile = (filePath: string, data: string|ArrayBuffer, success?: Function, fail?: Function, encoding?:string) => {
    prepareDir(filePath)
    fs.writeFile({
        filePath: fullLocalPath(filePath),
        data,
        encoding,
        success,
        fail
    });
}

// 同步写文件
export const writeFileSync = (filePath: string, data: string|ArrayBuffer) => {
    prepareDir(filePath)
    fs.writeFileSync(fullLocalPath(filePath), data)
}

// 删除文件
export const deleteFile = (filePath: string, cb?: Function, errCb?: Function) => {
    fs.unlink({
        filePath: fullLocalPath(filePath),
        success: cb,
        fail: errCb
    })
}

// 同步删除文件
export const deleteFileSync = (filePath: string)=> {
    fs.unlinkSync(fullLocalPath(filePath))
}

pi_modules['pi/minigame/filemanager'] = { exports };
