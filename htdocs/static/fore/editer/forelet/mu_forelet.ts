
// ============================== 导入
import { Json } from '../../pi/lang/type';
import { notify } from "../../pi/widget/event";
import { Widget } from "../../pi/widget/widget";
import { toStr } from "../util/restore";
import { Forelet } from "../../pi/widget/forelet";

interface menuNode {
	key: string,
	name?: string,
	shortcut?: string,
	callBack?: Function,
	children?: Array<menuNode>
}



export class MuForelet extends Forelet {
	menus: menuNode = { key: "", children: [] };
	pos: { x: number, y: number };
	select
	/**
	 * 注册菜单
	 * @param path 菜单路径，如："file/keep"
	 * @param callBack 
	 */
	register(path: string, callBack: Function, shortcut: string) {
		if (!path)
			throw "菜单路径不能为空！";
		let paths = path.split("/");
		if (paths.length != 2)
			throw "菜单仅支持两层路径！";

		let children = this.menus["children"];
		for (var j = 0; j < paths.length; j++) {
			let node: menuNode;
			for (var i = 0; i < children.length; i++) {
				if (children[i].key === paths[j]) {
					node = children[i];
					continue;
				}
			}
			if (!node) {
				node = { "key": paths[j], children: [] };
				children.push(node);
			}

			children = node.children;

			if (j === (paths.length - 1))
				node.callBack = callBack;
		}
		if (shortcut)
			(<any>self).shortcut.add(shortcut, callBack, {});
	}

	update() {
		this.paint({}, false, true);
	}

	open(pos: { x: number, y: number }, key: string, tagName?: string) {
		let menus = this.menus;
		let children = menus.children;
		for (var i = 0; i < children.length; i++) {
			let c = children[i];
			if (c.key === key) {
				let arr: Array<menuNode> = []
				for (let v in c.children) {
					if (!hideDeal[tagName] || hideDeal[tagName].indexOf(c.children[v].key) === -1)
						arr.push(c.children[v]);
				}
				this.select = { key: key, children: arr };
			}
		}
		this.pos = pos;
		this.paint({}, false, true);
	}

}

//不现实的操作
const hideDeal = {
	span: ["创建DIV", "添加文本"],
	widget: ["创建DIV", "添加文本"],
	img: ["创建DIV", "添加文本"]
}

export const muForelet = new MuForelet();


//let menus = {file:{name:"文件", value:{keep:{name: "保存", callBack: keep, shortcut: shortCut.keep}}}};

