import { Widget } from "pi/widget/widget";
import { paintWidget } from "pi/widget/painter";

export class star_anim extends Widget {
    paint(): void {
		paintWidget(this,true)
	}
}
