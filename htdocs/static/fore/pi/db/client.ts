import { Session, DB, TxHandler, Transaction, Item, Modify } from "./db";
import { ListenerList } from "../util/event";
import { Json } from "../lang/type";

export class CSession extends Session {
	root: BTree
	db: CDB
	tCount = 0;//正在进行的事务的数量
	// 打开与数据库的会话。
	open(db:CDB){
		if(this.db){
			return new Error("该会话已经连接了一个数据库，请先关闭连接！");
		}
		db.open();
		this.root = db.root; 
		this.db = db;
	}
	// 关闭与数据库的会话。
	close(){
		if(this.tCount > 0){
			return new Error("该会话的事务未结束，无法关闭！")
		}
		this.db.close();
		delete this.db;	
		delete this.root;	
		this.tCount = 0;
	}
	// 读事务，无限尝试直到超时，默认10秒
	read(tx:TxHandler, timeout?:number){
		let t = new CTransaction();
		t.start(this);
		handler(tx, t, timeout || 10000);
	}
	// 写事务，无限尝试直到超时，默认10秒
	write(tx:TxHandler, timeout?:number){
		let t = new CTransaction();
		t.start(this);
		handler(tx, t, timeout || 10000);
	}

}

export class CTransaction extends Transaction {
	// 是否为写事务
	writable: boolean = false;
	session: CSession;
	// 事务的超时时间
	timeout:number=5000;
	//开始本地事务
	start(s:CSession){
		this.session = s;
		s.tCount++;
	}
	//结束本地事务。
	end(){
		this.session.tCount--;
		this.session.root = undefined;
	}
	// 提交一个本地事务。
	commit(){
		this.session.db.root = this.session.root;
	}
	// 回滚一个本地事务。
	rollback(){
		this.session.root = undefined;
	}
	// 预提交一个本地事务。
	prepare(){}
	// 回滚一个已进行预提交的事务。
	recover(){}
	// 锁
	lock(arr:Array<Item>, lockTime:number){
	}
	// 查询
	query(arr:Array<Item>, lockTime?:number):Array<Item>{
		for(let i = 0; i < arr.length; i++){
			let item = arr[i];
			let tab = 
		}
		return [];
	}
	// 插入或更新
	upsert(arr:Array<Item>, lockTime?:number){
		let item: Item, tab;
		for(let i = 0; i < arr.length; i++){
			item = arr[i];
			if(!item) continue;
			tab = this.session.root.get(item.tab);
			if(item.time >= 0){
				tab = tab.set(item.key, item.value);
			}else if(item.time < 0){
				tab = tab.delete(item.key);
			}
			this.session.root = this.session.root.set(item.tab, tab);
		}
	}
	// 删除
	delete(arr:Array<Item>, lockTime?:number){
		
	}
	// 迭代
	iter(tab:string, filter:string){

	}
	// 新增 修改 删除 表
	alter(tab:string, meta?:Json){
		this.session.root = this.session.root.set(tab, new BTree())//新增
	}

}

/**
 * @description 数据库会话
 * @example
 */
export class CDB extends DB {
	listeners = new ListenerList<Modify>();
	tabListeners = new Map<string, ListenerList<Modify>>();
	root: BTree
	// 打开数据库
	open(){
	}
	// 关闭数据库
	close(){
	}

}

class BTree {
	get(key: any){

	}
	set(key: any, value: any): BTree{
		return new BTree
	}

	delete(key: any){

	}
}

const handler = (h:TxHandler, t: CTransaction, timeout: number) => {
	let time = new Date().getTime();
	let ret = h(t);//业务逻辑，对数据库进行增删改查
	if(ret instanceof Error){
		let surTime = timeout - new Date().getTime() + time;
		if(surTime > 0){
			//操作数据库失败，且未超时，尝试再次
			setTimeout(
				((tx, ct, timeout) => {
					handler(tx, ct, timeout);
				})(h, t, surTime)
			, 100);
		}else{
			t.rollback(); //如果超时，事务回滚
			t.end();//结束事务
		}
	}else{
		t.commit();//提交事务
		t.end();//结束事务
	}
}