/**
 * * 处理 非 2 的 n 次幂图片
 * * 小游戏必须为 2 的 n 次幂
 */

import { nextPowerOfTwo } from '../util/math';

/**
 * 图片处理工具函数
 */
// tslint:disable-next-line:no-unnecessary-class
export class ImageTools {
    /**
     * 检查尺寸 - 处理为 2 的 n 次幂尺寸
     * @param image 目标图片
     */
    public static check(image: HTMLImageElement): HTMLImageElement | HTMLCanvasElement {
        const srcWidth = image.width;
        const srcHeight = image.height;
        let width: number, height: number;

        width   = nextPowerOfTwo(srcWidth);
        height  = nextPowerOfTwo(srcHeight);

        if (width === srcWidth && height === srcHeight) {
            return image;
        } else {
            const canvas = this.createCanvas(width, height);
            this.imageFillCanvas(image, canvas);
            // document.body.appendChild(canvas);
            
            return canvas;
        }
    }
    /**
     * 创建指定大小canvas
     * @param width 宽
     * @param height 高
     */
    public static createCanvas(width: number, height: number) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        return canvas;
    }
    /**
     * 绘制图片到目标画布
     * @param image 目标图片
     * @param canvas 目标canvas
     */
    public static imageFillCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
}