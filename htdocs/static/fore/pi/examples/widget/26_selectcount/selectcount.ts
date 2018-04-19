import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";
import {Json} from "../../../lang/type";

interface Props{
    count: number;
}

export class Count extends Widget{

    props:Props;
    constructor(){
        super();
        this.props = {
            count:1
        }
    }

    changeCount(count){
        this.props.count = count;
        this.paint();
        return true;
    };

} 

