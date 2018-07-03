
/**
 * 3D渲染模块，封装自three.js库
 */
export module THREE {

    const BackSide;
    const RGBFormat;
    const InterpolateLinear;
    const InterpolateSmooth;
    const LinearFilter;
    const LinearMipMapLinearFilter;
    const LinearMipMapNearestFilter;
    const NearestMipMapLinearFilter;
    const NearestMipMapNearestFilter;
    const NearestFilter;
    const ClampToEdgeWrapping;
    const MirroredRepeatWrapping;
    const RepeatWrapping;

    class AnimationClip {
        constructor(clipName, duration, tracks);
    }

    class KeyframeTrack {
        setTangent(inTan, outTan);
        constructor(binding, times, values, interpolate);
    }

    class QuaternionKeyframeTrack {
        constructor(binding, times, values, interpolate);
    }

    class AnimationUtils {
        static utf8Decode(data);
    }

    /**
     * @description 设置3D资源的url根路径
     */
    function setResURL(path: string): void;

    /**
     * @description 获取3D资源的url根路径
     */
    function getResURL(): string;

    /**
     * @description 时钟类，用于渲染循环控制使用
     */
    class Clock {
        /**
         * @description 构造函数
         */
        constructor();

        /**
         * @description 取上一次调用到这一次调用的时间间隔
         * @return 上一次调用到这一次调用的时间间隔，单位：毫秒数
         */
        getDelta(): number;
    }

    class CubeTexture {
        isReady: boolean;
        images: any[];
        format: any;
        numImg: number;
        needsUpdate: boolean;
    }

    class Texture {
        isReady: boolean;
        image: any;
        format: any;
        needsUpdate: any;
        offset: Vector2;
        repeat: Vector2;
        mapping: number;
        wrapS: number;
        wrapT: number;
        magFilter: number;
        minFilter: number;
        generateMipmaps: boolean;
    }

    class WebGLCapabilities {
        precision: string;
        maxTextures: number;
        maxVertexTextures: number;
        maxTextureSize: number;
        maxCubemapSize: number;
        maxAttributes: number;
        maxVertexUniforms: number;
        maxVaryings: number;
        maxFragmentUniforms: number;
        vertexTextures: number;
        floatFragmentTextures: number;
        floatVertexTextures: number;
    }

    /**
     * @description webgl渲染器
     */
    class WebGLRenderer {
        capabilities: WebGLCapabilities;
        domElement: HTMLCanvasElement;
        autoClear: boolean;
        dirts: Array<Object3D>;
        animObjectMap: Map<number, Object3D>;

        constructor(Object);

        updateGeometry(mesh);
        setTexture2D(texture, slot);
        getSize(object);
        render(scene: Scene, camera: Camera, deltaMS: number, target?);
        setPixelRatio(ratio: number);
        setSize(width: number, height: number);
        setClearColor(rgb: number, alpha?: number);
        isContextLost(): boolean;
        forceContextLoss(): void;
    }

    class WebGLRenderTarget {
        constructor(w: number,h: number,options?: any)
    }

    /**
     * @description 渲染器
     */
    class PiMesh {
        _isInit: boolean;
        _isDestroy: boolean;
        meshes: Mesh[];
        visible: boolean;
        rayID: number;
        name: string;
        constructor(useVertexTexture: boolean);
        setSkeletonPath(path: string);
        setMaterialParams(param);
        setRenderOrder(number: number);
        init(geometries, textures, material, bones, uvAnimArray, modelAnimArray, transparents, meshSkeletonPath, anicontrol);
    }

    class BufferGeometry {
        constructor();
        dispose();
        computeBoundingBox();
        computeVertexNormals();

        elementsNeedUpdate: boolean;

        addAttribute(string, BufferAttribute);

        setIndex(BufferAttribute);
        addGroup(start, count, materialIndex);
    }

    class BufferAttribute {
        constructor(ArrayBufferView, number)
    }

    class Fog {
        constructor(color, near, far);
    }

    class FogExp2 {
        constructor(color, density);
    }

    class ShaderLib {

    }

    class Light {

    }

    class Text2D {
        _texture: Texture;
        constructor(textcfg, resTab, GeometryRes, TextureRes, draw);
        setRenderOrder(number);
    }

    class ImageText {
        constructor();
        setGeometry(geometry);
        setTexture(texture);
        visible;
        createTxPlaneBufferGeometry(uvs, tw, th, width, alignModHorizon, alignModVertical, textSize);
    }

    class Bone { }

    class Skeleton { }

    class Object3D {
        scene: Scene;
        visible: boolean;
        position: Vector3;
        scale: Vector3;
        rotation: Euler;
        quaternion: Quaternion;
        name: string;
        aniControl: any;
        parentIndex: number;
        parent: Object3D;
        dirt: boolean;
        uuid: number;
        matrixWorld: Matrix4;
        animObjMap: Map<number, Object3D>;
        tranformChange: (Object3D) => void;

        add(obj);
        remove(obj);
        setSkeletonChild(bones);
        setNeedResCount(count);
        getWorldPosition(optionTarget?: Vector3);
        dispose();
        setBoneVisible(flag);
    }

    class Box3 {
        constructor(min?, max?);
        containsPoint(point: Vector3);
    }

    class PointLight extends Light {
        constructor(isUseNormal, startAtten, endAttend, diffuse, specular);
    }

    class SpotLight extends Light {
        constructor(startAtten, endAttend, dir, cutoff, exp, diffuse, specular);
    }

