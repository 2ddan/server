
// ============================== 导入
import { Widget, getCache } from "../../../pi/widget/widget";
import { Json } from '../../../pi/lang/type';


// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class DataTree extends Widget {
    valueType
    key
    setProps(props) {
        this.props = props;
        if (props.updataKey !== undefined)
            this.key = props.updataKey.substring(1);
        if (props.value !== undefined)
            this.valueType = typeof props.value;
        if (props.updataFun)
            updataFun = props.updataFun;
    }
    updata = (e) => {
        let value = e.target.value;
        updataFun(value, this.key, this.valueType)
    }
}

let updataFun;