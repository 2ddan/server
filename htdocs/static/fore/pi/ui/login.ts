import { Widget } from "../widget/widget";
import * as Android from "../browser/android";


export class login extends Widget{
    constructor(){
        super();
    }

    //登录微信
    loginWX(){
        Android.loginWX();
        return true;
    };

    //登录QQ
    loginQQ(){
        Android.loginQQ();
        return true;
    };

    //微博登录
    loginWeiBo(){
        Android.loginWB();
    }

}