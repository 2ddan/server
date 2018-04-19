/*
 * 输入框，要求props为{sign:string|number, text:string, id:string|number}, 注意text要转义引号
 */

// ============================== 导入

import { Widget } from "../../../widget/widget";
import { Heap } from "../../../util/heap"

// ============================== 导出

export class Demo extends Widget {

	props = [];

	test() {

		if (this.props.length > 1) return;

		let count = 300;

		let interval = setInterval(() => {

			if (--count === 0) {
				clearInterval(interval)
			}

			let arr = [];

			let num = Math.floor(1000 * Math.random());
			for (let i = 0; i < num; ++i) {
				arr.push(Math.floor(100 * Math.random()));
			}

			let heap = new Heap<number>((a, b) => a - b);
			for (let i = 0; i < arr.length; ++i) {
				heap.insert(arr[i]);
			}

			let result = [];
			while (!heap.empty()) {
				result.push(heap.pop())
			}

			let arr1 = arr.slice(0)
			arr1.sort((a, b) => a - b);

			let b = true;
			for (let i = 0; i < arr1.length; ++i) {
				if (arr1[i] !== result[i]) {
					b = false;
					alert("算法有问题哈");
					clearInterval(interval);
					throw new Error("算法有问题哈");
				}
			}

			this.props.push(b ? 1 : 0);
			if (count === 0) {
				this.props.length = 0;
				this.props.push("全部测试通过！！");
			}

			this.paint();
		}, 20);
	}
}