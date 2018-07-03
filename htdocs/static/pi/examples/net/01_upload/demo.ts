/**
 * 测试文件上传
 */

// ============================== 导入
import { Widget } from '../../../widget/widget';
import { Connect } from '../../../net/websocket/connect';
import { now } from '../../../lang/time';

// ============================== 导出
export class Demo extends Widget {

	public state;

	public create(): void {
		super.create();
		this.state = {};
		this.openNet();
	}

	public doUpload() {
		let f: any = document.getElementById("testFile")
		if (f.files.length > 0) {
			const len = f.files[0].size;
			const eachCount = 63 * 1024;//最大设置64K以内
			let i = 0;

			while (i <= len) {
				this.loadAndSend(f.files[0].slice(i, i + eachCount), i / eachCount + 1)
				i += eachCount
			}
		} else {
			console.log("no file")
		}
	}

	private loadAndSend(file, block) {
		console.log(`load block:${block}`);
		let myThis = this;
		var reader = new FileReader();
		reader.onload = function (e: any) {
			// console.log(e.target.result)
			myThis.state.con.request({ type: 'test_ws', param: { file: e.target.result } }, (r) => {
				if (r && r.result === 0) {
					console.log(`load ok block:${block}`)
				} else if (r && r.error) {
					console.log(r.error)
				}
			}, 10000);
		};
		reader.readAsArrayBuffer(file);
	}

	private openNet() {
		const cfg = { encode: false, isText: false };
		const conUrl = "ws://127.0.0.1:18080";
		Connect.open(conUrl, cfg, (r) => {
			if (r) this.state.con = r;
		}, 10000);
	}

}
