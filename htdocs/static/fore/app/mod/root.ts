/**
 * @object
 * @namespace
 * @description 游戏根组件管理
 */
// ============================== 导入
import { getGlobal } from "pi/widget/frame_mgr";
import { set as task } from 'pi/util/task_mgr';
import { Callback, toString } from "pi/util/util";
import { listenerList, open as pi_open, remove , pop, popNew, create, destory, show,forbidEvent } from "pi/ui/root";
import { lookup, Widget } from "pi/widget/widget";
import { paintCmd3} from "pi/widget/painter";
//mod
import { globalSend } from "app/mod/pi";
// ============================== 本地


let main: any = {},
	group: any = {},
	history = {
		"cover":[]
	};
//显示隐藏cover层组件
const showCover = (arr: Array<JSON>,show:boolean) => {
	if(arr.length === 0)return;
	let last:any = arr[arr.length-1];
	paintCmd3(last.widget.tree.link.style, "visibility", show ? "visible" : "hidden");
};

const deal = {
	//打开组件
	"add": (msg) => {
		//history.push(msg);
		if (group[msg.group.name] >= 0) {
			group[msg.group.name] += 1;
		} else group[msg.group.name] = 1;
		//if (group[msg.group.name] === 1) {
			globalSend("widgetOpen", msg.group.name);
		//}
		// if (msg.group.name === "cover") {
		// 	showCover(history.cover, false);
		// 	history.cover.push(msg);
		// }
	},
	//关闭组件
	"remove": (msg) => {
		if(openList[msg.widget.name] !== undefined)openList[msg.widget.name] -= 1;
		group[msg.group.name] -= 1;
		if (msg.group.name === "secondary" && group.secondary === 0) {
			globalSend("widgetOpen", "main");
			return;
		}
		if(msg.group.name === "cover"){
			history.cover.pop();
			showCover(history.cover,true);
		}
	},
	//主界面窗体处理
	"main": (msg) => {
		if (msg.type == "add") {
			main[msg.widget.name] = msg.widget;
		} else if (msg.type == "remove") {
			delete main[msg.widget.name];
		}
	}
};
/**
 * @description 将2-3个close关联起来，1个界面被关闭时，关闭另外2个界面，一般要求界面1先打开
 * c2为主窗体，必须在最后关闭，否则会影响窗体关闭事件抛出，造成程序执行意外，如：主窗体关闭事件（先）与子组件关闭事件（后）的先后顺序
 * @example
 */
const linkClose = (close1, close2, close3?): void => {
	let c1 = close1.callback;
	let c2 = close2.callback;
	let c3 = close3?close3.callback : null;
	close1.callback = (w: Widget) => {
		c3 && c3(close3.widget);
		c1(w);
		c2(close2.widget);
	}
	close2.callback = (w: Widget) => {
		c3 && c3(close3.widget);
		c1(close1.widget);
		c2(w);
	}
	c3 && (close3.callback = (w: Widget) => {
		c3(w);
		c1(close1.widget);
		c2(close2.widget);
	});
}
/**
 * @description 用任务队列的方式弹出界面2，并与界面1关联起来，如果界面1已经关闭，则自动销毁界面2
 * @example
 */
const popLink = (close1, name: string,cover: string, props?: any, ok?: Callback, cancel?: Callback, process?: Callback, back?: Callback | "cancel" | "force" | "next"): void => {
	getGlobal().setAfter(() => {
		task(() => {
			if (!close1.widget.parentNode)
				return;
			let close2 = popNew(name,props, ok || function(){}, cancel || function(){}, process, back);
			let close3;
			if(cover)close3 = popNew(cover,props, ok || function(){}, cancel || function(){}, process, back);
			linkClose(close1, close2, close3);
		}, undefined, 1000, 1);
	});
}
const _open = (w:Widget,props?, ok?, cancel?, process?, back?) => {
	let c1,
		c2,
		n1,
		n2;
	if(!w.config||!w.config.value.relation){
		c1 = popNew(w.name,props, ok || function(){}, cancel || function(){}, process, back);
		let f = c1.callback;
		c1.callback = (w) => {
			f(w);
		}
		return;
	}
	n1 = w.config.value.relation;
	if(Array.isArray(n1)){
		n2 = n1[1];
		n1 = n1[0];
	}
	c2 = popNew(n1,props, ok, cancel, process, back);
	popLink(c2,w.name,n2,props, ok || function(){}, cancel || function(){}, process, back);
	//c1 = popNew(name);
	//linkClose(c1,c2);
	
};
// ============================== 导出
/**
 * @description 关闭所有非主界面窗体
 */
export const closeAll = () => {
	for (var i in history) {
		remove(history[i].widget);
	}
};
/**
 * @description 显示隐藏主界面窗体
 * @param show{boolean} 显示隐藏
 */
export const showMain = (isshow: boolean) => {
	show("main",isshow);
};
/**
 * 获取打开窗体数据
 */
export const getRootWidget = function (name) {
	switch (name) {
		case "history":
			return history;
		case "group":
			return group;
		case "main":
			return main;
	}
};
//存储所有打开的界面，一旦界面
let openList:any = {};

/**
 * @description 打开根组件,关联背景组件
 * @param name{string} 主打开组件
 * 		  relation{string} 关联组件
 *		  back 为返回按钮的处理，Callback表示处理函数-必须调用w.cancel方法， cancel表示调用cancel函数，force表示强制不返回，next表示调用cancel函数继续调用返回，默认处理为cancel
 * @example
 */
export const open = (name:string,props?, ok?, cancel?, process?, back?) => {
	if(openList[name]){
		console.warn(`"${name}" widget has opened!!`);
		return;
	}
	let w = lookup(name);
	//addFreeBack(w.config.group,1);
	// setTimeout(() => {
		//forbidEvent(0);
		_open(w,props, ok, cancel, process, back);
	// },16);
	openList[name] = 1;
	//forbidEvent(100000);
};
/**
 * @description 直接打开组件，无延迟
 */
export const piOpen = (name,props?) => {
	pi_open(name,props);
}
/**
 * @description 关闭组件
 */
export const piClose = (w) => {
	destory(w);
}

/**
 * @description 关闭open打开的组件
 * @param w{Widget} 主打开组件
 * @example
 */
export const close = (w) => {
	w.ok?w.ok():(w.cancel && w.cancel());
	if(openList[w.name])delete openList[w.name];
};
// =================================== 立即执行
//注册root监听事件
(<any>listenerList).add((msg) => {
	if (!msg || !msg.group) return;
	if (msg.group.name === "main") {
		//console.log(msg.widget.name,msg);
		deal.main(msg);
		return;
	} else if (msg.group.name === "secondary" || msg.group.name === "cover") {
		deal[msg.type] && deal[msg.type](msg);
	}
});
