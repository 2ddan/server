// ========================================模块引入
import { Renderer, resetThreeStore, renderGUI } from "../../pi/render3d/renderer";
import { THREE } from "../../pi/render3d/three";
import { ResTab } from "../../pi/util/res_mgr";
import { createHandlerList, Handler } from "../../pi/util/event";
import { create as createFrame, setInterval as setFrameInterval } from '../../pi/widget/frame_mgr';
import { Scene as ThreeScene, SceneData } from '../../pi/render3d/scene'
import { Pi } from '../../app/mod/pi';
import { FormatCanvasDisplay } from "../../pi/gui_root/format_canvas_display";
import { Camera } from "./art_cfg/ambient_camera/init_ac";
import { ModelJson } from "./art_cfg/model/init_model";
import { RTPLJson } from "./art_cfg/rtpl/init_rtpl";
import { REventData } from "../../pi/gui/r_event_base";
import { Root } from "../../pi/gui_root/root";
import { ISCENE_CFG, ICAMERA_CFG } from "./scene_interface";
import { SceneUtils } from "./scene_utils";

// ========================================类型定义
type ListenType = 'up' | 'down' | 'click' | 'move';
// ========================================常量定义

// ========================================导出接口

// ========================================数据结构

// ========================================变量声明

// ========================================类定义
/**
 * @class SceneMgr 
 * @classdesc 场景管理器: 管理高层创建的scene
 */
class SceneMgr {
    /**
     * 理想帧率
     */
    FPS: number;
    /**
     * 真实帧率
     */
    _FPS: number;
    /**
     * 帧率 ???
     */
    fTime: number;
    /**
     * 渲染器
     */
    mainRenderer: Renderer;
    /**
     * 当前场景
     */
    curScene: Scene;
    /**
     * 特效场景(在GUI上层)
     */
    effScene: Scene;
    /**
     * 是否显示特效场景
     */
    effSceneShow:boolean=true;  
    /**
     * 渲染宽度
     */
    renderW: number = 0;
    /**
     * 渲染高度
     */
    renderH: number = 0;
    /**
     * 是否暂停
     */
    isPaused: boolean;
    /**
     * 是否可以移动
     */
    isCanMove: boolean;
    /**
     * 时钟
     */
    clock: THREE.Clock;
    /**
     * 渲染事件列表
     */
    renderHandlerList: Handler;
    /**
     * 上一次的位置
     */
    private lastPos: { x: number, y: number };
    /**
     * 开始点击信息
     */
    private clickStartInfo: { x: number, y: number, timeStamp: number };
    /**
     * 点击间隔
     */
    private CLICK_SPACE: number;

    constructor() {
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.FPS = 60;
        this._FPS = 0;
        this.mainRenderer = null;
        this.curScene = null;
        this.renderW = 0;
        this.renderH = 0;
        this.isPaused = false;
        this.clock = new THREE.Clock();
        this.renderHandlerList = createHandlerList(); 
        this.isCanMove = true;
        this.lastPos = { x: 0, y: 0 };
        this.clickStartInfo = { x: 0, y: 0, timeStamp: 0 };
        this.CLICK_SPACE = 300;
    }

    /**
     * 初始化渲染器
     */
    initRenderer() {
        if (this.mainRenderer) return;

        this.renderW = FormatCanvasDisplay.getDeviceWidth() / FormatCanvasDisplay.getDeviceViewScale();
        this.renderH = FormatCanvasDisplay.getDeviceHeight() / FormatCanvasDisplay.getDeviceViewScale();
        this.mainRenderer = new Renderer(this.renderW, this.renderH, true, 1, document.getElementsByTagName('canvas')[0]);
        
        this.addListeners();
        this.render();
    }

    /**
     * 添加事件监听
     */
    private addListeners() {
        Root.addUpListener(this.up);
        Root.addDownListener(this.down);
        Root.addMoveListener(this.move);
        Root.addClickListener(this.click);
    }

