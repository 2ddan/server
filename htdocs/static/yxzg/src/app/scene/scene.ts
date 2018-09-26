/**
 * @description 高层与底层的中间层
 */

//===========================导入
//pi
import { Renderer } from "pi/render3d/renderer";
import { THREE } from "pi/render3d/three";
import { ResTab } from "pi/util/res_mgr";
import { getSize } from 'pi/util/task_mgr';
import * as Hash from "pi/util/hash";
import { configMap } from "pi/render3d/load";
import { butil } from 'pi/lang/mod';
import { toJson,call } from "pi/util/util";
import { createHandlerList } from "pi/util/event";
import { create as createFrame, setInterval as setFrameInterval } from 'pi/widget/frame_mgr';
import * as Genhjson from "pi/compile/genhjson";

import { commonjs } from 'pi/lang/mod';
//scene
import {Camera2d, Camera3d} from "./class";
//MOD
import { Pi, rootStyle, rootCfg, getWidth, getHeight, getScale } from 'app/mod/pi';

import { Stats } from "./Stats";
import { SceneHelper }      from "./sceneHelper";
import * as SceneCfg        from "./sceneCfg";

import { TPL }  from "./template/TPL";
import { RTPL } from "./rtpl/RTPL";

let resTab : any = null,
    limitTime,
    //场景，宽，高，div，相机，渲染集合
    div = {},
    _canvas : any = null,
    width : number = 0,
    height : number = 0,
    _width : any = {},
    _height : any = {},
    pause : any = null,
    camera: any = null,
    scene : any = null,
    //渲染器
    renderer,
    isHaveRenderer: boolean,
    curResTab:ResTab,//当前场景资源表
    //场景缩放比列
    scale = 1,
    //模型的配置文件
    _cfg = {},
    //帧率
    ftime,
    _FPS = 0,
    flag = true, //判断是否已经插入FPS节点
    lastTime = new Date().getTime(),
    clock = new THREE.Clock(),
    //模型的json模板
    templateMap = new Map<string, any>(),
    //模型的rtpl模板;
    rtplMap = new Map<string, any>(),
    //粒子特效
    sceneMap = new Map<string, any>();
let camera2D: any = {};
let THREEStats: Stats;
/**
 * @description 渲染事件列表
 * @type {
 *  before : 渲染前调用
 *  after  : 渲染后调用
 * }
 */
export const renderHandlerList = createHandlerList();

