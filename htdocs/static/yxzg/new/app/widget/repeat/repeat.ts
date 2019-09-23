import { Widget } from "../../../pi/gui_virtual/widget";

export class Repeat extends Widget {
    public setProps(props: any) {
        super.setProps(props)
        let split: string = this.props.split;
        this.props.split = split.trim().replace(/\s+/g, " ").replace(/\s/g, "px ") + "px";
    }
}