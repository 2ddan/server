
import { BonBuffer } from "../util/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr, structMgr} from "../struct/struct_mgr";
import { StructInfo, Type, FieldInfo, EnumType, EnumInfo} from "../struct/sinfo";
import { u64Merge,u128Merge,u64Unwrap,u128Unwrap } from "./util";

export class U64 extends Struct {

    value: bigInt.BigInteger;
	static _$info =  new StructInfo("pi/bigint/big_struct.U64",2075458578,  new Map( [["constructor","true"]]), [new FieldInfo("value", 
new EnumType( Type.U64 ), null) ]);

	constructor(value?: bigInt.BigInteger, old?: U64){
		super();
		if(!old){
			this.value = value;
		}else{
			this.value = value === undefined? old.value:value;
		}
	}

	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
	}




	bonDecode(bb:BonBuffer) {
		(<any>this).value = u64Merge(bb.readBigInt());
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeBigInt(u64Unwrap(this.value));
        
	}
    }
    structMgr.register(U64._$info.name_hash, U64, U64._$info.name);


export class U128 extends Struct {

    value: bigInt.BigInteger;
	static _$info =  new StructInfo("pi/bigint/big_struct.U128",873530750,  new Map( [["constructor","true"]]), [new FieldInfo("value", 
new EnumType( Type.U128 ), null) ]);

	constructor(value?: bigInt.BigInteger, old?: U128){
		super();
		if(!old){
			this.value = value;
		}else{
			this.value = value === undefined? old.value:value;
		}
	}

	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
	}




	bonDecode(bb:BonBuffer) {
		(<any>this).value = u128Merge(bb.readBigInt());
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeBigInt(u128Unwrap(this.value));
        
	}
    }
    structMgr.register(U128._$info.name_hash, U128, U128._$info.name);

