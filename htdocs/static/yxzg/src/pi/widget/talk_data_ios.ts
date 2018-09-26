

import { ParamType, NativeObject, NativeListener, registerSign, addCallback, addResumePauseCallback } from "../browser/native"

export class TalkData extends NativeObject {

    registAccount(param: any) {
        this.call("registAccount", param);
    }

	/**
     *@Desciption 4.3 页面访问统计(当开发者需要时调用)
     */
    onPageAccess(param: any) {
        this.call("onPageAccess", param);
    }
    
    /**
     *@Desciption 4.4 事件回调
     */
    onEvents(param: any) {
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
    onTaskConsumption(param) {
        this.call("onTaskConsumption", param);
    }
    
    /**
     *@Desciption 4.12 任务失败信息
     */
    onTaskFailed(param) {
        this.call("onTaskFailed", param);
    }
	
}


registerSign(TalkData, {
    "registAccount": [
        {
            name: "account",
            type: ParamType.String
        }
    ],
	"onPageAccess": [
		{
			name: "pageName",
			type: ParamType.String
        },
        {
			name: "lastPageName",
			type: ParamType.String
		},
        {
			name: "pageNum",
			type: ParamType.Number
		}
	],
	"onEvents": [
		{
			name: "eventname",
			type: ParamType.String
		}
	],
	"onError": [],
	"onRecharge": [
		{
			name: "paymentMethod",
			type: ParamType.String
        },
        {
			name: "money",
			type: ParamType.Number
		}
	],
	"onConsumption": [
		{
			name: "consumptionPoint",
			type: ParamType.String
        },
        {
			name: "money",
			type: ParamType.Number
		}
	],
    "onRoleUpgrade": [
		{
			name: "accountLevel",
			type: ParamType.Number
		}
	],
    "onTaskStart": [
		{
			name: "taskName",
			type: ParamType.String
		}
	],
    "onTaskComplete": [
		{
			name: "taskName",
			type: ParamType.String
		}
	],
    "onTaskConsumption": [
		{
			name: "taskName",
			type: ParamType.String
        },
        {
			name: "payment",
			type: ParamType.String
		},
        {
			name: "money",
			type: ParamType.Number
		}
	],
	"onTaskFailed": [
		{
			name: "taskName",
			type: ParamType.String
		}
	]
});

// let talkData:any = new TalkData();
// talkData.init();
// export const registAccount = () => {
//     try {
//         if(talkData.state == 0){
//             talkData.init();
//         }
//         let str = localStorage.u?localStorage.u.split("-")[0]:"";
//         talkData.registAccount({
//             account:str
//         });

//     } catch (e) {
//         console.log("talkDataIOS exception: " + e);
//     }
// }
// export const onPageAccess = ()=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init();
//         }
//         talkData.onPageAccess({
//             pageName:"login",
//             lastPageName:"1",
//             pageNum:1
//         });

//     } catch (e) {
//         console.log("talkDataIOS exception: " + e);
//     }
// }
// export const onRecharge = (rmb)=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init();
//         }
//         talkData.onRecharge({
//             paymentMethod:"wx",
//             money:rmb
//         });

//     } catch (e) {
//         console.log("talkDataIOS exception: " + e);
//     }
// }

// export const onConsumption = (consumption_type,rmb)=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init();
//         }
//         talkData.onConsumption({
//             consumptionPoint:consumption_type,
//             money:rmb
//         });

//     } catch (e) {
//         console.log("talkDataIOS exception: " + e);
//     }
// }

// export const onRoleUpgrade = (level)=>{
// 	try {
//         if(talkData.state == 0){
//             talkData.init();
//         }
//         talkData.onRoleUpgrade({
//             accountLevel:level
//         });

//     } catch (e) {
//         console.log("talkDataIOS exception: " + e);
//     }
// }