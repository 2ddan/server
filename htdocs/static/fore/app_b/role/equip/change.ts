import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import { get as getDB } from "app/mod/db";
import { Pi } from "app/mod/pi";
import { attribute_config } from "cfg/c/attribute_config"; //属性
import { replaceEquip } from "app_b/role/equip/equip";
let P_equip = []; //玩家穿戴所有装备
let P_id = 0; //玩家角色id
let B_equip = []; //背包所有装备
let C_equip : any= 0; //点击装备
let slot = 0; //部位
let type = 0;
let all_slot = [];
export const forelet: any = new Forelet();
export const globalReceive :any = {
  	"equipChange" : (msg) => {
        type = msg.type;
        initData(msg);
        open("app_b-role-equip-change",getPopupsBagHtmlData());
    }
}
export class Change extends Widget {
    colse = () => {
        ((w)=>{
			//循环外调用
            setTimeout(()=>{
                close(w);
            },0);
		})(this);
    }
    change = (ang) =>{
        replaceEquip(ang,() => {
            close(forelet.getWidget("app_b-role-equip-change"));
        });
    }
}
const initData = (msg) => {
    P_equip = getDB("friend_battle.equip_set");
    B_equip = getDB("bag*type='equip'");
    P_id = getDB("player.career_id");
    C_equip = type?P_equip[msg.index]:B_equip[msg.index];
    slot = type?P_equip[msg.index].slot-1:B_equip[msg.index].slot-1;
    if(type)
    all_slot = getDB("bag*slot=" + (slot - 0 + 1));
}
const getAttr = (data) => {
    let attr = [];
    //基础属性
    for(let i in data.base_attr){
        let obj = {};
        obj["attr"] = attribute_config[data.base_attr[i][0]];
        obj["val"] = data.base_attr[i][1];
        attr.push(obj);
    }
    //附加属性
    for(let j in data.addition_attr){
        let obj = {};
        obj["attr"] = attribute_config[data.addition_attr[j][0]];
        obj["val"] = data.addition_attr[j][1];
        obj["color"] = "#FF0";
        attr.push(obj);
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
const getPopupsBagHtmlData = () => {
    let data:any = {};
    data.prop = C_equip;
    data.url = Pi.pictures[C_equip["module"][C_equip.career_id.indexOf(P_id)][0]];
    data.solt = slot;
    data.attr = getAttr(C_equip);//点击装备属性
    data._attr = getDiff(getAttr(C_equip),getAttr(P_equip[slot]));//点击装备属性 - 部位装备属性
    data.UID = P_id;
    data.type = type;
    data.props = all_slot;
    data.getProp_URL = (equip) =>(Pi.pictures[equip["module"][equip.career_id.indexOf(P_id)][0]]);
    data.getAttr = getAttr;
    data.cfgAttr = attribute_config;
    return data;
}