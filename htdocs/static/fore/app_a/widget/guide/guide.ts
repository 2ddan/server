/*
 * 引导剧情按钮组件
 * 监听打开点击事件，然后抛到引导剧情模块
 * {事件抛出依赖：点击、通讯}
 * @example <app-widget-btn-guide>{guide_key:"menu_hero"}</app-widget-btn-guide>
 */

// ============================== 导入
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { notify } from "pi/widget/event";
import {set as task} from 'pi/util/task_mgr';
import { Json } from 'pi/lang/type';
// ============================== 本地
let maxID = 0,
    //等待引导
    wait = null,
    //引导按钮存储表
    widgetTable = {};
/**
 * 检测按钮是否当前所关心的引导按钮
 */
const checkBtn = (w) => {
    let node = w.tree.link,
        r = node?node.getBoundingClientRect() : {};
    if(!r)return false;
    if(r.width && r.height){
        return node;
    }
}
/**
 * 检查按钮名下所有组件
 */
const checkName = (key)=>{
    let ws = widgetTable[key];
    if(ws){
        for(let k in ws){
            let node = checkBtn(ws[k]);
            if(node)return node;
        }
    }
};
// ============================== 导出
/**
 * 导出外部可修改数据
 */
export let outFixed = {
    /**
     * @description 设置点击监听
     * @param key {string} 当前组件配置的guide_key
     */
    listener : (key:string) =>{
        console.log(key,"============================================");
    },
    /**
     * @description 是否接收点击事件
     */
    dealEvent : false
};

/**
 * @description 导出组件Widget类
 * @example
 */
export class Guide extends Widget {
	// 必须要赋初值，不然new出来的实例里面是没有这些属性的
	id: number = maxID++; // 唯一ID
    tap = (guide_key) => {
        if(!outFixed.dealEvent)return;
        task(notify, [this.parentNode, "ev-btn", this.props.e||{}], 90000, 1);
        outFixed.listener(guide_key);
    }
    //手动抛出on-up事件
    up = ()=>{
        task(notify, [this.parentNode, "ev-up", this.props.e||{}], 90000, 1);
    }
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		let add = () => {
            let guide_key = props.guide;
            if(!widgetTable[guide_key]){
                widgetTable[guide_key] = {};
            }
            widgetTable[guide_key][this.id] = this;
        }
        if(!this.props){
            add();
        }else if(this.props.guide != props.guide){
            delete widgetTable[this.props.guide][this.id];
            add();
        }
        this.props = props;
	}
    /**
	 * @description 添加到dom树后调用，在渲染循环内调用
	 * @example
	 */
	attach(): void {
		let node;
		if (wait && this.props.guide === wait.key){
            node = checkBtn(this);
            if(node){
                wait.callback(node);
            };
            wait = null;
        }
	}
    /**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
	destroy(): boolean {
		//if (!super.destroy())
			//return;
        return delete widgetTable[this.props.guide][this.id];
	}
}
/**
 * @description 获取接下来要关心的引导按钮
 * @param key {string} 当前组件配置的guide_key
 *        callback {function} 回传dom节点
 */
export const getGuideButn = (key:string,callback) => {
    let r;
    //检查按钮是否已经存在
    r = checkName(key);
    if(r){
        return callback(r);
    }
    //存储等待
    wait = {
        key : key,
        callback : callback
    };
};

// ============================== 立即执行
