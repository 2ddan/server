import {Widget} from "../../../widget/widget";

interface Props{
    hasChild2:boolean;
}

export class Father extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {
            hasChild2:true
        }
    }
    attach(){
        setTimeout(() => {
            this.props.hasChild2 = false;
            this.paint();
        }, 3000);
    }
}  