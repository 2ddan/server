//mod
import { data as db, updata, get, insert, listen ,checkTypeof} from "app/mod/db";
import { Pi, globalSend } from "app/mod/pi";

//scene
import { mgr_data, mgr } from "app/scene/scene";
import { Util } from "app/mod/util";
import * as root from "pi/ui/root";
import { Common } from "app/mod/common";
import { forelet } from "app_b/wild/wild";
import { SMgr } from "app_b/fight_ol/same";
import { data as localDB, get as getDB } from "app/mod/db";
import { role_base } from "fight/b/common/role_base";
import { FMgr } from "fight/a/fight";
import { cuurShow } from "app/scene/ui_fun";

import { base_cfg } from "cfg/a/base_cfg";

import { getGlobal } from "pi/widget/frame_mgr";
import { now as timeNow } from 'pi/lang/time';


let node_list = {}; //存储场景上的2D节点
let drop_funarr = []; //存储当前掉落的物品，阻止连续播放(当前没有播放完就播放下一次);
let circleArr : any = [];
let targetPosition = []; //物品掉落点
let fightStartPosition = []; //初始fighter点
let fighterPosition = []; //fighter移动点
let damageTef: any = {}; //伤害飘字
let random : any = {}; //伤害飘字列表
let newPosition = [];
let propArr = [];
let star_position = [];
let flag = false;
let list = [[-50,0,1],[-110,0,2],[-170,0,3],[-75,60,4],[-135,60,5],[-195,60,6],[-25,-60,1],[-85,-60,3],[-145,-60,2]];//道具节点位置
let quality = {1:"",2:"eff_ui_guangzhu_lv",3:"eff_ui_guangzhu_lan",4:"eff_ui_guangzhu_zi",5:"eff_ui_guangzhu_cheng",6:"eff_ui_guangzhu_hong"};


//场景表现事件列表

export const globalReceive :any = {
	
    /**
     * 切换场景时直接移除
     */
    removeProp:()=>{
        if(propArr){
            remove_nodes_fun(propArr);
        }
    }
}


const perform = () => {
    let frame = getGlobal();
    let timer = Date.now();
    frame.setPermanent(()=>{
        let time = Date.now();
        if(time - timer < 38 || SMgr.pause)
            return;
        timer = time;
        // let nullObj = 0;
        // if(time > timer){
            for(let i in cuurShow){
                if(cuurShow[i]){
                    cuurShow[i].fun(cuurShow[i].param,i);
                    // nullObj++;
                    // timer = time + 50;
                }
            }
            // if (nullObj == 0) {
            //     cuurShow.splice(0, cuurShow.length);
            // }
            if(Date.now()-timer < 10){
                for(let i =0,leng = cuurShow.length;i<leng;i++){
                    
                    if(!cuurShow[i]){
                        cuurShow.splice(i,1);
                        i--;
                        leng--;
                    }
                }
            }
        // }
    });
}
perform();

// export let cuurShow = []; //战斗中UI的表现列表

//////////////////////////////场景上的2D节点//////////////////////
export const node_fun = () => {
    
    for(let i = 0;i<propArr.length;i++){
        let career_id = get("player.career_id");
        let icon;
        if(propArr[i].folder_pos == "Equip"){
            icon = propArr[i].drop_module[propArr[i].career_id.indexOf(career_id)];
        }else{
            icon = propArr[i].drop_module;
        }
        
        node_list["drop_out_"+i] = {};
        //倒计时背景图片
        //节点位置
        node_list["drop_out_"+i].x = circleArr[i][0];
        node_list["drop_out_"+i].y = circleArr[i][1];
        node_list["drop_out_"+i].z = 0;
        node_list["drop_out_"+i].scale = 1;
        node_list["drop_out_"+i].isOnce = true;
        node_list["drop_out_"+i].Gscale = 1;
        node_list["drop_out_"+i].model = icon;
        node_list["drop_out_"+i].guangzhu = quality[propArr[i].quality];
        //创建.
        mgr.create(node_list["drop_out_"+i],"drop_out");
    }
}
//remove单个节点
let remove_node_fun = (num : number) => {
    mgr.remove(node_list["drop_out_"+num]);
}

//remove所有节点
let remove_nodes_fun = (arr) => {
    for(let i = 0;i<arr.length;i++){
        if(arr[i] !== "104"){
            //移除
            let time1 = Date.now();
            mgr.remove(node_list["drop_out_"+i]);
            let time2 = Date.now();
            // console.log("掉落飞行的modify的时间" + i + " + "+  (time2 - time1))
        }
    }
}

