import { getCache, Widget, setCache, lookup } from "../../pi/widget/widget";
import { Syntax } from "../../pi/compile/parser";
import { parserTpl } from "../../pi/compile/vdom";
import * as Util from "../util/util";
import * as Urdo from "./urdo";
import * as Mgr from "../mgr/widget_mgr";
import * as HtmlAttr from "../util/html_attr";
import { Select } from "../util/select";
import * as Sop from "../util/syntax_op";
import * as Tree from "../util/tree";
import { offsetPos, Pos } from '../../pi/util/html';
import { calAPos, getPStyle, getClazzName } from '../util/html';
import { Json } from '../../pi/lang/type';
import { deepCopy, mapCopy } from '../../pi/util/util';
import { toStr } from "../util/restore";
import * as OpElem from "./opelem";
import { gen } from "../../pi/compile/genvdom";


let curOpen, copyArr: Array<Syntax> = [];
export let opRoot;
export const setOpRoot = (root) => {
    opRoot = root;
}
// export const newOpen = (wName) => {
//     Sop.setStSid(2);
//     Select.clearS();
//     HtmlAttr.clearAttrs();
//     irForelet.clean();
//     open(wName)
// }

//复制
export const copy = () => {
    let sids = Mgr.environment.select.getSelectSids();
    if (sids.length == 0) return;
    let sys = Mgr.environment.select.getSelectSts();
    let copy: Array<any> = [], copy1 = [];
    for (let i = 0; i < sids.length; i++) {
        copy.push(sys[i].parent.parent);
    }
    copyArr = copy;
}
//粘贴
export const paste = () => {
    let sop = Mgr.environment.syntaxOp;
    let urdo = Mgr.environment.urDo;
    let se = Mgr.environment.select.getSelectEs()[0];
    let parentSid = Mgr.environment.select.getSelectSids()[0];
    if (copyArr.length == 0 || se.tagName !== "DIV" || se.getAttribute("w-tag") && se.getAttribute("sid") !== "2") {
        parentSid = +se.parentElement.getAttribute("sid");
        // alert(`can not paste in widget tag or single tag.`)
        // return;
    }
    let undoParam = [], redoParam = [];
    for (let i = 0; i < copyArr.length; i++) {
        let copySy = Sop.copySt(copyArr[i])
        let sid = Mgr.environment.syntaxOp.maxSid;

        sop.setParent(copySy, parentSid);
        sop.setSid(copySy);
        sop.setScriptSid(copySy);
        copyClazz(copySy);
        changeClazz(copySy, null, null);
        Mgr.environment.treeOp.createTree(copySy, parentSid);
        Mgr.environment.htmlAttr.createAttrs(copySy);
        Mgr.environment.syntaxOp.addSt(parentSid, sid);
        undoParam.push([sid]);
        redoParam.push({ index: null, childSid: sid, parentSid: parentSid })
    }

    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.delElems, redo: Urdo.addElems };
    urdo.addUndo(unReDo); //添加撤销和前进操作函数
    Mgr.notify("nodeChange");
}
//删除
export const delElems = (selectEs: Array<HTMLElement>) => {
    if (selectEs.length == 0) return;
    let undoParam = [], redoParam = [];

    let childSids: Array<number>;
    for (let i = 0; i < selectEs.length; i++) {
        childSids = [];
        childSids.push(+selectEs[i].getAttribute("sid"))
        getChildSids(selectEs[i], childSids);
        redoParam.push(childSids);
        undoParam.push(OpElem.delElem(childSids));
    }
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.addElems, redo: Urdo.delElems };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数
    Mgr.notify("nodeChange");
}
const getChildSids = (el: Element, childSids: Array<number>): void => {
    childSids.push(+el.getAttribute("sid"));
    if (el.getAttribute("w-tag")) {
        return;
    }
    let children = el.children;
    if (children) {
        for (var i = 0; i < children.length; i++) {
            getChildSids(children[i], childSids);
        }
    }
}

/**
 * 修改元素属性
 * @param param: [{sid:父节点id, attrs:修改后的属性}]
 */
export const modifyAttrs = (sid: number, attrs: HtmlAttr.Attrs) => {
    let undoParam = [OpElem.modifyElemAttrs(sid, attrs)];
    let redoParam = [{ sid: sid, attrs: attrs }];
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyAttrs, redo: Urdo.modifyAttrs };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数
    Mgr.notify("attrChange");
}
/**修改父节点
 * @param ，parent添加元素的容器， selects添加元素
 */
export const modifyParent = (parentSid: number, childSids: Array<number>, index?: number) => {
    let temp, undoParam = [], redoParam = [];
    for (let i = 0; i < childSids.length; i++) {
        temp = childSids[i];
        undoParam.push(OpElem.modifyParent(parentSid, temp, index !== undefined ? index + i : null));
        redoParam.push({ parentSid: parentSid, sid: temp, index: index !== undefined ? index + i : null })
    }
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyParents, redo: Urdo.modifyParents };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数
    Mgr.notify("nodeChange");
}

