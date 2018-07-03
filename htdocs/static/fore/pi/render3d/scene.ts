

import { Renderer } from "./renderer"
import { THREE } from "./three"
import { butil } from '../lang/mod';
import * as _LOAD from "./load";
import { ResTab } from "../util/res_mgr"
import { Json } from '../lang/type';
import { toFun, compile, toFunc } from "../util/tpl";
import { Parser } from "../util/tpl_str";
import * as _CANVAS from '../util/canvas';
import { parserTpl } from "../compile/vdom";
import { gen } from "../compile/genvdom";
import { ParticleSystem } from "./particlesystem/ps";

class PlayObj {
	resTab: ResTab;
	func: string;
	param: Json;
}

/**
 * @description 场景数据
 */
export interface SceneData {

	resTab?: ResTab,

	// 地形
	terrain?: {
		path: string,
		scale?: [number, number, number]
	},

	// 天空盒，纹理路径：右，左，上，下，后，前
	skybox?: [string, string, string, string, string, string],

	// 雾
	fog?: {
		type: "Linear",
		color: number,
		near: number,
		far: number
	} | {
		type: "Exp",
		color: number,
		density: number
	},

	// 灯光
	lights?: Array<{
		type: "Ambient",
		color: [number, number, number]
	} | {
		type: "Direction",
		direction: [number, number, number],
		diffuse: [number, number, number],
		specular: [number, number, number]
	}>,

	//静态物件
	staticObj?: Json
}

export interface Scene {

	/**
	 * 取相机对象
	 */
	getCameraObject();

	/**
	 * 设置2D的像素系数
	 */
	setScene2DFactor(wFactor, hFactor);

	/**
	 * @description 射线检测
	 * @param x, y 鼠标相对于canvas标签左上角的x，y值
	 *
	 * 如果检测到地形，返回：{
	 *      type: "terrain",
	 *      data: [x, y, z], y的值现在为0
	 * }
	 * 
	 * 如果检测到其他网格，返回：{
	 *      type: "mesh",
	 *      data: 对应网格ID
	 * }
	 */
	raycast(x, y, ignoreObj);

	/**
	 * @description 释放场景
	 */
	destroy(root3D?: Json, root2D?: Json);

	/**
	 * @description 渲染
	 */
	render(deltaMS, isAutoClear?);

	/**
	 * @description 将obj放到parent上
	 * 如果obj没有ref字段，则会创建一个新的
	 */
	insert(obj, parent?, resTab?);

	/**
	 * @description 修改obj的itemKey字段
	 * 注：obj必须要有ref字段
	 */
	modify(obj, itemKey);

	/**
	 * @description 删除obj的ref
	 */
	remove(obj);
	
	/**
	 * @description 工具方法：用于转换3D坐标到屏幕
	 * pt: 3D坐标 [x, y, z]
	 * result: 结果，2D坐标 [x, y, z]
	 */
	getScreenPoint(pt: [number, number, number], result: [number, number, number]);
}

export const createScene = (renderer: Renderer, data: SceneData): Scene => {
	return new SceneImpl(renderer, data);
}

let _size = {
	width: 0,
	height: 0
};

let _tmpPt = new THREE.Vector3();
let _tmpV4 = new THREE.Vector4();
let _tmpMat = new THREE.Matrix4();

export const parseSkeleton = (): THREE.Bone[] => {

	return null;
}

class SceneImpl implements Scene {

	private destroyed: boolean;

	private renderer: Renderer
	private impl3D: THREE.WebGLRenderer;

	private maxBones: number;
	private useVertexTexture: boolean;

	private scene: THREE.Scene;
	private scene2D: THREE.Scene;

	private meshArray: any[];
	private attachmentArray: any[];

	private cameraObject: any;

	private camera: THREE.PerspectiveCamera;
	private camera2D: THREE.OrthographicCamera;

	private skybox: any;
	private terrain: THREE.Terrain;
	private ambientLight: THREE.AmbientLight;
	private raycaster: THREE.Raycaster;
	private raycast3DArray: any[];
	private raycast2DArray: any[];