//更新节点
let drop_out_effect = (arr,msg) => {
    for(let i = 0;i<circleArr.length;i++){
        if(circleArr[i] !== "104" && circleArr[i] != 0){
            //节点位置
            node_list["drop_out_"+i].x = msg[i][0];
            node_list["drop_out_"+i].y = msg[i][1];
            node_list["drop_out_"+i].z = msg[i][2];
            node_list["drop_out_"+i].Gscale = 0.1;
            //更新
            mgr.setOnlyPos(node_list["drop_out_"+i],[msg[i][0],msg[i][2],msg[i][1]]); //更新模型position
            if(node_list["drop_out_"+i]._show && node_list["drop_out_"+i]._show.old.children[1].ref){
                mgr.setDamage(node_list["drop_out_"+i],0.1,1); //更新模型的缩放
            }
            // mgr.modify(node_list["drop_out_"+i]);
        }
    }
    
}

//计算坐标
let Circel = {
    circelBox: new Array(),

    //随机圆形区域坐标
    randomCirclePos : function (r, a, b) {
        while (true) {
            var x = Math.random() * 2 * r + (a - r),
                y = Math.random() * 2 * r + (b - r);
            if (Circel.isCircle(r, a, b, x, y)) {
                return [x, y]
            }
        }
    },

    //是否在圆内
    isCircle : function(r, a, b, x, y) {
        return (x - a) * (x - a) + (y - b) * (y - b) <= r * r;
    },

    createRandomNew: function (x,y) {
        var newCircel;
        var bTouch;
        //随机一个点
        newCircel = Circel.randomCirclePos(2.3,x,y);
        bTouch = false;
        
        for(var c = 0; c < Circel.circelBox.length; c++) {
            var oldCircel = Circel.circelBox[c];

            var distance = Math.sqrt(Math.abs(Math.pow(newCircel[0]-oldCircel[0], 2)) +
            Math.abs(Math.pow(newCircel[1]-oldCircel[1], 2)));
            // console.log("两个物品之间的距离~~~~",distance);
            if (distance <= 0.3){
                bTouch = true;
                break
            }
        }

        if (false == bTouch) {
            Circel.circelBox.push(newCircel);
            return newCircel;
        }else{
            Circel.createRandomNew(targetPosition[0],targetPosition[1]);
        }
    }
    
};

export const drop_outFun = (arg,msg,fighter,callback ?) => {
    // if(!false){
    //     return;
    // }    
    if (drop_funarr.length == 0) {
        // console.log("开始展示掉落效果~~~~~~！在此计算需不需要出现掉落效果")
        if (arg && arg[0]) {
            let award = arg,
                sample,
                sample1;
                propArr = [];
            //遍历prop 去重
            for (let i = 0, len = award.length; i < len; i++) {
                if (i > 8) break;
                sample = Pi.sample[award[i][0][0] || award[i][0]];
                let career_id = get("player.career_id");
                let count = sample.type === "equip" ? 1 : (award[i][0][1] ? award[i][0][1][0] : award[i][1]);
                for (let j = i + 1; j < len; j++) {
                    sample1 = Pi.sample[award[j][0][0] || award[j][0] ];
                    if ((sample.id || sample.sid) === (sample1.sid || sample1.id)) {
                        j = ++i;
                        count += sample1.type === "equip"? 1 : (award[i][0][1] ? award[i][0][1][0] : award[i][1]);
                    }
                }
                if(sample.folder_pos == "Equip" ? sample.drop_module[sample.career_id.indexOf(career_id)] == "undefined" : sample.drop_module == "undefined") continue
                if((sample.id || sample.sid) == 150002) continue;
                propArr.push(sample);
                globalSend("goodsTip", {
                    words: [ sample.id || sample.sid, count ],
                    "timeOut":1200
                });
            }

            drop_funarr.push(arg);
            if(propArr.length != 0){
                circleArr = [];
                Circel.circelBox = [];
                targetPosition.push(msg[0],msg[1],msg[2]);
                fightStartPosition = [];
                // console.log("开始计算掉落的物品的随机坐标~~~~!，计算开始")
                fightStartPosition.push(fighter[0],fighter[1],fighter[2],fighter[3])
                for(let i=0;i<propArr.length;i++){
                    if(propArr[i] !== '104'){
                        // console.log("在此是计算后的掉落物品的初始坐标~~~~~!",i,Circel.circelBox)
                        Circel.createRandomNew(msg[0],msg[1]);
                    }
                }
                circleArr = Circel.circelBox;
                // console.log("start position",fighterPosition);
                // console.log("位置！！！",Circel.circelBox,propArr)
                // console.log("坐标计算完毕，开始创建模型！展示到场景上~~~~~")                
                node_fun();
                let time = mgr_data.name == "wild" ? 1500 : 2000;
                let set1 = setTimeout(()=>{
                    flag = true;
                    callback && callback();
                    clearTimeout(set1);
                    set1 = undefined;
                },time)
                
            }else{
                drop_funarr = [];
            }
        }
    }
}


