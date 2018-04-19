import {Widget} from "../../../widget/widget";
import {Forelet} from "../../../widget/forelet";

interface Props{
    count:number;
}

export let forelet = new Forelet;
export class Html extends Widget{
    props:Props;
    constructor(){
        super();
        this.props = {count : 0};
    }
    onClick(event:any){
        alert("hey!");
        this.props.count++;
        this.paint();
    }
}

let html = new Html;

class Father {
    name:string;
    constructor(){
        this.name = "zx";
    }
    click(){
        alert("i am father");
    }
}

class child extends Father{
    age:number;
    constructor(){
        super();
        this.age = 12;
    }
    click(){
        alert("i am child");
    }
}