//导入模块
import { Widget } from "pi/widget/widget";
import { Forelet } from "pi/widget/forelet";
import { open } from "app/mod/root";
import { Common } from "app/mod/common";
import { Common_m } from "app_b/mod/common";
import { updata, get as getDB, insert, listen } from "app/mod/db";
import { globalSend, Pi } from "app/mod/pi";
import { net_request } from "app_a/connect/main";
import { listenBack } from "app/mod/db_back";

//配置
import { rune_collect } from "cfg/c/rune_collect";
import { rune_state } from "cfg/c/rune_state";
import { rune_practice } from "cfg/c/rune_practice";
import { rune } from "cfg/c/rune";
import { attribute_config } from "cfg/c/attribute_config";
import { buffCfg } from "cfg/b/buff";


export const forelet = new Forelet();
//外部打开此页面
export let globalReceive = {
    gotoRune: () => {
        if (!state_coin) {
            state_coin = rune_state[1][1]["cost_prop"][0];
            practice_coin = rune_practice[1][1]["cost_prop"][0];
        }
        tabSwtich = "books";
        index = 1;
        index_book = 0;

        logic.bagBookCount();
        forelet.paint(getData());
        open("app_c-rune-main-main");
    }
}

let tabSwtich = "books",//tab切换
    rune_arr: any = {},//拥有的符文
    hight_rune = [],//高级秘籍ID
    lower_rune = [],//低级秘籍ID，两者对应孔位
    state_coin = null,//修行货币id
    practice_coin = null,//经脉货币id
    index = 1,//当前选中孔位置
    anima = false,//是否播放动画
    index_book = 0;//当前选中秘籍位置
export class rune_main extends Widget {
    //界面tab切换
    changeColumns(msg) {
        if (tabSwtich == msg.type_m) return;
        anima = false;
        tabSwtich = msg.type_m;
        forelet.paint(getData());
    }
    //获取符文
    gotoLottery() {
        globalSend("gotoLottery");
    }
    //获取方式
    gotoGetWay(id) {
        globalSend("gotoGetWay", id);
    }
    //选择不同孔位
    selectPore(arg) {
        if (index == arg) return;
        index = arg;
        forelet.paint(getData());
    }
    //选择不同秘籍
    selectBook(arg) {
        if (index_book == arg) return;
        index_book = arg;
        forelet.paint(getData());
    }
    //镶嵌单个秘籍
    booksIn(index, prop_id) {
        logic.booksIn(index, prop_id);
    }
    //一键镶嵌
    // booksAllIn(){
    //     if(JSON.stringify(rune_arr)==="{}"){
    //         globalSend("screenTipFun",{words:`背包无符文！`});  
    //         return; 
    //     }
    //     let rune_set = getDB("rune.rune_set");
    //     //全部镶嵌高级秘籍
    //     if(JSON.stringify(rune_set)===JSON.stringify(hight_rune)){
    //         globalSend("screenTipFun",{words:`当前已是最优镶嵌方案！`});  
    //         return;  
    //     }
    //     //未全部镶嵌高级秘籍
    //     for(let i = 0,len = hight_rune.length;i<len;i++){
    //         if(rune_set.indexOf(hight_rune[i])===-1 && (rune_arr[hight_rune[i]] || rune_arr[lower_rune[i]])){
    //             logic.booksAllIn();
    //             return;
    //         }
    //     }
    //     globalSend("screenTipFun",{words:`当前已是最优镶嵌方案！`});  
    // }
    //查看秘籍属性
    booksAttr() {
        let attr = logic.booksAtrr();
        if (!attr) {
            globalSend("screenTipFun", { words: `暂未获得任何属性` });
            return;
        }
        forelet.paint(getData());
        open("app_c-rune-books-detail-detail",attr);
    }
    //符文收集
    booksCollect() {
        forelet.paint(getData());
        open("app_c-rune-books-collect-collect");
    }
    //修行升级
    stateUp(arg) {
        if(anima){
            return;
        }
        if (arg == 1) {
            globalSend("gotoGetWay", state_coin);
            return;
        } else if (arg == 2) {
            globalSend("gotoBuyMoney");
            return;
        }
        logic.stateUp();
    }

