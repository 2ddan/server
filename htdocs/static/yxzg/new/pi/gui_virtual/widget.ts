// 模块描述
/*
负责显示逻辑，是数据和原始dom间的桥梁
组件支持嵌套，并且tpl中的自定义元素支持相对路径。 
组件名的规则：可以使用英文小写字母加'_'和''。 '-'表示路径分隔，'$'只能在最后，1个'$'表示本目录开始查找，N个'$'表示上溯N-1个父目录开始查找。如果没有'$'表示从根目录下开始查找
举例：
<role_show$ style=""></role_show$>表示本目录下的role_show组件，
<role_show$$ style=""> </role_show$$>表示父目录下的role_show组件，
<role_show-zb_show$$ style=""></role_show-zb_show$$>表示父目录下role_show目录下的zb_show组件
<app-base-btn style=""></app-base-btn>表示根目录开始，app/base目录下的btn组件
*/

// ============================== 导入
import { AnimeTools, IAnimation, Animation } from '../gui/animation_tools';
import { EnabledTypes } from '../gui/enum';
import { RContainerElement } from '../gui/r_containerelement';
import { AnimationCmd } from '../gui/tools';
import { RootManager } from '../gui_root/root_manager';
import { Json } from '../lang/type';
import { HandlerTable } from '../util/event';
import { logLevel, warn } from '../util/log';
import { ResTab } from '../util/res_mgr';
import { setValue } from '../util/util';
import { Forelet } from './forelet';
import { paintWidget } from './painter';
import { Sheet } from './style';
import { VirtualWidgetNode, VWNode } from './virtual_node';

// ============================== 导出
export let level = logLevel;

/**
 * @description tpl定义
 */
export interface Tpl {
    value: Function;
    path: string; // 路径
    wpath: string; // 组件路径
}

// tslint:disable-next-line:interface-name
export interface IOpenCloseAnimCfg {
    cmd: AnimationCmd;
    frames: IAnimation;
    startCall?: Function;
    iterCall?: Function;
    endCall?: Function;
}

/**
 * @description 组件
 * @example
 * 组件，包含样式和模板的js类,
 * 注意区分 widget实例和widget节点
 * widget节点的link属性指向了widget实例
 */
export class Widget extends HandlerTable {
    public static DefaultResTimeout: number = 3000; // 资源缓冲时间，默认3秒
    // 必须要赋初值，不然new出来的实例里面是没有这些属性的
    public name: string = null; // 组件的名称
    public tpl: Tpl = null; // 组件的模板
    public sheet: { value: Sheet } = null; // 组件的样式
    public config: { value: Json } = null; // 所对应的配置
    public forelet: Forelet = null; // 所对应的forelet
    public props: Json = {}; // 由父组件设置的组件属性
    public state: Json = {}; // 由forelet设置的组件状态
    public tree: VWNode = null; // 组件所对应的节点树
    public parentNode: VirtualWidgetNode = null; // 父节点，parentNode.link的对象就是widget
    public children: Widget[] = []; // 所有的子组件
    public inDomTree: boolean = false; // 是否在dom树中
    public resTab: ResTab = null; // 资源表
    public resTimeout: number = Widget.DefaultResTimeout; // 资源缓冲时间，默认3秒
    public styleCache: Sheet = new Map(); // 样式查询缓存
    public r_styleCache: Map<string, Json> = new Map(); // 样式查询缓存
    public r_sheet: Json = null; // 组件的样式
    private _enabled: boolean = true;
    private _enableListener: Function[] = [];

