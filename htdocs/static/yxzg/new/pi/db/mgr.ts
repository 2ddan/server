import {TabMeta} from "../struct/sinfo";
import { read } from "../struct/util";

export interface Item{
    ware: string,
    tab: string,
    key: any,
    value?: any
}

export interface Mgr{
    //表的元信息
    tabInfo(ware_name:string, tab_name: string): TabMeta;

    //创建事务
    transaction(writable:boolean): Tr;

    //注册数据库
    register<T>(ware_name: string, ware: T): boolean;

    //写数据库
    write(txhd: Handler, timeout?: number);

    //读数据库
    read(txhd: Handler, timeout?:number);
}

export interface Tr{
    //预提交
    prepare():void;

    //提交
    commit():void;

    //回滚
    rollback(): void;

    //查询
    query(arr: Item[], lock_time:number,read_lock:boolean):Item[];

    //修改
    modify(arr:Item[],lock_time:number,read_lock:boolean):void;

    //创建表
    alter(ware_name:string,tab_name:string,meta:TabMeta):void;

    //迭代器
    iter<K, V>(ware: string, tab: string, key: any, descending:boolean, _filter:string): Iterable<[K, V]>;

    //迭代器
    iter_raw?<K, V>(ware: string, tab: string, key: any, descending:boolean, _filter:string): Iterator<[K, V]>;
}

export interface Handler{
    (tr: Tr): any
}