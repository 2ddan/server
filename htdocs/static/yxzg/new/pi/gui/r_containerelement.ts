
/**
 * 容器节点
 * * 对应 DIV
 */

import { gui } from './gui';
import { GUIImageResCfg, RElementTypeList } from './r_datastruct';
import { RElement, RElementOpt } from './r_element';
import { REventData } from './r_event_base';
import { ScrollPaths, Tools } from './tools';

/**
 * 容器节点
 */
export class RContainerElement extends RElement {

    /**
     * 子节点滚动属性
     */
    public get scrollX() {
        return (<RContainerElement>this.childNodes[0]).scrollLeft;
    }

    /**
     * 子节点滚动属性
     */
    public set scrollX(value: number) {
        (<RContainerElement>this.childNodes[0]).scrollLeft = value;
    }

    /**
     * 子节点滚动属性
     */
    public get scrollY() {
        return (<RContainerElement>this.childNodes[0]).scrollTop;
    }
    
    /**
     * 子节点滚动属性
     */
    public set scrollY(value: number) {
        (<RContainerElement>this.childNodes[0]).scrollTop = value;
    }
    
    /**
     * 自身滚动属性
     */
    public get scrollLeft() {
        if (this._scrollLeft === 0) {
            this._scrollLeft = gui._offset_left(this.document.uniqueID, this.uniqueID);
        }

        return this._scrollLeft;
    }

    /**
     * 自身滚动属性
     */
    public set scrollLeft(value: number) {
        if (this._scrollLeft !== value) {
            this._scrollLeft = value;
            this.doScroll(-this._scrollLeft, -this._scrollTop);
        }
    }

    /**
     * 自身滚动属性
     */
    public get scrollTop() {
        if (this._scrollTop === 0) {
            this._scrollTop = gui._offset_top(this.document.uniqueID, this.uniqueID);
        }

        return this._scrollTop;
    }
    
    /**
     * 自身滚动属性
     */
    public set scrollTop(value: number) {
        if (this._scrollTop !== value) {
            this._scrollTop = value;
            this.doScroll(-this._scrollLeft, -this._scrollTop);
        }
    }
    
    /**
     * 自身滚动属性
     */
    public get scrollWidth() {
        this._scrollWidth = this.contentWidth;

        return this._scrollWidth;
    }

    /**
     * 自身滚动属性
     */
    public get scrollHeight() {
        this._scrollHeight = this.contentHeight;

        return this._scrollHeight;
    }
    public childNodes: RElement[];
    /**
     * 节点总内容宽度
     */
    private _scrollWidth: number;
    /**
     * 节点总内容高度
     */
    private _scrollHeight: number;
    /**
     * 节点当前已滚动距离
     */
    private _scrollLeft: number;
    /**
     * 节点当前已滚动距离
     */
    private _scrollTop: number;
    constructor(opt: RElementOpt) {
        opt.uniqueID = gui._create_node(opt.document.uniqueID);

        super(opt);
        this._type = RElementTypeList.DIV;
        this.childNodes     = [];
        this._scrollLeft    = 0;
        this._scrollTop     = 0;

        this.initDefaultStyle('div');
    }

    /**
     * 节点销毁
     */
    public remove() {
        for (let len = this.childNodes.length - 1; len >= 0; len--) {
            const child = this.childNodes[len];
            child.remove();
        }
        
        this.document.removeScrollEle(this);

        super.remove();
    }

    /**
     * 移除子节点
     * @param child 目标子节点
     */
    public removeChild(child: RElement) {
        const index = this.childNodes.indexOf(child);

        this.childNodes.splice(index, 1);
    }

    /**
     * 添加子节点
     * @param node 目标节点
     */
    public appendChild(node: RElement): RElement {
        if (this.isDestroy) {
            try {
                throw new Error(`父节点已销毁！`);
            } catch (e) {
                console.error(e);
            }
            
            return;
        }
        if (this.findChild(node)) return;

        this.appendChildCall(node);
        this.childNodes.push(node);

        node.parentNode = this;
        node.updateLevel();

        // Tools.log(`appendChild level parent : ${this.level} child: ${node.level}`);
        // Tools.log(`appendChild uniqueID parent : ${this.uniqueID} child: ${node.uniqueID}`);

        return this;
    }

