
/**
 * gui 节点 attributes 数据结构
 */

import { gui } from './gui';
import { RElement } from './r_element';
import { RImageElement } from './r_imageelement';
import { AnimationCmd, Tools } from './tools';

/**
 * 节点 attributes 数据结构
 */
export class RAttr {
    /**
     * 节点可操作性
     */
    public set enabled(value: string | boolean) {
        if (value === 'false' || value === false) {
            this._ele.enabled(1);
            this._enabled = false;
        } else {
            this._ele.enabled(0);
            this._enabled = true;
        }
    }
    public get enabled() {
        return this._enabled;
    }
    /**
     * 节点 value 值
     */
    public set value(value: any) {
        this._ele.value = value;
    }
    /**
     * 滚动属性
     */
    public set scroll_path(value: string) {
        this._scroll_path = value;
        this._ele.activeScroll();
    }
    /**
     * 滚动属性
     */
    public get scroll_path() {
        return this._scroll_path;
    }
    /**
     * 事件传递属性
     * * 渲染层级间的传递
     */
    public get isSendNextLayer() {
        return this._isSendNextLayer;
    }
    /**
     * 事件传递属性
     * * 渲染层级间的传递
     */
    public set isSendNextLayer(v: string | boolean) {
        this._isSendNextLayer = v === '1' || v === 'true';
    }
    /**
     * 颜色变换
     * * 对应 PS HSI
     */
    public set hsi(value: string | number[]) {
        if (typeof value === 'string') {
            value = Tools.format_space(<string>value);
    
            const cmdList = value.split(',');
    
            this._hsi = [(<any>cmdList[0]) - 0, (<any>cmdList[1]) - 0, (<any>cmdList[2]) - 0];
        } else {
            this._hsi = [value[0], value[1], value[2]];
        }

        gui._set_filter_hsi(this._ele.document.uniqueID, this._ele.uniqueID, this._hsi[0], this._hsi[1], this._hsi[2]);
    }
    /**
     * 颜色变换
     * * 对应 PS HSI
     */
    public get hsi() {
        return this._hsi ? `${this._hsi[0]},${this._hsi[1]},${this._hsi[2]}` : '';
    }
    /**
     * 图片裁剪显示
     * * UV
     * * 合并图片集中指定区域显示
     */
    public set imageClip(value: string | number[]) {
        if (typeof value === 'string') {
            value = Tools.imageClip(<string>value);
        }
        if (Tools.noValue(value)) {
            // 
        } else {
            this._imageClip = value;
            this._ele.activeImageClip();
        }
    }
    /**
     * 图片裁剪显示
     * * UV
     * * 合并图片集中指定区域显示
     */
    public get imageClip() {
        return this._imageClip;
    }
    /**
     * 图片内容显示的单位尺寸
     * * 指定裁剪图片内容的一个矩形区域进行渲染
     */
    public set cellWidth(value: string | number) {
        this._cellWidth = <any>value - 0;
        (<RImageElement>this._ele).activeCellId();
    }
    /**
     * 图片内容显示的单位尺寸
     * * 指定裁剪图片内容的一个矩形区域进行渲染
     */
    public get cellWidth() {
        return this._cellWidth;
    }
    /**
     * 图片内容显示的单位尺寸
     * * 指定裁剪图片内容的一个矩形区域进行渲染
     */
    public set cellHeight(value: string | number) {
        this._cellHeight = <any>value - 0;
        (<RImageElement>this._ele).activeCellId();
    }
    /**
     * 图片内容显示的单位尺寸
     * * 指定裁剪图片内容的一个矩形区域进行渲染
     */
    public get cellHeight() {
        return this._cellHeight;
    }
    /**
     * 图片内容具有单位尺寸时，指定显示等分后第几块区域
     * * 指定裁剪图片内容的一个矩形区域进行渲染
     */
    public set cellId(value: string | number) {
        this._cellId = <any>value - 0;
        (<RImageElement>this._ele).activeCellId();
    }
    /**
     * 图片内容具有单位尺寸时，指定显示等分后第几块区域
     * * 指定裁剪图片内容的一个矩形区域进行渲染
     */
    public get cellId() {
        return this._cellId;
    }
    public set cellAnim(value: string | AnimationCmd) {
        //
    }
    /**
     * 用于 Inspector 突出显示，方便定位要调试的节点
     */
    public debug: string;
    private readonly _ele: RElement;
    // private _grayscale: number;
    // private _hueRotate: number;
    // private _brightNess: number;
    private _scroll_path: string;
    private _isSendNextLayer: boolean = false;
    private _hsi: number[];
    private _imageClip: number[];
    private _cellWidth: number;
    private _cellHeight: number;
    private _cellId: number;
    private _cellAnim: AnimationCmd;
    private _enabled: boolean = true;
    constructor(ele: RElement) {
        this._ele = ele;
    }
}