/**
* 添加元素
* @param param:[{st:Syntax, index:number}] -- 添加元素的语法树
*/
export const createElem = (parentSid: number, style?: Map<string, string>, tagName?: string, index?: number, attr?: Json) => {
    let undoParam = [], redoParam = [];
    let sid = OpElem.createElem(parentSid, style, tagName, index, attr);
    undoParam.push([sid]);
    redoParam.push({ parentSid: parentSid, index: index, childSid: sid, clazzMap: new Map([[sid + "", Mgr.environment.htmlAttr.getClazz(sid + "")]]) });
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.delElems, redo: Urdo.addElems };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数

    Mgr.notify("nodeChange");
}

/**添加widget或div(或其他html元素),selects长度应该是1
 * @param ，parent添加元素的容器， selects添加元素， mpos鼠标相对于元素的位置， mePos鼠标停靠的坐标
 */
export const addElem = (parent: HTMLElement, selects: Array<HTMLElement>, mpos: Pos, mePos: Pos): void => {
    let postion, wName, selectE, pos, tagName, src, attr = {};
    let parentSid = parseInt(parent.getAttribute("sid")), styles;
    let layout = parent.getAttribute("layout");
    if(layout === "grid"){
        let width = parent.clientWidth;
        let height =parent.clientHeight;
        let row = (parent.style as any).gridTemplateRows;
		let columns = (parent.style as any).gridTemplateColumns;
		let rowGap = (parent.style as any).gridRowGap;
		let columnGap = (parent.style as any).gridColumnGap;
    }
    for (var i = 0; i < selects.length; i++) {
        selectE = selects[i];

        //拼出放置元素的字符串，
        postion = { x: mePos.x - mpos.x, y: mePos.y - mpos.y };
        wName = selectE.getAttribute("w-tag");
        tagName = selectE.getAttribute("tagName");
        src = selectE.getAttribute("srcPath");
        wName && (attr["w-tag"] = wName);
        src && (attr["src"] = src);

        styles = getPStyle(postion);
        //非组件
        createElem(parentSid, styles, wName ? "widget" : tagName, null, attr);
    }
}

/**
 * 修改多个元素的clazz_style
 * @param param: [{sid:父节点id, clazzMap: clazz样式}]
 */
export const addClazzs = (param: Array<{ clazzMap: Map<string, string>, clazzName: string }>) => {
    let temp, undoParam = [], redoParam = [], newClazz;
    for (let i = 0; i < param.length; i++) {
        temp = param[i];
        undoParam.push({ clazzName: temp.clazzName, clazzMap: Mgr.environment.htmlAttr.addClazzStyle(temp.clazzMap, temp.clazzName) });
        newClazz = new Map<string, string>();
        mapCopy(Mgr.environment.htmlAttr.getClazz(temp.clazzName), newClazz);
        redoParam.push({ clazzName: temp.clazzName, clazzMap: newClazz });
    }
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyStyles, redo: Urdo.modifyStyles };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数

    Mgr.notify("clazzChange");
}

/**
 * 修改多个元素的clazz_style
 * @param param: [{sid:父节点id, clazzMap: clazz样式}]
 */
export const delClazzs = (keys: Array<string>, clazzName: string) => {
    let undoParam = [], redoParam = [], newClazz;
    undoParam.push({ clazzName: clazzName, clazzMap: Mgr.environment.htmlAttr.delClazzStyle(keys, clazzName) });
    newClazz = new Map<string, string>();
    mapCopy(Mgr.environment.htmlAttr.getClazz(clazzName), newClazz);
    redoParam.push({ clazzName: clazzName, clazzMap: newClazz });
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyStyles, redo: Urdo.modifyStyles };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数
    Mgr.notify("clazzChange");
}



/**
 * 修改一个元素的body内容
 */
export const modifyBody = (sid: number, content: string) => {
    let env = Mgr.environment;
    let newSy = env.syntaxOp.createSyntax(content.replace(/\s/g, " "));
    let newRight = Sop.findByType("body", newSy).right;
    let redoParam = { sid: sid, right: newRight };
    let undoParam = OpElem.modifyElemCon(sid, newRight);
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyCon, redo: Urdo.modifyCon };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数

    Mgr.notify("attrChange");
}

export const modifyCode = (codeStr: string) => {
    let undoParam = OpElem.setCode(codeStr);
    let redoParam = codeStr;
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyCode, redo: Urdo.modifyCode };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数
    Mgr.notify("nodeChange");
}
/**
 * 修改元素
 */
