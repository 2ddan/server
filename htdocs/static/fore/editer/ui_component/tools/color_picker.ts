import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { open, destory } from '../../../pi/ui/root';
import { arrDelete } from '../../../pi/util/util';
import { userCfg, saveUserCfg } from '../../user_cfg';

let H, S, V, A;
let type: number = userCfg.colorPicker.type,//颜色输出格式 0|1  hex|rgba
    history: Array<Json> = userCfg.colorPicker.history,//保存的颜色
    pickBack;//选择颜色回调
let sign: number = 1;//刷新input
let style = "";//调色板初始打开位置



let pickType: string = null,//按下类型
    point: Array<number> = null, //按下位置
    offset: Array<number> = null;
// ============================== 导出

/**
 * @description 导出组件Widget类
 * @example
 */
export class colorPick extends Widget {
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        pickBack = props.cb;
        style = props.style;
        let hsv;
        if (props.value.indexOf("#") !== -1) {
            hsv = RGBAToHSVA(HEXToRGBA(props.value))
        }
        if (props.value.indexOf("rgb") !== -1) {
            let rgba = props.value.match(/[\d\.]+/g);
            hsv = RGBAToHSVA({ r: +rgba[0] || 255, g: +rgba[1] || 0, b: +rgba[2] || 0, a: +rgba[3] || 1 })
        }
        if (hsv) {
            H = hsv.h || 360;
            S = hsv.s || 100;
            V = hsv.v || 100;
            A = hsv.a || 1;
        }
        else {
            H = 360; 
            S = 100; 
            V = 100; 
            A = 1;
        }
        this.props = getData();
    }
    //取消
    goback(e) {
        destory(e.widget);
    }
    //按下
    colorDown(e, arg) {
        if (arg === "alpha") {
            type = 1;
        }
        pickType = arg;
        if (e.target.dataset.flag) {
            offset = [e.target.offsetLeft + 1, e.target.offsetTop + 1];
        }
        else
            offset = [0, 0];
        point = [e.x - offset[0] - e.offsetX, e.y - offset[1] - e.offsetY];
    }
    //移动
    colorMove(e) {
        if (pickType) {
            setHSVA(e.x, e.y);
            this.props = getData();
            this.paint();
        }
    }
    //松开
    colorUp(e) {
        if (pickType) {
            setHSVA(e.x, e.y);
            pickType = null;
            point = null;
            offset = null;
            this.props = getData();
            this.paint();
        }
    }
    //hex
    changeHex(e) {
        let value = e.target.value;
        let regHex = /^\#?[0-9A-F]{3}$|^\#?[0-9A-F]{6}$/i;
        if (regHex.test(value)) {
            let hsva = RGBAToHSVA(HEXToRGBA(value));
            H = hsva.h;
            S = hsva.s;
            V = hsva.v;
            A = hsva.a;
            this.props = getData();
            this.paint();
        }
        else
            alert("输入有误！")
    }
    //rbg
    changeRgba(e) {
        let c = e.target.value;
        let key = e.target.dataset.rgba;

        if (c >= 0 && ((key == "a" && c <= 1) || c <= 255)) {
            let rgba = HSVAToRGBA({ h: H, s: S, v: V, a: A });
            rgba[key] = parseFloat(c);

            let hsva = RGBAToHSVA(rgba);
            H = hsva.h;
            S = hsva.s;
            V = hsva.v;
            A = hsva.a;

            this.props = getData();
            this.paint();
        }
        else
            alert("输入有误！")
    }
    //改颜色显示类型
    changeType() {
        type = 1 - type;
        userCfg.colorPicker.type = type;
        saveUserCfg()
        if (type === 0)
            A = 1;
        this.props = getData();
        this.paint();
    }
    //选好颜色
    pickOk(e) {
        let color: string = "";
        let rgba = HSVAToRGBA({ h: H, s: S, v: V, a: A })
        if (type == 0) {
            color = RGBAToHEX(rgba);
        }
        else {
            color = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
        }
        if (pickBack) pickBack(color);
        destory(e.widget)
    }
    //选择保存的颜色
    chooseHis(arg) {
        let hsva = history[arg].split(",");
        H = parseInt(hsva[0]);
        S = parseInt(hsva[1]);
        V = parseInt(hsva[2]);
        A = parseFloat(parseFloat(hsva[3]).toFixed(1));

        this.props = getData();
        this.paint();
    }
    //保存颜色
    addHis() {
        let colorStr = H + "," + S + "," + V + "," + A;
        for (let i = 0; i < history.length; i++) {
            if (history[i] === colorStr) {
                console.log("already exists! value: " + colorStr);
                alert("already exists！");
                return;
            }
        }
        history.push(colorStr);
        userCfg.colorPicker.history = history;
        saveUserCfg()
        this.props = getData();
        this.paint();
    }
    //删除颜色
    openMenu(arg) {
        history = arrDelete(history, arg);
        userCfg.colorPicker.history = history;
        saveUserCfg();
        this.props = getData();
        this.paint();
    }
}

