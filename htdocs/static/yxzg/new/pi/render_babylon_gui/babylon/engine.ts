// tslint:disable-next-line:no-reference
/// <reference path="./babylon.d.ts"/>

/**
 * 
 */

import { ResTab } from '../../util/res_mgr';
import { GLTF2Loader, ResLoader } from './loader';
import { OfflineProvider } from './offline_provider';

export class Engine extends BABYLON.Engine {
    public static loader: ResLoader;
    public loader: ResLoader;
    public piEngine: boolean;

    constructor(canvasOrContext: BABYLON.Nullable<HTMLCanvasElement | WebGLRenderingContext>, antialias?: boolean, options?: BABYLON.EngineOptions, adaptToDeviceRatio: boolean = false) {
        if (!Engine.loader) {
            throw new Error('loader is not exist!, Please call \'Engine.setResTab\' first.');
        }
        super(canvasOrContext, antialias, options, adaptToDeviceRatio);
        this.piEngine = true;
        this.loader = Engine.loader;
    }

    public static prepare(resTab: ResTab) {
        const loader = new ResLoader(resTab);
        Engine.loader = loader;
        // 提供脱机资源加载
        BABYLON.Engine.OfflineProviderFactory = (_urlToScene: string, _callbackManifestChecked: (checked: boolean) => any, _disableManifestCheck: boolean) => {
            BABYLON.Tools.SetImmediate(() => {
                _callbackManifestChecked(true);
            });
            
            return new OfflineProvider(new ResTab()); // 每场景一个OfflineProvider
        };
        GLTF2Loader.resLoader = loader;
        // 修改默认的gltf文件加载类
        BABYLON.GLTFFileLoader._CreateGLTFLoaderV2 = (parent) => new GLTF2Loader(parent);
        
    }

    // 创建Texture
    public createTexture(urlArg: BABYLON.Nullable<string>, noMipmap: boolean, invertY: boolean, scene: BABYLON.Nullable<BABYLON.Scene>, samplingMode: number = Engine.TEXTURE_TRILINEAR_SAMPLINGMODE,
        onLoad: BABYLON.Nullable<() => void> = null, onError: BABYLON.Nullable<(message: string, exception: any) => void> = null,
        buffer: BABYLON.Nullable<string | ArrayBuffer | HTMLImageElement | Blob> = null, fallback: BABYLON.Nullable<BABYLON.InternalTexture> = null, format: BABYLON.Nullable<number> = null,
        forcedExtension: BABYLON.Nullable<string> = null): BABYLON.InternalTexture {

        const tex = BABYLON.Engine.prototype.createTexture.call(this, urlArg, noMipmap, invertY, scene, samplingMode, onLoad, onError, buffer, fallback, format, forcedExtension);
        // 将tex添加到资源表
        Engine.loader.createTexture(tex);

        return tex;
    }
}
