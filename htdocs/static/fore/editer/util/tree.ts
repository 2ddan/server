import { Syntax } from "../../pi/compile/parser";
import * as Util from "./util";

export interface Tree {
    arr: Array<Tree>;
    count: number;
    show: {
        value?: any,
        leaf?: boolean,
        select?: boolean,
        open: boolean
    };
    isBox: boolean,
    sid?: number,
    link?: any
}

export class TreeOp {
    tree: Tree;
    treeSids: Array<number> = [];
    map: Map<number, Tree> = new Map<number, Tree>();
    parentMap: Map<number, Tree> = new Map<number, Tree>();

    constructor(st: Syntax) {
        this.tree = this.createTree(st);
    }
    //选中一个节点
    selectTrees = (sids: Array<number>) => {

        let tree, parent;
        let setParentOpen = (t) => {
            let parent = this.parentMap.get(t.sid);
            t.show.open = true;
            if (parent) {
                setParentOpen(parent);
            }
        }

        for (let k of sids) {
            if (this.treeSids.indexOf(k) === -1) this.treeSids.push(k)
        }
        for (let i = 0; i < this.treeSids.length; i++) {
            tree = this.map.get(this.treeSids[i]);
            if (!tree)
                continue;
            tree.show.select = true;
            parent = this.parentMap.get(tree.sid);
            setParentOpen(parent);
        }

    }
    //取消选中节点
    cancelSTrees = (sids: Array<number>) => {
        let tree;

        for (let i = 0; i < sids.length; i++) {
            let index = this.treeSids.indexOf(sids[i]);
            if (index !== -1)
                this.treeSids.splice(index, 1);
            tree = this.map.get(sids[i]);
            if (tree)
                tree.show.select = false;
        }
    }
    //取消所有选中节点
    cancelAllTrees = () => {
        let tree;
        for (let i = 0; i < this.treeSids.length; i++) {
            tree = this.map.get(this.treeSids[i]);
            if (tree)
                tree.show.select = false;
        }
        this.treeSids = [];
    }

    //根据语法树创建一个可显示的树
    createTree = (st: Syntax, parentId?: number): Tree => {
        let tree: Tree;
        if (parentId) {
            tree = this.map.get(parentId)
        } else {
            tree = { arr: [], count: 0, show: { open: true }, isBox: true };
        }
        putNode(tree, st, this.map, this.parentMap);
        return tree;
    }

    setTree = (t: Tree) => {
        this.tree = t;
    }

    //添加子节点
    addTrees = (param: Array<{ index: number, childSid: number, parentSid: number }>) => {
        let parent, child, elem, index;
        for (let i = 0; i < param.length; i++) {
            elem = param[i];
            parent = this.map.get(elem.parentSid);
            child = this.map.get(elem.childSid);
            index = elem.index;
            Util.arrayInserts(parent.arr, [child], index);
            parent.show.leaf = false;
        }
    }

    //添加子节点
    add = (parentSid: number, childSid: number, index?: number) => {
        let parent, child;
        parent = this.map.get(parentSid);
        child = this.map.get(childSid);
        Util.arrayInserts(parent.arr, [child], index);
        parent.show.leaf = false;
    }

    //删除节点
    delTrees = (sids: Array<number>): Array<{ index: number, childSid: number, parentSid: number }> => {
        let trees = [];
        let parent, child, ret;
        for (let i = 0; i < sids.length; i++) {
            parent = this.parentMap.get(sids[i]);
            child = this.map.get(sids[i]);
            ret = Util.arrayDel(parent.arr, child);
            trees.push({ index: ret.index, childSid: ret.sid, parentSid: parent.sid });
        }
        if (parent.arr.length == 0) {
            parent.show.leaf = true;
        }
        return trees;
    }

    //删除节点
    delTree = (sid: number): { index: number, childSid: number, parentSid: number } => {
        let trees = [];
        let parent, child, ret;
        parent = this.parentMap.get(sid);
        child = this.map.get(sid);
        ret = Util.arrayDel(parent.arr, child);
        if (parent.arr.length == 0) {
            parent.show.leaf = true;
        }
        return { index: ret.index, childSid: sid, parentSid: parent.sid };
    }

