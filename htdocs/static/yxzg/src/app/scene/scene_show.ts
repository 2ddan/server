/**
 * @description 高层与底层的中间层
 */

//===========================导入
import { getGlobal, create, setInterval } from "pi/widget/frame_mgr";
import { clear } from "../../pi/util/task_mgr";

// ============================== 导出
/**
 * @description 设置战斗事件监听
 */
export const setShowListener = ( key: string, handler: Function ): void => {
	let tempArr: Array<Function>;

	tempArr		= sceneShow.get( key );

	if ( tempArr === undefined ){
		tempArr	= [];
		sceneShow.set( key, tempArr);
	}

	if ( tempArr.indexOf( handler ) < 0 ){
		tempArr.push( handler );
	}
}

/**
 * @description 添加事件
 */
export const addEvents = (e) => {
	events.push(e);
}
/**
 * @description 设置等待状态
 */
export const setWait = (b: boolean) => {
	wait = b;
}

//============================本地
/**
 * @description 事件等待推送状态,否则下帧直接推送
 */
let wait = false;
/**
 * @description 事件等待列表
 */
const events = [];
/**
 * @description 帧管理定时器
 */
let frame_ref = null;
/**
 * @description 帧管理
 */
const frame = () => {
	if(frame_ref){
		clearTimeout(frame_ref);
		frame_ref = null;
		callShowListener();
	}
	frame_ref = setTimeout(() => {
		frame();
	}, 50);
};
/**
 * @description 场景显示处理对象
 */
const sceneShow: Map<string, Array<Function>> = new Map;
/**
 * @description 分发战斗事件
 */
// export const getShowListener = (key: string): Function => {
// 
// }
const callShowListener = ()=>{
	if(events.length == 0 || wait){
		return;
	}
	wait = true;
	let arg = events.shift(),
		key = arg.type,
		tempArr: Array<Function>, 
		func: Function;

	tempArr		= sceneShow.get( key );

	if ( tempArr !== undefined ){
		tempArr.forEach( func => {
			func && func( arg );
		} )
	}
}

// =============================== 立即执行
// frame.setInterval(50);
// frame.setPermanent(callShowListener);
// setInterval(frame);
frame();