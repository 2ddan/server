/*
 * 渐进显示数组
 * props={direction:2, arr:[], showStart:0, showEnd:0, initCount:10, addCount:5, checkPixel:100,scrollEnd:false }
 */

// ============================== 导入
import { REventData } from '../../../pi/gui/r_event_base';
import { Widget } from '../../../pi/gui_virtual/widget';
import { RContainerElement } from '../../../pi/gui/r_containerelement';

// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class Progressive extends Widget {
    // 滚动位置的状态，0表示滚动位置为开头，1表示为中间，2表示为底部
    public state: number = 0;
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    public setProps(props: any, oldProps?: any): void {
        props.arr           = props.arr || [];
        props.orientation   = props.orientation || 2;
        props.initCount     = props.initCount   || 10;
        props.addCount      = props.addCount    || 5;
        props.checkPixel    = props.checkPixel  || 0.5;
        props.showStart     = props.showStart   || 0;
        props.showEnd       = props.showEnd     || Math.min(props.showStart + props.initCount, props.arr.length);

        super.setProps(props);
    }

    /**
	 * @description 滚动监听
	 * @example
	 */
    public scroll = (e: REventData) => {
        const el: RContainerElement = <RContainerElement>this.tree.l ;

        const props = this.props;

        let start, clientSize, scrollSize, check;

        if (props.orientation === 2) {
            start       = el.scrollY;
            clientSize  = el.height;
            scrollSize  = el.scrollHeight;
        } else {
            start       = el.scrollX;
            clientSize  = el.width;
            scrollSize  = el.scrollWidth;
        }
        if (start === 0) {
            this.state = 0;
        } else if (start + clientSize >= scrollSize) {
            this.state = 2;
        } else {
            this.state = 1;
        }

        check = Number.isInteger(props.checkPixel) ? props.checkPixel : ((props.checkPixel * clientSize) | 0);

        if (start + clientSize + check >= scrollSize && props.showEnd < props.arr.length) {

            // 向尾部添加数据
            props.showEnd = Math.min(props.showEnd + props.addCount, props.arr.length);

            return this.paint();
        }
    }
}

// ============================== 本地

// ============================== 立即执行
