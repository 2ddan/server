/**
 * @description 高层与底层的中间层
 */

//===========================导入
import { Renderer } from "pi/render3d/renderer";
import { THREE } from "pi/render3d/three";
import { ResTab } from "pi/util/res_mgr";
import { clear } from 'pi/util/task_mgr';
import * as Hash from "pi/util/hash";
import { configMap, findRes } from "pi/render3d/load";
import { butil } from 'pi/lang/mod';
import { toJson } from "pi/util/util";
import { toFun, toFunc, compile } from "pi/util/tpl";
import { Parser } from "pi/util/tpl_str";
import { createHandlerList } from "pi/util/event";

let resTab = {},
    limitTime,
    //场景，宽，高，div，相机，渲染集合
    div = {},
    width = {},
    height = {},
    pause = {},
    camera: any = {},
    scene = {},
    //渲染器
    renderer,
    isHaveRenderer: boolean,
    //场景缩放比列
    scale = 1,
    //模型的配置文件
    _cfg = {},
    //帧率
    ftime,
    rangFrame = [10,33,60],//最低，最高，采用
    FPS = 0,
    lastTime = new Date().getTime(),
    clock = new THREE.Clock(),
    //模型的json模板
    templateMap = new Map<string, any>(),
    //模型的rtpl模板;
    rtplMap = new Map<string, any>(),
    //粒子特效
    sceneMap = new Map<string, any>();
/**
 * @description 渲染事件列表
 * @type {
 *  before : 渲染前调用
 *  after  : 渲染后调用
 * }
 */
export const renderHandlerList = createHandlerList();

export let mgr_data = {
    "name": "",
    "div": div,
    "camera": camera,
    "_cfg": _cfg,
    "sceneTab": {},
    "threeScene": scene,
    "limitTime": limitTime,
    "scale": scale,
    "fightSceneName":""
}

/**
 * @description 设置模型的配置文件（美术导出）
 */
export const set_cfg = (filesMap) => {
    const parseFile = (filename) => {
        //todo..
        filename = filename.split(".")[0];
        let name = filename.split("/");

        return { module: filename, name: name[name.length - 1] };
    };
    for (let k in filesMap) {
        if (k.startsWith("app/scene/")) {
            let type = butil.fileSuffix(k);
            if (type === "json" && k.startsWith("app/scene/template/")) {
                let tpl = toFunc(compile(butil.utf8Decode(filesMap[k]), Parser))
                templateMap.set(k, tpl);
            }
            if (type === "rtpl" && k.startsWith("app/scene/rtpl/")) {
                let tpl = toFunc(compile(butil.utf8Decode(filesMap[k]), Parser))
                rtplMap.set(k, tpl);
            }
            if (type === "js" && k.startsWith("app/scene/cfg/")) {
                let f = parseFile(k),
                    m = (window as any).pi_modules[f.module].exports;
                if (m) _cfg[f.name] = m;
            }
        }
    }
}
/**
 * @description 设置canvas缩放
 * @param {number}c
 */
export const setScale = (c) => {
    if(c<100){
        scale = mgr_data.scale = .5;
        return;
    }
    let m = c>350?1800:350,
        r = (1/m)*c;
    r = r>1?1:r;
    scale = mgr_data.scale = 1+r/2;
    //alert(c+","+scale);
};

/**
 * @description 得到模型的json或rtpl的模板
 */
const getTemplateFunction = (type: string, filename: string) => {
    let fun;
    if (type === "json") {
        fun = templateMap.get("app/scene/template/" + filename + ".json");
    } else {
        fun = rtplMap.get("app/scene/rtpl/" + filename + ".rtpl");
    }

    return fun;
}


/**
 * @description 场景
 */

export class mgr {
    /**
     * @description new新实例
     */
    static yszzFight = {
        fighter: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        effect: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        otherEffect: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        skillImage: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        mesh: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        scene: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        damage: (obj: Object) => JSON.parse(JSON.stringify(obj)),
        camera: (obj: Object) => JSON.parse(JSON.stringify(obj))
    }

    /**
     * @description 初始化场景
     */
    static init() {
        if (!isHaveRenderer) {
            isHaveRenderer = true;
            renderer = new Renderer(50, 50, true);
            mgr.render();
            //alert("renderer init!!");
        }
    }

