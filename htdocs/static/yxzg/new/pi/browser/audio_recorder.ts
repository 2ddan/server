/**
 * 音频录制器
 * 打开底层录音器获取转码后的MP3音频
 */
// ============================== 导入
import { base64ToArrayBuffer } from '../util/base64';
import { NativeObject, registerSign } from './native';
// ============================== 导出

/**
 * 音频录制类
 */
export class AudioRecorder extends NativeObject {


	constructor() {
		super();
		this.init();
	}

	/**
	 * 获取底层麦克风权限是否打开
	 * @param cb (BOOL)
	 */
	getPromission(cb) {
		this.call("getPromission", {
			success() {
				cb && cb(true)
			},
			fail() {
				cb && cb(false)
			}
		});
	}
	/**
	 * 打开音频录制器
	 * @param cb （BOOL）
	 */
	start(cb) {
		this.call("start", {
			success() {
				cb && cb(true)
			},
			fail() {
				cb && cb(false)
			}
		});
	}

	/**
	 * 关闭音频录制器，获取到mp3的base64编码
	 * @param cb （data）返回base64转码后的ArrayBuffer
	 */
	stop(cb) {
		this.call("stop", {
			success(base64) {
				let data = base64ToArrayBuffer(base64);
				cb && cb(data);
			},
			fail() {
				cb && cb()
			}
		})
	}

	/**
	 * 关闭当前录音器并丢弃掉录音文件
	 * @param cb （BOOL）
	 */
	drop(cb) {
		this.call("drop", {
			success() {
				cb && cb(true);
			},
			fail() {
				cb && cb(false)
			}
		})
	}
};


// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(AudioRecorder, {
	getPromission: [],
	start: [],
	stop: [],
	drop: []
});

