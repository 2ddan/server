import { BeforeInitTools } from '../babylon/beforeInit';
import { GUIPARAMS } from './gui_base';

let _CANVAS: HTMLCanvasElement;

// tslint:disable-next-line:interface-name
interface IDisplayCfg {
    /**
     * 设备高度 - 视口 - 设备层宽度
     */
    DEVICE_HEIGHT: number;
    /**
     * 设备宽度 - 视口 - 设备层宽度
     */
    DEVICE_WIDTH: number;
    /**
     * 调整后 项目视口 - 项目层宽度
     */
    VIEW_WIDTH: number;
    /**
     * 调整后 项目视口 - 项目层高度
     */
    VIEW_HEIGHT: number;
    /**
     * 显示内容 - 视口 - 在 项目视口 left
     */
    CONTEN_IN_VIEW_LEFT: number;
    /**
     * 显示内容 - 视口 - 在 项目视口 top
     */
    CONTEN_IN_VIEW_TOP: number;
    /**
     * 显示内容 - 视口 - 在 项目视口 WIDTH
     */
    CONTEN_IN_VIEW_WIDTH: number;
    /**
     * 显示内容 - 视口 - 在 项目视口 HEIGHT
     */
    CONTEN_IN_VIEW_HEIGHT: number;
    /**
     * 显示内容 - 视口 - 项目层宽度
     */
    CONTENT_WIDTH: number;
    /**
     * 显示内容 - 视口 - 项目层高度
     */
    CONTENT_HEIGHT: number;
    /**
     * 设计 - 视口 - 项目层宽度 
     */
    DESIGN_VIEW_WIDTH: number;
    /**
     * 设计 - 视口 - 项目层高度 
     */
    DESIGN_VIEW_HEIGHT: number;
    /**
     * 调整后 设备 / 项目视口 缩放比
     */
    DEVICE_VIEW_SCALE: number;
    /**
     * 是否微信小游戏
     */
    IS_WEIXIN_GAME: boolean;
    /**
     * 是否在设备上进行了旋转
     */
    IS_ROTATE: boolean;
}

const SceneCfg = {
    // 设计尺寸
    WIDTH: 1334,
    HEIGHT: 750,
    // 设备尺寸
    DEVICE_HEIGHT: 0,
    DEVICE_WIDTH: 0,
    // canvas 视口尺寸 (缩放后)
    DISPLAY_HEIGHT: 0,
    DISPLAY_WIDTH: 0,
    // canvas 尺寸 (不计算缩放)
    CURR_WIDTH: 1334,
    CURR_HEIGHT: 750,
    // canvas 缩放
    CURR_SCALE: 1,
    // canvas 缩放
    CURR_SCALE_W: 1,
    CURR_SCALE_H: 1,
    // canvas 是否旋转 (顺时针90度)
    FLAG_ROTATION: false,
    // 是否是小游戏
    IS_WEIXIN_GAME: false,
    initCurrWidth: (w) => {
        SceneCfg.CURR_WIDTH = w;
        SceneCfg.CURR_SCALE_W = SceneCfg.DISPLAY_WIDTH / SceneCfg.CURR_WIDTH;
        if (SceneCfg.IS_WEIXIN_GAME) {
            SceneCfg.CURR_SCALE_W = SceneCfg.DEVICE_WIDTH / SceneCfg.CURR_WIDTH;
        }
    },
    initCurrHeight: (h) => {
        SceneCfg.CURR_HEIGHT = h;
        SceneCfg.CURR_SCALE_H = SceneCfg.DISPLAY_HEIGHT / SceneCfg.CURR_HEIGHT;
        if (SceneCfg.IS_WEIXIN_GAME) {
            SceneCfg.CURR_SCALE_H = SceneCfg.DEVICE_HEIGHT / SceneCfg.CURR_HEIGHT;
        }
    },
    initCurrScale: (s: number) => {
        SceneCfg.CURR_SCALE = s;
    }
};

/**
 * 标准化 Canvas 的显示 的方法类
 */
