import { Widget } from '../../../widget/widget';
import { notify } from '../../../widget/event';
import { popNew } from '../../../ui/root';



export class LoadingTest extends Widget {
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
    public input(event){
        let curValue = event.currentTarget.value;
        this.state.count = curValue;
        console.log(curValue)
    }
}
