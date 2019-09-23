/**
 * gui Input 节点
 * * canvas 上处理原始事件时必须阻止默认处理，否则 Dom 中 Input 获得焦点后会立即失去焦点<因为其他事件的查询导致>
 */

import { ListenerList } from '../util/event';
import { RContainerElement } from './r_containerelement';
import { RElementTypeList } from './r_datastruct';
import { RElementOpt } from './r_element';
import { ListenerListMgr, REventData, REventListener, REventTypes } from './r_event_base';
import { RTextElement } from './r_textelement';

/**
 * change 事件结构
 */
// tslint:disable-next-line:interface-name
export interface IChangeEvent {
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    target: RInputText;
}

export class RInputText extends RContainerElement {
    /**
     * 文本内容
     */
    public get value() {
        return this._value;
    }
    /**
     * 文本内容
     */
    public set value(data: string) {
        if (this._value !== data) {
            this._value     = data;
            this._display   = data;
            this.drawSpan();
            // Tools.log('value', data);

            this.change({ type: 'change', target: this });
        }
    }
    /**
     * DOM 实现的 Input 是否正常工作的标识
     */
    public static inputTextNotWork: any = {};
    /**
     * DOM 实现的 Input
     */
    public static inputText: HTMLInputElement;
    /**
     * DOM input change 事件
     */
    public static domChangeCall: Function;
    /**
     * DOM input blur 事件
     */
    public static domBlurCall: Function;
    protected _value: string;
    /**
     * 文本更新监听列表
     */
    private changeListener:     ListenerList<REventData>;
    private _display: string;
    private _span: RTextElement;
    private _hasDown: boolean;
    /**
     * 文本字符串最大长度
     */
    private _maxLength: number = 100;
    private _cursor: RContainerElement;
    constructor(opt: RElementOpt) {
        super(opt);
        this._type = RElementTypeList.input;
        this.createInputText();
        this.createSpan();
        this.createCursor();
    }
    public static toColorHex(num: any) {
        const str = `0${(Math.round(num * 255)).toString(16)}`;

        return str.substr(str.length - 2, 2);
    }
    /**
     * dom 节点 操作响应
     */
    public static domChange = (e: any) => {
        RInputText.domChangeCall && RInputText.domChangeCall(RInputText.inputText.value);
    }
    /**
     * DOM input 节点blur 调用
     */
    public static domBlur = (e: any) => {
        RInputText.domChange(e);
        RInputText.domChangeCall = undefined;
    }
    /**
     * 是否为 WX 小游戏环境
     */
    public static isWXGame() {
        return (<any>window).pi_modules.load && (<any>window).pi_modules.load.exports.isWXMinigame && (<any>window).pi_modules.load.exports.isWXMinigame();
    }
    /**
     * 添加事件监听
     */
    public addEventListener(_type: string, _listener: REventListener) {
        if (_type === REventTypes.change) {
            !this.changeListener && (this.changeListener = ListenerListMgr.create());
            this.changeListener.add(_listener);
        } else {
            super.addEventListener(_type, _listener);
        }

    }
    /**
     * 移除监听
     * @param _type 监听类型
     * @param _listener 监听方法
     */
    public removeEventListener(_type: string, _listener: REventListener) {
        if (_type === REventTypes.change) {
            this.changeListener.remove(_listener);
        } else {
            super.removeEventListener(_type, _listener);
        }
    }
    /**
     * 清空事件监听
     */
    public clearListener() {
        super.clearListener();
        ListenerListMgr.recycle(this.changeListener);
    }
    
    // 事件响应相关
    public down(e: REventData) {
        // 激活输入
        // this.active();
        this._hasDown = true;

        // 停止冒泡
        e.stopPropagation = true;

        super.down(e);
    }

    // 事件响应相关
    public up(e: REventData) {
        // 激活输入
        if (this._hasDown && !e.isOnlyBubble) {
            // this.active();
        }
        
        this._hasDown = false;

        super.up(e);
    }

