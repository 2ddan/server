//pi
import { Forelet } from "pi/widget/forelet";
import { Widget } from "pi/widget/widget";
//mod
import { Pi, globalSend, cfg } from "app/mod/pi";
import { data as localDB,  updata, insert, listen } from "app/mod/db";
import { listenBack } from "app/mod/db_back";
import { Common } from "app/mod/common"; 
import { open, close } from "app/mod/root";
import { Util } from "app/mod/util";
//app
import { net_request, net_message } from "app_a/connect/main";
import { Common_m } from "app_b/mod/common";
import { shop_price } from "cfg/c/shop_price";
import { shop_base } from "cfg/c/shop_base";
import { vip_advantage } from "cfg/c/vip_advantage";

/**
 * @description 导出forelet
 */
export const forelet = new Forelet();
/**
 * @description 注册全局广播接收函数
 */
export const globalReceive = {
    gotoStore: () => {
        // if (funIsOpen("store")) {
            open("app_c-shop-type_1","1");
            globalSend("openNewFun", "store");
        // }
    }
}
/**
 * @description 导出组件
 */
export class Mail extends Widget {
    /**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
	setProps(props, oldProps): void {
        this.props = props;
        shopType = props;
        this.setState(getShowData());
    }
    //显示物品详情
    propInfoShow = (sid) => {
        globalSend("showOtherInfo", sid);
    }
    //显示VIP折扣
    openVipDiscount = ()=>{
        forelet.paint(getShowData());
        open("app_c-shop-vip_discount-vip_discount");
    }
    /**
     * @description 购买物品
     * @param {Number}arg prop id
     */
    buy(arg,index){
        let consume = Common_m.getConsume(cfg.shop_price.shop_price[shopType][arg]);
        let discount = vip_advantage[localDB.player.vip || 0].discount;
        consume[1] = Math.ceil(consume[1] * discount / 100);
        //检查消费物资是否充足
        if(!Common_m.checkConsume(consume))
            return;
        if(Pi.sample[shop_price[shopType][arg]["prop"][0]].type === "equip"){
            let f = Common_m.bagIsFull();
            if (f) {
                globalSend("screenTipFun", {
                    words: `背包数量已满`
                })
                return false;
            }
        }
        buy(arg,index);
        forelet.paint(getShowData());
    }
    /**
     * @description 手动刷新商店
     * @param {Number}arg prop id
     */
    refresh(arg){
        //检查消费物资是否充足
        if(!Common_m.checkConsume(arg))
            return;
        //消费提示
        if(arg && arg[0] == "diamond" && !remind[shopType]){
            globalSend("popTip",{
                title:"刷新将消耗<span style='font-size:19px;color:rgb(255,222,0);text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;padding:0 3px;'>"+arg[1]+"</span>元宝，确认刷新？",
                btn_name:["确定","取消"],
                cb:[
                    //确认
                    ()=>{
                        refresh(); 
                    },
                    //取消
                    ()=>{}
                ],
                status:()=>{
                    remind[shopType] = !remind[shopType];
                }
            })
        }else refresh();
        forelet.paint(getShowData());
    }
    /**
     * @description 关闭
     * @param {String}arg app_c-shop-type_1
     */
    goback(arg){
        let _w = forelet.getWidget(arg);
        if(_w)((w)=>{
			//循环外调用
			setTimeout(()=>{close(w)},0);
		})(_w);
    }
}


// ==================================== 本地
/**
 * @description 当前显示商城类型
 */
let shopType = "1";
/**
 * @description 商城刷新提醒,false为需要提醒
 */
let remind = [];
/**
 * @description 获取页面显示数据
 */
const getShowData = () => {
    if(!shop_price || !shop_base){
        return {};
    }
    let data:any = {};
    data.shopType = shopType;
    data.shopList = localDB.shop.all_shop_goods[shopType];
    data.cfg_price = shop_price;
    data.cfg_base = shop_base;
    data.free = Common.leastLast(shop_base[shopType].free,localDB.player.vip)||0;
    data.cost = getCost(data.free);
    data.pi = Pi;
    data.vip_advantage = vip_advantage;
    data.refresh_time = refreshTime();
    data.mergeVipDiscount = mergeVipDiscount;
    return data;
}
/**
 * @description 获取当前刷新需要的消耗
 * @return [{"diamond","money",prop},cost-number]
 */
const getCost = (free) => {
    let _refresh = localDB.shop.all_refresh_times[parseInt(shopType)-1],
        _cfg = shop_base[shopType],
        _diff = free - _refresh,
        k,
        count;
    if(_diff <= 0){
        _diff = -_diff;
        if(_cfg.diamond){
            k = "diamond";
            count = Common.leastLast(_cfg.diamond,_diff);
        }else if(_cfg.money){
            k = "money";
            count = Common.leastLast(_cfg.money,_diff);
        }else if(_cfg.prop_id){
            k = _cfg.prop_id;
            count = Common.leastLast(_cfg.prop_num,_diff);
        }
        return [k,count];
    }
}

