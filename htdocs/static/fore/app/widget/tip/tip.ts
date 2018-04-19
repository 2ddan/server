/*
 * 提示按钮组件
 * 监听数据库提示数据变化，更新当前打开的提示组件，是否显示提示UI（如:红点）
 * 组件的更新通过监听setProps来完成
 * @example <app-bag-btn-tips>{"tips_key":["a_b_c","d_e_f"]}</app-bag-btn-tips>
 */

// ============================== 导入
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Json } from 'pi/lang/type';
import { listen, get } from "app/mod/db";
import { Common } from "app/mod/common";

// ============================== 本地
/**
 * @description Widget自增ID,用于区分创建的Widget
 */
let maxID = 1;
/**
 * @description 提示数据列表
 * 默认所有提示都不显示，值为false
 * 该列表存放所有为true的提示,为false则删除，并逐层向上更新
 * "a_b_e"
 * @example "tips":{
 *       "hero":{
 *           "equip":{
 *               "e1":true || {}
 *           }
 *       }
 *   }
 */
let tipsTable : any = {};
/**
 * @description 打开组件列表
 * Widget对应的key是组件的唯一id
 * Widget删除时通过id来更新列表
 * ["a_b","c_d"]
 * @example {
    "tips":{
        "hero":{
            "equip":{
                "1":{
                    "w":{"1":Widget}
                },
                "2":{
                    "w":{"2":Widget}
                },
                "3":{
                    "w":{"3":Widget}
                },
                "w":{"4":Widget}
            },
            "w":{"5":Widget}
        },
        "w":{"6":Widget}
    }
}
 */
let widgetTable : any = {};
/**
 * @description 解析当前提示监听的路径，更新提示数据列表
 */
const updataTipsTable = (path: string,_d):void => {
    let _p = path.split(/\.|_/),
        //向下查找该路径下的tips原值节点，直到取得最终值
        tr = tipsTable,
        //向下查找该路径下的widget节点
        wr = widgetTable,
        ws = [];
    
    if(!_d && delJsonNode(tipsTable,_p,0)){
        tipsTable = {};
    }
    for(var i=0,len = _p.length;i<len;i++){
        //添加提示
        if(_d){
            //叶子节点直接赋值，否则不存在则创建 {}
            tr = tr[_p[i]] = tr[_p[i]] || ((i==len-1)?_d:{});
        }
        //寻找该数据链上所有打开的widget
        wr = wr?wr[_p[i]]:wr;
        if(!wr)continue;
        //if(wr.w)ws = ws.concat(wr.w);
        //更新widget
        if(wr.w)for(let k in wr.w){
            paintW(wr.w[k],tipsTable);
        }
    }
}
/**
 * @description 沿树叶子向根删除空节点
 * @param node{Json} 需要删除的树
 *        keys{array} 从根到叶子的节点key组成的数组
 *        i{number} 当前第几个节点
 */
const delJsonNode = (node, keys, i) => {
    let key = keys[i];
    let n = node[key];
    if(!n)
        return true;
    if(i<keys.length-1){
        let b = delJsonNode(n, keys,i+1);
        if(!b)
            return false;
    }else{
        delete node[key];
        return true;
    }
    if(Common.checkJsonIsEmpty(node[key])){
        delete node[key];
        return true;
    }
    return false;
};
/**
 * @description 根据路径删除该组件的引用
 */
const delWidget = (keys,id,widgetTable) => {
    for(var i=0,len = keys.length;i<len;i++){
        let kl = ("tips."+keys[i]).split(/\.|_/),
            wr = widgetTable;
        for(let j in kl){
            wr = wr[kl[j]];
            if(!wr)break;
        }
        if(wr){
            delete wr.w[id];
        }
    }
};
/**
 * @description 以"a_b_c_d"的数据链从上往下获取json对象中的数据
 * @param key{string} "a_b_c_d",
 *        _json{Json} {"a":{"b":{"c":{"d":1}}}}
 */
let getVal = (key,_json) => {
    let result = _json;
    key = key.split(/\.|_/);
    for(let m in key){
        result = result[key[m]];
        if(!result)break;
    }
    return result;
};
/**
 * @description 判断当前依赖的提示是否为真
 * @param keys {array} ["a_b_c_d","e_f_g_h"],
 *        tips {Json} 提示数据
 */
let isTip = (keys,tips) => {
    for(let j=0,lt = keys.length;j<lt;j++){
        if(getVal("tips."+keys[j],tips))return true;
    }
    return false;
};
/**
 * @description 根据提示数据刷新需要更新的组件
 */
let paintW = (widget,tips) => {
    let props = widget.getProps(),
        keys = props.tips_key,
        _istip = isTip(keys,tips);
    if(!props.tip || !props.tip != !_istip){
        props.tip = _istip;
        widget.setState(props);
        widget.paint(false);
    }
};
/**
 * @description 检查是否显示
 */
let updataWidgetTree = (props,w,widgetTable,tipsTable) => {
    let keys = props.tips_key,
        ud = false;
    for(var i=0,len = keys.length;i<len;i++){
        let kl = ("tips."+keys[i]).split(/\.|_/),
            wr = widgetTable,
            tr = tipsTable;
        for(let j in kl){
            wr = wr[kl[j]] = wr[kl[j]] || {};
            wr.w = wr.w || {};
            tr = tr?tr[kl[j]] : tr;
        }
        wr.w[w.id] = w;
        if(!ud && tr)ud = tr;
    }  
    return ud;
};
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Tips extends Widget {
	// 必须要赋初值，不然new出来的实例里面是没有这些属性的
	id: number = maxID++; // 唯一ID
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		if(this.props && JSON.stringify(this.props.tips_key) != JSON.stringify(props.tips_key)){
            delWidget(this.props.tips_key,this.id,widgetTable);
        }
        let ud = updataWidgetTree(props,this,widgetTable,tipsTable);
        if(ud)props.tip = ud;
        this.props = props;
	}
    /**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
	destroy(): boolean {
		if (!super.destroy())
			return;
        let keys = this.props.tips_key;
        delWidget(keys,this.id,widgetTable);
	}
}
/**
 * @description 判断当前是否需要提示
 * @param keys {string} "a_b_c_d"
 * @return {boolean}
 * @example
 */
export const checkTips = (key:string) : boolean => {
    if(getVal("tips."+key,tipsTable))return true;
    return false;
};
/**
 * @description 获取提示节点
 * @param keys {string} "a_b_c_d"
 * @return {any} 
 * @example
 */
export const getTips = (key:string) : boolean => {
    return getVal("tips."+key,tipsTable);
};
/**
 * @description 更新提示
 * @param keys {string} "a_b_c_d"
 *        d {any} 0 || {} 提示数据
 * @return {boolean}
 * @example
 */
export const updateTips = (key:string,d) : void => {
    updataTipsTable("tips."+key,d);
};
export const getTable = () => {
    return [tipsTable,widgetTable];

};
// ============================== 立即执行
