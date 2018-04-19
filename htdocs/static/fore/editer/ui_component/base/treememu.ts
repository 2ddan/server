/*
 * 树形菜单，要求props为{tag:"btn$", show:{select:true, open:true }, arr:[]}，嵌套使用，子菜单的props为父菜单的引用
 */

// ============================== 导入
import { Widget } from "../../../pi/widget/widget";
import { Json } from '../../../pi/lang/type';
import { notify } from "../../../pi/widget/event";
import * as Mgr from "../../mgr/widget_mgr";

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class TreeMemu extends Widget {
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		this.props = props;
		if (Number.isInteger(props)) {
			this.props = this.parentNode.widget.props.arr[props];
		} else {
			this.props = props;
		}

	}
	/**
	 * @description 按下事件
	 * @example
	 */
	down(e, tagName) {
		let native = e.native;

		if (native.which === 3) {
			notify(this.tree, "ev-tm-downr", { data: this.props, native: e.native, tagName: tagName, treeWidget: this });//右键事件
		}
		else if ((native.which === 1)) {
			notify(this.parentNode, "ev-tm-select", { data: this.props, native: e.native, w: this });
		}
		return;
	}
	open(e) {
		let p = e.widget.props;
		if (p.name && !p.arr) {
			console.log(p.name)
			Mgr.open(p.name)
		}
	}
}
// ============================== 本地


