/**
 * 
 */
// ============================== 导入

import { butil, depend, load } from '../lang/mod';
import { Json } from '../lang/type';
import * as _CANVAS from '../util/canvas';
import { info, LogLevel, warn } from '../util/log';
import { BlobType, loadError, loadOK, register, Res, RES_TYPE_BLOB, RES_TYPE_FILE, ResTab, getResMap } from '../util/res_mgr';
import { compile, toFun } from '../util/tpl';
import { Parser } from '../util/tpl_str';
import { toJson, unique } from '../util/util';
import { create, request } from '../worker/client';
import { decodeDrc } from './drc_parser';
import { Renderer } from './renderer';
import { THREE } from './three';
import { TextureAtlas, ThreeJsTexture } from './texture_atlas';

export const RES_PATH = 'res/';
const TERRAIN_PATH = 'terrain/';

export class Animation {
	public des: Json;
	public arrayBuffer: ArrayBuffer;
}

/**
 * @description 纹理资源
 * @example
 */
export class TextureRes extends Res {
	/**
	 * @description 创建
	 * @example
	 */
	public create(data: any): void {
		this.link = data;
	}

	/**
	 * @description 销毁，需要子类重载
	 * @example
	 */
	public destroy(): void {
		if (this.link) {
			this.link.dispose();
			this.link.image = null;
			this.link = null;
			this.args = null;
		}
	}
}

/**
 * @description Geometry资源
 * @example
 */
export class GeometryRes extends Res {
	/**
	 * @description 创建
	 * @example
	 */
	public create(data: any): void {
		this.link = data;
	}

	/**
	 * @description 销毁，需要子类重载
	 * @example
	 */
	public destroy(): void {
		if (Array.isArray(this.link)) {
			for (const value of this.link) {
				value.dispose();
			}
		} else if (this.link) {
			this.link.dispose();
		}
	}
}

// 分割url成两部分
const splitPath = (url: string) => {
	let urlPath = '';
	let urlFile = url;
	const result = /(.*)\/(.*)/.exec(url);
	// tslint:disable-next-line:prefer-type-cast
	if (result) [, urlPath, urlFile] = result;

	return { urlPath, urlFile };
};
/**
 * @description 获取 geo 自动转换成同名的drc, drc必须在depend中存在
 * @example
 */
const getTransDrcName = (name: string): string => {
	const suf = butil.fileSuffix(name);
	if (suf !== 'geo') {
		return name;
	}
	const s = `${name.slice(0, name.length - suf.length)}drc`;

	return depend.get(s) ? s : name;
};

// 从场景或者配置中找到资源
// tslint:disable-next-line:no-reserved-keywords
export const findRes = (content: Json, type: string, key?: string) => {
	const res = [];
	const isRes = (name: string) => {

		if (typeof name !== 'string') {
			return false;
		}

		return name.endsWith('.ai')
			|| name.endsWith('.geo')
			|| name.endsWith('.drc')
			|| name.endsWith('.png')
			|| name.endsWith('.jpg')
			|| name.endsWith('.skl')
			|| name.endsWith('.rtpl');
	};

	const findFromScene = (con: Json) => {
		for (const k in con) {
			const v = con[k];
			if (typeof v === 'object') {
				if (v === null) {
					continue;
				} else {
					findFromScene(v);
				}
			} else if (v && isRes(con[k])) {
				res.push(con[k]);
			}

		}
	};

	const findFromCfg = (con: Json, k) => {
		const v = con[k];
		if (!con[k]) {
			throw new Error('找不到对应的key');
		}
		for (const i in v.res) {
			res.push(v.res[i]);
		}
		res.push(v.tpl);

		if (v.aniControl) {
			const ani = con.ainMod[v.aniControl];
			for (let j = 0; j < ani; j++) {
				res.push(ani[j]);
			}
		}
	};

	if (type === 'scene') {
		findFromScene(content);
	} else if (type === 'cfg') {
		if (key) {
			findFromCfg(content, key);
		} else {
			for (const k in content) {
				if (k !== 'ainMod') {
					findFromCfg(content, k);
				}
			}
		}
	}

	return unique(res);
};

export let configMap = new Map();

// 资源配置路径表，键是去去掉前缀的资源路径，值是全路径
export let resConfigPathMap = new Map();

export const getConfigMap = () => {
	return configMap;
};

