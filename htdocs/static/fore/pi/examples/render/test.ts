
import { loadDir } from "../../widget/util";
import { Renderer } from "../../render3d/renderer";
import { Scene, SceneData } from "../../render3d/scene";
import { ResTab } from '../../util/res_mgr'
import { butil, commonjs } from '../../lang/mod';
import { toJson } from "../../util/util";
import { addSceneRes, configMap, findConfigFile } from "../../render3d/load";
import { Widget } from "../../widget/widget";
import { Forelet } from "../../widget/forelet";
import { Json } from '../../lang/type';
import { getRealNode, paintCmd3 } from "../../widget/painter";
import { Dimension, FlyControl } from "../../render3d/fly_control";


let camera3DNode;
let resTab = new ResTab();
let scene: Scene;
let renderer: Renderer;
let width = 640, height = 900;
let lastMS = new Date().getTime();
let flyControl;
let widget, isLoad;
let forelet = new Forelet;
let rootPath = "examples/render/res/";
let path = "scene/";
let name = localStorage.getItem("render_name") || "base.scene";
let cameraFactor = +localStorage.getItem("render_cf") || 1;
let nameArr;
let defualCamera3D = {
	camera: {
		perspective: [60, width / height, 0.001, 10000]
	},
	transform: {
		position: [5, 0, 20],
		rotate: [0, 3.14159265, 0],
		scale: [1, 1, -1]
	}
};
let sceneData:SceneData = {
	resTab: resTab,

	lights: [
		{
			type: "Ambient",
			color: [1, 1, 1]
		}
	]
};


/**
 * @description 导出组件Widget类
 * @example
 */
export class RenderDemo extends Widget {
    
    /**
	 * @description 创建后调用，一般在渲染循环外调用
	 * @example
	 */
	create(): void {
        super.create();
        this.props = {path: path, name: name, cameraFactor: cameraFactor };
        renderer = new Renderer(width, height);	
		if(nameArr){
			this.props.selects = nameArr;
			nameArr = undefined;
		}
    }
    
    firstPaint(): void {
		widget = this;
		let canvas = renderer.getCanvas();
		paintCmd3(getRealNode(widget.tree), "appendChild", [canvas]);
		initScene();
	}
	
	updateData(data: Array<string>): void{
		this.props.selects = data;
		(<any>this.tree).children[0].setProps({name: name, selects: data}, null);
		(<any>this.tree).children[0].paint();
	}

	destroy(): boolean{
		let bool = super.destroy();
		if(!bool){
			return false
		}
		if(scene){
			scene.remove(camera3DNode);
			scene.destroy();
			scene = undefined;
		}
		return true;
	}
	onMouseDown(event){
		flyControl.onMouseLDown(event);
		flyControl.onMouseMDown(event);
		return 0;
	}
	onMouseMove(event){
		flyControl.onMouseLMove(event);
		flyControl.onMouseMMove(event);
		return 0;
	}
	onMouseWheel(event){
		flyControl.onMouseWheel(event);
	}
	onRayCast(event){
		onRayCast(event);
	}
}

const copyNode = (node) => {
	let result = JSON.parse(JSON.stringify(node));
	return result;
}

const onRayCast = (event: any) => {
	let result = scene.raycast(event.x, event.y);
	console.log(result);

}

const render = () => {
	if(!scene) return;
	requestAnimationFrame(render);
	let now = new Date().getTime();
	scene.render((now - lastMS) / 1000);
	lastMS = now;
}

const init = () => {
	try {
		sceneData.staticObj = toJson(butil.utf8Decode(configMap.get(rootPath + path + name)));
		scene = renderer.createScene(sceneData);
	
		let camera = scene.getCameraObject();
		if(camera){
			camera3DNode = camera;
		}else{
			camera3DNode = defualCamera3D;
			scene.insert(camera3DNode);
		}
		flyControl = new FlyControl(camera3DNode.ref.impl, 10.0 * cameraFactor, 0.1 * cameraFactor, { size: [width, height], offset: [0, 0] });
		render();
	} catch (error) {
		localStorage.setItem("render_name", "base.scene");
	}
}

/**
 * 两个条件都准备好了，才能进行初始化
 */
const initScene = () => {
	if(scene){
		scene.remove(camera3DNode);
		scene.destroy();
		scene = null;
	}
	if (isLoad && widget) {
		init();
	}
}
loadDir([rootPath], commonjs.flags, {}, undefined, fileMap => {
	isLoad = true;
	addSceneRes(fileMap, rootPath);
	initScene();
	
	let arr = [];
	for(let k in fileMap){
		if(k.indexOf(rootPath + path) === 0){
			arr.push(k.slice((rootPath + path).length, k.length))
		}
	}
	if(widget){
		widget.updateData(arr);
	}else{
		nameArr = arr;
	}
}, () => { }, () => { });

