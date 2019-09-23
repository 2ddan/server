/**
 * gui 图片节点结构
 */

import { Opacity } from './enum';
import { gui } from './gui';
import { ImageTools } from './image_tools';
import { GUIImageResCfg, RElementTypeList } from './r_datastruct';
import { RElement, RElementOpt } from './r_element';

/**
 * 显示区域表达数据
 */
// interface IMeasure {
//     left: number;
//     top: number;
//     width: number;
//     height: number;
// }
/**
 * 图片节点
 */
export class RImageElement extends RElement {
    constructor(opt: RElementOpt) {
        opt.uniqueID = gui._create_image_node(opt.document.uniqueID);

        super(opt);
        this._type = RElementTypeList.IMAGE;
        
        this.initDefaultStyle('img');
    }

    public get src() {
        return; // return gui._src(this.ele);
    }
    /**
     * TODO - 传入 canvas 时的处理
     */
    public set src(cfg: GUIImageResCfg) {
        if (this._isDestroy) return;

        // Tools.log('src -- ', image);
        let target: HTMLCanvasElement | HTMLImageElement;

        this._imageWidth    = cfg.isCombine ? cfg.combineWidth : cfg.width;
        this._imageHeight   = cfg.isCombine ? cfg.combineHeight : cfg.height;

        if (!this.document.readStyle(this.style, 'width')) {
            this.document.applyStyle(this.style, 'width', [0, cfg.width]);
        }
        if (!this.document.readStyle(this.style, 'height')) {
            this.document.applyStyle(this.style, 'height', [0, cfg.height]);
        }

        // if (!cfg.hasBuffer) {
        //     if (!gui._has_texture_res(this.document.uniqueID, cfg.path)) {
        //         target  = ImageTools.check(cfg.image);
        //     }
        // }

        this._imageWidth        = cfg.isCombine ? cfg.combineWidth  : cfg.width;
        this._imageHeight       = cfg.isCombine ? cfg.combineHeight : cfg.height;
        this._imageLeft         = cfg.isCombine ? cfg.combineLeft   : 0;
        this._imageTop          = cfg.isCombine ? cfg.combineTop    : 0;
        this._srcImageWidth     = cfg.isCombine ? cfg.combineSrcWidth  : cfg.width;
        this._srcImageHeight    = cfg.isCombine ? cfg.combineSrcHeight : cfg.height;

        let result = this.activeCellId();
        if (!result) {
            result = this.activeImageClip();
        }

        // (<any>window).__jsObj   = target;
        // (<any>window).__jsObj1  = cfg.path;
        // gui._set_src(this.document.uniqueID, this.uniqueID, Opacity.Translucent, 0);
        gui._set_src_with_texture(this.document.uniqueID, this.uniqueID, cfg.textureID);
        // (<any>window).__jsObj1  = undefined;
        // (<any>window).__jsObj   = undefined;
        // Tools.log(url);
        
        target              = undefined;
    }

    public activeCellId() {
        let result: boolean = false;
        
        const cellWidth     = <number>this.attributes.cellWidth;
        const cellHeight    = <number>this.attributes.cellHeight;
        const cellId        = <number>this.attributes.cellId;
        if (cellId !== undefined && cellWidth && cellHeight) {
            if (this._imageWidth && this._imageHeight) {
                const col = Math.floor(this._imageWidth / cellWidth);
                const row = Math.floor(this._imageHeight / cellHeight);
                const offx = (cellId % col) * cellWidth; 
                const offy = Math.floor(cellId / col) * cellHeight;
                this.attributes.imageClip = [offy + this._imageTop, offx + cellWidth + this._imageLeft, offy + cellHeight + this._imageTop, offx + this._imageLeft, 0];
                result = true;
            }
        }

        return result;
    }
}