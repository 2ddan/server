
// ============================== 导入

import { butil, depend, load } from '../lang/mod';
import { Json } from '../lang/type';
import * as _CANVAS from '../util/canvas';
import { info, LogLevel, warn } from '../util/log';
import { BlobType, loadError, loadOK, register, Res, RES_TYPE_BLOB, RES_TYPE_FILE, ResTab } from '../util/res_mgr';
import { toJson } from '../util/util';
import { create, request } from '../worker/client';
import { THREE } from './three';

// const parseAnimation = (animationPath) => {
//     let path = SKELETON_PATH + animationPath;
//     if(!path.endsWith("/")) path += "/";
//     let configPath = path + animationPath + ".json";
//     let json = findConfigFile(configPath);

//     for (let i = 0; i < json.length; ++i) {
//         let key = animationPath + "/" + json[i];
//         if (!configMap.get(key)) {
//             let animPath = path + json[i];
//             let data = findConfigFile(animPath);
//             configMap.delete(animPath);
//             configMap.set(key, data);
//         }
//     }
// }

// const meshTex = (tex: THREE.Texture, index: number, mesh: THREE.PiMesh, property: string) => {
//     if (mesh._isDestroy) {
//         return;
//     }
//     mesh.meshes[index].material[property] = tex;
//     mesh.meshes[index].material.needsUpdate = true;
// }

// // 所有纹理，包括光照贴图等
// const parseTextures = (path, meshConfig, resTab, mesh, filter) => {
//     let textures = [];

//     for (let i = 0; i < meshConfig.length; ++i) {
//         let obj = {
//             map: meshConfig[i].tex !== undefined,
//             lightMap: meshConfig[i].lightMap !== undefined
//         };
//         textures.push(obj);
//         if (meshConfig[i].tex) {
//             let url = path + meshConfig[i].tex;
//             loadImgTexture(url, resTab, butil.curryFirst(meshTex, i, mesh, "map"));
//         }
//         if (meshConfig[i].lightMap) {
//             let url = path + meshConfig[i].lightMap;
//             loadImgTexture(url, resTab, filter, butil.curryFirst(meshTex, i, mesh, "lightMap"));
//         }
//     }
//     return textures;
// }

// const meshGeo = (res, mesh) => {

//     if (!mesh._isInit) {
//         setTimeout(() => meshGeo(res, mesh));
//     }

//     if (mesh._isDestroy) {
//         return;
//     }

//     mesh.boundingBox = mesh.boundingBox || new THREE.Box3();
//     for (let i = 0; i < mesh.meshes.length; ++i) {
//         mesh.meshes[i].geometry = res.link[i];
//         let g = res.link[i];
//         mesh.boundingBox.union(g.boundingBox);
//     }
// }

// const parseGeoImpl = (data, json) => {

//     let geometries = [];

//     for (let i = 0; i < json.mesh.length; ++i) {
//         let subMesh = json.mesh[i];
//         let g = new THREE.BufferGeometry();

//         // 属性
//         for (let j = 0; j < subMesh.attributes.length; ++j) {
//             let attrib = subMesh.attributes[j];
//             let itemCount = attrib.length / subMesh.numVertices;
//             let a = new Float32Array(data, attrib.offset, attrib.length);
//             g.addAttribute(attrib.name, new THREE.BufferAttribute(a, itemCount));
//         }

//         // 索引数据
//         let indexJson = subMesh.index;
//         if (indexJson.length >= 65536) {
//             throw new Error("index Failed !");
//         }

//         let indices = new Uint16Array(data, indexJson.offset, indexJson.length);
//         g.setIndex(new THREE.BufferAttribute(indices, 1));
//         g.computeVertexNormals();
//         g.computeBoundingBox();
//         g.elementsNeedUpdate = true;

//         geometries.push(g);
//     }
//     return geometries;
// }

// const parseGeometry = (path: string, json: any, resTab: ResTab, mesh: THREE.PiMesh) => {

//     path = resConfigPathMap.get(path);
//     let key = RES_TYPE_GEOMETRY + ":" + path;

//     let data = new GeometryData();
//     data.json = json;
//     data.resTab = resTab;
//     data.parseFun = parseGeoImpl;

//     resTab.load(key, RES_TYPE_GEOMETRY, path, data, butil.curryFirst(meshGeo, mesh));
// }

