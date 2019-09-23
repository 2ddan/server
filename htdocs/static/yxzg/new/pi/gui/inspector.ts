/**
 * GUI 调试器
 * * 节点树面板
 * * 属性面板
 * * 数据打印面板
 */

import { RContainerElement } from './r_containerelement';
import { RDocument } from './r_document';
import { RElement } from './r_element';
import { RTextElement } from './r_textelement';
import { Tools } from './tools';
import { ExplainStyle } from './tools_explain';

export class Inspector {
    public static document: Document;
    public dom: Document;
    public gui: RDocument;
    public rootNode: RElement;
    /**
     * 节点树
     */
    public nodeTree: NodeTree;
    /**
     * 节点样式面板
     */
    public stylePanel: StylePanel;
    /**
     * Rust 层数据面板
     */
    public rustPanel: RustPanel;
    /**
     * 目标变更的监听列表
     */
    public changeTargetListeners: ((ele: RElement) => void)[] = [];
    constructor(gui: RDocument, rootNode: RElement) {
        this.gui        = gui;
        this.rootNode   = rootNode || gui.body;

        this.createDocument();
        this.createTree();
        this.createStylePanel();
        this.createRustPanel();

        gui.afterDisplayDebugLayer = NodeDisplay.displayCall;
    }
    public doRefresh(rootNode?: RElement) {
        this.rootNode   = rootNode || this.rootNode;
        this.nodeTree.destroy();
        this.createTree();
    }
    /**
     * 变更目标节点
     * @param ele 目标节点
     */
    public doChangeTarget(ele: RElement) {
        this.gui.eventMgr.debugFocus(ele);

        this.changeTargetListeners.forEach(f => {
            f(ele);
        });
    }
    /**
     * 变更目标节点
     * @param ele 目标节点
     */
    public callChangeTarget(ele: RElement) {
        this.changeTargetListeners.forEach(f => {
            f(ele);
        });
    }
    public addChangeTargetListen(f: (ele: RElement) => void) {
        if (this.changeTargetListeners.indexOf(f) < 0) {
            this.changeTargetListeners.push(f);
        }
    }
    /**
     * 创建节点树
     */
    private createTree() {
        this.nodeTree = new NodeTree(this, this.rootNode);
    }
    /**
     * 创建 style 面板
     */
    private createStylePanel() {
        this.stylePanel = new StylePanel(this);
    }
    /**
     * 创建 rust 面板
     */
    private createRustPanel() {
        this.rustPanel = new RustPanel(this, this.gui);
    }
    /**
     * 创建 上下文 面板
     */
    private createDocument() {
        const windowCreationOptionsList = {
            width: '300px',
            height: '300px',
            top: 0,
            right: 0
        };

        const windowCreationOptions = Object.keys(windowCreationOptionsList)
            .map(
                (key) => `${key}'='${(windowCreationOptionsList)[key]}`
            )
            .join(',');

        const popupWindow = window.open(``, `GUIInspector`, windowCreationOptions);
        Inspector.document = popupWindow.document;
        Inspector.document.body.style.cssText = 'backgroundColor: #404040; margin: 0;padding: 0;width: 300px;height: 300px;';
        this.dom = Inspector.document;
    }
}

