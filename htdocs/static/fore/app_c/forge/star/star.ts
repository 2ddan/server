import * as piSample from "app/mod/sample";
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { Common } from "app/mod/common";
import { close,open } from "app/mod/root";
import { updata, get as getDB, listen } from "app/mod/db";
import { Pi,cfg, globalSend,findGlobalReceive } from "app/mod/pi";
import { equip_star_promote } from "cfg/c/equip_star_promote_fore";
import { Common_m } from "app_b/mod/common";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { attribute_config } from "cfg/c/attribute_config";
import { getRealNode } from "pi/widget/painter";
import { findNodeByAttr } from "pi/widget/virtual_node";
import { StarAchievement } from "cfg/c/equip_star_achievement";
import { equip_star_achieve } from "cfg/c/equip_star_achieve";
import { Music } from "app/mod/music";
import { mgr } from "app/scene/scene";
//fight
import { role_base } from "fight/b/common/role_base";

import { openUiEffect, effectcallback, updateUiEffect, destoryUiEffect } from "app/scene/anim/scene";


export const forelet = new Forelet();

export const globalReceive = {
    "gotoForge": () => {
        index = getIndex();
    }
}


//装备部位默认已穿戴的第一个装备，都没有则武器
const getIndex = () =>{
    let eq = getDB("friend_battle.equip_set");
    for(var i = 0,len = eq.length;i<len;i++){
        if(eq[i]){
            return i-0+1;
        }
    }
    return 1;
}
let index = 1,//装备部位默认武器
    x_index = 1,//星宿序号
    x_x_index = 1,//星星序号
    allstar = 0,
    starGrade = [0,0,0,0,0,0,0,0,0,0],//装备部位等级
    paintNumeral = 0,//页面渲染次数(只在第一次渲染变化)
    soul = 0,//星宿点数
    leftX = 0,//偏移量
    starFlog = true,//防止连续点击升星
    isOkStar = false,//升星成功标识
    lastStar = 1;
    let star_ = 0;
    let $star_ = 0;//加成百分比
    let soltIndex = 0;
    let achieve_index = 1;
    let effid;
    let node : any= {};
/**
 * @description 获取页面数据
 */
const getStarHtmlData=function(){
    var _data:any = {};
    _data.index = index;//装备部位默认武器
    _data.getStar = getStar();
    _data.starGrade = starGrade[index-1]?starGrade[index-1]:getDB("friend_battle.equip_star")[index-1];//装备部位等级
    _data.attriCfg = attribute_config; //装备部位属性
    _data.star = equip_star_promote[index];//装备部位等级表
    _data.starsIndex = x_index,//星宿序号
    _data.stars_index = x_x_index,//星星序号
    _data.stars = StarAchievement;//星宿表
    _data.soul = soul;//星宿点数
    _data.leftX = leftX;
    _data.starFlog = starFlog;
    _data.soltIndex = soltIndex;
    _data.isOkStar = isOkStar;//升星成功标识
    _data.role_base = role_base;
    _data.achieve_index = achieve_index;
    _data.stars_achieve = equip_star_achieve;
    _data.allstar = allstar;
    return _data;
}

//升星接口
const star = () => {
    if(!starFlog) return;
    net_request({"param":{"index":index-0},"type":"app/prop/equip@star_up"}, function (data) {
        if (data.error) {
            console.log(data.why);
            return;
        }
        starFlog = false;
        globalSend("ui_anim",{name:"starup",time:550});
        isOkStar = true;
        let prop:any = Common.changeArrToJson(data.ok);
        //扣除花费
        Common_m.deductfrom(prop);
        //保存星级
        updata("friend_battle.equip_star."+(index-1),prop.equip_star[index-1]);
        //保存星数
        soul = getDB("friend_battle.soul") + prop.award[0][1];
        updata("friend_battle.soul", soul);
        let soul_level = star_achieve();
        updata("friend_battle.soul_level", soul_level);
        Music.skillSound("other_two");
        //属性提示
        let obj = equip_star_promote[index];
        let preAttr = obj[prop.equip_star[index-1]-1].attr;
        let nowAttr = obj[prop.equip_star[index-1]].attr;
        Object.keys(nowAttr).forEach((k) => {
            globalSend("attrTip", {
                words: `${attribute_config[k]} +${Common_m.decimalToPercent(preAttr ? (nowAttr[k] - preAttr[k]) : nowAttr[k])}`
            })
        });
        setTimeout(function(){
            isOkStar = false;
            starFlog = true;
            forelet.paint(getStarHtmlData())
        },600);

    });
}