	constructor(renderer: Renderer, data: SceneData) {

		// 是否已经释放
		this.destroyed = false;

		this.renderer = renderer;

		// THREE.WebGLRenderer的句柄
		this.impl3D = renderer.getThreeRenderer();

		let cap = this.impl3D.capabilities;
		this.maxBones = Math.floor((cap.maxVertexUniforms - 60) / 4);
		this.useVertexTexture = cap.floatVertexTextures > 0;

		this.scene = new THREE.Scene();
		this.scene2D = new THREE.Scene();
		this.scene2D.add(new THREE.AmbientLight([1, 1, 1]));
		this.meshArray = [];
		this.attachmentArray = [];

		this.camera = undefined;
		this.camera2D = undefined;

		this.terrain = undefined;

		this.raycaster = new THREE.Raycaster();
		this.raycast3DArray = [];
		this.raycast2DArray = [];

		if (!data) return;

		if (data.terrain) {
			this.initTerrain(data.terrain.path, data.resTab, data.terrain.scale);
		}

		if (data.fog) {
			this.initFog(data.fog);
		}

		if (data.lights) {
			for (let i = 0; i < data.lights.length; i++) {
				let impl = this.initLight(data.lights[i]);
				if (impl)
					this.scene.add(impl);
			}

		}

		if (data.skybox) {
			this.initSkybox(data.skybox, data.resTab);
		}

		if (data.staticObj) {
			this.insertScene(data.staticObj, data.resTab);
		}
	}

	setScene2DFactor(wFactor, hFactor) {
		this.scene2D.scale.set(wFactor, hFactor, 1);
	}

	getCameraObject() {
		return this.cameraObject;
	}

	raycast(x, y, ignoreObj) {

		if (this.destroyed) {
			throw new Error("THREE.PiScene.raycast failed, scene is destroyed!");
		}

		if (!this.camera) {
			throw new Error("THREE.PiScene.raycast failed, no 3d camera!");
		}

		let size = this.renderer.getSize();
		let mouse = {
			x: (x / size.width) * 2 - 1,
			y: - (y / size.height) * 2 + 1
		};

		// 2D 相机优先
		if (this.camera2D) {
			this.raycaster.setFromCamera(mouse, this.camera2D);

			let r, intersects = this.raycaster.intersectObjects(this.raycast2DArray, false, ignoreObj);

			if (intersects.length > 0) {
				let inter = intersects[0]; // 按距离升序排列

				r = {
					type: "mesh",
					id: inter.object.rayID
				};
				return r;
			}
		}

		this.raycaster.setFromCamera(mouse, this.camera);

		// 保证地形永远放到最后一个
		if (this.terrain) {
			this.raycast3DArray.push(this.terrain);
		}
		let r, intersects = this.raycaster.intersectObjects(this.raycast3DArray, false, ignoreObj);
		if (this.terrain) {
			this.raycast3DArray.pop();
		}

		if (intersects.length > 0) {
			let inter = intersects[0]; // 按距离升序排列

			// 注：约定了网格地形的ID为负数
			if (inter.object.rayID < 0) {
				r = {
					type: "terrain",
					data: [inter.point.x, inter.point.y, inter.point.z],
					id: inter.object.rayID
				};
			}
			else if (inter.object === this.terrain) {
				r = {
					type: "terrain",
					data: [inter.point.x, inter.point.y, inter.point.z]
				};
			} else {
				r = {
					type: "mesh",
					id: inter.object.rayID
				};
			}
		}

		return r;
	}

	/**
	 * 释放场景
	 */
	destroy() {

		if (!this.destroyed) {

			this.terrain && this.terrain.dispose();

			this.attachmentArray.length = 0;
			var dispose = (root) => {
				root.dispose && root.dispose();
				let children = root.children;
				if (!children)
					return;

				for (var i = 0; i < children.length; i++) {
					dispose(children[i]);
				}
			}

			dispose(this.scene);
			dispose(this.scene2D);

			if (this.skybox) {
				this.skybox.dispose();
			}

			this.meshArray.length = 0;
			this.raycast3DArray = [];
			this.raycast2DArray = [];

			delete this.camera;
			delete this.camera2D;

			this.scene.children = [];
			this.scene2D.children = [];

			delete this.scene;
			delete this.scene2D;

			this.destroyed = true;
		}
	}

	/**
	 * 渲染，高层控帧
	 */
	render(deltaMS, isAutoClear) {
		let i;
		if (isAutoClear !== undefined) this.impl3D.autoClear = isAutoClear;
		this.impl3D.render(this.scene, this.camera, deltaMS);
		this.impl3D.autoClear = true;

		if (this.camera2D) {

			this.updateScreenPoints();

			this.impl3D.autoClear = false;
			this.impl3D.render(this.scene2D, this.camera2D, deltaMS);
			this.impl3D.autoClear = true;
		}
	}

