//==================导入======================
/**pi */
import { Forelet } from "pi/widget/forelet";
import { remove, destory } from "pi/ui/root";
import { Widget } from "pi/widget/widget";
import { getRealNode } from "pi/widget/painter";
import { findNodeByAttr } from "pi/widget/virtual_node";
/**mod */
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { data as db, updata, get as getDB, insert, listen,checkTypeof } from "app/mod/db";

/**app */
import { net_request, net_send, net_message } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";
import { Pi, globalSend, findGlobalReceive } from "app/mod/pi";
import { open, close } from "app/mod/root";

import { sendChatMsg } from "app/scene/base/scene";

import { mapList, initMapList, handScene, updateSelfModule, change_status, setChangeData, olFightOrder } from "app_b/fight_ol/handscene";

import { talk_Base } from "cfg/b/talk_base";
import { vip_advantage } from "cfg/c/vip_advantage";

export const forelet = new Forelet();

let chatDisplay = { "isShow": true };//野外的聊天框显示隐藏
let tab_type = "world_chat";
let curr_list = [],world_list = [],gang_list = [];
let chatFun : any;
let inter;
var input_chat = {
    "role_name":"",
    "role_content":""
}
//各聊天的CD时间
let world_cd = true;
let gang_cd = true;
let curr_cd = true;
let newmessage:any={
    "tab_chat":"",
    "count":[0,0]//队伍第一个 私聊第二个  只统计队伍和私聊
};
//获取最新的聊天
let all_chat = [];
/**
 * @description  获取页面数据
 */
const getData = () => {
    let data: any = {};
    data.chatDisplay = chatDisplay;
    data.vip_advantage = vip_advantage;
    data.gang_list = gang_list;
    data.world_list = world_list;
    data.curr_list = curr_list;
    data.tab_type = tab_type;
    data.all_chat = all_chat;
    return data;
}


//更新将最新消息显示在最下方
const updataScrollTop = function(){
    //chatFun.repeatArrange(this);
    let m:any = forelet.getWidget("app_b-chat-chat");
    // var _node:any = getRealNode(findNodeByAttr(m.tree, "content"));
    // _node.value = input_chat.role_content;
    if(!m)return
    
    var _listNode : any = getRealNode(findNodeByAttr(m.tree, "data-desc" ,"otherList"));
    if(_listNode.scrollHeight-_listNode.parentNode.offsetHeight){
        _listNode.scrollTop=_listNode.scrollHeight-_listNode.parentNode.offsetHeight;
    }
}

//清空聊天信息
const clearValue = () => {
    let m:any = forelet.getWidget("app_b-chat-chat");
    if(!m)return
    var _node : any = getRealNode(findNodeByAttr(m.tree, "data-desc" ,"content"));
    _node.value = ""
}

