/**
 * GUI 资源管理模块
 */

import { Opacity } from '../gui/enum';
import { gui } from '../gui/gui';
import { ImageTools } from '../gui/image_tools';
import { GUIImageResCfg } from '../gui/r_datastruct';
import { loadImageRes, loadOK, register, Res, ResTab } from '../util/res_mgr';

export const GUI_IMAGE_TYPE = 'gui_image';

/**
 * GUI 纹理资源
 */
export class GUIRes extends Res {
    /**
     * 上下文
     */
    public static vdocument: number;
    /**
     * 资源信息
     */
    public link: GUIImageResCfg;
    /**
     * 初始化
     * @param vdocument 目标上下文
     */
    // tslint:disable-next-line:function-name
    public static Init(vdocument: number) {
        GUIRes.vdocument = vdocument;
    }
    public static destroyCall(id: number) {
        gui._release_texture_res(id);
    }
    public static createGUITexture(image: HTMLImageElement, url: string) {
        const result: GUIImageResCfg = <any>{};

        result.width    = image.width;
        result.height   = image.height;
        result.combineSrcWidth  = image.width;
        result.combineSrcHeight    = image.height;

        if (GUIRes.vdocument) {
            const target = ImageTools.check(image);
            
            result.combineSrcWidth  = target.width;
            result.combineSrcHeight = target.height;

            (<any>window).__jsObj   = target;
            (<any>window).__jsObj1  = url;
            result.textureID = gui._create_texture_res(GUIRes.vdocument, Opacity.Translucent, 0);
        }

        return result;
    }
    /**
     * @description 创建
     * @example
     */
    public create(data: GUIImageResCfg): void {
        this.link = data;
    }

    /**
     * 
     * @description 销毁，需要子类重载
     * @example v
     */
    public destroy(): void {
        if (this.link) {
            GUIRes.destroyCall(this.link.textureID);
        }
        this.link = undefined;
    }
}

const createGUIRes = (name: string, _type: string, url: string, resTab: ResTab) => {
    const key = `${GUI_IMAGE_TYPE}:${url}`;
    const res = resTab.get(key);

    if (res) {
        loadOK(name, _type, null, GUIRes, res.link);
    } else {
        if ((<any>window).pi_modules.load && (<any>window).pi_modules.load.exports.isWXMinigame && (<any>window).pi_modules.load.exports.isWXMinigame()) {

            const image = new Image();
            image.onload = () => {
                loadOK(name, _type, null, GUIRes, GUIRes.createGUITexture(image, url));
            };
    
            (<any>window).pi_modules['pi/minigame/adapter'].exports.replaceImagePath(url, (a) => {
                image.src = a;
            }, () => {
                image.src = `/${url}`;
            });

        } else {

            loadImageRes(url, resTab, (image: HTMLImageElement) => {
                loadOK(name, _type, null, GUIRes, GUIRes.createGUITexture(image, url));
            });

        }
    
    }
};

// =========================================
register(GUI_IMAGE_TYPE, (name: string, _type: string, url: string, res: ResTab) => {
    createGUIRes(name, _type, url, res);
});