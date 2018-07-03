
/**
 * 2d骨骼动画测试
 */
import { Spine as spine } from '../../../render3d/spine';
import { THREE } from '../../../render3d/three';
import { getRealNode, paintCmd3 } from '../../../widget/painter';
import { Widget } from '../../../widget/widget';
import { ResTab } from '../../../util/res_mgr';
import { loadString, RES_TYPE_STRING, loadTextureAtlas, RES_TYPE_TEXTURE_ATLAS, loadImage, loadImgTexture, parseUrl } from '../../../render3d/load';
import { Renderer } from '../../../render3d/renderer';

let camera: any;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let canvas: any;
// let assetManager: any;
let mesh: any;
let skeletonMesh: any;
let baseUrl = '../examples/render/spine/assets/';
let baseUrl1 = 'examples/render/spine/assets/';
let atlasFile = 'raptor.atlas';
let skeletonFile = 'raptor-pro.json';
let atlasImage = 'raptor.png';
let animation = "walk";
let lastFrameTime = 0;
let resTab;

let loadOk = false;

export class SpineDemo extends Widget {
	public create(): void {
		super.create();
		this.init();
	}
	public init(): void {
	}

	public firstPaint(): void {
		console.log();
		this.initSpine();
	}

	public initSpine() {
		// create the THREE.JS camera, scene and renderer (WebGL)
		const width = window.innerWidth;
		const height = window.innerHeight;
		camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
		camera.position.y = 100;
		camera.position.z = 400;

		scene = new THREE.Scene();
		scene.add(camera);
		renderer = new THREE.WebGLRenderer({});
		renderer.setSize(width, height);
		const rootDom = getRealNode(this.tree);
		rootDom.appendChild(renderer.domElement);
		canvas = renderer.domElement;

		// load the assets required to display the Raptor model
		resTab = new ResTab();
		loadString(`${skeletonFile}`, resTab, (r) => {
			loadImgTexture({ name: `${atlasImage}` }, <any>renderer, resTab, (r) => {
				loadTextureAtlas(`${atlasFile}`, resTab, (r) => {
					loadOk = true;
				});
			})
		});


		// assetManager = new spine.threejs.AssetManager(baseUrl);
		// assetManager.loadText(skeletonFile);//加载字符串
		// assetManager.loadTextureAtlas(atlasFile);

		requestAnimationFrame(load);
	}

}

export const testF = () => {
	return {
		camera: camera,
		mesh: mesh,
		scene: scene,
		resTab: resTab
	};
}

export const setCameraPosition = (x, y, z) => {
	camera.position.x = x
	camera.position.y = y
	camera.position.z = z
}

export const setmeshPosition = (x, y, z) => {
	mesh.position.x = x
	mesh.position.y = y
	mesh.position.z = z
}

const load = () => {
	if (loadOk) {
		// Add a box to the scene to which we attach the skeleton mesh
		const geometry = new THREE.BoxGeometry(200, 200, 200);
		const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Load the texture atlas using name.atlas and name.png from the AssetManager.
		// The function passed to TextureAtlas is used to resolve relative paths.
		// const atlas = assetManager.get(atlasFile);
		const atlas = resTab.get(`${RES_TYPE_TEXTURE_ATLAS}:${parseUrl(atlasFile)}`).link

		// Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
		const atlasLoader = new spine.AtlasAttachmentLoader(atlas);

		// Create a SkeletonJson instance for parsing the .json file.
		const skeletonJson: any = new spine.SkeletonJson(atlasLoader);

		// Set the scale to apply during parsing, parse the file, and create a new skeleton.
		skeletonJson.scale = 0.4;
		// const data = assetManager.get(skeletonFile);
		const data = resTab.get(`${RES_TYPE_STRING}:${parseUrl(skeletonFile)}`).link;
		const skeletonData = skeletonJson.readSkeletonData(data);

		// Create a SkeletonMesh from the data and attach it to the scene
		// 内部处理有调整部分代码
		skeletonMesh = new spine.threejs.SkeletonMesh(skeletonData);
		skeletonMesh.state.setAnimation(0, animation, true);
		//skeletonMesh.batches[0].material.side = 2;
		scene.add(skeletonMesh);

		requestAnimationFrame(render);
	} else requestAnimationFrame(load);
};

const render = () => {
	// calculate delta time for animation purposes
	const now = Date.now() / 1000;
	const delta = now - lastFrameTime;
	lastFrameTime = now;

	// resize canvas to use full page, adjust camera/renderer
	resize();

	// // rotate the cube
	// mesh.rotation.x = Math.sin(now) * Math.PI * 0.2;
	// mesh.rotation.y = Math.cos(now) * Math.PI * 0.4;
	// // console.log(mesh.rotation.x,mesh.rotation.y)

	// update the animation
	skeletonMesh.update(delta);

	// render the scene
	renderer.render(scene, camera, now * 1000);

	requestAnimationFrame(render);
};

const resize = () => {
	const w = window.innerWidth;
	const h = window.innerHeight;
	if (canvas.width !== w || canvas.height !== h) {
		canvas.width = w;
		canvas.height = h;
	}

	camera.aspect = w / h;
	camera.updateProjectionMatrix();

	renderer.setSize(w, h);
};