
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open, close } from "app/mod/root";
import {  Pi } from "app/mod/pi";
import { get as getDB} from "app/mod/db";
import { attribute } from "cfg/c/attribute"; //属性

export const forelet = new Forelet();

let grade = [0,0];
//打开未知属性装备页面
export let globalReceive = {
	"gotoEquipUnknown": (id) => {
		let slot = Pi.sample[id].slot;
		let data:any ={
			"Pi": Pi,
			"player": getDB("player"),
			"id":id,
			"attr": attrHandle(id),
			"grade": grade,
			"mine": getDB("friend_battle.equip_set."+(slot-1))
		};
		forelet.paint(data);
		open("app_b-widget-equip_unknown-equip_unknown");
	}
}



export class equip_unknown extends Widget {
	goback (arg) {
		close(arg.widget);
	}
}

const attrHandle = function(id){
	let grade1 = [0,0],//评分
		prop = Pi.sample[id],
		data:any = {
			base:[],
			add:[]
		};
		//基础属性
		let base_key = prop.base_num[0];
		let base_val = prop.base_num[1];
		data.base.push([attribute[base_key]["name"], Math.ceil(base_val * prop.base_float[0])+"~"+ Math.ceil(base_val * prop.base_float[1]) ]);
		grade1[0] += base_val*prop.base_float[0]*prop.grade_rate*attribute[base_key]["prower_ratio"];
		grade1[1] += base_val*prop.base_float[1]*prop.grade_rate*attribute[base_key]["prower_ratio"];
		
		//附加属性
		for(var i = 0,len = prop.addition_num.length;i<len;i++){
			let addition_key = prop.addition_num[i][0];
			let addition_val = prop.addition_num[i][1];
			data.add.push([attribute[addition_key]["name"],Math.ceil(addition_val * prop.addition_float[0])+"~"+ Math.ceil(addition_val * prop.addition_float[1])]);
			grade1[0] += addition_val*prop.addition_float[0]*prop.grade_rate*attribute[addition_key]["prower_ratio"];
			grade1[1] += addition_val*prop.addition_float[1]*prop.grade_rate*attribute[addition_key]["prower_ratio"];
		}
		grade = [Math.ceil(grade1[0]),Math.ceil(grade1[1])];
	return data;
}