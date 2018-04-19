//==================导入======================
/**pi */
import { Forelet } from "pi/widget/forelet";
import { remove, destory } from "pi/ui/root";
import { Widget } from "pi/widget/widget";

/**mod */
import { Common} from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { data as db, updata, get as getDB, insert, listen } from "app/mod/db";

/**app */
import { net_request, net_send, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { Pi, globalSend, findGlobalReceive } from "app/mod/pi";
import { open, close } from "app/mod/root";

import { skill_describe } from "cfg/b/skill_describe";// 技能描述表
import { skill_level } from "cfg/b/skill_upgrade";// 技能等级表
import { function_open } from "cfg/b/function_open";
import { function_guid } from "cfg/b/function_guid";
import { Music } from "app/mod/music";
import { wild_mission } from "fight/b/common/wild_mission_cfg";

export const forelet:any = new Forelet();
let playerLevel = 0,//人物等级
    skill=[],// 技能数组
    paintNumeral = 0,//页面渲染次数(只在第一次渲染变化)
    money = 0,
    diamond = 0,
    skill_icon_id = skill_level[Object.keys(skill_level)[0]][1].prop_id,
    canUp = true;



/**
 * @description  获取页面数据
 */
const getSkillHtmlData = () =>{
    let data:any={};
    data.skill=skill;// 技能数组
    data.skill_describe=skill_describe;
    data.playerLevel=playerLevel;//人物等级
    data.Pi = Pi;
    data.strokes = strokesCondition;//大招当前激活条件
    data.skill_coin = getSkillCount(skill_icon_id);//技能升级材料
    data.money = money;
    data.diamond = diamond;
    data.id = skill_icon_id;
    data.fun_id = getDB("open_fun.id");
    data.function_open = function_open;
    return data;
}

// /**
//  * @description  计算大招当期激活条件
//  */
const strokesCondition = () =>{
    let data = skill[skill.length-1];
    let arr = [];
    for(let i=0,len=data.activate_other.length;i<len;i++){
        for(let v of skill){
            if(data.activate_other[i][0] == v.id){
                if(data.activate_other[i][1] > v.level){
                    arr.push(0);
                }else{
                    arr.push(1);
                }
                break;
            }
           
        }
        
    }
    return arr;
}

/**
 * @description  计算技能等级属性(直接放入技能描述)
 */
const countSkill = (id,level) =>{
    let describe = skill_describe[id].skill_up_des, // 技能效果描述
        str="";// 技能对象效果集合
    describe.replace(/[A-Z]/g,function(e){str+=e;return arguments[0]});
    for(let k=0;k<str.length;k++){
        let val = skill_describe[id].effect_des[str[k]];
        describe = describe.replace(str[k],parseFloat((val[0] + val[1] * level).toFixed(2)));// 计算技能等级属性
    }
    return describe;
}



/**
 * @description  处理原始数据
 */
const initData = (data) => {
    let _data;
    skill=[];
    if (data["skill_tuple"])_data = data["skill_tuple"];
    else _data = data[0][1];
    
    let player = getDB("player");
    playerLevel = player.level;
    money = player.money;
    diamond = player.diamond;


    for(let i = 0,arr;arr=_data[i];i++){
        let skillOBJ:any = {};// 技能对象
        let full_level = 0;//技能满级等级
        skillOBJ.id = arr[0]; // 技能id
        skillOBJ.level = arr[1]; // 技能等级
        skillOBJ.icon = skill_describe[arr[0]].skill_icon; // 技能图标
        skillOBJ.name = skill_describe[arr[0]].skill_name; // 技能名字
        skillOBJ.describe = countSkill(arr[0],arr[1]); // 技能效果描述放入技能对象
        skillOBJ.activate = skill_describe[arr[0]].activate_level; // 激活需要的人物等级
        skillOBJ.activate_other = skill_describe[arr[0]].activate_other_level; // 激活需要的人物等级
        skillOBJ.up = skill_level[arr[0]]; // 技能升级对象
        for(var key in skillOBJ.up){
            full_level += 1;
        }
        skillOBJ.full_level = full_level; // 技能满级等级
        
        skill.push(skillOBJ);
    }
    let id = skill_level[_data[0][0]][1]["prop_id"];//技能升级材料ID
    skill_icon_id = id;
    updata("skill", _data);// 更新数据到前台数据库
}

//获得技能升级材料数量
var getSkillCount = function(id){
    var count = 0;
    var c = getDB('bag*sid='+id).pop();//材料 
     c &&  (count = c.count);
    return count;
}

// let _skill_coin = false;
// listen("bag*sid="+skill_icon_id,()=>{
//     let guide = getDB("guide");
//     if(guide.list && guide.list.split("-").indexOf("8")>-1){
//         return;
//     }
//     let count = getSkillCount(skill_icon_id);
//     if(count >= skill[0].up[skill[0].level].number){
//         if(!_skill_coin){
//             _skill_coin = true;
//             updata("skill.guide",1);
//         }
//     }else{
//         if(_skill_coin){
//             _skill_coin = false;
//             updata("skill.guide",0);
//         }
//     }
// })

listen("skill", () => {
    forelet.paint(getSkillHtmlData());
});
listenBack("app/role/skill@read",initData);
// 监听人物数据变化
listen("player.level", () =>{
    let lv = getDB("player").level;
    if(playerLevel >= lv){
        return;
    }
    playerLevel = lv;
    // let skill = getDB("skill");
    // for(let i = 1,len = skill.length-1;i<len;i++){
    //     if(!skill[i][1] && playerLevel>=function_open["skill"+(i+1)].level_limit){
    //         activate(i+1);
    //         return;
    //     }
    // }
    forelet.paint(getSkillHtmlData());
});

/**
 * @description 设置首次打开监听，并设置it1
 */
forelet.listener = (cmd,w) => {
    if(!paintNumeral)return;
    paintNumeral++;
    forelet.paint(getSkillHtmlData());
    
};

/**
 * @description  设置广播消息接收接口
 */
export const globalReceive: any = {
    gotoSkill:()=> {
        forelet.paint(getSkillHtmlData());
        open("app_b-skill_up-skill_up");
        globalSend("openNewFun", "skill2");
    },
    "activateSkill": (index) => {
        if(index>4){return;}
        activate(index);
    }
}


// ===========================技能升级类
export class skillUp extends Widget {
    // 技能升级
    up = (arg,num) => {
        if(!canUp) return;
        if(!arg){
            globalSend("screenTipFun", { words: "请先提升角色等级" });
            return false;
        }

        let i = getSkillCount(skill_icon_id);
        if(i < num ){
            // globalSend("screenTipFun", { words: "材料不足" });
            globalSend("gotoGetWay",skill_icon_id);
            return false;
        }

        canUp = false;
        let timer = setTimeout(function(){
            canUp = true;
            clearTimeout(timer);
            timer = null;
        },500);

        let msg = {"param":{"index": Number(arg)}, "type":"app/role/skill@level_up"}
        net_request(msg, function (data) {
            if (data.error) console.log(data.why);
            else if (data.ok) {
                Music.skillSound("other_one");
                let costData = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(costData);
                let DB=[data.ok[1]];
                initData(DB);
            }
        });
    }
    // 大招技能激活
    activate = () => {
        activate(5);
    }
    //返回事件
    goback(arg){
		close(arg.widget)
    }
     //获取途径
     gotoGetWay() {
        globalSend("gotoGetWay",skill_icon_id);
    }
    //技能未激活提示
    openTip(index){
        let level = getDB("player.level");
        let limit_level = function_open["skill"+index].level_limit;
        let fun_id = getDB("open_fun.id");
        if( limit_level > level){
            globalSend("screenTipFun", { words: `${limit_level}级开放` });
            return;
        }else if(function_open["skill"+index].id > fun_id){
            for(let len = function_guid.length,i = function_open["skill"+index].id-1;i>-1;i--){
                if(function_guid[i].stage_id){
                    let guard_name = wild_mission[function_guid[i].stage_id].guard_name.split(",");
                    globalSend("screenTipFun", {
                        words: `通过${guard_name[1]} ${guard_name[0]}开放`
                    });
                    return;
                }
            }
            
        }else{
            globalSend("screenTipFun", { words: `请在主页面新功能激活该技能` });
        }
    }
}

//技能激活
const activate = function (arg) {
    if(arg){
        let msg = {"param":{"index": Number(arg)}, "type":"app/role/skill@activate"}
        net_request(msg, function (data) {
            if (data.error) console.log(data.why);
            else if (data.ok) {
                initData(data.ok);
            }
        });
    }
}
