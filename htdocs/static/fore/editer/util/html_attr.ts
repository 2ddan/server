
// ============================== 导入
import { Widget, lookup } from "../../pi/widget/widget";
import { Forelet } from "../../pi/widget/forelet";
import { Json } from '../../pi/lang/type';
import { Syntax } from "../../pi/compile/parser";
import { toStr } from "../util/restore";
import { parserTpl } from "../../pi/compile/vdom";
import { Sheet, URLEffect } from "../../pi/widget/style";
import { mapCopy } from "../../pi/util/util";
import { trim } from "./util";
import { create } from "../../pi/ui/root";
import * as Mgr from "../mgr/widget_mgr";

//属性
export interface Attr {
    key: string,
    value?: { ct: any, type?: string },
}

//属性
export interface Attrs {
    base: Map<string, any>,
    attrScript?: Array<string>,
    script: string,
    style: { map: Map<string, any>, quto?: string },
    clazz: { arr: Array<string>, quto?: string },
    class: { arr: Array<string>, quto?: string },
    tagName: string,
}

export class HtmlAttr {
    attrsMap: Map<number, Attrs> = new Map<number, Attrs>();

    constructor(st: Syntax) {
        this.createAttrs(st);
    }

    copyStyle(newId: number, oldId: number) {
        let pre = oldId + "";
        let sheet = Mgr.environment.widget.sheet.value;
        sheet.forEach((v, k) => {
            let id = k.split("-");
            if (id[0] === pre) {
                let effect = { map: new Map<string, string>(), url: null };
                mapCopy(v.map, effect.map);
                sheet.set(k.replace(pre, newId + ""), effect);
            }
        })
    }

    /**
    * 从语法树转换成属性列表,st的type为 tag，imgtag，if。。。等.
    */
    createAttrs(st: Syntax): Attrs {
        let info = { base: new Map<string, any>(), script: null, style: { map: new Map<string, any>() }, clazz: { arr: [] }, class: { arr: [] }, tagName: null };
        if (st.type === "if" || st.type === "for" || st.type === "while") {
            info.script = "{{" + toStr(st);
            this.attrsMap.set((<any>st).sid, info);
        }
        else if (st.type === "tag" || st.type === "imgtag" || st.type === "metatag" || st.type === "inputtag") {
            let attrs;
            if (st.type === "tag") {
                attrs = st.right[1];
                info.tagName = st.right[0].value;
            } else {
                if (st.type === "imgtag")
                    info.tagName = "img";
                else if (st.type === "metatag")
                    info.tagName = "meta";
                else if (st.type === "inputtag")
                    info.tagName = "input";
                attrs = st.right[0];
            }
            this.attrsMap.set((<any>st).sid, info);

            htmlStToTree(info, attrs);
        }

        let right = st.right;
        if (!right)
            return;

        for (var i = 0; i < right.length; i++) {
            this.createAttrs(right[i]);
        }
        return info;
    }

    /**
    * 替换Attrs
    */
    replaceAttrs(sid: number, attrs: Attrs): void {
        this.attrsMap.set(sid, attrs);
    }


    /**
    * 设置attrs
    * @param key 该属性应该在base中(不包含clazz，style，class，script，这些属性的设置分别有其对应的方法)
    * @param value--当value可以是一个对象（包含值得类型），也可以是一个属性值
    */
    setAttrs = (sid: number, key: string, value: any) => {
        let target = this.attrsMap.get(sid).base;
        target.set(key, value);
    }


    /**
    * 设置脚本
    */
    setScript = (sid: number, value: any) => {
        this.attrsMap.get(sid).script = value;
    }

    /**
    * 设置style
    */
    setStyle = (sid: number, key: string, value: string) => {
        this.attrsMap.get(sid).style.map.set(key, value);
    }

    /**
    * 设置attrScript
    */
    setAttrScript = (sid: number, value: string) => {
        this.attrsMap.get(sid).attrScript.push(value);
    }

    restoreToSt = (ats: any): Syntax => {
        let syntax, attrs: Attrs;
        if (Number.isInteger(ats)) {
            attrs = this.attrsMap.get(ats);
        } else {
            attrs = ats;
        }

        //如果script存在，则为脚本
        if (attrs.script) {
            syntax = parserTpl(attrs.script);
        } else {
            let base = attrs.base, style = attrs.style, clazz = attrs.clazz, _class = attrs.class, attrScript = attrs.attrScript, tagName = attrs.tagName;
            let str;
            str = `<${tagName}`;

            if (style.map.size > 0) {
                str += ` style=${style.quto || '"'}`;
                style.map.forEach((value, key, map) => {
                    str += `${key}:${value};`;
                })
                str += `${style.quto || '"'}`;
            }

            if (clazz.arr.length > 0) {
                str += ` w-class=${(clazz.quto || '"') + clazz.arr.join(" ") + (clazz.quto || '"')}`;
            }

            if (_class.arr.length > 0) {
                str += ` class=${(_class.quto || '"') + _class.arr.join(` `) + (_class.quto || '"')}`;
            }

            if (base.size > 0) {
                base.forEach((value, key, map) => {
                    str += ` ${key}=${value}`;
                });
            }

            if (attrScript) {
                for (let i = 0; i < attrScript.length; i++) {
                    str += ` ${attrScript[i]}`;
                }
            }

            if (tagName === "img" || tagName === "input" || tagName === "meta") {
                str += `/>`;
            } else {
                str += `></${tagName}>`;
            }
            syntax = parserTpl(str);
        }

        return syntax;
    }

