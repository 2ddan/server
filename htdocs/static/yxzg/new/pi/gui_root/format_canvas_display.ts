/**
 * 屏幕适配处理
 * * 记录设备视口
 * * 计算保持设计宽高比的情况下，显示大小不小于设计大小的要求下, 整个视口大小
 * * 计算设计视口大小在整个视口内显示范围
 */
import { BeforeInitTools } from './beforeInit';

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
    private static resizeListeners: (() => void)[] = [];
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
    public static addResizeListener(f: () => void) {
        if (FormatCanvasDisplay.resizeListeners.indexOf(f) < 0) {
            FormatCanvasDisplay.resizeListeners.push(f);
        }
    }
    public static resizeCall() {
        FormatCanvasDisplay.resizeListeners.forEach(f => {
            f();
        });
    }
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
            FormatCanvasDisplay.initDesignSize(BeforeInitTools.Design_Width, BeforeInitTools.Design_Height);
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

        FormatCanvasDisplay.resizeCall();
    }
    public static getIsWeixinGAME() {
        return this.DisplayCfg.IS_WEIXIN_GAME;
    }
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
    private static keepHeight_() {
        if (BeforeInitTools.isWeiXinMiniGame() === true) {
            this.DisplayCfg.IS_WEIXIN_GAME = true;
        }

        let baseAttr: string, scaleAttr: string, rotationAttr: string, transformAttr: string;

        this.DisplayCfg.DEVICE_WIDTH = 
                document.documentElement.clientWidth
                || document.body.clientWidth
                || (<any>document.documentElement).screen.availWidth;  // 微信小游戏

        this.DisplayCfg.DEVICE_HEIGHT = 
                document.documentElement.clientHeight
                || document.body.clientHeight
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