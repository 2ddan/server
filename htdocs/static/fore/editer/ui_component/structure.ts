// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import { userCfg, saveUserCfg } from '../user_cfg';
import { align } from './select';
import * as Mgr from "../mgr/widget_mgr";
import { mgr } from "../../pi/examples/scene";

let temp;

let resizePanl, resizeIndex, pos;
/**
 * @description 导出组件Widget类
 * @example
 */
export class Structure extends Widget {
	create() {
		Mgr.register(this);
	}
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
		this.props = this.config.value.it;
		this.props.changeReso = changeReso;
		this.props.curReso = userCfg.resolution.cfg[userCfg.resolution.curr];
		this.props.layout = userCfg.layout;
		this.props.zoom = userCfg.zoom;
		this.props.dataTab = dataTab;
		this.props.tabs = userCfg.tabs;
		temp = this;
	}
	showCode(arg) {
		this.props.showCode = userCfg.layout.showCode = !arg;
		saveUserCfg();
		this.paint();
		if (userCfg.layout.showCode)
			Mgr.notify("modifyCode");
	}
	changeDataTab(arg) {
		this.props = this.props || this.config.value.it;
		this.props.datatab = arg;
		this.paint();
	}
	align(dir: string) {
		align(dir);
	}

	resizeStar(e, panl, index) {
		resizePanl = panl;
		resizeIndex = index;
		pos = [e.x, e.y];
	}
	resizeMove(e) {
		if (resizePanl && resizeIndex > -1) {
			let change = e.x - pos[0];
			pos = [e.x, e.y];
			this.props.layout[resizePanl][resizeIndex] += change;
			this.props.layout[resizePanl][resizeIndex + 1] -= change;
			userCfg.layout = this.props.layout;
			saveUserCfg()
			this.paint()
		}
	}
	resizeEnd(e) {
		resizePanl = null;
		resizeIndex = null;
		pos = null;
	}
	switchLang() {
		let lang = userCfg.inspector.lang;
		userCfg.inspector.lang = (lang == "en" ? "zh" : "en");
		saveUserCfg();
		Mgr.notify("attrChange");
	}
	aside(type) {
		if (userCfg.layout.aside == type) {
			this.props.layout.aside = userCfg.layout.aside = null;
		}
		else {
			this.props.layout.aside = userCfg.layout.aside = type;
		}
		if (type === "sytree" && userCfg.layout.aside === null)
			Mgr.notify("syTreeReopen");
		saveUserCfg();
		this.paint();
	}
	//切标签
	changeTab(index) {
		if (this.props.tabs.index !== index) {
			userCfg.tabs.index = this.props.tabs.index = index;
			let tab = userCfg.tabs.arr[index];
			Mgr.open(tab.path);
			saveUserCfg();
			this.paint();
		}
	}
	closeTab(e, index) {
		if (userCfg.tabs.arr.length === 1) {
			alert("keep one tab at least!")
			return
		}

		let del = userCfg.tabs.arr.splice(index, 1)
		if (index === userCfg.tabs.index) {
			if (index !== 0)
				userCfg.tabs.index--;
			let tab = userCfg.tabs.arr[userCfg.tabs.index];
			Mgr.open(tab.path);
		}
		else {
			if (index < userCfg.tabs.index)
				userCfg.tabs.index--;
			this.open();
		}
		Mgr.delEnvironment(del[0].path);
		saveUserCfg();

		e.native.stopPropagation();
	}
	newTab() {
		console.log("new tab")
	}
	open() {
		this.props.tabs = userCfg.tabs;
		this.paint();
	}
	zoomChange() {
		this.props.zoom = userCfg.zoom;
		this.paint();
	}
}

//修改分辨率
const changeReso = () => {
	temp.props.curReso = userCfg.resolution.cfg[userCfg.resolution.curr];
	temp.paint();
	Mgr.notify("resoChange");
}
//切换到数据面板 => 双击操作
export const dataTab = () => {
	temp.props.datatab = 1;
	temp.paint();
}