//======================================本地
const getData = () => {
    let temp: any = {};
    temp.type = (A == 0 ? 1 : type);
    temp.hsva = { h: H, s: S, v: V, a: A };
    temp.rgba = HSVAToRGBA(temp.hsva);
    temp.hex = RGBAToHEX(temp.rgba);
    temp.BGColor = HSVAToRGBA({ h: H, s: 100, v: 100, a: 1 });
    temp.history = getHisColor();
    temp.sign = sign++;
    temp.style = style;
    return temp;
}

const getHisColor = () => {
    let hisColor = []
    for (let i = 0; i < history.length; i++) {
        let hsva = history[i].split(",");
        hisColor.push(HSVAToRGBA({ h: hsva[0], s: hsva[1], v: hsva[2], a: hsva[3] }));
    }
    return hisColor
}

const setHSVA = (x, y) => {
    if (pickType === "color") {
        S = Math.round((x - point[0]) / 2);
        S = S < 0 ? 0 : S > 100 ? 100 : S;
        V = Math.round(100 - (y - point[1]) / 2);
        V = V < 0 ? 0 : V > 100 ? 100 : V;
    }
    else if (pickType === "hue") {
        H = Math.round((x - point[0]) / 130 * 360);
        H = H < 0 ? 0 : H > 359 ? 359 : H;
    }
    else if (pickType === "alpha") {
        A = Math.round((x - point[0]) / 1.3) / 100;
        A = A < 0 ? 0 : A > 1 ? 1 : A;
    }
}

//=============================== 转换

const HSVAToRGBA = (hsva) => {
    let s = hsva.s / 100;
    let v = hsva.v / 100;
    let h = hsva.h / 60;
    let c = s * v;
    let x = c * (1 - Math.abs(h % 2 - 1));
    let m = v - c;
    let precision = 255;

    c = (c + m) * precision | 0;
    x = (x + m) * precision | 0;
    m = m * precision | 0;

    if (h >= 0 && h < 1) { return { r: c, g: x, b: m, a: hsva.a } }
    if (h >= 1 && h < 2) { return { r: x, g: c, b: m, a: hsva.a } }
    if (h >= 2 && h < 3) { return { r: m, g: c, b: x, a: hsva.a } }
    if (h >= 3 && h < 4) { return { r: m, g: x, b: c, a: hsva.a } }
    if (h >= 4 && h < 5) { return { r: x, g: m, b: c, a: hsva.a } }
    if (h >= 5 && h <= 6) { return { r: c, g: m, b: x, a: hsva.a } }
}
const RGBAToHSVA = (rgba) => {
    let red = rgba.r / 255;
    let green = rgba.g / 255;
    let blue = rgba.b / 255;

    let cmax = Math.max(red, green, blue);
    let cmin = Math.min(red, green, blue);
    let delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;

    if (delta) {
        if (cmax === red) { hue = ((green - blue) / delta); }
        if (cmax === green) { hue = 2 + (blue - red) / delta; }
        if (cmax === blue) { hue = 4 + (red - green) / delta; }
        if (cmax) saturation = delta / cmax;
    }

    H = 60 * hue | 0;
    if (hue < 0) H += 360;
    S = (saturation * 100) | 0;
    V = (cmax * 100) | 0;
    A = rgba.a;

    return { h: H, s: S, v: V, a: A }
}

const RGBAToHEX = (rgba: Json) => {
    let r = rgba.r.toString(16);
    let g = rgba.g.toString(16);
    let b = rgba.b.toString(16);
    if (rgba.r < 16) r = '0' + r;
    if (rgba.g < 16) g = '0' + g;
    if (rgba.b < 16) b = '0' + b;
    let value = '#' + r + g + b;

    return value.toUpperCase();
}

const HEXToRGBA = (hex: string) => {
    if (hex[0] === "#")
        hex = hex.slice(1, hex.length);
    if (hex.length === 3)
        hex = hex.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i, '$1$1$2$2$3$3');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    let a = 1;

    return { r: r, g: g, b: b, a: a };
}
