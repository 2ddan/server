// ============================== 导入
import { Widget } from "../../../pi/widget/widget";
import { Json } from '../../../pi/lang/type';

/**
 * @description 导出组件Widget类
 * @example
 */
export class Code extends Widget {
    text: string = null;
    changed: boolean = false;
    cb: Function = null;
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.cb = props.cb;
        this.props = props.text;
        // if (this.changed)
        this.paint(true);
    }
    saveCode(e) {
         //9 keyTab
         if (e.keyCode === 9) {
            let t = e.target,
                start = t.selectionStart,
                end = t.selectionEnd;
            let sstart = t.value.slice(0, start),
                send = t.value.slice(end);

            t.value = sstart + "\t" + send;
            t.selectionStart = t.selectionEnd = start + 1;
            e.preventDefault();
        }
        //83 s
        if (e.ctrlKey && e.keyCode === 83 && this.props != e.target.value) {
            this.text = e.target.value;
            this.changed = true;

            this.cb(this.text);
            //阻止浏览器保存
            e.preventDefault();
        }
    }
    changeCode(e) {
        this.text = e.target.value;
    }
}
