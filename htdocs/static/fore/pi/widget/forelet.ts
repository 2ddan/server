// 模块描述
/*
负责进行业务逻辑处理，是数据库和显示组件间的桥梁， 输入->逻辑计算->输出
输入：
1、用户事件
2、数据库中数据被修改的事件
3、网络事件

输出：
1、操作数据库（同步）
2、网络通信（异步）
3、生成显示数据，调用paint，显示到界面上（可选同步或异步）

为了平滑显示，复杂的处理逻辑应该使用任务管理器进行调度处理
*/

// ============================== 导入
import { Widget } from "./widget";
import { Json } from '../lang/type';
import { set as task } from '../util/task_mgr';
import { HandlerTable } from "../util/event";

// ============================== 导出
/**
 * @description 前端部件
 * @example
 */
export class Forelet extends HandlerTable {
	// 必须要赋初值，不然new出来的实例里面是没有这些属性的
	widgets: Array<Widget> = [];// 关联的组件
	listener: Function = null; // 监听器
	private _data: Json = null; // 延迟渲染的数据
	private _dataState: DataState = DataState.init; // 延迟渲染的状态
	private _args: Array<Forelet> = [this];

	/**
	 * @description 添加widget，自动在widget创建时调用
	 * @example
	 */
	addWidget(w: Widget): void {
		this.listener && this.listener("add", w);
		w.setState(this._data);
		this.widgets.push(w);
	}
	/**
	 * @description widget事件
	 * @example
	 */
	eventWidget(w: Widget, type: string): void {
		this.listener && this.listener(type, w);
	}
	/**
	 * @description widget被移除，自动在widget销毁时调用
	 * @example
	 */
	removeWidget(w: Widget): void {
		let arr = this.widgets;
		let i = arr.indexOf(w);
		if (i < 0)
			return;
		if (i < arr.length - 1)
			arr[i] = arr[arr.length - 1];
		arr.length--;
		this.listener && this.listener("remove", w);
	}
	/**
	 * @description 获取指定名称的widget
	 * @example
	 */
	getWidget(name: string): Widget {
		let arr = this.widgets;
		for (let w of arr) {
			if (w.name === name)
				return w;
		}
	}
	/**
	 * @description 绘制方法，
	 * @parms reset表示新旧数据差异很大，不做差异计算，直接生成dom
	 * @parms immediately，表示同步计算dom，不延迟到系统空闲时
	 * @example
	 */
	paint(data: Json, reset?: boolean, immediately?: boolean): void {
		let s = this._dataState;
		this._dataState = (reset || s === DataState.reset_true) ? DataState.reset_true : DataState.reset_false;
		this._data = data;
		if (immediately)
			return paint1(this);
		if (s === DataState.init) {
			if (this.widgets.length > 0)
				task(paint1, this._args, 900000, 1);
			else
				this._dataState = DataState.init;
		}
	}

}

// ============================== 本地
/**
 * @description 处理器返回值
 */
enum DataState {
	init = 0,
	reset_false,
	reset_true,
}

/**
 * @description 绘制方法，
 * @example
 */
const paint1 = (f: Forelet): void => {
	let data = (f as any)._data;
	let r = (f as any)._dataState === DataState.reset_true;
	(f as any)._dataState = DataState.init;
	for (let w of f.widgets) {
		w.setState(data);
		w.paint(r);
	}
}

// ============================== 立即执行

