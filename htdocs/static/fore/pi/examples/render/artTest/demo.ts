
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

let camera3DNode;
let resTab = new ResTab();
let scene: Scene;
let renderer: Renderer;
let width = 420, height = 700;
let lastMS = new Date().getTime();
let flyControl;

const copyNode = (node) => {
    let result = JSON.parse(JSON.stringify(node));
    return result;
}

const onRayCast = (event: any) => {

    let result = scene.raycast(event.x, event.y);
    console.log(result);

}

const render = () => {
    if(!scene) return;
    requestAnimationFrame(render);
    let now = new Date().getTime();
    scene.render((now - lastMS) / 1000);
    lastMS = now;
}

const init = () => {
    if (!renderer)
        renderer = new Renderer(width, height);
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/1.scene")));
    let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/test.scene")));
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/3.scene")));

    let sceneData: SceneData = {

        resTab: resTab,

        lights: [
            {
                type: "Ambient",
                color: [1, 1, 1]
            }
        ],
        staticObj: sceneJson
    };

    scene = renderer.createScene(sceneData);
    camera3DNode = scene.getCameraObject();

    let nodePlayer = {
        type: "Node",
        position: [0, 0, 0],
        children: []
    };


    let node = {
        type: "Node",
        position: [0, 0, 0],
        children: [nodePlayer]
    };

    let node2 = copyNode(node);

    if (!camera3DNode) {
        camera3DNode = {
            type: "Camera",
            scale: [1, 1, 1],
            rotate: [0, 0, 0],
            position: [0, 0, 0],
            perspective: [60, 0.6, 0.3, 10000]
        };
        scene.insert(camera3DNode);
    }
    flyControl = new FlyControl(camera3DNode.ref.impl, 10.0, 0.1, { size: [width, height], offset: [0, 0] });

    scene.insert(node, undefined, resTab);


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
    forelet.addHandler(
        "onMouseMove",
        (event) => {
            flyControl.onMouseLMove.call(flyControl, event);
            flyControl.onMouseMMove.call(flyControl, event);
            return 0;
        }
    );
    forelet.addHandler("onMouseWheel", flyControl.onMouseWheel.bind(flyControl));

    //forelet.addHandler("onRayCast", onRayCast)

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


loadDir(["examples/render/res/"], commonjs.flags, {}, undefined, fileMap => {
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
    } else if (cmd == "remove") {
		scene.destroy();
		scene = undefined;
	}
}


