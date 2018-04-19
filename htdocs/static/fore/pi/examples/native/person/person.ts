

import { ParamType, NativeObject, NativeListener, registerSign } from "../../../browser/native"

export class Person extends NativeObject {
	private name: string;

	/**
	 * 
	 * @param param {
	 *     date: number,
	 *     cardID: "abcdef",
	 *     success: () => {}
	 *     fail: () => {}
	 * }
	 */
	getName(param: any) {

		let func = param.success;

		param.success = (name) => {
			this.name = name;
			func && func(name);
		}

		this.call("getName", param);
	}
}


registerSign(Person, {
	"getName": [
		{
			name: "date",
			type: ParamType.Number
		},
		{
			name: "cardID",
			type: ParamType.String
		}]
});

