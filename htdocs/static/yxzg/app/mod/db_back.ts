/***
 * 获取全数据，以及分发数据
***/
// ========================== 导入
//pi
import { ajax } from "pi/lang/mod";
import { set as task } from "pi/util/task_mgr";
//mod
import { Pi, setLog } from "app/mod/pi";
import { data as localDB } from "app/mod/db";
//app

// ============================ 导出
/**
 * @description 拉取游戏全数据
 * @param {Function}callback 数据处理完之后回调
 */
export const getAllDB = (callback?) => {
	count ++;
	ajax.get(Pi.server+"read_all?uid="+localDB.user.uid+"&rid="+localDB.user.rid,null,null,null,null,(data)=>{
		//TODO..
		//处理数据...
		handleData(data);
		callback && callback();
		setLog("log",{
			sid : Pi.sid,
			step : 19
		});
	},(err) => {
		if(count < 3){
			getAllDB(callback);
		}else{
			count = 0;
			console.log(err);
			alert("read_all error :: "+err.reason);
		}
	});
}
/**
 * @description 监听后台数据,如果监听的时候数据已经就绪，则先调用一次监听回调
 * 
 */
export const listenBack = (key,handler) => {
	backDB[key] && task(handler,[backDB[key]],54,0);
	if(!handleTable[key])handleTable[key] = [];
	handleTable[key].push(handler);
};
// ============================ 本地
/**
 * @description 后台数据
 */
let backDB = {};

/**
 * @description 事件处理列表
 */
let handleTable = {};

/**
 * @description 重连次数
 */
let count = 0;

/**
 * @description 后台数据处理,分发给每个监听器,同步执行，防止数据更新与玩家操作冲突
 * @param {String}data 后台得到的JSON字符串
 */
const handleData = (data) => {
	backDB = JSON.parse(data).ok;
	console.log("游戏全数据=============================");
	console.log(backDB);
	for(let k in handleTable){
		if(backDB[k]){
			for(let t in handleTable[k]){
				if(handleTable[k][t]){
					try{
						handleTable[k][t](backDB[k]);
					}catch(e){
						console.log(e);
					}
				}
			}
		}
	}
};

// ============================= 导出

// ============================== 立即执行