    class MeshBasicMaterial {
        dispose();
        constructor(param);
    }

    class MeshParticlesMaterial extends Material {
        tintColor: THREE.Color;
        tintOpacity: number;

        dispose();
        constructor(param?);
    }

    class PlaneBufferGeometry {
        constructor(w, h, bw, bh, horizontalAlign?, verticalAlign?);
    }

    class BoxBufferGeometry {
        constructor(x, y, z);
    }
    
    class BoxGeometry {
        constructor(x, y, z);
    }

    class ShaderMaterial {
        map: any;
        constructor(param);
    }

    class CircleBufferGeometry {
        constructor(radius);
    }

    class Material {
        constructor();
        mapst: Vector4;
        map: Texture;
        needsUpdate: boolean;
        copy(mat: Material);
    }

    class Mesh extends Object3D {
        geometry: BufferGeometry;
        material: Material;
        renderOrder: number;
        dispose();
        rayID: any;
        constructor(geometry?, material?);
        setAnim(ani);
        setGeometry(geo);
        setBoundVisible(flag);
    }

    class ParticleMesh extends Mesh {
        _initParticleMatrix: Matrix4;
        constructor(geometry?, material?, useLocalSpace?, useBillboard?);
    }

    class SkinnedMesh extends Mesh {
        constructor(geometry?, material?);
        setUseVertexTexture(isUse);
        setMaxBones(maxBones);
        setBoundBone(bounds, boneName);
        setBoundVisible();
    }

    class DirectionalLight extends Light {
        constructor(direction, diffuse, specular);
    }

    class Scene extends Object3D {
        lightmap: Texture;
        fog: Fog | FogExp2;
        children: any[];
        animObjectMap: Map<number, THREE.Object3D>;
        dirts: Array<THREE.Object3D>;
        BulletinBoards:Array<THREE.Object3D>;
        add(object);
        remove(object);
    }

    class Camera {
        constructor();
        setProjection(l, r, t, b, n, f);
        posts: Array<Post>
    }

    class Post {
        onRenderImage(postRender, source,destination,delta)
    }
    class WaveEffect {
        constructor(param);
    }

    class LutEffect {
        constructor();
        setTexture(tex);
    }

    class OrthographicCamera extends Camera {
        constructor(left, right, top, bottom, near, far);
    }

    class PerspectiveCamera extends Camera {
        projectionMatrix: Matrix4;
        matrixWorld: Matrix4;
        constructor(fov, aspect, near, far);
        setProjection(fov, aspect, near, far);
    }

    class PostRender {
        constructor(renderer);
    }

    class Terrain extends Object3D {
        constructor(w, h, bw, bh);
        texs: any;
        numTexs: number;
        setTextureIsReady();
        setTexture(index: number, texture: Texture);
        setBlendSeed(seed1, seed2, seed3, seed4);
        setBlendCoff(constCoff1, linearCoff1, constCoff2, linearCoff2);
        setBlendFrequency(frequency1, frequency2, frequency3);
        setBlendClamp(oneClamp, zeroClamp, middleValue);
        updateBlend(renderer);
        dispose();
    }

    class TerrainMesh extends Object3D {
        constructor();
        setTextureIsReady();
        setTexture(key: string, texture: Texture);
        setGeometry(mesh: Mesh);
        // setBlendSeed(seed1, seed2, seed3, seed4);
        // setBlendCoff(constCoff1, linearCoff1, constCoff2, linearCoff2);
        // setBlendFrequency(frequency1, frequency2, frequency3);
        // setBlendClamp(oneClamp, zeroClamp, middleValue);
        // updateBlend(renderer);
        dispose();
        setMaterial(material, index);
        rayID;
    }

    interface Coord {
        x: number,
        y: number
    }

    class Raycaster {
        constructor();
        setFromCamera(Coord, Camera);
        intersectObjects(any, recursion, ignoreObj);
    }

    class Matrix4 {
        constructor();
        copy(mat: Matrix4);
        decompose( position, quaternion, scale );
        multiplyMatrices(mat1, mat2);
        getInverse(mat);
    }

    class Vector4 {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
        set(x, y, z, w);
        applyMatrix4(mat);
    }

    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(x?: number, y?: number, z?: number);
        distanceTo(v: Vector3): number;
        length();
        add(vector);
        copy(vector);
        applyMatrix4(matrix: Matrix4);
        normalize(): Vector3;
        lerpVectors(v1, v2, alpha);
        fromArray(value);
        multiplyScalar(value);
        equals(vec3);
        set(x, y, z);
        sub(v): Vector3;
        subVectors(w, v): Vector3;
        addVectors(w, v): Vector3;
        crossVectors(w, v): Vector3;
        dot(v): number;
        multiplyScalar(s): Vector3;
        angleTo(v: Vector3):number;
    }

    class Vector2 {
        x: number;
        y: number;
        set(x, y);
        constructor(x?: number, y?: number);
    }

    class Euler {
        x: number;
        y: number;
        z: number;
        set(x, y, z);
        constructor();
        fromArray(array);
    }

    class Quaternion {
        x: number;
        y: number;
        z: number;
        w: number;
        clone();
        set(x, y, z, w);
        constructor(x?, y?, z?, w?);
        setFromEuler(euler);
    }

    class Color {
        a: number;
        r: number;
        g: number;
        b: number;
        setRGBA(r, g, b, a);
        constructor(number);
        set(number);
    }

    class AmbientLight {
        ambient: Vector3;
        constructor(color);
    }

}