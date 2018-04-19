import { Syntax } from "../../pi/compile/parser";
import * as Sto from "./syntax_op";
import * as Htmlo from "./html";
import { arrayCopy } from "./util";
import { VNode } from "../../pi/widget/virtual_node";
import { Forelet } from "../../pi/widget/forelet";
import * as Mgr from "../mgr/widget_mgr";

export class Select {
    selectEs: Array<HTMLElement> = [];//选中的html元素
    selectSts: Array<Syntax> = [];
    selectSids: Array<number> = [];
    syntax: Syntax;//当前显示的语法树
    lastEle: HTMLElement

    constructor(syntax, tree) {
    }

    /**
     * 重新查找选中目标
     */
    reSelect = () => {
        let htmlEl, st, sids = this.selectSids
        for (let i = 0; i < sids.length; i++) {
            htmlEl = Htmlo.getElementIn(<HTMLElement>Mgr.environment.widget.tree.link, "sid", sids[i] + "");
            st = Sto.findBySid(sids[i], Mgr.environment.syntaxOp.syntax);
            this.selectEs[i] = htmlEl;
            this.selectSts[i] = st;
        }
        return this.selectEs;
    }

    /**
     * @description 选中元素
     * @param ，el是一个number类型的sid, 或HTMLElement类型的html元素
     */
    addS = (el: any): { sid: number, st: Syntax, e: HTMLElement } => {
        let htmlEl, sid, st
        if (Number.isInteger(el)) {
            sid = el;
            htmlEl = Htmlo.getElementIn(<HTMLElement>Mgr.environment.widget.tree.link, "sid", el + "");
            st = Sto.findBySid(el, Mgr.environment.syntaxOp.syntax);
        } else {
            htmlEl = el;
            sid = parseInt((<HTMLElement>el).getAttribute("sid"));
            st = Sto.findBySid(sid, Mgr.environment.syntaxOp.syntax);
        }
        this.lastEle = htmlEl;
        this.selectSids.push(sid);
        this.selectSts.push(st);
        if (htmlEl)
            this.selectEs.push(htmlEl);
        return { sid: sid, st: st, e: htmlEl };
    }
    /**
     * 添加多个，并不保留
     */
    shiftAdd = (els: Array<HTMLElement>) => {
        let htmlEl, sid, st
        for (let i = 0; i < els.length; i++) {
            htmlEl = els[i];
            sid = parseInt((<HTMLElement>els[i]).getAttribute("sid"));
            st = Sto.findBySid(sid, Mgr.environment.syntaxOp.syntax);

            this.selectSids.push(sid);
            this.selectSts.push(st);
            this.selectEs.push(htmlEl);
        }
    }


    /**
     * @description 更新选择html元素
     * @param 
     */
    updateSelectHtml = () => {
        this.selectEs = [];
        for (let i = 0; i < this.selectSids.length; i++) {
            this.selectEs.push(Htmlo.getElementIn(<HTMLElement>Mgr.environment.widget.tree.link, "sid", this.selectSids[i] + ""))
        }
    }
    /**
     * @description 清空并添加一个
     * @example
     */
    clearAddS = (el: any): { add: { sids: Array<number>, sts: Array<Syntax>, es: Array<HTMLElement> }, del: { sids: Array<number>, sts: Array<Syntax>, es: Array<HTMLElement> } } => {
        let del = { sids: [], sts: [], es: [] };
        arrayCopy(this.selectSids, 0, del.sids, 0, this.selectSids.length);
        arrayCopy(this.selectSts, 0, del.sts, 0, this.selectSts.length);
        arrayCopy(this.selectEs, 0, del.es, 0, this.selectEs.length);
        this.selectSids.length = 0;
        this.selectSts.length = 0;
        this.selectEs.length = 0;
        let add = this.addS(el);
        return { add: { sids: [add.sid], sts: [add.st], es: [add.e] }, del: del };
    }
    /**
     * 清空添加多个
     */
    shiftClearAdd = (els: Array<HTMLElement>): { add: { sids: Array<number>, sts: Array<Syntax>, es: Array<HTMLElement> }, del: { sids: Array<number>, sts: Array<Syntax>, es: Array<HTMLElement> } } => {
        let del = { sids: [], sts: [], es: [] };
        arrayCopy(this.selectSids, 0, del.sids, 0, this.selectSids.length);
        arrayCopy(this.selectSts, 0, del.sts, 0, this.selectSts.length);
        arrayCopy(this.selectEs, 0, del.es, 0, this.selectEs.length);
        this.selectSids.length = 0;
        this.selectSts.length = 0;
        this.selectEs.length = 0;
        this.shiftAdd(els);
        return { add: { sids: this.selectSids, sts: this.selectSts, es: this.selectEs }, del: del };
    }

