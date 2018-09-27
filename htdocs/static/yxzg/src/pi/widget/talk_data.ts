

import { ParamType, NativeObject, NativeListener, registerSign, addCallback, addResumePauseCallback } from "../browser/native"

export class TalkData extends NativeObject {
	/**
     *@Desciption 4.1 注册SDK
     */
    registDonewsSDK(param: any) {
		this.call("registDonewsSDK", param);
    }

    /**
     *@Desciption 4.2 应用启动统计onPause
     */
    onPause(param: any) {
		this.call("onPause", param);
    }

    /**
     *@Desciption 4.2 应用启动统计onResume
     */
    onResume(param: any) {
		this.call("onResume", param);
    }

    /**
     *@Desciption 4.3 页面访问统计(当开发者需要时调用)
     */
    onPageAccess(param: any) {
		this.call("onPageAccess", param)
    }
    
	/**
     *@Desciption 4.4 事件回调
     */
    onEvents (param: any) {
		this.call("onEvents", param);
    }

    /**
     *@Desciption 4.5 错误信息统计
     */
    onError (param: any) {
		this.call("onError", param);
    }

    /**
     *@Desciption 4.6 游戏充值
     */
    onRecharge(param: any) {
        this.call("onRecharge", param);
    }

    /**
     *@Desciption 4.7 游戏消费
     */
    onConsumption (param: any) {
        this.call("onConsumption", param);
    }

    /**
     *@Desciption 4.8 账号升级信息
     */
    onRoleUpgrade (param: any) {
        this.call("onRoleUpgrade", param);
    }

    /**
     *@Desciption 4.9 开始任务信息
     */
    onTaskStart(param: any) {
        this.call("onTaskStart", param);
    }

    /**
     *@Desciption 4.10 结束任务信息
     */
    onTaskComplete(param: any) {
        this.call("onTaskComplete", param);
    }

    /**
     *@Desciption 4.11 用户通过付费完成关卡任务的消费信息
     */
    onTaskConsumption(param: any) {
        this.call("onTaskConsumption", param);
    }

    /**
     *@Desciption 4.12 任务失败信息
     */
    onTaskFailed(param: any) {
        this.call("onTaskFailed", param);
    }

	//---------------------------以下非必须接入-----------------
    /**
     * @Desciption 3.1 Banner广告
     */
    setBannerView( param: any) {
        this.call("setBannerView", param);
    }

    /**
     * @Desciption 3.2开屏广告
     */
    loadGravitySplashAd(param: any) {
        this.call("loadGravitySplashAd", param);
    }

    /**
     * @Desciption 3.3 信息流广告
     */
    loadNiuerAd(param: any) {
        this.call("loadNiuerAd", param);
	}
	
}


registerSign(TalkData, {
	"registDonewsSDK": [
		{
			name: "account",
			type: ParamType.String
		}
	],
	"onPause": [
		{
			name: "account",
			type: ParamType.String
		}
	],
	"onResume": [
		{
			name: "account",
			type: ParamType.String
		}
	],
	"onPageAccess": [
		{
			name: "pageId",
			type: ParamType.String
		}, {
			name: "lastPageId",
			type: ParamType.String
		}, {
			name: "pageNum",
			type: ParamType.Number
		}, {
			name: "account",
			type: ParamType.String
		}
	],
	"onEvents": [
		{
			name: "eventId",
			type: ParamType.String
		}, {
			name: "account",
			type: ParamType.String
		}
	],
	"onError": [
		{
			name: "errorType",
			type: ParamType.String
		}, {
			name: "account",
			type: ParamType.String
		}
	],
	"onRecharge": [
		{
			name: "payment_method",
			type: ParamType.String
		}, {
			name: "money",
			type: ParamType.Number
		}, {
			name: "account",
			type: ParamType.String
		}
	],
	"onConsumption": [
		{
			name: "consumption_point",
			type: ParamType.String
		}, {
			name: "money",
			type: ParamType.Number
		}, {
			name: "account",
			type: ParamType.String
		}
	],
    "onRoleUpgrade": [
		{
			name: "account_level",
			type: ParamType.String
		}, {
			name: "account",
			type: ParamType.String
		}
	],
    "onTaskStart": [
		{
			name: "eventId",
			type: ParamType.String
		}, {
			name: "account",
			type: ParamType.String
		}
	],
    "onTaskComplete": [
		{
			name: "eventId",
			type: ParamType.String
		}, {
			name: "account",
			type: ParamType.String
		}
	],
    "onTaskConsumption": [
		{
			name: "eventId",
			type: ParamType.String
		}, {
			name: "payment_method",
			type: ParamType.String
		}, {
			name: "money",
			type: ParamType.Number
		}, {
			name: "account",
			type: ParamType.String
		}
	],
	"onTaskFailed": [
		{
			name: "eventId",
			type: ParamType.String
		},  {
			name: "account",
			type: ParamType.String
		}
	],
    "setBannerView": [
		{
			name: "authKey",
			type: ParamType.String
		}, {
			name: "authSecret",
			type: ParamType.String
		}, {
			name: "viewGroup",
			type: ParamType.String
		}
	],
    "loadGravitySplashAd": [],
	"loadNiuerAd": [
		{
			name: "adType",
			type: ParamType.String
		},  {
			name: "channelid",
			type: ParamType.String
		},  {
			name: "postion",
			type: ParamType.String
		}
	]
});

