
/**
 *  
 */// tslint:disable-next-line:no-reference
/// <reference path="./babylon.d.ts"/>
import { BeforeInitTools } from './beforeInit';
import { OfflineProvider } from './offline_provider';

/**
 * 封装项目层使用的 场景命中信息
 * * 底层处理过命中检测 - 只通过包围盒检测
 */
// tslint:disable-next-line:interface-name
export interface IRayCastInfo extends BABYLON.PickingInfo {
    hit: boolean;
    pickedPoint: BABYLON.Nullable<BABYLON.Vector3>;
    /**
     * 命中的目标mesh
     */
    target: BABYLON.Mesh;
    rayID: number;
}

// 重载BABYLON.Scene， 释放资源
export class Scene extends BABYLON.Scene {
    public dispose() {
        const offlineProvider = (<OfflineProvider>this.offlineProvider);

        BABYLON.Scene.prototype.dispose.call(this);
        
        offlineProvider && offlineProvider.release();
    }
    /**
     * 3D 场景点击命中结果
     * @return 
     * * .pickedMesh.link: 命中的mesh
     */
    public pick3D() {
        const pickRes: BABYLON.PickingInfo = this.pick(this.pointerX, this.pointerY + BeforeInitTools.Weixin_Mobile_Bangs_Size, (mesh) => mesh.isPickable);
        (<IRayCastInfo>pickRes).target = pickRes.pickedMesh ? (<any>pickRes.pickedMesh).link : null;
        (<IRayCastInfo>pickRes).rayID  = (<IRayCastInfo>pickRes).target ? (<any>(<IRayCastInfo>pickRes).target).rayID : null;
        return (<IRayCastInfo>pickRes);
    }
}