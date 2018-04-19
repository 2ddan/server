
// ============================== 导入
import { Json } from '../../pi/lang/type';
import { notify } from "../../pi/widget/event";
import { Widget } from "../../pi/widget/widget";
import { muForelet } from "../../editer/forelet/mu_forelet";
import { toStr } from "../util/restore";

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Menu extends Widget {
	constructor(){
		super();
		this.state = {menus: menus, select: null};
	}

	setState(state: Json, oldStates?: Json): void {
		this.state = {menus: forelet.menus, select: forelet.select, pos: forelet.pos};
	}

	open(e, key: string): void{
		let native = e.native;
		forelet.open({x: native.x, y: native.y}, key);
	}

	select(e, key: string): boolean{

		let callBack;
		let children = this.state.select.children;
		for(var i = 0; i < children.length; i ++){
			if(children[i].key === key){
				callBack = children[i].callBack;
			}
		}
		
		if(callBack)
			callBack();
		this.state.select = null;
		this.paint();
		return true;
	}

	cancel(){
		this.state.select = null;
		this.paint();
	}
}

export const forelet = muForelet;

let menus = {children:[]};

