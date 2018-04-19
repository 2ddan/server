
import { Forelet } from "pi/widget/forelet"
import { open, close } from "app/mod/root";

export let forelet = new Forelet();

export const globalReceive = {
    //传送
    "ui_anim": function (arg) {
        uiAnim(arg);
    }
}

const uiAnim = (arg) => {
    open("app_c-ui_anim-ui_anim",arg.name);
    setTimeout(function(){
        let w : any= forelet.getWidget("app_c-ui_anim-ui_anim");
        if(w){
            close(w);
            w=undefined;
        }
    },arg.time);
}