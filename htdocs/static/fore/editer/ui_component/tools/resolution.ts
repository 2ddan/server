import { Json } from '../../../pi/lang/type';
import { Widget } from "../../../pi/widget/widget";
import { open } from '../../../pi/ui/root';
import { userCfg } from '../../user_cfg';

let select: string;//当前选择的分辨率
let callback;//选择分辨率后刷新
let resoWidget: Widget;
export class Resolution extends Widget {
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        resoWidget = this;
        callback = props.cb;
        this.props = getData();
    }
}

const changReso = (content, index) => {
    if (index == reso.cfg.length - 1) {
        open("editer-ui_component-tools-edit_reso", { add: add, del: del, arr: reso.cfg })
    }
    else {
        reso.curr = index;
        callback();
    }
}
/**
 * 添加新的分辨率
 * @param name 
 * @param width 
 * @param height 
 */
const add = (name, width, height) => {
    reso.cfg.unshift([name, width, height]);
    reso.curr = 0;
    resoWidget.props = getData();
    resoWidget.paint();
    callback();
}
const del = (index) => {
    if (reso.cfg.length === 2) {
        alert(`keep one at least!`);
        return;
    }
    reso.cfg.splice(index, 1);
    if (reso.curr === index)
        reso.curr = 0;
    resoWidget.props = getData();
    resoWidget.paint();
    callback();
}

const getData = () => {
    let data: any = {}, resoArr = [];
    for (let k = 0, len = reso.cfg.length; k < len; k++) {
        let v = reso.cfg[k];
        resoArr.push(v[0] + (v[1] ? " (" + v[1] + "x" + v[2] + ")" : ""));
    }
    data.resoArr = resoArr;
    data.select = reso.curr;
    data.changReso = changReso;
    data.notSelect = "编辑";

    return data;
}

let reso = userCfg.resolution ;
