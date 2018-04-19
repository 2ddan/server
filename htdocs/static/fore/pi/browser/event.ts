
/**
 * webview回调和派发
 */

/**
 * 调用底层函数
 */
export const callNative = (nativeName, funcName, ...args) => {
	let native = self[nativeName];
	if (native && native[funcName]) {
		return native[funcName](...args);
	} else {
		console.log("warning: Native " + nativeName + " isn't exist");
	}
}

/**
 * java层的回调
 * moduleName: string, 模块名
 * funcName: string, 函数名
 * jsonArray：string, 函数参数字符串
 */
window["_$handleNativeMessage"] = (moduleName, funcName, jsonArray) => {

	
	// alert("_$handleNativeMessage: " + moduleName + ", " + funcName + ", " + jsonArray);

	let params = jsonArray ? JSON.parse(jsonArray) : [];
	let module = (<any>self).pi_modules[moduleName];

	if (!module) {
		moduleName = "pi/" + moduleName;
		module = (<any>self).pi_modules[moduleName];
		if(!module) {
			console.log("warning: _$handleNativeMessage, module " + moduleName + " isn't exist!");
			return;	
		}
	}

	let func = module.exports[funcName];
	if (!func) {
		console.log("warning: _$handleNativeMessage, exports function " + funcName + " in module " + moduleName + "isn't exist!");
		return;
	}

	func.apply(undefined, params);
}