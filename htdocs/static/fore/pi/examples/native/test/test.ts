

import { addCallback, removeCallback, ParamType, NativeObject, NativeListener, registerSign } from "../../../browser/native"

export class Test extends NativeObject {

	/**
	 * 
	 * @param param {
	 *     a: number,
	 *     b: number,
	 *     c: number,
	 *     d: number,
	 *     s: string,
	 *     success: () => {}
	 *     fail: () => {}
	 * }
	 */
	testInstance(param: any) {
		this.call("testInstance", param);
	}

	/**
	 * 测试回调函数
	 */
	testCallback = (callback: Function) => {
		let id = addCallback(callback);
		this.call("testCallback", {
			cbID: id
		});
	}

	/**
	 * 
	 * @param param {
	 *     a: number,
	 *     b: number,
	 *     c: number,
	 *     d: number,
	 *     s: string,
	 *     success: () => {}
	 *     fail: () => {}
	 * }
	 */
	static testStatic(param: any) {
		NativeObject.callStatic(Test, "testStatic", param);
	}
}


registerSign(Test, {
	"testCallback": [
		{
			name: "cbID",
			type: ParamType.Number
		}
	],
	"testInstance": [
		{
			name: "a",
			type: ParamType.Number
		}, {
			name: "b",
			type: ParamType.Number
		}, {
			name: "c",
			type: ParamType.Number
		}, {
			name: "d",
			type: ParamType.Number
		}, {
			name: "s",
			type: ParamType.String
		}
	],
	"testStatic": [
		{
			name: "a",
			type: ParamType.Number
		}, {
			name: "b",
			type: ParamType.Number
		}, {
			name: "c",
			type: ParamType.Number
		}, {
			name: "d",
			type: ParamType.Number
		}, {
			name: "s",
			type: ParamType.String
		}
	],

});