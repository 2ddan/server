/**
 * 网络链接管理
 */

// ============================== 导入
//mod
import { Pi } from "app/mod/pi";
//local
import { setUrl, open } from "./con_mgr";

// ============================== 导出
export const main = (callback) => {
	setUrl(Pi.openUrl);
	open(callback,() => {
		
	});
}

// ============================== 本地
