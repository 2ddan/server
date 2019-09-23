/**
 * 装备使用
 */
 // ================================ 导入
//mod
import { Formula } from "app/mod/formula";
import { CfgMgr } from "app/mod/cfg_mgr";
import { Common } from "app/mod/common";
import { Util } from "app/mod/util";
import { data as localDB, updata, insert } from "app/mod/db";
import { DBback } from "app/mod/db_back";
//fight
import { Fighter, Buff, Equipment, SuitEquipment } from "./class";
import { Util as FUtil } from "./util";
import { FScene, FSmgr } from "./scene";
import { EType } from "./analyze";
import { Policy } from "./policy";
import { globalReceive } from "../app/mod/pi";
import {request} from "app_a/connect/con_mgr";
import { globalSend } from "../app/mod/pi";
import { Cfg } from "../pi/util/cfg";


 // ================================ 导出
export class EquipmentControl{

    /**
     * @description 初始化战斗者装备buff
     * @param f 
     * @param scene 
     */
    static init(f: Fighter, scene: FScene): Boolean{
        // 判断player上的buffs是否包含装备上的buff，包含则将该buff加入f.buffs，否则加入f.buff_list
        let p = localDB.player;
        let equipments = [], tmpSuits = [];
        if(p.weapon){
            equipments.push(p.weapon);
            for(let b of p.weapon.buff_list){
                let pbuff = p.buffs.find(pb=>pb.id==b.buff);
                if(pbuff){
                    let buff = CfgMgr.create(["cfg/buff"], b.buff+'', Buff);
                    buff.effects = pbuff.effects;
                    buff.field_life = pbuff.field_life;
                    buff.add_value = pbuff.add_value;
                    buff.event_count = pbuff.event_count;
                    buff.life = pbuff.life;
                    buff.AF = pbuff.AF;
                    f.buffs.push(buff);
                }else {
                    f.buff_list.push(b.buff);
                }
            }
        }
        if(p.armor){
            equipments.push(p.armor);
            for(let b of p.armor.buff_list){
                let pbuff = p.buffs.find(pb=>pb.id==b.buff);
                if(pbuff){
                    let buff = CfgMgr.create(["cfg/buff"], b.buff+'', Buff);
                    buff.effects = pbuff.effects;
                    buff.field_life = pbuff.field_life;
                    buff.add_value = pbuff.add_value;
                    buff.event_count = pbuff.event_count;
                    buff.life = pbuff.life;
                    buff.AF = pbuff.AF;
                    f.buffs.push(buff);
                }else {
                    f.buff_list.push(b.buff);
                }
            }
        }
        for(let e of p.other_equipments){
            equipments.push(e);
            for(let b of e.buff_list){
                let pbuff = p.buffs.find(pb=>pb.id==b.buff);
                if(pbuff){
                    let buff = CfgMgr.create(["cfg/buff"], b.buff+'', Buff);
                    buff.effects = pbuff.effects;
                    buff.field_life = pbuff.field_life;
                    buff.add_value = pbuff.add_value;
                    buff.event_count = pbuff.event_count;
                    buff.life = pbuff.life;
                    buff.AF = pbuff.AF;
                    f.buffs.push(buff);
                }else {
                    f.buff_list.push(b.buff);
                }
            }
        }
        // 套装buff添加
        for(let e of equipments){
            let t = tmpSuits.find(s => s.id == e.suit_id);
            if(t){
                // 存在则数量加1
                t.num++;
            } else {
                // 不存在则加入tmp
                let suit = {"id": e.suit_id,"num":1}
                tmpSuits.push(suit);
            }
        }
        for(let s of tmpSuits) {
            if(!s.id) continue;
            let suit = CfgMgr.create(["cfg/suit"],s.id+'',SuitEquipment);
            let num = suit.components.split(",").length;
            if(s.num == num) {
                for(let b of suit.buff_list){
                    FSmgr.addBuff(f.id,b.buff);
                }
            }
        }
        return true;
    }
    /**
     * @description 装备是否可装备
     * @param id
     $return$   0：背包已满，1：已经装备，2：可装备
     */
    static ifCanEquip(id:any){
        let p = localDB.player,
        equipment = CfgMgr.create(['cfg/equipment'],`${id}`,Equipment),
        equipList = [].concat((p.weapon || []),(p.armor || []),(p.other_equipments || []));
        if(equipList.length >= p.equipment_max){
            return 0;
        }else{
            if (equipment.type == 1) {
                if(p.weapon) return 1;
            }else if(equipment.type == 2){
                if(p.armor) return 1;
            }else{
                if(p.other_equipments.length>=p.equipment_max-2) return 1;
            }
        }
        return 2;
    }

