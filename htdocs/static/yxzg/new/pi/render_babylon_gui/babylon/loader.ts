// tslint:disable-next-line:no-reference
/// <reference path="./babylon.d.ts"/>
import { loadImageRes, loadOK, register, Res, ResTab } from '../../util/res_mgr';
import { Geometry } from './geometry';
import { OfflineProvider } from './offline_provider';

export class ResLoader {
    public resTab: ResTab;

    constructor(resTab: ResTab) {
        this.resTab = resTab;
    }

    public loadTexture(url: BABYLON.Nullable<string>, noMipmap: boolean, sampling?: number): BABYLON.Nullable<BABYLON.InternalTexture> {
        const r = <TextureRes>this.resTab.get(textureKey(url, noMipmap, sampling));
        if (r) {
            return r.link;
        } else {
            return null;
        }
    }

    public createTexture(texture: BABYLON.InternalTexture) {
        // 该load 是一个同步过程
        this.resTab.load(textureKey(texture.url, !texture.generateMipMaps, texture.samplingMode), BABYLON_TEXTURE_TYPE, texture, null, null, () => {
            console.log('createTexture fail!, url:', texture.url, 'noMipmap:', texture.generateMipMaps, 'sampling:', texture.samplingMode);
        });
    }

    // 调用此方法应该保证resTab中存在该texture
    public releaseTexture(texture: BABYLON.InternalTexture): boolean {
        if (!texture.url) {
            return false;
        }
        const res = this.resTab.get(textureKey(texture.url, !texture.generateMipMaps, texture.samplingMode));
        if (!res) {
            return false;
        }
        this.resTab.delete(res);
        
        return true;
    }

    public loadGeometry(id: string): Geometry {
        const r = <GeometryRes>this.resTab.get(geometryKey(id));
        if (r) {
            return r.link;
        } else {
            return null;
        }
    }

    public createGeometry(geometry: Geometry) {
        // 该load 是一个同步过程
        this.resTab.load(geometryKey(geometry.id + (<any>geometry).pi_indices), BABYLON_GEOMETRY_TYPE, geometry, null, null, () => {
            console.log('createGeometry fail!, url:', geometry.id);
        });
    }

    // 调用此方法应该保证resTab中存在该texture
    public releaseGeometry(id: string) {
        const res = this.resTab.get(geometryKey(id));
        this.resTab.delete(res);
    }
}

/**
 * @description 纹理资源
 * @example
 */
export class TextureRes extends Res {
    public link: BABYLON.InternalTexture;

    /**
     * @description 创建 
     * @example 
     */
    public create(data: BABYLON.InternalTexture): void {
        this.link = data;
    }

    /**
     * @description 销毁，需要子类重载
     * @example
     */
    public destroy(): void {
        const r = this.link;
        if (r) {
            (<any>r)._engine._releaseTexture(r);
            r._webGLTexture = null;
            r.previous = null;
            r.next = null;
        }
        this.link = undefined;
    }
}

/**
 * @description 纹理资源
 * @example
 */
export class GeometryRes extends Res {
    public link: Geometry;
    /**
     * @description 创建
     * @example
     */
    public create(data: Geometry): void {
        this.link = data;
    }

    /**
     * @description 销毁，需要子类重载
     * @example
     */
    public destroy(): void {
        const r = this.link;
        if (r) {
            BABYLON.Geometry.prototype.dispose.call(r);
        }
        this.link = undefined;
    }
}

/**
 * @description Image资源
 * @example
 */
export class ImageRes extends Res {
    public link: HTMLImageElement;
    /**
     * @description 创建
     * @example
     */
    public create(data: HTMLImageElement): void {
        this.link = data;
    }

    /**
     * @description 销毁，需要子类重载
     * @example
     */
    public destroy(): void {
        if (this.link) {
            this.link.src = '';
        }
        this.link = undefined;

    }
}

/**
 * 对Babylon的GLTFLoader进行扩展， 其目的是接管其VertexBuffer的加载, 对其进行缓冲！
 * 使用该扩展类， 你始终应该保证accessor引用的buffer是紧凑的数据（accessor没有bytesStride字段）， 并保证数据的offset可以整除数据类型的长度
 */
export class GLTF2Loader extends BABYLON.GLTF2.GLTFLoader {
    public static resLoader: ResLoader;