    //经脉升级
    practiceUp(arg) {
        if(anima){
            return;
        }
        if (arg == 1) {
            globalSend("gotoGetWay", practice_coin);
            return;
        } else if (arg == 2) {
            globalSend("gotoBuyMoney");
            return;
        }
        logic.practiceUp();
    }
    //查看经脉属性
    practiceAttr() {
        let attr = logic.practiceAttrAdd();
        if (!attr) {
            globalSend("screenTipFun", { words: `暂未获得任何属性` });
            return;
        }
        globalSend("gotoSeeAttr", { "title": "属性详情", "attr": attr })
    }
}

let _data: any = {
    "Pi": Pi,
    "rune": rune,
    "rune_practice": rune_practice,
    "rune_state": rune_state,
    "attribute_config": attribute_config,
    "buff": buffCfg,
    "rune_collect": rune_collect
};
//获取最新数据(刷新)
const getData = function () {
    _data.player = getDB("player");
    _data.rune_data = getDB("rune");
    _data.tabSwtich = tabSwtich;
    _data.index = index;
    _data.index_book = index_book;
    _data.rune_arr = rune_arr;
    _data.anima = anima;
    // _data.booksAtrr = logic.booksAtrr;
    _data.state_count = logic.getPropCount(state_coin);
    _data.practice_count = logic.getPropCount(practice_coin);
    return _data;
}