export const modifyStyle = (el: HTMLElement, style: Map<string, string>) => {
    let ev = Mgr.environment, redoParam = [], undoParam = [];
    const sid = +el.getAttribute("sid");
    let clazzName = getClazzName(el);
    let oldData, clazzMap, newData;

    if (!clazzName) {
        clazzName = sid + "";
        const attrs = ev.htmlAttr.clone(sid);
        attrs.clazz.arr.push(clazzName);
        attrs.clazz.quto = `"`;
        oldData = { clazzName: clazzName, attrs: OpElem.modifyElemAttrs(sid, attrs).attrs };
        ev.htmlAttr.addClazzStyle(style, clazzName);
        newData = { clazzName: clazzName, attrs: attrs };
    } else {
        let styleMap = Mgr.environment.htmlAttr.getClazz(clazzName);
        for (let v of style) {
            styleMap.set(v[0], v[1])
        }
        oldData = { clazzName: clazzName, clazzMap: ev.htmlAttr.modifyClazz(styleMap, clazzName) };
        newData = { clazzName: clazzName }
    }
    let map = new Map<string, string>();
    mapCopy(ev.htmlAttr.getClazz(clazzName), map);
    newData.clazzMap = map;
    redoParam.push(newData);
    undoParam.push(oldData);
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyStyles, redo: Urdo.modifyStyles };
    Mgr.environment.urDo.addUndo(unReDo);
    Mgr.notify("clazzChange");
}

/**
 * 修改多个元素的clazz_style
 * @param param: [{sid:父节点id, clazzMap: clazz样式}]
 */
export const modifyStyles = (param: Array<{ el: HTMLElement, style: Map<string, string> }>) => {
    let ev = Mgr.environment, redoParam = [], undoParam = [];
    let sid, clazzName, oldData, clazzMap, newData, temp;
    for (let i = 0; i < param.length; i++) {
        temp = param[i];

        sid = +temp.el.getAttribute("sid");
        clazzName = getClazzName(temp.el);
        let layout = temp.el.parentElement.getAttribute("layout");
        if (layout) {
            temp.style.delete("left");
            temp.style.delete("top");
            temp.style.set("position", "relative");
        }
        if (layout === `"grid"`) {
            // do something
        }
        if (!clazzName) {
            clazzName = sid + "";
            const attrs = ev.htmlAttr.clone(sid);
            attrs.clazz.arr.push(clazzName);
            attrs.clazz.quto = `"`;
            oldData = { clazzName: clazzName, attrs: OpElem.modifyElemAttrs(sid, attrs).attrs };
            ev.htmlAttr.addClazzStyle(temp.style, clazzName);
            newData = { clazzName: clazzName, attrs: attrs };
        } else {
            let styleMap = new Map();
            mapCopy(Mgr.environment.htmlAttr.getClazz(clazzName), styleMap);
            for (let v of temp.style) {
                styleMap.set(v[0], v[1])
            }
            oldData = { clazzName: clazzName, clazzMap: ev.htmlAttr.modifyClazz(styleMap, clazzName) };
            newData = { clazzName: clazzName }
        }

        let map = new Map<string, string>();
        mapCopy(ev.htmlAttr.getClazz(clazzName), map);
        newData.clazzMap = map;

        redoParam.push(newData);
        undoParam.push(oldData);
    }

    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyStyles, redo: Urdo.modifyStyles };
    Mgr.environment.urDo.addUndo(unReDo); //添加撤销和前进操作函数

    Mgr.notify("clazzChange");
}

/**
 * @description 选择元素
 * @example
 */
export const selectS = (native: MouseEvent, el: any, callBack?: Function) => {
    let env = Mgr.environment;
    let ret = { add: { sids: [], sts: [], es: [] }, del: { sids: [], sts: [], es: [] } };
    if (!native.ctrlKey && !native.shiftKey) {
        ret = env.select.clearAddS(el);
    }
    else if (native.ctrlKey) {
        if (!env.select.isExist(el)) {
            let add = env.select.addS(el);
            ret.add.sids.push(add.sid);
            ret.add.sts.push(add.st);
            ret.add.es.push(add.e);
        }
        else {
            let del = env.select.cancelS(el);
            ret.del.sids.push(del.sid);
            ret.del.sts.push(del.st);
            ret.del.es.push(del.e);
        }
    }
    else if (native.shiftKey) {
        if (!env.select.lastEle) return;
        let se = env.select.getSelectEs();
        for (let i = 0; i < se.length; i++) {
            if (se[i].parentElement !== env.select.lastEle.parentElement)
                return
        }
        let childEls = env.select.lastEle.parentElement.children;
        let selectArr = [];
        for (let i = 0, start = null; i < childEls.length; i++) {
            if (start === null && (childEls[i] === env.select.lastEle || childEls[i] === el || childEls[i].getAttribute("sid") == el))
                start = i;
            else if (childEls[i] === env.select.lastEle || childEls[i] === el || childEls[i].getAttribute("sid") == el) {
                selectArr.push(childEls[i])
                break
            }
            if (start !== null)
                selectArr.push(childEls[i])
        }
        console.log(selectArr)
        ret = env.select.shiftClearAdd(selectArr);
    }
    env.treeOp.cancelAllTrees();
    env.treeOp.selectTrees(ret.add.sids);
    if (ret.del.sids.length > 0 || ret.add.sids.length > 0) {
        //irForelet.updateAttrs(ret.add.sids[ret.add.sids.length - 1]);
        if (callBack)
            callBack(ret);
    }
    Mgr.notify("selectChange");
    return ret;
}

