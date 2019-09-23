/*
 * store模块写文件时用到的写文件队列
 */

import { writeFile } from '../filemanager';

declare var winit;

interface FileInfo {
    data: ArrayBuffer|Uint8Array;
    path: string;
    sign: string;
}

export class WriteFileQueue {
    constructor(lstore) {
        this.store = lstore;
    }
    private store = null;
    private concurrent = 0;
    private max_concurrent = 1;
    private queue = new Map<string, FileInfo>();

    private timer: number = null;
    private delay: number = 50; // 写入一个文件后，等待该毫秒后再写入后续文件

    private signMap = {}        // {path: sign}

    private write(path: string, data: ArrayBuffer|Uint8Array) {
        console.log("=========== Write File:", this.queue.size, path);
        localStorage.dbSize += data.byteLength;
        if (ArrayBuffer.isView(data)) {
            data = data.slice().buffer;
        }
        writeFile(path, data, () => {
            this.oneFileComplete();
            this.store.files[path] = true;
            this.store.db[""][path] = this.signMap[path];
            delete this.store.db[path];
            localStorage.localSign = Object.assign(localStorage.localSign, this.signMap);
        }, () => {
            this.oneFileComplete();
            delete this.signMap[path];
            localStorage.dbSize -= data.byteLength;
        });
    }

    private oneFileComplete() {
        this.concurrent--;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.writeNext();
        }, this.delay);
    }

    private allFilesComplete() {
        clearTimeout(this.timer);
        console.log("write file queue is clean");
    }

    private writeNext() {
        while (this.concurrent < this.max_concurrent) {
            const { value, done } = this.queue.keys().next();
            if (done) {
                this.allFilesComplete();
                return;
            }
            const info = this.queue.get(value);
            this.queue.delete(value);
            if (info) {
                this.concurrent++;
                const { path, data, sign } = info;
                if (data.byteLength + localStorage.dbSize > winit.limitSize) {
                    return this.allFilesComplete();
                };
                this.signMap[path] = sign;
                this.write(path, data);
            }
        }
    }

    start() {
        if (this.timer) { return; }
        console.log("store write start", this.queue.size);
        this.writeNext();
    }

    add(path: string, data: FileInfo) {
        this.queue.set(path, data);
    }
}