// const parseTransparent = (subMeshes) => {
//     let result = [];
//     for (let mesh of subMeshes) {
//         result.push(mesh.transparent);
//     }
//     return result;
// }

/**
 * 添加场景相关文件
 * @param fileArray: {路径: ArrayBuffer}
 * @param resPrexfix: 场景文件所在路径
 */

// /**
//  * 加载地形
//  * json的格式
// 	{
// 		"width": 1024,
// 		"height": 1024,

// 		"image1": "image1.png",
// 		"image2": "image2.png",
// 		"image3": "image3.png",
		
// 		"blend": {
// 			"width": 512,
// 			"height": 512,

// 			"constCoff1": 0.1,
// 			"linearCoff1": 0.1,
			
// 			"constCoff2": 0.1,
// 			"linearCoff2": 0.1,
			
// 			"frequency1": 4.0,
// 			"frequency2": 4.0,
// 			"frequency3": 4.0,

// 			"seed": [146, 23, 49, 200]
// 		}
// 	}
//  */

// export const createCircle = (resTab: ResTab, radius) => {
//     let key = RES_TYPE_GEOMETRY + "-Circle:" + radius;
//     let res = resTab.get(key);
//     if (res) return res.link;

//     let circle = new THREE.CircleBufferGeometry(radius);
//     resTab.createRes(key, RES_TYPE_GEOMETRY, undefined, GeometryRes, circle);
//     return circle;
// }

// export const createPlane = (resTab: ResTab, w, h, cw, ch, isLeftTop = false) => {
//     let key = RES_TYPE_GEOMETRY + "-Plane:" + w + "," + h + "," + cw + "," + ch + "," + isLeftTop;
//     let res = resTab.get(key);
//     if (res) return res.link;

//     let plane = new THREE.PlaneBufferGeometry(w, h, cw, ch, isLeftTop);
//     resTab.createRes(key, RES_TYPE_GEOMETRY, undefined, GeometryRes, plane);

//     return plane;
// }

// const updateCubeTextureImage = (image, texture, index) => {
//     texture.images[index] = image;
//     if (++texture.numImg === 6) {
//         texture.isReady = true;
//         texture.needsUpdate = true;
//     }
// }

// /**
//  * 加载立方体纹理
//  */
// export const loadCubeTexture = (urls: string[], resTab: ResTab) => {
//     let key = RES_TYPE_TEXTURE + ":" + urls.join(",");

//     let res = resTab.get(key);
//     if (res) return res.link;

//     let texture = new THREE.CubeTexture();
//     resTab.createRes(key, RES_TYPE_TEXTURE, undefined, TextureRes, texture);

//     texture.numImg = 0;
//     for (let i = 0; i < urls.length; ++i) {
//         loadImage(resTab, resConfigPathMap.get(urls[i]), butil.curryFirst(updateCubeTextureImage, texture, i));
//     }
//     return texture;
// }

// export const loadImgTextures = (urls: string[], resTab: ResTab, cb, filter?) => {
//     let num = urls.length, result = [];
//     for (let i = 0; i < urls.length; ++i) {
//         loadImgTexture(urls[i], resTab, filter, tex => {
//             result[i] = tex;
//             if (--num === 0) cb && cb(result);
//         });
//     }
// }

// const loadImage = (resTab: ResTab, path: string, cb: Function) => {
//     let key = RES_TYPE_BLOB + ":" + path;
//     resTab.load(key, RES_TYPE_BLOB, path, undefined, blobRes => {
//         let image = new Image();
//         image.src = blobRes.link;
//         image.onload = () => {
//             cb(image);
//         }
//     }, error => {
//         throw new Error("load.ts loadImage failed, path = " + path + ", error = " + error.reason);
//     });
// }

// /**
//  * 加载网格纹理
//  */
// export const loadMeshTextures = (mesh: THREE.PiMesh, url: string, resTab: ResTab, filter: any) => {
//     let { urlPath, urlFile } = splitPath(url);
//     urlPath = MESH_PATH + urlPath;
//     if(!urlPath.endsWith("/")) urlPath += "/";
//     url = urlPath + urlFile;
//     let json = findConfigFile(url);

//     parseTextures(urlPath, json.mesh, resTab, mesh, filter);
// }
