/**
 * 蓝牙打印机模块
 * 
 */
import { arrayBufferToBase64, base64ToArrayBuffer } from "../util/base64"
import { callNative } from "./event"

/**
 * java回调类型
 * FindAdapter:打印机寻找回调类型
 * ConnectSocket:打印机连接回调类型
 */
enum CallbackType {
	FindAdapter = 0,
	ConnectSocket = 1,
	OnResumeType = 2,
	StateReceiver = 3,
	WriteType = 4
}

/**
 * 蓝牙打印机
 */

let findCallback = undefined;
let OnResumeCallback = undefined;
let StateReceiverCallback = undefined;
let WriteCallback = undefined;

let _gID = 10;
let _isInit = false;
let _connectCBMap = {};

if (!_isInit) {
	_isInit = true;
	callNative("YNBlueTooth", "blueToothInit");
}

export class Bluetooth {

	private connectCBID: number;

	public socketID: string;
	public connectCB: any;

	constructor() {
		this.socketID = "";

		if (!_isInit) {
			_isInit = true;
			callNative("YNBlueTooth", "blueToothInit");
		}
	}

	isOpen() {
		if (!_isInit) {
			throw new Error("blueTooth.isBluetoothOn = false call: uninit");
		}
		return callNative("YNBlueTooth", "isBluetoothOn");
	}

	/**
	 * 蓝牙弹窗打开
	 */
	open() {
		callNative("YNBlueTooth", "bluetoothOpen");
	}

	/**
	 * 蓝牙跳转系统打开
	 */
	openSystem() {
		callNative("YNBlueTooth", "bluetoothOpenSystem");
	}

	/**
 	 * 蓝牙从所有已配对设备中找出打印设备，并返回设备名字的java数组
	 */
	fillAdapter(cb) {
		if (this.isOpen()) {
			findCallback = cb;
			callNative("YNBlueTooth", "blueToothFillAdapter");
		} else {
			cb(-1);
		}
	}

	/**
 	 * 蓝牙socket连接，判断传入的下标对应的名字是否正确，正确才会尝试连接
	 */
	connectSocket(code: number, name: string, address: string, cb) {
		if (this.isOpen()) {
			this.connectCBID = ++_gID;
			this.connectCB = cb;
			_connectCBMap[this.connectCBID] = this;
			callNative("YNBlueTooth", "blueToothConnectSocket", code, name, address, this.connectCBID);
		} else {
			cb(-1)
		}
	}

	/**
	* 蓝牙写flush
	*/
	flush() {

		callNative("YNBlueTooth", "blueToothFlush", this.socketID);
	}

	/**
	* 蓝牙写write
	*/
	writeString(info: string) {
		callNative("YNBlueTooth", "blueToothWriteString", info, this.socketID);
	}

	/**
	* 蓝牙写byte数组
	*/
	writeBytes(bytes: Uint8Array) {
		let param = arrayBufferToBase64(bytes.buffer);
		callNative("YNBlueTooth", "blueToothWriteBytes", param, this.socketID);
	}

	/**
	 * 蓝牙打印整数
	 */
	writeInt(i: number) {
		callNative("YNBlueTooth", "blueToothWriteInt", i, this.socketID);
	}

	/**
	* 蓝牙改变字符串编码方式，默认info = "GBK"
	*/
	setEncodeChar(info: string) {
		callNative("YNBlueTooth", "setEncodeChar", info, this.socketID);
	}

	/**
	* 蓝牙socket关闭
	*/
	closeSocket() {
		callNative("YNBlueTooth", "blueToothCloseSocket", this.socketID);
		this.socketID = "";
		delete _connectCBMap[this.socketID];
	}

	/**
	* 蓝牙改变UUID,默认UUID为打印机通用uid = "00001101-0000-1000-8000-00805F9B34FB"
	*/
	setUUID(uid: string) {
		callNative("YNBlueTooth", "blueToothChangeUUID", uid);
	}

	/**
	 * getGBK
	 */
	getGbk(info: string) {
		let s = callNative("YNBlueTooth", "blueToothGetGbk", info);
		return new Uint8Array(base64ToArrayBuffer(s));
	}

	/**
	 * onResultActivity
	 */
	setResumeCallback(cb) {
		OnResumeCallback = cb;
	}

	
	/**
	 * setStateReceiverback
	 */
	setStateReceiverback(cb) {
		StateReceiverCallback = cb;
	}

	/**
	 * setWriteReceiverback
	 */
	setWriteReceiverback(cb) {
		WriteCallback = cb;
	}


}

/**
 * 蓝牙回调函数
 * code: 为0代表成功，此时msg代表识别的字符串
 * code: 其他代表失败，此时msg代表错误信息
 */
export const blueToothCallback = (type: CallbackType, code: number, msg: string, userParam = 0) => {
	let cb = undefined;
	switch (type) {
		case CallbackType.FindAdapter:
			cb = findCallback;
			break;
		case CallbackType.ConnectSocket:
		
			let obj = _connectCBMap[userParam];
			if (obj) {
				if (code === 0) obj.socketID = msg;
				obj.connectCB(code, msg);
			}
			break;
		case CallbackType.OnResumeType:
			cb = OnResumeCallback;
			break;
		case CallbackType.StateReceiver:
			cb = StateReceiverCallback
			break;
		case CallbackType.WriteType:
			cb = WriteCallback
			break;
		default:
			break;
	}
	if (_isInit && cb) {
		cb(code, msg);
	}
}