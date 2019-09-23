
import { Forelet } from '../gui_virtual/forelet';
import { Widget } from '../gui_virtual/widget';

export const forelet: Forelet = new Forelet();

/**
 * demo01
 * * 测试基本功能
 * * 样式解析
 * * 事件解析
 * * 组件匹配
 * * 简单数据使用
 */

export class GUIHtml extends Widget {
    public tapMap: Map<number, string> = new Map();
    public setProps(prop: Prop) {
        if (prop && prop.innerhtml) {
            for (let i = 0, len = prop.innerhtml.length; i < len; i++) {
                const cfg = prop.innerhtml[i];
                if (cfg['line-height']) {
                    (<any>cfg).height = cfg['line-height'];
                } else if (cfg['font-size']) {
                    (<any>cfg).height = cfg['font-size'];
                }
    
                if (cfg[TapStyles[0]]) {
                    this.tapMap.set(i, cfg[TapStyles[0]]);
                    cfg[TapStyles[0]] = `onTap(${i}, e)`;
                }
            }
        }
        super.setProps(prop);
    }
    public onTap(id: string, e: any) {
        const cmd = this.tapMap.get((<any>id) - 0);
        if (cmd !== undefined) {
            const cmdList = cmd.replace(')', '').split('(');
            const funcName = cmdList[0];
            if (cmdList[1]) {
                const arg = cmdList[1].replace('(', '').replace(/^('|")/,'').replace(/('|")$/,'').trim();
                const targetW = this.parentNode.w;
                if (funcName && targetW && targetW[funcName]) {
                    targetW[funcName](arg, e);
                }
            } else {                
                const targetW = this.parentNode.w;
                if (funcName && targetW && targetW[funcName]) {
                    targetW[funcName](e);
                }
            }
        }
    }
}

export interface Prop {
    innerhtml: GUIInnerHtml;
}

// tslint:disable-next-line:interface-name
export interface IImageData {
    dType: string; // img
    src: string;
    width: string;
    height: string;
}

// tslint:disable-next-line:interface-name
export interface ITextData {
    dType: string; // text
    text: string;
    ['color']?: string;
    ['on-tap']?: string; // 组件事件
    ['background-color']?: string;
    ['font-size']?: string;
    ['font-family']?: string;
    ['font-weight']?: string;
    ['line-height']?: string;
    ['text-indent']?: string;
    ['opacity']?: string;
}

const TextStyles = ['color', 'font-size', /* 'width' , 'height',*/  'font-family', 'font-weight', 'line-height', 'text-indent'];
const DivStyles  = [/*'width',*/ 'height', 'background-color', 'opacity'];
const ImgStyles  = ['width', 'height'];
const TapStyles  = ['on-tap'];
const URL        = ['src'];
const Text       = ['text'];

export type GUIInnerHtml = (ITextData | IImageData)[];

// const demoprop: Prop =  {
//     innerhtml: [
//         {
//             dType: 'text',
//             text: '逋',
//             color: '#fff000',
//             'font-size': '20px',
//             'font-weight': '600'
//         },
//         {
//             dType: 'text',
//             text: '逋逋逋',
//             color: '#0ff000',
//             'font-size': '16px',
//             'font-weight': '600',
//             'background-color': '#0f0fa0',
//             'on-tap': 'click("ssss")'
//         },
//         {
//             dType: 'text',
//             text: '逋逋逋逋逋逋',
//             color: '#0ffff0',
//             'font-size': '16px',
//             'font-weight': '600',
//             'background-color': '#0f0fa0'
//         },
//         {
//             dType: 'img',
//             src: '../images/01.png',
//             color: '#0ff000',
//             width: '40px',
//             height: '40px'
//         }
//     ]
// };

/**
 * 切分 span,a,img,div
 * 封装: 用 div 封装
 * 样式处理:
 *      span
 *      img
 *      需移动到div
 * * 文本内关键字
 *      <, >, style, a, span, img, div
 *      
 */

const init = () => {
    
    forelet.paint(
        { 
            textStyles: TextStyles,
            divStyles: DivStyles,
            imgStyles: ImgStyles
        }
    );
};

// registerGUIInitHook(init)
init();