    public focus(e: REventData) {
        super.focus(e);
        this.active();
    }

    public blur(e: REventData) {
        this.cacel();
        super.blur(e);
    }

    public change(e: IChangeEvent) {
        const evt: REventData = <any>{
            x               : 0,
            y               : 0,
            lastX           : 0,
            lastY           : 0,
            deltaX          : 0,
            deltaY          : 0,
            type            : 'change',
            pointerType     : REventTypes.wheel,
            pointerID       : -1,
            stopPropagation : false,
            preventDefault  : false,
            timeStamp       : this.document.timeStamp,
            pointers        : [],
            path            : [],
            timeNow         : this.document.timeStamp,
            isPrimary       : true
        };

        evt.current = this;
        evt.source = this;

        this.changeListener && this.changeListener.notify(evt);
    }

    // // 事件响应相关
    // public click(e: REventData) {
    //     // 激活输入
    //     this.active();

    //     // 停止冒泡
    //     e.isPostprocess = true;

    //     super.click(e);
    // }

    /**
     * 更新
     */
    public changeText = (text: string) => {
        this.value = text;
    }
    /**
     * 输入结束，重置
     */
    public resetText = (text: string) => {
        this.value = text;
    }
    public remove() {
        this.cacel();

        super.remove();
    }
    protected alignSet() {
        this.document.applyStyle(this.style, 'alignItems', 2)
            .applyStyle(this.style, 'alignContent', 2);
    }
    private drawSpan() {
        this.clipLength();
        this.checkPassWord();
        // 绘制
        this._span.nodeValue = this._display;
        // gui._set_text_content(this.document.uniqueID, this._span.uniqueID, this._display);
    }
    private createInputText() {
        if (RInputText.inputText !== undefined) return;

        try {
            RInputText.inputText            = document.createElement('input');
            RInputText.inputText.onchange   = RInputText.domChange;
            RInputText.inputText.oninput    = RInputText.domChange;

            RInputText.inputText.style.display  = 'none';
            RInputText.inputText.style.position = 'absolute';
            RInputText.inputText.style.zIndex   = '1000000';
            
            RInputText.inputText.style.left     = `-1000px`;
            RInputText.inputText.style.top      = `-1000px`;

            document.body.appendChild(RInputText.inputText);

        } catch (error) {
            RInputText.inputText = RInputText.inputTextNotWork;
        }
    }
    private createSpan() {
        const opt: RElementOpt = {
            document: this.document,
            RenderFlag: this.document.RenderFlag
        };

        this._span = new RTextElement(opt);
        
        this.appendChild(this._span);
        // this._content.appendChild(this._span);

        this.alignSet();

        setTimeout(() => {
        
            if (this._isDestroy) return;
    
            const p = this.style;
            const a = this._span.style;

            // this._span.style.width        = this.style.width;
            // this._span.style.height       = this.style.height;

            let temp = this.document.readStyle(p, 'color');
            temp && (this.document.applyStyle(a, 'color', temp));

            temp = this.document.readStyle(p, 'fontFamily');
            temp && (this.document.applyStyle(a, 'fontFamily', temp));

            temp = this.document.readStyle(p, 'fontSize');
            temp && (this.document.applyStyle(a, 'fontSize', temp));

            temp = this.document.readStyle(p, 'fontWeight');
            temp && (this.document.applyStyle(a, 'fontWeight', temp));
            
            temp = this.document.readStyle(p, 'fontStyle');
            temp && (this.document.applyStyle(a, 'fontStyle', temp));
        }, 20);
    }
    private clipLength() {
        const attributes: any = this.attributes;

        if (attributes.maxLength !== undefined) {
            const len = Math.min(attributes.maxLength, this._value.length);
            this._value = this._value.substr(0, len);
            // 超出${this.attributes.maxLength}部分被忽略
        }
        if (attributes.minLength !== undefined) {
            if (attributes.minLength > this._value.length) {
                // 最小字符数${this.attributes.maxLength}
            }
        }
    }
    private checkPassWord() {
        const attributes: any = this.attributes;

        if (attributes.type === 'password') {
            this._display = '';

            for (let i = this._value.length - 0; i >= 0; i--) {
                this._display += '\u2022';
            }
        }
    }
    /**
     * 激活输入
     */
    private active() {
        if (RInputText.isWXGame() || RInputText.inputText === RInputText.inputTextNotWork) {
            this.bindEvent2(); 
        } else {
            this.bindEvent();
        }
        this.renderCursor();
    }
    /**
     * 结束/取消输入
     */
    private cacel = () => {

        if (RInputText.isWXGame() || RInputText.inputText === RInputText.inputTextNotWork) {
            this.unbindEvent2();
        } else {
            RInputText.domBlur({});
            this.unbindEvent();
        }

        this.hiddenCursor();
    }
    private bindEvent() {
        RInputText.inputText.style.display      = 'block';
        
        if (this._value !== undefined && this._value !== '') {
            RInputText.inputText.value      = this._value;
        } else {
            RInputText.inputText.value      = '';
        }
        for (const k in this.attributes) {
            RInputText.inputText[k] = this.attributes[k];
        }

        RInputText.domChangeCall = this.changeText;
        RInputText.domBlurCall   = undefined;

        RInputText.inputText.focus({ preventScroll: true });
    }
    private unbindEvent() {

        for (const k in this.attributes) {
            RInputText.inputText[k] = undefined;
        }

        RInputText.domChangeCall = undefined;
        RInputText.domBlurCall   = undefined;
        
        RInputText.inputText.blur();
        RInputText.inputText.style.display = 'none';
    }
    private bindEvent2() {
        this.createKeyBoard();
    }
    private unbindEvent2() {
        // 
    }
    private createKeyBoard() {
        const _window = <any>window;

        // console.warn('createKeyBoard');
        if (_window.pi_modules && _window.pi_modules['pi_bridge/keyboard']) {
            const keyBoard      = _window.pi_modules['pi_bridge/keyboard'].exports.Keyboard;
            keyBoard.onInput    = this.inputProcessKey;
            keyBoard.onEnd      = this.endProcessKey;
            keyBoard.show({
                maxLength: this._maxLength,
                defaultValue: this.value,
                multiple: true
            });

            console.warn('keyBoard OK');
        }
    }
    private inputProcessKey = (key: string) => {
        // console.warn('inputProcessKey OK');
        // this.processKey(-1, key);
    }
    private endProcessKey = (key: string) => {
        // console.warn('endProcessKey OK');
        // this.processKey(35, key);
        this.value = key;
    }
    private renderCursor() {
        this.document.applyStyle(this._cursor.style, 'display', 'flex');
    }
    private hiddenCursor() {
        this.document.applyStyle(this._cursor.style, 'display', 'none');
    }
    private createCursor() {
        const opt: RElementOpt = {
            document: this.document,
            RenderFlag: this.document.RenderFlag
        };

        this._cursor    = new RContainerElement(opt);
        
        this.document
            .applyStyle(this._cursor.style, 'backgroundColor', '#eeeeee')
            .applyStyle(this._cursor.style, 'width', '2px');
        
        setTimeout(() => {
        
            if (this._isDestroy) return;

            this.document
                .applyStyle(this._cursor.style, 'height', `${this.document.readStyle(this._span.style, 'fontSize')}px`);
        }, 50);

        this.hiddenCursor();
        this.appendChild(this._cursor);
    }
    // private createContent() {
    //     const opt: RElementOpt = {
    //         document: this.document,
    //         RenderFlag: this.document.RenderFlag
    //     };

    //     this._content    = new RContainerElement(opt);
    //     this._content.style.backgroundColor = `#eeeeee`;
    //     this._content.style.width   = this.style.width;
    //     this._content.style.height  = this.style.height;
    //     this.appendChild(this._content);
    // }
}