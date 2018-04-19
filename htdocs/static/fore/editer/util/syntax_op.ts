import { Syntax, RuleToken } from "../../pi/compile/parser";
import { parserTpl } from "../../pi/compile/vdom";
import { arrayDel, arrayDelByIndex, arrayInserts, trim } from "./util";

export class SyntaxOp {
    syntax: Syntax;
    maxSid: number;
    map: Map<number, Syntax> = new Map<number, Syntax>();

    constructor(str: string) {
        this.maxSid = 2;
        this.syntax = this.createSyntax(str);
    }
    setStSid(id: number) {
        this.maxSid = id;
    }
    getSt(id: number): Syntax {
        return this.map.get(id);
    };

    /**
 * @description 删除节点（该节点一定有父节点）,target是sid或html,script节点
 * @example
 * @return [Syntax, number, Syntax], 删除的节点，及删除前在父节点上的位置, 删除元素的父元素
 */
    delSts(sids: Array<number>) {
        let syntax, parent, right, delE;
        for (let i = 0; i < sids.length; i++) {
            syntax = findRoot(this.map.get(sids[i]));
            parent = syntax.parent;
            right = parent.right;
            delE = arrayDel(right, syntax);//删除节点
            if (right[delE.index - 1] && right[delE.index - 1].type === "text" && !trim(right[delE.index - 1].value)) {
                arrayDelByIndex(right, delE.index - 1, 1);//删除节点前面的空行
            }
        }
    }

    /**
     * @description 删除节点（该节点一定有父节点）,target是sid或html,script节点
     * @example
     * @return [Syntax, number, Syntax], 删除的节点，及删除前在父节点上的位置, 删除元素的父元素
     */
    delSt(sid: number): { parentSid: number, sid: number, index: number } {
        let syntax, parent, right, delE;
        syntax = findRoot(this.map.get(sid));
        parent = syntax.parent;
        right = parent.right;
        delE = arrayDel(right, syntax);//删除节点
        if (right[delE.index - 1] && right[delE.index - 1].type === "text" && !trim(right[delE.index - 1].value)) {
            arrayDelByIndex(right, delE.index - 1, 1);//删除节点前面的空行
        }
        return;
    }

    /**
    * @description 添加语法树
    * @param targetRight[html,script节点]
    * @return [[添加的语法树，添加的位置],[].....]
    */
    addSts(param: Array<{ parentSid: number, childSid: number, index?: number }>) {
        let parentBody, child, index, elem;
        for (let i = 0; i < param.length; i++) {
            elem = param[i];
            parentBody = findBody(this.map.get(elem.parentSid));
            child = findRoot(this.map.get(elem.childSid));
            arrayInserts(parentBody.right, [child], index, (el) => { if (el.type === "text") { return true; } });
            child.parent = parentBody;
        }
    }

    /**
    * @description 添加语法树
    * @param targetRight[html,script节点]
    * @return [[添加的语法树，添加的位置],[].....]
    */
    addSt = (parentSid: number, sid: number, index?: number) => {
        let parentBody, child;
        parentBody = findBody(this.map.get(parentSid));
        child = findRoot(this.map.get(sid));
        arrayInserts(parentBody.right, [child], index, (el) => { if (el.type === "text") { return true; } });
        child.parent = parentBody;
    }

    //将多个元素的父节点修改成同一节点
    unifyParent = (param: { parentSid: number, childSids: Array<number>, index?: number }) => {
        let parentSid = param.parentSid, childSids = param.childSids, index = param.index;
        let parent = this.map.get(parentSid), ret = [];
        this.delSts(childSids);
        for (let i = 0; i < childSids.length; i++) {
            ret.push({ parentSid: parentSid, childSid: childSids[i], index: index++ });
        }
        this.addSts(ret);
    }

    //将多个元素的父节点修改成不同节点
    diffuseParent(param: Array<{ parentSid: number, childSid: number, index: number }>) {
        let childSids = [];
        for (let i = 0; i < param.length; i++) {
            childSids.push(param[i].childSid);
        }
        this.delSts(childSids);
        this.addSts(param);
    }

    //修改父节点
    modifyParent(parentSid: number, childSid: number, index?: number) {
        this.delSt(childSid);
        this.addSt(parentSid, childSid, index);
    }

