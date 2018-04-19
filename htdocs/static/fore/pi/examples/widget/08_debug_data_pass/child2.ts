import {Widget} from "../../../widget/widget";

interface Props{
    begindate:string;
    stopdate:string;
}

export class Father extends Widget{
    props: Props;
    constructor(){
        super();
        this.props = {
            begindate: "",
            stopdate: ""
        }
    }
    create() {
        let d = new Date();
        this.props.stopdate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        this.paint();
        let d1 = new Date(d.getTime() - 7*24*60*60*1000);
        this.props.begindate = d1.getFullYear()+"-"+(d1.getMonth()+1)+"-"+d1.getDate();
    }
} 