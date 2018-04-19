//==========================================导入
//pi
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";

//mod
import { data as db, updata, get, insert, listen } from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";
import { Util } from "app/mod/util";
import { open, close } from "app/mod/root";


// ================================ 导出
export const forelet = new Forelet();

export class wild extends Widget {
   
}


let _data:any = {
    "text":0,//现实的数字
    "close":0//关闭
} ;
let max_percent = 0;//最终超越玩家百分比数字
/**
 * 全局广播
 */
export const globalReceive: any = {
  
    wildBossExit:(arr) => {
        let num = arr[1]/arr[0]-1;
        let msg = Math.floor( (0.99- Math.pow(num<0?0:num,2.2) )*100);
        max_percent = msg > 99 ? 99 : msg < 25 ? 25 : msg;
        _data.text = 0;
        _data.close = 0;
        let w = forelet.getWidget("app_b-wild-overstep-overstep");
        if(!w){
            forelet.paint(_data);
            open("app_b-wild-overstep-overstep");
            updatePercent();
        }
    }
}
//更新百分比数字变化
const updatePercent = function(){
    let timer = setInterval(()=>{
        _data.text += 1;
        if(_data.text >　max_percent){
            _data.text = max_percent;

            let tim = setTimeout(()=>{//开放消失动画
                _data.close = 1;
                forelet.paint(_data);
                clearInterval(tim);
                tim = null;
            },1100);

            let tim_1 = setTimeout(()=>{//关闭组件
                let w = forelet.getWidget("app_b-wild-overstep-overstep");
                w && close(w);
                clearInterval(tim_1);
                tim_1 = null;
            },1800);

            clearInterval(timer);
            timer = null;
        }
        forelet.paint(_data);
    },10)
}