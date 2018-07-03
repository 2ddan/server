
import { HandlerResult } from "../../../util/event";
import { loadDir } from "../../../widget/util";
import { Renderer } from "../../../render3d/renderer";
import { Scene, SceneData } from "../../../render3d/scene";
import { butil, commonjs } from '../../../lang/mod';
import { toJson } from "../../../util/util";
import { toFunc, compile } from "../../../util/tpl";
import { Parser } from "../../../util/tpl_str";
import { addSceneRes, configMap, findConfigFile } from "../../../render3d/load";
import { Widget } from "../../../widget/widget";
import { Forelet } from "../../../widget/forelet";
import { Json } from '../../../lang/type';
import { getRealNode, paintCmd3 } from "../../../widget/painter";
import { Dimension, FlyControl } from "../../../render3d/fly_control";
import * as SceneApp from "../../scene";
import { ResTab } from "../../../util/res_mgr"

let camera3DNode;
let resTab = new ResTab();
let scene: Scene;
let renderer: Renderer;
let width = 420, height = 700;
let lastMS = new Date().getTime();
let flyControl;
let jsonStr;
export let objs = [];
let reaTab: ResTab = new ResTab();

let sceneData: SceneData = {

    resTab: resTab,

    // terrain: {
    // 	path: "1.json"   // 相对路径 res/terrain
    // },

    // skybox: [

    // 	'skybox/px.jpg', // right
    // 	'skybox/nx.jpg', // left
    // 	'skybox/py.jpg', // top
    // 	'skybox/ny.jpg', // bottom
    // 	'skybox/pz.jpg', // back
    // 	'skybox/nz.jpg'  // front
    // ],

    // fog: {
    // 	type: "Linear", // "Linear" or "Exp" -- exp对应density
    // 	color: 0x7F7F7F,
    // 	near: 100,
    // 	far: 10000
    // },

    lights: [
        {
            type: "Ambient",
            color: [1, 1, 1]
        }
        // ,
        // {
        // 	type: "Direction",
        // 	direction: getNormalize(0, 1, 1),
        // 	diffuse: [1.0, 1.0, 1.0],
        // 	specular: [0.0, 0.0, 0.0]
        // }
    ]
};


const copyNode = (node) => {
    let result = JSON.parse(JSON.stringify(node));
    return result;
}

const onRayCast = (event: any) => {
    let result = scene.raycast(event.x, event.y);
    console.log(result);
    return HandlerResult.OK;
}

const render = () => {
    requestAnimationFrame(render);
    let now = new Date().getTime();
    scene.render((now - lastMS) / 1000);
    lastMS = now;
}

export const root3D = {
    "transform": {
        "position": [0, 0, 0],
        "rotate": [0, 0, 0],
        "scale": [1, 1, 1]
    },
    "name": "root",
    "type": "node",
    "children": []
}

export const root2D = {
    "transform": {
        "position": [0, 0, 0],
        "rotate": [0, 0, 0],
        "scale": [1, 1, 1]
    },
    "attachment": "2D",
    "name": "root",
    "type": "node",
    "children": []
}

export const create = (obj: Json): void => {
    let func = toFunc(compile(jsonStr, Parser));
    let o = toJson(func(null, obj, null));
    o._show = obj._show || {};
    o._show.old = o;

    root3D.children.push(o._show.old);

    scene.insert(o, (<any>root3D)._show.old, reaTab);
    return o;
}

export const remove = (obj: Json): void => {
    scene.remove(obj);
}

export const removes = (start, count): void => {
    for (var i = start; i < count; i++) {
        remove(objs[i]);
    }
}

export const creates = (count: number): void => {
    for (var i = 0; i < count; i++) {
        var o = create({});
        objs[i] = o;
    }
}

export const createRoot = (): void => {
    SceneApp.mgr.create(root3D);
}
export const destroyScene = (): void => {
    scene.destroy(root3D);
    reaTab.release();
}

const init = () => {

    renderer = SceneApp.mgr.createRenderer(width, height, true, 5);
    let rgb = 71 + 71 * 256 + 71 * 256 ** 2;
    renderer.setClearColor(rgb, 1.0);

    jsonStr = butil.utf8Decode(configMap.get("examples/render/res/scene/test_text.scene"));


    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/1.scene")));
    let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/scene/root.scene")));
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/anim_test.scene")));
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/scene/test_text.scene")));
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/terrain.scene")));
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/baiyutai.scene")));
    //let sceneJson = toJson(butil.utf8Decode(configMap.get("examples/render/res/p_zc001.scene")));

    scene = SceneApp.mgr.createScene(sceneData, "06scene");
    SceneApp.mgr.create(sceneJson);

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



    let sceneJson1;
    // setTimeout(function(){
    //     sceneJson1 = toJson(butil.utf8Decode(configMap.get("examples/render/res/anim_test.scene")));
    //     sceneJson1.children[0].children[1].skinnedMeshRender.material[0].map.image.filter = null;
    //     SceneApp.mgr.modify(sceneJson1, sceneJson);
    // }, 5000); 

    flyControl = new FlyControl(camera3DNode.ref.impl, 0.2, 0.1, { size: [width, height], offset: [0, 0] });

    //scene.insert(node, undefined, resTab);


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

    forelet.addHandler("onRayCast", onRayCast);

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


