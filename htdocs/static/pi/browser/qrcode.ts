import { NativeObject, registerSign, ParamType } from "native";

export class QRCode extends NativeObject {
    public scan(param: any) {
        param.ignore = "";
        this.call("scan", param);
    }
}

registerSign(QRCode, {
    "scan": [{
        name: "ignore",
        type: ParamType.String
    }]
});