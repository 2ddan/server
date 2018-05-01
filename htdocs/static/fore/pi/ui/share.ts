import { Widget } from "../widget/widget";
import * as Android from "../browser/android";

interface Props{
    info:Android.ShareData,
}

export class Share extends Widget{

    props:Props;
    constructor(){
        super();
    }

	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Props, oldProps?: Props): void {
		this.props = props;
	}

    //分享到朋友圈
    shareTargetTimeLine(){        
        Android.shareToLine(this.props.info);
        return true;
    };

    //分享给朋友
    shareTargetSession(){
        Android.shareToFriend(this.props.info);
        return true;
    };

    //分享给QQ
    shareQQ(){
        Android.shareToQQ(this.props.info);
        return true;
    };

    //分享到微博
    shareWB(){
        Android.shareToWB(this.props.info);
        return true;
    };

}
