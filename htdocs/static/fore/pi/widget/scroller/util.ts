/**
 * 存放了scroller的util函数
 */
// ======================================================== 导出
 /**
  * 是否具有冲量,就是手指松开之后再滑动一段
  */
export const  momentum = (current, start, time, lowerMargin, wrapperSize, options) => {
	let distance = current - start;
	let speed = Math.abs(distance) / time;

	let {deceleration, itemHeight, swipeBounceTime, bounceTime} = options;
	let duration = options.swipeTime;
	let rate = 15;

	let destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

	if (destination < lowerMargin) {
		destination = wrapperSize ? lowerMargin - (wrapperSize / rate * speed) : lowerMargin;
		duration = swipeBounceTime - bounceTime;
	} else if (destination > 0) {
		destination = wrapperSize ? wrapperSize / rate * speed : 0;
		duration = swipeBounceTime - bounceTime;
	}

	return {
		destination: Math.round(destination),
		duration
	};
};

/** 属性扩展 */
export function extend(target, source) {
	for (var key in source) {
		target[key] = source[key];
	}
};
/**
 * 感觉这个判断没啥实际意义啊
 */
export const isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));