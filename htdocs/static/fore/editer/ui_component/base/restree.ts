/*
 * 树形菜单，要求props为{tag:"btn$", show:{select:true, open:true }, arr:[]}，嵌套使用，子菜单的props为父菜单的引用
 */

// ============================== 导入
import { Widget } from "../../../pi/widget/widget";
import { Json } from '../../../pi/lang/type';
import { notify } from "../../../pi/widget/event";
import { switchSelect, selectFile } from "../resource";

let arr = []

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class ResTree extends Widget {
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.props = props;
        arr.push(this);
    }
	/**
	 * @description 按钮事件,选中一个元素
	 * @example
	 */
    select(e) {
        if (e.which === 1) {
            switchSelect(this);
            selectFile(this.props);
        }
    }
}
