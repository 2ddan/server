/*
 * 输入框，要求props为{sign:string|number, text:string, id:string|number}, 注意text要转义引号
 */

// ============================== 导入
import { Widget } from "../../../widget/widget";
import * as reg  from "../../../browser/speech_recognition";
import * as syn  from "../../../browser/speech_synthesizer";
import * as code  from "../../../browser/zxing";


// ============================== 导出
export class Demo extends Widget {

	start() {
		syn.start("在山的那边海的那边，有一群蓝鲸鱼",(code,msg)=>{
			switch (code) {
				case 0:
					alert("语音合成成功，string = "+msg+" code ="+code)
					break;
				case 1:
					alert("语音合成失败，string = "+msg+" code ="+code)
					break;
				default:
					break;
			}				
		})
	}

	stop() {
		
		syn.stop();
	}

	pause() {
		syn.pause();
	}

	resume() {
		syn.resume();
	}

	// 分界线---------------------------------------

	lisStart() {
		reg.start((code, msg) => {
			if (code === 0) {
				alert("语音识别成功，string = " + msg);
			} else {
				alert("语音识别失败，code = " + code + ", message = " + msg);
			}
		});
	}

	lisStop() {
		reg.stop();
	}

	lisCancel() {
		reg.cancel();
	}

	code() {
		code.start((code,msg)=>{
			switch (code) {
				case 0:
					alert("二维码识别成功 = "+msg+" code ="+code)
					break;
				case 1:
					alert("二维码识别失败 = "+msg+" code ="+code)
					break;
				default:
					break;
			}		
		})
	}

}

