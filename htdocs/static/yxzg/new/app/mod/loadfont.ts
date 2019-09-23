import { gui } from '../../pi/gui/gui';
import { RStyle } from '../../pi/gui/r_style';
import { buildFont, getJsonConfig } from '../../pi/gui_font/msdf_font';
import { Pi } from '../../app/mod/pi';

/**
 * 
 */

interface FontCfg {
    name: string;
    bin: string;
    src: string;
}

export const loadFonts = (defaultFontDir: string, cfg: FontCfg[], cb: Function) => {
    if (!!defaultFontDir) {
        getJsonConfig(
            defaultFontDir,
            (chars: any): any => {
                loadConstFont(cfg, cb);
            },
            undefined
        );
    } else {
        loadConstFont(cfg, cb);
    }
};

const loadConstFont = (cfg: FontCfg[], cb: Function) => {
    const promiseList = [];

    cfg.forEach(v => {
        const promise = loadFont(v);
        promiseList.push(promise);
    });

    Promise.all(promiseList).then(() => {
        console.log(`所有字体加载成功`);
        cb && cb();
        (<any>window).__gen_font = gen_font;
    });
};

const glyphLen: number = 12;
const gen_font = (world: number, fontName: string, chars: number[]) => {

    // const char_ = [];
    let char_ = '';
    chars.forEach(v => {
        // char_.push(String.fromCharCode(v));
        char_ += String.fromCharCode(v);
    });

    const buffer = new ArrayBuffer(chars.length * glyphLen);
    const draw_chars = [];

    // const cfg: Map<number, any> = <any>buildFont(
    //     char_, 
    //     fontName, 
    //     (canvas: HTMLCanvasElement, posInfo: any[], isRefresh: boolean, err: any) => { 
    //         const chars1 = new Uint32Array(draw_chars);
    //         gen_font_success(world, fontName, canvas, chars1); 
    //     }
    // );
    
    for (let i = 0; i < chars.length; i++) {
        // const glyph = cfg.get(chars[i]);
        // if (!glyph) {
        if (1) {
            const u16 = new Uint16Array(buffer, glyphLen * i);
            const u8 = new Uint8Array(buffer, glyphLen * i);
            u16[0]  = chars[i];
            u16[1]  = 0;
            u16[2]  = 0;
            u8[6]   = 0;
            u8[7]   = 0;
            u8[8]   = 0;
            u8[9]   = 0;
            u8[10]  = 0;
        } else {
        //     const u16 = new Uint16Array(buffer, glyphLen * i);
        //     const u8 = new Uint8Array(buffer, glyphLen * i);
        //     u16[0]  = glyph.id;
        //     u16[1]  = glyph.x;
        //     u16[2]  = glyph.y;
        //     u8[6]   = glyph.xoffset;
        //     u8[7]   = glyph.yoffset;
        //     u8[8]   = glyph.width;
        //     u8[9]   = glyph.height;
        //     u8[10]  = glyph.xadvance;
        //     draw_chars.push(chars[i]);
        }
    }

    return new Uint8Array(buffer);
};

const gen_font_success = (world: number, fontName: string, canvas: HTMLCanvasElement, chars: Uint32Array) => {
    (<any>window).__jsObj   = canvas;
    (<any>window).__jsObj1  = fontName;
    (<any>window).__jsObj2  = chars;
    gui._update_font_texture(world);
};

const loadFont = (cfg: FontCfg) => {
    return new Promise((resolve, reject) => {
        // let _cfg: Uint8Array, _image: Uint8Array;
        let _cfg: Uint8Array, _image: HTMLImageElement;
        const promises = [];
    
        const p1 = new Promise((resolve, reject) => {
            const xmlhttp = newXMLHttpRequest();
            xmlhttp.open('GET', `${(<any>window).winit.domains[0]}${(<any>window).winit.path}${cfg.bin}`, true);
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    _cfg = new Uint8Array(xmlhttp.response);
                    console.log('cfg-----------------------------------', _cfg);
                    resolve(`${cfg.name}字体文件 dfc 加载成功`);
                } 
                // else {
                    // reject(`${cfg.name}字体文件 dfc 加载失败`);
                // }
            };
        
            xmlhttp.responseType = 'arraybuffer';
            xmlhttp.send();
        });
    
        promises.push(p1);
        
        Promise.all(promises).then(() => {
            _image = new Image();

            _image.onload = () => {
                (<any>window).__jsObj  = subArrBuf(_cfg);
                (<any>window).__jsObj1 = _image;
                (<any>window).__jsObj2 = cfg.name;
                
                (<any>window).Module._add_sdf_font_res((<any>window).vdocument.uniqueID);
    
                (<any>window).__jsObj  = cfg.name;
                (<any>window).__jsObj1 = cfg.name;
                (<any>window).Module._add_font_face((<any>window).vdocument.uniqueID, 0, 32, 500);
            
                RStyle.FontFamilyList.push(cfg.name);
                console.warn(`${cfg.name}字体文件加载成功`);
                resolve('true');
            };
            if(Pi.isWXgame){
                _image.src = `${(<any>window).winit.domains[0]}${(<any>window).winit.path}${cfg.src}`;
            }else _image.src = `${Pi.mod.domains[0]}${Pi.mod.path}${cfg.src}`;
        });
    }); 
};

const subArrBuf = (srcArrBuf: ArrayBuffer) => {
    const u16v = new Uint16Array(srcArrBuf, 0, 1);

    return srcArrBuf.slice(u16v[0]);
};

const newXMLHttpRequest = () => {
    let xmlhttp;

    if ((<any>window).XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    return xmlhttp;
};