import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { globalSend } from "app/mod/pi";
import { open, close } from "app/mod/root";
import { data as db, updata, get as getDB } from "app/mod/db";
import { attribute_config } from "cfg/c/attribute_config";

/**
 * @description  导出forelet
 */
export const forelet = new Forelet();

/**
 * @description  设置广播消息接收接口
 */
export const globalReceive :any = {
	gotoSeeAttr:(msg)=>{
        forelet.paint(getAttrData(msg));
		open("app_b-see_attr-attr");
	}
}

export class RoleWidget extends Widget {
	
	goback(arg){
		close(arg.widget)
	}  
}


//数据处理
export const getAttrData = function(msg){
    let data:any = {
        "title": msg.title,
        "base":[],
        "add":[],
        "describe": msg.describe || null
    };
    for(var key in msg.attr){
        if (msg.attr[key] == 0) {
            continue;
        }
        if(key == "attack" || key == "defence" || key == "max_hp" || key == "un_defence" || key == "critical" || key == "un_critical" || key == "dodge" || key == "un_dodge"){
            let num = msg.attr[key];
            data.base.push([attribute_config[key],(num > 1000000 ? (num/10000).toFixed(1)+"万" : num )])
        }else{
            let val = msg.attr[key];
            if (key == "damage_multiple" || key == "un_damage_multiple" || key == "attr_rate") {
                if(key == "attr_rate"){
                    data.add.push(["全属性", parseInt( val * 100)+"%"]);
                    continue;
                }
                data.add.push([attribute_config[key], parseInt(val * 100)+"%"]);
            } else {
                data.add.unshift([attribute_config[key], val<1?parseInt(val * 100)+"%":val]);
            }
        }
    }
    return data;
}




