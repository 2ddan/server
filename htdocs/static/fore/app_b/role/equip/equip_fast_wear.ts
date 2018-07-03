//==================导入======================
/**pi */
import { Forelet } from "pi/widget/forelet"
import { Widget } from "pi/widget/widget";

/**mod */
import { get as getDB, listen } from "app/mod/db";
import * as piSample from "app/mod/sample";
import { piOpen } from "app/mod/root";

/**app */
import { replaceEquip } from "app_b/role/equip/equip";
import { equip_level_limit } from "cfg/b/equip_level_limit";

export const forelet = new Forelet();
export let flag = true;
export let fastWearFun;

let award_equip = {},
    state = "", // 奖励得到装备状态
    fast_wear_equip = [], // 需要快速换装的装备
    equip_info,
    count = 10,
    timer = null;


/**
 * @description  设置广播消息接收接口
 */
export const globalReceive: any = {
    // "newProps":(data)=> {
    //     fastWearFun.initAwardEquip(data);
    // }
}

listen("bag*type='equip'", function () {
    fastWearFun.initAwardEquip();
});
let oldLevel = 0;
listen("player.level", function () {
    let level = getDB("player.level");
    if(level>oldLevel){
        oldLevel = level;
        fastWearFun.initAwardEquip();
    }
});

// ===========================快速穿戴类
export class fastWear extends Widget {
    // 快速穿戴
    fastWear = (msg) => {
        //console.log(msg);
        fastWearFun.fastWearEquip(msg);
    }
    destroy(): boolean {
		if (!this.tpl)
			return false;
		this.tpl = undefined;
		if (this.resTab) {
			this.resTab.timeout = this.resTimeout;
			this.resTab.release();
		}
		this.forelet && this.forelet.removeWidget(this);
        if (timer) {
            clearTimeout(timer);
            timer = null;
            count = 10;
        }
		return true;
	}
}

const createFastWearFun = () => {
    let module: any = {};

    module.getData = () => {
        let _data: any = {};
        _data.equip_info = equip_info; // 快速穿戴装备的信息
        _data.state = state; // 快速穿戴状态
        _data.count = count;

        return _data;
    }

    // 初始化得到的装备的数据
    module.initAwardEquip = () => {
        let data = getDB("bag*type='equip'");
            award_equip = {};
        let playerLevel = getDB("player.level");
        for (let i = 0, len = data.length; i < len; i++) {
            // let awardEquipInfo = piSample.decode(data[i][0], Pi.sample);
            if (data[i]) {
                let _data = data[i],
                    curr_equip:any = {};
                curr_equip["name"] = _data.name; // 装备名称
                curr_equip["bag_pos"] = _data.index-0+1; // 装备在背包的位置
                curr_equip["equip_pos"] = _data.slot; // 装备的装备位置
                curr_equip["limit"] = equip_level_limit[curr_equip["equip_pos"]-0].open_level; // 装备穿戴限制
                curr_equip["grade"] = _data.grade; // 装备评分
                curr_equip["level"] = _data.level; // 装备等级
                curr_equip["module"] = _data.module; // 装备图片
                curr_equip["career_id"] = _data.career_id; // 装备职业id.Array

                //玩家等级大于装备孔位穿戴等级, 玩家等级大于装备等级
                if (playerLevel >= curr_equip["limit"] && playerLevel >= _data.level) {
                    if (!award_equip[curr_equip["equip_pos"]]) {
                        award_equip[curr_equip["equip_pos"]] = curr_equip;
                    } else {
                        if (curr_equip.grade > award_equip[curr_equip["equip_pos"]].grade) {
                            award_equip[curr_equip["equip_pos"]] = curr_equip;
                        }
                    }
                }
            }
        }
        setTimeout(() => {
            module.getFastWearEquip();
        }, 0);
        
    }
    // 计算需要快速穿戴的装备
    module.getFastWearEquip = () => {
        let wearInfo = getDB("friend_battle").equip_set;
        fast_wear_equip = [];
        // 如果快捷穿戴组件不存在
        //if (!forelet.getWidget("app_b-role-equip-equip_fast_wear")) {

        for (let k in award_equip) {
            let index = Number(k) - 1;
            // 当前装备位未穿戴装备
            if (!wearInfo[index]) {
                fast_wear_equip.push(award_equip[k]);
            }else if (award_equip[k].grade > wearInfo[index].grade) {
                fast_wear_equip.push(award_equip[k]); 
            } 
        }
        if(JSON.stringify(wearInfo) == "[0,0,0,0,0,0,0,0,0,0]" && fast_wear_equip.length){
            fastWearFun.fastWearEquip(fast_wear_equip[0].bag_pos +","+fast_wear_equip[0].equip_pos);
            return;
        }
            //console.log(fast_wear_equip);
        setTimeout(() => {
            module.showFastWear();
        }, 0); 
        //}
    }

    // 显示快速穿戴的装备
    module.showFastWear = () => {
        if (fast_wear_equip.length) {
            equip_info = fast_wear_equip[0];
            module.updataHtml();
            if (!forelet.getWidget("app_b-role-equip-equip_fast_wear")) {
                piOpen("app_b-role-equip-equip_fast_wear");
            }
            count = 5; 
        } else {
            let w = forelet.getWidget("app_b-role-equip-equip_fast_wear");
            if (w) {
                w.destroy();
            }
        }
    }


    // 快速穿戴装备
    module.fastWearEquip = (msg) => {
        let _msg = msg.split(","),
            arg = {};
        arg["cmd"] = _msg.join("-");
        replaceEquip(arg);
    }

    // // 自动穿戴
    // module.autoWearEquip = () => {
    //     if (count >= 0 ) {
    //         timer = setTimeout(function(){
    //             count--;
    //             fastWearFun.updataHtml();
    //             module.autoWearEquip();
    //         },1000);
    //     } else {
    //         let msg = {};
    //         timer = null;
    //         msg = equip_info.bag_pos + "-" + equip_info.equip_pos;
    //         module.fastWearEquip(msg);
    //     }
    // }

    // 刷新页面
    module.updataHtml = () => {
        forelet.paint(module.getData());
    }

    return module;
}

fastWearFun = createFastWearFun();