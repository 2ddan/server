import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { helpTips } from "./tip_cfg"

export const forelet = new Forelet()

export class help_w extends Widget {
    goback() {
        let w:any = forelet.getWidget("app_c-help_tip-help_tip")
        if(w && w.ok)w.ok();
        else if(w && w.cancel)w.cancel();
    }
};
//msg为字符串对象
export const globalReceive :any = {
    showHelp :(msg)=>{
        !forelet.getWidget("app_c-help_tip-help_tip") && open("app_c-help_tip-help_tip", helpTips[msg])
    }
};
