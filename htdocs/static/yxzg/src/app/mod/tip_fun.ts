import * as db from "./db";
import { set as task } from "pi/util/task_mgr";

let tipCfg = [],
    //定义运算函数
    arithmetic = {
        ">": function (a, b) {
            return (a > b);
        },
        ">=": function (a, b) {
            return (a >= b);
        },
        "<": function (a, b) {
            return (a < b);
        },
        "<=": function (a, b) {
            return (a <= b);
        },
        "==": function (a, b) {
            return (a == b);
        },
        "!=": function (a, b) {
            return (a != b);
        },
        "in": function (a, b) {
            return (b.indexOf(a) >= 0);
        },
        "out": function (a, b) {
            return (b.indexOf(a) < 0);
        },
        "inside": function (a, b) {
            return (a > b[0] && a < b[1]);
        },
        "outside": function (a, b) {
            return (a < b[0] || a > b[1]);
        }
    },
    //匹配函数
    //@param arg 函数索引
    //@return 函数 || 运算函数 ||  空函数function(){return false;}
    mathFunc = function (arg) {
        if (db.checkTypeof(arg,"Function")) return arg;
        if (arithmetic[arg]) return arithmetic[arg];
        else return function () { return false };
    },
    //解析参数
    //@param arg {dkey:"player.level" (前台数据路径)} || function || string || inter
    //@return db(前台数据库数据) || 原样返回
    mathArg = function (arg) {
        let result;
        if (db.checkTypeof(arg,"Object") && arg.dkey) {
            return db.get(arg.dkey);
        }
        else if (db.checkTypeof(arg,"Function")) return arg();
        else return arg;
    },
    applyFunc = new Function();

export class TipFun {
    static getDbJsonValue = mathArg;
    //@param arr 第一维或关系: [
    //		[第二维与关系
    //			["bagCanWear", {dkey:"hero.equip.0"}, 0],
    //			[">=", {dkey:"player.level"}, "hero.equip.0.level"],...
    //		],
    //		[[],....]求交集
    //	]
    //@return boolean
    static checkCond(arr) {
        let perAnd = function (_pa) {
            let checkFun = function (_item) {
                let _fun = mathFunc(_item[0]),
                    args = [];
                for (let j = 1, leng = _item.length; j < leng; j++) {
                    args.push(mathArg(_item[j]));
                }
                return _fun.apply(applyFunc, args);
            };
            for (let i = 0, len = _pa.length; i < len; i++) {
                if (!checkFun(_pa[i])) return false;
            }
            return true;
        };
        for (let n = 0, l = arr.length; n < l; n++) {
            if (perAnd(arr[n])) return true;
        }
        return false;
    };
    //更新提示组件
    static udTips(_cfg){
        let keys = _cfg.tipKey.split(","),
            r:any = TipFun.checkCond(_cfg.fun),
            old;
        if(r === undefined)return;
        for(let k in keys){
            // old = getTips(keys[k]);
            if(!!r !== !!old){
                // task(updateTips,[keys[k],r],1,0);
                // updateTips(keys[k],r);
            }
            //updateTips(r.tipKey,r);
        }
    }
    //绑定依赖监听
    static bindListen(k,_cfg) {
        db.listen(k, function (path, subpath, extra) {
            TipFun.udTips(_cfg);
            // task(TipFun.udTips,[_cfg],1,0);
        });
    };
    //初始化配置
    //生成监听事件表,并触发数据库监听
    static init(cfg) {
        let n = 0,
            length = cfg.length,
            notFirst = tipCfg.length,
            depend;
        tipCfg = tipCfg.concat(cfg);
        // if(1)return;
        for (n; n < length; n++) {
            depend = cfg[n].depend;
            for (let i = 0, len = depend.length; i < len; i++) {
                TipFun.bindListen(depend[i],cfg[n]);
            }
            //非第一次初始化配置表，则先运行一次，防止数据监听已经跑过了
            if(notFirst){
                task(TipFun.udTips,[cfg[n]],1,0);
            }
        }
    };
};