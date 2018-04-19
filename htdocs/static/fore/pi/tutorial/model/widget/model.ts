import { Widget } from "../../../widget/widget";
import { getRealNode } from "../../../widget/painter";
import { notify } from "../../../widget/event";

interface ModelData {
	show: boolean;
}
export class Tree extends Widget {
	props: ModelData; 
    create() {
		this.props = {
			show: false
		}
	}

	showModel() {
		this.props.show = true;
		this.paint();
	}

	closeModel() {
		this.props.show = false;
		this.paint();
	}
}
