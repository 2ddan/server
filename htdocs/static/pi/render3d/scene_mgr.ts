/**
 * 
 */
import { ResTab } from '../util/res_mgr';
import { Renderer } from './renderer';
import { Scene, SceneData } from './scene';
import { THREE } from './three';

let renderer: Renderer;
let scene: Scene;
let width;
let height;
let isPause = false;
const clock = new THREE.Clock();

/**
 * @description 数组合并，假设数组的偏移是一样的
 */
const mergeArray = (arr, old, parent, key, resTab) => {
	let i;
	let v;
	let oldv;
	if (arr.length !== old.length) {
		parent[key] = arr;
		scene.modify(parent, key);

		return false;
	}
	if (arr.length === 0) {
		return true;
	}
	if (key === 'children') {
		for (i = arr.length - 1; i >= 0; i--) {
			v = arr[i];
			oldv = old[i];
			if (!v) {
				old[i] = v;
				if (oldv) {
					scene.remove(oldv);
				} else {
					mergeObject(v, oldv);
				}
			} else if (!oldv) {
				old[i] = v;
				scene.insert(v, parent, resTab);
			} else {
				mergeObject(v, oldv);
			}
		}
	} else {
		for (i = arr.length - 1; i >= 0; i--) {
			if (arr[i] !== old[i]) {
				break;
			}
		}
		if (i >= 0) {
			parent[key] = arr;
			scene.modify(parent, key);
		}

		return i < 0;
	}
};

/**
 * @description 对象合并，假设对象的结构字段是一样的，数组的偏移也是一样的 
 */
const mergeObject = (obj, old, resTab?, skip?) => {
	let k;
	let v;
	for (k in obj) {
		if (obj.hasOwnProperty(k) && k !== skip) {
			v = obj[k];
			if (k.indexOf('Once') > 0) {
				if (v === old[k]) {
					continue;
				}
				if (v === null || old[k] === null || v.value !== old[k].value || v.sign !== old[k].sign) {
					old[k] = v;
					scene.modify(old, k);
				}
				continue;
			}
			if (typeof v === 'object') {
				if (v === null) {
					if (old[k]) {
						old[k] = null;
					}
					scene.modify(old, k);
				} else if (Array.isArray(v)) {
					mergeArray(v, old[k], old, k, resTab);
				} else if (old[k]) {
					mergeObject(v, old[k]);
				} else {
					old[k] = v;
					scene.modify(old, k);
				}
			} else if (v !== old[k]) {
				old[k] = v;
				scene.modify(old, k);
			}
		}
	}
};

/**
 * @description 场景管理器
 */
// tslint:disable-next-line:no-unnecessary-class
export class SceneManager {

	/**
	 * @description 初始化
	 */
	public static init(w: number, h: number, antialias:boolean = false) {
		width = w;
		height = h;
		renderer = new Renderer(width, height, antialias);
	}

	/**
	 * @description 设置清空色
	 */
	public static setClearColor(rgb: number, alpha: number = 1.0) {
		renderer.setClearColor(rgb, alpha);
	}

	/**
	 * @description 设置大小
	 */
	public static setSize(width: number, height: number) {
		renderer.setSize(width, height);
	}

	/**
	 * @description 设置暂停
	 */
	public static setPause(isEnable: boolean) {
		isPause = isEnable;
	}

	/**
	 * @description 获取暂停状态
	 */
	public static getPause() {
		return isPause;
	}

	/**
	 * @description 渲染
	 */
	public static render() {
		isPause || scene.render(clock.getDelta());
	}

	/**
	 * @description 射线查询
	 */
	public static raycast(x: number, y: number) {
		return scene.raycast(x, y);
	}

	/**
	 * @description 重置场景，删除老场景，创建新场景
	 */
	public static reset(data: SceneData) {
		if (scene) {
			try {
				scene.destroy();
			} catch (e) {
				console.log(e);
			}
		}
		scene = renderer.createScene(data);
		scene.insert({
			type: 'Camera',
			ortho: [-width / 2, width / 2, height / 2, -height / 2, -1000, 1000]
		});
	}

	/**
	 * @description 设置场景对象的位置
	 */
	// tslint:disable-next-line:typedef
	public static setPos(data, x: number, y: number, z: number) {
		data._show.old.position[0] = x;
		data._show.old.position[1] = z || 0;
		data._show.old.position[2] = y;
		if (data._show.old.ref) {
			scene.modify(data._show.old, 'position');
		}
	}

	/**
	 * @description 创建指定数据对应的场景对象
	 */
	// tslint:disable-next-line:typedef
	public static create(data, func, parent?, resTab?: ResTab) {
		if (parent) {
			if (!parent._show || !parent._show.old || !parent._show.old.ref) {
				console.log('父节点不存在，无法创建模型');

				return;
			}
			parent = parent._show.old;
		}

		const obj = JSON.parse(func(undefined, data));
		if (resTab) {
			obj.resTab = resTab;
		}
		data._show = data._show || {};
		data._show.tpl = func;
		data._show.old = obj;
		scene.insert(obj, parent, resTab);
	}

	/**
	 * @description 修改指定数据对应的场景对象
	 */
	// tslint:disable-next-line:typedef
	public static modify(data) {
		if (!data) {
			console.log(data);
		}
		const obj = JSON.parse(data._show.tpl(undefined, data));
		if (data._show.old.ref) {
			const old = data._show.old;
			mergeObject(obj, old, old.resTab, 'position');
		}
	}

	/**
	 * @description 设置环境光
	 * @param r,g,b 设置rgb分量，0-1
	 */
	// tslint:disable-next-line:typedef
	public static setAmbient(r, g, b) {
		// scene.setAmbient(r, g, b);
	}

	/**
	 * @description 移除指定数据对应的场景对象
	 */
	// tslint:disable-next-line:typedef
	public static remove(data) {
		try {
			scene.remove(data._show.old);
		} catch (ex) {
			if (console) {
				console.log('remove, ex: ', ex);
			}
		}
	}

	/**
	 * @description 取canvas
	 */
	public static getCanvas() {
		return renderer.getCanvas();
	}
}