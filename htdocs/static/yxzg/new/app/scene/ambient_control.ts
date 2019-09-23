/**
* @module SceneControl 场景控制层
* @desc 
*/
// ========================================模块引入
import { sceneMgr } from "./scene";
import { Ambient } from "./art_cfg/ambient_camera/init_ac";
import { CameraControl } from "./camera_control";

// ========================================常量定义
/**
 * @constant 环境类型
 */
export const AMBIENT_TYPE = {
    map: 'mapAmbient',
    fight: 'fightAmbient',
    selectUser: 'selectUserAmbient'
}
/**
 * @constant 反向映射
 */
const RE_AMBIENT_TYPE = {
    mapAmbient: 'map',
    fightAmbient: 'fight',
    selectUserAmbient: 'selectUser'
}

// ========================================导出接口

// ========================================数据结构

// ========================================变量声明

// ========================================类定义
/**
 * @calss 环境
 */
export class AmbientControl {
    /**
     * 环境列表
     */
    private static ambientList = new Map();
    /**
     * 当前环境
     */
    private static curAmbient: string = null;

    /**
     * 创建环境
     * @param name 环境名称
     */
    static createAmbient = (name: string) => {
        if (AmbientControl.curAmbient === name) return;

        const ambient = Ambient[name] ? Ambient[name]() : null;
        if (AmbientControl.ambientList.get(name) || !ambient) return;
        
        // AmbientControl.destoryAmbient(AmbientControl.curAmbient);
        // 修改相机是否可以滑动
        CameraControl.modifyIsCanMoveC(RE_AMBIENT_TYPE[name]);

        AmbientControl.curAmbient = name;
        AmbientControl.ambientList.set(name, ambient);
        
        sceneMgr.curScene.create(ambient);
    };

    /**
     * 销毁环境
     * @param name 环境名称
     */
    static destoryAmbient = (name: string = AmbientControl.curAmbient) => {
        let ambient = AmbientControl.ambientList.get(name);
        if (!AmbientControl.ambientList.get(name)) return;

        sceneMgr.curScene.remove(ambient);
        ambient = null;
        if(name == AmbientControl.curAmbient){
            AmbientControl.curAmbient = null;
        }
        AmbientControl.ambientList.delete(name);
    }
    static getAmbient(name){
        return AmbientControl.ambientList.get(name);
    }
}

// ========================================方法定义

// ========================================立即运行