export let mgr_data : any = {
    "name": "",
    "camera": null,
    "camera2D": null,
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
    // let a = [];
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
                // a.push(_k);
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
    let v,bv = 1.2;
    if(flags.os.name == "unknown"){
        if(c<100){
            scale = mgr_data.scale = .5;
        }else{
            let m = c>350?1800:350,
                r = (1/m)*c;
            r = r>1?1:r;
            scale = mgr_data.scale = 0.7+r/2;
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

    
    // devicePixelRatio = Math.pow(  devicePixelRatio , 0.3 ) ;
    devicePixelRatio    = 1;
    console.log(devicePixelRatio);

    scale = 1;

    mgr_data.scale = 1;
    
    // alert(scale+" "+c+" "+(22+(scale-1)*10*4));
    // mgr.setFPS(22+(scale-1)*10*4);
    mgr.setFPS(60);
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
    static FPS = 30
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
            // initStats();
            browserAdaptive();

            initStats();
            // mgr.render();
            // return mgr.drawcanvas();
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
                if (pause || !scene)
                    return;
                let now = Date.now();

                ftime = ftime || now;
                this._FPS += 1;
                
                if (now - ftime >= 1000) {
                    ftime = now;
                    // let slowCost = frame.getLastStat();
                    // if(Pi.debug && !flag){
                    //     FpsNode.text = "fps:"+this._FPS+";task:" + getSize()+";slowtime:"+slowCost.frame.slowCost.toFixed(1);
                    //     // mgr.modify(FpsNode);
                    // }
                    this._FPS = 0;
                }
                lastTime = now;
                let delta = clock.getDelta();
                renderHandlerList({type:"before",delta:delta});
                scene.render(delta, true);
                renderHandlerList({type:"after",delta:delta});

                // SceneHelper.render2DAxisHelper( scene.scene2D );
                // SceneHelper.render3DAxisHelper( scene.scene );
                // SceneHelper.render2DGridHelper( scene.scene2D );
                // SceneHelper.renderModelsEdge( scene.meshArray );
                // SceneHelper.renderBoxHelpers( scene.meshArray );
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
        // if(_f>30){
        //     return this.FPS = 30;
        // }
        this.FPS = _f;
    }
    /**
     * @description 暂停场景渲染
     */
    static pause(b) {
        pause = b;
        if (!b) {
            renderer.setSize(width, height);
        }
    }

    /**
     * @description getAnimTime
     */
    static getPause() {
        return pause;
    }

    /**
     * @description 绘制场景
     */
    //resetScene 
    static drawcanvas = (data?) => {
        // let map1;
        // //配置
        // let scene_cfg: any = {
        //     lights: [{
        //         type: "Ambient",
        //         color: [1, 1, 1],
        //         intensity: 1.0
        //     }]
        // };
        // //配置 camera 
        // let c: any;
        // let camera_cfg = {x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}
        // c = new Camera3d(camera_cfg);
        // c._pos = {x:0,y:0};

        // if(curResTab)
        //     curResTab.release();
        
        // scene_cfg.resTab = curResTab = new ResTab();
        // curResTab.timeout = 300000;
        // mgr.createScene(scene_cfg, c, rootCfg.width, rootCfg.height);
        
        // return _canvas;
    }

    // /**
    //  * @description 重置场景，清除老场景，换成新场景
    //  */
    // static reset(sceneData: Object, camera: Object, w: number, h: number) {
    //     mgr.createScene(sceneData, camera, w, h);
    // }

    /**
     * @description 创建场景
     */
    // static createScene(sceneData: any, cameraData: any, w: number, h: number) {
    //     _canvas = renderer.getCanvas();
    //     _canvas.setAttribute("style",rootStyle(scale));
    //     width = getWidth();
    //     height = getHeight();
    //     renderer.setSize(width, height);
    //     // width = w * scale;
    //     // height = h * scale;
    //     resTab = sceneData.resTab;
        
    //     let scene1 = renderer.createScene(sceneData);
    //     scene = scene1;
    //     mgr_data.threeScene = scene;
    //     //创建2D摄像机
    //     // scene.insert(new Camera2d(width,height));
    //     scene.insert( SceneCfg.defualCamera2D );


    //     //创建3D摄像机
    //     if (cameraData) {
    //         cameraData.perspective[1] = width / height;
    //         let _camera = new Camera3d(cameraData);
    //         camera = {
    //             "fixing":false,
    //             "fixto":Math.PI*1.75,
    //             "type": "node",
    //             "transform": {
    //                 "position": [_camera.x,_camera.z,_camera.y],
    //                 "scale":  [1,1,1],
    //                 "rotate": [0,0,0]
    //             },
    //             "children": [
    //                 {
    //                     "type": "node",
    //                     "transform" : {
    //                         "position" : _camera.position,
    //                         "scale"    : [
    //                             1.0,
    //                             1.0,
    //                             -1.0
    //                         ],
    //                         "rotate"   : _camera.rotate
    //                     },
    //                     "camera": {
    //                         "perspective": _camera.perspective
    //                     }
    //                 }
    //             ]
    //         }
    //         scene.insert(camera,null,resTab);
    //     }
        
    //     _canvas.addEventListener("click",dealevents);
        
        
    // }
    
    /**
     * @description 创建场景
     */
    static createScene(sceneData: any, name: string, cameraData: any, w: number, h: number, props?) {
        
        renderer.setPixelRatio( devicePixelRatio );
        
        mgr_data.name   = name;
        _width[name]    = w * scale;
        _height[name]   = h * scale;
        
        sceneData.resTab    = new ResTab;

        resTab              = sceneData.resTab;
        renderer.setSize(_width[name], _height[name]);

        let scene1      = renderer.createScene(sceneData);

        mgr_data.threeScene = scene1;
        scene               = scene1;

        camera          = SceneCfg.getDefualtCamera();
        camera2D        = SceneCfg.getDefualtCamera2D();

        mgr.create( camera );
        mgr.create( camera2D );

        mgr_data.camera     = camera;
        mgr_data.camera2D   = camera2D;
        
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
    static create(data, type?, parent?) {

        if (type) {
            let tplFunc: Function, rtplFunc: Function;
            let obj;

            if ( TPL[type] ){
                obj = TPL[type]( data );
            }else{
                throw new Error( `${type} .tpl undefined.` );
            }

            if ( RTPL[obj.tpl] ){
                obj     = RTPL[obj.tpl]( obj );
            }else{
                throw new Error( `${obj.tpl} .rtpl undefined.` );
            }
        
            data._show      = data._show || {};
            data._show.old  = obj;

            scene.insert( obj, parent, resTab );
        }else{
            scene.insert( data, parent, resTab );
        }

    }
    
    /**
     * @description 移除指定数据对应的场景对象
     */
    static remove(data, name?: string) {
        if(!data)return;
        try {
            if (data.ref){
                scene.remove(data);
            }else{
                if ( data._show && data._show.old ){
                    scene.remove(data._show.old);
                }
            }
        } catch (ex) {
            if (console) {
                console.log("remove, ex: ", ex);
            }
        }
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

        data._show.old.transform.position[0] = position[0];
        data._show.old.transform.position[1] = position[2] || 0;
        data._show.old.transform.position[2] = position[1];

        if (lookat) {
            //改变该模型的朝向
            data._show.old.children[0].lookatOnce.value = [lookat.value[0] - position[0], lookat.value[2] - position[2], lookat.value[1] - position[1]];
            data._show.old.children[0].lookatOnce.sign = lookat.sign;
        }

        if (data._show.old.ref) {
            scene.modify(data._show.old, ["transform", "position"]);
            if (lookat) {
                scene.modify(data._show.old.children[0], ["lookatOnce"]);
            }
        }
    }

    static setLookAt = ( data, lookat?: any )=>{

        //改变该模型的朝向
        data._show.old.children[0].lookatOnce.value = [ lookat.value[0] , lookat.value[2] , lookat.value[1] ];
        data._show.old.children[0].lookatOnce.sign = lookat.sign;

        if (data._show.old.ref) {
            if (lookat) {
                scene.modify(data._show.old.children[0], ["lookatOnce"]);
            }
        }

    }
    static setRotate(data, rotate){
        data.transform.rotate[0] = rotate[0];
        data.transform.rotate[1] = rotate[1];
        data.transform.rotate[2] = rotate[2];
        if (data.ref) {
            scene.modify(data, ["transform", "rotate"]);
        }
    }

    // 对指定 mesh 显示修改
    static modifyVisible ( data:any, visible: boolean, isRt? ){
        let impl: any, ref: any;

        if ( data.ref !== undefined ){
            ref     = data.ref;
        }
        else
        {
            ref     = data._show.old.ref;
        }
        
        if ( ref.impl instanceof THREE.Text2D ){
            impl = ref.impl.children[0];
        }else{
            impl = data.ref.impl;
        }

        impl.visible = visible;
        
        // spine
		if (impl._setVisble) impl._setVisble( visible );
        // let _scene = isRt ? sceneRTs[mgr_data.name] : scene[mgr_data.name];
        // _scene.modify(data._show.old, ["visible"]);
    }
    
    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param anim: 动作
     */
    static setAnimation( data, anim: any ) {
        data._show.old.children[0].animator.playAnim  = anim;
        scene.modify(data._show.old.children[0], ["animator", "playAnim"]);
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
            scene.modify(data._show.old.children[0], ["animator", "playAnim"]);
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
        scene.modify(obj, ["transform", "position"]);
    }
    
    static setOnlyScale(data, scale: Array<number>, isRt?) {
        if ( data.ref !== undefined ){
            data.transform.scale    = [];
            data.transform.scale[0] = scale[0];
            data.transform.scale[1] = scale[1];
            data.transform.scale[2] = scale[2] || 1;

            
                scene.modify(data, ["transform", "scale"]);
                // data.ref.impl.scale.fromArray( scale );

        }else{
            data._show.old.transform.scale[0] = scale[0];
            data._show.old.transform.scale[1] = scale[1];
            data._show.old.transform.scale[2] = scale[2] || 1;

            scene.modify(data._show.old, ["transform", "scale"]);
        }
    }


    /**
     * 修改3D相机位置
     */
    static setCameraPos( data, position ) {
        data.transform.position[0] = position[0];
        data.transform.position[1] = position[2] || 0;
        data.transform.position[2] = position[1];
        if (data.ref) {
            scene.modify(data, ["transform", "position"]);
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
            scene.modify(data._show.old.children[index], ["transform","scale"]);
        }
        if (opacity !== undefined && data._show.old.children[index].textCon) {
            data._show.old.children[index].textCon.opacity = opacity; 
            scene.modify(data._show.old.children[index], ["textCon"]);
        }
        if (color) {
            data._show.old.children[index].color = color;
            scene.modify(data._show.old.children[0], ["color"]);
        }
        if (position){
            data._show.old.transform.position[0] = position[0];
            data._show.old.transform.position[1] = position[2] || 0;
            data._show.old.transform.position[2] = position[1];
            scene.modify(data._show.old, ["transform","position"]);
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
            scene.modify(data._show.old.children[1].children[index].children[0], ["transform","scale"]);
        }
        if(visible || visible == false){
            // data._show.old.children[1].children[index].meshRender.visible = false;
            data._show.old.children[1].children[index].children[0].meshRender.visible = visible;
            // SetVisible(data,visible);
            // scene.modify(data._show.old.children[1].children[index], ["meshRender","visible"]);
            scene.modify(data._show.old.children[1].children[index].children[0], ["meshRender","visible"]);
        }
    }
    
    /**
     * @description 更新图片节点
     * @param data：需要更新的模型信息
     * @param index：支持在根节点下的任何一个子节点，但是不支持节点的节点
     * @param image：图片
     */
    static setImageDetail(tagNode: any, image: string) {
        tagNode.meshRender.material.map = {
            "image": { "name": image }
        }
        scene.modify(tagNode, ["meshRender", "material", "map"]);
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
        scene.modify(data._show.old.children[1].children[index].children[0], ["meshRender","visible"]);
        
        data._show.old.children[1].children[index].children[0].geometry.width = 74.36;
        // SetVisible(data,visible);
        // scene.modify(data._show.old.children[1].children[index], ["meshRender","visible"]);
        scene.modify(data._show.old.children[1].children[index].children[0], ["geometry","width"]);

        data._show.old.children[1].children[index].children[0].transform.scale = [1,1,1];
        scene.modify(data._show.old.children[1].children[index].children[0], ["transform","scale"]);
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
        scene.modify(data._show.old.children[index], ["meshRender", "material", "map"]);
    }

    /**
     * description 更新文字节点
     * @param data：需要更新的模型信息
     * @param str：文字
     * @param index：支持在根节点下的任何一个子节点
     * @param child：支持在index的节点下的任何一个子节点
     */
    static setText(data: any) {
        
        scene.modify(data, ["textCon"]);
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
            scene.modify(data._show.old, ["textCon"]);
        }
        if(visible){
            data._show.old.textCon.show = str;
            scene.modify(data._show.old, ["textCon"]);
        }
    }
    
    static setOnlyText(data: any, str: string) {
        if(str){
            data.textCon.show = str;
            scene.modify(data, ["textCon"]);
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
            scene.modify(data._show.old.children[0], ["lookatOnce"]);
        }
        data._show.old.children[0].animator.playAnim = playAnim;
        scene.modify(data._show.old.children[0], ["animator", "playAnim"]);
    }
    /**
     * @description 设置场景对象的一次性动画
     * @param data：需要更新的模型信息
     * @param position 模型位置，和lookat配合使用
     * @param lookat 看向某点，和position配合使用
     * @param playAnim {"value":动作名字，"isOnce":是否为一次性动画}
     */
    static modifyRayid(data, v) {
        data._show.old.children[0].children[4].rayID = v;
        scene.modify(data._show.old.children[0].children[4], ["rayID"]);
    }
    /**
     * @description 设置场景对象的位置，
     * @param data: 需要更新的对象
     * @param position: 位置
     */
    static setOnlyPos2(data, position: Array<number>, isRt?) {
        if ( data.ref !== undefined ){

            if ( data.ref.impl.transform === undefined ){
                data.ref.impl.transform = {};
            }
            
            data.ref.impl.transform.position    = position;

            (data.ref.impl as THREE.Mesh).position.fromArray(position);

        }else{
            data._show.old.transform.position[0] = position[0];
            data._show.old.transform.position[1] = position[1];
            data._show.old.transform.position[2] = position[2] || 0;
            // let _scene = isRt ? sceneRTs[mgr_data.name] : scene[mgr_data.name];
            // if (data._show.old.ref) {
            //     _scene.modify(data._show.old, ["transform", "position"]);
            // }
    
            data._show.old.ref.impl.position.fromArray(data._show.old.transform.position);
        }
    }
    static modifyRotate( data, rotate: Array<number>, isRt? ) {
        
        if ( data.ref !== undefined ){

            data.ref.impl.rotation.fromArray(rotate);

        }else{
            data._show.old.transform.rotate[0] = rotate[0];
            data._show.old.transform.rotate[1] = rotate[1];
            data._show.old.transform.rotate[2] = rotate[2];
            // let _scene = isRt ? sceneRTs[mgr_data.name] : scene[mgr_data.name];
            // if (data._show.old.ref) {
            //     _scene.modify(data._show.old, ["transform", "rotate"]);
            // }
            data._show.old.ref.impl.rotation.fromArray(rotate);
        }
    }
    static setOpacity( data: any, opacity: number, isRt? ) {
        
        if ( data.ref !== undefined ){

            if ( data.ref.impl instanceof THREE.Text2D ){
                data.ref.impl.children[0].material.opacity = opacity;
            }else{
                data.ref.impl.material.opacity = opacity;
            }
        }else{
            data._show.old.meshRender.material.opacity = opacity;
            data._show.old.ref.impl.material.opacity = opacity;
        }
    }


    /**
     * @description 得到canvas
     */
    static getCanvas() {
        if (!_canvas) {
            _canvas = this.initCanvas(width, height);
        }
        return _canvas;
    }

    /**
     * @description 将canvas放大再缩小
     * @param w 
     * @param h 
     */
    static initCanvas(w, h) {
        _canvas =  renderer.getCanvas()
        let dScale = 1 / mgr_data.scale;
        // _canvas.setAttribute("style", "position:absolute;left:50%;top:50%;margin-left:-" + w / 2 + "px;margin-top:-" + h / 2 + "px;width:" + w + "px;height:" + h + "px;-webkit-transform:scale(" + dScale + "," + dScale + ");-moz-transform:scale(" + dScale + "," + dScale + ");-ms-transform:scale(" + dScale + "," + dScale + ");transform:scale(" + dScale + "," + dScale + ")");
        
        return _canvas;
    }
    /**
     * 获取相机
     */
    static getCamera () {
        return  camera;
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
        canvas = mgr.getCanvas();
		target.appendChild(canvas);
		mgr.pause(false);
		mgr_data = canvas
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
    /**
     * @description 注册场景点击事件
     */
    static addDealEvent(type,func) {
        eventsHandlers.set(type,func);
    }
}

//============================本地
//canvas的事件监听
const dealevents = (e) => {
    const param = {type:"tap",x:e.pageX,y:e.pageY,native:e};
    //TODO..场景点击位置确定
    calPos(param);
}

/**
 * @description 计算手指移动位置坐标并处理事件
 * @param event 
 */
const calPos = (event,ignoreObj?) => {
    let bound = _canvas.getBoundingClientRect();
    let x = ((event.x - bound.left) / getScale());
    let y = ((event.y - bound.top) / getScale());
    let result = scene.raycast(x, y,ignoreObj);
    let func;
    if(!result || !result.id){
        return;
    }
    console.log(result);
    if(typeof result.id == "string"){
        //result = "type-arg1-arg2-..."
        let r = result.id.split("-");
        let type = r.shift();
        func = eventsHandlers.get(type);
        func && call(func,r);
        return result;
    }else if(result.type == "terrain"){
        func = eventsHandlers.get(result.type);
        func && call(func,result);
    }
};

//canvas事件列表
const eventsHandlers:Map<string,Function> = new Map();

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
                    scene.remove(oldv);
                } else if (v && !oldv) {
                    old[i] = v;
                    scene.insert(v, old, resTab);
                } else if (v && oldv) {
                    mergeNode(v, oldv, resTab, "position", name);
                }
            }
        } else if (newAttr["_$hash"] === oldAttr["_$hash"]) {
            return;
        } else if (oldAttr) {
            if (endAttr[key] === true) {
                old[key] = newAttr;
                scene.modify(obj, cAttr);
                return;
            }

            for (var k in newAttr) {
                mergeProperty(obj, newAttr[k], oldAttr, k, resTab, cAttr, name);
            }
        } else {
            old[key] = newAttr;
            scene.modify(obj, cAttr);
        }
        oldAttr["_$hash"] = newAttr["_$hash"];
    } else if (newAttr !== oldAttr) {
        old[key] = newAttr;
        scene.modify(obj, cAttr);
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



// ==========================================

const initStats = ()=>{
    THREEStats  = new Stats();
    document.body.appendChild(THREEStats.dom);

    requestAnimationFrame(
        function loop(){
            THREEStats.update();
            requestAnimationFrame(loop)
        }
    );
}

let rootWidth, rootHeight, displayWidth =0, displayHeight =0, rootScale, wscale, hscale, rootX, rootY, scaleW, scaleH;
let FLAG_ROTATION: boolean;
wscale  = 1;
hscale  = 1;

/**
 * @description 负责监控页面大小变化，约束根元素在标准比例附近变化
 * @example
 */
const browserAdaptive = () => {
	var href = window.location.href;
	if (href.indexOf("index.html") >= 0) {//index
        let _CANVAS = renderer.getCanvas();
        if (!_CANVAS)
            return;
            
        FLAG_ROTATION = false;

        let clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
        let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        // let ae = document.activeElement as HTMLElement;
        // //表示因为是输入，手机上弹出输入面板后的页面变小
        // if ((ae.tagName === "INPUT" || ae.tagName === "TEXTAREA") && oldHeight > clientHeight) {
        // 	let rect = ae.getBoundingClientRect();
        // 	if (rect.bottom > clientHeight) {
        // 		rootY -= (rect.bottom - clientHeight) / rootScale;// ?TODO 好像不应该/rootScale
        // 		paintCmd3(root.style, "top", rootY + "px");
        // 		oldHeight = clientHeight;
        // 	}
        // 	return;
        // }
        // if (cfg.full) {
        // 	rootWidth = clientWidth;
        // 	rootHeight = clientHeight;
        // 	return paintCmd3(root.style, "cssText", "position:absolute;overflow:hidden;width:100%;height:100%;");
        // }
        
        // oldHeight   = clientHeight;
        rootWidth   = SceneCfg.WIDTH;
        rootHeight  = SceneCfg.HEIGHT;

        
        if (clientHeight > clientWidth) {
            FLAG_ROTATION = true;
            let temp = clientHeight;
            clientHeight = clientWidth;
            clientWidth = temp;
        }


        if ( clientWidth / clientHeight !== 960/540  ){

            scaleW = clientWidth / SceneCfg.WIDTH;
            scaleH = clientHeight / SceneCfg.HEIGHT;

            if ( scaleH > scaleW ){
                scaleH = (540/960 * clientWidth / SceneCfg.HEIGHT );
            }else{
                scaleW = (960/540 * clientHeight / SceneCfg.WIDTH ) ;
                scaleH = clientHeight / SceneCfg.HEIGHT;
            }

        }else{
            scaleW = clientWidth / SceneCfg.WIDTH;
            scaleH = clientHeight / SceneCfg.HEIGHT;
        }


        // let tempWidth: number, tempHeight: number;
        
        // tempWidth   = clientWidth / scaleW;
        // tempHeight  = ( clientWidth / SceneCfg.WIDTH * SceneCfg.HEIGHT );

        // rootWidth   = tempWidth;
        // rootHeight  = tempHeight;

        // scaleW      = clientWidth / rootWidth;
        // scaleH      = clientHeight / rootHeight ;


        // if (scaleW >= scaleH) {
        //     let diff = scaleW/scaleH - 1;
            
        //     diff = diff > wscale? wscale : diff;
            
        //     rootWidth *= (1+diff);
        //     // 宽度比例变动大于高度比例变动
        //     /* if (scaleW > scaleH * (1 + cfg.wscale)) {
        //         // 大于规定的比例
        //         rootWidth = rootWidth * (1 + cfg.wscale) | 0;
        //     } else {
        //         rootWidth = (clientWidth / scaleH) | 0;
        //     } */
        //     // rootScale = scaleW = scaleH;
            
        //     // 宽度比例变动
        //     if (scaleW > scaleH * (1 + wscale)) {
        //         // 大于规定的比例
        //         rootWidth = rootWidth * (1 + wscale) | 0;
        //     } else {
        //         rootWidth = (clientWidth / scaleH) | 0;
        //     }
        //     rootScale = scaleW = scaleH;
        // } else {
        //     /* if (scaleH > scaleW * (1 + cfg.hscale)) {
        //         rootHeight = rootHeight * (1 + cfg.hscale) | 0;
        //     } else {
        //         rootHeight = (clientHeight / scaleW) | 0;
        //     } */
        //     // let diff = scaleH/scaleW - 1;
        //     // diff = diff>cfg.hscale?cfg.hscale:diff;
        //     // rootHeight *= (1+ diff);
        //     // rootScale = scaleH = scaleW;
            
        //     // 高度比例变动
        //     if (scaleH > scaleW * (1 + hscale)) {
        //         rootHeight = rootHeight * (1 + hscale) | 0;
        //     } else {
        //         rootHeight = (clientHeight / scaleW) | 0;
        //     }
        //     rootScale = scaleH = scaleW;
        // }
        
        if (FLAG_ROTATION) {
            rootX = (clientHeight - rootWidth) / 2
            rootY = (clientWidth - rootHeight) / 2
            
            _CANVAS.setAttribute ("style", "position: absolute;overflow: hidden;left: " + rootX + "px;top: " + rootY + "px;width:" + rootWidth + "px;height: " + rootHeight + "px;" +
                "-webkit-transform:scale(" + scaleH + "," + scaleW + ") rotate(90deg);-moz-transform:scale(" + scaleH + "," + scaleW + ") rotate(90deg);-ms-transform:scale(" + scaleH + "," + scaleW + ") rotate(90deg);transform:scale(" + scaleH + "," + scaleW + ") rotate(90.0001deg);");
        } else {
            rootX = (clientWidth - rootWidth) / 2;
            rootY = (clientHeight - rootHeight) / 2;
            _CANVAS.setAttribute ("style", "position: absolute;overflow: hidden;left: " + rootX + "px;top: " + rootY + "px;width:" + rootWidth + "px;height: " + rootHeight + "px;" +
                "-webkit-transform:scale(" + scaleW + "," + scaleH + ");-moz-transform:scale(" + scaleW + "," + scaleH + ");-ms-transform:scale(" + scaleW + "," + scaleH + ");transform:scale(" + scaleW + "," + scaleH + ");");
        }

        // callResizeListener();

        // SceneCfg.initCurrWidth( clientWidth );
        // SceneCfg.initCurrHeight( clientHeight );
        displayWidth    = rootWidth * scaleW;
        displayHeight   = rootHeight * scaleH;
    } else {//mgr
        return () => {
        }
    }
}
export const getRootScale = ()=>{
    return [scaleW, scaleH];
}
export const getRootRotate = ()=>{
    return FLAG_ROTATION;
}
export const getDisplayDiff = ()=>{

    let clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

    if ( FLAG_ROTATION === false ){
        return [ (clientWidth - displayWidth)/2,  (clientHeight - displayHeight)/2  ];
    }else{
        return [ (clientHeight - displayWidth)/2,  (clientWidth - displayHeight)/2  ];
    }
}

window.onresize = browserAdaptive;


export const initScene = ()=>{
    // let canvas ;
    mgr.createScene({}, "Main", undefined, SceneCfg.WIDTH, SceneCfg.HEIGHT, {});
    
    _canvas = mgr.getCanvas();
    document.body.appendChild(_canvas);
}