    /**
     * @description 取消选中
     * @example
     */
    cancelS = (el: any): { sid: number, st: Syntax, e: HTMLElement } => {
        let sid, st, e;
        if (Number.isInteger(el)) {
            sid = el;
        } else {
            sid = parseInt((<HTMLElement>el).getAttribute("sid"));
        }
        //删除sid
        this.reduce(sid, this.selectSids);
        //删除语法树
        for (let i = 0; i < this.selectSts.length; i++) {
            if ((<any>this.selectSts[i]).sid === sid) {
                st = this.selectSts[i];
                this.selectSts[i] = this.selectSts[this.selectEs.length - 1];
                this.selectSts.length--;
            }
        }
        //删除html元素
        let htmlEl = Htmlo.getElementIn(<HTMLElement>Mgr.environment.widget.tree.link, "sid", "" + sid);
        if (htmlEl) {
            this.reduce(htmlEl, this.selectEs);
        }
        return { sid: sid, st: st, e: htmlEl };
    }

    reduce = (el: any, container: Array<any>) => {
        for (let i = 0; i < container.length; i++) {
            if (container[i] === el) {
                container[i] = container[this.selectEs.length - 1];
                container.length--;
            }
        }
    }

    /**
     * @description 元素是否存在
     * @example
     */
    isExist = (el: any): boolean => {
        let sid;
        if (Number.isInteger(el)) {
            sid = el;
        } else {
            sid = parseInt((<HTMLElement>el).getAttribute("sid"));
        }
        for (let i = 0; i < this.selectSids.length; i++) {
            if (sid === this.selectSids[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * @description 清除选中元素
     * @example
     */
    clearS = () => {
        this.selectSids.length = 0;
        this.selectEs.length = 0;
        this.selectSts.length = 0;
    }

    /**
     * @description 选择元素
     * @example
     */
    // export const selectS = (native: MouseEvent, el:any, callBack?: Function): {add:Array<number>, del: Array<number>} => {
    //     let ret = {add: [], del: []};
    //     if(!native.ctrlKey && !native.shiftKey){
    //         arrayCopy(selectSids, 0, ret.del, 0, selectSids.length);
    //         ret.add.push(clearAddS(el));
    //     }else{
    //         if(native.ctrlKey){
    //             if(!isExist(el)){
    //                 ret.add.push(addS(el));
    //             }else{
    //                 ret.del.push(cancelS(el));
    //             }
    //         }else{
    //             //TODO shift
    //         }
    //     }
    //     if(callBack)
    //         callBack(ret);
    //     return 	ret;	
    // }

    /**
     * @description 取出选中id对应的语法树
     * @example
     */
    getSelectSts = (): Array<Syntax> => {
        return this.selectSts;
    }

    /**
     * @description 取出选中id对应的html元素
     * @example
     */
    getSelectEs = (): Array<HTMLElement> => {
        return this.selectEs;
    }

    /**
     * @description 取出选中id
     * @example
     */
    getSelectSids = (): Array<number> => {
        return this.selectSids;
    }


}


export const sctForelet = new Forelet();

