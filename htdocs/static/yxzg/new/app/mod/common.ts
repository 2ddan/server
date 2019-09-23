import { data as localDB, updata, checkTypeof,getTypeof } from "./db";
import { CfgMgr } from "./cfg_mgr";
import DB from "./newDB";
import { Pi } from "./pi";
import { Effect } from "../scene/effect";

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
                    setTimeout(() => {
                        callback();
                    }, 0);
                }else {
                    setTimeout(() => {
                        func();
                    }, 5);
                }
                
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

    /**
	 * 判断value是否为Array
	 * @param  {js value} value 合法的js值
	 * @return {boolean} value是否为Array
	 */
	static isArray = function (value) {
		return Object.prototype.toString.apply(value) === "[object Array]";
    };

    /**
	 * 判断value是否为Object
	 * @param  {js value} value 合法的js值
	 * @return {boolean} value是否为Array
	 */
	static isObject = function (value) {
		return Object.prototype.toString.apply(value) === "[object Object]";
    };
    
    /**
	 * 深度克隆
	 * @param  {object} obj 待克隆的对象
	 * @return {object}     生成的对象
	 */
	static deepClone = function (obj) {
		var o, i = 0,
			len = 0,
			k;
		switch (typeof obj) {
			case 'undefined':
				break;
			case 'string':
				o = obj.toString();
				break;
			case 'number':
				o = obj - 0;
				break;
			case 'boolean':
				o = obj;
				break;
			case 'object':
				if (obj === null) {
					o = null;
				} else {
					if (Common.isArray(obj)) {
						o = [];
						for (i = 0, len = obj.length; i < len; i++) {
							o.push(this.deepClone(obj[i]));
						}
					} else {
						o = {};
						for (k in obj) {
							if (obj.hasOwnProperty(k)) {
								o[k] = this.deepClone(obj[k]);
							}
						}
					}
				}
				break;
			default:
				o = obj;
				break;
		}
		return o;
	};


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
    
    /**
     * @method isCanWearEquipment 是否可以穿戴装备
     */
    static isCanWearEquipment = (equipmentID: number) => {
        const cfg = CfgMgr.getOne('cfg/equipment', equipmentID);
            const player = localDB.player;
            const noEquipIDs = localDB.equipments;
            const equipedIDs = [].concat((player.weapon || []),(player.armor || []),(player.other_equipments || []));

            // 不存在装备
            if (!cfg) return false;
            // 背包中不存在该装备
            if (noEquipIDs.indexOf < 0) return false;
            // 装备格已满
            if (equipedIDs.length >= player.equipment_max) return false;
            // 已装备武器
            if (cfg.type === 1 && player.weapon) return false;
            // 已装备防具
            if (cfg.type === 2 && player.armor) return false;
            // 饰品格已满
            if (cfg.type === 3 && player.other_equipments.length >= (player.equipment_max - 2))     return false;

            return true;
    };

    /**
     * @method achieveDB 成就数据
     */
    static achieveBaseDB = () => {
        const hero = CfgMgr.getOne('cfg/hero', localDB.player.hid);
        return DB['data'].achieve[Number(hero.occupation)];
    };

    /**
     * @method achieveDiffDBArr 获取当前难度及以下所有难度
     */
    static achieveDiffDBArr = () => {
        const achieveDiffDBArr = [];

        for (let i = 1; i <= localDB.player.difficulty; i++) {
            achieveDiffDBArr.push(Common.achieveBaseDB().dif[i]);
        }

        return achieveDiffDBArr;
    };

      /**
     * @method missionDB 任务数据
     */
    static missionBaseDB = () => {
        const hero = CfgMgr.getOne('cfg/hero', localDB.player.hid);
        return DB['data'].mission[Number(hero.occupation)];

    };
      /**
     * @method missionDB 任务通用数据
     */
    static missionCoBaseDB = () => {
        return DB['data'].mission[0];
    };
     /**
     * @method missionDiffDBArr 获取当前难度及以下所有难度
     */
    static missionDiffDBArr = () => {
        const missionDiffDBArr = [];

        for (let i = 1; i <= localDB.player.difficulty; i++) {
            missionDiffDBArr.push(Common.achieveBaseDB().dif[i]);
        }

        return missionDiffDBArr;
    };
    /**
     * 翻译
     */
    static transfer = (word: string) => {
        if (Pi.language === 'ch') return word;

        const cfgOneWord = CfgMgr.getOne('cfg/words', word);

        return cfgOneWord[Pi.language];
    }
    /**
     * @description 3d场景坐标到2d转换
     */
    static xyz3Dto2D = (pos: any, coefficient_x: number = 114, coefficient_y: number = 38) => {
        let w = 1334/2,
            h = 750/2,
            left,
            top;
        left = w - pos.x * coefficient_x;
        top = h + pos.y * coefficient_y;
        return {left,top};
    }
    /**
     * @description 2d场景坐标到3d转换
     */
    static xyz2Dto3D = (pos: any, coefficient_x: number = 114, coefficient_y: number = 38) => {
        let w = 1334/2,
            h = 750/2,
            x,
            y;
        x = (w - pos.left)/coefficient_x;
        y = (pos.top - h)/coefficient_y;
        return {x,y};
    }

    /**
    * 数字滚动
    */
    static numberScroll = (oldNum: number, newNum: number, handle: Function, callback?: Function) => {
       if (oldNum === newNum) return;
   
       let oldArr = String(oldNum).split('');
       let newArr = String(newNum).split('');
   
       let len = Math.abs(oldArr.length - newArr.length);
       let handleArr = oldArr.length > newArr.length ? newArr : oldArr;
   
       for (let i = 0; i < len; i++) {
           handleArr.unshift('0');
       }
   
       let intervalTime = 40;
       let timer;
   
       let fun = () => {
           
           if (Number(oldArr.join('')) !== Number(newArr.join(''))) {
               for (let i = 0; i < oldArr.length; i++) {
                   if (Number(oldArr[i]) < Number(newArr[i])) {
                       oldArr[i] = String(Number(oldArr[i])+1);
                   } else if (Number(oldArr[i]) > Number(newArr[i])) {
                       oldArr[i] = String(Number(oldArr[i])-1);
                   }
               }
   
               handle && handle(Number(oldArr.join('')));
   
               timer = setTimeout(fun, intervalTime);
           } else {
   
               timer && clearTimeout(timer);
               timer = undefined;
               callback && callback();
           }
       };
   
       fun();
   };

   /**
    * 创建获取特效
    */
   static createGetEffect = (awardType: string, customData?: any) => {
        if (!awardType) return;

        if (awardType === 'money') {
            let effMoney = Effect.baseEffect('eff_ui_money', { isOnce: true }, () => {
                Effect.removeEffect(effMoney, 'effScene');
                effMoney = null;
            }, 'effScene');
        }
        else if (awardType === 'card') {
            
        }
        else if (awardType === 'equipment' || awardType === 'hp' || awardType === 'exp') {
            let effItem = Effect.baseEffect('eff_ui_item', { isOnce: true }, () => {
                Effect.removeEffect(effItem, 'effScene');
                effItem = null;
            }, 'effScene', null, customData);
        }
   };
}
