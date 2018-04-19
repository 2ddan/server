import {Widget} from "../../../widget/widget";

interface Props{
    clickFunc:string;
}

export class EventHtml extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {
            clickFunc:"click1",
        }
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

