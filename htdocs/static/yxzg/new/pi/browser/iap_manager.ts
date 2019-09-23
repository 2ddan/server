/**
 * apple 应用内支付模块
 */
// ============================== 导入
import { NativeObject, registerSign, ParamType, addEventListener, removeEventListener } from './native';
// ============================== 导出

export class IAPManager extends NativeObject {


	/**
	 * 添加苹果支付队列监听事件
	 * @param param 
	 */
	public static addTransactionObserver(param: any) {
		ipaManager.call('addTransactionObserver', param);
	}

	/**
	 * 移除苹果支付队列监听事件
	 * 为了防止内存泄露，在成功完成支付之后建议移除掉队列监听
	 * @param param 
	 */
	public static removeTransactionObserver(param: any) {
		ipaManager.call('removeTransactionObserver', param);
	}

	/**
	 * 发起支付请求
	 * @param sm : 商品ID 
	 * @param sd : 订单ID
	 */
	public static IAPurchase(param: any) {
		ipaManager.call('IAPurchase', param);
	}

	/**
	 * 监听底层是否有上次未支付成功的订单
	 * 建议在程序加载时就监听此事件
	 * 返回信息： issuccess：是否支付成功 sd: 订单ID， transation： 凭证
	 */
	public static addTransactionListener(cb: (issuccess: Number, sd: String, transation: String, cbID: Number) => void) {
		cbList.push(cb)
		let num = cbList.indexOf(cb)

		let cbCall = (issuccess: Number, sd: String, transation: String) => {
			cb(issuccess, sd, transation, num)
		}

		addEventListener('iap_manager', 'transation', cbCall)
	}

	/**
	 * 移除监听事件
	 * @param cb 必须和添加监听时cb保持一致
	 */
	public static removeTransactionListener(num: Number) {
		if (cbList.length >= num){
			let cb = cbList[num as number];
			cbList.splice(num as number,1);
			removeEventListener('iap_manager', 'transation', cb)
		}
	}

}



// ============================== 本地

/**
 * 底层接口和参数的声明
 */
registerSign(IAPManager, {
	addTransactionObserver: [],
	removeTransactionObserver: [],
	IAPurchase: [
		{
			name: 'sm',
			type: ParamType.String
		}, {
			name: 'sd',
			type: ParamType.String
		}
	]
});

const cbList = [];

const ipaManager = new IAPManager();
ipaManager.init();