    // 重载_loadVertexBufferViewAsync方法， 使其返回值为ArrayBufferView
    public _loadVertexBufferViewAsync(bufferView: BABYLON.GLTF2.Loader.IBufferView, _kind: string): Promise<ArrayBufferView> {
        if (bufferView._babylonBuffer) {
            return <any>bufferView._babylonBuffer;
        }

        bufferView._babylonBuffer = this.loadBufferViewAsync(`#/bufferViews/${bufferView.index}`, bufferView).then((data) => {
            return <any>data;
        });

        return <any>bufferView._babylonBuffer;
    }

    // 重载_loadVertexAccessorAsync方法， 使其不支持sparse， 并且偏移量只能是其类型长度的倍数
    public _loadVertexAccessorAsync(context: string, accessor: BABYLON.GLTF2.Loader.IAccessor, kind: string): Promise<BABYLON.VertexBuffer> {
        if (accessor._babylonVertexBuffer) {
            return accessor._babylonVertexBuffer;
        }

        if (accessor.sparse || (accessor.byteOffset && accessor.byteOffset % BABYLON.VertexBuffer.GetTypeByteLength(accessor.componentType) !== 0)) {
            throw new Error('Accessor does not support s, and its cost should be integer multiple of its ftype.');
        }

        const bufferView = BABYLON.GLTF2.ArrayItem.Get(`${context}/bufferView`, this.gltf.bufferViews, accessor.bufferView);
        accessor._babylonVertexBuffer = this._loadVertexBufferViewAsync(bufferView, kind).then((babylonBuffer) => {
            const size = (<any>BABYLON.GLTF2.GLTFLoader)._GetNumComponents(context, accessor.type);

            return new BABYLON.VertexBuffer(this.babylonScene.getEngine(), babylonBuffer, kind, false, false, null,
                false, accessor.byteOffset, size, accessor.componentType, accessor.normalized, true);
        });

        return accessor._babylonVertexBuffer;
    }
    // 重载_loadVertexDataAsync， 缓存geo
    public _loadVertexDataAsync(context: string, primitive: BABYLON.GLTF2.Loader.IMeshPrimitive, babylonMesh: BABYLON.Mesh): Promise<BABYLON.Geometry> {
        const accessor = BABYLON.GLTF2.ArrayItem.Get(`${context}/indices`, this.gltf.accessors, primitive.indices);
        const bufferView = BABYLON.GLTF2.ArrayItem.Get(`#/accessors/${accessor.index}/bufferView`, this.gltf.bufferViews, accessor.bufferView);
        const buffer = BABYLON.GLTF2.ArrayItem.Get(`#/bufferViews/${bufferView.index}/buffer`, this.gltf.buffers, bufferView.buffer);
        // const url = (<any>this)._rootUrl + buffer.uri;

        const m1 = context.slice(0, context.lastIndexOf('/'));
        const m2 = m1.slice(0, m1.lastIndexOf('/'));
        const index = parseInt(m2.slice(m2.lastIndexOf('/') + 1, m2.length), 10);
        const key = (<any>BABYLON.GLTF2.ArrayItem.Get(m2, this.gltf.meshes, index)).geometry + primitive.indices;
        const r = GLTF2Loader.resLoader.loadGeometry(key + primitive.indices);
        if (r) {
            return Promise.resolve(r);
        } else {
            const the = <any>this;
            const extensionPromise = the._extensionsLoadVertexDataAsync(context, primitive, babylonMesh);
            if (extensionPromise) {
                return extensionPromise;
            }

            const attributes = primitive.attributes;
            if (!attributes) {
                throw new Error(`${context}: Attributes are missing`);
            }

            // tslint:disable-next-line:prefer-array-literal
            const promises = new Array<Promise<any>>();

            const babylonGeometry = new Geometry(key, this.babylonScene);
            (<any>babylonGeometry).pi_indices = primitive.indices;
            GLTF2Loader.resLoader.createGeometry(babylonGeometry);

            if (primitive.indices === undefined) {
                babylonMesh.isUnIndexed = true;
            } else {
                promises.push(the._loadIndicesAccessorAsync(`#/accessors/${accessor.index}`, accessor).then((data) => {
                    babylonGeometry.setIndices(data);
                }));
            }

            const loadAttribute = (attribute: string, kind: string, callback?: (accessor: BABYLON.GLTF2.Loader.IAccessor) => void) => {
                if (attributes[attribute] === undefined) {
                    return;
                }

                babylonMesh._delayInfo = babylonMesh._delayInfo || [];
                if (babylonMesh._delayInfo.indexOf(kind) === -1) {
                    babylonMesh._delayInfo.push(kind);
                }

                const accessor = BABYLON.GLTF2.ArrayItem.Get(`${context}/attributes/${attribute}`, this.gltf.accessors, attributes[attribute]);
                promises.push(this._loadVertexAccessorAsync(`#/accessors/${accessor.index}`, accessor, kind).then((babylonVertexBuffer) => {
                    babylonGeometry.setVerticesBuffer(babylonVertexBuffer, accessor.count);
                }));

                if (callback) {
                    callback(accessor);
                }
            };

            loadAttribute('POSITION', BABYLON.VertexBuffer.PositionKind);
            loadAttribute('NORMAL', BABYLON.VertexBuffer.NormalKind);
            loadAttribute('TANGENT', BABYLON.VertexBuffer.TangentKind);
            loadAttribute('TEXCOORD_0', BABYLON.VertexBuffer.UVKind);
            loadAttribute('TEXCOORD_1', BABYLON.VertexBuffer.UV2Kind);
            loadAttribute('JOINTS_0', BABYLON.VertexBuffer.MatricesIndicesKind);
            loadAttribute('WEIGHTS_0', BABYLON.VertexBuffer.MatricesWeightsKind);
            loadAttribute('COLOR_0', BABYLON.VertexBuffer.ColorKind, (accessor) => {
                if (accessor.type === 'VEC4' /* VEC4 */) {
                    babylonMesh.hasVertexAlpha = true;
                }
            });

            return Promise.all(promises).then(() => {
                return babylonGeometry;
            });
        }
    }

