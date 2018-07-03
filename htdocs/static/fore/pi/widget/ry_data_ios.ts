

import { ParamType, NativeObject, NativeListener, registerSign, addCallback, addResumePauseCallback } from "../browser/native"

//广告
export class HotCloud extends NativeObject {
    /**
     *@Desciption 注册统计
     */
    registAccount(param: any) {
        this.call("setRegisterWithAccountID", param);
    }

	/**
     *@Desciption 登录统计
     */
    loginAccount(param: any) {
        this.call("setLoginWithAccountID", param);
    }

    /**
     *@Desciption 游戏充值请求
     */
    setryzfStart(param: any) {
        this.call("setryzfStart", param);
    }
    
    /**
     *@Desciption 游戏充值成功
     */
    setryzf(param: any) {
        this.call("setryzf", param);
    }

    setEvent(param: any){
        this.call("setEvent", param);
    }

    setProfile(param: any){
        this.call("setProfile", param);
    }
}

//运营
export class HotReYun extends NativeObject{
    
    setRegisterWithAccountID(param: any){
        this.call("setRegisterWithAccountID", param);
    }
    setLoginWithAccountID(param: any){
        this.call("setLoginWithAccountID", param);
    }
    setryzfStart(param: any){
        this.call("setryzfStart", param);
    }

    setryzf(param: any){
        this.call("setryzf", param);
    }

    setEconomy(param: any){
        this.call("setEconomy", param);
    }

    setQuest(param: any){
        this.call("setQuest", param);
    }

    setEvent(param: any){
        this.call("setEvent", param);
    }

    getDeviceid(param: any){
        this.call("getDeviceid", param);
    }
}

registerSign(HotCloud, {
    "setRegisterWithAccountID": [
        {
            name: "account",
            type: ParamType.String
        }
    ],
	"setLoginWithAccountID": [
		{
            name: "account",
            type: ParamType.String
        }
	],
	"setryzfStart": [
		{
            name: "transactionId",
            type: ParamType.String
        },
        {
            name: "ryzfType",
            type: ParamType.String
        },
        {
            name: "currencyType",
            type: ParamType.String
        },
        {
            name: "currencyAmount",
            type: ParamType.Number
        }
	],
	"setryzf": [
		{
            name: "transactionId",
            type: ParamType.String
        },
        {
            name: "ryzfType",
            type: ParamType.String
        },
        {
            name: "currencyType",
            type: ParamType.String
        },
        {
            name: "currencyAmount",
            type: ParamType.Number
        }
    ],
	"setEvent": [
		{
            name: "eventName",
            type: ParamType.String
        },
        {
            name: "extra",
            type: ParamType.String
        }
    ],
	"setProfile": [
		{
            name: "dataDic",
            type: ParamType.String
        }
    ]
    
});

registerSign(HotReYun, {
    "setRegisterWithAccountID": [
		{
            name: "account",
            type: ParamType.String
        },
        {
            name: "gender",
            type: ParamType.Number
        },
        {
            name: "age",
            type: ParamType.String
        },
        {
            name: "serverId",
            type: ParamType.String
        },
        {
            name: "accountType",
            type: ParamType.String
        },
        {
            name: "role",
            type: ParamType.String
        }
    ],
    "setLoginWithAccountID": [
		{
            name: "accountId",
            type: ParamType.String
        },
        {
            name: "gender",
            type: ParamType.Number
        },
        {
            name: "age",
            type: ParamType.String
        },
        {
            name: "serverId",
            type: ParamType.String
        },
        {
            name: "level",
            type: ParamType.Number
        },
        {
            name: "role",
            type: ParamType.String
        }
    ],
	"setryzfStart": [
		{
            name: "transactionId",
            type: ParamType.String
        },
        {
            name: "paymentType",
            type: ParamType.String
        },
        {
            name: "currencyType",
            type: ParamType.String
        },
        {
            name: "currencyAmount",
            type: ParamType.Number
        },
        {
            name: "virtualCoinAmount",
            type: ParamType.Number
        },
        {
            name: "iapName",
            type: ParamType.String
        },
        {
            name: "iapAmount",
            type: ParamType.Number
        }
    ],
    "setryzf": [
		{
            name: "transactionId",
            type: ParamType.String
        },
        {
            name: "paymentType",
            type: ParamType.String
        },
        {
            name: "currencyType",
            type: ParamType.String
        },
        {
            name: "currencyAmount",
            type: ParamType.Number
        },
        {
            name: "virtualCoinAmount",
            type: ParamType.Number
        },
        {
            name: "iapName",
            type: ParamType.String
        },
        {
            name: "iapAmount",
            type: ParamType.Number
        },
        {
            name: "level",
            type: ParamType.Number
        }
    ],
    "setEconomy": [
		{
            name: "itemName",
            type: ParamType.String
        },
        {
            name: "economyNumber",
            type: ParamType.Number
        },
        {
            name: "economyTotalPrice",
            type: ParamType.Number
        }
    ],
    "setQuest": [
		{
            name: "questId",
            type: ParamType.String
        },
        {
            name: "taskState",
            type: ParamType.Number
        },
        {
            name: "taskType",
            type: ParamType.String
        }
    ],
	"setEvent": [
		{
            name: "eventName",
            type: ParamType.String
        },
        {
            name: "extra",
            type: ParamType.String
        }
    ],
	"getDeviceid": []
    
});
let ryIOSData:any = new HotCloud();
ryIOSData.init();
export const ry_registAccount = () => {
    try {
        if(ryIOSData.state == 0){
            ryIOSData.init();
        }
        let str = localStorage.u?localStorage.u.split("-")[0]:"";
        ryIOSData.registAccount({
            account:str
        });

    } catch (e) {
        alert("ry registAccount exception: " + e);
    }
}

