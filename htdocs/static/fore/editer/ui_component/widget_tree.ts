
// ============================== 导入
import { list, relative, Widget } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import * as WidgetMgr from '../mgr/widget_mgr';
import { userCfg } from '../user_cfg';

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class WidgetTree extends Widget {

	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		let arr = list(), tree = { arr: [], count: 0, show: { open: true } };
		console.log(arr)
		// arr.sort((a, b) => { return a.name > b.name ? 1 : -1 });
		// 将指定目录下的组件名加入到节点上
		for (let w of arr) {
			for (let path of userCfg.widgetPath) {
				if (w.name.indexOf(path) === 0) {
					let subStr = w.name.replace(path, "");
					putNode(tree, [path.substring(0, path.length - 1)].concat(subStr.split('-')), w.name);
				}
			}
		}
		sortTree(tree);
		// for (let n of tree.arr)
		//mergeNode(n);
		this.props = { tree: tree, widget: null, show: true, focus: "" };

	}
	/**
	 * @description 显示指定的组件
	 * @example
	 */
	select(e) {
		let data = e.data;
		this.props.showWidget = data.show.path;
		this.paint();
		//选中
		if (e.native.which === 1)
			selectWidget(e.w);
	}
	searchWidget(e) {
		if (w && e.target.value) {
			let reg = new RegExp(e.target.value.replace(/\*/g, "."), "i");
			this.props.searchTree = { arr: getSearchArr(w.props || this.props.tree, reg), show: { open: true } };
			this.props.showWidget = "search";
			this.paint();
		}
		else if (!e.target.value) {
			this.props.searchTree = null;
			this.props.showWidget = null;
			selectWidget(null);
			this.paint();
		}
	}
}

// ============================== 本地
// 寻找节点
const find = (arr, name) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].show.value === name)
			return i;
	}
	return -1;
}
// 放置节点
const putNode = (tree, names, widget) => {
	let path = "";
	for (let i = 0; i < names.length; i++) {
		let s = names[i];
		path += s;
		if (!tree.arr) {
			tree.arr = [];
			tree.show.leaf = false;
		}

		let index = find(tree.arr, s);
		if (index === -1) {
			let n
			if (i < names.length - 1) {
				n = { show: { value: s, leaf: true, path: path }, arr: null, count: 0 };
			}
			else {
				n = { show: { value: s, leaf: true, path: path }, name: widget, arr: null, count: 0 };
				tree.count++;
			}
			tree.arr.push(n);
			tree = n;
		}
		else
			tree = tree.arr[index];
		path += "-";
	}
}
// 合并单个子元素的节点
const mergeNode = (node) => {
	if (!node.arr)
		return;
	if (node.arr.length === 1) {
		let n = node.arr[0];
		n.show.value = node.show.value + "-" + n.show.value;
		node.show = n.show;
		node.arr = n.arr;
		return mergeNode(node);
	}
	for (let n of node.arr)
		mergeNode(n);
}

let w = null//保存上次选中的以便取消选中
/**
 * 选中widget树
 * @param widget 选中的widget
 */
const selectWidget = (widget) => {
	if (w) {
		w.props.show.select = false;
		w.paint();
	}
	w = widget;
	if (w) {
		w.props.show.open = !w.props.show.open;
		w.props.show.select = true;
		w.paint();
	}
}
/**
 * 
 * @param tree 原prop-tree
 * @param reg 过滤正则
 */
const getSearchArr = (tree, reg) => {
	let arr = [];
	if (tree.arr) {
		for (let v of tree.arr) {
			arr = arr.concat(getSearchArr(v, reg));
		}
	}
	else if (reg.test(tree.show.path))
		arr.push({ tag: tree.tag, show: tree.show, name: tree.name })
	return arr;

}
const sortTree = (tree) => {
	if (tree.arr && tree.arr.length) {
		tree.arr.sort((a, b) => {
			if (a.arr && !b.arr) return -1;
			if (!a.arr && b.arr) return 1;
			return a.name - b.name;
		})
		for (let o of tree.arr) {
			sortTree(o);
		}
	}
}
// ============================== 立即执行