	/**
	 * json = [{
	 *   ref: 当传进来的json数据没有该值时候，创建对象；然后返回的数据带着这个字段；
	 *
	 *   attachSkeleton: true, // 代表该对象用父对象的骨骼动画
	 * 
	 *   material: {
	 *      住：仅在创建时候使用一次！
	 *      查看material.js文件，描述参数
	 *   }
	 *   children: [],
	 *  
	 *   // 仅当type为"Mesh" 或者时有效，而且不能通过update方法修改
	 *   shape: "Circle", "Quad", "Sphere"
	 *   
	 *   color: 0xFF777777,
	 *   texture: "a.png", 
	 * 
	 *   gray: true, false
	 *
	 *   config: "配置路径", 
	 * 
	 *   type: "Mesh", "Camera", "Node", "Text", "PointLight", "SpotLight"
	 *   attachment: "2D", "3D"（默认）
	 * 
	 *   parentBone: 如果有该字段，表示该对象是骨骼绑定方式，这里填父对象骨头名字  
	 *   
	 *   // 空间信息，相对关系，Node
	 *   position: [x, y, z],
	 *   rotate:  [x, y, z], 旋转的欧拉角，供相机使用
	 *   lookatOnce: [x, y, z],  正面朝向的目标点的位置；供角色使用
	 *   scale: [1, 1, 1],
	 *   rayID: 有该字段的对象，才可以参与射线检测（射线检测不包含子对象）
	 *
	 *   // type为 "PointLight"（点光源） 时，才会有如下字段
	 *   startAtten: 1.0,
	 *   endAtten: 0.0,
	 *   diffuse: 0xFFFFFF,
	 *   specular: 0x0
	 *   
	 *   // type为 "SpotLight"（聚光灯） 时，才会有如下字段
	 *   startAtten: 1.0,
	 *   endAtten: 0.0,
	 *   
	 *   spotDirection: [x, y, z],
	 *   spotCosCutoff: 1.0,
	 *   spotExponent: 1.0,
	 *
	 *   diffuse: 0xFFFFFF,
	 *   specular: 0x0
	 * 
	 *   // type为 "Text" 时，才会有如下字段
	 *   text: "显示的字符串",
	 *   material: {
	 *       设置在canvas的context 
	 *   }
	 *   
	 *   // type 为 "mesh"时，才会有如下字段（准确的说，只有带skeleton时才会有）
	 *   uvAnim: true代表循环播放uv动画，false代表播放一次uv动画
	 *   modelAnim: true代表循环播放model动画，false代表播放一次动画
	 *   animationSpeed: 速度，默认为1.0
	 *   animationLoop: 默认的循环动作
	 *   animationOnce: 当该字段有值时，会播放一次该动画，然后回到loop动画
	 *   animationDir: 播放动画的方向，默认正向播放
	 *
	 *   // type 为 "camera"时，才会有如下字段
	 * 
	 *   perspective: [fov, aspect, near, far],
	 *   ortho: [left, right, top, bottom, near, far]
	 * }];
	 */

	/**
	 * 将obj放到parent上
	 * 如果obj没有ref字段，则会创建一个新的
	 */
	insert(obj, parent?, resTab?) {
		if (this.destroyed) {
			throw new Error("THREE.PiScene.insert failed, scene is destroyed!");
		}

		let root = obj.attachment === "2D" ? this.scene2D : this.scene;

		parent = parent || {
			attachment: obj.attachment,
			ref: {
				impl: root,
				attachment: obj.attachment  // 3D对应3D场景，2D对应2D场景
			}
		};

		if (!obj.ref) {
			let resCount = { "tatal": 0, "curr": 0 };
			this.initSceneChildren(parent, [obj], resCount, resTab);
		} else {
			throw new Error("insert failed, obj.ref is already exist");
		}
	}

	/**
	 * 将obj放到parent上
	 * 如果obj没有ref字段，则会创建一个新的
	 */
	insertScene(obj, resTab?) {
		if (this.destroyed) {
			throw new Error("THREE.PiScene.insert failed, scene is destroyed!");
		}
		let root = (obj.attachment === "2D") ? this.scene2D : this.scene;
		let parent = {
			attachment: obj.attachment,
			ref: {
				impl: root,
				attachment: obj.attachment  // 3D对应3D场景，2D对应2D场景
			}
		};

		if (!obj.ref) {
			let resCount = { "tatal": 0, "curr": 0 };
			this.initSceneChildren(parent, [obj], resCount, resTab);

		} else {
			throw new Error("insert failed, obj.ref is already exist");
		}
	}

