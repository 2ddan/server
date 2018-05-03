/*
 * 管理根组件
 * 页面加载分两层：背景层，数据层；打开页面先加载背景，后再加载数据层
 * 打开该组件时可以设置多个回调函数，该函数在接收到里层组件冒上来的事件时执行
 */

// ============================== 导入
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Json } from 'pi/lang/type';
import { open, remove, closeBack } from "pi/ui/root";
import { closeAll } from "app/mod/root";
import { globalSend, Pi } from "app/mod/pi";

import { data as localDB, listen, get } from "app/mod/db";

// ============================== 导出

export class title extends Widget {
	id = wId++;
	listens = [];
	cancel_all = () => {
		closeBack();
	}
	 //获取方式
	 gotoGetWay(id) {
        globalSend("gotoGetWay",id);
    }
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		props.r = getCount(props.coin, this);
		this.props = props;
		widgets[this.id] = this;
	}
	/**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
	destroy() {
		if (!super.destroy())
			return false;
		for (let i in this.listens) {
			let l = listenkey[this.listens[i]];
			l.splice(l.indexOf(this.id), 1);
		}
		delete widgets[this.id];
		return true;
	}
	//购买银两元宝
	gotoBug = (arg) => {
		if (arg) {
			globalSend("gotoRecharge");
			return;
		}
		globalSend("gotoBuyMoney");
	}
}

// ============================== 本地
/**
 * @description 自增widget id,能够区分每个组件
 */
let wId = 0;
/**
 * @description widget list
 */
let widgets = {};
/**
 * @description 历史监听
 */
let listenkey = {};
/**
 * @description 监听闭包
 */
const listenBlock = (path) => {
	listen(path, () => {
		runUpDate(path);
	})
};
/**
 * @description 设置监听 
 */
const setListen = (path, id) => {
	if (listenkey[path]) {
		if (listenkey[path].indexOf(id) < 0) {
			listenkey[path].push(id);
		}
		return;
	}
	listenkey[path] = [id];
	listenBlock(path);
}

/**
 * @description 更新需要更新的组件
 */
const runUpDate = (path) => {
	let list = listenkey[path];
	for (let i in list) {
		widgets[list[i]].props.r = getCount(widgets[list[i]].props.coin, widgets[list[i]]);
		widgets[list[i]].paint();
	}
}
/**
 * @description 获取每个组件需要的物品或货币数量 
 */
const getCount = (coin,w) =>{
	let player = localDB.player,
	r = [];
	for(let i=0,len = coin.length;i<len;i++){
		if(player[coin[i]]>=0){
			r[i] = [coin[i],player[coin[i]]];
			w.listens.push("player."+coin[i]);
			setListen("player."+coin[i],w.id);
		}else{
			let _p = "bag*sid="+coin[i],
				prop = get(_p).pop();
			let count = (prop && prop.count) || 0;
			r[i] = [coin[i],count];
			w.listens.push(_p);
			setListen(_p,w.id);
		}
	}
	return r;
}