var createChatRoomFun = function(){
    var module:any = {};
    
    //处理聊天内容
    module.mix_data = function(_data){
        var obj:any ={};
        obj = Common.changeArrToJson(_data);
        obj.chat = Common.fromCharCode(obj.chat);
        if(obj.from && obj.from.length)obj.from[1] = checkTypeof(obj.from[1],"Array")?Common.changeArrToJson(obj.from[1]):obj.from[1];
        if(obj.to && obj.to.length)obj.to[1] = checkTypeof(obj.to[1],"Array")?Common.changeArrToJson(obj.to[1]):obj.to[1];
		if(obj.to && obj.to.length && typeof(obj.to[1].name)!="string")obj.to[1].name=Common.fromCharCode(obj.to[1].name);
		if(obj.from && obj.from.length && typeof(obj.from[1].name)!="string")obj.from[1].name=Common.fromCharCode(obj.from[1].name);
        return obj;
    }

    //判断聊天内容是否为空
    module.contentFun = function(){
        let m:any = forelet.getWidget("app_b-chat-chat");
        let _node:any = getRealNode(findNodeByAttr(m.tree, 'data-desc',"content"));
        var content:any = _node.value;
        if(!content){
            globalSend("screenTipFun",{
                words : "消息不能为空哦！"
            });
            return 0;
        }
        return content;
    }
    
    //世界聊天
    module.world_chat = function(callback){
        var content = module.contentFun();
        if(!content){return;};
        net_request({"param": {"chat":content}, "type": "app/chat@world_chat"},function (data) {
            if (data.error) {
                // if(data.error)Common.backThrow(data.why,tips_back,screenTipFun);
                // if(data.reason) Common.backThrow(data.reason,tips_back,screenTipFun);
                console.log(data.why);
                return;
            };
            // var _data = chatFun.other_mix(data.ok[0][1]);
            // world_list.unshift(_data);
            // module.template_data(_data);
            // input_chat.role_content = '';
            // forelet.paint(getData());
            //console.log(world_list);
        });
    };
    //处理聊天信息
    module.other_mix = function(_data){
        var obj:any ={};
        obj = Common.changeArrToJson(_data);
        obj.chat = Common.fromCharCode(obj.chat);
        obj.role[1] = Common.fromCharCode(obj.role[1]);
        return obj;
    }
    //公会聊天
    module.gang_chat = function(callback){
        var content = module.contentFun();
        if(!content){return;};
        net_request({"param": {"chat":content}, "type": "app/chat@gang_chat"},function (data) {
            if (data.error) {
                // if(data.error)Common.backThrow(data.why,tips_back,screenTipFun);
                // if(data.reason) Common.backThrow(data.reason,tips_back,screenTipFun);
                console.log(data.why);
                return;
            }
            // var _data = chatFun.other_mix(data.ok[0][1]);
            // gang_list.unshift(_data);
            // module.template_data(_data);
            // input_chat.role_content = '';
            // forelet.paint(getData());
            //console.log(gang_list);

        });
    };
    //当前频道聊天
    module.curr_chat = ()=>{
        var content = module.contentFun();
        let portType = "app/chat@current_chat";
        if(!content){return;};
        net_request({"param": {"chat":content, "type": tab_type }, "type": portType},function (data) {
            if (data.error) {
                // if(data.error)Common.backThrow(data.why,tips_back,screenTipFun);
                // if(data.reason) Common.backThrow(data.reason,tips_back,screenTipFun);
                console.log(data.why);
                return;
            }
            // var _data = chatFun.other_mix(data.ok[0][1]);
            // curr_list.unshift(_data);
            // module.template_data(_data);
            // input_chat.role_content = '';
            // forelet.paint(getData());
            //console.log(gang_list);

        });
    }

    module.repeatArrange = (()=>{
        let setOnScroll = (w) => {
                w.tree.link.onscroll = ()=>{
                    let last = w.tree.link.scrollHeight-w.tree.link.clientHeight;
                    if(last === w.tree.link.scrollTop){
                        w.scrollTop = w.tree.link.scrollTop;
                    }
                }
            },
            scrollBottom = (w) => {
                w.tree.link.scrollTop = w.tree.link.scrollHeight-w.tree.link.clientHeight;
                w.scrollTop = w.tree.link.scrollTop;
            };
        return (w,isfirst) => {
            if(isfirst){
                scrollBottom(w);
                setOnScroll(w);
            }else if(w.scrollTop === w.tree.link.scrollTop){
                scrollBottom(w);
            }
        }
    })();

    //计算字节数
    module.bytesNum = function (msg) {
        if (!msg) return 0;
        let Zhlength = 0;// 全角
        let Enlength = 0;// 半角
        let val = msg + '';
        for (let i = 0; i < val.length; i++) {
            if (val.substring(i, i + 1).match(/[^\x00-\xff]/ig) != null)
                Zhlength += 1;
            else
                Enlength += 1;
        }
        return Zhlength * 2 + Enlength;
    }
    return module;
};
chatFun = createChatRoomFun();