class NodeTree {
    public host: HTMLElement;
    public head: HTMLElement;
    public inspector: Inspector;
    public root: NodeDisplay;
    public btn: HTMLElement;
    public visible: boolean = true;
    public rootNode: RElement;
    constructor(ins: Inspector, rootNode: RElement) {
        this.inspector  = ins;
        this.rootNode   = rootNode;

        this.createHost();
        this.createBtn();
        this.createTree();
    }
    public destroy() {
        this.inspector.dom.body.removeChild(this.host);
    }
    /**
     * 变更目标节点
     * @param ele 目标节点
     */
    public doChangeTarget = (ele: RElement) => {
        this.inspector.doChangeTarget(ele);
        this.root.afterChangeTarget(ele);
    }
    /**
     * 变更目标节点
     * @param ele 目标节点
     */
    public callChangeTarget = (ele: RElement) => {
        this.inspector.callChangeTarget(ele);
        this.root.afterChangeTarget(ele);
    }
    public trigger = (e: any) => {
        this.visible = !this.visible;

        this.btn.innerText = this.visible ? `隐藏` : `显示`;
        this.root.host.style.display = this.visible ? 'inline-block' : 'none';
    }
    /**
     * 创建面板
     */
    private createHost() {
        this.host = Inspector.document.createElement('div');
        this.host.style.cssText = `position:absolute;width:50%;height:100%;left:0;border:1px solid #666;opacity:0.8;background-color:#9ed33c;overflow:auto;`;

        Inspector.document.body.appendChild(this.host);
    }
    /**
     * 创建面板 - 树结构
     */
    private createTree() {
        this.root = new NodeDisplay(this, this.rootNode);

        this.host.appendChild(this.root.host);

        this.root.host.style.width = '10000%';
    }
    private createBtn() {
        this.btn = Inspector.document.createElement('div');
        this.btn.style.cssText = `width:100px;height:30px;background-color:#dddd00`;
        this.btn.innerText = this.visible ? `隐藏` : `显示`;
        this.host.appendChild(this.btn);

        this.btn.onclick = this.trigger;
    }
}

class NodeDisplay {
    public host: HTMLElement;
    public head: NodeName;
    public content: HTMLElement;
    public ele: RElement;
    public nodeTree: NodeTree;
    public childs: NodeDisplay[] = [];
    public parent: NodeDisplay;
    public static NodeDisplayMap: Map<number, NodeDisplay> = new Map();
    public static displayCall = (ele: RElement) => {
        if (!ele.isDestroy) {
            const nodeDisplay = NodeDisplay.NodeDisplayMap.get(ele.uniqueID);
            nodeDisplay.nodeTree.callChangeTarget(ele);
            nodeDisplay.head.doExpend({});
        }
    };
    constructor(nodeTree: NodeTree, ele: RElement) {
        this.nodeTree = nodeTree;
        this.ele = ele;

        this.createHost();
        this.createHead();
        this.createContent();
        this.createChildren();
        
        this.expend({});

        NodeDisplay.NodeDisplayMap.set(ele.uniqueID, this);
    }
    public afterChangeTarget = (ele: RElement) => {
        this.head.afterSelect(ele);

        this.childs.forEach((v,i) => {
            v.afterChangeTarget(ele);
        });
    }
    public doChangeTarget() {
        this.nodeTree.doChangeTarget(this.ele);
    }
    public expend = (e: any) => {
        if (this.head) {
            if (this.head.isExpend) {
                this.content.style.display = 'block';
            } else {
                this.content.style.display = 'none';
            }
        }
    }
    private createHost() {
        this.host = Inspector.document.createElement('div');
        this.host.style.cssText = `position:relative;width:auto;height:auto;`;
    }
    private createHead() {
        this.head = new NodeName(this, this.ele);

        this.host.appendChild(this.head.host);
    }
    private createContent() {
        this.content = Inspector.document.createElement('div');
        this.content.style.cssText = `position:relative;height:auto;margin-left:10px;`;

        this.host.appendChild(this.content);
    }
    private createChildren() {
        const childs = (<RContainerElement>this.ele).childNodes;
        if (childs) {
            childs.forEach((v, i) => {
                const node: NodeDisplay = new NodeDisplay(this.nodeTree, v);
                this.content.appendChild(node.host);

                this.childs.push(node);
                node.parent = this;
            });
        }
    }
}