// let talkData:any = new TalkData();

// export const registDonewsSDK = ()=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init({
//                 success() {
//                     console.log("TalkData init success");
//                 }
//             });
//         }
//         talkData.registDonewsSDK({
// 			account:""
//         });

//     } catch (e) {
//         console.log("talkData exception: " + e);
//     }
// }
// export const onPageAccess = ()=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init({
//                 success() {
//                     console.log("TalkData init success");
//                 }
//             });
// 		}
// 		let str = localStorage.u?localStorage.u.split("-")[0]:"";
//         talkData.onPageAccess({
//             pageId:"1",
//             lastPageId:"0",
// 			pageNum:1,
// 			account:str
//         });

//     } catch (e) {
//         console.log("talkData exception: " + e);
//     }
// }
// export const onRecharge = (rmb,uid)=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init({
//                 success() {
//                     console.log("TalkData init success");
//                 }
//             });
//         }
        
//         talkData.onRecharge({
//             payment_method:"wx",
//             money:rmb,
//             account:uid+""
//         });

//     } catch (e) {
//         console.log("talkData exception: " + e);
//     }
// }

// export const onConsumption = (consumption_type,rmb,uid)=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init({
//                 success() {
//                     console.log("TalkData init success");
//                 }
//             });
//         }
        
//         talkData.onConsumption({
//             consumption_point:consumption_type,
//             money:rmb,
//             account:uid+""
//         });

//     } catch (e) {
//         console.log("talkData exception: " + e);
//     }
// }

// export const onRoleUpgrade = (level,rid)=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init({
//                 success() {
//                     console.log("TalkData init success");
//                 }
//             });
//         }
//         talkData.onRoleUpgrade({
//             account_level:level+"",
//             account:rid+""
//         });

//     } catch (e) {
//         console.log("talkData exception: " + e);
//     }
// }

// addResumePauseCallback(()=>{
// 		try {
// 			if(talkData.state == 0){
// 				talkData.init({
// 					success() {
// 						console.log("TalkData init success");
// 					}
// 				});
// 			}
// 			let str = localStorage.u?localStorage.u.split("-")[0]:"";
// 			talkData.onResume({
// 				account:str
// 			});

// 		} catch (e) {
// 			console.log("talkData exception: " + e);
// 		}
// 	},"resume"
// );
// addResumePauseCallback(()=>{
// 		try {
// 			if(talkData.state == 0){
// 				talkData.init({
// 					success() {
// 						console.log("TalkData init success");
// 					}
// 				});
// 			}
// 			let str = localStorage.u?localStorage.u.split("-")[0]:"";
// 			talkData.onPause({
// 				account:str
// 			});

// 		} catch (e) {
// 			console.log("talkData exception: " + e);
// 		}
// 	},"pause"
// );