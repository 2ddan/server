//pi
import { Forelet } from "pi/widget/forelet";
import { open } from "pi/ui/root";
import { get as getDB} from "app/mod/db";
import{ checkTypeof } from "app/mod/db";
import { Pi} from "app/mod/pi";
import { Common } from "app/mod/common";

import { tips_back } from "../tips_back_cfg";

//===============================================导出
export const forelet = new Forelet();

export const globalReceive: any = {
    screenTipFun: (msg) => {//err
    // screenTip: (msg) => {
        let text = tips_back[msg.words];

        text && (msg.words = text);
        // err.push(msg);
        // if (msg.role || msg.team) {
        //     //tipsFun.showFightTip(msg);
        //     //forelet.send("fightTipFun",msg,"fightTip");
        //     return;
        // } else if (msg.words && msg.words.indexOf("玩家等级") >= 0) {
        //     msg.words = msg.words.replace("玩家等级", "");
        //     //roleLevelUp(msg);
        //     //forelet.send("roleLevelUp",msg,"roleLevelUp");
        //     return;
        // }

        let timer = setTimeout(function () {
            tipsFun.errTip(msg);
            clearTimeout(timer);
            timer = null;
        }, 0)
    },
    goodsTip: (msg) => {
        let id = msg.words[0];
        if(!id){return;}
        let prop = Pi.sample[id];
        if(prop.type == "equip" && msg.words[1] > 1){
            let i = 0;
            while(i<msg.words[1]){
                // goods.push({"words":[id,1]});
                let timer = setTimeout(function () {
                    tipsFun.goodsTip({"words":[id,1],timeOut:msg.timeOut || 0});
                    clearTimeout(timer);
                    timer = null;
                }, 0);
                i++;
            }
            return;
        }

        // goods.push(msg);
        let timer = setTimeout(function () {
            tipsFun.goodsTip(msg);
            clearTimeout(timer);
            timer = null;
        }, 0)
    },
    attrTip: (msg) => {
        // attr.push(msg);
        let timer = setTimeout(function () {
            tipsFun.attrTip(msg);
            clearTimeout(timer);
            timer = null;
        }, 0)
    },
    barTip: (msg)=>{//msg = {"words":"text","left":number,"top":number}
        // bar.push(msg);
        let timer = setTimeout(function () {
            tipsFun.barTip(msg);
            clearTimeout(timer);
            timer = null;
        }, 0)
    },
    closeFastlogin:()=>{
        open("app_b-tips-screen_tip-screen_tip");
    }
}

// let err = [],
//     goods = [],
//     attr = [],
//     bar = [];

let time = 2000;

const createTipsFun = function () {
    let module: any = {};

    //错误提示
    module.errTip = function (tip) {
        let divRoot = document.getElementById("err");
        if (!divRoot) return;
        var son = document.createElement("div");
        var style = '', t;
        
        // style = "background-image:url(/dst/app_b/tips/image/err_bg.png);background-size:100% 100%;background-repeat:no-repeat;height:24px;line-height:24px;margin:0 auto;margin-bottom: 3px;padding:0 30px;display:inline-block;animation:errTip 2s forwards;opacity: 0;";
        t = time;
        son.setAttribute("class", "err_tip");
        son.innerHTML = tip.words;
        var divNode = document.createElement("div");
        divNode.appendChild(son);
        divRoot.appendChild(divNode);
        let timer = setTimeout(function () {
            divRoot.removeChild(divNode);
            clearTimeout(timer);
            timer = null;
        }, t);
    };
    //属性增加
    module.attrTip = function (tip) {
        let divRoot = document.getElementById("attr");
        if (!divRoot) return;
        var divNode = document.createElement("div");
        var style = '', t,color;
        color = tip.words.indexOf("-")>-1 ? "color:#f00;":"";
        style = `width:100%;font-size:20px;z-index:2;animation:attrTip 1s forwards;overflow:hidden;${color};position:relative`;
        t = time;

        divNode.setAttribute("style", style);
        divNode.innerHTML = tip.words;
        divRoot.appendChild(divNode);
        let timer = setTimeout(function () {
            divRoot.removeChild(divNode);
            clearTimeout(timer);
            timer = null;
        }, t);
    };
    //进度条提示文字
    module.barTip = function (msg) {
        let divRoot = document.getElementById("bar");
        if (!divRoot) return;
        var divNode = document.createElement("div");
        let style = `width:100%;font-size:20px;z-index:2;animation:barTip 0.7s forwards;position:absolute;top:${msg.top||0}px;left:${msg.left||0}px;`;
        let t = time;

        divNode.setAttribute("style", style);
        divNode.innerHTML = (msg.crt ? "暴击 " : "" )+msg.words;
        divRoot.appendChild(divNode);
        let timer = setTimeout(function () {
            divRoot.removeChild(divNode);
            clearTimeout(timer);
            timer = null;
        }, 600);
    };
    //拾取物品
    module.goodsTip = function (obj) {
        let divRoot = document.getElementById("goods");
        if (!divRoot) return;
        var divNode = document.createElement("div");
        let timeOut = obj.timeOut || 0;
       
        divNode.setAttribute("class", "goods_tip");
        divNode.innerHTML = module.category(obj.words);

        let timer = setTimeout(()=>{
            divRoot.appendChild(divNode);
            clearTimeout(timer);
            timer = null;
        },timeOut);
        
        let timer1 = setTimeout(function () {
            divRoot.removeChild(divNode);
            clearTimeout(timer1);
            timer1 = null;
        }, timeOut + time);
    };
    //物品处理
    module.category = function(arr){//arr=[id,count]
        if(arr[0]==100003){
            return `<span style="color:#46e36c">Exp +${arr[1]}</span>`
        }
        let prop = Pi.sample[arr[0]],
            quality = prop.quality || 1,
            color =  quality == 1 ? "#fff" : quality == 2 ? "#46e36c":  quality == 3 ? "#00deff" : quality == 4 ? "#e946f3" :quality == 5 ? "#ffae00" : quality == 6 ? "#eb3723" : "#fff",
            player = getDB("player"),
            career_id = player.career_id,
            name = checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(career_id)] : prop.name;
       
        return `<span style="color:${color}">${name}&nbsp;X${Common.numberCarry(parseInt(arr[1] || 0),10000)}</span>`
    }
    return module;
};

let tipsFun = createTipsFun();
