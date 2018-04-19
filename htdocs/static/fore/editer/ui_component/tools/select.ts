import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { open, getWidth, getHeight } from '../../../pi/ui/root';



export class multiInput extends Widget {
    notSelect: string;
    cb: Function = null;
    focus: boolean = false;
    select: number = null;
    arr: Array<any> = [];
    showArr: Array<any> = [];
    sign: number = 1;
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        // if (props.select!=-1 && props.select.indexOf(" ") > 0) {
        //     let arr = props.select.split(" ");
        //     let same = true;
        //     for (let i = 0; i < arr.length - 1; i++) {
        //         if (arr[i] != arr[i + 1]) {
        //             same = false;
        //             break;
        //         }
        //     }
        //     if (same) props.select = arr[0];
        // }

        this.notSelect = props.notSelect;
        this.cb = props.cb || null;
        this.arr = props.arr || [];
        this.showArr = props.showArr || props.arr || [];
        this.select = props.select;

        this.props = { focus: this.focus, select: this.select, showArr: this.showArr, sign: this.sign++, readOnly: props.readOnly };
    }
    switch() {
        this.focus = !this.focus;
        updata(this);
    }
    editFocus(e) {
        this.focus = true;
        updata(this);
    }
    editBlur(e) {
        if (this.focus) {
            this.focus = false;
            updata(this);
        }
    }
    choose(i) {
        if (this.arr[i] != this.notSelect) {
            this.select = +i;
        }
        this.focus = false;

        updata(this);
        if (this.cb)
            this.cb(this.arr[i], +i);
    }
}

const updata = (w) => {
    w.props = { focus: w.focus, select: w.select, showArr: w.showArr, sign: w.sign++ };
    w.paint();
}

