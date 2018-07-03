import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open} from "app/mod/root";
import {  Pi } from "app/mod/pi";
import {  get as getDB} from "app/mod/db";


export const forelet = new Forelet();
let  buy_data:any = {};

//页面操作
export class changeNum extends Widget {
    //改变次数,和花费
    add (arg) {
        buy_data.num += arg;
        let arr = buy_data.costCoin(buy_data.num);
        for(var key in arr){
            buy_data[key] = arr[key];//本次次数,  奖励/花费
        }
        forelet.paint(buy_data);
    }
    // buy (arg) {
    //     buy_data.callBack(buy_data.num);
    //     close(arg.widget);
    // }
    
}
//外部打开此页面
export let globalReceive = {
    "gotoBuy": (msg) => {
        buy_data =  msg;
        buy_data.Pi = Pi;
        buy_data.player = getDB("player");
        forelet.paint(buy_data);
        open("app_b-prop_d-buy-buy",msg,()=>{
            msg.callBack(buy_data.num)
        },()=>{
           
        });
    }
    
}