export class ShowFunTable {
    /**
	 * @description 掉落效果
	 */
	static fighter_position (msg,index){
        if(!flag) return;
        fighterPosition = [];
        fighterPosition.push(msg.msg[0],msg.msg[1],msg.msg[2]);
        if(star_position.length == 0){
            star_position = [fighterPosition[0],fighterPosition[2]];
        }
        let empty = 0;
        newPosition = [];
        let speed = 0.55;
        let mark = false;
        // console.log('fighter的位置++++',fighterPosition)
        for(let i=0;i<circleArr.length;i++){
            //控制模型飞到人物的胸口
            let high = fightStartPosition[3];
            //两点之间的直线距离
            let dist =  Math.sqrt(Math.pow((fighterPosition[2] - circleArr[i][1]),2) + Math.pow((fighterPosition[0] - circleArr[i][0]),2));
            
            if(star_position.length !== 0 && star_position[0] !== fighterPosition[0] && star_position[1] !== fighterPosition[2]){
                speed = speed+0.1;
                // console.log("速度的变化+++++++++",speed)            
            }
            //每一步的跨度
            dist = (speed / dist);
            // console.log("两点之间的直线距离+++++++++",i,dist)
            
            high = high+0.05;
            if(high >= fightStartPosition[3]){
                high = fightStartPosition[3];
            }
            // console.log('模型的飞行高度++++',high,fightStartPosition[3])
            if(dist >= 1){
                newPosition[i] = [fighterPosition[0],fighterPosition[2],high];
                circleArr[i] = 0;
                remove_node_fun(i);
                continue;
            }
            if(circleArr[i] != 0){ 
            //移动之后的坐标 = 原点坐标 + 跨度
                circleArr[i][0] += (fighterPosition[0] - circleArr[i][0]) * dist;
                circleArr[i][1] += (fighterPosition[2] - circleArr[i][1]) * dist;
                // console.log("移动之后的坐标+++++++++"+i,circleArr[i][0],circleArr[i][1],fighterPosition,star_position)
                newPosition[i] = [circleArr[i][0],circleArr[i][1],high];
            }
        }

        if(mgr_data.name !== "wild" && mgr_data.name !== "fight"){
            remove_nodes_fun(newPosition);
            delete cuurShow[index]
        }
        for(let i=0;i<circleArr.length;i++){
            if(circleArr[i] != 0){
                mark = true;
            }
        }
        if(!mark){
            delete cuurShow[index];
        }
        for(let n=0;n<circleArr.length;n++){
            if(circleArr[n] == 0){
                empty++;
            }
            if(empty == circleArr.length){
                
                drop_funarr = [];
                flag = false;
                return;
            } 
        }
        drop_out_effect(propArr,newPosition);
    }

