
// ============================== 导入
import { NativeObject, registerSign, ParamType } from './native';
// ============================== 导出

/**
 * 接入广告
 * 
 * 支持广告平台
 *    + 腾讯广点通
 *    + 字节跳动的穿山甲
 * 
 * 支持广告类型
 *    + 激励视频广告
 * 
 */
export class ADUnion extends NativeObject {

	/**
	 * 获取每个平台当前可用的广告数量
	 * @param cb(广点通, 穿山甲)
	 * @note 必须等loadRewardVideoAD的cb调用之后，numberCb的参数才有效
	 */
	public static getADNumber(numberCb) {
		numberCb(adCount[AdPlatform.GDT], adCount[AdPlatform.CSJ]);
	}

	/**
	 * 播放激励视频广告
	 * @param platform 
	 * @param cb 播放期间的事件回调
	 */
	public static showRewardVideoAD(platform: AdPlatform, cb: (isSuccess: number, event: PlayEvent, info: string) => void) {
		adMrg.call("showRewardVideoAD", {
			platform, callback(isSuccess: number, event: PlayEvent, info: string) {
				if (event === PlayEvent.Reward && isSuccess === 1 && adCount[platform] !== undefined) {
					adCount[platform] = adCount[platform] < 1 ? 0 : adCount[platform] - 1;
				}
				cb(isSuccess, event, info);
			}
		});
	}

	/**
	 * 播放激励视频广告
	 * @param platform 广告平台
	 * @param cb 加载结果回调
	 */
	public static loadRewardVideoAD(platform: AdPlatform, cb: (error: string, info: string) => void) {
		adMrg.call("loadRewardVideoAD", {
			platform,
			success(info: string) {
				if (adCount[platform] !== undefined) {
					adCount[platform] = adCount[platform] + 1;
				}
				cb(undefined, info);
			},
			fail(errInfo: string) {
				cb(errInfo, undefined)
			}
		});
	}
};

/**
 * 广告平台类型
 */
export enum AdPlatform {
	GDT = 1,  // 广点通
	CSJ = 2,  // 穿山甲
}

/**
 * 播放事件类型
 */
export enum PlayEvent {
	Reward = 0,  // 发放奖励
	Close = 1,   // 关闭界面
}

// ============================== 本地

/** 
 * 每个平台的广告数 
 */
let adCount = {
	[AdPlatform.GDT]: 0, // 广点通的广告数
	[AdPlatform.CSJ]: 0, // 穿山甲的广告数
};

/**
 * 底层接口和参数的声明
 */
registerSign(ADUnion, {
	showRewardVideoAD: [
		{
			name: 'platform',
			type: ParamType.Number
		}
	],
	loadRewardVideoAD: [
		{
			name: 'platform',
			type: ParamType.Number
		}
	]

});

const adMrg = new ADUnion();
adMrg.init();

