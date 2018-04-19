// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import * as Fun from '../../pi/math/tween';
import { Json } from '../../pi/lang/type';
import { keepFile } from "../environment/core";

// ============================== 导出
let animSheet: CSSStyleSheet,//动画的sheet
    css: string,
    keyFrame,
    keyFrameW

/**
 * @description 导出组件Widget类
 * @example
 */
export class Anim extends Widget {
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.props = {};
        this.props.params = anim;
        this.props.updataCss = this.updataCss;
        animSheet = getAnimSheet()
    }
    saveAnim() {
        let cssStr = css + "\n" + keyFrame + "\n" + keyFrameW;
        keepFile(cssStr, "rcss", () => { alert("ok"), () => { alert("error") } })
    }
    changeValue(e, key) {
        this.updataCss(key, e.target.value);
    }
    updataCss = (key: string, value: any) => {
        anim[key].value = value;

        let v, frame_v;

        css = `.${anim.name.value} {\n`;
        keyFrame = `@keyframes frames_${anim.name.value}{\n`;
        keyFrameW = `@-webkit-keyframes frames_${anim.name.value}{\n`;

        for (let o of classKey) {
            v = `    ${o}: ${anim[o].value};\n`;
            css += v;
        }
        for (let o of animKey) {
            if (o === "iteration-count" && anim[o].value === "0") {
                v = `animation-iteration-count: infinite;\n`;
            }
            else if (o === "name") {
                v = `animation-${o}: frames_${anim[o].value};\n`;
            } else
                v = `animation-${o}: ${anim[o].value};\n`;

            css = css + "    " + v + "    -webkit-" + v;
        }
        css += "}";

        let duration: any = anim.duration.value;
        duration = parseFloat(duration) * duration.indexOf("ms") ? 1 : 1000;

        let count = Math.min(anim.count.value, anim.count_hor.value * anim.count_ver.value);
        for (let i = 0; i < anim.count_ver.value; i++) {
            for (let j = 0, pre, x, y; j < anim.count_hor.value; j++) {
                if ((i + 1) * (j + 1) > count) break;
                pre = Fun.calc(i * anim.count_hor.value + j, 0, 100, count - 1, Fun[anim["frame_spend"]["value"]]);
                x = anim.count_hor.value <= 1 ? 100 : 100 / (anim.count_hor.value - 1) * j;
                y = anim.count_ver.value <= 1 ? 100 : 100 / (anim.count_ver.value - 1) * i;
                frame_v = `    ${Number.isInteger(pre) ? pre : pre.toFixed(2)}% {background-position: calc(${Number.isInteger(x) ? x : x.toFixed(2)}%) calc(${Number.isInteger(y) ? y : y.toFixed(2)}%);}\n`;
                keyFrame += frame_v;
                keyFrameW += frame_v;
            }
        }
        keyFrame += "}";
        keyFrameW += "}";
        while (animSheet.cssRules.length) {
            animSheet.deleteRule(0)
        }
        animSheet.insertRule(keyFrameW, 0);
        animSheet.insertRule(keyFrame, 0);
        animSheet.insertRule(css, 0);

        // 更新bg
        this.props.bg = anim["background-image"].value.replace("url(", `url(${location.origin}/dst1/`);
        this.paint()
    }
}

let animKey = ["name", "duration", "timing-function", "delay", "iteration-count", "direction", "fill-mode"],
    classKey = ["width", "height", "background-image"]
/**
 * 获取所有需要显示的rcss 动画
 */
const getAnimSheet = (): CSSStyleSheet => {
    let styleSheetElement = document.createElement('style');
    styleSheetElement.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

    let arr = document.styleSheets;
    let n = arr[arr.length - 1];
    return n as CSSStyleSheet
}

let anim = {
    name: {
        desc: "动画名称",
        type: "rich",
        value: "anim_name"
    },
    "background-image": {
        desc: "图片",
        type: "rich",
        value: "url(app/anim.png)"
    },
    width: {
        desc: "宽度",
        type: "number",
        limit: [1, null],
        util: ["px"],
        value: "64px"
    },
    height: {
        desc: "高度",
        type: "number",
        limit: [1, null],
        util: ["px"],
        value: "64px"
    },
    count_hor: {
        desc: "横向帧数量",
        type: "number",
        limit: [1, null],
        value: 4
    },
    count_ver: {
        desc: "纵向帧数量",
        type: "number",
        limit: [1, null],
        value: 4
    },
    frame_spend: {
        desc: "动画播放曲线",
        type: "enum",
        arr: ["linear", "quadIn", "quadOut", "quadInOut", "cubicIn", "cubicOut", "cubicInOut", "quartIn", "quartOut", "quartInOut", "quintIn", "quintOut", "quintInOut", "sinIn", "sinOut", "sinInOut", "expIn", "expOut", "expInOut", "circIn", "circOut", "circInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"],
        value: "linear"
    },
    duration: {
        desc: "播放时间",
        type: "number",
        limit: [0, null],
        util: ["s", "ms"],
        value: "3000ms"
    },
    "timing-function": {
        desc: "帧过渡曲线",
        type: "enum",
        arr: ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end"],
        value: "step-start"
    },
    delay: {
        desc: "延迟时间",
        type: "number",
        limit: [null, null],
        util: ["s", "ms"],
        value: "0ms"
    },
    "iteration-count": {
        desc: "播放次数",
        type: "number",
        limit: [0, null],
        value: "0"
    },
    direction: {
        desc: "播放顺序",
        type: "enum",
        arr: ["normal", "alternate", "reverse", "alternate-reverse"],
        value: "normal"
    },
    "fill-mode": {
        desc: "填充",
        type: "enum",
        arr: ["none", "forwards", "backwards", "alternate-both"],
        value: "forwards"
    },
    count: {
        desc: "帧数量(可选)",
        type: "number",
        limit: [0, 64],
        value: 64
    }
}
// play-state