    //将多个元素的父节点修改成同一节点
    unifyParent = (param: { parentSid: number, childSids: Array<number>, index?: number }): Array<{ parentSid: number, childSid: number, index: number }> => {
        let parentSid = param.parentSid, childSids = param.childSids, index = param.index;
        let parent = this.map.get(parentSid);
        let oldParent: Tree, sid, child, olds = [], delE, childs = [];
        for (let i = 0; i < childSids.length; i++) {
            sid = childSids[i];
            oldParent = this.parentMap.get(sid);
            child = this.map.get(sid);
            delE = Util.arrayDel(oldParent.arr, child);
            olds.push({ parentSid: oldParent.sid, childSid: sid, index: delE.index });
            childs.push(child);
            this.parentMap.set(sid, parent);
        }
        Util.arrayInserts(parent.arr, childs, index);
        if (param.childSids.length > 0) {
            parent.show.leaf = false;
            if (!oldParent.arr || oldParent.arr.length === 0)
                oldParent.show.leaf = true;
        }
        return olds;
    }

    //将多个元素的父节点修改成不同节点
    diffuseParent = (param: Array<{ parentSid: number, childSid: number, index: number }>) => {
        let parent, child, index, elem, oldParent;
        let sid, olds = [], delE, childs = [];
        for (let i = 0; i < param.length; i++) {
            elem = param[i];
            oldParent = this.parentMap.get(elem.childSid);
            parent = this.map.get(elem.parentSid);
            child = this.map.get(elem.childSid);
            index = elem.index;
            Util.arrayInserts(parent.arr, [child], index);
            Util.arrayDel(oldParent.arr, child);
            this.parentMap.set(elem.childSid, parent);
            parent.show.leaf = false;
            if (!oldParent.arr || oldParent.arr.length === 0)
                oldParent.show.leaf = true;
        };
    }

    //将多个元素的父节点修改成不同节点d
    modifyParent = (parentSid: number, sid: number, index: number): { parentSid: number, sid: number, index: number } => {
        let parent, child, oldParent;
        let olds = [], delE, childs = [];
        oldParent = this.parentMap.get(sid);
        parent = this.map.get(parentSid);
        child = this.map.get(sid);

        let oldIndex = this.getOldIndex(sid);

        oldParent.arr.splice(oldIndex, 1);
        parent.arr.splice(index, 0, child);

        this.parentMap.set(sid, parent);
        parent.show.leaf = false;
        if (!oldParent.arr || oldParent.arr.length === 0)
            oldParent.show.leaf = true;
        return { parentSid: oldParent.sid, sid: sid, index: oldIndex }
    }
    //获取sid在父级的index
    getOldIndex = (sid) => {
        let oldParent = this.parentMap.get(sid);
        for (let i = 0; i < oldParent.arr.length; i++) {
            if (oldParent.arr[i].sid === sid) {
                return i;
            }
        }
    }
}

//是否是可显示节点
const isShow = (st: Syntax) => {
    if (isHtmlNode(st))
        return true;
    if (isScriptNode(st))
        return true;
}

//是否是脚本节点
const isScriptNode = (st: Syntax) => {
    if (st.type === "if" || st.type === "else" || st.type === "for" || st.type === "elseif")
        return true;
}

//是否是html元素
const isHtmlNode = (st: Syntax) => {
    if (st.type === "tag" || st.type === "imgtag" || st.type === "inputtag" || st.type === "matatag")
        return true;
}

let singleTagReg = /(imgtag)|(inputtag)|(metatag)/
let syTag = /(if)|(for)|(while)|(elseif)|(else)/
//放置节点
const putNode = (tree: Tree, st: Syntax, map: Map<number, Tree>, parentMap: Map<number, Tree>) => {
    if (isShow(st)) {
        tree.show.leaf = false;
        let text = st.type;
        if (singleTagReg.test(text)) {
            text = text.replace("tag", "");
        }
        else if (isHtmlNode(st)) {
            text = st.right[0].value;
        }
        //标记div，可以拖拽进入
        let isBox = text === "div";
        let t;
        if (syTag.test(st.type)) {
            t = st.type
        }
        else if (singleTagReg.test(st.type)) {
            t = getTagShowName(st.right[0].right)
        }
        else {
            t = getTagShowName(st.right[1].right)
        }
        if (t)
            text = t;
        let child: Tree = { arr: [], count: 0, show: { value: text, open: false, leaf: true }, isBox: isBox };
        child.sid = child.link = (<any>st).sid;
        map.set(child.sid, child);
        parentMap.set(child.sid, tree);
        tree.arr.push(child);
        tree = child;
    }

    let right = st.right;
    if (right) {
        for (var i = 0; i < right.length; i++) {
            putNode(tree, right[i], map, parentMap);
        }
    }
}

const getTagShowName = (attrs: Array<Syntax>): string => {
    let wTag;
    for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].right[0].value === "editer_tree_show")
            return attrs[i].right[1].right[0].value;
        else if (!wTag && attrs[i].right[0].value === "w-tag")
            wTag = attrs[i].right[1].right[0].value;
    }
    return wTag;
}