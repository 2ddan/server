//导入模块
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
import { net_request, net_send, net_message } from "app_a/connect/main";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import {  get as getDB, checkTypeof, updata ,listen,insert } from "app/mod/db";
import { open, close } from "app/mod/root";
import { open as _open ,remove, destory } from "pi/ui/root"
import { Util } from "app/mod/util";
import { Pi,globalSend ,cfg} from "app/mod/pi";
import { listenBack } from "app/mod/db_back";
import * as piSample from "app/mod/sample";
import {set as task} from 'pi/util/task_mgr';
import { notify } from "pi/widget/event";
import { Json } from 'pi/lang/type';

import { treasure_up } from "cfg/b/treasure_up";
import { treasure_break } from "cfg/b/treasure_break";
import { TreasurePhase } from "cfg/b/TreasurePhase";
import { attribute_config } from "cfg/c/attribute_config";
import { role_base } from "fight/b/common/role_base";
import { equip_level_limit } from "cfg/b/equip_level_limit";
import { pet_upgrade } from "cfg/b/pet_upgrade";
import { pet_module } from "cfg/b/pet_module";
import { weapon_soul_base } from "cfg/c/weapon_soul_base";
import { equip_star_achieve } from "cfg/c/equip_star_achieve";
import { clothes_module } from "cfg/b/clothes_module";
import { equip_star_promote } from "cfg/c/equip_star_promote_fore"; //升星
import { equip_diam_equip } from "cfg/c/equip_diam_equip";//宝石
import { equip_diam_promote } from "cfg/c/equip_diam_promote";//宝石属性
import { equip_level_up } from "cfg/c/equip_level_up";//宝石属性
import { DiamPictur } from "cfg/b/DiamPictur";//宝石属性



//scene
import { mgr_data, mgr } from "app/scene/scene";
import { resetcanvas } from "app/scene/base/scene";

export const forelet = new Forelet();
let tab = [
    ["个人",0,"menu_role_icon"],
    ["神兵",1,"menu_magic_icon"],
    ["灵宠",2,"menu_pet_icon"] 
],
cur = 0,
pose = null,
pose_timer = null,
position = null;
let magic_p:any;
let float_timer = null;//浮动动画定时器
//淬炼场景石头位置
let _position = [//0位置，1 scale
    [[-0.0520000010728836,1.47000002861023,1.60000002384186],0.849999964237213],
    [[ 0.685000002384186,1.5349999666214,1.60000002384186],0.799999952316284],
    [[ 1.23199999332428,1.64199995994568,1.60000002384186], 0.75],
    [[ 0.910000026226044,1.12999999523163,-1.5],0.75],
    [[ 0.140000000596046,1.16999995708466,-1.5],0.75],
    [[ -0.800000011920929,1.16999995708466, -1.5],0.75],
    [[ -1.21700000762939,1.73800003528595,1.60000002384186],0.649999976158142],
    [[ -0.806999981403351,1.54999995231628,1.60000002384186], 0.799999952316284]
    
]
/**
 * 外部打开查看玩家
 */
export const globalReceive: any = {
    gotoSeeOther: (msg) => {
        let id =  getDB("player.role_id");
        if(id && (msg == id)){
            globalSend("screenTipFun", {
                words: "请在角色界面查看自己哟!"
            });
            return;
        }
        position = null;
        cur = 0;
        otherInfo(msg);
    }
};
let node_list = {};

