/**
 * gui 文本节点结构
 */

import { gui } from './gui';
import { RElementTypeList } from './r_datastruct';
import { RElement, RElementOpt } from './r_element';
import { Tools } from './tools';

/**
 * 文本节点
 */
export class RTextElement extends RElement {
    /**
     * 文本节点 默认样式表ID
     */
    public static defualClassID: number;
    /**
     * 文本渲染前处理调用接口
     */
    public static BeforeDisplayCall: (nodeValue: string) => string;
    /**
     * 文本内容
     */
    public get nodeValue() {
        return this._nodeValue;
    }
    /**
     * 文本内容
     */
    public set nodeValue(data: string) {
        if (RTextElement.BeforeDisplayCall) {
            data = RTextElement.BeforeDisplayCall(data);
        }
        
        this._nodeValue = data;

        if (this._isDestroy) return;

        (<any>window).__jsObj = `${data}`;
        gui._set_text_content(this.document.uniqueID, this.uniqueID);
        Tools.log(data);
    }
    /**
     * DOM 渲染时的 文本节点
     */
    private _nodeValue: string;

    constructor(opt: RElementOpt) {
        opt.uniqueID = gui._create_text_node(opt.document.uniqueID);

        super(opt);
        this._type = RElementTypeList.SPAN;
        this.initDefaultStyle('span');

        if (RTextElement.defualClassID) {
            this.document.sheet.setNodeTextStyleClass(this, RTextElement.defualClassID);
        }
    }

    // public remove() {
    //     super.remove();
    // }

    private createCall() {
        // 
    }
}