export class chat extends Widget {
    /**
	 * @description 更新到dom树后调用，在渲染循环内调用
	 * @example
	 */
	afterUpdate(): void {
        let m:any = forelet.getWidget("app_b-chat-chat");
        updataScrollTop();
    }
    /**
	 * @description 添加到dom树后调用，在渲染循环内调用
	 * @example
	 */
	attach(): void {
        chatFun.repeatArrange(this,true);
    }
     //查看其它玩家
     seeOther(roleId){
         let id = getDB("player.role_id");
         if(roleId == id){
            globalSend("screenTipFun",{
                words: "请在角色界面查看自己!"
            });
            return;
         }
        globalSend("gotoSeeOther", roleId);
        
    }
    //tab切换按钮
    changeColumns = (msg) => {
        if(tab_type == msg.type_m) return;
        tab_type = msg.type_m;
        forelet.paint(getData());
    }
    //发送信息
    sendMessage = ()=>{        
        if(tab_type == "world_chat"){

            if (!world_cd) {
                globalSend("screenTipFun",{
                    words: "聊天消息发送间隔为" +talk_Base.world_cd+ "秒!"
                });
                return;
            }
            world_cd = false;
            setTimeout(function () {
                world_cd = true;
            }, talk_Base.world_cd*1000)
            chatFun.world_chat();
            clearValue();
        }else if(tab_type == "gang_chat"){

            if (!gang_cd) {
                globalSend("screenTipFun",{
                    words: "聊天消息发送间隔为" +talk_Base.gang_cd+ "秒!"
                });
                return;
            }
            gang_cd = false;
            setTimeout(function () {
                gang_cd = true;
            }, talk_Base.gang_cd*1000);
            chatFun.gang_chat();
            clearValue();
        }else if(tab_type == "current_chat"){

            if (!curr_cd) {
                globalSend("screenTipFun",{
                    words: "聊天消息发送间隔为" +talk_Base.curr_cd+ "秒!"
                });
                return;
            }
            curr_cd = false;
            setTimeout(function () {
                curr_cd = true;
            }, talk_Base.curr_cd*1000);
            chatFun.curr_chat();
            clearValue();
        }
    };
    
    //显示隐藏聊天框
    showChat = () => {
        updataScrollTop();
        chatDisplay.isShow = chatDisplay.isShow ? false : true;
        updata("chat.show",chatDisplay.isShow);
        forelet.paint(getData());
        let timer = setTimeout(()=>{
            updata("chat.guide",chatDisplay.isShow);
            clearTimeout(timer);
            timer = null;
        },300)
        
    }

    //聊天内容的输入长度检测
    getFocusInput = function(arg){
        let text = '';
        let num = 60;

        if (chatFun.bytesNum(arg.text) > 60) {
            globalSend("screenTipFun",{
                words: "内容不能超过30个字！"
            });
            return;
        }

        input_chat.role_content = Common.calculate(60,arg.text);
        forelet.paint(getData());
    }
}

// const send = ( arg ) => {
//     let type = {"world_chat":[world_cd,chatFun.world_chat,"world_cd"],
//         "gang_chat":[gang_cd,chatFun.world_chat,"gang_cd"],
//         "current_chat":[curr_cd,chatFun.curr_chat,"curr_cd"]
//     };
//     send(type[tab_type]);
//     if (!arg[0]) {
//         return;
//     }
//     arg[0] = false;
//     setTimeout(function () {
//         arg[0] = true;
//     }, talk_Base[arg[2]]*1000)
//     arg[1]();
// }

//接收后台推送world_chat
net_message("world_chat", (msg) => {
    var _data : any = {},info : any = {};
    _data.chat = Common.fromCharCode(msg.chat);
    if(msg.role_info == "system"){
        info.name = "system";
        info.gang_name = '';
    }else{
        info = Common.changeArrToJson(msg.role_info);
        info.name = Common.fromCharCode(info.name);
        info.gang_name = Common.fromCharCode(info.gang_name);
    }
    _data.role_info = info;
    world_list.unshift(_data);
    if(world_list.length > talk_Base.record_count){
        world_list.pop();
    }
    let playerID = getDB("player").role_id;
    if(playerID == info.role_id){
        sendChatMsg(_data,mapList)
    }
    all_chat.push(["world_chat",_data]);
    // if(Common.isExist(forelet,"app_b-chat-chat_list")&&tab_type == "world_chat"){
    //     forelet.paint(chatFun.getData());
    // }else if(!Common.isExist(forelet,"app_b-chat-chat_list")) {
    //     newmessage["data"] = _data;
    //     newmessage["tab_chat"] = "world"
    //     forelet.paint(chatFun.getData());
    //     clearTimeout(inter);
    //     inter = setTimeout(()=>{
    //         newmessage.data = null;
    //         forelet.paint(chatFun.getData());
    //     },2000)
    // }
    forelet.paint(getData());
});

