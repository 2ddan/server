// ========================================模块引入
import { cameraJson } from "./camera";
import { ambientJson } from "./ambient";

// ========================================类定义
/**
 * @class 环境
 */
export class Ambient {
    /**
     * 大地图
     */
    static mapAmbient = () => {
        return ambientJson.map();
    }
    /**
     * 战斗
     */
    static fightAmbient = () => {
        return ambientJson.fight();
    }
    static sce_warmap02a = () => {
        return ambientJson.sce_warmap02a();
    }
    static sce_warmap02b = () => {
        return ambientJson.sce_warmap02b();
    }
    static sce_warmap02c = () => {
        return ambientJson.sce_warmap02c();
    }
    /**
     * 选择角色
     */
    static selectUserAmbient = () => {
        return ambientJson.selectUser();
    }

}

/**
 * @class 相机
 */
export class Camera {
    /**
     * 大地图
     */
    static camera2D = () => {
        return cameraJson.camera2D();
    }
    /**
     * 大地图
     */
    static mapCamera = () => {
        return cameraJson.map();
    }

    /**
     * 战斗
     */
    static fightCamera = () => {
        return cameraJson.fight();
    }

    /**
     * 选择角色
     */
    static selectUserCamera = () => {
        return cameraJson.selectUser();
    };
}