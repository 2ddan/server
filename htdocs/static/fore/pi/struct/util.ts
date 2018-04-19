import { BinCode, BinBuffer, ReadNext, WriteNext } from "pi/util/bin";
import { StructMgr, removeFromMeta, addToMeta, Struct, MStruct, MStructMeta } from "./struct_mgr";
import { butil } from "pi/lang/mod";
import { isInteger, isString } from "pi/compile/gendrust";
import { upperFirst } from "pi/util/util";

//半序列化ReadNext,bb.read()读到的是数据的索引
export const getPartReadNext = (mgr: StructMgr): ReadNext => {
    return (bb:BinBuffer, type: number):Struct => {
        let meta = mgr.lookup(type) as MStructMeta;
        return meta.map.get(bb.read() as number);
    };  
}

//全序列化ReadNext，bb中为整个对象容器
export const getAllReadNext = (mgr: StructMgr): ReadNext => {
    return (bb:BinBuffer, type: number):Struct => {
        let meta = mgr.lookup(type);
        let bc: Struct = new meta.construct();
        bc.binDecode(bb, getAllReadNext(mgr));
        return bc;
    };  
}

//半序列化WriteNext，需要在bb中写入hash和对象的索引 
export const partWrite = (bb:BinBuffer, o: MStruct): void => {
    bb.writeInt(o._$meta.info.nameHash);
    bb.writeInt(o._$index);
}

//全序列化WriteNext，需要在bb中写入整个对象
export const allWrite = (bb:BinBuffer, o: Struct): void => {
    bb.writeInt(o._$meta.info.nameHash);
    o.binEncode(bb, allWrite);
}

/*****************************************测试struct辅助函数，参考********************************************* */

export const registerToMgr = (fileMap, mgr: StructMgr) => {
	let exp, filePath;
	for (let k in fileMap) {
		if (k.indexOf("examples/struct") === 0){
            filePath = k.slice(0, k.length - butil.fileSuffix(k).length - 1);
            exp = (<any>self).pi_modules[filePath].exports;
            for(let kk in exp){
                if(MStruct.isPrototypeOf(exp[kk])){
                    mgr.register(exp[kk]._$info.nameHash, exp[kk], filePath+"."+kk);
                }
            }
        }
    }
}

export const registerRpc = (fileMap, mgr: StructMgr) => {
	let exp, filePath;
	for (let k in fileMap) {
		filePath = k.slice(0, k.length - butil.fileSuffix(k).length - 1);
		if(!(<any>self).pi_modules[filePath]){
			continue;
		}
		exp = (<any>self).pi_modules[filePath].exports;
		for(let kk in exp){
			if(exp[kk]._$info && exp[kk]._$info.annotate &&　exp[kk]._$info.annotate.type === "rpc"){
				mgr.register(exp[kk]._$info.nameHash, exp[kk], filePath+"."+kk);
			}
		}

	}
}

export const modifyListner = (struct: MStruct, field: string, value: any, old: any, index?: number | string) => {
    let bb = new BinBuffer()
    createMOrder(bb, struct, field, index)
}

/**
 * 创建修改指令
 */
export const createMOrder = (bb: BinBuffer,struct: MStruct, field: string,index?:number | string) => {
	let meta = struct._$meta;
	let type = meta.info.fields[field].type;
	let value = struct[field];
	bb.writeInt(meta.info.nameHash);//写struct的hash
	bb.writeInt(struct._$index);//写struct的索引
	bb.writeUtf8(field);//写修改的字段
    if(index){
        bb.write(index, null);//写index
    }
    if(struct[`encode${upperFirst(field)}`]){
        (<any>struct[`encode${upperFirst(field)}`])(bb);
    }else{
        struct[`encode${upperFirst(field)}_${index}`](bb);
    }
}

/**
 * 创建添加指令
 */
export const createAOrder = (bb: BinBuffer,struct: Struct) => {
    bb.writeInt(struct._$meta.info.nameHash);
	struct.binEncode(bb, partWrite);
}

/**
 * 解析修改指令
 */
export const analysisMOrder = (mgr: StructMgr, bb: BinBuffer) => {
	const hash = bb.read();//读hash
	const index: number = bb.read() as number;	//读索引
	const field: string = bb.read() as string; //读字段名
  
	let struct = (<MStructMeta>mgr.lookup(hash)).map.get(index);
    let setFun  = `set${upperFirst(field)}`;
    if(Array.isArray(struct[field]) || struct[field] instanceof Map){
        let key = bb.read();
        if(struct[`${setFun}_${key}`]){
            struct[`${setFun}_${key}`](bb.read(getPartReadNext(struct._$meta.mgr)));
        }else{
            struct[`${setFun}`](getPartReadNext(struct._$meta.mgr), key);
        }
    }else{
        struct[`${setFun}`](getPartReadNext(struct._$meta.mgr));
    }
}

/**
 * 解析添加指令
 */
export const analysisAOrder = (mgr: StructMgr, bb: BinBuffer): Struct => {
    let construct = mgr.lookup(bb.read()).construct;
    let struct = new construct();
    struct.binDecode(bb, getPartReadNext(mgr))
    addToMeta(mgr, struct);//添加到元信息
    return struct;
}

/**
 * 解析添加指令
 */
export const addLisner = (mgr: StructMgr, rMgr: StructMgr) => {
    let ml = (struct: MStruct, field: string, value: any, old: any, index?: number | string) => {
        let bb = new BinBuffer();
        createMOrder(bb, struct, field, index);
        analysisMOrder(rMgr,bb);
    }

    let al = (struct: MStruct) => {
        let bb = new BinBuffer();
        createAOrder(bb, struct);
        analysisAOrder(rMgr, bb);
    }
	mgr.numberMap.forEach((v, k) => {
        (<MStructMeta>v).addModifyListener(ml);
        (<MStructMeta>v).addAddListener(al);
    })
}