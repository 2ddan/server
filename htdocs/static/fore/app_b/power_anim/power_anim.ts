// ============================== 导入
import { Widget, factory } from "pi/widget/widget";
import { data, updata , listen } from "app/mod/db";
import { Forelet } from "pi/widget/forelet";
import { open, remove, destory} from "pi/ui/root";

/**
 * @description 导出给组件用的forelet
 * @example
 */
export const forelet : any = new Forelet();

/**
 * @description 导出组件Widget类
 * @example
 */
export class powerAnimWidget extends Widget {
    timer: any;
	animBack(){
        this.timer = setTimeout(function() {
            destory(powerWidget);
            powerWidget = null;
        }, 300);
	}
}


let oldPower = 0;
let powerWidget = null;
export const powerAnim = (newPower) => {
    if (oldPower && oldPower!=newPower) {
        if (!powerWidget) {
            powerWidget = open("app_b-power_anim-power_anim", {"oldPower":oldPower,"newPower":newPower});
        } else {
            if (powerWidget.timer)clearTimeout(powerWidget.timer);
            powerWidget.setProps({"oldPower":oldPower,"newPower":newPower});
            powerWidget.paint();
        }
        oldPower = newPower;
    } 
	oldPower = newPower;
};


