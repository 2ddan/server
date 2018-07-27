0/**
 * 排行榜
 */
//======================================导入
import { updata, get, insert } from "app/mod/db";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { globalSend, Pi, cfg } from "app/mod/pi";
import { net_request, net_message } from "app_a/connect/main";
import { open } from "app/mod/root";

import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { resetcanvas } from "app/scene/base/scene";
import { role_base } from "fight/b/common/role_base";

import { equip_star_achieve } from "cfg/c/equip_star_achieve";
import { pet_upgrade } from "cfg/b/pet_upgrade";
import { pet_module } from "cfg/b/pet_module";
import { vip_advantage } from "cfg/c/vip_advantage";

export const forelet = new Forelet();

let baseData: any = {};
let tabSwitch = "fight_power_rank";
let treasureBreak = [];
export class Ranking extends Widget {
    
    //切换面板的更新数据
    changeTab(arg) {
        if (arg.type_m == tabSwitch) return;
        let data : any;
        let w = forelet.getWidget("app_c-rank-main-main");
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app-scene-base-scene") {
                data = w.children[i];
                break;
            }
        }
        if(data)
            resetcanvas(data);
        tabSwitch = arg.type_m;
        if(!baseData[tabSwitch]){
            read(tabSwitch);
        }
        // if(baseData[arg.type_m][1][0]){
        //     let id = baseData[arg.type_m][1][0].role_id;
        //     treasureAndPet(id,tabSwitch);
        // }
        //更新数据
        forelet.paint(getData());
    }

    //赞或踩
    isTags(arr){
        let rank_base = cfg.rank_base.rank_base;
        let limit = rank_base.limit;
        let player = get("player");
        if(player.rank_count == limit){
            globalSend("screenTipFun",{
                words:"次数已用完"
            });
            return;
        }
        likeOrBoring(arr);
    }
    //查看其它玩家
    seeOther(roleId){
        globalSend("gotoSeeOther", roleId);
        
    }
}

//神兵榜和灵宠榜的第一名数据单独获取 传第一名的ID
const treasureAndPet = (sid,type) =>{
    net_request({"type":"app/role@role_detail","param":{"id":sid} },(data) => {
        if(data.error){
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }else if(data.ok){
            let result : any = Common.changeArrToJson(data.ok);
            
            if(type == "treasure_rank"){
                baseData[type][1][0].treasure = Common.changeArrToJson(result.treasure_info)
            }
            if(type == "pet_rank"){
                baseData[type][1][0].pet = Common.changeArrToJson(result.pet)
            }
            let equip_id = result.equip_info[0][1][0][0]; //只取第一名的武器ID 然后根据ID去查找对应的武器模型
            let equip_info = Pi.sample[equip_id];
            let all_star = result.equip_info[2][1];
            let ensoul_class = result.equip_info[6][1];
            baseData[type][1][0].equip_info = equip_info;
            baseData[type][1][0].clothes = result.clothes;
            baseData[type][1][0].soul_level = star_achieve(all_star);
            baseData[type][1][0].ensoul_class = ensoul_class;
            forelet.paint(getData())
        }
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

//获取数据
const getData = () => {
    let data: any = {};
    data.baseData = baseData;
    data.tabSwitch = tabSwitch;
    data.treasureBreak = treasureBreak;
    data.role_base = role_base;
    data.pet_module = pet_module;
    data.pet_upgrade = pet_upgrade;
    data.vip_advantage = vip_advantage;
    return data;
}

//处理排行榜信息
const dealRankInfo = ( msg,arg) => {
    for (let i = 0; i < msg[0]; i++) {
        baseData[arg][1][i] = Common.changeArrToJson(msg[1][i]);
        baseData[arg][2] = getMyRank(baseData[arg][1]);
        // if(arg == "treasure_rank"){
        //     treasureBreak[i] = treasureSite(baseData[arg][1][i]);
        // }
    }  
}

const read = ( type? ) => {
    // let type = ["fight_power_rank","level_rank","equip_rank","treasure_rank","pet_rank"];
    type = type ? type : "fight_power_rank";
    net_request({ type: "app/role/rank@read", param: {"type" : type} }, (data) => {
        if (data.error) {
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }
        baseData[type] = Common.changeArrToJson(data.ok)[type];
        if(baseData){
            dealRankInfo(baseData[type],type);
            if(baseData[type][1][0]){
                let id = baseData[type][1][0].role_id;
                treasureAndPet(id,type);
            }
        }
        forelet.paint(getData());

    });
    
}

//获得自己的排名 如果没有表示未上榜
const getMyRank = ( msg ) => {
    let player = get("player");
    for(let i=0;i<msg.length;i++){
        if( msg[i].role_id == player.role_id ) return i+1;
    }
    return 0;
}

//获取神兵八卦当前卦位
const treasureSite = ( msg ) => {
    let hexagram = msg.treasure_level;
    if (hexagram[0] <= 0) return 1;
    for(let i=0;i<hexagram.length;i++){
        if(hexagram[i-1] > hexagram[i]) return i+1;
    }
    return 1;
}

//献鲜花/扔鸡蛋  0 表示鲜花 1表示鸡蛋
const likeOrBoring = (arr) => {
    let msg = arr.split(",");
    let arg = {
        "param": { "id": msg[0] - 0, "index": msg[1] - 0 },
        "type": "app/role/rank@award"
    };
    net_request(arg, (data) => {
        if(data.error) {
            globalSend("screenTipFun", { words: data.why });
            console.log(data.why);
            return;
        }else if(data.ok) {
            let prop : any = Common.changeArrToJson(data.ok);
            let result =  Common_m.mixAward(prop);
            result.auto = 1;
            globalSend("showNewRes",{
                result, function (result1) {
                    result1.open();
                }
            });
            updata("player.rank_count",prop.rank_count);
            forelet.paint(getData());
        }
    })
}

//更新 点赞数和扔鸡蛋数 :后台主动推
net_message("rank_praise_trample",(msg) =>{
    for(let i in baseData){
        for(let j=0;j<baseData[i][1].length;j++){
            if(baseData[i][1][j].role_id == msg.id){
                baseData[i][1][j][msg.type[0]] = msg.type[1];
            }
        } 
    }
    forelet.paint(getData());
});

net_message("rank_info",(msg) => {
    for(let i in msg){
        if(!baseData[i]){
            return;
        }
        dealRankInfo(msg[i],i);
        let id = baseData[i][1][0].role_id;
        treasureAndPet(id,i);
    }
    forelet.paint(getData());
})

//*******************************************************外部接口,点击排行打开排行榜的入口
export const globalReceive: any = {
    gotoAllRank() {
        tabSwitch = "fight_power_rank";
        forelet.paint(getData())
        open("app_c-rank-rank");
    },
    otherRoleClose(){
        let data:any;
        let w = forelet.getWidget("app_c-rank-main-main");
        if(!w){
            return;
        }
        for (let i = 0; i < w.children.length; i++) {
            if (w.children[i].name == "app-scene-base-scene") {
                data = w.children[i];
                break;
            }
        }
        resetcanvas(data);
    }
}

// ================================ 立即执行
read();
/**
 * @description 初始化数据库排行榜字段
 */
insert("rank", []);
/**
 * @description 监听排行榜数据变化
 */

/**
 * @description 获取排行榜数据
 */
// listenBack("app/role/rank@read",read);