	/**
	 * 修改obj的itemKey字段
	 * 注：obj必须要有ref字段
	 */
	modify(obj, keys) {
		if (this.destroyed) {
			throw new Error("THREE.PiScene.modify failed, scene is destroyed!");
		}

		if (!obj.ref) {
			throw new Error("THREE.PiScene.modify failed ! ");
		}

		let propertyIndex = keys[keys.length - 1];//找到属性数组中的最后一个属性
		let targetObj = findProperty(obj, keys);

		if (this[propertyIndex])
			this[propertyIndex].call(this, targetObj[propertyIndex], obj.ref.impl, keys, obj.resTab);
		else {
			let targetimpl = findProperty(obj.ref.impl, keys);
			targetimpl[propertyIndex] = targetObj[propertyIndex];
		}
	}

	/**
	 * 删除obj的ref
	 */
	remove(obj) {
		if (this.destroyed) {
			throw new Error("THREE.PiScene.remove failed, scene is destroyed!");
		}

		if (!obj || !obj.ref) return;

		let impl = obj.ref.impl;
		if (!impl) return;

		impl.parent && impl.parent.remove(impl);
		this.removeRef(obj);
		this._remove(impl);
	}

	/**
	 * 删除ref
	 */
	removeRef(obj) {
		if (!obj || !obj.ref) return;

		delete obj.ref;

		if (!obj.children)
			return;

		for (let i = 0; i < obj.children.length; i++)
			this.removeRef(obj.children[i]);
	}

	// ------------------- 下面是私有方法 ----------------------------

	private _remove(impl) {

		let i, index;

		// 射线检测
		index = this.raycast3DArray.indexOf(impl);
		if (index >= 0) {
			this.raycast3DArray.splice(index, 1);
		}

		index = this.raycast2DArray.indexOf(impl);
		if (index >= 0) {
			this.raycast2DArray.splice(index, 1);
		}

		//  顶层的2D物体     
		index = this.attachmentArray.indexOf(impl);
		if (index >= 0) {
			delete impl.__piAttachment;
			this.attachmentArray.splice(index, 1);
		}

		impl.dispose && impl.dispose();

		index = this.meshArray.indexOf(impl);
		if (index >= 0) {
			this.meshArray.splice(index, 1);
		}

		// 删除3D节点对应的2D子节点
		let r = [], d = [];
		for (i = 0; i < this.attachmentArray.length; ++i) {
			if (impl === this.attachmentArray[i].__piAttachment) {
				this.scene2D.remove(this.attachmentArray[i]);
				d.push(this.attachmentArray[i]);
			} else {
				r.push(this.attachmentArray[i]);
			}
		}
		this.attachmentArray = r;

		for (i = 0; i < d.length; ++i) {
			this._remove(d[i]);
		}
		d = undefined;

		for (i = 0; impl.children && i < impl.children.length; ++i) {
			this._remove(impl.children[i]);
		}
		impl.children.length = 0;
	}

	// 更新，位置3D变2D
	private updateScreenPoints() {
		if (this.attachmentArray.length > 0) {
			_tmpMat.multiplyMatrices(this.camera.projectionMatrix, _tmpMat.getInverse(this.camera.matrixWorld));
		}

		this.impl3D.getSize(_size);  

		for (let i = 0; i < this.attachmentArray.length; ++i) {
			let impl = this.attachmentArray[i];
			let pimpl = impl.__piAttachment;

			let p = pimpl.getWorldPosition(_tmpPt);
			_tmpV4.set(p.x, p.y, p.z, 1.0);
			_tmpV4.applyMatrix4(_tmpMat);
			p.set(_tmpV4.x / _tmpV4.w, _tmpV4.y / _tmpV4.w, _tmpV4.z / _tmpV4.w);
			p.set(-p.x * _size.width * 0.5, p.y * _size.height * 0.5, 0);

			if (!impl.__piPosition) {
				impl.__piPosition = impl.position.clone();
			}
			impl.position.addVectors(p, impl.__piPosition);
		}
	}

