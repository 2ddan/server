// tslint:disable-next-line:no-reference
/// <reference path="./babylon.d.ts"/>

import { loadOK, register, Res, RES_TYPE_FILE, ResTab } from '../../util/res_mgr';
import { utf8Decode } from '../../util/util';

// 实现babylon的脱机提供者， 从外部ResTab获取数据
export class OfflineProvider implements BABYLON.IOfflineProvider {
    public enableSceneOffline: boolean = true;
    public enableTexturesOffline: boolean = true;
    public resTab: ResTab = new ResTab();

    constructor(resTab: ResTab) {
        this.resTab = resTab;
    }

    public open(successCallback: () => void, _errorCallback: () => void) {
        successCallback();
    }
    
    public loadImage(url: string, image: HTMLImageElement) {
        // TODO：将url转成小游戏
        const _u = url;
        const _window = <any>window;
    
        if (_window.pi_modules && _window.pi_modules.load && _window.pi_modules.load && _window.pi_modules.load.exports.isWXMinigame && _window.pi_modules.load.exports.isWXMinigame()) {
            _window.pi_modules['pi/minigame/adapter'].exports.replaceImagePath(url,(a) => {
                image.src = a;
            },() => {
                image.src = url;
            });
        } else {
            image.src = _u;
        }
    }

    public loadFile(url: string, sceneLoaded: (data: any) => void, _progressCallBack?: (data: any) => void, errorCallback?: () => void, _useArrayBuffer?: boolean) {
        this.resTab.load(`${RES_TYPE_FILE}:${url}`, RES_TYPE_FILE, url, null, (r) => {
            if (url.endsWith('.gltf')) {
                sceneLoaded(utf8Decode(r.link));
            } else {
                sceneLoaded(r.link);
            }
        }, errorCallback);
    }

    public loadAnimationKeys(name: string): BABYLON.IAnimationKey[] {
        const r = this.resTab.get(anmationKey(name));
        if (r) {
            return r.link;
        } else {
            return null;
        }
    }

    public createAnimationKeys(name: string, keys: BABYLON.IAnimationKey[]) {
        this.resTab.load(anmationKey(name), BABYLON_ANIMATION_TYPE, keys, null, null, () => {
            console.log('createAnimationKeys fail!, name:', name);
        });
    }

    public release() {
        this.resTab.release();
    }
}

/**
 * @description 纹理资源
 * @example
 */
export class AnimationKeysRes extends Res {
    public link: BABYLON.IAnimationKey[];
    /**
     * @description 创建
     * @example
     */
    public create(data: BABYLON.IAnimationKey[]): void {
        this.link = data;
    }
}

const BABYLON_ANIMATION_TYPE = 'babyblon_animationkeys';
const anmationKey = (name: string): string => {
    return `${BABYLON_ANIMATION_TYPE}:${name}`;
};

const createGeometryRes = (name: string, ftype: string, keys: BABYLON.IAnimationKey[], _: any) => {
    return loadOK(name, ftype, null, AnimationKeysRes, keys);
};

register(BABYLON_ANIMATION_TYPE, (name: string, ftype: string, keys: BABYLON.IAnimationKey[], _: any) => {
    createGeometryRes(name, ftype, keys, _);
});
