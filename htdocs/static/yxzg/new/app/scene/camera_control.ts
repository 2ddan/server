

/**
* @module CameraControl 相机控制层
* @desc 
*/
// ========================================模块引入
import { sceneMgr } from './scene';
import { Camera } from './art_cfg/ambient_camera/init_ac';


// ========================================常量定义
/**
 * @constant 相机类型
 */
export const CAMERA_TYPE = {
    map: "mapCamera",
    fight: "fightCamera",
    selectUser: 'selectUserCamera'
}

type SceneType = 'curScene' | 'effScene';

// ========================================导出接口

// ========================================数据结构

// ========================================变量声明

// ========================================类定义
/**
 * @calss 相机控制
 */
export class CameraControl {
    /**
     * 修改相机
     * @param cameraType 相机类型
     * @param sceneType 场景类型
     */
    static modifyCamera = (cameraType: string, sceneType: SceneType = 'curScene') => {
        const camera = sceneMgr[sceneType].camera3D;
        const originJson = Camera[cameraType] ? Camera[cameraType]() : null;

        if (!camera || !originJson) return;
        
        CameraControl.modifyPos(camera, originJson.transform.position);
        CameraControl.modifyRotate(camera, originJson.transform.rotate);
        CameraControl.modifyProjection(originJson.camera.ortho);
    }

    /**
     * 修改位置
     * @param camera 相机
     * @param position 位置
     * @param sceneType 场景类型
     */
    private static modifyPos = (camera: any, position: number[], sceneType = 'curScene') => {
        sceneMgr[sceneType].setPos(camera, [position[0], position[1], position[2]]);
    };

    /**
     * 修改旋转
     * @param camera 相机
     * @param rotate 旋转
     * @param sceneType 场景类型
     */
    private static modifyRotate = (camera: any, rotate: number[], sceneType = 'curScene') => {
        sceneMgr[sceneType].setRotate(camera, [rotate[0], rotate[1], rotate[2]]);
    }

    /**
     * 修改投影
     * @param proj 相机投影 [left, right, bottom, top, near, far]
     * @param sceneType 场景类型
     */
    private static modifyProjection(proj: number[], sceneType = 'curScene') {
        sceneMgr[sceneType].setCameraProjection(
            'ortho', 
            [ proj[0], proj[1], proj[2], proj[3], proj[4], proj[5] ]
        );
    }

    /**
     * 修改相机是否可以滑动
     * @param name 场景名称
     * @param sceneType 场景类型
     */
    static modifyIsCanMoveC(name: string, sceneType = 'curScene') {
        sceneMgr[sceneType].isCanMoveC  = name === 'map' ? true : false;
        sceneMgr[sceneType].isCanMoveCX = name === 'map' ? true : false;
    } 
}

// ========================================方法定义

// ========================================立即运行