import { BonBuffer, BonCode } from '../util/bon';

export enum Type{
    Bool,
	U8,
	U16,
	U32,
	U64,
	U128,
	U256,
	Usize,
	I8,
	I16,
	I32,
	I64,
	I128,
	I256,
	Isize,
	F32,
	F64,
	BigI,
	Str,
	Bin,
	Arr,
	Map,
    Struct,//元组被认为是结构体类型
    Option,// 可能为空的类型
    Enum,// 是枚举的类型 ，ts语法ru: number | string
}

export class EnumType implements BonCode{
    type: Type;
    into?: EnumType;
    mapType?:[EnumType, EnumType];
    structType?: StructInfo;
    enumType?: EnumInfo;
 
    constructor(type: Type, into?: EnumType | [EnumType, EnumType] | StructInfo | EnumInfo){
        this.type = type;
        switch(this.type){
            case Type.Arr:
                this.into =into as EnumType;
                break;
            case Type.Option:
                this.into =into as EnumType;
                break;
            case Type.Map:
                this.mapType = into as [EnumType, EnumType];
                break;
            case Type.Struct:
                this.structType = into as StructInfo;
                break;
            case Type.Enum:
                this.enumType = into as EnumInfo;
                break;
            default:
                break;
        }
    }
    /**
	 * 二进制编码
	 */
    bonEncode(bb: BonBuffer){
        bb.writeInt(this.type);
        this.into && bb.writeBonCode(this.into);
        if(this.mapType){
            bb.writeBonCode(this.mapType[0]);
            bb.writeBonCode(this.mapType[1]);
        }
        this.structType && bb.writeBonCode(this.structType);
        this.enumType && bb.writeBonCode(this.enumType);
    }
	/**
	 * 二进制解码
	 */
	bonDecode(bb: BonBuffer){
        this.type = bb.readInt();
        switch(this.type){
            case Type.Arr:
                this.into = bb.readBonCode(EnumType);
                break;
            case Type.Option:
                this.into = bb.readBonCode(EnumType);
                break;
            case Type.Map:
                this.mapType = [bb.readBonCode(EnumType), bb.readBonCode(EnumType)];
                break;
            case Type.Struct:
                this.structType = bb.readBonCode(StructInfo);
                break;
            case Type.Enum:
                this.enumType = bb.readBonCode(EnumInfo)
                break;
            default:
                break;
        }
    }
}

export class FieldInfo implements BonCode{
	name: string;
	ftype: EnumType;
    notes: Map<string, string>;
    
    /**
     * @param name 字段名
     * @param ftype 字段类型
     * @param notes 字段注解， 可以为null
     */
    constructor(name: string, ftype: EnumType, notes: Map<string, string>){
        this.name = name;
        this.ftype = ftype;
        this.notes = notes;
    }
    /**
	 * 二进制编码
	 */
    bonEncode(bb: BonBuffer){
        bb.writeUtf8(this.name);
        bb.writeBonCode(this.ftype);
        if(this.notes){
            bb.writeMap(this.notes, (v, k) =>{
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            })
        }else{
            bb.writeNil();
        }
        
    }

	/**
	 * 二进制解码
	 */
	bonDecode(bb: BonBuffer){
        this.name = bb.readUtf8();
        this.ftype = bb.readBonCode(EnumType);
        if(!bb.isNil()){
            this.notes = bb.readMap(() => {
                return [bb.readUtf8(), bb.readUtf8()]
            });
        }
    }
}
    
/**
 * 结构信息
 * @example
 */
export class StructInfo implements BonCode {
    name: string;//名称
    name_hash: number;//名称hash
    notes: Map<string, string>;//注解,与rust的StructInfo保持一致，可以为null
    fields: Array<FieldInfo>;//字段详情（包含字段名称及类型）
    
    /**
     * @param name 名称
     * @param name_hash hash值
     * @param notes 注解，可以为null
     * @param fields 字段，没有字段是应该传入空数组[], 不允许传入null
     */
    constructor(name: string, name_hash: number, notes: Map<string, string>, fields: Array<FieldInfo>){
        this.name = name;
        this.name_hash = name_hash;
        this.notes = notes;
        this.fields = fields || [];
    }
    
    bonEncode(bb: BonBuffer){
        bb.writeUtf8(this.name);
        bb.writeInt(this.name_hash);
        if(this.notes){
            bb.writeMap(this.notes, (k, v) => {
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            });
        }else{
            bb.writeNil();
        }
        
        bb.writeArray(this.fields, (el) => {
            bb.writeBonCode(el);
        });
    }
	/**
	 * 二进制解码
	 */
	bonDecode(bb: BonBuffer){
        this.name = bb.readUtf8();
        this.name_hash = bb.readInt();
        if (!bb.isNil()){
            this.notes = bb.readMap(() => {
                return [bb.readUtf8(), bb.readUtf8()]
            });
        }
        
        this.fields = bb.readArray(() => {
            return bb.readBonCode(FieldInfo);
        });
    }
}

export class EnumInfo{
    name: string;//名称
    name_hash: number;//名称hash
    notes: Map<string, string>;//注解,可以为null
    members: Array<EnumType>;//枚举成员类型，该数组不能为空，但其中的元素可以为空

    /**
     * @param name 名称
     * @param name_hash hash值
     * @param notes 注解，可以为null
     * @param members 枚举成员类型，该数组不能为空，但其中的元素可以为空
     */
    constructor(name: string, name_hash: number, notes: Map<string, string>, members: Array<EnumType>){
        this.name = name;
        this.name_hash = name_hash;
        this.notes = notes;
        this.members = members || [];
    }
    
    bonEncode(bb: BonBuffer){
        bb.writeUtf8(this.name);
        bb.writeInt(this.name_hash);
        if(this.notes){
            bb.writeMap(this.notes, (k, v) => {
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            });
        }else{
            bb.writeNil();
        }
        
        bb.writeArray(this.members, (el) => {
            if(el === null || el === undefined){
                bb.writeNil();
            }else{
                bb.writeBonCode(el);
            }
        });
    }
	/**
	 * 二进制解码
	 */
	bonDecode(bb: BonBuffer){
        this.name = bb.readUtf8();
        this.name_hash = bb.readInt();
        if (!bb.isNil()){
            this.notes = bb.readMap(() => {
                return [bb.readUtf8(), bb.readUtf8()]
            });
        }
        
        this.members = bb.readArray(() => {
            if(bb.isNil()){
                return null;
            }else{
                return bb.readBonCode(EnumType);
            }
        });
    }
}

//数据库表的元信息， 应该移动至db.ts文件中？
export class TabMeta implements BonCode{
    k: EnumType;
    v: EnumType;
    
    constructor(k?: EnumType, v?: EnumType){
        this.k = k;
        this.v = v;
    }
    
    bonEncode(bb: BonBuffer){
        this.k.bonEncode(bb);
        this.v.bonEncode(bb);
    }

	bonDecode(bb: BonBuffer){
        this.k = bb.readBonCode(EnumType);
        this.v = bb.readBonCode(EnumType);
    }
}
