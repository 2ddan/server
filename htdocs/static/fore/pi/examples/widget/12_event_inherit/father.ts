import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

export class Father extends Widget{
    constructor(){
        super();
    }
    fatherClick(event:any){
        alert("i am father , i get on-click event");
    }
    childClick(event:any){
        alert("i am father , i get ev-child-click event" + event.value);
        notify(event.node, "ev-father-click", {value:"tangmin"});
    }
}