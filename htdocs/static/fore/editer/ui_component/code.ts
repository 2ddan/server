// ============================== 导入
import { Widget, getCache } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import { toStr } from '../util/restore';
import { modifyCode } from "../util/editer"
import * as Mgr from "../mgr/widget_mgr"


let changed = false;
/**
 * @description 导出组件Widget类
 * @example
 */
export class Code extends Widget {
    create() {
        Mgr.register(this);
    }
    keydown(e) {
        //9 keyTab
        if (e.keyCode === 9) {
            let t = e.target,
                start = t.selectionStart,
                end = t.selectionEnd;
            let sstart = t.value.slice(0, start),
                send = t.value.slice(end);

            t.value = sstart + "\t" + send;
            t.selectionStart = t.selectionEnd = start + 1;
            e.preventDefault();
        }
        //83 keyS
        if (e.ctrlKey && e.keyCode === 83) {
            changed = false;
            modifyCode(e.target.value);
            e.preventDefault();
        }
    }
    modifyCode() {
        this.state = toStr(Mgr.environment.syntaxOp.syntax);
        this.paint();
    }
    changeCode() {
        changed = true;
    }
    open() {
        this.state = toStr(Mgr.environment.syntaxOp.syntax);
        this.paint();
    }
    nodeChange() {
        this.state = toStr(Mgr.environment.syntaxOp.syntax);
        this.paint();
    }
    attrChange() {
        this.state = toStr(Mgr.environment.syntaxOp.syntax);
        this.paint();
    }
    clazzChange() {
        this.state = toStr(Mgr.environment.syntaxOp.syntax);
        this.paint();
    }
}