//合并vip折扣
const mergeVipDiscount = ()=>{
    let result = [],arr = [];
    for(let k in vip_advantage){
        let curr = vip_advantage[k];
        if(k == "0" || !curr.discount || curr.discount==100){continue;}
        if(!arr[2] || arr[2] != curr.discount){
            arr.length && result.push(arr);
            arr = [k,undefined,curr.discount];
        }else{
            arr = [arr[0],k,arr[2]];
        }
        if(!vip_advantage[k-0+1]){
            result.push(arr); 
        }
    }
    return result;
}


//计算下次刷新时间
const refreshTime = () =>{
    let _shop_base = shop_base[shopType];
    let refresh_time = _shop_base.refresh_time;
    let time = Util.serverTime();
	let server = new Date(time);
	let beforetime = 0;
    let aftertime = 0;
    let time0 = 0;
    let lastTime = 0;
	for (let j = 0; j < refresh_time.length; j++) {
        beforetime = new Date(server.getFullYear(), server.getMonth(), server.getDate(), 0, refresh_time[j], 0).getTime();
        time0 = new Date(server.getFullYear(), server.getMonth(), server.getDate(), 0, refresh_time[0], 0).getTime();
        lastTime = new Date(server.getFullYear(), server.getMonth(), server.getDate(), 0, refresh_time[refresh_time.length-1], 0).getTime();
        if(refresh_time[j+1]){
            aftertime = new Date(server.getFullYear(), server.getMonth(), server.getDate(), 0, refresh_time[j+1], 0).getTime() 
        }
        
        if(time > beforetime && time < aftertime){
            return new Date(aftertime).getHours();
        }else if(time < time0 || time > lastTime){
            return new Date(time0).getHours();
        }
	}
}

/**
 * @description 初始化商店数据
 */
const initShopDB = (data) => {
    updata("shop.all_refresh_times",data.all_refresh_times);
    updata("shop.all_shop_goods", Common.changeArrToJson(data.all_shop_goods));
    forelet.paint(getShowData());
}
/**
 * @description 读取商店数据
 */
const read = () => {
    net_request({type:"app/shop@read",param:{}},(data) =>{
        if (data.error) {
			globalSend("screenTipFun",{words:data.why});
			console.log(data.why);
			return;
        }
        let r:any = Common.changeArrToJson(data.ok);
        initShopDB(r);
    })
}
/**
 * @description 刷新商店数据
 */
const refresh = () => {
    net_request({type:"app/shop@refresh",param:{shop_type:parseInt(shopType)}},(data) =>{
        if (data.error) {
			globalSend("screenTipFun",{words:data.why});
			console.log(data.why);
			return;
        }
        let r:any = Common.changeArrToJson(data.ok);
        delete r.shop_goods.erl_type;
        updata("shop.all_shop_goods."+shopType, r.shop_goods);
        updata("shop.all_refresh_times."+(parseInt(shopType)-1), r.refresh_times);
        Common_m.deductfrom(r);
        Common_m.mixAward(r);
    })
}
/**
 * @description 购买物品
 * @param {Number} arg 商品id
 * @param {Number} index 当前显示列表的偏移量
 */
const buy = (arg,index) => {
    net_request({type:"app/shop@buy",param:{shop_type:parseInt(shopType),goods_id:arg}},(data) =>{
        if (data.error) {
			globalSend("screenTipFun",{words:data.why});
			console.log(data.why);
			return;
        }
        let r:any = Common.changeArrToJson(data.ok);
        Common_m.deductfrom(r);
        let result: any = Common_m.mixAward(r);
        result.auto = 1;

        globalSend("showNewRes", {
            result, function(result) {
                result.open();
            }
        })
        updata("shop.all_shop_goods."+shopType+"."+index+".1",1);
    })
}

// =================================== 立即执行
/**
 * @description 初始化刷新商店字段
 */
insert("shop",{});
/**
 * @description 监听数据库
 */
listen("shop",()=>{
    if(cfg.shop_price)forelet.paint(getShowData());
});

/**
 * @description 获取邮件数据
 */
listenBack("app/shop@read",initShopDB);
/**
 * @description 监听邮件推送
 */
net_message("shop_refresh",read);
/**
 * @description forelet 监听
 */
forelet.listener = (cmd,w) => {
    if(cmd !== "add")
        return;
    forelet.paint(getShowData());
}