import { NativeObject, registerSign, ParamType } from "pi/browser/native";

export class GCQuickSDK extends NativeObject {
    /**
     * 
     * @param param 
     *        success(uid, channelID)
     *        fail()
     */
    public getUIDAndChannelID(param: any) {
        this.call("getUIDAndChannelID", param);
    }

    /**
     * 
     * @param param 
     *          roleInfo: JSON字符串
     */
    public setGameRoleInfo(param: any) {
        this.call("setGameRoleInfo", param);
    }

    /**
     *      
     * @param param 
     *          orderInfo: JSON字符串
     *          success(sdkOrderID, cpOrderID, extrasParams)
     *          fail(cpOrderID, message, trace)
     */
    public pay(param: any) {
        this.call("pay", param);
    }
}

registerSign(GCQuickSDK, {
    "getUIDAndChannelID": [],
    "setGameRoleInfo": [{
        "name": "roleInfo",
        "type": ParamType.String
    }],
    "pay": [{
        "name": "orderInfo",
        "type": ParamType.String
    }]
})