//pi
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
//mod
import { open, close } from "app/mod/root";
//app
import { net_request, net_send, net_message } from "app_a/connect/main";
import { Pi, globalSend } from "app/mod/pi";

//===============================================导出
/**
 * @description 导出forelet
 */
export const forelet = new Forelet();
/**
 * @description 导出组件
 */
export class Pop extends Widget {
    /**
     * @description 倒计时回调,直接调用确认
     * @param 
     */
    timeEnd(){
        popData.timeEnd = true;
        (this as any).ok();
    }
    /**
     * @description 修改提示状态，是否下次需要提示
     * @param 
     */
    status(){
        popData.remind = !popData.remind;
        popData.status();
        this.setProps(popData);
        this.paint();
    }
    limit_coin(coin){
        let text = coin=="diamond"?"元宝":coin=="money"?"银两":Pi.sample[coin].name;
        globalSend("screenTipFun",{words:`您的${text}不足！`})            
    }
}


export const globalReceive: any = {
    /**
     * @description 打开pop提示框,有status回调函数，则显示勾选框
     * @param {Json}msg {btn_name:["确定","取消"],cb:[function,function],status:function,title:String}
     */
    popTip: (msg) => {
        popData = msg;
        open("app_b-tips-pop-pop",msg,()=>{
            popBack(0);
        },()=>{
            popBack(1);
        });
        return true;
    },
    "popBack": () => {
        let w = forelet.getWidget("app_b-tips-pop-pop");
        if(w){
            w.cancel &&  w.cancel();
        }
            
    }
}


// ====================================== 本地
/**
 * @description pop提示框数据
 * {btn_name:["确定","取消"],cb:[function,function],title:String,status?:function}
 */
let PopData:any = {btn_name:["确定","取消"],cb:[()=>{},()=>{}],status:()=>{},title:""};
let popData:any;
/**
 * @description 执行提示回调
 * @param {Number}type 0(确认) || 1(取消)
 */
const popBack = (type) => {
    popData.cb && popData.cb[type] && popData.cb[type](popData.timeEnd);
    popData = null;
};
/**
 * @description 初始化pop提示框数据
 * @param {popData}data 
 */
const initPopData = (data) =>{
    for(let k in PopData){
        if(!data[k] && k !== "status")
            data[k] = PopData[k];
    }
    return data;
};

// ====================================== 立即执行