    /**
     * 插入子节点
     * @param node 目标节点
     * @param refNode 此节点前插入
     */
    public insertBefore(node: RElement, refNode: RElement): RElement {
        if (this.isDestroy) {
            try {
                throw new Error(`父节点已销毁！`);
            } catch (e) {
                console.error(e);
            }
            
            return;
        }
        if (this.findChild(node)) return;

        if (refNode === undefined) {

            this.appendChildCall(node);
            this.childNodes.push(node);

        } else {
            const index = this.childNodes.indexOf(refNode);
            
            this.insertBeforeCall(node, refNode, index);

            for (let i = this.childNodes.length; i > index; i--) {
                this.childNodes[i] = this.childNodes[i - 1];
            }
            this.childNodes[index] = node;
        }

        node.parentNode = this;
        node.updateLevel();
        
        Tools.log(`insertBefore parent: ${this.level} child: ${node.level}`);
        Tools.log(`insertBefore parent: ${this.uniqueID} child: ${node.uniqueID}`);

        return this;
    }

    public replaceChild(newNode: RElement, oldNode: RElement): RElement {
        // TODO
        return this;
    }

    /**
     * 更新节点层级
     * * 遍历更新子节点层级
     */
    public updateLevel() {

        if (this._level === this.parentNode._level + 1) {
            return;
        }

        super.updateLevel();
        
        for (const child of this.childNodes) {
            child.updateLevel();
        }
    }
    
    /**
     * 节点内部滚动处理
     * * 优先 Y 方向滚动
     * * Y 方向 没有剩余滚动量时，X 方向滚动
     * * x 方向 没有剩余滚动量时，向上冒泡
     */
    public wheel(e: REventData) {
        Tools.log('scroll', this._level);
        let isScroll: boolean = false;
        const attributes: any = this.attributes;

        this.document.layout();
        
        switch (attributes.scroll_path) {
            case (ScrollPaths.XY): {
                isScroll = this.scroll_Y(e);
                isScroll = this.scroll_X(e) || isScroll;
                break;
            }
            case (ScrollPaths.Y): {
                isScroll = this.scroll_Y(e);
                break;
            }
            case (ScrollPaths.X): {
                isScroll = this.scroll_X(e);
                break;
            }
            default:
        }

        if (isScroll === true) {
            this.childNodes[0].doScroll(-this.scrollX, -this.scrollY);
        }
        
        e.stopPropagation = isScroll;
        
        super.wheel(e);
    }

    /**
     * 加载 border-image-source 的接口
     */
    public loadBorderImage() {
        if (this.document.readStyle(this.style, 'borderImageSource') && this.loadImageCall) {
            this.loadImageCall && this.loadImageCall(this.document.readStyle(this.style, 'borderImageSource'), (cfg: GUIImageResCfg) => { this.loadedBorderImage(cfg); });
        }
    }

    /**
     * 加载 border-image-source 的成功的回调
     */
    public loadedBorderImage(cfg: GUIImageResCfg) {
        if (this._isDestroy) return;

        this._imageWidth        = cfg.isCombine ? cfg.combineWidth  : cfg.width;
        this._imageHeight       = cfg.isCombine ? cfg.combineHeight : cfg.height;
        this._imageLeft         = cfg.isCombine ? cfg.combineLeft   : 0;
        this._imageTop          = cfg.isCombine ? cfg.combineTop    : 0;
        this._srcImageWidth     = cfg.isCombine ? cfg.combineSrcWidth  : cfg.width;
        this._srcImageHeight    = cfg.isCombine ? cfg.combineSrcHeight : cfg.height;
        
        if (!this.document.readStyle(this.style, 'width')) {
            this.document.applyStyle(this.style, 'width', `${this._imageWidth}px`);
        }
        if (!this.document.readStyle(this.style, 'height')) {
            this.document.applyStyle(this.style, 'height',`${this._imageHeight}px`);
        }

        this.activeBorderImageClip();
        this.activeBorderImageSlice();

        gui._set_border_src_with_texture(this.document.uniqueID, this.uniqueID, cfg.textureID);
    }
    /**
     * 节点设置 scroll_path 后的处理
     */
    public activeScroll() {
        super.activeScroll();

        switch (this.attributes.scroll_path) {
            case (ScrollPaths.XY): {
                this.document.addScrollEle(this);
                this.document.applyStyle(this.style, 'overflow', 'hidden');
                break;
            }
            case (ScrollPaths.Y): {
                this.document.addScrollEle(this);
                this.document.applyStyle(this.style, 'overflow', 'hidden');
                break;
            }
            case (ScrollPaths.X): {
                this.document.addScrollEle(this);
                this.document.applyStyle(this.style, 'overflow', 'hidden');
                break;
            }
            default: {
                this.document.applyStyle(this.style, 'overflow', 'none');
                this.document.removeScrollEle(this);
            }
        }
    }
    /**
     * 检查滚动量是否超出可滚动量 - <内容产生变化，节点可能减少了>
     */
    public checkScroll() {
        if (!this._isDestroy) {
            switch (this.attributes.scroll_path) {
                case (ScrollPaths.XY): {
                    this.checkScrollX();
                    this.checkScrollY();
                    break;
                }
                case (ScrollPaths.Y): {
                    this.checkScrollY();
                    break;
                }
                case (ScrollPaths.X): {
                    this.checkScrollX();
                    break;
                }
                default: {
                    this.document.removeScrollEle(this);
                }
            }
        }
    }

