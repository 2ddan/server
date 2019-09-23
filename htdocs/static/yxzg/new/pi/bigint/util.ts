import * as bigInt from "./biginteger";

//将大整数转化为ArrayBuffer
export const u64ToBuffer = (n: bigInt.BigInteger, littleEnd?: boolean):Uint8Array => {
    var i = 0;
    if(littleEnd){
        let arr = new Uint32Array(2);//小端序
        while (!n.isZero()){
            var r = n.divmod(4294967296);
            arr[i] = (<any>r.remainder).value;
            n = r.quotient;
            i++;
        }
        return new Uint8Array(arr.buffer);
    }else{
        let buf = new ArrayBuffer(8);
        let view = new DataView(buf);
        while (!n.isZero()){
            var r = n.divmod(4294967296);
            view.setUint32(i * 4, (<any>r.remainder).value);
            n = r.quotient;
            i++;
        }
        return new Uint8Array(buf);
    }
}

//将大整数转化为ArrayBuffer
export const u128ToBuffer = (n: bigInt.BigInteger,  littleEnd?: boolean): Uint8Array => {
    var i = 0;
    if(littleEnd){
        let arr = new Uint32Array(4);//小端序
        while (!n.isZero()){
            var r = n.divmod(4294967296);
            arr[i] = (<any>r.remainder).value;
            n = r.quotient;
            i++;
        }
        return new Uint8Array(arr.buffer);
    }else{
        let buf = new ArrayBuffer(16);
        let view = new DataView(buf);
        while (!n.isZero()){
            var r = n.divmod(4294967296);
            view.setUint32(i * 4, (<any>r.remainder).value);
            n = r.quotient;
            i++;
        }
        return new Uint8Array(buf);
    }
}

export const bufferToU64 = (buf: Uint8Array,  littleEnd?: boolean): bigInt.BigInteger => {
    var i = 0;
    if(littleEnd){
        let arr = new Uint32Array(buf.buffer);//小端序
        return bigInt(arr[1]).multiply(0x100000000).add(bigInt(arr[0]));
    }else{
        let view = new DataView(buf.buffer);
        return bigInt(view.getUint32(0)).multiply(bigInt(0x100000000)).add(bigInt(view.getUint32(1)));
    }
}

export const bufferToU128 = (buf: Uint8Array,  littleEnd?: boolean): bigInt.BigInteger => {
    var i = 0;
    if(littleEnd){
        let arr = new Uint32Array(buf.buffer);//小端序
        return bigInt(arr[3]).multiply(bigInt("79228162514264337593543950336").add(bigInt(arr[2]).multiply(bigInt("18446744073709551616")))).add(bigInt(arr[1]).multiply(bigInt("0x100000000"))).add(bigInt(arr[0]));
    }else{
        let view = new DataView(buf.buffer);
        return bigInt(view.getUint32(0)).multiply(bigInt("79228162514264337593543950336").add(bigInt(view.getUint32(1)).multiply(bigInt("18446744073709551616")))).add(bigInt(view.getUint32(2)).multiply(bigInt("0x100000000"))).add(bigInt(view.getUint32(3)));
    }
}

export const u64Unwrap = (v: bigInt.BigInteger): number | Uint8Array => {
    if(typeof (<any>v).value === "number" && (<any>v).value <= 9007199254740991){
        return (<any>v).value;
    }else{
        return u64ToBuffer(v, true);
    }
}

export const u128Unwrap = (v: bigInt.BigInteger): number | Uint8Array => {
    if(typeof (<any>v).value === "number" && (<any>v).value <= 9007199254740991){
        return (<any>v).value;
    }else{
        return u128ToBuffer(v, true);
    }
}

export const u64Merge = (v: number | Uint8Array): bigInt.BigInteger => {
    if(typeof v === "number"){
        return bigInt(v);
    }else{
        return bufferToU64(v, true);
    }
}

export const u128Merge = (v: number | Uint8Array): bigInt.BigInteger => {
    if(typeof v === "number"){
        return bigInt(v);
    }else{
        return bufferToU128(v, true);
    }
}

export class BigU64 {
    big: bigInt.BigInteger;
    constructor(v: number | Uint8Array){
        this.big = u64Merge(v);
    }
}

export class BigU128 {
    big: bigInt.BigInteger;
    constructor(v: number | Uint8Array){
        this.big = u128Merge(v);
    }
}

