import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

export class Child extends Widget{
    constructor(){
        super();
    }
    childClick(event:any){
        alert("childClick");
        notify(event.node, "ev-click", {value:"tangmin"});
    }

}