    /**
     * 查找直接子节点是否已包含目标节点
     * @param node 目标子节点
     */
    private findChild(node: RElement) {
        let result = false;

        const index = this.childNodes.findIndex(n => {
            return n.uniqueID === node.uniqueID;
        });

        if (index >= 0) {
            Tools.error('node has parent!', node);
            if (this.document.appendDebug) {
                throw new Error('node has parent!');
            }
            result = true;
        }

        return result;
    }
    /**
     * 检查、控制 X 方向滚动量
     */
    private checkScrollX() {
        let overScrollX = (<RContainerElement>this.childNodes[0]).scrollWidth - (this.width);
        overScrollX     = overScrollX > 0 ? overScrollX : 0;
        this.scrollX    = Math.min(overScrollX, this.scrollX);
    }
    /**
     * 检查、控制 Y 方向滚动量
     */
    private checkScrollY() {
        let overScrollY = this.scrollHeight - (this.height);
        overScrollY     = overScrollY > 0 ? overScrollY : 0;
        this.scrollY    = Math.min(overScrollY, this.scrollY);
    }
    
    /**
     * 节点内部滚动处理
     * * 优先 Y 方向滚动
     * * Y 方向 没有剩余滚动量时，X 方向滚动
     * * x 方向 没有剩余滚动量时，向上冒泡
     */
    private scroll_X(e: REventData) {
        Tools.log('scroll_X', this._level);
        
        let overScrollX = (<RContainerElement>this.childNodes[0]).scrollWidth - (this.scrollX + this.width);
        overScrollX = overScrollX > 0 ? overScrollX : 0;
        let isScroll: boolean = false;
        let diff: number = 0;

        // 向 右 滚动
        if (e.deltaX > 0) {
            isScroll = overScrollX > 0;
            diff = Math.min(e.deltaX, overScrollX);
        } else {
            isScroll = this.scrollX > 0;
            diff = Math.max(e.deltaX, -this.scrollX);
        }

        this.scrollX = this.scrollX + diff;

        return isScroll;
    }
    
    /**
     * 节点内部滚动处理
     * * 优先 Y 方向滚动
     * * Y 方向 没有剩余滚动量时，X 方向滚动
     * * x 方向 没有剩余滚动量时，向上冒泡
     */
    private scroll_Y(e: REventData) {
        Tools.log('scroll_Y', this._level);
        
        let overScrollY = this.scrollHeight - (this.scrollY + this.height);
        overScrollY = overScrollY > 0 ? overScrollY : 0;
        let isScroll: boolean = false;
        let diff: number = 0;

        // 向 右 滚动
        if (e.deltaY > 0) {
            isScroll = overScrollY > 0;
            diff = Math.min(e.deltaY, overScrollY);
        } else {
            isScroll = this.scrollY > 0;
            diff = Math.max(e.deltaY, -this.scrollY);
        }

        this.scrollY = this.scrollY + diff;

        return isScroll;
    }
    /**
     * 添加子节点
     * @param node 目标节点
     */
    private appendChildCall(node: RElement) {
        Tools.log(`appendChildCall `);
        gui._append_child(this.document.uniqueID, (node.uniqueID), (this.uniqueID));
        this.document.layoutDirty = true;
    }
    /**
     * 插入子节点
     * @param node 目标节点
     * @param refNode 此节点前插入
     */
    private insertBeforeCall(node: RElement, refNode: RElement, refNodeIndex: number) {
        gui._insert_before(this.document.uniqueID, (node.uniqueID), refNode.uniqueID);
        this.document.layoutDirty = true;
    }
}