// 从配置表里面寻找文件，找不到抛异常 
export const findConfigFile = (path) => {
	if (!path.startsWith('RES_TYPE_IMGTEXT')) {
		path = resConfigPathMap.get(path);
	}
	let data = configMap.get(path);

	if (!data) {
		const content = `findFile 404, path = ${path}`;

		warn(LogLevel.warn, content);
		throw new Error(content);
	}

	if (data instanceof ArrayBuffer && !path.endsWith('.ai') && !path.endsWith('.rtpl')) {
		data = toJson(butil.utf8Decode(data));
		configMap.set(path, data);
	}

	return data;
};

export const addSceneRes = (fileArray, resPrefix = '') => {

	const resTab = new ResTab();
	resTab.timeout = 0;

	if (!resPrefix.endsWith('/')) resPrefix += '/';

	// 空字符串对应的全局路径
	resConfigPathMap.set('', resPrefix);

	for (const path in fileArray) {
		if (!path.startsWith(resPrefix)) {
			continue;
		}

		// 纪录局部路径和全局路径的键
		resConfigPathMap.set(path.slice(resPrefix.length), path);

		const isJson = jsonSuffixs.some(value => path.endsWith(value));
		if (isJson) {
			configMap.set(path, fileArray[path]);
		} else if (BlobType[butil.fileSuffix(path)]) {
			resTab.load(`${RES_TYPE_BLOB}:${path}`, RES_TYPE_BLOB, path, fileArray);

		} else {
			resTab.load(`${RES_TYPE_FILE}:${path}`, RES_TYPE_FILE, path, fileArray);
		}
	}

	resTab.release();
};

const jsonSuffixs = ['.scene', '.rtpl', '.json', '.nav'];

const meshGeo = (res, renderer, mesh) => {
	if (mesh._isDestroy) {
		return;
	}

	mesh.boundingBox = mesh.boundingBox || new THREE.Box3();
	mesh.setGeometry(res.link);
	mesh.boundingBox.union(res.link.boundingBox);
	renderer.updateGeometry(mesh);
};

export const meshTex = (tex: THREE.Texture, material: Json, texKey: string, index: number, mesh: Json, renderer: Renderer) => {
	const texData = material[texKey];
	if (texData.mapping) tex.mapping = texData.mapping;
	if (texData.wrap) {
		tex.wrapS = texData.wrap[0];
		tex.wrapT = texData.wrap[1];
	}
	if (texData.filter) {
		tex.magFilter = texData.filter[0];
		tex.minFilter = texData.filter[1];
	}
	if (texData.generateMipmaps !== undefined) tex.generateMipmaps = texData.generateMipmaps;

	if (mesh.material) {
		mesh.setTexture(tex, texKey, index);
	}

};

// 所有纹理，包括光照贴图等
export const setMaterials = (resTab: ResTab, renderer: Renderer, mesh, render, callBack: Function, geotype?) => {
	if (!render || !render.material) {
		return;
	}
	const materials = render.material;

	const mapKeyOR = {
		map: 'mapst', lightMap: 'lightmapst', _Splat0: '_splat0st',
		_Splat1: '_splat1st', _Splat2: '_splat2st', _Control: '_controlst', ASMMap: 'asmmapst', NAHMap: 'nahmapst', EmissionMap: 'emissionmapst'
	};

	const func = (material, index) => {
		for (const k in mapKeyOR) {
			if (material[k]) {
				if (material[k].offset || material[k].repeat) {
					material[mapKeyOR[k]] = getST(material[k]);
				}
				loadImgTexture(material[k].image, renderer, resTab, butil.curryFirst(callBack, material, k, index, mesh, renderer));
			}
		}
	};

	if (geotype === 'Plane' && Array.isArray(materials)) {
		func(materials[0], -1);
		mesh.setMaterial(materials[0]);
	} else if (Array.isArray(materials)) {
		for (let i = 0; i < materials.length; i++) {
			const material = materials[i];
			func(material, i);
			mesh.setMaterial(material, i);
		}
	} else {
		func(render.material, -1);
		mesh.setMaterial(render.material);
	}

};

const getST = (obj: Json): number[] => {
	const or = [1, 1, 0, 0];
	if (obj.repeat) {
		or[0] = obj.repeat[0];
		or[1] = obj.repeat[1];
	}
	if (obj.offset) {
		or[2] = obj.offset[0];
		or[3] = obj.offset[1];
	}

	return or;
};

const terrainGeo = (res, tmesh) => {
	if (tmesh._isDestroy) {
		return;
	}

	tmesh.boundingBox = tmesh.boundingBox || new THREE.Box3();
	const geometry = res.link;
	tmesh.setGeometry(geometry);
	tmesh.boundingBox.union(geometry.boundingBox);
};

