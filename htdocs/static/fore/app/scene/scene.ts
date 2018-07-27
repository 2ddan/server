/**
 * @description 高层与底层的中间层
 */

//===========================导入
//pi
import { Renderer } from "pi/render3d/renderer";
import { THREE } from "pi/render3d/three";
import { clear, getSize } from 'pi/util/task_mgr';
import * as Hash from "pi/util/hash";
import { configMap } from "pi/render3d/load";
import { butil } from 'pi/lang/mod';
import { toJson } from "pi/util/util";
import { createHandlerList } from "pi/util/event";
import { create as createFrame, setInterval as setFrameInterval } from 'pi/widget/frame_mgr';
import * as Genhjson from "pi/compile/genhjson";

import { commonjs } from 'pi/lang/mod';
//scene
import {Camera2d, Camera3d} from "./class";
// import { create } from "app/scene/stats_d";
//MOD
import { Pi } from 'app/mod/pi';
import { Device } from "app/mod/device";



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
    //帧率图
    stats,
    //帧率
    ftime,
    _FPS = 0,
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

let FpsNode = {
    type : "team_damage",
    text : "fps:0;task:0;slowtime:0",
    x : 0,
    y : 0,
    z : 0,
    horizontalAlign : "center",
    verticalAlign : "center",
    textcfg : "nodeFps",
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
    const parseRtpl = (k,fm) => {
        let tpl = Genhjson.toFun(butil.utf8Decode(fm));
        rtplMap.set(k, tpl);
    };
    let t = Date.now(),len = 145;
    let a = [];
    let _k;
    for (let k in filesMap) {
        if (k.startsWith("app/scene/")) {
            let type = butil.fileSuffix(k);
            if (type === "json" && k.startsWith("app/scene/template/")) {
                // let tpl = toFunc(compile(butil.utf8Decode(filesMap[k]), Parser))
                // templateMap.set(k, tpl);
                _k = k.replace(".json", "");
                if (templateMap.get(_k) === undefined) {
                    templateMap.set(_k, 0);
                    releaseDefine(filesMap[k]);
                }
            }
            if (type === "rtpl") {
                _k = k;
                a.push(_k);
                if (!_k.startsWith("app/scene/rtpl/")) {
                    _k = _k.substring(_k.lastIndexOf("/") + 1);
                }
                _k = _k.replace(".rtpl","");
                if(rtplMap.get(_k) === undefined){
                    rtplMap.set(_k,0);
                    releaseDefine(filesMap[k]);
                }
            }
            if (type === "js" && k.startsWith("app/scene/cfg/")) {
                let f = parseFile(k),
                    m = (window as any).pi_modules[f.module].exports;
                if (m) _cfg[f.name] = m;
            }
        }
    }
    // console.log(a);
    // if(Date.now()-t > 1000){
        // alert(len+"/"+a.length+" == slow build :: "+JSON.stringify(a));
    // }
}
/**
 * @description 设置canvas缩放
 * @param {number}c
 */
export const setScale = (c,flags) => {
    let v,bv = 1.2,m;
    if(flags.os.name == "unknown"){
        if(c<100){
            scale = mgr_data.scale = .5;
        }else{
            let m = c>350?1800:350,
                r = (1/m)*c;
            r = r>1?1:r;
            scale = mgr_data.scale = 0.7+r/2;
        }
    }else if(flags.device.platform == "iPhone"){
        m = Device.getGlRenderer() || "";
        m = m.match(/Apple A(\d+) /);
        if(m){
            m = m[1];
            m = bv+(m-9)/10;
            m = m > bv?bv:m;
            scale = mgr_data.scale = m;
        }
    }else if(flags.os.name != "android"){
        v = bv+(c/1000-5)/10;
        v += (v-1);
        v = v > bv?bv:v;
        scale = mgr_data.scale = v;
        // return;
    }else{
        v = parseInt(flags.os.version);
        if(v){
            v = bv+(v-8)/10;
            v = v > bv?bv:v;
            scale = mgr_data.scale = v;
            // return;
        }
    }
    // alert(scale+" "+c+" "+(32+(scale-1)*10*4));
    mgr.setFPS(32+(scale-1)*10*4);
    // mgr.setFPS(40);
};

/**
 * @description 得到模型的json或rtpl的模板
 */
