import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { Pi } from "app/mod/pi";
import { open } from "app/mod/root";

import { buffCfg } from "cfg/b/buff";
import { treasure_buff } from "cfg/b/Treasure_buff";
import { pet_buff } from "cfg/b/pet_buff";
import { weapon_soul_base } from "cfg/c/weapon_soul_base";
import { soul_buff } from "cfg/c/soul_buff";

// ======================================== 导出
/**
 * @description  导出forelet
 */
export const forelet = new Forelet();

export const globalReceive: any = {
    activeBuff: (id) => {
        forelet.paint(getData());
        open("app_b-widget-buff-buff_tips-buff_tips",id);
    }
}
let type = "magic";
let buff_data = null;//buff条件表
let limit_key = null;//激活buff限制key 
let curr_level = -1;//当前激活
let refresh_count = 0;//刷新页面次数
export class buff extends Widget {
    detach(){
        if(this.name === "app_b-widget-buff-buff_detail-buff_detail" || this.name === "app_b-widget-buff-buff_tips-buff_tips"){
            return;
        }
        refresh_count = 0;
    }
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props: Json, oldProps?: Json): void {
        this.props = props;
        if(props.type){
            //新Buff提示
            refresh_count++;
            if(refresh_count > 1){
                let id = buffTip(curr_level,props.level);
                if(id){
                    open("app_b-widget-buff-buff_tips-buff_tips",id);
                }
            }

            //更新it1
            type = props.type;
            curr_level = props.level;
        }
        this.setState(getData());
        this.paint();
    }

    //查看BUFF详情
    detail(id,active?){
        let words = " ";
        if(type == "magic"){
            words = `铸魂达到${getLimit(id)[limit_key]}重天解锁`;
        }else if(type == "pet"){
            words = `宠物达到${getLimit(id)[limit_key]}阶解锁`;
        }else if(type == "weapon_soul"){
            words = `附灵达到${getLimit(id)[limit_key]}阶解锁`;
        }else if(type == "weapon_soul"){
            words = `附灵达到${getLimit(id)[limit_key]}阶解锁`;
        }else if(type == "soul"){
            words = `龙魂总等级达到${getLimit(id)[limit_key]}级解锁`;
        }
        open("app_b-widget-buff-buff_detail-buff_detail",{
            "id":id,
            "limit": active ? 0 : words
        })
    }
}

let getData = ()=>{
    let data:any = {};
    data.Pi = Pi;
    data.buffCfg = buffCfg;
    data.buffInfo = buffInfo(type);
    return data;
}

//所有buff,及其激活状态
let buffInfo = (type)=>{
    if(!type){
        return false;
    }
    let all_buff = [];//所有BUFF数据
    if(type == "magic"){
        all_buff = treasure_buff.slice(0).pop().buff_id;
        buff_data = treasure_buff;
        limit_key = "break_level";
    }else if(type == "pet"){
        all_buff = pet_buff.slice(0).pop().buff_id;
        buff_data = pet_buff;
        limit_key = "grade";
    }else if(type == "weapon_soul"){
        all_buff = weapon_soul_base.slice(0).pop().buff_id;
        buff_data = weapon_soul_base; 
        limit_key = "class";
    }else if(type == "soul"){
        all_buff = soul_buff.slice(0).pop().buff_id;
        buff_data = soul_buff; 
        limit_key = "num";
    }
    
    let index = -1;
    for(let i = 0,len = buff_data.length;i<len;i++){
        if(curr_level >= buff_data[i][limit_key]){
            index = i;
        }else{
            break;
        }
    }
    //没有一个激活
    if(!buff_data[index] || !buff_data[index].buff_id){
        return all_buff.map((v) => {
            return [v,0]
        });
    }
    //有激活
    let curr = buff_data[index].buff_id.join(",");
    return all_buff.map((v) => {
        return [v,curr.indexOf(v+"")>-1]
    });
}

//获得激活条件
let getLimit = (id)=> {
    for(let i = 0,len = buff_data.length;i<len;i++){
        if(buff_data[i].buff_id && buff_data[i].buff_id.join(",").indexOf(id+"") > -1){
            return buff_data[i];
        }
    }
}

//判断是否激活新的BUFF
let buffTip = (oldLevel,currLevel)=>{
    let oldIndex = -1,
        currIndex = -1;
    for(let i = 0,len = buff_data.length;i<len;i++){
        if(oldLevel >= buff_data[i][limit_key]){
            oldIndex = i;
        }
        if(currLevel >= buff_data[i][limit_key]){
            currIndex = i;
        }else{
            break;
        }
    }
    if(currIndex !== oldIndex && buff_data[currIndex]["buff_id"]){
        return buff_data[currIndex]["buff_id"].slice(0).pop();
    }else{
        return false;
    }
}