class NodeName {
    public ele: RElement;
    public title: HTMLSpanElement;
    public flag: HTMLSpanElement;
    public host: HTMLElement;
    public node: NodeDisplay;
    public isExpend: boolean;
    public isSelect: boolean = false;
    constructor(node: NodeDisplay, ele: RElement) {
        this.node   = node;
        this.ele    = ele;
        this.isExpend = false;

        this.createHost();
        this.createFlag();
        this.createTitle();
    }
    public afterSelect = (ele: RElement) => {
        if (this.ele === ele) {
            this.host.style.backgroundColor = '#e03030';
        } else {
            this.host.style.backgroundColor = '#5591dc';
        }
    }
    public select = (e: any) => {
        this.node.doChangeTarget();
    }
    public expend = (e: any) => {
        this.isExpend = !this.isExpend;
        this.node.expend(e);
        this.flag.innerText = this.isExpend ? '\u25cb' : '\u25cf';
        if (this.isExpend) {
            this.doExpend(e);
        }
    }
    public doExpend = (e: any) => {
        this.isExpend = true;
        this.node.expend(e);
        this.flag.innerText = this.isExpend ? '\u25cb' : '\u25cf';
        if (this.isExpend && this.node.parent) {
            this.node.parent.head.doExpend(e);
        }
    }
    private createHost() {
        this.host = Inspector.document.createElement('div');
        this.host.style.cssText = `position:relative;height:24px;font-size:20px;border:1px solid #ddd;background-color:#5591dc;`;
    }
    private createTitle() {
        let titleStr = '';
        titleStr += ` - ${this.ele._type}: `;
        titleStr += `<span style="color:#813c85;">${this.ele.uniqueID}</span> -(lv: ${this.ele.level} ${this.ele.level === 0 ? '- body' : ''})`;

        if (this.ele.attributes && (<any>this.ele.attributes).w_tag) {
            titleStr += ` - <span style="color:#1a029c;font-weight:800;">${(<any>this.ele.attributes).w_tag}</span>`;
        }
        
        if (this.ele.attributes && (<any>this.ele.attributes).group !== undefined) {
            titleStr += ` - ${(<any>this.ele.attributes).group}`;
        }
        
        if (this.ele.virtual && (<any>this.ele.virtual).wc) {
            titleStr += ` - wclass="${(<any>this.ele.virtual).wc}"`;
        }

        if (this.ele.attributes.debug !== undefined) {
            titleStr += ` - ${this.ele.attributes.debug}`;
        }
        
        this.title = Inspector.document.createElement('div');
        this.title.style.cssText = 'display:inline-block;background-color:#82dfef;';
        // tslint:disable-next-line:no-inner-html
        this.title.innerHTML = titleStr;

        this.host.appendChild(this.title);

        this.title.onclick = this.select;
        this.title.style.cursor  = 'pointer';
    }
    private createFlag() {
        this.flag = Inspector.document.createElement('span');
        this.flag.style.cssText = 'display:inline-block;color:#ffffff;background-color:#f04b22;letter-spacing:8px;text-indent:8px;';
        this.flag.innerText = this.isExpend ? '\u25cb' : '\u25cf';
        this.flag.setAttribute('disenabled', 'disenabled');

        this.host.appendChild(this.flag);

        this.flag.onclick = this.expend;
        this.flag.style.cursor  = 'pointer';
    }
}

