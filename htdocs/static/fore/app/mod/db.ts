/*global pi, window, document */

/**
 * @name app.mod.db
 * @object
 * @namespace
 * @description 游戏前台数据库
 */
import { set as task, getTask, clear,getPrioritySize } from "pi/util/task_mgr";
import { getGlobal } from "pi/widget/frame_mgr"
    let //数据库表
		table = {},
		//监听事件表
		listenTable = {},
		//任务池当前等待的监听function
		taskFuncs = [],
		//任务开始堆积时间
		heapedTime = 0,
		//帧管理器
		frame = getGlobal(),
		//丢任务定时器
		pushTimer = null,
		//等待监听路径表
		//waitPaths = {path:[],extra:[],temp:[],running:false},
		waitPaths = {func:[],path:[],runing:false},
		//设置索引
		//自己关心的数据下面单条属性
		//get("tips*from='hero'");
		//updata("bag*type='equip'",0);
		//listen("bag*type='friend'",function(){});
		initCfg = {"mail":["index"],"bag":["type","sid","slot","soulType","id"],"clothesBag":["sid","isDress"],"friend_battle":["level"]},
		//{"bag*type='friend'":[0,1,5,25]}
		indexed = {},
		/**
		 * @description 前台数据结构
		 */
		local = {
			
		};
		
		//查询数据
		//path player.level || tips*from='hero'
		//_default 默认值，如果查询没有数据，则返回
		let _get = (path : String) => {
			let func = (_data,path,i) => {
				let _d = _data[path[i]];
				if(!_d || i===(path.length-1))return _d;
				else if(!checkTypeof(_d,"Array") && !checkTypeof(_d,"Object")){
					return ;
				}
				return func(_d,path,i+1);
			};
			if(path.indexOf("*")>=0){
				return getBatch(path);
			}else {
				return func(local,path.split("."),0);
			}
		},
		//更新索引
		//@param path ("player.level")不含*
		udIndexed = function(path,value,_old){
			if(!initCfg[path.split(".")[0]])return [];
			_old = _old[1];
			let r = path.split("."),
				_new = local[r[0]][r[1]],
				indexCfg = initCfg[r[0]],
				get_Key = function(v){
					let _arr = [];
					if(checkTypeof(v,"Object")){
						for(let k in indexCfg){
							let _key;
							if(v[indexCfg[k]]){
								if(isNaN(v[indexCfg[k]])){
									_key = r[0]+"*"+indexCfg[k]+"='"+v[indexCfg[k]]+"'";
								}else _key = r[0]+"*"+indexCfg[k]+"="+v[indexCfg[k]];
							}
							if(_key && _arr.indexOf(_key)<0)_arr.push(_key);
						}
					}
					return _arr;
				},
				old_key = get_Key(_old),
				new_key = get_Key(_new), 
				_listen = [];
			for(let k in new_key){
				if(old_key.indexOf(new_key[k])<0){
					indexed[new_key[k]] = indexed[new_key[k]] || [];
					indexed[new_key[k]].push(r[1]);
				}
				_listen.push(new_key[k]);
			}
			for(let k in old_key){
				if(new_key.indexOf(old_key[k])<0){
					indexed[old_key[k]].splice(indexed[old_key[k]].indexOf(r[1]),1);
					_listen.push(old_key[k]);
				}
			}
			return _listen;
		},
		//更新数据(普通路径)
		//@param path 数据路径（a.b.c.d）
		//				 value 新数据
		//@return old (a.b.c.d)旧数据（更新成功）|| undefined（更新失败）
		//		  _old (a.b)根数据
		udNormal =  function(path,value){
			let v = _get(path),_old, _o = _get(path.match(/\w+\.\w+|\w+/)[0]),old = v!==undefined?JSON.parse(JSON.stringify(v)):v,
				func = (_data,val,p,i) => {
					let _d = _data[p[i]];
					if(i === (p.length-1))_data[p[i]] = val;
					else if(checkTypeof(_d,"Object") || checkTypeof(_d,"Array")){
						func(_d,val,p,i+1);
					}else {
						console.error("Can't update the value of db which key is '"+path+"',and be broken at '"+p.splice(0,i+1).join(".")+"'");
					}
				};
			if(checkTypeof(_o,"Array"))_old = copyObj(_o,[]);
			else if(checkTypeof(_o,"Object"))_old = copyObj(_o,{});
			else _old = _o;
			func(local,value,path.split("."),0);
			return [old,_old];
		},
		//更新数据(批量路径)
		//@param path 数据路径（bag*type='gem'）
		//				 value 新数据
		//@return old旧数据（更新成功）|| undefined（更新失败）
		udBatch =  function(path,value){
			let _list = indexed[path],r = path.match(/(.+)\*(.+)=(.+)/);
			for(let k in _list){
				local[r[1]][_list[k]] = value;
			}
			//如果新值不是对象或者元素不含索引则清空索引表
			/**后面处理数组情况、以及新数据中含有新的索引**/
			if(!checkTypeof(value,"Object") || value[r[2]] != r[3])indexed[path] = [];
		},
		//获取数据(批量路径)
		//@param path 数据路径（bag*type='gem'）
		//				 value 新数据
		//@return old旧数据（更新成功）|| undefined（更新失败）
		getBatch = function(path){
			let r = path.match(/(.+)\*(.+)=(.+)/),
				_keys = indexed[path],
				old = local[r[1]],
				result = checkTypeof(old,"Array")?[]:{};
			for(let k in _keys){
				result[_keys[k]] = old[_keys[k]];
			}
			return result;
		},
		//创建指定长度且值为同一value的数组
		//@param length数组长度，value数组元素（只能是非对象）
		createSameVauleArr = function(length,value){
			let _arr = new Array(length);
			return _arr.fill('"'+value+'"');
		},
		//把需要执行的监听回调存入wait表中
		addPath = function(path,extra?){
			for(let key in listenTable){
				let k = key.split(",")[0];
				if(path.indexOf(k)==0 && (!path[k.length] || path[k.length] == ".") || k.indexOf(path)==0 && (!k[path.length] || k[path.length] == ".")){
					waitPaths.func = waitPaths.func.concat(listenTable[key]);
					waitPaths.path = waitPaths.path.concat(createSameVauleArr(listenTable[key].length,key+","+path));
				}
			}
		},
		all= 0,
		taskCount = 0,
		//丢进任务池子
		runPath = function(){
			let func = function(){
				if(pushTimer || waitPaths.func.length === 0)return;
				pushTimer = setTimeout(function(){
					//all += waitPaths.func.length;
					for(let j=0,len = waitPaths.func.length;j<len; j++){
						//去重
						//if((waitPaths.func.indexOf(waitPaths.func[j])<j || taskFuncs.indexOf(waitPaths.func[j])>=0) && (waitPaths.path[j].indexOf(",") === waitPaths.path[j].lastIndexOf(",") || waitPaths.path.indexOf(waitPaths.path[j])<j))continue;
						if(taskFuncs.indexOf(waitPaths.func[j]) >= 0 || waitPaths.func.indexOf(waitPaths.func[j]) !== j)continue;
						let _func = (function(a){
							return function (b) {
								//删除任务池缓存函数
								taskFuncs.splice(taskFuncs.indexOf(a),1);
								taskCount--;
								//抛出监听列表跑完的事件
								if(taskCount == 0){
									_notify("listenerOver");
								}
								let time = Date.now();
								try{
									a(b);
								}catch(e){
									console && console.error("db listen function hang up : ",a,e);
								}
								let time1 = Date.now();
								if(time1 - time > 4){
									console.log("slow db listen function : "+(time1 - time),a);
								}
								
							};
						})(waitPaths.func[j]);
						taskCount ++;
						all ++ ;
						//缓存任务池运行函数
						taskFuncs.push(waitPaths.func[j]);
						//放入任务池
						task(_func,[waitPaths.path[j]],0,0);
					}
					// console.log(taskCount+" / "+all);
					waitPaths.func = [];
					waitPaths.path = [];
					pushTimer = null;
				},0);
			};
			func();
		},
		_notify = (type) => {
			let arr = listenTable["$"+type];
			if(!arr || !arr.length)return;
			for(let k in arr){
				arr[k]();
			}
		},
		//更新数据
		//path player.level || tips*from='hero'
		//value 最终修改的值
		//callback 修改成功后回调
		//extra 额外透传参数，最终位置到达监听回调
		_updata = function(path,value,callback?,extra?){
			let _bth = [];
			if(path.indexOf("*")>=0)udBatch(path,value);
			else {
				_bth = udIndexed(path,value,udNormal(path,value));
			}
			////console.log(path,value);
			//if(){
				addPath(path,extra);
				if(_bth.length){
					for(let k in _bth){
						addPath(_bth[k],extra);
					}
				}
				if(!pushTimer)runPath();
			//}
		},
		//初始化数据索引字段
		initIndex = function(cfg){
			for(let k in cfg){
				for(let i=0,leng = cfg[k].length;i<leng;i++){
					indexed[k+"*"+cfg[k][i]] = [];
				}
			}
		},
		copyObj = (obj,dst) => {
			for(let k in obj){
				dst[k] = obj[k];
			}
			return dst;
		};

