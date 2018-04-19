
import { NativeObject, registerSign } from "./native"

export class GetDeviceID extends NativeObject {

	/**
	 * 
	 * @param param {
	 *     success: (idStr) => {}
	 *     fail: () => {}
	 * }
	 */
	static getDeviceID(param: any) {
		NativeObject.callStatic(GetDeviceID, "getDeviceID", param);
	}
}


registerSign(GetDeviceID, {
	"getDeviceID": [],
});