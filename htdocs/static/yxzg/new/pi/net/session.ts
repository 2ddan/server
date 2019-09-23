import {Tr} from "../db/mgr";

export interface Session{

    //设置session
    set(tr: Tr, key: string, value: string | number);

    /**
     * 取session 值
     * @param tr 事务
     * @param key key
     * @param t 值类型 "string" | "number"
     */ 
    get(tr: Tr, key: string, t?: string): number | string;

    //取sessionId
    getId(): number;
}