export const ry_loginAccount = () => {
    try {
        if(ryIOSData.state == 0){
            ryIOSData.init();
        }
        let str = localStorage.u?localStorage.u.split("-")[0]:"";
        ryIOSData.loginAccount({
            account:str
        });

    } catch (e) {
        alert("ry loginAccount exception: " + e);
    }
}

export const ry_onRechargeStart = (oid, paymentType, currencyAmount) => {
    try {
        if(ryIOSData.state == 0){
            ryIOSData.init();
        }
        ryIOSData.setryzfStart({
            transactionId: oid,
            ryzfType: paymentType,
            currencyType: "CNY",
            currencyAmount: currencyAmount
        });

    } catch (e) {
        alert("ry onRechargeStart exception: " + e);
    }
}

export const ry_onRechargeSuccess = (oid, paymentType, currencyAmount) => {
    try {
        if(ryIOSData.state == 0){
            ryIOSData.init();
        }
        ryIOSData.setryzf({
            transactionId: oid,
            ryzfType: paymentType,
            currencyType: "CNY",
            currencyAmount: currencyAmount
        });

    } catch (e) {
        alert("ry onRechargeSuccess exception: " + e);
    }
}

export const ry_setEvent = (type, dic) => {
    // type:事件 ；dic：对type的补充，键值均为String的对象
    try {
        if(ryIOSData.state == 0){
            ryIOSData.init();
        }
        ryIOSData.setEvent({
            eventName: type,
            extra: JSON.stringify(dic)
        });

    } catch (e) {
        alert("ry setEvent exception: " + e);
    }
}

export const ry_setProfile = (msg) => {
    //msg：玩家信息，键值均为String的对象
    try {
        if(ryIOSData.state == 0){
            ryIOSData.init();
        }
        ryIOSData.setProfile({
            dataDic:JSON.stringify(msg)
        });

    } catch (e) {
        alert("ry setProfile exception: " + e);
    }
}

const hotry_func = function(){
    let module:any = {};
    let hotreyun:any = new HotReYun();

    module.setRegisterWithAccountID = (accountType) => {
        try {
            if(hotreyun.state == 0){
                hotreyun.init();
            }
            let str = localStorage.u?localStorage.u.split("-")[0]:"";
            hotreyun.setRegisterWithAccountID({
                account: str,
                gender: 2,
                age: "0",
                serverId: "0",
                accountType: accountType,
                role: ""
            });
    
        } catch (e) {
            alert("HotReYun setRegisterWithAccountID exception: " + e);
        }
    }
    
    module.setLoginWithAccountID = (level, roleName) => {
        try {
            if(hotreyun.state == 0){
                hotreyun.init();
            }
            let str = localStorage.u?localStorage.u.split("-")[0]:"";
            let sid = localStorage.role_id?localStorage.role_id:"0";
            hotreyun.setLoginWithAccountID({
                accountId: str,
                gender: 2,
                age: "0",
                serverId: String(sid),
                level: level,
                role: roleName
            });
    
        } catch (e) {
            alert("HotReYun setLoginWithAccountID exception: " + e);
        }
    }
    
    module.setryzfStart = (transactionId, paymentType, currencyAmount, virtualCoinAmount, iapName, iapAmount) => {
        try {
            if(hotreyun.state == 0){
                hotreyun.init();
            }
            hotreyun.setryzfStart({
                transactionId: transactionId,
                paymentType: paymentType,
                currencyType: "CNY",
                currencyAmount: currencyAmount,
                virtualCoinAmount: virtualCoinAmount,
                iapName: iapName,
                iapAmount: iapAmount
            });
    
        } catch (e) {
            alert("HotReYun setryzfStart exception: " + e);
        }
    }
    
    module.setryzf = (transactionId, paymentType, currencyAmount, virtualCoinAmount, iapName,iapAmount, level) => {
        try {
            if(hotreyun.state == 0){
                hotreyun.init();
            }
            hotreyun.setryzf({
                transactionId: transactionId,
                paymentType: paymentType,
                currencyType: "CNY",
                currencyAmount: currencyAmount,
                virtualCoinAmount: virtualCoinAmount,
                iapName: iapName,
                iapAmount: iapAmount,
                level: level
            });
    
        } catch (e) {
            alert("HotReYun setryzf exception: " + e);
        }
    }
    
    module.setEconomy = (itemName, itemAmount, itemTotalPrice) => {
        try {
            if(hotreyun.state == 0){
                hotreyun.init();
            }
            hotreyun.setEconomy({
                itemName: itemName,
                economyNumber: itemAmount,
                economyTotalPrice: itemTotalPrice
            });
    
        } catch (e) {
            alert("HotReYun setEconomy exception: " + e);
        }
    }

    module.getDeviceid = () => {
        try {
            if(hotreyun.state == 0){
                hotreyun.init();
            }
            hotreyun.getDeviceid({
                success(msg){

                    localStorage.setItem("deviceId",msg);
                    
                }
            });
    
        } catch (e) {
            alert("HotReYun setEconomy exception: " + e);
        }
    }
    return module;
}

export let hot_reyun = hotry_func();