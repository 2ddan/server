
import { THREE } from "./three"
import { createScene, SceneData } from "./scene"

/**
 * @description Renderer 
 */
export class Renderer {

    private canUseVertexTexture: boolean;
    private impl: THREE.WebGLRenderer;
    private size: { width: number, height: number };

    /**
     * @description 构造函数
     * @param antialias 是否抗锯齿，默认不开
     */
    constructor(width: number, height: number, antialias = false, ratio = 1.0) {

        this.canUseVertexTexture = false;

        this.impl = new THREE.WebGLRenderer({
            alpha: true,
            antialias: antialias
        });
        this.size = {
            width: width,
            height: height
        }

        this.impl.autoClear = true;

        this.impl.setSize(width, height);
        this.impl.setPixelRatio(ratio);

        if (this.impl.capabilities) {
            let nVertexUniforms = this.impl.capabilities.maxVertexUniforms;

            let maxBones = Math.floor((nVertexUniforms - 60) / 4);
            if (maxBones < 40) {
                console.log("+++ warning: maxBones = " + maxBones + " < 40, useVertexTexture: " + this.canUseVertexTexture);
                this.canUseVertexTexture = this.impl.capabilities.floatVertexTextures > 0;
            }
        }
    }

    /**
     * @description 是否可用顶点纹理
     */
    useVertexTexture() {
        return this.canUseVertexTexture;
    }

    /**
     * @description 设置canvas的清空色
     * rgb：十六进制整数表示的颜色值，0xRRGGBB
     * alpha: [0, 1]
     */
    setClearColor(rgb, alpha) {
        this.impl.setClearColor(rgb, alpha);
    }

    /**
     * @description 是否设备丢失
     */
    isContextLost() {
        return this.impl.isContextLost();
    }

    /**
     * @description 强制设备丢失
     */
    forceContextLoss() {
        this.impl.forceContextLoss();
    }

    /**
     * 更新几何体
     */
    updateGeometry(mesh) {
        this.impl.updateGeometry(mesh);
    }
    /**
     * 设置纹理
     */
    setTexture2D(texture) {
        this.impl.setTexture2D(texture, 0);
    }

    /**
     * @description 取Threejs渲染器
     */
    getThreeRenderer() {
        return this.impl;
    }

    /**
     * @description 返回canvas标签
     */
    getCanvas() {
        return this.impl.domElement;
    }

    /**
     * @description 设置canvas和webgl环境的宽高
     */
    setSize(width, height) {

        this.size.width = width;
        this.size.height = height;

        this.impl.setSize(width, height);
    }

    /**
     * @description 获取canvas和webgl环境的宽高
     */
    getSize() {
        return this.size;
    }

    /**
     * @description 创建对应的渲染场景
     * @return Scene的实例
     */
    createScene(data: SceneData) {
        return createScene(this, data);
    }
}