const terrainTex = (tex: THREE.Texture, texData: Json, property: string, index: number, tmesh: Json) => {
	if (tmesh._isDestroy) {
		return;
	}

	if (texData.mapping) tex.mapping = texData.mapping;
	if (texData.wrapS) tex.wrapS = texData.wrapS;
	if (texData.wrapT) tex.wrapT = texData.wrapT;
	if (texData.generateMipmaps !== undefined) tex.generateMipmaps = texData.generateMipmaps;

	tex.needsUpdate = true;
	tmesh.setTexture(property, tex);
};

const parseGeoImpl = (data, callBack) => {
	const i32 = new Int32Array(data, 16, 3);
	const vtCount = i32[0];// 顶点数量 4字节
	const subCount = i32[1];// 子网格数量 4字节
	const decLength = i32[2];// 描述信息字节数 4字节
	const subSLlen = subCount * 4 * 2;
	const subSL = new Int32Array(data, 28, subCount * 2);// 子网格的索引偏移， 子网格索引数量; subSLlen字节
	const dec = new Int32Array(data, subCount * 4 * 2 + 28, decLength / 4);// 描述信息
	const attrDes = [['index', 1], ['position', 3], ['normal', 3], ['tangent', 3],
	['skinIndex', 4], ['uv', 2], ['uv2', 2], ['uv3', 2], ['uv4', 2], ['skinWeight', 4], ['color', 4]];
	const geometry = new THREE.BufferGeometry();

	const addAttribute = (offset: number, length: number, geometry: THREE.BufferGeometry, attrDes: (string | number)[]) => {
		const attr = new Float32Array(data, offset, length / 4);
		geometry.addAttribute(attrDes[0], new THREE.BufferAttribute(attr, attrDes[1]));
	};

	const addUv2 = (offset: number, length: number, geometry: THREE.BufferGeometry) => {
		if (length > 0) {
			const attr = new Float32Array(data, offset, length / 4);
			geometry.addAttribute('uv2', new THREE.BufferAttribute(attr, 2));
		}
	};

	const setIndex = (offset: number, length: number, geometry: THREE.BufferGeometry) => {
		let indices;
		if (length < 65536 * 2) {
			indices = new Uint16Array(data, offset, length / 2);
		} else {
			indices = new Uint32Array(data, offset, length / 4);
		}
		geometry.setIndex(new THREE.BufferAttribute(indices, 1));
	};

	let i = 0;
	while (i < dec.length) {
		// tslint:disable-next-line:no-reserved-keywords
		const type = dec[i];
		if (type === 0) {
			setIndex(dec[i + 1], dec[i + 2], geometry);
		} else if (type === 6) {
			addUv2(dec[i + 1], dec[i + 2], geometry);
		} else {
			addAttribute(dec[i + 1], dec[i + 2], geometry, attrDes[type]);
		}

		i += 3;
	}

	for (i = 0; i < subCount; i++) {
		geometry.addGroup(subSL[i * 2], subSL[i * 2 + 1], i);
	}

	geometry.computeVertexNormals();
	geometry.computeBoundingBox();
	geometry.elementsNeedUpdate = true;

	callBack(geometry);
};

export const parseDrcImpl = (data: ArrayBuffer, callBack) => {
	const t = new Int32Array(data, 0, 2); // [子网格数量， 描述信息长度]
	const subCount = new Int32Array(data, 0, 2)[0];// 子网格数量
	const decL = new Int32Array(data, 0, 2)[1];// 描述信息长度
	const subSL = new Int32Array(data, 8, subCount * 2);// 子网格的索引偏移， 子网格索引数量;
	const dec = new Int32Array(data, subCount * 2 * 4 + 8, decL / 4);// 描述信息； 类型， id，类型， id.....
	const info = data.slice(subCount * 2 * 4 + decL + 8, data.byteLength);// 详细信息(drc格式的数据)
	// tslint:disable:prefer-type-cast
	const attrDes = [['index', 1], ['position', 3, 'POSITION'], ['normal', 3, 'NORMAL'], ['tangent', 3],
	['skinIndex', 4, 'GENERIC'], ['uv', 2, 'TEX_COORD'], ['uv2', 2, 'TEX_COORD'], ['uv3', 2, , 'TEX_COORD'],
	['uv4', 2, , 'TEX_COORD'], ['skinWeight', 4, 'GENERIC'], ['color', 4, 'COLOR']];
	const attrMap = {};
	for (let i = 0; i < dec.length / 2; i++) {
		attrMap[attrDes[dec[i * 2]][0]] = dec[i * 2 + 1];
	}
	decodeDrc(info, attrMap, (geometry: THREE.BufferGeometry) => {
		for (let i = 0; i < subCount; i++) {
			geometry.addGroup(subSL[i * 2], subSL[i * 2 + 1], i);
		}
		geometry.computeVertexNormals();
		geometry.computeBoundingBox();
		geometry.elementsNeedUpdate = true;
		callBack(geometry);
	});
};

