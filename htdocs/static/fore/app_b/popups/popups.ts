import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { notify } from "pi/widget/event";
import { open,close } from "app/mod/root";

import { updata, get as getDB, listen, insert } from "app/mod/db";
import { Pi, globalSend,cfg } from "app/mod/pi";
import { attribute_config } from "cfg/c/attribute_config"; //属性
import { equip_star_promote } from "cfg/c/equip_star_promote_fore"; //升星
import { equip_diam_equip } from "cfg/c/equip_diam_equip";//宝石
import { equip_diam_promote } from "cfg/c/equip_diam_promote";//宝石属性
import { replaceEquip } from "app_b/role/equip/equip"

let P_equip = []; //玩家穿戴所有装备
let P_id = 0; //玩家角色id
let B_equip = []; //背包所有装备
let C_equip : any = 0; //点击装备
let slot = 0; //部位
let type = 0;
let all_slot = [];
let star_ = 0;
let $star_ = 0;//加成百分比
let index = 0;
let bonus:any = 0;
let equip_level = 0;
export const forelet: any = new Forelet();
export const globalReceive :any = {
  	"gotoPopup" : (msg) => {
        type = 1;
        index = msg;
        initData(msg,type);
        forelet.paint(getPopupsBagHtmlData());
    }
}
export class Popups extends Widget {
    colse = () => {
        updata("friend_battle.showInfo",false);
    }
    openParticulars = ()=>{
        ((w)=>{
            setTimeout(()=>{
                close(w);
                globalSend("equipChange",{type:1,index:index})
            },0);
		})(this);
    }
}
const initData = (msg,bol) => {
    P_equip = getDB("friend_battle.equip_set");
    B_equip = getDB("bag*type='equip'");
    P_id = getDB("player.career_id");
    C_equip = bol?P_equip[msg]:B_equip[msg];
    slot = bol?P_equip[msg].slot-1:B_equip[msg].slot-1;
    if(type)
    all_slot = getDB("bag*slot=" + (slot - 0 + 1));
}
const getAttr = (data) => {
    let attr = [];
    //基础属性
    for(let i in data.base_attr){
        if(i!="erl_type"){
            let obj = {};
            obj["attr"] = attribute_config[data.base_attr[i][0]];
            obj["val"] = data.base_attr[i][1];
            attr.push(obj);
        }
    }
    //附加属性
    for(let j in data.addition_attr){
        if(j!="erl_type"){
            let obj = {};
            obj["attr"] = attribute_config[data.addition_attr[j][0]];
            obj["val"] = data.addition_attr[j][1];
            attr.push(obj);
        }
    }
    return attr;
}
const getDiff = (attr1,attr2) => {
    let arr = [];
    for(let i=0,attr,attr_;attr=attr1[i];i++){
        let obj = {};
        if(attr2[i]&&attr2[i].attr==attr.attr){
            let num = ((attr.val- 0) - (attr2[i].val - 0));
            obj["val"] = num;
            obj["attr"] = attr.attr;
            obj["color"] = attr.val - attr2[i].val < 0 ? "#F00" : "#0F0";
        }
        arr.push(obj);
    }
    return arr;
}
const getStar = () =>{
    let max;
    star_ = getDB("friend_battle.equip_star")[slot];
    let $star = equip_star_promote[slot-0+1];
    $star_ = $star[star_].attr_ratio;
    for(let i in $star){
        max = i;
    }
    return [star_,max-0];
}
const geteDiam = () => {
    // let DiamPictur = cfg.DiamPictur.DiamPictur;
    // let diam_leve =getDB("friend_battle.equip_diam")[slot];
    // let diam = equip_diam_equip[slot-0+1],attarr=[];
    // for(let j=0;j<diam.length;j++){
    //     let str = diam_leve[j] + "级 " + attribute_config[equip_diam_promote[diam[j][0]][3][1][0]],color="#FFF",url="none";
    //     if(!diam_leve[j]){
    //         str += ' 未激活';
    //         color = "#8E93BC";
    //     }else{
    //         url = Pi.pictures[DiamPictur[diam[j][0]]];
    //         str += "+" + equip_diam_promote[diam[j][0]][diam_leve[j][1]][1][1];
    //         attarr.push({level:diam_leve[j],url:url,val:str,color:color,key:equip_diam_promote[diam[j][0]][diam_leve[j][1]][1][1]});
    //     }
        
    // }
    let DiamPictur = cfg.DiamPictur.DiamPictur;
    let diam_leve =getDB("friend_battle.equip_diam")[slot];
    let diam = (equip_diam_equip[slot-0+1]).slice(0),
        attarr=[];
    for(let j=0;j<diam.length;j++){
        let obj:any = {};
        obj.url = Pi.pictures[DiamPictur[diam[j][0]]];
        obj.lv = diam_leve[j]?diam_leve[j][1]:0;
        obj.attr = attribute_config[equip_diam_promote[diam[j][0]][3][1][0]];
        obj.val = obj.lv?equip_diam_promote[diam[j][0]][obj.lv][1][1]:0;
        attarr.push(obj);
    }
    return attarr;
}

const getReinforcement = () => {
    equip_level = getDB("friend_battle.equip_level")[slot];//装备等级
    let star = cfg.equip_star_promote_fore.equip_star_promote[slot+1][star_];
    let equip = cfg.equip_level_up.equip_level_up[equip_level][2] - 0;//基数
    let equip_j = cfg.equip_level_up.equip_level_up[equip_level][3] - 0;//固定加成
    let mainAttr = getAttr(P_equip[slot])[0];
    bonus = star.attr_ratio;
    let starArr:any = {};
    // let equipArr = getAttr(P_equip[slot]);
    let qhOBJ = {};
    if(star.attr){
        for(let i in star.attr){
            starArr.attr = attribute_config[i] || mainAttr.attr;
            starArr.val= star.attr[i]-0;
        }
    }else{
        starArr.attr = mainAttr.attr,
        starArr.val = 0;
    }
    
        
    /* for(let j in equipArr){
        equipArr[j]["color"] = "#0F0";
        equipArr[j].val =Math.round((equipArr[j].val - 0) * equip + (equipArr[j].val - 0) + equip_j) - 0;
    } */
    
    let equipArr:any ={
        "attr":mainAttr.attr,
        "val":Math.ceil(mainAttr.val * equip + equip_j)
    }
    qhOBJ["star"] = starArr;
    qhOBJ["equip"] = equipArr;
    return qhOBJ;
}
const getPopupsBagHtmlData = () => {
    let data:any = {};
    data.getStar = getStar();//点击装备星级和最大星级[1,10]
    data.prop = C_equip;
    data.url = Pi.pictures[C_equip["module"][C_equip.career_id.indexOf(P_id)][0]];
    data.solt = slot;
    data.attr = getAttr(C_equip);//点击装备属性
    data._attr = getDiff(getAttr(C_equip),getAttr(P_equip[slot]));//点击装备属性 - 部位装备属性
    data.UID = P_id;
    data.type = type;
    data.props = all_slot;
    data.getProp_URL = (equip) =>(Pi.pictures[equip["module"][P_id][0]]);
    data.getAttr = getAttr;
    data.geteDiam = geteDiam();//点击装备宝石
    data.reinforcement = getReinforcement();//强化
    data.bonus = bonus;
    data.equipLevel = equip_level;
    return data;
}