// tslint:disable-next-line:no-unnecessary-class
export class FormatCanvasDisplay {
    private static DisplayCfg: IDisplayCfg  = {
        DEVICE_WIDTH: 0,
        DEVICE_HEIGHT: 0,
        VIEW_WIDTH: 0,
        VIEW_HEIGHT: 0,
        CONTEN_IN_VIEW_LEFT: 0,
        CONTEN_IN_VIEW_TOP: 0,
        CONTEN_IN_VIEW_WIDTH: 0,
        CONTEN_IN_VIEW_HEIGHT: 0,
        CONTENT_WIDTH: 0,
        CONTENT_HEIGHT: 0,
        DESIGN_VIEW_WIDTH: 0,
        DESIGN_VIEW_HEIGHT: 0,
        DEVICE_VIEW_SCALE: 0,
        IS_WEIXIN_GAME: false,
        IS_ROTATE: false
    };
    /**
     * 初始化设计尺寸
     * @param w V
     * @param h V
     */
    public static initDesignSize(w: number, h: number) {

        SceneCfg.WIDTH = w;
        SceneCfg.HEIGHT = h;

        this.DisplayCfg.DESIGN_VIEW_WIDTH = w;
        this.DisplayCfg.DESIGN_VIEW_HEIGHT = h;

    }
    /**
     * 标准化 canvas 显示
     * @param canvas V
     * @param parent 父dom节点，暂无用
     */
    public static format(canvas: HTMLCanvasElement, isPIDemo?: boolean, parent?: HTMLDivElement) {

        _CANVAS = canvas;
        if (isPIDemo !== true) {
            // FormatCanvasDisplay.initDesignSize(GUIPARAMS.Design_Width, GUIPARAMS.Design_Height);
            // FormatCanvasDisplay.keepHeight(SceneCfg.WIDTH > SceneCfg.HEIGHT, parent);
            
            FormatCanvasDisplay.initDesignSize(GUIPARAMS.Design_Width, GUIPARAMS.Design_Height);
            FormatCanvasDisplay.keepHeight_();
        } else {
            SceneCfg.DEVICE_HEIGHT = canvas.height;
            SceneCfg.DEVICE_WIDTH = canvas.width;

            this.DisplayCfg.DEVICE_HEIGHT = canvas.height;
            this.DisplayCfg.DEVICE_WIDTH = canvas.width;
    
            SceneCfg.DISPLAY_HEIGHT = canvas.height;
            SceneCfg.DISPLAY_WIDTH = canvas.width;
            
            this.DisplayCfg.DESIGN_VIEW_HEIGHT = canvas.height;
            this.DisplayCfg.DESIGN_VIEW_WIDTH = canvas.width;
    
            SceneCfg.initCurrWidth(canvas.width);
            SceneCfg.initCurrHeight(canvas.height);
        }

    }
    public static getIsWeixinGAME() {
        // return SceneCfg.IS_WEIXIN_GAME;
        return this.DisplayCfg.IS_WEIXIN_GAME;
    }
    // /**
    //  * 返回设备宽度
    //  */
    // public static getDesignW() {
    //     return SceneCfg.WIDTH;
    //     return this.DisplayCfg.DESIGN_VIEW_WIDTH;
    // }
    // /**
    //  * 返回设备高度
    //  */
    // public static getDesignH() {
    //     return SceneCfg.HEIGHT;
    //     return this.DisplayCfg.DESIGN_VIEW_HEIGHT;
    // }
    // /**
    //  * 返回设备宽度
    //  */
    // public static getClientW() {
    //     return SceneCfg.DEVICE_WIDTH;
    //     return this.DisplayCfg.DEVICE_WIDTH;
    // }
    // /**
    //  * 返回设备高度
    //  */
    // public static getClientH() {
    //     return SceneCfg.DEVICE_HEIGHT;
    //     return this.DisplayCfg.DESIGN_VIEW_HEIGHT;
    // }
    // /**
    //  * 返回显示宽度 canvas 缩放后
    //  */
    // public static getDisplayW() {
    //     return SceneCfg.DISPLAY_WIDTH;
    //     return this.DisplayCfg.VIEW_WIDTH;
    // }
    // /**
    //  * 返回显示高度 canvas 缩放后
    //  */
    // public static getDisplayH() {
    //     return SceneCfg.DISPLAY_HEIGHT;
    //     return this.DisplayCfg.VIEW_HEIGHT;
    // }
    // /**
    //  * 返回 canvas 宽度
    //  */
    // public static getRootW() {
    //     return SceneCfg.CURR_WIDTH;
    // }
    // /**
    //  * 返回 canvas 高度
    //  */
    // public static getRootH() {
    //     return SceneCfg.CURR_HEIGHT;
    // }
    // /**
    //  * 返回 canvas 缩放系数
    //  */
    // public static getRootScale() {
    //     return SceneCfg.CURR_SCALE_H;
    // }
    // /**
    //  * 返回 canvas 缩放系数
    //  */
    // public static getRootScaleW() {
    //     return SceneCfg.CURR_SCALE_W;
    // }
    // /**
    //  * 返回 canvas 缩放系数
    //  */
    // public static getCurrScale() {
    //     return SceneCfg.CURR_SCALE;
    // }
    // /**
    //  * 返回 canvas 是否旋转
    //  */
    // public static getIsRotate() {
    //     return SceneCfg.FLAG_ROTATION;
    // }
    public static getDeviceWidth() {
        return this.DisplayCfg.DEVICE_WIDTH;
    }
    public static getDeviceHeight() {
        return this.DisplayCfg.DEVICE_HEIGHT;
    }
    public static getViewWidth() {
        return this.DisplayCfg.VIEW_WIDTH;
    }
    public static getViewHeight() {
        return this.DisplayCfg.VIEW_HEIGHT;
    }
    public static getContentDisplayLeft() {
        return this.DisplayCfg.CONTEN_IN_VIEW_LEFT;
    }
    public static getContentDisplayTop() {
        return this.DisplayCfg.CONTEN_IN_VIEW_TOP;
    }
    public static getContentDisplayWidth() {
        return this.DisplayCfg.CONTEN_IN_VIEW_WIDTH;
    }
    public static getContentDisplayHeight() {
        return this.DisplayCfg.CONTEN_IN_VIEW_HEIGHT;
    }
    public static getContentWidth() {
        return this.DisplayCfg.CONTENT_WIDTH;
    }
    public static getContentHeight() {
        return this.DisplayCfg.CONTENT_HEIGHT;
    }
    public static getDeviceViewScale() {
        return this.DisplayCfg.DEVICE_VIEW_SCALE;
    }
    public static getIsRotate() {
        return this.DisplayCfg.IS_ROTATE;
    }
    public static getIsWXGame() {
        return this.DisplayCfg.IS_WEIXIN_GAME;
    }
    /**
     * 保持高度不变，宽度自适应
     * @param isHorizontalScreen 是否为横屏设计
     */
    // tslint:disable-next-line:max-func-body-length
    private static keepHeight(isHorizontalScreen: boolean, parent: HTMLDivElement) {
        if (BeforeInitTools.isWeiXinMiniGame() === true) {
            SceneCfg.IS_WEIXIN_GAME = true;
        }
        
        // 是否旋转canvas
        // FLAG_ROTATION: boolean,
        let deviceWidth: number,
            deviceHeight: number,
                // canvas 缩放
            scaleH: number,
            scaleW: number,
                    // canvas 尺寸
            canvasH: number,
            canvasW: number,
                    // canvas 尺寸
            canvasUseH: number,
            canvasUseW: number,
                    // canvas 尺寸
            rootWidth: number,
            rootHeight: number,
                    // canvas 定位
            rootX: number,
            rootY: number,
                    // canvas 显示尺寸（缩放后）
            displayWidth: number,
            displayHeight: number;

            // 设计尺寸
        let designW: number, designH: number;
        let baseAttr: string, scaleAttr: string, rotationAttr: string, transformAttr: string;

        deviceWidth = document.body.clientWidth
                || document.documentElement.clientWidth
                || (<any>document.documentElement).screen.availWidth;  // 微信小游戏

        deviceHeight = document.body.clientHeight
                || document.documentElement.clientHeight
                || (<any>document.documentElement).screen.availHeight; // 微信小游戏

        if (parent !== undefined) {
            deviceWidth = parent.clientWidth;
            deviceHeight = parent.clientHeight;
        }

        let clientWidth: number = deviceWidth;
        let clientHeight: number = deviceHeight;
        let clientUseWidth: number = deviceWidth;
        // let clientUseHeight: number = deviceHeight - BeforeInitTools.Weixin_Mobile_Bangs_Size;
        let clientUseHeight: number = deviceHeight - 0;

            // oldHeight   = clientHeight;
        designW = SceneCfg.WIDTH;
        designH = SceneCfg.HEIGHT;

        if ((isHorizontalScreen && clientUseHeight > clientUseWidth)
                || (!isHorizontalScreen && clientUseHeight < clientUseWidth)
            ) {
            SceneCfg.FLAG_ROTATION = true;
            designW = SceneCfg.WIDTH;
            designH = SceneCfg.HEIGHT;
        } else {
            SceneCfg.FLAG_ROTATION = false;
            designW = SceneCfg.WIDTH;
            designH = SceneCfg.HEIGHT;
        }

        if (SceneCfg.FLAG_ROTATION) {
            let temp: number;
            temp = clientHeight;
            clientHeight = clientWidth;
            clientWidth = temp;
            
            temp = clientUseHeight;
            clientUseHeight = clientUseWidth;
            clientUseWidth = temp;
        }

            // 宽高比不满足设计时 采用 高度固定，宽度自适应
        if (clientUseWidth * designH !== designW * clientUseHeight) {

                // 视窗尺寸 比 设计尺寸
            scaleH = clientUseHeight / designH;
                // canvas 高度固定为设计固定
            canvasUseH  = designH;
            // canvasH = canvasUseH + BeforeInitTools.Weixin_Mobile_Bangs_Size / scaleH;
            canvasH = canvasUseH + 0;

                // 显示高度
            displayHeight = canvasUseH * scaleH;

                // 先设置 canvas宽度 为 设计宽度
            canvasUseW = designW;
            canvasW = canvasUseW;
                // 计算这个情况下 显示宽度
            displayWidth = canvasUseW * scaleH;

                // 此时 显示高度 为 设备高度
                // 如果 显示宽度 超出 设备宽度
            if (displayWidth > clientUseWidth) {
                    // 将整体再缩放 以使得 显示宽度 为 设备宽度
                scaleH = scaleH * (clientUseWidth / displayWidth);
                scaleW = scaleH;
                
            } else {

                scaleH = scaleH * 1;
                scaleW = scaleH;
            }

            // 调整后的 高度
            // canvasH = canvasUseH + BeforeInitTools.Weixin_Mobile_Bangs_Size / scaleH;
            // canvasH = canvasUseH + 0;

            // 计算最终 宽度
            // canvasUseW = clientUseWidth / scaleH;
            // canvasW = canvasUseW;

        } else {

            scaleW = clientUseWidth / designW;
            scaleH = clientUseHeight / designH;

            canvasUseH = designH;
            canvasUseW = designW;

            // canvasH = canvasUseH + BeforeInitTools.Weixin_Mobile_Bangs_Size / scaleH;
            canvasH = canvasUseH + 0;
            canvasW = canvasUseW;

        }
        
        rootWidth = canvasW;
        rootHeight = canvasH;

        displayWidth = canvasW * scaleW;
        displayHeight = canvasH * scaleH;

        SceneCfg.DEVICE_HEIGHT = deviceHeight;
        SceneCfg.DEVICE_WIDTH = deviceWidth;

        SceneCfg.DISPLAY_HEIGHT = displayHeight;
        SceneCfg.DISPLAY_WIDTH = displayWidth;

        SceneCfg.initCurrScale(scaleH);
        SceneCfg.initCurrWidth(canvasUseW);
        SceneCfg.initCurrHeight(canvasUseH);

        if (SceneCfg.FLAG_ROTATION) {
            rootWidth = canvasW;
            rootHeight = canvasH;

            rootX = (clientHeight - rootWidth) / 2;
            rootY = (clientWidth - rootHeight) / 2;

            baseAttr = `position: absolute;overflow: hidden;left:${rootX}px;top:${rootY}px;width:${rootWidth}px;height:${rootHeight}px;`;

            scaleAttr = `scale(${scaleH},${scaleW} )`;
            rotationAttr = `rotate(90deg)`;
            transformAttr = `-webkit-transform:${scaleAttr}${rotationAttr};-moz-transform:${scaleAttr}${rotationAttr};-ms-transform:${scaleAttr}${rotationAttr};transform:${scaleAttr}${rotationAttr};`;

        } else {
            rootWidth = canvasW;
            rootHeight = canvasH;

            rootX = (clientWidth - rootWidth) / 2;
            rootY = (clientHeight - rootHeight) / 2;
                
            baseAttr = `position: absolute;overflow: hidden;left:${rootX}px;top:${rootY}px;width:${rootWidth}px;height:${rootHeight}px;`;

            scaleAttr = `scale(${scaleW},${scaleH} )`;
            rotationAttr = ``;
            transformAttr = `-webkit-transform:${scaleAttr}${rotationAttr};-moz-transform:${scaleAttr}${rotationAttr};-ms-transform:${scaleAttr}${rotationAttr};transform:${scaleAttr}${rotationAttr};`;

        }

        _CANVAS.setAttribute('style', `${baseAttr}${transformAttr}`);

            // }
    }
    /**
     * 保持高度不变，宽度自适应
     * @param isHorizontalScreen 是否为横屏设计
     */
    // tslint:disable-next-line:max-func-body-length
    private static keepHeight_() {
        if (BeforeInitTools.isWeiXinMiniGame() === true) {
            this.DisplayCfg.IS_WEIXIN_GAME = true;
        }

        let baseAttr: string, scaleAttr: string, rotationAttr: string, transformAttr: string;

        this.DisplayCfg.DEVICE_WIDTH = document.body.clientWidth
                || document.documentElement.clientWidth
                || (<any>document.documentElement).screen.availWidth;  // 微信小游戏

        this.DisplayCfg.DEVICE_HEIGHT = document.body.clientHeight
                || document.documentElement.clientHeight
                || (<any>document.documentElement).screen.availHeight; // 微信小游戏

        this.DisplayCfg.IS_ROTATE = false;
        if (this.DisplayCfg.DESIGN_VIEW_WIDTH > this.DisplayCfg.DESIGN_VIEW_HEIGHT) {
            if (this.DisplayCfg.DEVICE_WIDTH < this.DisplayCfg.DEVICE_HEIGHT) {
                this.DisplayCfg.IS_ROTATE = true;
                [this.DisplayCfg.DEVICE_WIDTH, this.DisplayCfg.DEVICE_HEIGHT] = [this.DisplayCfg.DEVICE_HEIGHT, this.DisplayCfg.DEVICE_WIDTH];
            }
        } else {
            if (this.DisplayCfg.DEVICE_WIDTH > this.DisplayCfg.DEVICE_HEIGHT) {
                this.DisplayCfg.IS_ROTATE = true;
                [this.DisplayCfg.DEVICE_WIDTH, this.DisplayCfg.DEVICE_HEIGHT] = [this.DisplayCfg.DEVICE_HEIGHT, this.DisplayCfg.DEVICE_WIDTH];
            }
        }

            // 宽高比不满足设计时 采用 高度固定，宽度自适应
        if (this.DisplayCfg.DEVICE_WIDTH * this.DisplayCfg.DESIGN_VIEW_HEIGHT !== this.DisplayCfg.DESIGN_VIEW_WIDTH * this.DisplayCfg.DEVICE_HEIGHT) {
            // =============以高度为计算起点
            // 假设 内容高 = 视口高 = 设计高
            // 假设内容高度充满项目视口
            this.DisplayCfg.VIEW_HEIGHT    = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
            this.DisplayCfg.CONTENT_HEIGHT = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
            // 假设项目视口高度充满设备 计算 设备尺寸 比 项目视口尺寸
            this.DisplayCfg.DEVICE_VIEW_SCALE = this.DisplayCfg.DEVICE_HEIGHT / this.DisplayCfg.VIEW_HEIGHT;

            // =============以宽度为假设
            // 此时需要达到 内容宽 = 设计宽
            this.DisplayCfg.CONTENT_WIDTH    = this.DisplayCfg.DESIGN_VIEW_WIDTH;
            // 计算这个情况下 需要的视口宽度
            this.DisplayCfg.VIEW_WIDTH = this.DisplayCfg.CONTENT_WIDTH;

            // 此时 显示高度 为 设备高度
            // 如果 需要的项目视口宽度 超出 设备内能显示的项目视口宽度
            if (this.DisplayCfg.VIEW_WIDTH - this.DisplayCfg.DEVICE_WIDTH / this.DisplayCfg.DEVICE_VIEW_SCALE > 0) {
                // 压缩项目视口 使 宽度完全在设备视口内显示
                const tempScale = (this.DisplayCfg.DEVICE_WIDTH / this.DisplayCfg.DEVICE_VIEW_SCALE) / this.DisplayCfg.VIEW_WIDTH;
                this.DisplayCfg.DEVICE_VIEW_SCALE   = tempScale * this.DisplayCfg.DEVICE_VIEW_SCALE;

                // 内容宽 = 视口宽 = 设计宽
                this.DisplayCfg.VIEW_WIDTH          = this.DisplayCfg.DESIGN_VIEW_WIDTH;
                this.DisplayCfg.CONTENT_WIDTH       = this.DisplayCfg.DESIGN_VIEW_WIDTH;

                // 视口高 = 设备高 / 缩放 ， 内容高 = 设计高
                this.DisplayCfg.VIEW_HEIGHT         = this.DisplayCfg.DEVICE_HEIGHT / this.DisplayCfg.DEVICE_VIEW_SCALE;
                this.DisplayCfg.CONTENT_HEIGHT      = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
            } else {
                const tempScale = 1;
                this.DisplayCfg.DEVICE_VIEW_SCALE = tempScale * this.DisplayCfg.DEVICE_VIEW_SCALE;
                
                // 内容宽 = 设备宽 / 缩放 ， 内容宽 = 设计宽
                this.DisplayCfg.VIEW_WIDTH          = this.DisplayCfg.DEVICE_WIDTH / this.DisplayCfg.DEVICE_VIEW_SCALE;
                this.DisplayCfg.CONTENT_WIDTH       = this.DisplayCfg.DESIGN_VIEW_WIDTH;

                // 视口高 = 内容高 = 设计高
                this.DisplayCfg.VIEW_HEIGHT         = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
                this.DisplayCfg.CONTENT_HEIGHT      = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
            }

        } else {
            // 内容高 = 视口高 = 设计高
            this.DisplayCfg.VIEW_HEIGHT      = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
            this.DisplayCfg.CONTENT_HEIGHT   = this.DisplayCfg.DESIGN_VIEW_HEIGHT;
            this.DisplayCfg.VIEW_WIDTH       = this.DisplayCfg.DESIGN_VIEW_WIDTH;
            this.DisplayCfg.CONTENT_WIDTH    = this.DisplayCfg.DESIGN_VIEW_WIDTH;
            this.DisplayCfg.DEVICE_VIEW_SCALE    = this.DisplayCfg.DEVICE_HEIGHT / this.DisplayCfg.VIEW_HEIGHT;
        }

        this.DisplayCfg.CONTEN_IN_VIEW_LEFT  = (this.DisplayCfg.VIEW_WIDTH - this.DisplayCfg.CONTENT_WIDTH) / 2;
        this.DisplayCfg.CONTEN_IN_VIEW_TOP   = (this.DisplayCfg.VIEW_HEIGHT - this.DisplayCfg.CONTENT_HEIGHT) / 2;
        this.DisplayCfg.CONTEN_IN_VIEW_WIDTH = this.DisplayCfg.CONTENT_WIDTH;
        this.DisplayCfg.CONTEN_IN_VIEW_HEIGHT    = this.DisplayCfg.CONTENT_HEIGHT;

        if (this.DisplayCfg.IS_WEIXIN_GAME) {
            let tempHairSize = 0;
            const hairSize = BeforeInitTools.Weixin_Mobile_Bangs_Size / this.DisplayCfg.DEVICE_VIEW_SCALE;
            // 横屏
            if (this.DisplayCfg.DESIGN_VIEW_HEIGHT < this.DisplayCfg.DESIGN_VIEW_WIDTH) {
                tempHairSize = hairSize - this.DisplayCfg.CONTEN_IN_VIEW_LEFT;
                if (tempHairSize > 0) {
                    this.DisplayCfg.VIEW_WIDTH += tempHairSize;
                    this.DisplayCfg.CONTENT_WIDTH += tempHairSize;
                    this.DisplayCfg.CONTEN_IN_VIEW_LEFT += tempHairSize;
                }
            } else {
                tempHairSize = hairSize - this.DisplayCfg.CONTEN_IN_VIEW_TOP;
                if (tempHairSize > 0) {
                    this.DisplayCfg.VIEW_HEIGHT += tempHairSize;
                    this.DisplayCfg.CONTENT_HEIGHT += tempHairSize;
                    this.DisplayCfg.CONTEN_IN_VIEW_TOP += tempHairSize;
                }
            }
        }

        if (!this.DisplayCfg.IS_WEIXIN_GAME) {

            scaleAttr = `scale(${this.DisplayCfg.DEVICE_VIEW_SCALE},${this.DisplayCfg.DEVICE_VIEW_SCALE} )`;
            if (this.DisplayCfg.IS_ROTATE) {
                const [left, top, width, height] = [
                    (this.DisplayCfg.DEVICE_HEIGHT - this.DisplayCfg.VIEW_WIDTH) / 2,
                    (this.DisplayCfg.DEVICE_WIDTH - this.DisplayCfg.VIEW_HEIGHT) / 2,
                    this.DisplayCfg.VIEW_WIDTH,
                    this.DisplayCfg.VIEW_HEIGHT
                ];
                baseAttr = `position: absolute;overflow: hidden;left:${left}px;top:${top}px;width:${width}px;height:${height}px;`;
                rotationAttr = `rotate(90deg)`;
            } else {
                const [left, top, width, height] = [
                    (this.DisplayCfg.DEVICE_WIDTH - this.DisplayCfg.VIEW_WIDTH) / 2,
                    (this.DisplayCfg.DEVICE_HEIGHT - this.DisplayCfg.VIEW_HEIGHT) / 2,
                    this.DisplayCfg.VIEW_WIDTH,
                    this.DisplayCfg.VIEW_HEIGHT
                ];
                baseAttr = `position: absolute;overflow: hidden;left:${left}px;top:${top}px;width:${width}px;height:${height}px;`;
                rotationAttr = `rotate(0deg)`;
            }
            transformAttr = `-webkit-transform:${scaleAttr}${rotationAttr};-moz-transform:${scaleAttr}${rotationAttr};-ms-transform:${scaleAttr}${rotationAttr};transform:${scaleAttr}${rotationAttr};`;
            
            _CANVAS.parentElement.setAttribute('style', `${baseAttr}${transformAttr}`);
        }
        
        _CANVAS.width   = this.DisplayCfg.VIEW_WIDTH;
        _CANVAS.height  = this.DisplayCfg.VIEW_HEIGHT;
    }
}