/**
 * data
 * 16字节: ANIMATION_1.0
 * 4字节: 描述信息偏移量
 * 4字节: 描述信息长度
 * float二进制数据
 * 描述信息：
 * 
 * property:["position.x","position.y","position.z"],  // 属性名称
 * length: [],                                         // 与property一一对应，为每个属性的关键帧帧数
 * keys: ["time"，"value", "inTangent", "outTangent"], // 目前只有4个元素，关键帧导出信息的Key
 * content: [offset, offset, offset, offset],          // 描述每帧、每个key的数据的offset	
 */
const parseAnimation = (name: string, data: ArrayBuffer) => {

	if (!data) {
		console.error('  no arrayBuffer in data');

		return null;
	}
	const desOffset = new Int32Array(data, 16, 1)[0];
	const desLen = new Int32Array(data, 20, 1)[0];
	const des = JSON.parse(THREE.AnimationUtils.utf8Decode(data.slice(desOffset, desOffset + desLen)));

	const tracks = [];
	let duration = -1;
	const clipName = name || 'default';
	const keyLen = des.keys.length;
	const keys = des.keys;
	const indexMap = {
		time: undefined,
		value: undefined,
		inTangent: undefined,
		outTangent: undefined
	};
	for (let i = 0; i < keyLen; i++) {
		indexMap[keys[i]] = i;
	}

	if (indexMap.time === undefined) {
		throw new Error('动画文件缺少times属性');
	}
	if (!indexMap.value === undefined) {
		throw new Error('动画文件缺少values属性');
	}

	for (let i = 0; i < des.property.length; i++) {
		const begin = i * keyLen;
		const tvLen = (des.content[begin + 1] - des.content[begin]) / 4;
		const times = new Float32Array(data, des.content[begin + indexMap.time], tvLen);
		const values = new Float32Array(data, des.content[begin + indexMap.value], tvLen);

		let inTangent;
		let outTangent;
		if (indexMap.inTangent !== undefined) {
			if (des.content[begin + indexMap.inTangent] !== -1) {
				inTangent = new Float32Array(data, des.content[begin + indexMap.inTangent], tvLen);
			}
		}

		if (indexMap.outTangent !== undefined) {
			if (des.content[begin + indexMap.outTangent] !== -1) {
				outTangent = new Float32Array(data, des.content[begin + indexMap.outTangent], tvLen);
			}
		}

		if (outTangent === undefined) {
			outTangent = inTangent;
		}

		if (times.length !== 0) {
			let mode = THREE.InterpolateLinear;
			if (inTangent) {
				mode = THREE.InterpolateSmooth;
			}
			const attr = des.property[i];
			const track = new THREE.KeyframeTrack(attr, times, values, mode);
			track.setTangent(inTangent, outTangent);
			tracks.push(track);
		}

		if (times[times.length - 1] > duration) {
			duration = times[times.length - 1];
		}
	}

	if (tracks.length === 0) {
		return null;
	}

	const clip = new THREE.AnimationClip(clipName, duration, tracks);

	return clip;
};

const parseSkeleton = (data: ArrayBuffer) => {
	const transformLen = new Int32Array(data, 16, 1)[0];
	const indexLen = new Int32Array(data, 20, 1)[0];
	const nameLen = new Int32Array(data, 24, 1)[0];

	const transforms = new Float32Array(data, 28, transformLen / 4);
	const indexs = new Int16Array(data, transformLen + 28, indexLen / 2);
	const names = butil.utf8Decode(data.slice(indexLen + transformLen + 28, indexLen + transformLen + nameLen + 28)).split(',');

	const bones = [];
	for (let i = 0; i < names.length; i++) {
		const start = i * 10;
		const bone: Json = {};
		bone.name = names[i];
		bone.parent = indexs[i];
		bone.pos = [transforms[start], transforms[start + 1], transforms[start + 2]];
		bone.rotq = [transforms[start + 3], transforms[start + 4], transforms[start + 5], transforms[start + 6]];
		bone.scl = [transforms[start + 7], transforms[start + 8], transforms[start + 9]];
		bones[i] = bone;
	}

	return bones;
};

export const parseGeometry = (path: string, resTab: ResTab, callBack: Function) => {
	const p = resConfigPathMap.get(path);
	path = p !== undefined ? p : resConfigPathMap.get('') + path;
	path = getTransDrcName(path);

	const key = `${RES_TYPE_GEOMETRY}:${path}`;
	const data = new GeometryData();
	data.resTab = resTab;
	if (path.split('.')[1] === 'drc') {
		data.parseFun = parseDrcImpl;
	} else {
		data.parseFun = parseGeoImpl;
	}

	resTab.load(key, RES_TYPE_GEOMETRY, path, data, callBack);
};