    /**
     * @description 修改语法树（只能修改有id的节点）
     * @example
     */
    modifySt = (sid: number, newS: Syntax) => {
        let oldSt = findBySid(sid, this.syntax);
        if (!oldSt) {
            throw "节点不存在，无法修改！sid:" + sid;
        }
        let newSt = findByType(oldSt.type, newS);

        if (oldSt.type === "tag") {
            oldSt.right[1] = newSt.right[1];
        } else if (oldSt.type === "imgtag" || oldSt.type === "inputtag" || oldSt.type === "metatag") {
            oldSt.right[0] = newSt.right[0];
        } else if (oldSt.type === "if" || oldSt.type === "elseif" || oldSt.type === "while") {
            oldSt.right[0] = newSt.right[0];
        } else if (oldSt.type === "for") {
            oldSt.right[0] = newSt.right[0];
            oldSt.right[1] = newSt.right[1];
            oldSt.right[2] = newSt.right[2];
        }
    }
    /**
     * @description 修改语法树（只能修改有id的节点）
     * @example
     */
    modifySyBody = (sid: number, right: Array<Syntax>) => {
        let oldSt = findBySid(sid, this.syntax);
        if (!oldSt) {
            throw "节点不存在，无法修改！sid:" + sid;
        }

        let bodySy = findByType("body", oldSt);
        bodySy.right = right;
    }

    /**
 * @description 生成语法树
 * @example
 */
    createSyntax(tplStr: string): Syntax {
        let syntax = parserTpl(tplStr);
        if (syntax.right.length !== 1 || syntax.right[0].type !== "text") {
            this.setSid(syntax);
            this.setScriptSid(syntax);
            this.setParent(syntax, null);
        }
        return syntax;
    }

    /**
     * @description 为语法树上的tag设置sid
     * @example
     */
    setSid(syntax: Syntax) {
        if (syntax.type === "attrs") {
            let temp, hasId = false;
            for (let i = 0; i < syntax.right.length; i++) {
                temp = syntax.right[i].right;
                if (temp[0].value === "maxId") {
                    this.maxSid = parseInt(temp[1].right[0].value);
                } else if (temp[0].value === "w-sid") {
                    (<any>syntax.parent).sid = parseInt(temp[1].right[0].value);
                    this.maxSid = Math.max(this.maxSid, (<any>syntax.parent).sid + 1);
                    this.map.set((<any>syntax.parent).sid, <any>syntax.parent);
                    hasId = true
                }

            }
            if (!hasId) {
                ((<any>syntax.parent).sid = this.maxSid++);
                this.map.set((<any>syntax.parent).sid, <any>syntax.parent);
            } 
            return;
        }
        else if (syntax.type === "for" || syntax.type === "while" || syntax.type === "if") {
            (<any>syntax).sid = this.maxSid++;
            this.map.set((<any>syntax).sid, syntax);
        }

        
        let right = syntax.right;
        if (!right)
            return this.maxSid;

        for (var i = 0; i < right.length; i++) {
            this.setSid(right[i]);
        }
        return this.maxSid;
    }

    /**
     * @description 为每个语法树节点设置parent
     * @example
     */
    setParent(syntax: Syntax, parent: any) {
        if (typeof parent === "number") {
            let tag = this.map.get(parent);
            parent = findByType("body", tag);
            // if (parent && parent.right) {
            //     parent.right = parent.right || [];
            //     parent.right.push(syntax)
            // }
        }
        syntax.parent = parent;
        let right = syntax.right;
        if (!right)
            return;
        for (var i = 0; i < right.length; i++) {
            if (right[i])
                this.setParent(right[i], syntax);
        }
    }

    /**
     * @description 为语法树上的for, wile, if, else, elseif设置id
     * @example
     */
    setScriptSid(syntax: Syntax) {
        if (syntax.type === "for" || syntax.type === "if" || syntax.type === "else" || syntax.type === "elseif") {
            (<any>syntax).sid = this.maxSid++;
            this.map.set((<any>syntax).sid, syntax);
        }

        let right = syntax.right;
        if (!right)
            return;

        for (var i = 0; i < right.length; i++) {
            this.setScriptSid(right[i]);
        }
    }

}

