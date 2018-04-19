//====================================导入
import { Pi, globalSend } from "app/mod/pi";
import { Common } from "app/mod/common";
import { updata } from "app/mod/db";
import { net_request } from "app_a/connect/main";

import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { Common_m } from "app_b/mod/common";

export const forelet = new Forelet();

let bindphone: any = {
    "time": "获取验证码",
    "onOff": true
};
export class wx_share_w extends Widget {
    //领奖
    getAward() {
        let node = (this as any).tree.link.querySelector("#input1");
        if (!node.value || node.value == "请输入您的兑换码") {
            globalSend("screenTipFun", {
                words: "兑换码不能为空！"
            })
            return;
        }
        net_request({ "param": { cdkey: node.value }, "type": "app/cdkey@use_cdkey" }, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            }
            let result: any = Common.changeArrToJson(data.ok);
            let prop: any = Common_m.mixAward(result.award);
            prop.auto = 1;

            // showNewRes(prop, (result) => {
            //     result.open();
            // });
        });
    };
    sureClick() {
        let node1 = (this as any).tree.link.querySelector("#input1");
        let node2 = (this as any).tree.link.querySelector("#input2");
        let phoneNum = node1.value;
        let flagNum = node2.value;

        let myreg = /^1\d{2}\d{8}$/;
        if (!myreg.test(phoneNum)) {
            globalSend("screenTipFun", {
                words: "请输入正确手机号"
            });
            return;
        } else if (!flagNum || flagNum.length > 6) {
            globalSend("screenTipFun", {
                words: "请输入正确验证码"
            });
            return;
        }

        net_request({ "param": { "phone": phoneNum, "vcode": flagNum }, "type": "app/user/bindphone@bind" }, (data) => {
            if (data.error) {
                if (data.error) globalSend("screenTipFun", { words: data.error });
                if (data.reason) globalSend("screenTipFun", { words: data.reason });
                console.log(data.why);
                return;
            } else if (data.ok) {
                let _data: any = Common.changeArrToJson(data.ok);
                updata("player.phone", _data.phone);
                forelet.paint(bindphone);
                let award: any = Common_m.mixAward(_data.award);
                award.auto = 1;
                // showNewRes(award, (result) => {
                //     result.open();
                // });
            }
        });

    }
    setTime() {
        let phoneNum = (this as any).tree.link.querySelector("#input1").value;
        let myreg = /^1\d{2}\d{8}$/;
        if (myreg.test(phoneNum)) {
            if (bindphone.onOff) {
                bindphone.onOff = false;
                net_request({ "param": { "phone": phoneNum }, "type": "app/user/bindphone@send" }, (data) => {
                    if (data.error) {
                        if (data.error) globalSend("screenTipFun", { words: data.error });
                        if (data.reason) globalSend("screenTipFun", { words: data.reason });
                        console.log(data.why);
                        bindphone.onOff = true;
                        return;
                    } else if (data.ok) {
                        let num = 60;
                        globalSend("screenTipFun", { words: "验证码已发送，请注意查收" })
                        let ot = setInterval(() => {
                            if (num == 0) {
                                clearInterval(ot);
                                bindphone.time = "获取验证码";
                                bindphone.onOff = true;
                            }
                            if (num > 0) {
                                num--;
                                bindphone.time = "获取验证码(" + num + ")";
                            }
                            forelet.paint(bindphone);
                        }, 1000);
                    }
                });
            } else globalSend("screenTipFun", { words: "验证码已发送，请耐心等待" });
        }
        else globalSend("screenTipFun", { words: "请输入正确的手机号" });
    }
    //物品详情objectInfoShow
    propInfoShow(arg) {
        globalSend("showBagPropInfo", { "index": null, "obj": Pi.sample[arg] });
    };
    getClick(arg) {
        let node = (this as any).tree.link.querySelector("#input" + arg);
        if (node.value == "请输入您的手机号" || node.value == "请输入您的验证码") node.value = "";
    }
}
forelet.paint(bindphone);