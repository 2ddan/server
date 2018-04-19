// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';
import * as Mgr from '../mgr/widget_mgr';

// ============================== 导出
export let sheets: Map<string, Map<string, string>>;//所有的rcss
/**
 * @description 导出组件Widget类
 * @example
 */
export class cssSheet extends Widget {
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.props = {};
        this.props.sheets = sheets || [];
    }
    addClass(className) {
        Mgr.notify("addclassChange", className)
    }

}

let classReg = /\.[_a-zA-Z]+[0-9a-zA-Z]*/,
    ruleOut = /[\:\=\[\>\=\~\+\*]/;
/**
 * 获取所有需要显示的rcss 动画
 */
export const getSheets = () => {
    let sheetsMap = new Map();
    let arr = document.styleSheets;
    for (let sheet, rules, i = arr.length - 1; i >= 0; i--) {
        sheet = arr[i];
        rules = sheet && sheet.cssRules;
        if (!rules || !rules[0] || rules[0].selectorText !== "rule_in_sheet") continue;
        for (let rule, j = 1, rLen = rules.length; j < rLen; j++) {
            rule = rules[j];
            if (!rule.selectorText) continue;
            let keys = rule.selectorText.split(",");

            let styles = rule.style;
            for (let k = 0; k < keys.length; k++) {
                if (ruleOut.test(keys[k]) || !classReg.test(keys[k])) continue;
                let styleMap = new Map();
                for (let l = 0, len = rule.style.length; l < len; l++) {
                    styleMap.set(styles[l], styles[styles[l]]);
                }
                sheetsMap.set(keys[k].slice(1), styleMap);
            }
        }
    }
    sheets = sheetsMap;
}