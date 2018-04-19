import { open, destory, getWidth, getHeight } from '../../../pi/ui/root';
import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { Forelet } from "../../../pi/widget/forelet";


export class subMenu extends Widget {
    //取消
    goback(e) {
        destory(e.widget);
    }
    clickFun(key) {

    }
}

export const showSubMenu = (key, e) => {
    let width = getWidth(),
        height = getHeight();
    let hor = "left: " + e.x + "px;";
    if (e.x > width - 100) {
        hor = "right: " + (width - e.x) + "px;";
    }
    let ver = "top: " + e.y + "px;";
    if (e.y > height / 2) {
        ver = "bottom: " + (height - e.y) + "px;";
    }
    open("editer-ui_component-tools-submenu", { keys: SUBMENU[key], style: hor + ver });
}

const SUBMENU = {
    file: [],
    widget: ["createDiv", "copy", "paste", "delete"]
}