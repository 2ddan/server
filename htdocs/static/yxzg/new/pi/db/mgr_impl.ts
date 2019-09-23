import {Handler, Mgr as MgrInterface, Tr as TrInterface, Item} from "./mgr";
import {TabMeta} from "../struct/sinfo";
import {CSession, CDB, CTransaction} from "./client";

export class Mgr implements MgrInterface{
    ware_list: Map<string, CDB>;
    sessions: Map<string, CSession>;

    //表的元信息
    tabInfo(ware_name:string, tab_name: string): TabMeta{
        return null;
    }

    //创建事务
    transaction(writable:boolean): Tr {
        return new Tr(this.ware_list, this.sessions, writable);
    }
 
    //注册数据库
    register<T>(ware_name: string, ware: T): boolean{
        if (this.ware_list.get(ware_name)) {
            return false;
        }
        this.ware_list.set(ware_name, ware as any);
        return true;
    }

    //写数据库
    write(txhd: Handler, timeout?: number){
        let time = new Date().getTime();
        while(timeout > 0){
            let tr = this.transaction(true);
            let r = txhd(tr);
            try {
                tr.prepare();
                tr.commit();
                return r;
            } catch (error) {
                timeout = timeout - (new Date().getTime() - time);
                tr.rollback();
            }
        }
        throw new Error("write timeout");
    }

    //读数据库
    read(txhd: Handler, timeout?:number){
        let time = new Date().getTime();
        while(timeout > 0){
            let tr = this.transaction(false);
            let r = txhd(tr);
            try {
                tr.prepare();
                tr.commit();
                return r;
            } catch (error) {
                timeout = timeout - (new Date().getTime() - time);
                tr.rollback();
            }
        }
        throw new Error("read timeout");
    }
}

export class Tr implements TrInterface{
    ware_list: Map<string, CDB>;
    sessions: Map<string, CSession>;
    writable: boolean;

    prepare_list: CTransaction[];
    tr_map: Map<string, CTransaction>;
    constructor(ware_list: Map<string, CDB>, sessions:Map<string, CSession>, writable: boolean){
        this.ware_list = ware_list;
        this.sessions = sessions;
        this.writable = writable;
        this.prepare_list = [];
        this.tr_map = new Map();
    }
    //预提交
    prepare(){
        this.tr_map.forEach((v, k) => {
            v.prepare();
            this.prepare_list.push(v);
        });
    }

    //提交
    commit(){
        this.tr_map.forEach((v, k) => {
            v.commit();
            v.end();
            //结束事务， 关闭session
            let session = this.sessions.get(k);
            session.close();
        });
        this.prepare_list = [];
        this.sessions.clear();
        this.tr_map.clear();
    }

    //回滚
    rollback(){
        //回滚已经预提交的事务
        for (let i = 0; i< this.prepare_list.length; i++){
            this.prepare_list[i].rollback();
        }
        //结束事务， 关闭session
        this.tr_map.forEach((v, k) => {
            v.commit();
            v.end();
            let session = this.sessions.get(k);
            session.close();
        });
        this.prepare_list = [];
        this.sessions.clear();
        this.tr_map.clear();
    }

    //查询
    query(arr: Item[], lock_time:number,read_lock:boolean):Item[]{
        let items: Item[] = [];
        for (let i = 0; i < arr.length; i++){
            let item = arr[i];
            let tr = this.getTr(arr[i].ware);
            let r = tr.query_one(item, lock_time) as any;
            r.ware = arr[i].ware;
            items[i] = r;
        }
        return items
    }

    //修改
    modify(arr:Item[],lock_time:number,read_lock:boolean){
        for (let i = 0; i < arr.length; i++){
            let item = arr[i];
            let tr = this.getTr(arr[i].ware);
            tr.modify_one(item, lock_time);
        }
    }

    //创建表
    alter(ware_name:string,tab_name:string,meta:TabMeta){
        let tr = this.getTr(ware_name);
        tr.alter(tab_name, meta);
    }

    //迭代器
    iter<K, V>(ware: string, tab: string, key: any, descending:boolean, _filter:string): Iterable<[K, V]>{
        let tr = this.getTr(ware);
        return {
            [Symbol.iterator]: () => new DbItertor(tr.iter( tab, _filter)) as any
        }
    }

    private getTr(ware_name: string): CTransaction{
        let tr = this.tr_map.get(ware_name);
        if (!tr) {
            let db = this.ware_list.get(ware_name);
            if (!db) {
                throw new Error("create tr error, ware is not exist!");
            }
            let session = this.sessions.get(ware_name);
            if (!session) {
                session = new CSession();
                session.open(db);
                this.sessions.set(ware_name, session);
            }
            tr = new CTransaction();
            tr.writable = this.writable;
            tr.start(session);
            this.tr_map.set(ware_name, tr);
        }
        return tr;
    }
}

export class DbItertor<K, V> implements Iterator<[K, V]>{
    inner: IterableIterator<{key: K, value: V}>;

    constructor(inner: IterableIterator<{key: K, value: V}>){
        this.inner = inner;
    }
    
    next() {
        let r = this.inner.next();
        if (r.done === true) {
            return {done: true, value: undefined};
        }else {
            return {done: false, value: [r.value.key, r.value.value] as [K, V]};
        }
    }
}