export class Gang extends Widget {
    detach(): void {
        removeStone();
        let w = forelet.getWidget("app_c-other_role-other_pet");
        if(!w && pose_timer){
            pose = "";
            clearInterval(pose_timer);
            pose_timer = null;
        }
	}
    //关闭浮窗
    closeCover(arg){
        close(arg.widget);
        globalSend("otherRoleClose");
    }
    goto(arg){
        if(arg == 1){
            let b = _data.role.treasure_info.treasure;
            if( b && !b.length){
                globalSend("screenTipFun", {
                    words: "该玩家神兵未激活!"
                });
                return;
            }
            let timer = setTimeout(()=>{
                let hexagram_level = _data.role.treasure_info.treasure_hexagram_level;
                let break_info = _data.role.treasure_info.treasure_break_info;
                for(let i=0;i<8;i++){
                    let modu= (hexagram_level[i] == break_info[0]) ? "model_ui_stan" : "model_ui_stanaa";
                    createStone("node_",modu,i);
                }
                  
                //上下浮动
                let a = 1;  
                let ti = setInterval(()=>{
                    let arr = [];
                    if( Object.keys(node_list)[0]){
                        for(let i=0;i<8;i++){
                            if(node_list["node_"+i]){
                               
                                let _y = Number(_position[i][0][1]);
                                let y =　node_list["node_"+i].position[1];
                                if(y　>=_y +　0.15){
                                    a = -1;
                                }else if(y <= _y+0.0001){
                                   a = 1;
                                }
                                y += 0.001*a;
                                let po = [_position[i][0][0],y,_position[i][0][2]];
                                if(!arr[i]){
                                    arr.push(po);
                                }else{
                                    arr[i] = po;
                                }
                                
                                node_list["node_"+i].position = arr[i];
                                mgr.modify(node_list["node_"+i]);
                            }
                        }

                        let _p = data.props.module.position;
                        data.props.module.position = [_p[0],(_p[1]+=0.001*a),_p[2]];
                        mgr.modify(data.props.module);
                    }else{
                        clearInterval(ti);
                        ti = null;
                    }
                },35)

                clearTimeout(timer);
                timer = null;
            },100)
        }else if(arg == 2){
            let a = _data.role.pet.pet_info;
            if( a && !a.length){
                globalSend("screenTipFun", {
                    words: "该玩家灵宠未激活!"
                });
                return;
            }
            changeState();
        }
       
        let data :any;    
        data = setResetCanvas("app_c-other_role-other_main");
        cur = arg;            
        forelet.paint(getData());
        resetcanvas(data);
        
        
    }
    //查看对应装备位的装备
    lookEquip = (arg) => {
        position = arg;
        forelet.paint(getData());
        open("app_c-other_role-look_equip-look_equip",getEquipData(arg))
	}
}
//更新宠物动作
const changeState = () => {
    let time = getMondule();
    let i = 0;
    pose_timer = setInterval(() => {
        i++;
        if (i / 10 == (time[0] * 5)) {
            pose = "pose";
            forelet.paint(getData());
        }
        if (i / 10 == (time[0] * 5 + time[1])) {
            pose = "";
            i = 0;
            forelet.paint(getData());
        }
    }, 100);
}
const getMondule = () => {
    let pet = _data.role.pet;
    let pet_infos = pet && _data.role.pet.pet_info;
    let module_info = null;
    if (pet.pet_skin) {
        module_info = pet_module[pet.pet_skin];
        return [module_info.standyTime, module_info.poseTime];
    } else {
        let moduleID = pet_upgrade[pet_infos[0]].module;
        module_info = pet_module[moduleID];
        return [module_info.standyTime, module_info.poseTime]
    }
}
/**
 * @description 创建石头及光
 */
const createStone = (type,modu,index) => {//取名,特效名字,位置
    if(!node_list[type+index]){
        
        node_list[type+index] = {
            "model_stone": modu,
            "position":_position[index][0],
            "scale":_position[index][1]
        };
        mgr.create(node_list[type+index],"magic_stone");
        if(modu == "model_ui_stan"){
            node_list["node_light"+index] = {
                "model_stone": "model_ui_stangg",
                "position":_position[index][0],
                "scale":_position[index][1]
            };
            mgr.create(node_list["node_light"+index],"magic_stone");            
        }
    }
};

/*切换页面时移除所有铸魂页面的石头及特效*/
const removeStone = ()=>{
    for(let key in node_list){
        if(node_list[key]){
            mgr.remove(node_list[key]);        
            delete node_list[key];
        } 
    }
}
const setResetCanvas = (arg) =>{
    let data : any;
    let w = forelet.getWidget(arg);
    for (let i = 0; i < w.children.length; i++) {
        if (w.children[i].name == "app-scene-base-scene") {
            data = w.children[i];
            break;
        }
    }
    return data;
}
let _data:any = {
    "roleCfg":role_base,
    "tab":tab,
    "Pi":Pi,
    //角色
    "equip_level_limit": equip_level_limit,
    //宠物
    "pet_upgrade":pet_upgrade,
    "pet_module":pet_module,
    //神兵
    "treasure_up":treasure_up,
    "treasure_break":treasure_break,
    "TreasurePhase":TreasurePhase,
    "attribute_config":attribute_config,
    "weapon_soul_base":weapon_soul_base,
    "equip_star_achieve":equip_star_achieve,
    "clothes_module":clothes_module
};