const star_achieve = () => {
    let equip_star = getDB("friend_battle.equip_star");
    let all_star = 0;
    for(let j=0;j<equip_star.length;j++){
        all_star+=equip_star[j];
    }
    let achieve = equip_star_achieve;
    for(let i in achieve){
        if(achieve[i - 0 + 1]){
            if(all_star >= achieve[i].star && all_star < achieve[i - 0 + 1].star){
                return i - 0;
            }
        }else{
            if(all_star >= achieve[i].star){
                return i - 0;
            }
        }
    }
    return 0;
}
//星宿接口
const stars = () => {
    net_request({"param":{"index":x_x_index-0},"type":"app/prop/equip@activate_achieve"}, function (data) {
        if (data.error) {
			globalSend("screenTipFun",{words:data.why});
            console.log(data.why);
            return;
        }
        let _node: any = forelet.getWidget("app_c-forge-star-stars");
        let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
        soul-=data.ok[0][1][0][1];
        updata("friend_battle.soul_achieve",data.ok[1][1]);
        updata("friend_battle.soul",soul);
        Music.skillSound("other_two");
        //属性提示
        let attr = StarAchievement[x_index][x_x_index].attr;
        Object.keys(attr).forEach((k) => {
            globalSend("attrTip", {
                words: `${attribute_config[k]} +${Common_m.decimalToPercent(attr[k])}`
            });
        });

        // x_index = x_index + 1;
        if(x_index >= 5 && 10 > x_index && !StarAchievement[x_index][x_x_index+1]){
            list.scrollLeft = list.scrollLeft + 78;
        }
        let soul_achieve = getDB("friend_battle.soul_achieve");
        if(x_x_index%5 == 0 && x_index != soul_achieve.length){
            x_index = x_index + 1;
            soltIndex = JSON.parse(JSON.stringify(x_index));
        }
        x_x_index = x_x_index + 1;
        forelet.paint(getStarHtmlData())
    });
}
/**
 * @description 选择装备位
 */
const select = (msg) => {
    index = msg;
    forelet.paint(getStarHtmlData());
}

//选中的装备的星星
const getStar = () =>{
    let max;
    let star_ = getDB("friend_battle.equip_star")[index-1];
    let $star = equip_star_promote[index-0];
    $star_ = $star[star_].attr_ratio;
    for(let i in $star){
        max = i;
    }
    return [star_,max-0];
}


/**
 * @description 选择星宿序号
 */
const selectStars = (msg) =>{
    let index : any= enoughUp();
    x_index = msg;
    if(!index){
        x_x_index = x_index * 5 - 4;
    }else{
        x_x_index = index;
    }
    forelet.paint(getStarHtmlData());
}
// 选择可以升级的星星序号
const indexStars = (msg) => {
    let soul_achieve = getDB("friend_battle.soul_achieve")[msg - 1];
    let index = JSON.parse(JSON.stringify(x_index));
    if(index == x_index) return true;
    else return false
    // for(let j =0,lenj = soul_achieve[1].length;j<lenj;j++){
    //     if(!soul_achieve[1][j]){
    //         if(msg - 1 + 1 > 1){
    //             x_x_index = 5 * (msg - 1) + j + 1;
    //             return x_x_index;
    //         }else{
    //             x_x_index = j + 1;
    //             return x_x_index;
    //         }
    //     }
    // }
    // return;
}
/**
 * @description 选择星星序号
 */
const selectMinStars = (msg) =>{
    let soul_achieve = getDB("friend_battle.soul_achieve");
    let n = 0;
    for(let i=0,len=soul_achieve.length;i<len;i++){
        for(let j=0,len1=soul_achieve[i][1].length;j<len1;j++){
            if(soul_achieve[i][1][j]){ n++; }
        }
    }
    if(msg-1 > n){
        return
    }else{
        x_x_index = msg;
        // stars();
        forelet.paint(getStarHtmlData());
    }
}

const attrAdd = () => {
    let soul_achieve = getDB("friend_battle.soul_achieve");
    let obj:any = {};
    let n = 1;
    for(let i = 0,len = soul_achieve.length;i<len;i++){
        for(let j =0,lenj = soul_achieve[i][1].length;j<lenj;j++){
            if(soul_achieve[i][1][j]){
                Object.keys(StarAchievement[i+1][n].attr).forEach((k) => {
                    obj[k] = obj[k] ? (obj[k] + StarAchievement[i+1][n].attr[k]) : StarAchievement[i+1][n].attr[k];
                })
            }else{
                return obj;
            }
            n++;
        }
    }
    return obj;
}

//打开星宿界面 默认选中可升级的位置
const enoughUp = () => {
    let soul_achieve = getDB("friend_battle.soul_achieve");
    for(let i = 0,len = soul_achieve.length;i<len;i++){
        for(let j =0,lenj = soul_achieve[i][1].length;j<lenj;j++){
            if(!soul_achieve[i][1][j]){
                x_index = i + 1;
                if(i + 1 > 1){
                    x_x_index = 5 * i + j + 1;
                    return x_x_index;
                }else{
                    x_x_index = j + 1;
                    return x_x_index;
                }
            }
        }
    }
    x_index = soul_achieve.length;
    x_x_index = x_index * soul_achieve[soul_achieve.length-1].length - 4;
}

