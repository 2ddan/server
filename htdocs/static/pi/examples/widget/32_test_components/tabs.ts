
import { Widget } from '../../../widget/widget';

export class Tabs extends Widget {
    constructor() {
        super();
    }
    public create() {
        super.create();
        this.init();
    }
    public tabsChange(event: any) {
        this.state.activeNum = event.value;
        this.state.show = this.state.list[this.state.activeNum];
        this.paint();
    }

    private init() {
        this.state = {};
        this.state.list = ["用户管理", "配置管理", "角色管理", "定时任务补偿"];
        this.state.activeNum = 0;
        this.state.show = "用户管理";
    }
}
