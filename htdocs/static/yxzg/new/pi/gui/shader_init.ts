import { gui } from './gui';
import { canvas_text_fs_code, canvas_text_fs_shader_name, canvas_text_vs_code, canvas_text_vs_shader_name } from './shader_canvas_text';
import { clip_fs_code, clip_fs_shader_name, clip_vs_code, clip_vs_shader_name } from './shader_clip';
import { color_fs_code, color_fs_shader_name, color_vs_code, color_vs_shader_name } from './shader_color';
import { image_fs_code, image_fs_shader_name, image_vs_code, image_vs_shader_name } from './shader_image';
import { text_fs_code, text_fs_shader_name, text_vs_code, text_vs_shader_name } from './shader_text';
/**
 * 
 */

export const initShaders = (engine: any) => {
    // 设置图片shader
    (<any>window).__jsObj = color_vs_shader_name;
    (<any>window).__jsObj1 = color_vs_code;
    gui._set_shader(engine);
    
    (<any>window).__jsObj = color_fs_shader_name;
    (<any>window).__jsObj1 = color_fs_code;
    gui._set_shader(engine);
    
    // 设置图片shader
    (<any>window).__jsObj  = image_vs_shader_name;
    (<any>window).__jsObj1 = image_vs_code;
    gui._set_shader(engine);
    
    (<any>window).__jsObj  = image_fs_shader_name;
    (<any>window).__jsObj1 = image_fs_code;
    gui._set_shader(engine);

    (<any>window).__jsObj  = clip_vs_shader_name;
    (<any>window).__jsObj1 = clip_vs_code;
    gui._set_shader(engine);
    
    (<any>window).__jsObj  = clip_fs_shader_name;
    (<any>window).__jsObj1 = clip_fs_code;
    gui._set_shader(engine);

    (<any>window).__jsObj  = text_vs_shader_name;
    (<any>window).__jsObj1 = text_vs_code;
    gui._set_shader(engine);
    
    (<any>window).__jsObj  = text_fs_shader_name;
    (<any>window).__jsObj1 = text_fs_code;
    gui._set_shader(engine);
    
    (<any>window).__jsObj  = canvas_text_vs_shader_name;
    (<any>window).__jsObj1 = canvas_text_vs_code;
    gui._set_shader(engine);
    
    (<any>window).__jsObj  = canvas_text_fs_shader_name;
    (<any>window).__jsObj1 = canvas_text_fs_code;
    gui._set_shader(engine);
    
};