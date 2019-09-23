import { Widget } from '../../../pi/gui_virtual/widget';
import { notify } from '../../../pi/gui_virtual/event';

export class Input extends Widget {
    onChange(e) {
        const value = (<any>self)._gui ? e.current._value : e.target.value;
        notify(this.parentNode, "ev-input-change", { native: e, "id": this.props.id, "text": value });
        notify(this.parentNode, "ev-input-text", { native: e, "id": this.props.id, "text": value });
    }
    onBlur(e) {
        const value = (<any>self)._gui ? e.current._value : e.target.value;
        notify(this.parentNode, "ev-input-change", { native: e, "id": this.props.id, "text": value });
    }
    onFocus() {
        console.log("onFocus")
    }
    onInput(e) {
        const value = (<any>self)._gui ? e.current._value : e.target.value;
        notify(this.parentNode, "ev-input-change", { native: e, "id": this.props.id, "text": value });
        notify(this.parentNode, "ev-input-text", { native: e, "id": this.props.id, "text": value });
    }
    keydown(e) {
        if (e.keyCode === 13) {
            notify(this.parentNode, "ev-input-enter", { native: e, "id": this.props.id, "text": e.target.value });
        }
    }
}