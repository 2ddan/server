import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";
import {Json} from "../../../lang/type";

interface Props{
    count: number;
    isend:boolean;
}

export class CountDownDemo extends Widget{

    props:Props;
    constructor(){
        super();
        this.props = {
            count:1,
            isend:false
        }
    }

    end(){
        this.props.isend = true;
        this.paint();
    };

} 

