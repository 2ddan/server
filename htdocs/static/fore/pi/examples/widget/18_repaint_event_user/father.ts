import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

interface Props{
    clickFunc:string;
}

export class Father extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {
            clickFunc:"click1"
        }
    }
    click1(event:any){
        alert("i am click1 from father")
        this.props.clickFunc = "click2";
        this.paint();
    }
    click2(event:any){
        alert("i am click2 from father")
    }
}  

