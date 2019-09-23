/**
 * canvas 绘制文本方案
 */

import { gui } from '../../pi/gui/gui';
import { RStyle } from '../../pi/gui/r_style';

/**
 * 添加字体到cavnas
 * @desc 每个字号要一个canvas 么，项目这边看了下基本都是比较小的字号，有些大点的字号也不算满意... 要换的比较多，加上
 */
export const addFontCanvas = (fontName: string, fontWeight: string, fontSize: number, lineHeight: number, vdoc: number) => {
    let offset: number;
    // texture 配置
    const texture_cfg_len = 8;
    const line_height_cfg_len = 1;
    const width   = 2048;
    const height  = 2048; 
    const version = `GLYPL_TABLE`;
    const font    = `${fontWeight} ${fontSize}px ${fontName}`;
    const len     = version.length + font.length + texture_cfg_len + line_height_cfg_len + 1 + 1;
    const cfg_u8  = new Uint8Array(len);

    offset = 0;

    for (let i = 0; i < version.length; i++) {
        cfg_u8[offset++] = version.charCodeAt(i);
    }
    offset++;

    cfg_u8[offset++] = font.length;    
    for (let i = 0; i < font.length; i++) {
        cfg_u8[offset++] = font.charCodeAt(i);
    }
    cfg_u8[offset++] = lineHeight; // lineheight

    const buffer1 = new ArrayBuffer(texture_cfg_len);
    const u16     = new Uint16Array(buffer1);
    u16[0]        = width;          // width
    u16[1]        = height;          // height
    u16[2]        = fontSize;     // font_size
    u16[3]        = 1;            // stroke_width 
    cfg_u8.set(new Uint8Array(buffer1), offset);

    const canvas  = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;

    (<any>window).__jsObj  = cfg_u8;
    (<any>window).__jsObj2 = font;
    (<any>window).__jsObj1 = canvas;
    const sdf_font = gui._add_sdf_font_res(vdoc, fontSize); // __jsObj: uv cfg, __jsObj1: image, __jsObj2: 字体资源纹理名称， 用于标识唯一的纹理资源

    (<any>window).__jsObj  = fontName; // font_face_name
    (<any>window).__jsObj1 = font;
    gui._add_font_face(vdoc, 0, fontSize, 500); // __jsObj: font_face_name(String), __jsObj1: src_name(String, 逗号分隔), 
    
    RStyle.FontFamilyList.push(fontName);
};