    /**
     * 渲染循环
     */
    private render() {
        const frame = createFrame();
        
        frame.setInterval(Pi.debug ? 1000 / this.FPS : 1000 / this.FPS);

        setFrameInterval(frame);

        frame.setPermanent(() => {
            let now = Date.now();

            this._FPS += 1;

            this.fTime = this.fTime || now;
            if (now - this.fTime >= 1000) {
                this.fTime = now;
                this._FPS = 0;
            }

            let delta = this.clock.getDelta();
            this.renderHandlerList({type:"before", delta:delta});

            // 渲染GUI
            resetThreeStore(this.mainRenderer.impl);

            // 设置视口
            let l = FormatCanvasDisplay.getContentDisplayLeft();
            let t = FormatCanvasDisplay.getContentDisplayTop();
            let w = FormatCanvasDisplay.getContentDisplayWidth();
            let h = FormatCanvasDisplay.getContentDisplayHeight();
            this.mainRenderer.impl.setViewport(l, t, w, h);
            
            /**
             * TODO [这里需要判断3D场景 curScene和effScene的停止渲染]
             */
            if (this.curScene && !this.isPaused) {
                /**这儿渲染的顺序决定了层级 */

                /**渲染3D */
                this.curScene.threeScene.render(delta, true);

                /**设置不自动清除 */
                this.mainRenderer.impl.autoClear = false;


                /**GUI */
                // 设置视口
                this.mainRenderer.impl.setViewport(0,0,FormatCanvasDisplay.getDeviceWidth()/ FormatCanvasDisplay.getDeviceViewScale(),FormatCanvasDisplay.getDeviceHeight()/ FormatCanvasDisplay.getDeviceViewScale());
                // 渲染GUI
                renderGUI(this.mainRenderer.impl, delta);


                /**特效场景 */
                this.mainRenderer.impl.setViewport(l, t, w, h);
                this.effScene && this.effSceneShow && this.effScene.threeScene.render(delta);
 
            } else {

                /**设置不自动清除 */
                this.mainRenderer.impl.autoClear = false;

                /**GUI */
                // 设置视口
                this.mainRenderer.impl.setViewport(0,0,FormatCanvasDisplay.getDeviceWidth()/ FormatCanvasDisplay.getDeviceViewScale(),FormatCanvasDisplay.getDeviceHeight()/ FormatCanvasDisplay.getDeviceViewScale());
                // 渲染GUI
                renderGUI(this.mainRenderer.impl, delta, true);

            }
            
            this.renderHandlerList({type:"after", delta: delta});
        });
    }

    /**
     * 暂停渲染
     */
    stopRender() {
        this.isPaused = true;
    }

    /**
     * 开始渲染
     */
    startRender() {
        this.isPaused = false;
    }

    /**
     * 创建场景
     * @param name 场景名
     * @param upCB 弹起回调
     * @param downCB 按下回调
     * @param clickCB 点击回调
     * @param moveCB 移动回调
     * @param cameraCfg 相机参数
     */
    createScene(name: string, upCB?: Function, downCB?: Function, clickCB?: Function, moveCB?: Function, cameraCfg:  ICAMERA_CFG = <ICAMERA_CFG>{}): Scene {
        if (this.curScene) {
            this.curScene.destory();
        }

        const sceneCfg: ISCENE_CFG = { name: name, width: this.renderW, height: this.renderW };

        this.curScene = new Scene(this.mainRenderer, sceneCfg, upCB, downCB, clickCB, moveCB, cameraCfg);

        return this.curScene;
    }
    /**
     * 创建特效场景
     */

    /**
     * 创建特效场景(这个场景在主场景和GUI场景的上面)
     * @param name 场景名
     * @param upCB 弹起回调
     * @param downCB 按下回调
     * @param clickCB 点击回调
     * @param moveCB 移动回调
     * @param cameraCfg 相机参数
     */
    createEffScene(name: string, upCB?: Function, downCB?: Function, clickCB?: Function, moveCB?: Function, cameraCfg:  ICAMERA_CFG = <ICAMERA_CFG>{}): Scene {
        if (this.effScene) {
            this.effScene.destory();
        }

        const sceneCfg: ISCENE_CFG = { name: name, width: this.renderW, height: this.renderW };

        this.effScene = new Scene(this.mainRenderer, sceneCfg, upCB, downCB, clickCB, moveCB, cameraCfg);
        
        return this.effScene;
    }

