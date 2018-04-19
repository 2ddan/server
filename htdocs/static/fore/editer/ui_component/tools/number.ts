import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { open, getWidth, getHeight } from '../../../pi/ui/root';



export class multiInput extends Widget {
    cb: Function = null;
    content: Array<any> = null;//当前显示的内容 [20,"px","readonly"]
    util: Array<string> = null;//单位
    utilIndex: number = 0;
    sign: number = 1; //全刷新input标签
    readOnly;
    isNumber: boolean = false;
    limit: Array<number>; //值的范围 [0,100] [null,null] 无限
    reg // 替换规则 $
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        props.util = props.util || [];
        if (props.value || props.value === 0) {
            //获取显示内容的值和单位
            if (typeof (props.value) === "number") {
                this.isNumber = true;
                this.content = [props.value];
            }
            //分割对称属性 eg. margin: 2px 4px;
            else if (props.value.indexOf(" ") > 0) {
                let arr = props.value.split(" ");
                let sameValue = true;
                for (let i = 0; i < arr.length - 2; i++) {
                    if (arr[i] != arr[i + 1]) {
                        sameValue = false;
                        break;
                    }
                }
                //相同就可以一起调，否则不能调
                if (sameValue)
                    this.content = [parseFloat(arr[0]), arr[0].replace(parseFloat(arr[0]), "")]
                else
                    this.content = [props.value, , "readonly"];
            }
            else {
                let num = parseFloat(props.value);
                this.content = [num, props.value.replace(num, "")];
            }
            //单位index
            for (let i = 0; i < props.util.length; i++) {
                if (this.content[1] == props.util[i])
                    this.utilIndex = i;
            }
        }
        else {
            this.content = ['', props.util[0]];
        }
        this.cb = props.cb || null;
        this.util = props.util;
        this.readOnly = props.readOnly;
        this.props = { content: this.content, sign: this.sign++, readOnly: this.readOnly };
        this.limit = props.limit || [null, null];
        this.reg = props.reg || null;
    }
    switch() {
        if (this.readOnly) return;
        if (!this.util[++this.utilIndex]) {
            this.utilIndex = 0;
            this.content[1] = this.util[0]
        }
        else this.content[1] = this.util[this.utilIndex];

        this.props = { content: this.content, sign: this.sign++ };
        this.paint();
        if (this.cb && this.content[0])
            this.cb('' + this.content[0] + this.content[1]);
    }
    changeNum(e) {
        if (!e.target.value) return;
        let v = parseFloat(e.target.value);
        //输入是否是数字
        if (v !== v) {
            console.error("unsupported value: " + e.target.value);
            alert("只能是数字！")
            this.content[0] = "";
            this.props = { content: this.content, sign: this.sign++ };
            this.paint();
            return;
        }
        //超出限制
        if (this.limit[0] && v < this.limit[0]) {
            alert(`min ${this.limit[0]}`);
            this.props = { content: this.content, sign: this.sign++ };
            this.paint();
            return;
        }
        if (this.limit[1] && v > this.limit[1]) {
            alert(`max ${this.limit[1]}`);
            this.props = { content: this.content, sign: this.sign++ };
            this.paint();
            return;
        }

        this.content[0] = v;
        if (v != e.target.value) {
            this.props = { content: this.content, sign: this.sign++ };
            this.paint();
        }

        if (this.cb) {
            let cbValue = this.content[1] ? '' + this.content[0] + this.content[1] : '' + this.content[0] //有无单位
            if (this.reg)
                cbValue = this.reg.replace("$", cbValue)
            this.cb(cbValue);
        }
    }
    keydown(e) {
        if (!e.target.value) return;
        let num = (n) => {
            e.preventDefault();
            let v = parseFloat(e.target.value) + n;
            if (v !== v) {
                console.error("unsupported value: " + e.target.value);
                alert("只能是数字！")
                this.content[0] = "";
                this.props = { content: this.content, sign: this.sign++ };
                this.paint();
                return;
            }
            //超出限制
            if (this.limit[0] && v < this.limit[0]) {
                alert(`min ${this.limit[0]}`);
                this.props = { content: this.content, sign: this.sign++ };
                this.paint();
                return;
            }
            if (this.limit[1] && v > this.limit[1]) {
                alert(`max ${this.limit[1]}`);
                this.props = { content: this.content, sign: this.sign++ };
                this.paint();
                return;
            }

            this.content[0] = v;
            if (this.cb) {
                let cbValue = this.content[1] ? '' + this.content[0] + this.content[1] : '' + this.content[0] //有无单位
                if (this.reg)
                    cbValue = this.reg.replace("$", cbValue)
                this.cb(cbValue);
            }
        }
        if (e.keyCode === 38) {
            num(1)
        }
        else if (e.keyCode === 40) {
            num(-1)
        }
    }
}


