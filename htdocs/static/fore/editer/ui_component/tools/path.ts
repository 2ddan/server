import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { setDblClick } from "../show_res";
import { getHeight } from '../../../pi/ui/root';

let reg = /((\.png)|(\.jpg))$/
export class Path extends Widget {
    ePath: string;
    cb: Function;
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.ePath = props.path;
        if (this.ePath) this.ePath = this.ePath.replace(/url\(/, "").replace(")", "");
        this.cb = props.cb;
        if (reg.test(this.ePath)) {
            this.props = { url: this.ePath, view: true }
        }
        else {
            this.props = {};
        }
    }
    view() {
        if (this.props.url) {
            this.props.view = !this.props.view;
            this.paint();
        }
    }
    change(e) {
        this.cb(e.target.value)
    }
    focus(e) {
        let target = e.target
        setDblClick((path) => {
            target.value = path;
            this.ePath = path;
            this.props = { url: this.ePath, view: true }
            this.paint();
            this.cb(`url(${path})`);
        })
    }
}