    /**
    * 取出对应id的attrs
    */
    getAttrs = (sid: number): Attrs => {
        return this.attrsMap.get(sid);
    }

    /**
    * 删除对应id的attrs
    */
    delAttrs = (sid: number) => {
        this.attrsMap.delete(sid);
    }

    /**
     * @description 添加clazz属性
     * @example
     */
    addClazzStyle = (style: Map<string, string>, clazzName: string): Map<string, string> => {
        let sid, sheet, oldStyle, newStyle;
        sid = +clazzName.split("-")[0];
        if (!Mgr.environment.widget.getSheet()) {
            Mgr.environment.widget.sheet = { value: new Map<string, URLEffect>() };
        }
        sheet = Mgr.environment.widget.sheet.value;
        let s = sheet.get(clazzName);
        newStyle = new Map<string, string>();
        if (s) {
            oldStyle = s.map;
            mapCopy(oldStyle, newStyle);
        }
        style.forEach((v, k) => {
            newStyle.set(k, v);
        })
        sheet.set(clazzName, { url: null, map: newStyle });
        return oldStyle;
    }

    /**
     * @description 删除clazz属性
     * @example
     */
    delClazzStyle = (keys: Array<string>, clazzName: string): Map<string, string> => {
        let sid, sheet, oldStyle, newStyle;
        sid = +clazzName.split("-")[0];
        sheet = Mgr.environment.widget.sheet.value;
        oldStyle = sheet.get(clazzName).map;
        newStyle = new Map<string, string>();
        mapCopy(oldStyle, newStyle);
        for (let i = 0; i < keys.length; i++) {
            newStyle.delete(keys[i]);
        }
        sheet.get(clazzName).map = newStyle;
        return oldStyle;
    }

    /**
     * @description 添加clazz
     * @example
     */
    addClazz = (sid: number, style: Map<string, string>, clazzName: string) => {
        let attrs = this.attrsMap.get(sid);
        if (attrs.clazz.arr.indexOf(clazzName) === -1)
            attrs.clazz.arr.push(clazzName);
        if (!Mgr.environment.widget.getSheet()) {
            Mgr.environment.widget.sheet = { value: new Map<string, URLEffect>() };
        }
        let sheet = Mgr.environment.widget.sheet.value;
        sheet.set(clazzName, { map: style, url: null });
    }

    /**
     * @description 删除clazz
     * @example
     */
    delClazz = (clazzName: string): Map<string, string> => {
        let arr = clazzName.split("-");
        let attrs = this.attrsMap.get(+arr[0]);
        for (let i = 0; i < attrs.clazz.arr.length; i++) {
            if (attrs.clazz.arr[i] === clazzName) {
                attrs.clazz.arr = attrs.clazz.arr.slice(0, i).concat(attrs.clazz.arr.slice(i + 1, attrs.clazz.arr.length))
            }
        }
        let sheet = Mgr.environment.widget.sheet.value;
        let old = sheet.get(clazzName);
        sheet.delete(clazzName);
        return old.map;
    }

    /**
     * @description 修改clazz
     * @example
     */
    modifyClazz = (style: Map<string, string>, clazzName: string): Map<string, string> => {
        let sheet = Mgr.environment.widget.sheet.value;
        let old = sheet.get(clazzName).map;
        sheet.set(clazzName, { map: style, url: null })
        return old;
    }

    /**
     * 设置clazz(单个属性)
     * @param elem 
     * @param key 
     * @param value 
     */
    // export const modifyClazz = (elem: HTMLElement, key: string, value: any): Map<string, string> => {
    //     let style = new Map();
    //     let oldStyle = setClazz(style, elem);
    //     return oldStyle;
    // }

    /**
     * @description 取到clazz样式
     * @example
     */
    getClazz = (name: string): Map<string, string> => {
        name && (name = name.replace(/\s/g, ""));
        let c = Mgr.environment.widget.sheet;
        if (!name || !c || !c.value) {
            return null;
        }

        let sheet: Sheet = c ? c.value : new Map<string, URLEffect>();
        return sheet.get(name).map;
    }

    /**
     * @description 取到最后一个clazz的名称
     * @example
     */
    getLastCN = (attrs: Attrs): string => {
        let arr = attrs.clazz.arr;
        return arr[arr.length - 1];
    }

