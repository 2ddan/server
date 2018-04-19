/**
* undo,redo调用方法
*/
import { Syntax } from "../../pi/compile/parser";
import * as Select from "../util/select";
import * as HtmlAttr from "../util/html_attr";
import * as Sop from "../util/syntax_op";
import * as Tree from "../util/tree";
import * as OpElem from "./opelem";
import { Json } from "../../pi/lang/type";
import { userCfg } from "../user_cfg";
import * as Mgr from "../mgr/widget_mgr";

export interface UnReDo {
    undo: Function,
    undoArgs: any,
    redo: Function,
    redoArgs: any
}

export class UrDo {
    undoStack: Array<UnReDo> = [];
    redoStack: Array<UnReDo> = [];
    //添加上一步 下一步
    addUndo(operation: UnReDo) {
        this.redoStack = [];
        this.undoStack.push(operation);
        if (this.undoStack.length > 100) {
            this.undoStack = this.undoStack.slice(20);
        }
        Mgr.cfg.needSave = true;
    }

    //返回上一步
    undo() {
        let op;
        if (this.undoStack.length === 0)
            return;

        op = this.undoStack.pop();
        op.undo(op.undoArgs);
        this.redoStack.push(op);
        Mgr.cfg.needSave = true;
    }

    //前进到下一步
    redo() {
        let op;
        if (this.redoStack.length === 0)
            return;

        op = this.redoStack.pop();
        op.redo(op.redoArgs);
        this.undoStack.push(op);
        Mgr.cfg.needSave = true;
    }
}
/**
* 添加多个元素
* @param param:[{st:Syntax, index:number}] -- 添加元素的语法树
*/
export const addElems = (param: Array<{ index: number, childSid: number, parentSid: number, clazzMap?: Map<string, Map<string, string>> }>) => {
    let temp, clazz, env = Mgr.environment;
    env.select.clearS();
    env.treeOp.cancelAllTrees();
    for (let i = 0; i < param.length; i++) {
        temp = param[i];
        OpElem.addElem(temp.parentSid, temp.childSid, temp.clazzMap, temp.index);
        env.select.addS(temp.childSid);
        env.treeOp.selectTrees([temp.childSid]);
    }

    Mgr.notify("nodeChange");
}

/**
 * 删除多个元素
 */
export const delElems = (param: Array<Array<number>>) => {
    for (let i = 0; i < param.length; i++) {
        OpElem.delElem(param[i]);
    }
    Mgr.notify("nodeChange");
}

/**
 * 修改多个元素
 * @param param: [{sid:父节点id, attrs:修改后的属性}]
 */
export const modifyAttrs = (param: Array<{ sid: number, attrs: HtmlAttr.Attrs }>) => {
    let temp;
    for (let i = 0; i < param.length; i++) {
        temp = param[i];
        OpElem.modifyElemAttrs(temp.sid, temp.attrs);
    }
    Mgr.notify("attrChange");
}

/**
 * 修改多个元素
 * @param param: [{sid:父节点id, attrs:修改后的属性}]
 */
export const modifyParents = (param: Array<{ sid: number, parentSid: number, index?: number, style?: Map<string, string> }>) => {
    let temp;
    for (let i = 0; i < param.length; i++) {
        temp = param[i];
        OpElem.modifyParent(temp.parentSid, temp.sid, temp.index, temp.style);
    }
    Mgr.notify("nodeChange");
}

/**
 * 修改多个元素的clazz_style
 * @param param: [{sid:父节点id, clazzMap: clazz样式}]
 */
export const modifyStyles = (param: Array<{ clazzMap?: Map<string, string>, clazzName: string, attrs?: HtmlAttr.Attrs }>) => {
    let temp, ev = Mgr.environment;
    for (let i = 0; i < param.length; i++) {
        temp = param[i];
        if (temp.attrs) {
            let sid = +temp.clazzName.split("-")[0];
            OpElem.modifyElemAttrs(sid, temp.attrs);
            if (temp.clazzMap) {
                ev.htmlAttr.addClazzStyle(temp.clazzName, temp.clazzMap)
            }
        } else {
            if (temp.clazzMap) {
                ev.htmlAttr.modifyClazz(temp.clazzMap, temp.clazzName)
            }
        }
        if (!temp.clazzMap) {
            ev.htmlAttr.delClazz(temp.clazzName)
        }
    }
    Mgr.notify("clazzChange");
}

/**
 * 修改一个元素的body内容(内容仅限文字和传给widget的json数据)
 */
export const modifyCon = (param: { sid: number, right: Syntax[] }) => {
    OpElem.modifyElemCon(param.sid, param.right);
    Mgr.notify("attrChange");
}

export const modifyCode = (codeStr: string) => {
    Mgr.environment.syntaxOp.setStSid(2);
    OpElem.setCode(codeStr);
    Mgr.notify("codeChange");
}

export const modifyTplData = (param: { name: string, data: Json }) => {
    OpElem.modifyElemTpldata(param.name, param.data);
    Mgr.notify("attrChange");
}