	private addToRaycastList(obj, mesh) {
		if (obj.rayID) {
			mesh.rayID = obj.rayID;
			if (obj.rayID < 0) {
				this.raycast3DArray.push(mesh);
			} else {
				if (obj.attachment === "2D") {
					this.raycast2DArray.unshift(mesh);
				} else {
					this.raycast3DArray.unshift(mesh);
				}
			}
		}
	}

	private gray(obj) {
		if (obj.gray !== undefined) {
			let m = obj.ref.impl;
			m.setGray(obj.gray);
		}
	}

	private childVisible(obj) {
		if (obj.childVisible !== undefined) {
			obj.ref.impl.setVisible(obj.childVisible);
		}
	}

	private boneVisible(obj) {
		if (obj.boneVisible !== undefined) {
			obj.ref.impl.setBoneVisible(obj.boneVisible);
		}
	}


	/**
	 * 注：地形文件必须放在 res/terrain目录
	 */
	private initTerrain(configName, resTab, scale) {
		_LOAD.loadTerrain(configName, this.renderer, resTab, (terrain) => {
			if (this.destroyed) {
				terrain.dispose();
				return;
			}
			this.terrain = terrain;
			if (scale) {
				this.terrain.scale.fromArray(scale);
			}
			this.scene.add(this.terrain);
		});
	}

	private initFog(fog) {
		if (fog.type === "Linear") {
			this.scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
		} else if (fog.type === "Exp") {
			this.scene.fog = new THREE.FogExp2(fog.color, fog.density);
		}
	}

	/**
	 * 工具方法：用于转换3D坐标到屏幕
	 * pt: 3D坐标 [x, y, z]
	 * result: 结果，2D坐标 [x, y, z]
	 */
	public getScreenPoint(pt: [number, number, number], result: [number, number, number]) {
		_tmpMat.multiplyMatrices(this.camera.projectionMatrix, _tmpMat.getInverse(this.camera.matrixWorld));

		this.impl3D.getSize(_size);

		_tmpV4.set(pt[0], pt[1], pt[2], 1.0);
		_tmpV4.applyMatrix4(_tmpMat);
		// tslint:disable:binary-expression-operand-order
		result[0] = -0.5 * _size.width * _tmpV4.x / _tmpV4.w;
		result[1] = 0.5 * _size.height * _tmpV4.y / _tmpV4.w;
		result[2] = 0.5 * _tmpV4.z / _tmpV4.w;
	}

	initSkybox(cfg, resTab) {
		let geo = { "width": 8000, "height": 8000, "longness": 8000 };
		let render = { "material": [] };
		for (let i = 0; i < cfg.length; i++) {
			let map = { "image": { "name": cfg[i] } };
			render.material[i] = {};
			render.material[i].map = map;
		}
		this.skybox = _LOAD.newloadShape(this.renderer, geo, render, resTab);
		this.scene.add(this.skybox);
	}

