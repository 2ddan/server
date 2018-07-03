//导入模块
import { Forelet } from "pi/widget/forelet";
import {  get,  listen } from "app/mod/db";

import { player_exp } from "cfg/b/player_exp";

export const forelet = new Forelet();

let anima = false,
    timer = null,//帧动画timer
    show_state = null,
    show_arr = [],
    level = 0,
    exp = 0,
    add = 0,
    progress = 0,//真实进度条百分比
    bar_timer = null;//进度条增长timer
export let globalReceive = {
    showExp: (arr) => {
        let i = 0;
        let exp = arr[0]/arr[1];
        while(i<arr[1]){
            show_arr.push(exp);
            i++;
        }
        //进度条飘字自调结束开始新的自调
        if(!show_state){
            exp_show();
        }
    },
    enterLevel:(player)=>{
        level = player.level;
        exp = player.exp;
        progress = Math.floor(exp/player_exp[level].exp*100);
        forelet.paint(getData());
    }
}

//飘字动画
let exp_show = ()=>{
    if(show_arr.length){
        show_state = 1;
        add = show_arr.shift();
        exp += add;
        let need = player_exp[level].exp;
        if(exp >= need){
            level++;
            exp -= need;
        }
        handleExp(Math.floor(add));
        progress = Math.floor(exp/player_exp[level].exp*100);
        //进度条动画
        if(!anima){
            anima = true;
        }
        if(timer){
            timer = null;
        }
        timer = setTimeout(()=>{
            anima = false;
            forelet.paint(getData());
            clearTimeout(timer);
            timer = null;
        },1000)

        forelet.paint(getData());

        //继续播放+exp
        let show_timer = setTimeout(()=>{
            clearTimeout(show_timer);
            show_timer = null;
            exp_show();
        },300)
    }else{
        show_state = 0;
    }
}

//数据
let getData = ()=>{
    let data:any = {};
    data.anima = anima;
    data.level = level;
    data.progress = progress;
    data.exp = exp;
    data.add = add;
    return data;
}


//监听等级
listen("player", () => {
    let player = get("player");
});



let handleExp = (num)=>{
    let divRoot = document.getElementById("tips");
    if (!divRoot) return;
    let divNode = document.createElement("div");
    let style = `width:100%;animation:barTip 1s forwards;position:absolute;top:100px;right:0px;z-index:2;`;
    divNode.setAttribute("style", style);
    divNode.innerHTML = `+${num}Exp`;
    divRoot.appendChild(divNode);
    let timer = setTimeout(function () {
        divRoot.removeChild(divNode);
        clearTimeout(timer);
        timer = null;
    }, 1000);
}
