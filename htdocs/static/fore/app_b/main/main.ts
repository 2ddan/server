//pi
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Json } from 'pi/lang/type';
import { listenerList, open } from "pi/ui/root";
//mod
import { data as db } from "app/mod/db";



// =========================== 导出
export class Main extends Widget {
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		this.props = props;
    }
    /**
	 * @description 第一次计算后调用，此时创建了真实的dom，但并没有加入到dom树上，一般在渲染循环外调用
	 * @example
	 */
	firstPaint(): void {
		mainWidget = this;
	}
    /**
	 * @description 设置内容显示组件
	 * @example
	 */
    setMainWidget(arg) {
        this.props = arg && arg.show || this.props;
        this.paint();
    };
    /**
	 * @description 返回主界面
	 * @example
	 */
    goback(arg) {
        this.props = "";
        this.paint();
    };
}

export const globalReceive: any = {
    closeFastlogin : ()=>{
        open("app_b-main-main");
        
    }
}

// =========================== 本地
/**
 * @description main组件
 */
let mainWidget : Widget;


// =========================== 立即执行
(<any>listenerList).add((cmd)=>{
    if(cmd.type === "resize" && mainWidget)
        mainWidget.paint();
})


// =========================== 测试代码
//openMenu();