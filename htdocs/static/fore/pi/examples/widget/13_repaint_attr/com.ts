import { Widget } from "../../../widget/widget";
import {notify} from "../../../widget/event";

interface Props {
    arr: Array<number>;
}

export class Attr extends Widget {
    constructor() {
        super();
        this.props = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "="],
            formula: ""
        }
    }
    childClick(e: any) {
        
        let item = this.props.arr[e];
       
        console.log(item);
        if(item === "=") {
            console.log("1111");
            alert(eval(this.props.formula));
        } else {
            this.props.formula += item;
        }

    }
}
