import { Widget } from "../../../widget/widget";
import { Json } from '../../../lang/type';
import { notify } from "../../../widget/event";
import { getRealNode } from "../../../widget/painter";


/**
 * @description 导出组件Widget类
 * @example
 */
export class Select extends Widget {
	setProps(props: Json, oldProps?: Json): void {
		this.props = props;
	}

	firstPaint(){
		let el = getRealNode((<any>this.tree).children[0]);
		el.onchange = this.change.bind(this);
	}

	change(e){
		this.props.name = e.currentTarget.value;
		this.paint();
		notify(this.parentNode, "ev-select", {value: e.currentTarget.value});
	}
}