	/*************************************************初始化场景********************************************/
	private initSceneChildren(parent, children, resCount, resTab) {
		if (!children || children.length === 0){
			parent.ref.impl.childReadyOk();
			return;
		}
			
		let skeletonRes, skeletonRoot, boneChildren = [], skinnedMesh;
		for (let i = 0; children && i < children.length; ++i) {
			let obj = children[i], impl;
			if (!obj) {
				parent.ref.impl.childReadyOk();
				continue;
			}

			if (obj.type === "Skeleton") {
				skeletonRes = obj.res;
				parent.ref.impl.isSkeletonAnimation = true;
				resCount.tatal++;
				continue;
			}

			obj.resTab = resTab;
			children[i].resTab = resTab;

			if (obj.camera) {
				this.cameraObject = obj;
			}

			impl = this.initObjectComponent(obj);
			impl.attachment = obj.attachment;

			// 2D相机返回undefined
			if (!impl) continue;
			children[i].ref = {
				impl: impl
			};
			obj.ref = {
				impl: impl
			};

			this.meshArray.push(impl);
			this.addToRaycastList(obj, impl);
			if (obj.animator) {
				impl.aniControl = obj.animator.controller;
				if(obj.animator.aniBox){
					impl.aniBox = {};
					for(var k in obj.animator.aniBox){
						if(k === "_$hash"){
							continue;
						}
						var center = obj.animator.aniBox[k].center;
						var size = obj.animator.aniBox[k].size;
						var max = new THREE.Vector3(center[0] + size[0], center[1] + size[1], center[2] + size[2]);
						var min = new THREE.Vector3(center[0] - size[0], center[1] - size[1], center[2] - size[2]);
						impl.aniBox[k] = new THREE.Box3(min, max);
					}
				}
			}

			impl.name = obj.name;

			if (obj.bindBone){
				boneChildren.push(obj);
				parent.ref.impl.childReadyOk();
			}
			else
				this.addChild(parent, obj);

			this.initOtherComponent(obj); //初始化组件

			if ((obj.ref.impl instanceof THREE.Light)) {
				if (obj.ref.impl.target) {
					parent.ref.impl.add(obj.ref.impl.target);
				}
			}

			//不是和骨骼节点一起插入进场景的蒙皮模型，需要去场景数上找到对应骨骼
			if (obj.skinnedMeshRender && !skeletonRes) {
				skinnedMesh = obj;
			}

			if (!obj.children && obj.animator && obj.animator.playAnim) {
				let option = obj.animator.playAnim;
				this.playAnim(option, obj.ref.impl, undefined, resTab);
			}

			obj.children && (impl.childrenCount = obj.children.length);
			this.initSceneChildren(obj, obj.children, resCount, resTab);
		}

		//不是和骨骼节点一起插入进场景的蒙皮模型，需要去场景数上找到对应骨骼
		if (skinnedMesh && !skeletonRes) {
			let skTemp = parent ? parent.ref.impl : null;
			if (skTemp)
				skinnedMesh.ref.impl.setSkeleton(skTemp, skinnedMesh.bones);
		}

		//如果父节点上存在skeleton, 并且有需要绑在骨头上的子节点, 则将这些节点绑在父节点的skeleton上
		if (parent && parent.ref && parent.ref.impl.skeleton && boneChildren.length > 0)
			bindBone(parent.ref.impl.skeleton, boneChildren);

		//初始化骨骼
		if (skeletonRes && parent) {
			_LOAD.newloadSkeleton(skeletonRes, resTab, (bones) => {
				//将加载到的骨头添加到骨骼的包装节点和需要使用该骨骼的节点上
				let skel = parent.ref.impl.setSkeletonChild(bones);
				for (let i = 0; i < children.length; i++) {
					let child = children[i];
					if (child.skinnedMeshRender && child.ref) {
						let sBonesIndex = child.skinnedMeshRender.bones;
						if (sBonesIndex) {
							child.ref.impl.setSkeleton(skel, sBonesIndex);
						}

						child.ref.impl.bones = bones;
					}
				}

				//含有bindBone属性的节点，应该添加到对应骨头的子节点上
				bindBone(skel, boneChildren);

				resCount.curr++;
				this.loadResOk(resCount);
			});
		}

		if (parent.animator && parent.animator.playAnim) {
			
			let option = parent.animator.playAnim;
			this.playAnim(option, parent.ref.impl, undefined, resTab);
		}

		this.loadResOk(resCount);
	}

	// 添加子节点
	private addChild(parent, child) {
		// 2D节点挂在3D节点上
		if (child.attachment === "2D" && parent.attachment !== "2D") {
			this.scene2D.add(child.ref.impl);
			child.ref.impl.__piAttachment = parent.ref.impl;
			this.attachmentArray.push(child.ref.impl);
		} else {
			parent.ref.impl.add(child.ref.impl);
		}
	}

	// 完成资源加载
	private loadResOk(resCount) {
		if (resCount.tatal === resCount.curr) {
			resCount.tatal = resCount.curr = 0;
		}
	}

	private createSceneAmbientLight(obj) {
		return new THREE.AmbientLight(obj.color);
	}

	private createSceneDirectionLight(obj) {
		return new THREE.DirectionalLight(obj.direction, obj.diffuse, obj.specular);
	}

	private createScenePointLight(obj) {
		return new THREE.PointLight(obj.isUseNormal, obj.startAtten, obj.endAtten, obj.diffuse, obj.specular)
	}

	private createSceneSpotLight(obj) {
		return new THREE.SpotLight(
			obj.startAtten, obj.endAtten,
			obj.spotDirection, obj.spotCosCutoff, obj.spotExponent,
			obj.diffuse, obj.specular);
	}