const getTemplateFunction = (type: string, filename: string) => {
    let fun,m,p;
    if(type === "json"){
        m = templateMap;
        p = `app/scene/template/${filename}`;
    }else{
        m =rtplMap;
        p = `app/scene/rtpl/${filename}`;
    }
    fun = m.get(p);
    if(fun.compile){
        fun = fun.f;
    }else{
        fun.compile = 1;
        fun.f = fun.f(Hash.nextHash, Hash.anyHash, commonjs ? commonjs.relativeGet:null);
        fun = fun.f;
    }

    return fun;
}


/**
 * @description 场景
 */

export class mgr {
    /**
     * @description 理想帧率
     */
    static FPS = 40
    /**
     * @description 真实帧率
     */
    static _FPS = 0
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
    /**
     * @description 渲染循环
     */
    static render() {
        var frame = createFrame();
        // tslint:disable-next-line:no-string-based-set-interval
        frame.setInterval(Pi.debug ? 1000 / this.FPS : 1000 / this.FPS);
        setFrameInterval(frame);
        frame.setPermanent( ()=>{
                if (pause[mgr_data.name] || !scene[mgr_data.name])
                    return;
                let now = Date.now();
                // requestAnimationFrame(mgr.render);
                //if (Date.now()-t>20)
                //alert(Date.now()-20)
                
                ftime = ftime || now;
                this._FPS += 1;
                
                if (now - ftime >= 1000) {
                    ftime = now;
                    let slowCost = frame.getLastStat();
                    if(Pi.debug){
                        FpsNode.text = "fps:"+this._FPS+";task:" + getSize()+";slowtime:"+slowCost.frame.slowCost.toFixed(1);
                        mgr.modify(FpsNode);
                        // stats.update()
                    }
                    this._FPS = 0;
                }
                // if (now - lastTime < 1000 / rangFrame[2]) {
                //     return;
                // }
                lastTime = now;
                let delta = clock.getDelta();
                renderHandlerList({type:"before",delta:delta});
                scene[mgr_data.name].render(delta, true);
                renderHandlerList({type:"after",delta:delta});
            }
        );
        
    }

    /**
     * @description 得到真实帧率
     */
    static getFPS() {
        return _FPS;
    }
    /**
     * @description 设置理想帧率
     */
    static setFPS(_f){
        if(_f>40){
            return this.FPS = 40;
        }
        this.FPS = _f;
    }
    /**
     * @description 暂停场景渲染
     */
    static pause(b, name?) {
        name = name || mgr_data.name;
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
        scene[name].scene.radius = 10;
        //创建2D摄像机
        scene1.insert(new Camera2d(width[name],height[name]));
        //创建3D摄像机
        if (cameraData) {
            cameraData.perspective[1] = width[name] / height[name];
            camera[name] = new Camera3d(cameraData);
            mgr.create(camera[name], "camera");
        }
        div[mgr_data.name] = this.initDiv(width[mgr_data.name], height[mgr_data.name]);
        if(Pi.debug){
            mgr.create(FpsNode,"text");
            // stats = create();
            // document.appendChild(stats);
        }
    }