    static render() {
        let now = Date.now();
        requestAnimationFrame(mgr.render);
        //if (Date.now()-t>20)
        //alert(Date.now()-20)
        if (pause[mgr_data.name] || !scene[mgr_data.name])
            return;
        ftime = ftime || now;
        FPS += 1;
        if (now - ftime >= 1000) {
            ftime = now;
            caclFrame.add(FPS) && caclFrame.clear();
            // console.log(FPS,rangFrame[2]);
            FPS = 0;
        }
        if (now - lastTime < 1000 / rangFrame[2]) {
            return;
        }
        lastTime = now;
        let delta = clock.getDelta();
        // console.log(delta*1000);
        renderHandlerList({type:"before",delta:delta});
        scene[mgr_data.name].render(delta, true);
        renderHandlerList({type:"after",delta:delta});
    }
    static getproperties(){
        return scene[mgr_data.name].properties;
    }

    /**
     * @description 得到帧率
     */
    static FPS() {
        return FPS;
    }

    /**
     * @description 暂停场景渲染
     */
    static pause(b, name?) {
        name = name || mgr_data.name;
        if(pause[name] != b && pause[name]){
            caclFrame.clear();
        }
        pause[name] = b;
        if (!b) {
            renderer.setSize(width[mgr_data.name], height[mgr_data.name]);
        }
    }

    /**
     * @description getAnimTime
     */
    static getPause() {
        return pause[mgr_data.name];
    }

    /**
     * @description 重置场景，清除老场景，换成新场景
     */
    static reset(sceneData: Object, name: string, camera: Object, w: number, h: number) {
        mgr.destroyScene(name);
        mgr.createScene(sceneData, name, camera, w, h);
    }

    /**
     * @description 销毁场景
     */
    static destroyScene(name: string) {
        if (scene[name]) {
            try {
                if (resTab[name]) {
                    resTab[name].release();
                    resTab[name] = undefined;
                }
                console.log("destroyScene "+name);
                scene[name].destroy();
                scene[name] = undefined;
                camera[name] = undefined;
                div[name] = undefined;
                clear(60000, 1);
            } catch (e) {
                console.log(e);
            }
        }
    }

    /**
     * @description 创建场景
     */
    static createScene(sceneData: any, name: string, cameraData: any, w: number, h: number) {
        mgr_data.name = name;
        width[name] = w * scale;
        height[name] = h * scale;
        resTab[name] = sceneData.resTab;
        renderer.setSize(width[name], height[name]);
        let scene1 = renderer.createScene(sceneData);
        scene[name] = scene1;
        //创建2D摄像机
        let camera2D = {
            "transform": {
                scale: [1, 1, -1],
                rotate: [0, 3.14159265, 0],
                position: [1, 1, 1]
            },
            "camera": {
                "ortho": [-width[name] / 2, width[name] / 2, height[name] / 2, -height[name] / 2, -10000, 10000]
            }
        };
        camera2D = mgr.yszzFight.camera(camera2D);
        scene1.insert(camera2D);
        //创建3D摄像机
        if (cameraData) {
            cameraData.perspective[1] = width[name] / height[name];
            camera[name] = mgr.yszzFight.camera(cameraData);
            mgr.create(camera[name], "camera");
        }
        div[mgr_data.name] = this.initDiv(width[mgr_data.name], height[mgr_data.name]);
    }

    static parseRtpl(data) {

        let parse = (fn: string, dt) => {
            let tplfun = getTemplateFunction("rtpl", fn);
            return JSON.parse(tplfun(null, dt));
        }

        let parseChild = (obj) => {
            if (obj.type === "prefab") {
                let o2 = parse(obj.tpl, obj);
                obj = o2;
                parseChild(o2);
            }
            if (obj && obj.children) {
                let children = obj.children;
                for (let i = 0; i < children.length; i++) {
                    if (!children[i]) continue;
                    if (children[i].type === "prefab") {
                        let o = parse(children[i].tpl, children[i]);
                        obj.children[i] = o;
                        parseChild(o);
                    } else if (children[i].children) {
                        let child = children[i].children;
                        for (let j = 0; j < child.length; j++) {
                            if (child[j] && child[j].type === "prefab") {
                                let o1 = parse(child[j].tpl, child[j]);
                                obj.children[i].children[j] = o1;
                                parseChild(o1);
                            }
                        }
                    }
                }
            }
            return obj;
        }

        return parseChild(data);
    }

