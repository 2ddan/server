/**
 * 
 */
import { GUICreator } from '../render3d/babylon/gui_creator';
import { logLevel, warn } from '../util/log';
import { Forelet } from './forelet_gui';
import { Sheet } from './style';
import { Widget } from './widget_gui';

export interface WidgetSheetCfg {
    value: Sheet;
}

export interface WidgetConfigCfg {
    value: any;
}

export interface WidgetCfg {
    name: string;
    sheet: WidgetSheetCfg;
    config: WidgetConfigCfg;
    forelet: Forelet;
    widget(): Widget;
    guiCfg(it: any, it1: any): any;
}
/**
 * 界面 打开关闭 动画时间
 */
export const WIDGET_ONOFF_TIME = 500;
/**
 * 组件注册表
 */
export let WidgetMap: Map<string, WidgetCfg> = new Map();

// tslint:disable-next-line:no-unnecessary-class
export class WidgetManager {

    public static register(
        name: string, widgetConstructor: () => Widget, _guiCfg: (it: any, it1: any) => any, sheet?: any,
        config?: { value: any }, forelet?: Forelet
    ) {

        const guiCfg = (it: any, it1: any) => {
            const cfg = _guiCfg(it, it1);
            GUICreator.computeCfgStyleWhileCreateCfg(cfg, sheet);

            return cfg;
        };

        if (WidgetMap.get(name) !== undefined) {
            warn(logLevel, 'widget already register, name:', name);
        } else {
            widgetConstructor  = widgetConstructor || (() => new Widget());
            forelet = forelet || (new Forelet());
            WidgetMap.set(name, { name, widget: widgetConstructor, guiCfg, sheet, config, forelet });
        }
    }    

    public static registerWidgetForelet(
        name: string, forelet: Forelet
    ) {
        if (WidgetMap.get(name) !== undefined) {
            WidgetMap.get(name).forelet = forelet;
        }
    }
    
    public static registerWidgetGUICfg(
        name: string, _guiCfg: (it: any, it1: any) => any
    ) {
        if (WidgetMap.get(name) !== undefined) {
            const sheet = WidgetMap.get(name).sheet;
            const guiCfg = (it: any, it1: any) => {
                const cfg = _guiCfg(it, it1);
                GUICreator.computeCfgStyleWhileCreateCfg(cfg, sheet);

                return cfg;
            };

            WidgetMap.get(name).guiCfg = guiCfg;
        }
    }

    public static read(name: string) {
        return WidgetMap.get(name);
    }

    public static unregister(name: string) {
        return WidgetMap.delete(name);
    }

    public static factory(name: string) {
        const creator = WidgetManager.read(name);

        // tslint:disable-next-line:one-variable-per-declaration
        let widgetCreateCall: () => Widget, 
            widget: Widget;

        if (creator !== undefined) {

            widgetCreateCall = creator.widget;
            widget = widgetCreateCall();

            widget.name     = name;
            widget.sheet    = creator.sheet;
            widget.config   = creator.config;
            widget.forelet  = creator.forelet;
            widget._guiCfgCreator   = creator.guiCfg;

            widget.create();
        }

        return widget;
    }
}