//接收后台推送gang_chat
net_message("gang_chat", (msg) => {
    var _data : any = {};
    _data.chat = Common.fromCharCode(msg.chat);
    var info : any = Common.changeArrToJson(msg.role_info);
    info.name = Common.fromCharCode(info.name);
    info.gang_name = Common.fromCharCode(info.gang_name);
    _data.role_info = info;
    gang_list.unshift(_data);
    if(gang_list.length > talk_Base.record_count){
        gang_list.pop();
    }
    let playerID = getDB("player").role_id;
    if(playerID == info.role_id){
        sendChatMsg(_data,mapList)
    }
    all_chat.push(["gang_chat",_data]);
    // if(Common.isExist(forelet,"app_b-chat-chat_list")&&tab_type == "gang"){
    //     forelet.paint(chatFun.getData());
    // }else if(!Common.isExist(forelet,"app_b-chat-chat_list")){
    //     newmessage["data"] = _data;
    //     newmessage["tab_chat"] = "gang"
    //     forelet.paint(chatFun.getData());
    //     clearTimeout(inter);
    //     inter = setTimeout(()=>{
    //         newmessage.data = null;
    //         forelet.paint(chatFun.getData());
    //     },2000)
    // } 
    forelet.paint(getData());
    console.log(gang_list);
});

//接收后台推送current_chat
net_message("current_chat", (msg) => {
    var _data : any = {};
    _data.chat = Common.fromCharCode(msg.chat);
    var info : any = Common.changeArrToJson(msg.role_info);
    info.name = Common.fromCharCode(info.name);
    info.gang_name = Common.fromCharCode(info.gang_name);
    _data.role_info = info;
    curr_list.unshift(_data);
    if(curr_list.length > talk_Base.record_count){
        curr_list.pop();
    }
    let playerID = getDB("player").role_id;
    if(playerID == info.role_id){
        sendChatMsg(_data,mapList)
    }
    all_chat.push(["current_chat",_data]);
    // if(Common.isExist(forelet,"app_b-chat-chat_list")&&tab_type == "gang"){
    //     forelet.paint(chatFun.getData());
    // }else if(!Common.isExist(forelet,"app_b-chat-chat_list")){
    //     newmessage["data"] = _data;
    //     newmessage["tab_chat"] = "gang"
    //     forelet.paint(chatFun.getData());
    //     clearTimeout(inter);
    //     inter = setTimeout(()=>{
    //         newmessage.data = null;
    //         forelet.paint(chatFun.getData());
    //     },2000)
    // } 
    forelet.paint(getData());
    console.log(gang_list);
});

//向数据库中插入聊天字段
insert("chat",{
    show:true,
    guide: true
});

const read = (callback?) => {
    let msg = { "param": {}, "type": "app/chat@read" };
    net_request(msg, function (data) {
        if(data.error){

        }else if(data.ok){
            var _data:any = Common.changeArrToJson(data.ok);
            var fun = function(list){
                for(var k=0;k<list.length;k++){
                    if(list[k]&&list[k].length){
                        var m:any = Common.changeArrToJson(list[k]);
                        if(m.chat){
                            list[k] = chatFun.mix_data(list[k]);
                            var info : any = {};
                            if(m.role_info == "system"){
                                
                                info.name = "system";
                                info.gang_name = '';
                            }else{
                                info= Common.changeArrToJson(m.role_info);
                                info.name = Common.fromCharCode(info.name);
                                info.gang_name = Common.fromCharCode(info.gang_name);
                            }
                            list[k].role_info = info;
                        }else{
                            list[k] = chatFun.mix_data(list[k]);
                        }
                        
                    }
                }
                return list;
            }
            world_list = fun(_data.world_chat);
            gang_list = fun(_data.gang_chat);
            if(world_list.length == 0 && gang_list.length == 0){
                let player = getDB("player");
                let system : any = {};
                let info : any = {};
                system.chat = "欢迎来到仙之侠道！！！";
                info.name = "system";
                info.gang_name = "";
                system.role_info = info;
                all_chat.push(["system",system]);
            }else if(world_list.length !== 0){
                all_chat.push(["world_chat",world_list[0]]);
            }else if(gang_list.length !== 0){
                all_chat.push(["gang_chat",gang_list[0]]);
            }
            if(callback)callback();
            console.log("=======================聊天数据==========================");
            console.log(_data);
            forelet.paint(getData());
        }
    })
}

export const globalReceive :any = {
    "initChat" : () => {
        updata("chat.show",true);
        tab_type = "world_chat";
        forelet.paint(getData())
    }
}

read()
// listenBack("app/pve/wild@read", function (data) {
//     console.log(data);
//     forelet.paint(getData());
// });
forelet.listener = (cmd) => {
	// if(cmd !== "add")
    // 	return;
	forelet.paint(getData());
}