    /**
     * 创建后调用，一般在渲染循环外调用
     */
    public create(): void {
        this.forelet && this.forelet.addWidget(this);
    }
    /**
     * 第一次计算后调用，此时创建了真实的dom，但并没有加入到dom树上，一般在渲染循环外调用
     */
    public firstPaint(): void {
        this.forelet && this.forelet.eventWidget(this, 'firstPaint');
        let cfg: IOpenCloseAnimCfg; 
        if (this.openAnim) {
            cfg = this.openAnim();
            if (cfg && cfg.cmd && cfg.frames) {
                const root = (<RContainerElement>this.tree.l);
                // 创建新 运行时动画
                const runtimeAnimation = AnimeTools.initRuntimeAnimation(cfg.cmd, <Animation>cfg.frames);
    
                // 动画状态监听
                cfg.startCall && root.style.addAnimListener(cfg.cmd.name, 'start', cfg.startCall);
                cfg.iterCall && root.style.addAnimListener(cfg.cmd.name, 'loop', cfg.iterCall);
                cfg.endCall && root.style.addAnimListener(cfg.cmd.name, 'end', cfg.endCall);
    
                // 启动动画
                root.style.addAnimation(runtimeAnimation);
    
                this.doOpenAnimHook(cfg.cmd.name);
            }
        }
        
        if (this._enabled) {
            this.enableListenActive();
        }
    }
    /**
     * 销毁时调用，一般在渲染循环外调用
     */
    public destroy(): boolean {
        if (!this.tpl) {
            return false;
        }
        this.tpl = undefined;
        if (this.resTab) {
            this.resTab.timeout = this.resTimeout;
            this.resTab.release();
        }
        this.forelet && this.forelet.removeWidget(this);

        this.parentNode = undefined;

        return true;
    }
    /**
     * 添加到dom树后调用，在渲染循环内调用
     */
    // tslint:disable:no-empty
    public attach(): void {
    }
    /**
     * 更新到dom树前调用，一般在渲染循环外调用
     */
    public beforeUpdate(): void {
        this.forelet && this.forelet.eventWidget(this, 'update');
    }
    /**
     * 更新到dom树后调用，在渲染循环内调用
     */
    public afterUpdate(): void {
    }
    /**
     * 从dom树上移除前调用，一般在渲染循环内调用
     */
    public detach(): void {
        this.children = undefined;
    }
    /**
     * 获得样式数据
     */
    public getSheet(): Sheet {
        return this.sheet && this.sheet.value;
    }
    /**
     * 获得配置数据
     */
    public getConfig(): Json {
        return this.config && this.config.value;
    }
    /**
     * 获得渲染数据
     */
    public getProps(): Json {
        return this.props;
    }
    /**
     * 设置属性，默认外部传入的props是完整的props，重载可改变行为
     * @param props 新数据
     * @param oldProps 老数据
     */
    public setProps(props: Json, oldProps?: Json): void {
        this.props = props;
    }
    /**
     * 更新属性，默认外部传入的props是更新命令，必须为Json对象，键的结构类似"a.b.c"，重载可改变行为
     */
    public updateProps(props: Json, oldProps?: Json): void {
        if (!props) {
            return;
        }
        for (const k in props) {
            setValue(this.props, k, props[k]);
        }
    }
    /**
     * 获得渲染数据
     */
    public getState(): Json {
        return this.state;
    }
    /**
     * 设置状态
     */
    public setState(state: Json): void {
        this.state = state;
    }
    /**
     * 绘制方法，
     * @param reset 表示新旧数据差异很大，不做差异计算，直接生成dom
     */
    public paint(reset?: boolean): void {
        paintWidget(this, reset);
    }
    /**
     * 界面执行打开动画时的通知
     * * 启动动画后调用
     */
    public doOpenAnimHook = (aname: string) => {
        this.disenable();
        const rnode = (<RContainerElement>this.tree.l);
        !rnode.isDestroy && (rnode.style.addAnimListenerHook(aname, 'end', this.enable));
    }
    /**
     * 界面执行关闭动画时的通知
     * * 启动动画后调用
     */
    public doCloseAnimHook = (aname: string) => {
        this.disenable();
        // const rnode = (<RContainerElement>this.tree.l);
        // !rnode.isDestroy && (rnode.style.addAnimListenerHook(aname, 'end', this.enable));
    }
    public widgetEnabled() {
        return this._enabled;
    }
    /**
     * 具体widget中重载，不继承
     * * 若在实现中自己处理动画设置则返回 undefined
     * * 不做任何处理，仅返回 配置，将由底层自动设置
     */
    public openAnim = (): IOpenCloseAnimCfg => {
        return undefined;
    }
    /**
     * 具体widget中重载，不继承
     * * 若在实现中自己处理动画设置则返回 undefined
     * * 不做任何处理，仅返回 配置，将由底层自动设置
     */
    public closeAnim = (): IOpenCloseAnimCfg => {
        return undefined;
    }
    /**
     * 添加界面激活时的监听
     */
    public addEnableListener = (f: Function) => {
        this._enableListener.push(f);
    }
    /**
     * 移除界面激活时的监听
     */
    public delEnableListener = (f: Function) => {
        const index = this._enableListener.indexOf(f);
        if (index >= 0) {
            this._enableListener.splice(index, 1);
        }
    }
    /**
     * 执行界面激活时的监听
     */
    private enableListenActive = () => {
        this._enableListener.forEach(f => {
            f && f();
        });
    }
    private enable = () => {
        const rnode = (<RContainerElement>this.tree.l);
        if (!rnode.isDestroy) {
            this._enabled = true;
            RootManager.updateGroupVisible();
            this.enableListenActive();
        }
    }
    private disenable = () => {
        const rnode = (<RContainerElement>this.tree.l);
        if (!rnode.isDestroy) {
            this._enabled = false;
            RootManager.updateGroupVisible();
        }
    }
}