let starOpen:boolean = false;
//外部方法
export class Star extends Widget {
/**
	 * @description 更新到dom树后调用，在渲染循环内调用
	 * @example
	 */
	attach(): void {
        if(starOpen){
            let soul_achieve = getDB("friend_battle.soul_soul_achieve");
            let _node: any = forelet.getWidget("app_c-forge-star-stars");
            let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
            if(x_index >= 5 && soul_achieve.length >= x_index){
                list.scrollLeft = list.scrollLeft + 78 * (x_index - 5);
            }
        }
	}
    select = (msg) => {
        select(msg);
    }
    star = (arr) =>{
        if(!arr[0]){
            if(arr[1] != -1){
                // globalSend("screenTipFun", { words: `材料不足`});
                globalSend("gotoGetWay",arr[1]);
                return; 
            }
            globalSend("gotoBuyMoney",null);
            return; 
        }
        star();
    }
    selectStars = (msg) =>{
        if(msg > soltIndex){
            globalSend("screenTipFun", { words: `激活完成当前星宿，才能前往下一星宿哟`});
            return;  
        }
        selectStars(msg);
    }
    selectMinStars = (msg) =>{
        selectMinStars(msg)
    }
    goback = (arg,starClose) => {
        close(arg.widget);
        if(effid) destoryUiEffect(effid);
        if(starClose === 1) starOpen = false;
    }
    stars = () =>{
        starOpen =true;
        enoughUp();
        soltIndex = JSON.parse(JSON.stringify(x_index));
        forelet.paint(getStarHtmlData());
        open("app_c-forge-star-stars"); 
    }
    changeStars = (e) =>{
        console.log(e)
    }

    //属性加成
    attrAdd = () => {
        globalSend("gotoSeeAttr",{"title":"属性加成","attr":attrAdd()});//attr必须是Obj
        // open("app_c-forge-star-attr",attrAdd());
    }

    arrowChange = (arg) => {
        let _node: any = forelet.getWidget("app_c-forge-star-stars");
        let list: any = getRealNode(findNodeByAttr(_node.tree,"data-desc", "_repeat"));
        let curr_act = getRealNode(findNodeByAttr(_node.tree,"data-desc", "node_path_" + arg));
        if (arg == "1") {
            if(list.scrollLeft==0){
                return;
            }else list.scrollLeft = list.scrollLeft-78;
        } 
        if (arg == "2") {
            if(list.scrollLeft >= 780){ return}
            else list.scrollLeft = list.scrollLeft + 78;
        }
    }

    activeStar = () => {
        stars();
        forelet.paint(getStarHtmlData())
    }

    //获取途径
    gotoGetWay(id) {
        globalSend("gotoGetWay",id);
    }

    //打开星级成就界面
    starsAchieve() {
        allStar();        
        forelet.paint(getStarHtmlData());
        open("app_c-forge-star-stars_achieve")
    }

    nextAttr() {
        if(achieve_index == 1){
            achieve_index = 2;
        }else{
            achieve_index = 1;
        }
        let player = getDB("player");
        let index = equip_star_achieve[achieve_index].career_id.indexOf(player.career_id);

        forelet.paint(getStarHtmlData())
    }
}

//计算总星数
const allStar = () => {
    let equip_star = getDB("friend_battle.equip_star");
    allstar = 0;
    for(let j=0;j<equip_star.length;j++){
        allstar+=equip_star[j];
    }
}

/**
 * 获取配置表里升星消耗的材料id
 */
let arr_id = [];
let arr = Object.keys(equip_star_promote);
//遍历配置表
for (let k of arr) {
    let obj = equip_star_promote[k];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (obj[i].cost.length > 0) {
                obj[i].cost.forEach((v) => {
                    (arr_id.indexOf(v[0]) >= 0) && arr_id.push(v[0]);
                })
            }
        }
    }
} 
let str = arr_id.map((v) => `bag*sid=${v}`).toString();


// 监听人物数据变化
// listen("player.level", () =>{
//     forelet.paint(getStarHtmlData());
// });

// 监听人物数据变化
listen("friend_battle.soul", () =>{
    forelet.paint(getStarHtmlData());
});
//监听背包道具变化
listen(str, function(){
    forelet.paint(getStarHtmlData());
});
/**
 * @description 设置首次打开监听，并设置it1
 */
forelet.listener = (cmd,w) => {
    if(paintNumeral)return;
    paintNumeral++;
    
    soul = getDB("friend_battle.soul");
    forelet.paint(getStarHtmlData());
};
