/**
 * gui textarea 节点
 */

import { RElementTypeList } from './r_datastruct';
import { RElementOpt } from './r_element';
import { RInputText } from './r_inputtext';

export class RTextArea extends RInputText {
    constructor(opt: RElementOpt) {
        super(opt);
        this._type = RElementTypeList.textarea; 
    }
    /**
     * 文本显示的 align 布局设置调用
     * * TextArea 默认不设置
     */
    protected alignSet() {
        //
    }
}