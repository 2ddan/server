//====================================导入
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { net_request } from "app_a/connect/main";

import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { showNewRes } from "app_b/bag/bag";

export const forelet = new Forelet();

export class wx_share_w extends Widget {
    //领奖
    getAward() {
        let node = (this.tree.link as any).querySelector("#input1");
        if (!node.value || node.value == "请输入您的兑换码") {
            globalSend("screenTipFun", {
                words: "兑换码不能为空！"
            });
            return;
        }
        net_request({ "param": { cdkey: node.value }, "type": "app/cdkey@use_cdkey" }, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.why });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            }
            let prop: any = Common.changeArrToJson(data.ok);
            let result = Common_m.mixAward(prop);
            result.auto = 1;
            showNewRes(result, function (result) {
                result.open();
            });
        });
    };

    getClick() {
        let node = (this.tree.link as any).querySelector("#input1");
        node.value = "";
    }
}