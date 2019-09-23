// 导入 =================================
import { load, store } from '../lang/mod';
import { Json } from '../lang/type';
import { utf8Decode } from '../util/util';
import { loadDir } from '../widget/util';
import { bin2Json } from './readJsonBin';

// 本地 =================================
// 是否在微信小游戏环境中
const isWXMiniGame = load.isWXMiniGame();
const replaceImagePath = isWXMiniGame ?
    pi_modules['pi/minigame/adapter'].exports.replaceImagePath :
    undefined;

interface CharInfoMap {
    dir: string;
    frequencyChar: string[];
    otherChar: string[];
    otherJsonFile: string[];
}

interface CanvasInfo {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    curlineHeight: number;
    curXOffset: number;
    curYOffset: number;
}

interface FontMap {
    canvasInfo: CanvasInfo;
    chars: Json;
    common: Json;
    fontName: string;
}

// const charsetMap = {
//     frequency: undefined,
//     other: undefined
// };

const allFontMap = new Map<string, FontMap>(); // <fontName, fontMap>
const allCharsetMap = new Map<string, Json>(); // <fontName, CharsetMap>
const allCharInfoMap = new Map<string, CharInfoMap>(); // <fontName, CharInfoMap>
const getFontMap = (fontName: string) => {
    let fontMap: FontMap;
    if (allFontMap.has(fontName)) {
        fontMap = allFontMap.get(fontName);
    } else {
        fontMap = {
            canvasInfo: {
                canvas: undefined,
                curlineHeight: 0,
                curXOffset: 0,
                curYOffset: 0,
                width: defaultWidth,
                height: defaultHeight
            },
            chars: {},
            common: undefined,
            fontName: fontName
        };
        initFontCanvas(fontMap);
        allFontMap.set(fontName, fontMap);
    }

    return fontMap;
};
const getCharsetMap = (fontName: string) => {
    let charsetMap;
    if (allCharsetMap.has(fontName)) {
        charsetMap = allCharsetMap.get(fontName);
    } else {
        charsetMap = { frequency: undefined };
        allCharsetMap.set(fontName, charsetMap);
    }

    return charsetMap;
};
const getCharInfoMap = (fontName: string) => {
    let charInfoMap: CharInfoMap;
    if (allCharInfoMap.has(fontName)) {
        charInfoMap = allCharInfoMap.get(fontName);
    } else {
        charInfoMap = {
            dir: '',
            frequencyChar: [],
            otherChar: [],
            otherJsonFile: []
        };
        fontName && allCharInfoMap.set(fontName, charInfoMap);
    }
    
    return charInfoMap;
};

/**
 * 获取字体总配置文件文件
 * 默认不同字体放在不同文件夹下，每个文件夹下也只有一个字体
 * @param dir 构建出的字体相关文件所在文件夹
 * @param callback 成功回调
 * @example getJsonConfig('dist/', (charsetMap) => {}, (err) => {})
 */
const getJsonConfig = (dir: string, callback: (chars: any) => {}, errCallback: Function) => {
    const charInfoMap = getCharInfoMap('');
    if (!dir) {
        dir = '';
    } else if (!dir.endsWith('/')) {
        dir += '/';
    }
    fetchFontCharInfo(dir, (info) => {
        fetchFontJsonBin(dir, info, (data) => {
            const [charset, fontName] = dealBinFiles(dir, data);
            if (charset.frequency) {
                loadImages(charset.frequency.pages, fontName, (imgs) => {
                    charset.frequency.pages = imgs;
                    dealImgOfCharset(charset.frequency);
                    callback(charset);
                }, errCallback);
            } else {
                callback(charset);
            }
        }, errCallback);
    }, errCallback);
    charInfoMap.dir = dir;
};

const dealImgOfCharset = (charset: any, fontMap?: FontMap) => {
    const { pages, chars } = charset;
    Object.keys(chars).forEach((id) => {
        const char = chars[id];
        const idx = char.page;
        if (typeof idx === 'object') return;
        char.page = pages[idx];
        fontMap && fontMap.chars[id] && (fontMap.chars[id].page = pages[idx]);
    });
};

