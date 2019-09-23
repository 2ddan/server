declare var pi_modules;
import {Struct, StructMgr} from "./struct_mgr"

export let mgr;

export const init = () => {
    mgr = new StructMgr()
    for(var id in pi_modules){
        if(pi_modules.hasOwnProperty(id) && pi_modules[id].exports){
            for(var kk in pi_modules[id].exports){
                var c = pi_modules[id].exports[kk];
                if(Struct.isPrototypeOf(c) && c._$info){
                    //console.log(c._$info.name_hash, c._$info.name);
                    mgr.register(c._$info.name_hash, c, c._$info.name);
                }
            }
        }
    }
}