    /**
     * @description 装备放入装备位，并添加对应buff
     * @param id
     */
    static equip(id: number): Boolean{
        // let p = localDB.player,
        //     equipment = CfgMgr.create(["cfg/equipment"], id + '', Equipment);
        // 发送请求: 商店购买装备并装备该装备
        let param = {
            type: "app/fight/shop@buy_equipment",
            param: {
                equipment_id: id
            }
        }
        request(param, (res) => {
            if (res.error) {
                globalSend("msgScreenTips", { text: "购买装备请求错误" })
            }
            if (res.ok) {
                let equipment_data = res.ok;
                for (let i=0;i<equipment_data.length;i++) {
                    if (equipment_data[i][1]) {
                        switch (equipment_data[i][0]) {
                            case "armor" :
                                updata("player.armor", equipment_data[i][1]);
                                break;
                            case "weapon":
                                updata("player.weapon", equipment_data[i][1]);
                                break;
                            case "other_equipments":
                                updata("player.other_equipments", equipment_data[i][1]);
                                break;
                        }
                    }
                }
            }
        })
        // if(equipment.type == 1){
        //     // 武器
        //     updata("player.weapon", id);
        // } else if(equipment.type == 2) {
        //     // 防具
        //     updata("player.armor", id);
        // } else if(equipment.type == 3) {
        //     // 其它
        //     p.other_equipments.push(id);
        //     updata("player.other_equipments", p.other_equipments);
        // }
        // 功能效果添加
        // addEffect(p,equipment.function_effect);
        // 添加套装功能效果
        // if(equipment.suit_id) {
        //     let es = []; // 所有装备
        //     if(p.weapon) es.push(p.weapon);
        //     if(p.armor) es.push(p.armor);
        //     es = es.concat(p.other_equipments);
        //     let suit = CfgMgr.create(["cfg/suit"],equipment.suit_id+'',SuitEquipment),
        //         num = suit.components.split(",").length,
        //         _num = es.filter(_e=>CfgMgr.create(["cfg/equipment"], _e+'', Equipment).suit_id==equipment.suit_id).length;
        //     if(suit.function_effect && _num==num) addEffect(p,suit.function_effect);
        // }
        return true;
    }

    /**
     * @description 局内装备丢弃
     * @param id
     */
    static dropEquipment(id: number): boolean{
        let p = localDB.player,
            equipment = CfgMgr.create(["cfg/equipment"], id+'', Equipment);
        if(equipment.type == 1){
            // 武器
            updata("player.weapon", undefined);
        } else if(equipment.type == 2) {
            // 防具
            updata("player.armor", undefined);
        } else if(equipment.type == 3) {
            // 其它
            let index = p.other_equipments.indexOf(id);
            p.other_equipments.splice(index,1);
            updata("player.other_equipments", p.other_equipments);
        }
        
        // 去除player上buffs中包含的装备buff
        for(let b of p.buffs) {
            let index = equipment.buff_list.findIndex(_b=>_b.id==b.id);
            if(index != -1) {
                let _index = p.buffs.indexOf(b);
                p.buffs.splice(_index, 1);
            }
        }
        updata("player.buffs", p.buffs);
        // 功能效果去除
        deleteEffect(p, equipment.function_effect);
        // 去除套装功能效果
        if(equipment.suit_id) {
            let eids = [], esids = []; // 所有装备
            if(p.weapon) eids.push(p.weapon);
            if(p.armor) eids.push(p.armor);
            eids = eids.concat(p.other_equipments);
            for(let eid of eids){
                let sid = CfgMgr.create(["cfg/equipment"], eid+'', Equipment).suit_id;
                esids.push(sid);
            }
            let suit = CfgMgr.create(["cfg/suit"],equipment.suit_id+'',SuitEquipment),
                num = suit.components.split(",").length,
                _num = esids.filter(_sid=>_sid==equipment.suit_id).length;

            if(suit.function_effect && _num==num-1) deleteEffect(p,suit.function_effect);
        }
        return true;
    }
}

// ================================ 本地

// 添加功能效果
const addEffect = function(p,effect: String) {
    let effects = fixEffectValue(effect);
    for(let e of effects) {
        if(e.type === "max_hp"){
            let r = Math.floor(e.value);
            p.max_hp += r;
            updata("player.max_hp", p.max_hp);
            if(r>0){
                p.hp += r;
                updata("player.hp", p.hp);
            }else{
                if(p.max_hp<p.hp) {
                    p.hp=p.max_hp;
                    updata("player.hp", p.hp);
                }
            }
        }else{
            p[e.type] += e.value;
            updata("player." + e.type, p[e.type]);
        }
    }
}

// 去除功能效果
const deleteEffect = function(p,effect: String) {
    let effects = fixEffectValue(effect);
    for(let e of effects) {
        if(e.type === "max_hp"){
            let r = Math.floor(e.value);
            p.max_hp -= r;
            updata("player.max_hp", p.max_hp);
            if(r<0){
                p.hp -= r;
                updata("player.hp", p.hp);
            }else{
                if(p.max_hp<p.hp) {
                    p.hp=p.max_hp;
                    updata("player.hp", p.hp);
                }
            }
        }else{
            p[e.type] -= e.value;
            updata("player." + e.type, p[e.type]);
        }
    }
}

// 处理功能效果数值
const fixEffectValue = function(e: String) {
    let effects = [],
        tmp = e.split(",");
    for(let i=0,len=tmp.length;i<len;i+=2){
        let _e = {type: "", value: 0};
        _e.type = tmp[i];
        _e.value = parseInt(tmp[i+1]);
        effects.push(_e);
    }
    return effects;
}

// 清除player身上装备
const clearData = function() {
    let p = localDB.player;
    p.weapon = undefined;
    updata("player.weapon", p.weapon);
    p.armor = undefined;
    updata("player.armor", p.armor);
    p.other_equipments.length = 0;
    updata("player.other_equipments", p.other_equipments);
}

globalReceive({
	"clearData":()=>{
		clearData();
	}
})