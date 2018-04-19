import { data as localDB, updata, get as getDB, listen, checkTypeof,getTypeof } from "./db";
import { Pi, globalSend } from "./pi";
import { open } from "app/mod/root";

export class Common {
    /**
	 * 将源对象上所有的键值都绑定到目标对象上，主要用于委托方法和常量
	 * @param  {object} dest 目标对象
	 * @param  {object} src 源对象
	 * @return {int} 绑定属性的个数
	 */
    static mergeJsonVal(dest, src) {
        let n = 0;
        for (let k in src) {
            dest[k] = src[k];
            n += 1;
        }
        return n;
    }
    //判断json是否为空对象
    static checkJsonIsEmpty(_json) {
        if (!checkTypeof(_json,"Object")) return false;
        for (let k in _json) {
            return false;
        }
        return true;
    }
    static isExist(forelet, arg) {//是否打开
        let w = forelet.getWidget(arg);
        if (w && w.parentNode) return true;
        else return false;
    }
    //将数组转化成json对象
    //data [["key",value],……]
    //返回 {key:value,……}
    static changeArrToJson(data1, kf?) {
        if (!data1) return 0;
        let _data = {}, data = data1 || [];
        for (let i = 0, len = data.length; i < len; i++) {
            if (!kf) {
                if (data[i].length == 2) _data[data[i][0]] = data[i][1];
                else if (data[i].length > 2) {
                    _data[data[i][0]] = data[i].slice(1, data[i].length);
                }
            } else {
                if (!_data[data[i][0]]) {
                    _data[data[i][0]] = [];
                }
                let o = data[i].slice(1, data[i].length);
                o.push(i);
                _data[data[i][0]].push(o);
 
            }
        }
        return _data;
    }
    /**
	 * 取出数组或对象第一层对象含有制定key-value的对象
     * 第一层或第一维必须是对象组成的
	 * @param  {object || Array} obj 对象
	 * @param {string} key
     * @param {any} value
	 */
    static getObjHasOneValue(obj,key,value){
        for(let k in obj){
            if(obj[k][key] === value){
                return obj[k];
            }
        }
    }
    /**
	 * 取出对象上所有的键值，数组的元素为长度等于2的数组，0为键，1为值
	 * @param  {object} obj 对象
	 * @return {array} [[k1, v1], [k2, v2], ...]
	 */
	static keyValues(obj, arr?) {
		var i;
		arr = arr || [];
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				arr.push([i, obj[i]]);
			}
		}
		return arr;
	};
    //Unicode -> ASCII转换
    static fromCharCode(arr) {
        if (checkTypeof(arr,"Array")) {
            let str = "";
            for (let k = 0, len = arr.length; k < len; k++) {
                str += String.fromCharCode(arr[k]);
            }
            return str;
        } else return arr;
    }
    /**
     * @description 计算字符长度
     * @param text:需要计算的文字
     */
    static character (text: string) {
        if (text.match(/[^\x00-\xff]/g)) return text.match(/[^\x00-\xff]/g).length + text.length;
        return text.length
    };
    /**
     * @description 判断输入的文字的字符长度
     * @param max:最大字符串长度
     * @param text:需要计算的文字
     */
    static calculate (max: number, text: string) {
        let newstr = text;
        let len = Common.character(newstr)
        if (len > max) {
            let diff = len - max;
            let strlen = 0;
            for (let i = text.length - 1; i > 0; i--) {
                strlen += Common.character(text[i]);
                if (strlen >= diff) {
                    newstr = newstr.substring(0, i);
                    return newstr;
                }
            }
        }

        return newstr
    }
    /**
     * @description 获取数组对应位置的元素，没有则返回最后一位
     */
    static leastLast (arr,index) {
        return arr && arr[index] || arr[arr.length-1];
    };
    //判断当前cpu是否空闲
    //@param callback 空闲情况下执行的函数
    static cpuFree(callback) {
        let count = 0, //符合条件的次数
            maxCount = 3,
            time = Date.now(),
            temp = 0,
            sample = [0, 0, 0],
            sum = (arr) => {
                return arr[0] + arr[1] + arr[2] + maxCount * maxCount;
            },
            func = () => {
                temp = Date.now();
                sample.unshift(temp - time);
                if (sample.length > maxCount) sample.length = maxCount;
                if (temp - time < sum(sample) / maxCount) count += 1;
                else count = 0;
                if (count >= maxCount){
                    callback();
                }else {
                    setTimeout(() => {
                        func();
                    }, 5);
                }
                ////console.log(temp-time);
                time = temp;
            };
        func();
    };

    //更新数据库
    static upDataDbData(root, data) {
        for (let k in data) {
            updata(root + "." + k, data[k]);
            //app.mod.db.runListen([root + "."+k]);
        }
    };

    //数字进位及单位
    //@param num-需要转换的数字,min-转换的位数如(1000,10000)
    static numberCarry(num, min) {
        let unit = {
            1000: ["K", "M", "G", "T"],
            10000: ["万", "亿", "兆"],
            100000:["万"],
            1000000: ["万"]
        }, index = 0, result;
        if (num < min) return parseInt(num);
        if (min == 1000000) {
            return Math.floor(num / 10000) + unit[min][0];
        }
        if(min == 100000){
            min = 10000;
        }
        for (let i = 0, len = unit[min].length; i < len; i++) {
            index = i;
            result = num / Math.pow(min, (index + 1));
            if (result < min) {
                result = result + "";
                if (result.length > 4) result = result.substr(0, 4);
                return (result - 0) + unit[min][i];
            }
        }
    };

    //浅拷贝对象
    static shallowClone(obj){
        let type = getTypeof(obj),
            r;
        if(type == "Array"){
            r = [];
        }else if(type == "Object"){
            r = {};
        }
        if(r){
            for(let k in obj){
                r[k] = obj[k];
            }
            return r;
        }
        return obj;
    }
    
    static updataHtml(forelet, arg, data, ok?,cancel?) {//更新
        if (Common.isExist(forelet, arg)) {
             forelet.paint(data);
         }else {
             forelet.paint(data);
             open(arg,null,ok,cancel);
         }
     }

     //装备排序
    static equipSort(a, b) {
        let grade = a.grade - b.grade;
        if (grade > 0) return -1;
        else if (grade < 0) return 1;
        else return 1;
    };

    //根据物品sid取到道具物品和位置（如果传入装备的sid，由于每个装备会占用一个包裹位置，则会返回第一个找到的装备）
    static getBagPropById(sid) {
        if (!sid)
            return;
        let bag = localDB.bag;
        for (let i = 0; i < bag.length; i++) {
            if (bag[i] && bag[i].sid == sid - 0) {
                return [i, bag[i]];
            }
        }
    };
}