const createEmpty = (): Syntax => {
    let syntax = new Syntax();
    syntax.token = new RuleToken();
    syntax.token.type = syntax.type = "text";
    syntax.token.value = `\n  `;
    syntax.value = "";
    return syntax;
}

export const copySt = (old: Syntax): Syntax => {
    if (old.type === "attr" && old.right[0].value === "w-sid") {
        return;
    }
    let newst = new Syntax();
    (<any>newst).oldId = (<any>old).sid;
    newst.type = old.type;
    newst.value = old.value;
    newst.left = old.left ? copySt(old.left) : null
    if (old.token) {
        newst.token = new RuleToken();
        newst.token.type = old.token.type;
        newst.token.value = old.token.value;
    }

    if (old.right) {
        newst.right = [];
        let c = 0;
        for (let i = 0; i < old.right.length; i++) {
            let s = copySt(old.right[i]);
            if (s) {
                newst.right[i + c] = s;
            } else {
                c++;
            }
        }

    }
    return newst;
};


/**
 * @description 根据id找语法树上的节点
 * @example
 */
export const findBySid = (sid: number, syntax: Syntax): Syntax => {
    let stId = (<any>syntax).sid;
    if (stId === sid)
        return syntax;

    let right = syntax.right;
    if (!right)
        return;

    for (var i = 0; i < right.length; i++) {
        let st = findBySid(sid, right[i]);
        if (st)
            return st;
    }
}

/**
 * @description 根据类型找节点（往下循环遍历语法树）
 * @example
 */
export const findByType = (type: string, syntax: Syntax): Syntax => {
    if (syntax.type === type)
        return syntax;

    let right = syntax.right;
    if (!right)
        return;

    for (var i = 0; i < right.length; i++) {
        let st = findByType(type, right[i]);
        if (st)
            return st;
    }
}

/**
 * @description 找语法树节点的body
 * @example
 */
export const findBody = (syntax: Syntax): Syntax => {
    let right = syntax.right;
    if (!right)
        throw "right不存在";

    for (var i = right.length - 1; i >= 0; i--) {
        if (right[i].type === "body") {
            return right[i];
        }
    }

    throw "找不到body";
}

/**
 * @description 往上找节点的根（如果是tag，找对应的html节点， 如果是if，for..，找对应的script节点）
 * @example
 */
export const findRoot = (syntax: Syntax): Syntax => {
    if (syntax.type === "html" || syntax.type === "script") {
        return syntax;
    }
    let parent = syntax.parent;
    if (parent === null && parent === undefined) {
        throw "语法树上找不到对应html元素或脚本！";
    }
    return findRoot(parent);
}

/**
 * @description 判断一个节点是否可以移动
 * @example
 */
const isDragable = (sid: number, st: Syntax) => {
    let attrsR = findByType("attrs", findBySid(sid, st)).right;
    if (!attrsR)
        return true;

    for (let i = 0; i < attrsR.length; i++) {
        if (attrsR[i].type === "script")
            return false;
        if (attrsR[i].type === "attr") {
            if (attrsR[i].right[0].type === "style") {
                let vt = attrsR[i].right[0].type;
                if (vt === "script")
                    return false;
                if (vt === "attrscript" || vt === "singleattrscript") {
                    let scriptR = attrsR[i].right[1].right;
                    for (let j = 0; j < scriptR.length; j++) {
                        if (scriptR[j].type === "script" && scriptR[j - 1].type === "lstring") {
                            let at = parseLast(scriptR[j - 1].value)
                            if (at === "position" || at === "left" || at === "right" || at === "top" || at === "bottom" || at.indexOf("margin")) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }

    return true;
}

//解析style属性字符串中最后一个属性
const parseLast = (str: string) => {
    let l, ls; //倒数第一个冒号和倒数第1个分号的位置（没有分号，第二个位置为0）
    for (let i = str.length; i > 0; i--) {
        if (str[i] === ":")
            l = i;
    }

    if (l === undefined) {
        return "";
    }

    for (let i = l; i > 0; i--) {
        if (str[i] === ";")
            ls = i;
    }

    if (l === undefined) {
        ls === 0;
    }

    return str.slice(ls + 1, l);
}