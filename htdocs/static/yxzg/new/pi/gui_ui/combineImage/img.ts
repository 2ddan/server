import { Widget } from "../../gui_virtual/widget";
import { Forelet } from "../../gui_virtual/forelet";

/**
 * 图片显示
 * * 精灵图方案
 */

export interface PropCfg {
    /**
     * 源图片路径
     */
    src?: string;
    /**
     * 目标精灵图路径
     */
    combine?: string;
    /**
     * 目标精灵图中的内容矩形
     */
    rect?: [number, number, number, number];
}

export interface CombineImgFileData {
    [index: string]: CombineCfg;
}

export type CombineWidth = number;
export type CombineHeight = number;
export type CombineX = number;
export type CombineY = number;
export type CombineIndex = number;
export type CombineCfg = [CombineWidth, CombineHeight, CombineX, CombineY, CombineIndex];

export let forelet: Forelet = new Forelet();

export class CombineImg extends Widget {
    public static combineMap: Map<string, CombineImgFileData> = new Map();
    public static registCombine(cname: string, cfg: CombineImgFileData) {
        this.combineMap.set(cname, cfg);
    }
    public setProps(prop: any) {
        const cfg = {};

        if (prop.src) {

        } else {

        }
        super.setProps(cfg);
    }
    public updateProps(prop: any) {
        const cfg = {};
        super.updateProps(cfg);
    }
}

const readCombineCfg = (src: string) => {

}