/**
 * 加载动画，返回动画clip
 */
export const loadAnimation = (name, fileName, resTab, cb) => {
	fileName = RES_PATH + fileName;
	let path = resConfigPathMap.get(fileName);
	path = path !== undefined ? path : resConfigPathMap.get('') + fileName;

	const key = `${RES_TYPE_ANIMATION}:${path}`;

	const data = new AnimationData();
	data.resTab = resTab;
	data.name = name;

	resTab.load(key, RES_TYPE_ANIMATION, path, data, clip => {
		cb(clip);
	});
};

/**
 * 加载网格
 */
export const newloadMesh = (renderer: Renderer, geo: Json, render: Json, resTab: ResTab) => {
	const mesh = new THREE.Mesh();
	const url = geo.res;
	setMaterials(resTab, renderer, mesh, render, meshTex);
	parseGeometry(RES_PATH + url, resTab, butil.curryFirst(meshGeo, renderer, mesh));

	return mesh;
};

/**
 * 加载网格(不包含材质)
 */
export const newloadGeo = (renderer: Renderer, geo: Json, impl: THREE.Mesh, resTab: ResTab) => {
	if (geo.type === 'BufferGeometry') {
		const url = geo.res;
		parseGeometry(RES_PATH + url, resTab, butil.curryFirst(meshGeo, renderer, impl));
	} else if (geo.type === 'Plane') {
		impl.setGeometry(createPlane(resTab, geo.width || 1, geo.height || 1, 1, 1, geo.horizontalAlign, geo.verticalAlign));
		renderer.updateGeometry(impl);
	} else {
		impl.setGeometry(createBox(resTab, geo.width || 1, geo.height || 1, geo.longness || 1));
		renderer.updateGeometry(impl);
	}
};

/**
 * 加载骨骼网格
 */
export const newloadSkeletonMesh = (renderer: Renderer, skinnedMeshRender: Json,
	resTab: ResTab, maxBones: number, useVertexTexture: boolean) => {
	const mesh = new THREE.SkinnedMesh();
	mesh.setMaxBones(maxBones);
	mesh.setUseVertexTexture(useVertexTexture);

	const url = skinnedMeshRender.geometry.res;

	mesh.setBoundBone(skinnedMeshRender.bounds, skinnedMeshRender.rootbone);
	if (skinnedMeshRender.boundVisible) {
		mesh.setBoundVisible();
	}
	setMaterials(resTab, renderer, mesh, skinnedMeshRender, meshTex);
	parseGeometry(RES_PATH + url, resTab, butil.curryFirst(meshGeo, renderer, mesh));

	return mesh;
};

export const createBox = (resTab: ResTab, x, y, z) => {
	const key = `${RES_TYPE_GEOMETRY}-Box:${x},${y},${z}`;
	const res = resTab.get(key);
	if (res) return res.link;

	const box = new THREE.BoxBufferGeometry(x, y, z);
	resTab.createRes(key, RES_TYPE_GEOMETRY, undefined, GeometryRes, box);

	return box;
};

/**
 * 加载规则的几何体(目前只实现了立方体)
 */
export const newloadShape = (renderer: Renderer, geo: Json, render: Json, resTab: ResTab): THREE.Mesh => {
	let g;
	// tslint:disable-next-line:prefer-const
	let m;
	g = createBox(resTab, geo.width || 1, geo.height || 1, geo.longness || 1);

	const materials = render.material;
	if (render.attachment === '2D') {
		m.enableLight = false;
	}
	const mesh = new THREE.Mesh(g);
	render.material[1] = render.material[0];
	render.material[2] = render.material[0];
	render.material[3] = render.material[0];
	render.material[4] = render.material[0];
	render.material[5] = render.material[0];
	setMaterials(resTab, renderer, mesh, render, meshTex);

	return mesh;
};

/**
 * 加载四边形
 */
export const newloadPlane = (renderer: Renderer, geo: Json, render: Json, resTab: ResTab): THREE.Mesh => {
	let g;
	// tslint:disable-next-line:prefer-const
	let m;
	g = createPlane(resTab, geo.width || 1, geo.height || 1, 1, 1, geo.horizontalAlign, geo.verticalAlign);
	const mesh = new THREE.Mesh(g);
	setMaterials(resTab, renderer, mesh, render, meshTex, geo.type);

	return mesh;
};