    /**
     * @description 创建指定数据对应的场景对象
     */
    static create(data, type?, parent?, scenename?, time?) {
        //if (type === "effect") return
        let func;
        let obj;
        if (type) {
            func = getTemplateFunction("json", type);;
            try {
                obj = JSON.parse(func(undefined, data));
                obj = this.parseRtpl(obj)
            } catch (e) {
                console.log(data, e);
            }
        } else obj = data;

        addHash(obj);
        if (type) {
            data._show = data._show || {};
            data._show.tpl = func;
            data._show.old = obj;

        }
        scenename = scenename || mgr_data.name;

        if (parent) {
            parent = parent;
        }

        scene[scenename].insert(obj, parent, resTab[mgr_data.name]);
    }

    /**
     * @description 修改指定数据对应的场景对象
     * 低2祯
     */
    static modify(data, name?) {
        let obj;
        if (!data) {
            console.log(data);
        }

        try {
            obj = JSON.parse(data._show.tpl(undefined, data));
            obj = this.parseRtpl(obj)
            addHash(obj);
        } catch (e) {
            console.log(data._show.tpl(undefined, data));
        }

        if (data._show.old.ref){
            mergeNode(obj, data._show.old, data._show.old.resTab, "position", name);
        }
            
    }

    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param position: 位置
     * @param lookat: 朝向
     * @param anim: 动作
     */
    static setPos(data, position: Array<number>, lookat?: any, anim?: string) {

        data._show.old.transform.position[0] = position[0];
        data._show.old.transform.position[1] = position[2] || 0;
        data._show.old.transform.position[2] = position[1];
        let isfirst = true;

        if (lookat && anim) {
            //改变该模型的朝向
            data._show.old.children[0].lookatOnce.value = [lookat.value[0] - position[0], lookat.value[2] - position[2], lookat.value[1] - position[1]];
            data._show.old.children[0].lookatOnce.sign = lookat.sign;
            //改变该模型的动作，若一致，则不变
            if (anim === data._show.old.children[0].animator.playAnim.name) isfirst = false;
            else data._show.old.children[0].animator.playAnim.name = anim;
        }

        if (data._show.old.ref) {
            scene[mgr_data.name].modify(data._show.old, ["transform", "position"]);
            if (lookat && anim) {
                scene[mgr_data.name].modify(data._show.old.children[0], ["lookatOnce"]);
                if (isfirst){
                    scene[mgr_data.name].modify(data._show.old.children[0], ["animator", "playAnim"]);
                }
            }
        }
    }

    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param anim: 动作
     */
    static setAnimator(data, anim, isOnce?) {
        if (anim !== data._show.old.children[0].animator.playAnim.name){
            data._show.old.children[0].animator.playAnim.name = anim;
            data._show.old.children[0].animator.playAnim.isOnce = !!isOnce;
            scene[mgr_data.name].modify(data._show.old.children[0], ["animator", "playAnim"]);
        } 
    }
    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param position: 位置
     */
    static setOnlyPos(data, position: Array<number>) {
        data._show.old.transform.position[0] = position[0];
        data._show.old.transform.position[1] = position[2] || 0;
        data._show.old.transform.position[2] = position[1];
        if (data._show.old.ref) {
            scene[mgr_data.name].modify(data._show.old, ["transform", "position"]);
        }
    }


    /**
     * @description 飘字设置缩放，可见，颜色
     * @param data：需要更新的模型信息
     * @param scale：若传进来的值不是等比缩放，可传数组，反之，可只传一个等比缩放的数
     * @param index：支持在根节点下的任何一个子节点，但是不支持节点的节点
     * @param vivisible：可见性
     * @param color：颜色
     */
    static setDamage(data: any, scale?,index?: number, opacity?,  visible?: boolean, color?: number) {
        index = index || 0;
        scale = (typeof scale !== "number") ? scale : [scale, scale, scale];
        if (scale) {
            data._show.old.children[index].transform.scale = scale;
            scene[mgr_data.name].modify(data._show.old.children[index], ["transform","scale"]);
        }
        if (opacity !== undefined && data._show.old.children[index].textCon) {
            data._show.old.children[index].textCon.opacity = opacity; 
            scene[mgr_data.name].modify(data._show.old.children[index], ["textCon"]);
        }
        if (color) {
            data._show.old.children[index].color = color;
            scene[mgr_data.name].modify(data._show.old.children[0], ["color"]);
        }

    }

