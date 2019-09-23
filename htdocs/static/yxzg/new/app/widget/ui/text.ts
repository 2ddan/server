
import { Widget } from '../../../pi/gui_virtual/widget';
import { cfgText } from './cfg_text';

/**
 * 渐变配置， x1y1x2y2可以使用百分数，表示图像宽高度的百分比
 */
export interface GradientCfg {
    x1: number, y1: number, r1?: number, // 渐变的起始位置及半径，不定义半径或半径为0，表示为线性渐变
    x2: number, y2: number, r2?: number, // 渐变的起始和结束位置，径向渐变
    /**
     * steps为2个元素一组，第一个为0-1之间的数，第二个为颜色。比如：[0, "rgba(0,0,0,0.5)", 1, "#636363"]
     */
    steps: Array<number | string>;
};

// 图像文本配置
export interface ImgTextCfg {
    text: string,
    font: string,
    /**
     * 颜色 或渐变颜色
     */
    color: string | GradientCfg,
    /**
     * 阴影
     */
    shadow: {
        /**
         * X偏移量
         */
        offsetX: number,
        /**
         * Y偏移量
         */
        offsetY: number,
        /**
         * 模糊值，一般为5
         */
        blur: number,
        /**
         * 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
         */
        color: string
    },
    /**
     * 描边宽度
     */
    strokeWidth: number,
    /**
     * 描边颜色
     */
    strokeColor: string | GradientCfg,
    show?: string;
    /**
     * 字间距
     */
    space?: number;
    /**
     * 行高
     */
    lineHeight?: number;
    /**
     * 倾斜因子(用measureText方法取到的字体宽度未考虑字体的倾斜)
     */
    factor?: number;
    /**
     * 某些字体存在bug，高度总是比其它字体的size大，因此应乘以一个比1大的数
     */
    hfactor?: number;
}

export class Text extends Widget {
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props): void {
        const cfgs = getTextCfg(props);
        this.props = cfgs;
        this.paint();
    }
}

/**
 * 获取字体配置
 * @param props 注意：原则上字体配置不应改动除大小外的其他属性
 */
export const getTextCfg = (props: any) => {
    // 阴影
    let textShadow:string = ''; 
    let fontStyle:string = '';
    let fontWeight:string = '';
    let fontSize:string = '';
    let fontFamily:string = '';
    let textStroke:string ='';
    let letterSpacing:string = '';
    let textGradient:string = '';
    let color:string = '';
    let textCfg: any;
    let cfg: any;
    let style: any;

    // 这两项只和项目相关，基本可以定了
    textCfg = { zoomfactor: 2, hfactor: 1 };

    cfg = cfgText[props.textCfg];
    for (let k in cfg) {
        textCfg[k] = cfg[k];
    }

    // 替换传进来的文字
    textCfg.text = String(props.show || props.text);
    // 取出对应的文字配置信息替换成style
   
    // font-style
    fontStyle = `font-style:${textCfg.font.split(" ")[0]};`;

    // font-widget
    fontWeight = `font-weight:${textCfg.font.split(" ")[1]};`;

    // font-size
    fontSize = `font-size:${props.fontSize ? props.fontSize+'px' : textCfg.font.split(" ")[2] };`;

    // font-family
    fontFamily = `font-family:${textCfg.font.split(" ")[3]};`;

    // shadow
    if (textCfg.shadow) { 
        textShadow = `text-shadow:${textCfg.shadow.color} ${textCfg.shadow.offsetX}px ${textCfg.shadow.offsetY}px ${textCfg.shadow.blur}px;`;
    }

    // text-gradient
    // background:linear-gradient(0deg, #eee000, #cf0800 10%, #600000 50%, #996990);
    // color: { deg: 'y', steps: [0, "#fffde7", 0.45, "#ffeeaa", 1, "#cab79d"] },
    if (textCfg.color && textCfg.color.steps) {
        let str = '';
        for(let i = 0, len = textCfg.color.steps.length; i < len; i++) {
            str += `${textCfg.color.steps[i]}${i < len-1 ? ', ' : ''}`;
        }
        textGradient = `text-gradient:linear-gradient(${textCfg.color.deg == 'x' ? 90 : 180}deg, ${str});`;
    }
    else if (textCfg.color) {
        color = `color:${textCfg.color};`;
    }

    // text-stroke
    if(textCfg.strokeWidth && textCfg.strokeColor) {
        textStroke = `text-stroke:${textCfg.strokeWidth}px ${textCfg.strokeColor};`;
    }

    // letter-spacing
    letterSpacing = `letter-spacing:${props.space ? props.space : (textCfg.space || 0)}px;`
   

    style = fontStyle + fontWeight + fontSize + fontFamily + textShadow + textStroke + letterSpacing + textGradient + color;
    
    return {
        style: style,
        text: textCfg.text
    };
}