export const createPlane = (resTab: ResTab, w, h, cw, ch, horizontalAlign, verticalAlign) => {
	const key = `geometry-Plane:${w},${h},${cw},${ch},${horizontalAlign},${verticalAlign}`;

	const res = resTab.get(key);
	if (res) return res.link;

	const plane = new THREE.PlaneBufferGeometry(w, h, cw, ch, horizontalAlign, verticalAlign);
	resTab.createRes(key, RES_TYPE_GEOMETRY, undefined, GeometryRes, plane);

	return plane;
};

/**
 * 加载并解析骨骼
 */
export const newloadSkeleton = (fileName: string, resTab: ResTab, callBack: Function) => {
	const url = RES_PATH + fileName;
	let path = resConfigPathMap.get(url);
	path = path !== undefined ? path : resConfigPathMap.get('') + url;

	const key = `${RES_TYPE_SKELETON}:${path}`;
	resTab.load(key, RES_TYPE_SKELETON, path, resTab, bones => {
		callBack(bones.link);
	});
};

export const loadTerrain = (url: string, renderer: Renderer, resTab: ResTab = null, cb) => {

	const json = findConfigFile(TERRAIN_PATH + url);
	const paths = [{ name: TERRAIN_PATH + json.image1 }, { name: TERRAIN_PATH + json.image2 }, { name: TERRAIN_PATH + json.image3 }];

	loadImgTextures(paths, renderer, resTab, (texs) => {
		const blend = json.blend;
		const terrain = new THREE.Terrain(json.width, json.height, blend.width, blend.height);

		terrain.setTexture(0, texs[0]);
		terrain.setTexture(1, texs[1]);
		terrain.setTexture(2, texs[2]);
		terrain.setTextureIsReady();
		texs = undefined;

		// Blend

		terrain.setBlendSeed(blend.seed[0], blend.seed[1], blend.seed[2], blend.seed[3]);

		terrain.setBlendCoff(blend.constCoff1, blend.linearCoff1, blend.constCoff2, blend.linearCoff2);

		terrain.setBlendFrequency(blend.frequency1, blend.frequency2, blend.frequency3);

		terrain.setBlendClamp(blend.oneClamp, blend.zeroClamp, blend.middleValue);

		terrain.updateBlend(renderer.getThreeRenderer());

		cb && cb(terrain);
	});
};

/**
 * 加载文字
 */
export const loadText = (text: THREE.ImageText, textCon: Json, renderer: Renderer, resTab: ResTab) => {
	const textcfg = textCon.textcfg;
	const key = _CANVAS.getImgTextKey(textcfg, 'texture');
	const res = resTab.get(key);
	let _index  = 0;
	debugger
	const fun = (texture) => {
		const shows = (!textCon.show) ? [] : textCon.show.split('');
		const uvs = [];
		for (let i = 0; i < shows.length; i++) {
			if (!texture.args.charUV[shows[i]]) {
				throw new Error('loadText: charUV isn\'t exist');
			}
			uvs.push(texture.args.charUV[shows[i]]);
		}

		text.setTexture(texture.link);

		if (!uvs || uvs.length === 0) {
			text.visible = false;

			return;
		} else {
			text.visible = true;
		}

		const alignModHorizon = textCon.horizontalAlign || 'left';
		const alignModVertical = textCon.verticalAlign || 'top';
		// tslint:disable-next-line:max-line-length
		//let gk = `geometry-Plane:${texture.args.width},${texture.args.height},${1},${1},${alignModHorizon},${alignModVertical}`
		let geometry;
		const textSize = {};
		//const res = resTab.get(gk);
		if(text["parent"]){
			for(let i in text["parent"].children){
				if(text["parent"].children[i].type == "ImageText"){
					_index++
				}
			}
		}
		if(_index == 0){
			return;
		}

		//if (res) {
			// geometry = res.link;
		//} else {
			geometry = text.createTxPlaneBufferGeometry(uvs, texture.args.width, texture.args.height,
				textCon.width, alignModHorizon, alignModVertical, textSize);
			//resTab.createRes(gk, 'geometry', undefined, GeometryRes, geometry);
		//}
		text.setGeometry(geometry);

	};

	if (res) {
		fun(res);
	} else {
		
		const data = new TexData(resTab, renderer);
		resTab.load(key, RES_TYPE_TEXTURE, { type: _CANVAS.RES_TYPE_IMGTEXT, cfg: textcfg }, data, fun);
	}
};

// tslint:disable:max-classes-per-file
class TexData {
	public resTab: ResTab;
	public renderer: Renderer;
	// tslint:disable-next-line:typedef
	constructor(resTab, renderer) {
		this.resTab = resTab;
		this.renderer = renderer;
	}
}