    /**
     * @description 更新图片节点
     * @param data：需要更新的模型信息
     * @param index：支持在根节点下的任何一个子节点，但是不支持节点的节点
     * @param image：图片
     */
    static setImage(data: any, image: string, index?: number) {
        index = index || 0;
        data._show.old.children[index].meshRender.material.map = {
            "image": { "name": image }
        }
        scene[mgr_data.name].modify(data._show.old.children[index], ["meshRender", "material", "map"]);
    }

    /**
     * description 更新文字节点
     * @param data：需要更新的模型信息
     * @param str：文字
     * @param index：支持在根节点下的任何一个子节点
     * @param child：支持在index的节点下的任何一个子节点
     */
    static setText(data: any, str: string, index: number, child?: number) {
        if (child !== undefined) {
            data._show.old.children[index].children[child].textCon.show = str + "";
            scene[mgr_data.name].modify(data._show.old.children[index].children[child], ["textCon"]);
        } else {
            data._show.old.children[index].textCon.show = str + "";
            scene[mgr_data.name].modify(data._show.old.children[index], ["textCon"]);
        }
    }

    /**
     * @description 设置场景对象的一次性动画
     * @param data：需要更新的模型信息
     * @param position 模型位置，和lookat配合使用
     * @param lookat 看向某点，和position配合使用
     * @param playAnim {"value":动作名字，"isOnce":是否为一次性动画}
     */
    static setAnimationOnce(data, playAnim: any, lookat?: any, position?) {
        if (lookat) {
            data._show.old.children[0].lookatOnce.value = [lookat.value[0] - position[0], lookat.value[2] - position[2], lookat.value[1] - position[1]];
            data._show.old.children[0].lookatOnce.sign = lookat.sign;
            scene[mgr_data.name].modify(data._show.old.children[0], ["lookatOnce"]);
        }
        data._show.old.children[0].animator.playAnim = playAnim;
        scene[mgr_data.name].modify(data._show.old.children[0], ["animator", "playAnim"]);
    }

    /**
     * @description 移除指定数据对应的场景对象
     */
    static remove(data, name?: string) {
        name = name || mgr_data.name;
        if(!data)return;
        try {
            scene[name].remove(data._show.old);
        } catch (ex) {
            if (console) {
                console.log("remove, ex: ", ex);
            }
        }
    }

    /**
     * @description 得到canvas
     */
    static getCanvas() {
        if (!div[mgr_data.name] || div[mgr_data.name].childNodes.length === 0) {
            div[mgr_data.name] = this.initDiv(width[mgr_data.name], height[mgr_data.name]);
        }
        return div[mgr_data.name];
    }

    /**
     * @description 将canvas放大再缩小
     * @param w 
     * @param h 
     */
    static initDiv(w, h) {
        let d =  renderer.getCanvas()
        let dScale = 1 / mgr_data.scale;

        d.setAttribute("style", "position:absolute;left:50%;top:50%;margin-left:-" + w / 2 + "px;margin-top:-" + h / 2 + "px;width:" + w + "px;height:" + h + "px;-webkit-transform:scale(" + dScale + "," + dScale + ");-moz-transform:scale(" + dScale + "," + dScale + ");-ms-transform:scale(" + dScale + "," + dScale + ");transform:scale(" + dScale + "," + dScale + ")");

        return d;
    }

    /**
     * @description 将canvas返回前一个场景
     * @param widgetNode : 需要返回的场景节点
     * @param name: 需要返回的场景名字
     */
    static continueScene(widgetNode, name) {
		let div = widgetNode;
		if (!div) return; 
		let target = div.tree.link;
		let canvas;

		mgr.pause(true);//停止老的场景渲染
        mgr_data.name = name;
        canvas = mgr.getCanvas();
		target.appendChild(canvas);
		mgr.pause(false);
		mgr_data.div[name] = canvas
		return div;

	};

    /**
     * @description 得到完整的场景文件
     */
    static getSceneFile(name) {
        let r = sceneMap.get(name);
        if(r){
            return JSON.parse(JSON.stringify(r));
        }
        r = toJson(butil.utf8Decode(mgr.getSceneBuffer(name,".scene")));
        sceneMap.set(name,r);
        return JSON.parse(JSON.stringify(r));
    }
    /**
     * @description 场景目录下二进制数据
     */
    static getSceneBuffer(name,suf) {
        return configMap.get("app/scene_res/res/scene/" + name +suf);
    }
}

//============================本地
/**
 * @description 动态计算应用帧率
 */