    /**
     * 
     * @param node 
     */
    // 创建伤害字体节点
    static createDamageNode(arg,index){
        if(!arg.node._show.old.ref){
            mgr.create(arg.node,"damage");           
            ShowFunTable.damageCartoon(arg,index);
        }else{
            ShowFunTable.damageCartoon(arg,index);
        }
    }
    /**
     *  冒字方法
     */
    static damageCartoon(arg, index) {
        let p, s, a, o , x;
        let cfg: any = base_cfg;
        let isWhile = true;
        if (arg.type == 1) {
            p = cfg.buffValueP;
            s = cfg.buffValueS;
            a = cfg.buffValueA;
        } else if (arg.type == "drop") {
            p = cfg.dropP;
            s = cfg.dropS;
            a = cfg.dropA;
        } else {
            //对怪物的伤害冒字
            if(arg.node.type == "damage"){
                if(!random[index]){
                    let Rand = Math.random();
                    random[index] = 1 + Math.round(Rand * 3); //四舍五入
                }
                
                p = cfg.damage_type[random[index] - 1].damagePZ; //高度
                x = cfg.damage_type[random[index] - 1].damagePX; //左右偏移量
                s = cfg.damage_type[random[index] - 1].scale; //缩放
                o = cfg.damage_type[random[index] - 1].opacity //透明度
                a = {"value":[254,254]};
            }else if(arg.node.type == "damageM"){  //怪物对人物的伤害冒字
                p = cfg.damageM_type[0].damagePZ //高度
                x = cfg.damageM_type[0].damagePX //左右偏移量
                s = cfg.damageM_type[0].scale //缩放
                o = cfg.damageM_type[0].opacity //透明度
                a = {"value":[254,254]};
            }else if(arg.node.type == "critical"){ //暴击的伤害冒字
                p = cfg.critical_type[0].damagePZ //高度
                x = cfg.critical_type[0].damagePX //左右偏移量
                s = cfg.critical_type[0].scale //缩放
                o = cfg.critical_type[0].opacity //透明度
                a = {"value":[254,254]};
            }else if(arg.node.type == "stealHP"){ //其他的伤害冒字
                p = {"value":[40,5,5,5,0,0,0,10,15,15,15,20,20,20]};
                s = {"value":[ 0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75]};
                a = {"value":[254,254]};
                o = {"value":[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]};
            }else{
                p = {"value":[40,5,5,5,0,0,0,10,15,15,15,20,20,20]};
                s = {"value":[ 0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75]};
                a = {"value":[254,254]};
                o = {"value":[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]}
            }
        }

        let node = arg.node;
        if (!node.frameIndex) {
            node.frameIndex = 0;
        }
        let frameIndex = node.frameIndex;
        // frameIndex = Math.floor(frameIndex * cuurShow[index].delta);
        if(x){node.x = node.x + x.value[frameIndex];}
        node.z = node.z + p.value[frameIndex];
        node.scale = s.value[frameIndex];
        node.transp = a.value[frameIndex];
        if(o) {node.opacity = o.value[frameIndex];}
        // if(frameIndex >= p.value.length-1){
        //     console.log(111111111111111,frameIndex,p.value.length-1);
        // }
        if (frameIndex >= p.value.length-1) {
            delete cuurShow[index - 0];
            delete random[index - 0];
            
            mgr.remove(arg.node,node.scene);
            return
        }
        mgr.modify(node);
        // mgr.setDamage(node, node.scale);
        // mgr.setPos(node, [node.x / 100, node.y / 100, node.z / 100]);
        node.frameIndex++;
        
    }

    //BOSS血条
    static targetHead(arg, index, now) {
        let headMesh = arg.head,
            fighter,
            target;
        fighter = typeof(arg.f.fighter) == "number" ? FMgr.scenes.fighters.get(arg.f.fighter) : arg.f.fighter;
        target = arg.f.curTarget ? FMgr.scenes.fighters.get(arg.f.curTarget) : arg.f.target;
        
        if(target && fighter){
            if (target.hp <= 0 || fighter.hp <= 0 ) {
                mgr.remove(headMesh);
                delete cuurShow[index];
                return;
            }
        }

        if(arg.f.curTarget == -1 && headMesh ){
            // console.log(" targethead",headMesh,arg.f);
            mgr.remove(headMesh);
            delete cuurShow[index];
            return;
        }

        if (!headMesh && target) {
            if (fighter && fighter._show && fighter._show.old.ref && typeof target != "number" && target._show && target._show.old && target._show.old.ref && target.show_type == 1) {
                headMesh = {};
                let width = mgr_data["div"][mgr_data.name]["width"],
                    height = mgr_data["div"][mgr_data.name]["height"];
                headMesh.x = mgr_data.name == "wild" ? width * 0.2 - 40.5 :  width * 0.2 - 80.5;
                headMesh.y = mgr_data.name == "wild" ? 10 : height * ((0 - 1) * 173/266) + 36.9586;
                headMesh.z = 0;
                headMesh.scale = mgr_data.name == "wild" ? (mgr_data.scale * (2/3)) : (mgr_data.scale * (2/2.7) + 0.11);
                headMesh.level = target.level;
                headMesh.name = target.name;
                headMesh.hp = target.hp > 0 ? parseInt(target.hp) : 0;
                headMesh.max_hpCount = target.max_hpCount;
                // if (mgr_data.limitTime)
                //     headMesh.time = Util.getDuration(Math.floor((mgr_data.limitTime - now) / 1000));
                mgr.create(headMesh, "target_head");
                arg.head = headMesh;
            }
            return;
        }

        if(target){
            // headMesh.head = target.head;
            headMesh.level = target.level;
            headMesh.name = target.name;
            headMesh.hp = target.hp > 0 ? parseInt(target.hp) : 0;
            headMesh.max_hpCount = target.max_hpCount;
            let h = Common.numberCarry(parseInt(headMesh.hp), 1000000) + "/" + Common.numberCarry(parseInt(headMesh.max_hpCount), 1000000);
            let visible = (headMesh.hp / headMesh.max_hpCount <= 0) ? false : true;
            mgr.setDamage(headMesh, [headMesh.hp / headMesh.max_hpCount, 1, 1], 1)
            mgr.setText(headMesh,h,5);
            // mgr.modify(headMesh);
        }
        
    }
}