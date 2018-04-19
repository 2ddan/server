import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

interface Props{
    clickFunc:string;
}

export class Child extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {
            clickFunc:"click1"
        }
    }    
    click1(event:any){
        
        event.preventDefault();
        alert(" i am click 1");
        notify(event.node, "ev-click1", {value:"tangmin"});
        this.props.clickFunc = "click2"
        this.paint();        
    }
    click2(event:any){
        
        alert(" i am click 2");
        notify(event.node, "ev-click2", {value:"tangmin"});
    }
} 