class CaclFrame {
    /**
     * 
     * @param _rangFrame [最低，最高，当前] 取值范围
     * @param start 样本截取位置
     * @param count 样本截取数量
     */
    constructor(_rangFrame:Array<number>,start?:number,count?:number){
        this.rang = _rangFrame;
        if(start)this.start = start;
        if(count)this.count = count;
        this.max = this.start + this.count + 1;
    }
    private start:number = 5; //样本截取位置
    private count:number = 10; //样本截取数量
    private max:number = 16; //样本上限达到该数量开始计算
    private rang:Array<number> //[最低，最高，当前] 取值范围
    private d:Array<number> = [] //样本采集数组
    private c():number{
        let a = this.d.splice(this.start,this.count),t = 0,r;
        for(let i =0;i<this.count;i++){
            t += a[i];
        }
        return t / this.count;
    }
    /**
     * @description 清空样本
     */
    public clear():void{
        this.d = [];
    }
    /**
     * @description 添加样本
     */
    public add(f):boolean{
        this.d.push(f);
        //样本达到上限
        if(this.d.length == this.max){
            let r = this.c();
            r -= 3;
            if(r > this.rang[1])
                r = this.rang[1];
            else if(r < this.rang[0])
                r = this.rang[0];
            this.rang[2] = r;
            this.d = [];
            return true;
        }
        return false;
    };
}
let caclFrame = new CaclFrame(rangFrame,5,5);

const mergeProperty = (obj, newAttr, old, key, resTab, attr, name) => {
    let i;
    let oldAttr = old[key];
    let cAttr = attr.concat([key]);
    let endAttr = {
        "image": true,
        "lookatOnce": true,
        "playAnim": true,
        "position": true,
        "scale": true,
        "rotate": true,
        "geometry": true,
        "textCon": true 
    };

    if (key === "_$hash" || key === "_show")
        return;
    if (!newAttr && !oldAttr) return;

    if ('object' === typeof newAttr) {
        if (key === 'children') {
            for (i = newAttr.length - 1; i >= 0; i--) {
                let v = newAttr[i];
                let oldv = oldAttr[i];
                if (!v && oldv) {
                    old[i] = v;
                    scene[name].remove(oldv);
                } else if (v && !oldv) {
                    old[i] = v;
                    scene[name].insert(v, old, resTab);
                } else if (v && oldv) {
                    mergeNode(v, oldv, resTab, "position", name);
                }
            }
        } else if (newAttr["_$hash"] === oldAttr["_$hash"]) {
            return;
        } else if (oldAttr) {
            if (endAttr[key] === true) {
                old[key] = newAttr;
                scene[name].modify(obj, cAttr);
                return;
            }

            for (var k in newAttr) {
                mergeProperty(obj, newAttr[k], oldAttr, k, resTab, cAttr, name);
            }
        } else {
            old[key] = newAttr;
            scene[name].modify(obj, cAttr);
        }
        oldAttr["_$hash"] = newAttr["_$hash"];
    } else if (newAttr !== oldAttr) {
        old[key] = newAttr;
        scene[name].modify(obj, cAttr);
    }
}

// 合并
const mergeNode = function (newObj, old, resTab, skip?, name?) {
    name = name || mgr_data.name
    if (newObj["_$hash"] === old["_$hash"])
        return;
    for (let k in newObj) {
        // if(k === skip)
        //     continue;
        mergeProperty(old, newObj[k], old, k, resTab, [], name);
        old["_$hash"] = newObj["_$hash"];
    }
};

const addHash = function (obj) {
    let k, parentHash = 0,
        childHash = 0,
        keyHash = 0,
        valueHash = 0;;
    for (k in obj) {
        let v = obj[k];
        keyHash = Hash.iterHashCode(k, 0, Hash.charHash);

        if ('object' === typeof v) {
            if (v === null)
                continue;
            else {
                v["_$hash"] = valueHash = addHash(v);
                childHash = Hash.nextHash(keyHash, valueHash);
            }
        } else if (isNaN(v))
            childHash = Hash.iterHashCode(v, keyHash, Hash.charHash);
        else {
            if (Number.isInteger(v))
                childHash = Hash.nextHash(Hash.nextHash(keyHash, 5), v);
            else {
                childHash = Hash.nextHash(keyHash, 6);
                let v1 = Math.floor(v);
                childHash = Hash.nextHash(Hash.nextHash(childHash, v1), Math.floor((v - v1) * 0xffffffff));
            }
        }

        parentHash = Hash.nextHash(parentHash, childHash);
    }
    obj["_$hash"] = parentHash;
    return parentHash;
}