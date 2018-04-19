/*
 * 场景模块
 */

// ============================== 导入

import { create as createFrame, setInterval as setFrameInterval } from "../../widget/frame_mgr"

import { Widget } from "../../widget/widget";

import { Forelet } from "../../widget/forelet";

import { getRealNode, paintCmd3 } from "../../widget/painter";

// ============================== 导出

/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet = new Forelet();

import { SceneManager } from "../../render3d/scene_mgr";

export let cfg = {
  width: 420,
  height: 700,
  antialias: false
};

let frame;
let isInitMgr = false;
export const init = () => {

  if (isInitMgr) return;

  isInitMgr = true;

  SceneManager.init(cfg.width, cfg.height, cfg.antialias);

  SceneManager.reset({
    lights: [{
      type: "Ambient",
      color: [1.0, 1.0, 1.0]
    }]
  });

  // 场景的渲染循环
  let FPS = 31;
  frame = createFrame();
  frame.setInterval(1000 / FPS);
  setFrameInterval(frame);
  frame.setPermanent(SceneManager.render.bind(SceneManager));
}

// ============================== 本地

// ============================== 立即执行

// 监听添加widget

forelet.listener = (cmd: string, widget: Widget): void => {

  if (cmd === "firstPaint") {

    let canvas = SceneManager.getCanvas();
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    paintCmd3(getRealNode(widget.tree), "appendChild", [canvas]);
  }
}

let clickCB: Function = null;

// 设置点击回调，主要是场景查询
export const setClickCallback = (cb: Function) => {
  clickCB = cb;
};

/**
 * @description 设置帧率统计回调
 * @param interval 调用回调的间隔时间，单位:毫秒
 * @param cb 回调函数，参数是frame_mgr的lastStat对象
 * 
 */
export const setFrameStateCallback = (cb: Function, interval) => {
  frame.setStat(cb, interval);
};

export class Scene extends Widget {
  constructor() {
    super();
  }

  onRayCast(event: any) {
    let scale = cfg.width;
    let x = event.x * (cfg.width / window.innerWidth)
    let y = event.y * (cfg.height / window.innerHeight);
    let result = SceneManager.raycast(x, y);
    clickCB && clickCB(result);
  }
}