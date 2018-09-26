/*global pi document WeixinJSBridge */

/**
 * @name app.wx
 * @object
 * @namespace
 * @description
 */
//pi.mod.define('app.wx', function (path) {

let ready = function (fun: Function) {
    let f,doc:any = document,win:any = window,wb = win.WeixinJSBridge;
    // 微信api是否就绪
    if (typeof wb == "undefined") {
        f = function () {
            fun(wb);
        };
        if (doc.addEventListener) {
            doc.addEventListener('WeixinJSBridgeReady', f, false);
        } else if (doc.attachEvent) {
            doc.attachEvent('WeixinJSBridgeReady', f);
            doc.attachEvent('onWeixinJSBridgeReady', f);
        }
    } else {
        fun(wb);
    }
};


export class Wx_api {
    // 微信api调用
    static is() {
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") >= 0;
    };
    // 微信api调用
    static invoke(funName, funJson, callback) {
        ready(function (jsBridge) {
            // 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
            jsBridge.invoke(funName, funJson, function (res) {
                //alert(res.err_msg);
                jsBridge.log("code:" + res.err_code + ", desc:" + res.err_desc + ", msg:" + res.err_msg);
                callback(res.err_msg.split(":")[1]);
            });
        });
    };
    // 微信api事件回调
    static on(eventName, callback) {
        ready(function (jsBridge) {
            jsBridge.on(eventName, callback);
        });
    };
};