    /**
     * 销毁场景
     */
    destoryScene() {
        this.curScene.destory();
        this.effScene.destory();
    }

    /**
     * 弹起
     * @param event 事件对象
     */
    private up = (event: REventData) => {
        if (!this.isCanMove || !this.curScene || !this.curScene.upCB) return;
        if (event.timeStamp - this.clickStartInfo.timeStamp >= this.CLICK_SPACE)  return;

        const xDif   = Math.abs(event.x - this.clickStartInfo.x);
        const yDif   = Math.abs(event.y - this.clickStartInfo.y);
        
        const result = this.curScene.threeScene.raycast(this.clickStartInfo.x, this.clickStartInfo.y);

        this.curScene.upCB(result, { xDif, yDif });
    }

    /**
     * 按下
     * @param event 事件对象
     */
    private down = (event: REventData) => {
        if (!this.curScene) return;
        
        this.lastPos.x = event.x;
        this.lastPos.y = event.y;
        this.clickStartInfo.x = event.x;
        this.clickStartInfo.y = event.y;
        this.clickStartInfo.timeStamp = event.timeStamp;

        if (!this.curScene.downCB) return;

        const result = this.curScene.threeScene.raycast(this.clickStartInfo.x, this.clickStartInfo.y);

        this.curScene.downCB(result);
    }
    /**
     * 移动
     * @param event 事件对象
     */
    private move = (event: REventData) => {
        if (!this.isCanMove) return;

        if (this.curScene && this.curScene.moveCB) {
            const difX = event.x - this.lastPos.x;
            const difY = event.y - this.lastPos.y;

            this.curScene.moveCamera(difX, difY);
            this.curScene.moveCB(difX, difY);
        }

        this.lastPos.x = event.x;
        this.lastPos.y = event.y;
    }

    /**
     * 点击
     * @param event 事件对象
     */
    private click = (event: REventData) => {
        if (!this.curScene || !this.curScene.clickCB) return;
        if (event.timeStamp - this.clickStartInfo.timeStamp >= this.CLICK_SPACE)  return;

        const result = this.curScene.threeScene.raycast(this.clickStartInfo.x, this.clickStartInfo.y);

        this.curScene.clickCB(result);
    }

}

/**
 * @constant 场景管理器
 */
export const sceneMgr:SceneMgr = new SceneMgr();

/**
 * @class Scene
 * @calssdesc 高层场景: 对场景中的模型进行管理
 *      场景中的模型: 相机, 模型, 特效等
 *      模型管理: 创建, 删除, 修改(位置, 缩放, 相机视口等)
 */
export class Scene {
    /**
     * 渲染器
     */
    private renderer: Renderer;
    /**
     * 场景名称
     */
    private name: string;
    /**
     * 宽度
     */
    private width: number;
    /**
     * 高度
     */
    private height: number;
    /**
     * 资源管理表
     */
    private resTab: ResTab;
    /**
     * 3D相机 TODO [这个相机可以抽出来]
     */
    camera3D: any;
    /**
     * 2D相机 TODO [这个相机可以抽出来]
     */
    camera2D: any;
    /**
     * Three创建的场景
     */
    threeScene: ThreeScene;
    /**
     * 是否可以移动相机
     */
    isCanMoveC: boolean;
    /**
     * X方向是否可以移动相机
     */
    isCanMoveCX: boolean;
    /**
     * Y方向是否可以移动相机
     */
    isCanMoveCY: boolean;
    /**
     * 移动相机速度
     */
    moveSpeedC: number;
    /**
     * 相机最小移动坐标X
     */
    minXRangeC: number;
    /**
     * 相机最小移动坐标Y
     */
    minYRangeC: number;
    /**
     * 相机最大移动坐标X
     */
    maxXRangeC: number;
    /**
     * 相机最大移动坐标X
     */
    maxYRangeC: number;
    /**
     * 弹起回调
     */
    upCB: Function;
    /**
     * 按下回调
     */
    downCB: Function;
    /**
     * 点击回调
     */
    clickCB: Function;
    /**
     * 滑动回调
     */
    moveCB: Function;

