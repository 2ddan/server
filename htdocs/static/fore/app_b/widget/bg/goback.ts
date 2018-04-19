
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";

import { close } from "app/mod/root";
export class Goback extends Widget {
    goback(e) {
			close(e.widget);
	}
}