/**
 * @description 加载图片纹理
 * @param cb 回调，只有一个参数，Texture
 */
export const loadImgTexture = (image: Json, renderer: Renderer, resTab: ResTab, cb?) => {
	let img = image.name;
	let url = null;
	if(img.split("/")[0] == "playerhead" || img.split("/")[0] == "images"){
		url = image.name;
	}else{
		url = RES_PATH + image.name;
	}
	const filter = image.filter;
	const p = resConfigPathMap.get(url);
	url = p !== undefined ? p : resConfigPathMap.get('') + url;
	let key = `${RES_TYPE_TEXTURE}:${url}`;

	if (filter) {
		key += ` | ${_CANVAS.getImgFilterKey({ arr: filter, img: url, path: '' })}`;
	}

	const texData = new TexData(resTab, renderer);
	resTab.load(key, RES_TYPE_TEXTURE, image, texData, texRes => cb && setTimeout(() => cb(texRes.link), 0));
};

export const loadImgTextures = (images: Json[], renderer: Renderer, resTab: ResTab, cb) => {
	let num = images.length;
	const result = [];
	for (let i = 0; i < images.length; ++i) {
		loadImgTexture(images[i], renderer, resTab, tex => {
			result[i] = tex;
			if (--num === 0) cb && cb(result);
		});
	}
};

export const loadImage = (image: Json, resTab: ResTab, cb?) => {
	let arg;
	let key = `${RES_TYPE_IMAGE}:`;
	if (image.type === _CANVAS.RES_TYPE_IMGTEXT) {
		arg = { sourceType: _CANVAS.RES_TYPE_IMGTEXT, value: image.cfg };
		key += _CANVAS.getImgTextKey(image.cfg);
	} else {
		let img = image.name;
		let url = null;
		if(img.split("/")[0] == "playerhead" || img.split("/")[0] == "images"){
			url = image.name;
		}else{
			url = RES_PATH + image.name;
		}
		const filter = image.filter;
		const p = resConfigPathMap.get(url);
		url = p !== undefined ? p : resConfigPathMap.get('') + url;
		key += url;

		if (filter) {
			arg = { sourceType: _CANVAS.RES_TYPE_IMGFILTER, value: { arr: filter, img: url, path: '' } };
			key += ` | ${_CANVAS.getImgFilterKey(arg.value)}`;
		} else {
			arg = { sourceType: RES_TYPE_BLOB, value: url };
		}
	}

	loadRes[arg.sourceType](resTab, arg.value, res => {
		const img = new Image();
		img.src = res.link;
		img.onload = () => {
			cb(img, res.args);
		};
	});
};

/**
 * 解析字符串
 * @param url 
 */
export const parseUrl = (url) => {
	url = RES_PATH + url;
	const p = resConfigPathMap.get(RES_PATH + url);
	url = p !== undefined ? p : resConfigPathMap.get('') + url;
	return url;
}

/**
 * 加载字符串
 * @param url 
 * @param resTab 
 * @param cb 
 */
export const loadString = (url, resTab: ResTab, cb?) => {
	url = parseUrl(url);
	let key = `${RES_TYPE_STRING}:${url}`;

	resTab.load(key, RES_TYPE_STRING, url, resTab, texRes => {
		cb && setTimeout(() => cb(texRes.link), 0)
	});
}

/**
 * 加载骨骼纹理
 * @param url 
 * @param resTab 
 * @param cb 
 */
export const loadTextureAtlas = (url, resTab: ResTab, cb?) => {
	url = parseUrl(url);
	let key = `${RES_TYPE_TEXTURE_ATLAS}:${url}`;

	resTab.load(key, RES_TYPE_TEXTURE_ATLAS, url, resTab, texRes => {
		cb && setTimeout(() => cb(texRes.link), 0)
	});
}


const loadRes = {};

loadRes[RES_TYPE_BLOB] = (resTab: ResTab, path: string, cb: Function) => {
	const key = `${RES_TYPE_BLOB}:${path}`;
	const res = resTab.get(key);
	if (res) cb(res);
	else {
		resTab.load(key, RES_TYPE_BLOB, path, undefined, cb, error => {
			throw new Error(`load.ts loadRes${RES_TYPE_BLOB} failed, path = ${path}, error = ${error.reason}`);
		});
	}
};

loadRes[_CANVAS.RES_TYPE_IMGTEXT] = (resTab: ResTab, textCfg: Json, cb: Function) => {
	const key = _CANVAS.getImgTextKey(textCfg);
	const res = resTab.get(key);
	if (res) {
		cb(res);
		textCfg.charUV = res.args.charUV;
	} else {
		resTab.load(key, _CANVAS.RES_TYPE_IMGTEXT, textCfg, undefined, cb);
	}
};

