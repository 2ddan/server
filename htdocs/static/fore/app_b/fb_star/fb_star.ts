import { Util } from "app/mod/util";
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { globalSend, Pi } from "app/mod/pi";



export const forelet = new Forelet();
let timer = null,
    data:any = { };


export let globalReceive = {
    "fbStar": (msg) => {
       if(msg){
            data.startTime = Util.serverTime(true);
            data.str = "00:00";
            forelet.paint(data);
            timer = setInterval(function(){
                let t = Math.floor(Util.serverTime(true) - data.startTime);
                let s = t%60;
                s<10 && (s = "0" + s);
            
                let m = Math.floor(t/60);
                m<10 && (m = "0" + m);
                m += ":";
            
                let h = Math.floor(t/3600);
                h = (h?( h<10 && (h = "0" + h) ) :"");
                h && (h+=":");
                data.str =  h+m+s;
                forelet.paint(data);
            },1000);
            return;
       }
       clearInterval(timer);
       timer = null;
    }
}