const getData = () => {
    _data.cur = cur;
    _data.pose = pose;
    _data.position = position;    
	return _data;
};
const otherInfo = function (id) {//其它玩家信息
    let arg = {
        "param": {
            "id": id-0
        },
        "type": "app/role@role_detail"
    };
    net_request(arg, (data) => {
        if (data.error) {
            console.log(data);
            globalSend("screenTipFun", {
                words: "网络故障!"
            });
            return false;
        }
        let baseData = Common.changeArrToJson(data.ok);
        let role:any = {};
        for(let key in baseData){
            role[key] =  Common.changeArrToJson(baseData[key]);
        }
        role.equip_set = read(role.equip_info.equip_set);
        role.base_info.name = Common.fromCharCode(role.base_info.name);
        _data.role = role;
        _data.petAttr = getAttr();
        if(role.treasure_info.treasure.length){
            _data.magicAttr = getMagicAttr();        
        }     
        let soul_level = star_achieve(role.equip_info.equip_star);
        _data.soul_level = soul_level;
        forelet.paint(getData());
        open("app_c-other_role-other_main");
    })
}

//计算星宿成就阶段
const star_achieve = (all_star) => {
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

const read = (data) => {
	for(let j=0;j<data.length;j++){
		if(data[j]){
			data[j] = piSample.decode(data[j],Pi.sample);
		}
	}
    return data; 
    // Common.fromCharCode(topData.name)
}

//获得宠物培养+宠物时装总属性
var getAttr = () => {
    let data: any = {};
    let pet = _data.role.pet;
    if(pet.pet_skin){
        for (var i = 0, len = pet.pet_skin.length; i < len; i++) {
            let prop = Pi.sample[pet.pet_skin[i]];
            for (var j = 0, leng = prop.attr.length; j < leng; j++) {
                data[prop.attr[j][0]] = (data[prop.attr[j][0]] || 0) + prop.attr[j][1]
            }
        }
    }
    if(pet.pet_info.length){
        let info = pet.pet_info,
            attr = pet_upgrade[info[0]][info[1]].attr;
        for (var i = 0, len = attr.length; i < len; i++) {
            data[attr[i][0]] = (data[attr[i][0]] || 0) + attr[i][1];
        }
    }
    
    return data;
}
//获得神兵总属性
var getMagicAttr = () => {
    let role = _data.role;
    let data = role.treasure_info;
    let magic = TreasurePhase[data.treasure[0]][data.treasure[1]].attr_add;
    let breakAttr = treasure_break[data.treasure_break_info[0] - 1] ? treasure_break[data.treasure_break_info[0] - 1].attr : 0;
    let total = (breakAttr && breakAttr.slice(0)) || [];
    
    let hexagram_level = data.treasure_hexagram_level;
    for(var j = 0, leng = hexagram_level.length; j < leng; j++ ){
        let prop = treasure_up[j-0+1][hexagram_level[j]];
        prop && prop.attr && total.push(prop.attr);
    }
    if (total.length > 1) {
        for (var i = 0, len = total.length; i < len; i++) {
            magic[total[i][0]] = (magic[total[i][0]] || 0) + total[i][1];
        }
    }
    breakAttr && (magic.attr_rate = treasure_break[data.treasure_break_info[0] - 1].attr_rate)
    let treasure = TreasurePhase[data.treasure[0]][data.treasure[1]].attr_add;
    return magic;
}



const getEquipAttr = (data) => {
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

const getEquipData = (index) => {
    let data:any = {};    
    let info = _data.role.equip_info;
    data.career_id = _data.role.base_info.career_id;
    data.prop = info.equip_set[index];
    data.url = Pi.pictures[data.prop["module"][data.prop.career_id.indexOf(data.career_id)][0]];
    data.slot = data.prop.slot-1;
    data.info = info;
    data.attribute_config = attribute_config;
    data.equipLevel = info.equip_level[data.slot];
    data.equipLevelAttr = [equip_level_up[data.equipLevel][2]-0,equip_level_up[data.equipLevel][3] - 0];//基数,固定加成    
    data.star = info.equip_star_info[data.slot];
    data.attr = getEquipAttr(data.prop);//点击装备属性
    if(!data.star){
        data.starAttr =  0;
        data.bonus =  0;
        data.geteDiam =  geteDiam(data.slot);
        return data;
    }
    let a = equip_star_promote[data.slot+1][data.star];
    data.starAttr =  a.attr;
    data.bonus =  a.attr_ratio;
    data.geteDiam =  geteDiam(data.slot);
    return data;
}

const geteDiam = (s) => {
    let slot = s;
    let diam_leve =_data.role.equip_info.equip_diam[slot];
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