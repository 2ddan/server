// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import { offsetPos } from '../../pi/util/html';
import { getRealNode, paintCmd3 } from "../../pi/widget/painter";
/**
 * @description 导出组件Widget类
 * @example
 */
export class Guides extends Widget {

	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		this.props = props;
        data = parseInt(props.boxWidth);
	}

    /**
	 * @description 添加到dom树后调用，在渲染循环内调用
	 * @example
	 */
	attach(): void {
        widget = this;
        isFirstPaint = true;
        domNode = getRealNode(widget.tree);
        if (SVG.supported) {
            drawContex = SVG("guides_canvas", domNode).size("100%", "100%");
        } else {
            alert('SVG not supported');
        }
        draw();
	}

    afterUpdate(): void {
        if(domNode)
	        draw();
	}
}

interface Edt{
    offsetL?:number,
    offsetT?:number,
    modulus?:number
}

let wdocument, widget, isFirstPaint, domNode, drawContex,data;
let SVG = (<any>self).SVG;
let edt : Edt = {};

const draw = () => {
    var mouseX, mouseY, //f = pi.forelet.get("uieditor_sculpt"),
        //edtedt = uieditor.forelet_mgr.getEditorEnvironment(),
        /**
         * 画刻度
         * @param L长度
         * @param bar 指定Top还是Left
         */
        drawScales = function (L, bar) {
            'use strict';
            var i = 0, count = L / 10, left, top, text;
            while (i <= count) {
                left = i * 10;
                if (i % 10 === 0) {
                    top = 0;
                } else if (i % 5 === 0) {
                    top = 10;
                } else {
                    top = 15;
                }
                if (bar === "top") {
                    drawContex.line(left + edt.offsetL, top, left + edt.offsetL, 20).stroke({width: 0.5});
                    if (top === 0) {
                        text = drawContex.text(i*10 + "").font({size: 10}).fill({color:"#666666"});
                        text.move(left + edt.offsetL + 2, 0);
                    }
                } else {
                    drawContex.line(top, left + edt.offsetT, 20, left + edt.offsetT).stroke({width: 0.5});
                    if (top === 0) {
                        text = drawContex.text(i*10 + "").font({size: 10}).fill({color:"#666666"});
                        text.move(2, left + edt.offsetT + 2);
                    }
                }
                i++;
            }
        },
        /**
         * 画网格
         * @param W 画布宽
         * @param H 画布高
         */
        drawNet = function (W, H) {
            console.log("refreshAll" + W + "_" + H);
            var i = 0, m = edt.modulus, countX = W / m, countY = H / m;
            while (i < countY) {
                //画两次，
                drawContex.line(edt.offsetT, i * m + edt.offsetT, W + edt.offsetT, i * m + edt.offsetT).stroke({width: 0.5}).attr({
                    stroke: '#666',
                    'stroke-dasharray': "1 0.5"
                });
                drawContex.line(edt.offsetT, i * m + edt.offsetT, W + edt.offsetT, i * m + edt.offsetT).stroke({width: 0.5}).attr({'stroke-dasharray': "0.5 3"});
                i++;
            }
            i = 0;
            while (i < countX) {
                drawContex.line(i * m + edt.offsetL, edt.offsetL, i * m + edt.offsetL, H + edt.offsetL).stroke({width: 0.5}).attr({
                    stroke: '#666',
                    'stroke-dasharray': "1 0.5"
                });
                drawContex.line(i * m + edt.offsetL, edt.offsetL, i * m + edt.offsetL, H + edt.offsetL).stroke({width: 0.5}).attr({'stroke-dasharray': "0.5 1"});
                i++;
            }
        },


        refreshAll = function () {
            //重新画
            let w = domNode.offsetWidth - 2 * data,
                h = domNode.offsetHeight - 2 * data;
            drawContex.clear();

            console.log("refreshAll");
            //画顶部标尺矩形
            drawContex.rect("100%", data + "px").attr({
                fill: 'rgb(50, 49, 62)',
                stroke: 'rgb(50, 49, 62)',
                'fill-opacity': 1,
                'stroke-width': 1,
                x: 0,
                y: 0
            });
            //画左侧标尺矩形
            drawContex.rect(data + "px", "100%").attr({
                fill: 'rgb(50, 49, 62)',
                stroke: 'rgb(50, 49, 62)',
                'fill-opacity': 1,
                'stroke-width': 1,
                x: w + data,
                y: 0
            });
            //画右侧矩形
            drawContex.rect(data + "px", "100%").attr({
                fill: 'rgb(50, 49, 62)',
                stroke: 'rgb(50, 49, 62)',
                'fill-opacity': 1,
                'stroke-width': 1,
                x: 0,
                y: 0
            });
            //画底部矩形
            drawContex.rect("100%", data + "px").attr({
                fill: 'rgb(50, 49, 62)',
                stroke: 'rgb(50, 49, 62)',
                'fill-opacity': 1,
                'stroke-width': 1,
                x: 0,
                y: h + data
            });
            drawScales(w, "top");
            drawScales(h, "left");
            //放大到一定程度，需要显示更密的网格
            //if (edt.zoomModulus >= 1.5) {
            //    edt.modulus = 10;
            //} else if (edt.zoomModulus < 1.5 && edt.zoomModulus > 1) {
            //    edt.modulus = 25;
            //} else {
            //    edt.modulus = 50;
            //}
            drawNet(w, h);
        };
    edt.modulus = 50;//系数,间隔多少像素画一条线
    wdocument = domNode.ownerDocument;
    //console.log(edt.getConfig());
    var off = [320,42];

    //edt.offsetL = off[0];
    //edt.offsetT = off[1];

    edt.offsetL = data;
    edt.offsetT = data;

    refreshAll();
};

