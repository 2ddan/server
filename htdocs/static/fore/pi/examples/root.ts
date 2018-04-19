/*
 * 范例的根组件
 */

// ============================== 导入
import { list, relative, Widget } from "../widget/widget";
import { Json } from '../lang/type';

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Example extends Widget {

	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		let btn = relative("treebtn$", this.name);
		let i, arr = list(), tree = { arr: [], count: 0, show: { select: true } };
		// 将所有的组件进行排序
		arr.sort((a, b) => { return a.name > b.name ? 1 : -1 });
		// 将指定目录下的组件名加入到节点上
		for (let w of arr) {
			let name = w.name;
			if (w.name === this.name || w.name === btn)
				continue;
			let index = w.name.indexOf(props);
			if (index !== 0)
				continue;
			putNode(btn, tree, w.name.slice(index + props.length).split('-'), w.name);
		}
		for (let n of tree.arr)
			mergeNode(n);
		this.props = { tree: tree, widget: null, show: true };
	}
	/**
	 * @description 打开指定的组件
	 * @example
	 */
	open(widget: string) {
		if (widget === this.props.widget)
			return;
		this.props.widget = widget;
		this.paint();
	}
	showMenu() {
		this.props.show = !this.props.show;
		this.paint();
	}
}

// ============================== 本地
// 寻找节点
const find = (arr, name) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].show.cfg.text === name)
			return i;
	}
	return -1;
}
// 放置节点
const putNode = (btn, tree, names, widget) => {
	for (let i = 0; i < names.length; i++) {
		let s = names[i];
		if (!tree.arr) {
			tree.arr = [];
			tree.show.leaf = false;
		}
		tree.count++;
		let index = find(tree.arr, s);
		if (index < 0) {
			let n = { tag: btn, cmd: widget, show: { cfg: { text: s }, leaf: true, select: false }, name: widget, arr: null, count: 0 };
			tree.arr.push(n);
			tree = n;
		} else
			tree = tree.arr[index];
	}
}
// 合并单个子元素的节点
const mergeNode = (node) => {
	if (!node.arr)
		return;
	if (node.arr.length === 1) {
		let n = node.arr[0];
		n.show.cfg.text = node.show.cfg.text + "-" + n.show.cfg.text;
		node.show = n.show;
		node.arr = n.arr;
		return mergeNode(node);
	}
	for (let n of node.arr)
		mergeNode(n);
}

// ============================== 立即执行

