
import { Widget } from "pi/widget/widget";
import { notify } from "pi/widget/event";
import { Forelet } from "pi/widget/forelet";
export class popupsBG extends Widget {
    colse(e) {
		notify(this.parentNode, "ev-btn-colse", e);
	}
}