loadRes[_CANVAS.RES_TYPE_IMGFILTER] = (resTab: ResTab, imgFilterCfg: Json, cb: Function) => {
	const key = _CANVAS.getImgFilterKey(imgFilterCfg);
	const res = resTab.get(key);
	if (res) {
		cb(res);
	} else {
		resTab.load(key, _CANVAS.RES_TYPE_IMGFILTER, imgFilterCfg, resTab, cb);
	}
};

export class GeometryData {
	public json: JSON;
	public resTab: ResTab;
	public parseFun: (data: ArrayBuffer, callBack: (geo: THREE.BufferGeometry) => void) => void;
}

// tslint:disable-next-line:no-reserved-keywords
const createGeometryRes = (name: string, type: string, path: string, data: GeometryData) => {
	const key = `${RES_TYPE_FILE}:${path}`;
	data.resTab.load(key, RES_TYPE_FILE, path, undefined, bufferRes => {
		data.parseFun(bufferRes.link as ArrayBuffer, (geo) => {
			loadOK(name, type, path, GeometryRes, geo);
		});
	}, err => {
		throw new Error(`createGeometryRes failed, key = ${key}, err = ${err.reason}`);
	});
};

// tslint:disable-next-line:no-reserved-keywords
const createTextureRes = (name: string, type: string, image: Json, data: TexData) => {
	const tex = new THREE.Texture();
	const r =
		loadImage(image, data.resTab, (img, args) => {
			tex.image = img;
			tex.isReady = true;
			tex.needsUpdate = true;
			loadOK(name, type, args, TextureRes, tex);
		});
};

// tslint:disable-next-line:no-reserved-keywords
export const createSkeletonRes = (key: string, type: string, path: string, resTab: ResTab) => {
	resTab.load(`${RES_TYPE_FILE}:${path}`, RES_TYPE_FILE, path, resTab, res => {
		loadOK(key, type, path, Res, parseSkeleton(res.link));
	});
};

/**
 * 创建字符串类型资源
 * @param key 
 * @param type 
 * @param path 
 * @param resTab 
 */
const createStringRes = (name: string, type: string, path: string, resTab: ResTab) => {
	resTab.load(`${RES_TYPE_FILE}:${path}`, RES_TYPE_FILE, path, resTab, res => {
		loadOK(name, type, path, Res, butil.utf8Decode(res.link));
	});
};

const createTextureAtlasRes = (name: string, type: string, path: string, resTab: ResTab) => {
	let key = `${RES_TYPE_STRING}:${path}`;
	resTab.load(key, RES_TYPE_STRING, path, resTab, texRes => {
		loadOK(name, type, path, Res, new TextureAtlas(texRes.link, (url: string) => {
			// atlasPages.push(parent + "/" + path);
			url = parseUrl(url);
			let key = `${RES_TYPE_TEXTURE}:${url}`;

			let image = new Image();
			image.src = "../" + url;
			image.width = 16;
			image.height = 16;
			return new ThreeJsTexture(image, getResMap().get(key).link.texture);
		}));
	});
};

export class AnimationData {
	public name: string;
	public resTab: ResTab;
}

// tslint:disable-next-line:no-reserved-keywords
export const createAnimationRes = (key: string, type: string, path: string, data: AnimationData) => {
	const resTab = data.resTab;
	resTab.load(`${RES_TYPE_FILE}:${path}`, RES_TYPE_FILE, path, resTab, res => {
		loadOK(key, type, path, Res, parseAnimation(data.name, res.link));
	});
};

export const RES_TYPE_SKELETON = 'skeleton';
export const RES_TYPE_ANIMATION = 'animation';
export const RES_TYPE_TEXTURE = 'texture';
export const RES_TYPE_IMAGE = 'image';
export const RES_TYPE_GEOMETRY = 'geometry';
export const RES_TYPE_STRING = 'string';
export const RES_TYPE_TEXTURE_ATLAS = 'textureAtlas';
export const RES_TYPE_TEXTURE_ATLAS_IMAGE = 'textureAtlasImage';

register(RES_TYPE_SKELETON, createSkeletonRes);
register(RES_TYPE_ANIMATION, createAnimationRes);
register(RES_TYPE_TEXTURE, createTextureRes);
register(RES_TYPE_GEOMETRY, createGeometryRes);
register(RES_TYPE_STRING, createStringRes);
register(RES_TYPE_TEXTURE_ATLAS, createTextureAtlasRes);

