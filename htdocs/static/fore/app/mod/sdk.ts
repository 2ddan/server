import { GCQuickSDK } from "pi/browser/quickSDK";
import { ajax } from "pi/lang/mod";
import { get as getDB } from "./db";
import { Common } from "./common";

const qkSDK = new GCQuickSDK();
qkSDK.init();

var cfg = {
    "channer": "quickgame",
    "type": "body",
    "uid_arg": "uid",
    "channel_id": "2",
    "game": 13
};
let obj: any = {};
obj.from = cfg.channer;

/**
 * sdk第三方登录
 */
export const sdkLogin = function (cb) {
    qkSDK.getUIDAndChannelID({
        success(uid, channelId) {
            // console.log(uid, channelId);
            var localDomain = "http://www.17youx.cn";
            ajax.get(localDomain + "/pt/get_ptid?uid=" + channelId + "_" + uid + "&channer=" + cfg.channel_id + "&game=" + cfg.game, null, null, "json", 3000, function (res) {
                obj.ptid = res.ptid;
                obj.uid = res.ptid;
                obj.sign = res.sign;
                window.gcStorage.ptFrom = JSON.stringify(obj);
                console.log("登录游戏平台返回数据", res);
                cb && cb();
            }, function () {
                console.log("通讯失败");
            });
        }
    });
};

// /**
//  * 1.创建角色时上传信息
//  * 2.进入游戏是上传信息
//  * 3.角色升级是上传信息
//  * @param {Boolean} 
//  * true [1]
//  * false [2,3]
//  */
// export const upLoad = function (bool: Boolean) {
//     let player = getDB("player");
//     let gang;
//     if (!bool) {
//         gang = getDB("gang.data");
//         if (gang.gang_id == 0) {
//             gang = null;
//         }
//     }
//     let roleInfo: any = new Object();
//     // 是否创建角色
//     roleInfo.isCreateRole = bool;
//     // 服务器id, 不能包含中文
//     roleInfo.serverId = player.area;
//     // 服务器名称
//     roleInfo.serverName = player.area_name;
//     // 角色名称
//     roleInfo.userRoleName = player.name;
//     // 角色role_id
//     roleInfo.userRoleId = player.role_id;
//     // 角色用户余额
//     roleInfo.userRoleBalance = player.diamond;
//     // vip等级
//     roleInfo.vipLevel = player.vip;
//     // 角色等级
//     roleInfo.userRoleLevel = player.level;
//     // 公会名称
//     roleInfo.partyName = gang ? gang.gang_name : '';
//     // 角色创建时间
//     roleInfo.roleCreateTime = player.role_time;
//     // 帮派id
//     roleInfo.partyId = gang ? gang.gang_id : '';
//     // 角色性别
//     roleInfo.gameRoleGender = player.sex === 1 ? '男' : '女';
//     // 角色战斗力
//     roleInfo.gameRolePower = player.power;
//     // 角色在帮派中的id
//     roleInfo.partyRoleId = '';
//     // 角色在帮派中的名称
//     let post = ['', '会长', '副会长', '成员'];
//     roleInfo.partyRoleName = gang ? post[gang.post] : '';
//     // 角色职业id
//     roleInfo.professionId = player.career_id + '';
//     // 角色职业名称
//     roleInfo.profession = player.career_name;
//     // 好友列表
//     roleInfo.friendlist = '';
// }

let roleInfo = {},
    roleDataList = [["isCreateRole", "isCreateRole"], ["roleCreateTime", "rolecreatetime"], ["uid", "uid"], ["username", "username"], ["serverId", "serverid"], ["serverName", "servername"], ["userRoleId", "roleid"], ["userRoleName", "rolename"], ["userRoleBalance", "diamond"], ["vipLevel", "vip"], ["userRoleLevel", "rolelevel"], ["partyId", "partyid"], ["partyName", "partyname"], ["gameRoleGender", "gender"], ["gameRolePower", "power"], ["partyRoleId", "partyroleid"], ["partyRoleName", "partyrolename"], ["professionId", "professionid"], ["profession", "profession"], ["friendlist", "friendlist"]];
//绑定平台上传用户信息接口
export let ptUpload = function (param, callback) {
    if (param.datatype == 2 || param.datatype == 4) {
        roleInfo = param;
        let upRoleInfo:any = {};
        for (let i = 0; i < roleDataList.length; i++) {
            upRoleInfo[roleDataList[i][0]] = roleInfo[roleDataList[i][1]];
        }
        upRoleInfo.userRoleId = upRoleInfo.userRoleId + "";
        upRoleInfo.professionId = upRoleInfo.professionId + "";
        upRoleInfo.friendlist = "无";
        try {
            qkSDK.setGameRoleInfo({'roleInfo':JSON.stringify(upRoleInfo), succsee(){
                console.log('上传成功');
                callback({status:true})
            },fail(e){
                console.log('上传失败', e);
                callback({status:false})
            }});
        } catch (e) {
            callback({status:false})
            console.log(e)
        }
    }
};

/**
 * 支付
 */
export let piPay = function (param) {
    let orderInfo:any = {};
    orderInfo.goodsID = param.goodsId;
    orderInfo.goodsName = param.subject;
    orderInfo.cpOrderID = param.cpOrderNo;
    orderInfo.count = param.count;
    orderInfo.amount = param.amount;
    orderInfo.extrasParams = '';
    // let orderInfoJson = JSON.stringify(orderInfo);
    qkSDK.pay({
        orderInfo: JSON.stringify(orderInfo),
        success(sdkOrderID, cpOrderID, extrasParams) {
            console.log(sdkOrderID, cpOrderID, extrasParams);
        },
        fail(cpOrderID, message, trace) {
            console.log(cpOrderID, message, trace);
        }
    })
};