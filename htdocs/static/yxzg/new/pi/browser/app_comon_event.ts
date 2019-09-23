
// ============================== 导入
import { addEventListener, removeEventListener } from './native';
// ============================== 导出

/**
 * 添加对app退回后台的监听事件
 * 
 * @param cb App退到后台处罚callback事件
 */
export const addAppBackPressed = (cb: () => void) => {
	addEventListener(EventType.App, EventName.BackPressed, cb);
}

/**
 * 移除对app退回后台的监听事件
 * 
 * @param cb App退到后台触发callback事件
 */
export const removeAppBackPressed = (cb: () => void) => {
	removeEventListener(EventType.App, EventName.BackPressed, cb);
}

/**
 * 添加对app推到前台的监听事件
 * 
 * @param cb App退到后台处罚callback事件
 */
export const addAppResumed = (cb: () => void) => {
	addEventListener(EventType.App, EventName.Resumed, cb);
}

/**
 * 移除对app推到前台的监听事件
 * 
 * @param cb App推到前台触发callback事件
 */
export const removeAppResumed = (cb: () => void) => {
	removeEventListener(EventType.App, EventName.Resumed, cb);
}

/**
 * 添加对activity退回后台的监听事件
 * 
 * @param cb App退到后台处罚callback事件
 */
export const addActivityBackPressed = (cb: () => void) => {
	addEventListener(EventType.Activity, EventName.BackPressed, cb);
}

/**
 * 移除对app退回后台的监听事件
 * 
 * @param cb App退到后台触发callback事件
 */
export const removeActivityBackPressed = (cb: () => void) => {
	removeEventListener(EventType.Activity, EventName.BackPressed, cb);
}

/**
 * 底层主动往高层通知的 App相关 的 通用事件
 */

export enum EventName {
	/**
	 * 界面退出事件
	 */
	BackPressed = "onBackPressed",

	/**
	 * 界面复现事件
	 */
	Resumed = "onResumed",
}

/**
 * 事件来源
 */
export enum EventType {
	App = "PI_App",
	Activity = "PI_Activity",
}
