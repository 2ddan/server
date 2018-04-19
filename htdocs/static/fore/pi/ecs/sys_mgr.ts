/*
 * ecs的系统及系统管理器。
 * 系统监听组件的事件， 并负责对实体和组件进行操作。
 * 管理器负责维护系统运行管线(有项无环图)，包括系统的并发执行。现在的实现是顺序执行，换成其他有多线程的语言，可以并发执行。
 * 一个管理器内的系统模块不可重复。
 * cfg: {
 * 	"graph" : ["pi/ecs/system/init", ["async"], "pi/ecs/system/sync"],
 * 	"args" : {
 * 		"pi/ecs/system/init" : {
 * 			"viewGrid" : 20,
 * 			"blockGrid" : 1,
 * 			"width" : 10000,
 * 			"height" : 10000,
 * 			"depth" : 10000,
 * 			"seed" : 10000,
 * 			"runInterval": 50
 * 		},
 * 		pi/ecs/system/sync" : {
 * 		}
 * 	}
 * }
 */

// ============================== 导入
import {World, Entity, Component} from "./world";
import { Json } from '../lang/type';
import { Mod, butil, depend, load, commonjs } from '../lang/mod';
import { getExport, checkType, checkInstance } from "../util/util";

// ============================== 导出
// 系统
export class System {
	/**
	 * 初始化
	 */
	init(w: World, cfg: Json){}
	/**
	 * 运行
	 */
	run(context: any){}
	/**
	 * 销毁
	 */
	destroy(){}
}

/**
 * 系统管理器
 * @example
 */
export class SysMgr {
	// 世界
	world: World;
	// 系统表
	map = new Map<string, System>();
	// 系统运行图， 有向无环图
	graph: SystemGraph;

	/**
	 * 初始化
	 */
	constructor(w: World) {
		this.world = w;
	}
	/**
	 * 根据配置初始化，可以多次调用
	 */
	init(cfg: Json) {
		let g = new SystemGraph;
		let m = new Map;
		g.init(this.world, {graph: cfg.graph, args: cfg.args, map: m, mgr: this});
		this.map = m;
		this.graph.destroy();
		this.graph = g;
	}
	/**
	 * 运行
	 */
	run(context: any) {
		this.graph && this.graph.run(context);
	}

}

// ============================== 本地
// 可并发的系统图节点
class SystemGraph extends System {
	// 系统管理器
	mgr: SysMgr;
	// 并发
	async = false;
	// 包含的系统
	arr: Array<[string, System]> = [];
	
	/**
	 * 初始化
	 */
	init(w: World, cfg: Json){
		this.mgr = cfg.mgr;
		let arr = cfg.graph;
		// 判断是否并发执行
		if(arr[0] === "async") {
			this.async = true;
			arr = arr.slice(1);
		}
		for(let s of arr) {
			if(Array.isArray(s)) {
				// 生成系统图节点，并放入数组
				let r = new SystemGraph;
				r.init(w, {graph: s, args: cfg.args, map: cfg.map, mgr: this.mgr});
				this.arr.push(["", r]);
				continue;
			}
			let r = this.mgr.map.get(s);
			if(!r) {
				let mod = commonjs.relativeGet(s);
				if (!mod)
					throw new Error("invalid mod: " + s);
				let sys = getExport(mod, checkType, System);
				if (!sys)
					throw new Error("invalid system in: " + s);
				r = sys();
				r.init(w, cfg.args[s]);
				// 放入到管理器的新系统表
				cfg.map.set(s, r);
				this.arr.push([s, r]);
			}
		}
	}
	/**
	 * 运行
	 */
	run(context: any){
		for(let [k, s] of this.arr)
			s.run(context);
	}
	/**
	 * 销毁
	 */
	destroy() {
		for(let [k, s] of this.arr) {
			// 如果不在管理器的系统表，则移除
			if(!this.mgr.map.has(k))
				s.destroy();
		}
	}

}