// ======================================== 导出
/**
 * @description 初始化数据库字段
 * @param {String}key "player"
 * @param {Json}table {"name":"",exp:0}
 */
export const insert = (key,table) => {
	if(local[key]) 
		throw new Error(`Has the same key('${key}') in db!`);
	local[key] = table;
};
	/**
	 * @description 检测数据类型
	 * @param {String}type Object Array Function Null Number String Undefined
	 */
	export const checkTypeof = (value:any, type) : Boolean => {
		return Object.prototype.toString.call(value) === `[object ${type}]`;
	};
	/**
	 * @description 獲取数据类型
	 * @return {String} Object Array Function Null Number String Undefined
	 */
	export const getTypeof = (value) => {
		return Object.prototype.toString.call(value).replace("[object ","").replace("]","");
	};
	/**
	 * @description 更新数据
	 * @param {String}path 数据路径
	 * @param {String}value 存储的值
	 * @param {Function}callback 执行回凋
	*/
	export const updata = _updata;
	/**
	 * @description 查询数据
	 * @param {String}path "player.level" || "tips*from='hero'"（该条查询tips下面第一层子节点含有from属性且该属性=="hero"的所有节点，）
	 */
	export const get = (path,_default?) => {
		let r = _get(path);
		return r!==undefined?r:_default;
	}
	
	/**
	 * @description 设置数据监听,"$"开头为数据库保留字段,方便设置其他事件监听
	 * @keywords $listenerOver 每次监听列表所有任务执行完毕后调用
	 * @param path{String} "a.b.c,d.e"支持多条 || "$listenerOver"
	 * 		  callback{function} 监听到数据变化时执行的回调
	 * 		  subDiff{Boolean} 是否区分数据修改路径，路径不同，则监听回调不合并，全部执行
	 */
	export const listen = (path,callback,subDiff?) => {
		////console.log(path);
		//alert(path);
		subDiff = (subDiff?(","+subDiff):"");
		let _arr = path.split(","),v;
		for(let k in _arr){
			v = _arr[k].replace(/(^\s*)|(\s*$)/g, "");
			if(!listenTable[_arr[k]])listenTable[_arr[k]+subDiff] = [];
			listenTable[_arr[k]+subDiff].push(callback);
		}
		////console.log(listen);
	};
	/**
	 * @description 清空已经丢进任务池子，还未执行的任务
	 */
	export const clearTask = () => {
		let tp = getTask();

		waitPaths.func = [];
		waitPaths.path = [];
		pushTimer = null;
		all= 0;
		taskCount = 0;
		//清除任务池
		tp.asyncZero.head = undefined;
		tp.asyncZero.tail = undefined;
		tp.asyncZero.size = 0;
	};

	//获取本地数据库
	export const data:any = local;
	//获取缓存表
	export const getCache = () => {
		return {wait :waitPaths,task:taskFuncs};
	};

// =================================== 立即执行
//初始化数据索引字段
initIndex(initCfg);