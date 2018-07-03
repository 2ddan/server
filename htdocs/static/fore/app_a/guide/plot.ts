/*
 * 剧情对话
 * plot cfg => {
 * 	"time_travel":[
 * 		{side:"left",head:"playerhead700012",name:"江芷薇",chat:"我自用手中之剑争一番天命。"},
 * 		{},
 * 		...
 * 	]
 * }
 */
// ============================== 导入
//pi
import { Widget } from "pi/widget/widget";
import { createHandlerList } from "pi/util/event";
import { open, destory  } from "pi/ui/root";

// ======================================= 导出
/**
 * @description 导出的监听器列表
 * @example
 */
export const listenerList = createHandlerList();
/**
 * @description 导出widget
 */
export class Plot extends Widget {
	/**
	 * @description 点击进入下一步剧情
	 */
	go_next(){
		go_next();
	}
}
//快进或继续，按钮触发
export const go_next = function(arr?){
	if(timer)clearInterval(timer);
	//剧情结束
	if(text_over()){
		listenerList({ type: "plotEnd", state: plotArr.state });
		console.log(plotArr.list);
		clear();
		return false;
	}
	return true;
};

export const initCfg = (_cfg) => {
	plotCfg = _cfg;
};

/**
 * @description 进入剧情引导
 * @param state{string} 剧情类型名字
 * 		  cur{number} 剧情播放进度，list偏移量，默认0
 */
export const start = function (state,cur?) {
	if(!plotCfg)return;
	initPlot(state,plotCfg[state],cur);
	plotWidget = open(plotWidgetName,plotArr);
	listenerList({ type: "plotStart", state: plotArr.state});
	go_next();
};
/**
 * @description 设置
 * @param name{string} 组件名字
 */
export const setPlotWidgetName = (name: string) => {
	plotWidgetName = name;
};

// ============================== 本地
/**
 * @description 剧情配置
 */
let plotCfg;
/**
 * @description 当前剧情数据
 */
let plotArr = {
		state : "", //本段剧情key
		list : [], //本段剧情列表,cur及之前的剧情对话都新增了first_text字段，用于记录播放的对话进度
		cur : -1 //剧情进度,list偏移量
	};
/**
 * @description 当前对话
 */
let	cur = null;
/**
 * @description 文字输出定时器
 */
let timer = null;
/**
 * @description 引导强制组件的名称
 */
let plotWidgetName = "";
/**
 * @description 剧情组件
 */
let plotWidget: Widget = null;

// 闭合标签
let voidElements = {br:1,hr:1,img:1,input:1,link:1,meta:1,area:1,base:1,col:1,command:1,embed:1,keygen:1,param:1,source:1,track:1,wbr:1};

/**
 * @description 初始化数据
 * @return 
 */
let initPlot = (type,list,cur?) => {
	plotArr.state = type;
	// plotArr.list = lang.clone(list);
	plotArr.cur = cur || 0;
};
/**
 * @description 重置数据
 * @return 
 */
let clear = () => {
	initPlot("",[],-1);
	if(plotWidget){
		destory(plotWidget);
		plotWidget = null;
	}
};
/**
 * @description 获得下一段文字
 */
let getNext = function(i, str) {
	let s, r, n = 0, REG = /<\/?([\w]*)[^>]*>/g;
	if(str.charCodeAt(i) !== 60) {
		return i + 1;
	}
	s = str.substring(i);
	r = REG.exec(s);
	while (r) {
		if(r[0].charCodeAt(1) === 47) {
			n--;
		} else if(r[0].charCodeAt(r[0].length - 2) !== 47 && !voidElements[r[1].toLowerCase()]) {
			n++;
		}
		if(n <= 0) break;
		r = REG.exec(s);
	}
	return r ? i + REG.lastIndex : str.length;
};
/**
 * @description 打印文字
 */
let type_text  = function(data){
	let len, i = 0;
	let str = data.chat || " ";
	len = str.length;
	let next = function() {
		i = getNext(i, str);
		if(i >= len) {
			text_over();
		}else{
			data.first_text = str.substr(0, i);
			plotWidget.setProps(plotArr);
			plotWidget.paint();
		}
	};
	// timer = lang.setInterval(next, data.speed || 30, len+1);
};
/**
 * @description 文字打印结束
 */
let text_over = ():any => {
	let _cur = plotArr.list[plotArr.cur];
	if(!_cur){
		return true;
	}
	// else if(_cur.first_text === undefined){
	// 	return type_text(_cur);
	// }
	_cur.first_text = _cur.chat?_cur.chat:'';
	
	plotWidget.setProps(plotArr);
	plotWidget.paint();
	// if(timer)lang.clearInterval(timer);
	// 延迟15秒，如果用户没有操作，则自动跳到下一步
	// timer = lang.setInterval(function(){
	// 	go_next();
	// }, 15000, 1);
	plotArr.cur ++;
};

// =========================== 立即执行