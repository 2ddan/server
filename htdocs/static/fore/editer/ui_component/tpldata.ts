
// ============================== 导入
import { Widget, getCache } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import * as Editer from '../util/editer';
import { findBySid, findByType } from '../util/syntax_op';
import { toStr } from '../util/restore';
import * as Mgr from '../mgr/widget_mgr';
import { Syntax } from "../../pi/compile/parser";


// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class TplData extends Widget {
	defaultIt: Json //默认it
	ssid: number
	create() {
		Mgr.register(this);
	}
	setProps(prop: Json): void {
		this.props = {};
		let sids = Mgr.environment.select.getSelectSids();
		if (sids.length) {
			//默认配置
			let tagName = getCurrTag();
			if (tagName) {
				tagName = tagName.split(" ")[0]
				let cfg = getCache(tagName.replace(/\-/g, "/") + ".cfg");
				this.props.defaultIt = getIt(tagName, cfg);
				this.props.it1 = getIt1(tagName, cfg);
				this.props.it1Parse = parseObj(this.props.it1, "")
			}
			//内容
			if (sids[0]) {
				this.ssid = sids[0];
				let sy = findBySid(sids[0], Mgr.environment.select.getSelectSts()[0]);
				this.props.content = null;
				this.props.it = null;
				if (sy.type == "imgtag") {
					//图片
				}
				else if (sy.right[0] && sy.type == "tag" && (sy.right[0].value === "widget" || sy.right[0].value.indexOf("-") !== -1 || sy.right[0].value.indexOf("$") !== -1) && sids[0] !== 2) {
					//组件
					this.props.it = parseProps(findByType("body", sy));
				}
				else if (sy.right[0] && sy.right[0].value === "span") {
					let body = findByType("body", sy);
					this.props.content = toStr(body);
				}
			}
			//更新方法
			this.props.updataConten = this.updataConten;
			this.props.updataProps = this.updataProps;
			this.props.updataState = this.updataState;
		}
	}
	changeValue(e, key) {
		this.props.updataProps(key, e.target.value)
	}
	updataProps = (key: string, value: any) => {
		let prop = deepCopy(this.props.it || this.props.defaultIt);
		try {
			prop[key] = JSON.parse(value)
		} catch (error) {
			prop[key] = value;
			console.log(error, value)
		}
		prop.params && delete (prop.params);
		Editer.modifyBody(this.ssid, jsonToString(prop));
	}
	updataConten = (content: string) => {
		Editer.modifyBody(this.ssid, content);
	}
	addText = (content) => {
		Editer.modifyBody(this.ssid, content);
	}
	updataState = (value, key, valueType) => {
		switch (valueType) {
			case "number":
				value = Number(value);
				break;
			case "boolean":
				value = Boolean(value);
				break;
		}
		let keys = key.split(".");
		let objParent = this.props.it1;
		console.log(it1Map, itMap)
		while (keys.length > 1) {
			objParent = objParent[keys[0]];
			keys.shift();
		}
		objParent[keys[0]] = value;

		Mgr.notify("stateChange", this.props.it1)
	}
	selectChange() {
		this.setProps({})
		this.paint()
	}
	nodeChange() {
		this.setProps({})
		this.paint();
	}
	attrChange() {
		this.setProps({})
		this.paint()
	}

}
// 保存修改的it1，刷新后重置
const it1Map: Map<string, any> = new Map();
const itMap: Map<string, any> = new Map();

//获取当前选中的组件名
const getCurrTag = () => {
	let elem = Mgr.environment.select.getSelectEs()[0];
	if (elem) {
		return elem.getAttribute("w-tag");
	}
}

// 解析语法树中的props
const parseProps = (sy: Syntax) => {
	if (!sy.right || sy.right.length === 0) return null;
	let propSy = findByType("jobj", sy);
	if (propSy) {
		let props = {};
		for (let i = 0, o, key, value; i < propSy.right.length; i++) {
			o = propSy.right[i];
			key = getStr(o.right[0]);
			value = getStr(o.right[1]);
			if (o.right[1])
				props[key] = value;
		}
		return props;
	}
	else {
		return toStr(sy)
	}
}

const getStr = (sy: Syntax) => {
	let str = toStr(sy);
	if (sy.type == "jstr" || sy.type == "jscript") {
		str = str.substring(1, str.length - 1);
	}
	else if (sy.type === "number" || sy.type === "bool" || sy.type === "null") {
		str = JSON.parse(str);
	}
	return str
}

const jsonToString = (json) => {
	let str = "";
	let t = typeof json;
	if (t === "string") {
		if (json[0] === "[" || json[0] === "{")
			return json
		return `"${json}"`
	}
	else if (t === "boolean" || t === "number" || json === null || t === "undefined")
		return json
	else if (Array.isArray(json)) {
		str += "["
		for (let i = 0; i < json.length; i++) {
			str += jsonToString(json[i]) + (i === json.length - 1 ? "" : ",");
		}
		return str + "]"
	}
	// Object
	else if (t === "object") {
		str += "{";
		let keys = Object.keys(json);
		for (let i = 0, v; i < keys.length; i++) {
			v = jsonToString(json[keys[i]])
			if (v !== undefined)
				str += `"${keys[i]}":${v}${i === keys.length - 1 ? "" : ","}`;
		}
		return str + "}"
	}
}

// 获取it1
const getIt1 = (tagName: string, cfg: any) => {
	let it1 = it1Map.get(tagName)
	if (it1) return it1;
	if (cfg && cfg.value && cfg.value.it1) {
		let it1Copy = JSON.parse(JSON.stringify(cfg.value.it1))
		it1Map.set(tagName, it1Copy);
		return it1Copy
	}
}
// 获取it
const getIt = (tagName: string, cfg: any) => {
	let it = itMap.get(tagName)
	if (it) return it;
	if (cfg && cfg.value && cfg.value.it) {
		let itCopy = JSON.parse(JSON.stringify(cfg.value.it))
		itMap.set(tagName, itCopy);
		return itCopy
	}
}
// 获取obj的值
const parseObj = (obj: Json, updataKey) => {
	let t = typeof obj
	if (t === "number" || t === "boolean" || t === "string")
		return obj
	else if (t === "object") {
		let arr = [];
		for (let i in obj) {
			let upKey = updataKey + "." + i;
			let child = parseObj(obj[i], upKey);
			if (Array.isArray(child))
				arr.push({ key: i, arr: child, updataKey: upKey })
			else
				arr.push({ key: i, value: child, updataKey: upKey })
		}
		return arr
	}
}

const deepCopy = (obj) => {
	let type = typeof obj;
	if (type === "number" || type === "string" || type === "boolean" || type === "undefined" || obj === null) {
		return obj;
	}
	// Array
	else if (Array.isArray(obj)) {
		let arr = [];
		for (let o of obj) {
			arr.push(deepCopy(o))
		}
		return arr
	}
	// Object
	else if (type === "object") {
		let o = {}
		for (let i in obj) {
			o[i] = deepCopy(obj[i])
		}
		return o
	}
}