    /**
     * 
     * @param renderer 渲染器
     * @param sceneCfg 场景配置
     * @param clickCB 点击回调
     * @param moveCB 移动回调
     * @param cameraCfg 相机配置
     */
    constructor(renderer: Renderer, sceneCfg: ISCENE_CFG = <ISCENE_CFG>{}, upCB?: Function, downCB?: Function, clickCB?: Function, moveCB?: Function, cameraCfg: ICAMERA_CFG = <ICAMERA_CFG>{}) {
        this.renderer    = renderer;
        this.name        = sceneCfg.name;
        this.width       = sceneCfg.width;
        this.height      = sceneCfg.height;
        this.upCB        = upCB || null;
        this.downCB      = downCB || null;
        this.clickCB     = clickCB || null;
        this.moveCB      = moveCB || null;
        this.isCanMoveC  = cameraCfg.isCanMoveC || cameraCfg.isCanMoveCX || cameraCfg.isCanMoveCY || false;
        this.isCanMoveCX = cameraCfg.isCanMoveCX || false;
        this.isCanMoveCY = cameraCfg.isCanMoveCY || false;
        /**
         * TODO [这儿的移动速度和范围应该根据相机来判断]
         */
        this.moveSpeedC  = cameraCfg.moveSpeedC || 55;
        this.minXRangeC  = cameraCfg.minXRangeC || -26.5;
        this.minYRangeC  = cameraCfg.minYRangeC || -7.7;
        this.maxXRangeC  = cameraCfg.maxXRangeC || 30;
        this.maxYRangeC  = cameraCfg.maxYRangeC || 24;
        
        this.init();
    }
    /**
     * 初始化
     */
    init() {
        this.resTab = new ResTab();
        this.camera3D = null;
        this.camera2D = null;
        
        const sceneData: SceneData = {
            lights: [{ type: 'Ambient', color: [1, 1, 1] }],
            resTab: this.resTab
        };

        this.threeScene = this.renderer.createScene(sceneData);
        this.createCamera();
    }
    /**
     * 创建相机
     */
    createCamera() {
        // 3D相机 照3D物品
        this.camera3D = Camera.mapCamera();
        this.create(this.camera3D);

        // 2D相机 照2D物品(主要是attachment: '2D')的东西
        this.camera2D = Camera.camera2D();
        this.create(this.camera2D);
    }

    /**
     * 创建指定数据对应的场景对象
     * @param data 自己传入的模型数据
     * @param type 创建的模板类型
     * @param parent 父节点
     */
    create(data: any, type?: string, parent?: any) {
        if (type) {
            let obj: any;

            // 找到模型数据
            if (ModelJson[type]) {
                obj = ModelJson[type](data);
            } else {
                throw new Error( `${type} .tpl undefined.` );
            }

            // 混合模型模板
            if (RTPLJson[obj.tpl]){
                obj = RTPLJson[obj.tpl](obj);
            }else{
                throw new Error( `${obj.tpl} .rtpl undefined.` );
            }
        
            data._show = data._show || {};
            data._show.old = obj;

            // 调用底层的scene插入模型
            this.threeScene.insert(obj, parent, this.resTab);
        }else{
            this.threeScene.insert(data, parent, this.resTab);
        }

        return data;
    }
    
    /**
     * 修改指定数据对应的场景对象 TODO
     */
    modify(data: any, name?: any) {
        let obj: any;
        
        try {
            obj = data._show.tpl(undefined, data);
            obj = SceneUtils.parseRtpl(obj);
            SceneUtils.addHash(obj ,false);
        } catch (e) {

        }

        if (data._show.old.ref){
            SceneUtils.mergeNode(this, obj, data._show.old, data._show.old.resTab, name);
        }
    }

    /**
     * 移除场景对象
     * @param data 创建好的模型数据
     */
    remove(data: any) {
        if (!data) return;

        try {
            if (data.ref) {
                this.threeScene.remove(data);
            }
            else {
                if (data._show && data._show.old){
                    this.threeScene.remove(data._show.old);
                }
            }
        } catch (ex) {
            console.log('remove, ex: ', ex);
        }
    }

    /**
     * 摧毁场景
     */
    destory() {
        this.resTab.release();
        this.threeScene.destroy();
    }

