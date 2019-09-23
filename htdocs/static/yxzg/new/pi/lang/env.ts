import {Mgr} from "../db/mgr";

export class Env {
    dbMgr?: Mgr;
    other: Map<string, any>;

    get<T>(name: string): T{
        let r = this.other.get(name);
        if(!r){
            return;
        }
        if (r instanceof Object) {
            if(r[0]){
                if(r[1]){
                    return r[1](r[0]);
                }else{
                    return r[0];
                }
            }
        }
        
        return r;
    }

    set(name: string, obj: any) {
        if(this.other.get(name)){
            throw new Error("NativeObject is exist! name:" + name);
        }
        this.other.set(name, obj);
    }
}