    static parseRtpl(data) {

        let parse = (fn: string, dt) => {
            let tplfun = getTemplateFunction("rtpl", fn);
            return tplfun(null, dt);
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
            obj = func(undefined, data);
            obj = this.parseRtpl(obj);
        } else{
            obj = data;
        }

        let time1 = Date.now();
        addHash(obj,false);
        let time2 = Date.now();
        // console.log("create消耗时间+"+(time2 - time1),type);
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
            obj = data._show.tpl(undefined, data);
            obj = this.parseRtpl(obj);
            addHash(obj,false);
            // if(data.hidden !== undefined || data.visible !== undefined){
            //     SetVisible(data,!data.hidden);
            // }
        } catch (e) {
            console.log(data._show.tpl(data));
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
    static setPos(data, position: Array<number>, lookat?: any) {
        let anim;
        data._show.old.transform.position[0] = position[0];
        data._show.old.transform.position[1] = position[2] || 0;
        data._show.old.transform.position[2] = position[1];
        let isfirst = true;

        if (lookat) {
            //改变该模型的朝向
            data._show.old.children[0].lookatOnce.value = [lookat.value[0] - position[0], lookat.value[2] - position[2], lookat.value[1] - position[1]];
            data._show.old.children[0].lookatOnce.sign = lookat.sign;

        }

        if (data._show.old.ref) {
            scene[mgr_data.name].modify(data._show.old, ["transform", "position"]);
            if (lookat) {
                scene[mgr_data.name].modify(data._show.old.children[0], ["lookatOnce"]);
            }
        }
    }
    static setRotate(data, rotate){
        data = data.ref ? data : data._show.old;
        data.transform.rotate[0] = rotate[0];
        data.transform.rotate[1] = rotate[1];
        data.transform.rotate[2] = rotate[2];
        scene[mgr_data.name].modify(data, ["transform", "rotate"]);
    }
    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param anim: 动作
     */
    static setAnimator(data) {
        if (data.playAnim.name !== data._show.old.children[0].animator.playAnim.name){
            data._show.old.children[0].animator.playAnim.name = data.playAnim.name;
            data._show.old.children[0].animator.playAnim.isOnce = !!data.playAnim.isOnce;
            if(data.playAnim.id > 0){
                data._show.old.children[0].animator.playAnim.id = data.playAnim.id;
            }
            scene[mgr_data.name].modify(data._show.old.children[0], ["animator", "playAnim"]);
        } 
    }
    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param position: 位置
     */
    static setOnlyPos(data, position: Array<number>) {
        let obj;
        if(data.ref){
            obj = data;
        }else if(data._show.old.ref){
            obj = data._show.old;
        }
        if(!obj){
            return;
        }
        obj.transform.position[0] = position[0];
        obj.transform.position[1] = position[2] || 0;
        obj.transform.position[2] = position[1];
        scene[mgr_data.name].modify(obj, ["transform", "position"]);
    }
    /**
     * @description 设置场景对象的朝向
     * @param data: 需要更新的场景对象
     * @param lookat: 朝向
     */
    static setLookAt(data,lookat) {
        data._show.old.lookatOnce.value = [lookat.value[0], lookat.value[2], lookat.value[1]];
        data._show.old.lookatOnce.sign = lookat.sign;
        scene[mgr_data.name].modify(data._show.old, ["lookatOnce"]);
    }
    /**
     * 修改3D相机位置
     */
    static setCameraPos(data,position) {
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
    static setDamage(data: any, scale?,index?: number, opacity?,  visible?: boolean, color?: number,position? : Array<number>) {
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
        if (position){
            data._show.old.transform.position[0] = position[0];
            data._show.old.transform.position[1] = position[2] || 0;
            data._show.old.transform.position[2] = position[1];
            scene[mgr_data.name].modify(data._show.old, ["transform","position"]);
        }

    }
    /**
     * @description 更新血条缩放 
     * @param data 需要更新的模型信息
     * @param index 支持在根节点下的任何一个子节点，但是不支持节点的节点
     * @param sclae:数组 缩放
     */
    static setHP(data: any, index?: number, scale?,visible? ) {
        index = index || 0;
        scale = (typeof scale !== "number") ? scale : [scale, scale, scale];
        if (scale) {
            data._show.old.children[1].children[index].children[0].transform.scale = scale;
            scene[mgr_data.name].modify(data._show.old.children[1].children[index].children[0], ["transform","scale"]);
        }
        if(visible || visible == false){
            // data._show.old.children[1].children[index].meshRender.visible = false;
            data._show.old.children[1].children[index].children[0].meshRender.visible = visible;
            // SetVisible(data,visible);
            // scene.modify(data._show.old.children[1].children[index], ["meshRender","visible"]);
            scene[mgr_data.name].modify(data._show.old.children[1].children[index].children[0], ["meshRender","visible"]);
        }
    }
    /**
     * @description 初始化血条状态
     * @param data 
     * @param index 
     * @param scale 
     * @param visible 
     */
    static initializationHP(data: any, index?: number, scale?,visible? ) {
        index = index || 0;
        scale = (typeof scale !== "number") ? scale : [scale, scale, scale];

        // data._show.old.children[1].children[index].meshRender.visible = false;
        data._show.old.children[1].children[index].children[0].meshRender.visible = true;
        // SetVisible(data,visible);
        // scene.modify(data._show.old.children[1].children[index], ["meshRender","visible"]);
        scene[mgr_data.name].modify(data._show.old.children[1].children[index].children[0], ["meshRender","visible"]);
        
        data._show.old.children[1].children[index].children[0].geometry.width = 74.36;
        // SetVisible(data,visible);
        // scene.modify(data._show.old.children[1].children[index], ["meshRender","visible"]);
        scene[mgr_data.name].modify(data._show.old.children[1].children[index].children[0], ["geometry","width"]);

        data._show.old.children[1].children[index].children[0].transform.scale = [1,1,1];
        scene[mgr_data.name].modify(data._show.old.children[1].children[index].children[0], ["transform","scale"]);
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
     * description 更新文字节点（无子节点）
     * @param data：需要更新的模型信息
     * @param str：文字
     * @param index：支持在根节点下的任何一个子节点
     * @param child：支持在index的节点下的任何一个子节点
     */
    static setTextNoChild(data: any, str?: string, visible?: boolean) {
        if(str){
            data._show.old.textCon.show = str;
            scene[mgr_data.name].modify(data._show.old, ["textCon"]);
        }
        if(visible){
            data._show.old.textCon.show = str;
            scene[mgr_data.name].modify(data._show.old, ["textCon"]);
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
     * @description 设置场景对象的一次性动画
     * @param data：需要更新的模型信息
     * @param index：支持在根节点下的任何一个子节点
     * @param visible：可见性
     */
    static setVisibled(data, index: any, visible: boolean) {
        index = index || 0;
        // data._show.old.children[index].ref.impl.__visible = visible;
        // mgr.modify(data);
        let _data = data._show.old.children[index];
        for(let i=0;i<_data.children.length;i++){
            let child = _data.children[i];
            fun(child);
            if (child.meshRender) {
                if(child.meshRender.visible == visible){
                    continue;
                }
                child.meshRender.visible = visible;
                scene[mgr_data.name].modify(child, ["meshRender", "visible"]);
            }
        }

        function fun (node) {
            if (node.children) {
                for(let j=0,len=node.children.length;j<len;j++){
                    let v = node.children[j];
                    fun(v);
                    if (v.meshRender) {
                        if(v.meshRender.visible == visible){
                            continue;
                        }
                        v.meshRender.visible = visible;
                        scene[mgr_data.name].modify(v, ["meshRender", "visible"]);
                    }
                }

            } 
        }
    }

    /**
     * @description 移除指定数据对应的场景对象
     */
    static remove(data, name?: string) {
        name = name || mgr_data.name;
        if(!data)return;
        const old = data.old || data._show.old;
        try {
            scene[name].remove(old);
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

const addHash = function (obj,boolean) {
    let k, parentHash = 0,
        childHash = 0,
        keyHash = 0,
        valueHash = 0;
    if(obj["_$hash"] && boolean){
        return obj["_$hash"];
    }
    for (k in obj) {
        let v = obj[k];
        keyHash = Hash.iterHashCode(k, 0, Hash.charHash);
        if ('object' === typeof v) {
            if (v === null)
                continue;
            else {
                v["_$hash"] = valueHash = addHash(v,boolean);
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


/**
 * @description 设置显示隐藏
 */
const SetVisible = function (obj,boolean) {
    if(obj._show && obj._show.old.ref){
        obj._show.old.ref.impl.__visible = boolean;
    }
}

// 用BlobURL的方式加载的模块，二进制转换字符串及编译，浏览器内核会异步处理
// 创建函数的方式加载，二进制转换字符串及编译，主线程同步处理性能不好
const releaseDefine = function (data/*:ArrayBuffer*/) {
    var blob = new Blob([data], { type: "text/javascript" });
    loadJS({src: URL.createObjectURL(blob), revokeURL: URL.revokeObjectURL });
};

const loadJS = function (cfg) {
    var head = document.head;
    var n:any = document.createElement('script');
    n.charset = 'utf8';
    n.onerror = function (e) {
        n.onload = n.onerror = undefined;
        head.removeChild(n);
        cfg.revokeURL && cfg.revokeURL(cfg.src);
    };
    n.onload = function () {
        n.onload = n.onerror = undefined;
        head.removeChild(n);
        cfg.revokeURL && cfg.revokeURL(cfg.src);
    };
    n.async = true;
    n.crossorigin = true;
    n.src = cfg.src;
    head.appendChild(n);
};

(self as any).$difineRTPL = (name,func) => {
    if(rtplMap.get(name) === 0){
        // rtplMap.set(name, func(hash.nextHash, hash.anyHash, commonjs ? commonjs.relativeGet:null));
        rtplMap.set(name, {f:func,compile:0});
    }  
    if (templateMap.get(name) === 0) {
        // rtplMap.set(name, func(hash.nextHash, hash.anyHash, commonjs ? commonjs.relativeGet:null));
        templateMap.set(name, { f: func, compile: 0 });
    }
}