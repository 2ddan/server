
import { BonBuffer } from "../util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr, structMgr} from "../struct/struct_mgr";
import { StructInfo, Type, FieldInfo, EnumType, EnumInfo} from "../struct/sinfo";

export class OK_I extends Struct {

    value: number;
	static _$info =  new StructInfo("pi/net/rpc_r.OK_I",722477464, null, [new FieldInfo("value", 
new EnumType( Type.Usize ), null) ]);






	bonDecode(bb:BonBuffer) {
		(<any>this).value = bb.readInt();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.value);
        
	}
    }
    structMgr.register(OK_I._$info.name_hash, OK_I, OK_I._$info.name);


export class OK_S extends Struct {

    value: string;
	static _$info =  new StructInfo("pi/net/rpc_r.OK_S",1882083963, null, [new FieldInfo("value", 
new EnumType( Type.Str ), null) ]);






	bonDecode(bb:BonBuffer) {
		(<any>this).value = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.value);
        
	}
    }
    structMgr.register(OK_S._$info.name_hash, OK_S, OK_S._$info.name);


export class Req extends Struct {

    path: string;
	static _$info =  new StructInfo("pi/net/rpc_r.Req",3608827980, null, [new FieldInfo("path", 
new EnumType( Type.Str ), null) ]);






	bonDecode(bb:BonBuffer) {
		(<any>this).path = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.path);
        
	}
    }
    structMgr.register(Req._$info.name_hash, Req, Req._$info.name);


export class Error extends Struct {

    code: number;
    info: string;
	static _$info =  new StructInfo("pi/net/rpc_r.Error",2102366875, null, [new FieldInfo("code", 
new EnumType( Type.Usize ), null), new FieldInfo("info", 
new EnumType( Type.Str ), null) ]);






	bonDecode(bb:BonBuffer) {
		(<any>this).code = bb.readInt();
		(<any>this).info = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.code);
                
        bb.writeUtf8(this.info);
        
	}
    }
    structMgr.register(Error._$info.name_hash, Error, Error._$info.name);


export class Ok extends Struct {

	static _$info =  new StructInfo("pi/net/rpc_r.Ok",622395616, null, [ ]);






	bonDecode(bb:BonBuffer) {
	}


	bonEncode(bb:BonBuffer) {
	}
    }
    structMgr.register(Ok._$info.name_hash, Ok, Ok._$info.name);