	private initObjectComponent(obj: Json) {
		let impl;
		impl = impl || this.initMeshAndMeshRender(obj.meshRender, obj.geometry, obj.resTab);
		impl = impl || this.initSkinnedMeshRender(obj.skinnedMeshRender, obj.resTab);
		impl = impl || this.initCamera(obj.camera);
		impl = impl || this.initTextCon(obj.textCon, obj.resTab);
		impl = impl || this.initLight(obj.light);
		impl = impl || this.initParticleSystem(obj.particlesystem, obj.attachment, obj.resTab);
		impl = impl || this.initObject3D();

		return impl;
	}

	private initOtherComponent(obj: Json) {
		this.initBoxCollider(obj.boxCollider, obj.ref.impl);
		this.initTransform(obj.transform, obj.ref.impl, obj.textCon && obj.textCon.textcfg);
		this.initAnimator(obj.animator, obj.ref.impl, obj.resTab);
		if (obj.lookatOnce) {
			this.lookatOnce(obj.lookatOnce, obj.ref.impl);
		}
		
	}

	private initBoxCollider(boxCollider: Json, impl: Json) {
		if (boxCollider) {
			let min = new THREE.Vector3();
			min.fromArray(boxCollider.min);

			let max = new THREE.Vector3();
			max.fromArray(boxCollider.max);
			impl.settingBound = new THREE.Box3(min, max);
		}
	}

	private initTransform(transform: Json, impl: Json, textcfg: Json) {
		if (!transform)
			return;
		this.position(transform.position, impl);
		this.scale(transform.scale, impl, textcfg);
		this.rotate(transform.rotate, impl);
	}

	private initAnimator(animator: Json, impl: Json, resTab: ResTab) {
		if (!animator)
			return;
		impl.aniControl = animator.controller; //设置动画控制器
	}

	private initTextCon(textCon: Json, resTab: ResTab) {
		if (!textCon)
			return;
		let textcfg = textCon.textcfg;
		let impl;
		if (textcfg.isCommon) {
			impl = new THREE.ImageText();
			_LOAD.loadText(impl, textCon, this.renderer, resTab);
		} else {
			textcfg.text = textCon.show;
			impl = new THREE.Text2D(textCon, resTab, _LOAD.GeometryRes, _LOAD.TextureRes, _CANVAS);
		}
		return impl;
	}

	private initSkinnedMeshRender(skinnedMeshRender: Json, resTab: ResTab) {
		if (!skinnedMeshRender)
			return;

		let impl = _LOAD.newloadSkeletonMesh(this.renderer, skinnedMeshRender, resTab, this.maxBones, this.useVertexTexture);
		this.visible(skinnedMeshRender.visible, impl);
		return impl;
	}

	private initLight(light: Json) {
		if (!light)
			return;
		let impl;

		if (light.type === "Ambient") {
			impl = this.ambientLight = new THREE.AmbientLight(light.color);
		} else if (light.type === "Direction") {
			impl = new THREE.DirectionalLight(light.direction, light.diffuse, light.specular);
		}

		return impl;
	}

	private initParticleSystem(particlesystem: Json, attachment: string, resTab: ResTab) {
		if (!particlesystem)
			return;
		let scene = attachment === "2D" ? this.scene2D : this.scene;
		let impl = new ParticleSystem(particlesystem, scene, this.renderer, resTab);
		return impl;
	}

	private initMeshAndMeshRender(meshRender: Json, geo: Json, resTab: ResTab) {
		if (!meshRender)
			return;
		let impl;
		if (geo.type === "BufferGeometry")
			impl = _LOAD.newloadMesh(this.renderer, geo, meshRender, resTab);
		else if (geo.type === "Plane") {
			impl = _LOAD.newloadPlane(this.renderer, geo, meshRender, resTab);
		} else
			impl = _LOAD.newloadShape(this.renderer, geo, meshRender, resTab);

		this.visible(meshRender.visible, impl);
		return impl;
	}

	private initCamera(camera: Json) {
		if (!camera)
			return;

		let impl;
		if (camera.perspective) {
			let fov = camera.perspective[0], aspect = camera.perspective[1];
			let near = camera.perspective[2], far = camera.perspective[3];

			impl = this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		} else if (camera.ortho) {
			let l = camera.ortho[0], r = camera.ortho[1];
			let t = camera.ortho[2], b = camera.ortho[3];
			let n = camera.ortho[4], f = camera.ortho[5];

			impl = new THREE.OrthographicCamera(l, r, t, b, n, f);
			if (camera.scene3D) {
				this.camera = impl;
			} else {
				this.camera2D = impl;
			}
		}
		return impl;
	}

