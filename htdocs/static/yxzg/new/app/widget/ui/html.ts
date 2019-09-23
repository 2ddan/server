
import { Widget } from '../../../pi/gui_virtual/widget';

export class multi_text extends Widget {
    public create() {
        this.props = {
            tag: (<any>self)._gui ? "pi-gui_ui-html" : "pi-ui-html"
        }
        super.create();
    }
    public setProps(prop: any) {
        super.setProps(prop);

        this.props = this.props || {};
        if ((<any>self)._gui) {
            this.props = {};
            this.props.props = {};
            this.props.props.innerhtml = parseHTML(prop);
            this.props.tag = "pi-gui_ui-html"; 
        } else {
            this.props = {};
            this.props.tag = "pi-ui-html";
            this.props.props = prop;
        }
        // debugger
    }
}

// const demoprop: Prop =  {
//     innerhtml: [
//         {
//             dType: 'text',
//             text: '逋',
//             color: '#fff000',
//             'font-size': '20px',
//             'font-weight': '600'
//         },
//         {
//             dType: 'text',
//             text: '逋逋逋',
//             color: '#0ff000',
//             'font-size': '16px',
//             'font-weight': '600',
//             'background-color': '#0f0fa0',
//             'on-tap': 'click("ssss")'
//         },
//         {
//             dType: 'text',
//             text: '逋逋逋逋逋逋',
//             color: '#0ffff0',
//             'font-size': '16px',
//             'font-weight': '600',
//             'background-color': '#0f0fa0'
//         },
//         {
//             dType: 'img',
//             src: '../images/01.png',
//             color: '#0ff000',
//             width: '40px',
//             height: '40px'
//         }
//     ]
// };

// 玩家<a style="color:#81cbff">赏语</a><a style="color:#fa4e4e">VIP1</a>在大宴铜雀台招募到武将<a style="color:#F0882C">魏延</a>。
const tagReg = /(\<\w+?\s?.*?\>)(\S+?)(\<\/\w+?\>)/;
const parseHTML = (str: string) => {
    const arr = [];
    let count = 0; // 防止死循环
    while (str.length && count < 100) {
        count++;
        str = str.trim();
        const index = str.indexOf("<");
        if (index === -1) {
            arr.push({
                dType: "text",
                text: str
            });
            str = ""
        } else if (index === 0) {
            str = str.replace(tagReg, ($0, $1, $2) => {
                const o = {
                    dType: "text",
                    text: $2
                }
                parseAttrs($1, o);
                arr.push(o);
                return ""
            });
        } else {
            arr.push({
                dType: "text",
                text: str.substr(0, index)
            });

            str = str.substr(index);

        }
    }
    if (count === 100) {
        alert("匹配失败");
        return [];
    }
    return arr;
}

const styleReg = /style\=["'].*?["']/;
const tapReg = /(on\-tap\=["'])(.*?)(["'])/;
const styles = ['color', 'font-size', 'font-family', 'font-weight', 'line-height', 'text-indent'];
const parseAttrs = (str: string, obj: any) => {
    if (styleReg.test(str)) {
        const styleStr = str.match(styleReg)[0];
        const arr = styleStr.substr(7, styleStr.length - 8).split(";");
        arr.forEach(v => {
            if (v && v.trim()) {
                const _t = v.split(":");
                const k = _t[0].trim();
                if (styles.findIndex(v => v === k) !== -1) {
                    obj[k] = _t[1].trim();
                }
            }
        })
    }

    if (tapReg.test(str)) {
        str.replace(tapReg, ($0, $1, $2) => {
            obj["on-tap"] = $2;
            return ""
        })
    }
}