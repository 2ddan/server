/*global pi */

/**
 * ****样本示例*******
 * {"30002": [
 *		{ "sid": 30002, "price":200, "attr": ["$var",0], "sub_sample": ["$svar",undefined], "sub_sample_list":["$slist",undefined] },
 *		{ "type":["$var",0] }
 *]
 * }
 ******变量类型*******
 * "$var"=普通变量;
 * "$svar"=样本
 * "$slist"=样本列表
 *
 *******说明**********
 * a.变量定义为数组：[变量类型,默认值]
 * b.版本变动需要增加变量时，需要在json数组的尾部追加新的json，如样本示例中type的定义。
 *
 *
 *
 *
 * @name pi.sample
 * @object
 * @namespace
 * @description 样本的编解码模块
 */
import { checkTypeof } from "./db";
import { Common } from "./common";
	/** @exports module as pi.sample */
	var decode_slist;
	// 列表样本解码
	decode_slist = function (array, table) {
		var i, arr = [];
		if (!checkTypeof(array,"Array")) {
			return array;
		}
		for (i = 0; i < array.length; i++) {
			arr.push(decode(array[i], table));
		}
		return arr;
	};
	// 将简化版本的数据解码成原数据
	/***
	 * 解压数据
	 * @param {array} data 需要解压的数据
	 * @param {json} table 解压模板表
	 * @return {json} 解压后的json对象
	 */
	export const decode = function (data, table) {
		var decodeData, i, j, n, key, sampleValue, value, sample = [],
			sid, arr;
		if (!(checkTypeof(data,"Array") && data.length === 2)) {
			return data;
		}
		sid = data[0];
		arr = data[1];
		if (!table[sid]) {
			throw ("invalid sid:" + sid);
		}
		//sample = pi.util.copyJSON(table[sid]);
        sample = Common.keyValues(table[sid]);
		decodeData = {};
		for (i = 0, j = 0, n = sample.length; i < n; i++) {
			key = sample[i][0];
			sampleValue = sample[i][1];
			//变量
			if (checkTypeof(sampleValue,"Array") && sampleValue.length === 2 && checkTypeof(sampleValue[0],"String") && sampleValue[0].indexOf("$") >= 0) {
				//获取默认值
				if (j < arr.length) {
					value = arr[j++];
				}
				else if (sampleValue.length === 2) {
					value = sampleValue[1];
				}
				else {
					value = undefined;
				}
				if (sampleValue[0] === "$var") {
					//如果是数组判断为中文字符的uinicode编码
					// if(checkTypeof(value,"Array") && checkTypeof(value[0],"Array") && value[0].length === 2){
					// 	value = Common.changeArrToJson(value);
					// }
				} else if (sampleValue[0] === "$svar") {
					value = decode(value, table);
				} else if (sampleValue[0] === "$slist") {
					value = decode_slist(value, table);
				}
			}
			else {
				value = sampleValue;
			}
			decodeData[key] = value;
		}
		return decodeData;
	};
	/***
	 * 获取样本对象
	 * @param {json} table 样本表
	 * @param {string} sid 样本id
	 * @return {json} 样本对象
	 */
	export const getSample = function (table, sid) {
		var i, cfg, newCfg = {};
		if (!table[sid]) {
			return;
		}
		cfg = table[sid];
		for (i = 0; i < cfg.length; i++) {
			newCfg[cfg[i][0]] = cfg[i][1];
		}
		cfg = newCfg;
		return cfg;
	};
	/**
	 *获取样本对象，将默认值替代未初始化的值返回
	 * @param table
	 * @param sid
	 * @returns {json}
	 */
	export const getDefaultSample = function (table, sid) {
		var i, cfg, newCfg = {};
		if (!table[sid]) {
			return;
		}
		cfg = table[sid];
		for (i = 0; i < cfg.length; i++) {
			if (cfg[i][1][0] && cfg[i][1][0][0] === '$') {
				newCfg[cfg[i][0]] = cfg[i][1][1];
			} else {
				newCfg[cfg[i][0]] = cfg[i][1];
			}
		}
		return newCfg;
	};