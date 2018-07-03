
import { HandlerResult } from "../../../util/event";
import { loadDir } from "../../../widget/util";
import { Renderer } from "../../../render3d/renderer";
import { Scene, SceneData } from "../../../render3d/scene";
import { ResTab } from '../../../util/res_mgr'
import { butil, commonjs } from '../../../lang/mod';
import { toJson } from "../../../util/util";
import { addSceneRes, configMap, findConfigFile } from "../../../render3d/load";
import { Widget } from "../../../widget/widget";
import { Forelet } from "../../../widget/forelet";
import { Json } from '../../../lang/type';
import { getRealNode, paintCmd3 } from "../../../widget/painter";
import { Dimension, FlyControl } from "../../../render3d/fly_control";
import * as SceneApp from "../../scene";

let camera3DNode;
let resTab = new ResTab();
let scene: Scene;
let renderer: Renderer;
let factor = 5.0;
let width = 420, height = 700;
let lastMS = new Date().getTime();
let flyControl;

const render = () => {
    requestAnimationFrame(render);
    let now = new Date().getTime();
    scene.render((now - lastMS) / 1000);
    lastMS = now;
}

const onRayCast = (event: any) => {
    let result = scene.raycast(event.x, event.y);
    console.log(result);
    return HandlerResult.OK;
}

const init = () => {

    let sceneData: SceneData = {

        resTab: resTab,

        lights: [
            {
                type: "Ambient",
                color: [1, 1, 1]
            }
        ]
    };


    renderer = SceneApp.mgr.createRenderer(width, height, true, factor);
    renderer.setClearColor(0, 1.0);

    let dnode = {
        name: "root",
        type: "node",
        rayID: 100,
        boxCollider: {
            min: [0, 0, 0],
            max: [2, 2, 2]
        },
        transform: {
            position: [1, 0, 0],
            rotate: [0, 0, 0],
            scale: [1, 1, 1]
        },
        children: [{
            name: "image",
            type: "node",
            transform: {
                position: [0, 0, 0],
                rotate: [0, 0, 0],
                scale: [1, 1, 1]                
            },
            meshRender: {
                visible: true,
                material: {
                    transparent: true,
                    map: {
                        image: {
                            name: "npc_func_106.png"
                        }
                    }                    
                }
            },
            
            // attachment: "2D",
            // geometry: {
            //     type: "Plane",
            //     width: 64,
            //     height: 64
            // },
            
            attachment: "3D",
            geometry: {
                type: "Plane",
                width: 0.64,
                height: 0.64
            }            
        }, {
            name: "text",
            type: "node",
            attachment: "2D",
            transform: {
                position: [0, 0, 0],
                rotate: [0, 0, 0],
                scale: [1, 1, 1]               
            },
            textCon: {
                show: "ABCDEFG",
                textcfg: {
                    font: "normal 400 16px arial,serif",
                    color: "#ffffff",
                    textAlign: "left",
                    hfactor: 1.0,
                    isCommon:true,
                    text:"ABCDEFGH",
                    isPowerOfTwo: true
                }
            }
        }],
    };

    scene = SceneApp.mgr.createScene(sceneData, "06scene");
    SceneApp.mgr.create(dnode);
    camera3DNode = scene.getCameraObject();

    if (!camera3DNode) {
        camera3DNode = {
            camera: {
                perspective: [60, 0.6, 0.001, 10000]
            },
            transform: {
                position: [0, 0, 5],
                rotate: [0, 3.14159265, 0],
                scale: [1, 1, -1]
            }
        };
        scene.insert(camera3DNode);
    }


    let camera2D = {
        camera: {
            ortho: [-width / 2, width / 2, height / 2, -height / 2, -10000, 10000]
        },
        transform: {
            position: [0, 0, 5],
            rotate: [0, 3.14159265, 0],
            scale: [1, 1, -1]
        }
    };
    scene.insert(camera2D);

    flyControl = new FlyControl(camera3DNode.ref.impl, 0.2, 0.1, { size: [width, height], offset: [0, 0] });
    render();

    /**
     * 键盘事件必须放到window或者有焦点的元素上
     */


    forelet.addHandler(
        "onMouseDown",
        (event) => {
            flyControl.onMouseLDown.call(flyControl, event);
            flyControl.onMouseMDown.call(flyControl, event);
            return 0;
        }
    );
    
    forelet.addHandler("onRayCast", onRayCast);

    forelet.addHandler(
        "onMouseMove",
        (event) => {
            flyControl.onMouseLMove.call(flyControl, event);
            flyControl.onMouseMMove.call(flyControl, event);
            return 0;
        }
    );
    forelet.addHandler("onMouseWheel", flyControl.onMouseWheel.bind(flyControl));
}

let isLoad, isFirstPaint;
let widget;

/**
 * 两个条件都准备好了，才能进行初始化
 */
const initScene = () => {
    if (isLoad && isFirstPaint) {
        init();
        let canvas = renderer.getCanvas();
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        paintCmd3(getRealNode(widget.tree), "appendChild", [canvas]);
    }
}


loadDir(["examples/render/res/"], commonjs.flags, {}, { png: "download", jpg: "download" }, fileMap => {
    isLoad = true;
    addSceneRes(fileMap, "examples/render/res/");
    initScene();
}, () => { }, () => { });

export const forelet = new Forelet();

forelet.listener = (cmd: string, w: Widget): void => {
    if (cmd === "firstPaint") {
        widget = w;
        isFirstPaint = true;
        initScene();
    }
}