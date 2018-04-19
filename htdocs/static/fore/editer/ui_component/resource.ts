import { userCfg } from "../user_cfg";

// ============================== 导入
import { Widget } from "../../pi/widget/widget";
import { Json } from '../../pi/lang/type';

let temp,
    selectWidget,
    isSearch = false,
    searchProps,
    props;
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class ShowRes extends Widget {
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    setProps(props: Json, oldProps?: Json): void {
        this.props = {};
        this.props.tree = getFileList();
        searchProps = this.props.tree;
        this.props.arr = [];
        temp = this;
    }
    searchRes(e) {
        if (searchProps && e.target.value) {
            isSearch = true;
            let reg = new RegExp(e.target.value.replace(/\*/g, "."), "i");
            this.props.tree = getSearchList(searchProps, reg);
            this.props.arr = getSS(this.props.tree);
            this.paint();
        }
        else if (!e.target.value) {
            isSearch = false;
            this.props.tree = getFileList();
            this.props.arr = [];
            this.paint();
        }
    }
}
/**
 * 切换目录选中和打开
 * @param widget 
 */
export const switchSelect = (widget) => {
    if (selectWidget) {
        selectWidget.props.select = false;
        selectWidget.paint();
    }
    selectWidget = widget;
    if (!isSearch) {
        searchProps = JSON.parse(JSON.stringify(widget.props));
    }
    selectWidget.props.open = !selectWidget.props.open;
    selectWidget.props.select = true;
    selectWidget.paint();
}
/**
 * 预览显示的内容
 * @param fileList 
 */
export const selectFile = (fileList) => {
    let tagNames = { "mp3": "audio", "jpg": "img", "png": "img", "gif": "img" }
    let arr = [];
    let getArr = (fl) => {
        if (fl.type && fl.type !== "folder") arr.push({ name: fl.name, path: fl.path, tagName: tagNames[fl.type] })
        for (let i in fl.children) {
            let v = fl.children[i];
            if (v.type == "folder") {
                getArr(fl.children);
            }
            else {
                arr.push({ name: v.name, path: v.path, tagName: tagNames[v.type] })
            }
        }
        return arr;
    }
    temp.props.arr = getArr(fileList);
    temp.paint();
}
//==============================================本地
const getFileList = () => {
    let fileList: any = []
    for (let i = 0; i < userCfg.resPath.length; i++) {
        let dir = userCfg.resPath[i];
        let dp = (window as any).pi_modules.depend.exports.get(dir);
        fileList.push({ name: dp.path, type: "folder", path: dp.path, stack: 1, select: false, open: false, children: [] });

        getList(dp.children, fileList[i].children, 2)
    }
    return fileList;
}


let fileReg = /(mp3)|(jpg)|(png)|(gif)|(svg)/;
const getList = (depend, list: Array<any>, stack) => {
    for (let k in depend) {
        let v = k.split(".");

        if (k[k.length - 1] === "/") {
            v[0] = v[0].slice(0, v[0].length - 1);
            list.push({ name: v[0], type: "folder", path: depend[k].path, stack: stack, select: false, open: false, children: [] })
            getList(depend[k].children, list[list.length - 1].children, stack + 1);
        }
        else if (fileReg.test(v[1])) {
            list.push({ name: v[0], type: v[1], path: depend[k].path, stack: stack, select: false })
        }
    }
    list.reverse();
}

//筛选搜索内容
const getSearchList = (file, reg) => {
    let arr = [];
    if (file.type && file.type !== "folder" && reg.test(file.name)) arr.push(file);
    let children = file.constructor === Array ? file : file.children;
    if (children && children.length) {
        for (let k of children) {
            arr = arr.concat(getSearchList(k, reg));
        }
    }
    return arr;
}
//筛选结果显示内容
const getSS = (fileList) => {
    let tagNames = { "mp3": "audio", "jpg": "img", "png": "img", "gif": "img" };
    let arr = [];
    for (let k of fileList) {
        arr.push({ name: k.name, path: k.path, tagName: tagNames[k.type] })
    }
    return arr;
}