import { Widget } from '../../../widget/widget';
import { notify } from '../../../widget/event';
import { popNew } from '../../../ui/root';



export class LoadingTest extends Widget {
    constructor() {
        super();
        this.state={
            showLocalLoading:false
        }
    }
    public click(event:any){
        let close = popNew("components-loading-loading",{});
        setTimeout(()=>{
            close.callback(close.widget);
        },3000);
    }

    public localClick(event:any){
        this.state.showLocalLoading = true;
        setTimeout(()=>{
            this.state.showLocalLoading = false;
            this.paint();
        },3000)
        this.paint();
    }
}
