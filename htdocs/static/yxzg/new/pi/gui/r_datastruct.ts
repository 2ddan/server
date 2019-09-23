
/**
 * gui dom 层基础数据表
 */

export type RElementType = 'div' | 'img' | 'span' | 'text' | 'BG';

export const GUIRenderFlags = {
    /**
     * DOM 渲染
     */
    DOM: 1,
    /**
     * BIND 渲染
     */
    BIND: 2,
    /**
     * BABYLON-GUI 渲染
     */
    BABYLONGUI: 3,
    PIXI: 4,
    THREE3D: 5,
    CANVAS2D: 6
};

/**
 * R gui 节点类型
 */
export const RElementTypeList = {
    DIV: 'div',
    IMAGE: 'img',
    SPAN: 'span',
    BG: 'BG',
    input: 'input',
    textarea: 'textarea',
    LIST: ['div', 'img', 'span', 'input', 'textarea']
};

export interface GUIViewOption {
    left: number;
    top: number;
    width: number;
    height: number;
    clearColor: string;
}

/**
 * GUI 图片资源配置
 */
export interface GUIImageResCfg {
    /**
     * 资源 项目路径
     * * 同时为 GUI 底层缓冲路径
     */
    path: string;
    /**
     * 资源链接
     */
    url: string;
    /**
     * 是否 有缓冲
     */
    hasBuffer: boolean;
    /**
     * 图片宽
     */
    width: number;
    /**
     * 图片高
     */
    height: number;
    /**
     * 纹理 ID
     */
    textureID: number;
    /**
     * 图片对象，当 检查缓冲存在时，没有 image 对象
     */
    image?: HTMLImageElement;
    isCombine?: boolean;
    combineWidth?: number;
    combineHeight?: number;
    combineLeft?: number;
    combineTop?: number;
    combineSrcWidth?: number;
    combineSrcHeight?: number;
}