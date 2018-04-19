
// // ============================== 导入
// import { Forelet } from "../../pi/widget/forelet";
// import { Json } from '../../pi/lang/type';
// import { Syntax } from "../../pi/compile/parser";
// import { toStr } from "../util/restore";
// import { parserTpl } from "../../pi/compile/vdom";
// import { init } from "../util/select";
// import { Tree, createTree, setTree } from "../util/tree";
// import { getCache, Widget, setCache } from "../../pi/widget/widget";
// import { createAttrs, delAttrs, setAttrs, Attrs, restoreToSt, replaceAttrs, fresh, getAttrs } from "../util/html_attr";
// import { gen } from "../../pi/compile/genvdom";
// import { createSyntax, sid, setSyntax} from "../util/syntax_op";
// import { toFun } from "../../pi/util/tpl";
// import { getSelectEs } from "../util/select";

// /***************************************属性详情**************************************************** */
// /**
//  * @description inspector面板的forelet
//  * @example
//  */
// class InspectorFt extends Forelet {
// 	st: Syntax
// 	attrs:Attrs
// 	updateAttrs(sid){
//         this.attrs = getAttrs(sid);
// 		this.paint({}, false, true);
// 	}	
// }


// export const irForelet = new InspectorFt();
// /***************************************属性详情end**************************************************** */


// /***************************************dom树**************************************************** */
// /**
//  * @description HtmlTree面板的forelet
//  * @example
//  */
// class HtmlTreeForelet extends Forelet {
// 	tree: Tree
// 	create(st: Syntax){
//         this.tree = createTree(st);
// 		setTree(this.tree);
// 		this.paint({}, true, true);
// 	}

// 	update(){
// 		this.paint({}, true, true);
// 	}	
// }


// export const htForelet = new HtmlTreeForelet();

// /***************************************dom树end**************************************************** */


// /***************************************菜单**************************************************** */

// interface menuNode{
// 	key: string,
// 	name?: string,
// 	shortcut?: string,
// 	callBack?: Function,
// 	children?:Array<menuNode>
// }



// export class MuForelet extends Forelet{
// 	menus: menuNode = {key: "", children: []};
// 	pos:{x: number, y: number};
// 	select
// 	/**
// 	 * 注册菜单
// 	 * @param path 菜单路径，如："file/keep"
// 	 * @param callBack 
// 	 */
// 	register(path: string, callBack: Function, shortcut: string) {
// 		if(!path)
// 			throw "菜单路径不能为空！";
// 		let paths = path.split("/");
// 		if(paths.length != 2)
// 			throw "菜单仅支持两层路径！";

// 		let children = this.menus["children"];
// 		for(var j = 0; j < paths.length; j++){
// 			let node: menuNode;
// 			for(var i = 0; i < children.length; i++){
// 				if(children[i].key === paths[j]){
// 					node = children[i];
// 					continue;
// 				}
// 			}
// 			if(!node){
// 				node = {"key": paths[j], children: []};
// 				children.push(node);
// 			}
			
// 			children = node.children;

// 			if(j === (paths.length - 1))
// 				node.callBack = callBack;
// 		}
// 		if(shortcut)
// 			(<any>self).shortcut.add(shortcut, callBack, {});
// 	}

// 	update(){
// 		this.paint({}, false, true);
// 	}

// 	open(pos: {x: number, y: number}, key:string){
// 		let menus = this.menus;
// 		let children = menus.children;
// 		for(var i = 0; i < children.length; i ++){
// 			if(children[i].key === key){
// 				this.select = children[i];
// 			}
// 		}
// 		this.pos = pos;
// 		this.paint({}, false, true);
// 	}
    
// }

// export const muForelet = new MuForelet();

// /***************************************菜单end**************************************************** */

// /***************************************操作面板**************************************************** */

// export class OpenWidgetForelet extends Forelet{
//     syntaxTree: Syntax; //widget的语法树
//     showWN: string; //需要显示的widget的名字
//     showWidget: Widget; //当前显示的widget
//     path: string; //widget的路径

//     /**
// 	 * @description 设置要显示的widget名称
// 	 * @example
// 	 */
// 	setShowWN(wName: string): void {
// 		if(wName === this.showWN)
//             return;
        
//         this.showWN = wName;
//         this.path = wName.replace(/\-/g, "/");
//         let tplStr = getCache( this.path+ ".tpl").str;
// 	    this.syntaxTree = createSyntax(sid, tplStr);
//         fresh(this.syntaxTree);
//         init(this.syntaxTree);
//         setSyntax(this.syntaxTree);
// 	}
//     /**
//      * @description 更新模板方法
//      * @example
//      */
//     updateTplFunc(){
//         let domStr = gen(this.syntaxTree);
//         let tplFunc = toFun(domStr, this.path + ".tpl");
//         let tpl = getCache(this.path + ".tpl");
//         tpl.func = tplFunc;
//         this.paint({}, false, true);
//     }
    
// }

// /***************************************操作面板end**************************************************** */


// /***************************************选择面板**************************************************** */
// /**
//  * @description inspector面板的forelet
//  * @example
//  */
// class SelectFt extends Forelet {
//     selects = [];
// 	update(){
//         this.selects = getSelectEs();
// 		this.paint({}, false, true);
// 	}	
// }
// export const sctForelet = new SelectFt();
// /***************************************选择面板end**************************************************** */