const fetchFontCharInfo = (dir: string, callback: Function, errCallback?: Function) => {
    if (!callback) return new Error('no callback');

    if (!dir.endsWith('/')) { dir += '/'; }
    const path = `${dir}char_info.json`;
    loadDir([path], {}, {}, { json: 'download' }, (data) => {
        const getJsonBin = (data: ArrayBuffer) => {
            const jsonString = utf8Decode(data);
            const info = JSON.parse(jsonString);
            callback(info);
        };

        if (!data[path]) {
            const lstore = load.getStore();
            store.read(lstore, path, (data) => {
                getJsonBin(data);
            }, (err) => {
                errCallback && errCallback(err);
            });

            return;
        }
        getJsonBin(data[path]);
    }, (err) => {
        errCallback && errCallback(err);
    });
};

/**
 * 从store中读取文件
 */
const readStore = (fileList: string[], callback: Function, errCallback?: Function) => {
    const lstore = load.getStore();
    const wait = [];
    fileList.forEach((file) => {
        const p = new Promise((resolve, reject) => {
            store.read(lstore, file, (data) => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
        wait.push(p);
    });
    Promise.all(wait).then((data) => {
        callback(data);
    }).catch((err) => {
        errCallback(err);
    });
};

/**
 * 下载字体的二进制配置文件
 */
const fetchFontJsonBin = (dir: string, info: any, callback: Function, errCallback: Function) => {
    const jsonBinFiles = [];
    Object.keys(info).forEach((k) => {
        jsonBinFiles.push(`${dir}${k}.json.bin`);
    });
    jsonBinFiles.push(`${dir}frequency.json.bin`);
    loadDir(jsonBinFiles, {}, {}, { bin: 'download' }, (data) => {
        if (Object.keys(data).length !== jsonBinFiles.length) {
            callback(data);

            return;
        }
        readStore(jsonBinFiles, (arrbufArr) => {
            const json = {};
            jsonBinFiles.forEach((file, idx) => {
                json[file] = arrbufArr[idx];
            });
            callback(json);
        }, (err) => {
            errCallback(err);
        });
    }, (err) => {
        errCallback(err);
    });
};

/**
 * 读取二进制文件的内容并作相应处理
 */
const dealBinFiles = (dir: string, data: any) => {
    let map: Json;
    let name: string;
    Object.keys(data).forEach((k) => {
        const buf = data[k];
        k = k.replace(dir, '').replace('.json.bin', '');
        const char = bin2Json(buf);

        const fontName = char.info.face;

        const charsetMap = getCharsetMap(fontName);
        const charsetInfo = { chars: {}, pages: [] };
        char.chars.forEach((c) => {
            if (!c) return;
            charsetInfo.chars[c.id] = c;
        });
        charsetInfo.pages.push(...char.pages);
        charsetMap[k] = charsetInfo;

        const charInfoMap = getCharInfoMap(fontName);
        charInfoMap.dir === dir || (charInfoMap.dir = dir);
        const { charset } = char.info;
        if (k === 'frequency') {
            charInfoMap.frequencyChar = charset;
            map = charsetMap;
            name = fontName;
        } else {
            charInfoMap.otherJsonFile.push(k);
            charInfoMap.otherChar.push(...charset);
        }
    });

    return [map, name];
};

/**
 * 加载字体json文件里pages中的图片文件
 */
const loadImages = (imgs: string[], fontName: string, callback: Function, errCallback: Function) => {
    let count = 0;
    let reportedError = false;
    const len = imgs.length;
    const imageNodes = [];
    const charInfoMap = getCharInfoMap(fontName);
    imgs = imgs.map((img) => charInfoMap.dir + img);
    loadDir(imgs, {}, {}, { png: 'download' }, (data) => {
        imgs.forEach((img, idx) => {
            const node = new Image();
            node.onload = () => {
                ++count;
                if (count !== len) return;
                callback(imageNodes);
            };
            imageNodes[idx] = node;
            node.onerror = (err) => {
                if (!reportedError) return;
                reportedError = true;
                errCallback(err, img);
            };
            if (replaceImagePath) {
                replaceImagePath(img, (url) => {
                    node.src = url
                }, errCallback);
            } else if (data[img]) {
                const blob = new Blob([data[img]]);
                node.src = URL.createObjectURL(blob);
            } else {
                const lstore = load.getStore();
                store.read(lstore, img, (arrBuf) => {
                    const blob = new Blob([arrBuf]);
                    node.src = URL.createObjectURL(blob);
                }, (err) => {
                    errCallback(err, img);
                });
            }
        });
    }, errCallback);
};

/**
 * 按照字符串顺序返回字符串在canvas上的位置信息
 */
const getCharsPosition = (str: string|number[], fontMap: FontMap) => {
    const pos = [];
    const { chars } = fontMap;
    let charArr: number[]|string[];
    if (typeof str === 'string') {
        charArr = str.split('');
    } else {
        charArr = str;
    }
    charArr.forEach((char, idx) => {
        const charCode = typeof char === 'string' ? char.charCodeAt(0) : char;
        const info = chars[charCode];
        if (info) {
            pos[idx] = info;
        } else {
            pos[idx] = {
                id: charCode,
                advance: 0,
                x: 0,
                y: 0,
                xoffset: 0,
                yoffset: 0,
                width: 0,
                height: 0
            };
        }
    });
    
    return pos;
};

/**
 * 将需要的文字绘制到特定canvas上
 * @param str       要用到的字符组成的字符串或字符unicode码的数组
 * @param callback  生成完成回调(canvas: HTMLCanvasElement, updatedCharCodeArr: Uint32Array)
 * @example buildFont('string I want use', 'fontName', (canvas, [renderCharCode: Uint32Array]) => {}) => [CharInfo]
 */
const buildFont = (
    str: string|number[], fontName: string,
    callback: (canvas:HTMLCanvasElement, chars: ArrayBuffer) => void,
    errCallback?: Function
) => {
    let resizeCanvas = false;
    let needFetchImage = false;
    const waitChars: number[] = [];
    const failChars: number[] = [];
    const fontMap = getFontMap(fontName);
    const tmpFontMap = <FontMap>deepCopy(fontMap);
    tmpFontMap.canvasInfo.canvas = fontMap.canvasInfo.canvas;

    const doRender = () => {
        renderCanvas(waitChars, tmpFontMap, resizeCanvas);
        allFontMap.set(fontName, tmpFontMap);
        const arrbuf = new ArrayBuffer(waitChars.length * 4);
        const u32 = new Uint32Array(arrbuf);
        waitChars.forEach((code, idx) => {
            u32[idx] = code;
        });
        callback(tmpFontMap.canvasInfo.canvas, u32);
    };
    const charArr = typeof str === 'string' ? str.split('') : str;
    charArr.forEach((char) => {
        let charset: any;
        // const code = typeof char === 'string' ? char.charCodeAt(0) : char;
        let code: number;
        if (typeof char === 'string') {
            code = char.charCodeAt(0);
        } else {
            code = char;
            char = String.fromCharCode(code);
        }
        if (tmpFontMap && tmpFontMap.chars[code]) return;

        const charsetMap = getCharsetMap(fontName);
        const charInfoMap = getCharInfoMap(fontName);
        if (charInfoMap.frequencyChar.indexOf(char) > -1) {
            charset = charsetMap.frequency;
        } else if (charInfoMap.otherChar.indexOf(char) > -1) {
            const fileName = getCharInWhichJson(char, charInfoMap.otherJsonFile);
            charset = charsetMap[fileName];
            if (typeof charset.pages[0] === 'string') {
                needFetchImage = true;
                loadImages(charset.pages, fontName, (imgs) => {
                    charset.pages = imgs;
                    dealImgOfCharset(charset, tmpFontMap);
                    doRender();
                }, errCallback);
            }
        } else {
            failChars.push(code);

            return;
        }
        const result = calcCharPos(code, tmpFontMap, charset);
        // 不再扩大canvas
        if (result === null) {
            failChars.push(code);
        } else {
            waitChars.push(code);
        }
        if (result) { resizeCanvas = result; }
    });
    if (!needFetchImage) {
        doRender();
    }

    return getCharsPosition(str, tmpFontMap);
};

const renderCanvas = (charCodeArr: number[], fontMap: FontMap, resizeCanvas: boolean) => {
    const { chars, canvasInfo } = fontMap;
    const { canvas } = canvasInfo;
    if (!resizeCanvas) {
        charCodeArr.forEach((charCode) => {
            const { width, height, x, y, page, oix, oiy } = chars[charCode];
            const ctx = canvas.getContext('2d');
            ctx.drawImage(page, oix, oiy, width, height, x, y, width, height);
        });

        return;
    }
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.id = canvas.id;
    tmpCanvas.width = canvasInfo.width;
    tmpCanvas.height = canvasInfo.height;
    const ctx = tmpCanvas.getContext('2d');
    Object.keys(chars).forEach((id) => {
        const { width, height, x, y, page, oix, oiy } = chars[id];
        if (!page || typeof page === 'number') return;
        ctx.drawImage(page, oix, oiy, width, height, x, y, width, height);
    });
    canvasInfo.canvas = tmpCanvas;
};

/**
 * 深拷贝
 */
const deepCopy = (src: Json) => {
    const result = {};
    Object.keys(src).forEach((k) => {
        if (typeof src[k] === 'object') {
            result[k] = deepCopy(src[k]);
        } else {
            result[k] = src[k];
        }
    });

    return result;
};

const calcCharPos = (char: string|number, fontMap: FontMap, charset: Json) => {
    let resizeCanvas = false;

    const charCode = typeof char === 'string' ? char.charCodeAt(0) : char;
    const { canvasInfo, chars } = fontMap;
    const { width, height } = canvasInfo;
    const charInfo = charset.chars[charCode] || chars[charCode];
    const newline = charInfo.width + canvasInfo.curXOffset > width;
    let contextHeight = charInfo.height + canvasInfo.curYOffset;
    if (newline) {
        contextHeight += canvasInfo.curlineHeight;
    }
    if (height < contextHeight) {
        // 不再扩大canvas
        return null;
        // 需扩大并重新绘制canvas，重新计算所有字符位置
        canvasInfo.width *= 2;
        canvasInfo.height *= 2;
        canvasInfo.curXOffset = 0;
        canvasInfo.curYOffset = 0;
        canvasInfo.curlineHeight = 0;

        resizeCanvas = true;
        Object.keys(chars).forEach((c) => {
            calcCharPos(chars[c].id, fontMap, charset);
        });
    }
    let x = 0, y = 0;
    if (newline) {
        x = 0;
        y = canvasInfo.curYOffset + canvasInfo.curlineHeight;
        canvasInfo.curlineHeight = charInfo.height;
        canvasInfo.curXOffset = charInfo.width;
        canvasInfo.curYOffset = y;
    } else {
        x = canvasInfo.curXOffset;
        y = canvasInfo.curYOffset;
        canvasInfo.curXOffset += charInfo.width;
    }
    if (canvasInfo.curlineHeight < charInfo.height) {
        canvasInfo.curlineHeight = charInfo.height;
    }
    const oix = charInfo.oix === undefined ? charInfo.x : charInfo.oix;
    const oiy = charInfo.oiy === undefined ? charInfo.y : charInfo.oiy;
    const item = { ...charInfo,  x, y, oix, oiy };
    chars[charCode] = item;

    return resizeCanvas;
};

/**
 * 查找字符在那个不常用json文件内
 * @param char      要查找的字符串
 * @param jsonFiles 不常用字符串json文件名列表，其格式为"start_end"
 *                  其中start为该json文件中最小的unicode编码值，end为最大值
 */
const getCharInWhichJson = (char: string, jsonFiles: string[]) => {
    const charCode = char.charCodeAt(0);
    let fileName = '';
    for (const file of jsonFiles) {
        const [s, e] = file.split('_');
        const start = parseInt(s, 10);
        const end = parseInt(e, 10);
        if (charCode >= start && charCode <= end) {
            fileName = file;
            break;
        }
    }

    return fileName;
};

/**
 * 初始化绘制字体的canvas
 * @param width     宽(最好为2的幂)
 * @param height    高(最好为2的幂)
 */
const initFontCanvas = (fontMap: FontMap) => {
    const { width, height } = fontMap.canvasInfo;
    const id = `__${fontMap.fontName}_fontCanvas__`;
    let canvas = <HTMLCanvasElement>document.getElementById(id);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = id;
    }
    canvas.width = width;
    canvas.height = height;

    if (fontMap && fontMap.canvasInfo && fontMap.canvasInfo.canvas) return;

    fontMap.canvasInfo.canvas = canvas;
};

// 导出 =============================
export { buildFont, getJsonConfig };

// 立即执行 =========================
// canvas默认宽高
const defaultWidth = 1024;
const defaultHeight = 1024;

// 调试用
(<any>window).allCharsetMap = allCharsetMap;
(<any>window).allCharInfoMap = allCharInfoMap;
(<any>window).allFontMap = allFontMap;
// (<any>window).buildFont = buildFont;
// (<any>window).getJsonConfig = getJsonConfig;
