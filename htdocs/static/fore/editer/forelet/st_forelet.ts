
// // ============================== 导入
// import { Widget } from "../../pi/widget/widget";
// import { Forelet } from "../../pi/widget/forelet";
// import { Json } from '../../pi/lang/type';
// import { Syntax } from "../../pi/compile/parser";
// import { toStr } from "../util/restore";
// import { parserTpl } from "../../pi/compile/vdom";
// import { getAttrs, Attrs } from "../util/html_attr";

// /**
//  * @description inspector面板的forelet
//  * @example
//  */
// class InspectorFt extends Forelet {
// 	st: Syntax
// 	curSid: number
// 	attrs: Attrs
// 	updateAttrs(sid) {
// 		this.attrs = getAttrs(sid);
// 		this.curSid = sid;
// 		this.paint({}, false, true);
// 	}
// 	update() {
// 		this.attrs = getAttrs(this.curSid);
// 		this.paint({}, false, true);
// 	}
// 	clean() {
// 		this.attrs = null;
// 		this.curSid = null;
// 		this.st = null;
// 		this.paint({}, false, true);
// 	}
// }


// export const irForelet = new InspectorFt();