/**
 * @description 注册组件
 * @example
 */
export const register = (name: string, widget: Function, tpl: Tpl, sheet?: { value: Sheet },
    config?: { value: Json }, forelet?: Function) => { // {name, construct, tpl, sheet, config, forelet} | undefined
    const old = widgetMap.get(name);
    if (old) {
        warn(level, 'widget already register, name:', name);
    }
    widget = widget || getWidget;
    widgetMap.set(name, { name, widget, tpl, sheet, config, forelet });

    return old;
};

/**
 * @description 查询是否存在目标 name 组件配置
 */
export const lookup = (name: string): Json => { // {name, widget, tpl, sheet, config, forelet} | undefined
    return widgetMap.get(name);
};
/**
 * @description 列出所有的组件
 * @example
 */
export const list = (): any[] => {
    return [...widgetMap.values()];
};

/**
 * @description 取消注册组件
 * @example
 */
export const unregister = (name: string): Json => {
    return widgetMap.delete(name);
};

/**
 * @description 创建组件
 * @example
 */
export const factory = (name: string): Widget => {
    const creator = widgetMap.get(name);
    if (!creator) {
        return;
    }
    const c = creator.widget();
    const w = c;
    w.name = name;
    if (creator.sheet) {
        w.r_sheet = creator.sheet;
    }
    if (creator.tpl) {
        w.tpl = creator.tpl;
    }
    if (creator.config) {
        w.config = creator.config;
    }
    if (creator.forelet) {
        w.forelet = creator.forelet();
    }
    w.create();

    return w;
};
/**
 * @description 计算相对组件路径
 * @example
 */
export const relative = (name: string, dir: string): string => {
    let j;
    let i = name.length - 1;
    if (name.charCodeAt(i) !== 36) {
        return name;
    }
    j = dir.length - 1;
    if (dir.charCodeAt(j) !== 47) {
        j = dir.lastIndexOf('-');
    }
    while (i >= 0) {
        if (name.charCodeAt(i - 1) !== 36) {
            break;
        }
        i--;
        j = dir.lastIndexOf('-', j - 1);
    }
    if (i < 0) {
        return '';
    }
    name = name.slice(0, i);
    if (j < 0) {
        return name;
    }
    if (j < dir.length - 1) {
        dir = dir.slice(0, j + 1);
    }

    return dir + name;
};
/**
 * @description 获取tpl、css和cfg缓冲
 * @example
 */
export const getCache = (file: string): Json => {
    return cacheMap.get(file);
};
/**
 * @description 设置tpl、css和cfg缓冲
 * @example
 */
export const setCache = (file: string, data: Json): void => {
    cacheMap.set(file, data);
};

/**
 * @description 清除tpl、css和cfg缓冲
 * @example
 */
export const deleteCache = (file: string): void => {
    cacheMap.delete(file);
};

// ============================== 本地
// 组件模板表
const widgetMap = new Map();

// tpl、css和cfg缓冲
const cacheMap = new Map();

// 获得默认组件
const getWidget = () => Widget;

// ============================== 立即执行
(<any>window).widgetMap = widgetMap;
(<any>window).cacheMap = cacheMap;