    // 重载_loadAnimationChannelAsync， 缓存keys
    // tslint:disable-next-line:max-func-body-length
    public _loadAnimationChannelAsync(context: string, animationContext: string, animation: BABYLON.GLTF2.Loader.IAnimation, channel: BABYLON.GLTF2.Loader.IAnimationChannel, babylonAnimationGroup: BABYLON.AnimationGroup): Promise<void> {
        const targetNode: any = BABYLON.GLTF2.ArrayItem.Get(`${context}/target/node`, this.gltf.nodes, channel[1]);

        const buffer = BABYLON.GLTF2.ArrayItem.Get(`#/bufferViews/${(<any>animation).buffer}/buffer`, this.gltf.buffers, (<any>animation).buffer);
        const url = (<any>this)._rootUrl + buffer.uri;

        let targetPath: string;
        let animationType: number;
        switch (this.targetPathType[channel[0]]) {
            case 'translation': {
                targetPath = 'position';
                animationType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
                break;
            }
            case 'rotation': {
                targetPath = 'rotationQuaternion';
                animationType = BABYLON.Animation.ANIMATIONTYPE_QUATERNION;
                break;
            }
            case 'scale': {
                targetPath = 'scaling';
                animationType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
                break;
            }
            case 'weights': {
                targetPath = 'influence';
                animationType = BABYLON.Animation.ANIMATIONTYPE_FLOAT;
                break;
            }
            case 'color' /* ROTATION */: {
                targetPath = this.targetPathType[channel[0]];
                animationType = BABYLON.Animation.ANIMATIONTYPE_COLOR3;
                break;
            }
            case 'alpha' /* ROTATION */:
            case 'uOffset' /* ROTATION */:
            case 'vOffset' /* ROTATION */:
            case 'uScale' /* ROTATION */:
            case 'vScale' /* ROTATION */:
            case 'per' /* ROTATION */:
            case 'ort' /* ROTATION */: {
                targetPath = this.targetPathType[channel[0]];
                animationType = BABYLON.Animation.ANIMATIONTYPE_FLOAT;
                break;
            }
            default: {
                throw new Error(`${context}/target/path: Invalid value (${this.targetPathType[channel[0]]})`);
            }
        }

        // FIXEDME: 可能有bug，promise没人接管
        const influenceAnim = (keys) => {
            for (let targetIndex = 0; targetIndex < targetNode._numMorphTargets!; targetIndex++) {
                const animationName = `${babylonAnimationGroup.name}_channel${babylonAnimationGroup.targetedAnimations.length}`;
                const babylonAnimation = new BABYLON.Animation(animationName, targetPath, 1, animationType);
                let iKeys = (<OfflineProvider>this.babylonScene.offlineProvider).loadAnimationKeys(`${url}_0`);
                if (!iKeys) {
                    iKeys = keys.map((key) => ({
                        frame: key.frame,
                        inTangent: key.inTangent ? key.inTangent[targetIndex] : undefined,
                        value: key.value[targetIndex],
                        outTangent: key.outTangent ? key.outTangent[targetIndex] : undefined
                    }));
                    (<OfflineProvider>this.babylonScene.offlineProvider).createAnimationKeys(`${url}_0`, iKeys);
                }

                babylonAnimation.setKeys(iKeys);
                (<any>this)._forEachPrimitive(targetNode, (babylonMesh) => {
                    const morphTarget = babylonMesh.morphTargetManager!.getTarget(targetIndex);
                    const babylonAnimationClone = babylonAnimation.clone();
                    morphTarget.animations.push(babylonAnimationClone);
                    babylonAnimationGroup.addTargetedAnimation(babylonAnimationClone, morphTarget);
                });
            }
        };

        if (targetPath === 'influence') {
            if (!(<OfflineProvider>this.babylonScene.offlineProvider).loadAnimationKeys(`${url}_0`)) {
                return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url).then((keys) => {
                    influenceAnim(keys);
                });
            } else {
                influenceAnim(null);
            }
        } else if (targetPath === 'uOffset' || targetPath === 'vOffset' || targetPath === 'uScale' || targetPath === 'vScale') {
            return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url, targetPath).then((keys) => {
                const animationName = `${babylonAnimationGroup.name}_channel${targetPath}`;
                const babylonAnimation = new BABYLON.Animation(animationName, targetPath, 1, animationType);
                babylonAnimation.setKeys(keys);

                this.meshPromiseMap.get(channel[1]).then(mesh => {
                    const texture = mesh.material.diffuseTexture;
                    texture.animations.push(babylonAnimation);
                    babylonAnimationGroup.addTargetedAnimation(babylonAnimation, texture);
                });
            });
        } else if (targetPath === 'color') {
            return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url, targetPath).then((keys) => {
                const animationName = `${babylonAnimationGroup.name}_channel${targetPath}`;

                this.meshPromiseMap.get(channel[1]).then(mesh => {
                    const mat = mesh.material;
                    let babylonAnimation;
                    if (mat instanceof BABYLON.PiEffectMaterial) {
                        babylonAnimation = new BABYLON.Animation(animationName, 'tintColor', 1, animationType);
                    } else if (mat instanceof BABYLON.StandardMaterial) {
                        babylonAnimation = new BABYLON.Animation(animationName, 'ambientColor', 1, animationType);
                    } else {
                        // todo
                    }
                    babylonAnimation.setKeys(keys);
                    if (!mat.animations) {
                        mat.animations = [];
                    }
                    mat.animations.push(babylonAnimation);
                    babylonAnimationGroup.addTargetedAnimation(babylonAnimation, mat);
                });
            });
        } else if (targetPath === 'alpha') {
            return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url, targetPath).then((keys) => {
                const animationName = `${babylonAnimationGroup.name}_channel${targetPath}`;

                this.meshPromiseMap.get(channel[1]).then(mesh => {
                    const mat = mesh.material;
                    let babylonAnimation;
                    if (mat instanceof BABYLON.PiEffectMaterial) {
                        babylonAnimation = new BABYLON.Animation(animationName, 'tintOpacity', 1, animationType);
                    } else if (mat instanceof BABYLON.StandardMaterial) {
                        babylonAnimation = new BABYLON.Animation(animationName, 'alpha', 1, animationType);
                    } else {
                        // todo
                    }
                    babylonAnimation.setKeys(keys);
                    if (!mat.animations) {
                        mat.animations = [];
                    }
                    mat.animations.push(babylonAnimation);
                    babylonAnimationGroup.addTargetedAnimation(babylonAnimation, mat);
                });
            });
        } else if (targetPath === 'ort') {
            const animationName = `${babylonAnimationGroup.name}_channel${targetPath}`;
            const wh = this.babylonScene.getEngine().getScreenAspectRatio();
            return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url, targetPath).then((keys) => {
                this.cameraPromiseMap.get(`/cameras/${targetNode.index}`).then((camera: any) => {
                    const setCameraAni = (a: string, b: number) => {
                        const babylonAnimation = new BABYLON.Animation(animationName, a, 1, animationType);
                        const kk = JSON.parse(JSON.stringify(keys));
                        for (let ii = 0; ii < kk.length; ii++) {
                            kk[ii].value = kk[ii].value * b;
                        }
                        babylonAnimation.setKeys(kk);
                        camera.animations.push(babylonAnimation);
                        babylonAnimationGroup.addTargetedAnimation(babylonAnimation, camera);
                    };
                    setCameraAni('orthoLeft', wh * -1);
                    setCameraAni('orthoRight', wh);
                    setCameraAni('orthoBottom', -1);
                    setCameraAni('orthoTop', 1);
                });
            });
        } else if (targetPath === 'per') {
            return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url, targetPath).then((keys) => {
                this.cameraPromiseMap.get(`/cameras/${targetNode.index}`).then((camera: any) => {
                    const animationName = `${babylonAnimationGroup.name}_channel${targetPath}`;
                    const babylonAnimation = new BABYLON.Animation(animationName, 'fov', 1, animationType);
                    babylonAnimation.setKeys(keys);
                    camera.animations.push(babylonAnimation);
                    babylonAnimationGroup.addTargetedAnimation(babylonAnimation, camera);
                });
            });
        } else {
            return (<any>this)._loadAnimationKeysAsync(context, animationContext, animation, channel, url, targetPath).then((keys) => {
                const animationName = `${babylonAnimationGroup.name}_channel${babylonAnimationGroup.targetedAnimations.length}`;
                const babylonAnimation = new BABYLON.Animation(animationName, targetPath, 1, animationType);
                babylonAnimation.setKeys(keys);

                if (targetNode._babylonBones) {
                    const babylonAnimationTargets = [targetNode._babylonTransformNode!, ...targetNode._babylonBones];
                    for (const babylonAnimationTarget of babylonAnimationTargets) {
                        babylonAnimationTarget.animations.push(babylonAnimation);
                    }
                    babylonAnimationGroup.addTargetedAnimation(babylonAnimation, babylonAnimationTargets);
                } else {
                    if (targetNode.skin < 0 || targetNode.skin === undefined) {
                        targetNode._babylonTransformNode!.animations.push(babylonAnimation);
                        babylonAnimationGroup.addTargetedAnimation(babylonAnimation, targetNode._babylonTransformNode);
                    }
                }
            });
        }
    }

    // 增加_loadAnimationKeysAsync方法， 缓存keys
    // tslint:disable-next-line:max-func-body-length
    public _loadAnimationKeysAsync(context: string, animationContext: string, animation: BABYLON.GLTF2.Loader.IAnimation, channel: BABYLON.GLTF2.Loader.IAnimationChannel, key: string, targetPath: string): Promise<BABYLON.IAnimationKey[]> {
        // const _key = key + '/' + animationContext + '/channel/' + animation.buffer + ',' + channel[0] + ',' + channel[1] + ',' + channel[2] + ',' + channel[3] + ',' + channel[4] + ',' + channel[5];
        const _key = `${key}/${animationContext}/channel/${(<any>animation).buffer},${channel[0]},${channel[1]},${channel[2]},${channel[3]},${channel[4]},${channel[5]}`;
        const r = (<OfflineProvider>this.babylonScene.offlineProvider).loadAnimationKeys(_key);
        if (r) {
            return Promise.resolve(r);
        }
        let targetNode: any;
        if (channel[1] >= 0) {
            targetNode = BABYLON.GLTF2.ArrayItem.Get(`${context}/target/node`, this.gltf.nodes, channel[1]);
        }

        // tslint:disable-next-line:max-func-body-length
        return (<any>this)._loadPiAnimationAsync(context, (<any>animation).buffer, channel).then((data) => {
            let outputBufferOffset = 0;
            let getNextOutputValue: () => BABYLON.Vector3 | BABYLON.Quaternion | number[] | number | BABYLON.Color3;
            switch (targetPath) {
                case 'position': {
                    getNextOutputValue = () => {
                        const value = BABYLON.Vector3.FromArray(data.output, outputBufferOffset);
                        outputBufferOffset += 3;
                        
                        return value;
                    };
                    break;
                }
                case 'rotationQuaternion': {
                    getNextOutputValue = () => {
                        const value = BABYLON.Quaternion.FromArray(data.output, outputBufferOffset);
                        outputBufferOffset += 4;

                        return value;
                    };
                    break;
                }
                case 'color': {
                    getNextOutputValue = () => {
                        const value = BABYLON.Color3.FromArray(data.output, outputBufferOffset);
                        outputBufferOffset += 3;

                        return value;
                    };
                    break;
                }
                case 'scaling': {
                    getNextOutputValue = () => {
                        const value = BABYLON.Vector3.FromArray(data.output, outputBufferOffset);
                        outputBufferOffset += 3;

                        return value;
                    };
                    break;
                }
                case 'influence': {
                    getNextOutputValue = () => {
                        // tslint:disable-next-line:prefer-array-literal
                        const value = new Array<number>(targetNode._numMorphTargets!);
                        for (let i = 0; i < targetNode._numMorphTargets!; i++) {
                            value[i] = data.output[outputBufferOffset++];
                        }

                        return value;
                    };
                    break;
                }
                default: {
                    getNextOutputValue = () => {
                        return data.output[outputBufferOffset++];
                    };
                }
            }

            let getNextKey: (frameIndex: number) => BABYLON.IAnimationKey;
            // tslint:disable-next-line:switch-default
            switch (this.interpolationType[data.interpolation]) {
                case 'STEP': {
                    getNextKey = (frameIndex) => ({
                        frame: data.input[frameIndex],
                        value: getNextOutputValue(),
                        interpolation: BABYLON.AnimationKeyInterpolation.STEP
                    });
                    break;
                }
                case 'LINEAR': {
                    getNextKey = (frameIndex) => ({
                        frame: data.input[frameIndex],
                        value: getNextOutputValue()
                    });
                    break;
                }
                case 'CUBICSPLINE': {
                    getNextKey = (frameIndex) => {
                        const inTangent = getNextOutputValue();
                        const value = getNextOutputValue();
                        const outTangent = getNextOutputValue();

                        return {
                            frame: data.input[frameIndex],
                            inTangent: inTangent,
                            value: value,
                            outTangent: outTangent
                        };
                    };
                    break;
                }
                case 'PICUBICSPLINE' /* CUBICSPLINE */: {
                    getNextKey = (frameIndex) => {
                        const inAndOut = getNextOutputValue();

                        return ({
                            frame: data.input[frameIndex],
                            inTangent: inAndOut,
                            value: getNextOutputValue(),
                            outTangent: inAndOut
                        });
                    };
                }
            }

            // tslint:disable-next-line:prefer-array-literal
            const keys = new Array(data.input.length);
            for (let frameIndex = 0; frameIndex < data.input.length; frameIndex++) {
                keys[frameIndex] = getNextKey!(frameIndex);
            }

            (<OfflineProvider>this.babylonScene.offlineProvider).createAnimationKeys(_key, keys); 
            
            return keys;
        });
    }
}