class StylePanel {
    public styleMap: Map<string, AttrComp> = new Map();
    public target: RElement;
    public host: HTMLElement;
    public content: HTMLElement;
    public inspector: Inspector;
    public btn: HTMLElement;
    public visible: boolean = true;
    public addChangeTargetListeners: ((str: string) => void)[] = [];
    constructor(ins: Inspector) {
        this.inspector = ins;

        this.createHost();
        this.createBtn();
        this.createContent();
        this.createList();

        this.inspector.addChangeTargetListen(this.changeTarget);
    }
    public trigger = (e: any) => {
        this.visible = !this.visible;

        this.btn.innerText = this.visible ? `隐藏` : `显示`;
        this.content.style.display = this.visible ? 'block' : 'none';
    }
    /**
     * 手动修改后 将修改应用到 节点上
     */
    public changeTargetStyle(key: string, value: string) {
        if (!this.target) return;

        this.target.style[key] = value;
        if (this.target.virtual) {
            this.target.virtual.style[key] = value;
        }
    }
    /**
     * 添加目标变更时的监听
     */
    public addChangeTargetListen(f: (str: string) => void) {
        if (this.addChangeTargetListeners.indexOf(f) < 0) {
            this.addChangeTargetListeners.push(f);
        }
    }
    /**
     * 变更目标节点
     */
    public changeTarget = (target: RElement) => {
        this.target = target;
        this.refreshDisplay();
    }
    /**
     * 创建面板
     */
    private createHost() {
        this.host = Inspector.document.createElement('div');
        this.host.style.cssText = `position:absolute;width:50%;height:50%;right:0;border:1px solid #666;opacity:0.8;background-color:#1e9eb3;overflow:auto;`;

        Inspector.document.body.appendChild(this.host);
    }
    /**
     * 创建面板 - 内容
     */
    private createContent() {
        this.content = Inspector.document.createElement('div');
        this.content.style.cssText = `width:auto;height:500px;right:0;background-color:#1e9eb3;display:flex;flex-direction:column;flex-wrap:wrap;`;

        this.host.appendChild(this.content);
    }
    /**
     * 创建面板 - 条目
     */
    private createList() {
        styleList.forEach((v, i) => {
            const attr = new AttrComp(this, v);

            this.styleMap.set(v, attr);
            this.content.appendChild(attr.host);
        });
    }
    /**
     * 目标变更后刷新 面板显示
     */
    private refreshDisplay() {
        if (!this.target.virtual) return; // body

        if (!this.target.virtual.style) {
            this.target.virtual.style = {};
        }
        const style = this.target.style;

        styleList.forEach((v, i) => {
            const attr = this.styleMap.get(v);

            if (attr) {
                attr.refreshDisplay(ExplainStyle.explain(v, style[v]));
            }
        });
    }
    private createBtn() {
        this.btn = Inspector.document.createElement('div');
        this.btn.style.cssText = `width:100px;height:30px;background-color:#dddd00`;
        this.btn.innerText = this.visible ? `隐藏` : `显示`;
        this.host.appendChild(this.btn);

        this.btn.onclick = this.trigger;
    }
}

class AttrComp {
    public title: string;
    public value: string;
    public host: HTMLElement;
    public dat0: HTMLElement;
    public dat1: HTMLInputElement;
    public panel: StylePanel;
    public isActive: boolean;
    constructor(panel: StylePanel, name: string) {
        this.title      = name;
        this.panel      = panel;
        this.isActive   = false;

        this.createHost();
        this.createDat0();
        this.createDat1();
    }
    public change = (e: any) => {
        if (this.value === this.dat1.value) {
            return;
        }

        if (this.value !== this.dat1.value) {
            if (this.dat1.value === undefined) {
                return;
            }
            if (this.dat1.value === 'undefined') {
                return;
            }
        }

        this.value  = this.dat1.value;
        if (this.title === 'backgroundColor' || this.title === 'color') {
            this.dat1.style.backgroundColor = this.value;
        }

        this.panel.changeTargetStyle(this.title, this.value);
    }
    public refreshDisplay(value: string) {
        this.value = value;
        this.dat1.value = value;
        if (this.title === 'backgroundColor' || this.title === 'color') {
            this.dat1.style.backgroundColor = this.value;
        }
    }
    private createHost() {
        this.host = Inspector.document.createElement('div');
        this.host.style.cssText = `width:400px;margin:0;padding:0;height:25px;left:0;border:1px solid #666;font-size:16px;display:flex;`;
    }
    private createDat0() {
        this.dat0 = Inspector.document.createElement('div');
        this.dat0.style.cssText = `margin:0;padding:0;width:50%;height:25px;left:0;display:inline-flex;text-align:right;justify-content:flex-end;`;
        this.dat0.innerText = `${this.title}：`;

        this.host.appendChild(this.dat0);
    }
    private createDat1() {
        this.dat1 = Inspector.document.createElement('input');
        this.dat1.style.cssText = `margin:0;padding:0;width:50%;height:25px;right:0;display:inline;font-size:12px;`;
        this.host.appendChild(this.dat1);

        // this.dat1.onchange = this.change;
        this.dat1.onfocus = this.focus;
        this.dat1.onblur = this.blur;
    }
    private blur = (e: any) => {
        this.isActive = false;
        this.change(e);
    }
    private focus = (e: any) => {
        this.isActive = true;
    }
}

