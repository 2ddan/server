// 九幽幻境怪物配置
import { instance_drop } from "cfg/c/instance_drop";
// 装备副本怪物配置
import { equip_fb_data } from "cfg/c/equip_fb_data";
// 所有怪物配置
import { monster_base } from "fight/b/common/monsterBase";
// 怪物模型配置
import { monster_cfg } from "app/scene/plan_cfg/monster_config";
//scene
import {  mgr } from "app/scene/scene";


// let fb_position = [
//     [1,0,-3],[1.7,0,-1],[1.5,0,2.2],[-1.3,0,2.2],[-1.3,0,-1]
// ];
let equip_position = [
    [0.9,0,-2.7],[-1.75,0,-1.8],[-0.35,0,-0.3],[0.7,0,1.3],[-1.5,0,2.2]
];
let instance_position = [
    [1.1,0,-2.5],[-1.2,0,-0.8],[0.8,0,-0.5],[0.35,0,1.2],[-1.3,0,2.2]
];
let fb_position:any;
let equip_fb_node : any = {};
/**
 * 全局广播
 */
export const globalReceive: any = {
    /**
     *  type 副本类型
     */
    get_fbmonster: (arg)=> {
        if(arg.type == "equip_fb"){
            fb_position = equip_position;
            getEequipFBMonster(arg.index);
            
        }else if(arg.type == "instance_fb"){
            fb_position = instance_position;
            getInstanceFBMonster(arg.index);
        }
    },
    /**
    * 更新节点
    * type 副本类型
    */
    modify_node: (arg) => {
        modify_node(fb_position,arg.type,arg.index);
    }
    ,
    /**
     * 移除节点
     * type 副本类型
     */
    remove_node: (type) => {
        remove_node(fb_position,type);
    }
}

/**
 *  装备副本获得BOSS id
 *  index 关卡
 */
const getEequipFBMonster = ( index ) => {
    let monster = equip_fb_data[index];
    let module_id = [];
    for(let i=0;i<monster.length;i++){
        let boss_id = monster[i].moster_id[2][0]; //获得BOSS id
        module_id.push([monster_base[boss_id].module,monster[i].scale]); //获得怪物的模型ID
    }
    //获得怪物的模型
    createModule(module_id,"equip");
}

/**
 *  九幽获得BOSS id
 *  index 关卡
 */
const getInstanceFBMonster = ( index ) => {
    let monster = instance_drop[index];
    let module_id = [];
    for(let i=0;i<monster.length;i++){
        let boss_id = monster[i].moster_id[0][0]; //获得BOSS id
        module_id.push([monster_base[boss_id].module,monster[i].scale]); //获得怪物的模型ID
    }
    //获得怪物的模型
    createModule(module_id,"instance");
}

/**
 *  获得怪物的模型资源名称
 *  创建怪我模型
 */
const createModule = ( arg,type ) => {
    for(let i=0;i<arg.length;i++){
        equip_fb_node[type+"_fb_"+(i+1)] = {};
        equip_fb_node[type+"_fb_"+(i+1)].module = monster_cfg[arg[i][0]].id;
        equip_fb_node[type+"_fb_"+(i+1)].x = fb_position[i][0];
        equip_fb_node[type+"_fb_"+(i+1)].y = fb_position[i][1];
        equip_fb_node[type+"_fb_"+(i+1)].z = fb_position[i][2];
        equip_fb_node[type+"_fb_"+(i+1)].scale = arg[i][1];
        mgr.create(equip_fb_node[type+"_fb_"+(i+1)],"monster");
    }
}

//更新节点
const modify_node = (arr,type,index) => {
    let module_id = [];
    if(type == "instance"){
        let monster = instance_drop[index];
        for(let i=0;i<monster.length;i++){
            let boss_id = monster[i].moster_id[0][0]; //获得BOSS id
            module_id.push([monster_base[boss_id].module,monster[i].scale]); //获得怪物的模型ID
        }
    }
    if(type == "equip"){
        let monster = equip_fb_data[index];
        for(let i=0;i<monster.length;i++){
            let boss_id = monster[i].moster_id[2][0]; //获得BOSS id
            module_id.push([monster_base[boss_id].module,monster[i].scale]); //获得怪物的模型ID
        }
    }
    for(let i = 0;i<arr.length;i++){
        if(equip_fb_node[type+"_fb_"+(i+1)].module != monster_cfg[module_id[i][0]].id){
            mgr.remove(equip_fb_node[type+"_fb_"+(i+1)]);
            equip_fb_node[type+"_fb_"+(i+1)].module = monster_cfg[module_id[i][0]].id;
            equip_fb_node[type+"_fb_"+(i+1)].scale = module_id[i][1];
            //更新
            mgr.create(equip_fb_node[type+"_fb_"+(i+1)],"monster");
            continue;
        }
        equip_fb_node[type+"_fb_"+(i+1)].module = monster_cfg[module_id[i][0]].id;
        equip_fb_node[type+"_fb_"+(i+1)].scale = module_id[i][1];
        //更新
        mgr.modify(equip_fb_node[type+"_fb_"+(i+1)]);
    }
}

//remove节点
const remove_node = (arr,type) => {
    for(let i = 0;i<arr.length;i++){
        //移除
        mgr.remove(equip_fb_node[type+"_fb_"+(i+1)]);
    }
}

