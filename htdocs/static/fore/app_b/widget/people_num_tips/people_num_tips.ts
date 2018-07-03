import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open,close} from "app/mod/root";

import { attribute_config } from "cfg/c/attribute_config";

export const forelet : any = new Forelet();

export const globalReceive : any = {
    "peopleNumTips" : (msg) => {
            forelet.paint(attribute_config);
            open("app_b-widget-people_num_tips-people_num_tips",msg);
    }
}

export class numTips extends Widget {
    // 关闭widget
    goback = (arg) => {
        close(arg.widget);
    }
}