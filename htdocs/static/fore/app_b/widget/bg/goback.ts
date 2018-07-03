
import { Widget } from "pi/widget/widget";

import { close } from "app/mod/root";
import { globalSend } from "app/mod/pi";
export class Goback extends Widget {
    goback(e) {
		close(e.widget);
		globalSend("secondaryClose");
	}
}