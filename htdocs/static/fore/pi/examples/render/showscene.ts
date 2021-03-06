/**
 * 
 */
import { butil, commonjs } from '../../lang/mod';
import { Json } from '../../lang/type';
import { Dimension, FlyControl } from '../../render3d/fly_control';
import { addSceneRes, configMap, findConfigFile } from '../../render3d/load';
import { Renderer } from '../../render3d/renderer';
import { Scene, SceneData } from '../../render3d/scene';
import { ResTab } from '../../util/res_mgr';
import { toJson } from '../../util/util';
import { Forelet } from '../../widget/forelet';
import { getRealNode, paintCmd3 } from '../../widget/painter';
import { loadDir } from '../../widget/util';
import { Widget } from '../../widget/widget';
import { mgr } from '../util/05_audio/demo';

let camera3DNode;
const resTab = new ResTab();
export let scene: Scene;
let renderer: Renderer;
const width = 640;
const height = 900;
let lastMS = new Date().getTime();
let flyControl;
let widget;
let isLoad;
const forelet = new Forelet();
const rootPath = 'examples/render/res/';
const path = 'scene/';
let name = localStorage.getItem('render_name') || 'base.scene';
let cameraFactor = +localStorage.getItem('render_cf') || 1;
let nameArr;
const defualCamera3D = {
	camera: {
		perspective: [30, width / height, 0.001, 10000]
	},
	transform: {
		position: [0, 0, 20],
		rotate: [0, 3.14159265, 0],
		scale: [1, 1, -1]
	}
};

const defualCamera2D = {
	camera: {
		ortho: [-width / 2, width / 2, height / 2, -height / 2, -10000, 10000]
	},
	transform: {
		position: [0, 0, 1],
		rotate: [0, 3.14159265, 0],
		scale: [1, 1, -1]
	}
};
export let sceneData: SceneData = {
	resTab: resTab,

	lights: [
		{
			type: 'Ambient',
			color: [1, 1, 1]
		}
	]
};

