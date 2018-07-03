import { Widget } from '../../../widget/widget';
import { notify } from '../../../widget/event';
import { popNew } from '../../../ui/root';



export class InputTest extends Widget {
    constructor() {
        super();
        this.state = {
            count:1
        }
    }
    public click(event:any){
        this.state.count += 1;
        this.paint();
    }

}
