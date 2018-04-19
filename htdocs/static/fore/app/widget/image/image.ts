// ============================== 导入
import { Widget } from "pi/widget/widget";
import { ResTab } from 'pi/util/res_mgr';
import { Pi } from "app/mod/pi";
import { depend } from "pi/lang/mod";
// ============================== 导出

/**
 * @description 导出组件Widget类
 * @example
 */
export class imgFind extends Widget {

	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props, oldProps?): void {
        if (!props.url && props.icon) {
            let dir = ["app/widget/image/","app_a/widget/images/", "app_b/style/images/", "app_b/widget/icons/", "app_c/widget/icons/"];
            props.url = depend.get(dir[dir.length - 1] + props.icon + ".png");
            while (!props.url && --dir.length) {
                props.url = depend.get(dir[dir.length - 1] + props.icon + ".png");
            }
            props.url = dir[dir.length - 1] + props.icon + ".png";
        }
        this.props = props;
        this.paint();
    }

}