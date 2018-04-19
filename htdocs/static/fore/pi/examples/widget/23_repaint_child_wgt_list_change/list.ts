import {Widget} from "../../../widget/widget";

interface Props{
    arr:Array<[number, string]>;
}

export class List extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {
            arr:[
                [100,"a"],
                [200,"b"],
                [300,"c"],
                [400,"d"],
                [500,"e"],
                [600,"f"],
                [700,"g"]
            ]
        }
    }
    attach(){
        setTimeout(() => {
            this.props.arr = [
                [400,"a"],
                [600,"b"],
                [200,"n"],
                [900,"c"],
                [200,"e"],
                [100,"z"],
                [300,"y"]
            ];
            this.paint();
        }, 3000);
    }
}
