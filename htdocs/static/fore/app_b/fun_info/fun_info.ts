import { Widget } from "pi/widget/widget";
import { open, close } from "app/mod/root";

export const globalReceive = {
    "funInfo": (msg) => {
        open("app_b-fun_info-fun_info", msg);
    }
}

export class FunInfo extends Widget {
    setProps(props) {
        props.width = props.width || 265;
        props.height = props.height || 265;
        props.top = props.top || 0;
        this.props = props;
    }
    goback(arg) {
        close(arg.widget);
    }
}