let logic = {
    //秘籍嵌入
    /**
     * @description %通讯参数 index : 1需要镶嵌的位置 , prop_id 200001 镶嵌道具的id
    */
    booksIn(index, prop_id) {
        let arg = {
            "param": {
                index: index,
                prop_id: prop_id
            },
            "type": "app/prop/rune@insert"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
                globalSend("screenTipFun", { words: data.why });
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                //let rune_set = getDB("rune.rune_set");
                // rune_set[prop.rune_set[0][1] - 1] = prop.rune_set[0][0][0];
                // updata("rune.rune_set", rune_set);
                updata(`rune.rune_set.${index - 1}`, prop.rune_set[0][0][0]);
                // globalSend("refreshLeaveExp");
                if (!prop.prop[0][0]) {
                    updata("bag." + (prop.prop[0][1] - 1), 0);
                } else {
                    updata("bag." + (prop.prop[0][1] - 1), Pi.sample[prop.prop[0][0][0]]);
                }
                globalSend("screenTipFun", { words: `镶嵌${Pi.sample[prop.rune_set[0][0][0]].name}成功` });
                forelet.paint(getData());
            }
        })
    },


    //秘籍一键嵌入
    /**
    * @description %通讯参数 无
   */
    // booksAllIn() {
    //     let arg = {
    //         "param": {},
    //         "type": "app/prop/rune@one_key_insert"
    //     };
    //     net_request(arg, function (data) {
    //         if (data.error) {
    //             console.log(data.why);
    //         } else {
    //             let prop: any = Common.changeArrToJson(data.ok);
    //             let rune_set = getDB("rune.rune_set");
    //             prop.prop.forEach((v,k) => {
    //                 if(!v[0]){
    //                     updata("bag."+(v[1]- 1),0);  
    //                 }else{
    //                     updata("bag."+(v[1]- 1),Pi.sample[v[0][0]]);  
    //                 }
    //             });
    //             prop.rune_set.forEach((v,k) => {
    //                 rune_set[v[1]-1] = v[0][0];
    //             });
    //             updata("rune.rune_set",rune_set); 
    //             globalSend("screenTipFun",{words:`一键镶嵌成功`}); 
    //             forelet.paint(getData());
    //         }
    //     })
    // },

    //修行升级
    /**
    * @description %通讯参数 无
   */
    stateUp() {
        let arg = {
            "param": {},
            "type": "app/prop/rune@state_upgrade"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                anima = true;
                forelet.paint(getData());
                let timer = setTimeout(()=>{
                    clearTimeout(timer);
                    timer = null;
                    updata("rune.rune_state", prop.rune_state);
                    anima = false;
                    forelet.paint(getData());
                },1000)
            }
        })
    },

    //秘籍属性总览
    booksAtrr() {
        // let obj: any = {};
        // let arr = getDB("rune.rune_set");
        // if (!arr) { return false; }
        // for (let i = 0, len = arr.length; i < len; i++) {
        //     if (!arr[i]) { continue; }
        //     rune[i + 1].forEach((v, k) => {
        //         if (v.prop_id == arr[i]) {
        //             if(v.add_exp){
        //                 obj.add_exp = Math.floor(((obj.add_exp || 0) + v.add_exp) * 100) / 100;
        //             }else if(v.attr[0]!="undefined"){
        //                 obj[v.attr[0]] = (obj[v.attr[0]] || 0) + v.attr[1];
        //             }else if(v.buff_id && !obj[v.buff_id]){
        //                 obj[v.buff_id] = 1;
        //             }
        //             return;
        //         }
        //     });
        // }

        // if (JSON.stringify(obj) === "{}") {
        //     return false;
        // }
        // return obj;
        let attr = [];
        let arr = getDB("rune.rune_set");
        if (!arr) { return false; }
        for (let i = 0, len = arr.length; i < len; i++) {
            if (!arr[i]) { continue; }
            rune[i + 1].forEach((v, k) => {
                if (v.prop_id == arr[i]) {
                    attr.push(v);
                    return;
                }
            });
        }

        if (!attr.length) {
            return false;
        }
        return attr;
    },

    //经脉升级
    /**
     * @description %通讯参数 无
    */
    practiceUp() {
        let arg = {
            "param": {},
            "type": "app/prop/rune@practice_upgrade"
        };
        net_request(arg, function (data) {
            if (data.error) {
                console.log(data.why);
            } else {
                let prop: any = Common.changeArrToJson(data.ok);
                Common_m.deductfrom(prop);
                anima = true;
                forelet.paint(getData());
                let timer = setTimeout(()=>{
                    clearTimeout(timer);
                    timer = null;
                    updata("rune.rune_practice", prop.rune_practice);
                    anima = false;
                    forelet.paint(getData());
                },1000)
            }
        })
    },
    //计算【背包】拥有秘籍数量
    bagBookCount() {
        rune_arr = {};
        let data = getDB("bag*type='rune'");
        for (let i = data.length - 1; i > -1; i--) {
            if (!data[i]) { continue; }
            rune_arr[data[i].sid] = (rune_arr[data[i].sid] || 0) + 1;
        }
    },
    // 所有高级秘籍样品id
    bookSample() {
        for (let key in rune) {
            rune[key].forEach((v, k) => {
                if (v.level == 2) {
                    hight_rune.push(v.prop_id);
                } else {
                    lower_rune.push(v.prop_id)
                }
            });
        }
    },
    //计算拥有物品
    getPropCount(id) {
        let prop = getDB("bag*sid=" + id).pop();
        let count = prop && prop.count || 0;
        return count;
    },
    /**
     * 计算激活的经脉的属性加成
     */
    practiceAttrAdd: function () {
        let arr = getDB("rune.rune_practice");
        let curr = rune_practice[arr[0]][arr[1]];
        if (!curr.attr) {
            return false;
        }
        let obj: any = {};
        curr.attr.forEach((v, k) => {
            obj[v[0]] = (obj[v[0]] || 0) + v[1];
        });
        return obj;
    }
}

// =================================== 立即执行
/**
 * @description 初始化符文字段
 */
insert("rune", {});

/**
 * @description 监听背包符文变化
 */
listen("bag*type='rune'", () => {
    logic.bagBookCount();
    forelet.paint(getData());
})
/**
 * @description 监听money变化
 */
listen("player.money", () => {
    forelet.paint(getData());
})
/**
 * @description 获取符文数据
 */
listenBack("app/prop/rune@read", (data) => {
    for (let key in data) {
        if (key == "rune_set") {
            for (let i = 0, len = data["rune_set"].length; i < len; i++) {
                if (data["rune_set"][i]) {
                    // data["rune_set"][i] = [data["rune_set"][i][0],data["rune_set"][i][1][0]];
                    data["rune_set"][i] = data["rune_set"][i][0];
                }
            }
            updata("rune.rune_set", data["rune_set"]);
            continue;
        }
        updata("rune." + key, data[key]);
    }
});
logic.bookSample();