	private initObject3D() {
		return new THREE.Object3D();
	}

	private position(position: Array<number>, impl: Json) {
		if (!position)
			position = [0, 0, 0];
		impl.position.fromArray(position);
	}

	private scale(scale: Array<number>, impl: Json, textcfg: Json) {
		let s = scale ? [scale[0], scale[1], scale[2]] : [1, 1, 1];

		if (textcfg) {
			let zoomfactor = textcfg.zoomfactor ? textcfg.zoomfactor : 1;
			s[0] = s[0] / zoomfactor;
			s[1] = s[1] / zoomfactor;
		}
		impl.scale.fromArray(s);
	}

	private rotate(rotate: Array<number>, impl: Json) {
		if (!rotate)
			rotate = [0, 0, 0];
		impl.rotation.fromArray(rotate);
	}

	private lookatOnce(obj: Json, impl: Json) {
		if (obj.value) {
			_tmpPt.fromArray(obj.value);
			if (!_tmpPt.equals(impl.position)) {
				impl.lookAt(_tmpPt);
			}
		}
	}

	private lookat(value: Json, impl: Json) {
		if (value) {
			_tmpPt.fromArray(value);
			if (!_tmpPt.equals(impl.position)) {
				impl.lookAt(_tmpPt);
			}
		}
	}

	private playAnim(option: Json, impl: Json, attr: Array<string>, resTab: ResTab) {
		let content = impl.aniControl[option.name];
		if (!content) {
			console.warn(`控制器上不存在动画：${option.name}`);
			return;
		}

		_LOAD.loadAnimation(option.name, content, resTab, clip => {
			impl.playAnim(clip.link, option.isOnce, option.speed, option.id);
		});
	}

	private color(color: any, impl: Json, attr: Array<string>) {
		let obj = findProperty(impl, attr);
		obj.color = new THREE.Color(color);
	}

	private visible(isVisible, impl: Json) {
		if (isVisible !== undefined) {
			impl.visible = isVisible;
		}
		// if(impl.visible != undefined || isVisible !== undefined){
		// 	impl.visible = isVisible !== undefined ? isVisible : (impl.visible !== undefined ? impl.visible : true);
		// }
	}

	private textCon(textCon: Json, impl: Json, attr: Array<string>, resTab: ResTab) {
		if (textCon.textcfg.isCommon) {
			_LOAD.loadText(impl, textCon, this.renderer, resTab);
		} else {
			textCon.textcfg.text = textCon.show;
			impl.setText(textCon, resTab, _LOAD.GeometryRes, _LOAD.TextureRes, _CANVAS);
		}
	}

	private image(image: Json, impl: Json, attr: Array<string>, resTab: ResTab) {
		let target = findProperty(impl, attr);
		_LOAD.loadImage(image, resTab, img => {
			target.image = img;
			target.needsUpdate = true;
		});
	}

	private map(texture: Json, impl: Json, attr: Array<string>, resTab: ResTab) {
		let target = findProperty(impl, attr);
		_LOAD.loadImgTexture(texture.image, this.renderer, resTab, texture => {
			target.map = texture;
		});
	}
    //test
	private mapst(texture: Json, impl: Json, attr: Array<string>, resTab: ResTab) {
		let target = findProperty(impl, attr);
        
	    target.mapst = new THREE.Vector4(texture[0], texture[1], texture[2], texture[3]);
		//THREE
	}

	private geometry(geo: Json, impl: Json, attr: Array<string>, resTab: ResTab) {
		_LOAD.newloadGeo(this.renderer, geo, impl, resTab);
	}
}

const findProperty = (obj: Json, attr: Array<string>) => {
	let target = obj;
	if (attr.length == 1)
		return target;

	for (let i = 0; i < attr.length - 1; i++) {
		if (obj instanceof THREE.Object3D && attr[i].endsWith("Render"))
			continue;
		target = target[attr[i]];
		if (!target)
			throw "属性不存在";
	}
	return target;
}

const bindBone = (skeleton: Json, objs: Array<Json>) => {
	let bones = skeleton.bones;
	for (let i = 0; i < objs.length; i++) {
		for (let j = 0; j < bones.length; j++) {
			if (bones[j].name === objs[i].bindBone)
				bones[j].add(objs[i].ref.impl);
		}
	}
}