/**移动元素
 * @param ，olds， selects添加元素， mpos鼠标相对于元素的位置， mePos鼠标停靠的坐标
 */
export const moveWD = (olds, selects, mpos: Pos, mePos: Pos) => {
    let env = Mgr.environment;
    let selectE, left, top, style, undoParam = [], redoParam = [], sid, old;
    for (let i = 0; i < selects.length; i++) {
        selectE = selects[i];
        let clazzName = selectE.getAttribute("w-class").split(" ");
        clazzName = clazzName[clazzName.length - 1];
        old = olds[i];
        sid = parseInt(selectE.getAttribute("sid"));
        style = env.htmlAttr.movePos(old, { x: mePos.x - mpos.x, y: mePos.y - mpos.y })
        redoParam.push({ sid: sid, clazzMap: env.htmlAttr.addClazzStyle(style, clazzName) });
        let map = new Map<string, string>();
        mapCopy(env.htmlAttr.getClazz(clazzName), map);
        undoParam.push({ sid: sid, clazzMap: map });
    }
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyStyles, redo: Urdo.modifyStyles };
    Mgr.environment.urDo.addUndo(unReDo);
    Mgr.notify("clazzChange");
}

/**修改数据
 * @param name:widget名称， param：修改的的数据
 */
export const modifyTplData = (data: Json): void => {
    let undoParam = { name: curOpen, data: OpElem.modifyElemTpldata(curOpen, data) };
    let redoParam = { name: curOpen, data: data };
    let unReDo: Urdo.UnReDo = { undoArgs: undoParam, redoArgs: redoParam, undo: Urdo.modifyTplData, redo: Urdo.modifyTplData };
    Mgr.environment.urDo.addUndo(unReDo);

    Mgr.environment.select.clearS();
    Mgr.notify("nodeChange");
}
/**取到当前编辑的widget名称
 * @param 
 */
export const getCurOpen = (): string => {
    return curOpen;
}


/**保存tplData
 * @param 
 */
export const getTplData = (wName: string): void => {
    let path = wName.replace(/\-/g, "/");
    let cache = getCache(path + ".cfg");
    if (cache) {
        //向服务器发送消息，保存tpl
        return cache
    }
}


/**保存wcss
 * @param 
 */
export const getWcss = (wName: string): string => {
    let path = wName.replace(/\-/g, "/");
    let cache = getCache(path + ".wcss");

    if (wName && cache && cache.value) {
        let wcssStr = ``;
        for (let v of cache.value) {
            wcssStr += `.${v[0]} {\n`;
            if (v[1].map && v[1].map.size) {
                v[1].map.forEach((v, k) => {
                    wcssStr += `    ${k.replace(/[A-Z]/g, function (s1) { return "-" + s1.toLowerCase() })}: ${("" + v).replace(/^\s+/g, "")};\n`;
                })
            }
            wcssStr += `}\n`;
        }
        return wcssStr
    }
}

/**
 * @description 修改clazzId
 * @example
 */
const changeClazz = (syntax: Syntax, sid: number, isClazz: boolean) => {
    if (isClazz && syntax.type === "singlelstring" || syntax.type === "lstring") {
        syntax.value = syntax.value.replace(/^[0-9]+/g, sid);
    }

    if (!syntax.right || syntax.right.length === 0) {
        return;
    }
    for (let i = 0; i < syntax.right.length; i++) {
        if (syntax.type === "attr" && syntax.right[0].value === "w-class" && i > 0) {
            changeClazz(syntax.right[i], (<any>syntax).sid || sid, true);
        } else {
            changeClazz(syntax.right[i], (<any>syntax).sid || sid, isClazz)
        }
    }

}

/**
 * @description 
 * @example
 */
const copyClazz = (s: Syntax) => {
    if (s.type === "attr" && s.right[0].value === "w-class") {
        let p = s.parent.parent;
        Mgr.environment.htmlAttr.copyStyle((<any>p).sid, (<any>p).oldId);
        return;
    }

    if (!s.right || s.right.length === 0) {
        return;
    }

    for (let i = 0; i < s.right.length; i++) {
        copyClazz(s.right[i]);
    }

}