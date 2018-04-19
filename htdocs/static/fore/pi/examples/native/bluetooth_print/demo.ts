/*
 * 输入框，要求props为{sign:string|number, text:string, id:string|number}, 注意text要转义引号
 */

// ============================== 导入
import { Widget } from "../../../widget/widget";
import { Bluetooth } from "../../../browser/bluetooth";
import * as PrintUtil from "./print"
import { RES_TYPE_BLOB, ResTab } from "../../../util/res_mgr"
import { getRealNode, paintCmd3 } from "../../../widget/painter";

// ============================== 导出
export class Demo extends Widget {

	devices: any;
	sockets: any;
	blue: Bluetooth;

	blueToothInit() {
		this.blue = new Bluetooth();
		PrintUtil.init(this.blue);
		this.onResume();
		this.onpopstate();
	}

	bluetoothOpenSystem() {
		var s = true;
		if (s) {
			this.blue.openSystem();
		} else {
			this.blue.open();
		}
	}

	/**
	 * msg返回所有已配对蓝牙数组，用户选择对应蓝牙设备。
	 */
	blueToothFillAdapter() {
		this.blue.fillAdapter((code, msg) => {
			switch (code) {
				case 0:
					alert("name = " + msg);
					// 保存java数组,偶数为名字，基数为蓝牙地址
					this.devices = msg;
					break;
				default:
					break;
			}

		});
	}
	/**
	 * 传入用户选择的蓝牙设备，尝试连接（这是我传入的是第一个元素）
	 * @param 参数1：下标
	 * @param 参数2：名字
	 * 该方法会判断java数组里该下标的名字和传入的名字是否一致，不一致不会连接
	 */
	blueToothConnectSocket() {

		this.blue.closeSocket();

		alert("name= " + this.devices[0] + " address= " + this.devices[1])
		this.blue.connectSocket(0, this.devices[0], this.devices[1], (code, msg) => {
			switch (code) {
				case 0:
					alert("成功信息 = " + msg);
					this.sockets = msg;
					break;
				default:
					// BlueTooth.writeString失败的回调也会走到这里来，请注意!!!!!!!!
					alert("失败信息 = " + msg);
					break;
			}
		});

	}

	getImageData(url, cb) {

		let resTab = new ResTab();

		resTab.load(url, RES_TYPE_BLOB, url, undefined, res => {
			let img = new Image();
			img.src = res.link;
			img.onload = () => {
				
				let canvas = document.createElement("canvas");
				canvas.width = 384;
				canvas.height = 384

				let ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
				let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
				cb(data);
			};
		}, error => {
			alert("failed load image, error = " + error.reason);
		});
	}

	blueToothWriteString() {

		let url = "examples/native/bluetooth_print/test_image.jpg";
		this.getImageData(url, data => {
			PrintUtil.printTest(data);
		})

		this.blue.flush();
	}


	onResume() {

		this.blue.setResumeCallback((code, msg) => {
			switch (code) {
				case 0:
					alert("onResume成功信息 = " + msg);
					break;
				default:
					// BlueTooth.writeString失败的回调也会走到这里来，请注意!!!!!!!!
					alert("onResume失败信息 = " + msg);
					break;
			}
		})
	}

	onpopstate() {
		this.blue.setStateReceiverback((code ,msg) => {
			switch (code) {
				case 0:
					alert("setStateReceiverback0信息 = " + msg);
					break;
				case 1:
					alert("setStateReceiverback1信息 = " + msg);
					break;
				default:
					break;
			}
		})
	}
}

