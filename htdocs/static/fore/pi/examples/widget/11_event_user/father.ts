import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

export class Father extends Widget{
    constructor(){
        super();
    }
    fatherClick(event:any){
        alert("father get it : " + event.value);
    }
}
