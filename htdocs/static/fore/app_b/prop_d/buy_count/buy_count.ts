import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { get } from "app/mod/db";


export const forelet = new Forelet();
let  buy_data:any = {};

//页面操作
export class changeNum extends Widget {
    //改变次数,和花费
    add (arg) {
        // buy_data.num += arg;
        // let arr = buy_data.costCoin(buy_data.num);
        // for(var key in arr){
        //     buy_data[key] = arr[key];//本次次数,  奖励/花费
        // }
        buy_data.buy_count += arg;
        if (buy_data.buy_count > buy_data.max_buy - buy_data.already_buy){
            buy_data.buy_count = buy_data.max_buy - buy_data.already_buy;
        }
        if (buy_data.buy_count <= 0) {
            buy_data.buy_count = 1;
        }
        let len = buy_data.price.length;
        let cost = 0;
        let hasMoney = get("player."+buy_data.coin);
        //计算总价
        for (var i = buy_data.already_buy; i < (buy_data.buy_count - 0 + buy_data.already_buy); i++) {
            let before_cost = cost;
            if (buy_data.price[i]){
                cost += buy_data.price[i];
            }else{
                cost += buy_data.price[len - 1];
            }
            if (cost > hasMoney) {
                buy_data.buy_count = i - buy_data.already_buy;
                cost = before_cost;
                break;
            }
        }
        buy_data.cost = cost;
        forelet.paint(buy_data);
    }
    
}
//外部打开此页面
/*pram
**{
    "title": "购买次数",
    "type": "竞技场",
    "coin": "diamond",
    "btn_name": "购 买",
    "price": arena_base.buycount_cost,
    "max_buy": undefined,
    "already_buy": num,
    "has_count":  vip_advantage[vip].jjc_free_times + num - use,
    "buy_count": 1,//购买数量初始值默认为1
    "callBack": callBack
  }
*/
export let globalReceive = {
    "gotoBuyCount": (msg) => {
        buy_data =  msg;
        buy_data.cost = buy_data.price[buy_data.already_buy] || buy_data.price[buy_data.price.length - 1];
        forelet.paint(buy_data);
        open("app_b-prop_d-buy_count-buy_count",msg,()=>{
            msg.callBack(buy_data.buy_count)
        },()=>{
           
        });
    }
    
}
