/*
 * 用户登陆注册
 */

// ============================== 导入
import { RDocument } from '../pi/gui/r_document';
import { Inspector } from '../pi/gui/inspector';
import { Tools } from '../pi/gui/tools';

import { BeforeInitTools } from '../pi/gui_root/beforeInit';
import { FormatCanvasDisplay } from '../pi/gui_root/format_canvas_display';
import { FormatEvent } from '../pi/gui_root/format_event';
import { init, open } from '../pi/gui_root/root';
import { RootManager } from '../pi/gui_root/root_manager';
import { resetSize } from '../pi/gui_root/tool';

import { initGUI } from '../pi/gui_virtual/painter';

import { sceneMgr } from './scene/scene';
import { ICAMERA_CFG } from './scene/scene_interface';

import { addFontCanvas } from './mod/loadfont_canvas';
import { initDefaultStyle } from './mod/default_style';
import { globalSend } from './mod/pi';
import { timelineMgr } from '../app_b/fight_show/bridge/timeline_mgr';
// import { loadFonts } from './mod/loadfont';



// =============================== 测试代码
// =============================== 导出

/***
 * 初始化
 */
export const initOK = (_cfg: any) => {
    const canvas = initCavans();
    const vdocument = format_gui_display(canvas, _cfg); // 调用适配方法传入

    // canvas绘字
    loadFonts(vdocument);

    // 初始化默认样式
    initDefaultStyle();

    // 初始化根页面
    init();

    // 打开登录界面
    open('app_a-login-login');

    // 创建主场景
    createMainScene();

    // 打开队列循环
    timelineMgr.start();
    // loadFonts(
    //     '',
    //     [
    //         {
    //             name: 'SOURCEHANSANSK-MEDIUM',
    //             src: 'app/font/hansansk/frequency.png',
    //             bin: 'app/font/hansansk/frequency.json.bin'
    //         }
    //     ],
    //     () => {
    //         // 初始化默认样式
    //         initDefaultStyle();

    //         // 设置铺满整个屏幕(铺满整个屏幕的页面只能存在一个)为login及以上
    //         RootManager.lastNoAlphaGroup = 'login';
            
    //         // 初始化根页面
    //         init();

    //         // 打开登录界面
    //         open('app_a-login-login');

    //         // 创建主场景
    //         createMainScene();
    //     }
    // );
};

/**
 * 初始化canvas
 */
const initCavans = () => {
    let canvas = document.getElementsByTagName('canvas')[0]; // 各项目不同方式获得canvas

    if(!canvas){
        try {
            const div = document.createElement('div');
            document.body.appendChild(div);
    
            canvas = document.createElement('canvas');
            canvas.style.touchAction = 'none';
            div.appendChild(canvas);
        } catch (e){
            console.log(e)
        }
    }

    return canvas;
};

/**
 * 屏幕适配
 * @param CANVAS : canvas 需包装在一个DIV内，div 放bady下，canvas , div 均绝对定位
 */
const format_gui_display = (canvas: HTMLCanvasElement, _cfg: any) => {
    let l: number , t: number, w: number, h: number, vdocument: RDocument;

    FormatCanvasDisplay.addResizeListener(resizeCall);

    BeforeInitTools.Design_Height = 750;
    BeforeInitTools.Design_Width = 1334;
    FormatCanvasDisplay.format(canvas);

    
    // 设置留白: 上下不留白 - 左右留白
    // if (FormatCanvasDisplay.getContentDisplayHeight() <= FormatCanvasDisplay.getDeviceHeight() / FormatCanvasDisplay.getDeviceViewScale()) {
    //     BeforeInitTools.Design_Height = FormatCanvasDisplay.getDeviceHeight() / FormatCanvasDisplay.getDeviceViewScale();
    //     BeforeInitTools.Design_Width  = FormatCanvasDisplay.getDeviceWidth() / FormatCanvasDisplay.getDeviceViewScale();
    //     FormatCanvasDisplay.format(canvas);
    // }

    // 初始化渲染器
    sceneMgr.initRenderer();
    
    // 初始化GUI
    l = FormatCanvasDisplay.getContentDisplayLeft();
    t = FormatCanvasDisplay.getContentDisplayTop();
    w = FormatCanvasDisplay.getContentDisplayWidth();
    h = FormatCanvasDisplay.getContentDisplayHeight();

    const mRender = sceneMgr.mainRenderer;
    const fbo = (<any>mRender.rt).__webglFramebuffer;
    vdocument = initGUI(canvas, fbo, { left: l, top: t, width: w, height: h, clearColor: '#00000000' });

    // 添加监听
    FormatEvent.format(canvas);

    FormatEvent.addDownListener(rootListener.down);
    
    FormatEvent.addDownListener(vdocument.downFire);
    FormatEvent.addUpListener(vdocument.upFire);
    FormatEvent.addMoveListener(vdocument.moveFire);
    FormatEvent.addWheelListener(vdocument.wheelFire);

    // 设置flag
    Tools.logFlag   = false;
    Tools.warnFlag  = false;
    Tools.errorFlag = false;
    Tools.isDev     = false;

    // 设置检查器
    (<any>window).Inspector = Inspector;

    // 设置铺满整个屏幕(铺满整个屏幕的页面只能存在一个)为login及以上
    RootManager.lastNoAlphaGroup = 'login';

    return vdocument;
};

/**
 * 窗口改变回调
 */
const resizeCall = () => {
    let l: number , t: number, w: number, h: number;

    l = FormatCanvasDisplay.getContentDisplayLeft();
    t = FormatCanvasDisplay.getContentDisplayTop();
    w = FormatCanvasDisplay.getContentDisplayWidth();
    h = FormatCanvasDisplay.getContentDisplayHeight();

    resetSize(l, t, w, h);
};

/**
 * 加载字体
 */
const loadFonts =(vdocument: RDocument)=>{
    addFontCanvas('hansansk', 'normal', 28, 30, vdocument.uniqueID);
}

/**
 * 创建主场景
 */
const createMainScene = () => {
    const cameraCfg: ICAMERA_CFG = { isCanMoveCX: true };

    // 主场景
    sceneMgr.createScene('mainScene', null, null, null, null, cameraCfg);
    
    // 特效场景 在GUI上面
    sceneMgr.createEffScene('effScene');
}

/**
 * 根节点监听
 */
const rootListener = {
    "down": () => {
        globalSend('msgDownCanvas');
    }
};
// ========================================== 本地

// ========================================== 立即执行
