/**
 * 本质上是专门给备注使用的输入框
 */
// ======================================= 导入
import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

// ======================================= 导出
export class Input extends Widget {
    props:Props;
    create(){
        super.create();
        this.props = {} as Props;
        this.props.defaultText="";
    }
    getInput(event:any){
        event.fixedValue = event.currentTarget.value;
        notify(event.node, "ev-input", {fixedValue:event.fixedValue, fixedEvent:event});
    }
}

// ======================================= 本地
interface Props{
    defaultText:string;
}