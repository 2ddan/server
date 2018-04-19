import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { open, destory } from '../../../pi/ui/root';

let add, del
export class multiInput extends Widget {
    r_name: string
    r_width: number
    r_height: number
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        add = props.add;
        del = props.del;
        this.props = props.arr;
    }
    goback(e) {
        this.r_name = undefined;
        this.r_width = undefined;
        this.r_height = undefined;
        destory(e.widget);
    }
    valueChange(e, key) {
        this[key] = e.target.value;
    }
    add(e) {
        if (!this.r_name || !this.r_width || !this.r_height) {
            alert("make sure all value is not empty! ")
            return;
        }
        add(this.r_name, this.r_width, this.r_height);
        destory(e.widget);
    }
    del(index) {
        del(+index);
        this.paint()
    }
}