import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { Widget } from "pi/widget/widget";
import { notice_base } from "cfg/a/notice_base";
import { notice_detail } from "cfg/a/notice_detail";



export const forelet = new Forelet();
let index,//tab的index
    keys = Object.keys(notice_base);//tab的keys

export const globalReceive: any = {
    openNotice:()=>{
        index = Object.keys(notice_base)[0];
        forelet.paint(getData());   
        open("app_a-notice-notice"); 
    }
}
export class notice extends Widget {
    //选择tab
    selectTab = (arg)=>{
        if(index == arg){
            return;
        }
        index = arg;
        forelet.paint(getData());   
    }
}
//更新的数据
let data:any = {
    "base":notice_base
};

let getData = ()=>{
    data.index = index;
    let curr = notice_base[index];
    data.detail = notice_detail[curr.type].slice(0).reverse().slice(0,curr.num);
    return data;
}