import { Widget } from "pi/widget/widget";
import { Json } from 'pi/lang/type';
import {set as task} from 'pi/util/task_mgr';
import { notify } from "pi/widget/event";



// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */
export class NumScroll extends Widget {
    id = wid++
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example props {Json} {oldPower:112,newPower:9089,delay:500}
	 */
    setProps(props: Json, oldProps?: Json): void {
        // console.log("=================setProps");
        this.props = props;
        that = this;
        state = "";
        // state = "running";
        //TODO
        //处理props，判断新旧值的差
        countOldAndNew(this);
        // console.log(table);
        //{
        //  diff:[[2,3,3,4],[0,4,3,3]]
        //  w:this,
        //  delTime:0,
        //  delay:Date.now()+(props.delay || 500),
        //  same:0
        //}   
        //table[this.id] = 

        //开始执行动画
        // console.log(state);
        if(!state)render();
        //setTimeout(render, 0);
    }
    /**
	 * @description 销毁时调用，一般在渲染循环外调用
	 * @example
	 */
	destroy(): boolean {
        // console.log("num_scroll destoried================");
        let r = super.destroy();
		//清除table
        table[this.id] && delete table[this.id];
        return r;
	}
}

// ================================ 本地
let wid = 0;
let that;
//存储widget,在动画完成之后删除，在widget销毁时删除
//{}
/**
 * {
 *  widget_id : setProps => return
 * }
 */
let table = {};
//状态
let state = "";
//运行
const render = () => {
    //循环table表，执行动画，如果动画执行完，则在表中清除
    //如果table中所有动画执行完，则暂停render,清除state = "";
    //TODO..
    //循环
    // console.log("render in=================");
    state = "running";
    if(runWidgets()){
        // console.log("=====================render out");
        setTimeout(render,50);
    }else {
        // console.log("set state '' = =========================")
        state == "";
    }
    
}

// 返回新旧值数组

const countOldAndNew = (obj) => {
    // console.log(obj.props);
    var arr = [],
        oldNumSplit = String(obj.props.oldPower).split(""),
        newNumSplit = String(obj.props.newPower).split(""),
        _length = Math.abs(String(obj.props.newPower).length - String(obj.props.oldPower).length),
        newObj = {},
        _id = String(obj.id);
        
    if (Number(obj.props.oldPower) < Number(obj.props.newPower)) {
        for (let i = 0; i < _length; i++) {
            oldNumSplit.unshift("0");
        }
    } else if  (Number(obj.props.oldPower) > Number(obj.props.newPower)) {
        for (let i = 0; i < _length; i++) {
            newNumSplit.unshift("0");
        }
    }
    // widget还没有创建
    if (Object.keys(table).length == 0) {
        // console.log("num_scroll widget isn't create=============================");
        arr.push(oldNumSplit);
        arr.push(newNumSplit);
        newObj["diff"] = arr;
        newObj["w"] = obj;
        newObj["delTime"] = 0;
        newObj["delay"] = Date.now() + (obj.props.delay || 500);
        newObj["same"] = 0;
        table = {[_id]:newObj};
    } else {
        for (let k in table) {
            // console.log("++++++++++++++++++");
            // console.log(table[k]);
            table[k].delTime = 0;
            table[k].delay = Date.now() + (obj.props.delay || 500);
            table[k].same = 0;
            table[k].diff[1] = newNumSplit;
        }
    }
}

//循环每个动画
const runWidgets = () => {
    // console.log("runWidgets=============================");
    let count = 0;
    for(let k in table){
        // console.log(table[k]);
        //未过延迟时间，则跳过
        if(table[k].delay > Date.now()){
            count += 1;
            continue;
        }
        //设置删除时间
        if (table[k].same){
            table[k].delTime = Date.now()+670;
        //数字变化，删除时间归零
        }else if (!table[k].same && table[k].delTime){
            table[k].delTime = 0;
        }
        //数字变化
        if (!table[k].same){
            // console.log("use numChange===================");
            numChange(table[k]);
        }
        //删除
        if(table[k].delTime >= Date.now()){
            // console.log("destoring======================");
            // state = "";
            let d = table[k];
            delete table[k];
            task(notify, [that.tree, "ev-anim_complete"], 9000, 1);
            that = null;
            
        }else count += 1;
        
    }
    return count;
};

// 数字变化处理
const numChange = (obj) => {
    let _old = obj.diff[0],
        _new = obj.diff[1],
        _is = 0;
    for (let j = 0; j < _old.length; j++) {
        if (_old[j] != _new[j]) {
            let _dif = Number(_new[j]) - Number(_old[j]);
            _old[j] = String(Number(_old[j]) + (_dif/Math.abs(_dif)));
            _is+=1;
        }
    }
    obj.same = _is?0:1;
    obj.w.props.num = _old.join("");
    // obj.w.setProps(_old.join(""));
    obj.w.paint();     
}