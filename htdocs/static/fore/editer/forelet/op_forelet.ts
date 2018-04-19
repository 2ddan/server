// import { Forelet } from "../../pi/widget/forelet";
// import { getCache, Widget, setCache } from "../../pi/widget/widget";
// import { Syntax } from "../../pi/compile/parser";
// import { parserTpl } from "../../pi/compile/vdom";
// import { toFun } from "../../pi/util/tpl";
// import { gen } from "../../pi/compile/genvdom";
// import { getElementIn } from "../util/html";
// import { init } from "../util/select";
// import { SyntaxOp} from "../util/syntax_op";
// import { Json } from '../../pi/lang/type';
// import { createAttrs, delAttrs, setAttrs, Attrs, restoreToSt, replaceAttrs, fresh } from "../util/html_attr";


// export class OpenWidgetForelet extends Forelet{
//     syntaxTree: Syntax; //widget的语法树
//     showWN: string; //需要显示的widget的名字
//     showWidget: Widget; //当前显示的widget
//     path: string; //widget的路径

//     /**
// 	 * @description 设置要显示的widget名称
// 	 * @example
// 	 */
// 	setShowWN(wName: string) {
//         this.showWN = wName;
//         this.path = wName.replace(/\-/g, "/");
//         let tplStr = getCache( this.path+ ".tpl").str;
// 	    this.syntaxTree = createSyntax(sid, tplStr);
//         fresh(this.syntaxTree);
//         init(this.syntaxTree);
//         setSyntax(this.syntaxTree);
//     }
    
//     /**
//      * @description 更新模板方法
//      * @example
//      */
//     updateTplFunc(){
//         this.updateTpl();
//         this.showWidget.paint();
//         //this.paint({}, false, true);
//     }

//      /**
//      * @description 更新模板方法
//      * @example
//      */
//     updateTpl(){
//         let domStr = gen(this.syntaxTree);
//         let tplFunc = toFun(domStr, this.path + ".tpl");
//         let tpl = getCache(this.path + ".tpl");
//         tpl.value = tplFunc;
//     }

//     /**
//      * @description 更新模板方法
//      * @example
//      */
//     open(){
//         this.paint({}, false, true);
//         return this.widgets[0]
//     }
    
// }

// export const oForelet = new OpenWidgetForelet();