import {Widget} from "../../../widget/widget";

interface Props{
    style:string;
}

export class Father extends Widget{
    prop:Props;
    constructor(){
        super();
        this.props = {
            style: "b"
        }
    }
    attach(){
        setTimeout(() => {
            this.props.style = "c";
            this.paint();
        }, 3000);
    }
}