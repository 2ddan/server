import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

export class Child extends Widget{
    constructor(){
        super();
        this.props = {
        }
    }
    clickFunc(event:any){
        event.preventDefault();
        notify(event.node, "ev-click", {value:"tangmin"});
    }

    click1(event:any){
        event.preventDefault();
        alert(" i am click 1");
        this.props.clickFunc = "click2"
        this.paint();        
    }
    click2(event:any){
        alert(" i am click 2");
    }
}  