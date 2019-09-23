import * as Hash from '../../pi/util/hash';
import { ResTab } from '../../pi/util/res_mgr';
import { commonjs, butil } from '../../pi/lang/mod';

/**
 * 场景工具类
 */
export class SceneUtils {
    /**
     * @constant 模型的json模板
     */
    private static templateMap = new Map<string, any>();
    /**
     * 模型的rtpl模板
     */
    private static rtplMap = new Map<string, any>();
    /**
     * 模型的配置文件
     */
    private static _cfg = {};

    /**
     * 限制范围
     * @param num 数字
     * @param min 最小值
     * @param max 最大值
     */
    static limitNumInRange = (num: number, min: number, max: number): number => {
        if (num < min) num = min;
        if (num > max) num = max;
        return num;
    }

    /**
     * 补全模型json
     * @param it
     * @param node 混合好的json(美术json + 程序数据)
     */
    static complied = (it: any, node: any) => {
        const data = {
            "name" : it.names[0],
            "type" : "node",
            "transform" : {
                "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [0,0,0],
                "scale"    : it.is2D && it.scale ? [it.scale[0], it.scale[1], it.scale[2]] : [1,1,1],
                "rotate"   : [0,0,0]
            },
            "children": [
                node
            ]
        };
        
        // 用2D相机看
        if (it.is2D) {
            data['attachment'] = '2D';
        }

        return data;
    };

    /**
     * 添加hash
     */
    static addHash = (obj: any, bool: false) => {
        let parentHash = 0,
            childHash = 0,
            keyHash = 0,
            valueHash = 0;

        if (obj["_$hash"] && bool) return obj["_$hash"];

        for (let k in obj) {
            let v = obj[k];

            keyHash = Hash.iterHashCode(k, 0, Hash.charHash);

            if ('object' === typeof v) {
                if (v === null)
                    continue;
                else {
                    v["_$hash"] = valueHash = SceneUtils.addHash(v, bool);
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
    };

    /**
     * 合并节点
     */
    static mergeNode = (scene: any, newObj: any, oldObj: any, resTab: ResTab, name: string) => {
        if (newObj["_$hash"] === oldObj["_$hash"]) return;

        for (let k in newObj) {
            SceneUtils.mergeProperty(scene, oldObj, newObj[k], oldObj, k, resTab, [], name);

            oldObj["_$hash"] = newObj["_$hash"];
        }
    };

    /**
     * 合并属性
     */
    static mergeProperty = (scene: any, obj: any, newAttr: any, old: any, key:any, resTab: ResTab, attr: any[], name: string) => {
        let i: number;
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
    
        if (key === "_$hash" || key === "_show") return;

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
                        SceneUtils.mergeNode(scene, v, oldv, resTab, name);
                    }
                }
            }
            else if (newAttr["_$hash"] === oldAttr["_$hash"]) {
                return;
            }
            else if (oldAttr) {
                if (endAttr[key] === true) {
                    old[key] = newAttr;
                    scene.modify(obj, cAttr);
                    return;
                }
    
                for (var k in newAttr) {
                    SceneUtils.mergeProperty(scene, obj, newAttr[k], oldAttr, k, resTab, cAttr, name);
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
    };

    /**
     * 解析RPTL
     */
    static parseRtpl = (data: any) => {
        let parse = (fn: any, dt: any) => {
            let tplfun = SceneUtils.getTemplateFunction("rtpl", fn);
            return tplfun(null, dt);
        }

        let parseChild = (obj: any) => {
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
    };

    /**
     * 设置美术导出配置
     */
    static setArtCfg = (filesMap: any) => {
        const parseFile = (filename: string) => {
            //todo..
            filename = filename.split(".")[0];
            let name = filename.split("/");
    
            return { module: filename, name: name[name.length - 1] };
        };
        
        let _k;
        for (let k in filesMap) {
            if (k.startsWith("app/scene/")) {
                let type = butil.fileSuffix(k);
                if (type === "json" && k.startsWith("app/scene/template/")) {
                    _k = k.replace(".json", "");
                    if (SceneUtils.templateMap.get(_k) === undefined) {
                        SceneUtils.templateMap.set(_k, 0);
                        SceneUtils.releaseDefine(filesMap[k]);
                    }
                }
                if (type === "rtpl") {
                    _k = k;
                    if (!_k.startsWith("app/scene/rtpl/")) {
                        _k = _k.substring(_k.lastIndexOf("/") + 1);
                    }
                    _k = _k.replace(".rtpl","");
                    if(SceneUtils.rtplMap.get(_k) === undefined){
                        SceneUtils.rtplMap.set(_k,0);
                        SceneUtils.releaseDefine(filesMap[k]);
                    }
                }
                if (type === "js" && k.startsWith("app/scene/cfg/")) {
                    let f = parseFile(k),
                        m = (window as any).pi_modules[f.module].exports;
                    if (m) SceneUtils._cfg[f.name] = m;
                }
            }
        }
    };

    /**
     * 获取模板方法
     */
    static getTemplateFunction = (type: string, filename: string) => {
        let fun: any, m: Map<any, any>, path: string;
        if (type === "json") {
            m = SceneUtils.templateMap;
            path = `app/scene/template/${filename}`;
        } else {
            m = SceneUtils.rtplMap;
            path = `app/scene/rtpl/${filename}`;
        }
        fun = m.get(path);
        if (fun.compile) {
            fun = fun.f;
        } else {
            fun.compile = 1;
            fun.f = fun.f(Hash.nextHash, Hash.anyHash, commonjs ? commonjs.relativeGet:null);
            fun = fun.f;
        }
    
        return fun;
    }

    /**
     * releaseDefine
     */
    private static releaseDefine = function (data/*:ArrayBuffer*/) {
        var blob = new Blob([data], { type: "text/javascript" });
        SceneUtils.loadJS({src: URL.createObjectURL(blob), revokeURL: URL.revokeObjectURL });
    };

    /**
     * 加载js
     */
    private static loadJS = (cfg: any) => {
        var head = document.head;
        var n:any = document.createElement('script');
        n.charset = 'utf8';
        n.onerror = (e) => {
            n.onload = n.onerror = undefined;
            head.removeChild(n);
            cfg.revokeURL && cfg.revokeURL(cfg.src);
        };
        n.onload = () => {
            n.onload = n.onerror = undefined;
            head.removeChild(n);
            cfg.revokeURL && cfg.revokeURL(cfg.src);
        };
        n.async = true;
        n.crossorigin = true;
        n.src = cfg.src;
        head.appendChild(n);
    };
}