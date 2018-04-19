import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

export class Grand extends Widget{
    constructor(){
        super();
    }
    grandClick(event:any){
        alert("i am grand , i get on-click event");
    }
    childClick(event:any){
        alert("i am grand , i get ev-child-click event");
    }
    fatherClick(event:any){
        alert("i am grand , i get ev-father-click event");
    }
}