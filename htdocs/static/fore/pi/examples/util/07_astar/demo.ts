/*
 * 输入框，要求props为{sign:string|number, text:string, id:string|number}, 注意text要转义引号
 */

// ============================== 导入

import { Widget } from "../../../widget/widget";
import { Node, astar } from "../../../math/astar"

// ============================== 导出

class Tile {
	width: number;
	height: number;
	items: TileNode[];

	constructor(w: number, h: number) {
		this.width = w;
		this.height = h;
		this.items = [];
	}
}

enum Usage {
	NONE = "white",  // 可走区域
	START = "green",  // 开始节点
	END = "blue",   // 结束节点
	WALL = "gray",   // 墙
	PATH = "red"     // 路径节点
}

class TileNode implements Node {
	x: number;
	y: number;
	usage: Usage;
	tile: Tile;

	constructor(tile: Tile, x: number, y: number, isWall: boolean) {
		this.x = x;
		this.y = y;
		this.tile = tile;
		this.usage = Usage.NONE;
	}

	g(last: TileNode) {
		let r = 0;
		if (last.x === this.x) {
			r = last.y === this.y ? 0 : 1;
		} else if (last.y === this.y) {
			r = 1;
		} else {
			r = 1.414;
		}
		return r;
	}

	h(finish: TileNode) {
		return Math.abs(finish.x - this.x) + Math.abs(finish.y - this.y);
	}

	*[Symbol.iterator]() {
		let x = this.x;
		let y = this.y;
		let w = this.tile.width;
		let h = this.tile.height;

		let ns = [
			{ x: x, y: y - 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y }, { x: x - 1, y: y },
			{ x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x + 1, y: y + 1 }, { x: x - 1, y: y + 1 }
		];

		for (let n of ns) {
			if (n.x >= 0 && n.y >= 0 && n.x < w && n.y < h) {
				let item = this.tile.items[w * n.y + n.x];
				if (item.usage === Usage.WALL) continue;

				// 对角线能穿，前提是不能有临墙挡着
				if (n.x !== x && n.y !== y) {
					let t = this.tile.items[w * y + n.x];
					if (t.usage === Usage.WALL) continue;

					t = this.tile.items[w * n.y + x];
					if (t.usage === Usage.WALL) continue;
				}

				yield item;
			}
		}
	}
}

export class Demo extends Widget {
	tile: Tile;
	usage: Usage;
	start: TileNode;
	end: TileNode;

	props = {
		time: 0,
		width: 1024,
		height: 768,
		w: 64,
		h: 64,
		items: [] as TileNode[]
	};

	create() {
		this.tile = new Tile(this.props.w, this.props.h);
		this.tile.items = this.props.items;

		for (let j = 0; j < this.props.h; ++j) {
			for (let i = 0; i < this.props.w; ++i) {
				let node = new TileNode(this.tile, i, j, false);
				this.props.items.push(node);
			}
		}

		this.usage = Usage.NONE;

		this.start = this.tile.items[0];
		this.start.usage = Usage.START;

		this.end = this.tile.items[1];
		this.end.usage = Usage.END;
	}

	clearWall() {
		for (let n of this.props.items) {
			if (n.usage === Usage.WALL || n.usage === Usage.PATH) {
				n.usage = Usage.NONE;
			}
		}
		this.props.time = 0;
		this.paint(false);
	}

	mousedown(x: number, y: number) {

		this.clearPath();

		let node = this.props.items[x + y * this.props.w];
		switch (node.usage) {
			case Usage.START:
				this.usage = Usage.START;
				break;
			case Usage.END:
				this.usage = Usage.END;
				break;
			case Usage.WALL:
				node.usage = Usage.NONE;
				this.usage = Usage.NONE;
				break;
			case Usage.NONE:
				node.usage = Usage.WALL;
				this.usage = Usage.WALL;
				break;
			default:
				break;
		}

		this.paint(false);
	}

	mousemove(e: MouseEvent, x: number, y: number) {

		if (e.which !== 1) return;

		let node = this.props.items[x + y * this.props.w];
		switch (this.usage) {
			case Usage.START:
				if (node !== this.start && this.end !== node) {
					node.usage = Usage.START;
					this.start.usage = Usage.NONE;
					this.start = node;
				}
				break;
			case Usage.END:
				if (node !== this.start && this.end !== node) {
					node.usage = Usage.END;
					this.end.usage = Usage.NONE;
					this.end = node;
				}
				break;
			case Usage.WALL:
				if (node !== this.start && this.end !== node) {
					node.usage = this.usage;
				}
				break;
			case Usage.NONE:
				if (node !== this.start && this.end !== node) {
					node.usage = this.usage;
				}
				break;
		}

		this.paint(false);
	}

	randomWall() {

		this.clearWall();

		let count = this.props.w * this.props.h;
		for (let n of this.props.items) {
			if (n.usage !== Usage.START && n.usage !== Usage.END) {
				n.usage = Math.random() > 0.7 ? Usage.WALL : Usage.NONE;
			}
		}

		this.paint(false);
	}

	clearPath() {
		for (let n of this.props.items) {
			if (n.usage === Usage.PATH) {
				n.usage = Usage.NONE;
			}
		}
		this.props.time = 0;
	}

	searchPath() {

		this.clearPath();

		let paths = [];
		let s = performance.now();
		astar(paths, this.start, this.end);
		let e = performance.now();
		this.props.time = e - s;

		paths.forEach((n: TileNode) => {
			if (n.usage === Usage.WALL) {
				alert("paths not wall!!");
				throw new Error("paths not wall!!");
			}
			if (n.usage !== Usage.START && n.usage !== Usage.END) {
				n.usage = Usage.PATH;
			}
		});

		this.paint(false);
	}
}