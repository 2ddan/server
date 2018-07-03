import { Widget } from '../../../widget/widget';
import { notify } from '../../../widget/event';
import { popNew } from '../../../ui/root';



export class TimeSelectTest extends Widget {
    constructor() {
        super();
        this.state={
            showLocalLoading:false
        }
    }
    public select(event:any){
        console.log("select",event.value);
     }
    public change(event:any){
       console.log("change",event.value);
    }
    public focus(event:any){
        console.log("focus");
    }
    public blur(event:any){
        console.log("blur");
    }

}
