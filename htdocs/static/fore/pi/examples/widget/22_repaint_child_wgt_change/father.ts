import {Widget} from "../../../widget/widget";

interface Props{
    childName:string;
}

export class Father extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {
            childName:"examples-widget-22_repaint_child_wgt_change-child2"
        }
    }
    attach(){
        setTimeout(() => {
            this.props.childName = "examples-widget-22_repaint_child_wgt_change-child3";
            this.paint();
        }, 3000);
    }
}  