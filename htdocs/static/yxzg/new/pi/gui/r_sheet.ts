/**
 * GUI
 * 样式表
 */

import { FontStyle, FontWeight } from './enum';
import { gui } from './gui';
import { RDocument } from './r_document';
import { RElement } from './r_element';
import { RStyle } from './r_style';
import { AnimationCmd, BoxA, BoxB, BoxL, BoxR, BoxT, FlexBasis, GradientData, GradientTypes, IBoxData, ILengthData, ILengthVector2, IRGBA, IShadow, IShadowB, IShadowC, IShadowH, IShadowV, ITransform, ITransformDataType, IVector2, ScrollInfo, Tools } from './tools';

/**
 * 样式表管理
 */
export class RSheet {
    /**
     * 目标上下文
     */
    public readonly doc: RDocument;
    /**
     * 文本样式表数组
     */
    private textClassList: number[] = [];
    constructor(doc: RDocument) {
        this.doc = doc;
    }
    /**
     * 创建一个文本节点样式表
     * @param id 样式表 ID
     */
    public createTextStyleClass(id: number) {
        const result = gui._create_text_style_class(this.doc.uniqueID, id);

        if (result) {
            this.textClassList.push(id);
        }

        return result;
    }
    /**
     * 设置样式表中内容
     * @param doc 目标上下文
     * @param classID 样式表ID
     * @param key 样式键
     * @param value 样式值
     */
    public setTextStyleClass(classID: number, key: string, value: number | string) {
        if (this.textClassList.indexOf(classID) >= 0) {
            if (this[key]) {
                this[key](classID, value);
            }
        }

        return this;
    }
    /**
     * 为目标节点设置 样式表
     * @param node 目标节点
     * @param class_id 目标样式表ID
     */
    public setNodeTextStyleClass(node: RElement, class_id: number) {
        gui._set_text_style_class(this.doc.uniqueID, node.uniqueID, class_id);
    }
    private fontSize(classID: number, value: any) {
        if (typeof value === 'string') {
            value = Tools.fontSize(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_font_size(this.doc.uniqueID, classID, value);
        }
    }
    private fontFamily(classID: number, value: string) {

        if (typeof value === 'string') {
            value = Tools.fontFamily(<string>value);
        }

        if (!Tools.noValue(value)) {
            if (RStyle.FontFamilyList.indexOf(value) >= 0) {
                (<any>window).__jsObj = value;
                gui._set_text_style_class_font_family(this.doc.uniqueID, classID);
            }
        }
    }
    private fontStyle(classID: number, value: FontStyle | string) {

        if (typeof value === 'string') {
            value = Tools.fontStyle(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_font_style(this.doc.uniqueID, classID, value);
        }
    }
    private fontWeight(classID: number, value: FontWeight | string) {

        if (typeof value === 'string') {
            value = Tools.fontWeight(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_font_weight(this.doc.uniqueID, classID, value);
        }
    }
    private letterSpacing(classID: number, value: ILengthData | string) {

        if (typeof value === 'string') {
            value = Tools.letterSpacing(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_letter_spacing(this.doc.uniqueID, classID, value[1]);
        }
    }
    private color(classID: number, value: IRGBA | string) {

        if (typeof value === 'string') {
            value = Tools.color(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_text_rgba_color(this.doc.uniqueID, classID, value[0], value[1], value[2], value[3]);
        }
    }
    private textGradient(classID: number, value: string | GradientData) {

        if (typeof value === 'string') {
            value = Tools.textGradient_(<string>value);
        }

        if (!Tools.noValue(value)) {
            if (value._t === GradientTypes.linear) {
                (<any>window).__jsObj = value.color_and_positions;            
                gui._set_text_style_class_linear_gradient_color(this.doc.uniqueID, classID, value.direction);
                (<any>window).__jsObj = undefined;
            }
        }
    }
    private lineHeight(classID: number, value: ILengthData | string) {

        if (typeof value === 'string') {
            value = Tools.lineHeight(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_line_height(this.doc.uniqueID, classID, value[0]);
        }
    }
    private textIndent(classID: number, value: number | string) {

        if (typeof value === 'string') {
            value = Tools.textIndent(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_text_indent(this.doc.uniqueID, classID, value);
        }
    }
    private whiteSpace(classID: number, value: number | string) {

        if (typeof value === 'string') {
            value = Tools.whiteSpace(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_white_space(this.doc.uniqueID, classID, value);
        }
    }
    private textStroke(classID: number, value: string | number[]) {

        if (typeof value === 'string') {
            value = Tools.textStroke(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_text_stroke(this.doc.uniqueID, classID, value[0], value[1], value[2], value[3], value[4]);
        }
    }
    private textShadow(classID: number, value: IShadow | string) {

        if (typeof value === 'string') {
            value = Tools.textShadow(<string>value);
        }

        if (!Tools.noValue(value)) {
            gui._set_text_style_class_text_shadow(this.doc.uniqueID, classID, value[IShadowH], value[IShadowV], value[IShadowC][0], value[IShadowC][1], value[IShadowC][2], value[IShadowC][3], value[IShadowB]);
        }
    }
}