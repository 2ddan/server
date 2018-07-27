
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";

export const forelet = new Forelet();

export let globalReceive = {
	"gotoOpenTips": (msg) => {
		open("app_b-widget-open_tips-open_tips",msg);
	}
}