// tslint:disable-next-line:no-unnecessary-class
class RustPanel {
    public ins: Inspector;
    public target: RElement;
    public data: any;
    public doc: RDocument;
    public content: HTMLTextAreaElement;
    public dom: HTMLDivElement;
    constructor(ins: Inspector, doc: RDocument) {
        this.init(ins, doc);

        ins.addChangeTargetListen(this.changeTarget);
    }
    public changeTarget = (target: RElement) => {
        this.target = target;
        // this.data   = RDocument.nodeInfo(this.doc.uniqueID, target.uniqueID);

        this.changeDisplay();

        Tools.log(target);
    }
    public changeDisplay() {
        let value = '';

        // 一般节点的 attributes 数据
        this.data   = this.target.attributes;
        Object.keys(this.data).forEach((v, i) => {
            if (v[0] !== '_') {
                value += `${v}: ${this.data[v]}\n`;
            }
        });

        // 文本节点的 文本内容
        if ((<RTextElement>this.target).nodeValue) {
            value += `nodeValue: ${(<RTextElement>this.target).nodeValue}\n`;
        }

        this.content.value = value;
    }
    public init(ins: Inspector, doc: RDocument) {
        this.ins = ins;
        this.doc = doc;
        this.dom = document.createElement('div');
        this.dom.style.cssText = 'position:absolute;width:50%;height:50%;right:0;bottom:0;background-color:#9fcf0099;overflow-y:auto;';
        this.ins.dom.body.appendChild(this.dom);
        
        this.createContent();
    }
    public createContent() {
        this.content = document.createElement('textarea');
        this.content.style.cssText = 'position:absolute;width:100%;height:100%;background-color:#aaaaaa99;';
        this.dom.appendChild(this.content);
    }
}

const styleList = [
    'alignContent',
    'alignItems',
    'alignSelf',
    'background',
    'backgroundColor',
    'borderColor',
    'borderImage',
    'borderRadius',
    'borderWidth',
    'bottom',
    'boxShadow',
    'color',
    'direction',
    'display',
    'flexBasis',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'height',
    'justifyContent',
    'left',
    'letterSpacing',
    'lineGradient',
    'lineHeight',
    'margin',
    // 'marginBottom',
    // 'marginLeft',
    // 'marginRight',
    // 'marginTop',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'opacity',
    'outlineColor',
    'outlineOffset',
    'outlineStyle',
    'outlineWidth',
    'oveflowWrap',
    'overflow',
    'padding',
    // 'paddingBottom',
    // 'paddingLeft',
    // 'paddingRight',
    // 'paddingTop',
    'position',
    'radioGradient',
    'right',
    'rotate',
    'scale',
    'scroll',
    'textAlign',
    'textContent',
    'textDecoration',
    'textIndent',
    'textOverflow',
    'textShadow',
    'textTransform',
    'top',
    'transform',
    'transformOrigin',
    // 'translate',
    // 'translateX',
    // 'translateY',
    // 'unicodeBidi',
    'verticalAlign',
    'visibility',
    'whiteSpace',
    'width',
    'wordSpacing',
    'zIndex',
    'animation',
    'borderImageSource',
    'borderImageClip',
    'borderImageRepeat',
    'borderImageSlice',
    'imageClip',
    'pointerEvent',
    'objectFit'
];

(<any>window).Inspector = Inspector;