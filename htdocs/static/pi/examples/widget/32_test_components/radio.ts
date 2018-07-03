
import { Widget } from '../../../widget/widget';
import { notify } from '../../../widget/event';



export class RadioTest extends Widget {
    constructor() {
        super();
    }
    public radioChange(event: any) {
        console.log("外部处理")
        console.log(event.checkedIndex)
    }
}