    /**
     * @description 取到最后一个clazz的内容
     * @example
     */
    getCurClazz = (attrs: Attrs): Map<string, string> => {
        let clazzName = this.getLastCN(attrs);
        return this.getClazz(clazzName);
    }

    //根据字符串取到值(字符串形如0px, 50px)
    getStyleValue = (str: string): number => {
        if (!str) {
            return 0;
        }
        return parseInt(str.slice(0, str.length - 2));
    }

    /**修改位置
     * @param ，parent添加元素的容器， selects添加元素
     */
    movePos = (old: Attrs, differ): Map<string, string> => {
        let clazz, style = new Map<string, string>();
        clazz = this.getClazz(this.getLastCN(old));
        style.set("left", this.getStyleValue(clazz.get("left")) + differ.x + "px");
        style.set("top", this.getStyleValue(clazz.get("top")) + differ.y + "px");
        style.set("position", "absolute");
        return style;
    }

    /**
    * 取出对应id的attrs
    * @param sid 是一个number或能转化成number的字符串
    */
    clone = (sid: any) => {
        if (typeof sid === "string") {
            sid = parseInt(sid);
        }
        let attrs: Attrs = this.attrsMap.get(sid);
        if (!attrs) {
            throw "对应属性不存在, sid:" + sid;
        }
        let copy: Attrs = { base: new Map<string, any>(), script: null, style: { map: new Map<string, any>() }, clazz: { arr: [] }, class: { arr: [] }, tagName: null }, attr: Attr, oldAttr: Attr;
        copy.tagName = attrs.tagName;
        copy.style.quto = attrs.style.quto;
        copy.clazz.quto = attrs.clazz.quto;
        copy.class.quto = attrs.class.quto;
        copy.script = attrs.script;

        mapCopy(attrs.base, copy.base);
        mapCopy(attrs.style.map, copy.style.map);

        let copyArr = (key: string) => {
            for (let i = 0; i < attrs[key].arr.length; i++) {
                copy[key].arr.push(attrs[key].arr[i]);
            }
        }
        copyArr("class");
        copyArr("clazz");

        return copy;
    }
}

/**
     * html元素对应的语法树转换成Array<Attr>，用于显示在inspector面板上
     * @param st: attrs节点  attrs语法：[{|attr, script|}];
     */
const htmlStToTree = (parent: Attrs, st: Syntax) => {
    let right = st.right, base = parent.base, script = parent.script, style = parent.style, clazz = parent.clazz, _class = parent.class;
    let value, name, attr, attrRight, quto, vstr;
    for (var i = 0; i < right.length; i++) {
        attr = right[i];
        value = toStr(attr);
        if (attr.type === "script") {
            parent.attrScript.push(toStr(attr));
        } else if (attr.type === "attr") {
            attrRight = attr.right;
            name = attrRight[0].value;
            value = attrRight[1];
            vstr = toStr(value);
            if (name === "style" || name === "class" || name === "w-class") {
                quto = vstr.charAt(0);
                value = vstr.slice(1, vstr.length - 1);
            }
            if (name === "style") {
                style.quto = quto;
                let styles = parseStyle(attrRight[1]);
                let stemp;
                for (var j = 0; j < styles.length; j++) {
                    stemp = styles[j];
                    style.map.set(trim(stemp[0]), trim(stemp[1]));
                }
            } else if (name === "class") {
                _class.quto = quto;
                _class.arr = value.match(/\b\w+\b/g);
            } else if (name === "w-class") {
                clazz.quto = quto;
                clazz.arr[0] = value;
            } else {
                base.set(trim(name), trim(vstr));
            }
        }
    }
}

const getTagName = (st: Syntax): string => {
    if (st.type === "tag") {
        return st.right[0].value;
    } else if (st.type === "imgtag") {
        return "img";
    } else if (st.type === "metatag") {
        return "meta";
    } else if (st.type === "inputtag") {
        return "input";
    }
}

const parseStyle = (st: Syntax) => {
    let right = st.right, item, attrs = [], temps, attrkv, laststr = "", len;
    for (let i = 0; i < right.length; i++) {
        item = right[i];
        if (item.type === "lstring") {
            temps = item.value.split(";");//临时的属性
            len = temps.length;
            let j = 0;
            if (laststr) {
                laststr += temps[0];
                if (len > 1) {
                    attrkv = laststr.split(":");
                    attrs.push(attrkv);
                    laststr = "";
                }
                j++;
            }
            for (; j < len - 1; j++) {
                attrkv = temps[j].split(":");
                attrs.push(attrkv);
            }
            laststr += temps[len - 1];

        } else {//item.type === "script"
            if (laststr) {
                laststr += toStr(item);
            } else {
                attrs.push(["script", toStr(item)]);
            }
        }

        if (laststr) {
            attrkv = laststr.split(":");
            attrs.push(attrkv);
        }
    }

    return attrs;
}