const textureKey = (url: BABYLON.Nullable<string>, noMipmap: boolean, sampling?: number): string => {
    return `${BABYLON_TEXTURE_TYPE} :${url}_${noMipmap}_${(sampling ? true : false)}`;
};

const geometryKey = (id: string): string => {
    return `${BABYLON_GEOMETRY_TYPE}:${id}`;
};

const createTextureRes = (name: string, ftype: string, texture: BABYLON.InternalTexture, _: any) => {
    return loadOK(name, ftype, null, TextureRes, texture);
};

const createGeometryRes = (name: string, ftype: string, geometry: Geometry, _: any) => {
    return loadOK(name, ftype, null, GeometryRes, geometry);
};

const createImageRes = (name: string, ftype: string, url: string, res: ResTab) => {
    if ((<any>window).pi_modules.load.exports.isWXMinigame && (<any>window).pi_modules.load.exports.isWXMinigame()) {
        const image = new Image();
        image.onload = () => {
            loadOK(name, ftype, null, ImageRes, image);
        };

        (<any>window).pi_modules['pi/minigame/adapter'].exports.replaceImagePath(url, (a) => {
            image.src = a;
        }, () => {
            image.src = `/${url}`;
        });
    } else {
        // image.src = `/${url}`;
        loadImageRes(url, res, (image) => {
            loadOK(name, ftype, null, ImageRes, image);
        });
    }

};

export const BABYLON_TEXTURE_TYPE = 'babylon_texture';
export const BABYLON_GEOMETRY_TYPE = 'babylon_geometry';
export const BABYLON_IMAGE_TYPE = 'babylon_image';

register(BABYLON_TEXTURE_TYPE, (name: string, ftype: string, texture: BABYLON.InternalTexture, _: any) => {
    createTextureRes(name, ftype, texture, _);
});

register(BABYLON_GEOMETRY_TYPE, (name: string, ftype: string, geometry: Geometry, _: any) => {
    createGeometryRes(name, ftype, geometry, _);
});
register(BABYLON_IMAGE_TYPE, (name: string, ftype: string, url: string, res: ResTab) => {
    createImageRes(name, ftype, url, res);
});