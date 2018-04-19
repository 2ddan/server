import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { open, getWidth, getHeight } from '../../../pi/ui/root';

export class multiInput extends Widget {
    cb: Function = null;
    allSame: boolean = true;
    readOnly;
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.cb = props.cb;
        //边框颜色有四个 需要判断是否都一样
        if (props.value && props.value.indexOf(" ") > 0) {
            let arr = props.value.split(" ");
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] != arr[i + 1]) {
                    this.allSame = false;
                    break;
                }
            }
            if (this.allSame) props.value = arr[0];
        }

        this.props = {
            value: props.value || '',
            allSame: this.allSame,
            readOnly: props.readOnly
        };
    }
    pickColor(e) {
        let width = getWidth(),
            height = getHeight();
        let hor = "left: " + e.x + "px;";
        if (e.x > width / 2) {
            hor = "right: " + (width - e.x) + "px;";
        }
        let ver = "top: " + e.y + "px;";
        if (e.y > height / 2) {
            ver = "bottom: " + (height - e.y) + "px;";
        }
        open("editer-ui_component-tools-color_picker", {
            value: this.props.value,
            cb: this.cb,
            style: hor + ver
        });
    }
}