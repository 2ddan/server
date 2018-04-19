/**操作元素，更新tree，st， htmlattr的状态
 */
import { getCache, lookup, setCache } from "../../pi/widget/widget";
import { Syntax } from "../../pi/compile/parser";
import { parserTpl } from "../../pi/compile/vdom";
import { toFun } from "../../pi/util/tpl";
import * as Sop from "../util/syntax_op";
import * as Tree from "../util/tree";
import * as Util from "../util/util";
import * as Select from "../util/select";
import * as HtmlAttr from "../util/html_attr";
import { Json } from '../../pi/lang/type';
import { toStr } from "../util/restore";
import * as Mgr from "../mgr/widget_mgr";
import { Sheet, URLEffect } from "../../pi/widget/style";
import { mapCopy } from "pi/util/util";

/**修改父节点
 * @param ，parent添加元素的容器， selects添加元素
 */
export const modifyParent = (parentSid: number, sid: number, index?: number, style?: Map<string, string>): { parentSid: number, sid: number, index: number, style?: Map<string, string> } => {
    let env = Mgr.environment;
    let oldIndex = env.treeOp.getOldIndex(sid);
    if (oldIndex < index)
        index -= 1
    let ret = env.treeOp.modifyParent(parentSid, sid, index);
    env.syntaxOp.modifyParent(parentSid, sid, index);
    let layout = env.htmlAttr.getAttrs(parentSid).base.get("layout");
    if (layout) {
        let newStyle = new Map();
        mapCopy(env.htmlAttr.getClazz(sid + ""), newStyle);
        newStyle.delete("left");
        newStyle.delete("top");
        newStyle.set("position", "relative");
        let old = modifyElemStyle(sid + "", newStyle);
        ret["style"] = old.clazzMap;
    }
    else if (style) {
        let old = modifyElemStyle(sid + "", style);
        ret["style"] = old.clazzMap;
    }
    return ret;
}

/**
 * 创建一个div(默认宽高50x50)
 */
export const createElem = (parentSid: number, style?: Map<string, string>, tagName?: string, index?: number, attr?: Json): number => {
    let env = Mgr.environment;
    let sid = env.syntaxOp.maxSid, clazzName = sid + "", str;
    let singleTag = /(img)|(input)/;
    tagName = tagName || "div";
    style = style || getDefaultStyle()
    let layout = env.htmlAttr.getAttrs(parentSid).base.get("layout");
    if (layout) {
        style.delete("left");
        style.delete("top");
        style.set("position", "relative");
    }
    if (layout === `"grid"`) {
        // do something
    }
    str = `<${tagName} w-class="${clazzName}"`
    for (let k in attr) {
        str += `${k}="${attr[k]}"`;
    }
    str += singleTag.test(tagName) ? `/>` : `></${tagName}>`;
    let st = env.syntaxOp.createSyntax(str);
    env.treeOp.createTree(st, parentSid);
    env.htmlAttr.createAttrs(st);
    env.syntaxOp.addSt(parentSid, sid, index);
    //addElem(parentSid, sid, index);
    env.htmlAttr.addClazz(sid, style, sid + "");
    return sid;
}

export const addElem = (parentSid: number, sid: number, clazzMap?: Map<string, Map<string, string>>, index?: number) => {
    let env = Mgr.environment;
    env.syntaxOp.addSt(parentSid, sid, index);
    env.treeOp.add(parentSid, sid, index);

    if (clazzMap) {
        clazzMap.forEach((v, k) => {
            if (!Mgr.environment.widget.getSheet()) {
                Mgr.environment.widget.sheet = { value: new Map<string, URLEffect>() };
            }
            let sheet = Mgr.environment.widget.sheet.value;
            sheet.set(k, { map: v, url: null });
        });
    }
}


/**
 * 删除元素
 */
export const delElem = (childSids: Array<number>): { index: number, sid: number, parentSid: number, clazzMap?: Map<string, Map<string, string>> } => {
    let env = Mgr.environment;
    let ret = env.treeOp.delTree(childSids[0]) as any;
    console.log(111, ret)
    let clazzs = env.htmlAttr.getAttrs(childSids[0]).clazz.arr;
    let clazzMap = delClazz(childSids)
    ret.clazzMap = clazzMap;
    env.syntaxOp.delSt(childSids[0]);
    env.select.cancelS(childSids[0]);
    return ret;
}

/**
 * 修改元素
 */
export const modifyElemAttrs = (sid: number, attrs: HtmlAttr.Attrs): { sid: number, attrs: HtmlAttr.Attrs } => {
    let env = Mgr.environment;
    let old = env.htmlAttr.clone(sid);
    env.htmlAttr.replaceAttrs(sid, attrs);
    let st = env.htmlAttr.restoreToSt(attrs);
    env.syntaxOp.modifySt(sid, st);
    return { sid: sid, attrs: old };
}

/**
 * 修改元素
 */
export const modifyElemStyle = (clazzName: string, style: Map<string, string>): { clazzName: string, clazzMap: Map<string, string> } => {
    let old = Mgr.environment.htmlAttr.modifyClazz(style, clazzName)
    return { clazzName: clazzName, clazzMap: old };
}

/**
 * 修改元素内容（只能修改文字和传给widget的数据）
 */
export const modifyElemCon = (sid: number, right: Array<Syntax>): { sid: number, right: Array<Syntax> } => {
    let oldSy = Sop.findBySid(sid, Mgr.environment.syntaxOp.syntax);
    let oldRight = Sop.findByType("body", oldSy).right;
    Mgr.environment.syntaxOp.modifySyBody(sid, right);
    return { sid: sid, right: oldRight };
}

export const setCode = (codeStr: string): string => {
    let env = Mgr.environment;
    let old = toStr(Mgr.environment.syntaxOp.syntax);
    env.syntaxOp.setStSid(2);
    env.syntaxOp.syntax = env.syntaxOp.createSyntax(codeStr);
    env.treeOp.tree = Mgr.environment.treeOp.createTree(env.syntaxOp.syntax);
    env.htmlAttr.createAttrs(env.syntaxOp.syntax);
    env.select.clearS();
    let tpl = getCache(Mgr.environment.openName.replace(/\-/g, "/") + ".tpl");
    tpl.str = codeStr;

    return old;
}

export const modifyElemTpldata = (name: string, data: Json): Json => {
    let w = lookup(name);
    w.config = w.config || {};
    let old = {};
    for (let k in w.config) {
        old[k] = w.config[k];
    }

    for (let k in data) {
        w.config[k] = data[k];
    }

    let path = name.replace(/\-/g, "/");
    let cache = getCache(path + ".cfg") || {};
    setCache(path + ".cfg", cache);
    return old;
}

const getDefaultStyle = (): Map<string, string> => {
    let style = new Map<string, string>();
    style.set("position", "absolute");
    style.set("width", "50px");
    style.set("height", "50px");
    return style;
}

const delClazz = (childSids: Array<number>): Map<string, Map<string, string>> => {
    let h = Mgr.environment.htmlAttr;
    let sheet = Mgr.environment.widget.sheet.value;
    let map: Map<string, Map<string, string>> = new Map();
    sheet.forEach((v, k) => {
        let id = +k.split("-")[0];
        if (childSids.indexOf(id) !== -1) {
            map.set(k, h.delClazz(k))
        }
    })
    return map;
}  