let aniData = {
	"attack_00000.png":
		{
			"frame": { "x": 1, "y": 796, "w": 128, "h": 110 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 18, "w": 128, "h": 110 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00001.png":
		{
			"frame": { "x": 131, "y": 449, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00002.png":
		{
			"frame": { "x": 391, "y": 889, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00003.png":
		{
			"frame": { "x": 521, "y": 1, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00004.png":
		{
			"frame": { "x": 131, "y": 560, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00005.png":
		{
			"frame": { "x": 1, "y": 908, "w": 128, "h": 110 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 18, "w": 128, "h": 110 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00006.png":
		{
			"frame": { "x": 131, "y": 671, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00007.png":
		{
			"frame": { "x": 521, "y": 111, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00008.png":
		{
			"frame": { "x": 521, "y": 221, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00009.png":
		{
			"frame": { "x": 521, "y": 331, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00010.png":
		{
			"frame": { "x": 521, "y": 441, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00011.png":
		{
			"frame": { "x": 131, "y": 782, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00012.png":
		{
			"frame": { "x": 131, "y": 1, "w": 128, "h": 110 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 18, "w": 128, "h": 110 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00013.png":
		{
			"frame": { "x": 131, "y": 113, "w": 128, "h": 110 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 18, "w": 128, "h": 110 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00014.png":
		{
			"frame": { "x": 131, "y": 225, "w": 128, "h": 110 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 18, "w": 128, "h": 110 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"attack_00015.png":
		{
			"frame": { "x": 131, "y": 337, "w": 128, "h": 110 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 18, "w": 128, "h": 110 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"die_00000.png":
		{
			"frame": { "x": 521, "y": 551, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"die_00001.png":
		{
			"frame": { "x": 651, "y": 435, "w": 128, "h": 96 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 32, "w": 128, "h": 96 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"die_00002.png":
		{
			"frame": { "x": 651, "y": 533, "w": 128, "h": 92 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 36, "w": 128, "h": 92 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"die_00003.png":
		{
			"frame": { "x": 651, "y": 627, "w": 124, "h": 57 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 71, "w": 124, "h": 57 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00000.png":
		{
			"frame": { "x": 521, "y": 661, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00001.png":
		{
			"frame": { "x": 131, "y": 893, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00002.png":
		{
			"frame": { "x": 1, "y": 457, "w": 128, "h": 111 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 17, "w": 128, "h": 111 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00003.png":
		{
			"frame": { "x": 1, "y": 570, "w": 128, "h": 111 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 17, "w": 128, "h": 111 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00004.png":
		{
			"frame": { "x": 1, "y": 1, "w": 128, "h": 112 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 16, "w": 128, "h": 112 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00005.png":
		{
			"frame": { "x": 1, "y": 115, "w": 128, "h": 112 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 16, "w": 128, "h": 112 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00006.png":
		{
			"frame": { "x": 1, "y": 229, "w": 128, "h": 112 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 16, "w": 128, "h": 112 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00007.png":
		{
			"frame": { "x": 1, "y": 343, "w": 128, "h": 112 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 16, "w": 128, "h": 112 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00008.png":
		{
			"frame": { "x": 1, "y": 683, "w": 128, "h": 111 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 17, "w": 128, "h": 111 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00009.png":
		{
			"frame": { "x": 261, "y": 1, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00010.png":
		{
			"frame": { "x": 521, "y": 771, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00011.png":
		{
			"frame": { "x": 651, "y": 1, "w": 128, "h": 107 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 21, "w": 128, "h": 107 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00012.png":
		{
			"frame": { "x": 651, "y": 110, "w": 128, "h": 107 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 21, "w": 128, "h": 107 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00013.png":
		{
			"frame": { "x": 651, "y": 219, "w": 128, "h": 106 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 22, "w": 128, "h": 106 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00014.png":
		{
			"frame": { "x": 651, "y": 327, "w": 128, "h": 106 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 22, "w": 128, "h": 106 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"run_00015.png":
		{
			"frame": { "x": 521, "y": 881, "w": 128, "h": 108 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 20, "w": 128, "h": 108 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00000.png":
		{
			"frame": { "x": 261, "y": 112, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00004.png":
		{
			"frame": { "x": 261, "y": 223, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00008.png":
		{
			"frame": { "x": 261, "y": 334, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00010.png":
		{
			"frame": { "x": 261, "y": 445, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00012.png":
		{
			"frame": { "x": 261, "y": 556, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00014.png":
		{
			"frame": { "x": 261, "y": 667, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00016.png":
		{
			"frame": { "x": 261, "y": 778, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00018.png":
		{
			"frame": { "x": 261, "y": 889, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00020.png":
		{
			"frame": { "x": 391, "y": 1, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00022.png":
		{
			"frame": { "x": 391, "y": 112, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00024.png":
		{
			"frame": { "x": 391, "y": 223, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00026.png":
		{
			"frame": { "x": 391, "y": 334, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00028.png":
		{
			"frame": { "x": 391, "y": 445, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00030.png":
		{
			"frame": { "x": 391, "y": 556, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00032.png":
		{
			"frame": { "x": 391, "y": 667, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		},
	"wait_00034.png":
		{
			"frame": { "x": 391, "y": 778, "w": 128, "h": 109 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 19, "w": 128, "h": 109 },
			"sourceSize": { "w": 128, "h": 128 },
			"pivot": { "x": 0.5, "y": 0.5 }
		}
}

function testAniMation(node) {
	let i = 0
	setInterval(function(){
		
	}, 20)
}

/**
 * @description 导出组件Widget类
 * @example
 */
export class RenderDemo extends Widget {

	/**
	 * @description 创建后调用，一般在渲染循环外调用
	 * @example
	 */
	public create(): void {
		super.create();
		this.props = { path: path, name: name, cameraFactor: cameraFactor };
		renderer = new Renderer(width, height);
		if (nameArr) {
			this.props.selects = nameArr;
			nameArr = undefined;
		}
	}

	public firstPaint(): void {
		widget = this;
		const canvas = renderer.getCanvas();
		paintCmd3(getRealNode(widget.tree.children[0]), 'appendChild', [canvas]);
		initScene();
	}

	public updateData(data: string[]): void {
		this.props.selects = data;
		(<any>this.tree).children[0].setProps({ name: name, selects: data }, null);
		(<any>this.tree).children[0].paint();
	}

	public destroy(): boolean {
		const bool = super.destroy();
		if (!bool) {
			return false;
		}
		scene.destroy();
		scene = undefined;

		return true;
	}

	public rnChange(e: any) {
		this.props.name = name = e.value;
		localStorage.setItem('render_name', name);
		initScene();
	}
	public cfChange(e: any) {
		if (e.currentTarget.value) {
			cameraFactor = +e.currentTarget.value;
			localStorage.setItem('render_cf', e.currentTarget.value);
			if (flyControl) {
				flyControl.setRollSpeed(cameraFactor * 0.1);
				flyControl.setMovementSpeed(cameraFactor * 10);
			}
		}
	}
	public onMouseDown(event: any) {
		if (!flyControl) return 0;
		flyControl.onMouseLDown(event);
		flyControl.onMouseMDown(event);

		return 0;
	}
	public onMouseMove(event: any) {
		if (!flyControl) return 0;
		flyControl.onMouseLMove(event);
		flyControl.onMouseMMove(event);

		return 0;
	}
	public onMouseWheel(event: any) {
		if (!flyControl) return;
		flyControl.onMouseWheel(event);
	}
	public onRayCast(event: any) {
		onRayCast(event);
	}
	public doClear(e) {
		initClear();
	}
	public doAdd(e) {
		initScene()
	}
}

const copyNode = (node) => {
	const result = JSON.parse(JSON.stringify(node));

	return result;
};

const onRayCast = (event: any) => {
	if (!scene) return
	const result = scene.raycast(event.x, event.y - 40);
	console.log(result);

};

const render = () => {
	if (!scene) return;
	// sceneData.staticObj.ref.impl.position.x = sceneData.staticObj.ref.impl.position.x + 0.01;
	requestAnimationFrame(render);
	const now = new Date().getTime();
	scene.render((now - lastMS) / 1000);
	lastMS = now;
};

const init = () => {
	try {
		sceneData.staticObj = toJson(butil.utf8Decode(configMap.get(rootPath + path + name)));
		scene = renderer.createScene(sceneData);

		// tslint:disable-next-line:number-literal-format
		renderer.setClearColor(0x303030, 1.0);

		const camera = scene.getCameraObject();
		if (camera) {
			camera3DNode = camera;
		} else {
			camera3DNode = defualCamera3D;
			scene.insert(camera3DNode);
			scene.insert(defualCamera2D);
		}
		// tslint:disable-next-line:number-literal-format
		flyControl = new FlyControl(camera3DNode.ref.impl, cameraFactor * 10.0, cameraFactor * 0.1, { size: [width, height], offset: [0, 0] });
		render();
	} catch (error) {
		localStorage.setItem('render_name', 'base.scene');
	}
};

/**
 * 清空
 */
const initClear = () => {
	if (scene) {
		scene.remove(camera3DNode);
		scene.remove(defualCamera2D);
		scene.destroy();
		scene = null;
	}
}

/**
 * 两个条件都准备好了，才能进行初始化
 */
const initScene = () => {
	initClear();
	if (isLoad && widget) {
		init();
	}
};
loadDir([rootPath], commonjs.flags, {}, undefined, fileMap => {
	isLoad = true;
	addSceneRes(fileMap, rootPath);
	initScene();

	const arr = [];
	for (const k in fileMap) {
		if (k.indexOf(rootPath + path) === 0) {
			arr.push(k.slice((rootPath + path).length, k.length));
		}
	}
	if (widget) {
		widget.updateData(arr);
	} else {
		nameArr = arr;
	}
	// tslint:disable-next-line:no-empty
}, () => { }, () => { });
