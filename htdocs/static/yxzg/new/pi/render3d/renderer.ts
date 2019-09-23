/**
 * 
 */
import { createScene, SceneData } from './scene';
import { THREE } from './three';

let sceneGUI : THREE.Scene,
 rt : THREE.WebGLRenderTarget,
 guiCamera:THREE.OrthographicCamera;

export function renderGUI(impl: THREE.WebGLRenderer, deltaMS,isClear?) {
	if(isClear)impl.autoClear = !0;
	if(sceneGUI){
		impl.render(sceneGUI, guiCamera, deltaMS);
	} 
}

export function resetThreeStore(impl: THREE.WebGLRenderer) {
	if ((<any>window).vdocument) {
		(<any>window).vdocument.render();
	}
	impl.resetThreeStore();
}

/**
 * @description Renderer 
 */
export class Renderer {

	private canUseVertexTexture: boolean;
	public impl: THREE.WebGLRenderer;
	private size: { width: number; height: number };
	public rt:THREE.WebGLRenderTarget;
	/**
	 * @description 构造函数
	 * @param antialias 是否抗锯齿，默认不开
	 */
	constructor(width: number, height: number, antialias: boolean = false, ratio: number = 1.0, canvas?: HTMLCanvasElement) {
		let _width = width,_height = height;
		
		this.canUseVertexTexture = false;

		this.impl = new THREE.WebGLRenderer({
			canvas: canvas,
			alpha: true,
			antialias: antialias
		});
		this.size = {
			width: _width,
			height: _height
		};

		this.impl.autoClear = true;

		this.impl.setSize(_width, _height);
		this.impl.setPixelRatio(ratio);

		if (this.impl.capabilities) {
			const nVertexUniforms = this.impl.capabilities.maxVertexUniforms;

			const maxBones = Math.floor((nVertexUniforms - 60) / 4);
			if (maxBones < 40) {
				console.log(`+++ warning: maxBones = ${maxBones} < 40, useVertexTexture: ${this.canUseVertexTexture}`);
				this.canUseVertexTexture = this.impl.capabilities.floatVertexTextures > 0;
			}
		}
		
		sceneGUI = new THREE.Scene();
		sceneGUI.add(new THREE.AmbientLight([1, 1, 1]));
		let maxSize = Math.max(_width, _height);

		let rtSize = 2;
		while (rtSize < maxSize) {
			rtSize *= 2;
		}

		rt = new THREE.WebGLRenderTarget(rtSize, rtSize, {
			magFilter: THREE.NearestFilter,
			minFilter: THREE.NearestFilter,
		});

		rt.texture.generateMipmaps = false;  

		this.impl.setRenderTarget(rt);
		this.rt = rt;
		let plan = new THREE.PlaneBufferGeometry(_width, _height, 1, 1);


		let u = _width / rtSize, v = _height / rtSize;
		let uvs = new Float32Array([0, v, u, v, 0, 0, u, 0]);
		plan.addAttribute("uv", new THREE.BufferAttribute(uvs, 2));

		let planMaterial1 = new THREE.MeshBasicMaterial({ map: rt.texture });
		//  let planMaterial1 = new THREE.MeshBasicMaterial( {color: 0xff9300} );
		planMaterial1.opacity = 1;
		planMaterial1.transparent = true; 

		let plan1 = new THREE.Mesh(plan, planMaterial1);

		plan1.position.z = 0;
		sceneGUI.add(plan1);

		guiCamera = new THREE.OrthographicCamera(_width / 2, -_width / 2, _height / 2, -_height / 2, -1000, 1000);
		
	}

	/**
	 * @description 是否可用顶点纹理
	 */
	public useVertexTexture() {
		return this.canUseVertexTexture;
	}

	/**
	 * @description 设置canvas的清空色
	 * rgb：十六进制整数表示的颜色值，0xRRGGBB
	 * alpha: [0, 1]
	 */
	// tslint:disable-next-line:typedef
	public setClearColor(rgb, alpha) {
		this.impl.setClearColor(rgb, alpha);
	}

	/**
	 * @description 是否设备丢失
	 */
	public isContextLost() {
		return this.impl.isContextLost();
	}

	/**
	 * @description 强制设备丢失
	 */
	public forceContextLoss() {
		this.impl.forceContextLoss();
	}

	/**
	 * 更新几何体
	 */
	// tslint:disable-next-line:typedef
	public updateGeometry(mesh) {
		this.impl.updateGeometry(mesh);
	}
	/**
	 * 设置纹理
	 */
	// tslint:disable-next-line:typedef
	public setTexture2D(texture) {
		this.impl.setTexture2D(texture, 0);
	}

	/**
	 * @description 取Threejs渲染器
	 */
	public getThreeRenderer() {
		return this.impl;
	}

	/**
	 * @description 返回canvas标签
	 */
	public getCanvas() {
		return this.impl.domElement;
	}

	/**
	 * @description 设置canvas和webgl环境的宽高
	 */
	// tslint:disable-next-line:typedef
	public setSize(width, height) {

		this.size.width = width;
		this.size.height = height;

		this.impl.setSize(width, height);
	}

	/**
	 * @description 获取canvas和webgl环境的宽高
	 */
	public getSize() {
		return this.size;
	}

	/**
	 * @description 创建对应的渲染场景
	 * @return Scene的实例
	 */
	public createScene(data: SceneData) {
		return createScene(this, data);
	}
}