    /**
     * 设置位置
     * @param data 创建好的模型数据[model._show.old](相机不是这个值)
     * @param position 位置
     */
    setPos(data: any, position: [number, number, number]) {
        if (!data || !data.ref || !position) return;

        data.ref.impl.position.fromArray(position);
        
        data.transform.position[0] = position[0];
        data.transform.position[1] = position[1];
        data.transform.position[2] = position[2];
    }

    /**
     * 设置旋转
     * @param data 创建好的模型数据 [model._show.old](相机不是这个值)
     * @param rotate 旋转
     */
    setRotate(data: any, rotate: [number, number, number]) {
        if (!data || !data.ref || !rotate) return;

        data.ref.impl.rotation.fromArray(rotate);

        data.transform.rotate[0] = rotate[0];
        data.transform.rotate[1] = rotate[1];
        data.transform.rotate[2] = rotate[2];
    }

    /**
     * 设置缩放
     * @param data 创建好的模型数据 [model._show.old](相机不是这个值)
     * @param scale 
     */
    setScale(data: any, scale: [number, number, number]) {
        if (!data || !data.ref || !scale) return;

        data.ref.impl.scale.fromArray(scale);

        data.transform.scale[0] = scale[0];
        data.transform.scale[1] = scale[1];
        data.transform.scale[2] = scale[2];
    }

    /**
     * 设置动作/动画
     * @param data 创建好的模型数据 [model._show.old](相机不是这个值)
     * @param anim 动作
     */
    setAnimation(data: any, anim: any) {
        data.children[0].animator.playAnim = anim;

        this.threeScene.modify(data.children[0], ['animator', 'playAnim']);
    }

    /**
     * 设置动画速度
     */
    setAnimationSpeed(data:any, speed: number){
        
    }

    /**
     * 设置相机投影
     * @param projType 投影类型(暂时只设置了正交相机)
     * @param proj 投影参数 [left, right, bottom, top]
     * @param type 2D相机还是3D相机
     */
    setCameraProjection(projType: string, proj: number[], type?: number) {
        type = type || 3;
        let cam  = this["camera"+type+"D"];
        if (!cam) return;

        const camera = cam.camera;

        camera[projType][0] = proj[0];
        camera[projType][1] = proj[1];
        camera[projType][2] = proj[2];
        camera[projType][3] = proj[3];
        
        this.threeScene.modify(cam, ['camera', 'ortho']);
    }

    /**
     * 移动相机
     * @param difX X方向差值
     * @param difY Y方向差值
     */
    moveCamera(difX: number, difY: number) {
        if (!this.isCanMoveC) return;

        let posX: number, posY: number, posZ: number;

        const cameraPos = this.camera3D.ref.impl.position;

        posX = cameraPos.x + (this.isCanMoveCX ? difX/this.moveSpeedC : 0);
        posY = cameraPos.y + (this.isCanMoveCY ? difY/this.moveSpeedC : 0);
        posZ = cameraPos.z;

        if (this.isCanMoveCX) posX = SceneUtils.limitNumInRange(posX, this.minXRangeC, this.maxXRangeC);
        if (this.isCanMoveCY) posY = SceneUtils.limitNumInRange(posY, this.minYRangeC, this.maxYRangeC);
        

        this.setPos(this.camera3D, [posX, posY, posZ]);
    }

    /**
     * 位置转换3D转2D
     * @param obj3D 3D模型
     */
    convertPos3DTo2D(obj3D: any) {
        if (!obj3D || !obj3D._show || !obj3D._show.old || !obj3D._show.old.ref || !obj3D._show.old.ref.impl) return;

        const impl = obj3D._show.old.ref.impl;
        const vector = impl.position.clone().project(this.camera3D.ref.impl);

        return {
            left: Math.round((1 + vector.x) * 1334 / 2),
            top: Math.round((1 - vector.y) * 750 / 2),
        };
    }

    /**
     * 设置事件监听回调
     * @param listenType 事件类型
     * @param callback 回调
     */
    setEventListenCB(listenType: ListenType, callback: Function) {
        this[`${listenType}CB`] = callback;
    }
}

// ========================================方法定义

// ========================================立即运行